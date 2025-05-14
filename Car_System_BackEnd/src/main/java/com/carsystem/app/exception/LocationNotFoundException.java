package com.carsystem.app.exception;

@SuppressWarnings("serial")
public class LocationNotFoundException extends RuntimeException {
    public LocationNotFoundException(Long long1) {
        super("Location Not Found " + long1);
    }
}
