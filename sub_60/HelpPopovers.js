define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/reactiveUtils", "../../../utils/utils", "./HelpIndicators", "../../../utils/focusUtils"], function (require, exports, tslib_1, decorators_1, Widget_1, widget_1, reactiveUtils_1, utils_1, HelpIndicators, focusUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var HelpPopovers = (function (_super) {
        tslib_1.__extends(HelpPopovers, _super);
        function HelpPopovers(props) {
            var _this = _super.call(this, props) || this;
            _this._focusMap = {
                webAnalytics: "webAnalyticsHelp",
                expressSwitch: "expressSwitch",
                searchSettings: "searchSettingsHelp",
                views: "views",
                extentSelector: "extentSelectorHelp",
                positionManager: "positionManagerHelp",
                search: "searchHelp",
                shareLevel: "shareLevelHelp",
                customTheme: "customThemeHelp"
            };
            return _this;
        }
        HelpPopovers.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var generalPopoversNode, onboardingPopoversNode;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { return _this.generalPopoversNode; })];
                        case 1:
                            generalPopoversNode = _a.sent();
                            generalPopoversNode.beforeOpen = this._beforeOpenCallback();
                            return [4, reactiveUtils_1.whenOnce(function () { return _this.onboardingPopoversNode; })];
                        case 2:
                            onboardingPopoversNode = _a.sent();
                            onboardingPopoversNode.beforeOpen = this._beforeOpenCallback();
                            this.helpIndicators = new HelpIndicators({
                                onboardingPopoversNode: this.onboardingPopoversNode,
                                generalPopoversNode: this.generalPopoversNode,
                                helpViewModel: this.help.viewModel
                            });
                            this._createObserver();
                            onboardingPopoversNode.addEventListener("calcitePopoverOpen", this.focusNodeCallback());
                            generalPopoversNode.addEventListener("calcitePopoverOpen", this.focusNodeCallback());
                            return [2];
                    }
                });
            });
        };
        HelpPopovers.prototype._beforeOpenCallback = function () {
            var _this = this;
            return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.help.handleGoTo(this.help.currentHelpItemId)];
                        case 1:
                            _a.sent();
                            this.help.currentHelpItemId = null;
                            return [2, Promise.resolve()];
                    }
                });
            }); };
        };
        HelpPopovers.prototype.renderOnboardingPopovers = function () {
            var _this = this;
            var popoverInfos = this.help.viewModel.helpJSON.onboarding
                .filter(function (id) {
                var helpInfoIndex = _this.help.viewModel.allHelpInfos.findIndex(function (infoItem) { return infoItem.id === id; });
                return helpInfoIndex !== -1;
            })
                .map(function (id) {
                var helpInfo = _this.help.viewModel.allHelpInfos.find(function (infoItem) { return infoItem.id === id; });
                return _this.renderOnboardingPopover(helpInfo);
            });
            return popoverInfos.length > 0 ? (widget_1.tsx("instant-apps-popovers", { key: "onboarding-popovers", bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "onboardingPopoversNode", pagination: "true" },
                widget_1.tsx("div", { slot: "popovers" }, popoverInfos))) : null;
        };
        HelpPopovers.prototype.renderOnboardingPopover = function (helpInfo) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            var id = helpInfo.id, title = helpInfo.title, subtitle = helpInfo.subtitle, description = helpInfo.description, imgSrc = helpInfo.imgSrc, imgAlt = helpInfo.imgAlt;
            var theme = utils_1.getTheme(this.help.configPanelViewModel.darkModeEnabled);
            return (widget_1.tsx("instant-apps-popover", { bind: this, key: "helpPopover-" + id, class: theme === "dark" ? "calcite-theme-dark" : "", "ref-id": id, "popover-title": title, subtitle: subtitle, content: description, afterUpdate: function (node) {
                    node.popoverAction = function () { return _this.help.backToHelp(id); };
                    var interval = setInterval(function () {
                        var _a;
                        var node = document.getElementById(id + "Help");
                        if (!((_a = _this.onboardingPopoversNode) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers))
                            return;
                        var iacPopover = _this.onboardingPopoversNode.instantAppsPopovers.get(id);
                        if (iacPopover)
                            iacPopover.referenceElement = node;
                        if (node && iacPopover)
                            clearInterval(interval);
                    }, 500);
                }, "intl-popover-action": (_c = (_b = (_a = this.help) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.navigation) === null || _c === void 0 ? void 0 : _c.backToLearningCenter, "intl-of": (_f = (_e = (_d = this.help) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e.misc) === null || _f === void 0 ? void 0 : _f.of, "img-src": imgSrc, "img-alt": imgAlt }));
        };
        HelpPopovers.prototype.renderGeneralPopovers = function () {
            var _this = this;
            var popoverInfos = this.help.viewModel.allHelpInfos
                .toArray()
                .filter(function (item) { return _this.help.viewModel.helpJSON.onboarding.indexOf(item.id) === -1; })
                .map(function (helpInfo) { return _this.renderGeneralPopover(helpInfo); });
            return popoverInfos.length > 0 ? (widget_1.tsx("instant-apps-popovers", { key: "general-popovers", bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "generalPopoversNode", pagination: "true" },
                widget_1.tsx("div", { slot: "popovers" }, popoverInfos))) : null;
        };
        HelpPopovers.prototype.renderGeneralPopover = function (helpInfo) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            var id = helpInfo.id, title = helpInfo.title, subtitle = helpInfo.subtitle, description = helpInfo.description, imgSrc = helpInfo.imgSrc, imgAlt = helpInfo.imgAlt;
            var theme = utils_1.getTheme(this.help.configPanelViewModel.darkModeEnabled);
            return (widget_1.tsx("instant-apps-popover", { bind: this, key: "helpPopover-" + id, class: theme === "dark" ? "calcite-theme-dark" : "", "ref-id": id, "popover-title": title, subtitle: subtitle, content: description, afterUpdate: function (node) {
                    node.popoverAction = function () { return _this.help.backToHelp(id); };
                    var interval = setInterval(function () {
                        var _a;
                        var node = document.getElementById(id + "Help");
                        if (node && _this.observer)
                            _this.observer.observe(node);
                        if (!((_a = _this.generalPopoversNode) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers))
                            return;
                        var iacPopover = _this.generalPopoversNode.instantAppsPopovers.get(id);
                        if (iacPopover)
                            iacPopover.referenceElement = node;
                        if (node && iacPopover)
                            clearInterval(interval);
                    }, 500);
                }, "intl-popover-action": (_c = (_b = (_a = this.help) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.navigation) === null || _c === void 0 ? void 0 : _c.backToLearningCenter, "intl-of": (_f = (_e = (_d = this.help) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e.misc) === null || _f === void 0 ? void 0 : _f.of, "img-src": imgSrc, "img-alt": imgAlt }));
        };
        HelpPopovers.prototype._createObserver = function () {
            var _this = this;
            var options = {
                root: document.body,
                rootMargin: "0px",
                threshold: 1.0
            };
            var observer = new IntersectionObserver(function (entries) {
                var item = Array.from(entries)[0];
                var node = item.target;
                var id = node.id;
                var calloutId = id.split("Help")[0];
                var indicatorData = _this.helpIndicators.indicatorData;
                if (indicatorData && !indicatorData.hasOwnProperty(calloutId)) {
                    var generalPopover = _this.generalPopoversNode.instantAppsPopovers.get(calloutId);
                    if (generalPopover)
                        generalPopover.disableAction = true;
                    var onboardingPopover = _this.onboardingPopoversNode.instantAppsPopovers.get(calloutId);
                    if (onboardingPopover)
                        onboardingPopover.disableAction = true;
                    _this.generalPopoversNode.open(calloutId);
                }
            }, options);
            this._set("observer", observer);
        };
        HelpPopovers.prototype.focusNodeCallback = function () {
            var _this = this;
            return function (e) {
                var iacPopoverNode = e.target;
                var refId = iacPopoverNode.getAttribute("ref-id");
                setTimeout(function () { return focusUtils_1.focusNode(_this._focusMap[refId]); }, 10);
            };
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], HelpPopovers.prototype, "observer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpPopovers.prototype, "onboardingPopoversNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpPopovers.prototype, "generalPopoversNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpPopovers.prototype, "help", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpPopovers.prototype, "helpIndicators", void 0);
        HelpPopovers = tslib_1.__decorate([
            decorators_1.subclass("ConfigPanel.ConfigPanelViewModel.Help.HelpPopovers")
        ], HelpPopovers);
        return HelpPopovers;
    }(Widget_1.default));
    return HelpPopovers;
});
