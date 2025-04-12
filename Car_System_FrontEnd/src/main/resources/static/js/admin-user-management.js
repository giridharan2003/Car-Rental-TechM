// Theme handling - sync with dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use preferred color scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark');
    }
    
    // Listen for theme changes from other pages
    window.addEventListener('storage', function(event) {
        if (event.key === 'theme') {
            if (event.newValue === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    });
    
    // Rest of your existing initialization code...
    renderUsers(users);
    
    // Search functionality
    document.getElementById('searchUsers').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = applyFilters();
        const searchedUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.email.toLowerCase().includes(searchTerm) ||
            user.phone.toLowerCase().includes(searchTerm)
        );
        renderUsers(searchedUsers);
    });
    
    // Filter functionality
    document.getElementById('statusFilter').addEventListener('change', applyFiltersAndRender);
    document.getElementById('carTypeFilter').addEventListener('change', applyFiltersAndRender);
    document.getElementById('tripCountFilter').addEventListener('change', applyFiltersAndRender);
    
    // Reset filters
    document.getElementById('resetFilters').addEventListener('click', function() {
        document.getElementById('statusFilter').value = 'all';
        document.getElementById('carTypeFilter').value = 'all';
        document.getElementById('tripCountFilter').value = 'all';
        applyFiltersAndRender();
    });
});

function applyFiltersAndRender() {
    const filteredUsers = applyFilters();
    renderUsers(filteredUsers);
}

function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const carTypeFilter = document.getElementById('carTypeFilter').value;
    const tripCountFilter = document.getElementById('tripCountFilter').value;
    
    return users.filter(user => {
        // Status filter
        if (statusFilter !== 'all' && user.currentStatus !== statusFilter) {
            return false;
        }
        
        // Car type filter
        if (carTypeFilter !== 'all') {
            if (user.rentals.length === 0) return false;
            
            const hasCarType = user.rentals.some(rental => rental.carType === carTypeFilter);
            if (!hasCarType) return false;
        }
        
        // Trip count filter
        if (tripCountFilter !== 'all') {
            const tripCount = user.rentals.length;
            
            if (tripCountFilter === '0' && tripCount !== 0) return false;
            if (tripCountFilter === '1-3' && (tripCount < 1 || tripCount > 3)) return false;
            if (tripCountFilter === '4-6' && (tripCount < 4 || tripCount > 6)) return false;
            if (tripCountFilter === '7+' && tripCount < 7) return false;
        }
        
        return true;
    });
}

