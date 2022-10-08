/**
 * @file
 * Add PDF download check to webform.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Add PDF download check to webform.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.ACMPdfDownloadCheck = {
    open_element: null,
    attach: function (context, settings) {
      var button = '';
      var uploaded = false;
      var enabled = false;
      var clicked = false;

      if ($('.webform-button--next', context).length > 0) {
        button = $('.webform-button--next', context);
      }
      if ($('.webform-button--submit', context).length > 0) {
        button = $('.webform-button--submit', context);
      }
      if ($('div[id^="edit-formulier-bijlage-getekend-aanvraagformulier-upload"]', context).length > 0
        || $('div[id^="edit-formulier-bijlage-aanvullend-stuk-upload"]', context).length > 0) {
          if ($('div[id^="edit-formulier-bijlage-getekend-aanvraagformulier-upload"] > input', context).val()
          || $('div[id^="edit-formulier-bijlage-aanvullend-stuk-upload"] > input', context).val()) {
            uploaded = true;
          }
      }
      if ($('.pdf-request-btn', context).length > 0 && $('#edit-afronding-eherkenning', context).length == 0) {
        if (!uploaded) {
          $(button, context).attr('disabled', true);
          var timeout = 5;
          var message = '<div class="form-item--next-message-dis form-item--error-message form_error_message">' +
          '<div class="inline-error-right" id="message--next-disable">U kunt over ' + timeout + ' seconden verder</div>' +
          '</div>';
          $(button, context).after(message);
          var timer = setInterval(function () {
            --timeout;
            $('#message--next-disable').html('U kunt over ' + timeout + ' seconden verder');
            if (timeout < 0) {
              $('.form-item--next-message-dis').remove();
              enabled = true;
              clearInterval(timer);
              if (clicked === true) {
                $(button, context).attr('disabled', false);
              }
            }
          }, 1000);

          if ($('#edit-acm-signature-signature-eherkenning').is(':checked')) {
            toggleCounter();
          }

          if ($('#edit-acm-signature').length > 0) {
            $('#edit-acm-signature').on('change', function () {
              toggleCounter();
            })
          }
        }
      }

      $('.pdf-request-btn a', context).on('click', function (e) {
        $(window).off('beforeunload'); // tested in IE 11 and Chrome 62

        clicked = true;
        if (enabled === true) {
          $(button, context).attr('disabled', false);
        }
        $(window).on('beforeunload');
      });

      function toggleCounter() {
        if ($('#edit-acm-signature-signature-eherkenning').is(':checked')) {
          if ($('.form-item--next-message-dis').length > 0) {
            $('.form-item--next-message-dis').css('visibility', 'hidden');
          }
          $(button, context).attr('disabled', false);
        }
        else {
          if ($('.form-item--next-message-dis').length > 0) {
            $('.form-item--next-message-dis').css('visibility', 'visible');
          }
          if (!clicked) {
            $(button, context).attr('disabled', true);
          }
        }
      }

      if ($('.acm-cannot-submit-message a[href*="downloadpdfform"]', context).length > 0) {
        $('.acm-cannot-submit-message a', context).on('click', function (e) {
          $(window).off('beforeunload'); // tested in IE 11 and Chrome 62
          $(window).on('beforeunload'); // tested in IE 11 and Chrome 62
        });
      }
    }
  };

}(jQuery, Drupal));
