define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/widgets/Widget", "esri/core/watchUtils", "./SearchConfig/EditLayerConfigViewModel", "../../icons/icons", "../../utils/focusUtils"], function (require, exports, tslib_1, decorators_1, widget_1, Widget, watchUtils_1, EditLayerConfigViewModel, icons, focusUtils_1) {
    "use strict";
    var CSS = {
        heading: "esri-search-config__heading",
        headingContainer: "esri-search-config__heading-container",
        dropDownList: "esri-search-config__dropdown",
        maxSuggestionsContainer: "esri-search-config__max-suggestions-container",
        maxResultsContainer: "esri-search-config__max-results-container",
        maxSuggestions: "esri-search-config__max-suggestions",
        maxResults: "esri-search-config__max-results",
        inputContainer: "esri-search-config__input-container",
        inputNode: "esri-search-config__input",
        questionContainer: "esri-search-config__question-container",
        inputInlineBlock: "esri-search-config__input-inline-block",
        searchFieldsContainer: "esri-search-config__search-fields-container",
        sliderValue: "esri-search-config__slider-text-value",
        editConfigPanel: "esri-search-config__edit-config-panel",
        searchFieldsButton: "esri-search-config__add-search-field-button",
        searchFieldsDropDownList: "esri-search-config__search-field-dropdown",
        outField: "esri-search-config--outField",
        label: "esri-search-config__label",
        outFieldLabel: "esri-search-config__outfield-label",
        closeOutField: "esri-search-config__close-outfield",
        searchFieldAlert: "esri-search-config__search-field-alert",
        addOutFieldButton: "esri-search-config__add-out-field-button",
        alert: "esri-search-config__alert",
        alertIconContainer: "esri-search-config__alert-icon-container",
        alertMessageContainer: "esri-search-config__alert-message-container",
        alertMessage: "esri-search-config__alert-message",
        alertLink: "esri-search-config__alert-link",
        editIconTooltip: "esri-search-config__edit-icon-tooltip",
        configForm: "esri-search-config__config-form",
        formSubtitle: "esri-search-config__form-subtitle",
        invalidInput: "esri-search-config__invalid-input",
        invalidText: "esri-search-config__invalid-text",
        checkboxLabel: "esri-search-config__checkbox-label",
        calciteStyles: {
            button: "btn",
            greenButton: "btn-green",
            questionIcon: "icon-ui-question",
            tooltip: "tooltip",
            tooltipLeft: "tooltip-left",
            tooltipMultililne: "tooltip-multiline",
            modifierClass: "modifier-class",
            closeIcon: "icon-ui-close",
            label: "label",
            blueLabel: "label-blue",
            warningIcon: "icon-ui-error2"
        }
    };
    var EditLayerConfig = (function (_super) {
        tslib_1.__extends(EditLayerConfig, _super);
        function EditLayerConfig(value) {
            var _this = _super.call(this, value) || this;
            _this._suggestionsInputEnabled = null;
            _this._invalidMaxSuggestionsInput = false;
            _this._invalidMaxResultsInput = false;
            _this.searchConfigViewModel = null;
            _this.layerValues = null;
            _this.darkModeEnabled = null;
            _this.viewModel = new EditLayerConfigViewModel({
                searchConfigViewModel: _this.searchConfigViewModel
            });
            _this.layerSourceCloseNode = null;
            return _this;
        }
        EditLayerConfig.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.init(this, "viewModel.layerItemIndex", function () {
                    _this._suggestionsInputEnabled = null;
                    _this.scheduleRender();
                }),
                watchUtils_1.when(this, "layerSourceCloseNode", function () {
                    _this.layerSourceCloseNode.setFocus();
                })
            ]);
        };
        EditLayerConfig.prototype.render = function () {
            var layerItemIndex = this.viewModel.layerItemIndex;
            this.viewModel.layerItemToBeConfigured = this.searchConfigViewModel.configItems.getItemAt(layerItemIndex);
            var layerConfigForm = this._renderLayerConfigForm();
            return (widget_1.tsx("div", null,
                widget_1.tsx("div", { class: CSS.editConfigPanel }, layerConfigForm)));
        };
        EditLayerConfig.prototype.editLayer = function () {
            focusUtils_1.focusNode("sourceItem-" + this.viewModel.layerItemIndex);
            this._invalidMaxResultsInput = false;
            this._invalidMaxSuggestionsInput = false;
            this.viewModel.editLayer();
        };
        EditLayerConfig.prototype.cancelLayerEdit = function () {
            focusUtils_1.focusNode("sourceItem-" + this.viewModel.layerItemIndex);
            this._invalidMaxResultsInput = false;
            this._invalidMaxSuggestionsInput = false;
            this.viewModel.cancelLayerEdit();
        };
        EditLayerConfig.prototype._renderLayerConfigForm = function () {
            var layerNameInput = this._renderLayerNameInput();
            var layerPlaceholderInput = this._renderLayerPlaceholderInput();
            var layerSearchFieldsInput = this._renderLayerSearchFieldsInput();
            var layerDisplayFieldInput = this._renderLayerDisplayFieldInput();
            var layerZoomScaleInput = this._renderLayerZoomScaleInput();
            var layerMaxSuggestionsInput = this._renderLayerMaxSugguestionsInput();
            var layerMaxResultsInput = this._renderLayerMaxResultsInput();
            var layerEnableSuggestionsInput = this._renderLayerEnableSuggestionsInput();
            var layerWithinViewEnabledInput = this._renderLayerWithinViewEnabledInput();
            var layerExactMatchInput = this._renderLayerExactMatchInput();
            return (widget_1.tsx("div", { class: CSS.configForm },
                widget_1.tsx("div", { class: CSS.headingContainer },
                    widget_1.tsx("span", { class: CSS.heading }, this.viewModel.layerItemToBeConfigured.name)),
                layerNameInput,
                layerPlaceholderInput,
                layerSearchFieldsInput,
                layerDisplayFieldInput,
                layerZoomScaleInput,
                layerMaxSuggestionsInput,
                layerMaxResultsInput,
                layerEnableSuggestionsInput,
                layerWithinViewEnabledInput,
                layerExactMatchInput));
        };
        EditLayerConfig.prototype._renderLayerNameInput = function () {
            return (widget_1.tsx("label", null,
                this.viewModel.searchConfigViewModel.searchConfigMessages.layerName,
                widget_1.tsx("calcite-input", { bind: this, oncalciteInputChange: this.viewModel.modifyLayerMap, type: "text", name: "name", value: this.viewModel.layerItemToBeConfigured.name })));
        };
        EditLayerConfig.prototype._renderLayerPlaceholderInput = function () {
            return (widget_1.tsx("label", null,
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .placeholderText,
                widget_1.tsx("calcite-input", { bind: this, oncalciteInputChange: this.viewModel.modifyLayerMap, type: "text", name: "placeholder", value: this.viewModel.layerItemToBeConfigured.placeholder })));
        };
        EditLayerConfig.prototype._renderLayerSearchFieldsInput = function () {
            var searchFields = this._renderSearchFields();
            var outFieldNodes = this._renderOutFields();
            return (widget_1.tsx("label", null,
                this.viewModel.searchConfigViewModel.searchConfigMessages.searchFields,
                widget_1.tsx("div", { class: CSS.searchFieldsContainer },
                    widget_1.tsx("select", { bind: this, onchange: this.viewModel.modifyLayerMap, class: CSS.searchFieldsDropDownList, name: "searchField" }, searchFields),
                    widget_1.tsx("calcite-button", { bind: this, onclick: this._addOutField, onkeydown: this._addOutField, class: CSS.addOutFieldButton, disabled: this.layerValues
                            .get("outFields")
                            .indexOf(this.layerValues.get("searchField")) !== -1 ||
                            this.layerValues.get("searchField") === undefined
                            ? true
                            : false, width: "full" }, this.viewModel.searchConfigViewModel.searchConfigMessages.add),
                    this.layerValues.get("outFields").length === 0 ? (widget_1.tsx("div", { key: "edit-layer-warning-node", class: CSS.alert },
                        widget_1.tsx("div", { class: CSS.alertIconContainer },
                            widget_1.tsx("calcite-icon", { icon: icons.exclamationMarkTriangle, filled: true, scale: "s" })),
                        widget_1.tsx("div", { class: CSS.alertMessageContainer },
                            widget_1.tsx("span", { class: CSS.alertMessage },
                                " ",
                                this.viewModel.searchConfigViewModel.searchConfigMessages
                                    .searchFieldWarning)))) : null),
                widget_1.tsx("p", null, outFieldNodes)));
        };
        EditLayerConfig.prototype._renderSearchFields = function () {
            var _this = this;
            var layerItemIndex = this.viewModel.layerItemIndex;
            var svmLayerSources = this.searchConfigViewModel.searchViewModel.sources;
            var svmSourceItem = svmLayerSources.getItemAt(layerItemIndex);
            var featureLayer = svmSourceItem.layer;
            if (featureLayer.get("popupTemplate")) {
                var fieldInfos = featureLayer.get("popupTemplate.fieldInfos");
                if (!fieldInfos) {
                    return;
                }
                return fieldInfos.map(function (searchField, fieldIndex) {
                    return _this._renderSearchFieldUsingPopupTemplate(searchField, fieldIndex);
                });
            }
            else {
                var fields = featureLayer.fields;
                if (!fields) {
                    return;
                }
                return fields.map(function (searchField, fieldIndex) {
                    return _this._renderSearchField(searchField, fieldIndex);
                });
            }
        };
        EditLayerConfig.prototype._renderSearchFieldUsingPopupTemplate = function (searchField, fieldIndex) {
            return (widget_1.tsx("option", { key: fieldIndex, value: searchField.fieldName }, searchField.label ? searchField.label : searchField.fieldName));
        };
        EditLayerConfig.prototype._renderSearchField = function (searchField, fieldIndex) {
            return (widget_1.tsx("option", { key: fieldIndex, value: searchField.name }, searchField.name));
        };
        EditLayerConfig.prototype._renderLayerDisplayFieldInput = function () {
            var searchFieldOptions = this._renderDisplayFieldOptions();
            return (widget_1.tsx("label", null,
                this.viewModel.searchConfigViewModel.searchConfigMessages.displayField,
                widget_1.tsx("select", { bind: this, onchange: this.viewModel.modifyLayerMap, name: "displayField", class: CSS.dropDownList }, searchFieldOptions)));
        };
        EditLayerConfig.prototype._renderLayerZoomScaleInput = function () {
            var zoomScale = this.viewModel.layerItemToBeConfigured.zoomScale;
            return (widget_1.tsx("label", null, this.viewModel.searchConfigViewModel.searchConfigMessages.zoomScale + ": ",
                widget_1.tsx("span", { class: CSS.sliderValue }, this.layerValues.get("zoomScale")
                    ? "1 : " + this.layerValues.get("zoomScale")
                    : zoomScale === null
                        ? this.viewModel.searchConfigViewModel.searchConfigMessages.none
                        : "1 : " + zoomScale),
                widget_1.tsx("div", { class: CSS.inputContainer },
                    widget_1.tsx("input", { bind: this, onchange: this.viewModel.modifyLayerMap, class: this.classes(CSS.inputNode, CSS.inputInlineBlock), type: "range", name: "zoomScale", min: "0", max: "500000", value: zoomScale, step: "1", "aria-valuemin": "0", "aria-valuemax": "500000", "aria-valuenow": zoomScale }))));
        };
        EditLayerConfig.prototype._renderLayerMaxSugguestionsInput = function () {
            var _a, _b;
            var _this = this;
            var _c = this.viewModel.layerItemToBeConfigured, maxSuggestions = _c.maxSuggestions, suggestionsEnabled = _c.suggestionsEnabled;
            var invalidInput = (_a = {},
                _a[CSS.invalidInput] = this._invalidMaxSuggestionsInput,
                _a);
            var invalidText = (_b = {},
                _b[CSS.invalidText] = this._invalidMaxSuggestionsInput,
                _b);
            return (widget_1.tsx("label", { class: this.classes(invalidText) },
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .maxSuggestions,
                widget_1.tsx("div", { class: CSS.inputContainer },
                    widget_1.tsx("input", { bind: this, class: this.classes(invalidInput), onchange: function (e) {
                            if (isNaN(parseFloat(e.currentTarget.value))) {
                                _this._invalidMaxSuggestionsInput = true;
                            }
                            else {
                                _this._invalidMaxSuggestionsInput = false;
                                _this.viewModel.modifyLayerMap(e);
                            }
                            _this.scheduleRender();
                        }, min: "0", max: "15", type: "number", name: "maxSuggestions", value: maxSuggestions, disabled: this._suggestionsInputEnabled === null
                            ? !suggestionsEnabled
                            : !this._suggestionsInputEnabled })),
                this._invalidMaxSuggestionsInput ? (widget_1.tsx("div", { key: "layer-max-suggestions-error", class: CSS.invalidText }, this.viewModel.searchConfigViewModel.searchConfigMessages
                    .invalidFieldText)) : null));
        };
        EditLayerConfig.prototype._renderLayerMaxResultsInput = function () {
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
                widget_1.tsx("div", { class: CSS.inputContainer },
                    widget_1.tsx("input", { bind: this, class: this.classes(invalidInput), onchange: function (e) {
                            if (isNaN(parseFloat(e.currentTarget.value))) {
                                _this._invalidMaxResultsInput = true;
                            }
                            else {
                                _this._invalidMaxResultsInput = false;
                                _this.viewModel.modifyLayerMap(e);
                            }
                            _this.scheduleRender();
                        }, min: "0", max: "15", type: "number", name: "maxResults", value: this.viewModel.layerItemToBeConfigured.maxResults })),
                this._invalidMaxResultsInput ? (widget_1.tsx("div", { key: "layer-max-results-error", class: CSS.invalidText }, this.viewModel.searchConfigViewModel.searchConfigMessages
                    .invalidFieldText)) : null));
        };
        EditLayerConfig.prototype._renderLayerEnableSuggestionsInput = function () {
            return (widget_1.tsx("label", { class: CSS.checkboxLabel },
                widget_1.tsx("input", { bind: this, onchange: this.viewModel.modifyLayerMap, onclick: this._enableSuggestionsInput, onkeydown: this._enableSuggestionsInput, type: "checkbox", name: "suggestionsEnabled", checked: this.viewModel.layerItemToBeConfigured.suggestionsEnabled }),
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .enableSuggestions));
        };
        EditLayerConfig.prototype._renderLayerWithinViewEnabledInput = function () {
            return (widget_1.tsx("label", { class: CSS.checkboxLabel },
                widget_1.tsx("input", { bind: this, onchange: this.viewModel.modifyLayerMap, type: "checkbox", name: "withinViewEnabled", checked: this.viewModel.layerItemToBeConfigured.withinViewEnabled }),
                this.viewModel.searchConfigViewModel.searchConfigMessages
                    .constrainSearch));
        };
        EditLayerConfig.prototype._renderLayerExactMatchInput = function () {
            return (widget_1.tsx("label", { class: CSS.checkboxLabel },
                widget_1.tsx("input", { bind: this, onchange: this.viewModel.modifyLayerMap, type: "checkbox", checked: this.viewModel.layerItemToBeConfigured.exactMatch, name: "exactMatch" }),
                this.viewModel.searchConfigViewModel.searchConfigMessages.exactMatch));
        };
        EditLayerConfig.prototype._renderDisplayFieldOptions = function () {
            var _this = this;
            var layerItemIndex = this.viewModel.layerItemIndex;
            var svmLayerSources = this.searchConfigViewModel.searchViewModel.sources;
            var svmSourceItem = svmLayerSources.getItemAt(layerItemIndex);
            var featureLayer = svmSourceItem.layer;
            if (featureLayer.get("popupTemplate")) {
                var fieldInfos = featureLayer.get("popupTemplate.fieldInfos");
                if (!fieldInfos) {
                    return;
                }
                return fieldInfos.map(function (searchField, fieldIndex) {
                    return _this._renderDisplayFieldOptionUsingPopupTemplate(searchField, fieldIndex);
                });
            }
            else {
                var fields = featureLayer.fields;
                if (!fields) {
                    return;
                }
                return fields.map(function (searchField, fieldIndex) {
                    return _this._renderDisplayFieldOption(searchField, fieldIndex);
                });
            }
        };
        EditLayerConfig.prototype._renderDisplayFieldOptionUsingPopupTemplate = function (searchField, searchFieldIndex) {
            var displayField = this.viewModel.layerItemToBeConfigured.displayField;
            if (displayField === searchField.fieldName) {
                return (widget_1.tsx("option", { key: searchFieldIndex, value: searchField.fieldName, selected: true }, searchField.label));
            }
            return (widget_1.tsx("option", { key: searchFieldIndex, value: searchField.fieldName }, searchField.label));
        };
        EditLayerConfig.prototype._renderDisplayFieldOption = function (searchField, searchFieldIndex) {
            var displayField = this.viewModel.layerItemToBeConfigured.displayField;
            var alias = searchField.alias, name = searchField.name;
            var fieldToDisplay = alias ? alias : name;
            if (displayField === name) {
                return (widget_1.tsx("option", { key: searchFieldIndex, value: name, selected: true }, fieldToDisplay));
            }
            return (widget_1.tsx("option", { key: searchFieldIndex, value: name }, fieldToDisplay));
        };
        EditLayerConfig.prototype._renderOutFields = function () {
            var _this = this;
            var outFields = this.layerValues.get("outFields");
            if (!outFields) {
                return;
            }
            return outFields.map(function (outField, outFieldIndex) {
                return _this._renderOutField(outField, outFieldIndex);
            });
        };
        EditLayerConfig.prototype._renderOutField = function (outField, outFieldIndex) {
            return (widget_1.tsx("span", { key: outFieldIndex, class: this.classes(CSS.calciteStyles.label, CSS.calciteStyles.blueLabel, CSS.label) },
                widget_1.tsx("calcite-icon", { bind: this, onclick: this._removeOutField, onkeydown: this._removeOutField, class: this.classes(CSS.outField, CSS.closeOutField), tabIndex: 0, "outfield-index": "" + outFieldIndex, icon: icons.close, scale: "s" }),
                widget_1.tsx("span", { class: CSS.outFieldLabel }, outField)));
        };
        EditLayerConfig.prototype._addOutField = function () {
            this.layerValues.get("outFields").push(this.layerValues.get("searchField"));
        };
        EditLayerConfig.prototype._removeOutField = function () {
            var outFieldNode = event.currentTarget;
            var index = outFieldNode.getAttribute("outfield-index");
            this.layerValues.get("outFields").splice(index, 1);
        };
        EditLayerConfig.prototype._enableSuggestionsInput = function () {
            if (this._suggestionsInputEnabled === null) {
                var suggestionsEnabled = this.viewModel.layerItemToBeConfigured.suggestionsEnabled;
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
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.searchConfigViewModel")
        ], EditLayerConfig.prototype, "searchConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.layerValues")
        ], EditLayerConfig.prototype, "layerValues", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLayerConfig.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: EditLayerConfigViewModel
            })
        ], EditLayerConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], EditLayerConfig.prototype, "layerSourceCloseNode", void 0);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], EditLayerConfig.prototype, "_addOutField", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], EditLayerConfig.prototype, "_removeOutField", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], EditLayerConfig.prototype, "_enableSuggestionsInput", null);
        EditLayerConfig = tslib_1.__decorate([
            decorators_1.subclass("EditLayerConfig")
        ], EditLayerConfig);
        return EditLayerConfig;
    }(Widget));
    return EditLayerConfig;
});
