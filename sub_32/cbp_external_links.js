/**
 * @file
 */
(function($){
    Drupal.behaviors.extLinks = {
        attach: function(context, settings) {
            $('.external').click(function() {
              window.open($(this).attr('href'));
              return false;
            });
        }
  };
})(jQuery);
