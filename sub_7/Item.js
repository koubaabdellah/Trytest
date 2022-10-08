define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators"], function (require, exports, tslib_1, Accessor, decorators_1) {
    "use strict";
    var Item = (function (_super) {
        tslib_1.__extends(Item, _super);
        function Item(params) {
            var _this = _super.call(this, params) || this;
            _this.addType = null;
            _this.visible = true;
            _this.customThumbnail = false;
            _this.customThumbnailType = "url";
            _this.openLinksInApp = false;
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "id", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "title", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "description", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "url", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "thumbnail", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "addType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "visible", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "editorID", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "hideDescription", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "liveItemDetails", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "file", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "customThumbnail", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "customThumbnailFile", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "customThumbnailType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Item.prototype, "openLinksInApp", void 0);
        Item = tslib_1.__decorate([
            decorators_1.subclass("Item")
        ], Item);
        return Item;
    }(Accessor));
    return Item;
});
