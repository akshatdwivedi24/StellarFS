package com.stellarfs.repository;

import com.stellarfs.model.entity.Node;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NodeRepository extends JpaRepository<Node, Long> {
    List<Node> findByIsActiveTrue();
    Node findByName(String name);
    List<Node> findByHostAndPort(String host, Integer port);
} 