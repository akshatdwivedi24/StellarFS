package com.stellarfs.controller;

import com.stellarfs.model.dto.NodeDTO;
import com.stellarfs.model.dto.NodeMetricHistoryDTO;
import com.stellarfs.service.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/nodes")
@CrossOrigin(origins = "http://localhost:3000")
public class NodeController {
    private final NodeService nodeService;

    @Autowired
    public NodeController(NodeService nodeService) {
        this.nodeService = nodeService;
    }

    @GetMapping
    public ResponseEntity<List<NodeDTO>> getAllNodes() {
        return ResponseEntity.ok(nodeService.getAllNodes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NodeDTO> getNodeById(@PathVariable String id) {
        NodeDTO node = nodeService.getNodeById(id);
        return node != null ? ResponseEntity.ok(node) : ResponseEntity.notFound().build();
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<NodeDTO>> getNodesByStatus(@PathVariable String status) {
        return ResponseEntity.ok(nodeService.getNodesByStatus(status));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<NodeDTO>> getNodesByType(@PathVariable String type) {
        return ResponseEntity.ok(nodeService.getNodesByType(type));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<NodeDTO>> getNodesByLocation(@PathVariable String location) {
        return ResponseEntity.ok(nodeService.getNodesByLocation(location));
    }

    @GetMapping("/{nodeId}/metrics/{metricType}")
    public ResponseEntity<List<NodeMetricHistoryDTO>> getNodeMetricHistory(
            @PathVariable String nodeId,
            @PathVariable String metricType,
            @RequestParam(defaultValue = "24") int hours) {
        return ResponseEntity.ok(nodeService.getNodeMetricHistory(nodeId, metricType, hours));
    }

    @PostMapping("/{nodeId}/restart")
    public ResponseEntity<Void> restartNode(@PathVariable String nodeId) {
        nodeService.restartNode(nodeId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{nodeId}/pause")
    public ResponseEntity<Void> pauseNode(@PathVariable String nodeId) {
        nodeService.pauseNode(nodeId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{nodeId}/resume")
    public ResponseEntity<Void> resumeNode(@PathVariable String nodeId) {
        nodeService.resumeNode(nodeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/metrics/summary")
    public ResponseEntity<Map<String, Double>> getSystemMetricsSummary() {
        return ResponseEntity.ok(nodeService.getSystemMetricsSummary());
    }
} 