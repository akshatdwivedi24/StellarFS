package com.finalproject.stellarfs.service;

import com.finalproject.stellarfs.model.FileMetadata;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {

    private final Path root = Paths.get("uploads"); // ✅ Ensure this folder exists

    public FileService() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload folder!");
        }
    }

    // ✅ Fix: Save uploaded files to the server
    public String uploadFile(MultipartFile file) throws IOException {
        Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        return "File uploaded successfully: " + file.getOriginalFilename();
    }

    // ✅ Fix: List uploaded files
    public List<FileMetadata> listFiles() {
        List<FileMetadata> files = new ArrayList<>();
        try {
            Files.list(root).forEach(path -> files.add(new FileMetadata(path.getFileName().toString())));
        } catch (IOException e) {
            throw new RuntimeException("Could not list files.");
        }
        return files;
    }

    // ✅ Fix: Retrieve file data
    public byte[] downloadFile(String fileName) throws IOException {
        Path filePath = root.resolve(fileName);
        return Files.readAllBytes(filePath);
    }

    // ✅ Fix: Delete file
    public boolean deleteFile(String fileName) {
        try {
            return Files.deleteIfExists(root.resolve(fileName));
        } catch (IOException e) {
            return false;
        }
    }
}
