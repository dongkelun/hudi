/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.hudi.table.action.clean;

import org.apache.hudi.avro.model.HoodieActionInstant;
import org.apache.hudi.avro.model.HoodieCleanFileInfo;
import org.apache.hudi.avro.model.HoodieCleanerPlan;
import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.model.HoodieCleaningPolicy;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.table.timeline.HoodieTimeline;
import org.apache.hudi.common.table.timeline.TimelineMetadataUtils;
import org.apache.hudi.common.util.CleanerUtils;
import org.apache.hudi.common.util.CollectionUtils;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieIOException;
import org.apache.hudi.table.HoodieTable;
import org.apache.hudi.table.action.BaseActionExecutor;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public abstract class BaseCleanPlanActionExecutor<T extends HoodieRecordPayload, I, K, O> extends BaseActionExecutor<T, I, K, O, Option<HoodieCleanerPlan>> {

  private static final Logger LOG = LogManager.getLogger(CleanPlanner.class);

  private final Option<Map<String, String>> extraMetadata;

  public BaseCleanPlanActionExecutor(HoodieEngineContext context,
                                     HoodieWriteConfig config,
                                     HoodieTable<T, I, K, O> table,
                                     String instantTime,
                                     Option<Map<String, String>> extraMetadata) {
    super(context, config, table, instantTime);
    this.extraMetadata = extraMetadata;
  }

  protected abstract Option<HoodieCleanerPlan> createCleanerPlan();

  /**
   * Generates List of files to be cleaned.
   * 生成需要被清理的文件列表
   *
   * @param context HoodieEngineContext
   * @return Cleaner Plan
   */
  HoodieCleanerPlan requestClean(HoodieEngineContext context) {
    try {
      CleanPlanner<T, I, K, O> planner = new CleanPlanner<>(context, table, config);
      // 获取最早需要保留的HoodieInstant
      Option<HoodieInstant> earliestInstant = planner.getEarliestCommitToRetain();
      // 获取需要被清理的分区路径
      List<String> partitionsToClean = planner.getPartitionPathsToClean(earliestInstant);

      if (partitionsToClean.isEmpty()) {
        // 如果分区路径为空，直接返回一个空的HoodieCleanerPlan
        LOG.info("Nothing to clean here. It is already clean");
        return HoodieCleanerPlan.newBuilder().setPolicy(HoodieCleaningPolicy.KEEP_LATEST_COMMITS.name()).build();
      }
      LOG.info("Total Partitions to clean : " + partitionsToClean.size() + ", with policy " + config.getCleanerPolicy());
      // 清理的并发度
      int cleanerParallelism = Math.min(partitionsToClean.size(), config.getCleanerParallelism());
      LOG.info("Using cleanerParallelism: " + cleanerParallelism);

      context.setJobStatus(this.getClass().getSimpleName(), "Generates list of file slices to be cleaned");
      // Map<分区路径,要删除的文件列表>, 真正的实现是在planner.getDeletePaths
      Map<String, List<HoodieCleanFileInfo>> cleanOps = context
          .map(partitionsToClean, partitionPathToClean -> Pair.of(partitionPathToClean, planner.getDeletePaths(partitionPathToClean)), cleanerParallelism)
          .stream()
          .collect(Collectors.toMap(Pair::getKey, y -> CleanerUtils.convertToHoodieCleanFileInfoList(y.getValue())));

      // 构造HoodieCleanerPlan并返回，参数分别：
      // earliestInstantToRetain = 根据earliestInstant生成的HoodieActionInstant
      // policy = config.getCleanerPolicy().name()
      // filesToBeDeletedPerPartition = CollectionUtils.createImmutableMap() 一个空的只读的map
      // version = 2
      // filePathsToBeDeletedPerPartition = cleanOps,即上面我们获取的要删除的文件列表
      return new HoodieCleanerPlan(earliestInstant
          .map(x -> new HoodieActionInstant(x.getTimestamp(), x.getAction(), x.getState().name())).orElse(null),
          config.getCleanerPolicy().name(), CollectionUtils.createImmutableMap(),
          CleanPlanner.LATEST_CLEAN_PLAN_VERSION, cleanOps);
    } catch (IOException e) {
      throw new HoodieIOException("Failed to schedule clean operation", e);
    }
  }

  /**
   * Creates a Cleaner plan if there are files to be cleaned and stores them in instant file.
   * // 如果有需要被清理的文件，创建一个cleanerPlan，并且将它们保存到instant文件中
   * Cleaner Plan contains absolute file paths.
   * cleanerPlan 包含文件的绝对路径
   *
   * @param startCleanTime Cleaner Instant Time
   * @return Cleaner Plan if generated
   */
  protected Option<HoodieCleanerPlan> requestClean(String startCleanTime) {
    // cleanerPlan包含需要被清理的文件列表
    final HoodieCleanerPlan cleanerPlan = requestClean(context);
    if ((cleanerPlan.getFilePathsToBeDeletedPerPartition() != null)
        && !cleanerPlan.getFilePathsToBeDeletedPerPartition().isEmpty()
        && cleanerPlan.getFilePathsToBeDeletedPerPartition().values().stream().mapToInt(List::size).sum() > 0) {
      // 如果要删除的文件列表不为空
      // Only create cleaner plan which does some work
      // 创建.clean.requested
      final HoodieInstant cleanInstant = new HoodieInstant(HoodieInstant.State.REQUESTED, HoodieTimeline.CLEAN_ACTION, startCleanTime);
      // Save to both aux and timeline folder
      try {
        // 保存.clean.requested，.clean.requested文件里包含了序列化的cleanerPlan，也就包含了文件列表等信息
        // 后面删除文件时会用到
        table.getActiveTimeline().saveToCleanRequested(cleanInstant, TimelineMetadataUtils.serializeCleanerPlan(cleanerPlan));
        LOG.info("Requesting Cleaning with instant time " + cleanInstant);
      } catch (IOException e) {
        LOG.error("Got exception when saving cleaner requested file", e);
        throw new HoodieIOException(e.getMessage(), e);
      }
      // 返回cleanerPlan
      return Option.of(cleanerPlan);
    }
    // 返回空
    return Option.empty();
  }

  @Override
  public Option<HoodieCleanerPlan> execute() {
    // Plan a new clean action
    return requestClean(instantTime);
  }

}
