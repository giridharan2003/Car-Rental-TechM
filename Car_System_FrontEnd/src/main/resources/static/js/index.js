document.addEventListener('DOMContentLoaded', function() {

    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    const registerLink = document.getElementById('registerLink');
    const loginLink = document.getElementById('loginLink');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginLink = document.getElementById('backToLoginLink');
    
    const emailStep = document.getElementById('emailStep');
    const otpStep = document.getElementById('otpStep');
    const passwordResetStep = document.getElementById('passwordResetStep');
    
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const verifyOtpBtn = document.getElementById('verifyOtpBtn');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');

    // Handle URL routing based on hash
    function handleRouting() {
        const hash = window.location.hash.substring(1);
        
        // Hide all forms first
        loginForm.style.display = 'none';
        registrationForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
        
        // Show the appropriate form based on the hash
        switch(hash) {
            case 'register':
                registrationForm.style.display = 'block';
                break;
            case 'forgot-password':
                forgotPasswordForm.style.display = 'block';
                emailStep.style.display = 'block';
                otpStep.style.display = 'none';
                passwordResetStep.style.display = 'none';
                break;
            default:
                loginForm.style.display = 'block';
                break;
        }
    }

    // Initial routing
    handleRouting();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleRouting);
    
    // Navigation event listeners
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = 'register';
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = 'login';
    });
    
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = 'forgot-password';
    });
    
    backToLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = 'login';
    });
    
    // Validation functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validatePassword(password) {
        return password.length >= 8;
    }
    
    // Login form handling with fetch/await
    const loginFormSubmit = document.getElementById('loginFormSubmit');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    
    loginFormSubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        let isValid = true;
        
        if (!validateEmail(loginEmail.value)) {
            loginEmail.classList.add('error');
            loginEmailError.style.display = 'block';
            isValid = false;
        } else {
            loginEmail.classList.remove('error');
            loginEmailError.style.display = 'none';
        }
        
        if (!validatePassword(loginPassword.value)) {
            loginPassword.classList.add('error');
            loginPasswordError.style.display = 'block';
            isValid = false;
        } else {
            loginPassword.classList.remove('error');
            loginPasswordError.style.display = 'none';
        }
        
        if (isValid) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.classList.add('btn-loading');
            
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: loginEmail.value,
                        password: loginPassword.value,
                        rememberMe: document.getElementById('rememberMe').checked
                    }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Login successful!');
                    // Redirect or update UI as needed
                } else {
                    alert(data.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                submitBtn.classList.remove('btn-loading');
            }
        }
    });
    
    // Registration form handling with fetch/await
    const registrationFormSubmit = document.getElementById('registrationFormSubmit');
    
    registrationFormSubmit.addEventListener('submit', async function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validate first name
        if (!document.getElementById('firstName').value) {
            document.getElementById('firstName').classList.add('error');
            document.getElementById('firstNameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('firstName').classList.remove('error');
            document.getElementById('firstNameError').style.display = 'none';
        }
        
        // Validate last name
        if (!document.getElementById('lastName').value) {
            document.getElementById('lastName').classList.add('error');
            document.getElementById('lastNameError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('lastName').classList.remove('error');
            document.getElementById('lastNameError').style.display = 'none';
        }
        
        // Validate email
        if (!validateEmail(document.getElementById('registerEmail').value)) {
            document.getElementById('registerEmail').classList.add('error');
            document.getElementById('registerEmailError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('registerEmail').classList.remove('error');
            document.getElementById('registerEmailError').style.display = 'none';
        }
        
        // Validate password
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!validatePassword(password)) {
            document.getElementById('registerPassword').classList.add('error');
            document.getElementById('registerPasswordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('registerPassword').classList.remove('error');
            document.getElementById('registerPasswordError').style.display = 'none';
        }
        
        // Validate password confirmation
        if (password !== confirmPassword) {
            document.getElementById('confirmPassword').classList.add('error');
            document.getElementById('confirmPasswordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('confirmPassword').classList.remove('error');
            document.getElementById('confirmPasswordError').style.display = 'none';
        }
        
        // Validate terms agreement
        if (!document.getElementById('termsAgree').checked) {
            isValid = false;
            alert('You must agree to the terms and conditions');
        }
        
        if (isValid) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.classList.add('btn-loading');
            
            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: document.getElementById('firstName').value,
                        lastName: document.getElementById('lastName').value,
                        email: document.getElementById('registerEmail').value,
                        phoneNumber: document.getElementById('phoneNumber').value,
                        streetAddress: document.getElementById('streetAddress').value,
                        country: document.getElementById('country').value,
                        password: password
                    }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Registration successful!');
                    window.location.hash = 'login';
                } else {
                    alert(data.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                submitBtn.classList.remove('btn-loading');
            }
        }
    });
    
    // Forgot Password flow with fetch/await
    sendOtpBtn.addEventListener('click', async function() {
        const email = document.getElementById('forgotEmail').value;
        
        if (!validateEmail(email)) {
            document.getElementById('forgotEmail').classList.add('error');
            document.getElementById('forgotEmailError').style.display = 'block';
            return;
        } else {
            document.getElementById('forgotEmail').classList.remove('error');
            document.getElementById('forgotEmailError').style.display = 'none';
        }
        
        this.classList.add('btn-loading');
        
        try {
            const response = await fetch('/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                emailStep.style.display = 'none';
                otpStep.style.display = 'block';
            } else {
                alert(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            this.classList.remove('btn-loading');
        }
    });
    
    verifyOtpBtn.addEventListener('click', async function() {
        const otp = document.getElementById('otpInput').value;
        
        if (otp.length !== 6 || isNaN(otp)) {
            document.getElementById('otpInput').classList.add('error');
            document.getElementById('otpError').style.display = 'block';
            return;
        } else {
            document.getElementById('otpInput').classList.remove('error');
            document.getElementById('otpError').style.display = 'none';
        }
        
        this.classList.add('btn-loading');
        
        try {
            const response = await fetch('/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: document.getElementById('forgotEmail').value,
                    otp: otp
                }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                otpStep.style.display = 'none';
                passwordResetStep.style.display = 'block';
            } else {
                alert(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            this.classList.remove('btn-loading');
        }
    });
    
    resetPasswordBtn.addEventListener('click', async function() {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmResetPassword').value;
        let isValid = true;
        
        if (!validatePassword(newPassword)) {
            document.getElementById('newPassword').classList.add('error');
            document.getElementById('newPasswordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('newPassword').classList.remove('error');
            document.getElementById('newPasswordError').style.display = 'none';
        }
        
        if (newPassword !== confirmPassword) {
            document.getElementById('confirmResetPassword').classList.add('error');
            document.getElementById('confirmResetPasswordError').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('confirmResetPassword').classList.remove('error');
            document.getElementById('confirmResetPasswordError').style.display = 'none';
        }
        
        if (isValid) {
            this.classList.add('btn-loading');
            
            try {
                const response = await fetch('/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: document.getElementById('forgotEmail').value,
                        password: newPassword
                    }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Password reset successful!');
                    window.location.hash = 'login';
                } else {
                    alert(data.message || 'Password reset failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                this.classList.remove('btn-loading');
            }
        }
    });
});