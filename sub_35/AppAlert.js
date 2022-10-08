define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "./AppAlert/AppAlertViewModel", "../../utils/shadowRootUtils"], function (require, exports, tslib_1, Widget_1, widget_1, decorators_1, AppAlertViewModel, shadowRootUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var AppAlert = (function (_super) {
        tslib_1.__extends(AppAlert, _super);
        function AppAlert(params) {
            var _this = _super.call(this, params) || this;
            _this.messages = null;
            _this.configPanelViewModel = null;
            _this.viewModel = new AppAlertViewModel();
            return _this;
        }
        AppAlert.prototype.render = function () {
            var _a;
            var _b = this.viewModel.appAlertConfig, icon = _b.icon, color = _b.color, type = _b.type;
            var shadowRootStyles = this._getShadowRootStyles(color);
            var messages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a[type];
            var title = this._renderTitle(messages);
            var message = this._renderMessage(messages);
            var calciteLink = this._renderCalciteLink(messages);
            return (widget_1.tsx("calcite-alert", { key: "app-alert", afterCreate: function (node) {
                    shadowRootUtils_1.handleShadowRootStyles(node, shadowRootStyles);
                }, scale: "m", icon: icon, color: color, active: this.viewModel.displayAlert },
                title,
                message,
                calciteLink));
        };
        AppAlert.prototype._renderTitle = function (messages) {
            return widget_1.tsx("div", { slot: "title" }, messages === null || messages === void 0 ? void 0 : messages.title);
        };
        AppAlert.prototype._renderMessage = function (messages) {
            return widget_1.tsx("div", { slot: "message" }, messages === null || messages === void 0 ? void 0 : messages.message);
        };
        AppAlert.prototype._renderCalciteLink = function (messages) {
            var link = this.viewModel.appAlertConfig.link;
            var linkTitle = messages === null || messages === void 0 ? void 0 : messages.linkTitle;
            return linkTitle ? (widget_1.tsx("calcite-link", { slot: "link", title: linkTitle, href: link, target: "_blank" }, linkTitle)) : null;
        };
        AppAlert.prototype._getShadowRootStyles = function (color) {
            return ":host([color=\"" + color + "\"]) .container { position: absolute; }";
        };
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/AppAlert/resources")
        ], AppAlert.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], AppAlert.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: AppAlertViewModel
            })
        ], AppAlert.prototype, "viewModel", void 0);
        AppAlert = tslib_1.__decorate([
            decorators_1.subclass("AppAlert")
        ], AppAlert);
        return AppAlert;
    }(Widget_1.default));
    return AppAlert;
});
