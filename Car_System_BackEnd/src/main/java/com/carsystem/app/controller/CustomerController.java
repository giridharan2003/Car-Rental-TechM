package com.carsystem.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.carsystem.app.model.Customer;
import com.carsystem.app.service.CustomerService;

@Controller
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Show Registration Form
    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("customer", new Customer());
        return "register";
    }

    // Process Registration
    @PostMapping("/register")
    public String registerCustomer(@ModelAttribute Customer customer, Model model) {
        customerService.registerCustomer(customer);
        model.addAttribute("message", "Registration Successful! Please login.");
        return "login";
    }

    // Show Login Form
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    // Process Login
    @PostMapping("/login")
    public String loginCustomer(@RequestParam String email, @RequestParam String password, Model model) {
        if (customerService.loginCustomer(email, password)) {
            model.addAttribute("customerName", email);
            return "dashboard"; // Redirect to dashboard
        } else {
            model.addAttribute("error", "Invalid email or password");
            return "login";
        }
    }
}
