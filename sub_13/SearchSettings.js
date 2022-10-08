define(["require", "exports", "tslib", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "../../configWidgets/BaseComponent", "./SearchSettings/SearchSettingsViewModel", "esri/core/watchUtils", "../../icons/icons", "../../utils/telemetryUtils"], function (require, exports, tslib_1, widget_1, decorators_1, BaseComponent, SearchSettingsViewModel, watchUtils_1, icons_1, telemetryUtils_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-config-panel__search-settings",
        container: "esri-config-panel__search-settings-container",
        suggestedResultsList: "esri-config-panel__search-settings-results-list",
        hideSuggestedResultsList: "esri-config-panel__search-settings-results-list--hide",
        suggestedResultsListItem: "esri-config-panel__search-settings-results-list-item",
        resultsItemWarning: "esri-search-settings__result-item-warning",
        noResultsListItem: "esri-config-panel__search-settings-no-results-item",
        highlighedResultItem: "esri-config-panel__search-settings-results-list-item--highlighted",
        headerTopContainer: "esri-config-panel__search-settings-header-top-container",
        headerContainer: "esri-config-panel__search-settings-header-container",
        closeButton: "esri-config-panel__search-settings-close-button",
        fullSetupSeperator: "esri-config-panel__search-settings-full-setup-results-seperator",
        seperatedList: "esri-config-panel__search-settings-seperated-list",
        theme: {
            dark: "calcite-theme-dark"
        }
    };
    var SearchSettings = (function (_super) {
        tslib_1.__extends(SearchSettings, _super);
        function SearchSettings(params) {
            var _this = _super.call(this, params) || this;
            _this._hasEventListener = false;
            _this._suggestionsListNode = null;
            _this._suggestedResultIndex = null;
            _this._hideSuggestions = false;
            _this.configPanelViewModel = null;
            _this.searchInput = null;
            _this.open = false;
            _this.itemBrowserMessages = null;
            _this.searchSettingsMessages = null;
            _this.viewModel = new SearchSettingsViewModel();
            return _this;
        }
        SearchSettings.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils_1.on(this, "viewModel.searchResults", "change", function () {
                    return _this.scheduleRender();
                }),
                watchUtils_1.watch(this, "configPanelViewModel.expressEnabled", function () {
                    if (!_this.searchInput) {
                        return;
                    }
                    _this.searchInput.removeEventListener("calciteInputFocus", function () {
                        _this._calciteInputFocus();
                    });
                    _this.searchInput.removeEventListener("calciteInputInput", function (e) {
                        _this._calciteInputInput(e);
                    });
                    _this._hasEventListener = false;
                    _this.scheduleRender();
                })
            ]);
        };
        SearchSettings.prototype.close = function () {
            this.open = false;
            this.searchInput.value = "";
            this._hideSuggestions = false;
            this.scheduleRender();
        };
        SearchSettings.prototype.render = function () {
            var suggestedResultsList = this._renderSuggestedResultsList();
            var headerTopContainer = this._renderHeaderTopContainer();
            return (widget_1.tsx("div", { key: "search-settings", class: CSS.base },
                headerTopContainer,
                widget_1.tsx("div", { class: CSS.container },
                    widget_1.tsx("calcite-input", { bind: this, class: CSS.theme.dark, afterCreate: widget_1.storeNode, afterUpdate: this._addCalciteInputEventListener, "data-node-ref": "searchInput", type: "search", placeholder: this.searchSettingsMessages.placeholder, icon: "search", autocomplete: "off", onkeyup: this._handleInputKeyUp, onkeydown: this._handleResultKeyDown, clearable: true }),
                    suggestedResultsList)));
        };
        SearchSettings.prototype._renderSuggestedResultsList = function () {
            var _a;
            var _b, _c, _d, _e;
            var resultsListItems = this._renderSuggestedResultsListItems();
            var resultsLength = this.viewModel.searchResults.length;
            var hide = (_a = {},
                _a[CSS.hideSuggestedResultsList] = this._hideSuggestions,
                _a);
            return resultsLength > 0 && ((_c = (_b = this.searchInput) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.length) > 0 ? (widget_1.tsx("ul", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_suggestionsListNode", class: this.classes(CSS.suggestedResultsList, hide), role: "menu" }, resultsListItems)) : resultsLength === 0 && ((_e = (_d = this.searchInput) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.length) > 0 ? (widget_1.tsx("ul", { class: CSS.suggestedResultsList, role: "menu" }, this._renderNoResultsListItem())) : null;
        };
        SearchSettings.prototype._renderNoResultsListItem = function () {
            return (widget_1.tsx("li", { key: "no-results-item", class: CSS.noResultsListItem }, this.searchSettingsMessages.noResultsFound));
        };
        SearchSettings.prototype._renderSuggestedResultsListItems = function () {
            var _this = this;
            var searchResultsArr = this.viewModel.searchResults.toArray();
            return this.configPanelViewModel.expressEnabled
                ? this._renderSearchSettingsExpressResultListItems()
                : searchResultsArr.map(function (searchResult, searchResultIndex) {
                    var suggestedResult = _this._renderSuggestedResultListItem(searchResult, searchResultIndex);
                    return suggestedResult;
                });
        };
        SearchSettings.prototype._renderSearchSettingsExpressResultListItems = function () {
            var searchResultsArr = this.viewModel.searchResults.toArray();
            var expressSettings = this._getExpressSettings(searchResultsArr);
            var fullSetupSettings = this._getFullSettings(searchResultsArr);
            return [
                expressSettings.length > 0
                    ? this._renderExpressOnlyResultListItems(expressSettings)
                    : null,
                fullSetupSettings.length > 0
                    ? this._renderFullSetupOnlyResultListItems(fullSetupSettings)
                    : null
            ];
        };
        SearchSettings.prototype._renderExpressOnlyResultListItems = function (expressSettings) {
            var _this = this;
            return (widget_1.tsx("li", { key: "express-results", class: CSS.seperatedList },
                widget_1.tsx("ul", { role: "menu" }, expressSettings.map(function (searchResult, searchResultIndex) {
                    var suggestedResult = _this._renderSuggestedResultListItem(searchResult, searchResultIndex);
                    return suggestedResult;
                }))));
        };
        SearchSettings.prototype._renderFullSetupOnlyResultListItems = function (fullSetupSettings) {
            var _this = this;
            return (widget_1.tsx("li", { key: "full-results", class: CSS.seperatedList },
                widget_1.tsx("span", { class: CSS.fullSetupSeperator }, this.searchSettingsMessages.suggestionSeperator),
                widget_1.tsx("ul", { role: "menu" }, fullSetupSettings.map(function (searchResult, searchResultIndex) {
                    var suggestedResult = _this._renderSuggestedResultListItem(searchResult, searchResultIndex, true);
                    return suggestedResult;
                }))));
        };
        SearchSettings.prototype._renderSuggestedResultListItem = function (searchResult, searchResultIndex, inFullSetupOnly) {
            var _a;
            var fieldName = searchResult.fieldName, uiLocation = searchResult.uiLocation, conditionalLabel = searchResult.conditionalLabel, conditionalField = searchResult.conditionalField;
            var highlighted = (_a = {},
                _a[CSS.highlighedResultItem] = this._suggestedResultIndex === searchResultIndex,
                _a);
            var conditionalLabelIsDisplayed = this._conditionLabelIsDisplayed(conditionalField);
            var resultLabel = searchResult.hasOwnProperty("searchLabel")
                ? searchResult.searchLabel
                : searchResult.label;
            return (widget_1.tsx("li", { key: fieldName + "-" + searchResultIndex, bind: this, class: this.classes(CSS.suggestedResultsListItem, highlighted), onclick: this._handleResultClick, onkeyup: this._handleInputKeyUp, onkeydown: this._handleResultKeyDown, role: "menuitem", "data-field-name": fieldName, "data-section": uiLocation[0], "data-subsection": uiLocation[1], "data-conditional-field": conditionalField, "data-result-index": "" + searchResultIndex, "data-setting-label": resultLabel, "data-full-setup": "" + inFullSetupOnly },
                widget_1.tsx("span", null, resultLabel),
                conditionalLabel && conditionalLabelIsDisplayed ? (widget_1.tsx("span", { class: CSS.resultsItemWarning },
                    widget_1.tsx("calcite-icon", { icon: icons_1.default.gear, scale: "s" }), "'" + conditionalLabel + "' " + this.searchSettingsMessages.mustBeEnabled)) : null));
        };
        SearchSettings.prototype._renderHeaderTopContainer = function () {
            return (widget_1.tsx("div", { class: CSS.headerTopContainer },
                widget_1.tsx("div", { class: CSS.headerContainer },
                    widget_1.tsx("h2", null, this.searchSettingsMessages.header),
                    widget_1.tsx("button", { bind: this, onclick: this.close, class: CSS.closeButton, title: this.configPanelViewModel.expressMessages.close, "aria-label": this.configPanelViewModel.expressMessages.close },
                        widget_1.tsx("calcite-icon", { icon: icons_1.default.close }))),
                widget_1.tsx("p", null, this.searchSettingsMessages.subheader)));
        };
        SearchSettings.prototype._addCalciteInputEventListener = function (node) {
            var _this = this;
            if (this._hasEventListener) {
                return;
            }
            this._hasEventListener = true;
            node.addEventListener("calciteInputInput", function (e) {
                _this._calciteInputInput(e);
                _this._handleClearButtonA11y(e);
            });
            node.addEventListener("calciteInputFocus", function (e) {
                _this._calciteInputFocus();
            });
        };
        SearchSettings.prototype._calciteInputInput = function (e) {
            this._suggestedResultIndex = null;
            this._handleSearch(e);
            this.scheduleRender();
        };
        SearchSettings.prototype._calciteInputFocus = function () {
            this._hideSuggestions = false;
            this.scheduleRender();
        };
        SearchSettings.prototype._handleSearch = function (e) {
            this.viewModel.handleSearch(e);
        };
        SearchSettings.prototype._handleInputKeyUp = function (e) {
            if (e.code === "Escape") {
                this.searchInput.setFocus();
            }
            if (e.code === "Space" || e.code === "Enter" || e.code === "Tab") {
                return;
            }
            if (!this._suggestionsListNode) {
                return;
            }
            var listItemNodes = this._suggestionsListNode.getElementsByTagName("li");
            var firstListItemNode = listItemNodes[0];
            var lastItemIndex = listItemNodes.length - 1;
            var lastListItemNode = listItemNodes[lastItemIndex];
            if (listItemNodes.length > 0) {
                if (e.code === "ArrowDown") {
                    if (this._suggestedResultIndex === null) {
                        this._suggestedResultIndex = 0;
                        firstListItemNode.focus();
                    }
                    else if (this._suggestedResultIndex === listItemNodes.length - 1) {
                        this._suggestedResultIndex = null;
                        this.searchInput.setFocus();
                    }
                    else {
                        this._suggestedResultIndex += 1;
                        var listItemNode = listItemNodes[this._suggestedResultIndex];
                        listItemNode.focus();
                    }
                }
                else if (e.code === "ArrowUp") {
                    if (this._suggestedResultIndex === null) {
                        this._suggestedResultIndex = lastItemIndex;
                        lastListItemNode.focus();
                    }
                    else if (this._suggestedResultIndex === 0) {
                        this._suggestedResultIndex = null;
                        this.searchInput.setFocus();
                    }
                    else {
                        this._suggestedResultIndex -= 1;
                        var listItemNode = listItemNodes[this._suggestedResultIndex];
                        listItemNode.focus();
                    }
                }
            }
        };
        SearchSettings.prototype._handleResultClick = function (e) {
            var node = e.currentTarget;
            this._handleResultSelectionNode(node);
        };
        SearchSettings.prototype._handleResultKeyDown = function (e) {
            if (!this._suggestionsListNode) {
                return;
            }
            if (e.type === "keydown" && e.code !== "Space" && e.code !== "Enter") {
                return;
            }
            var selectedNode = this._suggestionsListNode.querySelector("[data-result-index='" + this._suggestedResultIndex + "']");
            if (!selectedNode) {
                return;
            }
            this._handleResultSelectionNode(selectedNode);
        };
        SearchSettings.prototype._handleResultSelectionNode = function (node) {
            var _a, _b, _c;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var fullSetup;
                var _this = this;
                return tslib_1.__generator(this, function (_d) {
                    fullSetup = node.getAttribute("data-full-setup") === "true";
                    if (fullSetup && this.configPanelViewModel.expressEnabled) {
                        if (localStorage.getItem("searchSettingsExpress_doNotShow")) {
                            this.configPanelViewModel.switchConfigMode("notFoundSearch");
                            watchUtils_1.whenFalseOnce(this, "configPanelViewModel.expressEnabled", function () {
                                _this._triggerGoToSettingWorkflow(node);
                            });
                        }
                        else {
                            (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.modal.set("modalId", "searchSettingsExpress");
                            (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.modal.set("initiator", "notFoundSearch");
                            (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.modal.open();
                            watchUtils_1.whenFalseOnce(this, "configPanelViewModel.expressEnabled", function () {
                                _this._triggerGoToSettingWorkflow(node);
                            });
                        }
                        return [2];
                    }
                    this._triggerGoToSettingWorkflow(node);
                    return [2];
                });
            });
        };
        SearchSettings.prototype._conditionLabelIsDisplayed = function (conditionalField) {
            var _a, _b;
            if (!conditionalField) {
                return;
            }
            var templateAppDataValues = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
            var draft = templateAppDataValues === null || templateAppDataValues === void 0 ? void 0 : templateAppDataValues.draft;
            var existsInDraft = draft === null || draft === void 0 ? void 0 : draft.hasOwnProperty(conditionalField);
            var setting = this.viewModel.configPanelViewModel.allSettings.find(function (setting) { return (setting === null || setting === void 0 ? void 0 : setting.fieldName) === conditionalField; });
            if (existsInDraft) {
                if (draft === null || draft === void 0 ? void 0 : draft[conditionalField]) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else if (templateAppDataValues === null || templateAppDataValues === void 0 ? void 0 : templateAppDataValues.hasOwnProperty(conditionalField)) {
                if (templateAppDataValues === null || templateAppDataValues === void 0 ? void 0 : templateAppDataValues[conditionalField]) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                if (setting) {
                    if (setting === null || setting === void 0 ? void 0 : setting.defaultValue) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
        };
        SearchSettings.prototype._triggerGoToSettingWorkflow = function (node) {
            var section = node.getAttribute("data-section");
            var subsection = node.getAttribute("data-subsection");
            var uiLocation = [section, subsection];
            var fieldName = node.getAttribute("data-field-name");
            var conditionalField = node.getAttribute("data-conditional-field");
            var searchValue = node.getAttribute("data-setting-label");
            this.viewModel.goToSetting(uiLocation, fieldName, conditionalField !== "activePanel" ? conditionalField : null, this.searchInput);
            this._suggestedResultIndex = null;
            this._hideSuggestions = true;
            this.searchInput.value = searchValue;
            var _a = this.configPanelViewModel, telemetry = _a.telemetry, appid = _a.appid, appTemplateItem = _a.appTemplateItem, expressEnabled = _a.expressEnabled;
            telemetryUtils_1.logSearchSelection(telemetry, searchValue, appid, appTemplateItem.url, expressEnabled);
            this.close();
        };
        SearchSettings.prototype._getExpressSettings = function (searchResultsArr) {
            var _this = this;
            return searchResultsArr
                .slice()
                .filter(function (setting) {
                return _this.viewModel.expressLookup.indexOf(setting.fieldName) !== -1;
            });
        };
        SearchSettings.prototype._getFullSettings = function (searchResultsArr) {
            var _this = this;
            return searchResultsArr
                .slice()
                .filter(function (setting) {
                return _this.viewModel.expressLookup.indexOf(setting.fieldName) === -1;
            });
        };
        SearchSettings.prototype._focusCalciteAction = function () {
            var interval = setInterval(function () {
                var node = document.getElementById("searchSettings");
                if (node) {
                    node.setFocus();
                    clearInterval(interval);
                }
            }, 0);
        };
        SearchSettings.prototype._handleClearButtonA11y = function (e) {
            var _this = this;
            var node = e.currentTarget;
            setTimeout(function () {
                var shadowRoot = node.shadowRoot;
                if (shadowRoot) {
                    var clearButton = shadowRoot.querySelector(".clear-button");
                    if (clearButton) {
                        clearButton.setAttribute("aria-label", _this.searchSettingsMessages.clearSearch);
                        clearButton.setAttribute("title", _this.searchSettingsMessages.clear);
                    }
                }
            }, 10);
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], SearchSettings.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchSettings.prototype, "searchInput", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchSettings.prototype, "open", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemBrowserMessages"),
            widget_1.messageBundle("dist/assets/t9n/widgets/ItemBrowser/resources")
        ], SearchSettings.prototype, "itemBrowserMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/SearchSettings/resources")
        ], SearchSettings.prototype, "searchSettingsMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchSettings.prototype, "viewModel", void 0);
        SearchSettings = tslib_1.__decorate([
            decorators_1.subclass("SearchSettings")
        ], SearchSettings);
        return SearchSettings;
    }(BaseComponent));
    return SearchSettings;
});
