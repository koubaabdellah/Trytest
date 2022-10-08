//
// Javascript functions that call OData web services through ajax calls.
// Communication is in JSON
jQuery.support.cors = true;

// ophalen van de data voor de grafieken.
var OData = window.OData = {
    useContainer: true,

    catalog_service: settings.HOST_PREFIX + 'ODataCatalog/', //'OData3StatlineCatalogService/',
    wide_service: settings.HOST_PREFIX + settings.API_PREFIX, //'OData3StatlineAppService/',
    widefeed_service: settings.HOST_PREFIX + settings.BULK_PREFIX, //'OData3StatlineAppService/',
    app_service: function () {
        return this.get_url(arguments)
    },
    feed_service: function () {
        return this.get_feedurl(arguments)
    },
    get_url: function () {
        return OData.wide_service + [].slice.call(arguments[0]).join('/');
    },
    get_feedurl: function () {
        return OData.widefeed_service + [].slice.call(arguments[0]).join('/');
    },
    status: {},

    // we bouwen het json request op in onderstaande functies.
    filterClause: function () {
        var catalogus = Uri.getProperty('_catalog') || default_settings.DEFAULT_CATALOG;
        return 'Catalog eq \'' + catalogus + '\'';
    },
    request: function (c, t, d, useFeed) {
        var url = (c) ? OData.catalog_service + t.type : ((useFeed) ? this.feed_service(t.table, t.type) : this.app_service(t.table, t.type));
        return $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            data: d
        });
    },
    requestNextLink: function (nextLink) {
        var url = nextLink;
        return $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET'
        });
    },
    catalog_list: function (t, d) {
        return this.request(true, { 'type': '' + t }, d);
    },
    list_tables: function (tableSelect) {
        return this.catalog_list('Tables', {
            '$select': (!tableSelect) ? "" : tableSelect,
            '$filter': this.filterClause()
            });
    },
    list_themes: function () {
        return this.catalog_list('Themes', { '$filter': this.filterClause() });
    },
    list_tables_themes: function () {
        return this.catalog_list('Tables_Themes');
    },
    list_featured: function () {
        return this.catalog_list('Featured', { '$filter': this.filterClause() });
    },
    list_table_featured: function () {
        return this.catalog_list('Table_Featured');
    },
    get_codelist: function (table_name, dim_key, d, useFeed) {
        return this.request(false, { 'table': table_name, 'type': dim_key }, d, useFeed);
    },
    get_dataproperties: function (table_name) {
        return this.get_codelist(table_name, 'DataProperties');
    },
    get_tableinfos: function (table_name) {
        return this.get_codelist(table_name, 'TableInfos');
    },
    load_all_data: function (table_name, skip, top, useFeed) {
        return this.get_codelist(table_name, 'TypedDataSet', { "$skip": skip, "$top": top }, useFeed);
    },
    // we voeren een opendata query uit met een skip en top zodat we niet heelveel data ophalen.
    fetch_data_with_skip: function(table_name, typed, filter, select, top, skip)
    {
        var data = {};
        if (filter)
            data['$filter'] = filter;
        if (select)
            data['$select'] = select;
        if (top)
            data['$top'] = top;
        if (skip)
            data['$skip'] = skip;

        Uri.setProperty('tableId', table_name);
        Uri.setProperty('$filter', filter);
        Uri.setProperty('$select', select);
        Uri.setProperty('$top', top);
        Uri.setProperty('$skip', skip);
        
        return this.get_codelist(table_name, (typed ? 'TypedDataSet' : 'UntypedDataSet'), data);
    },
    // we voeren de opendata query uit.
    fetch: function (table_name, typed, data, useFeed) {
        var $data = {};
        if (data.filter)
            $data['$filter'] = data.filter;
        if (data.select)
            $data['$select'] = data.select;
        $data['$top'] = '9999';

        Uri.setProperty('tableId', table_name);
        Uri.setProperty('$filter', data.filter);
        Uri.setProperty('$select', data.select);
        
        return this.get_codelist(table_name, (typed ? 'TypedDataSet' : 'UntypedDataSet'), $data, useFeed);
    },

    //Helper functions
    indexBy: function (dataArray, keyproperty, orderProperty) {
        var index = {};
        var item;
        for (var i = 0; i < dataArray.length; i++) {
            item = dataArray[i];
            if (typeof orderProperty !== "undefined") {
                item[orderProperty] = i;
            }
            index[item[keyproperty]] = item;
        }
        return index;
    },
    // data sorteren op readOrder.
    readOrder: function (a, b) {
        if (a.readOrder > b.readOrder) { return 1 };
        if (a.readOrder < b.readOrder) { return -1 };
        return 0;
    },
    // we loggen messages aan de console.
    log: function (message) {
        if (typeof console !== "undefined") {
            console.log(message);
        }
    }
};

