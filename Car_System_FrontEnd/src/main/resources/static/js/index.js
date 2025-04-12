// Get references to all necessary elements
const loginForm = document.getElementById('loginForm');
const registrationForm = document.getElementById('registrationForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailStep = document.getElementById('emailStep');
const otpStep = document.getElementById('otpStep');
const passwordResetStep = document.getElementById('passwordResetStep');

// Form elements
const sendOtpBtn = document.getElementById('sendOtpBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');
const loginLink = document.getElementById('loginLink');
const registerLink = document.getElementById('registerLink');
const backToLoginLink = document.getElementById('backToLoginLink');

// Show login form
function showLoginForm() {
    loginForm.style.display = 'block';
    registrationForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';
    emailStep.style.display = 'block';
    otpStep.style.display = 'none';
    passwordResetStep.style.display = 'none';
}

// Show registration form
function showRegistrationForm() {
    loginForm.style.display = 'none';
    registrationForm.style.display = 'block';
    forgotPasswordForm.style.display = 'none';
}

// Show forgot password form
function showForgotPasswordForm() {
    loginForm.style.display = 'none';
    registrationForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
    emailStep.style.display = 'block';
    otpStep.style.display = 'none';
    passwordResetStep.style.display = 'none';
}

// Show OTP verification step
function showOtpStep() {
    emailStep.style.display = 'none';
    otpStep.style.display = 'block';
    passwordResetStep.style.display = 'none';
    
    // Copy email to readonly field
    const email = document.getElementById('forgotEmail').value;
    document.getElementById('otpEmail').value = email;
}

// Show password reset step
function showPasswordResetStep() {
    passwordResetStep.style.display = 'block';
    otpStep.style.display = 'none';
    
    // Copy email to readonly field
    const email = document.getElementById('otpEmail').value;
    document.getElementById('resetEmail').value = email;
}

// Add event listeners to change forms
loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLoginForm();
});

registerLink.addEventListener('click', function(e) {
    e.preventDefault();
    showRegistrationForm();
});

backToLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    showLoginForm();
});

document.getElementById('forgotPasswordLink').addEventListener('click', function(e) {
    e.preventDefault();
    showForgotPasswordForm();
});

// Form validation functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    return password.length >= 8;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    document.getElementById(elementId.replace('Error', '')).classList.add('error');
}

function hideError(elementId) {
    document.getElementById(elementId).style.display = 'none';
    document.getElementById(elementId.replace('Error', '')).classList.remove('error');
}

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('btn-loading');
    } else {
        button.classList.remove('btn-loading');
    }
}

// Event for sending OTP
sendOtpBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    
    // Validate form
    const email = document.getElementById('forgotEmail').value;
    let isValid = true;
    
    if (!email || !validateEmail(email)) {
        showError('forgotEmailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('forgotEmailError');
    }
    
    if (!isValid) return;
    
    // Show loading state
    setButtonLoading(sendOtpBtn, true);

    try {
        const response = await fetch('/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            showOtpStep();
        } else {
            showError('forgotEmailError', data.message || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('forgotEmailError', 'Network error. Please try again later.');
    } finally {
        setButtonLoading(sendOtpBtn, false);
    }
});

// Event for verifying OTP
verifyOtpBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    
    // Validate form
    const email = document.getElementById('otpEmail').value;
    const otp = document.getElementById('otpInput').value;
    let isValid = true;
    
    if (!otp || otp.trim() === '') {
        showError('otpError', 'Please enter the verification code');
        isValid = false;
    } else {
        // hideError('otpError');
    }
    
    if (!isValid) return;
    
    // Show loading state
    setButtonLoading(verifyOtpBtn, true);

    try {
        const response = await fetch('/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp })
        });

        const data = await response.json();

        if (response.ok) {
            showPasswordResetStep();
        } else {
            showError('otpError', data.message || 'Invalid verification code. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('otpError', 'Network error. Please try again later.');
    } finally {
        setButtonLoading(verifyOtpBtn, false);
    }
});

