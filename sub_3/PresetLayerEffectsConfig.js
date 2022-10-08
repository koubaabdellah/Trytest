define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/WebMap", "esri/views/MapView", "esri/core/Handles", "esri/core/watchUtils", "esri/views/support/colorUtils", "../BaseComponent", "../../widgets/Tips/TipItem", "../../utils/labelSettingMargin"], function (require, exports, tslib_1, decorators_1, widget_1, WebMap, MapView, Handles, watchUtils_1, colorUtils_1, BaseComponent, TipItem, labelSettingMargin_1) {
    "use strict";
    var CSS = {
        base: "preset-layer-effects-config",
        label: "esri-config-panel__config-setting-label",
        presetListLabel: "preset-layer-effects-config__list-label",
        presetContainer: "preset-layer-effects-config__container"
    };
    var PresetLayerEffectsConfig = (function (_super) {
        tslib_1.__extends(PresetLayerEffectsConfig, _super);
        function PresetLayerEffectsConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.isWebMap = false;
            _this.configMessages = null;
            _this._handles = new Handles();
            _this._opened = false;
            return _this;
        }
        PresetLayerEffectsConfig.prototype.postInitialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    if (!this.selectedEffect) {
                        this.selectedEffect = {
                            id: "lift-1",
                            data: {
                                includedEffect: "drop-shadow(4px, 4px, 4px, #000000)",
                                excludedEffect: ""
                            }
                        };
                    }
                    if (!this.tipItem) {
                        this.tipItem = new TipItem({
                            id: "tooltip-icon-preset-layer-effects",
                            fieldName: "preset-layer-effects",
                            tip: this.configMessages.presetLayerEffects.tip,
                            configPanelViewModel: this.configPanelViewModel
                        });
                    }
                    this._createLists();
                    this.own(watchUtils_1.when(this.configPanelViewModel, "map", function () {
                        var _a, _b, _c;
                        _this.isWebMap =
                            ((_c = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.portalItem) === null || _c === void 0 ? void 0 : _c.type) === "Web Map";
                        _this._initView();
                    }));
                    return [2];
                });
            });
        };
        PresetLayerEffectsConfig.prototype.render = function () {
            var _this = this;
            var _a, _b;
            var selectedOptionLabel = (_a = this._options.find(function (option) { var _a; return option.value.id === ((_a = _this.selectedEffect) === null || _a === void 0 ? void 0 : _a.id); })) === null || _a === void 0 ? void 0 : _a.label;
            return this.isWebMap ? (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("label", { bind: this, onclick: this._preventDefault },
                    widget_1.tsx("span", { bind: this, onclick: this._preventDefault, class: this.classes(CSS.label, labelSettingMargin_1.marginClassNames.labelText) },
                        this.configMessages.presetLayerEffects.label, (_b = this.tipItem) === null || _b === void 0 ? void 0 :
                        _b.renderTipCalciteIcon()),
                    widget_1.tsx("button", { bind: this, id: "preset-layer-effects", onclick: function () {
                            _this._opened = !_this._opened;
                            _this.scheduleRender();
                        } },
                        selectedOptionLabel,
                        this._opened ? (widget_1.tsx("calcite-icon", { icon: "caret-up", scale: "s" })) : (widget_1.tsx("calcite-icon", { icon: "caret-down", scale: "s" }))),
                    widget_1.tsx("calcite-popover", { bind: this, id: "preset-layer-effects-popover", "reference-element": "preset-layer-effects", "disable-pointer": "true", "offset-distance": "0", "auto-close": "true" },
                        widget_1.tsx("div", { class: CSS.presetContainer, onmouseleave: function () {
                                _this._closePopover();
                                _this._opened = false;
                                _this.scheduleRender();
                            } }, this._lists.map(function (list) { return [
                            widget_1.tsx("div", { class: CSS.presetListLabel, onclick: function (e) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                } }, list.label),
                            widget_1.tsx("calcite-value-list", { bind: _this, placement: "auto", onCalciteListChange: _this._handleValueListItem }, list.items.map(function (id) {
                                var _a;
                                var option = _this._options.find(function (option) { return option.value.id === id; });
                                var label = option.label, value = option.value, description = option.description;
                                return (widget_1.tsx("calcite-value-list-item", { bind: _this, key: list.type + "-" + value.id, label: label, value: value, description: description, selected: ((_a = _this.selectedEffect) === null || _a === void 0 ? void 0 : _a.id) === value.id }));
                            }))
                        ]; })))))) : null;
        };
        PresetLayerEffectsConfig.prototype._initView = function () {
            var _this = this;
            this.own(watchUtils_1.when(this.configPanelViewModel.map, "loaded", function () {
                var _a, _b, _c, _d, _e, _f, _g;
                if (((_c = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.portalItem) === null || _c === void 0 ? void 0 : _c.type) === "Web Map") {
                    if (_this.configPanelViewModel.pseudoView.view) {
                        _this.configPanelViewModel.pseudoView.view.map = null;
                        _this.configPanelViewModel.pseudoView.view.destroy();
                        _this.configPanelViewModel.pseudoView.view = null;
                        var node = document.getElementById("pseudoView");
                        node.remove();
                    }
                    var pseudoViewNode = document.createElement("div");
                    var id = "pseudoView";
                    pseudoViewNode.id = id;
                    document.body.appendChild(pseudoViewNode);
                    var map = new WebMap({
                        basemap: (_e = (_d = _this.configPanelViewModel) === null || _d === void 0 ? void 0 : _d.map) === null || _e === void 0 ? void 0 : _e.basemap,
                        initialViewProperties: (_g = (_f = _this.configPanelViewModel) === null || _f === void 0 ? void 0 : _f.map) === null || _g === void 0 ? void 0 : _g.initialViewProperties
                    });
                    var view = new MapView({
                        container: id,
                        map: map
                    });
                    _this.configPanelViewModel.pseudoView.view = view;
                    var mapViewReady_1 = "view-ready";
                    _this._handles.add(watchUtils_1.when(_this.configPanelViewModel.pseudoView.view, "ready", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var updateComplete;
                        var _this = this;
                        return tslib_1.__generator(this, function (_a) {
                            this._handles.remove(mapViewReady_1);
                            updateComplete = "update-complete";
                            this._handles.add(watchUtils_1.whenFalse(this.configPanelViewModel.pseudoView.view, "updating", function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var mapView, backgroundTheme, light, dark;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this._handles.remove(updateComplete);
                                            mapView = this.configPanelViewModel.pseudoView
                                                .view;
                                            return [4, colorUtils_1.getBackgroundColorTheme(mapView)];
                                        case 1:
                                            backgroundTheme = (_a.sent());
                                            this.configPanelViewModel.pseudoView.basemapBackgroundColor = backgroundTheme;
                                            light = this._lists.find(function (listItem) { return listItem.type === "light"; });
                                            dark = this._lists.find(function (listItem) { return listItem.type === "dark"; });
                                            this._lists =
                                                backgroundTheme === "light"
                                                    ? [light, dark]
                                                    : [dark, light];
                                            return [2];
                                    }
                                });
                            }); }), updateComplete);
                            return [2];
                        });
                    }); }), mapViewReady_1);
                }
            }));
        };
        PresetLayerEffectsConfig.prototype._handleValueListItem = function (e) {
            var _a;
            if ((_a = e.detail) === null || _a === void 0 ? void 0 : _a.size) {
                var data = Array.from(e.detail)[e.detail.size - 1][0];
                this.selectedEffect = data;
                this.set("outputJSON", data);
                this._closePopover();
                this._opened = false;
                this.scheduleRender();
            }
        };
        PresetLayerEffectsConfig.prototype._closePopover = function () {
            var popover = document.getElementById("preset-layer-effects-popover");
            if (popover) {
                popover.toggle(false);
            }
        };
        PresetLayerEffectsConfig.prototype._preventDefault = function (e) {
            e.preventDefault();
        };
        PresetLayerEffectsConfig.prototype._createLists = function () {
            this._lists = [
                {
                    type: "light",
                    label: this.configMessages.presetLayerEffects.listLabels.basemaps
                        .lightRec,
                    items: [
                        "lift-4",
                        "lift-1",
                        "lift-2",
                        "lift-3",
                        "muted-blur",
                        "muted-grayscale"
                    ]
                },
                {
                    type: "dark",
                    label: this.configMessages.presetLayerEffects.listLabels.basemaps
                        .darkRec,
                    items: [
                        "bloom-3",
                        "bloom-2",
                        "bloom-1",
                        "muted-blur",
                        "muted-grayscale"
                    ]
                }
            ];
            this._options = [
                {
                    label: this.configMessages.presetLayerEffects.options.lift1.label,
                    description: this.configMessages.presetLayerEffects.options.lift1
                        .description,
                    value: {
                        id: "lift-1",
                        data: {
                            includedEffect: "drop-shadow(4px, 4px, 4px, #000000)",
                            excludedEffect: ""
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.lift2.label,
                    description: this.configMessages.presetLayerEffects.options.lift2
                        .description,
                    value: {
                        id: "lift-2",
                        data: {
                            includedEffect: "drop-shadow(2px, 2px, 6px, rgb(50,50,50))",
                            excludedEffect: "opacity(50%)"
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.lift3.label,
                    description: this.configMessages.presetLayerEffects.options.lift3
                        .description,
                    value: {
                        id: "lift-3",
                        data: {
                            includedEffect: "drop-shadow(2px, 2px, 3px, rgb(50,50,50))",
                            excludedEffect: "blur(3px) opacity(65%)"
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.lift4.label,
                    description: this.configMessages.presetLayerEffects.options.lift4
                        .description,
                    value: {
                        id: "lift-4",
                        data: {
                            includedEffect: "drop-shadow(2px, 2px, 3px, rgb(50,50,50))",
                            excludedEffect: "grayscale(100%) opacity(50%)"
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.bloom1.label,
                    description: this.configMessages.presetLayerEffects.options.bloom1
                        .description,
                    value: {
                        id: "bloom-1",
                        data: {
                            includedEffect: "bloom(1.3, 0.75px, 0.3)",
                            excludedEffect: "opacity(65%)"
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.bloom2.label,
                    description: this.configMessages.presetLayerEffects.options.bloom2
                        .description,
                    value: {
                        id: "bloom-2",
                        data: {
                            includedEffect: "bloom(1.3, 0.75px, 0.3)",
                            excludedEffect: "blur(3px) opacity(65%)"
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.bloom3.label,
                    description: this.configMessages.presetLayerEffects.options.bloom3
                        .description,
                    value: {
                        id: "bloom-3",
                        data: {
                            includedEffect: "bloom(1.3, 0.75px, 0.3)",
                            excludedEffect: "grayscale(100%) opacity(65%)"
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.mutedBlur.label,
                    description: this.configMessages.presetLayerEffects.options.mutedBlur
                        .description,
                    value: {
                        id: "muted-blur",
                        data: {
                            includedEffect: "",
                            excludedEffect: "blur(3px) opacity(50%)"
                        }
                    }
                },
                {
                    label: this.configMessages.presetLayerEffects.options.mutedGrayscale
                        .label,
                    description: this.configMessages.presetLayerEffects.options
                        .mutedGrayscale.description,
                    value: {
                        id: "muted-grayscale",
                        data: {
                            includedEffect: "",
                            excludedEffect: "grayscale(100%) opacity(50%)"
                        }
                    }
                }
            ];
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetLayerEffectsConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetLayerEffectsConfig.prototype, "selectedEffect", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetLayerEffectsConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetLayerEffectsConfig.prototype, "tipItem", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PresetLayerEffectsConfig.prototype, "isWebMap", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/ConfigSettings/resources")
        ], PresetLayerEffectsConfig.prototype, "configMessages", void 0);
        PresetLayerEffectsConfig = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.PresetLayerEffectsConfig")
        ], PresetLayerEffectsConfig);
        return PresetLayerEffectsConfig;
    }(BaseComponent));
    return PresetLayerEffectsConfig;
});
