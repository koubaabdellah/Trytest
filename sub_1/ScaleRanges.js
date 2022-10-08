define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators"], function (require, exports, tslib_1, Accessor, decorators_1) {
    "use strict";
    var upperScaleRangeLimit = 147914382;
    var scaleRangeStops = [
        { id: "room", minScale: 100 },
        { id: "rooms", minScale: 400 },
        { id: "smallBuilding", minScale: 800 },
        { id: "building", minScale: 1999 },
        { id: "buildings", minScale: 3999 },
        { id: "street", minScale: 7499 },
        { id: "streets", minScale: 14999 },
        { id: "neighborhood", minScale: 29999 },
        { id: "town", minScale: 59999 },
        { id: "city", minScale: 119999 },
        { id: "cities", minScale: 249999 },
        { id: "metropolitanArea", minScale: 499999 },
        { id: "county", minScale: 999999 },
        { id: "counties", minScale: 1999999 },
        { id: "stateProvince", minScale: 3999999 },
        { id: "statesProvinces", minScale: 6999999 },
        { id: "countriesSmall", minScale: 14999999 },
        { id: "countriesBig", minScale: 34999999 },
        { id: "continent", minScale: 99999999 },
        { id: "world", minScale: upperScaleRangeLimit }
    ];
    function getScaleRanges(maxScale, minScale) {
        var stops = scaleRangeStops;
        var totalScaleRangeStops = stops.length;
        var scaleRanges = [];
        var minScaleScale;
        var current = maxScale;
        maxScale = maxScale >= 0 ? maxScale : 0;
        minScale = minScale > 0 ? minScale : stops[totalScaleRangeStops - 1].minScale;
        for (var i = 0; i < totalScaleRangeStops; i++) {
            var scale = Math.min(stops[i].minScale, minScale);
            minScaleScale = Math.min(scale, minScale);
            if (maxScale <= scale && current < minScale) {
                scaleRanges.push({
                    id: stops[i].id,
                    maxScale: Math.max(current, maxScale),
                    minScale: minScaleScale
                });
            }
            current = minScaleScale + 1;
        }
        scaleRanges.reverse();
        return ensureValidBoundaryRanges(scaleRanges);
    }
    function ensureValidBoundaryRanges(ranges) {
        if (ranges.length === 0) {
            return ranges;
        }
        var firstRange = ranges[0];
        var lastRange = ranges[ranges.length - 1];
        if (firstRange.minScale === firstRange.maxScale) {
            ranges.shift();
            firstRange.minScale += 1;
        }
        if (lastRange.minScale === lastRange.maxScale) {
            ranges.pop();
            lastRange.maxScale -= 1;
        }
        return ranges;
    }
    var ScaleRanges = (function (_super) {
        tslib_1.__extends(ScaleRanges, _super);
        function ScaleRanges(params) {
            var _this = _super.call(this, params) || this;
            _this.ranges = [];
            return _this;
        }
        ScaleRanges_1 = ScaleRanges;
        ScaleRanges.fromScaleRange = function (_a) {
            var maxScale = _a.maxScale, minScale = _a.minScale;
            return new ScaleRanges_1({
                ranges: getScaleRanges(maxScale, minScale)
            });
        };
        ScaleRanges.fromLayer = function (layer) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var lods, ranges, maxScale, minScale;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, layer.when()];
                        case 1:
                            _a.sent();
                            lods = layer.get("tileInfo.lods");
                            if (!lods) {
                                ranges = getScaleRanges(0, 0);
                            }
                            else {
                                maxScale = lods[lods.length - 1].scale;
                                minScale = lods[0].scale;
                                ranges = getScaleRanges(maxScale, minScale);
                            }
                            return [2, new ScaleRanges_1({ ranges: ranges })];
                    }
                });
            });
        };
        Object.defineProperty(ScaleRanges.prototype, "firstRange", {
            get: function () {
                return this.ranges[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleRanges.prototype, "lastRange", {
            get: function () {
                var ranges = this.ranges;
                return ranges[ranges.length - 1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleRanges.prototype, "length", {
            get: function () {
                return this.ranges.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleRanges.prototype, "maxScale", {
            get: function () {
                return this.lastRange.maxScale;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ScaleRanges.prototype, "minScale", {
            get: function () {
                return this.firstRange.minScale;
            },
            enumerable: false,
            configurable: true
        });
        ScaleRanges.prototype.isMinScaleEdge = function (scale) {
            var firstRange = this.firstRange;
            var minScale = firstRange.minScale;
            var maxScale = ScaleRanges_1.RecommendedScales[firstRange.id] || firstRange.maxScale;
            return scale <= minScale && scale >= maxScale;
        };
        ScaleRanges.prototype.isMaxScaleEdge = function (scale) {
            var lastRange = this.lastRange;
            var maxScale = lastRange.maxScale;
            var minScale = ScaleRanges_1.RecommendedScales[lastRange.id] || lastRange.minScale;
            return scale <= minScale && scale >= maxScale;
        };
        ScaleRanges.prototype.findScaleRange = function (scale) {
            var scaleRanges = this.ranges;
            var scaleRange;
            if (scale >= scaleRanges[0].maxScale) {
                return scaleRanges[0];
            }
            if (scale <= scaleRanges[scaleRanges.length - 1].minScale) {
                return scaleRanges[scaleRanges.length - 1];
            }
            for (var i = 0; i < scaleRanges.length; i++) {
                var range = scaleRanges[i];
                if (scale >= range.maxScale && scale <= range.minScale) {
                    scaleRange = range;
                    break;
                }
            }
            return scaleRange;
        };
        ScaleRanges.prototype.findScaleRangeByIndex = function (index) {
            return this.ranges[this._clampScaleRangeIndex(index)];
        };
        ScaleRanges.prototype.scaleToRangeIndex = function (scale) {
            return this.ranges.indexOf(this.findScaleRange(scale));
        };
        ScaleRanges.prototype.clampScale = function (scale) {
            return Math.min(this.minScale, Math.max(this.maxScale, scale));
        };
        ScaleRanges.prototype.clampMinScale = function (scale) {
            if (scale === 0) {
                return this.minScale;
            }
            return this.clampScale(scale);
        };
        ScaleRanges.prototype.clampMaxScale = function (scale) {
            return this.clampScale(scale);
        };
        ScaleRanges.prototype.contains = function (scale) {
            var scaleRanges = this.ranges;
            var withinRange = false;
            for (var i = 0; i < scaleRanges.length; i++) {
                var _a = scaleRanges[i], maxScale = _a.maxScale, minScale = _a.minScale;
                if (scale >= maxScale && scale <= minScale) {
                    withinRange = true;
                    break;
                }
            }
            return withinRange;
        };
        ScaleRanges.prototype._clampScaleRangeIndex = function (index) {
            var lowerBound = 0;
            if (index <= lowerBound) {
                return lowerBound;
            }
            var upperBound = this.ranges.length - 1;
            if (index > upperBound) {
                return upperBound;
            }
            return Math.floor(index);
        };
        var ScaleRanges_1;
        ScaleRanges.RecommendedScales = Object.freeze({
            world: upperScaleRangeLimit,
            continent: 50000000,
            countriesBig: 25000000,
            countriesSmall: 12000000,
            statesProvinces: 6000000,
            stateProvince: 3000000,
            counties: 1500000,
            county: 750000,
            metropolitanArea: 320000,
            cities: 160000,
            city: 80000,
            town: 40000,
            neighborhood: 20000,
            streets: 10000,
            street: 5000,
            buildings: 2500,
            building: 1250,
            smallBuilding: 800,
            rooms: 400,
            room: 100
        });
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["ranges"]
            })
        ], ScaleRanges.prototype, "firstRange", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["ranges"]
            })
        ], ScaleRanges.prototype, "lastRange", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["ranges"]
            })
        ], ScaleRanges.prototype, "length", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["lastRange"]
            })
        ], ScaleRanges.prototype, "maxScale", null);
        tslib_1.__decorate([
            decorators_1.property({
                dependsOn: ["firstRange"]
            })
        ], ScaleRanges.prototype, "minScale", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], ScaleRanges.prototype, "ranges", void 0);
        ScaleRanges = ScaleRanges_1 = tslib_1.__decorate([
            decorators_1.subclass("esri.widgets.ScaleRangeSlider.ScaleRanges")
        ], ScaleRanges);
        return ScaleRanges;
    }(Accessor));
    return ScaleRanges;
});
