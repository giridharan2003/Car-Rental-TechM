package com.carsystem.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsystem.app.exception.BookingNotFoundException;
import com.carsystem.app.exception.CarNotFoundException;
import com.carsystem.app.exception.UserNotFoundException;
import com.carsystem.app.model.Booking;
import com.carsystem.app.model.User;
import com.carsystem.app.repository.UserRepository;
import com.carsystem.app.service.CarService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CarService carService;

	@GetMapping("/booking")
	public List<Booking> getAllBooking() {
	    List<Booking> bookings = carService.getAllBooking();
	    if (bookings.isEmpty()) {
	        throw new BookingNotFoundException("No bookings found");
	    }
	    return bookings;
	}
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
	    List<User> users = userRepository.findAll();
	    if (users.isEmpty()) {
	        throw new UserNotFoundException("No users found");
	    }
	    return users;
	}	

	@GetMapping("/user/{id}")
	public User getAllUser(@PathVariable("id") Long userId) {
	    return userRepository.findById(userId)
	            .orElseThrow(() -> new CarNotFoundException("User with ID " + userId + " not found"));
	}
	
	@GetMapping("/user/{id}/bookings")
	public List<Booking> getUserBookings(@PathVariable("id") Long userId) {
	    return carService.getBookingsByUserId(userId);
	}
	
	@GetMapping("/user/{id}/bookings/count")
	public int countUserBookings(@PathVariable("id") Long userId) {
	    return carService.countBookingsByUserId(userId);
	}

}
