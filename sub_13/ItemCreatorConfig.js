define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "./ItemCreatorConfig/Item", "./ItemConfig", "./ItemCreatorConfig/ItemCreatorConfigViewModel", "../../icons/icons", "esri/core/watchUtils", "../../utils/focusUtils"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, Item, ItemConfig, ItemCreatorConfigViewModel, icons_1, watchUtils_1, focusUtils_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "esri-item-creator-config",
        baseDark: "esri-item-creator-config--dark",
        header: "esri-item-creator-config-config__header",
        headerContainer: "esri-item-creator-config__header-container",
        content: "esri-item-creator-config__content-container",
        contentDark: "esri-item-creator-config__content-container--dark",
        topContent: "esri-item-creator-config__top-content",
        addSectionsContainer: "esri-item-creator-config__add-sections-container",
        addedSectionsText: "esri-item-creator-config__added-sections-text",
        valueListContainer: "esri-item-creator-config__value-list-container",
        actionMenu: "esri-item-creator-config__action-menu",
        actionMenuItem: "esri-item-creator-config__action-menu-item",
        groupHeaderDark: "esri-config-panel__group-header--dark"
    };
    var ItemCreatorConfig = (function (_super) {
        tslib_1.__extends(ItemCreatorConfig, _super);
        function ItemCreatorConfig(params) {
            var _this = _super.call(this, params) || this;
            _this.messages = null;
            _this.instructionsText = null;
            _this.addedText = null;
            _this.addButtonText = null;
            _this.maxNumItems = 10;
            _this.fieldName = null;
            _this.itemCollection = null;
            _this.output = null;
            _this.itemConfigIsOpen = null;
            _this.savedState = null;
            _this.itemBrowserIsOpen = false;
            _this.configPanelViewModel = null;
            _this.itemNameTipItem = null;
            _this.itemDescriptionTipItem = null;
            _this.itemThumbnailTipItem = null;
            _this.openLinksInAppTipItem = null;
            _this.liveItemDetailsTipItem = null;
            _this.disallowList = null;
            _this.viewModel = new ItemCreatorConfigViewModel();
            _this._itemMenuOpen = false;
            _this._currentMenuItemId = null;
            _this._itemConfig = null;
            return _this;
        }
        ItemCreatorConfig.prototype.postInitialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "messages", function () {
                _this._itemConfig = new ItemConfig({
                    viewModel: _this.viewModel,
                    messages: _this.messages
                });
                watchUtils_1.whenOnce(_this, "itemNameTipItem", function () {
                    _this._itemConfig.itemNameTipItem = _this.itemNameTipItem;
                });
                watchUtils_1.whenOnce(_this, "itemDescriptionTipItem", function () {
                    _this._itemConfig.itemDescriptionTipItem = _this.itemDescriptionTipItem;
                });
                watchUtils_1.whenOnce(_this, "itemThumbnailTipItem", function () {
                    _this._itemConfig.itemThumbnailTipItem = _this.itemThumbnailTipItem;
                });
                watchUtils_1.whenOnce(_this, "liveItemDetailsTipItem", function () {
                    _this._itemConfig.liveItemDetailsTipItem = _this.liveItemDetailsTipItem;
                });
                watchUtils_1.whenOnce(_this, "openLinksInAppTipItem", function () {
                    _this._itemConfig.openLinksInAppTipItem = _this.openLinksInAppTipItem;
                });
            });
        };
        ItemCreatorConfig.prototype.render = function () {
            var _a;
            var _b;
            var header = this._renderHeader();
            var content = this._renderContent();
            var baseDark = (_a = {},
                _a[CSS.baseDark] = this.getTheme() === "dark",
                _a);
            return (widget_1.tsx("div", { key: this.fieldName, class: this.classes(CSS.base, baseDark) },
                header,
                content,
                this.itemConfigIsOpen ? (_b = this._itemConfig) === null || _b === void 0 ? void 0 : _b.render() : null));
        };
        ItemCreatorConfig.prototype._renderHeader = function () {
            var _a;
            return (widget_1.tsx("header", { class: CSS.headerContainer },
                this.configPanelViewModel.expressEnabled ? (widget_1.tsx("h4", { class: CSS.header }, this.label)) : (widget_1.tsx("h3", { class: CSS.header }, this.label)), (_a = this.tipItem) === null || _a === void 0 ? void 0 :
                _a.renderTipCalciteIcon()));
        };
        ItemCreatorConfig.prototype._renderContent = function () {
            var _a;
            var instructions = this._renderInstructions();
            var addSectionsContainer = this._renderAddSectionsContainer();
            var valueListContainer = this._renderValueListContainer();
            var contentDark = (_a = {},
                _a[CSS.contentDark] = this.getTheme() === "dark",
                _a);
            return (widget_1.tsx("div", { class: this.classes(CSS.content, contentDark) }, !this.itemConfigIsOpen
                ? [
                    widget_1.tsx("div", { class: CSS.topContent },
                        instructions,
                        widget_1.tsx("hr", null),
                        addSectionsContainer),
                    valueListContainer
                ]
                : null));
        };
        ItemCreatorConfig.prototype._renderInstructions = function () {
            var instructionsText = this.instructionsText
                ? this.instructionsText
                : this.messages.instructions;
            return widget_1.tsx("p", null, instructionsText);
        };
        ItemCreatorConfig.prototype._renderAddSectionsContainer = function () {
            var _a = this, maxNumItems = _a.maxNumItems, itemCollection = _a.itemCollection, itemConfigIsOpen = _a.itemConfigIsOpen;
            var addedText = this.addedText
                ? this.addedText
                : this.messages.itemsAdded;
            var addButtonText = this.addButtonText
                ? this.addButtonText
                : this.messages.addButton;
            var addedItemsText = itemCollection.length + " " + this.messages.of + " " + maxNumItems + " " + addedText;
            return (widget_1.tsx("div", { class: CSS.addSectionsContainer },
                widget_1.tsx("span", { class: CSS.addedSectionsText }, addedItemsText),
                widget_1.tsx("calcite-button", { bind: this, onclick: this._addItem, appearance: "outline", scale: "m", disabled: itemCollection.length === maxNumItems || itemConfigIsOpen
                        ? true
                        : false, "icon-start": icons_1.default.plus }, addButtonText)));
        };
        ItemCreatorConfig.prototype._renderValueListContainer = function () {
            var calciteValueListItems = this._renderCalciteValueListItems();
            return (widget_1.tsx("div", { key: "value-list-item-container", class: CSS.valueListContainer },
                widget_1.tsx("calcite-value-list", { bind: this, dragEnabled: true, afterCreate: this._addOrderEventListener, ondragstart: this._closeOptionsMenu }, calciteValueListItems)));
        };
        ItemCreatorConfig.prototype._renderCalciteValueListItems = function () {
            var _this = this;
            return this.itemCollection.toArray().map(function (item) {
                var title = item.title, id = item.id, visible = item.visible;
                return _this._renderValueListItem(title, id, visible);
            });
        };
        ItemCreatorConfig.prototype._renderValueListItem = function (title, id, visible) {
            var _this = this;
            return [
                widget_1.tsx("calcite-value-list-item", { bind: this, key: "value-list-item-" + id, label: title, "data-item-id": "" + id },
                    widget_1.tsx("calcite-action", { bind: this, onclick: this._toggleVisibility, slot: "actions-end", "data-item-id": "" + id },
                        widget_1.tsx("calcite-icon", { icon: visible ? icons_1.default.viewVisible : icons_1.default.viewHide, scale: "s" })),
                    widget_1.tsx("calcite-action", { bind: this, onclick: this._toggleMenu, onkeydown: function (e) {
                            if (e.code === "Tab" && !e.shiftKey) {
                                if (_this._itemMenuOpen) {
                                    focusUtils_1.focusNode("itemCreatorEdit");
                                }
                                else {
                                    focusUtils_1.handleItemCreatorFocus(e);
                                }
                            }
                        }, slot: "actions-end", "data-item-id": "" + id, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex },
                        widget_1.tsx("calcite-icon", { icon: icons_1.default.ellipsis }))),
                this._itemMenuOpen && this._currentMenuItemId === id
                    ? this._renderItemOptionsMenu(id)
                    : null
            ];
        };
        ItemCreatorConfig.prototype._renderItemOptionsMenu = function (id) {
            var editOption = this._renderEditMenuOption(id);
            var deleteOption = this._renderDeleteMenuOption(id);
            return (widget_1.tsx("ul", { key: "item-options-menu", class: CSS.actionMenu, role: "menu" },
                editOption,
                deleteOption));
        };
        ItemCreatorConfig.prototype._renderEditMenuOption = function (id) {
            var _this = this;
            return (widget_1.tsx("li", { bind: this, onclick: this._editItem, onkeydown: function (e) {
                    if (e.code === "Space" || e.code === "Enter") {
                        _this._editItem(e);
                        return;
                    }
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, "data-item-id": id, role: "menuitem", class: CSS.actionMenuItem, "aria-label": this.messages.edit, tabIndex: 0, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, id: "itemCreatorEdit" },
                widget_1.tsx("calcite-icon", { icon: icons_1.default.pencil, scale: "s" }),
                this.messages.edit));
        };
        ItemCreatorConfig.prototype._renderDeleteMenuOption = function (id) {
            var _this = this;
            return (widget_1.tsx("li", { bind: this, onclick: this._deleteItem, onkeydown: function (e) {
                    if (e.code === "Space" || e.code === "Enter") {
                        _this._deleteItem(e);
                        return;
                    }
                    focusUtils_1.handleFocusElFromSettingsPanel(e);
                }, "data-item-id": id, role: "menuitem", class: CSS.actionMenuItem, "aria-label": this.messages.delete, tabIndex: 0, "data-section-index": "" + this.configPanelViewModel.currentSectionIndex, id: "itemCreatorDelete" },
                widget_1.tsx("calcite-icon", { icon: icons_1.default.trash, scale: "s" }),
                this.messages.delete));
        };
        ItemCreatorConfig.prototype._addItem = function () {
            this.viewModel.itemToConfigure = new Item({
                editorID: "" + new Date().getTime()
            });
            this.itemConfigIsOpen = true;
            this._itemMenuOpen = false;
            this._currentMenuItemId = null;
            this.scheduleRender();
        };
        ItemCreatorConfig.prototype._editItem = function (e) {
            var node = e.target;
            var id = node.getAttribute("data-item-id");
            var item = this.itemCollection.find(function (item) { return item.id === id; });
            this.viewModel.itemToConfigure = item;
            this._itemConfig.editEnabled = true;
            this.itemConfigIsOpen = true;
            this._itemMenuOpen = false;
            this._currentMenuItemId = null;
            this.scheduleRender();
        };
        ItemCreatorConfig.prototype._deleteItem = function (e) {
            var node = e.target;
            var id = node.getAttribute("data-item-id");
            this.viewModel.deleteItem(id);
            this.scheduleRender();
        };
        ItemCreatorConfig.prototype._handleItemSort = function (valueListItems) {
            this.viewModel.handleItemSort(valueListItems);
        };
        ItemCreatorConfig.prototype._addOrderEventListener = function (node) {
            var _this = this;
            node.addEventListener("calciteListOrderChange", function (e) {
                var node = e.target;
                var valueListItems = Array.from(node.children);
                _this._handleItemSort(valueListItems);
            });
        };
        ItemCreatorConfig.prototype._toggleMenu = function (e) {
            var node = e.currentTarget;
            var id = node.getAttribute("data-item-id");
            if (this._currentMenuItemId === id) {
                this._itemMenuOpen = false;
                this._currentMenuItemId = null;
            }
            else {
                this._itemMenuOpen = true;
                this._currentMenuItemId = id;
            }
            this.scheduleRender();
        };
        ItemCreatorConfig.prototype._closeOptionsMenu = function () {
            this._itemMenuOpen = false;
            this._currentMenuItemId = null;
            this.scheduleRender();
        };
        ItemCreatorConfig.prototype._toggleVisibility = function (e) {
            var node = e.target;
            var id = node.getAttribute("data-item-id");
            var item = this.itemCollection.find(function (item) { return item.id === id; });
            this.viewModel.toggleVisibility(item);
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.messages"),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ItemCreatorConfig/resources")
        ], ItemCreatorConfig.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "instructionsText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "addedText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "addButtonText", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "maxNumItems", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fieldName")
        ], ItemCreatorConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemCollection")
        ], ItemCreatorConfig.prototype, "itemCollection", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.output")
        ], ItemCreatorConfig.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemConfigIsOpen")
        ], ItemCreatorConfig.prototype, "itemConfigIsOpen", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.savedState")
        ], ItemCreatorConfig.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.itemBrowserIsOpen")
        ], ItemCreatorConfig.prototype, "itemBrowserIsOpen", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], ItemCreatorConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "itemNameTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "itemDescriptionTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "itemThumbnailTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "openLinksInAppTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemCreatorConfig.prototype, "liveItemDetailsTipItem", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.disallowList")
        ], ItemCreatorConfig.prototype, "disallowList", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: ItemCreatorConfigViewModel
            })
        ], ItemCreatorConfig.prototype, "viewModel", void 0);
        ItemCreatorConfig = tslib_1.__decorate([
            decorators_1.subclass("ItemCreatorConfig")
        ], ItemCreatorConfig);
        return ItemCreatorConfig;
    }(BaseComponent));
    return ItemCreatorConfig;
});
