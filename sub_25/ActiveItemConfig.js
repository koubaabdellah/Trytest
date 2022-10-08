define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "./ActiveItemConfig/ActiveItemConfigViewModel", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, decorators_1, Widget, widget_1, ActiveItemConfigViewModel, labelSettingMargin_1) {
    "use strict";
    var CSS = {
        base: "esri-active-item-config",
        component: "esri-config-panel__component",
        activeItem: "esri-config-panel__active-item",
        activeItemDropdown: "esri-config-panel__active-item-dropdown"
    };
    var ActiveItemConfig = (function (_super) {
        tslib_1.__extends(ActiveItemConfig, _super);
        function ActiveItemConfig(params) {
            var _this = _super.call(this, params) || this;
            _this.configPanelViewModel = null;
            _this.configSettings = null;
            _this.activeItemJSON = null;
            _this.messages = null;
            _this.viewModel = new ActiveItemConfigViewModel();
            return _this;
        }
        ActiveItemConfig.prototype.render = function () {
            var booleanNodes = this._renderBooleanNodes();
            var optionNodes = this._renderActiveItemOptionNodes();
            return (widget_1.tsx("div", { class: CSS.activeItem },
                widget_1.tsx("label", { class: CSS.component },
                    widget_1.tsx("span", { class: this.classes(labelSettingMargin_1.marginClassNames.labelText) }, this.messages.label),
                    widget_1.tsx("select", { bind: this, onchange: this.configSettings.handleSelect, "data-field-name": this.activeItemJSON.fieldName, class: this.classes(CSS.activeItemDropdown, labelSettingMargin_1.marginClassNames.removeTop), disabled: optionNodes.filter(function (optionNode) { return optionNode !== undefined; })
                            .length === 0 },
                        widget_1.tsx("option", { value: null }, this.messages.none),
                        optionNodes)),
                booleanNodes));
        };
        ActiveItemConfig.prototype._renderBooleanNodes = function () {
            var _this = this;
            if (this.configPanelViewModel.expressEnabled) {
                return this.activeItemJSON.options
                    .filter(function (option) { return option === null || option === void 0 ? void 0 : option.express; })
                    .map(function (activeOption) {
                    if ((activeOption === null || activeOption === void 0 ? void 0 : activeOption.type) === "conditional") {
                        return _this.configSettings.renderConditional(activeOption);
                    }
                    else {
                        return _this.configSettings.renderBoolean(activeOption);
                    }
                });
            }
            else {
                return this.activeItemJSON.options.map(function (activeOption) {
                    if ((activeOption === null || activeOption === void 0 ? void 0 : activeOption.type) === "conditional") {
                        return _this.configSettings.renderConditional(activeOption);
                    }
                    else {
                        return _this.configSettings.renderBoolean(activeOption);
                    }
                });
            }
        };
        ActiveItemConfig.prototype._renderActiveItemOptionNodes = function () {
            var _this = this;
            if (this.configPanelViewModel.expressEnabled) {
                return this.activeItemJSON.options
                    .filter(function (option) { return option === null || option === void 0 ? void 0 : option.express; })
                    .map(function (activeOption) {
                    return _this._renderActiveItemOptionNode(activeOption);
                });
            }
            else {
                return this.activeItemJSON.options.map(function (activeOption) {
                    return _this._renderActiveItemOptionNode(activeOption);
                });
            }
        };
        ActiveItemConfig.prototype._renderActiveItemOptionNode = function (activeOption) {
            var _a;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var draftAppData = (_a = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values) === null || _a === void 0 ? void 0 : _a.draft;
            var publishedAppData = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var fieldName = activeOption.fieldName, defaultValue = activeOption.defaultValue, optionValue = activeOption.optionValue, optionLabel = activeOption.optionLabel;
            var draftValue = draftAppData === null || draftAppData === void 0 ? void 0 : draftAppData[fieldName];
            var publishValue = publishedAppData === null || publishedAppData === void 0 ? void 0 : publishedAppData[fieldName];
            var dependentFieldDraftValue = draftAppData === null || draftAppData === void 0 ? void 0 : draftAppData[this.activeItemJSON.fieldName];
            var selected = this.viewModel.handleSelectedValue(publishedAppData, this.activeItemJSON, dependentFieldDraftValue, optionValue);
            if (draftValue !== undefined) {
                if (draftValue) {
                    return this._renderOptionNode(fieldName, selected, optionLabel, optionValue);
                }
            }
            else if (publishValue !== undefined) {
                if (publishValue) {
                    return this._renderOptionNode(fieldName, selected, optionLabel, optionValue);
                }
            }
            else {
                if (defaultValue) {
                    return this._renderOptionNode(fieldName, selected, optionLabel, optionValue);
                }
            }
        };
        ActiveItemConfig.prototype._renderOptionNode = function (fieldName, selected, optionLabel, optionValue) {
            return (widget_1.tsx("option", { key: "active-item-option-" + fieldName, value: optionValue, selected: selected }, optionLabel));
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], ActiveItemConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ActiveItemConfig.prototype, "configSettings", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ActiveItemConfig.prototype, "activeItemJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ActiveItemConfig/resources")
        ], ActiveItemConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ActiveItemConfig.prototype, "viewModel", void 0);
        ActiveItemConfig = tslib_1.__decorate([
            decorators_1.subclass("ActiveItemConfig")
        ], ActiveItemConfig);
        return ActiveItemConfig;
    }(Widget));
    return ActiveItemConfig;
});
