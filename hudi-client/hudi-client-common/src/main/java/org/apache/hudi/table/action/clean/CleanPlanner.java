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

import org.apache.hudi.avro.model.HoodieCleanMetadata;
import org.apache.hudi.avro.model.HoodieSavepointMetadata;
import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.fs.FSUtils;
import org.apache.hudi.common.model.CleanFileInfo;
import org.apache.hudi.common.model.CompactionOperation;
import org.apache.hudi.common.model.FileSlice;
import org.apache.hudi.common.model.HoodieBaseFile;
import org.apache.hudi.common.model.HoodieCleaningPolicy;
import org.apache.hudi.common.model.HoodieCommitMetadata;
import org.apache.hudi.common.model.HoodieFileGroup;
import org.apache.hudi.common.model.HoodieFileGroupId;
import org.apache.hudi.common.model.HoodieRecordPayload;
import org.apache.hudi.common.model.HoodieReplaceCommitMetadata;
import org.apache.hudi.common.model.HoodieTableType;
import org.apache.hudi.common.table.timeline.HoodieInstant;
import org.apache.hudi.common.table.timeline.HoodieTimeline;
import org.apache.hudi.common.table.timeline.TimelineMetadataUtils;
import org.apache.hudi.common.table.timeline.versioning.clean.CleanPlanV1MigrationHandler;
import org.apache.hudi.common.table.timeline.versioning.clean.CleanPlanV2MigrationHandler;
import org.apache.hudi.common.table.view.SyncableFileSystemView;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieIOException;
import org.apache.hudi.exception.HoodieSavepointException;
import org.apache.hudi.table.HoodieTable;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Cleaner is responsible for garbage collecting older files in a given partition path. Such that
 * <p>
 * 1) It provides sufficient time for existing queries running on older versions, to close
 * <p>
 * 2) It bounds the growth of the files in the file system
 */
public class CleanPlanner<T extends HoodieRecordPayload, I, K, O> implements Serializable {

  private static final Logger LOG = LogManager.getLogger(CleanPlanner.class);

  public static final Integer CLEAN_PLAN_VERSION_1 = CleanPlanV1MigrationHandler.VERSION;
  public static final Integer CLEAN_PLAN_VERSION_2 = CleanPlanV2MigrationHandler.VERSION;
  public static final Integer LATEST_CLEAN_PLAN_VERSION = CLEAN_PLAN_VERSION_2;

  private final SyncableFileSystemView fileSystemView;
  private final HoodieTimeline commitTimeline;
  private final Map<HoodieFileGroupId, CompactionOperation> fgIdToPendingCompactionOperations;
  private HoodieTable<T, I, K, O> hoodieTable;
  private HoodieWriteConfig config;
  private transient HoodieEngineContext context;

  public CleanPlanner(HoodieEngineContext context, HoodieTable<T, I, K, O> hoodieTable, HoodieWriteConfig config) {
    this.context = context;
    this.hoodieTable = hoodieTable;
    this.fileSystemView = hoodieTable.getHoodieView();
    this.commitTimeline = hoodieTable.getCompletedCommitsTimeline();
    this.config = config;
    this.fgIdToPendingCompactionOperations =
        ((SyncableFileSystemView) hoodieTable.getSliceView()).getPendingCompactionOperations()
            .map(entry -> Pair.of(
                new HoodieFileGroupId(entry.getValue().getPartitionPath(), entry.getValue().getFileId()),
                entry.getValue()))
            .collect(Collectors.toMap(Pair::getKey, Pair::getValue));
  }

  /**
   * Get the list of data file names savepointed.
   */
  public Stream<String> getSavepointedDataFiles(String savepointTime) {
    if (!hoodieTable.getSavepoints().contains(savepointTime)) {
      throw new HoodieSavepointException(
          "Could not get data files for savepoint " + savepointTime + ". No such savepoint.");
    }
    HoodieInstant instant = new HoodieInstant(false, HoodieTimeline.SAVEPOINT_ACTION, savepointTime);
    HoodieSavepointMetadata metadata;
    try {
      metadata = TimelineMetadataUtils.deserializeHoodieSavepointMetadata(
          hoodieTable.getActiveTimeline().getInstantDetails(instant).get());
    } catch (IOException e) {
      throw new HoodieSavepointException("Could not get savepointed data files for savepoint " + savepointTime, e);
    }
    return metadata.getPartitionMetadata().values().stream().flatMap(s -> s.getSavepointDataFile().stream());
  }

