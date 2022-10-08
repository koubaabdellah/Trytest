var Download = window.Download = (function () {
    var _downloadDataGrafischBulk = function (d) {
        d = d || {};

        Spinner.showSpinner();
        var promises = [];
        var dataset = {};
        var rawdata = {};
        var recordcount = OData.Table.RecordCount;
        var top = 999;


        var dfd = $.Deferred();
        var getDataNextLink = function (nextLink) {
            OData.requestNextLink(nextLink)
                .done(function (data, textStatus, jqXHR) {
                    $.extend(dataset, OData.indexBy(data.value, "ID"));
                    if (data['odata.nextLink']) {
                        //repeat recursive calls;
                        promises.push(getDataNextLink(data['odata.nextLink']));
                    } else { dfd.resolve(); };
                })
                .fail(function () { dfd.reject(); });
        };

        promises.push(OData.get_codelist(OData.Table.Identifier, 'TypedDataSet', d, true)
            .done(function (data, textStatus, jqXHR) {
                $.extend(dataset, OData.indexBy(data.value, "ID"));
                if (data['odata.nextLink']) {
                    //start recursive calls;
                    promises.push(getDataNextLink(data['odata.nextLink']));
                } else { dfd.resolve(); }
            })
            .fail(function () { dfd.reject(); }));

        $.when(dfd.promise())
            .then(function () {
                var data = [];
                var datapair = [];
                var buildHeader = true;
                var fileExtension = '.csv';
                if (d && d['$format'] == 'json') {
                    var dataresult = JSON.stringify({ 'value': dataset });
                    data.push(dataresult);
                    fileExtension = '.json';

                }
                else {
                    $.each(dataset, function (i, t) {
                        var dataRow = [];
                        var headerRow = [];
                        $.each(t, function (i2, t2) {
                            headerRow.push(settings.excel_string(i2.toString()));
                            if (typeof t2 != 'object' && typeof t2 != 'function' && typeof t2 != 'undefined') {
                                dataRow.push(settings.excel_string(t2.toString()));
                            } else { dataRow.push(''); }
                        });
                        if (buildHeader) { datapair.push(headerRow); buildHeader = false; }
                        datapair.push(dataRow);
                    });
                    $.each(datapair, function (i, t) { data.push(t.join(settings.excel_seperator()) + settings.excel_newline()); });
                    fileExtension = '.csv';
                }
                if (data.length > 0) {
                    function toNrCharLength(nr, length) { return ("000000000000" + nr).split('').reverse().join('').substring(0, length).split('').reverse().join(''); }
                    var currDate = new Date();
                    var dStr = toNrCharLength(currDate.getDate(), 2) + toNrCharLength(currDate.getMonth() + 1, 2) + toNrCharLength(currDate.getFullYear(), 4) + '_' + toNrCharLength(currDate.getHours(), 2) + toNrCharLength(currDate.getMinutes(), 2) + toNrCharLength(currDate.getSeconds(), 2);

                    var blob = new Blob(["\ufeff", data.join('')], { type: 'text/plain;charset=utf-8' });
                    saveAs(blob, OData.Table.Identifier + '_TypedDataSet' + '_' + dStr + fileExtension);
                }
                Spinner.hideSpinner();
            });

    };

    var _downloadDataDatasetBulk = function (d) {
        d = d || {};

        Spinner.showSpinner();
        var promises = [];
        var dataset = {};
        var rawdata = {};
        var recordcount = OData.Table.RecordCount;
        var top = 999;

        var dfd = $.Deferred();
        var getDataNextLink = function (nextLink) {
            OData.requestNextLink(nextLink)
                .done(function (data, textStatus, jqXHR) {
                    $.extend(dataset, OData.indexBy(data.value, "ID"));
                    if (data['odata.nextLink']) {
                        //repeat recursive calls;
                        promises.push(getDataNextLink(data['odata.nextLink']));
                    } else { dfd.resolve(); };
                })
                .fail(function () { dfd.reject(); });
        };

        promises.push(OData.get_codelist(OData.Table.Identifier, 'UntypedDataSet', d, true)
            .done(function (data, textStatus, jqXHR) {
                $.extend(dataset, OData.indexBy(data.value, "ID"));
                if (data['odata.nextLink']) {
                    //start recursive calls;
                    promises.push(getDataNextLink(data['odata.nextLink']));
                } else { dfd.resolve(); }
            })
            .fail(function () { dfd.reject(); }));

        $.when(dfd.promise())
            .then(function () {
                var data = [];
                var datapair = [];
                var buildHeader = true;
                var fileExtension = '.csv';
                if (d && d['$format'] == 'json') {
                    data.push(JSON.stringify({ 'value': dataset }));
                    fileExtension = '.json';
                }
                else {
                    $.each(dataset, function (i, t) {
                        var dataRow = [];
                        var headerRow = [];
                        $.each(t, function (i2, t2) {
                            headerRow.push(settings.excel_string(i2.toString()));
                            if (typeof t2 != 'object' && typeof t2 != 'function' && typeof t2 != 'undefined') {
                                dataRow.push(settings.excel_string(t2.toString()));
                            } else { dataRow.push(''); }
                        });
                        if (buildHeader) { datapair.push(headerRow); buildHeader = false; }
                        datapair.push(dataRow);
                    });
                    $.each(datapair, function (i, t) { data.push(t.join(settings.excel_seperator()) + settings.excel_newline()); });
                    fileExtension = '.csv';
                }
                if (data.length > 0) {
                    function toNrCharLength(nr, length) { return ("000000000000" + nr).split('').reverse().join('').substring(0, length).split('').reverse().join(''); }
                    var currDate = new Date();
                    var dStr = toNrCharLength(currDate.getDate(), 2) + toNrCharLength(currDate.getMonth() + 1, 2) + toNrCharLength(currDate.getFullYear(), 4) + '_' + toNrCharLength(currDate.getHours(), 2) + toNrCharLength(currDate.getMinutes(), 2) + toNrCharLength(currDate.getSeconds(), 2);

                    var blob = new Blob(["\ufeff", data.join('')], { type: 'text/plain;charset=utf-8' });
                    saveAs(blob, OData.Table.Identifier + '_UntypedDataSet' + '_' + dStr + fileExtension);
                }
                Spinner.hideSpinner();
            });

    };

    var _downloadDataGrafisch = function () {
        var top = 9999;
        var recordcount = OData.Table.RecordCount;
        var promises = [];
        var dataset = {};
        for (var i = 0; i < Math.ceil(recordcount / top); i++) {
            promises.push(OData.load_all_data(OData.Table.Identifier, i * top, top)
                .done(function (data, textStatus, jqXHR) {
                    $.extend(dataset, OData.indexBy(data.value, "ID"));
                }));
        }
        Spinner.showSpinner();
        $.when.apply($, promises)
            .then(function () {
                var data = [];
                var datapair = [];
                var buildHeader = true;
                $.each(dataset, function (i, t) {
                    var dataRow = [];
                    var headerRow = [];
                    $.each(t, function (i2, t2) {
                        headerRow.push(settings.excel_string(i2.toString()));
                        if (typeof t2 != 'object' && typeof t2 != 'function' && typeof t2 != 'undefined') {
                            dataRow.push(settings.excel_string(t2.toString()));
                        } else { dataRow.push(''); }
                    });
                    if (buildHeader) { datapair.push(headerRow); buildHeader = false; }
                    datapair.push(dataRow);
                });
                $.each(datapair, function (i, t) { data.push(t.join(settings.excel_seperator()) + settings.excel_newline()); });

                if (data.length > 0) {
                    var blob = new Blob(["\ufeff", data.join('')], { type: 'text/plain;charset=utf-8' });
                    saveAs(blob, OData.Table.Identifier + '_' + dStr + '_TypedDataSet.csv');
                }
                Spinner.hideSpinner();
            });
    };

    var _downloadDataDataset = function () {
        var top = 9999;
        var recordcount = OData.Table.RecordCount;
        var promises = [];
        var dataset = {};
        for (var i = 0; i < Math.ceil(recordcount / top); i++) {
            promises.push(OData.load_all_data(OData.Table.Identifier, i * top, top)
                .done(function (data, textStatus, jqXHR) {
                    $.extend(dataset, OData.indexBy(data.value, "ID"));
                }));
        }

        Spinner.showSpinner();
        $.when.apply($, promises)
            .then(function () {
                var data = [];
                var datapair = [];
                var buildHeader = true;
                $.each(dataset, function (i, t) {
                    var dataRow = [];
                    var headerRow = [];
                    $.each(t, function (i2, t2) {
                        headerRow.push(settings.excel_string(i2.toString()));
                        if (typeof t2 != 'object' && typeof t2 != 'function' && typeof t2 != 'undefined') {
                            dataRow.push(settings.excel_string(t2.toString()));
                        } else { dataRow.push(''); }
                    });
                    if (buildHeader) { datapair.push(headerRow); buildHeader = false; }
                    datapair.push(dataRow);
                });
                $.each(datapair, function (i, t) { data.push(t.join(settings.excel_seperator()) + settings.excel_newline()); });

                if (data.length > 0) {
                    var blob = new Blob(["\ufeff", data.join('')], { type: 'text/plain;charset=utf-8' });
                    saveAs(blob, OData.Table.Identifier + '_UntypedDataSet.csv');
                }
                Spinner.hideSpinner();
            });
    };

    return {
        DownloadDataGrafischBulk: _downloadDataGrafischBulk,
        DownloadDataDatasetBulk: _downloadDataDatasetBulk,
        DownloadDataGrafisch: _downloadDataGrafisch,
        DownloadDataDataset: _downloadDataDataset
    };
})();