define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Widget_1, watchUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "esri-config-panel-flow",
        settingsPanelContainer: "esri-config-panel__settings-panel-container",
        componentsContainer: "esri-config-panel__primary-panel-components-container",
        componentsContainerHeight: "esri-config-panel__primary-panel-components-container--full-height",
        componentsContainerDark: "esri-config-panel__primary-panel-components-container esri-config-panel__primary-panel-components-container--dark",
        subsectionSettings: "esri-config-panel__settings-panel-container--subsection-settings"
    };
    var FlowSettingsUI = (function (_super) {
        tslib_1.__extends(FlowSettingsUI, _super);
        function FlowSettingsUI(props) {
            var _this = _super.call(this, props) || this;
            _this.configPanelViewModel = null;
            return _this;
        }
        FlowSettingsUI.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.watch(this, ["configPanelViewModel.expressEnabled", "configPanelViewModel.currentSectionIndex"], function () {
                    return _this.resetUI();
                })
            ]);
        };
        FlowSettingsUI.prototype.setUI = function (config) {
            var heading = config.heading, content = config.content;
            this.heading = heading;
            this.content = content;
            this.isFullHeight = config === null || config === void 0 ? void 0 : config.isFullHeight;
        };
        FlowSettingsUI.prototype.resetUI = function () {
            this.heading = null;
            this.content = null;
            this.isFullHeight = false;
        };
        FlowSettingsUI.prototype.render = function () {
            var _a;
            var _this = this;
            var _b = this, heading = _b.heading, content = _b.content, configPanelViewModel = _b.configPanelViewModel, isFullHeight = _b.isFullHeight;
            var sections = configPanelViewModel.sections, currentSectionIndex = configPanelViewModel.currentSectionIndex, subsectionId = configPanelViewModel.subsectionId, darkModeEnabled = configPanelViewModel.darkModeEnabled;
            var currentSection = sections.getItemAt(currentSectionIndex);
            var withinSubsection = (currentSection === null || currentSection === void 0 ? void 0 : currentSection.hasSubsections) && subsectionId;
            var subsectionPanelStyles = (_a = {},
                _a[CSS.subsectionSettings] = withinSubsection,
                _a);
            var divClass = this.classes(darkModeEnabled ? CSS.componentsContainerDark : CSS.componentsContainer, isFullHeight ? CSS.componentsContainerHeight : "");
            return (widget_1.tsx("calcite-panel", { heading: heading, class: this.classes(subsectionPanelStyles), afterCreate: function (node) {
                    node.beforeBack = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                        return [2, this.resetUI()];
                    }); }); };
                } },
                widget_1.tsx("div", { class: divClass }, content === null || content === void 0 ? void 0 : content.render())));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], FlowSettingsUI.prototype, "heading", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FlowSettingsUI.prototype, "content", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FlowSettingsUI.prototype, "isFullHeight", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], FlowSettingsUI.prototype, "configPanelViewModel", void 0);
        FlowSettingsUI = tslib_1.__decorate([
            decorators_1.subclass("ConfigPanelViewModel.FlowSettingsUI")
        ], FlowSettingsUI);
        return FlowSettingsUI;
    }(Widget_1.default));
    return FlowSettingsUI;
});
