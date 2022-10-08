define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "esri/core/reactiveUtils", "../BaseComponent", "../BasemapSelectorConfig/BasemapSelectorConfig", "../FilterConfig/FilterConfig", "./ExhibitConfig/assets", "../../icons/icons", "TemplatesCommonLib/functionality/token"], function (require, exports, tslib_1, decorators_1, widget_1, reactiveUtils_1, BaseComponent, BasemapSelectorConfig, FilterConfig, assets_1, icons_1, token_1) {
    "use strict";
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        panel: "exhibit-config__panel",
        switchLabel: "exhibit-config__switch-label",
        label: "exhibit-config__label",
        tooltipContainer: "exhibit-config__tooltip-icon-switch-container",
        tooltipSpan: "exhibit-config__panel-tooltip-container",
        colorInputBtn: "exhibit-config__color-button",
        colorInputContainer: "exhibit-config__color-container",
        popupNotification: "exhibit-config__popup-notification",
        popupContainer: "exhibit-config__popup-container",
        layerList: "exhibit-config__layer-list",
        noteContainer: "exhibit-config__note-container",
        errorContainer: "exhibit-config__error-container",
        errorSwatch: "exhibit-config__error-container--swatch",
        presetColors: "exhibit-config__preset-colors",
        colorPickerContainer: "exhibit-config__color-picker-container",
        recentColors: "exhibit-config__recent-colors",
        httpAlertMsgContainer: "exhibit-config__http-error-msg-container"
    };
    var SlideOptions = (function (_super) {
        tslib_1.__extends(SlideOptions, _super);
        function SlideOptions(properties) {
            var _this = _super.call(this, properties) || this;
            _this.popupLayers = [];
            _this.messages = null;
            return _this;
        }
        SlideOptions.prototype.postInitialize = function () {
            var _this = this;
            var _a, _b, _c, _d;
            this._initSlideTooltips();
            this._initMapTooltips();
            if (!this.slide.slideContent.title) {
                this.slide.slideContent.title = "Slide " + (((_a = this.slides) === null || _a === void 0 ? void 0 : _a.length) ? this.slides.length + 1 : 1);
            }
            this.initBasemapId = this.map.basemap.id;
            this.basemapSelector = new BasemapSelectorConfig({
                savedState: this.slide.map.basemapId
                    ? {
                        chosenBasemapId: this.slide.map.basemapId
                    }
                    : null,
                configPanelViewModel: this.configPanelViewModel
            });
            this.filterConfig = new FilterConfig({
                configPanelViewModel: this.configPanelViewModel,
                input: (_d = (_c = (_b = this.slide.map) === null || _b === void 0 ? void 0 : _b.filter) === null || _c === void 0 ? void 0 : _c.layerExpressions) !== null && _d !== void 0 ? _d : null,
                hideCustomFeatures: true,
                map: this.map,
                theme: "light",
                isInModal: true
            });
            this.own([
                reactiveUtils_1.watch(function () { return _this.basemapSelector.outputBasemapId; }, this.viewModel.handleBasemapSelector.bind(this.viewModel)),
                reactiveUtils_1.watch(function () { return _this.filterConfig.outputJSON; }, function (output) {
                    _this.viewModel.handleSlideFilter(output);
                    _this.slide.map.filter = output;
                })
            ]);
        };
        SlideOptions.prototype.render = function () {
            var settingsSwitcher = this._renderSettingSwitcher();
            return (widget_1.tsx("div", { class: CSS.panel, afterCreate: function (effectContainer) {
                    var _a;
                    var uiContainer = (_a = document
                        .getElementById("slideView")) === null || _a === void 0 ? void 0 : _a.querySelector(".esri-ui-inner-container.esri-ui-corner-container");
                    effectContainer.style.maxHeight = uiContainer.clientHeight.toString() + "px";
                } },
                settingsSwitcher,
                this.selectedSetting === "map"
                    ? this._renderMapConfig()
                    : this.selectedSetting === "slideContent"
                        ? this._renderSlideContentConfig()
                        : null));
        };
        SlideOptions.prototype._renderSettingSwitcher = function () {
            var _this = this;
            var _a = this.messages, map = _a.map, slide = _a.slide;
            return (widget_1.tsx("calcite-radio-group", { width: "full", afterCreate: function (crg) {
                    crg.addEventListener("calciteRadioGroupChange", function (e) {
                        _this.selectedSetting = e.detail;
                    });
                } },
                widget_1.tsx("calcite-radio-group-item", { value: "map", checked: this.selectedSetting === "map" }, map),
                widget_1.tsx("calcite-radio-group-item", { value: "slideContent", checked: this.selectedSetting === "slideContent" }, slide)));
        };
        SlideOptions.prototype._renderMapConfig = function () {
            this._initMapTooltips();
            var _a = this.messages, disableScroll = _a.disableScroll, includePopup = _a.includePopup;
            var scrollSwitch = this._renderSwitch(disableScroll, "disableScroll");
            var layers = this._renderLayerVisibility();
            var popupSwitch = this._renderSwitch(includePopup, "includePopup");
            var popup = this.slide.map.includePopup ? this._renderPopup() : null;
            var basemap = this._renderBasemapSelector();
            var filter = this._renderFilterConfig();
            if (this.filterConfig) {
                this.filterConfig.theme = "light";
            }
            return (widget_1.tsx("div", { key: "map" },
                scrollSwitch,
                layers,
                popupSwitch,
                popup,
                basemap,
                filter));
        };
        SlideOptions.prototype._renderSlideContentConfig = function () {
            this._initSlideTooltips();
            var _a = this.messages, slideNote1 = _a.slideNote1, slideNote2 = _a.slideNote2;
            var title = this._renderTitleInput();
            var slide1Switch = this._renderSwitch(slideNote1, "slideNote1Enabled");
            var slide1 = this.slide.slideContent.slideNote1Enabled
                ? this._renderNoteConfig("slideNote1", "slideNote1Enabled")
                : null;
            var slide2Switch = this._renderSwitch(slideNote2, "slideNote2Enabled");
            var slide2 = this.slide.slideContent.slideNote2Enabled
                ? this._renderNoteConfig("slideNote2", "slideNote2Enabled")
                : null;
            return (widget_1.tsx("div", { key: "slideContent" },
                title,
                slide1Switch,
                slide1,
                slide2Switch,
                slide2));
        };
        SlideOptions.prototype._renderNoteConfig = function (note, noteEnabled) {
            var noteColorPicker = this._renderColorPicker(note, noteEnabled);
            var content = this._renderContentInput(note, noteEnabled);
            var position = this._renderNotePositionSelect(note);
            var error = this.viewModel.checkNoteContentContrast(note) ? this._renderContrastError() : null;
            return (widget_1.tsx("div", { key: "note", class: CSS.noteContainer },
                position,
                noteColorPicker,
                error,
                content));
        };
        SlideOptions.prototype._renderPopup = function () {
            var _a = this.messages, clickPopup = _a.clickPopup, removePopup = _a.removePopup;
            return (widget_1.tsx("div", { key: "popup-options", class: CSS.popupContainer },
                widget_1.tsx("div", { class: CSS.popupNotification },
                    widget_1.tsx("calcite-icon", { icon: icons_1.default.exclamationMarkTriangle, filled: true, scale: "s" }),
                    widget_1.tsx("p", null, clickPopup)),
                this.slide.map.popup ? (widget_1.tsx("calcite-pick-list", { key: "popup" },
                    widget_1.tsx("calcite-pick-list-item", { bind: this, label: this.slide.map.popup.title, afterCreate: this._stylePopupList },
                        widget_1.tsx("calcite-action", { bind: this, icon: "popup", slot: "actions-start", scale: "s", afterCreate: this._stylePopupIcon }),
                        widget_1.tsx("calcite-action", { bind: this.viewModel, slot: "actions-end", label: removePopup, icon: "x", scale: "s", onclick: this.viewModel.handleRemovePopup })))) : null));
        };
        SlideOptions.prototype._renderColorPicker = function (field, noteEnabled) {
            var _this = this;
            var _a;
            var slidesNotes = (_a = this.slide) === null || _a === void 0 ? void 0 : _a.slideContent[field];
            var _b = this.messages, backgroundButton = _b.backgroundButton, noteBackground = _b.noteBackground, recentColorButton = _b.recentColorButton, recentColors = _b.recentColors;
            var noteColors = this.viewModel.handleSlideNoteColors();
            return (widget_1.tsx("label", { class: CSS.label, onclick: this._preventDefault },
                widget_1.tsx("span", null, noteBackground),
                widget_1.tsx("button", { id: "color-picker-button-" + field, class: CSS.colorInputBtn, style: "background:" + (slidesNotes === null || slidesNotes === void 0 ? void 0 : slidesNotes.backgroundColor), "aria-label": backgroundButton }),
                widget_1.tsx("calcite-popover", { id: "popover-" + field, placement: "auto-end", "disable-pointer": "", "offset-distance": "0", "reference-element": "color-picker-button-" + field, "auto-close": "true" },
                    widget_1.tsx("div", { class: CSS.colorPickerContainer, onmouseleave: this._closePopup.bind(this, field) },
                        widget_1.tsx("calcite-color-picker", { id: "color-picker-" + field, appearance: "minimal", "hide-channels": "", "hide-saved": "", value: slidesNotes === null || slidesNotes === void 0 ? void 0 : slidesNotes.backgroundColor, afterCreate: this.viewModel.handleColorPickerCreate.bind(this.viewModel, field, noteEnabled) }),
                        widget_1.tsx("label", { id: "preset-colors-" + field },
                            widget_1.tsx("span", null, recentColors),
                            widget_1.tsx("div", { class: CSS.recentColors }, noteColors.map(function (color, index) { return (widget_1.tsx("button", { key: "recent-colors-" + index, class: CSS.colorInputBtn, style: "background:" + color, "aria-label": recentColorButton + " " + color, onclick: _this.viewModel.handleRecentColorClick.bind(_this.viewModel, color, field) })); })))))));
        };
        SlideOptions.prototype._renderNotePositionSelect = function (field) {
            var _this = this;
            return (widget_1.tsx("label", { key: field, onclick: this._preventDefault },
                widget_1.tsx("span", null, this.messages.notePosition),
                widget_1.tsx("select", { afterCreate: this.viewModel.handleSelectNoteCreate.bind(this.viewModel, field), onchange: this.viewModel.handleSelectNote.bind(this.viewModel, field) }, assets_1.positions.map(function (position) { return (widget_1.tsx("option", { key: position, value: position }, _this.messages[position])); }))));
        };
        SlideOptions.prototype._renderTitleInput = function () {
            var _a;
            return (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.tooltipSpan },
                    this.messages.slideTitle,
                    " ", (_a = this._titleTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("input", { bind: this.viewModel, type: "string", onchange: this.viewModel.handleTitleInput, value: this.slide.slideContent.title })));
        };
        SlideOptions.prototype._renderSwitch = function (label, field) {
            var _a, _b;
            var enabled = (_b = (_a = this.slide) === null || _a === void 0 ? void 0 : _a[this.selectedSetting]) === null || _b === void 0 ? void 0 : _b[field];
            var tooltip = this._getSwitchTooltip(field);
            return (widget_1.tsx("label", { key: field, class: CSS.switchLabel, onclick: this._preventDefault },
                widget_1.tsx("span", null, label),
                widget_1.tsx("div", { class: CSS.tooltipContainer }, tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon(),
                    widget_1.tsx("calcite-switch", { oncalciteSwitchChange: this.viewModel.handleSwitch.bind(this.viewModel, field), checked: enabled }))));
        };
        SlideOptions.prototype._renderContentInput = function (field, noteEnabled) {
            var _a, _b, _c, _d, _e;
            var _f = this.messages, editText = _f.editText, slideText = _f.slideText;
            var linkError = field === "slideNote1" ? this.slideNote1HTTPSError : field === "slideNote2" ? this.slideNote2HTTPSError : false;
            var content = ((_b = (_a = this.slide.slideContent) === null || _a === void 0 ? void 0 : _a[field]) === null || _b === void 0 ? void 0 : _b.content) ? token_1.applyImgTokens(token_1.removeImgTokens(this.slide.slideContent[field].content), (_d = (_c = this.configPanelViewModel.templateAppItem.portal) === null || _c === void 0 ? void 0 : _c["credential"]) === null || _d === void 0 ? void 0 : _d.token)
                : "";
            return (widget_1.tsx("div", null,
                widget_1.tsx("label", { key: "content-" + field, onclick: this._preventDefault },
                    widget_1.tsx("span", { class: CSS.tooltipSpan },
                        slideText,
                        " ", (_e = this._noteTextTooltip) === null || _e === void 0 ? void 0 :
                        _e.renderTipCalciteIcon())),
                widget_1.tsx("calcite-accordion", { "icon-position": "start", scale: "s" },
                    widget_1.tsx("calcite-accordion-item", { "item-title": editText },
                        widget_1.tsx("div", { id: "ckeditor-" + field, name: "ckeditor-" + field, afterCreate: this.viewModel.handleCKEditorCreation.bind(this.viewModel, field, noteEnabled), innerHTML: content }))),
                linkError && this._renderHTTPSError()));
        };
        SlideOptions.prototype._renderLayerVisibility = function () {
            var _a;
            var _b = this.messages, layerVisibility = _b.layerVisibility, selectLayer = _b.selectLayer;
            var layers = this._renderLayerVisibilityItems();
            return (widget_1.tsx("label", { key: "layer-visibility", onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.tooltipSpan },
                    layerVisibility,
                    " ", (_a = this._layerVisibilityTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("calcite-accordion", { "icon-position": "start", scale: "s" },
                    widget_1.tsx("calcite-accordion-item", { "item-title": selectLayer },
                        widget_1.tsx("calcite-pick-list", { class: CSS.layerList, multiple: true }, layers)))));
        };
        SlideOptions.prototype._renderLayerVisibilityItems = function () {
            var _this = this;
            var _a;
            return (_a = this.map.allLayers
                .toArray()) === null || _a === void 0 ? void 0 : _a.map(function (layer) {
                return (layer.type === "feature" ||
                    layer.type === "tile" ||
                    layer.type === "map-image" ||
                    layer.type === "imagery" ||
                    layer.type === "map-notes" ||
                    layer.type === "scene" ||
                    layer.type === "building-scene" ||
                    layer.type === "graphics") &&
                    !_this.map.basemap.baseLayers.find(function (_a) {
                        var id = _a.id;
                        return id === layer.id;
                    }) && (widget_1.tsx("calcite-pick-list-item", { label: layer.title, value: layer.id, afterCreate: _this.viewModel.handleCreateLayerVisibility.bind(_this.viewModel, layer) }));
            });
        };
        SlideOptions.prototype._renderBasemapSelector = function () {
            var _a, _b;
            var _c = this.messages, basemap = _c.basemap, resetBasement = _c.resetBasement, selectBasemap = _c.selectBasemap;
            return (widget_1.tsx("label", { key: "basemap-selector", onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.tooltipSpan },
                    basemap,
                    " ", (_a = this._basemapTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("calcite-accordion", { "icon-position": "start", scale: "s" },
                    widget_1.tsx("calcite-accordion-item", { "item-title": selectBasemap }, (_b = this.basemapSelector) === null || _b === void 0 ? void 0 :
                        _b.render(),
                        widget_1.tsx("calcite-button", { width: "full", onclick: this.viewModel.handleBasemapSelector.bind(this.viewModel, this.initBasemapId) }, resetBasement)))));
        };
        SlideOptions.prototype._renderFilterConfig = function () {
            var _a, _b;
            var _c = this.messages, applyFilter = _c.applyFilter, layerFilter = _c.layerFilter;
            return (widget_1.tsx("label", { key: "filter", onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.tooltipSpan },
                    layerFilter,
                    " ", (_a = this._filterTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("calcite-accordion", { "icon-position": "start", scale: "s" },
                    widget_1.tsx("calcite-accordion-item", { "item-title": applyFilter }, (_b = this.filterConfig) === null || _b === void 0 ? void 0 : _b.render()))));
        };
        SlideOptions.prototype._renderContrastError = function () {
            return (widget_1.tsx("div", { key: "contrast-error", class: CSS.errorContainer },
                widget_1.tsx("calcite-icon", { icon: icons_1.default.exclamationMarkTriangle, filled: true, scale: "s" }),
                widget_1.tsx("p", null, this.messages.contrastError)));
        };
        SlideOptions.prototype._renderHTTPSError = function () {
            var _a, _b;
            return (widget_1.tsx("calcite-notice", { key: "text-editor-config-http-error", scale: "s", color: "red", active: true, class: CSS.httpAlertMsgContainer, icon: "exclamation-mark-triangle-f" },
                widget_1.tsx("span", { slot: "message" }, (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.configPanelMessages) === null || _b === void 0 ? void 0 : _b.linkProtocol)));
        };
        SlideOptions.prototype._closePopup = function (field) {
            var colorPopover = document.getElementById("popover-" + field);
            colorPopover.open = false;
        };
        SlideOptions.prototype._stylePopupList = function (listItem) {
            var style = document.createElement("style");
            style.id = "popup-style";
            style.innerHTML = ".icon-dot.icon { display: none!important; } label { cursor: default!important; }";
            listItem.shadowRoot.prepend(style);
        };
        SlideOptions.prototype._stylePopupIcon = function (action) {
            var style = document.createElement("style");
            style.id = "popup-style";
            style.innerHTML = "button { cursor: default!important; }";
            action.shadowRoot.prepend(style);
        };
        SlideOptions.prototype._preventDefault = function (e) {
            e.preventDefault();
        };
        SlideOptions.prototype._getSwitchTooltip = function (field) {
            if (field === "includePopup") {
                return this._popupTooltip;
            }
            else if (field === "disableScroll") {
                return this._disableScrollTooltip;
            }
            else if (field === "slideNote1Enabled") {
                return this._note1Tooltip;
            }
            else if (field === "slideNote2Enabled") {
                return this._note2Tooltip;
            }
        };
        SlideOptions.prototype._initMapTooltips = function () {
            var _a = this.messages, basemapTooltip = _a.basemapTooltip, filterTooltip = _a.filterTooltip, layerVisibilityTooltip = _a.layerVisibilityTooltip, popupTooltip = _a.popupTooltip, scrollTooltip = _a.scrollTooltip;
            this._basemapTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-basemap-exhibit-config", "basemap-exhibit-config", basemapTooltip);
            this._filterTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-filter-exhibit-config", "filter-exhibit-config", filterTooltip);
            this._layerVisibilityTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-layer-visibility-exhibit-config", "layer-visibility-exhibit-config", layerVisibilityTooltip);
            this._disableScrollTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-scroll-exhibit-config", "scroll-exhibit-config", scrollTooltip);
            this._popupTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-popup-exhibit-config", "popup-exhibit-config", popupTooltip);
        };
        SlideOptions.prototype._initSlideTooltips = function () {
            var _a = this.messages, noteTextTooltip = _a.noteTextTooltip, noteTooltip = _a.noteTooltip, titleTooltip = _a.titleTooltip;
            this._titleTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-title-exhibit-config", "title-exhibit-config", titleTooltip);
            this._noteTextTooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-note-text-exhibit-config", "note-text-exhibit-config", noteTextTooltip);
            this._note1Tooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-note1-exhibit-config", "note1-exhibit-config", noteTooltip);
            this._note2Tooltip = this.configPanelViewModel.handleCreateTooltip("tooltip-icon-note2-exhibit-config", "note2-exhibit-config", noteTooltip);
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], SlideOptions.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SlideOptions.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], SlideOptions.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedSetting")
        ], SlideOptions.prototype, "selectedSetting", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.initBasemapId")
        ], SlideOptions.prototype, "initBasemapId", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.slideLayers")
        ], SlideOptions.prototype, "slideLayers", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.popupLayers")
        ], SlideOptions.prototype, "popupLayers", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.basemapSelector")
        ], SlideOptions.prototype, "basemapSelector", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SlideOptions.prototype, "filterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.contrastError")
        ], SlideOptions.prototype, "contrastError", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.slideNote1HTTPSError")
        ], SlideOptions.prototype, "slideNote1HTTPSError", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.slideNote2HTTPSError")
        ], SlideOptions.prototype, "slideNote2HTTPSError", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.slide")
        ], SlideOptions.prototype, "slide", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.slides")
        ], SlideOptions.prototype, "slides", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/ExhibitConfig/resources")
        ], SlideOptions.prototype, "messages", void 0);
        SlideOptions = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.SlideOptions")
        ], SlideOptions);
        return SlideOptions;
    }(BaseComponent));
    return SlideOptions;
});
