/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
define(["require", "exports", "tslib", "esri/widgets/Feature", "esri/widgets/ScaleBar", "esri/widgets/Legend"], function (require, exports, tslib_1, Feature_1, ScaleBar_1, Legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.cleanupPrintPage = exports.renderStandAlonePopupContent = exports.takeScreenshotAndPrint = exports.generateTitle = exports.renderPopupContent = exports.expandPopup = void 0;
    Feature_1 = tslib_1.__importDefault(Feature_1);
    ScaleBar_1 = tslib_1.__importDefault(ScaleBar_1);
    Legend_1 = tslib_1.__importDefault(Legend_1);
    function expandPopup() {
        var _a;
        var elements = document.getElementsByClassName("popup-block");
        for (var i = 0; i < elements.length; i++) {
            (_a = elements[i]) === null || _a === void 0 ? void 0 : _a.setAttribute("open", "true");
        }
    }
    exports.expandPopup = expandPopup;
    function renderPopupContent(container) {
        var _a;
        // copy popup content to print div 
        var resultContainer = document.getElementById("popupPanel");
        var features = resultContainer === null || resultContainer === void 0 ? void 0 : resultContainer.getElementsByClassName("popup-block");
        container.innerHTML = null;
        for (var i = 0; i < (features === null || features === void 0 ? void 0 : features.length); i++) {
            var popupDiv = document.createElement("div");
            popupDiv.classList.add("popup-content");
            container.append(popupDiv);
            var feature = features[i].cloneNode(true);
            var title = (_a = features[i]) === null || _a === void 0 ? void 0 : _a.getAttribute("data-title");
            if (title) {
                var h = document.createElement("h2");
                h.innerHTML = title;
                popupDiv.append(h);
            }
            while (feature === null || feature === void 0 ? void 0 : feature.firstChild) {
                popupDiv.append(feature.firstChild);
            }
        }
    }
    exports.renderPopupContent = renderPopupContent;
    function generateTitle(config) {
        var _a, _b;
        var printTitleArea = document.getElementById("printTitle");
        if (((_a = printTitleArea === null || printTitleArea === void 0 ? void 0 : printTitleArea.childNodes) === null || _a === void 0 ? void 0 : _a.length) > 0)
            return;
        var title = document.createElement("h1");
        title.innerHTML = config.title;
        var imageArea = document.getElementsByClassName("embed-app__header__logo");
        if ((imageArea === null || imageArea === void 0 ? void 0 : imageArea.length) > 0) {
            var logo = (_b = imageArea[0]) === null || _b === void 0 ? void 0 : _b.cloneNode();
            printTitleArea.append(logo);
        }
        if (title)
            printTitleArea.appendChild(title);
    }
    exports.generateTitle = generateTitle;
    function takeScreenshotAndPrint(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var config, view, portal, mapContainer, mapDiv, options;
            return tslib_1.__generator(this, function (_a) {
                config = props.config, view = props.view, portal = props.portal;
                if (config === null || config === void 0 ? void 0 : config.header)
                    generateTitle(config);
                mapContainer = document.getElementById("printMapContainer");
                mapDiv = document.createElement("div");
                mapDiv.classList.add('map-image-container');
                options = {
                    width: view === null || view === void 0 ? void 0 : view.width,
                    height: view === null || view === void 0 ? void 0 : view.height
                };
                return [2 /*return*/, view === null || view === void 0 ? void 0 : view.takeScreenshot(options).then(function (e) {
                        var _a, _b, _c, _d;
                        mapContainer.innerHTML = null;
                        var img = document.createElement("img");
                        img.height = (_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.height;
                        img.width = (_b = e === null || e === void 0 ? void 0 : e.data) === null || _b === void 0 ? void 0 : _b.width;
                        img.src = e.dataUrl;
                        mapDiv.append(img);
                        mapContainer.append(mapDiv);
                        var container = document.getElementById("printPopupInfo");
                        container === null || container === void 0 ? void 0 : container.setAttribute("display", "block");
                        // add scalebar outside the view 
                        var scaleContainer = document.getElementById("printScalebar");
                        scaleContainer.innerHTML = null;
                        var scalebar = new ScaleBar_1.default({
                            view: view,
                            unit: (portal === null || portal === void 0 ? void 0 : portal.units) === "metric" ? portal === null || portal === void 0 ? void 0 : portal.units : "non-metric",
                            container: document.createElement("div")
                        });
                        scaleContainer.append(scalebar === null || scalebar === void 0 ? void 0 : scalebar.container);
                        if (config.legendPanel) {
                            var legendContainer = document.getElementById("printLegend");
                            legendContainer.innerHTML = null;
                            var container_1 = document.createElement("div");
                            container_1.classList.add("legend-container");
                            var legend = new Legend_1.default({
                                view: view,
                                basemapLegendVisible: false,
                                hideLayersNotInCurrentView: true,
                                style: { type: "card", layout: "side-by-side" },
                                container: container_1
                            });
                            legendContainer.append(legend === null || legend === void 0 ? void 0 : legend.container);
                        }
                        if (!config.popupPanel) {
                            if (((_d = (_c = view === null || view === void 0 ? void 0 : view.popup) === null || _c === void 0 ? void 0 : _c.features) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                                renderStandAlonePopupContent(view, container);
                            }
                        }
                        else {
                            renderPopupContent(container);
                        }
                    })];
            });
        });
    }
    exports.takeScreenshotAndPrint = takeScreenshotAndPrint;
    function renderStandAlonePopupContent(view, container) {
        var _a, _b;
        var features = ((_b = (_a = view === null || view === void 0 ? void 0 : view.popup) === null || _a === void 0 ? void 0 : _a.features) === null || _b === void 0 ? void 0 : _b.length) > 0 ? view.popup.features : [];
        for (var i = 0; i < (features === null || features === void 0 ? void 0 : features.length); i++) {
            var f = features[i];
            f.popupTemplate = f.getEffectivePopupTemplate(f);
            if (f && f.popupTemplate) {
                f.popupTemplate.outFields = ["*"];
            }
            var fw = new Feature_1.default({
                map: view.map,
                graphic: f,
                defaultPopupTemplateEnabled: true,
                visibleElements: {
                    title: true
                },
                spatialReference: view.spatialReference,
                container: document.createElement("div")
            });
            container.append(fw.container);
        }
    }
    exports.renderStandAlonePopupContent = renderStandAlonePopupContent;
    function cleanupPrintPage() {
        var elements = document.getElementsByClassName("print-only");
        for (var i = 0; i < (elements === null || elements === void 0 ? void 0 : elements.length); i++) {
            var element = elements[0];
            element.innerHTML = null;
        }
    }
    exports.cleanupPrintPage = cleanupPrintPage;
});
