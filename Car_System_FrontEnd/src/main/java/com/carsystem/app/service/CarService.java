package com.carsystem.app.service;

import com.carsystem.app.dto.ApiResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CarService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String backendUrl = "http://localhost:2004/api/cars";

    public ApiResponse<?> getCars(String location, String carType, Double priceMin, Double priceMax,
                                  Integer seats, String transmission, Integer luggage, String fuel) {
        StringBuilder url = new StringBuilder(backendUrl);
        boolean firstParam = true;
        if (location != null && !location.isEmpty()) {
            url.append(firstParam ? "?" : "&").append("location=").append(location);
            firstParam = false;
        }
        if (carType != null && !carType.isEmpty()) {
            url.append(firstParam ? "?" : "&").append("carType=").append(carType);
            firstParam = false;
        }
        if (priceMin != null) {
            url.append(firstParam ? "?" : "&").append("priceMin=").append(priceMin);
            firstParam = false;
        }
        if (priceMax != null) {
            url.append(firstParam ? "?" : "&").append("priceMax=").append(priceMax);
            firstParam = false;
        }
        if (seats != null) {
            url.append(firstParam ? "?" : "&").append("seats=").append(seats);
            firstParam = false;
        }
        if (transmission != null && !transmission.isEmpty()) {
            url.append(firstParam ? "?" : "&").append("transmission=").append(transmission);
            firstParam = false;
        }
        if (luggage != null) {
            url.append(firstParam ? "?" : "&").append("luggage=").append(luggage);
            firstParam = false;
        }
        if (fuel != null && !fuel.isEmpty()) {
            url.append(firstParam ? "?" : "&").append("fuel=").append(fuel);
        }
        return restTemplate.getForObject(url.toString(), ApiResponse.class);
    }

    public ApiResponse<?> getCarById(Long id) {
        return restTemplate.getForObject(backendUrl + "/" + id, ApiResponse.class);
    }
}