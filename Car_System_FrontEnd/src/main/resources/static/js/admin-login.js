// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
  document.body.classList.add('dark');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', function () {
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
// const forgotPasswordForm = document.getElementById('forgotPasswordForm');
// const otpForm = document.getElementById('otpForm');
// const forgotPasswordLink = document.getElementById('forgotPasswordLink');
// const backToLogin = document.getElementById('backToLogin');
// const backToForgotPassword = document.getElementById('backToForgotPassword');
// const loadingScreen = document.getElementById('loadingScreen');

// forgotPasswordLink.addEventListener('click', function(e) {
//   e.preventDefault();
//   loginForm.classList.remove('visible');
//   loginForm.classList.add('hidden');
//   forgotPasswordForm.classList.remove('hidden');
//   forgotPasswordForm.classList.add('visible');
// });

// backToLogin.addEventListener('click', function(e) {
//   e.preventDefault();
//   forgotPasswordForm.classList.remove('visible');
//   forgotPasswordForm.classList.add('hidden');
//   loginForm.classList.remove('hidden');
//   loginForm.classList.add('visible');
// });

// backToForgotPassword.addEventListener('click', function(e) {
//   e.preventDefault();
//   otpForm.classList.remove('visible');
//   otpForm.classList.add('hidden');
//   forgotPasswordForm.classList.remove('hidden');
//   forgotPasswordForm.classList.add('visible');
// });

// forgotPasswordForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   forgotPasswordForm.classList.remove('visible');
//   forgotPasswordForm.classList.add('hidden');
//   otpForm.classList.remove('hidden');
//   otpForm.classList.add('visible');
//   document.querySelector('.otp-input').focus();
// });

// // OTP input handling
// const otpInputs = document.querySelectorAll('.otp-input');
// otpInputs.forEach((input, index) => {
//   input.addEventListener('input', function() {
//     if (this.value.length === 1 && index < otpInputs.length - 1) {
//       otpInputs[index + 1].focus();
//     }
//   });

//   input.addEventListener('keydown', function(e) {
//     if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
//       otpInputs[index - 1].focus();
//     }
//   });
// });

// otpForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   otpForm.classList.remove('visible');
//   otpForm.classList.add('hidden');
//   loginForm.classList.remove('hidden');
//   loginForm.classList.add('visible');
//   alert('OTP verified! Please check your email for password reset instructions.');
// });

// loginForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   loadingScreen.classList.remove('hidden');
//   setTimeout(function() {
//     window.location.href = '/admin/dashboard';
//   }, 2000);
// });


loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const firstName = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = {
    firstName: firstName,
    password: password
  };

  try {
    const response = await fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await response.json();
    if (response.ok) {

      loadingScreen.classList.remove('hidden');
      document.cookie = `admintoken=${data.token}; path=/`;
      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 2000);

    } else {

      loadingScreen.classList.add('hidden');
      const errorMsg = document.getElementById("error-msg");
      errorMsg.style.display = "block";
      setTimeout(() => {
        errorMsg.style.display = "none";
      }, 2500);

    }
  } catch (error) {
    loadingScreen.classList.add('hidden');
    alert('Error during login. Please try again.');
    console.error(error);
  }
});
