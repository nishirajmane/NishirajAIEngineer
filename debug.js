// Debug script for portfolio issues
console.log('=== PORTFOLIO DEBUG START ===');

// Check if sections exist
const skillsSection = document.getElementById('skills');
const projectsSection = document.getElementById('projects');

console.log('Skills section found:', !!skillsSection);
console.log('Projects section found:', !!projectsSection);

if (skillsSection) {
    console.log('Skills section display:', getComputedStyle(skillsSection).display);
    console.log('Skills section visibility:', getComputedStyle(skillsSection).visibility);
    console.log('Skills section opacity:', getComputedStyle(skillsSection).opacity);

    const skillCards = skillsSection.querySelectorAll('.skill-card');
    console.log('Skill cards found:', skillCards.length);

    skillCards.forEach((card, index) => {
        console.log(`Skill card ${index + 1}:`, {
            display: getComputedStyle(card).display,
            visibility: getComputedStyle(card).visibility,
            opacity: getComputedStyle(card).opacity
        });
    });
}

if (projectsSection) {
    console.log('Projects section display:', getComputedStyle(projectsSection).display);
    console.log('Projects section visibility:', getComputedStyle(projectsSection).visibility);
    console.log('Projects section opacity:', getComputedStyle(projectsSection).opacity);

    const projectCards = projectsSection.querySelectorAll('.project-card');
    console.log('Project cards found:', projectCards.length);

    projectCards.forEach((card, index) => {
        console.log(`Project card ${index + 1}:`, {
            display: getComputedStyle(card).display,
            visibility: getComputedStyle(card).visibility,
            opacity: getComputedStyle(card).opacity
        });
    });
}

// Check for icons
const iconElements = document.querySelectorAll('[data-lucide]');
console.log('Icon elements found:', iconElements.length);

// Check for AOS
console.log('AOS available:', typeof AOS !== 'undefined');

// Check for Lucide
console.log('Lucide available:', typeof lucide !== 'undefined');

// Force visibility
setTimeout(() => {
    console.log('=== FORCING VISIBILITY ===');

    if (skillsSection) {
        skillsSection.style.display = 'block';
        skillsSection.style.visibility = 'visible';
        skillsSection.style.opacity = '1';
        console.log('Forced skills section visibility');
    }

    if (projectsSection) {
        projectsSection.style.display = 'block';
        projectsSection.style.visibility = 'visible';
        projectsSection.style.opacity = '1';
        console.log('Forced projects section visibility');
    }

    // Force skill cards visibility
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    console.log('Forced skill cards visibility');

    // Force project cards visibility
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
    console.log('Forced project cards visibility');

    // Try to initialize icons again
    if (typeof lucide !== 'undefined') {
        try {
            lucide.createIcons();
            console.log('Re-initialized icons');
        } catch (error) {
            console.error('Error re-initializing icons:', error);
        }
    }

}, 1000);

console.log('=== PORTFOLIO DEBUG END ==='); 