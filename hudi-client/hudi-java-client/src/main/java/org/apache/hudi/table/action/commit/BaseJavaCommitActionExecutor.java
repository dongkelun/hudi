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

package org.apache.hudi.table.action.commit;

import org.apache.hudi.client.WriteStatus;
import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.model.HoodieBaseFile;
import org.apache.hudi.common.model.HoodieCommitMetadata;
import org.apache.hudi.common.model.HoodieKey;
import org.apache.hudi.common.model.HoodieRecord;
import org.apache.hudi.common.model.HoodieRecordLocation;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.model.HoodieWriteStat;
import org.apache.hudi.common.model.WriteOperationType;
import org.apache.hudi.common.table.HoodieTableMetaClient;
import org.apache.hudi.common.table.timeline.HoodieActiveTimeline;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.util.CommitUtils;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieCommitException;
import org.apache.hudi.exception.HoodieUpsertException;
import org.apache.hudi.execution.JavaLazyInsertIterable;
import org.apache.hudi.io.CreateHandleFactory;
import org.apache.hudi.io.HoodieMergeHandle;
import org.apache.hudi.io.HoodieSortedMergeHandle;
import org.apache.hudi.table.HoodieTable;
import org.apache.hudi.table.WorkloadProfile;
import org.apache.hudi.table.WorkloadStat;
import org.apache.hudi.table.action.HoodieWriteMetadata;

