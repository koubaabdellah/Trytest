define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent) {
    "use strict";
    var CSS = {
        base: "esri-legend-config",
        disabled: "disabled",
        container: "container"
    };
    var LegendConfig = (function (_super) {
        tslib_1.__extends(LegendConfig, _super);
        function LegendConfig(params) {
            var _this = _super.call(this, params) || this;
            _this._collapsibleBlockProps = {
                collapsible: true,
                open: true
            };
            _this.messages = null;
            return _this;
        }
        Object.defineProperty(LegendConfig.prototype, "outputJSON", {
            get: function () {
                return {
                    style: this.style
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(LegendConfig.prototype, "style", {
            set: function (value) {
                var computedStyle;
                if (this._isStyleObject(value)) {
                    computedStyle = value;
                }
                else if (typeof value === "string") {
                    computedStyle = { type: value };
                }
                this._set("style", computedStyle);
            },
            enumerable: false,
            configurable: true
        });
        LegendConfig.prototype.render = function () {
            var styleOptions = (this === null || this === void 0 ? void 0 : this.style) ? this._renderStyleOptions() : null;
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("div", { theme: this.getTheme() }, styleOptions)));
        };
        LegendConfig.prototype._renderStyleOptions = function () {
            var _a, _b, _c;
            return (widget_1.tsx("div", null,
                this.messages.legendStyleLabel,
                widget_1.tsx("calcite-radio-group", { afterCreate: this._changeStyleType, bind: this },
                    widget_1.tsx("calcite-radio-group-item", { value: "classic", scale: "s", checked: (this.style.type === "classic") ? true : false }, this.messages.classic),
                    widget_1.tsx("calcite-radio-group-item", { value: "card", scale: "s", checked: this.style.type === "card" ? true : false }, this.messages.card)),
                this.messages.legendStyleLayoutLabel,
                widget_1.tsx("calcite-radio-group", { class: this.style.type === "card" ? "" : CSS.disabled, bind: this, afterCreate: this._changeLayoutType },
                    widget_1.tsx("calcite-radio-group-item", { value: "auto", scale: "s", checked: ((_a = this.style) === null || _a === void 0 ? void 0 : _a.layout) === "auto" ? true : false }, this.messages.layoutTypes.auto),
                    widget_1.tsx("calcite-radio-group-item", { value: "stack", scale: "s", checked: ((_b = this.style) === null || _b === void 0 ? void 0 : _b.layout) === "stack" ? true : false }, this.messages.layoutTypes.stack),
                    widget_1.tsx("calcite-radio-group-item", { value: "side-by-side", scale: "s", checked: ((_c = this.style) === null || _c === void 0 ? void 0 : _c.layout) === "side-by-side" ? true : false }, this.messages.layoutTypes.sideBySide))));
        };
        LegendConfig.prototype._changeLayoutType = function (element) {
            var _this = this;
            element.addEventListener("calciteRadioGroupChange", function () {
                _this._set("style", { type: "card", layout: element.selectedItem.value });
            });
        };
        LegendConfig.prototype._changeStyleType = function (element) {
            var _this = this;
            element.addEventListener("calciteRadioGroupChange", function () {
                _this._set("style", tslib_1.__assign(tslib_1.__assign({}, _this.style), { type: element.selectedItem.value }));
            });
        };
        LegendConfig.prototype._isStyleObject = function (style) {
            return style.type !== undefined;
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true,
                dependsOn: ["style"]
            })
        ], LegendConfig.prototype, "outputJSON", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], LegendConfig.prototype, "style", null);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LegendConfig/resources")
        ], LegendConfig.prototype, "messages", void 0);
        LegendConfig = tslib_1.__decorate([
            decorators_1.subclass("esri.widgets.LegendConfig")
        ], LegendConfig);
        return LegendConfig;
    }(BaseComponent));
    return LegendConfig;
});
