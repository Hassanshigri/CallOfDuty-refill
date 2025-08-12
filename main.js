document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    checkLoginStatus();
    createBackgroundAnims();
    checkCookiesConsent();
});

// --- Cookies Management ---
function checkCookiesConsent() {
    const cookiesConsent = getCookieValue('cod_cookies_consent');
    if (!cookiesConsent) {
        setTimeout(() => {
            document.getElementById('cookiesPopup').classList.add('show');
        }, 1000); // Delay popup by 1 second
    }
}

function acceptCookies() {
    setCookie('cod_cookies_consent', 'accepted', 365);
    setCookie('cod_cookies_functional', 'true', 365);
    setCookie('cod_cookies_analytics', 'true', 365);
    setCookie('cod_cookies_marketing', 'true', 365);
    hideCookiesPopup();
    showNotification('Cookie preferences saved. All tactical systems enabled!');
}

function declineCookies() {
    setCookie('cod_cookies_consent', 'declined', 365);
    setCookie('cod_cookies_functional', 'false', 365);
    setCookie('cod_cookies_analytics', 'false', 365);
    setCookie('cod_cookies_marketing', 'false', 365);
    hideCookiesPopup();
    showNotification('Cookie preferences saved. Operating in minimal mode.', 'info');
}

function customizeCookies() {
    // In a real implementation, this would open a detailed cookie preferences modal
    showNotification('Cookie customization panel coming soon! For now, use Accept All or Decline.', 'info');
}

function hideCookiesPopup() {
    document.getElementById('cookiesPopup').classList.remove('show');
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function getCookieValue(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// --- Enhanced Background Animation Creation ---
function createBackgroundAnims() {
    const container = document.querySelector('.background-effects');
    if (!container) return;

    // Create particles (existing)
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;

        container.appendChild(particle);
    }

    // Create fire spots
    const fireSpotCount = 15;
    for (let i = 0; i < fireSpotCount; i++) {
        const fireSpot = document.createElement('div');
        fireSpot.className = 'fire-spot';

        fireSpot.style.left = `${Math.random() * 100}%`;
        fireSpot.style.top = `${Math.random() * 100}%`;
        fireSpot.style.animationDelay = `${Math.random() * 3}s`;
        fireSpot.style.animationDuration = `${2 + Math.random() * 2}s`;

        container.appendChild(fireSpot);
    }

    // Create explosions
    const explosionCount = 8;
    for (let i = 0; i < explosionCount; i++) {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';

        explosion.style.left = `${Math.random() * 100}%`;
        explosion.style.top = `${Math.random() * 100}%`;
        explosion.style.animationDelay = `${Math.random() * 2}s`;
        explosion.style.animationDuration = `${1.5 + Math.random() * 1}s`;

        container.appendChild(explosion);
    }

    // Create ember trails
    const emberCount = 25;
    for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';

        ember.style.left = `${Math.random() * 100}%`;
        ember.style.bottom = `${Math.random() * 20}%`;
        ember.style.animationDelay = `${Math.random() * 4}s`;
        ember.style.animationDuration = `${3 + Math.random() * 2}s`;

        container.appendChild(ember);
    }

    // Create continuous fire spots that regenerate
    setInterval(() => {
        if (Math.random() < 0.3) {
            const newFireSpot = document.createElement('div');
            newFireSpot.className = 'fire-spot';

            newFireSpot.style.left = `${Math.random() * 100}%`;
            newFireSpot.style.top = `${Math.random() * 100}%`;
            newFireSpot.style.animationDuration = `${2 + Math.random() * 1.5}s`;

            container.appendChild(newFireSpot);

            setTimeout(() => {
                if (newFireSpot.parentNode) {
                    newFireSpot.parentNode.removeChild(newFireSpot);
                }
            }, 3500);
        }
    }, 2000);

    // Create occasional large explosions
    setInterval(() => {
        if (Math.random() < 0.2) {
            const newExplosion = document.createElement('div');
            newExplosion.className = 'explosion';

            newExplosion.style.left = `${Math.random() * 100}%`;
            newExplosion.style.top = `${Math.random() * 100}%`;
            newExplosion.style.animationDuration = `${1.5 + Math.random() * 1}s`;

            container.appendChild(newExplosion);

            setTimeout(() => {
                if (newExplosion.parentNode) {
                    newExplosion.parentNode.removeChild(newExplosion);
                }
            }, 2500);
        }
    }, 3000);
}

// --- Mobile Menu Controls ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileNav = document.getElementById('mobileNav');
mobileMenuBtn.addEventListener('click', () => mobileNav.classList.add('active'));
mobileCloseBtn.addEventListener('click', () => mobileNav.classList.remove('active'));

// --- Auth Modal Controls ---
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchAuthLink = document.getElementById('switchAuth');
const authTitle = document.getElementById('authTitle');

