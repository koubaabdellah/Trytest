/**
 * @file
 */
(function($){
    Drupal.behaviors.relSearchLinks = {
        attach: function(context, settings) {
            var hash = window.location.hash;

          if (hash.length > 1 && hash.substr(1,9) == 'subtopic-') {
              hash = hash.substr(1);

              $('#side-content-publications .search-link').each(function() {
                if (!$(this).hasClass('search-link-' + hash)) {
                    $(this).hide();
                }
              });
          }
          else {
              $('#side-content-publications .search-link').hide();
          }
        }
  };
})(jQuery);
