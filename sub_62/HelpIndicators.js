define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor) {
    "use strict";
    var LOCAL_STORAGE_KEY = "INSTANT_APPS_CONFIGURATION_INDICATORS";
    var HelpIndicators = (function (_super) {
        tslib_1.__extends(HelpIndicators, _super);
        function HelpIndicators(params) {
            var _this = _super.call(this, params) || this;
            _this.allSeen = false;
            _this.indicatorData = {};
            return _this;
        }
        HelpIndicators.prototype.initialize = function () {
            var indicators = localStorage.getItem(LOCAL_STORAGE_KEY);
            this.indicatorData = JSON.parse(indicators);
            this.handleAllSeen();
            this.onboardingPopoversNode.addEventListener("calcitePopoverClose", this._calcitePopoverCallback());
            this.generalPopoversNode.addEventListener("calcitePopoverClose", this._calcitePopoverCallback());
        };
        HelpIndicators.prototype.handleAllSeen = function () {
            var _a = this, indicatorData = _a.indicatorData, helpViewModel = _a.helpViewModel;
            var allHelpInfos = helpViewModel.allHelpInfos;
            if (!indicatorData)
                return;
            var appKeys = Object.keys(indicatorData).filter(function (dataKey) {
                return allHelpInfos.find(function (info) { return info.id === dataKey; });
            });
            var allHelpInfosLength = allHelpInfos.length;
            var appKeysLength = appKeys.length;
            if (appKeysLength === allHelpInfosLength)
                this._set("allSeen", true);
        };
        HelpIndicators.prototype.updateLocalStorage = function () {
            var dataStr = JSON.stringify(this.indicatorData);
            localStorage.setItem(LOCAL_STORAGE_KEY, dataStr);
        };
        HelpIndicators.prototype._calcitePopoverCallback = function () {
            var _this = this;
            return function (e) {
                var node = e.target;
                var refId = node.getAttribute("ref-id");
                _this._handleIndicatorData(refId);
                _this.handleAllSeen();
            };
        };
        HelpIndicators.prototype._handleIndicatorData = function (refId) {
            var _a, _b;
            var indicators = localStorage.getItem(LOCAL_STORAGE_KEY);
            var data;
            if (!indicators) {
                data = (_a = {}, _a[refId] = 1, _a);
            }
            else {
                var currentData = JSON.parse(indicators);
                data = tslib_1.__assign(tslib_1.__assign({}, currentData), (_b = {}, _b[refId] = 1, _b));
            }
            this.indicatorData = data;
            var dataStr = JSON.stringify(data);
            localStorage.setItem(LOCAL_STORAGE_KEY, dataStr);
        };
        tslib_1.__decorate([
            decorators_1.property({
                readOnly: true
            })
        ], HelpIndicators.prototype, "allSeen", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpIndicators.prototype, "indicatorData", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpIndicators.prototype, "onboardingPopoversNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpIndicators.prototype, "generalPopoversNode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpIndicators.prototype, "helpViewModel", void 0);
        HelpIndicators = tslib_1.__decorate([
            decorators_1.subclass("ConfigPanel.ConfigPanelViewModel.Help.HelpIndicators")
        ], HelpIndicators);
        return HelpIndicators;
    }(Accessor));
    return HelpIndicators;
});
