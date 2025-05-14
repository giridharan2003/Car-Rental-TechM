const setupBooking = () => {
    const RATE = 36000;
    const TAX = 0.18;
    const inputs = {
        startDate: document.querySelector('#pickupDate'),
        startTime: document.querySelector('#pickupTime'),
        endDate: document.querySelector('#dropDate'),
        endTime: document.querySelector('#dropTime'),
        startLocation: document.querySelector('#pickupLocation'),
        endLocation: document.querySelector('#dropLocation')
    };
    const serviceChecks = document.querySelectorAll('.service-item input');
    const summaryBox = document.querySelector('.price-summary');

    const renderSummary = () => {
        const selectedServices = Array.from(serviceChecks)
            .filter(input => input.checked)
            .map(input => ({
                label: input.closest('.service-item').querySelector('.service-name').textContent,
                cost: Number(input.dataset.price)
            }));
        
        const servicesSum = selectedServices.reduce((total, service) => total + service.cost, 0);
        const baseTotal = RATE;
        const subtotal = baseTotal + servicesSum;
        const taxAmount = Math.round(subtotal * TAX);
        const finalTotal = subtotal + taxAmount;
        localStorage.setItem('totalPrice', finalTotal);

        summaryBox.innerHTML = `
            <h3>Cost Breakdown</h3>
            <div class="cost-item">
                <span>Standard Rate (3 days × ₹12,000)</span>
                <span>₹${baseTotal.toLocaleString('en-IN')}.00</span>
            </div>
            <div class="services-list">
                ${selectedServices.length ? selectedServices.map(service => `
                    <div class="cost-item">
                        <span>${service.label}</span>
                        <span>₹${service.cost.toLocaleString('en-IN')}.00</span>
                    </div>
                `).join('') : '<div class="cost-item"><span>No extra services</span><span>₹0.00</span></div>'}
            </div>
            <div class="cost-item">
                <span>GST (18%)</span>
                <span>₹${taxAmount.toLocaleString('en-IN')}.00</span>
            </div>
            <div class="cost-item final">
                <span>Grand Total</span>
                <span>₹${finalTotal.toLocaleString('en-IN')}.00</span>
            </div>
        `;
    };

    const addListeners = () => {
        serviceChecks.forEach(check => {
            check.addEventListener('change', renderSummary);
        });
    };

    const applyStyles = () => {
        const css = `
            .price-summary {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
            }
            .cost-item {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
                padding: 5px 0;
                border-bottom: 1px solid #eee;
            }
            .cost-item.final {
                font-weight: bold;
                border-bottom: none;
                font-size: 1.1em;
            }
            .loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .loading::after {
                content: 'Processing...';
                color: white;
                font-size: 24px;
            }
            .success-checkmark {
                width: 80px;
                height: 80px;
                margin: 20px auto;
                border-radius: 50%;
                background: #2ecc71;
                position: relative;
                animation: scaleIn 0.5s ease;
            }
            .success-checkmark::after {
                content: '';
                position: absolute;
                top: 20px;
                left: 30px;
                width: 20px;
                height: 40px;
                border: solid white;
                border-width: 0 6px 6px 0;
                transform: rotate(45deg);
            }
            @keyframes scaleIn {
                0% { transform: scale(0); }
                100% { transform: scale(1); }
            }
            @keyframes fall {
                0% {
                    top: -10px;
                    transform: translateX(0) rotate(0deg);
                }
                100% {
                    top: 100vh;
                    transform: translateX(100px) rotate(360deg);
                }
            }
            .receipt-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .receipt-container {
                background: white;
                padding: 30px;
                border-radius: 8px;
                width: 90%;
                max-width: 600px;
                position: relative;
                max-height: 80vh;
                overflow: auto;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
                0% { opacity: 0; transform: translateY(-20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
        `;
        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        document.head.appendChild(styleTag);
    };

    applyStyles();
    addListeners();
    renderSummary();
};

