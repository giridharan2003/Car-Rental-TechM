package com.carsystem.app.controller;

import com.carsystem.app.model.Car;
import com.carsystem.app.service.CarService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CarController {

	@Autowired
    private CarService carService;

    @GetMapping("/cars")
    public String getCars(Model model) {
        List<Car> cars = carService.getAllCars();
        model.addAttribute("cars", cars);
        return "home";
    }
}
