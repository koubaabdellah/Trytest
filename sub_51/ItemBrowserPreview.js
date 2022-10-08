define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/intl", "../../utils/utils", "../../utils/focusUtils", "../../icons/icons", "./ItemBrowserPreview/ItemBrowserPreviewViewModel", "../../utils/configParamsUtils", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, Widget_1, widget_1, decorators_1, watchUtils_1, intl_1, utils_1, focusUtils_1, icons, ItemBrowserPreviewViewModel, configParamsUtils_1, labelSettingMargin_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "esri-config-panel-item-browser-preview",
        title: "esri-config-panel-item-browser-preview__title",
        thumbnail: "esri-config-panel-item-browser-preview__thumbnail",
        itemPageLink: "esri-config-panel-item-browser-preview__item-page-link",
        description: "esri-config-panel-item-browser-preview__description",
        descriptionLabel: "esri-config-panel-item-browser-preview__description-label",
        descriptionText: "esri-config-panel-item-browser-preview__description-text",
        owner: "esri-config-panel-item-browser-preview__owner",
        ownerLabel: "esri-config-panel-item-browser-preview__owner-label",
        ownerText: "esri-config-panel-item-browser-preview__owner-text",
        dates: "esri-config-panel-item-browser-preview__dates",
        dateItem: "esri-config-panel-item-browser-preview__date-item",
        dateLabel: "esri-config-panel-item-browser-preview__date-label",
        dateText: "esri-config-panel-item-browser-preview__date-text",
        baseDarkMode: "esri-config-panel-item-browser-preview__dark-mode",
        darkModeDates: "esri-config-panel-item-browser-preview__dates--dark",
        darkModeText: "esri-config-panel-item-browser-preview__dark-mode-text",
        selectMapButton: "esri-config-panel-item-browser-preview__select-map-button",
        mapA11yText: "esri-config-panel-item-browser-preview__map-a11y-text"
    };
    var ItemBrowserPreview = (function (_super) {
        tslib_1.__extends(ItemBrowserPreview, _super);
        function ItemBrowserPreview(value) {
            var _this = _super.call(this, value) || this;
            _this._conditions = [];
            _this._itemTypes = [];
            _this.configPanelViewModel = null;
            _this.darkModeEnabled = null;
            _this.itemBrowser = null;
            _this.item = null;
            _this.itemDescription = null;
            _this.itemBrowserMessages = null;
            _this.viewModel = new ItemBrowserPreviewViewModel();
            return _this;
        }
        ItemBrowserPreview.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.when(this, "configPanelViewModel.templateAppData", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var values, hasDraft, draftType, type, id, _a;
                    var _b, _c, _d, _e, _f;
                    return tslib_1.__generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                values = this.configPanelViewModel.templateAppData.values;
                                hasDraft = values === null || values === void 0 ? void 0 : values.hasOwnProperty("draft");
                                draftType = hasDraft
                                    ? ((_b = values === null || values === void 0 ? void 0 : values.draft) === null || _b === void 0 ? void 0 : _b.webmap) ? "webmap"
                                        : ((_c = values === null || values === void 0 ? void 0 : values.draft) === null || _c === void 0 ? void 0 : _c.webscene) ? "webscene"
                                            : ((_d = values === null || values === void 0 ? void 0 : values.draft) === null || _d === void 0 ? void 0 : _d.group) ? "group"
                                                : ""
                                    : "";
                                type = draftType
                                    ? draftType
                                    : (values === null || values === void 0 ? void 0 : values.webmap) ? "webmap"
                                        : (values === null || values === void 0 ? void 0 : values.webscene) ? "webscene"
                                            : (values === null || values === void 0 ? void 0 : values.group) ? "group"
                                                : "";
                                id = draftType ? (_e = values.draft) === null || _e === void 0 ? void 0 : _e[type] : values[type];
                                if (!id) {
                                    return [2];
                                }
                                this.configPanelViewModel.selectedMapId = id;
                                _a = this;
                                return [4, this.configPanelViewModel.queryPortalItems(id)];
                            case 1:
                                _a.item = _g.sent();
                                this.itemDescription = this.configPanelViewModel.sanitizer.sanitize((_f = this.item) === null || _f === void 0 ? void 0 : _f.description);
                                this.scheduleRender();
                                return [2];
                        }
                    });
                }); }),
                watchUtils_1.whenOnce(this, "configPanelViewModel.configParams", function () {
                    var _a, _b, _c;
                    var mapSection = configParamsUtils_1.getConfigParamsSection(_this.configPanelViewModel.configParams.config, "map");
                    var mapConfig = mapSection === null || mapSection === void 0 ? void 0 : mapSection.config;
                    if (((_a = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.conditions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        _this._conditions = mapConfig.conditions;
                        _this.own([
                            watchUtils_1.when(_this, "configPanelViewModel.map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, this.configPanelViewModel.map.loadAll()];
                                        case 1:
                                            _a.sent();
                                            this._handleConditions();
                                            return [2];
                                    }
                                });
                            }); })
                        ]);
                    }
                    if (((_b = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                        _this._itemTypes = mapConfig.itemTypes;
                        _this._handleItemTypes();
                    }
                    if (((_c = _this._itemTypes) === null || _c === void 0 ? void 0 : _c.length) === 0) {
                        _this.configPanelViewModel.allowedItemTypes = ["Web Map"];
                    }
                }),
                watchUtils_1.watch(this, "configPanelViewModel.selectedMapId", function () {
                    if (!_this.configPanelViewModel.selectedMapId) {
                        _this.item = null;
                        _this.scheduleRender();
                    }
                })
            ]);
        };
        ItemBrowserPreview.prototype.render = function () {
            var _a;
            var title = this._renderTitle();
            var owner = this._renderOwner();
            var description = this._renderDescription();
            var thumbnail = this._renderThumbnail();
            var selectItemButton = this._renderSelectItemButton();
            var itemPageUrl = this._renderItemPageUrl();
            var viewerUrl = this._renderViewerUrl();
            var mapViewerBetaUrl = this._renderMapViewerBetaUrl();
            var dates = this._renderDates();
            var darkMode = (_a = {},
                _a[CSS.baseDarkMode] = this.darkModeEnabled,
                _a);
            var mapA11y = this._renderMapA11y();
            return (widget_1.tsx("div", { key: "item-browser-preview", class: this.classes(CSS.base, darkMode) },
                this.item ? (widget_1.tsx("div", null,
                    title,
                    owner,
                    description,
                    itemPageUrl,
                    thumbnail,
                    selectItemButton,
                    mapViewerBetaUrl,
                    viewerUrl,
                    widget_1.tsx("hr", null),
                    dates)) : (selectItemButton),
                mapA11y));
        };
        ItemBrowserPreview.prototype._renderTitle = function () {
            var _a, _b;
            return this.configPanelViewModel.expressEnabled ? (widget_1.tsx("h4", { class: CSS.title }, (_a = this.item) === null || _a === void 0 ? void 0 : _a.title)) : (widget_1.tsx("h3", { class: CSS.title }, (_b = this.item) === null || _b === void 0 ? void 0 : _b.title));
        };
        ItemBrowserPreview.prototype._renderThumbnail = function () {
            var item = this.item;
            if (!item) {
                return;
            }
            var thumbnailUrl = item.getThumbnailUrl("400");
            return thumbnailUrl ? (widget_1.tsx("img", { class: CSS.thumbnail, src: thumbnailUrl, alt: "map thumbnail" })) : null;
        };
        ItemBrowserPreview.prototype._renderSelectItemButton = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g;
            var map = ((_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.configParams) === null || _b === void 0 ? void 0 : _b.config) ? configParamsUtils_1.getConfigParamsSection(this.configPanelViewModel.configParams.config, "map")
                : null;
            var mapConfig = map === null || map === void 0 ? void 0 : map.config;
            return (widget_1.tsx("calcite-button", { bind: this, onclick: this._openItemBrowser, onkeydown: function (e) {
                    if (e.code === "Space" || e.code === "Enter") {
                        _this._openItemBrowser();
                        return;
                    }
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, width: "full", appearance: "outline", id: "selectItemButton", class: CSS.selectMapButton, "data-search-setting": "search-selectItem", "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }, ((_c = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _c === void 0 ? void 0 : _c.includes("2d")) && ((_d = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _d === void 0 ? void 0 : _d.includes("3d"))
                ? (_e = this.itemBrowserMessages) === null || _e === void 0 ? void 0 : _e.selectAMapOrScene : ((_f = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _f === void 0 ? void 0 : _f.length) === 1 && ((_g = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _g === void 0 ? void 0 : _g.includes("3d"))
                ? this.itemBrowserMessages.selectAScene
                : this.itemBrowserMessages.selectAnItem));
        };
        ItemBrowserPreview.prototype._renderItemPageUrl = function () {
            var _a, _b, _c, _d;
            var item = this.item;
            var baseUrl = utils_1.getBaseUrl(this.configPanelViewModel.portal);
            var itemUrl = baseUrl + "/home/item.html?id=" + (item === null || item === void 0 ? void 0 : item.id);
            return (widget_1.tsx("a", { bind: this, onkeydown: function (e) {
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, class: CSS.itemPageLink, href: itemUrl, target: "_blank", "data-search-setting": "search-viewItemDetails", "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, tabIndex: 0, "aria-label": ((_a = this.item) === null || _a === void 0 ? void 0 : _a.title) && ((_b = this.item) === null || _b === void 0 ? void 0 : _b.owner)
                    ? this.itemBrowserMessages.view + " " + ((_c = this.item) === null || _c === void 0 ? void 0 : _c.title) + " " + this.itemBrowserMessages.by + " " + ((_d = this.item) === null || _d === void 0 ? void 0 : _d.owner) + " " + this.itemBrowserMessages.details
                    : this.itemBrowserMessages.viewItemDetails },
                this.itemBrowserMessages.viewItemDetails,
                widget_1.tsx("calcite-icon", { icon: icons.launch, scale: "s", "text-label": this.itemBrowserMessages.opensNewTab })));
        };
        ItemBrowserPreview.prototype._renderViewerUrl = function () {
            var item = this.item;
            var baseUrl = utils_1.getBaseUrl(this.configPanelViewModel.portal);
            var type = item === null || item === void 0 ? void 0 : item.type.replace(/\s+/g, "").toLowerCase();
            var viewerUrl = baseUrl + "/home/" + type + "/viewer.html?" + type + "=" + (item === null || item === void 0 ? void 0 : item.id);
            var i18nText = type === "webscene"
                ? this.itemBrowserMessages.openInSceneViewer
                : this.itemBrowserMessages.openInMapViewer;
            return (widget_1.tsx("a", { bind: this, onkeydown: focusUtils_1.handleFocusElFromSettingsPanel, class: CSS.itemPageLink, href: viewerUrl, target: "_blank", "data-search-setting": "search-openInViewer", "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, tabIndex: 0 },
                i18nText,
                widget_1.tsx("calcite-icon", { icon: icons.map, scale: "s", "text-label": this.itemBrowserMessages.opensNewTab })));
        };
        ItemBrowserPreview.prototype._renderMapViewerBetaUrl = function () {
            var item = this.item;
            var baseUrl = utils_1.getBaseUrl(this.configPanelViewModel.portal);
            var mapViewerBetaUrl = baseUrl + "/apps/mapviewer/index.html?webmap=" + (item === null || item === void 0 ? void 0 : item.id);
            var type = item === null || item === void 0 ? void 0 : item.type;
            return type === "Web Map" ? (widget_1.tsx("a", { key: "mapViewerBetaUrl", class: CSS.itemPageLink, href: mapViewerBetaUrl, target: "_blank", "data-search-setting": "search-openInMapViewerBeta", tabIndex: 0 },
                this.itemBrowserMessages.openInMapViewerBeta,
                widget_1.tsx("calcite-icon", { icon: icons.map, scale: "s", "text-label": this.itemBrowserMessages.opensNewTab }))) : null;
        };
        ItemBrowserPreview.prototype._renderDescription = function () {
            var _a;
            var darkModeText = (_a = {},
                _a[CSS.darkModeText] = this.darkModeEnabled,
                _a);
            return (widget_1.tsx("div", { class: CSS.description },
                widget_1.tsx("div", { class: CSS.descriptionLabel },
                    this.itemBrowserMessages.description,
                    ":"),
                widget_1.tsx("p", { class: this.classes(CSS.descriptionText, darkModeText), innerHTML: this.itemDescription
                        ? this.itemDescription
                        : this.itemBrowserMessages.noDescription })));
        };
        ItemBrowserPreview.prototype._renderOwner = function () {
            var _a;
            var _b;
            var darkModeText = (_a = {},
                _a[CSS.darkModeText] = this.darkModeEnabled,
                _a);
            return (widget_1.tsx("div", { class: CSS.owner },
                widget_1.tsx("div", { class: CSS.ownerLabel },
                    this.itemBrowserMessages.owner,
                    ":"),
                widget_1.tsx("p", { class: this.classes(CSS.ownerText, darkModeText) }, (_b = this.item) === null || _b === void 0 ? void 0 : _b.owner)));
        };
        ItemBrowserPreview.prototype._renderDates = function () {
            var _a, _b;
            var item = this.item;
            var darkMode = (_a = {},
                _a[CSS.darkModeDates] = this.darkModeEnabled,
                _a);
            var darkModeText = (_b = {},
                _b[CSS.darkModeText] = this.darkModeEnabled,
                _b);
            return (widget_1.tsx("p", { class: this.classes(CSS.dates, darkMode) },
                widget_1.tsx("div", { class: CSS.dateItem },
                    widget_1.tsx("span", { class: CSS.dateLabel }, this.itemBrowserMessages.created + ": "),
                    widget_1.tsx("span", { class: this.classes(CSS.dateText, darkModeText) }, intl_1.formatDate(item === null || item === void 0 ? void 0 : item.created))),
                widget_1.tsx("div", { class: CSS.dateItem },
                    widget_1.tsx("span", { class: CSS.dateLabel }, this.itemBrowserMessages.modified + ": "),
                    widget_1.tsx("span", { class: this.classes(CSS.dateText, darkModeText) }, intl_1.formatDate(item === null || item === void 0 ? void 0 : item.modified)))));
        };
        ItemBrowserPreview.prototype._renderMapA11y = function () {
            var _a = this.configPanelViewModel, expressEnabled = _a.expressEnabled, expressSection = _a.expressSection;
            if (expressEnabled && !expressSection) {
                return;
            }
            var configSettingJSON = this._getMapA11yDescObj();
            var mapSettings = this._renderMapSettings();
            return this.item ? (widget_1.tsx("div", { key: "ib-preview-map-a11y" },
                widget_1.tsx("hr", null),
                widget_1.tsx("span", { class: this.classes(CSS.mapA11yText, labelSettingMargin_1.marginClassNames.labelText) }, this.itemBrowserMessages.mapA11y),
                configSettingJSON
                    ? this.configPanelViewModel.configSettings.renderStringInput(configSettingJSON)
                    : null,
                mapSettings ? mapSettings : null)) : null;
        };
        ItemBrowserPreview.prototype._renderMapSettings = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var sectionContent = (_d = (_c = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.configParams) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.find(function (section) { return section.id === "map"; })) === null || _d === void 0 ? void 0 : _d.content;
            return sectionContent === null || sectionContent === void 0 ? void 0 : sectionContent.map(function (contentItem) {
                var mapSetting = _this.configPanelViewModel.allSettings.find(function (setting) { return setting.fieldName === contentItem.id; });
                return _this.configPanelViewModel.configSettings.processComponent(mapSetting);
            });
        };
        ItemBrowserPreview.prototype._getMapA11yDescObj = function () {
            var configSettings = this.get("configPanelViewModel.presetConfigSettings.configSettings");
            var fieldName = "mapA11yDesc";
            var setting = configSettings === null || configSettings === void 0 ? void 0 : configSettings[fieldName];
            return tslib_1.__assign(tslib_1.__assign({}, setting), { fieldName: fieldName });
        };
        ItemBrowserPreview.prototype._handleConditions = function () {
            var _this = this;
            this._conditions.forEach(function (condition) {
                switch (condition) {
                    case "attachments":
                        _this.viewModel.handleAttachmentsCondition();
                        return;
                    case "renderer":
                        _this.viewModel.handleUnsupportedRenderers();
                        return;
                    case "popupDisabled":
                        _this.viewModel.handlePopupDisabled();
                        return;
                    case "imagery":
                        _this.viewModel.handleImageryCondition();
                        return;
                    case "charts":
                        _this.viewModel.handleChartsCondition();
                        return;
                    case "supportsOrderBy":
                        _this.viewModel.handleSupportsOrderByCondition();
                        return;
                }
            });
        };
        ItemBrowserPreview.prototype._handleItemTypes = function () {
            var _this = this;
            if (this._itemTypes.length === 2 &&
                this._itemTypes.includes("2d") &&
                this._itemTypes.includes("3d")) {
                this.configPanelViewModel.allowedItemTypes = ["Web Map", "Web Scene"];
                return;
            }
            this._itemTypes.forEach(function (type) {
                switch (type) {
                    case "3d":
                        _this.configPanelViewModel.allowedItemTypes = ["Web Scene"];
                        return;
                    default:
                        _this.configPanelViewModel.allowedItemTypes = ["Web Map"];
                }
            });
        };
        ItemBrowserPreview.prototype._openItemBrowser = function () {
            var _a;
            (_a = this.itemBrowser) === null || _a === void 0 ? void 0 : _a.open();
            var interval = setInterval(function () {
                var headingNode = document.getElementById("ib__big-header-title");
                if (headingNode) {
                    headingNode.tabIndex = -1;
                    headingNode.focus();
                }
                if (document.activeElement === headingNode) {
                    clearInterval(interval);
                    return;
                }
            }, 0);
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], ItemBrowserPreview.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowserPreview.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowserPreview.prototype, "itemBrowser", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowserPreview.prototype, "item", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowserPreview.prototype, "itemDescription", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemBrowserMessages"),
            widget_1.messageBundle("dist/assets/t9n/widgets/ItemBrowser/resources")
        ], ItemBrowserPreview.prototype, "itemBrowserMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ItemBrowserPreviewViewModel
            })
        ], ItemBrowserPreview.prototype, "viewModel", void 0);
        ItemBrowserPreview = tslib_1.__decorate([
            decorators_1.subclass("ItemBrowserPreview")
        ], ItemBrowserPreview);
        return ItemBrowserPreview;
    }(Widget_1.default));
    return ItemBrowserPreview;
});
