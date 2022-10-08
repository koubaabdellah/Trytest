define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "../../configWidgets/BaseComponent", "esri/widgets/support/widget", "./Onboarding/OnboardingItem", "esri/core/Collection", "esri/core/watchUtils", "esri/core/Handles"], function (require, exports, tslib_1, decorators_1, BaseComponent, widget_1, OnboardingItem, Collection, watchUtils_1, Handles) {
    "use strict";
    var CSS = {
        base: "esri-config-panel__onboarding",
        onboardingGraphic: "esri-config-panel__onboarding-graphic",
        onboardingPagination: "esri-config-panel__onboarding-pagination",
        labelContainer: "esri-config-panel__onboarding-label-container",
        paginationItemSelected: "esri-config-panel__onboarding-pagination-item--selected",
        paginationItem: "esri-config-panel__onboarding-pagination-item",
        onboardingContentContainer: "esri-config-panel__onboarding-content-container",
        theme: {
            light: "calcite-theme-light",
            dark: "calcite-theme-dark"
        }
    };
    var pathname = window.location.pathname;
    var DIST_PATH = pathname.substring(0, pathname.lastIndexOf("/"));
    var ONBOARDING_LIVE_REGION_KEY = "onboarding-live-region-key";
    var Onboarding = (function (_super) {
        tslib_1.__extends(Onboarding, _super);
        function Onboarding(params) {
            var _this = _super.call(this, params) || this;
            _this._beforeCloseIsSet = false;
            _this._handles = new Handles();
            _this._ariaLiveRegion = document.getElementById("ariaLiveRegion");
            _this.isOpen = false;
            _this.currentIndex = 0;
            _this.onboardingContentCollection = new Collection();
            _this.releaseTag = null;
            _this.modal = null;
            return _this;
        }
        Onboarding.prototype.postInitialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "configPanelViewModel.configPanelMessages", function () {
                watchUtils_1.whenOnce(_this, "configPanelViewModel.expressMessages", function () {
                    var _a = _this.configPanelViewModel, configPanelMessages = _a.configPanelMessages, expressMessages = _a.expressMessages;
                    var expressToggle = configPanelMessages.onboarding.expressToggle;
                    var shareHeader = expressMessages.shareHeader, shareBody = expressMessages.shareBody, shareAltText = expressMessages.shareAltText, onboardingViewsHeader = expressMessages.onboardingViewsHeader, onboardingViewsBody = expressMessages.onboardingViewsBody, onboardingViewsAltText = expressMessages.onboardingViewsAltText, expressModeBody = expressMessages.expressModeBody;
                    var expressToggleItem = new OnboardingItem({
                        id: "expressToggle",
                        title: expressToggle.header,
                        content: expressModeBody,
                        img: {
                            src: DIST_PATH + "/assets/images/express-switch-onboarding.jpg",
                            alt: expressToggle.imgAltText
                        }
                    });
                    var shareOnboardingItem = new OnboardingItem({
                        id: "share",
                        title: shareHeader,
                        content: shareBody,
                        img: {
                            src: DIST_PATH + "/assets/images/share-onboarding.jpg",
                            alt: shareAltText
                        }
                    });
                    var mobileViewsItem = new OnboardingItem({
                        id: "mobileViews",
                        title: onboardingViewsHeader,
                        content: onboardingViewsBody,
                        img: {
                            src: DIST_PATH + "/assets/images/views-onboarding.jpg",
                            alt: onboardingViewsAltText
                        }
                    });
                    _this.onboardingContentCollection.addMany([
                        expressToggleItem,
                        shareOnboardingItem,
                        mobileViewsItem
                    ]);
                    _this._handleOnboardingLR();
                });
            });
            watchUtils_1.whenOnce(this, "modal", function () {
                if (_this.isOpen) {
                    _this.modal.active = true;
                }
                _this.own([
                    watchUtils_1.watch(_this, "isOpen", function () {
                        if (_this.isOpen) {
                            _this.modal.active = true;
                        }
                    })
                ]);
            });
        };
        Onboarding.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        Onboarding.prototype.next = function () {
            if (this.currentIndex === this.onboardingContentCollection.length - 1) {
                this._set("currentIndex", 0);
            }
            else {
                var updatedIndex = this.currentIndex + 1;
                this._set("currentIndex", updatedIndex);
            }
            this._handleFocus();
            this.scheduleRender();
        };
        Onboarding.prototype.select = function (e) {
            var node = e.target;
            var itemIndex = node.getAttribute("data-item-index");
            this._set("currentIndex", parseInt(itemIndex));
            this.scheduleRender();
        };
        Onboarding.prototype.close = function () {
            this.modal.removeAttribute("active");
            this.modal.active = false;
            this.isOpen = false;
        };
        Onboarding.prototype.render = function () {
            var content = this._renderOnboardingContent();
            var onboardingItem = this._getOnboardingItem(this.currentIndex);
            var theme = this.configPanelViewModel.darkModeEnabled
                ? CSS.theme.dark
                : CSS.theme.light;
            return (widget_1.tsx("calcite-modal", { bind: this, class: this.classes(CSS.base, theme), role: "dialog", "aria-label": onboardingItem === null || onboardingItem === void 0 ? void 0 : onboardingItem.title, afterCreate: widget_1.storeNode, afterUpdate: this._setBeforeClose, "data-node-ref": "modal", width: "m", noPadding: true, "intl-close": this.configPanelViewModel.expressMessages.close }, content));
        };
        Onboarding.prototype._renderOnboardingContent = function () {
            var modalHeader = this._renderModalHeader();
            var modalContent = this._renderModalContent();
            return [
                modalHeader,
                modalContent,
                widget_1.tsx("calcite-button", { key: "next-close-button", bind: this, id: "onboardingButton", onclick: this.currentIndex !== this.onboardingContentCollection.length - 1
                        ? this.next
                        : this.close, slot: "primary", width: "full" }, this.currentIndex !== this.onboardingContentCollection.length - 1
                    ? this.configPanelViewModel.expressMessages.next
                    : this.configPanelViewModel.expressMessages.onboardingButton)
            ];
        };
        Onboarding.prototype._renderModalHeader = function () {
            var onboardingItem = this._getOnboardingItem(this.currentIndex);
            return (widget_1.tsx("h2", { slot: "header", id: "modalTitle" }, onboardingItem === null || onboardingItem === void 0 ? void 0 : onboardingItem.title));
        };
        Onboarding.prototype._renderModalContent = function () {
            var _a, _b, _c;
            var onboardingItem = this._getOnboardingItem(this.currentIndex);
            return (widget_1.tsx("div", { slot: "content" },
                ((_a = onboardingItem === null || onboardingItem === void 0 ? void 0 : onboardingItem.img) === null || _a === void 0 ? void 0 : _a.src) ? (widget_1.tsx("img", { key: "onboarding-img", class: CSS.onboardingGraphic, src: (_b = onboardingItem === null || onboardingItem === void 0 ? void 0 : onboardingItem.img) === null || _b === void 0 ? void 0 : _b.src, alt: (_c = onboardingItem === null || onboardingItem === void 0 ? void 0 : onboardingItem.img) === null || _c === void 0 ? void 0 : _c.alt })) : null,
                widget_1.tsx("div", { class: CSS.onboardingContentContainer },
                    widget_1.tsx("p", null, onboardingItem === null || onboardingItem === void 0 ? void 0 : onboardingItem.content)),
                this._renderPaginationItemContainer()));
        };
        Onboarding.prototype._renderPaginationItemContainer = function () {
            return (widget_1.tsx("div", { class: CSS.onboardingPagination }, this._renderPaginationItems()));
        };
        Onboarding.prototype._renderPaginationItems = function () {
            var _this = this;
            return this.onboardingContentCollection
                .toArray()
                .map(function (onboardingItem, onboardingItemIndex) {
                return _this._renderOnboardingPaginationItem(onboardingItem, onboardingItemIndex);
            });
        };
        Onboarding.prototype._renderOnboardingPaginationItem = function (onboardingItem, onboardingItemIndex) {
            var _a;
            var selected = (_a = {},
                _a[CSS.paginationItemSelected] = this.currentIndex ===
                    this.onboardingContentCollection.indexOf(onboardingItem),
                _a);
            return (widget_1.tsx("button", { bind: this, onclick: this.select, class: this.classes(CSS.paginationItem, selected), "data-item-index": "" + onboardingItemIndex, "aria-pressed": this.currentIndex ===
                    this.onboardingContentCollection.indexOf(onboardingItem)
                    ? "true"
                    : "false", "aria-label": onboardingItemIndex + 1 + " " + this.configPanelViewModel.expressMessages.of + " " + this.onboardingContentCollection.length }));
        };
        Onboarding.prototype._getOnboardingItem = function (selectedIndex) {
            return this.onboardingContentCollection.getItemAt(selectedIndex);
        };
        Onboarding.prototype._setBeforeClose = function () {
            var _this = this;
            if (this.modal && !this._beforeCloseIsSet) {
                this.modal.beforeClose = function () {
                    return _this._beforeClose();
                };
                this._beforeCloseIsSet = true;
            }
        };
        Onboarding.prototype._beforeClose = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.modal.removeAttribute("active");
                _this.modal.active = false;
                _this.isOpen = false;
                resolve();
            });
        };
        Onboarding.prototype._handleFocus = function () {
            var onboardingButtonInt = setInterval(function () {
                var onboardingButton = document.getElementById("onboardingButton");
                if (onboardingButton) {
                    onboardingButton.setFocus();
                }
                if (document.activeElement === onboardingButton) {
                    clearInterval(onboardingButtonInt);
                }
            }, 50);
        };
        Onboarding.prototype._handleOnboardingLR = function () {
            this._handles.add([
                this._handleOnboardingOpenLR(),
                this._handleOnboardingClosedLR(),
                this._watchLRContent()
            ], ONBOARDING_LIVE_REGION_KEY);
        };
        Onboarding.prototype._handleOnboardingOpenLR = function () {
            var _this = this;
            return watchUtils_1.whenTrueOnce(this, "isOpen", function () {
                var currentOnboardingItem = _this._getOnboardingItem(_this.currentIndex);
                _this._set("liveRegionContent", {
                    content: currentOnboardingItem.content
                });
                _this._handles.add(watchUtils_1.watch(_this, "currentIndex", function () {
                    var currentOnboardingItem = _this._getOnboardingItem(_this.currentIndex);
                    _this._set("liveRegionContent", {
                        content: currentOnboardingItem.content
                    });
                }), ONBOARDING_LIVE_REGION_KEY);
            });
        };
        Onboarding.prototype._handleOnboardingClosedLR = function () {
            var _this = this;
            return watchUtils_1.whenFalse(this, "isOpen", function () {
                _this._set("liveRegionContent", null);
                _this._ariaLiveRegion.innerText = "";
                _this._handles.remove(ONBOARDING_LIVE_REGION_KEY);
            });
        };
        Onboarding.prototype._watchLRContent = function () {
            var _this = this;
            return watchUtils_1.init(this, "liveRegionContent", function () {
                if (_this.liveRegionContent) {
                    _this._ariaLiveRegion.innerText = _this.liveRegionContent.content;
                }
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Onboarding.prototype, "isOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Onboarding.prototype, "currentIndex", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Onboarding.prototype, "onboardingContentCollection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Onboarding.prototype, "releaseTag", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Onboarding.prototype, "modal", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], Onboarding.prototype, "liveRegionContent", void 0);
        Onboarding = tslib_1.__decorate([
            decorators_1.subclass("Onboarding")
        ], Onboarding);
        return Onboarding;
    }(BaseComponent));
    return Onboarding;
});
