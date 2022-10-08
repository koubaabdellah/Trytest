/**
 * @file
 */
(function($){
  Drupal.behaviors.backButton = {
    attach: function(context, settings) {
      var hash = window.location.hash;
      if (hash.length > 1) {
        hash = hash.substr(1);
        if (typeof settings.backs[hash] !== 'undefined') {
          $('#breadcrumb-back li a').attr('href', settings.backs[hash].link);
          $('#breadcrumb-back li a').text(settings.backs[hash].text);
          $('#breadcrumb-back').removeClass('breadcrumb-hidden');
        }
      }
    }
  };
})(jQuery);
