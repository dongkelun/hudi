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

package org.apache.hudi.index.bloom;

import com.beust.jcommander.internal.Lists;
import org.apache.hudi.client.WriteStatus;
import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.model.HoodieKey;
import org.apache.hudi.common.model.HoodieRecord;
import org.apache.hudi.common.model.HoodieRecordLocation;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.MetadataNotFoundException;
import org.apache.hudi.index.HoodieIndex;
import org.apache.hudi.index.HoodieIndexUtils;
import org.apache.hudi.io.HoodieKeyLookupHandle;
import org.apache.hudi.io.HoodieRangeInfoHandle;
import org.apache.hudi.table.HoodieTable;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;
import static org.apache.hudi.index.HoodieIndexUtils.getLatestBaseFilesForAllPartitions;

@SuppressWarnings("checkstyle:LineLength")
public class HoodieBaseBloomIndex<T extends HoodieRecordPayload> extends HoodieIndex<T, List<HoodieRecord<T>>, List<HoodieKey>, List<WriteStatus>> {

  private static final Logger LOG = LogManager.getLogger(HoodieBaseBloomIndex.class);

  public HoodieBaseBloomIndex(HoodieWriteConfig config) {
    super(config);
  }

  @Override
  public List<HoodieRecord<T>> tagLocation(List<HoodieRecord<T>> records, HoodieEngineContext context,
                                           HoodieTable<T, List<HoodieRecord<T>>, List<HoodieKey>, List<WriteStatus>> hoodieTable) {
    // Step 1: Extract out thinner Map of (partitionPath, recordKey)
    // 第一步：提取更薄的映射（partitionPath，recordKey）
    // (partitionPath, List(recordKey))
    Map<String, List<String>> partitionRecordKeyMap = new HashMap<>();
    records.forEach(record -> {
      // 如果包含记录对应的分区路径
      if (partitionRecordKeyMap.containsKey(record.getPartitionPath())) {
        // 现有分区中对应的 List 添加 recordKey
        partitionRecordKeyMap.get(record.getPartitionPath()).add(record.getRecordKey());
      } else {
        // 将 recordKey 添加到 recordKeys 中
        List<String> recordKeys = Lists.newArrayList();
        recordKeys.add(record.getRecordKey());
        // 添加新的分区路径和对应的  List(recordKey)
        partitionRecordKeyMap.put(record.getPartitionPath(), recordKeys);
      }
    });

    // Step 2: Lookup indexes for all the partition/recordkey pair
    // 第二步：根据索引查找每个 recordKey 的 location，返回 每个 recordKey 和 location 的对应关系
    // (HoodieKey, HoodieRecordLocation)
    Map<HoodieKey, HoodieRecordLocation> keyFilenamePairMap =
        lookupIndex(partitionRecordKeyMap, context, hoodieTable);

    if (LOG.isDebugEnabled()) {
      long totalTaggedRecords = keyFilenamePairMap.values().size();
      LOG.debug("Number of update records (ones tagged with a fileID): " + totalTaggedRecords);
    }

    // Step 3: Tag the incoming records, as inserts or updates, by joining with existing record keys
    // 第三步：通过与现有recordKey连接，将传入记录标记为插入或更新
    List<HoodieRecord<T>> taggedRecords = tagLocationBacktoRecords(keyFilenamePairMap, records);

    return taggedRecords;
  }

