package com.stellarfs.service.impl;

import com.stellarfs.model.dto.NodeStorageData;
import com.stellarfs.model.dto.ReplicationStatusData;
import com.stellarfs.model.dto.StorageOverviewResponse;
import com.stellarfs.service.StorageService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StorageServiceImpl implements StorageService {

    // In a real application, this would connect to a repository or data source
    // For now, we'll use mock data

    @Override
    public StorageOverviewResponse getStorageOverview() {
        return new StorageOverviewResponse(
                getTotalCapacity(),
                getUsedStorage(),
                getNodeStorageData(),
                getReplicationStatus()
        );
    }

    @Override
    public Long getTotalCapacity() {
        // Mock data - in GB
        return 1024L;
    }

    @Override
    public Long getUsedStorage() {
        // Mock data - in GB
        return 486L;
    }

    @Override
    public List<NodeStorageData> getNodeStorageData() {
        // Mock data
        List<NodeStorageData> nodeData = new ArrayList<>();
        nodeData.add(new NodeStorageData("Node 1", 180L, 256L));
        nodeData.add(new NodeStorageData("Node 2", 145L, 256L));
        nodeData.add(new NodeStorageData("Node 3", 98L, 256L));
        nodeData.add(new NodeStorageData("Node 4", 63L, 256L));
        
        return nodeData;
    }

    @Override
    public List<ReplicationStatusData> getReplicationStatus() {
        // Mock data
        List<ReplicationStatusData> replicationStatus = new ArrayList<>();
        replicationStatus.add(new ReplicationStatusData("Documents", 3, "healthy"));
        replicationStatus.add(new ReplicationStatusData("Images", 3, "healthy"));
        replicationStatus.add(new ReplicationStatusData("Videos", 2, "warning"));
        replicationStatus.add(new ReplicationStatusData("Archives", 1, "critical"));
        
        return replicationStatus;
    }
} 