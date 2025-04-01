package com.carsystem.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carsystem.app.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	 User findByEmail(String email);
}
