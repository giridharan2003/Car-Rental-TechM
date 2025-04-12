package com.carsystem.app.repository;

import com.carsystem.app.model.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Otp findByEmail(String email);
}