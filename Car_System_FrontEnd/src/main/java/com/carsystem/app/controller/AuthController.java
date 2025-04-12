package com.carsystem.app.controller;

import com.carsystem.app.dto.*;
import com.carsystem.app.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public ApiResponse<String> login(@RequestBody LoginRequest loginData, HttpServletResponse response) {
        ApiResponse<String> result = authService.login(loginData);
        if (result.isSuccess()) {
            Cookie jwtCookie = new Cookie("jwt", result.getData());
            jwtCookie.setHttpOnly(true);
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);
        }
        return result;
    }

    @PostMapping("/register")
    @ResponseBody
    public ApiResponse<String> register(@RequestBody RegisterRequest registrationData) {
        return authService.register(registrationData);
    }

    @PostMapping("/send-otp")
    @ResponseBody
    public ApiResponse<String> sendOTP(@RequestBody OtpRequest otpData) {
        return authService.sendOTP(otpData);
    }

    @PostMapping("/verify-otp")
    @ResponseBody
    public ApiResponse<String> verifyOTP(@RequestBody OtpRequest otpData) {
        return authService.verifyOTP(otpData);
    }

    @PostMapping("/reset-password")
    @ResponseBody
    public ApiResponse<String> resetPassword(@RequestBody ResetPasswordRequest resetData) {
        return authService.resetPassword(resetData);
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