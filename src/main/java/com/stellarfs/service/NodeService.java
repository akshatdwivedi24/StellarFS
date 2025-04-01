package com.stellarfs.service;

import com.stellarfs.model.dto.NodeDTO;
import com.stellarfs.model.dto.NodeMetricHistoryDTO;
import java.util.List;
import java.util.Map;

public interface NodeService {
    List<NodeDTO> getAllNodes();
    NodeDTO getNodeById(String id);
    List<NodeDTO> getNodesByStatus(String status);
    List<NodeDTO> getNodesByType(String type);
    List<NodeDTO> getNodesByLocation(String location);
    List<NodeMetricHistoryDTO> getNodeMetricHistory(String nodeId, String metricType, int hours);
    void restartNode(String nodeId);
    void pauseNode(String nodeId);
    void resumeNode(String nodeId);
    Map<String, Double> getSystemMetricsSummary();
} 