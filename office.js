// --- STORE DATA (Prices updated to Nigerian Naira ₦) ---
const products = [
  {
    id: 1,
    name: "Fashion 2PS Luxury Men's and Women's Watch Bracelet full",
    price: 25000,
    image: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/35/6590914/1.jpg?5764"
  },
  {
    id: 2,
    name: "Fashion Gold Chain Wrist Watch - CUBAN ICED",
    price: 20000,
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/43/9857751/1.jpg?3603"
  },
  {
    id: 3,
    name: "Emerald Drop Earrings",
    price: 12000,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Classic Pearl Bracelet",
    price: 9500,
    image: "https://www.dowerandhall.com/cdn/shop/files/TBB13-V-FWP-Dower-and-Hall-Yellow-Gold-Vermeil-White-Pearl-Nomad-T-Bar-Bracelet-1_800x.jpg?v=1785239947"
  },
  {
    id: 5,
    name: "Royal Coral Bead Bride Set (Ileke)",
    price: 35000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOz_0hUuFeJ1xZxowI8i2aR3-jHEoJs_e23x696LJljX7I8LP1NUwna7k&s=10"
  },
  {
    id: 6,
    name: "18k Gold Twisted Bangle (Idefun)",
    price: 16000,
    image: "https://www.croghansjewelbox.com/cdn/shop/files/175-00458-styled-1.jpg?v=1776703603&width=2048"
  },
  {
    id: 7,
    name: "Velvet Emerald Statement Choker",
    price: 22000,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiah23mzYTpfGtxhy6bOWgAWlPFhhADZ_i5Jr4FXBAqY8jvg1J45LmOmL2&s=10"
  },
  {
    id: 8,
    name: "24k Gold Layered Coin Chain",
    price: 14500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Traditional Edo Coral Crown & Earring Set",
    price: 28000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Luxury Diamond Tennis Bracelet",
    price: 17500,
    image: "https://thumbs.dreamstime.com/b/luxurious-diamond-tennis-bracelet-white-gold-sparkling-gems-close-up-elegant-designed-showcasing-luxury-351867164.jpg"
  },
];

// Business details
const WHATSAPP_NUMBER = "2347031304508"; // Replace with your Nigerian WhatsApp number (e.g. 234...)
const TIKTOK_USERNAME = "@denii.ke"; // Your TikTok handle without @

let cart = [];

// --- NAVIGATION FUNCTIONS ---

function toggleNav() {
  document.getElementById("navDrawer").classList.toggle("active");
  document.getElementById("navOverlay").classList.toggle("active");
}

function switchTab(clickedTab) {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => tab.classList.remove("active"));
  clickedTab.classList.add("active");
}


function switchTab(category, clickedBtn) {
  // 1. Remove active class from all tab buttons
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  // 2. Set active class on clicked tab button
  clickedBtn.classList.add('active');

  // 3. Hide all slides
  const slides = document.querySelectorAll('.nav-slide');
  slides.forEach(slide => slide.classList.remove('active'));

  // 4. Show selected category slide
  const activeSlide = document.getElementById(`slide-${category}`);
  if (activeSlide) {
    activeSlide.classList.add('active');
  }
}


// --- CART & STORE FUNCTIONS ---

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <div class="card-price">₦${product.price.toLocaleString()}</div>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById("cartModal").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const cartContainer = document.getElementById("cartItemsContainer");
  const cartBadge = document.getElementById("cartBadge");
  const totalAmount = document.getElementById("cartTotalAmount");

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.innerText = totalCount;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p style="text-align: center; color: var(--text-muted); margin-top: 2rem;">Your cart is empty.</p>`;
    totalAmount.innerText = `₦0`;
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <span>Qty: ${item.quantity} x ₦${item.price.toLocaleString()}</span>
      </div>
      <div>
        <strong style="margin-right: 10px;">₦${(item.price * item.quantity).toLocaleString()}</strong>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalAmount.innerText = `₦${total.toLocaleString()}`;
}

function buildOrderSummary() {
  if (cart.length === 0) return null;

  let message = "Hello Denike Velvet Lux! I would like to place an order for:\n\n";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${index + 1}. ${item.name} (x${item.quantity}) - ₦${itemTotal.toLocaleString()}\n`;
  });

  message += `\n*Total Amount:* ₦${total.toLocaleString()}`;
  return message;
}

function checkoutWhatsApp() {
  const message = buildOrderSummary();
  if (!message) {
    alert("Your cart is empty!");
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

function checkoutTikTok() {
  const message = buildOrderSummary();
  if (!message) {
    alert("Your cart is empty!");
    return;
  }

  navigator.clipboard.writeText(message).then(() => {
    alert("Order summary copied to clipboard! Paste it into the TikTok DM window that opens.");
    const tiktokUrl = `https://www.tiktok.com/@${TIKTOK_USERNAME}`;
    window.open(tiktokUrl, '_blank');
  }).catch(err => {
    alert("Could not copy order summary automatically. Please manually write your request in TikTok DM.");
    const tiktokUrl = `https://www.tiktok.com/@${TIKTOK_USERNAME}`;
    window.open(tiktokUrl, '_blank');
  });
}

// Initial Load
renderProducts();
