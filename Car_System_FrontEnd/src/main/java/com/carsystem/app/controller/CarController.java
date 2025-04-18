package com.carsystem.app.controller;

import com.carsystem.app.dto.ApiResponse;
import com.carsystem.app.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping
    public ApiResponse<?> getCars(
        @RequestParam(required = false) String location,
        @RequestParam(required = false) String carType,
        @RequestParam(required = false) Double priceMin,
        @RequestParam(required = false) Double priceMax,
        @RequestParam(required = false) Integer seats,
        @RequestParam(required = false) String transmission,
        @RequestParam(required = false) Integer luggage,
        @RequestParam(required = false) String fuel,
        @RequestParam(required = false, defaultValue = "1") Integer page,
        @RequestParam(required = false, defaultValue = "9") Integer size
    ) {
        return carService.getCars(location, carType, priceMin, priceMax, seats, transmission, luggage, fuel);
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }
}