package com.finalproject.stellarfs.controller;

import com.finalproject.stellarfs.model.FileMetadata;
import com.finalproject.stellarfs.service.FileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
@RestController
@RequestMapping("/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    // Upload File
    @PostMapping("/upload") // Changed from "/files" to "/files/upload" for clarity
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String response = fileService.uploadFile(file);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace(); // Print error in logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    // List Files
    @GetMapping
    public ResponseEntity<List<FileMetadata>> listFiles() {
        List<FileMetadata> files = fileService.listFiles();
        return ResponseEntity.ok(files);
    }

    // Download File
    @GetMapping("/{fileName}")
    public byte[] downloadFile(@PathVariable String fileName) throws IOException {
        return fileService.downloadFile(fileName);
    }

    // Delete File
    @DeleteMapping("/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        boolean deleted = fileService.deleteFile(fileName);
        if (deleted) {
            return ResponseEntity.ok("File deleted: " + fileName);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found: " + fileName);
        }
    }
}
