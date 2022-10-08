(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMSearchDatepicker = {
    attach: function (context, settings) {
      $('.acm_search_wrapper', context).each(function(i, item) {
        if ($('.show-date-fields', item).hasClass('is-active')) {
          $('.acm_search_datepicker', item).show();
        }

        $('.show-date-fields', item).click(function(e) {
          $('.acm_search_datepicker', item).show();
          $(this, item).attr('checked', 'checked');
        });

        $('.b-link-button', item).click(function(e) {
          var form = $(this, item).closest("form");

          // Prevent submitting placeholder text.
          if ($('.search input.placeholder-fallback', form).length) {
            $('.search input.placeholder-fallback', form).each(function(i, item) {
              var obj = $(item);
              if(obj.attr('value') == obj.attr('title')) obj.attr('value', '');
            });
          }

          form.submit();

          e.preventDefault();
          return false;
        });

        $('input[type=text]', item).datepicker({
          showOn: "both",
          buttonImage: settings.path.baseUrl + "profiles/acm/modules/custom/acm_search/css/images/b-date-picker.png",
          buttonImageOnly: true,
          dateFormat:'dd-mm-yy',
          dayNamesMin: ["zo", "ma", "di", "wo", "do", "vr", "za"],
          monthNames: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"]
        });

      });
    }
  };

}(jQuery, Drupal));
