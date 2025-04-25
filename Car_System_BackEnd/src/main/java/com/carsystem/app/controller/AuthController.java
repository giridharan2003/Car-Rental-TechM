//package com.carsystem.app.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.carsystem.app.dto.ApiResponse;
//import com.carsystem.app.dto.LoginRequest;
//import com.carsystem.app.dto.OtpRequest;
//import com.carsystem.app.dto.RegisterRequest;
//import com.carsystem.app.dto.ResetPasswordRequest;
//import com.carsystem.app.service.AuthService;
//
//import jakarta.validation.Valid;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    @Autowired
//    private AuthService authService;
//
//    @PostMapping("/login")
//    public ApiResponse<?> login(@Valid @RequestBody LoginRequest loginRequest) {
//        return authService.login(loginRequest);
//    }
//
//    @PostMapping("/register")
//    public ApiResponse<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
//        return authService.register(registerRequest);
//    }
//
//    @PostMapping("/send-otp")
//    public ApiResponse<?> sendOTP(@Valid @RequestBody OtpRequest otpRequest) {
//        return authService.sendOTP(otpRequest);
//    }
//
//    @PostMapping("/verify-otp")
//    public ApiResponse<?> verifyOTP(@Valid @RequestBody OtpRequest otpRequest) {
//        return authService.verifyOTP(otpRequest);
//    }
//
//    @PostMapping("/reset-password")
//    public ApiResponse<?> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
//        return authService.resetPassword(resetPasswordRequest);
//    }
//}
