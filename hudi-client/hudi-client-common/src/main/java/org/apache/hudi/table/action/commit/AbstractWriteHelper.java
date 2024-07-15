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

import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.exception.HoodieUpsertException;
import org.apache.hudi.index.HoodieIndex;
import org.apache.hudi.table.HoodieTable;

import org.apache.hudi.table.action.HoodieWriteMetadata;

import java.time.Duration;
import java.time.Instant;

public abstract class AbstractWriteHelper<T extends HoodieRecordPayload, I, K, O, R> {

  public HoodieWriteMetadata<O> write(String instantTime,
                                      I inputRecords,
                                      HoodieEngineContext context,
                                      HoodieTable<T, I, K, O> table,
                                      boolean shouldCombine,
                                      int shuffleParallelism,
                                      BaseCommitActionExecutor<T, I, K, O, R> executor,
                                      boolean performTagging) {
    try {
      // De-dupe/merge if needed
      // 如果开启了去重，则先去重，insert默认不去重
      // 配置项hoodie.combine.before.insert
      I dedupedRecords =
          combineOnCondition(shouldCombine, inputRecords, shuffleParallelism, table);

      Instant lookupBegin = Instant.now();
      I taggedRecords = dedupedRecords;
      if (performTagging) { // 是否需要tag,insert为false
        // perform index loop up to get existing location of records
        // tag的作用主要是利用文件中保存的索引信息（默认布隆索引），判断records中的数据哪些是新增数据，哪些是更新数据
        // 对于更新的数据，还要添加上对应的文件位置信息，方便后面更新时查找对应的parquet文件
        taggedRecords = tag(dedupedRecords, context, table);
      }
      Duration indexLookupDuration = Duration.between(lookupBegin, Instant.now());

      // 通过调用executor.execute执行写操作，返回result。这里的executor为JavaInsertCommitActionExecutor
      HoodieWriteMetadata<O> result = executor.execute(taggedRecords);
      result.setIndexLookupDuration(indexLookupDuration);
      return result;
    } catch (Throwable e) {
      if (e instanceof HoodieUpsertException) {
        throw (HoodieUpsertException) e;
      }
      throw new HoodieUpsertException("Failed to upsert for commit time " + instantTime, e);
    }
  }

  private I tag(
      I dedupedRecords, HoodieEngineContext context, HoodieTable<T, I, K, O> table) {
    // perform index loop up to get existing location of records
    // 执行索引循环以获取记录的现有位置
    // 对于 Java Client 这里 table 为 HoodieJavaCopyOnWriteTable
    return table.getIndex().tagLocation(dedupedRecords, context, table);
  }

  public I combineOnCondition(
      boolean condition, I records, int parallelism, HoodieTable<T, I, K, O> table) {
    return condition ? deduplicateRecords(records, table, parallelism) : records;
  }

  /**
   * Deduplicate Hoodie records, using the given deduplication function.
   *
   * @param records     hoodieRecords to deduplicate
   * @param parallelism parallelism or partitions to be used while reducing/deduplicating
   * @return Collection of HoodieRecord already be deduplicated
   */
  public I deduplicateRecords(
      I records, HoodieTable<T, I, K, O> table, int parallelism) {
    return deduplicateRecords(records, table.getIndex(), parallelism);
  }

  public abstract I deduplicateRecords(
      I records, HoodieIndex<T, I, K, O> index, int parallelism);
}
