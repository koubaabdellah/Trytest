define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Collection", "esri/layers/FeatureLayer", "esri/layers/SceneLayer", "esri/core/Handles", "esri/core/watchUtils", "esri/request", "esri/widgets/Search/LocatorSearchSource", "esri/widgets/Search/LayerSearchSource", "./LocatorConfigItem", "./LayerConfigItem", "../../../utils/url/urlUtils"], function (require, exports, tslib_1, decorators_1, Accessor, Collection, FeatureLayer, SceneLayer, Handles, watchUtils, esriRequest, LocatorSearchSource, LayerSearchSource, LocatorConfigItem, LayerConfigItem, urlUtils_1) {
    "use strict";
    var AddSourceViewModel = (function (_super) {
        tslib_1.__extends(AddSourceViewModel, _super);
        function AddSourceViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._urlRequest = null;
            _this.searchConfigViewModel = null;
            _this.existingLocatorSources = new Collection();
            _this.existingLayerSources = new Collection();
            _this.sourceToBeAdded = null;
            return _this;
        }
        Object.defineProperty(AddSourceViewModel.prototype, "state", {
            get: function () {
                var sourceToBeAdded = this.sourceToBeAdded;
                return sourceToBeAdded
                    ? "ready"
                    : this._urlRequest
                        ? "requesting"
                        : "inactive";
            },
            enumerable: false,
            configurable: true
        });
        AddSourceViewModel.prototype.initialize = function () {
            var _this = this;
            var storeSourcesKey = "store-sources";
            this._handles.add([
                watchUtils.init(this, "searchConfigViewModel", function () {
                    if (!_this.searchConfigViewModel) {
                        return;
                    }
                    _this._handles.remove(storeSourcesKey);
                    _this._handles.add([
                        watchUtils.when(_this, "searchConfigViewModel.searchViewModel.view.map.loaded", function () {
                            _this._handles.add(watchUtils.init(_this, "searchConfigViewModel.searchViewModel.view.map.allLayers.length", _this._storeLayerSources), storeSourcesKey);
                        }),
                        watchUtils.init(_this, "searchConfigViewModel.searchViewModel.portal.helperServices", _this._storeLocatorSources)
                    ], storeSourcesKey);
                })
            ]);
        };
        AddSourceViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        AddSourceViewModel.prototype.handleAddSelectedExistingItem = function (event) {
            var existingItemNode = event.currentTarget;
            var sourceType = existingItemNode.getAttribute("type");
            var sourceIndex = parseInt(existingItemNode.getAttribute("data-child-index"));
            if (sourceType === "locator") {
                var locator = this.existingLocatorSources.getItemAt(sourceIndex);
                this.sourceToBeAdded = locator;
            }
            else if (sourceType === "layer") {
                var layer = this.existingLayerSources.getItemAt(sourceIndex);
                this.sourceToBeAdded = layer;
            }
        };
        AddSourceViewModel.prototype.addSource = function () {
            var featureLayer = this.sourceToBeAdded;
            if (featureLayer.hasOwnProperty("layerId")) {
                this.searchConfigViewModel.configItems.add(this._generateLayerConfigItem(featureLayer));
                this._generateLayerSource(featureLayer);
            }
            else {
                var locator = this.sourceToBeAdded;
                this.searchConfigViewModel.configItems.add(this._handleAddLocator(locator));
            }
            this.sourceToBeAdded = null;
        };
        AddSourceViewModel.prototype.verifyLocatorUrl = function (event) {
            var _this = this;
            var urlInput = event.currentTarget;
            this._urlRequest = esriRequest(urlInput.value, {
                query: {
                    url: urlInput.value,
                    f: "json"
                }
            });
            this.notifyChange("state");
            if (urlUtils_1.isHTTP(urlInput.value)) {
                return this._rejectUrlVerification("HTTP URLs are not supported. Please use HTTPS.");
            }
            return this._urlRequest
                .catch(function (error) {
                return _this._rejectUrlVerification(error);
            })
                .then(function (source) {
                if (!source.hasOwnProperty("data")) {
                    return _this._rejectUrlVerification("Invalid URL");
                }
                if (source.data.hasOwnProperty("locatorProperties")) {
                    _this._urlRequest = null;
                    _this.notifyChange("state");
                    return Promise.resolve(source);
                }
                else {
                    return _this._rejectUrlVerification("Invalid URL");
                }
            });
        };
        AddSourceViewModel.prototype.verifyLayerUrl = function (event) {
            var _this = this;
            var urlInput = event.currentTarget;
            this._urlRequest = esriRequest(urlInput.value, {
                query: {
                    url: urlInput.value,
                    f: "json"
                }
            });
            this.notifyChange("state");
            if (urlUtils_1.isHTTP(urlInput.value)) {
                return this._rejectUrlVerification("HTTP URLs are not supported. Please use HTTPS.");
            }
            return this._urlRequest
                .catch(function (error) {
                return _this._rejectUrlVerification(error);
            })
                .then(function (source) {
                if (!source.hasOwnProperty("data")) {
                    return _this._rejectUrlVerification("Invalid URL");
                }
                if (source.data.hasOwnProperty("layers") ||
                    source.data.hasOwnProperty("fields")) {
                    return _this._loadLayerSource(source);
                }
                else {
                    return _this._rejectUrlVerification("Invalid URL");
                }
            });
        };
        AddSourceViewModel.prototype._handleAddLocator = function (locatorData) {
            var sources = this.searchConfigViewModel.searchViewModel.sources;
            if (locatorData.hasOwnProperty("data")) {
                var LocatorName = locatorData.data.locatorProperties.LocatorName;
                var name_1 = locatorData.data.singleLineAddressField.name;
                sources.add(this._generateLocatorSource(null, locatorData.url, LocatorName, name_1));
                return this._generateLocatorConfigItem(LocatorName);
            }
            sources.add(this._generateLocatorSource(locatorData));
            var name = locatorData.name;
            return this._generateLocatorConfigItem(name);
        };
        AddSourceViewModel.prototype._storeLocatorSources = function () {
            var _this = this;
            var portal = this.searchConfigViewModel.searchViewModel.get("portal");
            if (!portal.helperServices) {
                return;
            }
            var locators = portal.helperServices.geocode;
            if (!locators) {
                return;
            }
            this.existingLocatorSources = new Collection();
            locators.map(function (locator) {
                if (locator.placefinding === false) {
                    return;
                }
                _this.existingLocatorSources.add(locator);
            });
        };
        AddSourceViewModel.prototype._storeLayerSources = function () {
            var _this = this;
            var view = this.searchConfigViewModel.searchViewModel.view;
            if (!view) {
                return;
            }
            var allLayers = this.searchConfigViewModel.searchViewModel.view.map.allLayers;
            this.existingLayerSources.removeAll();
            var layerLoadPromises = [];
            allLayers.forEach(function (layer) {
                if (layer.type === "feature" || layer.type === "scene") {
                    layerLoadPromises.push(layer.load());
                }
            });
            Promise.all(layerLoadPromises)
                .catch(function (err) {
                console.error("ERROR: ", err);
            })
                .then(function (res) {
                var layersToAdd = res === null || res === void 0 ? void 0 : res.filter(function (layer) { return !_this.existingLayerSources.includes(layer); });
                _this.existingLayerSources.addMany(layersToAdd);
            });
        };
        AddSourceViewModel.prototype._generateLocatorConfigItem = function (locatorName) {
            var locatorConfig = new LocatorConfigItem({
                id: "" + (new Date().getTime() * Math.random()).toFixed(0).toString(),
                defaultSource: false,
                type: "locator",
                name: locatorName,
                placeholder: locatorName,
                zoomScale: null,
                suggestionsEnabled: true,
                maxSuggestions: 6,
                maxResults: 6,
                withinViewEnabled: false,
                countryCode: ""
            });
            return locatorConfig;
        };
        AddSourceViewModel.prototype._generateLayerConfigItem = function (layer) {
            var layerConfig = new LayerConfigItem({
                id: "" + (new Date().getTime() * Math.random()).toFixed(0).toString(),
                defaultSource: false,
                type: "layer",
                name: decodeURI(layer.title),
                placeholder: decodeURI(layer.title),
                zoomScale: null,
                suggestionsEnabled: true,
                maxSuggestions: 6,
                maxResults: 6,
                withinViewEnabled: false,
                outFields: [],
                displayField: layer.displayField,
                exactMatch: false
            });
            return layerConfig;
        };
        AddSourceViewModel.prototype._generateLocatorSource = function (locator, locatorUrl, locatorName, locatorSingleLineFieldName) {
            var name = locator ? locator.name : locatorName;
            var url = locator ? locator.url : locatorUrl;
            var singleLineFieldName = locatorSingleLineFieldName ? locatorSingleLineFieldName : null;
            var config = {
                name: name,
                autoNavigate: true,
                maxResults: 6,
                maxSuggestions: 6,
                minSuggestCharacters: 1,
                outFields: [],
                placeholder: name,
                popupEnabled: true,
                suggestionsEnabled: true,
                withinViewEnabled: false,
                categories: [],
                countryCode: "",
                url: url,
                singleLineFieldName: singleLineFieldName,
                zoomScale: null
            };
            return new LocatorSearchSource(config);
        };
        AddSourceViewModel.prototype._generateLayerSource = function (layerItem) {
            var searchFields = [];
            layerItem.fields.forEach(function (field) {
                searchFields.push(field.name);
            });
            var layerSource = new LayerSearchSource({
                name: decodeURI(layerItem.title),
                autoNavigate: true,
                maxResults: 6,
                maxSuggestions: 6,
                minSuggestCharacters: 1,
                outFields: [],
                placeholder: decodeURI(layerItem.title),
                popupEnabled: layerItem.popupEnabled,
                suggestionsEnabled: true,
                withinViewEnabled: false,
                displayField: layerItem.displayField,
                exactMatch: false,
                layer: layerItem,
                searchFields: tslib_1.__spreadArrays(searchFields),
                suggestionTemplate: layerItem.displayField,
                zoomScale: null
            });
            this.searchConfigViewModel.searchViewModel.sources.add(layerSource);
        };
        AddSourceViewModel.prototype._loadLayerSource = function (source) {
            var _this = this;
            var layer = source.url.indexOf("SceneServer") !== -1
                ? new SceneLayer({
                    url: source.url
                })
                : new FeatureLayer({
                    url: source.url
                });
            return layer
                .load()
                .catch(function (err) {
                return _this._rejectUrlVerification(err);
            })
                .then(function (layer) {
                _this._urlRequest = null;
                _this.notifyChange("state");
                return Promise.resolve(layer);
            });
        };
        AddSourceViewModel.prototype._rejectUrlVerification = function (error) {
            console.error("ERROR: ", error);
            this._urlRequest = null;
            this.notifyChange("state");
            return Promise.reject(error);
        };
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["sourceToBeAdded"],
                readOnly: true
            })
        ], AddSourceViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], AddSourceViewModel.prototype, "searchConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AddSourceViewModel.prototype, "existingLocatorSources", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AddSourceViewModel.prototype, "existingLayerSources", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AddSourceViewModel.prototype, "sourceToBeAdded", void 0);
        AddSourceViewModel = tslib_1.__decorate([
            decorators_1.subclass("AddSourceViewModel")
        ], AddSourceViewModel);
        return AddSourceViewModel;
    }(Accessor));
    return AddSourceViewModel;
});
