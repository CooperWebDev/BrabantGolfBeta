// ==================== MOBILE MENU TOGGLE ====================

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ==================== SCROLL REVEAL ANIMATION ====================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.booking-card, .product-card, .blog-card, .courses-text').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// ==================== BUTTON INTERACTIONS ====================

const discoverBtn = document.querySelector('.btn-discover');
discoverBtn.addEventListener('click', () => {
  document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
});

// View Details buttons - allow links to work normally
document.querySelectorAll('.btn-secondary').forEach(btn => {
  // If it's an anchor tag, let it navigate
  if (btn.tagName === 'A') {
    return; // Skip - let href handle navigation
  }
  // If it's a button, add interaction
  btn.addEventListener('click', function(e) {
    const card = this.closest('.booking-card');
    const courseName = card.querySelector('h3').textContent;
    showNotification(`Loading details for ${courseName}...`);
  });
});

// Learn More button
document.querySelector('.btn-dark').addEventListener('click', () => {
  document.querySelector('#courses').scrollIntoView({ behavior: 'smooth' });
});

// Book Event button
document.querySelector('.event-section .btn-yellow').addEventListener('click', () => {
  showNotification('Event booking form will open soon!');
});

// Browse All button
document.querySelectorAll('.products-section .btn-dark')[0].addEventListener('click', () => {
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
});

// ==================== PRODUCT CARD HOVER EFFECT ====================

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 20px 50px rgba(250, 204, 21, 0.2)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
  });
});

// ==================== BLOG CARD INTERACTIONS ====================

document.querySelectorAll('.read-more').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const article = link.closest('.blog-card');
    const title = article.querySelector('h3').textContent;
    showNotification(`Opening article: "${title}"`);
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== NOTIFICATION SYSTEM ====================

function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #facc15;
    color: #1a1a1a;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    box-shadow: 0 5px 20px rgba(250, 204, 21, 0.4);
    animation: slideInRight 0.5s ease;
    z-index: 2000;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideInRight 0.5s ease reverse';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// ==================== SIGN IN BUTTON ====================

document.querySelector('.btn-signin').addEventListener('click', () => {
  showNotification('Sign in page will open soon!');
});

// Contact button on pricing page
const contactBtn = document.querySelector('.btn-contact');
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    showNotification('Contact form will open soon!');
  });
}

// ==================== PARALLAX EFFECT ====================

window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero img');
  const scrollPosition = window.pageYOffset;
  
  if (scrollPosition < window.innerHeight) {
    heroImg.style.transform = `scale(${1 + scrollPosition / 5000})`;
  }
});

// ==================== COUNTER ANIMATION ====================

function animateCounter(element, target, duration = 1000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// ==================== FORM VALIDATION (Example) ====================

const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Thank you! Your message has been sent.');
    contactForm.reset();
  });
}

// ==================== LAZY LOAD IMAGES ====================

const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.animation = 'fadeInUp 0.6s ease';
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ==================== ACTIVE NAV LINK HIGHLIGHT ====================

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', () => {
  showNotification('Welcome to ANDER G. Golf Course!');
});