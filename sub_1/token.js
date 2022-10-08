define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeImgTokens = exports.applyImgTokens = void 0;
    function applyImgTokens(innerHTML, token) {
        var bodyEl = document.createElement("body");
        bodyEl.innerHTML = innerHTML;
        var imageNodes = bodyEl.getElementsByTagName("img");
        Array.from(imageNodes).forEach(function (img) {
            if (img === null || img === void 0 ? void 0 : img.src) {
                var url = new URL(img.src);
                var params = new URLSearchParams(url.search);
                if (img.src.indexOf("instantAppsConfigPanel") !== -1 &&
                    !params.get("token")) {
                    params.append("token", token);
                    var str = params.toString();
                    var paramsString = str ? str : "";
                    var src = "".concat(url.origin).concat(url.pathname).concat(paramsString ? "?" : "").concat(paramsString);
                    img.src = src;
                }
            }
        });
        return bodyEl.innerHTML;
    }
    exports.applyImgTokens = applyImgTokens;
    function removeImgTokens(innerHTML) {
        var bodyEl = document.createElement("body");
        bodyEl.innerHTML = innerHTML;
        var imageNodes = bodyEl.getElementsByTagName("img");
        Array.from(imageNodes).forEach(function (img) {
            if (img === null || img === void 0 ? void 0 : img.src) {
                var url = new URL(img.src);
                var params = new URLSearchParams(url.search);
                if (img.src.indexOf("instantAppsConfigPanel") !== -1 &&
                    params.get("token")) {
                    params.delete("token");
                    var str = params.toString();
                    var paramsString = str ? str : "";
                    var src = "".concat(url.origin).concat(url.pathname).concat(paramsString ? "?" : "").concat(paramsString);
                    img.src = src;
                }
            }
        });
        return bodyEl.innerHTML;
    }
    exports.removeImgTokens = removeImgTokens;
});
