define(["require", "exports", "tslib", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "../BaseComponent", "./ChartsConfig/ChartsConfigViewModel"], function (require, exports, tslib_1, widget_1, decorators_1, BaseComponent, ChartItemConfigViewModel) {
    "use strict";
    var CSS = {
        base: "esri-chart-item-config"
    };
    var ChartItemConfig = (function (_super) {
        tslib_1.__extends(ChartItemConfig, _super);
        function ChartItemConfig(params) {
            var _this = _super.call(this, params) || this;
            _this._chartItemConfigUpdates = {};
            _this.layerTitle = null;
            _this.chartItemToConfigure = null;
            _this.viewModel = null;
            _this.messages = null;
            return _this;
        }
        ChartItemConfig.prototype.render = function () {
            var _this = this;
            var _a, _b, _c;
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("span", null, this.layerTitle),
                widget_1.tsx("label", null, (_a = this.messages) === null || _a === void 0 ? void 0 :
                    _a.chartName,
                    widget_1.tsx("input", { bind: this, onchange: function (e) {
                            _this._chartItemConfigUpdates["title"] = e.target.value;
                        }, type: "text", value: this.chartItemToConfigure.title })),
                widget_1.tsx("div", { class: "esri-chart-item-config__button-container" },
                    widget_1.tsx("calcite-button", { appearance: "outline", bind: this, onclick: this._cancel }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.cancel),
                    widget_1.tsx("calcite-button", { bind: this, onclick: this._confirm }, (_c = this.messages) === null || _c === void 0 ? void 0 : _c.done))));
        };
        ChartItemConfig.prototype._resetChartItemConfig = function () {
            this._chartItemConfigUpdates = {};
            this.layerTitle = null;
            this.chartItemToConfigure = null;
            this.viewModel.chartItemConfigIsOpen = false;
        };
        ChartItemConfig.prototype._confirm = function () {
            if (this._chartItemConfigUpdates["title"]) {
                this.chartItemToConfigure.title = this._chartItemConfigUpdates["title"];
            }
            var updatedJSON = this.viewModel.toJSON();
            this.viewModel.outputJSON = updatedJSON;
            this._resetChartItemConfig();
        };
        ChartItemConfig.prototype._cancel = function () {
            this._resetChartItemConfig();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartItemConfig.prototype, "layerTitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartItemConfig.prototype, "chartItemToConfigure", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ChartItemConfigViewModel
            })
        ], ChartItemConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartItemConfig.prototype, "messages", void 0);
        ChartItemConfig = tslib_1.__decorate([
            decorators_1.subclass("ChartItemConfig")
        ], ChartItemConfig);
        return ChartItemConfig;
    }(BaseComponent));
    return ChartItemConfig;
});
