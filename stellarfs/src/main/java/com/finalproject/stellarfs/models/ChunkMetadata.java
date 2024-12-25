package com.finalproject.stellarfs.models;

import jakarta.persistence.*;

@Entity
@Table(name = "chunk_metadata")
public class ChunkMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long fileId;

    @Column(nullable = false)
    private String chunkName;

    @Column(nullable = false)
    private Long chunkSize;

    @Column(nullable = false)
    private String storageLocation;

    // Constructors, getters, setters
    public ChunkMetadata() {}

    public ChunkMetadata(Long fileId, String chunkName, Long chunkSize, String storageLocation) {
        this.fileId = fileId;
        this.chunkName = chunkName;
        this.chunkSize = chunkSize;
        this.storageLocation = storageLocation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public String getChunkName() {
        return chunkName;
    }

    public void setChunkName(String chunkName) {
        this.chunkName = chunkName;
    }

    public Long getChunkSize() {
        return chunkSize;
    }

    public void setChunkSize(Long chunkSize) {
        this.chunkSize = chunkSize;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }
}