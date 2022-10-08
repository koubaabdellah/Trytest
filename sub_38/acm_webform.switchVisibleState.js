/**
 * @file
 * Hides and shows complete form row when ACMConditionsHandler adds the
 * correct class.
 */
(function ($, Drupal) {

  'use strict';

  var $document = $(document);

  /**
   * Act on state change.
   */
  $document.on('state:visible', function (e) {
    var elem = $(e.target);
    if (elem.find('> .acm-cannot-submit-message').length > 0) {
      if (e.value === true) {
        // Disable the form button next when showing acm-cannot-submit-message.
        $('button.form-submit').attr('disabled', 'disabled');
        $('input.webform-button--next').attr('disabled', 'disabled');
        $('input.webform-button--submit').attr('disabled', 'disabled');
      }
      else {
        $('button.form-submit').parent().removeAttr('disabled');
        $('input.webform-button--next').removeAttr('disabled');
        $('input.webform-button--submit').removeAttr('disabled');
      }
    }
  });
}(jQuery, Drupal));
