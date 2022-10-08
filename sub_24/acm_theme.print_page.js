(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMThemePrintPage = {
    attach: function (context, settings) {
      $('.print-page', context).click(function(e) {
        e.preventDefault();
        window.print();

        return false;
      });
    }
  };

}(jQuery, Drupal));
