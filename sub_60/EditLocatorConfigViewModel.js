define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "./SearchConfigViewModel"], function (require, exports, tslib_1, decorators_1, Accessor, SearchConfigViewModel) {
    "use strict";
    var EditLocatorConfigViewModel = (function (_super) {
        tslib_1.__extends(EditLocatorConfigViewModel, _super);
        function EditLocatorConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.searchConfigViewModel = null;
            _this.locatorValues = new Map();
            _this.locatorItemIndex = null;
            _this.locatorItemToBeConfigured = null;
            return _this;
        }
        EditLocatorConfigViewModel.prototype.editLocator = function () {
            this._editLocatorConfigItem();
            this._editLocatorSearchSource();
            this.locatorValues.clear();
            this.locatorItemToBeConfigured = null;
            this.locatorItemIndex = null;
            this.searchConfigViewModel.selectedPanel = null;
        };
        EditLocatorConfigViewModel.prototype.cancelLocator = function () {
            this.locatorItemToBeConfigured = null;
            this.locatorItemIndex = null;
            this.locatorValues.clear();
        };
        EditLocatorConfigViewModel.prototype.modifyLocatorMap = function (event) {
            var nodeInput = event.currentTarget;
            var name = nodeInput.getAttribute("name");
            if (nodeInput.getAttribute("type") === "checkbox") {
                this.locatorValues.set(name, nodeInput.checked);
            }
            else if (nodeInput.getAttribute("type") === "number") {
                if (parseFloat(nodeInput.value) < 0) {
                    nodeInput.value = "1";
                }
                this.locatorValues.set(name, nodeInput.value);
            }
            else {
                var value = nodeInput.value;
                this.locatorValues.set(name, value);
            }
        };
        EditLocatorConfigViewModel.prototype._editLocatorConfigItem = function () {
            var _this = this;
            var locatorItemIndex = this.locatorItemIndex;
            var itemToConfigure = this.searchConfigViewModel.configItems.getItemAt(locatorItemIndex);
            this.locatorValues.forEach(function (locatorValue, locatorKey) {
                if (locatorKey === "zoomScale" ||
                    locatorKey === "maxResults" ||
                    locatorKey === "maxSuggestions") {
                    itemToConfigure[locatorKey] = parseInt(locatorValue);
                }
                else if (locatorKey === "minScale" &&
                    itemToConfigure.localSearchEnabled) {
                    itemToConfigure.localSearchOptions.minScale = parseInt(_this.locatorValues.get("minScale"));
                }
                else if (locatorKey === "distance" &&
                    itemToConfigure.localSearchEnabled) {
                    itemToConfigure.localSearchOptions.distance = parseInt(_this.locatorValues.get("distance"));
                }
                else {
                    itemToConfigure[locatorKey] = locatorValue;
                }
            });
            if (this.locatorValues.get("localSearchEnabled") === false) {
                itemToConfigure.localSearchOptions.distance = null;
                itemToConfigure.localSearchOptions.minScale = null;
            }
        };
        EditLocatorConfigViewModel.prototype._editLocatorSearchSource = function () {
            var locatorItemIndex = this.locatorItemIndex;
            var locatorSource = this.searchConfigViewModel.searchViewModel.sources.getItemAt(locatorItemIndex);
            var locatorConfigItem = this.searchConfigViewModel.configItems.getItemAt(locatorItemIndex);
            var locatorJSON = locatorConfigItem.toJSON();
            locatorSource.set(locatorJSON);
        };
        tslib_1.__decorate([
            decorators_1.property({
                type: SearchConfigViewModel
            })
        ], EditLocatorConfigViewModel.prototype, "searchConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLocatorConfigViewModel.prototype, "locatorValues", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLocatorConfigViewModel.prototype, "locatorItemIndex", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLocatorConfigViewModel.prototype, "locatorItemToBeConfigured", void 0);
        EditLocatorConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("EditLocatorConfigViewModel")
        ], EditLocatorConfigViewModel);
        return EditLocatorConfigViewModel;
    }(Accessor));
    return EditLocatorConfigViewModel;
});
