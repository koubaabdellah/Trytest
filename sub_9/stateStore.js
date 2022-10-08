define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor) {
    "use strict";
    var StateStore = (function (_super) {
        tslib_1.__extends(StateStore, _super);
        function StateStore(params) {
            var _this = _super.call(this, params) || this;
            _this.router = "LayerSelector";
            _this.supportedFieldTypes = "*";
            return _this;
        }
        tslib_1.__decorate([
            decorators_1.property()
        ], StateStore.prototype, "router", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], StateStore.prototype, "savedState", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], StateStore.prototype, "loadedMap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], StateStore.prototype, "fieldSelectionMode", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], StateStore.prototype, "supportedFieldTypes", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], StateStore.prototype, "excludeFields", void 0);
        StateStore = tslib_1.__decorate([
            decorators_1.subclass("StateStore")
        ], StateStore);
        return StateStore;
    }(Accessor));
    return StateStore;
});
