define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "./Express/ExpressViewModel", "../../icons/icons", "./Express/ExpressSectionItem", "esri/core/Collection", "esri/core/Handles", "esri/core/watchUtils", "../../utils/focusUtils"], function (require, exports, tslib_1, decorators_1, Widget_1, widget_1, ExpressViewModel, icons_1, ExpressSectionItem, Collection_1, Handles_1, watchUtils_1, focusUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    Collection_1 = tslib_1.__importDefault(Collection_1);
    Handles_1 = tslib_1.__importDefault(Handles_1);
    var CSS = {
        expressModal: "esri-config-panel__express-modal",
        shellPanelHeader: "esri-config-panel__shell-panel-header",
        shellPanelHeaderText: "esri-config-panel__shell-panel-header-text",
        subHeaderContainer: "esri-config-panel__shell-panel-subheader-container",
        shellPanelSubheaderText: "esri-config-panel__shell-panel-subheader-text",
        subsection: "esri-config-panel__subsection",
        subsectionContentContainer: "esri-config-panel__subsection-content-container",
        subsectionTextContainer: "esri-config-panel__subsection-text-container",
        subsectionTitle: "esri-config-panel__subsection-title",
        subsectionSummary: "esri-config-panel__subsection-summary",
        calcitePanel: "esri-config-panel__calcite-panel",
        expressSectionsMenu: "esri-config-panel__express-sections-menu",
        expressSetupBadge: "esri-config-panel-express__badge",
        expressFooter: "esri-config-panel-express__footer",
        footerButtonText: "esri-config-panel__footer-button-text",
        expressSubsections: "esri-config-panel-express__subsections",
        panelComponentHeader: "esri-config-panel-express__panel-component-header",
        stepText: "esri-config-panel-express__step-text",
        subsectionNotSelected: "esri-config-panel-express__subsections--subsection-not-selected",
        darkModeHeader: "esri-config-panel__shell-panel-header--dark",
        darkModeTitle: "esri-config-panel__shell-panel-header-text--dark",
        subsectionTitleDark: "esri-config-panel__subsection-title--dark",
        subsectionSummaryDark: "esri-config-panel__subsection-summary--dark",
        iconDark: "esri-config-panel__icon--dark",
        nextBackDark: "esri-config-panel__express-next-back--dark",
        primaryPanelComponentsContainerDark: "esri-config-panel__primary-panel-components-container--dark",
        primaryPanelComponentsContainer: "esri-config-panel__primary-panel-components-container",
        nextBack: "esri-config-panel__express-next-back",
        nextButton: "esri-config-panel-express__next-button",
        nextButtonDark: "esri-config-panel-express__next-button--dark",
        backButton: "esri-config-panel__back-button",
        backButtonDark: "esri-config-panel__back-button--dark",
        primaryPanelFooterButton: "esri-config-panel-express__primary-panel-footer-button",
        btn: "btn",
        btnClear: "btn-clear"
    };
    var Express = (function (_super) {
        tslib_1.__extends(Express, _super);
        function Express(params) {
            var _this = _super.call(this, params) || this;
            _this._badgeNode = null;
            _this._expressSectionCollectionHandles = new Handles_1.default();
            _this.expressTip = null;
            _this.expressSection = null;
            _this.configPanelViewModel = null;
            _this.expressPublishButton = null;
            _this.expressFooter = null;
            _this.modal = null;
            _this.publishPanel = null;
            _this.mapMessages = null;
            _this.aboutMessages = null;
            _this.interactivityMessages = null;
            _this.themeLayoutMessages = null;
            _this.viewModel = new ExpressViewModel();
            _this.publishPanelIsOpen = false;
            return _this;
        }
        Express.prototype.postInitialize = function () {
            var _this = this;
            this.viewModel.expressSections.addMany([
                new ExpressSectionItem({
                    title: this.mapMessages.map,
                    subtitle: this.mapMessages.mapSubsection,
                    type: "map",
                    tip: this.mapMessages.generalTip,
                    settings: new Collection_1.default([
                        {
                            type: "itemBrowser"
                        }
                    ])
                }),
                new ExpressSectionItem({
                    title: this.aboutMessages.about,
                    subtitle: this.aboutMessages.aboutSubsection,
                    type: "about",
                    tip: this.aboutMessages.tip,
                    settings: new Collection_1.default()
                }),
                new ExpressSectionItem({
                    title: this.themeLayoutMessages.themeAndLayout,
                    subtitle: this.themeLayoutMessages.themeSubsection,
                    type: "themeLayout",
                    tip: this.themeLayoutMessages.tip,
                    settings: new Collection_1.default()
                }),
                new ExpressSectionItem({
                    title: this.interactivityMessages.interactivity,
                    subtitle: this.interactivityMessages.interactivitySubsection,
                    type: "interactivity",
                    tip: this.interactivityMessages.tip,
                    settings: new Collection_1.default()
                })
            ]);
            this.own([
                watchUtils_1.watch(this, "subsectionJSON", function () {
                    _this.set("configPanelViewModel.tipsMap", new Map());
                }),
                watchUtils_1.whenOnce(this, "configPanelViewModel.expressMessages", function () {
                    _this.expressTip = _this.configPanelViewModel.expressMessages.tip;
                }),
                watchUtils_1.when(this, "expressSection.settings.length", function () { return _this.scheduleRender(); })
            ]);
            this._expressSectionCollectionHandles.add(watchUtils_1.on(this, "viewModel.expressSections", "after-add", function () {
                _this.viewModel.expressSections.forEach(function (section) {
                    var type = section.type;
                    if (_this._expressSectionCollectionHandles.has(type)) {
                        _this._expressSectionCollectionHandles.remove(type);
                    }
                    _this._expressSectionCollectionHandles.add(watchUtils_1.on(section, "settings", "after-changes", function () {
                        var _a;
                        if (((_a = _this.expressSection) === null || _a === void 0 ? void 0 : _a.type) === type) {
                            _this.expressSection = section;
                        }
                        _this.scheduleRender();
                    }), type);
                });
            }));
        };
        Express.prototype.destroy = function () {
            this._expressSectionCollectionHandles.removeAll();
            this._expressSectionCollectionHandles.destroy();
            this._expressSectionCollectionHandles = null;
        };
        Express.prototype.render = function () {
            var _a;
            var header = this._renderHeader();
            var alert = this._renderAlert();
            var footer = this._renderFooter();
            var nextBackButtons = !this.configPanelViewModel.flowSettingsUI.content
                ? this._renderNextBackButtons()
                : null;
            var body = this.expressSection ? (widget_1.tsx("focus-trap", { styles: this.expressSection
                    ? {
                        height: "calc(100% - (" + ((_a = this._badgeNode) === null || _a === void 0 ? void 0 : _a.offsetHeight) + "px + 30px))"
                    }
                    : { height: "100%" } },
                nextBackButtons,
                this._renderExpressPanelBody())) : (this._renderSubsectionBody());
            var badge = this._renderBadge();
            return [header, body, badge, alert, footer];
        };
        Express.prototype._renderHeader = function () {
            var _a, _b;
            var darkModeEnabled = this.configPanelViewModel.darkModeEnabled;
            var darkHeader = (_a = {},
                _a[CSS.darkModeHeader] = darkModeEnabled,
                _a);
            var darkTitle = (_b = {},
                _b[CSS.darkModeTitle] = darkModeEnabled,
                _b);
            return (widget_1.tsx("div", { class: this.classes(CSS.shellPanelHeader, darkHeader), slot: "header-content" },
                widget_1.tsx("h2", { class: this.classes(CSS.shellPanelHeaderText, darkTitle) }, this.expressSection
                    ? this.expressSection.title
                    : this.configPanelViewModel.expressMessages.title),
                widget_1.tsx("div", { class: CSS.subHeaderContainer },
                    widget_1.tsx("p", { class: this.classes(CSS.shellPanelSubheaderText, darkTitle) }, this.expressSection
                        ? this.expressSection.subtitle
                        : this.configPanelViewModel.expressMessages.subtitle),
                    this._renderHeaderPopoverButton())));
        };
        Express.prototype._renderHeaderPopoverButton = function () {
            if (!this.configPanelViewModel.expressHeaderPopoverButton) {
                this.configPanelViewModel.expressHeaderPopoverButton = (widget_1.tsx("button", { id: "expressHeaderPopover" },
                    widget_1.tsx("calcite-icon", { icon: icons_1.default.lightbulb, scale: "m" })));
            }
            return this.configPanelViewModel.expressHeaderPopoverButton;
        };
        Express.prototype._renderSubsectionBody = function () {
            var _a;
            var subsections = this._renderSubsections();
            var subsectionNotSelected = (_a = {},
                _a[CSS.subsectionNotSelected] = !this.expressSection,
                _a);
            return (widget_1.tsx("div", { key: "express-subsection-body", class: this.classes(CSS.expressSubsections, subsectionNotSelected) },
                widget_1.tsx("div", { class: "esri-config-panel__settings-panel-container" }, subsections)));
        };
        Express.prototype._renderExpressPanelBody = function () {
            var _a;
            var _b;
            var expressPanelComponent = this._renderExpressPanelComponent();
            var subsectionNotSelected = (_a = {},
                _a[CSS.subsectionNotSelected] = !this.expressSection,
                _a);
            return (widget_1.tsx("div", { key: "express-panel-body", class: this.classes(CSS.expressSubsections, subsectionNotSelected) },
                widget_1.tsx("calcite-flow", null,
                    widget_1.tsx("calcite-panel", null,
                        widget_1.tsx("div", { class: "esri-config-panel__settings-panel-container" }, this.expressSection ? expressPanelComponent : null)),
                    this.configPanelViewModel.flowSettingsUI.content
                        ? (_b = this.viewModel.configPanelViewModel.flowSettingsUI) === null || _b === void 0 ? void 0 : _b.render() : null)));
        };
        Express.prototype._renderBadge = function () {
            var _a, _b, _c;
            return (widget_1.tsx("div", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_badgeNode", key: "express-setup-badge", class: CSS.expressSetupBadge, styles: {
                    position: "absolute",
                    bottom: ((_a = this.expressFooter) === null || _a === void 0 ? void 0 : _a.offsetHeight) + 15 + "px"
                } }, (_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.badge) === null || _c === void 0 ? void 0 : _c.render()));
        };
        Express.prototype._renderAlert = function () {
            var _a, _b, _c;
            var alertStyles = {
                position: "absolute",
                bottom: ((_a = this.expressFooter) === null || _a === void 0 ? void 0 : _a.offsetHeight) + 20 + "px",
                zIndex: "1"
            };
            return (widget_1.tsx("div", { key: "expressSetupAlert", styles: alertStyles }, (_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.alert) === null || _c === void 0 ? void 0 : _c.render()));
        };
        Express.prototype._renderExpressPanelComponent = function () {
            var _a;
            var _b;
            var componentsContainerDark = (_a = {},
                _a[CSS.primaryPanelComponentsContainerDark] = this.configPanelViewModel
                    .darkModeEnabled,
                _a);
            var expressSections = this.viewModel.expressSections;
            var index = expressSections.indexOf(this.expressSection) + 1;
            var components = this._renderComponents();
            return (widget_1.tsx("div", { class: this.classes(CSS.primaryPanelComponentsContainer, componentsContainerDark) },
                widget_1.tsx("div", { key: "panel-component-header-" + index, class: CSS.panelComponentHeader },
                    widget_1.tsx("h3", { class: CSS.stepText }, this.configPanelViewModel.expressMessages.step + " " + index + " | " + ((_b = this.configPanelViewModel.expressMessages) === null || _b === void 0 ? void 0 : _b.title))),
                components));
        };
        Express.prototype._renderComponents = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var map = this.configPanelViewModel.sections.find(function (item) { return item.type === "map"; });
            switch ((_a = this.expressSection) === null || _a === void 0 ? void 0 : _a.type) {
                case "map":
                    return (widget_1.tsx("div", { key: "item-browser-preview" }, map === null || map === void 0 ? void 0 : map.renderItemBrowserPreview()));
                default:
                    return (_d = (_c = (_b = this.expressSection) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.toArray()) === null || _d === void 0 ? void 0 : _d.map(function (configurationSetting) {
                        return _this.configPanelViewModel.configSettings.processComponent(configurationSetting);
                    });
            }
        };
        Express.prototype._renderNextBackButtons = function () {
            var _a, _b;
            var nextBackDark = (_a = {},
                _a[CSS.nextBackDark] = this.configPanelViewModel.darkModeEnabled,
                _a);
            var backButtonDark = (_b = {},
                _b[CSS.backButtonDark] = this.configPanelViewModel.darkModeEnabled,
                _b);
            var expressSections = this.viewModel.expressSections;
            var isNotLastStep = expressSections.indexOf(this.expressSection) !==
                expressSections.length - 1;
            var nextButton = isNotLastStep ? this._renderNextButton() : null;
            var direction = this.configPanelViewModel.appConfig.direction;
            var chevronLeft = icons_1.default.chevronLeft, chevronRight = icons_1.default.chevronRight;
            var arrow = direction === "rtl" ? chevronRight : chevronLeft;
            return (widget_1.tsx("div", { key: "express-next-back", class: this.classes(CSS.nextBack, nextBackDark) },
                widget_1.tsx("button", { bind: this, onclick: this._goBackToHome, class: this.classes(CSS.backButton, backButtonDark), id: "expressBackButton" },
                    widget_1.tsx("calcite-icon", { icon: arrow, scale: "s" }),
                    this.configPanelViewModel.expressMessages.back),
                nextButton));
        };
        Express.prototype._renderNextButton = function () {
            var _a;
            var direction = this.configPanelViewModel.appConfig.direction;
            var chevronLeft = icons_1.default.chevronLeft, chevronRight = icons_1.default.chevronRight;
            var arrow = direction === "rtl" ? chevronLeft : chevronRight;
            var nextButtonDark = (_a = {},
                _a[CSS.nextButtonDark] = this.configPanelViewModel.darkModeEnabled,
                _a);
            return (widget_1.tsx("button", { bind: this, onclick: this._nextStep, class: this.classes(CSS.nextButton, nextButtonDark) },
                this.configPanelViewModel.expressMessages.next,
                widget_1.tsx("calcite-icon", { icon: arrow, scale: "s" })));
        };
        Express.prototype._renderSubsections = function () {
            var _this = this;
            var _a;
            return (widget_1.tsx("ol", { styles: {
                    marginBottom: ((_a = this._badgeNode) === null || _a === void 0 ? void 0 : _a.offsetHeight) + "px"
                }, class: CSS.expressSectionsMenu, role: "menu" }, this.viewModel.expressSections
                .toArray()
                .map(function (subsection, subsectionIndex) {
                return _this._renderSubsection(subsection, subsectionIndex);
            })));
        };
        Express.prototype._renderSubsection = function (subsection, subsectionIndex) {
            var _a, _b, _c;
            var _this = this;
            var darkModeEnabled = this.configPanelViewModel.darkModeEnabled;
            var darkModeTitle = (_a = {},
                _a[CSS.subsectionTitleDark] = darkModeEnabled,
                _a);
            var darkModeSummary = (_b = {},
                _b[CSS.subsectionSummaryDark] = darkModeEnabled,
                _b);
            var darkModeIcon = (_c = {},
                _c[CSS.iconDark] = darkModeEnabled,
                _c);
            var chevronLeft = icons_1.default.chevronLeft, chevronRight = icons_1.default.chevronRight;
            var direction = this.configPanelViewModel.appConfig.direction;
            var arrow = direction === "rtl" ? chevronLeft : chevronRight;
            return (widget_1.tsx("li", { bind: this, onclick: this._openExpressSubsection, onkeydown: function (e) {
                    if (e.code === "Space" || e.code === "Enter") {
                        _this._openExpressSubsection(e);
                        return;
                    }
                    if (_this.viewModel.expressSections.length - 1 === subsectionIndex) {
                        if (e.code === "Tab") {
                            if (!e.shiftKey) {
                                focusUtils_1.focusNode("full");
                            }
                        }
                    }
                }, class: CSS.subsection, "data-section-key": subsection.type, tabindex: "0", role: "menuitem", id: "expressStep" + subsection.type },
                widget_1.tsx("div", { class: CSS.subsectionContentContainer },
                    widget_1.tsx("div", { class: CSS.subsectionTextContainer },
                        widget_1.tsx("p", { class: this.classes(CSS.subsectionTitle, darkModeTitle) }, this.configPanelViewModel.expressMessages.step + " ",
                            subsectionIndex + 1,
                            ". ",
                            subsection.title),
                        widget_1.tsx("p", { class: this.classes(CSS.subsectionSummary, darkModeSummary) }, subsection.subtitle)))));
        };
        Express.prototype._renderFooter = function () {
            var _this = this;
            return (widget_1.tsx("div", { key: "express-footer", class: CSS.expressFooter, slot: "footer", bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "expressFooter" },
                widget_1.tsx("calcite-button", { bind: this, onclick: function () {
                        if (localStorage.getItem("exit_doNotShow")) {
                            _this.configPanelViewModel.goToItemPage();
                        }
                        else {
                            _this._openModal("exit");
                        }
                    }, class: CSS.primaryPanelFooterButton, appearance: "outline" },
                    widget_1.tsx("span", { class: CSS.footerButtonText }, this.configPanelViewModel.expressMessages.exit)),
                widget_1.tsx("calcite-button", { key: "express-publish", bind: this, onclick: this._togglePublish, afterCreate: widget_1.storeNode, "data-node-ref": "expressPublishButton", class: CSS.primaryPanelFooterButton, "data-button-type": "publish", id: "expressPublishFooterButton" },
                    widget_1.tsx("span", { class: CSS.footerButtonText, "data-button-type": "publish" }, this.configPanelViewModel.expressMessages.publish))));
        };
        Express.prototype._nextStep = function () {
            var expressSections = this.viewModel.expressSections;
            if (expressSections.indexOf(this.expressSection) ===
                expressSections.length - 1) {
                return;
            }
            var index = expressSections.indexOf(this.expressSection);
            this.expressSection = expressSections.getItemAt(index + 1);
            this.scheduleRender();
        };
        Express.prototype._openExpressSubsection = function (e) {
            var _this = this;
            var node = e.currentTarget;
            var key = node.getAttribute("data-section-key");
            focusUtils_1.focusNode("expressBackButton");
            var openExpressSubsectionKey = "openExpressSubsectionKey";
            this._expressSectionCollectionHandles.add(watchUtils_1.whenOnce(this, "viewModel.expressSections.length", function () {
                if (_this._expressSectionCollectionHandles.has(openExpressSubsectionKey)) {
                    _this._expressSectionCollectionHandles.remove(openExpressSubsectionKey);
                }
                _this.expressSection = _this.viewModel.expressSections.find(function (item) { return item.type === key; });
            }), openExpressSubsectionKey);
        };
        Express.prototype._goBackToHome = function () {
            var expressSectionType = this.expressSection.type;
            this.expressSection = null;
            focusUtils_1.focusNode("expressStep" + expressSectionType);
            this.scheduleRender();
        };
        Express.prototype._togglePublish = function (event) {
            var node = event.target;
            if (node.disabled) {
                return;
            }
            if (this.publishPanelIsOpen) {
                this.publishPanelIsOpen = false;
                this.publishPanel.open = false;
                this.expressSection = null;
            }
            else {
                this.publishPanelIsOpen = true;
                this.publishPanel.open = true;
            }
            var targetElement = event.target;
            var openButtonType = targetElement.getAttribute("data-button-type");
            this.publishPanel.share.openButtonType = openButtonType;
            this.scheduleRender();
        };
        Express.prototype._openModal = function (modalId) {
            this.modal.set("modalId", modalId);
            this.modal.open();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Express.prototype, "expressTip", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("configPanelViewModel.expressSection"),
            decorators_1.property()
        ], Express.prototype, "expressSection", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel"),
            decorators_1.property()
        ], Express.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("configPanelViewModel.expressPublishButton")
        ], Express.prototype, "expressPublishButton", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("configPanelViewModel.expressFooter")
        ], Express.prototype, "expressFooter", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("configPanelViewModel.modal")
        ], Express.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Express.prototype, "publishPanel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.mapMessages"),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/Map/resources")
        ], Express.prototype, "mapMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.aboutMessages"),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/About/resources")
        ], Express.prototype, "aboutMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.interactivityMessages"),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/Interactivity/resources")
        ], Express.prototype, "interactivityMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.themeLayoutMessages"),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/Theme/resources")
        ], Express.prototype, "themeLayoutMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ExpressViewModel
            })
        ], Express.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Express.prototype, "publishPanelIsOpen", void 0);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], Express.prototype, "_openExpressSubsection", null);
        Express = tslib_1.__decorate([
            decorators_1.subclass("Express")
        ], Express);
        return Express;
    }(Widget_1.default));
    return Express;
});
