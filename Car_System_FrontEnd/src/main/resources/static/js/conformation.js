document.addEventListener('DOMContentLoaded', function () {
    const additionalServicesSection = document.createElement('div');
    additionalServicesSection.innerHTML = document.querySelector('.additional-services').outerHTML;

    // Insert the additional services section before the price summary
    const priceSummary = document.querySelector('.price-summary');
    priceSummary.parentNode.insertBefore(additionalServicesSection.firstChild, priceSummary);

    // Remove the original template
    const originalTemplate = document.querySelector('.additional-services');
    if (originalTemplate) {
        originalTemplate.remove();
    }

    // Setup event listeners for checkboxes
    const checkboxes = document.querySelectorAll('.service-checkbox input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePriceSummary);
    });

    // Initialize price summary
    updatePriceSummary();

    // Function to update price summary
    function updatePriceSummary() {
        // Base values
        const baseRate = 36000;
        const taxRate = 0.18; // 18% GST

        // Get selected additional services
        let selectedServices = [];
        let additionalTotal = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseInt(checkbox.dataset.price);
                const name = checkbox.parentElement.querySelector('.service-name').textContent;
                selectedServices.push({ name, price });
                additionalTotal += price;
            }
        });

        // Calculate subtotal and taxes
        const subtotal = baseRate + additionalTotal;
        const taxes = subtotal * taxRate;
        const total = subtotal + taxes;

        // Update price summary HTML
        const priceSummaryHTML = `
                    <h3 style="margin-bottom: 15px;">Price Summary</h3>
                    <div class="price-row">
                        <span>Base Rate (3 days x ₹12,000)</span>
                        <span><span class="rupee">₹</span>${baseRate.toLocaleString('en-IN')}.00</span>
                    </div>
                    ${selectedServices.map(service => `
                        <div class="price-row">
                            <span>${service.name}</span>
                            <span><span class="rupee">₹</span>${service.price.toLocaleString('en-IN')}.00</span>
                        </div>
                    `).join('')}
                    <div class="price-row">
                        <span>Taxes & Fees (18% GST)</span>
                        <span><span class="rupee">₹</span>${Math.round(taxes).toLocaleString('en-IN')}.00</span>
                    </div>
                    <div class="price-row total">
                        <span>Total</span>
                        <span><span class="rupee">₹</span>${Math.round(total).toLocaleString('en-IN')}.00</span>
                    </div>
                `;

        document.querySelector('.price-summary').innerHTML = priceSummaryHTML;

        // Update the payment button and timer with the new total
        const paymentButton = document.getElementById('proceedToPayment');
        if (paymentButton) {
            paymentButton.dataset.amount = Math.round(total);
        }
    }

    // Override the Razorpay initialization to use the dynamic amount
    const originalProceedToPayment = document.getElementById('proceedToPayment').onclick;
    document.getElementById('proceedToPayment').onclick = function () {
        // Show loading screen
        document.querySelector('.loading').style.display = 'flex';

        // Simulate API delay
        setTimeout(() => {
            // Hide loading
            document.querySelector('.loading').style.display = 'none';

            // Get the current total from the button's data attribute
            const currentTotal = parseInt(this.dataset.amount) || 5581400; // Fallback to original amount

            // Initialize Razorpay with dynamic amount
            const options = {
                key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay test key
                amount: currentTotal * 100, // Amount in paise
                currency: "INR",
                name: "Luxora Car Rental",
                description: "Mercedes-Benz E-Class Rental",
                image: "/api/placeholder/60/60", // Company logo
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9876543210"
                },
                theme: {
                    color: "#d4af37" // Gold accent
                },
                modal: {
                    ondismiss: function () {
                        console.log("Payment cancelled");
                    }
                },
                handler: function (response) {
                    // Show loading screen
                    document.querySelector('.loading').style.display = 'flex';

                    // Simulate payment verification
                    setTimeout(() => {
                        document.querySelector('.loading').style.display = 'none';
                        paymentSuccess(response.razorpay_payment_id);
                    }, 1500);
                }
            };

            const razorpayObject = new Razorpay(options);
            razorpayObject.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
            });
            razorpayObject.open();
        }, 1000);
    };

    // Update the generateReceipt function to include dynamic services
    window.generateReceipt = function (paymentId) {
        // Get selected services for receipt
        let selectedServicesHTML = '';
        let serviceTotal = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const price = parseInt(checkbox.dataset.price);
                const name = checkbox.parentElement.querySelector('.service-name').textContent;
                selectedServicesHTML += `
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹${price.toLocaleString('en-IN')}.00</td>
                            </tr>
                        `;
                serviceTotal += price;
            }
        });

        // Calculate totals
        const baseRate = 36000;
        const subtotal = baseRate + serviceTotal;
        const taxes = subtotal * 0.18;
        const total = subtotal + taxes;

        // Create a receipt overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
        overlay.style.zIndex = '1000';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';

        const receipt = document.createElement('div');
        receipt.style.backgroundColor = 'white';
        receipt.style.padding = '30px';
        receipt.style.borderRadius = '8px';
        receipt.style.width = '90%';
        receipt.style.maxWidth = '600px';
        receipt.style.position = 'relative';
        receipt.style.maxHeight = '80vh';
        receipt.style.overflow = 'auto';

        receipt.innerHTML = `
                    <button id="closeReceipt" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
                    
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
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr style="background-color: #f8f9fa;">
                                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
                                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">Mercedes-Benz E-Class Rental (3 days)</td>
                                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹36,000.00</td>
                            </tr>
                            ${selectedServicesHTML}
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">Taxes & Fees (18% GST)</td>
                                <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹${Math.round(taxes).toLocaleString('en-IN')}.00</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr style="font-weight: bold;">
                                <td style="padding: 10px;">Total</td>
                                <td style="padding: 10px; text-align: right;">₹${Math.round(total).toLocaleString('en-IN')}.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <div style="text-align: center; margin-top: 30px; color: #666;">
                        <p>Thank you for choosing Luxora Car Rental!</p>
                        <p style="margin-top: 10px; font-size: 12px;">This is a computer-generated receipt and does not require a signature.</p>
                    </div>
                `;

        overlay.appendChild(receipt);
        document.body.appendChild(overlay);

        // Add event listener to close button
        document.getElementById('closeReceipt').addEventListener('click', function () {
            document.body.removeChild(overlay);
        });
    };
});


