define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/watchUtils", "./SearchConfig/AddSourceViewModel"], function (require, exports, tslib_1, decorators_1, Widget, widget_1, watchUtils, AddSourceViewModel) {
    "use strict";
    var CSS = {
        heading: "esri-search-config__heading",
        subtitle: "esri-search-config__add-subtitle",
        addSourceButton: "esri-search-config__add-source-button",
        addSourceContainer: "esri-search-config__add-source-container",
        addSourceListItemContainer: "esri-search-config__add-source-list-item-container",
        addSourceListItem: "esri-search-config__add-source-list-item",
        existingSourceItem: "esri-search-config__existing-source-item",
        addSourceOption: "esri-search-config__add-source-option",
        selectedItem: "esri-search-config--selected-item",
        addExistingSourceList: "esri-search-config__add-existing-source-list",
        addExistingSourceItem: "esri-search-config__add-existing-source-item",
        radioInputContainer: "esri-search-config__radio-input-container",
        addSourceURLInput: "esri-search-config__add-source-url-input",
        calciteStyles: {
            button: "btn",
            locatorIcon: "icon-ui-locate",
            layerIcon: "icon-ui-layers",
            isActive: "is-active",
            inputErrorMessage: "input-error-message"
        }
    };
    var AddSource = (function (_super) {
        tslib_1.__extends(AddSource, _super);
        function AddSource(params) {
            var _this = _super.call(this, params) || this;
            _this._selectedItem = null;
            _this._verifyUrlError = null;
            _this._selectedTab = "layer";
            _this.searchConfigViewModel = null;
            _this.viewModel = new AddSourceViewModel({
                searchConfigViewModel: _this.searchConfigViewModel
            });
            _this.sourceToBeAdded = null;
            _this.addExistingType = true;
            return _this;
        }
        AddSource.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils.init(this, "sourceToBeAdded", function () {
                    if (!_this.sourceToBeAdded) {
                        _this._selectedItem = null;
                        _this.scheduleRender();
                    }
                })
            ]);
        };
        AddSource.prototype.render = function () {
            var locatorUrlInput = this._renderLocatorUrlInput();
            var layerUrlInput = this._renderLayerUrlInput();
            return (widget_1.tsx("div", { class: CSS.addSourceContainer, key: "add-search-source" },
                widget_1.tsx("calcite-tabs", null,
                    widget_1.tsx("calcite-tab-nav", { slot: "tab-nav" },
                        widget_1.tsx("calcite-tab-title", { bind: this, onclick: this._updateTab, onkeydown: this._updateTab, type: "layer", "is-active": true }, this.viewModel.searchConfigViewModel.searchConfigMessages
                            .addLayer),
                        widget_1.tsx("calcite-tab-title", { bind: this, onclick: this._updateTab, onkeydown: this._updateTab, type: "locator" }, this.viewModel.searchConfigViewModel.searchConfigMessages
                            .addLocator)),
                    widget_1.tsx("calcite-tab", { "is-active": true }, layerUrlInput),
                    widget_1.tsx("calcite-tab", null, locatorUrlInput))));
        };
        AddSource.prototype.addSource = function () {
            this.viewModel.addSource();
        };
        AddSource.prototype._renderLocatorRadioButtons = function () {
            return (widget_1.tsx("div", { key: "locator-radio" },
                widget_1.tsx("label", { class: CSS.addSourceOption },
                    widget_1.tsx("input", { bind: this, onclick: this._handleExistingSourceType, type: "radio", checked: this.addExistingType, "source-type": "url", "aria-checked": "" + this.addExistingType }),
                    this.viewModel.searchConfigViewModel.searchConfigMessages.fromURL),
                widget_1.tsx("label", { class: CSS.addSourceOption },
                    widget_1.tsx("input", { bind: this, onclick: this._handleExistingSourceType, type: "radio", checked: !this.addExistingType, "source-type": "existing", "aria-checked": "" + !this.addExistingType }),
                    this.viewModel.searchConfigViewModel.searchConfigMessages
                        .fromExistingLocator)));
        };
        AddSource.prototype._renderLocatorUrlInput = function () {
            var _a;
            var locatorRadioButtons = this._renderLocatorRadioButtons();
            var existingLocators = this._renderExistingLocatorListItems();
            var errorMessage = (_a = {},
                _a[CSS.calciteStyles.inputErrorMessage] = this._verifyUrlError,
                _a[CSS.calciteStyles.isActive] = this._verifyUrlError,
                _a);
            return (widget_1.tsx("div", { key: "locator", class: CSS.radioInputContainer },
                locatorRadioButtons,
                this.addExistingType ? (widget_1.tsx("div", null,
                    widget_1.tsx("label", null,
                        this.viewModel.searchConfigViewModel.searchConfigMessages
                            .enterLocatorUrl,
                        widget_1.tsx("input", { class: CSS.addSourceURLInput, bind: this, onchange: this._verifyUrl, type: "text", "url-type": "locator" }),
                        this._verifyUrlError ? (widget_1.tsx("div", { class: this.classes(errorMessage) }, this.viewModel.searchConfigViewModel.searchConfigMessages.invalidLocatorUrl + " " + this.viewModel.searchConfigViewModel.searchConfigMessages.linkProtocol + ".")) : null))) : (widget_1.tsx("calcite-pick-list", { class: CSS.addExistingSourceList, "aria-label": this.viewModel.searchConfigViewModel.searchConfigMessages
                        .existingLocatorSourceList }, existingLocators))));
        };
        AddSource.prototype._renderLayerRadioButtons = function () {
            return (widget_1.tsx("div", { key: "layer-radio" },
                widget_1.tsx("label", { class: CSS.addSourceOption },
                    widget_1.tsx("input", { bind: this, onclick: this._handleExistingSourceType, type: "radio", checked: this.addExistingType, "source-type": "url", "aria-checked": "" + this.addExistingType }),
                    this.viewModel.searchConfigViewModel.searchConfigMessages.fromURL),
                widget_1.tsx("label", { class: CSS.addSourceOption },
                    widget_1.tsx("input", { bind: this, onclick: this._handleExistingSourceType, type: "radio", checked: !this.addExistingType, "source-type": "existing", "aria-checked": "" + !this.addExistingType }),
                    this.viewModel.searchConfigViewModel.searchConfigMessages.map)));
        };
        AddSource.prototype._renderLayerUrlInput = function () {
            var existingLayers = this._renderExistingLayerListItems();
            var layerRadioButtons = this._renderLayerRadioButtons();
            return (widget_1.tsx("div", { key: "layer", class: CSS.radioInputContainer },
                layerRadioButtons,
                this.addExistingType ? (widget_1.tsx("div", null,
                    widget_1.tsx("label", null,
                        this.viewModel.searchConfigViewModel.searchConfigMessages
                            .enterLayerUrl,
                        widget_1.tsx("input", { class: CSS.addSourceURLInput, bind: this, onchange: this._verifyUrl, "url-type": "layer", type: "text" }),
                        this._verifyUrlError ? (widget_1.tsx("div", { class: this.classes(CSS.calciteStyles.inputErrorMessage, CSS.calciteStyles.isActive) }, this.viewModel.searchConfigViewModel.searchConfigMessages.invalidLayerSource + " " + this.viewModel.searchConfigViewModel.searchConfigMessages.linkProtocol + ".")) : null))) : (widget_1.tsx("calcite-pick-list", { class: CSS.addExistingSourceList, "aria-label": this.viewModel.searchConfigViewModel.searchConfigMessages
                        .existingLayerSourceList, multiple: "false" }, existingLayers))));
        };
        AddSource.prototype._renderExistingLocatorListItems = function () {
            var _this = this;
            return this.viewModel.existingLocatorSources
                .toArray()
                .map(function (locator, locatorIndex) {
                return _this._renderExistingLocatorListItem(locator, locatorIndex);
            });
        };
        AddSource.prototype._renderExistingLocatorListItem = function (locator, locatorIndex) {
            var _this = this;
            var locatorItem = locator;
            return (widget_1.tsx("calcite-pick-list-item", { label: locatorItem.name, onclick: function (e) {
                    _this._handleAddSelectedExistingItem(e);
                }, "data-child-index": "" + locatorIndex, type: "locator", value: "" + locatorIndex }));
        };
        AddSource.prototype._renderExistingLayerListItems = function () {
            var _this = this;
            return this.viewModel.existingLayerSources
                .toArray()
                .map(function (layerSource, layerSourceIndex) {
                return _this._renderExistingLayerListItem(layerSource, layerSourceIndex);
            });
        };
        AddSource.prototype._renderExistingLayerListItem = function (layer, layerIndex) {
            var _this = this;
            return (widget_1.tsx("calcite-pick-list-item", { label: layer.title, onclick: function (e) {
                    _this._handleAddSelectedExistingItem(e);
                }, "data-child-index": "" + layerIndex, type: "layer", value: "" + layerIndex }));
        };
        AddSource.prototype._handleAddSelectedExistingItem = function (event) {
            var targetElement = event.currentTarget;
            var itemIndex = parseInt(targetElement.getAttribute("data-child-index"));
            var type = targetElement.getAttribute("type");
            this._selectedItem = {
                index: itemIndex,
                type: type
            };
            this.viewModel.handleAddSelectedExistingItem(event);
            this.scheduleRender();
        };
        AddSource.prototype._handleExistingSourceType = function (event) {
            var node = event.currentTarget;
            var sourceType = node.getAttribute("source-type");
            if (sourceType === "url") {
                this.addExistingType = true;
            }
            else if (sourceType === "existing") {
                this.addExistingType = false;
            }
            this.sourceToBeAdded = null;
            this._selectedItem = null;
            this.scheduleRender();
        };
        AddSource.prototype._verifyUrl = function (event) {
            var _this = this;
            this._verifyUrlError = null;
            this.scheduleRender();
            var node = event.currentTarget;
            var urlType = node.getAttribute("url-type");
            if (urlType === "locator") {
                this.viewModel
                    .verifyLocatorUrl(event)
                    .catch(function (error) {
                    _this._rejectAddUrlSource(error);
                })
                    .then(function (source) {
                    _this._setAddUrlSource(source);
                });
            }
            else {
                this.viewModel
                    .verifyLayerUrl(event)
                    .catch(function (error) {
                    _this._rejectAddUrlSource(error);
                })
                    .then(function (source) {
                    _this._setAddUrlSource(source);
                });
            }
        };
        AddSource.prototype._setAddUrlSource = function (source) {
            this.sourceToBeAdded = source;
            this.scheduleRender();
        };
        AddSource.prototype._rejectAddUrlSource = function (error) {
            console.error("ERROR: ", error);
            this._verifyUrlError = true;
            this.scheduleRender();
        };
        AddSource.prototype._updateTab = function (e) {
            var node = e.currentTarget;
            this._selectedTab = node.getAttribute("type");
            this._selectedItem = null;
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.searchConfigViewModel")
        ], AddSource.prototype, "searchConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: AddSourceViewModel
            })
        ], AddSource.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.sourceToBeAdded")
        ], AddSource.prototype, "sourceToBeAdded", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AddSource.prototype, "addExistingType", void 0);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], AddSource.prototype, "_handleAddSelectedExistingItem", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], AddSource.prototype, "_handleExistingSourceType", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], AddSource.prototype, "_updateTab", null);
        AddSource = tslib_1.__decorate([
            decorators_1.subclass("AddSource")
        ], AddSource);
        return AddSource;
    }(Widget));
    return AddSource;
});
