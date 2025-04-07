package com.carsystem.app.controller;

import com.carsystem.app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public String renderAuthPage() {
        return "index"; // Loads index.html
    }

    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(@RequestBody Map<String, String> loginData) {
        return authService.login(loginData);
    }

    @PostMapping("/register")
    @ResponseBody
    public Map<String, Object> register(@RequestBody Map<String, String> registrationData) {
        return authService.register(registrationData);
    }

    @PostMapping("/send-otp")
    @ResponseBody
    public Map<String, Object> sendOTP(@RequestBody Map<String, String> otpData) {
        return authService.sendOTP(otpData);
    }

    @PostMapping("/verify-otp")
    @ResponseBody
    public Map<String, Object> verifyOTP(@RequestBody Map<String, String> otpData) {
        return authService.verifyOTP(otpData);
    }

    @PostMapping("/reset-password")
    @ResponseBody
    public Map<String, Object> resetPassword(@RequestBody Map<String, String> resetData) {
        return authService.resetPassword(resetData);
    }
    
    @GetMapping("/home")
    public String home() {
        return "home";  // Returns home.html from the resources/static folder
    }
}
