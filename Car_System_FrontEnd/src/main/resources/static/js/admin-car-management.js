// Sample car data with seats and location
let cars = [
    {
        id: 1,
        model: "Hyundai Creta",
        price: 2500,
        type: "suv",
        seats: 5,
        mileage: 15,
        transmission: "automatic",
        city: "chennai",
        area: "Anna Nagar",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 2,
        model: "Mahindra XUV700",
        price: 3000,
        type: "suv",
        seats: 7,
        mileage: 14,
        transmission: "manual",
        city: "coimbatore",
        area: "Gandhipuram",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 3,
        model: "Maruti Suzuki Swift",
        price: 1800,
        type: "hatchback",
        seats: 5,
        mileage: 22,
        transmission: "manual",
        city: "madurai",
        area: "Tallakulam",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/110815/swift-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 4,
        model: "Honda City",
        price: 2200,
        type: "sedan",
        seats: 5,
        mileage: 18,
        transmission: "automatic",
        city: "salem",
        area: "New Bus Stand",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/54349/city-exterior-right-front-three-quarter-148156.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 5,
        model: "Tata Nexon",
        price: 2300,
        type: "suv",
        seats: 5,
        mileage: 17,
        transmission: "automatic",
        city: "tiruchirappalli",
        area: "Bharathidasan Road",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-8.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 6,
        model: "Toyota Fortuner",
        price: 4500,
        type: "premium",
        seats: 7,
        mileage: 12,
        transmission: "automatic",
        city: "tirunelveli",
        area: "Palayamkottai",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/161815/fortuner-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 7,
        model: "Kia Seltos",
        price: 2600,
        type: "suv",
        seats: 5,
        mileage: 16,
        transmission: "automatic",
        city: "chennai",
        area: "T Nagar",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45242/seltos-exterior-right-front-three-quarter-148154.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 8,
        model: "Hyundai i20",
        price: 1900,
        type: "hatchback",
        seats: 5,
        mileage: 20,
        transmission: "manual",
        city: "coimbatore",
        area: "RS Puram",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/110823/i20-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 9,
        model: "Tata Altroz",
        price: 2000,
        type: "hatchback",
        seats: 5,
        mileage: 19,
        transmission: "manual",
        city: "madurai",
        area: "Koodal Nagar",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40445/altroz-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 10,
        model: "Toyota Innova Crysta",
        price: 3500,
        type: "premium",
        seats: 7,
        mileage: 13,
        transmission: "automatic",
        city: "salem",
        area: "Four Roads",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40474/innova-crysta-exterior-right-front-three-quarter-77.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 11,
        model: "MG Hector",
        price: 2800,
        type: "suv",
        seats: 5,
        mileage: 14,
        transmission: "automatic",
        city: "tiruchirappalli",
        area: "Woraiyur",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40415/hector-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 12,
        model: "Maruti Suzuki Baleno",
        price: 1850,
        type: "hatchback",
        seats: 5,
        mileage: 21,
        transmission: "manual",
        city: "tirunelveli",
        area: "Melapalayam",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45270/baleno-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 13,
        model: "Honda Amaze",
        price: 2100,
        type: "sedan",
        seats: 5,
        mileage: 18,
        transmission: "manual",
        city: "chennai",
        area: "Adyar",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40401/amaze-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 14,
        model: "Hyundai Verna",
        price: 2400,
        type: "sedan",
        seats: 5,
        mileage: 17,
        transmission: "automatic",
        city: "coimbatore",
        area: "Saravanampatti",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/54351/verna-exterior-right-front-three-quarter-148155.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 15,
        model: "Skoda Slavia",
        price: 2700,
        type: "sedan",
        seats: 5,
        mileage: 16,
        transmission: "automatic",
        city: "madurai",
        area: "Villapuram",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/117183/slavia-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 16,
        model: "Toyota Glanza",
        price: 1950,
        type: "hatchback",
        seats: 5,
        mileage: 20,
        transmission: "manual",
        city: "salem",
        area: "Fairlands",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40478/glanza-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 17,
        model: "Mahindra Thar",
        price: 3200,
        type: "suv",
        seats: 4,
        mileage: 15,
        transmission: "manual",
        city: "tiruchirappalli",
        area: "Srirangam",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40433/thar-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 18,
        model: "Tata Punch",
        price: 2050,
        type: "suv",
        seats: 5,
        mileage: 18,
        transmission: "manual",
        city: "tirunelveli",
        area: "Thachanallur",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/117185/punch-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 19,
        model: "Kia Carens",
        price: 2900,
        type: "suv",
        seats: 7,
        mileage: 16,
        transmission: "automatic",
        city: "chennai",
        area: "Velachery",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/117181/carens-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 20,
        model: "Volkswagen Taigun",
        price: 2650,
        type: "suv",
        seats: 5,
        mileage: 17,
        transmission: "automatic",
        city: "coimbatore",
        area: "Peelamedu",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/117187/taigun-exterior-right-front-three-quarter-3.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 21,
        model: "BMW 3 Series",
        price: 7500,
        type: "luxury",
        seats: 5,
        mileage: 14,
        transmission: "automatic",
        city: "chennai",
        area: "Nungambakkam",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40412/3-series-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 22,
        model: "Mercedes-Benz C-Class",
        price: 8000,
        type: "luxury",
        seats: 5,
        mileage: 13,
        transmission: "automatic",
        city: "coimbatore",
        area: "Race Course",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40419/c-class-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 23,
        model: "Audi A4",
        price: 7800,
        type: "luxury",
        seats: 5,
        mileage: 14,
        transmission: "automatic",
        city: "chennai",
        area: "Alwarpet",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40404/a4-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 24,
        model: "Tata Tigor EV",
        price: 3100,
        type: "electric",
        seats: 5,
        mileage: 315, // km per charge
        transmission: "automatic",
        city: "madurai",
        area: "K.K. Nagar",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40447/tigor-ev-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    },
    {
        id: 25,
        model: "MG ZS EV",
        price: 3800,
        type: "electric",
        seats: 5,
        mileage: 419, // km per charge
        transmission: "automatic",
        city: "salem",
        area: "Hasthampatti",
        image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40416/zs-ev-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80",
        hidden: false
    }
];

