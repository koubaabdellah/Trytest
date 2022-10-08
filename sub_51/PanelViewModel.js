/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "../FeatureList", "esri/core/watchUtils", "esri/widgets/BasemapGallery/support/PortalBasemapsSource", "esri/config", "../../utils/utils", "../../utils/layerListUtils", "esri/intl"], function (require, exports, tslib_1, Accessor_1, decorators_1, FeatureList_1, watchUtils_1, PortalBasemapsSource_1, esriConfig, utils_1, layerListUtils_1, intl_1) {
    "use strict";
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    FeatureList_1 = tslib_1.__importDefault(FeatureList_1);
    PortalBasemapsSource_1 = tslib_1.__importDefault(PortalBasemapsSource_1);
    var PanelViewModel = /** @class */ (function (_super) {
        tslib_1.__extends(PanelViewModel, _super);
        function PanelViewModel(props) {
            var _this = _super.call(this, props) || this;
            _this.actions = [];
            _this.actionBar = null;
            _this.view = null;
            _this.calcitePanel = null;
            _this.featureList = null;
            _this.focusedItem = null;
            _this.editor = null;
            _this.basemapGallery = null;
            _this.filterPanel = null;
            _this.editWidget = null;
            _this.networkWidget = null;
            return _this;
        }
        PanelViewModel.prototype.createDetails = function (container) {
            var _this = this;
            var _a = this.applicationConfig, detailsContent = _a.detailsContent, withinConfigurationExperience = _a.withinConfigurationExperience;
            var map = this.view.map;
            var content = detailsContent ||
                map.portalItem.description ||
                null;
            var detailDiv = document.createElement("div");
            container.id = "details";
            container.setAttribute("tabindex", "0");
            detailDiv.innerHTML = content;
            if (withinConfigurationExperience) {
                // update content if within config experience
                this.applicationConfig.watch("detailsContent", function () {
                    detailDiv.innerHTML = _this.applicationConfig.detailsContent;
                });
            }
            return container.append(detailDiv);
        };
        PanelViewModel.prototype.createLayerList = function (container) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var layerContainer, LayerList, layerList, map;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            layerContainer = document.createElement("div");
                            layerContainer.tabIndex = 0;
                            container.id = "layerListPanel";
                            container.append(layerContainer);
                            return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/LayerList"], resolve_1, reject_1); }).then(tslib_1.__importStar)];
                        case 1:
                            LayerList = _b.sent();
                            layerList = new LayerList.default({
                                view: this.view,
                                listItemCreatedFunction: function (e) {
                                    (0, layerListUtils_1.addItems)(e === null || e === void 0 ? void 0 : e.item, _this.applicationConfig);
                                },
                                container: container
                            });
                            (0, watchUtils_1.init)(this.applicationConfig, ["layerListConfig"], function () {
                                var _a, _b;
                                if (!layerList)
                                    return;
                                (_a = layerList === null || layerList === void 0 ? void 0 : layerList.operationalItems) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                                    item.actionsSections.removeAll();
                                    if (item === null || item === void 0 ? void 0 : item.panel)
                                        item.panel = null;
                                });
                                (_b = layerList === null || layerList === void 0 ? void 0 : layerList.operationalItems) === null || _b === void 0 ? void 0 : _b.forEach(function (item) {
                                    (0, layerListUtils_1.addItems)(item, _this.applicationConfig);
                                });
                            });
                            return [4 /*yield*/, layerList.when()];
                        case 2:
                            _b.sent();
                            layerList.on("trigger-action", function (e) {
                                (0, layerListUtils_1.handleListActions)(e, _this.view);
                            });
                            map = (_a = this === null || this === void 0 ? void 0 : this.view) === null || _a === void 0 ? void 0 : _a.map;
                            return [4 /*yield*/, (map === null || map === void 0 ? void 0 : map.loadAll())];
                        case 3:
                            _b.sent();
                            (0, watchUtils_1.init)(this.applicationConfig, ["selectedLayers"], function () {
                                var _a, _b;
                                // reset the layers
                                (0, utils_1.updateLayerVisibility)(_this.view.map.layers);
                                var selectedLayers = _this.applicationConfig.selectedLayers;
                                if (((_a = selectedLayers === null || selectedLayers === void 0 ? void 0 : selectedLayers.layers) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                                    // update the group item list mode
                                    var selectedLayerIds = (_b = selectedLayers === null || selectedLayers === void 0 ? void 0 : selectedLayers.layers) === null || _b === void 0 ? void 0 : _b.map(function (selLayer) {
                                        return selLayer.id;
                                    });
                                    (0, utils_1.updateLayerListVisibility)(_this.view.map.allLayers, selectedLayerIds, _this.applicationConfig);
                                }
                            });
                            return [2 /*return*/, layerList];
                    }
                });
            });
        };
        PanelViewModel.prototype.createBasemapGallery = function (container) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var basemapGalleryContainer, BasemapGallery, portal, source;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            basemapGalleryContainer = document.createElement("div");
                            return [4 /*yield*/, new Promise(function (resolve_2, reject_2) { require(["esri/widgets/BasemapGallery"], resolve_2, reject_2); }).then(tslib_1.__importStar)];
                        case 1:
                            BasemapGallery = _b.sent();
                            basemapGalleryContainer.tabIndex = 0;
                            container.id = "basemapGallery";
                            container.append(basemapGalleryContainer);
                            portal = ((_a = this.applicationBase) === null || _a === void 0 ? void 0 : _a.portal) || null;
                            esriConfig.portalUrl = (portal === null || portal === void 0 ? void 0 : portal.url) || null;
                            source = new PortalBasemapsSource_1.default({ portal: portal });
                            this.basemapGallery = new BasemapGallery.default({
                                view: this.view,
                                source: source,
                                container: container
                            });
                            (0, watchUtils_1.init)(this.applicationConfig, ["basemapGroupId", "basemapIdsToFilter", "basemapGalleryConfig"], function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var _a, basemapGroupId, basemapIdsToFilter, customSource;
                                var _b;
                                return tslib_1.__generator(this, function (_c) {
                                    if (!(this === null || this === void 0 ? void 0 : this.basemapGallery))
                                        return [2 /*return*/];
                                    _a = (_b = this.applicationConfig) === null || _b === void 0 ? void 0 : _b.basemapGalleryConfig, basemapGroupId = _a.basemapGroupId, basemapIdsToFilter = _a.basemapIdsToFilter;
                                    customSource = new PortalBasemapsSource_1.default({ portal: portal });
                                    if (basemapIdsToFilter) {
                                        customSource.filterFunction = function (basemap) {
                                            return !basemapIdsToFilter.includes(basemap.portalItem.id);
                                        };
                                    }
                                    if (basemapGroupId) {
                                        customSource.query = "id:".concat(basemapGroupId);
                                    }
                                    this.basemapGallery.set("source", customSource);
                                    this.basemapGallery.source["load"]();
                                    this.basemapGallery.source.refresh();
                                    return [2 /*return*/];
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            });
        };
        PanelViewModel.prototype.createFilter = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var FilterPanel;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve_3, reject_3) { require(["../FilterPanel"], resolve_3, reject_3); }).then(tslib_1.__importStar)];
                        case 1:
                            FilterPanel = _a.sent();
                            if (!this.filterPanel) {
                                this.filterPanel = new FilterPanel.default({
                                    config: this.applicationConfig,
                                    view: this.view,
                                    container: container
                                });
                                // get the search widget from the panel
                                (0, watchUtils_1.whenDefinedOnce)(this.filterPanel, "filterList", function () {
                                    var _a, _b;
                                    (_a = _this.filterPanel) === null || _a === void 0 ? void 0 : _a.filterList.watch("output", function (output) {
                                        var id = output.id;
                                        var expression = _this.filterPanel.addDefaultExpression(output);
                                        var layer = _this.view.map.findLayerById(id);
                                        if (layer) {
                                            layer.definitionExpression = expression;
                                        }
                                    });
                                    (_b = _this.filterPanel) === null || _b === void 0 ? void 0 : _b.filterList.on("filterListReset", function (resetLayerExpressions) {
                                        resetLayerExpressions === null || resetLayerExpressions === void 0 ? void 0 : resetLayerExpressions.forEach(function (layerExpression) {
                                            var _a;
                                            var id = layerExpression.id;
                                            var layer = (_a = _this === null || _this === void 0 ? void 0 : _this.view) === null || _a === void 0 ? void 0 : _a.map.findLayerById(id);
                                            if (layer) {
                                                // Check for default layer expression
                                                layer.definitionExpression = _this.filterPanel.findDefaultExpression(layerExpression);
                                            }
                                        });
                                    });
                                });
                                (0, watchUtils_1.init)(this.applicationConfig, ["filterConfig", "expandFilters"], function (value, oldValue, propertyName) {
                                    if ((propertyName === "filterConfig" || propertyName === "expandFilters") && _this.filterPanel) {
                                        _this === null || _this === void 0 ? void 0 : _this.filterPanel.update(propertyName, value);
                                    }
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        PanelViewModel.prototype.createBookmarks = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var bookmarksContainer, Bookmarks;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            bookmarksContainer = document.createElement("div");
                            bookmarksContainer.tabIndex = 0;
                            container.id = "bookmarks";
                            container.append(bookmarksContainer);
                            return [4 /*yield*/, new Promise(function (resolve_4, reject_4) { require(["esri/widgets/Bookmarks"], resolve_4, reject_4); }).then(tslib_1.__importStar)];
                        case 1:
                            Bookmarks = _a.sent();
                            return [2 /*return*/, new Bookmarks.default({
                                    view: this.view,
                                    viewModel: {
                                        view: this.view,
                                        abilities: { time: false }
                                    },
                                    visibleElements: {
                                        thumbnail: true
                                    },
                                    container: container
                                })];
                    }
                });
            });
        };
        PanelViewModel.prototype.createLegend = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var legendDiv, Legend, legendWidget;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            legendDiv = document.createElement("div");
                            container.setAttribute("tabindex", "0");
                            container.id = "legendPanel";
                            container.append(legendDiv);
                            return [4 /*yield*/, new Promise(function (resolve_5, reject_5) { require(["esri/widgets/Legend"], resolve_5, reject_5); }).then(tslib_1.__importStar)];
                        case 1:
                            Legend = _a.sent();
                            legendWidget = new Legend.default({
                                view: this.view,
                                style: this.applicationConfig.layoutType === "horizontal" ? {
                                    type: "card",
                                    layout: "auto"
                                } : "classic",
                                container: container
                            });
                            (0, watchUtils_1.init)(this.applicationConfig, "layoutType", function () {
                                if (legendWidget === null || legendWidget === void 0 ? void 0 : legendWidget.style) {
                                    legendWidget.style = _this.applicationConfig.layoutType === "horizontal" ? {
                                        type: "card",
                                        layout: "auto"
                                    } : "classic";
                                }
                            });
                            return [2 /*return*/, legendWidget];
                    }
                });
            });
        };
        PanelViewModel.prototype.createUtilityNetwork = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var utilityNetworkDiv, UtilityNetworkTrace;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.networkWidget) {
                                return [2 /*return*/];
                            }
                            ;
                            utilityNetworkDiv = document.createElement("div");
                            container.setAttribute("tabindex", "0");
                            container.id = "utilityNetwork";
                            container.append(utilityNetworkDiv);
                            return [4 /*yield*/, new Promise(function (resolve_6, reject_6) { require(["esri/widgets/UtilityNetworkTrace"], resolve_6, reject_6); }).then(tslib_1.__importStar)];
                        case 1:
                            UtilityNetworkTrace = _a.sent();
                            this.networkWidget = new UtilityNetworkTrace.default({
                                view: this.view,
                                container: container
                            });
                            (0, watchUtils_1.whenFalseOnce)(this.applicationConfig, "utilityNetwork", function () {
                                var _a, _b, _c, _d, _e, _f;
                                //clear 
                                if ((_a = _this === null || _this === void 0 ? void 0 : _this.networkWidget) === null || _a === void 0 ? void 0 : _a.viewModel) {
                                    (_c = (_b = _this === null || _this === void 0 ? void 0 : _this.view) === null || _b === void 0 ? void 0 : _b.graphics) === null || _c === void 0 ? void 0 : _c.removeAll();
                                    (_e = (_d = _this.networkWidget) === null || _d === void 0 ? void 0 : _d.viewModel) === null || _e === void 0 ? void 0 : _e.reset();
                                    (_f = _this.networkWidget) === null || _f === void 0 ? void 0 : _f.destroy();
                                    _this.networkWidget = null;
                                }
                            });
                            return [2 /*return*/, this === null || this === void 0 ? void 0 : this.networkWidget];
                    }
                });
            });
        };
        PanelViewModel.prototype.createPopup = function (container) {
            container.classList.add("popup-container");
            container.setAttribute("tabindex", "0");
            container.id = "popupPanel";
            this.featureList = new FeatureList_1.default({
                applicationConfig: this.applicationConfig,
                view: this.view,
                container: container
            });
        };
        PanelViewModel.prototype.createEditor = function (container) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, editLayers, allowedWorkflows, editorDiv, errorDiv, Editor;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.editWidget) {
                                return [2 /*return*/];
                            }
                            ;
                            _a = this.applicationConfig, editLayers = _a.editLayers, allowedWorkflows = _a.allowedWorkflows;
                            editorDiv = document.createElement("div");
                            editorDiv.tabIndex = 0;
                            container.id = "editorPanel";
                            container.append(editorDiv);
                            errorDiv = document.createElement("div");
                            errorDiv.classList.add("hide");
                            errorDiv.innerHTML = this.applicationConfig.appBundle.layerEditPanel.noEditableLayersMessage;
                            container.append(errorDiv);
                            return [4 /*yield*/, new Promise(function (resolve_7, reject_7) { require(["esri/widgets/Editor"], resolve_7, reject_7); }).then(tslib_1.__importStar)];
                        case 1:
                            Editor = _b.sent();
                            this.editWidget = new Editor.default({
                                view: this.view,
                                // allowedWorkflows,
                                container: container
                            });
                            this.editWidget.watch("activeWorkflow", function (e) {
                                var _a;
                                if ((_a = _this === null || _this === void 0 ? void 0 : _this.view) === null || _a === void 0 ? void 0 : _a.popup.selectedFeature) {
                                    // console.log("Something is selected", this.view.popup.selectedFeature)
                                }
                            });
                            this.applicationConfig.editor = this.editWidget;
                            if (editLayers) {
                                this.editWidget.layerInfos = editLayers;
                            }
                            (0, watchUtils_1.when)(this.editWidget.viewModel, "editableItems", function () {
                                _this.editWidget.viewModel.editableItems.length === 0 ? errorDiv.classList.remove("hide") : errorDiv.classList.add("hide");
                            });
                            this.editor = this.editWidget;
                            return [2 /*return*/, this.editWidget];
                    }
                });
            });
        };
        PanelViewModel.prototype.createActions = function () {
            var _a = this.applicationConfig, bookmarksPanel = _a.bookmarksPanel, legendPanel = _a.legendPanel, utilityNetwork = _a.utilityNetwork, basemapGallery = _a.basemapGallery, layoutType = _a.layoutType, layerListPanel = _a.layerListPanel, details = _a.details, activePanel = _a.activePanel, popupPanel = _a.popupPanel, layerEditPanel = _a.layerEditPanel, filterPanel = _a.filterPanel;
            var actions = [];
            if (legendPanel) {
                var action = {
                    key: "legendPanel",
                    icon: (0, intl_1.prefersRTL)() ? "legendR" : "legend",
                    name: this.applicationConfig.appBundle.tools.legend,
                    label: this.applicationConfig.appBundle.tools.legend,
                    active: activePanel === "legendPanel" ? true : false
                };
                actions.push(action);
            }
            if (basemapGallery) {
                actions.push({
                    key: "basemapGallery",
                    icon: "basemap",
                    name: this.applicationConfig.appBundle.tools.basemapGallery,
                    label: this.applicationConfig.appBundle.tools.basemapGallery,
                    active: activePanel === "basemapGallery" ? true : false
                });
            }
            if (utilityNetwork) {
                actions.push({
                    key: "utilityNetwork",
                    icon: "network",
                    name: this.applicationConfig.appBundle.tools.utilityNetwork,
                    label: this.applicationConfig.appBundle.tools.utilityNetwork,
                    active: activePanel === "utilityNetwork" ? true : false
                });
            }
            if (bookmarksPanel) {
                actions.push({
                    key: "bookmarksPanel",
                    icon: "bookmark",
                    name: this.applicationConfig.appBundle.tools.bookmarks,
                    label: this.applicationConfig.appBundle.tools.bookmarks,
                    active: activePanel === "bookmarksPanel" ? true : false
                });
            }
            if (details) {
                actions.push({
                    key: "details",
                    icon: "information",
                    name: this.applicationConfig.appBundle.tools.details,
                    label: this.applicationConfig.appBundle.tools.details,
                    active: activePanel === "details" ? true : false
                });
            }
            if (layerListPanel) {
                actions.push({
                    key: "layerListPanel",
                    icon: "layerList",
                    name: this.applicationConfig.appBundle.tools.layerList,
                    label: this.applicationConfig.appBundle.tools.layerList,
                    active: activePanel === "layerListPanel" ? true : false
                });
            }
            if (popupPanel) {
                actions.push({
                    key: "popup",
                    icon: "popup",
                    name: this.applicationConfig.appBundle.tools.popup,
                    label: this.applicationConfig.appBundle.tools.popup,
                    active: activePanel === "popupPanel" ? true : false
                });
            }
            if (layerEditPanel) {
                actions.push({
                    key: "edit",
                    icon: "edit",
                    name: this.applicationConfig.appBundle.tools.edit,
                    label: this.applicationConfig.appBundle.tools.edit,
                    active: activePanel === "layerEditPanel" ? true : false
                });
            }
            if (filterPanel) {
                actions.push({
                    key: "filter",
                    icon: "filter",
                    name: this.applicationConfig.appBundle.tools.filter,
                    label: this.applicationConfig.appBundle.tools.filter,
                    active: activePanel === "filterPanel" ? true : false
                });
            }
            if ((actions === null || actions === void 0 ? void 0 : actions.length) === 0) {
                document.body.classList.add("no-tools");
            }
            else {
                document.body.classList.remove("no-tools");
            }
            this.actions = actions;
        };
        PanelViewModel.prototype.actionItemClicked = function (e) {
            var _a, _b, _c, _d, _e;
            if (((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.tagName) !== "CALCITE-ACTION")
                return;
            // the panels are empty
            var activeAction = e === null || e === void 0 ? void 0 : e.target;
            var name = (_b = activeAction === null || activeAction === void 0 ? void 0 : activeAction.dataset) === null || _b === void 0 ? void 0 : _b.actionItem;
            if (name === undefined) {
                var expandClass = "action-bar-expanded";
                if ((_c = e === null || e === void 0 ? void 0 : e.target) === null || _c === void 0 ? void 0 : _c.expanded) {
                    document.body.classList.add(expandClass);
                }
                else {
                    document.body.classList.remove(expandClass);
                }
            }
            this.actions.forEach(function (action) {
                if (name === action.key) {
                    action.active = !activeAction.active;
                }
                else { // hide others
                    action.active = false;
                }
            });
            if (((_d = this === null || this === void 0 ? void 0 : this.applicationConfig) === null || _d === void 0 ? void 0 : _d.layerEditPanel) && (this === null || this === void 0 ? void 0 : this.editor)) {
                if (name !== "edit") {
                    if ((_e = this === null || this === void 0 ? void 0 : this.editor) === null || _e === void 0 ? void 0 : _e.activeWorkflow)
                        this.editor.cancelWorkflow();
                }
            }
            // Collapse the panel if there aren't any active tools
            var isActive = this.actions.some(function (a) {
                return a.active;
            });
            this.calcitePanel.collapsed = isActive ? false : true;
        };
        PanelViewModel.prototype.createActionClickFunction = function (action) {
            (action === null || action === void 0 ? void 0 : action.active) ? document.body.classList.add("panel-open") : document.body.classList.remove("panel-open");
            var clickFunction = null;
            switch (action.key) {
                case "legendPanel":
                    clickFunction = this.createLegend;
                    break;
                case "layerListPanel":
                    clickFunction = this.createLayerList;
                    break;
                case "details":
                    clickFunction = this.createDetails;
                    break;
                case "popup":
                    clickFunction = this.createPopup;
                    break;
                case "edit":
                    clickFunction = this.createEditor;
                    break;
                case "filter":
                    clickFunction = this.createFilter;
                    break;
                case "bookmarksPanel":
                    clickFunction = this.createBookmarks;
                    break;
                case "utilityNetwork":
                    clickFunction = this.createUtilityNetwork;
                    break;
                case "basemapGallery":
                    clickFunction = this.createBasemapGallery;
                    break;
            }
            return clickFunction;
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "applicationBase", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "actions", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "actionBar", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "view", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "calcitePanel", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "featureList", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "focusedItem", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "editor", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "basemapGallery", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], PanelViewModel.prototype, "filterPanel", void 0);
        PanelViewModel = tslib_1.__decorate([
            (0, decorators_1.subclass)("esri.demo.PanelViewModel")
        ], PanelViewModel);
        return PanelViewModel;
    }((Accessor_1.default)));
    return PanelViewModel;
});
