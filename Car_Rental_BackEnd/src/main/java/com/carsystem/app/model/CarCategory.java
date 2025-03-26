package com.carsystem.app.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "car_categories")
public class CarCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;
}
