package com.carsystem.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.carsystem.app.model.enums.CarStatus;

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
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CarCategory Category;
        
    private String licensePlate;
    private String insurence;
    
    private String location;
    
    private int luggage;
    private int mileage;
    
    private String imageUrl;
    
    private Double dailyRate; 
    private Double hourlyRate;
    
    @Enumerated(EnumType.STRING)
    private CarStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
