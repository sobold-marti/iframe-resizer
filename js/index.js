jQuery(() => {
    // Returns whether document is fullscreen or not
    function isFullscreen() {
        return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    }

    // Enter fullscreen
    function enterFullScreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    // Exit fullscreen
    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // Resize iframe based on whether fullscreen or not
    function onFullscreenChange() {
        const isFs = isFullscreen();
        $('.iframe').each((i, el) => {
            console.log($(el)[0]);
            console.log('isFs: ', isFs);
            IframeResizer.resizeContent($(el)[0]);
        });
    }

    // Fullscreen change event listeners
    $(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', onFullscreenChange);

    //* Init textfill on load
    $('.text-fill').textfill({
        innerTag: 'div',
        maxFontPixels: 25
    });

    //* Iframe resizer
    const IframeResizer = {
        resizeContent: (iframe) => {
            const updateSize = () => {
                // Dynamically determine if we're in fullscreen mode
                let isFullscreen = document.fullscreenElement === iframe || $(iframe).hasClass('fullscreen');
    
                let containerWidth = $(window).width();
                let containerHeight = $(window).height();
    
                let content = $(iframe).find('.iframe-content');
                let contentWidth, contentHeight;
                let scale;
    
                if (isFullscreen) {
                    contentWidth = content.width();
                    contentHeight = content.height();
                } else {
                    // Use the iframe's dimensions for scaling
                    contentWidth = $(iframe).width();
                    contentHeight = $(iframe).height();
                }
    
                const widthRatio = containerWidth / contentWidth;
                const heightRatio = containerHeight / contentHeight;
                scale = Math.min(widthRatio, heightRatio);
    
                // Apply scale transformation accordingly
                if (isFullscreen) {
                    content.css({
                        'transform': `translate(-50%, -50%) scale(${scale / 1.5})`,
                        'transform-origin': 'center center',
                        'width': 'fit-content',
                        'height': 'fit-content',
                        'position': 'absolute',
                        'top': '50%',
                        'left': '50%',
                    });
                    // Clear transformations on the iframe itself
                    $(iframe).css({
                        'transform': '',
                        'position': 'relative'
                    });
                } else {
                    // Scale the iframe itself when not in fullscreen
                    $(iframe).css({
                        'transform': `translate(-50%, -50%) scale(${scale / 1.5})`,
                        'transform-origin': 'center center',
                        'position': 'absolute'
                    });
                    // Reset the styles applied to the content during fullscreen
                    content.removeAttr('style');
                }
            };
    
            // Listen for resize events to update size dynamically
            $(window).on('resize', updateSize);
    
            // Initial update
            updateSize();
        }
    };
    
    // Resize on load
    $('.iframe').each((index, iframe) => {
        IframeResizer.resizeContent(iframe);
    });

    //* Controls
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
            innerTag: 'div',
            maxFontPixels: 25
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
            innerTag: 'div',
            maxFontPixels: 25
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

    $('.controls__expand-inner').click(function() {
        if (!isFullscreen()) {
            enterFullScreen($('.iframe').get(0));
        } else {
            exitFullScreen();
        }
    });
})