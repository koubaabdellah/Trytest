define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "../../icons/icons", "./NumberRangeInputConfig/NumberRangeInputConfigViewModel"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, icons, NumberRangeInputConfigViewModel) {
    "use strict";
    var CSS = {
        base: "esri-num-range-config",
        header: "esri-num-range-config__header",
        body: "esri-num-range-config__body",
        input: "esri-num-range-config__input",
        inputLabel: "esri-num-range-config__input-label"
    };
    var NumberRangeInputConfig = (function (_super) {
        tslib_1.__extends(NumberRangeInputConfig, _super);
        function NumberRangeInputConfig(values) {
            var _this = _super.call(this, values) || this;
            _this.outputJSON = {};
            _this.viewModel = new NumberRangeInputConfigViewModel();
            return _this;
        }
        NumberRangeInputConfig.prototype.postInitialize = function () {
            var _this = this;
            this.viewModel.includeDefaultValInput = this.includeDefaultValInput;
            if (this.savedState == null) {
                setTimeout(function () {
                    _this.viewModel.validityChecks({
                        minimum: _this.defaultMinVal,
                        maximum: _this.defaultMaxVal,
                        default: _this.defaultDefaultVal
                    });
                }, 0);
            }
            else {
                this.defaultMinVal = this.savedState.minimum;
                this.defaultMaxVal = this.savedState.maximum;
                this.defaultDefaultVal = this.savedState.default;
            }
            if (this.layerAndFieldSelectorToWatch) {
                var isFirstCalcWithSavedState_1 = this.savedState != null;
                this.watch("newValFromLayerSelector", function () {
                    _this.viewModel.calculateMinMax(_this.newValFromLayerSelector, _this.configPanelViewModel.map, isFirstCalcWithSavedState_1);
                    if (isFirstCalcWithSavedState_1) {
                        isFirstCalcWithSavedState_1 = false;
                    }
                });
            }
            this.viewModel.initTooltips(this.minLabelToolTip, this.maxLabelToolTip, this.defaultLabelToolTip, this.fieldName, this.configPanelViewModel);
        };
        NumberRangeInputConfig.prototype.render = function () {
            var _a;
            var widgetInfoToolTip = (_a = this === null || this === void 0 ? void 0 : this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("div", { class: CSS.base },
                this.label || widgetInfoToolTip ?
                    (widget_1.tsx("div", { class: CSS.header },
                        widget_1.tsx("div", null,
                            this.label,
                            widget_1.tsx("span", null, widgetInfoToolTip)))) :
                    null,
                widget_1.tsx("div", { class: CSS.body },
                    this._renderMinInput(),
                    this._renderMaxInput(),
                    this.includeDefaultValInput ? this._renderDefaultInput() : null)));
        };
        NumberRangeInputConfig.prototype._renderMinInput = function () {
            var _a, _b;
            var _c = this.NumberRangeMessages, minimumValInputLabel = _c.minimumValInputLabel, maximumValInputLabel = _c.maximumValInputLabel, minimumValInvalidMsg = _c.minimumValInvalidMsg;
            var minLabel = this.minLabel != null ? this.minLabel : minimumValInputLabel;
            var maxLabel = this.maxLabel != null ? this.maxLabel : maximumValInputLabel;
            var inputId = "minValInput";
            return (widget_1.tsx("div", { class: CSS.input },
                widget_1.tsx("label", { for: inputId, class: CSS.inputLabel, styles: { "color": this._decideValidity(this.isMinMaxInvalid) === "invalid" ? "red" : null } },
                    minLabel, (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.minLabelToolTip) === null || _b === void 0 ? void 0 :
                    _b.renderTipCalciteIcon()),
                widget_1.tsx("input", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": inputId, placeholder: minimumValInputLabel, type: "number", name: inputId, scale: "m", min: "" + this.absoluteMinVal, max: "" + this.absoluteMaxVal, value: this.viewModel.currentMinVal != null
                        ? this.viewModel.currentMinVal
                        : this.defaultMinVal != null
                            ? +this.defaultMinVal
                            : null }),
                widget_1.tsx("calcite-input-message", { status: "invalid", styles: { "display": this.isMinMaxInvalid ? "block" : "none" }, icon: icons.exclamationMarkTriangle, active: this.isMinMaxInvalid }, "\"" + minLabel + "\" " + minimumValInvalidMsg + " \"" + maxLabel + "\"")));
        };
        NumberRangeInputConfig.prototype._renderMaxInput = function () {
            var _a, _b;
            var _c = this.NumberRangeMessages, minimumValInputLabel = _c.minimumValInputLabel, maximumValInputLabel = _c.maximumValInputLabel, maximumValInvalidMsg = _c.maximumValInvalidMsg;
            var minLabel = this.minLabel != null ? this.minLabel : minimumValInputLabel;
            var maxLabel = this.maxLabel != null ? this.maxLabel : maximumValInputLabel;
            var inputId = "maxValInput";
            return (widget_1.tsx("div", { class: CSS.input },
                widget_1.tsx("label", { for: inputId, class: CSS.inputLabel, styles: { "color": this._decideValidity(this.isMinMaxInvalid) === "invalid" ? "red" : null } },
                    maxLabel, (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.maxLabelToolTip) === null || _b === void 0 ? void 0 :
                    _b.renderTipCalciteIcon()),
                widget_1.tsx("input", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": inputId, placeholder: maximumValInputLabel, type: "number", name: inputId, scale: "m", min: "" + this.absoluteMinVal, max: "" + this.absoluteMaxVal, value: this.viewModel.currentMaxVal != null
                        ? this.viewModel.currentMaxVal
                        : this.defaultMaxVal != null
                            ? +this.defaultMaxVal
                            : null }),
                widget_1.tsx("calcite-input-message", { status: "invalid", styles: { "display": this.isMinMaxInvalid ? "block" : "none" }, icon: icons.exclamationMarkTriangle, active: this.isMinMaxInvalid }, "\"" + maxLabel + "\" " + maximumValInvalidMsg + " \"" + minLabel + "\"")));
        };
        NumberRangeInputConfig.prototype._renderDefaultInput = function () {
            var _a, _b;
            var _c = this.NumberRangeMessages, defaultValInputLabel = _c.defaultValInputLabel, defaultValInvalidMsg = _c.defaultValInvalidMsg;
            var label = this.defaultLabel != null ? this.defaultLabel : defaultValInputLabel;
            var inputId = "defaultInput";
            return (widget_1.tsx("div", { class: CSS.input },
                widget_1.tsx("label", { for: inputId, class: CSS.inputLabel, styles: { "color": this._decideValidity(this.isDefaultInvalid) === "invalid" ? "red" : null } },
                    label, (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.defaultLabelToolTip) === null || _b === void 0 ? void 0 :
                    _b.renderTipCalciteIcon()),
                widget_1.tsx("input", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "defaultInput", placeholder: defaultValInputLabel, type: "number", name: inputId, scale: "m", min: "" + this.absoluteMinVal, max: "" + this.absoluteMaxVal, value: this.viewModel.currentDefaultVal != null
                        ? this.viewModel.currentDefaultVal
                        : this.defaultDefaultVal != null
                            ? +this.defaultDefaultVal
                            : null }),
                widget_1.tsx("calcite-input-message", { status: "invalid", styles: { "display": this.isDefaultInvalid ? "block" : "none" }, icon: icons.exclamationMarkTriangle, active: this.isDefaultInvalid }, defaultValInvalidMsg)));
        };
        NumberRangeInputConfig.prototype._decideValidity = function (isInvalid) {
            return isInvalid ? "invalid" : "valid";
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "defaultMinVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "defaultMaxVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "defaultDefaultVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "minLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "maxLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "defaultLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "minLabelToolTip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "maxLabelToolTip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "defaultLabelToolTip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.absoluteMinVal")
        ], NumberRangeInputConfig.prototype, "absoluteMinVal", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.absoluteMaxVal")
        ], NumberRangeInputConfig.prototype, "absoluteMaxVal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "includeDefaultValInput", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "label", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "layerAndFieldSelectorToWatch", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "newValFromLayerSelector", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            }),
            decorators_1.aliasOf("viewModel.outputJSON")
        ], NumberRangeInputConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NumberRangeInputConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/NumberRangeInputConfig/resources")
        ], NumberRangeInputConfig.prototype, "NumberRangeMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.minValInput")
        ], NumberRangeInputConfig.prototype, "minValInput", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.maxValInput")
        ], NumberRangeInputConfig.prototype, "maxValInput", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.defaultInput")
        ], NumberRangeInputConfig.prototype, "defaultInput", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isMinMaxInvalid")
        ], NumberRangeInputConfig.prototype, "isMinMaxInvalid", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isDefaultInvalid")
        ], NumberRangeInputConfig.prototype, "isDefaultInvalid", void 0);
        NumberRangeInputConfig = tslib_1.__decorate([
            decorators_1.subclass("NumberRangeInputConfig")
        ], NumberRangeInputConfig);
        return NumberRangeInputConfig;
    }(BaseComponent));
    return NumberRangeInputConfig;
});
