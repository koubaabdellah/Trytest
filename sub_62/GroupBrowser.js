define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/core/reactiveUtils", "esri/request", "esri/portal/Portal", "arcgis-components/wrappers/GroupBrowser", "../../utils/focusUtils"], function (require, exports, tslib_1, Widget_1, widget_1, decorators_1, reactiveUtils_1, request, Portal, GroupBrowser_1, focusUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var GroupOwners;
    (function (GroupOwners) {
        GroupOwners["itemOwner"] = "itemOwner";
        GroupOwners["inOrg"] = "inOrg";
        GroupOwners["outsideOrg"] = "outsideOrg";
    })(GroupOwners || (GroupOwners = {}));
    var CSS = {
        base: "esri-config-panel-group-browser",
        openerButton: "esri-config-panel-group-browser__open-button",
        dark: "calcite-theme-dark"
    };
    var GroupBrowser = (function (_super) {
        tslib_1.__extends(GroupBrowser, _super);
        function GroupBrowser(value) {
            var _this = _super.call(this, value) || this;
            _this._darkModeEnabled = false;
            _this.portal = null;
            _this.groupBrowserMessages = null;
            _this.buttonIcon = null;
            _this.isOpen = false;
            _this.selectedGroups = null;
            _this.enableFiltering = false;
            _this.enableSingleSelection = false;
            _this.isConfirmed = false;
            _this.configPanelViewModel = null;
            _this.ready = false;
            return _this;
        }
        GroupBrowser.prototype.initialize = function () {
            this._darkModeEnabled = window.matchMedia("(prefers-color-scheme: dark)")
                .matches;
        };
        GroupBrowser.prototype.render = function () {
            var _this = this;
            this.ready = true;
            this.buttonText = this.buttonText || this.groupBrowserMessages.openBtn;
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("calcite-button", { class: CSS.openerButton, width: "full", icon: this.buttonIcon, appearance: "outline", onclick: function () {
                        _this.open();
                    }, onkeydown: function (e) {
                        if (e.code === "Space" || e.code === "Enter") {
                            _this.open();
                            return;
                        }
                        focusUtils_1.handleFocusElFromSettingsPanel(e);
                    }, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }, this.buttonText)));
        };
        GroupBrowser.prototype.renderModal = function () {
            var _a;
            var _this = this;
            this.modalTitle = this.modalTitle || this.groupBrowserMessages.modalTitle;
            var darkMode = (_a = {},
                _a[CSS.dark] = this._darkModeEnabled,
                _a);
            return (widget_1.tsx("calcite-modal", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "groupBrowserModal", size: "large", width: "1000", "no-padding": "true", class: this.classes("group-browser__modal-container", darkMode) },
                widget_1.tsx("h3", { slot: "header", id: "modal-title" }, this.modalTitle),
                widget_1.tsx("div", { slot: "content" }, this._renderGroupBrowser()),
                widget_1.tsx("calcite-button", { onclick: function () {
                        _this.close();
                        _this.set("isConfirmed", true);
                    }, slot: "primary", width: "full" }, this.groupBrowserMessages.confirmBtn)));
        };
        GroupBrowser.prototype.open = function () {
            var _this = this;
            this.configPanelViewModel.groupBrowser = this;
            reactiveUtils_1.whenOnce(function () { return _this.groupBrowserModal; }).then(function () {
                _this._set("isOpen", true);
                setTimeout(function () {
                    _this.groupBrowserModal.setAttribute("active", "true");
                    _this.groupBrowserModal.beforeClose = _this.beforeClose.bind(_this);
                }, 200);
            });
        };
        GroupBrowser.prototype.close = function () {
            this._set("isOpen", false);
            this.groupBrowserModal.removeAttribute("active");
        };
        GroupBrowser.prototype.beforeClose = function () {
            var _this = this;
            return new Promise(function (resolve) {
                _this.close();
                resolve();
            });
        };
        GroupBrowser.prototype._renderGroupBrowser = function () {
            return (widget_1.tsx("div", { bind: this, afterCreate: this.createGroupBrowser.bind(this), key: CSS.base }));
        };
        GroupBrowser.prototype.createGroupBrowser = function (groupBrowserContainer) {
            this.createGroupBrowserHelper(groupBrowserContainer, {});
        };
        GroupBrowser.prototype.createGroupBrowserHelper = function (groupBrowserContainer, initialGroups) {
            var _this = this;
            var portal;
            if (this.portal != null) {
                portal = this.portal;
            }
            else {
                portal = new Portal({
                    url: "https://devext.arcgis.com/",
                    authMode: "immediate"
                });
            }
            initialGroups = this.selectedGroups && this.selectedGroups[0] ?
                this.selectedGroups.reduce(function (obj, group) {
                    var _a;
                    return tslib_1.__assign(tslib_1.__assign({}, obj), (_a = {}, _a[group["id"]] = { "group": group }, _a));
                }, {}) : {};
            var owners = this.selectedGroups && this.selectedGroups[0] ?
                this.selectedGroups.map(function (group) {
                    return group.owner;
                }, {}) : [];
            var isGroupOwner = (owners.length === 0) || owners.every(function (owner) { return owner === portal.user.username; });
            portal.load().then(function () {
                _this._groupBrowserWrapper = new GroupBrowser_1.GroupBrowserWrapper(groupBrowserContainer, {
                    apiVersion: 4,
                    portal: portal,
                    portalUser: portal.user,
                    request: request,
                    initialState: tslib_1.__assign(tslib_1.__assign({}, GroupBrowser_1.initialState), { config: tslib_1.__assign(tslib_1.__assign({}, GroupBrowser_1.initialState.config), { baseQ: "orgid:" + portal.id, enableFiltering: _this.enableFiltering, enableSingleSelection: _this.enableSingleSelection, withinAppConfig: true }), ui: tslib_1.__assign(tslib_1.__assign({}, GroupBrowser_1.initialState.ui), { filter: tslib_1.__assign(tslib_1.__assign({}, GroupBrowser_1.initialState.ui.filter), { expanded: _this.enableFiltering }) }), parameters: tslib_1.__assign(tslib_1.__assign({}, GroupBrowser_1.initialState.parameters), { filter: tslib_1.__assign(tslib_1.__assign({}, GroupBrowser_1.initialState.parameters.filter), { ownerFilter: ((_this.enableFiltering && isGroupOwner) ? GroupOwners.itemOwner : undefined) }) }), groups: tslib_1.__assign(tslib_1.__assign({}, GroupBrowser_1.initialState.groups), { selectedGroups: initialGroups }) }),
                    onChange: _this.handleGroupChange.bind(_this)
                });
            });
        };
        GroupBrowser.prototype.handleGroupChange = function (selectedGroups) {
            this.selectedGroups = selectedGroups;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "groupBrowserModal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/GroupBrowser/resources")
        ], GroupBrowser.prototype, "groupBrowserMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "modalTitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "buttonText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "buttonIcon", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], GroupBrowser.prototype, "isOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "selectedGroups", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "enableFiltering", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "enableSingleSelection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "isConfirmed", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowser.prototype, "ready", void 0);
        GroupBrowser = tslib_1.__decorate([
            decorators_1.subclass("GroupBrowser")
        ], GroupBrowser);
        return GroupBrowser;
    }(Widget_1.default));
    return GroupBrowser;
});