// Event for resetting password
resetPasswordBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    
    // Validate form
    const email = document.getElementById('resetEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmResetPassword').value;
    let isValid = true;
    
    if (!newPassword) {
        showError('newPasswordError', 'Please enter a new password');
        isValid = false;
    } else if (!validatePassword(newPassword)) {
        showError('newPasswordError', 'Password must be at least 8 characters');
        isValid = false;
    } else {
        hideError('newPasswordError');
    }
    
    if (!confirmPassword) {
        showError('confirmResetPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (newPassword !== confirmPassword) {
        showError('confirmResetPasswordError', 'Passwords do not match');
        isValid = false;
    } else {
        hideError('confirmResetPasswordError');
    }
    
    if (!isValid) return;
    
    // Show loading state
    setButtonLoading(resetPasswordBtn, true);

    try {
        const response = await fetch('/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Password reset successful! Please login with your new password.');
            showLoginForm();
        } else {
            showError('newPasswordError', data.message || 'Error resetting password. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('newPasswordError', 'Network error. Please try again later.');
    } finally {
        setButtonLoading(resetPasswordBtn, false);
    }
});

// Login form submission handling
const loginFormSubmit = document.getElementById('loginFormSubmit');
loginFormSubmit.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    let isValid = true;
    
    if (!email || !validateEmail(email)) {
        showError('loginEmailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('loginEmailError');
    }
    
    if (!password) {
        showError('loginPasswordError', 'Please enter your password');
        isValid = false;
    } else {
        hideError('loginPasswordError');
    }
    
    if (!isValid) return;
    
    // Show loading state
    const loginButton = loginFormSubmit.querySelector('button[type="submit"]');
    setButtonLoading(loginButton, true);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = "/home";
        } else {
            showError('loginEmailError', data.message || 'Invalid email or password');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('loginEmailError', 'Network error. Please try again later.');
    } finally {
        setButtonLoading(loginButton, false);
    }
});

// Registration form submission handling
const registrationFormSubmit = document.getElementById('registrationFormSubmit');
registrationFormSubmit.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('registerEmail').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const streetAddress = document.getElementById('streetAddress').value;
    const country = document.getElementById('country').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    let isValid = true;
    
    if (!firstName) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    } else {
        hideError('firstNameError');
    }
    
    if (!lastName) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    } else {
        hideError('lastNameError');
    }
    
    if (!email || !validateEmail(email)) {
        showError('registerEmailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('registerEmailError');
    }
    
    if (!phoneNumber) {
        showError('phoneNumberError', 'Phone number is required');
        isValid = false;
    } else {
        hideError('phoneNumberError');
    }
    
    if (!streetAddress) {
        showError('streetAddressError', 'Street address is required');
        isValid = false;
    } else {
        hideError('streetAddressError');
    }
    
    if (!country) {
        showError('countryError', 'Country is required');
        isValid = false;
    } else {
        hideError('countryError');
    }
    
    if (!password) {
        showError('registerPasswordError', 'Please create a password');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('registerPasswordError', 'Password must be at least 8 characters');
        isValid = false;
    } else {
        hideError('registerPasswordError');
    }
    
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isValid = false;
    } else {
        hideError('confirmPasswordError');
    }
    
    if (!isValid) return;
    
    // Show loading state
    const registerButton = registrationFormSubmit.querySelector('button[type="submit"]');
    setButtonLoading(registerButton, true);

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                firstName, 
                lastName, 
                email, 
                phoneNumber, 
                streetAddress, 
                country, 
                password 
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please login to continue.');
            showLoginForm();
        } else {
            showError('registerEmailError', data.message || 'Error during registration. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('registerEmailError', 'Network error. Please try again later.');
    } finally {
        setButtonLoading(registerButton, false);
    }
});