(function ($, Drupal) {
  'use strict';
  $.fn.createCollapsePanel = function (options) {
    return this.each(function () {
      var panel = $(this);
      var button = panel.find("button");
      var content = panel.find(".panelContent");
      var defaults = {
          open: false,
          speed: 400,
          easing: "easeOutExpo",
        },
        settings = $.extend({}, defaults, options);

      function _init() {
        if (settings.open || panel.hasClass("open")) {
          expand(panel, button, content);
        } else {
          collapse(panel, button, content);
        }

        _toggle(panel, button, content);
      }

      function expand(panel, button, content) {
        button.attr("aria-expanded", "true");
        content.attr("aria-hidden", "false");
        content.slideDown(settings.speed, settings.easing, function () {
          panel.addClass("open");
        });
      }

      function collapse(panel, button, content) {
        button.attr("aria-expanded", "false");
        content.attr("aria-hidden", "true");
        content.slideUp(settings.speed, settings.easing, function () {
          panel.removeClass("open");
        });
      }

      function _toggle(panel, button, content) {
        button.on("click", function () {
          if (panel.hasClass("open")) {
            collapse(panel, button, content);
            return;
          }
          expand(panel, button, content);
          content.trigger("focus");
        });
      }

      _init();
    });
  };
}) (jQuery, Drupal);
