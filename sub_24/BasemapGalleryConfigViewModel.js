define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/widgets/BasemapGallery", "esri/core/Collection", "esri/core/Handles", "esri/core/watchUtils", "esri/widgets/BasemapGallery/support/PortalBasemapsSource"], function (require, exports, tslib_1, decorators_1, Accessor, BasemapGallery, Collection, Handles, watchUtils_1, PortalBasemapsSource) {
    "use strict";
    var BASEMAP_WATCHER_GROUP_KEY = "BASEMAP_WATCHER_GROUP_KEY";
    var BasemapGalleryConfigViewModel = (function (_super) {
        tslib_1.__extends(BasemapGalleryConfigViewModel, _super);
        function BasemapGalleryConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.basemapChoices = new Collection();
            _this._basemapGallery = new BasemapGallery();
            _this._handles = new Handles();
            return _this;
        }
        Object.defineProperty(BasemapGalleryConfigViewModel.prototype, "savedState", {
            set: function (savedState) {
                this.set("selectedGroupId", savedState === null || savedState === void 0 ? void 0 : savedState.basemapGroupId);
                this.set("_basemapIdsToFilter", savedState === null || savedState === void 0 ? void 0 : savedState.basemapIdsToFilter);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BasemapGalleryConfigViewModel.prototype, "selectedGroupId", {
            set: function (id) {
                this._selectedGroupId = id;
                this._applyQuery(id);
                this._basemapGallery.source.refresh();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BasemapGalleryConfigViewModel.prototype, "portal", {
            set: function (portal) {
                if (portal != null) {
                    this._basemapGallery.set("source", new PortalBasemapsSource({ portal: portal }));
                    this._basemapGallery.source["load"]();
                    this._applyQuery(this._selectedGroupId);
                    this._basemapGallery.source.refresh();
                }
            },
            enumerable: false,
            configurable: true
        });
        BasemapGalleryConfigViewModel.prototype.initialize = function () {
            this._handles.add(watchUtils_1.init(this._basemapGallery, "source", this._handleSourceChange.bind(this)));
        };
        BasemapGalleryConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        BasemapGalleryConfigViewModel.prototype.dealWithBasemapChanges = function () {
            var _this = this;
            this.basemapChoices.removeAll();
            this.basemapChoices.addMany(this._basemapGallery.source.basemaps.map(function (basemap) {
                var _a;
                return [basemap, !((_a = _this === null || _this === void 0 ? void 0 : _this._basemapIdsToFilter) === null || _a === void 0 ? void 0 : _a.includes(basemap.portalItem.id))];
            }));
            this.makeOutput();
        };
        BasemapGalleryConfigViewModel.prototype.makeOutput = function () {
            var basemapIdsToFilter = this.basemapChoices
                .filter(function (pair) {
                return !pair[1];
            })
                .map(function (pair) { return pair[0].portalItem.id; })
                .toArray();
            this.basemapSelectedCount = this.basemapChoices.length - basemapIdsToFilter.length;
            this.output = {
                basemapGroupId: this._selectedGroupId,
                basemapIdsToFilter: basemapIdsToFilter
            };
        };
        BasemapGalleryConfigViewModel.prototype._handleSourceChange = function () {
            var _this = this;
            this._handles.remove(BASEMAP_WATCHER_GROUP_KEY);
            this._handles.add(watchUtils_1.whenOnce(this._basemapGallery.source.basemaps, "length", function () {
                _this.dealWithBasemapChanges();
                _this._handles.add(_this._basemapGallery.source.basemaps.on("change", _this.dealWithBasemapChanges.bind(_this)), BASEMAP_WATCHER_GROUP_KEY);
            }), BASEMAP_WATCHER_GROUP_KEY);
        };
        BasemapGalleryConfigViewModel.prototype._applyQuery = function (portalGroupId) {
            if (portalGroupId != null) {
                this._basemapGallery.source.query = "id:" + portalGroupId;
            }
            else {
                this._basemapGallery.source.query = null;
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapGalleryConfigViewModel.prototype, "savedState", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapGalleryConfigViewModel.prototype, "basemapChoices", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapGalleryConfigViewModel.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapGalleryConfigViewModel.prototype, "selectedGroupId", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapGalleryConfigViewModel.prototype, "portal", null);
        BasemapGalleryConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("BasemapGalleryConfigViewModel")
        ], BasemapGalleryConfigViewModel);
        return BasemapGalleryConfigViewModel;
    }(Accessor));
    return BasemapGalleryConfigViewModel;
});