// Sample package data
let packages = [
    {
        id: 1,
        name: "City Explorer",
        type: "economy",
        description: "Perfect for city commuting with fuel-efficient cars",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dailyPrice: 1500,
        weeklyPrice: 8500,
        monthlyPrice: 30000,
        includedCars: [1, 3, 8, 12, 16],
        features: {
            insurance: true,
            maintenance: false,
            roadside: true,
            delivery: false
        },
        hidden: false
    },
    {
        id: 2,
        name: "Family Adventure",
        type: "premium",
        description: "Spacious SUVs for family trips and adventures",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dailyPrice: 3000,
        weeklyPrice: 18000,
        monthlyPrice: 65000,
        includedCars: [2, 5, 7, 11, 19],
        features: {
            insurance: true,
            maintenance: true,
            roadside: true,
            delivery: true
        },
        hidden: false
    },
    {
        id: 3,
        name: "Executive Comfort",
        type: "luxury",
        description: "Premium luxury vehicles for business and comfort",
        image: "https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dailyPrice: 7000,
        weeklyPrice: 40000,
        monthlyPrice: 150000,
        includedCars: [21, 22, 23],
        features: {
            insurance: true,
            maintenance: true,
            roadside: true,
            delivery: true
        },
        hidden: false
    },
    {
        id: 4,
        name: "Eco-Friendly",
        type: "economy",
        description: "Electric vehicles for environmentally conscious customers",
        image: "https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dailyPrice: 2500,
        weeklyPrice: 14000,
        monthlyPrice: 50000,
        includedCars: [24, 25],
        features: {
            insurance: true,
            maintenance: false,
            roadside: true,
            delivery: false
        },
        hidden: false
    },
    {
        id: 5,
        name: "Weekend Getaway",
        type: "premium",
        description: "Premium vehicles for your weekend trips",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        dailyPrice: 3500,
        weeklyPrice: 20000,
        monthlyPrice: 75000,
        includedCars: [6, 10, 17, 20],
        features: {
            insurance: true,
            maintenance: true,
            roadside: true,
            delivery: true
        },
        hidden: false
    }
];

