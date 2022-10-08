/*
  Copyright 2022 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "./Alert", "./telemetry.dojo.min"], function (require, exports, Accessor_1, decorators_1, watchUtils_1, Alert_1, telemetry_dojo_min_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Accessor_1 = __importDefault(Accessor_1);
    Alert_1 = __importDefault(Alert_1);
    telemetry_dojo_min_1 = __importDefault(telemetry_dojo_min_1);
    var Telemetry = /** @class */ (function (_super) {
        __extends(Telemetry, _super);
        function Telemetry(settings) {
            var _this = _super.call(this, settings) || this;
            _this.state = "waitingForConsent";
            _this.gaids = ["ga1", "ga2", "ga3"];
            _this.adobeIds = ["ad1"];
            _this.settings = settings;
            return _this;
        }
        Object.defineProperty(Telemetry.prototype, "isConsentGiven", {
            get: function () {
                var storageValue = localStorage.getItem(this.optInStorageKey);
                return storageValue != null && storageValue !== "false";
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Telemetry.prototype, "optInStorageKey", {
            /** Tied to the appid in the URL. This is what allows us to keep track of opt-ins on an individual app basis */
            get: function () {
                var urlParams = new URLSearchParams(window.location.search);
                var appId = urlParams.get("appid");
                return "analytics-opt-in-" + (appId != null ? appId : this.settings.appName);
            },
            enumerable: false,
            configurable: true
        });
        Telemetry.prototype.initialize = function () {
            var _this = this;
            this.runInit();
            watchUtils_1.whenDefinedOnce(this, "consentAlert", function () {
                _this.consentAlert.watch("state", function (state) {
                    if (state === "consentGiven") {
                        _this.runInit();
                    }
                });
            });
            // Note: Going to exclude this logic for now. It's not important to react to settings changes in the config panel. 
            //          And leaving this in is bug prone.
            // watch(
            //   this?.settings?.config,
            //   [
            //     "googleAnalytics",
            //     "googleAnalyticsConsent",
            //     "adobeLaunchAnalytics"
            //   ],
            //   () => {
            //     this.runInit();
            //   });
        };
        Telemetry.prototype.runInit = function () {
            var _a, _b;
            if (((_b = (_a = this === null || this === void 0 ? void 0 : this.settings) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.googleAnalyticsConsent) === true && !this.isConsentGiven) {
                this._initConsentAlert();
            }
            else {
                this._destroyConsentAlert();
                this._initTelemetry(this === null || this === void 0 ? void 0 : this.settings);
            }
        };
        Telemetry.prototype._initConsentAlert = function () {
            this._destroyConsentAlert();
            var alertContainer = document.createElement("container");
            document.body.appendChild(alertContainer);
            this.consentAlert = new Alert_1.default({
                container: alertContainer,
                config: this.settings.config,
                appName: this.optInStorageKey
            });
        };
        Telemetry.prototype._destroyConsentAlert = function () {
            if (this.consentAlert != null) {
                this.consentAlert.destroy();
                this.consentAlert = null;
            }
        };
        Telemetry.prototype._initTelemetry = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
                var portal, isGoogleEnabled, isAdobeEnabled, _a, options, telemetry;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            portal = settings.portal;
                            isGoogleEnabled = this._isGoogleEnabled(settings);
                            isAdobeEnabled = this._isAdobeEnabled(settings);
                            return [4 /*yield*/, this._loadGoogleAnalytics(settings)];
                        case 1:
                            _b.sent();
                            _a = this;
                            return [4 /*yield*/, this._loadAdobeAnalytics(settings)];
                        case 2:
                            _a._adobeTracker = _b.sent();
                            options = {
                                disabled: false,
                                portal: portal,
                                amazon: this._getAmazonCredentials(settings),
                                google: isGoogleEnabled,
                                debug: this._getEnvironment(portal.portalHostname) === "dev" ? true : false
                            };
                            if (isAdobeEnabled) { // init wrapper
                                telemetry = new AdobeWrapper({
                                    instance: new telemetry_dojo_min_1.default(options),
                                    adobeTracker: this._adobeTracker
                                });
                            }
                            else {
                                telemetry = new telemetry_dojo_min_1.default(options);
                            }
                            this.instance = telemetry;
                            this.state = "ready";
                            return [2 /*return*/];
                    }
                });
            });
        };
        Telemetry.prototype._isGoogleEnabled = function (settings) {
            // NOTE: googleAnalyticsConsent is just the general Consent Message for all Analytics providers
            var _a = settings === null || settings === void 0 ? void 0 : settings.config, googleAnalytics = _a.googleAnalytics, googleAnalyticsConsent = _a.googleAnalyticsConsent, telemetry = _a.telemetry;
            if (this._isEueiDisabled(settings === null || settings === void 0 ? void 0 : settings.portal)) {
                return false;
            }
            // Check to see if GA is enabled
            var enabled = googleAnalytics;
            var optInKey = this.optInStorageKey;
            if (enabled && googleAnalyticsConsent) {
                var localSaved = localStorage.getItem(optInKey);
                enabled = localSaved != null;
            }
            return enabled;
        };
        Telemetry.prototype._isAdobeEnabled = function (settings) {
            // NOTE: googleAnalyticsConsent is just the general Consent Message for all Analytics providers
            var _a = settings === null || settings === void 0 ? void 0 : settings.config, adobeLaunchAnalytics = _a.adobeLaunchAnalytics, googleAnalyticsConsent = _a.googleAnalyticsConsent, telemetry = _a.telemetry;
            if (this._isEueiDisabled(settings === null || settings === void 0 ? void 0 : settings.portal)) {
                return false;
            }
            var enabled = adobeLaunchAnalytics;
            var optInKey = this.optInStorageKey;
            if (enabled && googleAnalyticsConsent) {
                var localSaved = localStorage.getItem(optInKey);
                enabled = localSaved != null;
            }
            return enabled;
        };
        Telemetry.prototype._getAmazonCredentials = function (settings) {
            var envCredentials = settings.config.telemetry;
            if (!envCredentials)
                return;
            var env = this._getEnvironment(settings.portal.portalHostname);
            var userPoolID = envCredentials[env].amazon.userPoolID;
            var id = envCredentials[env].amazon.app.id;
            var name = envCredentials.name;
            var version = envCredentials.version;
            return {
                userPoolID: userPoolID,
                app: {
                    name: name,
                    id: id,
                    version: version
                }
            };
        };
        Telemetry.prototype._loadGoogleAnalytics = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var googleAnalyticsKey, enableGoogle, scriptsExist, gaScript0, gaScript1, gaScript2, head, timeStart_1, TIMEOUT_1, _isLoaded_1;
                            return __generator(this, function (_a) {
                                googleAnalyticsKey = (settings === null || settings === void 0 ? void 0 : settings.config).googleAnalyticsKey;
                                enableGoogle = this._isGoogleEnabled(settings);
                                scriptsExist = this._googleScriptsExist();
                                if (!enableGoogle && scriptsExist) {
                                    window["ga-disable-" + googleAnalyticsKey] = false;
                                    resolve();
                                }
                                else if (!enableGoogle && !scriptsExist) {
                                    resolve();
                                }
                                else if (enableGoogle && scriptsExist) {
                                    window["ga-disable-" + googleAnalyticsKey] = true;
                                    resolve();
                                }
                                else if (enableGoogle && !scriptsExist) {
                                    if (googleAnalyticsKey == null) {
                                        resolve();
                                        return [2 /*return*/];
                                    }
                                    gaScript0 = document.createElement('script');
                                    gaScript0.setAttribute('async', 'true');
                                    gaScript0.setAttribute('src', "https://www.google-analytics.com/analytics.js");
                                    gaScript0.id = this.gaids[0];
                                    gaScript1 = document.createElement('script');
                                    gaScript1.setAttribute('async', 'true');
                                    gaScript1.setAttribute('src', "https://www.googletagmanager.com/gtag/js?id=" + googleAnalyticsKey);
                                    gaScript1.id = this.gaids[1];
                                    gaScript2 = document.createElement('script');
                                    gaScript2.id = this.gaids[2];
                                    gaScript2.innerText = "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '" + googleAnalyticsKey + "');";
                                    head = document.getElementsByTagName("head")[0];
                                    head.appendChild(gaScript0);
                                    head.appendChild(gaScript1);
                                    head.appendChild(gaScript2);
                                    timeStart_1 = Date.now();
                                    TIMEOUT_1 = 10000;
                                    _isLoaded_1 = function () {
                                        if (window['ga']) {
                                            resolve(window['ga']);
                                        }
                                        else if (Date.now() - timeStart_1 > TIMEOUT_1) {
                                            reject('Timeout. Google analytics not injected!');
                                        }
                                        else {
                                            setTimeout(_isLoaded_1, 1000);
                                        }
                                    };
                                    _isLoaded_1();
                                }
                                else {
                                    resolve();
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                });
            });
        };
        Telemetry.prototype._loadAdobeAnalytics = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, adobeLaunchAnalyticsReportSuiteId, adobeLaunchAnalyticsScriptTag, enableAdobeLaunch, scriptsExist, adScript0, url, head, timeStart_2, TIMEOUT_2, _isLoaded_2;
                            return __generator(this, function (_b) {
                                _a = settings.config, adobeLaunchAnalyticsReportSuiteId = _a.adobeLaunchAnalyticsReportSuiteId, adobeLaunchAnalyticsScriptTag = _a.adobeLaunchAnalyticsScriptTag;
                                enableAdobeLaunch = this._isAdobeEnabled(settings);
                                scriptsExist = this._adobeLaunchScriptsExist();
                                if (!enableAdobeLaunch && scriptsExist) {
                                    this.removeALScripts();
                                    resolve();
                                }
                                else if (!enableAdobeLaunch && !scriptsExist) {
                                    resolve();
                                }
                                else if (enableAdobeLaunch && scriptsExist) {
                                    resolve();
                                }
                                else if (enableAdobeLaunch && !scriptsExist) {
                                    if (adobeLaunchAnalyticsScriptTag == null || adobeLaunchAnalyticsReportSuiteId == null) {
                                        resolve();
                                        return [2 /*return*/];
                                    }
                                    adScript0 = document.createElement('script');
                                    url = "//assets.adobedtm.com/" + adobeLaunchAnalyticsScriptTag;
                                    adScript0.setAttribute('src', url);
                                    adScript0.id = this.adobeIds[0];
                                    head = document.getElementsByTagName("head")[0];
                                    head.appendChild(adScript0);
                                    timeStart_2 = Date.now();
                                    TIMEOUT_2 = 10000;
                                    _isLoaded_2 = function () {
                                        if (window['s_gi']) {
                                            var adobeTracker = window["s_gi"](adobeLaunchAnalyticsReportSuiteId);
                                            resolve(adobeTracker);
                                        }
                                        else if (Date.now() - timeStart_2 > TIMEOUT_2) {
                                            reject('Timeout. Adobe analytics not injected!');
                                        }
                                        else {
                                            setTimeout(_isLoaded_2, 1000);
                                        }
                                    };
                                    _isLoaded_2();
                                }
                                else {
                                    resolve();
                                }
                                return [2 /*return*/];
                            });
                        }); })];
                });
            });
        };
        Telemetry.prototype._googleScriptsExist = function () {
            var alreadyLoaded = this.gaids.every(function (id) {
                return document.getElementById(id) !== null ? true : false;
            });
            return alreadyLoaded;
        };
        Telemetry.prototype._adobeLaunchScriptsExist = function () {
            var alreadyLoaded = this.adobeIds.every(function (id) {
                return document.getElementById(id) !== null ? true : false;
            });
            return alreadyLoaded;
        };
        Telemetry.prototype.removeGAScripts = function () {
            this.gaids.forEach(function (id) {
                var gaScript = document.getElementById(id);
                gaScript === null || gaScript === void 0 ? void 0 : gaScript.parentNode.removeChild(gaScript);
            });
        };
        Telemetry.prototype.removeALScripts = function () {
            this.adobeIds.forEach(function (id) {
                var alScript = document.getElementById(id);
                alScript === null || alScript === void 0 ? void 0 : alScript.parentNode.removeChild(alScript);
            });
        };
        Telemetry.prototype._getEnvironment = function (hostname) {
            var h = hostname.replace("www.", "");
            if (document.location.hostname.indexOf("arcgis.com") === -1) {
                return "dev";
            }
            else {
                return (h === "arcgis.com" && "prod") || (h === "qaext.arcgis.com" && "qa") || "dev";
            }
        };
        Telemetry.prototype._isEueiDisabled = function (portal) {
            return (portal === null || portal === void 0 ? void 0 : portal.eueiEnabled) === false;
        };
        __decorate([
            decorators_1.property()
        ], Telemetry.prototype, "instance", void 0);
        __decorate([
            decorators_1.property()
        ], Telemetry.prototype, "state", void 0);
        __decorate([
            decorators_1.property()
        ], Telemetry.prototype, "consentAlert", void 0);
        Telemetry = __decorate([
            decorators_1.subclass("TelemetryTS")
        ], Telemetry);
        return Telemetry;
    }(Accessor_1.default));
    exports.default = Telemetry;
    /** Wrapper which adds the functionality of Adobe Launch to the TelemetryInstance */
    var AdobeWrapper = /** @class */ (function () {
        function AdobeWrapper(args) {
            var _this = this;
            this.logPageView = function (page, options) {
                var _a, _b;
                if (_this._adobeTracker == null) {
                    console.error("this._adobeTracker function is undefined. Something went wrong with AdobeLaunch Instantiation");
                }
                var telemetryPayload = _this.createPageView({
                    page: page,
                    previousPage: {},
                    options: options
                }, null, false);
                (_a = _this === null || _this === void 0 ? void 0 : _this._adobeTracker) === null || _a === void 0 ? void 0 : _a.t(telemetryPayload);
                (_b = _this === null || _this === void 0 ? void 0 : _this._wrappedTelemInstance) === null || _b === void 0 ? void 0 : _b.logPageView(page);
            };
            this.logEvent = function (payload) {
                var _a, _b;
                if (_this._adobeTracker == null) {
                    console.error("this._adobeTracker function is undefined. Something went wrong with AdobeLaunch Instantiation");
                }
                var telemetryPayload = _this.createEventLog(payload, {}, false, {});
                (_a = _this === null || _this === void 0 ? void 0 : _this._adobeTracker) === null || _a === void 0 ? void 0 : _a.tl(true, "o", "Custom Event", telemetryPayload);
                return (_b = _this === null || _this === void 0 ? void 0 : _this._wrappedTelemInstance) === null || _b === void 0 ? void 0 : _b.logEvent(telemetryPayload);
            };
            ///////////////////////////
            // Pass through functions
            ///////////////////////////
            this.logError = function (payload) {
                _this._wrappedTelemInstance.logError(payload);
            };
            this.update = function (settings) {
                _this._wrappedTelemInstance.update(settings);
            };
            this.removeScripts = function () {
                _this._wrappedTelemInstance.removeScripts();
            };
            this.startWorkflow = function (name, payload) {
                return _this._wrappedTelemInstance.startWorkflow(name, payload);
            };
            this.stepWorkflow = function (name, step, payload) {
                return _this._wrappedTelemInstance.stepWorkflow(name, step, payload);
            };
            this.cancelWorkflow = function (name, payload) {
                return _this._wrappedTelemInstance.cancelWorkflow(name, payload);
            };
            this.endWorkflow = function (name, payload) {
                return _this._wrappedTelemInstance.endWorkflow(name, payload);
            };
            this.getWorkflow = function (name) {
                return _this._wrappedTelemInstance.getWorkflow(name);
            };
            this._wrappedTelemInstance = args === null || args === void 0 ? void 0 : args.instance;
            this._adobeTracker = args === null || args === void 0 ? void 0 : args.adobeTracker;
        }
        Object.defineProperty(AdobeWrapper.prototype, "disabled", {
            get: function () {
                return this._wrappedTelemInstance.disabled;
            },
            enumerable: false,
            configurable: true
        });
        ;
        ////////////////////////////////
        // Adobe Format Functions
        ////////////////////////////////
        AdobeWrapper.prototype.createPageView = function (data, dimensions, useCustomDimensionMapping) {
            var page = data.page, previousPage = data.previousPage, options = data.options;
            var payload = this.formatPayload(page, previousPage, options, "pageView");
            var defaultMapping = {};
            if (!useCustomDimensionMapping) {
                defaultMapping = {
                    prop1: payload.eventType,
                    prop2: payload.referrer,
                    prop3: payload.hostname,
                    prop4: payload.path,
                    prop5: payload.pageName,
                    prop6: payload.previousPageName,
                    prop7: payload.previousPageUrl,
                    prop8: payload.category,
                    prop9: payload.action,
                    prop10: payload.label,
                    prop11: payload.attribute,
                    prop12: payload.details
                };
            }
            return __assign({}, defaultMapping);
        };
        AdobeWrapper.prototype.createEventLog = function (event, dimensions, useCustomDimensionMapping, previousPage) {
            var payload = this.formatPayload(null, previousPage, event, "other");
            var defaultMapping = {};
            if (!useCustomDimensionMapping) {
                defaultMapping = {
                    prop1: payload.eventType,
                    prop2: payload.referrer,
                    prop3: payload.hostname,
                    prop4: payload.path,
                    prop5: payload.pageName,
                    prop6: payload.previousPageName,
                    prop7: payload.previousPageUrl,
                    prop8: payload.category,
                    prop9: payload.action,
                    prop10: payload.label,
                    prop11: payload.attribute,
                    prop12: payload.details
                };
            }
            return __assign({}, defaultMapping);
        };
        AdobeWrapper.prototype.formatPayload = function (page, previousPage, options, eventType) {
            var _a = document || {}, referrer = _a.referrer, title = _a.title;
            var _b = window && window.location ? window.location : { hostname: null, pathname: null }, hostname = _b.hostname, pathname = _b.pathname;
            return __assign({ eventType: eventType,
                referrer: referrer,
                hostname: hostname, path: page || pathname, pageName: title, previousPageUrl: previousPage === null || previousPage === void 0 ? void 0 : previousPage.pageUrl, previousPageName: previousPage === null || previousPage === void 0 ? void 0 : previousPage.pageName }, options);
        };
        return AdobeWrapper;
    }());
});
