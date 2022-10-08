/**
 * @file
 * Fixes sign options based on other fields.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Fixes sign options based on other fields.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.ACMWebformSignOptions = {
    attach: function (context, settings) {
      if (typeof(settings.acm_webform_sign_options) !== "undefined") {

        // First options on page load.
        var location_selected = $("input[name='" + settings.acm_webform_sign_options.company_registration_location_field + "[radios]']:checked", context);
        if (location_selected.length > 0) {
          Drupal.behaviors.ACMWebformSignOptions.filterOptions(location_selected.first().attr('value'), settings);
        }

        // Fix options on page load.
        var location_select = $("input[name='" + settings.acm_webform_sign_options.company_registration_location_field + "[radios]']", context);
        if (location_select.length > 0) {
          location_select.on('change', function () {
            Drupal.behaviors.ACMWebformSignOptions.filterOptions($(this).attr('value'), settings);
          });
        }
      }
    },
    getOptions: function (key, settings) {
      var show_options = [];

      if (typeof(settings.acm_webform_sign_options['sign_type_combinations_' + key]) !== "undefined") {
        $.each(settings.acm_webform_sign_options['sign_type_combinations_' + key], function (index, value) {
          if (index === value) {
            show_options.push(index);
          }
        });
      }

      return show_options;
    },
    filterOptions: function (key, settings) {
      if (key === "_other_") {
        key = "other";
      }

      var show_options = Drupal.behaviors.ACMWebformSignOptions.getOptions(key, settings);
      if (show_options.length > 0) {
        if (typeof(settings.acm_webform_sign_options.sign_type_field) !== "undefined") {
          var sign_options = $("input[name='" + settings.acm_webform_sign_options.sign_type_field + "']");
          if (sign_options.length > 0) {
            $.each(sign_options, function (index, sign_option) {
              var sign_option_elem = $(sign_option);
              if (show_options.indexOf(sign_option_elem.attr('value')) === -1) {
                sign_option_elem.parent().hide();
              } else {
                sign_option_elem.parent().show();
              }
            });
          }
        }
      }
    }
  };

}(jQuery, Drupal));
