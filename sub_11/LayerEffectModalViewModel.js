define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/layers/effects/jsonUtils", "esri/core/Collection", "esri/core/Handles", "esri/views/MapView", "esri/core/watchUtils", "esri/widgets/Expand", "../LayerEffectConfig/LayerEffectConfigAssets", "../LayerEffectOptions"], function (require, exports, tslib_1, decorators_1, Accessor_1, effectsUtils, Collection, Handles, MapView, watchUtils_1, Expand, LayerEffectConfigAssets_1, LayerEffectOptions) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var LayerEffectModalViewModel = (function (_super) {
        tslib_1.__extends(LayerEffectModalViewModel, _super);
        function LayerEffectModalViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.scaleEffectsOn = false;
            _this.scaleEffects = {};
            _this.appliedEffects = [];
            _this.isConfirmed = false;
            _this.isEditing = false;
            _this._defaultEffects = new Collection();
            _this._handles = new Handles();
            _this._initialEffects = {};
            return _this;
        }
        LayerEffectModalViewModel.prototype.init = function () {
            var _this = this;
            if (this.configRestriction && this.configRestriction.length) {
                LayerEffectConfigAssets_1.defaultEffects.forEach(function (effect) {
                    if (_this.configRestriction.includes(effect.type)) {
                        _this._defaultEffects.add(effect);
                    }
                });
            }
            else {
                this._defaultEffects.addMany(LayerEffectConfigAssets_1.defaultEffects);
            }
            this.effects = this._defaultEffects.clone();
            this._handles.add(this.watch("view.scale", function (scale) {
                if (_this._timeout) {
                    clearTimeout(_this._timeout);
                }
                _this._timeout = setTimeout(function () {
                    _this.updateScaleEffects(scale);
                }, 200);
            }));
            this._handles.add(this.watch("scaleEffectsOn", function (scaleEffectsOn) {
                if (!scaleEffectsOn) {
                    _this.scaleEffects = {};
                    _this.scales = [];
                }
            }));
            this._handles.add(watchUtils_1.whenOnce(this, "view", function () {
                _this.updateEffects(_this.selectedLayer);
                _this.watch("selectedLayer", function () {
                    _this.scaleEffectsOn = _this.selectedLayer.effect && Array.isArray(_this.selectedLayer.effect) ? true : false;
                    _this.updateEffects(_this.selectedLayer);
                });
            }));
            this._handles.add(this.watch("effectsAccordion", function () {
                _this._setInputValues();
            }));
        };
        LayerEffectModalViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        LayerEffectModalViewModel.prototype.initializeMapView = function () {
            var _this = this;
            this.setupLayersEffectMap();
            var view = new MapView({
                map: this.map,
                container: "layerEffectView"
            });
            view.when(function () {
                _this.view = view;
                _this.scale = _this.view.scale;
                _this._layerEffectOptions = new LayerEffectOptions({
                    map: _this.map,
                    view: _this.view,
                    viewModel: _this
                });
                var expand = new Expand({
                    expandIconClass: "esri-icon-drag-horizontal",
                    view: _this.view,
                    expanded: true,
                    content: _this._layerEffectOptions
                });
                _this.view.ui.add(expand, "top-right");
            });
        };
        LayerEffectModalViewModel.prototype.deinitializeLayerEffect = function () {
            var _this = this;
            if (!this.isConfirmed) {
                this.view.allLayerViews.map(function (layerView) {
                    var layer = layerView.layer;
                    layer.effect = _this._initialEffects[layer.id];
                });
            }
            this.view = null;
        };
        LayerEffectModalViewModel.prototype.setupLayersEffectMap = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "input", function () {
                _this._mapId = _this.map.portalItem.id;
                _this.map.allLayers.map(function (layer, index) {
                    var _a, _b;
                    layer.effect = _this.input[_this._mapId][layer.id].effect;
                    layer.blendMode = _this.input[_this._mapId][layer.id].blendMode;
                    if (index === 0) {
                        _this.selectedLayer = layer;
                        _this.scaleEffectsOn = layer.effect && Array.isArray(layer.effect) ? true : false;
                    }
                    _this._layersEffects = tslib_1.__assign(tslib_1.__assign({}, _this._layersEffects), (_a = {}, _a[layer.id] = {}, _a));
                    _this._initialEffects = tslib_1.__assign(tslib_1.__assign({}, _this._initialEffects), (_b = {}, _b[layer.id] = layer.effect, _b));
                });
            });
        };
        LayerEffectModalViewModel.prototype.updateEffect = function (effect) {
            var effects = this._layersEffects[this.selectedLayer.id];
            var type = effect.type, value = effect.value;
            var effType = this._getType(type);
            if (effType === "drop-shadow") {
                this._updateDropShadowEffect(effect, effects);
            }
            else if (effType === "bloom") {
                this._updateBloomEffect(effect, effects);
            }
            else {
                var tmpEffect = this.effects.find(function (effect) { return effect.type === effType; });
                tmpEffect.value = value;
                effects[effType] = tslib_1.__assign({}, tmpEffect);
            }
            this._layersEffects[this.selectedLayer.id] = effects;
        };
        LayerEffectModalViewModel.prototype.handleCancel = function () {
            this.scaleEffects = {};
            this.setupLayersEffectMap();
        };
        LayerEffectModalViewModel.prototype.handleReset = function () {
            this._resetValues();
            this.scaleEffects = {};
            this.scales = [];
            this.setupLayersEffectMap();
            this.view.allLayerViews.map(function (layerView) {
                var layer = layerView.layer;
                layer.effect = null;
                layer.blendMode = "normal";
            });
            this.blendModeSelect.value = "normal";
        };
        LayerEffectModalViewModel.prototype.handleLayerReset = function () {
            this._resetValues();
            this.scaleEffects = {};
            this.scales = [];
            this._layersEffects[this.selectedLayer.id] = {};
            this.selectedLayer.effect = null;
            this.selectedLayer.blendMode = "normal";
            this.blendModeSelect.value = "normal";
        };
        LayerEffectModalViewModel.prototype.handleScaleReset = function (scale) {
            if (this.scale == scale) {
                this._resetValues();
            }
            delete this.scaleEffects[scale];
            if (!Object.keys(this.scaleEffects).length) {
                this._layersEffects[this.selectedLayer.id] = {};
            }
            else {
                this._updateLayersEffects();
            }
            var scaleEffects = this._getScaleEffects();
            this._checkAllTypesScaleEffectsValues(scaleEffects);
        };
        LayerEffectModalViewModel.prototype.handleScaleCopy = function (scale) {
            if (!this.scales.includes(scale)) {
                this.scales.push(scale);
            }
            this.scaleEffects[this.scale] = this.scaleEffects[scale];
            this._parseEffect(this.scaleEffects[this.scale]);
            this._updateLayersEffects();
            this.setTmpViewEffect();
        };
        LayerEffectModalViewModel.prototype.handleAccordionClose = function () {
            var _a;
            for (var i = 0; i < ((_a = this.effectsAccordion) === null || _a === void 0 ? void 0 : _a.children.length); i++) {
                var item = this.effectsAccordion.children[i];
                if (item.nodeName === "CALCITE-ACCORDION-ITEM") {
                    item.removeAttribute("active");
                }
            }
        };
        LayerEffectModalViewModel.prototype.setTmpViewEffect = function (addedType) {
            var _this = this;
            var _a;
            var effects = this._layersEffects[this.selectedLayer.id];
            var tmp = [];
            for (var _i = 0, _b = Object.values(effects); _i < _b.length; _i++) {
                var effect_1 = _b[_i];
                var output = this._createEffectOutput(effect_1);
                if (output) {
                    tmp.push(output);
                }
            }
            var effect = tmp
                .filter(function (effect) {
                return _this._checkOutputForValue(effect);
            })
                .join(" ");
            var advValue;
            if (tmp.length === 1) {
                advValue = tmp.filter(function (effect) { return _this._checkOutputForValue(effect); })[0];
            }
            else {
                advValue = tmp.join(" ");
            }
            var scaleEffects = [];
            if (this.scaleEffectsOn) {
                if (advValue) {
                    this.scaleEffects[this.scale] = advValue;
                    if (!this.isEditing && addedType) {
                        addedType = this._getType(addedType);
                        for (var _c = 0, _d = Object.entries(this.scaleEffects); _c < _d.length; _c++) {
                            var _e = _d[_c], scale = _e[0], effect_2 = _e[1];
                            if (!effect_2.includes(addedType)) {
                                var defaultEffect = (_a = this.effects.find(function (_a) {
                                    var type = _a.type;
                                    return type === addedType;
                                })) === null || _a === void 0 ? void 0 : _a.default;
                                this.scaleEffects[scale] += " " + defaultEffect;
                            }
                        }
                    }
                }
                else {
                    delete this.scaleEffects[this.scale];
                }
                scaleEffects = this._getScaleEffects();
            }
            else {
                for (var _f = 0, _g = Object.keys(effects); _f < _g.length; _f++) {
                    var type = _g[_f];
                    if (!effect.includes(type)) {
                        delete effects[type];
                    }
                }
            }
            this.selectedLayer.effect = this.scaleEffectsOn ? scaleEffects : effect;
        };
        LayerEffectModalViewModel.prototype.handleAddEffect = function () {
            this._setTmpEffects();
            this.updateEffects(this.selectedLayer);
            this.isEditing = false;
        };
        LayerEffectModalViewModel.prototype.handleCancelAddEffect = function () {
            var _this = this;
            this.isEditing = false;
            this.effects = this._tmpEffects.clone();
            this._tmpEffects = null;
            this.scaleEffects = tslib_1.__assign({}, this._tmpScaleEffects);
            this.selectedLayer.effect = this._tmpLayerEffect;
            this.appliedEffects = tslib_1.__spreadArrays(this._tmpAppliedEffects);
            for (var _i = 0, _a = Object.entries(this._tmpLayersEffects); _i < _a.length; _i++) {
                var _b = _a[_i], layerId = _b[0], effects = _b[1];
                this._layersEffects[layerId] = tslib_1.__assign({}, effects);
            }
            this.scales = [];
            if (this.scaleEffectsOn && this.selectedLayer.effect && Array.isArray(this.selectedLayer.effect)) {
                this.selectedLayer.effect.map(function (effect) {
                    _this.scales.push(effect.scale);
                });
            }
        };
        LayerEffectModalViewModel.prototype.handleSaveEffect = function () {
            this._tmpLayersEffects = null;
            this._tmpLayerEffect = null;
            this._tmpAppliedEffects = null;
            this.setTmpViewEffect();
            this.updateAppliedEffects();
        };
        LayerEffectModalViewModel.prototype.handleEditEffect = function (effect) {
            this._setTmpEffects();
            this._tmpEffects = this.effects.clone();
            this.effects.forEach(function (eff) {
                if (eff.type === effect.type) {
                    eff.isEditing = true;
                }
                else {
                    eff.isEditing = false;
                }
            });
            this.isEditing = true;
        };
        LayerEffectModalViewModel.prototype.handleDeleteEffect = function (effect, event) {
            var _a;
            event.preventDefault();
            var type = effect.type;
            if (this.scaleEffectsOn) {
                if (type === "drop-shadow" || type === "bloom") {
                    for (var _i = 0, _b = Object.values(effect); _i < _b.length; _i++) {
                        var paramEffect = _b[_i];
                        if (typeof paramEffect !== "string") {
                            paramEffect.value = paramEffect.initialValue;
                            this.updateEffect(paramEffect);
                        }
                    }
                }
                else {
                    effect.value = effect.initialValue;
                    this.updateEffect(effect);
                }
            }
            else {
                (_a = this._layersEffects[this.selectedLayer.id]) === null || _a === void 0 ? true : delete _a[effect.type];
            }
            this.setTmpViewEffect();
            if (this.scaleEffectsOn) {
                this._checkScaleEffectsValues(type);
            }
            this.updateAppliedEffects();
        };
        LayerEffectModalViewModel.prototype.handleOrderChange = function (event) {
            var _this = this;
            var order = event.detail;
            if (Array.isArray(this.selectedLayer.effect)) {
                var scaleEffects = this.selectedLayer.effect;
                scaleEffects.forEach(function (effect) {
                    effect.value = _this._updateEffectsOrder(effect.value, order);
                });
            }
            else if (typeof this.selectedLayer.effect === "string") {
                var effect = this.selectedLayer.effect;
                this.selectedLayer.effect = this._updateEffectsOrder(effect, order);
            }
            this.updateEffects(this.selectedLayer);
        };
        LayerEffectModalViewModel.prototype.updateAppliedEffects = function () {
            this.appliedEffects = [];
            for (var _i = 0, _a = Object.values(this._layersEffects[this.selectedLayer.id]); _i < _a.length; _i++) {
                var effect = _a[_i];
                this.appliedEffects.push(tslib_1.__assign({}, effect));
            }
        };
        LayerEffectModalViewModel.prototype.checkForElement = function (element, selector) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var counter;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            counter = 50;
                            _a.label = 1;
                        case 1:
                            if (!!element.querySelector(selector)) return [3, 3];
                            return [4, new Promise(function (resolve) { return requestAnimationFrame(resolve); })];
                        case 2:
                            _a.sent();
                            counter--;
                            if (counter === 0) {
                                return [2, null];
                            }
                            return [3, 1];
                        case 3: return [2, element.querySelector(selector)];
                    }
                });
            });
        };
        LayerEffectModalViewModel.prototype.updateEffects = function (layer) {
            var _this = this;
            var _a, _b, _c;
            this.effects = this._defaultEffects.clone();
            if (layer.effect) {
                this.scaleEffects = {};
                this.scales = [];
                if (Array.isArray(layer.effect)) {
                    layer.effect.map(function (effect) {
                        _this.scaleEffects[effect.scale] = effect.value;
                        _this.scales.push(effect.scale);
                    });
                    var effect = (_a = layer.effect.find(function (_a) {
                        var scale = _a.scale;
                        return scale === _this.scale;
                    })) === null || _a === void 0 ? void 0 : _a.value;
                    if (!effect) {
                        var effects = (_c = (_b = layer.effect[0]) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.replace(/\) /g, ");").split(";");
                        effect = effects === null || effects === void 0 ? void 0 : effects.map(function (eff) {
                            var _a;
                            return (_a = _this.effects.find(function (_a) {
                                var type = _a.type;
                                return eff.includes(type);
                            })) === null || _a === void 0 ? void 0 : _a.default;
                        }).join(" ");
                    }
                    this._setEffects(layer.id, effect);
                }
                else {
                    this._setEffects(layer.id, layer.effect);
                }
                this._updateLayersEffects();
            }
        };
        LayerEffectModalViewModel.prototype.updateScaleEffects = function (scale) {
            this.scale = scale;
            if (this.scaleEffectsOn) {
                if (this.scaleEffects[scale]) {
                    this._parseEffect(this.scaleEffects[scale]);
                }
                this._updateLayersEffects();
            }
        };
        LayerEffectModalViewModel.prototype.generateOutput = function () {
            var _this = this;
            var newOutput = {};
            this.view.allLayerViews.map(function (layerView) {
                var _a;
                newOutput[_this._mapId] = tslib_1.__assign(tslib_1.__assign({}, newOutput[_this._mapId]), (_a = {}, _a[layerView.layer.id] = {
                    effect: layerView.layer.effect,
                    blendMode: layerView.layer.blendMode
                }, _a));
            });
            this.isConfirmed = true;
            this.set("outputJSON", newOutput);
        };
        LayerEffectModalViewModel.prototype._createEffectOutput = function (effect) {
            var effects = this._layersEffects[this.selectedLayer.id];
            if (!(effects === null || effects === void 0 ? void 0 : effects[effect.type]))
                return null;
            if (effect.type === "drop-shadow") {
                var dropShadow = effects["drop-shadow"];
                var offsetXVal = dropShadow["offset-x"].value ? dropShadow["offset-x"].value : 0;
                var offsetYVal = dropShadow["offset-y"].value ? dropShadow["offset-y"].value : 0;
                var blurVal = dropShadow["blur-radius"].value ? dropShadow["blur-radius"].value : 0;
                var color = dropShadow["color"].value ? " " + dropShadow["color"].value + ")" : ")";
                return ("drop-shadow(" +
                    offsetXVal +
                    dropShadow["offset-x"].unit +
                    " " +
                    offsetYVal +
                    dropShadow["offset-y"].unit +
                    " " +
                    blurVal +
                    dropShadow["blur-radius"].unit +
                    " " +
                    color);
            }
            else if (effect.type === "bloom") {
                var bloom = effects.bloom;
                var strengthVal = bloom.strength.value ? bloom.strength.value : 0;
                var radiusVal = bloom.radius.value ? bloom.radius.value : 0;
                var thresholdVal = bloom.threshold.value ? bloom.threshold.value : 0;
                return "bloom(" + strengthVal + " " + radiusVal + bloom.radius.unit + " " + thresholdVal + ")";
            }
            else if (effect.unit && effect.value !== null) {
                return effect.type + "(" + effect.value + effect.unit + ")";
            }
            else if (effect.value !== null) {
                return effect.type + "(" + effect.value + ")";
            }
            return null;
        };
        LayerEffectModalViewModel.prototype._checkOutputForValue = function (output) {
            if (!output)
                return false;
            var compare = this.effects.find(function (_a) {
                var type = _a.type;
                return output.includes(type);
            });
            return parseFloat(output === null || output === void 0 ? void 0 : output.match(/\d/g).join("")) !== compare.initialValue;
        };
        LayerEffectModalViewModel.prototype._parseEffect = function (effect) {
            var _this = this;
            var toJSON = effectsUtils.toJSON(effect);
            toJSON === null || toJSON === void 0 ? void 0 : toJSON.forEach(function (parsed) {
                var i = _this.effects.findIndex(function (_a) {
                    var type = _a.type;
                    return type === parsed.type;
                });
                var effect = _this.effects.getItemAt(i);
                if (i > -1) {
                    if (effect.params) {
                        effect.params.forEach(function (val) {
                            if (val.type === "color") {
                                val.value = _this._colorToString(parsed[val.toJSONType]);
                            }
                            else {
                                val.value =
                                    parsed[val.toJSONType] && val.unit === "px"
                                        ? Number((parsed[val.toJSONType] * 1.333).toFixed(2))
                                        : parsed[val.toJSONType]
                                            ? parsed[val.toJSONType]
                                            : val.initialValue;
                            }
                            _this.updateEffect(val);
                        });
                    }
                    else {
                        effect.value =
                            parsed[effect.toJSONType] && effect.unit === "px"
                                ? Number((parsed[effect.toJSONType] * 1.333).toFixed(2))
                                : parsed[effect.toJSONType];
                        _this.updateEffect(effect);
                    }
                }
            });
        };
        LayerEffectModalViewModel.prototype._setEffects = function (id, layerEffect) {
            var effects = this._layersEffects[id];
            if (Object.keys(effects).length === 0) {
                this._parseEffect(layerEffect);
            }
            else {
                var _loop_1 = function (effect) {
                    var i = this_1.effects.findIndex(function (_a) {
                        var type = _a.type;
                        return type === effect.type;
                    });
                    if (i > -1) {
                        switch (effect.type) {
                            case "bloom":
                            case "drop-shadow":
                                this_1.effects.getItemAt(i).params.map(function (paramEff) {
                                    paramEff.value = effect[paramEff.type].value || null;
                                });
                                break;
                            default:
                                this_1.effects.getItemAt(i).value = effect.value || null;
                        }
                    }
                };
                var this_1 = this;
                for (var _i = 0, _a = Object.values(effects); _i < _a.length; _i++) {
                    var effect = _a[_i];
                    _loop_1(effect);
                }
            }
        };
        LayerEffectModalViewModel.prototype._setInputValues = function () {
            this.effects.toArray().map(function (effect) {
                var _a, _b;
                if (effect.params) {
                    effect.params.map(function (effect) {
                        var _a, _b;
                        var value = effect.value ? effect.value.toString() : (_a = effect === null || effect === void 0 ? void 0 : effect.initialValue) === null || _a === void 0 ? void 0 : _a.toString();
                        if (value) {
                            (_b = document.getElementById(effect.type)) === null || _b === void 0 ? void 0 : _b.setAttribute("value", value);
                        }
                    });
                }
                else {
                    var value = effect.value ? effect.value.toString() : (_a = effect === null || effect === void 0 ? void 0 : effect.initialValue) === null || _a === void 0 ? void 0 : _a.toString();
                    if (value) {
                        (_b = document.getElementById(effect.type)) === null || _b === void 0 ? void 0 : _b.setAttribute("value", value);
                    }
                }
            });
        };
        LayerEffectModalViewModel.prototype._resetValues = function () {
            this.effects = this._defaultEffects.clone();
        };
        LayerEffectModalViewModel.prototype._updateLayersEffects = function () {
            var layerEffect = this._layersEffects[this.selectedLayer.id];
            var _loop_2 = function (value) {
                var effect = this_2.effects.find(function (_a) {
                    var type = _a.type;
                    return type === value.type;
                });
                if (value.type === "bloom") {
                    layerEffect[value.type].strength.value = effect.params[0].value || effect.params[0].initialValue;
                    layerEffect[value.type].radius.value = effect.params[1].value || effect.params[1].initialValue;
                    layerEffect[value.type].threshold.value = effect.params[2].value || effect.params[2].initialValue;
                    layerEffect[value.type].strength.initialValue = effect.params[0].initialValue;
                    layerEffect[value.type].radius.initialValue = effect.params[1].initialValue;
                    layerEffect[value.type].threshold.initialValue = effect.params[2].initialValue;
                }
                else if (value.type === "drop-shadow") {
                    layerEffect[value.type]["offset-x"].value = effect.params[0].value || effect.params[0].initialValue;
                    layerEffect[value.type]["offset-y"].value = effect.params[1].value || effect.params[1].initialValue;
                    layerEffect[value.type]["blur-radius"].value = effect.params[2].value || effect.params[2].initialValue;
                    layerEffect[value.type].color.value = effect.params[3].value || effect.params[3].initialValue;
                }
                else {
                    layerEffect[value.type].value = effect.value || effect.initialValue;
                    layerEffect[value.type].initialValue = effect.initialValue;
                }
            };
            var this_2 = this;
            for (var _i = 0, _a = Object.values(layerEffect); _i < _a.length; _i++) {
                var value = _a[_i];
                _loop_2(value);
            }
            this.updateAppliedEffects();
        };
        LayerEffectModalViewModel.prototype._getScaleEffects = function () {
            var scaleEffects = [];
            this.scales = [];
            for (var _i = 0, _a = Object.entries(this.scaleEffects); _i < _a.length; _i++) {
                var _b = _a[_i], scale = _b[0], value = _b[1];
                scaleEffects.push({ scale: parseFloat(scale), value: value });
                this.scales.push(parseFloat(scale));
            }
            this.scales.sort(function (a, b) { return a - b; });
            return scaleEffects.sort(function (a, b) { return (a.scale > b.scale ? 1 : -1); });
        };
        LayerEffectModalViewModel.prototype._updateDropShadowEffect = function (effect, effects) {
            var dropShadow = this.effects.find(function (_a) {
                var type = _a.type;
                return type === "drop-shadow";
            });
            dropShadow.params.find(function (_a) {
                var type = _a.type;
                return type === effect.type;
            }).value = effect.value;
            var type = "drop-shadow";
            effects[type] =
                typeof effects[type] === "undefined"
                    ? {
                        type: "drop-shadow"
                    }
                    : effects[type];
            for (var _i = 0, _a = dropShadow.params; _i < _a.length; _i++) {
                var params = _a[_i];
                if (effect.type === params.type) {
                    effects[type][effect.type] = tslib_1.__assign({}, effect);
                }
                else {
                    effects[type][params.type] = tslib_1.__assign({}, params);
                }
            }
        };
        LayerEffectModalViewModel.prototype._updateBloomEffect = function (effect, effects) {
            var type = "bloom";
            var bloom = this.effects.find(function (_a) {
                var type = _a.type;
                return type === "bloom";
            });
            bloom.params.find(function (_a) {
                var type = _a.type;
                return type === effect.type;
            }).value = effect.value;
            effects[type] =
                typeof effects[type] === "undefined"
                    ? {
                        type: "bloom"
                    }
                    : effects[type];
            for (var _i = 0, _a = bloom.params; _i < _a.length; _i++) {
                var params = _a[_i];
                if (effect.type === params.type) {
                    effects[type][effect.type] = tslib_1.__assign({}, effect);
                }
                else {
                    effects[type][params.type] = tslib_1.__assign({}, params);
                }
            }
        };
        LayerEffectModalViewModel.prototype._setTmpEffects = function () {
            this._tmpLayerEffect = this.selectedLayer.effect;
            this._tmpEffects = this.effects.clone();
            this._tmpAppliedEffects = tslib_1.__spreadArrays(this.appliedEffects);
            this._tmpLayersEffects = {};
            for (var _i = 0, _a = Object.entries(this._layersEffects); _i < _a.length; _i++) {
                var _b = _a[_i], layerId = _b[0], effects = _b[1];
                this._tmpLayersEffects[layerId] = tslib_1.__assign({}, effects);
            }
            if (this.scaleEffectsOn) {
                this._tmpScaleEffects = tslib_1.__assign({}, this.scaleEffects);
            }
        };
        LayerEffectModalViewModel.prototype._getType = function (type) {
            if (type === "offset-x" || type === "offset-y" || type === "blur-radius" || type === "color") {
                return "drop-shadow";
            }
            else if (type === "strength" || type === "radius" || type === "threshold") {
                return "bloom";
            }
            else {
                return type;
            }
        };
        LayerEffectModalViewModel.prototype._updateEffectsOrder = function (effect, order) {
            var effects = effect.replace(/\) /g, ");").split(";");
            var tmpEffect = [];
            order.forEach(function (type) {
                var i = effects.findIndex(function (eff) { return eff.includes(type); });
                if (i > -1) {
                    tmpEffect.push(effects[i]);
                }
            });
            return tmpEffect.join(" ");
        };
        LayerEffectModalViewModel.prototype._checkScaleEffectsValues = function (type) {
            var scaleEffects = this.selectedLayer.effect;
            var count = this._checkScaleEffectsOutput(scaleEffects, type).count;
            if (count === 0) {
                this._removeEffectValueFromScale(scaleEffects, type);
                this.updateAppliedEffects();
            }
        };
        LayerEffectModalViewModel.prototype._checkAllTypesScaleEffectsValues = function (scaleEffects) {
            var _this = this;
            this.selectedLayer.effect = scaleEffects;
            LayerEffectConfigAssets_1.effectTypes.forEach(function (type) {
                var _a = _this._checkScaleEffectsOutput(scaleEffects, type), count = _a.count, hasType = _a.hasType;
                if (count === 0 && hasType) {
                    _this._removeEffectValueFromScale(scaleEffects, type);
                }
            });
            this.updateAppliedEffects();
        };
        LayerEffectModalViewModel.prototype._removeEffectValueFromScale = function (scaleEffects, type) {
            var _this = this;
            var _a;
            var tmpScaleEffects = scaleEffects.map(function (_a) {
                var scale = _a.scale, value = _a.value;
                var effects = value.replace(/\) /g, ");").split(";");
                var i = effects.findIndex(function (eff) { return eff.includes(type); });
                if (i > -1) {
                    effects.splice(i, 1);
                    return {
                        scale: scale,
                        value: effects.join(" ")
                    };
                }
            });
            (_a = this._layersEffects[this.selectedLayer.id]) === null || _a === void 0 ? true : delete _a[type];
            this.selectedLayer.effect = tmpScaleEffects;
            tmpScaleEffects.forEach(function (_a) {
                var scale = _a.scale, value = _a.value;
                _this.scaleEffects[scale] = value;
            });
        };
        LayerEffectModalViewModel.prototype._checkScaleEffectsOutput = function (scaleEffects, type) {
            var _this = this;
            var count = 0;
            var hasType;
            scaleEffects.forEach(function (_a) {
                var value = _a.value;
                var effects = value.replace(/\) /g, ");").split(";");
                var i = effects.findIndex(function (eff) { return eff.includes(type); });
                if (i > -1) {
                    hasType = true;
                    if (_this._checkOutputForValue(effects[i])) {
                        count++;
                    }
                }
            });
            return { count: count, hasType: hasType };
        };
        LayerEffectModalViewModel.prototype._colorToString = function (rgb) {
            return "rgba(" + (rgb[0] || 0) + ", " + (rgb[1] || 0) + ", " + (rgb[2] || 0) + ", " + (rgb[3] / 255 || 0) + ")";
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "effects", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "scaleEffectsOn", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "scale", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "scales", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "scaleEffects", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "appliedEffects", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "effectsAccordion", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "blendModeSelect", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "isConfirmed", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "isEditing", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "scaleEffectSwitch", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerEffectModalViewModel.prototype, "configRestriction", void 0);
        LayerEffectModalViewModel = tslib_1.__decorate([
            decorators_1.subclass("LayerEffectModalViewModel")
        ], LayerEffectModalViewModel);
        return LayerEffectModalViewModel;
    }(Accessor_1.default));
    exports.default = LayerEffectModalViewModel;
});
