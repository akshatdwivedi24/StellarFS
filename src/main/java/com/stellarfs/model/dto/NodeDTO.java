package com.stellarfs.model.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class NodeDTO {
    private String id;
    private String name;
    private String ipAddress;
    private String status;
    private Double cpuUsage;
    private Double memoryUsage;
    private Double diskUsage;
    private Double networkThroughput;
    private Integer activeConnections;
    private LocalDateTime lastUpdated;
    private Map<String, Double> performanceMetrics;
    private String location;
    private String nodeType;
    private Integer uptime;

    public NodeDTO() {
    }

    public NodeDTO(String id, String name, String ipAddress, String status, Double cpuUsage,
                  Double memoryUsage, Double diskUsage, Double networkThroughput,
                  Integer activeConnections, LocalDateTime lastUpdated,
                  Map<String, Double> performanceMetrics, String location, String nodeType,
                  Integer uptime) {
        this.id = id;
        this.name = name;
        this.ipAddress = ipAddress;
        this.status = status;
        this.cpuUsage = cpuUsage;
        this.memoryUsage = memoryUsage;
        this.diskUsage = diskUsage;
        this.networkThroughput = networkThroughput;
        this.activeConnections = activeConnections;
        this.lastUpdated = lastUpdated;
        this.performanceMetrics = performanceMetrics;
        this.location = location;
        this.nodeType = nodeType;
        this.uptime = uptime;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getCpuUsage() {
        return cpuUsage;
    }

    public void setCpuUsage(Double cpuUsage) {
        this.cpuUsage = cpuUsage;
    }

    public Double getMemoryUsage() {
        return memoryUsage;
    }

    public void setMemoryUsage(Double memoryUsage) {
        this.memoryUsage = memoryUsage;
    }

    public Double getDiskUsage() {
        return diskUsage;
    }

    public void setDiskUsage(Double diskUsage) {
        this.diskUsage = diskUsage;
    }

    public Double getNetworkThroughput() {
        return networkThroughput;
    }

    public void setNetworkThroughput(Double networkThroughput) {
        this.networkThroughput = networkThroughput;
    }

    public Integer getActiveConnections() {
        return activeConnections;
    }

    public void setActiveConnections(Integer activeConnections) {
        this.activeConnections = activeConnections;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Map<String, Double> getPerformanceMetrics() {
        return performanceMetrics;
    }

    public void setPerformanceMetrics(Map<String, Double> performanceMetrics) {
        this.performanceMetrics = performanceMetrics;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getNodeType() {
        return nodeType;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }

    public Integer getUptime() {
        return uptime;
    }

    public void setUptime(Integer uptime) {
        this.uptime = uptime;
    }
} 