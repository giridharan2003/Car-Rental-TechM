package com.carsystem.app.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.carsystem.app.model.enums.CarStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name = "cars")
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    @Column(nullable = false, length = 50)
    private String make;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(nullable = false)
    private int year;

    @Column(length = 30)
    private String color;

    @Column(nullable = false, unique = true, length = 20)
    private String licensePlate;

    @Column(unique = true, length = 30)
    private String vin;

    private Integer mileage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('available', 'rented', 'maintenance') DEFAULT 'available'")
    private CarStatus status;

    private String imageUrl;

    @Column(nullable = false, precision = 10, scale = 2)
    private Long dailyRate;

    @Column(precision = 10, scale = 2)
    private Long hourlyRate;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
