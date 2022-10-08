(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.ACMSearchAutoSubmit = {
    attach: function (context, settings) {
      var $form = $('form.filter-search-wrapper').once('acm-search-auto-submit');

      $form.find('.form-actions').hide();

      $form.find('input[type=checkbox]')
        .once('acm-search-auto-submit')
        .on('click', function () {
          $(this).closest('form.filter-search-wrapper').submit();
        });
    }
  };

}(jQuery, Drupal));
