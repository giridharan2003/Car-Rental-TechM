// Dark Mode Toggle
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');

lightModeBtn.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    lightModeBtn.classList.add('bg-gray-200', 'text-black');
    darkModeBtn.classList.remove('bg-black', 'text-white');
});

darkModeBtn.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    darkModeBtn.classList.add('bg-black', 'text-white');
    lightModeBtn.classList.remove('bg-gray-200', 'text-black');
});

// Updated car data with more Indian cars (15 total)
// const cars = [
//     {
//         id: 1,
//         make: "Tata",
//         model: "Nexon",
//         year: 2024,
//         trim: "XZ+ Lux",
//         pricePerHour: 750,
//         image: "cars/ev/nexonev.webp",
//         type: "SUV",
//         transmission: "Automatic",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 3,
//         status: "available",
//         isNew: true
//     },
//     {
//         id: 2,
//         make: "Mahindra",
//         model: "XUV700",
//         year: 2024,
//         trim: "AX7 Luxury",
//         pricePerHour: 1000,
//         image: "cars/mpv/xuv700.webp",
//         type: "SUV",
//         transmission: "Automatic",
//         fuelType: "Diesel",
//         seats: 7,
//         bags: 4,
//         status: "available",
//         isNew: false
//     },
//     {
//         id: 3,
//         make: "Mahindra",
//         model: "Thar",
//         year: 2024,
//         trim: "SX(O)",
//         pricePerHour: 800,
//         image: "cars/suv/thar.webp",
//         type: "SUV",
//         transmission: "Manual",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 3,
//         status: "booked",
//         bookedUntil: "2024-03-30T14:30:00"
//     },
//     {
//         id: 4,
//         make: "Maruti Suzuki",
//         model: "Baleno",
//         year: 2024,
//         trim: "Alpha",
//         pricePerHour: 500,
//         image: "cars/hatchback/baleno.webp",
//         type: "Hatchback",
//         transmission: "Manual",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 2,
//         status: "available",
//         isNew: true
//     },
//     {
//         id: 5,
//         make: "Toyota",
//         model: "Innova Crysta",
//         year: 2024,
//         trim: "ZX",
//         pricePerHour: 1200,
//         image: "cars/mpv/crysta.webp",
//         type: "MPV",
//         transmission: "Automatic",
//         fuelType: "Diesel",
//         seats: 7,
//         bags: 4,
//         status: "available",
//         isNew: false
//     },
//     {
//         id: 6,
//         make: "Kia",
//         model: "Seltos",
//         year: 2024,
//         trim: "GTX+",
//         pricePerHour: 850,
//         image: "cars/suv/seltos.webp",
//         type: "SUV",
//         transmission: "Automatic",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 3,
//         status: "available",
//         isNew: true
//     },
//     {
//         id: 7,
//         make: "MG",
//         model: "Hector",
//         year: 2024,
//         trim: "Sharp Hybrid",
//         pricePerHour: 900,
//         image: "cars/suv/gloster.webp",
//         type: "MPV",
//         transmission: "Automatic",
//         fuelType: "Hybrid",
//         seats: 5,
//         bags: 3,
//         status: "available",
//         isNew: false
//     },
//     {
//         id: 8,
//         make: "Honda",
//         model: "City",
//         year: 2024,
//         trim: "ZX CVT",
//         pricePerHour: 700,
//         image: "cars/sedan/city.webp",
//         type: "Sedan",
//         transmission: "Automatic",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 2,
//         status: "available",
//         isNew: true
//     },
//     {
//         id: 9,
//         make: "Renault",
//         model: "Kiger",
//         year: 2024,
//         trim: "RXT",
//         pricePerHour: 550,
//         image: "cars/hatchback/kwid.webp",
//         type: "Hatchback",
//         transmission: "Manual",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 2,
//         status: "available",
//         isNew: false
//     },
//     {
//         id: 10,
//         make: "Skoda",
//         model: "Kushaq",
//         year: 2024,
//         trim: "Style",
//         pricePerHour: 800,
//         image: "https://placehold.co/300x200?text=Skoda+Kushaq",
//         type: "SUV",
//         transmission: "Automatic",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 3,
//         status: "booked",
//         bookedUntil: "2024-04-01T16:00:00"
//     },
//     {
//         id: 11,
//         make: "Volkswagen",
//         model: "Virtus",
//         year: 2024,
//         trim: "GT Plus",
//         pricePerHour: 750,
//         image: "cars/sedan/virtus.webp",
//         type: "Sedan",
//         transmission: "Automatic",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 3,
//         status: "available",
//         isNew: true
//     },
//     {
//         id: 12,
//         make: "Maruti Suzuki",
//         model: "Swift",
//         year: 2024,
//         trim: "ZXI",
//         pricePerHour: 450,
//         image: "cars/hatchback/swift.webp",
//         type: "Hatchback",
//         transmission: "Manual",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 2,
//         status: "available",
//         isNew: false
//     },
//     {
//         id: 13,
//         make: "Hyundai",
//         model: "I20",
//         year: 2024,
//         trim: "Creative",
//         pricePerHour: 600,
//         image: "cars/hatchback/i20.webp",
//         type: "Hatchback",
//         transmission: "Automatic",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 2,
//         status: "available",
//         isNew: true
//     },
//     {
//         id: 14,
//         make: "Citroen",
//         model: "C3",
//         year: 2024,
//         trim: "Feel",
//         pricePerHour: 500,
//         image: "https://placehold.co/300x200?text=Citroen+C3",
//         type: "Hatchback",
//         transmission: "Manual",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 2,
//         status: "available",
//         isNew: false
//     },
//     {
//         id: 15,
//         make: "Nissan",
//         model: "Magnite",
//         year: 2024,
//         trim: "XV Premium",
//         pricePerHour: 650,
//         image: "https://placehold.co/300x200?text=Nissan+Magnite",
//         type: "SUV",
//         transmission: "Automatic",
//         fuelType: "Petrol",
//         seats: 5,
//         bags: 3,
//         status: "available",
//         isNew: true
//     }
// ];

