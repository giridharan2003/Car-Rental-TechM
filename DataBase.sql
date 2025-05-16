create database carrentalsystem;
drop database carrentalsystem;
use carrentalsystem;
show tables;
select * from user;
select * from car;
desc car;
DESCRIBE user;
desc bookings;
select * from booking;
SHOW CREATE TABLE cars;
desc additional_services;
select * from additional_service;

INSERT INTO car_category (name) VALUES
('Sedan'),
('SUV'),
('Luxury'),
('Sports'),
('Electric');

INSERT INTO location (name) VALUES
('Karuppur, Salem'),
('Hasthampatti, Salem'),
('RS Puram, Coimbatore'),
('Saibaba Colony, Coimbatore'),
('Anna Nagar, Chennai'),
('T. Nagar, Chennai'),
('KK Nagar, Trichy'),
('Srirangam, Trichy'),
('KK Nagar, Madurai'),
('Thirunagar, Madurai'),
('Palayamkottai, Tirunelveli'),
('Melapalayam, Tirunelveli'),
('Gandhinagar, Vellore'),
('Katpadi, Vellore'),
('Tuticorin Port Area, Thoothukudi'),
('Muthiahpuram, Thoothukudi'),
('Erode Fort, Erode'),
('Veerappanchatram, Erode'),
('Gugai, Salem'),
('Alagapuram, Salem'),
('Peelamedu, Coimbatore'),
('Gandhipuram, Coimbatore'),
('Tambaram, Chennai'),
('Velachery, Chennai'),
('K. Kallupatti, Madurai');