// Location data structure
let locations = {
    "chennai": ["Anna Nagar", "T Nagar", "Adyar", "Velachery", "Nungambakkam", "Alwarpet"],
    "coimbatore": ["Gandhipuram", "RS Puram", "Saravanampatti", "Peelamedu", "Race Course"],
    "madurai": ["Tallakulam", "Koodal Nagar", "Villapuram", "K.K. Nagar"],
    "salem": ["New Bus Stand", "Four Roads", "Hasthampatti", "Fairlands"],
    "tiruchirappalli": ["Bharathidasan Road", "Woraiyur", "Srirangam"],
    "tirunelveli": ["Palayamkottai", "Melapalayam", "Thachanallur"]
};

// City names mapping for display
const cityNames = {
    "chennai": "Chennai",
    "coimbatore": "Coimbatore",
    "madurai": "Madurai",
    "salem": "Salem",
    "tiruchirappalli": "Tiruchirappalli",
    "tirunelveli": "Tirunelveli"
};

// Type colors mapping
const typeColors = {
    "sedan": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "suv": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "hatchback": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "premium": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "luxury": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    "electric": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
};

// Package type colors
const packageTypeColors = {
    "economy": "package-economy",
    "premium": "package-premium",
    "luxury": "package-luxury"
};

// Check for saved theme preference or use preferred color scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark');
}

// Initialize the page with all cars
document.addEventListener('DOMContentLoaded', function() {
    renderCars(cars);
    renderPackages(packages);
    populateLocationFilters();
    
    // Set up event listeners for add buttons
    document.getElementById('addCarBtn').addEventListener('click', openAddModal);
    document.getElementById('addPackageBtn').addEventListener('click', openAddPackageModal);
    document.getElementById('manageLocationsBtn').addEventListener('click', openLocationManagementModal);
    
    // Add scroll animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    // Observe all car and package cards
    document.querySelectorAll('.car-card, .package-card').forEach(card => {
        observer.observe(card);
    });
});

// Populate location filters in all dropdowns
function populateLocationFilters() {
    const locationFilters = [
        document.getElementById('locationFilter'),
        document.getElementById('carCity'),
        document.getElementById('editCarCity')
    ];
    
    locationFilters.forEach(filter => {
        if (filter) {
            filter.innerHTML = '';
            
            // Add default option
            if (filter.id === 'locationFilter') {
                const defaultOption = document.createElement('option');
                defaultOption.value = 'all';
                defaultOption.textContent = 'All Locations';
                filter.appendChild(defaultOption);
            }
            
            // Add city options
            for (const city in locations) {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = cityNames[city] || capitalizeFirstLetter(city);
                filter.appendChild(option);
            }
        }
    });
}

