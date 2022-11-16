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

package org.apache.hudi.table;

import org.apache.hudi.common.model.HoodieRecordLocation;
import org.apache.hudi.common.util.collection.Pair;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Wraps stats about a single partition path.
 */
public class WorkloadStat implements Serializable {

  private long numInserts = 0L;

  private long numUpdates = 0L;

  // fileId,(instantTime,记录数)
  private HashMap<String, Pair<String, Long>> updateLocationToCount;

  public WorkloadStat() {
    updateLocationToCount = new HashMap<>();
  }

  /**
   * numInserts数初始值0，addInserts将numInserts加上对应的记录数
   */
  public long addInserts(long numInserts) {
    return this.numInserts += numInserts;
  }

  /**
   *  accNumUpdates初始值0
   * 如果updateLocationToCount中有对应的fileId，
   * 则先获取updateLocationToCount对应的fileId对应的记录数赋值给accNumUpdates
   * 最后将updateLocationToCount
   */
  public long addUpdates(HoodieRecordLocation location, long numUpdates) {
    // 初始值0
    long accNumUpdates = 0;
    // 如果已经存在了对应的fileId
    if (updateLocationToCount.containsKey(location.getFileId())) {
      // 将updateLocationToCount中对应的数取出来赋值给accNumUpdates
      accNumUpdates = updateLocationToCount.get(location.getFileId()).getRight();
    }
    // 更新updateLocationToCount中该fileId对应的value。value为pair,将value的left即instantTime更新为location.getInstantTime()
    // 将value的right即记录数更新为numUpdates + accNumUpdates
    updateLocationToCount.put(
        location.getFileId(),
        Pair.of(location.getInstantTime(), numUpdates + accNumUpdates));
    // numUpdates初始值为0，每次调用addUpdates都将numUpdates加上对应的record数
    return this.numUpdates += numUpdates;
  }

  public long getNumUpdates() {
    return numUpdates;
  }

  public long getNumInserts() {
    return numInserts;
  }

  public HashMap<String, Pair<String, Long>> getUpdateLocationToCount() {
    return updateLocationToCount;
  }

  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder("WorkloadStat {");
    sb.append("numInserts=").append(numInserts).append(", ");
    sb.append("numUpdates=").append(numUpdates);
    sb.append('}');
    return sb.toString();
  }
}
