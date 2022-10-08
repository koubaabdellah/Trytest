define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/watchUtils", "esri/core/promiseUtils"], function (require, exports, tslib_1, decorators_1, Accessor, watchUtils_1, promiseUtils_1) {
    "use strict";
    var ItemBrowserPreviewViewModel = (function (_super) {
        tslib_1.__extends(ItemBrowserPreviewViewModel, _super);
        function ItemBrowserPreviewViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.itemBrowserMessages = null;
            return _this;
        }
        ItemBrowserPreviewViewModel.prototype.handleUnsupportedRenderers = function () {
            var error = false;
            var layerError = false;
            this.configPanelViewModel.map.layers.map(function (layer) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                var type = layer === null || layer === void 0 ? void 0 : layer.type;
                if (type === "group") {
                    return;
                }
                if (type !== "feature") {
                    layerError = true;
                    return;
                }
                var featureLayer = layer;
                var field2 = (_a = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _a === void 0 ? void 0 : _a.get("field2");
                var field3 = (_b = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _b === void 0 ? void 0 : _b.get("field3");
                var fieldDelimiter = (_c = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _c === void 0 ? void 0 : _c.get("fieldDelimiter");
                if ((field2 || field3) && fieldDelimiter) {
                    error = true;
                }
                if (((_d = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _d === void 0 ? void 0 : _d.type) === "unique-value" ||
                    ((_e = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _e === void 0 ? void 0 : _e.type) === "class-breaks") {
                    var renderer_1 = featureLayer.renderer;
                    (_f = renderer_1 === null || renderer_1 === void 0 ? void 0 : renderer_1.visualVariables) === null || _f === void 0 ? void 0 : _f.forEach(function (visualVariable) {
                        var _a, _b;
                        if (visualVariable.type === "size" ||
                            visualVariable.type === "color" ||
                            visualVariable.type === "opacity") {
                            var rendererAuthoringInfoType = (_a = renderer_1 === null || renderer_1 === void 0 ? void 0 : renderer_1.authoringInfo) === null || _a === void 0 ? void 0 : _a.type;
                            if (rendererAuthoringInfoType === "class-breaks-color" ||
                                rendererAuthoringInfoType === "class-breaks-size" ||
                                ((_b = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _b === void 0 ? void 0 : _b.type) === "unique-value") {
                                return;
                            }
                            error = true;
                        }
                    });
                }
                if (((_g = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _g === void 0 ? void 0 : _g.type) === "heatmap" ||
                    ((_h = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _h === void 0 ? void 0 : _h.type) === "dot-density") {
                    error = true;
                }
                var simpleRenderer = (((_j = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.renderer) === null || _j === void 0 ? void 0 : _j.type) === "simple"
                    ? featureLayer.renderer
                    : null);
                var vvSizeArr = (_k = simpleRenderer === null || simpleRenderer === void 0 ? void 0 : simpleRenderer.visualVariables) === null || _k === void 0 ? void 0 : _k.filter(function (visualVariable) { return visualVariable.type === "size"; });
                if ((simpleRenderer && (featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.featureReduction)) ||
                    ((vvSizeArr === null || vvSizeArr === void 0 ? void 0 : vvSizeArr.length) > 0 && (featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.featureReduction))) {
                    error = true;
                }
            });
            if (layerError) {
                var layerErrMsg = this.itemBrowserMessages.errors
                    .interactiveLegendFeatureLayer;
                console.error("ERROR : ", layerErrMsg);
                this.configPanelViewModel.error = new Error(layerErrMsg);
            }
            else if (error) {
                var rendererErrMsg = this.itemBrowserMessages.errors.renderer;
                console.error("ERROR : ", rendererErrMsg);
                this.configPanelViewModel.error = new Error(rendererErrMsg);
            }
            else {
                this.configPanelViewModel.error = null;
            }
        };
        ItemBrowserPreviewViewModel.prototype.handleImageryCondition = function () {
            var error = true;
            var layers = this.configPanelViewModel.map.layers;
            if (layers) {
                layers.forEach(function (layer) {
                    if (layer.type === "imagery" || layer.type === "imagery-tile") {
                        error = false;
                    }
                });
            }
            if (error) {
                var imageryErrMsg = this.itemBrowserMessages.errors.imagery;
                this.configPanelViewModel.error = new Error(imageryErrMsg);
            }
            else {
                this.configPanelViewModel.error = null;
            }
        };
        ItemBrowserPreviewViewModel.prototype.handleAttachmentsCondition = function () {
            var _this = this;
            var error = false;
            var layerPromises = promiseUtils_1.eachAlways(this.configPanelViewModel.map.layers.map(function (layer) {
                return watchUtils_1.whenOnce(layer, "capabilities", function () {
                    var _a, _b, _c, _d;
                    if (layer.type === "feature") {
                        var featureLayer = layer;
                        if (!((_b = (_a = featureLayer.capabilities) === null || _a === void 0 ? void 0 : _a.operations) === null || _b === void 0 ? void 0 : _b.supportsQueryAttachments) ||
                            !((_d = (_c = featureLayer.capabilities) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.supportsAttachment)) {
                            error = true;
                        }
                    }
                });
            }));
            layerPromises.then(function () {
                if (error) {
                    var attachmentErrMsg = _this.itemBrowserMessages.errors.attachments;
                    console.error("ERROR : ", attachmentErrMsg);
                    _this.configPanelViewModel.error = new Error(attachmentErrMsg);
                }
                else {
                    _this.configPanelViewModel.error = null;
                }
            });
        };
        ItemBrowserPreviewViewModel.prototype.handleSupportsOrderByCondition = function () {
            var _this = this;
            var count = 0;
            var layerPromises = promiseUtils_1.eachAlways(this.configPanelViewModel.map.allLayers.map(function (layer) {
                return watchUtils_1.whenOnce(layer, "capabilities", function () {
                    var _a, _b;
                    if (layer.type === "feature") {
                        var featureLayer = layer;
                        if ((_b = (_a = featureLayer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.supportsOrderBy) {
                            count++;
                        }
                    }
                });
            }));
            layerPromises.then(function () {
                if (count === 0) {
                    var supportsOrderByErrMsg = _this.itemBrowserMessages.errors.countdown;
                    console.error("ERROR : ", supportsOrderByErrMsg);
                    _this.configPanelViewModel.error = new Error(supportsOrderByErrMsg);
                }
                else {
                    _this.configPanelViewModel.error = null;
                }
            });
        };
        ItemBrowserPreviewViewModel.prototype.handleChartsCondition = function () {
            var chartsAvailable = this.configPanelViewModel.map.layers
                .filter(function (layer) { return layer.type === "feature"; })
                .some(function (flayer) {
                var flayerWithCharts = flayer.get("charts");
                return flayerWithCharts;
            }) ||
                this.configPanelViewModel.map.allTables
                    .filter(function (table) { return table.type === "feature"; })
                    .some(function (featureTable) {
                    var fTableWithCharts = featureTable === null || featureTable === void 0 ? void 0 : featureTable.charts;
                    return fTableWithCharts;
                });
            if (!chartsAvailable) {
                var chartsErrMsg = this.itemBrowserMessages.errors.charts;
                console.error("ERROR : ", chartsErrMsg);
                this.configPanelViewModel.error = new Error(chartsErrMsg);
            }
            else {
                this.configPanelViewModel.error = null;
            }
        };
        ItemBrowserPreviewViewModel.prototype.handlePopupDisabled = function () {
            var _a, _b;
            var error = false;
            var excludeTypes = [
                "tile",
                "base-tile",
                "imagery-tile",
                "vector-tile",
                "web-tile"
            ];
            var atLeastOnePopupEnabled = (_b = (_a = this.configPanelViewModel.map) === null || _a === void 0 ? void 0 : _a.allLayers) === null || _b === void 0 ? void 0 : _b.filter(function (layer) {
                return !excludeTypes.includes(layer.type);
            }).map(function (layer) {
                return layer.get("popupEnabled");
            }).reduce(function (acc, curr) { return acc || curr; }, false);
            error = !atLeastOnePopupEnabled ? true : false;
            if (error) {
                var poupErrMsg = this.itemBrowserMessages.errors.popupDisabled;
                this.configPanelViewModel.error = new Error(poupErrMsg);
            }
            else {
                this.configPanelViewModel.error = null;
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowserPreviewViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ItemBrowserPreviewViewModel.prototype, "itemBrowserMessages", void 0);
        ItemBrowserPreviewViewModel = tslib_1.__decorate([
            decorators_1.subclass("ItemBrowserPreviewViewModel")
        ], ItemBrowserPreviewViewModel);
        return ItemBrowserPreviewViewModel;
    }(Accessor));
    return ItemBrowserPreviewViewModel;
});
