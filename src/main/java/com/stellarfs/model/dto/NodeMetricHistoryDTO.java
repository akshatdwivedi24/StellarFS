package com.stellarfs.model.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class NodeMetricHistoryDTO {
    private String nodeId;
    private LocalDateTime timestamp;
    private String metricType;
    private Double value;
    private Map<String, Double> additionalMetrics;

    public NodeMetricHistoryDTO() {
    }

    public NodeMetricHistoryDTO(String nodeId, LocalDateTime timestamp, String metricType,
                              Double value, Map<String, Double> additionalMetrics) {
        this.nodeId = nodeId;
        this.timestamp = timestamp;
        this.metricType = metricType;
        this.value = value;
        this.additionalMetrics = additionalMetrics;
    }

    // Getters and Setters
    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMetricType() {
        return metricType;
    }

    public void setMetricType(String metricType) {
        this.metricType = metricType;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public Map<String, Double> getAdditionalMetrics() {
        return additionalMetrics;
    }

    public void setAdditionalMetrics(Map<String, Double> additionalMetrics) {
        this.additionalMetrics = additionalMetrics;
    }
} 