package com.carsystem.app.controller;

import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.service.CarService;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Car[] getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Car getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }

    @PostMapping("/add")
    @ResponseBody
    public Car addCar(@RequestPart("car") Car car, @RequestPart("image") MultipartFile imageFile) {
        return carService.addCar(car, imageFile);
    }

    @PutMapping("/edit/{id}")
    @ResponseBody
    public Car editCar(@PathVariable Long id, @RequestBody Car car) {
        return carService.editCar(id, car);
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
}