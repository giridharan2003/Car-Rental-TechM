// Theme handling - sync with dashboard
document.addEventListener('DOMContentLoaded', function() {

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark');
    }
    
    window.addEventListener('storage', function(event) {
        if (event.key === 'theme') {
            if (event.newValue === 'dark') {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
        }
    });
});



// Modal controls (global scope for onclick access)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(modalId) {
    console.log(`Closing modal: ${modalId}`); // Debug log to confirm function call
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (modal.style.display === 'block' && event.target.classList.contains('modal')) {
            closeModal(modal.id);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch total rentals for each user and add row click event
    const userRows = document.querySelectorAll('#users-table-body tr');
    userRows.forEach(row => {
        // Extract user data from row
        const userIdSpan = row.querySelector('td:nth-child(1) span'); // ID column
        const userId = userIdSpan.textContent;
        const nameSpan = row.querySelector('td:nth-child(2) span'); // Name column
        const name = nameSpan.textContent;
        const emailSpan = row.querySelector('td:nth-child(3) span'); // Email column
        const email = emailSpan.textContent;
        const phoneSpan = row.querySelector('td:nth-child(4) span'); // Phone column
        const phone = phoneSpan.textContent;
        const totalRentalsCell = row.querySelector('td:nth-child(5)'); // Total Rentals column

        // Fetch total rentals
        fetch(`/admin/user/${userId}/bookings/count`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(count => {
            totalRentalsCell.textContent = `${count} rentals`;
        })
        .catch(error => {
            console.error(`Error fetching bookings count for user ${userId}:`, error);
            totalRentalsCell.textContent = 'Error';
        });

        // Add click event to open user details modal
        row.addEventListener('click', () => {
            document.getElementById('modalUserName').textContent = name;
            document.getElementById('modalUserId').textContent = `ID: ${userId}`;
            document.getElementById('modalUserPhone').textContent = phone;
            document.getElementById('modalUserEmail').textContent = email;

            // Set placeholder for rental history (no backend data available)
            const rentalContainer = document.getElementById('rentalHistoryContainer');
            rentalContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-8 text-gray-500">
                    <i class="fas fa-car text-3xl mb-3"></i>
                    <p>No rental history available</p>
                </div>
            `;

            openModal('userDetailsModal');
        });
    });
});