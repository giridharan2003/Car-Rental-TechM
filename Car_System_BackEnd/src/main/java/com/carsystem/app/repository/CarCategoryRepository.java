package com.carsystem.app.repository;

import com.carsystem.app.model.CarCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarCategoryRepository extends JpaRepository<CarCategory, Long> {
    Optional<CarCategory> findByName(String name);
}