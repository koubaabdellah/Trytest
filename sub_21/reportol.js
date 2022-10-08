//Copyright 2012, etc.

/**
 * almond 0.1.2 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009-2011, yvind Sean Kinsey, oyvind@kinsey.no.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

//
// easyXDM
// http://easyxdm.net/
// Copyright(c) 2009-2011, yvind Sean Kinsey, oyvind@kinsey.no.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

(function(e, t) {
    typeof define == "function" && define.amd ? define(["OpenLayers"], t) : e.reportol = t(e.OpenLayers)
})(this, function(OpenLayers) {
    var requirejs, require, define;
    return function(e) {
        function a(e, t) {
            var n = t && t.split("/"), i = r.map, s = i && i["*"] || {}, o, u, a, f, l, c, h, p, d, v;
            if (e && e.charAt(0) === "." && t) {
                n = n.slice(0, n.length - 1),
                e = n.concat(e.split("/"));
                for (p = 0; v = e[p]; p++)
                    if (v === ".")
                        e.splice(p, 1),
                        p -= 1;
                    else if (v === "..") {
                        if (p === 1 && (e[2] === ".." || e[0] === ".."))
                            return !0;
                        p > 0 && (e.splice(p - 1, 2),
                        p -= 2)
                    }
                e = e.join("/")
            }
            if ((n || s) && i) {
                o = e.split("/");
                for (p = o.length; p > 0; p -= 1) {
                    u = o.slice(0, p).join("/");
                    if (n)
                        for (d = n.length; d > 0; d -= 1) {
                            a = i[n.slice(0, d).join("/")];
                            if (a) {
                                a = a[u];
                                if (a) {
                                    f = a,
                                    l = p;
                                    break
                                }
                            }
                        }
                    if (f)
                        break;
                    !c && s && s[u] && (c = s[u],
                    h = p)
                }
                !f && c && (f = c,
                l = h),
                f && (o.splice(0, l, f),
                e = o.join("/"))
            }
            return e
        }
        function f(t, n) {
            return function() {
                return u.apply(e, s.call(arguments, 0).concat([t, n]))
            }
        }
        function l(e) {
            return function(t) {
                return a(t, e)
            }
        }
        function c(e) {
            return function(n) {
                t[e] = n
            }
        }
        function h(r) {
            if (n.hasOwnProperty(r)) {
                var s = n[r];
                delete n[r],
                i[r] = !0,
                o.apply(e, s)
            }
            if (!t.hasOwnProperty(r))
                throw new Error("No " + r);
            return t[r]
        }
        function p(e, t) {
            var n, r, i = e.indexOf("!");
            return i !== -1 ? (n = a(e.slice(0, i), t),
            e = e.slice(i + 1),
            r = h(n),
            r && r.normalize ? e = r.normalize(e, l(t)) : e = a(e, t)) : e = a(e, t),
            {
                f: n ? n + "!" + e : e,
                n: e,
                p: r
            }
        }
        function d(e) {
            return function() {
                return r && r.config && r.config[e] || {}
            }
        }
        var t = {}, n = {}, r = {}, i = {}, s = [].slice, o, u;
        o = function(r, s, o, u) {
            var a = [], l, v, m, g, y, b;
            u = u || r;
            if (typeof o == "function") {
                s = !s.length && o.length ? ["require", "exports", "module"] : s;
                for (b = 0; b < s.length; b++) {
                    y = p(s[b], u),
                    m = y.f;
                    if (m === "require")
                        a[b] = f(r);
                    else if (m === "exports")
                        a[b] = t[r] = {},
                        l = !0;
                    else if (m === "module")
                        v = a[b] = {
                            id: r,
                            uri: "",
                            exports: t[r],
                            config: d(r)
                        };
                    else if (t.hasOwnProperty(m) || n.hasOwnProperty(m))
                        a[b] = h(m);
                    else if (y.p)
                        y.p.load(y.n, f(u, !0), c(m), {}),
                        a[b] = t[m];
                    else if (!i[m])
                        throw new Error(r + " missing " + m)
                }
                g = o.apply(t[r], a);
                if (r)
                    if (v && v.exports !== e && v.exports !== t[r])
                        t[r] = v.exports;
                    else if (g !== e || !l)
                        t[r] = g
            } else
                r && (t[r] = o)
        }
        ,
        requirejs = require = u = function(t, n, i, s) {
            return typeof t == "string" ? h(p(t, n).f) : (t.splice || (r = t,
            n.splice ? (t = n,
            n = i,
            i = null ) : t = e),
            n = n || function() {}
            ,
            s ? o(e, t, n, i) : setTimeout(function() {
                o(e, t, n, i)
            }, 15),
            u)
        }
        ,
        u.config = function(e) {
            return r = e,
            u
        }
        ,
        define = function(e, t, r) {
            t.splice || (r = t,
            t = []),
            n[e] = [e, t, r]
        }
        ,
        define.amd = {
            jQuery: !0
        }
    }(),
    define("almond", function() {}),
    this.JSON || (this.JSON = {}),
    function() {
        function f(e) {
            return e < 10 ? "0" + e : e
        }
        function quote(e) {
            return escapable.lastIndex = 0,
            escapable.test(e) ? '"' + e.replace(escapable, function(e) {
                var t = meta[e];
                return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }
        function str(e, t) {
            var n, r, i, s, o = gap, u, a = t[e];
            a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)),
            typeof rep == "function" && (a = rep.call(t, e, a));
            switch (typeof a) {
            case "string":
                return quote(a);
            case "number":
                return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null":
                return String(a);
            case "object":
                if (!a)
                    return "null";
                gap += indent,
                u = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    s = a.length;
                    for (n = 0; n < s; n += 1)
                        u[n] = str(n, a) || "null";
                    return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]",
                    gap = o,
                    i
                }
                if (rep && typeof rep == "object") {
                    s = rep.length;
                    for (n = 0; n < s; n += 1)
                        r = rep[n],
                        typeof r == "string" && (i = str(r, a),
                        i && u.push(quote(r) + (gap ? ": " : ":") + i))
                } else
                    for (r in a)
                        Object.hasOwnProperty.call(a, r) && (i = str(r, a),
                        i && u.push(quote(r) + (gap ? ": " : ":") + i));
                return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}",
                gap = o,
                i
            }
        }
        typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function(e) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null 
        }
        ,
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(e) {
            return this.valueOf()
        }
        );
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
        typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
            var r;
            gap = "",
            indent = "";
            if (typeof n == "number")
                for (r = 0; r < n; r += 1)
                    indent += " ";
            else
                typeof n == "string" && (indent = n);
            rep = t;
            if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")
                return str("", {
                    "": e
                });
            throw new Error("JSON.stringify")
        }
        ),
        typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var n, r, i = e[t];
                if (i && typeof i == "object")
                    for (n in i)
                        Object.hasOwnProperty.call(i, n) && (r = walk(i, n),
                        r !== undefined ? i[n] = r : delete i[n]);
                return reviver.call(e, t, i)
            }
            var j;
            text = String(text),
            cx.lastIndex = 0,
            cx.test(text) && (text = text.replace(cx, function(e) {
                return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }));
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                return j = eval("(" + text + ")"),
                typeof reviver == "function" ? walk({
                    "": j
                }, "") : j;
            throw new SyntaxError("JSON.parse")
        }
        )
    }(),
    define("json2", function() {}),
    function(e, t, n, r, i, s) {
        function w(e, t) {
            var n = typeof e[t];
            return n == "function" || n == "object" && !!e[t] || n == "unknown"
        }
        function E(e, t) {
            return typeof e[t] == "object" && !!e[t]
        }
        function S(e) {
            return Object.prototype.toString.call(e) === "[object Array]"
        }
        function x() {
            var e = "Shockwave Flash"
              , t = "application/x-shockwave-flash";
            if (!q(navigator.plugins) && typeof navigator.plugins[e] == "object") {
                var n = navigator.plugins[e].description;
                n && !q(navigator.mimeTypes) && navigator.mimeTypes[t] && navigator.mimeTypes[t].enabledPlugin && (y = n.match(/\d+/g))
            }
            if (!y) {
                var r;
                try {
                    r = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
                    y = Array.prototype.slice.call(r.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/), 1),
                    r = null 
                } catch (i) {}
            }
            if (!y)
                return !1;
            var s = parseInt(y[0], 10)
              , o = parseInt(y[1], 10);
            return b = s > 9 && o > 0,
            !0
        }
        function A() {
            if (C)
                return;
            C = !0;
            for (var e = 0; e < k.length; e++)
                k[e]();
            k.length = 0
        }
        function M(e, t) {
            if (C) {
                e.call(t);
                return
            }
            k.push(function() {
                e.call(t)
            })
        }
        function _() {
            var e = parent;
            if (h !== "")
                for (var t = 0, n = h.split("."); t < n.length; t++)
                    e = e[n[t]];
            return e.easyXDM
        }
        function D(t) {
            return e.easyXDM = d,
            h = t,
            h && (v = "easyXDM_" + h.replace(".", "_") + "_"),
            p
        }
        function P(e) {
            return e.match(f)[3]
        }
        function H(e) {
            return e.match(f)[4] || ""
        }
        function B(e) {
            var t = e.toLowerCase().match(f)
              , n = t[2]
              , r = t[3]
              , i = t[4] || "";
            if (n == "http:" && i == ":80" || n == "https:" && i == ":443")
                i = "";
            return n + "//" + r + i
        }
        function j(e) {
            e = e.replace(c, "$1/");
            if (!e.match(/^(http||https):\/\//)) {
                var t = e.substring(0, 1) === "/" ? "" : n.pathname;
                t.substring(t.length - 1) !== "/" && (t = t.substring(0, t.lastIndexOf("/") + 1)),
                e = n.protocol + "//" + n.host + t + e
            }
            while (l.test(e))
                e = e.replace(l, "");
            return e
        }
        function F(e, t) {
            var n = ""
              , r = e.indexOf("#");
            r !== -1 && (n = e.substring(r),
            e = e.substring(0, r));
            var i = [];
            for (var o in t)
                t.hasOwnProperty(o) && i.push(o + "=" + s(t[o]));
            return e + (g ? "#" : e.indexOf("?") == -1 ? "?" : "&") + i.join("&") + n
        }
        function q(e) {
            return typeof e == "undefined"
        }
        function U(e, t, n) {
            var r;
            for (var i in t)
                t.hasOwnProperty(i) && (i in e ? (r = t[i],
                typeof r == "object" ? U(e[i], r, n) : n || (e[i] = t[i])) : e[i] = t[i]);
            return e
        }
        function z() {
            var e = t.body.appendChild(t.createElement("form"))
              , n = e.appendChild(t.createElement("input"));
            n.name = v + "TEST" + u,
            m = n !== e.elements[n.name],
            t.body.removeChild(e)
        }
        function W(e) {
            q(m) && z();
            var n;
            m ? n = t.createElement('<iframe name="' + e.props.name + '"/>') : (n = t.createElement("IFRAME"),
            n.name = e.props.name),
            n.id = n.name = e.props.name,
            delete e.props.name,
            typeof e.container == "string" && (e.container = t.getElementById(e.container)),
            e.container || (U(n.style, {
                position: "absolute",
                top: "-2000px",
                left: "0px"
            }),
            e.container = t.body);
            var r = e.props.src;
            e.props.src = "javascript:false",
            U(n, e.props),
            n.border = n.frameBorder = 0,
            n.allowTransparency = !0,
            e.container.appendChild(n),
            e.onLoad && T(n, "load", e.onLoad);
            if (e.usePost) {
                var i = e.container.appendChild(t.createElement("form")), s;
                i.target = n.name,
                i.action = r,
                i.method = "POST";
                if (typeof e.usePost == "object")
                    for (var o in e.usePost)
                        e.usePost.hasOwnProperty(o) && (m ? s = t.createElement('<input name="' + o + '"/>') : (s = t.createElement("INPUT"),
                        s.name = o),
                        s.value = e.usePost[o],
                        i.appendChild(s));
                i.submit(),
                i.parentNode.removeChild(i)
            } else
                n.src = r;
            return e.props.src = r,
            n
        }
        function X(e, t) {
            typeof e == "string" && (e = [e]);
            var n, r = e.length;
            while (r--) {
                n = e[r],
                n = new RegExp(n.substr(0, 1) == "^" ? n : "^" + n.replace(/(\*)/g, ".$1").replace(/\?/g, ".") + "$");
                if (n.test(t))
                    return !0
            }
            return !1
        }
        function V(r) {
            var i = r.protocol, s;
            r.isHost = r.isHost || q(I.xdm_p),
            g = r.hash || !1,
            r.props || (r.props = {});
            if (!r.isHost) {
                r.channel = I.xdm_c.replace(/["'<>\\]/g, ""),
                r.secret = I.xdm_s,
                r.remote = I.xdm_e.replace(/["'<>\\]/g, ""),
                i = I.xdm_p;
                if (r.acl && !X(r.acl, r.remote))
                    throw new Error("Access denied for " + r.remote)
            } else
                r.remote = j(r.remote),
                r.channel = r.channel || "default" + u++,
                r.secret = Math.random().toString(16).substring(2),
                q(i) && (B(n.href) == B(r.remote) ? i = "4" : w(e, "postMessage") || w(t, "postMessage") ? i = "1" : r.swf && w(e, "ActiveXObject") && x() ? i = "6" : navigator.product === "Gecko" && "frameElement" in e && navigator.userAgent.indexOf("WebKit") == -1 ? i = "5" : r.remoteHelper ? i = "2" : i = "0");
            r.protocol = i;
            switch (i) {
            case "0":
                U(r, {
                    interval: 100,
                    delay: 2e3,
                    useResize: !0,
                    useParent: !1,
                    usePolling: !1
                }, !0);
                if (r.isHost) {
                    if (!r.local) {
                        var o = n.protocol + "//" + n.host, a = t.body.getElementsByTagName("img"), f, l = a.length;
                        while (l--) {
                            f = a[l];
                            if (f.src.substring(0, o.length) === o) {
                                r.local = f.src;
                                break
                            }
                        }
                        r.local || (r.local = e)
                    }
                    var c = {
                        xdm_c: r.channel,
                        xdm_p: 0
                    };
                    r.local === e ? (r.usePolling = !0,
                    r.useParent = !0,
                    r.local = n.protocol + "//" + n.host + n.pathname + n.search,
                    c.xdm_e = r.local,
                    c.xdm_pa = 1) : c.xdm_e = j(r.local),
                    r.container && (r.useResize = !1,
                    c.xdm_po = 1),
                    r.remote = F(r.remote, c)
                } else
                    U(r, {
                        channel: I.xdm_c,
                        remote: I.xdm_e,
                        useParent: !q(I.xdm_pa),
                        usePolling: !q(I.xdm_po),
                        useResize: r.useParent ? !1 : r.useResize
                    });
                s = [new p.stack.HashTransport(r), new p.stack.ReliableBehavior({}), new p.stack.QueueBehavior({
                    encode: !0,
                    maxLength: 4e3 - r.remote.length
                }), new p.stack.VerifyBehavior({
                    initiate: r.isHost
                })];
                break;
            case "1":
                s = [new p.stack.PostMessageTransport(r)];
                break;
            case "2":
                r.remoteHelper = j(r.remoteHelper),
                s = [new p.stack.NameTransport(r), new p.stack.QueueBehavior, new p.stack.VerifyBehavior({
                    initiate: r.isHost
                })];
                break;
            case "3":
                s = [new p.stack.NixTransport(r)];
                break;
            case "4":
                s = [new p.stack.SameOriginTransport(r)];
                break;
            case "5":
                s = [new p.stack.FrameElementTransport(r)];
                break;
            case "6":
                y || x(),
                s = [new p.stack.FlashTransport(r)]
            }
            return s.push(new p.stack.QueueBehavior({
                lazy: r.lazy,
                remove: !0
            })),
            s
        }
        function $(e) {
            var t, n = {
                incoming: function(e, t) {
                    this.up.incoming(e, t)
                },
                outgoing: function(e, t) {
                    this.down.outgoing(e, t)
                },
                callback: function(e) {
                    this.up.callback(e)
                },
                init: function() {
                    this.down.init()
                },
                destroy: function() {
                    this.down.destroy()
                }
            };
            for (var r = 0, i = e.length; r < i; r++)
                t = e[r],
                U(t, n, !0),
                r !== 0 && (t.down = e[r - 1]),
                r !== i - 1 && (t.up = e[r + 1]);
            return t
        }
        function J(e) {
            e.up.down = e.down,
            e.down.up = e.up,
            e.up = e.down = null 
        }
        var o = this, u = Math.floor(Math.random() * 1e4), a = Function.prototype, f = /^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/, l = /[\-\w]+\/\.\.\//, c = /([^:])\/\//g, h = "", p = {}, d = e.easyXDM, v = "easyXDM_", m, g = !1, y, b, T, N;
        if (w(e, "addEventListener"))
            T = function(e, t, n) {
                e.addEventListener(t, n, !1)
            }
            ,
            N = function(e, t, n) {
                e.removeEventListener(t, n, !1)
            }
            ;
        else {
            if (!w(e, "attachEvent"))
                throw new Error("Browser not supported");
            T = function(e, t, n) {
                e.attachEvent("on" + t, n)
            }
            ,
            N = function(e, t, n) {
                e.detachEvent("on" + t, n)
            }
        }
        var C = !1, k = [], L;
        "readyState" in t ? (L = t.readyState,
        C = L == "complete" || ~navigator.userAgent.indexOf("AppleWebKit/") && (L == "loaded" || L == "interactive")) : C = !!t.body;
        if (!C) {
            if (w(e, "addEventListener"))
                T(t, "DOMContentLoaded", A);
            else {
                T(t, "readystatechange", function() {
                    t.readyState == "complete" && A()
                });
                if (t.documentElement.doScroll && e === top) {
                    var O = function() {
                        if (C)
                            return;
                        try {
                            t.documentElement.doScroll("left")
                        } catch (e) {
                            r(O, 1);
                            return
                        }
                        A()
                    }
                    ;
                    O()
                }
            }
            T(e, "load", A)
        }
        var I = function(e) {
            e = e.substring(1).split("&");
            var t = {}, n, r = e.length;
            while (r--)
                n = e[r].split("="),
                t[n[0]] = i(n[1]);
            return t
        }(/xdm_e=/.test(n.search) ? n.search : n.hash)
          , R = function() {
            var e = {}
              , t = {
                a: [1, 2, 3]
            }
              , n = '{"a":[1,2,3]}';
            return typeof JSON != "undefined" && typeof JSON.stringify == "function" && JSON.stringify(t).replace(/\s/g, "") === n ? JSON : (Object.toJSON && Object.toJSON(t).replace(/\s/g, "") === n && (e.stringify = Object.toJSON),
            typeof String.prototype.evalJSON == "function" && (t = n.evalJSON(),
            t.a && t.a.length === 3 && t.a[2] === 3 && (e.parse = function(e) {
                return e.evalJSON()
            }
            )),
            e.stringify && e.parse ? (R = function() {
                return e
            }
            ,
            e) : null )
        }
        ;
        U(p, {
            version: "2.4.16.3",
            query: I,
            stack: {},
            apply: U,
            getJSONObject: R,
            whenReady: M,
            noConflict: D
        }),
        p.DomHelper = {
            on: T,
            un: N,
            requiresJSON: function(n) {
                E(e, "JSON") || t.write('<script type="text/javascript" src="' + n + '"><' + "/script>")
            }
        },
        function() {
            var e = {};
            p.Fn = {
                set: function(t, n) {
                    e[t] = n
                },
                get: function(t, n) {
                    var r = e[t];
                    return n && delete e[t],
                    r
                }
            }
        }(),
        p.Socket = function(e) {
            var t = $(V(e).concat([{
                incoming: function(t, n) {
                    e.onMessage(t, n)
                },
                callback: function(t) {
                    e.onReady && e.onReady(t)
                }
            }]))
              , n = B(e.remote);
            this.origin = B(e.remote),
            this.destroy = function() {
                t.destroy()
            }
            ,
            this.postMessage = function(e) {
                t.outgoing(e, n)
            }
            ,
            t.init()
        }
        ,
        p.Rpc = function(e, t) {
            if (t.local)
                for (var n in t.local)
                    if (t.local.hasOwnProperty(n)) {
                        var r = t.local[n];
                        typeof r == "function" && (t.local[n] = {
                            method: r
                        })
                    }
            var i = $(V(e).concat([new p.stack.RpcBehavior(this,t), {
                callback: function(t) {
                    e.onReady && e.onReady(t)
                }
            }]));
            this.origin = B(e.remote),
            this.destroy = function() {
                i.destroy()
            }
            ,
            i.init()
        }
        ,
        p.stack.SameOriginTransport = function(e) {
            var t, i, s, o;
            return t = {
                outgoing: function(e, t, n) {
                    s(e),
                    n && n()
                },
                destroy: function() {
                    i && (i.parentNode.removeChild(i),
                    i = null )
                },
                onDOMReady: function() {
                    o = B(e.remote),
                    e.isHost ? (U(e.props, {
                        src: F(e.remote, {
                            xdm_e: n.protocol + "//" + n.host + n.pathname,
                            xdm_c: e.channel,
                            xdm_p: 4
                        }),
                        name: v + e.channel + "_provider"
                    }),
                    i = W(e),
                    p.Fn.set(e.channel, function(e) {
                        return s = e,
                        r(function() {
                            t.up.callback(!0)
                        }, 0),
                        function(e) {
                            t.up.incoming(e, o)
                        }
                    })) : (s = _().Fn.get(e.channel, !0)(function(e) {
                        t.up.incoming(e, o)
                    }),
                    r(function() {
                        t.up.callback(!0)
                    }, 0))
                },
                init: function() {
                    M(t.onDOMReady, t)
                }
            }
        }
        ,
        p.stack.FlashTransport = function(e) {
            function c(e, t) {
                r(function() {
                    i.up.incoming(e, a)
                }, 0)
            }
            function d(n) {
                var r = e.swf + "?host=" + e.isHost
                  , i = "easyXDM_swf_" + Math.floor(Math.random() * 1e4);
                p.Fn.set("flash_loaded" + n.replace(/[\-.]/g, "_"), function() {
                    p.stack.FlashTransport[n].swf = f = l.firstChild;
                    var e = p.stack.FlashTransport[n].queue;
                    for (var t = 0; t < e.length; t++)
                        e[t]();
                    e.length = 0
                }),
                e.swfContainer ? l = typeof e.swfContainer == "string" ? t.getElementById(e.swfContainer) : e.swfContainer : (l = t.createElement("div"),
                U(l.style, b && e.swfNoThrottle ? {
                    height: "20px",
                    width: "20px",
                    position: "fixed",
                    right: 0,
                    top: 0
                } : {
                    height: "1px",
                    width: "1px",
                    position: "absolute",
                    overflow: "hidden",
                    right: 0,
                    top: 0
                }),
                t.body.appendChild(l));
                var s = "callback=flash_loaded" + n.replace(/[\-.]/g, "_") + "&proto=" + o.location.protocol + "&domain=" + P(o.location.href) + "&port=" + H(o.location.href) + "&ns=" + h;
                l.innerHTML = "<object height='20' width='20' type='application/x-shockwave-flash' id='" + i + "' data='" + r + "'>" + "<param name='allowScriptAccess' value='always'></param>" + "<param name='wmode' value='transparent'>" + "<param name='movie' value='" + r + "'></param>" + "<param name='flashvars' value='" + s + "'></param>" + "<embed type='application/x-shockwave-flash' FlashVars='" + s + "' allowScriptAccess='always' wmode='transparent' src='" + r + "' height='1' width='1'></embed>" + "</object>"
            }
            var i, s, u, a, f, l;
            return i = {
                outgoing: function(t, n, r) {
                    f.postMessage(e.channel, t.toString()),
                    r && r()
                },
                destroy: function() {
                    try {
                        f.destroyChannel(e.channel)
                    } catch (t) {}
                    f = null ,
                    s && (s.parentNode.removeChild(s),
                    s = null )
                },
                onDOMReady: function() {
                    a = e.remote,
                    p.Fn.set("flash_" + e.channel + "_init", function() {
                        r(function() {
                            i.up.callback(!0)
                        })
                    }),
                    p.Fn.set("flash_" + e.channel + "_onMessage", c),
                    e.swf = j(e.swf);
                    var t = P(e.swf)
                      , o = function() {
                        p.stack.FlashTransport[t].init = !0,
                        f = p.stack.FlashTransport[t].swf,
                        f.createChannel(e.channel, e.secret, B(e.remote), e.isHost),
                        e.isHost && (b && e.swfNoThrottle && U(e.props, {
                            position: "fixed",
                            right: 0,
                            top: 0,
                            height: "20px",
                            width: "20px"
                        }),
                        U(e.props, {
                            src: F(e.remote, {
                                xdm_e: B(n.href),
                                xdm_c: e.channel,
                                xdm_p: 6,
                                xdm_s: e.secret
                            }),
                            name: v + e.channel + "_provider"
                        }),
                        s = W(e))
                    }
                    ;
                    p.stack.FlashTransport[t] && p.stack.FlashTransport[t].init ? o() : p.stack.FlashTransport[t] ? p.stack.FlashTransport[t].queue.push(o) : (p.stack.FlashTransport[t] = {
                        queue: [o]
                    },
                    d(t))
                },
                init: function() {
                    M(i.onDOMReady, i)
                }
            }
        }
        ,
        p.stack.PostMessageTransport = function(t) {
            function a(e) {
                if (e.origin)
                    return B(e.origin);
                if (e.uri)
                    return B(e.uri);
                if (e.domain)
                    return n.protocol + "//" + e.domain;
                throw "Unable to retrieve the origin of the event"
            }
            function f(e) {
                var n = a(e);
                n == u && e.data.substring(0, t.channel.length + 1) == t.channel + " " && i.up.incoming(e.data.substring(t.channel.length + 1), n)
            }
            var i, s, o, u;
            return i = {
                outgoing: function(e, n, r) {
                    o.postMessage(t.channel + " " + e, n || u),
                    r && r()
                },
                destroy: function() {
                    N(e, "message", f),
                    s && (o = null ,
                    s.parentNode.removeChild(s),
                    s = null )
                },
                onDOMReady: function() {
                    u = B(t.remote);
                    if (t.isHost) {
                        var a = function(n) {
                            n.data == t.channel + "-ready" && (o = "postMessage" in s.contentWindow ? s.contentWindow : s.contentWindow.document,
                            N(e, "message", a),
                            T(e, "message", f),
                            r(function() {
                                i.up.callback(!0)
                            }, 0))
                        }
                        ;
                        T(e, "message", a),
                        U(t.props, {
                            src: F(t.remote, {
                                xdm_e: B(n.href),
                                xdm_c: t.channel,
                                xdm_p: 1
                            }),
                            name: v + t.channel + "_provider"
                        }),
                        s = W(t)
                    } else
                        T(e, "message", f),
                        o = "postMessage" in e.parent ? e.parent : e.parent.document,
                        o.postMessage(t.channel + "-ready", u),
                        r(function() {
                            i.up.callback(!0)
                        }, 0)
                },
                init: function() {
                    M(i.onDOMReady, i)
                }
            }
        }
        ,
        p.stack.FrameElementTransport = function(i) {
            var s, o, u, a;
            return s = {
                outgoing: function(e, t, n) {
                    u.call(this, e),
                    n && n()
                },
                destroy: function() {
                    o && (o.parentNode.removeChild(o),
                    o = null )
                },
                onDOMReady: function() {
                    a = B(i.remote),
                    i.isHost ? (U(i.props, {
                        src: F(i.remote, {
                            xdm_e: B(n.href),
                            xdm_c: i.channel,
                            xdm_p: 5
                        }),
                        name: v + i.channel + "_provider"
                    }),
                    o = W(i),
                    o.fn = function(e) {
                        return delete o.fn,
                        u = e,
                        r(function() {
                            s.up.callback(!0)
                        }, 0),
                        function(e) {
                            s.up.incoming(e, a)
                        }
                    }
                    ) : (t.referrer && B(t.referrer) != I.xdm_e && (e.top.location = I.xdm_e),
                    u = e.frameElement.fn(function(e) {
                        s.up.incoming(e, a)
                    }),
                    s.up.callback(!0))
                },
                init: function() {
                    M(s.onDOMReady, s)
                }
            }
        }
        ,
        p.stack.NameTransport = function(e) {
            function l(t) {
                var r = e.remoteHelper + (n ? "#_3" : "#_2") + e.channel;
                i.contentWindow.sendMessage(t, r)
            }
            function c() {
                n ? (++o === 2 || !n) && t.up.callback(!0) : (l("ready"),
                t.up.callback(!0))
            }
            function h(e) {
                t.up.incoming(e, a)
            }
            function d() {
                u && r(function() {
                    u(!0)
                }, 0)
            }
            var t, n, i, s, o, u, a, f;
            return t = {
                outgoing: function(e, t, n) {
                    u = n,
                    l(e)
                },
                destroy: function() {
                    i.parentNode.removeChild(i),
                    i = null ,
                    n && (s.parentNode.removeChild(s),
                    s = null )
                },
                onDOMReady: function() {
                    n = e.isHost,
                    o = 0,
                    a = B(e.remote),
                    e.local = j(e.local),
                    n ? (p.Fn.set(e.channel, function(t) {
                        n && t === "ready" && (p.Fn.set(e.channel, h),
                        c())
                    }),
                    f = F(e.remote, {
                        xdm_e: e.local,
                        xdm_c: e.channel,
                        xdm_p: 2
                    }),
                    U(e.props, {
                        src: f + "#" + e.channel,
                        name: v + e.channel + "_provider"
                    }),
                    s = W(e)) : (e.remoteHelper = e.remote,
                    p.Fn.set(e.channel, h));
                    var t = function() {
                        var n = i || this;
                        N(n, "load", t),
                        p.Fn.set(e.channel + "_load", d),
                        function s() {
                            typeof n.contentWindow.sendMessage == "function" ? c() : r(s, 50)
                        }()
                    }
                    ;
                    i = W({
                        props: {
                            src: e.local + "#_4" + e.channel
                        },
                        onLoad: t
                    })
                },
                init: function() {
                    M(t.onDOMReady, t)
                }
            }
        }
        ,
        p.stack.HashTransport = function(t) {
            function d(e) {
                if (!c)
                    return;
                var n = t.remote + "#" + f++ + "_" + e;
                (s || !h ? c.contentWindow : c).location = n
            }
            function m(e) {
                a = e,
                n.up.incoming(a.substring(a.indexOf("_") + 1), p)
            }
            function g() {
                if (!l)
                    return;
                var e = l.location.href
                  , t = ""
                  , n = e.indexOf("#");
                n != -1 && (t = e.substring(n)),
                t && t != a && m(t)
            }
            function y() {
                o = setInterval(g, u)
            }
            var n, i = this, s, o, u, a, f, l, c, h, p;
            return n = {
                outgoing: function(e, t) {
                    d(e)
                },
                destroy: function() {
                    e.clearInterval(o),
                    (s || !h) && c.parentNode.removeChild(c),
                    c = null 
                },
                onDOMReady: function() {
                    s = t.isHost,
                    u = t.interval,
                    a = "#" + t.channel,
                    f = 0,
                    h = t.useParent,
                    p = B(t.remote);
                    if (s) {
                        U(t.props, {
                            src: t.remote,
                            name: v + t.channel + "_provider"
                        });
                        if (h)
                            t.onLoad = function() {
                                l = e,
                                y(),
                                n.up.callback(!0)
                            }
                            ;
                        else {
                            var i = 0
                              , o = t.delay / 50;
                            (function d() {
                                if (++i > o)
                                    throw new Error("Unable to reference listenerwindow");
                                try {
                                    l = c.contentWindow.frames[v + t.channel + "_consumer"]
                                } catch (e) {}
                                l ? (y(),
                                n.up.callback(!0)) : r(d, 50)
                            })()
                        }
                        c = W(t)
                    } else
                        l = e,
                        y(),
                        h ? (c = parent,
                        n.up.callback(!0)) : (U(t, {
                            props: {
                                src: t.remote + "#" + t.channel + new Date,
                                name: v + t.channel + "_consumer"
                            },
                            onLoad: function() {
                                n.up.callback(!0)
                            }
                        }),
                        c = W(t))
                },
                init: function() {
                    M(n.onDOMReady, n)
                }
            }
        }
        ,
        p.stack.ReliableBehavior = function(e) {
            var t, n, r = 0, i = 0, s = "";
            return t = {
                incoming: function(e, o) {
                    var u = e.indexOf("_")
                      , a = e.substring(0, u).split(",");
                    e = e.substring(u + 1),
                    a[0] == r && (s = "",
                    n && (n(!0),
                    n = null )),
                    e.length > 0 && (t.down.outgoing(a[1] + "," + r + "_" + s, o),
                    i != a[1] && (i = a[1],
                    t.up.incoming(e, o)))
                },
                outgoing: function(e, o, u) {
                    s = e,
                    n = u,
                    t.down.outgoing(i + "," + ++r + "_" + e, o)
                }
            }
        }
        ,
        p.stack.QueueBehavior = function(e) {
            function h() {
                if (e.remove && n.length === 0) {
                    J(t);
                    return
                }
                if (o || n.length === 0 || a)
                    return;
                o = !0;
                var i = n.shift();
                t.down.outgoing(i.data, i.origin, function(e) {
                    o = !1,
                    i.callback && r(function() {
                        i.callback(e)
                    }, 0),
                    h()
                })
            }
            var t, n = [], o = !0, u = "", a, f = 0, l = !1, c = !1;
            return t = {
                init: function() {
                    q(e) && (e = {}),
                    e.maxLength && (f = e.maxLength,
                    c = !0),
                    e.lazy ? l = !0 : t.down.init()
                },
                callback: function(e) {
                    o = !1;
                    var n = t.up;
                    h(),
                    n.callback(e)
                },
                incoming: function(n, r) {
                    if (c) {
                        var s = n.indexOf("_")
                          , o = parseInt(n.substring(0, s), 10);
                        u += n.substring(s + 1),
                        o === 0 && (e.encode && (u = i(u)),
                        t.up.incoming(u, r),
                        u = "")
                    } else
                        t.up.incoming(n, r)
                },
                outgoing: function(r, i, o) {
                    e.encode && (r = s(r));
                    var u = [], a;
                    if (c) {
                        while (r.length !== 0)
                            a = r.substring(0, f),
                            r = r.substring(a.length),
                            u.push(a);
                        while (a = u.shift())
                            n.push({
                                data: u.length + "_" + a,
                                origin: i,
                                callback: u.length === 0 ? o : null 
                            })
                    } else
                        n.push({
                            data: r,
                            origin: i,
                            callback: o
                        });
                    l ? t.down.init() : h()
                },
                destroy: function() {
                    a = !0,
                    t.down.destroy()
                }
            }
        }
        ,
        p.stack.VerifyBehavior = function(e) {
            function s() {
                n = Math.random().toString(16).substring(2),
                t.down.outgoing(n)
            }
            var t, n, r, i = !1;
            return t = {
                incoming: function(i, o) {
                    var u = i.indexOf("_");
                    u === -1 ? i === n ? t.up.callback(!0) : r || (r = i,
                    e.initiate || s(),
                    t.down.outgoing(i)) : i.substring(0, u) === r && t.up.incoming(i.substring(u + 1), o)
                },
                outgoing: function(e, r, i) {
                    t.down.outgoing(n + "_" + e, r, i)
                },
                callback: function(t) {
                    e.initiate && s()
                }
            }
        }
        ,
        p.stack.RpcBehavior = function(e, t) {
            function o(e) {
                e.jsonrpc = "2.0",
                n.down.outgoing(r.stringify(e))
            }
            function u(e, t) {
                var n = Array.prototype.slice;
                return function() {
                    var r = arguments.length, u, a = {
                        method: t
                    };
                    r > 0 && typeof arguments[r - 1] == "function" ? (r > 1 && typeof arguments[r - 2] == "function" ? (u = {
                        success: arguments[r - 2],
                        error: arguments[r - 1]
                    },
                    a.params = n.call(arguments, 0, r - 2)) : (u = {
                        success: arguments[r - 1]
                    },
                    a.params = n.call(arguments, 0, r - 1)),
                    s["" + ++i] = u,
                    a.id = i) : a.params = n.call(arguments, 0),
                    e.namedParams && a.params.length === 1 && (a.params = a.params[0]),
                    o(a)
                }
            }
            function f(e, t, n, r) {
                if (!n) {
                    t && o({
                        id: t,
                        error: {
                            code: -32601,
                            message: "Procedure not found."
                        }
                    });
                    return
                }
                var i, s;
                t ? (i = function(e) {
                    i = a,
                    o({
                        id: t,
                        result: e
                    })
                }
                ,
                s = function(e, n) {
                    s = a;
                    var r = {
                        id: t,
                        error: {
                            code: -32099,
                            message: e
                        }
                    };
                    n && (r.error.data = n),
                    o(r)
                }
                ) : i = s = a,
                S(r) || (r = [r]);
                try {
                    var u = n.method.apply(n.scope, r.concat([i, s]));
                    q(u) || i(u)
                } catch (f) {
                    s(f.message)
                }
            }
            var n, r = t.serializer || R(), i = 0, s = {};
            return n = {
                incoming: function(e, n) {
                    var i = r.parse(e);
                    if (i.method)
                        t.handle ? t.handle(i, o) : f(i.method, i.id, t.local[i.method], i.params);
                    else {
                        var u = s[i.id];
                        i.error ? u.error && u.error(i.error) : u.success && u.success(i.result),
                        delete s[i.id]
                    }
                },
                init: function() {
                    if (t.remote)
                        for (var r in t.remote)
                            t.remote.hasOwnProperty(r) && (e[r] = u(t.remote[r], r));
                    n.down.init()
                },
                destroy: function() {
                    for (var r in t.remote)
                        t.remote.hasOwnProperty(r) && e.hasOwnProperty(r) && delete e[r];
                    n.down.destroy()
                }
            }
        }
        ,
        o.easyXDM = p
    }(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent),
    define("easyXDM/easyXDM", ["json2"], function(e) {
        return function() {
            var t, n;
            return t || e.window.easyXDM
        }
    }(this)),
    define("report/reportapi", ["easyXDM/easyXDM"], function(e) {
        function t(t, n, r, i) {
            this.serviceUrl = r || window.location.href.substr(0, window.location.href.lastIndexOf("/")),
            this.serviceUrl.slice(-1) != "/" && (this.serviceUrl += "/"),
            this.noCrossdomain = i;
            if (!this.noCrossdomain) {
// this.getserviceendpoint is  not wanted here
                //var s = this.getServiceEndpoint() + "js/lib/easyXDM/";
                var s = "/resource/js/lib/easyXDM/";
                this.xhr = new e.Rpc({
                    local: "../name.html",
                    swf: s + "easyxdm.swf",
                    remote: s + "cors/index.html",
                    remoteHelper: s + "name.html"
                },{
                    remote: {
                        request: {}
                    },
                    serializer: window.JSON
                })
            }
            n || (n = function(e) {
                this.initialized = -1,
                window.alert("Could not initiate reportservice. Maybe the server is unreachable? \n " + e)
            }
            ),
            t || (t = function(e) {
                window.alert("Using reportservice version " + e)
            }
            ),
            this.initialized = 0;
            var o = this
              , u = function(e) {
                o.bodyTemplate = e.templateOptions,
                o.templates = e.templates,
                o.libraries = e.libraries,
                o.initialized = 1,
                o.version = e.version.version,
                t(o.version),
                o.reset()
            }
            ;
            this.doServiceGet("report/rest/report/info?_type=json", "", u, n)
        }
        function n() {
            try {
                http = new XMLHttpRequest
            } catch (e) {
                try {
                    http = new ActiveXObject("Msxml2.xmlhttp")
                } catch (t) {
                    try {
                        http = new ActiveXObject("Microsoft.xmlhttp")
                    } catch (n) {
                        http = !1
                    }
                }
            }
            return http
        }
        function r(e, t, r, i, s) {
            s == undefined && (s = "POST");
            var o = n();
            o.open(s, e),
            o.setRequestHeader("Content-Type", "application/json"),
            o.onreadystatechange = function() {
                if (o.readyState == 4)
                    if (o.status == 200) {
                        var e = o.responseText;
                        try {
                            e = window.JSON.parse(o.responseText)
                        } catch (t) {}
                        r(e)
                    } else
                        i(o.responseText)
            }
            ,
            o.send(window.JSON.stringify(t))
        }
        function i(e) {
            return window.JSON.parse(window.JSON.stringify(e))
        }
        return Object.keys || (Object.keys = function() {
            var e = Object.prototype.hasOwnProperty
              , t = !{
                toString: null 
            }.propertyIsEnumerable("toString")
              , n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
              , r = n.length;
            return function(i) {
                if (typeof i != "object" && typeof i != "function" || i === null )
                    throw new TypeError("Object.keys called on non-object");
                var s = [];
                for (var o in i)
                    e.call(i, o) && s.push(o);
                if (t)
                    for (var u = 0; u < r; u++)
                        e.call(i, n[u]) && s.push(n[u]);
                return s
            }
        }()),
        t.prototype = {
            LAYER_PACKAGE: "com.geodan.reportservice.dto.",
            RASTER_WMS: "LayerWMS",
            VECTOR_WMS: "LayerWMS",
            RASTER_TILED_WMSC: "LayerWMSC",
            VECTOR_GML: "LayerGML",
            VECTOR_WKT: "LayerVectorRedlining",
            RASTER_TMS: "LayerTMS",
            RASTER_WMTS: "LayerWMTS",
            noCrossdomain: !1,
            server: "",
            restBody: "",
            bodyTemplate: null ,
            layerTemplate: [],
            templates: null ,
            checkInit: function() {
                while (this.initialized == 0)
                    ;
            },
            reset: function() {
                this.restBody = {
                    options: i(this.bodyTemplate)
                }
            },
            getServiceEndpoint: function() {
                return this.serviceUrl
            },
            setTemplateName: function(e) {
                this.restBody.options.reportOptions.template = e
            },
            getTemplateInfo: function(e) {
                return this.templates[e]
            },
            getFirstTemplate: function() {
                var e = Object.keys(this.templates);
                return e.length > 0 ? this.templates[e[0]] : null 
            },
            setDPI: function(e) {
                this.restBody.options.reportOptions.dpi = e
            },
            addReportoption: function(e, t) {
                this.restBody.options.reportOptions.parameters[e] = t
            },
            setMapOptions: function(e) {
                this.restBody.options.mapOptions.viewport = e.viewport,
                typeof e.height != "undefined" ? this.restBody.options.mapOptions.height = e.height : delete this.restBody.options.mapOptions.height,
                typeof e.width != "undefined" ? this.restBody.options.mapOptions.width = e.width : delete this.restBody.options.mapOptions.width,
                typeof e.scale != "undefined" && (this.restBody.options.mapOptions.scale = e.scale)
            },
            addLayer: function(e) {
                this.restBody.options.mapOptions.layerList.layer.push(e)
            },
            createLayer: function(e, t, n) {
                var r = {
                    "@class": this.LAYER_PACKAGE + e
                };
                t && (r.name = t);
                if (n)
                    for (prop in n)
                        r[prop] = n[prop];
                return r
            },
            addRasterLayerWMS: function(e, t, n) {
                var r = this.createLayer(this.RASTER_WMS, t, n);
                r.url = e,
                this.addLayer(r)
            },
            addVectorLayerWMS: function(e, t, n) {
                var r = this.createLayer(this.VECTOR_WMS, t, n);
                r.url = e,
                this.addLayer(r)
            },
            addRasterTiledLayerWMSC: function(e, t, n) {
                this.addRasterTiledLayerWMSC(e, t, !1, n)
            },
            addRasterTiledLayerWMSC: function(e, t, n, r) {
                var i = this.createLayer(this.RASTER_TILED_WMSC, t, r);
                (!r.resolutions || !r.maxExtent) && this.warning("Resolutions and maxExtent must be defined as options! Ignoring layer " + t),
                i.tiles = e,
                i.forceColorModel = n,
                this.addLayer(i)
            },
            addRasterLayerTMS: function(e, t, n, r) {
                var i = this.createLayer(this.RASTER_TMS, t, r);
                i.tiles = e,
                i.forceColorModel = n,
                this.addLayer(i)
            },
            addRasterLayerWMTS: function(e, t, n, r) {
                var i = this.createLayer(this.RASTER_WMTS, t, r);
                i.tiles = e,
                i.forceColorModel = n,
                this.addLayer(i)
            },
            addFeatureLayerGML: function(e, t, n, r) {
                var i = this.createLayer(this.VECTOR_GML, n, r);
                i.features = {
                    featureList: e
                },
                i.layerstyle = t,
                this.addLayer(i)
            },
            addFeatureLayerWKT: function(e, t, n, r) {
                var i = this.createLayer(this.VECTOR_WKT, n, r);
                i.features = {
                    featureList: e
                },
                this.addLayer(i)
            },
            createWKTFeature: function(e, t) {
                return {
                    "@class": "com.geodan.printservice.core.domain.SimpleGeometry",
                    geometry: e,
                    style: t
                }
            },
            createOGCFeature: function(e, t) {
                return {
                    "@class": "com.geodan.printservice.core.domain.OgcGeometry",
                    gml: e,
                    sld: t
                }
            },
            createBbox: function(e, t, n, r) {
                return {
                    bottom: t,
                    left: e,
                    right: n,
                    top: r
                }
            },
            createPicture: function(e, t) {
                this.doServiceCall("report/rest/report/mappicture/url?_type=json", this.restBody.options.mapOptions, e, t)
            },
            createPictureInImg: function(e) {
                var t = function(t) {
                    e.src = t
                }
                ;
                this.doServiceCall("report/rest/report/mappicture/url?_type=json", this.restBody.options.mapOptions, t)
            },
            createReport: function(e, t) {
                this.doServiceCall("report/rest/report/" + this.restBody.options.reportOptions.template + "/url?_type=json", this.restBody.options, e, t)
            },
            createMapReport: function(e, t) {
                this.doServiceCall("report/rest/report/" + this.restBody.options.reportOptions.template + "/url?_type=json", this.restBody.options, e, t)
            },
            createReportInIframe: function(e) {
                var t = function(t) {
                    e.src = t
                }
                ;
                this.doServiceCall("report/rest/report/plain/" + this.restBody.options.reportOptions.template + "/url?_type=json", this.restBody.options.reportOptions, t)
            },
            createMapReportInIframe: function(e) {
                var t = function(t) {
                    e.src = t
                }
                ;
                this.doServiceCall("report/rest/report/" + this.restBody.options.reportOptions.template + "/url?_type=json", this.restBody.options, t)
            },
            doServiceGet: function(e, t, n, r) {
                this.doServiceCall(e, t, n, r, "GET")
            },
            doServiceCall: function(e, t, n, r, i) {
                i == undefined && (i = "POST"),
                n == undefined && (n = function(e) {
                    window.open(e)
                }
                ),
                r == undefined && (r = function(e) {
                    alert("Error in reportservice:\n" + e)
                }
                ),
                this.doJSONcall(e, t, n, r, i)
            },
            doJSONcall: function(e, t, n, i, s) {
                e = this.getServiceEndpoint() + e;
                if (this.noCrossdomain) {
                    r(e, t, n, i, s);
                    return
                }
                s == undefined && (s = "POST"),
                typeof t == "object" && (t = window.JSON.stringify(t)),
                this.xhr.request({
                    url: e,
                    method: s,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: t,
                    timeout: 6e6
                }, function(e, t, r) {
                    var i;
                    try {
                        i = window.JSON.parse(e.data)
                    } catch (s) {
                        i = e.data
                    }
                    n(i)
                }, function(e, t, n) {
                    e.data && e.data.data ? i(e.data.data) : i(e.message)
                })
            }
        },
        t
    }),
    define("report/reportol", ["report/reportapi", "OpenLayers"], function(e, t) {
        function n(e, t) {
            var n = e.length;
            while (n--)
                if (e[n] === t)
                    return !0;
            return !1
        }
        return ReportOLControl = t.Class(t.Control, {
            printboxlayer: null ,
            size: null ,
            scale: 0,
            unitsRatio: null ,
            dpi: 72,
            scales: [],
            reportapi: undefined,
            templateName: "dummy",
            reportParams: {},
            noPrintLayers: [],
            wysiwyg: !1,
            globalCustomPrintParameter: "",
            usePrintUrls: !1,
            initialize: function(n, r) {
                if (typeof n == "string" && (typeof r == "object" || typeof r == "undefined"))
                    return this.initialize(r, n);
                n = n || {};
                var i;
                typeof n.hidden == "undefined" ? i = !1 : i = n.hidden;
                var s = n.noCrossdomain;
                this.size = n.size,
                this.fixedSize = n.fixedSize,
                n.serviceerrorcallback && (this.onServiceError = n.serviceerrorcallback),
                n.printcallback && (this.onPrinted = n.printcallback),
                n.printerrorcallback && (this.onPrintError = n.printerrorcallback),
                this.onActivated = n.afteractivatecallback ? n.afteractivatecallback : function() {}
                ,
                this.globalCustomPrintParameter = n.globalCustomPrintParameter || this.globalCustomPrintParameter,
                this.noPrintLayers = n.noPrintLayers || this.noPrintLayers,
                typeof n.wysiwyg != "undefined" && (this.wysiwyg = n.wysiwyg),
                n.style ? this.style = n.style : this.style = {
                    strokeColor: "#FF0000",
                    strokeOpacity: .8,
                    fillColor: "#FF0000",
                    fillOpacity: .1,
                    strokeWidth: 3,
                    pointRadius: 6,
                    pointerEvents: "visiblePainted"
                },
                n.pointStyle ? this.pointStyle = n.pointStyle : this.pointStyle = {
                    strokeColor: "#FF0000",
                    strokeOpacity: .8,
                    fillColor: "#FF0000",
                    fillOpacity: .1,
                    strokeWidth: 3,
                    pointRadius: 6,
                    pointerEvents: "visiblePainted",
                    cursor: "NE-resize"
                };
                var o = this
                  , u = n.callback
                  , o = this
                  , a = function(e) {
                    t.Console.log("Using reportservice version: " + e);
                    if (!n.size) {
                        var r;
                        n.defaultTemplate ? r = o.setTemplate(n.defaultTemplate) : r = o.setTemplate("nonExistingReportSoFallbackToFirstAvailableReport");
                        if (!r) {
                            o.onServiceError("No report templates found at server.");
                            return
                        }
                    }
                    n.scales ? o.setScales(n.scales) : n.resolutions && o.setScales(o._getScales()),
                    n.scale && o.setScale(n.scale, !0),
                    u ? u(o) : o.activate({
                        hidden: i
                    })
                }
                ;
                try {
                    this.reportapi = new e(a,function(e) {
                        o.onServiceError(e)
                    }
                    ,r,s)
                } catch (f) {
                    t.Console.log("Reportservice initialization error: " + f.message),
                    o.onServiceError("Reportservice unavailable. ReportControl could not be initialized.")
                }
            },
            activate: function() {
                if (t.Handler.prototype.activate.apply(this, arguments)) {
                    if (typeof this.size == "undefined" && typeof this.fixedSize == "undefined")
                        return this.onPrintError("No size or fixedSize has been set at initialisation! Printtool will not be activated."),
                        !1;
                    typeof this.fixedSize != "undefined" && (this.size = this.fixedSize),
                    hidden = arguments[0] ? arguments[0].hidden : !1;
                    var e = this.map.getUnits();
                    return this.unitsRatio = t.INCHES_PER_UNIT[e],
                    typeof this.dpi == "undefined" && (this.dpi = t.DOTS_PER_INCH),
                    this.setScale(this.map.getScale() / 10, !0),
                    this._createPrintboxLayer(hidden),
                    this._createPrintbox(),
                    this._createPrintboxControl(),
                    this.onActivated(),
                    !0
                }
                return !1
            },
            setWYSIWYG: function(e) {
                this.wysiwyg = e
            },
            _createPrintboxLayer: function(e) {
                this.printboxlayer = new t.Layer.Vector("Printbox Layer",{
                    styleMap: new t.StyleMap({
                        "default": new t.Style({
                            fillColor: "#FF000000",
                            fillOpacity: .9,
                            strokeColor: "#FF0000",
                            strokeOpacity: .8,
                            strokeWidth: 1,
                            pointRadius: 15
                        })
                    }),
                    displayInLayerSwitcher: !1
                }),
                this.map.addLayer(this.printboxlayer),
                this.printboxlayer.noPrint = !0,
                this.setVisibility(!e)
            },
            _createPrintbox: function() {
                var e = t.Geometry.fromWKT("POLYGON((-1 -1, 1 -1, 1 1, -1 1, -1 -1))");
                this.printFeature = new t.Feature.Vector(e,null ,this.style),
                this.smallerFeature = new t.Feature.Vector(e,null ,this.style),
                this.biggerFeature = new t.Feature.Vector(e,null ,this.style),
                e = t.Geometry.fromWKT("POINT(-1 -1)"),
                this.resizeFeature = new t.Feature.Vector(e,null ,this.pointStyle),
                this.printboxlayer.addFeatures([this.printFeature, this.resizeFeature]),
                this.resetPrintbox()
            },
            resetScale: function(e) {
                this.wysiwyg || e ? this.setScale(this.map.getScale(), !0) : this.setScale(this.map.getScale() / 10, !0)
            },
            resetPrintbox: function() {
                var e = this.printboxlayer.features[0];
                this.map.getCenter() && (this.printFeature.move(this.map.getCenter()),
                this.smallerFeature.move(this.map.getCenter()),
                this.biggerFeature.move(this.map.getCenter())),
                this._updatePrintbox()
            },
            _createPrintboxControl: function() {
                var e = new t.Control.DragFeature(this.printboxlayer)
                  , n = this;
                e.onDrag = function(e, t) {
                    if (n.resizeFeature.id == e.id) {
                        var r = Math.abs(e.geometry.distanceTo(n.printFeature.geometry))
                          , i = Math.abs(e.geometry.distanceTo(n.smallerFeature.geometry))
                          , s = Math.abs(e.geometry.distanceTo(n.biggerFeature.geometry));
                        if (r < i && r < s)
                            return;
                        i < r && i < s ? n.setScale(n.getSmallerScale(n.scale)) : n.setScale(n.getBiggerScale(n.scale))
                    }
                }
                ,
                e.onComplete = function(e, t) {
                    n.isDragging = !1,
                    n._placeResizePoint()
                }
                ,
                e.onStart = function(e, t) {
                    n.isDragging = !0
                }
                ,
                this.map.addControl(e),
                e.activate()
            },
            _placeResizePoint: function() {
                var e = this;
                e.printboxlayer.removeFeatures([e.resizeFeature]);
                var n = e.printFeature.geometry.getBounds();
                e.resizeFeature.geometry = new t.Geometry.Point(n.right,n.top),
                e.printboxlayer.addFeatures([e.resizeFeature])
            },
            _updatePrintbox: function() {
                if (!this.printFeature)
                    return;
                this.scale = this._getPrintScale();
                if (this.scale != null  && this.size != null ) {
                    var e = this.scale
                      , t = this.printFeature.geometry.getBounds().getCenterLonLat();
                    this.printboxbounds = this._getBounds(t, e),
                    this.printboxlayer.removeFeatures([this.printFeature]),
                    this.printFeature.geometry = this.printboxbounds.toGeometry(),
                    this.printboxlayer.addFeatures([this.printFeature]),
                    this.smallerFeature.geometry = this._getBounds(t, this.getSmallerScale(e)).toGeometry(),
                    this.biggerFeature.geometry = this._getBounds(t, this.getBiggerScale(e)).toGeometry(),
                    this.isDragging || this._placeResizePoint()
                }
            },
            setDPI: function(e) {
                this.dpi = e
            },
            _getBounds: function(e, n) {
                var r = t.DOTS_PER_INCH
                  , i = this.size.width / r / this.unitsRatio * n / 2
                  , s = this.size.height / r / this.unitsRatio * n / 2
                  , o = new t.Bounds(e.lon - i,e.lat - s,e.lon + i,e.lat + s);
                return o
            },
            _findClosestScale: function(e) {
                for (var t = 0; t < this.scales.length; t++) {
                    var n = this.scales[t]
                      , r = this.calculatePageBounds(n, units)
                      , i = Math.abs(r.getWidth() - e.getWidth()) + Math.abs(r.getHeight() - e.getHeight());
                    i < closest && (closest = i,
                    scale = n)
                }
                return scale
            },
            getSmallerScale: function(e) {
                var t = this._getCurrentScaleLevel(e);
                return t > 0 && t--,
                this.scales[t]
            },
            getBiggerScale: function(e) {
                var t = this._getCurrentScaleLevel(e);
                return t < this.scales.length - 1 && t++,
                this.scales[t]
            },
            _getCurrentScaleLevel: function(e) {
                var t = 0;
                if (this.scales.length > 0) {
                    var n = 0
                      , r = this.scales[this.scales.length - 1];
                    for (var i = 0; i < this.scales.length; i++) {
                        var s = this.scales[i];
                        if (e > n && e <= s) {
                            n == 0 || e - n > s - e ? (e = s,
                            t = i) : (e = n,
                            t = i - 1);
                            break
                        }
                        n = s
                    }
                    e >= r && (e = r,
                    t = this.scales.length - 1)
                }
                return t
            },
            setScale: function(e, t) {
                this.scales.length > 0 && (e = this.scales[this._getCurrentScaleLevel(e)]),
                this.scale != e && (this.scale = e,
                this.onScaleChange(e),
                t || this._updatePrintbox())
            },
            setSize: function(e) {
                this.size = e,
                this._updatePrintbox()
            },
            setScales: function(e) {
                e.length > 1 && e[0] > e[1] && e.reverse(),
                this.scales = e
            },
            setTemplate: function(e) {
                var t = this.reportapi.getTemplateInfo(e);
                if (typeof t == "undefined") {
                    t = this.reportapi.getFirstTemplate(),
                    e = t.name;
                    if (typeof t == "undefined")
                        return this.onServiceError("Cannot load template because it does not exist: " + e + ". No other templates available either."),
                        !1
                }
                var n;
                return typeof this.fixedSize != "undefined" ? n = this.fixedSize : n = {
                    width: t.width72DPI,
                    height: t.height72DPI
                },
                this.setSize(n),
                this.templateName = e,
                !0
            },
            setVisibility: function(e) {
                this.printboxlayer.setVisibility(e)
            },
            getPrintExtent: function() {
                return this.wysiwyg && this.resetPrintbox(),
                this.printboxbounds != undefined ? this.printboxbounds : this.map.getExtent()
            },
            beforePrint: function() {},
            onPrinted: function(e) {
                /^(http|https):/i.test(e) || (e = this.reportapi.getServiceEndpoint() + e),
                window.open(e)
            },
            onPrintError: function(e) {},
            onServiceError: function(e) {
                t.Console.log("Reportservice error: " + e),
                alert("Reportservice error: " + e)
            },
            onScaleChange: function(e) {},
            print: function(e, t, n) {
                this._print(e, t, n);
                var r = this;
                this.reportapi.createMapReport(function(e) {
                    r.onPrinted(e)
                }, function(e) {
                    r.onPrintError(e)
                })
            },
            printPicture: function(e, t) {
                if (typeof this.fixedSize == "undefined") {
                    var n = this.map.getSize();
                    this.fixedSize = {
                        width: n.w,
                        height: n.h
                    }
                }
                this._print(e, null , t);
                var r = this;
                this.reportapi.createPicture(function(e) {
                    r.onPrinted(e)
                }, function(e) {
                    r.onPrintError(e)
                })
            },
            _print: function(e, t, n) {
                if (typeof e == "string" && (typeof t == "object" || typeof t == "undefined"))
                    return this._print(t, e, n);
                typeof n == "undefined" && (n = "pdf"),
                typeof t != "undefined" && (this.templateName = t),
                typeof e != "undefined" && (this.reportParams = e),
                this._updatePrintbox(),
                this.reportapi.reset(),
                this.reportapi.setTemplateName(this.templateName),
                this.reportapi.setDPI(this.dpi);
                for (var r in this.reportParams)
                    r != undefined && this.reportapi.addReportoption(r, this.reportParams[r]);
                var i = this.printboxbounds.getCenterLonLat();
                this.reportapi.addReportoption("report_param_map_center_x", i.lon),
                this.reportapi.addReportoption("report_param_map_center_Y", i.lat),
                this.OLToReport();
                var s = this;
                this.beforePrint()
            },
            _toVectorUrl: function(e) {
                return e += "&",
                e.replace(/format=.*?&/i, "format=image/svg&")
            },
            _toPrintStyleUrl: function(e, t) {
                return e += "&",
                typeof t.customPrintParameter != "undefined" && t.customPrintParameter != "" ? e += t.customPrintParameter : typeof this.globalCustomPrintParameter != "undefined" && this.globalCustomPrintParameter != "" && (e += this.globalCustomPrintParameter),
                typeof t.printStyle != "undefined" && t.printStyle != "" && (e = e.replace(/style=.*?&/i, "style=" + t.printStyle + "&")),
                typeof t.printLayers != "undefined" && t.printLayers != "" && (e = e.replace(/layers=.*?&/i, "layers=" + t.printLayers + "&")),
                e
            },
            getLayerUrl: function(e) {
                var t = "";
                if (this.isTiled(e))
                    t = e.report.wmsurl;
                else {
                    if (!e.getURL)
                        return "";
                    t = e.getURL(this.map.getExtent())
                }
                return t != undefined && t != "" && (e.report.useVector && (t = this._toVectorUrl(t)),
                t = this._toPrintStyleUrl(t, e.report)),
                t
            },
            OLToReport: function() {
                var e = this.scale != undefined && this.scale != 0
                  , r = []
                  , i = []
                  , s = []
                  , o = new Array
                  , u = this;
                for (var a = 0; a < this.map.layers.length; a++) {
                    var f = this.map.layers[a];
                    f.report = f.report || {},
                    f.report.isForcedColorModel = f.report.isForcedColorModel || (f.isForcedColorModel ? f.isForcedColorModel : !1),
                    f.report.wmsurl = f.report.wmsurl || f.wmsurl,
                    f.report.useVector = f.report.useVector || f.useVector,
                    f.report.legendUrl = f.report.legendUrl || f.metadata.legendUrl;
                    if (f.getVisibility() && f.calculateInRange() && !n(u.noPrintLayers, f.name) && !f.report.noPrint && !f.noPrint) {
                        var l = {};
                        typeof f.report.legendUrl != undefined && f.report.legendUrl != "" && (l.legendUrl = f.report.legendUrl,
                        typeof f.opacity != "undefined" && f.opacity != null  && (l.opacity = f.opacity),
                        l.zindex = f.getZIndex());
                        if (f instanceof t.Layer.Vector) {
                            var c = []
                              , h = []
                              , p = ""
                              , d = "";
                            for (var v = 0; v < f.features.length; v++) {
                                var m = f.features[v];
                                t.Util.indexOf(f.selectedFeatures, m.fid) != -1 ? (d = t.Feature.Vector.style.select,
                                h[h.length] = this.reportapi.createWKTFeature(m.geometry.toString(), d)) : (p = m.style ? m.style : t.Feature.Vector.style["default"],
                                c[c.length] = this.reportapi.createWKTFeature(m.geometry.toString(), p))
                            }
                            c.length > 0 && (f.isBaseLayer ? r[r.length] = {
                                name: f.name,
                                type: "vector_wkt",
                                url: "",
                                x: 0,
                                y: 0,
                                features: c,
                                bbox: f.getExtent(),
                                style: p,
                                options: l
                            } : i[i.length] = {
                                name: f.name,
                                type: "vector_wkt",
                                url: "",
                                x: 0,
                                y: 0,
                                features: c,
                                bbox: f.getExtent(),
                                style: p,
                                options: l
                            }),
                            h.length > 0 && (f.isBaseLayer ? r[r.length] = {
                                name: f.name + " selected",
                                type: "vector_wkt",
                                url: "",
                                x: 0,
                                y: 0,
                                features: h,
                                bbox: f.getExtent(),
                                style: d,
                                options: l
                            } : i[i.length] = {
                                name: f.name + " selected",
                                type: "vector_wkt",
                                url: "",
                                x: 0,
                                y: 0,
                                features: h,
                                bbox: f.getExtent(),
                                style: d,
                                options: l
                            })
                        } else if (f.CLASS_NAME == "OpenLayers.Layer.Markers") {
                            var g = [];
                            for (var v = 0; v < f.markers.length; v++) {
                                var y = f.markers[v];
                                g[g.length] = {
                                    marker: y.toString(),
                                    picture: y.icon.url,
                                    x: y.lonlat.lat,
                                    y: y.lonlat.lon,
                                    width: y.icon.size.w,
                                    height: y.icon.size.h
                                }
                            }
                            i[i.length] = {
                                name: f.name,
                                type: "marker",
                                url: "",
                                x: 0,
                                y: 0,
                                markers: g,
                                bbox: f.getExtent(),
                                options: l
                            }
                        } else if (f.CLASS_NAME == "OpenLayers.Layer.WMTS") {
                            var b = "raster_wmts"
                              , w = [];
                            for (var E = 0; E < f.matrixIds.length; E++)
                                w.push(f.matrixIds[E].identifier);
                            S = f.url,
                            l.resolutions = f.resolutions,
                            l.matrixSet = f.matrixSet,
                            l.matrixIds = w,
                            l.layerFormat = f.format,
                            l.tileSizeHeight = f.tileSize.h,
                            l.tileSizeWidth = f.tileSize.w,
                            l.tileFullExtent = this.toBbox(f.tileFullExtent),
                            typeof f.url == "string" ? l.baseUrl = f.url : l.baseUrl = f.url[0],
                            l.layerName = f.layer,
                            l.maxExtent = this.toBbox(f.maxExtent),
                            S != undefined && S != "" && (f.isBaseLayer ? r[r.length] = {
                                name: f.name,
                                type: b,
                                url: S,
                                options: l,
                                isForcedColorModel: f.report.isForcedColorModel
                            } : i[i.length] = {
                                name: f.name,
                                type: b,
                                url: S,
                                options: l,
                                isForcedColorModel: f.report.isForcedColorModel
                            })
                        } else if (f.CLASS_NAME == "OpenLayers.Layer.TMS") {
                            var b = "raster_tms";
                            S = f.url,
                            l.originX = f.origin.x,
                            l.originY = f.origin.y,
                            l.resolutions = f.resolutions,
                            l.layerFormat = "png8",
                            l.tileSizeHeight = f.tileSize.h,
                            l.tileSizeWidth = f.tileSize.w,
                            l.tileFullExtent = this.toBbox(f.getTilesBounds),
                            typeof f.url == "string" ? l.baseUrl = f.url : l.baseUrl = f.url[0],
                            l.layerName = f.layername,
                            l.maxExtent = this.toBbox(f.maxExtent),
                            S != undefined && S != "" && (f.isBaseLayer ? r[r.length] = {
                                name: f.name,
                                type: b,
                                url: S,
                                options: l,
                                isForcedColorModel: f.report.isForcedColorModel
                            } : i[i.length] = {
                                name: f.name,
                                type: b,
                                url: S,
                                options: l,
                                isForcedColorModel: f.report.isForcedColorModel
                            })
                        } else {
                            var b = "raster_wms";
                            f.report.useVector && (b = "vector_wms");
                            if (e) {
                                var S;
                                if (this.isTiled(f)) {
                                    S = u.getLayerUrl(f);
                                    if (S != undefined && S != "")
                                        f.isBaseLayer ? r[r.length] = {
                                            name: f.name,
                                            type: b,
                                            url: S,
                                            options: l
                                        } : i[i.length] = {
                                            name: f.name,
                                            type: b,
                                            url: S,
                                            options: l
                                        };
                                    else if (n(this._getScales(), this._getPrintScale())) {
                                        var x = f.grid[0][0]
                                          , T = [];
                                        T[0] = {
                                            url: f.getURL(x.bounds),
                                            x: 9e4,
                                            y: 9e4
                                        },
                                        l.resolutions = f.resolutions,
                                        l.maxExtent = this.toBbox(f.maxExtent),
                                        f.isBaseLayer ? r[r.length] = {
                                            name: f.name,
                                            type: "raster_tiled_wmsc",
                                            tiles: {
                                                tile: T
                                            },
                                            isForcedColorModel: f.report.isForcedColorModel,
                                            options: l
                                        } : i[i.length] = {
                                            name: f.name,
                                            type: "raster_tiled_wmsc",
                                            tiles: {
                                                tile: T
                                            },
                                            options: l
                                        }
                                    } else
                                        o[o.length] = f.name
                                } else
                                    S = u.getLayerUrl(f),
                                    f.isBaseLayer ? r[r.length] = {
                                        name: f.name,
                                        type: b,
                                        url: S,
                                        options: l
                                    } : i[i.length] = {
                                        name: f.name,
                                        type: b,
                                        url: S,
                                        options: l
                                    }
                            } else if (!this.isTiled(f))
                                S = u.getLayerUrl(f),
                                f.isBaseLayer ? r[r.length] = {
                                    name: f.name,
                                    type: b,
                                    url: S,
                                    options: l
                                } : i[i.length] = {
                                    name: f.name,
                                    type: b,
                                    url: S,
                                    options: l
                                };
                            else {
                                var T = [];
                                viewportBounds = this.map.getExtent();
                                var N;
                                e: for (var C = 0; C < f.grid.length; C++)
                                    for (var k = 0; k < f.grid[C].length; k++) {
                                        var x = f.grid[C][k];
                                        if (viewportBounds.intersectsBounds(x.bounds)) {
                                            var N = this.map.getPixelFromLonLat(new t.LonLat(x.bounds.left,x.bounds.top));
                                            N.x = N.x - x.position.x,
                                            N.y = N.y - x.position.y,
                                            T[0] = {
                                                url: f.getURL(x.bounds),
                                                x: x.position.x + N.x,
                                                y: x.position.y + N.y
                                            };
                                            break e
                                        }
                                    }
                                f.isBaseLayer ? r[r.length] = {
                                    name: f.name,
                                    type: "raster_tiled_wmsc",
                                    tiles: {
                                        tile: T
                                    },
                                    isForcedColorModel: f.report.isForcedColorModel,
                                    options: l
                                } : i[i.length] = {
                                    name: f.name,
                                    type: "raster_tiled_wmsc",
                                    tiles: {
                                        tile: T
                                    },
                                    options: l
                                }
                            }
                        }
                    }
                }
                if (o.length > 0) {
                    var L = "De volgende lagen zijn niet in de gevraagde schaal beschikbaar\n en worden niet afgedrukt:\n\n";
                    for (var C = 0; C < o.length; C++)
                        L += o[C] + "\n";
                    alert(L)
                }
                this._createReport(e, r, i)
            },
            _getPrintScale: function() {
                return this.wysiwyg ? this.map.getScale() : this.scale
            },
            _createReport: function(e, t, n) {
                var r = this.size
                  , i = this._getPrintScale()
                  , s = this.getPrintExtent()
                  , o = {};
                o.top = s.top,
                o.left = s.left,
                o.right = s.right,
                o.bottom = s.bottom,
                this.fixedSize ? this.reportapi.setMapOptions({
                    viewport: o,
                    height: r.height,
                    width: r.width,
                    scale: i
                }) : this.reportapi.setMapOptions({
                    viewport: o,
                    scale: i
                });
                var u = t.concat(n);
                for (var a = 0; a < u.length; a++) {
                    var f = u[a]
                      , l = f.options;
                    delete f.options;
                    switch (f.type) {
                    case "raster_wms":
                        this.reportapi.addRasterLayerWMS(f.url, f.name, l);
                        break;
                    case "vector_wms":
                        this.reportapi.addVectorLayerWMS(f.url, f.name, l);
                        break;
                    case "raster_tiled_wmsc":
                        this.reportapi.addRasterTiledLayerWMSC(f.tiles, f.name, f.isForcedColorModel, l);
                        break;
                    case "raster_tms":
                        this.reportapi.addRasterLayerTMS(f.tiles, f.name, f.isForcedColorModel, l);
                        break;
                    case "raster_wmts":
                        this.reportapi.addRasterLayerWMTS(f.tiles, f.name, f.isForcedColorModel, l);
                        break;
                    case "vector_gml":
                        this.reportapi.addFeatureLayerGML(f.features, f.style, f.name, l);
                        break;
                    case "vector_wkt":
                        this.reportapi.addFeatureLayerWKT(f.features, f.style, f.name, l);
                        break;
                    default:
                        alert("Unknown layer type : " + f.type + "for layer " + f.name + ".\n Layer cannot be printed and will be skipped.")
                    }
                }
            },
            _getScales: function() {
                var e;
                return this.map.baseLayer && (e = this.map.baseLayer.scales),
                e || this.map.scales
            },
            isTiled: function(e) {
                return (e.type == "WMST" || e.report.type == "WMSC" || e.type == "WMS-C" || e.report.type == "WMS-C" || e.isTiled != undefined && e.isTiled != 1) && e.singleTile != 1
            },
            toBbox: function(e) {
                return {
                    left: e.left,
                    right: e.right,
                    top: e.top,
                    bottom: e.bottom
                }
            },
            CLASS_NAME: "ReportOLControl"
        }),
        ReportOLControl
    }),
    define("OpenLayers", function() {
        return OpenLayers
    }),
    require("report/reportol")
})

