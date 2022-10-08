define(["require", "exports", "tslib", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/geometry/Polygon", "esri/symbols/SimpleFillSymbol", "esri/geometry/support/webMercatorUtils", "esri/geometry/SpatialReference", "esri/geometry/geometryEngine", "esri/core/accessorSupport/decorators"], function (require, exports, tslib_1, Graphic, GraphicsLayer, Polygon, SimpleFillSymbol, webMercUtils, SpatialReference, geometryEngine, decorators_1) {
    "use strict";
    var MaskLayer = (function (_super) {
        tslib_1.__extends(MaskLayer, _super);
        function MaskLayer(args) {
            var _this = _super.call(this, args) || this;
            _this._outerRing = [
                [180, -90],
                [-180, -90],
                [-180, 90],
                [180, 90],
                [180, -90],
            ];
            _this._outerPoly = new Polygon({ rings: _this._outerRing });
            _this._maskSymbol = new SimpleFillSymbol({
                color: [0, 0, 0, 0.5],
                outline: {
                    color: [128, 128, 128, 0.5],
                    width: '0px',
                },
            });
            return _this;
        }
        MaskLayer.prototype.hide = function () {
            this.visible = false;
        };
        MaskLayer.prototype.show = function () {
            this.visible = true;
        };
        MaskLayer.prototype.add = function (geom) {
            var graphicResult = this._buildMaskGraphic(geom);
            this.graphics.add(graphicResult);
            return graphicResult;
        };
        MaskLayer.prototype.update = function (geom, index) {
            if (!index) {
                this.clear();
            }
            else {
                this.remove(null, index);
            }
            var graphicResult = this._buildMaskGraphic(geom);
            this.graphics.add(graphicResult);
            return graphicResult;
        };
        MaskLayer.prototype.clear = function () {
            this.graphics.removeAll();
        };
        MaskLayer.prototype.remove = function (g, i) {
            if (!g && !i) {
                return;
            }
            if (i && !g) {
                g = this.graphics[i] ? this.graphics[i] : null;
            }
            if (!g) {
                return;
            }
            _super.prototype.remove.call(this, g);
        };
        MaskLayer.prototype._buildMaskGraphic = function (geom) {
            geom = this._toWGS84(geom);
            var poly = geometryEngine.difference(this._outerPoly, geom);
            return new Graphic({ geometry: poly, symbol: this._maskSymbol });
        };
        MaskLayer.prototype._toWGS84 = function (d) {
            var sr = new SpatialReference({ wkid: 4326 });
            return webMercUtils.canProject(d, sr) ? webMercUtils.project(d, sr) : d;
        };
        MaskLayer = tslib_1.__decorate([
            decorators_1.subclass('maskLayer')
        ], MaskLayer);
        return MaskLayer;
    }(GraphicsLayer));
    return MaskLayer;
});
