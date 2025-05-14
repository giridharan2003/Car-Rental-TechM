package com.carsystem.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

import com.carsystem.app.model.AdditionalService;
import com.carsystem.app.model.Car;
import com.carsystem.app.service.CarService;


@Controller
public class UserController {

    @Autowired
    private CarService carService;
    
    @GetMapping("/booking")
    public String booking(Model model){
        Car[] cars = carService.getAllCars();
        model.addAttribute("cars", cars);
        return "booking";
    }

    @GetMapping("/conformation")
    public String conformation(@RequestParam Long carId, Model model){
        Car car = carService.getCarById(carId);
        AdditionalService[] services = carService.getAllAdditionalService();
        model.addAttribute("services", services);
        model.addAttribute("car", car);
        return "conformation";
    }
}
