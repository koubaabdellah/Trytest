define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/views/MapView", "esri/intl"], function (require, exports, tslib_1, decorators_1, Accessor_1, MapView, intl_1) {
    "use strict";
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var FilterConfigViewModel = (function (_super) {
        tslib_1.__extends(FilterConfigViewModel, _super);
        function FilterConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.switchValue = "predefined";
            _this.layerExpressions = {};
            _this.showCustomizeFilters = false;
            _this.isAddingFilter = false;
            _this.hideCustomFeatures = false;
            _this.initLayerExpressions = {};
            _this.messages = null;
            return _this;
        }
        FilterConfigViewModel.prototype.initFilterConfig = function () {
            var _this = this;
            var _a;
            this.selectedLayer = null;
            var updateOutput = false;
            this._locale = intl_1.getLocale();
            this.featureLayers = [];
            this.map.allLayers.forEach(function (layer) {
                if (layer.type === "feature") {
                    var fl = layer;
                    _this.featureLayers.push(fl);
                    _this.initLayerExpressions[layer.id] = fl.definitionExpression;
                }
            });
            if (this.featureLayers && this.featureLayers.length) {
                (_a = this.input) === null || _a === void 0 ? void 0 : _a.forEach(function (layerExpression) {
                    var _a;
                    var i = _this.featureLayers.findIndex(function (_a) {
                        var id = _a.id;
                        return layerExpression.id === id;
                    });
                    if (i < 0) {
                        updateOutput = true;
                    }
                    else {
                        if (_this.hideCustomFeatures && (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.expressions.length) &&
                            layerExpression.expressions.length > 1) {
                            var tmpExpressions_1 = [];
                            (_a = layerExpression.expressions) === null || _a === void 0 ? void 0 : _a.forEach(function (expression) {
                                if (expression.definitionExpression) {
                                    tmpExpressions_1.push(expression.definitionExpression);
                                }
                            });
                            layerExpression.expressions = [
                                {
                                    definitionExpression: tmpExpressions_1.join(layerExpression.operator),
                                    id: Date.now(),
                                    index: 0,
                                    name: layerExpression.id
                                }
                            ];
                            updateOutput = true;
                        }
                        _this.layerExpressions[layerExpression.id] = layerExpression;
                    }
                });
                this.operator = " AND ";
                if (updateOutput) {
                    this._generateOutput();
                }
            }
        };
        FilterConfigViewModel.prototype.initializeMapView = function () {
            this.view = new MapView({
                map: this.map,
                container: "filterView"
            });
        };
        FilterConfigViewModel.prototype.handleUserInputClick = function () {
            this._handleSwitchFilterDestroy();
            this._handleAddUserInputFilter(false, null);
        };
        FilterConfigViewModel.prototype.handleCancelUserInputFilter = function () {
            this.isAddingFilter = false;
            this.showCustomizeFilters = true;
            this.configPanelViewModel.flowSettingsUI.resetUI();
        };
        FilterConfigViewModel.prototype.handleOrderChange = function (event) {
            var _this = this;
            var id = this.selectedLayer.id;
            var tmp = [];
            event.detail.map(function (index) { return tmp.push(_this.layerExpressions[id].expressions[index]); });
            tmp.map(function (expression, index) { return (expression.index = index); });
            this.layerExpressions[id].expressions = tmp;
            this._generateOutput();
        };
        FilterConfigViewModel.prototype.handleEditExpression = function (expression) {
            if (expression === null || expression === void 0 ? void 0 : expression.type) {
                this._handleAddUserInputFilter(true, expression);
                this._updatingExpression = expression;
            }
            else {
                this._updatingExpression = expression;
                this._expressionName = this._updatingExpression.name;
            }
        };
        FilterConfigViewModel.prototype.handleRemoveExpression = function (expression, event) {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            var id = this.selectedLayer.id;
            var index = this.layerExpressions[id].expressions.findIndex(function (_a) {
                var index = _a.index;
                return index === expression.index;
            });
            if (index > -1) {
                this.layerExpressions[id].expressions.splice(index, 1);
                this.layerExpressions[id].expressions.map(function (expression, index) { return (expression.index = index); });
                if (!this.layerExpressions[id].expressions.length) {
                    delete this.layerExpressions[id];
                }
                this._generateOutput();
            }
        };
        FilterConfigViewModel.prototype.handleSelectLayer = function (event) {
            var _a, _b, _c, _d, _e, _f;
            event.preventDefault();
            var node = event.target;
            if (node.value !== "default") {
                this.selectedLayer = this.featureLayers.find(function (_a) {
                    var id = _a.id;
                    return id === node.value;
                });
                this.layerName = (_c = (_b = (_a = this.layerExpressions) === null || _a === void 0 ? void 0 : _a[this.selectedLayer.id]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : this.selectedLayer.title;
                this.operator = (_f = (_e = (_d = this.layerExpressions) === null || _d === void 0 ? void 0 : _d[this.selectedLayer.id]) === null || _e === void 0 ? void 0 : _e.operator) !== null && _f !== void 0 ? _f : " AND ";
                this.showCustomizeFilters = true;
            }
            else {
                this.showCustomizeFilters = false;
            }
        };
        FilterConfigViewModel.prototype.handleSelectOperator = function (event) {
            var _a;
            event.preventDefault();
            var node = event.target;
            var id = this.selectedLayer.id;
            this.operator = node.value;
            if ((_a = this.layerExpressions) === null || _a === void 0 ? void 0 : _a[id]) {
                this.layerExpressions[id].operator = node.value;
                this._generateOutput();
            }
        };
        FilterConfigViewModel.prototype.handleLayerInput = function (event) {
            var _this = this;
            var node = event.currentTarget;
            var id = this.selectedLayer.id;
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            this._timeout = setTimeout(function () {
                var _a;
                _this.layerName = node.value;
                if ((_a = _this.layerExpressions) === null || _a === void 0 ? void 0 : _a[id]) {
                    _this.layerExpressions[id].title = _this.layerName.trim();
                    _this._generateOutput();
                }
            }, 1000);
        };
        FilterConfigViewModel.prototype.checkForElement = function (element, selector) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var counter;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!element)
                                return [2, null];
                            counter = 50;
                            _a.label = 1;
                        case 1:
                            if (!!element.querySelector(selector)) return [3, 3];
                            return [4, new Promise(function (resolve) { return requestAnimationFrame(resolve); })];
                        case 2:
                            _a.sent();
                            counter--;
                            if (counter === 0) {
                                return [2, null];
                            }
                            return [3, 1];
                        case 3: return [2, element.querySelector(selector)];
                    }
                });
            });
        };
        FilterConfigViewModel.prototype.updateInteractiveExpressions = function (userInputFilterConfig, isEditing) {
            var _a, _b, _c;
            var id = this.selectedLayer.id;
            if (isEditing) {
                this.layerExpressions[id].expressions[this._updatingExpression.index] = tslib_1.__assign(tslib_1.__assign({}, this.layerExpressions[id].expressions[this._updatingExpression.index]), userInputFilterConfig);
            }
            else {
                this.layerExpressions[id] = {
                    id: id,
                    title: (_a = this.layerName) !== null && _a !== void 0 ? _a : this.selectedLayer.title,
                    operator: this.operator,
                    expressions: ((_c = (_b = this.layerExpressions) === null || _b === void 0 ? void 0 : _b[id]) === null || _c === void 0 ? void 0 : _c.expressions) ? this.layerExpressions[id].expressions : []
                };
                this.layerExpressions[id].expressions.push(tslib_1.__assign(tslib_1.__assign({}, userInputFilterConfig), { id: Date.now(), index: this.layerExpressions[id].expressions.length }));
            }
            this._generateOutput();
            this.handleCancelUserInputFilter();
        };
        FilterConfigViewModel.prototype.createFilterWrapper = function (filterWidget) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    filterWidget.viewFilter = this.editingExpression
                        ? this._updatingExpression.definitionExpression
                        : this.initLayerExpressions[this.selectedLayer.id];
                    this._filterWidget = filterWidget;
                    this._filterWidget.addEventListener("arcgisFilterCancel", function () {
                        _this.handleFilterDestroy();
                    });
                    this._filterWidget.addEventListener("arcgisFilterDismissedChange", function () {
                        _this.handleFilterDestroy();
                    });
                    this._filterWidget.addEventListener("arcgisFilterWhereChange", function (event) {
                        _this._where = event.detail;
                    });
                    this._createMutationObserver();
                    return [2];
                });
            });
        };
        FilterConfigViewModel.prototype.createInput = function (input) {
            var _a;
            input.value = ((_a = this._updatingExpression) === null || _a === void 0 ? void 0 : _a.name) ? this._updatingExpression.name : null;
        };
        FilterConfigViewModel.prototype.handleInput = function (event) {
            var node = event.currentTarget;
            this._expressionName = node.value;
        };
        FilterConfigViewModel.prototype.handleSaveFilter = function () {
            this._updateExpressions();
            this.handleFilterDestroy();
        };
        FilterConfigViewModel.prototype.handleFilterDestroy = function () {
            var _a, _b;
            this.switchValue = null;
            this.selectedLayer.definitionExpression = this.initLayerExpressions[this.selectedLayer.id];
            this._expressionName = null;
            (_a = this._observer) === null || _a === void 0 ? void 0 : _a.disconnect();
            this.isAddingFilter = false;
            this._updatingExpression = null;
            this._where = null;
            this.showCustomizeFilters = true;
            (_b = this._filterWidget) === null || _b === void 0 ? void 0 : _b.remove();
            this._filterWidget = null;
            if (this.switchValue !== "userInput") {
                this.configPanelViewModel.flowSettingsUI.resetUI();
            }
        };
        FilterConfigViewModel.prototype._generateOutput = function () {
            var layerExpressions = Object.values(this.layerExpressions).map(function (layerExpression) { return layerExpression; });
            var newOutput = {
                mapId: this.map.portalItem.id,
                layerExpressions: layerExpressions
            };
            this.set("outputJSON", newOutput);
        };
        FilterConfigViewModel.prototype._handleAddUserInputFilter = function (isEditing, expression) {
            this.showCustomizeFilters = false;
            this.userInputFilterConfig.selectedLayer = this.selectedLayer;
            this.userInputFilterConfig.isEditing = isEditing;
            this.userInputFilterConfig.userInputFilterConfig = expression ? tslib_1.__assign({}, expression) : null;
            this.userInputFilterConfig.type = expression === null || expression === void 0 ? void 0 : expression.type;
            this.userInputFilterConfig.setFields();
        };
        FilterConfigViewModel.prototype._handleSwitchFilterDestroy = function () {
            if (this._filterWidget) {
                this.selectedLayer.definitionExpression = this.initLayerExpressions[this.selectedLayer.id];
                this._expressionName = null;
                this._observer.disconnect();
                this._where = null;
            }
            this._updatingExpression = null;
        };
        FilterConfigViewModel.prototype._updateExpressions = function () {
            var _a, _b, _c;
            if (this._where) {
                var id = this.selectedLayer.id;
                if (this.editingExpression) {
                    var expression = this.layerExpressions[id].expressions[this._updatingExpression.index];
                    expression.name = this._expressionName ? this._expressionName : this._where;
                    expression.definitionExpression = this._where;
                }
                else {
                    this.layerExpressions[id] = {
                        id: id,
                        title: (_a = this.layerName) !== null && _a !== void 0 ? _a : this.selectedLayer.title,
                        operator: this.operator,
                        expressions: ((_c = (_b = this.layerExpressions) === null || _b === void 0 ? void 0 : _b[id]) === null || _c === void 0 ? void 0 : _c.expressions) ? this.layerExpressions[id].expressions : []
                    };
                    this.layerExpressions[id].expressions.push({
                        definitionExpression: this._where,
                        id: Date.now(),
                        index: this.layerExpressions[id].expressions.length,
                        name: this._expressionName ? this._expressionName : this._where
                    });
                }
                this._generateOutput();
            }
            else {
                if (this.editingExpression) {
                    var id = this.selectedLayer.id;
                    var expression = this.layerExpressions[id].expressions[this._updatingExpression.index];
                    this.handleRemoveExpression(expression);
                }
            }
        };
        FilterConfigViewModel.prototype._handleFilterCreation = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var filterStyle;
                return tslib_1.__generator(this, function (_a) {
                    filterStyle = document.createElement("style");
                    filterStyle.innerHTML = "\n      .content-container { overflow: hidden!important; }\n      .fab-container { margin-bottom: 12px!important; }\n      .header-content .heading, .header-content .summary {\n        display: -webkit-box!important;\n        white-space: normal!important;\n        -webkit-box-orient: vertical;\n        overflow-wrap: normal!important;\n      }\n      " + (this.hideCustomFeatures ? "" : ".back-button { display: none}") + "\n      .fab-container { position: unset!important }\n      article.container .heading { font-size: 14px!important; }\n      article.container .header { border: unset!important; }\n      @media only screen and (max-width: 1200px) {\n        .header-content .heading, .header-content .summary {\n          -webkit-line-clamp: 3;\n        }\n      }\n      @media only screen and (min-width: 1201px) {\n        .header-content .heading, .header-content .summary {\n          -webkit-line-clamp: 2;\n        }\n      }\n      calcite-block { border: unset!important; }\n      " + (this.theme === "dark" ? "calcite-scrim { --calcite-scrim-background: rgba(43,43,43,0.75)!important }" : "");
                    this._filterPanel.shadowRoot.prepend(filterStyle);
                    return [2];
                });
            });
        };
        FilterConfigViewModel.prototype._createMutationObserver = function () {
            var _this = this;
            this._observer = new MutationObserver(function (mutations) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    mutations.forEach(function (mutation) {
                        mutation.addedNodes.forEach(function (element) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var actionBarWidth, popoverStyle, fab;
                            var _this = this;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                if (element.nodeName === "ARCGIS-FIELD-PICK-LIST") {
                                    if (!element.shadowRoot.getElementById("filter-pick-list-popover-style")) {
                                        actionBarWidth = (_a = document.querySelector("calcite-action-bar[data-node-ref='calciteActionBar']")) === null || _a === void 0 ? void 0 : _a.clientWidth;
                                        popoverStyle = document.createElement("style");
                                        popoverStyle.id = "filter-pick-list-popover-style";
                                        popoverStyle.innerHTML = this.isInModal
                                            ? "calcite-popover {\n                    z-index: 1000!important;\n                    pointer-events: unset!important;\n                    opacity: 1!important;\n                  }"
                                            : "calcite-popover {\n                    z-index: 1000!important;\n                    inset: " + (intl_1.prefersRTL(this._locale)
                                                ? "200px " + (actionBarWidth !== null && actionBarWidth !== void 0 ? actionBarWidth : 125) + "px auto auto!important"
                                                : "200px auto auto " + (actionBarWidth !== null && actionBarWidth !== void 0 ? actionBarWidth : 125) + "px!important") + ";\n                    pointer-events: unset!important;\n                    opacity: 1!important;\n                  }";
                                        element.lang = this._locale;
                                        element.shadowRoot.prepend(popoverStyle);
                                    }
                                }
                                if (element.id === "filter-panel") {
                                    this._filterPanel = element;
                                    this._handleFilterCreation();
                                    fab = this._filterPanel.querySelector("calcite-fab");
                                    fab === null || fab === void 0 ? void 0 : fab.setAttribute("label", fab.innerHTML);
                                }
                                if (element.nodeName === "CALCITE-PANEL") {
                                    element.beforeBack = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                        return tslib_1.__generator(this, function (_a) {
                                            this.switchValue = null;
                                            this._filterWidget.done();
                                            this._filterWidget = null;
                                            this.configPanelViewModel.flowSettingsUI.resetUI();
                                            return [2];
                                        });
                                    }); };
                                }
                                if (this.footer) {
                                    this.footer.style.visibility = "visible";
                                }
                                return [2];
                            });
                        }); });
                    });
                    return [2];
                });
            }); });
            var observerConfig = {
                childList: true
            };
            var filterObserverConfig = {
                attributes: true,
                childList: true,
                subtree: true
            };
            this._observer.observe(document.body, observerConfig);
            this._observer.observe(this._filterWidget, filterObserverConfig);
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "featureLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "footer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "switchValue", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "userInputFilterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "layerExpressions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "theme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "layerName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "operator", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "editingExpression", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "showCustomizeFilters", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "isAddingFilter", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "hideCustomFeatures", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "initLayerExpressions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "isInModal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfigViewModel.prototype, "messages", void 0);
        FilterConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("FilterConfigViewModel")
        ], FilterConfigViewModel);
        return FilterConfigViewModel;
    }(Accessor_1.default));
    return FilterConfigViewModel;
});
