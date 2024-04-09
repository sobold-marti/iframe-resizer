jQuery(() => {
    // Initially update the counter
    updateSlideCounter();

    // On click "Next" arrow
    $('[data-slideshow-action="next"]').click(function() {
        let currentSlide = $('.slide:visible');
        let nextSlide = currentSlide.next('.slide');
        if (nextSlide.length) {
            currentSlide.hide();
            nextSlide.show();
            updateSlideCounter();
        }
        updateNavigationState();

        // Init textfill
        $('.text-fill').textfill({
            innerTag: 'div'
        });
    });

    // On click "Previous" arrow
    $('[data-slideshow-action="prev"]').click(function() {
        let currentSlide = $('.slide:visible');
        let prevSlide = currentSlide.prev('.slide');
        if (prevSlide.length) {
            currentSlide.hide();
            prevSlide.show();
            updateSlideCounter();
        }
        updateNavigationState();

        $('.text-fill').textfill({
            innerTag: 'div'
        });
    });

    function updateNavigationState() {
        // Get the index of the current visible slide
        let currentIndex = $('.slide').index($('.slide:visible'));
        // Calculate the index of the last slide
        let lastIndex = $('.slide').length - 1;
    
        // Disable "prev" arrow if on first slide (index is 0)
        $('[data-slideshow-action="prev"]').toggleClass('disabled', currentIndex === 0);
        
        // Disable "next" arrow if on last slide
        $('[data-slideshow-action="next"]').toggleClass('disabled', currentIndex === lastIndex);
    }

    function updateSlideCounter() {
        let currentSlideIndex = $('.slide:visible').index() + 1; // +1 because index is 0-based
        let totalSlides = $('.slide').length;
        $('[data-slideshow-counter]').text(currentSlideIndex);
        $('[data-slideshow-max]').text(totalSlides);
    }

    // Call initially to set up correct navigation state
    updateNavigationState();

    // Fullscreen
    $('.controls__expand-inner').click(function() {
        if (!document.fullscreenElement) {
            enterFullScreen($('.iframe').get(0)); // Enter fullscreen
        } else {
            exitFullScreen(); // Exit fullscreen
        }
    });

    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen(); // Standard syntax
        } else if (element.mozRequestFullScreen) { /* Firefox */
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { /* IE/Edge */
            element.msRequestFullscreen();
        }
    }

    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen(); // Standard syntax
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
})