package com.carsystem.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carsystem.app.model.AdditionalService;

public interface AdditionalServiceRepository extends JpaRepository<AdditionalService, Long> {

}
