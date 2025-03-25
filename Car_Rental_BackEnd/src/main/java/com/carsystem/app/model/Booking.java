package com.carsystem.app.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.carsystem.app.model.enums.BookingStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "pickup_location_id", nullable = false)
    private Location pickupLocation;

    @ManyToOne
    @JoinColumn(name = "return_location_id", nullable = false)
    private Location returnLocation;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private RentalPackage rentalPackage;

    @Column(nullable = false)
    private LocalDateTime startDatetime;

    @Column(nullable = false)
    private LocalDateTime endDatetime;

    @Column(nullable = false, precision = 10, scale = 2)
    private Long totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "DEFAULT 'PENDING'")
    private BookingStatus status;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
