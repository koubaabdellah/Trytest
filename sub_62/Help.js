define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/reactiveUtils", "esri/widgets/Widget", "esri/widgets/support/widget", "./Help/HelpViewModel", "../../icons/icons", "../../enums/keys", "../../utils/focusUtils", "./Help/HelpTour", "./Help/HelpPopovers", "./Help/HelpSearch"], function (require, exports, tslib_1, decorators_1, reactiveUtils_1, Widget_1, widget_1, HelpViewModel, icons_1, keys_1, focusUtils_1, HelpTour_1, HelpPopovers_1, HelpSearch) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importStar(icons_1);
    HelpTour_1 = tslib_1.__importDefault(HelpTour_1);
    HelpPopovers_1 = tslib_1.__importDefault(HelpPopovers_1);
    var BASE = "esri-config-panel-help";
    var CSS = {
        base: "" + BASE,
        header: BASE + "__header",
        singlePanelContainer: BASE + "__single-panel",
        subtitle: BASE + "__subtitle",
        indicator: BASE + "__indicator",
        indicatorSeen: BASE + "__indicator--seen",
        info: {
            container: BASE + "__info",
            backContainer: BASE + "__info-back-container",
            header: BASE + "__info-header",
            graphic: BASE + "__info-graphic",
            content: BASE + "__info-content",
            subtitle: BASE + "__info-subtitle",
            description: BASE + "__info-description",
            footer: BASE + "__info-footer"
        }
    };
    var Help = (function (_super) {
        tslib_1.__extends(Help, _super);
        function Help(props) {
            var _this = _super.call(this, props) || this;
            _this._currentCategoryIndex = 0;
            _this.currentHelpItemId = null;
            _this.configPanelViewModel = null;
            _this.helpHasEventListeners = false;
            _this.viewModel = new HelpViewModel();
            return _this;
        }
        Help.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { var _a, _b; return (_b = (_a = _this.viewModel) === null || _a === void 0 ? void 0 : _a.helpCategoryItems) === null || _b === void 0 ? void 0 : _b.length; })];
                        case 1:
                            _a.sent();
                            return [4, reactiveUtils_1.whenOnce(function () { return _this.messages; })];
                        case 2:
                            _a.sent();
                            this._setupPopovers();
                            this._setupTour();
                            this._setupSearch();
                            return [2];
                    }
                });
            });
        };
        Help.prototype._setupPopovers = function () {
            this.helpPopovers = new HelpPopovers_1.default({ help: this });
            this.scheduleRender();
        };
        Help.prototype._setupTour = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var onboardingPopovers;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { return _this.onboardingPopoversNode; })];
                        case 1:
                            onboardingPopovers = _a.sent();
                            new HelpTour_1.default({
                                onboardingPopovers: onboardingPopovers
                            });
                            this.scheduleRender();
                            return [2];
                    }
                });
            });
        };
        Help.prototype._setupSearch = function () {
            var _this = this;
            this.helpSearch = new HelpSearch({
                messages: this.messages,
                helpViewModel: this.viewModel
            });
            this.own(reactiveUtils_1.watch(function () { return _this.itemId; }, function () {
                if (_this.categoryType && _this.itemId) {
                    _this._updateCategoryIndex(_this.categoryType);
                    _this._openHelpInfoContent(_this.itemId);
                }
            }));
            this.scheduleRender();
        };
        Help.prototype.render = function () {
            var _a, _b;
            var title = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.title;
            var main = this._renderMain();
            return [
                widget_1.tsx("div", { key: "help-header-content", class: CSS.header, slot: "header-content" },
                    widget_1.tsx("h3", null, title)),
                (_b = this.helpSearch) === null || _b === void 0 ? void 0 : _b.render(),
                main
            ];
        };
        Help.prototype._renderMain = function () {
            var uiType = this.viewModel.uiType;
            var content = uiType
                ? uiType === "single"
                    ? this._renderSingle()
                    : this._renderMulti()
                : null;
            return this.currentHelpItemId ? this._renderHelpInfoContent() : content;
        };
        Help.prototype._renderSingle = function () {
            var _a = this, messages = _a.messages, viewModel = _a.viewModel;
            var helpCategoryItems = viewModel.helpCategoryItems;
            var content = helpCategoryItems.getItemAt(0);
            var infos = content.infos, type = content.type;
            var TYPE_T9N = messages.types[type];
            var label = TYPE_T9N.label, subtitle = TYPE_T9N.subtitle;
            return (widget_1.tsx("div", { key: "help-single-panel", class: CSS.singlePanelContainer },
                widget_1.tsx("h4", null, label),
                widget_1.tsx("span", { class: CSS.subtitle }, subtitle),
                this._renderHelpItemInfosList(infos)));
        };
        Help.prototype._renderMulti = function () {
            var _this = this;
            var helpItemInfos = this.viewModel
                .helpCategoryItems.toArray();
            var titles = helpItemInfos.map(function (helpCategory, helpInfoIndex) {
                var type = helpCategory.type;
                var TYPE_T9N = _this.messages.types[type];
                return (widget_1.tsx("calcite-tab-title", { key: type + "-tab-title", id: helpCategory.type + "TabTitle", onkeydown: function (e) {
                        var code = e.code;
                        var Enter = keys_1.KeyCodes.Enter, Space = keys_1.KeyCodes.Space;
                        if (code === Enter || code === Space) {
                            _this._updateCategoryIndex(helpCategory.type);
                        }
                    }, onclick: _this._updateCategoryIndex.bind(_this, helpCategory.type), active: _this._currentCategoryIndex === helpInfoIndex ? true : false }, TYPE_T9N.label));
            });
            var content = helpItemInfos.map(function (helpInfo, helpInfoIndex) {
                var type = helpInfo.type, infos = helpInfo.infos;
                var TYPE_T9N = _this.messages.types[type];
                var subtitle = TYPE_T9N.subtitle;
                return (widget_1.tsx("calcite-tab", { key: type + "-tab-content", active: _this._currentCategoryIndex === helpInfoIndex ? true : false },
                    widget_1.tsx("span", { class: CSS.subtitle }, subtitle),
                    _this._renderHelpItemInfosList(infos)));
            });
            return (widget_1.tsx("calcite-tabs", { key: "help-multi-panel", layout: "center" },
                widget_1.tsx("calcite-tab-nav", { slot: "tab-nav" }, titles),
                content));
        };
        Help.prototype._renderHelpItemInfosList = function (infos) {
            var _this = this;
            var infosArr = infos.toArray();
            return (widget_1.tsx("calcite-list", null, infosArr.map(function (helpItemInfo, helpItemInfoIndex) {
                return _this._renderHelpItemInfoListItem(helpItemInfo, helpItemInfoIndex);
            })));
        };
        Help.prototype._renderHelpItemInfoListItem = function (helpItemInfo, helpItemInfoIndex) {
            var _this = this;
            var _a, _b;
            var title = helpItemInfo.title;
            var chevronRight = icons_1.default.chevronRight;
            var indicator = this._renderIndicator(helpItemInfo.title, helpItemInfo.id);
            return (widget_1.tsx("calcite-list-item", { id: helpItemInfo.id + "HelpListItem", onkeydown: function (e) {
                    var _a;
                    var code = e.code;
                    var Enter = keys_1.KeyCodes.Enter, Space = keys_1.KeyCodes.Space, Tab = keys_1.KeyCodes.Tab;
                    if (code === Enter || code === Space) {
                        _this._openHelpInfoContent.bind(_this, helpItemInfo.id);
                    }
                    else if (code === Tab && !e.shiftKey) {
                        var category = _this.viewModel.helpCategoryItems.getItemAt(_this._currentCategoryIndex);
                        if (helpItemInfoIndex === category.infos.length - 1) {
                            var nextCategoryType = (_a = _this.viewModel.helpCategoryItems.getItemAt(_this._currentCategoryIndex + 1)) === null || _a === void 0 ? void 0 : _a.type;
                            if (nextCategoryType) {
                                focusUtils_1.focusNode(nextCategoryType + "TabTitle");
                            }
                            else {
                                focusUtils_1.focusNode("share");
                            }
                        }
                    }
                }, onclick: this._openHelpInfoContent.bind(this, helpItemInfo.id), label: title },
                indicator,
                widget_1.tsx("calcite-icon", { slot: "content-end", icon: ((_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.appConfig) === null || _b === void 0 ? void 0 : _b.direction) === "ltr"
                        ? chevronRight
                        : icons_1.chevronLeft, scale: "s" })));
        };
        Help.prototype._renderIndicator = function (label, helpId) {
            var _a;
            var _b, _c, _d;
            var seen = (_d = (_c = (_b = this.helpPopovers) === null || _b === void 0 ? void 0 : _b.helpIndicators) === null || _c === void 0 ? void 0 : _c.indicatorData) === null || _d === void 0 ? void 0 : _d.hasOwnProperty(helpId);
            var indicatorSeen = (_a = {},
                _a[CSS.indicatorSeen] = seen,
                _a);
            var indicatorNode = (widget_1.tsx("span", { key: "indicator-" + helpId, class: this.classes(CSS.indicator, indicatorSeen), slot: "content-start", role: "presentation", "aria-label": seen
                    ? "Seen Get started info for '" + label + "'."
                    : "Not seen Get started info for '" + label + "'." }));
            return indicatorNode;
        };
        Help.prototype._renderHelpInfoContent = function () {
            var _this = this;
            var _a;
            var helpInfo = this.viewModel.getHelpInfo(this._currentCategoryIndex, this.currentHelpItemId);
            if (!helpInfo)
                return;
            var title = helpInfo.title, subtitle = helpInfo.subtitle, description = helpInfo.description, imgSrc = helpInfo.imgSrc, imgAlt = helpInfo.imgAlt, id = helpInfo.id;
            var NAV_T9N = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.navigation;
            var back = NAV_T9N === null || NAV_T9N === void 0 ? void 0 : NAV_T9N.back;
            var goTo = NAV_T9N === null || NAV_T9N === void 0 ? void 0 : NAV_T9N.goTo;
            return (widget_1.tsx("section", { class: CSS.info.container },
                widget_1.tsx("div", { class: CSS.info.backContainer },
                    widget_1.tsx("calcite-button", { id: "helpBackButton", onclick: this._goBack.bind(this), appearance: "transparent", color: "neutral", "icon-start": icons_1.default.chevronLeft, "icon-flip-rtl": "start" }, back)),
                widget_1.tsx("header", { class: CSS.info.header },
                    widget_1.tsx("span", null, title)),
                widget_1.tsx("article", { key: "content-article", class: CSS.info.content },
                    widget_1.tsx("span", { class: CSS.info.subtitle }, subtitle),
                    widget_1.tsx("span", { class: CSS.info.description }, description),
                    imgSrc ? (widget_1.tsx("article", { key: "media-article-img-" + id, class: CSS.info.graphic },
                        widget_1.tsx("img", { src: imgSrc, alt: imgAlt }))) : null,
                    widget_1.tsx("calcite-link", { onclick: function () {
                            if (_this.viewModel.helpJSON.onboarding.indexOf(id) !== -1) {
                                if (_this.onboardingPopoversNode.inTour)
                                    _this.onboardingPopoversNode.endTour();
                                var popover = _this.onboardingPopoversNode.instantAppsPopovers.get(id);
                                if (popover)
                                    popover.disableAction = false;
                                _this.onboardingPopoversNode.open(id);
                            }
                            else {
                                if (_this.generalPopoversNode.inTour)
                                    _this.generalPopoversNode.endTour();
                                var popover = _this.generalPopoversNode.instantAppsPopovers.get(id);
                                if (popover)
                                    popover.disableAction = false;
                                _this.generalPopoversNode.open(id);
                            }
                        } }, goTo))));
        };
        Help.prototype._openHelpInfoContent = function (id) {
            var _a;
            this.currentHelpItemId = id;
            this.helpPopovers.helpIndicators.indicatorData = tslib_1.__assign(tslib_1.__assign({}, this.helpPopovers.helpIndicators.indicatorData), (_a = {}, _a[id] = 1, _a));
            this.helpPopovers.helpIndicators.updateLocalStorage();
            this.helpPopovers.helpIndicators.handleAllSeen();
            focusUtils_1.focusNode("helpBackButton");
            this.scheduleRender();
        };
        Help.prototype._goBack = function () {
            var id = this.currentHelpItemId;
            focusUtils_1.focusNode(id + "HelpListItem");
            this.currentHelpItemId = null;
            this.scheduleRender();
        };
        Help.prototype._updateCategoryIndex = function (type) {
            var helpCategoryItems = this.viewModel.helpCategoryItems;
            var category = helpCategoryItems.find(function (category) { return category.type === type; });
            var index = helpCategoryItems.indexOf(category);
            this._currentCategoryIndex = index;
            this.scheduleRender();
        };
        Help.prototype.backToHelp = function (id) {
            this.currentHelpItemId = id;
            this.configPanelViewModel.helpIsOpen = true;
            if (this.viewModel.helpJSON.onboarding.indexOf(id) !== -1) {
                this.onboardingPopoversNode.close(id);
            }
            else {
                this.generalPopoversNode.close(id);
            }
        };
        Help.prototype.handleGoTo = function (id) {
            var _a, _b, _c, _d, _e, _f, _g;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var propMap, idToUse, isSetting, isFullSetupOnly;
                var _this = this;
                return tslib_1.__generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            propMap = this.viewModel.getPropMap();
                            idToUse = propMap.hasOwnProperty(id) ? propMap[id] : id;
                            isSetting = !!this.viewModel.configPanelViewModel.allSettings.find(function (setting) { return (setting === null || setting === void 0 ? void 0 : setting.fieldName) === idToUse; });
                            isFullSetupOnly = isSetting &&
                                ((_d = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.viewModel.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.searchSettings) === null || _b === void 0 ? void 0 : _b.viewModel) === null || _c === void 0 ? void 0 : _c.expressLookup) === null || _d === void 0 ? void 0 : _d.indexOf(idToUse)) === -1;
                            if (!(isFullSetupOnly && this.configPanelViewModel.expressEnabled)) return [3, 6];
                            if (!localStorage.getItem("searchSettingsExpress_doNotShow")) return [3, 3];
                            this.configPanelViewModel.switchConfigMode("notFoundSearch");
                            return [4, reactiveUtils_1.whenOnce(function () { var _a; return ((_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.expressEnabled) === false; })];
                        case 1:
                            _h.sent();
                            return [4, this._triggerGoToWorkflow(id)];
                        case 2:
                            _h.sent();
                            return [2, Promise.resolve()];
                        case 3:
                            (_e = this.configPanelViewModel) === null || _e === void 0 ? void 0 : _e.modal.set("modalId", "searchSettingsExpress");
                            (_f = this.configPanelViewModel) === null || _f === void 0 ? void 0 : _f.modal.set("initiator", "notFoundSearch");
                            (_g = this.configPanelViewModel) === null || _g === void 0 ? void 0 : _g.modal.open();
                            return [4, reactiveUtils_1.whenOnce(function () { var _a; return ((_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.expressEnabled) === false; })];
                        case 4:
                            _h.sent();
                            return [4, this._triggerGoToWorkflow(id)];
                        case 5:
                            _h.sent();
                            return [2, Promise.resolve()];
                        case 6: return [4, this._triggerGoToWorkflow(id)];
                        case 7:
                            _h.sent();
                            return [2, Promise.resolve()];
                    }
                });
            });
        };
        Help.prototype._triggerGoToWorkflow = function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.viewModel.configPanelViewModel.helpIsOpen = false;
                            return [4, this._goToSetting(id)];
                        case 1:
                            _a.sent();
                            return [2, Promise.resolve()];
                    }
                });
            });
        };
        Help.prototype._goToSetting = function (id) {
            var _a = this.viewModel.configPanelViewModel, allSettings = _a.allSettings, searchSettings = _a.searchSettings;
            var propMap = this.viewModel.getPropMap();
            var idToUse = propMap.hasOwnProperty(id) ? propMap[id] : id;
            var setting = allSettings.find(function (setting) { return setting.fieldName === idToUse; });
            this.configPanelViewModel.helpIsOpen = false;
            if (setting) {
                var fieldName = setting.fieldName, uiLocation = setting.uiLocation, conditionalField = setting.conditionalField;
                searchSettings.viewModel.goToSetting(uiLocation, fieldName, conditionalField);
            }
            return Promise.resolve();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Help.prototype, "helpPopovers", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("helpPopovers.onboardingPopoversNode")
        ], Help.prototype, "onboardingPopoversNode", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("helpPopovers.generalPopoversNode")
        ], Help.prototype, "generalPopoversNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Help.prototype, "helpSearch", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("helpSearch.categoryType")
        ], Help.prototype, "categoryType", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("helpSearch.itemId")
        ], Help.prototype, "itemId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Help.prototype, "currentHelpItemId", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], Help.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Help.prototype, "helpHasEventListeners", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.messages"),
            widget_1.messageBundle("dist/assets/t9n/widgets/Help/resources")
        ], Help.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Help.prototype, "viewModel", void 0);
        Help = tslib_1.__decorate([
            decorators_1.subclass("Help")
        ], Help);
        return Help;
    }(Widget_1.default));
    return Help;
});
