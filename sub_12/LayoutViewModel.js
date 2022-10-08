define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "../Error", "TemplatesCommonLib/baseClasses/support/itemUtils", "esri/core/watchUtils"], function (require, exports, tslib_1, Accessor, decorators_1, Error_1, itemUtils_1, watchUtils_1) {
    "use strict";
    Error_1 = tslib_1.__importDefault(Error_1);
    var LayoutViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(LayoutViewModel, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function LayoutViewModel(props) {
            var _this = _super.call(this, props) || this;
            _this.view = null;
            return _this;
        }
        Object.defineProperty(LayoutViewModel.prototype, "state", {
            get: function () {
                var ready = this.get("view.ready");
                var loading = this.get("item.loadStatus") === "loaded" ? false : true;
                if (!this.item) {
                    return "error";
                }
                else {
                    return ready && !loading ? "ready" : "loading";
                }
            },
            enumerable: false,
            configurable: true
        });
        LayoutViewModel.prototype.createMap = function (container) {
            var _a, _b;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var portalItem, appProxies, defaultViewProperties, mapContainer, components, viewProperties, _c, minScale, maxScale, map, view, ariadesc, _d, e_1;
                var _this = this;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!this.item) {
                                return [2 /*return*/, new Error_1.default({
                                        title: "Error",
                                        message: "Could not load an item to display",
                                        container: container
                                    })];
                            }
                            portalItem = this.applicationBase.results
                                .applicationItem.value;
                            appProxies = (portalItem === null || portalItem === void 0 ? void 0 : portalItem.applicationProxies) ? portalItem.applicationProxies
                                : null;
                            defaultViewProperties = itemUtils_1.getConfigViewProperties(this.applicationConfig);
                            mapContainer = {
                                container: container
                            };
                            components = ["attribution"];
                            viewProperties = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, defaultViewProperties), { ui: { components: components } }), mapContainer);
                            _c = this.applicationConfig, minScale = _c.minScale, maxScale = _c.maxScale;
                            if (minScale || maxScale) {
                                viewProperties.constraints = {
                                    minScale: minScale !== null && minScale !== void 0 ? minScale : 0,
                                    maxScale: maxScale !== null && maxScale !== void 0 ? maxScale : 0
                                };
                            }
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, itemUtils_1.createMapFromItem({
                                    item: this.item,
                                    appProxies: appProxies
                                })];
                        case 2:
                            map = (_e.sent());
                            return [4 /*yield*/, itemUtils_1.createView(tslib_1.__assign(tslib_1.__assign({}, viewProperties), { map: map }))];
                        case 3:
                            view = (_e.sent());
                            ariadesc = ((_a = this === null || this === void 0 ? void 0 : this.applicationConfig) === null || _a === void 0 ? void 0 : _a.mapA11yDesc) || null;
                            if (ariadesc) {
                                view.container.setAttribute("aria-label", ariadesc.replace(/(<([^>]+)>)/gi, ""));
                            }
                            _d = this;
                            return [4 /*yield*/, view.when()];
                        case 4:
                            _d.view = _e.sent();
                            watchUtils_1.whenDefinedOnce(this.view, "extent", function () {
                                _this.initialExtent = _this.view.extent.clone();
                            });
                            return [3 /*break*/, 6];
                        case 5:
                            e_1 = _e.sent();
                            return [2 /*return*/, new Error_1.default({
                                    title: "Error",
                                    message: "Unable to load " + (((_b = this === null || this === void 0 ? void 0 : this.item) === null || _b === void 0 ? void 0 : _b.title) || " the application"),
                                    container: container
                                })];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        LayoutViewModel.prototype.resetExtent = function () {
            if (this.initialExtent)
                this.view.goTo(this.initialExtent).catch(function () { });
        };
        tslib_1.__decorate([
            decorators_1.property({ dependsOn: ["view.ready", "item.loadStatus"], readOnly: true })
        ], LayoutViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "applicationBase", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "item", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayoutViewModel.prototype, "initialExtent", void 0);
        LayoutViewModel = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.LayoutViewModel")
        ], LayoutViewModel);
        return LayoutViewModel;
    }((Accessor)));
    return LayoutViewModel;
});
//# sourceMappingURL=LayoutViewModel.js.map