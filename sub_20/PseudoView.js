define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/reactiveUtils", "esri/core/Handles"], function (require, exports, tslib_1, decorators_1, Accessor, reactiveUtils_1, Handles) {
    "use strict";
    var PseudoView = (function (_super) {
        tslib_1.__extends(PseudoView, _super);
        function PseudoView(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            _this.basemapBackgroundColor = null;
            _this.view = null;
            return _this;
        }
        PseudoView.prototype.initialize = function () {
            var _this = this;
            this._handles.add(reactiveUtils_1.when(function () { var _a; return (_a = _this.view) === null || _a === void 0 ? void 0 : _a.container; }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, reactiveUtils_1.whenOnce(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { var _a; return tslib_1.__generator(this, function (_b) {
                                return [2, (_a = this.view) === null || _a === void 0 ? void 0 : _a.ready];
                            }); }); })];
                        case 1:
                            _a.sent();
                            this.view.ui.components = [];
                            this._disableTabIndex(this.view.container);
                            return [2];
                    }
                });
            }); }));
        };
        PseudoView.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
            this._handles = null;
        };
        PseudoView.prototype._disableTabIndex = function (node) {
            var childrenArray = Array.from(node.children);
            for (var _i = 0, childrenArray_1 = childrenArray; _i < childrenArray_1.length; _i++) {
                var child = childrenArray_1[_i];
                child.tabIndex = -1;
                if (node.children.length > 0) {
                    this._disableTabIndex(child);
                }
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], PseudoView.prototype, "basemapBackgroundColor", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], PseudoView.prototype, "view", void 0);
        PseudoView = tslib_1.__decorate([
            decorators_1.subclass("PseudoView")
        ], PseudoView);
        return PseudoView;
    }(Accessor));
    return PseudoView;
});
