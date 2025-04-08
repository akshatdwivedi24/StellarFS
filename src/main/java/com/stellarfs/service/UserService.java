package com.stellarfs.service;

import com.stellarfs.model.dto.UserDTO;
import com.stellarfs.model.dto.ActivityLogDTO;
import java.util.List;
import java.util.Set;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO getUserById(String id);
    UserDTO updateUser(String id, UserDTO userDTO);
    void deleteUser(String id);
    UserDTO updateUserRoles(String id, Set<String> roles);
    UserDTO updateUserPermissions(String id, Set<String> permissions);
    List<ActivityLogDTO> getUserActivityLogs(String userId);
    List<ActivityLogDTO> getAllActivityLogs();
    void toggleUserStatus(String id);
    List<String> getAvailableRoles();
    List<String> getAvailablePermissions();
} 