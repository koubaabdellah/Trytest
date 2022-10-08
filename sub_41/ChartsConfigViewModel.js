define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "./ChartItem", "esri/core/Collection", "esri/core/Handles", "esri/core/watchUtils"], function (require, exports, tslib_1, Accessor, decorators_1, ChartItem, Collection, Handles, watchUtils_1) {
    "use strict";
    var ChartsConfigViewModel = (function (_super) {
        tslib_1.__extends(ChartsConfigViewModel, _super);
        function ChartsConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.outputJSON = null;
            _this.savedData = null;
            _this.chartItemsData = {};
            _this.configPanelViewModel = null;
            _this.operationalLayersWithCharts = new Collection();
            _this.chartItemConfigIsOpen = false;
            return _this;
        }
        ChartsConfigViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add([
                watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var map, allLayers, layers, tables, chartItemsData_1, updatedSavedData_1, chartItemsData_2, savedDataJSON_1, err_1;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, 3, 4]);
                                map = this.configPanelViewModel.map;
                                return [4, map.loadAll()];
                            case 1:
                                _a.sent();
                                allLayers = map.allLayers;
                                layers = allLayers
                                    .filter(function (layer) { var _a; return layer.type === "feature" && layer.charts && ((_a = layer === null || layer === void 0 ? void 0 : layer.charts) === null || _a === void 0 ? void 0 : _a.length) > 0; })
                                    .toArray();
                                tables = map.allTables
                                    .filter(function (table) { return table.charts; })
                                    .toArray();
                                this.operationalLayersWithCharts.addMany(tslib_1.__spreadArrays(layers, tables));
                                if (this.savedData) {
                                    chartItemsData_1 = {};
                                    updatedSavedData_1 = {};
                                    this.operationalLayersWithCharts.forEach(function (layer) {
                                        var _a;
                                        if (((_a = layer === null || layer === void 0 ? void 0 : layer.charts) === null || _a === void 0 ? void 0 : _a.length) === 0)
                                            return;
                                        updatedSavedData_1[layer.id] = _this.savedData[layer.id];
                                        var chartDataArrForLayer = updatedSavedData_1[layer.id];
                                        var chartsArr = layer.charts.map(function (chart) {
                                            var existingChart = chartDataArrForLayer === null || chartDataArrForLayer === void 0 ? void 0 : chartDataArrForLayer.filter(function (chartDataItem) { return chartDataItem.id === chart.id; });
                                            var exists = (existingChart === null || existingChart === void 0 ? void 0 : existingChart.length) > 0;
                                            if (exists) {
                                                return existingChart[0];
                                            }
                                            else {
                                                return _this._getChartItem(chart).toJSON();
                                            }
                                        });
                                        updatedSavedData_1[layer.id] = chartsArr;
                                        var savedDataKeys = Object.keys(updatedSavedData_1);
                                        savedDataKeys.forEach(function (key) {
                                            var chartItemsCollection = _this._getChartItemsCollection(updatedSavedData_1[key]);
                                            chartItemsData_1[key] = chartItemsCollection;
                                        });
                                        _this.chartItemsData = chartItemsData_1;
                                        _this.savedData = updatedSavedData_1;
                                        _this.outputJSON = updatedSavedData_1;
                                    });
                                }
                                else {
                                    chartItemsData_2 = {};
                                    savedDataJSON_1 = {};
                                    this.operationalLayersWithCharts.forEach(function (layer) {
                                        var chartItemsCollection = _this._getChartItemsCollection(layer.charts);
                                        if ((chartItemsCollection === null || chartItemsCollection === void 0 ? void 0 : chartItemsCollection.length) > 0) {
                                            chartItemsData_2[layer.id] = chartItemsCollection;
                                            savedDataJSON_1[layer.id] = chartItemsCollection
                                                .toArray()
                                                .map(function (chartItem) { return chartItem.toJSON(); });
                                        }
                                    });
                                    this.chartItemsData = chartItemsData_2;
                                    this.savedData = savedDataJSON_1;
                                }
                                return [3, 4];
                            case 2:
                                err_1 = _a.sent();
                                console.error("ERROR: ", err_1);
                                return [3, 4];
                            case 3:
                                this._handles.add([
                                    watchUtils_1.watch(this, "configPanelViewModel.map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        var map, allLayers, layers, tables, chartItemsData_3, savedDataJSON_2, err_2;
                                        var _this = this;
                                        return tslib_1.__generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!this.configPanelViewModel.map) {
                                                        return [2];
                                                    }
                                                    this.savedData = null;
                                                    this.chartItemsData = {};
                                                    this.operationalLayersWithCharts.removeAll();
                                                    this.chartItemConfigIsOpen = false;
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    map = this.configPanelViewModel.map;
                                                    return [4, map.loadAll()];
                                                case 2:
                                                    _a.sent();
                                                    allLayers = map.allLayers;
                                                    layers = allLayers
                                                        .filter(function (layer) { var _a; return layer.type === "feature" && layer.charts && ((_a = layer === null || layer === void 0 ? void 0 : layer.charts) === null || _a === void 0 ? void 0 : _a.length) > 0; })
                                                        .toArray();
                                                    tables = map.allTables
                                                        .filter(function (table) { var _a; return table.charts && ((_a = table === null || table === void 0 ? void 0 : table.charts) === null || _a === void 0 ? void 0 : _a.length) > 0; })
                                                        .toArray();
                                                    this.operationalLayersWithCharts.addMany(tslib_1.__spreadArrays(layers, tables));
                                                    chartItemsData_3 = {};
                                                    savedDataJSON_2 = {};
                                                    this.operationalLayersWithCharts.forEach(function (layer) {
                                                        var chartItemsCollection = _this._getChartItemsCollection(layer.charts);
                                                        chartItemsData_3[layer.id] = chartItemsCollection;
                                                        savedDataJSON_2[layer.id] = chartItemsCollection
                                                            .toArray()
                                                            .map(function (chartItem) { return chartItem.toJSON(); });
                                                    });
                                                    this.chartItemsData = chartItemsData_3;
                                                    this.savedData = savedDataJSON_2;
                                                    this.outputJSON = savedDataJSON_2;
                                                    return [3, 4];
                                                case 3:
                                                    err_2 = _a.sent();
                                                    console.error("ERROR: ", err_2);
                                                    return [3, 4];
                                                case 4: return [2];
                                            }
                                        });
                                    }); })
                                ]);
                                return [7];
                            case 4: return [2];
                        }
                    });
                }); })
            ]);
        };
        ChartsConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
            this.outputJSON = null;
            this.savedData = null;
            this.chartItemsData = null;
            this.operationalLayersWithCharts.removeAll();
            this.operationalLayersWithCharts.destroy();
            this.operationalLayersWithCharts = null;
        };
        ChartsConfigViewModel.prototype.toJSON = function () {
            var _this = this;
            var outputJSON = {};
            var chartItemsDataKeys = Object.keys(this.chartItemsData);
            chartItemsDataKeys.forEach(function (chartItemDataKey) {
                var chartItemArr = _this.chartItemsData[chartItemDataKey].toArray();
                var chartObjArr = chartItemArr.map(function (chartItem) { return chartItem.toJSON(); });
                outputJSON[chartItemDataKey] = chartObjArr;
            });
            return outputJSON;
        };
        ChartsConfigViewModel.prototype._getChartItemsCollection = function (charts) {
            var _this = this;
            var chartArr = [];
            var chartCollection = new Collection();
            charts.forEach(function (chart) {
                chartArr.push(_this._getChartItem(chart));
            });
            chartCollection.addMany(chartArr);
            return chartCollection;
        };
        ChartsConfigViewModel.prototype._getChartItem = function (chart) {
            var _a, _b;
            var id = chart.id, title = chart.title, visible = chart.visible;
            var titleVal = ((_a = title === null || title === void 0 ? void 0 : title.content) === null || _a === void 0 ? void 0 : _a.text) ? (_b = title === null || title === void 0 ? void 0 : title.content) === null || _b === void 0 ? void 0 : _b.text : title;
            return new ChartItem({
                id: id,
                title: titleVal,
                visible: chart.hasOwnProperty("visible") ? visible : true
            });
        };
        ChartsConfigViewModel.prototype.handleItemSort = function (valueListItems, layerId) {
            var chartItems = this.chartItemsData[layerId];
            var itemsCopy = valueListItems
                .map(function (valueListItem) {
                return chartItems.find(function (item) { return item.id === valueListItem.getAttribute("data-item-id"); });
            })
                .slice();
            chartItems.removeAll();
            chartItems.addMany(itemsCopy);
            var updatedJSON = this.toJSON();
            this.outputJSON = updatedJSON;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfigViewModel.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfigViewModel.prototype, "chartItemsData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfigViewModel.prototype, "operationalLayersWithCharts", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfigViewModel.prototype, "chartItemConfigIsOpen", void 0);
        ChartsConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("ChartsConfigViewModel")
        ], ChartsConfigViewModel);
        return ChartsConfigViewModel;
    }(Accessor));
    return ChartsConfigViewModel;
});
