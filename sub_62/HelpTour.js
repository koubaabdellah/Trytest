define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators"], function (require, exports, tslib_1, Accessor, decorators_1) {
    "use strict";
    var CONFIG_APPS_INSTANT = "CONFIG_APPS_INSTANT-";
    var AGOL_RELEASE = "10.2";
    var ONBOARDING_LS_KEY = "" + CONFIG_APPS_INSTANT + AGOL_RELEASE;
    var LOAD_INTERVAL_DELAY = 100;
    var TOUR_DELAY = 1000;
    var HelpTour = (function (_super) {
        tslib_1.__extends(HelpTour, _super);
        function HelpTour(props) {
            return _super.call(this, props) || this;
        }
        HelpTour.prototype.initialize = function () {
            this.handleTour();
        };
        HelpTour.prototype.handleTour = function () {
            var onboardingLS = localStorage.getItem(ONBOARDING_LS_KEY);
            var isSubsequentVisit = onboardingLS === "true" ? false : true;
            if (!isSubsequentVisit)
                return;
            if (!onboardingLS) {
                localStorage.setItem(ONBOARDING_LS_KEY, "true");
                var tourInterval = {};
                var callback = this._setupIntervalCallback(this._tourIntervalCallback.bind(this, tourInterval));
                this._setupInterval(callback, tourInterval, LOAD_INTERVAL_DELAY);
            }
        };
        HelpTour.prototype._tourIntervalCallback = function (intervalObj) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var instantAppsPopovers, popoverKeys, popoverArr, firstItem, refInterval, callback;
                return tslib_1.__generator(this, function (_b) {
                    instantAppsPopovers = (_a = this.onboardingPopovers) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers;
                    if ((instantAppsPopovers === null || instantAppsPopovers === void 0 ? void 0 : instantAppsPopovers.size) > 0) {
                        clearInterval(intervalObj.id);
                        popoverKeys = instantAppsPopovers.keys();
                        popoverArr = Array.from(popoverKeys);
                        firstItem = popoverArr[0];
                        refInterval = {};
                        callback = this._setupIntervalCallback(this._firstRefElementCallback.bind(this, instantAppsPopovers, firstItem, refInterval));
                        this._setupInterval(callback, refInterval, LOAD_INTERVAL_DELAY);
                    }
                    return [2];
                });
            });
        };
        HelpTour.prototype._firstRefElementCallback = function (instantAppsPopovers, firstItem, intervalObj) {
            var _this = this;
            var firstPopover = instantAppsPopovers === null || instantAppsPopovers === void 0 ? void 0 : instantAppsPopovers.get(firstItem);
            var referenceElement = firstPopover === null || firstPopover === void 0 ? void 0 : firstPopover.referenceElement;
            if (referenceElement) {
                clearInterval(intervalObj.id);
                setTimeout(function () { return _this.onboardingPopovers.beginTour(); }, TOUR_DELAY);
            }
        };
        HelpTour.prototype._setupInterval = function (callback, intervalObj, intervalNum) {
            intervalObj["id"] = setInterval(callback, intervalNum);
        };
        HelpTour.prototype._setupIntervalCallback = function (callback) {
            return function () { return callback(); };
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], HelpTour.prototype, "onboardingPopovers", void 0);
        HelpTour = tslib_1.__decorate([
            decorators_1.subclass("ConfigPanel.ConfigPanelViewModel.Help.HelpTour")
        ], HelpTour);
        return HelpTour;
    }(Accessor));
    return HelpTour;
});
