// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or use preferred color scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', function() {
  document.body.classList.toggle('dark');
  
  if (document.body.classList.contains('dark')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
});

// Form handling
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const otpForm = document.getElementById('otpForm');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLogin = document.getElementById('backToLogin');
const backToForgotPassword = document.getElementById('backToForgotPassword');
const loadingScreen = document.getElementById('loadingScreen');

// Switch to forgot password form
forgotPasswordLink.addEventListener('click', function(e) {
  e.preventDefault();
  loginForm.classList.remove('visible');
  loginForm.classList.add('hidden');
  forgotPasswordForm.classList.remove('hidden');
  forgotPasswordForm.classList.add('visible');
});

// Switch back to login form
backToLogin.addEventListener('click', function(e) {
  e.preventDefault();
  forgotPasswordForm.classList.remove('visible');
  forgotPasswordForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  loginForm.classList.add('visible');
});

// Switch from OTP to forgot password
backToForgotPassword.addEventListener('click', function(e) {
  e.preventDefault();
  otpForm.classList.remove('visible');
  otpForm.classList.add('hidden');
  forgotPasswordForm.classList.remove('hidden');
  forgotPasswordForm.classList.add('visible');
});

// Forgot password form submission
forgotPasswordForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('forgotEmail').value;
  
  // Here you would normally send the email and get OTP
  // For demo, we'll just show the OTP form
  forgotPasswordForm.classList.remove('visible');
  forgotPasswordForm.classList.add('hidden');
  otpForm.classList.remove('hidden');
  otpForm.classList.add('visible');
  
  // Auto-focus first OTP input
  document.querySelector('.otp-input').focus();
});

// OTP input handling
const otpInputs = document.querySelectorAll('.otp-input');
otpInputs.forEach((input, index) => {
  input.addEventListener('input', function() {
    if (this.value.length === 1) {
      if (index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    }
  });
  
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && this.value.length === 0) {
      if (index > 0) {
        otpInputs[index - 1].focus();
      }
    }
  });
});

// OTP form submission
otpForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Here you would verify the OTP
  // For demo, we'll just reset the forms
  otpForm.classList.remove('visible');
  otpForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  loginForm.classList.add('visible');
  
  // Show success message (in a real app, you'd redirect to password reset)
  alert('OTP verified! Please check your email for password reset instructions.');
});

// Login form submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Show loading screen with car animation
  loadingScreen.classList.remove('hidden');
  
  // Simulate login process (2 seconds)
  setTimeout(function() {
    // Redirect to dashboard (in a real app, you'd verify credentials first)
    window.location.href = '/admin/dashboard';
  }, 2000);
});