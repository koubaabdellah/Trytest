(function ($)
{
    $.root.ready(function ()
    {
        $.root.find('.opties-klik').on('click', function ()
        {
            filter_on();
        });

        $.root.find('.sluiten-klik').on('click', function ()
        {
            filter_off();
        });

        if (globalconfiguration.results_in_result_settings) {
            $(window).resize(function () {
                if (window.innerWidth > 980) {
                    $('.resultTitleDiv').hide();
                } else {
                    $('.resultTitleDiv').show();
                }
            }).resize();
        }
    });

    // als we een interne link volgen, dan de opties-div tonen
    $.root.on('click', '#atlantis-skiplinks a[href*="#"]', function (e) {
        var hash = e.target.hash.replace(/#/, '');
        if(hash !== ''){
            var $target = $('#' + hash),
                $opties_div = $target.closest('#opties-div');
            if($opties_div.length && $opties_div.is(':hidden'))
            {
                filter_on();
            }
        }
    });

    // force aria.
    filter_off();

    function filter_on()
    {
        if ($.root.find('#opties-div').is(':hidden') || $.root.find('#opties-div').attr('aria-expanded') === 'false')
        {
            $.root.find('#opties-div').attr('aria-expanded', 'true');
        }
        $.root.find('#opties-div').show();
        $.root.find('.result-viewswitcher').show();
        $.root.find('.sluiten-klik').show();
        $.root.find('.result-settings-form').show();
    }

    function filter_off()
    {
        $.root.find('#opties-div').removeAttr('style');
        if ($.root.find('#opties-div').is(':hidden') || $.root.find('#opties-div').attr('aria-expanded') === 'true')
        {
            $.root.find('#opties-div').attr('aria-expanded', 'false');

            $.root.find('.sluiten-klik, .opties-klik').attr('aria-controls', 'opties-div');
        }

        $.root.find('.sluiten-klik').hide();
    }
    
    $('#opties-div').on('keyup', function (e) {
      var key = e.keyCode ? e.keyCode : e.which;
      if (key === 27) {
        $('.sluiten-klik').click();
      }
    });

    $('.opties-klik').on('keyup', function (e) {
      var key = e.keyCode ? e.keyCode : e.which;
      if (key === 27) {
        $('.sluiten-klik').click();
      }
    });

  $('#opties-div').on('focusout', function (e) {
    if (!$('#opties-div')[0].contains(event.relatedTarget)) {
        filter_off();
      }
    });
})(jQuery);