define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "./ConfigItem"], function (require, exports, tslib_1, decorators_1, ConfigItem) {
    "use strict";
    var LayerConfigItem = (function (_super) {
        tslib_1.__extends(LayerConfigItem, _super);
        function LayerConfigItem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.outFields = null;
            _this.displayField = null;
            _this.exactMatch = null;
            return _this;
        }
        LayerConfigItem.prototype.toJSON = function () {
            return {
                displayField: this.displayField,
                defaultSource: this.defaultSource,
                exactMatch: this.exactMatch,
                id: this.id,
                maxResults: this.maxResults,
                maxSuggestions: this.maxSuggestions,
                name: this.name,
                outFields: this.outFields,
                placeholder: this.placeholder,
                suggestionsEnabled: this.suggestionsEnabled,
                type: "layer",
                withinViewEnabled: this.withinViewEnabled,
                zoomScale: this.zoomScale
            };
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigItem.prototype, "outFields", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigItem.prototype, "displayField", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigItem.prototype, "exactMatch", void 0);
        LayerConfigItem = tslib_1.__decorate([
            decorators_1.subclass("LayerConfigItem")
        ], LayerConfigItem);
        return LayerConfigItem;
    }(ConfigItem));
    return LayerConfigItem;
});
