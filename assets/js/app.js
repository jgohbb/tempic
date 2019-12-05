// main app js file //
$(document).ready(function () {

    // selects and displays random background image for the .content section via .bg class
    var bg_images = ['bg3.jpg', 'bg4.jpg', 'bg5.jpg'];
    $(".bg").css({
        'background-image': 'url(\"assets/images/' +
            bg_images[Math.floor(Math.random() * bg_images.length)] + '\")'
    });

    // converts temp C to F
    function calcFahrenheit(c) {
        return (c * (9 / 5)) + 32;
    }

    // end of document.ready
});