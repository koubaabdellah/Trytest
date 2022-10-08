define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Handles", "esri/core/Accessor", "esri/Basemap", "esri/widgets/BasemapGallery", "esri/views/MapView", "esri/Map", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Handles, Accessor, Basemap, BasemapGallery, MapView, Map, watchUtils_1) {
    "use strict";
    var BasemapSelectorConfigViewModel = (function (_super) {
        tslib_1.__extends(BasemapSelectorConfigViewModel, _super);
        function BasemapSelectorConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.isOpen = false;
            _this.useItemBrowserBasemap = false;
            _this._handles = new Handles();
            return _this;
        }
        BasemapSelectorConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        BasemapSelectorConfigViewModel.prototype.openBasemapBrowser = function () {
            this._set("isOpen", true);
        };
        BasemapSelectorConfigViewModel.prototype.closeBasemapBrowser = function () {
            this._set("isOpen", false);
        };
        BasemapSelectorConfigViewModel.prototype.onSelect = function (item) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var mapId, chosenCustomBasemap, promArr, err_1;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            mapId = item[0].id;
                            if (mapId == null) {
                                return [2];
                            }
                            chosenCustomBasemap = new Basemap({
                                portalItem: {
                                    id: mapId,
                                    portal: this.portal
                                }
                            });
                            promArr = [];
                            promArr.push(chosenCustomBasemap.loadAll());
                            promArr.push(this.map.loadAll());
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4, Promise.all(promArr)];
                        case 2:
                            _a.sent();
                            return [3, 4];
                        case 3:
                            err_1 = _a.sent();
                            console.error(err_1);
                            return [3, 4];
                        case 4:
                            watchUtils_1.whenDefinedOnce(this.map, "basemap", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var err_2;
                                var _a, _b, _c;
                                return tslib_1.__generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            if (!(((_b = (_a = this.map) === null || _a === void 0 ? void 0 : _a.basemap) === null || _b === void 0 ? void 0 : _b.loadStatus) !== "loaded")) return [3, 4];
                                            _d.label = 1;
                                        case 1:
                                            _d.trys.push([1, 3, , 4]);
                                            return [4, this.map.basemap.loadAll()];
                                        case 2:
                                            _d.sent();
                                            return [3, 4];
                                        case 3:
                                            err_2 = _d.sent();
                                            console.error(err_2);
                                            return [3, 4];
                                        case 4:
                                            this._setActiveBasemapInGallery(null);
                                            this.set("outputBasemapId", (_c = chosenCustomBasemap === null || chosenCustomBasemap === void 0 ? void 0 : chosenCustomBasemap.portalItem) === null || _c === void 0 ? void 0 : _c.id);
                                            this.set("itemBrowserBasemap", chosenCustomBasemap);
                                            this.closeBasemapBrowser();
                                            return [2];
                                    }
                                });
                            }); });
                            return [2];
                    }
                });
            });
        };
        BasemapSelectorConfigViewModel.prototype.setupBasemapGallery = function (fakeMapViewDiv) {
            var _this = this;
            var map = new Map({ basemap: "topo" });
            var view = new MapView({
                container: fakeMapViewDiv,
                map: map
            });
            view.when(function () {
                var _a;
                _this.basemapGallery = new BasemapGallery({
                    view: view,
                    source: {
                        portal: _this.portal
                    }
                });
                var itemsCountWatcher = _this.basemapGallery.viewModel.items.on("change", function () {
                    if (_this.savedState) {
                        _this._processSavedState();
                    }
                    else {
                        _this._setActiveBasemapInGallery(null);
                    }
                    itemsCountWatcher.remove();
                });
                _this._handles.add((_a = _this.basemapGallery) === null || _a === void 0 ? void 0 : _a.watch("activeBasemap", function (activeBasemap) {
                    if (activeBasemap != null) {
                        _this.set("outputBasemapId", activeBasemap.portalItem.id);
                    }
                }));
            });
        };
        BasemapSelectorConfigViewModel.prototype.selectItemBrowserChosenBasemap = function () {
            if (this.itemBrowserBasemap != null) {
                this._setActiveBasemapInGallery(null);
                this.set("outputBasemapId", this.itemBrowserBasemap.portalItem.id);
            }
        };
        BasemapSelectorConfigViewModel.prototype._setActiveBasemapInGallery = function (basemap) {
            this.basemapGallery.activeBasemap = basemap;
        };
        BasemapSelectorConfigViewModel.prototype._processSavedState = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var selectedGalleryBasemap, chosenCustomBasemap;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            selectedGalleryBasemap = this.basemapGallery.source.basemaps.find(function (galleryBasemap) {
                                return galleryBasemap.portalItem.id === _this.savedState.chosenBasemapId;
                            });
                            if (!selectedGalleryBasemap) return [3, 1];
                            this._setActiveBasemapInGallery(selectedGalleryBasemap);
                            return [3, 3];
                        case 1:
                            chosenCustomBasemap = new Basemap({
                                portalItem: {
                                    id: this.savedState.chosenBasemapId,
                                    portal: this.portal
                                }
                            });
                            return [4, chosenCustomBasemap.load()];
                        case 2:
                            _a.sent();
                            this._setActiveBasemapInGallery(null);
                            this.set("itemBrowserBasemap", chosenCustomBasemap);
                            this.set("outputBasemapId", chosenCustomBasemap.portalItem.id);
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], BasemapSelectorConfigViewModel.prototype, "isOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfigViewModel.prototype, "outputBasemapId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfigViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfigViewModel.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfigViewModel.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfigViewModel.prototype, "basemapGallery", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfigViewModel.prototype, "itemBrowserBasemap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfigViewModel.prototype, "useItemBrowserBasemap", void 0);
        BasemapSelectorConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("BasemapSelectorConfigViewModel")
        ], BasemapSelectorConfigViewModel);
        return BasemapSelectorConfigViewModel;
    }(Accessor));
    return BasemapSelectorConfigViewModel;
});
