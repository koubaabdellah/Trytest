define(["require", "exports", "tslib", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "../BaseComponent", "../TimeFilterConfig/TimeFilterConfig/TimeFilterConfigViewModel", "../../utils/focusUtils"], function (require, exports, tslib_1, widget_1, decorators_1, watchUtils_1, BaseComponent, TimeFilterConfigViewModel, focusUtils_1) {
    "use strict";
    var base = "esri-time-filter-config";
    var CSS = {
        base: base,
        selectDropdown: base + "__select-dropdown",
        headerText: base + "__header-text"
    };
    var TimeFilterConfig = (function (_super) {
        tslib_1.__extends(TimeFilterConfig, _super);
        function TimeFilterConfig(params) {
            var _this = _super.call(this, params) || this;
            _this._currentLayer = null;
            _this._currentTimeConfigItem = null;
            _this._availableIncrements = [];
            _this.configPanelViewModel = null;
            _this.savedData = null;
            _this.outputJSON = null;
            _this.messages = null;
            _this.viewModel = new TimeFilterConfigViewModel();
            return _this;
        }
        TimeFilterConfig.prototype.postInitialize = function () {
            this._initCurrentItems();
        };
        TimeFilterConfig.prototype.render = function () {
            var _a;
            var header = this._renderHeader();
            var layerSelector = this._renderLayerSelector();
            var unitSelector = this._renderUnitSelector();
            var startInputDatePicker = this._renderStartCalciteInputDatePicker();
            var endInputDatePicker = this._renderEndCalciteInputDatePicker();
            var length = this.viewModel.timeLayers.length;
            return (widget_1.tsx("div", { class: CSS.base },
                length === 0 ? widget_1.tsx("div", null, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.noTimeEnabledLayers) : null,
                length > 0 ? layerSelector : null,
                length > 0 ? startInputDatePicker : null,
                length > 0 ? endInputDatePicker : null,
                length > 0 ? unitSelector : null));
        };
        TimeFilterConfig.prototype._renderHeader = function () {
            var _a;
            var tipIcon = (_a = this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("span", { class: CSS.headerText },
                this.messages.header,
                tipIcon));
        };
        TimeFilterConfig.prototype._renderLayerSelector = function () {
            var layerOptions = this._renderLayerOptions();
            var timeLayerCollection = this.get("viewModel.timeLayers");
            return (widget_1.tsx("label", { key: "time-filter-layer-selector-label" },
                this.messages.selectLayer,
                widget_1.tsx("select", { bind: this, onchange: this._handleLayerSelector, class: CSS.selectDropdown, disabled: (timeLayerCollection === null || timeLayerCollection === void 0 ? void 0 : timeLayerCollection.length) < 2 ? true : false }, layerOptions)));
        };
        TimeFilterConfig.prototype._renderLayerOptions = function () {
            var timeLayerCollection = this.get("viewModel.timeLayers");
            return timeLayerCollection.toArray().map(function (timeLayer) {
                var id = timeLayer.id, title = timeLayer.title;
                return widget_1.tsx("option", { value: id }, title);
            });
        };
        TimeFilterConfig.prototype._renderUnitSelector = function () {
            var unitOptions = this._renderUnitOptions();
            return (widget_1.tsx("label", null,
                this.messages.timeLineIncrements,
                widget_1.tsx("select", { bind: this, onchange: this._updateIncrementUnit, onkeydown: function (e) {
                        focusUtils_1.handleFocusElFromSettingsPanel(e);
                    }, class: CSS.selectDropdown, disabled: unitOptions.length < 2 ? true : false, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }, unitOptions)));
        };
        TimeFilterConfig.prototype._renderUnitOptions = function () {
            var _this = this;
            var units = this.viewModel.units;
            var increments = this._getIncrements(units);
            this._availableIncrements = increments;
            return this._availableIncrements.map(function (unit) {
                var _a;
                return (widget_1.tsx("option", { key: "unit-" + unit, value: unit, selected: unit === ((_a = _this._currentTimeConfigItem) === null || _a === void 0 ? void 0 : _a.increments) ? true : false }, _this.messages.units[unit]));
            });
        };
        TimeFilterConfig.prototype._renderStartCalciteInputDatePicker = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var value = this._currentTimeConfigItem
                ? this.viewModel.generateDateString((_a = this._currentTimeConfigItem) === null || _a === void 0 ? void 0 : _a.rangeStart)
                : this.viewModel.generateDateString((_b = this._currentTimeConfigItem) === null || _b === void 0 ? void 0 : _b.min);
            var minVal = this.viewModel.generateDateString((_c = this._currentTimeConfigItem) === null || _c === void 0 ? void 0 : _c.min);
            var maxVal = this.viewModel.generateDateString((_d = this._currentTimeConfigItem) === null || _d === void 0 ? void 0 : _d.max);
            return (widget_1.tsx("label", null,
                this.messages.startDate,
                widget_1.tsx("calcite-input-date-picker", { bind: this, value: value, min: minVal, max: maxVal, afterCreate: function (e) {
                        _this._calciteInputDatePickerWatcher(e);
                    }, "date-input-type": "start" })));
        };
        TimeFilterConfig.prototype._renderEndCalciteInputDatePicker = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var value = this._currentTimeConfigItem
                ? this.viewModel.generateDateString((_a = this._currentTimeConfigItem) === null || _a === void 0 ? void 0 : _a.rangeEnd)
                : this.viewModel.generateDateString((_b = this._currentTimeConfigItem) === null || _b === void 0 ? void 0 : _b.min);
            var minVal = this.viewModel.generateDateString((_c = this._currentTimeConfigItem) === null || _c === void 0 ? void 0 : _c.min);
            var maxVal = this.viewModel.generateDateString((_d = this._currentTimeConfigItem) === null || _d === void 0 ? void 0 : _d.max);
            return (widget_1.tsx("label", null,
                this.messages.endDate,
                widget_1.tsx("calcite-input-date-picker", { value: value, min: minVal, max: maxVal, afterCreate: function (e) {
                        _this._calciteInputDatePickerWatcher(e);
                    }, "date-input-type": "end" })));
        };
        TimeFilterConfig.prototype._initCurrentItems = function () {
            var _this = this;
            return watchUtils_1.whenOnce(this, "viewModel.timeLayers.length", function () {
                if (!_this._currentLayer) {
                    var _a = _this.viewModel, timeLayers = _a.timeLayers, timeConfigItems = _a.timeConfigItems;
                    _this._currentLayer = timeLayers.getItemAt(0);
                    _this._currentTimeConfigItem = timeConfigItems.getItemAt(0);
                }
                _this.own(watchUtils_1.on(_this, "viewModel.timeLayers", "change", function () {
                    var _a = _this.viewModel, timeLayers = _a.timeLayers, timeConfigItems = _a.timeConfigItems;
                    _this._currentLayer = timeLayers.getItemAt(0);
                    _this._currentTimeConfigItem = timeConfigItems.getItemAt(0);
                }));
            });
        };
        TimeFilterConfig.prototype._calciteInputDatePickerWatcher = function (element) {
            var _this = this;
            var type = element.getAttribute("date-input-type");
            element.addEventListener("calciteDatePickerChange", function (e) {
                var detail = e.detail;
                var viewModel = _this.viewModel;
                var timeConfigItems = viewModel.timeConfigItems;
                var timeConfigItem = timeConfigItems.find(function (timeConfigItem) { return timeConfigItem.id === _this._currentTimeConfigItem.id; });
                if (type === "start") {
                    timeConfigItem.set("rangeStart", detail);
                }
                else {
                    timeConfigItem.set("rangeEnd", detail);
                }
                if (_this._availableIncrements.indexOf(_this._currentTimeConfigItem.increments) === -1) {
                    if (_this._availableIncrements[0]) {
                        timeConfigItem.set("increments", _this._availableIncrements[0]);
                    }
                    else {
                        var layer = _this.viewModel.timeLayers.find(function (layer) { return layer.id === _this._currentTimeConfigItem.id; });
                        timeConfigItem.set("increments", layer.timeInfo.interval.unit);
                    }
                }
                _this.viewModel.updateOutputJSON(_this.viewModel.timeConfigItems.toArray());
            });
        };
        TimeFilterConfig.prototype._updateIncrementUnit = function (e) {
            var _this = this;
            var node = e.target;
            var options = node.options, selectedIndex = node.selectedIndex;
            var selected = options[selectedIndex];
            var value = selected.value;
            var timeConfigItems = this.viewModel.timeConfigItems;
            var timeConfigItem = timeConfigItems.find(function (timeConfigItem) { return timeConfigItem.id === _this._currentTimeConfigItem.id; });
            timeConfigItem.set("increments", value);
            this.viewModel.updateOutputJSON(this.viewModel.timeConfigItems.toArray());
        };
        TimeFilterConfig.prototype._handleLayerSelector = function (e) {
            var node = e.target;
            var options = node.options, selectedIndex = node.selectedIndex;
            var selected = options[selectedIndex];
            var value = selected.value;
            var _a = this.viewModel, timeConfigItems = _a.timeConfigItems, timeLayers = _a.timeLayers;
            var timeConfigItem = timeConfigItems.find(function (timeConfigItem) { return timeConfigItem.id === value; });
            var timeLayer = timeLayers.find(function (timeLayer) {
                return timeLayer.id === value;
            });
            this._currentLayer = timeLayer;
            this._currentTimeConfigItem = timeConfigItem;
        };
        TimeFilterConfig.prototype._getIncrements = function (units) {
            var _this = this;
            return units.filter(function (unit) {
                return _this.viewModel.evaluateEffectiveStops(_this._currentTimeConfigItem, unit);
            });
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], TimeFilterConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.savedData")
        ], TimeFilterConfig.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], TimeFilterConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/TimeFilterConfig/resources")
        ], TimeFilterConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: TimeFilterConfigViewModel
            })
        ], TimeFilterConfig.prototype, "viewModel", void 0);
        TimeFilterConfig = tslib_1.__decorate([
            decorators_1.subclass("TimeFilterConfig")
        ], TimeFilterConfig);
        return TimeFilterConfig;
    }(BaseComponent));
    return TimeFilterConfig;
});