// Switch between cars and packages tabs
function switchTab(tab) {
    if (tab === 'cars') {
        document.getElementById('cars-section').classList.remove('hidden');
        document.getElementById('packages-section').classList.add('hidden');
        document.getElementById('addCarBtn').classList.remove('hidden');
        document.getElementById('addPackageBtn').classList.add('hidden');
        document.getElementById('manageLocationsBtn').classList.remove('hidden');
        
        // Update tab styling
        document.querySelectorAll('.tab').forEach(t => {
            if (t.textContent === 'Cars') {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    } else if (tab === 'packages') {
        document.getElementById('cars-section').classList.add('hidden');
        document.getElementById('packages-section').classList.remove('hidden');
        document.getElementById('addCarBtn').classList.add('hidden');
        document.getElementById('addPackageBtn').classList.remove('hidden');
        document.getElementById('manageLocationsBtn').classList.add('hidden');
        
        // Update tab styling
        document.querySelectorAll('.tab').forEach(t => {
            if (t.textContent === 'Packages') {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    }
}

// Render cars to the page
function renderCars(carsToRender) {
    const container = document.getElementById('cars-container');
    container.innerHTML = '';
    
    if (carsToRender.length === 0) {
        container.innerHTML = '<p class="text-gray-600 col-span-3 text-center py-10 dark:text-gray-300">No cars found matching your filters.</p>';
        return;
    }
    
    carsToRender.forEach((car) => {
        const carCard = document.createElement('div');
        carCard.className = `car-card bg-white p-0 rounded-lg shadow hover:shadow-lg transition-all ${car.hidden ? 'hidden-car' : ''}`;
        
        carCard.innerHTML = `
            <div class="car-image-container">
                <img src="${car.image}" alt="${car.model}" class="car-image">
                <span class="car-type-badge ${typeColors[car.type]}">${capitalizeFirstLetter(car.type)}</span>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h2 class="text-xl font-semibold">${car.model}</h2>
                    <p class="text-lg font-bold text-purple-600 dark:text-purple-400">₹${car.price.toLocaleString()}</p>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <div class="flex items-center">
                        <i class="fas fa-users mr-2 text-gray-500 dark:text-gray-400"></i>
                        <span class="text-gray-600 dark:text-gray-300">${car.seats} Seats</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-tachometer-alt mr-2 text-gray-500 dark:text-gray-400"></i>
                        <span class="text-gray-600 dark:text-gray-300">${car.mileage} ${car.type === 'electric' ? 'km/charge' : 'km/l'}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-cog mr-2 text-gray-500 dark:text-gray-400"></i>
                        <span class="text-gray-600 dark:text-gray-300">${capitalizeFirstLetter(car.transmission)}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-map-marker-alt mr-2 text-gray-500 dark:text-gray-400"></i>
                        <span class="text-gray-600 dark:text-gray-300">${cityNames[car.city] || capitalizeFirstLetter(car.city)}</span>
                    </div>
                </div>
                <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Available at:</p>
                    <p class="text-sm text-gray-600 dark:text-gray-200">${car.area}</p>
                </div>
                <div class="mt-4 flex justify-between space-x-3">
                    <button class="edit-btn px-4 py-2 text-white rounded-lg flex-1 flex items-center justify-center ${car.hidden ? 'opacity-50 cursor-not-allowed' : ''}" 
                            ${car.hidden ? 'disabled' : ''} onclick="${car.hidden ? '' : `openEditModal(${car.id})`}">
                        <i class="fas fa-edit mr-2"></i>
                        Edit
                    </button>
                    <button class="${car.hidden ? 'unhide-btn' : 'hide-btn'} px-4 py-2 text-white rounded-lg flex-1 flex items-center justify-center" 
                            onclick="toggleCarVisibility(${car.id})">
                        <i class="fas ${car.hidden ? 'fa-eye' : 'fa-eye-slash'} mr-2"></i>
                        ${car.hidden ? 'Unhide' : 'Hide'}
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(carCard);
    });

    // Reinitialize intersection observers for new cards
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.car-card').forEach(card => {
            observer.observe(card);
        });
    }, 50);
}

// Render packages to the page
function renderPackages(packagesToRender) {
    const container = document.getElementById('packages-container');
    container.innerHTML = '';
    
    if (packagesToRender.length === 0) {
        container.innerHTML = '<p class="text-gray-600 col-span-3 text-center py-10 dark:text-gray-300">No packages found matching your filters.</p>';
        return;
    }
    
    packagesToRender.forEach((pkg) => {
        const packageCard = document.createElement('div');
        packageCard.className = `package-card bg-white p-0 rounded-lg shadow hover:shadow-lg transition-all ${pkg.hidden ? 'hidden-package' : ''}`;
        
        // Get included car models
        const includedCarModels = cars.filter(car => pkg.includedCars.includes(car.id)).map(car => car.model).join(', ');
        
        packageCard.innerHTML = `
            <div class="package-image-container">
                <img src="${pkg.image}" alt="${pkg.name}" class="package-image">
                <span class="package-type-badge ${packageTypeColors[pkg.type]}">${capitalizeFirstLetter(pkg.type)}</span>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h2 class="text-xl font-semibold">${pkg.name}</h2>
                    <div>
                        <span class="duration-badge duration-daily">Daily: ₹${pkg.dailyPrice.toLocaleString()}</span>
                        <span class="duration-badge duration-weekly">Weekly: ₹${pkg.weeklyPrice.toLocaleString()}</span>
                        <span class="duration-badge duration-monthly">Monthly: ₹${pkg.monthlyPrice.toLocaleString()}</span>
                    </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mb-3">${pkg.description}</p>
                
                <div class="mb-3">
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Included Cars:</p>
                    <p class="text-sm text-gray-600 dark:text-gray-200 truncate" title="${includedCarModels}">${includedCarModels}</p>
                </div>
                
                <div class="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Features:</p>
                    <ul class="text-sm text-gray-600 dark:text-gray-200 list-disc list-inside">
                        ${pkg.features.insurance ? '<li>Insurance Included</li>' : ''}
                        ${pkg.features.maintenance ? '<li>Free Maintenance</li>' : ''}
                        ${pkg.features.roadside ? '<li>24/7 Roadside Assistance</li>' : ''}
                        ${pkg.features.delivery ? '<li>Free Delivery</li>' : ''}
                    </ul>
                </div>
                
                <div class="mt-4 flex justify-between space-x-3">
                    <button class="edit-btn px-4 py-2 text-white rounded-lg flex-1 flex items-center justify-center ${pkg.hidden ? 'opacity-50 cursor-not-allowed' : ''}" 
                            ${pkg.hidden ? 'disabled' : ''} onclick="${pkg.hidden ? '' : `openEditPackageModal(${pkg.id})`}">
                        <i class="fas fa-edit mr-2"></i>
                        Edit
                    </button>
                    <button class="${pkg.hidden ? 'unhide-btn' : 'hide-btn'} px-4 py-2 text-white rounded-lg flex-1 flex items-center justify-center" 
                            onclick="togglePackageVisibility(${pkg.id})">
                        <i class="fas ${pkg.hidden ? 'fa-eye' : 'fa-eye-slash'} mr-2"></i>
                        ${pkg.hidden ? 'Unhide' : 'Hide'}
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(packageCard);
    });

    // Reinitialize intersection observers for new cards
    setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.package-card').forEach(card => {
            observer.observe(card);
        });
    }, 50);
}

// Filter cars based on type and location
function filterCars() {
    const typeFilter = document.getElementById('filter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    let filteredCars = [...cars];
    
    if (typeFilter !== 'all') {
        filteredCars = filteredCars.filter(car => car.type === typeFilter);
    }
    
    if (locationFilter !== 'all') {
        filteredCars = filteredCars.filter(car => car.city === locationFilter);
    }
    
    renderCars(filteredCars);
}

// Filter packages based on type and duration
function filterPackages() {
    const typeFilter = document.getElementById('packageTypeFilter').value;
    const durationFilter = document.getElementById('packageDurationFilter').value;
    
    let filteredPackages = [...packages];
    
    if (typeFilter !== 'all') {
        filteredPackages = filteredPackages.filter(pkg => pkg.type === typeFilter);
    }
    
    // For duration, we'll filter based on whether the price exists for that duration
    if (durationFilter !== 'all') {
        filteredPackages = filteredPackages.filter(pkg => {
            switch(durationFilter) {
                case 'daily': return pkg.dailyPrice > 0;
                case 'weekly': return pkg.weeklyPrice > 0;
                case 'monthly': return pkg.monthlyPrice > 0;
                default: return true;
            }
        });
    }
    
    renderPackages(filteredPackages);
}

// Open add car modal
function openAddModal() {
    document.getElementById('addCarModal').style.display = 'block';
    document.getElementById('addCarForm').reset();
}

// Open edit car modal
function openEditModal(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return;
    
    document.getElementById('editCarId').value = car.id;
    document.getElementById('editCarModel').value = car.model;
    document.getElementById('editCarPrice').value = car.price;
    document.getElementById('editCarType').value = car.type;
    document.getElementById('editCarSeats').value = car.seats;
    document.getElementById('editCarMileage').value = car.mileage;
    document.getElementById('editCarTransmission').value = car.transmission;
    document.getElementById('editCarCity').value = car.city;
    document.getElementById('editCarArea').value = car.area;
    document.getElementById('editCarImage').value = car.image;
    document.getElementById('editCarHidden').checked = car.hidden;
    
    document.getElementById('editCarModal').style.display = 'block';
}

// Open add package modal
function openAddPackageModal() {
    document.getElementById('addPackageModal').style.display = 'block';
    document.getElementById('addPackageForm').reset();
    
    const packageCarsSelect = document.getElementById('packageCars');
    packageCarsSelect.innerHTML = '';
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.model} (${capitalizeFirstLetter(car.type)})`;
        packageCarsSelect.appendChild(option);
    });
}

// Open edit package modal
function openEditPackageModal(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;
    
    document.getElementById('editPackageId').value = pkg.id;
    document.getElementById('editPackageName').value = pkg.name;
    document.getElementById('editPackageType').value = pkg.type;
    document.getElementById('editPackageDescription').value = pkg.description;
    document.getElementById('editPackageImage').value = pkg.image;
    document.getElementById('editPackageDailyPrice').value = pkg.dailyPrice;
    document.getElementById('editPackageWeeklyPrice').value = pkg.weeklyPrice;
    document.getElementById('editPackageMonthlyPrice').value = pkg.monthlyPrice;
    
    const editPackageCarsSelect = document.getElementById('editPackageCars');
    editPackageCarsSelect.innerHTML = '';
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.model} (${capitalizeFirstLetter(car.type)})`;
        if (pkg.includedCars.includes(car.id)) {
            option.selected = true;
        }
        editPackageCarsSelect.appendChild(option);
    });
    
    document.getElementById('editFeatureInsurance').checked = pkg.features.insurance;
    document.getElementById('editFeatureMaintenance').checked = pkg.features.maintenance;
    document.getElementById('editFeatureRoadside').checked = pkg.features.roadside;
    document.getElementById('editFeatureDelivery').checked = pkg.features.delivery;
    document.getElementById('editPackageHidden').checked = pkg.hidden;
    
    document.getElementById('editPackageModal').style.display = 'block';
}

