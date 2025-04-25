 // slider 
// let currentIndex = 0;
// const slideContainer = document.getElementById("slideContainer");
// const totalSlides = slideContainer.children.length;

// function moveSlide(direction) {
//   currentIndex += direction;
//   if (currentIndex < 0) currentIndex = totalSlides - 1;
//   if (currentIndex >= totalSlides) currentIndex = 0;
//   slideContainer.style.marginLeft = `-${currentIndex * 100}%`;
// }

// setInterval(() => {
//   moveSlide(1);
// }, 5000);
// ////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.pagination-dots');
  let currentIndex = 0;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  
  // Set first slide as active
  slides[0].classList.add('active');
  
  // Auto slide
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  slider.parentElement.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  slider.parentElement.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  // Arrow buttons
  document.querySelector('.arrow-left').addEventListener('click', prevSlide);
  document.querySelector('.arrow-right').addEventListener('click', nextSlide);
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') prevSlide();
    if(e.key === 'ArrowRight') nextSlide();
  });
  
  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});
  
  function handleSwipe() {
    if(touchEndX < touchStartX - 50) nextSlide();
    if(touchEndX > touchStartX + 50) prevSlide();
  }
  
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active classes
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    resetInterval();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    resetInterval();
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetInterval();
  }
  
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
});


// upcoming
const container = document.querySelector('.upcoming-container');
let scrollAmount = 0;
let direction = 1; 

setInterval(() => {
const scrollStep = 300;
const maxScroll = container.scrollWidth - container.clientWidth;

scrollAmount += scrollStep * direction;
if (scrollAmount >= maxScroll || scrollAmount <= 0) {
  direction *= -1;
}
container.scrollTo({
  left: scrollAmount,
  behavior: 'smooth'
});
}, 3000)

// hamburger menu
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  // Toggle mobile menu
  hamburgerBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Change hamburger icon to X when menu is open
      const icon = this.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
      } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
      }
  });
  
  // Close menu when clicking on a link
  mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          hamburgerBtn.querySelector('i').classList.remove('fa-times');
          hamburgerBtn.querySelector('i').classList.add('fa-bars');
      });
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
      if (window.innerWidth > 480) {
          mobileMenu.classList.remove('active');
          hamburgerBtn.querySelector('i').classList.remove('fa-times');
          hamburgerBtn.querySelector('i').classList.add('fa-bars');
      }
  });
});
// ///////////////////////////////////////////////////////////////////////////////////////////////////

// Notification
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the notification manager
  if (!window.notificationManager) {
      window.notificationManager = new NotificationManager();
  }

  // Force update badges immediately
  notificationManager.updateBadges();
  
  // Listen for notification updates
  window.addEventListener('notifications-updated', () => {
      notificationManager.updateBadges();
  });
  
  // Update when page gains focus
  window.addEventListener('focus', () => {
      notificationManager.updateBadges();
  });
  
  // Debugging helper
  window.debugNotifications = () => {
      console.log("Current notifications:", notificationManager.notifications);
      console.log("LocalStorage:", localStorage.getItem('notifications'));
  };
});