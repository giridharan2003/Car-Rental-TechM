package com.carsystem.app.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.carsystem.app.model.enums.PaymentMethod;
import com.carsystem.app.model.enums.PaymentStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "payments")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long paymentId;

	@ManyToOne
	@JoinColumn(name = "booking_id", nullable = false)
	private Booking booking;

	private Double amount;

	@Enumerated(EnumType.STRING)
	private PaymentMethod paymentMethod;

	private String transactionId;

	@Enumerated(EnumType.STRING)
	private PaymentStatus status;

	private LocalDateTime paymentDate;
}
