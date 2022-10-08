/**
 * @file
 * Add error styling to components.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Add error styling to components.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.ACMWebformErrors = {
    attach: function (context, settings) {
      $('fieldset.form_row', context).each(function (i, elem) {
        var error = $(elem).find('.error');
        if (error.length) {
          error.parent().find('.col.p35 span').insertAfter( ".error" );
          $(elem).addClass('error');
        }

      });
    }
  };

}(jQuery, Drupal));
