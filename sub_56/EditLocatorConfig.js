define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/watchUtils", "./SearchConfig/EditLocatorConfigViewModel", "../../icons/icons", "../../utils/utils", "../../utils/focusUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, watchUtils_1, EditLocatorConfigViewModel, icons, utils_1, focusUtils_1) {
    "use strict";
    var CSS = {
        heading: "esri-search-config__heading",
        headingContainer: "esri-search-config__heading-container",
        sliderContainer: "esri-search-config__slider-container",
        slider: "esri-search-config__slider",
        countryCode: "esri-search-config__country-code-input",
        countryCodeInputContainer: "esri-search-config__country-code-input-container",
        maxSuggestionsContainer: "esri-search-config__max-suggestions-container",
        maxResultsContainer: "esri-search-config__max-results-container",
        maxSuggestions: "esri-search-config__max-suggestions",
        maxResults: "esri-search-config__max-results",
        inputContainer: "esri-search-config__input-container",
        inputNode: "esri-search-config__input",
        questionContainer: "esri-search-config__question-container",
        inputInlineBlock: "esri-search-config__input-inline-block",
        sliderValue: "esri-search-config__slider-text-value",
        editConfigPanel: "esri-search-config__edit-config-panel",
        editIconTooltip: "esri-search-config__edit-icon-tooltip",
        countryCodeIcon: "esri-search-config__country-code-icon",
        configForm: "esri-search-config__config-form",
        formSubtitle: "esri-search-config__form-subtitle",
        invalidInput: "esri-search-config__invalid-input",
        invalidText: "esri-search-config__invalid-text",
        checkboxLabel: "esri-search-config__checkbox-label",
        rtlIcon: "esri-config-panel__icon-rtl",
        calciteStyles: {
            descriptionIcon: "icon-ui-description"
        }
    };
    var GEOCODE_COVERAGE_LINK = "https://developers.arcgis.com/rest/geocode/api-reference/geocode-coverage.htm";
    var EditLocatorConfig = (function (_super) {
        tslib_1.__extends(EditLocatorConfig, _super);
        function EditLocatorConfig(value) {
            var _this = _super.call(this, value) || this;
            _this._suggestionsInputEnabled = null;
            _this._localSearchInputsEnabled = null;
            _this._invalidMaxSuggestionsInput = false;
            _this._invalidMaxResultsInput = false;
            _this._invalidCountryCodeInput = false;
            _this.locatorValues = null;
            _this.darkModeEnabled = null;
            _this.searchConfigViewModel = null;
            _this.viewModel = new EditLocatorConfigViewModel({
                searchConfigViewModel: _this.searchConfigViewModel
            });
            _this.locatorSourceCloseNode = null;
            return _this;
        }
        EditLocatorConfig.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.init(this, "viewModel.locatorItemIndex", function () {
                    _this._suggestionsInputEnabled = null;
                    _this._localSearchInputsEnabled = null;
                    _this.scheduleRender();
                }),
                watchUtils_1.when(this, "locatorSourceCloseNode", function () {
                    _this.locatorSourceCloseNode.setFocus();
                })
            ]);
        };
        EditLocatorConfig.prototype.render = function () {
            var _a = this, viewModel = _a.viewModel, searchConfigViewModel = _a.searchConfigViewModel;
            var locatorItemIndex = this.viewModel.locatorItemIndex;
            viewModel.locatorItemToBeConfigured = searchConfigViewModel.configItems.getItemAt(locatorItemIndex);
            var locatorConfigForm = this._renderLocatorConfigForm();
            return widget_1.tsx("div", { class: CSS.editConfigPanel }, locatorConfigForm);
        };
        EditLocatorConfig.prototype.editLocator = function () {
            focusUtils_1.focusNode("sourceItem-" + this.viewModel.locatorItemIndex);
            this._invalidMaxResultsInput = false;
            this._invalidMaxSuggestionsInput = false;
            this._invalidCountryCodeInput = false;
            this.viewModel.editLocator();
        };
        EditLocatorConfig.prototype.cancelLocatorEdit = function () {
            focusUtils_1.focusNode("sourceItem-" + this.viewModel.locatorItemIndex);
            this._invalidMaxResultsInput = false;
            this._invalidMaxSuggestionsInput = false;
            this._invalidCountryCodeInput = false;
            this.viewModel.cancelLocator();
        };
        EditLocatorConfig.prototype._renderLocatorConfigForm = function () {
            var locatorNameInput = this._renderLocatorNameInput();
            var locatorPlaceholderInput = this._renderLocatorPlaceholderInput();
            var locatorZoomScaleInput = this._renderLocatorZoomScaleInput();
            var locatorMaxSuggestionsInput = this._renderMaxSuggestionsInput();
            var locatorMaxResultsInput = this._renderMaxResultsInput();
            var locatorSuggestionsEnabledInput = this._renderSuggestionsEnabledInput();
            var locatorWithinViewEnabled = this._renderWithinViewEnabledInput();
            var countryCodeInput = this._renderCountryCodeInput();
            return (widget_1.tsx("div", { class: CSS.configForm },
                widget_1.tsx("div", { class: CSS.headingContainer },
                    widget_1.tsx("span", { class: CSS.heading }, this.viewModel.locatorItemToBeConfigured.name),
                    widget_1.tsx("calcite-button", { bind: this, onclick: this.editLocator, appearance: "transparent", title: this.viewModel.searchConfigViewModel.layerSelectorMessages
                            .fieldExit, "aria-label": this.viewModel.searchConfigViewModel.shareMessages.close, "data-node-ref": "locatorSourceCloseNode", afterCreate: widget_1.storeNode, "icon-start": icons.close })),
                locatorNameInput,
                locatorPlaceholderInput,
                locatorZoomScaleInput,
                locatorMaxSuggestionsInput,
                locatorMaxResultsInput,
                locatorSuggestionsEnabledInput,
                locatorWithinViewEnabled,
                countryCodeInput));
        };
        EditLocatorConfig.prototype._renderLocatorNameInput = function () {
            return (widget_1.tsx("label", null,
                this.viewModel.searchConfigViewModel.searchConfigMessages.locatorName,
                widget_1.tsx("calcite-input", { bind: this, oncalciteInputChange: this.viewModel.modifyLocatorMap, type: "text", value: this.viewModel.locatorItemToBeConfigured.name, name: "name" })));
        };
        EditLocatorConfig.prototype._renderLocatorPlaceholderInput = function () {
            return (widget_1.tsx("label", null,
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .placeholderText,
                widget_1.tsx("calcite-input", { bind: this, oncalciteInputChange: this.viewModel.modifyLocatorMap, type: "text", value: this.viewModel.locatorItemToBeConfigured.placeholder, name: "placeholder" })));
        };
        EditLocatorConfig.prototype._renderLocatorZoomScaleInput = function () {
            var zoomScale = this.viewModel.locatorItemToBeConfigured.zoomScale;
            var locatorValues = this.locatorValues;
            return (widget_1.tsx("label", null, this.viewModel.searchConfigViewModel.searchConfigMessages.zoomScale + ": ",
                widget_1.tsx("span", { class: CSS.sliderValue }, locatorValues.get("zoomScale")
                    ? "1 : " + locatorValues.get("zoomScale")
                    : zoomScale === null
                        ? this.viewModel.searchConfigViewModel.searchConfigMessages.none
                        : "1 : " + zoomScale),
                widget_1.tsx("div", { class: CSS.inputContainer },
                    widget_1.tsx("input", { bind: this, onchange: this.viewModel.modifyLocatorMap, class: this.classes(CSS.inputNode, CSS.inputInlineBlock), tabIndex: 0, type: "range", min: "0", max: "500000", value: zoomScale, step: "1", "aria-valuemin": "0", "aria-valuemax": "500000", "aria-valuenow": zoomScale, name: "zoomScale" }))));
        };
        EditLocatorConfig.prototype._renderMaxSuggestionsInput = function () {
            var _a, _b;
            var _this = this;
            var _c = this.viewModel.locatorItemToBeConfigured, maxSuggestions = _c.maxSuggestions, suggestionsEnabled = _c.suggestionsEnabled;
            var invalidInput = (_a = {},
                _a[CSS.invalidInput] = this._invalidMaxSuggestionsInput,
                _a);
            var invalidText = (_b = {},
                _b[CSS.invalidText] = this._invalidMaxSuggestionsInput,
                _b);
            return (widget_1.tsx("label", { class: this.classes(invalidText) },
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .maxSuggestions,
                widget_1.tsx("input", { class: this.classes(invalidInput), bind: this, onchange: function (e) {
                        if (isNaN(parseFloat(e.currentTarget.value))) {
                            _this._invalidMaxSuggestionsInput = true;
                        }
                        else {
                            _this._invalidMaxSuggestionsInput = false;
                            _this.viewModel.modifyLocatorMap(e);
                        }
                        _this.scheduleRender();
                    }, min: "0", max: "15", type: "number", value: maxSuggestions, disabled: this._suggestionsInputEnabled === null
                        ? !suggestionsEnabled
                        : !this._suggestionsInputEnabled, name: "maxSuggestions" }),
                this._invalidMaxSuggestionsInput ? (widget_1.tsx("div", { key: "locator-max-suggestions-error", class: CSS.invalidText }, this.viewModel.searchConfigViewModel.searchConfigMessages
                    .invalidFieldText)) : null));
        };
        EditLocatorConfig.prototype._renderMaxResultsInput = function () {
            var _a, _b;
            var _this = this;
            var invalidInput = (_a = {},
                _a[CSS.invalidInput] = this._invalidMaxResultsInput,
                _a);
            var invalidText = (_b = {},
                _b[CSS.invalidText] = this._invalidMaxResultsInput,
                _b);
            return (widget_1.tsx("label", { class: this.classes(invalidText) },
                this.viewModel.searchConfigViewModel.searchConfigMessages.maxResults,
                widget_1.tsx("input", { bind: this, onchange: function (e) {
                        if (isNaN(parseFloat(e.currentTarget.value))) {
                            _this._invalidMaxResultsInput = true;
                        }
                        else {
                            _this._invalidMaxResultsInput = false;
                            _this.viewModel.modifyLocatorMap(e);
                        }
                        _this.scheduleRender();
                    }, class: this.classes(invalidInput), min: "0", max: "15", type: "number", value: this.viewModel.locatorItemToBeConfigured.maxResults, name: "maxResults" }),
                this._invalidMaxResultsInput ? (widget_1.tsx("div", { key: "locator-max-results-error", class: CSS.invalidText }, this.viewModel.searchConfigViewModel.searchConfigMessages
                    .invalidFieldText)) : null));
        };
        EditLocatorConfig.prototype._renderSuggestionsEnabledInput = function () {
            return (widget_1.tsx("label", { class: CSS.checkboxLabel },
                widget_1.tsx("input", { bind: this, onclick: this._enableSuggestionsInput, onkeydown: this._enableSuggestionsInput, onchange: this.viewModel.modifyLocatorMap, type: "checkbox", checked: this.viewModel.locatorItemToBeConfigured.suggestionsEnabled, name: "suggestionsEnabled" }),
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .enableSuggestions));
        };
        EditLocatorConfig.prototype._renderWithinViewEnabledInput = function () {
            var withinViewEnabled = this.viewModel.locatorItemToBeConfigured
                .withinViewEnabled;
            return (widget_1.tsx("label", { class: CSS.checkboxLabel },
                widget_1.tsx("input", { bind: this, onchange: this.viewModel.modifyLocatorMap, type: "checkbox", checked: withinViewEnabled, name: "withinViewEnabled" }),
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .constrainSearch));
        };
        EditLocatorConfig.prototype._renderLocalSearchEnabledInput = function () {
            return (widget_1.tsx("label", { class: CSS.checkboxLabel },
                widget_1.tsx("input", { bind: this, onclick: this._enableLocalSearchInputs, onkeydown: this._enableLocalSearchInputs, onchange: this.viewModel.modifyLocatorMap, checked: this.viewModel.locatorItemToBeConfigured.localSearchEnabled, value: "localSearchEnabled", type: "checkbox", name: "localSearchEnabled" }),
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .enableLocalSearch));
        };
        EditLocatorConfig.prototype._renderCountryCodeInput = function () {
            var _a, _b, _c;
            var _this = this;
            var countryCode = this.viewModel.locatorItemToBeConfigured.countryCode;
            var invalidInput = (_a = {},
                _a[CSS.invalidInput] = this._invalidCountryCodeInput,
                _a);
            var invalidText = (_b = {},
                _b[CSS.invalidText] = this._invalidCountryCodeInput,
                _b);
            var RTL = (_c = {},
                _c[CSS.rtlIcon] = widget_1.isRTL(),
                _c);
            return (widget_1.tsx("label", { class: this.classes(invalidText) },
                this.viewModel.searchConfigViewModel.searchConfigMessages.countryCode,
                widget_1.tsx("div", { class: this.classes(CSS.inputContainer, CSS.countryCodeInputContainer) },
                    widget_1.tsx("calcite-input", { bind: this, oncalciteInputChange: function (e) {
                            if (utils_1.strHasSpecialCharsOrNum(e.currentTarget.value)) {
                                _this._invalidCountryCodeInput = true;
                            }
                            else {
                                _this._invalidCountryCodeInput = false;
                                _this.viewModel.modifyLocatorMap(e);
                            }
                            _this.scheduleRender();
                        }, class: this.classes(CSS.countryCode, invalidInput), value: countryCode, type: "text", name: "countryCode", maxLength: "3" }),
                    widget_1.tsx("div", { class: this.classes(CSS.questionContainer, CSS.inputInlineBlock) },
                        widget_1.tsx("a", { href: GEOCODE_COVERAGE_LINK, target: "_blank" },
                            widget_1.tsx("calcite-icon", { class: this.classes(CSS.countryCodeIcon, RTL), icon: icons.question, scale: "s" })))),
                this._invalidCountryCodeInput ? (widget_1.tsx("div", { key: "invalid-country-code-error", class: CSS.invalidText }, this.viewModel.searchConfigViewModel.searchConfigMessages
                    .invalidCountryCode)) : null));
        };
        EditLocatorConfig.prototype._enableSuggestionsInput = function () {
            if (this._suggestionsInputEnabled === null) {
                var suggestionsEnabled = this.viewModel.locatorItemToBeConfigured.suggestionsEnabled;
                this._suggestionsInputEnabled = !suggestionsEnabled;
                this.scheduleRender();
                return;
            }
            if (this._suggestionsInputEnabled) {
                this._suggestionsInputEnabled = false;
            }
            else {
                this._suggestionsInputEnabled = true;
            }
            this.scheduleRender();
        };
        EditLocatorConfig.prototype._enableLocalSearchInputs = function () {
            if (this._localSearchInputsEnabled === null) {
                var localSearchEnabled = this.viewModel.locatorItemToBeConfigured.localSearchEnabled;
                this._localSearchInputsEnabled = !localSearchEnabled;
                this.scheduleRender();
                return;
            }
            if (this._localSearchInputsEnabled) {
                this._localSearchInputsEnabled = false;
            }
            else {
                this._localSearchInputsEnabled = true;
            }
            this.scheduleRender();
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.locatorValues")
        ], EditLocatorConfig.prototype, "locatorValues", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLocatorConfig.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.searchConfigViewModel")
        ], EditLocatorConfig.prototype, "searchConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: EditLocatorConfigViewModel
            })
        ], EditLocatorConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLocatorConfig.prototype, "locatorSourceCloseNode", void 0);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], EditLocatorConfig.prototype, "_enableSuggestionsInput", null);
        EditLocatorConfig = tslib_1.__decorate([
            decorators_1.subclass("EditLocatorConfig")
        ], EditLocatorConfig);
        return EditLocatorConfig;
    }(Widget));
    return EditLocatorConfig;
});
