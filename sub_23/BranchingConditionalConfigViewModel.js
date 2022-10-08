define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles"], function (require, exports, tslib_1, decorators_1, Accessor_1, Handles) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var BranchingConditionalConfigViewModel = (function (_super) {
        tslib_1.__extends(BranchingConditionalConfigViewModel, _super);
        function BranchingConditionalConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            return _this;
        }
        BranchingConditionalConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        BranchingConditionalConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass('app.configWidgets.BranchingConditionalConfig.BranchingConditionalConfigViewModel')
        ], BranchingConditionalConfigViewModel);
        return BranchingConditionalConfigViewModel;
    }(Accessor_1.default));
    exports.default = BranchingConditionalConfigViewModel;
});
