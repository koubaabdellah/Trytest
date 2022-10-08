(function ($) {
  // Boolean to sync all filters on a page.
  const sync_all = false;

  // On filter click toggle the visible items.
  $('.paragraph--uitspraken-group__filters a.m-filter-bar__filter').on('click', function(e) {
    e.preventDefault();

    // Set variables.
    const key = $(this).data('key');
    const group = sync_all ? $('body') : $(this).closest('.paragraph--gerechtelijke-uitspraken-groep');
    const filters = group.find('.m-filter-bar__filter');
    const item_selector = '.paragraph--gerechtelijke-uitspraken__block';
    const items = group.find(item_selector);

    // Toggle active state.
    filters.removeClass('m-filter-bar__filter--is-active');
    group.find('.m-filter-bar__filter' + (key ? '[data-key=' + key + ']' : ':not([data-key])'))
      .addClass('m-filter-bar__filter--is-active');

    // Toggle items.
    items.show();
    if (key) {
      group.find(item_selector + ':not(.color-code-' + key + ')').hide();
    }

    // Show empty message if non visible.
    $('.paragraph--uitspraken-groep__items').each(function() {
      const empty_message = $(this).find('.paragraph--uitspraken-groep__items__empty-message');
      if ($(this).find('.paragraph--gerechtelijke-uitspraken__block:visible').length) {
        empty_message.hide();
      } else {
        empty_message.show();
      }
    });

  });
})(jQuery);
