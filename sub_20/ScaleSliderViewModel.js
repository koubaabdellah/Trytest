define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "./ScaleRanges", "esri/widgets/Slider/SliderViewModel", "esri/core/Handles"], function (require, exports, tslib_1, Accessor, decorators_1, ScaleRanges, SliderViewModel, Handles) {
    "use strict";
    var ScaleSliderViewModel = (function (_super) {
        tslib_1.__extends(ScaleSliderViewModel, _super);
        function ScaleSliderViewModel(properties) {
            var _this = _super.call(this, properties) || this;
            _this.scaleRanges = ScaleRanges.fromScaleRange({ minScale: 0, maxScale: 0 });
            _this.sliderViewModel = (function () {
                var max = _this._getSliderIndexRange(_this.scaleRanges.length - 1).max;
                return new SliderViewModel({
                    precision: 10,
                    min: 0,
                    max: max,
                    values: [max / 2]
                });
            })();
            _this.handles = new Handles();
            return _this;
        }
        ScaleSliderViewModel.prototype.initialize = function () {
            this.handles.add([]);
        };
        Object.defineProperty(ScaleSliderViewModel.prototype, "maxScale", {
            get: function () {
                var maxScale = this.mapSliderToScale(this.sliderViewModel.values[0]);
                return Math.round(this._handleEdgeScale("max", maxScale));
            },
            set: function (value) {
                this._setMaxScaleOnSlider(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleSliderViewModel.prototype, "maxScaleLimit", {
            get: function () {
                return this.mapSliderToScale(this.sliderViewModel.max);
            },
            set: function (value) {
                this._setSliderRange({ maxScale: value, minScale: this.minScaleLimit });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleSliderViewModel.prototype, "minScale", {
            get: function () {
                var minScale = this.mapSliderToScale(this.sliderViewModel.values[0]);
                return Math.round(this._handleEdgeScale("min", minScale));
            },
            set: function (value) {
                this._setMinScaleOnSlider(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleSliderViewModel.prototype, "minScaleLimit", {
            get: function () {
                return this.mapSliderToScale(this.sliderViewModel.min);
            },
            set: function (value) {
                this._setSliderRange({ maxScale: this.maxScaleLimit, minScale: value });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleSliderViewModel.prototype, "view", {
            set: function (value) {
                this._set("view", value);
            },
            enumerable: false,
            configurable: true
        });
        ScaleSliderViewModel.prototype.mapScaleToSlider = function (scale) {
            var sliderValue = this.scaleRanges.scaleToRangeIndex(scale);
            var range = this.scaleRanges.findScaleRangeByIndex(sliderValue);
            var maxScale = range.maxScale, minScale = range.minScale;
            var _a = this._getSliderIndexRange(sliderValue), max = _a.max, min = _a.min;
            return this._mapToRange(scale, minScale, maxScale, min, max);
        };
        ScaleSliderViewModel.prototype.mapSliderToScale = function (value) {
            var range = this.scaleRanges.findScaleRangeByIndex(value);
            var maxScale = range.maxScale, minScale = range.minScale;
            var _a = this._getSliderIndexRange(value), max = _a.max, min = _a.min;
            return this._mapToRange(value, min, max, minScale, maxScale);
        };
        ScaleSliderViewModel.prototype._setSliderRange = function (scaleRange) {
            this.scaleRanges = ScaleRanges.fromScaleRange(scaleRange);
            var max = this._getSliderIndexRange(this.scaleRanges.length - 1).max;
            this.sliderViewModel.max = max;
            this.sliderViewModel.min = 0;
            this.notifyChange("maxScaleLimit");
            this.notifyChange("minScaleLimit");
        };
        ScaleSliderViewModel.prototype._getSliderIndexRange = function (sliderValue) {
            var min = Math.floor(sliderValue);
            var max = min + 0.99999;
            return {
                min: min,
                max: max
            };
        };
        ScaleSliderViewModel.prototype._mapToRange = function (valueA, rangeAMin, rangeAMax, rangeBMin, rangeBMax) {
            return rangeBMin + ((valueA - rangeAMin) * (rangeBMax - rangeBMin)) / (rangeAMax - rangeAMin);
        };
        ScaleSliderViewModel.prototype._setMaxScaleOnSlider = function (maxScale) {
            var _a = this, scaleRanges = _a.scaleRanges, sliderViewModel = _a.sliderViewModel;
            if (maxScale !== undefined) {
                var maxVal = this.mapScaleToSlider(this._constrainMaxScaleToLayer(scaleRanges.clampMaxScale(maxScale)));
                sliderViewModel.values = [maxVal];
            }
        };
        ScaleSliderViewModel.prototype._setMinScaleOnSlider = function (minScale) {
            var _a = this, scaleRanges = _a.scaleRanges, sliderViewModel = _a.sliderViewModel;
            if (minScale !== undefined) {
                var minVal = this.mapScaleToSlider(this._constrainMinScaleToLayer(scaleRanges.clampMinScale(minScale)));
                sliderViewModel.values = [minVal];
            }
        };
        ScaleSliderViewModel.prototype._constrainMinScaleToLayer = function (minScale) {
            var scaleRanges = this.scaleRanges;
            if (this._hasTiledLayer()) {
                var firstRange = scaleRanges.firstRange;
                var layerMinScale = this._getTiledLayerMinScale();
                var edgeThreshold = 0.85;
                var nearEdge = this._mapToRange(minScale, firstRange.maxScale, firstRange.minScale, 0, 1) > edgeThreshold;
                if (nearEdge) {
                    minScale = layerMinScale;
                }
                else {
                    minScale = minScale > layerMinScale ? layerMinScale : minScale;
                }
            }
            return minScale;
        };
        ScaleSliderViewModel.prototype._constrainMaxScaleToLayer = function (maxScale) {
            if (this._hasTiledLayer()) {
                var layerMaxScale = this._getTiledLayerMaxScale();
                maxScale = maxScale < layerMaxScale ? layerMaxScale : maxScale;
            }
            return maxScale;
        };
        ScaleSliderViewModel.prototype._handleEdgeScale = function (type, scale) {
            var scalePropName = type === "max" ? "maxScale" : "minScale";
            return scale;
        };
        ScaleSliderViewModel.prototype._getLayerLODS = function () {
            return this.get("layer.tileInfo.lods");
        };
        ScaleSliderViewModel.prototype._getTiledLayerMinScale = function () {
            var lods = this._getLayerLODS();
            return this.scaleRanges.clampMinScale(lods[0].scale);
        };
        ScaleSliderViewModel.prototype._getTiledLayerMaxScale = function () {
            var lods = this._getLayerLODS();
            return lods[lods.length - 1].scale;
        };
        ScaleSliderViewModel.prototype._hasTiledLayer = function () {
            return !!this._getLayerLODS();
        };
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["sliderViewModel.values"]
            })
        ], ScaleSliderViewModel.prototype, "maxScale", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["sliderViewModel.max"]
            })
        ], ScaleSliderViewModel.prototype, "maxScaleLimit", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["sliderViewModel.values"]
            })
        ], ScaleSliderViewModel.prototype, "minScale", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["sliderViewModel.min"]
            })
        ], ScaleSliderViewModel.prototype, "minScaleLimit", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderViewModel.prototype, "scaleRanges", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderViewModel.prototype, "sliderViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleSliderViewModel.prototype, "view", null);
        ScaleSliderViewModel = tslib_1.__decorate([
            decorators_1.subclass("ScaleSliderViewModel")
        ], ScaleSliderViewModel);
        return ScaleSliderViewModel;
    }(Accessor));
    return ScaleSliderViewModel;
});
