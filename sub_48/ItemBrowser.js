define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/request", "arcgis-components/wrappers/ItemBrowser", "../../utils/configParamsUtils"], function (require, exports, tslib_1, Widget_1, widget_1, decorators_1, request, ItemBrowser_1, configParamsUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "esri-config-panel-item-browser",
        overlay: "esri-config-panel__item-browser-overlay",
        overlayIsOpen: "esri-config-panel__item-browser-overlay--open"
    };
    var ItemBrowser = (function (_super) {
        tslib_1.__extends(ItemBrowser, _super);
        function ItemBrowser(value) {
            var _this = _super.call(this, value) || this;
            _this._wrapper = null;
            _this.configPanelViewModel = null;
            _this.isOpen = false;
            _this.selectedMapId = null;
            _this.messages = null;
            return _this;
        }
        ItemBrowser.prototype.render = function () {
            var _a;
            var itemBrowserStyles = (_a = {},
                _a[CSS.overlayIsOpen] = this.isOpen,
                _a);
            return (widget_1.tsx("div", { bind: this, afterUpdate: this._createItemBrowser, key: CSS.base, class: this.classes(CSS.overlay, itemBrowserStyles) }));
        };
        ItemBrowser.prototype.open = function () {
            this._set("isOpen", true);
        };
        ItemBrowser.prototype.close = function () {
            this._set("isOpen", false);
            var selectItemButton = document.getElementById("selectItemButton");
            selectItemButton.setFocus();
        };
        ItemBrowser.prototype._createItemBrowser = function (itemBrowserContainer) {
            var _this = this;
            var _a, _b;
            var _c = this, configPanelViewModel = _c.configPanelViewModel, messages = _c.messages;
            if (!(configPanelViewModel === null || configPanelViewModel === void 0 ? void 0 : configPanelViewModel.configParams) ||
                !(configPanelViewModel === null || configPanelViewModel === void 0 ? void 0 : configPanelViewModel.portal) ||
                !configPanelViewModel.allowedItemTypes ||
                this._wrapper ||
                ((_a = configPanelViewModel === null || configPanelViewModel === void 0 ? void 0 : configPanelViewModel.portal) === null || _a === void 0 ? void 0 : _a.authMode) !== "immediate") {
                return;
            }
            var configParams = configPanelViewModel.configParams, allowedItemTypes = configPanelViewModel.allowedItemTypes;
            var selectMap = messages.selectMap, selectAScene = messages.selectAScene, selectAMapOrScene = messages.selectAMapOrScene, items = messages.items, select = messages.select;
            var map = configParamsUtils_1.getConfigParamsSection(this.configPanelViewModel.configParams.config, "map");
            var itemTypes = (_b = map === null || map === void 0 ? void 0 : map.config) === null || _b === void 0 ? void 0 : _b.itemTypes;
            var supports2dAnd3d = (itemTypes === null || itemTypes === void 0 ? void 0 : itemTypes.includes("2d")) && (itemTypes === null || itemTypes === void 0 ? void 0 : itemTypes.includes("3d"));
            var actionTitle = supports2dAnd3d
                ? selectAMapOrScene
                : (allowedItemTypes === null || allowedItemTypes === void 0 ? void 0 : allowedItemTypes[0]) === "Web Scene"
                    ? selectAScene
                    : selectMap;
            this._wrapper = new ItemBrowser_1.ItemBrowserWrapper(itemBrowserContainer, {
                apiVersion: 4,
                portal: configPanelViewModel === null || configPanelViewModel === void 0 ? void 0 : configPanelViewModel.portal,
                request: request,
                listener: function (action, state) {
                    var _a, _b;
                    if (_this.isOpen && action.type === "LOADING_CONTENT_SUCCESS") {
                        var ariaLiveNode = _this.get("configPanelViewModel.ariaLiveNode");
                        var itemTotal = (_b = (_a = state === null || state === void 0 ? void 0 : state.parameters) === null || _a === void 0 ? void 0 : _a.nextQuery) === null || _b === void 0 ? void 0 : _b.total;
                        ariaLiveNode.innerText = !isNaN(itemTotal)
                            ? items + " " + itemTotal
                            : "";
                    }
                },
                initialState: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState), { settings: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.settings), { config: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.settings.config), { disableItemTypeFilters: (allowedItemTypes === null || allowedItemTypes === void 0 ? void 0 : allowedItemTypes.length) > 1 ? false : true, detailsPaneType: "flyover", enableMapAreaFilter: false, onBack: function () { return _this.close(); }, showSubmitButton: false, allowedItemTypes: allowedItemTypes, availableItemTypeFilters: ["maps", "scenes"], showCloseBtn: false, showBackBtn: true, onSelect: function (item) { return _this._onSelect(item); }, mainActionTitle: supports2dAnd3d ? select : actionTitle, dialogTitle: actionTitle }) }), parameters: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.parameters), { section: "myContent", sort: {
                            field: "modified",
                            order: "desc"
                        } }) })
            });
        };
        ItemBrowser.prototype._onSelect = function (item) {
            var id = item[0].id;
            var type = item[0].type.replace(/\s+/g, "").toLowerCase();
            if (type === "webscene" || type === "webmap") {
                this.configPanelViewModel.handleDraftData(type, id);
                this.configPanelViewModel.selectedMapId = id;
                this.set("selectedMapId", id);
                this.close();
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowser.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], ItemBrowser.prototype, "isOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowser.prototype, "selectedMapId", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/ItemBrowser/resources")
        ], ItemBrowser.prototype, "messages", void 0);
        ItemBrowser = tslib_1.__decorate([
            decorators_1.subclass("ItemBrowser")
        ], ItemBrowser);
        return ItemBrowser;
    }(Widget_1.default));
    return ItemBrowser;
});
