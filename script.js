// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Mobile Navigation Toggle
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = $('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Blog Search Functionality
const searchInput = $('#searchInput');
const blogCards = $$('.blog-card');

if (searchInput && blogCards.length > 0) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        blogCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Registration Form Handler
const registrationForm = $('#registrationForm');
if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(registrationForm);
        const data = {
            fullName: $('#fullName').value,
            email: $('#email').value,
            phone: $('#phone').value,
            county: $('#county').value
        };
        
        // Basic validation
        if (!data.fullName || !data.email || !data.phone || !data.county) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!isValidPhone(data.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = registrationForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Registration successful! Welcome to Helalink Agencies. Check your email for activation instructions.', 'success');
            registrationForm.reset();
        } catch (error) {
            showNotification('Registration failed. Please try again later.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Contact Form Handler
const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
        const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
        const message = formData.get('message') || contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = $$('.service-card, .blog-card, .advantage-card, .contact-item');
animateElements.forEach(el => observer.observe(el));

// Service Cards Hover Effects
$$('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Blog Cards Hover Effects
$$('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('.blog-image img');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.blog-image img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Statistics Counter Animation
const statNumbers = $$('.stat-number');
const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.textContent.includes('Ksh')) {
                stat.textContent = `Ksh ${Math.floor(current)}`;
            } else if (stat.textContent.includes('/')) {
                stat.textContent = `${Math.floor(current)}/7`;
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
};

// Trigger stats animation when hero section is visible
const heroSection = $('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(heroSection);
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Kenyan phone number validation (simplified)
    const phoneRegex = /^(\+254|0)?[17]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${getNotificationColor(type)};
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.8rem;
    `;
    
    const icon = notification.querySelector('i');
    icon.style.color = getNotificationColor(type);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        color: #999;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button handler
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

// Service card click handlers for better mobile interaction
$$('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const earnings = card.querySelector('.service-earnings');
        if (earnings) {
            earnings.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                earnings.style.animation = '';
            }, 600);
        }
    });
});

// Add pulse animation to CSS via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
const images = $$('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    if (img.dataset.src) {
        imageObserver.observe(img);
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Helalink Agencies website loaded successfully!');
    
    // Add some initial animations
    setTimeout(() => {
        const heroText = $('.hero-text');
        if (heroText) {
            heroText.classList.add('slide-in-left');
        }
        
        const heroImage = $('.hero-image');
        if (heroImage) {
            heroImage.classList.add('slide-in-right');
        }
    }, 100);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    // Handle navigation state changes if needed
});

// Performance monitoring
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical resources when browser is idle
        const criticalImages = [
            'https://pixabay.com/get/gd39f755af544cc70f1f5a2e91dc7ad8621109b146404281e691ca929431a172df17342f2804279bfe8db2e12403886751ab7334fa35695a74801aecb88821924_1280.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
}
