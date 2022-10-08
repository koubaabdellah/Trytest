define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "./ListOptionConfig/ListOptionConfigViewModel"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent_1, ListOptionConfigViewModel) {
    "use strict";
    BaseComponent_1 = tslib_1.__importDefault(BaseComponent_1);
    var CSS = {
        base: "esri-list-option-config",
        accordionContainer: "esri-list-option-config--accordion-container",
        switchContainer: "esri-list-option-config--switch-container",
        switchItemContainer: "esri-list-option-config__switch-item-container",
        switchLabel: "esri-list-option-config__switch-label",
        option: "esri-list-option-config__option",
        headerContainer: "esri-list-option-config__header-container",
        singleItem: "esri-list-option-config__single-item"
    };
    var ListOptionConfig = (function (_super) {
        tslib_1.__extends(ListOptionConfig, _super);
        function ListOptionConfig(params) {
            var _this = _super.call(this, params) || this;
            _this.messages = null;
            _this.savedData = null;
            _this.outputJSON = null;
            _this.optionsCallback = null;
            _this.optionsCallbackArgs = null;
            _this.selectionMode = "single";
            _this.listMode = "accordion";
            _this.configPanelViewModel = null;
            _this.viewModel = new ListOptionConfigViewModel();
            return _this;
        }
        ListOptionConfig.prototype.render = function () {
            var _this = this;
            var _a, _b, _c, _d;
            var header = this._renderHeader();
            return (widget_1.tsx("div", { class: CSS.base },
                header,
                this.listMode === "accordion" ? (((_a = this.viewModel.listItems) === null || _a === void 0 ? void 0 : _a.length) > 1 ? (this._renderAccordion()) : (widget_1.tsx("div", { class: CSS.singleItem },
                    widget_1.tsx("span", null, (_b = this.viewModel.listItems) === null || _b === void 0 ? void 0 : _b[0].label), (_c = this.viewModel.listItems) === null || _c === void 0 ? void 0 :
                    _c.map(function (listItem) {
                        return _this._renderOptions(listItem);
                    })))) : (widget_1.tsx("div", { class: CSS.switchContainer }, (_d = this.viewModel.listItems) === null || _d === void 0 ? void 0 : _d.map(function (listItem) {
                    if (_this.selectionMode === "single" &&
                        listItem.options.length < 2) {
                        return;
                    }
                    return _this._renderSwitchContainer(listItem);
                })))));
        };
        ListOptionConfig.prototype._renderHeader = function () {
            var _a;
            return (widget_1.tsx("div", { class: CSS.headerContainer },
                widget_1.tsx("span", null, this.label), (_a = this.tipItem) === null || _a === void 0 ? void 0 :
                _a.renderTipCalciteIcon()));
        };
        ListOptionConfig.prototype._renderAccordion = function () {
            var accordionItems = this._renderAccordionItems();
            return widget_1.tsx("calcite-accordion", null, accordionItems);
        };
        ListOptionConfig.prototype._renderAccordionItems = function () {
            var _this = this;
            var listItems = this.viewModel.listItems;
            return listItems === null || listItems === void 0 ? void 0 : listItems.map(function (listItem, listItemIndex) {
                if (listItem.options.length < 2 && _this.selectionMode === "single") {
                    return;
                }
                var label = listItem.label, value = listItem.value;
                return (widget_1.tsx("calcite-accordion-item", { bind: _this, onclick: function (e) {
                        _this.viewModel.handleAccordionItem(e, listItem);
                    }, key: "listItem" + value, "item-title": label, "data-item-value": value, active: listItemIndex === 0 ? true : false }, _this._renderOptionGroup(listItem)));
            });
        };
        ListOptionConfig.prototype._renderSwitchContainer = function (listItem) {
            var _a;
            var calciteSwitch = this._renderCalciteSwitch(listItem);
            return (widget_1.tsx("div", { class: CSS.switchItemContainer },
                widget_1.tsx("label", { class: CSS.switchLabel },
                    widget_1.tsx("span", null,
                        widget_1.tsx("calcite-icon", { icon: "feature-layer", scale: "s" }),
                        listItem.label),
                    calciteSwitch),
                ((_a = this.savedData) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(listItem.value)) ? this._renderOptions(listItem)
                    : null));
        };
        ListOptionConfig.prototype._renderCalciteSwitch = function (listItem) {
            var _a;
            return (widget_1.tsx("calcite-switch", { oncalciteSwitchChange: this.viewModel.handleSwitch.bind(this, listItem), checked: (_a = this.savedData) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(listItem.value) }));
        };
        ListOptionConfig.prototype._renderOptionGroup = function (listItem) {
            return this._renderOptions(listItem);
        };
        ListOptionConfig.prototype._renderOptions = function (listItem) {
            var _this = this;
            return listItem.options.map(function (option, optionIndex) {
                return (widget_1.tsx("label", { key: listItem.value + "_" + option.value, class: CSS.option },
                    _this.selectionMode === "multi"
                        ? _this._renderCheckbox(listItem, option, optionIndex)
                        : _this._renderRadioButton(listItem, option, optionIndex),
                    option.label));
            });
        };
        ListOptionConfig.prototype._renderCheckbox = function (listItem, option, optionIndex) {
            var _this = this;
            var _a;
            return (widget_1.tsx("input", { bind: this, onclick: function (e) {
                    _this.viewModel.handleCheckbox(e, listItem, option);
                }, key: "checkbox_" + option.value + "_" + option.value + "_" + optionIndex, value: option.value, name: listItem.value, type: "checkbox", checked: ((_a = this.savedData) === null || _a === void 0 ? void 0 : _a[option.value]) === option.value }));
        };
        ListOptionConfig.prototype._renderRadioButton = function (listItem, option, optionIndex) {
            var _this = this;
            var _a;
            return (widget_1.tsx("input", { bind: this, onclick: function (e) {
                    var radioVal = e.target.value;
                    _this.viewModel.handleOutputJSON(listItem.value, radioVal);
                }, key: "radio_" + option.value + "_" + option.value + "_" + optionIndex, value: option.value, name: listItem.value, type: "radio", checked: ((_a = this.savedData) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(option.value)) ? this.savedData[option.value] === option.value
                    ? true
                    : false
                    : optionIndex === 0
                        ? true
                        : false }));
        };
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ListOptionConfig/resources")
        ], ListOptionConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.savedData")
        ], ListOptionConfig.prototype, "savedData", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], ListOptionConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.mapProperties")
        ], ListOptionConfig.prototype, "mapProperties", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.listItems")
        ], ListOptionConfig.prototype, "listItems", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.optionsCallback")
        ], ListOptionConfig.prototype, "optionsCallback", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.optionsCallbackArgs")
        ], ListOptionConfig.prototype, "optionsCallbackArgs", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectionMode")
        ], ListOptionConfig.prototype, "selectionMode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ListOptionConfig.prototype, "listMode", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], ListOptionConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ListOptionConfigViewModel
            })
        ], ListOptionConfig.prototype, "viewModel", void 0);
        ListOptionConfig = tslib_1.__decorate([
            decorators_1.subclass("ListOptionConfig")
        ], ListOptionConfig);
        return ListOptionConfig;
    }(BaseComponent_1.default));
    return ListOptionConfig;
});
