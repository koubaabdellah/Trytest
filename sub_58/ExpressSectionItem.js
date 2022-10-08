define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor) {
    "use strict";
    var ExpressSubsectionItem = (function (_super) {
        tslib_1.__extends(ExpressSubsectionItem, _super);
        function ExpressSubsectionItem(params) {
            return _super.call(this, params) || this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressSubsectionItem.prototype, "title", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressSubsectionItem.prototype, "subtitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressSubsectionItem.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressSubsectionItem.prototype, "tip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressSubsectionItem.prototype, "settings", void 0);
        ExpressSubsectionItem = tslib_1.__decorate([
            decorators_1.subclass("ExpressSubsectionItem")
        ], ExpressSubsectionItem);
        return ExpressSubsectionItem;
    }(Accessor));
    return ExpressSubsectionItem;
});
