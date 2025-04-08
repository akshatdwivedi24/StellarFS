package com.stellarfs.model.dto;

import java.time.LocalDateTime;

public class FileVersionDTO {
    private String fileId;
    private Integer version;
    private LocalDateTime date;
    private Long size;
    private String changedBy;
    private boolean isCurrent;

    // Default constructor
    public FileVersionDTO() {
    }

    // Constructor with all fields
    public FileVersionDTO(String fileId, Integer version, LocalDateTime date, Long size,
                         String changedBy, boolean isCurrent) {
        this.fileId = fileId;
        this.version = version;
        this.date = date;
        this.size = size;
        this.changedBy = changedBy;
        this.isCurrent = isCurrent;
    }

    // Getters and Setters
    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getChangedBy() {
        return changedBy;
    }

    public void setChangedBy(String changedBy) {
        this.changedBy = changedBy;
    }

    public boolean isCurrent() {
        return isCurrent;
    }

    public void setCurrent(boolean current) {
        isCurrent = current;
    }
} 