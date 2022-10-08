define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, Widget) {
    "use strict";
    var BaseComponent = (function (_super) {
        tslib_1.__extends(BaseComponent, _super);
        function BaseComponent(params) {
            var _this = _super.call(this, params) || this;
            _this.configPanelViewModel = null;
            _this.tipItem = null;
            return _this;
        }
        BaseComponent.prototype.getTheme = function () {
            return this.configPanelViewModel.darkModeEnabled ? "dark" : "light";
        };
        BaseComponent.prototype.loadAllMapResources = function () {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var map, portalItem, err_1;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            map = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.map;
                            portalItem = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.mapPortalItem;
                            if (!(portalItem && (portalItem === null || portalItem === void 0 ? void 0 : portalItem.loaded) && map && !(map === null || map === void 0 ? void 0 : map.loaded))) return [3, 5];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, 4, 5]);
                            this.set("configPanelViewModel.isLoadingMap", true);
                            return [4, map.loadAll()];
                        case 2:
                            _c.sent();
                            return [3, 5];
                        case 3:
                            err_1 = _c.sent();
                            console.error("ERROR: ", err_1);
                            return [3, 5];
                        case 4:
                            this.set("configPanelViewModel.isLoadingMap", false);
                            return [7];
                        case 5: return [2];
                    }
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], BaseComponent.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BaseComponent.prototype, "tipItem", void 0);
        BaseComponent = tslib_1.__decorate([
            decorators_1.subclass("BaseComponent")
        ], BaseComponent);
        return BaseComponent;
    }(Widget));
    return BaseComponent;
});
