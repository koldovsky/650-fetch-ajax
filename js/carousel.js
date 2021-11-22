(function() {
    const slides = [
        '<div><img src="img/baby-yoda.svg" alt="Baby Yoda"></div>',
        '<div><img src="img/banana.svg" alt="Banana"></div>',
        '<div><img src="img/girl.svg" alt="Girl"></div>',
        '<div><img src="img/viking.svg" alt="Viking"></div>'
    ];

    let currentSlideIdx = 0;

    function renderSlides() {
        const slidesContainer = document.querySelector('.carousel .slides-container');
        slidesContainer.innerHTML = slides[currentSlideIdx];
        if (window.innerWidth > 500) {
            const slide2Idx = currentSlideIdx + 1 >= slides.length ? 0 : currentSlideIdx + 1;
            slidesContainer.innerHTML += slides[slide2Idx];
            if (window.innerWidth > 900) {
                const slide3Idx = slide2Idx + 1 >= slides.length ? 0 : slide2Idx + 1;
                slidesContainer.innerHTML += slides[slide3Idx];    
            }
        }
    }

    function nextSlide() {
        currentSlideIdx++;
        if (currentSlideIdx >= slides.length) currentSlideIdx = 0;
        renderSlides();
    }

    function prevSlide() {
        currentSlideIdx--;
        if (currentSlideIdx < 0) currentSlideIdx = slides.length - 1;
        renderSlides();
    }

    setInterval(nextSlide, 3000);
    document.querySelector('.carousel .prev').addEventListener('click', prevSlide);
    document.querySelector('.carousel .next').addEventListener('click', nextSlide);

    renderSlides();

    window.addEventListener('resize', renderSlides);
})();