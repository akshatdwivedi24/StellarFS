package com.finalproject.stellarfs.models;

import jakarta.persistence.*;

@Entity
@Table(name = "user_quota")
public class UserQuota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long maxQuota;

    @Column(nullable = false)
    private Long usedQuota;

    // Constructors, getters, setters
    public UserQuota() {}

    public UserQuota(Long userId, Long maxQuota, Long usedQuota) {
        this.userId = userId;
        this.maxQuota = maxQuota;
        this.usedQuota = usedQuota;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMaxQuota() {
        return maxQuota;
    }

    public void setMaxQuota(Long maxQuota) {
        this.maxQuota = maxQuota;
    }

    public Long getUsedQuota() {
        return usedQuota;
    }

    public void setUsedQuota(Long usedQuota) {
        this.usedQuota = usedQuota;
    }
}