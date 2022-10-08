define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./Common", "../../icons/icons", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Common_1, icons_1, watchUtils_1) {
    "use strict";
    Common_1 = tslib_1.__importDefault(Common_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        primaryPanelComponentsContainer: "esri-config-panel__primary-panel-components-container",
        primaryPanelComponentsContainerDark: "esri-config-panel__primary-panel-components-container--dark"
    };
    var Theme = (function (_super) {
        tslib_1.__extends(Theme, _super);
        function Theme(value) {
            var _this = _super.call(this, value) || this;
            _this.actionLabel = null;
            _this.sectionHeaderLabel = null;
            _this.sectionHeaderSubtitle = null;
            _this.sectionTip = null;
            _this.hasSubsections = false;
            _this.actionIcon = icons_1.default.palette;
            _this.messages = null;
            _this.type = "themeLayout";
            return _this;
        }
        Theme.prototype.postInitialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "messages", function () {
                _this.actionLabel = _this.actionLabel ? _this.actionLabel : _this.messages.themeAndLayout;
                _this.sectionHeaderLabel = _this.sectionHeaderLabel ? _this.sectionHeaderLabel : _this.messages.themeAndLayout;
                _this.sectionHeaderSubtitle = _this.sectionHeaderSubtitle ? _this.sectionHeaderSubtitle : _this.messages.themeSubsection;
                _this.sectionTip = _this.sectionTip ? _this.sectionTip : _this.messages.tip;
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Theme.prototype, "actionLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Theme.prototype, "sectionHeaderLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Theme.prototype, "sectionHeaderSubtitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Theme.prototype, "sectionTip", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Theme.prototype, "hasSubsections", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Theme.prototype, "actionIcon", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/Theme/resources")
        ], Theme.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], Theme.prototype, "type", void 0);
        Theme = tslib_1.__decorate([
            decorators_1.subclass("Theme")
        ], Theme);
        return Theme;
    }(Common_1.default));
    return Theme;
});
