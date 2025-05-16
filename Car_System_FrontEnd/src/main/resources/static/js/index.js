// Notification display
function showNotification(message) {
    let container = document.querySelector('.notification-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
        notification.remove();
        if (container.children.length === 0) {
            container.remove();
        }
    }, 3000);
}

// Element references
const elements = {
    loginForm: document.getElementById('loginForm'),
    registrationForm: document.getElementById('registrationForm'),
    forgotPasswordForm: document.getElementById('forgotPasswordForm'),
    emailStep: document.getElementById('emailStep'),
    otpStep: document.getElementById('otpStep'),
    passwordResetStep: document.getElementById('passwordResetStep'),
    sendOtpBtn: document.getElementById('sendOtpBtn'),
    verifyOtpBtn: document.getElementById('verifyOtpBtn'),
    resetPasswordBtn: document.getElementById('resetPasswordBtn'),
    loginLink: document.getElementById('loginLink'),
    registerLink: document.getElementById('registerLink'),
    backToLoginLink: document.getElementById('backToLoginLink'),
    forgotPasswordLink: document.getElementById('forgotPasswordLink'),
    loginFormSubmit: document.getElementById('loginFormSubmit'),
    registrationFormSubmit: document.getElementById('registrationFormSubmit')
};

// Form visibility
function showLoginForm() {
    elements.loginForm.style.display = 'block';
    elements.registrationForm.style.display = 'none';
    elements.forgotPasswordForm.style.display = 'none';
    elements.emailStep.style.display = 'block';
    elements.otpStep.style.display = 'none';
    elements.passwordResetStep.style.display = 'none';
}

function showRegistrationForm() {
    elements.loginForm.style.display = 'none';
    elements.registrationForm.style.display = 'block';
    elements.forgotPasswordForm.style.display = 'none';
}

function showForgotPasswordForm() {
    elements.loginForm.style.display = 'none';
    elements.registrationForm.style.display = 'none';
    elements.forgotPasswordForm.style.display = 'block';
    elements.emailStep.style.display = 'block';
    elements.otpStep.style.display = 'none';
    elements.passwordResetStep.style.display = 'none';
}

function showOtpStep() {
    elements.emailStep.style.display = 'none';
    elements.otpStep.style.display = 'block';
    elements.passwordResetStep.style.display = 'none';
    const email = document.getElementById('forgotEmail').value;
    document.getElementById('otpEmail').value = email;
}

function showPasswordResetStep() {
    elements.passwordResetStep.style.display = 'block';
    elements.otpStep.style.display = 'none';
    const email = document.getElementById('otpEmail').value;
    document.getElementById('resetEmail').value = email;
}

// Validation
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
    button.classList.toggle('btn-loading', isLoading);
}

