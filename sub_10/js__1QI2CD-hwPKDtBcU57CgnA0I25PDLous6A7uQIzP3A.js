/**
 * @file
 */
(function ($) {

  Drupal.behaviors.dotdotdot = {
    attach: function(context, settings) {
      // Remember to add a line-height in css!
      // DO NOT ADD THESE CLASS NAMES TO INLINE ELEMENTS!!!
      // THE CONTENTS OF THE DOTDOTDOT ELEMENT MUST BE WRAPPED!!!
      if ($('.single-line').size() > 0) {
        $('.single-line').dotdotdot({'height': (parseInt($('.single-line').css('line-height')))});
      }
      if ($('.two-lines').size() > 0) {
        $('.two-lines').dotdotdot({'height': (parseInt($('.two-lines').css('line-height')) * 2)});
      }
    }
  };

  /**
   * This behavior makes it possible to create anchors which are opened in a new
   * window without using the depricated 'target' attribute.
   * All anchors with the class 'target-blank' will be opened in a new window
   * using JavaScript.
   */
  Drupal.behaviors.targetBlank = {
    attach: function (context) {
      $('a.target-blank, area.target-blank', context).once('target-blank').each(function() {
        $(this).click(function() {
          window.open(this.href);
          return false;
        });
      });
    }
  };

  /**
   *
   */
  Drupal.behaviors.UITabs = {
    attach: function (context) {
      $('.tabs-wrapper', context).once('tabs-wrapper').each(function() {
        $(this).tabs();
      });
    }
  };

  /**
   *
   */
  Drupal.behaviors.formValue = {
    attach: function (context, settings) {
      $('#edit-field-user-organisation-type-1-und').change(function () {
        $organisation_type = $(this);
        if ($organisation_type.val() == 4) {
          $('#edit-field-user-organisation-type-2-und').val(3);
        }
        else if ($organisation_type.val() == 5) {
          $('#edit-field-user-organisation-type-2-und').val(2);
        }
        else {
          $('#edit-field-user-organisation-type-2-und').val('_none');
        }
      });
    }
  };

  /**
   *
   */
  Drupal.behaviors.SelectValue = {
    attach: function (context, settings) {
      $('#edit-field-arch-incident-kind-other, #edit-field-field-ci-incident-type, #edit-field-ch-incident-kind-other').hide();

      $(".form-select-field-hierarchical-processed select").change(function () {
        if ($("#" + $(this).attr("id") + " :selected").text().match("namelijk")) {
          $('#edit-field-arch-incident-kind-other, #edit-field-field-ci-incident-type, #edit-field-ch-incident-kind-other').show();
        }
        else {
          $('#edit-field-arch-incident-kind-other, #edit-field-field-ci-incident-type, #edit-field-ch-incident-kind-other').hide();
        }
      });
    }
  };

  /**
   * Adds a behavior to the calendar icon to the right of each datepicker
   * which can open the datepicker by clicking on the icon.
   */
  Drupal.behaviors.datepickerIcon = {
      attach: function(context, settings) {
        $('.date-padding').once('datepicker-icon').each(function() {
          $(this).bind('click', function() {
            $('.form-text', $(this))
              .focus()
              .trigger('focus');
          });
        });
      }
    };

  Drupal.behaviors.linkFancyBox = {
    attach: function (context, settings) {
      if ($.fancybox) {
        $('a.fancybox', context).not('a.fancybox-processed').each(function() {
          $(this).addClass('fancybox-processed').attr('href', $(this).attr('href') + '?fancybox=true').fancybox({'type':'iframe'});
        });
      }
    }
  };

  /**
   * Adds a behavior to the calendar icon to the right of each datepicker
   * which can open the datepicker by clicking on the icon.
   */
  Drupal.behaviors.demoVideo = {
    attach: function(context, settings) {
      $('#demo-video').once('demo-video').each(function() {
        jwplayer('demo-video').setup({
          file: 'http://vod.wowza.kpnstreaming.nl/yoursourcevod/_definst_/yoursourcevod/dice/DEF Deskoefening cultuur-water.mp4/playlist.m3u8',
          width: 720,
          height: 405
        });
      });
    }
  };

  /**
   * Opens a specific link in a magnific popup.
   */
  Drupal.behaviors.customMagnific_popup = {
    attach: function (context, settings) {
      $('.magnific-popup').not('.page-printmail-node').once('magnific-popup').each(function() {
        var $link = $(this);
        var title = $link.attr('title');

        $link.magnificPopup({
          type: 'inline',
          mainClass: 'mfp-video',
        });
      });
    }
  };

  /**
   * Closes the current magnific popup.
   */
  Drupal.behaviors.customMagnificClose = {
    attach: function (context, settings) {
      $('.mfp-close', context).bind('click', function(e) {
        window.parent.jQuery.magnificPopup.close();
      });
    }
  };

})(jQuery);
;
