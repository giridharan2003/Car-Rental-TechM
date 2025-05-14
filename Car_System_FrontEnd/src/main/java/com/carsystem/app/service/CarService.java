package com.carsystem.app.service;

import com.carsystem.app.model.AdditionalService;
import com.carsystem.app.model.Booking;
import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;
import com.carsystem.app.model.User;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CarService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/api/cars";
    private final String adminUrl = "http://localhost:2004/admin";
    private final String userUrl = "http://localhost:2004/user";

    public Car[] getAllCars() {
        return restTemplate.getForObject(backendUrl, Car[].class);
    }

    public Car getCarById(Long id) {
        return restTemplate.getForObject(backendUrl + "/" + id, Car.class);
    }

    public Car addCar(Car car, MultipartFile imageFile) {
        try {
            String make = car.getMake();
            String model = car.getModel();
            String category = String.valueOf(car.getCategory().getCategoryId());

            Path categoryPath = Paths.get("D:/Projects/TechM - Project 2 - Car_Rental_System/Car_System_FrontEnd/src/main/resources/static/assets/cars/", category);

            if (Files.exists(categoryPath)) {
                System.out.println("The path exists.");
            } else {
                System.out.println("The path does not exist.");
            }

            if (!Files.exists(categoryPath)) {
                Files.createDirectories(categoryPath);
            }
            

            String originalFilename = imageFile.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf('.')); // e.g., .jpg, .png
            }

            String fileName = make + "_" + model + extension;
            Path filePath = categoryPath.resolve(fileName);

            imageFile.transferTo(filePath.toFile());

            String imageUrl = "/assets/cars/" + category + "/" + fileName;

            car.setImageUrl(imageUrl);

            return restTemplate.postForObject(backendUrl + "/add", car, Car.class);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image and send car data to backend", e);
        }
    }

    public Car editCar(Long id, Car car) {
        restTemplate.put(backendUrl + "/" + id, car , Car.class);
        return car;
    }

    public CarCategory[] getAllCategory(){
        return restTemplate.getForObject(backendUrl + "/categories", CarCategory[].class);
    }

    public Location[] getAllLocation(){
        return restTemplate.getForObject(backendUrl + "/locations", Location[].class);
    }

    public AdditionalService[] getAllAdditionalService() {
        return restTemplate.getForObject(backendUrl + "/AdditionalService", AdditionalService[].class);
    }

    public Booking carBooking(Booking bookingDetails) {
        System.out.println("Calling backend at port 2004 with booking: " + bookingDetails);
        Booking response = restTemplate.postForObject("http://localhost:2004/user/booking", bookingDetails, Booking.class);
        System.out.println("Response from backend: " + response);
        return response;
    }

    public Booking createBooking(Booking booking) {
        return restTemplate.postForObject(userUrl + "/booking", booking, Booking.class);
    }


    public Booking[] getAllBooking() {
        return restTemplate.getForObject(adminUrl + "/booking", Booking[].class);
    }
    
    public User[] getAllUsers() {
        return restTemplate.getForObject(adminUrl + "/users", User[].class);
    }
    
    public User getUserById(Long userId) {
        return restTemplate.getForObject(adminUrl + "/user/" + userId, User.class);
    }
    
    public Booking[] getBookingsByUserId(Long userId) {
        return restTemplate.getForObject(adminUrl + "/user/" + userId + "/bookings", Booking[].class);
    }
    
    public int countBookingsByUserId(Long userId) {
        return restTemplate.getForObject(adminUrl + "/user/" + userId + "/bookings/count", Integer.class);
    }
}