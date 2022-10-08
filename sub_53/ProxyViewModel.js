define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/portal/PortalItem", "dojo/Deferred", "dojo/_base/lang", "esri/request", "esri/core/watchUtils", "q", "./Proxy"], function (require, exports, tslib_1, decorators_1, Accessor_1, PortalItem_1, Deferred_1, lang_1, request_1, watchUtils_1, q_1, Proxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    PortalItem_1 = tslib_1.__importDefault(PortalItem_1);
    Deferred_1 = tslib_1.__importDefault(Deferred_1);
    lang_1 = tslib_1.__importDefault(lang_1);
    request_1 = tslib_1.__importDefault(request_1);
    var ProxyViewModel = (function (_super) {
        tslib_1.__extends(ProxyViewModel, _super);
        function ProxyViewModel() {
            var _this = _super.call(this) || this;
            _this.itemRequest = {};
            _this.appId = "";
            _this.item = null;
            _this.itemThumbnailUrl = "";
            _this.itemTitle = "";
            _this.subscribers = [];
            _this.premiums = [];
            _this.premiumLayers = [];
            _this.hasPremium = false;
            _this.hasSubscribers = false;
            _this.route = false;
            _this.referrers = [];
            _this.loaded = false;
            _this.errorMessage = null;
            _this.proxyMessages = null;
            _this.active = false;
            _this.clickedCancel = false;
            _this.clickedAuthorizeNo = false;
            _this.proxiesDone = false;
            _this._sharingBaseUrl = null;
            _this._owner = null;
            _this._folderId = null;
            _this._itemUrl = null;
            _this._registered = false;
            _this.init = _this.init.bind(_this);
            _this._registerApp = _this._registerApp.bind(_this);
            _this.createProxies = _this.createProxies.bind(_this);
            return _this;
        }
        ProxyViewModel.prototype.init = function (params) {
            var _this = this;
            this.loaded = false;
            this.itemRequest = params.itemRequest;
            this.appId = params.itemRequest.id;
            if (this.itemRequest) {
                this.item = new PortalItem_1.default(this.itemRequest);
                this.item.load().then(function (response) {
                    var _a;
                    _this.item = response;
                    _this.itemThumbnailUrl = response.thumbnailUrl;
                    _this.itemTitle = response.title;
                    _this._registered = ((_a = _this.item.typeKeywords) === null || _a === void 0 ? void 0 : _a.includes("Registered App")) || false;
                    _this.proxies = _this.item.applicationProxies ? _this.item.applicationProxies : [];
                    _this._sharingBaseUrl = response.portal.url + "/sharing/rest/";
                    _this._addReferrers(response.url);
                    _this._owner = response.owner;
                    _this._folderId = (response.ownerFolder && response.ownerFolder !== "root") ? response.ownerFolder : null;
                    _this._itemUrl = response.userItemUrl;
                    return _this._parse(_this.item).then(function () {
                        var deferred = new Deferred_1.default();
                        if (_this.route) {
                            var routeServiceItem = new PortalItem_1.default({
                                title: _this.proxyMessages.routeService,
                                url: _this.item.portal.helperServices.route.url
                            });
                            _this._addPremium(routeServiceItem);
                        }
                        return deferred.resolve;
                    });
                }).then(function () {
                    _this.loaded = true;
                }, function (r) {
                    _this.errorMessage = r;
                    _this.loaded = true;
                    console.error("You do not have access to this Item: \n", r);
                });
            }
            else {
                console.error("AppProxyManager: appid required.");
            }
        };
        ProxyViewModel.prototype._addSubscriber = function (url) {
            (this.proxies.filter(function (proxy) { return (proxy.sourceUrl === url); }).length > 0) ?
                null :
                this.subscribers.push(url);
        };
        ProxyViewModel.prototype._addPremium = function (item) {
            (this.proxies.filter(function (proxy) { return (proxy.sourceUrl === item.url); }).length > 0) ?
                null :
                this.premiums.push(item.url);
            this.premiumLayers.push({ id: item.id, title: item.title, url: item.url });
        };
        ProxyViewModel.prototype._parseLayerGroups = function (layers) {
            var _this = this;
            var arr = [];
            layers.forEach(function (layer) {
                var _a;
                var deferred = new Deferred_1.default();
                if (layer.itemId) {
                    var layerRequest = { id: layer.itemId, portal: _this.item.portal };
                    var layerItem_1 = new PortalItem_1.default(layerRequest);
                    arr.push(layerItem_1 ? layerItem_1.load().then(function () {
                        var keywords = layerItem_1.typeKeywords;
                        return request_1.default(layerItem_1.url, { responseType: "json", method: 'post', query: { f: "json" } }).then(function () {
                            var search = new URL(layerItem_1.url).search;
                            if (search) {
                                layerItem_1.url = layerItem_1.url.replace(search, "");
                            }
                            keywords.includes("Requires Subscription") ? _this._addSubscriber(layerItem_1.url) :
                                keywords.includes("Requires Credits") ? _this._addPremium(layerItem_1) :
                                    null;
                            return deferred.resolve;
                        }, function () {
                            console.warn("This item could not be fetched: ", layerItem_1.url);
                            return deferred.resolve;
                        });
                    }) : deferred.resolve);
                }
                if (((_a = layer.layers) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    arr.push.apply(arr, _this._parseLayerGroups(layer.layers));
                }
            });
            return arr;
        };
        ProxyViewModel.prototype._parseUrl = function (url) {
            var parser = document.createElement("a");
            parser.href = url;
            return parser;
        };
        ProxyViewModel.prototype._addReferrers = function (url) {
            var parser = this._parseUrl(url);
            var path = parser.pathname.substring(0, parser.pathname.lastIndexOf("/"));
            path = path.charAt(0) === "/" ? path : "/" + path;
            var domainPath = parser.hostname + path;
            this.referrers.push("http://" + parser.hostname, "https://" + parser.hostname, "http://" + domainPath, "https://" + domainPath, "http://www.arcgis.com" + path, "https://www.arcgis.com" + path);
            if (parser.hostname.indexOf("mapsdevext.arcgis.com") !== -1) {
                this.referrers.push("http://devext.arcgis.com" + path, "https://devext.arcgis.com" + path);
            }
            if (parser.hostname.indexOf("mapsqa.arcgis.com") !== -1) {
                this.referrers.push("http://qaext.arcgis.com" + path, "https://qaext.arcgis.com" + path);
            }
        };
        ProxyViewModel.prototype._parse = function (item) {
            var _this = this;
            var deferred = new Deferred_1.default();
            if (item.type === "Web Scene" || item.type === "Web Map") {
                return item.fetchData('json').then(function (response) {
                    var _a;
                    var basemapPromises = ((_a = response.baseMap) === null || _a === void 0 ? void 0 : _a.baseMapLayers) ?
                        _this._parseLayerGroups(response.baseMap.baseMapLayers) :
                        null;
                    var layerPromises = response.operationalLayers ?
                        _this._parseLayerGroups(response.operationalLayers) :
                        null;
                    var promises = tslib_1.__spreadArrays(basemapPromises, layerPromises);
                    return q_1.all(promises).then(function (response) { return deferred.resolve(response); });
                });
            }
            else if (item.type === "Web Mapping Application") {
                return item.fetchData('json').then(function (response) {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                    if (((_b = (_a = response === null || response === void 0 ? void 0 : response.values) === null || _a === void 0 ? void 0 : _a.draft) === null || _b === void 0 ? void 0 : _b.itemCollection) || ((_c = response === null || response === void 0 ? void 0 : response.values) === null || _c === void 0 ? void 0 : _c.itemCollection)) {
                        var collection = ((_e = (_d = response === null || response === void 0 ? void 0 : response.values) === null || _d === void 0 ? void 0 : _d.draft) === null || _e === void 0 ? void 0 : _e.itemCollection) || ((_f = response === null || response === void 0 ? void 0 : response.values) === null || _f === void 0 ? void 0 : _f.itemCollection);
                        var promises_1 = [];
                        collection.forEach(function (item) {
                            var portalItem = new PortalItem_1.default(tslib_1.__assign(tslib_1.__assign({}, _this.itemRequest), { id: item.id }));
                            promises_1.push(portalItem.load().then(function (r) { return _this._parse(r); }));
                        });
                        return q_1.all(promises_1).then(function (response) { return deferred.resolve(response); });
                    }
                    var webmap = ((_h = (_g = response === null || response === void 0 ? void 0 : response.values) === null || _g === void 0 ? void 0 : _g.draft) === null || _h === void 0 ? void 0 : _h.webmap) || ((_k = (_j = response === null || response === void 0 ? void 0 : response.values) === null || _j === void 0 ? void 0 : _j.draft) === null || _k === void 0 ? void 0 : _k.webscene) || ((_l = response === null || response === void 0 ? void 0 : response.values) === null || _l === void 0 ? void 0 : _l.webmap) || ((_m = response === null || response === void 0 ? void 0 : response.values) === null || _m === void 0 ? void 0 : _m.webscene) || false;
                    if (webmap) {
                        var webmapItem = new PortalItem_1.default(tslib_1.__assign(tslib_1.__assign({}, _this.itemRequest), { id: webmap }));
                        var promises = webmap ?
                            webmapItem.load().then(function (r) { return _this._parse(r); }) :
                            null;
                        return (promises).then(function (response) { return deferred.resolve(response); });
                    }
                    return deferred.resolve;
                });
            }
            else {
                item.typeKeywords ?
                    item.typeKeywords.includes("Requires Subscription") ? this._addSubscriber(this.item.url) :
                        item.typeKeywords.includes("Requires Credits") ? this._addPremium(this.item) :
                            null : null;
                return deferred.resolve;
            }
        };
        ProxyViewModel.prototype._registerApp = function () {
            var deferred = new Deferred_1.default();
            var id = this.item.id;
            var url = this._sharingBaseUrl + "oauth2/registerApp";
            var redirects = this.referrers;
            if (this._registered) {
                deferred.resolve(this.item);
            }
            else {
                request_1.default(url, {
                    method: "post",
                    query: {
                        "itemId": this.appId,
                        "appType": "browser",
                        "redirect_uris": JSON.stringify(redirects),
                        "f": "json"
                    },
                    responseType: "json"
                }).then(lang_1.default.hitch(this, function (response) {
                    return deferred.resolve(response);
                }), function (r) {
                    console.error("Error in registering: \n", r);
                    return deferred.reject;
                });
            }
            return deferred;
        };
        ProxyViewModel.prototype.createProxies = function (authorizePremium) {
            var _this = this;
            var deferred = new Deferred_1.default();
            var hasPremiums = this.premiums.length > 0;
            var hasSubscribers = this.subscribers.length > 0;
            if ((!hasPremiums || !authorizePremium) && !hasSubscribers) {
                return deferred.resolve();
            }
            this._registerApp().then(lang_1.default.hitch(this, function () {
                var params = {
                    referrers: _this.referrers
                };
                var proxies = [];
                var allItems = authorizePremium ? _this.premiums.concat(_this.subscribers) : _this.subscribers;
                for (var _i = 0, allItems_1 = allItems; _i < allItems_1.length; _i++) {
                    var url = allItems_1[_i];
                    var proxyEntry = {
                        sourceUrl: url
                    };
                    proxies.push(proxyEntry);
                }
                var contentUrl = (_this._sharingBaseUrl + "content/users/" + _this._owner + "/" +
                    (_this._folderId ? _this._folderId + "/" : "") +
                    ("items/" + _this.item.id + "/createProxies"));
                request_1.default(contentUrl, {
                    method: "post",
                    query: {
                        "proxies": JSON.stringify(proxies),
                        "serviceProxyParams": JSON.stringify(params),
                        "f": "json"
                    },
                    responseType: "json"
                }).then(lang_1.default.hitch(_this, function (response) {
                    var appProxies = (response && response.data && response.data.appProxies) ? response.data.appProxies : [];
                    this.proxies = appProxies;
                    console.warn("Proxies: \n", this.proxies);
                    deferred.resolve(appProxies);
                }), deferred.reject);
            }), deferred.reject);
            return deferred.promise;
        };
        ProxyViewModel.prototype.proxy = function (reinit, originalParams) {
            var _this = this;
            if (reinit === void 0) { reinit = false; }
            var deferred = new Deferred_1.default();
            if (reinit) {
                this.init(originalParams);
            }
            return watchUtils_1.whenOnce(this, "loaded", function () {
                _this.hasSubscribers = _this.subscribers.length > 0;
                _this.hasPremium = _this.premiums.length > 0;
                if (_this.hasPremium) {
                    _this.active = true;
                    return _this._proxyPremium(deferred);
                }
                else if (_this.hasSubscribers) {
                    return _this._proxySubscribers(deferred);
                }
                return deferred.resolve(Proxy_1.ProxyResponse.noProxies);
            }).then(function () {
                return deferred;
            });
        };
        ProxyViewModel.prototype._proxyPremium = function (deferred) {
            var _this = this;
            return watchUtils_1.whenOnce(this, ["clickedAuthorizeYes", "clickedAuthorizeNo", "clickedCancel"], function () {
                if (_this.clickedCancel) {
                    return deferred.resolve(Proxy_1.ProxyResponse.premiumCancel);
                }
                return watchUtils_1.whenOnce(_this, "proxiesDone", function () {
                    return deferred.resolve(Proxy_1.ProxyResponse.premiumYesOrNo);
                });
            });
        };
        ProxyViewModel.prototype._proxySubscribers = function (deferred) {
            var _this = this;
            return (this.createProxies(false)).then(function () {
                _this.clickedAuthorizeNo = true;
                _this.proxiesDone = true;
                return deferred.resolve(Proxy_1.ProxyResponse.subscriber);
            }, function (error) {
                console.error("Could not create subscriber content proxies: \n", error);
                _this.clickedAuthorizeNo = true;
                _this.proxiesDone = true;
                return deferred.resolve(Proxy_1.ProxyResponse.subsscriberError);
            });
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "itemRequest", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "appId", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "item", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "itemThumbnailUrl", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "itemTitle", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "subscribers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "premiums", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "premiumLayers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "hasPremium", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "hasSubscribers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "route", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "referrers", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "proxies", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "loaded", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "errorMessage", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "proxyMessages", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "active", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "clickedCancel", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "clickedAuthorizeNo", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ProxyViewModel.prototype, "proxiesDone", void 0);
        ProxyViewModel = tslib_1.__decorate([
            decorators_1.subclass("esri.widgets.ProxyViewModel")
        ], ProxyViewModel);
        return ProxyViewModel;
    }(Accessor_1.default));
    exports.default = ProxyViewModel;
});
