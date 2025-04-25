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
                
                const fallbackImg = document.createElement('img');
                fallbackImg.src = 'https://i.pinimg.com/736x/96/56/f2/9656f2b04f5ae350d56331e1df2af84d.jpg';
                fallbackImg.alt = 'Video fallback';
                fallbackImg.style.width = '100%';
                fallbackImg.style.height = '100%';
                fallbackImg.style.objectFit = 'cover';
                document.querySelector('.video-container').prepend(fallbackImg);
            });
        }
    }
});