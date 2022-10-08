(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMThemePrintPublication = {
    attach: function (context, settings) {
        var bPrintPublication = $('.print-publication a', context);

        if(bPrintPublication) {
            bPrintPublication.html('<span class="icon print"></span>' + bPrintPublication.data('js-enabled-text'));
            bPrintPublication.on('click', function(e) {
                e.preventDefault();
                var printWindow = window.open(bPrintPublication.attr('href'), 'print window', 'height=800,width=600');
            });
        }
    }
  };

}(jQuery, Drupal));