import org.apache.hadoop.fs.Path;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public abstract class BaseJavaCommitActionExecutor<T extends HoodieRecordPayload> extends
    BaseCommitActionExecutor<T, List<HoodieRecord<T>>, List<HoodieKey>, List<WriteStatus>, HoodieWriteMetadata> {

  private static final Logger LOG = LogManager.getLogger(BaseJavaCommitActionExecutor.class);

  public BaseJavaCommitActionExecutor(HoodieEngineContext context,
                                       HoodieWriteConfig config,
                                       HoodieTable table,
                                       String instantTime,
                                       WriteOperationType operationType) {
    super(context, config, table, instantTime, operationType, Option.empty());
  }

  public BaseJavaCommitActionExecutor(HoodieEngineContext context,
                                       HoodieWriteConfig config,
                                       HoodieTable table,
                                       String instantTime,
                                       WriteOperationType operationType,
                                       Option extraMetadata) {
    super(context, config, table, instantTime, operationType, extraMetadata);
  }

  @Override
  public HoodieWriteMetadata<List<WriteStatus>> execute(List<HoodieRecord<T>> inputRecords) {
    HoodieWriteMetadata<List<WriteStatus>> result = new HoodieWriteMetadata<>();

    WorkloadProfile profile = null;
    if (isWorkloadProfileNeeded()) { // 始终为true
      // 构建WorkloadProfile，构建WorkloadProfile的目的主要是为给getPartitioner使用
      // WorkloadProfile包含了分区路径对应的insert/upsert数量以及upsert数据对应的文件位置信息
      // 数量信息是为了分桶，或者说是为了分几个文件，这里涉及了小文件合并、文件大小等原理
      // 位置信息是为了获取要更新的文件
      // 对于upsert数据，我们复用原来的fileId
      // 对于insert数据，我们生成新的fileId,如果record数比较多，则分多个文件写
      profile = new WorkloadProfile(buildProfile(inputRecords));
      LOG.info("Workload profile :" + profile);
      try {
        // 将WorkloadProfile元数据信息持久化到.inflight文件中，.commit.request->.commit.inflight.
        // 这一步主要是为了mor表的rollback,rollback时可以从.inflight文件中读取对应的元数据信息
        saveWorkloadProfileMetadataToInflight(profile, instantTime);
      } catch (Exception e) {
        HoodieTableMetaClient metaClient = table.getMetaClient();
        HoodieInstant inflightInstant = new HoodieInstant(HoodieInstant.State.INFLIGHT, metaClient.getCommitActionType(), instantTime);
        try {
          if (!metaClient.getFs().exists(new Path(metaClient.getMetaPath(), inflightInstant.getFileName()))) {
            throw new HoodieCommitException("Failed to commit " + instantTime + " unable to save inflight metadata ", e);
          }
        } catch (IOException ex) {
          LOG.error("Check file exists failed");
          throw new HoodieCommitException("Failed to commit " + instantTime + " unable to save inflight metadata ", ex);
        }
      }
    }


    // 根据WorkloadProfile获取partitioner
    final Partitioner partitioner = getPartitioner(profile);
    // <桶号,对应的HoodieRecord>，一个桶对应一个文件 fileId
    Map<Integer, List<HoodieRecord<T>>> partitionedRecords = partition(inputRecords, partitioner);

    List<WriteStatus> writeStatuses = new LinkedList<>();
    // forEach，每个桶执行一次写操作handleInsertPartition/handleUpsertPartition
    // 最终通过BoundedInMemoryExecutor.execute 生产者消费者模式写数据
    partitionedRecords.forEach((partition, records) -> {
      // 是否更新、删除
      if (WriteOperationType.isChangingRecords(operationType)) {
        handleUpsertPartition(instantTime, partition, records.iterator(), partitioner).forEachRemaining(writeStatuses::addAll);
      } else {
        handleInsertPartition(instantTime, partition, records.iterator(), partitioner).forEachRemaining(writeStatuses::addAll);
      }
    });
    updateIndex(writeStatuses, result);
    // commit生成.commit文件，.commit文件的生成标记着写数据的完成
    updateIndexAndCommitIfNeeded(writeStatuses, result);
    return result;
  }

  protected void updateIndex(List<WriteStatus> writeStatuses, HoodieWriteMetadata<List<WriteStatus>> result) {
    Instant indexStartTime = Instant.now();
    // Update the index back
    List<WriteStatus> statuses = table.getIndex().updateLocation(writeStatuses, context, table);
    result.setIndexUpdateDuration(Duration.between(indexStartTime, Instant.now()));
    result.setWriteStatuses(statuses);
  }

  @Override
  protected String getCommitActionType() {
    return table.getMetaClient().getCommitActionType();
  }

  private Partitioner getPartitioner(WorkloadProfile profile) {
    // 是否有修改操作：UPSERT、UPSERT_PREPPED、DELETE
    if (WriteOperationType.isChangingRecords(operationType)) {
      return getUpsertPartitioner(profile);
    } else {
      // 这里最终也会调用 getUpsertPartitioner
      return getInsertPartitioner(profile);
    }
  }

  private Map<Integer, List<HoodieRecord<T>>> partition(List<HoodieRecord<T>> dedupedRecords, Partitioner partitioner) {
    // (桶号, ((HoodieKey，HoodieRecordLocation), HoodieRecord))
    Map<Integer, List<Pair<Pair<HoodieKey, Option<HoodieRecordLocation>>, HoodieRecord<T>>>> partitionedMidRecords = dedupedRecords
        .stream()
        .map(record -> Pair.of(Pair.of(record.getKey(), Option.ofNullable(record.getCurrentLocation())), record))
        .collect(Collectors.groupingBy(x -> partitioner.getPartition(x.getLeft())));
    Map<Integer, List<HoodieRecord<T>>> results = new LinkedHashMap<>();
    partitionedMidRecords.forEach((key, value) -> results.put(key, value.stream().map(x -> x.getRight()).collect(Collectors.toList())));
    return results;
  }

  /**
   * 构建WorkloadProfile，构建WorkloadProfile的目的主要是为给getPartitioner使用
   * WorkloadProfile包含了分区路径对应的insert/upsert数量以及upsert数据对应的文件位置信息
   * 数量信息是为了分桶，或者说是为了分几个文件，这里涉及了小文件合并、文件大小等原理
   * 位置信息是为了获取要更新的文件
   * 对于upsert数据，我们复用原来的fileId
   * 对于insert数据，我们生成新的fileId,如果record数比较多，则分多个文件写
   * 注意：对于insert数据分为两种：1、小文件合并，先将数据写到小文件中，这部分数据复用原来的fileId
   * 2、如果还有剩余数据没写完，则生成新的fileId
   */
  protected Pair<HashMap<String, WorkloadStat>, WorkloadStat> buildProfile(List<HoodieRecord<T>> inputRecords) {
    // 分区路径，WorkloadStat
    HashMap<String, WorkloadStat> partitionPathStatMap = new HashMap<>();
    // 全局WorkloadStat
    WorkloadStat globalStat = new WorkloadStat();

    // 返回(分区路径，文件位置信息)，记录数
    // 也就是partitionLocationCounts：分区路径、文件位置、记录数
    Map<Pair<String, Option<HoodieRecordLocation>>, Long> partitionLocationCounts = inputRecords
        .stream()
        .map(record -> Pair.of(
            // (分区路径，文件位置信息)，record
            Pair.of(record.getPartitionPath(), Option.ofNullable(record.getCurrentLocation())), record))
            // 根据分区路径groupBy，统计每个分区对应的数量
        .collect(Collectors.groupingBy(Pair::getLeft, Collectors.counting()));

    // 遍历partitionLocationCounts(k,v)
    for (Map.Entry<Pair<String, Option<HoodieRecordLocation>>, Long> e : partitionLocationCounts.entrySet()) {
      // 分区路径
      String partitionPath = e.getKey().getLeft();
      // 记录数
      Long count = e.getValue();
      // 文件位置HoodieRecordLocation
      Option<HoodieRecordLocation> locOption = e.getKey().getRight();

      // 如果partitionPathStatMap没有该分区，则将该分区放进去，并且初始化value WorkloadStat
      if (!partitionPathStatMap.containsKey(partitionPath)) {
        partitionPathStatMap.put(partitionPath, new WorkloadStat());
      }

      // 如果文件位置信息存在，则代表是update
      // 获取文件位置信息是在前面的tag方法中，对于insert方法，不需要tag
      if (locOption.isPresent()) {
        // update
        // 对应分区下的WorkloadStat调用addUpdates
        partitionPathStatMap.get(partitionPath).addUpdates(locOption.get(), count);
        // 全局WorkloadStat调用addUpdates
        globalStat.addUpdates(locOption.get(), count);
      } else {
        // 否则是insert
        // insert
        // 对应分区下的WorkloadStat调用addInserts,使insert数+count
        partitionPathStatMap.get(partitionPath).addInserts(count);
        // 全局WorkloadStat中的insert数+count
        globalStat.addInserts(count);
      }
    }
    // 返回分区统计信息和全局统计信息
    return Pair.of(partitionPathStatMap, globalStat);
  }

  @Override
  protected void commit(Option<Map<String, String>> extraMetadata, HoodieWriteMetadata<List<WriteStatus>> result) {
    commit(extraMetadata, result, result.getWriteStatuses().stream().map(WriteStatus::getStat).collect(Collectors.toList()));
  }

  protected void commit(Option<Map<String, String>> extraMetadata, HoodieWriteMetadata<List<WriteStatus>> result, List<HoodieWriteStat> writeStats) {
    String actionType = getCommitActionType();
    LOG.info("Committing " + instantTime + ", action Type " + actionType);
    result.setCommitted(true);
    result.setWriteStats(writeStats);
    // Finalize write
    finalizeWrite(instantTime, writeStats, result);
    try {
      LOG.info("Committing " + instantTime + ", action Type " + getCommitActionType());
      HoodieActiveTimeline activeTimeline = table.getActiveTimeline();
      HoodieCommitMetadata metadata = CommitUtils.buildMetadata(writeStats, result.getPartitionToReplaceFileIds(),
          extraMetadata, operationType, getSchemaToStoreInCommit(), getCommitActionType());

      // 通过activeTimeline.saveAsComplete生成.commit文件
      activeTimeline.saveAsComplete(new HoodieInstant(true, getCommitActionType(), instantTime),
          Option.of(metadata.toJsonString().getBytes(StandardCharsets.UTF_8)));
      LOG.info("Committed " + instantTime);
      result.setCommitMetadata(Option.of(metadata));
    } catch (IOException e) {
      throw new HoodieCommitException("Failed to complete commit " + config.getBasePath() + " at time " + instantTime,
          e);
    }
  }

  protected Map<String, List<String>> getPartitionToReplacedFileIds(HoodieWriteMetadata<List<WriteStatus>> writeMetadata) {
    return Collections.emptyMap();
  }

  @Override
  protected boolean isWorkloadProfileNeeded() {
    return true;
  }

  @SuppressWarnings("unchecked")
  protected Iterator<List<WriteStatus>> handleUpsertPartition(String instantTime, Integer partition, Iterator recordItr,
                                                              Partitioner partitioner) {
    JavaUpsertPartitioner javaUpsertPartitioner = (JavaUpsertPartitioner) partitioner;
    BucketInfo binfo = javaUpsertPartitioner.getBucketInfo(partition);
    BucketType btype = binfo.bucketType;
    try {
      if (btype.equals(BucketType.INSERT)) {
        return handleInsert(binfo.fileIdPrefix, recordItr);
      } else if (btype.equals(BucketType.UPDATE)) {
        return handleUpdate(binfo.partitionPath, binfo.fileIdPrefix, recordItr);
      } else {
        throw new HoodieUpsertException("Unknown bucketType " + btype + " for partition :" + partition);
      }
    } catch (Throwable t) {
      String msg = "Error upserting bucketType " + btype + " for partition :" + partition;
      LOG.error(msg, t);
      throw new HoodieUpsertException(msg, t);
    }
  }

  protected Iterator<List<WriteStatus>> handleInsertPartition(String instantTime, Integer partition, Iterator recordItr,
                                                              Partitioner partitioner) {
    return handleUpsertPartition(instantTime, partition, recordItr, partitioner);
  }

  @Override
  public Iterator<List<WriteStatus>> handleUpdate(String partitionPath, String fileId,
                                                  Iterator<HoodieRecord<T>> recordItr)
      throws IOException {
    // This is needed since sometimes some buckets are never picked in getPartition() and end up with 0 records
    if (!recordItr.hasNext()) {
      LOG.info("Empty partition with fileId => " + fileId);
      return Collections.singletonList((List<WriteStatus>) Collections.EMPTY_LIST).iterator();
    }
    // these are updates
    HoodieMergeHandle upsertHandle = getUpdateHandle(partitionPath, fileId, recordItr);
    return handleUpdateInternal(upsertHandle, fileId);
  }

  protected Iterator<List<WriteStatus>> handleUpdateInternal(HoodieMergeHandle<?,?,?,?> upsertHandle, String fileId)
      throws IOException {
    if (upsertHandle.getOldFilePath() == null) {
      throw new HoodieUpsertException(
          "Error in finding the old file path at commit " + instantTime + " for fileId: " + fileId);
    } else {
      JavaMergeHelper.newInstance().runMerge(table, upsertHandle);
    }

    List<WriteStatus> statuses = upsertHandle.writeStatuses();
    if (upsertHandle.getPartitionPath() == null) {
      LOG.info("Upsert Handle has partition path as null " + upsertHandle.getOldFilePath() + ", " + statuses);
    }
    return Collections.singletonList(statuses).iterator();
  }

  protected HoodieMergeHandle getUpdateHandle(String partitionPath, String fileId, Iterator<HoodieRecord<T>> recordItr) {
    if (table.requireSortedRecords()) {
      return new HoodieSortedMergeHandle<>(config, instantTime, table, recordItr, partitionPath, fileId, taskContextSupplier, Option.empty());
    } else {
      return new HoodieMergeHandle<>(config, instantTime, table, recordItr, partitionPath, fileId, taskContextSupplier, Option.empty());
    }
  }

  protected HoodieMergeHandle getUpdateHandle(String partitionPath, String fileId,
                                              Map<String, HoodieRecord<T>> keyToNewRecords,
                                              HoodieBaseFile dataFileToBeMerged) {
    return new HoodieMergeHandle<>(config, instantTime, table, keyToNewRecords,
        partitionPath, fileId, dataFileToBeMerged, taskContextSupplier, Option.empty());
  }

  @Override
  public Iterator<List<WriteStatus>> handleInsert(String idPfx, Iterator<HoodieRecord<T>> recordItr) {
    // This is needed since sometimes some buckets are never picked in getPartition() and end up with 0 records
    if (!recordItr.hasNext()) {
      LOG.info("Empty partition");
      return Collections.singletonList((List<WriteStatus>) Collections.EMPTY_LIST).iterator();
    }
    return new JavaLazyInsertIterable<>(recordItr, true, config, instantTime, table, idPfx,
        taskContextSupplier, new CreateHandleFactory<>());
  }

  /**
   * Provides a partitioner to perform the upsert operation, based on the workload profile.
   */
  public Partitioner getUpsertPartitioner(WorkloadProfile profile) {
    if (profile == null) {
      throw new HoodieUpsertException("Need workload profile to construct the upsert partitioner.");
    }
    return new JavaUpsertPartitioner(profile, context, table, config);
  }

  /**
   * Provides a partitioner to perform the insert operation, based on the workload profile.
   */
  public Partitioner getInsertPartitioner(WorkloadProfile profile) {
    return getUpsertPartitioner(profile);
  }

  public void updateIndexAndCommitIfNeeded(List<WriteStatus> writeStatuses, HoodieWriteMetadata result) {
    Instant indexStartTime = Instant.now();
    // Update the index back
    List<WriteStatus> statuses = table.getIndex().updateLocation(writeStatuses, context, table);
    result.setIndexUpdateDuration(Duration.between(indexStartTime, Instant.now()));
    result.setWriteStatuses(statuses);
    result.setPartitionToReplaceFileIds(getPartitionToReplacedFileIds(result));
    commitOnAutoCommit(result);
  }
}
