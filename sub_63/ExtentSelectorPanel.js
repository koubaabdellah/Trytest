define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "./ExtentSelectorModal", "esri/core/Handles", "esri/core/watchUtils", "esri/geometry", "../../utils/focusUtils", "esri/Map"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, ExtentSelectorModal, Handles, watchUtils_1, geometry_1, focusUtils_1, Map_1) {
    "use strict";
    Map_1 = tslib_1.__importDefault(Map_1);
    var CSS = {
        base: "extent-selector-panel-config-base",
        button: "extent-selector-panel-config-base__button",
        scaleSlider: "extent-selector-panel-config-base__scale-slider",
    };
    var ExtentSelector = (function (_super) {
        tslib_1.__extends(ExtentSelector, _super);
        function ExtentSelector(params) {
            var _this = _super.call(this, params) || this;
            _this._extentSelectorModalHandles = new Handles();
            return _this;
        }
        Object.defineProperty(ExtentSelector.prototype, "savedState", {
            set: function (state) {
                this._savedState = state;
            },
            enumerable: false,
            configurable: true
        });
        ExtentSelector.prototype.destroy = function () {
            this._extentSelectorModalHandles.removeAll();
            this._extentSelectorModalHandles.destroy();
        };
        ExtentSelector.prototype.render = function () {
            var btnAction = this.ExtentSelectorMessages.extentSelectorPanel.btnAction;
            return (widget_1.tsx("div", null,
                widget_1.tsx("div", { id: "extentPickerFrameContent", class: CSS.base },
                    widget_1.tsx("div", { class: CSS.button },
                        widget_1.tsx("calcite-button", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_configureButton", key: "defineExtent", appearance: "outline", width: "full", onclick: this._triggerModalRender.bind(this), onkeydown: this._handleKeyDown, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }, btnAction)))));
        };
        ExtentSelector.prototype._triggerModalRender = function () {
            var _this = this;
            this._extentSelectorModal = new ExtentSelectorModal.default({
                map: this.configPanelViewModel.map || new Map_1.default({ basemap: "topo-vector" }),
                configPanelViewModel: this.configPanelViewModel
            });
            if (this._savedState && Object.keys(this._savedState).length > 0) {
                var geom = this._savedState.constraints.geometry;
                if (geom != null && geom.type == null) {
                    this._savedState.constraints.geometry = geometry_1.Polygon.fromJSON(geom);
                }
                this._extentSelectorModal.setSavedConstraints(this._savedState);
            }
            this._extentSelectorModalHandles.add(this._extentSelectorModal.watch("output", function (_output) {
                var _a, _b, _c, _d, _e;
                var viewConstraints = {
                    geometry: (_b = (_a = _output === null || _output === void 0 ? void 0 : _output.constraints) === null || _a === void 0 ? void 0 : _a.geometry) === null || _b === void 0 ? void 0 : _b.toJSON(),
                    minScale: (_c = _output === null || _output === void 0 ? void 0 : _output.constraints) === null || _c === void 0 ? void 0 : _c.minScale,
                    maxScale: (_d = _output === null || _output === void 0 ? void 0 : _output.constraints) === null || _d === void 0 ? void 0 : _d.maxScale,
                    rotationEnabled: (_e = _output === null || _output === void 0 ? void 0 : _output.constraints) === null || _e === void 0 ? void 0 : _e.rotationEnabled
                };
                _this.output = {
                    constraints: viewConstraints,
                    mapRotation: _output.mapRotation
                };
                _this._savedState = _this.output;
            }));
            watchUtils_1.whenTrueOnce(this._extentSelectorModal, "isReadyForRender", function () {
                var _a;
                _this.configPanelViewModel.setGenericModalDOM((_a = _this._extentSelectorModal) === null || _a === void 0 ? void 0 : _a.render());
                _this._extentSelectorModal.renderNow();
                _this._extentSelectorModal.modal.setAttribute("active", "true");
                _this._extentSelectorModal.modal.addEventListener("calciteModalClose", _this._handleModalClose.bind(_this));
            });
        };
        ExtentSelector.prototype._handleModalClose = function () {
            var _a, _b, _c, _d, _e, _f;
            (_b = (_a = this._extentSelectorModal) === null || _a === void 0 ? void 0 : _a.viewModel) === null || _b === void 0 ? void 0 : _b.deinitializeExtentSelector();
            this.configPanelViewModel.setGenericModalDOM(null);
            (_d = (_c = this._extentSelectorModal) === null || _c === void 0 ? void 0 : _c.modal) === null || _d === void 0 ? void 0 : _d.setAttribute("active", "false");
            (_e = this._extentSelectorModal) === null || _e === void 0 ? void 0 : _e.scheduleRender();
            this._extentSelectorModalHandles.removeAll();
            (_f = this._extentSelectorModal) === null || _f === void 0 ? void 0 : _f.destroy();
            this._extentSelectorModal = null;
            this._setFocusToConfigureBtn();
        };
        ExtentSelector.prototype._setFocusToConfigureBtn = function () {
            this._configureButton.setFocus();
        };
        ExtentSelector.prototype._handleKeyDown = function (e) {
            if (e.code === "Space" || e.code === "Enter") {
                this._triggerModalRender();
                return;
            }
            focusUtils_1.handleFocusElFromSettingsPanel(e);
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelector.prototype, "savedState", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelector.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelector.prototype, "titleHeader", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ExtentSelectorConfig/resources")
        ], ExtentSelector.prototype, "ExtentSelectorMessages", void 0);
        ExtentSelector = tslib_1.__decorate([
            decorators_1.subclass("ExtentSelector")
        ], ExtentSelector);
        return ExtentSelector;
    }(BaseComponent));
    return ExtentSelector;
});