// Existing rendering and filtering functions remain the same
// function renderCars(filteredCars) {
//     const container = document.getElementById('carListings');
//     container.innerHTML = '';
    
//     filteredCars.forEach(car => {
//         const statusBadge = getStatusBadge(car);
//         const isNewBadge = car.isNew ? 
//             `<span class="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">New</span>` : '';
        
//         const card = document.createElement('div');
//         card.className = 'card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all relative premium-shadow';
//         card.innerHTML = `
//             ${isNewBadge}
//             <div class="absolute top-3 right-3">
//                 ${statusBadge}
//             </div>
//             <img src="${car.image}" alt="${car.make} ${car.model}" 
//                  class="w-full h-48 object-cover">
//             <div class="p-4">
//                 <div class="flex justify-between items-center mb-2">
//                     <div>
//                         <h3 class="text-lg font-semibold">${car.make} ${car.model}</h3>
//                         <p class="text-sm">${car.trim}, ${car.year}</p>
//                     </div>
//                     <span class="text-yellow-600 font-bold">₹${car.pricePerHour}/hr</span>
//                 </div>
//                 <div class="flex justify-between text-sm">
//                     <span><i class="fas fa-car mr-2"></i>${car.type}</span>
//                     <span><i class="fas fa-car-battery mr-2"></i>${car.fuelType}</span>
//                     <span><i class="fas fa-users mr-2"></i>${car.seats} seats</span>
//                 </div>
//             </div>
//         `;
        
//         container.appendChild(card);
//     });
// }

function getStatusBadge(car) {
    if (car.status === 'available') {
        return '<span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Available</span>';
    }
    if (car.status === 'booked') {
        return `<span class="bg-gray-500 text-white px-2 py-1 rounded-full text-xs">
                Booked</span>`;
    }
    return '<span class="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">Maintenance</span>';
}

// function filterCars() {
//     const selectedTypes = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
//                           .map(el => el.value);
//     const minPrice = parseInt(document.getElementById('priceRange').value);

//     const filtered = cars.filter(car => {
//         return car.pricePerHour <= minPrice &&
//                (selectedTypes.length === 0 || selectedTypes.includes(car.type));
//     });

//     renderCars(filtered);
//     document.getElementById('carCount').textContent = `(${filtered.length})`;
// }