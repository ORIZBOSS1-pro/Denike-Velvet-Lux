// --- PRODUCT CATALOG (Nigerian Prices ₦) ---
const products = [
  {
    id: 1,
    category: "womenswear",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    category: "bridal",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOz_0hUuFeJ1xZxowI8i2aR3-jHEoJs_e23x696LJljX7I8LP1NUwna7k&s=10"
  },
  {
    id: 3,
    category: "womenswear",
    image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/55/9289814/1.jpg?6160"
  },
  {
  id: 4,
  category: "bridal",
  image: "https://pictures-nigeria.jijistatic.net/205913724_NjIwLTgyNy1iYjJiM2IyNjZh.webp"
  },
  {
  id: 5,
  category: "menswear",
  image: "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/22/3633914/1.jpg?7041"
  },
  {
  id: 6,
  category: "menswear",
  image: "https://img.ltwebstatic.com/v4/j/spmp/2025/11/09/07/1762674024bf17acef696145f98351db1decef9788_thumbnail_750x999.jpg"
  },
];

const WHATSAPP_NUMBER = "2347031304508";
const TIKTOK_USERNAME = "@denii.ke";

let cart = [];

// --- STORE RENDERING & FILTERING ---
function renderProducts(itemsToRender = products) {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  grid.innerHTML = itemsToRender.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <div class="card-body">
      </div>
    </div>
  `).join('');
}

function filterCategory(category, clickedBtn = null) {
  if (clickedBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
  }

  if (category === 'all') {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

// --- FORM HANDLING ---
function handleScheduleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('schedName').value;
  const phone = document.getElementById('schedPhone').value;
  const service = document.getElementById('schedService').value;
  const date = document.getElementById('schedDate').value;
  const notes = document.getElementById('schedNotes').value;

  const msg = `Hello Denike Velvet Lux! I want to schedule an appointment:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Date & Time:* ${date}\n*Notes:* ${notes || 'None'}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function handleContactSubmit(e) {
  e.preventDefault();
  alert("Thank you for reaching out! A concierge representative will contact you shortly.");
  e.target.reset();
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  alert("Welcome to the Velvet Lux Club! Check your inbox for exclusive updates.");
  e.target.reset();
}

// Initialize Product View
renderProducts();


function handleEmailSubmit(e) {
  e.preventDefault();

  // Destination Email Address
  const recipientEmail = "oriowoadenike90@gmail.com";

  // Form Fields
  const name = document.getElementById("contactName").value;
  const senderEmail = document.getElementById("contactEmail").value;
  const subject = document.getElementById("contactSubject").value || "New Customer Inquiry - Denike Velvet Lux";
  const message = document.getElementById("contactMessage").value;

  // Construct Email Body
  const emailBody = `Full Name: ${name}\nEmail Address: ${senderEmail}\n\nMessage:\n${message}`;

  // Create Mailto URL
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  // Open default mail client (Gmail, Outlook, Apple Mail)
  window.location.href = mailtoUrl;

  // Reset form
  e.target.reset();
}
