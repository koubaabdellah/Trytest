

var default_settings = {
    show_cbs_logo: false,
    show_portal_preview_buttons: true,
    use_offline_search: false,
    max_selectable_categories: 100,
    max_selectable_categories_geo: 160,
    max_cells: 20000,
    max_rows: 10000,
    max_columns: 1000,
    max_items_filter_expand: 2000,
    tooltip_truncate_length: 500,
    http_timeout: 60000, /* in milliseconds */
    'HOST_PREFIX': '//dataderden.cbs.nl/',
    'HOST_CSVDOWNLOAD_SERVICE': '//dataderden.cbs.nl/CsvDownload/csv/',
    'SOLR_SERVICE': '//opendata.cbs.nl/solr/',
    'HOST_GEO_SERVICE': '//geoservices.cbs.nl/arcgis/rest/services/CBStest/CBSgebiedsindelingen/MapServer/',
    'PDOK_GEO_SERVICE': '//service.pdok.nl/cbs/gebiedsindelingen',
    'HOST_DEEPLINKS': '//opendata.cbs.nl/deeplinkservice/deeplink/',
    'HOST_ODATA_SITECORE': 'www.cbs.nl/odata/v1/',
    'DEFAULT_CATALOG': 'AZW',
    'DEFAULT_LANGUAGE': 'nl',
    'API_PREFIX': 'ODataApi/odata/',
    'BULK_PREFIX': 'ODataFeed/odata/',
    'MODIFIED_MAX_DAYS': 7,
    'MODIFIED_MIN_ITEMS': 5,
    excel_string: function (s) { return '"' + s.replace(/\r\n/g, '\n').replace(/\n/g, this.excel_inline_newline()).replace(/"/g, /""/) + '"'; },
    excel_seperator: function () { return ';'; },
    excel_inline_newline: function () { return String.fromCharCode(10); },
    excel_newline: function () { return String.fromCharCode(13) + String.fromCharCode(10); },
    defaultChartColors: ['#e94c0a', '#fc0', '#af0e80', '#f39200', '#53a31d', '#afcd05', '#163a72', '#00a1cd'],
    defaultSubtitleBgColor: '004682',
    getCurrentLocation: function () { return angular.element(jQuery('.maincontent ')).scope().getSelectionUrl(); },
    hasInternetAccess: false,
    isPreviewEnviroment: false,
    catalogs: {
        'AZW': AZWConfig()
    }
}

var settings = default_settings;