  /**
   * Returns list of partitions where clean operations needs to be performed.
   * 返回清理操作需要执行的分区列表
   *
   * @param earliestRetainedInstant New instant to be retained after this cleanup operation
   * @return list of partitions to scan for cleaning
   * @throws IOException when underlying file-system throws this exception
   */
  public List<String> getPartitionPathsToClean(Option<HoodieInstant> earliestRetainedInstant) throws IOException {
    switch (config.getCleanerPolicy()) {
      case KEEP_LATEST_COMMITS:
        return getPartitionPathsForCleanByCommits(earliestRetainedInstant);
      case KEEP_LATEST_FILE_VERSIONS:
        return getPartitionPathsForFullCleaning();
      default:
        throw new IllegalStateException("Unknown Cleaner Policy");
    }
  }

  /**
   * Return partition paths for cleaning by commits mode.
   * @param instantToRetain Earliest Instant to retain
   * @return list of partitions
   * @throws IOException
   */
  private List<String> getPartitionPathsForCleanByCommits(Option<HoodieInstant> instantToRetain) throws IOException {
    if (!instantToRetain.isPresent()) {
      LOG.info("No earliest commit to retain. No need to scan partitions !!");
      return Collections.emptyList();
    }

    if (config.incrementalCleanerModeEnabled()) { // 默认true
      // 最后一个.clean
      Option<HoodieInstant> lastClean = hoodieTable.getCleanTimeline().filterCompletedInstants().lastInstant();
      if (lastClean.isPresent()) {
        // 最后一个.clean存在，反序列生成`HoodieCleanMetadata`
        HoodieCleanMetadata cleanMetadata = TimelineMetadataUtils
            .deserializeHoodieCleanMetadata(hoodieTable.getActiveTimeline().getInstantDetails(lastClean.get()).get());
        if ((cleanMetadata.getEarliestCommitToRetain() != null)
            && (cleanMetadata.getEarliestCommitToRetain().length() > 0)) {
          // 如果最后一个.clean存在earliestCommitToRetain
          // 如果上一次clean操作执行成功的话会将上一次的earliestCommitToRetain序列化到.clean文件中
          return getPartitionPathsForIncrementalCleaning(cleanMetadata, instantToRetain);
        }
      }
    }
    // 当instantToRetain不为空且是第一次clean时，调用getPartitionPathsForFullCleaning获取分区路径
    // 这时和策略为KEEP_LATEST_FILE_VERSIONS时的逻辑一样，只不过KEEP_LATEST_FILE_VERSIONS不用instantToRetain非空
    return getPartitionPathsForFullCleaning();
  }

  /**
   * Use Incremental Mode for finding partition paths.
   * 用增量模式查找分区路径
   *
   * @param cleanMetadata
   * @param newInstantToRetain
   * @return
   */
  private List<String> getPartitionPathsForIncrementalCleaning(HoodieCleanMetadata cleanMetadata,
      Option<HoodieInstant> newInstantToRetain) {
    LOG.info("Incremental Cleaning mode is enabled. Looking up partition-paths that have since changed "
        + "since last cleaned at " + cleanMetadata.getEarliestCommitToRetain()
        + ". New Instant to retain : " + newInstantToRetain);
    // 过滤大于等于上次.clean保存的earliestCommitToRetain && 小于这次earliestCommitToRetain的commit
    // 即我们要找出介于上次clean和这次clean之间的分区路径 [lastEarliestCommitToRetain,thisEarliestCommitToRetain)
    return hoodieTable.getCompletedCommitsTimeline().getInstants().filter(
        instant -> HoodieTimeline.compareTimestamps(instant.getTimestamp(), HoodieTimeline.GREATER_THAN_OR_EQUALS,
            cleanMetadata.getEarliestCommitToRetain()) && HoodieTimeline.compareTimestamps(instant.getTimestamp(),
            HoodieTimeline.LESSER_THAN, newInstantToRetain.get().getTimestamp())).flatMap(instant -> {
              try {
                if (HoodieTimeline.REPLACE_COMMIT_ACTION.equals(instant.getAction())) {
                  // 如果instant类型为`REPLACE_COMMIT_ACTION`,即`replacecommit`
                  // 反序列化为HoodieReplaceCommitMetadata，并返回replaceCommitMetadata涉及的所有分区路径
                  HoodieReplaceCommitMetadata replaceCommitMetadata = HoodieReplaceCommitMetadata.fromBytes(
                      hoodieTable.getActiveTimeline().getInstantDetails(instant).get(), HoodieReplaceCommitMetadata.class);
                  return Stream.concat(replaceCommitMetadata.getPartitionToReplaceFileIds().keySet().stream(), replaceCommitMetadata.getPartitionToWriteStats().keySet().stream());
                } else {
                  // 否则，反序列化为HoodieCommitMetadata，返回commitMetadata所涉及的所有分区路径
                  HoodieCommitMetadata commitMetadata = HoodieCommitMetadata
                      .fromBytes(hoodieTable.getActiveTimeline().getInstantDetails(instant).get(),
                          HoodieCommitMetadata.class);
                  return commitMetadata.getPartitionToWriteStats().keySet().stream();
                }
              } catch (IOException e) {
                throw new HoodieIOException(e.getMessage(), e);
              }
            }).distinct().collect(Collectors.toList());
  }