// Timer countdown functionality
let minutes = 14;
let seconds = 59;

function updateCountdown() {
    document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timerInterval);
            alert('Your reservation time has expired. Please start a new booking.');
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
}

const timerInterval = setInterval(updateCountdown, 1000);

// Razorpay Integration
document.getElementById('proceedToPayment').addEventListener('click', function () {
    // Show loading screen
    document.querySelector('.loading').style.display = 'flex';

    // Simulate API delay
    setTimeout(() => {
        // Hide loading
        document.querySelector('.loading').style.display = 'none';

        // Initialize Razorpay
        const options = {
            key: "rzp_test_1DP5mmOlF5G5ag", // Replace with your Razorpay test key
            amount: 5581400, // Amount in paise (₹55,814.00)
            currency: "INR",
            name: "Luxora Car Rental",
            description: "Mercedes-Benz E-Class Rental",
            image: "/api/placeholder/60/60", // Company logo
            prefill: {
                name: "John Doe",
                email: "john.doe@example.com",
                contact: "9876543210"
            },
            theme: {
                color: "#d4af37" // Gold accent
            },
            modal: {
                ondismiss: function () {
                    console.log("Payment cancelled");
                }
            },
            handler: function (response) {
                // Show loading screen
                document.querySelector('.loading').style.display = 'flex';

                // Simulate payment verification
                setTimeout(() => {
                    document.querySelector('.loading').style.display = 'none';
                    paymentSuccess(response.razorpay_payment_id);
                }, 1500);
            }
        };

        const razorpayObject = new Razorpay(options);
        razorpayObject.on('payment.failed', function (response) {
            alert("Payment Failed: " + response.error.description);
        });
        razorpayObject.open();
    }, 1000);
});

// Payment success function
function paymentSuccess(paymentId) {
    // Update UI
    document.querySelector('.confirmation-header p').textContent = 'Your reservation is confirmed and paid';
    document.querySelector('.payment-timer').style.display = 'none';

    // Show success animation
    document.querySelector('.success-checkmark').style.display = 'block';

    // Update button
    const paymentButton = document.getElementById('proceedToPayment');
    paymentButton.textContent = 'View Receipt';
    paymentButton.onclick = function () {
        generateReceipt(paymentId);
    };

    // Confetti animation
    createConfetti();
}

