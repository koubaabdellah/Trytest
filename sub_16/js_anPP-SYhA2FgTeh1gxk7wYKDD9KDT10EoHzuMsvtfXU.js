/**
 * @file
 * JavaScript functions for the AERIUS Factsheets.
 */

(function($) {
  /**
   * Behavior for colorbox.
   */
  Drupal.behaviors.printButton = {
    attach: function(context) {
      $('a.colorbox-load').colorbox({
        width: '80%',
        height: '80%',
        iframe: true
      });
      $(document).bind('cbox_load', function(){
        $('#colorbox').hide();
        $('#cboxOverlay').addClass('throbbing');
      });
      $(document).bind('cbox_complete', function(){
        $('#colorbox').show();
        $('#cboxOverlay').removeClass('throbbing');
      });
    }
  };

}(jQuery));
;
