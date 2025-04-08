package com.stellarfs.controller;

import com.stellarfs.model.dto.SystemMetricsDTO;
import com.stellarfs.service.SystemOperationsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/system")
@CrossOrigin(origins = "*")
public class SystemOperationsController {
    private final SystemOperationsService systemOperationsService;

    public SystemOperationsController(SystemOperationsService systemOperationsService) {
        this.systemOperationsService = systemOperationsService;
    }

    @GetMapping("/metrics/current")
    public ResponseEntity<SystemMetricsDTO> getCurrentMetrics() {
        return ResponseEntity.ok(systemOperationsService.getCurrentSystemMetrics());
    }

    @GetMapping("/metrics/historical")
    public ResponseEntity<List<SystemMetricsDTO>> getHistoricalMetrics(@RequestParam(defaultValue = "24") int hours) {
        return ResponseEntity.ok(systemOperationsService.getHistoricalMetrics(hours));
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getSystemHealth() {
        return ResponseEntity.ok(systemOperationsService.getSystemHealth());
    }

    @PostMapping("/replication/{nodeId}")
    public ResponseEntity<Void> initiateReplication(@PathVariable String nodeId) {
        systemOperationsService.initiateDataReplication(nodeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/replication/{nodeId}/validate")
    public ResponseEntity<Void> validateReplication(@PathVariable String nodeId) {
        systemOperationsService.validateReplication(nodeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/replication/status")
    public ResponseEntity<Map<String, Integer>> getReplicationStatus() {
        return ResponseEntity.ok(systemOperationsService.getReplicationStatus());
    }

    @PostMapping("/backup")
    public ResponseEntity<String> createBackup() {
        return ResponseEntity.ok(systemOperationsService.createSystemBackup());
    }

    @GetMapping("/backup")
    public ResponseEntity<List<String>> getAvailableBackups() {
        return ResponseEntity.ok(systemOperationsService.getAvailableBackups());
    }

    @PostMapping("/backup/{backupId}/restore")
    public ResponseEntity<Void> restoreFromBackup(@PathVariable String backupId) {
        systemOperationsService.restoreFromBackup(backupId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/backup/{backupId}")
    public ResponseEntity<Void> deleteBackup(@PathVariable String backupId) {
        systemOperationsService.deleteBackup(backupId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/maintenance/optimize")
    public ResponseEntity<Void> optimizeStorage() {
        systemOperationsService.optimizeStorage();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/maintenance/deduplicate")
    public ResponseEntity<Void> performDeduplication() {
        systemOperationsService.performDataDeduplication();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/maintenance/compress")
    public ResponseEntity<Void> compressData() {
        systemOperationsService.compressData();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/autoscaling/configure")
    public ResponseEntity<Void> configureAutoScaling(@RequestBody Map<String, Object> config) {
        systemOperationsService.configureAutoScaling(config);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/autoscaling/config")
    public ResponseEntity<Map<String, Object>> getAutoScalingConfig() {
        return ResponseEntity.ok(systemOperationsService.getAutoScalingConfig());
    }

    @PostMapping("/autoscaling/enable")
    public ResponseEntity<Void> enableAutoScaling() {
        systemOperationsService.enableAutoScaling();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/autoscaling/disable")
    public ResponseEntity<Void> disableAutoScaling() {
        systemOperationsService.disableAutoScaling();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/configuration")
    public ResponseEntity<Map<String, Object>> getSystemConfiguration() {
        return ResponseEntity.ok(systemOperationsService.getSystemConfiguration());
    }

    @PutMapping("/configuration")
    public ResponseEntity<Void> updateSystemConfiguration(@RequestBody Map<String, Object> config) {
        systemOperationsService.updateSystemConfiguration(config);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/configuration/reset")
    public ResponseEntity<Void> resetConfiguration() {
        systemOperationsService.resetToDefaultConfiguration();
        return ResponseEntity.ok().build();
    }
} 