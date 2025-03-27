package com.carsystem.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
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
    private boolean isAdmin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
