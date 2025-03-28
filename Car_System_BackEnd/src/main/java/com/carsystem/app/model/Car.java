package com.carsystem.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.carsystem.app.model.enums.CarStatus;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carId;

    private String make;
    private String model;
    private int year;
    private int seats;
    private String licensePlate;
    private String vin;
    private String location;
    private int luggage;
    private int mileage;
    
    @Enumerated(EnumType.STRING)
    private CarStatus status;
    
    private String imageUrl;
    private BigDecimal dailyRate;
    private BigDecimal hourlyRate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
