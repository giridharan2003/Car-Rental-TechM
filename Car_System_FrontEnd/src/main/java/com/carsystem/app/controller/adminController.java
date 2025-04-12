package com.carsystem.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class adminController {
    @GetMapping("/dashboard")
    public String dashboard(){
        return "admin-dashboard";
    }  

    @GetMapping("/management")
    public String carManagement(){
        return "admin-car-management";
    } 

    @GetMapping("/user-management")
    public String UserManagement(){
        return "admin-user-management";
    } 
}
