define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "./AddSource", "./EditLocatorConfig", "./EditLayerConfig", "./SearchConfig/SearchConfigViewModel", "../BaseComponent", "../../utils/focusUtils", "../../icons/icons", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, decorators_1, watchUtils, widget_1, AddSource, EditLocatorConfig, EditLayerConfig, SearchConfigViewModel, BaseComponent, focusUtils_1, icons, labelSettingMargin_1) {
    "use strict";
    var CSS = {
        base: "esri-search-config",
        configContainer: "esri-search-config__config-container",
        selectDefaultcontainer: "esri-search-config__select-default-container",
        sourceList: "esri-search-config__source-list",
        sourceTitle: "esri-search-config__source-title",
        sourceListSubheader: "esri-search-config__source-list-subheader",
        sourceListSubheaderName: "esri-search-config__source-list-subheader-name",
        sourceListSubheaderEdit: "esri-search-config__source-list-subheader-edit",
        sourceListItems: "esri-search-config__source-list-items",
        sourceItemContainer: "esri-search-config__source-item-container",
        sourceItem: "esri-search-config__source-item",
        sourceItemIconName: "esri-search-config__source-item-icon-name",
        sourceIcon: "esri-search-config__source-icon",
        sourceName: "esri-search-config__source-name",
        sourceItemNameText: "esri-search-config__source-item-name-text",
        sourceOptionButton: "esri-search-config__source-option-button",
        sourceOptionText: "esri-search-config__source-option-text",
        sourceOptionsDropdownList: "esri-search-config__options-dropdown-list",
        sourceOption: "esri-search-config__option",
        sourceOptionIcon: "esri-search-config__source-option-icon",
        dropDownList: "esri-search-config__dropdown",
        noExistingSources: "esri-search-config__no-existing-sources",
        addSourceButton: "esri-search-config__add-source-button",
        dragItemOver: "esri-search-config--over",
        btnStyles: "esri-search-config__btn",
        btnContainer: "esri-search-config__btn-container",
        btnGroup: "esri-search-config__btn-group",
        warningIcon: "esri-search-config__source-item-warning",
        sourceListWarning: "esri-search-config__source-list-warning",
        alert: "esri-search-config__alert",
        alertIconContainer: "esri-search-config__alert-icon-container",
        alertMessageContainer: "esri-search-config__alert-message-container",
        alertMessage: "esri-search-config__alert-message",
        alertLink: "esri-search-config__alert-link",
        sourceItemAlertIcon: "esri-search-config__source-item-alert-icon",
        srOnly: "sr-only",
        addSourceText: "esri-search-config__add-source-btn-text",
        editOptionText: "esri-search-config__edit-option-text",
        deleteOptionText: "esri-search-config__delete-option-text",
        inputLabel: "esri-search-config__input-label",
        calciteStyles: {
            button: "btn",
            largeButton: "btn-small",
            clearButton: "btn-clear"
        }
    };
    var SearchConfig = (function (_super) {
        tslib_1.__extends(SearchConfig, _super);
        function SearchConfig(value) {
            var _this = _super.call(this, value) || this;
            _this._dragOverItemIndex = null;
            _this._editEnabled = null;
            _this._warningIsVisible = null;
            _this._sourceItemOptionsIndex = null;
            _this.configItems = null;
            _this.searchViewModel = null;
            _this.darkModeEnabled = null;
            _this.selectedPanel = null;
            _this.searchConfigMessages = null;
            _this.shareMessages = null;
            _this.layerSelectorMessages = null;
            _this.viewModel = new SearchConfigViewModel();
            _this._addSourcePanel = new AddSource({
                searchConfigViewModel: _this.viewModel,
                darkModeEnabled: _this.darkModeEnabled
            });
            _this._editLocatorConfig = new EditLocatorConfig({
                searchConfigViewModel: _this.viewModel,
                darkModeEnabled: _this.darkModeEnabled
            });
            _this._editLayerConfig = new EditLayerConfig({
                searchConfigViewModel: _this.viewModel,
                darkModeEnabled: _this.darkModeEnabled
            });
            return _this;
        }
        SearchConfig.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils.when(this, "searchViewModel.sources", function () {
                    _this._enableEditButtons();
                    _this._setSearchConfigViewModel();
                }),
                watchUtils.on(this, ["searchViewModel.sources", "configItems"], "change", function () {
                    _this._enableEditButtons();
                    _this._setSearchConfigViewModel();
                }),
                watchUtils.whenOnce(this, "darkModeEnabled", function () {
                    _this._editLocatorConfig.darkModeEnabled = _this.darkModeEnabled;
                    _this._editLayerConfig.darkModeEnabled = _this.darkModeEnabled;
                })
            ]);
        };
        SearchConfig.prototype.render = function () {
            var _a;
            var panelButtons = this._renderPanelButtons();
            var warningNode = this._renderWarningNode();
            return (widget_1.tsx("div", { class: CSS.base }, this.configPanelViewModel.flowSettingsUI.content
                ? [(_a = this.selectedPanel) === null || _a === void 0 ? void 0 : _a.render(), panelButtons]
                : [
                    this.configPanelViewModel.expressEnabled ? (widget_1.tsx("h4", { class: labelSettingMargin_1.marginClassNames.labelText }, this.searchConfigMessages.header)) : (widget_1.tsx("h3", { class: labelSettingMargin_1.marginClassNames.labelText }, this.searchConfigMessages.header)),
                    widget_1.tsx("div", { class: CSS.configContainer }, this._renderSearchSourceList()),
                    this.selectedPanel === null
                        ? this._warningIsVisible
                            ? warningNode
                            : null
                        : null
                ]));
        };
        SearchConfig.prototype._renderDoneButton = function () {
            return (widget_1.tsx("calcite-button", { bind: this, onclick: this.selectedPanel === this._editLayerConfig
                    ? this._editLayer
                    : this.selectedPanel === this._editLocatorConfig
                        ? this._editLocator
                        : null, appearance: "outline" }, this.layerSelectorMessages.fieldExit));
        };
        SearchConfig.prototype._renderSearchSourceList = function () {
            var defaultDropDown = this._renderDefaultSourceDropDown();
            var addSourceButton = this._renderAddSourceButton();
            var sourceList = this._renderSourceList();
            return (widget_1.tsx("div", { key: "source-list-container" },
                defaultDropDown,
                sourceList,
                !this.configItems || !this.configItems.length ? (widget_1.tsx("div", { key: "no-existing-sources", class: CSS.noExistingSources }, this.searchConfigMessages.noExistingSources)) : null,
                addSourceButton));
        };
        SearchConfig.prototype._renderDefaultSourceDropDown = function () {
            var defaultSourceItems = this._renderDefaultSourceItems();
            return (widget_1.tsx("div", { class: CSS.selectDefaultcontainer },
                widget_1.tsx("label", null,
                    widget_1.tsx("span", { class: this.classes(CSS.inputLabel, labelSettingMargin_1.marginClassNames.labelText) }, this.searchConfigMessages.defaultSource),
                    widget_1.tsx("select", { bind: this, onchange: this._selectDefaultSource, class: CSS.dropDownList, disabled: !this.configItems.length ? true : false },
                        widget_1.tsx("option", { key: "search-all", "data-child-index": "-1" }, this.searchConfigMessages.all),
                        defaultSourceItems))));
        };
        SearchConfig.prototype._renderSourceList = function () {
            var sourceItems = this._renderSourceItems();
            return (widget_1.tsx("div", { class: CSS.sourceList },
                widget_1.tsx("span", { class: CSS.sourceTitle }, this.searchConfigMessages.source),
                widget_1.tsx("div", { class: CSS.sourceListSubheader },
                    widget_1.tsx("div", { class: CSS.sourceListSubheaderName }, this.searchConfigMessages.sourceName),
                    widget_1.tsx("div", { class: CSS.sourceListSubheaderEdit }, this.searchConfigMessages.sourceEdit)),
                widget_1.tsx("div", { class: CSS.sourceListItems }, sourceItems)));
        };
        SearchConfig.prototype._renderAddSourceButton = function () {
            return (widget_1.tsx("calcite-button", { bind: this, onclick: this._handleSelectedPanel, onkeydown: this._handleKeyDown, tabIndex: 0, "panel-type": "add", "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, width: "full" },
                this.searchConfigMessages.add,
                widget_1.tsx("span", { class: this.classes(CSS.srOnly, CSS.addSourceText) }, this.searchConfigMessages.newSearchSource)));
        };
        SearchConfig.prototype._renderSourceItems = function () {
            var _this = this;
            return this.configItems
                .toArray()
                .map(function (configItem, sourceItemIndex) {
                return _this._renderSourceItemContainer(configItem, sourceItemIndex);
            });
        };
        SearchConfig.prototype._renderSourceItemContainer = function (configItem, sourceItemIndex) {
            this._checkSearchFields();
            var sourceItem = this._renderSourceItem(configItem, sourceItemIndex);
            var sourceItemOptions = this._renderSourceItemOptions(configItem, sourceItemIndex);
            return (widget_1.tsx("div", { bind: this, class: this._dragOverItemIndex === sourceItemIndex
                    ? this.classes(CSS.sourceItemContainer, CSS.dragItemOver)
                    : CSS.sourceItemContainer, draggable: "true", ondragstart: this._dragStart, ondragover: this._dragOver, ondragleave: this._dragLeave, ondrop: this._dropItem, onkeydown: this._handleReorder, key: "source-item-" + sourceItemIndex, "data-child-index": "" + sourceItemIndex, tabIndex: 0, id: "sourceItem-" + sourceItemIndex },
                sourceItem,
                sourceItemOptions));
        };
        SearchConfig.prototype._handleReorder = function (e) {
            if (e.code !== "ArrowUp" && e.code !== "ArrowDown") {
                return;
            }
            var node = e.target;
            var sourceIndex = parseInt(node.getAttribute("data-child-index"));
            var configItem = this.configItems.getItemAt(sourceIndex);
            var sourceItem = this.searchViewModel.sources.getItemAt(sourceIndex);
            if (e.code === "ArrowUp") {
                if (sourceIndex === 0) {
                    return;
                }
                this._sourceItemOptionsIndex = null;
                var previousIndex = sourceIndex - 1;
                this.configItems.reorder(configItem, previousIndex);
                this.searchViewModel.sources.reorder(sourceItem, previousIndex);
                focusUtils_1.focusNode("sourceItem-" + previousIndex);
            }
            else if (e.code === "ArrowDown") {
                if (sourceIndex === this.configItems.length - 1) {
                    return;
                }
                this._sourceItemOptionsIndex = null;
                var nextIndex = sourceIndex + 1;
                this.configItems.reorder(configItem, nextIndex);
                this.searchViewModel.sources.reorder(sourceItem, nextIndex);
                focusUtils_1.focusNode("sourceItem-" + nextIndex);
            }
        };
        SearchConfig.prototype._renderSourceItem = function (sourceItem, sourceItemIndex) {
            var sourceItemIconName = this._renderSourceItemIconName(sourceItem, sourceItemIndex);
            var sourceItemOptionsButton = this._renderSourceItemOptionsButton(sourceItemIndex);
            return (widget_1.tsx("div", { class: CSS.sourceItem },
                sourceItemIconName,
                sourceItemOptionsButton));
        };
        SearchConfig.prototype._renderSourceItemOptionsButton = function (sourceItemIndex) {
            return (widget_1.tsx("button", { bind: this, onclick: this._openSourceItemOptions, class: CSS.sourceOptionButton, "data-source-item-index": "" + sourceItemIndex, "aria-label": sourceItemIndex === this._sourceItemOptionsIndex
                    ? this.searchConfigMessages.hideSourceItemOptions
                    : this.searchConfigMessages.showSourceItemOptions },
                widget_1.tsx("calcite-icon", { icon: icons.ellipsis, scale: "m" })));
        };
        SearchConfig.prototype._renderSourceItemIconName = function (sourceItem, sourceItemIndex) {
            var _a;
            var layerItem = sourceItem;
            var type = sourceItem.type;
            var isLocator = type === "locator";
            var locator = icons.locator, featureLayer = icons.featureLayer;
            var sourceItemIcon = isLocator ? locator : featureLayer;
            return (widget_1.tsx("div", { class: CSS.sourceItemIconName },
                widget_1.tsx("div", { class: CSS.sourceIcon },
                    widget_1.tsx("calcite-icon", { icon: sourceItemIcon, scale: "s" })),
                widget_1.tsx("div", { class: CSS.sourceName },
                    widget_1.tsx("span", { key: "warning-icon-" + sourceItemIndex, class: CSS.sourceItemNameText }, sourceItem.name),
                    sourceItem.hasOwnProperty("outFields") ? (((_a = layerItem === null || layerItem === void 0 ? void 0 : layerItem.outFields) === null || _a === void 0 ? void 0 : _a.length) === 0 ? (widget_1.tsx("calcite-icon", { class: CSS.sourceItemAlertIcon, icon: icons.exclamationMarkTriangle, filled: true, scale: "s", "text-label": this.searchConfigMessages.warning })) : null) : null)));
        };
        SearchConfig.prototype._renderSourceItemOptions = function (sourceItem, sourceItemIndex) {
            var editOption = this._renderEditOption(sourceItem, sourceItemIndex);
            var deleteOption = this._renderDeleteOption(sourceItem, sourceItemIndex);
            return this._sourceItemOptionsIndex === sourceItemIndex ? (widget_1.tsx("div", { key: "source-item-options-" + sourceItemIndex, class: CSS.sourceOptionsDropdownList },
                editOption,
                deleteOption)) : null;
        };
        SearchConfig.prototype._renderEditOption = function (sourceItem, sourceItemIndex) {
            var type = sourceItem.type;
            var isLocator = type === "locator";
            var sourceItemType = isLocator ? "locator" : "layer";
            var disabled = type === "layer" ? (!this._editEnabled ? true : false) : null;
            return (widget_1.tsx("button", { bind: this, onclick: this._handleSelectedPanel, "data-child-index": "" + sourceItemIndex, "source-type": sourceItemType, "panel-type": "edit", disabled: disabled, class: CSS.sourceOption },
                widget_1.tsx("div", { class: CSS.sourceOptionIcon },
                    widget_1.tsx("calcite-icon", { icon: icons.hammer, scale: "s" })),
                widget_1.tsx("div", { class: CSS.sourceOptionText },
                    this.searchConfigMessages.sourceEdit,
                    " ",
                    widget_1.tsx("span", { class: this.classes(CSS.srOnly, CSS.editOptionText) }, sourceItem.name))));
        };
        SearchConfig.prototype._renderDeleteOption = function (sourceItem, sourceItemIndex) {
            return (widget_1.tsx("button", { bind: this, onclick: this._deleteSource, "data-child-index": "" + sourceItemIndex, class: CSS.sourceOption },
                widget_1.tsx("div", { class: CSS.sourceOptionIcon },
                    widget_1.tsx("calcite-icon", { icon: icons.close, scale: "s" })),
                widget_1.tsx("div", { class: CSS.sourceOptionText },
                    this.searchConfigMessages.sourceDelete,
                    " ",
                    widget_1.tsx("span", { class: this.classes(CSS.srOnly, CSS.deleteOptionText) }, sourceItem.name))));
        };
        SearchConfig.prototype._renderDefaultSourceItems = function () {
            var _this = this;
            return this.configItems
                .toArray()
                .map(function (sourceItem, sourceItemIndex) {
                return _this._renderDefaultSourceItem(sourceItem, sourceItemIndex);
            });
        };
        SearchConfig.prototype._renderDefaultSourceItem = function (sourceItem, sourceItemIndex) {
            return (widget_1.tsx("option", { key: sourceItemIndex, "data-child-index": "" + sourceItemIndex, selected: this.searchViewModel.activeSourceIndex === sourceItemIndex
                    ? true
                    : false }, sourceItem.name));
        };
        SearchConfig.prototype._renderPanelButtons = function () {
            var key = this.selectedPanel === this._addSourcePanel
                ? "add-source"
                : this.selectedPanel === this._editLocatorConfig
                    ? "edit-source"
                    : "edit-layer";
            return (widget_1.tsx("div", { key: key, class: CSS.btnContainer },
                widget_1.tsx("div", { class: CSS.btnGroup },
                    this._addSourcePanel.viewModel.state === "requesting"
                        ? this.searchConfigMessages.verifying
                        : null,
                    widget_1.tsx("calcite-button", { class: CSS.btnStyles, bind: this, onclick: this.selectedPanel === this._addSourcePanel
                            ? this._addSource
                            : this.selectedPanel === this._editLocatorConfig
                                ? this._editLocator
                                : this._editLayer, disabled: this.selectedPanel === this._addSourcePanel
                            ? !this._addSourcePanel.sourceToBeAdded
                                ? true
                                : false
                            : false, width: "half" }, this.searchConfigMessages.ok),
                    widget_1.tsx("calcite-button", { bind: this, onclick: this._handleCancelPanel, appearance: "outline", width: "half" }, this.searchConfigMessages.cancel))));
        };
        SearchConfig.prototype._renderWarningNode = function () {
            return (widget_1.tsx("div", { key: "source-list-warning-node", class: CSS.alert },
                widget_1.tsx("div", { class: CSS.alertIconContainer },
                    widget_1.tsx("calcite-icon", { icon: icons.exclamationMarkTriangle, filled: true, scale: "s", "text-label": this.searchConfigMessages.warning })),
                widget_1.tsx("div", { class: CSS.alertMessageContainer },
                    widget_1.tsx("span", { class: CSS.alertMessage },
                        " ",
                        this.searchConfigMessages.searchFieldWarning))));
        };
        SearchConfig.prototype._handleSelectedPanel = function (event) {
            var buttonElement = event.currentTarget;
            var panelType = buttonElement.getAttribute("panel-type");
            var editType = buttonElement.getAttribute("source-type");
            var itemIndex = parseInt(buttonElement.getAttribute("data-child-index"));
            var flowConfig = {
                heading: null,
                content: null
            };
            if (panelType === "add") {
                this.selectedPanel = this._addSourcePanel;
                flowConfig.heading = this.searchConfigMessages.addSearchSource;
            }
            else if (panelType === "edit") {
                if (editType === "locator") {
                    this._editLocatorConfig.viewModel.locatorItemIndex = itemIndex;
                    this.selectedPanel = this._editLocatorConfig;
                }
                else if (editType === "layer") {
                    this._editLayerConfig.viewModel.layerItemIndex = itemIndex;
                    this.selectedPanel = this._editLayerConfig;
                }
                flowConfig.heading = this.searchConfigMessages.edit;
            }
            flowConfig.content = this;
            this.configPanelViewModel.flowSettingsUI.setUI(flowConfig);
            this._sourceItemOptionsIndex = null;
        };
        SearchConfig.prototype._handleCancelPanel = function () {
            if (this.selectedPanel === this._editLocatorConfig) {
                this._editLocatorConfig.cancelLocatorEdit();
            }
            else if (this.selectedPanel === this._editLayerConfig) {
                this._editLayerConfig.cancelLayerEdit();
            }
            else if (this.selectedPanel === this._addSourcePanel) {
                this._addSourcePanel.sourceToBeAdded = null;
            }
            this.selectedPanel = null;
            this.configPanelViewModel.flowSettingsUI.resetUI();
            this.scheduleRender();
        };
        SearchConfig.prototype._addSource = function () {
            this._addSourcePanel.addSource();
            this._handleEditRoute();
            this.scheduleRender();
        };
        SearchConfig.prototype._handleEditRoute = function () {
            var _this = this;
            this.own([
                watchUtils.whenOnce(this, "configItems.length", function () {
                    var itemIndex = _this.configItems.length - 1;
                    var configItem = _this.configItems.getItemAt(itemIndex);
                    var type = configItem.type;
                    _this.configPanelViewModel.flowSettingsUI.heading = _this.searchConfigMessages.edit;
                    if (type === "locator") {
                        _this._editLocatorConfig.viewModel.locatorItemIndex = itemIndex;
                        _this.selectedPanel = _this._editLocatorConfig;
                    }
                    else if (type === "layer") {
                        _this._editLayerConfig.viewModel.layerItemIndex = itemIndex;
                        _this.selectedPanel = _this._editLayerConfig;
                    }
                })
            ]);
        };
        SearchConfig.prototype._editLocator = function () {
            focusUtils_1.focusNode("sourceItem-" + this._editLocatorConfig.viewModel.locatorItemIndex);
            this._editLocatorConfig.editLocator();
            this.selectedPanel = null;
            this.configPanelViewModel.flowSettingsUI.resetUI();
            this.scheduleRender();
        };
        SearchConfig.prototype._editLayer = function () {
            focusUtils_1.focusNode("sourceItem-" + this._editLayerConfig.viewModel.layerItemIndex);
            this._editLayerConfig.editLayer();
            this.selectedPanel = null;
            this.configPanelViewModel.flowSettingsUI.resetUI();
            this.scheduleRender();
        };
        SearchConfig.prototype._deleteSource = function (event) {
            var sourceItemToRemove = event.currentTarget;
            var sourceItemIndex = parseInt(sourceItemToRemove.getAttribute("data-child-index"));
            this.configItems.removeAt(sourceItemIndex);
            this.viewModel.searchViewModel.sources.removeAt(sourceItemIndex);
            this._sourceItemOptionsIndex = null;
        };
        SearchConfig.prototype._dragStart = function (event) {
            var targetElement = event.currentTarget;
            var itemToBeDroppedIndex = targetElement.getAttribute("data-child-index");
            event.dataTransfer.setData("text/plain", itemToBeDroppedIndex);
            event.dataTransfer.effectAllowed = "move";
        };
        SearchConfig.prototype._dragOver = function (event) {
            var node = event.currentTarget;
            var nodeIndex = parseInt(node.getAttribute("data-child-index"));
            this._dragOverItemIndex = nodeIndex;
            event.preventDefault();
            this.scheduleRender();
            return false;
        };
        SearchConfig.prototype._dragLeave = function () {
            this._dragOverItemIndex = null;
            this.scheduleRender();
        };
        SearchConfig.prototype._dropItem = function (event) {
            event.stopPropagation();
            event.preventDefault();
            var targetElement = event.currentTarget;
            var sourceIndex = parseInt(event.dataTransfer.getData("text/plain"));
            this._manageDefaultSourceReorder(targetElement, sourceIndex);
            event.dataTransfer.clearData();
            this._sourceItemOptionsIndex = null;
            this.scheduleRender();
            return false;
        };
        SearchConfig.prototype._selectDefaultSource = function (event) {
            var targetElement = event.currentTarget;
            var sourceIndex = parseInt(targetElement.selectedOptions[0].getAttribute("data-child-index"));
            this.configItems.forEach(function (sourceItem) {
                if (sourceItem.defaultSource) {
                    sourceItem.defaultSource = false;
                }
            });
            if (sourceIndex === -1) {
                this.searchViewModel.set("activeSourceIndex", -1);
                return;
            }
            this.configItems.getItemAt(sourceIndex).defaultSource = true;
            this.searchViewModel.set("activeSourceIndex", sourceIndex);
        };
        SearchConfig.prototype._manageDefaultSourceReorder = function (targetElement, sourceIndex) {
            var _this = this;
            var targetIndex = parseInt(targetElement.getAttribute("data-child-index"));
            var configItem = this.configItems.getItemAt(sourceIndex);
            var sourceItem = this.searchViewModel.sources.getItemAt(sourceIndex);
            if (targetElement.getAttribute("data-source-id") !== configItem.id) {
                this.configItems.reorder(configItem, targetIndex);
                this.searchViewModel.sources.reorder(sourceItem, targetIndex);
            }
            this._dragOverItemIndex = null;
            this.configItems.forEach(function (sourceItem, sourceItemIndex) {
                if (sourceItem.defaultSource) {
                    _this.searchViewModel.set("activeSourceIndex", sourceItemIndex);
                }
            });
        };
        SearchConfig.prototype._enableEditButtons = function () {
            var _this = this;
            this._editEnabled = false;
            this.scheduleRender();
            var layerLoadPromises = [];
            this.searchViewModel.sources.forEach(function (sourceItem) {
                if (sourceItem.hasOwnProperty("layer")) {
                    layerLoadPromises.push(sourceItem.layer.load());
                }
            });
            Promise.all(layerLoadPromises).then(function () {
                _this._editEnabled = true;
                _this.scheduleRender();
            });
        };
        SearchConfig.prototype._checkSearchFields = function () {
            var _this = this;
            this._warningIsVisible = false;
            this.configItems.forEach(function (configItem) {
                var _a;
                if (((_a = configItem === null || configItem === void 0 ? void 0 : configItem.outFields) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                    _this._warningIsVisible = true;
                    return;
                }
            });
        };
        SearchConfig.prototype._setSearchConfigViewModel = function () {
            this._addSourcePanel.searchConfigViewModel = this.viewModel;
            this._editLayerConfig.searchConfigViewModel = this.viewModel;
            this._editLocatorConfig.searchConfigViewModel = this.viewModel;
            this.scheduleRender();
        };
        SearchConfig.prototype._openSourceItemOptions = function (event) {
            var node = event.currentTarget;
            var sourceItemIndex = parseInt(node.getAttribute("data-source-item-index"));
            if (this._sourceItemOptionsIndex === sourceItemIndex) {
                this._sourceItemOptionsIndex = null;
            }
            else {
                this._sourceItemOptionsIndex = sourceItemIndex;
            }
            this.scheduleRender();
        };
        SearchConfig.prototype._handleKeyDown = function (e) {
            if (e.code === "Space" || e.code === "Enter") {
                this._handleSelectedPanel(e);
                return;
            }
            focusUtils_1.handleFocusElFromSettingsPanel(e);
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configItems")
        ], SearchConfig.prototype, "configItems", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.searchViewModel")
        ], SearchConfig.prototype, "searchViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.darkModeEnabled"),
            decorators_1.property()
        ], SearchConfig.prototype, "darkModeEnabled", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedPanel")
        ], SearchConfig.prototype, "selectedPanel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.searchConfigMessages"),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/SearchConfig/resources")
        ], SearchConfig.prototype, "searchConfigMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.shareMessages"),
            widget_1.messageBundle("dist/assets/t9n/widgets/Share/resources")
        ], SearchConfig.prototype, "shareMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.layerSelectorMessages"),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LayerSelectorConfig/resources")
        ], SearchConfig.prototype, "layerSelectorMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: SearchConfigViewModel
            })
        ], SearchConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.toJSON")
        ], SearchConfig.prototype, "toJSON", void 0);
        SearchConfig = tslib_1.__decorate([
            decorators_1.subclass("SearchConfig")
        ], SearchConfig);
        return SearchConfig;
    }(BaseComponent));
    return SearchConfig;
});
