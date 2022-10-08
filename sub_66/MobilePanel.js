/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./Panel/MobilePanelViewModel", "esri/widgets/Widget", "./icons/icons"], function (require, exports, tslib_1, decorators_1, watchUtils_1, widget_1, MobilePanelViewModel_1, Widget_1, icons_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    MobilePanelViewModel_1 = tslib_1.__importDefault(MobilePanelViewModel_1);
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var MobilePanel = /** @class */ (function (_super) {
        tslib_1.__extends(MobilePanel, _super);
        function MobilePanel(props) {
            var _this = _super.call(this, props) || this;
            _this.bundle = null;
            _this.actions = [];
            _this.mobilePanel = null;
            _this.viewModel = new MobilePanelViewModel_1.default(props);
            return _this;
        }
        MobilePanel.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                (0, watchUtils_1.init)(this, ["applicationConfig.legendPanel", "applicationConfig.utilityNetwork", "applicationConfig.basemapGallery", "applicationConfig.layerEditPanel", "applicationConfig.layerListPanel", "applicationConfig.popupPanel", "applicationConfig.activePanel", "applicationConfig.details", "applicationConfig.filterPanel", "applicationConfig.bookmarksPanel"], function () {
                    _this.viewModel.createActions();
                })
            ]);
        };
        MobilePanel.prototype.render = function () {
            var _a, _b;
            var theme = this.applicationConfig.theme;
            var blocks = this.renderBlocks();
            var actionBar = this.renderActionBar();
            var hide = actionBar ? null : "hide";
            actionBar ? (_a = this.view) === null || _a === void 0 ? void 0 : _a.container.classList.remove("no-mobile") : (_b = this.view) === null || _b === void 0 ? void 0 : _b.container.classList.add("no-mobile");
            return (((0, widget_1.tsx)("div", { class: this.classes(["mobile-panel", hide, theme]) },
                (0, widget_1.tsx)("div", { "data-node-ref": "mobilePanel", afterCreate: widget_1.storeNode, bind: this, class: "mobile-block-container" }, blocks),
                actionBar)));
        };
        MobilePanel.prototype.renderActionBar = function () {
            var _this = this;
            var _a;
            return ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.length) > 0 ? ((0, widget_1.tsx)("calcite-radio-group", { scale: "s", bind: this, onclick: function (e) {
                    var _a;
                    if ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.checked) {
                        _this.viewModel.closePanel(e);
                    }
                    else {
                        _this.viewModel.openPanel(e);
                    }
                }, theme: this.applicationConfig.theme }, this.actions.map(function (action) {
                var active = action.active, name = action.name, label = action.label, key = action.key, icon = action.icon;
                return (0, widget_1.tsx)("calcite-radio-group-item", { checked: active, class: "mobile", key: key, value: name, title: label, "data-action-item": key, appearance: "clear", scale: "s", text: name, onclick: function (e) {
                        _this.viewModel.openPanel(e);
                    }, label: label }, icons_1.default[icon] === "utility-network-trace" ?
                    (0, widget_1.tsx)("span", { class: "network-icon" },
                        (0, widget_1.tsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16" },
                            (0, widget_1.tsx)("path", { d: "M1.5 11a1.5 1.5 0 0 0 1.47-1.8l2.58-1.548a1.487 1.487 0 0 0 .45.256v5.184a1.5 1.5 0 1 0 1 0V7.908A1.495 1.495 0 0 0 7.908 7h2.184a1.494 1.494 0 0 0 1.38.997l1.108 3.326a1.495 1.495 0 1 0 .948-.32L12.42 7.677a1.478 1.478 0 0 0 .233-2.126L14.2 2.97A1.5 1.5 0 1 0 13 1.5a1.486 1.486 0 0 0 .347.95L11.8 5.03a1.492 1.492 0 0 0-1.707.97H7.908a1.497 1.497 0 0 0-2.878.8L2.45 8.347A1.497 1.497 0 1 0 1.5 11zM7 14.5v.5H6v-1h1zm7-2.5v1h-1v-1h1zm0-11h1v1h-1V1zm-2.783 5H12v1h-1V6zM6 6h1v1H6V6zM1 9.5V9h1v1H1zm2-8A1.5 1.5 0 1 0 1.5 3 1.5 1.5 0 0 0 3 1.5zm-1 0V2H1V1h1zM1 14h1v1H1zm1-1H1v-1h1zM1 6h1v1H1zm1-1H1V4h1z" }),
                            (0, widget_1.tsx)("path", { fill: "none", d: "M0 0h16v16H0z" })))
                    : (0, widget_1.tsx)("calcite-icon", { scale: "s", icon: icons_1.default[icon] }));
            }))) : null;
        };
        MobilePanel.prototype.renderBlocks = function () {
            var _this = this;
            var theme = this.applicationConfig.theme;
            return this.actions.length > 0 ? this.actions.map(function (action) {
                return (0, widget_1.tsx)("calcite-panel", { class: action.active ? null : "hide", open: true, theme: true, key: action.key },
                    (0, widget_1.tsx)("div", { class: _this.classes("header", "mobile-panel-header"), slot: "header-content" },
                        (0, widget_1.tsx)("div", { class: "mobile-header-label" }, action === null || action === void 0 ? void 0 : action.label),
                        (0, widget_1.tsx)("div", { class: "header-buttons" },
                            (0, widget_1.tsx)("calcite-action", { scale: "s", class: _this.classes("panel-action", theme), onclick: _this.viewModel.expandPanel, bind: _this, text: _this.bundle.toggle, appearance: "clear", title: _this.bundle.toggle, icon: icons_1.default["expandPanel"] }),
                            (0, widget_1.tsx)("calcite-action", { scale: "s", class: _this.classes("panel-action", theme), onclick: _this.viewModel.closePanel, bind: _this, text: _this.bundle.closePanel, appearance: "clear", title: _this.bundle.closePanel, icon: icons_1.default["close"] }))),
                    (0, widget_1.tsx)("div", { bind: _this, afterCreate: _this.viewModel.createActionClickFunction(action) }));
            }) : null;
        };
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], MobilePanel.prototype, "view", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)()
        ], MobilePanel.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            (0, decorators_1.aliasOf)("viewModel.applicationConfig")
        ], MobilePanel.prototype, "applicationConfig", void 0);
        tslib_1.__decorate([
            (0, decorators_1.property)(),
            (0, widget_1.messageBundle)("sidebar/app/t9n/common")
        ], MobilePanel.prototype, "bundle", void 0);
        tslib_1.__decorate([
            (0, decorators_1.aliasOf)("viewModel.actions")
        ], MobilePanel.prototype, "actions", void 0);
        tslib_1.__decorate([
            (0, decorators_1.aliasOf)("viewModel.mobilePanel")
        ], MobilePanel.prototype, "mobilePanel", void 0);
        MobilePanel = tslib_1.__decorate([
            (0, decorators_1.subclass)("MobilePanel")
        ], MobilePanel);
        return MobilePanel;
    }((Widget_1.default)));
    exports.default = MobilePanel;
});
