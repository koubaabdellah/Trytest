define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "../../configWidgets/BaseComponent", "esri/widgets/support/widget", "esri/core/watchUtils", "../../utils/focusUtils", "./Modal/DoNotShowAgain", "esri/intl"], function (require, exports, tslib_1, decorators_1, BaseComponent, widget_1, watchUtils_1, focusUtils_1, DoNotShowAgain, intl_1) {
    "use strict";
    var CSS = {
        base: "esri-config-panel__calcite-modal",
        infoTextBlock: "esri-config-panel-modal__info-text-block",
        infoHeaderText: "esri-config-panel-modal__info-header-text",
        doNotShow: "esri-config-panel-modal__do-not-show",
        theme: {
            light: "calcite-theme-light",
            dark: "calcite-theme-dark"
        }
    };
    var Modal = (function (_super) {
        tslib_1.__extends(Modal, _super);
        function Modal(params) {
            var _this = _super.call(this, params) || this;
            _this._beforeCloseIsSet = false;
            _this._doNotShowAgain = new DoNotShowAgain();
            _this.modalId = null;
            _this.modal = null;
            return _this;
        }
        Modal.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.whenOnce(this, "modal", function () {
                    _this.modal.addEventListener("calciteModalClose", function () {
                        _this._doNotShowAgain.handleCheckBoxValues();
                    });
                }),
                watchUtils_1.watch(this._doNotShowAgain, "doNotShowValues", function () {
                    return _this.scheduleRender();
                })
            ]);
        };
        Modal.prototype.render = function () {
            var content = this._getContent();
            var theme = this.configPanelViewModel.darkModeEnabled
                ? CSS.theme.dark
                : CSS.theme.light;
            return (widget_1.tsx("calcite-modal", { bind: this, class: this.classes(CSS.base, theme), "aria-labelledby": "modalTitle", role: "dialog", afterCreate: widget_1.storeNode, afterUpdate: this._setBeforeClose, "data-node-ref": "modal", width: "s", noPadding: false, "intl-close": this.configPanelViewModel.expressMessages.close, color: this.getModalColor() }, content));
        };
        Modal.prototype.open = function () {
            var _this = this;
            setTimeout(function () {
                _this.modal.setAttribute("active", "");
            }, 50);
            this.scheduleRender();
        };
        Modal.prototype.close = function () {
            this.modal.removeAttribute("active");
            this.modal.active = false;
            this.scheduleRender();
        };
        Modal.prototype._getContent = function () {
            var modalId = this.modalId;
            return modalId === "exit"
                ? this._renderExitContent()
                : modalId === "express"
                    ? this._renderExpressContent()
                    : modalId === "full"
                        ? this._renderFullContent()
                        : modalId === "info"
                            ? this._renderInfoContent()
                            : modalId === "discardDraft"
                                ? this._renderDiscardDraftContent()
                                : modalId === "searchSettingsExpress"
                                    ? this._renderSearchSettingsExpressContent()
                                    : null;
        };
        Modal.prototype._renderDoNotShowAgainCheckbox = function (type) {
            var _this = this;
            var _a;
            return (widget_1.tsx("calcite-label", { key: "doNotShowAgainCheckboxLabel_" + type, class: CSS.doNotShow, slot: "back", layout: "inline" },
                widget_1.tsx("calcite-checkbox", { key: "doNotShowAgainCheckbox_" + type, bind: this, "data-modal-type": type, checked: this._doNotShowAgain.doNotShowValues[type], afterCreate: function (calciteCheckBoxNode) {
                        calciteCheckBoxNode.addEventListener("calciteCheckboxChange", function () {
                            _this._handleDoNotShowCheckbox(calciteCheckBoxNode, type);
                        });
                    } }),
                widget_1.tsx("span", null, (_a = this.configPanelViewModel.expressMessages) === null || _a === void 0 ? void 0 : _a.doNotShow)));
        };
        Modal.prototype._handleDoNotShowCheckbox = function (checkboxNode, type) {
            this._doNotShowAgain.doNotShowValues[type] = checkboxNode.checked;
        };
        Modal.prototype._renderExitContent = function () {
            var modalHeader = this._renderModalHeader();
            var modalContent = this._renderModalContent();
            var doNotShowThisAgainCheckbox = this._renderDoNotShowAgainCheckbox("exit");
            var cancelButton = this._renderCancelButton();
            return [
                modalHeader,
                modalContent,
                doNotShowThisAgainCheckbox,
                cancelButton,
                widget_1.tsx("calcite-button", { bind: this, onclick: this._goToItemPage, slot: "primary", width: "auto", color: "red" }, this.configPanelViewModel.configPanelMessages.exit)
            ];
        };
        Modal.prototype._renderExpressContent = function () {
            var modalHeader = this._renderModalHeader();
            var modalContent = this._renderModalContent();
            var doNotShowThisAgainCheckbox = this._renderDoNotShowAgainCheckbox("switch");
            var cancelButton = this._renderCancelButton();
            return [
                modalHeader,
                modalContent,
                doNotShowThisAgainCheckbox,
                cancelButton,
                widget_1.tsx("calcite-button", { bind: this, onclick: this._switchConfigMode, slot: "primary", width: "full", color: "blue" }, this.configPanelViewModel.configPanelMessages.continue)
            ];
        };
        Modal.prototype._renderFullContent = function () {
            var modalHeader = this._renderModalHeader();
            var modalContent = this._renderModalContent();
            var doNotShowAgainCheckbox = this._renderDoNotShowAgainCheckbox("switch");
            var cancelButton = this._renderCancelButton();
            return [
                modalHeader,
                modalContent,
                doNotShowAgainCheckbox,
                cancelButton,
                widget_1.tsx("calcite-button", { bind: this, onclick: this._switchConfigMode, slot: "primary", width: "full", color: "blue" }, this.configPanelViewModel.configPanelMessages.continue)
            ];
        };
        Modal.prototype._renderInfoContent = function () {
            var modalHeader = this._renderModalHeader();
            var modalContent = this._renderModalContent();
            return [
                modalHeader,
                modalContent,
                widget_1.tsx("calcite-button", { bind: this, onclick: this.close, slot: "primary", width: "full", appearance: "solid", id: "infoOkButton", color: "blue" }, this.configPanelViewModel.configPanelMessages.ok)
            ];
        };
        Modal.prototype._renderDiscardDraftContent = function () {
            var modalHeader = this._renderModalHeader();
            var modalContent = this._renderModalContent();
            var doNotShowThisAgainCheckbox = this._renderDoNotShowAgainCheckbox("reset");
            var cancelButton = this._renderCancelButton();
            return [
                modalHeader,
                modalContent,
                doNotShowThisAgainCheckbox,
                cancelButton,
                widget_1.tsx("calcite-button", { bind: this, onclick: this._discardDraft, color: "blue", slot: "primary", width: "full", appearance: "solid" }, this.configPanelViewModel.configPanelMessages.reset)
            ];
        };
        Modal.prototype._renderSearchSettingsExpressContent = function () {
            var _this = this;
            var modalHeader = this._renderModalHeader();
            var modalContent = this._renderModalContent();
            var doNotShowAgainCheckbox = this._renderDoNotShowAgainCheckbox("searchSettingsExpress");
            var cancelButton = this._renderCancelButton();
            return [
                modalHeader,
                modalContent,
                doNotShowAgainCheckbox,
                cancelButton,
                widget_1.tsx("calcite-button", { bind: this, onclick: function () {
                        _this._switchConfigMode(true);
                    }, slot: "primary", width: "full", color: "blue" }, this.configPanelViewModel.configPanelMessages.continue)
            ];
        };
        Modal.prototype._renderModalHeader = function () {
            var modalId = this.modalId;
            var headerContent = modalId === "exit"
                ? this.configPanelViewModel.configPanelMessages.exitModalHeader
                : modalId === "express"
                    ? this.configPanelViewModel.configPanelMessages.expressModalHeader
                    : modalId === "full"
                        ? this.configPanelViewModel.expressMessages.switchToFullAppSettings
                        : modalId === "info"
                            ? this.configPanelViewModel.configPanelMessages.information
                            : modalId === "discardDraft"
                                ? this.configPanelViewModel.configPanelMessages.resetToLastPublished
                                : modalId === "searchSettingsExpress"
                                    ? this.configPanelViewModel.configPanelMessages
                                        .searchSettingsExpressHeader
                                    : null;
            return (widget_1.tsx("h2", { slot: "header", id: "modalTitle" }, headerContent));
        };
        Modal.prototype._renderModalContent = function () {
            var modalId = this.modalId;
            var modalContent = modalId === "exit"
                ? this.configPanelViewModel.configPanelMessages.exitModalContent
                : modalId === "express"
                    ? this.configPanelViewModel.configPanelMessages.expressModalContent
                    : modalId === "full"
                        ? this.configPanelViewModel.expressMessages.modalContent
                        : modalId === "info"
                            ? [
                                this._renderFeedbackContent(),
                                this._renderWhatsNewContent(),
                                this._renderHelpDoc()
                            ]
                            : modalId === "discardDraft"
                                ? this.configPanelViewModel.configPanelMessages.resetDraftModal
                                : modalId === "searchSettingsExpress"
                                    ? this.configPanelViewModel.configPanelMessages
                                        .searchSettingsExpressContent
                                    : null;
            return widget_1.tsx("div", { slot: "content" }, modalContent);
        };
        Modal.prototype._renderFeedbackContent = function () {
            var catsGeoNetLink = this.configPanelViewModel.appConfig.catsGeoNetLink;
            return (widget_1.tsx("div", { key: "info-feedback", class: CSS.infoTextBlock },
                widget_1.tsx("span", { class: CSS.infoHeaderText }, this.configPanelViewModel.configPanelMessages.feedback),
                widget_1.tsx("span", null,
                    this.configPanelViewModel.configPanelMessages.feedbackMessage,
                    " "),
                widget_1.tsx("a", { href: catsGeoNetLink, target: "_blank" }, this.configPanelViewModel.configPanelMessages.here),
                "."));
        };
        Modal.prototype._renderWhatsNewContent = function () {
            var whatsNewBlogLink = this.configPanelViewModel.appConfig.whatsNewBlogLink;
            return (widget_1.tsx("div", { key: "info-whatsnew", class: CSS.infoTextBlock },
                widget_1.tsx("span", { class: CSS.infoHeaderText }, this.configPanelViewModel.configPanelMessages.whatsNew),
                widget_1.tsx("span", null,
                    this.configPanelViewModel.configPanelMessages.whatsNewMessage,
                    " "),
                widget_1.tsx("a", { href: whatsNewBlogLink, target: "_blank" }, this.configPanelViewModel.configPanelMessages.here),
                "."));
        };
        Modal.prototype._renderHelpDoc = function () {
            var helpDocLink = this.configPanelViewModel.appConfig.helpDocLink;
            var message = intl_1.substitute(this.configPanelViewModel.configPanelMessages.learnMoreMessage, {
                instantApps: helpDocLink
            });
            return (widget_1.tsx("div", { key: "info-whatsnew", class: CSS.infoTextBlock },
                widget_1.tsx("span", { class: CSS.infoHeaderText }, this.configPanelViewModel.configPanelMessages.learnMore),
                widget_1.tsx("span", { innerHTML: message }),
                "."));
        };
        Modal.prototype._renderCancelButton = function () {
            return (widget_1.tsx("calcite-button", { bind: this, onclick: this.close, slot: "secondary", width: this.configPanelViewModel.expressEnabled ? "auto" : "full", appearance: "outline", color: this.getModalColor() }, this.configPanelViewModel.expressMessages.cancel));
        };
        Modal.prototype._goToItemPage = function () {
            if (this._doNotShowAgain.doNotShowValues["exit"]) {
                localStorage.setItem("exit_doNotShow", "true");
            }
            this.configPanelViewModel.goToItemPage();
        };
        Modal.prototype._switchConfigMode = function (isSearchSettingsExpress) {
            if (isSearchSettingsExpress &&
                this._doNotShowAgain.doNotShowValues["searchSettingsExpress"]) {
                localStorage.setItem("searchSettingsExpress_doNotShow", "true");
            }
            if (this._doNotShowAgain.doNotShowValues["switch"]) {
                localStorage.setItem("switch_doNotShow", "true");
            }
            this.close();
            this.configPanelViewModel.switchConfigMode(this.initiator);
        };
        Modal.prototype._discardDraft = function () {
            if (this._doNotShowAgain.doNotShowValues["reset"]) {
                localStorage.setItem("reset_doNotShow", "true");
            }
            this.configPanelViewModel.triggerDraftDiscard();
            this.close();
        };
        Modal.prototype._setBeforeClose = function (node) {
            var _this = this;
            if (this.modal && !this._beforeCloseIsSet) {
                this.modal.beforeClose = function () {
                    return _this._beforeClose();
                };
                this.modal.addEventListener("calciteModalOpen", function () {
                    if (_this.modalId === "info") {
                        focusUtils_1.focusNode("infoOkButton");
                    }
                });
                this._beforeCloseIsSet = true;
            }
            if (!node.shadowRoot.getElementById("secondary")) {
                var style = document.createElement("style");
                style.id = "secondary";
                style.innerHTML = ".modal .footer .secondary { display: flex; }";
                node.shadowRoot.appendChild(style);
            }
        };
        Modal.prototype._beforeClose = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.modal.removeAttribute("active");
                _this.modal.active = false;
                resolve();
            });
        };
        Modal.prototype.getModalColor = function () {
            var isRedModal = this._redModalCheck();
            return isRedModal ? "red" : "blue";
        };
        Modal.prototype._redModalCheck = function () {
            var modalId = this.modalId;
            return modalId === "exit";
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Modal.prototype, "modalId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Modal.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Modal.prototype, "initiator", void 0);
        Modal = tslib_1.__decorate([
            decorators_1.subclass("Modal")
        ], Modal);
        return Modal;
    }(BaseComponent));
    return Modal;
});
