package com.carsystem.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsystem.app.exception.BookingNotFoundException;
import com.carsystem.app.exception.UserNotFoundException;
import com.carsystem.app.model.Booking;
import com.carsystem.app.model.Car;
import com.carsystem.app.model.User;
import com.carsystem.app.model.enums.Roles;
import com.carsystem.app.repository.CarRepository;
import com.carsystem.app.repository.UserRepository;
import com.carsystem.app.service.CarService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CarRepository carRepository;

	@Autowired
	private CarService carService;

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/users")
	public List<User> getAllUsers() {
		List<User> users = userRepository.findUserByUserType(Roles.USER);
		if (users.isEmpty()) {
			throw new UserNotFoundException("No users found");
		}
		return users;
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/user/{id}")
	public User getUser(@PathVariable("id") Long userId) {
		return userRepository.findById(userId)
				.orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/booking")
	public List<Booking> getAllBooking() {
		List<Booking> bookings = carService.getAllBooking();
		if (bookings.isEmpty()) {
			throw new BookingNotFoundException("No bookings found");
		}
		return bookings;
	}

	@PreAuthorize("hasRole('USER', 'ADMIN')")
	@GetMapping("/user/{id}/bookings")
	public List<Booking> getUserBookings(@PathVariable("id") Long userId) {
		return carService.getBookingsByUserId(userId);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/user/{id}/bookings/count")
	public int countUserBookings(@PathVariable("id") Long userId) {
		return carService.countBookingsByUserId(userId);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{userId}/active")
	public ResponseEntity<String> carActive(@PathVariable("userId") Long id) {
	    Car car = carService.getCarById(id);
	    car.setActive(true);
	    carRepository.save(car); // persist the change
	    return ResponseEntity.status(201).body("Car Active");
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/{userId}/inactive")
	public ResponseEntity<String> carInActive(@PathVariable("userId") Long id) {
	    Car car = carService.getCarById(id);
	    car.setActive(false);
	    carRepository.save(car); // persist the change
	    return ResponseEntity.status(201).body("Car InActive");
	}
}
