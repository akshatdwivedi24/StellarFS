package com.stellarfs.service;

import com.stellarfs.model.dto.NodeStorageData;
import com.stellarfs.model.dto.ReplicationStatusData;
import com.stellarfs.model.dto.StorageOverviewResponse;

import java.util.List;

public interface StorageService {
    /**
     * Get a complete overview of storage metrics
     * @return StorageOverviewResponse with all data
     */
    StorageOverviewResponse getStorageOverview();

    /**
     * Get total storage capacity of the system in GB
     * @return total capacity
     */
    Long getTotalCapacity();

    /**
     * Get total used storage in GB
     * @return used storage
     */
    Long getUsedStorage();

    /**
     * Get storage data for each node
     * @return list of node data
     */
    List<NodeStorageData> getNodeStorageData();

    /**
     * Get replication status data
     * @return list of replication statuses
     */
    List<ReplicationStatusData> getReplicationStatus();
} 