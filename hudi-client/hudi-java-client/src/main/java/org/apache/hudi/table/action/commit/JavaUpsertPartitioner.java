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
import org.apache.hudi.common.fs.FSUtils;
import org.apache.hudi.common.model.HoodieBaseFile;
import org.apache.hudi.common.model.HoodieCommitMetadata;
import org.apache.hudi.common.model.HoodieKey;
import org.apache.hudi.common.model.HoodieRecordLocation;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.table.timeline.HoodieTimeline;
import org.apache.hudi.common.util.NumericUtils;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.ImmutablePair;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.table.HoodieTable;
import org.apache.hudi.table.WorkloadProfile;
import org.apache.hudi.table.WorkloadStat;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Packs incoming records to be upserted, into buckets.
 */
public class JavaUpsertPartitioner<T extends HoodieRecordPayload<T>> implements Partitioner  {

  private static final Logger LOG = LogManager.getLogger(JavaUpsertPartitioner.class);

  /**
   * List of all small files to be corrected.
   */
  protected List<SmallFile> smallFiles = new ArrayList<>();
  /**
   * Total number of RDD partitions, is determined by total buckets we want to pack the incoming workload into.
   */
  private int totalBuckets = 0;
  /**
   * Stat for the current workload. Helps in determining inserts, upserts etc.
   */
  private WorkloadProfile profile;
  /**
   * Helps decide which bucket an incoming update should go to.
   *
   * 帮助决定传入更新应转到哪个存储桶。
   * fileId, 桶号
   */
  private HashMap<String, Integer> updateLocationToBucket;
  /**
   * Helps us pack inserts into 1 or more buckets depending on number of incoming records.
   */
  private HashMap<String, List<InsertBucketCumulativeWeightPair>> partitionPathToInsertBucketInfos;
  /**
   * Remembers what type each bucket is for later.
   */
  private HashMap<Integer, BucketInfo> bucketInfoMap;

  protected final HoodieTable table;

  protected final HoodieWriteConfig config;

  public JavaUpsertPartitioner(WorkloadProfile profile, HoodieEngineContext context, HoodieTable table,
                               HoodieWriteConfig config) {
    updateLocationToBucket = new HashMap<>();
    partitionPathToInsertBucketInfos = new HashMap<>();
    bucketInfoMap = new HashMap<>();
    this.profile = profile;
    this.table = table;
    this.config = config;
    assignUpdates(profile);
    assignInserts(profile, context);

    LOG.info("Total Buckets :" + totalBuckets + ", buckets info => " + bucketInfoMap + ", \n"
        + "Partition to insert buckets => " + partitionPathToInsertBucketInfos + ", \n"
        + "UpdateLocations mapped to buckets =>" + updateLocationToBucket);
  }

  private void assignUpdates(WorkloadProfile profile) {
    // each update location gets a partition
    // 分区路径，WorkloadStat
    Set<Map.Entry<String, WorkloadStat>> partitionStatEntries = profile.getPartitionPathStatMap().entrySet();
    // 遍历分区路径
    for (Map.Entry<String, WorkloadStat> partitionStat : partitionStatEntries) {
      // partitionStat.getValue() 为 WorkloadStat
      // WorkloadStat.getUpdateLocationToCount() 返回：fileId,(instantTime,记录数)
      // 遍历fileId
      for (Map.Entry<String, Pair<String, Long>> updateLocEntry :
          partitionStat.getValue().getUpdateLocationToCount().entrySet()) {
        // partitionStat.getKey() 为 分区路径
        // updateLocEntry.getKey() 为 fileId
        addUpdateBucket(partitionStat.getKey(), updateLocEntry.getKey());
      }
    }
  }

