define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "../../../widgets/Tips/TipItem"], function (require, exports, tslib_1, decorators_1, Accessor_1, TipItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    TipItem_1 = tslib_1.__importDefault(TipItem_1);
    var LayerListConfigViewModel = (function (_super) {
        tslib_1.__extends(LayerListConfigViewModel, _super);
        function LayerListConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.outputJSON = {};
            _this._allSupportedLayerTypes = [
                "feature",
                "imagery",
                "imagery-tile",
                "map-image",
                "tile",
                "web-tile",
                "wmts"
            ];
            return _this;
        }
        LayerListConfigViewModel.prototype.initLayerListConfig = function () {
            var _this = this;
            var _a;
            if (this.supportedLayerTypes === "*") {
                this.supportedLayerTypes = this._allSupportedLayerTypes;
            }
            this.layers = [];
            this.config = null;
            (_a = this.map.allLayers) === null || _a === void 0 ? void 0 : _a.forEach(function (layer) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
                if (_this.supportedLayerTypes.includes(layer.type)) {
                    var id = layer.id;
                    _this.layers.push({
                        id: id,
                        title: layer.title,
                        content: (_c = (_b = (_a = _this.input) === null || _a === void 0 ? void 0 : _a[id]) === null || _b === void 0 ? void 0 : _b.content) !== null && _c !== void 0 ? _c : null,
                        addContent: (_f = (_e = (_d = _this.input) === null || _d === void 0 ? void 0 : _d[id]) === null || _e === void 0 ? void 0 : _e.addContent) !== null && _f !== void 0 ? _f : false,
                        addTable: (_j = (_h = (_g = _this.input) === null || _g === void 0 ? void 0 : _g[id]) === null || _h === void 0 ? void 0 : _h.addTable) !== null && _j !== void 0 ? _j : false,
                        addLegend: (_m = (_l = (_k = _this.input) === null || _k === void 0 ? void 0 : _k[id]) === null || _l === void 0 ? void 0 : _l.addLegend) !== null && _m !== void 0 ? _m : false,
                        addZoom: (_q = (_p = (_o = _this.input) === null || _o === void 0 ? void 0 : _o[id]) === null || _p === void 0 ? void 0 : _p.addZoom) !== null && _q !== void 0 ? _q : false
                    });
                }
            });
            if (this.layers && this.layers.length) {
                this.config = this.layers[0];
                this.setEditorData(this.layers[0].id);
            }
        };
        LayerListConfigViewModel.prototype.createTipItem = function (fieldName, tip) {
            return new TipItem_1.default({
                id: "tooltip-icon-" + fieldName,
                fieldName: fieldName,
                tip: tip,
                configPanelViewModel: this.configPanelViewModel
            });
        };
        LayerListConfigViewModel.prototype.generateOutput = function () {
            var _a;
            var tmpConfig = tslib_1.__assign({}, this.config);
            tmpConfig === null || tmpConfig === void 0 ? true : delete tmpConfig.id;
            tmpConfig === null || tmpConfig === void 0 ? true : delete tmpConfig.title;
            var newOutput = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this.input), this.outputJSON), (_a = {}, _a[this._selectedLayerId] = tmpConfig, _a));
            this.set("outputJSON", newOutput);
        };
        LayerListConfigViewModel.prototype.setEditorData = function (layerId) {
            var _a;
            this._selectedLayerId = layerId;
            if (this.textEditor) {
                this.textEditor.editorData = ((_a = this.config) === null || _a === void 0 ? void 0 : _a.content) ? this.config.content : "";
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "textEditor", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "layers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "sections", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "supportedLayerTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerListConfigViewModel.prototype, "config", void 0);
        LayerListConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("LayerListConfigViewModel")
        ], LayerListConfigViewModel);
        return LayerListConfigViewModel;
    }(Accessor_1.default));
    exports.default = LayerListConfigViewModel;
});
