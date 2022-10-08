define(["require", "exports", "tslib", "dojo/_base/lang", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/identity/IdentityManager", "esri-global-nav", "AGOWebWorkerInterface", "./DefaultNavStructure", "../../utils/notifications", "../../utils/utils", "esri/widgets/support/widget"], function (require, exports, tslib_1, lang, decorators_1, Widget, IdentityManager, globalNav, globalNavResources, DefaultNavStructure, notifications_1, utils_1, widget_1) {
    "use strict";
    var GlobalNav = (function (_super) {
        tslib_1.__extends(GlobalNav, _super);
        function GlobalNav(params) {
            var _this = _super.call(this, params) || this;
            _this._defaultNavStructure = null;
            _this._navLinks = null;
            _this._navResources = null;
            _this.appConfig = null;
            _this.item = null;
            _this.portal = null;
            _this.globalNavMessages = null;
            _this.mapMessages = null;
            return _this;
        }
        GlobalNav.prototype.createHeader = function (appTemplateName) {
            var _a;
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var menuData, itemTitle, titleNode, heading, isMobile, titleVal, fadeNode;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, this._getNavStructure()];
                        case 1:
                            menuData = _b.sent();
                            itemTitle = (_a = this === null || this === void 0 ? void 0 : this.item) === null || _a === void 0 ? void 0 : _a.title;
                            titleNode = document.createElement("header");
                            titleNode.classList.add("esri-global-nav__title-node-container");
                            heading = document.createElement("h1");
                            heading.classList.add("esri-global-nav__title");
                            isMobile = window.matchMedia("(max-width: 767px)").matches;
                            titleVal = isMobile
                                ? itemTitle.length > 40
                                    ? itemTitle.slice(0, 40)
                                    : itemTitle
                                : itemTitle.length > 65
                                    ? itemTitle.slice(0, 65)
                                    : itemTitle;
                            heading.innerHTML = "<span class=\"esri-config-panel__global-nav-primary-header\">" + this.globalNavMessages.configuring + " " + appTemplateName + ":</span> " + titleVal;
                            titleNode.appendChild(heading);
                            if ((isMobile && itemTitle.length > 40) || itemTitle.length > 65) {
                                fadeNode = document.createElement("span");
                                fadeNode.classList.add("esri-config-panel__global-nav-text-fade");
                                heading.appendChild(fadeNode);
                            }
                            menuData.header.brand.label = titleNode;
                            menuData.header.brand.brandText = titleNode;
                            globalNav.createHeader({
                                targetElm: ".global-nav",
                                menuData: menuData
                            });
                            this._addEventListeners();
                            return [2];
                    }
                });
            });
        };
        GlobalNav.prototype._getNavStructure = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var defaultNavStructure, navStructure;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            defaultNavStructure = new DefaultNavStructure();
                            return [4, defaultNavStructure.getNavStructure(this.globalNavMessages)];
                        case 1:
                            navStructure = _a.sent();
                            this._defaultNavStructure = navStructure;
                            this._navLinks = this._buildNavLinks();
                            if (this.portal.user) {
                                this._getSignedInNavStructure();
                            }
                            else {
                                this._getSignedOutNavStructure();
                            }
                            this._setAccount();
                            return [4, this._setNotifications()];
                        case 2:
                            _a.sent();
                            return [2, navStructure];
                    }
                });
            });
        };
        GlobalNav.prototype._buildNavLinks = function () {
            var portal = this.portal;
            var user = portal.user || {};
            var userRole = user === null || user === void 0 ? void 0 : user.userRole;
            var portalHost = utils_1.getBaseUrl(portal);
            var helpUrl = this._getHelpUrl();
            var show = this._showEsriLinks();
            var esriCommunityUrl = this._getEsriCommunityUrl();
            var myEsriUrl = this._getMyEsriUrl();
            var esriTrainingUrl = this._getEsriTrainingUrl();
            return {
                myProfile: {
                    href: portalHost + "/home/user.html"
                },
                pricing: {
                    href: portalHost + "/features/plans/pricing.html"
                },
                overview: {
                    href: portalHost + "/features/features.html"
                },
                groups: {
                    href: portalHost + "/home/groups.html"
                },
                myContent: {
                    href: portalHost + "/home/content.html"
                },
                help: {
                    href: helpUrl,
                    openInNewTab: true
                },
                gallery: {
                    show: portal.id,
                    href: portalHost + "/home/gallery.html"
                },
                home_link: {
                    href: portalHost + "/home/index.html"
                },
                map: {
                    href: portalHost + "/home/webmap/viewer.html"
                },
                scene: {
                    href: portalHost + "/home/webscene/viewer.html"
                },
                notebook: {
                    show: userRole === null || userRole === void 0 ? void 0 : userRole.canCreateNotebooks(),
                    href: portalHost + "/home/notebook/notebook.html"
                },
                myAccount: {
                    show: this._orgPageRestrictionsDoNotApply() && this._canViewOrgUsers(),
                    href: portalHost + "/home/organization.html"
                },
                esriCommunity: {
                    show: show,
                    href: esriCommunityUrl,
                    openInNewTab: true
                },
                myEsri: {
                    show: show,
                    href: myEsriUrl,
                    openInNewTab: true
                },
                training: {
                    show: show,
                    href: esriTrainingUrl,
                    openInNewTab: true
                }
            };
        };
        GlobalNav.prototype._getHelpUrl = function () {
            var isPortal = this.portal.isPortal;
            if (isPortal) {
                return this._getPortalHelpUrl();
            }
            else {
                return this.appConfig.helpDocLink;
            }
        };
        GlobalNav.prototype._getPortalHelpUrl = function () {
            var host = location.host, protocol = location.protocol, port = location.port;
            var _a = this.portal, allSSL = _a.allSSL, helpBase = _a.helpBase;
            var helpUrl = helpBase + "portal/";
            var secureUrl = this._getSecureUrl(protocol + "//" + host);
            return allSSL ||
                protocol === "https:" ||
                this._usePortalSSL() ||
                port === "7443"
                ? "" + secureUrl + helpUrl
                : helpUrl;
        };
        GlobalNav.prototype._usePortalSSL = function () {
            var _a = this.portal, isMultiTenant = _a.isMultiTenant, portalHostname = _a.portalHostname, httpPort = _a.httpPort, httpsPort = _a.httpsPort;
            return ((isMultiTenant === false || this.portal.isPortal()) &&
                portalHostname &&
                !portalHostname.match(/:7080\//) &&
                httpPort !== 80 &&
                httpsPort !== 443 &&
                location.protocol === "https:");
        };
        GlobalNav.prototype._getSecureUrl = function (url) {
            var _a;
            var secureUrl = null;
            if (!url) {
                url = utils_1.getBaseUrl(this.portal);
            }
            var _b = this.portal, httpPort = _b.httpPort, httpsPort = _b.httpsPort, portalMode = _b.portalMode;
            var hostname = location.hostname, port = location.port;
            if (!portalMode || portalMode !== "singletenant" || !httpsPort) {
                return url.replace("http:", "https:");
            }
            else {
                if (!port) {
                    secureUrl = url.replace(hostname, hostname + ":" + httpsPort);
                }
                else {
                    secureUrl = url.replace(port, httpsPort);
                    if ((_a = this.portal) === null || _a === void 0 ? void 0 : _a.isPortal) {
                        secureUrl = secureUrl.replace(httpPort, httpsPort);
                    }
                }
                secureUrl = secureUrl.replace("http:", "https:");
                return secureUrl.replace(/\:80\//, "/").replace(/\:443\//, "/");
            }
        };
        GlobalNav.prototype._orgPageRestrictionsDoNotApply = function () {
            var _a = this, appConfig = _a.appConfig, portal = _a.portal;
            var user = portal === null || portal === void 0 ? void 0 : portal.user;
            return (appConfig === null || appConfig === void 0 ? void 0 : appConfig.restrictOrganizationPageToAdmin) ? !this.portal.id || (user.role && user.role === "account_admin")
                : true;
        };
        GlobalNav.prototype._canViewOrgUsers = function () {
            var _a, _b, _c;
            return (((_c = (_b = (_a = this.portal) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.privileges) === null || _c === void 0 ? void 0 : _c.indexOf("portal:user:viewOrgUsers")) > -1);
        };
        GlobalNav.prototype._showEsriLinks = function () {
            var _a = this.portal, isPortal = _a.isPortal, user = _a.user;
            return !isPortal && (user === null || user === void 0 ? void 0 : user.userType) === "both";
        };
        GlobalNav.prototype._getEsriCommunityUrl = function () {
            var appConfig = this.appConfig;
            return this._generateEsriLoginHandlerUrl(appConfig.esriCommunityLink);
        };
        GlobalNav.prototype._generateEsriLoginHandlerUrl = function (url) {
            var _a, _b;
            var username = (_b = (_a = this.portal) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
            var env = this._getDevEnviroment(), devStg = env ? (env === "dev" ? "-dev" : "-stg") : "", esriBaseUrl = "https://accounts" + devStg + ".esri.com/", sharingRest = this._getRestBaseUrl().replace("/apps/sharing/rest/", ""), authBaseUrl = "&authBaseUrl=" + sharingRest, esriLoginHandlerUrl = esriBaseUrl + "LoginHandler/switchuser?", params = "username=" + username + "&redirect_uri=" + url + authBaseUrl;
            return "" + esriLoginHandlerUrl + params;
        };
        GlobalNav.prototype._getDevEnviroment = function () {
            var portalHostname = this.portal.portalHostname;
            if (portalHostname && portalHostname.indexOf("dev") !== -1) {
                return "dev";
            }
            else if (portalHostname && portalHostname.indexOf("qa") !== -1) {
                return "qa";
            }
            return null;
        };
        GlobalNav.prototype._getRestBaseUrl = function () {
            var host = location.host, protocol = location.protocol;
            var context = this._getHomeContext();
            return protocol + "//" + host + "/" + context + "/sharing/rest/";
        };
        GlobalNav.prototype._getHomeContext = function () {
            var pathParts = window.location.pathname.split("/").filter(function (part) {
                return part;
            });
            var context = pathParts && pathParts.length ? pathParts[0] : "/";
            if (context !== "/" && context !== "home") {
                return "" + context;
            }
            return context;
        };
        GlobalNav.prototype._getMyEsriUrl = function () {
            var appConfig = this.appConfig;
            return this._generateEsriLoginHandlerUrl(appConfig.myEsriLink);
        };
        GlobalNav.prototype._getEsriTrainingUrl = function () {
            var url = this._generateEsriTrainingUrl();
            return this._generateEsriLoginHandlerUrl("" + window.location.protocol + url);
        };
        GlobalNav.prototype._generateEsriTrainingUrl = function () {
            var _a, _b;
            var esriTrainingMain = "//www.esri.com/training/main/arcgis-online-";
            var esriTraining = esriTrainingMain + "training";
            var linkUrls = {
                administrator: esriTrainingMain + "administrators",
                publisher: esriTrainingMain + "publishers",
                user: esriTrainingMain + "users",
                public: esriTraining,
                custom: esriTraining
            };
            if ((_b = (_a = this.portal) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.role) {
                if (this._isAdmin() || this._isBasedOnAdmin()) {
                    return linkUrls["administrator"];
                }
                else if (this._isPublisher() || this._isBasedOnPublisher()) {
                    return linkUrls["publisher"];
                }
                else if (this._isUser() || this._isBasedOnUser()) {
                    return linkUrls["user"];
                }
                else if (this._isCustom()) {
                    return linkUrls["custom"];
                }
            }
            else {
                return linkUrls["public"];
            }
        };
        GlobalNav.prototype._isAdmin = function () {
            var id = this.id;
            return (this._isDefined(id) && (id === "org_admin" || id === "account_admin"));
        };
        GlobalNav.prototype._isBasedOnAdmin = function () {
            var role = this.portal.user.role;
            return (this._isAdmin() ||
                (this._isDefined(role) &&
                    (role === "org_admin" || role === "account_admin")));
        };
        GlobalNav.prototype._isPublisher = function () {
            var id = this.id;
            return (this._isDefined(id) &&
                (id === "org_publisher" || id === "account_publisher"));
        };
        GlobalNav.prototype._isBasedOnPublisher = function () {
            var role = this.portal.user.role;
            return (this._isPublisher() ||
                (this._isDefined(role) &&
                    (role === "org_publisher" || role === "account_publisher")));
        };
        GlobalNav.prototype._isUser = function () {
            var id = this.id;
            return this._isDefined(id) && (id === "org_user" || id === "account_user");
        };
        GlobalNav.prototype._isBasedOnUser = function () {
            var role = this.portal.user.role;
            return (this._isUser() ||
                (this._isDefined(role) &&
                    (role === "org_user" || role === "account_user")));
        };
        GlobalNav.prototype._isCustom = function () {
            var id = this.id;
            return (!this._isUser() &&
                !this._isPublisher() &&
                !this._isAdmin() &&
                this._isDefined(id) &&
                id.length > 0);
        };
        GlobalNav.prototype._isDefined = function (value) {
            return value !== undefined && value !== null;
        };
        GlobalNav.prototype._getSignedInNavStructure = function () {
            var menuLinks = this._isPublicAccount()
                ? [
                    "home_link",
                    "overview",
                    "pricing",
                    "map",
                    "scene",
                    "groups",
                    "myContent"
                ]
                : [
                    "home_link",
                    "gallery",
                    "map",
                    "scene",
                    "notebook",
                    "groups",
                    "myContent",
                    "myAccount"
                ];
            var _defaultNavStructure = this._defaultNavStructure;
            _defaultNavStructure.header.menus = [
                this._filterAndCreateLinks(menuLinks, this.globalNavMessages.globalNav.links)
            ];
            return _defaultNavStructure;
        };
        GlobalNav.prototype._isPublicAccount = function () {
            var _a = this.portal, urlKey = _a.urlKey, isPortal = _a.isPortal, user = _a.user;
            return !urlKey && !isPortal && user ? true : false;
        };
        GlobalNav.prototype._getSignedOutNavStructure = function () {
            var isPortal = !this._showProductLinks();
            var isOrgUrl = this.portal.orgUrlKey;
            var menuLinks = ["ArcGIS", "overview", "pricing", "scene", "help"];
            if (!isPortal && isOrgUrl) {
                menuLinks = ["home_link", "gallery", "map", "scene", "help"];
            }
            else if (isPortal) {
                menuLinks = ["home_link", "gallery", "map", "scene", "groups"];
            }
            this._defaultNavStructure.header.menus = [
                this._filterAndCreateLinks(menuLinks, this.globalNavMessages.globalNav.links)
            ];
            return this._defaultNavStructure;
        };
        GlobalNav.prototype._showProductLinks = function () {
            var _a = this.portal, id = _a.id, access = _a.access, isPortal = _a.isPortal;
            return !id && !access && !isPortal;
        };
        GlobalNav.prototype._filterAndCreateLinks = function (links, i18n) {
            var _this = this;
            var linkArr = [];
            links.forEach(function (link) {
                var attributes = _this._navLinks[link];
                if (attributes && (!("show" in attributes) || attributes.show)) {
                    var linkValue = link === "map" ? _this.mapMessages[link] : i18n[link];
                    linkArr.push(_this._createGlobalNavLink(linkValue || link, attributes));
                }
            }, this);
            return linkArr;
        };
        GlobalNav.prototype._createGlobalNavLink = function (label, attributes) {
            return this._getGlobalNavLink(label, attributes);
        };
        GlobalNav.prototype._getGlobalNavLink = function (label, attributes) {
            var href = attributes.href, data = attributes.data, active = attributes.active, openInNewTab = attributes.openInNewTab;
            return {
                label: label,
                href: href
                    ? typeof href === "function"
                        ? attributes.href()
                        : href
                    : "#",
                data: data,
                active: active,
                newContext: openInNewTab
            };
        };
        GlobalNav.prototype._setAccount = function () {
            var _a = this, portal = _a.portal, _defaultNavStructure = _a._defaultNavStructure;
            var portalUser = portal.user;
            var account = _defaultNavStructure.header.account;
            if (portalUser) {
                this._generateGlobalNavResources();
                var fullName = portalUser.fullName, username = portalUser.username;
                var pathname = window.location.pathname;
                var distPath = pathname.substring(0, pathname.lastIndexOf("/"));
                var userStructure = {
                    name: fullName,
                    id: username,
                    group: "",
                    image: portalUser.getThumbnailUrl() ||
                        distPath + "/assets/images/no-user-thumb.jpg"
                };
                account.user = userStructure;
                _defaultNavStructure.header.account.menus = this._filterAndCreateLinks(["myProfile", "myEsri", "training", "esriCommunity", "help"], this.globalNavMessages.globalNav.links);
            }
            else {
                delete account.user;
            }
        };
        GlobalNav.prototype._setNotifications = function () {
            var _a = this, portal = _a.portal, _defaultNavStructure = _a._defaultNavStructure;
            var user = portal.user;
            if (user) {
                this._listenForDismissNotification();
                return notifications_1.fetchNotifications(portal, this.globalNavMessages).then(function (results) {
                    var notifications = _defaultNavStructure.header.notifications;
                    notifications.messages = results;
                    return results;
                });
            }
            else {
                delete _defaultNavStructure.header.notifications;
                return Promise.resolve([]);
            }
        };
        GlobalNav.prototype._listenForDismissNotification = function () {
            var _this = this;
            var _a = this.portal, portalUrl = _a.portalUrl, user = _a.user;
            document.addEventListener("header:click:notifications:dismiss", function (event) {
                notifications_1.deleteNotifications(portalUrl, user, event.detail).then(function (removed) {
                    var removedIds = removed.reduce(function (validNotifications, result) {
                        var _a, _b;
                        if ((_b = (_a = result === null || result === void 0 ? void 0 : result.value) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.success) {
                            validNotifications.push(result.value.data.notificationId);
                        }
                        return validNotifications;
                    }, []);
                    _this._updateNotificationsComponent((_this._defaultNavStructure.header.notifications.messages || []).filter(function (notification) { return removedIds.indexOf(notification.id) < 0; }));
                });
            });
        };
        GlobalNav.prototype._updateNotificationsComponent = function (messages) {
            this._defaultNavStructure.header.notifications.messages = messages;
            this._updateComponent("header:update:notifications", document.querySelector(".esri-header-notifications"), this._getDefaultNotifications(messages));
            if (messages.length === 0) {
                this._updateComponent("header:menu:close", document.querySelector(".esri-header-notifications"), null);
            }
        };
        GlobalNav.prototype._updateComponent = function (componentEvent, componentElement, componentData) {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent(componentEvent, true, true, componentData);
            componentElement.dispatchEvent(event);
        };
        GlobalNav.prototype._getDefaultNotifications = function (messages) {
            return {
                label: this.globalNavMessages.notifications.label,
                dismissAllLabel: this.globalNavMessages.notifications.dismissAllLabel,
                dismissLabel: this.globalNavMessages.notifications.dismissLabel,
                emptyMessage: {
                    image: {
                        path: [
                            "M15.5 1A14.5 14.5 0 1 0 30 15.5 14.5 14.5 0 0 0 15.5 1zm0 28.1a13.6 13.6 0 1 1 13.6-13.6 13.615 13.615 0 0 1-13.6 13.6zM8.581 17.276l.637-.636 3.288 3.098 10.073-9.92.637.637-10.71 10.556z"
                        ],
                        viewBox: "0 0 32 32"
                    },
                    text: this.globalNavMessages.notifications.noNotifications
                },
                messages: messages || []
            };
        };
        GlobalNav.prototype._generateGlobalNavResources = function () {
            if (!this._canAccessAppLauncher()) {
                return;
            }
            if (!this.portal.isPortal) {
                this._defaultNavStructure.header.apps = this._appsJson(null);
            }
            this.portal.user.credential = { token: this._getEsriAuthCookie().token };
            this.portal.portalUrl = this._getPortalRestUrl();
            var data = {
                noStrings: true,
                resources: ["AppLauncher"],
                clientId: "arcgisonline",
                orgUrlKey: this.portal.urlKey,
                environment: this._getEnvironment(),
                portal: this.portal,
                portalUser: this.portal.user
            };
            this._navResources = globalNavResources.default.init(data, this._getApps.bind(this));
        };
        GlobalNav.prototype._canAccessAppLauncher = function () {
            var _a, _b;
            return ((_b = (_a = this.portal) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.orgId) ? true : false;
        };
        GlobalNav.prototype._appsJson = function (appsData) {
            return lang.mixin({
                text: {
                    dragAndDropIntroText: this.globalNavMessages.globalNav.appLauncher
                        .dragAndDropIntroText,
                    gotIt: this.globalNavMessages.globalNav.appLauncher.gotIt,
                    showMore: this.globalNavMessages.globalNav.appLauncher.showMore,
                    dragAppsHere: this.globalNavMessages.globalNav.appLauncher
                        .dragAppsHere
                },
                label: this.globalNavMessages.globalNav.appLauncher.label,
                disableDragDrop: false,
                loading: !appsData
            }, appsData);
        };
        GlobalNav.prototype._getEsriAuthCookie = function () {
            var cookie = this._getCookie("esri_auth");
            return cookie ? JSON.parse(cookie) : {};
        };
        GlobalNav.prototype._getCookie = function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };
        GlobalNav.prototype._getPortalRestUrl = function () {
            var _a = this.portal, customBaseUrl = _a.customBaseUrl, portalHostname = _a.portalHostname, urlKey = _a.urlKey;
            var portalHost = urlKey ? urlKey + "." + customBaseUrl : portalHostname;
            return "https://" + portalHost + "/sharing/rest/";
        };
        GlobalNav.prototype._getEnvironment = function () {
            var _a;
            var env = (_a = location.href.split(".")[1]) === null || _a === void 0 ? void 0 : _a.replace("maps", "");
            return env || "production";
        };
        GlobalNav.prototype._getApps = function (connection) {
            if (connection.success) {
                this._navResources.performAction("AppLauncher", "getApps", { noStrings: true }, this._createAppLauncher.bind(this));
            }
        };
        GlobalNav.prototype._createAppLauncher = function (appsData) {
            var _this = this;
            var _a, _b;
            if (!((_a = appsData === null || appsData === void 0 ? void 0 : appsData.primary) === null || _a === void 0 ? void 0 : _a.length) && !((_b = appsData === null || appsData === void 0 ? void 0 : appsData.secondary) === null || _b === void 0 ? void 0 : _b.length)) {
                return;
            }
            this._updateAppLauncherComponent(appsData);
            document
                .querySelector(".esri-header-barrier")
                .addEventListener("header:apps:reorder", function (data) {
                _this._navResources.performAction("AppLauncher", "setApps", data.detail.icons, function () { return ({}); });
            });
        };
        GlobalNav.prototype._updateAppLauncherComponent = function (data) {
            this._updateComponent("header:update:apps", document.querySelector(".esri-header-apps"), this._appsJson(data));
        };
        GlobalNav.prototype._addEventListeners = function () {
            var _this = this;
            var esriHeader = document.querySelector(".esri-header-barrier");
            esriHeader.addEventListener("header:click:signin", function () {
                IdentityManager.getCredential(_this.portal.url);
            });
            esriHeader.addEventListener("header:click:signout", this._logoutOfAccount.bind(this));
            esriHeader.addEventListener("header:click:switch", this._openSwitchAccounts.bind(this));
        };
        GlobalNav.prototype._logoutOfAccount = function (event) {
            event.preventDefault();
            if (this.portal.isPortal) {
                IdentityManager.destroyCredentials();
            }
            this._agolLogOut();
        };
        GlobalNav.prototype._agolLogOut = function () {
            var portalHost = utils_1.getBaseUrl(this.portal);
            var signOutUrl = portalHost + "/home/pages/Account/manage_accounts.html";
            window.location.href = signOutUrl + "#client_id=arcgisonline&signout=true&redirect_uri=" + portalHost;
        };
        GlobalNav.prototype._openSwitchAccounts = function () {
            var href = window.location.href;
            var redirectUri = href.replace("index", "account-switcher-callback");
            var portalHost = utils_1.getBaseUrl(this.portal);
            var myWindow = window.open(portalHost + "/home/pages/Account/manage_accounts.html#client_id=arcgisonline&redirect_uri=" + redirectUri, "_blank");
            myWindow.focus();
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], GlobalNav.prototype, "appConfig", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GlobalNav.prototype, "item", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], GlobalNav.prototype, "portal", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/widgets/GlobalNav/resources")
        ], GlobalNav.prototype, "globalNavMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.messageBundle("dist/assets/t9n/ui/sections/Map/resources")
        ], GlobalNav.prototype, "mapMessages", void 0);
        GlobalNav = tslib_1.__decorate([
            decorators_1.subclass("GlobalNav")
        ], GlobalNav);
        return GlobalNav;
    }(Widget));
    return GlobalNav;
});
