// Certifications Page JavaScript

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

    // Initialize skill bars
    initSkillBars();

    // Initialize timeline interactions
    initTimelineInteractions();
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

    // Timeline items animation
    gsap.from('.timeline-item', {
        duration: 0.8,
        x: -100,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Education cards animation
    gsap.from('.education-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.education-card',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        }
    });

    // Skills categories animation
    gsap.from('.skills-category', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.skills-category',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;

                // Reset width to 0 for animation
                progressBar.style.width = '0%';

                // Animate to target width
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-out';
                    progressBar.style.width = width;
                }, 200);

                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Timeline Interactions
function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const certificationCards = document.querySelectorAll('.certification-card');

    timelineItems.forEach((item, index) => {
        // Add hover effects
        item.addEventListener('mouseenter', () => {
            item.classList.add('glow');
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('glow');
        });

        // Add click effects
        item.addEventListener('click', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'absolute inset-0 bg-blue-400 opacity-20 rounded-lg scale-0 transition-transform duration-300';
            item.style.position = 'relative';
            item.appendChild(ripple);

            setTimeout(() => {
                ripple.style.transform = 'scale(1)';
            }, 10);

            setTimeout(() => {
                ripple.remove();
            }, 300);

            // Show certification details
            showCertificationDetails(index);
        });
    });

    // Education card interactions
    const educationCards = document.querySelectorAll('.education-card');

    educationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('glow');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('glow');
        });
    });
}

// Show certification details
function showCertificationDetails(index) {
    const certifications = [
        {
            title: "AWS Machine Learning Specialty",
            issuer: "Amazon Web Services",
            year: "2024",
            description: "Advanced certification in machine learning on AWS, covering SageMaker, data engineering, and ML model deployment.",
            skills: ["SageMaker", "Data Engineering", "ML Deployment", "AWS Services"],
            validity: "Valid until 2027"
        },
        {
            title: "Google Cloud Professional Data Engineer",
            issuer: "Google Cloud",
            year: "2023",
            description: "Professional certification in designing and building data processing systems on Google Cloud Platform.",
            skills: ["BigQuery", "Dataflow", "Pub/Sub", "Cloud Storage"],
            validity: "Valid until 2026"
        },
        {
            title: "ISTQB Certified Tester Foundation Level",
            issuer: "ISTQB",
            year: "2023",
            description: "International Software Testing Qualifications Board certification in software testing fundamentals and best practices.",
            skills: ["Test Design", "Test Management", "Test Tools", "Quality Assurance"],
            validity: "Valid until 2026"
        },
        {
            title: "Docker Certified Associate",
            issuer: "Docker Inc.",
            year: "2022",
            description: "Professional certification in Docker containerization, orchestration, and best practices for DevOps.",
            skills: ["Containerization", "Docker Compose", "Docker Swarm", "Registry"],
            validity: "Valid until 2025"
        },
        {
            title: "Oracle Certified Professional Java Developer",
            issuer: "Oracle",
            year: "2022",
            description: "Professional certification in Java development, covering advanced Java features and enterprise development.",
            skills: ["Java 11+", "Spring Framework", "Enterprise Java", "JPA/Hibernate"],
            validity: "Valid until 2025"
        }
    ];

    const cert = certifications[index];
    if (cert) {
        showNotification(`${cert.title} - ${cert.issuer} (${cert.year})`, 'info');
    }
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

// Add CSS for certifications-specific styles
const certificationStyles = `
    .timeline-container {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
    }

    .timeline-container::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom, transparent, #0d6efd, transparent);
        transform: translateX(-50%);
    }

    .timeline-item {
        position: relative;
        margin-bottom: 3rem;
        display: flex;
        align-items: center;
    }

    .timeline-item:nth-child(odd) {
        flex-direction: row;
    }

    .timeline-item:nth-child(even) {
        flex-direction: row-reverse;
    }

    .timeline-marker {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: rgba(13, 110, 253, 0.2);
        border: 2px solid #0d6efd;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    .timeline-content {
        width: 45%;
        padding: 0 2rem;
    }

    .certification-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .certification-card:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(13, 110, 253, 0.3);
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(13, 110, 253, 0.1);
    }

    .certification-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .certification-icon {
        width: 50px;
        height: 50px;
        background: rgba(13, 110, 253, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .certification-info {
        flex: 1;
    }

    .certification-date {
        text-align: right;
    }

    .certification-badge {
        margin-top: 1rem;
    }

    .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        background: rgba(34, 197, 94, 0.2);
        color: #22c55e;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .education-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 2rem;
        transition: all 0.3s ease;
    }

    .education-card:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(13, 110, 253, 0.3);
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(13, 110, 253, 0.1);
    }

    .education-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .education-icon {
        width: 60px;
        height: 60px;
        background: rgba(13, 110, 253, 0.1);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .education-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .highlight {
        padding: 0.25rem 0.75rem;
        background: rgba(13, 110, 253, 0.2);
        color: #0d6efd;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    .skills-category {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 2rem;
        transition: all 0.3s ease;
    }

    .skills-category:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(13, 110, 253, 0.3);
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(13, 110, 253, 0.1);
    }

    .skills-list {
        space-y: 4;
    }

    .skill-item {
        margin-bottom: 1.5rem;
    }

    .skill-name {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #ffffff;
    }

    .skill-bar {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }

    .skill-progress {
        height: 100%;
        background: linear-gradient(90deg, #0d6efd, #6f42c1);
        border-radius: 4px;
        transition: width 1.5s ease-out;
    }

    @media (max-width: 768px) {
        .timeline-container::before {
            left: 2rem;
        }

        .timeline-item {
            flex-direction: row !important;
        }

        .timeline-marker {
            left: 2rem;
        }

        .timeline-content {
            width: calc(100% - 4rem);
            margin-left: 4rem;
            padding: 0 1rem;
        }

        .certification-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }

        .certification-date {
            text-align: left;
        }

        .education-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = certificationStyles;
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

console.log('🎓 Certifications Page - Professional Development Portfolio Loaded Successfully!');
console.log('📚 Features: Timeline, Skill Bars, Interactive Cards, and Responsive Design'); 