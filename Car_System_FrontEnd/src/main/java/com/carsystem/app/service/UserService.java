package com.carsystem.app.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.carsystem.app.model.Car;

@Service
public class UserService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/user";

    public Car[] getAllCars() {
        return restTemplate.getForObject(backendUrl, Car[].class);
    }
}
