define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor) {
    "use strict";
    var ConfigItem = (function (_super) {
        tslib_1.__extends(ConfigItem, _super);
        function ConfigItem(params) {
            var _this = _super.call(this, params) || this;
            _this.id = null;
            _this.defaultSource = null;
            _this.type = null;
            _this.name = null;
            _this.placeholder = null;
            _this.zoomScale = null;
            _this.suggestionsEnabled = null;
            _this.maxSuggestions = null;
            _this.maxResults = null;
            _this.withinViewEnabled = null;
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "id", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "defaultSource", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "name", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "placeholder", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "zoomScale", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "suggestionsEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "maxSuggestions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "maxResults", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigItem.prototype, "withinViewEnabled", void 0);
        ConfigItem = tslib_1.__decorate([
            decorators_1.subclass("ConfigItem")
        ], ConfigItem);
        return ConfigItem;
    }(Accessor));
    return ConfigItem;
});
