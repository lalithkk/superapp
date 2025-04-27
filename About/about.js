document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const tabButtonsContainer = document.querySelector('.tab-buttons');
    const dropdownContent = document.querySelector('.dropdown-tab-content');
    const aboutButton = document.querySelector('.tab-button[data-tab="about"]');
    const allTabButtons = Array.from(document.querySelectorAll('.tab-button'));
    const otherButtons = allTabButtons.filter(btn => btn !== aboutButton);
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Function to handle tab clicks
    function handleTabClick(e) {
        e.preventDefault();
        
        // Remove active class from all buttons and panes
        allTabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding pane
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId)?.classList.add('active');
        
        // Close dropdown if open
        const dropdown = document.querySelector('.dropdown-tab-content');
        if (dropdown?.classList.contains('show')) {
            dropdown.classList.remove('show');
            document.querySelector('.dropdown-icon')?.classList.remove('rotate-180');
        }
    }

    // Initialize tab functionality
    function initTabs() {
        allTabButtons.forEach(button => {
            button.removeEventListener('click', handleTabClick); // Clean up first
            button.addEventListener('click', handleTabClick); // Add new listener
        });
    }

    // Handle responsive layout
    function handleResponsiveLayout() {
        if (window.innerWidth <= 480) {
            // Mobile view - move other buttons to dropdown
            otherButtons.forEach(button => {
                if (!dropdownContent.contains(button)) {
                    dropdownContent.appendChild(button);
                }
                button.style.display = 'flex';
            });
        } else {
            // Desktop view - move buttons back to main container
            otherButtons.forEach(button => {
                if (!tabButtonsContainer.contains(button)) {
                    aboutButton.insertAdjacentElement('afterend', button);
                }
                button.style.display = 'flex';
            });
        }
        initTabs(); // Reinitialize tab functionality
    }

    // Initial setup
    handleResponsiveLayout();
    initTabs();

    // Handle window resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResponsiveLayout, 100);
    });

    // Dropdown toggle functionality
    const dropdownTabButton = document.querySelector('.dropdown-tab-button');
    if (dropdownTabButton) {
        dropdownTabButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = document.querySelector('.dropdown-tab-content');
            const icon = document.querySelector('.dropdown-icon');
            
            dropdown.classList.toggle('show');
            icon.classList.toggle('rotate-180');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.dropdown-tab-content');
        const dropdownBtn = document.querySelector('.dropdown-tab-button');
        
        if (dropdown && dropdownBtn && 
            !dropdown.contains(e.target) && 
            !dropdownBtn.contains(e.target)) {
            dropdown.classList.remove('show');
            document.querySelector('.dropdown-icon')?.classList.remove('rotate-180');
        }
    });

 

        // Animate elements when they come into view
    const animateElements = document.querySelectorAll('[class*="animate-"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate-'));
                
                if (animationClass) {
                    element.style.opacity = 1;
                    element.style.transform = 'translate(0)';
                }
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        if (element.classList.contains('animate-slide-up')) {
            element.style.opacity = 0;
            element.style.transform = 'translateY(50px)';
        } else if (element.classList.contains('animate-fade-in')) {
            element.style.opacity = 0;
        }
        observer.observe(element);
    });

    // Try to play video (this will work if autoplay is allowed)
    const heroVideo = document.querySelector('.hero-video-container video');
    heroVideo.play().catch(e => {
        console.log('Autoplay prevented, showing fallback message:', e);
        
    });
});