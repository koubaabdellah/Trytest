define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/Handles", "../BaseComponent", "./BranchingConditionalConfig/BranchingConditionalConfigViewModel", "esri/core/watchUtils", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, decorators_1, widget_1, Handles, BaseComponent, BranchingConditionalConfigViewModel_1, watchUtils_1, labelSettingMargin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    BranchingConditionalConfigViewModel_1 = tslib_1.__importDefault(BranchingConditionalConfigViewModel_1);
    var CSS = {
        base: "branching-conditional-config-base",
        header: "branching-conditional-config-base__header",
        radioGroup: "branching-conditional-config-base__radio-group",
        restrictionMsg: "branching-conditional-config-base__restriction-msg",
        branchOptionsRenderArea: "branching-conditional-config-base__branch-options",
        settingOption: "setting-option"
    };
    var BranchingConditionalConfig = (function (_super) {
        tslib_1.__extends(BranchingConditionalConfig, _super);
        function BranchingConditionalConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.selectedIndex = 0;
            _this.viewModel = new BranchingConditionalConfigViewModel_1.default();
            _this._handles = new Handles();
            _this._savedStateExists = false;
            return _this;
        }
        Object.defineProperty(BranchingConditionalConfig.prototype, "savedState", {
            set: function (state) {
                var savedBranchValue;
                if (typeof state === "boolean") {
                    savedBranchValue = state ? this.branchLabels[0].value : this.branchLabels[1].value;
                }
                else {
                    savedBranchValue = typeof state === "string" ? state : state.branchValue;
                }
                this._calcSelectedIndex(savedBranchValue);
                this._savedStateExists = true;
            },
            enumerable: false,
            configurable: true
        });
        BranchingConditionalConfig.prototype.postInitialize = function () {
            var _this = this;
            if (this.headerText == null) {
                this.headerText = this.messages.defaultHeader;
            }
            if (this.defaultFunction || this.restrictFunction) {
                watchUtils_1.watch(this.configPanelViewModel, "map", function () {
                    watchUtils_1.whenTrueOnce(_this.configPanelViewModel.map, "loaded", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return tslib_1.__generator(this, function (_a) {
                            this.loadAllMapResources();
                            watchUtils_1.whenFalseOnce(this.configPanelViewModel, "isLoadingMap", function () {
                                var _a, _b;
                                var defaultBranchLabel = (_a = _this === null || _this === void 0 ? void 0 : _this.defaultFunction) === null || _a === void 0 ? void 0 : _a.call(_this, _this.configPanelViewModel.map);
                                if (defaultBranchLabel != null && _this._savedStateExists === false) {
                                    _this._calcSelectedIndex(defaultBranchLabel);
                                }
                                _this._restrictionMessages = (_b = _this === null || _this === void 0 ? void 0 : _this.restrictFunction) === null || _b === void 0 ? void 0 : _b.call(_this, _this.configPanelViewModel.map);
                            });
                            return [2];
                        });
                    }); });
                });
            }
        };
        BranchingConditionalConfig.prototype.render = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var restrictionMsg = (_a = this === null || this === void 0 ? void 0 : this._restrictionMessages) === null || _a === void 0 ? void 0 : _a.get((_c = (_b = this === null || this === void 0 ? void 0 : this.branchLabels) === null || _b === void 0 ? void 0 : _b[this === null || this === void 0 ? void 0 : this.selectedIndex]) === null || _c === void 0 ? void 0 : _c.value);
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("div", { class: this.classes(CSS.header, labelSettingMargin_1.marginClassNames.labelText) },
                    this.headerText, (_d = this.tipItem) === null || _d === void 0 ? void 0 :
                    _d.renderTipCalciteIcon()),
                widget_1.tsx("calcite-radio-group", { class: this.classes(CSS.radioGroup, labelSettingMargin_1.marginClassNames.labelContainer), layout: "horizontal", appearance: "solid", scale: "m", width: "full", afterCreate: function (crg) {
                        crg.addEventListener("calciteRadioGroupChange", function (e) {
                            _this._calcSelectedIndex(e.detail);
                            _this._generateOutput();
                        });
                    } }, this._renderBranchLabels()),
                restrictionMsg != null ? widget_1.tsx("div", { class: CSS.restrictionMsg }, restrictionMsg) : null,
                this._renderBranchOptions()));
        };
        BranchingConditionalConfig.prototype._renderBranchLabels = function () {
            var _this = this;
            return this.branchLabels.map(function (option, index) {
                return (widget_1.tsx("calcite-radio-group-item", { checked: index === _this.selectedIndex, value: option.value, title: _this.branchTips[index] }, option.label));
            });
        };
        BranchingConditionalConfig.prototype._renderBranchOptions = function () {
            var _a, _b;
            return (_b = (_a = this.branches[this.selectedIndex]) === null || _a === void 0 ? void 0 : _a.filter(this._filterForExpress.bind(this))) === null || _b === void 0 ? void 0 : _b.map(this._renderBranchOption.bind(this));
        };
        BranchingConditionalConfig.prototype._generateOutput = function () {
            var _a;
            this.output = {
                branchValue: (_a = this.branchLabels[this.selectedIndex]) === null || _a === void 0 ? void 0 : _a.value,
                branchOptionsFieldNames: this.branches[this.selectedIndex]
            };
        };
        BranchingConditionalConfig.prototype._calcSelectedIndex = function (value) {
            var index = this.branchLabels.findIndex(function (option) {
                return option.value === value;
            });
            this.selectedIndex = index === -1 ? 0 : index;
        };
        BranchingConditionalConfig.prototype._filterForExpress = function (branchOption) {
            var _a, _b;
            if (!this.configPanelViewModel.expressEnabled) {
                return true;
            }
            else {
                var isExpress = (_b = (_a = this === null || this === void 0 ? void 0 : this.options) === null || _a === void 0 ? void 0 : _a[branchOption]) === null || _b === void 0 ? void 0 : _b.express;
                return isExpress;
            }
        };
        BranchingConditionalConfig.prototype._renderBranchOption = function (branchOption) {
            var _a;
            var option = (_a = this === null || this === void 0 ? void 0 : this.options) === null || _a === void 0 ? void 0 : _a[branchOption];
            return (widget_1.tsx("div", { class: this.classes(CSS.settingOption, labelSettingMargin_1.marginClassNames.labelContainer) }, this.configPanelViewModel.configSettings.processComponent(option)));
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "headerText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "selectedIndex", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "branches", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "branchLabels", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "branchTips", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "defaultFunction", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "restrictFunction", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "options", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "savedState", null);
        tslib_1.__decorate([
            decorators_1.property({
                type: BranchingConditionalConfigViewModel_1.default
            })
        ], BranchingConditionalConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/BranchingConditionalConfig/resources")
        ], BranchingConditionalConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BranchingConditionalConfig.prototype, "configSettingFromParams", void 0);
        BranchingConditionalConfig = tslib_1.__decorate([
            decorators_1.subclass('app.widgets.BranchingConditionalConfig')
        ], BranchingConditionalConfig);
        return BranchingConditionalConfig;
    }(BaseComponent));
    exports.default = BranchingConditionalConfig;
});