  /**
   * Lookup the location for each record key and return the pair<record_key,location> for all record keys already
   * present and drop the record keys if not present.
   *
   * 查找每个记录键的位置，并返回已存在的所有 recordKey 的 pair<record_key,location>，如果不存在，则删除记录键。
   */
  private Map<HoodieKey, HoodieRecordLocation> lookupIndex(
      Map<String, List<String>> partitionRecordKeyMap, final HoodieEngineContext context,
      final HoodieTable hoodieTable) {
    // Obtain records per partition, in the incoming records
    // 在传入记录中获取每个分区的记录
    Map<String, Long> recordsPerPartition = new HashMap<>();
    // （分区路径，每个分区路径对应的记录数）
    partitionRecordKeyMap.keySet().forEach(k -> recordsPerPartition.put(k, Long.valueOf(partitionRecordKeyMap.get(k).size())));
    // 所有的分区路径
    List<String> affectedPartitionPathList = new ArrayList<>(recordsPerPartition.keySet());

    // Step 2: Load all involved files as <Partition, filename> pairs
    // 第二步：将所有涉及的文件加载为＜Partition, filename＞对
    // List(Partition, BloomIndexFileInfo) BloomIndexFileInfo 包含 fileID,minRecordKey,maxRecordKey
    List<Pair<String, BloomIndexFileInfo>> fileInfoList =
        loadInvolvedFiles(affectedPartitionPathList, context, hoodieTable);
    // Map (Partition, List(BloomIndexFileInfo))
    final Map<String, List<BloomIndexFileInfo>> partitionToFileInfo =
        fileInfoList.stream().collect(groupingBy(Pair::getLeft, mapping(Pair::getRight, toList())));

    // Step 3: Obtain a List, for each incoming record, that already exists, with the file id,
    // that contains it.
    // 第三步：为每个已存在的传入记录获取一个列表，其中包含该列表的文件id。
    // List(fileId, HoodieKey) ，这里多个 fileId 对应一个 HoodieKey ，一个 fileId 对应多个HoodieKey
    // 类似于笛卡尔积，多对多的关系，按照 fileId 排序
    List<Pair<String, HoodieKey>> fileComparisons =
        explodeRecordsWithFileComparisons(partitionToFileInfo, partitionRecordKeyMap);
    return findMatchingFilesForRecordKeys(fileComparisons, hoodieTable);
  }

  /**
   * Load all involved files as <Partition, filename> pair List.
   *
   * 将所有涉及的文件加载为 List<Pair<partitionPath, BloomIndexFileInfo>> 。
   */
  //TODO duplicate code with spark, we can optimize this method later
  List<Pair<String, BloomIndexFileInfo>> loadInvolvedFiles(List<String> partitions, final HoodieEngineContext context,
                                                           final HoodieTable hoodieTable) {
    // Obtain the latest data files from all the partitions.
    // 从所有分区中获取最新的数据文件。
    // List (partitionPath,FileId)
    List<Pair<String, String>> partitionPathFileIDList = getLatestBaseFilesForAllPartitions(partitions, context, hoodieTable).stream()
        .map(pair -> Pair.of(pair.getKey(), pair.getValue().getFileId()))
        .collect(toList());

    // 是否需要根据最大值最小值进行第一阶段过滤
    if (config.getBloomIndexPruneByRanges()) {// 默认true
      // also obtain file ranges, if range pruning is enabled
      context.setJobStatus(this.getClass().getName(), "Obtain key ranges for file slices (range pruning=on)");
      return context.map(partitionPathFileIDList, pf -> {
        try {
          HoodieRangeInfoHandle rangeInfoHandle = new HoodieRangeInfoHandle(config, hoodieTable, pf);
          // 读取最大值最小值，具体为 parquet 文件元数据中的 hoodie_min_record_key 、hoodie_max_record_key
          String[] minMaxKeys = rangeInfoHandle.getMinMaxKeys();
          // 返回 (partitionPath, (fileId, hoodie_min_record_key, hoodie_max_record_key))
          return Pair.of(pf.getKey(), new BloomIndexFileInfo(pf.getValue(), minMaxKeys[0], minMaxKeys[1]));
        } catch (MetadataNotFoundException me) {
          LOG.warn("Unable to find range metadata in file :" + pf);
          return Pair.of(pf.getKey(), new BloomIndexFileInfo(pf.getValue()));
        }
      }, Math.max(partitionPathFileIDList.size(), 1));
    } else {
      // 返回 (partitionPath, (fileId, null, null))
      return partitionPathFileIDList.stream()
          .map(pf -> Pair.of(pf.getKey(), new BloomIndexFileInfo(pf.getValue()))).collect(toList());
    }
  }