  /**
   * Scan and list all partitions for cleaning.
   * @return all partitions paths for the dataset.
   * @throws IOException
   */
  private List<String> getPartitionPathsForFullCleaning() {
    // Go to brute force mode of scanning all partitions
    return FSUtils.getAllPartitionPaths(context, config.getMetadataConfig(), config.getBasePath());
  }

  /**
   * Selects the older versions of files for cleaning, such that it bounds the number of versions of each file. This
   * policy is useful, if you are simply interested in querying the table, and you don't want too many versions for a
   * single file (i.e run it with versionsRetained = 1)
   *
   * 选择需要清理的旧版本文件，以限制每个文件的版本数。
   * 如果你只对查询表感兴趣，并且不希望一个文件有太多版本（比如保留一个文件版本）,那么策略很有用
   */
  private List<CleanFileInfo> getFilesToCleanKeepingLatestVersions(String partitionPath) {
    LOG.info("Cleaning " + partitionPath + ", retaining latest " + config.getCleanerFileVersionsRetained()
        + " file versions. ");
    // 初始化需要删除的路径列表，类型为`CleanFileInfo`
    List<CleanFileInfo> deletePaths = new ArrayList<>();
    // Collect all the datafiles savepointed by all the savepoints
    // 所有的通过savepoints保存的文件
    List<String> savepointedFiles = hoodieTable.getSavepoints().stream()
        .flatMap(this::getSavepointedDataFiles)
        .collect(Collectors.toList());

    // In this scenario, we will assume that once replaced a file group automatically becomes eligible for cleaning completely
    // In other words, the file versions only apply to the active file groups.
    deletePaths.addAll(getReplacedFilesEligibleToClean(savepointedFiles, partitionPath, Option.empty()));
    // 所有的fileGroup,简单说fileId一样的为一组
    List<HoodieFileGroup> fileGroups = fileSystemView.getAllFileGroups(partitionPath).collect(Collectors.toList());
    for (HoodieFileGroup fileGroup : fileGroups) { // 遍历fileGroups
      // 需要保留的文件版本数，通过`hoodie.cleaner.fileversions.retained`配置，默认3
      int keepVersions = config.getCleanerFileVersionsRetained();
      // do not cleanup slice required for pending compaction
      // 每个fileGroup对应的所有的数据（parquet）,过滤掉需要为`compaction`操作保留的文件
      Iterator<FileSlice> fileSliceIterator =
          fileGroup.getAllFileSlices().filter(fs -> !isFileSliceNeededForPendingCompaction(fs)).iterator();
      if (isFileGroupInPendingCompaction(fileGroup)) { // 如果fileGroup在PendingCompaction中
        // We have already saved the last version of file-groups for pending compaction Id
        // 版本数减一，因为我们已经将最新的版本保存在`pending compaction`中了
        keepVersions--;
      }

      // 遍历需要保留的版本文件
      while (fileSliceIterator.hasNext() && keepVersions > 0) { // 当有历史版本且keepVersions>0
        // Skip this most recent version
        // 取下一个版本的文件
        FileSlice nextSlice = fileSliceIterator.next();
        Option<HoodieBaseFile> dataFile = nextSlice.getBaseFile();
        if (dataFile.isPresent() && savepointedFiles.contains(dataFile.get().getFileName())) {
          // do not clean up a savepoint data file
          // 不清理`savepoint data file`
          continue;
        }
        // 版本数减一
        keepVersions--;
      }

      // Delete the remaining files
      // 剩下的文件都是需要删除的文件
      while (fileSliceIterator.hasNext()) {
        FileSlice nextSlice = fileSliceIterator.next();
        deletePaths.addAll(getCleanFileInfoForSlice(nextSlice));
      }
    }
    return deletePaths;
  }

