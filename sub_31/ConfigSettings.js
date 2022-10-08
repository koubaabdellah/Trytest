define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/watchUtils", "esri/widgets/Slider", "../Tips/TipItem", "./ConfigSettingsMap", "esri/intl", "../../icons/icons", "../../utils/utils", "../../utils/shadowRootUtils", "../../utils/focusUtils", "../../utils/url/urlUtils", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, watchUtils, Slider, TipItem, ConfigSettingsMap, intl_1, icons_1, utils_1, shadowRootUtils_1, focusUtils_1, urlUtils_1, labelSettingMargin_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        component: "esri-config-panel__component",
        dropdown: "esri-config-panel__dropdown",
        pickListDropDown: "esri-config-panel__picklist-dropdown",
        pickListMultiList: "esri-config-panel__picklist-dropdown-multi-list",
        pickListMultiListLabel: "esri-config-panel__picklist-dropdown-multi-list-label",
        boolean: "esri-config-panel__boolean",
        conditional: "esri-config-panel__conditional",
        stringInput: "esri-config-panel__string-input",
        tooltipIcon: "esri-config-panel__tooltip-icon",
        componentDarkMode: "esri-config-panel__component--dark",
        configSettingLabel: "esri-config-panel__config-setting-label",
        activeItem: "esri-config-panel__active-item",
        activeItemDropdown: "esri-config-panel__active-item-dropdown",
        colorPicker: "esri-config-panel__color-picker",
        colorPickerLabel: "esri-config-panel__color-picker--label",
        colorPickerSwatch: "esri-config-panel__color-picker--swatch",
        tooltipIconSwitchContainer: "esri-config-panel__tooltip-icon-switch-container",
        invalidUrl: "esri-config-panel__invalid-url",
        hide: "esri-config-panel__component--hide",
        customSlider: "esri-config-panel__custom-slider"
    };
    var ConfigSettings = (function (_super) {
        tslib_1.__extends(ConfigSettings, _super);
        function ConfigSettings(params) {
            var _this = _super.call(this, params) || this;
            _this._invalidUrlFieldNames = [];
            _this.configSettingsJSONMap = null;
            _this.configSettingsMap = new ConfigSettingsMap();
            _this.configPanelViewModel = null;
            _this.messages = null;
            _this.pageMessages = null;
            _this._DEFAULT_MAX_LENGTH = null;
            return _this;
        }
        ConfigSettings.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils.whenOnce(this, "configPanelViewModel", function () {
                    _this.configSettingsMap.set("configPanelViewModel", _this.configPanelViewModel);
                    watchUtils.whenDefined(_this.configSettingsMap, "configWidgetManager", function () {
                        _this.configSettingsMap.configWidgetManager.checkIfDisabled = _this._checkIfDisabled.bind(_this);
                    });
                })
            ]);
        };
        ConfigSettings.prototype.processComponent = function (configSettingJSON) {
            var _a = this.configPanelViewModel, expressEnabled = _a.expressEnabled, expressSection = _a.expressSection;
            if (expressEnabled && !expressSection) {
                return;
            }
            if (expressEnabled && !(configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.express)) {
                return;
            }
            switch (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.type) {
                case "boolean":
                    return this.renderBoolean(configSettingJSON);
                case "conditional":
                    return this.renderConditional(configSettingJSON);
                case "string":
                    return this.renderStringInput(configSettingJSON);
                case "number":
                    return this.renderNumberInput(configSettingJSON);
                case "color":
                    return this.renderColorPicker(configSettingJSON);
                case "date":
                    return this.renderDatePicker(configSettingJSON);
                case "time":
                    return this.renderTimePicker(configSettingJSON);
                case "select":
                    var convertedJSON = configSettingJSON;
                    var configSettingSelect = convertedJSON;
                    return this.renderOptions(configSettingSelect);
                case "pickListDropDown":
                    var convertedPickListDropDown = configSettingJSON;
                    var pickListDropDown = convertedPickListDropDown;
                    return this.renderPickListDropDown(pickListDropDown);
                case "slider":
                    return this.renderSlider(configSettingJSON);
                case "widgetPosition":
                    return;
                case "activeItem":
                    var activeItemJSON = configSettingJSON;
                    return this.renderActiveItemConfig(activeItemJSON);
                case "layerSelector":
                    return this.renderLayerSelectorConfig(configSettingJSON);
                case "itemBrowser":
                    return this.renderItemBrowser();
                case "textEditor":
                    return this.renderTextEditor(configSettingJSON);
                case "scaleSlider":
                    return this.renderScaleSlider(configSettingJSON);
                case "numRangeInput":
                    return this.renderNumRangeInput(configSettingJSON);
                case "basemapSelector":
                    return this.renderBasemapSelector(configSettingJSON);
                case "basemapGalleryConfig":
                    return this.renderBasemapGalleryConfig(configSettingJSON);
                case "positionManager":
                    return this.renderPositionManager(configSettingJSON);
                case "searchConfiguration":
                    return this.renderSearchConfig(configSettingJSON);
                case "extentSelectorConfig":
                    return this.renderExtentSelector(configSettingJSON);
                case "legendConfig":
                    return this.renderLegendConfig(configSettingJSON);
                case "itemCreatorConfig":
                    return this.renderItemCreatorConfig(configSettingJSON);
                case "filterConfig":
                    return this.renderFilterConfig(configSettingJSON);
                case "printConfig":
                    return this.renderPrintConfig(configSettingJSON);
                case "groupBrowser":
                    return this.renderGroupBrowser(configSettingJSON);
                case "layerListConfig":
                    return this.renderLayerListConfig(configSettingJSON);
                case "layerEffectConfig":
                    return this.renderLayerEffectConfig(configSettingJSON);
                case "timeFilterConfig":
                    return this.renderTimeFilterConfig(configSettingJSON);
                case "fileUploadConfig":
                    return this.renderFileUploadConfig(configSettingJSON);
                case "pageConfig":
                    return this.renderPageConfig(configSettingJSON);
                case "multiOptions":
                    var muliSelectJSON = configSettingJSON;
                    var configSettingSelects = muliSelectJSON;
                    return this.renderMultiOptions(configSettingSelects);
                case "countdownSectionsConfig":
                    return this.renderCountdownSectionsConfig(configSettingJSON);
                case "branchingConditional":
                    return this.renderBranchingConditionalConfig(configSettingJSON);
                case "chartsConfig":
                    return this.renderChartsConfig(configSettingJSON);
                case "listOptionConfig":
                    return this.renderListOptionConfig(configSettingJSON);
                case "exhibitConfig":
                    return this.renderExhibitConfig(configSettingJSON);
                case "themeConfig":
                    return this.renderThemeConfig(configSettingJSON);
                case "presetLayerEffectsConfig":
                    return this.renderPresetLayerEffectsConfig(configSettingJSON);
            }
        };
        ConfigSettings.prototype.renderBoolean = function (configSettingJSON) {
            var _a;
            var _b, _c;
            if (configSettingJSON.fieldName === "applySharedTheme") {
                var sharedTheme = utils_1.hasSharedTheme((_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.portal);
                if (!sharedTheme) {
                    return;
                }
            }
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var draftChecked = (_c = this.configPanelViewModel.draft) === null || _c === void 0 ? void 0 : _c[fieldName];
            var publishChecked = values === null || values === void 0 ? void 0 : values[fieldName];
            var checked = draftChecked !== undefined
                ? draftChecked
                : publishChecked !== undefined
                    ? publishChecked
                    : defaultValue;
            var disabled = this._checkIfDisabled(fieldName);
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            var calciteSwitch = (widget_1.tsx("calcite-switch", { bind: this, id: fieldName + "Help", oncalciteSwitchChange: this.handleBoolean, "data-field-name": fieldName, "data-search-setting": "search-" + fieldName, checked: checked, disabled: disabled, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }));
            return (widget_1.tsx("calcite-label", { key: fieldName + "-boolean", class: this.classes(CSS.component, componentDarkMode, CSS.boolean, labelSettingMargin_1.marginClassNames.labelContainer), layout: "inline-space-between", "disable-spacing": "true" },
                widget_1.tsx("span", { class: CSS.configSettingLabel }, label),
                widget_1.tsx("div", { class: CSS.tooltipIconSwitchContainer },
                    tooltipIcon,
                    calciteSwitch)));
        };
        ConfigSettings.prototype.renderConditional = function (configSettingJSON) {
            var _a;
            var _this = this;
            var _b;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, options = configSettingJSON.options, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var draftChecked = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishChecked = values === null || values === void 0 ? void 0 : values[fieldName];
            var checked = draftChecked !== undefined
                ? draftChecked
                : publishChecked !== undefined
                    ? publishChecked
                    : defaultValue;
            var disabled = this._checkIfDisabled(fieldName);
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            var calciteSwitch = (widget_1.tsx("calcite-switch", { bind: this, id: fieldName + "Help", oncalciteSwitchChange: this.handleBoolean, "data-field-name": fieldName, "data-search-setting": "search-" + fieldName, checked: checked, disabled: disabled, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }));
            return (widget_1.tsx("div", { key: "esri-config-panel-" + fieldName, class: this.classes(CSS.component, CSS.conditional, labelSettingMargin_1.marginClassNames.labelContainer) },
                widget_1.tsx("calcite-label", { class: this.classes(CSS.component, componentDarkMode, CSS.boolean, labelSettingMargin_1.marginClassNames.labelContainer), layout: "inline-space-between", "disable-spacing": "true" },
                    widget_1.tsx("span", { class: CSS.configSettingLabel }, label),
                    widget_1.tsx("div", { class: CSS.tooltipIconSwitchContainer },
                        tooltipIcon,
                        calciteSwitch)),
                checked
                    ? options.map(function (option) {
                        if (_this.configPanelViewModel.expressEnabled && !option.express) {
                            return;
                        }
                        return _this.processComponent(option);
                    })
                    : null));
        };
        ConfigSettings.prototype.renderStringInput = function (configSettingJSON) {
            var _a;
            var _b;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip, placeholder = configSettingJSON.placeholder, maxlength = configSettingJSON.maxlength;
            var draftString = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishedString = values === null || values === void 0 ? void 0 : values[fieldName];
            var value = draftString || draftString === ""
                ? draftString
                : publishedString || publishedString === ""
                    ? publishedString
                    : defaultValue;
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            return (widget_1.tsx("label", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.component, componentDarkMode, CSS.stringInput, labelSettingMargin_1.marginClassNames.labelContainer), key: "string-input-" + fieldName },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.configSettingLabel, labelSettingMargin_1.marginClassNames.labelText) },
                    label,
                    tooltipIcon),
                widget_1.tsx("input", { bind: this, id: fieldName + "Help", class: labelSettingMargin_1.marginClassNames.removeTop, "data-field-name": fieldName, onchange: this.handleInput, onkeydown: function (e) {
                        focusUtils_1.handleFocusElFromSettingsPanel(e);
                    }, "data-search-setting": "search-" + fieldName, value: this._handleStringInputVal(fieldName, value), type: "text", "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, placeholder: placeholder ? placeholder : null, maxlength: maxlength ? maxlength : this._DEFAULT_MAX_LENGTH }),
                this._renderInvalidUrl(fieldName)));
        };
        ConfigSettings.prototype._renderInvalidUrl = function (fieldName) {
            return this._invalidUrlFieldNames.indexOf(fieldName) !== -1 ? (widget_1.tsx("span", { key: "invalidUrl-" + fieldName, class: CSS.invalidUrl }, this.configPanelViewModel.configPanelMessages.linkProtocol)) : null;
        };
        ConfigSettings.prototype._checkHTTP = function (fieldName, value) {
            switch (fieldName) {
                case "titleLink":
                    return urlUtils_1.isHTTP(value);
                default:
                    return false;
            }
        };
        ConfigSettings.prototype.renderNumberInput = function (configSettingJSON) {
            var _a;
            var _b;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var draftNum = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishedNum = values === null || values === void 0 ? void 0 : values[fieldName];
            var value = draftNum || draftNum === 0
                ? draftNum
                : publishedNum || publishedNum === 0
                    ? publishedNum
                    : defaultValue;
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            var numInputNode = utils_1.isNumber(configSettingJSON.min) && utils_1.isNumber(configSettingJSON.max) ? (widget_1.tsx("input", { bind: this, id: fieldName + "Help", class: labelSettingMargin_1.marginClassNames.removeTop, "data-field-name": fieldName, onchange: this.handleNumberInput, onkeydown: function (e) {
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, value: value, type: "number", min: "" + configSettingJSON.min, max: "" + configSettingJSON.max, "data-search-setting": "search-" + fieldName, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex })) : (widget_1.tsx("input", { bind: this, id: fieldName + "Help", class: labelSettingMargin_1.marginClassNames.removeTop, "data-field-name": fieldName, onchange: this.handleNumberInput, onkeydown: function (e) {
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, value: value, type: "number", "data-search-setting": "search-" + fieldName, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }));
            return (widget_1.tsx("label", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.component, componentDarkMode, labelSettingMargin_1.marginClassNames.labelContainer), key: "number-input-" + fieldName },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.configSettingLabel, labelSettingMargin_1.marginClassNames.labelText) },
                    label,
                    tooltipIcon),
                numInputNode));
        };
        ConfigSettings.prototype.renderOptions = function (configSettingJSON) {
            var _a;
            var _b;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, options = configSettingJSON.options, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var draftValue = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishValue = values === null || values === void 0 ? void 0 : values[fieldName];
            var selected = draftValue
                ? draftValue
                : publishValue
                    ? publishValue
                    : defaultValue;
            var optionNodes = options.map(function (option) {
                var label = option.label, value = option.value;
                return (widget_1.tsx("option", { value: value, selected: value == selected ? true : false }, label));
            });
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            return (widget_1.tsx("label", { bind: this, onclick: this._preventDefault, key: "options-" + fieldName, class: this.classes(CSS.component, componentDarkMode, CSS.dropdown, labelSettingMargin_1.marginClassNames.labelContainer) },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.configSettingLabel, labelSettingMargin_1.marginClassNames.labelText) },
                    label,
                    tooltipIcon),
                widget_1.tsx("select", { bind: this, id: fieldName + "Help", class: labelSettingMargin_1.marginClassNames.removeTop, onchange: this.handleSelect, onkeydown: function (e) {
                        focusUtils_1.handleFocusElFromSettingsPanel(e);
                    }, "data-field-name": fieldName, "data-search-setting": "search-" + fieldName, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }, optionNodes)));
        };
        ConfigSettings.prototype.renderPickListDropDown = function (configSettingJSON) {
            var _a;
            var _this = this;
            var _b;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, options = configSettingJSON.options, lists = configSettingJSON.lists, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var draftValue = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishValue = values === null || values === void 0 ? void 0 : values[fieldName];
            var selected = draftValue
                ? draftValue
                : publishValue
                    ? publishValue
                    : defaultValue;
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            var selectedOptionLabel = options.find(function (option) { return option.value.id === selected.id; }).label ||
                options.find(function (option) { return option.value.id === defaultValue.id; }).label;
            if (configSettingJSON.callback !== undefined &&
                !this.configPanelViewModel.pseudoView.view) {
                configSettingJSON.callback(this.configPanelViewModel, configSettingJSON);
            }
            return (widget_1.tsx("label", { bind: this, onclick: this._preventDefault, key: "pick-list-dropdown-" + fieldName, class: this.classes(CSS.component, componentDarkMode, CSS.pickListDropDown) },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: CSS.configSettingLabel },
                    label,
                    tooltipIcon),
                widget_1.tsx("calcite-dropdown", { bind: this, id: fieldName + "Help", afterCreate: function (node) {
                        shadowRootUtils_1.handleShadowRootStyles(node, ".calcite-dropdown-wrapper{width: 100%;}");
                    } },
                    widget_1.tsx("calcite-button", { appearance: "outline", slot: "dropdown-trigger" }, selectedOptionLabel),
                    lists ? (widget_1.tsx("div", { class: CSS.pickListMultiList }, lists.map(function (list) { return [
                        widget_1.tsx("div", { class: CSS.pickListMultiListLabel, onclick: function (e) {
                                e.preventDefault();
                                e.stopPropagation();
                            } }, list.label),
                        widget_1.tsx("calcite-pick-list", { bind: _this, id: list.type + "-value-list", "data-field-name": fieldName, placement: "auto", onCalciteListChange: _this.handlePickListItem }, list.items.map(function (id) {
                            var option = options.find(function (option) { return option.value.id === id; });
                            var label = option.label, value = option.value, description = option.description;
                            return (widget_1.tsx("calcite-pick-list-item", { bind: _this, key: fieldName + "-" + value.id, label: label, value: value, description: description, selected: selected.id === value.id }));
                        }))
                    ]; }))) : (widget_1.tsx("calcite-pick-list", { bind: this, "data-field-name": fieldName, onCalciteListChange: this.handlePickListItem }, options.map(function (option) {
                        var label = option.label, value = option.value, description = option.description;
                        return (widget_1.tsx("calcite-pick-list-item", { bind: _this, onclick: _this._closePickListDropDown, key: fieldName + "-" + value.id, label: label, value: value, description: description, selected: selected.id === value.id }));
                    }))))));
        };
        ConfigSettings.prototype.renderSlider = function (configSettingJSON) {
            var _a;
            var _this = this;
            var _b, _c;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var draftValue = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishValue = (_c = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values) === null || _c === void 0 ? void 0 : _c[fieldName];
            var sliderValues = draftValue
                ? draftValue
                : publishValue
                    ? publishValue
                    : defaultValue;
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            var customSlider = this.configSettingsMap.configWidgetManager
                .customSliderMap[fieldName];
            if (customSlider == null) {
                customSlider = new Slider(tslib_1.__assign({}, configSettingJSON.sliderSettings));
                if (sliderValues) {
                    customSlider.values = sliderValues;
                }
                this.configSettingsMap.configWidgetManager.customSliderMap[fieldName] = customSlider;
                customSlider.on("thumb-change", function () {
                    return _this.configPanelViewModel.handleDraftData(fieldName, customSlider.values);
                });
                customSlider.on("thumb-drag", function () {
                    return _this.configPanelViewModel.handleDraftData(fieldName, customSlider.values);
                });
            }
            return (widget_1.tsx("label", { bind: this, onclick: this._preventDefault, key: "slider-" + fieldName, id: fieldName + "Help", class: this.classes(CSS.component, componentDarkMode) },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: CSS.configSettingLabel },
                    label,
                    tooltipIcon),
                widget_1.tsx("div", { class: CSS.customSlider }, customSlider === null || customSlider === void 0 ? void 0 : customSlider.render())));
        };
        ConfigSettings.prototype.renderWidgetPosOptions = function (configSettingJSON) {
            var _a;
            var _b;
            var positions = [
                {
                    value: "top-left",
                    label: this.messages.widgetPosition.topLeft
                },
                {
                    value: "top-right",
                    label: this.messages.widgetPosition.topRight
                },
                {
                    value: "bottom-left",
                    label: this.messages.widgetPosition.bottomLeft
                },
                {
                    value: "bottom-right",
                    label: this.messages.widgetPosition.bottomRight
                }
            ];
            var fieldName = configSettingJSON.fieldName, label = configSettingJSON.label, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var draftPosition = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishPosition = values === null || values === void 0 ? void 0 : values[fieldName];
            var selected = draftPosition
                ? draftPosition
                : publishPosition
                    ? publishPosition
                    : defaultValue;
            var optionNodes = positions.map(function (option) {
                var label = option.label, value = option.value;
                return (widget_1.tsx("option", { value: value, selected: value === selected ? true : false }, label));
            });
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            return (widget_1.tsx("label", { bind: this, onclick: this._preventDefault, key: "widget-position-" + fieldName, class: this.classes(CSS.component, componentDarkMode, CSS.dropdown) },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: CSS.configSettingLabel },
                    label,
                    tooltipIcon),
                widget_1.tsx("select", { bind: this, id: fieldName + "Help", onchange: this.handleSelect, "data-field-name": fieldName, "data-search-setting": "search-" + fieldName }, optionNodes)));
        };
        ConfigSettings.prototype.renderColorPicker = function (configSettingJSON) {
            var _a;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var fieldName = configSettingJSON.fieldName, defaultValue = configSettingJSON.defaultValue;
            var draftColor = (_a = this.configPanelViewModel.draft) === null || _a === void 0 ? void 0 : _a[fieldName];
            var publishedColor = values === null || values === void 0 ? void 0 : values[fieldName];
            var value = draftColor
                ? draftColor
                : publishedColor
                    ? publishedColor
                    : defaultValue;
            var colorPicker = this._renderColorPicker(fieldName, value);
            return colorPicker;
        };
        ConfigSettings.prototype._renderColorPicker = function (fieldName, value) {
            var _this = this;
            var _a, _b, _c, _d, _e;
            var swatch = this._renderColorPickerSwatch(fieldName, value);
            if (!this.configPanelViewModel.popoverMap[fieldName]) {
                this.configPanelViewModel.popoverMap[fieldName] = (widget_1.tsx("calcite-popover", { bind: this, afterCreate: function (colorPopoverNode) {
                        colorPopoverNode.addEventListener("calcitePopoverOpen", function () {
                            var _a;
                            (_a = _this.configPanelViewModel.popoverContentMap[fieldName]) === null || _a === void 0 ? void 0 : _a.setAttribute("active", "");
                        });
                        colorPopoverNode.addEventListener("calcitePopoverClose", function () {
                            var _a;
                            (_a = _this.configPanelViewModel.popoverContentMap[fieldName]) === null || _a === void 0 ? void 0 : _a.removeAttribute("active");
                        });
                    }, "reference-element": fieldName + "Swatch", placement: "trailing", "auto-close": "true" },
                    widget_1.tsx("calcite-color-picker", { bind: this, afterCreate: function (colorPickerNode) {
                            colorPickerNode.addEventListener("calciteColorPickerChange", function (calciteColorPickerChangeE) {
                                var _a;
                                var value = calciteColorPickerChangeE.target.value;
                                var swatch = (_a = _this.configPanelViewModel.popoverContentMap) === null || _a === void 0 ? void 0 : _a[fieldName];
                                if (swatch) {
                                    swatch.color = value;
                                }
                                _this.handleColor(fieldName, value);
                            });
                        }, "hide-channels": "true", "hide-saved": "true", value: value, scale: "m" })));
            }
            var presetLabel = (_d = (_c = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.presetConfigSettings) === null || _b === void 0 ? void 0 : _b.configSettings) === null || _c === void 0 ? void 0 : _c[fieldName]) === null || _d === void 0 ? void 0 : _d.label;
            return (widget_1.tsx("calcite-label", { key: fieldName + "-color-picker", id: fieldName + "Help", class: this.classes(CSS.component, CSS.colorPicker, labelSettingMargin_1.marginClassNames.labelContainer), "disable-spacing": "true" },
                widget_1.tsx("span", { class: CSS.colorPickerLabel },
                    presetLabel ? presetLabel : (_e = this.pageMessages) === null || _e === void 0 ? void 0 : _e.selectColor,
                    widget_1.tsx("div", { class: CSS.colorPickerSwatch }, swatch))));
        };
        ConfigSettings.prototype._renderColorPickerSwatch = function (fieldName, value) {
            var _this = this;
            var _a, _b;
            var popoverManagerSwatch = this.configPanelViewModel
                .calcitePopoverManagerMap;
            if (!(popoverManagerSwatch === null || popoverManagerSwatch === void 0 ? void 0 : popoverManagerSwatch[fieldName])) {
                popoverManagerSwatch[fieldName] = (widget_1.tsx("calcite-color-picker-swatch", { bind: this, afterCreate: function (node) {
                        _this.configPanelViewModel.popoverContentMap[fieldName] = node;
                    }, color: value, id: fieldName + "Swatch" }));
            }
            var swatch = (_b = (_a = popoverManagerSwatch === null || popoverManagerSwatch === void 0 ? void 0 : popoverManagerSwatch[fieldName]) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b[0];
            if (swatch === null || swatch === void 0 ? void 0 : swatch.properties.hasOwnProperty("color")) {
                swatch.properties.color = value;
            }
            return popoverManagerSwatch[fieldName];
        };
        ConfigSettings.prototype.renderDatePicker = function (configSettingJSON) {
            var _a;
            var _this = this;
            var _b;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip, min = configSettingJSON.min, max = configSettingJSON.max;
            var draftDate = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishedDate = values === null || values === void 0 ? void 0 : values[fieldName];
            var locale = intl_1.getLocale();
            var value = draftDate
                ? draftDate
                : publishedDate
                    ? publishedDate
                    : defaultValue;
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            return (widget_1.tsx("calcite-label", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.component, componentDarkMode, labelSettingMargin_1.marginClassNames.labelContainer), key: "date-picker-" + fieldName, "disable-spacing": "true" },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.configSettingLabel, labelSettingMargin_1.marginClassNames.labelText) },
                    label,
                    tooltipIcon),
                widget_1.tsx("calcite-date-picker", { id: fieldName + "Help", locale: locale, value: value, min: min, max: max, "intl-next-month": this.messages.date.nextMonth, "intl-prev-month": this.messages.date.previousMonth, "data-field-name": fieldName, "data-search-setting": "search-" + fieldName, afterCreate: function (element) {
                        element.addEventListener("calciteDatePickerChange", _this.handleInput.bind(_this));
                        element.addEventListener("click", function (e) {
                            e.preventDefault();
                        });
                    } })));
        };
        ConfigSettings.prototype.renderTimePicker = function (configSettingJSON) {
            var _a;
            var _this = this;
            var _b;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var draftDate = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishedDate = values === null || values === void 0 ? void 0 : values[fieldName];
            var locale = intl_1.getLocale();
            var value = draftDate
                ? draftDate
                : publishedDate
                    ? publishedDate
                    : defaultValue;
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            return (widget_1.tsx("calcite-label", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.component, componentDarkMode, labelSettingMargin_1.marginClassNames.labelContainer), key: "date-picker-" + fieldName, "disable-spacing": "true" },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: CSS.configSettingLabel },
                    label,
                    tooltipIcon),
                widget_1.tsx("calcite-input-time-picker", { id: fieldName + "Help", value: value, step: "1", "data-field-name": fieldName, "data-search-setting": "search-" + fieldName, afterCreate: function (element) {
                        element.addEventListener("blur", _this.handleInput.bind(_this));
                    } })));
        };
        ConfigSettings.prototype.renderMultiOptions = function (configSettingJSON) {
            var _a;
            var _b;
            var label = configSettingJSON.label, fieldName = configSettingJSON.fieldName, options = configSettingJSON.options, defaultValue = configSettingJSON.defaultValue, tip = configSettingJSON.tip;
            var templateAppData = this.configPanelViewModel.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var draftValue = (_b = this.configPanelViewModel.draft) === null || _b === void 0 ? void 0 : _b[fieldName];
            var publishValue = values === null || values === void 0 ? void 0 : values[fieldName];
            var selected = draftValue
                ? draftValue
                : publishValue
                    ? publishValue
                    : defaultValue;
            var optionNodes = options.map(function (option) {
                var label = option.label, value = option.value;
                return (widget_1.tsx("calcite-dropdown-item", { "data-value": value, active: selected.includes(value) }, label));
            });
            var componentDarkMode = (_a = {},
                _a[CSS.componentDarkMode] = this.configPanelViewModel.darkModeEnabled,
                _a);
            this._createTipItem(fieldName, tip);
            var tooltipIcon = this.configPanelViewModel.tipsMap[fieldName].renderTipCalciteIcon();
            return (widget_1.tsx("calcite-label", { bind: this, onclick: this._preventDefault, key: "options-" + fieldName, class: this.classes(CSS.component, componentDarkMode, CSS.dropdown, labelSettingMargin_1.marginClassNames.labelContainer), "disable-spacing": "true" },
                widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: CSS.configSettingLabel },
                    label,
                    tooltipIcon),
                widget_1.tsx("calcite-dropdown", { "disable-close-on-select": "true", scale: "s", bind: this, onclick: this.handleMultiSelect, onkeydown: this.handleMultiSelectKeydown, "data-field-name": fieldName },
                    widget_1.tsx("calcite-button", { id: fieldName + "Help", slot: "dropdown-trigger", scale: "s", width: "full", appearance: "outline", "icon-end": icons_1.default.chevronDown, color: "inverse" }, this.messages.multiSelect.label.replace("${number}", selected.length.toLocaleString(intl_1.getLocale()))),
                    widget_1.tsx("calcite-dropdown-group", { "selection-mode": "multi", afterCreate: function (dropdownGroup) {
                            setTimeout(function () {
                                var children = dropdownGroup.children;
                                for (var i = 0; i < children.length; i++) {
                                    var child = children[i];
                                    if (child.nodeName === "CALCITE-DROPDOWN-ITEM") {
                                        child.setAttribute("selection-mode", "multi");
                                    }
                                }
                            }, 500);
                        } },
                        " ",
                        optionNodes))));
        };
        ConfigSettings.prototype.handleBoolean = function (e) {
            var node = e.target;
            var fieldName = node.getAttribute("data-field-name");
            this.configPanelViewModel.handleDraftData(fieldName, node.checked);
        };
        ConfigSettings.prototype._handleBooleanClick = function (e, calciteSwitch) {
            e.preventDefault();
            e.stopPropagation();
            var node = null;
            if (calciteSwitch) {
                node = calciteSwitch.domNode;
            }
            else {
                node = e.target;
            }
            this.handleBoolean(node);
        };
        ConfigSettings.prototype.handleInput = function (event) {
            var node = event.currentTarget;
            var fieldName = node.getAttribute("data-field-name");
            var value = node.value;
            var invalidUrlFieldNameIndex = this._invalidUrlFieldNames.indexOf(fieldName);
            if (this._checkHTTP(fieldName, value)) {
                if (invalidUrlFieldNameIndex === -1) {
                    this._invalidUrlFieldNames.push(fieldName);
                }
                return;
            }
            if (invalidUrlFieldNameIndex !== -1) {
                this._invalidUrlFieldNames.splice(invalidUrlFieldNameIndex, 1);
            }
            this.configPanelViewModel.handleDraftData(fieldName, value);
        };
        ConfigSettings.prototype.handleNumberInput = function (event) {
            var node = event.currentTarget;
            var min = node.min, max = node.max, value = node.value;
            var minVal = parseFloat(min);
            var maxVal = parseFloat(max);
            if (!isNaN(minVal) && !isNaN(maxVal)) {
                var parsedVal = parseFloat(value);
                if (parsedVal < minVal || parsedVal > maxVal) {
                    if (parsedVal > maxVal) {
                        node.value = max;
                    }
                    else if (parsedVal < minVal) {
                        node.value = min;
                    }
                }
            }
            var valToWrite = parseFloat(node.value);
            var fieldName = node.getAttribute("data-field-name");
            this.configPanelViewModel.handleDraftData(fieldName, valToWrite);
        };
        ConfigSettings.prototype.handleColor = function (fieldName, value) {
            this.configPanelViewModel.handleDraftData(fieldName, value);
        };
        ConfigSettings.prototype.handleSelect = function (event) {
            var node = event.target;
            var options = node.options, selectedIndex = node.selectedIndex;
            var selected = options[selectedIndex];
            var fieldName = node.getAttribute("data-field-name");
            var value = selected.value;
            this.configPanelViewModel.handleDraftData(fieldName, value);
        };
        ConfigSettings.prototype.handlePickListItem = function (e) {
            var _a;
            if ((_a = e.detail) === null || _a === void 0 ? void 0 : _a.size) {
                var node = e.target;
                var fieldName = node.getAttribute("data-field-name");
                var data = Array.from(e.detail)[e.detail.size - 1][0];
                this.configPanelViewModel.handleDraftData(fieldName, data);
            }
        };
        ConfigSettings.prototype.handleMultiSelect = function (event) {
            event.preventDefault();
            var node = event.target.closest("calcite-dropdown");
            var selected = node.selectedItems.map(function (select) {
                return select.getAttribute("data-value");
            });
            var fieldName = node.getAttribute("data-field-name");
            this.configPanelViewModel.handleDraftData(fieldName, selected);
        };
        ConfigSettings.prototype.handleMultiSelectKeydown = function (event) {
            if (event.key === "Tab" && event.target.localName === "calcite-dropdown-item") {
                event.preventDefault();
            }
            if (event.key === "Enter" && event.target.localName === "calcite-dropdown-item") {
                this.handleMultiSelect(event);
            }
        };
        ConfigSettings.prototype.handleMultiSelectShadow = function (selected, event) {
            event.preventDefault();
            var node = event.target;
            var children = node.closest("calcite-dropdown-group").children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.nodeName === "CALCITE-DROPDOWN-ITEM" &&
                    child.getAttribute("data-value") === node.getAttribute("data-value")) {
                    var index = selected.indexOf(node.getAttribute("data-value"));
                    if (index !== -1) {
                        selected.splice(index, 1);
                        child.removeAttribute("active");
                    }
                    else {
                        selected.push(node.getAttribute("data-value"));
                    }
                }
                else if (child.nodeName === "CALCITE-DROPDOWN-ITEM") {
                    if (selected.includes(child.getAttribute("data-value"))) {
                        child.setAttribute("aria-selected", "true");
                        child.setAttribute("active", "true");
                    }
                    else {
                        child.removeAttribute("active");
                        child.setAttribute("aria-selected", "false");
                    }
                }
            }
            var fieldName = node
                .closest("calcite-dropdown")
                .getAttribute("data-field-name");
            this.configPanelViewModel.handleDraftData(fieldName, selected);
        };
        ConfigSettings.prototype.renderItemBrowser = function () {
            var map = this.configPanelViewModel.sections.find(function (section) { return section.type === "map"; });
            return map.renderItemBrowserPreview();
        };
        ConfigSettings.prototype.renderActiveItemConfig = function (activeItemJSON) {
            var _a;
            this.configSettingsMap.configWidgetManager.activeItemMap[activeItemJSON.fieldName].activeItemJSON = activeItemJSON;
            return (widget_1.tsx("div", { key: activeItemJSON.fieldName, "data-search-setting": "search-" + activeItemJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.activeItemMap[activeItemJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderTextEditor = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: "RTE-container-" + configSettingJSON.fieldName, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.textEditorMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderTimeFilterConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: "time-filter-config-container-" + configSettingJSON.fieldName, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.timeFilterConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderFileUploadConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: "file-upload-config-container-" + configSettingJSON.fieldName, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.fileUploadConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderPageConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: "page-config-container-" + configSettingJSON.fieldName, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.pageConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderChartsConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: "charts-config-container-" + configSettingJSON.fieldName, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.chartsConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderScaleSlider = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-scale-slider", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.scaleSliderMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderNumRangeInput = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-num-range-input", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.numRangeInputMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderLayerSelectorConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-layer-selector", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.layerSelectorMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderLegendConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-legend-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.legendConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderPrintConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-print-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.printConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderItemCreatorConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-item-creator-config", class: CSS.component, "data-search-setting": "item-creator-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.itemCreatorConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderBasemapSelector = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-basemap-selector", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.basemapSelectorMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderBasemapGalleryConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-basemap-gallery-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.basemapGalleryConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderPositionManager = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-position-manager", id: "positionManagerHelp", class: CSS.component }, (_a = this.configSettingsMap.configWidgetManager.positionManager) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderSearchConfig = function (configSettingJSON) {
            var interactivity = this.configPanelViewModel.sections.find(function (section) { return section.type === "interactivity"; });
            return (widget_1.tsx("div", { "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, interactivity === null || interactivity === void 0 ? void 0 : interactivity.renderSearchConfig()));
        };
        ConfigSettings.prototype.renderExtentSelector = function (configSettingJSON) {
            var _a;
            var _b, _c, _d, _e;
            var hide = (_a = {},
                _a[CSS.hide] = ((_d = (_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.map) === null || _c === void 0 ? void 0 : _c.portalItem) === null || _d === void 0 ? void 0 : _d.type) === "Web Scene",
                _a);
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-extent-selector", class: this.classes(CSS.component, hide), "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_e = this.configSettingsMap.configWidgetManager.extentSelectorMap[configSettingJSON.fieldName]) === null || _e === void 0 ? void 0 : _e.render()));
        };
        ConfigSettings.prototype.renderFilterConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-filter-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.filterConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderGroupBrowser = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-group-browser-selector", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.groupBrowserMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderLayerListConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-layer-list-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.layerListConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderLayerEffectConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-layer-effect-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.layerEffectConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderCountdownSectionsConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-layer-effect-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.countdownSectionsConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderBranchingConditionalConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-branching-conditional-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.branchingConditionalConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderListOptionConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-list-option-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.listOptionConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderExhibitConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-exhibit-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.exhibitConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderThemeConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-theme-config", id: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "Help", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.themeConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype.renderPresetLayerEffectsConfig = function (configSettingJSON) {
            var _a;
            return (widget_1.tsx("div", { key: (configSettingJSON === null || configSettingJSON === void 0 ? void 0 : configSettingJSON.fieldName) + "-theme-config", class: CSS.component, "data-search-setting": "search-" + configSettingJSON.fieldName, tabindex: "-1" }, (_a = this.configSettingsMap.configWidgetManager.presetLayerEffectsConfigMap[configSettingJSON.fieldName]) === null || _a === void 0 ? void 0 : _a.render()));
        };
        ConfigSettings.prototype._createTipItem = function (fieldName, tip) {
            if (!this.configPanelViewModel.tipsMap[fieldName]) {
                var id = "tooltip-icon-" + fieldName;
                this.configPanelViewModel.tipsMap[fieldName] = new TipItem({
                    configPanelViewModel: this.configPanelViewModel,
                    id: id,
                    fieldName: fieldName,
                    tip: tip
                });
            }
        };
        ConfigSettings.prototype._checkIfDisabled = function (fieldName) {
            var _a, _b, _c, _d, _e, _f, _g;
            var map = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.map;
            switch (fieldName) {
                case "editPanel":
                case "attributeEditing": {
                    return !((_b = map === null || map === void 0 ? void 0 : map.allLayers) === null || _b === void 0 ? void 0 : _b.some(function (layer) {
                        var _a;
                        if (layer.type === "feature" &&
                            layer.editingEnabled && ((_a = layer.capabilities) === null || _a === void 0 ? void 0 : _a.editing)) {
                            return layer;
                        }
                    }));
                }
                case "bookmarks": {
                    if ((map === null || map === void 0 ? void 0 : map.declaredClass) === "esri.WebMap") {
                        var webmap = map;
                        return (webmap === null || webmap === void 0 ? void 0 : webmap.bookmarks.length) ? false : true;
                    }
                }
                case "slides": {
                    if ((map === null || map === void 0 ? void 0 : map.declaredClass) === "esri.WebScene") {
                        var webscene = map;
                        return ((_d = (_c = webscene === null || webscene === void 0 ? void 0 : webscene.presentation) === null || _c === void 0 ? void 0 : _c.slides) === null || _d === void 0 ? void 0 : _d.length) ? false : true;
                    }
                }
                case "scalebar": {
                    return (map === null || map === void 0 ? void 0 : map.declaredClass) === "esri.WebScene" ? true : false;
                }
                case "operationalLayers": {
                    return !((_e = map === null || map === void 0 ? void 0 : map.layers) === null || _e === void 0 ? void 0 : _e.some(function (layer) {
                        if (layer.type !== "imagery" && layer.type !== "imagery-tile") {
                            return layer;
                        }
                    }));
                }
                case "legend": {
                    var itemCreatorConfigMap = this.get("configSettingsMap.configWidgetManager.itemCreatorConfigMap");
                    var itemCollectionInstance = itemCreatorConfigMap === null || itemCreatorConfigMap === void 0 ? void 0 : itemCreatorConfigMap["itemCollection"];
                    if (itemCollectionInstance) {
                        return false;
                    }
                    else {
                        var hasGroup = this.configPanelViewModel.configParams.config.some(function (section) { return section.id === "group"; });
                        if (!map && hasGroup) {
                            return false;
                        }
                        return !((_f = map === null || map === void 0 ? void 0 : map.layers) === null || _f === void 0 ? void 0 : _f.some(function (layer) {
                            if (layer.legendEnabled) {
                                return layer;
                            }
                        }));
                    }
                }
                case "extentSelector": {
                    if ((map === null || map === void 0 ? void 0 : map.declaredClass) === "esri.WebScene") {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                case "utilityNetwork":
                    var utilityNetworks = (_g = map) === null || _g === void 0 ? void 0 : _g.utilityNetworks;
                    if (!utilityNetworks) {
                        return true;
                    }
                    var hasUtilityNetworks = utilityNetworks.some(function (result) {
                        var _a;
                        return ((_a = result === null || result === void 0 ? void 0 : result.sharedNamedTraceConfigurations) === null || _a === void 0 ? void 0 : _a.length) > 0
                            ? false
                            : true;
                    });
                    return hasUtilityNetworks;
                default:
                    return false;
            }
        };
        ConfigSettings.prototype._preventDefault = function (e) {
            e.preventDefault();
        };
        ConfigSettings.prototype._handleStringInputVal = function (fieldName, value) {
            switch (fieldName) {
                case "title":
                    return value || this.get("configPanelViewModel.templateAppItem.title");
                case "mapA11yDesc":
                    var portalItem = this.get("configPanelViewModel.map.portalItem");
                    var description = portalItem === null || portalItem === void 0 ? void 0 : portalItem.description;
                    var snippet = portalItem === null || portalItem === void 0 ? void 0 : portalItem.snippet;
                    return value || snippet || description || "";
                default:
                    return value;
            }
        };
        ConfigSettings.prototype._closePickListDropDown = function (event) {
            var _a;
            var target = event === null || event === void 0 ? void 0 : event.target;
            var calciteDropDown = (_a = target === null || target === void 0 ? void 0 : target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
            if (calciteDropDown) {
                calciteDropDown.removeAttribute("active");
            }
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("configSettingsMap.configSettingsJSONMap")
        ], ConfigSettings.prototype, "configSettingsJSONMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigSettings.prototype, "configSettingsMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigSettings.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/ConfigSettings/resources")
        ], ConfigSettings.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/PageConfig/resources")
        ], ConfigSettings.prototype, "pageMessages", void 0);
        ConfigSettings = tslib_1.__decorate([
            decorators_1.subclass("ConfigSettings")
        ], ConfigSettings);
        return ConfigSettings;
    }(Widget));
    return ConfigSettings;
});
