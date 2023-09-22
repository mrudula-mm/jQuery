$(document).ready(function () {
    var $bullets = $('.bullet');
    var $images = $('.image');
    var currentIndex = 0;
    var interval = 5000;

    function showImage() {
        var nextIndex = (currentIndex + 1) % $images.length;
        $bullets.eq(nextIndex).trigger('click');
    }

    $bullets.on('click', function () {
        var bulletIndex = $(this).index();
        
        $images.removeClass('active').css('z-index', -10);
        $images.eq(bulletIndex).addClass('active').css('z-index', 10);
        $bullets.removeClass('active');
        $bullets.eq(bulletIndex).addClass('active');
        currentIndex = bulletIndex;
    });

    $images.eq(0).addClass('active').css('z-index', 10);
    var autoSlide = setInterval(showImage, interval);
});

