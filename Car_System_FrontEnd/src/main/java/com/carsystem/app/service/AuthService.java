package com.carsystem.app.service;

import com.carsystem.app.model.User;
import com.carsystem.app.util.RestUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AuthService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/api/auth";

    public ResponseEntity<Map<String, Object>> login(User user) {
        Map<String, String> loginData = Map.of(
            "email", user.getEmail(), 
            "password", user.getPassword()
        );
        return RestUtil.postForEntityHandlingErrors(restTemplate, backendUrl + "/login", loginData);
    }

    public ResponseEntity<Map<String, Object>> register(User user) {
        Map<String, String> registrationData = Map.of(
            "password", user.getPassword(),
            "email", user.getEmail(),
            "firstName", user.getFirstName(),
            "lastName", user.getLastName(),
            "phone", user.getPhone(),
            "address", user.getAddress()
        );
        return RestUtil.postForEntityHandlingErrors(restTemplate, backendUrl + "/register", registrationData);
    }

    public ResponseEntity<Map<String, Object>> sendOTP(User user) {
        return RestUtil.postForEntityHandlingErrors(restTemplate, backendUrl + "/send-otp", user);
    }

    public ResponseEntity<Map<String, Object>> verifyOTP(String email, String otp) {
        Map<String, String> otpData = Map.of(
            "email", email,
            "otp", otp
        );
        return RestUtil.postForEntityHandlingErrors(restTemplate, backendUrl + "/verify-otp", otpData);
    }

    public ResponseEntity<Map<String, Object>> resetPassword(String email, String newPassword) {
        Map<String, String> resetData = Map.of(
            "email", email,
            "newPassword", newPassword
        );
        return RestUtil.postForEntityHandlingErrors(restTemplate, backendUrl + "/reset-password", resetData);
    }

    public ResponseEntity<Map<String, Object>> adminLogin(User user) {
        Map<String, String> loginData = Map.of(
            "firstName", user.getFirstName(),
            "password", user.getPassword()
        );
        return RestUtil.postForEntityHandlingErrors(restTemplate, backendUrl + "/admin/login", loginData);
    }

    public ResponseEntity<Map<String, Object>> adminRegister(User user) {
        Map<String, String> registrationData = Map.of(
            "firstName", user.getFirstName(),
            "password", user.getPassword(),
            "userType", "ADMIN"
        );
        return RestUtil.postForEntityHandlingErrors(restTemplate, backendUrl + "/admin/register", registrationData);
    }

    
}