  @Override
  public boolean rollbackCommit(String instantTime) {
    // Nope, don't need to do anything.
    return true;
  }

  /**
   * This is not global, since we depend on the partitionPath to do the lookup.
   */
  @Override
  public boolean isGlobal() {
    return false;
  }

  /**
   * No indexes into log files yet.
   */
  @Override
  public boolean canIndexLogFiles() {
    return false;
  }

  /**
   * Bloom filters are stored, into the same data files.
   */
  @Override
  public boolean isImplicitWithStorage() {
    return true;
  }

  /**
   * For each incoming record, produce N output records, 1 each for each file against which the record's key needs to be
   * checked. For tables, where the keys have a definite insert order (e.g: timestamp as prefix), the number of files
   * to be compared gets cut down a lot from range pruning.
   *
   * 对于每个传入的记录，生成N个输出记录，每个文件1个，需要对照该记录的密钥进行检查。
   * 对于键有明确插入顺序的表（例如：时间戳作为前缀），要比较的文件数量会因范围修剪而大大减少。
   * <p>
   * Sub-partition to ensure the records can be looked up against files & also prune file<=>record comparisons based on
   * recordKey ranges in the index info.
   *
   * 子分区，以确保可以根据文件查找记录，还可以根据索引信息中的recordKey范围修剪文件<=>记录比较。
   *
   * 主要逻辑：利用区间树根据最大值最小值，返回可能包含 recordKey 的文件列表。
   * 查询逻辑:1、对于有最大值和最小值的文件，如果该 recordKey 在最大值最小之区间内，则认为该文件可能包含 recordKey
   *         2、对于没有最大值和最小值的文件，则认为该文件可能包含 recordKey
   *
   * 返回值：List(fileId, HoodieKey)
   */
  List<Pair<String, HoodieKey>> explodeRecordsWithFileComparisons(
      final Map<String, List<BloomIndexFileInfo>> partitionToFileIndexInfo,
      Map<String, List<String>> partitionRecordKeyMap) {
    // 是否使用区间树基于最小和最大记录键值进行过滤，默认为true
    IndexFileFilter indexFileFilter =
        config.useBloomIndexTreebasedFilter() ? new IntervalTreeBasedIndexFileFilter(partitionToFileIndexInfo)
            : new ListBasedIndexFileFilter(partitionToFileIndexInfo);
    // List(fileId, HoodieKey)
    List<Pair<String, HoodieKey>> fileRecordPairs = new ArrayList<>();
    partitionRecordKeyMap.keySet().forEach(partitionPath ->  {
      List<String> hoodieRecordKeys = partitionRecordKeyMap.get(partitionPath);
      hoodieRecordKeys.forEach(hoodieRecordKey -> {
        indexFileFilter.getMatchingFilesAndPartition(partitionPath, hoodieRecordKey).forEach(partitionFileIdPair -> {
          // (fileId, HoodieKey)
          fileRecordPairs.add(Pair.of(partitionFileIdPair.getRight(),
              new HoodieKey(hoodieRecordKey, partitionPath)));
        });
      });
    });
    return fileRecordPairs;
  }

