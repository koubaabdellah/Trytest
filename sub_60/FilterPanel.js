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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "Components/FilterList/FilterList", "esri/layers/FeatureLayer", "esri/core/Collection"], function (require, exports, decorators_1, Widget_1, widget_1, FilterList_1, FeatureLayer_1, Collection_1) {
    "use strict";
    Widget_1 = __importDefault(Widget_1);
    FilterList_1 = __importDefault(FilterList_1);
    FeatureLayer_1 = __importDefault(FeatureLayer_1);
    Collection_1 = __importDefault(Collection_1);
    var FilterPanel = /** @class */ (function (_super) {
        __extends(FilterPanel, _super);
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        function FilterPanel(props) {
            var _this = _super.call(this, props) || this;
            _this.messages = null;
            //--------------------------------------------------------------------------
            //
            // Variables
            //
            //--------------------------------------------------------------------------
            _this._defaultString = "Select Filter";
            _this._filterContainer = null;
            _this._mainContainer = null;
            _this._defaultExpressions = null;
            return _this;
        }
        FilterPanel.prototype.postInitialize = function () {
            var _this = this;
            var _a, _b, _c;
            this._mainContainer = this.container;
            // add any pre-existing def expressions
            this._defaultExpressions = new Collection_1.default();
            (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.view) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.layers) === null || _c === void 0 ? void 0 : _c.forEach(function (layer) {
                var _a;
                if (layer instanceof FeatureLayer_1.default && layer.definitionExpression) {
                    _this._addDefinitionExpression(layer);
                }
                else if ((layer === null || layer === void 0 ? void 0 : layer.type) === "group") {
                    var group = layer;
                    (_a = group.layers) === null || _a === void 0 ? void 0 : _a.forEach(function (layer) {
                        if (layer instanceof FeatureLayer_1.default && (layer === null || layer === void 0 ? void 0 : layer.definitionExpression)) {
                            _this._addDefinitionExpression(layer);
                        }
                    });
                }
            });
        };
        FilterPanel.prototype._addDefinitionExpression = function (layer) {
            if ((layer === null || layer === void 0 ? void 0 : layer.id) && (layer === null || layer === void 0 ? void 0 : layer.definitionExpression)) {
                this._defaultExpressions.add({
                    id: layer.id,
                    definitionExpression: layer.definitionExpression
                });
            }
        };
        FilterPanel.prototype.render = function () {
            var _this = this;
            var color, theme;
            color = theme === "light" ? "neutral" : "inverse";
            return ((0, widget_1.tsx)("div", null,
                (0, widget_1.tsx)("calcite-panel", { class: this.classes("panel-header"), dismissed: true, bind: this, afterCreate: this._createFilter },
                    (0, widget_1.tsx)("div", { slot: "header-content" },
                        (0, widget_1.tsx)("div", { class: "filter-title" },
                            (0, widget_1.tsx)("calcite-icon", { scale: "s", icon: "filter" }),
                            this.config.appBundle.tools.selectFilter)),
                    (0, widget_1.tsx)("div", { slot: "header-actions-end" },
                        (0, widget_1.tsx)("calcite-action", { color: color, title: this.messages.tools.filter, onclick: function () { _this._closePanel(); } },
                            (0, widget_1.tsx)("calcite-icon", { icon: "x" }))))));
        };
        FilterPanel.prototype._closePanel = function () {
            var _a;
            if (!this._filterContainer && !this._mainContainer)
                return;
            this._filterContainer.removeAttribute("dismissed");
            (_a = this._mainContainer) === null || _a === void 0 ? void 0 : _a.classList.add("hide");
        };
        FilterPanel.prototype._createFilter = function (container) {
            var _this = this;
            this._filterContainer = container;
            var _a = this.config, filterConfig = _a.filterConfig, theme = _a.theme, extentSelector = _a.extentSelector, extentSelectorConfig = _a.extentSelectorConfig, expandFilters = _a.expandFilters;
            var map = this.view.map;
            var layerExpressions = (filterConfig || []).layerExpressions;
            this.filterList = new FilterList_1.default({
                layerExpressions: layerExpressions,
                optionalBtnText: this.config.bundle.close,
                expandFilters: expandFilters,
                optionalBtnOnClick: function () {
                    _this._closePanel();
                },
                theme: theme,
                map: map,
                extentSelector: extentSelector,
                extentSelectorConfig: extentSelectorConfig,
                container: container
            });
            this._filterContainer.addEventListener("calcitePanelDismissedChange", function () {
                _this._closePanel();
            });
        };
        FilterPanel.prototype.showPanel = function () {
            var _a;
            if (!this._filterContainer && !this._mainContainer)
                return;
            this._filterContainer.removeAttribute("dismissed");
            (_a = this._mainContainer) === null || _a === void 0 ? void 0 : _a.classList.remove("hide");
        };
        FilterPanel.prototype.update = function (propertyName, value) {
            var _a;
            if (!this.filterList)
                return;
            if (propertyName === "theme") {
                if ((_a = this.filterList) === null || _a === void 0 ? void 0 : _a.theme)
                    this.filterList.theme = value;
            }
            else if (propertyName === "filterConfig") {
                if (this.filterList && value)
                    this.filterList.layerExpressions = value === null || value === void 0 ? void 0 : value.layerExpressions;
            }
            else if (propertyName === "expandFilters") {
                if (this.filterList)
                    this.filterList.expandFilters = value;
            }
        };
        FilterPanel.prototype.findDefaultExpression = function (layerExpression) {
            var foundItem = this._defaultExpressions.find(function (item) {
                return (item === null || item === void 0 ? void 0 : item.id) === (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.id) ? true : false;
            });
            return (foundItem === null || foundItem === void 0 ? void 0 : foundItem.definitionExpression) || (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.definitionExpression) || null;
        };
        FilterPanel.prototype.addDefaultExpression = function (layerExpression) {
            var defaultValue = this.findDefaultExpression(layerExpression);
            if (defaultValue) {
                if ((layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.definitionExpression) && (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.definitionExpression) !== "") {
                    if ((layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.definitionExpression) !== defaultValue) {
                        return "".concat(defaultValue, " AND ").concat(layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.definitionExpression);
                    }
                    else {
                        return defaultValue;
                    }
                }
                else {
                    return defaultValue;
                }
            }
            else {
                return layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.definitionExpression;
            }
        };
        __decorate([
            (0, decorators_1.property)()
        ], FilterPanel.prototype, "config", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], FilterPanel.prototype, "filterList", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], FilterPanel.prototype, "view", void 0);
        __decorate([
            (0, decorators_1.property)(),
            (0, widget_1.messageBundle)("nearby/app/t9n/common")
        ], FilterPanel.prototype, "messages", void 0);
        FilterPanel = __decorate([
            (0, decorators_1.subclass)('app.FilterPanel')
        ], FilterPanel);
        return FilterPanel;
    }((Widget_1.default)));
    return FilterPanel;
});
