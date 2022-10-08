(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMThemeClickableBlock = {
    attach: function (context, settings) {
      var blockObj = $('.clickable_link_block, .block.js-event-click', context), url;
      if (!blockObj.length) {
        return;
      }

      blockObj.hover(
        function(){
          url = $(this).find('a:first');
          if (url.length && url.get(0).href !== '') {
            $(this).css('cursor', 'pointer');
          }
        },
        function(){
          $(this).removeAttr('style');
        }
      ).click(function() {
        if (url.length && url.get(0).href !== '') {
          location.href = url.get(0).href;
        }
      });
    }
  };

}(jQuery, Drupal));
