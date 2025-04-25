package com.carsystem.app.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@SuppressWarnings("unchecked")
public class AuthService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/api/auth";

    public Map<String, Object> login(String username, String password) {
        Map<String, String> loginData = Map.of("username", username, "password", password);
        return restTemplate.postForObject(backendUrl + "/login", loginData, Map.class);
    }

    public Map<String, Object> register(String username, String password, String email) {
        Map<String, String> registrationData = Map.of("username", username, "password", password, "email", email);
        return restTemplate.postForObject(backendUrl + "/register", registrationData, Map.class);
    }

    public Map<String, Object> sendOTP(String phoneNumber) {
        Map<String, String> otpData = Map.of("phoneNumber", phoneNumber);
        return restTemplate.postForObject(backendUrl + "/send-otp", otpData, Map.class);
    }

    public Map<String, Object> verifyOTP(String phoneNumber, String otp) {
        Map<String, String> otpData = Map.of("phoneNumber", phoneNumber, "otp", otp);
        return restTemplate.postForObject(backendUrl + "/verify-otp", otpData, Map.class);
    }

    public Map<String, Object> resetPassword(String email, String newPassword) {
        Map<String, String> resetData = Map.of("email", email, "newPassword", newPassword);
        return restTemplate.postForObject(backendUrl + "/reset-password", resetData, Map.class);
    }
}
