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

package org.apache.hudi.metadata;

import org.apache.hudi.common.config.SerializableConfiguration;
import org.apache.hudi.common.engine.HoodieEngineContext;
import org.apache.hudi.common.fs.FSUtils;
import org.apache.hudi.common.model.HoodiePartitionMetadata;
import org.apache.hudi.common.table.HoodieTableMetaClient;
import org.apache.hudi.common.util.Option;
import org.apache.hudi.common.util.collection.Pair;

import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FileSystemBackedTableMetadata implements HoodieTableMetadata {

  private static final int DEFAULT_LISTING_PARALLELISM = 1500;

  private final transient HoodieEngineContext engineContext;
  private final SerializableConfiguration hadoopConf;
  private final String datasetBasePath;
  private final boolean assumeDatePartitioning;

  public FileSystemBackedTableMetadata(HoodieEngineContext engineContext, SerializableConfiguration conf, String datasetBasePath,
                                       boolean assumeDatePartitioning) {
    this.engineContext = engineContext;
    this.hadoopConf = conf;
    this.datasetBasePath = datasetBasePath;
    this.assumeDatePartitioning = assumeDatePartitioning;
  }

  @Override
  public FileStatus[] getAllFilesInPartition(Path partitionPath) throws IOException {
    FileSystem fs = partitionPath.getFileSystem(hadoopConf.get());
    return FSUtils.getAllDataFilesInPartition(fs, partitionPath);
  }

  @Override
  public List<String> getAllPartitionPaths() throws IOException {
    if (assumeDatePartitioning) { // 默认false
      FileSystem fs = new Path(datasetBasePath).getFileSystem(hadoopConf.get());
      return FSUtils.getAllPartitionFoldersThreeLevelsDown(fs, datasetBasePath);
    }

    List<Path> pathsToList = new LinkedList<>();
    pathsToList.add(new Path(datasetBasePath));
    List<String> partitionPaths = new ArrayList<>();

    while (!pathsToList.isEmpty()) {
      // TODO: Get the parallelism from HoodieWriteConfig
      int listingParallelism = Math.min(DEFAULT_LISTING_PARALLELISM, pathsToList.size());

      // List all directories in parallel
      // 列出pathsToList里path的所有的一级文件及路径
      List<Pair<Path, FileStatus[]>> dirToFileListing = engineContext.map(pathsToList, path -> {
        FileSystem fileSystem = path.getFileSystem(hadoopConf.get());
        return Pair.of(path, fileSystem.listStatus(path));
      }, listingParallelism);
      // 清空pathsToList
      pathsToList.clear();

      // If the listing reveals a directory, add it to queue. If the listing reveals a hoodie partition, add it to
      // the results.
      dirToFileListing.forEach(p -> {
        // 过滤查找分区路径`HOODIE_PARTITION_METAFILE`即.hoodie_partition_metadata
        Option<FileStatus> partitionMetaFile = Option.fromJavaOptional(Arrays.stream(p.getRight()).parallel()
            .filter(fs -> fs.getPath().getName().equals(HoodiePartitionMetadata.HOODIE_PARTITION_METAFILE))
            .findFirst());

        if (partitionMetaFile.isPresent()) {
          // 如果分区路径存在，那么代表当前遍历的路径是分区路径
          // 即p.getLeft()，通过`getRelativePartitionPath`将相对路径添加到partitionPaths列表中
          // 如果没有分区字段的话，当前路径也就是datasetBasePath就是分区路径，相对路径为空""
          // 如果有分区字段，相对路径为所有的 `partitionField1=partitionField1Val/partitionField2=partitionField2Val/...`
          // 这里假设是Hive格式的分区路径
          // Is a partition.
          String partitionName = FSUtils.getRelativePartitionPath(new Path(datasetBasePath), p.getLeft());
          partitionPaths.add(partitionName);
        } else {
          // 如果当前路径下没有分区路径，那么继续遍历子路径，直到找到分区路径，或者遍历完所有的子路径
          // 这里的子路径不包含`METAFOLDER_NAME`,即.hoodie
          // 如果是有分区字段的话，需要遍历完所有的分区路径
          // Add sub-dirs to the queue
          pathsToList.addAll(Arrays.stream(p.getRight())
              .filter(fs -> fs.isDirectory() && !fs.getPath().getName().equals(HoodieTableMetaClient.METAFOLDER_NAME))
              .map(fs -> fs.getPath())
              .collect(Collectors.toList()));
        }
      });
    }
    // 返回分区路径列表
    return partitionPaths;
  }

  @Override
  public Map<String, FileStatus[]> getAllFilesInPartitions(List<String> partitionPaths)
      throws IOException {
    if (partitionPaths == null || partitionPaths.isEmpty()) {
      return Collections.emptyMap();
    }

    int parallelism = Math.min(DEFAULT_LISTING_PARALLELISM, partitionPaths.size());

    List<Pair<String, FileStatus[]>> partitionToFiles = engineContext.map(partitionPaths, partitionPathStr -> {
      Path partitionPath = new Path(partitionPathStr);
      FileSystem fs = partitionPath.getFileSystem(hadoopConf.get());
      return Pair.of(partitionPathStr, FSUtils.getAllDataFilesInPartition(fs, partitionPath));
    }, parallelism);

    return partitionToFiles.stream().collect(Collectors.toMap(Pair::getLeft, Pair::getRight));
  }

  @Override
  public Option<String> getUpdateTime() {
    throw new UnsupportedOperationException();
  }

  @Override
  public boolean isInSync() {
    return true;
  }

  @Override
  public void close() throws Exception {
    // no-op
  }
}
