define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor) {
    "use strict";
    var HelpCategoryItem = (function (_super) {
        tslib_1.__extends(HelpCategoryItem, _super);
        function HelpCategoryItem(params) {
            return _super.call(this, params) || this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpCategoryItem.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpCategoryItem.prototype, "infos", void 0);
        HelpCategoryItem = tslib_1.__decorate([
            decorators_1.subclass("HelpCategoryItem")
        ], HelpCategoryItem);
        return HelpCategoryItem;
    }(Accessor));
    return HelpCategoryItem;
});
