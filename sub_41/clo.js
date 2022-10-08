// Execute after page has loaded.
jQuery(document).ready(function ($) {

    jQuery('a').filter(function() {
        return this.hostname && this.hostname !== location.hostname;
    }).addClass("external");

    jQuery('.js-slides').after(
            '<div id="controls">' +
                '<div id="pause">' +
                '<a id="btnPause" href="#" onclick="jQuery(\'.js-slides\').cycle(\'pause\'); swapPauseResume(); return false;"><div class="ui-icon ui-icon-pause">P</div></a>' +
                '<a id="btnResume" href="#" onclick="jQuery(\'.js-slides\').cycle(\'resume\'); swapPauseResume(); return false;" style="display: none;"><div class="ui-icon ui-icon-play">R</div></a>' +
                '</div>' +
                '</div>'
        ).cycle({
            pause: 1,
            pager: '#nav',
            after: function (curr, next, opts) {
                jQuery('a[href="#accordion-'+ opts.currSlide +'"]').trigger('click', true);
            }
        });

    // Add onclick for table links
    jQuery("a.table").each(function () {
        jQuery(this).click(function () {
            _gaq.push(['_trackEvent', 'tabellen', 'download', jQuery(this).attr("href")]);
            return true;
        });
    });

    // Add onclick to external links
    // Creating custom :external selector
    jQuery.expr[':'].external = function (obj) {
        return !obj.href.match(/^mailto\:/) && (obj.hostname != location.hostname);
    };


    /** ------------------------------------------------------------------------------
     *  Figuurgroepleden verbergen muv de eerste en alle leden voorzien van besturing
     *  ------------------------------------------------------------------------------ */

    // First of all, redo the ID's to support multiple groups.
    var groupNumber = 0;
    var figuurNumber = 0;

    jQuery(".figuurgroep").each(function (i) {
        jQuery(this).attr('id', 'imageTabs-' + i);
    });

    jQuery("div.figuurgroeplid").each(function () {
        var id = jQuery(this).parent().attr('id');
        if (id != 'imageTabs-' + groupNumber) {
            ++groupNumber;
            figuurNumber = 0;
        }
        jQuery(this).attr("id", 'figuur' + '-' + groupNumber + '-' + (++figuurNumber));
    });

    // Loop through groupNumbers and add div/tabs.
    for (var i = 0; i <= groupNumber; i++) {
        var groupSelector = jQuery("div[id|=figuur-" + i + "]");
        var tablist = jQuery("<ul></ul>");

        groupSelector.each(function (index, value) {
            value = jQuery(value);
            var dataObject = value;
            var image = value.find('img');

            image.attr({'alt': dataObject.data('alt'), 'title': dataObject.data('title')});
            tablist.append(jQuery('<li><a href="#' + value.attr('id') + '" title="' + dataObject.data('tabtitle') + '">' + dataObject.data('tabtext') + '</a></li>'));
        });

        groupSelector.first().before(tablist);
    }

    jQuery('.figuurgroep').tabs();

    /**
     * Replace the geoservices div with actual iframe.
     */
    var configXml = jQuery("div#geoservice").text();
    if (configXml) {
        jQuery("div#geoservice").html("<iframe width=\"625\" height=\"600\" src=\"http://geoservice.pbl.nl/website/flexviewer_embedded/flexviewer/index.html?config=cfg/" + configXml + ".xml\" frameborder=\"0\"></iframe>");
        jQuery("div#geoservice").show();
    }

    searchResults.initFilters();

    /**
     * Accordion homepage.
     */
    function close_accordion_section() {
        jQuery('.accordion .accordion-section-title').removeClass('active');
        jQuery('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }

    jQuery('.accordion-section-title').click(function(e, cycled) {
        // Does the click originate from the cycle plugin?
        cycled = typeof cycled !== 'undefined' ? cycled : false;

        // Grab current anchor value
        var currentAttrValue = jQuery(this).attr('href');
        var currentId = parseInt(currentAttrValue.replace('#accordion-', ''));
        var slider = jQuery('.js-slides');

        if(jQuery(e.target).is('.active')) {
            //close_accordion_section();
        } else {
            close_accordion_section();
            // Add active class to section title
            jQuery(this).addClass('active');
            // Open up the hidden content panel
            jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }

        if (!cycled) {
            // Manual click by user, pause slider.
            if (slider[0].cyclePause == 0) {
                slider.cycle('pause');
                swapPauseResume();
            }

            // Set correct image to be shown.
            slider.cycle(currentId);
        }

        e.preventDefault();
    });

    jQuery('.accordion .accordion-section:first-child .accordion-section-content').slideDown(300).addClass('open');

    setTimeout(function() {
        $(document).trigger('afterready', $);
    }, 1);

});

/**
 * Set height for blocks.
 * Set all elements to maximum height to ensure same-height for all blocks. Add 20px of extra padding.
 */
jQuery( window ).load(function() {
    var maxHeight = 0;
    var elements = jQuery('div.homepage-block-rows');
    elements.each(function() {
        var thisH = jQuery(this).height();
        if (thisH > maxHeight) {
            maxHeight = thisH;
        }
    });

    elements.height(maxHeight + 20);
});

function swapPauseResume() {
    jQuery('#btnPause').toggle();
    jQuery('#btnResume').toggle();
}

function printHelp() {
    jQuery(".faq-answer").show();
    print();
    jQuery(".faq-answer").hide();
}

var searchResults = (function ($) {
    "use strict";

    var
        initFilters = function () {
            $('.sfilters input').change(function () {
                $(this).closest('form').submit();
            });
        };

    return {
        initFilters: initFilters
    };
}(window.jQuery));
