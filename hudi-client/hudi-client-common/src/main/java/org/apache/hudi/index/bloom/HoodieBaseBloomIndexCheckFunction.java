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

import org.apache.hudi.client.utils.LazyIterableIterator;
import org.apache.hudi.common.model.HoodieKey;
import org.apache.hudi.common.util.collection.Pair;
import org.apache.hudi.config.HoodieWriteConfig;
import org.apache.hudi.exception.HoodieException;
import org.apache.hudi.exception.HoodieIndexException;
import org.apache.hudi.io.HoodieKeyLookupHandle;
import org.apache.hudi.io.HoodieKeyLookupHandle.KeyLookupResult;
import org.apache.hudi.table.HoodieTable;

import java.util.function.Function;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Function performing actual checking of list containing (fileId, hoodieKeys) against the actual files.
 */
//TODO we can move this class into the hudi-client-common and reuse it for spark client
public class HoodieBaseBloomIndexCheckFunction 
        implements Function<Iterator<Pair<String, HoodieKey>>, Iterator<List<KeyLookupResult>>> {

  private final HoodieTable hoodieTable;

  private final HoodieWriteConfig config;

  public HoodieBaseBloomIndexCheckFunction(HoodieTable hoodieTable, HoodieWriteConfig config) {
    this.hoodieTable = hoodieTable;
    this.config = config;
  }

  @Override
  public Iterator<List<KeyLookupResult>> apply(Iterator<Pair<String, HoodieKey>> fileParitionRecordKeyTripletItr) {
    return new LazyKeyCheckIterator(fileParitionRecordKeyTripletItr);
  }

  @Override
  public <V> Function<V, Iterator<List<KeyLookupResult>>> compose(Function<? super V, ? extends Iterator<Pair<String, HoodieKey>>> before) {
    return null;
  }

  @Override
  public <V> Function<Iterator<Pair<String, HoodieKey>>, V> andThen(Function<? super Iterator<List<KeyLookupResult>>, ? extends V> after) {
    return null;
  }

  class LazyKeyCheckIterator extends LazyIterableIterator<Pair<String, HoodieKey>, List<KeyLookupResult>> {

    private HoodieKeyLookupHandle keyLookupHandle;

    LazyKeyCheckIterator(Iterator<Pair<String, HoodieKey>> filePartitionRecordKeyTripletItr) {
      super(filePartitionRecordKeyTripletItr);
    }

    @Override
    protected void start() {
    }

    @Override
    protected List<KeyLookupResult> computeNext() {
      List<KeyLookupResult> ret = new ArrayList<>();
      try {
        // process one file in each go.
        // 遍历 (fileId, HoodieKey)
        while (inputItr.hasNext()) {
          Pair<String, HoodieKey> currentTuple = inputItr.next();
          String fileId = currentTuple.getLeft();
          String partitionPath = currentTuple.getRight().getPartitionPath();
          String recordKey = currentTuple.getRight().getRecordKey();
          // (partitionPath, fileId)
          Pair<String, String> partitionPathFilePair = Pair.of(partitionPath, fileId);

          // lazily init state
          // 延迟初始化状态
          if (keyLookupHandle == null) {
            // 在 HoodieKeyLookupHandle 的构造方法中会读取保存在Parquet文件中的布隆过滤器信息
            // 将其反序列化为 BloomFilter
            keyLookupHandle = new HoodieKeyLookupHandle(config, hoodieTable, partitionPathFilePair);
          }

          // if continue on current file
          // 如果继续当前文件
          // (partitionPath, fileId) 确定一个文件，一个 fileId 对应多个HoodieKey，
          // 所以可能在一个文件上可能遍历多次
          // 前面已经按照 fileId 排序，所以可以保证一个 fileId 对应的记录是连续的。
          if (keyLookupHandle.getPartitionPathFilePair().equals(partitionPathFilePair)) {
            // 添加 recordKey
            // 这里利用布隆过滤器进行二次过滤，将命中(可能存在于该文件中)的 recordKey 添加到 candidateRecordKeys （候选RecordKeys）
            // bloomFilter.mightContain(recordKey) 判断该recordKey 是否可能存在于该文件
            keyLookupHandle.addKey(recordKey);
          } else { // 如果上一个文件结束
            // do the actual checking of file & break out
            // 进行文件的实际检查和分解
            // 将 keyLookupHandle.getLookupResult 查询结果添加到返回值 ret 中
            ret.add(keyLookupHandle.getLookupResult());
            // 新文件的 HoodieKeyLookupHandle
            keyLookupHandle = new HoodieKeyLookupHandle(config, hoodieTable, partitionPathFilePair);
            // 添加 recordKey
            // 这里利用布隆过滤器进行二次过滤，将命中(可能存在于该文件中)的 recordKey 添加到 candidateRecordKeys （候选RecordKeys）
            // bloomFilter.mightContain(recordKey) 判断该recordKey 是否可能存在于该文件
            keyLookupHandle.addKey(recordKey);
            break;
          }
        }

        // handle case, where we ran out of input, close pending work, update return val
        // 处理输入不足的情况，关闭待处理的工作，更新返回值
        if (!inputItr.hasNext()) {
          // 遍历结束，将最后一个文件的 getLookupResult 查询结果添加到返回值 ret 中
          ret.add(keyLookupHandle.getLookupResult());
        }
      } catch (Throwable e) {
        if (e instanceof HoodieException) {
          throw e;
        }
        throw new HoodieIndexException("Error checking bloom filter index. ", e);
      }
      return ret;
    }

    @Override
    protected void end() {
    }
  }
}
