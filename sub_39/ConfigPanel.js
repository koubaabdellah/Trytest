define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "../../widgets/Drawer/Drawer", "../../widgets/Publish/Publish", "../../widgets/Tips/Tips", "../../widgets/AppAlert/AppAlert", "./ConfigPanel/ConfigPanelViewModel", "../noAppAccess/NoAppAccess", "ResizeSensor", "../../icons/icons", "../../utils/focusUtils", "../../enums/keys", "../../widgets/SearchSettings/SearchSettings", "../../widgets/WebAnalytics/WebAnalytics", "esri/intl", "../../utils/configParamsUtils"], function (require, exports, tslib_1, Widget_1, widget_1, decorators_1, watchUtils_1, Drawer, Publish, Tips, AppAlert, ConfigPanelViewModel, NoAppAccess, ResizeSensor, icons_1, focusUtils_1, keys_1, SearchSettings, WebAnalytics, intl_1, configParamsUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-config-panel",
        primaryPanelContent: "esri-config-panel__primary-panel-content",
        primaryPanelFooter: "esri-config-panel__primary-panel-footer",
        calciteTabTitle: "esri-config-panel__calcite-tab-title",
        calciteTabTitleText: "esri-config-panel__calcite-tab-title-text",
        primaryPanelFooterButton: "esri-config-panel__primary-panel-footer-button",
        previewFrame: "esri-config-panel__preview-frame",
        loaderContainer: "esri-config-panel__loader-container",
        calciteLoader: "esri-config-panel__calcite-loader",
        publishButton: "esri-config-panel__publish-button",
        closeButton: "esri-config-panel__close-button",
        iframeContainer: "esri-config-panel__iframe-container",
        iframeMobile: "esri-config-panel__iframe--mobile",
        iframeLandscape: "esri-config-panel__iframe--landscape",
        bottomDrawerContainer: "esri-config-panel__bottom-drawer-container",
        bottomDrawerContainerExpanded: "esri-config-panel__bottom-drawer-container--expanded",
        welcome: "esri-config-panel__welcome",
        welcomeIcon: "esri-config-panel__welcome-icon",
        calcitePanel: "esri-config-panel__calcite-panel",
        proxy: "esri-config-panel__proxy",
        searchSettings: "esri-config-panel__search-settings",
        searchSettingsHide: "esri-config-panel__search-settings--hide",
        bottomPanelOverlay: "esri-config-panel__bottom-panel-overlay",
        footerButtonText: "esri-config-panel__footer-button-text",
        fullSetupBadge: "esri-config-panel__full-setup-badge",
        tipsContent: "esri-config-panel-tips__content",
        subsectionSettings: "esri-config-panel__settings-panel-container--subsection-settings",
        settingsPanelContainer: "esri-config-panel__settings-panel-container",
        expressToggleActionGroup: "esri-config-panel__express-toggle-action-group",
        expressToggleLabel: "esri-config-panel__express-toggle-label",
        expressToggleRTL: "esri-config-panel__express-toggle--rtl",
        publishContainer: "esri-config-panel__publish-container",
        webAnalyticsContainer: "esri-config-panel__web-analytics-container",
        express: "esri-config-panel__express",
        jsGlobalNav: "js-global-nav",
        globalNav: "global-nav",
        iframeContainerDark: "esri-config-panel__iframe-container--dark",
        mobileIconDark: "esri-config-panel__mobile-icon--dark",
        mobilePreviewDisableButtonDark: "esri-config-panel__mobile-preview-disable-button--dark",
        exitButtonDarkMode: "esri-config-panel__exit-button--dark-mode",
        publishButtonDarkMode: "esri-config-panel__publish-button--dark-mode",
        mobilePreviewContainer: "esri-config-panel__mobile-preview-container",
        mobilePreviewContainerEnabled: "esri-config-panel__mobile-preview-container--enabled",
        mobilePreviewDisableButton: "esri-config-panel__mobile-preview-disable-button",
        mobileNav: "esri-config-panel__mobile-nav",
        mobileNavButton: "esri-config-panel__mobile-nav-button",
        mobileNavPreviewEnabled: "esri-config-panel__mobile-nav--preview-enabled",
        appPreviewMobileContainer: "esri-config-panel__app-preview-container--mobile",
        appPreviewMobile: "esri-config-panel__app-preview--mobile",
        btnClear: "btn btn-clear",
        mirroredIcon: "esri-config-panel__icon--mirrored",
        theme: {
            light: "calcite-theme-light",
            dark: "calcite-theme-dark"
        },
        back: "esri-config-panel__back",
        backDark: "esri-config-panel__back--dark",
        backButton: "esri-config-panel__back-button",
        backButtonDark: "esri-config-panel__back-button--dark"
    };
    var MEDIA_QUERY_STRING = "(max-width: 767px)";
    var ConfigPanel = (function (_super) {
        tslib_1.__extends(ConfigPanel, _super);
        function ConfigPanel(params) {
            var _this = _super.call(this, params) || this;
            _this._drawer = new Drawer();
            _this._publishPanelIsOpen = false;
            _this._publishPanel = new Publish({
                open: _this._publishPanelIsOpen
            });
            _this._webAnalyticsPanelIsOpen = false;
            _this._webAnalyticsPanel = null;
            _this._tips = new Tips();
            _this._noAppAccess = null;
            _this._matchMedia = window.matchMedia(MEDIA_QUERY_STRING);
            _this._previewEnabled = false;
            _this._onboardingModal = null;
            _this._groupBrowserModal = null;
            _this._searchSettings = new SearchSettings();
            _this._searchSettingsIsOpen = false;
            _this._calciteShellPanel = null;
            _this._primaryPanelFooter = null;
            _this._publishButton = null;
            _this._expandTooltip = null;
            _this._calciteActionBarExpanded = null;
            _this._sectionHeaderTip = null;
            _this._appAlert = null;
            _this.ariaLiveNode = null;
            _this.sanitizer = null;
            _this.authorizedMessage = null;
            _this.appConfig = null;
            _this.appPreviewFrame = null;
            _this.calciteActionBar = null;
            _this.darkModeEnabled = null;
            _this.expressEnabled = null;
            _this.express = null;
            _this.expressSwitch = null;
            _this.modal = null;
            _this.portal = null;
            _this.proxyNode = null;
            _this.alert = null;
            _this.helpButton = null;
            _this.telemetry = null;
            _this.configPanelMessages = null;
            _this.expressMessages = null;
            _this.configSettingMessages = null;
            _this.shareMessages = null;
            _this.webAnalyticsMessages = null;
            _this.headerPopoverElement = null;
            _this.expressHeaderPopoverElement = null;
            _this.viewsPopoverManager = null;
            _this.shareLevel = null;
            _this.shareLevelAlert = null;
            _this.helpIsOpen = null;
            _this.viewModel = new ConfigPanelViewModel();
            return _this;
        }
        ConfigPanel.prototype.postInitialize = function () {
            var _this = this;
            this._matchMedia.addListener(function () { return _this.scheduleRender(); });
            document.addEventListener("calciteActionBarToggle", function () {
                return _this.scheduleRender();
            });
            this.own(this._getPropertyWatchHandles());
            this.own(watchUtils_1.when(this, "viewModel.portal", function () {
                var _a;
                var authorizedMessageName = (_a = _this.authorizedMessage) === null || _a === void 0 ? void 0 : _a.name;
                if (authorizedMessageName === "identity-manager:not-authorized" ||
                    authorizedMessageName === "identity-manager:not-authenticated" ||
                    authorizedMessageName === "error:does-not-exist-or-inaccessible") {
                    _this._noAppAccess = new NoAppAccess({
                        configPanelViewModel: _this.viewModel,
                        authorizedMessage: _this.authorizedMessage
                    });
                }
                _this._publishPanel.portal = _this.viewModel.portal;
                _this._tips.configPanelViewModel = _this.viewModel;
                _this.scheduleRender();
            }));
            this.own([
                watchUtils_1.whenOnce(this, "expressSwitch", function () {
                    _this.viewModel.modal.modal.addEventListener("calciteModalClose", function () {
                        if (_this.viewModel.state === "switching") {
                            return;
                        }
                        _this.expressSwitch.checked = _this.viewModel.expressEnabled;
                    });
                }),
                watchUtils_1.watch(this.express, "publishPanelIsOpen", this.scheduleRender),
                watchUtils_1.when(this, "viewModel", function () {
                    _this._tips.configPanelViewModel = _this.viewModel;
                    _this._searchSettings.configPanelViewModel = _this.viewModel;
                    _this.viewModel.searchSettings = _this._searchSettings;
                }),
                watchUtils_1.watch(this, "expressEnabled", function () {
                    _this.viewModel.actionToolTips = {};
                }),
                watchUtils_1.whenOnce(this, "viewModel.express", function () {
                    _this.viewModel.express.publishPanel = _this._publishPanel;
                }),
                watchUtils_1.whenTrueOnce(this, "viewModel.portal.eueiEnabled", function () {
                    _this._webAnalyticsPanel = new WebAnalytics({
                        open: _this._webAnalyticsPanelIsOpen,
                        configPanelViewModel: _this.viewModel
                    });
                    _this.own([
                        watchUtils_1.whenFalse(_this._webAnalyticsPanel, "open", function () {
                            _this._webAnalyticsPanelIsOpen = false;
                            _this.scheduleRender();
                        })
                    ]);
                    _this.scheduleRender();
                }),
                watchUtils_1.watch(this, "templateAppData", function () { return _this.scheduleRender(); }),
                watchUtils_1.watch(this.viewModel.pseudoView, "basemapBackgroundColor", function () {
                    return _this.scheduleRender();
                }),
                watchUtils_1.whenFalse(this._searchSettings, "open", function () {
                    _this._searchSettingsIsOpen = false;
                    _this.scheduleRender();
                }),
                watchUtils_1.whenTrue(this._searchSettings, "open", function () {
                    if (_this.helpIsOpen)
                        _this._resetHelpPanel();
                }),
                watchUtils_1.whenOnce(this, "calciteActionBar", function () {
                    _this.calciteActionBar.addEventListener("focusout", function (e) {
                        if (e.relatedTarget) {
                            var calcitePanel = _this._calciteShellPanel.querySelector(".esri-config-panel__calcite-panel");
                            if (e.relatedTarget === calcitePanel &&
                                e.target === _this.calciteActionBar) {
                                focusUtils_1.focusNode("discardDraftBtn");
                            }
                        }
                    });
                }),
                watchUtils_1.whenOnce(this, "headerPopoverElement", function () {
                    _this.headerPopoverElement.addEventListener("calcitePopoverOpen", function () {
                        if (!_this._sectionHeaderTip) {
                            _this._updateHeaderTip();
                        }
                    });
                }),
                watchUtils_1.whenOnce(this, "expressHeaderPopoverElement", function () {
                    _this.expressHeaderPopoverElement.addEventListener("calcitePopoverOpen", function () {
                        if (!_this._sectionHeaderTip) {
                            _this._updateHeaderTip();
                        }
                    });
                }),
                watchUtils_1.init(this, [
                    "express.expressSection",
                    "viewModel.currentSectionIndex",
                    "viewModel.subsectionId",
                    "viewModel.expressEnabled"
                ], function () { return _this._updateHeaderTip(); }),
                watchUtils_1.whenOnce(this, "viewModel", function () {
                    _this._appAlert = new AppAlert({
                        configPanelViewModel: _this.viewModel
                    });
                }),
                watchUtils_1.whenTrue(this, "viewModel.shareLevelUpdated", function () {
                    _this.shareLevelAlert.setAttribute("active", "");
                }),
                watchUtils_1.whenOnce(this, "shareLevelAlert", function () {
                    _this.shareLevelAlert.addEventListener("calciteAlertClose", function () {
                        _this.viewModel.shareLevelUpdated = false;
                    });
                }),
                watchUtils_1.watch(this, "viewModel.groupBrowser", function () {
                    var _a, _b;
                    _this._groupBrowserModal = (_b = (_a = _this === null || _this === void 0 ? void 0 : _this.viewModel) === null || _a === void 0 ? void 0 : _a.groupBrowser) === null || _b === void 0 ? void 0 : _b.renderModal();
                    _this.scheduleRender();
                }),
                watchUtils_1.watch(this, ["viewModel.currentSectionIndex", "viewModel.expressEnabled"], function () {
                    if (_this.helpIsOpen)
                        _this._resetHelpPanel();
                })
            ]);
            this.own(watchUtils_1.watch(this, "viewModel.flowSettingsUI.content", function () { return _this.scheduleRender; }));
        };
        ConfigPanel.prototype.render = function () {
            var _a;
            var _b, _c, _d, _e, _f, _g, _h;
            var _j = this, _matchMedia = _j._matchMedia, _previewEnabled = _j._previewEnabled;
            var matches = _matchMedia.matches;
            var _k = this.viewModel, templateAppData = _k.templateAppData, sections = _k.sections;
            var calciteLoader = !templateAppData ? this._renderCalciteLoader() : null;
            var calciteShell = this._renderCalciteShell();
            var map = sections === null || sections === void 0 ? void 0 : sections.find(function (section) { return section.type === "map"; });
            var itemBrowser = map === null || map === void 0 ? void 0 : map.renderItemBrowser();
            var mobilePreview = matches && _previewEnabled ? this._renderMobilePreview() : null;
            var publish = this._publishPanelIsOpen || this.express.publishPanelIsOpen
                ? this._renderPublishPanel()
                : null;
            var webAnalytics = this._webAnalyticsPanel && this._webAnalyticsPanelIsOpen
                ? this._renderWebAnalyticsPanel()
                : null;
            var showOverlay = (_a = {},
                _a[CSS.bottomPanelOverlay] = this._publishPanelIsOpen ||
                    this.express.publishPanelIsOpen ||
                    this._webAnalyticsPanelIsOpen,
                _a);
            var express = this.expressEnabled ? CSS.express : "";
            var shareLevel = this._renderShareLevel();
            return (widget_1.tsx("div", null, this._noAppAccess ? ((_b = this._noAppAccess) === null || _b === void 0 ? void 0 : _b.render()) : (widget_1.tsx("div", { bind: this, afterCreate: this._initResizeSensor, class: this.classes(CSS.base, express) }, (_d = (_c = this.viewModel) === null || _c === void 0 ? void 0 : _c.modal) === null || _d === void 0 ? void 0 :
                _d.render(), (_e = this._onboardingModal) === null || _e === void 0 ? void 0 :
                _e.render(),
                this._groupBrowserModal,
                itemBrowser, (_f = this.viewModel) === null || _f === void 0 ? void 0 :
                _f.genericModalDOM,
                calciteShell,
                widget_1.tsx("div", { key: "publish-overlay", class: this.classes(showOverlay) }),
                widget_1.tsx("div", { bind: this, class: CSS.proxy, "data-node-ref": "proxyNode", afterCreate: widget_1.storeNode }),
                publish,
                webAnalytics,
                shareLevel,
                mobilePreview,
                calciteLoader, (_g = this._tips) === null || _g === void 0 ? void 0 :
                _g.render(),
                !((_h = this.calciteActionBar) === null || _h === void 0 ? void 0 : _h.expanded)
                    ? this._renderCalciteActionToolTips()
                    : null,
                this._renderCalcitePopovers(),
                this._renderHelpPopovers(),
                widget_1.tsx("calcite-tooltip", { key: "expand-tooltip", bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_expandTooltip", "reference-element": "expand", class: CSS.theme.dark, "auto-close": "true" }, this.configPanelMessages.expand),
                this.viewModel.headerPopoverButton &&
                    !this.viewModel.expressEnabled
                    ? this._renderHeaderPopoverEl()
                    : null,
                this.viewModel.expressHeaderPopoverButton &&
                    this.viewModel.expressEnabled
                    ? this._renderExpressHeaderPopoverEl()
                    : null,
                this.viewsPopoverManager
                    ? this._renderViewsOptionsPopover()
                    : null))));
        };
        ConfigPanel.prototype._renderHeaderPopoverEl = function () {
            var _this = this;
            return (widget_1.tsx("calcite-popover", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "headerPopoverElement", key: "headerPopoverElement", "reference-element": "headerPopover", placement: "trailing-leading", "close-button": "true", class: this.darkModeEnabled ? CSS.theme.dark : CSS.theme.light, "auto-close": "true" },
                widget_1.tsx("div", { class: CSS.tipsContent, bind: this, afterUpdate: function (node) {
                        node.innerHTML = _this._sectionHeaderTip;
                    } })));
        };
        ConfigPanel.prototype._renderExpressHeaderPopoverEl = function () {
            var _this = this;
            return (widget_1.tsx("calcite-popover", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "expressHeaderPopoverElement", key: "expressHeaderPopoverElement", "reference-element": "expressHeaderPopover", placement: "trailing-leading", "close-button": "true", class: this.darkModeEnabled ? CSS.theme.dark : CSS.theme.light, "auto-close": "true" },
                widget_1.tsx("div", { class: CSS.tipsContent, bind: this, afterUpdate: function (node) {
                        node.innerHTML = _this._sectionHeaderTip;
                    } })));
        };
        ConfigPanel.prototype._renderViewsOptionsPopover = function () {
            var _this = this;
            return (widget_1.tsx("calcite-popover", { bind: this, afterCreate: function (node) {
                    node.addEventListener("calcitePopoverOpen", function (e) {
                        focusUtils_1.focusNode("viewsDesktopCalciteAction");
                    });
                }, class: CSS.theme.dark, "reference-element": "views", placement: "trailing", "auto-close": "true" },
                widget_1.tsx("calcite-action", { key: "desktop-calcite-action", bind: this, onclick: this._updateMobileView, onkeydown: function (e) {
                        if (e.code === "Space") {
                            _this._updateMobileView(e);
                        }
                        else if (e.code === "Tab") {
                            if (e.shiftKey) {
                                _this._handleViewsButtonFocus("views");
                            }
                        }
                    }, icon: icons_1.default.monitor, textEnabled: true, text: this.configPanelMessages.desktop, "data-mobile-type": "desktop", active: this.viewModel.viewMode === "desktop" ? true : false, id: "viewsDesktopCalciteAction" }),
                widget_1.tsx("calcite-action", { key: "portrait-calcite-action", bind: this, onclick: this._updateMobileView, icon: icons_1.default.mobile, textEnabled: true, text: this.configPanelMessages.portrait, "data-mobile-type": "portrait", active: this.viewModel.viewMode === "portrait" ? true : false, id: "viewsPortraitCalciteAction" }),
                widget_1.tsx("calcite-action", { key: "landscape-calcite-action", bind: this, onclick: this._updateMobileView, onkeydown: function (e) {
                        if (e.code === "Space") {
                            _this._updateMobileView(e);
                        }
                        else if (e.code === "Tab") {
                            if (!e.shiftKey) {
                                _this._handleViewsButtonFocus("views");
                            }
                        }
                    }, textEnabled: true, text: this.configPanelMessages.landscape, "data-mobile-type": "landscape", active: this.viewModel.viewMode === "landscape" ? true : false, id: "viewsLandscapeCalciteAction" },
                    widget_1.tsx("calcite-icon", { icon: icons_1.default.mobile, scale: "s", class: "esri-config-panel__mobile-views-icon--landscape" }))));
        };
        ConfigPanel.prototype._renderCalciteActionToolTips = function () {
            var _a;
            var actionTooltips = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.actionToolTips;
            var actionToolTipKeys = Object.keys(actionTooltips);
            return actionToolTipKeys.map(function (key) { return actionTooltips === null || actionTooltips === void 0 ? void 0 : actionTooltips[key]; });
        };
        ConfigPanel.prototype._renderCalcitePopovers = function () {
            var _a;
            var popovers = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.popoverMap;
            var popoverKeys = Object.keys(popovers);
            return popoverKeys.map(function (key) { return popovers === null || popovers === void 0 ? void 0 : popovers[key]; });
        };
        ConfigPanel.prototype._renderHelpPopovers = function () {
            var _a, _b, _c, _d;
            return [
                (_b = (_a = this.viewModel.help) === null || _a === void 0 ? void 0 : _a.helpPopovers) === null || _b === void 0 ? void 0 : _b.renderOnboardingPopovers(),
                (_d = (_c = this.viewModel.help) === null || _c === void 0 ? void 0 : _c.helpPopovers) === null || _d === void 0 ? void 0 : _d.renderGeneralPopovers()
            ];
        };
        ConfigPanel.prototype._renderWebAnalyticsPanel = function () {
            var _a;
            var styles = this._getBottomPanelPosition();
            return (widget_1.tsx("div", { key: "web-analytics-container", class: CSS.webAnalyticsContainer, styles: !this._matchMedia.matches ? styles : {} },
                widget_1.tsx("focus-trap", null, (_a = this._webAnalyticsPanel) === null || _a === void 0 ? void 0 : _a.render())));
        };
        ConfigPanel.prototype._renderPublishPanel = function () {
            var _a;
            var styles = this._getBottomPanelPosition();
            return (widget_1.tsx("div", { key: "publish-container", class: CSS.publishContainer, styles: !this._matchMedia.matches ? styles : {} },
                widget_1.tsx("focus-trap", null, (_a = this._publishPanel) === null || _a === void 0 ? void 0 : _a.render())));
        };
        ConfigPanel.prototype._getBottomPanelPosition = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            var direction = this.appConfig.direction;
            return !this.expressEnabled
                ? direction === "rtl"
                    ? {
                        right: ((_a = this.calciteActionBar) === null || _a === void 0 ? void 0 : _a.offsetWidth) + ((_b = this._publishButton) === null || _b === void 0 ? void 0 : _b.offsetLeft) + "px",
                        bottom: ((_c = this._primaryPanelFooter) === null || _c === void 0 ? void 0 : _c.offsetHeight) + 19 + "px"
                    }
                    : {
                        left: ((_d = this.calciteActionBar) === null || _d === void 0 ? void 0 : _d.offsetWidth) + ((_e = this._publishButton) === null || _e === void 0 ? void 0 : _e.offsetLeft) + "px",
                        bottom: ((_f = this._primaryPanelFooter) === null || _f === void 0 ? void 0 : _f.offsetHeight) + 19 + "px"
                    }
                : direction === "rtl"
                    ? {
                        right: ((_g = this.calciteActionBar) === null || _g === void 0 ? void 0 : _g.offsetWidth) + ((_j = (_h = this.viewModel) === null || _h === void 0 ? void 0 : _h.expressPublishButton) === null || _j === void 0 ? void 0 : _j.offsetLeft) + "px",
                        bottom: ((_l = (_k = this.viewModel) === null || _k === void 0 ? void 0 : _k.expressFooter) === null || _l === void 0 ? void 0 : _l.offsetHeight) + 19 + "px"
                    }
                    : {
                        left: ((_m = this.calciteActionBar) === null || _m === void 0 ? void 0 : _m.offsetWidth) + ((_p = (_o = this.viewModel) === null || _o === void 0 ? void 0 : _o.expressPublishButton) === null || _p === void 0 ? void 0 : _p.offsetLeft) + "px",
                        bottom: ((_r = (_q = this.viewModel) === null || _q === void 0 ? void 0 : _q.expressFooter) === null || _r === void 0 ? void 0 : _r.offsetHeight) + 19 + "px"
                    };
        };
        ConfigPanel.prototype.destroy = function () {
            var _this = this;
            var viewModel = this.viewModel;
            viewModel.configParams = null;
            this._matchMedia.removeListener(function () { return _this.scheduleRender(); });
        };
        ConfigPanel.prototype._renderMobilePreview = function () {
            var _a, _b, _c;
            var previewEnabled = (_a = {},
                _a[CSS.mobilePreviewContainerEnabled] = this._previewEnabled,
                _a);
            var mobilePreviewDisableButtonDark = (_b = {},
                _b[CSS.mobilePreviewDisableButtonDark] = this.darkModeEnabled,
                _b);
            var mobileIconDark = (_c = {},
                _c[CSS.mobileIconDark] = this.darkModeEnabled,
                _c);
            var iframe = this._renderIframe();
            return (widget_1.tsx("div", { key: "mobile-preview", class: this.classes(CSS.mobilePreviewContainer, previewEnabled) },
                widget_1.tsx("button", { bind: this, onclick: this._disablePreview, class: this.classes(CSS.mobilePreviewDisableButton, mobilePreviewDisableButtonDark) },
                    widget_1.tsx("calcite-icon", { class: this.classes(mobileIconDark), icon: icons_1.default.chevronsDown, scale: "m" })),
                iframe));
        };
        ConfigPanel.prototype._renderMobileNav = function () {
            var _a, _b, _c;
            var _this = this;
            var _d, _e;
            var previewEnabled = (_a = {},
                _a[CSS.mobileNavPreviewEnabled] = this._previewEnabled,
                _a);
            var mobileIconDark = (_b = {},
                _b[CSS.mobileIconDark] = this.darkModeEnabled,
                _b);
            var mirroredIcon = (_c = {},
                _c[CSS.mirroredIcon] = ((_d = this.appConfig) === null || _d === void 0 ? void 0 : _d.direction) === "rtl" && this.appConfig.locale === "ar",
                _c);
            return (widget_1.tsx("footer", { slot: "footer", key: "mobile-nav", class: this.classes(CSS.mobileNav, previewEnabled) },
                widget_1.tsx("button", { bind: this, onclick: function () {
                        _this._openModal("info");
                        _this.viewModel.closeCalciteActionTooltips();
                    }, class: CSS.mobileNavButton, "data-panel-type": "info" },
                    widget_1.tsx("calcite-icon", { class: this.classes(mirroredIcon, mobileIconDark), icon: icons_1.default.question, scale: "m", mirrored: ((_e = this.appConfig) === null || _e === void 0 ? void 0 : _e.direction) === "rtl" ? true : false })),
                widget_1.tsx("button", { bind: this, onclick: this._mobileNavSelect, class: CSS.mobileNavButton, "data-panel-type": "preview", disabled: this._previewEnabled ? true : false },
                    widget_1.tsx("calcite-icon", { class: this.classes(mobileIconDark), icon: icons_1.default.mobile, scale: "m" }))));
        };
        ConfigPanel.prototype._renderCalciteShell = function () {
            var matches = this._matchMedia.matches;
            var globalNav = this._renderGlobalNav();
            var calciteShellPanel = this._renderCalciteShellPanel();
            var appPreview = this._renderAppPreviewContainer();
            var mobileNav = matches ? this._renderMobileNav() : null;
            return (widget_1.tsx("calcite-shell", { class: this.viewModel.darkModeEnabled ? CSS.theme.dark : CSS.theme.light, onscroll: function (e) {
                    var node = e.target;
                    if (node.scrollTop > 0)
                        node.scrollTop = 0;
                } },
                globalNav,
                calciteShellPanel,
                appPreview,
                mobileNav));
        };
        ConfigPanel.prototype._renderGlobalNav = function () {
            return (widget_1.tsx("div", { slot: "header", bind: this, id: CSS.globalNav, class: this.classes(CSS.jsGlobalNav, CSS.globalNav), afterCreate: this._createGlobalNav }));
        };
        ConfigPanel.prototype._renderBackButton = function () {
            var _a, _b;
            var _this = this;
            var backDark = (_a = {},
                _a[CSS.backDark] = this.viewModel.darkModeEnabled,
                _a);
            var backButtonDark = (_b = {},
                _b[CSS.backButtonDark] = this.viewModel.darkModeEnabled,
                _b);
            var chevronLeft = icons_1.default.chevronLeft, chevronRight = icons_1.default.chevronRight;
            var direction = this.viewModel.appConfig.direction;
            var arrow = direction === "rtl" ? chevronRight : chevronLeft;
            return (widget_1.tsx("div", { key: "back-button", class: this.classes(CSS.back, backDark) },
                widget_1.tsx("button", { bind: this, onclick: this._goBackToHome, onkeydown: function (e) {
                        if (e.code === "Tab") {
                            focusUtils_1.handleFocusElFromSettingsPanel(e);
                            return;
                        }
                        if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
                            return;
                        }
                        if (e.code === "Space") {
                            _this._goBackToHome();
                        }
                    }, class: this.classes(CSS.backButton, backButtonDark), id: "fullSetupBackButton", "data-section-index": "" + this.viewModel.currentSectionIndex },
                    widget_1.tsx("calcite-icon", { icon: arrow, scale: "s" }),
                    this.viewModel.configPanelMessages.back)));
        };
        ConfigPanel.prototype._renderCalciteShellPanel = function () {
            var _this = this;
            var _a, _b;
            var calciteActionBar = this._renderCalciteActionBar();
            var calcitePanelContent = this._renderCalcitePanelContent();
            var expressPanel = (_a = this.express) === null || _a === void 0 ? void 0 : _a.render();
            var expressEnabled = this.expressEnabled;
            var searchSettingsContainer = this._renderSearchSettingsContainer();
            var _c = this.viewModel, sections = _c.sections, currentSectionIndex = _c.currentSectionIndex;
            var currentSection = sections.getItemAt(currentSectionIndex);
            var helpPanel = this.helpIsOpen ? "esri-config-panel-help" : "";
            return (widget_1.tsx("calcite-shell-panel", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_calciteShellPanel", slot: "primary-panel", layout: "leading" },
                calciteActionBar,
                searchSettingsContainer,
                widget_1.tsx("calcite-panel", { bind: this, afterCreate: function (node) {
                        _this._initResizeSensor(node);
                        _this._setStyle(node);
                        node.addEventListener("calcitePanelDismissedChange", function (e) {
                            var calcitePanel = e.target;
                            if (calcitePanel.dismissed) {
                                _this._resetHelpPanel();
                            }
                            else {
                                setTimeout(function () { return calcitePanel.setFocus("dismiss-button"); }, 50);
                            }
                            _this.scheduleRender();
                        });
                    }, onkeydown: this._handleSearchEventBubble, class: this.classes(CSS.calcitePanel, helpPanel), role: "tabpanel", "aria-labelledby": (currentSection === null || currentSection === void 0 ? void 0 : currentSection.type) + "Tab", dismissible: this.helpIsOpen, dismissed: !this.helpIsOpen }, this.helpIsOpen
                    ? (_b = this.viewModel.help) === null || _b === void 0 ? void 0 : _b.render() : expressEnabled
                    ? expressPanel
                    : calcitePanelContent)));
        };
        ConfigPanel.prototype._renderSearchSettingsContainer = function () {
            var _a;
            var _b, _c, _d;
            var styles = {
                width: ((_b = this._calciteShellPanel) === null || _b === void 0 ? void 0 : _b.offsetWidth) - ((_c = this.calciteActionBar) === null || _c === void 0 ? void 0 : _c.offsetWidth) + "px"
            };
            var hide = (_a = {},
                _a[CSS.searchSettingsHide] = !this._searchSettingsIsOpen,
                _a);
            return (widget_1.tsx("div", { styles: styles, class: this.classes(CSS.searchSettings, hide) }, (_d = this._searchSettings) === null || _d === void 0 ? void 0 : _d.render()));
        };
        ConfigPanel.prototype._renderCalciteActionBar = function () {
            var _a;
            var _this = this;
            var _b;
            var matches = this._matchMedia.matches;
            var closeButton = matches ? this._renderCloseButton() : null;
            var shareButton = this._renderShareButton();
            var viewsButton = this._renderViewsButton();
            var infoButton = !matches ? this._renderInfoButton() : null;
            var onboardingButton = this._renderOnboardingButton();
            var webAnalyticsButton = this._webAnalyticsPanel
                ? this._renderWebAnalyticsButton()
                : null;
            var calciteActions = this._renderCalciteActions();
            var searchSettingsButton = this._renderSearchSettingsButton();
            var isExpress = this.viewModel.expressEnabled;
            var rtlSpacing = (_a = {},
                _a[CSS.expressToggleRTL] = this._calciteActionBarExpanded && document.documentElement.dir === "rtl",
                _a);
            return (widget_1.tsx("calcite-action-bar", { key: "action-bar", bind: this, slot: "action-bar", class: CSS.theme.dark, "intl-collapse": this.configPanelMessages.collapse, afterUpdate: this._storeActionBarExpandedState, expandDisabled: matches ? true : false, afterCreate: widget_1.storeNode, "data-node-ref": "calciteActionBar", tooltipExpand: this._expandTooltip, expanded: true, "overflow-actions-disabled": "true" },
                widget_1.tsx("calcite-action-group", { bind: this, class: CSS.expressToggleActionGroup, key: "express-toggle", id: "expressSwitchHelp", afterUpdate: this._addCalciteActionToolTip, text: this.expressMessages.express },
                    widget_1.tsx("calcite-label", { bind: this, class: this.classes(CSS.expressToggleLabel, rtlSpacing), layout: "inline", "disable-spacing": "true" },
                        widget_1.tsx("calcite-switch", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "expressSwitch", id: "expressSwitch", oncalciteSwitchChange: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var dataModalId;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!localStorage.getItem("switch_doNotShow")) return [3, 2];
                                            return [4, this.viewModel.switchConfigMode("switch")];
                                        case 1:
                                            _a.sent();
                                            return [3, 3];
                                        case 2:
                                            dataModalId = this.viewModel.expressEnabled
                                                ? "full"
                                                : "express";
                                            this._openModal(dataModalId, "switch");
                                            _a.label = 3;
                                        case 3: return [2];
                                    }
                                });
                            }); }, checked: this.viewModel.expressEnabled }),
                        ((_b = this.calciteActionBar) === null || _b === void 0 ? void 0 : _b.expanded) ? (widget_1.tsx("span", null, this.expressMessages.express)) : null)),
                widget_1.tsx("calcite-action-group", { key: "search-setting-actions" }, searchSettingsButton),
                !isExpress ? (widget_1.tsx("calcite-action-group", { key: "full-setup-actions", role: "tablist" }, calciteActions)) : null,
                widget_1.tsx("calcite-action-group", { key: "bottom-actions", slot: "bottom-actions" },
                    onboardingButton,
                    shareButton,
                    webAnalyticsButton,
                    infoButton,
                    viewsButton,
                    closeButton)));
        };
        ConfigPanel.prototype._renderCalciteActions = function () {
            var _a = this.viewModel, currentSectionIndex = _a.currentSectionIndex, sections = _a.sections;
            return sections
                .slice()
                .toArray()
                .map(function (section, sectionIndex) {
                var active = (currentSectionIndex === null && sectionIndex === 0) ||
                    currentSectionIndex === sectionIndex
                    ? true
                    : false;
                return section.renderCalciteAction(active, sectionIndex);
            });
        };
        ConfigPanel.prototype._renderSearchSettingsButton = function () {
            return (widget_1.tsx("calcite-action", { bind: this, onclick: this._toggleSearchSettings, onkeydown: this._handleSearchSettingsKeyDown, afterUpdate: this._addCalciteActionToolTip, textEnabled: true, icon: icons_1.default.search, active: this._searchSettingsIsOpen, "aria-expanded": this._searchSettingsIsOpen, text: this._searchSettings.searchSettingsMessages.header, id: "searchSettingsHelp", key: "search-settings-calcite-action" }));
        };
        ConfigPanel.prototype._renderShareButton = function () {
            return (widget_1.tsx("calcite-action", { key: "share-calcite-action", id: "shareLevelHelp", bind: this, onclick: this._openShare, text: this.shareMessages.share, textEnabled: true, icon: icons_1.default.share, afterUpdate: this._addCalciteActionToolTip, "data-button-type": "share" }));
        };
        ConfigPanel.prototype._renderViewsButton = function () {
            var _this = this;
            if (!this.viewsPopoverManager) {
                this.viewsPopoverManager = (widget_1.tsx("calcite-action", { key: "views-calcite-action", bind: this, text: this.configPanelMessages.views, id: "views", icon: icons_1.default.mobile, onkeydown: function (e) {
                        if (e.code === "Tab") {
                            if (e.shiftKey) {
                                _this._handleViewsButtonFocus("viewsLandscapeCalciteAction");
                            }
                            else {
                                _this._handleViewsButtonFocus("viewsDesktopCalciteAction");
                            }
                        }
                    } }));
            }
            return widget_1.tsx("span", { id: "viewsHelp" }, this.viewsPopoverManager);
        };
        ConfigPanel.prototype._renderInfoButton = function () {
            var _this = this;
            var info = "info";
            return (widget_1.tsx("calcite-action", { key: "info-calcite-action", bind: this, id: info, onclick: function () {
                    _this._openModal(info);
                    _this.viewModel.closeCalciteActionTooltips();
                }, text: this.configPanelMessages.information, textEnabled: true, icon: icons_1.default.information, afterUpdate: this._addCalciteActionToolTip }));
        };
        ConfigPanel.prototype._renderOnboardingButton = function () {
            var _this = this;
            var onboarding = "onboarding";
            return (widget_1.tsx("calcite-action", { key: "onboarding-calcite-action", bind: this, id: onboarding, onclick: function () {
                    if (_this._searchSettings.open) {
                        _this._searchSettingsIsOpen = false;
                        _this._searchSettings.open = false;
                    }
                    _this.helpIsOpen = !_this.helpIsOpen;
                    _this.scheduleRender();
                }, onkeydown: function (e) {
                    var code = e.code;
                    var Tab = keys_1.KeyCodes.Tab, Space = keys_1.KeyCodes.Space, Enter = keys_1.KeyCodes.Enter;
                    if (_this.helpIsOpen &&
                        (code === Tab || code === Space || code === Enter)) {
                        var calcitePanel_1 = document.querySelector(".esri-config-panel-help");
                        setTimeout(function () { return calcitePanel_1.setFocus("dismiss-button"); }, 50);
                    }
                }, text: this.configPanelMessages.welcome, textEnabled: true, icon: icons_1.default.megaPhone, afterUpdate: this._addCalciteActionToolTip, indicator: this._showGetStartedIndicator() }));
        };
        ConfigPanel.prototype._renderWebAnalyticsButton = function () {
            return (widget_1.tsx("calcite-action", { key: "web-analytics-calcite-action", id: "webAnalyticsHelp", bind: this, onclick: this._toggleWebAnalytics, text: this.webAnalyticsMessages.webAnalytics, textEnabled: true, icon: icons_1.default.graphTimeSeries, afterUpdate: this._addCalciteActionToolTip }));
        };
        ConfigPanel.prototype._renderCloseButton = function () {
            var _this = this;
            var exit = "exit";
            return (widget_1.tsx("calcite-action", { key: "exit-calcite-action", id: exit, bind: this, onclick: function () {
                    if (localStorage.getItem("exit_doNotShow")) {
                        _this.viewModel.goToItemPage();
                    }
                    else {
                        _this._openModal(exit, "exitModal");
                    }
                }, text: this.configPanelMessages.exit, textEnabled: true, icon: icons_1.default.close, afterUpdate: this._addCalciteActionToolTip }));
        };
        ConfigPanel.prototype._renderCalcitePanelContent = function () {
            var _a = this.viewModel, sections = _a.sections, currentSectionIndex = _a.currentSectionIndex, subsectionId = _a.subsectionId;
            var currentSection = sections.getItemAt(currentSectionIndex);
            if (!currentSection) {
                return;
            }
            var hasSubsections = currentSection.hasSubsections;
            var withinSubection = !!(hasSubsections && subsectionId);
            var flowSettingsUI = this.viewModel.flowSettingsUI;
            var content = flowSettingsUI.content;
            var sectionHeader = currentSection === null || currentSection === void 0 ? void 0 : currentSection.renderSectionHeader();
            var backButton = withinSubection && !content ? this._renderBackButton() : null;
            var settings = this._renderSettings(currentSection, withinSubection);
            var badge = this._renderBadge();
            var alert = this._renderAlert();
            var primaryPanelFooter = this._renderPrimaryPanelFooter();
            return [
                sectionHeader,
                backButton,
                settings,
                badge,
                alert,
                primaryPanelFooter
            ];
        };
        ConfigPanel.prototype._renderSettings = function (section, withinSubection) {
            var _a;
            var flowSettingsUI = this.viewModel.flowSettingsUI;
            var content = flowSettingsUI.content;
            var primaryPanelContent = this._getPrimaryPanelContent(section);
            var subsectionPanelStyles = (_a = {},
                _a[CSS.subsectionSettings] = withinSubection,
                _a);
            return (widget_1.tsx("calcite-flow", null,
                widget_1.tsx("calcite-panel", { key: "fullSetupSettingsPanelContainer", class: this.classes(subsectionPanelStyles) }, primaryPanelContent),
                content ? flowSettingsUI === null || flowSettingsUI === void 0 ? void 0 : flowSettingsUI.render() : null));
        };
        ConfigPanel.prototype._renderPrimaryPanelFooter = function () {
            var _this = this;
            var matches = this._matchMedia.matches;
            return (widget_1.tsx("div", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_primaryPanelFooter", class: CSS.primaryPanelFooter, slot: "footer" },
                !matches ? (widget_1.tsx("calcite-button", { bind: this, onclick: function () {
                        if (localStorage.getItem("exit_doNotShow")) {
                            _this.viewModel.goToItemPage();
                        }
                        else {
                            _this._openModal("exit", "exitModal");
                        }
                    }, class: CSS.primaryPanelFooterButton, appearance: "outline" },
                    widget_1.tsx("span", { class: CSS.footerButtonText }, this.configPanelMessages.exit))) : null,
                widget_1.tsx("calcite-button", { bind: this, onclick: this._togglePublish, afterCreate: widget_1.storeNode, "data-node-ref": "_publishButton", class: CSS.primaryPanelFooterButton, id: "publishFooterButton", "data-button-type": "publish" },
                    widget_1.tsx("span", { class: CSS.footerButtonText, "data-button-type": "publish" }, this.configPanelMessages.publish))));
        };
        ConfigPanel.prototype._renderBadge = function () {
            var _a, _b;
            return (widget_1.tsx("div", { key: "fullSetupBadge", class: CSS.fullSetupBadge }, (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.badge) === null || _b === void 0 ? void 0 : _b.render()));
        };
        ConfigPanel.prototype._renderAlert = function () {
            var _a, _b;
            return (widget_1.tsx("div", { key: "fullSetupAlert", styles: {
                    position: "absolute",
                    bottom: ((_a = this._primaryPanelFooter) === null || _a === void 0 ? void 0 : _a.offsetHeight) + 20 + "px",
                    zIndex: "1"
                } }, (_b = this.alert) === null || _b === void 0 ? void 0 : _b.render()));
        };
        ConfigPanel.prototype._renderAppPreviewContainer = function () {
            var _a;
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            var iframePreviewDark = (_a = {},
                _a[CSS.iframeContainerDark] = this.darkModeEnabled,
                _a);
            var appDataValues = (_b = this.viewModel.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
            var item = (appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.webmap) || (appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.webscene) || (appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.group) ||
                ((_c = appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.itemCollection) === null || _c === void 0 ? void 0 : _c.length) > 0;
            var draftItem = ((_d = appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.draft) === null || _d === void 0 ? void 0 : _d.webmap) || ((_e = appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.draft) === null || _e === void 0 ? void 0 : _e.webscene) || ((_f = appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.draft) === null || _f === void 0 ? void 0 : _f.group) ||
                ((_h = (_g = appDataValues === null || appDataValues === void 0 ? void 0 : appDataValues.draft) === null || _g === void 0 ? void 0 : _g.itemCollection) === null || _h === void 0 ? void 0 : _h.length) > 0;
            return (widget_1.tsx("div", { class: this.classes(CSS.previewFrame, CSS.appPreviewMobileContainer) },
                widget_1.tsx("div", { bind: this, afterCreate: this._initResizeSensor, class: this.classes(CSS.iframeContainer, iframePreviewDark) },
                    item || draftItem
                        ? this._renderIframe()
                        : this._renderWelcomeContainer(),
                    ((_l = (_k = (_j = this._appAlert) === null || _j === void 0 ? void 0 : _j.viewModel) === null || _k === void 0 ? void 0 : _k.appAlertConfig) === null || _l === void 0 ? void 0 : _l.type) ? (_m = this._appAlert) === null || _m === void 0 ? void 0 : _m.render() : null)));
        };
        ConfigPanel.prototype._renderIframe = function () {
            var _a, _b, _c;
            var appid = this.viewModel.appid;
            var appUrl = this.viewModel.getAppUrl();
            var mobileStyles = (_a = {},
                _a[CSS.iframeMobile] = this.viewModel.viewMode === "portrait",
                _a);
            var landScapeStyles = (_b = {},
                _b[CSS.iframeLandscape] = this.viewModel.viewMode === "landscape",
                _b);
            var mobilePreview = (_c = {},
                _c[CSS.appPreviewMobile] = this._previewEnabled,
                _c);
            var locale = this.appConfig.locale ? this.appConfig.locale : intl_1.getLocale();
            var urlWithLocale = appUrl.indexOf("appid") !== -1
                ? appUrl + "&locale=" + locale
                : appUrl + "?locale=" + locale;
            return appid ? (widget_1.tsx("iframe", { bind: this, class: this.classes(mobileStyles, mobilePreview, landScapeStyles), afterCreate: widget_1.storeNode, "data-node-ref": "appPreviewFrame", "data-embed-type": "instant-config", src: urlWithLocale, width: "100%", height: "100%", frameborder: "0" })) : null;
        };
        ConfigPanel.prototype._renderWelcomeContainer = function () {
            var welcomeMapIcon = this._renderWelcomeMapIcon();
            var welcomeMessage = this._getWelcomeMessage();
            return (widget_1.tsx("div", { class: CSS.welcome },
                welcomeMapIcon,
                welcomeMessage));
        };
        ConfigPanel.prototype._renderWelcomeMapIcon = function () {
            return (widget_1.tsx("svg", { class: CSS.welcomeIcon, role: "none", focusable: "false", "aria-hidden": "true" },
                widget_1.tsx("path", { class: "st0", d: "M84.2,0H0v100h100V0H84.2z M40,95.5c0-0.4-0.1-0.9-0.1-1.3c0.1-1.8,0.5-3.5,1.2-5.1c0.5-1.2,0.7-2.5,0.7-3.8\r\n\tc0-3.7-7.1-2.7-8.2-4.9c-2.8-5.5,4.7-7,4.7-11.4c0-1.1-0.6-3.3-2.3-3.5c-2.4-0.2-3,1.1-5.4,1.1c-1.5,0.1-2.8-1-3-2.4\r\n\tc0-2.6,2.1-3.9,2.1-6.5c0-1.7-0.7-2.7-0.7-4.4c-0.1-2.3,1.7-4.3,4-4.4c2.2,0,3.2,1.8,4.2,3.7c0.9,1.5,2.5,2.3,4.2,2.1\r\n\tc3.3,0,5.4-4.2,5.4-6.7c-0.1-1.7,1.3-3.2,3-3.3c2.4,0,3.2,2.4,5.6,2.4c3.9,0,3.8-5.2,7.2-7c4.2-2.3,3-7.2,2.5-9.8\r\n\tc-0.2-1.2,2-3.4,3.2-3.3c4.9,0.4,2.8-3.7,2.8-5.6c0-0.3,0-0.7,0.2-1c0.8-2.3,4.1-3,4.1-5.7c0-1.9-1.6-2.8-1.6-4.7\r\n\tc0-1.9,1.9-3.7,4.5-5.3h17.3v62.8c-0.4,0.5-0.7,0.8-0.9,0.8h-4.3c-2.3-0.2-4.5-1.3-6.2-3c-1.8-1.6-1.8-5.3-4.2-5.3\r\n\tc-3.3,0-3.5,4.6-6.8,4.6c-1.5,0-2.6-1.2-4.1-1.2c-1.3,0-3,0.7-3,2v3.4c0,2.9-3.5,3.5-3.5,6.4c0,1.2,1.3,1.6,1.3,2.8\r\n\tc0,4-6.1,3.4-6.1,7.4c0,1.3,1.5,2.1,1.5,3.3v0.2c0,1.5-2.1,4.1-2.8,6.7L40,95.5z" })));
        };
        ConfigPanel.prototype._renderCalciteLoader = function () {
            return (widget_1.tsx("div", { class: CSS.loaderContainer },
                widget_1.tsx("calcite-loader", { class: CSS.calciteLoader, text: this.configPanelMessages.loading + "...", isActive: true })));
        };
        ConfigPanel.prototype._renderShareLevel = function () {
            var _a, _b, _c;
            var shareLevel = this.shareLevel.isOpen
                ? (_a = this.shareLevel) === null || _a === void 0 ? void 0 : _a.render() : null;
            return [
                shareLevel,
                widget_1.tsx("calcite-alert", { class: this.viewModel.darkModeEnabled
                        ? "calcite-theme-dark"
                        : "calcite-theme-light", bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "shareLevelAlert", placement: "bottom", scale: "l", color: "blue", role: "alert", "auto-dismiss": "true", dismissible: "false" },
                    widget_1.tsx("div", { slot: "message" }, ((_c = (_b = this.viewModel) === null || _b === void 0 ? void 0 : _b.templateAppItem) === null || _c === void 0 ? void 0 : _c.title) + " " + this.configPanelMessages.sharing.updated))
            ];
        };
        ConfigPanel.prototype._getPrimaryPanelContent = function (section) {
            var _a;
            var subsectionId = this.viewModel.subsectionId;
            var hasSubsections = section.hasSubsections;
            return section.type === "map"
                ? (_a = section) === null || _a === void 0 ? void 0 : _a.renderItemBrowserPreview() : hasSubsections
                ? subsectionId
                    ? section.renderSubsectionConfigSettings()
                    : section.renderSubsections()
                : section.renderSectionComponents();
        };
        ConfigPanel.prototype._goBackToHome = function () {
            var subsectionId = this.viewModel.subsectionId;
            this.set("viewModel.subsectionId", null);
            focusUtils_1.focusNode(subsectionId + "Subsection");
        };
        ConfigPanel.prototype._initResizeSensor = function (node) {
            var _this = this;
            new ResizeSensor(node, function () { return _this.scheduleRender(); });
        };
        ConfigPanel.prototype._createGlobalNav = function () {
            var _this = this;
            this.own(watchUtils_1.whenOnce(this, "viewModel.appTemplateName", function () {
                var appTemplateName = _this.viewModel.appTemplateName;
                _this.viewModel.createGlobalNav(appTemplateName);
            }));
        };
        ConfigPanel.prototype._mobileNavSelect = function (event) {
            var node = event.currentTarget;
            var panelType = node.getAttribute("data-panel-type");
            if (panelType === "preview") {
                this._previewEnabled = true;
                this.scheduleRender();
            }
        };
        ConfigPanel.prototype._disablePreview = function () {
            this._previewEnabled = false;
            this.scheduleRender();
        };
        ConfigPanel.prototype._togglePublish = function (e) {
            if (this._publishPanelIsOpen) {
                this._publishPanelIsOpen = false;
                this._publishPanel.open = false;
            }
            else {
                this._publishPanelIsOpen = true;
                this._publishPanel.open = true;
            }
            var targetElement = e.target;
            var openButtonType = targetElement.getAttribute("data-button-type");
            this._publishPanel.share.openButtonType = openButtonType;
            this.scheduleRender();
        };
        ConfigPanel.prototype._toggleWebAnalytics = function () {
            if (this._webAnalyticsPanelIsOpen) {
                this._webAnalyticsPanelIsOpen = false;
                this._webAnalyticsPanel.open = false;
            }
            else {
                this._webAnalyticsPanelIsOpen = true;
                this._webAnalyticsPanel.open = true;
            }
            this.viewModel.closeCalciteActionTooltips();
            this.scheduleRender();
        };
        ConfigPanel.prototype._updateHeaderTip = function () {
            var _a, _b, _c, _d;
            var tip = null;
            if (this.expressEnabled) {
                var _e = this.express, expressTip = _e.expressTip, expressSection = _e.expressSection;
                if (expressSection) {
                    tip = expressSection.tip;
                }
                else {
                    tip = expressTip;
                }
            }
            else {
                var _f = this.viewModel, currentSectionIndex = _f.currentSectionIndex, sections = _f.sections, subsectionId = _f.subsectionId;
                if (subsectionId) {
                    tip = (_d = (_c = (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.presetConfigSettings) === null || _b === void 0 ? void 0 : _b.subsections) === null || _c === void 0 ? void 0 : _c[subsectionId]) === null || _d === void 0 ? void 0 : _d.tip;
                }
                else {
                    var currentSection = sections.getItemAt(currentSectionIndex);
                    var sectionTip = currentSection.sectionTip;
                    tip = sectionTip;
                }
            }
            this._sectionHeaderTip = tip;
            this.scheduleRender();
        };
        ConfigPanel.prototype._getPropertyWatchHandles = function () {
            var _this = this;
            return [
                watchUtils_1.watch(this.express, "expressEnabled", function () { return _this.scheduleRender(); }),
                watchUtils_1.whenTrue(this, "darkModeEnabled", function () {
                    _this._drawer.darkModeEnabled = _this.darkModeEnabled;
                    _this.scheduleRender();
                }),
                watchUtils_1.whenFalse(this._publishPanel, "open", function () {
                    _this._publishPanelIsOpen = false;
                    _this.express.publishPanelIsOpen = false;
                    _this.express.expressSection = null;
                    _this.scheduleRender();
                }),
                watchUtils_1.whenOnce(this, "viewModel", function () {
                    _this._publishPanel.configPanelViewModel = _this.viewModel;
                    _this.express.configPanelViewModel = _this.viewModel;
                    _this.shareLevel.configPanelViewModel = _this.viewModel;
                })
            ];
        };
        ConfigPanel.prototype._openShare = function (e) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.viewModel;
                            return [4, this.viewModel.queryPortalItems(this.viewModel.appid)];
                        case 1:
                            _a.templateAppItem = _c.sent();
                            _b = this.viewModel.shareLevel;
                            return [4, this.viewModel.shareLevel.checkForGroups(this.viewModel.templateAppItem)];
                        case 2:
                            _b.itemHasGroups = _c.sent();
                            this._publishPanel.shareIsEnabled = true;
                            this._togglePublish(e);
                            this.viewModel.closeCalciteActionTooltips();
                            return [2];
                    }
                });
            });
        };
        ConfigPanel.prototype._addCalciteActionToolTip = function (calciteAction) {
            if (this._matchMedia.matches) {
                return;
            }
            var id = calciteAction.getAttribute("id");
            var textLabel = calciteAction.getAttribute("text");
            var tooltip = (widget_1.tsx("calcite-tooltip", { key: id + "-tooltip", class: this.classes("calcite-action-" + id, CSS.theme.dark), "reference-element": id, "auto-close": "true" }, textLabel));
            this.viewModel.actionToolTips[id] = tooltip;
        };
        ConfigPanel.prototype._openModal = function (dataModalId, initiator) {
            var _a, _b, _c;
            (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.modal.set("initiator", initiator);
            (_b = this.viewModel) === null || _b === void 0 ? void 0 : _b.modal.set("modalId", dataModalId);
            (_c = this.viewModel) === null || _c === void 0 ? void 0 : _c.modal.open();
        };
        ConfigPanel.prototype._storeActionBarExpandedState = function (node) {
            var expanded = node.hasAttribute("expanded");
            this._calciteActionBarExpanded = expanded ? true : false;
        };
        ConfigPanel.prototype._handleSearchEventBubble = function (e) {
            if (e.code === "ArrowUp" || e.code === "ArrowDown") {
                var activeElement = document.activeElement;
                if (!activeElement) {
                    return;
                }
                var isSearchInput = activeElement.getAttribute("data-node-ref") === "_searchInput";
                var isSearchListItem = activeElement.classList.contains("esri-config-panel__search-settings-results-list-item");
                if (isSearchInput || isSearchListItem) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        };
        ConfigPanel.prototype._toggleSearchSettings = function () {
            this._searchSettingsIsOpen = !this._searchSettingsIsOpen;
            this._searchSettings.open = !this._searchSettings.open;
            if (this._searchSettingsIsOpen) {
                this._focusSearchInput();
            }
            this.scheduleRender();
        };
        ConfigPanel.prototype._handleSearchSettingsKeyDown = function (e) {
            if (e.code === "Tab" && this._searchSettingsIsOpen) {
                this._focusSearchInput();
                return;
            }
        };
        ConfigPanel.prototype._focusSearchInput = function () {
            var _this = this;
            var interval = setInterval(function () {
                _this._searchSettings.searchInput.setFocus();
                var searchDataNodeRef = document.activeElement.getAttribute("data-node-ref");
                if (searchDataNodeRef === "searchInput") {
                    clearInterval(interval);
                }
            }, 0);
        };
        ConfigPanel.prototype._setStyle = function (element) {
            var style = document.createElement("style");
            style.innerHTML = ".content-container { overflow: hidden; }";
            element.shadowRoot.appendChild(style);
        };
        ConfigPanel.prototype._getWelcomeMessage = function () {
            var _a, _b, _c;
            var configParams = this.viewModel.configParams;
            var isGroup = configParams
                ? configParams.config.find(function (section) { return section.id === "group"; })
                : null;
            var mapSection = (configParams === null || configParams === void 0 ? void 0 : configParams.config) ? configParamsUtils_1.getConfigParamsSection(configParams.config, "map")
                : null;
            var isScene = ((_b = (_a = mapSection === null || mapSection === void 0 ? void 0 : mapSection.config) === null || _a === void 0 ? void 0 : _a.itemTypes) === null || _b === void 0 ? void 0 : _b.length) === 1 &&
                mapSection.config.itemTypes.indexOf("3d") !== -1;
            var isPortfolio = ((_c = configParams === null || configParams === void 0 ? void 0 : configParams.config) === null || _c === void 0 ? void 0 : _c.filter(function (section) { return section.id === "portfolio"; }).length) > 0;
            return configParams
                ? isGroup
                    ? this.configPanelMessages.pleaseSelectGroupItem
                    : isScene
                        ? this.configPanelMessages.pleaseSelectSceneItem
                        : isPortfolio
                            ? this.configPanelMessages.pleaseSelectItemsPortfolio
                            : this.configPanelMessages.pleaseSelectAnitem
                : null;
        };
        ConfigPanel.prototype._updateMobileView = function (e) {
            var node = e.target;
            var dataMobileType = node.getAttribute("data-mobile-type");
            this.viewModel.set("viewMode", dataMobileType);
        };
        ConfigPanel.prototype._handleViewsButtonFocus = function (actionId) {
            var action = document.getElementById(actionId);
            if (!(action === null || action === void 0 ? void 0 : action.setFocus))
                return;
            var interval = setInterval(function () {
                action.setFocus();
                if (document.activeElement === action) {
                    clearInterval(interval);
                }
            }, 0);
            action.setFocus();
        };
        ConfigPanel.prototype._resetHelpPanel = function () {
            var _a, _b;
            this.helpIsOpen = false;
            if ((_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.help) === null || _b === void 0 ? void 0 : _b.helpSearch) {
                this.viewModel.help.helpSearch.removeEventListeners();
                this.viewModel.help.helpSearch.helpHasEventListeners = false;
            }
        };
        ConfigPanel.prototype._showGetStartedIndicator = function () {
            var _a, _b, _c, _d;
            return !((_d = (_c = (_b = (_a = this.viewModel) === null || _a === void 0 ? void 0 : _a.help) === null || _b === void 0 ? void 0 : _b.helpPopovers) === null || _c === void 0 ? void 0 : _c.helpIndicators) === null || _d === void 0 ? void 0 : _d.allSeen);
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.ariaLiveNode"),
            decorators_1.property()
        ], ConfigPanel.prototype, "ariaLiveNode", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.sanitizer")
        ], ConfigPanel.prototype, "sanitizer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanel.prototype, "authorizedMessage", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.appConfig")
        ], ConfigPanel.prototype, "appConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.appPreviewFrame")
        ], ConfigPanel.prototype, "appPreviewFrame", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanel.prototype, "calciteActionBar", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.darkModeEnabled")
        ], ConfigPanel.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.expressEnabled")
        ], ConfigPanel.prototype, "expressEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.express")
        ], ConfigPanel.prototype, "express", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.expressSwitch")
        ], ConfigPanel.prototype, "expressSwitch", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.modal")
        ], ConfigPanel.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.portal")
        ], ConfigPanel.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.proxyNode")
        ], ConfigPanel.prototype, "proxyNode", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.alert")
        ], ConfigPanel.prototype, "alert", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.helpButton")
        ], ConfigPanel.prototype, "helpButton", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.telemetry")
        ], ConfigPanel.prototype, "telemetry", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelMessages")
        ], ConfigPanel.prototype, "configPanelMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.expressMessages"),
            widget_1.messageBundle("dist/assets/t9n/ui/express/resources")
        ], ConfigPanel.prototype, "expressMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/ConfigSettings/resources")
        ], ConfigPanel.prototype, "configSettingMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/Share/resources")
        ], ConfigPanel.prototype, "shareMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/WebAnalytics/resources")
        ], ConfigPanel.prototype, "webAnalyticsMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanel.prototype, "headerPopoverElement", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanel.prototype, "expressHeaderPopoverElement", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanel.prototype, "viewsPopoverManager", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.shareLevel")
        ], ConfigPanel.prototype, "shareLevel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigPanel.prototype, "shareLevelAlert", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.helpIsOpen")
        ], ConfigPanel.prototype, "helpIsOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ConfigPanelViewModel
            })
        ], ConfigPanel.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], ConfigPanel.prototype, "_toggleSearchSettings", null);
        ConfigPanel = tslib_1.__decorate([
            decorators_1.subclass("ConfigPanel")
        ], ConfigPanel);
        return ConfigPanel;
    }(Widget_1.default));
    return ConfigPanel;
});
