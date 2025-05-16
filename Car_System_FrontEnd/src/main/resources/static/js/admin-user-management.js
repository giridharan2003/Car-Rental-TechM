// Theme handling - sync with dashboard
document.addEventListener('DOMContentLoaded', function () {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark');
    }

    window.addEventListener('storage', function (event) {
        if (event.key === 'theme') {
            if (event.newValue === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    });

    // Fetch total rentals for each user and add row click event
    const userRows = document.querySelectorAll('#users-table-body tr');
    userRows.forEach(row => {
        // Extract user data from row
        const userIdSpan = row.querySelector('td:nth-child(1) span'); // ID column
        const userId = userIdSpan?.textContent || '';
        const nameSpan = row.querySelector('td:nth-child(2) span'); // Name column
        const name = nameSpan?.textContent || '';
        const emailSpan = row.querySelector('td:nth-child(3) span'); // Email column
        const email = emailSpan?.textContent || '';
        const phoneSpan = row.querySelector('td:nth-child(4) span'); // Phone column
        const phone = phoneSpan?.textContent || '';
        const totalRentalsCell = row.querySelector('td:nth-child(5)'); // Total Rentals column

        // Fetch total rentals
        fetch(`/admin/user/${userId}/bookings/count`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                totalRentalsCell.textContent = `${data} rentals`;
            })
            .catch(error => {
                console.error(`Error fetching bookings count for user ${userId}:`, error);
                totalRentalsCell.textContent = 'Error';
            });

        row.addEventListener('click', async () => {
            const rentalContainer = document.getElementById('rentalHistoryContainer');
            rentalContainer.innerHTML = ''; // Clear previous content

            document.getElementById('modalUserName').textContent = name;
            document.getElementById('modalUserId').textContent = `ID: ${userId}`;
            document.getElementById('modalUserPhone').textContent = phone;
            document.getElementById('modalUserEmail').textContent = email;

            try {
                const response = await fetch(`/admin/user/${userId}/bookings`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const bookings = await response.json();

                if (!bookings || bookings.length === 0) {
                    rentalContainer.innerHTML = `
                        <div class="flex flex-col items-center justify-center py-8 text-gray-500">
                            <i class="fas fa-car text-3xl mb-3"></i>
                            <p>No rental history available</p>
                        </div>
                    `;
                } else {
                    bookings.forEach(booking => {
                        const rentalCard = document.createElement('div');
                        rentalCard.className = 'bg-gray-50 rounded-lg p-4 flex items-start border border-gray-200';

                        // Fallback values for car details and status
                        const carImage = booking.carId?.imageUrl || '/default-car-image.jpg';
                        const carMake = booking.carId?.make || 'Unknown Make';
                        const carModel = booking.carId?.model || 'Unknown Model';
                        const statusClass = booking.status === 'active' ? 'status-active' : 'status-inactive';
                        const statusText = booking.status === 'active' ? 'On Rent' : 'Completed';

                        rentalCard.innerHTML = `
                            <div class="flex-shrink-0 h-16 w-24 bg-gray-200 rounded overflow-hidden mr-4">
                                <img src="${carImage}" alt="${carMake}" class="w-full h-full object-cover">
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="font-medium text-gray-900">${carMake} ${carModel}</h4>
                                        <p class="text-sm text-gray-600 mt-1">${formatDate(booking.pickUpDatetime)} - ${formatDate(booking.dropDatetime)}</p>
                                    </div>
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">
                                        ${statusText}
                                    </span>
                                </div>
                                <div class="mt-2 flex justify-between items-center">
                                    <span class="text-sm font-medium text-gray-900">${booking.totalPrice || 'N/A'}</span>
                                    <span class="text-xs text-gray-500">ID: ${booking.bookingId || 'N/A'}</span>
                                </div>
                            </div>
                        `;
                        rentalContainer.appendChild(rentalCard);
                    });
                }
            } catch (error) {
                console.error('Error during fetch:', error);
                rentalContainer.innerHTML = `
                    <div class="flex flex-col items-center justify-center py-8 text-gray-500">
                        <i class="fas fa-exclamation-triangle text-3xl mb-3"></i>
                        <p>Error loading rental history</p>
                    </div>
                `;
            }

            openModal('userDetailsModal');
        });
    });
});

// Modal controls (global scope for onclick access)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (modal.style.display === 'block' && event.target.classList.contains('modal')) {
            closeModal(modal.id);
        }
    }
});

function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString('en-IN', options);
}