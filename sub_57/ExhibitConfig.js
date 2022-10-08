define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/reactiveUtils", "esri/portal/PortalItem", "esri/WebMap", "esri/WebScene", "../BaseComponent", "./ExhibitModal", "./ExhibitConfig/assets", "./ExhibitConfig/ExhibitConfigViewModel", "../../icons/icons"], function (require, exports, tslib_1, decorators_1, widget_1, reactiveUtils_1, PortalItem, WebMap, WebScene, BaseComponent, ExhibitModal, assets_1, ExhibitConfigViewModel_1, icons) {
    "use strict";
    ExhibitConfigViewModel_1 = tslib_1.__importDefault(ExhibitConfigViewModel_1);
    var CSS = {
        base: "exhibit-config",
        listContainer: "exhibit-config__list-container",
        listContainerDark: "exhibit-config__list-container exhibit-config__list-container--dark",
        slides: "exhibit-config__slides",
        importBookmarks: "exhibit-config__import-bookmarks"
    };
    var ExhibitConfig = (function (_super) {
        tslib_1.__extends(ExhibitConfig, _super);
        function ExhibitConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.viewModel = new ExhibitConfigViewModel_1.default();
            _this.messages = null;
            return _this;
        }
        ExhibitConfig.prototype.destroy = function () {
            this._modal.destroy();
            this._modal = null;
        };
        ExhibitConfig.prototype.postInitialize = function () {
            var _this = this;
            this._initExhibit();
            this.viewModel.configPanelViewModel = this.configPanelViewModel;
            this._initPortalItem();
            this.own([
                reactiveUtils_1.watch(function () { return _this.configPanelViewModel.selectedMapId; }, function () {
                    _this.slides.removeAll();
                    _this._initPortalItem();
                }),
                reactiveUtils_1.when(function () { return _this.configPanelViewModel.map.loaded; }, this._checkBookmarks.bind(this))
            ]);
        };
        ExhibitConfig.prototype.render = function () {
            var _a;
            var manage = this.messages.manage;
            var addSlide = this._renderAddSlide();
            var bookmark = this._renderImportBookmarks();
            var transition = this._renderSelectTransition();
            return (widget_1.tsx("div", { class: CSS.base },
                widget_1.tsx("fieldset", { key: "add-new", class: CSS.slides },
                    widget_1.tsx("legend", null, manage),
                    bookmark,
                    transition,
                    addSlide,
                    ((_a = this.slides) === null || _a === void 0 ? void 0 : _a.length) ? this._renderSlideList() : null)));
        };
        ExhibitConfig.prototype._renderAddSlide = function () {
            var listContainerClass = this.getTheme() === "dark" ? CSS.listContainerDark : CSS.listContainer;
            var _a = this.messages, addSlide = _a.addSlide, slideDescription = _a.slideDescription;
            return (widget_1.tsx("div", { class: listContainerClass },
                widget_1.tsx("p", null, slideDescription),
                widget_1.tsx("div", null,
                    widget_1.tsx("calcite-button", { bind: this, afterCreate: widget_1.storeNode, "data-node-ref": "_configBtn", color: "blue", appearance: "outline", width: "full", onclick: this._handleModalOpen.bind(this, null) }, addSlide))));
        };
        ExhibitConfig.prototype._renderSlideList = function () {
            var _this = this;
            var listContainerClass = this.getTheme() === "dark" ? CSS.listContainerDark : CSS.listContainer;
            return (widget_1.tsx("div", { key: "slider-list", class: listContainerClass },
                widget_1.tsx("calcite-value-list", { bind: this.viewModel, key: "slider-list", "drag-enabled": "", onCalciteListOrderChange: this.viewModel.handleListOrderChange, onCalciteListChange: this.viewModel.handleSlideListClick }, this.slides.toArray().map(function (slide) { return (widget_1.tsx("calcite-value-list-item", { key: "slider-list-item-" + slide.id, label: slide.slideContent.title, value: slide.id },
                    widget_1.tsx("calcite-button", { slot: "actions-end", appearance: "transparent", scale: "s", "icon-start": "pencil", label: _this.messages.edit, onclick: _this._handleModalOpen.bind(_this, slide.id) }),
                    _this._renderListDropdown(slide))); }))));
        };
        ExhibitConfig.prototype._renderListDropdown = function (slide) {
            var _a = this.messages, deleteSlide = _a.deleteSlide, dropdown = _a.dropdown, duplicateSlide = _a.duplicateSlide;
            return (widget_1.tsx("calcite-dropdown", { slot: "actions-end", placement: "bottom-end", "overlay-positioning": "fixed" },
                widget_1.tsx("calcite-button", { slot: "dropdown-trigger", appearance: "transparent", scale: "s", "icon-start": icons.ellipsis, label: dropdown }),
                widget_1.tsx("calcite-dropdown-group", { "selection-mode": "none" },
                    widget_1.tsx("calcite-dropdown-item", { "icon-start": icons.duplicate, onkeydown: this.viewModel.handleKeydownDuplicateSlide.bind(this.viewModel, slide.id), onclick: this.viewModel.handleDuplicateSlide.bind(this.viewModel, slide.id) }, duplicateSlide),
                    widget_1.tsx("calcite-dropdown-item", { "icon-start": icons.close, onkeydown: this.viewModel.handleKeydownDeleteSlide.bind(this.viewModel, slide.id), onclick: this.viewModel.handleDeleteSlide.bind(this.viewModel, slide.id) }, deleteSlide))));
        };
        ExhibitConfig.prototype._renderImportBookmarks = function () {
            var _a;
            return (widget_1.tsx("label", { class: CSS.importBookmarks, onclick: this._preventDefault },
                widget_1.tsx("span", null,
                    this.messages.createSlides,
                    " ", (_a = this._bookmarksTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("calcite-button", { bind: this.viewModel, color: "blue", appearance: "outline", width: "full", onclick: this.viewModel.handleImportBookmarks, disabled: this.disableImport }, this.messages.importBookmarks)));
        };
        ExhibitConfig.prototype._renderSelectTransition = function () {
            var _this = this;
            var _a;
            return (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", null,
                    this.messages.transition,
                    " ", (_a = this._transitionTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("select", { bind: this.viewModel, afterCreate: this.viewModel.handleSelectTransitionCreate, onchange: this.viewModel.handleSelectTransition }, assets_1.transitions.map(function (transition) {
                    var map = _this.configPanelViewModel.map;
                    var type = transition === "animate" ? (map.portalItem.type === "Web Scene" ? "fly" : "pan") : transition;
                    return (widget_1.tsx("option", { key: transition, value: transition }, _this.messages[type]));
                }))));
        };
        ExhibitConfig.prototype._initPortalItem = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4, new PortalItem({
                                    id: this.configPanelViewModel.selectedMapId,
                                    portal: this.configPanelViewModel.portal
                                }).load()];
                        case 1:
                            _a._portalItem = _b.sent();
                            return [2];
                    }
                });
            });
        };
        ExhibitConfig.prototype._handleModalOpen = function (slideId) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var map, _a, update_1;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this.configPanelViewModel.map.portalItem.type === "Web Map") {
                                map = new WebMap({
                                    portalItem: this._portalItem
                                });
                            }
                            else if (this.configPanelViewModel.map.portalItem.type === "Web Scene") {
                                map = new WebScene({
                                    portalItem: this._portalItem
                                });
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [4, map.loadAll()];
                        case 2:
                            _b.sent();
                            return [3, 5];
                        case 3:
                            _a = _b.sent();
                            return [3, 5];
                        case 4:
                            this.viewModel.selectedSetting = "map";
                            this.viewModel.map = map;
                            this.viewModel.initSlides = this.slides.clone();
                            this._modal = new ExhibitModal({
                                map: map,
                                configPanelViewModel: this.configPanelViewModel,
                                viewModel: this.viewModel,
                                isEditing: slideId ? true : false
                            });
                            update_1 = false;
                            this.slides.forEach(function (slide) {
                                var _a;
                                if ((_a = slide.map) === null || _a === void 0 ? void 0 : _a.visibleLayers) {
                                    var hiddenLayers_1 = [];
                                    map.allLayers.forEach(function (layer) {
                                        var _a, _b;
                                        if (layer.type === "feature") {
                                            if (!((_b = (_a = slide === null || slide === void 0 ? void 0 : slide.map) === null || _a === void 0 ? void 0 : _a.visibleLayers) === null || _b === void 0 ? void 0 : _b.includes(layer.id))) {
                                                hiddenLayers_1.push(layer.id);
                                            }
                                        }
                                        else if (!layer.visible &&
                                            (layer.type === "tile" ||
                                                layer.type === "map-image" ||
                                                layer.type === "imagery" ||
                                                layer.type === "map-notes" ||
                                                layer.type === "scene" ||
                                                layer.type === "building-scene" ||
                                                layer.type === "graphics")) {
                                            hiddenLayers_1.push(layer.id);
                                        }
                                    });
                                    slide.map.hiddenLayers = hiddenLayers_1;
                                    update_1 = true;
                                    delete slide.map.visibleLayers;
                                }
                            });
                            if (update_1) {
                                this.viewModel.generateOutput();
                            }
                            return [7];
                        case 5:
                            this.own([
                                reactiveUtils_1.watch(function () { return _this.configPanelViewModel.templateAppData; }, function () {
                                    _this._configBtn.loading = false;
                                }),
                                reactiveUtils_1.when(function () { return _this._modal.isReadyForRender === true; }, function () {
                                    var _a, _b, _c, _d, _e;
                                    _this.configPanelViewModel.setGenericModalDOM((_a = _this._modal) === null || _a === void 0 ? void 0 : _a.render());
                                    if (slideId) {
                                        _this.viewModel.slide = _this.slides.find(function (_a) {
                                            var id = _a.id;
                                            return id === slideId;
                                        });
                                    }
                                    else {
                                        _this.viewModel.slide = JSON.parse(JSON.stringify(assets_1.defaultSlide));
                                        var _f = _this.viewModel.slide, _g = _f.slideContent, slideNote1_1 = _g.slideNote1, slideNote2_1 = _g.slideNote2, slideMap_1 = _f.map;
                                        slideNote1_1.content = _this.messages.initialNoteText;
                                        slideNote2_1.content = _this.messages.initialNoteText;
                                        slideMap_1.hiddenLayers = [];
                                        map.allLayers.forEach(function (_a) {
                                            var id = _a.id, type = _a.type, visible = _a.visible;
                                            if (!visible &&
                                                (type === "feature" ||
                                                    type === "tile" ||
                                                    type === "map-image" ||
                                                    type === "imagery" ||
                                                    type === "map-notes" ||
                                                    type === "scene" ||
                                                    type === "building-scene" ||
                                                    type === "graphics")) {
                                                slideMap_1.hiddenLayers.push(id);
                                            }
                                        });
                                    }
                                    var _h = _this.viewModel.slide.slideContent, slideNote1 = _h.slideNote1, slideNote2 = _h.slideNote2;
                                    _this.viewModel.slideNote1HTTPSError =
                                        ((_b = slideNote1.content) === null || _b === void 0 ? void 0 : _b.includes('href="http://')) || ((_c = slideNote1.content) === null || _c === void 0 ? void 0 : _c.includes('src="http://'));
                                    _this.viewModel.slideNote2HTTPSError =
                                        ((_d = slideNote2.content) === null || _d === void 0 ? void 0 : _d.includes('href="http://')) || ((_e = slideNote2.content) === null || _e === void 0 ? void 0 : _e.includes('src="http://'));
                                    _this._modal.renderNow();
                                    _this._modal.modal.setAttribute("active", "true");
                                    _this._modal.modal.addEventListener("calciteModalClose", _this._handleModalClose.bind(_this));
                                }, { once: true })
                            ]);
                            return [2];
                    }
                });
            });
        };
        ExhibitConfig.prototype._handleModalClose = function () {
            var _a, _b, _c, _d;
            this.slides = this.viewModel.slides.clone();
            this.viewModel.initSlides.removeAll();
            this.configPanelViewModel.setGenericModalDOM(null);
            (_b = (_a = this._modal) === null || _a === void 0 ? void 0 : _a.modal) === null || _b === void 0 ? void 0 : _b.setAttribute("active", "false");
            if ((_c = this._modal) === null || _c === void 0 ? void 0 : _c.isConfirmed) {
                this._configBtn.loading = true;
            }
            (_d = this._modal) === null || _d === void 0 ? void 0 : _d.destroy();
            this._modal = null;
            this._configBtn.setFocus();
        };
        ExhibitConfig.prototype._initExhibit = function () {
            var _a, _b;
            if (this.input) {
                this.slides.addMany((_a = this.input) === null || _a === void 0 ? void 0 : _a.slides);
                this.transition = (_b = this.input) === null || _b === void 0 ? void 0 : _b.transition;
            }
            this._transitionTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-transition-exhibit-config", "transition-exhibit-config", this.messages.transitionTooltip);
            this._bookmarksTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-bookmarks-exhibit-config", "bookmarks-exhibit-config", this.messages.bookmarksTooltip);
        };
        ExhibitConfig.prototype._checkBookmarks = function () {
            var _a, _b, _c, _d;
            if (!((_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.map))
                return;
            if (this.configPanelViewModel.map.portalItem.type === "Web Map") {
                var map = this.configPanelViewModel.map;
                this.disableImport = ((_b = map.bookmarks) === null || _b === void 0 ? void 0 : _b.length) ? false : true;
            }
            else if (this.configPanelViewModel.map.portalItem.type === "Web Scene") {
                var map = this.configPanelViewModel.map;
                this.disableImport = ((_d = (_c = map.presentation) === null || _c === void 0 ? void 0 : _c.slides) === null || _d === void 0 ? void 0 : _d.length) ? false : true;
            }
        };
        ExhibitConfig.prototype._preventDefault = function (e) {
            e.preventDefault();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.transition")
        ], ExhibitConfig.prototype, "transition", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.slides")
        ], ExhibitConfig.prototype, "slides", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfig.prototype, "input", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExhibitConfig.prototype, "disableImport", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.messages"),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ExhibitConfig/resources")
        ], ExhibitConfig.prototype, "messages", void 0);
        ExhibitConfig = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.ExhibitConfig")
        ], ExhibitConfig);
        return ExhibitConfig;
    }(BaseComponent));
    return ExhibitConfig;
});
