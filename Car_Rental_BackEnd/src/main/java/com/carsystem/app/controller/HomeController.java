package com.carsystem.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.carsystem.app.service.CarService;

@Controller
public class HomeController {

	@Autowired
    private CarService carService;

    @GetMapping
    public String home(Model model) {
        model.addAttribute("cars", carService.getAllCars());
        return "home";
    }
}
