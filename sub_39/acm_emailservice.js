/**
 * @file
 * Checkbox behaviors.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Control the checkboxes active behaviors.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.ACMEmailserviceCheckboxes = {
    attach: function (context, settings) {
      $('.acm-emailservice-form', context).each(function (i, elem) {
        $('#edit-all-subjects', elem).change(function () {
          if(this.checked) {
            $('#edit-subjects--wrapper .form-checkbox', elem).prop('checked', true);
          } else {
            $('#edit-subjects--wrapper .form-checkbox', elem).prop('checked', false);
          }
        });

        $('#edit-all-publication-types', elem).change(function () {
          if(this.checked) {
            $('#edit-publication-types--wrapper .form-checkbox', elem).prop('checked', true);
          } else {
            $('#edit-publication-types--wrapper .form-checkbox', elem).prop('checked', false);
          }
        });

        // subjects.
        $('#edit-subjects--wrapper .form-checkbox', elem).change(function () {
          if ($('#edit-subjects--wrapper .form-checkbox:checked', elem).length == $('#edit-subjects--wrapper .form-checkbox', elem).length) {
            $('#edit-all-subjects', elem).prop('checked', true);
          }
          else {
            $('#edit-all-subjects', elem).prop('checked', false);
          }
        });

        // Document types.
        $('#edit-publication-types--wrapper .form-checkbox', elem).change(function () {
          if ($('#edit-publication-types--wrapper .form-checkbox:checked', elem).length == $('#edit-publication-types--wrapper .form-checkbox', elem).length) {
            $('#edit-all-publication-types', elem).prop('checked', true);
          }
          else {
            $('#edit-all-publication-types', elem).prop('checked', false);
          }
        });
      });
    }
  };

}(jQuery, Drupal));
