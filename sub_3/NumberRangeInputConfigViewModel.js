define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "../../../widgets/Tips/TipItem"], function (require, exports, tslib_1, decorators_1, Accessor, Handles, TipItem) {
    "use strict";
    var NumberRangeInputConfigViewModel = (function (_super) {
        tslib_1.__extends(NumberRangeInputConfigViewModel, _super);
        function NumberRangeInputConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.isMinMaxInvalid = false;
            _this.isDefaultInvalid = false;
            _this.includeDefaultValInput = false;
            _this._handles = new Handles();
            return _this;
        }
        Object.defineProperty(NumberRangeInputConfigViewModel.prototype, "minValInput", {
            set: function (minInput) {
                this._minValInput = minInput;
                minInput.addEventListener("blur", this._callValidityChecks.bind(this));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NumberRangeInputConfigViewModel.prototype, "maxValInput", {
            set: function (maxInput) {
                this._maxValInput = maxInput;
                maxInput.addEventListener("blur", this._callValidityChecks.bind(this));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NumberRangeInputConfigViewModel.prototype, "defaultInput", {
            set: function (defaultInput) {
                this._defaultInput = defaultInput;
                defaultInput.addEventListener("blur", this._callValidityChecks.bind(this));
            },
            enumerable: false,
            configurable: true
        });
        NumberRangeInputConfigViewModel.prototype.initialize = function () {
            var _this = this;
            this.watch("outputJSON", function () {
                _this.currentMinVal = _this.outputJSON.minimum;
                _this.currentMaxVal = _this.outputJSON.maximum;
                _this.currentDefaultVal = _this.outputJSON.default;
            });
        };
        NumberRangeInputConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        NumberRangeInputConfigViewModel.prototype.generateFullOutputJSON = function (outputToEmit) {
            var newOutput = this.outputJSON == null ? {} : Object.assign({}, this.outputJSON);
            newOutput.maximum = outputToEmit.maximum;
            newOutput.minimum = outputToEmit.minimum;
            if (this.includeDefaultValInput)
                newOutput.default = outputToEmit.default;
            this._set("outputJSON", newOutput);
        };
        NumberRangeInputConfigViewModel.prototype.validityChecks = function (outputToCheck) {
            this._inAbsoluteMinMaxBounds(outputToCheck);
            this._isMinMaxValid(outputToCheck);
            if (this.includeDefaultValInput)
                this._assertDefaultValueInBounds(outputToCheck);
            this._decideIfGenerateOutput(outputToCheck);
        };
        NumberRangeInputConfigViewModel.prototype.calculateMinMax = function (newSelection, map, isFirstCalcWithSavedState) {
            var _this = this;
            var layerId = newSelection.layerId, fieldName = newSelection.fieldName;
            var layer = map.findLayerById(layerId);
            if ((layer === null || layer === void 0 ? void 0 : layer.createQuery) != null && fieldName != null) {
                var minField_1 = fieldName + "_min";
                var maxField_1 = fieldName + "_max";
                var query = layer.createQuery();
                query.outStatistics = [
                    {
                        onStatisticField: fieldName,
                        outStatisticFieldName: minField_1,
                        statisticType: "min"
                    }, {
                        onStatisticField: fieldName,
                        outStatisticFieldName: maxField_1,
                        statisticType: "max"
                    }
                ];
                layer.queryFeatures(query).then(function (response) {
                    var minValue = response.features[0].attributes[minField_1];
                    var maxValue = response.features[0].attributes[maxField_1];
                    _this.absoluteMinVal = minValue;
                    _this.absoluteMaxVal = maxValue;
                    if (!isFirstCalcWithSavedState) {
                        _this.currentDefaultVal = minValue;
                        _this.currentMinVal = minValue;
                        _this.currentMaxVal = maxValue;
                        setTimeout(function () {
                            _this._callValidityChecks();
                        }, 100);
                    }
                });
            }
        };
        NumberRangeInputConfigViewModel.prototype.initTooltips = function (min, max, curr, fieldName, configPanelViewModel) {
            var id = "tooltip-icon-" + fieldName;
            if (min) {
                this.minLabelToolTip = new TipItem({
                    id: id + "-min",
                    fieldName: fieldName + "-min",
                    tip: min,
                    configPanelViewModel: configPanelViewModel
                });
            }
            if (max) {
                this.maxLabelToolTip = new TipItem({
                    id: id + "-max",
                    fieldName: fieldName + "-max",
                    tip: max,
                    configPanelViewModel: configPanelViewModel
                });
            }
            if (curr) {
                this.defaultLabelToolTip = new TipItem({
                    id: id + "-default",
                    fieldName: fieldName + "-default",
                    tip: curr,
                    configPanelViewModel: configPanelViewModel
                });
            }
        };
        NumberRangeInputConfigViewModel.prototype._callValidityChecks = function () {
            var _a, _b, _c;
            this.validityChecks({
                minimum: +((_a = this._minValInput) === null || _a === void 0 ? void 0 : _a.value),
                maximum: +((_b = this._maxValInput) === null || _b === void 0 ? void 0 : _b.value),
                default: +((_c = this._defaultInput) === null || _c === void 0 ? void 0 : _c.value)
            });
        };
        NumberRangeInputConfigViewModel.prototype._inAbsoluteMinMaxBounds = function (outputToCheck) {
            if (outputToCheck.minimum < this.absoluteMinVal) {
                this._minValInput.value = this.absoluteMinVal + "";
                outputToCheck.minimum = this.absoluteMinVal;
            }
            if (outputToCheck.minimum > this.absoluteMaxVal) {
                this._minValInput.value = this.absoluteMaxVal + "";
                outputToCheck.minimum = this.absoluteMaxVal;
            }
            if (outputToCheck.maximum < this.absoluteMinVal) {
                this._maxValInput.value = this.absoluteMinVal + "";
                outputToCheck.maximum = this.absoluteMinVal;
            }
            if (outputToCheck.maximum > this.absoluteMaxVal) {
                this._maxValInput.value = this.absoluteMaxVal + "";
                outputToCheck.maximum = this.absoluteMaxVal;
            }
        };
        NumberRangeInputConfigViewModel.prototype._isMinMaxValid = function (outputToCheck) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (!(outputToCheck.minimum < outputToCheck.maximum)) {
                (_b = (_a = this._minValInput) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add("invalid");
                (_d = (_c = this._maxValInput) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.add("invalid");
                this.isMinMaxInvalid = true;
            }
            else {
                (_f = (_e = this._minValInput) === null || _e === void 0 ? void 0 : _e.classList) === null || _f === void 0 ? void 0 : _f.remove("invalid");
                (_h = (_g = this._maxValInput) === null || _g === void 0 ? void 0 : _g.classList) === null || _h === void 0 ? void 0 : _h.remove("invalid");
                this.isMinMaxInvalid = false;
            }
        };
        NumberRangeInputConfigViewModel.prototype._assertDefaultValueInBounds = function (outputToCheck) {
            var _a, _b, _c, _d;
            if (!this.isMinMaxInvalid &&
                (outputToCheck.minimum > outputToCheck.default ||
                    outputToCheck.maximum < outputToCheck.default)) {
                (_b = (_a = this._defaultInput) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add("invalid");
                this.isDefaultInvalid = true;
            }
            else {
                (_d = (_c = this._defaultInput) === null || _c === void 0 ? void 0 : _c.classList) === null || _d === void 0 ? void 0 : _d.remove("invalid");
                this.isDefaultInvalid = false;
            }
        };
        NumberRangeInputConfigViewModel.prototype._decideIfGenerateOutput = function (outputToEmit) {
            if (!this.isDefaultInvalid && !this.isMinMaxInvalid) {
                this.generateFullOutputJSON(outputToEmit);
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "minValInput", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "maxValInput", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "defaultInput", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "isMinMaxInvalid", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "isDefaultInvalid", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "absoluteMinVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "absoluteMaxVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "includeDefaultValInput", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], NumberRangeInputConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "currentMinVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "currentMaxVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "currentDefaultVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "minLabelToolTip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "maxLabelToolTip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfigViewModel.prototype, "defaultLabelToolTip", void 0);
        NumberRangeInputConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("NumberRangeInputConfigViewModel")
        ], NumberRangeInputConfigViewModel);
        return NumberRangeInputConfigViewModel;
    }(Accessor));
    return NumberRangeInputConfigViewModel;
});
