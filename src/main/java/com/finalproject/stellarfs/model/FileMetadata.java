package com.finalproject.stellarfs.model;

import java.time.LocalDateTime;

public class FileMetadata {
    private String fileName;
    private long fileSize;
    private LocalDateTime uploadedAt;

    public FileMetadata(String fileName) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.uploadedAt = LocalDateTime.now();
    }

    public String getFileName() { return fileName; }
    public long getFileSize() { return fileSize; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
}
