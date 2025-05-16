package com.carsystem.app.controller;

import com.carsystem.app.model.AdditionalService;
import com.carsystem.app.model.Booking;
import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.service.CarService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping("")
    @ResponseBody
    public Car[] getAllCars(String authHeader) {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Car getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }

    @PostMapping("/add")
    @ResponseBody
    public Car addCar(@CookieValue("token") String token, @RequestPart("car") Car car, @RequestPart("image") MultipartFile imageFile) {
        return carService.addCar(car, imageFile, token);
    }

    @PutMapping("/edit/{id}")
    @ResponseBody
    public Car editCar(@CookieValue("token") String token, @PathVariable Long id, @RequestBody Car car) {
        return carService.editCar(id, car, token);
    }

    @GetMapping("/categories")
    @ResponseBody
    public CarCategory[] getCategories() {
        return carService.getAllCategory();
    }

    @GetMapping("/locations")
    @ResponseBody
    public Location[] getlocations() {
        return carService.getAllLocation();
    }

    @GetMapping("/AdditionalService")
    @ResponseBody
    public AdditionalService[] getAllAdditionalService(){
        return carService.getAllAdditionalService();
    }

    @PostMapping("/user/booking/{paymentId}")
    public ResponseEntity<Booking> createBooking(@CookieValue("token") String token, @RequestBody Booking booking, @PathVariable String paymentId) {
        booking.setPaymentId(paymentId);
        Booking createdBooking = carService.createBooking(booking, token);
        return ResponseEntity.status(201).body(createdBooking);
    }
}