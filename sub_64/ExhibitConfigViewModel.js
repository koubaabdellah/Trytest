define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "esri/views/MapView", "esri/views/SceneView", "esri/Basemap", "esri/widgets/Expand", "esri/core/reactiveUtils", "esri/core/Collection", "esri/widgets/Bookmarks/BookmarksViewModel", "esri/Graphic", "../SlideOptions", "../../../utils/contrastUtil", "./assets", "../../FileUploadConfig/FileUploadConfig/FileUploadConfigViewModel", "TemplatesCommonLib/functionality/token"], function (require, exports, tslib_1, decorators_1, Accessor_1, Handles, MapView, SceneView, Basemap, Expand, reactiveUtils_1, Collection, BookmarksViewModel, Graphic, SlideOptions, contrastUtil_1, assets_1, FileUploadConfigViewModel, token_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var ExhibitConfigViewModel = (function (_super) {
        tslib_1.__extends(ExhibitConfigViewModel, _super);
        function ExhibitConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.isConfirmed = false;
            _this.selectedSetting = "map";
            _this.slideLayers = [];
            _this.popupLayers = [];
            _this.slides = new Collection();
            _this.initSlides = new Collection();
            _this.transition = "animate";
            _this.slideNote1HTTPSError = false;
            _this.slideNote2HTTPSError = false;
            _this.fileUploadConfigViewModel = new FileUploadConfigViewModel();
            _this._handles = new Handles();
            _this._editorInstances = {};
            _this._initDefExpr = {};
            return _this;
        }
        ExhibitConfigViewModel.prototype.destroy = function () {
            this.view = null;
            this._handles.removeAll();
            this._handles.destroy();
        };
        ExhibitConfigViewModel.prototype.initialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { return _this.configPanelViewModel; })];
                        case 1:
                            _a.sent();
                            this.fileUploadConfigViewModel.configPanelViewModel = this.configPanelViewModel;
                            return [2];
                    }
                });
            });
        };
        ExhibitConfigViewModel.prototype.initializeMapView = function () {
            var _this = this;
            var _a, _b;
            var viewContainer = document.getElementById("slideView");
            viewContainer.style.visibility = "hidden";
            this._initBasemap = this.map.basemap;
            this.slideLayers = [];
            this.map.allLayers.forEach(function (layer) {
                var _a;
                if (layer.type === "feature") {
                    var featureLayer = layer;
                    _this.slideLayers.push(featureLayer);
                    _this._initDefExpr = tslib_1.__assign(tslib_1.__assign({}, _this._initDefExpr), (_a = {}, _a[featureLayer.id] = featureLayer.definitionExpression, _a));
                }
                else if (layer.type === "scene" || layer.type === "building-scene") {
                    var sceneLayer = layer;
                    _this.slideLayers.push(sceneLayer);
                }
            });
            this.handleSlideFilter((_a = this.slide.map) === null || _a === void 0 ? void 0 : _a.filter);
            if (this.map.portalItem.type === "Web Map") {
                this.view = new MapView({
                    map: this.map,
                    container: "slideView"
                });
                var _c = this.view.constraints, maxScale = _c.maxScale, minScale = _c.minScale;
                this._initScale = {
                    maxScale: maxScale,
                    minScale: minScale
                };
                if ((_b = this.slide.map.goTo) === null || _b === void 0 ? void 0 : _b.timeExtent) {
                    this.view.timeExtent = this.slide.map.goTo.timeExtent;
                }
            }
            else if (this.map.portalItem.type === "Web Scene") {
                this.view = new SceneView({
                    map: this.map,
                    container: "slideView"
                });
                var altitude = this.view.constraints.altitude;
                this._initAltitude = {
                    max: altitude.max,
                    min: altitude.min
                };
            }
            this._updateBasemap(this.slide.map.basemapId);
            this.view.when(function () {
                var slideOptions = new SlideOptions({
                    map: _this.map,
                    view: _this.view,
                    viewModel: _this
                });
                var expand = new Expand({
                    id: "slide-panel",
                    expandIconClass: "esri-icon-drag-horizontal",
                    view: _this.view,
                    expanded: true,
                    content: slideOptions
                });
                _this.view.ui.add(expand, { position: "top-left", index: 0 });
                _this._saveInitGoTo();
                _this.goTo();
                _this._handles.add(_this.view.on("click", function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var response, graphics_1, graphic, layer;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.slide.map.includePopup) return [3, 2];
                                return [4, this.view.hitTest(event, { include: this.popupLayers })];
                            case 1:
                                response = _a.sent();
                                if (response.results.length) {
                                    graphics_1 = [];
                                    response.results.forEach(function (result) { return graphics_1.push(result.graphic); });
                                    if (this.slide.map.includePopup && (graphics_1 === null || graphics_1 === void 0 ? void 0 : graphics_1.length)) {
                                        this.view.popup.watch("selectedFeature", function (selectedFeature) {
                                            _this._setSlidePopup(selectedFeature, event.mapPoint);
                                        });
                                    }
                                    graphic = graphics_1 === null || graphics_1 === void 0 ? void 0 : graphics_1[0];
                                    layer = graphic === null || graphic === void 0 ? void 0 : graphic.layer;
                                    if (layer && layer.popupEnabled) {
                                        this.view.popup.open({
                                            location: event.mapPoint,
                                            features: graphics_1,
                                            fetchFeatures: true
                                        });
                                    }
                                }
                                _a.label = 2;
                            case 2: return [2];
                        }
                    });
                }); }));
                _this._handleSliderNoteEnabled("slideNote1", _this.slide.slideContent.slideNote1Enabled);
                _this._handleSliderNoteEnabled("slideNote2", _this.slide.slideContent.slideNote2Enabled);
                _this._handleIncludePopup();
                _this._handleInitDisableScroll();
                viewContainer.style.visibility = "visible";
            });
        };
        ExhibitConfigViewModel.prototype.handleImportBookmarks = function () {
            var _this = this;
            var _a, _b, _c;
            var update = false;
            if (this.configPanelViewModel.map.portalItem.type === "Web Map") {
                var map = this.configPanelViewModel.map;
                if ((_a = map.bookmarks) === null || _a === void 0 ? void 0 : _a.length) {
                    var hiddenLayers_1 = [];
                    map.allLayers.forEach(function (layer) {
                        if (!layer.visible &&
                            (layer.type === "feature" ||
                                layer.type === "tile" ||
                                layer.type === "map-image" ||
                                layer.type === "imagery" ||
                                layer.type === "map-notes" ||
                                layer.type === "graphics")) {
                            hiddenLayers_1.push(layer.id);
                        }
                    });
                    map.bookmarks.forEach(function (bkmrk, index) {
                        if (!_this.slides.find(function (_a) {
                            var bookmark = _a.bookmark;
                            return bookmark === bkmrk.name;
                        })) {
                            var _a = bkmrk.viewpoint, scale = _a.scale, targetGeometry = _a.targetGeometry;
                            var _b = targetGeometry.extent.center, x = _b.x, y = _b.y;
                            var exhibit = JSON.parse(JSON.stringify(assets_1.defaultSlide));
                            exhibit.slideContent.slideNote1Enabled = false;
                            exhibit.slideContent.slideNote2Enabled = false;
                            exhibit.slideContent.slideNote1.content = _this.messages.initialNoteText;
                            exhibit.slideContent.slideNote2.content = _this.messages.initialNoteText;
                            exhibit.id = new Date().getTime() + index;
                            exhibit.slideContent.title = bkmrk.name;
                            exhibit.map.goTo = {
                                center: {
                                    x: x,
                                    y: y
                                },
                                scale: scale
                            };
                            if (bkmrk === null || bkmrk === void 0 ? void 0 : bkmrk.timeExtent) {
                                exhibit.map.goTo.timeExtent = {
                                    start: bkmrk.timeExtent.start,
                                    end: bkmrk.timeExtent.end
                                };
                            }
                            exhibit.map.hiddenLayers = hiddenLayers_1;
                            var bookmarkSlide = tslib_1.__assign(tslib_1.__assign({}, exhibit), { bookmark: bkmrk.name });
                            _this.slides.push(bookmarkSlide);
                            update = true;
                        }
                    });
                }
            }
            else if (this.configPanelViewModel.map.portalItem.type === "Web Scene") {
                var map_1 = this.configPanelViewModel.map;
                if ((_c = (_b = map_1 === null || map_1 === void 0 ? void 0 : map_1.presentation) === null || _b === void 0 ? void 0 : _b.slides) === null || _c === void 0 ? void 0 : _c.length) {
                    map_1.presentation.slides.forEach(function (slide, index) {
                        if (!_this.slides.find(function (_a) {
                            var bookmark = _a.bookmark;
                            return bookmark === slide.id;
                        })) {
                            var _a = slide.viewpoint.camera, fov = _a.fov, heading = _a.heading, tilt = _a.tilt;
                            var _b = slide.viewpoint.camera.position, x = _b.x, y = _b.y, z = _b.z;
                            var exhibit = JSON.parse(JSON.stringify(assets_1.defaultSlide));
                            exhibit.id = new Date().getTime() + index;
                            exhibit.slideContent.title = slide.title.text;
                            exhibit.slideContent.slideNote1Enabled = false;
                            exhibit.slideContent.slideNote2Enabled = false;
                            exhibit.slideContent.slideNote1.content = _this.messages.initialNoteText;
                            exhibit.slideContent.slideNote2.content = _this.messages.initialNoteText;
                            exhibit.map.goTo = { camera: { x: x, y: y, z: z, fov: fov, heading: heading, tilt: tilt } };
                            var hiddenLayers_2 = [];
                            map_1.allLayers.forEach(function (layer) {
                                if (!slide.visibleLayers.find(function (_a) {
                                    var id = _a.id;
                                    return id === layer.id;
                                }) &&
                                    (layer.type === "feature" ||
                                        layer.type === "tile" ||
                                        layer.type === "map-image" ||
                                        layer.type === "imagery" ||
                                        layer.type === "map-notes" ||
                                        layer.type === "scene" ||
                                        layer.type === "building-scene" ||
                                        layer.type === "graphics")) {
                                    hiddenLayers_2.push(layer.id);
                                }
                            });
                            exhibit.map.hiddenLayers = hiddenLayers_2;
                            if (map_1.basemap.id !== slide.basemap.id) {
                                exhibit.map.basemapId = slide.basemap.id;
                            }
                            var bookmarkSlide = tslib_1.__assign(tslib_1.__assign({}, exhibit), { bookmark: slide.id });
                            _this.slides.push(bookmarkSlide);
                            update = true;
                        }
                    });
                }
            }
            if (update) {
                this.generateOutput();
            }
        };
        ExhibitConfigViewModel.prototype.handleColorPickerCreate = function (field, showNote, colorPicker) {
            var button = document.getElementById("color-picker-button-" + field);
            colorPicker.addEventListener("click", function (event) { return event.preventDefault(); });
            colorPicker.addEventListener("calciteColorPickerChange", this._handleColorPicker.bind(this, field, showNote, button));
        };
        ExhibitConfigViewModel.prototype.handleSwitch = function (field, event) {
            var node = event.target;
            this.slide[this.selectedSetting][field] = node.checked;
            if (field === "slideNote1Enabled") {
                this._handleSliderNoteEnabled("slideNote1", this.slide[this.selectedSetting][field]);
            }
            else if (field === "slideNote2Enabled") {
                this._handleSliderNoteEnabled("slideNote2", this.slide[this.selectedSetting][field]);
            }
            else if (field === "includePopup") {
                this._handleIncludePopup();
            }
            else if (field === "disableScroll") {
                this._handleDisableScroll();
            }
        };
        ExhibitConfigViewModel.prototype.handleSwitchKeyDown = function (field, e) {
            if (e.code === "Space" || e.code === "Enter") {
                var node = e.target;
                this.slide[this.selectedSetting][field] = node.checked;
                if (field === "slideNote1Enabled") {
                    this._handleSliderNoteEnabled("slideNote1", this.slide[this.selectedSetting][field]);
                }
                else if (field === "slideNote2Enabled") {
                    this._handleSliderNoteEnabled("slideNote2", this.slide[this.selectedSetting][field]);
                }
                else if (field === "includePopup") {
                    this._handleIncludePopup();
                }
                else if (field === "disableScroll") {
                    this._handleDisableScroll();
                }
            }
        };
        ExhibitConfigViewModel.prototype.handleCKEditorCreation = function (field, showNote, node) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var editor, imageUploadEditing, modalSave;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, ClassicEditor.create(node, assets_1.DEFAULT_CONFIG)];
                        case 1:
                            editor = _a.sent();
                            this._editorInstances[field] = editor;
                            this._editorInstances[field].ui.view.element.id = field + "-cke-main";
                            imageUploadEditing = this._editorInstances[field].plugins.get("ImageUploadEditing");
                            this._updateSliderNoteColor("slideNote1");
                            this._updateSliderNoteColor("slideNote2");
                            imageUploadEditing.on("uploadComplete", this._getImageUploadCallback(field));
                            modalSave = document.getElementById("exhibit-modal-close-btn");
                            editor.model.document.on("change:data", function () {
                                var _a, _b;
                                var editorData = editor.getData();
                                var sanitizedData = (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.sanitizer) === null || _b === void 0 ? void 0 : _b.sanitize(editorData);
                                _this.slide.slideContent[field].content = sanitizedData;
                                if (field === "slideNote1") {
                                    _this.slideNote1HTTPSError = (sanitizedData === null || sanitizedData === void 0 ? void 0 : sanitizedData.includes('href="http://')) || (sanitizedData === null || sanitizedData === void 0 ? void 0 : sanitizedData.includes('src="http://'));
                                }
                                if (field === "slideNote2") {
                                    _this.slideNote2HTTPSError = (sanitizedData === null || sanitizedData === void 0 ? void 0 : sanitizedData.includes('href="http://')) || (sanitizedData === null || sanitizedData === void 0 ? void 0 : sanitizedData.includes('src="http://'));
                                }
                                if (modalSave) {
                                    modalSave.disabled = _this.slideNote1HTTPSError || _this.slideNote2HTTPSError;
                                }
                                if (_this.slide.slideContent[showNote]) {
                                    _this._updateSliderNoteContent(field);
                                }
                            });
                            return [2];
                    }
                });
            });
        };
        ExhibitConfigViewModel.prototype.handleTitleInput = function (event) {
            var node = event.currentTarget;
            this.slide.slideContent.title = node.value;
        };
        ExhibitConfigViewModel.prototype.handleSelectNoteCreate = function (field, select) {
            select.value = this.slide.slideContent[field].position;
        };
        ExhibitConfigViewModel.prototype.handleSelectNote = function (field, event) {
            event.preventDefault();
            var node = event.target;
            this.slide.slideContent[field].position = node.value;
            this.view.ui.move(field, node.value);
        };
        ExhibitConfigViewModel.prototype.handleSelectTransitionCreate = function (select) {
            select.value = this.transition;
        };
        ExhibitConfigViewModel.prototype.handleSelectTransition = function (event) {
            event.preventDefault();
            var node = event.target;
            this.transition = node.value;
            this.generateOutput();
        };
        ExhibitConfigViewModel.prototype.handleRemovePopup = function () {
            this.slide.map.popup = null;
            this.view.popup.visible = false;
        };
        ExhibitConfigViewModel.prototype.handleBasemapSelector = function (basemapId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var selected;
                return tslib_1.__generator(this, function (_a) {
                    if (basemapId === this.initBasemapId) {
                        this.basemapSelector.savedState = {
                            chosenBasemapId: null
                        };
                        this.map.basemap = this._initBasemap;
                        this.slide.map.basemapId = null;
                        selected = document.querySelector(".esri-basemap-gallery__item--selected");
                        if (selected) {
                            selected.setAttribute("aria-selected", "false");
                            selected.className = "esri-basemap-gallery__item";
                        }
                    }
                    else if (basemapId !== this.slide.map.basemapId) {
                        this.slide.map.basemapId = basemapId;
                        this._updateBasemap(basemapId);
                    }
                    return [2];
                });
            });
        };
        ExhibitConfigViewModel.prototype.checkNoteContentContrast = function (field) {
            var _this = this;
            var _a;
            var contentArray = (_a = this.slide.slideContent[field].content) === null || _a === void 0 ? void 0 : _a.split("color:");
            var contrast;
            contentArray === null || contentArray === void 0 ? void 0 : contentArray.shift();
            if (contentArray === null || contentArray === void 0 ? void 0 : contentArray.length) {
                var count_1 = 0;
                contentArray.forEach(function (color) {
                    var fontColor = color.startsWith("#") ? color.slice(0, 7) : color.startsWith("hsl") ? contrastUtil_1.hslToHex(color) : null;
                    if (fontColor) {
                        contrast = contrastUtil_1.checkContrast(_this.slide.slideContent[field].backgroundColor, fontColor);
                    }
                    if (contrast && !contrast.passesDoubleA) {
                        _this.contrastError = {
                            background: _this.slide.slideContent[field].backgroundColor,
                            text: fontColor,
                            ratio: contrast.contrast
                        };
                        count_1++;
                    }
                });
                return count_1 > 0;
            }
            else {
                contrast = contrastUtil_1.checkContrast(this.slide.slideContent[field].backgroundColor, "#000000");
                if (!contrast.passesDoubleA) {
                    this.contrastError = {
                        background: this.slide.slideContent[field].backgroundColor,
                        text: "#000000",
                        ratio: contrast.contrast
                    };
                }
                return !(contrast === null || contrast === void 0 ? void 0 : contrast.passesDoubleA);
            }
        };
        ExhibitConfigViewModel.prototype.handleSlideNoteColors = function () {
            var colors = [];
            this.slides.forEach(function (slide) {
                var _a = slide.slideContent, slideNote1 = _a.slideNote1, slideNote2 = _a.slideNote2;
                if (!colors.includes(slideNote1.backgroundColor)) {
                    colors.push(slideNote1.backgroundColor);
                }
                if (!colors.includes(slideNote2.backgroundColor)) {
                    colors.push(slideNote2.backgroundColor);
                }
            });
            return colors;
        };
        ExhibitConfigViewModel.prototype.handleRecentColorClick = function (color, field, event) {
            this.slide.slideContent[field].backgroundColor = color;
            var cp = document.getElementById("color-picker-" + field);
            if (cp) {
                cp.value = color;
                this._updateSliderNoteColor(field);
            }
        };
        ExhibitConfigViewModel.prototype.handleSlideListClick = function (event) {
            var _a;
            for (var i = 0; i < this.slides.length; i++) {
                if ((_a = event.detail) === null || _a === void 0 ? void 0 : _a.has(this.slides.getItemAt(i).id)) {
                    this.configPanelViewModel.handleDraftData("slideIndex", i);
                    break;
                }
            }
        };
        ExhibitConfigViewModel.prototype.handleSlideFilter = function (filter) {
            var _this = this;
            if (!filter)
                return;
            var layerExpressions = filter.layerExpressions;
            if (layerExpressions.length) {
                this.map.allLayers.forEach(function (layer) {
                    var _a;
                    if (layer.type === "feature") {
                        var featureLayer_1 = layer;
                        var layerExpression = layerExpressions.find(function (_a) {
                            var id = _a.id;
                            return id === featureLayer_1.id;
                        });
                        if (layerExpression) {
                            var defExpr_1 = [];
                            layerExpression.expressions.forEach(function (expression) {
                                defExpr_1.push(expression.definitionExpression);
                            });
                            if (featureLayer_1.id === layerExpression.id) {
                                featureLayer_1.definitionExpression = ((_a = _this._initDefExpr) === null || _a === void 0 ? void 0 : _a[featureLayer_1.id]) ? "(" + _this._initDefExpr[featureLayer_1.id] + ") AND " + defExpr_1.join(layerExpression.operator)
                                    : defExpr_1.join(layerExpression.operator);
                            }
                        }
                        else {
                            featureLayer_1.definitionExpression = _this._initDefExpr[featureLayer_1.id];
                        }
                    }
                });
            }
            else {
                this.map.allLayers.map(function (layer) {
                    if (layer.type === "feature") {
                        var featureLayer = layer;
                        featureLayer.definitionExpression = _this._initDefExpr[featureLayer.id];
                    }
                });
            }
        };
        ExhibitConfigViewModel.prototype.handleCreateLayerVisibility = function (layer, item) {
            var _this = this;
            if (this.slide.map.hiddenLayers.includes(layer.id)) {
                layer.visible = false;
            }
            else {
                item.selected = true;
                if (layer.type === "feature" || layer.type === "scene" || layer.type === "building-scene") {
                    this.popupLayers.push(layer);
                }
            }
            item.addEventListener("calciteListItemChange", function (event) {
                var _a;
                if (event.detail.selected) {
                    var slideIndex = _this.slide.map.hiddenLayers.findIndex(function (id) { return id === layer.id; });
                    var popupIndex = _this.popupLayers.findIndex(function (_a) {
                        var id = _a.id;
                        return id === layer.id;
                    });
                    layer.visible = true;
                    if (((_a = _this.slide.map.popup) === null || _a === void 0 ? void 0 : _a.layerId) === layer.id) {
                        _this.handleRemovePopup();
                    }
                    if (slideIndex > -1) {
                        _this.slide.map.hiddenLayers.splice(slideIndex, 1);
                    }
                    if (popupIndex > -1) {
                        _this.popupLayers.splice(popupIndex, 1);
                    }
                }
                else {
                    if (layer.type === "feature") {
                        _this.popupLayers.push(layer);
                    }
                    _this.slide.map.hiddenLayers.push(layer.id);
                    layer.visible = false;
                }
            });
        };
        ExhibitConfigViewModel.prototype.handleListOrderChange = function (event) {
            var _this = this;
            var tmp = new Collection();
            event.detail.map(function (newId) { return tmp.push(tslib_1.__assign({}, _this.slides.find(function (_a) {
                var id = _a.id;
                return id === Number(newId);
            }))); });
            this.slides = tmp.clone();
            this.generateOutput();
        };
        ExhibitConfigViewModel.prototype.handleDuplicateSlide = function (slideId) {
            var slide = JSON.parse(JSON.stringify(this.slides.find(function (_a) {
                var id = _a.id;
                return id === slideId;
            })));
            slide.id = new Date().getTime();
            this.slides.push(slide);
            this.generateOutput();
        };
        ExhibitConfigViewModel.prototype.handleKeydownDuplicateSlide = function (slideId, event) {
            if (event.key === " " || event.key === "Enter") {
                var slide = JSON.parse(JSON.stringify(this.slides.find(function (_a) {
                    var id = _a.id;
                    return id === slideId;
                })));
                slide.id = new Date().getTime();
                this.slides.push(slide);
                this.generateOutput();
            }
        };
        ExhibitConfigViewModel.prototype.handleDeleteSlide = function (slideId) {
            var index = this.slides.findIndex(function (_a) {
                var id = _a.id;
                return id === slideId;
            });
            if (index > -1) {
                this.slides.splice(index, 1);
                this.generateOutput();
            }
        };
        ExhibitConfigViewModel.prototype.handleKeydownDeleteSlide = function (slideId, event) {
            if (event.key === " " || event.key === "Enter") {
                var index = this.slides.findIndex(function (_a) {
                    var id = _a.id;
                    return id === slideId;
                });
                if (index > -1) {
                    this.slides.splice(index, 1);
                    this.generateOutput();
                }
            }
        };
        ExhibitConfigViewModel.prototype.handleSaveGoTo = function () {
            var _a, _b, _c, _d, _e;
            if (this.map.portalItem.type === "Web Map") {
                this.slide.map.goTo = {
                    timeExtent: (_c = (_b = (_a = this.slide) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.goTo) === null || _c === void 0 ? void 0 : _c.timeExtent,
                    center: {
                        x: this.view.center.x,
                        y: this.view.center.y
                    },
                    scale: this.view.scale
                };
                if ((_d = this.slide) === null || _d === void 0 ? void 0 : _d.bookmark) {
                    (_e = this.slide) === null || _e === void 0 ? true : delete _e.bookmark;
                }
            }
            else if (this.map.portalItem.type === "Web Scene") {
                var camera = this.view.camera;
                var fov = camera.fov, heading = camera.heading, position = camera.position, tilt = camera.tilt;
                this.slide.map.goTo = {
                    camera: {
                        x: position.x,
                        y: position.y,
                        z: position.z,
                        fov: fov,
                        heading: heading,
                        tilt: tilt
                    }
                };
            }
        };
        ExhibitConfigViewModel.prototype.handleSaveNewSlide = function () {
            this.handleSaveGoTo();
            this.slide.id = new Date().getTime();
            this.slides.push(this.slide);
        };
        ExhibitConfigViewModel.prototype.handleSaveEditSlide = function () {
            var _this = this;
            this.handleSaveGoTo();
            var index = this.slides.findIndex(function (_a) {
                var id = _a.id;
                return id === _this.slide.id;
            });
            this.slides.splice(index, 1, this.slide);
        };
        ExhibitConfigViewModel.prototype.handleCancel = function () {
            this.slides = this.initSlides.clone();
        };
        ExhibitConfigViewModel.prototype.goTo = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            var goTo = ((_b = (_a = this.slide) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.goTo) ? this.slide.map.goTo : this._initGoTo;
            if (this.map.portalItem.type === "Web Map") {
                if (((_c = this.slide) === null || _c === void 0 ? void 0 : _c.bookmark) && ((Array.isArray(goTo === null || goTo === void 0 ? void 0 : goTo.center) && !((_d = goTo === null || goTo === void 0 ? void 0 : goTo.center) === null || _d === void 0 ? void 0 : _d[0])) || !(goTo === null || goTo === void 0 ? void 0 : goTo.scale))) {
                    this._bookmarkVM = new BookmarksViewModel({
                        view: this.view
                    });
                    var bookmark = this._bookmarkVM.bookmarks.find(function (_a) {
                        var name = _a.name;
                        return name === _this.slide.bookmark;
                    });
                    if (bookmark) {
                        this._bookmarkVM.goTo(bookmark);
                    }
                }
                else {
                    if (Array.isArray(goTo.center)) {
                        this.view.goTo(goTo).catch(function () { });
                    }
                    else {
                        var center = this.view.center;
                        center.x = ((_e = goTo.center) === null || _e === void 0 ? void 0 : _e.x) ? goTo.center.x : center.x;
                        center.y = ((_f = goTo.center) === null || _f === void 0 ? void 0 : _f.y) ? goTo.center.y : center.y;
                        this.view
                            .goTo({
                            scale: goTo.scale,
                            center: center
                        })
                            .catch(function () { });
                    }
                }
            }
            else if (this.map.portalItem.type === "Web Scene") {
                var camera = this.view.viewpoint.camera;
                camera.position.x = goTo.camera.x;
                camera.position.y = goTo.camera.y;
                camera.position.z = goTo.camera.z;
                camera.fov = goTo.camera.fov;
                camera.heading = goTo.camera.heading;
                camera.tilt = goTo.camera.tilt;
                this.view
                    .goTo({
                    target: camera
                }, { animate: false })
                    .catch(function () { });
            }
        };
        ExhibitConfigViewModel.prototype.generateOutput = function () {
            var newOutput = {
                transition: this.transition,
                slides: this.slides.toArray()
            };
            this.configPanelViewModel.handleDraftData("exhibitConfig", newOutput);
        };
        ExhibitConfigViewModel.prototype._updateSliderNoteColor = function (field) {
            var _a, _b, _c;
            if (this.view && ((_a = this._editorInstances) === null || _a === void 0 ? void 0 : _a[field])) {
                var style = (_b = this._editorInstances[field]) === null || _b === void 0 ? void 0 : _b.ui.view.element.querySelector("#" + field + "-cke-background");
                if (style) {
                    style.innerHTML = "#" + field + "-cke-main .ck-editor__main {\n            --ck-color-base-background: " + this.slide.slideContent[field].backgroundColor + ";\n          }\n          #" + field + "-cke-main .ck-editor__main p {\n            font-size: 14px!important;\n          }\n          .ck.ck-editor__editable_inline {\n            padding: 12px;\n          }\n        ";
                }
                else {
                    style = document.createElement("style");
                    style.id = field + "-cke-background";
                    style.innerHTML = "#" + field + "-cke-main .ck-editor__main {\n            --ck-color-base-background: " + this.slide.slideContent[field].backgroundColor + ";\n          }\n          #" + field + "-cke-main .ck-editor__main p {\n            font-size: 14px!important;\n          }\n          .ck.ck-editor__editable_inline {\n            padding: 12px;\n          }\n        ";
                    (_c = document.querySelector("#" + field + "-cke-main")) === null || _c === void 0 ? void 0 : _c.prepend(style);
                }
                var note = this.view.ui.find(field);
                if (note) {
                    note.style.background = this.slide.slideContent[field].backgroundColor;
                }
            }
        };
        ExhibitConfigViewModel.prototype._handleColorPicker = function (field, showNote, button, e) {
            var node = e.target;
            if (node === null || node === void 0 ? void 0 : node.value) {
                button.style.background = node.value;
                this.slide.slideContent[field].backgroundColor = node.value;
                if (this.slide.slideContent[showNote]) {
                    this._updateSliderNoteColor(field);
                }
            }
        };
        ExhibitConfigViewModel.prototype._handleIncludePopup = function () {
            if (this.slide.map.includePopup) {
                this._handleOpenPopup();
                this.view.popup.autoOpenEnabled = false;
            }
            else {
                this.view.popup.visible = false;
                this.view.popup.autoOpenEnabled = true;
            }
        };
        ExhibitConfigViewModel.prototype._updateSliderNoteContent = function (field) {
            var _a, _b, _c;
            var note = this.view.ui.find(field);
            var content = this.slide.slideContent[field].content;
            note.innerHTML = token_1.applyImgTokens(content, (_c = (_b = (_a = this.configPanelViewModel.templateAppItem) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b["credential"]) === null || _c === void 0 ? void 0 : _c.token);
        };
        ExhibitConfigViewModel.prototype._handleOpenPopup = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var graphic, _a, attributes, layerId_1, objectId, point, layer;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.slide.map.popup) return [3, 4];
                            _a = this.slide.map.popup, attributes = _a.attributes, layerId_1 = _a.layerId, objectId = _a.objectId, point = _a.point;
                            layer = this.view.map.allLayers.find(function (_a) {
                                var id = _a.id;
                                return id === layerId_1;
                            });
                            if (!(layer.type === "feature")) return [3, 2];
                            return [4, this._getGraphic(layerId_1, objectId)];
                        case 1:
                            graphic = _b.sent();
                            return [3, 3];
                        case 2:
                            if (point && attributes) {
                                graphic = new Graphic({
                                    attributes: attributes,
                                    layer: layer,
                                    geometry: point
                                });
                            }
                            _b.label = 3;
                        case 3:
                            if (graphic) {
                                this.view.popup.open({
                                    features: [graphic]
                                });
                            }
                            _b.label = 4;
                        case 4: return [2];
                    }
                });
            });
        };
        ExhibitConfigViewModel.prototype._setSlidePopup = function (graphic, point) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var attributes, layer, featureLayer, id, objectIdField, query, slide;
                return tslib_1.__generator(this, function (_a) {
                    if (!graphic)
                        return [2];
                    attributes = graphic.attributes, layer = graphic.layer;
                    featureLayer = layer;
                    id = featureLayer.id, objectIdField = featureLayer.objectIdField;
                    query = featureLayer.createQuery();
                    query.objectIds = [attributes[objectIdField]];
                    query.outFields = ["*"];
                    slide = JSON.parse(JSON.stringify(this.slide));
                    slide.map.popup = {
                        point: tslib_1.__assign(tslib_1.__assign({}, point.toJSON()), { type: "point" }),
                        attributes: graphic.attributes,
                        objectId: graphic.attributes[objectIdField],
                        layerId: id,
                        title: this._getPopupTitle(graphic)
                    };
                    this.set("slide", slide);
                    return [2];
                });
            });
        };
        ExhibitConfigViewModel.prototype._getPopupTitle = function (graphic) {
            var _a;
            var _b;
            var attributes = {};
            for (var _i = 0, _c = Object.entries(graphic.attributes); _i < _c.length; _i++) {
                var _d = _c[_i], key = _d[0], value = _d[1];
                attributes = tslib_1.__assign(tslib_1.__assign({}, attributes), (_a = {}, _a["{" + key.toUpperCase() + "}"] = value, _a));
            }
            var layer = graphic.layer;
            var popupTitle = (_b = layer === null || layer === void 0 ? void 0 : layer.popupTemplate) === null || _b === void 0 ? void 0 : _b.title;
            return popupTitle === null || popupTitle === void 0 ? void 0 : popupTitle.replace(/{\w+}/g, function (placeholder) { return attributes[placeholder.toUpperCase()] || placeholder; });
        };
        ExhibitConfigViewModel.prototype._handleSliderNoteEnabled = function (field, enabled) {
            var _a, _b, _c;
            if (enabled) {
                var note = document.createElement("div");
                var content = token_1.removeImgTokens(this.slide.slideContent[field].content);
                note.id = field;
                note.style.background = this.slide.slideContent[field].backgroundColor;
                note.innerHTML = token_1.applyImgTokens(content, (_c = (_b = (_a = this.configPanelViewModel.templateAppItem) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b["credential"]) === null || _c === void 0 ? void 0 : _c.token);
                note.tabIndex = 0;
                this.view.ui.add(note, this.slide.slideContent[field].position);
            }
            else {
                this.view.ui.remove(field);
            }
        };
        ExhibitConfigViewModel.prototype._updateBasemap = function (basemapId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var basemap, tmpSlide;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    if (basemapId) {
                        basemap = new Basemap({
                            portalItem: {
                                id: basemapId,
                                portal: this.configPanelViewModel.portal
                            }
                        });
                    }
                    if (basemapId && this.map.portalItem.type === "Web Map") {
                        this.map.basemap = basemap;
                    }
                    else if (this.map.portalItem.type === "Web Scene") {
                        if (this.slide.bookmark && !this.slide.map.basemapId) {
                            tmpSlide = this.map.presentation.slides.find(function (_a) {
                                var id = _a.id;
                                return id === _this.slide.bookmark;
                            });
                            tmpSlide === null || tmpSlide === void 0 ? void 0 : tmpSlide.applyTo(this.view, {
                                animate: false
                            }).then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var _a, hiddenLayers, visibleLayers;
                                var _this = this;
                                return tslib_1.__generator(this, function (_b) {
                                    this.goTo();
                                    if (basemapId) {
                                        this.map.basemap = basemap;
                                    }
                                    _a = this.slide.map, hiddenLayers = _a.hiddenLayers, visibleLayers = _a.visibleLayers;
                                    this.view.map.allLayers.toArray().forEach(function (layer) {
                                        var isBasemapLayer = !!_this.view.map.basemap.baseLayers.find(function (_a) {
                                            var id = _a.id;
                                            return id === layer.id;
                                        });
                                        if (hiddenLayers && (hiddenLayers === null || hiddenLayers === void 0 ? void 0 : hiddenLayers.includes(layer.id)) && !isBasemapLayer) {
                                            layer.visible = false;
                                        }
                                        else if (layer.type === "feature" &&
                                            visibleLayers &&
                                            !(visibleLayers === null || visibleLayers === void 0 ? void 0 : visibleLayers.includes(layer.id)) &&
                                            !isBasemapLayer) {
                                            layer.visible = false;
                                        }
                                        else {
                                            layer.visible = true;
                                        }
                                    });
                                    return [2];
                                });
                            }); });
                        }
                        else if (basemapId) {
                            this.view.map.basemap = basemap;
                        }
                    }
                    return [2];
                });
            });
        };
        ExhibitConfigViewModel.prototype._handleDisableScroll = function () {
            var _a, _b;
            if (this.slide.map.disableScroll) {
                this.handleSaveGoTo();
                if (this.map.portalItem.type === "Web Map") {
                    this.view.constraints = tslib_1.__assign(tslib_1.__assign({}, this.view.constraints), { maxZoom: this.view.zoom, minZoom: this.view.zoom });
                }
                else if (this.map.portalItem.type === "Web Scene") {
                    var camera = this.view.camera;
                    this.view.constraints = tslib_1.__assign(tslib_1.__assign({}, this.view.constraints), { altitude: {
                            max: camera.position.z,
                            min: camera.position.z
                        } });
                }
            }
            else {
                if (this.map.portalItem.type === "Web Map") {
                    this.view.constraints = tslib_1.__assign(tslib_1.__assign({}, this.view.constraints), { maxScale: this._initScale.maxScale, minScale: this._initScale.minScale });
                }
                else if (this.map.portalItem.type === "Web Scene") {
                    this.view.constraints = tslib_1.__assign(tslib_1.__assign({}, this.view.constraints), { altitude: {
                            max: (_a = this._initAltitude) === null || _a === void 0 ? void 0 : _a.max,
                            min: (_b = this._initAltitude) === null || _b === void 0 ? void 0 : _b.min
                        } });
                }
            }
        };
        ExhibitConfigViewModel.prototype._handleInitDisableScroll = function () {
            if (this.slide.map.disableScroll) {
                if (this.map.portalItem.type === "Web Map") {
                    this.view.constraints = tslib_1.__assign(tslib_1.__assign({}, this.view.constraints), { maxScale: this.slide.map.goTo.scale, minScale: this.slide.map.goTo.scale });
                }
                else if (this.map.portalItem.type === "Web Scene") {
                    this.view.constraints = tslib_1.__assign(tslib_1.__assign({}, this.view.constraints), { altitude: {
                            max: this.slide.map.goTo.camera.z,
                            min: this.slide.map.goTo.camera.z
                        } });
                }
            }
        };
        ExhibitConfigViewModel.prototype._getGraphic = function (layerId, objectId) {
            var _a, _b, _c;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var layer, query, results;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            layer = this.slideLayers.find(function (_a) {
                                var id = _a.id;
                                return id === layerId;
                            });
                            if (!layer || layer.type !== "feature")
                                return [2];
                            query = layer.createQuery();
                            query.objectIds = [objectId];
                            query.outFields = ["*"];
                            query.returnGeometry = true;
                            if ((_b = (_a = layer === null || layer === void 0 ? void 0 : layer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.supportsCacheHint) {
                                query.cacheHint = true;
                            }
                            return [4, layer.queryFeatures(query)];
                        case 1:
                            results = _d.sent();
                            return [2, (_c = results.features) === null || _c === void 0 ? void 0 : _c[0]];
                    }
                });
            });
        };
        ExhibitConfigViewModel.prototype._getImageUploadCallback = function (field) {
            var _this = this;
            return function (evt, _a) {
                var data = _a.data, imageElement = _a.imageElement;
                return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var base64Uri, blob, size, type, file, url, value, token;
                    var _b, _c, _d, _e, _f, _g, _h;
                    return tslib_1.__generator(this, function (_j) {
                        switch (_j.label) {
                            case 0:
                                base64Uri = data.default;
                                blob = this.fileUploadConfigViewModel.dataUriToBlob(base64Uri);
                                size = blob.size, type = blob.type;
                                file = {
                                    name: field + "." + blob.type.split("/")[1],
                                    size: size,
                                    type: type
                                };
                                return [4, this.fileUploadConfigViewModel.handlePortalItemResourceRequest(file, blob)];
                            case 1:
                                url = _j.sent();
                                url = url.replace("http://", "https://");
                                value = ((_c = (_b = this.configPanelViewModel) === null || _b === void 0 ? void 0 : _b.draft) === null || _c === void 0 ? void 0 : _c.uploads) ? tslib_1.__spreadArrays((_e = (_d = this.configPanelViewModel) === null || _d === void 0 ? void 0 : _d.draft) === null || _e === void 0 ? void 0 : _e.uploads, [url]) : [url];
                                return [4, this.configPanelViewModel.handleDraftData("uploads", value)];
                            case 2:
                                _j.sent();
                                token = (_h = (_g = (_f = this.configPanelViewModel.templateAppItem) === null || _f === void 0 ? void 0 : _f.portal) === null || _g === void 0 ? void 0 : _g["credential"]) === null || _h === void 0 ? void 0 : _h.token;
                                this._editorInstances[field].model.change(function (writer) {
                                    writer.setAttribute("src", url + "?token=" + token, imageElement);
                                });
                                return [2];
                        }
                    });
                });
            };
        };
        ExhibitConfigViewModel.prototype._saveInitGoTo = function () {
            if (this.map.portalItem.type === "Web Map") {
                this._initGoTo = {
                    center: {
                        x: this.view.center.x,
                        y: this.view.center.y
                    },
                    scale: this.view.scale
                };
            }
            else if (this.map.portalItem.type === "Web Scene") {
                var camera = this.view.camera;
                var fov = camera.fov, heading = camera.heading, position = camera.position, tilt = camera.tilt;
                this._initGoTo = {
                    camera: {
                        x: position.x,
                        y: position.y,
                        z: position.z,
                        fov: fov,
                        heading: heading,
                        tilt: tilt
                    }
                };
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "isConfirmed", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "selectedSetting", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "initBasemapId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "slideLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "popupLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "basemapSelector", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "slide", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "slides", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "initSlides", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "transition", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "contrastError", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "slideNote1HTTPSError", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "slideNote2HTTPSError", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "fileUploadConfigViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfigViewModel.prototype, "messages", void 0);
        ExhibitConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("app.configWidgets.ExhibitConfig.ExhibitConfigViewModel")
        ], ExhibitConfigViewModel);
        return ExhibitConfigViewModel;
    }(Accessor_1.default));
    exports.default = ExhibitConfigViewModel;
});