  private int addUpdateBucket(String partitionPath, String fileIdHint) {
    // 桶数（桶号，桶ID），初始值为0
    int bucket = totalBuckets;
    // fileId, 桶号
    updateLocationToBucket.put(fileIdHint, bucket);
    // UPDATE, FileId, partitionPath
    BucketInfo bucketInfo = new BucketInfo(BucketType.UPDATE, fileIdHint, partitionPath);
    // 桶号，bucketInfo
    bucketInfoMap.put(totalBuckets, bucketInfo);
    // 桶数 +1
    totalBuckets++;
    // 返回当前桶号
    return bucket;
  }

  private void assignInserts(WorkloadProfile profile, HoodieEngineContext context) {
    // for new inserts, compute buckets depending on how many records we have for each partition
    // 对于新插入，根据每个分区的记录数计算存储桶
    // 所有的分区路径
    Set<String> partitionPaths = profile.getPartitionPaths();
    // 获取基于在以前提交期间写入的记录的平均记录大小。用于估计一个文件中包含多少条记录。
    long averageRecordSize =
        averageBytesPerRecord(table.getMetaClient().getActiveTimeline().getCommitTimeline().filterCompletedInstants(),
            config);
    LOG.info("AvgRecordSize => " + averageRecordSize);

    // 分区路径，小文件
    Map<String, List<SmallFile>> partitionSmallFilesMap =
        getSmallFilesForPartitions(new ArrayList<String>(partitionPaths), context);

    // 遍历分区路径
    for (String partitionPath : partitionPaths) {
      // 该分区路径的 WorkloadStat
      WorkloadStat pStat = profile.getWorkloadStat(partitionPath);
      if (pStat.getNumInserts() > 0) {

        List<SmallFile> smallFiles = partitionSmallFilesMap.get(partitionPath);
        this.smallFiles.addAll(smallFiles);

        LOG.info("For partitionPath : " + partitionPath + " Small Files => " + smallFiles);
        // 总的插入数
        long totalUnassignedInserts = pStat.getNumInserts();
        // 桶号
        List<Integer> bucketNumbers = new ArrayList<>();
        // 每个桶需要插入的记录数
        List<Long> recordsPerBucket = new ArrayList<>();

        // first try packing this into one of the smallFiles
        // 首先尝试将记录合并写到小文件中。
        for (SmallFile smallFile : smallFiles) { // 遍历小文件
          // 该小文件还可以插入多少条数据
          long recordsToAppend = Math.min((config.getParquetMaxFileSize() - smallFile.sizeBytes) / averageRecordSize,
              totalUnassignedInserts);
          if (recordsToAppend > 0) {
            // create a new bucket or re-use an existing bucket
            int bucket;
            // 如果该 FileId 已经有对应的桶了。
            // 这里说明在新增的数据里有对应的记录和该FileID对应的文件里的记录主键相同。
            // 即该文件里的记录涉及更新。
            if (updateLocationToBucket.containsKey(smallFile.location.getFileId())) {
              // 获取 该 FileId  对应的桶号
              bucket = updateLocationToBucket.get(smallFile.location.getFileId());
              LOG.info("Assigning " + recordsToAppend + " inserts to existing update bucket " + bucket);
            } else {
              // 如果没有，表名该文件里的记录不涉及更新
              // 那么，就新分配一个 update 桶，返回新的桶号。
              // 这里说明 update 桶 对应的文件也有纯 insert 数据的情况。
              // 也就表明：update 桶 对应的是已经存在的文件（已有fileId），insert 桶对应的是新增的文件 (新的fileId)
              bucket = addUpdateBucket(partitionPath, smallFile.location.getFileId());
              LOG.info("Assigning " + recordsToAppend + " inserts to new update bucket " + bucket);
            }
            bucketNumbers.add(bucket);
            recordsPerBucket.add(recordsToAppend);
            // 更新总的插入数为剩余数
            totalUnassignedInserts -= recordsToAppend;
          }
        }

        // if we have anything more, create new insert buckets, like normal
        // 如果还有其他内容，像正常情况一样创建新的插入桶
        if (totalUnassignedInserts > 0) {
          // 每个桶应该插入的记录数
          long insertRecordsPerBucket = config.getCopyOnWriteInsertSplitSize();
          if (config.shouldAutoTuneInsertSplits()) {
            insertRecordsPerBucket = config.getParquetMaxFileSize() / averageRecordSize;
          }
          // 需要新插入的桶数，插入桶数=总记录数/每个桶应该插入的记录数
          int insertBuckets = (int) Math.ceil((1.0 * totalUnassignedInserts) / insertRecordsPerBucket);
          LOG.info("After small file assignment: unassignedInserts => " + totalUnassignedInserts
              + ", totalInsertBuckets => " + insertBuckets + ", recordsPerBucket => " + insertRecordsPerBucket);
          for (int b = 0; b < insertBuckets; b++) {
            bucketNumbers.add(totalBuckets);
            if (b < insertBuckets - 1) {
              // 不是最后一个桶，每个桶的记录数都是 insertRecordsPerBucket
              recordsPerBucket.add(insertRecordsPerBucket);
            } else {
              // 最后一个桶，记录数是总记录数减去前面的所有桶的记录数
              recordsPerBucket.add(totalUnassignedInserts - (insertBuckets - 1) * insertRecordsPerBucket);
            }
            // INSERT, FileId, partitionPath
            BucketInfo bucketInfo = new BucketInfo(BucketType.INSERT, FSUtils.createNewFileIdPfx(), partitionPath);
            // 桶号，bucketInfo
            bucketInfoMap.put(totalBuckets, bucketInfo);
            // 桶数+1
            totalBuckets++;
          }
        }

        // Go over all such buckets, and assign weights as per amount of incoming inserts.
        // 检查所有这些桶，并根据传入插入的数量分配权重。
        // 给每个通分配权重的目的主要是：根据key觉得数据应该分到哪个桶，如果是更新数据，直接根据fileId获取对应的桶号
        // 如果是新增数据，则根据分配权重计算得到对应的桶号
        // 具体实现方法在 getPartition 中
        List<InsertBucketCumulativeWeightPair> insertBuckets = new ArrayList<>();
        double curentCumulativeWeight = 0;
        for (int i = 0; i < bucketNumbers.size(); i++) {
          InsertBucket bkt = new InsertBucket();
          bkt.bucketNumber = bucketNumbers.get(i);
          bkt.weight = (1.0 * recordsPerBucket.get(i)) / pStat.getNumInserts();
          curentCumulativeWeight += bkt.weight;
          insertBuckets.add(new InsertBucketCumulativeWeightPair(bkt, curentCumulativeWeight));
        }
        LOG.info("Total insert buckets for partition path " + partitionPath + " => " + insertBuckets);
        partitionPathToInsertBucketInfos.put(partitionPath, insertBuckets);
      }
    }
  }

