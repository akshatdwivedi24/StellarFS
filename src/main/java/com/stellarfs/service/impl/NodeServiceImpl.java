package com.stellarfs.service.impl;

import com.stellarfs.model.dto.NodeDTO;
import com.stellarfs.model.dto.NodeMetricHistoryDTO;
import com.stellarfs.service.NodeService;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class NodeServiceImpl implements NodeService {
    private final List<NodeDTO> nodes;
    private final Map<String, List<NodeMetricHistoryDTO>> metricHistory;
    private final Timer metricUpdateTimer;

    public NodeServiceImpl() {
        nodes = new ArrayList<>();
        metricHistory = new ConcurrentHashMap<>();
        initializeMockData();
        
        // Start periodic metric updates
        metricUpdateTimer = new Timer();
        metricUpdateTimer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                updateNodeMetrics();
            }
        }, 0, 5000); // Update every 5 seconds
    }

    private void initializeMockData() {
        // Initialize mock nodes
        nodes.add(new NodeDTO(
            "node-1", "Storage Node 1", "192.168.1.101", "online",
            45.5, 60.2, 75.8, 125.5, 150,
            LocalDateTime.now(), new HashMap<>(), "US-East", "storage", 3600
        ));
        nodes.add(new NodeDTO(
            "node-2", "Compute Node 1", "192.168.1.102", "online",
            65.8, 45.3, 55.2, 85.7, 200,
            LocalDateTime.now(), new HashMap<>(), "US-West", "compute", 7200
        ));
        nodes.add(new NodeDTO(
            "node-3", "Gateway Node 1", "192.168.1.103", "warning",
            85.2, 75.6, 45.8, 250.3, 300,
            LocalDateTime.now(), new HashMap<>(), "EU", "gateway", 1800
        ));
        nodes.add(new NodeDTO(
            "node-4", "Storage Node 2", "192.168.1.104", "critical",
            95.5, 90.2, 85.8, 45.5, 50,
            LocalDateTime.now(), new HashMap<>(), "Asia", "storage", 900
        ));

        // Initialize mock metric history for the first node
        List<NodeMetricHistoryDTO> history = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        for (int i = 0; i < 24; i++) {
            history.add(new NodeMetricHistoryDTO(
                "node-1", now.minusHours(i), "cpu",
                45.5 + Math.random() * 10, new HashMap<>()
            ));
            history.add(new NodeMetricHistoryDTO(
                "node-1", now.minusHours(i), "memory",
                60.2 + Math.random() * 15, new HashMap<>()
            ));
            history.add(new NodeMetricHistoryDTO(
                "node-1", now.minusHours(i), "disk",
                75.8 + Math.random() * 5, new HashMap<>()
            ));
            history.add(new NodeMetricHistoryDTO(
                "node-1", now.minusHours(i), "network",
                125.5 + Math.random() * 20, new HashMap<>()
            ));
        }
        metricHistory.put("node-1", history);
    }

    private void updateNodeMetrics() {
        for (NodeDTO node : nodes) {
            // Update basic metrics with some random variation
            node.setCpuUsage(Math.min(100, Math.max(0, node.getCpuUsage() + (Math.random() - 0.5) * 5)));
            node.setMemoryUsage(Math.min(100, Math.max(0, node.getMemoryUsage() + (Math.random() - 0.5) * 3)));
            node.setDiskUsage(Math.min(100, Math.max(0, node.getDiskUsage() + (Math.random() - 0.5) * 2)));
            node.setNetworkThroughput(Math.max(0, node.getNetworkThroughput() + (Math.random() - 0.5) * 10));
            node.setActiveConnections((int) Math.max(0, node.getActiveConnections() + (Math.random() - 0.5) * 20));
            node.setLastUpdated(LocalDateTime.now());

            // Update status based on metrics
            if (node.getCpuUsage() > 90 || node.getMemoryUsage() > 90) {
                node.setStatus("critical");
            } else if (node.getCpuUsage() > 80 || node.getMemoryUsage() > 80) {
                node.setStatus("warning");
            } else if (node.getStatus().equals("critical") || node.getStatus().equals("warning")) {
                node.setStatus("online");
            }

            // Update metric history
            updateMetricHistory(node);
        }
    }

    private void updateMetricHistory(NodeDTO node) {
        List<NodeMetricHistoryDTO> history = metricHistory.computeIfAbsent(node.getId(), k -> new ArrayList<>());
        LocalDateTime now = LocalDateTime.now();

        // Add new metrics
        history.add(new NodeMetricHistoryDTO(node.getId(), now, "cpu", node.getCpuUsage(), new HashMap<>()));
        history.add(new NodeMetricHistoryDTO(node.getId(), now, "memory", node.getMemoryUsage(), new HashMap<>()));
        history.add(new NodeMetricHistoryDTO(node.getId(), now, "disk", node.getDiskUsage(), new HashMap<>()));
        history.add(new NodeMetricHistoryDTO(node.getId(), now, "network", node.getNetworkThroughput(), new HashMap<>()));

        // Keep only last 24 hours of history
        LocalDateTime cutoff = now.minusHours(24);
        history.removeIf(metric -> metric.getTimestamp().isBefore(cutoff));
    }

    @Override
    public List<NodeDTO> getAllNodes() {
        return nodes;
    }

    @Override
    public NodeDTO getNodeById(String id) {
        return nodes.stream()
                .filter(node -> node.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<NodeDTO> getNodesByStatus(String status) {
        return nodes.stream()
                .filter(node -> node.getStatus().equals(status))
                .collect(Collectors.toList());
    }

    @Override
    public List<NodeDTO> getNodesByType(String type) {
        return nodes.stream()
                .filter(node -> node.getNodeType().equals(type))
                .collect(Collectors.toList());
    }

    @Override
    public List<NodeDTO> getNodesByLocation(String location) {
        return nodes.stream()
                .filter(node -> node.getLocation().equals(location))
                .collect(Collectors.toList());
    }

    @Override
    public List<NodeMetricHistoryDTO> getNodeMetricHistory(String nodeId, String metricType, int hours) {
        List<NodeMetricHistoryDTO> history = metricHistory.get(nodeId);
        if (history == null) {
            return new ArrayList<>();
        }

        LocalDateTime cutoff = LocalDateTime.now().minusHours(hours);
        return history.stream()
                .filter(metric -> metric.getMetricType().equals(metricType))
                .filter(metric -> metric.getTimestamp().isAfter(cutoff))
                .collect(Collectors.toList());
    }

    @Override
    public void restartNode(String nodeId) {
        NodeDTO node = getNodeById(nodeId);
        if (node != null) {
            // Simulate restart delay
            try {
                Thread.sleep(5000);
                node.setStatus("online");
                node.setCpuUsage(0.0);
                node.setMemoryUsage(0.0);
                node.setNetworkThroughput(0.0);
                node.setActiveConnections(0);
                node.setLastUpdated(LocalDateTime.now());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
    }

    @Override
    public void pauseNode(String nodeId) {
        NodeDTO node = getNodeById(nodeId);
        if (node != null) {
            node.setStatus("paused");
            node.setLastUpdated(LocalDateTime.now());
        }
    }

    @Override
    public void resumeNode(String nodeId) {
        NodeDTO node = getNodeById(nodeId);
        if (node != null) {
            node.setStatus("online");
            node.setLastUpdated(LocalDateTime.now());
        }
    }

    @Override
    public Map<String, Double> getSystemMetricsSummary() {
        Map<String, Double> summary = new HashMap<>();
        
        // Calculate average metrics across all nodes
        double avgCpu = nodes.stream()
                .mapToDouble(NodeDTO::getCpuUsage)
                .average()
                .orElse(0.0);
        
        double avgMemory = nodes.stream()
                .mapToDouble(NodeDTO::getMemoryUsage)
                .average()
                .orElse(0.0);
        
        double avgDisk = nodes.stream()
                .mapToDouble(NodeDTO::getDiskUsage)
                .average()
                .orElse(0.0);
        
        double totalNetwork = nodes.stream()
                .mapToDouble(NodeDTO::getNetworkThroughput)
                .sum();
        
        int totalConnections = nodes.stream()
                .mapToInt(NodeDTO::getActiveConnections)
                .sum();

        summary.put("cpuUsage", avgCpu);
        summary.put("memoryUsage", avgMemory);
        summary.put("diskUsage", avgDisk);
        summary.put("networkThroughput", totalNetwork);
        summary.put("activeConnections", (double) totalConnections);

        return summary;
    }
} 