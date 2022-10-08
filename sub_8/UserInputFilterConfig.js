define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "../../icons/icons"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, icons) {
    "use strict";
    var CSS = {
        base: "filter-config__interactive-filter-config",
        label: "esri-config-panel__config-setting-label",
        switchLabel: "filter-config__switch-label",
        tooltipContainer: "filter-config__tooltip-icon-switch-container",
        interactiveContainer: "filter-config__interactive-container",
        save: "filter-config__interactive-save",
        select: "filter-config__select",
        errorContainer: "filter-config__error-container"
    };
    var UserInputFilterConfig = (function (_super) {
        tslib_1.__extends(UserInputFilterConfig, _super);
        function UserInputFilterConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.isEditing = false;
            _this.showError = false;
            _this._fields = [];
            _this._defaultConfig = {
                id: Date.now(),
                name: null
            };
            return _this;
        }
        UserInputFilterConfig.prototype.destroy = function () {
            this.viewModel = null;
            this.configPanelViewModel = null;
            this.selectedLayer = null;
        };
        UserInputFilterConfig.prototype.postInitialize = function () {
            var _a;
            this._userInputFieldTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-user-input-filter-config", "user-input-filter-config", this.messages.userInputFieldTooltip);
            this._nameTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-display-name-filter-config", "display-name-filter-config", this.messages.displayNameTooltip);
            this._placeholderTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-placeholder-filter-config", "placeholder-filter-config", this.messages.placeholderTooltip);
            this._stepTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-step-filter-config", "step-filter-config", this.messages.stepTooltip);
            this.type = (_a = this.userInputFilterConfig) === null || _a === void 0 ? void 0 : _a.type;
            this.setFields();
        };
        UserInputFilterConfig.prototype.render = function () {
            var _a;
            var typeConfig = this.type === "string" || this.type === "coded-value"
                ? this._renderStringConfig()
                : this.type === "number" || this.type === "range"
                    ? this._renderNumberConfig()
                    : this.type === "date"
                        ? this._renderDateConfig()
                        : null;
            var save = this.type ? this._renderSave() : null;
            var _b = this.messages, selectField = _b.selectField, userInputFilter = _b.userInputFilter;
            return (widget_1.tsx("div", { key: "user-input-filter", class: CSS.base },
                widget_1.tsx("span", { class: CSS.label },
                    userInputFilter,
                    " ", (_a = this._userInputFieldTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("select", { class: CSS.select, bind: this, onchange: this._handleSelectField, afterCreate: this._handleSelectFieldCreate },
                    widget_1.tsx("option", { value: "default" },
                        "--",
                        selectField,
                        "--"),
                    this._fields.map(function (field) {
                        return (widget_1.tsx("option", { key: field.name, value: field.name }, field.alias));
                    })),
                typeConfig,
                save));
        };
        UserInputFilterConfig.prototype.setFields = function () {
            var _this = this;
            if (!this.selectedLayer)
                return;
            var fields = this.selectedLayer.fields;
            this._fields = [];
            fields === null || fields === void 0 ? void 0 : fields.forEach(function (field) {
                var _a, _b;
                var fieldType;
                var domainType = (_a = field.domain) === null || _a === void 0 ? void 0 : _a.type;
                var name = field.name, alias = field.alias, type = field.type;
                if (domainType === "coded-value" || domainType === "range") {
                    fieldType = domainType;
                }
                else if (type === "small-integer" ||
                    type === "integer" ||
                    type === "single" ||
                    type === "double" ||
                    type === "long") {
                    fieldType = "number";
                }
                else if (type === "date" || type === "string") {
                    fieldType = type;
                }
                if (fieldType) {
                    if (((_b = _this.userInputFilterConfig) === null || _b === void 0 ? void 0 : _b.field) === name) {
                        _this.userInputFilterConfig.type = fieldType;
                        _this.type = fieldType;
                    }
                    _this._fields.push({
                        name: name,
                        alias: alias,
                        type: fieldType
                    });
                }
            });
        };
        UserInputFilterConfig.prototype._renderStringConfig = function () {
            var _a = this.messages, displayName = _a.displayName, placeholder = _a.placeholder;
            var nameInput = this._renderInput(displayName, "name");
            var placeholderInput = this._renderInput(placeholder, "placeholder");
            return (widget_1.tsx("div", { key: "string-config", class: CSS.interactiveContainer },
                nameInput,
                placeholderInput));
        };
        UserInputFilterConfig.prototype._renderNumberConfig = function () {
            var _a = this.messages, displayName = _a.displayName, sliderIncrement = _a.sliderIncrement;
            var nameInput = this._renderInput(displayName, "name");
            var step = this._renderInput(sliderIncrement, "step", "number");
            return (widget_1.tsx("div", { key: "number-config", class: CSS.interactiveContainer },
                nameInput,
                step));
        };
        UserInputFilterConfig.prototype._renderDateConfig = function () {
            var displayName = this.messages.displayName;
            var nameInput = this._renderInput(displayName, "name");
            return (widget_1.tsx("div", { key: "date-config", class: CSS.interactiveContainer }, nameInput));
        };
        UserInputFilterConfig.prototype._renderInput = function (label, field, inputType) {
            var _a, _b, _c;
            if (inputType === void 0) { inputType = "text"; }
            var isStep;
            var value = (_b = (_a = this.userInputFilterConfig) === null || _a === void 0 ? void 0 : _a[field]) !== null && _b !== void 0 ? _b : null;
            if (field === "step") {
                isStep = true;
                value = value ? value : 1;
            }
            return (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.label },
                    label,
                    " ", (_c = this === null || this === void 0 ? void 0 : this["_" + field + "Tooltip"]) === null || _c === void 0 ? void 0 :
                    _c.renderTipCalciteIcon()),
                widget_1.tsx("input", { onblur: this._handleInput.bind(this, field), onchange: this._handleInput.bind(this, field), min: isStep ? 0 : null, type: inputType, value: value, step: "any" }),
                this.showError && field === "step" ? (widget_1.tsx("div", { key: "step-error", class: CSS.errorContainer },
                    widget_1.tsx("calcite-icon", { icon: icons.exclamationMarkTriangle, filled: true, scale: "s" }),
                    widget_1.tsx("p", null, this.messages.stepError))) : null));
        };
        UserInputFilterConfig.prototype._renderSave = function () {
            return (widget_1.tsx("div", { class: CSS.save },
                widget_1.tsx("calcite-button", { width: "half", onclick: this.viewModel.updateInteractiveExpressions.bind(this.viewModel, this.userInputFilterConfig, this.isEditing) }, this.messages.save),
                widget_1.tsx("calcite-button", { bind: this.viewModel, width: "half", appearance: "outline", onclick: this.viewModel.handleCancelUserInputFilter }, this.messages.cancel)));
        };
        UserInputFilterConfig.prototype._handleInput = function (field, event) {
            var _a;
            var node = event.currentTarget;
            if (node.value) {
                if (node.type === "number") {
                    this.showError = field === "step" && Number(node.value) <= 0;
                }
                this.userInputFilterConfig[field] = node.value;
            }
            else {
                (_a = this.userInputFilterConfig) === null || _a === void 0 ? true : delete _a[field];
            }
        };
        UserInputFilterConfig.prototype._handleSelectField = function (event) {
            var node = event.target;
            var field = this._fields.find(function (_a) {
                var name = _a.name;
                return name === node.value;
            });
            if (node.value !== "default") {
                this.type = field.type;
            }
            else {
                this.type = null;
            }
            this.userInputFilterConfig = tslib_1.__assign({}, this._defaultConfig);
            this.userInputFilterConfig.type = this.type;
            this.userInputFilterConfig.name = field.alias;
            this.userInputFilterConfig.field = field.name;
            delete this.userInputFilterConfig.placeholder;
        };
        UserInputFilterConfig.prototype._handleSelectFieldCreate = function (select) {
            if (this.isEditing) {
                select.value = this.userInputFilterConfig.field;
            }
        };
        UserInputFilterConfig.prototype._preventDefault = function (event) {
            event.preventDefault();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "theme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "field", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "isEditing", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "showError", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], UserInputFilterConfig.prototype, "userInputFilterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.messages")
        ], UserInputFilterConfig.prototype, "messages", void 0);
        UserInputFilterConfig = tslib_1.__decorate([
            decorators_1.subclass("UserInputFilterConfig")
        ], UserInputFilterConfig);
        return UserInputFilterConfig;
    }(Widget));
    return UserInputFilterConfig;
});