  /**
   * Selects the versions for file for cleaning, such that it
   * <p>
   * - Leaves the latest version of the file untouched - For older versions, - It leaves all the commits untouched which
   * has occurred in last <code>config.getCleanerCommitsRetained()</code> commits - It leaves ONE commit before this
   * window. We assume that the max(query execution time) == commit_batch_time * config.getCleanerCommitsRetained().
   * This is 5 hours by default (assuming ingestion is running every 30 minutes). This is essential to leave the file
   * used by the query that is running for the max time.
   * <p>
   * This provides the effect of having lookback into all changes that happened in the last X commits. (eg: if you
   * retain 10 commits, and commit batch time is 30 mins, then you have 5 hrs of lookback)
   * <p>
   * This policy is the default.
   */
  private List<CleanFileInfo> getFilesToCleanKeepingLatestCommits(String partitionPath) {
    // commit保留数，默认10
    int commitsRetained = config.getCleanerCommitsRetained();
    LOG.info("Cleaning " + partitionPath + ", retaining latest " + commitsRetained + " commits. ");
    // 初始化需要删除的路径列表，类型为`CleanFileInfo`
    List<CleanFileInfo> deletePaths = new ArrayList<>();

    // Collect all the datafiles savepointed by all the savepoints
    // 所有的通过savepoints保存的文件
    List<String> savepointedFiles = hoodieTable.getSavepoints().stream()
        .flatMap(this::getSavepointedDataFiles)
        .collect(Collectors.toList());

    // determine if we have enough commits, to start cleaning.
    if (commitTimeline.countInstants() > commitsRetained) { // commit总数大于commit保留数
      // 最早需要保留的commit
      Option<HoodieInstant> earliestCommitToRetainOption = getEarliestCommitToRetain();
      HoodieInstant earliestCommitToRetain = earliestCommitToRetainOption.get();
      // all replaced file groups before earliestCommitToRetain are eligible to clean
      deletePaths.addAll(getReplacedFilesEligibleToClean(savepointedFiles, partitionPath, earliestCommitToRetainOption));
      // add active files
      // 所有的fileGroup,简单说fileId一样的为一组
      List<HoodieFileGroup> fileGroups = fileSystemView.getAllFileGroups(partitionPath).collect(Collectors.toList());
      for (HoodieFileGroup fileGroup : fileGroups) { // 遍历fileGroups
        // 每个fileGroup对应的所有的数据（parquet）文件
        List<FileSlice> fileSliceList = fileGroup.getAllFileSlices().collect(Collectors.toList());

        if (fileSliceList.isEmpty()) {
          continue;
        }
        // 该fileGroup中最新的版本
        String lastVersion = fileSliceList.get(0).getBaseInstantTime();
        // 小于earliestCommitToRetain的最近一次版本，该文件版本可能依旧被用来查询
        String lastVersionBeforeEarliestCommitToRetain =
            getLatestVersionBeforeCommit(fileSliceList, earliestCommitToRetain);

        // Ensure there are more than 1 version of the file (we only clean old files from updates)
        // i.e always spare the last commit.
        for (FileSlice aSlice : fileSliceList) {
          Option<HoodieBaseFile> aFile = aSlice.getBaseFile();
          String fileCommitTime = aSlice.getBaseInstantTime();
          if (aFile.isPresent() && savepointedFiles.contains(aFile.get().getFileName())) {
            // do not clean up a savepoint data file
            continue;
          }
          // Dont delete the latest commit and also the last commit before the earliest commit we
          // are retaining
          // The window of commit retain == max query run time. So a query could be running which
          // still
          // uses this file.
          if (fileCommitTime.equals(lastVersion) || (fileCommitTime.equals(lastVersionBeforeEarliestCommitToRetain))) {
            // move on to the next file
            continue;
          }

          // Always keep the last commit
          // 如果不需要为`compaction`操作保留这个文件 && earliestCommitToRetain > fileCommitTime
          if (!isFileSliceNeededForPendingCompaction(aSlice) && HoodieTimeline
              .compareTimestamps(earliestCommitToRetain.getTimestamp(), HoodieTimeline.GREATER_THAN, fileCommitTime)) {
            // this is a commit, that should be cleaned.
            aFile.ifPresent(hoodieDataFile -> {
              // 将该文件添加到deletePaths
              deletePaths.add(new CleanFileInfo(hoodieDataFile.getPath(), false));
              if (hoodieDataFile.getBootstrapBaseFile().isPresent() && config.shouldCleanBootstrapBaseFile()) {
                deletePaths.add(new CleanFileInfo(hoodieDataFile.getBootstrapBaseFile().get().getPath(), true));
              }
            });
            if (hoodieTable.getMetaClient().getTableType() == HoodieTableType.MERGE_ON_READ) {
              // If merge on read, then clean the log files for the commits as well
              deletePaths.addAll(aSlice.getLogFiles().map(lf -> new CleanFileInfo(lf.getPath().toString(), false))
                  .collect(Collectors.toList()));
            }
          }
        }
      }
    }
    // 返回需要删除的文件列表
    return deletePaths;
  }
  
