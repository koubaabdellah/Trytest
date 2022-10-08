jQuery(function ($) {
    var $html = $('html'),
        enabled,
        setHighContrast = function (enabled, store) {
            $('[data-toggle=high-contrast][role=button]').attr('aria-pressed', enabled ? 'true' : 'false');
            $html.toggleClass('high-contrast', enabled);

            if (store && localStorage) {
                localStorage.setItem('high-contrast', enabled ? '1' : '0');
            }
        },
        toggleHighContrast = function () {
            enabled = !enabled;
            setHighContrast(enabled, true);
        };

    if (localStorage) {
        let val = localStorage.getItem('high-contrast');
        if(val !== null)
        {
            enabled = 0 < Number(val);
        }
        else
        {
            // standaard waarde.
            enabled = false;
        }
    }
    setHighContrast(enabled);

    $html.on('click keydown', '[data-toggle=high-contrast]', function (event) {

        var click = event.type === 'click'
            ? event.currentTarget.getAttribute('role') === 'button'
            : event instanceof KeyboardEvent &&
            (
                event.key === " " ||
                event.key === "Enter" ||
                event.key === "Spacebar"
            );

        if (click) {
            toggleHighContrast();

            event.preventDefault();
        }
    });
});
