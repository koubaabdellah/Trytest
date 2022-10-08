define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "./ChartsConfig/ChartsConfigViewModel", "./ChartItemConfig", "../../icons/icons", "esri/core/watchUtils", "../../utils/shadowRootUtils"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, ChartsConfigViewModel, ChartItemConfig, icons_1, watchUtils_1, shadowRootUtils_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-charts-config",
        baseDark: "esri-charts-config--dark",
        header: "esri-charts-config-config__header",
        headerContainer: "esri-charts-config__header-container",
        content: "esri-charts-config__content-container",
        contentDark: "esri-charts-config__content-container--dark",
        topContent: "esri-charts-config__top-content",
        addSectionsContainer: "esri-charts-config__add-sections-container",
        addedSectionsText: "esri-charts-config__added-sections-text",
        valueListContainer: "esri-charts-config__value-list-container",
        actionMenu: "esri-charts-config__action-menu",
        actionMenuItem: "esri-charts-config__action-menu-item",
        groupHeaderDark: "esri-config-panel__group-header--dark"
    };
    var ChartsConfig = (function (_super) {
        tslib_1.__extends(ChartsConfig, _super);
        function ChartsConfig(params) {
            var _this = _super.call(this, params) || this;
            _this._chartItemConfig = new ChartItemConfig();
            _this.messages = null;
            _this.instructionsText = null;
            _this.fieldName = null;
            _this.chartItemsData = null;
            _this.chartItemConfigIsOpen = null;
            _this.configPanelViewModel = null;
            _this.operationalLayersWithCharts = null;
            _this.outputJSON = null;
            _this.savedData = null;
            _this.layerIds = [];
            _this.viewModel = new ChartsConfigViewModel();
            return _this;
        }
        ChartsConfig.prototype.postInitialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "messages", function () {
                _this._chartItemConfig = new ChartItemConfig({
                    viewModel: _this.viewModel,
                    messages: _this.messages
                });
            });
            this.own([
                watchUtils_1.when(this, "chartItemsData", function () {
                    var layerIds = Object.keys(_this.chartItemsData);
                    layerIds.sort(function (a, b) {
                        var aLayer = _this.operationalLayersWithCharts.find(function (layer) { return layer.id === a; });
                        var bLayer = _this.operationalLayersWithCharts.find(function (layer) { return layer.id === b; });
                        var aIndex = _this.operationalLayersWithCharts.indexOf(aLayer);
                        var bIndex = _this.operationalLayersWithCharts.indexOf(bLayer);
                        if (aIndex > bIndex) {
                            return -1;
                        }
                        if (aIndex < bIndex) {
                            return 1;
                        }
                        return 0;
                    });
                    _this.layerIds = layerIds;
                })
            ]);
        };
        ChartsConfig.prototype.destroy = function () {
            this._chartItemConfig.destroy();
            this.viewModel.destroy();
        };
        ChartsConfig.prototype.render = function () {
            var _a;
            var _b;
            var header = this._renderHeader();
            var content = this._renderContent();
            var baseDark = (_a = {},
                _a[CSS.baseDark] = this.getTheme() === "dark",
                _a);
            return (widget_1.tsx("div", { bind: this, key: this.fieldName, class: this.classes(CSS.base, baseDark) },
                header,
                content,
                this.chartItemConfigIsOpen ? (_b = this._chartItemConfig) === null || _b === void 0 ? void 0 : _b.render() : null));
        };
        ChartsConfig.prototype._renderHeader = function () {
            var _a;
            return (widget_1.tsx("header", { class: CSS.headerContainer },
                this.configPanelViewModel.expressEnabled ? (widget_1.tsx("h4", { class: CSS.header }, this.label)) : (widget_1.tsx("h3", { class: CSS.header }, this.label)), (_a = this.tipItem) === null || _a === void 0 ? void 0 :
                _a.renderTipCalciteIcon()));
        };
        ChartsConfig.prototype._renderContent = function () {
            var _a;
            var instructions = this._renderInstructions();
            var accordionContainer = this._renderAccordionContainer();
            var contentDark = (_a = {},
                _a[CSS.contentDark] = this.getTheme() === "dark",
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.content, contentDark) },
                widget_1.tsx("div", { class: CSS.topContent }, instructions),
                !this.chartItemConfigIsOpen ? accordionContainer : null));
        };
        ChartsConfig.prototype._renderInstructions = function () {
            var instructionsText = this.instructionsText
                ? this.instructionsText
                : this.messages.instructions;
            return widget_1.tsx("p", null, instructionsText);
        };
        ChartsConfig.prototype._renderAccordionContainer = function () {
            var accordionItems = this._renderAccordionItems();
            return (widget_1.tsx("div", { key: "value-list-item-container", class: CSS.valueListContainer },
                widget_1.tsx("calcite-accordion", { "selection-mode": "multi" }, accordionItems)));
        };
        ChartsConfig.prototype._renderAccordionItems = function () {
            var _this = this;
            return this.layerIds.map(function (layerId, layerIdIndex) {
                return (widget_1.tsx("calcite-accordion-item", { key: layerId + "-accordion-item", "item-title": _this.operationalLayersWithCharts.find(function (layer) { return layer.id === layerId; })
                        .title, bind: _this, afterCreate: function (node) {
                        if (layerIdIndex === 0) {
                            node.setAttribute("active", "");
                        }
                        shadowRootUtils_1.handleShadowRootStyles(node, ".accordion-item-title{word-break:break-word;}");
                    } }, _this._renderValueList(layerId)));
            });
        };
        ChartsConfig.prototype._renderValueList = function (layerId) {
            return (widget_1.tsx("calcite-value-list", { bind: this, dragEnabled: true, afterCreate: this._addOrderEventListener, "data-layer-id": layerId }, this._renderCalciteValueListItems(layerId)));
        };
        ChartsConfig.prototype._renderCalciteValueListItems = function (layerId) {
            var _this = this;
            var _a, _b, _c;
            return (_c = (_b = (_a = this.chartItemsData) === null || _a === void 0 ? void 0 : _a[layerId]) === null || _b === void 0 ? void 0 : _b.toArray()) === null || _c === void 0 ? void 0 : _c.map(function (item) {
                var title = item.title, id = item.id, visible = item.visible;
                return _this._renderValueListItem(title, id, visible, layerId);
            });
        };
        ChartsConfig.prototype._renderValueListItem = function (title, id, visible, layerId) {
            var _this = this;
            var _a, _b;
            return [
                widget_1.tsx("calcite-value-list-item", { bind: this, key: "value-list-item-" + id, label: title, "data-item-id": "" + id },
                    widget_1.tsx("calcite-action", { bind: this, onclick: this._toggleVisibility, slot: "actions-end", "data-item-id": id, "data-item-layer-id": layerId },
                        widget_1.tsx("calcite-icon", { icon: visible ? icons_1.default.viewVisible : icons_1.default.viewHide, scale: "s" })),
                    widget_1.tsx("calcite-dropdown", { slot: "actions-end", placement: "bottom-end" },
                        widget_1.tsx("calcite-action", { slot: "dropdown-trigger", appearance: "clear", scale: "s", icon: icons_1.default.ellipsis, text: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.more }),
                        widget_1.tsx("calcite-dropdown-group", { "selection-mode": "none" },
                            widget_1.tsx("calcite-dropdown-item", { bind: this, onclick: function () {
                                    var chartItemDataByLayer = _this.chartItemsData[layerId];
                                    var chartData = chartItemDataByLayer.find(function (chartItemData) { return chartItemData.id === id; });
                                    _this._chartItemConfig.layerTitle = _this.operationalLayersWithCharts.find(function (layer) { return layer.id === layerId; }).title;
                                    _this._chartItemConfig.chartItemToConfigure = chartData;
                                    _this.chartItemConfigIsOpen = true;
                                }, "icon-start": icons_1.default.pencil }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.edit))))
            ];
        };
        ChartsConfig.prototype._toggleVisibility = function (event) {
            var action = event.target;
            var id = action.getAttribute("data-item-id");
            var layerId = action.getAttribute("data-item-layer-id");
            var chartItemData = this.chartItemsData[layerId].find(function (chartData) { return chartData.id === id; });
            chartItemData.visible = !chartItemData.visible;
            var updatedJSON = this.viewModel.toJSON();
            this.outputJSON = updatedJSON;
        };
        ChartsConfig.prototype._addOrderEventListener = function (node) {
            var _this = this;
            node.addEventListener("calciteListOrderChange", function (e) {
                var node = e.target;
                var valueListItems = Array.from(node.children);
                var layerId = node.getAttribute("data-layer-id");
                _this._handleItemSort(valueListItems, layerId);
            });
        };
        ChartsConfig.prototype._handleItemSort = function (valueListItems, layerId) {
            this.viewModel.handleItemSort(valueListItems, layerId);
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.messages"),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ChartsConfig/resources")
        ], ChartsConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfig.prototype, "instructionsText", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fieldName")
        ], ChartsConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.chartItemsData")
        ], ChartsConfig.prototype, "chartItemsData", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.chartItemConfigIsOpen")
        ], ChartsConfig.prototype, "chartItemConfigIsOpen", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], ChartsConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.operationalLayersWithCharts")
        ], ChartsConfig.prototype, "operationalLayersWithCharts", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], ChartsConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.savedData")
        ], ChartsConfig.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ChartsConfig.prototype, "layerIds", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ChartsConfigViewModel
            })
        ], ChartsConfig.prototype, "viewModel", void 0);
        ChartsConfig = tslib_1.__decorate([
            decorators_1.subclass("ChartsConfig")
        ], ChartsConfig);
        return ChartsConfig;
    }(BaseComponent));
    return ChartsConfig;
});
