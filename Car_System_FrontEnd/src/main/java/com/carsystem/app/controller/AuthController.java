package com.carsystem.app.controller;

import com.carsystem.app.model.User;
import com.carsystem.app.service.AuthService;
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

    @GetMapping("/admin")
    public String adminLogin() {
        return "admin-login";
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        return authService.login(user);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/send-otp")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> sendOTP(@RequestBody User user) {
        return authService.sendOTP(user);
    }

    @PostMapping("/verify-otp")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> verifyOTP(@RequestBody Map<String, String> otpData) {
        String email = otpData.get("email");
        String otp = otpData.get("otp");
        return authService.verifyOTP(email, otp);
    }

    @PostMapping("/reset-password")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> resetData) {
        String email = resetData.get("email");
        String newPassword = resetData.get("newPassword");
        return authService.resetPassword(email, newPassword);
    }

    @PostMapping("/admin/login")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> adminLogin(@RequestBody User user) {
        return authService.adminLogin(user);
    }

    @PostMapping("/admin/register")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> adminRegister(@RequestBody User user) {
        return authService.adminRegister(user);
    }
}