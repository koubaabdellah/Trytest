define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hslToHex = exports.checkContrast = void 0;
    function checkContrast(a, b) {
        a = expandHexAbbr(a);
        b = expandHexAbbr(b);
        var lum = [a, b].map(hexRgb).map(relativeLuminance);
        var contrast = luminance(lum[0], lum[1]);
        return {
            contrast: contrast,
            passesDoubleA: contrast >= 4.5
        };
    }
    exports.checkContrast = checkContrast;
    function expandHexAbbr(hex) {
        if (hex.length !== 4) {
            return hex;
        }
        var h = hex.split("");
        return "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    }
    function hexRgb(hex) {
        hex = hex.replace(/^#/, "");
        var alpha = 255;
        var num = parseInt(hex, 16);
        var red = num >> 16;
        var green = (num >> 8) & 255;
        var blue = num & 255;
        return [red, green, blue, alpha];
    }
    function relativeLuminance(rgb) {
        var rc = 0.2126;
        var gc = 0.7152;
        var bc = 0.0722;
        var lowc = 1 / 12.92;
        var rsrgb = rgb[0] / 255;
        var gsrgb = rgb[1] / 255;
        var bsrgb = rgb[2] / 255;
        var r = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb), g = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb), b = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);
        return r * rc + g * gc + b * bc;
    }
    function adjustGamma(x) {
        return Math.pow((x + 0.055) / 1.055, 2.4);
    }
    function luminance(a, b) {
        var l1 = Math.max(a, b);
        var l2 = Math.min(a, b);
        return (l1 + 0.05) / (l2 + 0.05);
    }
    function hslToHex(hsl) {
        if (!hsl)
            return;
        var _a = hsl
            .substring(hsl.indexOf("(") + 1, hsl.indexOf(")"))
            .split(",")
            .map(function (x) { return parseInt(x); }), h = _a[0], s = _a[1], l = _a[2];
        l /= 100;
        var a = (s * Math.min(l, 1 - l)) / 100;
        var f = function (n) {
            var k = (n + h / 30) % 12;
            var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color)
                .toString(16)
                .padStart(2, "0");
        };
        return ("#" + f(0) + f(8) + f(4)).toUpperCase();
    }
    exports.hslToHex = hslToHex;
});
