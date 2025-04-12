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
  // First toggle the class immediately
  document.body.classList.toggle('dark');
  
  // Then update icon and storage
  if (document.body.classList.contains('dark')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
  
  // Create ash particles after a slight delay
  setTimeout(createAshParticles, 50);
});

// Create ash particles for transition effect
function createAshParticles() {
  for (let i = 0; i < 30; i++) { // Reduced number of particles
    const ash = document.createElement('div');
    ash.classList.add('ash-particle');
    ash.style.left = `${Math.random() * window.innerWidth}px`;
    ash.style.top = `${Math.random() * window.innerHeight}px`;
    ash.style.width = `${Math.random() * 3 + 2}px`;
    ash.style.height = ash.style.width;
    document.body.appendChild(ash);
    
    // Remove ash particles after animation completes
    setTimeout(() => {
      if (ash.parentNode) {
        ash.remove();
      }
    }, 2000);
  }
}