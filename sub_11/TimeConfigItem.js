define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators"], function (require, exports, tslib_1, Accessor, decorators_1) {
    "use strict";
    var TimeConfigItem = (function (_super) {
        tslib_1.__extends(TimeConfigItem, _super);
        function TimeConfigItem(params) {
            return _super.call(this, params) || this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeConfigItem.prototype, "id", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeConfigItem.prototype, "increments", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeConfigItem.prototype, "rangeStart", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeConfigItem.prototype, "rangeEnd", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeConfigItem.prototype, "min", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], TimeConfigItem.prototype, "max", void 0);
        TimeConfigItem = tslib_1.__decorate([
            decorators_1.subclass("TimeConfigItem")
        ], TimeConfigItem);
        return TimeConfigItem;
    }(Accessor));
    return TimeConfigItem;
});
