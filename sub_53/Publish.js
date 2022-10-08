define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Handles", "esri/widgets/Widget", "esri/widgets/support/widget", "../Share/Share", "../../icons/icons", "esri/core/watchUtils", "../Proxy/Proxy", "../../utils/utils", "../../utils/focusUtils", "TemplatesCommonLib/structuralFunctionality/a11yUtils"], function (require, exports, tslib_1, decorators_1, Handles, Widget_1, widget_1, Share, icons_1, watchUtils_1, Proxy_1, utils_1, focusUtils_1, a11yUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-config-panel-publish",
        header: "esri-config-panel-publish__header",
        headerText: "esri-config-panel-publish__header-text",
        closeIconButton: "esri-config-panel-publish__close-icon-button",
        body: "esri-config-panel-publish__body",
        message: "esri-config-panel-publish__message",
        iconContainer: "esri-config-panel-publish__icon-container",
        successMessage: "esri-config-panel-publish__success-message",
        confirmMessage: "esri-config-panel-publish__confirm-message",
        footer: "esri-config-panel-publish__footer",
        primaryPanelFooterButton: "esri-config-panel__primary-panel-footer-button",
        footerButtonText: "esri-config-panel__footer-button-text",
        icon: "esri-config-panel-publish__icon",
        publishIcon: "esri-config-panel-publish__publish-icon",
        confirmationIcon: "esri-config-panel-publish__confirmation-icon",
        btn: "btn",
        btnClear: "btn btn-clear",
        publishButton: "esri-config-panel-publish__publish-button",
        closeButton: "esri-config-panel-publish__close-button",
        theme: {
            light: "calcite-theme-light",
            dark: "calcite-theme-dark"
        },
        viewAllSettingsButton: "esri-config-panel-publish__view-all-settings-button",
        expressFooter: "esri-config-panel-publish__express-footer"
    };
    var Publish = (function (_super) {
        tslib_1.__extends(Publish, _super);
        function Publish(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this._proxy = null;
            _this._proxyServices = [];
            _this.configPanelViewModel = null;
            _this.itemIsPublished = false;
            _this.open = false;
            _this.closePublishButton = null;
            _this.shareIsEnabled = false;
            _this.portal = null;
            _this.publishMessages = null;
            _this.shareMessages = null;
            _this.share = new Share({
                publishPanel: _this,
                shareMessages: _this.shareMessages
            });
            return _this;
        }
        Publish.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.when(this, "closePublishButton", function () {
                    _this.closePublishButton.focus();
                }),
                watchUtils_1.when(this, "configPanelViewModel", function () {
                    _this.share.configPanelViewModel = _this.configPanelViewModel;
                }),
                watchUtils_1.whenFalse(this, "open", function () {
                    var openButtonType = _this.share.openButtonType;
                    var expressEnabled = _this.configPanelViewModel.expressEnabled;
                    if (openButtonType === "share") {
                        focusUtils_1.focusNode("shareLevelHelp");
                    }
                    else if (openButtonType === "publish") {
                        if (expressEnabled) {
                            focusUtils_1.focusNode("expressPublishFooterButton");
                        }
                        else {
                            focusUtils_1.focusNode("publishFooterButton");
                        }
                    }
                })
            ]);
        };
        Publish.prototype.render = function () {
            var header = this._renderHeader();
            var body = this._renderBody();
            var footer = this._renderFooter();
            var theme = this.configPanelViewModel.darkModeEnabled
                ? CSS.theme.dark
                : CSS.theme.light;
            return (widget_1.tsx("div", { key: "publish", class: this.classes(CSS.base, theme), role: "dialog", "aria-labelledby": "publishTitle" }, this.shareIsEnabled ? (this.share.render()) : (widget_1.tsx("div", null,
                header,
                body,
                footer))));
        };
        Publish.prototype._renderHeader = function () {
            var disabled = this._disableButton();
            return (widget_1.tsx("header", { class: CSS.header },
                widget_1.tsx("h2", { class: CSS.headerText, id: "publishTitle" }, this.itemIsPublished
                    ? this.publishMessages.success
                    : this.publishMessages.publish),
                widget_1.tsx("button", { bind: this, onclick: this._closePublish, class: CSS.closeIconButton, "aria-label": this.shareMessages.close, title: this.shareMessages.close, afterCreate: widget_1.storeNode, "data-node-ref": "closePublishButton", disabled: disabled },
                    widget_1.tsx("calcite-icon", { icon: icons_1.default.close }))));
        };
        Publish.prototype._renderBody = function () {
            var confirmationMessage = this._renderConfirmationMessage();
            var successMessage = this._renderSuccessMessage();
            return (widget_1.tsx("div", { key: "publish-confirmation-message", class: CSS.body },
                confirmationMessage,
                successMessage));
        };
        Publish.prototype._renderConfirmationMessage = function () {
            var _a, _b, _c, _d;
            var path = this._renderPath();
            return (widget_1.tsx("div", { key: "publish-confirm-message", class: CSS.confirmMessage }, !this.itemIsPublished ? (widget_1.tsx("span", { class: CSS.message },
                this.publishMessages.confirmationMessage,
                widget_1.tsx("div", { class: CSS.iconContainer }, this.configPanelViewModel.state === "publishing" ||
                    (this._proxy && !((_a = this._proxy) === null || _a === void 0 ? void 0 : _a.proxiesDone)) ? (a11yUtils_1.prefersReducedMotion() ? (((_d = (_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.badge) === null || _c === void 0 ? void 0 : _c.badgeMessages) === null || _d === void 0 ? void 0 : _d.publishing) + "...") : (widget_1.tsx("calcite-loader", { active: true }))) : (widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 112 118", class: this.classes(CSS.icon, CSS.confirmationIcon), role: "none", focusable: "false", "aria-hidden": "true" }, path))))) : null));
        };
        Publish.prototype._renderSuccessMessage = function () {
            var path = this._renderPath();
            return (widget_1.tsx("div", { key: "publish-success-message", class: CSS.successMessage, role: "status" }, this.itemIsPublished ? (widget_1.tsx("span", { class: CSS.message },
                this.publishMessages.publishMessage,
                widget_1.tsx("div", { class: CSS.iconContainer },
                    widget_1.tsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 112 118", class: this.classes(CSS.icon, CSS.publishIcon), role: "none", focusable: "false", "aria-hidden": "true" }, path)))) : null));
        };
        Publish.prototype._renderFooter = function () {
            var _a;
            var expressFooter = (_a = {},
                _a[CSS.expressFooter] = this.configPanelViewModel.expressEnabled,
                _a);
            var disabled = this._disableButton();
            return (widget_1.tsx("footer", { class: this.classes(CSS.footer, expressFooter) },
                widget_1.tsx("calcite-button", { bind: this, onclick: this._closePublish, class: CSS.closeButton, appearance: "outline", disabled: disabled },
                    widget_1.tsx("span", { class: CSS.footerButtonText }, this.publishMessages.cancel)),
                widget_1.tsx("calcite-button", { bind: this, onclick: this._publishAndShare, class: CSS.publishButton, disabled: disabled },
                    widget_1.tsx("span", { class: CSS.footerButtonText }, this.publishMessages.confirm))));
        };
        Publish.prototype._closePublish = function () {
            this.set("open", false);
            this.scheduleRender();
        };
        Publish.prototype._publishAndShare = function () {
            var _this = this;
            this._createServicesArr();
            this._proxy = new Proxy_1.Proxy({
                container: this.configPanelViewModel.proxyNode,
                itemRequest: {
                    id: this.configPanelViewModel.appid,
                    portal: {
                        url: utils_1.getBaseUrl(this.portal)
                    }
                },
                services: this._proxyServices,
                darkModeEnabled: this.configPanelViewModel.darkModeEnabled
            });
            this.scheduleRender();
            this._proxy.proxy().then(function (response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                var _c, _d, _e, _f;
                return tslib_1.__generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (!(response === Proxy_1.ProxyResponse.premiumYesOrNo ||
                                response === Proxy_1.ProxyResponse.subscriber)) return [3, 3];
                            _a = this.configPanelViewModel;
                            return [4, this.configPanelViewModel.queryPortalItems(this.configPanelViewModel.appid)];
                        case 1:
                            _a.templateAppItem = _g.sent();
                            _b = this.configPanelViewModel;
                            return [4, this.configPanelViewModel.templateAppItem.fetchData()];
                        case 2:
                            _b.templateAppData = _g.sent();
                            if ((_d = (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.templateAppData) === null || _d === void 0 ? void 0 : _d.draft) {
                                this.configPanelViewModel.draft = (_f = (_e = this.configPanelViewModel) === null || _e === void 0 ? void 0 : _e.templateAppData) === null || _f === void 0 ? void 0 : _f.draft;
                            }
                            this._publish();
                            return [3, 4];
                        case 3:
                            if (response === Proxy_1.ProxyResponse.premiumCancel) {
                                this.itemIsPublished = false;
                                this.shareIsEnabled = false;
                                this.set("open", false);
                                this.scheduleRender();
                            }
                            else {
                                this._publish();
                            }
                            _g.label = 4;
                        case 4: return [2];
                    }
                });
            }); });
        };
        Publish.prototype._publish = function () {
            var _this = this;
            this.configPanelViewModel.publish().then(function () {
                _this.itemIsPublished = true;
                _this.scheduleRender();
                setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.configPanelViewModel.shareLevel;
                                return [4, this.configPanelViewModel.shareLevel.checkForGroups(this.configPanelViewModel.templateAppItem)];
                            case 1:
                                _a.itemHasGroups = _b.sent();
                                this.shareIsEnabled = true;
                                this._proxy = null;
                                this.scheduleRender();
                                return [2];
                        }
                    });
                }); }, 2500);
            });
        };
        Publish.prototype._renderPath = function () {
            return this.itemIsPublished ? (widget_1.tsx("path", { id: "SVGID_1_", d: "M70,107.5c6-5.6,10.4-12.6,12.9-20.4h14.8C91.2,97,81.4,104.2,70,107.5z M13.9,87.2h14.8\r\nc2.5,7.8,6.9,14.8,12.9,20.4C30.2,104.2,20.4,97,13.9,87.2z M41.6,10.7c-6,5.6-10.4,12.6-12.9,20.4H13.9\r\nC20.4,21.3,30.2,14.1,41.6,10.7z M97.7,31.1H82.9C80.4,23.3,76,16.3,70,10.7C81.4,14.1,91.2,21.3,97.7,31.1z M87.5,57.3\r\nc-0.1-7.6-1.2-15.1-3.4-22.4H100c3.8,6.9,5.9,14.6,6.1,22.4H87.5z M87.5,61h18.6c-0.3,7.9-2.4,15.5-6.1,22.4H84.2\r\nC86.3,76.1,87.4,68.6,87.5,61z M57.7,83.4V61h26.1c-0.1,7.6-1.3,15.1-3.4,22.4H57.7z M57.7,109.4V87.2h21.4\r\nC74.4,99.8,66.6,108.3,57.7,109.4z M53.9,87.2v22.3c-8.9-1.1-16.7-9.6-21.4-22.3H53.9z M27.8,61h26.1v22.4H31.2\r\nC29.1,76.1,27.9,68.6,27.8,61L27.8,61z M24.1,57.3H5.4c0.3-7.9,2.4-15.5,6.1-22.4h15.9C25.3,42.1,24.2,49.7,24.1,57.3L24.1,57.3z\r\nM53.9,34.8v22.4H27.8c0.1-7.6,1.3-15.1,3.4-22.4H53.9z M53.9,8.8v22.3H32.5C37.2,18.5,45,9.9,53.9,8.8z M80.4,34.8\r\nc2.2,7.3,3.3,14.8,3.4,22.4H57.7V34.8H80.4z M57.7,31.1V8.8c8.9,1.1,16.7,9.6,21.4,22.3H57.7z M5.4,61h18.6\r\nc0.1,7.6,1.2,15.1,3.4,22.4H11.6C7.8,76.5,5.7,68.8,5.4,61z M55.8,4.9C25.9,4.9,1.6,29.2,1.6,59.1s24.3,54.2,54.2,54.2\r\nS110,89.1,110,59.1c0-14.4-5.7-28.2-15.9-38.3C84,10.6,70.2,4.9,55.8,4.9z" })) : (widget_1.tsx("path", { id: "SVGID_1_", d: "M48.1,72.9l-3.5-1.6l-9,4.1L29,68.7l4-8.7l-1.3-3.6L22.4,53l0-9.3l9-3.3l1.6-3.5l-4.1-9l6.6-6.6l8.7,4\r\nl3.6-1.3l3.5-9.3l9.3,0l3.3,9l3.5,1.6l9-4.1l6.6,6.6l-4,8.7l1.3,3.6l9.3,3.5l0,9.3l-9,3.3l-1.6,3.5l4.1,9l-6.6,6.6l-8.7-4\r\nl-3.6,1.3l-3.5,9.3l-9.3,0L48.1,72.9z M54.2,77.6l3.8,0l3.2-8.4l6.8-2.5l7.6,3.5l2.7-2.7l-3.7-8.2l3-6.5l7.9-2.9l0-3.8L77,42.9\r\nl-2.5-6.8l3.5-7.6l-2.7-2.7l-8.2,3.7l-6.5-3l-2.9-7.9l-3.8,0l-3.2,8.4L44,29.6l-7.6-3.5l-2.7,2.7l3.7,8.2l-3,6.5l-7.9,2.9l0,3.8\r\nl8.4,3.2l2.5,6.8l-3.5,7.6l2.7,2.7l8.2-3.7l6.5,3L54.2,77.6z M68.6,48.2c0,7-5.6,12.6-12.6,12.6c-7,0-12.6-5.6-12.6-12.6\r\nc0-7,5.6-12.6,12.6-12.6h0C63,35.5,68.6,41.2,68.6,48.2L68.6,48.2z M64.4,48.2c0-4.6-3.8-8.4-8.4-8.4s-8.4,3.8-8.4,8.4\r\nc0,4.6,3.8,8.4,8.4,8.4S64.4,52.8,64.4,48.2z M110.7,81.8c0,4.6-3.8,8.4-8.4,8.4H74.1l-18,26.6l-18-26.6H9.7\r\nc-4.6,0-8.4-3.8-8.4-8.4V10.3c0-4.6,3.8-8.4,8.4-8.4h92.6c4.6,0,8.4,3.8,8.4,8.4V81.8z M106.5,10.3c0-2.3-1.9-4.2-4.2-4.2H9.7\r\nc-2.3,0-4.2,1.9-4.2,4.2v71.5c0,2.3,1.9,4.2,4.2,4.2h30.7l15.8,23.3L71.9,86h30.4c2.3,0,4.2-1.9,4.2-4.2V10.3z" }));
        };
        Publish.prototype._createServicesArr = function () {
            var _this = this;
            var _a;
            var configPanelViewModel = this.configPanelViewModel;
            var templateAppDataValues = (_a = configPanelViewModel.templateAppData) === null || _a === void 0 ? void 0 : _a.values;
            var draft = templateAppDataValues === null || templateAppDataValues === void 0 ? void 0 : templateAppDataValues.draft;
            configPanelViewModel.proxyServices.forEach(function (proxyService) {
                var fieldName = proxyService.fieldName, services = proxyService.services;
                var hasDraftValue = draft === null || draft === void 0 ? void 0 : draft.hasOwnProperty(fieldName);
                if (hasDraftValue) {
                    var draftValue = draft === null || draft === void 0 ? void 0 : draft[fieldName];
                    if (draftValue) {
                        _this._setupProxyServices(services);
                    }
                    else {
                        _this._removeServices(services);
                    }
                }
                else if (templateAppDataValues === null || templateAppDataValues === void 0 ? void 0 : templateAppDataValues.hasOwnProperty(fieldName)) {
                    var publishValue = templateAppDataValues === null || templateAppDataValues === void 0 ? void 0 : templateAppDataValues[fieldName];
                    if (publishValue) {
                        _this._setupProxyServices(services);
                    }
                    else {
                        _this._removeServices(services);
                    }
                }
            });
        };
        Publish.prototype._setupProxyServices = function (services) {
            var servicesToAdd = this._getServicesToAdd(services);
            var proxyServices = tslib_1.__spreadArrays(this._proxyServices, servicesToAdd);
            this._proxyServices = proxyServices;
        };
        Publish.prototype._getServicesToAdd = function (services) {
            var _this = this;
            return services.filter(function (service) { return _this._proxyServices.indexOf(service) === -1; });
        };
        Publish.prototype._removeServices = function (services) {
            var _this = this;
            services.forEach(function (service, serviceIndex) {
                if (_this._proxyServices.indexOf(service) !== -1) {
                    _this._proxyServices.splice(serviceIndex, 1);
                }
            });
        };
        Publish.prototype._disableButton = function () {
            var _a;
            return this.configPanelViewModel.state === "publishing" ||
                (this.itemIsPublished && !this.shareIsEnabled) ||
                (this._proxy && !((_a = this._proxy) === null || _a === void 0 ? void 0 : _a.proxiesDone) && !this.itemIsPublished)
                ? true
                : false;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Publish.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Publish.prototype, "itemIsPublished", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Publish.prototype, "open", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Publish.prototype, "closePublishButton", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Publish.prototype, "shareIsEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Publish.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/Publish/resources")
        ], Publish.prototype, "publishMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/Publish/resources")
        ], Publish.prototype, "shareMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Publish.prototype, "share", void 0);
        Publish = tslib_1.__decorate([
            decorators_1.subclass("Publish")
        ], Publish);
        return Publish;
    }(Widget_1.default));
    return Publish;
});
