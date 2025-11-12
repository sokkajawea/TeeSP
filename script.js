
// Product data structure
let products = JSON.parse(localStorage.getItem('products')) || [
    {
        id: 1,
        title: "Classic White Tee",
        price: "24.99",
        rating: "4.8",
        image: "http://static.photos/fashion/640x360/1",
        category: "t-shirts"
    },
    {
        id: 2,
        title: "Premium Polo Shirt",
        price: "34.99",
        rating: "4.6",
        image: "http://static.photos/fashion/640x360/2",
        category: "polo"
    },
    {
        id: 3,
        title: "Graphic Print T-Shirt",
        price: "29.99",
        rating: "4.7",
        image: "http://static.photos/fashion/640x360/3",
        category: "t-shirts"
    },
    {
        id: 4,
        title: "Comfy Hoodie",
        price: "49.99",
        rating: "4.9",
        image: "http://static.photos/fashion/640x360/4",
        category: "hoodies"
    }
];

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Render products for admin
function renderAdminProducts() {
    const container = document.getElementById('products-list');
    if (!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="flex justify-between items-center p-4 border rounded-lg">
            <div class="flex items-center">
                <img src="${product.image}" alt="${product.title}" class="w-16 h-16 object-cover rounded mr-4">
                <div>
                    <h3 class="font-medium">${product.title}</h3>
                    <p class="text-gray-600">${product.price}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button class="delete-product p-2 text-red-500 hover:text-red-700" data-id="${product.id}">
                    <i data-feather="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    feather.replace();
}
// Render products by category with enhanced display
function renderCategoryProducts(category) {
    const container = document.getElementById(`${category}-container`);
    if (!container) return;
    
    const filteredProducts = products.filter(p => p.category === category);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i data-feather="shirt" class="w-12 h-12 mx-auto text-gray-400 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-600">No ${category} products found</h3>
                <p class="text-gray-500 mt-2">Check back later for new arrivals!</p>
            </div>
        `;
    } else {
        container.innerHTML = filteredProducts.map(product => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div class="relative pb-[100%]">
                    <img src="${product.image}" alt="${product.title}" 
                         class="absolute h-full w-full object-cover">
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-lg mb-1">${product.title}</h3>
                    <div class="flex justify-between items-center">
                        <span class="text-purple-600 font-bold">${product.price}</span>
                        <button class="add-to-cart text-purple-600 hover:text-purple-800 transition">
                            <i data-feather="shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    feather.replace();
    
    // Update item count display
    const itemCountElements = document.querySelectorAll('.bg-purple-100');
    if (itemCountElements.length > 0) {
        itemCountElements.forEach(el => {
            el.textContent = `${filteredProducts.length} items`;
        });
    }
}
// Handle admin form submission
function handleAdminForm() {
    const form = document.getElementById('add-product-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newProduct = {
            id: Date.now(),
            title: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            image: document.getElementById('product-image').value,
            category: document.getElementById('product-category').value,
            rating: "4.5" // Default rating
        };
        
        products.push(newProduct);
        saveProducts();
        renderAdminProducts();
        form.reset();
        
        alert('Product added successfully!');
    });
}

// Handle product deletion
function handleProductDeletion() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.delete-product')) {
            const id = parseInt(e.target.closest('.delete-product').dataset.id);
            products = products.filter(p => p.id !== id);
            saveProducts();
            renderAdminProducts();
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
// Initialize Feather Icons
    feather.replace();
    
    // Scroll effect for navbar
    const navbar = document.querySelector('custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                document.body.classList.add('scrolled');
                navbar.shadowRoot.querySelector('nav').style.background = 'rgba(255,255,255,0.95)';
                navbar.shadowRoot.querySelector('nav').style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                document.body.classList.remove('scrolled');
                navbar.shadowRoot.querySelector('nav').style.background = 'white';
                navbar.shadowRoot.querySelector('nav').style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }

    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('custom-navbar')?.shadowRoot.querySelector('.cart-count');
    
    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
        }
    }
// Handle add to cart events from product cards
document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart')) {
        cartCount++;
        updateCartCount();
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
        notification.textContent = 'Item added to cart!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});

// Filter products by category or search term
function filterProducts(category = null, searchTerm = '') {
    let filtered = [...products];
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(term) || 
            p.category.toLowerCase().includes(term)
        );
    }
    
    return filtered;
}

// Render filtered products
function renderFilteredProducts(filteredProducts, containerId = 'products-container') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = filteredProducts.map(product => `
        <custom-product-card 
            image="${product.image}" 
            title="${product.title}" 
            price="${product.price}" 
            rating="${product.rating}">
        </custom-product-card>
    `).join('');
}
    // Search functionality
    const searchInput = document.querySelector('custom-navbar')?.shadowRoot.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    const filtered = filterProducts(null, query);
                    renderFilteredProducts(filtered);
                    window.scrollTo({
                        top: document.getElementById('products-container')?.offsetTop || 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
// Initialize category pages with proper product display
    function initCategoryPages() {
        const path = window.location.pathname;
        const categoryNames = {
            't-shirts.html': 't-shirts',
            'polo.html': 'polo',
            'dress.html': 'dress',
            'hoodies.html': 'hoodies'
        };

        for (const [page, category] of Object.entries(categoryNames)) {
            if (path.includes(page)) {
                renderCategoryProducts(category);
                // Update page title to match category
                document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} Collection - TeeTastic`;
                break;
            }
        }
    }
// Call initCategoryPages on DOMContentLoaded and handle navigation
    initCategoryPages();
    
    // Handle navigation between category pages
    window.addEventListener('popstate', initCategoryPages);
    
    // Add click handler for all category links
    document.addEventListener('click', function(e) {
        if (e.target.closest('[href$=".html"]')) {
            setTimeout(initCategoryPages, 100); // Wait for page load
        }
    });
// Mobile menu toggle (if implemented)
    const mobileMenuBtn = document.querySelector('custom-navbar')?.shadowRoot.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('custom-navbar').shadowRoot.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
        });
    }

    // Admin functionality
    renderAdminProducts();
    handleAdminForm();
    handleProductDeletion();

    // Category pages
    const path = window.location.pathname;
    if (path.includes('t-shirts.html')) {
        renderCategoryProducts('t-shirts');
    } else if (path.includes('polo.html')) {
        renderCategoryProducts('polo');
    } else if (path.includes('dress.html')) {
        renderCategoryProducts('dress');
    } else if (path.includes('hoodies.html')) {
        renderCategoryProducts('hoodies');
    }
});
