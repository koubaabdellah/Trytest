// todo hernoemen naar repository of zo.
var ODataRepository = window.ODataRepository = (function () {

    // load themes
    var _loadTable = function (tableIdentifier, options, continuation) {
        var table = null;
        OData.Theme = null;
        $.each(OData.Catalog.Tables, function (i, t) { if (t.Identifier === tableIdentifier) { table = t; } });
        if (options && options['_theme']) {
            OData.Theme = OData.Catalog.Themes[options['_theme']];
        } else {
            $.each(OData.Catalog.Themes, function (i, t) {
                $.each(OData.Catalog.ThemeTable[t.ID], function (i2, t2) {
                    if (OData.Catalog.Tables[t2.TableID] === table) { OData.Theme = t; }
                });
            });
        }
        Layout.setPortalTableLayout(table, continuation, options);
    };

    // load table metadata
    var _loadTableMetadata = function (tableIdentifier, oncomplete) {
        if (OData.Metadata && (OData.Metadata.Identifier == tableIdentifier)) {
            if (typeof oncomplete == 'function')
                oncomplete(OData.Metadata);
        } else {
            OData.getTableMeta(tableIdentifier, function (tableMeta) {
                OData.Metadata = tableMeta;
                if (typeof oncomplete == 'function')
                    oncomplete(tableMeta);
            });
        }
    };

    // load the catalog
    var _getCatalog = function (oncomplete) {
        OData.getCatalog(function (catalog) {
            OData.Catalog = catalog;

            // create the theme tree.
            ThemeTable.SetThemeTableList();
            if (typeof oncomplete === 'function')
                oncomplete();
        },
            (default_settings.use_offline_search === true)
                ? "ID,Identifier,Title,ShortTitle,Modified,Language,RecordCount,ColumnCount,ShortDescription,Summary,Period,ReasonDelivery"
                : "ID,Identifier,Title,ShortTitle,Modified,Language,RecordCount,ColumnCount,Summary,Period,ReasonDelivery"
        );
    };

    var _getTableInfosMeta = function (oncomplete) {
        OData.getTableInfosMeta(OData.Table.Identifier, function (tableInfosMeta) {
            OData.Table.ShortDescription = tableInfosMeta.ShortDescription;
            OData.Table.MetaDataModified = tableInfosMeta.MetaDataModified;
            OData.Table.Frequency = tableInfosMeta.Frequency;
            OData.Table.OutputStatus = tableInfosMeta.OutputStatus;

            if (typeof oncomplete === 'function')
                oncomplete();
        });
    };

    return {
        loadTable: _loadTable,
        loadTableMetadata: _loadTableMetadata,
        getCatalog: _getCatalog,
        getTableInfosMeta: _getTableInfosMeta
    }
    
})();