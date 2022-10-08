define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../../configWidgets/BaseComponent", "../../configWidgets/PageConfig/PageConfig/PageConfigViewModel", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, PageConfigViewModel, labelSettingMargin_1) {
    "use strict";
    var CSS = {
        base: "esri-page-config",
        component: "esri-config-panel__component",
        colorPicker: "esri-config-panel__color-picker",
        colorPickerLabel: "esri-config-panel__color-picker--label",
        colorPickerSwatch: "esri-config-panel__color-picker--swatch",
        labelInputText: "esri-page-config__label-input-text"
    };
    var PageConfig = (function (_super) {
        tslib_1.__extends(PageConfig, _super);
        function PageConfig(params) {
            var _this = _super.call(this, params) || this;
            _this.fileUploadConfig = null;
            _this.configPanelViewModel = null;
            _this.savedData = null;
            _this.outputJSON = null;
            _this.messages = null;
            _this.showTitleColor = true;
            _this.showSubtitleColor = true;
            _this.showTextPosition = true;
            _this.showButtonText = true;
            _this.showButtonColor = true;
            _this.showBackgroundOptions = true;
            _this.titleTipItem = null;
            _this.subtitleTipItem = null;
            _this.backgroundTipItem = null;
            _this.viewModel = new PageConfigViewModel();
            return _this;
        }
        PageConfig.prototype.render = function () {
            var title = this._renderTitle();
            var titleColor = this._renderTitleColor();
            var subtitle = this._renderSubtitle();
            var subtitleColor = this._renderSubtitleColor();
            var buttonText = this._renderButtonText();
            var buttonTextColor = this._renderButtonTextColor();
            var background = this._renderBackground();
            return (widget_1.tsx("div", { class: CSS.base },
                title,
                titleColor,
                subtitle,
                subtitleColor,
                buttonText,
                buttonTextColor,
                background));
        };
        PageConfig.prototype._renderTitle = function () {
            var _this = this;
            var _a, _b;
            return (widget_1.tsx("label", { class: labelSettingMargin_1.marginClassNames.labelContainer },
                widget_1.tsx("span", { class: this.classes(CSS.labelInputText, labelSettingMargin_1.marginClassNames.labelText) },
                    this.messages.title,
                    this.titleTipItem ? (_a = this.titleTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null),
                widget_1.tsx("input", { bind: this, onchange: function (e) {
                        _this.viewModel.handleOutputJSON(e);
                    }, type: "text", value: (_b = this.savedData) === null || _b === void 0 ? void 0 : _b.title, "data-field-type": "title" })));
        };
        PageConfig.prototype._renderTitleColor = function () {
            var _a, _b;
            return this.showTitleColor
                ? this._renderColorPicker("titleColor", (_a = this.messages) === null || _a === void 0 ? void 0 : _a.titleColor, (_b = this.savedData) === null || _b === void 0 ? void 0 : _b.titleColor)
                : null;
        };
        PageConfig.prototype._renderSubtitle = function () {
            var _this = this;
            var _a, _b;
            return (widget_1.tsx("label", { class: labelSettingMargin_1.marginClassNames.labelContainer },
                widget_1.tsx("span", { class: this.classes(CSS.labelInputText, labelSettingMargin_1.marginClassNames.labelText) },
                    this.messages.subtitle,
                    this.subtitleTipItem
                        ? (_a = this.subtitleTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null),
                widget_1.tsx("input", { bind: this, onchange: function (e) {
                        _this.viewModel.handleOutputJSON(e);
                    }, type: "text", value: (_b = this.savedData) === null || _b === void 0 ? void 0 : _b.subtitle, "data-field-type": "subtitle" })));
        };
        PageConfig.prototype._renderSubtitleColor = function () {
            var _a, _b;
            return this.showSubtitleColor
                ? this._renderColorPicker("subtitleColor", (_a = this.messages) === null || _a === void 0 ? void 0 : _a.subtitleColor, (_b = this.savedData) === null || _b === void 0 ? void 0 : _b.subtitleColor)
                : null;
        };
        PageConfig.prototype._renderButtonText = function () {
            var _this = this;
            var _a;
            return this.showButtonText ? (widget_1.tsx("label", { class: labelSettingMargin_1.marginClassNames.labelContainer },
                this.messages.buttonText,
                widget_1.tsx("input", { bind: this, onchange: function (e) {
                        _this.viewModel.handleOutputJSON(e);
                    }, type: "text", value: (_a = this.savedData) === null || _a === void 0 ? void 0 : _a.buttonText, "data-field-type": "buttonText" }))) : null;
        };
        PageConfig.prototype._renderButtonTextColor = function () {
            var _a, _b;
            return this.showButtonColor
                ? this._renderColorPicker("buttonTextColor", (_a = this.messages) === null || _a === void 0 ? void 0 : _a.buttonTextColor, (_b = this.savedData) === null || _b === void 0 ? void 0 : _b.buttonTextColor)
                : null;
        };
        PageConfig.prototype._renderBackground = function () {
            var _a, _b, _c, _d, _e;
            var radioButtonGroup = this._renderRadioButtonGroup();
            return this.showBackgroundOptions
                ? [
                    widget_1.tsx("label", { class: labelSettingMargin_1.marginClassNames.labelContainer },
                        widget_1.tsx("span", { class: this.classes(CSS.labelInputText, labelSettingMargin_1.marginClassNames.labelText) },
                            this.messages.background,
                            this.backgroundTipItem
                                ? (_a = this.backgroundTipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon() : null),
                        radioButtonGroup),
                    this.savedData.background.backgroundType === "color"
                        ? this._renderColorPicker("backgroundColor", (_b = this.messages) === null || _b === void 0 ? void 0 : _b.selectColor, (_d = (_c = this.savedData) === null || _c === void 0 ? void 0 : _c.background) === null || _d === void 0 ? void 0 : _d.backgroundColor)
                        : (_e = this.fileUploadConfig) === null || _e === void 0 ? void 0 : _e.render()
                ]
                : null;
        };
        PageConfig.prototype._renderRadioButtonGroup = function () {
            var _this = this;
            var backgroundColorOption = this._renderBackgroundColorOption();
            var backgroundImageOption = this._renderBackgroundImageOption();
            return (widget_1.tsx("calcite-radio-group", { bind: this, afterCreate: function (calciteRadioBtnGroup) {
                    calciteRadioBtnGroup.addEventListener("calciteRadioGroupChange", function (e) {
                        var node = e.target;
                        if (_this.savedData.background.type !== node.selectedItem.value) {
                            _this.viewModel.handleOutputJSON(e, calciteRadioBtnGroup);
                        }
                    });
                }, layout: "horizontal", appearance: "solid", scale: "s", role: "radiogroup", width: "full", "data-field-type": "backgroundType" },
                backgroundColorOption,
                backgroundImageOption));
        };
        PageConfig.prototype._renderBackgroundColorOption = function () {
            var _a, _b;
            return (widget_1.tsx("calcite-radio-group-item", { value: "color", checked: ((_b = (_a = this.savedData) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.backgroundType) === "color" ? true : false }, this.messages.color));
        };
        PageConfig.prototype._renderBackgroundImageOption = function () {
            var _a, _b;
            return (widget_1.tsx("calcite-radio-group-item", { value: "image", role: "radio", scale: "s", checked: ((_b = (_a = this.savedData) === null || _a === void 0 ? void 0 : _a.background) === null || _b === void 0 ? void 0 : _b.backgroundType) === "image" ? true : false }, this.messages.image));
        };
        PageConfig.prototype._renderColorPicker = function (fieldName, label, value) {
            var _this = this;
            var swatch = this._renderColorPickerSwatch(fieldName, value);
            this.configPanelViewModel.popoverMap["coverPage" + fieldName] = (widget_1.tsx("calcite-popover", { bind: this, afterCreate: function (colorPopoverNode) {
                    colorPopoverNode.addEventListener("calcitePopoverOpen", function () {
                        var _a;
                        (_a = _this.configPanelViewModel.popoverContentMap["coverPage" + fieldName]) === null || _a === void 0 ? void 0 : _a.setAttribute("active", "");
                    });
                    colorPopoverNode.addEventListener("calcitePopoverClose", function () {
                        var _a;
                        (_a = _this.configPanelViewModel.popoverContentMap["coverPage" + fieldName]) === null || _a === void 0 ? void 0 : _a.removeAttribute("active");
                    });
                }, "reference-element": "coverPage" + fieldName + "Swatch", placement: "trailing", "auto-close": "true" },
                widget_1.tsx("calcite-color-picker", { bind: this, afterCreate: function (colorPickerNode) {
                        colorPickerNode.addEventListener("calciteColorPickerChange", function (calciteColorPickerChangeE) {
                            var _a;
                            var swatch = (_a = _this.configPanelViewModel.popoverContentMap) === null || _a === void 0 ? void 0 : _a["coverPage" + fieldName];
                            if (swatch) {
                                swatch.color = calciteColorPickerChangeE.target.value;
                            }
                            _this._handleColor(calciteColorPickerChangeE.target);
                        });
                    }, "hide-channels": "true", "hide-saved": "true", value: value, scale: "m", "data-field-type": fieldName })));
            return (widget_1.tsx("label", { class: this.classes(CSS.component, CSS.colorPicker, labelSettingMargin_1.marginClassNames.labelContainer) },
                widget_1.tsx("span", { class: CSS.colorPickerLabel },
                    label,
                    widget_1.tsx("div", { class: CSS.colorPickerSwatch }, swatch))));
        };
        PageConfig.prototype._renderColorPickerSwatch = function (fieldName, value) {
            var _this = this;
            var _a, _b;
            var popoverManagerSwatch = this.configPanelViewModel
                .calcitePopoverManagerMap;
            if (!(popoverManagerSwatch === null || popoverManagerSwatch === void 0 ? void 0 : popoverManagerSwatch["coverPage" + fieldName])) {
                popoverManagerSwatch["coverPage" + fieldName] = (widget_1.tsx("calcite-color-picker-swatch", { bind: this, afterCreate: function (node) {
                        _this.configPanelViewModel.popoverContentMap["coverPage" + fieldName] = node;
                    }, color: value, id: "coverPage" + fieldName + "Swatch" }));
            }
            var swatch = (_b = (_a = popoverManagerSwatch === null || popoverManagerSwatch === void 0 ? void 0 : popoverManagerSwatch["coverPage" + fieldName]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b[0];
            if (swatch === null || swatch === void 0 ? void 0 : swatch.properties.hasOwnProperty("color")) {
                swatch.properties.color = value;
            }
            return popoverManagerSwatch["coverPage" + fieldName];
        };
        PageConfig.prototype._handleColor = function (node) {
            this.viewModel.handleColorOutputJSON(node);
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fileUploadConfig")
        ], PageConfig.prototype, "fileUploadConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], PageConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.savedData")
        ], PageConfig.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], PageConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/PageConfig/resources")
        ], PageConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "showTitleColor", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "showSubtitleColor", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "showTextPosition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "showButtonText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "showButtonColor", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "showBackgroundOptions", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "titleTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "subtitleTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PageConfig.prototype, "backgroundTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fieldName")
        ], PageConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: PageConfigViewModel
            })
        ], PageConfig.prototype, "viewModel", void 0);
        PageConfig = tslib_1.__decorate([
            decorators_1.subclass("PageConfig")
        ], PageConfig);
        return PageConfig;
    }(BaseComponent));
    return PageConfig;
});
