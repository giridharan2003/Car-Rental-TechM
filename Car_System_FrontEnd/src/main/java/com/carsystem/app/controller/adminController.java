package com.carsystem.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.carsystem.app.model.CarCategory;
import com.carsystem.app.service.CarService;

@Controller
@RequestMapping("/admin")
public class adminController {

    @Autowired
    private CarService carService;
    
    @GetMapping("/dashboard")
    public String dashboard(){
        return "admin-dashboard";
    }  

    @GetMapping("/management")
    public String carManagement(Model model) {
        CarCategory[] categories = carService.getAllCategory();
        model.addAttribute("categories", categories);
        return "admin-car-management";
    }

    @GetMapping("/user-management")
    public String UserManagement(){
        return "admin-user-management";
    } 

    @GetMapping("/transactions")
    public String transactions(){
        return "admin-transaction";
    } 
}
