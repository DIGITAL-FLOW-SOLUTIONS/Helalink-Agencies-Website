// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Top Stories Sliding Animation
let isStoriesPaused = false;
const storiesTrack = $('#storiesTrack');
const pausePlayBtn = $('#pausePlayBtn');

if (pausePlayBtn && storiesTrack) {
    pausePlayBtn.addEventListener('click', () => {
        isStoriesPaused = !isStoriesPaused;
        
        if (isStoriesPaused) {
            storiesTrack.style.animationPlayState = 'paused';
            pausePlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            storiesTrack.style.animationPlayState = 'running';
            pausePlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });
}

// Dark Mode Toggle
const darkModeToggle = $('.dark-mode-toggle');
let isDarkMode = false;

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.style.filter = 'none';
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Story Card Interactions
$$('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const storyCard = btn.closest('.story-card');
        const storyTitle = storyCard.querySelector('h3').textContent;
        
        // Animate button click
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        console.log('Reading more about:', storyTitle);
        // Here you would typically navigate to the full story
    });
});

$$('.join-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Animate button click
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        // Scroll to registration or show registration modal
        const registerBtn = $('.register-btn');
        if (registerBtn) {
            registerBtn.click();
        }
        
        console.log('Joining now clicked');
    });
});

// Navigation Dots Functionality
const dots = $$('.dot');
if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            dots.forEach(d => d.classList.remove('active'));
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Scroll to corresponding section
            const sections = $$('section');
            if (sections[index]) {
                sections[index].scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Smooth Scrolling for Navigation Links
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = $(href);
            if (target) {
                const offsetTop = target.offsetTop;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = $$('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Update active dot based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 200;
    const sections = $$('section');
    const dots = $$('.dot');
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
    });
});

// Image Hover Effects
$$('.section-image img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Add loading animation to images
$$('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
    
    // Set initial loading state
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const navLinks = $('.nav-links');
    if (window.innerWidth <= 768 && navLinks) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.gap = '10px';
    }
};

// Handle window resize
window.addEventListener('resize', createMobileMenu);

// Initialize infinite scrolling for stories
const initInfiniteStories = () => {
    const storiesTrack = $('#storiesTrack');
    if (storiesTrack) {
        const originalStories = Array.from(storiesTrack.children);
        
        // Duplicate stories for seamless infinite scroll
        originalStories.forEach(story => {
            const clone = story.cloneNode(true);
            storiesTrack.appendChild(clone);
        });
        
        // Add event listeners to cloned buttons
        $$('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const storyCard = btn.closest('.story-card');
                const storyTitle = storyCard.querySelector('h3').textContent;
                
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
                
                console.log('Reading more about:', storyTitle);
            });
        });
        
        $$('.join-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
                
                const registerBtn = $('.register-btn');
                if (registerBtn) {
                    registerBtn.scrollIntoView({ behavior: 'smooth' });
                }
                
                console.log('Joining now clicked');
            });
        });
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Trendqash Agencies website loaded successfully!');
    
    // Initialize infinite stories
    initInfiniteStories();
    
    // Set first dot as active initially
    const firstDot = $('.dot');
    if (firstDot) {
        firstDot.classList.add('active');
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Add entrance animations
    setTimeout(() => {
        const heroSection = $('.hero-section');
        if (heroSection) {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = $('.hero-image img');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add click effects to sections
$$('.section-container').forEach(container => {
    container.addEventListener('click', () => {
        container.style.transform = 'scale(0.98)';
        setTimeout(() => {
            container.style.transform = 'scale(1)';
        }, 150);
    });
    
    container.style.transition = 'transform 0.15s ease';
});

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload images when browser is idle
        const imageUrls = [
            'https://images.pexels.com/photos/3756678/pexels-photo-3756678.jpeg',
            'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
            'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg',
            'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg',
            'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg'
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url + '?auto=compress&cs=tinysrgb&w=500';
        });
    });
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    const activeDot = $('.dot.active');
    const dots = $$('.dot');
    const currentIndex = Array.from(dots).indexOf(activeDot);
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % dots.length;
        dots[nextIndex].click();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + dots.length) % dots.length;
        dots[prevIndex].click();
    }
});

// Add visual feedback for interactive elements
$$('.nav-item, .nav-register-btn, .dot').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-2px)';
        element.style.transition = 'transform 0.2s ease';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
    });
});

// Initialize smooth scrolling behavior
if (!CSS.supports('scroll-behavior', 'smooth')) {
    // Polyfill for browsers that don't support scroll-behavior
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}