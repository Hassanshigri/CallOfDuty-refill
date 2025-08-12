document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    checkLoginStatus();
    createBackgroundAnims();
    checkCookiesConsent();
    startCountdown();
    setupEGiftCardHandler(); // New function for eGift Card
});

// Countdown function
function startCountdown() {
    const launchDate = new Date('September 1, 2025 00:00:00').getTime();
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = 'Operational!';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
    }, 1000);
}

// Cookie Consent
document.addEventListener('DOMContentLoaded', function () {
    const cookiePopup = document.getElementById('cookie-popup');
    
    if (localStorage.getItem('cookieConsent')) {
        cookiePopup.style.display = 'none';
        return;
    }

    cookiePopup.style.display = 'block';

    window.acceptCookies = function () {
        localStorage.setItem('cookieConsent', 'accepted');
        cookiePopup.style.display = 'none';
    };

    window.declineCookies = function () {
        localStorage.setItem('cookieConsent', 'declined');
        cookiePopup.style.display = 'none';
    };
});

// Background Animations
function createBackgroundAnims() {
    const container = document.querySelector('.background-effects');
    if (!container) return;

    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${8 + Math.random() * 12}s`;
        container.appendChild(particle);
    }

    const fireSpotCount = 25;
    for (let i = 0; i < fireSpotCount; i++) {
        const fireSpot = document.createElement('div');
        fireSpot.className = 'fire-spot';
        fireSpot.style.left = `${Math.random() * 100}%`;
        fireSpot.style.top = `${Math.random() * 100}%`;
        fireSpot.style.animationDelay = `${Math.random() * 4}s`;
        fireSpot.style.animationDuration = `${1.5 + Math.random() * 2.5}s`;
        container.appendChild(fireSpot);
    }

    const explosionCount = 12;
    for (let i = 0; i < explosionCount; i++) {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = `${Math.random() * 100}%`;
        explosion.style.top = `${Math.random() * 100}%`;
        explosion.style.animationDelay = `${Math.random() * 3}s`;
        explosion.style.animationDuration = `${1 + Math.random() * 1.5}s`;
        container.appendChild(explosion);
    }

    const emberCount = 40;
    for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.left = `${Math.random() * 100}%`;
        ember.style.bottom = `${Math.random() * 25}%`;
        ember.style.animationDelay = `${Math.random() * 5}s`;
        ember.style.animationDuration = `${2.5 + Math.random() * 3}s`;
        container.appendChild(ember);
    }

    setInterval(() => {
        if (Math.random() < 0.4) {
            const newFireSpot = document.createElement('div');
            newFireSpot.className = 'fire-spot';
            newFireSpot.style.left = `${Math.random() * 100}%`;
            newFireSpot.style.top = `${Math.random() * 100}%`;
            newFireSpot.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            container.appendChild(newFireSpot);
            setTimeout(() => newFireSpot.remove(), 4000);
        }
    }, 1500);

    setInterval(() => {
        if (Math.random() < 0.25) {
            const newExplosion = document.createElement('div');
            newExplosion.className = 'explosion';
            newExplosion.style.left = `${Math.random() * 100}%`;
            newExplosion.style.top = `${Math.random() * 100}%`;
            newExplosion.style.animationDuration = `${1.2 + Math.random() * 1.3}s`;
            container.appendChild(newExplosion);
            setTimeout(() => newExplosion.remove(), 3000);
        }
    }, 2500);
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
const mobileNav = document.getElementById('mobileNav');
if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => mobileNav.classList.add('active'));
}
if (mobileCloseBtn && mobileNav) {
    mobileCloseBtn.addEventListener('click', () => mobileNav.classList.remove('active'));
}

// Authentication Modal
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchAuthLink = document.getElementById('switchAuth');
const authTitle = document.getElementById('authTitle');

function showAuthModal(type) {
    if (type === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        switchAuthLink.textContent = 'New Recruit? Enroll Here.';
        authTitle.textContent = 'Operator Access';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        switchAuthLink.textContent = 'Existing Operator? Access Here.';
        authTitle.textContent = 'Enroll Operator';
    }
    authModal.classList.add('active');
}

function hideAuthModal() {
    authModal.classList.remove('active');
}

if (switchAuthLink) {
    switchAuthLink.addEventListener('click', () => {
        if (loginForm.style.display === 'block') {
            showAuthModal('signup');
        } else {
            showAuthModal('login');
        }
    });
}

function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;

    if (username && email && password) {
        const userData = {
            username,
            email,
            password,
            dateRegistered: new Date().toISOString(),
            loginCount: 1,
            lastLogin: new Date().toISOString()
        };
        localStorage.setItem('cod_user_data', JSON.stringify(userData));
        localStorage.setItem('cod_user_logged_in', 'true');
        checkLoginStatus();
        hideAuthModal();
        showNotification(`Operator ${username} enrolled. Stand by for deployment.`);
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (email && password) {
        const storedUserData = localStorage.getItem('cod_user_data');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            if (userData.email === email && userData.password === password) {
                userData.loginCount++;
                userData.lastLogin = new Date().toISOString();
                localStorage.setItem('cod_user_data', JSON.stringify(userData));
                localStorage.setItem('cod_user_logged_in', 'true');
                checkLoginStatus();
                hideAuthModal();
                showNotification(`Operator ${userData.username} online. Systems nominal.`);
            } else {
                showNotification('Access denied. Verify credentials.', 'error');
            }
        } else {
            showNotification('Operator not found. Enrollment required.', 'error');
        }
    }
}

function logout() {
    localStorage.setItem('cod_user_logged_in', 'false');
    checkLoginStatus();
    showNotification('Operator offline. Maintain vigilance.');
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
            <button class="auth-btn" onclick="logout()">Disconnect</button>
        `;
        if (authButtons) authButtons.innerHTML = loggedInHTML;
        if (mobileAuthButtons) mobileAuthButtons.innerHTML = loggedInHTML;

        if (ctaButton) {
            ctaButton.textContent = `Stand by, ${userData.username}`;
            ctaButton.classList.add('disabled');
            ctaButton.removeAttribute('onclick');
        }
    } else {
        const loggedOutHTML = `
            <button class="auth-btn login-btn" onclick="showAuthModal('login')">Access</button>
            <button class="auth-btn signup signup-btn" onclick="showAuthModal('signup')">Enroll</button>
        `;
        if (authButtons) authButtons.innerHTML = loggedOutHTML;
        if (mobileAuthButtons) mobileAuthButtons.innerHTML = loggedOutHTML;

        if (ctaButton) {
            ctaButton.textContent = 'Enroll for Alerts';
            ctaButton.classList.remove('disabled');
            ctaButton.setAttribute('onclick', "showAuthModal('signup')");
        }
    }
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('cod_cart')) || [];

