package com.carsystem.app.exception;

@SuppressWarnings("serial")
public class InvalidOtpException extends RuntimeException {
    public InvalidOtpException(String message) {
        super(message);
    }
}