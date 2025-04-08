package com.stellarfs.model.dto;

import java.time.LocalDateTime;
import java.util.List;

public class FileDTO {
    private String id;
    private String name;
    private String type;
    private Long size;
    private LocalDateTime lastModified;
    private String owner;
    private List<String> permissions;
    private String path;
    private Integer version;

    // Default constructor
    public FileDTO() {
    }

    // Constructor with all fields
    public FileDTO(String id, String name, String type, Long size, LocalDateTime lastModified,
                  String owner, List<String> permissions, String path, Integer version) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.size = size;
        this.lastModified = lastModified;
        this.owner = owner;
        this.permissions = permissions;
        this.path = path;
        this.version = version;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<String> permissions) {
        this.permissions = permissions;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }
} 