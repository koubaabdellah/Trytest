define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../../configWidgets/BaseComponent", "../../icons/icons"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, icons_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-config-panel__alert"
    };
    var Alert = (function (_super) {
        tslib_1.__extends(Alert, _super);
        function Alert(params) {
            return _super.call(this, params) || this;
        }
        Alert.prototype.render = function () {
            var _a, _b, _c, _d;
            return (widget_1.tsx("calcite-notice", { bind: this, afterUpdate: this._handleAlert, color: "yellow", scale: "m", class: CSS.base, dismissible: "true", "intl-close": (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.configPanelMessages) === null || _b === void 0 ? void 0 : _b.close, icon: icons_1.default.exclamationMarkTriangle },
                widget_1.tsx("div", { slot: "message" }, (_d = (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.error) === null || _d === void 0 ? void 0 : _d.message)));
        };
        Alert.prototype._handleAlert = function (node) {
            var _this = this;
            var _a;
            if ((_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.error) {
                node.active = true;
            }
            else {
                node.active = false;
            }
            node.addEventListener("calciteNoticeClose", function () {
                var _a;
                if ((_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.error) {
                    _this.configPanelViewModel.error = null;
                }
            });
        };
        Alert = tslib_1.__decorate([
            decorators_1.subclass("Alert")
        ], Alert);
        return Alert;
    }(BaseComponent));
    return Alert;
});
