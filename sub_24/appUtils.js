define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.clamp = exports.isRTL = exports.find = exports.isNodeVisible = exports.toggleNode = exports.hideNode = exports.showNode = exports.parseUrl = exports.concatUnique = exports.filterOut = exports.includes = exports.objectToArray = exports.stripStringTags = exports.urlToObject = void 0;
    function urlToObject() {
        var _this = this;
        var query = (window.location.search || "?").substr(1), map = {};
        var urlRE = /([^&=]+)=?([^&]*)(?:&+|$)/g;
        query.replace(urlRE, function (match, key, value) {
            map[key] = _this.stripStringTags(decodeURIComponent(value));
            return "";
        });
        return map;
    }
    exports.urlToObject = urlToObject;
    function stripStringTags(value) {
        var tagsRE = /<\/?[^>]+>/g;
        return value.replace(tagsRE, "");
    }
    exports.stripStringTags = stripStringTags;
    function objectToArray(value) {
        var resultArray = Object.keys(value).map(function (idx) {
            return value[idx];
        });
        return resultArray;
    }
    exports.objectToArray = objectToArray;
    function includes(arr, str) {
        return arr.indexOf(str) > -1;
    }
    exports.includes = includes;
    function filterOut(arr1, arr2) {
        return arr1.filter(function (val) {
            return arr2.indexOf(val) === -1;
        });
    }
    exports.filterOut = filterOut;
    function concatUnique(arr1, arr2) {
        var newArr = [].concat(arr1 || []);
        arr2.forEach(function (val) {
            if (val && newArr.indexOf(val) === -1) {
                newArr.push(val);
            }
        });
        return newArr;
    }
    exports.concatUnique = concatUnique;
    function parseUrl(url) {
        var a = document.createElement("a");
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(":", ""),
            host: a.hostname || window.location.host,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {}, seg = a.search.replace(/^\?/, "").split("&"), len = seg.length;
                var i = 0, s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split("=");
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
            hash: a.hash.replace("#", ""),
            path: a.pathname.replace(/^([^\/])/, "/$1"),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
            segments: a.pathname.replace(/^\//, "").split("/")
        };
    }
    exports.parseUrl = parseUrl;
    function showNode(node) {
        var domNode = typeof node === "string" ? document.querySelector(node) : node;
        if (domNode) {
            domNode.classList.remove("hide");
        }
    }
    exports.showNode = showNode;
    function hideNode(node) {
        var domNode = typeof node === "string" ? document.querySelector(node) : node;
        if (domNode) {
            domNode.classList.add("hide");
        }
    }
    exports.hideNode = hideNode;
    function toggleNode(node) {
        var showHide = node && node.classList.contains("hide") ? "showNode" : "hideNode";
        this[showHide](node);
    }
    exports.toggleNode = toggleNode;
    function isNodeVisible(node) {
        return node && node.classList.contains("hide") ? false : true;
    }
    exports.isNodeVisible = isNodeVisible;
    function find(arr, fn) {
        var value;
        for (var i = 0; i < arr.length; i++) {
            value = arr[i];
            if (fn(value)) {
                return value;
            }
        }
        return null;
    }
    exports.find = find;
    function isRTL() {
        return document.getElementsByTagName("html")[0].getAttribute("dir") === "rtl";
    }
    exports.isRTL = isRTL;
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    exports.clamp = clamp;
});
