package com.stellarfs.service.impl;

import com.stellarfs.model.dto.SystemMetricsDTO;
import com.stellarfs.service.SystemOperationsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SystemOperationsServiceImpl implements SystemOperationsService {
    private final Map<String, SystemMetricsDTO> historicalMetrics = new LinkedHashMap<>();
    private final Map<String, Object> systemConfig = new HashMap<>();
    private final List<String> backups = new ArrayList<>();
    private boolean autoScalingEnabled = false;
    private Map<String, Object> autoScalingConfig;

    public SystemOperationsServiceImpl() {
        initializeMockData();
    }

    private void initializeMockData() {
        // Initialize system configuration
        systemConfig.put("maxStoragePerNode", 1000.0); // GB
        systemConfig.put("replicationFactor", 3);
        systemConfig.put("compressionEnabled", true);
        systemConfig.put("deduplicationEnabled", true);
        systemConfig.put("backupSchedule", "DAILY");
        systemConfig.put("retentionPeriod", 30); // days

        // Initialize auto-scaling configuration
        autoScalingConfig = new HashMap<>();
        autoScalingConfig.put("minNodes", 3);
        autoScalingConfig.put("maxNodes", 10);
        autoScalingConfig.put("cpuThreshold", 80.0);
        autoScalingConfig.put("memoryThreshold", 85.0);
        autoScalingConfig.put("storageThreshold", 90.0);

        // Create mock backups
        backups.addAll(Arrays.asList(
            "backup_20240301_120000",
            "backup_20240302_120000",
            "backup_20240303_120000"
        ));

        // Generate historical metrics
        LocalDateTime now = LocalDateTime.now();
        for (int i = 24; i >= 0; i--) {
            SystemMetricsDTO metrics = generateMockMetrics();
            metrics.setTimestamp(now.minusHours(i));
            historicalMetrics.put(metrics.getId(), metrics);
        }
    }

    private SystemMetricsDTO generateMockMetrics() {
        SystemMetricsDTO metrics = new SystemMetricsDTO();
        metrics.setId(UUID.randomUUID().toString());
        metrics.setTotalStorageCapacity(5000.0); // 5TB
        metrics.setUsedStorage(2500.0 + new Random().nextDouble() * 500); // ~2.5TB with variation
        metrics.setTotalNodes(5);
        metrics.setActiveNodes(4 + new Random().nextInt(2));
        metrics.setSystemCpuUsage(40.0 + new Random().nextDouble() * 30);
        metrics.setSystemMemoryUsage(60.0 + new Random().nextDouble() * 20);
        metrics.setTotalFiles(10000);
        metrics.setReplicatedFiles(9000);

        // Generate node storage distribution
        Map<String, Double> distribution = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            distribution.put("node" + i, 400.0 + new Random().nextDouble() * 200);
        }
        metrics.setNodeStorageDistribution(distribution);

        metrics.setTimestamp(LocalDateTime.now());
        return metrics;
    }

    @Override
    public SystemMetricsDTO getCurrentSystemMetrics() {
        return generateMockMetrics();
    }

    @Override
    public List<SystemMetricsDTO> getHistoricalMetrics(int hours) {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(hours);
        return historicalMetrics.values().stream()
                .filter(m -> m.getTimestamp().isAfter(cutoff))
                .sorted(Comparator.comparing(SystemMetricsDTO::getTimestamp))
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getSystemHealth() {
        Map<String, Object> health = new HashMap<>();
        SystemMetricsDTO current = getCurrentSystemMetrics();
        
        health.put("status", current.getSystemCpuUsage() < 80 ? "HEALTHY" : "WARNING");
        health.put("cpuStatus", current.getSystemCpuUsage() < 80 ? "OK" : "HIGH");
        health.put("memoryStatus", current.getSystemMemoryUsage() < 85 ? "OK" : "HIGH");
        health.put("storageStatus", (current.getUsedStorage() / current.getTotalStorageCapacity() * 100) < 90 ? "OK" : "HIGH");
        health.put("nodeStatus", current.getActiveNodes() == current.getTotalNodes() ? "OK" : "WARNING");
        
        return health;
    }

    @Override
    public void initiateDataReplication(String nodeId) {
        // Mock implementation
        try {
            Thread.sleep(1000); // Simulate processing time
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    @Override
    public void validateReplication(String nodeId) {
        // Mock implementation
    }

    @Override
    public Map<String, Integer> getReplicationStatus() {
        Map<String, Integer> status = new HashMap<>();
        status.put("totalFiles", 10000);
        status.put("replicatedFiles", 9000);
        status.put("pendingReplications", 1000);
        status.put("failedReplications", 0);
        return status;
    }

    @Override
    public String createSystemBackup() {
        String backupId = "backup_" + LocalDateTime.now().toString().replace(":", "").replace(".", "");
        backups.add(backupId);
        return backupId;
    }

    @Override
    public List<String> getAvailableBackups() {
        return new ArrayList<>(backups);
    }

    @Override
    public void restoreFromBackup(String backupId) {
        if (!backups.contains(backupId)) {
            throw new IllegalArgumentException("Backup not found: " + backupId);
        }
        // Mock implementation
    }

    @Override
    public void deleteBackup(String backupId) {
        backups.remove(backupId);
    }

    @Override
    public void optimizeStorage() {
        // Mock implementation
    }

    @Override
    public void performDataDeduplication() {
        // Mock implementation
    }

    @Override
    public void compressData() {
        // Mock implementation
    }

    @Override
    public void configureAutoScaling(Map<String, Object> config) {
        this.autoScalingConfig = new HashMap<>(config);
    }

    @Override
    public Map<String, Object> getAutoScalingConfig() {
        return new HashMap<>(autoScalingConfig);
    }

    @Override
    public void enableAutoScaling() {
        this.autoScalingEnabled = true;
    }

    @Override
    public void disableAutoScaling() {
        this.autoScalingEnabled = false;
    }

    @Override
    public Map<String, Object> getSystemConfiguration() {
        return new HashMap<>(systemConfig);
    }

    @Override
    public void updateSystemConfiguration(Map<String, Object> config) {
        systemConfig.putAll(config);
    }

    @Override
    public void resetToDefaultConfiguration() {
        initializeMockData();
    }
} 