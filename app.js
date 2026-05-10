// State Management
let cart = [];
let currentScreen = 'home';
let selectedProduct = null;

// DOM Elements
const mainContent = document.getElementById('main-content');
const cartCount = document.getElementById('cart-count');
const navItems = document.querySelectorAll('.nav-item');
const cartBtn = document.getElementById('cart-btn');

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    renderScreen('home');
    updateCartCount();
});

// Navigation Handling
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const screen = item.getAttribute('data-screen');
        if (screen === 'shop') {
            renderScreen('shop');
        } else {
            renderScreen(screen);
        }
        
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

cartBtn.addEventListener('click', () => {
    renderScreen('cart');
});

// Screen Rendering
function renderScreen(screenId, params = {}) {
    currentScreen = screenId;
    mainContent.innerHTML = '';
    window.scrollTo(0, 0);

    switch(screenId) {
        case 'home':
            renderHome();
            break;
        case 'shop':
            renderShop(params.category);
            break;
        case 'detail':
            renderProductDetail(params.productId);
            break;
        case 'cart':
            renderCart();
            break;
        case 'checkout':
            renderCheckout();
            break;
        case 'stats':
            renderStats();
            break;
        case 'profile':
            renderProfile();
            break;
    }
}

// --- Home Screen ---
function renderHome() {
    const html = `
        <section class="hero animate-in">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx7N2uYiJrzS87grTXuFWQrKW6qgZIgVkQQddNSZ7CBeCXwHED6KmZoDeyCDY-csmn7w8-ENuk2Rg1MEGLb70prVtXOKDquboKltPljtmjNBV-MOkh1llxpxOJoNDbkc5MBfFYY9dZOJ-nsX6gpSrkCU61AalDJDGDmBzb8gpbmU-glvQJ-hkh6u7Qfz0kn39tctQJX_gl4mQ1U5OFqakAaYanaBon2prqQcXYT1Bgm1qrjwMbc7iJM4v038VRLvtB7WpiucmbeZM" class="hero-img">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <span class="tag">SS24 PERFORMANCE</span>
                <h2>OWN THE STREET</h2>
                <p>Engineered for those who thrive in the dark. Fusion of technical precision and elite street style.</p>
                <button class="btn-primary" onclick="renderScreen('shop')">SHOP COLLECTION</button>
            </div>
        </section>

        <h3 class="section-title">CATEGORIES</h3>
        <div class="scroller">
            ${mockData.categories.map(cat => `
                <div class="category-card" onclick="renderScreen('shop', {category: '${cat.id}'})">
                    <img src="${cat.image}">
                    <h4>${cat.name}</h4>
                </div>
            `).join('')}
        </div>

        <h3 class="section-title">NEW ARRIVALS</h3>
        <div class="product-grid">
            ${mockData.products.slice(0, 2).map(prod => renderProductCard(prod)).join('')}
        </div>

        <section class="stats-section">
            <div class="stat-item">
                <span class="material-symbols-outlined">bolt</span>
                <h5>INSTANT POWER</h5>
                <p>Lightweight materials designed to minimize drag and maximize explosive potential.</p>
            </div>
            <div class="stat-item">
                <span class="material-symbols-outlined">monitoring</span>
                <h5>PRECISION DATA</h5>
                <p>Integrated sensor technology tracks metrics with 99.8% medical-grade accuracy.</p>
            </div>
        </section>
    `;
    mainContent.innerHTML = html;
}

// --- Shop Screen ---
function renderShop(filterCategory = null) {
    const products = filterCategory 
        ? mockData.products.filter(p => p.category === filterCategory)
        : mockData.products;

    const html = `
        <div class="animate-in">
            <h3 class="section-title">${filterCategory ? filterCategory.toUpperCase() : 'SHOP ALL'}</h3>
            <div class="scroller" style="margin-bottom: 24px;">
                <button class="tag ${!filterCategory ? 'active' : ''}" style="background: ${!filterCategory ? 'var(--brand-volt)' : 'var(--surface)'}; color: ${!filterCategory ? '#000' : '#fff'}" onclick="renderShop()">ALL</button>
                ${mockData.categories.map(cat => `
                    <button class="tag" style="background: ${filterCategory === cat.id ? 'var(--brand-volt)' : 'var(--surface)'}; color: ${filterCategory === cat.id ? '#000' : '#fff'}" onclick="renderShop('${cat.id}')">${cat.name.toUpperCase()}</button>
                `).join('')}
            </div>
            <div class="product-grid">
                ${products.map(prod => renderProductCard(prod)).join('')}
            </div>
        </div>
    `;
    mainContent.innerHTML = html;
}

