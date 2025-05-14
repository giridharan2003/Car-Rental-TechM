package com.carsystem.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsystem.app.model.Booking;
import com.carsystem.app.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
    private UserService userService;

	@PostMapping("/booking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = userService.createBooking(booking);
        return ResponseEntity.status(201).body(savedBooking);
    }
}
