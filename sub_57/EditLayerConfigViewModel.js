define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/watchUtils", "esri/core/Handles", "./SearchConfigViewModel"], function (require, exports, tslib_1, decorators_1, Accessor, watchUtils, Handles, SearchConfigViewModel) {
    "use strict";
    var EditLayerConfigViewModel = (function (_super) {
        tslib_1.__extends(EditLayerConfigViewModel, _super);
        function EditLayerConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.searchConfigViewModel = null;
            _this.layerValues = new Map();
            _this.layerItemIndex = null;
            _this.layerItemToBeConfigured = null;
            return _this;
        }
        EditLayerConfigViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add([
                watchUtils.init(this, "layerItemIndex", function () {
                    if (!_this.searchConfigViewModel) {
                        return;
                    }
                    _this.layerValues.set("outFields", []);
                    _this.layerItemToBeConfigured = _this.searchConfigViewModel.configItems.getItemAt(_this.layerItemIndex);
                    _this._createOutFields();
                })
            ]);
        };
        EditLayerConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        EditLayerConfigViewModel.prototype.editLayer = function () {
            this._editLayerConfigItem();
            this._editLayerSearchSource();
            this.layerValues.clear();
            this.layerItemToBeConfigured = null;
            this.layerItemIndex = null;
            this.searchConfigViewModel.selectedPanel = null;
        };
        EditLayerConfigViewModel.prototype.cancelLayerEdit = function () {
            this.layerItemToBeConfigured = null;
            this.layerItemIndex = null;
            this.layerValues.clear();
        };
        EditLayerConfigViewModel.prototype.modifyLayerMap = function (event) {
            var nodeInput = event.currentTarget;
            var name = nodeInput.getAttribute("name");
            if (nodeInput.getAttribute("type") === "checkbox") {
                this.layerValues.set(name, nodeInput.checked);
            }
            else if (nodeInput.getAttribute("type") === "number") {
                if (parseFloat(nodeInput.value) < 0) {
                    nodeInput.value = "1";
                }
                this.layerValues.set(name, nodeInput.value);
            }
            else {
                var value = nodeInput.value;
                this.layerValues.set(name, value);
            }
        };
        EditLayerConfigViewModel.prototype._editLayerConfigItem = function () {
            var layerItemIndex = this.layerItemIndex;
            var itemToConfigure = this.searchConfigViewModel.configItems.getItemAt(layerItemIndex);
            this.layerValues.forEach(function (layerValue, layerKey) {
                if (layerKey === "zoomScale" ||
                    layerKey === "maxResults" ||
                    layerKey === "maxSuggestions") {
                    itemToConfigure[layerKey] = parseInt(layerValue);
                    return;
                }
                itemToConfigure[layerKey] = layerValue;
            });
        };
        EditLayerConfigViewModel.prototype._editLayerSearchSource = function () {
            var layerItemIndex = this.layerItemIndex;
            var layerSource = this.searchConfigViewModel.searchViewModel.sources.getItemAt(layerItemIndex);
            var layerConfigItem = this.searchConfigViewModel.configItems.getItemAt(layerItemIndex);
            var layerJSON = layerConfigItem.toJSON();
            layerSource.set(layerJSON);
        };
        EditLayerConfigViewModel.prototype._createOutFields = function () {
            if (!this.layerItemToBeConfigured) {
                return;
            }
            var outFields = this.layerItemToBeConfigured.outFields;
            if (!outFields) {
                return;
            }
            var outFieldValues = this.layerValues.get("outFields");
            outFields.forEach(function (outField) {
                outFieldValues.push(outField);
            });
            this._setSearchFieldValue(outFieldValues);
        };
        EditLayerConfigViewModel.prototype._setSearchFieldValue = function (outFieldValues) {
            var svmLayerSources = this.searchConfigViewModel.searchViewModel.sources;
            var svmSourceItem = svmLayerSources.getItemAt(this.layerItemIndex);
            var searchFields = svmSourceItem.layer.fields;
            if (!searchFields) {
                return;
            }
            if (this.layerValues.get("searchField") === undefined &&
                outFieldValues.indexOf(searchFields[0].name) === -1) {
                this.layerValues.set("searchField", searchFields[0].name);
            }
        };
        tslib_1.__decorate([
            decorators_1.property({
                type: SearchConfigViewModel
            })
        ], EditLayerConfigViewModel.prototype, "searchConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLayerConfigViewModel.prototype, "layerValues", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLayerConfigViewModel.prototype, "layerItemIndex", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLayerConfigViewModel.prototype, "layerItemToBeConfigured", void 0);
        EditLayerConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("EditLayerConfigViewModel")
        ], EditLayerConfigViewModel);
        return EditLayerConfigViewModel;
    }(Accessor));
    return EditLayerConfigViewModel;
});
