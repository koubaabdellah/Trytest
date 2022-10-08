define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/support/widget", "../BaseComponent", "./LayerEffectModal", "esri/portal/PortalItem", "esri/WebMap"], function (require, exports, tslib_1, decorators_1, watchUtils_1, widget_1, BaseComponent, LayerEffectModal, PortalItem, WebMap) {
    "use strict";
    var CSS = {
        base: "layer-effect-config",
        label: "layer-effect-config__label",
        title: "layer-effect-config__label--title",
        input: "layer-effect-config__input-grid",
        colorInput: "layer-effect-config__input-grid--color",
        slider: "layer-effect-config__slider",
        resetBtnGrid: "layer-effect-config__reset-btn-grid",
        resetBtn: "layer-effect-config__reset-btn",
        selectLabel: "layer-effect-config__select-label",
        view: "layer-effect-config__view",
        content: "layer-effect-config__modal-content",
        config: "layer-effect-config__effect-config",
        advSwitch: "layer-effect-config__scale-switch",
        scale: "layer-effect-config__scale"
    };
    var LayerEffectConfig = (function (_super) {
        tslib_1.__extends(LayerEffectConfig, _super);
        function LayerEffectConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.layerEffectMessages = null;
            return _this;
        }
        LayerEffectConfig.prototype.destroy = function () {
            this._modal.destroy();
            this._modal = null;
        };
        LayerEffectConfig.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    this.own(watchUtils_1.whenOnce(this, "configPanelViewModel", function () {
                        _this._initPortalItem();
                        _this.own(watchUtils_1.watch(_this.configPanelViewModel, "selectedMapId", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                this._initPortalItem();
                                return [2];
                            });
                        }); }));
                    }));
                    return [2];
                });
            });
        };
        LayerEffectConfig.prototype.render = function () {
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("calcite-button", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "configBtn", color: "blue", appearance: "outline", width: "full", onclick: this._handleModalOpen }, this.layerEffectMessages.configure)));
        };
        LayerEffectConfig.prototype._initPortalItem = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4, new PortalItem({
                                    id: this.configPanelViewModel.selectedMapId,
                                    portal: this.configPanelViewModel.portal
                                }).load()];
                        case 1:
                            _a._portalItem = _b.sent();
                            return [2];
                    }
                });
            });
        };
        LayerEffectConfig.prototype._initEffects = function (map) {
            var _this = this;
            this._initialEffects = {};
            map.allLayers.map(function (layer) {
                var _a;
                _this._initialEffects[map.portalItem.id] = tslib_1.__assign(tslib_1.__assign({}, _this._initialEffects[map.portalItem.id]), (_a = {}, _a[layer.id] = {
                    effect: layer.effect,
                    blendMode: layer.blendMode
                }, _a));
            });
        };
        LayerEffectConfig.prototype._handleModalOpen = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var map, _a;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            map = new WebMap({
                                portalItem: this._portalItem
                            });
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4, map.loadAll()];
                        case 2:
                            _b.sent();
                            return [3, 5];
                        case 3:
                            _a = _b.sent();
                            return [3, 5];
                        case 4:
                            this._initEffects(map);
                            this._modal = new LayerEffectModal({
                                map: map,
                                configPanelViewModel: this.configPanelViewModel,
                                configRestriction: this.configRestriction
                            });
                            return [7];
                        case 5:
                            this.own([
                                watchUtils_1.watch(this.configPanelViewModel, "templateAppData", function () {
                                    _this.configBtn.loading = false;
                                }),
                                watchUtils_1.whenTrueOnce(this._modal, "isReadyForRender", function () {
                                    var _a, _b, _c, _d;
                                    _this.configPanelViewModel.setGenericModalDOM((_a = _this._modal) === null || _a === void 0 ? void 0 : _a.render());
                                    var configValues = (_b = _this.configPanelViewModel.templateAppData) === null || _b === void 0 ? void 0 : _b.values;
                                    var layerEffectConfigDraft = (_c = configValues === null || configValues === void 0 ? void 0 : configValues.draft) === null || _c === void 0 ? void 0 : _c.layerEffectConfig;
                                    var layerEffectConfig = ((_d = configValues === null || configValues === void 0 ? void 0 : configValues.layerEffectConfig) === null || _d === void 0 ? void 0 : _d[map.portalItem.id]) ? _this.configPanelViewModel.templateAppData.values.layerEffectConfig
                                        : null;
                                    _this._modal.input = layerEffectConfigDraft
                                        ? layerEffectConfigDraft
                                        : layerEffectConfig
                                            ? layerEffectConfig
                                            : _this._initialEffects;
                                    _this._modal.renderNow();
                                    _this._modal.modal.setAttribute("active", "true");
                                    _this._modal.modal.addEventListener("calciteModalClose", _this._handleModalClose.bind(_this));
                                }),
                                watchUtils_1.watch(this._modal, ["scales", "scaleEffectsOn", "scale", "selectedLayer.effect"], function () {
                                    var _a;
                                    _this.configPanelViewModel.setGenericModalDOM((_a = _this._modal) === null || _a === void 0 ? void 0 : _a.render());
                                    _this._modal.renderNow();
                                }),
                                watchUtils_1.watch(this._modal, "outputJSON", function (output) {
                                    _this.set("outputJSON", output);
                                })
                            ]);
                            return [2];
                    }
                });
            });
        };
        LayerEffectConfig.prototype._handleModalClose = function () {
            var _a, _b, _c, _d, _e, _f;
            (_b = (_a = this._modal) === null || _a === void 0 ? void 0 : _a.viewModel) === null || _b === void 0 ? void 0 : _b.deinitializeLayerEffect();
            this.configPanelViewModel.setGenericModalDOM(null);
            (_d = (_c = this._modal) === null || _c === void 0 ? void 0 : _c.modal) === null || _d === void 0 ? void 0 : _d.setAttribute("active", "false");
            if ((_e = this._modal) === null || _e === void 0 ? void 0 : _e.isConfirmed) {
                this.configBtn.loading = true;
            }
            (_f = this._modal) === null || _f === void 0 ? void 0 : _f.destroy();
            this._modal = null;
            this.configBtn.setFocus();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectConfig.prototype, "configRestriction", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectConfig.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/LayerEffectConfig/resources")
        ], LayerEffectConfig.prototype, "layerEffectMessages", void 0);
        LayerEffectConfig = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.LayerEffectConfig")
        ], LayerEffectConfig);
        return LayerEffectConfig;
    }(BaseComponent));
    return LayerEffectConfig;
});
