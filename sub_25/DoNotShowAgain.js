define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators"], function (require, exports, tslib_1, Accessor, decorators_1) {
    "use strict";
    var DoNotShowAgain = (function (_super) {
        tslib_1.__extends(DoNotShowAgain, _super);
        function DoNotShowAgain(params) {
            var _this = _super.call(this, params) || this;
            _this.doNotShowValues = {
                switch: null,
                reset: null,
                exit: null
            };
            return _this;
        }
        DoNotShowAgain.prototype.initialize = function () {
            this.handleCheckBoxValues();
        };
        DoNotShowAgain.prototype.handleCheckBoxValues = function () {
            var doNotShowKeys = Object.keys(this.doNotShowValues);
            var temp = {};
            doNotShowKeys.forEach(function (key) {
                var value = localStorage.getItem(key + "_doNotShow");
                temp[key] = value ? true : false;
            });
            this.set("doNotShowValues", temp);
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], DoNotShowAgain.prototype, "doNotShowValues", void 0);
        DoNotShowAgain = tslib_1.__decorate([
            decorators_1.subclass("DoNotShowAgain")
        ], DoNotShowAgain);
        return DoNotShowAgain;
    }(Accessor));
    return DoNotShowAgain;
});
