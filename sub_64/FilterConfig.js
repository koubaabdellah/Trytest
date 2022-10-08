define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/reactiveUtils", "esri/widgets/support/widget", "esri/intl", "../BaseComponent", "./FilterConfig/FilterConfigViewModel", "../../utils/focusUtils", "./UserInputFilterConfig"], function (require, exports, tslib_1, decorators_1, reactiveUtils_1, widget_1, intl_1, BaseComponent, FilterConfigViewModel, focusUtils_1, UserInputFilterConfig) {
    "use strict";
    var CSS = {
        base: "filter-config",
        globalShell: "filter-config__global-shell",
        view: "filter-config__view",
        filterPanel: "filter-config__filter-panel",
        filterContainer: "filter-config__filter-container",
        filterContainerModal: "filter-config__filter-container filter-config__filter-container--modal",
        filterDescContainer: "filter-config__filter-desc-container",
        filterDesc: "filter-config__filter-desc",
        filterInput: "filter-config__filter-input",
        select: "filter-config__select",
        addFilter: "filter-config__add-filter",
        addSingleFilter: "filter-config__add-single-filter",
        filterListItem: "filter-config__filter-list-item",
        layerInput: "filter-config__layer-input",
        label: "esri-config-panel__config-setting-label",
        summary: "filter-config__summary",
        summaryLabel: "filter-config__summary-label",
        summaryItem: "filter-config__summary-item",
        summaryCount: "filter-config__summary-item--count",
        customizeFilters: "filter-config__customize-filters",
        noLabelMargin: "filter-config__layer-filter-container--no-label-margin",
        filterGroup: "filter-config__filter-group",
        footer: "filter-config__footer",
        footerGlobalFilter: "filter-config__footer filter-config__footer--global-filter"
    };
    var FilterConfig = (function (_super) {
        tslib_1.__extends(FilterConfig, _super);
        function FilterConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.viewModel = new FilterConfigViewModel();
            _this.messages = null;
            return _this;
        }
        FilterConfig.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.theme = this.getTheme();
                            this._selectLayerTipItem = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-select-layer-filter-config", "select-layer-filter-config", this.messages.selectLayerTooltip);
                            this._customFilterTipItem = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-custom-filter-filter-config", "custom-filter-filter-config", this.messages.customFiltersTooltip);
                            this._layerNameTipItem = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-layer-name-filter-config", "layer-name-filter-config", this.messages.layerNameTooltip);
                            this._operatorTipItem = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-operator-filter-config", "operator-filter-config", this.messages.operatorTooltip);
                            this.userInputFilterConfig = new UserInputFilterConfig({
                                configPanelViewModel: this.configPanelViewModel,
                                viewModel: this.viewModel
                            });
                            return [4, reactiveUtils_1.whenOnce(function () { return _this.map.loaded; })];
                        case 1:
                            _a.sent();
                            this.viewModel.initFilterConfig();
                            this.own([
                                reactiveUtils_1.watch(function () { return _this.map; }, function () {
                                    _this.viewModel.initFilterConfig();
                                }),
                                reactiveUtils_1.when(function () { return _this.isAddingFilter === true; }, function () {
                                    var predefinedItem = document.getElementById("predefined-item");
                                    if (predefinedItem)
                                        predefinedItem.checked = true;
                                })
                            ]);
                            return [2];
                    }
                });
            });
        };
        FilterConfig.prototype.render = function () {
            var selectLayer = this._renderSelectLayer();
            var filterPanel = this._renderPanel();
            var customizeFeatures = !this.showCustomizeFilters
                ? null
                : this.hideCustomFeatures
                    ? this._renderOneFilter()
                    : this._renderCustomizeFeatures();
            var summary = this.layerExpressions && Object.keys(this.layerExpressions).length > 0 && this._renderSummary();
            return (widget_1.tsx("div", { bind: this, class: CSS.base },
                this.configPanelViewModel.flowSettingsUI.content ? (filterPanel) : (widget_1.tsx("div", { key: "layer-filter-container", class: CSS.noLabelMargin },
                    selectLayer,
                    customizeFeatures,
                    summary)),
                widget_1.tsx("div", { bind: this.viewModel, id: "filterView", key: "filter-view", class: CSS.view, afterCreate: this.viewModel.initializeMapView })));
        };
        FilterConfig.prototype._renderSelectLayer = function () {
            var _this = this;
            var _a, _b;
            var selectLayerTipItem = (_a = this._selectLayerTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("label", { key: "select-layer", onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.label },
                    this.messages.select,
                    " ",
                    selectLayerTipItem),
                widget_1.tsx("select", { bind: this, class: CSS.select, onchange: this.viewModel.handleSelectLayer, onkeydown: focusUtils_1.handleFocusElFromSettingsPanel, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, afterCreate: function (select) {
                        var _a;
                        _this.showCustomizeFilters = !!((_a = _this.selectedLayer) === null || _a === void 0 ? void 0 : _a.id);
                        select.value = _this.selectedLayer ? _this.selectedLayer.id : "default";
                    } },
                    widget_1.tsx("option", { value: "default" },
                        "--",
                        this.messages.select,
                        "--"), (_b = this.featureLayers) === null || _b === void 0 ? void 0 :
                    _b.map(function (layer) {
                        return (widget_1.tsx("option", { key: layer.id, value: layer.id }, layer.title));
                    }))));
        };
        FilterConfig.prototype._renderSelectOperator = function () {
            var _a;
            var operatorTipItem = (_a = this._operatorTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("label", { key: "select-operator", onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.label },
                    this.messages.filterOperator,
                    " ",
                    operatorTipItem),
                widget_1.tsx("select", { bind: this, class: CSS.select, onchange: this.viewModel.handleSelectOperator.bind(this.viewModel), onkeydown: focusUtils_1.handleFocusElFromSettingsPanel, afterCreate: this._handleSelectCreate, afterUpdate: this._handleSelectCreate }, [" AND ", " OR "].map(function (operator) {
                    return widget_1.tsx("option", { value: operator }, operator.trim());
                }))));
        };
        FilterConfig.prototype._renderCustomizeFeatures = function () {
            var layerName = this._renderLayerInput();
            var customFilters = this._renderAddCustomFilter();
            var selectOperator = this._renderSelectOperator();
            return (widget_1.tsx("div", { key: "custom-filters", class: CSS.customizeFilters },
                layerName,
                selectOperator,
                customFilters));
        };
        FilterConfig.prototype._renderOneFilter = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            var expression = (_d = (_c = (_a = this.layerExpressions) === null || _a === void 0 ? void 0 : _a[(_b = this.selectedLayer) === null || _b === void 0 ? void 0 : _b.id]) === null || _c === void 0 ? void 0 : _c.expressions) === null || _d === void 0 ? void 0 : _d[0];
            var customFilterTipItem = (_e = this._customFilterTipItem) === null || _e === void 0 ? void 0 : _e.renderTipCalciteIcon();
            return (widget_1.tsx("div", { key: "custom-filters-container", class: CSS.addSingleFilter, afterCreate: function (div) {
                    new ResizeObserver(function () {
                        div === null || div === void 0 ? void 0 : div.scrollIntoView(false);
                    }).observe(div);
                } },
                widget_1.tsx("label", { key: "custom-filter", onclick: this._preventDefault },
                    widget_1.tsx("span", { class: CSS.label },
                        this.messages.customFilters,
                        " ",
                        customFilterTipItem),
                    ((_h = (_f = this.layerExpressions) === null || _f === void 0 ? void 0 : _f[(_g = this.selectedLayer) === null || _g === void 0 ? void 0 : _g.id]) === null || _h === void 0 ? void 0 : _h.expressions.length) ? (widget_1.tsx("calcite-button", { color: "blue", appearance: "outline", "icon-start": "pencil", width: "full", onclick: this._handleEditExpression.bind(this, expression) }, (_j = this.messages) === null || _j === void 0 ? void 0 : _j.editFilter)) : (widget_1.tsx("calcite-button", { bind: this, color: "blue", appearance: "outline", "icon-start": "plus", width: "full", onclick: this._handleAddFilter }, (_k = this.messages) === null || _k === void 0 ? void 0 : _k.addFilter)))));
        };
        FilterConfig.prototype._renderAddCustomFilter = function () {
            var _a;
            var filterList = this._renderFilterList();
            var customFilterTipItem = (_a = this._customFilterTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("label", { key: "custom-filter", onclick: this._preventDefault, afterCreate: function (div) {
                    new ResizeObserver(function () {
                        div === null || div === void 0 ? void 0 : div.scrollIntoView(false);
                    }).observe(div);
                } },
                widget_1.tsx("span", { class: CSS.label },
                    this.messages.customFilters,
                    " ",
                    customFilterTipItem),
                widget_1.tsx("div", { class: CSS.filterDescContainer },
                    widget_1.tsx("p", { class: CSS.filterDesc }, this.messages.customFilterDesc),
                    filterList,
                    widget_1.tsx("div", { class: CSS.addFilter },
                        widget_1.tsx("calcite-button", { bind: this, scale: "s", color: "blue", appearance: "outline", "icon-start": "plus", width: "full", onclick: this._handleAddFilter }, this.messages.addFilter)))));
        };
        FilterConfig.prototype._renderFilterList = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var expressions = (_d = (_c = (_a = this.layerExpressions) === null || _a === void 0 ? void 0 : _a[(_b = this.selectedLayer) === null || _b === void 0 ? void 0 : _b.id]) === null || _c === void 0 ? void 0 : _c.expressions) !== null && _d !== void 0 ? _d : [];
            return expressions && expressions.length ? (widget_1.tsx("calcite-value-list", { bind: this, "drag-enabled": "true", afterCreate: this._handleExpressionListCreation }, expressions.map(function (expression, index) {
                var _a, _b;
                return (widget_1.tsx("calcite-value-list-item", { bind: _this, key: expression.name + "-" + index, class: CSS.filterListItem, label: expression.name, value: expression.index, afterCreate: _this._removePickListStyling },
                    widget_1.tsx("calcite-action", { label: (_a = _this.messages) === null || _a === void 0 ? void 0 : _a.editFilter, slot: "actions-end", icon: "pencil", scale: "s", onclick: _this._handleEditExpression.bind(_this, expression) }),
                    widget_1.tsx("calcite-action", { label: (_b = _this.messages) === null || _b === void 0 ? void 0 : _b.removeExpression, slot: "actions-end", icon: "trash", scale: "s", onclick: _this.viewModel.handleRemoveExpression.bind(_this.viewModel, expression) })));
            }))) : null;
        };
        FilterConfig.prototype._renderPanel = function () {
            var _a;
            var filterSwitch = this.isAddingFilter && !this.hideCustomFeatures ? this._renderFilterSwitch() : null;
            var filterClass = this.hideCustomFeatures && !this.isInModal ? CSS.globalShell : "";
            return (widget_1.tsx("div", { key: "filer-config-panel", class: this.isInModal ? CSS.filterContainerModal : CSS.filterPanel },
                filterSwitch,
                this.switchValue === "userInput"
                    ? (_a = this.userInputFilterConfig) === null || _a === void 0 ? void 0 : _a.render() : this.switchValue === "predefined"
                    ? [
                        widget_1.tsx("arcgis-filter", { bind: this.viewModel, afterCreate: this.viewModel.createFilterWrapper, class: filterClass, layer: this.selectedLayer, view: this.view, dismissible: true, tipMsg: this.messages.filterDescription, lang: intl_1.getLocale(), hideButtons: true, mode: "layer-view" }),
                        this._renderFilterFooter()
                    ]
                    : null));
        };
        FilterConfig.prototype._renderLayerInput = function () {
            var _a;
            var layerNameTipItem = (_a = this._layerNameTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("label", { key: "layer-input", onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.label },
                    this.messages.layerInput,
                    " ",
                    layerNameTipItem),
                widget_1.tsx("input", { class: CSS.layerInput, bind: this.viewModel, onkeyup: this.viewModel.handleLayerInput, type: "text", value: this.layerName })));
        };
        FilterConfig.prototype._renderSummary = function () {
            var _this = this;
            return (widget_1.tsx("label", { key: "select-layer" },
                widget_1.tsx("span", { class: CSS.summaryLabel }, this.messages.summary),
                widget_1.tsx("ul", { class: CSS.summary }, Object.values(this.layerExpressions).map(function (layerExpression) {
                    var expressions = layerExpression.expressions, title = layerExpression.title;
                    return (widget_1.tsx("li", { key: title + "-summary", class: CSS.summaryItem },
                        widget_1.tsx("div", null,
                            widget_1.tsx("p", null, title)),
                        widget_1.tsx("div", null,
                            widget_1.tsx("p", { class: CSS.summaryCount }, _this._filtersSummary(expressions.length)))));
                }))));
        };
        FilterConfig.prototype._renderFilterSwitch = function () {
            var _this = this;
            return (widget_1.tsx("div", { class: CSS.filterGroup },
                widget_1.tsx("calcite-radio-group", { bind: this.viewModel, width: "full", oncalciteRadioGroupChange: function (event) {
                        _this.switchValue = event.detail;
                        if (_this.switchValue === "userInput") {
                            _this.viewModel.handleUserInputClick();
                        }
                        if (_this.switchValue === "predefined") {
                            _this.selectedLayer.definitionExpression = _this.initLayerExpressions[_this.selectedLayer.id];
                        }
                    } },
                    widget_1.tsx("calcite-radio-group-item", { id: "predefined-item", afterCreate: this._createRadioGroupItem, bind: this.viewModel, value: "predefined", checked: "" }, this.messages.predefined),
                    widget_1.tsx("calcite-radio-group-item", { afterCreate: this._createRadioGroupItem, bind: this.viewModel, value: "userInput" }, this.messages.userInput))));
        };
        FilterConfig.prototype._renderFilterFooter = function () {
            return (widget_1.tsx("div", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "footer", class: this.hideCustomFeatures ? CSS.footerGlobalFilter : CSS.footer },
                this.hideCustomFeatures ? null : (widget_1.tsx("label", { class: CSS.filterInput },
                    widget_1.tsx("span", null, this.messages.expressionNameInput),
                    widget_1.tsx("calcite-input", { bind: this.viewModel, afterCreate: this.viewModel.createInput, onkeyup: this.viewModel.handleInput }))),
                widget_1.tsx("calcite-button", { bind: this.viewModel, width: "half", onclick: this.viewModel.handleSaveFilter }, this.messages.save),
                widget_1.tsx("calcite-button", { bind: this.viewModel, appearance: "outline", width: "half", onclick: this.viewModel.handleFilterDestroy }, this.messages.cancel)));
        };
        FilterConfig.prototype._handleExpressionListCreation = function (valueList) {
            valueList.addEventListener("calciteListOrderChange", this.viewModel.handleOrderChange.bind(this.viewModel));
        };
        FilterConfig.prototype._removePickListStyling = function (valueListItem) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var style, pickListItem;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            style = document.createElement("style");
                            style.innerHTML = ":host(:hover) { background-color: unset!important; }\n    .label { cursor: unset!important; }";
                            return [4, this.viewModel.checkForElement(valueListItem.shadowRoot, "calcite-pick-list-item")];
                        case 1:
                            pickListItem = _a.sent();
                            pickListItem === null || pickListItem === void 0 ? void 0 : pickListItem.shadowRoot.prepend(style);
                            return [2];
                    }
                });
            });
        };
        FilterConfig.prototype._filtersSummary = function (numFilters) {
            var _a = this.messages, filter = _a.filter, filters = _a.filters;
            if (intl_1.prefersRTL()) {
                return numFilters === 1 ? filter + " " + numFilters : filters + " " + numFilters;
            }
            else {
                return numFilters === 1 ? numFilters + " " + filter : numFilters + " " + filters;
            }
        };
        FilterConfig.prototype._createRadioGroupItem = function (item) {
            if (item.value === "predefined") {
                item.checked = true;
            }
            var style = document.createElement("style");
            style.innerHTML = "label { word-break: break-word; }";
            item.shadowRoot.prepend(style);
        };
        FilterConfig.prototype._handleSelectCreate = function (select) {
            var _a;
            if (this.layerExpressions[(_a = this.selectedLayer) === null || _a === void 0 ? void 0 : _a.id]) {
                var operator = this.layerExpressions[this.selectedLayer.id].operator;
                select.value = operator ? operator : this.operator;
            }
        };
        FilterConfig.prototype._handleAddFilter = function () {
            this.editingExpression = false;
            this.switchValue = "predefined";
            this.isAddingFilter = true;
            this.selectedLayer.definitionExpression = this.initLayerExpressions[this.selectedLayer.id];
            this.configPanelViewModel.flowSettingsUI.setUI({
                heading: this.messages.addFilter,
                content: this,
                isFullHeight: this.isInModal ? false : true
            });
        };
        FilterConfig.prototype._handleEditExpression = function (expression, event) {
            event.stopPropagation();
            this.editingExpression = true;
            this.isAddingFilter = false;
            this.switchValue = (expression === null || expression === void 0 ? void 0 : expression.type) ? "userInput" : "predefined";
            this.viewModel.handleEditExpression(expression);
            this.configPanelViewModel.flowSettingsUI.setUI({
                heading: this.messages.editExpression,
                content: this,
                isFullHeight: this.isInModal ? false : true
            });
        };
        FilterConfig.prototype._preventDefault = function (e) {
            e.preventDefault();
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.map")
        ], FilterConfig.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.view")
        ], FilterConfig.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], FilterConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fieldName")
        ], FilterConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.input")
        ], FilterConfig.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FilterConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.featureLayers")
        ], FilterConfig.prototype, "featureLayers", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedLayer")
        ], FilterConfig.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.layerExpressions")
        ], FilterConfig.prototype, "layerExpressions", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.theme")
        ], FilterConfig.prototype, "theme", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.footer")
        ], FilterConfig.prototype, "footer", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.layerName")
        ], FilterConfig.prototype, "layerName", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.operator")
        ], FilterConfig.prototype, "operator", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.switchValue")
        ], FilterConfig.prototype, "switchValue", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.userInputFilterConfig")
        ], FilterConfig.prototype, "userInputFilterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.editingExpression")
        ], FilterConfig.prototype, "editingExpression", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.showCustomizeFilters")
        ], FilterConfig.prototype, "showCustomizeFilters", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isAddingFilter")
        ], FilterConfig.prototype, "isAddingFilter", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.hideCustomFeatures")
        ], FilterConfig.prototype, "hideCustomFeatures", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.initLayerExpressions")
        ], FilterConfig.prototype, "initLayerExpressions", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isInModal")
        ], FilterConfig.prototype, "isInModal", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], FilterConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.messages"),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/FilterConfig/resources")
        ], FilterConfig.prototype, "messages", void 0);
        FilterConfig = tslib_1.__decorate([
            decorators_1.subclass("FilterConfig")
        ], FilterConfig);
        return FilterConfig;
    }(BaseComponent));
    return FilterConfig;
});
