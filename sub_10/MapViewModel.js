define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "esri/core/watchUtils", "../../../widgets/ItemBrowser/ItemBrowser"], function (require, exports, tslib_1, decorators_1, Accessor, Handles, watchUtils, ItemBrowser) {
    "use strict";
    var MapViewModel = (function (_super) {
        tslib_1.__extends(MapViewModel, _super);
        function MapViewModel(value) {
            var _this = _super.call(this, value) || this;
            _this._handles = new Handles();
            _this.configPanelViewModel = null;
            _this.itemBrowser = new ItemBrowser();
            return _this;
        }
        MapViewModel.prototype.initialize = function () {
            this._handles.add([
                this._setItemBrowserConfigPanelVM(),
                this._selectedMapIdWatcher()
            ]);
        };
        MapViewModel.prototype.destroy = function () {
            this.itemBrowser.destroy();
            this.itemBrowser = null;
        };
        MapViewModel.prototype._setItemBrowserConfigPanelVM = function () {
            var _this = this;
            return watchUtils.when(this, "configPanelViewModel", function () {
                _this.set("itemBrowser.configPanelViewModel", _this.configPanelViewModel);
            });
        };
        MapViewModel.prototype._selectedMapIdWatcher = function () {
            var _this = this;
            return watchUtils.watch(this, "itemBrowser.selectedMapId", function () {
                var key = "state-ready-key";
                _this._handles.add(_this._configPanelStateWatcher(key), key);
            });
        };
        MapViewModel.prototype._configPanelStateWatcher = function (key) {
            var _this = this;
            return watchUtils.whenEqualOnce(this, "configPanelViewModel.state", "ready", function () {
                if (_this.configPanelViewModel.appPreviewFrame) {
                    var src = _this.configPanelViewModel.appPreviewFrame.getAttribute("src");
                    _this.configPanelViewModel.appPreviewFrame.setAttribute("src", src);
                }
                _this._handles.remove(key);
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], MapViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], MapViewModel.prototype, "itemBrowser", void 0);
        MapViewModel = tslib_1.__decorate([
            decorators_1.subclass("MapViewModel")
        ], MapViewModel);
        return MapViewModel;
    }(Accessor));
    return MapViewModel;
});
