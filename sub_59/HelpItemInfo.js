define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor) {
    "use strict";
    var HelpItemInfo = (function (_super) {
        tslib_1.__extends(HelpItemInfo, _super);
        function HelpItemInfo(params) {
            var _this = _super.call(this, params) || this;
            _this.indicator = false;
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "title", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "subtitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "description", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "imgSrc", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "imgAlt", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "indicator", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "categoryType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpItemInfo.prototype, "id", void 0);
        HelpItemInfo = tslib_1.__decorate([
            decorators_1.subclass("HelpItemInfo")
        ], HelpItemInfo);
        return HelpItemInfo;
    }(Accessor));
    return HelpItemInfo;
});
