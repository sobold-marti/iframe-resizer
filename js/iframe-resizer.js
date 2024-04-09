jQuery(() => {
    const IframeResizer = {
        resizeContent: (iframe) => {
            const iframeDoc = iframe;
    
            const updateSize = () => {
                console.log('update size');
    
                const containerWidth = $(window).width();
                const containerHeight = $(window).height();
    
                const contentWidth = $(iframeDoc).width();
                const contentHeight = $(iframeDoc).height();
    
                const widthRatio = containerWidth / contentWidth;
                const heightRatio = containerHeight / contentHeight;
                const scale = Math.min(widthRatio, heightRatio) / 1.5;
    
                $(iframeDoc).css({
                    'transform': `translate(-50%, -50%) scale(${scale})`
                });
            };
    
            updateSize();
            $(window).on('resize', updateSize);
        }
    };
    
    $('.iframe').each((index, iframe) => {
        IframeResizer.resizeContent(iframe);
    });
})