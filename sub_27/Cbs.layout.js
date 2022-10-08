// hier wordt de layout van de app opgebouwd / gewijzigd etc.
var Layout = window.Layout = (function () {
    var _cameFromHome = false;
        // in het geval van geen html5 geven we een waarschuwing.
    var noHTML5 = function () {
        $('#confirm-wrapper .panel').css({ 'background-color': 'rgb(0,0,0)' });
        $('#confirm-wrapper .content p').html('Uw browser ondersteunt geen HTML5 canvas. Gebruik Microsoft Internet Explorer 9, Google Chrome, Firefox, Opera of Safari.');
        $('#confirm-wrapper .button-wrapper').empty();
        $('#confirm-wrapper').show();
        $('#layout').hide();
    };
    var defaultStart = function (d) {

    };

    // bij een deeplink
    var deeplinkStart = function (options) {
        // we kijken of de tabel al is geladen
        if (!OData.Table || ((typeof options['tableId'] != 'undefined') && (options['tableId'] != OData.Table.Identifier))) {
            ODataRepository.loadTable(options.tableId, options, ThemeTable.SetThemeTableList);
        }
    };

    var showTaalMenu = function () {
        // toont taalmenu afhankelijk van de catalogus settings
        var catalogus = Uri.getProperty('_catalog');
        var show_language_switch = settings.catalogs[catalogus].show_language_switch;
        var $taalmenu = $('#taalmenu');

        var createListItems = function (categories, selectedCategorie) {
            var listItemsHtml = '<ul class="active-list select"><li onclick=""><div class="label" data-item="' + selectedCategorie.Key + '">' + selectedCategorie.Title + '</div><ul>';
            $.each(categories, function (i, categorie) { listItemsHtml += '<li onclick="" data-item="' + categorie.Key + '">' + categorie.Title + '</li>' });
            listItemsHtml += '</ul></li></ul>';
            return listItemsHtml;
        };

        if (show_language_switch) {
            var language = Uri.object['_la'];
            var languages = [{ Key: 'nl', Title: 'NL' }, { Key: 'en', Title: 'EN' }];
            if (settings.catalogs[catalogus].languages.length > 0) {
                languages = [];
                for (var i = 0; i < settings.catalogs[catalogus].languages.length; i++) {
                    var lang = settings.catalogs[catalogus].languages[i];
                    languages.push({ Key: lang.toLowerCase(), Title: lang.toUpperCase() });
                }
            }

            $taalmenu.html(createListItems(
                languages,
                { Key: language, Title: resourceLibrary[language].title }));
            $taalmenu.addClass('language-switch');
            $taalmenu.find('ul.select > li').attr('tabindex', "2");
            $taalmenu.find('ul.select > li ul li').each(
                function (i, d) {
                    $(d).attr('tabindex', i + 3);
                });
        }
        else {
            $taalmenu.removeClass('language-switch');
        };
    };

    // berekenen van beschikbare hoogte van meegegeven item.
    var calculateAvailableHeight = function (item, margin) {
        if (!margin) { margin = 0; }
        item.css({ maxHeight: ((window.innerHeight - item.offset().top) + margin) + 'px' });
    };

    var returnCalculateAvailableHeight = function (item) {
        return (window.innerHeight - item.offset().top);
    };

    // voor het sluiten van de sidebar.
    var closeSidebar = function () {
        $('#layout').removeClass('show-sidebar').removeAttr('sidebarType');
    };
    // het openen van de meegegeven sidebar.
    var openSidebar = function (sidebarType) {
        $('#layout').attr('sidebarType', sidebarType);
        switch (sidebarType) {
            case 'main':
                $('#themaNav').show();
                $('#topicNav').hide();
                $('#layout #test-sidebar-trigger').show();
                $('#layout #test-sidebar-trigger2').hide();
                $('#layout').removeClass('sub');
                $('#layout').addClass('show-sidebar');
                break;
            case 'sub':
                $('#themaNav').hide();
                $('#topicNav').show();
                $('#layout #test-sidebar-trigger').hide();
                $('#layout #test-sidebar-trigger2').show();
                $('#layout').addClass('show-sidebar sub');
                break;
        }
    };

    var modifiedDataTemplate = function (table, descriptionType) {

        var modified = new Date(table.Modified.substring(0, 4),
            (table.Modified.substring(5, 7) - 1), /* Month is 0-11 */
            table.Modified.substring(8, 10),
            table.Modified.substring(11, 13),
            table.Modified.substring(14, 16), 0
        );

        if (!descriptionType) { descriptionType = 'Summary'; } // voor de treeview
        var summary = (table.Summary ? table.Summary : ''),
            tijdIndicatie = '';

        if (descriptionType == "ShortDescription")
            tijdIndicatie = lib.dictionary['Tijdvak'] + ': ' + table.Period + '&nbsp;&#47;&nbsp;'
                + lib.dictionary['Gewijzigd op'] + ': ' + modified.getDate() + ' ' + lib.month[modified.getMonth()] + ' ' + modified.getFullYear();

        var htmlBodyHelper = '<div class="body ' + descriptionType + '">'
            + '<h1>' + table.Title + '</h1>'
            + '<pre>' + summary + '</pre>'
            + '<p>' + tijdIndicatie + '</p>'
            + '</div>';

        var htmlIcons = '<div class="icons">';
        var graphTypes = table.GraphTypes ? table.GraphTypes.split(',') : [];
        if (graphTypes) {

            if ($.grep(graphTypes, function (obj) { return obj.toLowerCase() == 'line' }).length > 0) {
                htmlIcons += '<div class="icon lijn"></div>';
            }

            if ($.grep(graphTypes, function (obj) { return obj.toLowerCase() == 'bar' }).length > 0) {
                htmlIcons += '<div class="icon grafiek"></div>';
            }

            if ($.grep(graphTypes, function (obj) { return obj.toLowerCase() == 'map' }).length > 0) {
                htmlIcons += '<div class="icon land"></div>';
            }

            if ($.grep(graphTypes, function (obj) { return obj.toLowerCase() == 'table' }).length > 0) {
                htmlIcons += '<div class="icon tabel"></div>';
            }
        }
        htmlIcons += '</div>';

        return '<li onclick="" data-item="' + table.Identifier + '">' +
            htmlIcons +
            htmlBodyHelper + '</li>';
    };

    // we zetten hier de zoek layout.
    var setSearchLayout = function (value) {
        if (value && value != "") {
            var isPortal = $('#layout .viewport').hasClass('portal');
            if (isPortal) {
                $('#layout .viewport').removeClass().addClass('viewport search portal');
            }
            //Titel van de tabel legen;
            var nc = $("#trigger-main-sidebar").children().clone(false);
            $("#trigger-main-sidebar").text('').append(nc);

            // we gaan zoeken via de zoekservice.
            CBS.search(value, function (data) {
                var item = $('#content-search .news-item-wrapper .news-item');
                item.empty();
                item.append('<h1>' + lib.dictionary["Zoekresultaten"] + ' (' + OData.SearchResult.length + ')</h1>')

                var wrapper = $('#content-search .news-item-tables ul');
                wrapper.css({ height: (Layout.returnCalculateAvailableHeight(wrapper) - 60) + 'px' });
                wrapper.empty();
                $.each(OData.SearchResult, function (i, t) {
                    wrapper.append(Layout.modifiedDataTemplate(t, 'ShortDescription'));
                });
            });
        }
    };

    // we halen het zoek object weg.
    var removeSearchLayoutObject = function () {
        delete Uri.object['_search'];
    };

    var setLanguage = function (value) {
        if (resourceLibrary[value]) {
            Uri.setProperty('_la', value);
            $('#layout').attr('class', 'language-' + value);
            lib = resourceLibrary[value];
            var catalogus = Uri.object['_catalog'];
            lib.dictionary['App_Url'] = lib.dictionary['TemplateApp_Url'] + Uri.object['_catalog'];
            lib.dictionary['App title'] = settings.catalogs[catalogus].appTitle[value];
            lib.dictionary['App mobile title_Meta'] = settings.catalogs[catalogus].appMobileTitle[value];
            lib.dictionary['Portal_Url'] = lib.dictionary['TemplatePortal_Url'] + Uri.object['_catalog'];
            lib.dictionary['Portal title'] = settings.catalogs[catalogus].portalTitle[value];
            lib.dictionary['Portal mobile title_Meta'] = settings.catalogs[catalogus].portalMobileTitle[value];
            lib.dictionary['KorteUitleg_Html'] = settings.catalogs[catalogus].korteUitleg[value];
            lib.dictionary['cbs.nl_Url'] = settings.catalogs[catalogus].cbsNlUrl[value];
            lib.dictionary['cbs.nlTekstOpKnop'] = settings.catalogs[catalogus].cbsNlTekstOpKnop[value];
            lib.dictionary['cbs.api_Url'] = settings.catalogs[catalogus].cbsApiUrl[value];
            if (settings.catalogs[catalogus].backgroundURL && settings.catalogs[catalogus].backgroundURL[value]) {
                $('#layout div.viewport #content-home').css('backgroundImage', settings.catalogs[catalogus].backgroundURL[value]);
            };

            resourceLibrary.setLanguageObjects();

            if (settings.catalogs[catalogus].showReageren[value]) {
                $('#li_reageren').css('display', 'block');
            } else {
                $('#li_reageren').css('display', 'none');
            };

            if (settings.catalogs[catalogus].hideCbsKnopInPortal && settings.catalogs[catalogus].hideCbsKnopInPortal[value]) {
                $('#info_cbs').css('display', 'none');
            } else {
                $('#info_cbs').css('display', 'block');
            }


            if (OData && OData.Catalog) {
                //de hoofd themaboom in eigen block; ivm deling met portal;
                ThemeTable.SetThemeTableList();
            }

            //we zetten de confirm wrapper taal goed.
            Layout.setConfirmWrapperLanguage();

            Uri.setLanguageChangedState();
        }
    };
    // we zetten de taal voor de ConfirmWrapper.
    var setConfirmWrapperLanguage = function () {
        // ok
        $('#confirm-wrapper').find('.button-wrapper').find('.confirm').html(lib.dictionary["Confirm"]);
    };
    // we zetten de tabel layout voor het portaal
    var setPortalTableLayout = function (table, continuation, options) {
        OData.Table = table;
        if (!OData.Table) {
            return false;
        }

        ODataRepository.getTableInfosMeta(function () {
            $('#layout .viewport').removeClass().addClass('viewport portal graph');
            var htmlHelper;
            //Titel van de tabel
            var nc = $("#trigger-sub-sidebar").children().clone();
            $("#trigger-sub-sidebar").text(OData.Table.Title).append(nc);

            var wrapper = $("#table-placeholder");
            var h = Layout.calculateAvailableHeight(wrapper);

            wrapper.empty();
            wrapper.append('<h1>' + lib.dictionary['Tabeltoelichting'] + '</h1><pre>' + OData.Table.ShortDescription + '</pre>');
            wrapper.append('<h2>' + lib.dictionary['Tabelinformatie'] + '</h2>');
            wrapper.append('<h3>' + lib.dictionary['Inhoudelijk'] + '</h3>');
            htmlHelper = '<table class="data">';
            htmlHelper += (!OData.Table.Identifier) ? '' : '<tr><td>' + lib.dictionary['Identifier'] + '</td><td>' + OData.Table.Identifier + '</td></tr>';
            htmlHelper += (!OData.Table.ShortTitle) ? '' : '<tr><td>' + lib.dictionary['Korte titel'] + '</td><td>' + OData.Table.ShortTitle + '</td></tr>';
            htmlHelper += (!OData.Table.Summary) ? '' : '<tr><td>' + lib.dictionary['Samenvatting'] + '</td><td>' + OData.Table.Summary + '</td></tr>';
            htmlHelper += (!OData.Table.Period) ? '' : '<tr><td>' + lib.dictionary['Tijdvak'] + '</td><td>' + OData.Table.Period + '</td></tr>';
            htmlHelper += '</table>';
            wrapper.append(htmlHelper);

            wrapper.append('<h3>' + lib.dictionary['Administratie'] + '</h3>');
            htmlHelper = '<table class="data">';
            htmlHelper += (!OData.Table.Modified) ? '' : '<tr><td>' + lib.dictionary['Laatste wijziging'] + '</td><td>' + OData.Table.Modified + '</td></tr>';
            htmlHelper += (!OData.Table.MetaDataModified) ? '' : '<tr><td>' + lib.dictionary['Laatste wijziging metadata'] + '</td><td>' + OData.Table.MetaDataModified + '</td></tr>';
            htmlHelper += (!OData.Table.Frequency) ? '' : '<tr><td>' + lib.dictionary['Frequentie'] + '</td><td>' + OData.Table.Frequency + '</td></tr>';
            htmlHelper += (!OData.Table.ReasonDelivery) ? '' : '<tr><td>' + lib.dictionary['Reden aanlevering'] + '</td><td>' + OData.Table.ReasonDelivery + '</td></tr>';
            htmlHelper += (!OData.Table.OutputStatus) ? '' : '<tr><td>' + lib.dictionary['Status'] + '</td><td>' + OData.Table.OutputStatus + '</td></tr>';
            htmlHelper += '</table>';
            wrapper.append(htmlHelper);

            wrapper.append('<h3>' + lib.dictionary['Grootte bestand'] + '</h3>');
            htmlHelper = '<table class="data">';
            htmlHelper += (!OData.Table.RecordCount) ? '' : '<tr><td>' + lib.dictionary['Aantal rijen'] + '</td><td>' + OData.Table.RecordCount + '</td></tr>';
            htmlHelper += (!OData.Table.ColumnCount) ? '' : '<tr><td>' + lib.dictionary['Aantal kolommen'] + '</td><td>' + OData.Table.ColumnCount + '</td></tr>';
            htmlHelper += '</table>';
            wrapper.append(htmlHelper);

            Uri.setProperty('tableId', OData.Table.Identifier);
            Uri.setProperty('_theme', OData.Theme.ID);
            Uri.setURI();
            if (typeof continuation === 'function') {
                continuation(options);
            }
        });
    };

    return {
        noHTML5: noHTML5,
        defaultStart: defaultStart,
        deeplinkStart: deeplinkStart,
        showTaalMenu: showTaalMenu,
        calculateAvailableHeight: calculateAvailableHeight,
        returnCalculateAvailableHeight: returnCalculateAvailableHeight,
        closeSidebar: closeSidebar,
        openSidebar: openSidebar,
        modifiedDataTemplate: modifiedDataTemplate,
        setSearchLayout: setSearchLayout,
        removeSearchLayoutObject: removeSearchLayoutObject,
        setLanguage: setLanguage,
        setConfirmWrapperLanguage: setConfirmWrapperLanguage,
        setPortalTableLayout: setPortalTableLayout
    };
})();