define(["require", "exports", "tslib", "./LayerConfigAssets", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "esri/core/Collection", "./stateStore"], function (require, exports, tslib_1, LayerConfigAssets_1, decorators_1, Accessor, Handles, Collection, StateStore) {
    "use strict";
    var LayerConfigViewModel = (function (_super) {
        tslib_1.__extends(LayerConfigViewModel, _super);
        function LayerConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.expandStateTracker = new Map();
            _this.areLayersDetailsLoading = false;
            _this.acceptableLayers = new Collection();
            _this.multiSelectState = new Collection();
            _this.fieldState = new Map();
            _this.stateStore = new StateStore();
            _this.isReady = false;
            _this._handles = new Handles();
            _this.groupLayerMemberUseMap_GeomFilter = new Map();
            _this.sublayerMemberUseMap_GeomFilter = new Map();
            _this.groupLayerMemberUseMap_CapFilter = new Map();
            return _this;
        }
        LayerConfigViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add(this.multiSelectState.on("change", function () {
                _this.createJsonOutput();
            }));
        };
        LayerConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        LayerConfigViewModel.prototype.loadLayerDetails = function (layers) {
            var _this = this;
            this.acceptableLayers.removeAll();
            this.areLayersDetailsLoading = true;
            var promCollection = new Collection();
            for (var x = 0; x < layers.length; x++) {
                var layer = layers.getItemAt(x);
                if (layer.type === "map-image" || layer.type === "group") {
                    try {
                        promCollection.add([layer, layer.loadAll()]);
                    }
                    catch (_a) { }
                }
                else if (layer.type === "tile") {
                    promCollection.add([layer, this._loadTileLayerFully(layer)]);
                }
                else {
                    promCollection.add([layer, layer.load()]);
                }
            }
            var promResolutionCount = 0;
            promCollection.forEach(function (pairing) {
                pairing[1]
                    .then(function () {
                    var layer = pairing[0];
                    _this.processLoadedLayer(layer);
                    promResolutionCount += 1;
                    if (promResolutionCount === layers.length) {
                        _this.areLayersDetailsLoading = false;
                        _this.isReady = true;
                    }
                })
                    .catch(function (err) {
                    console.error(err);
                    promResolutionCount += 1;
                    if (promResolutionCount === layers.length) {
                        _this.areLayersDetailsLoading = false;
                        _this.isReady = true;
                    }
                });
            });
        };
        LayerConfigViewModel.prototype.processLoadedLayer = function (layer, recursiveCall) {
            var _this = this;
            if (layer.type === "group") {
                layer.layers.forEach(function (groupSubLayer) { _this.processLoadedLayer(groupSubLayer, true); });
            }
            var isPassingGeom = this.filterByGeomType(layer);
            var isPassingCapability = this.filterByLayerCapability(layer);
            if (isPassingGeom && isPassingCapability) {
                this.initializeStateForLayer(layer);
                if (!recursiveCall) {
                    this.sortedInsertToAcceptableLayers(layer);
                }
            }
        };
        LayerConfigViewModel.prototype.initializeStateForLayer = function (layer) {
            var _this = this;
            var _a, _b;
            if (((_b = (_a = this.stateStore.savedState) === null || _a === void 0 ? void 0 : _a.layers) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                this.stateStore.savedState.layers
                    .filter(function (layerDef) {
                    return layerDef.id === layer.id;
                })
                    .map(function (layerDef) {
                    var _a;
                    var layer = _this.stateStore.loadedMap.findLayerById(layerDef.id);
                    if (layerDef.sublayerId != null) {
                        layer = layer.findSublayerById(layerDef.sublayerId);
                        _this.multiSelectState.add(layer);
                    }
                    else {
                        _this.multiSelectState.add(layer);
                    }
                    if (((_a = layerDef.fields) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        var uniqueId = _this.createUniqueLayerId(layer);
                        _this.fieldSelectionSave(uniqueId, new Collection(layerDef.fields));
                    }
                });
            }
        };
        LayerConfigViewModel.prototype.filterByLayerType = function (layer) {
            if (this.allowedLayerTypes == null || this.allowedLayerTypes === "*" || layer.type === "group") {
                return true;
            }
            if (Array.isArray(this.allowedLayerTypes)) {
                this.allowedLayerTypes = new Collection(this.allowedLayerTypes);
            }
            return this.allowedLayerTypes.includes(layer.type);
        };
        LayerConfigViewModel.prototype.filterByLayerCapability = function (layer) {
            var _this = this;
            if (layer.type === "group") {
                var isGroupLayerPassing = layer.layers.map(function (layerInGroup) {
                    var doesLayerPassGeomFilter = _this.filterByLayerCapability(layerInGroup);
                    _this.groupLayerMemberUseMap_CapFilter.set(layerInGroup.id, doesLayerPassGeomFilter);
                    return doesLayerPassGeomFilter;
                }).toArray().reduce(function (acc, curr) { return acc || curr; }, false);
                return isGroupLayerPassing;
            }
            else {
                return this._runCapabilityTest(layer);
            }
        };
        LayerConfigViewModel.prototype._runCapabilityTest = function (layer) {
            if (this.allowedCapabilities == null || this.allowedCapabilities === "*") {
                return true;
            }
            if (Array.isArray(this.allowedCapabilities)) {
                this.allowedCapabilities = new Collection(this.allowedCapabilities);
            }
            return this.allowedCapabilities.map(function (requiredCapability) {
                var _a, _b, _c, _d, _e, _f, _g;
                if (requiredCapability === LayerConfigAssets_1.ECapabilityTypes.Editable) {
                    return (_c = (_b = (_a = layer) === null || _a === void 0 ? void 0 : _a.capabilities) === null || _b === void 0 ? void 0 : _b.operations) === null || _c === void 0 ? void 0 : _c.supportsEditing;
                }
                else if (requiredCapability == LayerConfigAssets_1.ECapabilityTypes.Time) {
                    return ((_d = layer) === null || _d === void 0 ? void 0 : _d.timeInfo) != null;
                }
                else if (requiredCapability === LayerConfigAssets_1.ECapabilityTypes.Attachments) {
                    return (_g = (_f = (_e = layer) === null || _e === void 0 ? void 0 : _e.capabilities) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.supportsAttachment;
                }
            }).reduce(function (acc, curr) { return acc && curr; });
        };
        LayerConfigViewModel.prototype.filterByGeomType = function (layer) {
            var _this = this;
            var _a;
            if (Array.isArray(this.allowedGeomTypes)) {
                this.allowedGeomTypes = new Collection(this.allowedGeomTypes);
            }
            if (layer.type === LayerConfigAssets_1.ELayerTypes.MapImageLayer ||
                layer.type === LayerConfigAssets_1.ELayerTypes.TileLayer) {
                var passingCount_1 = 0;
                layer.allSublayers.forEach(function (sublayer) {
                    var _a;
                    var isSublayerPassing = _this.allowedGeomTypes === "*"
                        ? true
                        : _this.allowedGeomTypes.includes((_a = sublayer.sourceJSON) === null || _a === void 0 ? void 0 : _a["geometryType"]);
                    _this.sublayerMemberUseMap_GeomFilter.set(_this.createUniqueLayerId(sublayer), isSublayerPassing);
                    if (isSublayerPassing) {
                        passingCount_1 += 1;
                    }
                });
                return passingCount_1 > 0;
            }
            else if (layer.type === LayerConfigAssets_1.ELayerTypes.ImageryLayer || layer.type === LayerConfigAssets_1.ELayerTypes.WebTile || layer.type === LayerConfigAssets_1.ELayerTypes.WMTSLayer) {
                return true;
            }
            else if (layer.type === "group") {
                var isGroupLayerPassing = layer.layers.map(function (layerInGroup) {
                    var doesLayerPassGeomFilter = _this.filterByGeomType(layerInGroup);
                    _this.groupLayerMemberUseMap_GeomFilter.set(layerInGroup.id, doesLayerPassGeomFilter);
                    return doesLayerPassGeomFilter;
                }).toArray().reduce(function (acc, curr) { return acc || curr; }, false);
                return isGroupLayerPassing;
            }
            else {
                return this.allowedGeomTypes === "*"
                    ? true
                    : this.allowedGeomTypes.includes((_a = layer === null || layer === void 0 ? void 0 : layer["sourceJSON"]) === null || _a === void 0 ? void 0 : _a["geometryType"]);
            }
        };
        LayerConfigViewModel.prototype.handleSingleLayerSelectionChange = function (layer) {
            this.multiSelectState.removeAll();
            this.multiSelectState.add(layer);
        };
        LayerConfigViewModel.prototype.handleMultipleLayerSelectionChange = function (layer, checked) {
            if (checked) {
                this.multiSelectState.add(layer);
            }
            else {
                this.multiSelectState.remove(layer);
            }
        };
        LayerConfigViewModel.prototype.fieldSelectionSave = function (uniqueId, fieldCheckboxes) {
            var fieldNames = this.fieldState.get(uniqueId);
            if (fieldNames == null) {
                fieldNames = new Collection();
                this.fieldState.set(uniqueId, fieldNames);
            }
            else {
                fieldNames.removeAll();
            }
            fieldNames.addMany(fieldCheckboxes);
            this.createJsonOutput();
        };
        LayerConfigViewModel.prototype.createUniqueLayerId = function (layer) {
            return layer["type"] != null
                ? layer.id
                : layer.layer.id + "_" + layer.id;
        };
        LayerConfigViewModel.prototype.createJsonOutput = function () {
            this.outputJSON = {
                layers: tslib_1.__spreadArrays(this.multiSelectState.toArray().map(this.toJSON.bind(this)))
            };
        };
        LayerConfigViewModel.prototype.isLayerSelected = function (layer) {
            return this.multiSelectState.includes(layer);
        };
        LayerConfigViewModel.prototype.isFieldSelected = function (uniqueId, fieldName) {
            var selectedFields = this.fieldState.get(uniqueId);
            return selectedFields != null ? selectedFields.includes(fieldName) : false;
        };
        LayerConfigViewModel.prototype.areFieldsSelectedForLayer = function (uniqueId) {
            var selectedFields = this.fieldState.get(uniqueId);
            return selectedFields != null && selectedFields.length > 0;
        };
        LayerConfigViewModel.prototype.sortedInsertToAcceptableLayers = function (layerToAdd) {
            var insertIndex = this.acceptableLayers.findIndex(function (layer) {
                return layerToAdd.title < layer.title;
            });
            insertIndex =
                insertIndex != -1 ? insertIndex : this.acceptableLayers.length;
            this.acceptableLayers.add(layerToAdd, insertIndex);
        };
        LayerConfigViewModel.prototype.clearAllSelection = function () {
            this.multiSelectState.removeAll();
            this.fieldState.clear();
        };
        LayerConfigViewModel.prototype.areLayersSelected = function () {
            return this.multiSelectState.length > 0;
        };
        LayerConfigViewModel.prototype.shouldGroupLayerMemberBeShown = function (groupLayerMemberLayerId) {
            return this.groupLayerMemberUseMap_GeomFilter.get(groupLayerMemberLayerId) &&
                this.groupLayerMemberUseMap_CapFilter.get(groupLayerMemberLayerId);
        };
        LayerConfigViewModel.prototype.shouldSublayerBeShown = function (subLayerMemberLayerId) {
            return this.sublayerMemberUseMap_GeomFilter.get(subLayerMemberLayerId);
        };
        LayerConfigViewModel.prototype._loadTileLayerFully = function (layer) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, layer.load()];
                        case 1:
                            _a.sent();
                            return [2, Promise.all(layer.allSublayers.toArray().map(function (sublayer) { return sublayer.load(); }))];
                    }
                });
            });
        };
        LayerConfigViewModel.prototype.toJSON = function (layer) {
            var output;
            var uniqueId = this.createUniqueLayerId(layer);
            if (this.sublayerMemberUseMap_GeomFilter.get(uniqueId) != null) {
                output = {
                    id: layer.layer.id,
                    sublayerId: layer.id
                };
            }
            else {
                output = {
                    id: layer.id
                };
            }
            var fieldsNames = this.fieldState.get(uniqueId);
            if (fieldsNames != null) {
                output.fields = fieldsNames.toArray();
            }
            else {
                output.fields = [];
            }
            return output;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "allowedLayerTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "allowedGeomTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "allowedCapabilities", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "selectionType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "expandStateTracker", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: Boolean
            })
        ], LayerConfigViewModel.prototype, "areLayersDetailsLoading", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: Collection
            })
        ], LayerConfigViewModel.prototype, "acceptableLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "multiSelectState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "fieldState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "stateStore", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], LayerConfigViewModel.prototype, "isReady", void 0);
        LayerConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("LayerConfigViewModel")
        ], LayerConfigViewModel);
        return LayerConfigViewModel;
    }(Accessor));
    return LayerConfigViewModel;
});
