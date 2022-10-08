(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMThemeBlock = {
    attach: function (context, settings) {
      var $_window = $(window);
      function setColumnHeight() {
        if ($('.flex').length > 0) {
          setTimeout(function () {
            $.each($('.col-1-3.border__bottom > div'), function () {
              var parentHeight = $(this).parent().height();
              $(this).css('height', parentHeight + 'px');
            });
          }, 1000);
        }
      }
      // fix height of first child div from a flexbox class for Safari < 11
      // https://bugs.webkit.org/show_bug.cgi?id=137730
      if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Version') !== -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Version') + 8).split(' ')[0]) < 11) {
        setColumnHeight();
        $(window).resize(function () {
          if ($_window.width() > 767) {
            setColumnHeight();
          }
        });
      }
    }
  };

}(jQuery, Drupal));
