/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.​
*/
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/Graphic", "esri/core/Handles", "esri/symbols", "../utilites/geometryUtils", "../utilites/lookupLayerUtils", "esri/Color", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer"], function (require, exports, decorators_1, Accessor_1, Graphic_1, Handles_1, symbols_1, geometryUtils_1, lookupLayerUtils_1, Color_1, FeatureLayer_1, GraphicsLayer_1) {
    "use strict";
    Accessor_1 = __importDefault(Accessor_1);
    Graphic_1 = __importDefault(Graphic_1);
    Handles_1 = __importDefault(Handles_1);
    Color_1 = __importDefault(Color_1);
    FeatureLayer_1 = __importDefault(FeatureLayer_1);
    GraphicsLayer_1 = __importDefault(GraphicsLayer_1);
    var LookupGraphics = /** @class */ (function (_super) {
        __extends(LookupGraphics, _super);
        function LookupGraphics(props) {
            var _this = _super.call(this, props) || this;
            _this.view = null;
            _this.graphic = null;
            _this.searchWidget = null;
            // Graphic colors 
            _this._lightColor = "#595959";
            _this._darkColor = "#fff";
            // Graphics created and managed by this class 
            _this._graphicMarker = null;
            _this._graphicLabel = null;
            _this._theme = null;
            _this._handles = null;
            _this._geometry = null;
            _this._graphicLayer = null;
            _this._handles = new Handles_1.default();
            return _this;
        }
        LookupGraphics.prototype.initialize = function () {
            this._graphicLayer = new GraphicsLayer_1.default();
            this.view.map.add(this._graphicLayer);
        };
        LookupGraphics.prototype.updateGraphics = function (propName, enabled) {
            if (this.graphic) {
                if (propName === "mapPinSize" || propName === "mapPinLabel" || propName == "mapPinLabelColor" || propName === "mapPinLabelSize") {
                    this._createGraphicLabel();
                }
                if (propName === "mapPinIcon" || propName === "mapPinSize" || propName === "mapPin" || propName === "mapPinColor") {
                    this._createGraphicMarker();
                }
            }
        };
        LookupGraphics.prototype._createGraphicMarker = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, mapPinColor, mapPin, color;
                return __generator(this, function (_b) {
                    if (this._graphicMarker) {
                        // remove the existing graphic
                        this._graphicLayer.remove(this._graphicMarker);
                    }
                    _a = this.config, mapPinColor = _a.mapPinColor, mapPin = _a.mapPin;
                    if (!mapPin)
                        return [2 /*return*/];
                    color = mapPinColor ? Color_1.default.fromHex(mapPinColor) : this._theme;
                    // create the graphic 
                    if (this === null || this === void 0 ? void 0 : this.graphic) {
                        this._graphicMarker = new Graphic_1.default({
                            geometry: this.graphic.geometry,
                            symbol: new symbols_1.CIMSymbol({
                                data: {
                                    type: "CIMSymbolReference",
                                    symbol: (0, lookupLayerUtils_1.getSymbol)(this.config, color)
                                }
                            })
                        });
                        this._graphicLayer.add(this._graphicMarker);
                    }
                    return [2 /*return*/];
                });
            });
        };
        LookupGraphics.prototype._createGraphicLabel = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, mapPinLabel, mapPinLabelColor, mapPinLabelSize, mapPinSize, color, address, yoffset;
                return __generator(this, function (_b) {
                    if (this._graphicLabel) {
                        // remove existing then create new
                        this._graphicLayer.remove(this._graphicLabel);
                    }
                    _a = this.config, mapPinLabel = _a.mapPinLabel, mapPinLabelColor = _a.mapPinLabelColor, mapPinLabelSize = _a.mapPinLabelSize, mapPinSize = _a.mapPinSize;
                    if (!mapPinLabel)
                        return [2 /*return*/];
                    color = mapPinLabelColor ? mapPinLabelColor : this._theme;
                    address = this._getAddressText();
                    yoffset = mapPinSize ? "-".concat(mapPinSize / 1.5, "px") : "-".concat(mapPinLabelSize / 1.5, "px");
                    this._graphicLabel = new Graphic_1.default({
                        geometry: this.graphic.geometry,
                        symbol: new symbols_1.TextSymbol({
                            font: {
                                size: mapPinLabelSize
                            },
                            text: address,
                            haloColor: this._theme.toHex() === this._lightColor ? this._darkColor : this._lightColor,
                            haloSize: "1px",
                            color: color,
                            horizontalAlignment: 'center',
                            verticalAlignment: "top",
                            yoffset: yoffset
                        })
                    });
                    this._graphicLayer.add(this._graphicLabel);
                    return [2 /*return*/];
                });
            });
        };
        LookupGraphics.prototype._showGraphics = function () {
            var _a;
            // add graphics if this wasn't a map button click 
            var addGraphics = true;
            var button = document.getElementById("mapSearchButton");
            if ((_a = button === null || button === void 0 ? void 0 : button.classList) === null || _a === void 0 ? void 0 : _a.contains("hide")) {
                addGraphics = false;
            }
            return addGraphics;
        };
        LookupGraphics.prototype._getAddressText = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            // Everytime the graphic changes let's get the address text if 
            // include address text is enabled. 
            var address = null;
            if ((_b = (_a = this.graphic) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.Match_addr) {
                // replace first comma with a new line character
                address = this.graphic.attributes.Match_addr.replace(',', '\n');
            }
            else if ((_d = (_c = this.graphic) === null || _c === void 0 ? void 0 : _c.attributes) === null || _d === void 0 ? void 0 : _d.name) {
                address = this.graphic.attributes.name;
            }
            else if (this === null || this === void 0 ? void 0 : this.searchWidget) {
                address = this === null || this === void 0 ? void 0 : this.searchWidget.searchTerm;
            }
            else if (((_e = this.graphic) === null || _e === void 0 ? void 0 : _e.layer) instanceof FeatureLayer_1.default) {
                if (this.graphic.layer.displayField !== null) {
                    address = (_f = this.graphic.attributes[this.graphic.layer.displayField]) !== null && _f !== void 0 ? _f : null;
                }
                else {
                    // get the first string field
                    this.graphic.layer.fields.some(function (field) {
                        if (field.type === 'string') {
                            address = _this.graphic.attributes[field.name];
                            return true;
                        }
                    });
                }
            }
            return address;
        };
        LookupGraphics.prototype._updateTheme = function () {
            return __awaiter(this, void 0, void 0, function () {
                var theme;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, geometryUtils_1.getBasemapTheme)(this.view)];
                        case 1:
                            theme = _a.sent();
                            this._theme = (theme === "light") ? new Color_1.default(this._lightColor) : new Color_1.default(this._darkColor);
                            return [2 /*return*/];
                    }
                });
            });
        };
        LookupGraphics.prototype.addGraphicsAndZoom = function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return __awaiter(this, void 0, void 0, function () {
                var results, feature, clickGraphic;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            if (!!this._theme) return [3 /*break*/, 2];
                            return [4 /*yield*/, this._updateTheme()];
                        case 1:
                            _k.sent();
                            _k.label = 2;
                        case 2:
                            if (this._showGraphics()) {
                                // If its a polygon use search result instead. 
                                if (((_b = (_a = this === null || this === void 0 ? void 0 : this.graphic) === null || _a === void 0 ? void 0 : _a.geometry) === null || _b === void 0 ? void 0 : _b.type) === "polygon") {
                                    if (((_d = (_c = this === null || this === void 0 ? void 0 : this.searchWidget) === null || _c === void 0 ? void 0 : _c.results) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                                        results = this.searchWidget.results[0];
                                        feature = null;
                                        if (((_e = results === null || results === void 0 ? void 0 : results.results) === null || _e === void 0 ? void 0 : _e.length) > 0) {
                                            feature = ((_f = results === null || results === void 0 ? void 0 : results.results[0]) === null || _f === void 0 ? void 0 : _f.feature) || null;
                                        }
                                        if (((_g = feature === null || feature === void 0 ? void 0 : feature.geometry) === null || _g === void 0 ? void 0 : _g.type) === "point" && ((_h = feature === null || feature === void 0 ? void 0 : feature.attributes) === null || _h === void 0 ? void 0 : _h.Match_addr)) {
                                            this.graphic = feature;
                                        }
                                    }
                                    else {
                                        clickGraphic = this.graphic;
                                        if (((_j = clickGraphic === null || clickGraphic === void 0 ? void 0 : clickGraphic.clickLocation) === null || _j === void 0 ? void 0 : _j.type) === "point") {
                                            this.graphic = new Graphic_1.default({ geometry: clickGraphic.clickLocation });
                                        }
                                    }
                                }
                                this._createGraphicLabel();
                                this._createGraphicMarker();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        LookupGraphics.prototype.clearGraphics = function () {
            var _a;
            // remove all added graphics 
            (_a = this._graphicLayer) === null || _a === void 0 ? void 0 : _a.removeAll();
            this._graphicLabel = null;
            this._graphicMarker = null;
            this.graphic = null;
        };
        __decorate([
            (0, decorators_1.property)()
        ], LookupGraphics.prototype, "config", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], LookupGraphics.prototype, "view", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], LookupGraphics.prototype, "graphic", void 0);
        __decorate([
            (0, decorators_1.property)()
        ], LookupGraphics.prototype, "searchWidget", void 0);
        LookupGraphics = __decorate([
            (0, decorators_1.subclass)('LookupGraphics')
        ], LookupGraphics);
        return LookupGraphics;
    }((Accessor_1.default)));
    return LookupGraphics;
});
