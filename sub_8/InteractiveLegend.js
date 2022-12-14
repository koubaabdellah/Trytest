var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "dojo/i18n!./InteractiveLegend/nls/Legend", "esri/widgets/Widget", "esri/core/accessorSupport/decorators", "esri/core/Handles", "esri/core/watchUtils", "./InteractiveLegend/styles/InteractiveClassic", "esri/widgets/Legend/LegendViewModel"], function (require, exports, i18n, Widget, decorators_1, Handles, watchUtils, InteractiveClassic, LegendViewModel) {
    "use strict";
    //----------------------------------
    //
    //  CSS classes
    //
    //----------------------------------
    var CSS = {
        widgetIcon: "esri-icon-layer-list"
    };
    var InteractiveLegend = /** @class */ (function (_super) {
        __extends(InteractiveLegend, _super);
        //-------------------------------------------------------------------
        //
        //  Lifecycle methods
        //
        //-------------------------------------------------------------------
        function InteractiveLegend(params) {
            var _this = _super.call(this, params) || this;
            //--------------------------------------------------------------------------
            //
            //  Variables
            //
            //--------------------------------------------------------------------------
            // _handles
            _this._handles = new Handles();
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            // activeLayerInfos
            _this.activeLayerInfos = null;
            // view
            _this.view = null;
            // viewModel
            _this.viewModel = new LegendViewModel();
            // filterMode
            _this.filterMode = null;
            // basemapLegendVisible
            _this.basemapLegendVisible = false;
            // groundLegendVisible
            _this.groundLegendVisible = false;
            // iconClass
            _this.iconClass = CSS.widgetIcon;
            // label
            _this.label = i18n.widgetLabel;
            // layerInfos
            _this.layerInfos = null;
            // searchExpressions
            _this.searchExpressions = null;
            _this.searchViewModel = null;
            // layerListViewModel
            _this.layerListViewModel = null;
            // onboardingPanelEnabled
            _this.onboardingPanelEnabled = null;
            // offscreen
            _this.offscreen = null;
            _this.opacity = null;
            _this.grayScale = null;
            _this.featureCountEnabled = null;
            _this.updateExtentEnabled = null;
            // style
            _this.style = new InteractiveClassic({
                view: _this.view,
                activeLayerInfos: _this.activeLayerInfos,
                filterMode: _this.filterMode,
                layerListViewModel: _this.layerListViewModel,
                searchViewModel: _this.searchViewModel,
                onboardingPanelEnabled: _this.onboardingPanelEnabled,
                offscreen: _this.offscreen,
                opacity: _this.opacity,
                grayScale: _this.grayScale,
                featureCountEnabled: _this.featureCountEnabled,
                updateExtentEnabled: _this.updateExtentEnabled
            });
            return _this;
        }
        // castStyle
        InteractiveLegend.prototype.castStyle = function (value) {
            if (value instanceof InteractiveClassic) {
                return value;
            }
            if (typeof value === "string") {
                return new InteractiveClassic({
                    view: this.view,
                    activeLayerInfos: this.activeLayerInfos,
                    filterMode: this.filterMode,
                    layerListViewModel: this.layerListViewModel,
                    searchViewModel: this.searchViewModel,
                    onboardingPanelEnabled: this.onboardingPanelEnabled,
                    offscreen: this.offscreen,
                    opacity: this.opacity,
                    grayScale: this.grayScale,
                    featureCountEnabled: this.featureCountEnabled,
                    updateExtentEnabled: this.updateExtentEnabled
                });
            }
            if (value && typeof value.type === "string") {
                var options = __assign({}, value);
                delete options.type;
                var StyleClass = InteractiveClassic;
                return new StyleClass(options);
            }
            return new InteractiveClassic({
                view: this.view,
                activeLayerInfos: this.activeLayerInfos,
                filterMode: this.filterMode,
                layerListViewModel: this.layerListViewModel,
                searchViewModel: this.searchViewModel,
                onboardingPanelEnabled: this.onboardingPanelEnabled,
                offscreen: this.offscreen,
                opacity: this.opacity,
                grayScale: this.grayScale,
                featureCountEnabled: this.featureCountEnabled,
                updateExtentEnabled: this.updateExtentEnabled
            });
        };
        InteractiveLegend.prototype.postInitialize = function () {
            var _this = this;
            var _a = this, style = _a.style, activeLayerInfos = _a.activeLayerInfos, filterMode = _a.filterMode, view = _a.view, layerListViewModel = _a.layerListViewModel;
            this.own([
                watchUtils.on(this, "activeLayerInfos", "change", function () {
                    style.activeLayerInfos = activeLayerInfos;
                    return _this._refreshActiveLayerInfos(activeLayerInfos);
                }),
                watchUtils.init(this, ["view", "filterMode", "layerListViewModel"], function () {
                    style.view = view;
                    style.filterMode = filterMode;
                    style.layerListViewModel = layerListViewModel;
                }),
                watchUtils.init(this, "style", function (value, oldValue) {
                    if (oldValue && value !== oldValue) {
                        oldValue.destroy();
                    }
                    if (value) {
                        value.activeLayerInfos = activeLayerInfos;
                        if (value.type === "card") {
                            value.view = view;
                        }
                    }
                })
            ]);
        };
        InteractiveLegend.prototype.destroy = function () {
            this._handles.destroy();
            this._handles = null;
        };
        InteractiveLegend.prototype.render = function () {
            return this.style.render();
        };
        //--------------------------------------------------------------------------
        //
        //  Private methods
        //
        //-------------------------------------------------------------------
        // _refreshActiveLayerInfos
        InteractiveLegend.prototype._refreshActiveLayerInfos = function (activeLayerInfos) {
            var _this = this;
            this._handles.removeAll();
            activeLayerInfos.forEach(function (activeLayerInfo) {
                return _this._renderOnActiveLayerInfoChange(activeLayerInfo);
            });
            this.scheduleRender();
        };
        // _renderOnActiveLayerInfoChange
        InteractiveLegend.prototype._renderOnActiveLayerInfoChange = function (activeLayerInfo) {
            var _this = this;
            var infoVersionHandle = watchUtils.init(activeLayerInfo, "version", function () {
                return _this.scheduleRender();
            });
            this._handles.add(infoVersionHandle, "version_" + activeLayerInfo.layer.uid);
            activeLayerInfo.children.forEach(function (childActiveLayerInfo) {
                return _this._renderOnActiveLayerInfoChange(childActiveLayerInfo);
            });
        };
        __decorate([
            decorators_1.aliasOf("viewModel.activeLayerInfos")
        ], InteractiveLegend.prototype, "activeLayerInfos", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.view")
        ], InteractiveLegend.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], InteractiveLegend.prototype, "viewModel", void 0);
        __decorate([
            decorators_1.aliasOf("style.filterMode")
        ], InteractiveLegend.prototype, "filterMode", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.basemapLegendVisible")
        ], InteractiveLegend.prototype, "basemapLegendVisible", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.groundLegendVisible")
        ], InteractiveLegend.prototype, "groundLegendVisible", void 0);
        __decorate([
            decorators_1.property()
        ], InteractiveLegend.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], InteractiveLegend.prototype, "label", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.layerInfos")
        ], InteractiveLegend.prototype, "layerInfos", void 0);
        __decorate([
            decorators_1.aliasOf("style.searchExpressions"),
            decorators_1.property()
        ], InteractiveLegend.prototype, "searchExpressions", void 0);
        __decorate([
            decorators_1.aliasOf("style.searchViewModel"),
            decorators_1.property()
        ], InteractiveLegend.prototype, "searchViewModel", void 0);
        __decorate([
            decorators_1.property()
        ], InteractiveLegend.prototype, "layerListViewModel", void 0);
        __decorate([
            decorators_1.aliasOf("style.onboardingPanelEnabled")
        ], InteractiveLegend.prototype, "onboardingPanelEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("style.offscreen")
        ], InteractiveLegend.prototype, "offscreen", void 0);
        __decorate([
            decorators_1.aliasOf("style.opacity")
        ], InteractiveLegend.prototype, "opacity", void 0);
        __decorate([
            decorators_1.aliasOf("style.grayScale")
        ], InteractiveLegend.prototype, "grayScale", void 0);
        __decorate([
            decorators_1.aliasOf("style.featureCountEnabled")
        ], InteractiveLegend.prototype, "featureCountEnabled", void 0);
        __decorate([
            decorators_1.aliasOf("style.updateExtentEnabled")
        ], InteractiveLegend.prototype, "updateExtentEnabled", void 0);
        __decorate([
            decorators_1.property()
        ], InteractiveLegend.prototype, "style", void 0);
        __decorate([
            decorators_1.cast("style")
        ], InteractiveLegend.prototype, "castStyle", null);
        InteractiveLegend = __decorate([
            decorators_1.subclass("InteractiveLegend")
        ], InteractiveLegend);
        return InteractiveLegend;
    }(Widget));
    return InteractiveLegend;
});
//# sourceMappingURL=InteractiveLegend.js.map