define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/widgets/Search", "esri/widgets/Sketch", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/geometry", "esri/geometry/support/webMercatorUtils", "esri/geometry/geometryEngine", "esri/core/Handles", "../helpers/MaskLayer"], function (require, exports, tslib_1, Accessor, decorators_1, Search, Sketch, Graphic, GraphicsLayer, geometry_1, webMercatorUtils_1, geometryEngine_1, Handles, MaskLayer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ExtentSelectorMapViewModel = (function (_super) {
        tslib_1.__extends(ExtentSelectorMapViewModel, _super);
        function ExtentSelectorMapViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.map = null;
            _this.isExtentSelectorActive = false;
            _this.sketchWidget = null;
            _this.chosenGeometry = null;
            _this.searchWidget = null;
            _this.MIN_SCALE_DEFAULT = 0;
            _this.MAX_SCALE_DEFAULT = 0;
            _this._drawLayer = null;
            _this._dateLineLayer = null;
            _this._mask = null;
            _this._baseExtent = null;
            _this._handles = new Handles();
            _this.polygonSymbol = {
                type: 'simple-fill',
                style: 'solid',
                color: [227, 139, 79, 0],
                outline: {
                    color: [65, 105, 255],
                    width: 0,
                },
            };
            _this.dlOverlapSymbol = {
                type: 'simple-fill',
                style: 'solid',
                color: [255, 0, 0, 0.5],
                outline: {
                    color: [65, 105, 255],
                    width: 0,
                },
            };
            return _this;
        }
        ExtentSelectorMapViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        Object.defineProperty(ExtentSelectorMapViewModel.prototype, "view", {
            set: function (_view) {
                this._view = _view;
                this.initializeExtentSelector();
            },
            enumerable: false,
            configurable: true
        });
        ExtentSelectorMapViewModel.prototype.zoomToForDisplay = function (geom) {
            return this._view.goTo(geom);
        };
        ExtentSelectorMapViewModel.prototype.initializeExtentSelector = function () {
            var _this = this;
            this.isExtentSelectorActive = true;
            this._mask = new MaskLayer({});
            this.map.add(this._mask);
            this._dateLineLayer = new GraphicsLayer({ id: '_dateLineLayer' });
            this.map.add(this._dateLineLayer);
            this._drawLayer = new GraphicsLayer({ id: 'areaGraphics' });
            this.map.add(this._drawLayer);
            this._view.when(function () {
                if (_this.searchWidget == null)
                    _this._initSearchWidget();
                if (_this.sketchWidget == null)
                    _this._initSketchWidget();
            });
        };
        ExtentSelectorMapViewModel.prototype.deinitializeExtentSelector = function () {
            this.isExtentSelectorActive = false;
            this.map.remove(this._dateLineLayer);
            this.map.remove(this._drawLayer);
            this.map.remove(this._mask);
            this._dateLineLayer = null;
            this._drawLayer = null;
            this._mask = null;
            this.sketchWidget.destroy();
            this.searchWidget.destroy();
            this.sketchWidget = null;
            this.searchWidget = null;
            this._view = null;
        };
        ExtentSelectorMapViewModel.prototype.drawExtent = function (poly) {
            this._addInitialExtent(poly);
        };
        ExtentSelectorMapViewModel.prototype._addInitialExtent = function (geometry) {
            var geo = this._toMap(geometry);
            this._startupSketching(geo);
        };
        ExtentSelectorMapViewModel.prototype._initSearchWidget = function () {
            var _this = this;
            this.searchWidget = new Search({
                view: this._view,
                popupEnabled: false,
                resultGraphicEnabled: false,
            });
            var vm = this.searchWidget.viewModel;
            this.searchWidget.renderNow();
            this._handles.add(this.searchWidget.viewModel.allSources.on('change', function (e) {
                vm.allSources.forEach(function (source) {
                    source.zoomScale = null;
                });
            }));
            this._handles.add(this.searchWidget.on('select-result', function (r) {
                _this._startupSketching(geometry_1.Polygon.fromExtent(r.result.extent));
            }));
        };
        ExtentSelectorMapViewModel.prototype._initSketchWidget = function () {
            this.sketchWidget = new Sketch({
                view: this._view,
                layer: this._drawLayer,
                availableCreateTools: ['polygon', 'rectangle']
            });
            this._addSketchListeners();
        };
        ExtentSelectorMapViewModel.prototype._startupSketching = function (geom) {
            var _this = this;
            geom = this._toMap(geom);
            this.saveChosenExtent(geom);
            if (!this._baseExtent) {
                this._baseExtent = this.getBasemapExtent();
            }
            var _drawLayer = this._drawLayer;
            _drawLayer.opacity = 0;
            if (geom) {
                if (geom.type !== 'polygon' && geom.type === 'extent') {
                    geom = geometry_1.Polygon.fromExtent(geom);
                }
                var g_1 = new Graphic({
                    symbol: this.polygonSymbol,
                    geometry: geom,
                });
                if (g_1.geometry) {
                    _drawLayer.add(g_1);
                    this._mask.clear();
                    this._mask.add(g_1.geometry);
                    this.zoomToForDisplay(g_1.geometry)
                        .then(function () {
                        _this.sketchWidget.update(g_1, {
                            tool: 'transform',
                            toggleToolOnClick: false,
                        });
                    })
                        .catch(function (err) {
                        _this.sketchWidget.update(g_1, {
                            tool: 'transform',
                            toggleToolOnClick: false,
                        });
                    });
                }
            }
        };
        ExtentSelectorMapViewModel.prototype.saveChosenExtent = function (geo) {
            if (!geometryEngine_1.equals(geo, this.chosenGeometry)) {
                this.chosenGeometry = geo;
            }
        };
        ExtentSelectorMapViewModel.prototype._addSketchListeners = function () {
            var _this = this;
            this.sketchWidget.on('create', function (evt) {
                var _a;
                var createOperationState = evt.state;
                var geom = (_a = evt === null || evt === void 0 ? void 0 : evt.graphic) === null || _a === void 0 ? void 0 : _a.geometry;
                if (createOperationState === 'start') {
                }
                else if (createOperationState === 'active') {
                    _this._mask.clear();
                    _this._mask.add(geom);
                }
                else if (createOperationState === 'cancel') {
                    _this._startupSketching(_this.chosenGeometry);
                }
                else if (createOperationState === 'complete') {
                    _this._startupSketching(geom);
                }
            });
            this.sketchWidget.on('update', function (evt) {
                var updateOperationState = evt.state;
                var updatedGeom = evt.graphics[evt.graphics.length - 1].geometry;
                if (updateOperationState === 'start') {
                }
                else if (updateOperationState === 'active') {
                    _this._mask.clear();
                    _this._mask.add(updatedGeom);
                    if (evt.toolEventInfo.type === 'move-stop' ||
                        evt.toolEventInfo.type === 'scale-stop') {
                        _this.saveChosenExtent(updatedGeom);
                        _this.zoomToForDisplay(updatedGeom);
                    }
                }
                else if (updateOperationState === 'complete') {
                }
            });
        };
        ExtentSelectorMapViewModel.prototype.getBasemapExtent = function () {
            try {
                var xmin = null;
                var xmax = null;
                var ymin = null;
                var ymax = null;
                if (this._view.map.basemap.hasOwnProperty('baseLayers')) {
                    var bls = this._view.map.basemap.baseLayers;
                    if (bls.hasOwnProperty('items') && bls['items'].length) {
                        for (var i = 0; i < bls['items'].length; i++) {
                            var bsi = bls['items'][i].fullExtent;
                            xmin = xmin !== null && xmin > bsi.xmin ? xmin : bsi.xmin;
                            ymin = ymin !== null && ymin > bsi.ymin ? ymin : bsi.ymin;
                            xmax = xmax !== null && xmax < bsi.xmax ? xmax : bsi.xmax;
                            ymax = ymax !== null && ymax < bsi.ymax ? ymax : bsi.ymax;
                        }
                        var ext = new geometry_1.Extent({
                            xmin: xmin,
                            xmax: xmax,
                            ymin: ymin,
                            ymax: ymax,
                            spatialReference: this._view.spatialReference,
                        });
                        return ext;
                    }
                }
                return new geometry_1.Extent({
                    ymin: -90,
                    ymax: 90,
                    xmin: -180,
                    xmax: 180,
                    spatialReference: { wkid: 4326 },
                });
            }
            catch (e) {
                return new geometry_1.Extent({
                    ymin: -90,
                    ymax: 90,
                    xmin: -180,
                    xmax: 180,
                    spatialReference: { wkid: 4326 },
                });
            }
        };
        ExtentSelectorMapViewModel.prototype._toMap = function (d) {
            if (webMercatorUtils_1.canProject(d, this._view)) {
                return webMercatorUtils_1.project(d, this._view);
            }
            else {
                return d;
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorMapViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorMapViewModel.prototype, "view", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorMapViewModel.prototype, "isExtentSelectorActive", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorMapViewModel.prototype, "sketchWidget", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorMapViewModel.prototype, "chosenGeometry", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExtentSelectorMapViewModel.prototype, "searchWidget", void 0);
        ExtentSelectorMapViewModel = tslib_1.__decorate([
            decorators_1.subclass('ExtentSelectorMapViewModel')
        ], ExtentSelectorMapViewModel);
        return ExtentSelectorMapViewModel;
    }(Accessor));
    exports.default = ExtentSelectorMapViewModel;
});
