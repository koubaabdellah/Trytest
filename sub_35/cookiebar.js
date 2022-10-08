(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMCookiebar = {
    attach: function (context, settings) {
      function checkCookie() {
        $('body').once('acm-cookie-message').each(function () {
          var hideCookieMessage = $.cookie('hideCookieMessage');
          if (typeof hideCookieMessage == 'undefined' || hideCookieMessage == 0) {

            var $messageHtml = $('<span />').html(settings.acm_cookiebar.text);
            var $messageCloseMessage = $('<a />').attr('id', 'closeCookieMessage').attr('role', 'button').attr('href', '#').html('<span>&nbsp</span><span id="closeCookieMessageText">sluiten</span>');

            $messageCloseMessage.click(function (e) {
              e.preventDefault();
              $.cookie('hideCookieMessage', 1, {path: '/'});
              $('.cookiemessage').remove();

              if (settings.acm_cookiebar.fix_body_padding) {
                $('body').css('padding-top', 0);
                $('#main-menu').css('margin-top', 0);
              }
            });
            $messageHtml.append($messageCloseMessage);

            var $messageDiv = $('<div />').addClass('cookiemessage').html($messageHtml);
            $('body').prepend($messageDiv);

            if (settings.acm_cookiebar.fix_body_padding) {
              var cookieBarHeight = $messageDiv.outerHeight();
              // correct position of page elements (originally, the main-menu
              // moved to top for SEO. this needs to be corrected when the cookie
              // bar is above the menu)
              $messageDiv.css('margin-top', -cookieBarHeight);
              $('body').css('padding-top', cookieBarHeight);
              $('#main-menu').css('margin-top', cookieBarHeight);
            }
          }
        });
      }

      $(window).on('load', function () {
        checkCookie();
      });
      $(window).resize(function () {
        if (settings.acm_cookiebar.fix_body_padding) {
          if ($('.cookiemessage').length > 0) {
            var cookieMessageHeight = $('.cookiemessage').outerHeight();
            $('.cookiemessage').css('margin-top', -cookieMessageHeight);
            $('body').css('padding-top', cookieMessageHeight);
            $('#main-menu').css('margin-top', cookieMessageHeight);
          }
        }
      });
    }
  };
}(jQuery, Drupal));
