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

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CarService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    private final HttpHeaders headers = new HttpHeaders();
    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/api/cars";
    private final String adminUrl = "http://localhost:2004/admin";
    private final String userUrl = "http://localhost:2004/user";

    public Car[] getAllCars() {
        ResponseEntity<Car[]> response = restTemplate.getForEntity(backendUrl, Car[].class);
        return response.getBody();
    }

    public Car getCarById(Long id) {
        ResponseEntity<Car> response = restTemplate.getForEntity(backendUrl + "/" + id, Car.class);
        return response.getBody();
    }

    public CarCategory[] getAllCategory() {
        ResponseEntity<CarCategory[]> response = restTemplate.getForEntity(backendUrl + "/categories", CarCategory[].class);
        return response.getBody();
    }

    public Location[] getAllLocation() {
        ResponseEntity<Location[]> response = restTemplate.getForEntity(backendUrl + "/locations", Location[].class);
        return response.getBody();
    }

    public AdditionalService[] getAllAdditionalService() {
        ResponseEntity<AdditionalService[]> response = restTemplate.getForEntity(backendUrl + "/AdditionalService", AdditionalService[].class);
        return response.getBody();
    }

    public User getUserById(Long userId, String token) {
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<User> response = restTemplate.exchange(
                adminUrl + "/user/" + userId,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                User.class
        );
        return response.getBody();
    }

    public User userByToken(String token) {
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<User> response = restTemplate.exchange(
                userUrl + "/user-info",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                User.class
        );
        return response.getBody();
    }

    public Boolean isTokenVaild(String token) {
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<Boolean> response = restTemplate.exchange(
                userUrl + "/vaild/token",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Boolean.class
        );
        return response.getBody();
    }

    public Car addCar(Car car, MultipartFile imageFile, String token) {
        try {
            String make = car.getMake();
            String model = car.getModel();
            String category = String.valueOf(car.getCategory().getCategoryId());

            

            Path categoryPath = Paths.get(uploadDir, category);

            if (!Files.exists(categoryPath)) {
                Files.createDirectories(categoryPath);
            }

            String originalFilename = imageFile.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            }

            String fileName = make + "_" + model + extension;
            Path filePath = categoryPath.resolve(fileName);

            imageFile.transferTo(filePath.toFile());

            String imageUrl = "/assets/cars/" + category + "/" + fileName;
            car.setImageUrl(imageUrl);

            headers.set("Authorization", "Bearer " + token);
            HttpEntity<Car> requestEntity = new HttpEntity<>(car, headers);
            return restTemplate.postForObject(backendUrl + "/add", requestEntity, Car.class);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image and send car data to backend", e);
        }
    }

    public Car editCar(Long id, Car car, String token) {
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<Car> requestEntity = new HttpEntity<>(car, headers);
        restTemplate.exchange(
                backendUrl + "/" + id,
                HttpMethod.PUT,
                requestEntity,
                Car.class
        );
        return car;
    }

    public Booking carBooking(Booking bookingDetails, String token) {
        System.out.println("Calling backend at port 2004 with booking: " + bookingDetails);
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<Booking> requestEntity = new HttpEntity<>(bookingDetails, headers);
        Booking response = restTemplate.postForObject(userUrl + "/booking", requestEntity, Booking.class);
        System.out.println("Response from backend: " + response);
        return response;
    }

    public Booking createBooking(Booking booking, String token) {
        headers.set("Authorization", "Bearer " + token);
        HttpEntity<Booking> requestEntity = new HttpEntity<>(booking, headers);
        return restTemplate.postForObject(userUrl + "/booking", requestEntity, Booking.class);
    }

    public Booking[] getAllBooking(String token) {
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<Booking[]> response = restTemplate.exchange(
                adminUrl + "/booking",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Booking[].class
        );
        return response.getBody();
    }

    public User[] getAllUsers(String token) {
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<User[]> response = restTemplate.exchange(
                adminUrl + "/users",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                User[].class
        );
        return response.getBody();
    }

    public Booking[] getBookingsByUserId(Long userId, String token) {
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<Booking[]> response = restTemplate.exchange(
                adminUrl + "/user/" + userId + "/bookings",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Booking[].class
        );
        return response.getBody();
    }

    public Integer countBookingsByUserId(Long userId, String token) {
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<Integer> response = restTemplate.exchange(
                adminUrl + "/user/" + userId + "/bookings/count",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Integer.class
        );
        return response.getBody();
    }


    public String carActive(Long userId, String token){
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<String> response = restTemplate.exchange(
                adminUrl + "/" + userId + "/active",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class
        );
        return response.getBody();
    }

    public String carInActive(Long userId, String token){
        headers.set("Authorization", "Bearer " + token);
        ResponseEntity<String> response = restTemplate.exchange(
                adminUrl + "/" + userId + "/inactive",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class
        );
        return response.getBody();
    }
}
