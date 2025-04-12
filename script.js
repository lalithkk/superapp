// slider 
let currentIndex = 0;
    const slideContainer = document.getElementById("slideContainer");
    const totalSlides = slideContainer.children.length;

    function moveSlide(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      if (currentIndex >= totalSlides) currentIndex = 0;
      slideContainer.style.marginLeft = `-${currentIndex * 100}%`;
    }

    setInterval(() => {
      moveSlide(1);
    }, 5000);

// upcoming
const container = document.querySelector('.upcoming-container');
  let scrollAmount = 0;
  let direction = 1; 

  setInterval(() => {
    const scrollStep = 300;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Update scroll amount
    scrollAmount += scrollStep * direction;

    // Reverse direction at ends
    if (scrollAmount >= maxScroll || scrollAmount <= 0) {
      direction *= -1;
    }

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, 3000)