// Open location management modal
function openLocationManagementModal() {
    const container = document.getElementById('locationsContainer');
    container.innerHTML = '';
    
    for (const city in locations) {
        const cityDiv = document.createElement('div');
        cityDiv.className = 'location-item';
        cityDiv.innerHTML = `
            <span class="font-medium">${cityNames[city] || capitalizeFirstLetter(city)}</span>
            <span class="remove-btn" onclick="removeCity('${city}')">×</span>
        `;
        
        const areasDiv = document.createElement('div');
        locations[city].forEach(area => {
            const areaDiv = document.createElement('div');
            areaDiv.className = 'area-item';
            areaDiv.innerHTML = `
                <span>${area}</span>
                <span class="remove-btn" onclick="removeArea('${city}', '${area}')">×</span>
            `;
            areasDiv.appendChild(areaDiv);
        });
        
        const addAreaBtn = document.createElement('span');
        addAreaBtn.className = 'add-area-btn';
        addAreaBtn.textContent = '+ Add Area';
        addAreaBtn.onclick = () => addAreaInput(city);
        
        container.appendChild(cityDiv);
        container.appendChild(areasDiv);
        container.appendChild(addAreaBtn);
    }
    
    document.getElementById('locationManagementModal').style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Handle add car form submission
document.getElementById('addCarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newCar = {
        id: cars.length + 1,
        model: document.getElementById('carModel').value,
        price: parseInt(document.getElementById('carPrice').value),
        type: document.getElementById('carType').value,
        seats: parseInt(document.getElementById('carSeats').value),
        mileage: parseInt(document.getElementById('carMileage').value),
        transmission: document.getElementById('carTransmission').value,
        city: document.getElementById('carCity').value,
        area: document.getElementById('carArea').value,
        image: document.getElementById('carImage').value,
        hidden: false
    };
    
    cars.push(newCar);
    renderCars(cars);
    closeModal('addCarModal');
});

