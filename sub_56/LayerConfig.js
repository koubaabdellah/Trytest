define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/watchUtils", "./LayerConfigViewModel", "./FieldSelector", "./LayerConfigAssets", "../BaseComponent", "../../utils/utils", "../../icons/icons"], function (require, exports, tslib_1, decorators_1, widget_1, watchUtils_1, LayerConfigViewModel, FieldSelector, LayerConfigAssets_1, BaseComponent, utils_1, icons) {
    "use strict";
    var CSS = {
        base: "esri-layer-selector-config",
        layerDisplayHeader: "esri-layer-selector-config__layer-display-header",
        leftHeader: "esri-layer-selector-config__layer-display-header__left-header-style",
        rightHeader: "esri-layer-selector-config__layer-display-header__right-header-style",
        layerRow: "esri-layer-selector-config__layer-row",
        layerDisplaySpecialMessageFormat: "esri-layer-selector-config__special-msg-format",
        layerWithSublayersDisplay: "esri-layer-with-sublayers-row",
        mainLayer: "esri-layer-with-sublayers-row__main-layer",
        selectionCheckboxSpacing: "esri-selectable-layer__selection-checkbox-spacing",
        selectionRadioBtnSpacing: "esri-selectable-layer__selection-radio-btn-spacing",
        layersIconSpacing: "esri-layer-with-sublayers-row__layers-icon-spacing",
        sublayers: "esri-layer-with-sublayers-row__sublayers",
        sublayers__noDisplay: "esri-layer-with-sublayers-row__sublayers--no-display",
        selectableLayerItem: "esri-selectable-layer",
        selectableLayer: "esri-selectable-layer__selectableLayer",
        selectableLayerTitle: "esri-selectable-layer__title",
        selectableLayerItem__layerIconSpacing: "esri-selectable-layer__layer-icon-spacing",
        fieldSelectorToggleBtn: "esri-selectable-layer__field-selector-toggle-btn",
        fieldSelectorToggleBtn__noDisplay: "esri-selectable-layer__field-selector-toggle-btn--no-display",
        lightBlueColoration: "light-blue-color",
        renderLineBreaks: "renderLineBreaks",
        layerDisplayPadding: "layer-display-padding",
        layerTitleFadeOut: "layer-title-fade",
        mousePointer: "mouse-pointer"
    };
    var STANDARD_LEFT_OFFSET_PX = 26;
    var STANDARD_TITLE_WIDTH_REDUCTION_PERCENTAGE = 12;
    var LayerConfig = (function (_super) {
        tslib_1.__extends(LayerConfig, _super);
        function LayerConfig(values) {
            var _this = _super.call(this, values) || this;
            _this.layerSelectionMode = "single";
            _this.supportedLayerTypes = "*";
            _this.supportedGeometryTypes = "*";
            _this.supportedCapabilityTypes = "*";
            _this.supportsFieldSelection = false;
            _this.isFieldSelectionRequired = false;
            _this.fieldSelectionMode = "single";
            _this.supportedFieldTypes = "*";
            _this.viewModel = new LayerConfigViewModel();
            _this._stateStore = _this.viewModel.stateStore;
            _this._fieldSelector = new FieldSelector({
                layerConfigViewModel: _this.viewModel,
                stateStore: _this._stateStore
            });
            _this.showNoMapLoadedMsg = false;
            _this._numValForRadioBtnDebounce = 0;
            return _this;
        }
        LayerConfig.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, headerTitle, noWebmapMsg;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, this.loadAllMapResources()];
                        case 1:
                            _b.sent();
                            _a = this.LayerSelectorMessages, headerTitle = _a.headerTitle, noWebmapMsg = _a.noWebmapMsg;
                            if (this.headerText == null) {
                                this.headerText = headerTitle;
                            }
                            this.noMapLoadedMsg = noWebmapMsg;
                            watchUtils_1.init(this, "loadedMap", function (map) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, this.loadAllMapResources()];
                                        case 1:
                                            _a.sent();
                                            this._fieldSelector.closeFieldSelector();
                                            this._processLoadedMap(map);
                                            return [2];
                                    }
                                });
                            }); });
                            this._setupFilterInfoTooltip();
                            watchUtils_1.whenDefinedOnce(this.viewModel, "stateStore", function () {
                                _this.viewModel.stateStore.excludeFields = _this.excludeFields;
                            });
                            return [2];
                    }
                });
            });
        };
        LayerConfig.prototype.render = function () {
            return (widget_1.tsx("div", { key: "layer-selector", class: this.classes(CSS.base) },
                this._renderHeader(),
                this._renderBody()));
        };
        LayerConfig.prototype._processLoadedMap = function (map) {
            var _this = this;
            var _a;
            if (((_a = map === null || map === void 0 ? void 0 : map.portalItem) === null || _a === void 0 ? void 0 : _a.id) == null) {
                this.showNoMapLoadedMsg = true;
            }
            else {
                this.showNoMapLoadedMsg = false;
                this._stateStore.loadedMap = map;
                map.when(function () {
                    var acceptableLayers = map.layers
                        .filter(_this.viewModel.filterByLayerType.bind(_this.viewModel));
                    _this.viewModel.loadLayerDetails(acceptableLayers);
                    watchUtils_1.whenFalseOnce(_this.viewModel, "areLayersDetailsLoading", function () {
                        _this.scheduleRender();
                    });
                });
            }
        };
        LayerConfig.prototype._renderHeader = function () {
            var _a;
            var widgetInfoToolTip = (_a = this === null || this === void 0 ? void 0 : this.tipItem) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (this.headerText || widgetInfoToolTip || this._showClearButton()
                ?
                    (widget_1.tsx("div", { key: "header", class: CSS.layerDisplayHeader },
                        widget_1.tsx("div", { class: CSS.leftHeader },
                            widget_1.tsx("h4", null, this.headerText),
                            widgetInfoToolTip),
                        this._renderLoadingIndicator()))
                : null);
        };
        LayerConfig.prototype._renderLoadingIndicator = function () {
            var _this = this;
            var _a = this.LayerSelectorMessages, layersLoadingIndicator = _a.layersLoadingIndicator, clearBtnMessage = _a.clearBtnMessage;
            return (this._areLayersDetailsLoading
                ?
                    (widget_1.tsx("div", { key: "rightHeader", class: CSS.rightHeader },
                        widget_1.tsx("calcite-loader", { title: layersLoadingIndicator, styles: { "float": "right" }, key: "headerLoading", active: true, inline: true })))
                :
                    (widget_1.tsx("div", { key: "clearSelectionBtn", styles: {
                            "display": this._showClearButton()
                                ? "block"
                                : "none"
                        } },
                        widget_1.tsx("calcite-button", { role: "button", appearance: "outline", "icon-start": icons.close, scale: "s", class: this.classes(CSS.lightBlueColoration), onclick: function () { _this.viewModel.clearAllSelection(); }, title: clearBtnMessage }))));
        };
        LayerConfig.prototype._showClearButton = function () {
            return this.viewModel.areLayersSelected() && this._router !== "FieldSelector";
        };
        LayerConfig.prototype._renderBody = function () {
            return (this._router === "FieldSelector"
                ? this._fieldSelector.render()
                : this.showNoMapLoadedMsg
                    ? this._renderNoMapMsg()
                    : this._renderLayerItems());
        };
        LayerConfig.prototype._setupFilterInfoTooltip = function () {
            var _a = this.LayerSelectorMessages.showingMessages, layers = _a.layers, allLayers = _a.allLayers, geometries = _a.geometries, allGeometries = _a.allGeometries;
            this._filterTooltipMsg = layers + "\n    \u2022  " + (this.viewModel.allowedLayerTypes === "*" ? allLayers : this.viewModel.allowedLayerTypes.map(function (layerType) { return LayerConfigAssets_1.friendlyLayerNames.get(layerType); }).join("\n    •  ")) + "\n" + geometries + "\n    \u2022  " + (this.viewModel.allowedGeomTypes === "*" ? allGeometries : this.viewModel.allowedGeomTypes.map(function (geomType) { return LayerConfigAssets_1.friendlyGeometryNames.get(geomType); }).join("\n    •  ")) + "\n  ";
        };
        LayerConfig.prototype._renderLayerItems = function () {
            var _this = this;
            var arr = this.viewModel.acceptableLayers.map(function (layer) {
                return _this._renderLayerItem(layer, 0);
            });
            return arr.length > 0 ? arr.toArray() : this._renderNoAcceptableLayersMsg();
        };
        LayerConfig.prototype._renderNoMapMsg = function () {
            return widget_1.tsx("div", { key: "noMapLoadedMsg", class: CSS.layerDisplaySpecialMessageFormat }, this.noMapLoadedMsg);
        };
        LayerConfig.prototype._renderNoAcceptableLayersMsg = function () {
            var noAcceptableLayers = this.LayerSelectorMessages.noAcceptableLayers;
            return widget_1.tsx("div", { key: "noAcceptableLayers", class: CSS.layerDisplaySpecialMessageFormat }, noAcceptableLayers);
        };
        LayerConfig.prototype._renderLayerItem = function (layer, leftOffset) {
            var type = layer.type, id = layer.id;
            return (widget_1.tsx("div", { class: CSS.layerRow, key: id }, this._decideWhichLayerType(layer, leftOffset)));
        };
        LayerConfig.prototype._decideWhichLayerType = function (layer, leftOffset) {
            var layerType = layer.type;
            if (LayerConfigAssets_1.selectable_Layers.includes(layerType)) {
                return this._renderSelectableLayerItem(layer, leftOffset);
            }
            else if (LayerConfigAssets_1.containsNestedLayer_Layers.includes(layerType)) {
                var mapServiceLayer = layer;
                return this._renderLayerWithUnderlayers(mapServiceLayer, this._renderSublayerItems(mapServiceLayer, leftOffset + STANDARD_LEFT_OFFSET_PX), leftOffset);
            }
            else if (LayerConfigAssets_1.containsNestedLayers_Layers.includes(layerType)) {
                var groupLayer = layer;
                return this._renderLayerWithUnderlayers(groupLayer, this._renderGroupSublayers(groupLayer, leftOffset + STANDARD_LEFT_OFFSET_PX), leftOffset);
            }
            else {
                return this._renderDefaultItem(layer);
            }
        };
        LayerConfig.prototype._renderSelectableLayerItem = function (layer, leftOffset) {
            var uniqueId = this.viewModel.createUniqueLayerId(layer);
            var selectionType = this._decideSelectionMode(uniqueId, layer);
            var renderFieldToggle = this.viewModel.isLayerSelected(layer);
            var labelId = uniqueId + "_label";
            return (widget_1.tsx("div", { class: CSS.selectableLayerItem },
                widget_1.tsx("label", { for: labelId, class: this.classes(CSS.selectableLayer, CSS.layerDisplayPadding), styles: widget_1.isRTL() ? { "padding-right": leftOffset + "px" } : { "padding-left": leftOffset + "px" } },
                    selectionType,
                    widget_1.tsx("calcite-icon", { id: "featureLayerIcon", class: this.classes(CSS.selectableLayerItem__layerIconSpacing, "calcite-theme-dark"), title: layer.title, icon: icons.layer, scale: "m" }),
                    widget_1.tsx("span", { id: labelId, bind: this, class: CSS.selectableLayerTitle, title: layer.title, afterCreate: utils_1.applyTextFade }, layer.title)),
                renderFieldToggle ? this._renderFieldSelectorToggle(layer) : null));
        };
        LayerConfig.prototype._renderLayerWithUnderlayers = function (layer, underLayersToRender, leftOffset) {
            var id = layer.id;
            var isExpanded = this.viewModel.expandStateTracker.get(id);
            if (isExpanded == null) {
                this.viewModel.expandStateTracker.set(id, false);
            }
            var styles = {};
            styles["" + (widget_1.isRTL() ? "padding-right" : "padding-left")] = leftOffset + "px";
            styles["width"] = 100 - (leftOffset / STANDARD_LEFT_OFFSET_PX) * STANDARD_TITLE_WIDTH_REDUCTION_PERCENTAGE + "%";
            var boundClickFunc = this._handleExpandClick.bind(this, id);
            return (widget_1.tsx("div", { class: CSS.layerWithSublayersDisplay },
                widget_1.tsx("label", { class: CSS.mainLayer, onclick: boundClickFunc, onkeydown: this._keydownHelper.bind(this, boundClickFunc), title: layer.title, styles: styles, tabindex: "0", role: "button" },
                    widget_1.tsx("calcite-icon", { icon: isExpanded ? icons.chevronDown : widget_1.isRTL() ? icons.chevronLeft : icons.chevronRight, scale: "m" }),
                    widget_1.tsx("calcite-icon", { icon: icons.layers, scale: "m", class: CSS.layersIconSpacing }),
                    widget_1.tsx("span", { bind: this, class: this.classes(CSS.layerDisplayPadding, CSS.selectableLayerTitle), afterCreate: utils_1.applyTextFade }, layer.title)),
                widget_1.tsx("div", { class: isExpanded ?
                        CSS.sublayers :
                        CSS.sublayers__noDisplay }, underLayersToRender)));
        };
        LayerConfig.prototype._keydownHelper = function (func, event) {
            if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
                event.preventDefault();
                func.call(this, event);
            }
        };
        LayerConfig.prototype._handleExpandClick = function (key) {
            this.viewModel.expandStateTracker.set(key, !this.viewModel.expandStateTracker.get(key));
        };
        LayerConfig.prototype._renderGroupSublayers = function (groupLayer, leftOffset) {
            var _this = this;
            return groupLayer.layers
                .filter(function (groupSublayer) { return _this.viewModel.shouldGroupLayerMemberBeShown(groupSublayer.id); })
                .map(function (layer) { return _this._renderLayerItem(layer, leftOffset); })
                .toArray();
        };
        LayerConfig.prototype._renderSublayerItems = function (layer, leftOffset) {
            var _this = this;
            return layer.allSublayers
                .filter(function (sublayer) { return _this.viewModel.shouldSublayerBeShown(_this.viewModel.createUniqueLayerId(sublayer)); })
                .map(function (sublayer) { return _this._renderSelectableLayerItem(sublayer, leftOffset); })
                .toArray();
        };
        LayerConfig.prototype._renderDefaultItem = function (layer) {
            var unsupportedLayerType = this.LayerSelectorMessages.unsupportedLayerType;
            return widget_1.tsx("div", null,
                unsupportedLayerType,
                " ",
                layer.title,
                " - ",
                layer.type);
        };
        LayerConfig.prototype._decideSelectionMode = function (id, layer) {
            return this.viewModel.selectionType === "single" ? this._renderRadioBtn(id, layer) : this._renderCheckBox(id, layer);
        };
        LayerConfig.prototype._renderRadioBtn = function (id, layer) {
            var _this = this;
            var isChecked = this.viewModel.isLayerSelected(layer);
            var ID = "radioBtn" + id + this.fieldName;
            return (widget_1.tsx("div", { class: this.classes("radio", CSS.selectionRadioBtnSpacing) },
                widget_1.tsx("input", { bind: this, id: ID, type: "radio", name: "radioSelection-" + this.fieldName, checked: isChecked, role: "radio", onclick: function () {
                        _this._numValForRadioBtnDebounce += 1;
                        var localCopy = _this._numValForRadioBtnDebounce;
                        setTimeout(function () {
                            if (_this._numValForRadioBtnDebounce === localCopy) {
                                _this.viewModel.handleSingleLayerSelectionChange.call(_this.viewModel, layer);
                            }
                        }, 500);
                    } }),
                widget_1.tsx("label", { for: ID, class: "radio-label" })));
        };
        LayerConfig.prototype._renderCheckBox = function (id, layer) {
            var _this = this;
            var isChecked = this.viewModel.isLayerSelected(layer);
            var checkbox = (widget_1.tsx("input", { key: "calciteCheckbox" + id, class: this.classes(CSS.selectionCheckboxSpacing, CSS.mousePointer), bind: this, theme: this.getTheme(), type: "checkbox", checked: isChecked, name: "checkboxSelection", onclick: this._handleSelectableLayerClick.bind(this, layer), onkeydown: function (event) {
                    if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
                        event.preventDefault();
                        _this._handleSelectableLayerClick.call(_this, layer, event);
                    }
                } }));
            return checkbox;
        };
        LayerConfig.prototype._handleSelectableLayerClick = function (layer, event) {
            event.preventDefault();
            var selectionType = event.target;
            var checked;
            if ((selectionType === null || selectionType === void 0 ? void 0 : selectionType.checked) != null) {
                if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
                    checked = !selectionType.checked;
                    selectionType.checked = checked;
                }
                else {
                    checked = selectionType.checked;
                }
            }
            if (this.viewModel.selectionType === "single") {
                this.viewModel.handleSingleLayerSelectionChange.call(this.viewModel, layer);
            }
            else if (this.viewModel.selectionType === "multiple") {
                this.viewModel.handleMultipleLayerSelectionChange.call(this.viewModel, layer, checked);
            }
            this.scheduleRender();
        };
        LayerConfig.prototype._renderFieldSelectorToggle = function (layer) {
            var _a = this.LayerSelectorMessages, fieldBtnText = _a.fieldBtnText, fieldRequiredMessages = _a.fieldRequiredMessages;
            var required = fieldRequiredMessages.required, noneSelected = fieldRequiredMessages.noneSelected, selected = fieldRequiredMessages.selected;
            var uniqueId = this.viewModel.createUniqueLayerId(layer);
            var areFieldsSelected = this.viewModel.areFieldsSelectedForLayer(uniqueId);
            return !this.supportsFieldSelection ? null : (widget_1.tsx("calcite-button", { id: uniqueId, appearance: "transparent", "icon-start": !areFieldsSelected
                    ? this.isFieldSelectionRequired ? "exclamation-mark-circle" : ""
                    : "list-check", color: !areFieldsSelected && this.isFieldSelectionRequired ? "red" : "blue", title: !areFieldsSelected
                    ? this.isFieldSelectionRequired ? required : noneSelected
                    : selected, scale: "s", class: this.classes(CSS.fieldSelectorToggleBtn), onclick: this._openFieldSelector.bind(this, layer, uniqueId) }, fieldBtnText));
        };
        LayerConfig.prototype._openFieldSelector = function (layer, uniqueId, event) {
            this._stateStore.router = "FieldSelector";
            this._fieldSelector.setupFields(layer, uniqueId);
            this.scheduleRender();
            watchUtils_1.once(this._stateStore, "router", function (routerState) {
                if (routerState === "LayerSelector") {
                    setTimeout(function () {
                        var _a;
                        var fieldsBtn = document.getElementById(uniqueId);
                        (_a = fieldsBtn === null || fieldsBtn === void 0 ? void 0 : fieldsBtn.setFocus()) !== null && _a !== void 0 ? _a : fieldsBtn === null || fieldsBtn === void 0 ? void 0 : fieldsBtn.focus();
                    }, 200);
                }
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfig.prototype, "fieldName", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfig.prototype, "loadedMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfig.prototype, "headerText", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.selectionType")
        ], LayerConfig.prototype, "layerSelectionMode", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.allowedLayerTypes")
        ], LayerConfig.prototype, "supportedLayerTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.allowedGeomTypes")
        ], LayerConfig.prototype, "supportedGeometryTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.allowedCapabilities")
        ], LayerConfig.prototype, "supportedCapabilityTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfig.prototype, "supportsFieldSelection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfig.prototype, "isFieldSelectionRequired", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.stateStore.fieldSelectionMode")
        ], LayerConfig.prototype, "fieldSelectionMode", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.stateStore.supportedFieldTypes")
        ], LayerConfig.prototype, "supportedFieldTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.stateStore.savedState")
        ], LayerConfig.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfig.prototype, "excludeFields", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LayerSelectorConfig/resources")
        ], LayerConfig.prototype, "LayerSelectorMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: LayerConfigViewModel
            })
        ], LayerConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            decorators_1.aliasOf("viewModel.outputJSON")
        ], LayerConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.stateStore.router")
        ], LayerConfig.prototype, "_router", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.areLayersDetailsLoading")
        ], LayerConfig.prototype, "_areLayersDetailsLoading", void 0);
        LayerConfig = tslib_1.__decorate([
            decorators_1.subclass("LayerConfig")
        ], LayerConfig);
        return LayerConfig;
    }(BaseComponent));
    return LayerConfig;
});
