package com.carsystem.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.carsystem.app.model.Booking;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.model.User;
import com.carsystem.app.service.CarService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private CarService carService;
    
    @GetMapping("/dashboard")
    public String dashboard(){
        return "admin-dashboard";
    }  

    @GetMapping("/management")
    public String carManagement( Model model) {
        CarCategory[] categories = carService.getAllCategory();
        Location[] locations = carService.getAllLocation();
        model.addAttribute("locations", locations);
        model.addAttribute("categories", categories);
        return "admin-car-management";
    }

    @GetMapping("/user-management")
    public String UserManagement(@CookieValue("admintoken") String token, Model model){
        User[] users = carService.getAllUsers(token);
        model.addAttribute("Users", users);
        return "admin-user-management";
    }

    @GetMapping("/transactions")
    public String transactions(){
        return "admin-transaction";
    }

    @GetMapping("user/{id}/bookings/count")
    public ResponseEntity<Integer> userBookingCount(@CookieValue("admintoken") String token, @PathVariable Long id){
        int count = carService.countBookingsByUserId(id, token);
        return ResponseEntity.ok(count);
    }

    @GetMapping("user/{id}/bookings")
    public ResponseEntity<Booking[]> getUserBookings(@CookieValue("admintoken") String token, @PathVariable Long id){
        Booking[] bookings = carService.getBookingsByUserId(id, token);
        return ResponseEntity.ok(bookings);
    }


    @GetMapping("/user/{id}")
	public User getUser(@PathVariable("id") Long userId ,@CookieValue("admintoken") String token) {
		return carService.getUserById(userId, token);
	}

	@GetMapping("/{userId}/active")
    @ResponseBody
	public String carActive(@PathVariable("userId") Long id, @CookieValue("admintoken") String token) {
        System.out.println("reached");
		return carService.carActive(id, token);
		
	}
	
	@GetMapping("/{userId}/inactive")
    @ResponseBody
	public String carInActive(@PathVariable("userId") Long id, @CookieValue("admintoken") String token) {
		System.out.println("inactive reached");
        return carService.carInActive(id, token);
	}
}
