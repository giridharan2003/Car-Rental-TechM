package com.carsystem.app.model;

import java.time.LocalDateTime;
import java.util.List;

import com.carsystem.app.model.enums.BookingStatus;


public class Booking {
    
    private Long bookingId;

    private String paymentId;

    private User userId;
    
    private Car carId;
    
    private Location pickupLocationId;
    
    private Location dropLocationId;
    
    private LocalDateTime pickUpDatetime;
    private LocalDateTime dropDatetime;
    
    private List<AdditionalService> additionalService;
    
    private Double totalPrice;
    
    private BookingStatus status;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    
    
    public Booking() {
    }
    public Long getBookingId() {
        return bookingId;
    }
    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
    public User getUserId() {
        return userId;
    }
    public void setUserId(User userId) {
        this.userId = userId;
    }
    public Car getCarId() {
        return carId;
    }
    public void setCarId(Car carId) {
        this.carId = carId;
    }
    public Location getPickupLocationId() {
        return pickupLocationId;
    }
    public void setPickupLocationId(Location pickupLocationId) {
        this.pickupLocationId = pickupLocationId;
    }
    public Location getDropLocationId() {
        return dropLocationId;
    }
    public void setDropLocationId(Location dropLocationId) {
        this.dropLocationId = dropLocationId;
    }
    public LocalDateTime getPickUpDatetime() {
        return pickUpDatetime;
    }
    public void setPickUpDatetime(LocalDateTime pickUpDatetime) {
        this.pickUpDatetime = pickUpDatetime;
    }
    public LocalDateTime getDropDatetime() {
        return dropDatetime;
    }
    public void setDropDatetime(LocalDateTime dropDatetime) {
        this.dropDatetime = dropDatetime;
    }
    public List<AdditionalService> getAdditionalService() {
        return additionalService;
    }
    public void setAdditionalService(List<AdditionalService> additionalService) {
        this.additionalService = additionalService;
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
    @Override
    public String toString() {
        return "Booking [bookingId=" + bookingId + ", userId=" + userId + ", carId=" + carId + ", pickupLocationId="
                + pickupLocationId + ", dropLocationId=" + dropLocationId + ", pickUpDatetime=" + pickUpDatetime
                + ", dropDatetime=" + dropDatetime + ", additionalService=" + additionalService + ", totalPrice="
                + totalPrice + ", status=" + status + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
                + ", getBookingId()=" + getBookingId() + ", getUserId()=" + getUserId() + ", getCarId()=" + getCarId()
                + ", getPickupLocationId()=" + getPickupLocationId() + ", getDropLocationId()=" + getDropLocationId()
                + ", getClass()=" + getClass() + ", getPickUpDatetime()=" + getPickUpDatetime() + ", getDropDatetime()="
                + getDropDatetime() + ", getAdditionalService()=" + getAdditionalService() + ", getTotalPrice()="
                + getTotalPrice() + ", getStatus()=" + getStatus() + ", getCreatedAt()=" + getCreatedAt()
                + ", getUpdatedAt()=" + getUpdatedAt() + ", hashCode()=" + hashCode() + ", toString()="
                + super.toString() + "]";
    }
    public String getPaymentId() {
        return paymentId;
    }
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }
}
