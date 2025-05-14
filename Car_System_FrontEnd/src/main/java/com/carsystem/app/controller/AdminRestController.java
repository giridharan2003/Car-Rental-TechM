package com.carsystem.app.controller;

import com.carsystem.app.service.CarService;
import com.carsystem.app.model.Booking;
import com.carsystem.app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminRestController {

    @Autowired
    private CarService carService;

    @GetMapping("/bookings")
    public Booking[] getAllBookings() {
        return carService.getAllBooking();
    }

    @GetMapping("/users")
    public User[] getAllUsers() {
        return carService.getAllUsers();
    }

    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return carService.getUserById(userId);
    }

    @GetMapping("/user/{userId}/bookings")
    public Booking[] getBookingsByUserId(@PathVariable Long userId) {
        return carService.getBookingsByUserId(userId);
    }

    @GetMapping("/user/{userId}/bookings/count")
    public int countBookingsByUserId(@PathVariable Long userId) {
        return carService.countBookingsByUserId(userId);
    }
}