function showAuthModal(type) {
    if (type === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        switchAuthLink.textContent = 'Need an account? Enlist now.';
        authTitle.textContent = 'Operator Login';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        switchAuthLink.textContent = 'Already have an account? Sign In.';
        authTitle.textContent = 'Enlist Now';
    }
    authModal.classList.add('active');
}

function hideAuthModal() {
    authModal.classList.remove('active');
}

switchAuthLink.addEventListener('click', () => {
    if (loginForm.style.display === 'block') {
        showAuthModal('signup');
    } else {
        showAuthModal('login');
    }
});

// --- Enhanced Local Storage Authentication ---
function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;

    if (username && email && password) {
        // Store user data in localStorage
        const userData = {
            username: username,
            email: email,
            password: password, // In real app, this would be hashed
            dateRegistered: new Date().toISOString(),
            loginCount: 1,
            lastLogin: new Date().toISOString()
        };

        localStorage.setItem('cod_user_data', JSON.stringify(userData));
        localStorage.setItem('cod_user_logged_in', 'true');

        checkLoginStatus();
        hideAuthModal();
        showNotification(`Welcome to the squad, ${username}! You've been enlisted successfully.`);
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (email && password) {
        // Check if user exists in localStorage
        const storedUserData = localStorage.getItem('cod_user_data');

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);

            // Verify credentials (in real app, this would be server-side)
            if (userData.email === email && userData.password === password) {
                // Update login stats
                userData.loginCount++;
                userData.lastLogin = new Date().toISOString();

                localStorage.setItem('cod_user_data', JSON.stringify(userData));
                localStorage.setItem('cod_user_logged_in', 'true');

                checkLoginStatus();
                hideAuthModal();
                showNotification(`Welcome back, ${userData.username}! Mission readiness: 100%`);
            } else {
                showNotification('Invalid credentials. Access denied.', 'error');
            }
        } else {
            showNotification('User not found. Please register first.', 'error');
        }
    }
}

function logout() {
    localStorage.setItem('cod_user_logged_in', 'false');
    checkLoginStatus();
    showNotification('You have been logged out. Stay frosty, soldier.');
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('cod_user_logged_in') === 'true';
    const userData = JSON.parse(localStorage.getItem('cod_user_data') || '{}');
    const authButtons = document.getElementById('authButtons');
    const mobileAuthButtons = document.getElementById('mobileAuthButtons');
    const ctaButton = document.getElementById('ctaButton');

    if (isLoggedIn && userData.username) {
        const loggedInHTML = `
            <span class="user-greeting">Operator: ${userData.username}</span>
            <button class="auth-btn" onclick="logout()">Sign Out</button>
        `;
        authButtons.innerHTML = loggedInHTML;
        mobileAuthButtons.innerHTML = loggedInHTML;

        if (ctaButton) {
            ctaButton.textContent = `Welcome back, ${userData.username}!`;
            ctaButton.classList.add('disabled');
            ctaButton.removeAttribute('onclick');
            ctaButton.href = 'javascript:void(0)';
        }
    } else {
        const loggedOutHTML = `
            <button class="auth-btn login-btn" onclick="showAuthModal('login')">Sign In</button>
            <button class="auth-btn signup signup-btn" onclick="showAuthModal('signup')">Sign Up</button>
        `;
        authButtons.innerHTML = loggedOutHTML;
        mobileAuthButtons.innerHTML = loggedOutHTML;

        if (ctaButton) {
            ctaButton.textContent = 'Register for Updates';
            ctaButton.classList.remove('disabled');
            ctaButton.setAttribute('onclick', "showAuthModal('signup')");
            ctaButton.href = 'javascript:void(0)';
        }
    }
}

// --- Enhanced Cart Management with Local Storage ---
let cart = JSON.parse(localStorage.getItem('cod_cart')) || [];

function addToCart(productId, price, name) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            quantity: 1,
            dateAdded: new Date().toISOString()
        });
    }
    saveCart();
    showNotification(`${name} added to loadout!`);
}

function saveCart() {
    localStorage.setItem('cod_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;

    let backgroundColor;
    switch (type) {
        case 'error':
            backgroundColor = 'var(--cod-red-accent)';
            break;
        case 'info':
            backgroundColor = 'var(--cod-orange-accent)';
            break;
        default:
            backgroundColor = 'var(--cod-accent-green)';
    }

    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${backgroundColor};
        color: var(--cod-dark-bg);
        padding: 1rem 2rem;
        font-family: 'Orbitron', sans-serif;
        font-size: 1.1rem;
        border: 1px solid var(--cod-dark-bg);
        z-index: 10000;
        transform: translateY(120px);
        opacity: 0;
        transition: all 0.5s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateY(120px)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}