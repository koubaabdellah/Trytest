define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/request", "arcgis-components/wrappers/Share", "../../utils/focusUtils"], function (require, exports, tslib_1, Widget_1, widget_1, decorators_1, watchUtils_1, request_1, Share_1, focusUtils_1) {
    "use strict";
    Widget_1 = tslib_1.__importDefault(Widget_1);
    request_1 = tslib_1.__importDefault(request_1);
    var CSS = {
        base: "esri-config-panel-share-level",
        overlay: "esri-config-panel__share-level-overlay",
        overlayIsOpen: "esri-config-panel__share-level-overlay--open"
    };
    var ShareLevel = (function (_super) {
        tslib_1.__extends(ShareLevel, _super);
        function ShareLevel(value) {
            var _this = _super.call(this, value) || this;
            _this.shareWrapper = null;
            _this.configPanelViewModel = null;
            _this.isOpen = false;
            _this.messages = null;
            _this.itemHasGroups = false;
            return _this;
        }
        ShareLevel.prototype.render = function () {
            var _a;
            var shareLevelStyles = (_a = {},
                _a[CSS.overlayIsOpen] = this.isOpen,
                _a);
            return (widget_1.tsx("div", { bind: this, afterCreate: this._createShareLevel, key: CSS.base, class: this.classes(CSS.overlay, shareLevelStyles) }));
        };
        ShareLevel.prototype.checkForGroups = function (portalItem) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var itemUrl, req, dataValues, groupsArr, err_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            itemUrl = portalItem.itemUrl;
                            return [4, request_1.default(itemUrl + "/groups?f=json")];
                        case 1:
                            req = _a.sent();
                            dataValues = Object.values(req.data);
                            groupsArr = dataValues.reduce(function (acc, current) { return tslib_1.__spreadArrays(acc, current); });
                            return [2, groupsArr.length > 0];
                        case 2:
                            err_1 = _a.sent();
                            console.error("ERROR: ", err_1);
                            return [2, false];
                        case 3: return [2];
                    }
                });
            });
        };
        ShareLevel.prototype._createShareLevel = function (shareContainer) {
            var _this = this;
            watchUtils_1.whenOnce(this, "configPanelViewModel.templateAppItem", function () {
                watchUtils_1.whenOnce(_this, "configPanelViewModel.portal", function () {
                    var templateAppItem = _this.configPanelViewModel.templateAppItem;
                    var item = templateAppItem;
                    var portal = _this.configPanelViewModel.portal;
                    _this.shareWrapper = new Share_1.ShareWrapper(shareContainer, {
                        apiVersion: 4,
                        portal: portal,
                        portalUser: portal.user,
                        request: request_1.default,
                        initialState: {
                            resources: {
                                items: [item]
                            },
                            utilities: {
                                onCancel: function (payload) { return _this._onDone(payload); },
                                onComplete: function (payload) { return _this._onDone(payload); }
                            },
                            config: {
                                groupsPerPage: 100
                            }
                        }
                    });
                });
            });
        };
        ShareLevel.prototype._onDone = function (payload) {
            var _a;
            if ((_a = payload === null || payload === void 0 ? void 0 : payload.selectedOptions) === null || _a === void 0 ? void 0 : _a.total) {
                var configPanelViewModel = this.configPanelViewModel;
                this._setAccess(configPanelViewModel.templateAppItem, payload);
                configPanelViewModel.shareLevelUpdated = true;
            }
            this.isOpen = false;
            focusUtils_1.focusNode("shareLevelHelp");
        };
        ShareLevel.prototype._setAccess = function (templateAppItem, payload) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var selectedOptions, access;
                return tslib_1.__generator(this, function (_a) {
                    selectedOptions = payload.selectedOptions;
                    access = "private";
                    if (selectedOptions.public) {
                        access = "public";
                    }
                    else if (selectedOptions.org) {
                        access = "org";
                    }
                    templateAppItem.set("access", access);
                    return [2];
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ShareLevel.prototype, "shareWrapper", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ShareLevel.prototype, "configPanelViewModel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ShareLevel.prototype, "isOpen", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/Share/resources")
        ], ShareLevel.prototype, "messages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ShareLevel.prototype, "itemHasGroups", void 0);
        ShareLevel = tslib_1.__decorate([
            decorators_1.subclass("ShareLevel")
        ], ShareLevel);
        return ShareLevel;
    }(Widget_1.default));
    return ShareLevel;
});
