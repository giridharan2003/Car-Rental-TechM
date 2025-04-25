package com.carsystem.app.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.carsystem.app.dto.OtpRequest;
import com.carsystem.app.dto.RegisterRequest;
import com.carsystem.app.dto.LoginRequest;
import com.carsystem.app.dto.ResetPasswordRequest;
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

    public void sendOTP(OtpRequest otpRequest) {
        String email = otpRequest.getEmail();
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

    public void verifyOTP(OtpRequest otpRequest) {
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

    public void register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setAdmin(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userRepository.save(user);
    }

    public void login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        // Token is created, but no return. You can store it in the session or elsewhere if needed.
    }

    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }
}