// catalog laden
OData.getCatalog = function (onComplete, tableSelect) {
    //Catalog
    var tables;
    var themes;
    var tables_themes;
    if (typeof (Storage) !== 'undefined' && sessionStorage.getItem('Catalog') !== null) {
        var TempCatalog = JSON.parse(sessionStorage.getItem('Catalog'));
        tables = TempCatalog.Tables;
        themes = TempCatalog.Themes;
        tables_themes = TempCatalog.ThemeTable;

        if (tables && themes && tables_themes) {
            var themeTable = {};
            for (var i in themes) {
                themeTable[themes[i].ID] = [];
            }
            var table_theme;
            for (var i = 0; i < tables_themes.length; i++) {
                table_theme = tables_themes[i];
                // themeTable koppelt over alle catalogi terwijl de tabellen en thema's voor een specifiek catalogus zijn geladen
                if (themeTable[table_theme.ThemeID]) {
                    themeTable[table_theme.ThemeID].push(table_theme);
                }
            }
            catalog = {};
            catalog.ThemeTable = tables_themes;
            catalog.Themes = themes;
            catalog.Tables = tables;
            onComplete(catalog);
            OData.status.getCatalog = 'complete';
        }
    }
    else {
        if (typeof this.catalog != 'undefined') {
            onComplete(this.catalog);
            return;
        }
        if (this.status['getCatalog'] == 'running') { return; }
        this.status.getCatalog = 'running';

        //  Get Tables from Catalog, Get Themes from Catalog, Get Tables_Themes from Catalog
        var promiseGetCatalog = $.when(OData.list_tables(tableSelect), OData.list_themes(), OData.list_tables_themes())
        .done(function (result1, result2, result3) {
            tables = OData.indexBy(result1[0].value, "ID");
            themes = result2[0].value;
            tables_themes = result3[0].value;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            OData.log("Error (" + jqXHR.status + errorThrown + ")");
        });

        // join theme tables nadat de queries zijn uitgevoerd.
        return promiseGetCatalog.then(function () {
            if (tables && themes && tables_themes) {
                var themeTable = {};
                for (var i in themes) {
                    themeTable[themes[i].ID] = [];
                }
                var table_theme;
                for (var i = 0; i < tables_themes.length; i++) {
                    table_theme = tables_themes[i];
                    // themeTable koppelt over alle catalogi terwijl de tabellen en thema's voor een specifiek catalogus zijn geladen
                    if (themeTable[table_theme.ThemeID]) {
                        themeTable[table_theme.ThemeID].push(table_theme);
                    }
                }
                catalog = {};
                catalog.ThemeTable = themeTable;
                catalog.Themes = OData.indexBy(themes, "ID");
                catalog.Tables = tables;
                onComplete(catalog);
                OData.status.getCatalog = 'complete';
            }
        });
    }
};