// Render users to the table
function renderUsers(usersToRender) {
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';
    
    if (usersToRender.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="6" class="px-6 py-8 text-center">
                <div class="flex flex-col items-center justify-center text-gray-500">
                    <i class="fas fa-user-slash text-4xl mb-3"></i>
                    <p class="text-lg">No users found</p>
                    <p class="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
            </td>
        `;
        tbody.appendChild(row);
        return;
    }
    
    usersToRender.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'table-row cursor-pointer';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">${user.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                        ${user.name.charAt(0)}
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${user.name}</div>
                        <div class="text-xs text-gray-500">${user.rentals.length} rentals</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${user.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${user.phone}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${getStatusBadge(user.currentStatus)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button class="delete-btn text-red-500 hover:text-red-700 p-2 rounded-full" onclick="event.stopPropagation(); confirmDeleteUser(${user.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        
        // Add click event to show user details
        row.addEventListener('click', () => showUserDetails(user));
        
        tbody.appendChild(row);
    });
}

function getStatusBadge(status) {
    const statusText = status === 'no-trips' ? 'No Trips' : 
                     status === 'active' ? 'On Rent' : 
                     status === 'upcoming' ? 'Ready to Rent' : 
                     status === 'cancelled' ? 'Cancelled' : 
                     'Completed';
    
    const statusClass = status === 'no-trips' ? 'bg-gray-100 text-gray-800' : 
                       status === 'active' ? 'status-active' : 
                       status === 'upcoming' ? 'status-upcoming' : 
                       status === 'cancelled' ? 'status-cancelled' : 
                       'status-completed';
    
    return `<span class="status-badge ${statusClass}">${statusText}</span>`;
}

// Show user details modal with rental history
function showUserDetails(user) {
    document.getElementById('modalUserName').textContent = user.name;
    document.getElementById('modalUserId').textContent = `ID: ${user.id}`;
    document.getElementById('modalUserPhone').textContent = user.phone;
    document.getElementById('modalUserEmail').textContent = user.email;
    
    const rentalContainer = document.getElementById('rentalHistoryContainer');
    rentalContainer.innerHTML = '';
    
    if (user.rentals.length === 0) {
        rentalContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-8 text-gray-500">
                <i class="fas fa-car text-3xl mb-3"></i>
                <p>No rental history found</p>
            </div>
        `;
    } else {
        // Sort rentals by date (newest first)
        const sortedRentals = [...user.rentals].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedRentals.forEach(rental => {
            const rentalCard = document.createElement('div');
            rentalCard.className = 'bg-gray-50 rounded-lg p-4 flex items-start border border-gray-200';
            
            const statusClass = rental.status === 'active' ? 'status-active' : 
                              rental.status === 'upcoming' ? 'status-upcoming' : 
                              rental.status === 'cancelled' ? 'status-cancelled' : 
                              'status-completed';
            
            const statusText = rental.status === 'active' ? 'On Rent' : 
                             rental.status === 'upcoming' ? 'Upcoming' : 
                             rental.status === 'cancelled' ? 'Cancelled' : 
                             'Completed';
            
            rentalCard.innerHTML = `
                <div class="flex-shrink-0 h-16 w-24 bg-gray-200 rounded overflow-hidden mr-4">
                    <img src="${rental.carImage}" alt="${rental.car}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-medium text-gray-900">${rental.car}</h4>
                            <p class="text-sm text-gray-600 mt-1">${formatDate(rental.date)} - ${formatDate(rental.endDate)} • ${rental.duration}</p>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">
                            ${statusText}
                        </span>
                    </div>
                    <div class="mt-2 flex justify-between items-center">
                        <span class="text-sm font-medium text-gray-900">${rental.amount}</span>
                        <span class="text-xs text-gray-500">ID: ${rental.id}</span>
                    </div>
                </div>
            `;
            rentalContainer.appendChild(rentalCard);
        });
    }
    
    openModal('userDetailsModal');
}

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Confirm user deletion
function confirmDeleteUser(userId) {
    document.getElementById('confirmDeleteBtn').onclick = function() {
        deleteUser(userId);
        closeModal('deleteUserModal');
    };
    openModal('deleteUserModal');
}

// Delete user
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    renderUsers(applyFilters());
}

// Modal controls
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        const modals = document.getElementsByClassName('modal');
        for (let modal of modals) {
            if (modal.style.display === 'block') {
                closeModal(modal.id);
            }
        }
    }
}