  private List<CleanFileInfo> getReplacedFilesEligibleToClean(List<String> savepointedFiles, String partitionPath, Option<HoodieInstant> earliestCommitToRetain) {
    final Stream<HoodieFileGroup> replacedGroups;
    // 当策略为`KEEP_LATEST_COMMITS`，earliestCommitToRetain一定存在
    if (earliestCommitToRetain.isPresent()) {
      // fileSystemView 为`org.apache.hudi.common.table.view.PriorityBasedFileSystemView`
      replacedGroups = fileSystemView.getReplacedFileGroupsBefore(earliestCommitToRetain.get().getTimestamp(), partitionPath);
    } else {
      replacedGroups = fileSystemView.getAllReplacedFileGroups(partitionPath);
    }
    return replacedGroups.flatMap(HoodieFileGroup::getAllFileSlices)
        // do not delete savepointed files  (archival will make sure corresponding replacecommit file is not deleted)
        .filter(slice -> !slice.getBaseFile().isPresent() || !savepointedFiles.contains(slice.getBaseFile().get().getFileName()))
        .flatMap(slice -> getCleanFileInfoForSlice(slice).stream())
        .collect(Collectors.toList());
  }

  /**
   * Gets the latest version < instantTime. This version file could still be used by queries.
   * 找到最近的小于instantTime的版本的文件，这个版本的文件可能依旧被用来查询
   *
   * instantTime：earliestCommitToRetain
   *
   * 对于比较早的最近没有被操作的fileGroup,获得的文件等于该fileGroup对应的最新版本的文件，因为最新版本的文件的
   * 时间小于earliestCommitToRetain
   *
   */
  private String getLatestVersionBeforeCommit(List<FileSlice> fileSliceList, HoodieInstant instantTime) {
    // 遍历fileSliceList，fileSliceList内部有序（reverseOrder），文件按日期从大到小排序，
    for (FileSlice file : fileSliceList) {
      String fileCommitTime = file.getBaseInstantTime();
      if (HoodieTimeline.compareTimestamps(instantTime.getTimestamp(), HoodieTimeline.GREATER_THAN, fileCommitTime)) {
        // fileList is sorted on the reverse, so the first commit we find < instantTime is the
        // one we want
        // 直到instantTime > fileCommitTime, 返回fileCommitTime
        return fileCommitTime;
      }
    }
    // There is no version of this file which is < instantTime
    return null;
  }

