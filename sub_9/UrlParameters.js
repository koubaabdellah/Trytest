define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "../utils/url/urlUtils"], function (require, exports, tslib_1, decorators_1, Accessor, urlUtils) {
    "use strict";
    var UrlParameters = (function (_super) {
        tslib_1.__extends(UrlParameters, _super);
        function UrlParameters(obj) {
            var _this = _super.call(this, obj) || this;
            var parameterHashMap = urlUtils.urlParams(window.location.search);
            _this._readParametersFromHashMap(parameterHashMap);
            return _this;
        }
        UrlParameters_1 = UrlParameters;
        Object.defineProperty(UrlParameters.prototype, "noUrlParams", {
            get: function () {
                return ((this.layers == null || this.layers.length === 0) &&
                    this.webmap == null &&
                    this.url === null);
            },
            enumerable: false,
            configurable: true
        });
        UrlParameters.prototype._readParametersFromHashMap = function (parameterHashMap) {
            this._set("layers", UrlParameters_1._parseList(parameterHashMap["layers"]));
            this._set("url", parameterHashMap["url"]);
            this._set("webmap", parameterHashMap["webmap"]);
            this._set("extent", parameterHashMap["extent"]);
            this._set("extentService", parameterHashMap["extentService"]);
            this._set("basemapUrl", parameterHashMap["basemapUrl"]);
            this._set("url", parameterHashMap["url"]);
            this._set("urls", parameterHashMap["urls"]);
            this._set("isViz", parameterHashMap["isViz"]);
            this._set("center", parameterHashMap["center"]);
            this._set("level", parameterHashMap["level"]);
            this._set("basemapReferenceUrl", parameterHashMap["basemapReferenceUrl"]);
            this._set("find", parameterHashMap["find"]);
            this._set("marker", parameterHashMap["marker"]);
            this._set("layerId", UrlParameters_1._parseNumber(parameterHashMap["layerId"]));
            this._set("detached", UrlParameters_1._parseBoolean(parameterHashMap["detached"]));
        };
        UrlParameters._parseBoolean = function (paramString) {
            if (paramString === "true") {
                return true;
            }
            else if (paramString === "false") {
                return false;
            }
            return null;
        };
        UrlParameters._parseNumber = function (paramString) {
            var result = parseFloat(paramString);
            return !isNaN(result) ? result : null;
        };
        UrlParameters._parseList = function (paramString) {
            if (typeof paramString === "string") {
                var list = paramString.split(",").filter(function (s) { return s.length > 0; });
                if (list.length > 0) {
                    return list;
                }
            }
            return null;
        };
        var UrlParameters_1;
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "layers", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "url", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "webmap", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "extent", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "extentService", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "basemapUrl", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "urls", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "isViz", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "center", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "level", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "basemapReferenceUrl", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "find", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "marker", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "layerId", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], UrlParameters.prototype, "detached", void 0);
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true, dependsOn: ["layers", "webmap"] })
        ], UrlParameters.prototype, "noUrlParams", null);
        UrlParameters = UrlParameters_1 = tslib_1.__decorate([
            decorators_1.subclass("webSceneViewer.support.UrlParameters")
        ], UrlParameters);
        return UrlParameters;
    }(Accessor));
    return UrlParameters;
});
