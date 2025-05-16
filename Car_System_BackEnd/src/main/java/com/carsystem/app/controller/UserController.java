package com.carsystem.app.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carsystem.app.model.Booking;
import com.carsystem.app.model.User;
import com.carsystem.app.repository.UserRepository;
import com.carsystem.app.service.UserService;
import com.carsystem.app.util.JwtUtil;

@RestController
@RequestMapping("user")
public class UserController {
	
	@Autowired
    private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtUtil jwtUtil;

	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	@PostMapping("/booking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = userService.createBooking(booking);
        return ResponseEntity.status(201).body(savedBooking);
    }
	
	@GetMapping("/user-info")
	public ResponseEntity<Optional<User>> getUserFromToken(@RequestHeader("Authorization") String token) {
	    String jwt = token.substring(7);

	    // extract userId from token
	    Long userId = jwtUtil.getUserIdFromToken(jwt);

	    // fetch user by ID
	    Optional<User> user = userRepository.findById(userId);

	    return ResponseEntity.ok(user);
	}
	
	
	@GetMapping("/valid/token")
	public ResponseEntity<Boolean> isTokenValid(@RequestHeader("Authorization") String token) {
	    String jwt = token.substring(7);

	    Boolean result = jwtUtil.validateToken(jwt);

	    return ResponseEntity.ok(result);
	}
}