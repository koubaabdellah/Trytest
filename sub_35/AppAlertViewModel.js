define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "./AppAlertConfig", "esri/core/Handles", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Accessor, AppAlertConfig, Handles, watchUtils_1) {
    "use strict";
    var APP_ALERT_LINKS = {
        eueiDisableGAEnabled: "https://doc.arcgis.com/en/arcgis-online/reference/faq.htm#ESRI_QUESTIONANSWER_AED97F28DCD84F7682623C2FA9E5CE49"
    };
    var AppAlertViewModel = (function (_super) {
        tslib_1.__extends(AppAlertViewModel, _super);
        function AppAlertViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.appAlertConfig = new AppAlertConfig();
            _this.configPanelViewModel = null;
            return _this;
        }
        AppAlertViewModel.prototype.initialize = function () {
            this._handles.add([this._webAnalyticsEUEIDisabled()]);
        };
        AppAlertViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        AppAlertViewModel.prototype._webAnalyticsEUEIDisabled = function () {
            var _this = this;
            return watchUtils_1.whenOnce(this, "configPanelViewModel.portal", function () {
                watchUtils_1.whenOnce(_this, "configPanelViewModel.templateAppData", function () {
                    var _a, _b;
                    var _c = _this.configPanelViewModel, portal = _c.portal, templateAppData = _c.templateAppData;
                    var eueiDisabled = !portal.eueiEnabled;
                    var gaEnabled = (_a = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values) === null || _a === void 0 ? void 0 : _a.googleAnalytics;
                    var alEnabled = (_b = templateAppData === null || templateAppData === void 0 ? void 0 : templateAppData.values) === null || _b === void 0 ? void 0 : _b.adobeLaunchAnalytics;
                    if (eueiDisabled && (gaEnabled || alEnabled)) {
                        var key = "eueiDisableGAEnabled";
                        _this.set("appAlertConfig.link", APP_ALERT_LINKS[key]);
                        _this.set("appAlertConfig.type", key);
                        _this.set("displayAlert", true);
                    }
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], AppAlertViewModel.prototype, "displayAlert", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AppAlertViewModel.prototype, "appAlertConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], AppAlertViewModel.prototype, "configPanelViewModel", void 0);
        AppAlertViewModel = tslib_1.__decorate([
            decorators_1.subclass("AppAlertViewModel")
        ], AppAlertViewModel);
        return AppAlertViewModel;
    }(Accessor));
    return AppAlertViewModel;
});
