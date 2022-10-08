define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators"], function (require, exports, tslib_1, Accessor, decorators_1) {
    "use strict";
    var ChartItem = (function (_super) {
        tslib_1.__extends(ChartItem, _super);
        function ChartItem(params) {
            var _this = _super.call(this, params) || this;
            _this.visible = true;
            return _this;
        }
        ChartItem.prototype.toJSON = function () {
            return {
                id: this.id,
                title: this.title,
                visible: this.visible
            };
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartItem.prototype, "id", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartItem.prototype, "title", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartItem.prototype, "visible", void 0);
        ChartItem = tslib_1.__decorate([
            decorators_1.subclass("ChartItem")
        ], ChartItem);
        return ChartItem;
    }(Accessor));
    return ChartItem;
});
