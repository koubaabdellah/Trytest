define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "esri/core/watchUtils", "esri/widgets/Search", "esri/widgets/Search/LocatorSearchSource", "esri/widgets/Search/LayerSearchSource", "esri/views/MapView", "esri/views/SceneView", "esri/layers/FeatureLayer", "esri/WebMap", "esri/WebScene", "esri/portal/PortalItem", "../../../configWidgets/SearchConfig/SearchConfig", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Accessor, Handles, watchUtils, Search, LocatorSearchSource, LayerSearchSource, MapView, SceneView, FeatureLayer, WebMap, WebScene, PortalItem, SearchConfig, watchUtils_1) {
    "use strict";
    function isArcGISWorldGeocoder(url) {
        if (!url) {
            return false;
        }
        return (_matchesArcGISWorldGeocoder(url) || _matchesProxiedArcGISWorldGeocoder(url));
    }
    function _matchesArcGISWorldGeocoder(url) {
        return /(?:arcgis\.com\/arcgis\/rest\/services\/world\/geocodeserver).*/gi.test(url);
    }
    function _matchesProxiedArcGISWorldGeocoder(url) {
        return /(?:\/servers\/[\da-z\.-]+\/rest\/services\/world\/geocodeserver).*/gi.test(url);
    }
    var InteractivityViewModel = (function (_super) {
        tslib_1.__extends(InteractivityViewModel, _super);
        function InteractivityViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._sourceHandles = new Handles();
            _this._search = null;
            _this.configPanelViewModel = null;
            _this.searchConfig = null;
            _this.messages = null;
            return _this;
        }
        InteractivityViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add([
                watchUtils.whenOnce(this, "configPanelViewModel.templateAppData", function () {
                    watchUtils.whenOnce(_this, "messages", function () {
                        _this._handleSearchConfig();
                    });
                }),
                watchUtils.whenOnce(this, "configPanelViewModel.sections", function () {
                    _this._setMapIdWatcher();
                })
            ]);
        };
        InteractivityViewModel.prototype.destroy = function () {
            this.searchConfig.destroy();
            this.searchConfig = null;
            this._search.destroy();
            this._search = null;
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        InteractivityViewModel.prototype.resetSearchConfig = function () {
            this._handles.removeAll();
            this._handleSearchConfig();
        };
        InteractivityViewModel.prototype._handleSearchConfig = function () {
            var _this = this;
            this._handles.add([
                watchUtils_1.whenOnce(this, "configPanelViewModel.configSettings.configSettingsMap.configWidgetManager", function () {
                    var searchConfigObj = _this.configPanelViewModel.allSettings.find(function (setting) { return (setting === null || setting === void 0 ? void 0 : setting.fieldName) === "searchConfiguration"; });
                    if (!searchConfigObj) {
                        return;
                    }
                    _this._createSearchConfig();
                    _this._handles.add([
                        _this._handleSearchConfigItemsInit(),
                        _this._handleSearchConfigItemsChange(),
                        watchUtils.whenDefinedOnce(_this, "searchConfig.searchViewModel.activeSourceIndex", function () {
                            _this._handles.add(watchUtils.watch(_this, "searchConfig.searchViewModel.activeSourceIndex", function () {
                                var JSON = _this.searchConfig.toJSON();
                                _this._handleSearchConfigJSON(JSON);
                            }));
                        })
                    ]);
                })
            ]);
        };
        InteractivityViewModel.prototype._createSearchConfig = function () {
            var _a, _b, _c, _d, _e;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var includeDefaultLocators, id, portal, view, values, draftSearchConfig, publishedSearchConfig, locators, locatorSources, searchConfigJSON;
                var _this = this;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            includeDefaultLocators = (_c = (_b = (_a = this.configPanelViewModel.configSettings
                                .configSettingsMap.configWidgetManager) === null || _a === void 0 ? void 0 : _a.searchConfigJSON) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.includeDefaultLocators;
                            id = this.configPanelViewModel.getMapId();
                            portal = this.configPanelViewModel.templateAppItem.portal;
                            return [4, this._getView(id, portal)];
                        case 1:
                            view = _f.sent();
                            values = (_d = this.configPanelViewModel.templateAppData) === null || _d === void 0 ? void 0 : _d.values;
                            draftSearchConfig = (_e = values === null || values === void 0 ? void 0 : values.draft) === null || _e === void 0 ? void 0 : _e.searchConfiguration;
                            publishedSearchConfig = values === null || values === void 0 ? void 0 : values.searchConfiguration;
                            locators = portal.get("helperServices.geocode");
                            locatorSources = includeDefaultLocators === false
                                ? locators
                                    .map(function (locator) {
                                    var source = LocatorSearchSource.fromJSON(locator);
                                    if (_matchesArcGISWorldGeocoder(source.url)) {
                                        source.set({
                                            name: source.name,
                                            singleLineFieldName: source.singleLineFieldName ? source.singleLineFieldName : null,
                                            outFields: ["Addr_type", "Match_addr", "StAddr", "City"],
                                            placeholder: (source === null || source === void 0 ? void 0 : source.placeholder) ? source.placeholder
                                                : _this.messages.searchPlaceholder,
                                            defaultZoomScale: 2500
                                        });
                                        return source;
                                    }
                                })
                                    .filter(Boolean)
                                : locators
                                    .map(function (locator) {
                                    if (locator.placefinding === false) {
                                        return;
                                    }
                                    var source = LocatorSearchSource.fromJSON(locator);
                                    if (isArcGISWorldGeocoder(source.url)) {
                                        source.set({
                                            name: source.name,
                                            singleLineFieldName: source.singleLineFieldName ? source.singleLineFieldName : null,
                                            outFields: ["Addr_type", "Match_addr", "StAddr", "City"],
                                            placeholder: (source === null || source === void 0 ? void 0 : source.placeholder) ? source.placeholder
                                                : _this.messages.searchPlaceholder,
                                            defaultZoomScale: 2500
                                        });
                                    }
                                    return source;
                                })
                                    .filter(Boolean);
                            searchConfigJSON = draftSearchConfig
                                ? draftSearchConfig
                                : publishedSearchConfig
                                    ? publishedSearchConfig
                                    : { sources: tslib_1.__spreadArrays(locatorSources) };
                            watchUtils_1.whenTrueOnce(view, "map.loaded", function () {
                                var sources = _this._createSearchSources(searchConfigJSON, view);
                                _this._search = new Search({
                                    view: view,
                                    portal: portal,
                                    sources: sources,
                                    activeSourceIndex: searchConfigJSON === null || searchConfigJSON === void 0 ? void 0 : searchConfigJSON.activeSourceIndex
                                });
                                var searchConfig = new SearchConfig({
                                    searchViewModel: _this._search.viewModel,
                                    darkModeEnabled: _this.configPanelViewModel.darkModeEnabled,
                                    configPanelViewModel: _this.configPanelViewModel
                                });
                                var initialSearchConfigJSON = searchConfig.toJSON();
                                _this.configPanelViewModel.defaultValues["searchConfiguration"] = initialSearchConfigJSON;
                                _this.set("searchConfig", searchConfig);
                            });
                            return [2];
                    }
                });
            });
        };
        InteractivityViewModel.prototype._getView = function (id, portal) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var map, portalItem;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, new PortalItem({
                                id: id,
                                portal: portal
                            }).load()];
                        case 1:
                            portalItem = _a.sent();
                            if (portalItem.type === "Web Scene") {
                                map = new WebScene({
                                    portalItem: portalItem
                                });
                                return [2, new SceneView({
                                        map: map
                                    })];
                            }
                            else {
                                map = new WebMap({
                                    portalItem: portalItem
                                });
                                return [2, new MapView({
                                        map: map
                                    })];
                            }
                            return [2];
                    }
                });
            });
        };
        InteractivityViewModel.prototype._createSearchSources = function (searchConfigJSON, view) {
            var _a;
            var sources = [];
            (_a = searchConfigJSON === null || searchConfigJSON === void 0 ? void 0 : searchConfigJSON.sources) === null || _a === void 0 ? void 0 : _a.forEach(function (searchSource) {
                var _a;
                if (searchSource.hasOwnProperty("layer")) {
                    var layerFromMap = view.map.allLayers.find(function (layer) { var _a; return layer.id === ((_a = searchSource === null || searchSource === void 0 ? void 0 : searchSource.layer) === null || _a === void 0 ? void 0 : _a.id); });
                    var layer = layerFromMap
                        ? layerFromMap
                        : new FeatureLayer({
                            url: searchSource.layer.url
                        });
                    sources.push(new LayerSearchSource(tslib_1.__assign(tslib_1.__assign({}, searchSource), { layer: layer })));
                }
                else {
                    var url = (searchSource === null || searchSource === void 0 ? void 0 : searchSource.url) || ((_a = searchSource === null || searchSource === void 0 ? void 0 : searchSource["locator"]) === null || _a === void 0 ? void 0 : _a.url);
                    var config = tslib_1.__assign({ url: url, name: searchSource.name }, searchSource);
                    config === null || config === void 0 ? true : delete config["locator"];
                    sources.push(new LocatorSearchSource(config));
                }
            });
            return sources;
        };
        InteractivityViewModel.prototype._handleSearchConfigItemsInit = function () {
            var _this = this;
            return watchUtils.whenOnce(this, "searchConfig.viewModel.configItems.length", function () {
                _this._setWatchersOnConfigItems();
            });
        };
        InteractivityViewModel.prototype._handleSearchConfigItemsChange = function () {
            var _this = this;
            return watchUtils.on(this, "searchConfig.viewModel.configItems", "change", function () {
                var searchConfigJSON = _this.searchConfig.toJSON();
                _this._handleSearchConfigJSON(searchConfigJSON);
                _this._setWatchersOnConfigItems();
            });
        };
        InteractivityViewModel.prototype._setWatchersOnConfigItems = function () {
            var _this = this;
            this._sourceHandles.removeAll();
            this.searchConfig.viewModel.configItems.forEach(function (configItem) {
                if (configItem.type === "locator") {
                    var locatorConfigItem = configItem;
                    _this._sourceHandles.add([
                        _this._locatorConfigItemPropWatcher(locatorConfigItem)
                    ]);
                }
                else {
                    var layerConfigItem = configItem;
                    _this._sourceHandles.add([
                        _this._layerConfigItemPropWatcher(layerConfigItem)
                    ]);
                }
            });
        };
        InteractivityViewModel.prototype._locatorConfigItemPropWatcher = function (locatorConfigItem) {
            var _this = this;
            return watchUtils.watch(locatorConfigItem, "name, placeholder, zoomScale, maxSuggestions, maxResults, suggestionsEnabled, withinViewEnabled, localSearchOptions.minScale, localSearchOptions.distance, countryCode", function () {
                var JSON = _this.searchConfig.toJSON();
                _this._handleSearchConfigJSON(JSON);
            });
        };
        InteractivityViewModel.prototype._layerConfigItemPropWatcher = function (layerConfigItem) {
            var _this = this;
            return watchUtils.watch(layerConfigItem, "name, placeholder, zoomScale, maxSuggestions, maxResults, suggestionsEnabled, withinViewEnabled, displayField, exactMatch, outFields", function () {
                var JSON = _this.searchConfig.toJSON();
                _this._handleSearchConfigJSON(JSON);
            });
        };
        InteractivityViewModel.prototype._handleSearchConfigJSON = function (searchConfigJSON) {
            this.configPanelViewModel.handleDraftData("searchConfiguration", searchConfigJSON);
        };
        InteractivityViewModel.prototype._setMapIdWatcher = function () {
            var _this = this;
            var mapSection = this.configPanelViewModel.sections.find(function (section) { return section.type === "map"; });
            if (!mapSection) {
                return;
            }
            this._handles.add(watchUtils.watch(mapSection, "viewModel.itemBrowser.selectedMapId", function () {
                var resetSearchWidgetView = "reset-search-widget-view";
                _this._handles.add(_this._resetSearchWidgetView(resetSearchWidgetView), resetSearchWidgetView);
            }));
        };
        InteractivityViewModel.prototype._resetSearchWidgetView = function (handlesKey) {
            var _this = this;
            return watchUtils.when(this, "configPanelViewModel.templateAppData", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var id, portal, view;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._handles.has(handlesKey)) {
                                this._handles.remove(handlesKey);
                            }
                            id = this.configPanelViewModel.getMapId();
                            portal = this.configPanelViewModel.templateAppItem.portal;
                            return [4, this._getView(id, portal)];
                        case 1:
                            view = _a.sent();
                            this.set("searchConfig.searchViewModel.view", view);
                            return [2];
                    }
                });
            }); });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractivityViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractivityViewModel.prototype, "searchConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], InteractivityViewModel.prototype, "messages", void 0);
        InteractivityViewModel = tslib_1.__decorate([
            decorators_1.subclass("InteractivityViewModel")
        ], InteractivityViewModel);
        return InteractivityViewModel;
    }(Accessor));
    return InteractivityViewModel;
});
