package com.carsystem.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carsystem.app.model.Customer;
import com.carsystem.app.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public void registerCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    public boolean loginCustomer(String email, String password) {
        Customer customer = customerRepository.findByEmail(email);
        return customer != null && customer.getPassword().equals(password);
    }
}
