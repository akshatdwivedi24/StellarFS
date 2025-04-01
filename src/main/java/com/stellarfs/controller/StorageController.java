package com.stellarfs.controller;

import com.stellarfs.model.dto.NodeStorageData;
import com.stellarfs.model.dto.ReplicationStatusData;
import com.stellarfs.model.dto.StorageOverviewResponse;
import com.stellarfs.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/storage")
public class StorageController {

    private final StorageService storageService;

    @Autowired
    public StorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/overview")
    public ResponseEntity<StorageOverviewResponse> getStorageOverview() {
        return ResponseEntity.ok(storageService.getStorageOverview());
    }

    @GetMapping("/capacity")
    public ResponseEntity<Long> getTotalCapacity() {
        return ResponseEntity.ok(storageService.getTotalCapacity());
    }

    @GetMapping("/used")
    public ResponseEntity<Long> getUsedStorage() {
        return ResponseEntity.ok(storageService.getUsedStorage());
    }

    @GetMapping("/nodes")
    public ResponseEntity<List<NodeStorageData>> getNodeStorageData() {
        return ResponseEntity.ok(storageService.getNodeStorageData());
    }

    @GetMapping("/replication")
    public ResponseEntity<List<ReplicationStatusData>> getReplicationStatus() {
        return ResponseEntity.ok(storageService.getReplicationStatus());
    }
} 