package com.stellarfs.service;

import com.stellarfs.model.dto.SystemMetricsDTO;
import java.util.List;
import java.util.Map;

public interface SystemOperationsService {
    // System metrics and monitoring
    SystemMetricsDTO getCurrentSystemMetrics();
    List<SystemMetricsDTO> getHistoricalMetrics(int hours);
    Map<String, Object> getSystemHealth();
    
    // Data replication operations
    void initiateDataReplication(String nodeId);
    void validateReplication(String nodeId);
    Map<String, Integer> getReplicationStatus();
    
    // Backup operations
    String createSystemBackup();
    List<String> getAvailableBackups();
    void restoreFromBackup(String backupId);
    void deleteBackup(String backupId);
    
    // System maintenance
    void optimizeStorage();
    void performDataDeduplication();
    void compressData();
    
    // Auto-scaling operations
    void configureAutoScaling(Map<String, Object> config);
    Map<String, Object> getAutoScalingConfig();
    void enableAutoScaling();
    void disableAutoScaling();
    
    // System configuration
    Map<String, Object> getSystemConfiguration();
    void updateSystemConfiguration(Map<String, Object> config);
    void resetToDefaultConfiguration();
} 