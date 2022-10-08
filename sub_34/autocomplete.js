(function ($, Drupal, _) {
  'use strict';

  $.fn.bibcite_autocomplete = function (options) {
    var settings = $.extend({
      id: '',
      path: ''
    }, options);

    $('#' + settings.id).autocomplete({
      source: settings.path,
      minLength: 2,
      select: function ( event, ui ) {
        $('#' + settings.citeId + ' input').val(ui.item.id);
      }
    });
  }

  $.fn.getReference = function (ref_id, domId) {
    if (parseInt(ref_id) > 0) {
      $.ajax({
        method: 'POST',
        url: '/sdv_bibcite_custom/autocomplete/getreference',
        data: {
          'refId': ref_id
        }
      }).done(function (data) {
        $('#' + domId + ' input').val(data.value);
      });
    }

  }
}(jQuery, Drupal, _));
