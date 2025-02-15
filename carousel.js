document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Set up slides
    const slideWidth = slides[0].getBoundingClientRect().width;
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Track current slide
    let currentSlide = 0;
    let autoplayInterval;

    const updateDots = (currentIndex) => {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
        }

        track.style.transform = `translateX(-${targetIndex * 100}%)`;
        currentSlide = targetIndex;
        updateDots(currentSlide);
    };

    // Event Listeners
    nextButton.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
        resetAutoplay();
    });

    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
        resetAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoplay();
        });
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                moveToSlide(currentSlide + 1);
            } else {
                moveToSlide(currentSlide - 1);
            }
            resetAutoplay();
        }
    };

    // Autoplay
    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            moveToSlide(currentSlide + 1);
        }, 2000);
    };

    const resetAutoplay = () => {
        clearInterval(autoplayInterval);
        startAutoplay();
    };

    // Start autoplay
    startAutoplay();

    // Pause autoplay when user hovers over carousel
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', startAutoplay);
});