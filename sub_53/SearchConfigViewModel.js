define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "esri/core/watchUtils", "esri/core/Collection", "esri/widgets/Search/SearchViewModel", "./ConfigItem", "./LocatorConfigItem", "./LayerConfigItem"], function (require, exports, tslib_1, decorators_1, Accessor, Handles, watchUtils, Collection, SearchViewModel, ConfigItem, LocatorConfigItem, LayerConfigItem) {
    "use strict";
    var CONFIG_ITEM_COLLECTION = Collection.ofType({
        key: function (value) {
            return value.hasOwnProperty("featureLayer") ? "feature-layer" : "locator";
        },
        base: ConfigItem,
        typeMap: {
            "feature-layer": LayerConfigItem,
            locator: LocatorConfigItem
        }
    });
    var SearchConfigViewModel = (function (_super) {
        tslib_1.__extends(SearchConfigViewModel, _super);
        function SearchConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.configItems = null;
            _this.darkModeEnabled = false;
            _this.selectedPanel = null;
            _this.searchConfigMessages = null;
            _this.shareMessages = null;
            _this.layerSelectorMessages = null;
            _this.searchViewModel = new SearchViewModel();
            return _this;
        }
        SearchConfigViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add([
                watchUtils.init(this, "searchViewModel.sources", function () {
                    var _a;
                    (_a = _this.configItems) === null || _a === void 0 ? void 0 : _a.removeAll();
                    _this._createConfigItems();
                })
            ]);
        };
        SearchConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        SearchConfigViewModel.prototype.toJSON = function () {
            var _this = this;
            var sources = [];
            this.searchViewModel.sources.forEach(function (source) {
                if (source.declaredClass === "esri.widgets.Search.LocatorSearchSource") {
                    var locatorSource = source;
                    var locatorJSON = _this._generateLocatorJSON(locatorSource);
                    sources.push(locatorJSON);
                }
                else {
                    var layerSource = source;
                    var layerJSON = _this._generateLayerJSON(layerSource);
                    sources.push(layerJSON);
                }
            });
            var searchJSON = {
                sources: sources,
                activeSourceIndex: null,
                includeDefaultSources: false
            };
            this._handleDefaultSource(searchJSON);
            return searchJSON;
        };
        SearchConfigViewModel.prototype._createConfigItems = function () {
            var _this = this;
            var sources = this.searchViewModel.sources
                .slice()
                .map(function (sourceItem, sourceItemIndex) {
                if (sourceItem.declaredClass === "esri.widgets.Search.LocatorSearchSource") {
                    return _this._createLocatorConfigItem(sourceItem, sourceItemIndex);
                }
                else {
                    return _this._createLayerConfigItem(sourceItem, sourceItemIndex);
                }
            });
            this.configItems = new CONFIG_ITEM_COLLECTION(sources);
        };
        SearchConfigViewModel.prototype._createLocatorConfigItem = function (sourceItem, sourceItemIndex) {
            var name = sourceItem.name, placeholder = sourceItem.placeholder, zoomScale = sourceItem.zoomScale, suggestionsEnabled = sourceItem.suggestionsEnabled, maxSuggestions = sourceItem.maxSuggestions, maxResults = sourceItem.maxResults, withinViewEnabled = sourceItem.withinViewEnabled, countryCode = sourceItem.countryCode;
            var defaultSource = this.searchViewModel.activeSourceIndex === sourceItemIndex ? true : false;
            var configItem = new LocatorConfigItem({
                id: "" + (new Date().getTime() * Math.random()).toFixed(0).toString(),
                defaultSource: defaultSource,
                type: "locator",
                name: name,
                placeholder: placeholder,
                zoomScale: zoomScale,
                suggestionsEnabled: suggestionsEnabled,
                maxSuggestions: maxSuggestions,
                maxResults: maxResults,
                withinViewEnabled: withinViewEnabled,
                countryCode: countryCode
            });
            return configItem;
        };
        SearchConfigViewModel.prototype._createLayerConfigItem = function (sourceItem, sourceItemIndex) {
            var name = sourceItem.name, placeholder = sourceItem.placeholder, zoomScale = sourceItem.zoomScale, suggestionsEnabled = sourceItem.suggestionsEnabled, maxSuggestions = sourceItem.maxSuggestions, maxResults = sourceItem.maxResults, withinViewEnabled = sourceItem.withinViewEnabled, displayField = sourceItem.displayField, exactMatch = sourceItem.exactMatch, outFields = sourceItem.outFields;
            var defaultSource = this.searchViewModel.activeSourceIndex === sourceItemIndex ? true : false;
            var configItem = new LayerConfigItem({
                id: "" + (new Date().getTime() * Math.random()).toFixed(0).toString(),
                defaultSource: defaultSource,
                type: "layer",
                name: name,
                placeholder: placeholder,
                zoomScale: zoomScale,
                suggestionsEnabled: suggestionsEnabled,
                maxSuggestions: maxSuggestions,
                maxResults: maxResults,
                withinViewEnabled: withinViewEnabled,
                outFields: outFields,
                displayField: displayField,
                exactMatch: exactMatch
            });
            return configItem;
        };
        SearchConfigViewModel.prototype._generateLocatorJSON = function (source) {
            var locatorSource = {
                url: source === null || source === void 0 ? void 0 : source["url"],
                singleLineFieldName: source.singleLineFieldName,
                name: source.name,
                placeholder: source.placeholder,
                maxResults: source.maxResults,
                maxSuggestions: source.maxSuggestions,
                suggestionsEnabled: source.suggestionsEnabled,
                minSuggestCharacters: 1,
                withinViewEnabled: source.withinViewEnabled,
                countryCode: source.countryCode,
                zoomScale: source.zoomScale
            };
            return locatorSource;
        };
        SearchConfigViewModel.prototype._generateLayerJSON = function (source) {
            var layer = source.layer;
            var featureLayer = layer;
            var popupTemplate = this._getPopupTemplate(featureLayer);
            var popupTemplateJSON = popupTemplate ? popupTemplate.toJSON() : null;
            var popupEnabled = layer.get("popupEnabled");
            var popupEnabledVal = popupEnabled ? popupEnabled : false;
            var layerSource = {
                displayField: source.displayField,
                exactMatch: source.exactMatch,
                layer: {
                    url: featureLayer.url,
                    id: layer.id
                },
                maxResults: source.maxResults,
                maxSuggestions: source.maxSuggestions,
                name: source.name,
                outFields: (source === null || source === void 0 ? void 0 : source.outFields) ? tslib_1.__spreadArrays(source === null || source === void 0 ? void 0 : source.outFields) : null,
                searchFields: (source === null || source === void 0 ? void 0 : source.outFields) ? tslib_1.__spreadArrays(source === null || source === void 0 ? void 0 : source.outFields) : null,
                placeholder: source.placeholder,
                suggestionsEnabled: source.suggestionsEnabled,
                withinViewEnabled: source.withinViewEnabled,
                zoomScale: source.zoomScale,
                popupTemplate: popupTemplateJSON,
                popupEnabled: popupEnabledVal
            };
            return layerSource;
        };
        SearchConfigViewModel.prototype._getPopupTemplate = function (layer) {
            if (!layer) {
                return;
            }
            return layer.get("popupTemplate");
        };
        SearchConfigViewModel.prototype._handleDefaultSource = function (searchJSON) {
            var activeSourceIndex = this.searchViewModel.sources.length === 1
                ? 0
                : this.searchViewModel.activeSourceIndex;
            searchJSON.activeSourceIndex = activeSourceIndex;
        };
        tslib_1.__decorate([
            decorators_1.property({
                type: CONFIG_ITEM_COLLECTION
            })
        ], SearchConfigViewModel.prototype, "configItems", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchConfigViewModel.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchConfigViewModel.prototype, "selectedPanel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchConfigViewModel.prototype, "searchConfigMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchConfigViewModel.prototype, "shareMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchConfigViewModel.prototype, "layerSelectorMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: SearchViewModel
            })
        ], SearchConfigViewModel.prototype, "searchViewModel", void 0);
        SearchConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("SearchConfigViewModel")
        ], SearchConfigViewModel);
        return SearchConfigViewModel;
    }(Accessor));
    return SearchConfigViewModel;
});
