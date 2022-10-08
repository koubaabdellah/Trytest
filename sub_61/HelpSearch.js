define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "../../../icons/icons", "../../../enums/keys"], function (require, exports, tslib_1, decorators_1, Widget_1, widget_1, icons_1, keys_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var BASE = "esri-config-panel-help";
    var CSS = {
        searchContainer: BASE + "__search-container",
        suggestedResultsList: BASE + "__search-results-list",
        hideSuggestedResultsList: BASE + "__search-results-list--hide",
        suggestedResultsListItem: BASE + "__search-results-list-item",
        highlighedResultItem: BASE + "__search-results-list-item--highlighted"
    };
    var HelpSearch = (function (_super) {
        tslib_1.__extends(HelpSearch, _super);
        function HelpSearch(props) {
            var _this = _super.call(this, props) || this;
            _this._suggestionsListNode = null;
            _this._suggestedResultIndex = null;
            _this._hideSuggestions = false;
            _this.searchInput = null;
            _this.helpHasEventListeners = false;
            return _this;
        }
        HelpSearch.prototype.removeEventListeners = function () {
            this.searchInput.removeEventListener("calciteInputInput", this._calciteInputInputCallback.bind(this));
            this.searchInput.removeEventListener("calciteInputFocus", this._calciteInputFocusCallback.bind(this));
        };
        HelpSearch.prototype.render = function () {
            var searchInput = this._renderSearchInput();
            var suggestedResultsList = this._renderSuggestedResultsList();
            return (widget_1.tsx("div", { key: "help-search-container", class: CSS.searchContainer },
                searchInput,
                suggestedResultsList));
        };
        HelpSearch.prototype._renderSearchInput = function () {
            var _a, _b;
            var placeholder = (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.search) === null || _b === void 0 ? void 0 : _b.placeholder;
            var search = icons_1.default.search;
            return (widget_1.tsx("calcite-input", { icon: search, type: "search", placeholder: placeholder, scale: "l", bind: this, afterCreate: widget_1.storeNode, afterUpdate: this._addCalciteInputEventListener, "data-node-ref": "searchInput", autocomplete: "off", onkeyup: this._handleInputKeyUp, onkeydown: this._handleResultKeyDown, clearable: true }));
        };
        HelpSearch.prototype._renderSuggestedResultsList = function () {
            var _a;
            var _b, _c, _d, _e;
            var resultsListItems = this._renderSuggestedResultsListItems();
            var resultsLength = this.helpViewModel.searchResults.length;
            var hide = (_a = {},
                _a[CSS.hideSuggestedResultsList] = this._hideSuggestions,
                _a);
            return resultsLength > 0 && ((_c = (_b = this.searchInput) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.length) > 0 ? (widget_1.tsx("ul", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_suggestionsListNode", class: this.classes(CSS.suggestedResultsList, hide), role: "menu" }, resultsListItems)) : resultsLength === 0 &&
                ((_e = (_d = this.searchInput) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.length) > 0 ? null : null;
        };
        HelpSearch.prototype._renderSuggestedResultsListItems = function () {
            var _this = this;
            var searchResultsArr = this.helpViewModel.searchResults.toArray();
            return searchResultsArr.map(function (searchResult, searchResultIndex) {
                var suggestedResult = _this._renderSuggestedResultListItem(searchResult, searchResultIndex);
                return suggestedResult;
            });
        };
        HelpSearch.prototype._renderSuggestedResultListItem = function (searchResult, searchResultIndex) {
            var _a;
            var highlighted = (_a = {},
                _a[CSS.highlighedResultItem] = this._suggestedResultIndex === searchResultIndex,
                _a);
            var resultLabel = searchResult.title;
            return (widget_1.tsx("li", { key: searchResult.id + "-" + searchResultIndex, bind: this, class: this.classes(CSS.suggestedResultsListItem, highlighted), onclick: this._handleResultClick, onkeyup: this._handleInputKeyUp, onkeydown: this._handleResultKeyDown, role: "menuitem", "data-result-index": "" + searchResultIndex, "data-setting-label": resultLabel, "data-category-type": searchResult.categoryType, "data-help-item-id": searchResult.id },
                widget_1.tsx("span", null, resultLabel)));
        };
        HelpSearch.prototype._calciteInputInput = function (e) {
            var node = e.target;
            if (node.value.trim() === "")
                return;
            this._suggestedResultIndex = null;
            this.helpViewModel.handleSearch(e);
            this.scheduleRender();
        };
        HelpSearch.prototype._calciteInputFocus = function () {
            this._hideSuggestions = false;
            this.scheduleRender();
        };
        HelpSearch.prototype._handleInputKeyUp = function (e) {
            var code = e.code;
            var Enter = keys_1.KeyCodes.Enter, Escape = keys_1.KeyCodes.Escape, Space = keys_1.KeyCodes.Space, Tab = keys_1.KeyCodes.Tab, Down = keys_1.KeyCodes.Down, Up = keys_1.KeyCodes.Up;
            var _a = this, _suggestionsListNode = _a._suggestionsListNode, searchInput = _a.searchInput;
            if (code === Escape)
                searchInput.setFocus();
            var isSelectionKey = code === Space || code === Enter || code === Tab;
            if (isSelectionKey)
                return;
            if (!_suggestionsListNode)
                return;
            var listItemNodes = _suggestionsListNode.getElementsByTagName("li");
            var firstListItemNode = listItemNodes[0];
            var length = listItemNodes.length;
            var lastItemIndex = length - 1;
            var lastListItemNode = listItemNodes[lastItemIndex];
            if (length > 0) {
                if (code === Down) {
                    if (this._suggestedResultIndex === null) {
                        this._suggestedResultIndex = 0;
                        firstListItemNode.focus();
                    }
                    else if (this._suggestedResultIndex === length - 1) {
                        this._suggestedResultIndex = null;
                        this.searchInput.setFocus();
                    }
                    else {
                        this._suggestedResultIndex += 1;
                        var listItemNode = listItemNodes[this._suggestedResultIndex];
                        listItemNode.focus();
                    }
                }
                else if (code === Up) {
                    if (this._suggestedResultIndex === null) {
                        this._suggestedResultIndex = lastItemIndex;
                        lastListItemNode.focus();
                    }
                    else if (this._suggestedResultIndex === 0) {
                        this._suggestedResultIndex = null;
                        searchInput.setFocus();
                    }
                    else {
                        this._suggestedResultIndex -= 1;
                        var listItemNode = listItemNodes[this._suggestedResultIndex];
                        listItemNode.focus();
                    }
                }
            }
        };
        HelpSearch.prototype._handleResultKeyDown = function (e) {
            if (!this._suggestionsListNode)
                return;
            var KeyDown = keys_1.KeyEventTypes.KeyDown;
            var Space = keys_1.KeyCodes.Space, Enter = keys_1.KeyCodes.Enter;
            var type = e.type, code = e.code;
            var isNotSelection = type === KeyDown && code !== Space && code !== Enter;
            if (isNotSelection)
                return;
            var selector = "[data-result-index='" + this._suggestedResultIndex + "']";
            var selectedNode = this._suggestionsListNode.querySelector(selector);
            if (!selectedNode)
                return;
            this._handleResultSelectionNode(selectedNode);
        };
        HelpSearch.prototype._addCalciteInputEventListener = function () {
            var _a = this, helpHasEventListeners = _a.helpHasEventListeners, searchInput = _a.searchInput;
            if (helpHasEventListeners)
                return;
            this.helpHasEventListeners = true;
            searchInput.addEventListener("calciteInputInput", this._calciteInputInputCallback.bind(this));
            searchInput.addEventListener("calciteInputFocus", this._calciteInputFocusCallback.bind(this));
        };
        HelpSearch.prototype._calciteInputInputCallback = function (e) {
            this._calciteInputInput(e);
        };
        HelpSearch.prototype._calciteInputFocusCallback = function () {
            this._calciteInputFocus();
        };
        HelpSearch.prototype._handleResultClick = function (e) {
            var node = e.currentTarget;
            this._handleResultSelectionNode(node);
        };
        HelpSearch.prototype._handleResultSelectionNode = function (node) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.categoryType = node.getAttribute("data-category-type");
                    this.itemId = node.getAttribute("data-help-item-id");
                    this.searchInput.value = "";
                    this.helpViewModel.searchResults.removeAll();
                    return [2];
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpSearch.prototype, "categoryType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpSearch.prototype, "itemId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpSearch.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpSearch.prototype, "searchInput", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpSearch.prototype, "helpHasEventListeners", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpSearch.prototype, "helpViewModel", void 0);
        HelpSearch = tslib_1.__decorate([
            decorators_1.subclass("ConfigPanel.ConfigPanelViewModel.Help.HelpSearch")
        ], HelpSearch);
        return HelpSearch;
    }(Widget_1.default));
    return HelpSearch;
});
