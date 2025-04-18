package com.carsystem.app.repository;

import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c FROM Car c " +
           "WHERE (:location IS NULL OR :location MEMBER OF c.availableLocations) " +
           "AND (:category IS NULL OR c.category = :category) " +
           "AND (:priceMin IS NULL OR c.dailyRate >= :priceMin) " +
           "AND (:priceMax IS NULL OR c.dailyRate <= :priceMax) " +
           "AND (:seats IS NULL OR c.seats >= :seats) " +
           "AND (:transmission IS NULL OR c.transmission = :transmission) " +
           "AND (:luggage IS NULL OR c.luggage >= :luggage) " +
           "AND (:fuel IS NULL OR c.fuelType = :fuel)")
    List<Car> findByFilters(
        @Param("location") Location location,
        @Param("category") CarCategory category,
        @Param("priceMin") Double priceMin,
        @Param("priceMax") Double priceMax,
        @Param("seats") Integer seats,
        @Param("transmission") String transmission,
        @Param("luggage") Integer luggage,
        @Param("fuel") String fuel
    );
}