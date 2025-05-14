package com.carsystem.app.service;

import com.carsystem.app.exception.*;
import com.carsystem.app.model.*;
import com.carsystem.app.model.enums.BookingStatus;
import com.carsystem.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CarRepository carRepository;

	@Autowired
	private LocationRepository locationRepository;
	
	@Autowired
	private AdditionalServiceRepository additionalServiceRepository;


	public Booking createBooking(Booking booking) {
		Long userId = booking.getUserId().getUserId();
        Long carId = booking.getCarId().getCarId();
        Long pickupId = booking.getPickupLocationId().getLocationId();
        Long dropId = booking.getDropLocationId().getLocationId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with this ID : " + userId));

        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new CarNotFoundException("Car not found with this ID : " + carId));

        Location pickup = locationRepository.findById(pickupId)
                .orElseThrow(() -> new LocationNotFoundException(pickupId));

        Location drop = locationRepository.findById(dropId)
                .orElseThrow(() -> new LocationNotFoundException(dropId));

        if (booking.getPickUpDatetime() == null || booking.getDropDatetime() == null ||
            booking.getPickUpDatetime().isAfter(booking.getDropDatetime())) {
            throw new InvalidCarDataException("Invalid pickup or drop datetime");
        }

        // Fetch additional services if present
        List<AdditionalService> serviceList = new ArrayList<>();
        if (booking.getAdditionalService() != null) {
            for (AdditionalService service : booking.getAdditionalService()) {
                Long id = service.getServiceId();
                AdditionalService found = additionalServiceRepository.findById(id)
                        .orElseThrow(() -> new InvalidCarDataException("Additional service not found: " + id));
                serviceList.add(found);
            }
        }

        booking.setUserId(user);
        booking.setCarId(car);
        booking.setPickupLocationId(pickup);
        booking.setDropLocationId(drop);
        booking.setAdditionalService(serviceList);
        booking.setStatus(BookingStatus.PENDING); // Default status
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
	}
}
