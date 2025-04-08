package com.stellarfs.model.dto;

public class ReplicationStatusData {
    private String fileType;
    private Integer copies;
    private String status; // healthy, warning, critical

    // Default constructor
    public ReplicationStatusData() {
    }

    // Constructor with all fields
    public ReplicationStatusData(String fileType, Integer copies, String status) {
        this.fileType = fileType;
        this.copies = copies;
        this.status = status;
    }

    // Getters and Setters
    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Integer getCopies() {
        return copies;
    }

    public void setCopies(Integer copies) {
        this.copies = copies;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
} 