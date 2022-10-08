/**
 * @file
 * Checkbox behaviors.
 */

(function ($, Drupal) {

  'use strict';

  $("#acm-rss-form").on("submit", function () {
    getRssUrl();
    return false;
  });

  function getRssUrl() {
    // All subjects
    $('#edit-all-subjects:checked')
    // individial selected subjects
    $('#edit-subjects--wrapper input[type="checkbox"]:checked')

    // All subjects
    $('#edit-all-publication-types:checked')
    // individial selected subjects
    $('#edit-publication-types--wrapper input[type="checkbox"]:checked')

    var subjects = "";
    var publications = "";

    if ($('#edit-all-subjects').is(':checked')) {
      subjects = "field_subjects=All&";
    }
    else {
      var checkedSubjects = $('#edit-subjects--wrapper input[type="checkbox"]:checked').map(function () {
        return this.value;
      }).get();
      $.each(checkedSubjects, function (idx2, val2) {
        subjects += "field_subjects[" + idx2 + "]=" + val2 + "&";
      });
    }
    if ($('#edit-all-publication-types').is(':checked')) {
      publications = "publication_type=All";
    }
    else {
      var checkedPublications = $('#edit-publication-types--wrapper input[type="checkbox"]:checked').map(function () {
        return this.value;
      }).get();
      $.each(checkedPublications, function (idx2, val2) {
        publications += "publication_type[" + idx2 + "]=" + val2 + "&";
      });
    }
    var url = document.location.href + "/publicaties?" + subjects + publications;
    // alert(url);

    $('.clipboardjs').val(url);

  }

  /**
   * Control the checkboxes active behaviors.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.ACMRssCheckboxes = {
    attach: function (context, settings) {
      $('.acm-rss-form', context).each(function (i, elem) {
        $('#edit-all-subjects', elem).change(function () {
          if (this.checked) {
            $('#edit-subjects--wrapper .form-checkbox', elem).prop('checked', true);
          } else {
            $('#edit-subjects--wrapper .form-checkbox', elem).prop('checked', false);
          }
          getRssUrl();
        });

        $('#edit-all-publication-types', elem).change(function () {
          if (this.checked) {
            $('#edit-publication-types--wrapper .form-checkbox', elem).prop('checked', true);
          } else {
            $('#edit-publication-types--wrapper .form-checkbox', elem).prop('checked', false);
          }
          getRssUrl();
        });

        // subjects.
        $('#edit-subjects--wrapper .form-checkbox', elem).change(function () {
          if ($('#edit-subjects--wrapper .form-checkbox:checked', elem).length == $('#edit-subjects--wrapper .form-checkbox', elem).length) {
            $('#edit-all-subjects', elem).prop('checked', true);
          }
          else {
            $('#edit-all-subjects', elem).prop('checked', false);
          }
          getRssUrl();
        });

        // Document types.
        $('#edit-publication-types--wrapper .form-checkbox', elem).change(function () {
          if ($('#edit-publication-types--wrapper .form-checkbox:checked', elem).length == $('#edit-publication-types--wrapper .form-checkbox', elem).length) {
            $('#edit-all-publication-types', elem).prop('checked', true);
          }
          else {
            $('#edit-all-publication-types', elem).prop('checked', false);
          }
          getRssUrl();
        });
      });
      getRssUrl();
    }
  };

}(jQuery, Drupal));

// http://acm-prod.p73/nl/nieuws/rss/publicaties?field_subjects[0]=6326&field_subjects[1]=6323&publication_type[0]=1&publication_type[1]=3".
// http://acm-prod.p73/nl/nieuws/rss/publicaties?field_subjects=All&publication_type=All
