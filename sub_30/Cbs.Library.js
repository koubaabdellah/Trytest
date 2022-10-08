var resourceLibrary = {
    'objects': [],
    'setLanguageObjects': function () {
        $.each(this.objects, function (i, t) {
            resourceLibrary.setLanguageObject(t[0], t[1]);
        });
    },
    'setLanguageObject': function (selector, propertie) {
        var item = $(selector);
        if (item.length !== 0 && lib.dictionary[propertie]) {
            if (propertie.match(/\_Url$/)) {
                item.attr('href', lib.dictionary[propertie]);
            }
            else if (propertie.match(/\_Html$/)) {
                item.html(lib.dictionary[propertie]);
            }
            else if (propertie.match(/\_Placeholder$/)) {
                item.attr('placeholder', lib.dictionary[propertie]);
            }
            else if (propertie.match(/\_Meta$/)) {
                item.attr('content', lib.dictionary[propertie]);
            }
            else {
                var nc = item.children().clone();
                item.text(lib.dictionary[propertie]).append(nc);
            }
        }
    },
    'init' : function()
    {
        this.objects.push(['#info_help', 'Hoe werkt de App']);
        this.objects.push(['#info_help', 'Hoe werkt de App_Url']);
        this.objects.push(['#tableinfo-label', 'Tabelinformatie']);
        this.objects.push(['#toelichtingButton span', 'Toelichting']);
        this.objects.push(['#onderwerpButton span', 'Onderwerp']);
        this.objects.push(['#dimensiesButton span', 'Dimensies']);
        this.objects.push(['#appmenu', 'StatLine App']);
        this.objects.push(['.apptitle', 'App title']);
        this.objects.push(['#appMobileTitle', 'App mobile title_Meta']);
        this.objects.push(['#info_reageren', 'Reageren']);
        this.objects.push(['#info_reageren', 'Reageren_Url']);
        this.objects.push(['.logo', 'App_Url']);
        this.objects.push(['#trigger-main-sidebar', 'App_Url']);
        this.objects.push(['#featuredButton', 'Uitgelicht']);
        this.objects.push(['#searchByThemeButton', 'ZoekenOpThema']);
        this.objects.push(['#feed_bulk_download', 'feed_bulk_download']);
        this.objects.push(['#searchByKeywordButton', 'ZoekenOpTrefwoord']);
        this.objects.push(['#short-explanation-home', 'KorteUitleg_Html']);
        this.objects.push(['#menu_uitgelicht div.label', 'Uitgelicht']);
        this.objects.push(['#menu_themaboom div.label', 'Tabellen via thema']);
        this.objects.push(['#search-text', 'ZoekenOpTrefwoord_Placeholder']);
        this.objects.push(['#search-label', 'Zoeken']);
        //14497: this.objects.push(['#content-appmenu ul.menutabs li:nth-child(3)', 'Recent']);
        this.objects.push(['#content-appmenu #info_thema .themaslist .title h2:nth-child(1)', 'Tabellen via thema']);
        this.objects.push(['#demo-sidebaredit', 'Toevoegen']);
        this.objects.push(['.copyright', 'Copyright']);
        this.objects.push(['#info_cbs', 'cbs.nl_Url']);
        this.objects.push(['#info_cbs', 'cbs.nlTekstOpKnop']);
        this.objects.push(['#info_explanation', 'Uitleg API']);
        this.objects.push(['#info_explanation', 'cbs.api_Url']);
        this.objects.push(['#download-label', 'DownloadHeader']);
        this.objects.push(['#download-svg', 'DownloadSVG']);
        this.objects.push(['#download-csv', 'DownloadCSV']);
    },
    'nl': {
        'title': 'NL',
        'month': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
        'shortmonth': ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
        'roman': ['I', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X'],
        'language': 'la=nl',
        'CCBY4.0NL': 'https://creativecommons.org/licenses/by/4.0/deed.nl',
        'dictionary': {
            'Hoe werkt de App': 'Help',
            'Hoe werkt de App_Url': 'http://www.cbs.nl/nl-NL/menu/cijfers/statline/app/default.htm',
            'StatLine App': 'StatLine App',
            'Reageren': 'Reageren',
            'Reageren_Url': 'http://www.cbs.nl/nl-NL/menu/informatie/publiek/inlichtingen/default.htm',
            'TemplatePortal_Url': './portal.html?_la=nl&_catalog=',
            'TemplateApp_Url': './index.html#_la=nl&_catalog=',
            'cbs.nl_Url': 'http://www.cbs.nl/nl-NL/menu/home/default.htm',
            Uitgelicht: 'Etalage',
            'Tabellen via thema': 'Tabellen via thema',
            Recent: 'Recent verschenen',
            Zoeken: 'Zoeken',
            ZoekenOpThema: 'Zoeken op thema',
            ZoekenOpTrefwoord: 'Zoeken op trefwoord',
            ZoekenOpTrefwoord_Placeholder: 'trefwoord...',
            KorteUitleg_Html: '<strong>StatLine</strong> is de elektronische databank van het CBS. De databank bevat tabellen. U kunt zelf tabellen en bijbehorende grafieken wijzigen. De informatie is gratis en gemakkelijk te downloaden.',
            Zoekresultaten: 'Zoekresultaten',
            ZoekserviceFoutMelding: 'De zoekservice is momenteel niet beschikbaar',
            feed_bulk_download: 'Feed (bulk download)',
            DataLimietFoutMelding: 'Deze optie werkt niet bij meer dan 1 miljoen cellen. Gebruik hiervoor de Feed (Bulk download)',
            Tabelinformatie: 'Tabelinformatie',
            Toelichting: 'Toelichting',
            Onderwerp: 'Onderwerp',
            Onderwerpen: 'Onderwerpen',
            'Aantal geselecteerde cellen': 'Aantal geselecteerde cellen',
            'Teveel aantal geselecteerde cellen': 'Er zijn meer dan 1.000.000 cellen geselecteerd, beperk uw selectie',
            'Bestandsformaat': 'Bestandsformaat',
            Dimensies: 'Dimensies',
            Toevoegen: 'Toevoegen',
            Klaar: 'Klaar',
            'x-as wisselen': 'wisselen rij/kolom',
            'x-as en legenda verwisselen': 'Verwissel horizontale as en legenda',
            'x-as aanpassen': 'Horizontale as',
            'Regioindeling aanpassen': 'Regio-indeling',
            DownloadTekst: 'Het CBS stelt StatLine als Open Data beschikbaar via het Dataportaal CBS. Het Dataportaal bevat opties om de tabel te downloaden of gebruik te maken van API\'s. Onderstaande link brengt u bij het CBS Dataportaal. <br/><br/><a onclick="window.open(\'./portal.html#_la=nl&_catalog={Catalog}&tableId={Identifier}\')" href="#" class="externLink">Dataportaal</a>',
            'Tabeltoelichting':'Tabeltoelichting',
            'Inhoudelijk':'Inhoudelijk',
            'Identifier':'Identifier',
            'Korte titel':'Korte titel',
            'Samenvatting':'Samenvatting',
            'Tijdvak':'Verslagperiode',
            'Periode': 'Periode',
            'Administratie':'Administratie',
            'Gewijzigd op': 'Gewijzigd op',
            'Laatste wijziging':'Laatste wijziging',
            'Laatste wijziging metadata':'Laatste wijziging metadata',
            'Frequentie':'Frequentie',
            'Reden aanlevering':'Reden aanlevering',
            'Status': 'Status',
            'Grootte bestand': 'Grootte bestand',
            'Aantal rijen':'Aantal rijen',
            'Aantal kolommen': 'Aantal kolommen',
            'Ruwe dataset': 'Onbewerkte dataset',
            'Dataset voor grafische weergave': 'Dataset voor grafische weergave',
            "Link naar API's": "Link naar API's",
            'API (voor apps)': 'API (voor Apps)',
            'Licentie': 'Licentie',
            'vorige': 'vorige',
            'volgende': 'volgende',
            'Kies thema': 'Kies thema',
            'Uitleg API': 'Uitleg API',
            'Copyright': '© Centraal Bureau voor de Statistiek, ' + new Date().getFullYear(),
            'ToonAlles': 'toon alle ',
            'Confirm': 'OK',
            'Cancel': 'Annuleren',
            'Alles': 'Alles',
            'Alle': 'Alle',
            'Selectie': 'Selectie',
            'max.20 items': 'Maximaal 20 items',
            DownloadHeader: 'Download als',
            DownloadSVG: 'SVG vector afbeelding',
            DownloadCSV: 'CSV',
            DownloadCSV4Graphics: 'CSV voor grafische verwerking',
            'Meer informatie': 'Meer informatie',
            'Preview tabel': 'Preview tabel',
            'Licentie (CC BY 4.0)': 'Licentie (CC BY 4.0)',
            'Wat is open data?': 'Wat is open data?',            
            'Handleiding odata services': 'Handleiding odata services',
            'Handleiding odata voor Excel Power pivot': 'Handleiding odata voor Excel Power pivot',
            'whatis_url': 'https://www.cbs.nl/nl-nl/onze-diensten/open-data/databank-cbs-statline-als-open-data',
            'manual_services_url': 'https://www.cbs.nl/-/media/_pdf/2017/13/handleiding-cbs-open-data-services.pdf?la=nl-nl',
            'manual_excel_url': 'https://www.cbs.nl/-/media/statline/documenten/handleiding-power-pivot-met-cbs-open-data-v2.pdf?la=nl-nl',
        },
        timeCategories: {/*bepaald ook volgorde van presentatie*/
            'JJ': 'Jaren',
            'MM': 'Maanden',
            'KW': 'Kwartalen',
            'SJ': 'Jaren',
            'HJ': 'Halfjaren',
            'W1': 'Weken',
            'W4': '4-weken',
            'VS': 'VS-maanden',
            'G2': 'G2',
            'G3': 'G3',
            'G4': 'G4',
            'G5': 'G5',
            'VJ': 'VS-jaren',
            'M3': 'M3'
        },
        geoCategories: {/*bepaald ook volgorde van presentatie*/
            'BU': 'Buurten',
            'WK': 'Wijken',
            'PV': 'Provincies',
            'ZK': 'Zorgkantoorregio’s',
            'SG': 'Stadsgewesten',
            'CP': 'COROP-plusgebieden',
            'CS': 'COROP-subgebieden',
            'EG': 'Economisch-geografische gebieden',
            'GA': 'Grootstedelijke agglomeraties',
            'KD': 'Kiesdistricten',
            'KM': 'Kieskringen Tweede Kamer',
            'BR': 'Brandweerregio’s',
            'LB': 'Landbouwgebieden',
            'LG': 'Groepen van landbouwgebieden',
            'NO': 'Nodale gebieden',
            'RB': 'RBA-gebieden',
            'RE': 'Regionale eenheden',
            'RP': 'RPA-gebieden',
            'PO': 'Politieregio’s',
            'TR': 'Toeristengebieden',
            'TG': 'Toeristengebiedengroep',
            'PD': 'Politiedistricten',
            'RA': 'RegioPlus-arbeidsmarktregio’s',
            'GM': 'Gemeenten',
            'CR': 'COROP-gebieden',
            'GG': 'GGD-regio’s',
            'LD': 'Landsdelen',
            'AM': 'Arbeidsmarktregio’s',
            'VR': 'Veiligheidsregio’s',
            'JZ': 'Jeugdregio’s',
            'BT': 'Basisteams',
            'MC': 'Regionaal Meld- en Coördinatiepunt',
            'ES': 'Regionale Energiestrategie regio',
            'VT': 'Veilig Thuis regio',
            'ET': 'SubRES-regio',
            'RT': 'Ressort',
            'CG': "Cluster van gemeenten",
            'SV': "Schoolvakantieregio",
            'CO': "Concentratiegebieden",
            'RS': "Stroomgebieden"
        },
        timeView: function (timeKey) {
            var tk1 = timeKey.substring(0, 4);
            var tk2 = timeKey.substring(4, 6);
            var tk3 = timeKey.substring(6, 8);
            switch (tk2) {
                case 'JJ': return tk1; break;
                case 'MM': return this.shortmonth[parseInt(tk3, 10)-1] + ' ' + tk1.substring(2, 4); break;
                case 'KW': return tk1 + ' ' + this.roman[parseInt(tk3, 10) - 1]; break;
                case 'SJ': return tk1; break;
                case 'HJ': return tk1.substring(2, 4) + ' ' + tk3.substring(1, 2) + 'HJ'; break;
                case 'W1': return tk1.substring(2, 4) + ' W' + tk3; break;
                case 'W4': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'VS': break;
                case 'G1': return tk1; break;
                case 'G2': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 1); break;
                case 'G3': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 2); break;
                case 'G4': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 3); break;
                case 'G5': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 4); break;
                case 'VJ': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'MC': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'M3': return tk1.substring(2, 4) + ' M' + parseInt(tk3); break;
                default:
                    if ($.isNumeric(tk2)) {
                        return tk3 + '-' + tk2 + '-' + tk1.substring(2, 4);
                    }
                    break;
            }
            return timeKey;
        },
        pageSize: {
            tableOnlyPageSize: 1000,
            infiniteScrollPageSize: 500
        }
    },
    'en': {
        'title': 'EN',
        'month': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'shortmonth': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        'roman': ['I', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X'],
        'language': 'la=en',
        'CCBY4.0NL': 'https://creativecommons.org/licenses/by/4.0/deed.en',
        'dictionary': {
            'Hoe werkt de App': 'Help',
            'Hoe werkt de App_Url': 'http://www.cbs.nl/en-GB/menu/cijfers/statline/app/default.htm',
            'StatLine App': 'StatLine App',
            'Reageren': 'Feedback',
            'Reageren_Url': 'http://www.cbs.nl/en-GB/menu/informatie/publiek/inlichtingen/default.htm',
            'TemplatePortal_Url': './portal.html?_la=en&_catalog=',
            'TemplateApp_Url': './index.html#_la=en&_catalog=',
            'cbs.nl_Url': 'http://www.cbs.nl/en-GB/menu/home/default.htm',
            Uitgelicht: 'In the spotlight',
            'Tabellen via thema': 'Tables by theme',
            Recent: 'Recently published',
            Zoeken: 'Search',
            ZoekenOpThema: 'Search by theme',
            ZoekenOpTrefwoord: 'Search by keyword',
            ZoekenOpTrefwoord_Placeholder: 'keyword...',
            KorteUitleg_Html: '<strong>StatLine</strong> is the electronic databank of Statistics Netherlands. It enables users to compile their own tables and graphs. The information can be accessed and downloaded free of charge.',
            Zoekresultaten: 'Search results',
            ZoekserviceFoutMelding: 'The search service is currently not available',
            feed_bulk_download: 'Feed (bulk download)',
            DataLimietFoutMelding: 'This option does not work with more than 1 million cells. Use the Feed (Bulk download)',
            Tabelinformatie: 'Table Information',
            Toelichting: 'Explanation',
            Onderwerp: 'Topic',
            Onderwerpen: 'Topics',
            'Aantal geselecteerde cellen': 'Total selected cells',
            'Teveel aantal geselecteerde cellen': 'There are more than 1.000.000 selected cells, limit your selection',
            'Bestandsformaat': 'File format',
            Dimensies: 'Dimension',
            Toevoegen: 'Add',
            Klaar: 'Done',
            'x-as wisselen': 'Change row/colom',
            'x-as en legenda verwisselen': 'Switch horizontal axis and legend',
            'x-as aanpassen': 'Horizontal axis',
            'Regioindeling aanpassen': 'Region classification',
            DownloadTekst: 'Statistics Netherlands makes StatLine available as Open Data via the CBS Data Portal, where you can download the table or use an API. Click on the link below to go to the Data Portal. <br/><br/><a onclick="window.open(\'./portal.html#_la=en&_catalog={Catalog}&tableId={Identifier}\')" href="#" class="externLink">Data Portal</a>',
            'Tabeltoelichting': 'Table explanation',
            'Inhoudelijk': 'Concerning content',
            'Identifier': 'Identifier',
            'Korte titel': 'Short title',
            'Samenvatting': 'Summary',
            'Tijdvak': 'Reference period',
            'Periode': 'Period',
            'Administratie': 'Administration',
            'Gewijzigd op': 'Changed on',
            'Laatste wijziging': 'Last change',
            'Laatste wijziging metadata': 'Last change metadata',
            'Frequentie': 'Frequency',
            'Reden aanlevering': 'Cause for publication',
            'Status': 'Status',
            'Grootte bestand': 'File size',
            'Aantal rijen': 'Number of rows',
            'Aantal kolommen': 'Number of columns',
            'Ruwe dataset': 'Original dataset',
            'Dataset voor grafische weergave': 'Dataset for graphical representation',
            "Link naar API's": "Link to API's",
            'API (voor apps)': 'API (for Apps)',
            'Licentie': 'License',
            'vorige': 'previous',
            'volgende': 'next',
            'Kies thema': 'Select theme',
            'Uitleg API': 'Explanation API',
            'Copyright': '© Statistics Netherlands, ' + new Date().getFullYear(),
            'ToonAlles': 'show all ',
            'Confirm': 'OK',
            'Cancel': 'Cancel',
            'Alles': 'All',
            'Alle': 'All',
            'Selectie': 'Selection',
            'max.20 items': 'Up to 20 entries',
            DownloadHeader: 'Download as',
            DownloadSVG: 'SVG vector image',
            DownloadCSV: 'CSV',
            DownloadCSV4Graphics: 'CSV for graphical processing',
            'Meer informatie' : 'More information',
            'Preview tabel' : 'Preview table',
            'Licentie (CC BY 4.0)': 'License (CC BY 4.0)',
            'Wat is open data?' : 'What is open data?',
            'Handleiding odata services' : 'Manual odata services (Dutch)',
            'Handleiding odata voor Excel Power pivot': 'Manual odata for Excel Power pivot (Dutch)',
            'whatis_url': 'https://www.cbs.nl/en-gb/our-services/open-data/statline-as-open-data',
            'manual_services_url': 'https://www.cbs.nl/-/media/_pdf/2017/13/handleiding-cbs-open-data-services.pdf?la=nl-nl',
            'manual_excel_url': 'https://www.cbs.nl/-/media/statline/documenten/handleiding-power-pivot-met-cbs-open-data-v2.pdf?la=nl-nl',
        },
        timeCategories: {/*bepaald ook volgorde van presentatie*/
            'JJ': 'Years',
            'MM': 'Months',
            'KW': 'Quarters',
            'SJ': 'Years',
            'HJ': 'Half years',
            'W1': 'Weeks',
            'W4': '4 weeks',
            'VS': 'MA-months',
            'G2': 'G2',
            'G3': 'G3',
            'G4': 'G4',
            'G5': 'G5',
            'VJ': 'MA-years',
            'M3': 'M3'
        },
        geoCategories: {/*bepaald ook volgorde van presentatie*/
            'BU': 'Neighbourhoods',
            'WK': 'Districts',
            'PV': 'Provinces',
            'ZK': 'Care liaison regions',
            'SG': 'Urban regions',
            'CP': 'COROP plus-regions',
            'CS': 'COROP sub-regions',
            'EG': 'Economic-geographical regions',
            'GA': 'Metropolitan agglomerations',
            'KD': 'Electoral districts',
            'KM': 'Electoral districts for parl. elections',
            'BR': 'Fire brigade regions',
            'LB': 'Agricultural regions',
            'LG': 'Group of agricultural regions',
            'NO': 'Nodal areas',
            'RB': 'RBA regions',
            'RE': 'Regional Units',
            'RP': 'RPA regions',
            'PO': 'Police regions',
            'TR': 'Tourist regions',
            'TG': 'Tourist regions group',
            'PD': 'Police districts',
            'RA': 'RegioPlus-deployment market regions',
            'GM': 'Municipalities',
            'CR': 'Corop regions',
            'GG': 'GGD regions',
            'LD': 'Group of provinces',
            'AM': 'Labour market regions',
            'VR': 'Security regions',
            'JZ': 'Youth regions',
            'BT': 'Base teams',
            'MC': 'Regional reporting and coordination point',
            'ES': 'Regional Energy Strategy region',
            'VT': 'Safe at Home region',
            'ET': 'SubRES region',
            'RT': 'Area of Court of Appeal jurisdiction',
            'CG': "Group of municipalities",
            'SV': "School holidays region",
            'CO': "-- No Translation Available --",
            'RS': "-- No Translation Available --"
        },
        timeView: function (timeKey) {
            var tk1 = timeKey.substring(0, 4);
            var tk2 = timeKey.substring(4, 6);
            var tk3 = timeKey.substring(6, 8);
            switch (tk2) {
                case 'JJ': return tk1; break;
                case 'MM': return this.shortmonth[parseInt(tk3, 10) - 1] + ' ' + tk1.substring(2, 4); break;
                case 'KW': return tk1 + ' ' + this.roman[parseInt(tk3, 10) - 1]; break;
                case 'SJ': return tk1; break;
                case 'HJ': return tk1.substring(2, 4) + ' ' + tk3.substring(1, 2) + 'HY'; break;
                case 'W1': return tk1.substring(2, 4) + ' W' + tk3; break;
                case 'W4': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'VS': break;
                case 'G1': return tk1; break;
                case 'G2': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 1); break;
                case 'G3': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 2); break;
                case 'G4': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 3); break;
                case 'G5': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 4); break;
                case 'VJ': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'MC': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'M3': return tk1.substring(2, 4) + ' M' + parseInt(tk3); break;
                default:
                    if ($.isNumeric(tk2)) {
                        return tk2 + '-' + tk3 + '-' + tk1.substring(2, 4);
                    }
                    break;
            }
            return timeKey;
        },
        pageSize: {
            tableOnlyPageSize: 1000,
            infiniteScrollPageSize: 500
        }
    },
    'de': {
        'title': 'DE',
        'month': ['januar', 'februar', 'märz', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'dezember'],
        'shortmonth': ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
        'roman': ['I', 'II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IX', 'X'],
        'language': 'la=de',
        'CCBY4.0NL': 'https://creativecommons.org/licenses/by/4.0/deed.nl',
        'dictionary': {
            'Hoe werkt de App': 'Hilfe',
            'Hoe werkt de App_Url': 'http://www.cbs.nl/nl-NL/menu/cijfers/statline/app/default.htm',
            'StatLine App': 'StatLine App',
            'Reageren': 'Antworten',
            'Reageren_Url': 'http://www.cbs.nl/nl-NL/menu/informatie/publiek/inlichtingen/default.htm',
            'TemplatePortal_Url': './portal.html?_la=de&_catalog=',
            'TemplateApp_Url': './index.html#_la=de&_catalog=',
            'cbs.nl_Url': 'http://www.cbs.nl/nl-NL/menu/home/default.htm',
            Uitgelicht: 'Schaufenster',
            'Tabellen via thema': 'Tabellen nach Thema',
            Recent: 'Kürzlich veröffentlicht',
            Zoeken: 'Suchen',
            ZoekenOpThema: 'Suchen na thema',
            ZoekenOpTrefwoord: 'Suchen na schlüsselwort',
            ZoekenOpTrefwoord_Placeholder: 'schlüsselwort...',
            KorteUitleg_Html: '<strong>StatLine</strong> is de elektronische databank van het CBS. De databank bevat tabellen. U kunt zelf tabellen en bijbehorende grafieken wijzigen. De informatie is gratis en gemakkelijk te downloaden.',
            Zoekresultaten: 'Ergebnisse',
            ZoekserviceFoutMelding: 'Der Suchdienst ist derzeit nicht verfügbar',
            feed_bulk_download: 'Feed (Bulk Download)',
            DataLimietFoutMelding: 'Deze optie werkt niet bij meer dan 1 miljoen cellen. Gebruik hiervoor de Feed (Bulk download)',
            Tabelinformatie: 'Informationen zur Tabelle',
            Toelichting: 'Toelichting',
            Onderwerp: 'Thema',
            Onderwerpen: 'Themen',
            'Aantal geselecteerde cellen': 'Anzahl der ausgewählten Zellen',
            'Teveel aantal geselecteerde cellen': 'Es wurden mehr als 1.000.000 Zellen ausgewählt. Schränken Sie Ihre Auswahl ein',
            'Bestandsformaat': 'Bestandsformaat',
            Dimensies: 'Dimensionen',
            Toevoegen: 'Hinzufügen',
            Klaar: 'Fertig',
            'x-as wisselen': 'wisselen rij/kolom',
            'x-as en legenda verwisselen': 'Verwissel horizontale as en legenda',
            'x-as aanpassen': 'Horizontale as',
            'Regioindeling aanpassen': 'Regio-indeling',
            DownloadTekst: 'Het CBS stelt StatLine als Open Data beschikbaar via het Dataportaal CBS. Het Dataportaal bevat opties om de tabel te downloaden of gebruik te maken van API\'s. Onderstaande link brengt u bij het CBS Dataportaal. <br/><br/><a onclick="window.open(\'./portal.html#_la=nl&_catalog={Catalog}&tableId={Identifier}\')" href="#" class="externLink">Dataportaal</a>',
            'Tabeltoelichting': 'Tabellenerläuterung',
            'Inhoudelijk': 'Inhalt',
            'Identifier': 'Tabellen-ID',
            'Korte titel': 'Kurztitel',
            'Samenvatting': 'Zusammenfassung',
            'Tijdvak': 'Berichtsperiode',
            'Periode': 'Periode',
            'Administratie': 'Allgemeine Angaben',
            'Gewijzigd op': 'Gewijzigd op',
            'Laatste wijziging': 'Letzte Änderung',
            'Laatste wijziging metadata': 'Letzte Änderung Metadaten',
            'Frequentie': 'Frequenz',
            'Reden aanlevering': 'Grund für die Lieferung',
            'Status': 'Status',
            'Grootte bestand': 'Dateigröße',
            'Aantal rijen': 'Anzahl der Zeilen',
            'Aantal kolommen': 'Anzahl der Spalten',
            'Ruwe dataset': 'Datensatz',
            'Dataset voor grafische weergave': 'Datensatz für die grafische Darstellung',
            "Link naar API's": "Link zu APIs",
            'API (voor apps)': 'API (für Apps)',
            'Licentie': 'Licentie',
            'vorige': 'zurück',
            'volgende': 'nächste',
            'Kies thema': 'Thema auswählen',
            'Uitleg API': 'Erklärung API',
            'Copyright': '© Centraal Bureau voor de Statistiek, ' + new Date().getFullYear(),
            'ToonAlles': 'toon alle ',
            'Confirm': 'OK',
            'Cancel': 'Annuleren',
            'Alles': 'Alles',
            'Alle': 'Alle',
            'Selectie': 'Auswahl',
            'max.20 items': 'Maximal 20 Elemente',
            DownloadHeader: 'Download als',
            DownloadSVG: 'SVG vector afbeelding',
            DownloadCSV: 'CSV',
            DownloadCSV4Graphics: 'CSV voor grafische verwerking',
            'Meer informatie': 'Weitere Informationen',
            'Preview tabel': 'Tabellenvorschau',
            'Licentie (CC BY 4.0)': 'Lizenz (CC BY 4.0)',
            'Wat is open data?': 'Was sind Open Data?',
            'Handleiding odata services': 'Manuelle Odata Dienste (Niederländisch)',
            'Handleiding odata voor Excel Power pivot': 'Manuelle Odata für Excel Power Pivot (Niederländisch)',
            'whatis_url': 'https://www.cbs.nl/en-gb/our-services/open-data/statline-as-open-data',
            'manual_services_url': 'https://www.cbs.nl/-/media/_pdf/2017/13/handleiding-cbs-open-data-services.pdf?la=nl-nl',
            'manual_excel_url': 'https://www.cbs.nl/-/media/statline/documenten/handleiding-power-pivot-met-cbs-open-data-v2.pdf?la=nl-nl',
        },
        timeCategories: {/*bepaald ook volgorde van presentatie*/
            'JJ': 'Jahre',
            'MM': 'Monate',
            'KW': 'Quartale',
            'SJ': 'Schuljahre',
            'HJ': 'Halbjahre',
            'W1': 'Wochen',
            'W4': '4-Wochen',
            'VS': 'VS-Monate',
            'G2': 'G2',
            'G3': 'G3',
            'G4': 'G4',
            'G5': 'G5',
            'VJ': 'VS-jaren',
            'M3': 'M3'
        },
        geoCategories: {/*bepaald ook volgorde van presentatie*/
            'BU': 'Stadtviertel',
            'WK': 'Stadtteil',
            'PV': 'Provinzen',
            'ZK': 'Gesundheitsamtregionen',
            'SG': 'Gemeinden',
            'CP': 'COROP-gebiete',
            'CS': 'COROP-Teilgebiete',
            'EG': 'Wirtschatlich-geografische Gebiete',
            'GA': 'Grossstädtische Agglomerationen',
            'KD': 'Wahldistrict',
            'KM': 'Wahlkreis Tweede Kamer',
            'BR': 'Feuerwehrregionen',
            'LB': 'Landbaugebiete',
            'LG': 'Gruppen der Landbaugebiete',
            'NO': 'Nodale Gebiete',
            'RB': 'RBA-Gebiete',
            'RE': 'Regionale Einheiten',
            'RP': 'RPA-Gebiete',
            'PO': 'Polizeiregionen',
            'TR': 'Touristikgebiete',
            'TG': 'Gruppe der Touristengebiete',
            'PD': 'Polizei districte',
            'RA': 'RegioPlus-deployment market regions',
            'GM': 'Gemeinden',
            'CR': 'COROP-Gebiete',
            'GG': 'GGD-Regionen',
            'LD': 'Landesteile',
            'AM': 'Arbeitsmarktregionen',
            'VR': 'Sicherheitsregionen',
            'JZ': 'Jugendregionen',
            'BT': 'Basisteams',
            'MC': 'Regional reporting and coordination point',
            'ES': 'Regional Energy Strategy region',
            'VT': 'Safe at Home region',
            'ET': 'SubRES Region',
            'RT': 'Erholungsort',
            'CG': "Cluster von Gemeinden", 
            'SV': "Schulferienregion",
            'CO': "-- No Translation Available --",
            'RS': "-- No Translation Available --"
        },
        timeView: function (timeKey) {
            var tk1 = timeKey.substring(0, 4);
            var tk2 = timeKey.substring(4, 6);
            var tk3 = timeKey.substring(6, 8);
            switch (tk2) {
                case 'JJ': return tk1; break;
                case 'MM': return this.shortmonth[parseInt(tk3, 10) - 1] + ' ' + tk1.substring(2, 4); break;
                case 'KW': return tk1 + ' ' + this.roman[parseInt(tk3, 10) - 1]; break;
                case 'SJ': return tk1; break;
                case 'HJ': return tk1.substring(2, 4) + ' ' + tk3.substring(1, 2) + 'HJ'; break;
                case 'W1': return tk1.substring(2, 4) + ' W' + tk3; break;
                case 'W4': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'VS': break;
                case 'G1': return tk1; break;
                case 'G2': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 1); break;
                case 'G3': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 2); break;
                case 'G4': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 3); break;
                case 'G5': return tk1.substring(2, 4) + '/' + (parseInt(tk1.substring(2, 4)) + 4); break;
                case 'VJ': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'MC': return tk1.substring(2, 4) + ' ' + tk2 + tk3; break;
                case 'M3': return tk1.substring(2, 4) + ' M' + parseInt(tk3); break;
                default:
                    if ($.isNumeric(tk2)) {
                        return tk3 + '-' + tk2 + '-' + tk1.substring(2, 4);
                    }
                    break;
            }
            return timeKey;
        },
        pageSize: {
            tableOnlyPageSize: 1000,
            infiniteScrollPageSize: 500
        }
    }
};

var lib = resourceLibrary['nl'];