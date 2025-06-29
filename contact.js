// Contact Page JavaScript

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

    // Initialize mobile menu
    initMobileMenu();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize GSAP animations
    initGSAPAnimations();

    // Initialize contact form
    initContactForm();

    // Initialize FAQ interactions
    initFAQInteractions();

    // Initialize 3D globe
    init3DGlobe();

    // Initialize social interactions
    initSocialInteractions();
});

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

    // Contact form animation
    gsap.from('.glass-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.glass-card',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        }
    });

    // FAQ items animation
    gsap.from('.faq-item', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.faq-item',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!firstName || !lastName || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 mr-2 animate-spin"></i>Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 2000);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });

            input.addEventListener('input', () => {
                clearFieldError(input);
            });
        });
    }
}

// Field validation
function validateField(field) {
    const value = field.value.trim();

    switch (field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'text':
            if (field.required && !value) {
                showFieldError(field, 'This field is required');
            }
            break;
        case 'textarea':
            if (field.required && !value) {
                showFieldError(field, 'This field is required');
            }
            break;
    }
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-400 text-sm mt-1';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
    field.classList.add('border-red-400');
}

// Clear field error
function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.text-red-400');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.classList.remove('border-red-400');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// FAQ Interactions
function initFAQInteractions() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('i');

                    gsap.to(otherAnswer, {
                        height: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });

                    gsap.to(otherIcon, {
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                gsap.to(answer, {
                    height: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(icon, {
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                item.classList.add('open');
                gsap.to(answer, {
                    height: 'auto',
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to(icon, {
                    rotation: 180,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// 3D Globe
function init3DGlobe() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create globe geometry
    const globeGeometry = new THREE.SphereGeometry(3, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x0d6efd,
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Add connection lines (representing global reach)
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionPoints = [];

    // Create random connection points around the globe
    for (let i = 0; i < 20; i++) {
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const radius = 3.5;

        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);

        connectionPoints.push(new THREE.Vector3(x, y, z));
    }

    connectionGeometry.setFromPoints(connectionPoints);
    const connectionMaterial = new THREE.LineBasicMaterial({
        color: 0x0d6efd,
        transparent: true,
        opacity: 0.6
    });
    const connections = new THREE.Line(connectionGeometry, connectionMaterial);
    scene.add(connections);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x0d6efd, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 8;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        globe.rotation.y += 0.005;
        connections.rotation.y += 0.003;

        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Social Interactions
function initSocialInteractions() {
    const socialCards = document.querySelectorAll('.social-card');

    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('glow');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('glow');
        });

        card.addEventListener('click', (e) => {
            e.preventDefault();

            // Add click animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);

            // Show notification
            const platform = card.querySelector('span').textContent;
            showNotification(`Opening ${platform} profile...`, 'info');
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

// Add CSS for contact-specific styles
const contactStyles = `
    .contact-icon {
        width: 40px;
        height: 40px;
        background: rgba(13, 110, 253, 0.1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .social-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        text-decoration: none;
        color: white;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .social-card:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(13, 110, 253, 0.3);
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(13, 110, 253, 0.2);
    }

    .service-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .service-item:last-child {
        border-bottom: none;
    }

    .faq-item {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .faq-item:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(13, 110, 253, 0.3);
    }

    .faq-question {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: none;
        border: none;
        color: white;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .faq-question:hover {
        background: rgba(13, 110, 253, 0.1);
    }

    .faq-answer {
        height: 0;
        overflow: hidden;
        padding: 0 1.5rem;
    }

    .faq-answer p {
        padding-bottom: 1.5rem;
        color: #9ca3af;
        line-height: 1.6;
    }

    .globe-container {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 2rem;
    }

    @media (max-width: 768px) {
        .social-card {
            padding: 1rem;
        }
        
        .faq-question {
            padding: 1rem;
            font-size: 1rem;
        }
        
        .faq-answer {
            padding: 0 1rem;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
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

console.log('📧 Contact Page - Professional Communication Hub Loaded Successfully!');
console.log('🌍 Features: Interactive Form, 3D Globe, FAQ System, and Social Integration'); 