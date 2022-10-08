define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "./ProxyViewModel", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Widget_1, widget_1, ProxyViewModel_1, watchUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Proxy = exports.ProxyResponse = void 0;
    Widget_1 = tslib_1.__importDefault(Widget_1);
    ProxyViewModel_1 = tslib_1.__importDefault(ProxyViewModel_1);
    var CSS = {
        base: "esri-config-panel-proxy",
        baseId: "esriConfigPanelProxy",
        accordionItem: "esri-config-panel-proxy_accordion-item",
        thumbnailId: "esriConfigPanelProxyThumbnail",
        iconId: "esriConfigPanelProxyIcon",
        modalTitle: "esriConfigPanelProxyModal",
        authorizeNo: "esriConfigPanelProxyButtonNo",
        authorizeYes: "esriConfigPanelProxyButtonYes",
        layerDetails: "esri-config-panel-proxy_layer-details",
        active: "active",
        hide: "hide",
        panel: "panel",
        panelWhite: "panel-white",
        pre: "pre-0",
        post: "post-0",
        leader: "leader-0",
        leader1: "leader-1",
        trailer: "trailer-0",
        trailer1: "trailer-1",
        paddingLeader: "padding-leader-0",
        textGrey: "text-darker-gray"
    };
    var ProxyResponse;
    (function (ProxyResponse) {
        ProxyResponse["noProxies"] = "No proxies needed for content";
        ProxyResponse["premiumCancel"] = "Clicked 'Cancel' on premium dialog";
        ProxyResponse["premiumYesOrNo"] = "Clicked 'Yes' or 'No' to premium dialog";
        ProxyResponse["subscriber"] = "Subscriber finished";
        ProxyResponse["subsscriberError"] = "Subscriber Error";
    })(ProxyResponse = exports.ProxyResponse || (exports.ProxyResponse = {}));
    var Proxy = (function (_super) {
        tslib_1.__extends(Proxy, _super);
        function Proxy(params) {
            var _this = _super.call(this, params) || this;
            _this.viewModel = new ProxyViewModel_1.default();
            _this.error = false;
            _this.clickedAuthorizeYes = false;
            _this.doneCheckingForPremiumContent = false;
            _this.darkModeEnabled = null;
            _this.proxyMessages = null;
            _this._firstOpen = false;
            _this._calciteModal = null;
            _this._calciteButtonNo = null;
            _this._calciteButtonYes = null;
            _this._originalParams = null;
            _this._originalParams = params;
            _this.viewModel.init(params);
            if (params.services) {
                params.services.forEach(function (service) { return _this[service] = true; });
            }
            _this._afterRender = _this._afterRender.bind(_this);
            _this.viewModel.createProxies = _this.viewModel.createProxies.bind(_this);
            _this._runMethodThenClose = _this._runMethodThenClose.bind(_this);
            _this._beforeModalClose = _this._beforeModalClose.bind(_this);
            return _this;
        }
        Proxy.prototype.postInitialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "viewModel", function () {
                watchUtils_1.whenOnce(_this, "proxyMessages", function () {
                    _this.viewModel.proxyMessages = _this.proxyMessages;
                });
            });
            this.watch("active", function () {
                if (!_this.errorMessage) {
                    _this.hasPremium = _this.premiumLength.length > 0;
                    _this.hasSubscribers = _this.subscriberLength.length > 0;
                }
                _this.doneCheckingForPremiumContent = true;
            });
        };
        Proxy.prototype.render = function () {
            return this._renderModal();
        };
        Proxy.prototype.proxy = function (reinit) {
            if (reinit === void 0) { reinit = false; }
            return this.viewModel.proxy(reinit, this._originalParams);
        };
        Proxy.prototype._renderModal = function () {
            var renderButtonNo = this._renderButtonNo();
            var renderButtonYes = this._renderButtonYes();
            var renderButtonCancel = this._renderButtonCancel();
            var activeClass = (this.active && this.loaded) ? CSS.active : null;
            var renderItemPanel = this._renderItemPanel();
            var renderTitle = this._renderTitle();
            var renderParagraphOne = this._renderParagraphOne();
            var renderParagraphTwo = this._renderParagraphTwo();
            return (widget_1.tsx("div", { class: this.classes(CSS.base, activeClass), afterUpdate: this._afterRender },
                widget_1.tsx("calcite-modal", { bind: this, afterCreate: widget_1.storeNode, class: this.darkModeEnabled ? "calcite-theme-dark" : "calcite-theme-light", "data-node-ref": "_calciteModal", "aria-labelledby": CSS.modalTitle, size: "medium", id: CSS.baseId },
                    renderTitle,
                    widget_1.tsx("div", { slot: "content" },
                        renderParagraphOne,
                        renderItemPanel,
                        renderParagraphTwo),
                    renderButtonNo,
                    renderButtonCancel,
                    renderButtonYes)));
        };
        Proxy.prototype._renderTitle = function () {
            return (widget_1.tsx("h2", { slot: "header", id: CSS.modalTitle, class: this.classes(CSS.pre, CSS.post, CSS.leader, CSS.trailer) }, this.proxyMessages.title));
        };
        Proxy.prototype._renderParagraphOne = function () {
            return (widget_1.tsx("p", { class: this.classes(CSS.pre, CSS.post, CSS.leader, CSS.trailer1) }, this.proxyMessages.paragraph1));
        };
        Proxy.prototype._renderParagraphTwo = function () {
            return (widget_1.tsx("p", { class: this.classes(CSS.pre, CSS.post, CSS.leader1, CSS.trailer) }, this.proxyMessages.paragraph2));
        };
        Proxy.prototype._renderItemPanel = function () {
            var renderThumbnail = this._renderThumbnail();
            var renderItemTitle = this._renderItemTitle();
            var renderItemAccordion = this._renderItemAccordion();
            return (widget_1.tsx("div", { class: this.classes(CSS.panel, CSS.panelWhite) },
                renderThumbnail,
                widget_1.tsx("div", null,
                    renderItemTitle,
                    renderItemAccordion)));
        };
        Proxy.prototype._renderThumbnail = function () {
            return (widget_1.tsx("img", { id: CSS.thumbnailId, src: this.itemThumbnailUrl, alt: "" }));
        };
        Proxy.prototype._renderIcon = function () {
            return (widget_1.tsx("calcite-icon", { id: CSS.iconId, icon: "premiumContentUserCredit", "aria-hidden": "true", focusable: "false" }));
        };
        Proxy.prototype._renderItemTitle = function () {
            return (widget_1.tsx("h3", { class: CSS.trailer },
                widget_1.tsx("strong", null, this.itemTitle)));
        };
        Proxy.prototype._renderItemAccordion = function () {
            var premiumCount = this.premiums.length;
            var premiumCountString = '' + premiumCount + (premiumCount === 1 ? this.proxyMessages.layer : this.proxyMessages.layers);
            var renderIcon = this._renderIcon();
            return (widget_1.tsx("calcite-accordion", { id: "proxy-container", appearance: "transparent", "icon-position": "start", scale: "s", "aria-controls": "proxy-info", "aria-expanded": "true" },
                widget_1.tsx("calcite-accordion-item", { id: "proxy-info", "item-title": premiumCountString, active: true, class: this.classes(CSS.accordionItem, CSS.textGrey, CSS.paddingLeader), role: "region", "aria-labelledby": "proxy-container" }, this.premiums.map(function (layer, index) {
                    return (widget_1.tsx("p", { class: CSS.layerDetails, key: index }, layer.title));
                })),
                renderIcon));
        };
        Proxy.prototype._renderButtonYes = function () {
            var _this = this;
            return (widget_1.tsx("calcite-button", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_calciteButtonYes", slot: "primary", width: "full", id: CSS.authorizeYes, onclick: function (e) { return _this._runMethodThenClose(e.target, _this.viewModel.createProxies(true), "clickedAuthorizeYes"); }, "aria-label": this.proxyMessages.authorizeYes }, this.proxyMessages.authorizeYes));
        };
        Proxy.prototype._renderButtonNo = function () {
            var _this = this;
            return (widget_1.tsx("calcite-button", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_calciteButtonNo", slot: "back", width: "full", appearance: "transparent", id: CSS.authorizeNo, onclick: function (e) { return _this._runMethodThenClose(e.target, _this.viewModel.createProxies(false), "clickedAuthorizeNo"); }, "aria-label": this.proxyMessages.authorizeNo }, this.proxyMessages.authorizeNo));
        };
        Proxy.prototype._renderButtonCancel = function () {
            var _this = this;
            return (widget_1.tsx("calcite-button", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_calciteButtonCancel", slot: "secondary", width: "full", appearance: "outline", "aria-label": this.proxyMessages.cancel, onclick: function () {
                    _this._calciteModal.removeAttribute("active");
                } }, this.proxyMessages.cancel));
        };
        Proxy.prototype._runMethodThenClose = function (button, method, watcher) {
            var _this = this;
            var _a, _b, _c, _d;
            var previousButton = ((_a = button.previousElementSibling) === null || _a === void 0 ? void 0 : _a.id) === CSS.authorizeNo ? this._calciteButtonNo :
                ((_b = button.previousElementSibling) === null || _b === void 0 ? void 0 : _b.id) === CSS.authorizeYes ? this._calciteButtonYes : null;
            var nextButton = ((_c = button.nextElementSibling) === null || _c === void 0 ? void 0 : _c.id) === CSS.authorizeNo ? this._calciteButtonNo :
                ((_d = button.nextElementSibling) === null || _d === void 0 ? void 0 : _d.id) === CSS.authorizeYes ? this._calciteButtonYes : null;
            button.loading = true;
            previousButton ? previousButton.disabled = true : null;
            nextButton ? nextButton.disabled = true : null;
            method.then(function () {
                button.loading = false;
                previousButton ? previousButton.disabled = false : null;
                nextButton ? nextButton.disabled = false : null;
                watcher ? _this[watcher] = true : null;
                _this._calciteModal.removeAttribute("active");
                _this.proxiesDone = true;
            }, function (error) {
                console.error("Proxy error: \n", error);
                button.loading = false;
                previousButton ? previousButton.disabled = false : null;
                nextButton ? nextButton.disabled = false : null;
                watcher ? _this[watcher] = true : null;
                _this.error = true;
                _this.errorAlert = _this._renderError(error);
                _this._calciteModal.removeAttribute("active");
                _this.proxiesDone = true;
            });
        };
        Proxy.prototype._beforeModalClose = function () {
            var _this = this;
            return new Promise(function (resolve) {
                if (!_this.clickedAuthorizeNo && !_this.clickedAuthorizeYes) {
                    _this.clickedCancel = true;
                }
                resolve();
            });
        };
        Proxy.prototype._afterRender = function (element) {
            this._calciteModal.beforeClose = this._beforeModalClose;
            if (this.hasPremium && !this._firstOpen) {
                this._calciteModal.setAttribute("active", "true");
                this._firstOpen = true;
            }
        };
        Proxy.prototype._renderError = function (error) {
            return (widget_1.tsx("calcite-alert", { icon: "true", scale: "m", color: "red", role: "alertdialog", class: "hydrated" },
                widget_1.tsx("div", { slot: "title" }, this.proxyMessages.error),
                widget_1.tsx("div", { slot: "message" }, error.message)));
        };
        tslib_1.__decorate([
            decorators_1.property({
                type: ProxyViewModel_1.default
            })
        ], Proxy.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemTitle")
        ], Proxy.prototype, "itemTitle", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemThumbnailUrl")
        ], Proxy.prototype, "itemThumbnailUrl", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.premiumLayers")
        ], Proxy.prototype, "premiums", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.route")
        ], Proxy.prototype, "route", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.loaded")
        ], Proxy.prototype, "loaded", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.active")
        ], Proxy.prototype, "active", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.premiums")
        ], Proxy.prototype, "premiumLength", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.subscribers")
        ], Proxy.prototype, "subscriberLength", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.errorMessage")
        ], Proxy.prototype, "errorMessage", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.hasPremium")
        ], Proxy.prototype, "hasPremium", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.hasSubscribers")
        ], Proxy.prototype, "hasSubscribers", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.proxiesDone")
        ], Proxy.prototype, "proxiesDone", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Proxy.prototype, "error", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Proxy.prototype, "errorAlert", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Proxy.prototype, "clickedAuthorizeYes", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.clickedAuthorizeNo")
        ], Proxy.prototype, "clickedAuthorizeNo", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.clickedCancel")
        ], Proxy.prototype, "clickedCancel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Proxy.prototype, "doneCheckingForPremiumContent", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Proxy.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/Proxy/resources")
        ], Proxy.prototype, "proxyMessages", void 0);
        Proxy = tslib_1.__decorate([
            decorators_1.subclass("esri.widgets.Proxy")
        ], Proxy);
        return Proxy;
    }(Widget_1.default));
    exports.Proxy = Proxy;
    exports.default = Proxy;
});
