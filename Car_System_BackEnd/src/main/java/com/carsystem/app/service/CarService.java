package com.carsystem.app.service;

import com.carsystem.app.dto.ApiResponse;
import com.carsystem.app.exception.ResourceNotFoundException;
import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.repository.CarCategoryRepository;
import com.carsystem.app.repository.CarRepository;
import com.carsystem.app.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private CarCategoryRepository carCategoryRepository;

    public ApiResponse<List<Car>> getCars(String locationName, String carType, Double priceMin, Double priceMax,
                                          Integer seats, String transmission, Integer luggage, String fuel) {
        Location location = locationName != null && !locationName.isEmpty() ?
            locationRepository.findByName(locationName)
                .orElse(null) : null;

        CarCategory category = carType != null && !carType.isEmpty() ?
            carCategoryRepository.findByName(carType)
                .orElse(null) : null;

        List<Car> cars = carRepository.findByFilters(
            location,
            category,
            priceMin,
            priceMax,
            seats,
            transmission != null && !transmission.isEmpty() ? transmission : null,
            luggage,
            fuel != null && !fuel.isEmpty() ? fuel : null
        );

        return new ApiResponse<>(true, "Cars retrieved successfully", cars);
    }

    public ApiResponse<Car> getCarById(Long id) {
        Car car = carRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Car not found with id: " + id));
        return new ApiResponse<>(true, "Car retrieved successfully", car);
    }
}