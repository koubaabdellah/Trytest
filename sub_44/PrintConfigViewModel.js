define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor) {
    "use strict";
    var PrintConfigViewModel = (function (_super) {
        tslib_1.__extends(PrintConfigViewModel, _super);
        function PrintConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.possibleAllowedFormats = [
                "pdf",
                "png32",
                "png8",
                "jpg",
                "gif",
                "eps",
                "svg",
                "svgz",
                "aix"
            ];
            _this.possibleAllowedLayouts = [
                "letter-ansi-a-landscape",
                "a3-landscape",
                "a3-portrait",
                "a4-landscape",
                "a4-portrait",
                "letter-ansi-a-portrait",
                "tabloid-ansi-b-landscape",
                "tabloid-ansi-b-portrait"
            ];
            _this.allowedFormats = "all";
            _this.allowedLayouts = "all";
            _this.outputJSON = {};
            _this.formatsList = [];
            _this.layoutsList = [];
            _this._allowedFormatsMap = new Map();
            _this._allowedLayoutsMap = new Map();
            _this._possibleAllowedLayouts = [
                { value: "letter-ansi-a-landscape", text: "Letter ANSI A landscape" },
                { value: "a3-landscape", text: "A3 landscape" },
                { value: "a3-portrait", text: "A3 portrait" },
                { value: "a4-landscape", text: "A4 landscape" },
                { value: "a4-portrait", text: "A4 portrait" },
                { value: "letter-ansi-a-portrait", text: "Letter ANSI A portrait" },
                { value: "tabloid-ansi-b-landscape", text: "Tabloid ANSI B landscape" },
                { value: "tabloid-ansi-b-portrait", text: "Letter ANSI B portrait" }
            ];
            return _this;
        }
        PrintConfigViewModel.prototype.setupMaps = function () {
            this._initializeMap();
            this._setupFormatsMap();
            this._setupLayoutsMap();
            this._setupLists();
        };
        PrintConfigViewModel.prototype.updateFormatsMap = function (value, isSelected) {
            if (this._allowedFormatsMap.has(value)) {
                this._allowedFormatsMap.set(value, isSelected);
            }
            this._generateOutput();
        };
        PrintConfigViewModel.prototype.updateLayoutsMap = function (value, isSelected) {
            if (this._allowedLayoutsMap.has(value)) {
                this._allowedLayoutsMap.set(value, tslib_1.__assign(tslib_1.__assign({}, this._allowedLayoutsMap.get(value)), { isSelected: isSelected }));
            }
            this._generateOutput();
        };
        PrintConfigViewModel.prototype.handleFormatsList = function (event) {
            var eValue = event.detail.value;
            var selected = event.detail.selected;
            this.updateFormatsMap(eValue, selected);
            var index = this.formatsList.findIndex(function (_a) {
                var value = _a.value;
                return value === eValue;
            });
            if (index > -1) {
                this.formatsList[index].isSelected = selected;
            }
        };
        PrintConfigViewModel.prototype.handleLayoutsList = function (event) {
            var eValue = event.detail.value;
            var selected = event.detail.selected;
            this.updateLayoutsMap(eValue, selected);
            var index = this.layoutsList.findIndex(function (_a) {
                var value = _a.value;
                return value === eValue;
            });
            if (index > -1) {
                this.layoutsList[index].isSelected = selected;
            }
        };
        PrintConfigViewModel.prototype._generateOutput = function () {
            var _allowedFormats = [];
            var _allowedLayouts = [];
            this._allowedFormatsMap.forEach(function (isSelected, format) {
                if (isSelected) {
                    _allowedFormats.push(format);
                }
            });
            this._allowedLayoutsMap.forEach(function (layout, key) {
                if (layout.isSelected) {
                    _allowedLayouts.push(key);
                }
            });
            var newOutput = {
                allowedFormats: _allowedFormats,
                allowedLayouts: _allowedLayouts
            };
            this._set("outputJSON", newOutput);
        };
        PrintConfigViewModel.prototype._initializeMap = function () {
            var _this = this;
            var _tmpLayouts = this._possibleAllowedLayouts.filter(function (layout) {
                return _this.possibleAllowedLayouts.includes(layout.value);
            });
            this.possibleAllowedFormats.map(function (format) { return _this._allowedFormatsMap.set(format, false); });
            _tmpLayouts.map(function (layout) {
                return _this._allowedLayoutsMap.set(layout.value, { text: layout.text, isSelected: false });
            });
        };
        PrintConfigViewModel.prototype._setupFormatsMap = function () {
            var _this = this;
            if (this.allowedFormats === "all" || (this.allowedFormats.length === 1 && this.allowedFormats.includes("all"))) {
                this._allowedFormatsMap.forEach(function (_, key, map) { return map.set(key, true); });
                return;
            }
            if (!Array.isArray(this.allowedFormats)) {
                this.allowedFormats = this.allowedFormats.split(" ");
            }
            this.allowedFormats.map(function (format) { return _this._allowedFormatsMap.set(format, true); });
        };
        PrintConfigViewModel.prototype._setupLayoutsMap = function () {
            var _this = this;
            if (this.allowedLayouts === "all" || (this.allowedLayouts.length === 1 && this.allowedLayouts.includes("all"))) {
                this._allowedLayoutsMap.forEach(function (_, key, map) { return map.set(key, tslib_1.__assign(tslib_1.__assign({}, map.get(key)), { isSelected: true })); });
                return;
            }
            if (!Array.isArray(this.allowedLayouts)) {
                this.allowedLayouts = this.allowedLayouts.split(" ");
            }
            this.allowedLayouts.map(function (layout) {
                return _this._allowedLayoutsMap.set(layout, tslib_1.__assign(tslib_1.__assign({}, _this._allowedLayoutsMap.get(layout)), { isSelected: true }));
            });
        };
        PrintConfigViewModel.prototype._setupLists = function () {
            var _this = this;
            this._allowedFormatsMap.forEach(function (isSelected, key) {
                _this.formatsList.push({ value: key, isSelected: isSelected });
            });
            this._allowedLayoutsMap.forEach(function (allowed, key) {
                _this.layoutsList.push({ value: key, isSelected: allowed.isSelected, text: allowed.text });
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PrintConfigViewModel.prototype, "possibleAllowedFormats", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PrintConfigViewModel.prototype, "possibleAllowedLayouts", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PrintConfigViewModel.prototype, "allowedFormats", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PrintConfigViewModel.prototype, "allowedLayouts", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PrintConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PrintConfigViewModel.prototype, "formatsList", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PrintConfigViewModel.prototype, "layoutsList", void 0);
        PrintConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("PrintConfigViewModel")
        ], PrintConfigViewModel);
        return PrintConfigViewModel;
    }(Accessor));
    return PrintConfigViewModel;
});
