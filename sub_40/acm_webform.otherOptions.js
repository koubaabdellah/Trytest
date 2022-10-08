/**
 * @file
 * Fixes the radios and checkbox other inputs.
 */

(function ($, Drupal) {

    'use strict';

    /**
     * Fixes the radios and checkbox other inputs.
     *
     * @type {Drupal~behavior}
     */
    Drupal.behaviors.ACMOtherOptions = {
        attach: function (context, settings) {
            $('.form_row', context).each(function (i, elem) {
                $('.js-webform-checkboxes-other-input', elem).wrap("<div class='col p65 float-element-right'></div>");
                $('.js-webform-radios-other-input', elem).wrap("<div class='col p65 float-element-right'></div>");
            });
        }
    };

}(jQuery, Drupal));