// Create confetti animation
function createConfetti() {
    const confettiCount = 200;
    const container = document.querySelector('body');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '1000';
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = Math.random() * 8 + 5 + 'px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.borderRadius = '50%';
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = 'scale(' + Math.random() + ')';
        confetti.style.animation = 'fall ' + (Math.random() * 3 + 3) + 's linear';

        container.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

// Helper function to get random color
function getRandomColor() {
    const colors = ['#d4af37', '#2c3e50', '#3498db', '#2ecc71', '#e67e22'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Generate receipt
function generateReceipt(paymentId) {
    // Create a receipt overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    const receipt = document.createElement('div');
    receipt.style.backgroundColor = 'white';
    receipt.style.padding = '30px';
    receipt.style.borderRadius = '8px';
    receipt.style.width = '90%';
    receipt.style.maxWidth = '600px';
    receipt.style.position = 'relative';
    receipt.style.maxHeight = '80vh';
    receipt.style.overflow = 'auto';

    receipt.innerHTML = `
                <button id="closeReceipt" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 20px; cursor: pointer;">×</button>
                
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
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background-color: #f8f9fa;">
                            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Description</th>
                            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">Mercedes-Benz E-Class Rental (3 days)</td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹36,000.00</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">Insurance (Premium)</td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹7,500.00</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">GPS Navigation</td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹2,000.00</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">Additional Driver</td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹1,800.00</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">Taxes & Fees (18% GST)</td>
                            <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">₹8,514.00</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: bold;">
                            <td style="padding: 10px;">Total</td>
                            <td style="padding: 10px; text-align: right;">₹55,814.00</td>
                        </tr>
                    </tfoot>
                </table>
                
                <div style="text-align: center; margin-top: 30px; color: #666;">
                    <p>Thank you for choosing Luxora Car Rental!</p>
                    <p style="margin-top: 10px; font-size: 12px;">This is a computer-generated receipt and does not require a signature.</p>
                </div>
            `;

    overlay.appendChild(receipt);
    document.body.appendChild(overlay);

    // Add event listener to close button
    document.getElementById('closeReceipt').addEventListener('click', function () {
        document.body.removeChild(overlay);
    });
}

// Add fall animation for confetti
const style = document.createElement('style');
style.innerHTML = `
        @keyframes fall {
            0% {
                top: -10px;
                transform: translateX(0) rotate(0deg);
            }
            100% {
                top: 100vh;
                transform: translateX(100px) rotate(360deg);
            }
        }`;
document.head.appendChild(style);


// This is a simulation of the Razorpay SDK for demo purposes
class Razorpay {
    constructor(options) {
        this.options = options;
        this.callbacks = {};
    }

    on(event, callback) {
        this.callbacks[event] = callback;
    }

    open() {
        // Simulate a payment modal
        console.log("Opening payment modal with options:", this.options);

        // Create a simple mock payment modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.zIndex = '2000';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        const content = document.createElement('div');
        content.style.backgroundColor = 'white';
        content.style.padding = '30px';
        content.style.borderRadius = '8px';
        content.style.width = '90%';
        content.style.maxWidth = '400px';

        content.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid ${this.options.theme.color}; padding-bottom: 15px;">
            <h2 style="margin-bottom: 10px;">Simulated Payment</h2>
            <p style="color: #666;">This is a simulated Razorpay payment interface</p>
        </div>

        <div style="margin-bottom: 20px;">
            <p><strong>Amount:</strong> ₹${(this.options.amount / 100).toLocaleString('en-IN')}</p>
            <p><strong>Name:</strong> ${this.options.prefill.name}</p>
            <p><strong>Email:</strong> ${this.options.prefill.email}</p>
        </div>

        <div style="display: flex; justify-content: space-between;">
            <button id="cancelPayment" style="background-color: #f1f1f1; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Cancel</button>
            <button id="completePayment" style="background-color: ${this.options.theme.color}; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Complete Payment</button>
        </div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Add event listeners
        document.getElementById('cancelPayment').addEventListener('click', () => {
            document.body.removeChild(modal);
            if (this.options.modal.ondismiss) {
                this.options.modal.ondismiss();
            }
        });

        document.getElementById('completePayment').addEventListener('click', () => {
            document.body.removeChild(modal);

            // Simulate successful payment
            const response = {
                razorpay_payment_id: 'pay_' + Math.random().toString(36).substr(2, 9)
            };

            this.options.handler(response);
        });
    }
}
