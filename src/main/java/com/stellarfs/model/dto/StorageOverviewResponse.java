package com.stellarfs.model.dto;

import java.util.List;

public class StorageOverviewResponse {
    private Long totalCapacity;
    private Long usedStorage;
    private List<NodeStorageData> nodeData;
    private List<ReplicationStatusData> replicationStatus;

    // Default constructor
    public StorageOverviewResponse() {
    }

    // Constructor with all fields
    public StorageOverviewResponse(Long totalCapacity, Long usedStorage,
                                 List<NodeStorageData> nodeData,
                                 List<ReplicationStatusData> replicationStatus) {
        this.totalCapacity = totalCapacity;
        this.usedStorage = usedStorage;
        this.nodeData = nodeData;
        this.replicationStatus = replicationStatus;
    }

    // Getters and Setters
    public Long getTotalCapacity() {
        return totalCapacity;
    }

    public void setTotalCapacity(Long totalCapacity) {
        this.totalCapacity = totalCapacity;
    }

    public Long getUsedStorage() {
        return usedStorage;
    }

    public void setUsedStorage(Long usedStorage) {
        this.usedStorage = usedStorage;
    }

    public List<NodeStorageData> getNodeData() {
        return nodeData;
    }

    public void setNodeData(List<NodeStorageData> nodeData) {
        this.nodeData = nodeData;
    }

    public List<ReplicationStatusData> getReplicationStatus() {
        return replicationStatus;
    }

    public void setReplicationStatus(List<ReplicationStatusData> replicationStatus) {
        this.replicationStatus = replicationStatus;
    }
} 