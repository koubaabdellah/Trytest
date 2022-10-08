var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
define(["require", "exports", "esri/widgets/support/widget", "esri/core/promiseUtils", "esri/core/requireUtils", "esri/widgets/Expand", "esri/widgets/Home", "esri/widgets/Search", "esri/widgets/Compass", "esri/widgets/BasemapGallery", "esri/core/watchUtils", "application/utilities/telemetryUtils", "boilerplate/support/itemUtils"], function (require, exports, widget_1, promiseUtils, requireUtils, Expand, Home, Search, Compass, BasemapGallery, watchUtils, telemetryUtils, itemUtils_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (function (props) {
        var ViewPublic = {
            i18n: props.i18n,
            loadText: "scripts",
            status: "loading",
            error: "",
            render: function () {
                if (ViewPublic.status === "loaded") {
                    return (widget_1.tsx("div", { style: "width:100%;height:100%;" },
                        widget_1.tsx("div", { class: "loader padding-leader-3 padding-trailer-3 center-style" },
                            widget_1.tsx("div", { class: "loader-bars" }),
                            widget_1.tsx("div", { class: "loader-text" }, ViewPublic.i18n.viewLoading[ViewPublic.loadText]))));
                }
                else if (ViewPublic.status === "loading") {
                    return (widget_1.tsx("div", { style: "width:100%;height:100%;" },
                        widget_1.tsx("div", { class: "loader is-active padding-leader-3 padding-trailer-3 center-style" },
                            widget_1.tsx("div", { class: "loader-bars" }),
                            widget_1.tsx("div", { class: "loader-text" }, ViewPublic.i18n.viewLoading[ViewPublic.loadText]))));
                }
                return (widget_1.tsx("div", null,
                    widget_1.tsx("h3", { class: "center-style" },
                        ViewPublic.i18n.viewLoading.failed,
                        widget_1.tsx("p", { class: 'font-size--2 error-style' }, ViewPublic.error))));
            }
        };
        loadScripts();
        function loadScripts() {
            // check for access
            checkForAccess();
            requireUtils.when(require, [props.WebModule, props.ViewModule])
                .then(function (_a) {
                var WebConstructor = _a[0], ViewConstructor = _a[1];
                ViewPublic.loadText = "map";
                if (props.item.isLayer) {
                    // Add layer to new default map
                    requireUtils.when(require, ["esri/layers/Layer"]).then(function (_a) {
                        var Layer = _a[0];
                        Layer.fromPortalItem({ portalItem: props.item }).then(function (layer) {
                            loadMap(WebConstructor, ViewConstructor, layer);
                        });
                    });
                }
                else if (props.config.source && props.config.source === "sd" && props.config.url && props.config.url !== null) {
                    // if there is a service directory layer add it
                    requireUtils.when(require, ["esri/layers/Layer"]).then(function (_a) {
                        var Layer = _a[0];
                        Layer.fromArcGISServerUrl({
                            url: props.config.url
                        }).then(function (layer) {
                            loadMap(WebConstructor, ViewConstructor, layer);
                        }).catch(function (err) {
                            console.log("There was an issue", err);
                        });
                    });
                }
                else {
                    loadMap(WebConstructor, ViewConstructor);
                }
            }, function (err) {
                ViewPublic.status = "failed";
            });
        }
        function checkForAccess() {
            if (props && props.item && props.item.access !== "public") {
                // do we have permission to access the app
                if (props.config && props.config.appSignInResponse && props.config.appSignInResponse.name && props.config.appSignInResponse.name === "identity-manager:not-authorized") {
                    document.body.classList.add("app-error");
                    document.getElementById("viewDiv").innerHTML = "<h1>" + props.i18n.licenseError.title + "</h1><p>" + props.i18n.licenseError.message + "</p>";
                }
            }
        }
        function loadMap(WebConstructor, ViewConstructor, layer) {
            var map;
            if (layer || !props.id) {
                //use the basemap defined in self
                var bm = props.item.portal.useVectorBasemaps ? props.item.portal.defaultVectorBasemap : props.item.portal.defaultBasemap;
                map = new WebConstructor({
                    basemap: bm
                });
                if (layer) {
                    map.add(layer);
                }
            }
            else {
                map = new WebConstructor({
                    portalItem: {
                        id: props.id
                    }
                });
            }
            map.load().then(function () {
                _reportLayerLoadErrors(map.allLayers);
                // get url params as map properties (center, level etc)
                var defaultViewProperties = itemUtils_1.getViewProperties(props.config);
                defaultViewProperties.container = "map-container";
                defaultViewProperties.map = map;
                var view = new ViewConstructor(defaultViewProperties);
                view.padding.top = 66;
                view.when(function () {
                    if (layer) {
                        watchUtils.once(layer, "fullExtent", function () {
                            view.goTo(layer.fullExtent);
                        });
                    }
                    // Navigate to marker or find query if params exist
                    var _a = props.config, find = _a.find, marker = _a.marker;
                    itemUtils_1.findQuery(find, view);
                    itemUtils_1.goToMarker(marker, view);
                    itemUtils_1.setBasemap(map, props.config);
                    loadWidgets(view);
                });
            }).otherwise(function (err) {
                if (err && err.details && err.details.error && err.details.error.message) {
                    ViewPublic.error = err.details.error.message;
                }
                else if (err && err.message) {
                    ViewPublic.error = err.message;
                }
                else {
                    ViewPublic.error = "Error";
                }
                telemetryUtils.logError(props.settings, {
                    error: ViewPublic.error,
                    urlRequested: document.location.href
                });
                ViewPublic.status = "failed";
                props.projector.scheduleRender();
            });
        }
        function _reportLayerLoadErrors(layers) {
            requireUtils.when(require, ["esri/layers/UnsupportedLayer", "esri/layers/UnknownLayer"])
                .then(function (_a) {
                var UnsupportedLayer = _a[0], UnknownLayer = _a[1];
                var layerErrors = [];
                layers.forEach(function (layer) {
                    var title = layer.title ? layer.title : "";
                    if (layer instanceof UnsupportedLayer) {
                        layerErrors.push(promiseUtils.resolve("Unsupported Layer " + title));
                    }
                    else if (layer instanceof UnknownLayer) {
                        layerErrors.push(promiseUtils.resolve("Unknown Layer " + title));
                    }
                    else {
                        layerErrors.push(layer.load().otherwise(function (err) {
                            return err;
                        }));
                    }
                });
                promiseUtils.eachAlways(layerErrors).then(function (results) {
                    var messages = [];
                    results.forEach(function (result) {
                        if (result.value && result.value.message) {
                            messages.push(result.value.message);
                            return true;
                        }
                    });
                    if (messages.length && messages.length > 0) {
                        var alert_1 = document.getElementById("mapAlert");
                        updateClasses("is-active", "animate-fade-out", alert_1);
                        var errors = messages.join(",");
                        alert_1.innerHTML = errors;
                        alert_1.title = errors;
                        telemetryUtils.logError(props.settings, {
                            error: errors,
                            urlRequested: document.location.href
                        });
                        alert_1.addEventListener("click", function clicker(e) {
                            updateClasses("animate-fade-out", "is-active", alert_1);
                            alert_1.removeEventListener("click", clicker);
                        });
                    }
                });
            });
        }
        function updateClasses(classesToAdd, classesToRemove, target) {
            if (classesToAdd) {
                target.classList.add(classesToAdd);
            }
            if (classesToRemove) {
                target.classList.remove(classesToRemove);
            }
        }
        function loadWidgets(view) {
            ViewPublic.status = "loaded";
            var home = new Home({
                view: view
            });
            // Pass in portal url so we get basemaps from portal
            var basemapGallery = new BasemapGallery({
                view: view,
                source: props.item.portal
            });
            var bgExpand = new Expand({
                view: view,
                content: basemapGallery,
                // mode: "floating",
                group: "top-right",
                expandTooltip: props.i18n.viewer.basemap
            });
            watchUtils.watch(bgExpand, "expanded", function () {
                watchUtils.when(basemapGallery, "activeBasemap", function (e) {
                    if (basemapGallery.activeBasemap.title) {
                        var telemetryInfo = {
                            eventType: "click",
                            category: "basemap-change",
                            label: basemapGallery.activeBasemap.title,
                            details: props.item.id
                        };
                        telemetryUtils.logEvent(props.settings, telemetryInfo);
                    }
                });
            });
            var search = new Search({
                view: view
            });
            var searchExpand = new Expand({
                view: view,
                mode: "floating",
                content: search
            });
            if (props.config.helperServices && props.config.helperServices.geocode && props.config.helperServices.geocode.length && props.config.helperServices.geocode.length > 0) {
                // add org specific locators
                requireUtils.when(require, ["esri/tasks/Locator", "esri/widgets/Search/LocatorSearchSource", "esri/layers/FeatureLayer"]).then(function (_a) {
                    var Locator = _a[0], LocatorSearchSource = _a[1], FeatureLayer = _a[2];
                    var locators = props.config.helperServices.geocode;
                    locators.forEach(function (locator) {
                        if (locator.name && locator.name === "Esri World Geocoder") {
                            return;
                        }
                        if (locator.placefinding) {
                            var source = new LocatorSearchSource(__assign({}, locator, { suggestionsEnabled: locator.suggest === true ? true : false, locator: new Locator(locator.url) }));
                            search.sources.push(source);
                        }
                    });
                    // add any item configured search
                    props.item.fetchData().then(function (data) {
                        if (data && data.applicationProperties.viewing && data.applicationProperties.viewing.search) {
                            var searchInfo_1 = data.applicationProperties.viewing.search;
                            if (searchInfo_1.layers) {
                                searchInfo_1.layers.forEach(function (layer) {
                                    var mapLayer = view.map.findLayerById(layer.id);
                                    if (mapLayer) {
                                        var layerSource = {
                                            featureLayer: mapLayer,
                                            placeholder: searchInfo_1.hintText,
                                            name: mapLayer.title,
                                            outFields: ["*"],
                                            searchFields: [layer.field.name],
                                            exactMatch: layer.field.exactMatch
                                        };
                                        search.sources.unshift(layerSource);
                                    }
                                });
                            }
                        }
                    });
                });
            }
            if (view.map && view.map.bookmarks && view.map.bookmarks.length && view.map.bookmarks.length > 0) {
                requireUtils.when(require, ["esri/geometry/Extent", "esri/widgets/Bookmarks"]).then(function (_a) {
                    var Extent = _a[0], Bookmarks = _a[1];
                    var bookmarksWidget = new Bookmarks({
                        view: view,
                        bookmarks: view.map.bookmarks
                    });
                    var selectExpand = new Expand({
                        view: view,
                        mode: "floating",
                        content: bookmarksWidget,
                        group: "top-right"
                    });
                    view.ui.add(selectExpand, "top-right");
                });
            }
            //Update the ui
            view.ui.add([
                { component: bgExpand, position: "top-right" },
                { component: home, position: "top-left", index: 0 },
                { component: searchExpand, position: "top-left", index: 0 }
            ]);
            // Add compass if not already there  - only display when view is rotated
            if (view.ui.components.indexOf("compass") === -1) {
                var compass = new Compass({
                    view: view
                });
                view.ui.add({
                    component: compass, position: "top-left"
                });
                var container_1 = compass.container;
                container_1.classList.add("hide");
                view.watch("rotation", function (rotation) {
                    (rotation === 0) ? container_1.classList.add("hide") : container_1.classList.remove("hide");
                });
            }
            if (window.location.protocol === "https:") {
                requireUtils.when(require, ["esri/widgets/Locate", "esri/widgets/Track"]).then(function (_a) {
                    var Locate = _a[0], Track = _a[1];
                    var track = new Track({
                        view: view
                    });
                    view.ui.add(track, "top-left");
                    var locate = new Locate({
                        view: view
                    });
                    view.ui.add(locate, "top-left");
                });
            }
            if (view.map.layers && view.map.layers.length && view.map.layers.length > 0) {
                requireUtils.when(require, ["esri/widgets/LayerList"]).then(function (_a) {
                    var LayerList = _a[0];
                    var layerExpand = new Expand({
                        view: view,
                        group: "top-right",
                        expandTooltip: props.i18n.viewer.legend,
                        content: new LayerList({
                            view: view,
                            container: document.createElement("div"),
                            listItemCreatedFunction: function (e) {
                                var listItem = e.item;
                                if (listItem && listItem.layer && listItem.layer.legendEnabled) {
                                    listItem.panel = {
                                        content: "legend"
                                    };
                                }
                            }
                        }),
                        expandIconClass: "esri-icon-layer-list"
                    });
                    view.ui.add(layerExpand, "top-right");
                });
            }
        }
        return ViewPublic;
    });
});
//# sourceMappingURL=ViewBase.js.map