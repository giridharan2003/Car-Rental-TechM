 // Internal JSON data for cars (27 cars for 3 pages)
 const carsData = [
    {
        name: "Toyota Camry",
        category: "Sedan",
        image: "/assests/cars/luxury/camry.webp",
        price_usd: 45,
        price_inr: 45 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "coimbatore", "madurai", "trichy", "salem"],
        model: "Camry SE 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Includes GPS, insurance, and 24/7 roadside assistance."
    },
    {
        name: "Honda CR-V",
        category: "SUV",
        image: "/assests/cars/suv/hyryder.webp",
        price_usd: 65,
        price_inr: 65 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "6 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "erode", "tirunelveli"],
        model: "CR-V EX-L 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 6,
        additionalDetails: "Features all-wheel drive and premium audio system."
    },
    {
        name: "BMW 5 Series",
        category: "Luxury",
        image: "/assests/cars/luxury/5series.webp",
        price_usd: 120,
        price_inr: 120 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "coimbatore", "vellore"],
        model: "530i xDrive 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Luxury package with leather seats and navigation."
    },
    {
        name: "Tesla Model 3",
        category: "Electric",
        image: "/assests/cars/ev/windsorev.webp",
        price_usd: 95,
        price_inr: 95 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "3 Bags" },
            { icon: "fas fa-bolt", text: "Electric" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "madurai", "salem"],
        model: "Model 3 Long Range 2023",
        fuelType: "Electric",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 3,
        additionalDetails: "Includes Tesla Supercharger access."
    },
    {
        name: "Porsche 911",
        category: "Sports",
        image: "/assests/cars/luxury/cooper.webp",
        price_usd: 250,
        price_inr: 250 * 83,
        features: [
            { icon: "fas fa-user", text: "2 Seats" },
            { icon: "fas fa-suitcase", text: "2 Bags" },
            { icon: "fas fa-gas-pump", text: "Petrol" },
            { icon: "fas fa-cog", text: "Manual" }
        ],
        locations: ["chennai", "coimbatore"],
        model: "911 Carrera 2022",
        fuelType: "Petrol",
        transmission: "Manual",
        seatingCapacity: 2,
        luggageCapacity: 2,
        additionalDetails: "High-performance sports car with premium interior."
    },
    {
        name: "Ford Mustang",
        category: "Sports",
        image: "/assests/cars/hatchback/i20.webp",
        price_usd: 180,
        price_inr: 180 * 83,
        features: [
            { icon: "fas fa-user", text: "4 Seats" },
            { icon: "fas fa-suitcase", text: "2 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["madurai", "trichy"],
        model: "Mustang GT 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 4,
        luggageCapacity: 2,
        additionalDetails: "Includes sport suspension and touchscreen infotainment."
    },
    {
        name: "Mercedes-Benz E-Class",
        category: "Luxury",
        image: "/assests/cars/luxury/cclass.webp",
        price_usd: 140,
        price_inr: 140 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "salem"],
        model: "E 350 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Features ambient lighting and advanced safety systems."
    },
    {
        name: "Jeep Wrangler",
        category: "SUV",
        image: "/assests/cars/suv/meridian.webp",
        price_usd: 85,
        price_inr: 85 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "5 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["coimbatore", "erode"],
        model: "Wrangler Sahara 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 5,
        additionalDetails: "Off-road capable with removable roof."
    },
    {
        name: "Nissan Leaf",
        category: "Electric",
        image: "/assests/cars/hatchback/glanza.webp",
        price_usd: 80,
        price_inr: 80 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "3 Bags" },
            { icon: "fas fa-bolt", text: "Electric" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["madurai", "tirunelveli"],
        model: "Leaf SV 2023",
        fuelType: "Electric",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 3,
        additionalDetails: "Eco-friendly with fast charging support."
    },
    // Page 2
    {
        name: "Chevrolet Camaro",
        category: "Sports",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 200,
        price_inr: 200 * 83,
        features: [
            { icon: "fas fa-user", text: "4 Seats" },
            { icon: "fas fa-suitcase", text: "2 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "vellore"],
        model: "Camaro SS 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 4,
        luggageCapacity: 2,
        additionalDetails: "Muscle car with powerful V8 engine."
    },
    {
        name: "Hyundai Sonata",
        category: "Sedan",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 50,
        price_inr: 50 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["coimbatore", "thoothukudi"],
        model: "Sonata SEL 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Comfortable sedan with fuel efficiency."
    },
    {
        name: "Audi Q7",
        category: "SUV",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 100,
        price_inr: 100 * 83,
        features: [
            { icon: "fas fa-user", text: "7 Seats" },
            { icon: "fas fa-suitcase", text: "6 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "trichy"],
        model: "Q7 Premium Plus 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 7,
        luggageCapacity: 6,
        additionalDetails: "Spacious SUV with advanced driver assistance."
    },
    {
        name: "Lexus RX 350",
        category: "Luxury",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 130,
        price_inr: 130 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "5 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["madurai", "salem"],
        model: "RX 350 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 5,
        additionalDetails: "Luxury crossover with hybrid option available."
    },
    {
        name: "Volkswagen ID.4",
        category: "Electric",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 90,
        price_inr: 90 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-bolt", text: "Electric" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "erode"],
        model: "ID.4 Pro 2023",
        fuelType: "Electric",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Electric SUV with long-range battery."
    },
    {
        name: "Dodge Challenger",
        category: "Sports",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 210,
        price_inr: 210 * 83,
        features: [
            { icon: "fas fa-user", text: "4 Seats" },
            { icon: "fas fa-suitcase", text: "2 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["coimbatore", "tirunelveli"],
        model: "Challenger R/T 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 4,
        luggageCapacity: 2,
        additionalDetails: "Classic American muscle car design."
    },
    {
        name: "Kia Optima",
        category: "Sedan",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 55,
        price_inr: 55 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["madurai", "vellore"],
        model: "Optima EX 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Stylish sedan with modern tech features."
    },
    {
        name: "Subaru Outback",
        category: "SUV",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 75,
        price_inr: 75 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "5 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "thoothukudi"],
        model: "Outback Limited 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 5,
        additionalDetails: "Rugged SUV with all-terrain capability."
    },
    {
        name: "Jaguar F-Type",
        category: "Sports",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 230,
        price_inr: 230 * 83,
        features: [
            { icon: "fas fa-user", text: "2 Seats" },
            { icon: "fas fa-suitcase", text: "2 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["coimbatore", "salem"],
        model: "F-Type R 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 2,
        luggageCapacity: 2,
        additionalDetails: "High-performance coupe with sleek design."
    },
    // Page 3
    {
        name: "Cadillac Escalade",
        category: "Luxury",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 160,
        price_inr: 160 * 83,
        features: [
            { icon: "fas fa-user", text: "7 Seats" },
            { icon: "fas fa-suitcase", text: "6 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "madurai"],
        model: "Escalade Premium 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 7,
        luggageCapacity: 6,
        additionalDetails: "Full-size luxury SUV with advanced tech."
    },
    {
        name: "Toyota Prius",
        category: "Electric",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 70,
        price_inr: 70 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-bolt", text: "Hybrid" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["trichy", "vellore"],
        model: "Prius XLE 2022",
        fuelType: "Hybrid",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Fuel-efficient hybrid with eco mode."
    },
    {
        name: "Mazda CX-5",
        category: "SUV",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 80,
        price_inr: 80 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "5 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "erode"],
        model: "CX-5 Touring 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 5,
        additionalDetails: "Compact SUV with sporty handling."
    },
    {
        name: "Nissan Altima",
        category: "Sedan",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 60,
        price_inr: 60 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["coimbatore", "tirunelveli"],
        model: "Altima SR 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Reliable sedan with comfortable ride."
    },
    {
        name: "Lamborghini Huracan",
        category: "Sports",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 300,
        price_inr: 300 * 83,
        features: [
            { icon: "fas fa-user", text: "2 Seats" },
            { icon: "fas fa-suitcase", text: "2 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "madurai"],
        model: "Huracan EVO 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 2,
        luggageCapacity: 2,
        additionalDetails: "Supercar with exceptional performance."
    },
    {
        name: "Volvo XC90",
        category: "Luxury",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 150,
        price_inr: 150 * 83,
        features: [
            { icon: "fas fa-user", text: "7 Seats" },
            { icon: "fas fa-suitcase", text: "6 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["coimbatore", "salem"],
        model: "XC90 Inscription 2023",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 7,
        luggageCapacity: 6,
        additionalDetails: "Premium SUV with top safety ratings."
    },
    {
        name: "Ford Escape",
        category: "SUV",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 70,
        price_inr: 70 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "5 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["madurai", "thoothukudi"],
        model: "Escape SEL 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 5,
        additionalDetails: "Versatile SUV with hybrid option."
    },
    {
        name: "Chevrolet Bolt EV",
        category: "Electric",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 85,
        price_inr: 85 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "3 Bags" },
            { icon: "fas fa-bolt", text: "Electric" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["chennai", "vellore"],
        model: "Bolt EV LT 2023",
        fuelType: "Electric",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 3,
        additionalDetails: "Compact electric with impressive range."
    },
    {
        name: "Honda Accord",
        category: "Sedan",
        image: "https://cdnjs.cloudflare.com/ajax/libs/placeholder-images/0.1.0/img/placeholder-horizontal.webp",
        price_usd: 55,
        price_inr: 55 * 83,
        features: [
            { icon: "fas fa-user", text: "5 Seats" },
            { icon: "fas fa-suitcase", text: "4 Bags" },
            { icon: "fas fa-gas-pump", text: "Gasoline" },
            { icon: "fas fa-cog", text: "Automatic" }
        ],
        locations: ["coimbatore", "trichy"],
        model: "Accord Touring 2022",
        fuelType: "Gasoline",
        transmission: "Automatic",
        seatingCapacity: 5,
        luggageCapacity: 4,
        additionalDetails: "Spacious sedan with hybrid variant."
    }
];

// Pagination settings
const carsPerPage = 9;
let currentPage = 1;
let filteredCars = [...carsData];

// Function to render car cards
function renderCarCards(cars, page) {
    const carListings = document.getElementById('car-listings');
    carListings.innerHTML = '';

    const start = (page - 1) * carsPerPage;
    const end = start + carsPerPage;
    const paginatedCars = cars.slice(start, end);

    paginatedCars.forEach(car => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <img src="${car.image}" alt="${car.name}" class="car-image">
            <div class="car-details">
                <div class="car-name">${car.name}</div>
                <div class="car-category">${car.category}</div>
                <div class="car-features">
                    ${car.features.map(feature => `
                        <div class="feature">
                            <i class="${feature.icon}"></i> ${feature.text}
                        </div>
                    `).join('')}
                </div>
                <div class="car-price">₹${car.price_inr.toLocaleString('en-IN')} <span>/ day</span></div>
                <div class="car-buttons">
                    <button class="book-btn">Book Now</button>
                    <button class="details-btn" data-car='${JSON.stringify(car)}'>Details</button>
                </div>
            </div>
        `;
        carListings.appendChild(carCard);
    });

    // Add event listeners to details buttons
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const car = JSON.parse(btn.getAttribute('data-car'));
            showModal(car);
        });
    });

    renderPagination(cars.length);
}

// Function to render pagination
function renderPagination(totalCars) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalCars / carsPerPage);

    const prevItem = document.createElement('div');
    prevItem.className = 'page-item prev';
    prevItem.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevItem.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderCarCards(filteredCars, currentPage);
        }
    });
    pagination.appendChild(prevItem);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.textContent = i;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            renderCarCards(filteredCars, currentPage);
        });
        pagination.appendChild(pageItem);
    }

    const nextItem = document.createElement('div');
    nextItem.className = 'page-item next';
    nextItem.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextItem.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCarCards(filteredCars, currentPage);
        }
    });
    pagination.appendChild(nextItem);
}

// Function to show modal with car details
function showModal(car) {
    const modal = document.getElementById('car-details-modal');
    const modalHeader = document.getElementById('modal-header');
    const modalBody = document.getElementById('modal-body');

    modalHeader.textContent = `${car.name} Details`;
    modalBody.innerHTML = `
        <p><strong>Vehicle Model:</strong> ${car.model}</p>
        <p><strong>Category:</strong> ${car.category}</p>
        <p><strong>Fuel Type:</strong> ${car.fuelType}</p>
        <p><strong>Transmission:</strong> ${car.transmission}</p>
        <p><strong>Seating Capacity:</strong> ${car.seatingCapacity}</p>
        <p><strong>Luggage Capacity:</strong> ${car.luggageCapacity} Bags</p>
        <p><strong>Rental Price:</strong> ₹${car.price_inr.toLocaleString('en-IN')} / day</p>
        <p><strong>Available Locations:</strong> ${car.locations.map(loc => loc.charAt(0).toUpperCase() + loc.slice(1)).join(', ')}</p>
        <p><strong>Additional Details:</strong> ${car.additionalDetails}</p>
    `;

    modal.style.display = 'flex';

    document.getElementById('modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Filter and search functionality
const filterForm = document.getElementById('filter-form');
filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(filterForm);
    const filters = {
        location: formData.get('location'),
        pickupDate: formData.get('pickup-date'),
        returnDate: formData.get('return-date'),
        carType: formData.get('car-type'),
        priceMin: parseInt(formData.get('price-min')) || 0,
        priceMax: parseInt(formData.get('price-max')) || Infinity
    };

    filteredCars = carsData.filter(car => {
        let matches = true;

        if (filters.location && !car.locations.includes(filters.location)) {
            matches = false;
        }

        if (filters.carType && car.category.toLowerCase() !== filters.carType) {
            matches = false;
        }

        if (car.price_inr < filters.priceMin || car.price_inr > filters.priceMax) {
            matches = false;
        }

        if (filters.pickupDate && filters.returnDate) {
            const pickup = new Date(filters.pickupDate);
            const returnDate = new Date(filters.returnDate);
            if (pickup > returnDate) {
                matches = false;
            }
        }

        return matches;
    });

    currentPage = 1;
    renderCarCards(filteredCars, currentPage);
});

// Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Package Scroll Functionality
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const packagesContainer = document.querySelector('.packages-container');

if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        packagesContainer.scrollBy({ left: -330, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', () => {
        packagesContainer.scrollBy({ left: 330, behavior: 'smooth' });
    });
}

// Form Validation for Dates
const pickupDateInput = document.getElementById('pickup-date');
const returnDateInput = document.getElementById('return-date');

if (pickupDateInput && returnDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', today);
    
    pickupDateInput.addEventListener('change', () => {
        returnDateInput.setAttribute('min', pickupDateInput.value);
        
        if (returnDateInput.value && returnDateInput.value < pickupDateInput.value) {
            returnDateInput.value = pickupDateInput.value;
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderCarCards(filteredCars, currentPage);
});