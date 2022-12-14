/**
 * @file
 * Javascript to integrate the clipboard.js library with Drupal.
 */

window.ClipboardJS = window.ClipboardJS || Clipboard;

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.behaviors.clipboardjs = {
    attach: function (context, settings) {
      if (context === document) {

        $('.acm-rss-form', context).each(function (i, elem) {
        // Initialize clipboard.js.
        Drupal.clipboard = new ClipboardJS('a.clipboardjs-button, input.clipboardjs-button, button.clipboardjs-button');

        // Process successful copy.
        Drupal.clipboard.on('success', function (e) {
          let alertStyle = $(e.trigger).data('clipboardAlert');
          let alertText = $(e.trigger).data('clipboardAlertText');
          let target = $(e.trigger).data('clipboardTarget');

          // Display as alert.
          if (alertStyle === 'alert') {
            alert(alertText);
          }

          // Display as tooltip.
          else if (alertStyle === 'tooltip') {
              let $target = $(target);

              // Add title to target div.
              $target.prop('title', alertText);

              // Show tooltip.
              $target.tooltip({
                position: {my: "center top-60", at: "center"},
                classes: {"ui-tooltip": "acm-tooltip"}
              }).mouseover();

              // Destroy tooltip after delay.
              setTimeout(function () {
                $target.tooltip('destroy');
                $target.prop('title', '');
              }, 1500);
            }
          });

          // Process unsuccessful copy.
          Drupal.clipboard.on('error', function (e) {
            let target = $(e.trigger).data('clipboardTarget');
            let $target = $(target);

            $target.prop('title', function (action) {
              let actionMsg = '';
              let actionKey = (action === 'cut' ? 'X' : 'C');

              if (/iPhone|iPad/i.test(navigator.userAgent)) {
                actionMsg = 'This device does not support HTML5 Clipboard Copying. Please copy manually.';
              }
              else {
                if (/Mac/i.test(navigator.userAgent)) {
                  actionMsg = 'Press ???-' + actionKey + ' to ' + action;
                }
                else {
                  actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
                }
              }

              return actionMsg;
            }(e.action));

            // Show tooltip.
            $target.tooltip({
              position: {my: "center top-50", at: "center"},
              classes: {"ui-tooltip": "acm-tooltip"}
            }).mouseover();

            // Destroy tooltip after delay.
            setTimeout(function () {
              $target.tooltip('destroy');
              $target.prop('title', '');
            }, 1500);
          });
        });
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