  private Map<String, List<SmallFile>> getSmallFilesForPartitions(List<String> partitionPaths, HoodieEngineContext context) {
    Map<String, List<SmallFile>> partitionSmallFilesMap = new HashMap<>();
    if (partitionPaths != null && partitionPaths.size() > 0) {
      context.setJobStatus(this.getClass().getSimpleName(), "Getting small files from partitions");
      partitionSmallFilesMap = context.mapToPair(partitionPaths,
          partitionPath -> new ImmutablePair<>(partitionPath, getSmallFiles(partitionPath)), 0);
    }
    return partitionSmallFilesMap;
  }

  /**
   * Returns a list of small files in the given partition path.
   */
  protected List<SmallFile> getSmallFiles(String partitionPath) {

    // smallFiles only for partitionPath
    List<SmallFile> smallFileLocations = new ArrayList<>();

    HoodieTimeline commitTimeline = table.getMetaClient().getCommitsTimeline().filterCompletedInstants();

    if (!commitTimeline.empty()) { // if we have some commits
      HoodieInstant latestCommitTime = commitTimeline.lastInstant().get();
      List<HoodieBaseFile> allFiles = table.getBaseFileOnlyView()
          .getLatestBaseFilesBeforeOrOn(partitionPath, latestCommitTime.getTimestamp()).collect(Collectors.toList());

      for (HoodieBaseFile file : allFiles) {
        if (file.getFileSize() < config.getParquetSmallFileLimit()) {
          String filename = file.getFileName();
          SmallFile sf = new SmallFile();
          sf.location = new HoodieRecordLocation(FSUtils.getCommitTime(filename), FSUtils.getFileId(filename));
          sf.sizeBytes = file.getFileSize();
          smallFileLocations.add(sf);
        }
      }
    }

    return smallFileLocations;
  }