//Table MetaData ophalen
OData.getTableMeta = function (tableID, onComplete) {
    var tableMeta;
    var dataProperties;
    var tableInfo;

    var promiseGetTableMetaData = $.when(OData.get_dataproperties(tableID), OData.get_tableinfos(tableID))
       .done(function (result1, result2) {
           dataProperties = OData.indexBy(result1[0].value, "ID");
           tableInfo = result2[0].value[0];
       })
       .fail(function (jqXHR, textStatus, errorThrown) {
           OData.log("Error (" + jqXHR.status + errorThrown + ")");
       });
    // samen voegen van alle opgehaalde gegevens en de mappings van GrafiekFuncties / TabelFuncties opbouwen zodat we de layout kunnen aanpassen aan de wensen
    promiseGetTableMetaData.always(function ()
    {
        if (!dataProperties) { dataProperties = {}; }
        if (!tableInfo) { tableInfo = { 'tableId': tableID, 'error': true }; };
        joinTableInfos();
        mappingGrafiekFuncties();
        mappingTableFuncties();
    });

    // we maken een lijstje van huidige TabelFuncties.
    mappingTableFuncties = function () {
        var MappingTableFuncties = {
        };
        if (tableInfo && tableInfo.GraphTypes) {
            // we zorgen er eerst voor dat alle properties aanwezig zijn. Zodat we weten wat er wel en niet mag binnen de app.
            MappingTableFuncties['tabelAlleen'] = false;
            MappingTableFuncties['tableBar'] = false;
            MappingTableFuncties['tableLineBar'] = false;
            MappingTableFuncties['tableMap'] = false;

            var graphTypesArray = tableInfo.GraphTypes.split(',');

            // het gaat hier alleen om een table
            if (graphTypesArray.length == 1 && graphTypesArray[0] == 'Table') {
                MappingTableFuncties['tabelAlleen'] = true;
            } else {
                $.each(graphTypesArray, function (i, obj) {
                    switch (obj) {
                        case 'Bar':
                            // Als we een line hebben dan niets doen.
                            if ($.inArray('Line', graphTypesArray) > -1) {
                                break;
                            }
                            // Anders gaat het om table-bar
                            MappingTableFuncties['tableBar'] = true;
                            break;
                        case 'Line':
                            // Bij line krijgen we de functies van table-line-bar
                            MappingTableFuncties['tableLineBar'] = true;
                            break;
                        case 'Map':
                            // Altijd mag je alles. Dus:
                            MappingTableFuncties['tableMap'] = true;
                            break
                        default: break;
                    }
                });
            }
            tableMeta['MappedTableFuncties'] = MappingTableFuncties;
        }
    }
    // we maken een lijstje van huidige GrafiekFuncties. Zodat we weten wat er wel en niet mag binnen de app.
    mappingGrafiekFuncties = function ()
    {
        var MappingGrafiekFuncties = {
        };
        if (tableInfo && tableInfo.GraphTypes) {
            // we zorgen er eerst voor dat alle properties aanwezig zijn.
            MappingGrafiekFuncties['bar'] = false;
            MappingGrafiekFuncties['barAlleen'] = false;
            MappingGrafiekFuncties['line'] = false;
            MappingGrafiekFuncties['map'] = false;
            MappingGrafiekFuncties['mapAlleen'] = false;

            var graphTypesArray = tableInfo.GraphTypes.split(',');

            $.each(graphTypesArray, function (i, obj) {
                switch (obj) {
                    case 'Table':
                        // Niets deze heeft geen grafiek functies.
                        break;
                    case 'Bar':
                        // Twee verschillende Bar en BarAlleen
                        // Als we een line hebben dan weten we dat het gaat om bar.
                        if ($.inArray('Line', graphTypesArray) > -1) {
                            MappingGrafiekFuncties['bar'] = true;
                            break;
                        }
                        // Anders gaat het om baralleen
                        MappingGrafiekFuncties['barAlleen'] = true;
                        break;
                    case 'Line':
                        // Altijd mag je alles. Dus:
                        MappingGrafiekFuncties['line'] = true;
                        break;
                    case 'Map':

                        if (($.inArray('Line', graphTypesArray) > -1) || ($.inArray('Bar', graphTypesArray) > -1)) {
                            MappingGrafiekFuncties['map'] = true;
                            break;
                        }
                        // Altijd mag je alles. Dus:
                        MappingGrafiekFuncties['mapAlleen'] = true;
                        break
                    default: break;
                }
            });
            tableMeta['MappedGrafiekFuncties'] = MappingGrafiekFuncties;
        }
    }
    // samenvoegen van de tabel informatie.
    joinTableInfos = function () {
        if (tableInfo && dataProperties) {
            tableMeta = tableInfo;
            
            //Get dimensions and topics from dataproperties
            var dimensions = [];
            var topics = [];
            var topicgroups = [];
            var dataproperty;
            for (var datapropertyID in dataProperties) {
                dataproperty = dataProperties[datapropertyID];
                switch (dataproperty.Type) {
                    case 'Dimension':
                        dimensions.push(dataproperty);
                        break;
                    case 'TimeDimension':
                        dimensions.push(dataproperty);
                        tableMeta.TimeDimension = dataproperty;
                        break;
                    case 'GeoDimension':
                        dimensions.push(dataproperty);
                        tableMeta.GeoDimension = dataproperty;
                        dataproperty.geoUnits = [];
                        break;
                    case 'GeoDetail':
                        dimensions.push(dataproperty);
                        tableMeta.GeoDimension = dataproperty;
                        break;
                    case 'Topic':
                        topics.push(dataproperty);
                        break;
                    case 'TopicGroup':
                        topicgroups.push(dataproperty);
                        break;
                }
            }
            tableMeta.DataProperties = dataProperties;
            tableMeta.Dimensions = OData.indexBy(dimensions, "Key");
            //tableMeta.Topics = OData.indexBy(topics, "Position");
            tableMeta.Topics = OData.indexBy(topics, "ID");
            tableMeta.TopicGroups = OData.indexBy(topicgroups, "ID");

            //Fill the categories
            for (var dimensionKey in tableMeta.Dimensions) {
                getCodelist(tableID, dimensionKey, function (dimKey, codelist) {
                    tableMeta.Dimensions[dimKey].Categories_OriginalList = codelist;
                    tableMeta.Dimensions[dimKey].Categories = OData.indexBy(codelist, "Key", "readOrder");
                    switch (tableMeta.Dimensions[dimKey].Type) {
                        case 'GeoDimension':
                            var unqGeoUnits = {};
                            $.each(tableMeta.Dimensions[dimKey].Categories, function (i, cat) {
                                if (cat.Key.match(/^[a-z]{2}[0-9]/i))
                                    unqGeoUnits[cat.Key.substring(0, 2)] = 1;
                            });
                            $.each(unqGeoUnits, function (i, gUnit) { tableMeta.Dimensions[dimKey].geoUnits.push(i); });
                            break;
                    }
                });
            }
            allCategoriesLoaded();
        }
    };

    getCodelist = function (tableID, dimensionKey, onCompleted) {
        var codelist;
        var dimKey = dimensionKey;

        $.when(OData.get_codelist(tableID, dimKey))
        .done(function (result) {
            codelist = result.value;
            onCompleted(dimKey, codelist);
            allCategoriesLoaded();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            OData.log("Error (" + jqXHR.status + errorThrown + ")");
        });
    };
    allCategoriesLoaded = function () {
        var allLoaded = true;
        for (var dimensionKey in tableMeta.Dimensions) {
            allLoaded = allLoaded && (tableMeta.Dimensions[dimensionKey].Categories !== undefined)
        }
        if (allLoaded) {
            onComplete(tableMeta);
        }
    };

    OData.findUnitTopics = function (topics) {
        var uTopics = {};
        $.each(topics, function(i, topic){
            uTopics[topic.Key] = topic;
        });
        OData.Table.Dimensions['Topics'] = {
            'Key': 'Topics',
            'Type': 'Topics',
            'Title': lib.dictionary['Onderwerp'],
            'Categories': uTopics,
            'Filters': []
        }
        $.each(topics, function(i, topic){
            OData.Table.Dimensions['Topics'].Filters.push(topic);
        });
        if (OData.Table.EditDimension && OData.Table.EditDimension.Key && OData.Table.EditDimension.Key == 'Topics') {
            var t = OData.Table.EditDimension;
            OData.Table.EditDimension = OData.Table.Dimensions['Topics'];
            OData.Table.EditDimension.Type = t.Type;
            OData.Table.EditDimension.TypeOrg = t.TypeOrg;
        }
        if (OData.Table.TimeDimension && OData.Table.TimeDimension.Key && OData.Table.TimeDimension.Key == 'Topics') {
            var t = OData.Table.TimeDimension;
            OData.Table.TimeDimension = OData.Table.Dimensions['Topics'];
            OData.Table.TimeDimension.Type = t.Type;
            OData.Table.TimeDimension.TypeOrg = t.TypeOrg;
        }
    };
    OData.createDefaultSelection = function () {
        // Create DefaultSelection
        var defaultSelection = {};
        defaultSelection["topic"] = OData.firstPropertyValue(OData.Table.Topics);
        defaultSelection["dimensions"] = [];
        var graphDimensie;
        for (var dimensieID in OData.Table.Dimensions) {
            var dimensie = OData.Table.Dimensions[dimensieID];
            if (dimensie.Type !== "TimeDimension") {
                var firstCategory = OData.firstPropertyValue(dimensie.Categories);
                var categorySelection = { dimensionID: dimensieID, selectedCategory: firstCategory };
                defaultSelection["dimensions"].push(categorySelection);
                graphDimensie = dimensie; // Make the last dimension the graphDimensie
            }
        }
        // Remove the last dimension
        defaultSelection["dimensions"].pop();
        defaultSelection["graphDimension"] = {
            dimension: graphDimensie,
            selectedCategories: [OData.firstPropertyValue(graphDimensie.Categories)]
        };
        defaultSelection["timeDimension"] = OData.Table.TimeDimension;
        return defaultSelection;
    };
    OData.findTopicGroup = function (id) {
        if ($.isNumeric(id)) {
            return OData.Table.TopicGroups[id];
        }
        return null;
    };
};

//Table ShortDescription et cetera uit MetaData ophalen.
//Vanwege performance wordt de ShortDescription et cetera niet voor alle tabellen opgehaald bij het ophalen van de catalog.
OData.getTableInfosMeta = function (tableID, onComplete) {
    var tableInfosMeta;

    var promiseGetTableMetaDataShortDescription = OData.get_tableinfos(tableID)
       .done(function (tableInfosResult) {
           tableInfosMeta = tableInfosResult.value[0];
           onComplete(tableInfosMeta);
       })
       .fail(function (jqXHR, textStatus, errorThrown) {
           OData.log("Error (" + jqXHR.status + errorThrown + ")");
       });
};