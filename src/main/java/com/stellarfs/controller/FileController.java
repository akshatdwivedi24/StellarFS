package com.stellarfs.controller;

import com.stellarfs.model.dto.FileDTO;
import com.stellarfs.model.dto.FileVersionDTO;
import com.stellarfs.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*")
public class FileController {

    private final FileService fileService;
    private final String uploadDir = "uploads";

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
        // Create upload directory if it doesn't exist
        new File(uploadDir).mkdirs();
    }

    @GetMapping(value = "/files", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FileInfo>> getFiles() {
        try {
            List<FileInfo> files = new ArrayList<>();
            File uploadDir = new File(this.uploadDir);
            
            if (uploadDir.exists() && uploadDir.isDirectory()) {
                File[] fileList = uploadDir.listFiles();
                if (fileList != null) {
                    for (File file : fileList) {
                        files.add(new FileInfo(
                            file.getName(),
                            file.length(),
                            getFileType(file.getName())
                        ));
                    }
                }
            }
            
            return ResponseEntity.ok(files);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FileInfo> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            // Get the original filename
            String originalFilename = file.getOriginalFilename();
            
            // Save the file to the uploads directory
            Path filePath = Paths.get(uploadDir, originalFilename);
            Files.write(filePath, file.getBytes());

            // Create file info
            FileInfo fileInfo = new FileInfo(
                originalFilename,
                file.getSize(),
                getFileType(originalFilename)
            );

            return ResponseEntity.ok(fileInfo);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String getFileType(String filename) {
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        switch (extension) {
            case "pdf": return "PDF Document";
            case "jpg":
            case "jpeg":
            case "png":
            case "gif": return "Image";
            case "doc":
            case "docx": return "Word Document";
            case "txt": return "Text File";
            case "zip":
            case "rar":
            case "7z": return "Archive";
            case "mp4":
            case "avi":
            case "mov": return "Video";
            case "mp3":
            case "wav":
            case "flac": return "Audio";
            case "java":
            case "js":
            case "py":
            case "cpp": return "Source Code";
            default: return "Unknown";
        }
    }

    public static class FileInfo {
        private String name;
        private long size;
        private String type;

        public FileInfo(String name, long size, String type) {
            this.name = name;
            this.size = size;
            this.type = type;
        }

        // Getters
        public String getName() { return name; }
        public long getSize() { return size; }
        public String getType() { return type; }
    }

    @GetMapping("/owner/{owner}")
    public ResponseEntity<List<FileDTO>> getFilesByOwner(@PathVariable String owner) {
        return ResponseEntity.ok(fileService.getFilesByOwner(owner));
    }

    @GetMapping("/recent")
    public ResponseEntity<List<FileDTO>> getRecentFiles(@RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(fileService.getRecentFiles(limit));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileDTO> getFileById(@PathVariable String id) {
        FileDTO file = fileService.getFileById(id);
        return file != null ? ResponseEntity.ok(file) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable String id) {
        boolean deleted = fileService.deleteFile(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{fileId}/versions")
    public ResponseEntity<List<FileVersionDTO>> getFileVersions(@PathVariable String fileId) {
        return ResponseEntity.ok(fileService.getFileVersions(fileId));
    }

    @PostMapping("/{fileId}/restore/{version}")
    public ResponseEntity<FileDTO> restoreVersion(
            @PathVariable String fileId,
            @PathVariable Integer version) {
        
        FileDTO restoredFile = fileService.restoreVersion(fileId, version);
        if (restoredFile == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(restoredFile);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FileDTO>> searchFiles(@RequestParam String query) {
        return ResponseEntity.ok(fileService.searchFiles(query));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<FileDTO>> filterByType(@RequestParam String type) {
        return ResponseEntity.ok(fileService.filterByType(type));
    }
} 