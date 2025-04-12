package com.carsystem.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class UserController {
    
    @GetMapping("/booking")
    public String booking(){
        return "booking";
    }
    
}
