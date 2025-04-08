package com.stellarfs.controller;

import com.stellarfs.model.dto.UserDTO;
import com.stellarfs.model.dto.ActivityLogDTO;
import com.stellarfs.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable String id) {
        UserDTO user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(id, userDTO);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<UserDTO> updateUserRoles(@PathVariable String id, @RequestBody Set<String> roles) {
        UserDTO updatedUser = userService.updateUserRoles(id, roles);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/permissions")
    public ResponseEntity<UserDTO> updateUserPermissions(@PathVariable String id, @RequestBody Set<String> permissions) {
        UserDTO updatedUser = userService.updateUserPermissions(id, permissions);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/activity")
    public ResponseEntity<List<ActivityLogDTO>> getUserActivityLogs(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserActivityLogs(id));
    }

    @GetMapping("/activity")
    public ResponseEntity<List<ActivityLogDTO>> getAllActivityLogs() {
        return ResponseEntity.ok(userService.getAllActivityLogs());
    }

    @PutMapping("/{id}/toggle-status")
    public ResponseEntity<Void> toggleUserStatus(@PathVariable String id) {
        userService.toggleUserStatus(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/roles")
    public ResponseEntity<List<String>> getAvailableRoles() {
        return ResponseEntity.ok(userService.getAvailableRoles());
    }

    @GetMapping("/permissions")
    public ResponseEntity<List<String>> getAvailablePermissions() {
        return ResponseEntity.ok(userService.getAvailablePermissions());
    }
} 