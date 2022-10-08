define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget"], function (require, exports, tslib_1, decorators_1, Widget_1, widget_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "esri-config-panel-no-app-access",
        messageContainer: "esri-config-panel-no-app-access__message-container",
        jsGlobalNav: "js-global-nav",
        globalNav: "global-nav"
    };
    var NoAppAccess = (function (_super) {
        tslib_1.__extends(NoAppAccess, _super);
        function NoAppAccess(params) {
            var _this = _super.call(this, params) || this;
            _this.authorizedMessage = null;
            _this.configPanelViewModel = null;
            _this.messages = null;
            return _this;
        }
        NoAppAccess.prototype.render = function () {
            var _a, _b, _c;
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("div", { bind: this, id: CSS.globalNav, class: this.classes(CSS.jsGlobalNav, CSS.globalNav), afterCreate: this._createGlobalNav }),
                widget_1.tsx("div", { class: CSS.messageContainer },
                    widget_1.tsx("h2", null, ((_a = this.authorizedMessage) === null || _a === void 0 ? void 0 : _a.header) ? (_b = this.authorizedMessage) === null || _b === void 0 ? void 0 : _b.header : this.messages.error),
                    widget_1.tsx("p", null, (_c = this.authorizedMessage) === null || _c === void 0 ? void 0 : _c.message))));
        };
        NoAppAccess.prototype._createGlobalNav = function () {
            this.configPanelViewModel.createGlobalNav(null, true);
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], NoAppAccess.prototype, "authorizedMessage", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], NoAppAccess.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/ui/noAppAccess/resources")
        ], NoAppAccess.prototype, "messages", void 0);
        NoAppAccess = tslib_1.__decorate([
            decorators_1.subclass("NoAppAccess")
        ], NoAppAccess);
        return NoAppAccess;
    }(Widget_1.default));
    return NoAppAccess;
});
