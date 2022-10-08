define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/reactiveUtils", "esri/widgets/support/widget", "../BaseComponent", "./CountdownSectionsConfig/assets", "./CountdownSectionsConfig/CountdownSectionsConfigViewModel", "../ScaleSliderConfig/ScaleSliderConfig", "../../icons/icons", "../../widgets/Tips/TipItem", "../CountdownFilterConfig/CountdownFilterConfig", "../../utils/utils"], function (require, exports, tslib_1, decorators_1, reactiveUtils_1, widget_1, BaseComponent, assets_1, CountdownSectionsConfigViewModel_1, ScaleSliderConfig, icons_1, TipItem, CountdownFilterConfig, utils_1) {
    "use strict";
    CountdownSectionsConfigViewModel_1 = tslib_1.__importDefault(CountdownSectionsConfigViewModel_1);
    icons_1 = tslib_1.__importDefault(icons_1);
    var CSS = {
        base: "countdown-sections-config",
        container: "countdown-sections-config__container",
        listContainer: "countdown-sections-config__list-container",
        listBtnContainer: "countdown-sections-config__list-button-container",
        sectionListItem: "countdown-sections-config__section-list-item",
        label: "countdown-sections-config__label",
        sectionContainer: "countdown-sections-config__section-container",
        section: "countdown-sections-config__section",
        switchLabel: "countdown-sections-config__switch-label",
        multipleSelect: "countdown-sections-config__multiple-select",
        tooltipContainer: "countdown-sections-config__tooltip-icon-switch-container",
        saveContainer: "countdown-sections-config__save-container",
        zoomContainer: "countdown-sections-config__zoom-scale-container",
        httpAlertMsgContainer: "countdown-sections-config__http-error-msg-container",
        editorContainer: "countdown-sections-config__editor-container"
    };
    var CountdownSectionsConfig = (function (_super) {
        tslib_1.__extends(CountdownSectionsConfig, _super);
        function CountdownSectionsConfig(properties) {
            var _this = _super.call(this, properties) || this;
            _this.viewModel = new CountdownSectionsConfigViewModel_1.default();
            _this.addSection = false;
            _this.editSection = false;
            _this.selectedType = null;
            _this.configMessages = null;
            _this._scaleRangeSlider = new ScaleSliderConfig({
                initialScale: assets_1.defaultZoomScale
            });
            return _this;
        }
        CountdownSectionsConfig.prototype.postInitialize = function () {
            var _a, _b, _c, _d;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _e;
                var _this = this;
                return tslib_1.__generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            this.enableMapFilter = utils_1.getDefaultValue({
                                fieldName: "enableMapFilter",
                                defaultValue: false
                            }, { type: "setting", id: "enableMapFilter" }, (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppData) === null || _b === void 0 ? void 0 : _b.values);
                            this.autoplay = utils_1.getDefaultValue({
                                fieldName: "autoPlay",
                                defaultValue: false
                            }, { type: "setting", id: "autoPlay" }, (_d = (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.templateAppData) === null || _d === void 0 ? void 0 : _d.values);
                            if (assets_1.autoPlayDurationSettings) {
                                assets_1.autoPlayDurationSettings.label = this.configMessages.autoPlayDuration.label;
                                assets_1.autoPlayDurationSettings.tip = this.configMessages.autoPlayDuration.tip;
                                assets_1.autoPlayDurationSettings.searchTerms = [
                                    this.configMessages.searchTerms.auto,
                                    this.configMessages.searchTerms.play,
                                    this.configMessages.searchTerms.autoPlay,
                                    this.configMessages.searchTerms.duration
                                ];
                            }
                            this.filterConfig = new CountdownFilterConfig({
                                configPanelViewModel: this.configPanelViewModel,
                                hideCustomFeatures: true,
                                map: this.map
                            });
                            this._initTooltips();
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 3, 4, 5]);
                            return [4, this.loadAllMapResources()];
                        case 2:
                            _f.sent();
                            return [3, 5];
                        case 3:
                            _e = _f.sent();
                            return [3, 5];
                        case 4:
                            this.map.when(function () {
                                _this.viewModel.initializeSections();
                                if (_this.map.portalItem.type === "Web Map") {
                                    _this.own(reactiveUtils_1.watch(function () { return _this.presetLayerEffects.outputJSON; }, function (output) {
                                        _this.section.presetLayerEffects = output;
                                        if (_this.section.excludedEffect) {
                                            delete _this.section.excludedEffect;
                                        }
                                    }));
                                }
                            });
                            this.own([
                                reactiveUtils_1.watch(function () { return _this.selectedType; }, function () {
                                    var _a, _b;
                                    if (_this.selectedType && !_this.editSection) {
                                        _this.section = tslib_1.__assign({}, assets_1.defaultSections[_this.selectedType]);
                                    }
                                    if (_this.selectedType === "countdown" || _this.selectedType === "leaderboard") {
                                        _this._scaleRangeSlider.initialScale = (_a = _this.section) === null || _a === void 0 ? void 0 : _a.zoomScale;
                                        if (_this.presetLayerEffects) {
                                            _this.presetLayerEffects.selectedEffect = (_b = _this.section) === null || _b === void 0 ? void 0 : _b.presetLayerEffects;
                                        }
                                    }
                                }),
                                reactiveUtils_1.watch(function () { return _this.selectedLayer; }, function () {
                                    var _a, _b;
                                    if (_this.selectedLayer) {
                                        _this.viewModel.getFields();
                                        if (_this.presetLayerEffects) {
                                            _this.presetLayerEffects.selectedEffect = (_b = (_a = _this.section) === null || _a === void 0 ? void 0 : _a.presetLayerEffects) !== null && _b !== void 0 ? _b : {
                                                id: "muted-blur",
                                                data: {
                                                    includedEffect: "",
                                                    excludedEffect: "blur(3px) opacity(50%)"
                                                }
                                            };
                                        }
                                    }
                                }),
                                reactiveUtils_1.watch(function () { var _a; return (_a = _this._scaleRangeSlider) === null || _a === void 0 ? void 0 : _a.outputZoomScale; }, function (zoomScale) {
                                    _this.section.zoomScale = zoomScale;
                                }),
                                reactiveUtils_1.watch(function () { var _a; return (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.map; }, function (map) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                this.map = map;
                                                _b.label = 1;
                                            case 1:
                                                _b.trys.push([1, 3, 4, 5]);
                                                return [4, this.loadAllMapResources()];
                                            case 2:
                                                _b.sent();
                                                return [3, 5];
                                            case 3:
                                                _a = _b.sent();
                                                return [3, 5];
                                            case 4:
                                                this.map.when(function () {
                                                    _this.filterConfig.map = _this.map;
                                                    _this.viewModel.initializeSections();
                                                    if (_this.map.portalItem.type === "Web Map") {
                                                        _this.own(reactiveUtils_1.watch(function () { var _a; return (_a = _this.presetLayerEffects) === null || _a === void 0 ? void 0 : _a.outputJSON; }, function (output) {
                                                            _this.section.presetLayerEffects = output;
                                                            if (_this.section.excludedEffect) {
                                                                delete _this.section.excludedEffect;
                                                            }
                                                        }));
                                                    }
                                                });
                                                return [7];
                                            case 5: return [2];
                                        }
                                    });
                                }); }),
                                reactiveUtils_1.watch(function () { return _this.httpsError; }, function (httpsError) {
                                    _this._doneBtn.disabled = httpsError;
                                })
                            ]);
                            return [7];
                        case 5: return [2];
                    }
                });
            });
        };
        CountdownSectionsConfig.prototype.render = function () {
            var addNew = !this.addSection ? this._renderAddNew() : null;
            var config = this.addSection && !this.editSection ? this._renderSelectConfig() : null;
            var section = this._renderSectionConfig();
            var save = this.addSection || this.editSection ? this._renderSave() : null;
            var filter = this.addSection || this.editSection ? null : this._renderMapFilter();
            var autoplay = this.addSection || this.editSection ? null : this._renderAutoplaySection();
            return (widget_1.tsx("div", { class: CSS.base, "data-theme": this.getTheme() },
                save,
                widget_1.tsx("div", { class: CSS.container },
                    addNew,
                    config,
                    section,
                    filter,
                    autoplay)));
        };
        CountdownSectionsConfig.prototype._renderContentSection = function () {
            var _a, _b;
            var contentMessage = (_b = (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.sections) === null || _b === void 0 ? void 0 : _b[this.selectedType];
            this.section = this.section ? this.section : tslib_1.__assign({}, assets_1.defaultSections[this.selectedType]);
            var title = this._renderInput(contentMessage.title, "title", this.section.title);
            var content = this._renderContentInput();
            var buttonText = this._renderInput(contentMessage.buttonText, "buttonText", this.section.buttonText);
            var navTitle = this._renderInput(contentMessage.navTitle, "navTitle", this.section.navTitle);
            return (widget_1.tsx("div", { key: "" + this.selectedType, class: CSS.sectionContainer },
                navTitle,
                title,
                content,
                buttonText));
        };
        CountdownSectionsConfig.prototype._renderRankingSection = function () {
            var _a, _b, _c, _d, _e, _f, _g;
            var rankingMessage = (_b = (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.sections) === null || _b === void 0 ? void 0 : _b[this.selectedType];
            var layer = this._renderSelectLayer();
            var featuresDisplayed = this._renderInput(rankingMessage.featuresDisplayed, "featuresDisplayed", (_e = (_d = (_c = this.section) === null || _c === void 0 ? void 0 : _c.featuresDisplayed) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "10", "number", "2");
            var importSection = this._renderImportSection();
            var navTitle = this._renderInput(rankingMessage.navTitle, "navTitle", this.section.navTitle);
            var fields = this._renderFieldSelect(rankingMessage.field, this.numericFields, null, "field");
            var order = this._renderSelect(rankingMessage.order.label, ["DESC", "ASC"], null, "order");
            var zoomScale = !this.selectedLayer || this.selectedLayer.geometryType !== "point" ? null : this._renderScaleSection();
            var paging = this.selectedType === "countdown" ? this._renderPaging() : null;
            var highlight = this._renderSwitch(rankingMessage.highlight, "highlight", (_f = this.section) === null || _f === void 0 ? void 0 : _f.highlight);
            var presetLayerEffects = this.map.portalItem.type === "Web Map" ? (_g = this.presetLayerEffects) === null || _g === void 0 ? void 0 : _g.render() : null;
            var filter = this._renderRankingFilterConfig();
            var buttonText = this.selectedType === "leaderboard"
                ? this._renderInput(rankingMessage.buttonText, "buttonText", this.section.buttonText)
                : null;
            return (widget_1.tsx("div", { key: "" + this.selectedType, class: CSS.sectionContainer },
                importSection,
                navTitle,
                layer,
                featuresDisplayed,
                fields,
                highlight,
                presetLayerEffects,
                order,
                zoomScale,
                buttonText,
                paging,
                filter));
        };
        CountdownSectionsConfig.prototype._renderRankingSearchConfig = function () {
            var _a = this.sectionMessages, search = _a.search, sections = _a.sections;
            var leaderboard = sections.leaderboard;
            var fields = this._renderFieldMultiSelect(leaderboard.searchFields, "searchFields", this.fields, true);
            var displayField = this._renderFieldMultiSelect(leaderboard.searchDisplayField, "searchDisplayField", this.stringFields);
            return (widget_1.tsx("fieldset", { key: "search-config", class: CSS.section },
                widget_1.tsx("legend", null, search),
                widget_1.tsx("div", null,
                    fields,
                    displayField)));
        };
        CountdownSectionsConfig.prototype._renderRankingFilterConfig = function () {
            var _a, _b, _c, _d, _e, _f;
            var _g = (_b = (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.sections) === null || _b === void 0 ? void 0 : _b[this.selectedType], filter = _g.filter, filterField = _g.filterField;
            var enableFilterField = this._renderSwitch((_d = (_c = this.configMessages) === null || _c === void 0 ? void 0 : _c.enableFilter) === null || _d === void 0 ? void 0 : _d.label, "enableFilterField", (_e = this.section) === null || _e === void 0 ? void 0 : _e.enableFilterField);
            var fields = ((_f = this.section) === null || _f === void 0 ? void 0 : _f.enableFilterField) ? this._renderFieldSelect(filterField, this.stringFields, null, "filterField")
                : null;
            return (widget_1.tsx("fieldset", { key: "filter-config", class: CSS.section },
                widget_1.tsx("legend", null, filter),
                widget_1.tsx("div", null,
                    enableFilterField,
                    fields)));
        };
        CountdownSectionsConfig.prototype._renderAddNew = function () {
            var _a;
            var _b = this.sectionMessages, addSection = _b.addSection, addDescription = _b.addDescription, addDescription2 = _b.addDescription2;
            var list = this._renderSectionList();
            return (widget_1.tsx("fieldset", { key: "add-new", class: CSS.section },
                widget_1.tsx("legend", null,
                    addSection,
                    " ", (_a = this._sectionTooltip) === null || _a === void 0 ? void 0 :
                    _a.renderTipCalciteIcon()),
                widget_1.tsx("div", { class: CSS.listContainer },
                    widget_1.tsx("p", { innerHTML: addDescription }),
                    widget_1.tsx("p", null, addDescription2),
                    widget_1.tsx("div", { class: CSS.listBtnContainer },
                        widget_1.tsx("calcite-button", { bind: this, appearance: "outline", color: "blue", scale: "m", "icon-start": icons_1.default.plus, width: "full", onclick: this.viewModel.handleAddNewClick }, addSection)),
                    list)));
        };
        CountdownSectionsConfig.prototype._renderSave = function () {
            var _a = this.sectionMessages, cancel = _a.cancel, done = _a.done;
            return (widget_1.tsx("div", { key: "countdown-save-container", class: CSS.saveContainer },
                widget_1.tsx("calcite-button", { bind: this.viewModel, width: "half", appearance: "outline", onclick: this.viewModel.handleCancelClick }, cancel),
                widget_1.tsx("calcite-button", { bind: this, disabled: true, afterCreate: widget_1.storeNode, "data-node-ref": "_doneBtn", width: "half", appearance: "solid", onclick: this.viewModel.handleSaveClick.bind(this.viewModel) }, done)));
        };
        CountdownSectionsConfig.prototype._renderSectionList = function () {
            var _this = this;
            var _a;
            return (widget_1.tsx("calcite-value-list", { bind: this.viewModel, afterCreate: this.viewModel.handleListCreation, "drag-enabled": "true" }, (_a = this.sections) === null || _a === void 0 ? void 0 : _a.map(function (section, index) {
                var _a;
                var valueListSection = tslib_1.__assign({}, section);
                return (widget_1.tsx("calcite-value-list-item", { key: valueListSection.navTitle + "-" + index, class: CSS.sectionListItem, label: valueListSection.navTitle, value: valueListSection.position, icon: icons_1.default.grip },
                    widget_1.tsx("calcite-action", { slot: "actions-end", appearance: "clear", scale: "s", icon: icons_1.default.pencil, text: (_a = _this.sectionMessages) === null || _a === void 0 ? void 0 : _a.editBtn, onclick: _this.viewModel.handleEditSection.bind(_this.viewModel, valueListSection) }),
                    _this._renderListDropdown(valueListSection)));
            })));
        };
        CountdownSectionsConfig.prototype._renderListDropdown = function (section) {
            var _a = this.sectionMessages, deleteBtn = _a.deleteBtn, dropdown = _a.dropdown, duplicateBtn = _a.duplicateBtn, toggleVisibility = _a.toggleVisibility;
            var enabledIcon = section.enabled ? icons_1.default.viewVisible : icons_1.default.viewHide;
            return (widget_1.tsx("calcite-dropdown", { slot: "actions-end", placement: "bottom-end", "overlay-positioning": "fixed" },
                widget_1.tsx("calcite-action", { slot: "dropdown-trigger", appearance: "clear", scale: "s", icon: icons_1.default.ellipsis, text: dropdown }),
                widget_1.tsx("calcite-dropdown-group", { "selection-mode": "none" },
                    widget_1.tsx("calcite-dropdown-item", { "icon-start": enabledIcon, onclick: this.viewModel.toggleSectionVisibility.bind(this.viewModel, section.position) }, toggleVisibility),
                    widget_1.tsx("calcite-dropdown-item", { "icon-start": icons_1.default.duplicate, onclick: this.viewModel.handleDuplicateSection.bind(this.viewModel, section.position) }, duplicateBtn),
                    widget_1.tsx("calcite-dropdown-item", { "icon-start": icons_1.default.close, onclick: this.viewModel.handleDeleteSection.bind(this.viewModel, section.position) }, deleteBtn))));
        };
        CountdownSectionsConfig.prototype._renderSelectConfig = function () {
            var section = this.sectionMessages.section;
            var selectTypes = this._renderSelect(null, assets_1.countdownTypes, "selectedType", null, true);
            return (widget_1.tsx("fieldset", { key: "config-types", class: CSS.section },
                widget_1.tsx("legend", null, section),
                selectTypes));
        };
        CountdownSectionsConfig.prototype._renderSectionConfig = function () {
            var _a, _b, _c;
            var section;
            var tooltip;
            if (this.selectedType === "details") {
                section = this._renderContentSection();
                tooltip = this._getTooltip("details");
                (_a = this._doneBtn) === null || _a === void 0 ? void 0 : _a.removeAttribute("disabled");
            }
            else if (this.selectedType === "countdown" || this.selectedType === "leaderboard") {
                section = this._renderRankingSection();
                tooltip = this._getTooltip(this.selectedType);
                (_b = this._doneBtn) === null || _b === void 0 ? void 0 : _b.removeAttribute("disabled");
            }
            return section ? (widget_1.tsx("fieldset", { key: "config-section", class: CSS.section },
                widget_1.tsx("legend", null, (_c = this.sectionMessages) === null || _c === void 0 ? void 0 :
                    _c[this.selectedType],
                    " ", tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon()),
                section)) : null;
        };
        CountdownSectionsConfig.prototype._renderSelect = function (label, items, variable, field, defaultValue) {
            var _this = this;
            var _a, _b, _c, _d, _e, _f;
            if (defaultValue === void 0) { defaultValue = false; }
            var rankingMessage = (_b = (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.sections) === null || _b === void 0 ? void 0 : _b[this.selectedType];
            var tooltip = this._getTooltip(field);
            var defaultText = ((_d = (_c = this.sectionMessages) === null || _c === void 0 ? void 0 : _c.default) === null || _d === void 0 ? void 0 : _d[variable]) ? (_f = (_e = this.sectionMessages) === null || _e === void 0 ? void 0 : _e.default) === null || _f === void 0 ? void 0 : _f[variable] : label;
            var select = label ? (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", null,
                    label,
                    " ", tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon()),
                widget_1.tsx("select", { afterUpdate: this.viewModel.handleSelectCreate.bind(this.viewModel, field, items === null || items === void 0 ? void 0 : items[0]), onchange: this.viewModel.handleSelect.bind(this.viewModel, variable, field) },
                    defaultValue ? (widget_1.tsx("option", { key: "default-select", value: "default" }, defaultText)) : null,
                    items.map(function (item) {
                        return field === "order" ? (widget_1.tsx("option", { key: item, value: item }, rankingMessage[field][item])) : (widget_1.tsx("option", { key: item, value: item }, item));
                    })))) : (widget_1.tsx("select", { afterUpdate: this.viewModel.handleSelectCreate.bind(this.viewModel, field, items === null || items === void 0 ? void 0 : items[0]), onchange: this.viewModel.handleSelect.bind(this.viewModel, variable, field) },
                defaultValue ? (widget_1.tsx("option", { key: "default-select", value: "default" }, defaultText)) : null,
                items.map(function (item) {
                    return (widget_1.tsx("option", { key: item, value: item }, _this.sectionMessages[item]));
                })));
            return select;
        };
        CountdownSectionsConfig.prototype._renderFieldSelect = function (label, items, variable, field, defaultValue) {
            var _a, _b, _c, _d, _e;
            if (defaultValue === void 0) { defaultValue = false; }
            var tooltip = this._getTooltip(field);
            var defaultText = ((_b = (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.default) === null || _b === void 0 ? void 0 : _b[variable]) ? (_d = (_c = this.sectionMessages) === null || _c === void 0 ? void 0 : _c.default) === null || _d === void 0 ? void 0 : _d[variable] : label;
            return (widget_1.tsx("label", { key: field, onclick: this._preventDefault },
                widget_1.tsx("span", null,
                    label,
                    " ", tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon()),
                widget_1.tsx("select", { afterUpdate: this.viewModel.handleSelectCreate.bind(this.viewModel, field, (_e = items === null || items === void 0 ? void 0 : items[0]) === null || _e === void 0 ? void 0 : _e.name), onchange: this.viewModel.handleSelect.bind(this.viewModel, variable, field) },
                    defaultValue ? (widget_1.tsx("option", { key: "default-select", value: "default" }, defaultText)) : null,
                    items.map(function (item) { return (widget_1.tsx("option", { key: item.name, value: item.name }, (item === null || item === void 0 ? void 0 : item.alias) ? item.alias : item.name)); }))));
        };
        CountdownSectionsConfig.prototype._renderSelectLayer = function () {
            var _a, _b;
            var tooltip = this._getTooltip("layer");
            return (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", null, (_a = this.sectionMessages) === null || _a === void 0 ? void 0 :
                    _a.sections.countdown.layer,
                    " ", tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon()),
                widget_1.tsx("select", { bind: this.viewModel, afterCreate: this.viewModel.handleSelectLayerCreate, onchange: this.viewModel.handleSelectLayer }, (_b = this.featureLayers) === null || _b === void 0 ? void 0 : _b.map(function (layer) {
                    return widget_1.tsx("option", { value: layer.id }, layer.title);
                }))));
        };
        CountdownSectionsConfig.prototype._renderFieldMultiSelect = function (label, field, fieldNames, multiple) {
            if (multiple === void 0) { multiple = false; }
            var tooltip = this._getTooltip(field);
            return (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", null,
                    label,
                    " ", tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon()),
                widget_1.tsx("select", { bind: this.viewModel, class: CSS.multipleSelect, afterCreate: this.viewModel.handleFieldMultiSelectCreate, onchange: this.viewModel.handleFieldMultiSelect.bind(this.viewModel, multiple), "data-field": field, size: "4", multiple: multiple }, fieldNames.map(function (field) {
                    return (widget_1.tsx("option", { key: field, value: field }, field));
                }))));
        };
        CountdownSectionsConfig.prototype._renderScaleSection = function () {
            var _a, _b;
            var tooltip = this._getTooltip("zoomScale");
            return (widget_1.tsx("div", { class: CSS.zoomContainer },
                widget_1.tsx("label", { onclick: this._preventDefault },
                    widget_1.tsx("span", null, (_a = this.sectionMessages) === null || _a === void 0 ? void 0 :
                        _a.sections.countdown.zoomScale,
                        " ", tooltip === null || tooltip === void 0 ? void 0 :
                        tooltip.renderTipCalciteIcon())), (_b = this._scaleRangeSlider) === null || _b === void 0 ? void 0 :
                _b.render()));
        };
        CountdownSectionsConfig.prototype._renderSwitch = function (label, field, enabled) {
            if (enabled === void 0) { enabled = false; }
            var tooltip = this._getTooltip(field);
            return (widget_1.tsx("label", { class: CSS.switchLabel, onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.label }, label),
                widget_1.tsx("div", { class: CSS.tooltipContainer }, tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon(),
                    widget_1.tsx("calcite-switch", { value: field, checked: enabled, oncalciteSwitchChange: this.viewModel.handleSwitch.bind(this.viewModel) }))));
        };
        CountdownSectionsConfig.prototype._renderInput = function (label, field, value, inputType, min) {
            if (value === void 0) { value = ""; }
            if (inputType === void 0) { inputType = "text"; }
            if (min === void 0) { min = null; }
            var tooltip = this._getTooltip(field);
            return (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", null,
                    label,
                    " ", tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon()),
                widget_1.tsx("input", { bind: this.viewModel, type: inputType, "data-field": field, onchange: this.viewModel.handleInput, value: value, min: min })));
        };
        CountdownSectionsConfig.prototype._renderPaging = function () {
            var _a, _b, _c;
            var pagingLabel = this.sectionMessages.sections.countdown.pagingLabel;
            var pagingValue = ((_a = this.section) === null || _a === void 0 ? void 0 : _a.pagingLabel) ? (_b = this.section) === null || _b === void 0 ? void 0 : _b.pagingLabel : "Page {current} of {total}";
            var customText = this._renderInput(pagingLabel, "pagingLabel", pagingValue);
            return (widget_1.tsx("fieldset", { class: CSS.section },
                widget_1.tsx("legend", null, (_c = this.sectionMessages) === null || _c === void 0 ? void 0 : _c.paging),
                customText));
        };
        CountdownSectionsConfig.prototype._renderContentInput = function () {
            var _a;
            var _b = (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.sections[this.selectedType], content = _b.content, text = _b.text;
            var tooltip = this._getTooltip("content");
            return (widget_1.tsx("div", { class: CSS.editorContainer },
                widget_1.tsx("label", { onclick: this._preventDefault },
                    widget_1.tsx("span", null,
                        content,
                        " ", tooltip === null || tooltip === void 0 ? void 0 :
                        tooltip.renderTipCalciteIcon())),
                widget_1.tsx("calcite-accordion", { "icon-position": "start", scale: "s" },
                    widget_1.tsx("calcite-accordion-item", { "item-title": text },
                        widget_1.tsx("div", { id: "content", name: "content", innerHTML: this.section.content ? this.section.content : "", afterCreate: this.viewModel.handleCKEditorCreation.bind(this.viewModel) }))),
                this.httpsError && this._renderHTTPSError()));
        };
        CountdownSectionsConfig.prototype._renderEnableMapFilter = function () {
            var _a, _b;
            return (widget_1.tsx("label", { class: CSS.switchLabel, onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.label }, (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.enableMapFilter),
                widget_1.tsx("div", { class: CSS.tooltipContainer }, (_b = this._enableFilterTooltip) === null || _b === void 0 ? void 0 :
                    _b.renderTipCalciteIcon(),
                    widget_1.tsx("calcite-switch", { value: "enableMapFilter", checked: this.enableMapFilter, oncalciteSwitchChange: this.viewModel.handleSwitch.bind(this.viewModel) }))));
        };
        CountdownSectionsConfig.prototype._renderMapFilter = function () {
            var _a, _b;
            return (widget_1.tsx("fieldset", { key: "filter-config", class: CSS.section },
                widget_1.tsx("legend", null, (_a = this.sectionMessages) === null || _a === void 0 ? void 0 : _a.mapFilter),
                this._renderEnableMapFilter(),
                this.enableMapFilter && widget_1.tsx("div", null, (_b = this.filterConfig) === null || _b === void 0 ? void 0 : _b.render())));
        };
        CountdownSectionsConfig.prototype._renderImportSection = function () {
            var _this = this;
            var _a, _b;
            var tooltip = this._getTooltip("importSection");
            return (widget_1.tsx("label", { onclick: this._preventDefault },
                widget_1.tsx("span", null, (_a = this.sectionMessages) === null || _a === void 0 ? void 0 :
                    _a.importSection,
                    " ", tooltip === null || tooltip === void 0 ? void 0 :
                    tooltip.renderTipCalciteIcon()),
                widget_1.tsx("select", { bind: this.viewModel, onchange: this.viewModel.handleImportSection },
                    widget_1.tsx("option", { key: "default-select", value: "default" },
                        "--",
                        this.sectionMessages.default.importSection,
                        "--"), (_b = this.sections) === null || _b === void 0 ? void 0 :
                    _b.map(function (section) {
                        return (section.type === "countdown" || section.type === "leaderboard") &&
                            section.position !== _this.section.position ? (widget_1.tsx("option", { value: section.position }, section.position + 1 + ". ",
                            " ",
                            section.navTitle)) : null;
                    }))));
        };
        CountdownSectionsConfig.prototype._renderHTTPSError = function () {
            var _a, _b;
            return (widget_1.tsx("calcite-notice", { key: "text-editor-config-http-error", scale: "s", color: "red", active: true, class: CSS.httpAlertMsgContainer, icon: "exclamation-mark-triangle-f" },
                widget_1.tsx("span", { slot: "message" }, (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.configPanelMessages) === null || _b === void 0 ? void 0 : _b.linkProtocol)));
        };
        CountdownSectionsConfig.prototype._renderAutoplay = function () {
            var _a, _b;
            return (widget_1.tsx("label", { class: CSS.switchLabel, onclick: this._preventDefault },
                widget_1.tsx("span", { class: CSS.label }, (_a = this.configMessages) === null || _a === void 0 ? void 0 : _a.autoPlay.label),
                widget_1.tsx("div", { class: CSS.tooltipContainer }, (_b = this._autoplayTooltip) === null || _b === void 0 ? void 0 :
                    _b.renderTipCalciteIcon(),
                    widget_1.tsx("calcite-switch", { value: "autoplay", checked: this.autoplay, oncalciteSwitchChange: this.viewModel.handleSwitch.bind(this.viewModel) }))));
        };
        CountdownSectionsConfig.prototype._renderAutoplaySection = function () {
            var _a, _b;
            var autoPlayDuration = this.autoplay
                ? (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.configSettings.renderNumberInput(assets_1.autoPlayDurationSettings) : null;
            return (widget_1.tsx("fieldset", { key: "autoplay", class: CSS.section },
                widget_1.tsx("legend", null, (_b = this.configMessages) === null || _b === void 0 ? void 0 : _b.sectionHeaders.autoPlay),
                this._renderAutoplay(),
                autoPlayDuration));
        };
        CountdownSectionsConfig.prototype._getTooltip = function (field) {
            var _a, _b, _c, _d;
            if (field === "details") {
                return (_a = this._tooltips.details) === null || _a === void 0 ? void 0 : _a[field];
            }
            else if (field === "importSection") {
                return (_b = this._tooltips.ranking) === null || _b === void 0 ? void 0 : _b[field];
            }
            else if (this.selectedType === "countdown" || this.selectedType === "leaderboard") {
                var ranking = this.sectionMessages.sections[this.selectedType];
                if (this._tooltips.ranking[field] &&
                    field !== "leaderboard" &&
                    field !== "countdown" &&
                    field !== "enableFilterField") {
                    this._tooltips.ranking[field].tip = ranking === null || ranking === void 0 ? void 0 : ranking[field + "Tooltip"];
                }
                else if (field === "enableFilterField") {
                    return (_c = this._tooltips.ranking) === null || _c === void 0 ? void 0 : _c["" + field + this.selectedType];
                }
                return (_d = this._tooltips.ranking) === null || _d === void 0 ? void 0 : _d[field];
            }
        };
        CountdownSectionsConfig.prototype._initTooltips = function () {
            this._tooltips = this.viewModel.setTooltips(this.sectionMessages);
            this._sectionTooltip = new TipItem({
                id: "tooltip-icon-countdown-section",
                fieldName: "countdown-section",
                tip: this.sectionMessages.sectionTooltip,
                configPanelViewModel: this.configPanelViewModel
            });
            this._enableFilterTooltip = new TipItem({
                id: "tooltip-icon-countdown-map-filter",
                fieldName: "countdown-map-filter",
                tip: this.sectionMessages.mapFilterTooltip,
                configPanelViewModel: this.configPanelViewModel
            });
            this._autoplayTooltip = new TipItem({
                id: "tooltip-icon-countdown-autoplay",
                fieldName: "countdown-autoplay",
                tip: this.configMessages.autoPlay.countdownTip,
                configPanelViewModel: this.configPanelViewModel
            });
        };
        CountdownSectionsConfig.prototype._preventDefault = function (e) {
            e.preventDefault();
        };
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.map")
        ], CountdownSectionsConfig.prototype, "map", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.configPanelViewModel")
        ], CountdownSectionsConfig.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CountdownSectionsConfig.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.featureLayers")
        ], CountdownSectionsConfig.prototype, "featureLayers", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedLayer")
        ], CountdownSectionsConfig.prototype, "selectedLayer", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.contentSection")
        ], CountdownSectionsConfig.prototype, "type", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.contentSection")
        ], CountdownSectionsConfig.prototype, "contentSection", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.fields")
        ], CountdownSectionsConfig.prototype, "fields", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.numericFields")
        ], CountdownSectionsConfig.prototype, "numericFields", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.stringFields")
        ], CountdownSectionsConfig.prototype, "stringFields", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.sections")
        ], CountdownSectionsConfig.prototype, "sections", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.section")
        ], CountdownSectionsConfig.prototype, "section", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.addSection")
        ], CountdownSectionsConfig.prototype, "addSection", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.editSection")
        ], CountdownSectionsConfig.prototype, "editSection", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.selectedType")
        ], CountdownSectionsConfig.prototype, "selectedType", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.filterConfig")
        ], CountdownSectionsConfig.prototype, "filterConfig", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.enableMapFilter")
        ], CountdownSectionsConfig.prototype, "enableMapFilter", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.autoplay")
        ], CountdownSectionsConfig.prototype, "autoplay", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.httpsError")
        ], CountdownSectionsConfig.prototype, "httpsError", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.presetLayerEffects")
        ], CountdownSectionsConfig.prototype, "presetLayerEffects", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.outputJSON")
        ], CountdownSectionsConfig.prototype, "outputJSON", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf("viewModel.sectionMessages"),
            widget_1.messageBundle("dist/assets/t9n/configWidgets/CountdownSectionsConfig/resources")
        ], CountdownSectionsConfig.prototype, "sectionMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/ConfigSettings/resources")
        ], CountdownSectionsConfig.prototype, "configMessages", void 0);
        CountdownSectionsConfig = tslib_1.__decorate([
            decorators_1.subclass("app.widgets.CountdownSectionsConfig")
        ], CountdownSectionsConfig);
        return CountdownSectionsConfig;
    }(BaseComponent));
    return CountdownSectionsConfig;
});
