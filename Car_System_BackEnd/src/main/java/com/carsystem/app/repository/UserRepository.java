package com.carsystem.app.repository;

import com.carsystem.app.model.User;
import com.carsystem.app.model.enums.Roles;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email);

	User findByFirstNameAndUserType(String firstName, Roles userType);

	User findByFirstName(String firstName);
	
	List<User> findUserByUserType(Roles role);
}