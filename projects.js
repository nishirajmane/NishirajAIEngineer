// Projects Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize project filtering
    initProjectFiltering();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize GSAP animations
    initGSAPAnimations();

    // Initialize project card interactions
    initProjectInteractions();
});

// Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-detailed');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });

            // Add animation delay for staggered effect
            const visibleCards = Array.from(projectCards).filter(card =>
                card.style.display !== 'none'
            );

            visibleCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');

            // Toggle menu icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('translate-x-full')) {
                    icon.setAttribute('data-lucide', 'menu');
                } else {
                    icon.setAttribute('data-lucide', 'x');
                }
                lucide.createIcons();
            }
        });

        // Close menu when clicking on links
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// GSAP Animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-section h1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('.hero-section p', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
    });

    // Filter buttons animation
    gsap.from('.filter-btn', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 1.1,
        stagger: 0.1
    });

    // Project cards animation
    gsap.from('.project-card-detailed', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#projects-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // CTA section animation
    gsap.from('.glass-card', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.glass-card',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Project Card Interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card-detailed');

    projectCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.classList.add('glow');
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('glow');
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });

        // Click effects
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on project links
            if (e.target.closest('.project-link-btn')) {
                return;
            }

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'absolute inset-0 bg-blue-400 opacity-20 rounded-lg scale-0 transition-transform duration-300';
            card.style.position = 'relative';
            card.appendChild(ripple);

            setTimeout(() => {
                ripple.style.transform = 'scale(1)';
            }, 10);

            setTimeout(() => {
                ripple.remove();
            }, 300);
        });
    });

    // Project link buttons
    const projectLinks = document.querySelectorAll('.project-link-btn');

    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.stopPropagation();

            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);

            // Show notification
            const action = link.textContent.includes('Demo') ? 'demo' : 'source code';
            showNotification(`Opening ${action}...`, 'info');
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transform translate-x-full transition-transform duration-300 ${type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for project-specific styles
const projectStyles = `
    .project-card-detailed {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .project-card-detailed:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(13, 110, 253, 0.3);
        transform: translateY(-10px);
        box-shadow: 0 25px 50px rgba(13, 110, 253, 0.2);
    }

    .project-image-detailed {
        height: 250px;
        background: linear-gradient(135deg, rgba(13, 110, 253, 0.1) 0%, rgba(111, 66, 193, 0.1) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.3s ease;
    }

    .project-card-detailed:hover .project-image-detailed {
        background: linear-gradient(135deg, rgba(13, 110, 253, 0.2) 0%, rgba(111, 66, 193, 0.2) 100%);
    }

    .project-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .project-links {
        display: flex;
        gap: 1rem;
    }

    .project-link-btn {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background: rgba(13, 110, 253, 0.2);
        border: 1px solid rgba(13, 110, 253, 0.3);
        border-radius: 8px;
        color: #0d6efd;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .project-link-btn:hover {
        background: rgba(13, 110, 253, 0.3);
        border-color: #0d6efd;
        transform: translateY(-2px);
    }

    .project-content-detailed {
        padding: 1.5rem;
    }

    .project-stats {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .stat {
        text-align: center;
        flex: 1;
    }

    .stat-number {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #0d6efd;
        font-family: 'Orbitron', monospace;
    }

    .stat-label {
        display: block;
        font-size: 0.875rem;
        color: #9ca3af;
        margin-top: 0.25rem;
    }

    .filter-btn {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #ffffff;
        font-weight: 600;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .filter-btn:hover {
        background: rgba(13, 110, 253, 0.1);
        border-color: rgba(13, 110, 253, 0.3);
        transform: translateY(-2px);
    }

    .filter-btn.active {
        background: rgba(13, 110, 253, 0.2);
        border-color: #0d6efd;
        color: #0d6efd;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .project-image-detailed {
            height: 200px;
        }
        
        .project-links {
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .project-stats {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = projectStyles;
document.head.appendChild(styleSheet);

// Performance optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;

    function updateOnScroll() {
        // Update scroll-based animations here
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Initialize performance optimizations
optimizePerformance();

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize with debouncing
window.addEventListener('resize', debounce(() => {
    // Reinitialize responsive elements
    if (window.innerWidth > 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('translate-x-full');
        }
    }
}, 250));

console.log('🚀 Projects Page - Premium Portfolio Projects Loaded Successfully!');
console.log('✨ Features: Filtering, Animations, Interactive Cards, and Responsive Design'); 