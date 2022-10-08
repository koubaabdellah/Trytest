define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "./ConfigItem"], function (require, exports, tslib_1, decorators_1, ConfigItem) {
    "use strict";
    var LocatorConfigItem = (function (_super) {
        tslib_1.__extends(LocatorConfigItem, _super);
        function LocatorConfigItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.localSearchOptions = null;
            _this.countryCode = null;
            _this.localSearchEnabled = null;
            return _this;
        }
        LocatorConfigItem.prototype.toJSON = function () {
            return {
                countryCode: this.countryCode,
                defaultSource: this.defaultSource,
                id: this.id,
                localSearchEnabled: this.localSearchEnabled,
                localSearchOptions: this.localSearchOptions,
                maxResults: this.maxResults,
                maxSuggestions: this.maxSuggestions,
                name: this.name,
                placeholder: this.placeholder,
                suggestionsEnabled: this.suggestionsEnabled,
                type: "locator",
                withinViewEnabled: this.withinViewEnabled,
                zoomScale: this.zoomScale
            };
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LocatorConfigItem.prototype, "localSearchOptions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LocatorConfigItem.prototype, "countryCode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LocatorConfigItem.prototype, "localSearchEnabled", void 0);
        LocatorConfigItem = tslib_1.__decorate([
            decorators_1.subclass("LocatorConfigItem")
        ], LocatorConfigItem);
        return LocatorConfigItem;
    }(ConfigItem));
    return LocatorConfigItem;
});