// Handle edit car form submission
document.getElementById('editCarForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const carId = parseInt(document.getElementById('editCarId').value);
    const carIndex = cars.findIndex(c => c.id === carId);
    
    if (carIndex !== -1) {
        cars[carIndex] = {
            ...cars[carIndex],
            model: document.getElementById('editCarModel').value,
            price: parseInt(document.getElementById('editCarPrice').value),
            type: document.getElementById('editCarType').value,
            seats: parseInt(document.getElementById('editCarSeats').value),
            mileage: parseInt(document.getElementById('editCarMileage').value),
            transmission: document.getElementById('editCarTransmission').value,
            city: document.getElementById('editCarCity').value,
            area: document.getElementById('editCarArea').value,
            image: document.getElementById('editCarImage').value,
            hidden: document.getElementById('editCarHidden').checked
        };
        
        renderCars(cars);
        closeModal('editCarModal');
    }
});

// Handle add package form submission
document.getElementById('addPackageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const selectedCars = Array.from(document.getElementById('packageCars').selectedOptions).map(option => parseInt(option.value));
    
    const newPackage = {
        id: packages.length + 1,
        name: document.getElementById('packageName').value,
        type: document.getElementById('packageType').value,
        description: document.getElementById('packageDescription').value,
        image: document.getElementById('packageImage').value,
        dailyPrice: parseInt(document.getElementById('packageDailyPrice').value),
        weeklyPrice: parseInt(document.getElementById('packageWeeklyPrice').value),
        monthlyPrice: parseInt(document.getElementById('packageMonthlyPrice').value),
        includedCars: selectedCars,
        features: {
            insurance: document.getElementById('featureInsurance').checked,
            maintenance: document.getElementById('featureMaintenance').checked,
            roadside: document.getElementById('featureRoadside').checked,
            delivery: document.getElementById('featureDelivery').checked
        },
        hidden: false
    };
    
    packages.push(newPackage);
    renderPackages(packages);
    closeModal('addPackageModal');
});

