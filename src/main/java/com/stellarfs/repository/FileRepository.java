package com.stellarfs.repository;

import com.stellarfs.model.entity.File;
import com.stellarfs.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findByOwner(User owner);
    List<File> findByOwnerAndIsDeletedFalse(User owner);
    List<File> findByPathContainingAndIsDeletedFalse(String path);
    boolean existsByPathAndOwner(String path, User owner);
} 