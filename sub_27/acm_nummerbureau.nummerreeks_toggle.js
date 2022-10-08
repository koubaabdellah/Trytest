/**
 * @file
 * Make nummerreeks dropdown function.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Make nummerreeks dropdown function.
  */
  Drupal.behaviors.nummerreeksToggle = {
    attach: function (context, settings) {
      $('.has-dropdown', context).each(function(i, elem) {
        var open = false;
        var toggle = $(elem).find('.dropdown-toggle', elem);
        var content = $(elem).find('.dropdown-content', elem);

        toggle.click(function(e) {
          if (open === true) {
            content.height('0');
            content.css('visibility', 'hidden');
            toggle.text('+');

            open = false;
          } else {
            content.height('inherit');
            content.css('visibility', 'visible');
            toggle.text('-');

            open = true;
          }

          e.preventDefault();
          return false;
        });
      });
    }
  };

}(jQuery, Drupal));
