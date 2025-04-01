package com.carsystem.app.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service

@SuppressWarnings("unchecked")
public class AuthService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:8081/api/auth";

    public Map<String, Object> login(Map<String, String> loginData) {
        return restTemplate.postForObject(backendUrl + "/login", loginData, Map.class);
    }

    public Map<String, Object> register(Map<String, String> registrationData) {
        return restTemplate.postForObject(backendUrl + "/register", registrationData, Map.class);
    }

    public Map<String, Object> sendOTP(Map<String, String> otpData) {
        return restTemplate.postForObject(backendUrl + "/send-otp", otpData, Map.class);
    }

    public Map<String, Object> verifyOTP(Map<String, String> otpData) {
        return restTemplate.postForObject(backendUrl + "/verify-otp", otpData, Map.class);
    }
   
	public Map<String, Object> resetPassword(Map<String, String> resetData) {
        return restTemplate.postForObject(backendUrl + "/reset-password", resetData, Map.class);
    }
}
