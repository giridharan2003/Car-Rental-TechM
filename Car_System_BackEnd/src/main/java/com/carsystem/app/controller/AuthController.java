package com.carsystem.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.carsystem.app.model.User;
import com.carsystem.app.model.Otp;
import com.carsystem.app.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	
	@PostMapping("/admin/login")
	public ResponseEntity<Map<String, String>> adminLogin(@Valid @RequestBody User loginUser){
		String result = authService.login(loginUser);

		Map<String, String> response = new HashMap<>();
		response.put("token", result);

		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/admin/register")
	public ResponseEntity<Map<String, String>> adminRegister(@Valid @RequestBody User newUser) {
		authService.register(newUser);

		Map<String, String> response = new HashMap<>();
		response.put("message", "User registered successfully");

		return ResponseEntity.ok(response);
	}
	

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@Valid @RequestBody User loginUser) {
		String result = authService.login(loginUser);

		Map<String, String> response = new HashMap<>();
		response.put("token", result);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> register(@Valid @RequestBody User newUser) {
		authService.register(newUser);

		Map<String, String> response = new HashMap<>();
		response.put("message", "User registered successfully");

		return ResponseEntity.ok(response);
	}

	@PostMapping("/send-otp")
	public ResponseEntity<Map<String, String>> sendOTP(@RequestBody User user) {
		authService.sendOTP(user.getEmail());

		Map<String, String> response = new HashMap<>();
		response.put("message", "OTP sent successfully");

		return ResponseEntity.ok(response);
	}

	@PostMapping("/verify-otp")
	public ResponseEntity<Map<String, String>> verifyOTP(@Valid @RequestBody Otp otp) {
		authService.verifyOTP(otp);

		Map<String, String> response = new HashMap<>();
		response.put("message", "OTP verified successfully");

		return ResponseEntity.ok(response);
	}

	@PostMapping("/reset-password")
	public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> body) {
		authService.resetPassword(body.get("email"), body.get("newPassword"));

		Map<String, String> response = new HashMap<>();
		response.put("message", "Password reset successfully");

		return ResponseEntity.ok(response);
	}
}
