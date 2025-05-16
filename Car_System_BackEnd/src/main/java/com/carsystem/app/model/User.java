package com.carsystem.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.carsystem.app.model.enums.Roles;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    
    @Enumerated(EnumType.STRING)
    private Roles userType;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
