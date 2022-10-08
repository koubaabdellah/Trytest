define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "../BaseComponent", "../../icons/icons", "./LayerEffectConfig/LayerEffectConfigAssets"], function (require, exports, tslib_1, decorators_1, widget_1, BaseComponent, icons_1, LayerEffectConfigAssets_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "layer-effect-config__expand-container",
        title: "layer-effect-config__expand-container-title",
        label: "layer-effect-config__label",
        labelTitle: "layer-effect-config__label--title",
        colorTitle: "layer-effect-config__label--title-color-input",
        input: "layer-effect-config__input-grid",
        colorInputBtn: "layer-effect-config__input-grid--color",
        colorInputContainer: "layer-effect-config__input-grid--color-container",
        slider: "layer-effect-config__slider",
        resetBtnGrid: "layer-effect-config__reset-btn-grid",
        resetBtn: "layer-effect-config__reset-btn",
        selectLabel: "layer-effect-config__select-label",
        view: "layer-effect-config__view",
        content: "layer-effect-config__modal-content",
        config: "layer-effect-config__effect-config",
        advSwitch: "layer-effect-config__scale-switch",
        scale: "layer-effect-config__scale",
        scaleListContainer: "layer-effect-config__scale-list-container",
        scaleListItem: "layer-effect-config__scale-list-item",
        scaleListItemEffect: "layer-effect-config__scale-list-item-effect",
        scaleListItemActions: "layer-effect-config__scale-list-item-actions",
        select: "esri-widget esri-select",
        sectionLabel: "layer-effect-config__section-label",
        layerEffectDescContainer: "layer-effect-config__layer-effect-desc-container",
        layerEffectDesc: "layer-effect-config__layer-effect-desc",
        addEffect: "layer-effect-config__add-effect",
        effectsListContainer: "layer-effect-config__effect-list-container",
        effectListItem: "layer-effect-config__effect-list-item",
        editEffect: "layer-effect-config__edit-effect",
        editParamsContainer: "layer-effect-config__edit-params-container",
        scaleText: "layer-effect-config__scale-text",
        tooltipContainer: "layer-effect-config__tooltip-icon-switch-container"
    };
    var LayerEffectOptions = (function (_super) {
        tslib_1.__extends(LayerEffectOptions, _super);
        function LayerEffectOptions(properties) {
            var _this = _super.call(this, properties) || this;
            _this.addEffect = false;
            _this.scaleEffects = {};
            _this.layerEffectMessages = null;
            _this._layers = [];
            return _this;
        }
        LayerEffectOptions.prototype.postInitialize = function () {
            var _this = this;
            var _a, _b, _c, _d;
            this._scaleTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-select-layer-layer-effect", "select-layer-layer-effect", (_b = (_a = this.layerEffectMessages) === null || _a === void 0 ? void 0 : _a.layerEffectModal) === null || _b === void 0 ? void 0 : _b.scaleTooltip);
            this._blendModeTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-custom-filter-layer-effect", "custom-filter-layer-effect", (_d = (_c = this.layerEffectMessages) === null || _c === void 0 ? void 0 : _c.layerEffectModal) === null || _d === void 0 ? void 0 : _d.blendModeTooltip);
            this.map.allLayers.forEach(function (layer) {
                _this._layers.push(layer);
            });
            this.own(this.watch("addEffect", function () {
                if (_this.addEffect) {
                    _this._selectLayerEl.setAttribute("disabled", "");
                }
                else {
                    _this._selectLayerEl.removeAttribute("disabled");
                }
            }));
        };
        LayerEffectOptions.prototype.render = function () {
            var _a = this.layerEffectMessages.layerEffectModal, addLayerEffect = _a.addLayerEffect, layerEffectsTitle = _a.layerEffectsTitle, scale = _a.scale;
            var selectLayer = this._renderSelectLayer();
            var appliedEffectsList = this.appliedEffects && this.appliedEffects.length ? this._renderEffectsList() : null;
            var addEffect = this._renderAddLayerEffect();
            var enableScale = this._renderEnableScale();
            var currentScale = this.scaleEffectsOn ? this._renderCurrentScale() : null;
            var scaleList = this.scaleEffectsOn ? this._renderScaleList() : null;
            var selectBlendMode = this._renderSelectBlendMode();
            var effects = this.effects ? this._renderEffects() : null;
            return (widget_1.tsx("div", { class: CSS.base, afterCreate: function (effectContainer) {
                    var uiContainer = document
                        .getElementById("layerEffectView")
                        .querySelector(".esri-ui-inner-container.esri-ui-corner-container");
                    effectContainer.style.maxHeight = uiContainer.clientHeight.toString() + "px";
                } },
                widget_1.tsx("p", { class: CSS.title }, layerEffectsTitle),
                selectLayer,
                addEffect,
                this.addEffect ? null : appliedEffectsList,
                this.addEffect ? (widget_1.tsx("div", { key: "add-layer-effect" },
                    currentScale,
                    scaleList,
                    widget_1.tsx("fieldset", null,
                        widget_1.tsx("legend", { class: CSS.sectionLabel }, addLayerEffect),
                        effects))) : (widget_1.tsx("fieldset", { key: "initial" },
                    widget_1.tsx("legend", { class: CSS.sectionLabel }, scale),
                    enableScale,
                    currentScale,
                    scaleList,
                    selectBlendMode))));
        };
        LayerEffectOptions.prototype._renderSelectLayer = function () {
            return (widget_1.tsx("label", { key: "select-layer" },
                widget_1.tsx("span", null, this.layerEffectMessages.layerEffectModal.selectLayer),
                widget_1.tsx("select", { bind: this, "data-node-ref": "_selectLayerEl", afterCreate: widget_1.storeNode, class: CSS.select, onchange: this._handleSelectLayer }, this._layers.map(function (layer) {
                    return widget_1.tsx("option", { value: layer.id }, layer.title);
                }))));
        };
        LayerEffectOptions.prototype._renderAddLayerEffect = function () {
            var _a = this.layerEffectMessages.layerEffectModal, addEffect = _a.addEffect, cancel = _a.cancel, done = _a.done, layerEffect = _a.layerEffect, layerEffectDesc = _a.layerEffectDesc;
            return (widget_1.tsx("fieldset", null,
                widget_1.tsx("legend", { class: CSS.sectionLabel }, layerEffect),
                widget_1.tsx("div", { class: CSS.layerEffectDescContainer },
                    widget_1.tsx("div", null,
                        widget_1.tsx("p", { class: CSS.layerEffectDesc }, layerEffectDesc),
                        this.addEffect ? (widget_1.tsx("div", { key: "done-cancel-effect", class: CSS.addEffect },
                            widget_1.tsx("calcite-button", { bind: this, appearance: "outline", width: "half", onclick: this._handleCancelAddEffect }, cancel),
                            widget_1.tsx("calcite-button", { bind: this, width: "half", onclick: this._handleSaveEffect }, done))) : (widget_1.tsx("div", { key: "add-effect", class: CSS.addEffect },
                            widget_1.tsx("calcite-button", { bind: this, appearance: "outline", "icon-start": "plus", width: "full", onclick: this._handleAddEffect }, addEffect)))))));
        };
        LayerEffectOptions.prototype._renderEnableScale = function () {
            var _a;
            var scaleTooltip = (_a = this._scaleTooltip) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            return (widget_1.tsx("label", { class: CSS.advSwitch, onclick: this._preventDefault },
                widget_1.tsx("span", null, this.layerEffectMessages.layerEffectModal.enableScale),
                widget_1.tsx("div", { class: CSS.tooltipContainer },
                    scaleTooltip,
                    widget_1.tsx("calcite-switch", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "enableScaleSwitch", oncalciteSwitchChange: this._handleScaleSwitch, checked: this.scaleEffectsOn }))));
        };
        LayerEffectOptions.prototype._renderSelectBlendMode = function () {
            var _a;
            var blendModeTooltip = (_a = this._blendModeTooltip) === null || _a === void 0 ? void 0 : _a.renderTipCalciteIcon();
            var layerEffectModal = this.layerEffectMessages.layerEffectModal;
            return (widget_1.tsx("label", { class: CSS.selectLabel, onclick: this._preventDefault },
                widget_1.tsx("span", { class: "esri-config-panel__config-setting-label" },
                    layerEffectModal.blendMode,
                    " ",
                    blendModeTooltip),
                widget_1.tsx("select", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "blendModeSelect", class: CSS.select, onchange: this._handleSelectBlendMode },
                    widget_1.tsx("option", { value: "normal" }, "normal"),
                    Object.entries(LayerEffectConfigAssets_1.blendModeList).map(function (blendModeGroup) { return (widget_1.tsx("optgroup", { label: layerEffectModal === null || layerEffectModal === void 0 ? void 0 : layerEffectModal[blendModeGroup[0]] }, blendModeGroup === null || blendModeGroup === void 0 ? void 0 : blendModeGroup[1].map(function (blendMode) { return (widget_1.tsx("option", { value: blendMode }, blendMode)); }))); }))));
        };
        LayerEffectOptions.prototype._renderEffects = function () {
            var effectsItems = this._renderEffectsItems();
            return (widget_1.tsx("calcite-accordion", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "effectsAccordion", scale: "s", "selection-mode": "single", "icon-position": "start" }, effectsItems));
        };
        LayerEffectOptions.prototype._renderEffectsItems = function () {
            var _this = this;
            return this.effects.toArray().map(function (effect) {
                return _this._checkEffect(effect);
            });
        };
        LayerEffectOptions.prototype._renderEffectParams = function (effect) {
            var params = this._getEffectParamsElements(effect);
            return this._renderAccordionEffectItem(params, effect, true);
        };
        LayerEffectOptions.prototype._renderEffect = function (effect) {
            var elements = this._getEffectElements(effect);
            return this._renderAccordionEffectItem(elements, effect);
        };
        LayerEffectOptions.prototype._renderSlider = function (effect, isParam) {
            return (widget_1.tsx("calcite-slider", { id: effect.type, class: isParam ? CSS.input : CSS.slider, bind: this, min: effect.min, max: effect.max, value: effect.value || effect.initialValue, "label-handles": "", step: effect.step, snap: "", afterCreate: this._handleSliderUpdate.bind(this, effect) }));
        };
        LayerEffectOptions.prototype._renderColorInput = function (effect) {
            var color = effect.value ? effect.value : effect.initialValue;
            return (widget_1.tsx("div", { class: CSS.colorInputContainer },
                widget_1.tsx("button", { id: "color-picker-button", class: this.classes(CSS.input, CSS.colorInputBtn), style: "background:" + color, "aria-label": this.layerEffectMessages.layerEffectModal.enableScale }),
                widget_1.tsx("calcite-popover", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_colorPopover", placement: "auto-end", "disable-pointer": "", "offset-distance": "0", "reference-element": "color-picker-button", "auto-close": "true" },
                    widget_1.tsx("calcite-color-picker", { appearance: "minimal", "hide-channels": "", "hide-saved": "", value: color, afterCreate: this._handleColorInputCreate.bind(this, effect) }))));
        };
        LayerEffectOptions.prototype._renderResetActionBtn = function (effect) {
            return (widget_1.tsx("calcite-action", { onclick: this._handleReset.bind(this, effect), class: CSS.resetBtnGrid, label: this.layerEffectMessages.layerEffectModal.resetEffects, icon: icons_1.default.reset }));
        };
        LayerEffectOptions.prototype._renderEffectLabelWrapper = function (children, effect, isColorInput) {
            return (widget_1.tsx("label", { key: effect.type, class: CSS.label },
                widget_1.tsx("span", { class: isColorInput ? CSS.colorTitle : CSS.labelTitle }, effect.type),
                children.map(function (child) { return child; })));
        };
        LayerEffectOptions.prototype._renderEffectParamsLabelWrapper = function (children, effect) {
            return (widget_1.tsx("label", { key: effect.type },
                widget_1.tsx("span", null, effect.type),
                widget_1.tsx("div", { class: CSS.editParamsContainer }, children.map(function (child) { return child; }))));
        };
        LayerEffectOptions.prototype._renderAccordionEffectItem = function (children, effect, isParam) {
            return (widget_1.tsx("calcite-accordion-item", { key: effect.type, "item-title": effect.type, afterCreate: this._handleAccordionItemStyle.bind(this, isParam) }, children.map(function (child) { return child; })));
        };
        LayerEffectOptions.prototype._renderCurrentScale = function () {
            return this.scaleEffectsOn ? (widget_1.tsx("p", { class: CSS.scale },
                widget_1.tsx("span", { class: CSS.scaleText },
                    this.layerEffectMessages.layerEffectModal.currentScale,
                    ":"),
                " ",
                this._getScale(Math.round(this.scale)))) : null;
        };
        LayerEffectOptions.prototype._renderScaleList = function () {
            var _this = this;
            var _a = this.layerEffectMessages.layerEffectModal, copyScaleEffect = _a.copyScaleEffect, deleteScaleEffect = _a.deleteScaleEffect, effect = _a.effect, scale = _a.scale;
            var list = this.scales && this.scales.length ? (widget_1.tsx("div", { key: "scale-container", class: CSS.scaleListContainer }, this.scales.map(function (scaleNum) {
                var _a;
                var roundedScale = Math.round(scaleNum);
                var scalesEffects = (_a = _this.scaleEffects[scaleNum]) === null || _a === void 0 ? void 0 : _a.split(") ");
                return (widget_1.tsx("div", { key: scaleNum, class: CSS.scaleListItem },
                    widget_1.tsx("p", { class: CSS.scaleListItemEffect },
                        widget_1.tsx("span", { class: CSS.scaleText },
                            scale,
                            ":"),
                        " ",
                        _this._getScale(roundedScale)),
                    widget_1.tsx("div", null,
                        widget_1.tsx("button", { id: roundedScale.toString() },
                            effect,
                            " ",
                            widget_1.tsx("calcite-icon", { scale: "s", icon: "information" })),
                        widget_1.tsx("calcite-tooltip", { afterCreate: _this._handleCreateTooltip.bind(_this, roundedScale.toString()), "offset-skidding": "0", "auto-close": "true" },
                            widget_1.tsx("ul", null, scalesEffects.map(function (effect, index) {
                                return index === scalesEffects.length - 1 ? (widget_1.tsx("li", { key: effect }, "" + effect)) : (widget_1.tsx("li", { key: effect }, effect + ")"));
                            })))),
                    !_this.addEffect ? (widget_1.tsx("div", { class: CSS.scaleListItemActions },
                        widget_1.tsx("calcite-action", { bind: _this, scale: "s", label: copyScaleEffect, slot: "actions-end", icon: icons_1.default.copy, afterCreate: _this._handleScaleCopy.bind(_this, scaleNum) }),
                        widget_1.tsx("calcite-action", { bind: _this, scale: "s", label: deleteScaleEffect, slot: "actions-end", icon: icons_1.default.trash, afterCreate: _this._handleScaleDelete.bind(_this, scaleNum) }))) : null));
            }))) : null;
            return list;
        };
        LayerEffectOptions.prototype._renderEffectsList = function () {
            var _this = this;
            var edit = this.isEditing ? this._renderEdit() : null;
            return (widget_1.tsx("div", null,
                widget_1.tsx("div", { key: "effects-list", class: CSS.effectsListContainer },
                    widget_1.tsx("calcite-value-list", { bind: this, dragEnabled: true, afterCreate: this._handleEffectListCreation }, this.appliedEffects.map(function (effect) {
                        var _a;
                        var output = _this.viewModel._createEffectOutput(effect);
                        var check = (_this.scaleEffectsOn && !((_a = _this.scales) === null || _a === void 0 ? void 0 : _a.includes(_this.scale))) ||
                            _this.viewModel._checkOutputForValue(output);
                        return (widget_1.tsx("calcite-value-list-item", { bind: _this, style: "display: " + (check ? "flex" : "none"), key: effect.type, class: CSS.effectListItem, label: effect.type, value: effect.type, afterCreate: _this._removePickListStyling }, _this._renderListDropdown(effect)));
                    }))),
                edit));
        };
        LayerEffectOptions.prototype._renderListDropdown = function (effect) {
            var _a = this.layerEffectMessages.layerEffectModal, deleteEffect = _a.deleteEffect, edit = _a.edit;
            return (widget_1.tsx("calcite-dropdown", { slot: "actions-end", placement: "bottom-end" },
                widget_1.tsx("calcite-action", { slot: "dropdown-trigger", scale: "s", icon: icons_1.default.ellipsis, text: "Dropdown menu" }),
                widget_1.tsx("calcite-dropdown-group", { "selection-mode": "none" },
                    widget_1.tsx("calcite-dropdown-item", { "icon-start": icons_1.default.pencil, onclick: this.viewModel.handleEditEffect.bind(this.viewModel, effect) }, edit),
                    widget_1.tsx("calcite-dropdown-item", { "icon-start": icons_1.default.trash, onclick: this.viewModel.handleDeleteEffect.bind(this.viewModel, effect) }, deleteEffect))));
        };
        LayerEffectOptions.prototype._renderEdit = function () {
            var _this = this;
            var _a = this.layerEffectMessages.layerEffectModal, cancel = _a.cancel, done = _a.done;
            return (widget_1.tsx("div", { class: CSS.editEffect },
                this.effects.toArray().map(function (effect) {
                    if (effect.isEditing) {
                        if (effect.params) {
                            return _this._getEffectParamsElements(effect, true);
                        }
                        else {
                            return _this._getEffectElements(effect, true);
                        }
                    }
                }),
                widget_1.tsx("calcite-button", { bind: this, scale: "s", appearance: "outline", width: "half", onclick: this._handleCancelAddEffect }, cancel),
                widget_1.tsx("calcite-button", { bind: this, scale: "s", width: "half", onclick: this._handleDoneEditEffect }, done)));
        };
        LayerEffectOptions.prototype._handleSelectLayer = function (e) {
            var node = e.target;
            if (node.value !== "default") {
                this.selectedLayer = this._layers.find(function (_a) {
                    var id = _a.id;
                    return id === node.value;
                });
                this.viewModel.updateEffects(this.selectedLayer);
                this.viewModel.updateAppliedEffects();
            }
            this.blendModeSelect.value = this.selectedLayer.blendMode;
        };
        LayerEffectOptions.prototype._handleSelectBlendMode = function (e) {
            e.preventDefault();
            var node = e.target;
            this.selectedLayer.blendMode = node.value;
        };
        LayerEffectOptions.prototype._handleColorInput = function (effect, e) {
            var node = e.target;
            effect.value = node.value;
            if (!effect.isInitialValue) {
                this.viewModel.updateEffect(effect);
                this.viewModel.setTmpViewEffect(effect.type);
            }
            else {
                effect.isInitialValue = false;
            }
        };
        LayerEffectOptions.prototype._handleSliderUpdate = function (effect, slider) {
            var _this = this;
            slider.addEventListener("calciteSliderInput", function (e) {
                var node = e.target;
                effect.value = node.value;
                if (!effect.isInitialValue) {
                    _this.viewModel.updateEffect(effect);
                    _this.viewModel.setTmpViewEffect(effect.type);
                }
                else {
                    effect.isInitialValue = false;
                }
            });
        };
        LayerEffectOptions.prototype._handleAccordionItemStyle = function (isEffectParam, accordionItem) {
            var style = document.createElement("style");
            style.innerHTML = isEffectParam ? LayerEffectConfigAssets_1.shadowRootStyles.effectParams : LayerEffectConfigAssets_1.shadowRootStyles.effect;
            accordionItem.shadowRoot.appendChild(style);
        };
        LayerEffectOptions.prototype._handleReset = function (effect, e) {
            var _a;
            e.preventDefault();
            effect.value = effect.initialValue;
            (_a = document.getElementById(effect.type)) === null || _a === void 0 ? void 0 : _a.setAttribute("value", effect.initialValue.toString());
            this.viewModel.updateEffect(effect);
            this.viewModel.setTmpViewEffect();
        };
        LayerEffectOptions.prototype._handleAddEffect = function () {
            this.viewModel.handleAddEffect();
            this.addEffect = true;
        };
        LayerEffectOptions.prototype._handleCancelAddEffect = function () {
            this.viewModel.handleCancelAddEffect();
            this.addEffect = false;
        };
        LayerEffectOptions.prototype._handleSaveEffect = function () {
            this.viewModel.handleSaveEffect();
            this.addEffect = false;
        };
        LayerEffectOptions.prototype._handleDoneEditEffect = function () {
            this.isEditing = false;
        };
        LayerEffectOptions.prototype._handleScaleDelete = function (scale, actionBtn) {
            var _this = this;
            actionBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                _this.viewModel.handleScaleReset(scale);
            });
        };
        LayerEffectOptions.prototype._handleScaleCopy = function (scale, actionBtn) {
            var _this = this;
            actionBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                _this.viewModel.handleScaleCopy(scale);
            });
        };
        LayerEffectOptions.prototype._handleScaleSwitch = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var node = e.target;
            this.scaleEffectsOn = node.checked;
            this.viewModel.setTmpViewEffect();
        };
        LayerEffectOptions.prototype._checkEffect = function (effect) {
            return effect.params ? this._renderEffectParams(effect) : this._renderEffect(effect);
        };
        LayerEffectOptions.prototype._getEffectParamsElements = function (effect, showLabel) {
            var _this = this;
            if (showLabel === void 0) { showLabel = false; }
            var params = effect.params.map(function (effect) {
                var actionBtn = _this._renderResetActionBtn(effect);
                return effect.type === "color"
                    ? _this._renderEffectLabelWrapper([_this._renderColorInput(effect), actionBtn], effect, true)
                    : _this._renderEffectLabelWrapper([_this._renderSlider(effect, true), actionBtn], effect);
            });
            return showLabel ? this._renderEffectParamsLabelWrapper(params, effect) : params;
        };
        LayerEffectOptions.prototype._getEffectElements = function (effect, showLabel) {
            if (showLabel === void 0) { showLabel = false; }
            var reset = this._renderResetActionBtn(effect);
            var slider = this._renderSlider(effect);
            return showLabel ? this._renderEffectLabelWrapper([slider, reset], effect) : [slider, reset];
        };
        LayerEffectOptions.prototype._handleColorInputCreate = function (effect, colorPicker) {
            var _this = this;
            colorPicker.addEventListener("mouseout", function () { return (_this._colorPopover.open = false); });
            colorPicker.addEventListener("click", function (event) { return event.preventDefault(); });
            colorPicker.addEventListener("calciteColorPickerChange", this._handleColorInput.bind(this, effect));
        };
        LayerEffectOptions.prototype._removePickListStyling = function (valueListItem) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var style, pickListItem;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            style = document.createElement("style");
                            style.innerHTML = ":host(:hover) { background-color: unset!important; }\n    .label { cursor: unset!important; }";
                            return [4, this.viewModel.checkForElement(valueListItem.shadowRoot, "calcite-pick-list-item")];
                        case 1:
                            pickListItem = _a.sent();
                            pickListItem === null || pickListItem === void 0 ? void 0 : pickListItem.shadowRoot.prepend(style);
                            return [2];
                    }
                });
            });
        };
        LayerEffectOptions.prototype._getScale = function (scale) {
            var zoomLevel = this.layerEffectMessages.layerEffectModal.zoomLevel;
            if (scale < 100) {
                return zoomLevel["room"];
            }
            var scaleLength = LayerEffectConfigAssets_1.scaleRangeStops.length;
            for (var i = 1; i < scaleLength; i++) {
                if (scale < LayerEffectConfigAssets_1.scaleRangeStops[i].maxScale && scale > LayerEffectConfigAssets_1.scaleRangeStops[i - 1].maxScale) {
                    return zoomLevel === null || zoomLevel === void 0 ? void 0 : zoomLevel[LayerEffectConfigAssets_1.scaleRangeStops[i].id];
                }
                else if (scaleLength - 1 === i && scale > LayerEffectConfigAssets_1.scaleRangeStops[scaleLength - 1].maxScale) {
                    return zoomLevel["world"];
                }
            }
        };
        LayerEffectOptions.prototype._handleEffectListCreation = function (valueList) {
            valueList.addEventListener("calciteListOrderChange", this.viewModel.handleOrderChange.bind(this.viewModel));
        };
        LayerEffectOptions.prototype._handleCreateTooltip = function (id, tooltip) {
            var tooltipMgmt = document.getElementById(id);
            tooltip.referenceElement = tooltipMgmt;
        };
        LayerEffectOptions.prototype._preventDefault = function (e) {
            e.preventDefault();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectOptions.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectOptions.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], LayerEffectOptions.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectOptions.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedLayer")
        ], LayerEffectOptions.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectOptions.prototype, "addEffect", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.effects")
        ], LayerEffectOptions.prototype, "effects", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.scaleEffectsOn")
        ], LayerEffectOptions.prototype, "scaleEffectsOn", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.scaleEffects")
        ], LayerEffectOptions.prototype, "scaleEffects", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.scale")
        ], LayerEffectOptions.prototype, "scale", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.scales")
        ], LayerEffectOptions.prototype, "scales", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.appliedEffects")
        ], LayerEffectOptions.prototype, "appliedEffects", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.blendModeSelect")
        ], LayerEffectOptions.prototype, "blendModeSelect", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.effectsAccordion")
        ], LayerEffectOptions.prototype, "effectsAccordion", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.isEditing")
        ], LayerEffectOptions.prototype, "isEditing", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectOptions.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LayerEffectConfig/resources")
        ], LayerEffectOptions.prototype, "layerEffectMessages", void 0);
        LayerEffectOptions = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.LayerEffectOptions")
        ], LayerEffectOptions);
        return LayerEffectOptions;
    }(BaseComponent));
    return LayerEffectOptions;
});
