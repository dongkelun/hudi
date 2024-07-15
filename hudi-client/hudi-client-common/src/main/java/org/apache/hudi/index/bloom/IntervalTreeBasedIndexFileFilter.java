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

import org.apache.hudi.common.util.collection.Pair;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Interval Tree based index look up. Builds an {@link KeyRangeLookupTree} for every partition and uses it to search for
 * matching index files for any given recordKey that needs to be looked up.
 *
 * 基于区间树的索引查找。为每个分区构建一个｛@link KeyRangeLookupTree｝，并使用它来搜索需要查找的任何给定recordKey的匹配索引文件。
 */
class IntervalTreeBasedIndexFileFilter implements IndexFileFilter {

  // (partition,KeyRangeLookupTree)
  private final Map<String, KeyRangeLookupTree> partitionToFileIndexLookUpTree = new HashMap<>();
  private final Map<String, Set<String>> partitionToFilesWithNoRanges = new HashMap<>();

  /**
   * Instantiates {@link IntervalTreeBasedIndexFileFilter}.
   *
   * @param partitionToFileIndexInfo Map of partition to List of {@link BloomIndexFileInfo}s
   */
  IntervalTreeBasedIndexFileFilter(final Map<String, List<BloomIndexFileInfo>> partitionToFileIndexInfo) {
    partitionToFileIndexInfo.forEach((partition, bloomIndexFiles) -> {
      // Note that the interval tree implementation doesn't have auto-balancing to ensure logN search time.
      // 请注意，区间树实现没有自动平衡来确保logN搜索时间。
      // So, we are shuffling the input here hoping the tree will not have any skewness. If not, the tree could be
      // skewed which could result in N search time instead of logN.
      // 所以，我们在这里打乱输入，希望树不会有任何倾斜。否则，树可能会倾斜，这可能导致搜索时间是N而不是logN。
      Collections.shuffle(bloomIndexFiles);
      KeyRangeLookupTree lookUpTree = new KeyRangeLookupTree();
      bloomIndexFiles.forEach(indexFileInfo -> {
        if (indexFileInfo.hasKeyRanges()) { // 如果有最大值最小值
          // 将 最大值，最小值，fileId 插入到 lookUpTree
          // 构造间区间树
          lookUpTree.insert(new KeyRangeNode(indexFileInfo.getMinRecordKey(), indexFileInfo.getMaxRecordKey(),
              indexFileInfo.getFileId()));
        } else {
          if (!partitionToFilesWithNoRanges.containsKey(partition)) {
            partitionToFilesWithNoRanges.put(partition, new HashSet<>());
          }
          // 将没有最大值最小值的 fileId 添加到 partitionToFilesWithNoRanges
          partitionToFilesWithNoRanges.get(partition).add(indexFileInfo.getFileId());
        }
      });
      partitionToFileIndexLookUpTree.put(partition, lookUpTree);
    });
  }

  @Override
  public Set<Pair<String, String>> getMatchingFilesAndPartition(String partitionPath, String recordKey) {
    // (partitionPath, fileId)
    Set<Pair<String, String>> toReturn = new HashSet<>();
    // could be null, if there are no files in a given partition yet or if all index files have no ranges
    // 如果给定分区中还没有文件，或者所有索引文件都没有范围，则可能为null
    if (partitionToFileIndexLookUpTree.containsKey(partitionPath)) {
      // 利用 KeyRangeLookupTree 查找该分区下有最大值最小值的文件中可能包含该 recordKey 的 fileId 列表
      // 查找逻辑：根据文件的最大最小值判断，如果 recordKey 在最大值最小值区间，则可能存在该文件中
      // 如果不在最大值最小值区间，则不存在该文件中
      partitionToFileIndexLookUpTree.get(partitionPath).getMatchingIndexFiles(recordKey).forEach(file ->
          toReturn.add(Pair.of(partitionPath, file)));
    }
    if (partitionToFilesWithNoRanges.containsKey(partitionPath)) {
      // 对于没有最大值最小值的文件，则认为都是可能存在该 recordKey ，所以全部返回
      partitionToFilesWithNoRanges.get(partitionPath).forEach(file ->
          toReturn.add(Pair.of(partitionPath, file)));
    }
    return toReturn;
  }
}
