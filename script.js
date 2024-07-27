document.addEventListener("DOMContentLoaded", () => {
    // Downward scroll functionality
    const downwardButton = document.querySelector(".downward-button-link");
    if (downwardButton) {
        downwardButton.addEventListener("click", (event) => {
            event.preventDefault();
            const targetElement = document.getElementById("scroll-target");
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const reducedScrollPosition = targetPosition * 0.6;
                smoothScrollTo(reducedScrollPosition, 1500);
            }
        });
    }

    function smoothScrollTo(target, duration) {
        const start = window.scrollY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easing = easeInOutQuad(progress);
            window.scrollTo(0, start + (target - start) * easing);
            if (timeElapsed < duration) {
                requestAnimationFrame(scrollStep);
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        requestAnimationFrame(scrollStep);
    }

    // Slider functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slider-slide');
    const totalSlides = slides.length;
    const slider = document.querySelector('.slider');
    const slideDuration = 2000;
    const transitionDuration = 500;

    function moveSlide(n) {
        slideIndex = (slideIndex + n + totalSlides) % totalSlides;
        updateSlider();
        updateContactButton();
    }

    function updateSlider() {
        if (slides.length === 0) return;

        const slideWidth = slides[0].offsetWidth;
        const newTransformValue = `translateX(-${slideIndex * slideWidth}px)`;
        slider.style.transition = 'none';
        slider.style.transform = newTransformValue;
        requestAnimationFrame(() => {
            slider.style.transition = `transform ${transitionDuration}ms ease-in-out`;
            slider.style.transform = newTransformValue;
        });
    }

    function updateContactButton() {
        const chatButtons = document.querySelectorAll('.contact-button');
        chatButtons.forEach(button => {
            button.classList.remove('green', 'blue');
        });

        const currentSlide = slides[slideIndex];
        const currentButton = currentSlide.querySelector('.contact-button');
        if (currentButton) {
            currentButton.classList.add(slideIndex === 0 ? 'green' : 'blue');
        }
    }

    function updateContactButtons() {
        const chatButtons = document.querySelectorAll('.contact-button');
        chatButtons.forEach(button => {
            if (!button.hasEventListener('click', handleButtonClick)) {
                button.addEventListener('click', handleButtonClick);
            }
        });
    }

    function handleButtonClick(event) {
        // Prevent default link behavior
        event.preventDefault();
    
        // Show chat window or perform other actions
        // ... your chat implementation code here ...
    }

    updateSlider();
    updateContactButtons();

    setInterval(() => {
        moveSlide(1);
    }, slideDuration);

    const leftButton = document.querySelector('.slider-button.left');
    const rightButton = document.querySelector('.slider-button.right');

    if (leftButton) {
        leftButton.addEventListener('click', () => moveSlide(-1));
    }

    if (rightButton) {
        rightButton.addEventListener('click', () => moveSlide(1));
    }
});
