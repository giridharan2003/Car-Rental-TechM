package com.carsystem.app.controller;

import com.carsystem.app.model.AdditionalService;
import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

	@Autowired
	private CarService carService;

	// USER and ADMIN Methods
	@GetMapping
	public List<Car> getCars() {
		return carService.getCars();
	}

	@GetMapping("/{id}")
	public Car getCarById(@PathVariable Long id) {
		return carService.getCarById(id);
	}

	@GetMapping("/categories")
	public List<CarCategory> getAllCategories() {
		return carService.getAllCategories();
	}

	@GetMapping("/locations")
	public List<Location> getAllLocations() {
		return carService.getAllLocations();
	}
	
	@GetMapping("/AdditionalService")
	public List<AdditionalService> getAllAdditionalService() {
		return carService.getAllAdditionalService();
	}

	// ADMIN Only Methods
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/add")
	public Car addCar(@RequestBody Car car) {
		return carService.addCar(car);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public Car updateCar(@PathVariable Long id, @RequestBody Car car) {
		return carService.updateCar(id, car);
	}
}