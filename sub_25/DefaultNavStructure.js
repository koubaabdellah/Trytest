define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/widgets/Widget"], function (require, exports, tslib_1, decorators_1, Widget) {
    "use strict";
    var DefaultNavStructure = (function (_super) {
        tslib_1.__extends(DefaultNavStructure, _super);
        function DefaultNavStructure() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.structure = null;
            return _this;
        }
        DefaultNavStructure.prototype.getNavStructure = function (globalNavMessages) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    return [2, {
                            header: {
                                theme: "app",
                                collapseMenus: [true, false],
                                brand: {
                                    label: null,
                                    brandText: null,
                                    image: null,
                                    width: 30,
                                    height: 30
                                },
                                menus: [
                                    [
                                        {
                                            label: globalNavMessages.globalNav.account.profile,
                                            href: "#user-menu-link-1"
                                        },
                                        {
                                            label: globalNavMessages.globalNav.account.myEsri,
                                            href: "#user-menu-link-2"
                                        },
                                        {
                                            label: globalNavMessages.globalNav.account.training,
                                            href: "#user-menu-link-3"
                                        },
                                        {
                                            label: globalNavMessages.globalNav.account.community,
                                            href: "#user-menu-link-4"
                                        }
                                    ]
                                ],
                                account: {
                                    label: globalNavMessages.globalNav.account.label,
                                    controls: {
                                        signin: globalNavMessages.globalNav.account.signin,
                                        signout: globalNavMessages.globalNav.account.signout,
                                        switch: globalNavMessages.globalNav.account.switch
                                    },
                                    menus: [
                                        { label: "profile & settings", href: "./user.html" },
                                        { label: "my esri", href: "#", data: { agoMethod: "goMyesri" } },
                                        { label: "training", href: "#", data: { agoMethod: "goTraining" } },
                                        {
                                            label: "community & forums",
                                            href: "#",
                                            data: { agoMethod: "goEsriCommunity" }
                                        },
                                        { label: "help", href: "http://doc.arcgis.com/en/arcgis-online/" }
                                    ],
                                    user: {}
                                },
                                notifications: {
                                    label: globalNavMessages.globalNav.notifications.label,
                                    dismissAllLabel: globalNavMessages.globalNav.notifications
                                        .dismissAllLabel,
                                    dismissLabel: globalNavMessages.globalNav.notifications
                                        .dismissLabel,
                                    clearAllLabel: globalNavMessages.globalNav.notifications
                                        .clearAllLabel,
                                    emptyMessage: {
                                        image: {
                                            path: [
                                                "M15.5 1A14.5 14.5 0 1 0 30 15.5 14.5 14.5 0 0 0 15.5 1zm0 28.1a13.6 13.6 0 1 1 13.6-13.6 13.615 13.615 0 0 1-13.6 13.6zM8.581 17.276l.637-.636 3.288 3.098 10.073-9.92.637.637-10.71 10.556z"
                                            ],
                                            viewBox: "0 0 32 32"
                                        },
                                        text: globalNavMessages.globalNav.notifications
                                            .emptyMessageLabel
                                    },
                                    messages: []
                                }
                            }
                        }];
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], DefaultNavStructure.prototype, "structure", void 0);
        return DefaultNavStructure;
    }(Widget));
    return DefaultNavStructure;
});
