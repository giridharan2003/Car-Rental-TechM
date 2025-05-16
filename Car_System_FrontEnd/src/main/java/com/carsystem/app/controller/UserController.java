package com.carsystem.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;

import com.carsystem.app.model.AdditionalService;
import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.model.User;
import com.carsystem.app.service.CarService;

@Controller
public class UserController {

    @Autowired
    private CarService carService;


    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/profile")
    public String userProfile() {
        return "UserProfile";
    }

    @GetMapping("/booking")
    public String booking(Model model) {
    Car[] cars = carService.getAllCars();
    CarCategory[] categories = carService.getAllCategory();
    Location[] locations = carService.getAllLocation();
    model.addAttribute("locations", locations);
    model.addAttribute("categories", categories);
    model.addAttribute("cars", cars);

    return "booking";
    }

    @GetMapping("/conformation")
    public String conformation(@CookieValue("carId") Long carId, @CookieValue("token") String token, Model model) {
        Car car = carService.getCarById(carId);
        AdditionalService[] services = carService.getAllAdditionalService();
        User user = carService.userByToken(token);
        model.addAttribute("user", user);
        model.addAttribute("services", services);
        model.addAttribute("car", car);
        return "conformation";
    }

    @GetMapping("/userDetails")
    @ResponseBody
    public User userByToken(@CookieValue("token") String token){
        return carService.userByToken(token);
    }

    @GetMapping("/valid/token")
    @ResponseBody
    public User isTokenVaild(@CookieValue("token") String token){
        return carService.userByToken(token);
    }
}