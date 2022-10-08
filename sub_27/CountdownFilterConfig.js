define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "../FilterConfig/FilterConfig", "../../utils/utils"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, FilterConfig, utils_1) {
    "use strict";
    var CSS = {
        base: "countdown-filter-config",
        filterLabel: "countdown-filter-config__filter-label",
        section: "countdown-filter-config__section"
    };
    var CountdownFilterConfig = (function (_super) {
        tslib_1.__extends(CountdownFilterConfig, _super);
        function CountdownFilterConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.filterMessages = null;
            return _this;
        }
        CountdownFilterConfig.prototype.postInitialize = function () {
            var _this = this;
            var _a, _b, _c;
            this.filters = utils_1.getDefaultValue({
                fieldName: "globalFilter",
                defaultValue: null
            }, { type: "setting", id: "globalFilter" }, (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values);
            this.filterConfig = new FilterConfig({
                configPanelViewModel: this.configPanelViewModel,
                input: (_c = this.filters) === null || _c === void 0 ? void 0 : _c.layerExpressions,
                hideCustomFeatures: true,
                map: this.map
            });
            this.own([
                this.watch("map", function () {
                    if (_this.filterConfig) {
                        _this.filterConfig.destroy();
                    }
                    _this.configPanelViewModel.handleDraftData("globalFilter", null);
                    _this.filterConfig = new FilterConfig({
                        configPanelViewModel: _this.configPanelViewModel,
                        input: null,
                        hideCustomFeatures: true,
                        map: _this.map
                    });
                }),
                this.filterConfig.watch("outputJSON", function (output) {
                    _this.configPanelViewModel.handleDraftData("globalFilter", output);
                })
            ]);
        };
        CountdownFilterConfig.prototype.render = function () {
            var _a;
            return widget_1.tsx("div", { class: CSS.base }, (_a = this.filterConfig) === null || _a === void 0 ? void 0 : _a.render());
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownFilterConfig.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownFilterConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownFilterConfig.prototype, "filterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownFilterConfig.prototype, "filters", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/CountdownSectionsConfig/resources")
        ], CountdownFilterConfig.prototype, "filterMessages", void 0);
        CountdownFilterConfig = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.CountdownFilterConfig")
        ], CountdownFilterConfig);
        return CountdownFilterConfig;
    }(BaseComponent));
    return CountdownFilterConfig;
});
