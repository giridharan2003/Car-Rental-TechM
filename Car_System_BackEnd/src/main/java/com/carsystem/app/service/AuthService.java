package com.carsystem.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carsystem.app.model.User;
import com.carsystem.app.repository.UserRepository;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
	
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private Map<String, String> otpStore = new HashMap<>();
    private Map<String, LocalDateTime> otpExpirationStore = new HashMap<>();

    private String generateOTP() {
        SecureRandom random = new SecureRandom();
        int otp = random.nextInt(999999);
        return String.format("%06d", otp);
    }

    public Map<String, Object> sendOTP(Map<String, String> otpData) {
        Map<String, Object> response = new HashMap<>();
        String email = otpData.get("email");

        String otp = generateOTP();

        StringBuilder htmlBody = new StringBuilder();
        htmlBody.append("<html><body>");
        htmlBody.append("<h3>Your OTP is: </h3>");
        htmlBody.append("<p>").append(otp).append("</p>");
        htmlBody.append("<p>This OTP will expire in 5 minutes.</p>");
        htmlBody.append("</body></html>");

        try {
            otpStore.put(email, otp);
            otpExpirationStore.put(email, LocalDateTime.now().plusMinutes(5));

            emailService.sendEmail(email, "Your OTP Code", htmlBody);

            response.put("status", "success");
            response.put("message", "OTP sent to your email");
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("message", "Failed to send OTP: " + e.getMessage());
        }

        return response;
    }

    public Map<String, Object> verifyOTP(Map<String, String> otpData) {
        Map<String, Object> response = new HashMap<>();
        String email = otpData.get("email");
        String enteredOtp = otpData.get("otp");

        String storedOtp = otpStore.get(email);
        LocalDateTime expirationTime = otpExpirationStore.get(email);

        if (storedOtp == null || expirationTime == null) {
            response.put("status", "failure");
            response.put("message", "OTP not found or expired");
        } else if (expirationTime.isBefore(LocalDateTime.now())) {
            otpStore.remove(email);
            otpExpirationStore.remove(email);
            response.put("status", "failure");
            response.put("message", "OTP has expired");
        } else if (storedOtp.equals(enteredOtp)) {
            otpStore.remove(email);
            otpExpirationStore.remove(email);
            response.put("status", "success");
            response.put("message", "OTP verified successfully");
        } else {
            response.put("status", "failure");
            response.put("message", "Invalid OTP");
        }

        return response;
    }

    public Map<String, Object> register(Map<String, String> registrationData) {
        Map<String, Object> response = new HashMap<>();
        String email = registrationData.get("email");
        String password = registrationData.get("password");
        String firstName = registrationData.get("firstName");
        String lastName = registrationData.get("lastName");
        String phone = registrationData.get("phone");
        String address = registrationData.get("address");

        if (userRepository.findByEmail(email) != null) {
            response.put("status", "failure");
            response.put("message", "Email already exists");
        } else {
            User user = new User();
            user.setEmail(email);
            user.setPassword(password);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setPhone(phone);
            user.setAddress(address);
            user.setAdmin(false);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());

            userRepository.save(user);

            response.put("status", "success");
            response.put("message", "Registration successful");
        }

        return response;
    }

    public Map<String, Object> login(Map<String, String> loginData) {
        Map<String, Object> response = new HashMap<>();
        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            response.put("status", "success");
            response.put("message", "Login successful");
        } else {
            response.put("status", "failure");
            response.put("message", "Invalid username or password");
        }
        return response;
    }

    public Map<String, Object> resetPassword(Map<String, String> resetData) {
        Map<String, Object> response = new HashMap<>();
        String email = resetData.get("email");
        String newPassword = resetData.get("newPassword");

        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(newPassword);
            user.setUpdatedAt(LocalDateTime.now());
            userRepository.save(user);

            response.put("status", "success");
            response.put("message", "Password reset successful");
        } else {
            response.put("status", "failure");
            response.put("message", "User not found");
        }

        return response;
    }
}
