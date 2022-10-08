define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/widgets/ScaleRangeSlider", "esri/core/Handles", "esri/core/watchUtils", "dojo/on"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, ScaleRangeSlider, Handles, watchUtils_1, on) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CSS = {
        recommendations: "extent-recommendations",
        expandOptionsTitle: "extent-recommendations__title",
        recommendationsHeading: "extent-recommendations__heading",
        recommendedExtent: "extent-picker-recommended",
        drawSection: "draw-section",
        drawSectionTools: "draw-section__tools",
        preventMapRotation: "rotation-section__prevent-rotation",
        rotationValidationMsg: "rotation-section__rotation-input-validation"
    };
    var ExtentOptions = (function (_super) {
        tslib_1.__extends(ExtentOptions, _super);
        function ExtentOptions(vals) {
            var _this = _super.call(this, vals) || this;
            _this.unconnectedOutput = {};
            _this._handles = new Handles();
            return _this;
        }
        ExtentOptions.prototype.postInitialize = function () {
            var _a, _b, _c, _d;
            this._setupScaleRange();
            this._watchViewHeight();
            this.unconnectedOutput.minScale = (_b = (_a = this === null || this === void 0 ? void 0 : this.savedConstraints) === null || _a === void 0 ? void 0 : _a.minScale) !== null && _b !== void 0 ? _b : this.viewModel.MIN_SCALE_DEFAULT;
            this.unconnectedOutput.maxScale = (_d = (_c = this === null || this === void 0 ? void 0 : this.savedConstraints) === null || _c === void 0 ? void 0 : _c.maxScale) !== null && _d !== void 0 ? _d : this.viewModel.MAX_SCALE_DEFAULT;
        };
        ExtentOptions.prototype.render = function () {
            var scaleSection = this._renderScaleSection();
            var drawSection = this._renderDrawSection();
            var rotationSection = this._renderRotationSection();
            var expandHeader = this.ExtentSelectorMessages.extentSelectorModal.expandHeader;
            return (widget_1.tsx("div", { key: "extentDefintionOptions", class: CSS.recommendations, styles: { "max-height": this._optionsPanelHeight + "px" } },
                widget_1.tsx("div", { class: CSS.expandOptionsTitle },
                    this._renderVerticalHeightAdjustment(),
                    expandHeader),
                scaleSection,
                drawSection,
                rotationSection));
        };
        ExtentOptions.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        ExtentOptions.prototype._renderScaleSection = function () {
            var _a;
            var scaleTitle = this.ExtentSelectorMessages.scaleTitle;
            return (widget_1.tsx("div", { id: "scaleRangeSliderSection" },
                widget_1.tsx("div", null, scaleTitle), (_a = this._scaleRangeSlider) === null || _a === void 0 ? void 0 :
                _a.render()));
        };
        ExtentOptions.prototype._renderDrawSection = function () {
            var _a, _b, _c, _d;
            var drawonmap = this.ExtentSelectorMessages.extentSelectorModal.drawonmap;
            return (widget_1.tsx("div", { id: "drawSection", class: CSS.drawSection },
                widget_1.tsx("h4", { id: "drawText", class: CSS.recommendationsHeading }, drawonmap),
                widget_1.tsx("div", { class: CSS.drawSectionTools }, (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.sketchWidget) === null || _b === void 0 ? void 0 :
                    _b.render(), (_d = (_c = this.viewModel) === null || _c === void 0 ? void 0 : _c.searchWidget) === null || _d === void 0 ? void 0 :
                    _d.render())));
        };
        ExtentOptions.prototype._renderRotationSection = function () {
            var _a = this.ExtentSelectorMessages, rotationValidationMsg = _a.rotationValidationMsg, extentSelectorModal = _a.extentSelectorModal;
            var disallowMapRotation = extentSelectorModal.disallowMapRotation, rotationLabel = extentSelectorModal.rotationLabel, rotationUnits = extentSelectorModal.rotationUnits;
            return (widget_1.tsx("div", { id: "rotationSection" },
                widget_1.tsx("div", null,
                    widget_1.tsx("label", { class: CSS.preventMapRotation },
                        disallowMapRotation,
                        ":\u00A0\u00A0",
                        widget_1.tsx("calcite-switch", { afterCreate: this._setupRotationToggle.bind(this) }))),
                widget_1.tsx("div", null,
                    widget_1.tsx("label", null,
                        rotationLabel,
                        ":",
                        widget_1.tsx("input", { afterCreate: this._setupRotationInput.bind(this), placeholder: rotationUnits, type: "number" }),
                        widget_1.tsx("div", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_rotationValidationMsg", id: "rotationValidationMsg", class: CSS.rotationValidationMsg },
                            rotationValidationMsg,
                            " 0-360")))));
        };
        ExtentOptions.prototype._setupScaleRange = function () {
            var _this = this;
            var _a, _b;
            this._scaleRangeSlider = new ScaleRangeSlider({
                view: this.view,
                minScale: (_a = this === null || this === void 0 ? void 0 : this.savedConstraints) === null || _a === void 0 ? void 0 : _a.minScale,
                maxScale: (_b = this === null || this === void 0 ? void 0 : this.savedConstraints) === null || _b === void 0 ? void 0 : _b.maxScale
            });
            var local_minScale_tracker;
            this._handles.add(this._scaleRangeSlider.watch(["minScale"], function (value) {
                local_minScale_tracker = value;
                setTimeout(function () {
                    if (local_minScale_tracker === value) {
                        _this.unconnectedOutput.minScale = value;
                    }
                }, 500);
            }));
            var local_maxScale_tracker;
            this._handles.add(this._scaleRangeSlider.watch(["maxScale"], function (value) {
                local_maxScale_tracker = value;
                setTimeout(function () {
                    if (local_maxScale_tracker === value) {
                        _this.unconnectedOutput.maxScale = value;
                    }
                }, 500);
            }));
        };
        ExtentOptions.prototype._setupRotationToggle = function (switchDOM) {
            var _this = this;
            switchDOM.checked = !this.view.constraints.rotationEnabled;
            this._handles.add(on(switchDOM, "calciteSwitchChange", function (e) {
                var _a;
                _this.view.constraints.rotationEnabled = !((_a = e === null || e === void 0 ? void 0 : e.detail) === null || _a === void 0 ? void 0 : _a.switched);
            }));
        };
        ExtentOptions.prototype._setupRotationInput = function (rotationInput) {
            rotationInput.value = "" + Math.round(this.view.rotation);
            this._handles.add(on(rotationInput, "change", this._handleRotationInputChg.bind(this, rotationInput)));
            this._handles.add(watchUtils_1.watch(this.view, "rotation", this._handleMapViewRotationChg.bind(this, rotationInput)));
        };
        ExtentOptions.prototype._handleRotationInputChg = function (rotationInput) {
            var newRotation = Math.round(+rotationInput.value);
            if (!this._isRotationValid(newRotation)) {
                this._rotationValidationMsg.style.display = "block";
            }
            else {
                this._rotationValidationMsg.style.display = "none";
                if (!this.view.constraints.rotationEnabled) {
                    this.view.constraints.rotationEnabled = true;
                    this.view.rotation = newRotation;
                    this.view.constraints.rotationEnabled = false;
                }
                else {
                    this.view.rotation = +rotationInput.value;
                }
            }
        };
        ExtentOptions.prototype._handleMapViewRotationChg = function (rotationInput, rotationVal) {
            if (this._rotationValidationMsg.style.display !== "none") {
                this._rotationValidationMsg.style.display = "none";
            }
            if (rotationVal !== +rotationInput.value) {
                rotationInput.value = "" + Math.round(rotationVal);
            }
        };
        ExtentOptions.prototype._isRotationValid = function (rotation) {
            return 0 <= rotation && rotation <= 360;
        };
        ExtentOptions.prototype._watchViewHeight = function () {
            var _this = this;
            this._handles.add(this.view.watch("height", function () {
                _this._optionsPanelHeight = _this.view.height - 40;
            }));
        };
        ExtentOptions.prototype._renderVerticalHeightAdjustment = function () {
            return (widget_1.tsx("div", { styles: { height: this._optionsPanelHeight < 425 ? (this._optionsPanelHeight - 425) * -1 + "px" : "0px" } }, "\u00A0"));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentOptions.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentOptions.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentOptions.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentOptions.prototype, "savedConstraints", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ExtentOptions.prototype, "unconnectedOutput", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ExtentSelectorConfig/resources")
        ], ExtentOptions.prototype, "ExtentSelectorMessages", void 0);
        ExtentOptions = tslib_1.__decorate([
            decorators_1.subclass("ExtentOptions")
        ], ExtentOptions);
        return ExtentOptions;
    }(Widget));
    exports.default = ExtentOptions;
});
