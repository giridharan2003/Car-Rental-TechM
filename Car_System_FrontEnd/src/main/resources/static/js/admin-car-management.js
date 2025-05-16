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
// Async function to fetch data from the URL
async function getCarsData() {
    try {
        let response = await fetch("/cars");

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let Allcars = await response.json();
        return Allcars;
        
    } catch (error) {
        
        console.error('There was a problem with the fetch operation:', error);
    }
}


// Initialize the page with all cars
document.addEventListener('DOMContentLoaded',async function() {
    
    let cars = await getCarsData();

    // Only render if cars data is available
    if (Array.isArray(cars)) {
        renderCars(cars);
    } else {
        console.error("Failed to fetch or parse car data.");
    }
    
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
        carCard.className = `car-card bg-white p-0 rounded-lg shadow hover:shadow-lg transition-all ${!car.active ? 'hidden-car' : ''}`;
    
        carCard.innerHTML = `
            <div class="flex flex-col h-full">
                <div class="car-image-container">
                    <img src="${car.imageUrl}" alt="${car.model}" class="car-image">
                    <span class="car-type-badge bg-violet-600 text-white">${capitalizeFirstLetter(car.category.name)}</span>
                    
                </div>
                <div class="p-4 flex flex-col flex-1">
                    <div class="flex justify-between items-start mb-2">
                        <h2 class="text-xl font-semibold">${car.model}</h2>
                        <p class="text-lg font-bold text-purple-600 dark:text-purple-400">₹${car.dailyRate.toLocaleString()}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-3 mb-3">
                        <div class="flex items-center">
                            <i class="fas fa-users mr-2 text-gray-500 dark:text-gray-400"></i>
                            <span class="text-gray-600 dark:text-gray-300">${car.seats} Seats</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-tachometer-alt mr-2 text-gray-500 dark:text-gray-400"></i>
                            <span class="text-gray-600 dark:text-gray-300">${car.mileage} ${car.fuelType === 'electric' ? 'km/charge' : 'km/l'}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-cog mr-2 text-gray-500 dark:text-gray-400"></i>
                            <span class="text-gray-600 dark:text-gray-300">${capitalizeFirstLetter(car.transmission)}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-map-marker-alt mr-2 text-gray-500 dark:text-gray-400"></i>
                            <div class="relative group w-fit max-w-full">
                                <span class="text-gray-600 dark:text-gray-300 cursor-pointer">
                                    ${
                                        car.availableLocations && car.availableLocations.length > 0
                                            ? `${car.availableLocations[0].name}${car.availableLocations.length > 1 ? ' ..' : ''}`
                                            : 'Not Specified'
                                    }
                                </span>
                                ${
                                    car.availableLocations && car.availableLocations.length > 1
                                        ? `<div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 max-w-[200px] break-words">
                                            ${car.availableLocations.map(loc => loc.name).join(', ')}
                                        </div>`
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Description :</p>
                        <p class="text-sm text-gray-600 dark:text-gray-200">${car.additionalDetails}</p>
                    </div>
                    <div class=" flex justify-between space-x-3 button-container mt-auto">
                        <button class="edit-btn px-4 mt-4 py-2 text-white rounded-lg flex-1 flex items-center justify-center" onclick="${`openEditModal(${car.carId})`}">
                            <i class="fas fa-edit mr-2"></i>
                            Edit
                        </button>
                        <button onclick="activeStatus(${car.carId}, ${car.active})"
                                class="${!car.active ? 'hide-btn' : 'unhide-btn'} px-4 py-2 mt-4 text-white rounded-lg flex-1 flex items-center justify-center">
                            <i class="fas ${!car.active ? 'fa-eye-slash' : 'fa-eye'} mr-2"></i>
                            ${car.active ? 'Hide' : 'Unhide'}
                        </button>

                    </div>
                </div>
            </div>
        `;
        container.appendChild(carCard);
    });
}

