package com.carsystem.app.controller;

import com.carsystem.app.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
        return "index";
    }

    @PostMapping("/login")
    @ResponseBody
    public Map<String, Object> login(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Assuming the AuthService returns a Map for success/failure and the token
        Map<String, Object> result = authService.login(username, password);

        if ((Boolean) result.get("success")) {
            String token = (String) result.get("data");
            Cookie jwtCookie = new Cookie("jwt", token);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setPath("/");
            response.addCookie(jwtCookie);
        }

        return result;  // Directly return the result as a Map
    }

    @PostMapping("/register")
    @ResponseBody
    public Map<String, Object> register(@RequestBody Map<String, String> registrationData) {
        String username = registrationData.get("username");
        String password = registrationData.get("password");
        String email = registrationData.get("email");

        Map<String, Object> result = authService.register(username, password, email);
        return result;  // Return the result as a Map
    }

    @PostMapping("/send-otp")
    @ResponseBody
    public Map<String, Object> sendOTP(@RequestBody Map<String, String> otpData) {
        String phoneNumber = otpData.get("phoneNumber");

        Map<String, Object> result = authService.sendOTP(phoneNumber);
        return result;  // Return the result as a Map
    }

    @PostMapping("/verify-otp")
    @ResponseBody
    public Map<String, Object> verifyOTP(@RequestBody Map<String, String> otpData) {
        String phoneNumber = otpData.get("phoneNumber");
        String otp = otpData.get("otp");

        Map<String, Object> result = authService.verifyOTP(phoneNumber, otp);
        return result;  // Return the result as a Map
    }

    @PostMapping("/reset-password")
    @ResponseBody
    public Map<String, Object> resetPassword(@RequestBody Map<String, String> resetData) {
        String email = resetData.get("email");
        String newPassword = resetData.get("newPassword");

        Map<String, Object> result = authService.resetPassword(email, newPassword);
        return result;  // Return the result as a Map
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
