const carsPerPage = 9;
let currentPage = 1;
let filteredCars = [];

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Map backend Car to frontend format
function mapCarToFrontend(car) {
    return {
        name: `${car.make} ${car.model}`,
        category: car.category.name,
        image: car.imageUrl,
        price_inr: car.dailyRate,
        features: [
            { icon: "fas fa-user", text: `${car.seats} Seats` },
            { icon: "fas fa-suitcase", text: `${car.luggage} Bags` },
            { icon: car.fuelType.toLowerCase() === "electric" ? "fas fa-bolt" : "fas fa-gas-pump", text: car.fuelType },
            { icon: "fas fa-cog", text: car.transmission }
        ],
        locations: car.availableLocations.map(loc => loc.name.toLowerCase()),
        model: car.model,
        fuelType: car.fuelType,
        transmission: car.transmission,
        seatingCapacity: car.seats,
        luggageCapacity: car.luggage,
        additionalDetails: car.additionalDetails
    };
}

// Render car cards
async function renderCarCards(page) {
    const carListings = document.getElementById('car-listings');
    carListings.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`/api/cars?page=${page}&size=${carsPerPage}`);
        if (!response.ok) throw new Error('Failed to fetch cars');
        const apiResponse = await response.json();
        if (!apiResponse.success) throw new Error(apiResponse.message);
        filteredCars = apiResponse.data.map(mapCarToFrontend);

        carListings.innerHTML = '';
        const start = (page - 1) * carsPerPage;
        const end = start + carsPerPage;
        const paginatedCars = filteredCars.slice(start, end);

        paginatedCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            console.log(car.image);
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
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
                        <a href="conformation" class="book-btn">Book Now</a>
                        <button type="button" class="details-btn" data-car='${JSON.stringify(car)}'>Details</button>
                    </div>
                </div>
            `;
            carListings.appendChild(carCard);
        });

        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const car = JSON.parse(btn.getAttribute('data-car'));
                showModal(car);
            });
        });

        renderPagination(filteredCars.length);
    } catch (error) {
        carListings.innerHTML = `<p style="text-align: center; padding: 20px;">Error: ${error.message}</p>`;
        document.getElementById('pagination').innerHTML = '';
    }
}

// Render pagination
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
            renderCarCards(currentPage);
        }
    });
    pagination.appendChild(prevItem);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('div');
        pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageItem.textContent = i;
        pageItem.addEventListener('click', () => {
            currentPage = i;
            renderCarCards(currentPage);
        });
        pagination.appendChild(pageItem);
    }

    const nextItem = document.createElement('div');
    nextItem.className = 'page-item next';
    nextItem.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextItem.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCarCards(currentPage);
        }
    });
    pagination.appendChild(nextItem);
}

// Modal functionality
const modal = document.getElementById('car-details-modal');
const modalClose = document.getElementById('modal-close');

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function showModal(car) {
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
}

// Toggle advanced search
const advancedSearchBtn = document.getElementById('advanced-search-btn');
const advancedFilters = document.querySelector('.advanced-filters');

advancedSearchBtn.addEventListener('click', () => {
    if (advancedFilters.style.display === 'none') {
        advancedFilters.style.display = 'block';
        advancedSearchBtn.textContent = 'Hide Advanced Search';
    } else {
        advancedFilters.style.display = 'none';
        advancedSearchBtn.textContent = 'Advanced Search';
    }
});

// Filter and Search Functionality
const filterForm = document.getElementById('filter-form');
const errorContainer = document.createElement('div');
errorContainer.className = 'error-container';
filterForm.prepend(errorContainer);

filterForm.addEventListener('submit', debounce(async (e) => {
    e.preventDefault();
    errorContainer.textContent = '';

    const searchBtn = filterForm.querySelector('.search-btn');
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';

    const formData = new FormData(filterForm);
    const filters = {
        location: formData.get('location')?.toLowerCase() || '',
        pickupDate: formData.get('pickup-date'),
        returnDate: formData.get('return-date'),
        carType: formData.get('car-type')?.toLowerCase() || '',
        priceMin: parseInt(formData.get('price-min')) || null,
        priceMax: parseInt(formData.get('price-max')) || null,
        seats: parseInt(formData.get('seats')) || null,
        transmission: formData.get('transmission')?.toLowerCase() || '',
        luggage: parseInt(formData.get('luggage')) || null,
        fuel: formData.get('fuel')?.toLowerCase() || ''
    };

    // Validate required fields
    document.querySelectorAll('.error-message').forEach(error => error.hidden = true);
    let hasErrors = false;

    if (!filters.location) {
        document.getElementById('location-error').hidden = false;
        hasErrors = true;
    }

    if (!filters.pickupDate) {
        document.getElementById('pickup-date-error').hidden = false;
        hasErrors = true;
    }

    if (!filters.returnDate) {
        document.getElementById('return-date-error').hidden = false;
        hasErrors = true;
    } else if (filters.pickupDate && filters.returnDate && new Date(filters.returnDate) <= new Date(filters.pickupDate)) {
        document.getElementById('return-date-error').textContent = 'Return date must be after pickup date.';
        document.getElementById('return-date-error').hidden = false;
        hasErrors = true;
    }

    if (filters.priceMin > filters.priceMax && filters.priceMax !== null) {
        document.getElementById('price-range-error').hidden = false;
        hasErrors = true;
    }

    if (hasErrors) {
        errorContainer.textContent = 'Please fix the errors above and try again.';
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search Cars';
        return;
    }

    // Fetch filtered cars
    try {
        let url = `/api/cars?location=${encodeURIComponent(filters.location)}`;
        if (filters.carType) url += `&carType=${encodeURIComponent(filters.carType)}`;
        if (filters.priceMin) url += `&priceMin=${filters.priceMin}`;
        if (filters.priceMax) url += `&priceMax=${filters.priceMax}`;
        if (filters.seats) url += `&seats=${filters.seats}`;
        if (filters.transmission) url += `&transmission=${encodeURIComponent(filters.transmission)}`;
        if (filters.luggage) url += `&luggage=${filters.luggage}`;
        if (filters.fuel) url += `&fuel=${encodeURIComponent(filters.fuel)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch cars');
        const apiResponse = await response.json();
        if (!apiResponse.success) throw new Error(apiResponse.message);
        filteredCars = apiResponse.data.map(mapCarToFrontend);

        currentPage = 1;
        if (filteredCars.length === 0) {
            document.getElementById('car-listings').innerHTML = '<p style="text-align: center; padding: 20px;">No cars match your criteria. Please adjust your filters.</p>';
            document.getElementById('pagination').innerHTML = '';
        } else {
            renderCarCards(currentPage);
        }
    } catch (error) {
        document.getElementById('car-listings').innerHTML = `<p style="text-align: center; padding: 20px;">Error: ${error.message}</p>`;
        document.getElementById('pagination').innerHTML = '';
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search Cars';
    }
}, 300));

// Tab switching functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        document.getElementById(`${button.dataset.tab}-tab`).classList.add('active');

        if (button.dataset.tab === 'cars') {
            currentPage = 1;
            renderCarCards(currentPage);
        }
    });
});

// Package scroll functionality
const packagesContainer = document.querySelector('.packages-container');
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');

scrollLeftBtn.addEventListener('click', () => {
    packagesContainer.scrollBy({ left: -300, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
    packagesContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

// Initial render
renderCarCards(currentPage);

// Handle fallback images
document.querySelectorAll('.car-image').forEach(img => {
    img.addEventListener('error', () => {
        img.src = '';
    });
});

// Accessibility: Keyboard navigation for tabs
tabButtons.forEach(button => {
    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            button.click();
        }
    });
});

// Accessibility: Keyboard navigation for pagination
document.getElementById('pagination').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPage > 1) {
        currentPage--;
        renderCarCards(currentPage);
    } else if (e.key === 'ArrowRight' && currentPage < Math.ceil(filteredCars.length / carsPerPage)) {
        currentPage++;
        renderCarCards(currentPage);
    }
});

// Prevent form resubmission
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}