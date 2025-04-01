package com.carsystem.app.controller;

import com.carsystem.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        return authService.login(loginData);
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> registrationData) {
        return authService.register(registrationData);
    }

    @PostMapping("/send-otp")
    public Map<String, Object> sendOTP(@RequestBody Map<String, String> otpData) {
        return authService.sendOTP(otpData);
    }

    @PostMapping("/verify-otp")
    public Map<String, Object> verifyOTP(@RequestBody Map<String, String> otpData) {
        return authService.verifyOTP(otpData);
    }

    @PostMapping("/reset-password")
    public Map<String, Object> resetPassword(@RequestBody Map<String, String> resetData) {
        return authService.resetPassword(resetData);
    }
}
