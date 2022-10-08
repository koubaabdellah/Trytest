define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "esri/request", "esri/portal/Portal", "./BasemapSelectorConfig/BasemapSelectorConfigViewModel", "arcgis-components/wrappers/ItemBrowser", "esri/core/Handles", "esri/core/watchUtils", "../../utils/focusUtils"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, request, Portal, BasemapSelectorConfigViewModel, ItemBrowser_1, Handles, watchUtils_1, focusUtils_1) {
    "use strict";
    var CSS = {
        base: "esri-basemap-selector-config",
        fakeMap: "esri-basemap-selector-config__fake-map",
        header: "esri-basemap-selector-config__header",
        selectedBasemapDivider: "esri-basemap-selector-config__basemap-selected-divider",
        selectBasemapButton: "esri-basemap-selector-config__select-basemap-button",
        itemBrowserSelectedBasemap: "esri-basemap-selector-config__item-browser-selected-basemap",
        itemBrowserSelectedBasemapSelected: "esri-basemap-selector-config__selected",
        basemapGalleryContainer: "esri-basemap-gallery__container",
        overlay: "esri-config-panel__item-browser-overlay",
        overlayIsOpen: "esri-config-panel__item-browser-overlay--open"
    };
    var BasemapSelectorConfig = (function (_super) {
        tslib_1.__extends(BasemapSelectorConfig, _super);
        function BasemapSelectorConfig(values) {
            var _this = _super.call(this, values) || this;
            _this.viewModel = new BasemapSelectorConfigViewModel();
            _this._allowedItemTypes = [
                "Web Map"
            ];
            _this._handles = new Handles();
            return _this;
        }
        BasemapSelectorConfig.prototype.postInitialize = function () {
            var _this = this;
            var _a;
            if (this.titleHeader == null) {
                this.titleHeader = this.basemapSelectorConfigMessages.selectBasemap;
            }
            this._portal = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal;
            this._map = this.configPanelViewModel.map;
            this._handles.add([
                this.viewModel.watch("isOpen", function () {
                    _this.scheduleRender();
                }),
                watchUtils_1.whenOnce(this, "configPanelViewModel.map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4, this.loadAllMapResources()];
                            case 1:
                                _b.sent();
                                return [3, 3];
                            case 2:
                                _a = _b.sent();
                                return [3, 3];
                            case 3: return [2];
                        }
                    });
                }); }),
                this.configPanelViewModel.watch("map", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return tslib_1.__generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                this._map = this.configPanelViewModel.map;
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                return [4, this.loadAllMapResources()];
                            case 2:
                                _b.sent();
                                return [3, 4];
                            case 3:
                                _a = _b.sent();
                                return [3, 4];
                            case 4: return [2];
                        }
                    });
                }); })
            ]);
        };
        BasemapSelectorConfig.prototype.render = function () {
            var dummyMapview = this._renderFakeMapView();
            var header = this._renderHeader();
            var currentItemBrowserSelection = this._renderItemBasemapSelect();
            var basemapGallery = this._renderBasemapGallery();
            var itemBrowserInstance = this._renderItemBrowser();
            var selectItemButton = this._renderSelectItemButton(itemBrowserInstance);
            return (widget_1.tsx("div", { class: CSS.base },
                dummyMapview,
                header,
                widget_1.tsx("div", { class: CSS.basemapGalleryContainer },
                    currentItemBrowserSelection,
                    basemapGallery),
                selectItemButton));
        };
        BasemapSelectorConfig.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        BasemapSelectorConfig.prototype._renderFakeMapView = function () {
            return (widget_1.tsx("div", { class: CSS.fakeMap, id: "basemapToggle_fakeMapView", afterCreate: this.viewModel.setupBasemapGallery.bind(this.viewModel) }));
        };
        BasemapSelectorConfig.prototype._renderHeader = function () {
            var _a;
            var widgetInfoToolTip = (_a = this === null || this === void 0 ? void 0 : this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("div", { class: CSS.header },
                widget_1.tsx("div", null,
                    this.titleHeader,
                    ":",
                    widgetInfoToolTip)));
        };
        BasemapSelectorConfig.prototype._renderBasemapGallery = function () {
            var _a, _b;
            return (widget_1.tsx("div", null, (_b = (_a = this === null || this === void 0 ? void 0 : this.viewModel) === null || _a === void 0 ? void 0 : _a.basemapGallery) === null || _b === void 0 ? void 0 : _b.render()));
        };
        BasemapSelectorConfig.prototype._renderSelectItemButton = function (itemBrowser) {
            var _this = this;
            return (widget_1.tsx("div", { class: CSS.selectBasemapButton },
                widget_1.tsx("calcite-button", { bind: this, onclick: function () {
                        _this.viewModel.openBasemapBrowser();
                        _this.configPanelViewModel.setGenericModalDOM(itemBrowser);
                    }, onkeydown: function (e) {
                        if (e.code === "Space" || e.code === "Enter") {
                            _this.viewModel.openBasemapBrowser();
                            _this.configPanelViewModel.setGenericModalDOM(itemBrowser);
                            return;
                        }
                        focusUtils_1.handleFocusElFromSettingsPanel(e);
                    }, width: "full", appearance: "outline", "data-section-index": "" + this.configPanelViewModel.currentSectionIndex }, this.basemapSelectorConfigMessages.itemBrowserOpenBtnTxt)));
        };
        BasemapSelectorConfig.prototype._renderItemBrowser = function () {
            return (widget_1.tsx("div", { bind: this, afterCreate: this._createItemBrowser.bind(this), class: this.classes(CSS.overlay) }));
        };
        BasemapSelectorConfig.prototype._createItemBrowser = function (itemBrowserContainer) {
            var _this = this;
            var _a;
            var _b = this.basemapSelectorConfigMessages, items = _b.items, selectBasemap = _b.selectBasemap;
            this._handles.add(watchUtils_1.init(this.viewModel, "isOpen", function (isOpen) {
                isOpen ? itemBrowserContainer.classList.add(CSS.overlayIsOpen) : itemBrowserContainer.classList.remove(CSS.overlayIsOpen);
            }));
            var portal;
            if ((_a = this === null || this === void 0 ? void 0 : this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal) {
                portal = this.configPanelViewModel.portal;
            }
            else {
                portal = new Portal({ url: "https://devext.arcgis.com", authMode: "immediate" });
            }
            portal.load().then(function () {
                var _a, _b;
                _this.wrapper = new ItemBrowser_1.ItemBrowserWrapper(itemBrowserContainer, {
                    apiVersion: 4,
                    portal: portal,
                    request: request,
                    listener: function (action, state) {
                        var _a, _b;
                        if (_this.viewModel.isOpen && action.type === "LOADING_CONTENT_SUCCESS") {
                            var ariaLiveNode = _this.get("configPanelViewModel.ariaLiveNode");
                            var itemTotal = (_b = (_a = state === null || state === void 0 ? void 0 : state.parameters) === null || _a === void 0 ? void 0 : _a.nextQuery) === null || _b === void 0 ? void 0 : _b.total;
                            ariaLiveNode.innerText = !isNaN(itemTotal)
                                ? items + " " + itemTotal
                                : "";
                        }
                    },
                    initialState: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState), { settings: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.settings), { config: tslib_1.__assign(tslib_1.__assign({}, ItemBrowser_1.initialState.settings.config), { disableItemTypeFilters: ((_a = _this._allowedItemTypes) === null || _a === void 0 ? void 0 : _a.length) &&
                                    ((_b = _this._allowedItemTypes) === null || _b === void 0 ? void 0 : _b.length) > 1
                                    ? false
                                    : true, onBack: function () {
                                    _this.viewModel.closeBasemapBrowser();
                                }, showSubmitButton: false, allowedItemTypes: _this._allowedItemTypes, showCloseBtn: false, showBackBtn: true, onSelect: function (item) {
                                    _this.viewModel.onSelect.call(_this.viewModel, item);
                                }, mainActionTitle: selectBasemap }) }), parameters: tslib_1.__assign({}, ItemBrowser_1.initialState.parameters) })
                });
            });
        };
        BasemapSelectorConfig.prototype._renderItemBasemapSelect = function () {
            var _a;
            var _b, _c, _d;
            var basemap = this.viewModel.itemBrowserBasemap;
            var selected = this.viewModel.outputBasemapId === ((_d = (_c = (_b = this.viewModel) === null || _b === void 0 ? void 0 : _b.itemBrowserBasemap) === null || _c === void 0 ? void 0 : _c.portalItem) === null || _d === void 0 ? void 0 : _d.id);
            var selectedStyle = (_a = {},
                _a[CSS.itemBrowserSelectedBasemapSelected] = selected,
                _a);
            return basemap != null ? ([widget_1.tsx("div", { key: "itemBrowserBasemap", class: this.classes(CSS.itemBrowserSelectedBasemap, selectedStyle), onclick: this.viewModel.selectItemBrowserChosenBasemap.bind(this.viewModel) },
                    widget_1.tsx("img", { src: basemap.thumbnailUrl, alt: basemap.title }),
                    widget_1.tsx("span", null, basemap.title)),
                widget_1.tsx("div", { key: "basemapSelectorDivider", class: CSS.selectedBasemapDivider })]) : null;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfig.prototype, "titleHeader", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.savedState")
        ], BasemapSelectorConfig.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.outputBasemapId")
        ], BasemapSelectorConfig.prototype, "outputBasemapId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], BasemapSelectorConfig.prototype, "wrapper", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/BasemapSelectorConfig/resources")
        ], BasemapSelectorConfig.prototype, "basemapSelectorConfigMessages", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.map")
        ], BasemapSelectorConfig.prototype, "_map", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.portal")
        ], BasemapSelectorConfig.prototype, "_portal", void 0);
        BasemapSelectorConfig = tslib_1.__decorate([
            decorators_1.subclass("BasemapSelectorConfig")
        ], BasemapSelectorConfig);
        return BasemapSelectorConfig;
    }(BaseComponent));
    return BasemapSelectorConfig;
});
