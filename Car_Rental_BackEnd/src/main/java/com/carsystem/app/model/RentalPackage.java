package com.carsystem.app.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

import org.hibernate.annotations.CurrentTimestamp;

@Entity
@Data
@Table(name = "rental_packages")
public class RentalPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private int durationHours;

    @Column(nullable = false)
    private Double basePrice;

    @Column(nullable = false)
    private boolean isActive;

    @Column(nullable = false, updatable = false)
    @CurrentTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @CurrentTimestamp
    private LocalDateTime updatedAt;
}