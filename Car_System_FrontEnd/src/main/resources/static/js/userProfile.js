// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Profile section navigation
const sectionLinks = document.querySelectorAll('.profile-menu a[data-section]');

sectionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        sectionLinks.forEach(sectionLink => {
            sectionLink.classList.remove('active');
        });
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.profile-content > div').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected section
        const sectionId = link.getAttribute('data-section') + 'Section';
        document.getElementById(sectionId).style.display = 'block';
    });
});

// Back to top functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Extend rental modal functionality
const modal = document.getElementById('extendModal');
const extendBtns = document.querySelectorAll('.extend-btn');
const closeModal = document.querySelector('.close-modal');
const cancelBtn = document.getElementById('cancelExtension');
const confirmBtn = document.getElementById('confirmExtension');
const successAlert = document.getElementById('successAlert');
const errorAlert = document.getElementById('errorAlert');

extendBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const rentalCard = btn.closest('.rental-card');
        const bookingId = rentalCard.getAttribute('data-booking-id');
        const vehicleName = rentalCard.querySelector('.car-name').textContent;
        const currentReturnDate = rentalCard.querySelector('.return-date').textContent;
        
        // Set the modal form values
        document.getElementById('bookingId').value = bookingId;
        document.getElementById('vehicleName').value = vehicleName;
        document.getElementById('currentReturnDate').value = currentReturnDate;
        
        // Set min date for extension (current return date)
        const returnDateParts = currentReturnDate.split(', ')[1].split(' ');
        const monthMap = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        const minDate = `${returnDateParts[1]}-${monthMap[returnDateParts[0]]}-${returnDateParts[0] === 'Mar' ? '31' : returnDateParts[0] === 'Apr' ? '30' : '28'}`;
        document.getElementById('newReturnDate').min = minDate;
        
        // Display modal
        modal.style.display = 'block';
    });
});

// Close modal functions
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Click outside to close
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Confirm extension button
confirmBtn.addEventListener('click', () => {
    const bookingId = document.getElementById('bookingId').value;
    const newReturnDate = document.getElementById('newReturnDate').value;
    
    if (!newReturnDate) {
        alert('Please select a new return date.');
        return;
    }
    
    // Format the new date
    const date = new Date(newReturnDate);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    
    // Update the return date in the rental card
    const rentalCard = document.querySelector(`.rental-card[data-booking-id="${bookingId}"]`);
    if (rentalCard) {
        rentalCard.querySelector('.return-date').textContent = formattedDate;
        
        // Close modal
        modal.style.display = 'none';
        
        // Show success message
        successAlert.style.display = 'block';
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 3000);
    } else {
        // Show error message
        errorAlert.style.display = 'block';
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 3000);
    }
});



document.getElementById('cancelSettings').addEventListener('click', function() {
// Reset form or navigate away
alert('Changes discarded');
});

// Payment Methods
document.getElementById('addPaymentMethod').addEventListener('click', function() {
document.getElementById('addPaymentForm').style.display = 'block';
this.style.display = 'none';
});

document.getElementById('cancelAddPayment').addEventListener('click', function() {
document.getElementById('addPaymentForm').style.display = 'none';
document.getElementById('addPaymentMethod').style.display = 'block';
});

document.getElementById('paymentMethodForm').addEventListener('submit', function(e) {
e.preventDefault();
alert('Payment method added successfully!');
document.getElementById('addPaymentForm').style.display = 'none';
document.getElementById('addPaymentMethod').style.display = 'block';
});

// History Filters
document.getElementById('dateRangeFilter').addEventListener('change', function() {
if (this.value === 'custom') {
document.getElementById('customDateRange').style.display = 'block';
} else {
document.getElementById('customDateRange').style.display = 'none';
}
});

document.getElementById('applyFilters').addEventListener('click', function() {
alert('Filters applied!');
});

// Support Form
document.getElementById('supportRequestForm').addEventListener('submit', function(e) {
e.preventDefault();
alert('Support request submitted successfully! Our team will contact you soon.');
this.reset();
});
// View Details button functionality
const detailsBtns = document.querySelectorAll('.details-btn');
detailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const bookingId = btn.closest('.rental-card').getAttribute('data-booking-id');
        alert(`Viewing details for booking ${bookingId}. This feature will be available in the next update.`);
    });
});

// Receipt and Review button functionality
const receiptBtns = document.querySelectorAll('.receipt-btn');
const reviewBtns = document.querySelectorAll('.review-btn');

receiptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Receipt feature will be available in the next update.');
    });
});

reviewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Review feature will be available in the next update.');
    });
});