var selected_filters = '';

jQuery(function ($)
{
    $.root.on('change', '.filter-popup--menu :input', function (e) {
        var
            $input = $(this),
            attr = $input.is('.filter-popup--alfamenu :input') ? 'letter' : 'pagina',
            selected = $input.val().toString();

        $input.closest('.filter-popup')
            .find('.filter-popup--items > [data-' + attr + ']').css('display', function () {
            var $this = $(this), val = $this.data(attr).toString();
            //console.log('.filter-popup',{ data: $this.data(), val: val, selected: selected });
            if (val === selected) {
                return 'block';
            }
            return 'none';
        });
    });

    $('.more-filters .wcag-filter-popup').attr('tabindex', 0);

    // wanneer men drukt op enter bij een label, dan het formulier niet versturen maar de input aanklikken.
    $.root.on('keypress', '.more-filters .wcag-filter-popup', function (e) {

        var key = e.keyCode ? e.keyCode : e.which;

        if (key === 13) {

            $(this).parent().click();

            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });

    // als een input binnen een label wordt aangevinkt, dan een andere input ook aanvinken.
    /*
    $.root.on('change', '.more-filters .wcag-filter-popup[data-sync]', function (e) {
        if (e.target.checked) {
            var check = document.getElementById(e.target.dataset.sync);
            if (check) {
                check.checked = e.target.checked;
                $(check).trigger('changed');
            }
        }
    });
    */

    $.root.on('click', 'input#filter-popup--close', function (e) {
      $(e.currentTarget).parent().find('a.filter-popup--close:not([tabindex])').trigger('click');
    });
  
    // bij klikken op sluit hyperlink in filter popup de checkbox ook weer uitzetten
    // en de button om de popup te openen focus geven.
    $.root.on('click', 'a.filter-popup--close[aria-controls]', function (e) {
        var $a = $(e.currentTarget),
            controls = $a.attr('aria-controls'),
            target = document.getElementById(controls),
            $focus;

        if(target && target instanceof HTMLInputElement && (target.type === 'radio' || target.type === 'checkbox'))
        {
            target.checked = false;
            $('#filter-popups').find('input, select, a[href]').attr('tabindex', -1);

            $focus = $('a[aria-controls="'+controls+'"].more-filters');
            if($focus.length)
            {
                // settimeout om event handlers te omzeilen
                setTimeout(function () {
                    console.log('passing focus to ', $focus[0]);
                    $focus[0].focus();
                },50);
            }

          // RemoveSelectedFilters($('.filter-popup--items-' + controls).closest('.filter-popup--scroller'));

          // Get all the selected filters in the popup
          let selectedFilters = $(e.currentTarget).closest('.filter-popup').find(".selectedFilter");

          // Get the corresponding group from the filter blocks.
          let indexOfCurrentFilterGroup = Number($(e.currentTarget).attr('href').split('-')[2]);
          let currentFilterGroup = $('.filter-i').eq(indexOfCurrentFilterGroup == 0 ? 0 : indexOfCurrentFilterGroup - 1);

          // Filter out all the filters that are already in the filter block.
          currentFilterGroup.find('input.custom-checkbox').each(function () {
            let element = $(this);
            let id = element.attr('id').substr(-3);

            selectedFilters = $.grep(selectedFilters, function (filter) {
              return !$(filter).attr('id').endsWith(id)
            });
          });

          // Copy each selected filter that isn't in the filter block to the filter block.
          selectedFilters.forEach(function (element) {
            let selectedFilter = $(element);
            let checkBoxClone = currentFilterGroup.find('div.custom-checkbox').has('input.custom-checkbox').first().clone();

            checkBoxClone.find('input.custom-checkbox')
              .attr('id', selectedFilter.attr('id').substr(9).replace('popup-', ''))
              .attr('aria-label', selectedFilter.attr('aria-label'))
              .attr('name', selectedFilter.attr('name'))
              .prop('checked', true)
              .val(selectedFilter.val());

            checkBoxClone.find('label')
              .attr('for', selectedFilter.attr('id').substr(9).replace('popup-', ''))
              .attr('title', selectedFilter.attr('aria-label'))
              .addClass('checked')

            checkBoxClone.find('.filter-i-optie').text(selectedFilter.val());
            checkBoxClone.find('.filter-i-aantal').text(selectedFilter.attr('data-amount'));

            checkBoxClone.first().detach().insertBefore(currentFilterGroup.find('.more-filters'));
            checkBoxClone.eq(1).detach().insertBefore(currentFilterGroup.find('.more-filters'));

            currentFilterGroup.find('input.custom-checkbox').last().customInput();
          });

          // Remove every unchecked filter that is more than the __MAX_FILTERS__ to prevent overflowing.
          currentFilterGroup.find('input.custom-checkbox').each(function (index) {
            let el = $(this);
            if (!el.is(':checked') && index >= globalconfiguration.max_filters) {
              currentFilterGroup.find('> div.custom-checkbox').eq(index).remove();
            }
          })
      }

    });

    // bij klikken op een hyperlink voor meer filters (popup)
    $.root.on('click', 'a.more-filters[aria-controls]', function (e) {
        var $link = $(e.currentTarget),
            target = document.getElementById($link.attr('aria-controls'));

        if(target && target instanceof HTMLInputElement && (target.type === 'radio' || target.type === 'checkbox'))
        {
            target.checked = true;
            $(target).trigger('changed');
            e.preventDefault();

            $('#filter-popups').find('input, select, a[href]').attr('tabindex', -1);

            // voor de geselecteerde filter popup weer de tabindex verwijderen, anders werkt tabben niet
            var $tabables = $(':checked + .filter-popup--bg + .filter-popup').find('input, select, a[href]').removeAttr('tabindex');

            $tabables.not('.focusguard,.filter-popup--close').first().focus();
        }
    });

    // checkboxes en hyperlinks binnen de filter popups uitzetten.
    $('#filter-popups').find('input, select, a[href]').attr('tabindex', -1);

    // bij aan/uitzetten van een filter popup alle tabindexes updaten.
    $.root.on('change', 'input.filter-popup--toggler', function (e) {

        $('#filter-popups').find('input, select, a[href]').attr('tabindex', -1);
        if (e.target.checked) {
            // voor de geselecteerde filter popup weer de tabindex verwijderen, anders werkt tabben niet
            var $tabables = $(':checked + .filter-popup--bg + .filter-popup').find('input, select, a[href]').removeAttr('tabindex');
            $tabables.not('.focusguard, .filter-popup--close').first().focus();

            if ($(this).data('alfabetisch') === false) {
                if ($tabables.length == 0)//sluiten popup
                {
                    RemoveSelectedFilters($('.filter-popup--items').closest('.filter-popup--scroller'));
                }
                else//openen popup
                {
                    SetActieveFiltersOpPopup(e.target);

                    let filterNaam = $('.filter-popup--items-' + e.target.id).closest('.filter-popup--scroller').data("filternaam");
                    LoadFilterPage(1, filterNaam, e.target.id);
                }
            }
        }
    });

    $.root.on('change', 'div.filter-popup--items input.custom-checkbox', function (e) {
        ToggleFilter(e.target);
    });

    // focusguard stopt de gebruiker van het tabben naar een element buiten de filter popup.
    $('.filter-popup .focusguard').show();
    $.root.on('focus', '.filter-popup .focusguard', function (e) {
        var $focusguard = $(e.target);
        var $filterpopup = $focusguard.closest('.filter-popup');
        var $tabables = $filterpopup
            .find('input, select, a[href]')
            .filter(':visible')
            .not('.focusguard');

        if ($focusguard.is('.first')) {
            $tabables.last().focus();
        } else {
            $tabables.first().focus();
        }
    });

    // bij escape het filter menu sluiten
    $.root.on('keyup', function (e) {
        var key = e.keyCode ? e.keyCode : e.which;
        if (key === 27) {
            $(':checked + .filter-popup--bg + .filter-popup .filter-popup--close').click();
        }
    });
});

function ToggleFilter(filterElement)
{
    if (filterElement.checked)
    {
        let allreadySelected = $(filterElement).closest('.filter-popup--scroller').find(".selectedFilter[value='" + filterElement.value + "']");

        if (allreadySelected.length == 0)
        {
            let cloneCheckbox = $(filterElement).clone().hide().removeClass();
            cloneCheckbox.attr('id', 'selected-' + cloneCheckbox.attr('id'));
            cloneCheckbox.addClass('selectedFilter');
            cloneCheckbox.attr('data-amount', $(filterElement).find('+ label').find('.filter-i-aantal').text())
            cloneCheckbox.appendTo($(filterElement).closest('.filter-popup--scroller'));
        }
    }
    else
    {
        $(filterElement).closest('.filter-popup--scroller').find(".selectedFilter[value='" + filterElement.value + "']").remove();
    }
}

function SetActieveFiltersOpPopup(elem)
{
    var filterDivHoofdScherm = $('label[for=' + elem.id + ']').closest('div.filter-i');
    var actieveFilters = $(filterDivHoofdScherm).find("input:checked");
    var popupFilters = $('.filter-popup--items-' + elem.id);

    actieveFilters.each(function () {
        $(popupFilters).find("input[value='" + $(this).val() + "']").prop("checked", true).change();
    });
}

function RemoveSelectedFilters(popupElement)
{
    $(popupElement).find('.selectedFilter').remove();
}

function SetFiltersSelected(popupElement)
{
    let selectedFilter = $(popupElement).find(".selectedFilter");

    if (selectedFilter.length > 0)
    {
        selectedFilter.each(function () {
            $('.filter-popup--items', $(popupElement)).find("input[value='" + $(this).val() + "']").prop("checked", true).change();
        });
    }
}

function LoadFilterPage(page, filternaam, filterid) {
    var nav_id = $.root.find('[name="nav_id"]').val();
    $.ajax({
        url: (globalconfiguration.web_root || '/') + 'service.php',
        data: {
            service: 'resultaten',
            method: 'GetFilterPagina',
            params: {
                // todo: aanpassen na build
                pagina: page,
                filternaam: filternaam,
                filternummer: filterid,
                nav_id: nav_id,
                selected_filters: selected_filters
            }
        }
    }).done(function (response) {
        $('.filter-popup--items-' + filterid).html(response);

        setTimeout(function () {
            $.root.find('input.custom-checkbox').not('.max-filteropties input.custom-checkbox').customInput();

            SetFiltersSelected($('.filter-popup--items-' + filterid).closest('.filter-popup--scroller'));
        }, 0);
    });
}

var debug_on = location.hostname == 'localhost' && 'console' in window && 'log' in window.console,
    log = debug_on ? window.console.log.bind(window.console) : $.noop,
    debug = debug_on ? window.console.debug.bind(window.console) : $.noop,
    w = $(window).width(),
    format
    ;

window.makeFilterPagination = function makeFilterPagination(placeholder, filterid, filternaam, activepage, aantalFilters, aantalPerPagina, selected_filters_passedon)
{
    selected_filters = selected_filters_passedon;
    $.ajax({
        type: 'GET',
        url: debug_on
            ? 'https://cdnjs.cloudflare.com/ajax/libs/jQuery-Paging/1.2.0/jquery.paging.js'
            : 'https://cdnjs.cloudflare.com/ajax/libs/jQuery-Paging/1.2.0/jquery.paging.min.js',
        dataType: 'script',
        cache: true
    }).then(function ()
    {
        $(placeholder).paging(aantalFilters, { 
            format: '[ < (-) nnnncnnnn (-) > ]', 
            perpage: aantalPerPagina, 
            lapping: 0, 
            page: activepage,
            onSelect: function (page) {
                LoadFilterPage(page, filternaam, filterid);
            },
            onFormat: function (type) { 

                let input, label;

                switch (type) {
                    case 'block':
                        if (!this.active)
                            return '';
                        
                        return '<a href="#" class="custom-navigation-page ' + (this.value == this.page ? 'custom-navigation-page-active' : '') + '">' + this.value + '</a>';
                    case 'next': 
                        return '<a data-type="next" class="custom-navigation-page custom-navigation-page-arrow default-button icon-chevron-right icon-color-navigation" title="Volgende"></a>';
                    case 'prev':
                        return '<a data-type="prev" class="custom-navigation-page custom-navigation-page-arrow default-button icon-chevron-left icon-color-navigation" title="Vorige"></a>';
                    case 'first':
                        return '<a data-type="first" class="custom-navigation-page custom-navigation-page-arrow default-button icon-fastleft icon-color-navigation" title="Eerste"></a>';
                    case 'last':
                        return '<a data-type="last" class="custom-navigation-page custom-navigation-page-arrow default-button icon-fastright icon-color-navigation" title="Laatste"></a>';
                    case 'fill':
                        if (!this.active)
                            return '';
                        return '<span class="custom-navigation-spacing" aria-hidden="true">...</span>';
                        break;
                }
            }
        });

    });
};