(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMSearchFilterParams = {
    attach: function (context, settings) {

      $('.keywords-container', context).each(function(i, item) {
        item = $(item).parent();
        $(".keywords-single-select", item).change(function(selectObj) {

          var selected_item = selectObj.currentTarget.value;
          var filters = $(".keywords-select", item).val();

          if (filters == null) {
            filters = [];
          }

          var found = jQuery.inArray(selected_item, filters);
          if (found >= 0) {
            // Element was found, remove it.
            filters.splice(found, 1);
          } else {
            // Element was not found, add it.
            filters.push(selected_item);
          }

          $(".keywords-select", item).val(filters);
          item.closest("form").submit();
        });
      });

      $('select[data-drupal-selector="edit-sort-by"]').bind('change', function () {
        $(this).closest('form').submit();
      });
    }
  };

}(jQuery, Drupal));
