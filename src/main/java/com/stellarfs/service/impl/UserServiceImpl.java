package com.stellarfs.service.impl;

import com.stellarfs.model.dto.UserDTO;
import com.stellarfs.model.dto.ActivityLogDTO;
import com.stellarfs.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private final Map<String, UserDTO> users = new HashMap<>();
    private final List<ActivityLogDTO> activityLogs = new ArrayList<>();
    private final List<String> availableRoles = Arrays.asList("ADMIN", "USER", "MANAGER", "VIEWER");
    private final List<String> availablePermissions = Arrays.asList(
        "READ", "WRITE", "DELETE", "MANAGE_USERS", "VIEW_LOGS", "MANAGE_SYSTEM"
    );

    public UserServiceImpl() {
        // Initialize with mock data
        initializeMockData();
    }

    private void initializeMockData() {
        // Create mock users
        UserDTO admin = new UserDTO();
        admin.setId("1");
        admin.setEmail("admin@stellarfs.com");
        admin.setName("Admin User");
        admin.setRoles(new HashSet<>(Arrays.asList("ADMIN")));
        admin.setPermissions(new HashSet<>(Arrays.asList("READ", "WRITE", "DELETE", "MANAGE_USERS", "VIEW_LOGS", "MANAGE_SYSTEM")));
        admin.setActive(true);
        admin.setCreatedAt(LocalDateTime.now().minusDays(30));
        admin.setLastLogin(LocalDateTime.now());

        UserDTO manager = new UserDTO();
        manager.setId("2");
        manager.setEmail("manager@stellarfs.com");
        manager.setName("Manager User");
        manager.setRoles(new HashSet<>(Arrays.asList("MANAGER")));
        manager.setPermissions(new HashSet<>(Arrays.asList("READ", "WRITE", "VIEW_LOGS")));
        manager.setActive(true);
        manager.setCreatedAt(LocalDateTime.now().minusDays(20));
        manager.setLastLogin(LocalDateTime.now().minusDays(1));

        UserDTO user = new UserDTO();
        user.setId("3");
        user.setEmail("user@stellarfs.com");
        user.setName("Regular User");
        user.setRoles(new HashSet<>(Arrays.asList("USER")));
        user.setPermissions(new HashSet<>(Arrays.asList("READ", "WRITE")));
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now().minusDays(10));
        user.setLastLogin(LocalDateTime.now().minusDays(2));

        users.put(admin.getId(), admin);
        users.put(manager.getId(), manager);
        users.put(user.getId(), user);

        // Create mock activity logs
        createMockActivityLog("1", "Admin User", "LOGIN", "SYSTEM", null, "User logged in", "192.168.1.1");
        createMockActivityLog("2", "Manager User", "UPDATE", "FILE", "file123", "Updated file permissions", "192.168.1.2");
        createMockActivityLog("3", "Regular User", "DOWNLOAD", "FILE", "file456", "Downloaded file", "192.168.1.3");
    }

    private void createMockActivityLog(String userId, String userName, String action, String resourceType, 
                                     String resourceId, String details, String ipAddress) {
        ActivityLogDTO log = new ActivityLogDTO();
        log.setId(UUID.randomUUID().toString());
        log.setUserId(userId);
        log.setUserName(userName);
        log.setAction(action);
        log.setResourceType(resourceType);
        log.setResourceId(resourceId);
        log.setDetails(details);
        log.setTimestamp(LocalDateTime.now().minusHours(new Random().nextInt(24)));
        log.setIpAddress(ipAddress);
        activityLogs.add(log);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    @Override
    public UserDTO getUserById(String id) {
        return users.get(id);
    }

    @Override
    public UserDTO updateUser(String id, UserDTO userDTO) {
        if (users.containsKey(id)) {
            userDTO.setId(id);
            users.put(id, userDTO);
            return userDTO;
        }
        return null;
    }

    @Override
    public void deleteUser(String id) {
        users.remove(id);
    }

    @Override
    public UserDTO updateUserRoles(String id, Set<String> roles) {
        UserDTO user = users.get(id);
        if (user != null) {
            user.setRoles(roles);
            return user;
        }
        return null;
    }

    @Override
    public UserDTO updateUserPermissions(String id, Set<String> permissions) {
        UserDTO user = users.get(id);
        if (user != null) {
            user.setPermissions(permissions);
            return user;
        }
        return null;
    }

    @Override
    public List<ActivityLogDTO> getUserActivityLogs(String userId) {
        return activityLogs.stream()
                .filter(log -> log.getUserId().equals(userId))
                .sorted(Comparator.comparing(ActivityLogDTO::getTimestamp).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<ActivityLogDTO> getAllActivityLogs() {
        return activityLogs.stream()
                .sorted(Comparator.comparing(ActivityLogDTO::getTimestamp).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public void toggleUserStatus(String id) {
        UserDTO user = users.get(id);
        if (user != null) {
            user.setActive(!user.isActive());
        }
    }

    @Override
    public List<String> getAvailableRoles() {
        return availableRoles;
    }

    @Override
    public List<String> getAvailablePermissions() {
        return availablePermissions;
    }
} 