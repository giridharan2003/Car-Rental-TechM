package com.carsystem.app.exception;

@SuppressWarnings("serial")
public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long long1) {
        super("Category not found with id: " + long1);
    }
}
