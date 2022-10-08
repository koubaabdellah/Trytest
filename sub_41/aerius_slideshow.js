(function ($) {

  // Slideshow behavior for AERIUS website.
  Drupal.behaviors.aeriusSlideshow = {
    attach: function (context, settings) {
      var slideshowWrapper = $('.slideshow-front');
      var slides = slideshowWrapper.find('.slides > li');

      var navControls = $('<div class="flexslider-controls"><ol class="flex-control-nav header-slides-nav"></ol></div>');
      slides.each(function(key, value) {
        var slideText = $(value).find('.slide-text');
        var controlItem = $('<li>').css('cursor', 'pointer');
        var href = $(value).find('a').attr('href');
        var target = $(value).find('a').attr('target');
        var readMoreLink = $('<a>', {
          'class': 'read-more-link',
          'href': href,
          'target': target
        }).text(Drupal.t('Read more'));
        readMoreLink.appendTo(slideText.find('h3'));
        if (Modernizr.touchevents) {
          controlItem.click(function(e) {
            if ($(this).hasClass('flex-active')) {
              if (href !== undefined) {
                if (target == '_blank') {
                  window.open(href, target);
                }
                else {
                  window.location = href;
                }
              }
            }
            else {
              slideshowWrapper.flexslider(key);
              navControls.find('li').removeClass('flex-active');
              $(this).addClass('flex-active');
            }
            e.preventDefault();
          });

        }
        else {
         controlItem.mouseover(function(e) {
            slideshowWrapper.flexslider(key);
            navControls.find('li').removeClass('flex-active');
            $(this).addClass('flex-active');
          }).click(function(e) {
            if (href !== undefined) {
              if (target == '_blank') {
                window.open(href, target);
              }
              else {
                window.location = href;
              }
            }
            e.preventDefault();
          });
        }
        controlItem.append(slideText);
        $(navControls).find('ol').append(controlItem);
      });
      navControls.find('li:first-child').addClass('flex-active');
      slideshowWrapper.append(navControls);

      slideshowWrapper.flexslider({
        animation: 'fade',
        animationLoop: true,
        slideshow: true,
        pauseOnHover: true,
        directionNav: false,
        controlNav: false,
        pausePlay: true,
        pauseText: Drupal.t('Pause'),
        playText: Drupal.t('Play'),
        useCSS: true,
        before: function(slider) {
          var controls = $('.header-slides-nav').find('li');
          controls.removeClass('flex-active');
          controls.eq(slider.animatingTo).addClass('flex-active');
        }
      });
      var pauseButton = slideshowWrapper.find('.flex-pauseplay');
      slideshowWrapper.prepend(pauseButton);
    }
  };

  // Experience Slideshow behavior for AERIUS website.
  Drupal.behaviors.aeriusExperienceSlideshow = {
    attach: function (context, settings) {
      var slideshowWrapper = $('.experience-slideshow');
      var slides = slideshowWrapper.find('.slides > li');

      slideshowWrapper.flexslider({
        animation: 'fade',
        animationLoop: true,
        slideshow: true,
        pauseOnHover: true,
        directionNav: false,
        pausePlay: true,
        pauseText: Drupal.t('Pause'),
        playText: Drupal.t('Play'),
        useCSS: true
      });
      var pauseButton = slideshowWrapper.find('.flex-pauseplay');
      slideshowWrapper.prepend(pauseButton);
    }
  };

}(jQuery));
