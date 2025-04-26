document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
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