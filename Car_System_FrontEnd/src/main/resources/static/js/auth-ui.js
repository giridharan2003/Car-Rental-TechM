const $ = id => document.getElementById(id);

const getCookie = name => {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? match[1] : null;
};

function isMobile() {
    return window.matchMedia('(max-width: 767px)').matches;
}

function getElement(id, mobileId) {
    return $(isMobile() ? mobileId : id);
}

function showGuest() {
    getElement('loginBtn', 'loginBtnM').style.display = 'inline-block';
    getElement('registerBtn', 'registerBtnM').style.display = 'inline-block';
    getElement('userName', 'userNameM').style.display = 'none';
    getElement('logoutBtn', 'logoutBtnM').style.display = 'none';
}

function showMember(name) {
    const userNameEl = getElement('userName', 'userNameM');
    userNameEl.textContent = name;
    userNameEl.style.display = 'inline-block';
    getElement('loginBtn', 'loginBtnM').style.display = 'none';
    getElement('registerBtn', 'registerBtnM').style.display = 'none';
    getElement('logoutBtn', 'logoutBtnM').style.display = 'inline-block';
}

async function checkTokenAndUpdateUI() {
    const token = getCookie('token');
    console.log('Token:', token);
    if (!token) {
        showGuest();
        return;
    }

    try {
        const valid = await fetch('/valid/token', { credentials: 'include' });
        if (!valid.ok) throw new Error(`Token validation failed: ${valid.status}`);

        const userResponse = await fetch('/userDetails', { credentials: 'include' });
        if (!userResponse.ok) throw new Error(`User details fetch failed: ${userResponse.status}`);

        const user = await userResponse.json();
        console.log('User:', user);
        showMember(user.firstName + " " + user.lastName);
    } catch (e) {
        console.error('Error in checkTokenAndUpdateUI:', e.message);
        document.cookie = 'token=; path=/';
        showGuest();
    }
}

function setupLogoutHandler() {
    const logoutBtnEl = getElement('logoutBtn', 'logoutBtnM');
    logoutBtnEl.onclick = () => {
        document.cookie = 'token=; path=/';
        location.reload();
    };
}

function setupGuestButtonNav(indexHref) {
    getElement('loginBtn', 'loginBtnM').onclick = () => location.href = indexHref;
    getElement('registerBtn', 'registerBtnM').onclick = () => location.href = indexHref;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    const indexHref = document.body.getAttribute('data-index-href') || '/';
    console.log('indexHref:', indexHref);
    console.log(`Initial view: ${isMobile() ? 'Mobile' : 'Desktop'}`);

    setupGuestButtonNav(indexHref);
    setupLogoutHandler();
    checkTokenAndUpdateUI();

    // Re-apply UI and handlers on resize
    window.addEventListener('resize', () => {
        console.log(`Screen: ${isMobile() ? 'Mobile' : 'Desktop'}`);
        setupGuestButtonNav(indexHref);
        setupLogoutHandler();
        checkTokenAndUpdateUI();
    });

    // Mobile menu toggle logic
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (menuToggle && closeMenu && mobileMenu && menuOverlay) {
        menuToggle.onclick = () => {
            mobileMenu.classList.toggle('hidden');
            menuOverlay.classList.toggle('hidden');
        };
        closeMenu.onclick = () => {
            mobileMenu.classList.add('hidden');
            menuOverlay.classList.add('hidden');
        };
    } else {
        console.warn('Mobile menu elements not found');
    }
});