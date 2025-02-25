package com.finalproject.stellarfs.storage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorage {
    private static final String STORAGE_DIR = "uploads/";

    public FileStorage() {
        File storageDir = new File(STORAGE_DIR);
        if (!storageDir.exists()) {
            storageDir.mkdirs(); // Create directory if it doesn't exist
        }
    }

    public String saveFile(MultipartFile file) throws IOException {
        String filePath = STORAGE_DIR + file.getOriginalFilename();
        File destination = new File(filePath);
        file.transferTo(destination);
        return filePath;
    }

    public byte[] readFile(String fileName) throws IOException {
        Path path = Paths.get(STORAGE_DIR + fileName);
        return Files.readAllBytes(path);
    }

    public boolean deleteFile(String fileName) {
        File file = new File(STORAGE_DIR + fileName);
        return file.exists() && file.delete();
    }

    public boolean fileExists(String fileName) {
        File file = new File(STORAGE_DIR + fileName);
        return file.exists();
    }
}
