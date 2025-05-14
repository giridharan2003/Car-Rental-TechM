package com.carsystem.app.controller;

import com.carsystem.app.model.User;
import com.carsystem.app.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public String renderAuthPage() {
        return "index";
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> login(@RequestBody User user) {
        return authService.login(user);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/send-otp")
    @ResponseBody
    public ResponseEntity<String> sendOTP(@RequestBody User user) {
        return authService.sendOTP(user);
    }

    @PostMapping("/verify-otp")
    @ResponseBody
    public ResponseEntity<String> verifyOTP(@RequestBody Map<String, String> otpData) {
        String email = otpData.get("email");
        String otp = otpData.get("otp");
        return authService.verifyOTP(email, otp);
    }

    @PostMapping("/reset-password")
    @ResponseBody
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> resetData) {
        String email = resetData.get("email");
        String newPassword = resetData.get("newPassword");
        return authService.resetPassword(email, newPassword);
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/admin/login")
    public String adminLogin() {
        return "admin-login";
    }
}
