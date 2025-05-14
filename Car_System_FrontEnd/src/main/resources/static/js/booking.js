// MODAL DETAILS FROM HARD-CODED CAR CARDS
document.addEventListener('DOMContentLoaded', () => {

    let service = document.getElementById('service');
    console.log(service);
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.getElementById('car-details-modal');
            const modalHeader = document.getElementById('modal-header');
            const modalBody = document.getElementById('modal-body');

            // Use full details based on your updated Thymeleaf data attributes
            modalHeader.textContent = `${btn.dataset.make} ${btn.dataset.model} (${btn.dataset.year}) Details`;
            console.log(btn.dataset.locations);

            modalBody.innerHTML = `
                <p><strong>Make:</strong> ${btn.dataset.make}</p>
                <p><strong>Model:</strong> ${btn.dataset.model}</p>
                <p><strong>Year:</strong> ${btn.dataset.year}</p>
                <p><strong>Category:</strong> ${btn.dataset.category}</p>
                <p><strong>Fuel Type:</strong> ${btn.dataset.fuel}</p>
                <p><strong>Transmission:</strong> ${btn.dataset.transmission}</p>
                <p><strong>Seating Capacity:</strong> ${btn.dataset.seats} seats</p>
                <p><strong>Luggage Capacity:</strong> ${btn.dataset.luggage} bags</p>
                <p><strong>Mileage:</strong> ${btn.dataset.mileage} km</p>
                <p><strong>Daily Rate:</strong> ₹${parseFloat(btn.dataset.dailyrate).toLocaleString('en-IN')} / day</p>
                <p><strong>Hourly Rate:</strong> ₹${parseFloat(btn.dataset.hourlyrate).toLocaleString('en-IN')} / hour</p>
                <p><strong>Status:</strong> ${btn.dataset.status}</p>
                <p><strong>Additional Details:</strong> ${btn.dataset.details}</p>
            `;

            modal.style.display = 'flex';
        });
    });

    // Modal close logic
    const modal = document.getElementById('car-details-modal');
    document.getElementById('modal-close').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});



// TAB SWITCHING (CARS / PACKAGES)
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        const tabContent = document.getElementById(`${tabId}-tab`);

        if (!tabContent) return;

        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        tabContent.classList.add('active');
    });

    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            btn.click();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextBtn = tabBtns[index + 1] || tabBtns[0];
            nextBtn.focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevBtn = tabBtns[index - 1] || tabBtns[tabBtns.length - 1];
            prevBtn.focus();
        }
    });
});



// PACKAGE SECTION SCROLL CONTROLS
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const packagesContainer = document.querySelector('.packages-container');

if (scrollLeftBtn && scrollRightBtn && packagesContainer) {
    scrollLeftBtn.addEventListener('click', () => {
        packagesContainer.scrollBy({ left: -330, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
        packagesContainer.scrollBy({ left: 330, behavior: 'smooth' });
    });
}



// DATE VALIDATION FOR FILTER FORM
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