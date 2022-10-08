if (typeof CS3 === "undefined") {
window.CS3 = {};
}
if (typeof (CS3.Upload) === "undefined") {
CS3.Upload = {


};
}
if (typeof CS3.Logger === "undefined") {
CS3.Logger = {};
}
if (typeof CS3.Style === "undefined") {
CS3.Style = {};
}
if (typeof CS3.Component === "undefined") {
CS3.Component = {};
}
(function () {
CS3.Logger.levelsDefault = ["info", "warn", "error", "debug", "trace"];

if (typeof (CS3.Logger.levels) === "undefined") {
CS3.Logger.levels = CS3.Logger.levelsDefault;
}

CS3.Logger.getLogger = function (loggerId) {
var logger = {};
CS3.Logger.levelsDefault.forEach(function (levelName) {
logger[levelName] = function () {
if (Wicket.Ajax &&
Wicket.Ajax.DebugWindow &&
Wicket.Ajax.DebugWindow.enabled &&
CS3.Logger.levels.includes(levelName)
) {
var prefix = levelName.toUpperCase() + ": " + loggerId + " - " + arguments[0];
var content = Array.prototype.slice.call(arguments, 1);
window.console.log(prefix, content);
}
};
});
return logger;
};
})();
if (!CS3.Class) {
CS3.Class = {
create: function () {
return function () {
this.initialize.apply(this, arguments);
};
}
};
}
CS3.TimeOut = CS3.Class.create();
CS3.TimeOut.prototype = {
initialize: function () {
this.scheduled = {};
},
schedule: function (name, callback, delay) {
if (this.scheduled[name] !== "undefined") {
clearTimeout(this.scheduled[name]);
}
this.scheduled[name] = setTimeout(callback, delay);
}
};
CS3.Component.Forms = {
disableSubmitOnEnter: function (selector) {
$(selector).on("keydown", function (e) {
if (e.which === 13) {
e.preventDefault();
return false;
}
return true;
});
}
};
CS3.Util = {
confirmationMessage: "You have made changes. When reloading or leaving this page the changes will be lost. Do you want to continue?",
unloadListener: function (e) {

e.preventDefault();

e.returnValue = CS3.Util.confirmationMessage;

return CS3.Util.confirmationMessage;
},
addUnloadListener: function () {
window.addEventListener("beforeunload", CS3.Util.unloadListener);
this.monitorUnload = true;
},
removeUnloadListener: function () {
window.removeEventListener("beforeunload", CS3.Util.unloadListener);
this.monitorUnload = false;
},

bindWicketAjaxInterceptor: function (csrfToken) {
if (window.Wicket == null || window.Wicket.Ajax == null) {
throw new TypeError("Could not find Wicket AJAX properties.");
}
if (csrfToken == null || csrfToken.length === 0) {
throw new TypeError("No CSRF protection token was provided.");
}
var logger = CS3.Logger.getLogger("bindWicketAjaxInterceptor");
var originalAjaxFn = window.Wicket.Ajax.Call.prototype.doAjax;
window.Wicket.Ajax.Call.prototype.doAjax = CS3.Util.createWicketAjaxInterceptor(originalAjaxFn, csrfToken);
logger.debug("Bound Wicket AJAX interceptor.");
},

createWicketAjaxInterceptor: function (originalAjaxFn, csrfToken) {
return function (attrs) {
var logger = CS3.Logger.getLogger("createWicketAjaxInterceptor");
if (attrs.ep == null) {
logger.debug("No existing request data was found, creating it.");
attrs.ep = {};
}
CS3.Util.addCsrfToken(attrs, csrfToken);

var jqXHR = originalAjaxFn.call(this, attrs);

if (jqXHR.fail) {
logger.debug("Binding AJAX failure events.");
jqXHR.fail(function () {
var statusCode = jqXHR.status;
var CSRF_VIOLATION_STATUS_CODE = 400;
if (statusCode && statusCode === CSRF_VIOLATION_STATUS_CODE) {
logger.warn("AJAX call failed with status code " + statusCode + ", reloading the page.");
location.reload();
}
});
}
return jqXHR;
};
},

addCsrfToken: function (attrs, csrfToken) {
var logger = CS3.Logger.getLogger("addCsrfToken");
if (attrs.f && attrs.m.toLowerCase() === "post") {
logger.debug("Request is a form post, CSRF token has to be added directly.");
attrs.u = CS3.Util.getUrlWithCsrfToken(attrs.u, csrfToken);
} else {

if (Array.isArray(attrs.ep)) {
if (!attrs.ep.some(function (entry) {
return entry.name === "csrfToken";
})) {
attrs.ep.push({name: "csrfToken", value: csrfToken});
}
} else {
if (attrs.ep.csrfToken == null) {
attrs.ep.csrfToken = csrfToken;
}
}
logger.debug("Successfully added CSRF protection token to request.", attrs.ep);
}
},

getUrlWithCsrfToken: function (url, csrfToken) {
var separator = url.indexOf("?") > -1 ? "&" : "?";
return url + separator + jQuery.param({csrfToken: csrfToken});
},

splitString: function (str, start, end) {
return [str.substr(0, start), str.substr(end)];
},

isUndefined: function (val) {
return typeof val === "undefined";
},

arrUnique: function (iterable) {
var result = [];
iterable.forEach(function (val) {
if (!result.includes(val)) {
result.push(val);
}
});
return result;
},

debounce: function (func, wait, immediate) {
var timeout;
return function () {
var context = this, args = arguments;
var later = function () {
timeout = null;
if (!immediate) {
func.apply(context, args);
}
};
var callNow = immediate && !timeout;
clearTimeout(timeout);
timeout = setTimeout(later, wait);
if (callNow) {
func.apply(context, args);
}
};
},

Keys: {
ESCAPE: 27,
DELETE: 46,
BACKSPACE: 8,
SPACE: 32,
ENTER: 13,
TABULATOR: 9,
ARROW_LEFT: 37,
ARROW_UP: 38,
ARROW_RIGHT: 39,
ARROW_DOWN: 40
}
};
CS3.Style = {
attachViewportListener: function (callbackUrl) {
var logger = CS3.Logger.getLogger("attachViewportListener");
var getBrowserInfo = function () {
var browserInfo = {};
if (typeof (window.innerHeight) !== "undefined") {
browserInfo.viewPortHeight = window.innerHeight;
browserInfo.viewPortWidth = window.innerWidth;
} else if (document.compatMode === "CSS1Compat") {
browserInfo.viewPortHeight = document.documentElement.clientHeight;
browserInfo.viewPortWidth = document.documentElement.clientWidth;
}
logger.debug("Viewport height: " + browserInfo.viewPortHeight);
logger.debug("Viewport width: " + browserInfo.viewPortWidth);
Wicket.Ajax.post({
u: callbackUrl,
ep: browserInfo
});
};
var timerId;
$(window).on("resize", function () {
clearTimeout(timerId);
timerId = setTimeout(function () {
getBrowserInfo();
}, 500);
});
}
};
