package com.finalproject.stellarfs.service;

import com.finalproject.stellarfs.model.FileMetadata;
import com.finalproject.stellarfs.storage.FileStorage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class FileService {
    private final FileStorage fileStorage;
    private final Map<String, FileMetadata> fileStorageMap = new HashMap<>();

    public FileService(FileStorage fileStorage) {
        this.fileStorage = fileStorage;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String filePath = fileStorage.saveFile(file);

        FileMetadata metadata = new FileMetadata(file.getOriginalFilename(), file.getSize());
        fileStorageMap.put(file.getOriginalFilename(), metadata);

        return "File uploaded successfully: " + file.getOriginalFilename();
    }

    public List<FileMetadata> listFiles() {
        return new ArrayList<>(fileStorageMap.values());
    }

    public byte[] downloadFile(String fileName) throws IOException {
        return fileStorage.readFile(fileName);
    }

    public boolean deleteFile(String fileName) {
        if (fileStorage.deleteFile(fileName)) {
            fileStorageMap.remove(fileName);
            return true;
        }
        return false;
    }
}
