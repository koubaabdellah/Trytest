define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    var _a, _b, _c, _d;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.beforeLocaleChange = exports.onLocaleChange = exports.prefersRTL = exports.setLocale = exports.getLocale = exports.getDefaultLocale = void 0;
    var userLocale = undefined;
    var currentLocale = undefined;
    var globalLocale = (_b = (_a = window.esriConfig) === null || _a === void 0 ? void 0 : _a.locale) !== null && _b !== void 0 ? _b : (_c = window.dojoConfig) === null || _c === void 0 ? void 0 : _c.locale;
    function getDefaultLocale() {
        var _a, _b;
        return (_b = globalLocale !== null && globalLocale !== void 0 ? globalLocale : (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.language) !== null && _b !== void 0 ? _b : "en";
    }
    exports.getDefaultLocale = getDefaultLocale;
    function getLocale() {
        if (currentLocale === undefined) {
            currentLocale = getDefaultLocale();
        }
        return currentLocale;
    }
    exports.getLocale = getLocale;
    function setLocale(locale) {
        userLocale = locale ? locale : undefined;
        triggerLocaleChange();
    }
    exports.setLocale = setLocale;
    var rtlLocales = {
        he: true,
        ar: true
    };
    function prefersRTL(locale) {
        if (locale === void 0) { locale = getLocale(); }
        var matches = /^([a-zA-Z]{2,3})(?:[_\-]\w+)*$/.exec(locale);
        var language = matches === null || matches === void 0 ? void 0 : matches[1].toLowerCase();
        return rtlLocales[language] || false;
    }
    exports.prefersRTL = prefersRTL;
    var onChangeListeners = [];
    function onLocaleChange(callback) {
        onChangeListeners.push(callback);
        return {
            remove: function () {
                onChangeListeners.splice(onChangeListeners.indexOf(callback), 1);
            }
        };
    }
    exports.onLocaleChange = onLocaleChange;
    var beforeChangeListeners = [];
    function beforeLocaleChange(callback) {
        beforeChangeListeners.push(callback);
        return {
            remove: function () {
                onChangeListeners.splice(beforeChangeListeners.indexOf(callback), 1);
            }
        };
    }
    exports.beforeLocaleChange = beforeLocaleChange;
    function triggerLocaleChange() {
        var locale = userLocale !== null && userLocale !== void 0 ? userLocale : getDefaultLocale();
        if (currentLocale === locale) {
            return;
        }
        currentLocale = locale;
        tslib_1.__spreadArrays(beforeChangeListeners).forEach(function (listener) {
            listener.call(null, locale);
        });
        tslib_1.__spreadArrays(onChangeListeners).forEach(function (listener) {
            listener.call(null, locale);
        });
    }
    (_d = window.addEventListener) === null || _d === void 0 ? void 0 : _d.call(window, "languagechange", triggerLocaleChange);
});