// Enhanced user data with South Indian names and rental history
let users = [
    {
        id: 1,
        name: "Arjun Reddy",
        email: "arjun.reddy@example.com",
        phone: "+91 98765 43210",
        currentStatus: "active",
        rentals: [
            {
                id: "R1001",
                car: "Hyundai Creta",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg",
                date: "2023-05-15",
                endDate: "2023-05-18",
                duration: "3 days",
                amount: "₹12,500",
                status: "completed"
            },
            {
                id: "R1002",
                car: "Toyota Fortuner",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/161815/fortuner-exterior-right-front-three-quarter-2.jpeg",
                date: "2023-07-22",
                endDate: "2023-07-27",
                duration: "5 days",
                amount: "₹22,000",
                status: "completed"
            },
            {
                id: "R1010",
                car: "Mercedes-Benz E-Class",
                carType: "luxury",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45261/e-class-exterior-right-front-three-quarter-2.jpeg",
                date: "2023-11-15",
                endDate: "2023-11-20",
                duration: "5 days",
                amount: "₹45,000",
                status: "active"
            }
        ]
    },
    {
        id: 2,
        name: "Priya Iyer",
        email: "priya.iyer@example.com",
        phone: "+91 87654 32109",
        currentStatus: "upcoming",
        rentals: [
            {
                id: "R1003",
                car: "Maruti Suzuki Swift",
                carType: "hatchback",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/110815/swift-exterior-right-front-three-quarter-3.jpeg",
                date: "2023-06-20",
                endDate: "2023-06-22",
                duration: "2 days",
                amount: "₹5,500",
                status: "completed"
            },
            {
                id: "R1011",
                car: "Honda City",
                carType: "sedan",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/54349/city-exterior-right-front-three-quarter-148156.jpeg",
                date: "2023-12-05",
                endDate: "2023-12-10",
                duration: "5 days",
                amount: "₹15,000",
                status: "upcoming"
            }
        ]
    },
    {
        id: 3,
        name: "Karthik Nair",
        email: "karthik.nair@example.com",
        phone: "+91 76543 21098",
        currentStatus: "no-trips",
        rentals: []
    },
    {
        id: 4,
        name: "Meenakshi Sundaram",
        email: "meenakshi.s@example.com",
        phone: "+91 65432 10987",
        currentStatus: "completed",
        rentals: [
            {
                id: "R1004",
                car: "Honda City",
                carType: "sedan",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/54349/city-exterior-right-front-three-quarter-148156.jpeg",
                date: "2023-08-05",
                endDate: "2023-08-12",
                duration: "7 days",
                amount: "₹18,200",
                status: "completed"
            },
            {
                id: "R1005",
                car: "Tata Nexon",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-8.jpeg",
                date: "2023-09-12",
                endDate: "2023-09-16",
                duration: "4 days",
                amount: "₹9,600",
                status: "completed"
            },
            {
                id: "R1006",
                car: "Mahindra XUV700",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg",
                date: "2023-10-18",
                endDate: "2023-10-20",
                duration: "2 days",
                amount: "₹7,800",
                status: "completed"
            }
        ]
    },
    {
        id: 5,
        name: "Vijay Kumar",
        email: "vijay.kumar@example.com",
        phone: "+91 94321 09876",
        currentStatus: "cancelled",
        rentals: [
            {
                id: "R1007",
                car: "Kia Seltos",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115815/seltos-facelift-exterior-right-front-three-quarter-75.jpeg",
                date: "2023-09-01",
                endDate: "2023-09-05",
                duration: "4 days",
                amount: "₹11,200",
                status: "cancelled"
            }
        ]
    },
    {
        id: 6,
        name: "Lakshmi Menon",
        email: "lakshmi.m@example.com",
        phone: "+91 83210 98765",
        currentStatus: "completed",
        rentals: [
            {
                id: "R1008",
                car: "Tata Nexon",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-8.jpeg",
                date: "2023-09-12",
                endDate: "2023-09-16",
                duration: "4 days",
                amount: "₹9,600",
                status: "completed"
            }
        ]
    },
    {
        id: 7,
        name: "Suresh Pillai",
        email: "suresh.p@example.com",
        phone: "+91 72109 87654",
        currentStatus: "active",
        rentals: [
            {
                id: "R1009",
                car: "Toyota Innova Crysta",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg",
                date: "2023-11-10",
                endDate: "2023-11-15",
                duration: "5 days",
                amount: "₹18,500",
                status: "active"
            },
            {
                id: "R1012",
                car: "Maruti Suzuki Baleno",
                carType: "hatchback",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/45261/e-class-exterior-right-front-three-quarter-2.jpeg",
                date: "2023-08-15",
                endDate: "2023-08-18",
                duration: "3 days",
                amount: "₹6,800",
                status: "completed"
            }
        ]
    },
    {
        id: 8,
        name: "Deepa Rajan",
        email: "deepa.r@example.com",
        phone: "+91 61098 76543",
        currentStatus: "upcoming",
        rentals: [
            {
                id: "R1013",
                car: "BMW 5 Series",
                carType: "luxury",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg",
                date: "2023-12-20",
                endDate: "2023-12-25",
                duration: "5 days",
                amount: "₹52,000",
                status: "upcoming"
            }
        ]
    },
    {
        id: 9,
        name: "Ganesh Moorthy",
        email: "ganesh.m@example.com",
        phone: "+91 50987 65432",
        currentStatus: "no-trips",
        rentals: []
    },
    {
        id: 10,
        name: "Ananya Deshpande",
        email: "ananya.d@example.com",
        phone: "+91 49876 54321",
        currentStatus: "completed",
        rentals: [
            {
                id: "R1014",
                car: "Hyundai Verna",
                carType: "sedan",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/54349/city-exterior-right-front-three-quarter-148156.jpeg",
                date: "2023-10-05",
                endDate: "2023-10-10",
                duration: "5 days",
                amount: "₹14,500",
                status: "completed"
            },
            {
                id: "R1015",
                car: "Mahindra Thar",
                carType: "suv",
                carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-75.jpeg",
                date: "2023-09-01",
                endDate: "2023-09-05",
                duration: "4 days",
                amount: "₹16,000",
                status: "completed"
            }
        ]
    }
];