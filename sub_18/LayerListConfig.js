define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/watchUtils", "../BaseComponent", "./LayerListConfig/LayerListConfigViewModel", "../TextEditorConfig/TextEditorConfig"], function (require, exports, tslib_1, decorators_1, widget_1, watchUtils_1, BaseComponent, LayerListConfigViewModel_1, TextEditorConfig) {
    "use strict";
    LayerListConfigViewModel_1 = tslib_1.__importDefault(LayerListConfigViewModel_1);
    var CSS = {
        base: "layer-list-config",
        select: "layer-list-config__select",
        switchContainer: "layer-list-config__tooltip-icon-switch-container",
        conditionalLabel: "layer-list-config__conditional-label",
        span: "layer-list-config__label-span"
    };
    var LayerListConfig = (function (_super) {
        tslib_1.__extends(LayerListConfig, _super);
        function LayerListConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.viewModel = new LayerListConfigViewModel_1.default();
            _this.messages = null;
            return _this;
        }
        LayerListConfig.prototype.destroy = function () {
            this.textEditor.destroy();
            this.textEditor = null;
        };
        LayerListConfig.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, editorTipItem, configSettingsMessages;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            return [4, this.loadAllMapResources()];
                        case 1:
                            _b.sent();
                            return [3, 4];
                        case 2:
                            _a = _b.sent();
                            return [3, 4];
                        case 3:
                            this._showAllSections = this._checkForSection("*");
                            editorTipItem = this.viewModel.createTipItem("layer-list-editor", this.messages.textEditorTooltip);
                            this._legendTipItem = this.viewModel.createTipItem("layer-list-legend", this.messages.legendTooltip);
                            this._zoomTipItem = this.viewModel.createTipItem("layer-list-zoom", this.messages.zoomTooltip);
                            this._contentTipItem = this.viewModel.createTipItem("layer-list-content", this.messages.addContentTooltip);
                            this._tableTipItem = this.viewModel.createTipItem("layer-list-table", this.messages.addTableTooltip);
                            configSettingsMessages = this.configPanelViewModel.presetConfigSettings.configSettingsMessages;
                            if (this._checkForSection("addContent")) {
                                this.textEditor = new TextEditorConfig({
                                    fieldName: "layerListContentEditor",
                                    tipItem: editorTipItem,
                                    header: this.messages.textEditorHeader,
                                    configPanelViewModel: this.configPanelViewModel,
                                    configSettingsMessages: configSettingsMessages
                                });
                                this.own([
                                    this.textEditor.on("setTextEditorData", function () {
                                        _this.viewModel.generateOutput();
                                    }),
                                    watchUtils_1.watch(this.textEditor, "editorData", function (editorData) {
                                        _this.config.content = editorData;
                                    })
                                ]);
                            }
                            this.viewModel.initLayerListConfig();
                            return [7];
                        case 4: return [2];
                    }
                });
            });
        };
        LayerListConfig.prototype.render = function () {
            var _a;
            var select = this._renderSelectLayer();
            var conditionals = null;
            var editor = null;
            if (this.layers && this.layers.length) {
                conditionals = this._renderConditionals(this.config);
                editor = this._checkForSection("addContent") ? (_a = this.textEditor) === null || _a === void 0 ? void 0 : _a.render() : null;
            }
            return (widget_1.tsx("fieldset", { class: CSS.base },
                widget_1.tsx("legend", null, this.messages.label),
                widget_1.tsx("div", null,
                    select,
                    conditionals,
                    editor)));
        };
        LayerListConfig.prototype._renderSelectLayer = function () {
            var _a, _b;
            var widgetInfoToolTip = (_a = this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("label", null,
                widget_1.tsx("span", { class: CSS.span },
                    this.messages.select,
                    " ",
                    widgetInfoToolTip),
                widget_1.tsx("select", { bind: this, class: CSS.select, onchange: this._handleSelectLayer }, (_b = this.layers) === null || _b === void 0 ? void 0 : _b.map(function (layer) {
                    return (widget_1.tsx("option", { key: layer.id, value: layer.id }, layer.title));
                }))));
        };
        LayerListConfig.prototype._renderConditionals = function (config) {
            var addLegend = this._checkForSection("addLegend")
                ? this._renderConditional("addLegend", this.messages.legend, config.addLegend, this._legendTipItem)
                : null;
            var addZoom = this._checkForSection("addZoom")
                ? this._renderConditional("addZoom", this.messages.zoom, config.addZoom, this._zoomTipItem)
                : null;
            var addTable = this._checkForSection("addTable")
                ? this._renderConditional("addTable", this.messages.addTable, config.addTable, this._tableTipItem)
                : null;
            var addContent = this._checkForSection("addContent")
                ? this._renderConditional("addContent", this.messages.addContent, config.addContent, this._contentTipItem)
                : null;
            return (widget_1.tsx("div", null,
                addLegend,
                addZoom,
                addTable,
                addContent));
        };
        LayerListConfig.prototype._renderConditional = function (key, title, switched, tipItem) {
            var tip = tipItem === null || tipItem === void 0 ? void 0 : tipItem.renderTipCalciteIcon();
            return (widget_1.tsx("label", { bind: this, onclick: this._preventDefault, class: CSS.conditionalLabel },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: CSS.span }, title),
                widget_1.tsx("div", { class: CSS.switchContainer },
                    tip,
                    widget_1.tsx("calcite-switch", { oncalciteSwitchChange: this._handleSwitch.bind(this, key), checked: switched }))));
        };
        LayerListConfig.prototype._handleSelectLayer = function (event) {
            event.preventDefault();
            var node = event.target;
            this.config = this.layers.find(function (_a) {
                var id = _a.id;
                return id === node.value;
            });
            this.viewModel.setEditorData(node.value);
            if (this.config.content) {
                this.textEditor.viewModel.updateCKEDITOR();
            }
        };
        LayerListConfig.prototype._preventDefault = function (event) {
            event.preventDefault();
        };
        LayerListConfig.prototype._handleSwitch = function (key, event) {
            var node = event.target;
            this.config[key] = node.checked;
            this.viewModel.generateOutput();
        };
        LayerListConfig.prototype._checkForSection = function (section) {
            var _a;
            return (this.sections &&
                (this._showAllSections ||
                    this.sections === section ||
                    (Array.isArray(this.sections) && !!((_a = this.sections) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x === section; })))));
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.map")
        ], LayerListConfig.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], LayerListConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.input")
        ], LayerListConfig.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], LayerListConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.textEditor")
        ], LayerListConfig.prototype, "textEditor", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.layers")
        ], LayerListConfig.prototype, "layers", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.sections")
        ], LayerListConfig.prototype, "sections", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.supportedLayerTypes")
        ], LayerListConfig.prototype, "supportedLayerTypes", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.config")
        ], LayerListConfig.prototype, "config", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LayerListConfig/resources")
        ], LayerListConfig.prototype, "messages", void 0);
        LayerListConfig = tslib_1.__decorate([
            decorators_1.subclass("LayerListConfig")
        ], LayerListConfig);
        return LayerListConfig;
    }(BaseComponent));
    return LayerListConfig;
});
