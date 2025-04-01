package com.stellarfs.model.dto;

public class NodeStorageData {
    private String name;
    private Long storage;
    private Long capacity;

    // Default constructor
    public NodeStorageData() {
    }

    // Constructor with all fields
    public NodeStorageData(String name, Long storage, Long capacity) {
        this.name = name;
        this.storage = storage;
        this.capacity = capacity;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getStorage() {
        return storage;
    }

    public void setStorage(Long storage) {
        this.storage = storage;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }
} 