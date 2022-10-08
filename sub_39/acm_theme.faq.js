(function ($, Drupal) {
  "use strict";

  /*
  var internalCheckFocus = function (e) {
    e.preventDefault();
    var exTarget = $(e.target.hash)[0];
    if (exTarget) {
      $(exTarget).find("a").trigger("click");
    }
  };
  $("body a[href*='#']")
    .not(".toc a")
    .not(".block-highlight a")
    .not(".online-document--nav-links a")
    .on("click", (e) => internalCheckFocus(e));
    */

  Drupal.behaviors.ACMThemeFaq = {
    attach: function (context, settings) {
      // Some of the old markup in the Faq's are without links... if that is the
      // case wrap those h2 -> h6 in <a></a> markup for consistency

      var $expandables = $(".expandable", context);

      if ($expandables.length > 0) {
        $.each($expandables, function (index, value) {
          var $el = this;
          var id = this.id ? this.id : "";
          var $_html = $(this)
            .find("h2, h3, h4, h5, h6, .expandable-toggle")
            .first()
            .html();
          if ($_html && !$_html.match("^<a")) {
            var elements = $(this)
              .find("h2, h3, h4, h5, h6, .expandable-toggle")
              .first();
            $(elements).wrapInner(
              '<a href="#' +
                id +
                '" class="jquery-added" role="button" aria-expanded="false"></a>'
            );
            /* var expandedText = $('.jquery-added').text();
            var html = $.parseHTML(expandedText);
            $('.jquery-added').html(html); */
          }

          var contentToWrap = $(this).find("> *:not(:first-child)", context);
          $(contentToWrap).wrapAll('<div class="faq-content" />');

          if (id.length > 0 && window.location.hash.substr(1) === id) {
            window.setTimeout(function () {
              $el.classList.add('open');
            }, 1);
          }

          window.addEventListener('hashchange', function() {
            if (id.length > 0 && window.location.hash.substr(1) === id) {
              $el.classList.add('open');
            }
          }, false);
        });
      }

      var delayedResizeTimeout;
      var checkFocus = function (event) {
        if (event) {
          var nested =
            $(event.target).parents(".expandable .expandable").length > 0;

          var expandable;
          if (nested) {
            expandable = $(event.target).parents(".expandable .expandable");
          } else {
            expandable = $(event.target).parents(".expandable");
          }
          clearTimeout(delayedResizeTimeout);

          if (event.type === "click") {
            $(expandable).toggleClass("open");
            if ($(expandable).hasClass("open")) {
              $(event.target).attr("data-content", Drupal.t("Open"));
            } else {
              $(event.target).attr("data-content", Drupal.t("Closed"));
            }
            var aria_control = $(".jquery-added");

            var isAriaExp = aria_control.attr("aria-expanded");
            var newAriaExp = isAriaExp === "false" ? "true" : "false";
            $(".jquery-added").attr("aria-expanded", newAriaExp);
          }
          if (event.type === "keypress") {
            delayedResizeTimeout = setTimeout(function () {
              if (!$(expandable).hasClass("open")) {
                $(expandable).addClass("open");
                $(event.target).attr("data-content", Drupal.t("Open"));
                return;
              }
            }, 200);
            var aria_control = $(".jquery-added");

            var isAriaExp = aria_control.attr("aria-expanded");
            var newAriaExp = isAriaExp === "false" ? "true" : "false";
            $(".jquery-added").attr("aria-expanded", newAriaExp);
          }
          return false;
        }
      };

      $(".expandable a.jquery-added", context).on("click", checkFocus);
      $(".expandable a.jquery-added", context).on("focus", checkFocus);

      // Fix initial state.
      $(".expandable a.jquery-added", context).each(function (i, elem) {
        var expandable = $(elem).parents(".expandable");
        if ($(expandable).hasClass("open")) {
          $(elem).attr("data-content", Drupal.t("Open"));
        } else {
          $(elem).attr("data-content", Drupal.t("Closed"));
        }
      });
    },
  };
})(jQuery, Drupal);
