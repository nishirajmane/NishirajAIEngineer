// Main JavaScript for Nishiraj Mane Portfolio

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Portfolio initializing...');

    // Initialize all components
    initializeLoadingScreen();
    initializeNavigation();
    initialize3DCanvas();
    initializeParticles();
    initializeAnimations();
    initializeContactForm();
    initializeIcons();
    initializeAOS();

    console.log('Portfolio initialization complete');
});

// Loading Screen Management
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (!loadingScreen) return;

    // Hide loading screen after a maximum of 5 seconds
    const maxLoadTime = 5000;
    const startTime = Date.now();

    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Hide loading screen when everything is ready
    window.addEventListener('load', () => {
        const loadTime = Date.now() - startTime;
        const remainingTime = Math.max(0, maxLoadTime - loadTime);
        setTimeout(hideLoadingScreen, remainingTime);
    });

    // Fallback: hide after max time
    setTimeout(hideLoadingScreen, maxLoadTime);
}

// Navigation Management
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
            }
        });
    });
}

// 3D Canvas Initialization
function initialize3DCanvas() {
    const canvasContainer = document.getElementById('hero-canvas');
    if (!canvasContainer) {
        console.warn('Hero canvas container not found');
        return;
    }

    try {
        // Check if Three.js is available
        if (typeof THREE === 'undefined') {
            console.warn('Three.js not loaded, skipping 3D canvas');
            return;
        }

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        canvasContainer.appendChild(renderer.domElement);

        // Create AI brain geometry
        const brainGeometry = new THREE.SphereGeometry(2, 32, 32);
        const brainMaterial = new THREE.MeshPhongMaterial({
            color: 0x0d6efd,
            transparent: true,
            opacity: 0.8,
            wireframe: true
        });

        const brain = new THREE.Mesh(brainGeometry, brainMaterial);
        scene.add(brain);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x0d6efd, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Position camera
        camera.position.z = 5;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);

            // Rotate brain
            brain.rotation.x += 0.01;
            brain.rotation.y += 0.01;

            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        });

        console.log('3D canvas initialized successfully');

    } catch (error) {
        console.error('Error initializing 3D canvas:', error);
        // Create a fallback visual element
        canvasContainer.innerHTML = '<div class="fallback-3d"></div>';
    }
}

// Particles System
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// GSAP Animations
function initializeAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, using CSS animations');
        return;
    }

    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Hero section animations
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

    // Skill cards stagger animation
    gsap.from('.skill-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Project cards animation
    gsap.from('.project-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Contact Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#0d6efd';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize Lucide icons with retry mechanism
function initializeIcons() {
    let retryCount = 0;
    const maxRetries = 3;

    function tryInitializeIcons() {
        if (typeof lucide !== 'undefined') {
            try {
                lucide.createIcons();
                console.log('Icons initialized successfully');

                // Verify icons are working
                const iconElements = document.querySelectorAll('[data-lucide]');
                if (iconElements.length > 0) {
                    console.log(`${iconElements.length} icons found and initialized`);
                }
            } catch (error) {
                console.error('Error initializing icons:', error);
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(tryInitializeIcons, 1000);
                }
            }
        } else {
            console.warn('Lucide icons not loaded');
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(tryInitializeIcons, 1000);
            }
        }
    }

    tryInitializeIcons();
}

// Initialize AOS (Animate On Scroll) with retry mechanism
function initializeAOS() {
    let retryCount = 0;
    const maxRetries = 3;

    function tryInitializeAOS() {
        if (typeof AOS !== 'undefined') {
            try {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100,
                    disable: 'mobile' // Disable on mobile for better performance
                });
                console.log('AOS initialized successfully');
            } catch (error) {
                console.error('Error initializing AOS:', error);
                if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(tryInitializeAOS, 1000);
                }
            }
        } else {
            console.warn('AOS not loaded');
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(tryInitializeAOS, 1000);
            }
        }
    }

    tryInitializeAOS();
}

// Projects page specific functionality
if (window.location.pathname.includes('projects.html')) {
    initializeProjectFilters();
}

// Project filtering functionality
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-detailed');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .fallback-3d {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(13, 110, 253, 0.1) 0%, rgba(111, 66, 193, 0.1) 100%);
        position: relative;
    }
    
    .fallback-3d::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        border: 2px solid #0d6efd;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .notification {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    /* Fallback for icons that don't load */
    [data-lucide]:not(:has(svg))::before {
        content: '🔧';
        font-size: 1.5rem;
    }
    
    /* Ensure sections are visible even without animations */
    .skill-card, .project-card {
        opacity: 1 !important;
        transform: none !important;
    }
    
    /* Force visibility for critical sections */
    #skills, #projects {
        display: block !important;
        visibility: visible !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';

                img.onload = () => {
                    img.style.opacity = '1';
                };

                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setTimeout(initializeLazyLoading, 500);

// Force visibility check after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        // Check if sections are visible
        const skillsSection = document.getElementById('skills');
        const projectsSection = document.getElementById('projects');

        if (skillsSection) {
            skillsSection.style.display = 'block';
            skillsSection.style.visibility = 'visible';
        }

        if (projectsSection) {
            projectsSection.style.display = 'block';
            projectsSection.style.visibility = 'visible';
        }

        // Force icon initialization again
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 2000);
});

console.log('Portfolio script loaded successfully'); 