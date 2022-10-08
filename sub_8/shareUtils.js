var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/geometry/Point", "esri/request", "esri/geometry/projection", "esri/geometry/SpatialReference"], function (require, exports, Accessor, decorators_1, Point, esriRequest, projection, SpatialReference) {
    "use strict";
    //----------------------------------
    //
    //  Shorten URL API
    //
    //----------------------------------
    var SHORTEN_API = "https://arcg.is/prod/shorten";
    var ShareUtils = /** @class */ (function (_super) {
        __extends(ShareUtils, _super);
        //----------------------------------
        //
        //  Lifecycle
        //
        //----------------------------------
        function ShareUtils(params) {
            var _this = _super.call(this, params) || this;
            _this.highlight = null;
            //----------------------------------
            //
            //  view
            //
            //----------------------------------
            _this.view = null;
            //----------------------------------
            //
            //  shareUrl - readOnly
            //
            //----------------------------------
            _this.shareUrl = null;
            _this.selected = null;
            return _this;
        }
        ShareUtils.prototype.destroy = function () {
            this.view = null;
        };
        //----------------------------------
        //
        //  Public Methods
        //
        //----------------------------------
        ShareUtils.prototype.generateUrl = function (selected) {
            return __awaiter(this, void 0, void 0, function () {
                var url, shortenedUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.selected = selected;
                            return [4 /*yield*/, this._generateShareUrl()];
                        case 1:
                            url = _a.sent();
                            return [4 /*yield*/, this._shorten(url)];
                        case 2:
                            shortenedUrl = _a.sent();
                            this._set("shareUrl", shortenedUrl);
                            return [2 /*return*/, shortenedUrl];
                    }
                });
            });
        };
        //----------------------------------
        //
        //  Private Methods
        //
        //----------------------------------
        ShareUtils.prototype._generateShareUrl = function () {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var href, _b, x, y, spatialReference, centerPoint, point, layer;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            href = window.location.href;
                            // If view is not ready
                            if (!this.get("view.ready")) {
                                return [2 /*return*/, href];
                            }
                            _b = this.view.center, x = _b.x, y = _b.y;
                            spatialReference = this.view.spatialReference;
                            centerPoint = new Point({
                                x: x,
                                y: y,
                                spatialReference: spatialReference
                            });
                            return [4 /*yield*/, this._processPoint(centerPoint)];
                        case 1:
                            point = _c.sent();
                            layer = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.layer;
                            if (layer) {
                                this.highlight = "".concat(layer.id).concat(this.selected.attributes[layer.objectIdField]);
                            }
                            return [2 /*return*/, this._generateShareUrlParams(point)];
                    }
                });
            });
        };
        ShareUtils.prototype._processPoint = function (point) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, isWGS84, isWebMercator, outputSpatialReference, projectedPoint;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = point.spatialReference, isWGS84 = _a.isWGS84, isWebMercator = _a.isWebMercator;
                            // If spatial reference is WGS84 or Web Mercator, use longitude/latitude values to generate the share URL parameters
                            if (isWGS84 || isWebMercator) {
                                return [2 /*return*/, point];
                            }
                            outputSpatialReference = new SpatialReference({
                                wkid: 4326
                            });
                            return [4 /*yield*/, projection.load()];
                        case 1:
                            _b.sent();
                            projectedPoint = projection.project(point, outputSpatialReference);
                            return [2 /*return*/, projectedPoint];
                    }
                });
            });
        };
        ShareUtils.prototype._generateShareUrlParams = function (point) {
            var href = window.location.href;
            var longitude = point.longitude, latitude = point.latitude;
            if (longitude === undefined || latitude === undefined) {
                return href;
            }
            var roundedLon = this._roundValue(longitude);
            var roundedLat = this._roundValue(latitude);
            var zoom = this.view.zoom;
            var roundedZoom = this._roundValue(zoom);
            var path = href.split("center")[0];
            // If no "?", then append "?". Otherwise, check for "?" and "="
            var sep = path.indexOf("?") === -1
                ? "?"
                : path.indexOf("?") !== -1 && path.indexOf("=") !== -1
                    ? "&"
                    : "";
            var shareParams = "".concat(path).concat(sep, "select=").concat(this.highlight, "&center=").concat(roundedLon, ",").concat(roundedLat, "&level=").concat(roundedZoom);
            // Otherwise, just return original url parameters for 2D
            return shareParams;
        };
        ShareUtils.prototype._shorten = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                var request, shortUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, esriRequest(SHORTEN_API, {
                                query: {
                                    longUrl: url,
                                    f: "json"
                                }
                            })];
                        case 1:
                            request = _a.sent();
                            shortUrl = request.data && request.data.data && request.data.data.url;
                            if (shortUrl) {
                                return [2 /*return*/, shortUrl];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        ShareUtils.prototype._roundValue = function (val) {
            return parseFloat(val.toFixed(4));
        };
        __decorate([
            (0, decorators_1.property)()
        ], ShareUtils.prototype, "highlight", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], ShareUtils.prototype, "view", void 0);
        __decorate([
            (0, decorators_1.property)({ readOnly: true })
        ], ShareUtils.prototype, "shareUrl", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], ShareUtils.prototype, "selected", void 0);
        ShareUtils = __decorate([
            (0, decorators_1.subclass)("ShareUtils")
        ], ShareUtils);
        return ShareUtils;
    }((Accessor)));
    return ShareUtils;
});
