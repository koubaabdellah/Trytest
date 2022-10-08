define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/watchUtils", "esri/core/Handles", "TemplatesCommonLib/baseClasses/CompatibilityChecker", "./PresetConfigSettings/CommonSettings"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, watchUtils_1, Handles, CompatibilityChecker_1, CommonSettings_1) {
    "use strict";
    CommonSettings_1 = tslib_1.__importDefault(CommonSettings_1);
    var PresetConfigSettings = (function (_super) {
        tslib_1.__extends(PresetConfigSettings, _super);
        function PresetConfigSettings(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._commonSettings = new CommonSettings_1.default();
            _this._presetIsSetup = false;
            _this.appTemplateItemUrl = null;
            _this.configSettingsMessages = null;
            _this.textEditorMessages = null;
            _this.pageMessages = null;
            _this.configSettings = null;
            _this.subsections = null;
            return _this;
        }
        PresetConfigSettings.prototype.postInitialize = function () {
            this._initPresetConfigSettings();
        };
        PresetConfigSettings.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        PresetConfigSettings.prototype._initPresetConfigSettings = function () {
            var _this = this;
            this._handles.add(watchUtils_1.when(this, [
                "configSettingsMessages",
                "textEditorMessages",
                "pageMessages",
                "appTemplateItemUrl"
            ], function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, configSettingsMessages, textEditorMessages, pageMessages, appTemplateItemUrl, commonSettings, commonSubsections, appSpecData, settings, subsections;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this, configSettingsMessages = _a.configSettingsMessages, textEditorMessages = _a.textEditorMessages, pageMessages = _a.pageMessages, appTemplateItemUrl = _a.appTemplateItemUrl;
                            if (this._presetIsSetup) {
                                return [2];
                            }
                            if (!(configSettingsMessages &&
                                textEditorMessages &&
                                pageMessages &&
                                appTemplateItemUrl)) return [3, 2];
                            commonSettings = this._getCommonSettings();
                            commonSubsections = this._getCommonSubsections();
                            return [4, this._getAppSpecData()];
                        case 1:
                            appSpecData = _b.sent();
                            settings = appSpecData.settings, subsections = appSpecData.subsections;
                            this.set("configSettings", tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this._getConfigSettings()), commonSettings), settings));
                            this.set("subsections", tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this._getSubsections()), commonSubsections), subsections));
                            this._presetIsSetup = true;
                            _b.label = 2;
                        case 2: return [2];
                    }
                });
            }); }));
        };
        PresetConfigSettings.prototype._getAppSpecData = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var url, _a, configSettingsMessages, textEditorMessages, _b, THREE_D_VIEWER_MODULE, threeDViewer, ATTACHMENT_VIEWER_MODULE, attachmentViewer, BASIC_MODULE, basic, CATEGORY_GALLERY_MODULE, categoryGallery, CHART_VIEWER_MODULE, chartViewer, COUNTDOWN_MODULE, countdown, IMAGERY_VIEWER_MODULE, imageryViewer, INTERACTIVE_LEGEND_MODULE, interactiveLegend, MEDIA_MAP_MODULE, mediaMap, MINIMALIST_MODULE, minimalist, NEARBY_MODULE, nearby, PORTFOLIO_MODULE, portfolio, SIDEBAR_MODULE, sidebar, SLIDER_MODULE, slider, ZONE_LOOKUP_MODULE, zoneLookup, EXHIBIT_MODULE, exhibit;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            url = this.appTemplateItemUrl;
                            if (url.indexOf("/portal") !== -1) {
                                url = url.replace("/portal", "");
                            }
                            _a = this, configSettingsMessages = _a.configSettingsMessages, textEditorMessages = _a.textEditorMessages;
                            _b = url;
                            switch (_b) {
                                case CompatibilityChecker_1.EAppTemplateType.ThreeDViewer: return [3, 1];
                                case CompatibilityChecker_1.EAppTemplateType.AttachmentViewer: return [3, 3];
                                case CompatibilityChecker_1.EAppTemplateType.Basic: return [3, 5];
                                case CompatibilityChecker_1.EAppTemplateType.CategoryGallery: return [3, 7];
                                case CompatibilityChecker_1.EAppTemplateType.Charts: return [3, 9];
                                case CompatibilityChecker_1.EAppTemplateType.Countdown: return [3, 11];
                                case CompatibilityChecker_1.EAppTemplateType.ImageryApp: return [3, 13];
                                case CompatibilityChecker_1.EAppTemplateType.InteractiveLegend: return [3, 15];
                                case CompatibilityChecker_1.EAppTemplateType.Media: return [3, 17];
                                case CompatibilityChecker_1.EAppTemplateType.Minimalist: return [3, 19];
                                case CompatibilityChecker_1.EAppTemplateType.Nearby: return [3, 21];
                                case CompatibilityChecker_1.EAppTemplateType.Portfolio: return [3, 23];
                                case CompatibilityChecker_1.EAppTemplateType.Sidebar: return [3, 25];
                                case CompatibilityChecker_1.EAppTemplateType.Slider: return [3, 27];
                                case CompatibilityChecker_1.EAppTemplateType.ZoneLookup: return [3, 29];
                                case CompatibilityChecker_1.EAppTemplateType.Exhibit: return [3, 31];
                            }
                            return [3, 33];
                        case 1: return [4, Promise.resolve(new Promise(function (resolve_1, reject_1) { require(["./PresetConfigSettings/ThreeDViewerSettings"], resolve_1, reject_1); }).then(tslib_1.__importStar))];
                        case 2:
                            THREE_D_VIEWER_MODULE = _c.sent();
                            threeDViewer = new THREE_D_VIEWER_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: threeDViewer.getSettings(),
                                    subsections: threeDViewer.getSubsections()
                                }];
                        case 3: return [4, Promise.resolve(new Promise(function (resolve_2, reject_2) { require(["./PresetConfigSettings/AttachmentViewerSettings"], resolve_2, reject_2); }).then(tslib_1.__importStar))];
                        case 4:
                            ATTACHMENT_VIEWER_MODULE = _c.sent();
                            attachmentViewer = new ATTACHMENT_VIEWER_MODULE.default({
                                configSettingsMessages: configSettingsMessages,
                                textEditorMessages: textEditorMessages
                            });
                            return [2, {
                                    settings: attachmentViewer.getSettings(),
                                    subsections: attachmentViewer.getSubsections()
                                }];
                        case 5: return [4, Promise.resolve(new Promise(function (resolve_3, reject_3) { require(["./PresetConfigSettings/BasicSettings"], resolve_3, reject_3); }).then(tslib_1.__importStar))];
                        case 6:
                            BASIC_MODULE = _c.sent();
                            basic = new BASIC_MODULE.default({
                                configSettingsMessages: configSettingsMessages,
                                textEditorMessages: textEditorMessages
                            });
                            return [2, {
                                    settings: basic.getSettings(),
                                    subsections: basic.getSubsections()
                                }];
                        case 7: return [4, Promise.resolve(new Promise(function (resolve_4, reject_4) { require(["./PresetConfigSettings/CategoryGallerySettings"], resolve_4, reject_4); }).then(tslib_1.__importStar))];
                        case 8:
                            CATEGORY_GALLERY_MODULE = _c.sent();
                            categoryGallery = new CATEGORY_GALLERY_MODULE.default({
                                configSettingsMessages: configSettingsMessages,
                                textEditorMessages: textEditorMessages
                            });
                            return [2, {
                                    settings: categoryGallery.getSettings(),
                                    subsections: categoryGallery.getSubsections()
                                }];
                        case 9: return [4, Promise.resolve(new Promise(function (resolve_5, reject_5) { require(["./PresetConfigSettings/ChartViewerSettings"], resolve_5, reject_5); }).then(tslib_1.__importStar))];
                        case 10:
                            CHART_VIEWER_MODULE = _c.sent();
                            chartViewer = new CHART_VIEWER_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: chartViewer.getSettings(),
                                    subsections: chartViewer.getSubsections()
                                }];
                        case 11: return [4, Promise.resolve(new Promise(function (resolve_6, reject_6) { require(["./PresetConfigSettings/CountdownSettings"], resolve_6, reject_6); }).then(tslib_1.__importStar))];
                        case 12:
                            COUNTDOWN_MODULE = _c.sent();
                            countdown = new COUNTDOWN_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: countdown.getSettings(),
                                    subsections: countdown.getSubsections()
                                }];
                        case 13: return [4, Promise.resolve(new Promise(function (resolve_7, reject_7) { require(["./PresetConfigSettings/ImageryViewerSettings"], resolve_7, reject_7); }).then(tslib_1.__importStar))];
                        case 14:
                            IMAGERY_VIEWER_MODULE = _c.sent();
                            imageryViewer = new IMAGERY_VIEWER_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: imageryViewer.getSettings(),
                                    subsections: imageryViewer.getSubsections()
                                }];
                        case 15: return [4, Promise.resolve(new Promise(function (resolve_8, reject_8) { require(["./PresetConfigSettings/InteractiveLegendSettings"], resolve_8, reject_8); }).then(tslib_1.__importStar))];
                        case 16:
                            INTERACTIVE_LEGEND_MODULE = _c.sent();
                            interactiveLegend = new INTERACTIVE_LEGEND_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: interactiveLegend.getSettings(),
                                    subsections: interactiveLegend.getSubsections()
                                }];
                        case 17: return [4, Promise.resolve(new Promise(function (resolve_9, reject_9) { require(["./PresetConfigSettings/MediaMapSettings"], resolve_9, reject_9); }).then(tslib_1.__importStar))];
                        case 18:
                            MEDIA_MAP_MODULE = _c.sent();
                            mediaMap = new MEDIA_MAP_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: mediaMap.getSettings(),
                                    subsections: mediaMap.getSubsections()
                                }];
                        case 19: return [4, Promise.resolve(new Promise(function (resolve_10, reject_10) { require(["./PresetConfigSettings/MinimalistSettings"], resolve_10, reject_10); }).then(tslib_1.__importStar))];
                        case 20:
                            MINIMALIST_MODULE = _c.sent();
                            minimalist = new MINIMALIST_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: minimalist.getSettings(),
                                    subsections: minimalist.getSubsections()
                                }];
                        case 21: return [4, Promise.resolve(new Promise(function (resolve_11, reject_11) { require(["./PresetConfigSettings/NearbySettings"], resolve_11, reject_11); }).then(tslib_1.__importStar))];
                        case 22:
                            NEARBY_MODULE = _c.sent();
                            nearby = new NEARBY_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: nearby.getSettings(),
                                    subsections: nearby.getSubsections()
                                }];
                        case 23: return [4, Promise.resolve(new Promise(function (resolve_12, reject_12) { require(["./PresetConfigSettings/PortfolioSettings"], resolve_12, reject_12); }).then(tslib_1.__importStar))];
                        case 24:
                            PORTFOLIO_MODULE = _c.sent();
                            portfolio = new PORTFOLIO_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: portfolio.getSettings(),
                                    subsections: portfolio.getSubsections()
                                }];
                        case 25: return [4, Promise.resolve(new Promise(function (resolve_13, reject_13) { require(["./PresetConfigSettings/SidebarSettings"], resolve_13, reject_13); }).then(tslib_1.__importStar))];
                        case 26:
                            SIDEBAR_MODULE = _c.sent();
                            sidebar = new SIDEBAR_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: sidebar.getSettings(),
                                    subsections: sidebar.getSubsections()
                                }];
                        case 27: return [4, Promise.resolve(new Promise(function (resolve_14, reject_14) { require(["./PresetConfigSettings/SliderSettings"], resolve_14, reject_14); }).then(tslib_1.__importStar))];
                        case 28:
                            SLIDER_MODULE = _c.sent();
                            slider = new SLIDER_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: slider.getSettings(),
                                    subsections: slider.getSubsections()
                                }];
                        case 29: return [4, Promise.resolve(new Promise(function (resolve_15, reject_15) { require(["./PresetConfigSettings/ZoneLookupSettings"], resolve_15, reject_15); }).then(tslib_1.__importStar))];
                        case 30:
                            ZONE_LOOKUP_MODULE = _c.sent();
                            zoneLookup = new ZONE_LOOKUP_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: zoneLookup.getSettings(),
                                    subsections: zoneLookup.getSubsections()
                                }];
                        case 31: return [4, Promise.resolve(new Promise(function (resolve_16, reject_16) { require(["./PresetConfigSettings/ExhibitSettings"], resolve_16, reject_16); }).then(tslib_1.__importStar))];
                        case 32:
                            EXHIBIT_MODULE = _c.sent();
                            exhibit = new EXHIBIT_MODULE.default({
                                configSettingsMessages: configSettingsMessages
                            });
                            return [2, {
                                    settings: exhibit.getSettings(),
                                    subsections: exhibit.getSubsections()
                                }];
                        case 33: return [2];
                    }
                });
            });
        };
        PresetConfigSettings.prototype._getCommonSettings = function () {
            var _a = this, configSettingsMessages = _a.configSettingsMessages, textEditorMessages = _a.textEditorMessages, pageMessages = _a.pageMessages;
            this._commonSettings.configSettingsMessages = configSettingsMessages;
            this._commonSettings.textEditorMessages = textEditorMessages;
            this._commonSettings.pageMessages = pageMessages;
            return this._commonSettings.getSettings();
        };
        PresetConfigSettings.prototype._getCommonSubsections = function () {
            return this._commonSettings.getSubsections();
        };
        PresetConfigSettings.prototype._getConfigSettings = function () {
            var _a = this.configSettingsMessages, coordinates = _a.coordinates, imageryLayerList = _a.imageryLayerList, imageMeasurement = _a.imageMeasurement, shareIncludeSocial = _a.shareIncludeSocial, mapRotation = _a.mapRotation, navigationBar = _a.navigationBar, hideLocationPanel = _a.hideLocationPanel, numberSections = _a.numberSections, group = _a.group, searchWidget = _a.searchWidget, layerListConfig = _a.layerListConfig, searchTerms = _a.searchTerms;
            return {
                coordinatesOptions: {
                    type: "select",
                    label: coordinates.options.label,
                    tip: coordinates.options.tip,
                    defaultValue: "wgs84",
                    options: [
                        {
                            value: "wgs84",
                            label: coordinates.options.wgs84
                        },
                        {
                            value: "mercator",
                            label: coordinates.options.mercator
                        }
                    ],
                    searchTerms: [
                        searchTerms.wgs84,
                        searchTerms.coordinates,
                        searchTerms.mercator,
                        searchTerms.decimalDegree,
                        searchTerms.degMinSec
                    ]
                },
                imageryLayerList: {
                    type: "boolean",
                    label: imageryLayerList.label,
                    defaultValue: false,
                    tip: imageryLayerList.tip,
                    options: [],
                    searchTerms: [searchTerms.layer, searchTerms.layerSearch]
                },
                angularUnit: {
                    type: "select",
                    label: imageMeasurement.angularUnit.label,
                    defaultValue: "degrees",
                    options: [
                        {
                            value: "degrees",
                            label: imageMeasurement.angularUnit.options.degree
                        },
                        {
                            value: "radians",
                            label: imageMeasurement.angularUnit.options.radian
                        }
                    ],
                    searchTerms: [
                        searchTerms.imageMeasurement,
                        searchTerms.measurement,
                        searchTerms.degree,
                        searchTerms.radian
                    ]
                },
                shareIncludeSocial: {
                    type: "boolean",
                    label: shareIncludeSocial.label,
                    defaultValue: true,
                    searchTerms: [
                        searchTerms.share,
                        searchTerms.facebook,
                        searchTerms.link,
                        searchTerms.twitter,
                        searchTerms.socialMedia,
                        searchTerms.shortLink,
                        searchTerms.enable,
                        searchTerms.options,
                        searchTerms.social,
                        searchTerms.media,
                        searchTerms.button
                    ]
                },
                mapRotation: {
                    type: "boolean",
                    label: mapRotation.label,
                    tip: mapRotation.tip,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.rotate,
                        searchTerms.rotation,
                        searchTerms.twoD
                    ]
                },
                navigationBar: {
                    type: "conditional",
                    label: navigationBar.label,
                    tip: navigationBar.tip,
                    defaultValue: true,
                    searchTerms: [searchTerms.navigate],
                    options: []
                },
                hideLocationPanel: {
                    type: "boolean",
                    label: hideLocationPanel.label,
                    tip: hideLocationPanel.tip,
                    defaultValue: false,
                    searchTerms: [searchTerms.map, searchTerms.location],
                    options: []
                },
                numberSections: {
                    type: "boolean",
                    label: numberSections.label,
                    tip: numberSections.tip,
                    defaultValue: true,
                    searchTerms: [searchTerms.navigation]
                },
                group: {
                    type: "groupBrowser",
                    label: group.label,
                    defaultValue: "",
                    searchTerms: [searchTerms.group, searchTerms.select]
                },
                searchWidget: {
                    type: "conditional",
                    label: searchWidget.label,
                    defaultValue: true,
                    tip: searchWidget.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.widgets,
                        searchTerms.search,
                        searchTerms.find,
                        searchTerms.locate
                    ]
                },
                searchWidgetPosition: {
                    type: "widgetPosition",
                    positionedField: "searchWidget",
                    label: searchWidget.label,
                    searchLabel: searchWidget.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                layerListConfig: {
                    type: "layerListConfig",
                    fieldName: "layerListConfig",
                    tip: layerListConfig.tip,
                    searchTerms: [
                        searchTerms.layer,
                        searchTerms.layerList
                    ]
                }
            };
        };
        PresetConfigSettings.prototype._getSubsections = function () {
            var subsections = this.configSettingsMessages.subsections;
            var searchRadius = subsections.searchRadius, map = subsections.map;
            return {
                searchRadius: {
                    label: searchRadius.label,
                    summary: searchRadius.summary,
                    tip: searchRadius.tip
                },
                map: {
                    label: map.label,
                    summary: map.summary,
                    tip: map.tip
                }
            };
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetConfigSettings.prototype, "appTemplateItemUrl", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/ConfigSettings/resources")
        ], PresetConfigSettings.prototype, "configSettingsMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/TextEditorConfig/resources")
        ], PresetConfigSettings.prototype, "textEditorMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/PageConfig/resources")
        ], PresetConfigSettings.prototype, "pageMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetConfigSettings.prototype, "configSettings", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetConfigSettings.prototype, "subsections", void 0);
        PresetConfigSettings = tslib_1.__decorate([
            decorators_1.subclass("PresetConfigSettings")
        ], PresetConfigSettings);
        return PresetConfigSettings;
    }(Widget));
    return PresetConfigSettings;
});
