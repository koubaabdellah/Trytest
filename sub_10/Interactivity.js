define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./Common", "../../icons/icons", "./Interactivity/InteractivityViewModel", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Common_1, icons_1, InteractivityViewModel, watchUtils_1) {
    "use strict";
    Common_1 = tslib_1.__importDefault(Common_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var Interactivity = (function (_super) {
        tslib_1.__extends(Interactivity, _super);
        function Interactivity(params) {
            var _this = _super.call(this, params) || this;
            _this.actionIcon = icons_1.default.gear;
            _this.actionLabel = null;
            _this.sectionHeaderLabel = null;
            _this.sectionHeaderSubtitle = null;
            _this.sectionTip = null;
            _this.type = "interactivity";
            _this.searchConfig = null;
            _this.hasSubsections = false;
            _this.messages = null;
            _this.viewModel = new InteractivityViewModel();
            return _this;
        }
        Interactivity.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.when(this, "configPanelViewModel", function () {
                    _this.set("viewModel.configPanelViewModel", _this.configPanelViewModel);
                }),
                watchUtils_1.when(this, "viewModel.searchConfig", function () {
                    _this.set("searchConfig.darkModeEnabled", _this.configPanelViewModel.darkModeEnabled);
                }),
                watchUtils_1.whenOnce(this, "messages", function () {
                    _this.viewModel.messages = _this.messages;
                    _this.actionLabel = _this.actionLabel ? _this.actionLabel : _this.messages.interactivity;
                    _this.sectionHeaderLabel = _this.sectionHeaderLabel ? _this.sectionHeaderLabel : _this.messages.interactivity;
                    _this.sectionHeaderSubtitle = _this.sectionHeaderSubtitle ? _this.sectionHeaderSubtitle : _this.messages.interactivitySubsection;
                    _this.sectionTip = _this.sectionTip ? _this.sectionTip : _this.messages.tip;
                })
            ]);
        };
        Interactivity.prototype.renderSearchConfig = function () {
            var _a;
            return (_a = this.searchConfig) === null || _a === void 0 ? void 0 : _a.render();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], Interactivity.prototype, "actionIcon", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Interactivity.prototype, "actionLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Interactivity.prototype, "sectionHeaderLabel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Interactivity.prototype, "sectionHeaderSubtitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Interactivity.prototype, "sectionTip", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], Interactivity.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.searchConfig")
        ], Interactivity.prototype, "searchConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], Interactivity.prototype, "hasSubsections", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/Interactivity/resources")
        ], Interactivity.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: InteractivityViewModel
            })
        ], Interactivity.prototype, "viewModel", void 0);
        Interactivity = tslib_1.__decorate([
            decorators_1.subclass("Interactivity")
        ], Interactivity);
        return Interactivity;
    }(Common_1.default));
    return Interactivity;
});
