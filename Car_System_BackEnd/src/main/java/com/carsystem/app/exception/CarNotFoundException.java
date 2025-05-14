package com.carsystem.app.exception;

@SuppressWarnings("serial")
public class CarNotFoundException extends RuntimeException {
    public CarNotFoundException(String message) {
        super(message);
    }
}
