define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "../../../utils/utils"], function (require, exports, tslib_1, decorators_1, Accessor, utils_1) {
    "use strict";
    var ActiveItemConfigViewModel = (function (_super) {
        tslib_1.__extends(ActiveItemConfigViewModel, _super);
        function ActiveItemConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this.configPanelViewModel = null;
            return _this;
        }
        ActiveItemConfigViewModel.prototype.handleDefaultValueForContent = function (configSettingJSONFromMap, configSettingFromParams) {
            var _this = this;
            var _a;
            if (!((_a = this.configPanelViewModel) === null || _a === void 0 ? void 0 : _a.draft)) {
                return;
            }
            if (configSettingFromParams === null || configSettingFromParams === void 0 ? void 0 : configSettingFromParams.content) {
                this.configPanelViewModel.draft[configSettingJSONFromMap.fieldName] =
                    configSettingFromParams.defaultValue;
                configSettingFromParams.content.forEach(function (contentItem) {
                    var id = contentItem.id;
                    var presetSetting = _this.configPanelViewModel.presetConfigSettings
                        .configSettings[id];
                    var defaultOverride = contentItem.hasOwnProperty("defaultValue")
                        ? contentItem.defaultValue
                        : null;
                    var defaultValue = utils_1.getDefault(presetSetting, defaultOverride, _this.configPanelViewModel.templateAppData.values);
                    _this.configPanelViewModel.defaultValues[presetSetting.fieldName] = defaultValue;
                    presetSetting.defaultValue = defaultValue;
                });
            }
        };
        ActiveItemConfigViewModel.prototype.handleSelectedValue = function (publishedAppData, activeItemConfigSetting, dependentFieldDraftValue, optionValue) {
            var dependentFieldPublishedValue = publishedAppData === null || publishedAppData === void 0 ? void 0 : publishedAppData[activeItemConfigSetting.fieldName];
            return !dependentFieldDraftValue && !dependentFieldPublishedValue
                ? activeItemConfigSetting.defaultValue === optionValue
                    ? true
                    : false
                : dependentFieldDraftValue === optionValue
                    ? true
                    : !dependentFieldDraftValue &&
                        dependentFieldPublishedValue === optionValue
                        ? true
                        : false;
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ActiveItemConfigViewModel.prototype, "configPanelViewModel", void 0);
        ActiveItemConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("ActiveItemConfigViewModel")
        ], ActiveItemConfigViewModel);
        return ActiveItemConfigViewModel;
    }(Accessor));
    return ActiveItemConfigViewModel;
});
