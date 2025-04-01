package com.carsystem.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.carsystem.app.model.enums.BookingStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private Integer userId;
    private int carId;
    private int pickupLocationId;
    private int returnLocationId;
    private int packageId;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    private Double totalPrice;
    
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