function renderProductCard(product) {
    return `
        <div class="product-card" onclick="renderScreen('detail', {productId: ${product.id}})">
            <div class="product-img-wrapper">
                <img src="${product.image}">
                <div style="position: absolute; top: 10px; left: 10px;">
                    <span style="background: var(--brand-volt); color: #000; font-size: 8px; font-weight: 700; padding: 2px 6px; border-radius: 2px;">${product.tag}</span>
                </div>
            </div>
            <div class="product-info">
                <h5>${product.name}</h5>
                <p>${product.category.toUpperCase()}</p>
                <div class="product-price">$${product.price}</div>
            </div>
        </div>
    `;
}

// --- Detail Screen ---
function renderProductDetail(productId) {
    const product = mockData.products.find(p => p.id === productId);
    selectedProduct = product;
    let selectedSize = product.sizes[0];

    const html = `
        <div class="detail-view animate-in">
            <div class="detail-img-container">
                <img src="${product.image}">
            </div>
            <div class="detail-info">
                <div class="detail-price">$${product.price}</div>
                <h2 class="detail-title">${product.name}</h2>
                <p class="detail-desc">${product.desc}</p>
                
                <div class="size-selector">
                    <span class="size-label">SELECT SIZE</span>
                    <div class="size-options">
                        ${product.sizes.map(size => `
                            <button class="size-btn ${size === selectedSize ? 'selected' : ''}" onclick="selectSize(this, '${size}')">${size}</button>
                        `).join('')}
                    </div>
                </div>

                <button class="btn-primary" onclick="addToCart(${product.id}, '${selectedSize}')">ADD TO CART</button>
            </div>
        </div>
    `;
    mainContent.innerHTML = html;
}

window.selectSize = (btn, size) => {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
};

