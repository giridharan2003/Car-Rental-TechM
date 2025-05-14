package com.carsystem.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

import com.carsystem.app.model.enums.BookingStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    private User userId;
    
    @ManyToOne
    private Car carId;
    
    @ManyToOne
    private Location pickupLocationId;
    
    @ManyToOne
    private Location dropLocationId;
    
    private LocalDateTime pickUpDatetime;
    private LocalDateTime dropDatetime;
    
    @ManyToMany
    private List<AdditionalService> additionalService;
    
    private Double totalPrice;
    
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
