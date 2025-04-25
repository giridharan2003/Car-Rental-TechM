package com.carsystem.app.exception;

@SuppressWarnings("serial")
public class InvalidCarDataException extends RuntimeException {
    public InvalidCarDataException(String message) {
        super(message);
    }
}
