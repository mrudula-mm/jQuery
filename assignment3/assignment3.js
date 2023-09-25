$(document).ready(function() {
    var firstClick = true;
    var counter = 0;
    var images = ['images/image1.jpg','images/image2.jpg','images/image3.jpg'];

    var $button = $('<button>', {
      text: 'Click here',
      class: 'button1',
      click: function() {
        if (firstClick) {
          var $heading = $('<h2>', { text: 'Welcome...'});
          $('body').append($heading);
          firstClick = false;

        } else {
          var $image = $('<img>', {src: images[counter], alt: 'Image'});
          $('body').append($image);
          var $nextButton = $('<button>', {
            text: 'Next',
            class: 'button2',
            click: function() {
                counter++;
              if (counter >= images.length) {
                counter = 0;
              }
              $image.attr('src', images[counter]);
            } 
          });

          $('body').append($nextButton);
          $button.prop('disabled',true);
        }
      }
    });
    $('body').append($button);
  });