// --- Cart Screen ---
function renderCart() {
    if (cart.length === 0) {
        mainContent.innerHTML = `
            <div class="animate-in" style="padding: 100px var(--margin-mobile); text-align: center;">
                <span class="material-symbols-outlined" style="font-size: 64px; opacity: 0.2; margin-bottom: 20px;">shopping_bag</span>
                <h3>YOUR CART IS EMPTY</h3>
                <p style="margin-bottom: 32px; color: var(--on-surface-variant);">Start shopping to add some premium gear.</p>
                <button class="btn-primary" onclick="renderScreen('shop')">BROWSE SHOP</button>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const html = `
        <div class="animate-in">
            <h3 class="section-title">YOUR CART</h3>
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-img"><img src="${item.image}"></div>
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <p style="font-size: 12px; color: var(--on-surface-variant);">SIZE: ${item.size}</p>
                            <div class="cart-item-price">$${item.price}</div>
                            <div class="cart-controls">
                                <button class="qty-btn" onclick="updateQty(${item.id}, '${item.size}', -1)">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="updateQty(${item.id}, '${item.size}', 1)">+</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span style="color: var(--brand-volt);">FREE</span>
                </div>
                <div class="summary-row summary-total">
                    <span>TOTAL</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <button class="btn-primary" style="margin-top: 24px;" onclick="renderScreen('checkout')">CHECKOUT</button>
            </div>
        </div>
    `;
    mainContent.innerHTML = html;
}

// --- Checkout Screen ---
function renderCheckout() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const html = `
        <div class="animate-in" style="padding: 24px var(--margin-mobile);">
            <h3 class="section-title" style="margin-left: 0;">CHECKOUT</h3>
            
            <div style="margin-bottom: 32px;">
                <label class="size-label">SHIPPING ADDRESS</label>
                <input type="text" placeholder="Full Name" style="width: 100%; padding: 12px; background: var(--surface); border: 1px solid var(--outline-variant); color: #fff; margin-bottom: 12px;">
                <input type="text" placeholder="Street Address" style="width: 100%; padding: 12px; background: var(--surface); border: 1px solid var(--outline-variant); color: #fff; margin-bottom: 12px;">
                <div style="display: flex; gap: 12px;">
                    <input type="text" placeholder="City" style="flex: 1; padding: 12px; background: var(--surface); border: 1px solid var(--outline-variant); color: #fff;">
                    <input type="text" placeholder="Zip" style="width: 80px; padding: 12px; background: var(--surface); border: 1px solid var(--outline-variant); color: #fff;">
                </div>
            </div>

            <div style="margin-bottom: 32px;">
                <label class="size-label">PAYMENT METHOD</label>
                <div style="padding: 16px; background: var(--surface); border: 1px solid var(--brand-volt); border-radius: 4px; display: flex; align-items: center; gap: 12px;">
                    <span class="material-symbols-outlined">credit_card</span>
                    <span>•••• •••• •••• 4242</span>
                </div>
            </div>

            <div class="cart-summary" style="margin-left: -20px; margin-right: -20px;">
                <div class="summary-row summary-total">
                    <span>TOTAL DUE</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <button class="btn-primary" style="margin-top: 24px;" onclick="confirmOrder()">PAY NOW</button>
            </div>
        </div>
    `;
    mainContent.innerHTML = html;
}

async function confirmOrder() {
    const name = document.querySelector('input[placeholder="Full Name"]').value;
    const address = document.querySelector('input[placeholder="Street Address"]').value;
    const city = document.querySelector('input[placeholder="City"]').value;
    const zip = document.querySelector('input[placeholder="Zip"]').value;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const formData = {
        name,
        address,
        city,
        zip,
        total: subtotal.toFixed(2),
        items: cart.map(item => `${item.name} (${item.size}) x${item.quantity}`).join(', ')
    };

    // Show loading state
    const payBtn = document.querySelector('.btn-primary');
    const originalText = payBtn.innerText;
    payBtn.innerText = 'PROCESSING...';
    payBtn.disabled = true;

    try {
        const response = await fetch('https://formspree.io/f/xdabpzln', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            cart = [];
            updateCartCount();
            mainContent.innerHTML = `
                <div class="animate-in" style="padding: 100px var(--margin-mobile); text-align: center;">
                    <span class="material-symbols-outlined" style="font-size: 80px; color: var(--brand-volt); margin-bottom: 24px;">check_circle</span>
                    <h2 style="font-family: var(--font-display); font-size: 36px; margin-bottom: 12px;">ORDER PLACED</h2>
                    <p style="color: var(--on-surface-variant); margin-bottom: 40px;">Your elite gear is being prepared for shipment. A confirmation email has been sent to you.</p>
                    <button class="btn-primary" onclick="renderScreen('home')">BACK TO HOME</button>
                </div>
            `;
        } else {
            throw new Error('Failed to submit order');
        }
    } catch (error) {
        alert('There was an error processing your order. Please try again.');
        payBtn.innerText = originalText;
        payBtn.disabled = false;
    }
}

// --- Cart Logic ---
function addToCart(productId, size) {
    const product = mockData.products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId && item.size === size);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            size: size,
            quantity: 1
        });
    }

    updateCartCount();
    renderScreen('cart');
}

function updateQty(productId, size, delta) {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => !(i.id === productId && i.size === size));
        }
    }
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = count;
    cartCount.style.display = count > 0 ? 'flex' : 'none';
}

// --- Placeholder Screens ---
function renderStats() {
    mainContent.innerHTML = `
        <div class="animate-in" style="padding: 40px var(--margin-mobile);">
            <h3 class="section-title" style="margin-left: 0;">YOUR STATS</h3>
            <div style="background: var(--surface); padding: 24px; border-radius: 8px; margin-bottom: 20px;">
                <p style="opacity: 0.6; font-size: 12px; margin-bottom: 4px;">WEEKLY DISTANCE</p>
                <h4 style="font-family: var(--font-display); font-size: 32px;">42.8 <span style="font-size: 14px; opacity: 0.6;">KM</span></h4>
            </div>
            <div style="background: var(--surface); padding: 24px; border-radius: 8px;">
                <p style="opacity: 0.6; font-size: 12px; margin-bottom: 4px;">ACTIVE CALORIES</p>
                <h4 style="font-family: var(--font-display); font-size: 32px;">3,240 <span style="font-size: 14px; opacity: 0.6;">KCAL</span></h4>
            </div>
        </div>
    `;
}

function renderProfile() {
    mainContent.innerHTML = `
        <div class="animate-in" style="padding: 40px var(--margin-mobile); text-align: center;">
            <div style="width: 100px; height: 100px; background: var(--surface); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-outlined" style="font-size: 48px;">person</span>
            </div>
            <h3 style="font-family: var(--font-display); font-size: 24px;">ELITE ATHLETE</h3>
            <p style="color: var(--on-surface-variant); font-size: 14px;">Member since 2024</p>
            <div style="margin-top: 40px; text-align: left;">
                <div style="padding: 16px; border-bottom: 1px solid var(--outline-variant);">My Orders</div>
                <div style="padding: 16px; border-bottom: 1px solid var(--outline-variant);">Settings</div>
                <div style="padding: 16px; color: var(--error);">Log Out</div>
            </div>
        </div>
    `;
}