// Event handlers
async function handleSendOtp(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    
    if (!validateEmail(email)) {
        showError('forgotEmailError', 'Please enter a valid email address');
        return;
    }
    hideError('forgotEmailError');
    
    setButtonLoading(elements.sendOtpBtn, true);
    try {
        const response = await fetch('/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        setButtonLoading(elements.sendOtpBtn, false);
    }
}

async function handleVerifyOtp(e) {
    e.preventDefault();
    const email = document.getElementById('otpEmail').value;
    const otp = document.getElementById('otpInput').value;
    
    if (!otp.trim()) {
        showError('otpError', 'Please enter the verification code');
        return;
    }
    
    setButtonLoading(elements.verifyOtpBtn, true);
    try {
        const response = await fetch('/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
        setButtonLoading(elements.verifyOtpBtn, false);
    }
}

async function handleResetPassword(e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmResetPassword').value;
    
    let isValid = true;
    if (!newPassword || !validatePassword(newPassword)) {
        showError('newPasswordError', newPassword ? 'Password must be at least 8 characters' : 'Please enter a new password');
        isValid = false;
    } else {
        hideError('newPasswordError');
    }
    
    if (!confirmPassword || newPassword !== confirmPassword) {
        showError('confirmResetPasswordError', confirmPassword ? 'Passwords do not match' : 'Please confirm your password');
        isValid = false;
    } else {
        hideError('confirmResetPasswordError');
    }
    
    if (!isValid) return;
    
    setButtonLoading(elements.resetPasswordBtn, true);
    try {
        const response = await fetch('/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword })
        });
        const data = await response.json();
        
        if (response.ok) {
            showNotification("Password reset successful! Please login with your new password.");
            showLoginForm();
        } else {
            showError('newPasswordError', "Invalid Password");
        }
    } catch (error) {
        console.error('Error:', error);
        showError('newPasswordError', 'Network error. Please try again later.');
    } finally {
        setButtonLoading(elements.resetPasswordBtn, false);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    let isValid = true;
    if (!validateEmail(email)) {
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
    
    const loginButton = elements.loginFormSubmit.querySelector('button[type="submit"]');
    setButtonLoading(loginButton, true);
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (response.ok) {
            // localStorage.setItem("UserKey",data.token);
            document.cookie = `token=${data.token}; path=/`;
            
            window.location.href = "/home";
        } else {
            showError('loginEmailError', 'Invalid email or password');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('loginEmailError', 'Network error. Please try again later.');
    } finally {
        setButtonLoading(loginButton, false);
    }
}

async function handleRegistration(e) {
    e.preventDefault();
    const fields = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('registerEmail').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        streetAddress: document.getElementById('streetAddress').value,
        password: document.getElementById('registerPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    
    let isValid = true;
    if (!fields.firstName) {
        showError('firstNameError', 'First name is required');
        isValid = false;
    } else {
        hideError('firstNameError');
    }
    
    if (!fields.lastName) {
        showError('lastNameError', 'Last name is required');
        isValid = false;
    } else {
        hideError('lastNameError');
    }
    
    if (!validateEmail(fields.email)) {
        showError('registerEmailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError('registerEmailError');
    }
    
    if (!fields.phoneNumber) {
        showError('phoneNumberError', 'Phone number is required');
        isValid = false;
    } else {
        hideError('phoneNumberError');
    }
    
    if (!fields.streetAddress) {
        showError('streetAddressError', 'Street address is required');
        isValid = false;
    } else {
        hideError('streetAddressError');
    }
    
    if (!fields.password || !validatePassword(fields.password)) {
        showError('registerPasswordError', fields.password ? 'Password must be at least 8 characters' : 'Please create a password');
        isValid = false;
    } else {
        hideError('registerPasswordError');
    }
    
    if (!fields.confirmPassword || fields.password !== fields.confirmPassword) {
        showError('confirmPasswordError', fields.confirmPassword ? 'Passwords do not match' : 'Please confirm your password');
        isValid = false;
    } else {
        hideError('confirmPasswordError');
    }
    
    if (!isValid) return;
    
    const registerButton = elements.registrationFormSubmit.querySelector('button[type="submit"]');
    setButtonLoading(registerButton, true);
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: fields.email,
                password: fields.password,
                firstName: fields.firstName,
                lastName: fields.lastName,
                phone: fields.phoneNumber,
                address: fields.streetAddress
            })
        });
        const data = await response.json();
        
        if (response.ok) {
            showNotification("Registration successful! Please login to continue.");
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
}

// Event listeners
elements.loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

elements.registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegistrationForm();
});

elements.backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

elements.forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    showForgotPasswordForm();
});

elements.sendOtpBtn.addEventListener('click', handleSendOtp);
elements.verifyOtpBtn.addEventListener('click', handleVerifyOtp);
elements.resetPasswordBtn.addEventListener('click', handleResetPassword);
elements.loginFormSubmit.addEventListener('submit', handleLogin);
elements.registrationFormSubmit.addEventListener('submit', handleRegistration);