$(document).ready(function () {
  var checkbox = $('input[type="checkbox"]');

  for (var i = 0; i < checkbox.length; i++) {
    var marginBottom = parseInt(checkbox.eq(i).css('margin-bottom'));
    var height = parseInt(checkbox.eq(i).css('height'));

    if (height <= 0) {
      height = checkbox.eq(i).css('line-height');
    }

    var maxHeight = parseInt(checkbox.eq(i).parent().css('height'));

    if (maxHeight <= 0) {
      maxHeight = parseInt(checkbox.eq(i).parent().css('line-height'));
    }

    if (checkbox.eq(i).parents('.viewing-item').length > 0) {
      height += 13;
    }

    checkbox.eq(i).css({ 'visibility': 'hidden', 'margin-right': '15px' });
    checkbox.eq(i).attr('id', 'checkbox-' + i);
    checkbox.eq(i).parent().css({ 'max-height':  maxHeight+ 'px' });
    checkbox.eq(i).parent().append('<label class="custom-checkbox" for="checkbox-' + i + '"></label>');
    if (checkbox.eq(i).hasClass("ignore-calc") === false) {
      checkbox.eq(i).parent().find('.custom-checkbox').css({ 'transform': 'translate(-2px, -' + (marginBottom + height) + 'px)' });
    }

    checkbox.eq(i).parent().find('.custom-checkbox').on('click', function () {
      if (!$(this).data('checked') && !checkbox.eq(i).attr('disabled')) {
          $(this).data('checked', true);

          if ($(this).parents('.viewings-container').length > 0) {
              $(this).css('background-image', 'url("/content/Images/icons_new/check_box_checked_blue.svg")');
          } else {
              $(this).css('background-image', 'url("/content/Images/icons_new/check_box_checked.svg")');
          }
      } else {
        $(this).data('checked', false);
          $(this).css('background-image', 'url("/content/Images/icons_new/check_box_unchecked.svg")');
      }
    });

      checkbox.eq(i).on('change', function () {
      var checked = $(this).is(':checked');
      var checkbox = $(this).parent().find('.custom-checkbox');

      if (checked != checkbox.data('checked')) {
        if (checked) {
            checkbox.data('checked', true);

            if (checkbox.parents('.viewings-container').length > 0) {
                checkbox.css('background-image', 'url("/content/Images/icons_new/check_box_checked_blue.svg")');
            } else {
                checkbox.css('background-image', 'url("/content/Images/icons_new/check_box_checked.svg")');
            }
        } else {
          checkbox.data('checked', false);
            checkbox.css('background-image', 'url("/content/Images/icons_new/check_box_unchecked.svg")');
        }
      }
    });

    if (checkbox.eq(i).attr('disabled')) {
      checkbox.eq(i).parent().find('.custom-checkbox').css('opacity', 0.5);
    }

    checkbox.eq(i).trigger('change');
  }
});