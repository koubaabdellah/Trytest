define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/Handles", "esri/core/watchUtils"], function (require, exports, tslib_1, decorators_1, Accessor, Handles, watchUtils_1) {
    "use strict";
    var GroupBrowserConfigViewModel = (function (_super) {
        tslib_1.__extends(GroupBrowserConfigViewModel, _super);
        function GroupBrowserConfigViewModel(params) {
            var _this = _super.call(this, params) || this;
            _this._handles = new Handles();
            return _this;
        }
        Object.defineProperty(GroupBrowserConfigViewModel.prototype, "savedState", {
            set: function (savedState) {
                this.set("selectedGroupId", savedState);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GroupBrowserConfigViewModel.prototype, "selectedGroupId", {
            set: function (id) {
                this._selectedGroupId = id;
            },
            enumerable: false,
            configurable: true
        });
        GroupBrowserConfigViewModel.prototype.initialize = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "_selectedGroupId", function (id) {
                if (!_this.selectedGroup) {
                    _this.portal.load().then(function () {
                        _this.portal.queryGroups({
                            query: "id: " + id,
                            num: 1
                        }).then(function (_a) {
                            var results = _a.results;
                            if (results.length > 0) {
                                _this.selectedGroup = results[0];
                            }
                        });
                    });
                }
            });
        };
        GroupBrowserConfigViewModel.prototype.destroy = function () {
            this._handles.removeAll();
            this._handles.destroy();
        };
        GroupBrowserConfigViewModel.prototype.makeOutput = function () {
            var _this = this;
            watchUtils_1.whenOnce(this, "_selectedGroupId", function () {
                _this.output = _this._selectedGroupId;
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowserConfigViewModel.prototype, "savedState", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowserConfigViewModel.prototype, "output", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowserConfigViewModel.prototype, "selectedGroupId", null);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowserConfigViewModel.prototype, "selectedGroup", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowserConfigViewModel.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GroupBrowserConfigViewModel.prototype, "_selectedGroupId", void 0);
        GroupBrowserConfigViewModel = tslib_1.__decorate([
            decorators_1.subclass("GroupBrowserConfigViewModel")
        ], GroupBrowserConfigViewModel);
        return GroupBrowserConfigViewModel;
    }(Accessor));
    return GroupBrowserConfigViewModel;
});