  /**
   * Find out <RowKey, filename> pair.
   * 找出<RowKey，filename>对。
   */
  Map<HoodieKey, HoodieRecordLocation> findMatchingFilesForRecordKeys(
      List<Pair<String, HoodieKey>> fileComparisons,
      HoodieTable hoodieTable) {
    // 按照 fileId 排序
    fileComparisons = fileComparisons.stream().sorted((o1, o2) -> o1.getLeft().compareTo(o2.getLeft())).collect(toList());

    List<HoodieKeyLookupHandle.KeyLookupResult> keyLookupResults = new ArrayList<>();

    // 这里实际返回 LazyKeyCheckIterator，其父类的 LazyIterableIterator 的 next 方法会调用 computeNext
    Iterator<List<HoodieKeyLookupHandle.KeyLookupResult>> iterator = new HoodieBaseBloomIndexCheckFunction(hoodieTable, config).apply(fileComparisons.iterator());
    while (iterator.hasNext()) {
      // 这里实际调用 LazyKeyCheckIterator.computeNext
      // 这里涉及读取保存在 Parquet文件中的布隆过滤器 BloomFilter
      keyLookupResults.addAll(iterator.next());
    }

    Map<HoodieKey, HoodieRecordLocation> hoodieRecordLocationMap = new HashMap<>();

    // 过滤掉 matchingRecordKeys 为空的，matchingRecordKeys 为空代表，没有一个 recordKey 存在于该文件中
    keyLookupResults = keyLookupResults.stream().filter(lr -> lr.getMatchingRecordKeys().size() > 0).collect(toList());
    keyLookupResults.forEach(lookupResult -> {
      lookupResult.getMatchingRecordKeys().forEach(r -> {
        // (HoodieKey, HoodieRecordLocation) ,将 HoodieKey 和 HoodieRecordLocation 关联
        hoodieRecordLocationMap.put(new HoodieKey(r, lookupResult.getPartitionPath()), new HoodieRecordLocation(lookupResult.getBaseInstantTime(), lookupResult.getFileId()));
      });
    });

    return hoodieRecordLocationMap;
  }


  /**
   * Tag the <rowKey, filename> back to the original HoodieRecord List.
   *
   * 将<rowKey，filename>标记回原始的 HoodieRecord 列表。
   * 其实就是设置 HoodieRecord 的 currentLocation
   */
  protected List<HoodieRecord<T>> tagLocationBacktoRecords(
      Map<HoodieKey, HoodieRecordLocation> keyFilenamePair, List<HoodieRecord<T>> records) {
    // (HoodieKey, HoodieRecord)
    Map<HoodieKey, HoodieRecord<T>> keyRecordPairMap = new HashMap<>();
    records.forEach(r -> keyRecordPairMap.put(r.getKey(), r));
    // Here as the record might have more data than rowKey (some rowKeys' fileId is null),
    // so we do left outer join.
    // 在这里，由于记录可能比rowKey有更多的数据（一些rowKeys的fileId为空），因此我们进行了左外连接。
    List<Pair<HoodieRecord<T>, HoodieRecordLocation>> newList = new ArrayList<>();
    keyRecordPairMap.keySet().forEach(k -> {
      if (keyFilenamePair.containsKey(k)) { // 如果存在，代表该 key 已经存在于文件中
        //(HoodieRecord, HoodieRecordLocation) 根据该 key 获取对应的 HoodieRecordLocation
        newList.add(Pair.of(keyRecordPairMap.get(k), keyFilenamePair.get(k)));
      } else {
        // 否则，没有对应的文件，添加为 null
        newList.add(Pair.of(keyRecordPairMap.get(k), null));
      }
    });
    List<HoodieRecord<T>> res = Lists.newArrayList();
    for (Pair<HoodieRecord<T>, HoodieRecordLocation> v : newList) {
      // 通过 HoodieIndexUtils.getTaggedRecord 设置每个 HoodieRecord 的 currentLocation
      res.add(HoodieIndexUtils.getTaggedRecord(v.getLeft(), Option.ofNullable(v.getRight())));
    }
    return res;
  }

  @Override
  public List<WriteStatus> updateLocation(List<WriteStatus> writeStatusList, HoodieEngineContext context,
                                          HoodieTable<T, List<HoodieRecord<T>>, List<HoodieKey>, List<WriteStatus>> hoodieTable) {
    return writeStatusList;
  }
}
