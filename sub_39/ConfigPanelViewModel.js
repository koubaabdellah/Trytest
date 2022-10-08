define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/Collection", "esri/core/Handles", "esri/core/watchUtils", "../../../widgets/Portal/Portal", "esri/portal/PortalItem", "../../../widgets/GlobalNav/GlobalNav", "../../../widgets/Badge/Badge", "../../sections/Common", "../../sections/Map", "../../sections/About", "../../sections/Theme", "../../sections/Interactivity", "../../sections/Custom/Custom", "../../../widgets/Alert/Alert", "../../../widgets/Modal/Modal", "../../../widgets/Tips/TipItem", "../../express/Express", "../../../utils/utils", "../../../utils/telemetryUtils", "esri/WebMap", "esri/WebScene", "../../../utils/flattenUtils", "../../../widgets/ConfigSettings/ConfigSettings", "../../../widgets/ConfigSettings/PresetConfigSettings", "../../../widgets/Share/ShareLevel", "./support/PseudoView", "./assets", "../../settings/FlowSettingsUI", "../../../widgets/Help/Help"], function (require, exports, tslib_1, Accessor, decorators_1, Collection, Handles, watchUtils_1, Portal, PortalItem, GlobalNav, Badge, Common, MapSection, About, Theme, Interactivity, Custom, Alert, Modal, TipItem, Express, utils_1, telemetryUtils_1, WebMap, WebScene, flattenUtils_1, ConfigSettings, PresetConfigSettings, ShareLevel, PseudoView, assets_1, FlowSettingsUI, Help) {
    "use strict";
    var SECTION_COLLECTION = Collection.ofType(Common);
    var ConfigPanelViewModel = (function (_super) {
        tslib_1.__extends(ConfigPanelViewModel, _super);
        function ConfigPanelViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._awaitingDraft = false;
            _this._handles = new Handles();
            _this._publishing = false;
            _this._discardingDraft = false;
            _this._switchingConfigMode = false;
            _this._initialConfigParams = null;
            _this._sessionConfigModeSwitchingCount = 0;
            _this.allSettings = new Collection();
            _this.alert = new Alert({
                configPanelViewModel: _this
            });
            _this.actionToolTips = {};
            _this.appConfig = null;
            _this.appid = null;
            _this.appPreviewFrame = null;
            _this.configPanelMessages = null;
            _this.expressMessages = null;
            _this.badge = new Badge({
                container: document.createElement("div"),
                configPanelViewModel: _this
            });
            _this.configSettings = new ConfigSettings();
            _this.configParams = null;
            _this.currentSectionIndex = 0;
            _this.currentTipID = null;
            _this.darkModeEnabled = false;
            _this.draft = {};
            _this.error = null;
            _this.expressEnabled = null;
            _this.expressFooter = null;
            _this.expressPublishButton = null;
            _this.expressSection = null;
            _this.expressSwitch = null;
            _this.modal = new Modal({
                configPanelViewModel: _this
            });
            _this.headerPopoverButton = null;
            _this.expressHeaderPopoverButton = null;
            _this.ariaLiveNode = null;
            _this.proxyNode = null;
            _this.presetConfigSettings = new PresetConfigSettings();
            _this.portal = null;
            _this.mapPortalItem = null;
            _this.proxyServices = [];
            _this.sections = new Collection([
                new MapSection({
                    configPanelViewModel: _this,
                    darkModeEnabled: _this.darkModeEnabled
                }),
                new About({
                    configPanelViewModel: _this,
                    darkModeEnabled: _this.darkModeEnabled
                }),
                new Interactivity({
                    configPanelViewModel: _this,
                    darkModeEnabled: _this.darkModeEnabled
                }),
                new Theme({
                    configPanelViewModel: _this,
                    darkModeEnabled: _this.darkModeEnabled
                })
            ]);
            _this.custom = new Custom();
            _this.subsectionId = null;
            _this.telemetry = null;
            _this.templateAppItem = null;
            _this.templateAppData = null;
            _this.sanitizer = null;
            _this.searchSettings = null;
            _this.tipsMap = new Map();
            _this.expressSettingsMap = null;
            _this.express = new Express();
            _this.selectedMapId = null;
            _this.selectedGroupId = null;
            _this.map = null;
            _this.defaultValues = {};
            _this.allowedItemTypes = null;
            _this.isLoadingMap = false;
            _this.viewMode = "desktop";
            _this.popoverMap = {};
            _this.calcitePopoverManagerMap = {};
            _this.popoverContentMap = {};
            _this.pseudoView = new PseudoView();
            _this.shareLevel = new ShareLevel();
            _this.shareLevelUpdated = false;
            _this.groupBrowser = null;
            _this.flowSettingsUI = new FlowSettingsUI({
                configPanelViewModel: _this
            });
            _this.help = new Help({ configPanelViewModel: _this });
            _this.helpIsOpen = false;
            return _this;
        }
        Object.defineProperty(ConfigPanelViewModel.prototype, "state", {
            get: function () {
                return this._switchingConfigMode
                    ? "switching"
                    : this._awaitingDraft
                        ? "drafting"
                        : this._discardingDraft
                            ? "discardingDraft"
                            : this._publishing
                                ? "publishing"
                                : "ready";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ConfigPanelViewModel.prototype, "portalState", {
            get: function () {
                var _a = this, appConfig = _a.appConfig, templateAppData = _a.templateAppData, templateAppItem = _a.templateAppItem, user = _a.portal;
                return user && appConfig && templateAppItem && templateAppData
                    ? "ready"
                    : "loading";
            },
            enumerable: false,
            configurable: true
        });
        ConfigPanelViewModel.prototype.initialize = function () {
            var _this = this;
            this.configSettings.configPanelViewModel = this;
            var portalKey = "portal-key";
            this._handles.add(watchUtils_1.whenOnce(this, "portal", function () {
                _this._handles.remove(portalKey);
                _this._initConfigParamData();
            }), portalKey);
            this._handles.add([
                watchUtils_1.whenOnce(this, "templateAppData", function () {
                    _this.badge.templateAppData = _this.templateAppData;
                    watchUtils_1.whenOnce(_this, "appPreviewFrame", function () {
                        _this.appPreviewFrame.onload = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var templateAppDataProps, dataKeys, newValues, dataToWrite;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        templateAppDataProps = Object.keys(this.templateAppData.values);
                                        dataKeys = templateAppDataProps.filter(function (key) {
                                            return key !== "draft" && key !== "fullAppSettings" && key !== "webmap";
                                        });
                                        if (!(dataKeys.length === 0)) return [3, 2];
                                        newValues = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this.templateAppData.values), this.defaultValues), { "title": (_a = this === null || this === void 0 ? void 0 : this.templateAppItem) === null || _a === void 0 ? void 0 : _a.title });
                                        dataToWrite = tslib_1.__assign(tslib_1.__assign({}, this.templateAppData), { values: newValues });
                                        return [4, this.writeToPortalItem(dataToWrite)];
                                    case 1:
                                        _b.sent();
                                        this.writeToSessionStorage(tslib_1.__assign({}, newValues));
                                        this.postMessageDraftToIframe(tslib_1.__assign({}, newValues));
                                        _b.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); };
                    });
                }),
                watchUtils_1.watch(this, "templateAppData", function () {
                    if (_this.badge) {
                        _this.badge.templateAppData = _this.templateAppData;
                    }
                }),
                watchUtils_1.watch(this, "selectedMapId", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var map, portalItem, dataToWrite;
                    var _a, _b;
                    return tslib_1.__generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!this.selectedMapId) {
                                    this.set("map", null);
                                    return [2];
                                }
                                return [4, new PortalItem({
                                        id: this.selectedMapId,
                                        portal: this.portal
                                    }).load()];
                            case 1:
                                portalItem = _c.sent();
                                this.mapPortalItem = portalItem;
                                if ((portalItem === null || portalItem === void 0 ? void 0 : portalItem.type) === "Web Map" && ((_a = this.draft) === null || _a === void 0 ? void 0 : _a.webscene)) {
                                    delete this.draft.webscene;
                                }
                                else if ((portalItem === null || portalItem === void 0 ? void 0 : portalItem.type) === "Web Scene" && ((_b = this.draft) === null || _b === void 0 ? void 0 : _b.webmap)) {
                                    delete this.draft.webmap;
                                }
                                dataToWrite = this.draft && Object.keys(this.draft).length > 0
                                    ? tslib_1.__assign(tslib_1.__assign({}, this.templateAppData), { values: tslib_1.__assign(tslib_1.__assign({}, this.templateAppData.values), { draft: tslib_1.__assign(tslib_1.__assign({}, this.draft), { type: (portalItem === null || portalItem === void 0 ? void 0 : portalItem.type) === "Web Map"
                                                    ? "webmap"
                                                    : (portalItem === null || portalItem === void 0 ? void 0 : portalItem.type) === "Web Scene"
                                                        ? "webscene"
                                                        : null, lastSavedDraftDate: new Date().getTime() }) }) }) : tslib_1.__assign(tslib_1.__assign({}, this.templateAppData), { values: tslib_1.__assign({}, this.templateAppData.values) });
                                if (!((portalItem === null || portalItem === void 0 ? void 0 : portalItem.type) === "Web Scene")) return [3, 3];
                                return [4, this.writeToPortalItem(tslib_1.__assign(tslib_1.__assign({}, dataToWrite), { values: tslib_1.__assign({}, dataToWrite.values) }))];
                            case 2:
                                _c.sent();
                                map = new WebScene({
                                    portalItem: portalItem
                                });
                                return [3, 6];
                            case 3:
                                if (!this.selectedMapId) return [3, 5];
                                return [4, this.writeToPortalItem(tslib_1.__assign(tslib_1.__assign({}, dataToWrite), { values: tslib_1.__assign({}, dataToWrite.values) }))];
                            case 4:
                                _c.sent();
                                _c.label = 5;
                            case 5:
                                map = new WebMap({
                                    portalItem: portalItem
                                });
                                _c.label = 6;
                            case 6:
                                this.set("map", map);
                                return [2];
                        }
                    });
                }); }),
                watchUtils_1.watch(this, "selectedGroupId", function () {
                    _this._reloadAppPreview();
                }),
                watchUtils_1.whenDefinedOnce(this, "templateAppItem.url", function () {
                    var url = new URL(_this.templateAppItem.url).pathname;
                    _this.presetConfigSettings.appTemplateItemUrl = url;
                })
            ]);
        };
        ConfigPanelViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
            this.configParams = null;
        };
        ConfigPanelViewModel.prototype.handleDraftData = function (fieldName, value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var props, dataToWrite;
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            props = (_a = {},
                                _a[fieldName] = value,
                                _a);
                            if (fieldName === "webscene") {
                                this.updateDraft(tslib_1.__assign(tslib_1.__assign({}, props), { type: "webscene" }), "webmap");
                            }
                            else if (fieldName === "webmap") {
                                this.updateDraft(tslib_1.__assign(tslib_1.__assign({}, props), { type: "webmap" }), "webscene");
                            }
                            else {
                                this.updateDraft(props);
                            }
                            dataToWrite = tslib_1.__assign(tslib_1.__assign({}, this.templateAppData), { values: tslib_1.__assign(tslib_1.__assign({}, this.templateAppData.values), { draft: tslib_1.__assign(tslib_1.__assign({}, this.draft), { lastSavedDraftDate: new Date().getTime() }) }) });
                            this.writeToSessionStorage(dataToWrite.values);
                            this.postMessageDraftToIframe(props);
                            return [4, this.writeToPortalItem(dataToWrite)];
                        case 1:
                            _b.sent();
                            return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype.handleDraftDataBatch = function (objToUpdateDraft) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataToWrite;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.updateDraft(objToUpdateDraft);
                            dataToWrite = tslib_1.__assign(tslib_1.__assign({}, this.templateAppData), { values: tslib_1.__assign(tslib_1.__assign({}, this.templateAppData.values), { draft: tslib_1.__assign(tslib_1.__assign({}, this.draft), { lastSavedDraftDate: new Date().getTime() }) }) });
                            this.writeToSessionStorage(dataToWrite.values);
                            this.postMessageDraftToIframe(objToUpdateDraft);
                            return [4, this.writeToPortalItem(dataToWrite)];
                        case 1:
                            _a.sent();
                            return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype.postMessageDraftToIframe = function (propToWrite) {
            var _a, _b;
            var isLocal = this.appConfig.localEnv.isLocal;
            var targetOrigin = isLocal ? "*" : this.getAppUrl();
            (_b = (_a = this.appPreviewFrame) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(tslib_1.__assign({ type: "cats-app" }, propToWrite), targetOrigin);
        };
        ConfigPanelViewModel.prototype.updateDraft = function (props, keyToRemove) {
            var _a, _b;
            var draft = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (_b = (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.draft), this.draft), props);
            if (keyToRemove && draft[keyToRemove]) {
                delete draft[keyToRemove];
            }
            this.set("draft", draft);
        };
        ConfigPanelViewModel.prototype.writeToSessionStorage = function (dataToWrite) {
            var appid = this.appid;
            var lsItemId = appid
                ? "application_base_config_" + appid
                : "application_base_config";
            window.sessionStorage.removeItem(lsItemId);
            window.sessionStorage.setItem(lsItemId, JSON.stringify(dataToWrite));
        };
        ConfigPanelViewModel.prototype.getAppUrl = function () {
            var _a = this.appConfig.localEnv, appPreviewUrl = _a.appPreviewUrl, isLocal = _a.isLocal;
            if (isLocal && appPreviewUrl) {
                return appPreviewUrl;
            }
            var url = this.templateAppItem.url;
            if ((url === null || url === void 0 ? void 0 : url.indexOf("http://")) !== -1) {
                return url.replace("http://", "https://");
            }
            else {
                return url;
            }
        };
        ConfigPanelViewModel.prototype.getMapId = function () {
            var _a, _b;
            var templateAppData = this.templateAppData;
            var values = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values;
            var type = ((_a = values === null || values === void 0 ? void 0 : values.draft) === null || _a === void 0 ? void 0 : _a.type) ? values.draft.type
                : values.type || "webmap";
            var draftMapId = (_b = values === null || values === void 0 ? void 0 : values.draft) === null || _b === void 0 ? void 0 : _b[type];
            var publishMapId = values === null || values === void 0 ? void 0 : values[type];
            return draftMapId ? draftMapId : publishMapId;
        };
        ConfigPanelViewModel.prototype.writeToPortalItem = function (data) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var templateAppData;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this._awaitingDraft = true;
                            this.notifyChange("state");
                            return [4, this.templateAppItem.update({
                                    data: data
                                })];
                        case 1:
                            _b.sent();
                            return [4, ((_a = this.templateAppItem) === null || _a === void 0 ? void 0 : _a.fetchData())];
                        case 2:
                            templateAppData = _b.sent();
                            this.set("templateAppData", templateAppData);
                            this.badge.templateAppData = this.templateAppData;
                            this._awaitingDraft = false;
                            this.notifyChange("state");
                            return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype.publish = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var isFullSetup, data, _m, resourceToRemove, appid, lsItemId;
                return tslib_1.__generator(this, function (_o) {
                    switch (_o.label) {
                        case 0:
                            this._publishing = true;
                            this.notifyChange("state");
                            telemetryUtils_1.logConfigPanelPublish(this.telemetry, this.expressEnabled, this.appid, this.appTemplateItem.url);
                            isFullSetup = this.templateAppData.values.fullAppSettings
                                ? true
                                : false;
                            data = tslib_1.__assign(tslib_1.__assign({}, this.templateAppData), { values: tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values), (_c = (_b = this.templateAppData) === null || _b === void 0 ? void 0 : _b.values) === null || _c === void 0 ? void 0 : _c.draft), { datePublished: new Date().getTime(), fullAppSettings: isFullSetup }) });
                            if (((_d = data === null || data === void 0 ? void 0 : data.values) === null || _d === void 0 ? void 0 : _d.type) === "webscene" && ((_e = data === null || data === void 0 ? void 0 : data.values) === null || _e === void 0 ? void 0 : _e.hasOwnProperty("webmap"))) {
                                delete data.values.webmap;
                            }
                            else if (((_f = data === null || data === void 0 ? void 0 : data.values) === null || _f === void 0 ? void 0 : _f.type) === "webmap" && ((_g = data === null || data === void 0 ? void 0 : data.values) === null || _g === void 0 ? void 0 : _g.hasOwnProperty("webscene"))) {
                                delete data.values.webscene;
                            }
                            if ((_h = data === null || data === void 0 ? void 0 : data.values) === null || _h === void 0 ? void 0 : _h.draft) {
                                delete data.values.draft;
                            }
                            if ((_j = data === null || data === void 0 ? void 0 : data.values) === null || _j === void 0 ? void 0 : _j.lastSavedDraftDate) {
                                (_k = data === null || data === void 0 ? void 0 : data.values) === null || _k === void 0 ? true : delete _k.lastSavedDraftDate;
                            }
                            return [4, this.templateAppItem.update({ data: data })];
                        case 1:
                            _o.sent();
                            _m = this;
                            return [4, ((_l = this.templateAppItem) === null || _l === void 0 ? void 0 : _l.fetchData())];
                        case 2:
                            _m.templateAppData = _o.sent();
                            return [4, this._getResourceRemovePromises()];
                        case 3:
                            resourceToRemove = _o.sent();
                            return [4, Promise.all(resourceToRemove)];
                        case 4:
                            _o.sent();
                            this._publishing = false;
                            appid = this.appid;
                            lsItemId = appid
                                ? "application_base_config_" + appid
                                : "application_base_config";
                            window.sessionStorage.removeItem(lsItemId);
                            this.notifyChange("state");
                            return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype._getResourceRemovePromises = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var portalItemResourceResult, resourceResultItems, configPanelResources, flattendAppData, resourceUrlPaths, key, url, resourcesToRemove;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.templateAppItem.fetchResources()];
                        case 1:
                            portalItemResourceResult = _a.sent();
                            resourceResultItems = portalItemResourceResult.resources;
                            configPanelResources = resourceResultItems.filter(function (resourceResultItem) {
                                return resourceResultItem.resource.path.indexOf("instantAppsConfigPanel");
                            });
                            flattendAppData = flattenUtils_1.flatten(this.templateAppData);
                            resourceUrlPaths = [];
                            for (key in flattendAppData) {
                                if (typeof flattendAppData[key] === "string" &&
                                    flattendAppData[key].indexOf("instantAppsConfigPanel") !== -1) {
                                    try {
                                        url = new URL(flattendAppData[key]);
                                        resourceUrlPaths.push(url.pathname);
                                    }
                                    catch (_b) { }
                                }
                            }
                            resourcesToRemove = configPanelResources.filter(function (configPanelResource) {
                                var url = configPanelResource.resource.url;
                                var resourcePathname = new URL(url).pathname;
                                return resourceUrlPaths.indexOf(resourcePathname) === -1 ? true : false;
                            });
                            return [2, resourcesToRemove.map(function (resourceToRemove) {
                                    return _this.templateAppItem.removeResource(resourceToRemove.resource);
                                })];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype.createGlobalNav = function (appTemplateName, appIsDisabled) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var portalStateKey, globalNavUtil_1;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    portalStateKey = "portal-state-key";
                    if (appIsDisabled) {
                        globalNavUtil_1 = new GlobalNav({
                            appConfig: this.appConfig,
                            portal: this.portal,
                            item: this.templateAppItem
                        });
                        watchUtils_1.whenOnce(globalNavUtil_1, "globalNavMessages", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                watchUtils_1.whenOnce(globalNavUtil_1, "mapMessages", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, globalNavUtil_1.createHeader(appTemplateName)];
                                            case 1:
                                                _a.sent();
                                                return [2];
                                        }
                                    });
                                }); });
                                return [2];
                            });
                        }); });
                    }
                    else {
                        this._handles.add(watchUtils_1.whenEqualOnce(this, "portalState", "ready", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var globalNavUtil;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                this._handles.remove(portalStateKey);
                                globalNavUtil = new GlobalNav({
                                    appConfig: this.appConfig,
                                    portal: this.portal,
                                    item: this.templateAppItem
                                });
                                watchUtils_1.whenOnce(globalNavUtil, "globalNavMessages", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        watchUtils_1.whenOnce(globalNavUtil, "mapMessages", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var esriHeader;
                                            var _a;
                                            return tslib_1.__generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4, globalNavUtil.createHeader(appTemplateName)];
                                                    case 1:
                                                        _b.sent();
                                                        esriHeader = window.esriHeader.node.querySelector(".esri-header-brand-text");
                                                        esriHeader.title = (_a = this.templateAppItem) === null || _a === void 0 ? void 0 : _a.title;
                                                        this._removeAppLoader();
                                                        return [2];
                                                }
                                            });
                                        }); });
                                        return [2];
                                    });
                                }); });
                                return [2];
                            });
                        }); }), portalStateKey);
                    }
                    return [2];
                });
            });
        };
        ConfigPanelViewModel.prototype.queryPortalItems = function (appid) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var queryParams, portalResults;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParams = {
                                query: "id:" + appid,
                                disableExtraQuery: true
                            };
                            return [4, this.portal.queryItems(queryParams)];
                        case 1:
                            portalResults = _a.sent();
                            return [2, portalResults.results[0]];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype.switchConfigMode = function (initiator) {
            var _a, _b, _c;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var isFullSetup, data, templateAppData, expressEnabled;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            this._sessionConfigModeSwitchingCount += 1;
                            isFullSetup = this.templateAppData.values.fullAppSettings
                                ? true
                                : false;
                            telemetryUtils_1.logSwitchConfigModeInfo(this.telemetry, initiator, this.appTemplateItem.url, !isFullSetup ? "Full Setup" : "Express Setup", this._sessionConfigModeSwitchingCount);
                            data = tslib_1.__assign(tslib_1.__assign({}, this.templateAppData), { values: tslib_1.__assign(tslib_1.__assign({}, (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values), { fullAppSettings: !isFullSetup }) });
                            this._switchingConfigMode = true;
                            this.notifyChange("state");
                            return [4, this.templateAppItem.update({ data: data })];
                        case 1:
                            _d.sent();
                            return [4, ((_b = this.templateAppItem) === null || _b === void 0 ? void 0 : _b.fetchData())];
                        case 2:
                            templateAppData = _d.sent();
                            this.set("templateAppData", templateAppData);
                            expressEnabled = ((_c = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values) === null || _c === void 0 ? void 0 : _c.fullAppSettings) ? false
                                : true;
                            this.expressEnabled = expressEnabled;
                            this._switchingConfigMode = false;
                            this.notifyChange("state");
                            return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype.goToItemPage = function () {
            var baseUrl = utils_1.getBaseUrl(this.portal);
            var itemUrl = baseUrl + "/home/item.html?id=" + this.appid;
            window.location.href = itemUrl;
        };
        ConfigPanelViewModel.prototype.buildSectionsUI = function () {
            var configParamsKeys = this.configParams.config.map(function (section) { return section.id; });
            var uiSections = utils_1.getUISections(configParamsKeys, this.sections, this);
            this.sections.removeAll();
            this.sections.addMany(uiSections);
        };
        ConfigPanelViewModel.prototype.getConfigParamsSection = function () {
            var _a = this, configParams = _a.configParams, currentSectionIndex = _a.currentSectionIndex, sections = _a.sections;
            var section = sections.getItemAt(currentSectionIndex);
            var type = section.type;
            return configParams[type];
        };
        ConfigPanelViewModel.prototype.setGenericModalDOM = function (dom) {
            this.set("genericModalDOM", dom);
        };
        ConfigPanelViewModel.prototype.getPresetConfigSetting = function (fieldName) {
            return this.presetConfigSettings.configSettings[fieldName];
        };
        ConfigPanelViewModel.prototype.getConfigParamsWithRequiredField = function (fieldName, requiredField) {
            if (this.configParams == null ||
                fieldName == null ||
                requiredField == null) {
                return null;
            }
            return this._getConfigParamWithDefault(fieldName, requiredField, this.configParams);
        };
        ConfigPanelViewModel.prototype._getConfigParamWithDefault = function (fieldName, requiredField, configParamsSection) {
            var _this = this;
            if (configParamsSection == null) {
                return null;
            }
            var res = Object.entries(configParamsSection)
                .map(function (pair) {
                var key = pair[0], value = pair[1];
                if (typeof value !== "object") {
                    return null;
                }
                if (key === fieldName && (value === null || value === void 0 ? void 0 : value[requiredField]) != null) {
                    return value;
                }
                else {
                    return _this._getConfigParamWithDefault(fieldName, requiredField, value);
                }
            })
                .filter(function (entry) { return entry != null; });
            if (res.length === 0) {
                return null;
            }
            else if (res.length === 1) {
                return res[0];
            }
            else {
                console.error("More than one result found");
                return null;
            }
        };
        ConfigPanelViewModel.prototype.triggerDraftDiscard = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var templateAppDataWithoutDraft, selectedMapId, conditionalSettingKeys, interactivity;
                var _this = this;
                return tslib_1.__generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            this._discardingDraft = true;
                            this.notifyChange("state");
                            templateAppDataWithoutDraft = this.discardDraft(this.templateAppData);
                            this.set("draft", null);
                            return [4, this._updateItem(templateAppDataWithoutDraft)];
                        case 1:
                            _j.sent();
                            selectedMapId = ((_b = (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b["webmap"]) ? (_d = (_c = this.templateAppData) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d["webmap"] : ((_f = (_e = this.templateAppData) === null || _e === void 0 ? void 0 : _e.values) === null || _f === void 0 ? void 0 : _f["webscene"]) ? (_h = (_g = this.templateAppData) === null || _g === void 0 ? void 0 : _g.values) === null || _h === void 0 ? void 0 : _h["webscene"] : null;
                            this.selectedMapId = selectedMapId;
                            this.set("configSettings.configSettingsMap.configSettingsJSONMap", null);
                            this.set("configPanelViewModel.expressSettingsMap", null);
                            conditionalSettingKeys = Object.keys(this.presetConfigSettings.configSettings);
                            conditionalSettingKeys.forEach(function (conditionalSetting) {
                                var conditionalConfigSetting = _this.presetConfigSettings.configSettings[conditionalSetting];
                                if (conditionalConfigSetting.type === "conditional") {
                                    conditionalConfigSetting.options = [];
                                }
                            });
                            this.configSettings.configSettingsMap.buildSettingsPanel();
                            this._reloadAppPreview();
                            interactivity = this.sections.find(function (section) { return section.type === "interactivity"; });
                            if (interactivity) {
                                interactivity.viewModel.resetSearchConfig();
                            }
                            if (this.expressEnabled && this.expressSection) {
                                this.expressSection = null;
                            }
                            this._discardingDraft = false;
                            this.notifyChange("state");
                            return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype.discardDraft = function (templateAppData) {
            var _a;
            (_a = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values) === null || _a === void 0 ? true : delete _a.draft;
            return templateAppData;
        };
        ConfigPanelViewModel.prototype._updateItem = function (templateAppData) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var isFullSetup, data, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            isFullSetup = this.templateAppData.values.fullAppSettings
                                ? true
                                : false;
                            data = tslib_1.__assign(tslib_1.__assign({}, templateAppData), { values: tslib_1.__assign(tslib_1.__assign({}, templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values), { fullAppSettings: isFullSetup }) });
                            return [4, this.templateAppItem.update({ data: data })];
                        case 1:
                            _c.sent();
                            _b = this;
                            return [4, ((_a = this.templateAppItem) === null || _a === void 0 ? void 0 : _a.fetchData())];
                        case 2:
                            _b.templateAppData = _c.sent();
                            return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype._initConfigParamData = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, isLocal, appid, appidValue, href, url, searchParams;
                return tslib_1.__generator(this, function (_b) {
                    _a = this.appConfig.localEnv, isLocal = _a.isLocal, appid = _a.appid;
                    appidValue = null;
                    if (isLocal && appid) {
                        appidValue = appid;
                    }
                    else {
                        href = window.location.href;
                        url = new URL(href);
                        searchParams = url.searchParams;
                        appidValue = searchParams.get("appid");
                    }
                    this.set("appid", appidValue);
                    this._handlePortalResponse(appidValue);
                    return [2];
                });
            });
        };
        ConfigPanelViewModel.prototype._handlePortalResponse = function (appid) {
            var _a, _b, _c, _d, _e, _f, _g;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var templateAppItem, _h, draft, source, _j, url;
                return tslib_1.__generator(this, function (_k) {
                    switch (_k.label) {
                        case 0: return [4, this.queryPortalItems(appid)];
                        case 1:
                            templateAppItem = (_k.sent());
                            this._checkAppAuthorization(templateAppItem);
                            this.set("templateAppItem", templateAppItem);
                            _h = this;
                            return [4, (templateAppItem === null || templateAppItem === void 0 ? void 0 : templateAppItem.fetchData())];
                        case 2:
                            _h.templateAppData = _k.sent();
                            this.expressEnabled = !((_b = (_a = this.templateAppData) === null || _a === void 0 ? void 0 : _a.values) === null || _b === void 0 ? void 0 : _b.fullAppSettings);
                            if ((_d = (_c = this.templateAppData) === null || _c === void 0 ? void 0 : _c.values) === null || _d === void 0 ? void 0 : _d.draft) {
                                draft = tslib_1.__assign(tslib_1.__assign({}, this.draft), (_f = (_e = this.templateAppData) === null || _e === void 0 ? void 0 : _e.values) === null || _f === void 0 ? void 0 : _f.draft);
                                this.set("draft", draft);
                            }
                            source = (_g = this.templateAppData) === null || _g === void 0 ? void 0 : _g.source;
                            if (!source) return [3, 4];
                            _j = this;
                            return [4, this.queryPortalItems(source)];
                        case 3:
                            _j.appTemplateItem = (_k.sent());
                            url = this.appTemplateItem.url;
                            this._setTemplateAppName(url);
                            this._initialConfigParams = this._getConfigParams(url);
                            this.set("configParams", tslib_1.__assign({}, this._initialConfigParams));
                            this._initConfigPanelUIBuild();
                            _k.label = 4;
                        case 4: return [2];
                    }
                });
            });
        };
        ConfigPanelViewModel.prototype._getConfigParams = function (templateUrl) {
            var configJSON = assets_1.instantAppsMap[templateUrl].config;
            return JSON.parse(configJSON);
        };
        ConfigPanelViewModel.prototype._setTemplateAppName = function (templateUrl) {
            var _this = this;
            var messagesHandlesKey = "messages-handles-key";
            this._handles.add(watchUtils_1.whenOnce(this, "configPanelMessages", function () {
                _this._handles.remove(messagesHandlesKey);
                var names = _this.configPanelMessages.instantApps.names;
                var name = assets_1.instantAppsMap[templateUrl].name;
                _this.appTemplateName = names[name];
            }), messagesHandlesKey);
        };
        ConfigPanelViewModel.prototype._initConfigPanelUIBuild = function () {
            var _this = this;
            var _startBuild = function () {
                watchUtils_1.whenOnce(_this, "presetConfigSettings.configSettings", function () {
                    watchUtils_1.whenOnce(_this, "presetConfigSettings.subsections", function () {
                        _this.buildSectionsUI();
                        _this.configSettings.configSettingsMap.buildSettingsPanel();
                    });
                });
            };
            watchUtils_1.whenOnce(this, "templateAppData", function () {
                var _a, _b, _c, _d;
                var values = _this.templateAppData.values;
                var type = (values === null || values === void 0 ? void 0 : values.type) ? values.type
                    : (values === null || values === void 0 ? void 0 : values.hasOwnProperty("webscene")) || ((_a = values === null || values === void 0 ? void 0 : values.draft) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("webscene"))
                        ? "webscene"
                        : (values === null || values === void 0 ? void 0 : values.hasOwnProperty("group")) || ((_b = values === null || values === void 0 ? void 0 : values.draft) === null || _b === void 0 ? void 0 : _b.hasOwnProperty("group"))
                            ? "group"
                            : "webmap";
                var id = ((_c = values.draft) === null || _c === void 0 ? void 0 : _c[type]) ? (_d = values.draft) === null || _d === void 0 ? void 0 : _d[type] : values[type];
                var configHasMapSection = Object.keys(_this.configParams).indexOf("map") !== -1;
                if (id && configHasMapSection) {
                    watchUtils_1.whenOnce(_this, "selectedMapId", function () {
                        _this.set("configParams", _this._initialConfigParams);
                        if (_this.configSettings.configSettingsJSONMap) {
                            _this.configSettings.configSettingsJSONMap = null;
                        }
                        if (_this.expressSettingsMap) {
                            _this.expressSettingsMap = null;
                        }
                        _startBuild();
                    });
                }
                else {
                    _startBuild();
                }
            });
        };
        ConfigPanelViewModel.prototype._checkAppAuthorization = function (templateAppItem) {
            var name = this.get("portal.name");
            var portalUserName = this.get("portal.user.username");
            var notAuthorizedMessage = "identity-manager:not-authorized";
            var isOrgAdmin = this.get("portal.user.isOrgAdmin");
            var isOrgPublisher = this.get("portal.user.role") === "org_publisher";
            var templateAppItemUrl = templateAppItem === null || templateAppItem === void 0 ? void 0 : templateAppItem.url;
            var portalBaseUrl = this.get("portal.baseUrl");
            var templateAppItemUrlObj = templateAppItemUrl
                ? new URL(templateAppItemUrl)
                : null;
            var portalBaseUrlObj = portalBaseUrl ? new URL(portalBaseUrl) : null;
            if (portalBaseUrl &&
                (templateAppItemUrlObj === null || templateAppItemUrlObj === void 0 ? void 0 : templateAppItemUrlObj.hostname) !== (portalBaseUrlObj === null || portalBaseUrlObj === void 0 ? void 0 : portalBaseUrlObj.hostname)) {
                this._redirectToItemPage(templateAppItem);
            }
            if (isOrgAdmin) {
                return;
            }
            if (isOrgPublisher) {
                return;
            }
            if (name === notAuthorizedMessage ||
                (templateAppItem === null || templateAppItem === void 0 ? void 0 : templateAppItem.owner) !== portalUserName) {
                this._redirectToItemPage(templateAppItem);
            }
        };
        ConfigPanelViewModel.prototype._redirectToItemPage = function (templateAppItem) {
            var urlFromDetails = this.get("portal.details.url");
            var portalUrl = urlFromDetails ? urlFromDetails : templateAppItem.url;
            var urlObj = new URL(portalUrl);
            window.location.href = urlObj.origin + "/home/item.html?id=" + this.appid;
        };
        ConfigPanelViewModel.prototype._reloadAppPreview = function () {
            var _a, _b;
            var src = (_a = this.appPreviewFrame) === null || _a === void 0 ? void 0 : _a.getAttribute("src");
            (_b = this.appPreviewFrame) === null || _b === void 0 ? void 0 : _b.setAttribute("src", src);
        };
        ConfigPanelViewModel.prototype._removeAppLoader = function () {
            var calciteLoader = document.getElementById("appLoader");
            calciteLoader.removeAttribute("active");
            document.body.classList.remove("loading");
        };
        ConfigPanelViewModel.prototype.closeCalciteActionTooltips = function () {
            var actionTooltipKeys = Object.keys(this.actionToolTips);
            actionTooltipKeys.forEach(function (actionTooltipKey) {
                var actionTooltip = document.querySelector(".calcite-action-" + actionTooltipKey);
                if (actionTooltip === null || actionTooltip === void 0 ? void 0 : actionTooltip.hasAttribute("open")) {
                    actionTooltip.removeAttribute("open");
                }
            });
        };
        ConfigPanelViewModel.prototype.handleCreateTooltip = function (id, fieldName, tip) {
            if (this.tipsMap.has(fieldName)) {
                return this.tipsMap.get(fieldName);
            }
            else {
                return new TipItem({
                    id: id,
                    fieldName: fieldName,
                    tip: tip,
                    configPanelViewModel: this
                });
            }
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ConfigPanelViewModel.prototype, "state", null);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true,
                dependsOn: [
                    "portal.user",
                    "appConfig",
                    "templateAppItem",
                    "templateAppData"
                ]
            })
        ], ConfigPanelViewModel.prototype, "portalState", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "allSettings", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "alert", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "actionToolTips", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "appConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "appid", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "appPreviewFrame", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "appTemplateItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "appTemplateName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "configPanelMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "badge", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "configSettings", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "configParams", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "currentSectionIndex", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "currentTipID", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "draft", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "error", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressFooter", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressPublishButton", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressSection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressSwitch", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "genericModalDOM", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "headerPopoverButton", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressHeaderPopoverButton", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "ariaLiveNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "proxyNode", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ConfigPanelViewModel.prototype, "presetConfigSettings", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: Portal
            })
        ], ConfigPanelViewModel.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "mapPortalItem", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: SECTION_COLLECTION
            })
        ], ConfigPanelViewModel.prototype, "sections", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "custom", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "subsectionId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "telemetry", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "templateAppItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "templateAppData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "sanitizer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "searchSettings", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "tipsMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "expressSettingsMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "express", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "selectedMapId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "selectedGroupId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "defaultValues", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "allowedItemTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "isLoadingMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "viewMode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "popoverMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "calcitePopoverManagerMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "popoverContentMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "pseudoView", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "shareLevel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "shareLevelUpdated", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "groupBrowser", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "flowSettingsUI", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "help", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanelViewModel.prototype, "helpIsOpen", void 0);
        ConfigPanelViewModel = tslib_1.__decorate([
            decorators_1.subclass("ConfigPanelViewModel")
        ], ConfigPanelViewModel);
        return ConfigPanelViewModel;
    }(Accessor));
    return ConfigPanelViewModel;
});
