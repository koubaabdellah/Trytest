jQuery(function ($) {

    chosen_callback = true;

    if (atlantisjs.is_desktop()) {
        /*
        $.root.find('select.custom-select-chosen').chosen({
            search_contains: true,
            disable_search: true,

            no_results_text: 'Niks gevonden',
            placeholder_text_multiple: 'Kies opties',
            placeholder_text_single: 'Kies optie',
        });
        */

        // tijdelijk uitgezet ivm voorlezen wat niet goed werkt.
        $.fn.chosen = function () {
            return this;
        };
    }
});