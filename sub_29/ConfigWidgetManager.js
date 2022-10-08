define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "../../configWidgets/BaseComponent", "esri/core/watchUtils", "esri/geometry", "esri/core/Handles", "esri/geometry/support/jsonUtils", "../../configWidgets/ActiveItemConfig/ActiveItemConfig", "../../configWidgets/BasemapGalleryConfig/BasemapGalleryConfig", "../../configWidgets/BasemapSelectorConfig/BasemapSelectorConfig", "../../configWidgets/ExtentSelectorConfig/ExtentSelectorPanel", "../../configWidgets/FilterConfig/FilterConfig", "../../configWidgets/LayerSelectorConfig/LayerConfig", "../../configWidgets/NumberRangeInputConfig/NumberRangeInputConfig", "../../configWidgets/PositionManagerConfig/PositionManagerConfig", "../../configWidgets/ScaleSliderConfig/ScaleSliderConfig", "../../configWidgets/LegendConfig/LegendConfig", "../../configWidgets/PrintConfig/PrintConfig", "../../configWidgets/TextEditorConfig/TextEditorConfig", "../../configWidgets/ItemCreatorConfig/ItemCreatorConfig", "../../configWidgets/GroupBrowserConfig/GroupBrowserConfig", "../../configWidgets/LayerListConfig/LayerListConfig", "../../configWidgets/LayerEffectConfig/LayerEffectConfig", "../../configWidgets/TimeFilterConfig/TimeFilterConfig", "../../configWidgets/FileUploadConfig/FileUploadConfig", "../../configWidgets/PageConfig/PageConfig", "../../configWidgets/ChartsConfig/ChartsConfig", "../../configWidgets/CountdownSectionsConfig/CountdownSectionsConfig", "../../configWidgets/BranchingConditionalConfig/BranchingConditionalConfig", "../../configWidgets/ListOptionConfig/ListOptionConfig", "../../configWidgets/ExhibitConfig/ExhibitConfig", "../../configWidgets/ThemeConfig/ThemeConfig", "../../configWidgets/PresetLayerEffectsConfig/PresetLayerEffectsConfig", "../Tips/TipItem", "../../utils/utils", "TemplatesCommonLib/functionality/token", "TemplatesCommonLib/baseClasses/CompatibilityChecker"], function (require, exports, tslib_1, decorators_1, BaseComponent, watchUtils_1, geometry_1, Handles, jsonUtils, ActiveItemConfig, BasemapGalleryConfig, BasemapSelectorConfig, ExtentSelectorPanel, FilterConfig, LayerSelectorConfig, NumberRangeInputConfig, PositionManagerConfig, ScaleSliderConfig, LegendConfig, PrintConfig, TextEditorConfig, ItemCreatorConfig, GroupBrowserConfig, LayerListConfig, LayerEffectConfig, TimeFilterConfig, FileUploadConfig, PageConfig, ChartsConfig, CountdownSectionsConfig, BranchingConditionalConfig, ListOptionConfig, ExhibitConfig, ThemeConfig, PresetLayerEffectsConfig, TipItem, utils_1, token_1, CompatibilityChecker_1) {
    "use strict";
    var ConfigWidgetManager = (function (_super) {
        tslib_1.__extends(ConfigWidgetManager, _super);
        function ConfigWidgetManager(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.activeItemMap = {};
            _this.textEditorMap = {};
            _this.layerSelectorMap = {};
            _this.basemapGalleryConfigMap = {};
            _this.basemapSelectorMap = {};
            _this.numRangeInputMap = {};
            _this.scaleSliderMap = {};
            _this.extentSelectorMap = {};
            _this.legendConfigMap = {};
            _this.itemCreatorConfigMap = {};
            _this.chartsConfigMap = {};
            _this.filterConfigMap = {};
            _this.printConfigMap = {};
            _this.groupBrowserMap = {};
            _this.layerListConfigMap = {};
            _this.layerEffectConfigMap = {};
            _this.timeFilterConfigMap = {};
            _this.fileUploadConfigMap = {};
            _this.pageConfigMap = {};
            _this.countdownSectionsConfigMap = {};
            _this.branchingConditionalConfigMap = {};
            _this.listOptionConfigMap = {};
            _this.customSliderMap = {};
            _this.exhibitConfigMap = {};
            _this.themeConfigMap = {};
            _this.presetLayerEffectsConfigMap = {};
            _this.searchConfigJSON = null;
            _this._posManagerDebounceTracker = 0;
            _this._posManagerDebounceMS = 100;
            _this._posManagerBatchUpdate = {};
            return _this;
        }
        ConfigWidgetManager.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles = null;
        };
        ConfigWidgetManager.prototype.createConfigWidget = function (configSettingJSONFromMap, configSettingFromParams) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
            if (!configSettingJSONFromMap) {
                return;
            }
            var fieldName = configSettingJSONFromMap.fieldName, type = configSettingJSONFromMap.type;
            var configPanelViewModel = this.configPanelViewModel;
            var configSetting = configSettingFromParams.hasOwnProperty(fieldName)
                ? configSettingFromParams[fieldName]
                : configSettingFromParams;
            switch (type) {
                case "activeItem":
                    if (!this.activeItemMap[fieldName]) {
                        this.activeItemMap[fieldName] = new ActiveItemConfig({
                            activeItemJSON: configSettingJSONFromMap,
                            configSettings: configPanelViewModel.configSettings,
                            configPanelViewModel: configPanelViewModel
                        });
                    }
                    return;
                case "layerSelector":
                    if (!this.layerSelectorMap[fieldName]) {
                        this._initLayerSelector(fieldName, configSetting, configSettingJSONFromMap);
                    }
                    return;
                case "scaleSlider":
                    if (!this.scaleSliderMap[fieldName]) {
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var initialScale = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, this.configPanelViewModel.templateAppData.values);
                        this.scaleSliderMap[fieldName] = new ScaleSliderConfig({
                            sliderLabel: configSettingJSONFromMap.label,
                            initialScale: initialScale,
                            tipItem: tipItem
                        });
                        this._handles.add(watchUtils_1.watch(this.scaleSliderMap[fieldName], "outputZoomScale", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.scaleSliderMap[fieldName].outputZoomScale);
                        }), fieldName);
                    }
                    return;
                case "numRangeInput":
                    if (!this.numRangeInputMap[fieldName]) {
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, this.configPanelViewModel.templateAppData.values);
                        var savedStateVal = savedState ? savedState : null;
                        this.configPanelViewModel.defaultValues[fieldName] = savedStateVal;
                        var numRangeInput_1 = new NumberRangeInputConfig(tslib_1.__assign(tslib_1.__assign({}, configSetting.config), { savedState: savedStateVal, tipItem: tipItem, label: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.label, defaultLabel: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.defaultLabel, defaultLabelToolTip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.defaultLabelToolTip, minLabel: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.minLabel, minLabelToolTip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.minLabelToolTip, maxLabel: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.maxLabel, maxLabelToolTip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.maxLabelToolTip, fieldName: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.fieldName, configPanelViewModel: this.configPanelViewModel }));
                        this.numRangeInputMap[fieldName] = numRangeInput_1;
                        if (configSetting.config.layerAndFieldSelectorToWatch) {
                            var setupLayerSelectorWatcher_1 = function () {
                                var numericFields = [
                                    "long",
                                    "double",
                                    "single",
                                    "integer",
                                    "small-integer"
                                ];
                                var layerSelectorToWatch = _this
                                    .layerSelectorMap[configSetting.config.layerAndFieldSelectorToWatch];
                                if (layerSelectorToWatch.layerSelectionMode === "single" &&
                                    layerSelectorToWatch.supportsFieldSelection &&
                                    layerSelectorToWatch.isFieldSelectionRequired &&
                                    layerSelectorToWatch.supportedFieldTypes
                                        .map(function (fieldType) {
                                        return numericFields.includes(fieldType);
                                    })
                                        .reduce(function (acc, curr) { return acc && curr; }, true)) {
                                    _this._handles.add(layerSelectorToWatch.watch("outputJSON", function (newSelection) {
                                        var _a, _b;
                                        numRangeInput_1.newValFromLayerSelector = {
                                            layerId: (_a = newSelection === null || newSelection === void 0 ? void 0 : newSelection.layers[0]) === null || _a === void 0 ? void 0 : _a.id,
                                            fieldName: (_b = newSelection === null || newSelection === void 0 ? void 0 : newSelection.layers[0]) === null || _b === void 0 ? void 0 : _b.fields[0]
                                        };
                                    }));
                                }
                            };
                            var tryUntilDefined_1 = function () {
                                var layerSelectorToWatch = _this
                                    .layerSelectorMap[configSetting.config.layerAndFieldSelectorToWatch];
                                if (layerSelectorToWatch != null) {
                                    setupLayerSelectorWatcher_1();
                                }
                                else {
                                    setTimeout(function () {
                                        tryUntilDefined_1();
                                    }, 1000);
                                }
                            };
                            tryUntilDefined_1();
                        }
                        this._handles.add(watchUtils_1.watch(numRangeInput_1, "outputJSON", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, numRangeInput_1.outputJSON);
                        }), fieldName);
                    }
                    return;
                case "textEditor":
                    if (!this.textEditorMap[fieldName]) {
                        var values = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                        var editorData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var configSettingsMessages = this.configPanelViewModel.presetConfigSettings.configSettingsMessages;
                        var textEditorConfig = tslib_1.__assign({ tipItem: tipItem,
                            editorData: editorData, header: configSettingJSONFromMap.header, configPanelViewModel: this.configPanelViewModel, fieldName: fieldName,
                            configSettingsMessages: configSettingsMessages }, configSettingFromParams === null || configSettingFromParams === void 0 ? void 0 : configSettingFromParams.config);
                        var editLinkConfig = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.editLink) ? tslib_1.__assign(tslib_1.__assign({}, textEditorConfig), { editLink: configSettingJSONFromMap.editLink }) : textEditorConfig;
                        this.textEditorMap[fieldName] = new TextEditorConfig(editLinkConfig);
                        this._handles.add(watchUtils_1.watch(this.textEditorMap[fieldName], "editorData", function () {
                            var data = _this.textEditorMap[fieldName].editorData;
                            var dataToWrite = token_1.removeImgTokens(data);
                            _this.configPanelViewModel.handleDraftData(fieldName, dataToWrite);
                        }), fieldName);
                    }
                    return;
                case "itemCreatorConfig":
                    if (!this.itemCreatorConfigMap[fieldName]) {
                        var values = (_d = (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.templateAppData) === null || _d === void 0 ? void 0 : _d.values;
                        var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var itemNameTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.itemNameTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-name",
                            fieldName: fieldName + "-name",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.itemNameTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var itemDescriptionTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.itemDescTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-desc",
                            fieldName: fieldName + "-desc",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.itemDescTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var itemThumbnailTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.itemThumbnailTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-thumbnail",
                            fieldName: fieldName + "-thumbnail",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.itemThumbnailTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var liveItemDetailsTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.liveItemDetailsTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-live-item-details",
                            fieldName: fieldName + "-live-item-details",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.liveItemDetailsTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var openLinksInAppTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.openLinksInAppTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-open-links-in-app",
                            fieldName: fieldName + "-open-links-in-app",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.openLinksInAppTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var itemCreatorConfig = {
                            tipItem: tipItem,
                            itemNameTipItem: itemNameTipItem,
                            itemDescriptionTipItem: itemDescriptionTipItem,
                            itemThumbnailTipItem: itemThumbnailTipItem,
                            liveItemDetailsTipItem: liveItemDetailsTipItem,
                            openLinksInAppTipItem: openLinksInAppTipItem,
                            savedState: savedState,
                            configPanelViewModel: this.configPanelViewModel,
                            fieldName: fieldName,
                            label: configSettingJSONFromMap.label
                        };
                        this.itemCreatorConfigMap[fieldName] = new ItemCreatorConfig(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, configSetting.config), itemCreatorConfig), { configPanelViewModel: this.configPanelViewModel }));
                        this._handles.add(watchUtils_1.watch(this.itemCreatorConfigMap[fieldName], "output", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.itemCreatorConfigMap[fieldName].output);
                        }), fieldName);
                        var portfolioAppLayoutBC_1 = (_e = this.branchingConditionalConfigMap) === null || _e === void 0 ? void 0 : _e["portfolioAppLayout"];
                        this._handles.add(watchUtils_1.whenOnce(portfolioAppLayoutBC_1, "branchLabels", function () {
                            _this._handles.add(watchUtils_1.init(portfolioAppLayoutBC_1, "selectedIndex", function () {
                                var branchLabels = portfolioAppLayoutBC_1.branchLabels, selectedIndex = portfolioAppLayoutBC_1.selectedIndex;
                                var portfolioAppLayoutValue = branchLabels[selectedIndex].value;
                                var itemCreator = _this.itemCreatorConfigMap[fieldName];
                                itemCreator.set("viewModel.portfolioAppLayout", portfolioAppLayoutValue);
                            }));
                        }));
                    }
                    return;
                case "chartsConfig":
                    if (!this.chartsConfigMap[fieldName]) {
                        var values = (_g = (_f = this.configPanelViewModel) === null || _f === void 0 ? void 0 : _f.templateAppData) === null || _g === void 0 ? void 0 : _g.values;
                        var savedData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var chartItemConfig = {
                            tipItem: tipItem,
                            savedData: savedData,
                            configPanelViewModel: this.configPanelViewModel,
                            fieldName: fieldName,
                            label: configSettingJSONFromMap.label
                        };
                        this.chartsConfigMap[fieldName] = new ChartsConfig(tslib_1.__assign(tslib_1.__assign({}, chartItemConfig), { configPanelViewModel: this.configPanelViewModel }));
                        this._handles.add([
                            watchUtils_1.watch(this.chartsConfigMap[fieldName], "outputJSON", function () {
                                _this.configPanelViewModel.handleDraftData(fieldName, _this.chartsConfigMap[fieldName].outputJSON);
                            }),
                            watchUtils_1.watch(this.configPanelViewModel, "selectedMapId", function () {
                                _this.configPanelViewModel.handleDraftData(fieldName, null);
                            })
                        ], fieldName);
                    }
                    return;
                case "listOptionConfig":
                    if (!this.listOptionConfigMap[fieldName]) {
                        var values = (_j = (_h = this.configPanelViewModel) === null || _h === void 0 ? void 0 : _h.templateAppData) === null || _j === void 0 ? void 0 : _j.values;
                        var savedData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var listOptionConfig = tslib_1.__assign(tslib_1.__assign({ mapProperties: configSettingJSONFromMap.mapProperties, listMode: configSettingJSONFromMap.listMode, selectionMode: configSettingJSONFromMap.selectionMode, listItems: configSettingJSONFromMap.listItems, optionsCallbackArgs: configSettingJSONFromMap.optionsCallbackArgs, optionsCallback: configSettingJSONFromMap.optionsCallback }, configSettingFromParams.config), { tipItem: tipItem,
                            savedData: savedData, configPanelViewModel: this.configPanelViewModel, fieldName: fieldName, label: configSettingJSONFromMap.label });
                        this.listOptionConfigMap[fieldName] = new ListOptionConfig(listOptionConfig);
                        this._handles.add(watchUtils_1.watch(this.listOptionConfigMap[fieldName], "outputJSON", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.listOptionConfigMap[fieldName].outputJSON);
                        }), fieldName);
                    }
                    return;
                case "basemapSelector":
                    if (!this.basemapSelectorMap[fieldName]) {
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, this.configPanelViewModel.templateAppData.values);
                        var savedStateVal = {
                            chosenBasemapId: savedState
                        };
                        this.basemapSelectorMap[fieldName] = new BasemapSelectorConfig(tslib_1.__assign(tslib_1.__assign({}, configSetting.config), { savedState: savedStateVal, tipItem: tipItem, titleHeader: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.label, configPanelViewModel: this.configPanelViewModel }));
                        this._handles.add(watchUtils_1.watch(this.basemapSelectorMap[fieldName], "outputBasemapId", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.basemapSelectorMap[fieldName].outputBasemapId);
                        }), fieldName);
                    }
                    return;
                case "basemapGalleryConfig":
                    if (!this.basemapGalleryConfigMap[fieldName]) {
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, this.configPanelViewModel.templateAppData.values);
                        this.basemapGalleryConfigMap[fieldName] = new BasemapGalleryConfig(tslib_1.__assign(tslib_1.__assign({}, configSetting.config), { savedState: savedState, tipItem: tipItem, titleHeader: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.label, configPanelViewModel: this.configPanelViewModel }));
                        this._handles.add(watchUtils_1.watch(this.basemapGalleryConfigMap[fieldName], "output", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.basemapGalleryConfigMap[fieldName].output);
                        }), fieldName);
                    }
                    return;
                case "positionManager":
                    var tip = configSettingJSONFromMap.tip, label = configSettingJSONFromMap.label, occupiedPositionLabel = configSettingJSONFromMap.occupiedPositionLabel;
                    if (!this.positionManager) {
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var disabledDependentFieldValue = void 0;
                        var disabledDependentField_1 = (_k = configSetting === null || configSetting === void 0 ? void 0 : configSetting.config) === null || _k === void 0 ? void 0 : _k.disabledDependentField;
                        if (disabledDependentField_1 != null) {
                            var CONFIG_SETTING_JSON_DDF = this.configPanelViewModel.getPresetConfigSetting(disabledDependentField_1);
                            var CONFIG_SETTING_FROM_PARAMS_DDF = this.configPanelViewModel.getConfigParamsWithRequiredField(disabledDependentField_1, "disabledDependentField");
                            disabledDependentFieldValue = utils_1.getDefaultValue(CONFIG_SETTING_JSON_DDF == null
                                ? { fieldName: null }
                                : CONFIG_SETTING_JSON_DDF, CONFIG_SETTING_FROM_PARAMS_DDF, this.configPanelViewModel.templateAppData.values);
                        }
                        this.positionManager = new PositionManagerConfig(tslib_1.__assign(tslib_1.__assign({}, configSetting.config), { tipItem: tipItem,
                            label: label,
                            configPanelViewModel: configPanelViewModel, disabledPosition: disabledDependentFieldValue != null
                                ? disabledDependentFieldValue
                                : (_l = configSetting === null || configSetting === void 0 ? void 0 : configSetting.config) === null || _l === void 0 ? void 0 : _l.disabledPosition, disabledPositionLabel: occupiedPositionLabel }));
                        if (disabledDependentField_1 != null) {
                            var previousValue_1 = disabledDependentFieldValue;
                            this._handles.add(this.configPanelViewModel.watch("draft", function () {
                                if (!_this.configPanelViewModel.draft) {
                                    return;
                                }
                                var newValue = _this.configPanelViewModel.draft[disabledDependentField_1];
                                if (newValue != null && newValue !== previousValue_1) {
                                    previousValue_1 = newValue;
                                    _this.positionManager.viewModel.updateDisabledPositions(newValue);
                                }
                            }));
                        }
                    }
                    return;
                case "widgetPosition":
                    watchUtils_1.whenDefinedOnce(this, "positionManager", function () {
                        var _a, _b;
                        var calcIsEnabled = function (enabledState, isDisabled) {
                            return enabledState && !isDisabled;
                        };
                        if (!_this.positionManager.viewModel.isWidgetAlreadyAdded(configSettingJSONFromMap.fieldName)) {
                            var positionSavedState_1 = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, _this.configPanelViewModel.templateAppData.values);
                            if (typeof positionSavedState_1 === "string") {
                                positionSavedState_1 = {
                                    position: positionSavedState_1,
                                    index: 0
                                };
                            }
                            var positionedField_1 = configSettingJSONFromMap.positionedField;
                            var CONFIG_SETTING_JSON_PF_1 = _this.configPanelViewModel.getPresetConfigSetting(positionedField_1);
                            var CONFIG_SETTING_FROM_PARAMS_PF = _this.configPanelViewModel.getConfigParamsWithRequiredField(positionedField_1, "defaultValue");
                            var enabledState_1 = utils_1.getDefaultValue(CONFIG_SETTING_JSON_PF_1 == null
                                ? { fieldName: null }
                                : CONFIG_SETTING_JSON_PF_1, CONFIG_SETTING_FROM_PARAMS_PF, _this.configPanelViewModel.templateAppData.values);
                            enabledState_1 =
                                positionedField_1 === "dummyPositionedField" ? true : enabledState_1;
                            var doesTemplateHaveNoMap = function (templateUrl) {
                                return templateUrl.includes(CompatibilityChecker_1.EAppTemplateType.Portfolio)
                                    || templateUrl.includes(CompatibilityChecker_1.EAppTemplateType.CategoryGallery);
                            };
                            var propToWatch = doesTemplateHaveNoMap((_b = (_a = _this === null || _this === void 0 ? void 0 : _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppItem) === null || _b === void 0 ? void 0 : _b.url) ? "viewMode" : "map";
                            watchUtils_1.whenOnce(_this.configPanelViewModel, propToWatch, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var isDisabled, initialUIPosition, previousPositionInfo;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(this.configPanelViewModel.map != null)) return [3, 2];
                                            return [4, this.loadAllMapResources()];
                                        case 1:
                                            _a.sent();
                                            isDisabled = this.checkIfDisabled(positionedField_1);
                                            _a.label = 2;
                                        case 2:
                                            enabledState_1 = calcIsEnabled(enabledState_1, isDisabled);
                                            initialUIPosition = {
                                                position: positionSavedState_1.position,
                                                index: positionSavedState_1.index,
                                                fieldName: fieldName,
                                                enabledState: enabledState_1,
                                                label: configSettingJSONFromMap.label
                                            };
                                            previousPositionInfo = tslib_1.__assign({}, initialUIPosition);
                                            if (!this.positionManager.viewModel.isWidgetAlreadyAdded(fieldName)) {
                                                this.positionManager.addWidgetToPositionManager(initialUIPosition);
                                            }
                                            else {
                                                return [2];
                                            }
                                            this._handles.add([
                                                watchUtils_1.watch(this.configPanelViewModel, "map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                    var currentEnabledState;
                                                    var _a, _b, _c, _d, _e, _f, _g, _h;
                                                    return tslib_1.__generator(this, function (_j) {
                                                        switch (_j.label) {
                                                            case 0:
                                                                if (this.configPanelViewModel.map == null) {
                                                                    return [2];
                                                                }
                                                                return [4, this.loadAllMapResources()];
                                                            case 1:
                                                                _j.sent();
                                                                isDisabled = this.checkIfDisabled(positionedField_1);
                                                                currentEnabledState = (_h = (_g = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.draft) === null || _b === void 0 ? void 0 : _b[positionedField_1]) !== null && _c !== void 0 ? _c : (_f = (_e = (_d = this === null || this === void 0 ? void 0 : this.configPanelViewModel) === null || _d === void 0 ? void 0 : _d.templateAppData) === null || _e === void 0 ? void 0 : _e.values) === null || _f === void 0 ? void 0 : _f[positionedField_1]) !== null && _g !== void 0 ? _g : CONFIG_SETTING_JSON_PF_1 === null || CONFIG_SETTING_JSON_PF_1 === void 0 ? void 0 : CONFIG_SETTING_JSON_PF_1.defaultValue) !== null && _h !== void 0 ? _h : false;
                                                                this.positionManager.updateEnabledState(fieldName, calcIsEnabled(currentEnabledState, isDisabled));
                                                                return [2];
                                                        }
                                                    });
                                                }); }),
                                                watchUtils_1.watch(this.positionManager, "outputJSON", function () {
                                                    var positionInfo = _this.positionManager.outputJSON.find(function (uiPosition) { return uiPosition.fieldName === fieldName; });
                                                    if (positionInfo &&
                                                        (positionInfo.position !== previousPositionInfo.position ||
                                                            positionInfo.index !== previousPositionInfo.index)) {
                                                        previousPositionInfo = tslib_1.__assign({}, positionInfo);
                                                        _this._posManagerDebounceTracker += 1;
                                                        var localTrackerNum_1 = _this._posManagerDebounceTracker;
                                                        _this._posManagerBatchUpdate[fieldName] = {
                                                            position: positionInfo.position,
                                                            index: positionInfo.index
                                                        };
                                                        setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                                            return tslib_1.__generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        if (!(this._posManagerDebounceTracker === localTrackerNum_1)) return [3, 2];
                                                                        return [4, this.configPanelViewModel.handleDraftDataBatch(this._posManagerBatchUpdate)];
                                                                    case 1:
                                                                        _a.sent();
                                                                        _a.label = 2;
                                                                    case 2: return [2];
                                                                }
                                                            });
                                                        }); }, _this._posManagerDebounceMS);
                                                    }
                                                }),
                                                this.configPanelViewModel.watch("draft", function () {
                                                    if (!_this.configPanelViewModel.draft) {
                                                        return;
                                                    }
                                                    if (_this.configPanelViewModel.draft[positionedField_1] != null) {
                                                        _this.positionManager.updateEnabledState(fieldName, calcIsEnabled(_this.configPanelViewModel.draft[positionedField_1], isDisabled));
                                                    }
                                                })
                                            ]);
                                            return [2];
                                    }
                                });
                            }); });
                        }
                    });
                    return;
                case "extentSelectorConfig":
                    if (!this.extentSelectorMap[fieldName]) {
                        var values = (_o = (_m = this.configPanelViewModel) === null || _m === void 0 ? void 0 : _m.templateAppData) === null || _o === void 0 ? void 0 : _o.values;
                        var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        if (savedState != null && ((_p = Object.keys(savedState)) === null || _p === void 0 ? void 0 : _p.length) === 0) {
                            savedState = null;
                            this.configPanelViewModel.handleDraftData(fieldName, savedState);
                        }
                        if ((savedState === null || savedState === void 0 ? void 0 : savedState["geometry"]) || (savedState === null || savedState === void 0 ? void 0 : savedState["minScale"]) || (savedState === null || savedState === void 0 ? void 0 : savedState["maxScale"]) || (savedState === null || savedState === void 0 ? void 0 : savedState["rotationEnabled"])) {
                            var constraints = savedState;
                            savedState = {
                                constraints: constraints,
                                mapRotation: 0
                            };
                            if (((_q = savedState === null || savedState === void 0 ? void 0 : savedState.constraints) === null || _q === void 0 ? void 0 : _q.geometry) != null) {
                                savedState.constraints.geometry = geometry_1.Polygon.fromExtent(geometry_1.Extent.fromJSON(savedState.constraints.geometry));
                            }
                            this.configPanelViewModel.handleDraftData(fieldName, savedState);
                        }
                        if (((_r = savedState === null || savedState === void 0 ? void 0 : savedState.constraints) === null || _r === void 0 ? void 0 : _r.geometry) &&
                            savedState.constraints.geometry.type == null) {
                            savedState.constraints.geometry = jsonUtils.fromJSON(savedState.constraints.geometry);
                            if (savedState.constraints.geometry.type === "extent") {
                                savedState.constraints.geometry = geometry_1.Polygon.fromExtent(savedState.constraints.geometry);
                            }
                        }
                        if (((_u = (_t = (_s = savedState === null || savedState === void 0 ? void 0 : savedState.constraints) === null || _s === void 0 ? void 0 : _s.geometry) === null || _t === void 0 ? void 0 : _t.rings) === null || _u === void 0 ? void 0 : _u.length) === 0) {
                            savedState.constraints.geometry = null;
                            this.configPanelViewModel.handleDraftData(fieldName, savedState);
                        }
                        this.extentSelectorMap[fieldName] = new ExtentSelectorPanel(tslib_1.__assign(tslib_1.__assign({}, configSetting.config), { savedState: savedState,
                            tipItem: tipItem, titleHeader: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.label, configPanelViewModel: this.configPanelViewModel }));
                        this._handles.add(watchUtils_1.watch(this.extentSelectorMap[fieldName], "output", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.extentSelectorMap[fieldName].output);
                        }), fieldName);
                    }
                    return;
                case "legendConfig":
                    if (!this.legendConfigMap[fieldName]) {
                        var values = (_w = (_v = this.configPanelViewModel) === null || _v === void 0 ? void 0 : _v.templateAppData) === null || _w === void 0 ? void 0 : _w.values;
                        var legendConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var legendConfig = {
                            tipItem: tipItem,
                            configPanelViewModel: this.configPanelViewModel,
                            fieldName: fieldName,
                            style: legendConfigData["style"]
                        };
                        this.legendConfigMap[fieldName] = new LegendConfig(legendConfig);
                        this._handles.add(watchUtils_1.watch(this.legendConfigMap[fieldName], "outputJSON", function () {
                            var legendConfig = _this.legendConfigMap[fieldName];
                            var legendConfigPropsToWrite = {
                                style: legendConfig.style
                            };
                            _this.configPanelViewModel.handleDraftData(fieldName, legendConfigPropsToWrite);
                        }), fieldName);
                    }
                    return;
                case "printConfig":
                    if (!this.printConfigMap[fieldName]) {
                        var values = (_y = (_x = this.configPanelViewModel) === null || _x === void 0 ? void 0 : _x.templateAppData) === null || _y === void 0 ? void 0 : _y.values;
                        var printConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var printServiceUrl_1 = (_z = this.configPanelViewModel) === null || _z === void 0 ? void 0 : _z.portal.helperServices.printTask.url;
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var printConfig = tslib_1.__assign({ tipItem: tipItem, configPanelViewModel: this.configPanelViewModel, fieldName: fieldName }, printConfigData);
                        this.printConfigMap[fieldName] = new PrintConfig(printConfig);
                        this._handles.add(watchUtils_1.watch(this.printConfigMap[fieldName], "outputJSON", function () {
                            var output = tslib_1.__assign(tslib_1.__assign({}, _this.printConfigMap[fieldName].outputJSON), { printServiceUrl: printServiceUrl_1 });
                            _this.configPanelViewModel.handleDraftData(fieldName, output);
                        }), fieldName);
                    }
                    return;
                case "filterConfig":
                    if (!this.filterConfigMap[fieldName]) {
                        this._handles.add([
                            watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                                var _a, _b;
                                var values = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                                var filterConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                                var id = "tooltip-icon-" + fieldName;
                                var tipItem = new TipItem({
                                    id: id,
                                    fieldName: fieldName,
                                    tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                                    configPanelViewModel: configPanelViewModel
                                });
                                var filterConfig = {
                                    tipItem: tipItem,
                                    configPanelViewModel: _this.configPanelViewModel,
                                    fieldName: fieldName,
                                    input: filterConfigData === null || filterConfigData === void 0 ? void 0 : filterConfigData.layerExpressions,
                                    map: _this.configPanelViewModel.map
                                };
                                _this.filterConfigMap[fieldName] = new FilterConfig(filterConfig);
                                var filter = _this.filterConfigMap[fieldName];
                                _this._handles.add(watchUtils_1.watch(_this.filterConfigMap[fieldName], "outputJSON", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, _this.filterConfigMap[fieldName].outputJSON);
                                }), fieldName);
                                _this._handles.add(watchUtils_1.watch(_this.configPanelViewModel, "selectedMapId", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, null);
                                    _this._handles.add(watchUtils_1.whenFalse(_this.configPanelViewModel, "isLoadingMap", function () {
                                        filter.set("input", null);
                                        filter.set("layerExpressions", {});
                                        filter.set("configPanelViewModel", _this.configPanelViewModel);
                                        filter.set("map", _this.configPanelViewModel.map);
                                    }));
                                }), fieldName);
                            })
                        ]);
                    }
                    return;
                case "timeFilterConfig":
                    if (!this.timeFilterConfigMap[fieldName]) {
                        this._handles.add([
                            watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                                var _a, _b;
                                var values = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                                var timeFilterConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                                var id = "tooltip-icon-" + fieldName;
                                var tipItem = new TipItem({
                                    id: id,
                                    fieldName: fieldName,
                                    tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                                    configPanelViewModel: configPanelViewModel
                                });
                                var timeFilterConfig = {
                                    tipItem: tipItem,
                                    configPanelViewModel: _this.configPanelViewModel,
                                    fieldName: fieldName,
                                    savedData: timeFilterConfigData
                                };
                                _this.timeFilterConfigMap[fieldName] = new TimeFilterConfig(timeFilterConfig);
                                _this._handles.add(watchUtils_1.watch(_this.timeFilterConfigMap[fieldName], "outputJSON", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, _this.timeFilterConfigMap[fieldName].outputJSON);
                                }), fieldName);
                            })
                        ]);
                    }
                    return;
                case "groupBrowser":
                    if (!this.groupBrowserMap[fieldName]) {
                        this._handles.add([
                            watchUtils_1.whenEqualOnce(this, "configPanelViewModel.state", "ready", function () {
                                var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, _this.configPanelViewModel.templateAppData.values);
                                _this.groupBrowserMap[fieldName] = new GroupBrowserConfig(tslib_1.__assign(tslib_1.__assign({}, configSetting.config), { savedState: savedState, titleHeader: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.label, configPanelViewModel: _this.configPanelViewModel }));
                                _this._handles.add(watchUtils_1.watch(_this.groupBrowserMap[fieldName], "output", function () {
                                    var output = _this.groupBrowserMap[fieldName].output;
                                    _this.configPanelViewModel.handleDraftData(fieldName, output);
                                    if (output) {
                                        _this.set("configPanelViewModel.selectedGroupId", output);
                                    }
                                }), fieldName);
                            })
                        ]);
                    }
                    return;
                case "layerListConfig":
                    if (!this.layerListConfigMap[fieldName]) {
                        this._handles.add([
                            watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                                var _a, _b, _c, _d;
                                var values = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                                var layerListConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                                var id = "tooltip-icon-" + fieldName;
                                var tipItem = new TipItem({
                                    id: id,
                                    fieldName: fieldName,
                                    tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                                    configPanelViewModel: configPanelViewModel
                                });
                                var layerListConfig = {
                                    tipItem: tipItem,
                                    configPanelViewModel: _this.configPanelViewModel,
                                    fieldName: fieldName,
                                    map: _this.configPanelViewModel.map,
                                    input: layerListConfigData,
                                    sections: ((_c = configSetting === null || configSetting === void 0 ? void 0 : configSetting.config) === null || _c === void 0 ? void 0 : _c.sections) || "*",
                                    supportedLayerTypes: ((_d = configSetting === null || configSetting === void 0 ? void 0 : configSetting.config) === null || _d === void 0 ? void 0 : _d.supportedLayerTypes) || "*"
                                };
                                _this.layerListConfigMap[fieldName] = new LayerListConfig(layerListConfig);
                                var layerList = _this.layerListConfigMap[fieldName];
                                _this._handles.add(watchUtils_1.watch(layerList, "outputJSON", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, layerList.outputJSON);
                                }), fieldName);
                                _this._handles.add(watchUtils_1.watch(_this.configPanelViewModel, "selectedMapId", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, null);
                                    _this._handles.add(watchUtils_1.whenFalse(_this.configPanelViewModel, "isLoadingMap", function () {
                                        var _a;
                                        layerList.set("map", _this.configPanelViewModel.map);
                                        (_a = layerList.textEditor) === null || _a === void 0 ? void 0 : _a.set("configPanelViewModel", _this.configPanelViewModel);
                                        layerList.viewModel.initLayerListConfig();
                                    }));
                                }), fieldName);
                            })
                        ]);
                    }
                    return;
                case "layerEffectConfig":
                    if (!this.layerEffectConfigMap[fieldName]) {
                        this._handles.add([
                            watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                                var _a, _b;
                                var values = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                                var layerEffectConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                                var id = "tooltip-icon-" + fieldName;
                                var configRestriction = configSetting === null || configSetting === void 0 ? void 0 : configSetting.configRestriction;
                                var tipItem = new TipItem({
                                    id: id,
                                    fieldName: fieldName,
                                    tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                                    configPanelViewModel: configPanelViewModel
                                });
                                var layerEffectConfig = {
                                    tipItem: tipItem,
                                    configPanelViewModel: _this.configPanelViewModel,
                                    fieldName: fieldName,
                                    input: layerEffectConfigData,
                                    configRestriction: configRestriction
                                };
                                _this.layerEffectConfigMap[fieldName] = new LayerEffectConfig(layerEffectConfig);
                                _this._handles.add(watchUtils_1.watch(_this.layerEffectConfigMap[fieldName], "outputJSON", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, _this.layerEffectConfigMap[fieldName].outputJSON);
                                }), fieldName);
                                _this._handles.add(watchUtils_1.watch(_this.configPanelViewModel, "selectedMapId", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, null);
                                }), fieldName);
                            })
                        ]);
                    }
                    return;
                case "fileUploadConfig":
                    if (!this.fileUploadConfigMap[fieldName]) {
                        var values = (_1 = (_0 = this.configPanelViewModel) === null || _0 === void 0 ? void 0 : _0.templateAppData) === null || _1 === void 0 ? void 0 : _1.values;
                        var savedData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var fileUploadConfig = {
                            configPanelViewModel: this.configPanelViewModel,
                            fieldName: fieldName,
                            savedData: savedData,
                            label: configSettingJSONFromMap.label
                        };
                        this.fileUploadConfigMap[fieldName] = new FileUploadConfig(fileUploadConfig);
                        this._handles.add(watchUtils_1.watch(this.fileUploadConfigMap[fieldName], "outputJSON", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.fileUploadConfigMap[fieldName].outputJSON);
                        }), fieldName);
                    }
                    return;
                case "pageConfig":
                    if (!this.pageConfigMap[fieldName]) {
                        var values = (_3 = (_2 = this.configPanelViewModel) === null || _2 === void 0 ? void 0 : _2.templateAppData) === null || _3 === void 0 ? void 0 : _3.values;
                        var savedData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var titleTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.titleTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-title",
                            fieldName: fieldName + "-title",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.titleTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var subtitleTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.subtitleTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-subtitle",
                            fieldName: fieldName + "-subtitle",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.subtitleTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var backgroundTipItem = (configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.backgroundTip) ? new TipItem({
                            id: "tooltip-icon-" + fieldName + "-background",
                            fieldName: fieldName + "-background",
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.backgroundTip,
                            configPanelViewModel: configPanelViewModel
                        })
                            : null;
                        var pageConfig = tslib_1.__assign({ configPanelViewModel: this.configPanelViewModel, fieldName: fieldName,
                            savedData: savedData, label: configSettingJSONFromMap.label, titleTipItem: titleTipItem,
                            subtitleTipItem: subtitleTipItem,
                            backgroundTipItem: backgroundTipItem }, configSetting.config);
                        this.pageConfigMap[fieldName] = new PageConfig(pageConfig);
                        this._handles.add(watchUtils_1.watch(this.pageConfigMap[fieldName], "outputJSON", function () {
                            _this.configPanelViewModel.handleDraftData(fieldName, _this.pageConfigMap[fieldName].outputJSON);
                        }), fieldName);
                    }
                    return;
                case "searchConfiguration":
                    if (!this.searchConfigJSON) {
                        configSettingJSONFromMap.config = configSetting.config;
                        this.searchConfigJSON = configSettingJSONFromMap;
                    }
                    return;
                case "countdownSectionsConfig":
                    if (!this.countdownSectionsConfigMap[fieldName]) {
                        watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                            var _a, _b;
                            var values = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                            var countdownSectionsConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                            var id = "tooltip-icon-" + fieldName;
                            var tipItem = new TipItem({
                                id: id,
                                fieldName: fieldName,
                                tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                                configPanelViewModel: configPanelViewModel
                            });
                            var countdownSectionsConfig = {
                                tipItem: tipItem,
                                configPanelViewModel: _this.configPanelViewModel,
                                fieldName: fieldName,
                                map: _this.configPanelViewModel.map,
                                sections: countdownSectionsConfigData
                            };
                            _this.countdownSectionsConfigMap[fieldName] = new CountdownSectionsConfig(countdownSectionsConfig);
                            _this._handles.add(watchUtils_1.watch(_this.countdownSectionsConfigMap[fieldName], "outputJSON", function () {
                                _this.configPanelViewModel.handleDraftData(fieldName, _this.countdownSectionsConfigMap[fieldName].outputJSON);
                            }), fieldName);
                        });
                    }
                    return;
                case "branchingConditional":
                    if (!this.branchingConditionalConfigMap[fieldName]) {
                        this._initBranchConditional(fieldName, configSetting, configSettingJSONFromMap);
                    }
                    return;
                case "exhibitConfig":
                    if (!this.exhibitConfigMap[fieldName]) {
                        this._handles.add([
                            watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                                var _a, _b;
                                var values = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                                var exhibitConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                                var id = "tooltip-icon-" + fieldName;
                                var tipItem = new TipItem({
                                    id: id,
                                    fieldName: fieldName,
                                    tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                                    configPanelViewModel: configPanelViewModel
                                });
                                var exhibitConfig = {
                                    input: exhibitConfigData,
                                    tipItem: tipItem,
                                    configPanelViewModel: _this.configPanelViewModel,
                                    fieldName: fieldName
                                };
                                _this.exhibitConfigMap[fieldName] = new ExhibitConfig(exhibitConfig);
                                _this._handles.add(watchUtils_1.watch(_this.configPanelViewModel, "selectedMapId", function () {
                                    _this.configPanelViewModel.handleDraftData(fieldName, null);
                                }), fieldName);
                            })
                        ]);
                    }
                    return;
                case "themeConfig":
                    if (!this.themeConfigMap[fieldName]) {
                        var values = (_5 = (_4 = this.configPanelViewModel) === null || _4 === void 0 ? void 0 : _4.templateAppData) === null || _5 === void 0 ? void 0 : _5.values;
                        var themeConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                        var id = "tooltip-icon-" + fieldName;
                        var tipItem = new TipItem({
                            id: id,
                            fieldName: fieldName,
                            tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                            configPanelViewModel: configPanelViewModel
                        });
                        var themeConfig = {
                            tipItem: tipItem,
                            configPanelViewModel: this.configPanelViewModel,
                            numOfSections: (_7 = (_6 = configSetting === null || configSetting === void 0 ? void 0 : configSetting.config) === null || _6 === void 0 ? void 0 : _6.numOfSections) !== null && _7 !== void 0 ? _7 : 3,
                            fontAlwaysEditable: (_8 = configSetting === null || configSetting === void 0 ? void 0 : configSetting.config) === null || _8 === void 0 ? void 0 : _8.fontAlwaysEditable,
                            headerOnly: (_9 = configSetting === null || configSetting === void 0 ? void 0 : configSetting.config) === null || _9 === void 0 ? void 0 : _9.headerOnly,
                            input: themeConfigData,
                            fieldName: fieldName
                        };
                        this.themeConfigMap[fieldName] = new ThemeConfig(themeConfig);
                        this._handles.add(watchUtils_1.watch(this.themeConfigMap[fieldName], "outputJSON", function (output) {
                            _this.configPanelViewModel.handleDraftData(fieldName, output);
                        }), fieldName);
                    }
                    return;
                case "presetLayerEffectsConfig":
                    if (!this.presetLayerEffectsConfigMap[fieldName]) {
                        this._handles.add([
                            watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                                var _a, _b;
                                var values = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                                var presetLayerEffectsConfigData = utils_1.getDefaultValue(configSettingJSONFromMap, configSetting, values);
                                var id = "tooltip-icon-" + fieldName;
                                var tipItem = new TipItem({
                                    id: id,
                                    fieldName: fieldName,
                                    tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                                    configPanelViewModel: configPanelViewModel
                                });
                                var presetLayerEffectsConfig = {
                                    tipItem: tipItem,
                                    configPanelViewModel: _this.configPanelViewModel,
                                    selectedEffect: presetLayerEffectsConfigData,
                                    fieldName: fieldName
                                };
                                _this.presetLayerEffectsConfigMap[fieldName] = new PresetLayerEffectsConfig(presetLayerEffectsConfig);
                                _this._handles.add(watchUtils_1.watch(_this.presetLayerEffectsConfigMap[fieldName], "outputJSON", function (output) {
                                    _this.configPanelViewModel.handleDraftData(fieldName, output);
                                }), fieldName);
                            })
                        ]);
                    }
                    return;
            }
        };
        ConfigWidgetManager.prototype._initLayerSelector = function (fieldName, configSettingFromParams, configSettingJSONFromMap) {
            var _this = this;
            this._handles.add([
                watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () {
                    var id = "tooltip-icon-" + fieldName;
                    var tipItem = new TipItem({
                        id: id,
                        fieldName: fieldName,
                        tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                        configPanelViewModel: _this.configPanelViewModel
                    });
                    _this.layerSelectorMap[fieldName] = new LayerSelectorConfig(tslib_1.__assign(tslib_1.__assign({}, configSettingFromParams.config), { tipItem: tipItem, headerText: configSettingJSONFromMap.label, loadedMap: _this.configPanelViewModel.map, configPanelViewModel: _this.configPanelViewModel, fieldName: fieldName }));
                    var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSettingFromParams, _this.configPanelViewModel.templateAppData.values);
                    if (savedState) {
                        _this.layerSelectorMap[fieldName].savedState = savedState;
                    }
                    watchUtils_1.watch(_this.layerSelectorMap[fieldName], "outputJSON", function () {
                        _this.configPanelViewModel.handleDraftData(fieldName, _this.layerSelectorMap[fieldName].outputJSON);
                    });
                }),
                watchUtils_1.watch(this, "configPanelViewModel.map", function () {
                    _this.layerSelectorMap[fieldName].loadedMap = _this.configPanelViewModel.map;
                })
            ]);
        };
        ConfigWidgetManager.prototype._initBranchConditional = function (fieldName, configSettingFromParams, configSettingJSONFromMap) {
            var _this = this;
            var id = "tooltip-icon-" + fieldName;
            var tipItem = new TipItem({
                id: id,
                fieldName: fieldName,
                tip: configSettingJSONFromMap === null || configSettingJSONFromMap === void 0 ? void 0 : configSettingJSONFromMap.tip,
                configPanelViewModel: this.configPanelViewModel
            });
            var headerText = configSettingJSONFromMap.headerText, branchLabels = configSettingJSONFromMap.branchLabels, branchTips = configSettingJSONFromMap.branchTips, defaultFunction = configSettingJSONFromMap.defaultFunction, restrictFunction = configSettingJSONFromMap.restrictFunction;
            var branchingConditionalInstance = new BranchingConditionalConfig.default({
                tipItem: tipItem,
                headerText: headerText,
                branches: configSettingFromParams.config.branches,
                branchLabels: branchLabels,
                branchTips: branchTips,
                options: this.configPanelViewModel.presetConfigSettings.configSettings,
                configSettingFromParams: configSettingFromParams,
                defaultFunction: defaultFunction,
                restrictFunction: restrictFunction,
                configPanelViewModel: this.configPanelViewModel
            });
            this.branchingConditionalConfigMap[fieldName] = branchingConditionalInstance;
            var savedState = utils_1.getDefaultValue(configSettingJSONFromMap, configSettingFromParams, this.configPanelViewModel.templateAppData.values);
            if (savedState) {
                branchingConditionalInstance.savedState = savedState;
            }
            var isFirstUpdate = true;
            watchUtils_1.watch(branchingConditionalInstance, "output", function () {
                var _a;
                if (isFirstUpdate) {
                    if ((savedState === null || savedState === void 0 ? void 0 : savedState.branchValue) !== ((_a = branchingConditionalInstance === null || branchingConditionalInstance === void 0 ? void 0 : branchingConditionalInstance.output) === null || _a === void 0 ? void 0 : _a.branchValue)) {
                        _this.configPanelViewModel.handleDraftData(fieldName, branchingConditionalInstance.output);
                    }
                    isFirstUpdate = false;
                }
                else {
                    _this.configPanelViewModel.handleDraftData(fieldName, branchingConditionalInstance.output);
                }
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "activeItemMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "textEditorMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "layerSelectorMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "basemapGalleryConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "basemapSelectorMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "numRangeInputMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "scaleSliderMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "positionManager", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "extentSelectorMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "legendConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "itemCreatorConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "chartsConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "filterConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "printConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "groupBrowserMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "layerListConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "layerEffectConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "timeFilterConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "fileUploadConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "pageConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "countdownSectionsConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "branchingConditionalConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "listOptionConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "customSliderMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "exhibitConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "themeConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "presetLayerEffectsConfigMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "searchConfigJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigWidgetManager.prototype, "checkIfDisabled", void 0);
        ConfigWidgetManager = tslib_1.__decorate([
            decorators_1.subclass("ConfigWidgetManager")
        ], ConfigWidgetManager);
        return ConfigWidgetManager;
    }(BaseComponent));
    return ConfigWidgetManager;
});
