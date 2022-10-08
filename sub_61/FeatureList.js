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
define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "esri/widgets/Feature", "esri/core/promiseUtils", "esri/widgets/Widget", "esri/core/Handles", "TemplatesCommonLib/structuralFunctionality/a11yUtils", "../utils/esriWidgetUtils"], function (require, exports, tslib_1, decorators_1, watchUtils_1, widget_1, Feature_1, promiseUtils_1, Widget_1, Handles_1, a11yUtils_1, esriWidgetUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Feature_1 = tslib_1.__importDefault(Feature_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    var FeatureList = /** @class */ (function (_super) {
        tslib_1.__extends(FeatureList, _super);
        function FeatureList(props) {
            var _this = _super.call(this, props) || this;
            _this.features = [];
            _this._clickHandle = null;
            _this.bundle = null;
            _this._toggle = false;
            _this._handles = new Handles_1.default();
            _this._searchWidget = null;
            return _this;
        }
        FeatureList.prototype.initialize = function () {
            var _this = this;
            this.own([(0, watchUtils_1.init)(this, ["applicationConfig.popupPanel", "applicationConfig.popupHover", "view.widthBreakpoint"], function () {
                    var _a;
                    var isMobile = window.matchMedia("(max-width: 700px)");
                    var _b = _this.applicationConfig, popupPanel = _b.popupPanel, popupHover = _b.popupHover;
                    if (popupPanel || (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches)) {
                        _this.view.popup.autoOpenEnabled = false;
                        _this.view.popup.highlightEnabled = false;
                        var clickType_1 = "click";
                        if (popupHover) {
                            clickType_1 = "pointer-move";
                        }
                        (_a = _this._handles) === null || _a === void 0 ? void 0 : _a.removeAll();
                        (0, watchUtils_1.whenOnce)(_this, "view.ready", function () {
                            var _a;
                            _this._addHandle(clickType_1);
                            if (popupPanel) {
                                var node = _this === null || _this === void 0 ? void 0 : _this.view.ui.find("searchExpand");
                                _this._searchWidget = node === null || node === void 0 ? void 0 : node.content;
                                if (_this === null || _this === void 0 ? void 0 : _this._searchWidget) {
                                    (_a = _this === null || _this === void 0 ? void 0 : _this._searchWidget) === null || _a === void 0 ? void 0 : _a.on("search-complete", function (e) {
                                        (0, watchUtils_1.once)(_this.view.popup, "selectedFeature", function (e) {
                                            _this.displayResults(_this.view.popup.features);
                                            _this.view.popup.close();
                                        });
                                    });
                                    _this === null || _this === void 0 ? void 0 : _this._searchWidget.on("search-clear", function () {
                                        _this.features = null;
                                    });
                                    _this === null || _this === void 0 ? void 0 : _this._searchWidget.on("suggest-start", function () {
                                        _this.features = null;
                                    });
                                }
                            }
                        });
                    }
                    else {
                        _this._cleanUp();
                    }
                }), (0, watchUtils_1.init)(this, "selectedItem", function () {
                    _this.clearHighlight();
                    if (_this.selectedItem && _this.view) {
                        _this.view.whenLayerView(_this.selectedItem.layer).then(function (layerview) {
                            if (layerview.highlight) {
                                _this.highlightHandle = layerview.highlight(_this.selectedItem);
                            }
                        });
                    }
                })]);
        };
        FeatureList.prototype._cleanUp = function () {
            var _a, _b;
            var isMobile = window.matchMedia("(max-width: 700px)");
            if ((this === null || this === void 0 ? void 0 : this.view) && !(isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches)) {
                this.view.popup.autoOpenEnabled = true;
                this.view.popup.highlightEnabled = true;
            }
            if (((_a = this === null || this === void 0 ? void 0 : this.applicationConfig) === null || _a === void 0 ? void 0 : _a.popupPanel) && (this === null || this === void 0 ? void 0 : this._searchWidget)) {
                (_b = this._searchWidget) === null || _b === void 0 ? void 0 : _b.clear();
            }
            this.features = null;
            this.clearHighlight();
            this._updateScreenshotComponent(true);
        };
        FeatureList.prototype._addHandle = function (clickType) {
            var _this = this;
            var key = "".concat(clickType, "-handle");
            if (this._handles.has(key)) {
                return;
            }
            if (clickType === "pointer-move" && !this.applicationConfig.popupHover)
                return;
            this._handles.add(this.view.on(clickType, (0, promiseUtils_1.debounce)(function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var point, response, results;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.features = null;
                            this.clearHighlight();
                            this._updateScreenshotComponent(false);
                            point = (event === null || event === void 0 ? void 0 : event.screenPoint) ? event.screenPoint : { x: event.x, y: event.y };
                            return [4 /*yield*/, this.view.popup.fetchFeatures(point).catch()];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.allGraphicsPromise.then()];
                        case 2:
                            results = _a.sent();
                            if (clickType === "pointer-move") {
                                if (results && results.length && results.length > 0) {
                                    results = [results[0]];
                                }
                            }
                            this.displayResults(results);
                            return [2 /*return*/];
                    }
                });
            }); })), key);
        };
        FeatureList.prototype.displayResults = function (results) {
            var _a, _b, _c, _d;
            this.features = results;
            this._updateScreenshotComponent(((_a = this === null || this === void 0 ? void 0 : this.features) === null || _a === void 0 ? void 0 : _a.length) > 0 ? false : true);
            var isMobile = window.matchMedia("(max-width: 700px)");
            var actionExpression = (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches) ? "calcite-radio-group-item[data-action-item='popup']" : "calcite-action[data-action-item='popup']";
            var action = document.querySelector(actionExpression);
            var editActive = false;
            var utlityActive = false;
            if (this === null || this === void 0 ? void 0 : this.applicationConfig.layerEditPanel) {
                var editActionExpression = (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches) ? "calcite-radio-group-item[data-action-item='edit']" : "calcite-action[data-action-item='edit']";
                var editAction = document.querySelector(editActionExpression);
                editActive = (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches) ? editAction === null || editAction === void 0 ? void 0 : editAction.hasAttribute("checked") : editAction === null || editAction === void 0 ? void 0 : editAction.hasAttribute("active");
            }
            if ((_b = this === null || this === void 0 ? void 0 : this.applicationConfig) === null || _b === void 0 ? void 0 : _b.utilityNetwork) {
                var utilityActionExpression = (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches) ? "calcite-radio-group-item[data-action-item='utilityNetwork']" : "calcite-action[data-action-item='utilityNetwork']";
                var utilityAction = document.querySelector(utilityActionExpression);
                utlityActive = (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches) ? utilityAction === null || utilityAction === void 0 ? void 0 : utilityAction.hasAttribute("checked") : utilityAction === null || utilityAction === void 0 ? void 0 : utilityAction.hasAttribute("active");
            }
            if (!action) {
                //Not mobile or popup panel so clean up
                this._cleanUp();
                return;
            }
            var notActive = (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches) ? !action.hasAttribute("checked") : !action.hasAttribute("active");
            if (((_c = this.features) === null || _c === void 0 ? void 0 : _c.length) > 0 && action && notActive && !editActive && !utlityActive) {
                if (isMobile === null || isMobile === void 0 ? void 0 : isMobile.matches) {
                    action.setAttribute("checked", false);
                    action === null || action === void 0 ? void 0 : action.click();
                }
                else {
                    action.click();
                }
            }
            // highlight feature 
            if (((_d = this.features) === null || _d === void 0 ? void 0 : _d.length) > 0)
                this.selectedItem = this.features[0];
        };
        FeatureList.prototype.render = function () {
            var _a, _b;
            var featureList = ((_a = this.features) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.renderFeatures() : null;
            var renderLinks = this.renderLinks();
            var noResultsMessage = ((_b = this.features) === null || _b === void 0 ? void 0 : _b.length) === 0 ? true : false;
            var message = null;
            if (noResultsMessage) {
                if (this.applicationConfig.popupPanel && this.applicationConfig.popupHover) {
                    message = this.bundle.popupPanel.noResultsHoverMessage;
                }
                else {
                    message = this.bundle.popupPanel.noResultsMessage;
                }
            }
            return ((0, widget_1.tsx)("div", null,
                renderLinks,
                featureList,
                message));
        };
        FeatureList.prototype.renderLinks = function () {
            var _a;
            if (!(this === null || this === void 0 ? void 0 : this.features))
                return;
            var count = (_a = this === null || this === void 0 ? void 0 : this.features) === null || _a === void 0 ? void 0 : _a.length;
            var buttonLabel = this._toggle ? this === null || this === void 0 ? void 0 : this.bundle.tools.collapse : this.bundle.tools.expand;
            var buttonIcon = this._toggle ? "contract" : "expand";
            return count > 2 ? ((0, widget_1.tsx)("calcite-button", { "icon-end": buttonIcon, alignment: "end", appearance: "transparent", width: "full", "aria-label": buttonLabel, bind: this, key: buttonLabel, onclick: this._toggleItems, color: "neutral" }, buttonLabel)) : null;
        };
        FeatureList.prototype.renderFeatures = function () {
            var _this = this;
            var _a;
            var count = (_a = this === null || this === void 0 ? void 0 : this.features) === null || _a === void 0 ? void 0 : _a.length;
            return this.features.map(function (feature, index) {
                return (0, widget_1.tsx)("calcite-block", { key: "feature".concat(index), bind: _this, class: (index === 0) ? _this.classes(["active-popup", "popup-block", "count-".concat(count)]) : _this.classes(["popup-block", "count-".concat(count)]), collapsible: count > 1 ? true : false, "data-feature": feature, afterCreate: _this.createFeature });
            });
        };
        FeatureList.prototype._toggleItems = function () {
            var _a;
            this._toggle = !this._toggle;
            var elements = document.getElementsByClassName("popup-block");
            for (var i = 0; i < elements.length; i++) {
                this._toggle ? (_a = elements[i]) === null || _a === void 0 ? void 0 : _a.setAttribute("open", "true") : elements[i].setAttribute("open", "false");
            }
        };
        FeatureList.prototype.createFeature = function (container) {
            var _this = this;
            var _a, _b, _c;
            var graphic = container['data-feature'];
            if (graphic && graphic.popupTemplate) {
                graphic.popupTemplate.outFields = ["*"];
            }
            var feature = new Feature_1.default({
                graphic: graphic,
                defaultPopupTemplateEnabled: true,
                view: this.view,
                visibleElements: {
                    title: false
                },
                container: container
            });
            if (container.classList.contains("active-popup")) {
                container.setAttribute("open", true);
            }
            else {
                container.setAttribute("open", false);
            }
            // Add action container (zoom and edit for popup panel)
            var actionContainer = document.createElement("div");
            actionContainer.classList.add("zoom-button");
            container.append(actionContainer);
            // add zoom button 
            var zoomButton = this.createActionButton("magnifyingGlass", this.bundle.tools.zoom);
            zoomButton.addEventListener("click", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var geometry, l, oid, query, results;
                var _a, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this.view) return [3 /*break*/, 3];
                            geometry = (graphic === null || graphic === void 0 ? void 0 : graphic.geometry) || null;
                            if (!!geometry) return [3 /*break*/, 2];
                            l = graphic === null || graphic === void 0 ? void 0 : graphic.layer;
                            oid = graphic === null || graphic === void 0 ? void 0 : graphic.attributes[l === null || l === void 0 ? void 0 : l.objectIdField];
                            query = l.createQuery();
                            query.returnGeometry = true;
                            query.objectIds = [oid];
                            return [4 /*yield*/, l.queryFeatures(query)];
                        case 1:
                            results = _c.sent();
                            if (((_a = results === null || results === void 0 ? void 0 : results.features) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                                geometry = (_b = results === null || results === void 0 ? void 0 : results.features[0]) === null || _b === void 0 ? void 0 : _b.geometry;
                            }
                            _c.label = 2;
                        case 2:
                            geometry = (geometry === null || geometry === void 0 ? void 0 : geometry.type) === "polygon" ? geometry.extent : geometry;
                            this.view.goTo(geometry, {
                                animate: !(0, a11yUtils_1.prefersReducedMotion)()
                            }).catch(function () { });
                            _c.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            actionContainer.append(zoomButton);
            // add edit button for editable layers 
            if (((_a = this.applicationConfig) === null || _a === void 0 ? void 0 : _a.layerEditPanel) && ((_b = this.applicationConfig) === null || _b === void 0 ? void 0 : _b.addEditToPopup) && ((_c = graphic === null || graphic === void 0 ? void 0 : graphic.layer) === null || _c === void 0 ? void 0 : _c.editingEnabled)) {
                var editButton = this.createActionButton("edit-attributes", this.bundle.tools.edit);
                editButton.addEventListener("click", function () {
                    var _a;
                    if (_this.view && graphic) {
                        (0, esriWidgetUtils_1.switchToEditMode)(graphic, (_a = _this.applicationConfig) === null || _a === void 0 ? void 0 : _a.editor, _this.view);
                    }
                });
                actionContainer.append(editButton);
            }
            // handle click on feature 
            container.addEventListener("click", function () {
                _this.clearHighlight();
                _this.selectedItem = graphic;
                // activate item 
                _this.activateItem(container);
                _this.view.whenLayerView(graphic === null || graphic === void 0 ? void 0 : graphic.layer).then(function (layerView) {
                    if (layerView === null || layerView === void 0 ? void 0 : layerView.highlight) {
                        _this.highlightHandle = layerView.highlight(graphic);
                    }
                });
            });
            // add title 
            (0, watchUtils_1.once)(feature, "title", function () {
                var title = feature.get("title");
                if (title) {
                    container.heading = title.replace(/<[^>]+>/g, '');
                    container.setAttribute("data-title", title);
                }
            });
        };
        FeatureList.prototype.activateItem = function (container) {
            // highlight selected popup feature and remove others 
            var elements = document.getElementsByClassName("active-popup");
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active-popup");
            }
            container.classList.add("active-popup");
        };
        FeatureList.prototype.clearHighlight = function () {
            if (this.highlightHandle) {
                try {
                    this.highlightHandle.remove();
                }
                catch (error) {
                }
            }
        };
        FeatureList.prototype.createActionButton = function (icon, label) {
            var button = document.createElement("calcite-action");
            button.label = button.text = label;
            button.icon = icon;
            button.textEnabled = true;
            button.scale = "m";
            button.appearance = "clear";
            return button;
        };
        FeatureList.prototype.destroy = function () {
            var _a;
            this.highlightHandle && this.highlightHandle.remove();
            (_a = this._handles) === null || _a === void 0 ? void 0 : _a.removeAll();
        };
        FeatureList.prototype._updateScreenshotComponent = function (hideCustom) {
            var _a, _b;
            if (((_a = this.applicationConfig) === null || _a === void 0 ? void 0 : _a.screenshot) && ((_b = this.applicationConfig) === null || _b === void 0 ? void 0 : _b.popupPanel)) {
                var screenshotExpand = this.view.ui.find("screenshotExpand");
                if (screenshotExpand === null || screenshotExpand === void 0 ? void 0 : screenshotExpand.content) {
                    var sw = screenshotExpand.content;
                    sw.disableCustom = hideCustom;
                    if (hideCustom)
                        sw.includeCustomInScreenshot = false;
                }
            }
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FeatureList.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FeatureList.prototype, "view", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FeatureList.prototype, "features", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FeatureList.prototype, "selectionCount", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FeatureList.prototype, "selectedItem", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], FeatureList.prototype, "highlightHandle", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)(),
            (0, widget_1.messageBundle)("sidebar/app/t9n/common")
        ], FeatureList.prototype, "bundle", void 0);
        FeatureList = tslib_1.__decorate([
            (0, decorators_1.subclass)("FeatureList")
        ], FeatureList);
        return FeatureList;
    }((Widget_1.default)));
    exports.default = FeatureList;
});