async function activeStatus(id, isActive) {

    const status = isActive ? "inactive" : "active"; // simplified ternary
    console.log(`Changing car ${id} to: ${status}`);

    const confirmed = confirm("Are you sure you want " + status + " this Car...");
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/admin/${id}/${status}`, {
            method: "GET",
        });

        if (response.ok) {
            location.reload(); // reload to reflect changes
        } else {
            const result = await response.json();
            alert("Operation failed: " + (result.error || response.statusText));
        }
    } catch (err) {
        console.error("Request error:", err);
        alert("Something went wrong!");
    }
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


function openModal(modelId) {
    document.getElementById(modelId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

async function openEditModal(carId) {
    try {
        const response = await fetch(`/cars/${carId}`);
        const car = await response.json();

        document.getElementById('editCarId').value = car.carId;
        document.getElementById('editCarMake').value = car.make;
        document.getElementById('editCarModel').value = car.model;
        document.getElementById('editCarYear').value = car.year;
        document.getElementById('editCarSeats').value = car.seats;
        document.getElementById('editCarCategory').value = car.category.categoryId;
        document.getElementById('editCarLicensePlate').value = car.licensePlate;
        document.getElementById('editCarStatus').value = car.status;
        document.getElementById('editCarFuelType').value = car.fuelType;
        document.getElementById('editCarTransmission').value = car.transmission;
        document.getElementById('editCarMileage').value = car.mileage;
        document.getElementById('editCarLuggage').value = car.luggage;
        document.getElementById('editCarHourlyRate').value = car.hourlyRate;
        document.getElementById('editCarDailyRate').value = car.dailyRate;
        document.getElementById('editCarInsurance').value = car.insurance;
        document.getElementById('editCarImage').value = car.imageUrl;
        document.getElementById('editCarLocations').value = car.locations;
        document.getElementById('editCarDesc').value = car.additionalDetails;
            
        document.getElementById('editCarModal').style.display = 'block';

    } catch (error) {
        console.error('Error fetching car data for edit:', error);
    }
}

document.getElementById("addCarForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();

    const car = {
        make: document.getElementById("addCarMake").value,
        model: document.getElementById("addCarModel").value,
        year: parseInt(document.getElementById("addCarYear").value),
        licensePlate: document.getElementById("addCarLicensePlate").value,
        dailyRate: parseFloat(document.getElementById("addCarDailyRate").value),
        hourlyRate: parseFloat(document.getElementById("addCarHourlyRate").value),
        fuelType: document.getElementById("addCarFuelType").value,
        transmission: document.getElementById("addCarTransmission").value,
        seats: parseInt(document.getElementById("addCarSeats").value),
        luggage: parseInt(document.getElementById("addCarLuggage").value),
        mileage: parseFloat(document.getElementById("addCarMileage").value),
        insurance: document.getElementById("addCarInsurance").value,
        imageUrl: "", 
        additionalDetails: document.getElementById("addCarDesc").value,
        category: {
            categoryId: document.getElementById("addCarCategory").value
        },
        availableLocations: [
            { locationId: 1 },
            { locationId: 2 }
        ]
    };

    formData.append("car", new Blob([JSON.stringify(car)], { type: "application/json" }));

    const imageInput = document.getElementById("addCarImage");
    if (imageInput.files.length > 0) {
        formData.append("image", imageInput.files[0]);
    }

    try {
        const response = await fetch("/cars/add", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert("Car added successfully! 🚗");
            location.reload();
            closeModal("addCarModal");
        } else {
            alert("Upload failed: " + result.error);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong!");
    }
});

document.getElementById("editCarForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const car = {
        make: document.getElementById("editCarMake").value,
        model: document.getElementById("editCarModel").value,
        year: parseInt(document.getElementById("editCarYear").value),
        licensePlate: document.getElementById("editCarLicensePlate").value,
        dailyRate: parseFloat(document.getElementById("editCarDailyRate").value),
        hourlyRate: parseFloat(document.getElementById("editCarHourlyRate").value),
        fuelType: document.getElementById("editCarFuelType").value,
        transmission: document.getElementById("editCarTransmission").value,
        seats: parseInt(document.getElementById("editCarSeats").value),
        luggage: parseInt(document.getElementById("editCarLuggage").value),
        mileage: parseFloat(document.getElementById("editCarMileage").value),
        insurance: document.getElementById("editCarInsurance").value,
        imageUrl: document.getElementById("editCarImage").value,
        additionalDetails: document.getElementById("editCarDesc").value,
        category: {
            categoryId: document.getElementById("editCarCategory").value
        },
        availableLocations: [
            { locationId: 1 },
            { locationId: 2 }
        ]
    };

    const carId = document.getElementById("editCarId").value;

    try {
        const response = await fetch(`/cars/edit/${carId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        });

        const result = await response.json();
        if (response.ok) {
            alert("Car edited successfully! 🚗");
            location.reload();
            closeModal("editCarModal");
        } else {
            alert("Edit failed: " + result.error);
        }
    } catch (err) {
        console.error(err);
        alert("Something went wrong!");
    }
});


const select = document.getElementById("addLocation");
const option = document.getElementById("options");

let locations = [];

select.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    option.innerHTML = "";

    if (!value) {
        option.style.display = "none";
        return;
    }

    const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(value)
    );

    filtered.forEach(location => {
        const li = document.createElement("li");
        li.textContent = location.name;
        li.dataset.value = location.locationId;
        li.addEventListener("click", () => {
            select.value = location.name;
            option.style.display = "none";
        });
        option.appendChild(li);
    });

    option.style.display = filtered.length ? "block" : "none";
});

select.addEventListener("blur", () => {
    setTimeout(() => {
        option.style.display = "none";
    }, 100);
});

fetch("/cars/locations")
    .then(res => res.json())
    .then(data => {
        locations = data.map(location => ({
            locationId: location.locationId,
            name: location.name
        }));
    });


    
// Utility function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}