  private List<CleanFileInfo> getCleanFileInfoForSlice(FileSlice nextSlice) {
    List<CleanFileInfo> cleanPaths = new ArrayList<>();
    if (nextSlice.getBaseFile().isPresent()) {
      HoodieBaseFile dataFile = nextSlice.getBaseFile().get();
      cleanPaths.add(new CleanFileInfo(dataFile.getPath(), false));
      if (dataFile.getBootstrapBaseFile().isPresent() && config.shouldCleanBootstrapBaseFile()) {
        cleanPaths.add(new CleanFileInfo(dataFile.getBootstrapBaseFile().get().getPath(), true));
      }
    }
    if (hoodieTable.getMetaClient().getTableType() == HoodieTableType.MERGE_ON_READ) {
      // If merge on read, then clean the log files for the commits as well
      cleanPaths.addAll(nextSlice.getLogFiles().map(lf -> new CleanFileInfo(lf.getPath().toString(), false))
          .collect(Collectors.toList()));
    }
    return cleanPaths;
  }

  /**
   * Returns files to be cleaned for the given partitionPath based on cleaning policy.
   * 基于清理策略根据给出的分区路径返回需要被清理的文件列表
   */
  public List<CleanFileInfo> getDeletePaths(String partitionPath) {
    HoodieCleaningPolicy policy = config.getCleanerPolicy();
    List<CleanFileInfo> deletePaths;
    if (policy == HoodieCleaningPolicy.KEEP_LATEST_COMMITS) {
      // 当策略为`KEEP_LATEST_COMMITS`,调用`getFilesToCleanKeepingLatestCommits`
      deletePaths = getFilesToCleanKeepingLatestCommits(partitionPath);
    } else if (policy == HoodieCleaningPolicy.KEEP_LATEST_FILE_VERSIONS) {
      deletePaths = getFilesToCleanKeepingLatestVersions(partitionPath);
    } else {
      throw new IllegalArgumentException("Unknown cleaning policy : " + policy.name());
    }
    LOG.info(deletePaths.size() + " patterns used to delete in partition path:" + partitionPath);

    return deletePaths;
  }

  /**
   * Returns earliest commit to retain based on cleaning policy.
   * 根据清理策略返回最早的需要保留的commit
   */
  public Option<HoodieInstant> getEarliestCommitToRetain() {
    Option<HoodieInstant> earliestCommitToRetain = Option.empty();
    // 获取最大保留commit次数，默认值10，配置参数为`hoodie.cleaner.commits.retained`
    int commitsRetained = config.getCleanerCommitsRetained();
    if (config.getCleanerPolicy() == HoodieCleaningPolicy.KEEP_LATEST_COMMITS
        && commitTimeline.countInstants() > commitsRetained) {
      // 如果清理策略为KEEP_LATEST_COMMITS,且commit的总数大于commitsRetained
      // 那么最早需要保留的commit为最新的第10个commit,也就倒数第10个
      // commitTimeline.instants是按照时间从小到大排序的，具体实现在`HoodieTableMetaClient.scanHoodieInstantsFromFileSystem`
      // 假如commit为1、2、3...11,那么`commitTimeline.countInstants() - commitsRetained`等于1，
      // 也就是返回commitTimeline.instants.get(1),返回`commit 2`(下标从0开始)，也就是倒数第10个
      // 当策略为KEEP_LATEST_FILE_VERSIONS，直接返回空
      earliestCommitToRetain = commitTimeline.nthInstant(commitTimeline.countInstants() - commitsRetained);
    }
    return earliestCommitToRetain;
  }

  /**
   * Determine if file slice needed to be preserved for pending compaction.
   * 判断是否需要为挂起的`compaction`操作保留文件
   * 
   * @param fileSlice File Slice
   * @return true if file slice needs to be preserved, false otherwise.
   */
  private boolean isFileSliceNeededForPendingCompaction(FileSlice fileSlice) {
    CompactionOperation op = fgIdToPendingCompactionOperations.get(fileSlice.getFileGroupId());
    if (null != op) {
      // If file slice's instant time is newer or same as that of operation, do not clean
      return HoodieTimeline.compareTimestamps(fileSlice.getBaseInstantTime(), HoodieTimeline.GREATER_THAN_OR_EQUALS, op.getBaseInstantTime()
      );
    }
    return false;
  }

  private boolean isFileGroupInPendingCompaction(HoodieFileGroup fg) {
    return fgIdToPendingCompactionOperations.containsKey(fg.getFileGroupId());
  }
}
