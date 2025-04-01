package com.stellarfs.controller;

import com.stellarfs.model.dto.FileDTO;
import com.stellarfs.model.dto.FileVersionDTO;
import com.stellarfs.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<List<FileDTO>> getAllFiles() {
        return ResponseEntity.ok(fileService.getAllFiles());
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
        if (file == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(file);
    }

    @PostMapping("/upload")
    public ResponseEntity<FileDTO> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "path", defaultValue = "/") String path,
            @RequestParam("owner") String owner) {
        
        FileDTO uploadedFile = fileService.uploadFile(file, path, owner);
        if (uploadedFile == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(uploadedFile);
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