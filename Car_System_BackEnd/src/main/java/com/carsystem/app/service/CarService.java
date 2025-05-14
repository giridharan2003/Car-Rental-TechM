package com.carsystem.app.service;

import com.carsystem.app.exception.*;
import com.carsystem.app.model.AdditionalService;
import com.carsystem.app.model.Booking;
import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.model.enums.CarStatus;
import com.carsystem.app.repository.AdditionalServiceRepository;
import com.carsystem.app.repository.BookingRepository;
import com.carsystem.app.repository.CarCategoryRepository;
import com.carsystem.app.repository.CarRepository;
import com.carsystem.app.repository.LocationRepository;
import com.carsystem.app.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CarService {

	@Autowired
	private CarRepository carRepository;

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private CarCategoryRepository carCategoryRepository;
	
	@Autowired
	private AdditionalServiceRepository additionalServiceRepository;
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
    private UserRepository userRepository;
	
	
	public List<Car> getCars(){
		return carRepository.findAll();
	}

	public Car getCarById(Long id) {
		return carRepository.findById(id).orElseThrow(() -> new CarNotFoundException("Car Not Found By this ID : " + id));
	}

	public Car addCar(Car car) {
		validateCarData(car);

		CarCategory category = carCategoryRepository.findById(car.getCategory().getCategoryId())
				.orElseThrow(() -> new CategoryNotFoundException(car.getCategory().getCategoryId()));

		Set<Location> locations = null;
		if (car.getAvailableLocations() != null && !car.getAvailableLocations().isEmpty()) {
			locations = car.getAvailableLocations().stream()
					.map(loc -> locationRepository.findById(loc.getLocationId())
							.orElseThrow(() -> new LocationNotFoundException(loc.getLocationId())))
					.collect(Collectors.toSet());
			car.setAvailableLocations(locations);
		}

		car.setCategory(category);
		car.setCreatedAt(LocalDateTime.now());
		car.setUpdatedAt(LocalDateTime.now());

		if (car.getStatus() == null) {
			car.setStatus(CarStatus.AVAILABLE);
		}

		car.setActive(true);

		return carRepository.save(car);
	}

	public Car updateCar(Long id, Car carDetails) {
		Car car = carRepository.findById(id).orElseThrow(() -> new CarNotFoundException("Car Not Found By this ID : " + id));

		if (carDetails.getMake() != null && !carDetails.getMake().isEmpty()) {
			car.setMake(carDetails.getMake());
		}
		if (carDetails.getModel() != null && !carDetails.getModel().isEmpty()) {
			car.setModel(carDetails.getModel());
		}
		if (carDetails.getLicensePlate() != null && !carDetails.getLicensePlate().isEmpty()) {
			car.setLicensePlate(carDetails.getLicensePlate());
		}
		if (carDetails.getDailyRate() != null && carDetails.getDailyRate() > 0) {
			car.setDailyRate(carDetails.getDailyRate());
		}

		if (carDetails.getYear() > 0)
			car.setYear(carDetails.getYear());
		if (carDetails.getSeats() > 0)
			car.setSeats(carDetails.getSeats());
		if (carDetails.getInsurance() != null)
			car.setInsurance(carDetails.getInsurance());
		if (carDetails.getLuggage() >= 0)
			car.setLuggage(carDetails.getLuggage());
		if (carDetails.getMileage() >= 0)
			car.setMileage(carDetails.getMileage());
		if (carDetails.getImageUrl() != null)
			car.setImageUrl(carDetails.getImageUrl());
		if (carDetails.getHourlyRate() != null && carDetails.getHourlyRate() >= 0)
			car.setHourlyRate(carDetails.getHourlyRate());
		if (carDetails.getStatus() != null)
			car.setStatus(carDetails.getStatus());
		if (carDetails.getFuelType() != null)
			car.setFuelType(carDetails.getFuelType());
		if (carDetails.getTransmission() != null)
			car.setTransmission(carDetails.getTransmission());
		if (carDetails.getAdditionalDetails() != null)
			car.setAdditionalDetails(carDetails.getAdditionalDetails());

		if (carDetails.getCategory() != null && carDetails.getCategory().getCategoryId() != null) {
			CarCategory category = carCategoryRepository.findById(carDetails.getCategory().getCategoryId())
					.orElseThrow(() -> new CategoryNotFoundException(carDetails.getCategory().getCategoryId()));
			car.setCategory(category);
		}

		if (carDetails.getAvailableLocations() != null) {
			Set<Location> locations = carDetails.getAvailableLocations().stream()
					.map(loc -> locationRepository.findById(loc.getLocationId())
							.orElseThrow(() -> new LocationNotFoundException(loc.getLocationId())))
					.collect(Collectors.toSet());
			car.setAvailableLocations(locations);
		}

		car.setUpdatedAt(LocalDateTime.now());

		return carRepository.save(car);
	}

	private void validateCarData(Car car) {
		if (car.getMake() == null || car.getMake().isEmpty()) {
			throw new InvalidCarDataException("Car make is required");
		}

		if (car.getModel() == null || car.getModel().isEmpty()) {
			throw new InvalidCarDataException("Car model is required");
		}

		if (car.getCategory() == null || car.getCategory().getCategoryId() == null) {
			throw new InvalidCarDataException("Car category is required");
		}

		if (car.getLicensePlate() == null || car.getLicensePlate().isEmpty()) {
			throw new InvalidCarDataException("License plate is required");
		}

		if (car.getDailyRate() == null || car.getDailyRate() <= 0) {
			throw new InvalidCarDataException("Valid daily rate is required");
		}

		if (car.getHourlyRate() == null || car.getHourlyRate() <= 0) {
			throw new InvalidCarDataException("Valid hourly rate is required");
		}

		if (car.getYear() <= 0) {
			throw new InvalidCarDataException("Car year must be a positive number");
		}

		if (car.getSeats() <= 0) {
			throw new InvalidCarDataException("Seats must be a positive number");
		}

		if (car.getLuggage() < 0) {
			throw new InvalidCarDataException("Luggage capacity cannot be negative");
		}

		if (car.getMileage() < 0) {
			throw new InvalidCarDataException("Mileage cannot be negative");
		}

		if (car.getFuelType() == null || car.getFuelType().isEmpty()) {
			throw new InvalidCarDataException("Fuel type is required");
		}

		if (car.getTransmission() == null || car.getTransmission().isEmpty()) {
			throw new InvalidCarDataException("Transmission type is required");
		}

		if (car.getAvailableLocations() == null || car.getAvailableLocations().isEmpty()) {
			throw new InvalidCarDataException("At least one location is required");
		}
	}
	
	public List<CarCategory> getAllCategories() {
        return carCategoryRepository.findAll();
    }
    
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }
    
    public List<AdditionalService> getAllAdditionalService(){
    	return additionalServiceRepository.findAll();
    }
    
    public List<Booking> getAllBooking(){
    	return bookingRepository.findAll();
    }
    
    public int countBookingsByUserId(Long userId) {
        userRepository.findById(userId).orElseThrow(() -> new CarNotFoundException("User with ID " + userId + " not found"));
        return bookingRepository.countByUserId_UserId(userId);
    }
    
    public List<Booking> getBookingsByUserId(Long userId) {
        userRepository.findById(userId).orElseThrow(() -> new CarNotFoundException("User with ID " + userId + " not found"));
        return bookingRepository.getBookingsByUserId_UserId(userId);
    }
}
