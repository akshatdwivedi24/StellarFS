package com.stellarfs.model.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class SystemMetricsDTO {
    private String id;
    private double totalStorageCapacity;
    private double usedStorage;
    private int totalNodes;
    private int activeNodes;
    private double systemCpuUsage;
    private double systemMemoryUsage;
    private int totalFiles;
    private int replicatedFiles;
    private Map<String, Double> nodeStorageDistribution;
    private LocalDateTime timestamp;
    private Map<String, Object> additionalMetrics;

    // Default constructor
    public SystemMetricsDTO() {}

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getTotalStorageCapacity() {
        return totalStorageCapacity;
    }

    public void setTotalStorageCapacity(double totalStorageCapacity) {
        this.totalStorageCapacity = totalStorageCapacity;
    }

    public double getUsedStorage() {
        return usedStorage;
    }

    public void setUsedStorage(double usedStorage) {
        this.usedStorage = usedStorage;
    }

    public int getTotalNodes() {
        return totalNodes;
    }

    public void setTotalNodes(int totalNodes) {
        this.totalNodes = totalNodes;
    }

    public int getActiveNodes() {
        return activeNodes;
    }

    public void setActiveNodes(int activeNodes) {
        this.activeNodes = activeNodes;
    }

    public double getSystemCpuUsage() {
        return systemCpuUsage;
    }

    public void setSystemCpuUsage(double systemCpuUsage) {
        this.systemCpuUsage = systemCpuUsage;
    }

    public double getSystemMemoryUsage() {
        return systemMemoryUsage;
    }

    public void setSystemMemoryUsage(double systemMemoryUsage) {
        this.systemMemoryUsage = systemMemoryUsage;
    }

    public int getTotalFiles() {
        return totalFiles;
    }

    public void setTotalFiles(int totalFiles) {
        this.totalFiles = totalFiles;
    }

    public int getReplicatedFiles() {
        return replicatedFiles;
    }

    public void setReplicatedFiles(int replicatedFiles) {
        this.replicatedFiles = replicatedFiles;
    }

    public Map<String, Double> getNodeStorageDistribution() {
        return nodeStorageDistribution;
    }

    public void setNodeStorageDistribution(Map<String, Double> nodeStorageDistribution) {
        this.nodeStorageDistribution = nodeStorageDistribution;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getAdditionalMetrics() {
        return additionalMetrics;
    }

    public void setAdditionalMetrics(Map<String, Object> additionalMetrics) {
        this.additionalMetrics = additionalMetrics;
    }
} 