function addToCart(productId, price, name) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name,
            price: parseFloat(price), // Ensure price is a number
            quantity: 1,
            dateAdded: new Date().toISOString()
        });
    }
    saveCart();
    showNotification(`${name} secured in armory!`);
}

function saveCart() {
    localStorage.setItem('cod_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;

    let backgroundColor;
    switch (type) {
        case 'error':
            backgroundColor = 'var(--cod-orange)'; // Updated to match CSS variable
            break;
        case 'info':
            backgroundColor = 'var(--cod-orange)';
            break;
        default:
            backgroundColor = 'var(--cod-green)';
    }

    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${backgroundColor};
        color: var(--cod-dark);
        padding: 1rem 2rem;
        font-family: 'Orbitron', sans-serif;
        font-size: 1.1rem;
        border: 1px solid var(--cod-dark);
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

// eGift Card Handler
function setupEGiftCardHandler() {
    const denominationSelect = document.getElementById('denomination');
    const addToCartButton = document.querySelector('#egift-card .btn-cod');
    
    if (denominationSelect && addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const selectedValue = parseFloat(denominationSelect.value);
            addToCart('egift-card', selectedValue, `eGift Card ($${selectedValue})`);
        });
    }
}



 document.addEventListener('DOMContentLoaded', function() {
        updateCartDisplay();
      });

      function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummaryContainer = document.getElementById('cart-summary');
        const cartTotalElement = document.getElementById('cart-total');
        let cart = JSON.parse(localStorage.getItem('cod_cart')) || [];
        
        if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p class="text-muted">Your cart is empty. Visit the shop to add items!</p>';
          cartSummaryContainer.innerHTML = '<p class="text-muted">No items</p>';
          cartTotalElement.textContent = '$0.00';
          updateCartCount(); // Update navbar count
          return;
        }

        let total = 0;
        let summaryHtml = '';
        cartItemsContainer.innerHTML = cart.map(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          summaryHtml += `
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">${item.name} x ${item.quantity}</span>
              <span class="text-muted">$${itemTotal.toFixed(2)}</span>
            </div>
          `;
          return `
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
              <div>
                <h5 class="text-white">${item.name}</h5>
                <p class="text-muted mb-0">Price: $${item.price.toFixed(2)}</p>
              </div>
              <div class="d-flex align-items-center">
                <button class="btn btn-outline-cod btn-sm me-2" onclick="decreaseQuantity('${item.id}')">-</button>
                <span class="text-white mx-2">${item.quantity}</span>
                <button class="btn btn-outline-cod btn-sm me-2" onclick="increaseQuantity('${item.id}')">+</button>
                <button class="btn btn-outline-cod btn-sm" onclick="removeFromCart('${item.id}')">Remove</button>
              </div>
            </div>
          `;
        }).join('');

        cartSummaryContainer.innerHTML = summaryHtml;
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
        updateCartCount(); // Update navbar count
      }

      function increaseQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem('cod_cart')) || [];
        const item = cart.find(item => item.id === productId);
        if (item) {
          item.quantity += 1; // Add one more of the same item
          localStorage.setItem('cod_cart', JSON.stringify(cart));
          updateCartDisplay();
          showNotification(`${item.name} quantity increased.`);
        }
      }

      function decreaseQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem('cod_cart')) || [];
        const item = cart.find(item => item.id === productId);
        if (item) {
          if (item.quantity > 1) {
            item.quantity -= 1; // Decrease quantity by 1
            localStorage.setItem('cod_cart', JSON.stringify(cart));
            updateCartDisplay();
            showNotification(`${item.name} quantity decreased.`);
          } else {
            removeFromCart(productId); // Remove item if quantity is 1
          }
        }
      }

      function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cod_cart')) || [];
        const item = cart.find(item => item.id === productId);
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cod_cart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification(`${item ? item.name : 'Item'} removed from cart.`);
      }

      function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        let cart = JSON.parse(localStorage.getItem('cod_cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
          cartCount.textContent = totalItems;
        }
      }

      function checkout() {
        const isLoggedIn = localStorage.getItem('cod_user_logged_in') === 'true';
        if (!isLoggedIn) {
          showAuthModal('login');
          showNotification('Please log in to proceed to checkout.', 'error');
          return;
        }
        showNotification('Checkout initiated. Processing payment...', 'info');
        // Add your payment processing logic here
      }