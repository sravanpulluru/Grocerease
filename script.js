// GrocerEase - Main JavaScript Functions

// Cart Storage Key
const CART_STORAGE_KEY = 'grocerEaseCart';

// ==================== PRODUCT FUNCTIONS ====================

// Load products from data/products.js
function loadProducts() {
  // Products are loaded from data/products.js via script tag
  // This function ensures products array is available
  if (typeof products === 'undefined') {
    console.error('Products array not found. Make sure data/products.js is loaded.');
    return [];
  }
  return products;
}

// Utility: format price in Indian Rupees
function formatPrice(value) {
  return `₹${Number(value).toLocaleString('en-IN')}`;
}

// Display products on the products page
function displayProducts(filteredProducts = null) {
  const productsToDisplay = filteredProducts || loadProducts();
  const productsContainer = document.querySelector('.products-grid');
  
  if (!productsContainer) return;

  if (productsToDisplay.length === 0) {
    productsContainer.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h2>No products found</h2>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = productsToDisplay.map(product => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2230%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E🛒%3C/text%3E%3C/svg%3E';">
      </div>
      <div class="product-name">${product.name}</div>
      ${product.quantity ? `<div class="product-quantity">${product.quantity}</div>` : ''}
      ${product.category ? `<div class="product-category">${product.category}</div>` : ''}
      <div class="product-price">${formatPrice(product.price)}</div>
      <div class="product-actions">
        <button class="btn-add" onclick="addToCart(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Show skeleton loading cards on products page
function showProductSkeleton(count = 8) {
  const productsContainer = document.querySelector('.products-grid');
  if (!productsContainer) return;

  const skeletonCards = Array.from({ length: count })
    .map(
      () => `
      <div class="product-card skeleton-card">
        <div class="product-image skeleton-block"></div>
        <div class="skeleton-line skeleton-line-lg"></div>
        <div class="skeleton-line skeleton-line-sm"></div>
        <div class="skeleton-line skeleton-line-price"></div>
        <div class="skeleton-btn"></div>
      </div>
    `
    )
    .join('');

  productsContainer.innerHTML = skeletonCards;
}

// ==================== CART FUNCTIONS ====================

// Load cart from localStorage
function loadCart() {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartBadge();
  
  // Refresh cart display if on cart page
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
}

// Add product to cart
function addToCart(productId) {
  const cart = loadCart();
  const products = loadProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    alert('Product not found!');
    return;
  }

  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    // Increment quantity if item already exists
    existingItem.quantity += 1;
  } else {
    // Add new item to cart
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category || '',
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart(cart);
  showNotification(`${product.name} added to cart!`);
}

// Update quantity of an item in cart
function updateQuantity(productId, newQty) {
  const sanitizedQty = Number.isFinite(newQty) ? newQty : 1;

  if (sanitizedQty <= 0) {
    removeItem(productId);
    return;
  }

  const cart = loadCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = sanitizedQty;
    saveCart(cart);
  }
}

// Remove item from cart
function removeItem(productId) {
  const cart = loadCart();
  const filteredCart = cart.filter(item => item.id !== productId);
  saveCart(filteredCart);
}

// Calculate total price of cart
function calculateTotal() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ==================== HELPER FUNCTIONS ====================

// Get total number of items in cart
function getTotalItems() {
  const cart = loadCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update cart badge in navigation
function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    const totalItems = getTotalItems();
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Render cart page
function renderCart() {
  const cart = loadCart();
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartSummary = document.querySelector('.cart-summary');
  
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Start shopping to add items to your cart!</p>
        <a href="products.html" class="btn" style="margin-top: 1rem;">Browse Products</a>
      </div>
    `;
    
    if (cartSummary) {
      cartSummary.innerHTML = '';
    }
    return;
  }

  // Render cart items
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        ${item.image.startsWith('http') ? `<img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><span style="display:none;">🛒</span>` : item.image}
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        ${item.category ? `<div class="cart-item-category">${item.category}</div>` : ''}
      </div>
      <div class="cart-item-price">${formatPrice(item.price)}</div>
      <div class="quantity-controls">
        <label class="sr-only" for="qty-${item.id}">Quantity for ${item.name}</label>
        <input
          id="qty-${item.id}"
          class="quantity-input"
          type="number"
          min="1"
          value="${item.quantity}"
          onchange="updateQuantity(${item.id}, parseInt(this.value, 10))"
        />
      </div>
      <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
      <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
    </div>
  `).join('');

  // Render cart summary
  if (cartSummary) {
    const subtotal = calculateTotal();
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    cartSummary.innerHTML = `
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      <div class="summary-row">
        <span>Tax (8%):</span>
        <span>${formatPrice(tax)}</span>
      </div>
      <div class="summary-row total">
        <span>Total:</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="cart-actions">
        <a href="products.html" class="btn btn-secondary">Continue Shopping</a>
        <button class="btn checkout-btn" onclick="checkout()">Checkout</button>
      </div>
      <p class="checkout-note">Thank you for shopping with GrocerEase!</p>
    `;
  }
}

// Checkout function
function checkout() {
  const cart = loadCart();
  
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const subtotal = calculateTotal();
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + tax;

  const confirmMessage = `Order Summary:\n\nItems: ${getTotalItems()}\nSubtotal: ${formatPrice(subtotal)}\nTax: ${formatPrice(tax)}\nTotal: ${formatPrice(finalTotal)}\n\nThank you for your order! Your items will be delivered soon.`;
  
  if (confirm(confirmMessage)) {
    alert('Order placed successfully! Thank you for shopping with GrocerEase! 🎉');
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartBadge();
    renderCart();
  }
}

// Filter products by search term + category in real time
function filterProducts() {
  const allProducts = loadProducts();
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

  let filtered = allProducts;

  // Filter by category
  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter(
      (product) => (product.category || 'Others') === selectedCategory
    );
  }

  // Filter by product name (case-insensitive)
  if (searchTerm) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  displayProducts(filtered);
}

// Render a small set of trending products on the home page
function renderTrending() {
  const trendingContainer = document.getElementById('trendingGrid');
  if (!trendingContainer) return;

  const allProducts = loadProducts();
  // Pick a subset as \"trending\" (first 4 for now)
  const trending = allProducts.slice(0, 4);

  trendingContainer.innerHTML = trending
    .map(
      (product) => `
      <div class=\"product-card\">
        <div class=\"product-image\">
          <img src=\"${product.image}\" alt=\"${product.name}\" onerror=\"this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2230%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E🛒%3C/text%3E%3C/svg%3E';\">
        </div>
        <div class=\"product-name\">${product.name}</div>
        ${product.quantity ? `<div class=\"product-quantity\">${product.quantity}</div>` : ''}
        ${product.category ? `<div class=\"product-category\">${product.category}</div>` : ''}
        <div class=\"product-price\">${formatPrice(product.price)}</div>
        <div class=\"product-actions\">
          <button class=\"btn-add\" onclick=\"addToCart(${product.id})\">
            Add to Cart
          </button>
        </div>
      </div>
    `
    )
    .join('');
}

// Initialize products page
function initProductsPage() {
  // Show skeletons first for a smoother perceived load
  showProductSkeleton();

  // Display all products after a short delay
  setTimeout(() => {
    displayProducts();
  }, 250);

  // Set up search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  // Set up category filter
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Update cart badge on all pages
  updateCartBadge();

  // Initialize products page if on products.html
  if (window.location.pathname.includes('products.html')) {
    initProductsPage();
  }

  // Render trending section on home page
  if (
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname === ''
  ) {
    renderTrending();
  }

  // Initialize cart page if on cart.html
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