  public BucketInfo getBucketInfo(int bucketNumber) {
    return bucketInfoMap.get(bucketNumber);
  }

  public List<InsertBucketCumulativeWeightPair> getInsertBuckets(String partitionPath) {
    return partitionPathToInsertBucketInfos.get(partitionPath);
  }

  @Override
  public int getNumPartitions() {
    return totalBuckets;
  }

  @Override
  public int getPartition(Object key) {
    Pair<HoodieKey, Option<HoodieRecordLocation>> keyLocation =
        (Pair<HoodieKey, Option<HoodieRecordLocation>>) key;
    if (keyLocation.getRight().isPresent()) {
      HoodieRecordLocation location = keyLocation.getRight().get();
      return updateLocationToBucket.get(location.getFileId());
    } else {
      String partitionPath = keyLocation.getLeft().getPartitionPath();
      List<InsertBucketCumulativeWeightPair> targetBuckets = partitionPathToInsertBucketInfos.get(partitionPath);
      // pick the target bucket to use based on the weights.
      final long totalInserts = Math.max(1, profile.getWorkloadStat(partitionPath).getNumInserts());
      final long hashOfKey = NumericUtils.getMessageDigestHash("MD5", keyLocation.getLeft().getRecordKey());
      final double r = 1.0 * Math.floorMod(hashOfKey, totalInserts) / totalInserts;

      int index = Collections.binarySearch(targetBuckets, new InsertBucketCumulativeWeightPair(new InsertBucket(), r));

      if (index >= 0) {
        return targetBuckets.get(index).getKey().bucketNumber;
      }

      if ((-1 * index - 1) < targetBuckets.size()) {
        return targetBuckets.get((-1 * index - 1)).getKey().bucketNumber;
      }

      // return first one, by default
      return targetBuckets.get(0).getKey().bucketNumber;
    }
  }

  /**
   * Obtains the average record size based on records written during previous commits. Used for estimating how many
   * records pack into one file.
   */
  protected static long averageBytesPerRecord(HoodieTimeline commitTimeline, HoodieWriteConfig hoodieWriteConfig) {
    long avgSize = hoodieWriteConfig.getCopyOnWriteRecordSizeEstimate();
    long fileSizeThreshold = (long) (hoodieWriteConfig.getRecordSizeEstimationThreshold() * hoodieWriteConfig.getParquetSmallFileLimit());
    try {
      if (!commitTimeline.empty()) {
        // Go over the reverse ordered commits to get a more recent estimate of average record size.
        Iterator<HoodieInstant> instants = commitTimeline.getReverseOrderedInstants().iterator();
        while (instants.hasNext()) {
          HoodieInstant instant = instants.next();
          HoodieCommitMetadata commitMetadata = HoodieCommitMetadata
              .fromBytes(commitTimeline.getInstantDetails(instant).get(), HoodieCommitMetadata.class);
          long totalBytesWritten = commitMetadata.fetchTotalBytesWritten();
          long totalRecordsWritten = commitMetadata.fetchTotalRecordsWritten();
          if (totalBytesWritten > fileSizeThreshold && totalRecordsWritten > 0) {
            avgSize = (long) Math.ceil((1.0 * totalBytesWritten) / totalRecordsWritten);
            break;
          }
        }
      }
    } catch (Throwable t) {
      // make this fail safe.
      LOG.error("Error trying to compute average bytes/record ", t);
    }
    return avgSize;
  }
}
