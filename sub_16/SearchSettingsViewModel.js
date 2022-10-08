define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Collection", "esri/core/watchUtils", "esri/core/Handles"], function (require, exports, tslib_1, decorators_1, Accessor, Collection, watchUtils_1, Handles) {
    "use strict";
    var SearchSettingsViewModel = (function (_super) {
        tslib_1.__extends(SearchSettingsViewModel, _super);
        function SearchSettingsViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._currentSearchValue = null;
            _this._handles = new Handles();
            _this._mapSettings = null;
            _this._sceneSettings = null;
            _this.configPanelViewModel = null;
            _this.itemBrowserMessages = null;
            _this.expressLookup = new Collection();
            _this.searchResults = new Collection();
            return _this;
        }
        SearchSettingsViewModel.prototype.initialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "configPanelViewModel.configParams", function () {
                watchUtils_1.whenOnce(_this, "configPanelViewModel.allSettings.length", function () {
                    _this._setMapSearchSettings();
                    _this.expressLookup.addMany(tslib_1.__spreadArrays(_this.generateExpressLookup()));
                });
            });
        };
        SearchSettingsViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        SearchSettingsViewModel.prototype.handleSearch = function (e) {
            var value = e.detail.value;
            if (this._currentSearchValue === value) {
                return;
            }
            this._currentSearchValue = value;
            this._generateSearchResults(value);
        };
        SearchSettingsViewModel.prototype.findNodeInterval = function (fieldName, conditionalField) {
            var _this = this;
            var interval = window.setInterval(function () {
                if (conditionalField) {
                    var conditionalNode = _this._findNode(conditionalField);
                    var fieldToQuery = (conditionalNode === null || conditionalNode === void 0 ? void 0 : conditionalNode.hasAttribute("checked")) ? fieldName
                        : conditionalField;
                    _this._focusNode(interval, fieldToQuery);
                }
                else {
                    _this._focusNode(interval, fieldName);
                }
            }, 50);
        };
        SearchSettingsViewModel.prototype.goToSetting = function (uiLocation, fieldName, conditionalField, searchInputNode) {
            var _a, _b, _c;
            var dataSection = uiLocation[0];
            var dataSubsection = uiLocation[1];
            if (this.configPanelViewModel.expressEnabled) {
                var expressSection = this.configPanelViewModel.express.viewModel.expressSections.find(function (expressSection) { return expressSection.type === dataSection; });
                this.configPanelViewModel.express.expressSection = expressSection;
                if (searchInputNode)
                    searchInputNode.value = "";
                this.findNodeInterval(fieldName, conditionalField);
                return;
            }
            var section = this.configPanelViewModel.sections.find(function (section) { return section.type === dataSection; });
            var sectionIndex = this.configPanelViewModel.sections.indexOf(section);
            this.set("configPanelViewModel.currentSectionIndex", sectionIndex);
            if (this.get("configPanelViewModel.subsectionId")) {
                this.set("configPanelViewModel.subsectionId", null);
            }
            if (dataSubsection) {
                var currentSection = (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.sections) === null || _b === void 0 ? void 0 : _b.getItemAt((_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.currentSectionIndex);
                if ((currentSection === null || currentSection === void 0 ? void 0 : currentSection.hasSubsections) === false) {
                    if (searchInputNode)
                        searchInputNode.value = "";
                    this.findNodeInterval(fieldName, conditionalField);
                    return;
                }
                this.set("configPanelViewModel.subsectionId", dataSubsection);
            }
            if (searchInputNode)
                searchInputNode.value = "";
            this.findNodeInterval(fieldName, conditionalField);
        };
        SearchSettingsViewModel.prototype.generateExpressLookup = function () {
            return this.configPanelViewModel.allSettings
                .slice()
                .filter(function (setting) { return setting === null || setting === void 0 ? void 0 : setting.express; })
                .map(function (expressSetting) { return expressSetting.fieldName; })
                .toArray();
        };
        SearchSettingsViewModel.prototype._generateSearchResults = function (value) {
            var results = this._getFilteredSearchResults(value);
            this.searchResults.removeAll();
            this.searchResults.addMany(tslib_1.__spreadArrays(results.toArray()));
        };
        SearchSettingsViewModel.prototype._getFilteredSearchResults = function (value) {
            var _this = this;
            return this.configPanelViewModel.allSettings.filter(function (setting) {
                var matchedLabel = _this._testMatchedLabel(setting, value);
                var matchedTerms = _this._testMatchedTerms(setting, value);
                return matchedLabel || (matchedTerms === null || matchedTerms === void 0 ? void 0 : matchedTerms.indexOf(true)) !== -1;
            });
        };
        SearchSettingsViewModel.prototype._testMatchedTerms = function (setting, value) {
            var _a;
            return (_a = setting === null || setting === void 0 ? void 0 : setting.searchTerms) === null || _a === void 0 ? void 0 : _a.map(function (searchTerm) {
                if (!searchTerm) {
                    console.error("NO SEARCH TERM FOUND FOR ", setting);
                    return false;
                }
                return (value &&
                    searchTerm
                        .toLowerCase()
                        .trim()
                        .search(value.toLowerCase().trim()) !== -1);
            });
        };
        SearchSettingsViewModel.prototype._testMatchedLabel = function (setting, value) {
            if (!setting.label) {
                console.error("MISSING LABEL: ", setting);
                return;
            }
            return (value &&
                setting.label
                    .toLowerCase()
                    .trim()
                    .search(value.toLowerCase().trim()) !== -1);
        };
        SearchSettingsViewModel.prototype._focusNode = function (interval, fieldName) {
            var _a;
            var node = this._findNode(fieldName);
            if (node) {
                if (typeof ((_a = node) === null || _a === void 0 ? void 0 : _a.setFocus) === "function") {
                    var switchEl = node;
                    switchEl === null || switchEl === void 0 ? void 0 : switchEl.setFocus();
                }
                else {
                    node === null || node === void 0 ? void 0 : node.focus();
                }
                if (document.activeElement === node) {
                    clearInterval(interval);
                }
            }
        };
        SearchSettingsViewModel.prototype._findNode = function (fieldName) {
            return document.body.querySelector("[data-search-setting=\"search-" + fieldName + "\"]");
        };
        SearchSettingsViewModel.prototype._setMapSearchSettings = function () {
            var searchTerms = this.configPanelViewModel.presetConfigSettings.configSettingsMessages.searchTerms;
            this._mapSettings = [
                {
                    type: "map",
                    label: this.itemBrowserMessages.viewItemDetails,
                    fieldName: "viewItemDetails",
                    uiLocation: ["map"],
                    searchTerms: [
                        searchTerms.details,
                        searchTerms.itemDetails,
                        searchTerms.description,
                        searchTerms.select
                    ]
                },
                {
                    type: "map",
                    label: this.itemBrowserMessages.selectAnItem,
                    fieldName: "selectItem",
                    uiLocation: ["map"],
                    searchTerms: [searchTerms.changeMap, searchTerms.select]
                },
                {
                    type: "map",
                    label: this.itemBrowserMessages.openInMapViewer,
                    fieldName: "openInViewer",
                    uiLocation: ["map"],
                    searchTerms: [
                        searchTerms.edit,
                        searchTerms.viewer,
                        searchTerms.mapViewer
                    ]
                },
                {
                    type: "map",
                    label: this.itemBrowserMessages.openInMapViewerBeta,
                    fieldName: "openInMapViewerBeta",
                    uiLocation: ["map"],
                    searchTerms: [
                        searchTerms.edit,
                        searchTerms.viewer,
                        searchTerms.mapViewer
                    ]
                }
            ];
            this._sceneSettings = [
                {
                    type: "map",
                    label: this.itemBrowserMessages.viewItemDetails,
                    fieldName: "viewItemDetails",
                    uiLocation: ["map"],
                    searchTerms: [
                        searchTerms.details,
                        searchTerms.itemDetails,
                        searchTerms.description,
                        searchTerms.select
                    ]
                },
                {
                    type: "map",
                    label: this.itemBrowserMessages.selectAScene,
                    fieldName: "selectItem",
                    uiLocation: ["map"],
                    searchTerms: [searchTerms.scene, searchTerms.select]
                },
                {
                    type: "map",
                    label: this.itemBrowserMessages.openInSceneViewer,
                    fieldName: "openInViewer",
                    uiLocation: ["map"],
                    searchTerms: [
                        searchTerms.edit,
                        searchTerms.viewer,
                        searchTerms.sceneViewer
                    ]
                }
            ];
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchSettingsViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], SearchSettingsViewModel.prototype, "itemBrowserMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], SearchSettingsViewModel.prototype, "expressLookup", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], SearchSettingsViewModel.prototype, "searchResults", void 0);
        SearchSettingsViewModel = tslib_1.__decorate([
            decorators_1.subclass("SearchSettingsViewModel")
        ], SearchSettingsViewModel);
        return SearchSettingsViewModel;
    }(Accessor));
    return SearchSettingsViewModel;
});
