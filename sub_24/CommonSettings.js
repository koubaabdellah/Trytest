define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles"], function (require, exports, tslib_1, decorators_1, Accessor_1, Handles_1) {
    "use strict";
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    var CommonSettings = (function (_super) {
        tslib_1.__extends(CommonSettings, _super);
        function CommonSettings(props) {
            var _this = _super.call(this, props) || this;
            _this._handles = new Handles_1.default();
            _this.configSettingsMessages = null;
            _this.pageMessages = null;
            _this.textEditorMessages = null;
            return _this;
        }
        CommonSettings.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        CommonSettings.prototype.getSettings = function () {
            var _a = this.configSettingsMessages, activePanel = _a.activePanel, applySharedTheme = _a.applySharedTheme, applyLayerEffects = _a.applyLayerEffects, attributeEditing = _a.attributeEditing, basemapGallery = _a.basemapGallery, basemapGalleryConfig = _a.basemapGalleryConfig, basemapToggleSelector = _a.basemapToggleSelector, basemapToggle = _a.basemapToggle, bookmarks = _a.bookmarks, compassWidget = _a.compassWidget, coverPage = _a.coverPage, coverPageConfig = _a.coverPageConfig, customCSS = _a.customCSS, customHeader = _a.customHeader, customHeaderPosition = _a.customHeaderPosition, customHeaderHTML = _a.customHeaderHTML, applyCustomTheme = _a.applyCustomTheme, customUrlParam = _a.customUrlParam, customURLParamName = _a.customURLParamName, coordinates = _a.coordinates, details = _a.details, detailsContent = _a.detailsContent, detailsOpenAtStart = _a.detailsOpenAtStart, directionsLayers = _a.directionsLayers, disableScroll = _a.disableScroll, enableFilter = _a.enableFilter, expandFilters = _a.expandFilters, extent = _a.extent, exportCSV = _a.exportCSV, extentSelectorConfig = _a.extentSelectorConfig, filterConfig = _a.filterConfig, fullScreen = _a.fullScreen, groupResultsByLayer = _a.groupResultsByLayer, header = _a.header, headerColor = _a.headerColor, headerBackground = _a.headerBackground, hideLayers = _a.hideLayers, home = _a.home, imageMeasurement = _a.imageMeasurement, info = _a.info, interactiveResults = _a.interactiveResults, introductionContent = _a.introductionContent, introductionTitle = _a.introductionTitle, magnifier = _a.magnifier, mapA11yDesc = _a.mapA11yDesc, mapZoom = _a.mapZoom, layerList = _a.layerList, layerListConfig = _a.layerListConfig, layerListPanel = _a.layerListPanel, layoutType = _a.layoutType, legend = _a.legend, legendConfig = _a.legendConfig, legendOpenAtStart = _a.legendOpenAtStart, legendPanel = _a.legendPanel, lookupLayers = _a.lookupLayers, locateWidget = _a.locateWidget, mapPin = _a.mapPin, mapPinColor = _a.mapPinColor, mapPinIcon = _a.mapPinIcon, mapPinLabel = _a.mapPinLabel, mapPinLabelColor = _a.mapPinLabelColor, mapPinLabelSize = _a.mapPinLabelSize, mapPinSize = _a.mapPinSize, noResultsMessage = _a.noResultsMessage, openMeasurement = _a.openMeasurement, panelSize = _a.panelSize, popupHover = _a.popupHover, popupPanel = _a.popupPanel, positionManager = _a.positionManager, profile = _a.profile, print = _a.print, presetLayerEffects = _a.presetLayerEffects, relatedRecords = _a.relatedRecords, resultsPanelPostText = _a.resultsPanelPostText, resultsPanelPreText = _a.resultsPanelPreText, scalebar = _a.scalebar, screenshot = _a.screenshot, search = _a.search, searchConfiguration = _a.searchConfiguration, searchOpenAtStart = _a.searchOpenAtStart, selectedLayers = _a.selectedLayers, share = _a.share, showElevationProfileTip = _a.showElevationProfileTip, showDirections = _a.showDirections, splash = _a.splash, splashButtonText = _a.splashButtonText, splashContent = _a.splashContent, splashOnStart = _a.splashOnStart, splashTitle = _a.splashTitle, swipe = _a.swipe, textEditor = _a.textEditor, theme = _a.theme, threeDMeasurement = _a.threeDMeasurement, time = _a.time, title = _a.title, titleLink = _a.titleLink, utilityNetwork = _a.utilityNetwork, searchTerms = _a.searchTerms, controlPanel = _a.controlPanel, socialShare = _a.socialShare, keyboardShortcuts = _a.keyboardShortcuts, alignHeader = _a.alignHeader;
            var tips = this.pageMessages.tips;
            return {
                activePanel: {
                    type: "activeItem",
                    label: activePanel.label,
                    defaultValue: "legendPanel",
                    options: [],
                    searchTerms: [
                        searchTerms.start,
                        searchTerms.panels,
                        searchTerms.open,
                        searchTerms.load
                    ]
                },
                applySharedTheme: {
                    type: "boolean",
                    label: applySharedTheme.label,
                    tip: applySharedTheme.tip,
                    defaultValue: true,
                    searchTerms: [
                        searchTerms.theme,
                        searchTerms.style,
                        searchTerms.sharedTheme,
                        searchTerms.organization,
                        searchTerms.background,
                        searchTerms.logo,
                        searchTerms.shared,
                        searchTerms.apply
                    ]
                },
                attributeEditing: {
                    type: "boolean",
                    label: attributeEditing.label,
                    tip: attributeEditing.tip,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.edit,
                        searchTerms.update,
                        searchTerms.review,
                        searchTerms.attribute
                    ]
                },
                basemapGallery: {
                    type: "conditional",
                    label: basemapGallery.label,
                    defaultValue: false,
                    tip: basemapGallery.tip,
                    optionValue: "basemapGallery",
                    optionLabel: basemapGallery.label,
                    options: [],
                    searchTerms: [searchTerms.basemap, searchTerms.gallery]
                },
                basemapGalleryConfig: {
                    type: "basemapGalleryConfig",
                    label: basemapGalleryConfig.label,
                    tip: basemapGalleryConfig.tip,
                    searchTerms: [
                        searchTerms.basemap,
                        searchTerms.topographic,
                        searchTerms.imagery,
                        searchTerms.hybrid,
                        searchTerms.streets,
                        searchTerms.map,
                        searchTerms.background,
                        searchTerms.toggle,
                        searchTerms.select
                    ]
                },
                basemapSelector: {
                    type: "basemapSelector",
                    label: basemapToggleSelector.label,
                    tip: basemapToggleSelector.tip,
                    searchTerms: [
                        searchTerms.basemap,
                        searchTerms.topographic,
                        searchTerms.imagery,
                        searchTerms.hybrid,
                        searchTerms.streets,
                        searchTerms.map,
                        searchTerms.background,
                        searchTerms.toggle,
                        searchTerms.select
                    ]
                },
                basemapToggle: {
                    type: "conditional",
                    label: basemapToggle.label,
                    defaultValue: false,
                    tip: basemapToggle.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.basemap,
                        searchTerms.topographic,
                        searchTerms.imagery,
                        searchTerms.hybrid,
                        searchTerms.streets,
                        searchTerms.map,
                        searchTerms.background,
                        searchTerms.toggle
                    ]
                },
                basemapTogglePosition: {
                    type: "widgetPosition",
                    positionedField: "basemapToggle",
                    label: basemapToggle.label,
                    searchLabel: basemapToggle.position,
                    defaultValue: "bottom-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                basemapGalleryPosition: {
                    type: "widgetPosition",
                    positionedField: "basemapGalleryPosition",
                    label: basemapGallery.label,
                    searchLabel: basemapGallery.position,
                    defaultValue: "bottom-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                bookmarks: {
                    type: "conditional",
                    label: bookmarks.label,
                    tip: bookmarks.tip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.bookmark,
                        searchTerms.bookmarks,
                        searchTerms.locations,
                        searchTerms.collection
                    ]
                },
                bookmarksPosition: {
                    type: "widgetPosition",
                    positionedField: "bookmarks",
                    label: bookmarks.label,
                    searchLabel: bookmarks.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                compassWidget: {
                    type: "conditional",
                    label: compassWidget.label,
                    defaultValue: false,
                    tip: compassWidget.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.widgets,
                        searchTerms.compass,
                        searchTerms.north,
                        searchTerms.arrow
                    ]
                },
                compassWidgetPosition: {
                    type: "widgetPosition",
                    positionedField: "compassWidget",
                    label: compassWidget.label,
                    searchLabel: compassWidget.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                coordinates: {
                    type: "conditional",
                    label: coordinates.label,
                    defaultValue: false,
                    tip: coordinates.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.scale,
                        searchTerms.extent,
                        searchTerms.coordinates
                    ]
                },
                coordinateUnits: {
                    type: "select",
                    label: coordinates.zUnitLabel,
                    defaultValue: "metric",
                    options: [
                        {
                            value: "metric",
                            label: imageMeasurement.linearUnit.options.metric
                        }, {
                            value: "imperial",
                            label: imageMeasurement.linearUnit.options.imperial
                        }
                    ],
                    searchTerms: [
                        searchTerms.units,
                        searchTerms.coordinates
                    ]
                },
                coordinatesPosition: {
                    type: "widgetPosition",
                    positionedField: "coordinates",
                    label: coordinates.label,
                    searchLabel: coordinates.position,
                    defaultValue: "bottom-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                coverPage: {
                    type: "conditional",
                    label: coverPage.label,
                    tip: coverPage.tip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.cover,
                        searchTerms.page,
                        searchTerms.title,
                        searchTerms.coverPage,
                        searchTerms.welcome
                    ]
                },
                coverPageConfig: {
                    type: "pageConfig",
                    label: coverPageConfig.label,
                    titleTip: tips.title,
                    subtitleTip: tips.subtitle,
                    backgroundTip: tips.background.tip,
                    searchTerms: [searchTerms.cover, searchTerms.page, searchTerms.title]
                },
                customCSS: {
                    type: "string",
                    label: customCSS.label,
                    tip: customCSS.tip,
                    defaultValue: "",
                    searchTerms: [searchTerms.custom, searchTerms.css]
                },
                customHeader: {
                    type: "conditional",
                    label: customHeader.label,
                    tip: customHeader.tip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.header,
                        searchTerms.custom,
                        searchTerms.appTitle
                    ]
                },
                customHeaderHTML: {
                    type: "textEditor",
                    label: customHeaderHTML.label,
                    header: customHeaderHTML.label,
                    editLink: customHeaderHTML.editLink,
                    tip: customHeaderHTML.tip + ". " + this.textEditorMessages.a11yInstructions,
                    searchTerms: [
                        searchTerms.header,
                        searchTerms.custom,
                        searchTerms.appTitle
                    ]
                },
                customHeaderPositionedAtBottom: {
                    type: "boolean",
                    label: customHeaderPosition.label,
                    defaultValue: false,
                    searchTerms: [searchTerms.header, searchTerms.position]
                },
                customUrlParam: {
                    type: "layerSelector",
                    label: customUrlParam.label,
                    tip: customUrlParam.tip,
                    searchTerms: [
                        searchTerms.parameter,
                        searchTerms.url,
                        searchTerms.layer,
                        searchTerms.search,
                        searchTerms.custom,
                        searchTerms.fields,
                        searchTerms.searchField
                    ]
                },
                customURLParamName: {
                    type: "string",
                    label: customURLParamName.label,
                    tip: customURLParamName.tip,
                    defaultValue: "",
                    searchTerms: [
                        searchTerms.search,
                        searchTerms.custom,
                        searchTerms.url,
                        searchTerms.parameter,
                        searchTerms.name
                    ]
                },
                details: {
                    type: "conditional",
                    label: details.label,
                    defaultValue: true,
                    tip: details.tip,
                    optionValue: "details",
                    optionLabel: details.optionLabel,
                    options: [],
                    searchTerms: [
                        searchTerms.details,
                        searchTerms.information,
                        searchTerms.itemDetails,
                        searchTerms.panel,
                        searchTerms.description
                    ]
                },
                detailsContent: {
                    type: "textEditor",
                    header: detailsContent.header,
                    label: detailsContent.header,
                    editLink: detailsContent.editLink,
                    tip: detailsContent.tip + ". " + this.textEditorMessages.a11yInstructions,
                    searchTerms: [
                        searchTerms.details,
                        searchTerms.information,
                        searchTerms.itemDetails,
                        searchTerms.panel,
                        searchTerms.description
                    ]
                },
                detailsOpenAtStart: {
                    type: "boolean",
                    label: detailsOpenAtStart.label,
                    defaultValue: false,
                    searchTerms: [searchTerms.details, searchTerms.start]
                },
                disableScroll: {
                    type: "boolean",
                    label: disableScroll.label,
                    defaultValue: false,
                    tip: disableScroll.tip,
                    searchTerms: [
                        searchTerms.scroll,
                        searchTerms.share,
                        searchTerms.zoom,
                        searchTerms.embed
                    ]
                },
                exportCSV: {
                    type: "boolean",
                    label: exportCSV.label,
                    defaultValue: false,
                    tip: exportCSV.tip,
                    searchTerms: [
                        searchTerms.csv,
                        searchTerms.export
                    ]
                },
                showDirections: {
                    type: "conditional",
                    label: showDirections.label,
                    tip: showDirections.tip,
                    options: [],
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.directions,
                        searchTerms.routing,
                        searchTerms.results,
                        searchTerms.show
                    ]
                },
                directionsLayers: {
                    type: "layerSelector",
                    label: directionsLayers.label,
                    tip: directionsLayers.tip,
                    searchTerms: [searchTerms.layers, searchTerms.directions]
                },
                durationTime: {
                    type: "number",
                    label: time.durationTime,
                    defaultValue: 1,
                    min: 0,
                    searchTerms: [searchTerms.time, searchTerms.slider]
                },
                durationPeriod: {
                    type: "select",
                    label: time.durationPeriod,
                    defaultValue: "weeks",
                    options: [
                        { value: "seconds", label: time.seconds },
                        { value: "minutes", label: time.minutes },
                        { value: "hours", label: time.hours },
                        { value: "days", label: time.days },
                        { value: "weeks", label: time.weeks },
                        { value: "months", label: time.months },
                        { value: "years", label: time.years }
                    ],
                    searchTerms: [
                        searchTerms.filter,
                        searchTerms.results,
                        searchTerms.unmatched,
                        searchTerms.features
                    ]
                },
                enableFilter: {
                    type: "conditional",
                    label: enableFilter.label,
                    tip: enableFilter.tip,
                    defaultValue: null,
                    options: [],
                    searchTerms: [searchTerms.filter]
                },
                expandFilters: {
                    type: "boolean",
                    label: expandFilters === null || expandFilters === void 0 ? void 0 : expandFilters.label,
                    tip: expandFilters === null || expandFilters === void 0 ? void 0 : expandFilters.tip,
                    defaultValue: null,
                    searchTerms: [
                        searchTerms.expandFilters,
                        searchTerms.filter
                    ]
                },
                filterConfig: {
                    type: "filterConfig",
                    label: filterConfig.label,
                    tip: filterConfig.tip,
                    searchTerms: [searchTerms.filter]
                },
                enableHeaderBackground: {
                    type: "conditional",
                    label: headerBackground.label,
                    tip: headerBackground.tip,
                    defaultValue: true,
                    options: [],
                    searchTerms: [
                        searchTerms.style,
                        searchTerms.header,
                        searchTerms.theme,
                        searchTerms.background,
                        searchTerms.text,
                        searchTerms.color
                    ]
                },
                enableHeaderColor: {
                    type: "conditional",
                    label: headerColor.label,
                    defaultValue: true,
                    tip: headerColor.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.style,
                        searchTerms.header,
                        searchTerms.theme,
                        searchTerms.background,
                        searchTerms.text,
                        searchTerms.color
                    ]
                },
                elevationProfile: {
                    type: "conditional",
                    label: profile.label,
                    defaultValue: false,
                    tip: profile.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.profile,
                        searchTerms.elevation,
                        searchTerms.enable,
                        searchTerms.control,
                        searchTerms.position
                    ]
                },
                elevationProfileUnits: {
                    type: "select",
                    label: profile.units,
                    defaultValue: "default",
                    options: [
                        {
                            value: "metric",
                            label: imageMeasurement.linearUnit.options.metric
                        },
                        {
                            value: "imperial",
                            label: imageMeasurement.linearUnit.options.imperial
                        },
                        {
                            value: "inches",
                            label: imageMeasurement.linearUnit.options.inches
                        },
                        {
                            value: "feet",
                            label: imageMeasurement.linearUnit.options.feet
                        },
                        {
                            value: "yards",
                            label: imageMeasurement.linearUnit.options.yards
                        },
                        {
                            value: "miles",
                            label: imageMeasurement.linearUnit.options.miles
                        },
                        {
                            value: "nautical-miles",
                            label: imageMeasurement.linearUnit.options.nautical
                        },
                        {
                            value: "us-feet",
                            label: imageMeasurement.linearUnit.options.usfeet
                        },
                        {
                            value: "kilometers",
                            label: imageMeasurement.linearUnit.options.km
                        },
                        {
                            value: "meters",
                            label: imageMeasurement.linearUnit.options.m
                        }
                    ],
                    searchTerms: [
                        searchTerms.units,
                        searchTerms.elevation,
                        searchTerms.profile
                    ]
                },
                elevationProfilePosition: {
                    type: "widgetPosition",
                    positionedField: "elevationProfile",
                    label: profile.label,
                    searchLabel: profile.position,
                    defaultValue: "top-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.profile,
                        searchTerms.elevation,
                        searchTerms.positionManager
                    ]
                },
                elevationProfileOpenAtStart: {
                    type: "boolean",
                    label: profile.open,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.elevation,
                        searchTerms.profile,
                        searchTerms.start
                    ]
                },
                extentSelector: {
                    type: "conditional",
                    label: extent.label,
                    tip: extent.tooltip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.extent,
                        searchTerms.boundary,
                        searchTerms.disableRotation,
                        searchTerms.mapBoundary,
                        searchTerms.mapScale,
                        searchTerms.navigation,
                        searchTerms.restrict,
                        searchTerms.ranges,
                        searchTerms.rotation,
                        searchTerms.rotate,
                        searchTerms.visibilityRange
                    ]
                },
                extentSelectorConfig: {
                    type: "extentSelectorConfig",
                    label: extentSelectorConfig.label,
                    searchTerms: [searchTerms.extent]
                },
                fullScreen: {
                    type: "conditional",
                    label: fullScreen.label,
                    tip: fullScreen.tip,
                    defaultValue: true,
                    options: [],
                    searchTerms: [
                        searchTerms.fullScreen,
                        searchTerms.expand,
                        searchTerms.expandMap,
                        searchTerms.full,
                        searchTerms.screen
                    ]
                },
                fullScreenPosition: {
                    type: "widgetPosition",
                    positionedField: "fullScreen",
                    label: fullScreen.label,
                    searchLabel: fullScreen.position,
                    defaultValue: "top-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                header: {
                    type: "conditional",
                    label: header.label,
                    tip: header.tip,
                    defaultValue: null,
                    options: [],
                    searchTerms: [
                        searchTerms.title,
                        searchTerms.header,
                        searchTerms.top,
                        searchTerms.name,
                        searchTerms.app,
                        searchTerms.appTitle
                    ]
                },
                headerBackground: {
                    type: "color",
                    defaultValue: "#0079c1",
                    label: headerBackground.label,
                    searchTerms: [
                        searchTerms.style,
                        searchTerms.header,
                        searchTerms.theme,
                        searchTerms.background,
                        searchTerms.text,
                        searchTerms.color
                    ]
                },
                headerColor: {
                    type: "color",
                    defaultValue: "#ffffff",
                    label: headerColor.label,
                    searchTerms: [
                        searchTerms.style,
                        searchTerms.header,
                        searchTerms.theme,
                        searchTerms.background,
                        searchTerms.text,
                        searchTerms.color
                    ]
                },
                hideLayers: {
                    type: "boolean",
                    label: hideLayers.label,
                    defaultValue: false,
                    tip: hideLayers.tip,
                    searchTerms: [
                        searchTerms.hide,
                        searchTerms.hidden,
                        searchTerms.layers,
                        searchTerms.map,
                        searchTerms.app,
                        searchTerms.load,
                        searchTerms.start
                    ]
                },
                home: {
                    type: "conditional",
                    label: home.label,
                    defaultValue: false,
                    tip: home.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.home,
                        searchTerms.extent,
                        searchTerms.default,
                        searchTerms.navigate,
                        searchTerms.enable,
                        searchTerms.control,
                        searchTerms.position
                    ]
                },
                homePosition: {
                    type: "widgetPosition",
                    positionedField: "home",
                    label: home.label,
                    searchLabel: home.position,
                    defaultValue: "top-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                info: {
                    type: "conditional",
                    label: info.label,
                    tip: info.tip,
                    defaultValue: null,
                    options: [],
                    searchTerms: [
                        searchTerms.introductionPanel,
                        searchTerms.appDetails,
                        searchTerms.custom,
                        searchTerms.intro
                    ]
                },
                introductionContent: {
                    type: "textEditor",
                    label: introductionContent.header,
                    header: introductionContent.header,
                    editLink: introductionContent.editLink,
                    tip: introductionContent.tip + ". " + this.textEditorMessages.a11yInstructions,
                    searchTerms: [
                        searchTerms.introductionPanel,
                        searchTerms.splashScreen,
                        searchTerms.appDetails,
                        searchTerms.custom,
                        searchTerms.intro,
                        searchTerms.introduction,
                        searchTerms.panel,
                        searchTerms.intro
                    ]
                },
                introductionTitle: {
                    type: "string",
                    label: introductionTitle.label,
                    tip: introductionTitle.tip,
                    defaultValue: "",
                    searchTerms: [
                        searchTerms.title,
                        searchTerms.introductionPanel,
                        searchTerms.introduction,
                        searchTerms.panel,
                        searchTerms.intro
                    ]
                },
                groupResultsByLayer: {
                    type: "boolean",
                    label: groupResultsByLayer.label,
                    tip: groupResultsByLayer.tip,
                    defaultValue: true,
                    searchTerms: [
                        searchTerms.group,
                        searchTerms.layers,
                        searchTerms.results,
                        searchTerms.groupResults
                    ]
                },
                interactiveResults: {
                    type: "boolean",
                    label: interactiveResults.label,
                    tip: interactiveResults.tip,
                    defaultValue: true,
                    searchTerms: [searchTerms.results, searchTerms.interactive]
                },
                magnifier: {
                    type: "conditional",
                    label: magnifier.label,
                    tip: magnifier.tip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.magnifier
                    ]
                },
                magnifierPosition: {
                    type: "widgetPosition",
                    positionedField: "magnifier",
                    label: magnifier.label,
                    searchLabel: magnifier.position,
                    defaultValue: "bottom-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                resultsPanelPreText: {
                    type: "textEditor",
                    label: resultsPanelPreText.header,
                    header: resultsPanelPreText.header,
                    editLink: textEditor.edit,
                    tip: resultsPanelPreText.tip + ". " + this.textEditorMessages.a11yInstructions,
                    searchTerms: [
                        searchTerms.customText,
                        searchTerms.prior,
                        searchTerms.beforeResults,
                        searchTerms.above,
                        searchTerms.text
                    ]
                },
                resultsPanelPostText: {
                    type: "textEditor",
                    label: resultsPanelPostText.header,
                    header: resultsPanelPostText.header,
                    editLink: textEditor.edit,
                    tip: resultsPanelPostText.tip + ". " + this.textEditorMessages.a11yInstructions + ".",
                    searchTerms: [
                        searchTerms.customText,
                        searchTerms.afterResults,
                        searchTerms.below,
                        searchTerms.text
                    ]
                },
                noResultsMessage: {
                    type: "textEditor",
                    label: noResultsMessage.label,
                    header: noResultsMessage.label,
                    editLink: textEditor.edit,
                    tip: noResultsMessage.tip + ". " + this.textEditorMessages.a11yInstructions + ".",
                    defaultValue: noResultsMessage.defaultValue,
                    searchTerms: [
                        searchTerms.customText,
                        searchTerms.resultText,
                        searchTerms.noResults,
                        searchTerms.empty,
                        searchTerms.text
                    ]
                },
                layerListConfig: {
                    type: "layerListConfig",
                    label: layerListConfig.label,
                    tip: layerListConfig.tip,
                    searchTerms: [searchTerms.layerList]
                },
                layerList: {
                    type: "conditional",
                    label: layerList.label,
                    tip: layerList.tip,
                    defaultValue: true,
                    options: [],
                    searchTerms: [
                        searchTerms.layerList,
                        searchTerms.layerToggle,
                        searchTerms.toggle,
                        searchTerms.layers,
                        searchTerms.layer,
                        searchTerms.list
                    ]
                },
                layerListPanel: {
                    type: "conditional",
                    label: layerListPanel.label,
                    defaultValue: true,
                    options: [],
                    tip: layerListPanel.tip,
                    optionValue: "layerListPanel",
                    optionLabel: layerListPanel.optionLabel,
                    searchTerms: [
                        searchTerms.layerListPanel,
                        searchTerms.layerList,
                        searchTerms.layers
                    ]
                },
                layerListAddTable: {
                    type: "boolean",
                    label: layerList.addTable,
                    defaultValue: false,
                    searchTerms: [searchTerms.layerList, searchTerms.table]
                },
                layerListOpenAtStart: {
                    type: "boolean",
                    label: layerList.openAtStart,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.layerList,
                        searchTerms.open,
                        searchTerms.start
                    ]
                },
                layerListPosition: {
                    type: "widgetPosition",
                    positionedField: "layerList",
                    label: layerList.label,
                    searchLabel: layerList.position,
                    defaultValue: "top-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                layoutType: {
                    type: "select",
                    label: layoutType.label,
                    defaultValue: "default",
                    tip: layoutType.tip,
                    options: [
                        {
                            value: "default",
                            label: layoutType.vertical
                        },
                        {
                            value: "horizontal",
                            label: layoutType.horizontal
                        }
                    ],
                    searchTerms: [
                        searchTerms.horizontal,
                        searchTerms.vertical,
                        searchTerms.layout,
                        searchTerms.template
                    ]
                },
                legend: {
                    type: "conditional",
                    label: legend.label,
                    tip: legend.tip,
                    defaultValue: true,
                    options: [],
                    searchTerms: [
                        searchTerms.styles,
                        searchTerms.legend,
                        searchTerms.layers,
                        searchTerms.symbols,
                        searchTerms.symbology,
                        searchTerms.features
                    ]
                },
                legendConfig: {
                    type: "legendConfig",
                    label: legendConfig.label,
                    tip: legendConfig.tip,
                    defaultValue: {
                        style: {
                            type: "classic",
                            layout: "stack"
                        }
                    },
                    searchTerms: [searchTerms.legend]
                },
                legendOpenAtStart: {
                    type: "boolean",
                    label: legendOpenAtStart.label,
                    tip: legendOpenAtStart.tip,
                    defaultValue: false,
                    searchTerms: [searchTerms.legend, searchTerms.start, searchTerms.open]
                },
                legendPanel: {
                    type: "boolean",
                    label: legendPanel.label,
                    defaultValue: true,
                    tip: legendPanel.tip,
                    optionValue: "legendPanel",
                    optionLabel: legendPanel.optionLabel,
                    searchTerms: [
                        searchTerms.legend,
                        searchTerms.styles,
                        searchTerms.symbology,
                        searchTerms.features,
                        searchTerms.layers
                    ]
                },
                legendPosition: {
                    type: "widgetPosition",
                    positionedField: "legend",
                    label: legend.label,
                    searchLabel: legend.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                liveData: {
                    type: "conditional",
                    label: time.liveTimeLabel,
                    defaultValue: false,
                    tip: time.liveTimeTip,
                    options: [],
                    searchTerms: [searchTerms.time, searchTerms.live]
                },
                lookupLayers: {
                    type: "layerSelector",
                    label: lookupLayers.label,
                    tip: lookupLayers.tip,
                    searchTerms: [
                        searchTerms.layers,
                        searchTerms.results,
                        searchTerms.resultLayers,
                        searchTerms.returnedFeatures,
                        searchTerms.include
                    ]
                },
                locateWidget: {
                    type: "conditional",
                    label: locateWidget.label,
                    defaultValue: false,
                    tip: locateWidget.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.locate,
                        searchTerms.widgets,
                        searchTerms.find,
                        searchTerms.location
                    ]
                },
                locateWidgetPosition: {
                    type: "widgetPosition",
                    positionedField: "locateWidget",
                    label: locateWidget.label,
                    searchLabel: locateWidget.position,
                    defaultValue: "bottom-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                mapA11yDesc: {
                    type: "string",
                    label: mapA11yDesc.label,
                    tip: mapA11yDesc.tip,
                    defaultValue: "",
                    searchTerms: [
                        searchTerms.map,
                        searchTerms.description,
                        searchTerms.a11y
                    ]
                },
                mapPin: {
                    type: "conditional",
                    label: mapPin.label,
                    defaultValue: true,
                    tip: mapPin.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.mapPin,
                        searchTerms.location,
                        searchTerms.search,
                        searchTerms.map,
                        searchTerms.pin,
                        searchTerms.add
                    ]
                },
                mapPinColor: {
                    type: "color",
                    label: mapPinColor.label,
                    defaultValue: null,
                    searchTerms: [searchTerms.style, searchTerms.color]
                },
                mapPinIcon: {
                    type: "select",
                    label: mapPinIcon.label,
                    defaultValue: "location",
                    options: [
                        {
                            value: "home",
                            label: mapPinIcon.home
                        },
                        {
                            value: "location",
                            label: mapPinIcon.location
                        },
                        {
                            value: "pin",
                            label: mapPinIcon.pin
                        },
                        {
                            value: "pushpin",
                            label: mapPinIcon.pushpin
                        },
                        {
                            value: "square",
                            label: mapPinIcon.square
                        },
                        {
                            value: "teardrop",
                            label: mapPinIcon.tear
                        }
                    ],
                    searchTerms: [
                        searchTerms.horizontal,
                        searchTerms.vertical,
                        searchTerms.layout,
                        searchTerms.template
                    ]
                },
                mapPinLabel: {
                    type: "conditional",
                    label: mapPinLabel.label,
                    defaultValue: false,
                    tip: mapPinLabel.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.address,
                        searchTerms.pin,
                        searchTerms.label,
                        searchTerms.search,
                        searchTerms.include,
                        searchTerms.searched,
                        searchTerms.address
                    ]
                },
                mapPinLabelColor: {
                    type: "color",
                    label: mapPinLabelColor.label,
                    defaultValue: null,
                    searchTerms: [searchTerms.style, searchTerms.color]
                },
                mapPinLabelSize: {
                    type: "number",
                    label: mapPinLabelSize.label,
                    defaultValue: 12,
                    min: 10,
                    max: 50,
                    searchTerms: [searchTerms.size, searchTerms.settings]
                },
                mapPinSize: {
                    type: "number",
                    label: mapPinSize.label,
                    tip: mapPinSize.tip,
                    defaultValue: 24,
                    min: 18,
                    max: 50,
                    searchTerms: [searchTerms.size, searchTerms.settings]
                },
                mapZoom: {
                    type: "conditional",
                    label: mapZoom.label,
                    defaultValue: true,
                    tip: mapZoom.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.zoom,
                        searchTerms.extent,
                        searchTerms.map,
                        searchTerms.navigate,
                        searchTerms.explore,
                        searchTerms.control
                    ]
                },
                mapZoomPosition: {
                    type: "widgetPosition",
                    positionedField: "mapZoom",
                    label: mapZoom.label,
                    searchLabel: mapZoom.position,
                    defaultValue: "top-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                measure: {
                    type: "conditional",
                    label: threeDMeasurement.label,
                    tip: threeDMeasurement.tip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [searchTerms.measure, searchTerms.measurement]
                },
                measureOpenAtStart: {
                    type: "boolean",
                    label: openMeasurement.label,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.measure,
                        searchTerms.measurement,
                        searchTerms.start
                    ]
                },
                measurePosition: {
                    type: "widgetPosition",
                    positionedField: "measure",
                    label: threeDMeasurement.label,
                    searchLabel: threeDMeasurement.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                panelSize: {
                    type: "select",
                    label: panelSize.label,
                    defaultValue: "m",
                    options: [
                        {
                            value: "m",
                            label: panelSize.options.medium
                        },
                        {
                            value: "s",
                            label: panelSize.options.small
                        },
                        {
                            value: "l",
                            label: panelSize.options.large
                        }
                    ],
                    searchTerms: [searchTerms.size, searchTerms.panel]
                },
                popupHover: {
                    type: "conditional",
                    options: [],
                    label: popupHover.label,
                    tip: popupHover.tip,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.hover,
                        searchTerms.mouseOver,
                        searchTerms.popups,
                        searchTerms.attributes,
                        searchTerms.popup
                    ]
                },
                nextBasemap: {
                    type: "select",
                    label: basemapToggle.selectBasemapToToggle,
                    defaultValue: "streets-vector",
                    options: [
                        {
                            value: "topo",
                            label: basemapToggle.topo
                        },
                        {
                            value: "satellite",
                            label: basemapToggle.satellite
                        },
                        {
                            value: "hybrid",
                            label: basemapToggle.hybrid
                        },
                        {
                            value: "dark-gray",
                            label: basemapToggle.darkGray
                        },
                        {
                            value: "gray",
                            label: basemapToggle.gray
                        },
                        {
                            value: "national-geographic",
                            label: basemapToggle.nationalGeo
                        },
                        {
                            value: "oceans",
                            label: basemapToggle.oceans
                        },
                        {
                            value: "osm",
                            label: basemapToggle.osm
                        },
                        {
                            value: "terrain",
                            label: basemapToggle.terrain
                        },
                        {
                            value: "dark-gray-vector",
                            label: basemapToggle.darkGrayVector
                        },
                        {
                            value: "gray-vector",
                            label: basemapToggle.grayVector
                        },
                        {
                            value: "streets-vector",
                            label: basemapToggle.streetsVector
                        },
                        {
                            value: "streets-night-vector",
                            label: basemapToggle.streetsNightVector
                        },
                        {
                            value: "streets-navigation-vector",
                            label: basemapToggle.streetsNavVector
                        },
                        {
                            value: "topo-vector",
                            label: basemapToggle.topoVector
                        },
                        {
                            value: "streets-relief-vector",
                            label: basemapToggle.streetsReliefVector
                        }
                    ],
                    searchTerms: [
                        searchTerms.basemap,
                        searchTerms.topographic,
                        searchTerms.imagery,
                        searchTerms.hybrid,
                        searchTerms.streets,
                        searchTerms.map,
                        searchTerms.background
                    ]
                },
                popupPanel: {
                    type: "boolean",
                    label: popupPanel.label,
                    defaultValue: false,
                    tip: popupPanel.tip,
                    optionValue: "popupPanel",
                    optionLabel: popupPanel.optionLabel,
                    searchTerms: [
                        searchTerms.popup,
                        searchTerms.popups,
                        searchTerms.attributes,
                        searchTerms.features,
                        searchTerms.information,
                        searchTerms.description
                    ]
                },
                positionManager: {
                    type: "positionManager",
                    label: positionManager.label,
                    tip: positionManager.tip,
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.positionManager,
                        searchTerms.corner,
                        searchTerms.placement
                    ]
                },
                popupHoverFixed: {
                    type: "conditional",
                    label: popupHover.fixedLabel,
                    tip: popupHover.fixedTip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.popups,
                        searchTerms.popupsNoDash,
                        searchTerms.popupSpace,
                        searchTerms.location,
                        searchTerms.position
                    ]
                },
                popupFixed: {
                    type: "conditional",
                    label: popupHover.fixedLabel,
                    tip: popupHover.fixedTip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.popups,
                        searchTerms.popupsNoDash,
                        searchTerms.popupSpace,
                        searchTerms.location,
                        searchTerms.position
                    ]
                },
                popupFixedPosition: {
                    type: "select",
                    label: popupHover.position,
                    defaultValue: "bottom-right",
                    options: [
                        {
                            value: "top-left",
                            label: popupHover.topLeft
                        },
                        {
                            value: "top-right",
                            label: popupHover.topRight
                        },
                        {
                            value: "bottom-left",
                            label: popupHover.bottomLeft
                        },
                        {
                            value: "bottom-right",
                            label: popupHover.bottomRight
                        }
                    ],
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement
                    ]
                },
                popupHoverPosition: {
                    type: "select",
                    label: popupHover.position,
                    defaultValue: "bottom-right",
                    options: [
                        {
                            value: "top-left",
                            label: popupHover.topLeft
                        },
                        {
                            value: "top-right",
                            label: popupHover.topRight
                        },
                        {
                            value: "bottom-left",
                            label: popupHover.bottomLeft
                        },
                        {
                            value: "bottom-right",
                            label: popupHover.bottomRight
                        }
                    ],
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement
                    ]
                },
                print: {
                    type: "conditional",
                    label: print.label,
                    tip: print.tip,
                    defaultValue: null,
                    options: [],
                    searchTerms: [searchTerms.print, searchTerms.export, searchTerms.layout]
                },
                printPosition: {
                    type: "widgetPosition",
                    positionedField: "print",
                    label: print.label,
                    searchLabel: print.position,
                    defaultValue: "top-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                presetLayerEffects: {
                    type: "presetLayerEffectsConfig",
                    label: presetLayerEffects.label,
                    tip: presetLayerEffects.tip,
                    defaultValue: {
                        id: "lift-1",
                        data: {
                            includedEffect: "drop-shadow(4px, 4px, 4px, #000000)",
                            excludedEffect: ""
                        }
                    },
                    searchTerms: [
                        searchTerms.filter,
                        searchTerms.results,
                        searchTerms.unmatched,
                        searchTerms.features
                    ]
                },
                scalebar: {
                    type: "conditional",
                    label: scalebar.label,
                    defaultValue: false,
                    tip: scalebar.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.scale,
                        searchTerms.extent,
                        searchTerms.visibilityRange
                    ]
                },
                relatedRecords: {
                    type: "conditional",
                    label: relatedRecords.label,
                    tip: relatedRecords.tip,
                    defaultValue: null,
                    options: [],
                    searchTerms: [
                        searchTerms.related,
                        searchTerms.relatedRecords,
                        searchTerms.relatedTable
                    ]
                },
                scalebarPosition: {
                    type: "widgetPosition",
                    positionedField: "scalebar",
                    label: scalebar.label,
                    searchLabel: scalebar.position,
                    defaultValue: "bottom-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                screenshot: {
                    type: "conditional",
                    label: screenshot.label,
                    tip: screenshot.tip,
                    defaultValue: null,
                    options: [],
                    searchTerms: [
                        searchTerms.share,
                        searchTerms.screenshot,
                        searchTerms.popup,
                        searchTerms.popupSpace,
                        searchTerms.export,
                        searchTerms.print
                    ]
                },
                screenshotPosition: {
                    type: "widgetPosition",
                    positionedField: "screenshot",
                    label: screenshot.label,
                    searchLabel: screenshot.position,
                    defaultValue: "top-left",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                search: {
                    type: "conditional",
                    label: search.label,
                    defaultValue: false,
                    tip: search.tip,
                    options: [],
                    searchTerms: [
                        searchTerms.addressLocator,
                        searchTerms.search,
                        searchTerms.geocoding,
                        searchTerms.locate,
                        searchTerms.featureSearch,
                        searchTerms.find,
                        searchTerms.layerSearch,
                        searchTerms.enable
                    ]
                },
                searchPosition: {
                    type: "widgetPosition",
                    positionedField: "search",
                    label: search.label,
                    searchLabel: search.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                searchOpenAtStart: {
                    type: "boolean",
                    label: searchOpenAtStart.label,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.search,
                        searchTerms.find,
                        searchTerms.geocoding,
                        searchTerms.locate,
                        searchTerms.open,
                        searchTerms.start,
                        searchTerms.load
                    ]
                },
                searchConfiguration: {
                    type: "searchConfiguration",
                    label: searchConfiguration.label,
                    searchTerms: [
                        searchTerms.addressLocator,
                        searchTerms.search,
                        searchTerms.geocoding,
                        searchTerms.locate,
                        searchTerms.featureSearch,
                        searchTerms.find,
                        searchTerms.layerSearch,
                        searchTerms.default,
                        searchTerms.source,
                        searchTerms.searchSource,
                        searchTerms.locator,
                        searchTerms.locatorSettings
                    ]
                },
                share: {
                    type: "conditional",
                    label: share.label,
                    tip: share.tip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [
                        searchTerms.share,
                        searchTerms.facebook,
                        searchTerms.link,
                        searchTerms.twitter,
                        searchTerms.socialMedia,
                        searchTerms.shortLink,
                        searchTerms.enable,
                        searchTerms.options,
                        searchTerms.include,
                        searchTerms.socialMedia,
                        searchTerms.button
                    ]
                },
                selectedLayers: {
                    type: "layerSelector",
                    label: selectedLayers.label,
                    tip: selectedLayers.tip,
                    searchTerms: [
                        searchTerms.layers,
                        searchTerms.layerList
                    ]
                },
                socialShare: {
                    type: "boolean",
                    label: socialShare.label,
                    tip: socialShare.tip,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.share,
                        searchTerms.facebook,
                        searchTerms.link,
                        searchTerms.twitter,
                        searchTerms.socialMedia,
                        searchTerms.shortLink,
                        searchTerms.enable,
                        searchTerms.options,
                        searchTerms.include,
                        searchTerms.socialMedia,
                        searchTerms.button
                    ]
                },
                sharePosition: {
                    type: "widgetPosition",
                    positionedField: "share",
                    label: share.label,
                    searchLabel: share.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.share,
                        searchTerms.positionManager
                    ]
                },
                showElevationProfile: {
                    type: "boolean",
                    label: showElevationProfileTip.label,
                    defaultValue: false,
                    tip: showElevationProfileTip.tip,
                    searchTerms: [
                        searchTerms.profile,
                        searchTerms.elevation,
                        searchTerms.enable
                    ]
                },
                snapTime: {
                    type: "boolean",
                    label: time.snapTimeLabel,
                    defaultValue: false,
                    tip: time.snapTimeTip,
                    searchTerms: [searchTerms.time, searchTerms.live]
                },
                splash: {
                    type: "conditional",
                    label: splash.label,
                    tip: splash.tip,
                    defaultValue: null,
                    options: [],
                    searchTerms: [
                        searchTerms.introductionPanel,
                        searchTerms.splashScreen,
                        searchTerms.appDetails,
                        searchTerms.custom,
                        searchTerms.intro
                    ]
                },
                splashOnStart: {
                    type: "boolean",
                    label: splashOnStart.label,
                    tip: splashOnStart.tip,
                    defaultValue: true,
                    searchTerms: [
                        searchTerms.introductionPanel,
                        searchTerms.splashScreen,
                        searchTerms.appDetails,
                        searchTerms.custom,
                        searchTerms.intro
                    ]
                },
                splashButtonPosition: {
                    type: "widgetPosition",
                    positionedField: "splash",
                    label: splash.label,
                    searchLabel: splash.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                splashButtonText: {
                    type: "string",
                    label: splashButtonText.label,
                    defaultValue: "",
                    searchTerms: [
                        searchTerms.title,
                        searchTerms.info,
                        searchTerms.information,
                        searchTerms.header,
                        searchTerms.splash,
                        searchTerms.button,
                        searchTerms.splashButton
                    ]
                },
                splashContent: {
                    type: "textEditor",
                    header: splashContent.header,
                    label: splashContent.header,
                    editLink: splashContent.editLink,
                    tip: splashContent.tip + ". " + this.textEditorMessages.a11yInstructions,
                    searchTerms: [
                        searchTerms.introductionPanel,
                        searchTerms.appDetails,
                        searchTerms.custom,
                        searchTerms.intro,
                        searchTerms.splash,
                        searchTerms.splashContent,
                        searchTerms.content
                    ]
                },
                splashTitle: {
                    type: "string",
                    label: splashTitle.label,
                    defaultValue: "",
                    searchTerms: [
                        searchTerms.splash,
                        searchTerms.splashScreen,
                        searchTerms.title,
                        searchTerms.splashTitle
                    ]
                },
                swipe: {
                    type: "conditional",
                    label: swipe.label,
                    tip: swipe.tip,
                    defaultValue: false,
                    options: [],
                    searchTerms: [searchTerms.swipe, searchTerms.compare]
                },
                swipePercentage: {
                    type: "number",
                    label: swipe.percentage.label,
                    tip: swipe.percentage.tip,
                    defaultValue: 35,
                    min: 0,
                    max: 100,
                    searchTerms: [searchTerms.swipe, searchTerms.compare]
                },
                swipeDirection: {
                    type: "select",
                    label: swipe.direction.label,
                    tip: swipe.direction.tip,
                    defaultValue: "horizontal",
                    options: [
                        {
                            value: "vertical",
                            label: layoutType.vertical
                        },
                        {
                            value: "horizontal",
                            label: layoutType.horizontal
                        }
                    ],
                    searchTerms: [
                        searchTerms.horizontal,
                        searchTerms.vertical,
                        searchTerms.swipe
                    ]
                },
                theme: {
                    type: "select",
                    label: theme.label,
                    defaultValue: "light",
                    options: [
                        { value: "light", label: theme.light },
                        { value: "dark", label: theme.dark }
                    ],
                    searchTerms: [
                        searchTerms.light,
                        searchTerms.lightTheme,
                        searchTerms.dark,
                        searchTerms.darkTheme,
                        searchTerms.theme,
                        searchTerms.style,
                        searchTerms.background,
                        searchTerms.select
                    ]
                },
                customTheme: {
                    type: "themeConfig",
                    label: "Edit theme",
                    searchTerms: [
                        searchTerms.color,
                        searchTerms.theme,
                        searchTerms.style,
                        searchTerms.header,
                        searchTerms.button,
                        searchTerms.background,
                        searchTerms.share,
                        searchTerms.shared,
                        searchTerms.sharedTheme,
                        searchTerms.logo,
                        searchTerms.icon
                    ]
                },
                timeIntervalUnits: {
                    type: "select",
                    label: time.timeIntervalUnits,
                    defaultValue: "days",
                    options: [
                        { value: "seconds", label: time.seconds },
                        { value: "minutes", label: time.minutes },
                        { value: "hours", label: time.hours },
                        { value: "days", label: time.days },
                        { value: "weeks", label: time.weeks },
                        { value: "months", label: time.months },
                        { value: "years", label: time.years }
                    ],
                    searchTerms: [
                        searchTerms.filter,
                        searchTerms.results,
                        searchTerms.unmatched,
                        searchTerms.features
                    ]
                },
                timeInterval: {
                    type: "number",
                    label: time.timeInterval,
                    defaultValue: 1,
                    min: 0,
                    searchTerms: [searchTerms.time, searchTerms.slider]
                },
                timeLoop: {
                    type: "boolean",
                    label: time.timeLoopLabel,
                    tip: time.timeLoopTip,
                    defaultValue: false,
                    searchTerms: [searchTerms.loop, searchTerms.time]
                },
                timePosition: {
                    type: "widgetPosition",
                    positionedField: "time",
                    label: time.label,
                    searchLabel: time.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                timeVisible: {
                    type: "boolean",
                    label: time.timeStampLabel,
                    tip: time.timeStampTip,
                    defaultValue: false,
                    searchTerms: [searchTerms.time]
                },
                title: {
                    type: "string",
                    label: title.label,
                    tip: title.tip,
                    defaultValue: "",
                    searchTerms: [
                        searchTerms.title,
                        searchTerms.header,
                        searchTerms.top,
                        searchTerms.name,
                        searchTerms.app,
                        searchTerms.appTitle
                    ]
                },
                titleLink: {
                    type: "string",
                    label: titleLink.label,
                    tip: titleLink.tip,
                    defaultValue: "",
                    searchTerms: [searchTerms.link, searchTerms.url, searchTerms.title]
                },
                applyLayerEffects: {
                    type: "conditional",
                    label: applyLayerEffects.label,
                    defaultValue: false,
                    tip: applyLayerEffects.tip,
                    options: [],
                    searchTerms: []
                },
                controlPanelPosition: {
                    type: "widgetPosition",
                    fieldName: "controlPanel",
                    positionedField: "dummyPositionedField",
                    label: controlPanel.label,
                    searchLabel: controlPanel.position,
                    defaultValue: "top-right",
                    searchTerms: [
                        searchTerms.position,
                        searchTerms.corner,
                        searchTerms.placement,
                        searchTerms.location,
                        searchTerms.positionManager
                    ]
                },
                utilityNetwork: {
                    type: "boolean",
                    label: utilityNetwork.label,
                    tip: utilityNetwork.tip,
                    optionValue: "utilityNetwork",
                    optionLabel: utilityNetwork.label,
                    defaultValue: false,
                    searchTerms: [
                        searchTerms.utility,
                        searchTerms.network,
                        searchTerms.trace,
                        searchTerms.flags,
                        searchTerms.connectivity,
                        searchTerms.traversability
                    ]
                },
                applyCustomTheme: {
                    type: "conditional",
                    label: applyCustomTheme === null || applyCustomTheme === void 0 ? void 0 : applyCustomTheme.label,
                    defaultValue: false,
                    tip: applyCustomTheme === null || applyCustomTheme === void 0 ? void 0 : applyCustomTheme.tip,
                    options: [],
                    searchTerms: [searchTerms.theme]
                },
                keyboardShortcuts: {
                    type: "boolean",
                    label: keyboardShortcuts.label,
                    defaultValue: false,
                    tip: keyboardShortcuts.tip,
                    searchTerms: [
                        searchTerms.keyboard,
                        searchTerms.shortcuts
                    ]
                },
                alignHeader: {
                    type: "select",
                    label: alignHeader.label,
                    defaultValue: "left",
                    options: [
                        {
                            value: "left",
                            label: alignHeader.options.left
                        }, {
                            value: "center",
                            label: alignHeader.options.center
                        }, {
                            value: "right",
                            label: alignHeader.options.right
                        }
                    ],
                    tip: alignHeader.tip,
                    searchTerms: [
                        searchTerms.align,
                        searchTerms.header,
                        searchTerms.position,
                        searchTerms.title,
                        searchTerms.format
                    ]
                }
            };
        };
        CommonSettings.prototype.getSubsections = function () {
            var configSettingsMessages = this.configSettingsMessages;
            var _a = configSettingsMessages.subsections, appComprehension = _a.appComprehension, featureComprehension = _a.featureComprehension, coverPage = _a.coverPage, customURLParams = _a.customURLParams, exploreNavigate = _a.exploreNavigate, filter = _a.filter, layout = _a.layout, mapTools = _a.mapTools, modify = _a.modify, navigation = _a.navigation, positionManager = _a.positionManager, search = _a.search, share = _a.share, theme = _a.theme, themeLayout = _a.themeLayout;
            return {
                appComprehension: {
                    label: appComprehension.label,
                    summary: appComprehension.summary,
                    tip: appComprehension.tip
                },
                customURLParams: {
                    label: customURLParams.label,
                    summary: customURLParams.summary,
                    tip: customURLParams.tip
                },
                filter: {
                    label: filter.label,
                    summary: filter.summary,
                    tip: filter.tip
                },
                layout: {
                    label: layout.label,
                    summary: layout.summary,
                    tip: layout.tip
                },
                featureComprehension: {
                    label: featureComprehension.label,
                    summary: featureComprehension.summary,
                    tip: featureComprehension.tip
                },
                coverPageSettings: {
                    label: coverPage.label,
                    summary: coverPage.summary,
                    tip: coverPage.tip
                },
                exploreNavigate: {
                    label: exploreNavigate.label,
                    summary: exploreNavigate.summary,
                    tip: exploreNavigate.tip
                },
                mapTools: {
                    label: mapTools.label,
                    summary: mapTools.summary,
                    tip: mapTools.tip
                },
                modify: {
                    label: modify.label,
                    summary: modify.summary,
                    tip: modify.tip
                },
                navigation: {
                    label: navigation.label,
                    summary: navigation.summary,
                    tip: ""
                },
                search: {
                    label: search.label,
                    summary: search.summary,
                    tip: search.tip
                },
                share: {
                    label: share.label,
                    summary: share.summary,
                    tip: share.tip
                },
                positionManager: {
                    label: positionManager.label,
                    summary: positionManager.summary,
                    tip: positionManager.tip
                },
                theme: {
                    label: theme.label,
                    summary: theme.summary,
                    tip: theme.tip
                },
                themeLayout: {
                    label: themeLayout.label,
                    summary: themeLayout.summary,
                    tip: ""
                }
            };
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], CommonSettings.prototype, "configSettingsMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CommonSettings.prototype, "pageMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CommonSettings.prototype, "textEditorMessages", void 0);
        CommonSettings = tslib_1.__decorate([
            decorators_1.subclass("CommonSettings")
        ], CommonSettings);
        return CommonSettings;
    }(Accessor_1.default));
    return CommonSettings;
});
