define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/core/Collection", "./TimeConfigItem", "esri/core/Handles", "esri/TimeExtent", "esri/widgets/TimeSlider/TimeSliderViewModel"], function (require, exports, tslib_1, Accessor, decorators_1, watchUtils_1, Collection, TimeConfigItem, Handles, TimeExtent, TimeSliderViewModel) {
    "use strict";
    var TIME_UNITS = ["years", "months", "weeks", "days"];
    var TimeFilterConfigViewModel = (function (_super) {
        tslib_1.__extends(TimeFilterConfigViewModel, _super);
        function TimeFilterConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._initialMapId = null;
            _this.configPanelViewModel = null;
            _this.timeLayers = new Collection();
            _this.timeConfigItems = new Collection();
            _this.outputJSON = [];
            _this.savedData = null;
            _this.timeSliderViewModel = new TimeSliderViewModel();
            _this.units = TIME_UNITS;
            return _this;
        }
        TimeFilterConfigViewModel.prototype.initialize = function () {
            var _this = this;
            watchUtils_1.whenTrueOnce(this, "configPanelViewModel.isLoadingMap", function () {
                watchUtils_1.whenFalseOnce(_this, "configPanelViewModel.isLoadingMap", function () {
                    _this._initialMapId = _this.configPanelViewModel.map.portalItem.id;
                    var timeLayers = _this._getTimeLayers();
                    _this._createTimeConfigItems(timeLayers);
                    _this.timeLayers.addMany(timeLayers);
                    _this._handles.add(watchUtils_1.watch(_this, "configPanelViewModel.map", function () {
                        watchUtils_1.whenFalseOnce(_this, "configPanelViewModel.isLoadingMap", function () {
                            if (_this._initialMapId !== _this.configPanelViewModel.map.portalItem.id) {
                                _this.timeLayers.removeAll();
                                _this.timeConfigItems.removeAll();
                                _this.savedData = null;
                                _this.outputJSON = null;
                                var timeLayers_1 = _this._getTimeLayers();
                                _this._createTimeConfigItems(timeLayers_1);
                                _this.timeLayers.addMany(timeLayers_1);
                            }
                        });
                    }));
                });
            });
        };
        TimeFilterConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles = null;
        };
        TimeFilterConfigViewModel.prototype.generateDateString = function (timestamp) {
            if (!timestamp) {
                return;
            }
            var dateObj = new Date(timestamp);
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
        };
        TimeFilterConfigViewModel.prototype.updateOutputJSON = function (items) {
            var itemsToUpdate = [];
            items.forEach(function (item) {
                var obj = {
                    id: item.id,
                    increments: item.increments,
                    min: item.min,
                    max: item.max,
                    rangeStart: item.rangeStart,
                    rangeEnd: item.rangeEnd
                };
                itemsToUpdate.push(obj);
            });
            this.set("outputJSON", itemsToUpdate);
        };
        TimeFilterConfigViewModel.prototype._getTimeLayers = function () {
            var allLayers = this.configPanelViewModel.map.allLayers;
            return allLayers.filter(function (layer) { return layer.type === "feature" && layer.get("timeInfo") && layer.get("timeInfo.fullTimeExtent"); });
        };
        TimeFilterConfigViewModel.prototype._createTimeConfigItems = function (timeLayers) {
            var _this = this;
            var items = [];
            timeLayers.forEach(function (timeLayer) {
                var existingTimeConfigItem = _this._getExistingTimeConfigItem(timeLayer);
                if (!existingTimeConfigItem) {
                    var timeConfigItem = _this._createTimeConfigItem(timeLayer);
                    if (!timeConfigItem) {
                        return;
                    }
                    items.push(timeConfigItem);
                }
            });
            var timeConfigItems = this.timeConfigItems;
            this.updateOutputJSON(items);
            timeConfigItems.addMany(items);
        };
        TimeFilterConfigViewModel.prototype._getExistingTimeConfigItem = function (timeLayer) {
            var timeConfigItems = this.timeConfigItems;
            return timeConfigItems.find(function (timeConfigItem) { return timeConfigItem.id === timeLayer.id; });
        };
        TimeFilterConfigViewModel.prototype._createTimeConfigItem = function (timeLayer) {
            var _a;
            if (this.savedData && ((_a = this.savedData) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                var savedDataItem = this.savedData.filter(function (savedDataItem) {
                    return timeLayer.id === savedDataItem.id;
                })[0];
                if (!savedDataItem) {
                    var id = timeLayer.id, timeInfo = timeLayer.timeInfo;
                    if (!(timeInfo === null || timeInfo === void 0 ? void 0 : timeInfo.fullTimeExtent)) {
                        return;
                    }
                    var _b = timeInfo.fullTimeExtent, start = _b.start, end = _b.end;
                    var config_1 = {
                        id: id,
                        min: start,
                        max: end,
                        rangeStart: start,
                        rangeEnd: end,
                        increments: ""
                    };
                    return new TimeConfigItem(config_1);
                }
                var config = {
                    id: savedDataItem.id,
                    min: savedDataItem.min,
                    max: savedDataItem.max,
                    rangeStart: savedDataItem.rangeStart,
                    rangeEnd: savedDataItem.rangeEnd,
                    increments: savedDataItem.increments
                };
                return new TimeConfigItem(config);
            }
            else {
                var id = timeLayer.id, timeInfo = timeLayer.timeInfo;
                if (!(timeInfo === null || timeInfo === void 0 ? void 0 : timeInfo.fullTimeExtent)) {
                    return;
                }
                var _c = timeInfo.fullTimeExtent, start = _c.start, end = _c.end;
                var config = {
                    id: id,
                    min: start,
                    max: end,
                    rangeStart: start,
                    rangeEnd: end,
                    increments: ""
                };
                return new TimeConfigItem(config);
            }
        };
        TimeFilterConfigViewModel.prototype.evaluateEffectiveStops = function (currentTimeItem, unit) {
            var _a;
            if (!currentTimeItem) {
                return;
            }
            var timeSliderViewModel = this.timeSliderViewModel;
            var timeExtent = new TimeExtent({
                start: currentTimeItem.rangeStart,
                end: currentTimeItem.rangeEnd
            });
            this.set("timeSliderViewModel.fullTimeExtent", timeExtent);
            var stopsConfig = {
                interval: {
                    value: 1,
                    unit: unit
                }
            };
            this.set("timeSliderViewModel.stops", stopsConfig);
            return ((_a = timeSliderViewModel === null || timeSliderViewModel === void 0 ? void 0 : timeSliderViewModel.effectiveStops) === null || _a === void 0 ? void 0 : _a.length) > 2 ? true : false;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterConfigViewModel.prototype, "timeLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterConfigViewModel.prototype, "timeConfigItems", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterConfigViewModel.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeFilterConfigViewModel.prototype, "timeSliderViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], TimeFilterConfigViewModel.prototype, "units", void 0);
        TimeFilterConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("TimeFilterConfigViewModel")
        ], TimeFilterConfigViewModel);
        return TimeFilterConfigViewModel;
    }(Accessor));
    return TimeFilterConfigViewModel;
});
