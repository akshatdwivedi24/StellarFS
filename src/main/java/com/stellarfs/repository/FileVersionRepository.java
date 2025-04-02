package com.stellarfs.repository;

import com.stellarfs.model.entity.File;
import com.stellarfs.model.entity.FileVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileVersionRepository extends JpaRepository<FileVersion, Long> {
    List<FileVersion> findByFileOrderByVersionNumberDesc(File file);
    FileVersion findTopByFileOrderByVersionNumberDesc(File file);
    List<FileVersion> findByFileAndVersionNumberGreaterThanOrderByVersionNumberDesc(File file, Integer versionNumber);
} 