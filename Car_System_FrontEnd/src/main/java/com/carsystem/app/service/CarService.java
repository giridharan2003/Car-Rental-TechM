package com.carsystem.app.service;

import com.carsystem.app.model.Car;
import com.carsystem.app.model.CarCategory;
import com.carsystem.app.model.Location;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CarService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/api/cars";

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
}