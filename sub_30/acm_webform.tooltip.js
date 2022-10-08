/**
 * @file
 * Add tooltip to webform.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Add tooltip to webform.
   *
   * @type {Drupal~behavior}
   */
  /* Drupal.behaviors.ACMWebformTooltip = {
    open_element: null,
    attach: function (context, settings) {
      $('.tipsy-description', context).each(function(i, item) {
        var tipsy_element = $(item).tipsy({
          title: function() { return $(this).find('.tipsy-content').html(); },
          html: true,
          trigger: 'manual',
          gravity: 'w',
          offset: 5
        });

        $(item).click(function(e) {
          e.preventDefault();

          if (Drupal.behaviors.ACMWebformTooltip.open_element != null && Drupal.behaviors.ACMWebformTooltip.open_element != tipsy_element) {
            Drupal.behaviors.ACMWebformTooltip.open_element.tipsy('hide');
            Drupal.behaviors.ACMWebformTooltip.open_element = null;
          }

          if($('.tipsy').length == 0) {
            tipsy_element.tipsy('show');
            Drupal.behaviors.ACMWebformTooltip.open_element = tipsy_element;

            $('.tipsy-close').on('click keypress', function(e) {
              Drupal.behaviors.ACMWebformTooltip.open_element.tipsy('hide');
              Drupal.behaviors.ACMWebformTooltip.open_element = null;
            });
          } else{
            tipsy_element.tipsy('hide');
            Drupal.behaviors.ACMWebformTooltip.open_element = null;
          }
        });

        // Move the textarea tooltip to its correct place.
        if ($(item).parent().hasClass('js-text-format-wrapper')) {
          var parent_elem = $(item).parent().find('.form_row .col.p65 .form-textarea');
          if($(parent_elem).length) {
            $(item).insertAfter(parent_elem);
          }
        }
      });
    }
  }; */

  Drupal.behaviors.ACMWebformTooltip = {
    attach: function (context, settings) {
      $('.tipsy-description, .tipsy-close', context).once().on('click', function (e) {
        e.preventDefault();
        var $control = $(this).closest('.tipsy-container').find('.tipsy-description');
        var isAriaExp = $control.attr('aria-expanded');
        var newAriaExp = (isAriaExp == "false") ? "true" : "false";

        $(this).closest('.tipsy-container').find('.tipsy-inner').toggleClass('open');
        $control.attr('aria-expanded', newAriaExp);
      })
    }
  };

}(jQuery, Drupal));
