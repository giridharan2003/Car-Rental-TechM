package com.carsystem.app.repository;

import com.carsystem.app.model.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {

	int countByUserId_UserId(Long user);
	
	List<Booking> getBookingsByUserId_UserId(Long user);
}
