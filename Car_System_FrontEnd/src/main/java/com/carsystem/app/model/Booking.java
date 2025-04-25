package com.carsystem.app.model;

import java.time.LocalDateTime;

import com.carsystem.app.model.enums.BookingStatus;

public class Booking {
    private Long bookingId;

    private Integer userId;
    private int carId;
    private int pickupLocationId;
    private int returnLocationId;
    private int packageId;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    private Double totalPrice;
    
    private BookingStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    public Long getBookingId() {
        return bookingId;
    }
    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public int getCarId() {
        return carId;
    }
    public void setCarId(int carId) {
        this.carId = carId;
    }
    public int getPickupLocationId() {
        return pickupLocationId;
    }
    public void setPickupLocationId(int pickupLocationId) {
        this.pickupLocationId = pickupLocationId;
    }
    public int getReturnLocationId() {
        return returnLocationId;
    }
    public void setReturnLocationId(int returnLocationId) {
        this.returnLocationId = returnLocationId;
    }
    public int getPackageId() {
        return packageId;
    }
    public void setPackageId(int packageId) {
        this.packageId = packageId;
    }
    public LocalDateTime getStartDatetime() {
        return startDatetime;
    }
    public void setStartDatetime(LocalDateTime startDatetime) {
        this.startDatetime = startDatetime;
    }
    public LocalDateTime getEndDatetime() {
        return endDatetime;
    }
    public void setEndDatetime(LocalDateTime endDatetime) {
        this.endDatetime = endDatetime;
    }
    public Double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
    public BookingStatus getStatus() {
        return status;
    }
    public void setStatus(BookingStatus status) {
        this.status = status;
    }
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    
}