const collectFormData = () => {
    const inputs = {
        pickupDate: document.querySelector('#pickupDate'),
        pickupTime: document.querySelector('#pickupTime'),
        dropDate: document.querySelector('#dropDate'),
        dropTime: document.querySelector('#dropTime'),
        pickupLocation: document.querySelector('#pickupLocation'),
        dropLocation: document.querySelector('#dropLocation')
    };

    const serviceChecks = document.querySelectorAll('.service-item input[type="checkbox"]');
    const userId = 1; // Hardcoded for demo; replace with dynamic userId
    const carId = document.getElementById('carId').value;
    let totalPrice = localStorage.getItem('totalPrice') || null;

    const checkedServiceCheckboxes = document.querySelectorAll('input[name="additionalServices[]"]:checked');
    const additionalServices = Array.from(checkedServiceCheckboxes).map(cb => parseInt(cb.value));

    const pickUpDatetime = inputs.pickupDate.value && inputs.pickupTime.value 
        ? `${inputs.pickupDate.value}T${inputs.pickupTime.value}:00`
        : null;
    const dropDatetime = inputs.dropDate.value && inputs.dropTime.value 
        ? `${inputs.dropDate.value}T${inputs.dropTime.value}:00`
        : null;

    const formData = {
        userId: userId ? { userId: parseInt(userId) } : null,
        carId: carId ? { carId: parseInt(carId) } : null,
        pickupLocationId: inputs.pickupLocation.value ? { locationId: parseInt(inputs.pickupLocation.value) } : null,
        dropLocationId: inputs.dropLocation.value ? { locationId: parseInt(inputs.dropLocation.value) } : null,
        pickUpDatetime: pickUpDatetime,
        dropDatetime: dropDatetime,
        additionalService: additionalServices.length > 0
            ? additionalServices.map(id => ({ serviceId: parseInt(id) }))
            : [],
        totalPrice: totalPrice
    };

    const missingFields = [];
    if (!formData.userId) missingFields.push('userId');
    if (!formData.carId) missingFields.push('carId');
    if (!formData.pickupLocationId) missingFields.push('pickupLocationId');
    if (!formData.dropLocationId) missingFields.push('dropLocationId');
    if (!formData.pickUpDatetime) missingFields.push('pickUpDatetime');
    if (!formData.dropDatetime) missingFields.push('dropDatetime');
    if (!formData.totalPrice) missingFields.push('totalPrice');

    if (missingFields.length > 0) {
        console.warn(`Missing required fields: ${missingFields.join(', ')}`);
        return null;
    }

    localStorage.setItem('bookingFormData', JSON.stringify(formData));
    return formData;
};

const submitFormDataAndPay = () => {
    const formData = collectFormData();

    if (!formData) {
        alert('Please fill in all required fields.');
        return;
    }

    // Show loading screen
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    document.body.appendChild(loadingDiv);
    loadingDiv.style.display = 'flex';

    // Submit form data to server
    fetch('/cars/user/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save booking data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Booking saved:', data);
        // Proceed to Razorpay payment
        const totalPrice = parseInt(formData.totalPrice) || 36000;
        const options = {
            key: "rzp_test_1DP5mmOlF5G5ag", // Razorpay test key
            amount: totalPrice * 100, // Convert to paise
            currency: "INR",
            name: "Luxora Car Rental",
            description: "Car Rental Booking",
            image: "/api/placeholder/60/60",
            prefill: {
                name: "John Doe",
                email: "john.doe@example.com",
                contact: "9876543210"
            },
            theme: {
                color: "#d4af37"
            },
            modal: {
                ondismiss: () => {
                    loadingDiv.style.display = 'none';
                    document.body.removeChild(loadingDiv);
                    console.log('Razorpay modal dismissed');
                }
            },
            handler: (response) => {
                loadingDiv.style.display = 'flex';
                // Simulate payment verification
                setTimeout(() => {
                    loadingDiv.style.display = 'none';
                    document.body.removeChild(loadingDiv);
                    console.log('Payment successful:', response);
                    generateReceipt(response.razorpay_payment_id);
                }, 1500);
            }
        };

        const razorpayObject = new Razorpay(options);
        razorpayObject.on('payment.failed', (response) => {
            loadingDiv.style.display = 'none';
            document.body.removeChild(loadingDiv);
            alert('Payment Failed: ' + response.error.description);
        });
        razorpayObject.open();
    })
    .catch(error => {
        loadingDiv.style.display = 'none';
        document.body.removeChild(loadingDiv);
        alert('Error saving booking: ' + error.message);
    });
};

