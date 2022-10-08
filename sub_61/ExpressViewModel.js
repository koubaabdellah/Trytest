define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/Collection", "./ExpressSectionItem", "esri/core/Handles", "../../../utils/utils", "esri/core/watchUtils", "../../../utils/configParamsUtils"], function (require, exports, tslib_1, Accessor, decorators_1, Collection, ExpressSectionItem, Handles, utils_1, watchUtils_1, configParamsUtils_1) {
    "use strict";
    var EXPRESS_SECTION_COLLECTION = Collection.ofType(ExpressSectionItem);
    var ExpressViewModel = (function (_super) {
        tslib_1.__extends(ExpressViewModel, _super);
        function ExpressViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.configPanelViewModel = null;
            _this.mapMessages = null;
            _this.aboutMessages = null;
            _this.interactivityMessages = null;
            _this.themeLayoutMessages = null;
            _this.expressSections = new EXPRESS_SECTION_COLLECTION();
            return _this;
        }
        ExpressViewModel.prototype.initialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "expressSections.length", function () {
                watchUtils_1.when(_this, "configPanelViewModel.expressSettingsMap", function () {
                    _this.expressSections.forEach(function (section) {
                        var _a;
                        if (((_a = section === null || section === void 0 ? void 0 : section.settings) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                            section.settings.removeAll();
                        }
                    });
                    var configParamsKeys = _this.configPanelViewModel.configParams.config.map(function (section) { return section.id; });
                    _this._handleMapSceneSection();
                    var uiSections = utils_1.getUISections(configParamsKeys, _this.expressSections, _this.configPanelViewModel, true);
                    _this.expressSections.removeAll();
                    _this.expressSections.addMany(uiSections);
                    _this.expressSections.forEach(function (expressSection) {
                        var sectionSettings = _this.configPanelViewModel.expressSettingsMap[expressSection.type];
                        if (sectionSettings) {
                            Object.keys(sectionSettings).forEach(function (sectionSettingKey) {
                                var setting = expressSection.settings.find(function (setting) { return (setting === null || setting === void 0 ? void 0 : setting.fieldName) === sectionSettingKey; });
                                if (!setting) {
                                    expressSection.settings.add(sectionSettings[sectionSettingKey]);
                                }
                            });
                        }
                    });
                });
            });
        };
        ExpressViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        ExpressViewModel.prototype._handleMapSceneSection = function () {
            var _a, _b, _c, _d, _e;
            var map = configParamsUtils_1.getConfigParamsSection(this.configPanelViewModel.configParams.config, "map");
            var mapConfig = map === null || map === void 0 ? void 0 : map.config;
            var mapExpressSection = this.expressSections.find(function (section) { return section.type === "map"; });
            if (((_a = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _a === void 0 ? void 0 : _a.length) === 1 && ((_b = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _b === void 0 ? void 0 : _b.includes("3d"))) {
                mapExpressSection.title = this.mapMessages.scene;
                mapExpressSection.subtitle = this.mapMessages.sceneSubsection;
                mapExpressSection.tip = this.mapMessages.sceneGeneralTip;
            }
            else if (((_c = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _c === void 0 ? void 0 : _c.includes("2d")) && ((_d = mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.itemTypes) === null || _d === void 0 ? void 0 : _d.includes("3d"))) {
                mapExpressSection.subtitle = (_e = this.mapMessages) === null || _e === void 0 ? void 0 : _e.mapSceneSubsection;
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressViewModel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressViewModel.prototype, "mapMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressViewModel.prototype, "aboutMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressViewModel.prototype, "interactivityMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ExpressViewModel.prototype, "themeLayoutMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                type: EXPRESS_SECTION_COLLECTION
            })
        ], ExpressViewModel.prototype, "expressSections", void 0);
        ExpressViewModel = tslib_1.__decorate([
            decorators_1.subclass("ExpressViewModel")
        ], ExpressViewModel);
        return ExpressViewModel;
    }(Accessor));
    return ExpressViewModel;
});
