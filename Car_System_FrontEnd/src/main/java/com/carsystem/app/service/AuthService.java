package com.carsystem.app.service;

import com.carsystem.app.dto.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@SuppressWarnings("unchecked")
public class AuthService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/api/auth";

    
    public ApiResponse<String> login(LoginRequest loginData) {
        return restTemplate.postForObject(backendUrl + "/login", loginData, ApiResponse.class);
    }

    public ApiResponse<String> register(RegisterRequest registrationData) {
        return restTemplate.postForObject(backendUrl + "/register", registrationData, ApiResponse.class);
    }

    public ApiResponse<String> sendOTP(OtpRequest otpData) {
        return restTemplate.postForObject(backendUrl + "/send-otp", otpData, ApiResponse.class);
    }

    public ApiResponse<String> verifyOTP(OtpRequest otpData) {
        return restTemplate.postForObject(backendUrl + "/verify-otp", otpData, ApiResponse.class);
    }

    public ApiResponse<String> resetPassword(ResetPasswordRequest resetData) {
        return restTemplate.postForObject(backendUrl + "/reset-password", resetData, ApiResponse.class);
    }
}