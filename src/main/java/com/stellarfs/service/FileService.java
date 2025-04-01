package com.stellarfs.service;

import com.stellarfs.model.dto.FileDTO;
import com.stellarfs.model.dto.FileVersionDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    /**
     * Get a list of all files in the system
     * @return List of files
     */
    List<FileDTO> getAllFiles();

    /**
     * Get a list of files by owner
     * @param owner The owner's username
     * @return List of files owned by the user
     */
    List<FileDTO> getFilesByOwner(String owner);

    /**
     * Get a list of recent files
     * @param limit Maximum number of files to return
     * @return List of recently modified files
     */
    List<FileDTO> getRecentFiles(int limit);

    /**
     * Get a specific file by ID
     * @param id File ID
     * @return The file, or null if not found
     */
    FileDTO getFileById(String id);

    /**
     * Upload a new file
     * @param file The file to upload
     * @param path The path where to store the file
     * @param owner The owner's username
     * @return The created file metadata
     */
    FileDTO uploadFile(MultipartFile file, String path, String owner);

    /**
     * Delete a file
     * @param id File ID
     * @return true if successful, false otherwise
     */
    boolean deleteFile(String id);

    /**
     * Get all versions of a file
     * @param fileId File ID
     * @return List of file versions
     */
    List<FileVersionDTO> getFileVersions(String fileId);

    /**
     * Restore a specific version of a file
     * @param fileId File ID
     * @param version Version number
     * @return The restored file metadata
     */
    FileDTO restoreVersion(String fileId, Integer version);

    /**
     * Search for files by name, path, or owner
     * @param query Search query
     * @return List of matching files
     */
    List<FileDTO> searchFiles(String query);

    /**
     * Filter files by type
     * @param type File type
     * @return List of files of the specified type
     */
    List<FileDTO> filterByType(String type);
} 