$(window).ready(function () {
    CBS.applySettings();
    CBS.start();
});

var CBS = window.CBS = (function () {
    var applySettings = function () {
        $.ajaxSetup({ cache: true });
        if (!settings.show_cbs_logo) {
            $('#graph-placeholder .logo').css('visibility', 'hidden');
            $('.content.tableinfo .logo').css('visibility', 'hidden');
        };
        // http://www.sitepoint.com/jquery-check-window-iframe/
        var isInIframe = (window.location != window.parent.location) ? true : false;
        if (isInIframe) {
            $('body').addClass("widget");
        };

        // retrieve previously stored settings
        if (localStorage != undefined && localStorage.settings != undefined) {
            var settings_new = JSON.parse(localStorage.settings);

            for (v in settings) {
                if (settings_new[v] != undefined) settings[v] = settings_new[v];
            }
        }
    };

    var start = function () {
        var isCanvasSupported = (typeof (document.createElement("canvas").getContext) === "function");

        if (isCanvasSupported) {
            this.init();
        } else {
            //Geen HTML5 ondersteuning
            Layout.noHTML5();
            return false;
        }
    };

    var init = function () {
        Uri.processURI();

        // zorg ervoor dat er een bekende _catalog in de URI staat.
        if (!(Uri.object['_catalog'] && settings.catalogs[Uri.object['_catalog']])) {
            Uri.setProperty('_catalog', settings.DEFAULT_CATALOG);
        }

        // default language: nl
        if (!(Uri.object['_la'] && resourceLibrary[Uri.object['_la']])) {
            Uri.setProperty('_la', 'nl');
        }

        // show link to StatLine App
        if (!settings.show_portal_preview_buttons || settings.catalogs[Uri.getProperty('_catalog')].portal_only) {
            $('.portal_button').css('visibility', 'hidden');
            $('#portal_button_statline_app').css('visibility', 'hidden');
        };

        resourceLibrary.init();

        resourceLibrary.objects.push(['.portal .logo', 'Portal_Url']);
        resourceLibrary.objects.push(['#trigger-main-sidebar', 'Portal_Url']);
        resourceLibrary.objects.push(['.apptitle', 'Portal title']);
        resourceLibrary.objects.push(['#portalMobileTitle', 'Portal mobile title_Meta']);
        resourceLibrary.objects.push(['.portal_download a:nth-child(3)', 'Ruwe dataset']);
        resourceLibrary.objects.push(['.portal_download a:nth-child(4)', 'Dataset voor grafische weergave']);
        resourceLibrary.objects.push(['#portal_link_to_apis', "Link naar API's"]);
        resourceLibrary.objects.push(['#portal_link_app', 'API (voor apps)']);
        resourceLibrary.objects.push(['#more_info', "Meer informatie"]);
        resourceLibrary.objects.push(['#portal_button_statline_app', "Preview tabel"]);
        resourceLibrary.objects.push(['#license', 'Licentie (CC BY 4.0)']);
        resourceLibrary.objects.push(['#whatis', 'Wat is open data?']);
        resourceLibrary.objects.push(['#manual_services', 'Handleiding odata services']);
        resourceLibrary.objects.push(['#manual_excel', 'Handleiding odata voor Excel Power pivot']);
        resourceLibrary.objects.push(['#previous_link', 'vorige']);
        resourceLibrary.objects.push(['#next_link', 'volgende']);
        resourceLibrary.objects.push(['#trigger-sub-sidebar', 'Kies thema']);
        resourceLibrary.objects.push(['#info_explanation', 'Uitleg API']);
        resourceLibrary.objects.push(['#info_explanation', 'cbs.api_Url']);
        resourceLibrary.objects.push(['#info_cbs', 'cbs.nl_Url']);
        resourceLibrary.objects.push(['.copyright', 'Copyright']);

        var language = Uri.object['_la'];

        Layout.setLanguage(language);
        Layout.showTaalMenu();

        this.load();
    };

    var load = function () {
        ODataRepository.getCatalog(function () {
            if (Uri.isDeeplink()) {
                Layout.deeplinkStart(Uri.object);
            } else {
                Layout.defaultStart(Uri.object);
            }
        });
    };

    var search = function (value, oncomplete) {
        var temp = [];

        if (default_settings.use_offline_search === true) {
            // work item 4447
            $.each(OData.Catalog.Tables, function (i, t) {
                if (t.Language.toLowerCase() === lib.title.toLowerCase()) {
                    if ((t.ShortDescription.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
                        (t.Title.toLowerCase().indexOf(value.toLowerCase()) !== -1)) {
                        temp.push(t);
                    };
                }
            });
            OData.SearchResult = temp;
            if (typeof oncomplete === 'function')
                oncomplete(temp);
        }
        else {
            var hostPrefix = settings.SOLR_SERVICE;
            var catalog = Uri.getProperty('_catalog') || default_settings.DEFAULT_CATALOG;
            var core = catalog + '_' + lib.title.toLowerCase() + '/';
            var params = {
                q: encodeURIComponent(value),
                wt: "json",
                start: 0,
                rows: Object.keys(OData.Catalog.Tables).length, // no paging
                fl: "PublicationKey", // we just need the PublicationKey
                facet: "false"
            };
            var url = hostPrefix + core + "select";

            $.ajax({
                url: url,
                dataType: 'json',
                type: 'GET',
                data: params
            })
                .done(function (dataResponse) {
                    // create lookup tables by Identifier
                    var tablesByIdentifier = {};
                    $.each(OData.Catalog.Tables, function (i, t) { tablesByIdentifier[t['Identifier']] = t; });
                    // store tables with matching Identifiers
                    $.each(dataResponse.response.docs, function (i, t) {
                        var tableMatch = tablesByIdentifier[t.PublicationKey];
                        if (tableMatch) { temp.push(tableMatch); }
                    });
                })
                .fail(function (error, status) {
                    var message = lib.dictionary['ZoekserviceFoutMelding'];
                    $('#confirm-wrapper .content p').html(message);
                    $('#confirm-wrapper').show();
                })
                .always(function () {
                    OData.SearchResult = temp;
                    if (typeof oncomplete === 'function')
                        oncomplete(temp);
                });
        }
    };

    return {
        applySettings: applySettings,
        start: start,
        init: init,
        load: load,
        search: search
    };
})();
