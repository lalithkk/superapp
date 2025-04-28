document.addEventListener('DOMContentLoaded', function() {
    // Animation triggers
    const animateOnScroll = (elements, threshold = 0.1) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Animate story cards
    const storyCards = document.querySelectorAll('.story-card');
    animateOnScroll(storyCards);
    
    // Animate stats section
    const statsSection = document.querySelector('.stats-section');
    animateOnScroll([statsSection]);
    
    // Animate milestone items
    const milestoneItems = document.querySelectorAll('.milestone-item');
    animateOnScroll(milestoneItems);
    
    // Animate commitment cards
    const commitmentCards = document.querySelectorAll('.commitment-card');
    animateOnScroll(commitmentCards);
    
    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    animateOnScroll(testimonialCards, 0.2);
    
    // Horizontal scroll for testimonials
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialsContainer.offsetLeft;
            scrollLeft = testimonialsContainer.scrollLeft;
        });
        
        testimonialsContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialsContainer.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialsContainer.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsContainer.scrollLeft = scrollLeft - walk;
        });
    }
});