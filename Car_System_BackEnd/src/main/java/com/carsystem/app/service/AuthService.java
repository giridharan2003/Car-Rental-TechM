package com.carsystem.app.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.carsystem.app.exception.InvalidCredentialsException;
import com.carsystem.app.exception.InvalidOtpException;
import com.carsystem.app.exception.UserAlreadyExistsException;
import com.carsystem.app.exception.UserNotFoundException;
import com.carsystem.app.model.Otp;
import com.carsystem.app.model.User;
import com.carsystem.app.repository.OtpRepository;
import com.carsystem.app.repository.UserRepository;
import com.carsystem.app.util.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private String generateOTP() {
        SecureRandom random = new SecureRandom();
        int otp = random.nextInt(999999);
        return String.format("%06d", otp);
    }

    public void sendOTP(String oldemail) {
    	String email = oldemail.trim(); 

        String otp = generateOTP();

        StringBuilder htmlBody = new StringBuilder();
        htmlBody.append("<html><body>");
        htmlBody.append("<h3>Your OTP is: </h3>");
        htmlBody.append("<p>").append(otp).append("</p>");
        htmlBody.append("<p>This OTP will expire in 5 minutes.</p>");
        htmlBody.append("</body></html>");

        try {
            Otp otpEntity = otpRepository.findByEmail(email);
            if (otpEntity == null) {
                otpEntity = new Otp();
                otpEntity.setEmail(email);
            }
            otpEntity.setOtp(otp);
            otpEntity.setCreatedAt(LocalDateTime.now());
            otpEntity.setExpiresAt(LocalDateTime.now().plusMinutes(5));
            otpRepository.save(otpEntity);

            emailService.sendEmail(email, "Your OTP Code", htmlBody);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP: " + e.getMessage());
        }
    }

    public void verifyOTP(Otp otpRequest) {
        String email = otpRequest.getEmail();
        String enteredOtp = otpRequest.getOtp();

        Otp otpEntity = otpRepository.findByEmail(email);
        if (otpEntity == null) {
            throw new InvalidOtpException("OTP not found");
        }
        if (otpEntity.getExpiresAt().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otpEntity);
            throw new InvalidOtpException("OTP has expired");
        }
        if (!otpEntity.getOtp().equals(enteredOtp)) {
            throw new InvalidOtpException("Invalid OTP");
        }

        otpRepository.delete(otpEntity);
    }

    public void register(User newUser) {
        if (userRepository.findByEmail(newUser.getEmail()) != null) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setAdmin(false);
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setUpdatedAt(LocalDateTime.now());

        userRepository.save(newUser);
    }

    public String login(User loginUser) {
        User user = userRepository.findByEmail(loginUser.getEmail());
        if (user == null || !passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        return jwtUtil.generateToken(user.getEmail());
    }

    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }
}