// Handle edit package form submission
document.getElementById('editPackageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const packageId = parseInt(document.getElementById('editPackageId').value);
    const packageIndex = packages.findIndex(p => p.id === packageId);
    const selectedCars = Array.from(document.getElementById('editPackageCars').selectedOptions).map(option => parseInt(option.value));
    
    if (packageIndex !== -1) {
        packages[packageIndex] = {
            ...packages[packageIndex],
            name: document.getElementById('editPackageName').value,
            type: document.getElementById('editPackageType').value,
            description: document.getElementById('editPackageDescription').value,
            image: document.getElementById('editPackageImage').value,
            dailyPrice: parseInt(document.getElementById('editPackageDailyPrice').value),
            weeklyPrice: parseInt(document.getElementById('editPackageWeeklyPrice').value),
            monthlyPrice: parseInt(document.getElementById('editPackageMonthlyPrice').value),
            includedCars: selectedCars,
            features: {
                insurance: document.getElementById('editFeatureInsurance').checked,
                maintenance: document.getElementById('editFeatureMaintenance').checked,
                roadside: document.getElementById('editFeatureRoadside').checked,
                delivery: document.getElementById('editFeatureDelivery').checked
            },
            hidden: document.getElementById('editPackageHidden').checked
        };
        
        renderPackages(packages);
        closeModal('editPackageModal');
    }
});

// Toggle car visibility
function toggleCarVisibility(carId) {
    const carIndex = cars.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
        cars[carIndex].hidden = !cars[carIndex].hidden;
        renderCars(cars);
    }
}

// Toggle package visibility
function togglePackageVisibility(packageId) {
    const packageIndex = packages.findIndex(p => p.id === packageId);
    if (packageIndex !== -1) {
        packages[packageIndex].hidden = !packages[packageIndex].hidden;
        renderPackages(packages);
    }
}

// Add new city
function addNewCity() {
    const cityInput = document.getElementById('newCityInput');
    const newCity = cityInput.value.toLowerCase().trim();
    
    if (newCity && !locations[newCity]) {
        locations[newCity] = [];
        cityInput.value = '';
        populateLocationFilters();
        openLocationManagementModal();
    }
}

// Remove city
function removeCity(city) {
    if (confirm(`Are you sure you want to remove ${cityNames[city] || capitalizeFirstLetter(city)} and all its areas?`)) {
        delete locations[city];
        populateLocationFilters();
        openLocationManagementModal();
    }
}

// Add area input field
function addAreaInput(city) {
    const container = document.getElementById('locationsContainer');
    const existingInput = container.querySelector(`.new-area-input[data-city="${city}"]`);
    
    if (!existingInput) {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'new-area-input';
        inputDiv.dataset.city = city;
        inputDiv.innerHTML = `
            <input type="text" placeholder="Enter new area" class="p-2 border rounded w-full" onkeydown="if(event.key === 'Enter') addArea('${city}', this.value)">
        `;
        container.insertBefore(inputDiv, container.querySelector(`.add-area-btn[onclick="addAreaInput('${city}')"]`).nextSibling);
    }
}

// Add new area
function addArea(city, area) {
    const trimmedArea = area.trim();
    if (trimmedArea && !locations[city].includes(trimmedArea)) {
        locations[city].push(trimmedArea);
        openLocationManagementModal();
    }
}

// Remove area
function removeArea(city, area) {
    if (confirm(`Are you sure you want to remove ${area} from ${cityNames[city] || capitalizeFirstLetter(city)}?`)) {
        locations[city] = locations[city].filter(a => a !== area);
        openLocationManagementModal();
    }
}

// Save location changes
function saveLocationChanges() {
    populateLocationFilters();
    closeModal('locationManagementModal');
}

// Utility function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}