const createConfetti = () => {
    const confettiCount = 100; // Reduced for performance
    const container = document.querySelector('body');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '1001'; // Above receipt
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = Math.random() * 8 + 5 + 'px';
        confetti.style.backgroundColor = ['#d4af37', '#2c3e50', '#3498db', '#2ecc71', '#e67e22'][Math.floor(Math.random() * 5)];
        confetti.style.borderRadius = '50%';
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = 'scale(' + Math.random() + ')';
        confetti.style.animation = 'fall ' + (Math.random() * 3 + 3) + 's linear';

        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 6000);
    }
};

const generateReceipt = (paymentId) => {
    const formData = JSON.parse(localStorage.getItem('bookingFormData'));
    const serviceChecks = document.querySelectorAll('.service-item input[type="checkbox"]');
    let selectedServicesHTML = '';
    let serviceTotal = 0;

    serviceChecks.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseInt(checkbox.dataset.price);
            const name = checkbox.closest('.service-item').querySelector('.service-name').textContent;
            selectedServicesHTML += `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹${price.toLocaleString('en-IN')}.00</td>
                </tr>
            `;
            serviceTotal += price;
        }
    });

    const baseRate = 36000;
    const subtotal = baseRate + serviceTotal;
    const taxes = Math.round(subtotal * 0.18);
    const total = subtotal + taxes;

    const overlay = document.createElement('div');
    overlay.className = 'receipt-overlay';
    const receipt = document.createElement('div');
    receipt.className = 'receipt-container';

    receipt.innerHTML = `
        <button id="closeReceipt" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
        <div class="success-checkmark"></div>
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #d4af37; padding-bottom: 15px;">
            <h2 style="color: #2c3e50; margin-bottom: 5px;">Payment Receipt</h2>
            <p style="color: #666;">Transaction ID: ${paymentId}</p>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div>
                <p style="font-weight: bold; margin-bottom: 5px;">Luxora Car Rental</p>
                <p>123 Main Street</p>
                <p>New Delhi, India 110001</p>
                <p>GST: 07AABCU9603R1ZX</p>
            </div>
            <div style="text-align: right;">
                <p style="font-weight: bold; margin-bottom: 5px;">Invoice to:</p>
                <p>John Doe</p>
                <p>john.doe@example.com</p>
                <p>+91 98765 43210</p>
            </div>
        </div>
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="font-weight: bold;">Booking ID:</span>
                <span>LUX-2025042-867</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="font-weight: bold;">Payment Date:</span>
                <span>${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="font-weight: bold;">Payment Method:</span>
                <span>Razorpay</span>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse;荣耀-bottom: 20px;">
            <thead>
                <tr style="background-color: #f8f9fa;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">Car Rental (3 days)</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹36,000.00</td>
                </tr>
                ${selectedServicesHTML}
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee;">Taxes & Fees (18% GST)</td>
                    <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹${taxes.toLocaleString('en-IN')}.00</td>
                </tr>
            </tbody>
            <tfoot>
                <tr style="font-weight: bold;">
                    <td style="padding: 10px;">Total</td>
                    <td style="padding: 10px; text-align: right;">₹${total.toLocaleString('en-IN')}.00</td>
                </tr>
            </tfoot>
        </table>
        <div style="text-align: center; margin-top: 30px; color: #666;">
            <p>Thank you for choosing Luxora Car Rental!</p>
            <p style="margin Jonah: 12px;">This is a computer-generated receipt and does not require a signature.</p>
        </div>
    `;

    overlay.appendChild(receipt);
    document.body.appendChild(overlay);

    // Trigger animations
    createConfetti();
    const checkmark = receipt.querySelector('.success-checkmark');
    checkmark.style.display = 'block'; // Ensure checkmark is visible

    // Redirect to homepage on close or overlay click
    document.getElementById('closeReceipt').addEventListener('click', () => {
        window.location.href = '/home';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            window.location.href = '/home';
        }
    });

};

document.addEventListener('DOMContentLoaded', () => {
    setupBooking();
    const proceedButton = document.querySelector('#proceedToPayment');
    if (proceedButton) {
        proceedButton.addEventListener('click', submitFormDataAndPay);
    }
});