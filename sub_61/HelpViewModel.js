define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/Collection", "./HelpItemInfo", "TemplatesCommonLib/baseClasses/CompatibilityChecker", "esri/core/reactiveUtils", "./HelpCategoryItem"], function (require, exports, tslib_1, Accessor, decorators_1, Collection_1, HelpItemInfo, CompatibilityChecker_1, reactiveUtils_1, HelpCategoryItem) {
    "use strict";
    Collection_1 = tslib_1.__importDefault(Collection_1);
    var pathname = window.location.pathname;
    var DIST_PATH = pathname.substring(0, pathname.lastIndexOf("/"));
    var HelpViewModel = (function (_super) {
        tslib_1.__extends(HelpViewModel, _super);
        function HelpViewModel(props) {
            var _this = _super.call(this, props) || this;
            _this._currentSearchValue = null;
            _this.helpCategoryItems = new Collection_1.default();
            _this.allHelpInfos = new Collection_1.default();
            _this.searchResults = new Collection_1.default();
            return _this;
        }
        HelpViewModel.prototype.initialize = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { var _a, _b; return (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.loaded; })];
                        case 1:
                            _a.sent();
                            return [4, reactiveUtils_1.whenOnce(function () { return _this.messages; })];
                        case 2:
                            _a.sent();
                            this._init();
                            return [2];
                    }
                });
            });
        };
        HelpViewModel.prototype.getHelpInfo = function (categoryIndex, helpItemId) {
            if (!helpItemId)
                return;
            var helpCategoryItems = this.helpCategoryItems;
            var category = helpCategoryItems.getItemAt(categoryIndex);
            var infos = category.infos;
            var info = infos.find(function (info) { return info.id === helpItemId; });
            return info;
        };
        HelpViewModel.prototype._init = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { var _a, _b; return (_b = (_a = _this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.templateAppItem) === null || _b === void 0 ? void 0 : _b.url; })];
                        case 1:
                            _a.sent();
                            this._setHelpJSON();
                            return [4, reactiveUtils_1.whenOnce(function () { var _a; return (_a = _this.helpCategoryItems) === null || _a === void 0 ? void 0 : _a.length; })];
                        case 2:
                            _a.sent();
                            this.helpCategoryItems.forEach(function (category) { return _this._setupAllInfos(category); });
                            return [2];
                    }
                });
            });
        };
        HelpViewModel.prototype._setupAllInfos = function (category) {
            var _this = this;
            category.infos.forEach(function (info) { return _this._setupAllInfo(category, info); });
        };
        HelpViewModel.prototype._setupAllInfo = function (category, info) {
            info.categoryType = category.type;
            this.allHelpInfos.add(info);
        };
        HelpViewModel.prototype._setHelpJSON = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var dataString;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this._getHelpJSONData()];
                        case 1:
                            dataString = _a.sent();
                            this._set("helpJSON", JSON.parse(dataString));
                            this._createHelpItemInfos();
                            return [2];
                    }
                });
            });
        };
        HelpViewModel.prototype._getHelpJSONData = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var url, pathname;
                return tslib_1.__generator(this, function (_a) {
                    url = this.configPanelViewModel.templateAppItem.url;
                    pathname = new URL(url).pathname;
                    if (pathname.indexOf("/portal") !== -1) {
                        pathname = url.replace("/portal", "");
                    }
                    switch (pathname) {
                        case CompatibilityChecker_1.EAppTemplateType.AttachmentViewer:
                            return [2, this._getHelpJSON("AttachmentViewer")];
                        case CompatibilityChecker_1.EAppTemplateType.Basic:
                            return [2, this._getHelpJSON("Basic")];
                        case CompatibilityChecker_1.EAppTemplateType.CategoryGallery:
                            return [2, this._getHelpJSON("CategoryGallery")];
                        case CompatibilityChecker_1.EAppTemplateType.Charts:
                            return [2, this._getHelpJSON("Charts")];
                        case CompatibilityChecker_1.EAppTemplateType.Countdown:
                            return [2, this._getHelpJSON("Countdown")];
                        case CompatibilityChecker_1.EAppTemplateType.Exhibit:
                            return [2, this._getHelpJSON("Exhibit")];
                        case CompatibilityChecker_1.EAppTemplateType.ImageryApp:
                            return [2, this._getHelpJSON("Imagery")];
                        case CompatibilityChecker_1.EAppTemplateType.InteractiveLegend:
                            return [2, this._getHelpJSON("InteractiveLegend")];
                        case CompatibilityChecker_1.EAppTemplateType.Media:
                            return [2, this._getHelpJSON("Media")];
                        case CompatibilityChecker_1.EAppTemplateType.Minimalist:
                            return [2, this._getHelpJSON("Minimalist")];
                        case CompatibilityChecker_1.EAppTemplateType.Nearby:
                            return [2, this._getHelpJSON("Nearby")];
                        case CompatibilityChecker_1.EAppTemplateType.Portfolio:
                            return [2, this._getHelpJSON("Portfolio")];
                        case CompatibilityChecker_1.EAppTemplateType.Sidebar:
                            return [2, this._getHelpJSON("Sidebar")];
                        case CompatibilityChecker_1.EAppTemplateType.Slider:
                            return [2, this._getHelpJSON("Slider")];
                        case CompatibilityChecker_1.EAppTemplateType.ThreeDViewer:
                            return [2, this._getHelpJSON("ThreeDViewer")];
                        case CompatibilityChecker_1.EAppTemplateType.ZoneLookup:
                            return [2, this._getHelpJSON("ZoneLookup")];
                        default:
                            return [2, null];
                    }
                    return [2];
                });
            });
        };
        HelpViewModel.prototype._createHelpItemInfos = function () {
            var infos = this.helpJSON.infos;
            var length = infos.length;
            if (length <= 0)
                return;
            var isSinglePanel = length === 1;
            this._createInfosForMultiPanel(infos);
            this.uiType = isSinglePanel ? "single" : "multi";
        };
        HelpViewModel.prototype._createInfosForMultiPanel = function (infos) {
            var _this = this;
            var categories = infos.map(function (info) {
                var type = info.type, content = info.content;
                var infoItems = [];
                for (var key in content) {
                    if (content[key]) {
                        var canAdd = _this._processInfo(key);
                        if (canAdd) {
                            var item = _this._createHelpItemInfo(key);
                            infoItems.push(item);
                        }
                    }
                }
                infoItems.sort(function (a, b) {
                    var _a, _b;
                    var nameA = (_a = a === null || a === void 0 ? void 0 : a.title) === null || _a === void 0 ? void 0 : _a.toUpperCase();
                    var nameB = (_b = b === null || b === void 0 ? void 0 : b.title) === null || _b === void 0 ? void 0 : _b.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                var infos = new Collection_1.default(tslib_1.__spreadArrays(infoItems));
                return new HelpCategoryItem({ type: type, infos: infos });
            });
            this.helpCategoryItems.addMany(categories);
        };
        HelpViewModel.prototype._createHelpItemInfo = function (id) {
            var _a, _b, _c, _d, _e, _f;
            var HELP_T9N = (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.infos) === null || _b === void 0 ? void 0 : _b[id];
            var configSettingMessages = (_e = (_d = (_c = this.configPanelViewModel) === null || _c === void 0 ? void 0 : _c.configSettings) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e[id];
            var title = (_f = HELP_T9N === null || HELP_T9N === void 0 ? void 0 : HELP_T9N.title) !== null && _f !== void 0 ? _f : configSettingMessages === null || configSettingMessages === void 0 ? void 0 : configSettingMessages.label;
            var subtitle = HELP_T9N === null || HELP_T9N === void 0 ? void 0 : HELP_T9N.subtitle;
            var description = HELP_T9N === null || HELP_T9N === void 0 ? void 0 : HELP_T9N.description;
            var imgSrc = DIST_PATH + "/assets/images/help/" + id + ".png";
            var imgAlt = HELP_T9N === null || HELP_T9N === void 0 ? void 0 : HELP_T9N.altText;
            return new HelpItemInfo({
                id: id,
                title: title,
                subtitle: subtitle,
                description: description,
                imgSrc: imgSrc,
                imgAlt: imgAlt
            });
        };
        HelpViewModel.prototype._getPath = function (appName) {
            var base = "dojo/text!../../../../assets/help/" + appName + ".json";
            return base;
        };
        HelpViewModel.prototype._getHelpJSON = function (urlPathname) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var pathname, importedData, data;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pathname = this._getPath(urlPathname);
                            return [4, Promise.resolve(new Promise(function (resolve_1, reject_1) { require([pathname], resolve_1, reject_1); }).then(tslib_1.__importStar))];
                        case 1:
                            importedData = _a.sent();
                            data = importedData.default;
                            return [2, data];
                    }
                });
            });
        };
        HelpViewModel.prototype.handleSearch = function (e) {
            var value = e.detail.value;
            if (this._currentSearchValue === value) {
                return;
            }
            this._currentSearchValue = value;
            this._generateSearchResults(value);
        };
        HelpViewModel.prototype._generateSearchResults = function (value) {
            var results = this._getFilteredSearchResults(value);
            this.searchResults.removeAll();
            this.searchResults.addMany(tslib_1.__spreadArrays(results.toArray()));
        };
        HelpViewModel.prototype._getFilteredSearchResults = function (value) {
            var _this = this;
            return this.allHelpInfos.filter(function (info) {
                var matchedLabel = _this._testMatchedLabel(info, value);
                var matchedSubtitle = _this._testMatchSubtitle(info, value);
                var matchedDescription = _this._testMatchDescription(info, value);
                return matchedLabel || matchedSubtitle || matchedDescription;
            });
        };
        HelpViewModel.prototype._testMatchedLabel = function (info, value) {
            if (!info.title) {
                console.error("MISSING TITLE: ", info);
                return;
            }
            return (value &&
                info.title
                    .toLowerCase()
                    .trim()
                    .search(value.toLowerCase().trim()) !== -1);
        };
        HelpViewModel.prototype._testMatchSubtitle = function (info, value) {
            if (!info.subtitle) {
                console.error("MISSING LABEL: ", info);
                return;
            }
            return (value &&
                info.subtitle
                    .toLowerCase()
                    .trim()
                    .search(value.toLowerCase().trim()) !== -1);
        };
        HelpViewModel.prototype._testMatchDescription = function (info, value) {
            if (!info.description) {
                console.error("MISSING LABEL: ", info);
                return;
            }
            return (value &&
                info.description
                    .toLowerCase()
                    .trim()
                    .search(value.toLowerCase().trim()) !== -1);
        };
        HelpViewModel.prototype.getPropMap = function () {
            var url = this.configPanelViewModel.templateAppItem.url;
            var pathname = new URL(url).pathname;
            if (pathname.indexOf("/portal") !== -1) {
                pathname = url.replace("/portal", "");
            }
            switch (pathname) {
                case CompatibilityChecker_1.EAppTemplateType.AttachmentViewer:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Basic:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.CategoryGallery:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Charts:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Countdown:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Exhibit:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.ImageryApp:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.InteractiveLegend:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Media:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Minimalist:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Nearby:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Portfolio:
                    return {
                        positionManager: "positionManagerPortfolio"
                    };
                case CompatibilityChecker_1.EAppTemplateType.Sidebar:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.Slider:
                    return {
                        positionManager: "positionManagerDataSlider"
                    };
                case CompatibilityChecker_1.EAppTemplateType.ThreeDViewer:
                    return {};
                case CompatibilityChecker_1.EAppTemplateType.ZoneLookup:
                    return {};
                default:
                    return null;
            }
        };
        HelpViewModel.prototype._processInfo = function (id) {
            var _a, _b;
            switch (id) {
                case "webAnalytics":
                    return (_b = (_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.portal) === null || _b === void 0 ? void 0 : _b.eueiEnabled;
                default:
                    return true;
            }
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], HelpViewModel.prototype, "helpJSON", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpViewModel.prototype, "uiType", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpViewModel.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpViewModel.prototype, "helpCategoryItems", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpViewModel.prototype, "allHelpInfos", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], HelpViewModel.prototype, "searchResults", void 0);
        HelpViewModel = tslib_1.__decorate([
            decorators_1.subclass("HelpViewModel")
        ], HelpViewModel);
        return HelpViewModel;
    }(Accessor));
    return HelpViewModel;
});
