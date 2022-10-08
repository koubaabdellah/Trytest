define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/widgets/support/widget", "./assets", "../../../icons/icons", "../../../widgets/Tips/TipItem", "../../PresetLayerEffectsConfig/PresetLayerEffectsConfig", "../../FileUploadConfig/FileUploadConfig/FileUploadConfigViewModel", "esri/core/watchUtils", "esri/core/Handles"], function (require, exports, tslib_1, decorators_1, Accessor_1, widget_1, assets_1, icons_1, TipItem, PresetLayerEffectsConfig, FileUploadConfigViewModel, watchUtils_1, Handles) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var CountdownSectionsConfigViewModel = (function (_super) {
        tslib_1.__extends(CountdownSectionsConfigViewModel, _super);
        function CountdownSectionsConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.configPanelViewModel = null;
            _this.fields = [];
            _this.numericFields = [];
            _this.stringFields = [];
            _this.sections = [];
            _this.addSection = false;
            _this.editSection = false;
            _this.selectedType = null;
            _this.httpsError = false;
            _this.fileUploadConfigViewModel = new FileUploadConfigViewModel();
            _this.sectionMessages = null;
            _this._handles = new Handles();
            _this._uploading = false;
            return _this;
        }
        CountdownSectionsConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        CountdownSectionsConfigViewModel.prototype.initialize = function () {
            var _this = this;
            this._handles.add(watchUtils_1.whenOnce(this, "configPanelViewModel", function () {
                _this.fileUploadConfigViewModel.configPanelViewModel = _this.configPanelViewModel;
            }));
        };
        CountdownSectionsConfigViewModel.prototype.handleAddNewClick = function () {
            this.addSection = true;
        };
        CountdownSectionsConfigViewModel.prototype.handleCancelClick = function () {
            this._setToDefaults();
        };
        CountdownSectionsConfigViewModel.prototype.handleSaveClick = function () {
            var _a, _b, _c;
            if (this.selectedType === "details") {
                this._getCKEDITORData();
            }
            if (this.selectedType === "countdown" || this.selectedType === "leaderboard") {
                if (((_a = this.section) === null || _a === void 0 ? void 0 : _a.enableFilterField) && !((_b = this.section) === null || _b === void 0 ? void 0 : _b.filterField)) {
                    this.section.filterField = (_c = this.stringFields) === null || _c === void 0 ? void 0 : _c[0].name;
                }
            }
            if (this.editSection) {
                this.sections[this.section.position] = tslib_1.__assign({}, this.section);
            }
            else {
                this.sections.push(tslib_1.__assign(tslib_1.__assign({}, this.section), { position: this.sections.length }));
            }
            this._generateOutput();
            this._setToDefaults();
        };
        CountdownSectionsConfigViewModel.prototype.handleEditSection = function (section) {
            this.selectedType = section.type;
            this.section = section;
            this.editSection = true;
            this.addSection = true;
        };
        CountdownSectionsConfigViewModel.prototype.handleDeleteSection = function (position) {
            this.sections.splice(position, 1);
            this.sections.forEach(function (section, index) { return (section.position = index); });
            this._generateOutput();
        };
        CountdownSectionsConfigViewModel.prototype.handleDuplicateSection = function (position) {
            var section = tslib_1.__assign(tslib_1.__assign({}, this.sections[position]), { position: this.sections.length });
            this.sections.push(section);
            this._generateOutput();
        };
        CountdownSectionsConfigViewModel.prototype.handleListCreation = function (valueList) {
            var _this = this;
            valueList.addEventListener("calciteListOrderChange", function (event) {
                var tmp = [];
                event.detail.forEach(function (index) { return tmp.push(_this.sections[index]); });
                tmp.forEach(function (section, index) { return (section.position = index); });
                _this.sections = tmp;
                _this._generateOutput();
            });
        };
        CountdownSectionsConfigViewModel.prototype.handleSelectCreate = function (field, initValue, select) {
            var _a, _b;
            if (field) {
                if ((_a = this.section) === null || _a === void 0 ? void 0 : _a[field]) {
                    select.value = (_b = this.section) === null || _b === void 0 ? void 0 : _b[field];
                }
                else {
                    this.section[field] = initValue;
                }
            }
        };
        CountdownSectionsConfigViewModel.prototype.handleSelectLayerCreate = function (select) {
            var _this = this;
            var _a, _b;
            this.selectedLayer = null;
            if (this.section.layerId) {
                select.value = this.section.layerId;
                this.selectedLayer = this.featureLayers.find(function (_a) {
                    var id = _a.id;
                    return id === _this.section.layerId;
                });
            }
            if (!this.selectedLayer) {
                this.selectedLayer = (_a = this.featureLayers) === null || _a === void 0 ? void 0 : _a[0];
                this.section.layerId = (_b = this.selectedLayer) === null || _b === void 0 ? void 0 : _b.id;
            }
            this.getFields();
        };
        CountdownSectionsConfigViewModel.prototype.handleFieldMultiSelectCreate = function (select) {
            if (this.section[select.dataset.field]) {
                for (var i = 0; i < select.options.length; i++) {
                    select.options[i].selected = this.section[select.dataset.field].includes(select.options[i].value)
                        ? true
                        : false;
                }
            }
            else {
                this.section[select.dataset.field] = select.value;
            }
        };
        CountdownSectionsConfigViewModel.prototype.handleInput = function (event) {
            var node = event.currentTarget;
            this.section[node.dataset.field] = node.value;
        };
        CountdownSectionsConfigViewModel.prototype.handleSwitch = function (event) {
            var node = event.target;
            if (node.value === "enableMapFilter") {
                this.enableMapFilter = node.checked;
                this.configPanelViewModel.handleDraftData("enableMapFilter", node.checked);
            }
            else if (node.value === "autoplay") {
                this.autoplay = node.checked;
                this.configPanelViewModel.handleDraftData("autoPlay", node.checked);
            }
            else {
                this.section[node.value] = node.checked;
            }
        };
        CountdownSectionsConfigViewModel.prototype.handleSelectLayer = function (event) {
            var _a;
            event.preventDefault();
            var node = event.target;
            this.selectedLayer = this.featureLayers.find(function (_a) {
                var id = _a.id;
                return id === node.value;
            });
            this.section.layerId = (_a = this.selectedLayer) === null || _a === void 0 ? void 0 : _a.id;
        };
        CountdownSectionsConfigViewModel.prototype.handleFieldMultiSelect = function (multiple, event) {
            var node = event.target;
            if (multiple) {
                var tmp = [];
                for (var i = 0; i < node.selectedOptions.length; i++) {
                    tmp.push(node.selectedOptions[i].value);
                }
                this.section[node.dataset.field] = tmp;
            }
            else {
                this.section[node.dataset.field] = node.value;
            }
        };
        CountdownSectionsConfigViewModel.prototype.handleSelect = function (variable, field, event) {
            event.preventDefault();
            var node = event.target;
            if (node.value !== "default") {
                if (variable) {
                    this[variable] = node.value;
                }
                else {
                    this.section[field] = node.value;
                }
            }
            else {
                if (variable) {
                    this[variable] = null;
                }
                else {
                    this.section[field] = null;
                }
            }
        };
        CountdownSectionsConfigViewModel.prototype.handleImportSection = function (event) {
            var _a;
            event.preventDefault();
            var node = event.target;
            var sectionToCopy = this.sections.find(function (_a) {
                var position = _a.position;
                return position.toString() === node.value;
            });
            if (this.section.layerId !== sectionToCopy.layerId) {
                this.selectedLayer = this.featureLayers.find(function (_a) {
                    var id = _a.id;
                    return id === sectionToCopy.layerId;
                });
            }
            var tmpSlide = {
                navTitle: this.section.navTitle,
                type: this.section.type,
                position: this.section.position
            };
            this.section = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this.section), sectionToCopy), tmpSlide);
            if (this.map.portalItem.type === "Web Map" &&
                (this.section.type === "countdown" || this.section.type === "leaderboard")) {
                this.section.presetLayerEffects = ((_a = this.section) === null || _a === void 0 ? void 0 : _a.presetLayerEffects) ? this.section.presetLayerEffects
                    : {
                        id: "muted-blur",
                        data: {
                            includedEffect: "",
                            excludedEffect: "blur(3px) opacity(50%)"
                        }
                    };
                this.presetLayerEffects.selectedEffect = this.section.presetLayerEffects;
            }
        };
        CountdownSectionsConfigViewModel.prototype.toggleSectionVisibility = function (position, actionBtn) {
            this.sections[position].enabled = !this.sections[position].enabled;
            actionBtn.icon = this.sections[position].enabled ? icons_1.default.viewVisible : icons_1.default.viewHide;
            this._generateOutput();
        };
        CountdownSectionsConfigViewModel.prototype.getFields = function () {
            var _a;
            this.fields = [];
            this.numericFields = [];
            this.stringFields = [];
            if ((_a = this.selectedLayer) === null || _a === void 0 ? void 0 : _a.fields) {
                this._updateFields();
            }
            else {
                try {
                    this.selectedLayer.load();
                }
                catch (_b) {
                }
                finally {
                    this._updateFields();
                }
            }
        };
        CountdownSectionsConfigViewModel.prototype.setTooltips = function (sectionMessages) {
            var _a = sectionMessages.sections, details = _a.details, countdown = _a.countdown, leaderboard = _a.leaderboard;
            return {
                details: {
                    details: new TipItem({
                        id: "tooltip-icon-details",
                        fieldName: "details",
                        tip: details.tooltip,
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    navTitle: new TipItem({
                        id: "tooltip-icon-navTitle",
                        fieldName: "navTitle",
                        tip: details.navTitleTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    title: new TipItem({
                        id: "tooltip-icon-title",
                        fieldName: "title",
                        tip: details.titleTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    content: new TipItem({
                        id: "tooltip-icon-content",
                        fieldName: "content",
                        tip: details.contentTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    buttonText: new TipItem({
                        id: "tooltip-icon-buttonText",
                        fieldName: "buttonText",
                        tip: details.buttonTextTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    })
                },
                ranking: {
                    countdown: new TipItem({
                        id: "tooltip-icon-countdown",
                        fieldName: "countdown",
                        tip: countdown.countdownTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    leaderboard: new TipItem({
                        id: "tooltip-icon-leaderboard",
                        fieldName: "leaderboard",
                        tip: leaderboard.leaderboardTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    navTitle: new TipItem({
                        id: "tooltip-icon-navTitle",
                        fieldName: "navTitle",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    layer: new TipItem({
                        id: "tooltip-icon-layer",
                        fieldName: "layer",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    field: new TipItem({
                        id: "tooltip-icon-field",
                        fieldName: "field",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    order: new TipItem({
                        id: "tooltip-icon-order",
                        fieldName: "order",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    featuresDisplayed: new TipItem({
                        id: "tooltip-icon-featuresDisplayed",
                        fieldName: "featuresDisplayed",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    featureFilter: new TipItem({
                        id: "tooltip-icon-featureFilter",
                        fieldName: "featureFilter",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    zoomScale: new TipItem({
                        id: "tooltip-icon-zoomScale",
                        fieldName: "zoomScale",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    enableFilterFieldleaderboard: new TipItem({
                        id: "tooltip-icon-enableFilterField-leaderboard",
                        fieldName: "enableFilterField-leaderboard",
                        configPanelViewModel: this.configPanelViewModel,
                        tip: leaderboard.filterFieldTooltip
                    }),
                    enableFilterFieldcountdown: new TipItem({
                        id: "tooltip-icon-enableFilterField-countdown",
                        fieldName: "enableFilterField-countdown",
                        configPanelViewModel: this.configPanelViewModel,
                        tip: countdown.filterFieldTooltip
                    }),
                    buttonText: new TipItem({
                        id: "tooltip-icon-buttonText",
                        fieldName: "buttonText",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    pagingLabel: new TipItem({
                        id: "tooltip-icon-pagingLabel",
                        fieldName: "pagingLabel",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    highlight: new TipItem({
                        id: "tooltip-icon-highlight",
                        fieldName: "highlight",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    excludedEffect: new TipItem({
                        id: "tooltip-icon-excludedEffect",
                        fieldName: "excludedEffect",
                        configPanelViewModel: this.configPanelViewModel
                    }),
                    importSection: new TipItem({
                        id: "tooltip-icon-importSection",
                        fieldName: "importSection",
                        tip: sectionMessages.importSectionTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    })
                }
            };
        };
        CountdownSectionsConfigViewModel.prototype.initializeSections = function () {
            var _this = this;
            var _a;
            this._initFeatureLayer();
            if (this.map.portalItem.type === "Web Map") {
                this.presetLayerEffects = new PresetLayerEffectsConfig({
                    selectedEffect: (_a = this.section) === null || _a === void 0 ? void 0 : _a.presetLayerEffects,
                    configPanelViewModel: this.configPanelViewModel,
                    tipItem: new TipItem({
                        id: "tooltip-icon-preset-layer-effects",
                        fieldName: "preset-layer-effects",
                        tip: this.sectionMessages.presetLayerEffectsTooltip,
                        configPanelViewModel: this.configPanelViewModel
                    })
                });
            }
            var updateOutput = false;
            if (!this.sections || !this.sections.length) {
                this.sections = assets_1.initialSections;
                this.sections.forEach(function (section) {
                    var _a, _b, _c, _d;
                    if (section.type === "countdown" || section.type === "leaderboard") {
                        section.layerId = (_b = (_a = _this.featureLayers) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
                        section.field = (_d = (_c = _this.numericFields) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.name;
                    }
                });
                updateOutput = true;
            }
            else {
                this.sections.forEach(function (section) {
                    if (section.type === "countdown" || section.type === "leaderboard") {
                        if (section === null || section === void 0 ? void 0 : section.layerId) {
                            var i = _this.featureLayers.findIndex(function (_a) {
                                var id = _a.id;
                                return section.layerId === id;
                            });
                            if (i < 0) {
                                _this._setInitFields(section);
                                updateOutput = true;
                            }
                            if (!(section === null || section === void 0 ? void 0 : section.field)) {
                                var layer = _this.featureLayers[i < 0 ? 0 : i];
                                var layerFields = _this._getFields(layer);
                                section.field = layerFields.numberField;
                                section.filterField = layerFields.stringField;
                                updateOutput = true;
                            }
                        }
                        else {
                            _this._setInitFields(section);
                            updateOutput = true;
                        }
                        if (!(section === null || section === void 0 ? void 0 : section.presetLayerEffects) && _this.map.portalItem.type === "Web Map") {
                            delete section.excludedEffect;
                            section.presetLayerEffects = {
                                id: "muted-grayscale",
                                data: {
                                    includedEffect: "",
                                    excludedEffect: "grayscale(100%) opacity(50%)"
                                }
                            };
                            updateOutput = true;
                        }
                    }
                });
            }
            this.sections.forEach(function (section, index) { return (section.position = index); });
            if (updateOutput) {
                setTimeout(function () {
                    _this._generateOutput();
                }, 5000);
            }
        };
        CountdownSectionsConfigViewModel.prototype.handleCKEditorCreation = function (node) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, imageUploadEditing;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this._editor) {
                                this._editor.destroy();
                            }
                            _a = this;
                            return [4, ClassicEditor.create(node, assets_1.DEFAULT_CONFIG)];
                        case 1:
                            _a._editor = _b.sent();
                            imageUploadEditing = this._editor.plugins.get("ImageUploadEditing");
                            imageUploadEditing.on("uploadComplete", this._getImageUploadCallback());
                            this._editor.model.document.on("change:data", function () {
                                var editorData = _this._editor.getData();
                                _this.httpsError = (editorData === null || editorData === void 0 ? void 0 : editorData.includes('href="http://')) || (editorData === null || editorData === void 0 ? void 0 : editorData.includes('src="http://'));
                            });
                            return [2];
                    }
                });
            });
        };
        CountdownSectionsConfigViewModel.prototype._generateOutput = function () {
            this.set("outputJSON", tslib_1.__spreadArrays(this.sections));
        };
        CountdownSectionsConfigViewModel.prototype._initFeatureLayer = function () {
            var _a;
            this.featureLayers = (_a = this.map.allLayers) === null || _a === void 0 ? void 0 : _a.toArray().filter(function (layer) { return layer.type === "feature"; });
            for (var _i = 0, _b = this.featureLayers; _i < _b.length; _i++) {
                var layer = _b[_i];
                this.selectedLayer = layer;
                this.getFields();
                if (this.numericFields.length) {
                    break;
                }
            }
        };
        CountdownSectionsConfigViewModel.prototype._setToDefaults = function () {
            this.editSection = false;
            this.selectedType = null;
            this.section = null;
            this.addSection = false;
        };
        CountdownSectionsConfigViewModel.prototype._getCKEDITORData = function () {
            var _a, _b, _c;
            if (!this._editor) {
                return;
            }
            var editorData = (_a = this._editor) === null || _a === void 0 ? void 0 : _a.getData();
            var sanitizedData = (_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.sanitizer) === null || _c === void 0 ? void 0 : _c.sanitize(editorData);
            this.section.content = sanitizedData;
        };
        CountdownSectionsConfigViewModel.prototype._updateFields = function () {
            var _this = this;
            var _a, _b;
            (_b = (_a = this.selectedLayer) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (field) {
                var _a;
                if (field.name !== ((_a = _this.selectedLayer) === null || _a === void 0 ? void 0 : _a.objectIdField)) {
                    _this.fields.push({ alias: field === null || field === void 0 ? void 0 : field.alias, name: field.name });
                    if (field.type === "small-integer" ||
                        field.type === "integer" ||
                        field.type === "single" ||
                        field.type === "double" ||
                        field.type === "long") {
                        _this.numericFields.push({ alias: field === null || field === void 0 ? void 0 : field.alias, name: field.name });
                    }
                    else if (field.type === "string") {
                        _this.stringFields.push({ alias: field === null || field === void 0 ? void 0 : field.alias, name: field.name });
                    }
                }
            });
            this.fields.sort();
            this.numericFields.sort();
            this.stringFields.sort();
        };
        CountdownSectionsConfigViewModel.prototype._getFields = function (layer) {
            var _a;
            var fields = {
                numberField: null,
                stringField: null
            };
            for (var i = 0; i < ((_a = layer.fields) === null || _a === void 0 ? void 0 : _a.length); i++) {
                var field = layer.fields[i];
                if (field.name !== (layer === null || layer === void 0 ? void 0 : layer.objectIdField)) {
                    if (field.type === "small-integer" ||
                        field.type === "integer" ||
                        field.type === "single" ||
                        field.type === "double" ||
                        field.type === "long") {
                        fields.numberField = field.name;
                    }
                    else if (field.type === "string") {
                        fields.stringField = field.name;
                    }
                    if (fields.numberField && fields.stringField) {
                        break;
                    }
                }
            }
            return fields;
        };
        CountdownSectionsConfigViewModel.prototype._setInitFields = function (section) {
            var _a, _b, _c, _d, _e, _f;
            section.layerId = (_b = (_a = this.featureLayers) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id;
            section.field = (_d = (_c = this.numericFields) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.name;
            section.filterField = (_f = (_e = this.stringFields) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.name;
        };
        CountdownSectionsConfigViewModel.prototype._getImageUploadCallback = function () {
            var _this = this;
            return function (evt, _a) {
                var data = _a.data, imageElement = _a.imageElement;
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var base64Uri, blob, size, type, file, url, value;
                    var _this = this;
                    var _b, _c, _d, _e;
                    return tslib_1.__generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                base64Uri = data.default;
                                blob = this.fileUploadConfigViewModel.dataUriToBlob(base64Uri);
                                size = blob.size, type = blob.type;
                                file = {
                                    name: "countdown_textEditor_" + Date.now() + "." + blob.type.split("/")[1],
                                    size: size,
                                    type: type
                                };
                                this._uploading = true;
                                this.notifyChange("state");
                                return [4, this.fileUploadConfigViewModel.handlePortalItemResourceRequest(file, blob)];
                            case 1:
                                url = _f.sent();
                                value = ((_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.draft) === null || _c === void 0 ? void 0 : _c.uploads) ? tslib_1.__spreadArrays((_e = (_d = this.configPanelViewModel) === null || _d === void 0 ? void 0 : _d.draft) === null || _e === void 0 ? void 0 : _e.uploads, [url]) : [url];
                                return [4, this.configPanelViewModel.handleDraftData("uploads", value)];
                            case 2:
                                _f.sent();
                                this._editor.model.change(function (writer) {
                                    url = url.replace("http://", "https://");
                                    writer.setAttribute("src", url, imageElement);
                                    _this._uploading = false;
                                    _this.notifyChange("state");
                                });
                                return [2];
                        }
                    });
                });
            };
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "featureLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "fields", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "numericFields", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "stringFields", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "sections", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "section", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "addSection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "editSection", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "selectedType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "filterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "enableMapFilter", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "autoplay", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "httpsError", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "presetLayerEffects", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "fileUploadConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfigViewModel.prototype, "sectionMessages", void 0);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], CountdownSectionsConfigViewModel.prototype, "handleEditSection", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], CountdownSectionsConfigViewModel.prototype, "handleDeleteSection", null);
        tslib_1.__decorate([
            widget_1.accessibleHandler()
        ], CountdownSectionsConfigViewModel.prototype, "handleDuplicateSection", null);
        CountdownSectionsConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("app.configWidgets.CountdownSectionsConfig.CountdownSectionsConfigViewModel")
        ], CountdownSectionsConfigViewModel);
        return CountdownSectionsConfigViewModel;
    }(Accessor_1.default));
    exports.default = CountdownSectionsConfigViewModel;
});
