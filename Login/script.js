const logregBox = document.querySelector('.logreg-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    logregBox.classList.add('active');
});

loginLink.addEventListener('click', () => {
    logregBox.classList.remove('active');
});

// Video autoplay with fallback
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-container video');
    if(video) {
        video.muted = true;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Auto-play was prevented, show fallback image
                const fallbackImg = document.createElement('img');
                fallbackImg.src = 'C:/Users/91809/Desktop/project/superApp/assest/upcoming/fash1.png';
                fallbackImg.alt = 'Video fallback';
                fallbackImg.style.width = '100%';
                fallbackImg.style.height = '100%';
                fallbackImg.style.objectFit = 'cover';
                document.querySelector('.video-container').prepend(fallbackImg);
            });
        }
    }
});