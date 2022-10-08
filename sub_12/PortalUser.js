define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/request", "esri/portal/PortalUser", "./Role"], function (require, exports, tslib_1, decorators_1, esriRequest, EsriPortalUser, Role_1) {
    "use strict";
    Role_1 = tslib_1.__importDefault(Role_1);
    var PortalUser = (function (_super) {
        tslib_1.__extends(PortalUser, _super);
        function PortalUser(params) {
            var _this = _super.call(this, params) || this;
            _this.isOrgUser = false;
            _this.isOrgAdmin = false;
            _this.isViewOnly = false;
            _this.canCreateItems = false;
            _this.canShare = false;
            _this.canShareOthers = false;
            _this.hasSubscriberContent = null;
            return _this;
        }
        PortalUser.prototype.init = function () {
            var userRole = (this.userRole = this.setRole());
            var portal = this.portal;
            this.isOrgUser =
                (portal.urlKey && portal.customBaseUrl) || portal.isPortal ? true : false;
            this.isOrgAdmin = userRole.isAdmin();
            this.canCreateItems = !this.isOrgUser || userRole.canCreateItem();
            this.canShare =
                !this.isOrgUser ||
                    userRole.canShareItemToGroup() ||
                    userRole.canShareItemToOrg() ||
                    (portal.canSharePublic && userRole.canShareItemToPublic());
            this.canShareOthers =
                userRole.canShareOthersItemsToGroup() ||
                    userRole.canShareOthersItemsToOrg() ||
                    (portal.canSharePublic && userRole.canShareOthersItemsToPublic());
        };
        PortalUser.prototype.setRole = function () {
            this.userRole = new Role_1.default({
                portalUser: this
            });
            return this.userRole;
        };
        PortalUser.prototype.hasSubscriptionContent = function () {
            var _this = this;
            var method = "get";
            var query = { f: "json", num: 1 };
            var responseType = "json";
            var reqOpts = {
                callbackParamName: "callback",
                method: method,
                query: query,
                responseType: responseType
            };
            var _a = this, hasSubscriberContent = _a.hasSubscriberContent, portal = _a.portal;
            var url = portal.restUrl + "/community/users/" + this.username + "/provisionedListings";
            return new Promise(function (resolve, reject) {
                if (hasSubscriberContent !== null) {
                    resolve(hasSubscriberContent);
                }
                else {
                    esriRequest(url, reqOpts).then(function (response) {
                        var data = (response && response.data) || {};
                        var hasSubscriberContent = (_this.hasSubscriberContent =
                            data.total > 0);
                        resolve(hasSubscriberContent);
                    });
                }
            });
        };
        PortalUser = tslib_1.__decorate([
            decorators_1.subclass("esri.portal.PortalUser")
        ], PortalUser);
        return PortalUser;
    }(EsriPortalUser));
    return PortalUser;
});
