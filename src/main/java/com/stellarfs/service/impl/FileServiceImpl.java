package com.stellarfs.service.impl;

import com.stellarfs.model.dto.FileDTO;
import com.stellarfs.model.dto.FileVersionDTO;
import com.stellarfs.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class FileServiceImpl implements FileService {

    // In a real application, this would connect to a database or file system
    // For now, we'll use an in-memory list
    private final List<FileDTO> files;
    private final Map<String, List<FileVersionDTO>> fileVersions;

    public FileServiceImpl() {
        // Initialize with some mock data
        files = new ArrayList<>();
        fileVersions = new HashMap<>();
        
        // Add mock files
        files.add(new FileDTO("1", "project_report.pdf", "pdf", 2458000L, 
            LocalDateTime.now().minusDays(1), "Akshat Dwivedi", 
            Arrays.asList("read", "write", "delete"), "/documents/reports/", 3));
            
        files.add(new FileDTO("2", "profile_picture.jpg", "image", 1240000L, 
            LocalDateTime.now().minusDays(6), "Akshat Dwivedi", 
            Arrays.asList("read", "write"), "/images/", 2));
            
        files.add(new FileDTO("3", "database_backup.sql", "code", 8546000L, 
            LocalDateTime.now().minusDays(11), "System", 
            Collections.singletonList("read"), "/backups/", 5));
            
        files.add(new FileDTO("4", "presentation.pptx", "document", 5230000L, 
            LocalDateTime.now().minusDays(4), "Akshat Dwivedi", 
            Arrays.asList("read", "write", "delete", "share"), "/documents/presentations/", 7));
            
        files.add(new FileDTO("5", "source_code.zip", "archive", 12458000L, 
            LocalDateTime.now().minusDays(8), "Dev Team", 
            Arrays.asList("read", "write"), "/development/", 10));
            
        files.add(new FileDTO("6", "user_data.csv", "document", 3240000L, 
            LocalDateTime.now().minusDays(2), "Akshat Dwivedi", 
            Arrays.asList("read", "write", "delete"), "/data/exports/", 4));
            
        files.add(new FileDTO("7", "system_logs.txt", "text", 958000L, 
            LocalDateTime.now().minusDays(1), "System", 
            Collections.singletonList("read"), "/logs/", 1));
            
        files.add(new FileDTO("8", "promotional_video.mp4", "video", 28540000L, 
            LocalDateTime.now().minusDays(15), "Marketing Team", 
            Arrays.asList("read", "share"), "/media/videos/", 2));
            
        // Create some mock versions for file 1
        List<FileVersionDTO> versions = new ArrayList<>();
        versions.add(new FileVersionDTO("1", 3, LocalDateTime.now().minusDays(1), 2458000L, "Akshat Dwivedi", true));
        versions.add(new FileVersionDTO("1", 2, LocalDateTime.now().minusDays(2), 2345000L, "Akshat Dwivedi", false));
        versions.add(new FileVersionDTO("1", 1, LocalDateTime.now().minusDays(3), 2240000L, "Team Member", false));
        fileVersions.put("1", versions);
    }

    @Override
    public List<FileDTO> getAllFiles() {
        return new ArrayList<>(files);
    }

    @Override
    public List<FileDTO> getFilesByOwner(String owner) {
        return files.stream()
                .filter(file -> file.getOwner().equals(owner))
                .collect(Collectors.toList());
    }

    @Override
    public List<FileDTO> getRecentFiles(int limit) {
        return files.stream()
                .sorted(Comparator.comparing(FileDTO::getLastModified).reversed())
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Override
    public FileDTO getFileById(String id) {
        return files.stream()
                .filter(file -> file.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    @Override
    public FileDTO uploadFile(MultipartFile file, String path, String owner) {
        // In a real application, we would save the file to a storage system
        // For now, we'll just create a file metadata entry
        
        if (file == null) {
            return null;
        }
        
        String fileName = file.getOriginalFilename();
        String fileType = getFileTypeFromName(fileName);
        Long fileSize = file.getSize();
        
        String id = UUID.randomUUID().toString();
        FileDTO newFile = new FileDTO(
            id,
            fileName,
            fileType,
            fileSize,
            LocalDateTime.now(),
            owner,
            Arrays.asList("read", "write", "delete"),
            path,
            1
        );
        
        files.add(newFile);
        
        // Create initial version
        List<FileVersionDTO> versions = new ArrayList<>();
        versions.add(new FileVersionDTO(id, 1, LocalDateTime.now(), fileSize, owner, true));
        fileVersions.put(id, versions);
        
        return newFile;
    }

    @Override
    public boolean deleteFile(String id) {
        FileDTO file = getFileById(id);
        if (file == null) {
            return false;
        }
        
        // Delete file from list
        boolean removed = files.removeIf(f -> f.getId().equals(id));
        
        // Delete versions
        if (removed) {
            fileVersions.remove(id);
        }
        
        return removed;
    }

    @Override
    public List<FileVersionDTO> getFileVersions(String fileId) {
        return fileVersions.getOrDefault(fileId, Collections.emptyList());
    }

    @Override
    public FileDTO restoreVersion(String fileId, Integer version) {
        FileDTO file = getFileById(fileId);
        if (file == null) {
            return null;
        }
        
        List<FileVersionDTO> versions = fileVersions.get(fileId);
        if (versions == null) {
            return null;
        }
        
        Optional<FileVersionDTO> versionToRestore = versions.stream()
                .filter(v -> v.getVersion().equals(version))
                .findFirst();
                
        if (!versionToRestore.isPresent()) {
            return null;
        }
        
        // In a real application, we would restore the actual file data
        // For now, we'll just update the file metadata
        
        // Update current version flag
        versions.forEach(v -> v.setCurrent(v.getVersion().equals(version)));
        
        // Update file metadata
        file.setVersion(version);
        file.setLastModified(LocalDateTime.now());
        
        return file;
    }

    @Override
    public List<FileDTO> searchFiles(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllFiles();
        }
        
        String lowercaseQuery = query.toLowerCase();
        
        return files.stream()
                .filter(file -> 
                    file.getName().toLowerCase().contains(lowercaseQuery) ||
                    file.getOwner().toLowerCase().contains(lowercaseQuery) ||
                    file.getPath().toLowerCase().contains(lowercaseQuery))
                .collect(Collectors.toList());
    }

    @Override
    public List<FileDTO> filterByType(String type) {
        if (type == null || type.trim().isEmpty() || type.equals("all")) {
            return getAllFiles();
        }
        
        return files.stream()
                .filter(file -> file.getType().equals(type))
                .collect(Collectors.toList());
    }
    
    // Helper method to determine file type from filename
    private String getFileTypeFromName(String name) {
        if (name == null || name.isEmpty()) {
            return "document";
        }
        
        String extension = name.substring(name.lastIndexOf('.') + 1).toLowerCase();
        
        if (Arrays.asList("jpg", "jpeg", "png", "gif", "bmp", "svg").contains(extension)) return "image";
        if (Arrays.asList("pdf").contains(extension)) return "pdf";
        if (Arrays.asList("doc", "docx", "xls", "xlsx", "ppt", "pptx", "csv").contains(extension)) return "document";
        if (Arrays.asList("txt", "log", "md").contains(extension)) return "text";
        if (Arrays.asList("js", "jsx", "ts", "tsx", "html", "css", "java", "py", "c", "cpp", "sql", "json").contains(extension)) return "code";
        if (Arrays.asList("mp4", "avi", "mov", "wmv", "flv", "mkv").contains(extension)) return "video";
        if (Arrays.asList("mp3", "wav", "ogg", "flac").contains(extension)) return "audio";
        if (Arrays.asList("zip", "rar", "7z", "tar", "gz").contains(extension)) return "archive";
        
        return "document";
    }
} 