INSERT INTO car (make, model, year, seats, category_id, license_plate, insurance, luggage, mileage, image_url, daily_rate, hourly_rate, status, created_at, updated_at, fuel_type, transmission, additional_details, is_active) VALUES
('Toyota', 'Camry', 2023, 5, 1, 'TN01AB1234', 'INS123', 4, 15000, '/assets/cars/sedan/toyota_camry.jpg', 3735, 200, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Includes GPS, insurance, and 24/7 roadside assistance.', TRUE),
('Honda', 'CR-V', 2022, 5, 2, 'TN02CD5678', 'INS456', 6, 20000, '/assets/cars/suv/honda_cr-v.jpg', 5395, 250, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Features all-wheel drive and premium audio system.', TRUE),
('BMW', '5 Series', 2023, 5, 3, 'TN03EF9012', 'INS789', 4, 10000, '/assets/cars/luxury/bmw_5series.jpg', 9960, 400, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Luxury package with leather seats and navigation.', TRUE),
('Tesla', 'Model 3', 2023, 5, 5, 'TN04GH3456', 'INS101', 3, 12000, '/assets/cars/electric/tesla_model3.webp', 7885, 350, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Electric', 'Automatic', 'Includes Tesla Supercharger access.', TRUE),
('Porsche', '911', 2022, 2, 4, 'TN05IJ7890', 'INS102', 2, 8000, '/assets/cars/sports/porsche_911.webp', 20750, 800, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Petrol', 'Manual', 'High-performance sports car with premium interior.', TRUE),
('Ford', 'Mustang', 2023, 4, 4, 'TN06KL1234', 'INS103', 2, 9000, '/assets/cars/sports/ford_mustang.jpg', 14940, 600, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Includes sport suspension and touchscreen infotainment.', TRUE),
('Mercedes-Benz', 'E-Class', 2023, 5, 3, 'TN07MN5678', 'INS104', 4, 11000, '/assets/cars/luxury/mercedes-benz_e-class.jpg', 11620, 450, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Features ambient lighting and advanced safety systems.', TRUE),
('Jeep', 'Wrangler', 2022, 5, 2, 'TN08OP9012', 'INS105', 5, 18000, '/assets/cars/suv/jeep_wrangler.jpg', 7055, 300, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Off-road capable with removable roof.', TRUE),
('Nissan', 'Leaf', 2023, 5, 5, 'TN09QR3456', 'INS106', 3, 13000, '/assets/cars/electric/nissan_leaf.jpg', 6640, 280, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Electric', 'Automatic', 'Eco-friendly with fast charging support.', TRUE),
('Chevrolet', 'Camaro', 2023, 4, 4, 'TN10ST7890', 'INS107', 2, 9500, '/assets/cars/sports/chevrolet_camaro.jpg', 16600, 650, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Muscle car with powerful V8 engine.', TRUE),
('Hyundai', 'Elantra', 2022, 5, 1, 'TN11UV1234', 'INS108', 4, 14000, '/assets/cars/sedan/hyundai_elantra.jpg', 2950, 180, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Automatic', 'Comfortable city sedan with modern safety features.', TRUE),
('Kia', 'Seltos', 2023, 5, 2, 'TN12WX5678', 'INS109', 5, 12000, '/assets/cars/suv/kia_seltos.jpg', 4890, 220, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Gasoline', 'Manual', 'Sporty compact SUV with sunroof and reverse camera.', TRUE),
('Audi', 'A6', 2023, 5, 3, 'TN13YZ9012', 'INS110', 4, 8000, '/assets/cars/luxury/audi_a6.jpg', 10200, 410, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Diesel', 'Automatic', 'Executive class with virtual cockpit and adaptive cruise.', TRUE),
('BMW', 'Z4', 2022, 2, 4, 'TN14AB3456', 'INS111', 2, 6000, '/assets/cars/sports/bmw_z4.jpg', 17900, 700, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Petrol', 'Manual', 'Roadster with retractable hardtop and sport mode.', TRUE),
('MG', 'ZS EV', 2023, 5, 5, 'TN15CD7890', 'INS112', 3, 7500, '/assets/cars/electric/mg_zsev.jpg', 5900, 300, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Electric', 'Automatic', 'Smart electric SUV with AI assistant and panoramic sunroof.', TRUE),
('Volkswagen', 'Virtus', 2023, 5, 1, 'TN16EF1234', 'INS113', 4, 5000, '/assets/cars/sedan/volkswagen_virtus.jpg', 3100, 200, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Petrol', 'Automatic', 'Stylish sedan with turbo engine and wireless Android Auto.', TRUE),
('Land Rover', 'Discovery', 2022, 7, 2, 'TN17GH5678', 'INS114', 6, 17000, '/assets/cars/suv/landrover_discovery.jpg', 6900, 320, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Diesel', 'Automatic', 'Luxury SUV with terrain response system.', TRUE),
('Jaguar', 'I-PACE', 2023, 5, 5, 'TN18IJ9012', 'INS115', 4, 8500, '/assets/cars/electric/jaguar_ipace.jpg', 9900, 380, 'AVAILABLE', '2025-04-17 10:00:00', '2025-04-17 10:00:00', 'Electric', 'Automatic', 'High-performance EV with luxurious interior.', TRUE);

INSERT INTO car_available_locations (car_car_id, available_locations_location_id) VALUES
(1, 4), (1, 7), (1, 12),
(2, 5), (2, 9),
(3, 1), (3, 6), (3, 8),
(4, 3), (4, 11),
(5, 2), (5, 10), (5, 13),
(6, 1), (6, 3), 
(7, 4), (7, 7), 
(8, 6), (8, 15),
(9, 1), (9, 2), 
(10, 5), (10, 14), 
(11, 8), (11, 9), (11, 13),
(12, 4), (12, 12), 
(13, 1), (13, 11), 
(14, 6), (14, 10), 
(15, 2), (15, 9), (15, 15),
(16, 3), (16, 7),
(17, 5), (17, 8), (17, 14),
(18, 1), (18, 4), (18, 6);


INSERT INTO additional_service (name, description, price, is_active) VALUES
('GPS Navigation', 'In-car GPS system with real-time traffic updates.', 499.00, TRUE),
('Child Seat', 'Safety-approved seat suitable for children under 5 years.', 299.00, TRUE),
('Additional Driver', 'Authorize a second driver during the rental period.', 599.00, TRUE),
('Roadside Assistance', 'Emergency support service for breakdowns or flat tires.', 349.00, TRUE),
('Wi-Fi Hotspot', 'Portable Wi-Fi with unlimited internet access.', 399.00, TRUE),
('Collision Damage Waiver', 'Covers repair costs in case of collision or accident.', 1199.00, TRUE);

INSERT INTO user (password, email, first_name, last_name, phone, address, user_type, created_at, updated_at) VALUES
('admin', NULL, 'admin', NULL, NULL, NULL, 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);