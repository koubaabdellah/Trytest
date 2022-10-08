define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "../../../icons/icons"], function (require, exports, tslib_1, decorators_1, Accessor, icons_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var AppAlertConfig = (function (_super) {
        tslib_1.__extends(AppAlertConfig, _super);
        function AppAlertConfig(params) {
            var _this = _super.call(this, params) || this;
            _this.icon = icons_1.default.exclamationMarkTriangle;
            _this.color = "yellow";
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], AppAlertConfig.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AppAlertConfig.prototype, "icon", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AppAlertConfig.prototype, "color", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AppAlertConfig.prototype, "link", void 0);
        AppAlertConfig = tslib_1.__decorate([
            decorators_1.subclass("AppAlertConfig")
        ], AppAlertConfig);
        return AppAlertConfig;
    }(Accessor));
    return AppAlertConfig;
});
