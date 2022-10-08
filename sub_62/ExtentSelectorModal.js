define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/views/MapView", "esri/widgets/Widget", "esri/widgets/Home", "./ExtentSelectorModal/ExtentSelectorModalViewModel", "./ExtentOptions", "esri/core/watchUtils", "esri/widgets/Expand", "esri/geometry", "esri/geometry/Extent"], function (require, exports, tslib_1, decorators_1, widget_1, MapView, Widget, Home, ExtentSelectorModalViewModel_1, ExtentOptions_1, watchUtils_1, Expand, geometry_1, Extent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ExtentSelectorModalViewModel_1 = tslib_1.__importDefault(ExtentSelectorModalViewModel_1);
    ExtentOptions_1 = tslib_1.__importDefault(ExtentOptions_1);
    Extent_1 = tslib_1.__importDefault(Extent_1);
    var CSS = {
        footer: "footer",
        buttonModalFooter: "footer__buttons",
        modalContentHeight: "modalContentHeight",
        extentSelectorMapView: "extentSelectorMapView"
    };
    var ExtentSelectorModal = (function (_super) {
        tslib_1.__extends(ExtentSelectorModal, _super);
        function ExtentSelectorModal(vals) {
            return _super.call(this, vals) || this;
        }
        ExtentSelectorModal.prototype.postInitialize = function () {
            this.viewModel = new ExtentSelectorModalViewModel_1.default({
                map: this.map
            });
            this.isReadyForRender = true;
        };
        ExtentSelectorModal.prototype.render = function () {
            var _this = this;
            var _a = this.ExtentSelectorMessages, cancel = _a.cancel, extentSelectorModal = _a.extentSelectorModal, close = _a.close;
            var modalHeaderTitle = extentSelectorModal.modalHeaderTitle, modalConfirmBtnTxt = extentSelectorModal.modalConfirmBtnTxt;
            return (widget_1.tsx("calcite-modal", { "aria-labelledby": "modal-title", bind: this, fullscreen: true, afterCreate: widget_1.storeNode, "data-node-ref": "modal", "intl-close": cancel, scale: "m", width: "l" },
                widget_1.tsx("h2", { slot: "header", id: "modal-title" }, modalHeaderTitle),
                widget_1.tsx("div", { slot: "content", class: CSS.modalContentHeight },
                    widget_1.tsx("div", { id: "extentSelectorMapView", class: CSS.extentSelectorMapView, afterCreate: this._initializeMapView.bind(this) })),
                widget_1.tsx("div", { slot: "primary", class: CSS.footer },
                    widget_1.tsx("calcite-button", { appearance: "outline", class: CSS.buttonModalFooter, onclick: function () { _this.modal.active = false; } }, close),
                    widget_1.tsx("calcite-button", { class: CSS.buttonModalFooter, onclick: this._confirm.bind(this) }, modalConfirmBtnTxt))));
        };
        ExtentSelectorModal.prototype.setSavedConstraints = function (ExSelectOutput) {
            var _this = this;
            this._savedMapViewConstraints = ExSelectOutput;
            watchUtils_1.whenDefinedOnce(this, "view", function () {
                _this.view.constraints = tslib_1.__assign(tslib_1.__assign({}, _this.view.constraints), _this._savedMapViewConstraints.constraints);
                _this.view.constraints.geometry = null;
                _this.view.constraints.minScale = _this.viewModel.MIN_SCALE_DEFAULT;
                _this.view.constraints.maxScale = _this.viewModel.MAX_SCALE_DEFAULT;
                _this._setMapViewRotation();
            });
        };
        ExtentSelectorModal.prototype._initializeMapView = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            var startExtent = ((_c = (_b = (_a = this.map) === null || _a === void 0 ? void 0 : _a.initialViewProperties) === null || _b === void 0 ? void 0 : _b.viewpoint) === null || _c === void 0 ? void 0 : _c.targetGeometry) ? (_f = (_e = (_d = this.map) === null || _d === void 0 ? void 0 : _d.initialViewProperties) === null || _e === void 0 ? void 0 : _e.viewpoint) === null || _f === void 0 ? void 0 : _f.targetGeometry : new Extent_1.default({ xmin: -90, ymin: -45, xmax: 90, ymax: 45, spatialReference: { wkid: 4326 } });
            this._webmapExtent = geometry_1.Polygon.fromExtent(startExtent);
            var view = new MapView({
                map: this.map,
                container: "extentSelectorMapView",
            });
            view.when(function () {
                _this.view = view;
                _this.viewModel.view = view;
                _this.modal.setFocus();
                _this._initHomeWidget();
                _this._initExtentOptionsWidget();
                _this._setFirstDrawLocation();
            });
        };
        ExtentSelectorModal.prototype._initHomeWidget = function () {
            var homeWidget = new Home({
                view: this.view
            });
            this.view.ui.add(homeWidget, "top-left");
        };
        ExtentSelectorModal.prototype._initExtentOptionsWidget = function () {
            var _a;
            this._extentOptions = new ExtentOptions_1.default({
                map: this.map,
                view: this.view,
                viewModel: this.viewModel,
                savedConstraints: (_a = this === null || this === void 0 ? void 0 : this._savedMapViewConstraints) === null || _a === void 0 ? void 0 : _a.constraints
            });
            var extentOptionsExpand = new Expand({
                expandIconClass: "esri-icon-drag-horizontal",
                view: this.view,
                content: this._extentOptions
            });
            this.view.ui.add(extentOptionsExpand, "top-right");
            extentOptionsExpand.expand();
        };
        ExtentSelectorModal.prototype._setFirstDrawLocation = function () {
            var _a, _b, _c, _d, _e;
            var geomToDraw = ((_b = (_a = this.output) === null || _a === void 0 ? void 0 : _a.constraints) === null || _b === void 0 ? void 0 : _b.geometry)
                || ((_d = (_c = this._savedMapViewConstraints) === null || _c === void 0 ? void 0 : _c.constraints) === null || _d === void 0 ? void 0 : _d.geometry)
                || ((_e = this.viewModel) === null || _e === void 0 ? void 0 : _e.chosenGeometry);
            if (geomToDraw == null || (geomToDraw === null || geomToDraw === void 0 ? void 0 : geomToDraw["rings"].length) === 0) {
                geomToDraw = this._webmapExtent;
            }
            if (geomToDraw) {
                this.viewModel.drawExtent(geomToDraw);
            }
        };
        ExtentSelectorModal.prototype._setMapViewRotation = function () {
            if (!this.view.constraints.rotationEnabled) {
                this.view.constraints.rotationEnabled = true;
                this.view.rotation = this._savedMapViewConstraints.mapRotation;
                this.view.constraints.rotationEnabled = false;
            }
            else {
                this.view.rotation = this._savedMapViewConstraints.mapRotation;
            }
        };
        ExtentSelectorModal.prototype._confirm = function () {
            this.view.constraints.geometry = this.viewModel.chosenGeometry;
            this.view.constraints.minScale = this._extentOptions.unconnectedOutput.minScale;
            this.view.constraints.maxScale = this._extentOptions.unconnectedOutput.maxScale;
            this.output = {
                constraints: this.view.constraints,
                mapRotation: this.view.rotation
            };
            this.modal.removeAttribute("active");
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorModal.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorModal.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorModal.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorModal.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorModal.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorModal.prototype, "isReadyForRender", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorModal.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ExtentSelectorConfig/resources")
        ], ExtentSelectorModal.prototype, "ExtentSelectorMessages", void 0);
        ExtentSelectorModal = tslib_1.__decorate([
            decorators_1.subclass("ExtentSelector")
        ], ExtentSelectorModal);
        return ExtentSelectorModal;
    }(Widget));
    exports.default = ExtentSelectorModal;
});
