define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EFieldTypes = exports.ECapabilityTypes = exports.friendlyGeometryNames = exports.EGeometryTypes = exports.containsNestedLayers_Layers = exports.containsNestedLayer_Layers = exports.selectable_Layers = exports.friendlyLayerNames = exports.ELayerTypes = void 0;
    var ELayerTypes;
    (function (ELayerTypes) {
        ELayerTypes["GroupLayer"] = "group";
        ELayerTypes["FeatureLayer"] = "feature";
        ELayerTypes["ImageryLayer"] = "imagery";
        ELayerTypes["ImageryTileLayer"] = "imagery-tile";
        ELayerTypes["MapImageLayer"] = "map-image";
        ELayerTypes["TileLayer"] = "tile";
        ELayerTypes["WebTile"] = "web-tile";
        ELayerTypes["WMTSLayer"] = "wmts";
    })(ELayerTypes = exports.ELayerTypes || (exports.ELayerTypes = {}));
    var layerNames = [
        [ELayerTypes.GroupLayer, "Group Layer"],
        [ELayerTypes.FeatureLayer, "Feature Layer"],
        [ELayerTypes.ImageryLayer, "Imagery Layer"],
        [ELayerTypes.ImageryTileLayer, "Imagery Tile Layer"],
        [ELayerTypes.MapImageLayer, "Map Image Layer"],
        [ELayerTypes.TileLayer, "Tile Layer"],
        [ELayerTypes.WebTile, "Web Tile Layer"],
        [ELayerTypes.WMTSLayer, "WMTS Layer"],
    ];
    exports.friendlyLayerNames = new Map();
    layerNames.forEach(function (layerName) { return exports.friendlyLayerNames.set(layerName[0], layerName[1]); });
    exports.selectable_Layers = [ELayerTypes.FeatureLayer, ELayerTypes.ImageryLayer, ELayerTypes.ImageryTileLayer, ELayerTypes.WebTile, ELayerTypes.WMTSLayer];
    exports.containsNestedLayer_Layers = [ELayerTypes.MapImageLayer, ELayerTypes.TileLayer];
    exports.containsNestedLayers_Layers = [ELayerTypes.GroupLayer];
    var EGeometryTypes;
    (function (EGeometryTypes) {
        EGeometryTypes["Point"] = "esriGeometryPoint";
        EGeometryTypes["Line"] = "esriGeometryLine";
        EGeometryTypes["Polyline"] = "esriGeometryPolyline";
        EGeometryTypes["Polygon"] = "esriGeometryPolygon";
    })(EGeometryTypes = exports.EGeometryTypes || (exports.EGeometryTypes = {}));
    var geometryNames = [
        [EGeometryTypes.Point, "Point"],
        [EGeometryTypes.Line, "Line"],
        [EGeometryTypes.Polyline, "Polyline"],
        [EGeometryTypes.Polygon, "Polygon"]
    ];
    exports.friendlyGeometryNames = new Map();
    geometryNames.forEach(function (geometryName) { return exports.friendlyGeometryNames.set(geometryName[0], geometryName[1]); });
    var ECapabilityTypes;
    (function (ECapabilityTypes) {
        ECapabilityTypes["Attachments"] = "attachments";
        ECapabilityTypes["Editable"] = "editable";
        ECapabilityTypes["Time"] = "time";
    })(ECapabilityTypes = exports.ECapabilityTypes || (exports.ECapabilityTypes = {}));
    var EFieldTypes;
    (function (EFieldTypes) {
        EFieldTypes["SmallInt"] = "small-integer";
        EFieldTypes["Integer"] = "integer";
        EFieldTypes["Single"] = "single";
        EFieldTypes["Double"] = "double";
        EFieldTypes["Long"] = "long";
        EFieldTypes["String"] = "string";
        EFieldTypes["Date"] = "date";
        EFieldTypes["ObjectIdField"] = "oid";
        EFieldTypes["Geometry"] = "geometry";
        EFieldTypes["Blob"] = "blob";
        EFieldTypes["Raster"] = "raster";
        EFieldTypes["guid"] = "guid";
        EFieldTypes["GlobalIdField"] = "global-id";
        EFieldTypes["XML"] = "xml";
    })(EFieldTypes = exports.EFieldTypes || (exports.EFieldTypes = {}));
});
