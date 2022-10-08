define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "./ConfigWidgetManager", "../../utils/utils", "esri/core/Collection", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Accessor, Handles, ConfigWidgetManager, utils_1, Collection, watchUtils_1) {
    "use strict";
    var ConfigSettingsMap = (function (_super) {
        tslib_1.__extends(ConfigSettingsMap, _super);
        function ConfigSettingsMap(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._expressSettingsMap = {};
            _this._sectionId = null;
            _this._subsectionId = null;
            _this._allSettings = new Collection();
            _this.configPanelViewModel = null;
            return _this;
        }
        ConfigSettingsMap.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        ConfigSettingsMap.prototype.initialize = function () {
            this._handles.add(this._rebuildExpressMapWatcher());
        };
        ConfigSettingsMap.prototype.getSubsection = function (subsectionId) {
            var subsection = this.configPanelViewModel.presetConfigSettings
                .subsections[subsectionId];
            if (!subsection) {
                console.error("Invalid subsection - please check Configuration Parameters JSON: " + subsectionId);
            }
            return subsection;
        };
        ConfigSettingsMap.prototype.buildSettingsPanel = function () {
            if (this._expressSettingsMap) {
                this._expressSettingsMap = {};
            }
            var configPanelViewModel = this.configPanelViewModel;
            this.configWidgetManager = new ConfigWidgetManager({
                configPanelViewModel: configPanelViewModel
            });
            this._handleConfigSettings();
            this.set("configPanelViewModel.expressSettingsMap", this._expressSettingsMap);
            var mapA11yDesc = this._getMapA11yDesc();
            this._handleWidgetPositionUILocations();
            this.configPanelViewModel.allSettings.removeAll();
            this.configPanelViewModel.allSettings.addMany(tslib_1.__spreadArrays(this._allSettings.toArray(), [
                mapA11yDesc
            ]));
            this._cleanUpConfigSettings();
        };
        ConfigSettingsMap.prototype._handleWidgetPositionUILocations = function () {
            var _this = this;
            this._allSettings.forEach(function (setting) {
                if (setting.type === "widgetPosition") {
                    var positionManager = _this._allSettings.find(function (settingToFind) { return settingToFind.type === "positionManager"; });
                    var uiLocation = positionManager.uiLocation;
                    var updatedUILocation = utils_1.setUILocation(positionManager, uiLocation[0], uiLocation === null || uiLocation === void 0 ? void 0 : uiLocation[1]);
                    setting.uiLocation = updatedUILocation;
                }
            });
        };
        ConfigSettingsMap.prototype._cleanUpConfigSettings = function () {
            var _this = this;
            var configSettings = this.configPanelViewModel.presetConfigSettings.configSettings;
            var settingKeys = Object.keys(configSettings);
            settingKeys.forEach(function (key) {
                var setting = _this.configPanelViewModel.allSettings.find(function (setting) { return (setting === null || setting === void 0 ? void 0 : setting.fieldName) === key; });
                if (!setting) {
                    delete configSettings[key];
                }
            });
        };
        ConfigSettingsMap.prototype._getMapA11yDesc = function () {
            var configSettings = this.get("configPanelViewModel.presetConfigSettings.configSettings");
            var fieldName = "mapA11yDesc";
            var mapA11yDesc = configSettings === null || configSettings === void 0 ? void 0 : configSettings[fieldName];
            return tslib_1.__assign(tslib_1.__assign({}, mapA11yDesc), { fieldName: fieldName, uiLocation: ["map"] });
        };
        ConfigSettingsMap.prototype._handleConfigSettings = function () {
            var _this = this;
            var config = this.configPanelViewModel.configParams.config;
            config.forEach(function (section) {
                var content = section.content;
                _this._expressSettingsMap[section.id] = {};
                if (!content) {
                    return;
                }
                _this._sectionId = section.id;
                _this._subsectionId = null;
                _this._handleConfigContent(section, section.id);
            });
        };
        ConfigSettingsMap.prototype._handleConfigContent = function (configObj, sectionId) {
            var _this = this;
            var content = configObj.content;
            content.forEach(function (contentItem) {
                var type = contentItem.type, id = contentItem.id;
                if (type === "setting") {
                    var setting = contentItem;
                    var presetConfigSettings = _this.configPanelViewModel.presetConfigSettings;
                    var configSettings = presetConfigSettings.configSettings;
                    var configSetting = configSettings[id];
                    if (!configSetting) {
                        console.error("Unable to find '" + id + "' in preset config settings.");
                        return;
                    }
                    _this._setFieldName(id);
                    _this._handleDefaultValue(setting);
                    _this._setUILocation(setting);
                    _this._handleExpress(setting);
                    _this._handleNestedSettings(setting);
                    _this._handleConfigWidget(setting);
                    _this._handleProxyServices(setting);
                    _this._addToAllSettingsCollection(setting);
                }
                if (type.indexOf("subsection") !== -1) {
                    _this._subsectionId = id;
                    var section = _this.configPanelViewModel.sections.find(function (section) { return section.type === sectionId; });
                    section.set("hasSubsections", true);
                }
                if (contentItem.hasOwnProperty("content")) {
                    _this._handleConfigContent(contentItem, sectionId);
                }
            });
        };
        ConfigSettingsMap.prototype._setUILocation = function (setting) {
            var presetSetting = this.configPanelViewModel.presetConfigSettings
                .configSettings[setting.id];
            utils_1.setUILocation(presetSetting, this._sectionId, this._subsectionId);
        };
        ConfigSettingsMap.prototype._handleExpress = function (contentItem) {
            var configSettings = this.configPanelViewModel.presetConfigSettings.configSettings;
            var presetSetting = configSettings[contentItem.id];
            if (contentItem === null || contentItem === void 0 ? void 0 : contentItem.express) {
                presetSetting.express = true;
                if (!presetSetting.isDependent) {
                    this._expressSettingsMap[this._sectionId][contentItem.id] = presetSetting;
                }
            }
            else {
                presetSetting.express = false;
            }
            var conditionalExpress = this._handleConditionalExpress(contentItem.id);
            if (conditionalExpress !== undefined) {
                presetSetting.express = conditionalExpress;
                if (presetSetting.express && !presetSetting.isDependent) {
                    this._expressSettingsMap[this._sectionId][contentItem.id] = presetSetting;
                }
            }
        };
        ConfigSettingsMap.prototype._setFieldName = function (id) {
            var presetConfigSettings = this.configPanelViewModel.presetConfigSettings;
            var configSettings = presetConfigSettings.configSettings;
            var configSetting = configSettings[id];
            configSetting.fieldName = id;
        };
        ConfigSettingsMap.prototype._handleDefaultValue = function (setting) {
            var _a = this.configPanelViewModel, presetConfigSettings = _a.presetConfigSettings, templateAppData = _a.templateAppData;
            var id = setting.id;
            var configSettings = presetConfigSettings.configSettings;
            var configSetting = configSettings[id];
            var defaultOverride = setting.hasOwnProperty("defaultValue")
                ? setting.defaultValue
                : null;
            var defaultValue = utils_1.getDefault(configSetting, defaultOverride, templateAppData);
            configSetting.defaultValue = defaultValue;
            this.configPanelViewModel.defaultValues[id] = defaultValue;
        };
        ConfigSettingsMap.prototype._handleNestedSettings = function (contentItem) {
            var configSettings = this.configPanelViewModel.presetConfigSettings.configSettings;
            var id = contentItem.id, content = contentItem.content;
            var settingType = configSettings[id].type;
            var hasContent = (content === null || content === void 0 ? void 0 : content.length) > 0;
            if ((settingType === "conditional" ||
                settingType === "branchingConditional" ||
                settingType === "activeItem") &&
                hasContent) {
                var setting_1 = configSettings[id];
                setting_1.options = [];
                contentItem.content.forEach(function (nestedContentItem) {
                    var _a;
                    var nestedSetting = configSettings[nestedContentItem.id];
                    if (!nestedSetting) {
                        return;
                    }
                    nestedSetting.fieldName = nestedContentItem.id;
                    nestedSetting.conditionalLabel = (_a = configSettings === null || configSettings === void 0 ? void 0 : configSettings[contentItem.id]) === null || _a === void 0 ? void 0 : _a.label;
                    nestedSetting.conditionalField = id;
                    nestedSetting.isDependent = true;
                    setting_1.options.push(nestedSetting);
                });
            }
        };
        ConfigSettingsMap.prototype._handleConfigWidget = function (contentItem) {
            var setting = this.configPanelViewModel.presetConfigSettings
                .configSettings[contentItem.id];
            this.configWidgetManager.createConfigWidget(setting, contentItem);
        };
        ConfigSettingsMap.prototype._handleProxyServices = function (setting) {
            var _a;
            var hasProxyConfig = (_a = setting === null || setting === void 0 ? void 0 : setting.config) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("proxy");
            if (hasProxyConfig) {
                var proxy = (setting === null || setting === void 0 ? void 0 : setting.config).proxy;
                if (proxy.length > 0) {
                    var proxyService = {
                        fieldName: setting.id,
                        services: tslib_1.__spreadArrays(proxy)
                    };
                    this.configPanelViewModel.proxyServices.push(proxyService);
                }
            }
        };
        ConfigSettingsMap.prototype._addToAllSettingsCollection = function (configParamsSetting) {
            var existsInAllSettings = this._allSettings.find(function (allSettingItem) { return (allSettingItem === null || allSettingItem === void 0 ? void 0 : allSettingItem.fieldName) === (configParamsSetting === null || configParamsSetting === void 0 ? void 0 : configParamsSetting.id); });
            if (!existsInAllSettings) {
                var presetSetting = this.configPanelViewModel.presetConfigSettings
                    .configSettings[configParamsSetting.id];
                this._allSettings.add(presetSetting);
            }
        };
        ConfigSettingsMap.prototype._handleConditionalExpress = function (fieldName) {
            var _a, _b, _c, _d, _e, _f, _g;
            var configPanelViewModel = this.configPanelViewModel;
            var map = configPanelViewModel === null || configPanelViewModel === void 0 ? void 0 : configPanelViewModel.map;
            var webmap = map;
            switch (fieldName) {
                case "bookmarks":
                    return ((_a = webmap === null || webmap === void 0 ? void 0 : webmap.bookmarks) === null || _a === void 0 ? void 0 : _a.length) > 0 ? true : false;
                case "slides":
                    var webscene = map;
                    return ((_c = (_b = webscene === null || webscene === void 0 ? void 0 : webscene.presentation) === null || _b === void 0 ? void 0 : _b.slides) === null || _c === void 0 ? void 0 : _c.length) > 0 ? true : false;
                case "layerList":
                    if (!(map === null || map === void 0 ? void 0 : map.layers) || ((_d = map === null || map === void 0 ? void 0 : map.layers) === null || _d === void 0 ? void 0 : _d.length) === 0) {
                        return false;
                    }
                    var viewableLayers = map.layers.filter(function (layer) { return layer.listMode != null && layer.listMode !== "hide"; });
                    return viewableLayers.length > 0 ? true : false;
                case "time":
                case "timeFilter":
                case "timeFilterConfig":
                    var widgets = webmap === null || webmap === void 0 ? void 0 : webmap.widgets;
                    var widgetsWithTimeSlider = widgets;
                    var timeLayers = (_e = map === null || map === void 0 ? void 0 : map.layers) === null || _e === void 0 ? void 0 : _e.filter(function (layer) { return layer.type === "feature" && layer.get("timeInfo"); });
                    return (timeLayers === null || timeLayers === void 0 ? void 0 : timeLayers.length) > 0 || (widgetsWithTimeSlider === null || widgetsWithTimeSlider === void 0 ? void 0 : widgetsWithTimeSlider.timeSlider)
                        ? true
                        : false;
                case "attributeEditing":
                    var isEditable = !!((_f = map === null || map === void 0 ? void 0 : map.allLayers) === null || _f === void 0 ? void 0 : _f.some(function (layer) {
                        var _a;
                        if (layer.type === "feature" &&
                            layer.editingEnabled && ((_a = layer.capabilities) === null || _a === void 0 ? void 0 : _a.editing)) {
                            return layer;
                        }
                    }));
                    return isEditable;
                case "applySharedTheme":
                    var portal = configPanelViewModel === null || configPanelViewModel === void 0 ? void 0 : configPanelViewModel.portal;
                    return ((_g = portal === null || portal === void 0 ? void 0 : portal.portalProperties) === null || _g === void 0 ? void 0 : _g.sharedTheme) ? true : false;
                case "utilityNetwork":
                    var utilityNetworks = webmap === null || webmap === void 0 ? void 0 : webmap.utilityNetworks;
                    if (!utilityNetworks) {
                        return false;
                    }
                    var hasUtilityNetworks = utilityNetworks.some(function (result) {
                        var _a;
                        return ((_a = result === null || result === void 0 ? void 0 : result.sharedNamedTraceConfigurations) === null || _a === void 0 ? void 0 : _a.length) > 0
                            ? true
                            : false;
                    });
                    this._handleUtilityNetworkSearchSetting(hasUtilityNetworks);
                    return hasUtilityNetworks;
            }
        };
        ConfigSettingsMap.prototype._rebuildExpressMapWatcher = function () {
            var _this = this;
            return watchUtils_1.when(this, "configPanelViewModel.presetConfigSettings.configSettings", function () {
                watchUtils_1.watch(_this, "configPanelViewModel.map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var _a, _b;
                    return tslib_1.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4, ((_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.loadAll())];
                            case 1:
                                _c.sent();
                                watchUtils_1.whenOnce(this, "configPanelViewModel.map.loaded", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var utilityNetworks;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!(this.configPanelViewModel.map.declaredClass === "esri.WebMap")) return [3, 2];
                                                utilityNetworks = this.configPanelViewModel
                                                    .map.utilityNetworks;
                                                if (!utilityNetworks) return [3, 2];
                                                return [4, Promise.all(utilityNetworks.map(function (network) {
                                                        return network === null || network === void 0 ? void 0 : network.load();
                                                    }))];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                this._rebuildExpressMap();
                                                return [2];
                                        }
                                    });
                                }); });
                                return [2];
                        }
                    });
                }); });
            });
        };
        ConfigSettingsMap.prototype._rebuildExpressMap = function () {
            if (this._expressSettingsMap) {
                this._expressSettingsMap = {};
            }
            this._handleExpressMapSettings();
            this.configPanelViewModel.set("expressSettingsMap", this._expressSettingsMap);
        };
        ConfigSettingsMap.prototype._handleExpressMapSettings = function () {
            var _this = this;
            var config = this.configPanelViewModel.configParams.config;
            config.forEach(function (section) {
                var content = section.content;
                _this._expressSettingsMap[section.id] = {};
                if (!content) {
                    return;
                }
                _this._sectionId = section.id;
                _this._subsectionId = null;
                _this._handleExpressConfigContent(section, section.id);
            });
        };
        ConfigSettingsMap.prototype._handleExpressConfigContent = function (configObj, sectionId) {
            var _this = this;
            var content = configObj.content;
            content.forEach(function (contentItem) {
                var type = contentItem.type, id = contentItem.id;
                if (type === "setting") {
                    var presetConfigSettings = _this.configPanelViewModel.presetConfigSettings;
                    var configSettings = presetConfigSettings.configSettings;
                    if (!configSettings[id]) {
                        return;
                    }
                    var setting = contentItem;
                    _this._handleExpress(setting);
                    _this._handleNestedSettings(setting);
                }
                if (type.indexOf("subsection") !== -1) {
                    _this._subsectionId = id;
                }
                if (contentItem.hasOwnProperty("content")) {
                    _this._handleExpressConfigContent(contentItem, sectionId);
                }
            });
        };
        ConfigSettingsMap.prototype._handleUtilityNetworkSearchSetting = function (hasUtilityNetworks) {
            var _this = this;
            return watchUtils_1.whenOnce(this, "configPanelViewModel.allSettings", function () {
                var _a = _this.configPanelViewModel, allSettings = _a.allSettings, searchSettings = _a.searchSettings;
                var utilityNetworkSetting = allSettings === null || allSettings === void 0 ? void 0 : allSettings.find(function (setting) { return setting.fieldName === "utilityNetwork"; });
                if (utilityNetworkSetting && searchSettings) {
                    utilityNetworkSetting.express = hasUtilityNetworks;
                    var searchSettingsVM = searchSettings.viewModel;
                    var expressLookupArr = searchSettingsVM.generateExpressLookup();
                    var expressLookup = searchSettingsVM.expressLookup;
                    expressLookup.removeAll();
                    expressLookup.addMany(tslib_1.__spreadArrays(expressLookupArr));
                }
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigSettingsMap.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigSettingsMap.prototype, "configWidgetManager", void 0);
        ConfigSettingsMap = tslib_1.__decorate([
            decorators_1.subclass("ConfigSettingsMap")
        ], ConfigSettingsMap);
        return ConfigSettingsMap;
    }(Accessor));
    return ConfigSettingsMap;
});
