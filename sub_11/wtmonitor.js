!function(t) {
    var n = {};
    function e(r) {
        if (n[r])
            return n[r].exports;
        var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, e),
        i.l = !0,
        i.exports
    }
    e.m = t,
    e.c = n,
    e.d = function(t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, {
            enumerable: !0,
            get: r
        })
    }
    ,
    e.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    e.t = function(t, n) {
        if (1 & n && (t = e(t)),
        8 & n)
            return t;
        if (4 & n && "object" == typeof t && t && t.__esModule)
            return t;
        var r = Object.create(null);
        if (e.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }),
        2 & n && "string" != typeof t)
            for (var i in t)
                e.d(r, i, function(n) {
                    return t[n]
                }
                .bind(null, i));
        return r
    }
    ,
    e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return e.d(n, "a", n),
        n
    }
    ,
    e.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }
    ,
    e.p = "",
    e(e.s = 3)
}([function(t, n, e) {
    !function(t) {
        "use strict";
        var n = "4.1.0";
        function e(t, n) {
            return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
        }
        function r(t) {
            return 1 === t.length && (t = i(t)),
            {
                left: function(n, e, r, i) {
                    for (null == r && (r = 0),
                    null == i && (i = n.length); r < i; ) {
                        var o = r + i >>> 1;
                        t(n[o], e) < 0 ? r = o + 1 : i = o
                    }
                    return r
                },
                right: function(n, e, r, i) {
                    for (null == r && (r = 0),
                    null == i && (i = n.length); r < i; ) {
                        var o = r + i >>> 1;
                        t(n[o], e) > 0 ? i = o : r = o + 1
                    }
                    return r
                }
            }
        }
        function i(t) {
            return function(n, r) {
                return e(t(n), r)
            }
        }
        var o = r(e)
          , a = o.right
          , u = o.left;
        function c(t, n) {
            return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
        }
        function s(t) {
            return null === t ? NaN : +t
        }
        function l(t, n) {
            var e, r, i = t.length, o = 0, a = 0, u = -1, c = 0;
            if (null == n)
                for (; ++u < i; )
                    isNaN(e = s(t[u])) || (a += (r = e - o) * (e - (o += r / ++c)));
            else
                for (; ++u < i; )
                    isNaN(e = s(n(t[u], u, t))) || (a += (r = e - o) * (e - (o += r / ++c)));
            if (c > 1)
                return a / (c - 1)
        }
        function f(t, n) {
            var e = l(t, n);
            return e ? Math.sqrt(e) : e
        }
        function h(t, n) {
            var e, r, i, o = -1, a = t.length;
            if (null == n) {
                for (; ++o < a; )
                    if (null != (r = t[o]) && r >= r) {
                        e = i = r;
                        break
                    }
                for (; ++o < a; )
                    null != (r = t[o]) && (e > r && (e = r),
                    i < r && (i = r))
            } else {
                for (; ++o < a; )
                    if (null != (r = n(t[o], o, t)) && r >= r) {
                        e = i = r;
                        break
                    }
                for (; ++o < a; )
                    null != (r = n(t[o], o, t)) && (e > r && (e = r),
                    i < r && (i = r))
            }
            return [e, i]
        }
        var p = Array.prototype
          , d = p.slice
          , v = p.map;
        function g(t) {
            return function() {
                return t
            }
        }
        function y(t) {
            return t
        }
        function _(t, n, e) {
            t = +t,
            n = +n,
            e = (i = arguments.length) < 2 ? (n = t,
            t = 0,
            1) : i < 3 ? 1 : +e;
            for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i; )
                o[r] = t + r * e;
            return o
        }
        var m = Math.sqrt(50)
          , x = Math.sqrt(10)
          , b = Math.sqrt(2);
        function w(t, n, e) {
            var r = M(t, n, e);
            return _(Math.ceil(t / r) * r, Math.floor(n / r) * r + r / 2, r)
        }
        function M(t, n, e) {
            var r = Math.abs(n - t) / Math.max(0, e)
              , i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10))
              , o = r / i;
            return o >= m ? i *= 10 : o >= x ? i *= 5 : o >= b && (i *= 2),
            n < t ? -i : i
        }
        function k(t) {
            return Math.ceil(Math.log(t.length) / Math.LN2) + 1
        }
        function E() {
            var t = y
              , n = h
              , e = k;
            function r(r) {
                var i, o, u = r.length, c = new Array(u);
                for (i = 0; i < u; ++i)
                    c[i] = t(r[i], i, r);
                var s = n(c)
                  , l = s[0]
                  , f = s[1]
                  , h = e(c, l, f);
                Array.isArray(h) || (h = w(l, f, h));
                for (var p = h.length; h[0] <= l; )
                    h.shift(),
                    --p;
                for (; h[p - 1] >= f; )
                    h.pop(),
                    --p;
                var d, v = new Array(p + 1);
                for (i = 0; i <= p; ++i)
                    (d = v[i] = []).x0 = i > 0 ? h[i - 1] : l,
                    d.x1 = i < p ? h[i] : f;
                for (i = 0; i < u; ++i)
                    l <= (o = c[i]) && o <= f && v[a(h, o, 0, p)].push(r[i]);
                return v
            }
            return r.value = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : g(n),
                r) : t
            }
            ,
            r.domain = function(t) {
                return arguments.length ? (n = "function" == typeof t ? t : g([t[0], t[1]]),
                r) : n
            }
            ,
            r.thresholds = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? g(d.call(t)) : g(t),
                r) : e
            }
            ,
            r
        }
        function S(t, n, e) {
            if (null == e && (e = s),
            r = t.length) {
                if ((n = +n) <= 0 || r < 2)
                    return +e(t[0], 0, t);
                if (n >= 1)
                    return +e(t[r - 1], r - 1, t);
                var r, i = (r - 1) * n, o = Math.floor(i), a = +e(t[o], o, t);
                return a + (+e(t[o + 1], o + 1, t) - a) * (i - o)
            }
        }
        function A(t, n, r) {
            return t = v.call(t, s).sort(e),
            Math.ceil((r - n) / (2 * (S(t, .75) - S(t, .25)) * Math.pow(t.length, -1 / 3)))
        }
        function N(t, n, e) {
            return Math.ceil((e - n) / (3.5 * f(t) * Math.pow(t.length, -1 / 3)))
        }
        function T(t, n) {
            var e, r, i = -1, o = t.length;
            if (null == n) {
                for (; ++i < o; )
                    if (null != (r = t[i]) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = t[i]) && r > e && (e = r)
            } else {
                for (; ++i < o; )
                    if (null != (r = n(t[i], i, t)) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = n(t[i], i, t)) && r > e && (e = r)
            }
            return e
        }
        function C(t, n) {
            var e, r = 0, i = t.length, o = -1, a = i;
            if (null == n)
                for (; ++o < i; )
                    isNaN(e = s(t[o])) ? --a : r += e;
            else
                for (; ++o < i; )
                    isNaN(e = s(n(t[o], o, t))) ? --a : r += e;
            if (a)
                return r / a
        }
        function P(t, n) {
            var r, i = [], o = t.length, a = -1;
            if (null == n)
                for (; ++a < o; )
                    isNaN(r = s(t[a])) || i.push(r);
            else
                for (; ++a < o; )
                    isNaN(r = s(n(t[a], a, t))) || i.push(r);
            return S(i.sort(e), .5)
        }
        function z(t) {
            for (var n, e, r, i = t.length, o = -1, a = 0; ++o < i; )
                a += t[o].length;
            for (e = new Array(a); --i >= 0; )
                for (n = (r = t[i]).length; --n >= 0; )
                    e[--a] = r[n];
            return e
        }
        function L(t, n) {
            var e, r, i = -1, o = t.length;
            if (null == n) {
                for (; ++i < o; )
                    if (null != (r = t[i]) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = t[i]) && e > r && (e = r)
            } else {
                for (; ++i < o; )
                    if (null != (r = n(t[i], i, t)) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = n(t[i], i, t)) && e > r && (e = r)
            }
            return e
        }
        function R(t) {
            for (var n = 0, e = t.length - 1, r = t[0], i = new Array(e < 0 ? 0 : e); n < e; )
                i[n] = [r, r = t[++n]];
            return i
        }
        function q(t, n) {
            for (var e = n.length, r = new Array(e); e--; )
                r[e] = t[n[e]];
            return r
        }
        function O(t, n) {
            if (r = t.length) {
                var r, i, o = 0, a = 0, u = t[a];
                for (n || (n = e); ++o < r; )
                    (n(i = t[o], u) < 0 || 0 !== n(u, u)) && (u = i,
                    a = o);
                return 0 === n(u, u) ? a : void 0
            }
        }
        function D(t, n, e) {
            for (var r, i, o = (null == e ? t.length : e) - (n = null == n ? 0 : +n); o; )
                i = Math.random() * o-- | 0,
                r = t[o + n],
                t[o + n] = t[i + n],
                t[i + n] = r;
            return t
        }
        function U(t, n) {
            var e, r = 0, i = t.length, o = -1;
            if (null == n)
                for (; ++o < i; )
                    (e = +t[o]) && (r += e);
            else
                for (; ++o < i; )
                    (e = +n(t[o], o, t)) && (r += e);
            return r
        }
        function j(t) {
            if (!(i = t.length))
                return [];
            for (var n = -1, e = L(t, I), r = new Array(e); ++n < e; )
                for (var i, o = -1, a = r[n] = new Array(i); ++o < i; )
                    a[o] = t[o][n];
            return r
        }
        function I(t) {
            return t.length
        }
        function F() {
            return j(arguments)
        }
        var Y = "$";
        function B() {}
        function H(t, n) {
            var e = new B;
            if (t instanceof B)
                t.each((function(t, n) {
                    e.set(n, t)
                }
                ));
            else if (Array.isArray(t)) {
                var r, i = -1, o = t.length;
                if (null == n)
                    for (; ++i < o; )
                        e.set(i, t[i]);
                else
                    for (; ++i < o; )
                        e.set(n(r = t[i], i, t), r)
            } else if (t)
                for (var a in t)
                    e.set(a, t[a]);
            return e
        }
        function X() {
            var t, n, e, r = [], i = [];
            function o(e, i, a, u) {
                if (i >= r.length)
                    return null != n ? n(e) : null != t ? e.sort(t) : e;
                for (var c, s, l, f = -1, h = e.length, p = r[i++], d = H(), v = a(); ++f < h; )
                    (l = d.get(c = p(s = e[f]) + "")) ? l.push(s) : d.set(c, [s]);
                return d.each((function(t, n) {
                    u(v, n, o(t, i, a, u))
                }
                )),
                v
            }
            function a(t, e) {
                if (++e > r.length)
                    return t;
                var o, u = i[e - 1];
                return null != n && e >= r.length ? o = t.entries() : (o = [],
                t.each((function(t, n) {
                    o.push({
                        key: n,
                        values: a(t, e)
                    })
                }
                ))),
                null != u ? o.sort((function(t, n) {
                    return u(t.key, n.key)
                }
                )) : o
            }
            return e = {
                object: function(t) {
                    return o(t, 0, G, V)
                },
                map: function(t) {
                    return o(t, 0, W, $)
                },
                entries: function(t) {
                    return a(o(t, 0, W, $), 0)
                },
                key: function(t) {
                    return r.push(t),
                    e
                },
                sortKeys: function(t) {
                    return i[r.length - 1] = t,
                    e
                },
                sortValues: function(n) {
                    return t = n,
                    e
                },
                rollup: function(t) {
                    return n = t,
                    e
                }
            }
        }
        function G() {
            return {}
        }
        function V(t, n, e) {
            t[n] = e
        }
        function W() {
            return H()
        }
        function $(t, n, e) {
            t.set(n, e)
        }
        function Z() {}
        B.prototype = H.prototype = {
            constructor: B,
            has: function(t) {
                return Y + t in this
            },
            get: function(t) {
                return this[Y + t]
            },
            set: function(t, n) {
                return this[Y + t] = n,
                this
            },
            remove: function(t) {
                var n = Y + t;
                return n in this && delete this[n]
            },
            clear: function() {
                for (var t in this)
                    t[0] === Y && delete this[t]
            },
            keys: function() {
                var t = [];
                for (var n in this)
                    n[0] === Y && t.push(n.slice(1));
                return t
            },
            values: function() {
                var t = [];
                for (var n in this)
                    n[0] === Y && t.push(this[n]);
                return t
            },
            entries: function() {
                var t = [];
                for (var n in this)
                    n[0] === Y && t.push({
                        key: n.slice(1),
                        value: this[n]
                    });
                return t
            },
            size: function() {
                var t = 0;
                for (var n in this)
                    n[0] === Y && ++t;
                return t
            },
            empty: function() {
                for (var t in this)
                    if (t[0] === Y)
                        return !1;
                return !0
            },
            each: function(t) {
                for (var n in this)
                    n[0] === Y && t(this[n], n.slice(1), this)
            }
        };
        var J = H.prototype;
        function Q(t, n) {
            var e = new Z;
            if (t instanceof Z)
                t.each((function(t) {
                    e.add(t)
                }
                ));
            else if (t) {
                var r = -1
                  , i = t.length;
                if (null == n)
                    for (; ++r < i; )
                        e.add(t[r]);
                else
                    for (; ++r < i; )
                        e.add(n(t[r], r, t))
            }
            return e
        }
        function K(t) {
            var n = [];
            for (var e in t)
                n.push(e);
            return n
        }
        function tt(t) {
            var n = [];
            for (var e in t)
                n.push(t[e]);
            return n
        }
        function nt(t) {
            var n = [];
            for (var e in t)
                n.push({
                    key: e,
                    value: t[e]
                });
            return n
        }
        function et(t, n) {
            return t = null == t ? 0 : +t,
            n = null == n ? 1 : +n,
            1 === arguments.length ? (n = t,
            t = 0) : n -= t,
            function() {
                return Math.random() * n + t
            }
        }
        function rt(t, n) {
            var e, r;
            return t = null == t ? 0 : +t,
            n = null == n ? 1 : +n,
            function() {
                var i;
                if (null != e)
                    i = e,
                    e = null;
                else
                    do {
                        e = 2 * Math.random() - 1,
                        i = 2 * Math.random() - 1,
                        r = e * e + i * i
                    } while (!r || r > 1);
                return t + n * i * Math.sqrt(-2 * Math.log(r) / r)
            }
        }
        function it() {
            var t = rt.apply(this, arguments);
            return function() {
                return Math.exp(t())
            }
        }
        function ot(t) {
            return function() {
                for (var n = 0, e = 0; e < t; ++e)
                    n += Math.random();
                return n
            }
        }
        function at(t) {
            var n = ot(t);
            return function() {
                return n() / t
            }
        }
        function ut(t) {
            return function() {
                return -Math.log(1 - Math.random()) / t
            }
        }
        function ct(t) {
            return +t
        }
        function st(t) {
            return t * t
        }
        function lt(t) {
            return t * (2 - t)
        }
        function ft(t) {
            return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
        }
        function ht(t) {
            return t * t * t
        }
        function pt(t) {
            return --t * t * t + 1
        }
        function dt(t) {
            return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
        }
        Z.prototype = Q.prototype = {
            constructor: Z,
            has: J.has,
            add: function(t) {
                return this[Y + (t += "")] = t,
                this
            },
            remove: J.remove,
            clear: J.clear,
            values: J.keys,
            size: J.size,
            empty: J.empty,
            each: J.each
        };
        var vt = 3
          , gt = function t(n) {
            function e(t) {
                return Math.pow(t, n)
            }
            return n = +n,
            e.exponent = t,
            e
        }(vt)
          , yt = function t(n) {
            function e(t) {
                return 1 - Math.pow(1 - t, n)
            }
            return n = +n,
            e.exponent = t,
            e
        }(vt)
          , _t = function t(n) {
            function e(t) {
                return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2
            }
            return n = +n,
            e.exponent = t,
            e
        }(vt)
          , mt = Math.PI
          , xt = mt / 2;
        function bt(t) {
            return 1 - Math.cos(t * xt)
        }
        function wt(t) {
            return Math.sin(t * xt)
        }
        function Mt(t) {
            return (1 - Math.cos(mt * t)) / 2
        }
        function kt(t) {
            return Math.pow(2, 10 * t - 10)
        }
        function Et(t) {
            return 1 - Math.pow(2, -10 * t)
        }
        function St(t) {
            return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2
        }
        function At(t) {
            return 1 - Math.sqrt(1 - t * t)
        }
        function Nt(t) {
            return Math.sqrt(1 - --t * t)
        }
        function Tt(t) {
            return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
        }
        var Ct = 4 / 11
          , Pt = 6 / 11
          , zt = 8 / 11
          , Lt = 3 / 4
          , Rt = 9 / 11
          , qt = 10 / 11
          , Ot = 15 / 16
          , Dt = 21 / 22
          , Ut = 63 / 64
          , jt = 1 / Ct / Ct;
        function It(t) {
            return 1 - Ft(1 - t)
        }
        function Ft(t) {
            return (t = +t) < Ct ? jt * t * t : t < zt ? jt * (t -= Pt) * t + Lt : t < qt ? jt * (t -= Rt) * t + Ot : jt * (t -= Dt) * t + Ut
        }
        function Yt(t) {
            return ((t *= 2) <= 1 ? 1 - Ft(1 - t) : Ft(t - 1) + 1) / 2
        }
        var Bt = 1.70158
          , Ht = function t(n) {
            function e(t) {
                return t * t * ((n + 1) * t - n)
            }
            return n = +n,
            e.overshoot = t,
            e
        }(Bt)
          , Xt = function t(n) {
            function e(t) {
                return --t * t * ((n + 1) * t + n) + 1
            }
            return n = +n,
            e.overshoot = t,
            e
        }(Bt)
          , Gt = function t(n) {
            function e(t) {
                return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2
            }
            return n = +n,
            e.overshoot = t,
            e
        }(Bt)
          , Vt = 2 * Math.PI
          , Wt = 1
          , $t = .3
          , Zt = function t(n, e) {
            var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= Vt);
            function i(t) {
                return n * Math.pow(2, 10 * --t) * Math.sin((r - t) / e)
            }
            return i.amplitude = function(n) {
                return t(n, e * Vt)
            }
            ,
            i.period = function(e) {
                return t(n, e)
            }
            ,
            i
        }(Wt, $t)
          , Jt = function t(n, e) {
            var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= Vt);
            function i(t) {
                return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + r) / e)
            }
            return i.amplitude = function(n) {
                return t(n, e * Vt)
            }
            ,
            i.period = function(e) {
                return t(n, e)
            }
            ,
            i
        }(Wt, $t)
          , Qt = function t(n, e) {
            var r = Math.asin(1 / (n = Math.max(1, n))) * (e /= Vt);
            function i(t) {
                return ((t = 2 * t - 1) < 0 ? n * Math.pow(2, 10 * t) * Math.sin((r - t) / e) : 2 - n * Math.pow(2, -10 * t) * Math.sin((r + t) / e)) / 2
            }
            return i.amplitude = function(n) {
                return t(n, e * Vt)
            }
            ,
            i.period = function(e) {
                return t(n, e)
            }
            ,
            i
        }(Wt, $t);
        function Kt(t) {
            for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r; )
                n = i,
                i = t[e],
                o += n[1] * i[0] - n[0] * i[1];
            return o / 2
        }
        function tn(t) {
            for (var n, e, r = -1, i = t.length, o = 0, a = 0, u = t[i - 1], c = 0; ++r < i; )
                n = u,
                u = t[r],
                c += e = n[0] * u[1] - u[0] * n[1],
                o += (n[0] + u[0]) * e,
                a += (n[1] + u[1]) * e;
            return [o / (c *= 3), a / c]
        }
        function nn(t, n, e) {
            return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0])
        }
        function en(t, n) {
            return t[0] - n[0] || t[1] - n[1]
        }
        function rn(t) {
            for (var n = t.length, e = [0, 1], r = 2, i = 2; i < n; ++i) {
                for (; r > 1 && nn(t[e[r - 2]], t[e[r - 1]], t[i]) <= 0; )
                    --r;
                e[r++] = i
            }
            return e.slice(0, r)
        }
        function on(t) {
            if ((e = t.length) < 3)
                return null;
            var n, e, r = new Array(e), i = new Array(e);
            for (n = 0; n < e; ++n)
                r[n] = [+t[n][0], +t[n][1], n];
            for (r.sort(en),
            n = 0; n < e; ++n)
                i[n] = [r[n][0], -r[n][1]];
            var o = rn(r)
              , a = rn(i)
              , u = a[0] === o[0]
              , c = a[a.length - 1] === o[o.length - 1]
              , s = [];
            for (n = o.length - 1; n >= 0; --n)
                s.push(t[r[o[n]][2]]);
            for (n = +u; n < a.length - c; ++n)
                s.push(t[r[a[n]][2]]);
            return s
        }
        function an(t, n) {
            for (var e, r, i = t.length, o = t[i - 1], a = n[0], u = n[1], c = o[0], s = o[1], l = !1, f = 0; f < i; ++f)
                e = (o = t[f])[0],
                (r = o[1]) > u != s > u && a < (c - e) * (u - r) / (s - r) + e && (l = !l),
                c = e,
                s = r;
            return l
        }
        function un(t) {
            for (var n, e, r = -1, i = t.length, o = t[i - 1], a = o[0], u = o[1], c = 0; ++r < i; )
                n = a,
                e = u,
                n -= a = (o = t[r])[0],
                e -= u = o[1],
                c += Math.sqrt(n * n + e * e);
            return c
        }
        var cn = Math.PI
          , sn = 2 * cn
          , ln = 1e-6
          , fn = sn - ln;
        function hn() {
            this._x0 = this._y0 = this._x1 = this._y1 = null,
            this._ = []
        }
        function pn() {
            return new hn
        }
        function dn(t) {
            var n = +this._x.call(null, t)
              , e = +this._y.call(null, t);
            return vn(this.cover(n, e), n, e, t)
        }
        function vn(t, n, e, r) {
            if (isNaN(n) || isNaN(e))
                return t;
            var i, o, a, u, c, s, l, f, h, p = t._root, d = {
                data: r
            }, v = t._x0, g = t._y0, y = t._x1, _ = t._y1;
            if (!p)
                return t._root = d,
                t;
            for (; p.length; )
                if ((s = n >= (o = (v + y) / 2)) ? v = o : y = o,
                (l = e >= (a = (g + _) / 2)) ? g = a : _ = a,
                i = p,
                !(p = p[f = l << 1 | s]))
                    return i[f] = d,
                    t;
            if (u = +t._x.call(null, p.data),
            c = +t._y.call(null, p.data),
            n === u && e === c)
                return d.next = p,
                i ? i[f] = d : t._root = d,
                t;
            do {
                i = i ? i[f] = new Array(4) : t._root = new Array(4),
                (s = n >= (o = (v + y) / 2)) ? v = o : y = o,
                (l = e >= (a = (g + _) / 2)) ? g = a : _ = a
            } while ((f = l << 1 | s) == (h = (c >= a) << 1 | u >= o));
            return i[h] = p,
            i[f] = d,
            t
        }
        function gn(t) {
            var n, e, r, i, o = t.length, a = new Array(o), u = new Array(o), c = 1 / 0, s = 1 / 0, l = -1 / 0, f = -1 / 0;
            for (e = 0; e < o; ++e)
                isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (a[e] = r,
                u[e] = i,
                r < c && (c = r),
                r > l && (l = r),
                i < s && (s = i),
                i > f && (f = i));
            for (l < c && (c = this._x0,
            l = this._x1),
            f < s && (s = this._y0,
            f = this._y1),
            this.cover(c, s).cover(l, f),
            e = 0; e < o; ++e)
                vn(this, a[e], u[e], t[e]);
            return this
        }
        function yn(t, n) {
            if (isNaN(t = +t) || isNaN(n = +n))
                return this;
            var e = this._x0
              , r = this._y0
              , i = this._x1
              , o = this._y1;
            if (isNaN(e))
                i = (e = Math.floor(t)) + 1,
                o = (r = Math.floor(n)) + 1;
            else {
                if (!(e > t || t > i || r > n || n > o))
                    return this;
                var a, u, c = i - e, s = this._root;
                switch (u = (n < (r + o) / 2) << 1 | t < (e + i) / 2) {
                case 0:
                    do {
                        (a = new Array(4))[u] = s,
                        s = a
                    } while (o = r + (c *= 2),
                    t > (i = e + c) || n > o);
                    break;
                case 1:
                    do {
                        (a = new Array(4))[u] = s,
                        s = a
                    } while (o = r + (c *= 2),
                    (e = i - c) > t || n > o);
                    break;
                case 2:
                    do {
                        (a = new Array(4))[u] = s,
                        s = a
                    } while (r = o - (c *= 2),
                    t > (i = e + c) || r > n);
                    break;
                case 3:
                    do {
                        (a = new Array(4))[u] = s,
                        s = a
                    } while (r = o - (c *= 2),
                    (e = i - c) > t || r > n)
                }
                this._root && this._root.length && (this._root = s)
            }
            return this._x0 = e,
            this._y0 = r,
            this._x1 = i,
            this._y1 = o,
            this
        }
        function _n() {
            var t = [];
            return this.visit((function(n) {
                if (!n.length)
                    do {
                        t.push(n.data)
                    } while (n = n.next)
            }
            )),
            t
        }
        function mn(t) {
            return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]
        }
        function xn(t, n, e, r, i) {
            this.node = t,
            this.x0 = n,
            this.y0 = e,
            this.x1 = r,
            this.y1 = i
        }
        function bn(t, n, e) {
            var r, i, o, a, u, c, s, l = this._x0, f = this._y0, h = this._x1, p = this._y1, d = [], v = this._root;
            for (v && d.push(new xn(v,l,f,h,p)),
            null == e ? e = 1 / 0 : (l = t - e,
            f = n - e,
            h = t + e,
            p = n + e,
            e *= e); c = d.pop(); )
                if (!(!(v = c.node) || (i = c.x0) > h || (o = c.y0) > p || (a = c.x1) < l || (u = c.y1) < f))
                    if (v.length) {
                        var g = (i + a) / 2
                          , y = (o + u) / 2;
                        d.push(new xn(v[3],g,y,a,u), new xn(v[2],i,y,g,u), new xn(v[1],g,o,a,y), new xn(v[0],i,o,g,y)),
                        (s = (n >= y) << 1 | t >= g) && (c = d[d.length - 1],
                        d[d.length - 1] = d[d.length - 1 - s],
                        d[d.length - 1 - s] = c)
                    } else {
                        var _ = t - +this._x.call(null, v.data)
                          , m = n - +this._y.call(null, v.data)
                          , x = _ * _ + m * m;
                        if (x < e) {
                            var b = Math.sqrt(e = x);
                            l = t - b,
                            f = n - b,
                            h = t + b,
                            p = n + b,
                            r = v.data
                        }
                    }
            return r
        }
        function wn(t) {
            if (isNaN(o = +this._x.call(null, t)) || isNaN(a = +this._y.call(null, t)))
                return this;
            var n, e, r, i, o, a, u, c, s, l, f, h, p = this._root, d = this._x0, v = this._y0, g = this._x1, y = this._y1;
            if (!p)
                return this;
            if (p.length)
                for (; ; ) {
                    if ((s = o >= (u = (d + g) / 2)) ? d = u : g = u,
                    (l = a >= (c = (v + y) / 2)) ? v = c : y = c,
                    n = p,
                    !(p = p[f = l << 1 | s]))
                        return this;
                    if (!p.length)
                        break;
                    (n[f + 1 & 3] || n[f + 2 & 3] || n[f + 3 & 3]) && (e = n,
                    h = f)
                }
            for (; p.data !== t; )
                if (r = p,
                !(p = p.next))
                    return this;
            return (i = p.next) && delete p.next,
            r ? (i ? r.next = i : delete r.next,
            this) : n ? (i ? n[f] = i : delete n[f],
            (p = n[0] || n[1] || n[2] || n[3]) && p === (n[3] || n[2] || n[1] || n[0]) && !p.length && (e ? e[h] = p : this._root = p),
            this) : (this._root = i,
            this)
        }
        function Mn(t) {
            for (var n = 0, e = t.length; n < e; ++n)
                this.remove(t[n]);
            return this
        }
        function kn() {
            return this._root
        }
        function En() {
            var t = 0;
            return this.visit((function(n) {
                if (!n.length)
                    do {
                        ++t
                    } while (n = n.next)
            }
            )),
            t
        }
        function Sn(t) {
            var n, e, r, i, o, a, u = [], c = this._root;
            for (c && u.push(new xn(c,this._x0,this._y0,this._x1,this._y1)); n = u.pop(); )
                if (!t(c = n.node, r = n.x0, i = n.y0, o = n.x1, a = n.y1) && c.length) {
                    var s = (r + o) / 2
                      , l = (i + a) / 2;
                    (e = c[3]) && u.push(new xn(e,s,l,o,a)),
                    (e = c[2]) && u.push(new xn(e,r,l,s,a)),
                    (e = c[1]) && u.push(new xn(e,s,i,o,l)),
                    (e = c[0]) && u.push(new xn(e,r,i,s,l))
                }
            return this
        }
        function An(t) {
            var n, e = [], r = [];
            for (this._root && e.push(new xn(this._root,this._x0,this._y0,this._x1,this._y1)); n = e.pop(); ) {
                var i = n.node;
                if (i.length) {
                    var o, a = n.x0, u = n.y0, c = n.x1, s = n.y1, l = (a + c) / 2, f = (u + s) / 2;
                    (o = i[0]) && e.push(new xn(o,a,u,l,f)),
                    (o = i[1]) && e.push(new xn(o,l,u,c,f)),
                    (o = i[2]) && e.push(new xn(o,a,f,l,s)),
                    (o = i[3]) && e.push(new xn(o,l,f,c,s))
                }
                r.push(n)
            }
            for (; n = r.pop(); )
                t(n.node, n.x0, n.y0, n.x1, n.y1);
            return this
        }
        function Nn(t) {
            return t[0]
        }
        function Tn(t) {
            return arguments.length ? (this._x = t,
            this) : this._x
        }
        function Cn(t) {
            return t[1]
        }
        function Pn(t) {
            return arguments.length ? (this._y = t,
            this) : this._y
        }
        function zn(t, n, e) {
            var r = new Ln(null == n ? Nn : n,null == e ? Cn : e,NaN,NaN,NaN,NaN);
            return null == t ? r : r.addAll(t)
        }
        function Ln(t, n, e, r, i, o) {
            this._x = t,
            this._y = n,
            this._x0 = e,
            this._y0 = r,
            this._x1 = i,
            this._y1 = o,
            this._root = void 0
        }
        function Rn(t) {
            for (var n = {
                data: t.data
            }, e = n; t = t.next; )
                e = e.next = {
                    data: t.data
                };
            return n
        }
        hn.prototype = pn.prototype = {
            constructor: hn,
            moveTo: function(t, n) {
                this._.push("M", this._x0 = this._x1 = +t, ",", this._y0 = this._y1 = +n)
            },
            closePath: function() {
                null !== this._x1 && (this._x1 = this._x0,
                this._y1 = this._y0,
                this._.push("Z"))
            },
            lineTo: function(t, n) {
                this._.push("L", this._x1 = +t, ",", this._y1 = +n)
            },
            quadraticCurveTo: function(t, n, e, r) {
                this._.push("Q", +t, ",", +n, ",", this._x1 = +e, ",", this._y1 = +r)
            },
            bezierCurveTo: function(t, n, e, r, i, o) {
                this._.push("C", +t, ",", +n, ",", +e, ",", +r, ",", this._x1 = +i, ",", this._y1 = +o)
            },
            arcTo: function(t, n, e, r, i) {
                t = +t,
                n = +n,
                e = +e,
                r = +r,
                i = +i;
                var o = this._x1
                  , a = this._y1
                  , u = e - t
                  , c = r - n
                  , s = o - t
                  , l = a - n
                  , f = s * s + l * l;
                if (i < 0)
                    throw new Error("negative radius: " + i);
                if (null === this._x1)
                    this._.push("M", this._x1 = t, ",", this._y1 = n);
                else if (f > ln)
                    if (Math.abs(l * u - c * s) > ln && i) {
                        var h = e - o
                          , p = r - a
                          , d = u * u + c * c
                          , v = h * h + p * p
                          , g = Math.sqrt(d)
                          , y = Math.sqrt(f)
                          , _ = i * Math.tan((cn - Math.acos((d + f - v) / (2 * g * y))) / 2)
                          , m = _ / y
                          , x = _ / g;
                        Math.abs(m - 1) > ln && this._.push("L", t + m * s, ",", n + m * l),
                        this._.push("A", i, ",", i, ",0,0,", +(l * h > s * p), ",", this._x1 = t + x * u, ",", this._y1 = n + x * c)
                    } else
                        this._.push("L", this._x1 = t, ",", this._y1 = n)
            },
            arc: function(t, n, e, r, i, o) {
                t = +t,
                n = +n;
                var a = (e = +e) * Math.cos(r)
                  , u = e * Math.sin(r)
                  , c = t + a
                  , s = n + u
                  , l = 1 ^ o
                  , f = o ? r - i : i - r;
                if (e < 0)
                    throw new Error("negative radius: " + e);
                null === this._x1 ? this._.push("M", c, ",", s) : (Math.abs(this._x1 - c) > ln || Math.abs(this._y1 - s) > ln) && this._.push("L", c, ",", s),
                e && (f > fn ? this._.push("A", e, ",", e, ",0,1,", l, ",", t - a, ",", n - u, "A", e, ",", e, ",0,1,", l, ",", this._x1 = c, ",", this._y1 = s) : (f < 0 && (f = f % sn + sn),
                this._.push("A", e, ",", e, ",0,", +(f >= cn), ",", l, ",", this._x1 = t + e * Math.cos(i), ",", this._y1 = n + e * Math.sin(i))))
            },
            rect: function(t, n, e, r) {
                this._.push("M", this._x0 = this._x1 = +t, ",", this._y0 = this._y1 = +n, "h", +e, "v", +r, "h", -e, "Z")
            },
            toString: function() {
                return this._.join("")
            }
        };
        var qn = zn.prototype = Ln.prototype;
        qn.copy = function() {
            var t, n, e = new Ln(this._x,this._y,this._x0,this._y0,this._x1,this._y1), r = this._root;
            if (!r)
                return e;
            if (!r.length)
                return e._root = Rn(r),
                e;
            for (t = [{
                source: r,
                target: e._root = new Array(4)
            }]; r = t.pop(); )
                for (var i = 0; i < 4; ++i)
                    (n = r.source[i]) && (n.length ? t.push({
                        source: n,
                        target: r.target[i] = new Array(4)
                    }) : r.target[i] = Rn(n));
            return e
        }
        ,
        qn.add = dn,
        qn.addAll = gn,
        qn.cover = yn,
        qn.data = _n,
        qn.extent = mn,
        qn.find = bn,
        qn.remove = wn,
        qn.removeAll = Mn,
        qn.root = kn,
        qn.size = En,
        qn.visit = Sn,
        qn.visitAfter = An,
        qn.x = Tn,
        qn.y = Pn;
        var On = [].slice
          , Dn = {};
        function Un(t) {
            if (!(t >= 1))
                throw new Error;
            this._size = t,
            this._call = this._error = null,
            this._tasks = [],
            this._data = [],
            this._waiting = this._active = this._ended = this._start = 0
        }
        function jn(t) {
            if (!t._start)
                try {
                    In(t)
                } catch (n) {
                    t._tasks[t._ended + t._active - 1] && Yn(t, n)
                }
        }
        function In(t) {
            for (; t._start = t._waiting && t._active < t._size; ) {
                var n = t._ended + t._active
                  , e = t._tasks[n]
                  , r = e.length - 1
                  , i = e[r];
                e[r] = Fn(t, n),
                --t._waiting,
                ++t._active,
                e = i.apply(null, e),
                t._tasks[n] && (t._tasks[n] = e || Dn)
            }
        }
        function Fn(t, n) {
            return function(e, r) {
                t._tasks[n] && (--t._active,
                ++t._ended,
                t._tasks[n] = null,
                null == t._error && (null != e ? Yn(t, e) : (t._data[n] = r,
                t._waiting ? jn(t) : Bn(t))))
            }
        }
        function Yn(t, n) {
            var e, r = t._tasks.length;
            for (t._error = n,
            t._data = void 0,
            t._waiting = NaN; --r >= 0; )
                if ((e = t._tasks[r]) && (t._tasks[r] = null,
                e.abort))
                    try {
                        e.abort()
                    } catch (n) {}
            t._active = NaN,
            Bn(t)
        }
        function Bn(t) {
            !t._active && t._call && t._call(t._error, t._data)
        }
        function Hn(t) {
            return new Un(arguments.length ? +t : 1 / 0)
        }
        function Xn(t) {
            return function() {
                return t
            }
        }
        Un.prototype = Hn.prototype = {
            constructor: Un,
            defer: function(t) {
                if ("function" != typeof t || this._call)
                    throw new Error;
                if (null != this._error)
                    return this;
                var n = On.call(arguments, 1);
                return n.push(t),
                ++this._waiting,
                this._tasks.push(n),
                jn(this),
                this
            },
            abort: function() {
                return null == this._error && Yn(this, new Error("abort")),
                this
            },
            await: function(t) {
                if ("function" != typeof t || this._call)
                    throw new Error;
                return this._call = function(n, e) {
                    t.apply(null, [n].concat(e))
                }
                ,
                Bn(this),
                this
            },
            awaitAll: function(t) {
                if ("function" != typeof t || this._call)
                    throw new Error;
                return this._call = t,
                Bn(this),
                this
            }
        };
        var Gn = 1e-12
          , Vn = Math.PI
          , Wn = Vn / 2
          , $n = 2 * Vn;
        function Zn(t) {
            return t.innerRadius
        }
        function Jn(t) {
            return t.outerRadius
        }
        function Qn(t) {
            return t.startAngle
        }
        function Kn(t) {
            return t.endAngle
        }
        function te(t) {
            return t && t.padAngle
        }
        function ne(t) {
            return t >= 1 ? Wn : t <= -1 ? -Wn : Math.asin(t)
        }
        function ee(t, n, e, r, i, o, a, u) {
            var c = e - t
              , s = r - n
              , l = a - i
              , f = u - o
              , h = (l * (n - o) - f * (t - i)) / (f * c - l * s);
            return [t + h * c, n + h * s]
        }
        function re(t, n, e, r, i, o, a) {
            var u = t - e
              , c = n - r
              , s = (a ? o : -o) / Math.sqrt(u * u + c * c)
              , l = s * c
              , f = -s * u
              , h = t + l
              , p = n + f
              , d = e + l
              , v = r + f
              , g = (h + d) / 2
              , y = (p + v) / 2
              , _ = d - h
              , m = v - p
              , x = _ * _ + m * m
              , b = i - o
              , w = h * v - d * p
              , M = (m < 0 ? -1 : 1) * Math.sqrt(Math.max(0, b * b * x - w * w))
              , k = (w * m - _ * M) / x
              , E = (-w * _ - m * M) / x
              , S = (w * m + _ * M) / x
              , A = (-w * _ + m * M) / x
              , N = k - g
              , T = E - y
              , C = S - g
              , P = A - y;
            return N * N + T * T > C * C + P * P && (k = S,
            E = A),
            {
                cx: k,
                cy: E,
                x01: -l,
                y01: -f,
                x11: k * (i / b - 1),
                y11: E * (i / b - 1)
            }
        }
        function ie() {
            var t = Zn
              , n = Jn
              , e = Xn(0)
              , r = null
              , i = Qn
              , o = Kn
              , a = te
              , u = null;
            function c() {
                var c, s, l = +t.apply(this, arguments), f = +n.apply(this, arguments), h = i.apply(this, arguments) - Wn, p = o.apply(this, arguments) - Wn, d = Math.abs(p - h), v = p > h;
                if (u || (u = c = pn()),
                f < l && (s = f,
                f = l,
                l = s),
                f > Gn)
                    if (d > $n - Gn)
                        u.moveTo(f * Math.cos(h), f * Math.sin(h)),
                        u.arc(0, 0, f, h, p, !v),
                        l > Gn && (u.moveTo(l * Math.cos(p), l * Math.sin(p)),
                        u.arc(0, 0, l, p, h, v));
                    else {
                        var g, y, _ = h, m = p, x = h, b = p, w = d, M = d, k = a.apply(this, arguments) / 2, E = k > Gn && (r ? +r.apply(this, arguments) : Math.sqrt(l * l + f * f)), S = Math.min(Math.abs(f - l) / 2, +e.apply(this, arguments)), A = S, N = S;
                        if (E > Gn) {
                            var T = ne(E / l * Math.sin(k))
                              , C = ne(E / f * Math.sin(k));
                            (w -= 2 * T) > Gn ? (x += T *= v ? 1 : -1,
                            b -= T) : (w = 0,
                            x = b = (h + p) / 2),
                            (M -= 2 * C) > Gn ? (_ += C *= v ? 1 : -1,
                            m -= C) : (M = 0,
                            _ = m = (h + p) / 2)
                        }
                        var P = f * Math.cos(_)
                          , z = f * Math.sin(_)
                          , L = l * Math.cos(b)
                          , R = l * Math.sin(b);
                        if (S > Gn) {
                            var q = f * Math.cos(m)
                              , O = f * Math.sin(m)
                              , D = l * Math.cos(x)
                              , U = l * Math.sin(x);
                            if (d < Vn) {
                                var j = w > Gn ? ee(P, z, D, U, q, O, L, R) : [L, R]
                                  , I = P - j[0]
                                  , F = z - j[1]
                                  , Y = q - j[0]
                                  , B = O - j[1]
                                  , H = 1 / Math.sin(Math.acos((I * Y + F * B) / (Math.sqrt(I * I + F * F) * Math.sqrt(Y * Y + B * B))) / 2)
                                  , X = Math.sqrt(j[0] * j[0] + j[1] * j[1]);
                                A = Math.min(S, (l - X) / (H - 1)),
                                N = Math.min(S, (f - X) / (H + 1))
                            }
                        }
                        M > Gn ? N > Gn ? (g = re(D, U, P, z, f, N, v),
                        y = re(q, O, L, R, f, N, v),
                        u.moveTo(g.cx + g.x01, g.cy + g.y01),
                        N < S ? u.arc(g.cx, g.cy, N, Math.atan2(g.y01, g.x01), Math.atan2(y.y01, y.x01), !v) : (u.arc(g.cx, g.cy, N, Math.atan2(g.y01, g.x01), Math.atan2(g.y11, g.x11), !v),
                        u.arc(0, 0, f, Math.atan2(g.cy + g.y11, g.cx + g.x11), Math.atan2(y.cy + y.y11, y.cx + y.x11), !v),
                        u.arc(y.cx, y.cy, N, Math.atan2(y.y11, y.x11), Math.atan2(y.y01, y.x01), !v))) : (u.moveTo(P, z),
                        u.arc(0, 0, f, _, m, !v)) : u.moveTo(P, z),
                        l > Gn && w > Gn ? A > Gn ? (g = re(L, R, q, O, l, -A, v),
                        y = re(P, z, D, U, l, -A, v),
                        u.lineTo(g.cx + g.x01, g.cy + g.y01),
                        A < S ? u.arc(g.cx, g.cy, A, Math.atan2(g.y01, g.x01), Math.atan2(y.y01, y.x01), !v) : (u.arc(g.cx, g.cy, A, Math.atan2(g.y01, g.x01), Math.atan2(g.y11, g.x11), !v),
                        u.arc(0, 0, l, Math.atan2(g.cy + g.y11, g.cx + g.x11), Math.atan2(y.cy + y.y11, y.cx + y.x11), v),
                        u.arc(y.cx, y.cy, A, Math.atan2(y.y11, y.x11), Math.atan2(y.y01, y.x01), !v))) : u.arc(0, 0, l, b, x, v) : u.lineTo(L, R)
                    }
                else
                    u.moveTo(0, 0);
                if (u.closePath(),
                c)
                    return u = null,
                    c + "" || null
            }
            return c.centroid = function() {
                var e = (+t.apply(this, arguments) + +n.apply(this, arguments)) / 2
                  , r = (+i.apply(this, arguments) + +o.apply(this, arguments)) / 2 - Vn / 2;
                return [Math.cos(r) * e, Math.sin(r) * e]
            }
            ,
            c.innerRadius = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : Xn(+n),
                c) : t
            }
            ,
            c.outerRadius = function(t) {
                return arguments.length ? (n = "function" == typeof t ? t : Xn(+t),
                c) : n
            }
            ,
            c.cornerRadius = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Xn(+t),
                c) : e
            }
            ,
            c.padRadius = function(t) {
                return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : Xn(+t),
                c) : r
            }
            ,
            c.startAngle = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : Xn(+t),
                c) : i
            }
            ,
            c.endAngle = function(t) {
                return arguments.length ? (o = "function" == typeof t ? t : Xn(+t),
                c) : o
            }
            ,
            c.padAngle = function(t) {
                return arguments.length ? (a = "function" == typeof t ? t : Xn(+t),
                c) : a
            }
            ,
            c.context = function(t) {
                return arguments.length ? (u = null == t ? null : t,
                c) : u
            }
            ,
            c
        }
        function oe(t) {
            this._context = t
        }
        function ae(t) {
            return new oe(t)
        }
        function ue(t) {
            return t[0]
        }
        function ce(t) {
            return t[1]
        }
        function se() {
            var t = ue
              , n = ce
              , e = Xn(!0)
              , r = null
              , i = ae
              , o = null;
            function a(a) {
                var u, c, s, l = a.length, f = !1;
                for (null == r && (o = i(s = pn())),
                u = 0; u <= l; ++u)
                    !(u < l && e(c = a[u], u, a)) === f && ((f = !f) ? o.lineStart() : o.lineEnd()),
                    f && o.point(+t(c, u, a), +n(c, u, a));
                if (s)
                    return o = null,
                    s + "" || null
            }
            return a.x = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : Xn(+n),
                a) : t
            }
            ,
            a.y = function(t) {
                return arguments.length ? (n = "function" == typeof t ? t : Xn(+t),
                a) : n
            }
            ,
            a.defined = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Xn(!!t),
                a) : e
            }
            ,
            a.curve = function(t) {
                return arguments.length ? (i = t,
                null != r && (o = i(r)),
                a) : i
            }
            ,
            a.context = function(t) {
                return arguments.length ? (null == t ? r = o = null : o = i(r = t),
                a) : r
            }
            ,
            a
        }
        function le() {
            var t = ue
              , n = null
              , e = Xn(0)
              , r = ce
              , i = Xn(!0)
              , o = null
              , a = ae
              , u = null;
            function c(c) {
                var s, l, f, h, p, d = c.length, v = !1, g = new Array(d), y = new Array(d);
                for (null == o && (u = a(p = pn())),
                s = 0; s <= d; ++s) {
                    if (!(s < d && i(h = c[s], s, c)) === v)
                        if (v = !v)
                            l = s,
                            u.areaStart(),
                            u.lineStart();
                        else {
                            for (u.lineEnd(),
                            u.lineStart(),
                            f = s - 1; f >= l; --f)
                                u.point(g[f], y[f]);
                            u.lineEnd(),
                            u.areaEnd()
                        }
                    v && (g[s] = +t(h, s, c),
                    y[s] = +e(h, s, c),
                    u.point(n ? +n(h, s, c) : g[s], r ? +r(h, s, c) : y[s]))
                }
                if (p)
                    return u = null,
                    p + "" || null
            }
            function s() {
                return se().defined(i).curve(a).context(o)
            }
            return c.x = function(e) {
                return arguments.length ? (t = "function" == typeof e ? e : Xn(+e),
                n = null,
                c) : t
            }
            ,
            c.x0 = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : Xn(+n),
                c) : t
            }
            ,
            c.x1 = function(t) {
                return arguments.length ? (n = null == t ? null : "function" == typeof t ? t : Xn(+t),
                c) : n
            }
            ,
            c.y = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Xn(+t),
                r = null,
                c) : e
            }
            ,
            c.y0 = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Xn(+t),
                c) : e
            }
            ,
            c.y1 = function(t) {
                return arguments.length ? (r = null == t ? null : "function" == typeof t ? t : Xn(+t),
                c) : r
            }
            ,
            c.lineX0 = c.lineY0 = function() {
                return s().x(t).y(e)
            }
            ,
            c.lineY1 = function() {
                return s().x(t).y(r)
            }
            ,
            c.lineX1 = function() {
                return s().x(n).y(e)
            }
            ,
            c.defined = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : Xn(!!t),
                c) : i
            }
            ,
            c.curve = function(t) {
                return arguments.length ? (a = t,
                null != o && (u = a(o)),
                c) : a
            }
            ,
            c.context = function(t) {
                return arguments.length ? (null == t ? o = u = null : u = a(o = t),
                c) : o
            }
            ,
            c
        }
        function fe(t, n) {
            return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
        }
        function he(t) {
            return t
        }
        function pe() {
            var t = he
              , n = fe
              , e = null
              , r = Xn(0)
              , i = Xn($n)
              , o = Xn(0);
            function a(a) {
                var u, c, s, l, f, h = a.length, p = 0, d = new Array(h), v = new Array(h), g = +r.apply(this, arguments), y = Math.min($n, Math.max(-$n, i.apply(this, arguments) - g)), _ = Math.min(Math.abs(y) / h, o.apply(this, arguments)), m = _ * (y < 0 ? -1 : 1);
                for (u = 0; u < h; ++u)
                    (f = v[d[u] = u] = +t(a[u], u, a)) > 0 && (p += f);
                for (null != n ? d.sort((function(t, e) {
                    return n(v[t], v[e])
                }
                )) : null != e && d.sort((function(t, n) {
                    return e(a[t], a[n])
                }
                )),
                u = 0,
                s = p ? (y - h * m) / p : 0; u < h; ++u,
                g = l)
                    c = d[u],
                    l = g + ((f = v[c]) > 0 ? f * s : 0) + m,
                    v[c] = {
                        data: a[c],
                        index: u,
                        value: f,
                        startAngle: g,
                        endAngle: l,
                        padAngle: _
                    };
                return v
            }
            return a.value = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : Xn(+n),
                a) : t
            }
            ,
            a.sortValues = function(t) {
                return arguments.length ? (n = t,
                e = null,
                a) : n
            }
            ,
            a.sort = function(t) {
                return arguments.length ? (e = t,
                n = null,
                a) : e
            }
            ,
            a.startAngle = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : Xn(+t),
                a) : r
            }
            ,
            a.endAngle = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : Xn(+t),
                a) : i
            }
            ,
            a.padAngle = function(t) {
                return arguments.length ? (o = "function" == typeof t ? t : Xn(+t),
                a) : o
            }
            ,
            a
        }
        oe.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._point = 0
            },
            lineEnd: function() {
                (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1,
                    this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                    break;
                case 1:
                    this._point = 2;
                default:
                    this._context.lineTo(t, n)
                }
            }
        };
        var de = ge(ae);
        function ve(t) {
            this._curve = t
        }
        function ge(t) {
            function n(n) {
                return new ve(t(n))
            }
            return n._curve = t,
            n
        }
        function ye(t) {
            var n = t.curve;
            return t.angle = t.x,
            delete t.x,
            t.radius = t.y,
            delete t.y,
            t.curve = function(t) {
                return arguments.length ? n(ge(t)) : n()._curve
            }
            ,
            t
        }
        function _e() {
            return ye(se().curve(de))
        }
        function me() {
            var t = le().curve(de)
              , n = t.curve
              , e = t.lineX0
              , r = t.lineX1
              , i = t.lineY0
              , o = t.lineY1;
            return t.angle = t.x,
            delete t.x,
            t.startAngle = t.x0,
            delete t.x0,
            t.endAngle = t.x1,
            delete t.x1,
            t.radius = t.y,
            delete t.y,
            t.innerRadius = t.y0,
            delete t.y0,
            t.outerRadius = t.y1,
            delete t.y1,
            t.lineStartAngle = function() {
                return ye(e())
            }
            ,
            delete t.lineX0,
            t.lineEndAngle = function() {
                return ye(r())
            }
            ,
            delete t.lineX1,
            t.lineInnerRadius = function() {
                return ye(i())
            }
            ,
            delete t.lineY0,
            t.lineOuterRadius = function() {
                return ye(o())
            }
            ,
            delete t.lineY1,
            t.curve = function(t) {
                return arguments.length ? n(ge(t)) : n()._curve
            }
            ,
            t
        }
        ve.prototype = {
            areaStart: function() {
                this._curve.areaStart()
            },
            areaEnd: function() {
                this._curve.areaEnd()
            },
            lineStart: function() {
                this._curve.lineStart()
            },
            lineEnd: function() {
                this._curve.lineEnd()
            },
            point: function(t, n) {
                this._curve.point(n * Math.sin(t), n * -Math.cos(t))
            }
        };
        var xe = {
            draw: function(t, n) {
                var e = Math.sqrt(n / Vn);
                t.moveTo(e, 0),
                t.arc(0, 0, e, 0, $n)
            }
        }
          , be = {
            draw: function(t, n) {
                var e = Math.sqrt(n / 5) / 2;
                t.moveTo(-3 * e, -e),
                t.lineTo(-e, -e),
                t.lineTo(-e, -3 * e),
                t.lineTo(e, -3 * e),
                t.lineTo(e, -e),
                t.lineTo(3 * e, -e),
                t.lineTo(3 * e, e),
                t.lineTo(e, e),
                t.lineTo(e, 3 * e),
                t.lineTo(-e, 3 * e),
                t.lineTo(-e, e),
                t.lineTo(-3 * e, e),
                t.closePath()
            }
        }
          , we = Math.sqrt(1 / 3)
          , Me = 2 * we
          , ke = {
            draw: function(t, n) {
                var e = Math.sqrt(n / Me)
                  , r = e * we;
                t.moveTo(0, -e),
                t.lineTo(r, 0),
                t.lineTo(0, e),
                t.lineTo(-r, 0),
                t.closePath()
            }
        }
          , Ee = .8908130915292852
          , Se = Math.sin(Vn / 10) / Math.sin(7 * Vn / 10)
          , Ae = Math.sin($n / 10) * Se
          , Ne = -Math.cos($n / 10) * Se
          , Te = {
            draw: function(t, n) {
                var e = Math.sqrt(n * Ee)
                  , r = Ae * e
                  , i = Ne * e;
                t.moveTo(0, -e),
                t.lineTo(r, i);
                for (var o = 1; o < 5; ++o) {
                    var a = $n * o / 5
                      , u = Math.cos(a)
                      , c = Math.sin(a);
                    t.lineTo(c * e, -u * e),
                    t.lineTo(u * r - c * i, c * r + u * i)
                }
                t.closePath()
            }
        }
          , Ce = {
            draw: function(t, n) {
                var e = Math.sqrt(n)
                  , r = -e / 2;
                t.rect(r, r, e, e)
            }
        }
          , Pe = Math.sqrt(3)
          , ze = {
            draw: function(t, n) {
                var e = -Math.sqrt(n / (3 * Pe));
                t.moveTo(0, 2 * e),
                t.lineTo(-Pe * e, -e),
                t.lineTo(Pe * e, -e),
                t.closePath()
            }
        }
          , Le = -.5
          , Re = Math.sqrt(3) / 2
          , qe = 1 / Math.sqrt(12)
          , Oe = 3 * (qe / 2 + 1)
          , De = {
            draw: function(t, n) {
                var e = Math.sqrt(n / Oe)
                  , r = e / 2
                  , i = e * qe
                  , o = r
                  , a = e * qe + e
                  , u = -o
                  , c = a;
                t.moveTo(r, i),
                t.lineTo(o, a),
                t.lineTo(u, c),
                t.lineTo(Le * r - Re * i, Re * r + Le * i),
                t.lineTo(Le * o - Re * a, Re * o + Le * a),
                t.lineTo(Le * u - Re * c, Re * u + Le * c),
                t.lineTo(Le * r + Re * i, Le * i - Re * r),
                t.lineTo(Le * o + Re * a, Le * a - Re * o),
                t.lineTo(Le * u + Re * c, Le * c - Re * u),
                t.closePath()
            }
        }
          , Ue = [xe, be, ke, Ce, Te, ze, De];
        function je() {
            var t = Xn(xe)
              , n = Xn(64)
              , e = null;
            function r() {
                var r;
                if (e || (e = r = pn()),
                t.apply(this, arguments).draw(e, +n.apply(this, arguments)),
                r)
                    return e = null,
                    r + "" || null
            }
            return r.type = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : Xn(n),
                r) : t
            }
            ,
            r.size = function(t) {
                return arguments.length ? (n = "function" == typeof t ? t : Xn(+t),
                r) : n
            }
            ,
            r.context = function(t) {
                return arguments.length ? (e = null == t ? null : t,
                r) : e
            }
            ,
            r
        }
        function Ie() {}
        function Fe(t, n, e) {
            t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + e) / 6)
        }
        function Ye(t) {
            this._context = t
        }
        function Be(t) {
            return new Ye(t)
        }
        function He(t) {
            this._context = t
        }
        function Xe(t) {
            return new He(t)
        }
        function Ge(t) {
            this._context = t
        }
        function Ve(t) {
            return new Ge(t)
        }
        function We(t, n) {
            this._basis = new Ye(t),
            this._beta = n
        }
        Ye.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x0 = this._x1 = this._y0 = this._y1 = NaN,
                this._point = 0
            },
            lineEnd: function() {
                switch (this._point) {
                case 3:
                    Fe(this, this._x1, this._y1);
                case 2:
                    this._context.lineTo(this._x1, this._y1)
                }
                (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1,
                    this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3,
                    this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
                default:
                    Fe(this, t, n)
                }
                this._x0 = this._x1,
                this._x1 = t,
                this._y0 = this._y1,
                this._y1 = n
            }
        },
        He.prototype = {
            areaStart: Ie,
            areaEnd: Ie,
            lineStart: function() {
                this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN,
                this._point = 0
            },
            lineEnd: function() {
                switch (this._point) {
                case 1:
                    this._context.moveTo(this._x2, this._y2),
                    this._context.closePath();
                    break;
                case 2:
                    this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3),
                    this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3),
                    this._context.closePath();
                    break;
                case 3:
                    this.point(this._x2, this._y2),
                    this.point(this._x3, this._y3),
                    this.point(this._x4, this._y4)
                }
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1,
                    this._x2 = t,
                    this._y2 = n;
                    break;
                case 1:
                    this._point = 2,
                    this._x3 = t,
                    this._y3 = n;
                    break;
                case 2:
                    this._point = 3,
                    this._x4 = t,
                    this._y4 = n,
                    this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
                    break;
                default:
                    Fe(this, t, n)
                }
                this._x0 = this._x1,
                this._x1 = t,
                this._y0 = this._y1,
                this._y1 = n
            }
        },
        Ge.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x0 = this._x1 = this._y0 = this._y1 = NaN,
                this._point = 0
            },
            lineEnd: function() {
                (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1;
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3;
                    var e = (this._x0 + 4 * this._x1 + t) / 6
                      , r = (this._y0 + 4 * this._y1 + n) / 6;
                    this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
                    break;
                case 3:
                    this._point = 4;
                default:
                    Fe(this, t, n)
                }
                this._x0 = this._x1,
                this._x1 = t,
                this._y0 = this._y1,
                this._y1 = n
            }
        },
        We.prototype = {
            lineStart: function() {
                this._x = [],
                this._y = [],
                this._basis.lineStart()
            },
            lineEnd: function() {
                var t = this._x
                  , n = this._y
                  , e = t.length - 1;
                if (e > 0)
                    for (var r, i = t[0], o = n[0], a = t[e] - i, u = n[e] - o, c = -1; ++c <= e; )
                        r = c / e,
                        this._basis.point(this._beta * t[c] + (1 - this._beta) * (i + r * a), this._beta * n[c] + (1 - this._beta) * (o + r * u));
                this._x = this._y = null,
                this._basis.lineEnd()
            },
            point: function(t, n) {
                this._x.push(+t),
                this._y.push(+n)
            }
        };
        var $e = function t(n) {
            function e(t) {
                return 1 === n ? new Ye(t) : new We(t,n)
            }
            return e.beta = function(n) {
                return t(+n)
            }
            ,
            e
        }(.85);
        function Ze(t, n, e) {
            t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e), t._x2, t._y2)
        }
        function Je(t, n) {
            this._context = t,
            this._k = (1 - n) / 6
        }
        Je.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
                this._point = 0
            },
            lineEnd: function() {
                switch (this._point) {
                case 2:
                    this._context.lineTo(this._x2, this._y2);
                    break;
                case 3:
                    Ze(this, this._x1, this._y1)
                }
                (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1,
                    this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                    break;
                case 1:
                    this._point = 2,
                    this._x1 = t,
                    this._y1 = n;
                    break;
                case 2:
                    this._point = 3;
                default:
                    Ze(this, t, n)
                }
                this._x0 = this._x1,
                this._x1 = this._x2,
                this._x2 = t,
                this._y0 = this._y1,
                this._y1 = this._y2,
                this._y2 = n
            }
        };
        var Qe = function t(n) {
            function e(t) {
                return new Je(t,n)
            }
            return e.tension = function(n) {
                return t(+n)
            }
            ,
            e
        }(0);
        function Ke(t, n) {
            this._context = t,
            this._k = (1 - n) / 6
        }
        Ke.prototype = {
            areaStart: Ie,
            areaEnd: Ie,
            lineStart: function() {
                this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN,
                this._point = 0
            },
            lineEnd: function() {
                switch (this._point) {
                case 1:
                    this._context.moveTo(this._x3, this._y3),
                    this._context.closePath();
                    break;
                case 2:
                    this._context.lineTo(this._x3, this._y3),
                    this._context.closePath();
                    break;
                case 3:
                    this.point(this._x3, this._y3),
                    this.point(this._x4, this._y4),
                    this.point(this._x5, this._y5)
                }
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1,
                    this._x3 = t,
                    this._y3 = n;
                    break;
                case 1:
                    this._point = 2,
                    this._context.moveTo(this._x4 = t, this._y4 = n);
                    break;
                case 2:
                    this._point = 3,
                    this._x5 = t,
                    this._y5 = n;
                    break;
                default:
                    Ze(this, t, n)
                }
                this._x0 = this._x1,
                this._x1 = this._x2,
                this._x2 = t,
                this._y0 = this._y1,
                this._y1 = this._y2,
                this._y2 = n
            }
        };
        var tr = function t(n) {
            function e(t) {
                return new Ke(t,n)
            }
            return e.tension = function(n) {
                return t(+n)
            }
            ,
            e
        }(0);
        function nr(t, n) {
            this._context = t,
            this._k = (1 - n) / 6
        }
        nr.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
                this._point = 0
            },
            lineEnd: function() {
                (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1;
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3,
                    this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                    break;
                case 3:
                    this._point = 4;
                default:
                    Ze(this, t, n)
                }
                this._x0 = this._x1,
                this._x1 = this._x2,
                this._x2 = t,
                this._y0 = this._y1,
                this._y1 = this._y2,
                this._y2 = n
            }
        };
        var er = function t(n) {
            function e(t) {
                return new nr(t,n)
            }
            return e.tension = function(n) {
                return t(+n)
            }
            ,
            e
        }(0);
        function rr(t, n, e) {
            var r = t._x1
              , i = t._y1
              , o = t._x2
              , a = t._y2;
            if (t._l01_a > Gn) {
                var u = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a
                  , c = 3 * t._l01_a * (t._l01_a + t._l12_a);
                r = (r * u - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c,
                i = (i * u - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c
            }
            if (t._l23_a > Gn) {
                var s = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a
                  , l = 3 * t._l23_a * (t._l23_a + t._l12_a);
                o = (o * s + t._x1 * t._l23_2a - n * t._l12_2a) / l,
                a = (a * s + t._y1 * t._l23_2a - e * t._l12_2a) / l
            }
            t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2)
        }
        function ir(t, n) {
            this._context = t,
            this._alpha = n
        }
        ir.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
                this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
            },
            lineEnd: function() {
                switch (this._point) {
                case 2:
                    this._context.lineTo(this._x2, this._y2);
                    break;
                case 3:
                    this.point(this, this._x2, this._y2)
                }
                (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                if (t = +t,
                n = +n,
                this._point) {
                    var e = this._x2 - t
                      , r = this._y2 - n;
                    this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
                }
                switch (this._point) {
                case 0:
                    this._point = 1,
                    this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3;
                default:
                    rr(this, t, n)
                }
                this._l01_a = this._l12_a,
                this._l12_a = this._l23_a,
                this._l01_2a = this._l12_2a,
                this._l12_2a = this._l23_2a,
                this._x0 = this._x1,
                this._x1 = this._x2,
                this._x2 = t,
                this._y0 = this._y1,
                this._y1 = this._y2,
                this._y2 = n
            }
        };
        var or = function t(n) {
            function e(t) {
                return n ? new ir(t,n) : new Je(t,0)
            }
            return e.alpha = function(n) {
                return t(+n)
            }
            ,
            e
        }(.5);
        function ar(t, n) {
            this._context = t,
            this._alpha = n
        }
        ar.prototype = {
            areaStart: Ie,
            areaEnd: Ie,
            lineStart: function() {
                this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN,
                this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
            },
            lineEnd: function() {
                switch (this._point) {
                case 1:
                    this._context.moveTo(this._x3, this._y3),
                    this._context.closePath();
                    break;
                case 2:
                    this._context.lineTo(this._x3, this._y3),
                    this._context.closePath();
                    break;
                case 3:
                    this.point(this._x3, this._y3),
                    this.point(this._x4, this._y4),
                    this.point(this._x5, this._y5)
                }
            },
            point: function(t, n) {
                if (t = +t,
                n = +n,
                this._point) {
                    var e = this._x2 - t
                      , r = this._y2 - n;
                    this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
                }
                switch (this._point) {
                case 0:
                    this._point = 1,
                    this._x3 = t,
                    this._y3 = n;
                    break;
                case 1:
                    this._point = 2,
                    this._context.moveTo(this._x4 = t, this._y4 = n);
                    break;
                case 2:
                    this._point = 3,
                    this._x5 = t,
                    this._y5 = n;
                    break;
                default:
                    rr(this, t, n)
                }
                this._l01_a = this._l12_a,
                this._l12_a = this._l23_a,
                this._l01_2a = this._l12_2a,
                this._l12_2a = this._l23_2a,
                this._x0 = this._x1,
                this._x1 = this._x2,
                this._x2 = t,
                this._y0 = this._y1,
                this._y1 = this._y2,
                this._y2 = n
            }
        };
        var ur = function t(n) {
            function e(t) {
                return n ? new ar(t,n) : new Ke(t,0)
            }
            return e.alpha = function(n) {
                return t(+n)
            }
            ,
            e
        }(.5);
        function cr(t, n) {
            this._context = t,
            this._alpha = n
        }
        cr.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN,
                this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
            },
            lineEnd: function() {
                (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                if (t = +t,
                n = +n,
                this._point) {
                    var e = this._x2 - t
                      , r = this._y2 - n;
                    this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
                }
                switch (this._point) {
                case 0:
                    this._point = 1;
                    break;
                case 1:
                    this._point = 2;
                    break;
                case 2:
                    this._point = 3,
                    this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                    break;
                case 3:
                    this._point = 4;
                default:
                    rr(this, t, n)
                }
                this._l01_a = this._l12_a,
                this._l12_a = this._l23_a,
                this._l01_2a = this._l12_2a,
                this._l12_2a = this._l23_2a,
                this._x0 = this._x1,
                this._x1 = this._x2,
                this._x2 = t,
                this._y0 = this._y1,
                this._y1 = this._y2,
                this._y2 = n
            }
        };
        var sr = function t(n) {
            function e(t) {
                return n ? new cr(t,n) : new nr(t,0)
            }
            return e.alpha = function(n) {
                return t(+n)
            }
            ,
            e
        }(.5);
        function lr(t) {
            this._context = t
        }
        function fr(t) {
            return new lr(t)
        }
        function hr(t) {
            return t < 0 ? -1 : 1
        }
        function pr(t, n, e) {
            var r = t._x1 - t._x0
              , i = n - t._x1
              , o = (t._y1 - t._y0) / (r || i < 0 && -0)
              , a = (e - t._y1) / (i || r < 0 && -0)
              , u = (o * i + a * r) / (r + i);
            return (hr(o) + hr(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(u)) || 0
        }
        function dr(t, n) {
            var e = t._x1 - t._x0;
            return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n
        }
        function vr(t, n, e) {
            var r = t._x0
              , i = t._y0
              , o = t._x1
              , a = t._y1
              , u = (o - r) / 3;
            t._context.bezierCurveTo(r + u, i + u * n, o - u, a - u * e, o, a)
        }
        function gr(t) {
            this._context = t
        }
        function yr(t) {
            this._context = new _r(t)
        }
        function _r(t) {
            this._context = t
        }
        function mr(t) {
            return new gr(t)
        }
        function xr(t) {
            return new yr(t)
        }
        function br(t) {
            this._context = t
        }
        function wr(t) {
            var n, e, r = t.length - 1, i = new Array(r), o = new Array(r), a = new Array(r);
            for (i[0] = 0,
            o[0] = 2,
            a[0] = t[0] + 2 * t[1],
            n = 1; n < r - 1; ++n)
                i[n] = 1,
                o[n] = 4,
                a[n] = 4 * t[n] + 2 * t[n + 1];
            for (i[r - 1] = 2,
            o[r - 1] = 7,
            a[r - 1] = 8 * t[r - 1] + t[r],
            n = 1; n < r; ++n)
                e = i[n] / o[n - 1],
                o[n] -= e,
                a[n] -= e * a[n - 1];
            for (i[r - 1] = a[r - 1] / o[r - 1],
            n = r - 2; n >= 0; --n)
                i[n] = (a[n] - i[n + 1]) / o[n];
            for (o[r - 1] = (t[r] + i[r - 1]) / 2,
            n = 0; n < r - 1; ++n)
                o[n] = 2 * t[n + 1] - i[n + 1];
            return [i, o]
        }
        function Mr(t) {
            return new br(t)
        }
        function kr(t, n) {
            this._context = t,
            this._t = n
        }
        function Er(t) {
            return new kr(t,.5)
        }
        function Sr(t) {
            return new kr(t,0)
        }
        function Ar(t) {
            return new kr(t,1)
        }
        lr.prototype = {
            areaStart: Ie,
            areaEnd: Ie,
            lineStart: function() {
                this._point = 0
            },
            lineEnd: function() {
                this._point && this._context.closePath()
            },
            point: function(t, n) {
                t = +t,
                n = +n,
                this._point ? this._context.lineTo(t, n) : (this._point = 1,
                this._context.moveTo(t, n))
            }
        },
        gr.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN,
                this._point = 0
            },
            lineEnd: function() {
                switch (this._point) {
                case 2:
                    this._context.lineTo(this._x1, this._y1);
                    break;
                case 3:
                    vr(this, this._t0, dr(this, this._t0))
                }
                (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
                this._line = 1 - this._line
            },
            point: function(t, n) {
                var e = NaN;
                if (n = +n,
                (t = +t) !== this._x1 || n !== this._y1) {
                    switch (this._point) {
                    case 0:
                        this._point = 1,
                        this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                        break;
                    case 1:
                        this._point = 2;
                        break;
                    case 2:
                        this._point = 3,
                        vr(this, dr(this, e = pr(this, t, n)), e);
                        break;
                    default:
                        vr(this, this._t0, e = pr(this, t, n))
                    }
                    this._x0 = this._x1,
                    this._x1 = t,
                    this._y0 = this._y1,
                    this._y1 = n,
                    this._t0 = e
                }
            }
        },
        (yr.prototype = Object.create(gr.prototype)).point = function(t, n) {
            gr.prototype.point.call(this, n, t)
        }
        ,
        _r.prototype = {
            moveTo: function(t, n) {
                this._context.moveTo(n, t)
            },
            closePath: function() {
                this._context.closePath()
            },
            lineTo: function(t, n) {
                this._context.lineTo(n, t)
            },
            bezierCurveTo: function(t, n, e, r, i, o) {
                this._context.bezierCurveTo(n, t, r, e, o, i)
            }
        },
        br.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x = [],
                this._y = []
            },
            lineEnd: function() {
                var t = this._x
                  , n = this._y
                  , e = t.length;
                if (e)
                    if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]),
                    2 === e)
                        this._context.lineTo(t[1], n[1]);
                    else
                        for (var r = wr(t), i = wr(n), o = 0, a = 1; a < e; ++o,
                        ++a)
                            this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[a], n[a]);
                (this._line || 0 !== this._line && 1 === e) && this._context.closePath(),
                this._line = 1 - this._line,
                this._x = this._y = null
            },
            point: function(t, n) {
                this._x.push(+t),
                this._y.push(+n)
            }
        },
        kr.prototype = {
            areaStart: function() {
                this._line = 0
            },
            areaEnd: function() {
                this._line = NaN
            },
            lineStart: function() {
                this._x = this._y = NaN,
                this._point = 0
            },
            lineEnd: function() {
                0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y),
                (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(),
                this._line >= 0 && (this._t = 1 - this._t,
                this._line = 1 - this._line)
            },
            point: function(t, n) {
                switch (t = +t,
                n = +n,
                this._point) {
                case 0:
                    this._point = 1,
                    this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
                    break;
                case 1:
                    this._point = 2;
                default:
                    if (this._t <= 0)
                        this._context.lineTo(this._x, n),
                        this._context.lineTo(t, n);
                    else {
                        var e = this._x * (1 - this._t) + t * this._t;
                        this._context.lineTo(e, this._y),
                        this._context.lineTo(e, n)
                    }
                }
                this._x = t,
                this._y = n
            }
        };
        var Nr = Array.prototype.slice;
        function Tr(t, n) {
            if ((r = t.length) > 1)
                for (var e, r, i = 1, o = t[n[0]], a = o.length; i < r; ++i) {
                    e = o,
                    o = t[n[i]];
                    for (var u = 0; u < a; ++u)
                        o[u][1] += o[u][0] = isNaN(e[u][1]) ? e[u][0] : e[u][1]
                }
        }
        function Cr(t) {
            for (var n = t.length, e = new Array(n); --n >= 0; )
                e[n] = n;
            return e
        }
        function Pr(t, n) {
            return t[n]
        }
        function zr() {
            var t = Xn([])
              , n = Cr
              , e = Tr
              , r = Pr;
            function i(i) {
                var o, a, u = t.apply(this, arguments), c = i.length, s = u.length, l = new Array(s);
                for (o = 0; o < s; ++o) {
                    for (var f, h = u[o], p = l[o] = new Array(c), d = 0; d < c; ++d)
                        p[d] = f = [0, +r(i[d], h, d, i)],
                        f.data = i[d];
                    p.key = h
                }
                for (o = 0,
                a = n(l); o < s; ++o)
                    l[a[o]].index = o;
                return e(l, a),
                l
            }
            return i.keys = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : Xn(Nr.call(n)),
                i) : t
            }
            ,
            i.value = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : Xn(+t),
                i) : r
            }
            ,
            i.order = function(t) {
                return arguments.length ? (n = null == t ? Cr : "function" == typeof t ? t : Xn(Nr.call(t)),
                i) : n
            }
            ,
            i.offset = function(t) {
                return arguments.length ? (e = null == t ? Tr : t,
                i) : e
            }
            ,
            i
        }
        function Lr(t, n) {
            if ((r = t.length) > 0) {
                for (var e, r, i, o = 0, a = t[0].length; o < a; ++o) {
                    for (i = e = 0; e < r; ++e)
                        i += t[e][o][1] || 0;
                    if (i)
                        for (e = 0; e < r; ++e)
                            t[e][o][1] /= i
                }
                Tr(t, n)
            }
        }
        function Rr(t, n) {
            if ((e = t.length) > 0) {
                for (var e, r = 0, i = t[n[0]], o = i.length; r < o; ++r) {
                    for (var a = 0, u = 0; a < e; ++a)
                        u += t[a][r][1] || 0;
                    i[r][1] += i[r][0] = -u / 2
                }
                Tr(t, n)
            }
        }
        function qr(t, n) {
            if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
                for (var e, r, i, o = 0, a = 1; a < r; ++a) {
                    for (var u = 0, c = 0, s = 0; u < i; ++u) {
                        for (var l = t[n[u]], f = l[a][1] || 0, h = (f - (l[a - 1][1] || 0)) / 2, p = 0; p < u; ++p) {
                            var d = t[n[p]];
                            h += (d[a][1] || 0) - (d[a - 1][1] || 0)
                        }
                        c += f,
                        s += h * f
                    }
                    e[a - 1][1] += e[a - 1][0] = o,
                    c && (o -= s / c)
                }
                e[a - 1][1] += e[a - 1][0] = o,
                Tr(t, n)
            }
        }
        function Or(t) {
            var n = t.map(Dr);
            return Cr(t).sort((function(t, e) {
                return n[t] - n[e]
            }
            ))
        }
        function Dr(t) {
            for (var n, e = 0, r = -1, i = t.length; ++r < i; )
                (n = +t[r][1]) && (e += n);
            return e
        }
        function Ur(t) {
            return Or(t).reverse()
        }
        function jr(t) {
            var n, e, r = t.length, i = t.map(Dr), o = Cr(t).sort((function(t, n) {
                return i[n] - i[t]
            }
            )), a = 0, u = 0, c = [], s = [];
            for (n = 0; n < r; ++n)
                e = o[n],
                a < u ? (a += i[e],
                c.push(e)) : (u += i[e],
                s.push(e));
            return s.reverse().concat(c)
        }
        function Ir(t) {
            return Cr(t).reverse()
        }
        function Fr(t, n, e) {
            t.prototype = n.prototype = e,
            e.constructor = t
        }
        function Yr(t, n) {
            var e = Object.create(t.prototype);
            for (var r in n)
                e[r] = n[r];
            return e
        }
        function Br() {}
        var Hr = .7
          , Xr = 1 / Hr
          , Gr = /^#([0-9a-f]{3})$/
          , Vr = /^#([0-9a-f]{6})$/
          , Wr = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/
          , $r = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/
          , Zr = /^rgba\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/
          , Jr = /^rgba\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/
          , Qr = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/
          , Kr = /^hsla\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)\s*\)$/
          , ti = {
            aliceblue: 15792383,
            antiquewhite: 16444375,
            aqua: 65535,
            aquamarine: 8388564,
            azure: 15794175,
            beige: 16119260,
            bisque: 16770244,
            black: 0,
            blanchedalmond: 16772045,
            blue: 255,
            blueviolet: 9055202,
            brown: 10824234,
            burlywood: 14596231,
            cadetblue: 6266528,
            chartreuse: 8388352,
            chocolate: 13789470,
            coral: 16744272,
            cornflowerblue: 6591981,
            cornsilk: 16775388,
            crimson: 14423100,
            cyan: 65535,
            darkblue: 139,
            darkcyan: 35723,
            darkgoldenrod: 12092939,
            darkgray: 11119017,
            darkgreen: 25600,
            darkgrey: 11119017,
            darkkhaki: 12433259,
            darkmagenta: 9109643,
            darkolivegreen: 5597999,
            darkorange: 16747520,
            darkorchid: 10040012,
            darkred: 9109504,
            darksalmon: 15308410,
            darkseagreen: 9419919,
            darkslateblue: 4734347,
            darkslategray: 3100495,
            darkslategrey: 3100495,
            darkturquoise: 52945,
            darkviolet: 9699539,
            deeppink: 16716947,
            deepskyblue: 49151,
            dimgray: 6908265,
            dimgrey: 6908265,
            dodgerblue: 2003199,
            firebrick: 11674146,
            floralwhite: 16775920,
            forestgreen: 2263842,
            fuchsia: 16711935,
            gainsboro: 14474460,
            ghostwhite: 16316671,
            gold: 16766720,
            goldenrod: 14329120,
            gray: 8421504,
            green: 32768,
            greenyellow: 11403055,
            grey: 8421504,
            honeydew: 15794160,
            hotpink: 16738740,
            indianred: 13458524,
            indigo: 4915330,
            ivory: 16777200,
            khaki: 15787660,
            lavender: 15132410,
            lavenderblush: 16773365,
            lawngreen: 8190976,
            lemonchiffon: 16775885,
            lightblue: 11393254,
            lightcoral: 15761536,
            lightcyan: 14745599,
            lightgoldenrodyellow: 16448210,
            lightgray: 13882323,
            lightgreen: 9498256,
            lightgrey: 13882323,
            lightpink: 16758465,
            lightsalmon: 16752762,
            lightseagreen: 2142890,
            lightskyblue: 8900346,
            lightslategray: 7833753,
            lightslategrey: 7833753,
            lightsteelblue: 11584734,
            lightyellow: 16777184,
            lime: 65280,
            limegreen: 3329330,
            linen: 16445670,
            magenta: 16711935,
            maroon: 8388608,
            mediumaquamarine: 6737322,
            mediumblue: 205,
            mediumorchid: 12211667,
            mediumpurple: 9662683,
            mediumseagreen: 3978097,
            mediumslateblue: 8087790,
            mediumspringgreen: 64154,
            mediumturquoise: 4772300,
            mediumvioletred: 13047173,
            midnightblue: 1644912,
            mintcream: 16121850,
            mistyrose: 16770273,
            moccasin: 16770229,
            navajowhite: 16768685,
            navy: 128,
            oldlace: 16643558,
            olive: 8421376,
            olivedrab: 7048739,
            orange: 16753920,
            orangered: 16729344,
            orchid: 14315734,
            palegoldenrod: 15657130,
            palegreen: 10025880,
            paleturquoise: 11529966,
            palevioletred: 14381203,
            papayawhip: 16773077,
            peachpuff: 16767673,
            peru: 13468991,
            pink: 16761035,
            plum: 14524637,
            powderblue: 11591910,
            purple: 8388736,
            rebeccapurple: 6697881,
            red: 16711680,
            rosybrown: 12357519,
            royalblue: 4286945,
            saddlebrown: 9127187,
            salmon: 16416882,
            sandybrown: 16032864,
            seagreen: 3050327,
            seashell: 16774638,
            sienna: 10506797,
            silver: 12632256,
            skyblue: 8900331,
            slateblue: 6970061,
            slategray: 7372944,
            slategrey: 7372944,
            snow: 16775930,
            springgreen: 65407,
            steelblue: 4620980,
            tan: 13808780,
            teal: 32896,
            thistle: 14204888,
            tomato: 16737095,
            turquoise: 4251856,
            violet: 15631086,
            wheat: 16113331,
            white: 16777215,
            whitesmoke: 16119285,
            yellow: 16776960,
            yellowgreen: 10145074
        };
        function ni(t) {
            var n;
            return t = (t + "").trim().toLowerCase(),
            (n = Gr.exec(t)) ? new ai((n = parseInt(n[1], 16)) >> 8 & 15 | n >> 4 & 240,n >> 4 & 15 | 240 & n,(15 & n) << 4 | 15 & n,1) : (n = Vr.exec(t)) ? ei(parseInt(n[1], 16)) : (n = Wr.exec(t)) ? new ai(n[1],n[2],n[3],1) : (n = $r.exec(t)) ? new ai(255 * n[1] / 100,255 * n[2] / 100,255 * n[3] / 100,1) : (n = Zr.exec(t)) ? ri(n[1], n[2], n[3], n[4]) : (n = Jr.exec(t)) ? ri(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = Qr.exec(t)) ? ui(n[1], n[2] / 100, n[3] / 100, 1) : (n = Kr.exec(t)) ? ui(n[1], n[2] / 100, n[3] / 100, n[4]) : ti.hasOwnProperty(t) ? ei(ti[t]) : "transparent" === t ? new ai(NaN,NaN,NaN,0) : null
        }
        function ei(t) {
            return new ai(t >> 16 & 255,t >> 8 & 255,255 & t,1)
        }
        function ri(t, n, e, r) {
            return r <= 0 && (t = n = e = NaN),
            new ai(t,n,e,r)
        }
        function ii(t) {
            return t instanceof Br || (t = ni(t)),
            t ? new ai((t = t.rgb()).r,t.g,t.b,t.opacity) : new ai
        }
        function oi(t, n, e, r) {
            return 1 === arguments.length ? ii(t) : new ai(t,n,e,null == r ? 1 : r)
        }
        function ai(t, n, e, r) {
            this.r = +t,
            this.g = +n,
            this.b = +e,
            this.opacity = +r
        }
        function ui(t, n, e, r) {
            return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN),
            new li(t,n,e,r)
        }
        function ci(t) {
            if (t instanceof li)
                return new li(t.h,t.s,t.l,t.opacity);
            if (t instanceof Br || (t = ni(t)),
            !t)
                return new li;
            if (t instanceof li)
                return t;
            var n = (t = t.rgb()).r / 255
              , e = t.g / 255
              , r = t.b / 255
              , i = Math.min(n, e, r)
              , o = Math.max(n, e, r)
              , a = NaN
              , u = o - i
              , c = (o + i) / 2;
            return u ? (a = n === o ? (e - r) / u + 6 * (e < r) : e === o ? (r - n) / u + 2 : (n - e) / u + 4,
            u /= c < .5 ? o + i : 2 - o - i,
            a *= 60) : u = c > 0 && c < 1 ? 0 : a,
            new li(a,u,c,t.opacity)
        }
        function si(t, n, e, r) {
            return 1 === arguments.length ? ci(t) : new li(t,n,e,null == r ? 1 : r)
        }
        function li(t, n, e, r) {
            this.h = +t,
            this.s = +n,
            this.l = +e,
            this.opacity = +r
        }
        function fi(t, n, e) {
            return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
        }
        Fr(Br, ni, {
            displayable: function() {
                return this.rgb().displayable()
            },
            toString: function() {
                return this.rgb() + ""
            }
        }),
        Fr(ai, oi, Yr(Br, {
            brighter: function(t) {
                return t = null == t ? Xr : Math.pow(Xr, t),
                new ai(this.r * t,this.g * t,this.b * t,this.opacity)
            },
            darker: function(t) {
                return t = null == t ? Hr : Math.pow(Hr, t),
                new ai(this.r * t,this.g * t,this.b * t,this.opacity)
            },
            rgb: function() {
                return this
            },
            displayable: function() {
                return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
            },
            toString: function() {
                var t = this.opacity;
                return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
            }
        })),
        Fr(li, si, Yr(Br, {
            brighter: function(t) {
                return t = null == t ? Xr : Math.pow(Xr, t),
                new li(this.h,this.s,this.l * t,this.opacity)
            },
            darker: function(t) {
                return t = null == t ? Hr : Math.pow(Hr, t),
                new li(this.h,this.s,this.l * t,this.opacity)
            },
            rgb: function() {
                var t = this.h % 360 + 360 * (this.h < 0)
                  , n = isNaN(t) || isNaN(this.s) ? 0 : this.s
                  , e = this.l
                  , r = e + (e < .5 ? e : 1 - e) * n
                  , i = 2 * e - r;
                return new ai(fi(t >= 240 ? t - 240 : t + 120, i, r),fi(t, i, r),fi(t < 120 ? t + 240 : t - 120, i, r),this.opacity)
            },
            displayable: function() {
                return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
            }
        }));
        var hi = Math.PI / 180
          , pi = 180 / Math.PI
          , di = 18
          , vi = .95047
          , gi = 1
          , yi = 1.08883
          , _i = 4 / 29
          , mi = 6 / 29
          , xi = 3 * mi * mi
          , bi = mi * mi * mi;
        function wi(t) {
            if (t instanceof ki)
                return new ki(t.l,t.a,t.b,t.opacity);
            if (t instanceof Pi) {
                var n = t.h * hi;
                return new ki(t.l,Math.cos(n) * t.c,Math.sin(n) * t.c,t.opacity)
            }
            t instanceof ai || (t = ii(t));
            var e = Ni(t.r)
              , r = Ni(t.g)
              , i = Ni(t.b)
              , o = Ei((.4124564 * e + .3575761 * r + .1804375 * i) / vi)
              , a = Ei((.2126729 * e + .7151522 * r + .072175 * i) / gi);
            return new ki(116 * a - 16,500 * (o - a),200 * (a - Ei((.0193339 * e + .119192 * r + .9503041 * i) / yi)),t.opacity)
        }
        function Mi(t, n, e, r) {
            return 1 === arguments.length ? wi(t) : new ki(t,n,e,null == r ? 1 : r)
        }
        function ki(t, n, e, r) {
            this.l = +t,
            this.a = +n,
            this.b = +e,
            this.opacity = +r
        }
        function Ei(t) {
            return t > bi ? Math.pow(t, 1 / 3) : t / xi + _i
        }
        function Si(t) {
            return t > mi ? t * t * t : xi * (t - _i)
        }
        function Ai(t) {
            return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
        }
        function Ni(t) {
            return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
        }
        function Ti(t) {
            if (t instanceof Pi)
                return new Pi(t.h,t.c,t.l,t.opacity);
            t instanceof ki || (t = wi(t));
            var n = Math.atan2(t.b, t.a) * pi;
            return new Pi(n < 0 ? n + 360 : n,Math.sqrt(t.a * t.a + t.b * t.b),t.l,t.opacity)
        }
        function Ci(t, n, e, r) {
            return 1 === arguments.length ? Ti(t) : new Pi(t,n,e,null == r ? 1 : r)
        }
        function Pi(t, n, e, r) {
            this.h = +t,
            this.c = +n,
            this.l = +e,
            this.opacity = +r
        }
        Fr(ki, Mi, Yr(Br, {
            brighter: function(t) {
                return new ki(this.l + di * (null == t ? 1 : t),this.a,this.b,this.opacity)
            },
            darker: function(t) {
                return new ki(this.l - di * (null == t ? 1 : t),this.a,this.b,this.opacity)
            },
            rgb: function() {
                var t = (this.l + 16) / 116
                  , n = isNaN(this.a) ? t : t + this.a / 500
                  , e = isNaN(this.b) ? t : t - this.b / 200;
                return t = gi * Si(t),
                new ai(Ai(3.2404542 * (n = vi * Si(n)) - 1.5371385 * t - .4985314 * (e = yi * Si(e))),Ai(-.969266 * n + 1.8760108 * t + .041556 * e),Ai(.0556434 * n - .2040259 * t + 1.0572252 * e),this.opacity)
            }
        })),
        Fr(Pi, Ci, Yr(Br, {
            brighter: function(t) {
                return new Pi(this.h,this.c,this.l + di * (null == t ? 1 : t),this.opacity)
            },
            darker: function(t) {
                return new Pi(this.h,this.c,this.l - di * (null == t ? 1 : t),this.opacity)
            },
            rgb: function() {
                return wi(this).rgb()
            }
        }));
        var zi = -.14861
          , Li = 1.78277
          , Ri = -.29227
          , qi = -.90649
          , Oi = 1.97294
          , Di = Oi * qi
          , Ui = Oi * Li
          , ji = Li * Ri - qi * zi;
        function Ii(t) {
            if (t instanceof Yi)
                return new Yi(t.h,t.s,t.l,t.opacity);
            t instanceof ai || (t = ii(t));
            var n = t.r / 255
              , e = t.g / 255
              , r = t.b / 255
              , i = (ji * r + Di * n - Ui * e) / (ji + Di - Ui)
              , o = r - i
              , a = (Oi * (e - i) - Ri * o) / qi
              , u = Math.sqrt(a * a + o * o) / (Oi * i * (1 - i))
              , c = u ? Math.atan2(a, o) * pi - 120 : NaN;
            return new Yi(c < 0 ? c + 360 : c,u,i,t.opacity)
        }
        function Fi(t, n, e, r) {
            return 1 === arguments.length ? Ii(t) : new Yi(t,n,e,null == r ? 1 : r)
        }
        function Yi(t, n, e, r) {
            this.h = +t,
            this.s = +n,
            this.l = +e,
            this.opacity = +r
        }
        function Bi(t, n, e, r, i) {
            var o = t * t
              , a = o * t;
            return ((1 - 3 * t + 3 * o - a) * n + (4 - 6 * o + 3 * a) * e + (1 + 3 * t + 3 * o - 3 * a) * r + a * i) / 6
        }
        function Hi(t) {
            var n = t.length - 1;
            return function(e) {
                var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1,
                n - 1) : Math.floor(e * n)
                  , i = t[r]
                  , o = t[r + 1]
                  , a = r > 0 ? t[r - 1] : 2 * i - o
                  , u = r < n - 1 ? t[r + 2] : 2 * o - i;
                return Bi((e - r / n) * n, a, i, o, u)
            }
        }
        function Xi(t) {
            var n = t.length;
            return function(e) {
                var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n)
                  , i = t[(r + n - 1) % n]
                  , o = t[r % n]
                  , a = t[(r + 1) % n]
                  , u = t[(r + 2) % n];
                return Bi((e - r / n) * n, i, o, a, u)
            }
        }
        function Gi(t) {
            return function() {
                return t
            }
        }
        function Vi(t, n) {
            return function(e) {
                return t + e * n
            }
        }
        function Wi(t, n, e) {
            return t = Math.pow(t, e),
            n = Math.pow(n, e) - t,
            e = 1 / e,
            function(r) {
                return Math.pow(t + r * n, e)
            }
        }
        function $i(t, n) {
            var e = n - t;
            return e ? Vi(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) : Gi(isNaN(t) ? n : t)
        }
        function Zi(t) {
            return 1 == (t = +t) ? Ji : function(n, e) {
                return e - n ? Wi(n, e, t) : Gi(isNaN(n) ? e : n)
            }
        }
        function Ji(t, n) {
            var e = n - t;
            return e ? Vi(t, e) : Gi(isNaN(t) ? n : t)
        }
        Fr(Yi, Fi, Yr(Br, {
            brighter: function(t) {
                return t = null == t ? Xr : Math.pow(Xr, t),
                new Yi(this.h,this.s,this.l * t,this.opacity)
            },
            darker: function(t) {
                return t = null == t ? Hr : Math.pow(Hr, t),
                new Yi(this.h,this.s,this.l * t,this.opacity)
            },
            rgb: function() {
                var t = isNaN(this.h) ? 0 : (this.h + 120) * hi
                  , n = +this.l
                  , e = isNaN(this.s) ? 0 : this.s * n * (1 - n)
                  , r = Math.cos(t)
                  , i = Math.sin(t);
                return new ai(255 * (n + e * (zi * r + Li * i)),255 * (n + e * (Ri * r + qi * i)),255 * (n + e * (Oi * r)),this.opacity)
            }
        }));
        var Qi = function t(n) {
            var e = Zi(n);
            function r(t, n) {
                var r = e((t = oi(t)).r, (n = oi(n)).r)
                  , i = e(t.g, n.g)
                  , o = e(t.b, n.b)
                  , a = e(t.opacity, n.opacity);
                return function(n) {
                    return t.r = r(n),
                    t.g = i(n),
                    t.b = o(n),
                    t.opacity = a(n),
                    t + ""
                }
            }
            return r.gamma = t,
            r
        }(1);
        function Ki(t) {
            return function(n) {
                var e, r, i = n.length, o = new Array(i), a = new Array(i), u = new Array(i);
                for (e = 0; e < i; ++e)
                    r = oi(n[e]),
                    o[e] = r.r || 0,
                    a[e] = r.g || 0,
                    u[e] = r.b || 0;
                return o = t(o),
                a = t(a),
                u = t(u),
                r.opacity = 1,
                function(t) {
                    return r.r = o(t),
                    r.g = a(t),
                    r.b = u(t),
                    r + ""
                }
            }
        }
        var to = Ki(Hi)
          , no = Ki(Xi);
        function eo(t, n) {
            var e, r = n ? n.length : 0, i = t ? Math.min(r, t.length) : 0, o = new Array(r), a = new Array(r);
            for (e = 0; e < i; ++e)
                o[e] = fo(t[e], n[e]);
            for (; e < r; ++e)
                a[e] = n[e];
            return function(t) {
                for (e = 0; e < i; ++e)
                    a[e] = o[e](t);
                return a
            }
        }
        function ro(t, n) {
            var e = new Date;
            return n -= t = +t,
            function(r) {
                return e.setTime(t + n * r),
                e
            }
        }
        function io(t, n) {
            return n -= t = +t,
            function(e) {
                return t + n * e
            }
        }
        function oo(t, n) {
            var e, r = {}, i = {};
            for (e in null !== t && "object" == typeof t || (t = {}),
            null !== n && "object" == typeof n || (n = {}),
            n)
                e in t ? r[e] = fo(t[e], n[e]) : i[e] = n[e];
            return function(t) {
                for (e in r)
                    i[e] = r[e](t);
                return i
            }
        }
        var ao = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g
          , uo = new RegExp(ao.source,"g");
        function co(t) {
            return function() {
                return t
            }
        }
        function so(t) {
            return function(n) {
                return t(n) + ""
            }
        }
        function lo(t, n) {
            var e, r, i, o = ao.lastIndex = uo.lastIndex = 0, a = -1, u = [], c = [];
            for (t += "",
            n += ""; (e = ao.exec(t)) && (r = uo.exec(n)); )
                (i = r.index) > o && (i = n.slice(o, i),
                u[a] ? u[a] += i : u[++a] = i),
                (e = e[0]) === (r = r[0]) ? u[a] ? u[a] += r : u[++a] = r : (u[++a] = null,
                c.push({
                    i: a,
                    x: io(e, r)
                })),
                o = uo.lastIndex;
            return o < n.length && (i = n.slice(o),
            u[a] ? u[a] += i : u[++a] = i),
            u.length < 2 ? c[0] ? so(c[0].x) : co(n) : (n = c.length,
            function(t) {
                for (var e, r = 0; r < n; ++r)
                    u[(e = c[r]).i] = e.x(t);
                return u.join("")
            }
            )
        }
        function fo(t, n) {
            var e, r = typeof n;
            return null == n || "boolean" === r ? Gi(n) : ("number" === r ? io : "string" === r ? (e = ni(n)) ? (n = e,
            Qi) : lo : n instanceof ni ? Qi : n instanceof Date ? ro : Array.isArray(n) ? eo : isNaN(n) ? oo : io)(t, n)
        }
        function ho(t, n) {
            return n -= t = +t,
            function(e) {
                return Math.round(t + n * e)
            }
        }
        var po, vo, go, yo, _o = 180 / Math.PI, mo = {
            translateX: 0,
            translateY: 0,
            rotate: 0,
            skewX: 0,
            scaleX: 1,
            scaleY: 1
        };
        function xo(t, n, e, r, i, o) {
            var a, u, c;
            return (a = Math.sqrt(t * t + n * n)) && (t /= a,
            n /= a),
            (c = t * e + n * r) && (e -= t * c,
            r -= n * c),
            (u = Math.sqrt(e * e + r * r)) && (e /= u,
            r /= u,
            c /= u),
            t * r < n * e && (t = -t,
            n = -n,
            c = -c,
            a = -a),
            {
                translateX: i,
                translateY: o,
                rotate: Math.atan2(n, t) * _o,
                skewX: Math.atan(c) * _o,
                scaleX: a,
                scaleY: u
            }
        }
        function bo(t) {
            return "none" === t ? mo : (po || (po = document.createElement("DIV"),
            vo = document.documentElement,
            go = document.defaultView),
            po.style.transform = t,
            t = go.getComputedStyle(vo.appendChild(po), null).getPropertyValue("transform"),
            vo.removeChild(po),
            xo(+(t = t.slice(7, -1).split(","))[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
        }
        function wo(t) {
            return null == t ? mo : (yo || (yo = document.createElementNS("http://www.w3.org/2000/svg", "g")),
            yo.setAttribute("transform", t),
            (t = yo.transform.baseVal.consolidate()) ? xo((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : mo)
        }
        function Mo(t, n, e, r) {
            function i(t) {
                return t.length ? t.pop() + " " : ""
            }
            function o(t, r, i, o, a, u) {
                if (t !== i || r !== o) {
                    var c = a.push("translate(", null, n, null, e);
                    u.push({
                        i: c - 4,
                        x: io(t, i)
                    }, {
                        i: c - 2,
                        x: io(r, o)
                    })
                } else
                    (i || o) && a.push("translate(" + i + n + o + e)
            }
            function a(t, n, e, o) {
                t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360),
                o.push({
                    i: e.push(i(e) + "rotate(", null, r) - 2,
                    x: io(t, n)
                })) : n && e.push(i(e) + "rotate(" + n + r)
            }
            function u(t, n, e, o) {
                t !== n ? o.push({
                    i: e.push(i(e) + "skewX(", null, r) - 2,
                    x: io(t, n)
                }) : n && e.push(i(e) + "skewX(" + n + r)
            }
            function c(t, n, e, r, o, a) {
                if (t !== e || n !== r) {
                    var u = o.push(i(o) + "scale(", null, ",", null, ")");
                    a.push({
                        i: u - 4,
                        x: io(t, e)
                    }, {
                        i: u - 2,
                        x: io(n, r)
                    })
                } else
                    1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")")
            }
            return function(n, e) {
                var r = []
                  , i = [];
                return n = t(n),
                e = t(e),
                o(n.translateX, n.translateY, e.translateX, e.translateY, r, i),
                a(n.rotate, e.rotate, r, i),
                u(n.skewX, e.skewX, r, i),
                c(n.scaleX, n.scaleY, e.scaleX, e.scaleY, r, i),
                n = e = null,
                function(t) {
                    for (var n, e = -1, o = i.length; ++e < o; )
                        r[(n = i[e]).i] = n.x(t);
                    return r.join("")
                }
            }
        }
        var ko = Mo(bo, "px, ", "px)", "deg)")
          , Eo = Mo(wo, ", ", ")", ")")
          , So = Math.SQRT2
          , Ao = 2
          , No = 4
          , To = 1e-12;
        function Co(t) {
            return ((t = Math.exp(t)) + 1 / t) / 2
        }
        function Po(t) {
            return ((t = Math.exp(t)) - 1 / t) / 2
        }
        function zo(t) {
            return ((t = Math.exp(2 * t)) - 1) / (t + 1)
        }
        function Lo(t, n) {
            var e, r, i = t[0], o = t[1], a = t[2], u = n[0], c = n[1], s = n[2], l = u - i, f = c - o, h = l * l + f * f;
            if (h < To)
                r = Math.log(s / a) / So,
                e = function(t) {
                    return [i + t * l, o + t * f, a * Math.exp(So * t * r)]
                }
                ;
            else {
                var p = Math.sqrt(h)
                  , d = (s * s - a * a + No * h) / (2 * a * Ao * p)
                  , v = (s * s - a * a - No * h) / (2 * s * Ao * p)
                  , g = Math.log(Math.sqrt(d * d + 1) - d)
                  , y = Math.log(Math.sqrt(v * v + 1) - v);
                r = (y - g) / So,
                e = function(t) {
                    var n = t * r
                      , e = Co(g)
                      , u = a / (Ao * p) * (e * zo(So * n + g) - Po(g));
                    return [i + u * l, o + u * f, a * e / Co(So * n + g)]
                }
            }
            return e.duration = 1e3 * r,
            e
        }
        function Ro(t) {
            return function(n, e) {
                var r = t((n = si(n)).h, (e = si(e)).h)
                  , i = Ji(n.s, e.s)
                  , o = Ji(n.l, e.l)
                  , a = Ji(n.opacity, e.opacity);
                return function(t) {
                    return n.h = r(t),
                    n.s = i(t),
                    n.l = o(t),
                    n.opacity = a(t),
                    n + ""
                }
            }
        }
        var qo = Ro($i)
          , Oo = Ro(Ji);
        function Do(t, n) {
            var e = Ji((t = Mi(t)).l, (n = Mi(n)).l)
              , r = Ji(t.a, n.a)
              , i = Ji(t.b, n.b)
              , o = Ji(t.opacity, n.opacity);
            return function(n) {
                return t.l = e(n),
                t.a = r(n),
                t.b = i(n),
                t.opacity = o(n),
                t + ""
            }
        }
        function Uo(t) {
            return function(n, e) {
                var r = t((n = Ci(n)).h, (e = Ci(e)).h)
                  , i = Ji(n.c, e.c)
                  , o = Ji(n.l, e.l)
                  , a = Ji(n.opacity, e.opacity);
                return function(t) {
                    return n.h = r(t),
                    n.c = i(t),
                    n.l = o(t),
                    n.opacity = a(t),
                    n + ""
                }
            }
        }
        var jo = Uo($i)
          , Io = Uo(Ji);
        function Fo(t) {
            return function n(e) {
                function r(n, r) {
                    var i = t((n = Fi(n)).h, (r = Fi(r)).h)
                      , o = Ji(n.s, r.s)
                      , a = Ji(n.l, r.l)
                      , u = Ji(n.opacity, r.opacity);
                    return function(t) {
                        return n.h = i(t),
                        n.s = o(t),
                        n.l = a(Math.pow(t, e)),
                        n.opacity = u(t),
                        n + ""
                    }
                }
                return e = +e,
                r.gamma = n,
                r
            }(1)
        }
        var Yo = Fo($i)
          , Bo = Fo(Ji);
        function Ho(t, n) {
            for (var e = new Array(n), r = 0; r < n; ++r)
                e[r] = t(r / (n - 1));
            return e
        }
        var Xo = {
            value: function() {}
        };
        function Go() {
            for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
                if (!(t = arguments[n] + "") || t in r)
                    throw new Error("illegal type: " + t);
                r[t] = []
            }
            return new Vo(r)
        }
        function Vo(t) {
            this._ = t
        }
        function Wo(t, n) {
            return t.trim().split(/^|\s+/).map((function(t) {
                var e = ""
                  , r = t.indexOf(".");
                if (r >= 0 && (e = t.slice(r + 1),
                t = t.slice(0, r)),
                t && !n.hasOwnProperty(t))
                    throw new Error("unknown type: " + t);
                return {
                    type: t,
                    name: e
                }
            }
            ))
        }
        function $o(t, n) {
            for (var e, r = 0, i = t.length; r < i; ++r)
                if ((e = t[r]).name === n)
                    return e.value
        }
        function Zo(t, n, e) {
            for (var r = 0, i = t.length; r < i; ++r)
                if (t[r].name === n) {
                    t[r] = Xo,
                    t = t.slice(0, r).concat(t.slice(r + 1));
                    break
                }
            return null != e && t.push({
                name: n,
                value: e
            }),
            t
        }
        function Jo(t) {
            return new Function("d","return {" + t.map((function(t, n) {
                return JSON.stringify(t) + ": d[" + n + "]"
            }
            )).join(",") + "}")
        }
        function Qo(t, n) {
            var e = Jo(t);
            return function(r, i) {
                return n(e(r), i, t)
            }
        }
        function Ko(t) {
            var n = Object.create(null)
              , e = [];
            return t.forEach((function(t) {
                for (var r in t)
                    r in n || e.push(n[r] = r)
            }
            )),
            e
        }
        function ta(t) {
            var n = new RegExp('["' + t + "\n]")
              , e = t.charCodeAt(0);
            function r(t, n) {
                var e, r, o = i(t, (function(t, i) {
                    if (e)
                        return e(t, i - 1);
                    r = t,
                    e = n ? Qo(t, n) : Jo(t)
                }
                ));
                return o.columns = r,
                o
            }
            function i(t, n) {
                var r, i, o = {}, a = {}, u = [], c = t.length, s = 0, l = 0;
                function f() {
                    if (s >= c)
                        return a;
                    if (i)
                        return i = !1,
                        o;
                    var n, r = s;
                    if (34 === t.charCodeAt(r)) {
                        for (var u = r; u++ < c; )
                            if (34 === t.charCodeAt(u)) {
                                if (34 !== t.charCodeAt(u + 1))
                                    break;
                                ++u
                            }
                        return s = u + 2,
                        13 === (n = t.charCodeAt(u + 1)) ? (i = !0,
                        10 === t.charCodeAt(u + 2) && ++s) : 10 === n && (i = !0),
                        t.slice(r + 1, u).replace(/""/g, '"')
                    }
                    for (; s < c; ) {
                        var l = 1;
                        if (10 === (n = t.charCodeAt(s++)))
                            i = !0;
                        else if (13 === n)
                            i = !0,
                            10 === t.charCodeAt(s) && (++s,
                            ++l);
                        else if (n !== e)
                            continue;
                        return t.slice(r, s - l)
                    }
                    return t.slice(r)
                }
                for (; (r = f()) !== a; ) {
                    for (var h = []; r !== o && r !== a; )
                        h.push(r),
                        r = f();
                    n && null == (h = n(h, l++)) || u.push(h)
                }
                return u
            }
            function o(n, e) {
                return null == e && (e = Ko(n)),
                [e.map(c).join(t)].concat(n.map((function(n) {
                    return e.map((function(t) {
                        return c(n[t])
                    }
                    )).join(t)
                }
                ))).join("\n")
            }
            function a(t) {
                return t.map(u).join("\n")
            }
            function u(n) {
                return n.map(c).join(t)
            }
            function c(t) {
                return null == t ? "" : n.test(t += "") ? '"' + t.replace(/\"/g, '""') + '"' : t
            }
            return {
                parse: r,
                parseRows: i,
                format: o,
                formatRows: a
            }
        }
        Vo.prototype = Go.prototype = {
            constructor: Vo,
            on: function(t, n) {
                var e, r = this._, i = Wo(t + "", r), o = -1, a = i.length;
                if (!(arguments.length < 2)) {
                    if (null != n && "function" != typeof n)
                        throw new Error("invalid callback: " + n);
                    for (; ++o < a; )
                        if (e = (t = i[o]).type)
                            r[e] = Zo(r[e], t.name, n);
                        else if (null == n)
                            for (e in r)
                                r[e] = Zo(r[e], t.name, null);
                    return this
                }
                for (; ++o < a; )
                    if ((e = (t = i[o]).type) && (e = $o(r[e], t.name)))
                        return e
            },
            copy: function() {
                var t = {}
                  , n = this._;
                for (var e in n)
                    t[e] = n[e].slice();
                return new Vo(t)
            },
            call: function(t, n) {
                if ((e = arguments.length - 2) > 0)
                    for (var e, r, i = new Array(e), o = 0; o < e; ++o)
                        i[o] = arguments[o + 2];
                if (!this._.hasOwnProperty(t))
                    throw new Error("unknown type: " + t);
                for (o = 0,
                e = (r = this._[t]).length; o < e; ++o)
                    r[o].value.apply(n, i)
            },
            apply: function(t, n, e) {
                if (!this._.hasOwnProperty(t))
                    throw new Error("unknown type: " + t);
                for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
                    r[i].value.apply(n, e)
            }
        };
        var na = ta(",")
          , ea = na.parse
          , ra = na.parseRows
          , ia = na.format
          , oa = na.formatRows
          , aa = ta("\t")
          , ua = aa.parse
          , ca = aa.parseRows
          , sa = aa.format
          , la = aa.formatRows;
        function fa(t, n) {
            var e, r, i, o, a = Go("beforesend", "progress", "load", "error"), u = H(), c = new XMLHttpRequest, s = null, l = null, f = 0;
            function h(t) {
                var n, r = c.status;
                if (!r && pa(c) || r >= 200 && r < 300 || 304 === r) {
                    if (i)
                        try {
                            n = i.call(e, c)
                        } catch (t) {
                            return void a.call("error", e, t)
                        }
                    else
                        n = c;
                    a.call("load", e, n)
                } else
                    a.call("error", e, t)
            }
            return "undefined" != typeof XDomainRequest && !("withCredentials"in c) && /^(http(s)?:)?\/\//.test(t) && (c = new XDomainRequest),
            "onload"in c ? c.onload = c.onerror = c.ontimeout = h : c.onreadystatechange = function(t) {
                c.readyState > 3 && h(t)
            }
            ,
            c.onprogress = function(t) {
                a.call("progress", e, t)
            }
            ,
            e = {
                header: function(t, n) {
                    return t = (t + "").toLowerCase(),
                    arguments.length < 2 ? u.get(t) : (null == n ? u.remove(t) : u.set(t, n + ""),
                    e)
                },
                mimeType: function(t) {
                    return arguments.length ? (r = null == t ? null : t + "",
                    e) : r
                },
                responseType: function(t) {
                    return arguments.length ? (o = t,
                    e) : o
                },
                timeout: function(t) {
                    return arguments.length ? (f = +t,
                    e) : f
                },
                user: function(t) {
                    return arguments.length < 1 ? s : (s = null == t ? null : t + "",
                    e)
                },
                password: function(t) {
                    return arguments.length < 1 ? l : (l = null == t ? null : t + "",
                    e)
                },
                response: function(t) {
                    return i = t,
                    e
                },
                get: function(t, n) {
                    return e.send("GET", t, n)
                },
                post: function(t, n) {
                    return e.send("POST", t, n)
                },
                send: function(n, i, h) {
                    return h || "function" != typeof i || (h = i,
                    i = null),
                    h && 1 === h.length && (h = ha(h)),
                    c.open(n, t, !0, s, l),
                    null == r || u.has("accept") || u.set("accept", r + ",*/*"),
                    c.setRequestHeader && u.each((function(t, n) {
                        c.setRequestHeader(n, t)
                    }
                    )),
                    null != r && c.overrideMimeType && c.overrideMimeType(r),
                    null != o && (c.responseType = o),
                    f > 0 && (c.timeout = f),
                    h && e.on("error", h).on("load", (function(t) {
                        h(null, t)
                    }
                    )),
                    a.call("beforesend", e, c),
                    c.send(null == i ? null : i),
                    e
                },
                abort: function() {
                    return c.abort(),
                    e
                },
                on: function() {
                    var t = a.on.apply(a, arguments);
                    return t === a ? e : t
                }
            },
            n ? e.get(n) : e
        }
        function ha(t) {
            return function(n, e) {
                t(null == n ? e : null)
            }
        }
        function pa(t) {
            var n = t.responseType;
            return n && "text" !== n ? t.response : t.responseText
        }
        function da(t, n) {
            return function(e, r) {
                var i = fa(e).mimeType(t).response(n);
                return r ? i.get(r) : i
            }
        }
        var va = da("text/html", (function(t) {
            return document.createRange().createContextualFragment(t.responseText)
        }
        ))
          , ga = da("application/json", (function(t) {
            return JSON.parse(t.responseText)
        }
        ))
          , ya = da("text/plain", (function(t) {
            return t.responseText
        }
        ))
          , _a = da("application/xml", (function(t) {
            var n = t.responseXML;
            if (!n)
                throw new Error("parse error");
            return n
        }
        ));
        function ma(t, n) {
            return function(e, r, i) {
                arguments.length < 3 && (i = r,
                r = null);
                var o = fa(e).mimeType(t);
                return o.row = function(t) {
                    return arguments.length ? o.response(xa(n, r = t)) : r
                }
                ,
                o.row(r),
                i ? o.get(i) : o
            }
        }
        function xa(t, n) {
            return function(e) {
                return t(e.responseText, n)
            }
        }
        var ba, wa, Ma = ma("text/csv", ea), ka = ma("text/tab-separated-values", ua), Ea = 0, Sa = 0, Aa = 0, Na = 1e3, Ta = 0, Ca = 0, Pa = 0, za = "object" == typeof performance && performance.now ? performance : Date, La = "function" == typeof requestAnimationFrame ? za === Date ? function(t) {
            requestAnimationFrame((function() {
                t(za.now())
            }
            ))
        }
        : requestAnimationFrame : function(t) {
            setTimeout(t, 17)
        }
        ;
        function Ra() {
            return Ca || (La(qa),
            Ca = za.now() + Pa)
        }
        function qa() {
            Ca = 0
        }
        function Oa() {
            this._call = this._time = this._next = null
        }
        function Da(t, n, e) {
            var r = new Oa;
            return r.restart(t, n, e),
            r
        }
        function Ua() {
            Ra(),
            ++Ea;
            for (var t, n = ba; n; )
                (t = Ca - n._time) >= 0 && n._call.call(null, t),
                n = n._next;
            --Ea
        }
        function ja(t) {
            Ca = (Ta = t || za.now()) + Pa,
            Ea = Sa = 0;
            try {
                Ua()
            } finally {
                Ea = 0,
                Fa(),
                Ca = 0
            }
        }
        function Ia() {
            var t = za.now()
              , n = t - Ta;
            n > Na && (Pa -= n,
            Ta = t)
        }
        function Fa() {
            for (var t, n, e = ba, r = 1 / 0; e; )
                e._call ? (r > e._time && (r = e._time),
                t = e,
                e = e._next) : (n = e._next,
                e._next = null,
                e = t ? t._next = n : ba = n);
            wa = t,
            Ya(r)
        }
        function Ya(t) {
            if (!Ea) {
                Sa && (Sa = clearTimeout(Sa));
                var n = t - Ca;
                n > 24 ? (t < 1 / 0 && (Sa = setTimeout(ja, n)),
                Aa && (Aa = clearInterval(Aa))) : (Aa || (Aa = setInterval(Ia, Na)),
                Ea = 1,
                La(ja))
            }
        }
        function Ba(t, n, e) {
            var r = new Oa;
            return n = null == n ? 0 : +n,
            r.restart((function(e) {
                r.stop(),
                t(e + n)
            }
            ), n, e),
            r
        }
        function Ha(t, n, e) {
            var r = new Oa
              , i = n;
            return null == n ? (r.restart(t, n, e),
            r) : (n = +n,
            e = null == e ? Ra() : +e,
            r.restart((function o(a) {
                a += i,
                r.restart(o, i += n, e),
                t(a)
            }
            ), n, e),
            r)
        }
        Oa.prototype = Da.prototype = {
            constructor: Oa,
            restart: function(t, n, e) {
                if ("function" != typeof t)
                    throw new TypeError("callback is not a function");
                e = (null == e ? Ra() : +e) + (null == n ? 0 : +n),
                this._next || wa === this || (wa ? wa._next = this : ba = this,
                wa = this),
                this._call = t,
                this._time = e,
                Ya()
            },
            stop: function() {
                this._call && (this._call = null,
                this._time = 1 / 0,
                Ya())
            }
        };
        var Xa = new Date
          , Ga = new Date;
        function Va(t, n, e, r) {
            function i(n) {
                return t(n = new Date(+n)),
                n
            }
            return i.floor = i,
            i.ceil = function(e) {
                return t(e = new Date(e - 1)),
                n(e, 1),
                t(e),
                e
            }
            ,
            i.round = function(t) {
                var n = i(t)
                  , e = i.ceil(t);
                return t - n < e - t ? n : e
            }
            ,
            i.offset = function(t, e) {
                return n(t = new Date(+t), null == e ? 1 : Math.floor(e)),
                t
            }
            ,
            i.range = function(e, r, o) {
                var a = [];
                if (e = i.ceil(e),
                o = null == o ? 1 : Math.floor(o),
                !(e < r && o > 0))
                    return a;
                do {
                    a.push(new Date(+e))
                } while (n(e, o),
                t(e),
                e < r);
                return a
            }
            ,
            i.filter = function(e) {
                return Va((function(n) {
                    for (; t(n),
                    !e(n); )
                        n.setTime(n - 1)
                }
                ), (function(t, r) {
                    for (; --r >= 0; )
                        for (; n(t, 1),
                        !e(t); )
                            ;
                }
                ))
            }
            ,
            e && (i.count = function(n, r) {
                return Xa.setTime(+n),
                Ga.setTime(+r),
                t(Xa),
                t(Ga),
                Math.floor(e(Xa, Ga))
            }
            ,
            i.every = function(t) {
                return t = Math.floor(t),
                isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function(n) {
                    return r(n) % t == 0
                }
                : function(n) {
                    return i.count(0, n) % t == 0
                }
                ) : i : null
            }
            ),
            i
        }
        var Wa = Va((function() {}
        ), (function(t, n) {
            t.setTime(+t + n)
        }
        ), (function(t, n) {
            return n - t
        }
        ));
        Wa.every = function(t) {
            return t = Math.floor(t),
            isFinite(t) && t > 0 ? t > 1 ? Va((function(n) {
                n.setTime(Math.floor(n / t) * t)
            }
            ), (function(n, e) {
                n.setTime(+n + e * t)
            }
            ), (function(n, e) {
                return (e - n) / t
            }
            )) : Wa : null
        }
        ;
        var $a = Wa.range
          , Za = 1e3
          , Ja = 6e4
          , Qa = 36e5
          , Ka = 864e5
          , tu = 6048e5
          , nu = Va((function(t) {
            t.setTime(Math.floor(t / Za) * Za)
        }
        ), (function(t, n) {
            t.setTime(+t + n * Za)
        }
        ), (function(t, n) {
            return (n - t) / Za
        }
        ), (function(t) {
            return t.getUTCSeconds()
        }
        ))
          , eu = nu.range
          , ru = Va((function(t) {
            t.setTime(Math.floor(t / Ja) * Ja)
        }
        ), (function(t, n) {
            t.setTime(+t + n * Ja)
        }
        ), (function(t, n) {
            return (n - t) / Ja
        }
        ), (function(t) {
            return t.getMinutes()
        }
        ))
          , iu = ru.range
          , ou = Va((function(t) {
            var n = t.getTimezoneOffset() * Ja % Qa;
            n < 0 && (n += Qa),
            t.setTime(Math.floor((+t - n) / Qa) * Qa + n)
        }
        ), (function(t, n) {
            t.setTime(+t + n * Qa)
        }
        ), (function(t, n) {
            return (n - t) / Qa
        }
        ), (function(t) {
            return t.getHours()
        }
        ))
          , au = ou.range
          , uu = Va((function(t) {
            t.setHours(0, 0, 0, 0)
        }
        ), (function(t, n) {
            t.setDate(t.getDate() + n)
        }
        ), (function(t, n) {
            return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Ja) / Ka
        }
        ), (function(t) {
            return t.getDate() - 1
        }
        ))
          , cu = uu.range;
        function su(t) {
            return Va((function(n) {
                n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7),
                n.setHours(0, 0, 0, 0)
            }
            ), (function(t, n) {
                t.setDate(t.getDate() + 7 * n)
            }
            ), (function(t, n) {
                return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * Ja) / tu
            }
            ))
        }
        var lu = su(0)
          , fu = su(1)
          , hu = su(2)
          , pu = su(3)
          , du = su(4)
          , vu = su(5)
          , gu = su(6)
          , yu = lu.range
          , _u = fu.range
          , mu = hu.range
          , xu = pu.range
          , bu = du.range
          , wu = vu.range
          , Mu = gu.range
          , ku = Va((function(t) {
            t.setDate(1),
            t.setHours(0, 0, 0, 0)
        }
        ), (function(t, n) {
            t.setMonth(t.getMonth() + n)
        }
        ), (function(t, n) {
            return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
        }
        ), (function(t) {
            return t.getMonth()
        }
        ))
          , Eu = ku.range
          , Su = Va((function(t) {
            t.setMonth(0, 1),
            t.setHours(0, 0, 0, 0)
        }
        ), (function(t, n) {
            t.setFullYear(t.getFullYear() + n)
        }
        ), (function(t, n) {
            return n.getFullYear() - t.getFullYear()
        }
        ), (function(t) {
            return t.getFullYear()
        }
        ));
        Su.every = function(t) {
            return isFinite(t = Math.floor(t)) && t > 0 ? Va((function(n) {
                n.setFullYear(Math.floor(n.getFullYear() / t) * t),
                n.setMonth(0, 1),
                n.setHours(0, 0, 0, 0)
            }
            ), (function(n, e) {
                n.setFullYear(n.getFullYear() + e * t)
            }
            )) : null
        }
        ;
        var Au = Su.range
          , Nu = Va((function(t) {
            t.setUTCSeconds(0, 0)
        }
        ), (function(t, n) {
            t.setTime(+t + n * Ja)
        }
        ), (function(t, n) {
            return (n - t) / Ja
        }
        ), (function(t) {
            return t.getUTCMinutes()
        }
        ))
          , Tu = Nu.range
          , Cu = Va((function(t) {
            t.setUTCMinutes(0, 0, 0)
        }
        ), (function(t, n) {
            t.setTime(+t + n * Qa)
        }
        ), (function(t, n) {
            return (n - t) / Qa
        }
        ), (function(t) {
            return t.getUTCHours()
        }
        ))
          , Pu = Cu.range
          , zu = Va((function(t) {
            t.setUTCHours(0, 0, 0, 0)
        }
        ), (function(t, n) {
            t.setUTCDate(t.getUTCDate() + n)
        }
        ), (function(t, n) {
            return (n - t) / Ka
        }
        ), (function(t) {
            return t.getUTCDate() - 1
        }
        ))
          , Lu = zu.range;
        function Ru(t) {
            return Va((function(n) {
                n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7),
                n.setUTCHours(0, 0, 0, 0)
            }
            ), (function(t, n) {
                t.setUTCDate(t.getUTCDate() + 7 * n)
            }
            ), (function(t, n) {
                return (n - t) / tu
            }
            ))
        }
        var qu = Ru(0)
          , Ou = Ru(1)
          , Du = Ru(2)
          , Uu = Ru(3)
          , ju = Ru(4)
          , Iu = Ru(5)
          , Fu = Ru(6)
          , Yu = qu.range
          , Bu = Ou.range
          , Hu = Du.range
          , Xu = Uu.range
          , Gu = ju.range
          , Vu = Iu.range
          , Wu = Fu.range
          , $u = Va((function(t) {
            t.setUTCDate(1),
            t.setUTCHours(0, 0, 0, 0)
        }
        ), (function(t, n) {
            t.setUTCMonth(t.getUTCMonth() + n)
        }
        ), (function(t, n) {
            return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear())
        }
        ), (function(t) {
            return t.getUTCMonth()
        }
        ))
          , Zu = $u.range
          , Ju = Va((function(t) {
            t.setUTCMonth(0, 1),
            t.setUTCHours(0, 0, 0, 0)
        }
        ), (function(t, n) {
            t.setUTCFullYear(t.getUTCFullYear() + n)
        }
        ), (function(t, n) {
            return n.getUTCFullYear() - t.getUTCFullYear()
        }
        ), (function(t) {
            return t.getUTCFullYear()
        }
        ));
        Ju.every = function(t) {
            return isFinite(t = Math.floor(t)) && t > 0 ? Va((function(n) {
                n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t),
                n.setUTCMonth(0, 1),
                n.setUTCHours(0, 0, 0, 0)
            }
            ), (function(n, e) {
                n.setUTCFullYear(n.getUTCFullYear() + e * t)
            }
            )) : null
        }
        ;
        var Qu, Ku = Ju.range;
        function tc(t, n) {
            if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0)
                return null;
            var e, r = t.slice(0, e);
            return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
        }
        function nc(t) {
            return (t = tc(Math.abs(t))) ? t[1] : NaN
        }
        function ec(t, n) {
            return function(e, r) {
                for (var i = e.length, o = [], a = 0, u = t[0], c = 0; i > 0 && u > 0 && (c + u + 1 > r && (u = Math.max(1, r - c)),
                o.push(e.substring(i -= u, i + u)),
                !((c += u + 1) > r)); )
                    u = t[a = (a + 1) % t.length];
                return o.reverse().join(n)
            }
        }
        function rc(t, n) {
            t: for (var e, r = (t = t.toPrecision(n)).length, i = 1, o = -1; i < r; ++i)
                switch (t[i]) {
                case ".":
                    o = e = i;
                    break;
                case "0":
                    0 === o && (o = i),
                    e = i;
                    break;
                case "e":
                    break t;
                default:
                    o > 0 && (o = 0)
                }
            return o > 0 ? t.slice(0, o) + t.slice(e + 1) : t
        }
        function ic(t, n) {
            var e = tc(t, n);
            if (!e)
                return t + "";
            var r = e[0]
              , i = e[1]
              , o = i - (Qu = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1
              , a = r.length;
            return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + tc(t, Math.max(0, n + o - 1))[0]
        }
        function oc(t, n) {
            var e = tc(t, n);
            if (!e)
                return t + "";
            var r = e[0]
              , i = e[1];
            return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
        }
        var ac = {
            "": rc,
            "%": function(t, n) {
                return (100 * t).toFixed(n)
            },
            b: function(t) {
                return Math.round(t).toString(2)
            },
            c: function(t) {
                return t + ""
            },
            d: function(t) {
                return Math.round(t).toString(10)
            },
            e: function(t, n) {
                return t.toExponential(n)
            },
            f: function(t, n) {
                return t.toFixed(n)
            },
            g: function(t, n) {
                return t.toPrecision(n)
            },
            o: function(t) {
                return Math.round(t).toString(8)
            },
            p: function(t, n) {
                return oc(100 * t, n)
            },
            r: oc,
            s: ic,
            X: function(t) {
                return Math.round(t).toString(16).toUpperCase()
            },
            x: function(t) {
                return Math.round(t).toString(16)
            }
        }
          , uc = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
        function cc(t) {
            return new sc(t)
        }
        function sc(t) {
            if (!(n = uc.exec(t)))
                throw new Error("invalid format: " + t);
            var n, e = n[1] || " ", r = n[2] || ">", i = n[3] || "-", o = n[4] || "", a = !!n[5], u = n[6] && +n[6], c = !!n[7], s = n[8] && +n[8].slice(1), l = n[9] || "";
            "n" === l ? (c = !0,
            l = "g") : ac[l] || (l = ""),
            (a || "0" === e && "=" === r) && (a = !0,
            e = "0",
            r = "="),
            this.fill = e,
            this.align = r,
            this.sign = i,
            this.symbol = o,
            this.zero = a,
            this.width = u,
            this.comma = c,
            this.precision = s,
            this.type = l
        }
        sc.prototype.toString = function() {
            return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + this.type
        }
        ;
        var lc, fc = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
        function hc(t) {
            return t
        }
        function pc(t) {
            var n = t.grouping && t.thousands ? ec(t.grouping, t.thousands) : hc
              , e = t.currency
              , r = t.decimal;
            function i(t) {
                var i = (t = cc(t)).fill
                  , o = t.align
                  , a = t.sign
                  , u = t.symbol
                  , c = t.zero
                  , s = t.width
                  , l = t.comma
                  , f = t.precision
                  , h = t.type
                  , p = "$" === u ? e[0] : "#" === u && /[boxX]/.test(h) ? "0" + h.toLowerCase() : ""
                  , d = "$" === u ? e[1] : /[%p]/.test(h) ? "%" : ""
                  , v = ac[h]
                  , g = !h || /[defgprs%]/.test(h);
                function y(t) {
                    var e, u, y, _ = p, m = d;
                    if ("c" === h)
                        m = v(t) + m,
                        t = "";
                    else {
                        var x = ((t = +t) < 0 || 1 / t < 0) && (t *= -1,
                        !0);
                        if (t = v(t, f),
                        x)
                            for (e = -1,
                            u = t.length,
                            x = !1; ++e < u; )
                                if (48 < (y = t.charCodeAt(e)) && y < 58 || "x" === h && 96 < y && y < 103 || "X" === h && 64 < y && y < 71) {
                                    x = !0;
                                    break
                                }
                        if (_ = (x ? "(" === a ? a : "-" : "-" === a || "(" === a ? "" : a) + _,
                        m = m + ("s" === h ? fc[8 + Qu / 3] : "") + (x && "(" === a ? ")" : ""),
                        g)
                            for (e = -1,
                            u = t.length; ++e < u; )
                                if (48 > (y = t.charCodeAt(e)) || y > 57) {
                                    m = (46 === y ? r + t.slice(e + 1) : t.slice(e)) + m,
                                    t = t.slice(0, e);
                                    break
                                }
                    }
                    l && !c && (t = n(t, 1 / 0));
                    var b = _.length + t.length + m.length
                      , w = b < s ? new Array(s - b + 1).join(i) : "";
                    switch (l && c && (t = n(w + t, w.length ? s - m.length : 1 / 0),
                    w = ""),
                    o) {
                    case "<":
                        return _ + t + m + w;
                    case "=":
                        return _ + w + t + m;
                    case "^":
                        return w.slice(0, b = w.length >> 1) + _ + t + m + w.slice(b)
                    }
                    return w + _ + t + m
                }
                return f = null == f ? h ? 6 : 12 : /[gprs]/.test(h) ? Math.max(1, Math.min(21, f)) : Math.max(0, Math.min(20, f)),
                y.toString = function() {
                    return t + ""
                }
                ,
                y
            }
            function o(t, n) {
                var e = i(((t = cc(t)).type = "f",
                t))
                  , r = 3 * Math.max(-8, Math.min(8, Math.floor(nc(n) / 3)))
                  , o = Math.pow(10, -r)
                  , a = fc[8 + r / 3];
                return function(t) {
                    return e(o * t) + a
                }
            }
            return {
                format: i,
                formatPrefix: o
            }
        }
        function dc(n) {
            return lc = pc(n),
            t.format = lc.format,
            t.formatPrefix = lc.formatPrefix,
            lc
        }
        function vc(t) {
            return Math.max(0, -nc(Math.abs(t)))
        }
        function gc(t, n) {
            return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(nc(n) / 3))) - nc(Math.abs(t)))
        }
        function yc(t, n) {
            return t = Math.abs(t),
            n = Math.abs(n) - t,
            Math.max(0, nc(n) - nc(t)) + 1
        }
        function _c(t) {
            if (0 <= t.y && t.y < 100) {
                var n = new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);
                return n.setFullYear(t.y),
                n
            }
            return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)
        }
        function mc(t) {
            if (0 <= t.y && t.y < 100) {
                var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
                return n.setUTCFullYear(t.y),
                n
            }
            return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
        }
        function xc(t) {
            return {
                y: t,
                m: 0,
                d: 1,
                H: 0,
                M: 0,
                S: 0,
                L: 0
            }
        }
        function bc(t) {
            var n = t.dateTime
              , e = t.date
              , r = t.time
              , i = t.periods
              , o = t.days
              , a = t.shortDays
              , u = t.months
              , c = t.shortMonths
              , s = Tc(i)
              , l = Cc(i)
              , f = Tc(o)
              , h = Cc(o)
              , p = Tc(a)
              , d = Cc(a)
              , v = Tc(u)
              , g = Cc(u)
              , y = Tc(c)
              , _ = Cc(c)
              , m = {
                a: L,
                A: R,
                b: q,
                B: O,
                c: null,
                d: Xc,
                e: Xc,
                H: Gc,
                I: Vc,
                j: Wc,
                L: $c,
                m: Zc,
                M: Jc,
                p: D,
                S: Qc,
                U: Kc,
                w: ts,
                W: ns,
                x: null,
                X: null,
                y: es,
                Y: rs,
                Z: is,
                "%": ms
            }
              , x = {
                a: U,
                A: j,
                b: I,
                B: F,
                c: null,
                d: os,
                e: os,
                H: as,
                I: us,
                j: cs,
                L: ss,
                m: ls,
                M: fs,
                p: Y,
                S: hs,
                U: ps,
                w: ds,
                W: vs,
                x: null,
                X: null,
                y: gs,
                Y: ys,
                Z: _s,
                "%": ms
            }
              , b = {
                a: S,
                A: A,
                b: N,
                B: T,
                c: C,
                d: Uc,
                e: Uc,
                H: Ic,
                I: Ic,
                j: jc,
                L: Bc,
                m: Dc,
                M: Fc,
                p: E,
                S: Yc,
                U: zc,
                w: Pc,
                W: Lc,
                x: P,
                X: z,
                y: qc,
                Y: Rc,
                Z: Oc,
                "%": Hc
            };
            function w(t, n) {
                return function(e) {
                    var r, i, o, a = [], u = -1, c = 0, s = t.length;
                    for (e instanceof Date || (e = new Date(+e)); ++u < s; )
                        37 === t.charCodeAt(u) && (a.push(t.slice(c, u)),
                        null != (i = Mc[r = t.charAt(++u)]) ? r = t.charAt(++u) : i = "e" === r ? " " : "0",
                        (o = n[r]) && (r = o(e, i)),
                        a.push(r),
                        c = u + 1);
                    return a.push(t.slice(c, u)),
                    a.join("")
                }
            }
            function M(t, n) {
                return function(e) {
                    var r = xc(1900);
                    if (k(r, t, e += "", 0) != e.length)
                        return null;
                    if ("p"in r && (r.H = r.H % 12 + 12 * r.p),
                    "W"in r || "U"in r) {
                        "w"in r || (r.w = "W"in r ? 1 : 0);
                        var i = "Z"in r ? mc(xc(r.y)).getUTCDay() : n(xc(r.y)).getDay();
                        r.m = 0,
                        r.d = "W"in r ? (r.w + 6) % 7 + 7 * r.W - (i + 5) % 7 : r.w + 7 * r.U - (i + 6) % 7
                    }
                    return "Z"in r ? (r.H += r.Z / 100 | 0,
                    r.M += r.Z % 100,
                    mc(r)) : n(r)
                }
            }
            function k(t, n, e, r) {
                for (var i, o, a = 0, u = n.length, c = e.length; a < u; ) {
                    if (r >= c)
                        return -1;
                    if (37 === (i = n.charCodeAt(a++))) {
                        if (i = n.charAt(a++),
                        !(o = b[i in Mc ? n.charAt(a++) : i]) || (r = o(t, e, r)) < 0)
                            return -1
                    } else if (i != e.charCodeAt(r++))
                        return -1
                }
                return r
            }
            function E(t, n, e) {
                var r = s.exec(n.slice(e));
                return r ? (t.p = l[r[0].toLowerCase()],
                e + r[0].length) : -1
            }
            function S(t, n, e) {
                var r = p.exec(n.slice(e));
                return r ? (t.w = d[r[0].toLowerCase()],
                e + r[0].length) : -1
            }
            function A(t, n, e) {
                var r = f.exec(n.slice(e));
                return r ? (t.w = h[r[0].toLowerCase()],
                e + r[0].length) : -1
            }
            function N(t, n, e) {
                var r = y.exec(n.slice(e));
                return r ? (t.m = _[r[0].toLowerCase()],
                e + r[0].length) : -1
            }
            function T(t, n, e) {
                var r = v.exec(n.slice(e));
                return r ? (t.m = g[r[0].toLowerCase()],
                e + r[0].length) : -1
            }
            function C(t, e, r) {
                return k(t, n, e, r)
            }
            function P(t, n, r) {
                return k(t, e, n, r)
            }
            function z(t, n, e) {
                return k(t, r, n, e)
            }
            function L(t) {
                return a[t.getDay()]
            }
            function R(t) {
                return o[t.getDay()]
            }
            function q(t) {
                return c[t.getMonth()]
            }
            function O(t) {
                return u[t.getMonth()]
            }
            function D(t) {
                return i[+(t.getHours() >= 12)]
            }
            function U(t) {
                return a[t.getUTCDay()]
            }
            function j(t) {
                return o[t.getUTCDay()]
            }
            function I(t) {
                return c[t.getUTCMonth()]
            }
            function F(t) {
                return u[t.getUTCMonth()]
            }
            function Y(t) {
                return i[+(t.getUTCHours() >= 12)]
            }
            return m.x = w(e, m),
            m.X = w(r, m),
            m.c = w(n, m),
            x.x = w(e, x),
            x.X = w(r, x),
            x.c = w(n, x),
            {
                format: function(t) {
                    var n = w(t += "", m);
                    return n.toString = function() {
                        return t
                    }
                    ,
                    n
                },
                parse: function(t) {
                    var n = M(t += "", _c);
                    return n.toString = function() {
                        return t
                    }
                    ,
                    n
                },
                utcFormat: function(t) {
                    var n = w(t += "", x);
                    return n.toString = function() {
                        return t
                    }
                    ,
                    n
                },
                utcParse: function(t) {
                    var n = M(t, mc);
                    return n.toString = function() {
                        return t
                    }
                    ,
                    n
                }
            }
        }
        t.format,
        t.formatPrefix,
        dc({
            decimal: ".",
            thousands: ",",
            grouping: [3],
            currency: ["$", ""]
        });
        var wc, Mc = {
            "-": "",
            _: " ",
            0: "0"
        }, kc = /^\s*\d+/, Ec = /^%/, Sc = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
        function Ac(t, n, e) {
            var r = t < 0 ? "-" : ""
              , i = (r ? -t : t) + ""
              , o = i.length;
            return r + (o < e ? new Array(e - o + 1).join(n) + i : i)
        }
        function Nc(t) {
            return t.replace(Sc, "\\$&")
        }
        function Tc(t) {
            return new RegExp("^(?:" + t.map(Nc).join("|") + ")","i")
        }
        function Cc(t) {
            for (var n = {}, e = -1, r = t.length; ++e < r; )
                n[t[e].toLowerCase()] = e;
            return n
        }
        function Pc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 1));
            return r ? (t.w = +r[0],
            e + r[0].length) : -1
        }
        function zc(t, n, e) {
            var r = kc.exec(n.slice(e));
            return r ? (t.U = +r[0],
            e + r[0].length) : -1
        }
        function Lc(t, n, e) {
            var r = kc.exec(n.slice(e));
            return r ? (t.W = +r[0],
            e + r[0].length) : -1
        }
        function Rc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 4));
            return r ? (t.y = +r[0],
            e + r[0].length) : -1
        }
        function qc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 2));
            return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3),
            e + r[0].length) : -1
        }
        function Oc(t, n, e) {
            var r = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(n.slice(e, e + 6));
            return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")),
            e + r[0].length) : -1
        }
        function Dc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 2));
            return r ? (t.m = r[0] - 1,
            e + r[0].length) : -1
        }
        function Uc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 2));
            return r ? (t.d = +r[0],
            e + r[0].length) : -1
        }
        function jc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 3));
            return r ? (t.m = 0,
            t.d = +r[0],
            e + r[0].length) : -1
        }
        function Ic(t, n, e) {
            var r = kc.exec(n.slice(e, e + 2));
            return r ? (t.H = +r[0],
            e + r[0].length) : -1
        }
        function Fc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 2));
            return r ? (t.M = +r[0],
            e + r[0].length) : -1
        }
        function Yc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 2));
            return r ? (t.S = +r[0],
            e + r[0].length) : -1
        }
        function Bc(t, n, e) {
            var r = kc.exec(n.slice(e, e + 3));
            return r ? (t.L = +r[0],
            e + r[0].length) : -1
        }
        function Hc(t, n, e) {
            var r = Ec.exec(n.slice(e, e + 1));
            return r ? e + r[0].length : -1
        }
        function Xc(t, n) {
            return Ac(t.getDate(), n, 2)
        }
        function Gc(t, n) {
            return Ac(t.getHours(), n, 2)
        }
        function Vc(t, n) {
            return Ac(t.getHours() % 12 || 12, n, 2)
        }
        function Wc(t, n) {
            return Ac(1 + uu.count(Su(t), t), n, 3)
        }
        function $c(t, n) {
            return Ac(t.getMilliseconds(), n, 3)
        }
        function Zc(t, n) {
            return Ac(t.getMonth() + 1, n, 2)
        }
        function Jc(t, n) {
            return Ac(t.getMinutes(), n, 2)
        }
        function Qc(t, n) {
            return Ac(t.getSeconds(), n, 2)
        }
        function Kc(t, n) {
            return Ac(lu.count(Su(t), t), n, 2)
        }
        function ts(t) {
            return t.getDay()
        }
        function ns(t, n) {
            return Ac(fu.count(Su(t), t), n, 2)
        }
        function es(t, n) {
            return Ac(t.getFullYear() % 100, n, 2)
        }
        function rs(t, n) {
            return Ac(t.getFullYear() % 1e4, n, 4)
        }
        function is(t) {
            var n = t.getTimezoneOffset();
            return (n > 0 ? "-" : (n *= -1,
            "+")) + Ac(n / 60 | 0, "0", 2) + Ac(n % 60, "0", 2)
        }
        function os(t, n) {
            return Ac(t.getUTCDate(), n, 2)
        }
        function as(t, n) {
            return Ac(t.getUTCHours(), n, 2)
        }
        function us(t, n) {
            return Ac(t.getUTCHours() % 12 || 12, n, 2)
        }
        function cs(t, n) {
            return Ac(1 + zu.count(Ju(t), t), n, 3)
        }
        function ss(t, n) {
            return Ac(t.getUTCMilliseconds(), n, 3)
        }
        function ls(t, n) {
            return Ac(t.getUTCMonth() + 1, n, 2)
        }
        function fs(t, n) {
            return Ac(t.getUTCMinutes(), n, 2)
        }
        function hs(t, n) {
            return Ac(t.getUTCSeconds(), n, 2)
        }
        function ps(t, n) {
            return Ac(qu.count(Ju(t), t), n, 2)
        }
        function ds(t) {
            return t.getUTCDay()
        }
        function vs(t, n) {
            return Ac(Ou.count(Ju(t), t), n, 2)
        }
        function gs(t, n) {
            return Ac(t.getUTCFullYear() % 100, n, 2)
        }
        function ys(t, n) {
            return Ac(t.getUTCFullYear() % 1e4, n, 4)
        }
        function _s() {
            return "+0000"
        }
        function ms() {
            return "%"
        }
        function xs(n) {
            return wc = bc(n),
            t.timeFormat = wc.format,
            t.timeParse = wc.parse,
            t.utcFormat = wc.utcFormat,
            t.utcParse = wc.utcParse,
            wc
        }
        t.timeFormat,
        t.timeParse,
        t.utcFormat,
        t.utcParse,
        xs({
            dateTime: "%x, %X",
            date: "%-m/%-d/%Y",
            time: "%-I:%M:%S %p",
            periods: ["AM", "PM"],
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        });
        var bs = "%Y-%m-%dT%H:%M:%S.%LZ";
        function ws(t) {
            return t.toISOString()
        }
        var Ms = Date.prototype.toISOString ? ws : t.utcFormat(bs);
        function ks(t) {
            var n = new Date(t);
            return isNaN(n) ? null : n
        }
        var Es = +new Date("2000-01-01T00:00:00.000Z") ? ks : t.utcParse(bs)
          , Ss = Array.prototype
          , As = Ss.map
          , Ns = Ss.slice
          , Ts = {
            name: "implicit"
        };
        function Cs(t) {
            var n = H()
              , e = []
              , r = Ts;
            function i(i) {
                var o = i + ""
                  , a = n.get(o);
                if (!a) {
                    if (r !== Ts)
                        return r;
                    n.set(o, a = e.push(i))
                }
                return t[(a - 1) % t.length]
            }
            return t = null == t ? [] : Ns.call(t),
            i.domain = function(t) {
                if (!arguments.length)
                    return e.slice();
                e = [],
                n = H();
                for (var r, o, a = -1, u = t.length; ++a < u; )
                    n.has(o = (r = t[a]) + "") || n.set(o, e.push(r));
                return i
            }
            ,
            i.range = function(n) {
                return arguments.length ? (t = Ns.call(n),
                i) : t.slice()
            }
            ,
            i.unknown = function(t) {
                return arguments.length ? (r = t,
                i) : r
            }
            ,
            i.copy = function() {
                return Cs().domain(e).range(t).unknown(r)
            }
            ,
            i
        }
        function Ps() {
            var t, n, e = Cs().unknown(void 0), r = e.domain, i = e.range, o = [0, 1], a = !1, u = 0, c = 0, s = .5;
            function l() {
                var e = r().length
                  , l = o[1] < o[0]
                  , f = o[l - 0]
                  , h = o[1 - l];
                t = (h - f) / Math.max(1, e - u + 2 * c),
                a && (t = Math.floor(t)),
                f += (h - f - t * (e - u)) * s,
                n = t * (1 - u),
                a && (f = Math.round(f),
                n = Math.round(n));
                var p = _(e).map((function(n) {
                    return f + t * n
                }
                ));
                return i(l ? p.reverse() : p)
            }
            return delete e.unknown,
            e.domain = function(t) {
                return arguments.length ? (r(t),
                l()) : r()
            }
            ,
            e.range = function(t) {
                return arguments.length ? (o = [+t[0], +t[1]],
                l()) : o.slice()
            }
            ,
            e.rangeRound = function(t) {
                return o = [+t[0], +t[1]],
                a = !0,
                l()
            }
            ,
            e.bandwidth = function() {
                return n
            }
            ,
            e.step = function() {
                return t
            }
            ,
            e.round = function(t) {
                return arguments.length ? (a = !!t,
                l()) : a
            }
            ,
            e.padding = function(t) {
                return arguments.length ? (u = c = Math.max(0, Math.min(1, t)),
                l()) : u
            }
            ,
            e.paddingInner = function(t) {
                return arguments.length ? (u = Math.max(0, Math.min(1, t)),
                l()) : u
            }
            ,
            e.paddingOuter = function(t) {
                return arguments.length ? (c = Math.max(0, Math.min(1, t)),
                l()) : c
            }
            ,
            e.align = function(t) {
                return arguments.length ? (s = Math.max(0, Math.min(1, t)),
                l()) : s
            }
            ,
            e.copy = function() {
                return Ps().domain(r()).range(o).round(a).paddingInner(u).paddingOuter(c).align(s)
            }
            ,
            l()
        }
        function zs(t) {
            var n = t.copy;
            return t.padding = t.paddingOuter,
            delete t.paddingInner,
            delete t.paddingOuter,
            t.copy = function() {
                return zs(n())
            }
            ,
            t
        }
        function Ls() {
            return zs(Ps().paddingInner(1))
        }
        function Rs(t) {
            return function() {
                return t
            }
        }
        function qs(t) {
            return +t
        }
        var Os = [0, 1];
        function Ds(t, n) {
            return (n -= t = +t) ? function(e) {
                return (e - t) / n
            }
            : Rs(n)
        }
        function Us(t) {
            return function(n, e) {
                var r = t(n = +n, e = +e);
                return function(t) {
                    return t <= n ? 0 : t >= e ? 1 : r(t)
                }
            }
        }
        function js(t) {
            return function(n, e) {
                var r = t(n = +n, e = +e);
                return function(t) {
                    return t <= 0 ? n : t >= 1 ? e : r(t)
                }
            }
        }
        function Is(t, n, e, r) {
            var i = t[0]
              , o = t[1]
              , a = n[0]
              , u = n[1];
            return o < i ? (i = e(o, i),
            a = r(u, a)) : (i = e(i, o),
            a = r(a, u)),
            function(t) {
                return a(i(t))
            }
        }
        function Fs(t, n, e, r) {
            var i = Math.min(t.length, n.length) - 1
              , o = new Array(i)
              , u = new Array(i)
              , c = -1;
            for (t[i] < t[0] && (t = t.slice().reverse(),
            n = n.slice().reverse()); ++c < i; )
                o[c] = e(t[c], t[c + 1]),
                u[c] = r(n[c], n[c + 1]);
            return function(n) {
                var e = a(t, n, 1, i) - 1;
                return u[e](o[e](n))
            }
        }
        function Ys(t, n) {
            return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
        }
        function Bs(t, n) {
            var e, r, i, o = Os, a = Os, u = fo, c = !1;
            function s() {
                return e = Math.min(o.length, a.length) > 2 ? Fs : Is,
                r = i = null,
                l
            }
            function l(n) {
                return (r || (r = e(o, a, c ? Us(t) : t, u)))(+n)
            }
            return l.invert = function(t) {
                return (i || (i = e(a, o, Ds, c ? js(n) : n)))(+t)
            }
            ,
            l.domain = function(t) {
                return arguments.length ? (o = As.call(t, qs),
                s()) : o.slice()
            }
            ,
            l.range = function(t) {
                return arguments.length ? (a = Ns.call(t),
                s()) : a.slice()
            }
            ,
            l.rangeRound = function(t) {
                return a = Ns.call(t),
                u = ho,
                s()
            }
            ,
            l.clamp = function(t) {
                return arguments.length ? (c = !!t,
                s()) : c
            }
            ,
            l.interpolate = function(t) {
                return arguments.length ? (u = t,
                s()) : u
            }
            ,
            s()
        }
        function Hs(n, e, r) {
            var i, o = n[0], a = n[n.length - 1], u = M(o, a, null == e ? 10 : e);
            switch ((r = cc(null == r ? ",f" : r)).type) {
            case "s":
                var c = Math.max(Math.abs(o), Math.abs(a));
                return null != r.precision || isNaN(i = gc(u, c)) || (r.precision = i),
                t.formatPrefix(r, c);
            case "":
            case "e":
            case "g":
            case "p":
            case "r":
                null != r.precision || isNaN(i = yc(u, Math.max(Math.abs(o), Math.abs(a)))) || (r.precision = i - ("e" === r.type));
                break;
            case "f":
            case "%":
                null != r.precision || isNaN(i = vc(u)) || (r.precision = i - 2 * ("%" === r.type))
            }
            return t.format(r)
        }
        function Xs(t) {
            var n = t.domain;
            return t.ticks = function(t) {
                var e = n();
                return w(e[0], e[e.length - 1], null == t ? 10 : t)
            }
            ,
            t.tickFormat = function(t, e) {
                return Hs(n(), t, e)
            }
            ,
            t.nice = function(e) {
                var r = n()
                  , i = r.length - 1
                  , o = null == e ? 10 : e
                  , a = r[0]
                  , u = r[i]
                  , c = M(a, u, o);
                return c && (c = M(Math.floor(a / c) * c, Math.ceil(u / c) * c, o),
                r[0] = Math.floor(a / c) * c,
                r[i] = Math.ceil(u / c) * c,
                n(r)),
                t
            }
            ,
            t
        }
        function Gs() {
            var t = Bs(Ds, io);
            return t.copy = function() {
                return Ys(t, Gs())
            }
            ,
            Xs(t)
        }
        function Vs() {
            var t = [0, 1];
            function n(t) {
                return +t
            }
            return n.invert = n,
            n.domain = n.range = function(e) {
                return arguments.length ? (t = As.call(e, qs),
                n) : t.slice()
            }
            ,
            n.copy = function() {
                return Vs().domain(t)
            }
            ,
            Xs(n)
        }
        function Ws(t, n) {
            var e, r = 0, i = (t = t.slice()).length - 1, o = t[r], a = t[i];
            return a < o && (e = r,
            r = i,
            i = e,
            e = o,
            o = a,
            a = e),
            t[r] = n.floor(o),
            t[i] = n.ceil(a),
            t
        }
        function $s(t, n) {
            return (n = Math.log(n / t)) ? function(e) {
                return Math.log(e / t) / n
            }
            : Rs(n)
        }
        function Zs(t, n) {
            return t < 0 ? function(e) {
                return -Math.pow(-n, e) * Math.pow(-t, 1 - e)
            }
            : function(e) {
                return Math.pow(n, e) * Math.pow(t, 1 - e)
            }
        }
        function Js(t) {
            return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
        }
        function Qs(t) {
            return 10 === t ? Js : t === Math.E ? Math.exp : function(n) {
                return Math.pow(t, n)
            }
        }
        function Ks(t) {
            return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t),
            function(n) {
                return Math.log(n) / t
            }
            )
        }
        function tl(t) {
            return function(n) {
                return -t(-n)
            }
        }
        function nl() {
            var n = Bs($s, Zs).domain([1, 10])
              , e = n.domain
              , r = 10
              , i = Ks(10)
              , o = Qs(10);
            function a() {
                return i = Ks(r),
                o = Qs(r),
                e()[0] < 0 && (i = tl(i),
                o = tl(o)),
                n
            }
            return n.base = function(t) {
                return arguments.length ? (r = +t,
                a()) : r
            }
            ,
            n.domain = function(t) {
                return arguments.length ? (e(t),
                a()) : e()
            }
            ,
            n.ticks = function(t) {
                var n, a = e(), u = a[0], c = a[a.length - 1];
                (n = c < u) && (h = u,
                u = c,
                c = h);
                var s, l, f, h = i(u), p = i(c), d = null == t ? 10 : +t, v = [];
                if (!(r % 1) && p - h < d) {
                    if (h = Math.round(h) - 1,
                    p = Math.round(p) + 1,
                    u > 0) {
                        for (; h < p; ++h)
                            for (l = 1,
                            s = o(h); l < r; ++l)
                                if (!((f = s * l) < u)) {
                                    if (f > c)
                                        break;
                                    v.push(f)
                                }
                    } else
                        for (; h < p; ++h)
                            for (l = r - 1,
                            s = o(h); l >= 1; --l)
                                if (!((f = s * l) < u)) {
                                    if (f > c)
                                        break;
                                    v.push(f)
                                }
                } else
                    v = w(h, p, Math.min(p - h, d)).map(o);
                return n ? v.reverse() : v
            }
            ,
            n.tickFormat = function(e, a) {
                if (null == a && (a = 10 === r ? ".0e" : ","),
                "function" != typeof a && (a = t.format(a)),
                e === 1 / 0)
                    return a;
                null == e && (e = 10);
                var u = Math.max(1, r * e / n.ticks().length);
                return function(t) {
                    var n = t / o(Math.round(i(t)));
                    return n * r < r - .5 && (n *= r),
                    n <= u ? a(t) : ""
                }
            }
            ,
            n.nice = function() {
                return e(Ws(e(), {
                    floor: function(t) {
                        return o(Math.floor(i(t)))
                    },
                    ceil: function(t) {
                        return o(Math.ceil(i(t)))
                    }
                }))
            }
            ,
            n.copy = function() {
                return Ys(n, nl().base(r))
            }
            ,
            n
        }
        function el(t, n) {
            return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n)
        }
        function rl() {
            var t = 1
              , n = Bs(r, i)
              , e = n.domain;
            function r(n, e) {
                return (e = el(e, t) - (n = el(n, t))) ? function(r) {
                    return (el(r, t) - n) / e
                }
                : Rs(e)
            }
            function i(n, e) {
                return e = el(e, t) - (n = el(n, t)),
                function(r) {
                    return el(n + e * r, 1 / t)
                }
            }
            return n.exponent = function(n) {
                return arguments.length ? (t = +n,
                e(e())) : t
            }
            ,
            n.copy = function() {
                return Ys(n, rl().exponent(t))
            }
            ,
            Xs(n)
        }
        function il() {
            return rl().exponent(.5)
        }
        function ol() {
            var t = []
              , n = []
              , r = [];
            function i() {
                var e = 0
                  , i = Math.max(1, n.length);
                for (r = new Array(i - 1); ++e < i; )
                    r[e - 1] = S(t, e / i);
                return o
            }
            function o(t) {
                if (!isNaN(t = +t))
                    return n[a(r, t)]
            }
            return o.invertExtent = function(e) {
                var i = n.indexOf(e);
                return i < 0 ? [NaN, NaN] : [i > 0 ? r[i - 1] : t[0], i < r.length ? r[i] : t[t.length - 1]]
            }
            ,
            o.domain = function(n) {
                if (!arguments.length)
                    return t.slice();
                t = [];
                for (var r, o = 0, a = n.length; o < a; ++o)
                    null == (r = n[o]) || isNaN(r = +r) || t.push(r);
                return t.sort(e),
                i()
            }
            ,
            o.range = function(t) {
                return arguments.length ? (n = Ns.call(t),
                i()) : n.slice()
            }
            ,
            o.quantiles = function() {
                return r.slice()
            }
            ,
            o.copy = function() {
                return ol().domain(t).range(n)
            }
            ,
            o
        }
        function al() {
            var t = 0
              , n = 1
              , e = 1
              , r = [.5]
              , i = [0, 1];
            function o(t) {
                if (t <= t)
                    return i[a(r, t, 0, e)]
            }
            function u() {
                var i = -1;
                for (r = new Array(e); ++i < e; )
                    r[i] = ((i + 1) * n - (i - e) * t) / (e + 1);
                return o
            }
            return o.domain = function(e) {
                return arguments.length ? (t = +e[0],
                n = +e[1],
                u()) : [t, n]
            }
            ,
            o.range = function(t) {
                return arguments.length ? (e = (i = Ns.call(t)).length - 1,
                u()) : i.slice()
            }
            ,
            o.invertExtent = function(o) {
                var a = i.indexOf(o);
                return a < 0 ? [NaN, NaN] : a < 1 ? [t, r[0]] : a >= e ? [r[e - 1], n] : [r[a - 1], r[a]]
            }
            ,
            o.copy = function() {
                return al().domain([t, n]).range(i)
            }
            ,
            Xs(o)
        }
        function ul() {
            var t = [.5]
              , n = [0, 1]
              , e = 1;
            function r(r) {
                if (r <= r)
                    return n[a(t, r, 0, e)]
            }
            return r.domain = function(i) {
                return arguments.length ? (t = Ns.call(i),
                e = Math.min(t.length, n.length - 1),
                r) : t.slice()
            }
            ,
            r.range = function(i) {
                return arguments.length ? (n = Ns.call(i),
                e = Math.min(t.length, n.length - 1),
                r) : n.slice()
            }
            ,
            r.invertExtent = function(e) {
                var r = n.indexOf(e);
                return [t[r - 1], t[r]]
            }
            ,
            r.copy = function() {
                return ul().domain(t).range(n)
            }
            ,
            r
        }
        var cl = 1e3
          , sl = 60 * cl
          , ll = 60 * sl
          , fl = 24 * ll
          , hl = 7 * fl
          , pl = 30 * fl
          , dl = 365 * fl;
        function vl(t) {
            return new Date(t)
        }
        function gl(t) {
            return t instanceof Date ? +t : +new Date(+t)
        }
        function yl(t, n, e, i, o, a, u, c, s) {
            var l = Bs(Ds, io)
              , f = l.invert
              , h = l.domain
              , p = s(".%L")
              , d = s(":%S")
              , v = s("%I:%M")
              , g = s("%I %p")
              , y = s("%a %d")
              , _ = s("%b %d")
              , m = s("%B")
              , x = s("%Y")
              , b = [[u, 1, cl], [u, 5, 5 * cl], [u, 15, 15 * cl], [u, 30, 30 * cl], [a, 1, sl], [a, 5, 5 * sl], [a, 15, 15 * sl], [a, 30, 30 * sl], [o, 1, ll], [o, 3, 3 * ll], [o, 6, 6 * ll], [o, 12, 12 * ll], [i, 1, fl], [i, 2, 2 * fl], [e, 1, hl], [n, 1, pl], [n, 3, 3 * pl], [t, 1, dl]];
            function w(r) {
                return (u(r) < r ? p : a(r) < r ? d : o(r) < r ? v : i(r) < r ? g : n(r) < r ? e(r) < r ? y : _ : t(r) < r ? m : x)(r)
            }
            function k(n, e, i, o) {
                if (null == n && (n = 10),
                "number" == typeof n) {
                    var a = Math.abs(i - e) / n
                      , u = r((function(t) {
                        return t[2]
                    }
                    )).right(b, a);
                    u === b.length ? (o = M(e / dl, i / dl, n),
                    n = t) : u ? (o = (u = b[a / b[u - 1][2] < b[u][2] / a ? u - 1 : u])[1],
                    n = u[0]) : (o = M(e, i, n),
                    n = c)
                }
                return null == o ? n : n.every(o)
            }
            return l.invert = function(t) {
                return new Date(f(t))
            }
            ,
            l.domain = function(t) {
                return arguments.length ? h(As.call(t, gl)) : h().map(vl)
            }
            ,
            l.ticks = function(t, n) {
                var e, r = h(), i = r[0], o = r[r.length - 1], a = o < i;
                return a && (e = i,
                i = o,
                o = e),
                e = (e = k(t, i, o, n)) ? e.range(i, o + 1) : [],
                a ? e.reverse() : e
            }
            ,
            l.tickFormat = function(t, n) {
                return null == n ? w : s(n)
            }
            ,
            l.nice = function(t, n) {
                var e = h();
                return (t = k(t, e[0], e[e.length - 1], n)) ? h(Ws(e, t)) : l
            }
            ,
            l.copy = function() {
                return Ys(l, yl(t, n, e, i, o, a, u, c, s))
            }
            ,
            l
        }
        function _l() {
            return yl(Su, ku, lu, uu, ou, ru, nu, Wa, t.timeFormat).domain([new Date(2e3,0,1), new Date(2e3,0,2)])
        }
        function ml() {
            return yl(Ju, $u, qu, zu, Cu, Nu, nu, Wa, t.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)])
        }
        function xl(t) {
            return t.match(/.{6}/g).map((function(t) {
                return "#" + t
            }
            ))
        }
        var bl = xl("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf")
          , wl = xl("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6")
          , Ml = xl("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9")
          , kl = xl("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5")
          , El = Bo(Fi(300, .5, 0), Fi(-240, .5, 1))
          , Sl = Bo(Fi(-100, .75, .35), Fi(80, 1.5, .8))
          , Al = Bo(Fi(260, .75, .35), Fi(80, 1.5, .8))
          , Nl = Fi();
        function Tl(t) {
            (t < 0 || t > 1) && (t -= Math.floor(t));
            var n = Math.abs(t - .5);
            return Nl.h = 360 * t - 100,
            Nl.s = 1.5 - 1.5 * n,
            Nl.l = .8 - .9 * n,
            Nl + ""
        }
        function Cl(t) {
            var n = t.length;
            return function(e) {
                return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]
            }
        }
        var Pl = Cl(xl("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"))
          , zl = Cl(xl("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"))
          , Ll = Cl(xl("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"))
          , Rl = Cl(xl("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));
        function ql(t) {
            var n = 0
              , e = 1
              , r = !1;
            function i(i) {
                var o = (i - n) / (e - n);
                return t(r ? Math.max(0, Math.min(1, o)) : o)
            }
            return i.domain = function(t) {
                return arguments.length ? (n = +t[0],
                e = +t[1],
                i) : [n, e]
            }
            ,
            i.clamp = function(t) {
                return arguments.length ? (r = !!t,
                i) : r
            }
            ,
            i.interpolator = function(n) {
                return arguments.length ? (t = n,
                i) : t
            }
            ,
            i.copy = function() {
                return ql(t).domain([n, e]).clamp(r)
            }
            ,
            Xs(i)
        }
        var Ol = "http://www.w3.org/1999/xhtml"
          , Dl = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: Ol,
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };
        function Ul(t) {
            var n = t += ""
              , e = n.indexOf(":");
            return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)),
            Dl.hasOwnProperty(n) ? {
                space: Dl[n],
                local: t
            } : t
        }
        function jl(t) {
            return function() {
                var n = this.ownerDocument
                  , e = this.namespaceURI;
                return e === Ol && n.documentElement.namespaceURI === Ol ? n.createElement(t) : n.createElementNS(e, t)
            }
        }
        function Il(t) {
            return function() {
                return this.ownerDocument.createElementNS(t.space, t.local)
            }
        }
        function Fl(t) {
            var n = Ul(t);
            return (n.local ? Il : jl)(n)
        }
        var Yl = 0;
        function Bl() {
            return new Hl
        }
        function Hl() {
            this._ = "@" + (++Yl).toString(36)
        }
        Hl.prototype = Bl.prototype = {
            constructor: Hl,
            get: function(t) {
                for (var n = this._; !(n in t); )
                    if (!(t = t.parentNode))
                        return;
                return t[n]
            },
            set: function(t, n) {
                return t[this._] = n
            },
            remove: function(t) {
                return this._ in t && delete t[this._]
            },
            toString: function() {
                return this._
            }
        };
        var Xl = function(t) {
            return function() {
                return this.matches(t)
            }
        };
        if ("undefined" != typeof document) {
            var Gl = document.documentElement;
            if (!Gl.matches) {
                var Vl = Gl.webkitMatchesSelector || Gl.msMatchesSelector || Gl.mozMatchesSelector || Gl.oMatchesSelector;
                Xl = function(t) {
                    return function() {
                        return Vl.call(this, t)
                    }
                }
            }
        }
        var Wl = Xl
          , $l = {};
        function Zl(t, n, e) {
            return t = Jl(t, n, e),
            function(n) {
                var e = n.relatedTarget;
                e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this, n)
            }
        }
        function Jl(n, e, r) {
            return function(i) {
                var o = t.event;
                t.event = i;
                try {
                    n.call(this, this.__data__, e, r)
                } finally {
                    t.event = o
                }
            }
        }
        function Ql(t) {
            return t.trim().split(/^|\s+/).map((function(t) {
                var n = ""
                  , e = t.indexOf(".");
                return e >= 0 && (n = t.slice(e + 1),
                t = t.slice(0, e)),
                {
                    type: t,
                    name: n
                }
            }
            ))
        }
        function Kl(t) {
            return function() {
                var n = this.__on;
                if (n) {
                    for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
                        e = n[r],
                        t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.capture);
                    ++i ? n.length = i : delete this.__on
                }
            }
        }
        function tf(t, n, e) {
            var r = $l.hasOwnProperty(t.type) ? Zl : Jl;
            return function(i, o, a) {
                var u, c = this.__on, s = r(n, o, a);
                if (c)
                    for (var l = 0, f = c.length; l < f; ++l)
                        if ((u = c[l]).type === t.type && u.name === t.name)
                            return this.removeEventListener(u.type, u.listener, u.capture),
                            this.addEventListener(u.type, u.listener = s, u.capture = e),
                            void (u.value = n);
                this.addEventListener(t.type, s, e),
                u = {
                    type: t.type,
                    name: t.name,
                    value: n,
                    listener: s,
                    capture: e
                },
                c ? c.push(u) : this.__on = [u]
            }
        }
        function nf(t, n, e) {
            var r, i, o = Ql(t + ""), a = o.length;
            if (!(arguments.length < 2)) {
                for (u = n ? tf : Kl,
                null == e && (e = !1),
                r = 0; r < a; ++r)
                    this.each(u(o[r], n, e));
                return this
            }
            var u = this.node().__on;
            if (u)
                for (var c, s = 0, l = u.length; s < l; ++s)
                    for (r = 0,
                    c = u[s]; r < a; ++r)
                        if ((i = o[r]).type === c.type && i.name === c.name)
                            return c.value
        }
        function ef(n, e, r, i) {
            var o = t.event;
            n.sourceEvent = t.event,
            t.event = n;
            try {
                return e.apply(r, i)
            } finally {
                t.event = o
            }
        }
        function rf() {
            for (var n, e = t.event; n = e.sourceEvent; )
                e = n;
            return e
        }
        function of(t, n) {
            var e = t.ownerSVGElement || t;
            if (e.createSVGPoint) {
                var r = e.createSVGPoint();
                return r.x = n.clientX,
                r.y = n.clientY,
                [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
            }
            var i = t.getBoundingClientRect();
            return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop]
        }
        function af(t) {
            var n = rf();
            return n.changedTouches && (n = n.changedTouches[0]),
            of(t, n)
        }
        function uf() {}
        function cf(t) {
            return null == t ? uf : function() {
                return this.querySelector(t)
            }
        }
        function sf(t) {
            "function" != typeof t && (t = cf(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var o, a, u = n[i], c = u.length, s = r[i] = new Array(c), l = 0; l < c; ++l)
                    (o = u[l]) && (a = t.call(o, o.__data__, l, u)) && ("__data__"in o && (a.__data__ = o.__data__),
                    s[l] = a);
            return new Ah(r,this._parents)
        }
        function lf() {
            return []
        }
        function ff(t) {
            return null == t ? lf : function() {
                return this.querySelectorAll(t)
            }
        }
        function hf(t) {
            "function" != typeof t && (t = ff(t));
            for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
                for (var a, u = n[o], c = u.length, s = 0; s < c; ++s)
                    (a = u[s]) && (r.push(t.call(a, a.__data__, s, u)),
                    i.push(a));
            return new Ah(r,i)
        }
        function pf(t) {
            "function" != typeof t && (t = Wl(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var o, a = n[i], u = a.length, c = r[i] = [], s = 0; s < u; ++s)
                    (o = a[s]) && t.call(o, o.__data__, s, a) && c.push(o);
            return new Ah(r,this._parents)
        }
        function df(t) {
            return new Array(t.length)
        }
        function vf() {
            return new Ah(this._enter || this._groups.map(df),this._parents)
        }
        function gf(t, n) {
            this.ownerDocument = t.ownerDocument,
            this.namespaceURI = t.namespaceURI,
            this._next = null,
            this._parent = t,
            this.__data__ = n
        }
        function yf(t) {
            return function() {
                return t
            }
        }
        t.event = null,
        "undefined" != typeof document && ("onmouseenter"in document.documentElement || ($l = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        })),
        gf.prototype = {
            constructor: gf,
            appendChild: function(t) {
                return this._parent.insertBefore(t, this._next)
            },
            insertBefore: function(t, n) {
                return this._parent.insertBefore(t, n)
            },
            querySelector: function(t) {
                return this._parent.querySelector(t)
            },
            querySelectorAll: function(t) {
                return this._parent.querySelectorAll(t)
            }
        };
        var _f = "$";
        function mf(t, n, e, r, i, o) {
            for (var a, u = 0, c = n.length, s = o.length; u < s; ++u)
                (a = n[u]) ? (a.__data__ = o[u],
                r[u] = a) : e[u] = new gf(t,o[u]);
            for (; u < c; ++u)
                (a = n[u]) && (i[u] = a)
        }
        function xf(t, n, e, r, i, o, a) {
            var u, c, s, l = {}, f = n.length, h = o.length, p = new Array(f);
            for (u = 0; u < f; ++u)
                (c = n[u]) && (p[u] = s = _f + a.call(c, c.__data__, u, n),
                s in l ? i[u] = c : l[s] = c);
            for (u = 0; u < h; ++u)
                (c = l[s = _f + a.call(t, o[u], u, o)]) ? (r[u] = c,
                c.__data__ = o[u],
                l[s] = null) : e[u] = new gf(t,o[u]);
            for (u = 0; u < f; ++u)
                (c = n[u]) && l[p[u]] === c && (i[u] = c)
        }
        function bf(t, n) {
            if (!t)
                return p = new Array(this.size()),
                s = -1,
                this.each((function(t) {
                    p[++s] = t
                }
                )),
                p;
            var e = n ? xf : mf
              , r = this._parents
              , i = this._groups;
            "function" != typeof t && (t = yf(t));
            for (var o = i.length, a = new Array(o), u = new Array(o), c = new Array(o), s = 0; s < o; ++s) {
                var l = r[s]
                  , f = i[s]
                  , h = f.length
                  , p = t.call(l, l && l.__data__, s, r)
                  , d = p.length
                  , v = u[s] = new Array(d)
                  , g = a[s] = new Array(d);
                e(l, f, v, g, c[s] = new Array(h), p, n);
                for (var y, _, m = 0, x = 0; m < d; ++m)
                    if (y = v[m]) {
                        for (m >= x && (x = m + 1); !(_ = g[x]) && ++x < d; )
                            ;
                        y._next = _ || null
                    }
            }
            return (a = new Ah(a,r))._enter = u,
            a._exit = c,
            a
        }
        function wf() {
            return new Ah(this._exit || this._groups.map(df),this._parents)
        }
        function Mf(t) {
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
                for (var c, s = n[u], l = e[u], f = s.length, h = a[u] = new Array(f), p = 0; p < f; ++p)
                    (c = s[p] || l[p]) && (h[p] = c);
            for (; u < r; ++u)
                a[u] = n[u];
            return new Ah(a,this._parents)
        }
        function kf() {
            for (var t = this._groups, n = -1, e = t.length; ++n < e; )
                for (var r, i = t[n], o = i.length - 1, a = i[o]; --o >= 0; )
                    (r = i[o]) && (a && a !== r.nextSibling && a.parentNode.insertBefore(r, a),
                    a = r);
            return this
        }
        function Ef(t) {
            function n(n, e) {
                return n && e ? t(n.__data__, e.__data__) : !n - !e
            }
            t || (t = Sf);
            for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
                for (var a, u = e[o], c = u.length, s = i[o] = new Array(c), l = 0; l < c; ++l)
                    (a = u[l]) && (s[l] = a);
                s.sort(n)
            }
            return new Ah(i,this._parents).order()
        }
        function Sf(t, n) {
            return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
        }
        function Af() {
            var t = arguments[0];
            return arguments[0] = this,
            t.apply(null, arguments),
            this
        }
        function Nf() {
            var t = new Array(this.size())
              , n = -1;
            return this.each((function() {
                t[++n] = this
            }
            )),
            t
        }
        function Tf() {
            for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
                for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
                    var a = r[i];
                    if (a)
                        return a
                }
            return null
        }
        function Cf() {
            var t = 0;
            return this.each((function() {
                ++t
            }
            )),
            t
        }
        function Pf() {
            return !this.node()
        }
        function zf(t) {
            for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
                for (var i, o = n[e], a = 0, u = o.length; a < u; ++a)
                    (i = o[a]) && t.call(i, i.__data__, a, o);
            return this
        }
        function Lf(t) {
            return function() {
                this.removeAttribute(t)
            }
        }
        function Rf(t) {
            return function() {
                this.removeAttributeNS(t.space, t.local)
            }
        }
        function qf(t, n) {
            return function() {
                this.setAttribute(t, n)
            }
        }
        function Of(t, n) {
            return function() {
                this.setAttributeNS(t.space, t.local, n)
            }
        }
        function Df(t, n) {
            return function() {
                var e = n.apply(this, arguments);
                null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
            }
        }
        function Uf(t, n) {
            return function() {
                var e = n.apply(this, arguments);
                null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
            }
        }
        function jf(t, n) {
            var e = Ul(t);
            if (arguments.length < 2) {
                var r = this.node();
                return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e)
            }
            return this.each((null == n ? e.local ? Rf : Lf : "function" == typeof n ? e.local ? Uf : Df : e.local ? Of : qf)(e, n))
        }
        function If(t) {
            return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
        }
        function Ff(t) {
            return function() {
                this.style.removeProperty(t)
            }
        }
        function Yf(t, n, e) {
            return function() {
                this.style.setProperty(t, n, e)
            }
        }
        function Bf(t, n, e) {
            return function() {
                var r = n.apply(this, arguments);
                null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
            }
        }
        function Hf(t, n, e) {
            var r;
            return arguments.length > 1 ? this.each((null == n ? Ff : "function" == typeof n ? Bf : Yf)(t, n, null == e ? "" : e)) : If(r = this.node()).getComputedStyle(r, null).getPropertyValue(t)
        }
        function Xf(t) {
            return function() {
                delete this[t]
            }
        }
        function Gf(t, n) {
            return function() {
                this[t] = n
            }
        }
        function Vf(t, n) {
            return function() {
                var e = n.apply(this, arguments);
                null == e ? delete this[t] : this[t] = e
            }
        }
        function Wf(t, n) {
            return arguments.length > 1 ? this.each((null == n ? Xf : "function" == typeof n ? Vf : Gf)(t, n)) : this.node()[t]
        }
        function $f(t) {
            return t.trim().split(/^|\s+/)
        }
        function Zf(t) {
            return t.classList || new Jf(t)
        }
        function Jf(t) {
            this._node = t,
            this._names = $f(t.getAttribute("class") || "")
        }
        function Qf(t, n) {
            for (var e = Zf(t), r = -1, i = n.length; ++r < i; )
                e.add(n[r])
        }
        function Kf(t, n) {
            for (var e = Zf(t), r = -1, i = n.length; ++r < i; )
                e.remove(n[r])
        }
        function th(t) {
            return function() {
                Qf(this, t)
            }
        }
        function nh(t) {
            return function() {
                Kf(this, t)
            }
        }
        function eh(t, n) {
            return function() {
                (n.apply(this, arguments) ? Qf : Kf)(this, t)
            }
        }
        function rh(t, n) {
            var e = $f(t + "");
            if (arguments.length < 2) {
                for (var r = Zf(this.node()), i = -1, o = e.length; ++i < o; )
                    if (!r.contains(e[i]))
                        return !1;
                return !0
            }
            return this.each(("function" == typeof n ? eh : n ? th : nh)(e, n))
        }
        function ih() {
            this.textContent = ""
        }
        function oh(t) {
            return function() {
                this.textContent = t
            }
        }
        function ah(t) {
            return function() {
                var n = t.apply(this, arguments);
                this.textContent = null == n ? "" : n
            }
        }
        function uh(t) {
            return arguments.length ? this.each(null == t ? ih : ("function" == typeof t ? ah : oh)(t)) : this.node().textContent
        }
        function ch() {
            this.innerHTML = ""
        }
        function sh(t) {
            return function() {
                this.innerHTML = t
            }
        }
        function lh(t) {
            return function() {
                var n = t.apply(this, arguments);
                this.innerHTML = null == n ? "" : n
            }
        }
        function fh(t) {
            return arguments.length ? this.each(null == t ? ch : ("function" == typeof t ? lh : sh)(t)) : this.node().innerHTML
        }
        function hh() {
            this.nextSibling && this.parentNode.appendChild(this)
        }
        function ph() {
            return this.each(hh)
        }
        function dh() {
            this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
        }
        function vh() {
            return this.each(dh)
        }
        function gh(t) {
            var n = "function" == typeof t ? t : Fl(t);
            return this.select((function() {
                return this.appendChild(n.apply(this, arguments))
            }
            ))
        }
        function yh() {
            return null
        }
        function _h(t, n) {
            var e = "function" == typeof t ? t : Fl(t)
              , r = null == n ? yh : "function" == typeof n ? n : cf(n);
            return this.select((function() {
                return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
            }
            ))
        }
        function mh() {
            var t = this.parentNode;
            t && t.removeChild(this)
        }
        function xh() {
            return this.each(mh)
        }
        function bh(t) {
            return arguments.length ? this.property("__data__", t) : this.node().__data__
        }
        function wh(t, n, e) {
            var r = If(t)
              , i = r.CustomEvent;
            i ? i = new i(n,e) : (i = r.document.createEvent("Event"),
            e ? (i.initEvent(n, e.bubbles, e.cancelable),
            i.detail = e.detail) : i.initEvent(n, !1, !1)),
            t.dispatchEvent(i)
        }
        function Mh(t, n) {
            return function() {
                return wh(this, t, n)
            }
        }
        function kh(t, n) {
            return function() {
                return wh(this, t, n.apply(this, arguments))
            }
        }
        function Eh(t, n) {
            return this.each(("function" == typeof n ? kh : Mh)(t, n))
        }
        Jf.prototype = {
            add: function(t) {
                this._names.indexOf(t) < 0 && (this._names.push(t),
                this._node.setAttribute("class", this._names.join(" ")))
            },
            remove: function(t) {
                var n = this._names.indexOf(t);
                n >= 0 && (this._names.splice(n, 1),
                this._node.setAttribute("class", this._names.join(" ")))
            },
            contains: function(t) {
                return this._names.indexOf(t) >= 0
            }
        };
        var Sh = [null];
        function Ah(t, n) {
            this._groups = t,
            this._parents = n
        }
        function Nh() {
            return new Ah([[document.documentElement]],Sh)
        }
        function Th(t) {
            return "string" == typeof t ? new Ah([[document.querySelector(t)]],[document.documentElement]) : new Ah([[t]],Sh)
        }
        function Ch(t) {
            return "string" == typeof t ? new Ah([document.querySelectorAll(t)],[document.documentElement]) : new Ah([null == t ? [] : t],Sh)
        }
        function Ph(t, n, e) {
            arguments.length < 3 && (e = n,
            n = rf().changedTouches);
            for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
                if ((r = n[i]).identifier === e)
                    return of(t, r);
            return null
        }
        function zh(t, n) {
            null == n && (n = rf().touches);
            for (var e = 0, r = n ? n.length : 0, i = new Array(r); e < r; ++e)
                i[e] = of(t, n[e]);
            return i
        }
        Ah.prototype = Nh.prototype = {
            constructor: Ah,
            select: sf,
            selectAll: hf,
            filter: pf,
            data: bf,
            enter: vf,
            exit: wf,
            merge: Mf,
            order: kf,
            sort: Ef,
            call: Af,
            nodes: Nf,
            node: Tf,
            size: Cf,
            empty: Pf,
            each: zf,
            attr: jf,
            style: Hf,
            property: Wf,
            classed: rh,
            text: uh,
            html: fh,
            raise: ph,
            lower: vh,
            append: gh,
            insert: _h,
            remove: xh,
            datum: bh,
            on: nf,
            dispatch: Eh
        };
        var Lh = Go("start", "end", "interrupt")
          , Rh = []
          , qh = 0
          , Oh = 1
          , Dh = 2
          , Uh = 3
          , jh = 4
          , Ih = 5;
        function Fh(t, n, e, r, i, o) {
            var a = t.__transition;
            if (a) {
                if (e in a)
                    return
            } else
                t.__transition = {};
            Xh(t, e, {
                name: n,
                index: r,
                group: i,
                on: Lh,
                tween: Rh,
                time: o.time,
                delay: o.delay,
                duration: o.duration,
                ease: o.ease,
                timer: null,
                state: qh
            })
        }
        function Yh(t, n) {
            var e = t.__transition;
            if (!e || !(e = e[n]) || e.state > qh)
                throw new Error("too late");
            return e
        }
        function Bh(t, n) {
            var e = t.__transition;
            if (!e || !(e = e[n]) || e.state > Dh)
                throw new Error("too late");
            return e
        }
        function Hh(t, n) {
            var e = t.__transition;
            if (!e || !(e = e[n]))
                throw new Error("too late");
            return e
        }
        function Xh(t, n, e) {
            var r, i = t.__transition;
            function o(t) {
                e.state = Oh,
                e.delay <= t ? a(t - e.delay) : e.timer.restart(a, e.delay, e.time)
            }
            function a(o) {
                var a, c, s, l;
                for (a in i)
                    (l = i[a]).name === e.name && (l.state === Uh ? (l.state = Ih,
                    l.timer.stop(),
                    l.on.call("interrupt", t, t.__data__, l.index, l.group),
                    delete i[a]) : +a < n && (l.state = Ih,
                    l.timer.stop(),
                    delete i[a]));
                if (Ba((function() {
                    e.state === Uh && (e.timer.restart(u, e.delay, e.time),
                    u(o))
                }
                )),
                e.state = Dh,
                e.on.call("start", t, t.__data__, e.index, e.group),
                e.state === Dh) {
                    for (e.state = Uh,
                    r = new Array(s = e.tween.length),
                    a = 0,
                    c = -1; a < s; ++a)
                        (l = e.tween[a].value.call(t, t.__data__, e.index, e.group)) && (r[++c] = l);
                    r.length = c + 1
                }
            }
            function u(o) {
                for (var a = o < e.duration ? e.ease.call(null, o / e.duration) : (e.state = jh,
                1), u = -1, c = r.length; ++u < c; )
                    r[u].call(null, a);
                if (e.state === jh) {
                    for (u in e.state = Ih,
                    e.timer.stop(),
                    e.on.call("end", t, t.__data__, e.index, e.group),
                    i)
                        if (+u !== n)
                            return void delete i[n];
                    delete t.__transition
                }
            }
            i[n] = e,
            e.timer = Da(o, 0, e.time)
        }
        function Gh(t, n) {
            var e, r, i, o = t.__transition, a = !0;
            if (o) {
                for (i in n = null == n ? null : n + "",
                o)
                    (e = o[i]).name === n ? (r = e.state === Uh,
                    e.state = Ih,
                    e.timer.stop(),
                    r && e.on.call("interrupt", t, t.__data__, e.index, e.group),
                    delete o[i]) : a = !1;
                a && delete t.__transition
            }
        }
        function Vh(t) {
            return this.each((function() {
                Gh(this, t)
            }
            ))
        }
        function Wh(t, n) {
            var e, r;
            return function() {
                var i = Bh(this, t)
                  , o = i.tween;
                if (o !== e)
                    for (var a = 0, u = (r = e = o).length; a < u; ++a)
                        if (r[a].name === n) {
                            (r = r.slice()).splice(a, 1);
                            break
                        }
                i.tween = r
            }
        }
        function $h(t, n, e) {
            var r, i;
            if ("function" != typeof e)
                throw new Error;
            return function() {
                var o = Bh(this, t)
                  , a = o.tween;
                if (a !== r) {
                    i = (r = a).slice();
                    for (var u = {
                        name: n,
                        value: e
                    }, c = 0, s = i.length; c < s; ++c)
                        if (i[c].name === n) {
                            i[c] = u;
                            break
                        }
                    c === s && i.push(u)
                }
                o.tween = i
            }
        }
        function Zh(t, n) {
            var e = this._id;
            if (t += "",
            arguments.length < 2) {
                for (var r, i = Hh(this.node(), e).tween, o = 0, a = i.length; o < a; ++o)
                    if ((r = i[o]).name === t)
                        return r.value;
                return null
            }
            return this.each((null == n ? Wh : $h)(e, t, n))
        }
        function Jh(t, n, e) {
            var r = t._id;
            return t.each((function() {
                var t = Bh(this, r);
                (t.value || (t.value = {}))[n] = e.apply(this, arguments)
            }
            )),
            function(t) {
                return Hh(t, r).value[n]
            }
        }
        function Qh(t, n) {
            var e;
            return ("number" == typeof n ? io : n instanceof ni ? Qi : (e = ni(n)) ? (n = e,
            Qi) : lo)(t, n)
        }
        function Kh(t) {
            return function() {
                this.removeAttribute(t)
            }
        }
        function tp(t) {
            return function() {
                this.removeAttributeNS(t.space, t.local)
            }
        }
        function np(t, n, e) {
            var r, i;
            return function() {
                var o = this.getAttribute(t);
                return o === e ? null : o === r ? i : i = n(r = o, e)
            }
        }
        function ep(t, n, e) {
            var r, i;
            return function() {
                var o = this.getAttributeNS(t.space, t.local);
                return o === e ? null : o === r ? i : i = n(r = o, e)
            }
        }
        function rp(t, n, e) {
            var r, i, o;
            return function() {
                var a, u = e(this);
                if (null != u)
                    return (a = this.getAttribute(t)) === u ? null : a === r && u === i ? o : o = n(r = a, i = u);
                this.removeAttribute(t)
            }
        }
        function ip(t, n, e) {
            var r, i, o;
            return function() {
                var a, u = e(this);
                if (null != u)
                    return (a = this.getAttributeNS(t.space, t.local)) === u ? null : a === r && u === i ? o : o = n(r = a, i = u);
                this.removeAttributeNS(t.space, t.local)
            }
        }
        function op(t, n) {
            var e = Ul(t)
              , r = "transform" === e ? Eo : Qh;
            return this.attrTween(t, "function" == typeof n ? (e.local ? ip : rp)(e, r, Jh(this, "attr." + t, n)) : null == n ? (e.local ? tp : Kh)(e) : (e.local ? ep : np)(e, r, n))
        }
        function ap(t, n) {
            function e() {
                var e = this
                  , r = n.apply(e, arguments);
                return r && function(n) {
                    e.setAttributeNS(t.space, t.local, r(n))
                }
            }
            return e._value = n,
            e
        }
        function up(t, n) {
            function e() {
                var e = this
                  , r = n.apply(e, arguments);
                return r && function(n) {
                    e.setAttribute(t, r(n))
                }
            }
            return e._value = n,
            e
        }
        function cp(t, n) {
            var e = "attr." + t;
            if (arguments.length < 2)
                return (e = this.tween(e)) && e._value;
            if (null == n)
                return this.tween(e, null);
            if ("function" != typeof n)
                throw new Error;
            var r = Ul(t);
            return this.tween(e, (r.local ? ap : up)(r, n))
        }
        function sp(t, n) {
            return function() {
                Yh(this, t).delay = +n.apply(this, arguments)
            }
        }
        function lp(t, n) {
            return n = +n,
            function() {
                Yh(this, t).delay = n
            }
        }
        function fp(t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? sp : lp)(n, t)) : Hh(this.node(), n).delay
        }
        function hp(t, n) {
            return function() {
                Bh(this, t).duration = +n.apply(this, arguments)
            }
        }
        function pp(t, n) {
            return n = +n,
            function() {
                Bh(this, t).duration = n
            }
        }
        function dp(t) {
            var n = this._id;
            return arguments.length ? this.each(("function" == typeof t ? hp : pp)(n, t)) : Hh(this.node(), n).duration
        }
        function vp(t, n) {
            if ("function" != typeof n)
                throw new Error;
            return function() {
                Bh(this, t).ease = n
            }
        }
        function gp(t) {
            var n = this._id;
            return arguments.length ? this.each(vp(n, t)) : Hh(this.node(), n).ease
        }
        function yp(t) {
            "function" != typeof t && (t = Wl(t));
            for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
                for (var o, a = n[i], u = a.length, c = r[i] = [], s = 0; s < u; ++s)
                    (o = a[s]) && t.call(o, o.__data__, s, a) && c.push(o);
            return new Ip(r,this._parents,this._name,this._id)
        }
        function _p(t) {
            if (t._id !== this._id)
                throw new Error;
            for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
                for (var c, s = n[u], l = e[u], f = s.length, h = a[u] = new Array(f), p = 0; p < f; ++p)
                    (c = s[p] || l[p]) && (h[p] = c);
            for (; u < r; ++u)
                a[u] = n[u];
            return new Ip(a,this._parents,this._name,this._id)
        }
        function mp(t) {
            return (t + "").trim().split(/^|\s+/).every((function(t) {
                var n = t.indexOf(".");
                return n >= 0 && (t = t.slice(0, n)),
                !t || "start" === t
            }
            ))
        }
        function xp(t, n, e) {
            var r, i, o = mp(n) ? Yh : Bh;
            return function() {
                var a = o(this, t)
                  , u = a.on;
                u !== r && (i = (r = u).copy()).on(n, e),
                a.on = i
            }
        }
        function bp(t, n) {
            var e = this._id;
            return arguments.length < 2 ? Hh(this.node(), e).on.on(t) : this.each(xp(e, t, n))
        }
        function wp(t) {
            return function() {
                var n = this.parentNode;
                for (var e in this.__transition)
                    if (+e !== t)
                        return;
                n && n.removeChild(this)
            }
        }
        function Mp() {
            return this.on("end.remove", wp(this._id))
        }
        function kp(t) {
            var n = this._name
              , e = this._id;
            "function" != typeof t && (t = cf(t));
            for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
                for (var u, c, s = r[a], l = s.length, f = o[a] = new Array(l), h = 0; h < l; ++h)
                    (u = s[h]) && (c = t.call(u, u.__data__, h, s)) && ("__data__"in u && (c.__data__ = u.__data__),
                    f[h] = c,
                    Fh(f[h], n, e, h, f, Hh(u, e)));
            return new Ip(o,this._parents,n,e)
        }
        function Ep(t) {
            var n = this._name
              , e = this._id;
            "function" != typeof t && (t = ff(t));
            for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
                for (var c, s = r[u], l = s.length, f = 0; f < l; ++f)
                    if (c = s[f]) {
                        for (var h, p = t.call(c, c.__data__, f, s), d = Hh(c, e), v = 0, g = p.length; v < g; ++v)
                            (h = p[v]) && Fh(h, n, e, v, p, d);
                        o.push(p),
                        a.push(c)
                    }
            return new Ip(o,a,n,e)
        }
        var Sp = Nh.prototype.constructor;
        function Ap() {
            return new Sp(this._groups,this._parents)
        }
        function Np(t, n) {
            var e, r, i;
            return function() {
                var o = If(this).getComputedStyle(this, null)
                  , a = o.getPropertyValue(t)
                  , u = (this.style.removeProperty(t),
                o.getPropertyValue(t));
                return a === u ? null : a === e && u === r ? i : i = n(e = a, r = u)
            }
        }
        function Tp(t) {
            return function() {
                this.style.removeProperty(t)
            }
        }
        function Cp(t, n, e) {
            var r, i;
            return function() {
                var o = If(this).getComputedStyle(this, null).getPropertyValue(t);
                return o === e ? null : o === r ? i : i = n(r = o, e)
            }
        }
        function Pp(t, n, e) {
            var r, i, o;
            return function() {
                var a = If(this).getComputedStyle(this, null)
                  , u = a.getPropertyValue(t)
                  , c = e(this);
                return null == c && (this.style.removeProperty(t),
                c = a.getPropertyValue(t)),
                u === c ? null : u === r && c === i ? o : o = n(r = u, i = c)
            }
        }
        function zp(t, n, e) {
            var r = "transform" == (t += "") ? ko : Qh;
            return null == n ? this.styleTween(t, Np(t, r)).on("end.style." + t, Tp(t)) : this.styleTween(t, "function" == typeof n ? Pp(t, r, Jh(this, "style." + t, n)) : Cp(t, r, n), e)
        }
        function Lp(t, n, e) {
            function r() {
                var r = this
                  , i = n.apply(r, arguments);
                return i && function(n) {
                    r.style.setProperty(t, i(n), e)
                }
            }
            return r._value = n,
            r
        }
        function Rp(t, n, e) {
            var r = "style." + (t += "");
            if (arguments.length < 2)
                return (r = this.tween(r)) && r._value;
            if (null == n)
                return this.tween(r, null);
            if ("function" != typeof n)
                throw new Error;
            return this.tween(r, Lp(t, n, null == e ? "" : e))
        }
        function qp(t) {
            return function() {
                this.textContent = t
            }
        }
        function Op(t) {
            return function() {
                var n = t(this);
                this.textContent = null == n ? "" : n
            }
        }
        function Dp(t) {
            return this.tween("text", "function" == typeof t ? Op(Jh(this, "text", t)) : qp(null == t ? "" : t + ""))
        }
        function Up() {
            for (var t = this._name, n = this._id, e = Yp(), r = this._groups, i = r.length, o = 0; o < i; ++o)
                for (var a, u = r[o], c = u.length, s = 0; s < c; ++s)
                    if (a = u[s]) {
                        var l = Hh(a, n);
                        Fh(a, t, e, s, u, {
                            time: l.time + l.delay + l.duration,
                            delay: 0,
                            duration: l.duration,
                            ease: l.ease
                        })
                    }
            return new Ip(r,this._parents,t,e)
        }
        var jp = 0;
        function Ip(t, n, e, r) {
            this._groups = t,
            this._parents = n,
            this._name = e,
            this._id = r
        }
        function Fp(t) {
            return Nh().transition(t)
        }
        function Yp() {
            return ++jp
        }
        var Bp = Nh.prototype;
        Ip.prototype = Fp.prototype = {
            constructor: Ip,
            select: kp,
            selectAll: Ep,
            filter: yp,
            merge: _p,
            selection: Ap,
            transition: Up,
            call: Bp.call,
            nodes: Bp.nodes,
            node: Bp.node,
            size: Bp.size,
            empty: Bp.empty,
            each: Bp.each,
            on: bp,
            attr: op,
            attrTween: cp,
            style: zp,
            styleTween: Rp,
            text: Dp,
            remove: Mp,
            tween: Zh,
            delay: fp,
            duration: dp,
            ease: gp
        };
        var Hp = {
            time: null,
            delay: 0,
            duration: 250,
            ease: dt
        };
        function Xp(t, n) {
            for (var e; !(e = t.__transition) || !(e = e[n]); )
                if (!(t = t.parentNode))
                    return Hp.time = Ra(),
                    Hp;
            return e
        }
        function Gp(t) {
            var n, e;
            t instanceof Ip ? (n = t._id,
            t = t._name) : (n = Yp(),
            (e = Hp).time = Ra(),
            t = null == t ? null : t + "");
            for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
                for (var a, u = r[o], c = u.length, s = 0; s < c; ++s)
                    (a = u[s]) && Fh(a, t, n, s, u, e || Xp(a, n));
            return new Ip(r,this._parents,t,n)
        }
        Nh.prototype.interrupt = Vh,
        Nh.prototype.transition = Gp;
        var Vp = [null];
        function Wp(t, n) {
            var e, r, i = t.__transition;
            if (i)
                for (r in n = null == n ? null : n + "",
                i)
                    if ((e = i[r]).state > Oh && e.name === n)
                        return new Ip([[t]],Vp,n,+r);
            return null
        }
        var $p = Array.prototype.slice;
        function Zp(t) {
            return t
        }
        var Jp = 1
          , Qp = 2
          , Kp = 3
          , td = 4
          , nd = 1e-6;
        function ed(t, n, e) {
            var r = t(e);
            return "translate(" + (isFinite(r) ? r : n(e)) + ",0)"
        }
        function rd(t, n, e) {
            var r = t(e);
            return "translate(0," + (isFinite(r) ? r : n(e)) + ")"
        }
        function id(t) {
            var n = t.bandwidth() / 2;
            return function(e) {
                return t(e) + n
            }
        }
        function od() {
            return !this.__axis
        }
        function ad(t, n) {
            var e = []
              , r = null
              , i = null
              , o = 6
              , a = 6
              , u = 3;
            function c(c) {
                var s, l = null == r ? n.ticks ? n.ticks.apply(n, e) : n.domain() : r, f = null == i ? n.tickFormat ? n.tickFormat.apply(n, e) : Zp : i, h = Math.max(o, 0) + u, p = t === Jp || t === Kp ? ed : rd, d = n.range(), v = d[0] + .5, g = d[d.length - 1] + .5, y = (n.bandwidth ? id : Zp)(n.copy()), _ = c.selection ? c.selection() : c, m = _.selectAll(".domain").data([null]), x = _.selectAll(".tick").data(l, n).order(), b = x.exit(), w = x.enter().append("g").attr("class", "tick"), M = x.select("line"), k = x.select("text"), E = t === Jp || t === td ? -1 : 1, S = t === td || t === Qp ? (s = "x",
                "y") : (s = "y",
                "x");
                m = m.merge(m.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "#000")),
                x = x.merge(w),
                M = M.merge(w.append("line").attr("stroke", "#000").attr(s + "2", E * o).attr(S + "1", .5).attr(S + "2", .5)),
                k = k.merge(w.append("text").attr("fill", "#000").attr(s, E * h).attr(S, .5).attr("dy", t === Jp ? "0em" : t === Kp ? ".71em" : ".32em")),
                c !== _ && (m = m.transition(c),
                x = x.transition(c),
                M = M.transition(c),
                k = k.transition(c),
                b = b.transition(c).attr("opacity", nd).attr("transform", (function(t) {
                    return p(y, this.parentNode.__axis || y, t)
                }
                )),
                w.attr("opacity", nd).attr("transform", (function(t) {
                    return p(this.parentNode.__axis || y, y, t)
                }
                ))),
                b.remove(),
                m.attr("d", t === td || t == Qp ? "M" + E * a + "," + v + "H0.5V" + g + "H" + E * a : "M" + v + "," + E * a + "V0.5H" + g + "V" + E * a),
                x.attr("opacity", 1).attr("transform", (function(t) {
                    return p(y, y, t)
                }
                )),
                M.attr(s + "2", E * o),
                k.attr(s, E * h).text(f),
                _.filter(od).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Qp ? "start" : t === td ? "end" : "middle"),
                _.each((function() {
                    this.__axis = y
                }
                ))
            }
            return c.scale = function(t) {
                return arguments.length ? (n = t,
                c) : n
            }
            ,
            c.ticks = function() {
                return e = $p.call(arguments),
                c
            }
            ,
            c.tickArguments = function(t) {
                return arguments.length ? (e = null == t ? [] : $p.call(t),
                c) : e.slice()
            }
            ,
            c.tickValues = function(t) {
                return arguments.length ? (r = null == t ? null : $p.call(t),
                c) : r && r.slice()
            }
            ,
            c.tickFormat = function(t) {
                return arguments.length ? (i = t,
                c) : i
            }
            ,
            c.tickSize = function(t) {
                return arguments.length ? (o = a = +t,
                c) : o
            }
            ,
            c.tickSizeInner = function(t) {
                return arguments.length ? (o = +t,
                c) : o
            }
            ,
            c.tickSizeOuter = function(t) {
                return arguments.length ? (a = +t,
                c) : a
            }
            ,
            c.tickPadding = function(t) {
                return arguments.length ? (u = +t,
                c) : u
            }
            ,
            c
        }
        function ud(t) {
            return ad(Jp, t)
        }
        function cd(t) {
            return ad(Qp, t)
        }
        function sd(t) {
            return ad(Kp, t)
        }
        function ld(t) {
            return ad(td, t)
        }
        function fd(t, n) {
            return t.parent === n.parent ? 1 : 2
        }
        function hd(t) {
            return t.reduce(pd, 0) / t.length
        }
        function pd(t, n) {
            return t + n.x
        }
        function dd(t) {
            return 1 + t.reduce(vd, 0)
        }
        function vd(t, n) {
            return Math.max(t, n.y)
        }
        function gd(t) {
            for (var n; n = t.children; )
                t = n[0];
            return t
        }
        function yd(t) {
            for (var n; n = t.children; )
                t = n[n.length - 1];
            return t
        }
        function _d() {
            var t = fd
              , n = 1
              , e = 1
              , r = !1;
            function i(i) {
                var o, a = 0;
                i.eachAfter((function(n) {
                    var e = n.children;
                    e ? (n.x = hd(e),
                    n.y = dd(e)) : (n.x = o ? a += t(n, o) : 0,
                    n.y = 0,
                    o = n)
                }
                ));
                var u = gd(i)
                  , c = yd(i)
                  , s = u.x - t(u, c) / 2
                  , l = c.x + t(c, u) / 2;
                return i.eachAfter(r ? function(t) {
                    t.x = (t.x - i.x) * n,
                    t.y = (i.y - t.y) * e
                }
                : function(t) {
                    t.x = (t.x - s) / (l - s) * n,
                    t.y = (1 - (i.y ? t.y / i.y : 1)) * e
                }
                )
            }
            return i.separation = function(n) {
                return arguments.length ? (t = n,
                i) : t
            }
            ,
            i.size = function(t) {
                return arguments.length ? (r = !1,
                n = +t[0],
                e = +t[1],
                i) : r ? null : [n, e]
            }
            ,
            i.nodeSize = function(t) {
                return arguments.length ? (r = !0,
                n = +t[0],
                e = +t[1],
                i) : r ? [n, e] : null
            }
            ,
            i
        }
        function md(t) {
            var n, e, r, i, o = this, a = [o];
            do {
                for (n = a.reverse(),
                a = []; o = n.pop(); )
                    if (t(o),
                    e = o.children)
                        for (r = 0,
                        i = e.length; r < i; ++r)
                            a.push(e[r])
            } while (a.length);
            return this
        }
        function xd(t) {
            for (var n, e, r = this, i = [r]; r = i.pop(); )
                if (t(r),
                n = r.children)
                    for (e = n.length - 1; e >= 0; --e)
                        i.push(n[e]);
            return this
        }
        function bd(t) {
            for (var n, e, r, i = this, o = [i], a = []; i = o.pop(); )
                if (a.push(i),
                n = i.children)
                    for (e = 0,
                    r = n.length; e < r; ++e)
                        o.push(n[e]);
            for (; i = a.pop(); )
                t(i);
            return this
        }
        function wd(t) {
            return this.eachAfter((function(n) {
                for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0; )
                    e += r[i].value;
                n.value = e
            }
            ))
        }
        function Md(t) {
            return this.eachBefore((function(n) {
                n.children && n.children.sort(t)
            }
            ))
        }
        function kd(t) {
            for (var n = this, e = Ed(n, t), r = [n]; n !== e; )
                n = n.parent,
                r.push(n);
            for (var i = r.length; t !== e; )
                r.splice(i, 0, t),
                t = t.parent;
            return r
        }
        function Ed(t, n) {
            if (t === n)
                return t;
            var e = t.ancestors()
              , r = n.ancestors()
              , i = null;
            for (t = e.pop(),
            n = r.pop(); t === n; )
                i = t,
                t = e.pop(),
                n = r.pop();
            return i
        }
        function Sd() {
            for (var t = this, n = [t]; t = t.parent; )
                n.push(t);
            return n
        }
        function Ad() {
            var t = [];
            return this.each((function(n) {
                t.push(n)
            }
            )),
            t
        }
        function Nd() {
            var t = [];
            return this.eachBefore((function(n) {
                n.children || t.push(n)
            }
            )),
            t
        }
        function Td() {
            var t = this
              , n = [];
            return t.each((function(e) {
                e !== t && n.push({
                    source: e.parent,
                    target: e
                })
            }
            )),
            n
        }
        function Cd(t, n) {
            var e, r, i, o, a, u = new qd(t), c = +t.value && (u.value = t.value), s = [u];
            for (null == n && (n = zd); e = s.pop(); )
                if (c && (e.value = +e.data.value),
                (i = n(e.data)) && (a = i.length))
                    for (e.children = new Array(a),
                    o = a - 1; o >= 0; --o)
                        s.push(r = e.children[o] = new qd(i[o])),
                        r.parent = e,
                        r.depth = e.depth + 1;
            return u.eachBefore(Rd)
        }
        function Pd() {
            return Cd(this).eachBefore(Ld)
        }
        function zd(t) {
            return t.children
        }
        function Ld(t) {
            t.data = t.data.data
        }
        function Rd(t) {
            var n = 0;
            do {
                t.height = n
            } while ((t = t.parent) && t.height < ++n)
        }
        function qd(t) {
            this.data = t,
            this.depth = this.height = 0,
            this.parent = null
        }
        function Od(t) {
            this._ = t,
            this.next = null
        }
        function Dd(t) {
            for (var n, e = (t = t.slice()).length, r = null, i = r; e; ) {
                var o = new Od(t[e - 1]);
                i = i ? i.next = o : r = o,
                t[n] = t[--e]
            }
            return {
                head: r,
                tail: i
            }
        }
        function Ud(t) {
            return Id(Dd(t), [])
        }
        function jd(t, n) {
            var e = n.x - t.x
              , r = n.y - t.y
              , i = t.r - n.r;
            return i * i + 1e-6 > e * e + r * r
        }
        function Id(t, n) {
            var e, r, i, o = null, a = t.head;
            switch (n.length) {
            case 1:
                e = Fd(n[0]);
                break;
            case 2:
                e = Yd(n[0], n[1]);
                break;
            case 3:
                e = Bd(n[0], n[1], n[2])
            }
            for (; a; )
                i = a._,
                r = a.next,
                e && jd(e, i) ? o = a : (o ? (t.tail = o,
                o.next = null) : t.head = t.tail = null,
                n.push(i),
                e = Id(t, n),
                n.pop(),
                t.head ? (a.next = t.head,
                t.head = a) : (a.next = null,
                t.head = t.tail = a),
                (o = t.tail).next = r),
                a = r;
            return t.tail = o,
            e
        }
        function Fd(t) {
            return {
                x: t.x,
                y: t.y,
                r: t.r
            }
        }
        function Yd(t, n) {
            var e = t.x
              , r = t.y
              , i = t.r
              , o = n.x
              , a = n.y
              , u = n.r
              , c = o - e
              , s = a - r
              , l = u - i
              , f = Math.sqrt(c * c + s * s);
            return {
                x: (e + o + c / f * l) / 2,
                y: (r + a + s / f * l) / 2,
                r: (f + i + u) / 2
            }
        }
        function Bd(t, n, e) {
            var r = t.x
              , i = t.y
              , o = t.r
              , a = n.x
              , u = n.y
              , c = n.r
              , s = e.x
              , l = e.y
              , f = e.r
              , h = 2 * (r - a)
              , p = 2 * (i - u)
              , d = 2 * (c - o)
              , v = r * r + i * i - o * o - a * a - u * u + c * c
              , g = 2 * (r - s)
              , y = 2 * (i - l)
              , _ = 2 * (f - o)
              , m = r * r + i * i - o * o - s * s - l * l + f * f
              , x = g * p - h * y
              , b = (p * m - y * v) / x - r
              , w = (y * d - p * _) / x
              , M = (g * v - h * m) / x - i
              , k = (h * _ - g * d) / x
              , E = w * w + k * k - 1
              , S = 2 * (b * w + M * k + o)
              , A = b * b + M * M - o * o
              , N = (-S - Math.sqrt(S * S - 4 * E * A)) / (2 * E);
            return {
                x: b + w * N + r,
                y: M + k * N + i,
                r: N
            }
        }
        function Hd(t, n, e) {
            var r = t.x
              , i = t.y
              , o = n.r + e.r
              , a = t.r + e.r
              , u = n.x - r
              , c = n.y - i
              , s = u * u + c * c;
            if (s) {
                var l = .5 + ((a *= a) - (o *= o)) / (2 * s)
                  , f = Math.sqrt(Math.max(0, 2 * o * (a + s) - (a -= s) * a - o * o)) / (2 * s);
                e.x = r + l * u + f * c,
                e.y = i + l * c - f * u
            } else
                e.x = r + a,
                e.y = i
        }
        function Xd(t, n) {
            var e = n.x - t.x
              , r = n.y - t.y
              , i = t.r + n.r;
            return i * i > e * e + r * r
        }
        function Gd(t, n, e) {
            var r = t.x - n
              , i = t.y - e;
            return r * r + i * i
        }
        function Vd(t) {
            this._ = t,
            this.next = null,
            this.previous = null
        }
        function Wd(t) {
            if (!(i = t.length))
                return 0;
            var n, e, r, i;
            if ((n = t[0]).x = 0,
            n.y = 0,
            !(i > 1))
                return n.r;
            if (e = t[1],
            n.x = -e.r,
            e.x = n.r,
            e.y = 0,
            !(i > 2))
                return n.r + e.r;
            Hd(e, n, r = t[2]);
            var o, a, u, c, s, l, f, h = n.r * n.r, p = e.r * e.r, d = r.r * r.r, v = h + p + d, g = h * n.x + p * e.x + d * r.x, y = h * n.y + p * e.y + d * r.y;
            n = new Vd(n),
            e = new Vd(e),
            r = new Vd(r),
            n.next = r.previous = e,
            e.next = n.previous = r,
            r.next = e.previous = n;
            t: for (u = 3; u < i; ++u) {
                if (Hd(n._, e._, r = t[u]),
                r = new Vd(r),
                (s = n.previous) === (c = e.next)) {
                    if (Xd(c._, r._)) {
                        n = e,
                        e = c,
                        --u;
                        continue t
                    }
                } else {
                    l = c._.r,
                    f = s._.r;
                    do {
                        if (l <= f) {
                            if (Xd(c._, r._)) {
                                e = c,
                                n.next = e,
                                e.previous = n,
                                --u;
                                continue t
                            }
                            l += (c = c.next)._.r
                        } else {
                            if (Xd(s._, r._)) {
                                (n = s).next = e,
                                e.previous = n,
                                --u;
                                continue t
                            }
                            f += (s = s.previous)._.r
                        }
                    } while (c !== s.next)
                }
                for (r.previous = n,
                r.next = e,
                n.next = e.previous = e = r,
                v += d = r._.r * r._.r,
                g += d * r._.x,
                y += d * r._.y,
                h = Gd(n._, o = g / v, a = y / v); (r = r.next) !== e; )
                    (d = Gd(r._, o, a)) < h && (n = r,
                    h = d);
                e = n.next
            }
            for (n = [e._],
            r = e; (r = r.next) !== e; )
                n.push(r._);
            for (r = Ud(n),
            u = 0; u < i; ++u)
                (n = t[u]).x -= r.x,
                n.y -= r.y;
            return r.r
        }
        function $d(t) {
            return Wd(t),
            t
        }
        function Zd(t) {
            return null == t ? null : Jd(t)
        }
        function Jd(t) {
            if ("function" != typeof t)
                throw new Error;
            return t
        }
        function Qd() {
            return 0
        }
        function Kd(t) {
            return function() {
                return t
            }
        }
        function tv(t) {
            return Math.sqrt(t.value)
        }
        function nv() {
            var t = null
              , n = 1
              , e = 1
              , r = Qd;
            function i(i) {
                return i.x = n / 2,
                i.y = e / 2,
                t ? i.eachBefore(ev(t)).eachAfter(rv(r, .5)).eachBefore(iv(1)) : i.eachBefore(ev(tv)).eachAfter(rv(Qd, 1)).eachAfter(rv(r, i.r / Math.min(n, e))).eachBefore(iv(Math.min(n, e) / (2 * i.r))),
                i
            }
            return i.radius = function(n) {
                return arguments.length ? (t = Zd(n),
                i) : t
            }
            ,
            i.size = function(t) {
                return arguments.length ? (n = +t[0],
                e = +t[1],
                i) : [n, e]
            }
            ,
            i.padding = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : Kd(+t),
                i) : r
            }
            ,
            i
        }
        function ev(t) {
            return function(n) {
                n.children || (n.r = Math.max(0, +t(n) || 0))
            }
        }
        function rv(t, n) {
            return function(e) {
                if (r = e.children) {
                    var r, i, o, a = r.length, u = t(e) * n || 0;
                    if (u)
                        for (i = 0; i < a; ++i)
                            r[i].r += u;
                    if (o = Wd(r),
                    u)
                        for (i = 0; i < a; ++i)
                            r[i].r -= u;
                    e.r = o + u
                }
            }
        }
        function iv(t) {
            return function(n) {
                var e = n.parent;
                n.r *= t,
                e && (n.x = e.x + t * n.x,
                n.y = e.y + t * n.y)
            }
        }
        function ov(t) {
            t.x0 = Math.round(t.x0),
            t.y0 = Math.round(t.y0),
            t.x1 = Math.round(t.x1),
            t.y1 = Math.round(t.y1)
        }
        function av(t, n, e, r, i) {
            for (var o, a = t.children, u = -1, c = a.length, s = t.value && (r - n) / t.value; ++u < c; )
                (o = a[u]).y0 = e,
                o.y1 = i,
                o.x0 = n,
                o.x1 = n += o.value * s
        }
        function uv() {
            var t = 1
              , n = 1
              , e = 0
              , r = !1;
            function i(i) {
                var a = i.height + 1;
                return i.x0 = i.y0 = e,
                i.x1 = t,
                i.y1 = n / a,
                i.eachBefore(o(n, a)),
                r && i.eachBefore(ov),
                i
            }
            function o(t, n) {
                return function(r) {
                    r.children && av(r, r.x0, t * (r.depth + 1) / n, r.x1, t * (r.depth + 2) / n);
                    var i = r.x0
                      , o = r.y0
                      , a = r.x1 - e
                      , u = r.y1 - e;
                    a < i && (i = a = (i + a) / 2),
                    u < o && (o = u = (o + u) / 2),
                    r.x0 = i,
                    r.y0 = o,
                    r.x1 = a,
                    r.y1 = u
                }
            }
            return i.round = function(t) {
                return arguments.length ? (r = !!t,
                i) : r
            }
            ,
            i.size = function(e) {
                return arguments.length ? (t = +e[0],
                n = +e[1],
                i) : [t, n]
            }
            ,
            i.padding = function(t) {
                return arguments.length ? (e = +t,
                i) : e
            }
            ,
            i
        }
        qd.prototype = Cd.prototype = {
            constructor: qd,
            each: md,
            eachAfter: bd,
            eachBefore: xd,
            sum: wd,
            sort: Md,
            path: kd,
            ancestors: Sd,
            descendants: Ad,
            leaves: Nd,
            links: Td,
            copy: Pd
        };
        var cv = "$"
          , sv = {
            depth: -1
        }
          , lv = {};
        function fv(t) {
            return t.id
        }
        function hv(t) {
            return t.parentId
        }
        function pv() {
            var t = fv
              , n = hv;
            function e(e) {
                var r, i, o, a, u, c, s, l = e.length, f = new Array(l), h = {};
                for (i = 0; i < l; ++i)
                    r = e[i],
                    u = f[i] = new qd(r),
                    null != (c = t(r, i, e)) && (c += "") && (h[s = cv + (u.id = c)] = s in h ? lv : u);
                for (i = 0; i < l; ++i)
                    if (u = f[i],
                    null != (c = n(e[i], i, e)) && (c += "")) {
                        if (!(a = h[cv + c]))
                            throw new Error("missing: " + c);
                        if (a === lv)
                            throw new Error("ambiguous: " + c);
                        a.children ? a.children.push(u) : a.children = [u],
                        u.parent = a
                    } else {
                        if (o)
                            throw new Error("multiple roots");
                        o = u
                    }
                if (!o)
                    throw new Error("no root");
                if (o.parent = sv,
                o.eachBefore((function(t) {
                    t.depth = t.parent.depth + 1,
                    --l
                }
                )).eachBefore(Rd),
                o.parent = null,
                l > 0)
                    throw new Error("cycle");
                return o
            }
            return e.id = function(n) {
                return arguments.length ? (t = Jd(n),
                e) : t
            }
            ,
            e.parentId = function(t) {
                return arguments.length ? (n = Jd(t),
                e) : n
            }
            ,
            e
        }
        function dv(t, n) {
            return t.parent === n.parent ? 1 : 2
        }
        function vv(t) {
            var n = t.children;
            return n ? n[0] : t.t
        }
        function gv(t) {
            var n = t.children;
            return n ? n[n.length - 1] : t.t
        }
        function yv(t, n, e) {
            var r = e / (n.i - t.i);
            n.c -= r,
            n.s += e,
            t.c += r,
            n.z += e,
            n.m += e
        }
        function _v(t) {
            for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0; )
                (n = i[o]).z += e,
                n.m += e,
                e += n.s + (r += n.c)
        }
        function mv(t, n, e) {
            return t.a.parent === n.parent ? t.a : e
        }
        function xv(t, n) {
            this._ = t,
            this.parent = null,
            this.children = null,
            this.A = null,
            this.a = this,
            this.z = 0,
            this.m = 0,
            this.c = 0,
            this.s = 0,
            this.t = null,
            this.i = n
        }
        function bv(t) {
            for (var n, e, r, i, o, a = new xv(t,0), u = [a]; n = u.pop(); )
                if (r = n._.children)
                    for (n.children = new Array(o = r.length),
                    i = o - 1; i >= 0; --i)
                        u.push(e = n.children[i] = new xv(r[i],i)),
                        e.parent = n;
            return (a.parent = new xv(null,0)).children = [a],
            a
        }
        function wv() {
            var t = dv
              , n = 1
              , e = 1
              , r = null;
            function i(i) {
                var u = bv(i);
                if (u.eachAfter(o),
                u.parent.m = -u.z,
                u.eachBefore(a),
                r)
                    i.eachBefore(c);
                else {
                    var s = i
                      , l = i
                      , f = i;
                    i.eachBefore((function(t) {
                        t.x < s.x && (s = t),
                        t.x > l.x && (l = t),
                        t.depth > f.depth && (f = t)
                    }
                    ));
                    var h = s === l ? 1 : t(s, l) / 2
                      , p = h - s.x
                      , d = n / (l.x + h + p)
                      , v = e / (f.depth || 1);
                    i.eachBefore((function(t) {
                        t.x = (t.x + p) * d,
                        t.y = t.depth * v
                    }
                    ))
                }
                return i
            }
            function o(n) {
                var e = n.children
                  , r = n.parent.children
                  , i = n.i ? r[n.i - 1] : null;
                if (e) {
                    _v(n);
                    var o = (e[0].z + e[e.length - 1].z) / 2;
                    i ? (n.z = i.z + t(n._, i._),
                    n.m = n.z - o) : n.z = o
                } else
                    i && (n.z = i.z + t(n._, i._));
                n.parent.A = u(n, i, n.parent.A || r[0])
            }
            function a(t) {
                t._.x = t.z + t.parent.m,
                t.m += t.parent.m
            }
            function u(n, e, r) {
                if (e) {
                    for (var i, o = n, a = n, u = e, c = o.parent.children[0], s = o.m, l = a.m, f = u.m, h = c.m; u = gv(u),
                    o = vv(o),
                    u && o; )
                        c = vv(c),
                        (a = gv(a)).a = n,
                        (i = u.z + f - o.z - s + t(u._, o._)) > 0 && (yv(mv(u, n, r), n, i),
                        s += i,
                        l += i),
                        f += u.m,
                        s += o.m,
                        h += c.m,
                        l += a.m;
                    u && !gv(a) && (a.t = u,
                    a.m += f - l),
                    o && !vv(c) && (c.t = o,
                    c.m += s - h,
                    r = n)
                }
                return r
            }
            function c(t) {
                t.x *= n,
                t.y = t.depth * e
            }
            return i.separation = function(n) {
                return arguments.length ? (t = n,
                i) : t
            }
            ,
            i.size = function(t) {
                return arguments.length ? (r = !1,
                n = +t[0],
                e = +t[1],
                i) : r ? null : [n, e]
            }
            ,
            i.nodeSize = function(t) {
                return arguments.length ? (r = !0,
                n = +t[0],
                e = +t[1],
                i) : r ? [n, e] : null
            }
            ,
            i
        }
        function Mv(t, n, e, r, i) {
            for (var o, a = t.children, u = -1, c = a.length, s = t.value && (i - e) / t.value; ++u < c; )
                (o = a[u]).x0 = n,
                o.x1 = r,
                o.y0 = e,
                o.y1 = e += o.value * s
        }
        xv.prototype = Object.create(qd.prototype);
        var kv = (1 + Math.sqrt(5)) / 2;
        function Ev(t, n, e, r, i, o) {
            for (var a, u, c, s, l, f, h, p, d, v, g, y, _ = [], m = n.children, x = 0, b = m.length, w = n.value; x < b; ) {
                for (s = i - e,
                l = o - r,
                h = p = f = m[x].value,
                y = f * f * (g = Math.max(l / s, s / l) / (w * t)),
                v = Math.max(p / y, y / h),
                c = x + 1; c < b; ++c) {
                    if (f += u = m[c].value,
                    u < h && (h = u),
                    u > p && (p = u),
                    y = f * f * g,
                    (d = Math.max(p / y, y / h)) > v) {
                        f -= u;
                        break
                    }
                    v = d
                }
                _.push(a = {
                    value: f,
                    dice: s < l,
                    children: m.slice(x, c)
                }),
                a.dice ? av(a, e, r, i, w ? r += l * f / w : o) : Mv(a, e, r, w ? e += s * f / w : i, o),
                w -= f,
                x = c
            }
            return _
        }
        var Sv = function t(n) {
            function e(t, e, r, i, o) {
                Ev(n, t, e, r, i, o)
            }
            return e.ratio = function(n) {
                return t((n = +n) > 1 ? n : 1)
            }
            ,
            e
        }(kv);
        function Av() {
            var t = Sv
              , n = !1
              , e = 1
              , r = 1
              , i = [0]
              , o = Qd
              , a = Qd
              , u = Qd
              , c = Qd
              , s = Qd;
            function l(t) {
                return t.x0 = t.y0 = 0,
                t.x1 = e,
                t.y1 = r,
                t.eachBefore(f),
                i = [0],
                n && t.eachBefore(ov),
                t
            }
            function f(n) {
                var e = i[n.depth]
                  , r = n.x0 + e
                  , l = n.y0 + e
                  , f = n.x1 - e
                  , h = n.y1 - e;
                f < r && (r = f = (r + f) / 2),
                h < l && (l = h = (l + h) / 2),
                n.x0 = r,
                n.y0 = l,
                n.x1 = f,
                n.y1 = h,
                n.children && (e = i[n.depth + 1] = o(n) / 2,
                r += s(n) - e,
                l += a(n) - e,
                (f -= u(n) - e) < r && (r = f = (r + f) / 2),
                (h -= c(n) - e) < l && (l = h = (l + h) / 2),
                t(n, r, l, f, h))
            }
            return l.round = function(t) {
                return arguments.length ? (n = !!t,
                l) : n
            }
            ,
            l.size = function(t) {
                return arguments.length ? (e = +t[0],
                r = +t[1],
                l) : [e, r]
            }
            ,
            l.tile = function(n) {
                return arguments.length ? (t = Jd(n),
                l) : t
            }
            ,
            l.padding = function(t) {
                return arguments.length ? l.paddingInner(t).paddingOuter(t) : l.paddingInner()
            }
            ,
            l.paddingInner = function(t) {
                return arguments.length ? (o = "function" == typeof t ? t : Kd(+t),
                l) : o
            }
            ,
            l.paddingOuter = function(t) {
                return arguments.length ? l.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t) : l.paddingTop()
            }
            ,
            l.paddingTop = function(t) {
                return arguments.length ? (a = "function" == typeof t ? t : Kd(+t),
                l) : a
            }
            ,
            l.paddingRight = function(t) {
                return arguments.length ? (u = "function" == typeof t ? t : Kd(+t),
                l) : u
            }
            ,
            l.paddingBottom = function(t) {
                return arguments.length ? (c = "function" == typeof t ? t : Kd(+t),
                l) : c
            }
            ,
            l.paddingLeft = function(t) {
                return arguments.length ? (s = "function" == typeof t ? t : Kd(+t),
                l) : s
            }
            ,
            l
        }
        function Nv(t, n, e, r, i) {
            var o, a, u = t.children, c = u.length, s = new Array(c + 1);
            for (s[0] = a = o = 0; o < c; ++o)
                s[o + 1] = a += u[o].value;
            function l(t, n, e, r, i, o, a) {
                if (t >= n - 1) {
                    var c = u[t];
                    return c.x0 = r,
                    c.y0 = i,
                    c.x1 = o,
                    void (c.y1 = a)
                }
                for (var f = s[t], h = e / 2 + f, p = t + 1, d = n - 1; p < d; ) {
                    var v = p + d >>> 1;
                    s[v] < h ? p = v + 1 : d = v
                }
                var g = s[p] - f
                  , y = e - g;
                if (a - i > o - r) {
                    var _ = (i * y + a * g) / e;
                    l(t, p, g, r, i, o, _),
                    l(p, n, y, r, _, o, a)
                } else {
                    var m = (r * y + o * g) / e;
                    l(t, p, g, r, i, m, a),
                    l(p, n, y, m, i, o, a)
                }
            }
            l(0, c, t.value, n, e, r, i)
        }
        function Tv(t, n, e, r, i) {
            (1 & t.depth ? Mv : av)(t, n, e, r, i)
        }
        var Cv = function t(n) {
            function e(t, e, r, i, o) {
                if ((a = t._squarify) && a.ratio === n)
                    for (var a, u, c, s, l, f = -1, h = a.length, p = t.value; ++f < h; ) {
                        for (c = (u = a[f]).children,
                        s = u.value = 0,
                        l = c.length; s < l; ++s)
                            u.value += c[s].value;
                        u.dice ? av(u, e, r, i, r += (o - r) * u.value / p) : Mv(u, e, r, e += (i - e) * u.value / p, o),
                        p -= u.value
                    }
                else
                    t._squarify = a = Ev(n, t, e, r, i, o),
                    a.ratio = n
            }
            return e.ratio = function(n) {
                return t((n = +n) > 1 ? n : 1)
            }
            ,
            e
        }(kv);
        function Pv(t, n) {
            var e;
            function r() {
                var r, i, o = e.length, a = 0, u = 0;
                for (r = 0; r < o; ++r)
                    a += (i = e[r]).x,
                    u += i.y;
                for (a = a / o - t,
                u = u / o - n,
                r = 0; r < o; ++r)
                    (i = e[r]).x -= a,
                    i.y -= u
            }
            return null == t && (t = 0),
            null == n && (n = 0),
            r.initialize = function(t) {
                e = t
            }
            ,
            r.x = function(n) {
                return arguments.length ? (t = +n,
                r) : t
            }
            ,
            r.y = function(t) {
                return arguments.length ? (n = +t,
                r) : n
            }
            ,
            r
        }
        function zv(t) {
            return function() {
                return t
            }
        }
        function Lv() {
            return 1e-6 * (Math.random() - .5)
        }
        function Rv(t) {
            return t.x + t.vx
        }
        function qv(t) {
            return t.y + t.vy
        }
        function Ov(t) {
            var n, e, r = 1, i = 1;
            function o() {
                for (var t, o, u, c, s, l, f, h = n.length, p = 0; p < i; ++p)
                    for (o = zn(n, Rv, qv).visitAfter(a),
                    t = 0; t < h; ++t)
                        u = n[t],
                        l = e[t],
                        f = l * l,
                        c = u.x + u.vx,
                        s = u.y + u.vy,
                        o.visit(d);
                function d(n, e, i, o, a) {
                    var h = n.data
                      , p = n.r
                      , d = l + p;
                    if (!h)
                        return e > c + d || o < c - d || i > s + d || a < s - d;
                    if (h.index > t) {
                        var v = c - h.x - h.vx
                          , g = s - h.y - h.vy
                          , y = v * v + g * g;
                        y < d * d && (0 === v && (y += (v = Lv()) * v),
                        0 === g && (y += (g = Lv()) * g),
                        y = (d - (y = Math.sqrt(y))) / y * r,
                        u.vx += (v *= y) * (d = (p *= p) / (f + p)),
                        u.vy += (g *= y) * d,
                        h.vx -= v * (d = 1 - d),
                        h.vy -= g * d)
                    }
                }
            }
            function a(t) {
                if (t.data)
                    return t.r = e[t.data.index];
                for (var n = t.r = 0; n < 4; ++n)
                    t[n] && t[n].r > t.r && (t.r = t[n].r)
            }
            return "function" != typeof t && (t = zv(null == t ? 1 : +t)),
            o.initialize = function(r) {
                var i, o = (n = r).length;
                for (e = new Array(o),
                i = 0; i < o; ++i)
                    e[i] = +t(n[i], i, n)
            }
            ,
            o.iterations = function(t) {
                return arguments.length ? (i = +t,
                o) : i
            }
            ,
            o.strength = function(t) {
                return arguments.length ? (r = +t,
                o) : r
            }
            ,
            o.radius = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : zv(+n),
                o) : t
            }
            ,
            o
        }
        function Dv(t, n) {
            return n
        }
        function Uv(t) {
            var n, e, r, i, o, a = Dv, u = l, c = zv(30), s = 1;
            function l(t) {
                return 1 / Math.min(i[t.source.index], i[t.target.index])
            }
            function f(r) {
                for (var i = 0, a = t.length; i < s; ++i)
                    for (var u, c, l, f, h, p, d, v = 0; v < a; ++v)
                        c = (u = t[v]).source,
                        f = (l = u.target).x + l.vx - c.x - c.vx || Lv(),
                        h = l.y + l.vy - c.y - c.vy || Lv(),
                        f *= p = ((p = Math.sqrt(f * f + h * h)) - e[v]) / p * r * n[v],
                        h *= p,
                        l.vx -= f * (d = o[v]),
                        l.vy -= h * d,
                        c.vx += f * (d = 1 - d),
                        c.vy += h * d
            }
            function h() {
                if (r) {
                    var u, c, s = r.length, l = t.length, f = H(r, a);
                    for (u = 0,
                    i = new Array(s); u < s; ++u)
                        i[u] = 0;
                    for (u = 0; u < l; ++u)
                        (c = t[u]).index = u,
                        "object" != typeof c.source && (c.source = f.get(c.source)),
                        "object" != typeof c.target && (c.target = f.get(c.target)),
                        ++i[c.source.index],
                        ++i[c.target.index];
                    for (u = 0,
                    o = new Array(l); u < l; ++u)
                        c = t[u],
                        o[u] = i[c.source.index] / (i[c.source.index] + i[c.target.index]);
                    n = new Array(l),
                    p(),
                    e = new Array(l),
                    d()
                }
            }
            function p() {
                if (r)
                    for (var e = 0, i = t.length; e < i; ++e)
                        n[e] = +u(t[e], e, t)
            }
            function d() {
                if (r)
                    for (var n = 0, i = t.length; n < i; ++n)
                        e[n] = +c(t[n], n, t)
            }
            return null == t && (t = []),
            f.initialize = function(t) {
                r = t,
                h()
            }
            ,
            f.links = function(n) {
                return arguments.length ? (t = n,
                h(),
                f) : t
            }
            ,
            f.id = function(t) {
                return arguments.length ? (a = t,
                f) : a
            }
            ,
            f.iterations = function(t) {
                return arguments.length ? (s = +t,
                f) : s
            }
            ,
            f.strength = function(t) {
                return arguments.length ? (u = "function" == typeof t ? t : zv(+t),
                p(),
                f) : u
            }
            ,
            f.distance = function(t) {
                return arguments.length ? (c = "function" == typeof t ? t : zv(+t),
                d(),
                f) : c
            }
            ,
            f
        }
        function jv(t) {
            return t.x
        }
        function Iv(t) {
            return t.y
        }
        var Fv = 10
          , Yv = Math.PI * (3 - Math.sqrt(5));
        function Bv(t) {
            var n, e = 1, r = .001, i = 1 - Math.pow(r, 1 / 300), o = 0, a = .6, u = H(), c = Da(l), s = Go("tick", "end");
            function l() {
                f(),
                s.call("tick", n),
                e < r && (c.stop(),
                s.call("end", n))
            }
            function f() {
                var n, r, c = t.length;
                for (e += (o - e) * i,
                u.each((function(t) {
                    t(e)
                }
                )),
                n = 0; n < c; ++n)
                    null == (r = t[n]).fx ? r.x += r.vx *= a : (r.x = r.fx,
                    r.vx = 0),
                    null == r.fy ? r.y += r.vy *= a : (r.y = r.fy,
                    r.vy = 0)
            }
            function h() {
                for (var n, e = 0, r = t.length; e < r; ++e) {
                    if ((n = t[e]).index = e,
                    isNaN(n.x) || isNaN(n.y)) {
                        var i = Fv * Math.sqrt(e)
                          , o = e * Yv;
                        n.x = i * Math.cos(o),
                        n.y = i * Math.sin(o)
                    }
                    (isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0)
                }
            }
            function p(n) {
                return n.initialize && n.initialize(t),
                n
            }
            return null == t && (t = []),
            h(),
            n = {
                tick: f,
                restart: function() {
                    return c.restart(l),
                    n
                },
                stop: function() {
                    return c.stop(),
                    n
                },
                nodes: function(e) {
                    return arguments.length ? (t = e,
                    h(),
                    u.each(p),
                    n) : t
                },
                alpha: function(t) {
                    return arguments.length ? (e = +t,
                    n) : e
                },
                alphaMin: function(t) {
                    return arguments.length ? (r = +t,
                    n) : r
                },
                alphaDecay: function(t) {
                    return arguments.length ? (i = +t,
                    n) : +i
                },
                alphaTarget: function(t) {
                    return arguments.length ? (o = +t,
                    n) : o
                },
                velocityDecay: function(t) {
                    return arguments.length ? (a = 1 - t,
                    n) : 1 - a
                },
                force: function(t, e) {
                    return arguments.length > 1 ? (null == e ? u.remove(t) : u.set(t, p(e)),
                    n) : u.get(t)
                },
                find: function(n, e, r) {
                    var i, o, a, u, c, s = 0, l = t.length;
                    for (null == r ? r = 1 / 0 : r *= r,
                    s = 0; s < l; ++s)
                        (a = (i = n - (u = t[s]).x) * i + (o = e - u.y) * o) < r && (c = u,
                        r = a);
                    return c
                },
                on: function(t, e) {
                    return arguments.length > 1 ? (s.on(t, e),
                    n) : s.on(t)
                }
            }
        }
        function Hv() {
            var t, n, e, r, i = zv(-30), o = 1, a = 1 / 0, u = .81;
            function c(r) {
                var i, o = t.length, a = zn(t, jv, Iv).visitAfter(l);
                for (e = r,
                i = 0; i < o; ++i)
                    n = t[i],
                    a.visit(f)
            }
            function s() {
                if (t) {
                    var n, e = t.length;
                    for (r = new Array(e),
                    n = 0; n < e; ++n)
                        r[n] = +i(t[n], n, t)
                }
            }
            function l(t) {
                var n, e, i, o, a, u = 0;
                if (t.length) {
                    for (i = o = a = 0; a < 4; ++a)
                        (n = t[a]) && (e = n.value) && (u += e,
                        i += e * n.x,
                        o += e * n.y);
                    t.x = i / u,
                    t.y = o / u
                } else {
                    (n = t).x = n.data.x,
                    n.y = n.data.y;
                    do {
                        u += r[n.data.index]
                    } while (n = n.next)
                }
                t.value = u
            }
            function f(t, i, c, s) {
                if (!t.value)
                    return !0;
                var l = t.x - n.x
                  , f = t.y - n.y
                  , h = s - i
                  , p = l * l + f * f;
                if (h * h / u < p)
                    return p < a && (0 === l && (p += (l = Lv()) * l),
                    0 === f && (p += (f = Lv()) * f),
                    p < o && (p = Math.sqrt(o * p)),
                    n.vx += l * t.value * e / p,
                    n.vy += f * t.value * e / p),
                    !0;
                if (!(t.length || p >= a)) {
                    (t.data !== n || t.next) && (0 === l && (p += (l = Lv()) * l),
                    0 === f && (p += (f = Lv()) * f),
                    p < o && (p = Math.sqrt(o * p)));
                    do {
                        t.data !== n && (h = r[t.data.index] * e / p,
                        n.vx += l * h,
                        n.vy += f * h)
                    } while (t = t.next)
                }
            }
            return c.initialize = function(n) {
                t = n,
                s()
            }
            ,
            c.strength = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : zv(+t),
                s(),
                c) : i
            }
            ,
            c.distanceMin = function(t) {
                return arguments.length ? (o = t * t,
                c) : Math.sqrt(o)
            }
            ,
            c.distanceMax = function(t) {
                return arguments.length ? (a = t * t,
                c) : Math.sqrt(a)
            }
            ,
            c.theta = function(t) {
                return arguments.length ? (u = t * t,
                c) : Math.sqrt(u)
            }
            ,
            c
        }
        function Xv(t) {
            var n, e, r, i = zv(.1);
            function o(t) {
                for (var i, o = 0, a = n.length; o < a; ++o)
                    (i = n[o]).vx += (r[o] - i.x) * e[o] * t
            }
            function a() {
                if (n) {
                    var o, a = n.length;
                    for (e = new Array(a),
                    r = new Array(a),
                    o = 0; o < a; ++o)
                        e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n)
                }
            }
            return "function" != typeof t && (t = zv(null == t ? 0 : +t)),
            o.initialize = function(t) {
                n = t,
                a()
            }
            ,
            o.strength = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : zv(+t),
                a(),
                o) : i
            }
            ,
            o.x = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : zv(+n),
                a(),
                o) : t
            }
            ,
            o
        }
        function Gv(t) {
            var n, e, r, i = zv(.1);
            function o(t) {
                for (var i, o = 0, a = n.length; o < a; ++o)
                    (i = n[o]).vy += (r[o] - i.y) * e[o] * t
            }
            function a() {
                if (n) {
                    var o, a = n.length;
                    for (e = new Array(a),
                    r = new Array(a),
                    o = 0; o < a; ++o)
                        e[o] = isNaN(r[o] = +t(n[o], o, n)) ? 0 : +i(n[o], o, n)
                }
            }
            return "function" != typeof t && (t = zv(null == t ? 0 : +t)),
            o.initialize = function(t) {
                n = t,
                a()
            }
            ,
            o.strength = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : zv(+t),
                a(),
                o) : i
            }
            ,
            o.y = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : zv(+n),
                a(),
                o) : t
            }
            ,
            o
        }
        function Vv() {
            t.event.stopImmediatePropagation()
        }
        function Wv() {
            t.event.preventDefault(),
            t.event.stopImmediatePropagation()
        }
        function $v(t) {
            var n = t.document.documentElement
              , e = Th(t).on("dragstart.drag", Wv, !0);
            "onselectstart"in n ? e.on("selectstart.drag", Wv, !0) : (n.__noselect = n.style.MozUserSelect,
            n.style.MozUserSelect = "none")
        }
        function Zv(t, n) {
            var e = t.document.documentElement
              , r = Th(t).on("dragstart.drag", null);
            n && (r.on("click.drag", Wv, !0),
            setTimeout((function() {
                r.on("click.drag", null)
            }
            ), 0)),
            "onselectstart"in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect,
            delete e.__noselect)
        }
        function Jv(t) {
            return function() {
                return t
            }
        }
        function Qv(t, n, e, r, i, o, a, u, c, s) {
            this.target = t,
            this.type = n,
            this.subject = e,
            this.identifier = r,
            this.active = i,
            this.x = o,
            this.y = a,
            this.dx = u,
            this.dy = c,
            this._ = s
        }
        function Kv() {
            return !t.event.button
        }
        function tg() {
            return this.parentNode
        }
        function ng(n) {
            return null == n ? {
                x: t.event.x,
                y: t.event.y
            } : n
        }
        function eg() {
            var n, e, r = Kv, i = tg, o = ng, a = {}, u = Go("start", "drag", "end"), c = 0;
            function s(t) {
                t.on("mousedown.drag", l).on("touchstart.drag", p).on("touchmove.drag", d).on("touchend.drag touchcancel.drag", v).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
            }
            function l() {
                if (!e && r.apply(this, arguments)) {
                    var o = g("mouse", i.apply(this, arguments), af, this, arguments);
                    o && (Th(t.event.view).on("mousemove.drag", f, !0).on("mouseup.drag", h, !0),
                    $v(t.event.view),
                    Vv(),
                    n = !1,
                    o("start"))
                }
            }
            function f() {
                Wv(),
                n = !0,
                a.mouse("drag")
            }
            function h() {
                Th(t.event.view).on("mousemove.drag mouseup.drag", null),
                Zv(t.event.view, n),
                Wv(),
                a.mouse("end")
            }
            function p() {
                if (r.apply(this, arguments)) {
                    var n, e, o = t.event.changedTouches, a = i.apply(this, arguments), u = o.length;
                    for (n = 0; n < u; ++n)
                        (e = g(o[n].identifier, a, Ph, this, arguments)) && (Vv(),
                        e("start"))
                }
            }
            function d() {
                var n, e, r = t.event.changedTouches, i = r.length;
                for (n = 0; n < i; ++n)
                    (e = a[r[n].identifier]) && (Wv(),
                    e("drag"))
            }
            function v() {
                var n, r, i = t.event.changedTouches, o = i.length;
                for (e && clearTimeout(e),
                e = setTimeout((function() {
                    e = null
                }
                ), 500),
                n = 0; n < o; ++n)
                    (r = a[i[n].identifier]) && (Vv(),
                    r("end"))
            }
            function g(n, e, r, i, l) {
                var f, h, p, d = r(e, n), v = u.copy();
                if (ef(new Qv(s,"beforestart",f,n,c,d[0],d[1],0,0,v), (function() {
                    return null != (t.event.subject = f = o.apply(i, l)) && (h = f.x - d[0] || 0,
                    p = f.y - d[1] || 0,
                    !0)
                }
                )))
                    return function t(o) {
                        var u, g = d;
                        switch (o) {
                        case "start":
                            a[n] = t,
                            u = c++;
                            break;
                        case "end":
                            delete a[n],
                            --c;
                        case "drag":
                            d = r(e, n),
                            u = c
                        }
                        ef(new Qv(s,o,f,n,u,d[0] + h,d[1] + p,d[0] - g[0],d[1] - g[1],v), v.apply, v, [o, i, l])
                    }
            }
            return s.filter = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : Jv(!!t),
                s) : r
            }
            ,
            s.container = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : Jv(t),
                s) : i
            }
            ,
            s.subject = function(t) {
                return arguments.length ? (o = "function" == typeof t ? t : Jv(t),
                s) : o
            }
            ,
            s.on = function() {
                var t = u.on.apply(u, arguments);
                return t === u ? s : t
            }
            ,
            s
        }
        function rg(t) {
            return function() {
                return t
            }
        }
        function ig(t) {
            return t[0]
        }
        function og(t) {
            return t[1]
        }
        function ag() {
            this._ = null
        }
        function ug(t) {
            t.U = t.C = t.L = t.R = t.P = t.N = null
        }
        function cg(t, n) {
            var e = n
              , r = n.R
              , i = e.U;
            i ? i.L === e ? i.L = r : i.R = r : t._ = r,
            r.U = i,
            e.U = r,
            e.R = r.L,
            e.R && (e.R.U = e),
            r.L = e
        }
        function sg(t, n) {
            var e = n
              , r = n.L
              , i = e.U;
            i ? i.L === e ? i.L = r : i.R = r : t._ = r,
            r.U = i,
            e.U = r,
            e.L = r.R,
            e.L && (e.L.U = e),
            r.R = e
        }
        function lg(t) {
            for (; t.L; )
                t = t.L;
            return t
        }
        function fg(t, n, e, r) {
            var i = [null, null]
              , o = jg.push(i) - 1;
            return i.left = t,
            i.right = n,
            e && pg(i, t, n, e),
            r && pg(i, n, t, r),
            Dg[t.index].halfedges.push(o),
            Dg[n.index].halfedges.push(o),
            i
        }
        function hg(t, n, e) {
            var r = [n, e];
            return r.left = t,
            r
        }
        function pg(t, n, e, r) {
            t[0] || t[1] ? t.left === e ? t[1] = r : t[0] = r : (t[0] = r,
            t.left = n,
            t.right = e)
        }
        function dg(t, n, e, r, i) {
            var o, a = t[0], u = t[1], c = a[0], s = a[1], l = 0, f = 1, h = u[0] - c, p = u[1] - s;
            if (o = n - c,
            h || !(o > 0)) {
                if (o /= h,
                h < 0) {
                    if (o < l)
                        return;
                    o < f && (f = o)
                } else if (h > 0) {
                    if (o > f)
                        return;
                    o > l && (l = o)
                }
                if (o = r - c,
                h || !(o < 0)) {
                    if (o /= h,
                    h < 0) {
                        if (o > f)
                            return;
                        o > l && (l = o)
                    } else if (h > 0) {
                        if (o < l)
                            return;
                        o < f && (f = o)
                    }
                    if (o = e - s,
                    p || !(o > 0)) {
                        if (o /= p,
                        p < 0) {
                            if (o < l)
                                return;
                            o < f && (f = o)
                        } else if (p > 0) {
                            if (o > f)
                                return;
                            o > l && (l = o)
                        }
                        if (o = i - s,
                        p || !(o < 0)) {
                            if (o /= p,
                            p < 0) {
                                if (o > f)
                                    return;
                                o > l && (l = o)
                            } else if (p > 0) {
                                if (o < l)
                                    return;
                                o < f && (f = o)
                            }
                            return !(l > 0 || f < 1) || (l > 0 && (t[0] = [c + l * h, s + l * p]),
                            f < 1 && (t[1] = [c + f * h, s + f * p]),
                            !0)
                        }
                    }
                }
            }
        }
        function vg(t, n, e, r, i) {
            var o = t[1];
            if (o)
                return !0;
            var a, u, c = t[0], s = t.left, l = t.right, f = s[0], h = s[1], p = l[0], d = l[1], v = (f + p) / 2, g = (h + d) / 2;
            if (d === h) {
                if (v < n || v >= r)
                    return;
                if (f > p) {
                    if (c) {
                        if (c[1] >= i)
                            return
                    } else
                        c = [v, e];
                    o = [v, i]
                } else {
                    if (c) {
                        if (c[1] < e)
                            return
                    } else
                        c = [v, i];
                    o = [v, e]
                }
            } else if (u = g - (a = (f - p) / (d - h)) * v,
            a < -1 || a > 1)
                if (f > p) {
                    if (c) {
                        if (c[1] >= i)
                            return
                    } else
                        c = [(e - u) / a, e];
                    o = [(i - u) / a, i]
                } else {
                    if (c) {
                        if (c[1] < e)
                            return
                    } else
                        c = [(i - u) / a, i];
                    o = [(e - u) / a, e]
                }
            else if (h < d) {
                if (c) {
                    if (c[0] >= r)
                        return
                } else
                    c = [n, a * n + u];
                o = [r, a * r + u]
            } else {
                if (c) {
                    if (c[0] < n)
                        return
                } else
                    c = [r, a * r + u];
                o = [n, a * n + u]
            }
            return t[0] = c,
            t[1] = o,
            !0
        }
        function gg(t, n, e, r) {
            for (var i, o = jg.length; o--; )
                vg(i = jg[o], t, n, e, r) && dg(i, t, n, e, r) && (Math.abs(i[0][0] - i[1][0]) > Ig || Math.abs(i[0][1] - i[1][1]) > Ig) || delete jg[o]
        }
        function yg(t) {
            return Dg[t.index] = {
                site: t,
                halfedges: []
            }
        }
        function _g(t, n) {
            var e = t.site
              , r = n.left
              , i = n.right;
            return e === i && (i = r,
            r = e),
            i ? Math.atan2(i[1] - r[1], i[0] - r[0]) : (e === r ? (r = n[1],
            i = n[0]) : (r = n[0],
            i = n[1]),
            Math.atan2(r[0] - i[0], i[1] - r[1]))
        }
        function mg(t, n) {
            return n[+(n.left !== t.site)]
        }
        function xg(t, n) {
            return n[+(n.left === t.site)]
        }
        function bg() {
            for (var t, n, e, r, i = 0, o = Dg.length; i < o; ++i)
                if ((t = Dg[i]) && (r = (n = t.halfedges).length)) {
                    var a = new Array(r)
                      , u = new Array(r);
                    for (e = 0; e < r; ++e)
                        a[e] = e,
                        u[e] = _g(t, jg[n[e]]);
                    for (a.sort((function(t, n) {
                        return u[n] - u[t]
                    }
                    )),
                    e = 0; e < r; ++e)
                        u[e] = n[a[e]];
                    for (e = 0; e < r; ++e)
                        n[e] = u[e]
                }
        }
        function wg(t, n, e, r) {
            var i, o, a, u, c, s, l, f, h, p, d, v, g = Dg.length, y = !0;
            for (i = 0; i < g; ++i)
                if (o = Dg[i]) {
                    for (a = o.site,
                    u = (c = o.halfedges).length; u--; )
                        jg[c[u]] || c.splice(u, 1);
                    for (u = 0,
                    s = c.length; u < s; )
                        d = (p = xg(o, jg[c[u]]))[0],
                        v = p[1],
                        f = (l = mg(o, jg[c[++u % s]]))[0],
                        h = l[1],
                        (Math.abs(d - f) > Ig || Math.abs(v - h) > Ig) && (c.splice(u, 0, jg.push(hg(a, p, Math.abs(d - t) < Ig && r - v > Ig ? [t, Math.abs(f - t) < Ig ? h : r] : Math.abs(v - r) < Ig && e - d > Ig ? [Math.abs(h - r) < Ig ? f : e, r] : Math.abs(d - e) < Ig && v - n > Ig ? [e, Math.abs(f - e) < Ig ? h : n] : Math.abs(v - n) < Ig && d - t > Ig ? [Math.abs(h - n) < Ig ? f : t, n] : null)) - 1),
                        ++s);
                    s && (y = !1)
                }
            if (y) {
                var _, m, x, b = 1 / 0;
                for (i = 0,
                y = null; i < g; ++i)
                    (o = Dg[i]) && (x = (_ = (a = o.site)[0] - t) * _ + (m = a[1] - n) * m) < b && (b = x,
                    y = o);
                if (y) {
                    var w = [t, n]
                      , M = [t, r]
                      , k = [e, r]
                      , E = [e, n];
                    y.halfedges.push(jg.push(hg(a = y.site, w, M)) - 1, jg.push(hg(a, M, k)) - 1, jg.push(hg(a, k, E)) - 1, jg.push(hg(a, E, w)) - 1)
                }
            }
            for (i = 0; i < g; ++i)
                (o = Dg[i]) && (o.halfedges.length || delete Dg[i])
        }
        Qv.prototype.on = function() {
            var t = this._.on.apply(this._, arguments);
            return t === this._ ? this : t
        }
        ,
        ag.prototype = {
            constructor: ag,
            insert: function(t, n) {
                var e, r, i;
                if (t) {
                    if (n.P = t,
                    n.N = t.N,
                    t.N && (t.N.P = n),
                    t.N = n,
                    t.R) {
                        for (t = t.R; t.L; )
                            t = t.L;
                        t.L = n
                    } else
                        t.R = n;
                    e = t
                } else
                    this._ ? (t = lg(this._),
                    n.P = null,
                    n.N = t,
                    t.P = t.L = n,
                    e = t) : (n.P = n.N = null,
                    this._ = n,
                    e = null);
                for (n.L = n.R = null,
                n.U = e,
                n.C = !0,
                t = n; e && e.C; )
                    e === (r = e.U).L ? (i = r.R) && i.C ? (e.C = i.C = !1,
                    r.C = !0,
                    t = r) : (t === e.R && (cg(this, e),
                    e = (t = e).U),
                    e.C = !1,
                    r.C = !0,
                    sg(this, r)) : (i = r.L) && i.C ? (e.C = i.C = !1,
                    r.C = !0,
                    t = r) : (t === e.L && (sg(this, e),
                    e = (t = e).U),
                    e.C = !1,
                    r.C = !0,
                    cg(this, r)),
                    e = t.U;
                this._.C = !1
            },
            remove: function(t) {
                t.N && (t.N.P = t.P),
                t.P && (t.P.N = t.N),
                t.N = t.P = null;
                var n, e, r, i = t.U, o = t.L, a = t.R;
                if (e = o ? a ? lg(a) : o : a,
                i ? i.L === t ? i.L = e : i.R = e : this._ = e,
                o && a ? (r = e.C,
                e.C = t.C,
                e.L = o,
                o.U = e,
                e !== a ? (i = e.U,
                e.U = t.U,
                t = e.R,
                i.L = t,
                e.R = a,
                a.U = e) : (e.U = i,
                i = e,
                t = e.R)) : (r = t.C,
                t = e),
                t && (t.U = i),
                !r)
                    if (t && t.C)
                        t.C = !1;
                    else {
                        do {
                            if (t === this._)
                                break;
                            if (t === i.L) {
                                if ((n = i.R).C && (n.C = !1,
                                i.C = !0,
                                cg(this, i),
                                n = i.R),
                                n.L && n.L.C || n.R && n.R.C) {
                                    n.R && n.R.C || (n.L.C = !1,
                                    n.C = !0,
                                    sg(this, n),
                                    n = i.R),
                                    n.C = i.C,
                                    i.C = n.R.C = !1,
                                    cg(this, i),
                                    t = this._;
                                    break
                                }
                            } else if ((n = i.L).C && (n.C = !1,
                            i.C = !0,
                            sg(this, i),
                            n = i.L),
                            n.L && n.L.C || n.R && n.R.C) {
                                n.L && n.L.C || (n.R.C = !1,
                                n.C = !0,
                                cg(this, n),
                                n = i.L),
                                n.C = i.C,
                                i.C = n.L.C = !1,
                                sg(this, i),
                                t = this._;
                                break
                            }
                            n.C = !0,
                            t = i,
                            i = i.U
                        } while (!t.C);
                        t && (t.C = !1)
                    }
            }
        };
        var Mg, kg = [];
        function Eg() {
            ug(this),
            this.x = this.y = this.arc = this.site = this.cy = null
        }
        function Sg(t) {
            var n = t.P
              , e = t.N;
            if (n && e) {
                var r = n.site
                  , i = t.site
                  , o = e.site;
                if (r !== o) {
                    var a = i[0]
                      , u = i[1]
                      , c = r[0] - a
                      , s = r[1] - u
                      , l = o[0] - a
                      , f = o[1] - u
                      , h = 2 * (c * f - s * l);
                    if (!(h >= -Fg)) {
                        var p = c * c + s * s
                          , d = l * l + f * f
                          , v = (f * p - s * d) / h
                          , g = (c * d - l * p) / h
                          , y = kg.pop() || new Eg;
                        y.arc = t,
                        y.site = i,
                        y.x = v + a,
                        y.y = (y.cy = g + u) + Math.sqrt(v * v + g * g),
                        t.circle = y;
                        for (var _ = null, m = Ug._; m; )
                            if (y.y < m.y || y.y === m.y && y.x <= m.x) {
                                if (!m.L) {
                                    _ = m.P;
                                    break
                                }
                                m = m.L
                            } else {
                                if (!m.R) {
                                    _ = m;
                                    break
                                }
                                m = m.R
                            }
                        Ug.insert(_, y),
                        _ || (Mg = y)
                    }
                }
            }
        }
        function Ag(t) {
            var n = t.circle;
            n && (n.P || (Mg = n.N),
            Ug.remove(n),
            kg.push(n),
            ug(n),
            t.circle = null)
        }
        var Ng = [];
        function Tg() {
            ug(this),
            this.edge = this.site = this.circle = null
        }
        function Cg(t) {
            var n = Ng.pop() || new Tg;
            return n.site = t,
            n
        }
        function Pg(t) {
            Ag(t),
            Og.remove(t),
            Ng.push(t),
            ug(t)
        }
        function zg(t) {
            var n = t.circle
              , e = n.x
              , r = n.cy
              , i = [e, r]
              , o = t.P
              , a = t.N
              , u = [t];
            Pg(t);
            for (var c = o; c.circle && Math.abs(e - c.circle.x) < Ig && Math.abs(r - c.circle.cy) < Ig; )
                o = c.P,
                u.unshift(c),
                Pg(c),
                c = o;
            u.unshift(c),
            Ag(c);
            for (var s = a; s.circle && Math.abs(e - s.circle.x) < Ig && Math.abs(r - s.circle.cy) < Ig; )
                a = s.N,
                u.push(s),
                Pg(s),
                s = a;
            u.push(s),
            Ag(s);
            var l, f = u.length;
            for (l = 1; l < f; ++l)
                s = u[l],
                c = u[l - 1],
                pg(s.edge, c.site, s.site, i);
            c = u[0],
            (s = u[f - 1]).edge = fg(c.site, s.site, null, i),
            Sg(c),
            Sg(s)
        }
        function Lg(t) {
            for (var n, e, r, i, o = t[0], a = t[1], u = Og._; u; )
                if ((r = Rg(u, a) - o) > Ig)
                    u = u.L;
                else {
                    if (!((i = o - qg(u, a)) > Ig)) {
                        r > -Ig ? (n = u.P,
                        e = u) : i > -Ig ? (n = u,
                        e = u.N) : n = e = u;
                        break
                    }
                    if (!u.R) {
                        n = u;
                        break
                    }
                    u = u.R
                }
            yg(t);
            var c = Cg(t);
            if (Og.insert(n, c),
            n || e) {
                if (n === e)
                    return Ag(n),
                    e = Cg(n.site),
                    Og.insert(c, e),
                    c.edge = e.edge = fg(n.site, c.site),
                    Sg(n),
                    void Sg(e);
                if (e) {
                    Ag(n),
                    Ag(e);
                    var s = n.site
                      , l = s[0]
                      , f = s[1]
                      , h = t[0] - l
                      , p = t[1] - f
                      , d = e.site
                      , v = d[0] - l
                      , g = d[1] - f
                      , y = 2 * (h * g - p * v)
                      , _ = h * h + p * p
                      , m = v * v + g * g
                      , x = [(g * _ - p * m) / y + l, (h * m - v * _) / y + f];
                    pg(e.edge, s, d, x),
                    c.edge = fg(s, t, null, x),
                    e.edge = fg(t, d, null, x),
                    Sg(n),
                    Sg(e)
                } else
                    c.edge = fg(n.site, c.site)
            }
        }
        function Rg(t, n) {
            var e = t.site
              , r = e[0]
              , i = e[1]
              , o = i - n;
            if (!o)
                return r;
            var a = t.P;
            if (!a)
                return -1 / 0;
            var u = (e = a.site)[0]
              , c = e[1]
              , s = c - n;
            if (!s)
                return u;
            var l = u - r
              , f = 1 / o - 1 / s
              , h = l / s;
            return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * s) - c + s / 2 + i - o / 2))) / f + r : (r + u) / 2
        }
        function qg(t, n) {
            var e = t.N;
            if (e)
                return Rg(e, n);
            var r = t.site;
            return r[1] === n ? r[0] : 1 / 0
        }
        var Og, Dg, Ug, jg, Ig = 1e-6, Fg = 1e-12;
        function Yg(t, n, e) {
            return (t[0] - e[0]) * (n[1] - t[1]) - (t[0] - n[0]) * (e[1] - t[1])
        }
        function Bg(t, n) {
            return n[1] - t[1] || n[0] - t[0]
        }
        function Hg(t, n) {
            var e, r, i, o = t.sort(Bg).pop();
            for (jg = [],
            Dg = new Array(t.length),
            Og = new ag,
            Ug = new ag; ; )
                if (i = Mg,
                o && (!i || o[1] < i.y || o[1] === i.y && o[0] < i.x))
                    o[0] === e && o[1] === r || (Lg(o),
                    e = o[0],
                    r = o[1]),
                    o = t.pop();
                else {
                    if (!i)
                        break;
                    zg(i.arc)
                }
            if (bg(),
            n) {
                var a = +n[0][0]
                  , u = +n[0][1]
                  , c = +n[1][0]
                  , s = +n[1][1];
                gg(a, u, c, s),
                wg(a, u, c, s)
            }
            this.edges = jg,
            this.cells = Dg,
            Og = Ug = jg = Dg = null
        }
        function Xg() {
            var t = ig
              , n = og
              , e = null;
            function r(r) {
                return new Hg(r.map((function(e, i) {
                    var o = [Math.round(t(e, i, r) / Ig) * Ig, Math.round(n(e, i, r) / Ig) * Ig];
                    return o.index = i,
                    o.data = e,
                    o
                }
                )),e)
            }
            return r.polygons = function(t) {
                return r(t).polygons()
            }
            ,
            r.links = function(t) {
                return r(t).links()
            }
            ,
            r.triangles = function(t) {
                return r(t).triangles()
            }
            ,
            r.x = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : rg(+n),
                r) : t
            }
            ,
            r.y = function(t) {
                return arguments.length ? (n = "function" == typeof t ? t : rg(+t),
                r) : n
            }
            ,
            r.extent = function(t) {
                return arguments.length ? (e = null == t ? null : [[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]],
                r) : e && [[e[0][0], e[0][1]], [e[1][0], e[1][1]]]
            }
            ,
            r.size = function(t) {
                return arguments.length ? (e = null == t ? null : [[0, 0], [+t[0], +t[1]]],
                r) : e && [e[1][0], e[1][1]]
            }
            ,
            r
        }
        function Gg(t) {
            return function() {
                return t
            }
        }
        function Vg(t, n, e) {
            this.target = t,
            this.type = n,
            this.transform = e
        }
        function Wg(t, n, e) {
            this.k = t,
            this.x = n,
            this.y = e
        }
        Hg.prototype = {
            constructor: Hg,
            polygons: function() {
                var t = this.edges;
                return this.cells.map((function(n) {
                    var e = n.halfedges.map((function(e) {
                        return mg(n, t[e])
                    }
                    ));
                    return e.data = n.site.data,
                    e
                }
                ))
            },
            triangles: function() {
                var t = []
                  , n = this.edges;
                return this.cells.forEach((function(e, r) {
                    for (var i, o = e.site, a = e.halfedges, u = -1, c = a.length, s = n[a[c - 1]], l = s.left === o ? s.right : s.left; ++u < c; )
                        i = l,
                        l = (s = n[a[u]]).left === o ? s.right : s.left,
                        r < i.index && r < l.index && Yg(o, i, l) < 0 && t.push([o.data, i.data, l.data])
                }
                )),
                t
            },
            links: function() {
                return this.edges.filter((function(t) {
                    return t.right
                }
                )).map((function(t) {
                    return {
                        source: t.left.data,
                        target: t.right.data
                    }
                }
                ))
            }
        },
        Wg.prototype = {
            constructor: Wg,
            scale: function(t) {
                return 1 === t ? this : new Wg(this.k * t,this.x,this.y)
            },
            translate: function(t, n) {
                return 0 === t & 0 === n ? this : new Wg(this.k,this.x + this.k * t,this.y + this.k * n)
            },
            apply: function(t) {
                return [t[0] * this.k + this.x, t[1] * this.k + this.y]
            },
            applyX: function(t) {
                return t * this.k + this.x
            },
            applyY: function(t) {
                return t * this.k + this.y
            },
            invert: function(t) {
                return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
            },
            invertX: function(t) {
                return (t - this.x) / this.k
            },
            invertY: function(t) {
                return (t - this.y) / this.k
            },
            rescaleX: function(t) {
                return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
            },
            rescaleY: function(t) {
                return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
            },
            toString: function() {
                return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
            }
        };
        var $g = new Wg(1,0,0);
        function Zg(t) {
            return t.__zoom || $g
        }
        function Jg() {
            t.event.stopImmediatePropagation()
        }
        function Qg() {
            t.event.preventDefault(),
            t.event.stopImmediatePropagation()
        }
        function Kg() {
            return !t.event.button
        }
        function ty() {
            var t, n, e = this;
            return e instanceof SVGElement ? (t = (e = e.ownerSVGElement || e).width.baseVal.value,
            n = e.height.baseVal.value) : (t = e.clientWidth,
            n = e.clientHeight),
            [[0, 0], [t, n]]
        }
        function ny() {
            return this.__zoom || $g
        }
        function ey() {
            var n, e, r, i, o, a, u = Kg, c = ty, s = 0, l = 1 / 0, f = -l, h = l, p = f, d = h, v = 250, g = [], y = Go("start", "zoom", "end"), _ = 500, m = 150;
            function x(t) {
                t.on("wheel.zoom", N).on("mousedown.zoom", T).on("dblclick.zoom", C).on("touchstart.zoom", P).on("touchmove.zoom", z).on("touchend.zoom touchcancel.zoom", L).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").property("__zoom", ny)
            }
            function b(t, n) {
                return (n = Math.max(s, Math.min(l, n))) === t.k ? t : new Wg(n,t.x,t.y)
            }
            function w(t, n, e) {
                var r = n[0] - e[0] * t.k
                  , i = n[1] - e[1] * t.k;
                return r === t.x && i === t.y ? t : new Wg(t.k,r,i)
            }
            function M(t, n) {
                var e = Math.min(0, t.invertX(n[0][0]) - f) || Math.max(0, t.invertX(n[1][0]) - h)
                  , r = Math.min(0, t.invertY(n[0][1]) - p) || Math.max(0, t.invertY(n[1][1]) - d);
                return e || r ? t.translate(e, r) : t
            }
            function k(t) {
                return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
            }
            function E(t, n, e) {
                t.on("start.zoom", (function() {
                    S(this, arguments).start()
                }
                )).on("interrupt.zoom end.zoom", (function() {
                    S(this, arguments).end()
                }
                )).tween("zoom", (function() {
                    var t = this
                      , r = arguments
                      , i = S(t, r)
                      , o = c.apply(t, r)
                      , a = e || k(o)
                      , u = Math.max(o[1][0] - o[0][0], o[1][1] - o[0][1])
                      , s = t.__zoom
                      , l = "function" == typeof n ? n.apply(t, r) : n
                      , f = Lo(s.invert(a).concat(u / s.k), l.invert(a).concat(u / l.k));
                    return function(t) {
                        if (1 === t)
                            t = l;
                        else {
                            var n = f(t)
                              , e = u / n[2];
                            t = new Wg(e,a[0] - n[0] * e,a[1] - n[1] * e)
                        }
                        i.zoom(null, t)
                    }
                }
                ))
            }
            function S(t, n) {
                for (var e, r = 0, i = g.length; r < i; ++r)
                    if ((e = g[r]).that === t)
                        return e;
                return new A(t,n)
            }
            function A(t, n) {
                this.that = t,
                this.args = n,
                this.index = -1,
                this.active = 0
            }
            function N() {
                if (u.apply(this, arguments)) {
                    var n = S(this, arguments)
                      , i = this.__zoom
                      , o = Math.max(s, Math.min(l, i.k * Math.pow(2, -t.event.deltaY * (t.event.deltaMode ? 120 : 1) / 500)));
                    if (a) {
                        var f = af(this);
                        e[0] === f[0] && e[1] === f[1] || (r = i.invert(e = f)),
                        clearTimeout(a)
                    } else {
                        if (i.k === o)
                            return;
                        n.extent = c.apply(this, arguments),
                        r = i.invert(e = af(this)),
                        Gh(this),
                        n.start()
                    }
                    Qg(),
                    a = setTimeout(h, m),
                    n.zoom("mouse", M(w(b(i, o), e, r), n.extent))
                }
                function h() {
                    a = null,
                    n.end()
                }
            }
            function T() {
                if (!o && u.apply(this, arguments)) {
                    var i = S(this, arguments)
                      , a = Th(t.event.view).on("mousemove.zoom", s, !0).on("mouseup.zoom", l, !0);
                    $v(t.event.view),
                    Jg(),
                    n = !1,
                    i.extent = c.apply(this, arguments),
                    r = this.__zoom.invert(e = af(this)),
                    Gh(this),
                    i.start()
                }
                function s() {
                    Qg(),
                    n = !0,
                    i.zoom("mouse", M(w(i.that.__zoom, e = af(i.that), r), i.extent))
                }
                function l() {
                    a.on("mousemove.zoom mouseup.zoom", null),
                    Zv(t.event.view, n),
                    Qg(),
                    i.end()
                }
            }
            function C() {
                if (u.apply(this, arguments)) {
                    var n = this.__zoom
                      , e = af(this)
                      , r = n.invert(e)
                      , i = M(w(b(n, n.k * (t.event.shiftKey ? .5 : 2)), e, r), c.apply(this, arguments));
                    Qg(),
                    v > 0 ? Th(this).transition().duration(v).call(E, i, e) : Th(this).call(x.transform, i)
                }
            }
            function P() {
                if (u.apply(this, arguments)) {
                    var n, e, r, o = S(this, arguments), a = t.event.changedTouches, s = a.length;
                    for (Jg(),
                    n = 0; n < s; ++n)
                        r = [r = Ph(this, a, (e = a[n]).identifier), this.__zoom.invert(r), e.identifier],
                        o.touch0 ? o.touch1 || (o.touch1 = r) : o.touch0 = r;
                    if (i && (i = clearTimeout(i),
                    !o.touch1))
                        return o.end(),
                        C.apply(this, arguments);
                    t.event.touches.length === s && (i = setTimeout((function() {
                        i = null
                    }
                    ), _),
                    Gh(this),
                    o.extent = c.apply(this, arguments),
                    o.start())
                }
            }
            function z() {
                var n, e, r, o, a = S(this, arguments), u = t.event.changedTouches, c = u.length;
                for (Qg(),
                i && (i = clearTimeout(i)),
                n = 0; n < c; ++n)
                    r = Ph(this, u, (e = u[n]).identifier),
                    a.touch0 && a.touch0[2] === e.identifier ? a.touch0[0] = r : a.touch1 && a.touch1[2] === e.identifier && (a.touch1[0] = r);
                if (e = a.that.__zoom,
                a.touch1) {
                    var s = a.touch0[0]
                      , l = a.touch0[1]
                      , f = a.touch1[0]
                      , h = a.touch1[1]
                      , p = (p = f[0] - s[0]) * p + (p = f[1] - s[1]) * p
                      , d = (d = h[0] - l[0]) * d + (d = h[1] - l[1]) * d;
                    e = b(e, Math.sqrt(p / d)),
                    r = [(s[0] + f[0]) / 2, (s[1] + f[1]) / 2],
                    o = [(l[0] + h[0]) / 2, (l[1] + h[1]) / 2]
                } else {
                    if (!a.touch0)
                        return;
                    r = a.touch0[0],
                    o = a.touch0[1]
                }
                a.zoom("touch", M(w(e, r, o), a.extent))
            }
            function L() {
                var n, e, r = S(this, arguments), i = t.event.changedTouches, a = i.length;
                for (Jg(),
                o && clearTimeout(o),
                o = setTimeout((function() {
                    o = null
                }
                ), _),
                n = 0; n < a; ++n)
                    e = i[n],
                    r.touch0 && r.touch0[2] === e.identifier ? delete r.touch0 : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
                r.touch1 && !r.touch0 && (r.touch0 = r.touch1,
                delete r.touch1),
                r.touch0 || r.end()
            }
            return x.transform = function(t, n) {
                var e = t.selection ? t.selection() : t;
                e.property("__zoom", ny),
                t !== e ? E(t, n) : e.interrupt().each((function() {
                    S(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end()
                }
                ))
            }
            ,
            x.scaleBy = function(t, n) {
                x.scaleTo(t, (function() {
                    return this.__zoom.k * ("function" == typeof n ? n.apply(this, arguments) : n)
                }
                ))
            }
            ,
            x.scaleTo = function(t, n) {
                x.transform(t, (function() {
                    var t = c.apply(this, arguments)
                      , e = this.__zoom
                      , r = k(t)
                      , i = e.invert(r);
                    return M(w(b(e, "function" == typeof n ? n.apply(this, arguments) : n), r, i), t)
                }
                ))
            }
            ,
            x.translateBy = function(t, n, e) {
                x.transform(t, (function() {
                    return M(this.__zoom.translate("function" == typeof n ? n.apply(this, arguments) : n, "function" == typeof e ? e.apply(this, arguments) : e), c.apply(this, arguments))
                }
                ))
            }
            ,
            A.prototype = {
                start: function() {
                    return 1 == ++this.active && (this.index = g.push(this) - 1,
                    this.emit("start")),
                    this
                },
                zoom: function(t, n) {
                    return e && "mouse" !== t && (r = n.invert(e)),
                    this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])),
                    this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])),
                    this.that.__zoom = n,
                    this.emit("zoom"),
                    this
                },
                end: function() {
                    return 0 == --this.active && (g.splice(this.index, 1),
                    e = r = null,
                    this.index = -1,
                    this.emit("end")),
                    this
                },
                emit: function(t) {
                    ef(new Vg(x,t,this.that.__zoom), y.apply, y, [t, this.that, this.args])
                }
            },
            x.filter = function(t) {
                return arguments.length ? (u = "function" == typeof t ? t : Gg(!!t),
                x) : u
            }
            ,
            x.extent = function(t) {
                return arguments.length ? (c = "function" == typeof t ? t : Gg([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]),
                x) : c
            }
            ,
            x.scaleExtent = function(t) {
                return arguments.length ? (s = +t[0],
                l = +t[1],
                x) : [s, l]
            }
            ,
            x.translateExtent = function(t) {
                return arguments.length ? (f = +t[0][0],
                h = +t[1][0],
                p = +t[0][1],
                d = +t[1][1],
                x) : [[f, p], [h, d]]
            }
            ,
            x.duration = function(t) {
                return arguments.length ? (v = +t,
                x) : v
            }
            ,
            x.on = function() {
                var t = y.on.apply(y, arguments);
                return t === y ? x : t
            }
            ,
            x
        }
        function ry(t) {
            return function() {
                return t
            }
        }
        function iy(t, n, e) {
            this.target = t,
            this.type = n,
            this.selection = e
        }
        function oy() {
            t.event.stopImmediatePropagation()
        }
        function ay() {
            t.event.preventDefault(),
            t.event.stopImmediatePropagation()
        }
        Zg.prototype = Wg.prototype;
        var uy = {
            name: "drag"
        }
          , cy = {
            name: "space"
        }
          , sy = {
            name: "handle"
        }
          , ly = {
            name: "center"
        }
          , fy = {
            name: "x",
            handles: ["e", "w"].map(my),
            input: function(t, n) {
                return t && [[t[0], n[0][1]], [t[1], n[1][1]]]
            },
            output: function(t) {
                return t && [t[0][0], t[1][0]]
            }
        }
          , hy = {
            name: "y",
            handles: ["n", "s"].map(my),
            input: function(t, n) {
                return t && [[n[0][0], t[0]], [n[1][0], t[1]]]
            },
            output: function(t) {
                return t && [t[0][1], t[1][1]]
            }
        }
          , py = {
            name: "xy",
            handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(my),
            input: function(t) {
                return t
            },
            output: function(t) {
                return t
            }
        }
          , dy = {
            overlay: "crosshair",
            selection: "move",
            n: "ns-resize",
            e: "ew-resize",
            s: "ns-resize",
            w: "ew-resize",
            nw: "nwse-resize",
            ne: "nesw-resize",
            se: "nwse-resize",
            sw: "nesw-resize"
        }
          , vy = {
            e: "w",
            w: "e",
            nw: "ne",
            ne: "nw",
            se: "sw",
            sw: "se"
        }
          , gy = {
            n: "s",
            s: "n",
            nw: "sw",
            ne: "se",
            se: "ne",
            sw: "nw"
        }
          , yy = {
            overlay: 1,
            selection: 1,
            n: null,
            e: 1,
            s: null,
            w: -1,
            nw: -1,
            ne: 1,
            se: 1,
            sw: -1
        }
          , _y = {
            overlay: 1,
            selection: 1,
            n: -1,
            e: null,
            s: 1,
            w: null,
            nw: -1,
            ne: -1,
            se: 1,
            sw: 1
        };
        function my(t) {
            return {
                type: t
            }
        }
        function xy() {
            return !t.event.button
        }
        function by() {
            var t = this.ownerSVGElement || this;
            return [[0, 0], [t.width.baseVal.value, t.height.baseVal.value]]
        }
        function wy(t) {
            for (; !t.__brush; )
                if (!(t = t.parentNode))
                    return;
            return t.__brush
        }
        function My(t) {
            return t[0][0] === t[1][0] || t[0][1] === t[1][1]
        }
        function ky(t) {
            var n = t.__brush;
            return n ? n.dim.output(n.selection) : null
        }
        function Ey() {
            return Ny(fy)
        }
        function Sy() {
            return Ny(hy)
        }
        function Ay() {
            return Ny(py)
        }
        function Ny(n) {
            var e, r = by, i = xy, o = Go(u, "start", "brush", "end"), a = 6;
            function u(t) {
                var e = t.property("__brush", h).selectAll(".overlay").data([my("overlay")]);
                e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", dy.overlay).merge(e).each((function() {
                    var t = wy(this).extent;
                    Th(this).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1])
                }
                )),
                t.selectAll(".selection").data([my("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", dy.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
                var r = t.selectAll(".handle").data(n.handles, (function(t) {
                    return t.type
                }
                ));
                r.exit().remove(),
                r.enter().append("rect").attr("class", (function(t) {
                    return "handle handle--" + t.type
                }
                )).attr("cursor", (function(t) {
                    return dy[t.type]
                }
                )),
                t.each(c).attr("fill", "none").attr("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush touchstart.brush", f)
            }
            function c() {
                var t = Th(this)
                  , n = wy(this).selection;
                n ? (t.selectAll(".selection").style("display", null).attr("x", n[0][0]).attr("y", n[0][1]).attr("width", n[1][0] - n[0][0]).attr("height", n[1][1] - n[0][1]),
                t.selectAll(".handle").style("display", null).attr("x", (function(t) {
                    return "e" === t.type[t.type.length - 1] ? n[1][0] - a / 2 : n[0][0] - a / 2
                }
                )).attr("y", (function(t) {
                    return "s" === t.type[0] ? n[1][1] - a / 2 : n[0][1] - a / 2
                }
                )).attr("width", (function(t) {
                    return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + a : a
                }
                )).attr("height", (function(t) {
                    return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + a : a
                }
                ))) : t.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null)
            }
            function s(t, n) {
                return t.__brush.emitter || new l(t,n)
            }
            function l(t, n) {
                this.that = t,
                this.args = n,
                this.state = t.__brush,
                this.active = 0
            }
            function f() {
                if (t.event.touches) {
                    if (t.event.changedTouches.length < t.event.touches.length)
                        return ay()
                } else if (e)
                    return;
                if (i.apply(this, arguments)) {
                    var r, o, a, u, l, f, h, p, d, v, g, y, _, m = this, x = t.event.target.__data__.type, b = "selection" === (t.event.metaKey ? x = "overlay" : x) ? uy : t.event.altKey ? ly : sy, w = n === hy ? null : yy[x], M = n === fy ? null : _y[x], k = wy(m), E = k.extent, S = k.selection, A = E[0][0], N = E[0][1], T = E[1][0], C = E[1][1], P = w && M && t.event.shiftKey, z = af(m), L = z, R = s(m, arguments).beforestart();
                    "overlay" === x ? k.selection = S = [[r = n === hy ? A : z[0], a = n === fy ? N : z[1]], [l = n === hy ? T : r, h = n === fy ? C : a]] : (r = S[0][0],
                    a = S[0][1],
                    l = S[1][0],
                    h = S[1][1]),
                    o = r,
                    u = a,
                    f = l,
                    p = h;
                    var q = Th(m).attr("pointer-events", "none")
                      , O = q.selectAll(".overlay").attr("cursor", dy[x]);
                    if (t.event.touches)
                        q.on("touchmove.brush", U, !0).on("touchend.brush touchcancel.brush", I, !0);
                    else {
                        var D = Th(t.event.view).on("keydown.brush", F, !0).on("keyup.brush", Y, !0).on("mousemove.brush", U, !0).on("mouseup.brush", I, !0);
                        $v(t.event.view)
                    }
                    oy(),
                    Gh(m),
                    c.call(m),
                    R.start()
                }
                function U() {
                    var t = af(m);
                    !P || y || _ || (Math.abs(t[0] - L[0]) > Math.abs(t[1] - L[1]) ? _ = !0 : y = !0),
                    L = t,
                    g = !0,
                    ay(),
                    j()
                }
                function j() {
                    var t;
                    switch (d = L[0] - z[0],
                    v = L[1] - z[1],
                    b) {
                    case cy:
                    case uy:
                        w && (d = Math.max(A - r, Math.min(T - l, d)),
                        o = r + d,
                        f = l + d),
                        M && (v = Math.max(N - a, Math.min(C - h, v)),
                        u = a + v,
                        p = h + v);
                        break;
                    case sy:
                        w < 0 ? (d = Math.max(A - r, Math.min(T - r, d)),
                        o = r + d,
                        f = l) : w > 0 && (d = Math.max(A - l, Math.min(T - l, d)),
                        o = r,
                        f = l + d),
                        M < 0 ? (v = Math.max(N - a, Math.min(C - a, v)),
                        u = a + v,
                        p = h) : M > 0 && (v = Math.max(N - h, Math.min(C - h, v)),
                        u = a,
                        p = h + v);
                        break;
                    case ly:
                        w && (o = Math.max(A, Math.min(T, r - d * w)),
                        f = Math.max(A, Math.min(T, l + d * w))),
                        M && (u = Math.max(N, Math.min(C, a - v * M)),
                        p = Math.max(N, Math.min(C, h + v * M)))
                    }
                    f < o && (w *= -1,
                    t = r,
                    r = l,
                    l = t,
                    t = o,
                    o = f,
                    f = t,
                    x in vy && O.attr("cursor", dy[x = vy[x]])),
                    p < u && (M *= -1,
                    t = a,
                    a = h,
                    h = t,
                    t = u,
                    u = p,
                    p = t,
                    x in gy && O.attr("cursor", dy[x = gy[x]])),
                    S = k.selection,
                    y && (o = S[0][0],
                    f = S[1][0]),
                    _ && (u = S[0][1],
                    p = S[1][1]),
                    S[0][0] === o && S[0][1] === u && S[1][0] === f && S[1][1] === p || (k.selection = [[o, u], [f, p]],
                    c.call(m),
                    R.brush())
                }
                function I() {
                    if (oy(),
                    t.event.touches) {
                        if (t.event.touches.length)
                            return;
                        e && clearTimeout(e),
                        e = setTimeout((function() {
                            e = null
                        }
                        ), 500),
                        q.on("touchmove.brush touchend.brush touchcancel.brush", null)
                    } else
                        Zv(t.event.view, g),
                        D.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
                    q.attr("pointer-events", "all"),
                    O.attr("cursor", dy.overlay),
                    My(S) && (k.selection = null,
                    c.call(m)),
                    R.end()
                }
                function F() {
                    switch (t.event.keyCode) {
                    case 16:
                        P = w && M;
                        break;
                    case 18:
                        b === sy && (w && (l = f - d * w,
                        r = o + d * w),
                        M && (h = p - v * M,
                        a = u + v * M),
                        b = ly,
                        j());
                        break;
                    case 32:
                        b !== sy && b !== ly || (w < 0 ? l = f - d : w > 0 && (r = o - d),
                        M < 0 ? h = p - v : M > 0 && (a = u - v),
                        b = cy,
                        O.attr("cursor", dy.selection),
                        j());
                        break;
                    default:
                        return
                    }
                    ay()
                }
                function Y() {
                    switch (t.event.keyCode) {
                    case 16:
                        P && (y = _ = P = !1,
                        j());
                        break;
                    case 18:
                        b === ly && (w < 0 ? l = f : w > 0 && (r = o),
                        M < 0 ? h = p : M > 0 && (a = u),
                        b = sy,
                        j());
                        break;
                    case 32:
                        b === cy && (t.event.altKey ? (w && (l = f - d * w,
                        r = o + d * w),
                        M && (h = p - v * M,
                        a = u + v * M),
                        b = ly) : (w < 0 ? l = f : w > 0 && (r = o),
                        M < 0 ? h = p : M > 0 && (a = u),
                        b = sy),
                        O.attr("cursor", dy[x]),
                        j());
                        break;
                    default:
                        return
                    }
                    ay()
                }
            }
            function h() {
                var t = this.__brush || {
                    selection: null
                };
                return t.extent = r.apply(this, arguments),
                t.dim = n,
                t
            }
            return u.move = function(t, e) {
                t.selection ? t.on("start.brush", (function() {
                    s(this, arguments).beforestart().start()
                }
                )).on("interrupt.brush end.brush", (function() {
                    s(this, arguments).end()
                }
                )).tween("brush", (function() {
                    var t = this
                      , r = t.__brush
                      , i = s(t, arguments)
                      , o = r.selection
                      , a = n.input("function" == typeof e ? e.apply(this, arguments) : e, r.extent)
                      , u = fo(o, a);
                    function l(n) {
                        r.selection = 1 === n && My(a) ? null : u(n),
                        c.call(t),
                        i.brush()
                    }
                    return o && a ? l : l(1)
                }
                )) : t.each((function() {
                    var t = this
                      , r = arguments
                      , i = t.__brush
                      , o = n.input("function" == typeof e ? e.apply(t, r) : e, i.extent)
                      , a = s(t, r).beforestart();
                    Gh(t),
                    i.selection = null == o || My(o) ? null : o,
                    c.call(t),
                    a.start().brush().end()
                }
                ))
            }
            ,
            l.prototype = {
                beforestart: function() {
                    return 1 == ++this.active && (this.state.emitter = this,
                    this.starting = !0),
                    this
                },
                start: function() {
                    return this.starting && (this.starting = !1,
                    this.emit("start")),
                    this
                },
                brush: function() {
                    return this.emit("brush"),
                    this
                },
                end: function() {
                    return 0 == --this.active && (delete this.state.emitter,
                    this.emit("end")),
                    this
                },
                emit: function(t) {
                    ef(new iy(u,t,n.output(this.state.selection)), o.apply, o, [t, this.that, this.args])
                }
            },
            u.extent = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : ry([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]),
                u) : r
            }
            ,
            u.filter = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : ry(!!t),
                u) : i
            }
            ,
            u.handleSize = function(t) {
                return arguments.length ? (a = +t,
                u) : a
            }
            ,
            u.on = function() {
                var t = o.on.apply(o, arguments);
                return t === o ? u : t
            }
            ,
            u
        }
        var Ty = Math.cos
          , Cy = Math.sin
          , Py = Math.PI
          , zy = Py / 2
          , Ly = 2 * Py
          , Ry = Math.max;
        function qy(t) {
            return function(n, e) {
                return t(n.source.value + n.target.value, e.source.value + e.target.value)
            }
        }
        function Oy() {
            var t = 0
              , n = null
              , e = null
              , r = null;
            function i(i) {
                var o, a, u, c, s, l, f = i.length, h = [], p = _(f), d = [], v = [], g = v.groups = new Array(f), y = new Array(f * f);
                for (o = 0,
                s = -1; ++s < f; ) {
                    for (a = 0,
                    l = -1; ++l < f; )
                        a += i[s][l];
                    h.push(a),
                    d.push(_(f)),
                    o += a
                }
                for (n && p.sort((function(t, e) {
                    return n(h[t], h[e])
                }
                )),
                e && d.forEach((function(t, n) {
                    t.sort((function(t, r) {
                        return e(i[n][t], i[n][r])
                    }
                    ))
                }
                )),
                c = (o = Ry(0, Ly - t * f) / o) ? t : Ly / f,
                a = 0,
                s = -1; ++s < f; ) {
                    for (u = a,
                    l = -1; ++l < f; ) {
                        var m = p[s]
                          , x = d[m][l]
                          , b = i[m][x]
                          , w = a
                          , M = a += b * o;
                        y[x * f + m] = {
                            index: m,
                            subindex: x,
                            startAngle: w,
                            endAngle: M,
                            value: b
                        }
                    }
                    g[m] = {
                        index: m,
                        startAngle: u,
                        endAngle: a,
                        value: h[m]
                    },
                    a += c
                }
                for (s = -1; ++s < f; )
                    for (l = s - 1; ++l < f; ) {
                        var k = y[l * f + s]
                          , E = y[s * f + l];
                        (k.value || E.value) && v.push(k.value < E.value ? {
                            source: E,
                            target: k
                        } : {
                            source: k,
                            target: E
                        })
                    }
                return r ? v.sort(r) : v
            }
            return i.padAngle = function(n) {
                return arguments.length ? (t = Ry(0, n),
                i) : t
            }
            ,
            i.sortGroups = function(t) {
                return arguments.length ? (n = t,
                i) : n
            }
            ,
            i.sortSubgroups = function(t) {
                return arguments.length ? (e = t,
                i) : e
            }
            ,
            i.sortChords = function(t) {
                return arguments.length ? (null == t ? r = null : (r = qy(t))._ = t,
                i) : r && r._
            }
            ,
            i
        }
        var Dy = Array.prototype.slice;
        function Uy(t) {
            return function() {
                return t
            }
        }
        function jy(t) {
            return t.source
        }
        function Iy(t) {
            return t.target
        }
        function Fy(t) {
            return t.radius
        }
        function Yy(t) {
            return t.startAngle
        }
        function By(t) {
            return t.endAngle
        }
        function Hy() {
            var t = jy
              , n = Iy
              , e = Fy
              , r = Yy
              , i = By
              , o = null;
            function a() {
                var a, u = Dy.call(arguments), c = t.apply(this, u), s = n.apply(this, u), l = +e.apply(this, (u[0] = c,
                u)), f = r.apply(this, u) - zy, h = i.apply(this, u) - zy, p = l * Ty(f), d = l * Cy(f), v = +e.apply(this, (u[0] = s,
                u)), g = r.apply(this, u) - zy, y = i.apply(this, u) - zy;
                if (o || (o = a = pn()),
                o.moveTo(p, d),
                o.arc(0, 0, l, f, h),
                f === g && h === y || (o.quadraticCurveTo(0, 0, v * Ty(g), v * Cy(g)),
                o.arc(0, 0, v, g, y)),
                o.quadraticCurveTo(0, 0, p, d),
                o.closePath(),
                a)
                    return o = null,
                    a + "" || null
            }
            return a.radius = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Uy(+t),
                a) : e
            }
            ,
            a.startAngle = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : Uy(+t),
                a) : r
            }
            ,
            a.endAngle = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : Uy(+t),
                a) : i
            }
            ,
            a.source = function(n) {
                return arguments.length ? (t = n,
                a) : t
            }
            ,
            a.target = function(t) {
                return arguments.length ? (n = t,
                a) : n
            }
            ,
            a.context = function(t) {
                return arguments.length ? (o = null == t ? null : t,
                a) : o
            }
            ,
            a
        }
        function Xy() {
            return new Gy
        }
        function Gy() {
            this.reset()
        }
        Gy.prototype = {
            constructor: Gy,
            reset: function() {
                this.s = this.t = 0
            },
            add: function(t) {
                Wy(Vy, t, this.t),
                Wy(this, Vy.s, this.s),
                this.s ? this.t += Vy.t : this.s = Vy.t
            },
            valueOf: function() {
                return this.s
            }
        };
        var Vy = new Gy;
        function Wy(t, n, e) {
            var r = t.s = n + e
              , i = r - n
              , o = r - i;
            t.t = n - o + (e - i)
        }
        var $y = 1e-6
          , Zy = 1e-12
          , Jy = Math.PI
          , Qy = Jy / 2
          , Ky = Jy / 4
          , t_ = 2 * Jy
          , n_ = 180 / Jy
          , e_ = Jy / 180
          , r_ = Math.abs
          , i_ = Math.atan
          , o_ = Math.atan2
          , a_ = Math.cos
          , u_ = Math.ceil
          , c_ = Math.exp
          , s_ = Math.log
          , l_ = Math.pow
          , f_ = Math.sin
          , h_ = Math.sign || function(t) {
            return t > 0 ? 1 : t < 0 ? -1 : 0
        }
          , p_ = Math.sqrt
          , d_ = Math.tan;
        function v_(t) {
            return t > 1 ? 0 : t < -1 ? Jy : Math.acos(t)
        }
        function g_(t) {
            return t > 1 ? Qy : t < -1 ? -Qy : Math.asin(t)
        }
        function y_(t) {
            return (t = f_(t / 2)) * t
        }
        function __() {}
        function m_(t, n) {
            t && N_.hasOwnProperty(t.type) && N_[t.type](t, n)
        }
        var x_, b_, w_, M_, k_, E_, S_, A_ = {
            Feature: function(t, n) {
                m_(t.geometry, n)
            },
            FeatureCollection: function(t, n) {
                for (var e = t.features, r = -1, i = e.length; ++r < i; )
                    m_(e[r].geometry, n)
            }
        }, N_ = {
            Sphere: function(t, n) {
                n.sphere()
            },
            Point: function(t, n) {
                t = t.coordinates,
                n.point(t[0], t[1], t[2])
            },
            MultiPoint: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
                    t = e[r],
                    n.point(t[0], t[1], t[2])
            },
            LineString: function(t, n) {
                T_(t.coordinates, n, 0)
            },
            MultiLineString: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
                    T_(e[r], n, 0)
            },
            Polygon: function(t, n) {
                C_(t.coordinates, n)
            },
            MultiPolygon: function(t, n) {
                for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
                    C_(e[r], n)
            },
            GeometryCollection: function(t, n) {
                for (var e = t.geometries, r = -1, i = e.length; ++r < i; )
                    m_(e[r], n)
            }
        };
        function T_(t, n, e) {
            var r, i = -1, o = t.length - e;
            for (n.lineStart(); ++i < o; )
                r = t[i],
                n.point(r[0], r[1], r[2]);
            n.lineEnd()
        }
        function C_(t, n) {
            var e = -1
              , r = t.length;
            for (n.polygonStart(); ++e < r; )
                T_(t[e], n, 1);
            n.polygonEnd()
        }
        function P_(t, n) {
            t && A_.hasOwnProperty(t.type) ? A_[t.type](t, n) : m_(t, n)
        }
        var z_, L_, R_, q_, O_, D_, U_, j_, I_, F_, Y_, B_ = {
            point: __,
            lineStart: __,
            lineEnd: __,
            polygonStart: function() {
                x_.reset(),
                B_.lineStart = H_,
                B_.lineEnd = X_
            },
            polygonEnd: function() {
                var t = +x_;
                b_.add(t < 0 ? t_ + t : t),
                this.lineStart = this.lineEnd = this.point = __
            },
            sphere: function() {
                b_.add(t_)
            }
        };
        function H_() {
            B_.point = G_
        }
        function X_() {
            V_(w_, M_)
        }
        function G_(t, n) {
            B_.point = V_,
            w_ = t,
            M_ = n,
            k_ = t *= e_,
            E_ = a_(n = (n *= e_) / 2 + Ky),
            S_ = f_(n)
        }
        function V_(t, n) {
            var e = (t *= e_) - k_
              , r = e >= 0 ? 1 : -1
              , i = r * e
              , o = a_(n = (n *= e_) / 2 + Ky)
              , a = f_(n)
              , u = S_ * a
              , c = E_ * o + u * a_(i)
              , s = u * r * f_(i);
            x_.add(o_(s, c)),
            k_ = t,
            E_ = o,
            S_ = a
        }
        function W_(t) {
            return b_ ? b_.reset() : (b_ = Xy(),
            x_ = Xy()),
            P_(t, B_),
            2 * b_
        }
        function $_(t) {
            return [o_(t[1], t[0]), g_(t[2])]
        }
        function Z_(t) {
            var n = t[0]
              , e = t[1]
              , r = a_(e);
            return [r * a_(n), r * f_(n), f_(e)]
        }
        function J_(t, n) {
            return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
        }
        function Q_(t, n) {
            return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
        }
        function K_(t, n) {
            t[0] += n[0],
            t[1] += n[1],
            t[2] += n[2]
        }
        function tm(t, n) {
            return [t[0] * n, t[1] * n, t[2] * n]
        }
        function nm(t) {
            var n = p_(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
            t[0] /= n,
            t[1] /= n,
            t[2] /= n
        }
        var em, rm, im, om, am, um, cm, sm, lm, fm, hm, pm, dm, vm, gm, ym, _m = {
            point: mm,
            lineStart: bm,
            lineEnd: wm,
            polygonStart: function() {
                _m.point = Mm,
                _m.lineStart = km,
                _m.lineEnd = Em,
                I_.reset(),
                B_.polygonStart()
            },
            polygonEnd: function() {
                B_.polygonEnd(),
                _m.point = mm,
                _m.lineStart = bm,
                _m.lineEnd = wm,
                x_ < 0 ? (z_ = -(R_ = 180),
                L_ = -(q_ = 90)) : I_ > $y ? q_ = 90 : I_ < -$y && (L_ = -90),
                Y_[0] = z_,
                Y_[1] = R_
            }
        };
        function mm(t, n) {
            F_.push(Y_ = [z_ = t, R_ = t]),
            n < L_ && (L_ = n),
            n > q_ && (q_ = n)
        }
        function xm(t, n) {
            var e = Z_([t * e_, n * e_]);
            if (j_) {
                var r = Q_(j_, e)
                  , i = Q_([r[1], -r[0], 0], r);
                nm(i),
                i = $_(i);
                var o, a = t - O_, u = a > 0 ? 1 : -1, c = i[0] * n_ * u, s = r_(a) > 180;
                s ^ (u * O_ < c && c < u * t) ? (o = i[1] * n_) > q_ && (q_ = o) : s ^ (u * O_ < (c = (c + 360) % 360 - 180) && c < u * t) ? (o = -i[1] * n_) < L_ && (L_ = o) : (n < L_ && (L_ = n),
                n > q_ && (q_ = n)),
                s ? t < O_ ? Sm(z_, t) > Sm(z_, R_) && (R_ = t) : Sm(t, R_) > Sm(z_, R_) && (z_ = t) : R_ >= z_ ? (t < z_ && (z_ = t),
                t > R_ && (R_ = t)) : t > O_ ? Sm(z_, t) > Sm(z_, R_) && (R_ = t) : Sm(t, R_) > Sm(z_, R_) && (z_ = t)
            } else
                mm(t, n);
            j_ = e,
            O_ = t
        }
        function bm() {
            _m.point = xm
        }
        function wm() {
            Y_[0] = z_,
            Y_[1] = R_,
            _m.point = mm,
            j_ = null
        }
        function Mm(t, n) {
            if (j_) {
                var e = t - O_;
                I_.add(r_(e) > 180 ? e + (e > 0 ? 360 : -360) : e)
            } else
                D_ = t,
                U_ = n;
            B_.point(t, n),
            xm(t, n)
        }
        function km() {
            B_.lineStart()
        }
        function Em() {
            Mm(D_, U_),
            B_.lineEnd(),
            r_(I_) > $y && (z_ = -(R_ = 180)),
            Y_[0] = z_,
            Y_[1] = R_,
            j_ = null
        }
        function Sm(t, n) {
            return (n -= t) < 0 ? n + 360 : n
        }
        function Am(t, n) {
            return t[0] - n[0]
        }
        function Nm(t, n) {
            return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
        }
        function Tm(t) {
            var n, e, r, i, o, a, u;
            if (I_ ? I_.reset() : I_ = Xy(),
            q_ = R_ = -(z_ = L_ = 1 / 0),
            F_ = [],
            P_(t, _m),
            e = F_.length) {
                for (F_.sort(Am),
                n = 1,
                o = [r = F_[0]]; n < e; ++n)
                    Nm(r, (i = F_[n])[0]) || Nm(r, i[1]) ? (Sm(r[0], i[1]) > Sm(r[0], r[1]) && (r[1] = i[1]),
                    Sm(i[0], r[1]) > Sm(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
                for (a = -1 / 0,
                n = 0,
                r = o[e = o.length - 1]; n <= e; r = i,
                ++n)
                    i = o[n],
                    (u = Sm(r[1], i[0])) > a && (a = u,
                    z_ = i[0],
                    R_ = r[1])
            }
            return F_ = Y_ = null,
            z_ === 1 / 0 || L_ === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[z_, L_], [R_, q_]]
        }
        var Cm = {
            sphere: __,
            point: Pm,
            lineStart: Lm,
            lineEnd: Om,
            polygonStart: function() {
                Cm.lineStart = Dm,
                Cm.lineEnd = Um
            },
            polygonEnd: function() {
                Cm.lineStart = Lm,
                Cm.lineEnd = Om
            }
        };
        function Pm(t, n) {
            t *= e_;
            var e = a_(n *= e_);
            zm(e * a_(t), e * f_(t), f_(n))
        }
        function zm(t, n, e) {
            ++em,
            im += (t - im) / em,
            om += (n - om) / em,
            am += (e - am) / em
        }
        function Lm() {
            Cm.point = Rm
        }
        function Rm(t, n) {
            t *= e_;
            var e = a_(n *= e_);
            vm = e * a_(t),
            gm = e * f_(t),
            ym = f_(n),
            Cm.point = qm,
            zm(vm, gm, ym)
        }
        function qm(t, n) {
            t *= e_;
            var e = a_(n *= e_)
              , r = e * a_(t)
              , i = e * f_(t)
              , o = f_(n)
              , a = o_(p_((a = gm * o - ym * i) * a + (a = ym * r - vm * o) * a + (a = vm * i - gm * r) * a), vm * r + gm * i + ym * o);
            rm += a,
            um += a * (vm + (vm = r)),
            cm += a * (gm + (gm = i)),
            sm += a * (ym + (ym = o)),
            zm(vm, gm, ym)
        }
        function Om() {
            Cm.point = Pm
        }
        function Dm() {
            Cm.point = jm
        }
        function Um() {
            Im(pm, dm),
            Cm.point = Pm
        }
        function jm(t, n) {
            pm = t,
            dm = n,
            t *= e_,
            n *= e_,
            Cm.point = Im;
            var e = a_(n);
            vm = e * a_(t),
            gm = e * f_(t),
            ym = f_(n),
            zm(vm, gm, ym)
        }
        function Im(t, n) {
            t *= e_;
            var e = a_(n *= e_)
              , r = e * a_(t)
              , i = e * f_(t)
              , o = f_(n)
              , a = gm * o - ym * i
              , u = ym * r - vm * o
              , c = vm * i - gm * r
              , s = p_(a * a + u * u + c * c)
              , l = vm * r + gm * i + ym * o
              , f = s && -v_(l) / s
              , h = o_(s, l);
            lm += f * a,
            fm += f * u,
            hm += f * c,
            rm += h,
            um += h * (vm + (vm = r)),
            cm += h * (gm + (gm = i)),
            sm += h * (ym + (ym = o)),
            zm(vm, gm, ym)
        }
        function Fm(t) {
            em = rm = im = om = am = um = cm = sm = lm = fm = hm = 0,
            P_(t, Cm);
            var n = lm
              , e = fm
              , r = hm
              , i = n * n + e * e + r * r;
            return i < Zy && (n = um,
            e = cm,
            r = sm,
            rm < $y && (n = im,
            e = om,
            r = am),
            (i = n * n + e * e + r * r) < Zy) ? [NaN, NaN] : [o_(e, n) * n_, g_(r / p_(i)) * n_]
        }
        function Ym(t) {
            return function() {
                return t
            }
        }
        function Bm(t, n) {
            function e(e, r) {
                return e = t(e, r),
                n(e[0], e[1])
            }
            return t.invert && n.invert && (e.invert = function(e, r) {
                return (e = n.invert(e, r)) && t.invert(e[0], e[1])
            }
            ),
            e
        }
        function Hm(t, n) {
            return [t > Jy ? t - t_ : t < -Jy ? t + t_ : t, n]
        }
        function Xm(t, n, e) {
            return (t %= t_) ? n || e ? Bm(Vm(t), Wm(n, e)) : Vm(t) : n || e ? Wm(n, e) : Hm
        }
        function Gm(t) {
            return function(n, e) {
                return [(n += t) > Jy ? n - t_ : n < -Jy ? n + t_ : n, e]
            }
        }
        function Vm(t) {
            var n = Gm(t);
            return n.invert = Gm(-t),
            n
        }
        function Wm(t, n) {
            var e = a_(t)
              , r = f_(t)
              , i = a_(n)
              , o = f_(n);
            function a(t, n) {
                var a = a_(n)
                  , u = a_(t) * a
                  , c = f_(t) * a
                  , s = f_(n)
                  , l = s * e + u * r;
                return [o_(c * i - l * o, u * e - s * r), g_(l * i + c * o)]
            }
            return a.invert = function(t, n) {
                var a = a_(n)
                  , u = a_(t) * a
                  , c = f_(t) * a
                  , s = f_(n)
                  , l = s * i - c * o;
                return [o_(c * i + s * o, u * e + l * r), g_(l * e - u * r)]
            }
            ,
            a
        }
        function $m(t) {
            function n(n) {
                return (n = t(n[0] * e_, n[1] * e_))[0] *= n_,
                n[1] *= n_,
                n
            }
            return t = Xm(t[0] * e_, t[1] * e_, t.length > 2 ? t[2] * e_ : 0),
            n.invert = function(n) {
                return (n = t.invert(n[0] * e_, n[1] * e_))[0] *= n_,
                n[1] *= n_,
                n
            }
            ,
            n
        }
        function Zm(t, n, e, r, i, o) {
            if (e) {
                var a = a_(n)
                  , u = f_(n)
                  , c = r * e;
                null == i ? (i = n + r * t_,
                o = n - c / 2) : (i = Jm(a, i),
                o = Jm(a, o),
                (r > 0 ? i < o : i > o) && (i += r * t_));
                for (var s, l = i; r > 0 ? l > o : l < o; l -= c)
                    s = $_([a, -u * a_(l), -u * f_(l)]),
                    t.point(s[0], s[1])
            }
        }
        function Jm(t, n) {
            (n = Z_(n))[0] -= t,
            nm(n);
            var e = v_(-n[1]);
            return ((-n[2] < 0 ? -e : e) + t_ - $y) % t_
        }
        function Qm() {
            var t, n, e = Ym([0, 0]), r = Ym(90), i = Ym(6), o = {
                point: a
            };
            function a(e, r) {
                t.push(e = n(e, r)),
                e[0] *= n_,
                e[1] *= n_
            }
            function u() {
                var a = e.apply(this, arguments)
                  , u = r.apply(this, arguments) * e_
                  , c = i.apply(this, arguments) * e_;
                return t = [],
                n = Xm(-a[0] * e_, -a[1] * e_, 0).invert,
                Zm(o, u, c, 1),
                a = {
                    type: "Polygon",
                    coordinates: [t]
                },
                t = n = null,
                a
            }
            return u.center = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Ym([+t[0], +t[1]]),
                u) : e
            }
            ,
            u.radius = function(t) {
                return arguments.length ? (r = "function" == typeof t ? t : Ym(+t),
                u) : r
            }
            ,
            u.precision = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : Ym(+t),
                u) : i
            }
            ,
            u
        }
        function Km() {
            var t, n = [];
            return {
                point: function(n, e) {
                    t.push([n, e])
                },
                lineStart: function() {
                    n.push(t = [])
                },
                lineEnd: __,
                rejoin: function() {
                    n.length > 1 && n.push(n.pop().concat(n.shift()))
                },
                result: function() {
                    var e = n;
                    return n = [],
                    t = null,
                    e
                }
            }
        }
        function tx(t, n, e, r, i, o) {
            var a, u = t[0], c = t[1], s = 0, l = 1, f = n[0] - u, h = n[1] - c;
            if (a = e - u,
            f || !(a > 0)) {
                if (a /= f,
                f < 0) {
                    if (a < s)
                        return;
                    a < l && (l = a)
                } else if (f > 0) {
                    if (a > l)
                        return;
                    a > s && (s = a)
                }
                if (a = i - u,
                f || !(a < 0)) {
                    if (a /= f,
                    f < 0) {
                        if (a > l)
                            return;
                        a > s && (s = a)
                    } else if (f > 0) {
                        if (a < s)
                            return;
                        a < l && (l = a)
                    }
                    if (a = r - c,
                    h || !(a > 0)) {
                        if (a /= h,
                        h < 0) {
                            if (a < s)
                                return;
                            a < l && (l = a)
                        } else if (h > 0) {
                            if (a > l)
                                return;
                            a > s && (s = a)
                        }
                        if (a = o - c,
                        h || !(a < 0)) {
                            if (a /= h,
                            h < 0) {
                                if (a > l)
                                    return;
                                a > s && (s = a)
                            } else if (h > 0) {
                                if (a < s)
                                    return;
                                a < l && (l = a)
                            }
                            return s > 0 && (t[0] = u + s * f,
                            t[1] = c + s * h),
                            l < 1 && (n[0] = u + l * f,
                            n[1] = c + l * h),
                            !0
                        }
                    }
                }
            }
        }
        function nx(t, n) {
            return r_(t[0] - n[0]) < $y && r_(t[1] - n[1]) < $y
        }
        function ex(t, n, e, r) {
            this.x = t,
            this.z = n,
            this.o = e,
            this.e = r,
            this.v = !1,
            this.n = this.p = null
        }
        function rx(t, n, e, r, i) {
            var o, a, u = [], c = [];
            if (t.forEach((function(t) {
                if (!((n = t.length - 1) <= 0)) {
                    var n, e, r = t[0], a = t[n];
                    if (nx(r, a)) {
                        for (i.lineStart(),
                        o = 0; o < n; ++o)
                            i.point((r = t[o])[0], r[1]);
                        i.lineEnd()
                    } else
                        u.push(e = new ex(r,t,null,!0)),
                        c.push(e.o = new ex(r,null,e,!1)),
                        u.push(e = new ex(a,t,null,!1)),
                        c.push(e.o = new ex(a,null,e,!0))
                }
            }
            )),
            u.length) {
                for (c.sort(n),
                ix(u),
                ix(c),
                o = 0,
                a = c.length; o < a; ++o)
                    c[o].e = e = !e;
                for (var s, l, f = u[0]; ; ) {
                    for (var h = f, p = !0; h.v; )
                        if ((h = h.n) === f)
                            return;
                    s = h.z,
                    i.lineStart();
                    do {
                        if (h.v = h.o.v = !0,
                        h.e) {
                            if (p)
                                for (o = 0,
                                a = s.length; o < a; ++o)
                                    i.point((l = s[o])[0], l[1]);
                            else
                                r(h.x, h.n.x, 1, i);
                            h = h.n
                        } else {
                            if (p)
                                for (s = h.p.z,
                                o = s.length - 1; o >= 0; --o)
                                    i.point((l = s[o])[0], l[1]);
                            else
                                r(h.x, h.p.x, -1, i);
                            h = h.p
                        }
                        s = (h = h.o).z,
                        p = !p
                    } while (!h.v);
                    i.lineEnd()
                }
            }
        }
        function ix(t) {
            if (n = t.length) {
                for (var n, e, r = 0, i = t[0]; ++r < n; )
                    i.n = e = t[r],
                    e.p = i,
                    i = e;
                i.n = e = t[0],
                e.p = i
            }
        }
        Hm.invert = Hm;
        var ox, ax, ux, cx, sx = 1e9, lx = -sx;
        function fx(t, n, e, r) {
            function i(i, o) {
                return t <= i && i <= e && n <= o && o <= r
            }
            function o(i, o, u, s) {
                var l = 0
                  , f = 0;
                if (null == i || (l = a(i, u)) !== (f = a(o, u)) || c(i, o) < 0 ^ u > 0)
                    do {
                        s.point(0 === l || 3 === l ? t : e, l > 1 ? r : n)
                    } while ((l = (l + u + 4) % 4) !== f);
                else
                    s.point(o[0], o[1])
            }
            function a(r, i) {
                return r_(r[0] - t) < $y ? i > 0 ? 0 : 3 : r_(r[0] - e) < $y ? i > 0 ? 2 : 1 : r_(r[1] - n) < $y ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
            }
            function u(t, n) {
                return c(t.x, n.x)
            }
            function c(t, n) {
                var e = a(t, 1)
                  , r = a(n, 1);
                return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
            }
            return function(a) {
                var c, s, l, f, h, p, d, v, g, y, _, m = a, x = Km(), b = {
                    point: w,
                    lineStart: S,
                    lineEnd: A,
                    polygonStart: k,
                    polygonEnd: E
                };
                function w(t, n) {
                    i(t, n) && m.point(t, n)
                }
                function M() {
                    for (var n = 0, e = 0, i = s.length; e < i; ++e)
                        for (var o, a, u = s[e], c = 1, l = u.length, f = u[0], h = f[0], p = f[1]; c < l; ++c)
                            o = h,
                            a = p,
                            h = (f = u[c])[0],
                            p = f[1],
                            a <= r ? p > r && (h - o) * (r - a) > (p - a) * (t - o) && ++n : p <= r && (h - o) * (r - a) < (p - a) * (t - o) && --n;
                    return n
                }
                function k() {
                    m = x,
                    c = [],
                    s = [],
                    _ = !0
                }
                function E() {
                    var t = M()
                      , n = _ && t
                      , e = (c = z(c)).length;
                    (n || e) && (a.polygonStart(),
                    n && (a.lineStart(),
                    o(null, null, 1, a),
                    a.lineEnd()),
                    e && rx(c, u, t, o, a),
                    a.polygonEnd()),
                    m = a,
                    c = s = l = null
                }
                function S() {
                    b.point = N,
                    s && s.push(l = []),
                    y = !0,
                    g = !1,
                    d = v = NaN
                }
                function A() {
                    c && (N(f, h),
                    p && g && x.rejoin(),
                    c.push(x.result())),
                    b.point = w,
                    g && m.lineEnd()
                }
                function N(o, a) {
                    var u = i(o, a);
                    if (s && l.push([o, a]),
                    y)
                        f = o,
                        h = a,
                        p = u,
                        y = !1,
                        u && (m.lineStart(),
                        m.point(o, a));
                    else if (u && g)
                        m.point(o, a);
                    else {
                        var c = [d = Math.max(lx, Math.min(sx, d)), v = Math.max(lx, Math.min(sx, v))]
                          , x = [o = Math.max(lx, Math.min(sx, o)), a = Math.max(lx, Math.min(sx, a))];
                        tx(c, x, t, n, e, r) ? (g || (m.lineStart(),
                        m.point(c[0], c[1])),
                        m.point(x[0], x[1]),
                        u || m.lineEnd(),
                        _ = !1) : u && (m.lineStart(),
                        m.point(o, a),
                        _ = !1)
                    }
                    d = o,
                    v = a,
                    g = u
                }
                return b
            }
        }
        function hx() {
            var t, n, e, r = 0, i = 0, o = 960, a = 500;
            return e = {
                stream: function(e) {
                    return t && n === e ? t : t = fx(r, i, o, a)(n = e)
                },
                extent: function(u) {
                    return arguments.length ? (r = +u[0][0],
                    i = +u[0][1],
                    o = +u[1][0],
                    a = +u[1][1],
                    t = n = null,
                    e) : [[r, i], [o, a]]
                }
            }
        }
        var px = {
            sphere: __,
            point: __,
            lineStart: dx,
            lineEnd: __,
            polygonStart: __,
            polygonEnd: __
        };
        function dx() {
            px.point = gx,
            px.lineEnd = vx
        }
        function vx() {
            px.point = px.lineEnd = __
        }
        function gx(t, n) {
            ax = t *= e_,
            ux = f_(n *= e_),
            cx = a_(n),
            px.point = yx
        }
        function yx(t, n) {
            t *= e_;
            var e = f_(n *= e_)
              , r = a_(n)
              , i = r_(t - ax)
              , o = a_(i)
              , a = r * f_(i)
              , u = cx * e - ux * r * o
              , c = ux * e + cx * r * o;
            ox.add(o_(p_(a * a + u * u), c)),
            ax = t,
            ux = e,
            cx = r
        }
        function _x(t) {
            return ox ? ox.reset() : ox = Xy(),
            P_(t, px),
            +ox
        }
        var mx = [null, null]
          , xx = {
            type: "LineString",
            coordinates: mx
        };
        function bx(t, n) {
            return mx[0] = t,
            mx[1] = n,
            _x(xx)
        }
        function wx(t, n, e) {
            var r = _(t, n - $y, e).concat(n);
            return function(t) {
                return r.map((function(n) {
                    return [t, n]
                }
                ))
            }
        }
        function Mx(t, n, e) {
            var r = _(t, n - $y, e).concat(n);
            return function(t) {
                return r.map((function(n) {
                    return [n, t]
                }
                ))
            }
        }
        function kx() {
            var t, n, e, r, i, o, a, u, c, s, l, f, h = 10, p = h, d = 90, v = 360, g = 2.5;
            function y() {
                return {
                    type: "MultiLineString",
                    coordinates: m()
                }
            }
            function m() {
                return _(u_(r / d) * d, e, d).map(l).concat(_(u_(u / v) * v, a, v).map(f)).concat(_(u_(n / h) * h, t, h).filter((function(t) {
                    return r_(t % d) > $y
                }
                )).map(c)).concat(_(u_(o / p) * p, i, p).filter((function(t) {
                    return r_(t % v) > $y
                }
                )).map(s))
            }
            return y.lines = function() {
                return m().map((function(t) {
                    return {
                        type: "LineString",
                        coordinates: t
                    }
                }
                ))
            }
            ,
            y.outline = function() {
                return {
                    type: "Polygon",
                    coordinates: [l(r).concat(f(a).slice(1), l(e).reverse().slice(1), f(u).reverse().slice(1))]
                }
            }
            ,
            y.extent = function(t) {
                return arguments.length ? y.extentMajor(t).extentMinor(t) : y.extentMinor()
            }
            ,
            y.extentMajor = function(t) {
                return arguments.length ? (r = +t[0][0],
                e = +t[1][0],
                u = +t[0][1],
                a = +t[1][1],
                r > e && (t = r,
                r = e,
                e = t),
                u > a && (t = u,
                u = a,
                a = t),
                y.precision(g)) : [[r, u], [e, a]]
            }
            ,
            y.extentMinor = function(e) {
                return arguments.length ? (n = +e[0][0],
                t = +e[1][0],
                o = +e[0][1],
                i = +e[1][1],
                n > t && (e = n,
                n = t,
                t = e),
                o > i && (e = o,
                o = i,
                i = e),
                y.precision(g)) : [[n, o], [t, i]]
            }
            ,
            y.step = function(t) {
                return arguments.length ? y.stepMajor(t).stepMinor(t) : y.stepMinor()
            }
            ,
            y.stepMajor = function(t) {
                return arguments.length ? (d = +t[0],
                v = +t[1],
                y) : [d, v]
            }
            ,
            y.stepMinor = function(t) {
                return arguments.length ? (h = +t[0],
                p = +t[1],
                y) : [h, p]
            }
            ,
            y.precision = function(h) {
                return arguments.length ? (g = +h,
                c = wx(o, i, 90),
                s = Mx(n, t, g),
                l = wx(u, a, 90),
                f = Mx(r, e, g),
                y) : g
            }
            ,
            y.extentMajor([[-180, -90 + $y], [180, 90 - $y]]).extentMinor([[-180, -80 - $y], [180, 80 + $y]])
        }
        function Ex(t, n) {
            var e = t[0] * e_
              , r = t[1] * e_
              , i = n[0] * e_
              , o = n[1] * e_
              , a = a_(r)
              , u = f_(r)
              , c = a_(o)
              , s = f_(o)
              , l = a * a_(e)
              , f = a * f_(e)
              , h = c * a_(i)
              , p = c * f_(i)
              , d = 2 * g_(p_(y_(o - r) + a * c * y_(i - e)))
              , v = f_(d)
              , g = d ? function(t) {
                var n = f_(t *= d) / v
                  , e = f_(d - t) / v
                  , r = e * l + n * h
                  , i = e * f + n * p
                  , o = e * u + n * s;
                return [o_(i, r) * n_, o_(o, p_(r * r + i * i)) * n_]
            }
            : function() {
                return [e * n_, r * n_]
            }
            ;
            return g.distance = d,
            g
        }
        function Sx(t) {
            return t
        }
        var Ax, Nx, Tx, Cx, Px = Xy(), zx = Xy(), Lx = {
            point: __,
            lineStart: __,
            lineEnd: __,
            polygonStart: function() {
                Lx.lineStart = Rx,
                Lx.lineEnd = Dx
            },
            polygonEnd: function() {
                Lx.lineStart = Lx.lineEnd = Lx.point = __,
                Px.add(r_(zx)),
                zx.reset()
            },
            result: function() {
                var t = Px / 2;
                return Px.reset(),
                t
            }
        };
        function Rx() {
            Lx.point = qx
        }
        function qx(t, n) {
            Lx.point = Ox,
            Ax = Tx = t,
            Nx = Cx = n
        }
        function Ox(t, n) {
            zx.add(Cx * t - Tx * n),
            Tx = t,
            Cx = n
        }
        function Dx() {
            Ox(Ax, Nx)
        }
        var Ux = 1 / 0
          , jx = Ux
          , Ix = -Ux
          , Fx = Ix
          , Yx = {
            point: Bx,
            lineStart: __,
            lineEnd: __,
            polygonStart: __,
            polygonEnd: __,
            result: function() {
                var t = [[Ux, jx], [Ix, Fx]];
                return Ix = Fx = -(jx = Ux = 1 / 0),
                t
            }
        };
        function Bx(t, n) {
            t < Ux && (Ux = t),
            t > Ix && (Ix = t),
            n < jx && (jx = n),
            n > Fx && (Fx = n)
        }
        var Hx, Xx, Gx, Vx, Wx = 0, $x = 0, Zx = 0, Jx = 0, Qx = 0, Kx = 0, tb = 0, nb = 0, eb = 0, rb = {
            point: ib,
            lineStart: ob,
            lineEnd: cb,
            polygonStart: function() {
                rb.lineStart = sb,
                rb.lineEnd = lb
            },
            polygonEnd: function() {
                rb.point = ib,
                rb.lineStart = ob,
                rb.lineEnd = cb
            },
            result: function() {
                var t = eb ? [tb / eb, nb / eb] : Kx ? [Jx / Kx, Qx / Kx] : Zx ? [Wx / Zx, $x / Zx] : [NaN, NaN];
                return Wx = $x = Zx = Jx = Qx = Kx = tb = nb = eb = 0,
                t
            }
        };
        function ib(t, n) {
            Wx += t,
            $x += n,
            ++Zx
        }
        function ob() {
            rb.point = ab
        }
        function ab(t, n) {
            rb.point = ub,
            ib(Gx = t, Vx = n)
        }
        function ub(t, n) {
            var e = t - Gx
              , r = n - Vx
              , i = p_(e * e + r * r);
            Jx += i * (Gx + t) / 2,
            Qx += i * (Vx + n) / 2,
            Kx += i,
            ib(Gx = t, Vx = n)
        }
        function cb() {
            rb.point = ib
        }
        function sb() {
            rb.point = fb
        }
        function lb() {
            hb(Hx, Xx)
        }
        function fb(t, n) {
            rb.point = hb,
            ib(Hx = Gx = t, Xx = Vx = n)
        }
        function hb(t, n) {
            var e = t - Gx
              , r = n - Vx
              , i = p_(e * e + r * r);
            Jx += i * (Gx + t) / 2,
            Qx += i * (Vx + n) / 2,
            Kx += i,
            tb += (i = Vx * t - Gx * n) * (Gx + t),
            nb += i * (Vx + n),
            eb += 3 * i,
            ib(Gx = t, Vx = n)
        }
        function pb(t) {
            var n = 4.5
              , e = {
                point: r,
                lineStart: function() {
                    e.point = i
                },
                lineEnd: a,
                polygonStart: function() {
                    e.lineEnd = u
                },
                polygonEnd: function() {
                    e.lineEnd = a,
                    e.point = r
                },
                pointRadius: function(t) {
                    return n = t,
                    e
                },
                result: __
            };
            function r(e, r) {
                t.moveTo(e + n, r),
                t.arc(e, r, n, 0, t_)
            }
            function i(n, r) {
                t.moveTo(n, r),
                e.point = o
            }
            function o(n, e) {
                t.lineTo(n, e)
            }
            function a() {
                e.point = r
            }
            function u() {
                t.closePath()
            }
            return e
        }
        function db() {
            var t = vb(4.5)
              , n = []
              , e = {
                point: r,
                lineStart: a,
                lineEnd: u,
                polygonStart: function() {
                    e.lineEnd = c
                },
                polygonEnd: function() {
                    e.lineEnd = u,
                    e.point = r
                },
                pointRadius: function(n) {
                    return t = vb(n),
                    e
                },
                result: function() {
                    if (n.length) {
                        var t = n.join("");
                        return n = [],
                        t
                    }
                }
            };
            function r(e, r) {
                n.push("M", e, ",", r, t)
            }
            function i(t, r) {
                n.push("M", t, ",", r),
                e.point = o
            }
            function o(t, e) {
                n.push("L", t, ",", e)
            }
            function a() {
                e.point = i
            }
            function u() {
                e.point = r
            }
            function c() {
                n.push("Z")
            }
            return e
        }
        function vb(t) {
            return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
        }
        function gb() {
            var t, n, e, r, i = 4.5;
            function o(t) {
                return t && ("function" == typeof i && r.pointRadius(+i.apply(this, arguments)),
                P_(t, n(r))),
                r.result()
            }
            return o.area = function(t) {
                return P_(t, n(Lx)),
                Lx.result()
            }
            ,
            o.bounds = function(t) {
                return P_(t, n(Yx)),
                Yx.result()
            }
            ,
            o.centroid = function(t) {
                return P_(t, n(rb)),
                rb.result()
            }
            ,
            o.projection = function(e) {
                return arguments.length ? (n = null == (t = e) ? Sx : e.stream,
                o) : t
            }
            ,
            o.context = function(t) {
                return arguments.length ? (r = null == (e = t) ? new db : new pb(t),
                "function" != typeof i && r.pointRadius(i),
                o) : e
            }
            ,
            o.pointRadius = function(t) {
                return arguments.length ? (i = "function" == typeof t ? t : (r.pointRadius(+t),
                +t),
                o) : i
            }
            ,
            o.projection(null).context(null)
        }
        var yb = Xy();
        function _b(t, n) {
            for (var e = n[0], r = n[1], i = [f_(e), -a_(e), 0], o = 0, a = 0, u = 0, c = t.length; u < c; ++u)
                if (l = (s = t[u]).length)
                    for (var s, l, f = s[l - 1], h = f[0], p = f[1] / 2 + Ky, d = f_(p), v = a_(p), g = 0; g < l; ++g,
                    h = _,
                    d = x,
                    v = b,
                    f = y) {
                        var y = s[g]
                          , _ = y[0]
                          , m = y[1] / 2 + Ky
                          , x = f_(m)
                          , b = a_(m)
                          , w = _ - h
                          , M = w >= 0 ? 1 : -1
                          , k = M * w
                          , E = k > Jy
                          , S = d * x;
                        if (yb.add(o_(S * M * f_(k), v * b + S * a_(k))),
                        o += E ? w + M * t_ : w,
                        E ^ h >= e ^ _ >= e) {
                            var A = Q_(Z_(f), Z_(y));
                            nm(A);
                            var N = Q_(i, A);
                            nm(N);
                            var T = (E ^ w >= 0 ? -1 : 1) * g_(N[2]);
                            (r > T || r === T && (A[0] || A[1])) && (a += E ^ w >= 0 ? 1 : -1)
                        }
                    }
            var C = (o < -$y || o < $y && yb < -$y) ^ 1 & a;
            return yb.reset(),
            C
        }
        function mb(t, n, e, r) {
            return function(i, o) {
                var a, u, c, s = n(o), l = i.invert(r[0], r[1]), f = Km(), h = n(f), p = !1, d = {
                    point: v,
                    lineStart: y,
                    lineEnd: _,
                    polygonStart: function() {
                        d.point = m,
                        d.lineStart = x,
                        d.lineEnd = b,
                        u = [],
                        a = []
                    },
                    polygonEnd: function() {
                        d.point = v,
                        d.lineStart = y,
                        d.lineEnd = _,
                        u = z(u);
                        var t = _b(a, l);
                        u.length ? (p || (o.polygonStart(),
                        p = !0),
                        rx(u, bb, t, e, o)) : t && (p || (o.polygonStart(),
                        p = !0),
                        o.lineStart(),
                        e(null, null, 1, o),
                        o.lineEnd()),
                        p && (o.polygonEnd(),
                        p = !1),
                        u = a = null
                    },
                    sphere: function() {
                        o.polygonStart(),
                        o.lineStart(),
                        e(null, null, 1, o),
                        o.lineEnd(),
                        o.polygonEnd()
                    }
                };
                function v(n, e) {
                    var r = i(n, e);
                    t(n = r[0], e = r[1]) && o.point(n, e)
                }
                function g(t, n) {
                    var e = i(t, n);
                    s.point(e[0], e[1])
                }
                function y() {
                    d.point = g,
                    s.lineStart()
                }
                function _() {
                    d.point = v,
                    s.lineEnd()
                }
                function m(t, n) {
                    c.push([t, n]);
                    var e = i(t, n);
                    h.point(e[0], e[1])
                }
                function x() {
                    h.lineStart(),
                    c = []
                }
                function b() {
                    m(c[0][0], c[0][1]),
                    h.lineEnd();
                    var t, n, e, r, i = h.clean(), s = f.result(), l = s.length;
                    if (c.pop(),
                    a.push(c),
                    c = null,
                    l)
                        if (1 & i) {
                            if ((n = (e = s[0]).length - 1) > 0) {
                                for (p || (o.polygonStart(),
                                p = !0),
                                o.lineStart(),
                                t = 0; t < n; ++t)
                                    o.point((r = e[t])[0], r[1]);
                                o.lineEnd()
                            }
                        } else
                            l > 1 && 2 & i && s.push(s.pop().concat(s.shift())),
                            u.push(s.filter(xb))
                }
                return d
            }
        }
        function xb(t) {
            return t.length > 1
        }
        function bb(t, n) {
            return ((t = t.x)[0] < 0 ? t[1] - Qy - $y : Qy - t[1]) - ((n = n.x)[0] < 0 ? n[1] - Qy - $y : Qy - n[1])
        }
        var wb = mb((function() {
            return !0
        }
        ), Mb, Eb, [-Jy, -Qy]);
        function Mb(t) {
            var n, e = NaN, r = NaN, i = NaN;
            return {
                lineStart: function() {
                    t.lineStart(),
                    n = 1
                },
                point: function(o, a) {
                    var u = o > 0 ? Jy : -Jy
                      , c = r_(o - e);
                    r_(c - Jy) < $y ? (t.point(e, r = (r + a) / 2 > 0 ? Qy : -Qy),
                    t.point(i, r),
                    t.lineEnd(),
                    t.lineStart(),
                    t.point(u, r),
                    t.point(o, r),
                    n = 0) : i !== u && c >= Jy && (r_(e - i) < $y && (e -= i * $y),
                    r_(o - u) < $y && (o -= u * $y),
                    r = kb(e, r, o, a),
                    t.point(i, r),
                    t.lineEnd(),
                    t.lineStart(),
                    t.point(u, r),
                    n = 0),
                    t.point(e = o, r = a),
                    i = u
                },
                lineEnd: function() {
                    t.lineEnd(),
                    e = r = NaN
                },
                clean: function() {
                    return 2 - n
                }
            }
        }
        function kb(t, n, e, r) {
            var i, o, a = f_(t - e);
            return r_(a) > $y ? i_((f_(n) * (o = a_(r)) * f_(e) - f_(r) * (i = a_(n)) * f_(t)) / (i * o * a)) : (n + r) / 2
        }
        function Eb(t, n, e, r) {
            var i;
            if (null == t)
                i = e * Qy,
                r.point(-Jy, i),
                r.point(0, i),
                r.point(Jy, i),
                r.point(Jy, 0),
                r.point(Jy, -i),
                r.point(0, -i),
                r.point(-Jy, -i),
                r.point(-Jy, 0),
                r.point(-Jy, i);
            else if (r_(t[0] - n[0]) > $y) {
                var o = t[0] < n[0] ? Jy : -Jy;
                i = e * o / 2,
                r.point(-o, i),
                r.point(0, i),
                r.point(o, i)
            } else
                r.point(n[0], n[1])
        }
        function Sb(t, n) {
            var e = a_(t)
              , r = e > 0
              , i = r_(e) > $y;
            function o(e, r, i, o) {
                Zm(o, t, n, i, e, r)
            }
            function a(t, n) {
                return a_(t) * a_(n) > e
            }
            function u(t) {
                var n, e, o, u, l;
                return {
                    lineStart: function() {
                        u = o = !1,
                        l = 1
                    },
                    point: function(f, h) {
                        var p, d = [f, h], v = a(f, h), g = r ? v ? 0 : s(f, h) : v ? s(f + (f < 0 ? Jy : -Jy), h) : 0;
                        if (!n && (u = o = v) && t.lineStart(),
                        v !== o && (p = c(n, d),
                        (nx(n, p) || nx(d, p)) && (d[0] += $y,
                        d[1] += $y,
                        v = a(d[0], d[1]))),
                        v !== o)
                            l = 0,
                            v ? (t.lineStart(),
                            p = c(d, n),
                            t.point(p[0], p[1])) : (p = c(n, d),
                            t.point(p[0], p[1]),
                            t.lineEnd()),
                            n = p;
                        else if (i && n && r ^ v) {
                            var y;
                            g & e || !(y = c(d, n, !0)) || (l = 0,
                            r ? (t.lineStart(),
                            t.point(y[0][0], y[0][1]),
                            t.point(y[1][0], y[1][1]),
                            t.lineEnd()) : (t.point(y[1][0], y[1][1]),
                            t.lineEnd(),
                            t.lineStart(),
                            t.point(y[0][0], y[0][1])))
                        }
                        !v || n && nx(n, d) || t.point(d[0], d[1]),
                        n = d,
                        o = v,
                        e = g
                    },
                    lineEnd: function() {
                        o && t.lineEnd(),
                        n = null
                    },
                    clean: function() {
                        return l | (u && o) << 1
                    }
                }
            }
            function c(t, n, r) {
                var i = [1, 0, 0]
                  , o = Q_(Z_(t), Z_(n))
                  , a = J_(o, o)
                  , u = o[0]
                  , c = a - u * u;
                if (!c)
                    return !r && t;
                var s = e * a / c
                  , l = -e * u / c
                  , f = Q_(i, o)
                  , h = tm(i, s);
                K_(h, tm(o, l));
                var p = f
                  , d = J_(h, p)
                  , v = J_(p, p)
                  , g = d * d - v * (J_(h, h) - 1);
                if (!(g < 0)) {
                    var y = p_(g)
                      , _ = tm(p, (-d - y) / v);
                    if (K_(_, h),
                    _ = $_(_),
                    !r)
                        return _;
                    var m, x = t[0], b = n[0], w = t[1], M = n[1];
                    b < x && (m = x,
                    x = b,
                    b = m);
                    var k = b - x
                      , E = r_(k - Jy) < $y;
                    if (!E && M < w && (m = w,
                    w = M,
                    M = m),
                    E || k < $y ? E ? w + M > 0 ^ _[1] < (r_(_[0] - x) < $y ? w : M) : w <= _[1] && _[1] <= M : k > Jy ^ (x <= _[0] && _[0] <= b)) {
                        var S = tm(p, (-d + y) / v);
                        return K_(S, h),
                        [_, $_(S)]
                    }
                }
            }
            function s(n, e) {
                var i = r ? t : Jy - t
                  , o = 0;
                return n < -i ? o |= 1 : n > i && (o |= 2),
                e < -i ? o |= 4 : e > i && (o |= 8),
                o
            }
            return mb(a, u, o, r ? [0, -t] : [-Jy, t - Jy])
        }
        function Ab(t) {
            return {
                stream: Nb(t)
            }
        }
        function Nb(t) {
            function n() {}
            var e = n.prototype = Object.create(Tb.prototype);
            for (var r in t)
                e[r] = t[r];
            return function(t) {
                var e = new n;
                return e.stream = t,
                e
            }
        }
        function Tb() {}
        Tb.prototype = {
            point: function(t, n) {
                this.stream.point(t, n)
            },
            sphere: function() {
                this.stream.sphere()
            },
            lineStart: function() {
                this.stream.lineStart()
            },
            lineEnd: function() {
                this.stream.lineEnd()
            },
            polygonStart: function() {
                this.stream.polygonStart()
            },
            polygonEnd: function() {
                this.stream.polygonEnd()
            }
        };
        var Cb = 16
          , Pb = a_(30 * e_);
        function zb(t, n) {
            return +n ? Rb(t, n) : Lb(t)
        }
        function Lb(t) {
            return Nb({
                point: function(n, e) {
                    n = t(n, e),
                    this.stream.point(n[0], n[1])
                }
            })
        }
        function Rb(t, n) {
            function e(r, i, o, a, u, c, s, l, f, h, p, d, v, g) {
                var y = s - r
                  , _ = l - i
                  , m = y * y + _ * _;
                if (m > 4 * n && v--) {
                    var x = a + h
                      , b = u + p
                      , w = c + d
                      , M = p_(x * x + b * b + w * w)
                      , k = g_(w /= M)
                      , E = r_(r_(w) - 1) < $y || r_(o - f) < $y ? (o + f) / 2 : o_(b, x)
                      , S = t(E, k)
                      , A = S[0]
                      , N = S[1]
                      , T = A - r
                      , C = N - i
                      , P = _ * T - y * C;
                    (P * P / m > n || r_((y * T + _ * C) / m - .5) > .3 || a * h + u * p + c * d < Pb) && (e(r, i, o, a, u, c, A, N, E, x /= M, b /= M, w, v, g),
                    g.point(A, N),
                    e(A, N, E, x, b, w, s, l, f, h, p, d, v, g))
                }
            }
            return function(n) {
                var r, i, o, a, u, c, s, l, f, h, p, d, v = {
                    point: g,
                    lineStart: y,
                    lineEnd: m,
                    polygonStart: function() {
                        n.polygonStart(),
                        v.lineStart = x
                    },
                    polygonEnd: function() {
                        n.polygonEnd(),
                        v.lineStart = y
                    }
                };
                function g(e, r) {
                    e = t(e, r),
                    n.point(e[0], e[1])
                }
                function y() {
                    l = NaN,
                    v.point = _,
                    n.lineStart()
                }
                function _(r, i) {
                    var o = Z_([r, i])
                      , a = t(r, i);
                    e(l, f, s, h, p, d, l = a[0], f = a[1], s = r, h = o[0], p = o[1], d = o[2], Cb, n),
                    n.point(l, f)
                }
                function m() {
                    v.point = g,
                    n.lineEnd()
                }
                function x() {
                    y(),
                    v.point = b,
                    v.lineEnd = w
                }
                function b(t, n) {
                    _(r = t, n),
                    i = l,
                    o = f,
                    a = h,
                    u = p,
                    c = d,
                    v.point = _
                }
                function w() {
                    e(l, f, s, h, p, d, i, o, r, a, u, c, Cb, n),
                    v.lineEnd = m,
                    m()
                }
                return v
            }
        }
        var qb = Nb({
            point: function(t, n) {
                this.stream.point(t * e_, n * e_)
            }
        });
        function Ob(t) {
            return Db((function() {
                return t
            }
            ))()
        }
        function Db(t) {
            var n, e, r, i, o, a, u, c, s, l, f = 150, h = 480, p = 250, d = 0, v = 0, g = 0, y = 0, _ = 0, m = null, x = wb, b = null, w = Sx, M = .5, k = zb(A, M);
            function E(t) {
                return [(t = o(t[0] * e_, t[1] * e_))[0] * f + e, r - t[1] * f]
            }
            function S(t) {
                return (t = o.invert((t[0] - e) / f, (r - t[1]) / f)) && [t[0] * n_, t[1] * n_]
            }
            function A(t, i) {
                return [(t = n(t, i))[0] * f + e, r - t[1] * f]
            }
            function N() {
                o = Bm(i = Xm(g, y, _), n);
                var t = n(d, v);
                return e = h - t[0] * f,
                r = p + t[1] * f,
                T()
            }
            function T() {
                return s = l = null,
                E
            }
            return E.stream = function(t) {
                return s && l === t ? s : s = qb(x(i, k(w(l = t))))
            }
            ,
            E.clipAngle = function(t) {
                return arguments.length ? (x = +t ? Sb(m = t * e_, 6 * e_) : (m = null,
                wb),
                T()) : m * n_
            }
            ,
            E.clipExtent = function(t) {
                return arguments.length ? (w = null == t ? (b = a = u = c = null,
                Sx) : fx(b = +t[0][0], a = +t[0][1], u = +t[1][0], c = +t[1][1]),
                T()) : null == b ? null : [[b, a], [u, c]]
            }
            ,
            E.scale = function(t) {
                return arguments.length ? (f = +t,
                N()) : f
            }
            ,
            E.translate = function(t) {
                return arguments.length ? (h = +t[0],
                p = +t[1],
                N()) : [h, p]
            }
            ,
            E.center = function(t) {
                return arguments.length ? (d = t[0] % 360 * e_,
                v = t[1] % 360 * e_,
                N()) : [d * n_, v * n_]
            }
            ,
            E.rotate = function(t) {
                return arguments.length ? (g = t[0] % 360 * e_,
                y = t[1] % 360 * e_,
                _ = t.length > 2 ? t[2] % 360 * e_ : 0,
                N()) : [g * n_, y * n_, _ * n_]
            }
            ,
            E.precision = function(t) {
                return arguments.length ? (k = zb(A, M = t * t),
                T()) : p_(M)
            }
            ,
            function() {
                return n = t.apply(this, arguments),
                E.invert = n.invert && S,
                N()
            }
        }
        function Ub(t) {
            var n = 0
              , e = Jy / 3
              , r = Db(t)
              , i = r(n, e);
            return i.parallels = function(t) {
                return arguments.length ? r(n = t[0] * e_, e = t[1] * e_) : [n * n_, e * n_]
            }
            ,
            i
        }
        function jb(t, n) {
            var e = f_(t)
              , r = (e + f_(n)) / 2
              , i = 1 + e * (2 * r - e)
              , o = p_(i) / r;
            function a(t, n) {
                var e = p_(i - 2 * r * f_(n)) / r;
                return [e * f_(t *= r), o - e * a_(t)]
            }
            return a.invert = function(t, n) {
                var e = o - n;
                return [o_(t, e) / r, g_((i - (t * t + e * e) * r * r) / (2 * r))]
            }
            ,
            a
        }
        function Ib() {
            return Ub(jb).scale(151).translate([480, 347])
        }
        function Fb() {
            return Ib().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7])
        }
        function Yb(t) {
            var n = t.length;
            return {
                point: function(e, r) {
                    for (var i = -1; ++i < n; )
                        t[i].point(e, r)
                },
                sphere: function() {
                    for (var e = -1; ++e < n; )
                        t[e].sphere()
                },
                lineStart: function() {
                    for (var e = -1; ++e < n; )
                        t[e].lineStart()
                },
                lineEnd: function() {
                    for (var e = -1; ++e < n; )
                        t[e].lineEnd()
                },
                polygonStart: function() {
                    for (var e = -1; ++e < n; )
                        t[e].polygonStart()
                },
                polygonEnd: function() {
                    for (var e = -1; ++e < n; )
                        t[e].polygonEnd()
                }
            }
        }
        function Bb() {
            var t, n, e, r, i, o, a = Fb(), u = Ib().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), c = Ib().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), s = {
                point: function(t, n) {
                    o = [t, n]
                }
            };
            function l(t) {
                var n = t[0]
                  , a = t[1];
                return o = null,
                e.point(n, a),
                o || (r.point(n, a),
                o) || (i.point(n, a),
                o)
            }
            return l.invert = function(t) {
                var n = a.scale()
                  , e = a.translate()
                  , r = (t[0] - e[0]) / n
                  , i = (t[1] - e[1]) / n;
                return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? u : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? c : a).invert(t)
            }
            ,
            l.stream = function(e) {
                return t && n === e ? t : t = Yb([a.stream(n = e), u.stream(e), c.stream(e)])
            }
            ,
            l.precision = function(t) {
                return arguments.length ? (a.precision(t),
                u.precision(t),
                c.precision(t),
                l) : a.precision()
            }
            ,
            l.scale = function(t) {
                return arguments.length ? (a.scale(t),
                u.scale(.35 * t),
                c.scale(t),
                l.translate(a.translate())) : a.scale()
            }
            ,
            l.translate = function(t) {
                if (!arguments.length)
                    return a.translate();
                var n = a.scale()
                  , o = +t[0]
                  , f = +t[1];
                return e = a.translate(t).clipExtent([[o - .455 * n, f - .238 * n], [o + .455 * n, f + .238 * n]]).stream(s),
                r = u.translate([o - .307 * n, f + .201 * n]).clipExtent([[o - .425 * n + $y, f + .12 * n + $y], [o - .214 * n - $y, f + .234 * n - $y]]).stream(s),
                i = c.translate([o - .205 * n, f + .212 * n]).clipExtent([[o - .214 * n + $y, f + .166 * n + $y], [o - .115 * n - $y, f + .234 * n - $y]]).stream(s),
                l
            }
            ,
            l.scale(1070)
        }
        function Hb(t) {
            return function(n, e) {
                var r = a_(n)
                  , i = a_(e)
                  , o = t(r * i);
                return [o * i * f_(n), o * f_(e)]
            }
        }
        function Xb(t) {
            return function(n, e) {
                var r = p_(n * n + e * e)
                  , i = t(r)
                  , o = f_(i)
                  , a = a_(i);
                return [o_(n * o, r * a), g_(r && e * o / r)]
            }
        }
        var Gb = Hb((function(t) {
            return p_(2 / (1 + t))
        }
        ));
        function Vb() {
            return Ob(Gb).scale(120).clipAngle(179.999)
        }
        Gb.invert = Xb((function(t) {
            return 2 * g_(t / 2)
        }
        ));
        var Wb = Hb((function(t) {
            return (t = v_(t)) && t / f_(t)
        }
        ));
        function $b() {
            return Ob(Wb).scale(480 / t_).clipAngle(179.999)
        }
        function Zb(t, n) {
            return [t, s_(d_((Qy + n) / 2))]
        }
        function Jb() {
            return Qb(Zb)
        }
        function Qb(t) {
            var n, e = Ob(t), r = e.scale, i = e.translate, o = e.clipExtent;
            return e.scale = function(t) {
                return arguments.length ? (r(t),
                n && e.clipExtent(null),
                e) : r()
            }
            ,
            e.translate = function(t) {
                return arguments.length ? (i(t),
                n && e.clipExtent(null),
                e) : i()
            }
            ,
            e.clipExtent = function(t) {
                if (!arguments.length)
                    return n ? null : o();
                if (n = null == t) {
                    var a = Jy * r()
                      , u = i();
                    t = [[u[0] - a, u[1] - a], [u[0] + a, u[1] + a]]
                }
                return o(t),
                e
            }
            ,
            e.clipExtent(null).scale(961 / t_)
        }
        function Kb(t) {
            return d_((Qy + t) / 2)
        }
        function tw(t, n) {
            var e = a_(t)
              , r = t === n ? f_(t) : s_(e / a_(n)) / s_(Kb(n) / Kb(t))
              , i = e * l_(Kb(t), r) / r;
            if (!r)
                return Zb;
            function o(t, n) {
                i > 0 ? n < -Qy + $y && (n = -Qy + $y) : n > Qy - $y && (n = Qy - $y);
                var e = i / l_(Kb(n), r);
                return [e * f_(r * t), i - e * a_(r * t)]
            }
            return o.invert = function(t, n) {
                var e = i - n
                  , o = h_(r) * p_(t * t + e * e);
                return [o_(t, e) / r, 2 * i_(l_(i / o, 1 / r)) - Qy]
            }
            ,
            o
        }
        function nw() {
            return Ub(tw)
        }
        function ew(t, n) {
            return [t, n]
        }
        function rw() {
            return Ob(ew).scale(480 / Jy)
        }
        function iw(t, n) {
            var e = a_(t)
              , r = t === n ? f_(t) : (e - a_(n)) / (n - t)
              , i = e / r + t;
            if (r_(r) < $y)
                return ew;
            function o(t, n) {
                var e = i - n
                  , o = r * t;
                return [e * f_(o), i - e * a_(o)]
            }
            return o.invert = function(t, n) {
                var e = i - n;
                return [o_(t, e) / r, i - h_(r) * p_(t * t + e * e)]
            }
            ,
            o
        }
        function ow() {
            return Ub(iw).scale(128).translate([480, 280])
        }
        function aw(t, n) {
            var e = a_(n)
              , r = a_(t) * e;
            return [e * f_(t) / r, f_(n) / r]
        }
        function uw() {
            return Ob(aw).scale(139).clipAngle(60)
        }
        function cw(t, n) {
            return [a_(n) * f_(t), f_(n)]
        }
        function sw() {
            return Ob(cw).scale(240).clipAngle(90 + $y)
        }
        function lw(t, n) {
            var e = a_(n)
              , r = 1 + a_(t) * e;
            return [e * f_(t) / r, f_(n) / r]
        }
        function fw() {
            return Ob(lw).scale(240).clipAngle(142)
        }
        function hw(t, n) {
            return [s_(d_((Qy + n) / 2)), -t]
        }
        function pw() {
            var t = Qb(hw)
              , n = t.center
              , e = t.rotate;
            return t.center = function(t) {
                return arguments.length ? n([-t[1], t[0]]) : [(t = n())[1], -t[0]]
            }
            ,
            t.rotate = function(t) {
                return arguments.length ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : [(t = e())[0], t[1], t[2] - 90]
            }
            ,
            e([0, 0, 90])
        }
        Wb.invert = Xb((function(t) {
            return t
        }
        )),
        Zb.invert = function(t, n) {
            return [t, 2 * i_(c_(n)) - Qy]
        }
        ,
        ew.invert = ew,
        aw.invert = Xb(i_),
        cw.invert = Xb(g_),
        lw.invert = Xb((function(t) {
            return 2 + i_(t)
        }
        )),
        hw.invert = function(t, n) {
            return [-n, 2 * i_(c_(t)) - Qy]
        }
        ,
        t.version = n,
        t.bisect = a,
        t.bisectRight = a,
        t.bisectLeft = u,
        t.ascending = e,
        t.bisector = r,
        t.descending = c,
        t.deviation = f,
        t.extent = h,
        t.histogram = E,
        t.thresholdFreedmanDiaconis = A,
        t.thresholdScott = N,
        t.thresholdSturges = k,
        t.max = T,
        t.mean = C,
        t.median = P,
        t.merge = z,
        t.min = L,
        t.pairs = R,
        t.permute = q,
        t.quantile = S,
        t.range = _,
        t.scan = O,
        t.shuffle = D,
        t.sum = U,
        t.ticks = w,
        t.tickStep = M,
        t.transpose = j,
        t.variance = l,
        t.zip = F,
        t.entries = nt,
        t.keys = K,
        t.values = tt,
        t.map = H,
        t.set = Q,
        t.nest = X,
        t.randomUniform = et,
        t.randomNormal = rt,
        t.randomLogNormal = it,
        t.randomBates = at,
        t.randomIrwinHall = ot,
        t.randomExponential = ut,
        t.easeLinear = ct,
        t.easeQuad = ft,
        t.easeQuadIn = st,
        t.easeQuadOut = lt,
        t.easeQuadInOut = ft,
        t.easeCubic = dt,
        t.easeCubicIn = ht,
        t.easeCubicOut = pt,
        t.easeCubicInOut = dt,
        t.easePoly = _t,
        t.easePolyIn = gt,
        t.easePolyOut = yt,
        t.easePolyInOut = _t,
        t.easeSin = Mt,
        t.easeSinIn = bt,
        t.easeSinOut = wt,
        t.easeSinInOut = Mt,
        t.easeExp = St,
        t.easeExpIn = kt,
        t.easeExpOut = Et,
        t.easeExpInOut = St,
        t.easeCircle = Tt,
        t.easeCircleIn = At,
        t.easeCircleOut = Nt,
        t.easeCircleInOut = Tt,
        t.easeBounce = Ft,
        t.easeBounceIn = It,
        t.easeBounceOut = Ft,
        t.easeBounceInOut = Yt,
        t.easeBack = Gt,
        t.easeBackIn = Ht,
        t.easeBackOut = Xt,
        t.easeBackInOut = Gt,
        t.easeElastic = Jt,
        t.easeElasticIn = Zt,
        t.easeElasticOut = Jt,
        t.easeElasticInOut = Qt,
        t.polygonArea = Kt,
        t.polygonCentroid = tn,
        t.polygonHull = on,
        t.polygonContains = an,
        t.polygonLength = un,
        t.path = pn,
        t.quadtree = zn,
        t.queue = Hn,
        t.arc = ie,
        t.area = le,
        t.line = se,
        t.pie = pe,
        t.radialArea = me,
        t.radialLine = _e,
        t.symbol = je,
        t.symbols = Ue,
        t.symbolCircle = xe,
        t.symbolCross = be,
        t.symbolDiamond = ke,
        t.symbolSquare = Ce,
        t.symbolStar = Te,
        t.symbolTriangle = ze,
        t.symbolWye = De,
        t.curveBasisClosed = Xe,
        t.curveBasisOpen = Ve,
        t.curveBasis = Be,
        t.curveBundle = $e,
        t.curveCardinalClosed = tr,
        t.curveCardinalOpen = er,
        t.curveCardinal = Qe,
        t.curveCatmullRomClosed = ur,
        t.curveCatmullRomOpen = sr,
        t.curveCatmullRom = or,
        t.curveLinearClosed = fr,
        t.curveLinear = ae,
        t.curveMonotoneX = mr,
        t.curveMonotoneY = xr,
        t.curveNatural = Mr,
        t.curveStep = Er,
        t.curveStepAfter = Ar,
        t.curveStepBefore = Sr,
        t.stack = zr,
        t.stackOffsetExpand = Lr,
        t.stackOffsetNone = Tr,
        t.stackOffsetSilhouette = Rr,
        t.stackOffsetWiggle = qr,
        t.stackOrderAscending = Or,
        t.stackOrderDescending = Ur,
        t.stackOrderInsideOut = jr,
        t.stackOrderNone = Cr,
        t.stackOrderReverse = Ir,
        t.color = ni,
        t.rgb = oi,
        t.hsl = si,
        t.lab = Mi,
        t.hcl = Ci,
        t.cubehelix = Fi,
        t.interpolate = fo,
        t.interpolateArray = eo,
        t.interpolateDate = ro,
        t.interpolateNumber = io,
        t.interpolateObject = oo,
        t.interpolateRound = ho,
        t.interpolateString = lo,
        t.interpolateTransformCss = ko,
        t.interpolateTransformSvg = Eo,
        t.interpolateZoom = Lo,
        t.interpolateRgb = Qi,
        t.interpolateRgbBasis = to,
        t.interpolateRgbBasisClosed = no,
        t.interpolateHsl = qo,
        t.interpolateHslLong = Oo,
        t.interpolateLab = Do,
        t.interpolateHcl = jo,
        t.interpolateHclLong = Io,
        t.interpolateCubehelix = Yo,
        t.interpolateCubehelixLong = Bo,
        t.interpolateBasis = Hi,
        t.interpolateBasisClosed = Xi,
        t.quantize = Ho,
        t.dispatch = Go,
        t.dsvFormat = ta,
        t.csvParse = ea,
        t.csvParseRows = ra,
        t.csvFormat = ia,
        t.csvFormatRows = oa,
        t.tsvParse = ua,
        t.tsvParseRows = ca,
        t.tsvFormat = sa,
        t.tsvFormatRows = la,
        t.request = fa,
        t.html = va,
        t.json = ga,
        t.text = ya,
        t.xml = _a,
        t.csv = Ma,
        t.tsv = ka,
        t.now = Ra,
        t.timer = Da,
        t.timerFlush = Ua,
        t.timeout = Ba,
        t.interval = Ha,
        t.timeInterval = Va,
        t.timeMillisecond = Wa,
        t.timeMilliseconds = $a,
        t.timeSecond = nu,
        t.timeSeconds = eu,
        t.timeMinute = ru,
        t.timeMinutes = iu,
        t.timeHour = ou,
        t.timeHours = au,
        t.timeDay = uu,
        t.timeDays = cu,
        t.timeWeek = lu,
        t.timeWeeks = yu,
        t.timeSunday = lu,
        t.timeSundays = yu,
        t.timeMonday = fu,
        t.timeMondays = _u,
        t.timeTuesday = hu,
        t.timeTuesdays = mu,
        t.timeWednesday = pu,
        t.timeWednesdays = xu,
        t.timeThursday = du,
        t.timeThursdays = bu,
        t.timeFriday = vu,
        t.timeFridays = wu,
        t.timeSaturday = gu,
        t.timeSaturdays = Mu,
        t.timeMonth = ku,
        t.timeMonths = Eu,
        t.timeYear = Su,
        t.timeYears = Au,
        t.utcMillisecond = Wa,
        t.utcMilliseconds = $a,
        t.utcSecond = nu,
        t.utcSeconds = eu,
        t.utcMinute = Nu,
        t.utcMinutes = Tu,
        t.utcHour = Cu,
        t.utcHours = Pu,
        t.utcDay = zu,
        t.utcDays = Lu,
        t.utcWeek = qu,
        t.utcWeeks = Yu,
        t.utcSunday = qu,
        t.utcSundays = Yu,
        t.utcMonday = Ou,
        t.utcMondays = Bu,
        t.utcTuesday = Du,
        t.utcTuesdays = Hu,
        t.utcWednesday = Uu,
        t.utcWednesdays = Xu,
        t.utcThursday = ju,
        t.utcThursdays = Gu,
        t.utcFriday = Iu,
        t.utcFridays = Vu,
        t.utcSaturday = Fu,
        t.utcSaturdays = Wu,
        t.utcMonth = $u,
        t.utcMonths = Zu,
        t.utcYear = Ju,
        t.utcYears = Ku,
        t.formatLocale = pc,
        t.formatDefaultLocale = dc,
        t.formatSpecifier = cc,
        t.precisionFixed = vc,
        t.precisionPrefix = gc,
        t.precisionRound = yc,
        t.isoFormat = Ms,
        t.isoParse = Es,
        t.timeFormatLocale = bc,
        t.timeFormatDefaultLocale = xs,
        t.scaleBand = Ps,
        t.scalePoint = Ls,
        t.scaleIdentity = Vs,
        t.scaleLinear = Gs,
        t.scaleLog = nl,
        t.scaleOrdinal = Cs,
        t.scaleImplicit = Ts,
        t.scalePow = rl,
        t.scaleSqrt = il,
        t.scaleQuantile = ol,
        t.scaleQuantize = al,
        t.scaleThreshold = ul,
        t.scaleTime = _l,
        t.scaleUtc = ml,
        t.schemeCategory10 = bl,
        t.schemeCategory20b = wl,
        t.schemeCategory20c = Ml,
        t.schemeCategory20 = kl,
        t.scaleSequential = ql,
        t.interpolateCubehelixDefault = El,
        t.interpolateRainbow = Tl,
        t.interpolateWarm = Sl,
        t.interpolateCool = Al,
        t.interpolateViridis = Pl,
        t.interpolateMagma = zl,
        t.interpolateInferno = Ll,
        t.interpolatePlasma = Rl,
        t.creator = Fl,
        t.customEvent = ef,
        t.local = Bl,
        t.matcher = Wl,
        t.mouse = af,
        t.namespace = Ul,
        t.namespaces = Dl,
        t.select = Th,
        t.selectAll = Ch,
        t.selection = Nh,
        t.selector = cf,
        t.selectorAll = ff,
        t.touch = Ph,
        t.touches = zh,
        t.window = If,
        t.active = Wp,
        t.interrupt = Gh,
        t.transition = Fp,
        t.axisTop = ud,
        t.axisRight = cd,
        t.axisBottom = sd,
        t.axisLeft = ld,
        t.cluster = _d,
        t.hierarchy = Cd,
        t.pack = nv,
        t.packSiblings = $d,
        t.packEnclose = Ud,
        t.partition = uv,
        t.stratify = pv,
        t.tree = wv,
        t.treemap = Av,
        t.treemapBinary = Nv,
        t.treemapDice = av,
        t.treemapSlice = Mv,
        t.treemapSliceDice = Tv,
        t.treemapSquarify = Sv,
        t.treemapResquarify = Cv,
        t.forceCenter = Pv,
        t.forceCollide = Ov,
        t.forceLink = Uv,
        t.forceManyBody = Hv,
        t.forceSimulation = Bv,
        t.forceX = Xv,
        t.forceY = Gv,
        t.drag = eg,
        t.dragDisable = $v,
        t.dragEnable = Zv,
        t.voronoi = Xg,
        t.zoom = ey,
        t.zoomIdentity = $g,
        t.zoomTransform = Zg,
        t.brush = Ay,
        t.brushX = Ey,
        t.brushY = Sy,
        t.brushSelection = ky,
        t.chord = Oy,
        t.ribbon = Hy,
        t.geoAlbers = Fb,
        t.geoAlbersUsa = Bb,
        t.geoArea = W_,
        t.geoAzimuthalEqualArea = Vb,
        t.geoAzimuthalEqualAreaRaw = Gb,
        t.geoAzimuthalEquidistant = $b,
        t.geoAzimuthalEquidistantRaw = Wb,
        t.geoBounds = Tm,
        t.geoCentroid = Fm,
        t.geoCircle = Qm,
        t.geoClipExtent = hx,
        t.geoConicConformal = nw,
        t.geoConicConformalRaw = tw,
        t.geoConicEqualArea = Ib,
        t.geoConicEqualAreaRaw = jb,
        t.geoConicEquidistant = ow,
        t.geoConicEquidistantRaw = iw,
        t.geoDistance = bx,
        t.geoEquirectangular = rw,
        t.geoEquirectangularRaw = ew,
        t.geoGnomonic = uw,
        t.geoGnomonicRaw = aw,
        t.geoGraticule = kx,
        t.geoInterpolate = Ex,
        t.geoLength = _x,
        t.geoMercator = Jb,
        t.geoMercatorRaw = Zb,
        t.geoOrthographic = sw,
        t.geoOrthographicRaw = cw,
        t.geoPath = gb,
        t.geoProjection = Ob,
        t.geoProjectionMutator = Db,
        t.geoRotation = $m,
        t.geoStereographic = fw,
        t.geoStereographicRaw = lw,
        t.geoStream = P_,
        t.geoTransform = Ab,
        t.geoTransverseMercator = pw,
        t.geoTransverseMercatorRaw = hw,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }(n)
}
, function(t, n, e) {
    !function(t) {
        "use strict";
        function n(t, n) {
            return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
        }
        function e(t) {
            return 1 === t.length && (t = r(t)),
            {
                left: function(n, e, r, i) {
                    for (null == r && (r = 0),
                    null == i && (i = n.length); r < i; ) {
                        var o = r + i >>> 1;
                        t(n[o], e) < 0 ? r = o + 1 : i = o
                    }
                    return r
                },
                right: function(n, e, r, i) {
                    for (null == r && (r = 0),
                    null == i && (i = n.length); r < i; ) {
                        var o = r + i >>> 1;
                        t(n[o], e) > 0 ? i = o : r = o + 1
                    }
                    return r
                }
            }
        }
        function r(t) {
            return function(e, r) {
                return n(t(e), r)
            }
        }
        var i = e(n)
          , o = i.right
          , a = i.left;
        function u(t, n) {
            return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
        }
        function c(t) {
            return null === t ? NaN : +t
        }
        function s(t, n) {
            var e, r, i = t.length, o = 0, a = 0, u = -1, s = 0;
            if (null == n)
                for (; ++u < i; )
                    isNaN(e = c(t[u])) || (a += (r = e - o) * (e - (o += r / ++s)));
            else
                for (; ++u < i; )
                    isNaN(e = c(n(t[u], u, t))) || (a += (r = e - o) * (e - (o += r / ++s)));
            if (s > 1)
                return a / (s - 1)
        }
        function l(t, n) {
            var e = s(t, n);
            return e ? Math.sqrt(e) : e
        }
        function f(t, n) {
            var e, r, i, o = -1, a = t.length;
            if (null == n) {
                for (; ++o < a; )
                    if (null != (r = t[o]) && r >= r) {
                        e = i = r;
                        break
                    }
                for (; ++o < a; )
                    null != (r = t[o]) && (e > r && (e = r),
                    i < r && (i = r))
            } else {
                for (; ++o < a; )
                    if (null != (r = n(t[o], o, t)) && r >= r) {
                        e = i = r;
                        break
                    }
                for (; ++o < a; )
                    null != (r = n(t[o], o, t)) && (e > r && (e = r),
                    i < r && (i = r))
            }
            return [e, i]
        }
        var h = Array.prototype
          , p = h.slice
          , d = h.map;
        function v(t) {
            return function() {
                return t
            }
        }
        function g(t) {
            return t
        }
        function y(t, n, e) {
            t = +t,
            n = +n,
            e = (i = arguments.length) < 2 ? (n = t,
            t = 0,
            1) : i < 3 ? 1 : +e;
            for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i; )
                o[r] = t + r * e;
            return o
        }
        var _ = Math.sqrt(50)
          , m = Math.sqrt(10)
          , x = Math.sqrt(2);
        function b(t, n, e) {
            var r = w(t, n, e);
            return y(Math.ceil(t / r) * r, Math.floor(n / r) * r + r / 2, r)
        }
        function w(t, n, e) {
            var r = Math.abs(n - t) / Math.max(0, e)
              , i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10))
              , o = r / i;
            return o >= _ ? i *= 10 : o >= m ? i *= 5 : o >= x && (i *= 2),
            n < t ? -i : i
        }
        function M(t) {
            return Math.ceil(Math.log(t.length) / Math.LN2) + 1
        }
        function k() {
            var t = g
              , n = f
              , e = M;
            function r(r) {
                var i, a, u = r.length, c = new Array(u);
                for (i = 0; i < u; ++i)
                    c[i] = t(r[i], i, r);
                var s = n(c)
                  , l = s[0]
                  , f = s[1]
                  , h = e(c, l, f);
                Array.isArray(h) || (h = b(l, f, h));
                for (var p = h.length; h[0] <= l; )
                    h.shift(),
                    --p;
                for (; h[p - 1] >= f; )
                    h.pop(),
                    --p;
                var d, v = new Array(p + 1);
                for (i = 0; i <= p; ++i)
                    (d = v[i] = []).x0 = i > 0 ? h[i - 1] : l,
                    d.x1 = i < p ? h[i] : f;
                for (i = 0; i < u; ++i)
                    l <= (a = c[i]) && a <= f && v[o(h, a, 0, p)].push(r[i]);
                return v
            }
            return r.value = function(n) {
                return arguments.length ? (t = "function" == typeof n ? n : v(n),
                r) : t
            }
            ,
            r.domain = function(t) {
                return arguments.length ? (n = "function" == typeof t ? t : v([t[0], t[1]]),
                r) : n
            }
            ,
            r.thresholds = function(t) {
                return arguments.length ? (e = "function" == typeof t ? t : Array.isArray(t) ? v(p.call(t)) : v(t),
                r) : e
            }
            ,
            r
        }
        function E(t, n, e) {
            if (null == e && (e = c),
            r = t.length) {
                if ((n = +n) <= 0 || r < 2)
                    return +e(t[0], 0, t);
                if (n >= 1)
                    return +e(t[r - 1], r - 1, t);
                var r, i = (r - 1) * n, o = Math.floor(i), a = +e(t[o], o, t);
                return a + (+e(t[o + 1], o + 1, t) - a) * (i - o)
            }
        }
        function S(t, e, r) {
            return t = d.call(t, c).sort(n),
            Math.ceil((r - e) / (2 * (E(t, .75) - E(t, .25)) * Math.pow(t.length, -1 / 3)))
        }
        function A(t, n, e) {
            return Math.ceil((e - n) / (3.5 * l(t) * Math.pow(t.length, -1 / 3)))
        }
        function N(t, n) {
            var e, r, i = -1, o = t.length;
            if (null == n) {
                for (; ++i < o; )
                    if (null != (r = t[i]) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = t[i]) && r > e && (e = r)
            } else {
                for (; ++i < o; )
                    if (null != (r = n(t[i], i, t)) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = n(t[i], i, t)) && r > e && (e = r)
            }
            return e
        }
        function T(t, n) {
            var e, r = 0, i = t.length, o = -1, a = i;
            if (null == n)
                for (; ++o < i; )
                    isNaN(e = c(t[o])) ? --a : r += e;
            else
                for (; ++o < i; )
                    isNaN(e = c(n(t[o], o, t))) ? --a : r += e;
            if (a)
                return r / a
        }
        function C(t, e) {
            var r, i = [], o = t.length, a = -1;
            if (null == e)
                for (; ++a < o; )
                    isNaN(r = c(t[a])) || i.push(r);
            else
                for (; ++a < o; )
                    isNaN(r = c(e(t[a], a, t))) || i.push(r);
            return E(i.sort(n), .5)
        }
        function P(t) {
            for (var n, e, r, i = t.length, o = -1, a = 0; ++o < i; )
                a += t[o].length;
            for (e = new Array(a); --i >= 0; )
                for (n = (r = t[i]).length; --n >= 0; )
                    e[--a] = r[n];
            return e
        }
        function z(t, n) {
            var e, r, i = -1, o = t.length;
            if (null == n) {
                for (; ++i < o; )
                    if (null != (r = t[i]) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = t[i]) && e > r && (e = r)
            } else {
                for (; ++i < o; )
                    if (null != (r = n(t[i], i, t)) && r >= r) {
                        e = r;
                        break
                    }
                for (; ++i < o; )
                    null != (r = n(t[i], i, t)) && e > r && (e = r)
            }
            return e
        }
        function L(t) {
            for (var n = 0, e = t.length - 1, r = t[0], i = new Array(e < 0 ? 0 : e); n < e; )
                i[n] = [r, r = t[++n]];
            return i
        }
        function R(t, n) {
            for (var e = n.length, r = new Array(e); e--; )
                r[e] = t[n[e]];
            return r
        }
        function q(t, e) {
            if (r = t.length) {
                var r, i, o = 0, a = 0, u = t[a];
                for (e || (e = n); ++o < r; )
                    (e(i = t[o], u) < 0 || 0 !== e(u, u)) && (u = i,
                    a = o);
                return 0 === e(u, u) ? a : void 0
            }
        }
        function O(t, n, e) {
            for (var r, i, o = (null == e ? t.length : e) - (n = null == n ? 0 : +n); o; )
                i = Math.random() * o-- | 0,
                r = t[o + n],
                t[o + n] = t[i + n],
                t[i + n] = r;
            return t
        }
        function D(t, n) {
            var e, r = 0, i = t.length, o = -1;
            if (null == n)
                for (; ++o < i; )
                    (e = +t[o]) && (r += e);
            else
                for (; ++o < i; )
                    (e = +n(t[o], o, t)) && (r += e);
            return r
        }
        function U(t) {
            if (!(i = t.length))
                return [];
            for (var n = -1, e = z(t, j), r = new Array(e); ++n < e; )
                for (var i, o = -1, a = r[n] = new Array(i); ++o < i; )
                    a[o] = t[o][n];
            return r
        }
        function j(t) {
            return t.length
        }
        function I() {
            return U(arguments)
        }
        t.bisect = o,
        t.bisectRight = o,
        t.bisectLeft = a,
        t.ascending = n,
        t.bisector = e,
        t.descending = u,
        t.deviation = l,
        t.extent = f,
        t.histogram = k,
        t.thresholdFreedmanDiaconis = S,
        t.thresholdScott = A,
        t.thresholdSturges = M,
        t.max = N,
        t.mean = T,
        t.median = C,
        t.merge = P,
        t.min = z,
        t.pairs = L,
        t.permute = R,
        t.quantile = E,
        t.range = y,
        t.scan = q,
        t.shuffle = O,
        t.sum = D,
        t.ticks = b,
        t.tickStep = w,
        t.transpose = U,
        t.variance = s,
        t.zip = I,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }(n)
}
, function(t, n, e) {
    !function(t) {
        "use strict";
        function n() {}
        function e(t) {
            if (!t)
                return n;
            var e, r, i = t.scale[0], o = t.scale[1], a = t.translate[0], u = t.translate[1];
            return function(t, n) {
                n || (e = r = 0),
                t[0] = (e += t[0]) * i + a,
                t[1] = (r += t[1]) * o + u
            }
        }
        function r(t) {
            if (!t)
                return n;
            var e, r, i = t.scale[0], o = t.scale[1], a = t.translate[0], u = t.translate[1];
            return function(t, n) {
                n || (e = r = 0);
                var c = Math.round((t[0] - a) / i)
                  , s = Math.round((t[1] - u) / o);
                t[0] = c - e,
                t[1] = s - r,
                e = c,
                r = s
            }
        }
        function i(t, n) {
            for (var e, r = t.length, i = r - n; i < --r; )
                e = t[i],
                t[i++] = t[r],
                t[r] = e
        }
        function o(t, n) {
            for (var e = 0, r = t.length; e < r; ) {
                var i = e + r >>> 1;
                t[i] < n ? e = i + 1 : r = i
            }
            return e
        }
        function a(t, n) {
            return "GeometryCollection" === n.type ? {
                type: "FeatureCollection",
                features: n.geometries.map((function(n) {
                    return u(t, n)
                }
                ))
            } : u(t, n)
        }
        function u(t, n) {
            var e = {
                type: "Feature",
                id: n.id,
                properties: n.properties || {},
                geometry: c(t, n)
            };
            return null == n.id && delete e.id,
            e
        }
        function c(t, n) {
            var r = e(t.transform)
              , o = t.arcs;
            function a(t, n) {
                n.length && n.pop();
                for (var e, a = o[t < 0 ? ~t : t], u = 0, c = a.length; u < c; ++u)
                    n.push(e = a[u].slice()),
                    r(e, u);
                t < 0 && i(n, c)
            }
            function u(t) {
                return t = t.slice(),
                r(t, 0),
                t
            }
            function c(t) {
                for (var n = [], e = 0, r = t.length; e < r; ++e)
                    a(t[e], n);
                return n.length < 2 && n.push(n[0].slice()),
                n
            }
            function s(t) {
                for (var n = c(t); n.length < 4; )
                    n.push(n[0].slice());
                return n
            }
            function l(t) {
                return t.map(s)
            }
            function f(t) {
                var n = t.type;
                return "GeometryCollection" === n ? {
                    type: n,
                    geometries: t.geometries.map(f)
                } : n in h ? {
                    type: n,
                    coordinates: h[n](t)
                } : null
            }
            var h = {
                Point: function(t) {
                    return u(t.coordinates)
                },
                MultiPoint: function(t) {
                    return t.coordinates.map(u)
                },
                LineString: function(t) {
                    return c(t.arcs)
                },
                MultiLineString: function(t) {
                    return t.arcs.map(c)
                },
                Polygon: function(t) {
                    return l(t.arcs)
                },
                MultiPolygon: function(t) {
                    return t.arcs.map(l)
                }
            };
            return f(n)
        }
        function s(t, n) {
            var e = {}
              , r = {}
              , i = {}
              , o = []
              , a = -1;
            function u(n) {
                var e, r = t.arcs[n < 0 ? ~n : n], i = r[0];
                return t.transform ? (e = [0, 0],
                r.forEach((function(t) {
                    e[0] += t[0],
                    e[1] += t[1]
                }
                ))) : e = r[r.length - 1],
                n < 0 ? [e, i] : [i, e]
            }
            function c(t, n) {
                for (var r in t) {
                    var i = t[r];
                    delete n[i.start],
                    delete i.start,
                    delete i.end,
                    i.forEach((function(t) {
                        e[t < 0 ? ~t : t] = 1
                    }
                    )),
                    o.push(i)
                }
            }
            return n.forEach((function(e, r) {
                var i, o = t.arcs[e < 0 ? ~e : e];
                o.length < 3 && !o[1][0] && !o[1][1] && (i = n[++a],
                n[a] = e,
                n[r] = i)
            }
            )),
            n.forEach((function(t) {
                var n, e, o = u(t), a = o[0], c = o[1];
                if (n = i[a])
                    if (delete i[n.end],
                    n.push(t),
                    n.end = c,
                    e = r[c]) {
                        delete r[e.start];
                        var s = e === n ? n : n.concat(e);
                        r[s.start = n.start] = i[s.end = e.end] = s
                    } else
                        r[n.start] = i[n.end] = n;
                else if (n = r[c])
                    if (delete r[n.start],
                    n.unshift(t),
                    n.start = a,
                    e = i[a]) {
                        delete i[e.end];
                        var l = e === n ? n : e.concat(n);
                        r[l.start = e.start] = i[l.end = n.end] = l
                    } else
                        r[n.start] = i[n.end] = n;
                else
                    r[(n = [t]).start = a] = i[n.end = c] = n
            }
            )),
            c(i, r),
            c(r, i),
            n.forEach((function(t) {
                e[t < 0 ? ~t : t] || o.push([t])
            }
            )),
            o
        }
        function l(t) {
            return c(t, f.apply(this, arguments))
        }
        function f(t, n, e) {
            var r = [];
            function i(t) {
                var n = t < 0 ? ~t : t;
                (l[n] || (l[n] = [])).push({
                    i: t,
                    g: c
                })
            }
            function o(t) {
                t.forEach(i)
            }
            function a(t) {
                t.forEach(o)
            }
            function u(t) {
                "GeometryCollection" === t.type ? t.geometries.forEach(u) : t.type in f && (c = t,
                f[t.type](t.arcs))
            }
            if (arguments.length > 1) {
                var c, l = [], f = {
                    LineString: o,
                    MultiLineString: a,
                    Polygon: a,
                    MultiPolygon: function(t) {
                        t.forEach(a)
                    }
                };
                u(n),
                l.forEach(arguments.length < 3 ? function(t) {
                    r.push(t[0].i)
                }
                : function(t) {
                    e(t[0].g, t[t.length - 1].g) && r.push(t[0].i)
                }
                )
            } else
                for (var h = 0, p = t.arcs.length; h < p; ++h)
                    r.push(h);
            return {
                type: "MultiLineString",
                arcs: s(t, r)
            }
        }
        function h(t) {
            var n = t[0]
              , e = t[1]
              , r = t[2];
            return Math.abs((n[0] - r[0]) * (e[1] - n[1]) - (n[0] - e[0]) * (r[1] - n[1]))
        }
        function p(t) {
            for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r; )
                n = i,
                i = t[e],
                o += n[0] * i[1] - n[1] * i[0];
            return o / 2
        }
        function d(t) {
            return c(t, v.apply(this, arguments))
        }
        function v(t, n) {
            var e = {}
              , r = []
              , i = [];
            function o(t) {
                t.forEach((function(n) {
                    n.forEach((function(n) {
                        (e[n = n < 0 ? ~n : n] || (e[n] = [])).push(t)
                    }
                    ))
                }
                )),
                r.push(t)
            }
            function a(n) {
                return Math.abs(p(c(t, {
                    type: "Polygon",
                    arcs: [n]
                }).coordinates[0]))
            }
            return n.forEach((function(t) {
                "Polygon" === t.type ? o(t.arcs) : "MultiPolygon" === t.type && t.arcs.forEach(o)
            }
            )),
            r.forEach((function(t) {
                if (!t._) {
                    var n = []
                      , r = [t];
                    for (t._ = 1,
                    i.push(n); t = r.pop(); )
                        n.push(t),
                        t.forEach((function(t) {
                            t.forEach((function(t) {
                                e[t < 0 ? ~t : t].forEach((function(t) {
                                    t._ || (t._ = 1,
                                    r.push(t))
                                }
                                ))
                            }
                            ))
                        }
                        ))
                }
            }
            )),
            r.forEach((function(t) {
                delete t._
            }
            )),
            {
                type: "MultiPolygon",
                arcs: i.map((function(n) {
                    var r, i = [];
                    if (n.forEach((function(t) {
                        t.forEach((function(t) {
                            t.forEach((function(t) {
                                e[t < 0 ? ~t : t].length < 2 && i.push(t)
                            }
                            ))
                        }
                        ))
                    }
                    )),
                    (r = (i = s(t, i)).length) > 1)
                        for (var o, u, c = 1, l = a(i[0]); c < r; ++c)
                            (o = a(i[c])) > l && (u = i[0],
                            i[0] = i[c],
                            i[c] = u,
                            l = o);
                    return i
                }
                ))
            }
        }
        function g(t) {
            var n = {}
              , e = t.map((function() {
                return []
            }
            ));
            function r(t, e) {
                t.forEach((function(t) {
                    t < 0 && (t = ~t);
                    var r = n[t];
                    r ? r.push(e) : n[t] = [e]
                }
                ))
            }
            function i(t, n) {
                t.forEach((function(t) {
                    r(t, n)
                }
                ))
            }
            function a(t, n) {
                "GeometryCollection" === t.type ? t.geometries.forEach((function(t) {
                    a(t, n)
                }
                )) : t.type in u && u[t.type](t.arcs, n)
            }
            var u = {
                LineString: r,
                MultiLineString: i,
                Polygon: i,
                MultiPolygon: function(t, n) {
                    t.forEach((function(t) {
                        i(t, n)
                    }
                    ))
                }
            };
            for (var c in t.forEach(a),
            n)
                for (var s = n[c], l = s.length, f = 0; f < l; ++f)
                    for (var h = f + 1; h < l; ++h) {
                        var p, d = s[f], v = s[h];
                        (p = e[d])[c = o(p, v)] !== v && p.splice(c, 0, v),
                        (p = e[v])[c = o(p, d)] !== d && p.splice(c, 0, d)
                    }
            return e
        }
        function y(t, n) {
            return t[1][2] - n[1][2]
        }
        function _() {
            var t = {}
              , n = []
              , e = 0;
            function r(t, e) {
                for (; e > 0; ) {
                    var r = (e + 1 >> 1) - 1
                      , i = n[r];
                    if (y(t, i) >= 0)
                        break;
                    n[i._ = e] = i,
                    n[t._ = e = r] = t
                }
            }
            function i(t, r) {
                for (; ; ) {
                    var i = r + 1 << 1
                      , o = i - 1
                      , a = r
                      , u = n[a];
                    if (o < e && y(n[o], u) < 0 && (u = n[a = o]),
                    i < e && y(n[i], u) < 0 && (u = n[a = i]),
                    a === r)
                        break;
                    n[u._ = r] = u,
                    n[t._ = r = a] = t
                }
            }
            return t.push = function(t) {
                return r(n[t._ = e] = t, e++),
                e
            }
            ,
            t.pop = function() {
                if (!(e <= 0)) {
                    var t, r = n[0];
                    return --e > 0 && (t = n[e],
                    i(n[t._ = 0] = t, 0)),
                    r
                }
            }
            ,
            t.remove = function(t) {
                var o, a = t._;
                if (n[a] === t)
                    return a !== --e && (y(o = n[e], t) < 0 ? r : i)(n[o._ = a] = o, a),
                    a
            }
            ,
            t
        }
        function m(t, n) {
            var i = e(t.transform)
              , o = r(t.transform)
              , a = _();
            function u(t) {
                a.remove(t),
                t[1][2] = n(t),
                a.push(t)
            }
            return n || (n = h),
            t.arcs.forEach((function(t) {
                var e, r, c, s, l = [], f = 0;
                for (r = 0,
                c = t.length; r < c; ++r)
                    s = t[r],
                    i(t[r] = [s[0], s[1], 1 / 0], r);
                for (r = 1,
                c = t.length - 1; r < c; ++r)
                    (e = t.slice(r - 1, r + 2))[1][2] = n(e),
                    l.push(e),
                    a.push(e);
                for (r = 0,
                c = l.length; r < c; ++r)
                    (e = l[r]).previous = l[r - 1],
                    e.next = l[r + 1];
                for (; e = a.pop(); ) {
                    var h = e.previous
                      , p = e.next;
                    e[1][2] < f ? e[1][2] = f : f = e[1][2],
                    h && (h.next = p,
                    h[2] = e[2],
                    u(h)),
                    p && (p.previous = h,
                    p[0] = e[0],
                    u(p))
                }
                t.forEach(o)
            }
            )),
            t
        }
        var x = "1.6.26";
        t.version = x,
        t.mesh = l,
        t.meshArcs = f,
        t.merge = d,
        t.mergeArcs = v,
        t.feature = a,
        t.neighbors = g,
        t.presimplify = m
    }(n)
}
, function(t, n, e) {
    e(5),
    t.exports = e(4)
}
, function(t, n, e) {}
, function(t, n, e) {
    "use strict";
    e.r(n);
    var r = e(0);
    var i = e(2)
      , o = function() {
        return new a
    };
    function a() {
        this.reset()
    }
    a.prototype = {
        constructor: a,
        reset: function() {
            this.s = this.t = 0
        },
        add: function(t) {
            c(u, t, this.t),
            c(this, u.s, this.s),
            this.s ? this.t += u.t : this.s = u.t
        },
        valueOf: function() {
            return this.s
        }
    };
    var u = new a;
    function c(t, n, e) {
        var r = t.s = n + e
          , i = r - n
          , o = r - i;
        t.t = n - o + (e - i)
    }
    var s = 1e-6
      , l = Math.PI
      , f = l / 2
      , h = l / 4
      , p = 2 * l
      , d = 180 / l
      , v = l / 180
      , g = Math.abs
      , y = Math.atan
      , _ = Math.atan2
      , m = Math.cos
      , x = (Math.ceil,
    Math.exp)
      , b = (Math.floor,
    Math.log)
      , w = (Math.pow,
    Math.sin)
      , M = (Math.sign,
    Math.sqrt)
      , k = Math.tan;
    function E(t) {
        return t > 1 ? 0 : t < -1 ? l : Math.acos(t)
    }
    function S(t) {
        return t > 1 ? f : t < -1 ? -f : Math.asin(t)
    }
    function A() {}
    function N(t, n) {
        t && C.hasOwnProperty(t.type) && C[t.type](t, n)
    }
    var T = {
        Feature: function(t, n) {
            N(t.geometry, n)
        },
        FeatureCollection: function(t, n) {
            for (var e = t.features, r = -1, i = e.length; ++r < i; )
                N(e[r].geometry, n)
        }
    }
      , C = {
        Sphere: function(t, n) {
            n.sphere()
        },
        Point: function(t, n) {
            t = t.coordinates,
            n.point(t[0], t[1], t[2])
        },
        MultiPoint: function(t, n) {
            for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
                t = e[r],
                n.point(t[0], t[1], t[2])
        },
        LineString: function(t, n) {
            P(t.coordinates, n, 0)
        },
        MultiLineString: function(t, n) {
            for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
                P(e[r], n, 0)
        },
        Polygon: function(t, n) {
            z(t.coordinates, n)
        },
        MultiPolygon: function(t, n) {
            for (var e = t.coordinates, r = -1, i = e.length; ++r < i; )
                z(e[r], n)
        },
        GeometryCollection: function(t, n) {
            for (var e = t.geometries, r = -1, i = e.length; ++r < i; )
                N(e[r], n)
        }
    };
    function P(t, n, e) {
        var r, i = -1, o = t.length - e;
        for (n.lineStart(); ++i < o; )
            r = t[i],
            n.point(r[0], r[1], r[2]);
        n.lineEnd()
    }
    function z(t, n) {
        var e = -1
          , r = t.length;
        for (n.polygonStart(); ++e < r; )
            P(t[e], n, 1);
        n.polygonEnd()
    }
    var L = function(t, n) {
        t && T.hasOwnProperty(t.type) ? T[t.type](t, n) : N(t, n)
    };
    o(),
    o();
    function R(t) {
        return [_(t[1], t[0]), S(t[2])]
    }
    function q(t) {
        var n = t[0]
          , e = t[1]
          , r = m(e);
        return [r * m(n), r * w(n), w(e)]
    }
    function O(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
    }
    function D(t, n) {
        return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
    }
    function U(t, n) {
        t[0] += n[0],
        t[1] += n[1],
        t[2] += n[2]
    }
    function j(t, n) {
        return [t[0] * n, t[1] * n, t[2] * n]
    }
    function I(t) {
        var n = M(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
        t[0] /= n,
        t[1] /= n,
        t[2] /= n
    }
    o();
    var F = function(t, n) {
        function e(e, r) {
            return e = t(e, r),
            n(e[0], e[1])
        }
        return t.invert && n.invert && (e.invert = function(e, r) {
            return (e = n.invert(e, r)) && t.invert(e[0], e[1])
        }
        ),
        e
    };
    function Y(t, n) {
        return [t > l ? t - p : t < -l ? t + p : t, n]
    }
    function B(t, n, e) {
        return (t %= p) ? n || e ? F(X(t), G(n, e)) : X(t) : n || e ? G(n, e) : Y
    }
    function H(t) {
        return function(n, e) {
            return [(n += t) > l ? n - p : n < -l ? n + p : n, e]
        }
    }
    function X(t) {
        var n = H(t);
        return n.invert = H(-t),
        n
    }
    function G(t, n) {
        var e = m(t)
          , r = w(t)
          , i = m(n)
          , o = w(n);
        function a(t, n) {
            var a = m(n)
              , u = m(t) * a
              , c = w(t) * a
              , s = w(n)
              , l = s * e + u * r;
            return [_(c * i - l * o, u * e - s * r), S(l * i + c * o)]
        }
        return a.invert = function(t, n) {
            var a = m(n)
              , u = m(t) * a
              , c = w(t) * a
              , s = w(n)
              , l = s * i - c * o;
            return [_(c * i + s * o, u * e + l * r), S(l * e - u * r)]
        }
        ,
        a
    }
    Y.invert = Y;
    function V(t, n, e, r, i, o) {
        if (e) {
            var a = m(n)
              , u = w(n)
              , c = r * e;
            null == i ? (i = n + r * p,
            o = n - c / 2) : (i = W(a, i),
            o = W(a, o),
            (r > 0 ? i < o : i > o) && (i += r * p));
            for (var s, l = i; r > 0 ? l > o : l < o; l -= c)
                s = R([a, -u * m(l), -u * w(l)]),
                t.point(s[0], s[1])
        }
    }
    function W(t, n) {
        (n = q(n))[0] -= t,
        I(n);
        var e = E(-n[1]);
        return ((-n[2] < 0 ? -e : e) + p - s) % p
    }
    var $ = function() {
        var t, n = [];
        return {
            point: function(n, e) {
                t.push([n, e])
            },
            lineStart: function() {
                n.push(t = [])
            },
            lineEnd: A,
            rejoin: function() {
                n.length > 1 && n.push(n.pop().concat(n.shift()))
            },
            result: function() {
                var e = n;
                return n = [],
                t = null,
                e
            }
        }
    }
      , Z = function(t, n) {
        return g(t[0] - n[0]) < s && g(t[1] - n[1]) < s
    };
    function J(t, n, e, r) {
        this.x = t,
        this.z = n,
        this.o = e,
        this.e = r,
        this.v = !1,
        this.n = this.p = null
    }
    var Q = function(t, n, e, r, i) {
        var o, a, u = [], c = [];
        if (t.forEach((function(t) {
            if (!((n = t.length - 1) <= 0)) {
                var n, e, r = t[0], a = t[n];
                if (Z(r, a)) {
                    for (i.lineStart(),
                    o = 0; o < n; ++o)
                        i.point((r = t[o])[0], r[1]);
                    i.lineEnd()
                } else
                    u.push(e = new J(r,t,null,!0)),
                    c.push(e.o = new J(r,null,e,!1)),
                    u.push(e = new J(a,t,null,!1)),
                    c.push(e.o = new J(a,null,e,!0))
            }
        }
        )),
        u.length) {
            for (c.sort(n),
            K(u),
            K(c),
            o = 0,
            a = c.length; o < a; ++o)
                c[o].e = e = !e;
            for (var s, l, f = u[0]; ; ) {
                for (var h = f, p = !0; h.v; )
                    if ((h = h.n) === f)
                        return;
                s = h.z,
                i.lineStart();
                do {
                    if (h.v = h.o.v = !0,
                    h.e) {
                        if (p)
                            for (o = 0,
                            a = s.length; o < a; ++o)
                                i.point((l = s[o])[0], l[1]);
                        else
                            r(h.x, h.n.x, 1, i);
                        h = h.n
                    } else {
                        if (p)
                            for (s = h.p.z,
                            o = s.length - 1; o >= 0; --o)
                                i.point((l = s[o])[0], l[1]);
                        else
                            r(h.x, h.p.x, -1, i);
                        h = h.p
                    }
                    s = (h = h.o).z,
                    p = !p
                } while (!h.v);
                i.lineEnd()
            }
        }
    };
    function K(t) {
        if (n = t.length) {
            for (var n, e, r = 0, i = t[0]; ++r < n; )
                i.n = e = t[r],
                e.p = i,
                i = e;
            i.n = e = t[0],
            e.p = i
        }
    }
    var tt = e(1)
      , nt = 1e9
      , et = -nt;
    function rt(t, n, e, r) {
        function i(i, o) {
            return t <= i && i <= e && n <= o && o <= r
        }
        function o(i, o, u, s) {
            var l = 0
              , f = 0;
            if (null == i || (l = a(i, u)) !== (f = a(o, u)) || c(i, o) < 0 ^ u > 0)
                do {
                    s.point(0 === l || 3 === l ? t : e, l > 1 ? r : n)
                } while ((l = (l + u + 4) % 4) !== f);
            else
                s.point(o[0], o[1])
        }
        function a(r, i) {
            return g(r[0] - t) < s ? i > 0 ? 0 : 3 : g(r[0] - e) < s ? i > 0 ? 2 : 1 : g(r[1] - n) < s ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
        }
        function u(t, n) {
            return c(t.x, n.x)
        }
        function c(t, n) {
            var e = a(t, 1)
              , r = a(n, 1);
            return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
        }
        return function(a) {
            var c, s, l, f, h, p, d, v, g, y, _, m = a, x = $(), b = {
                point: w,
                lineStart: function() {
                    b.point = M,
                    s && s.push(l = []);
                    y = !0,
                    g = !1,
                    d = v = NaN
                },
                lineEnd: function() {
                    c && (M(f, h),
                    p && g && x.rejoin(),
                    c.push(x.result()));
                    b.point = w,
                    g && m.lineEnd()
                },
                polygonStart: function() {
                    m = x,
                    c = [],
                    s = [],
                    _ = !0
                },
                polygonEnd: function() {
                    var n = function() {
                        for (var n = 0, e = 0, i = s.length; e < i; ++e)
                            for (var o, a, u = s[e], c = 1, l = u.length, f = u[0], h = f[0], p = f[1]; c < l; ++c)
                                o = h,
                                a = p,
                                h = (f = u[c])[0],
                                p = f[1],
                                a <= r ? p > r && (h - o) * (r - a) > (p - a) * (t - o) && ++n : p <= r && (h - o) * (r - a) < (p - a) * (t - o) && --n;
                        return n
                    }()
                      , e = _ && n
                      , i = (c = Object(tt.merge)(c)).length;
                    (e || i) && (a.polygonStart(),
                    e && (a.lineStart(),
                    o(null, null, 1, a),
                    a.lineEnd()),
                    i && Q(c, u, n, o, a),
                    a.polygonEnd());
                    m = a,
                    c = s = l = null
                }
            };
            function w(t, n) {
                i(t, n) && m.point(t, n)
            }
            function M(o, a) {
                var u = i(o, a);
                if (s && l.push([o, a]),
                y)
                    f = o,
                    h = a,
                    p = u,
                    y = !1,
                    u && (m.lineStart(),
                    m.point(o, a));
                else if (u && g)
                    m.point(o, a);
                else {
                    var c = [d = Math.max(et, Math.min(nt, d)), v = Math.max(et, Math.min(nt, v))]
                      , x = [o = Math.max(et, Math.min(nt, o)), a = Math.max(et, Math.min(nt, a))];
                    !function(t, n, e, r, i, o) {
                        var a, u = t[0], c = t[1], s = 0, l = 1, f = n[0] - u, h = n[1] - c;
                        if (a = e - u,
                        f || !(a > 0)) {
                            if (a /= f,
                            f < 0) {
                                if (a < s)
                                    return;
                                a < l && (l = a)
                            } else if (f > 0) {
                                if (a > l)
                                    return;
                                a > s && (s = a)
                            }
                            if (a = i - u,
                            f || !(a < 0)) {
                                if (a /= f,
                                f < 0) {
                                    if (a > l)
                                        return;
                                    a > s && (s = a)
                                } else if (f > 0) {
                                    if (a < s)
                                        return;
                                    a < l && (l = a)
                                }
                                if (a = r - c,
                                h || !(a > 0)) {
                                    if (a /= h,
                                    h < 0) {
                                        if (a < s)
                                            return;
                                        a < l && (l = a)
                                    } else if (h > 0) {
                                        if (a > l)
                                            return;
                                        a > s && (s = a)
                                    }
                                    if (a = o - c,
                                    h || !(a < 0)) {
                                        if (a /= h,
                                        h < 0) {
                                            if (a > l)
                                                return;
                                            a > s && (s = a)
                                        } else if (h > 0) {
                                            if (a < s)
                                                return;
                                            a < l && (l = a)
                                        }
                                        return s > 0 && (t[0] = u + s * f,
                                        t[1] = c + s * h),
                                        l < 1 && (n[0] = u + l * f,
                                        n[1] = c + l * h),
                                        !0
                                    }
                                }
                            }
                        }
                    }(c, x, t, n, e, r) ? u && (m.lineStart(),
                    m.point(o, a),
                    _ = !1) : (g || (m.lineStart(),
                    m.point(c[0], c[1])),
                    m.point(x[0], x[1]),
                    u || m.lineEnd(),
                    _ = !1)
                }
                d = o,
                v = a,
                g = u
            }
            return b
        }
    }
    o();
    var it = function(t) {
        return t
    };
    o(),
    o();
    var ot = 1 / 0
      , at = ot
      , ut = -ot
      , ct = ut;
    var st = {
        point: function(t, n) {
            t < ot && (ot = t);
            t > ut && (ut = t);
            n < at && (at = n);
            n > ct && (ct = n)
        },
        lineStart: A,
        lineEnd: A,
        polygonStart: A,
        polygonEnd: A,
        result: function() {
            var t = [[ot, at], [ut, ct]];
            return ut = ct = -(at = ot = 1 / 0),
            t
        }
    };
    function lt(t) {
        this._context = t
    }
    function ft() {
        this._string = []
    }
    function ht(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }
    lt.prototype = {
        _radius: 4.5,
        pointRadius: function(t) {
            return this._radius = t,
            this
        },
        polygonStart: function() {
            this._line = 0
        },
        polygonEnd: function() {
            this._line = NaN
        },
        lineStart: function() {
            this._point = 0
        },
        lineEnd: function() {
            0 === this._line && this._context.closePath(),
            this._point = NaN
        },
        point: function(t, n) {
            switch (this._point) {
            case 0:
                this._context.moveTo(t, n),
                this._point = 1;
                break;
            case 1:
                this._context.lineTo(t, n);
                break;
            default:
                this._context.moveTo(t + this._radius, n),
                this._context.arc(t, n, this._radius, 0, p)
            }
        },
        result: A
    },
    ft.prototype = {
        _circle: ht(4.5),
        pointRadius: function(t) {
            return this._circle = ht(t),
            this
        },
        polygonStart: function() {
            this._line = 0
        },
        polygonEnd: function() {
            this._line = NaN
        },
        lineStart: function() {
            this._point = 0
        },
        lineEnd: function() {
            0 === this._line && this._string.push("Z"),
            this._point = NaN
        },
        point: function(t, n) {
            switch (this._point) {
            case 0:
                this._string.push("M", t, ",", n),
                this._point = 1;
                break;
            case 1:
                this._string.push("L", t, ",", n);
                break;
            default:
                this._string.push("M", t, ",", n, this._circle)
            }
        },
        result: function() {
            if (this._string.length) {
                var t = this._string.join("");
                return this._string = [],
                t
            }
        }
    };
    var pt = o()
      , dt = function(t, n, e, r) {
        return function(i, o) {
            var a, u, c, f = n(o), d = i.invert(r[0], r[1]), v = $(), g = n(v), y = !1, x = {
                point: b,
                lineStart: k,
                lineEnd: E,
                polygonStart: function() {
                    x.point = A,
                    x.lineStart = N,
                    x.lineEnd = T,
                    u = [],
                    a = []
                },
                polygonEnd: function() {
                    x.point = b,
                    x.lineStart = k,
                    x.lineEnd = E,
                    u = Object(tt.merge)(u);
                    var t = function(t, n) {
                        var e = n[0]
                          , r = n[1]
                          , i = [w(e), -m(e), 0]
                          , o = 0
                          , a = 0;
                        pt.reset();
                        for (var u = 0, c = t.length; u < c; ++u)
                            if (d = (f = t[u]).length)
                                for (var f, d, v = f[d - 1], g = v[0], y = v[1] / 2 + h, x = w(y), b = m(y), M = 0; M < d; ++M,
                                g = E,
                                x = N,
                                b = T,
                                v = k) {
                                    var k = f[M]
                                      , E = k[0]
                                      , A = k[1] / 2 + h
                                      , N = w(A)
                                      , T = m(A)
                                      , C = E - g
                                      , P = C >= 0 ? 1 : -1
                                      , z = P * C
                                      , L = z > l
                                      , R = x * N;
                                    if (pt.add(_(R * P * w(z), b * T + R * m(z))),
                                    o += L ? C + P * p : C,
                                    L ^ g >= e ^ E >= e) {
                                        var O = D(q(v), q(k));
                                        I(O);
                                        var U = D(i, O);
                                        I(U);
                                        var j = (L ^ C >= 0 ? -1 : 1) * S(U[2]);
                                        (r > j || r === j && (O[0] || O[1])) && (a += L ^ C >= 0 ? 1 : -1)
                                    }
                                }
                        return (o < -1e-6 || o < s && pt < -1e-6) ^ 1 & a
                    }(a, d);
                    u.length ? (y || (o.polygonStart(),
                    y = !0),
                    Q(u, gt, t, e, o)) : t && (y || (o.polygonStart(),
                    y = !0),
                    o.lineStart(),
                    e(null, null, 1, o),
                    o.lineEnd()),
                    y && (o.polygonEnd(),
                    y = !1),
                    u = a = null
                },
                sphere: function() {
                    o.polygonStart(),
                    o.lineStart(),
                    e(null, null, 1, o),
                    o.lineEnd(),
                    o.polygonEnd()
                }
            };
            function b(n, e) {
                var r = i(n, e);
                t(n = r[0], e = r[1]) && o.point(n, e)
            }
            function M(t, n) {
                var e = i(t, n);
                f.point(e[0], e[1])
            }
            function k() {
                x.point = M,
                f.lineStart()
            }
            function E() {
                x.point = b,
                f.lineEnd()
            }
            function A(t, n) {
                c.push([t, n]);
                var e = i(t, n);
                g.point(e[0], e[1])
            }
            function N() {
                g.lineStart(),
                c = []
            }
            function T() {
                A(c[0][0], c[0][1]),
                g.lineEnd();
                var t, n, e, r, i = g.clean(), s = v.result(), l = s.length;
                if (c.pop(),
                a.push(c),
                c = null,
                l)
                    if (1 & i) {
                        if ((n = (e = s[0]).length - 1) > 0) {
                            for (y || (o.polygonStart(),
                            y = !0),
                            o.lineStart(),
                            t = 0; t < n; ++t)
                                o.point((r = e[t])[0], r[1]);
                            o.lineEnd()
                        }
                    } else
                        l > 1 && 2 & i && s.push(s.pop().concat(s.shift())),
                        u.push(s.filter(vt))
            }
            return x
        }
    };
    function vt(t) {
        return t.length > 1
    }
    function gt(t, n) {
        return ((t = t.x)[0] < 0 ? t[1] - f - s : f - t[1]) - ((n = n.x)[0] < 0 ? n[1] - f - s : f - n[1])
    }
    var yt = dt((function() {
        return !0
    }
    ), (function(t) {
        var n, e = NaN, r = NaN, i = NaN;
        return {
            lineStart: function() {
                t.lineStart(),
                n = 1
            },
            point: function(o, a) {
                var u = o > 0 ? l : -l
                  , c = g(o - e);
                g(c - l) < s ? (t.point(e, r = (r + a) / 2 > 0 ? f : -f),
                t.point(i, r),
                t.lineEnd(),
                t.lineStart(),
                t.point(u, r),
                t.point(o, r),
                n = 0) : i !== u && c >= l && (g(e - i) < s && (e -= i * s),
                g(o - u) < s && (o -= u * s),
                r = function(t, n, e, r) {
                    var i, o, a = w(t - e);
                    return g(a) > s ? y((w(n) * (o = m(r)) * w(e) - w(r) * (i = m(n)) * w(t)) / (i * o * a)) : (n + r) / 2
                }(e, r, o, a),
                t.point(i, r),
                t.lineEnd(),
                t.lineStart(),
                t.point(u, r),
                n = 0),
                t.point(e = o, r = a),
                i = u
            },
            lineEnd: function() {
                t.lineEnd(),
                e = r = NaN
            },
            clean: function() {
                return 2 - n
            }
        }
    }
    ), (function(t, n, e, r) {
        var i;
        if (null == t)
            i = e * f,
            r.point(-l, i),
            r.point(0, i),
            r.point(l, i),
            r.point(l, 0),
            r.point(l, -i),
            r.point(0, -i),
            r.point(-l, -i),
            r.point(-l, 0),
            r.point(-l, i);
        else if (g(t[0] - n[0]) > s) {
            var o = t[0] < n[0] ? l : -l;
            i = e * o / 2,
            r.point(-o, i),
            r.point(0, i),
            r.point(o, i)
        } else
            r.point(n[0], n[1])
    }
    ), [-l, -f]);
    var _t = function(t, n) {
        var e = m(t)
          , r = e > 0
          , i = g(e) > s;
        function o(t, n) {
            return m(t) * m(n) > e
        }
        function a(t, n, r) {
            var i = [1, 0, 0]
              , o = D(q(t), q(n))
              , a = O(o, o)
              , u = o[0]
              , c = a - u * u;
            if (!c)
                return !r && t;
            var f = e * a / c
              , h = -e * u / c
              , p = D(i, o)
              , d = j(i, f);
            U(d, j(o, h));
            var v = p
              , y = O(d, v)
              , _ = O(v, v)
              , m = y * y - _ * (O(d, d) - 1);
            if (!(m < 0)) {
                var x = M(m)
                  , b = j(v, (-y - x) / _);
                if (U(b, d),
                b = R(b),
                !r)
                    return b;
                var w, k = t[0], E = n[0], S = t[1], A = n[1];
                E < k && (w = k,
                k = E,
                E = w);
                var N = E - k
                  , T = g(N - l) < s;
                if (!T && A < S && (w = S,
                S = A,
                A = w),
                T || N < s ? T ? S + A > 0 ^ b[1] < (g(b[0] - k) < s ? S : A) : S <= b[1] && b[1] <= A : N > l ^ (k <= b[0] && b[0] <= E)) {
                    var C = j(v, (-y + x) / _);
                    return U(C, d),
                    [b, R(C)]
                }
            }
        }
        function u(n, e) {
            var i = r ? t : l - t
              , o = 0;
            return n < -i ? o |= 1 : n > i && (o |= 2),
            e < -i ? o |= 4 : e > i && (o |= 8),
            o
        }
        return dt(o, (function(t) {
            var n, e, c, f, h;
            return {
                lineStart: function() {
                    f = c = !1,
                    h = 1
                },
                point: function(p, d) {
                    var v, g = [p, d], y = o(p, d), _ = r ? y ? 0 : u(p, d) : y ? u(p + (p < 0 ? l : -l), d) : 0;
                    if (!n && (f = c = y) && t.lineStart(),
                    y !== c && (v = a(n, g),
                    (Z(n, v) || Z(g, v)) && (g[0] += s,
                    g[1] += s,
                    y = o(g[0], g[1]))),
                    y !== c)
                        h = 0,
                        y ? (t.lineStart(),
                        v = a(g, n),
                        t.point(v[0], v[1])) : (v = a(n, g),
                        t.point(v[0], v[1]),
                        t.lineEnd()),
                        n = v;
                    else if (i && n && r ^ y) {
                        var m;
                        _ & e || !(m = a(g, n, !0)) || (h = 0,
                        r ? (t.lineStart(),
                        t.point(m[0][0], m[0][1]),
                        t.point(m[1][0], m[1][1]),
                        t.lineEnd()) : (t.point(m[1][0], m[1][1]),
                        t.lineEnd(),
                        t.lineStart(),
                        t.point(m[0][0], m[0][1])))
                    }
                    !y || n && Z(n, g) || t.point(g[0], g[1]),
                    n = g,
                    c = y,
                    e = _
                },
                lineEnd: function() {
                    c && t.lineEnd(),
                    n = null
                },
                clean: function() {
                    return h | (f && c) << 1
                }
            }
        }
        ), (function(e, r, i, o) {
            V(o, t, n, i, e, r)
        }
        ), r ? [0, -t] : [-l, t - l])
    };
    function mt(t) {
        function n() {}
        var e = n.prototype = Object.create(xt.prototype);
        for (var r in t)
            e[r] = t[r];
        return function(t) {
            var e = new n;
            return e.stream = t,
            e
        }
    }
    function xt() {}
    function bt(t, n, e) {
        var r = n[1][0] - n[0][0]
          , i = n[1][1] - n[0][1]
          , o = t.clipExtent && t.clipExtent();
        t.scale(150).translate([0, 0]),
        null != o && t.clipExtent(null),
        L(e, t.stream(st));
        var a = st.result()
          , u = Math.min(r / (a[1][0] - a[0][0]), i / (a[1][1] - a[0][1]))
          , c = +n[0][0] + (r - u * (a[1][0] + a[0][0])) / 2
          , s = +n[0][1] + (i - u * (a[1][1] + a[0][1])) / 2;
        return null != o && t.clipExtent(o),
        t.scale(150 * u).translate([c, s])
    }
    function wt(t) {
        return function(n, e) {
            return bt(t, [[0, 0], n], e)
        }
    }
    function Mt(t) {
        return function(n, e) {
            return bt(t, n, e)
        }
    }
    xt.prototype = {
        point: function(t, n) {
            this.stream.point(t, n)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    };
    var kt = m(30 * v)
      , Et = function(t, n) {
        return +n ? function(t, n) {
            function e(r, i, o, a, u, c, l, f, h, p, d, v, y, m) {
                var x = l - r
                  , b = f - i
                  , w = x * x + b * b;
                if (w > 4 * n && y--) {
                    var k = a + p
                      , E = u + d
                      , A = c + v
                      , N = M(k * k + E * E + A * A)
                      , T = S(A /= N)
                      , C = g(g(A) - 1) < s || g(o - h) < s ? (o + h) / 2 : _(E, k)
                      , P = t(C, T)
                      , z = P[0]
                      , L = P[1]
                      , R = z - r
                      , q = L - i
                      , O = b * R - x * q;
                    (O * O / w > n || g((x * R + b * q) / w - .5) > .3 || a * p + u * d + c * v < kt) && (e(r, i, o, a, u, c, z, L, C, k /= N, E /= N, A, y, m),
                    m.point(z, L),
                    e(z, L, C, k, E, A, l, f, h, p, d, v, y, m))
                }
            }
            return function(n) {
                var r, i, o, a, u, c, s, l, f, h, p, d, v = {
                    point: g,
                    lineStart: y,
                    lineEnd: m,
                    polygonStart: function() {
                        n.polygonStart(),
                        v.lineStart = x
                    },
                    polygonEnd: function() {
                        n.polygonEnd(),
                        v.lineStart = y
                    }
                };
                function g(e, r) {
                    e = t(e, r),
                    n.point(e[0], e[1])
                }
                function y() {
                    l = NaN,
                    v.point = _,
                    n.lineStart()
                }
                function _(r, i) {
                    var o = q([r, i])
                      , a = t(r, i);
                    e(l, f, s, h, p, d, l = a[0], f = a[1], s = r, h = o[0], p = o[1], d = o[2], 16, n),
                    n.point(l, f)
                }
                function m() {
                    v.point = g,
                    n.lineEnd()
                }
                function x() {
                    y(),
                    v.point = b,
                    v.lineEnd = w
                }
                function b(t, n) {
                    _(r = t, n),
                    i = l,
                    o = f,
                    a = h,
                    u = p,
                    c = d,
                    v.point = _
                }
                function w() {
                    e(l, f, s, h, p, d, i, o, r, a, u, c, 16, n),
                    v.lineEnd = m,
                    m()
                }
                return v
            }
        }(t, n) : function(t) {
            return mt({
                point: function(n, e) {
                    n = t(n, e),
                    this.stream.point(n[0], n[1])
                }
            })
        }(t)
    };
    var St = mt({
        point: function(t, n) {
            this.stream.point(t * v, n * v)
        }
    });
    function At(t) {
        return Nt((function() {
            return t
        }
        ))()
    }
    function Nt(t) {
        var n, e, r, i, o, a, u, c, s, l, f = 150, h = 480, p = 250, g = 0, y = 0, _ = 0, m = 0, x = 0, b = null, w = yt, k = null, E = it, S = .5, A = Et(C, S);
        function N(t) {
            return [(t = o(t[0] * v, t[1] * v))[0] * f + e, r - t[1] * f]
        }
        function T(t) {
            return (t = o.invert((t[0] - e) / f, (r - t[1]) / f)) && [t[0] * d, t[1] * d]
        }
        function C(t, i) {
            return [(t = n(t, i))[0] * f + e, r - t[1] * f]
        }
        function P() {
            o = F(i = B(_, m, x), n);
            var t = n(g, y);
            return e = h - t[0] * f,
            r = p + t[1] * f,
            z()
        }
        function z() {
            return s = l = null,
            N
        }
        return N.stream = function(t) {
            return s && l === t ? s : s = St(w(i, A(E(l = t))))
        }
        ,
        N.clipAngle = function(t) {
            return arguments.length ? (w = +t ? _t(b = t * v, 6 * v) : (b = null,
            yt),
            z()) : b * d
        }
        ,
        N.clipExtent = function(t) {
            return arguments.length ? (E = null == t ? (k = a = u = c = null,
            it) : rt(k = +t[0][0], a = +t[0][1], u = +t[1][0], c = +t[1][1]),
            z()) : null == k ? null : [[k, a], [u, c]]
        }
        ,
        N.scale = function(t) {
            return arguments.length ? (f = +t,
            P()) : f
        }
        ,
        N.translate = function(t) {
            return arguments.length ? (h = +t[0],
            p = +t[1],
            P()) : [h, p]
        }
        ,
        N.center = function(t) {
            return arguments.length ? (g = t[0] % 360 * v,
            y = t[1] % 360 * v,
            P()) : [g * d, y * d]
        }
        ,
        N.rotate = function(t) {
            return arguments.length ? (_ = t[0] % 360 * v,
            m = t[1] % 360 * v,
            x = t.length > 2 ? t[2] % 360 * v : 0,
            P()) : [_ * d, m * d, x * d]
        }
        ,
        N.precision = function(t) {
            return arguments.length ? (A = Et(C, S = t * t),
            z()) : M(S)
        }
        ,
        N.fitExtent = Mt(N),
        N.fitSize = wt(N),
        function() {
            return n = t.apply(this, arguments),
            N.invert = n.invert && T,
            P()
        }
    }
    function Tt(t) {
        return function(n, e) {
            var r = m(n)
              , i = m(e)
              , o = t(r * i);
            return [o * i * w(n), o * w(e)]
        }
    }
    function Ct(t) {
        return function(n, e) {
            var r = M(n * n + e * e)
              , i = t(r)
              , o = w(i)
              , a = m(i);
            return [_(n * o, r * a), S(r && e * o / r)]
        }
    }
    var Pt = Tt((function(t) {
        return M(2 / (1 + t))
    }
    ));
    Pt.invert = Ct((function(t) {
        return 2 * S(t / 2)
    }
    ));
    var zt = Tt((function(t) {
        return (t = E(t)) && t / w(t)
    }
    ));
    zt.invert = Ct((function(t) {
        return t
    }
    ));
    function Lt(t, n) {
        return [t, b(k((f + n) / 2))]
    }
    Lt.invert = function(t, n) {
        return [t, 2 * y(x(n)) - f]
    }
    ;
    function Rt(t, n) {
        return [t, n]
    }
    Rt.invert = Rt;
    function qt(t, n) {
        var e = m(n)
          , r = m(t) * e;
        return [e * w(t) / r, w(n) / r]
    }
    qt.invert = Ct(y);
    function Ot(t, n) {
        return [m(n) * w(t), w(n)]
    }
    Ot.invert = Ct(S);
    function Dt(t, n) {
        var e = m(n)
          , r = 1 + m(t) * e;
        return [e * w(t) / r, w(n) / r]
    }
    Dt.invert = Ct((function(t) {
        return 2 * y(t)
    }
    ));
    function Ut(t, n) {
        return [b(k((f + n) / 2)), -t]
    }
    Ut.invert = function(t, n) {
        return [-n, 2 * y(x(t)) - f]
    }
    ;
    var jt = Math.abs
      , It = Math.atan
      , Ft = Math.atan2
      , Yt = (Math.ceil,
    Math.cos)
      , Bt = Math.exp
      , Ht = Math.floor
      , Xt = Math.log
      , Gt = Math.max
      , Vt = Math.min
      , Wt = Math.pow
      , $t = (Math.round,
    Math.sign || function(t) {
        return t > 0 ? 1 : t < 0 ? -1 : 0
    }
    )
      , Zt = Math.sin
      , Jt = Math.tan
      , Qt = 1e-6
      , Kt = 1e-12
      , tn = Math.PI
      , nn = tn / 2
      , en = tn / 4
      , rn = Math.SQRT1_2
      , on = hn(2)
      , an = hn(tn)
      , un = 2 * tn
      , cn = 180 / tn
      , sn = tn / 180;
    function ln(t) {
        return t > 1 ? nn : t < -1 ? -nn : Math.asin(t)
    }
    function fn(t) {
        return t > 1 ? 0 : t < -1 ? tn : Math.acos(t)
    }
    function hn(t) {
        return t > 0 ? Math.sqrt(t) : 0
    }
    function pn(t) {
        return (Bt(t) - Bt(-t)) / 2
    }
    function dn(t) {
        return (Bt(t) + Bt(-t)) / 2
    }
    function vn(t, n) {
        var e = Yt(n)
          , r = function(t) {
            return t ? t / Math.sin(t) : 1
        }(fn(e * Yt(t /= 2)));
        return [2 * e * Zt(t) * r, Zt(n) * r]
    }
    vn.invert = function(t, n) {
        if (!(t * t + 4 * n * n > tn * tn + Qt)) {
            var e = t
              , r = n
              , i = 25;
            do {
                var o, a = Zt(e), u = Zt(e / 2), c = Yt(e / 2), s = Zt(r), l = Yt(r), f = Zt(2 * r), h = s * s, p = l * l, d = u * u, v = 1 - p * c * c, g = v ? fn(l * c) * hn(o = 1 / v) : o = 0, y = 2 * g * l * u - t, _ = g * s - n, m = o * (p * d + g * l * c * h), x = o * (.5 * a * f - 2 * g * s * u), b = .25 * o * (f * u - g * s * p * a), w = o * (h * c + g * d * l), M = x * b - w * m;
                if (!M)
                    break;
                var k = (_ * x - y * w) / M
                  , E = (y * b - _ * m) / M;
                e -= k,
                r -= E
            } while ((jt(k) > Qt || jt(E) > Qt) && --i > 0);
            return [e, r]
        }
    }
    ;
    function gn(t, n) {
        var e = Jt(n / 2)
          , r = hn(1 - e * e)
          , i = 1 + r * Yt(t /= 2)
          , o = Zt(t) * r / i
          , a = e / i
          , u = o * o
          , c = a * a;
        return [4 / 3 * o * (3 + u - 3 * c), 4 / 3 * a * (3 + 3 * u - c)]
    }
    gn.invert = function(t, n) {
        if (n *= 3 / 8,
        !(t *= 3 / 8) && jt(n) > 1)
            return null;
        var e = 1 + t * t + n * n
          , r = hn((e - hn(e * e - 4 * n * n)) / 2)
          , i = ln(r) / 3
          , o = r ? function(t) {
            return Xt(t + hn(t * t - 1))
        }(jt(n / r)) / 3 : function(t) {
            return Xt(t + hn(t * t + 1))
        }(jt(t)) / 3
          , a = Yt(i)
          , u = dn(o)
          , c = u * u - a * a;
        return [2 * $t(t) * Ft(pn(o) * a, .25 - c), 2 * $t(n) * Ft(u * Zt(i), .25 + c)]
    }
    ;
    var yn = hn(8)
      , _n = Xt(1 + on);
    function mn(t, n) {
        var e = jt(n);
        return e < en ? [t, Xt(Jt(en + n / 2))] : [t * Yt(e) * (2 * on - 1 / Zt(e)), $t(n) * (2 * on * (e - en) - Xt(Jt(e / 2)))]
    }
    mn.invert = function(t, n) {
        if ((r = jt(n)) < _n)
            return [t, 2 * It(Bt(n)) - nn];
        var e, r, i = en, o = 25;
        do {
            var a = Yt(i / 2)
              , u = Jt(i / 2);
            i -= e = (yn * (i - en) - Xt(u) - r) / (yn - a * a / (2 * u))
        } while (jt(e) > Kt && --o > 0);
        return [t / (Yt(i) * (yn - 1 / Zt(i))), $t(n) * i]
    }
    ;
    function xn(t, n) {
        var e, r = t * Zt(n), i = 30;
        do {
            n -= e = (n + Zt(n) - r) / (1 + Yt(n))
        } while (jt(e) > Qt && --i > 0);
        return n / 2
    }
    function bn(t, n, e) {
        function r(r, i) {
            return [t * r * Yt(i = xn(e, i)), n * Zt(i)]
        }
        return r.invert = function(r, i) {
            return i = ln(i / n),
            [r / (t * Yt(i)), ln((2 * i + Zt(2 * i)) / e)]
        }
        ,
        r
    }
    var wn = bn(on / nn, on, tn)
      , Mn = 2.00276
      , kn = 1.11072;
    function En(t, n) {
        var e = xn(tn, n);
        return [Mn * t / (1 / Yt(n) + kn / Yt(e)), (n + on * Zt(e)) / Mn]
    }
    En.invert = function(t, n) {
        var e, r, i = Mn * n, o = n < 0 ? -en : en, a = 25;
        do {
            r = i - on * Zt(o),
            o -= e = (Zt(2 * o) + 2 * o - tn * Zt(r)) / (2 * Yt(2 * o) + 2 + tn * Yt(r) * on * Yt(o))
        } while (jt(e) > Qt && --a > 0);
        return r = i - on * Zt(o),
        [t * (1 / Yt(r) + kn / Yt(o)) / Mn, r]
    }
    ;
    function Sn(t, n) {
        return [t * Yt(n), n]
    }
    Sn.invert = function(t, n) {
        return [t / Yt(n), n]
    }
    ;
    bn(1, 4 / tn, tn);
    function An(t, n) {
        var e = hn(1 - Zt(n));
        return [2 / an * t * e, an * (1 - e)]
    }
    An.invert = function(t, n) {
        var e = (e = n / an - 1) * e;
        return [e > 0 ? t * hn(tn / e) / 2 : 0, ln(1 - e)]
    }
    ;
    var Nn = hn(3);
    function Tn(t, n) {
        return [Nn * t * (2 * Yt(2 * n / 3) - 1) / an, Nn * an * Zt(n / 3)]
    }
    Tn.invert = function(t, n) {
        var e = 3 * ln(n / (Nn * an));
        return [an * t / (Nn * (2 * Yt(2 * e / 3) - 1)), e]
    }
    ;
    function Cn(t) {
        var n = Yt(t);
        function e(t, e) {
            return [t * n, Zt(e) / n]
        }
        return e.invert = function(t, e) {
            return [t / n, ln(e * n)]
        }
        ,
        e
    }
    function Pn(t, n) {
        var e = hn(8 / (3 * tn));
        return [e * t * (1 - jt(n) / tn), e * n]
    }
    Pn.invert = function(t, n) {
        var e = hn(8 / (3 * tn))
          , r = n / e;
        return [t / (e * (1 - jt(r) / tn)), r]
    }
    ;
    function zn(t, n) {
        var e = hn(4 - 3 * Zt(jt(n)));
        return [2 / hn(6 * tn) * t * e, $t(n) * hn(2 * tn / 3) * (2 - e)]
    }
    zn.invert = function(t, n) {
        var e = 2 - jt(n) / hn(2 * tn / 3);
        return [t * hn(6 * tn) / (2 * e), $t(n) * ln((4 - e * e) / 3)]
    }
    ;
    function Ln(t, n) {
        var e = hn(tn * (4 + tn));
        return [2 / e * t * (1 + hn(1 - 4 * n * n / (tn * tn))), 4 / e * n]
    }
    Ln.invert = function(t, n) {
        var e = hn(tn * (4 + tn)) / 2;
        return [t * e / (1 + hn(1 - n * n * (4 + tn) / (4 * tn))), n * e / 2]
    }
    ;
    function Rn(t, n) {
        var e = (2 + nn) * Zt(n);
        n /= 2;
        for (var r = 0, i = 1 / 0; r < 10 && jt(i) > Qt; r++) {
            var o = Yt(n);
            n -= i = (n + Zt(n) * (o + 2) - e) / (2 * o * (1 + o))
        }
        return [2 / hn(tn * (4 + tn)) * t * (1 + Yt(n)), 2 * hn(tn / (4 + tn)) * Zt(n)]
    }
    Rn.invert = function(t, n) {
        var e = n * hn((4 + tn) / tn) / 2
          , r = ln(e)
          , i = Yt(r);
        return [t / (2 / hn(tn * (4 + tn)) * (1 + i)), ln((r + e * (i + 2)) / (2 + nn))]
    }
    ;
    function qn(t, n) {
        return [t * (1 + Yt(n)) / hn(2 + tn), 2 * n / hn(2 + tn)]
    }
    qn.invert = function(t, n) {
        var e = hn(2 + tn)
          , r = n * e / 2;
        return [e * t / (1 + Yt(r)), r]
    }
    ;
    function On(t, n) {
        for (var e = (1 + nn) * Zt(n), r = 0, i = 1 / 0; r < 10 && jt(i) > Qt; r++)
            n -= i = (n + Zt(n) - e) / (1 + Yt(n));
        return e = hn(2 + tn),
        [t * (1 + Yt(n)) / e, 2 * n / e]
    }
    On.invert = function(t, n) {
        var e = 1 + nn
          , r = hn(e / 2);
        return [2 * t * r / (1 + Yt(n *= r)), ln((n + Zt(n)) / e)]
    }
    ;
    var Dn = 3 + 2 * on;
    function Un(t, n) {
        var e = Zt(t /= 2)
          , r = Yt(t)
          , i = hn(Yt(n))
          , o = Yt(n /= 2)
          , a = Zt(n) / (o + on * r * i)
          , u = hn(2 / (1 + a * a))
          , c = hn((on * o + (r + e) * i) / (on * o + (r - e) * i));
        return [Dn * (u * (c - 1 / c) - 2 * Xt(c)), Dn * (u * a * (c + 1 / c) - 2 * It(a))]
    }
    Un.invert = function(t, n) {
        if (!(e = gn.invert(t / 1.2, 1.065 * n)))
            return null;
        var e, r = e[0], i = e[1], o = 20;
        t /= Dn,
        n /= Dn;
        do {
            var a = r / 2
              , u = i / 2
              , c = Zt(a)
              , s = Yt(a)
              , l = Zt(u)
              , f = Yt(u)
              , h = Yt(i)
              , p = hn(h)
              , d = l / (f + on * s * p)
              , v = d * d
              , g = hn(2 / (1 + v))
              , y = (on * f + (s + c) * p) / (on * f + (s - c) * p)
              , _ = hn(y)
              , m = _ - 1 / _
              , x = _ + 1 / _
              , b = g * m - 2 * Xt(_) - t
              , w = g * d * x - 2 * It(d) - n
              , M = l && rn * p * c * v / l
              , k = (on * s * f + p) / (2 * (f + on * s * p) * (f + on * s * p) * p)
              , E = -.5 * d * g * g * g
              , S = E * M
              , A = E * k
              , N = (N = 2 * f + on * p * (s - c)) * N * _
              , T = (on * s * f * p + h) / N
              , C = -on * c * l / (p * N)
              , P = m * S - 2 * T / _ + g * (T + T / y)
              , z = m * A - 2 * C / _ + g * (C + C / y)
              , L = d * x * S - 2 * M / (1 + v) + g * x * M + g * d * (T - T / y)
              , R = d * x * A - 2 * k / (1 + v) + g * x * k + g * d * (C - C / y)
              , q = z * L - R * P;
            if (!q)
                break;
            var O = (w * z - b * R) / q
              , D = (b * L - w * P) / q;
            r -= O,
            i = Gt(-nn, Vt(nn, i - D))
        } while ((jt(O) > Qt || jt(D) > Qt) && --o > 0);
        return jt(jt(i) - nn) < Qt ? [0, i] : o && [r, i]
    }
    ;
    var jn = Yt(35 * sn);
    function In(t, n) {
        var e = Jt(n / 2);
        return [t * jn * hn(1 - e * e), (1 + jn) * e]
    }
    In.invert = function(t, n) {
        var e = n / (1 + jn);
        return [t && t / (jn * hn(1 - e * e)), 2 * It(e)]
    }
    ;
    function Fn(t, n) {
        var e = n / 2
          , r = Yt(e);
        return [2 * t / an * Yt(n) * r * r, an * Jt(e)]
    }
    Fn.invert = function(t, n) {
        var e = It(n / an)
          , r = Yt(e)
          , i = 2 * e;
        return [t * an / 2 / (Yt(i) * r * r), i]
    }
    ;
    var Yn = function(t, n, e, r, i, o, a, u) {
        function c(c, s) {
            if (!s)
                return [t * c / tn, 0];
            var l = s * s
              , f = t + l * (n + l * (e + l * r))
              , h = s * (i - 1 + l * (o - u + l * a))
              , p = (f * f + h * h) / (2 * h)
              , d = c * ln(f / p) / tn;
            return [p * Zt(d), s * (1 + l * u) + p * (1 - Yt(d))]
        }
        return arguments.length < 8 && (u = 0),
        c.invert = function(c, s) {
            var l, f, h = tn * c / t, p = s, d = 50;
            do {
                var v = p * p
                  , g = t + v * (n + v * (e + v * r))
                  , y = p * (i - 1 + v * (o - u + v * a))
                  , _ = g * g + y * y
                  , m = 2 * y
                  , x = _ / m
                  , b = x * x
                  , w = ln(g / x) / tn
                  , M = h * w
                  , k = g * g
                  , E = (2 * n + v * (4 * e + 6 * v * r)) * p
                  , S = i + v * (3 * o + 5 * v * a)
                  , A = (2 * (g * E + y * (S - 1)) * m - _ * (2 * (S - 1))) / (m * m)
                  , N = Yt(M)
                  , T = Zt(M)
                  , C = x * N
                  , P = x * T
                  , z = h / tn * (1 / hn(1 - k / b)) * (E * x - g * A) / b
                  , L = P - c
                  , R = p * (1 + v * u) + x - C - s
                  , q = A * T + C * z
                  , O = C * w
                  , D = 1 + A - (A * N - P * z)
                  , U = P * w
                  , j = q * U - D * O;
                if (!j)
                    break;
                h -= l = (R * q - L * D) / j,
                p -= f = (L * U - R * O) / j
            } while ((jt(l) > Qt || jt(f) > Qt) && --d > 0);
            return [h, p]
        }
        ,
        c
    };
    Yn(2.8284, -1.6988, .75432, -.18071, 1.76003, -.38914, .042555),
    Yn(2.583819, -.835827, .170354, -.038094, 1.543313, -.411435, .082742),
    Yn(5 / 6 * tn, -.62636, -.0344, 0, 1.3493, -.05524, 0, .045);
    function Bn(t, n) {
        var e = t * t
          , r = n * n;
        return [t * (1 - .162388 * r) * (.87 - 952426e-9 * e * e), n * (1 + r / 12)]
    }
    Bn.invert = function(t, n) {
        var e, r = t, i = n, o = 50;
        do {
            var a = i * i;
            i -= e = (i * (1 + a / 12) - n) / (1 + a / 4)
        } while (jt(e) > Qt && --o > 0);
        o = 50,
        t /= 1 - .162388 * a;
        do {
            var u = (u = r * r) * u;
            r -= e = (r * (.87 - 952426e-9 * u) - t) / (.87 - .00476213 * u)
        } while (jt(e) > Qt && --o > 0);
        return [r, i]
    }
    ;
    Yn(2.6516, -.76534, .19123, -.047094, 1.36289, -.13965, .031762);
    function Hn(t, n) {
        var e = $t(t)
          , r = $t(n)
          , i = Yt(n)
          , o = Yt(t) * i
          , a = Zt(t) * i
          , u = Zt(r * n);
        t = jt(Ft(a, u)),
        n = ln(o),
        jt(t - nn) > Qt && (t %= nn);
        var c = function(t, n) {
            if (n === nn)
                return [0, 0];
            var e, r, i = Zt(n), o = i * i, a = o * o, u = 1 + a, c = 1 + 3 * a, s = 1 - a, l = ln(1 / hn(u)), f = s + o * u * l, h = (1 - i) / f, p = hn(h), d = h * u, v = hn(d), g = p * s;
            if (0 === t)
                return [0, -(g + o * v)];
            var y, _ = Yt(n), m = 1 / _, x = 2 * i * _, b = (-f * _ - (-3 * o + l * c) * x * (1 - i)) / (f * f), w = -m * x, M = -m * (o * u * b + h * c * x), k = -2 * m * (s * (.5 * b / p) - 2 * o * p * x), E = 4 * t / tn;
            if (t > .222 * tn || n < tn / 4 && t > .175 * tn) {
                if (e = (g + o * hn(d * (1 + a) - g * g)) / (1 + a),
                t > tn / 4)
                    return [e, e];
                var S = e
                  , A = .5 * e;
                e = .5 * (A + S),
                r = 50;
                do {
                    var N = e * (k + w * hn(d - e * e)) + M * ln(e / v) - E;
                    if (!N)
                        break;
                    N < 0 ? A = e : S = e,
                    e = .5 * (A + S)
                } while (jt(S - A) > Qt && --r > 0)
            } else {
                e = Qt,
                r = 25;
                do {
                    var T = e * e
                      , C = hn(d - T)
                      , P = k + w * C
                      , z = e * P + M * ln(e / v) - E;
                    e -= y = C ? z / (P + (M - w * T) / C) : 0
                } while (jt(y) > Qt && --r > 0)
            }
            return [e, -g - o * hn(d - e * e)]
        }(t > tn / 4 ? nn - t : t, n);
        return t > tn / 4 && (u = c[0],
        c[0] = -c[1],
        c[1] = -u),
        c[0] *= e,
        c[1] *= -r,
        c
    }
    Hn.invert = function(t, n) {
        var e = $t(t)
          , r = $t(n)
          , i = -e * t
          , o = -r * n
          , a = o / i < 1
          , u = function(t, n) {
            var e = 0
              , r = 1
              , i = .5
              , o = 50;
            for (; ; ) {
                var a = i * i
                  , u = hn(i)
                  , c = ln(1 / hn(1 + a))
                  , s = 1 - a + i * (1 + a) * c
                  , l = (1 - u) / s
                  , f = hn(l)
                  , h = l * (1 + a)
                  , p = f * (1 - a)
                  , d = hn(h - t * t)
                  , v = n + p + i * d;
                if (jt(r - e) < Kt || 0 == --o || 0 === v)
                    break;
                v > 0 ? e = i : r = i,
                i = .5 * (e + r)
            }
            if (!o)
                return null;
            var g = ln(u)
              , y = Yt(g)
              , _ = 1 / y
              , m = 2 * u * y
              , x = (-s * y - (-3 * i + c * (1 + 3 * a)) * m * (1 - u)) / (s * s);
            return [tn / 4 * (t * (-2 * _ * (.5 * x / f * (1 - a) - 2 * i * f * m) + -_ * m * d) + -_ * (i * (1 + a) * x + l * (1 + 3 * a) * m) * ln(t / hn(h))), g]
        }(a ? o : i, a ? i : o)
          , c = u[0]
          , s = u[1]
          , l = Yt(s);
        return a && (c = -nn - c),
        [e * (Ft(Zt(c) * l, -Zt(s)) + tn), r * ln(Yt(c) * l)]
    }
    ;
    function Xn(t, n) {
        var e, r, i, o, a, u;
        if (n < Qt)
            return [(o = Zt(t)) - (e = n * (t - o * (r = Yt(t))) / 4) * r, r + e * o, 1 - n * o * o / 2, t - e];
        if (n >= .999999)
            return e = (1 - n) / 4,
            i = 1 / (r = dn(t)),
            [(o = ((u = Bt(2 * (u = t))) - 1) / (u + 1)) + e * ((a = r * pn(t)) - t) / (r * r), i - e * o * i * (a - t), i + e * o * i * (a + t), 2 * It(Bt(t)) - nn + e * (a - t) / r];
        var c = [1, 0, 0, 0, 0, 0, 0, 0, 0]
          , s = [hn(n), 0, 0, 0, 0, 0, 0, 0, 0]
          , l = 0;
        for (r = hn(1 - n),
        a = 1; jt(s[l] / c[l]) > Qt && l < 8; )
            e = c[l++],
            s[l] = (e - r) / 2,
            c[l] = (e + r) / 2,
            r = hn(e * r),
            a *= 2;
        i = a * c[l] * t;
        do {
            i = (ln(o = s[l] * Zt(r = i) / c[l]) + i) / 2
        } while (--l);
        return [Zt(i), o = Yt(i), o / Yt(i - r), i]
    }
    function Gn(t, n) {
        if (!n)
            return t;
        if (1 === n)
            return Xt(Jt(t / 2 + en));
        for (var e = 1, r = hn(1 - n), i = hn(n), o = 0; jt(i) > Qt; o++) {
            if (t % tn) {
                var a = It(r * Jt(t) / e);
                a < 0 && (a += tn),
                t += a + ~~(t / tn) * tn
            } else
                t += t;
            i = (e + r) / 2,
            r = hn(e * r),
            i = ((e = i) - r) / 2
        }
        return t / (Wt(2, o) * e)
    }
    function Vn(t, n) {
        var e = (on - 1) / (on + 1)
          , r = hn(1 - e * e)
          , i = Gn(nn, r * r)
          , o = Xt(Jt(tn / 4 + jt(n) / 2))
          , a = Bt(-1 * o) / hn(e)
          , u = function(t, n) {
            var e = t * t
              , r = n + 1
              , i = 1 - e - n * n;
            return [.5 * ((t >= 0 ? nn : -nn) - Ft(i, 2 * t)), -.25 * Xt(i * i + 4 * e) + .5 * Xt(r * r + e)]
        }(a * Yt(-1 * t), a * Zt(-1 * t))
          , c = function(t, n, e) {
            var r = jt(t)
              , i = pn(jt(n));
            if (r) {
                var o = 1 / Zt(r)
                  , a = 1 / (Jt(r) * Jt(r))
                  , u = -(a + e * (i * i * o * o) - 1 + e)
                  , c = (-u + hn(u * u - (e - 1) * a * 4)) / 2;
                return [Gn(It(1 / hn(c)), e) * $t(t), Gn(It(hn((c / a - 1) / e)), 1 - e) * $t(n)]
            }
            return [0, Gn(It(i), 1 - e) * $t(n)]
        }(u[0], u[1], r * r);
        return [-c[1], (n >= 0 ? 1 : -1) * (.5 * i - c[0])]
    }
    Vn.invert = function(t, n) {
        var e, r, i, o, a, u, c = (on - 1) / (on + 1), s = hn(1 - c * c), l = Gn(nn, s * s), f = (r = -t,
        i = s * s,
        (e = .5 * l - n) ? (o = Xn(e, i),
        r ? (u = (a = Xn(r, 1 - i))[1] * a[1] + i * o[0] * o[0] * a[0] * a[0],
        [[o[0] * a[2] / u, o[1] * o[2] * a[0] * a[1] / u], [o[1] * a[1] / u, -o[0] * o[2] * a[0] * a[2] / u], [o[2] * a[1] * a[2] / u, -i * o[0] * o[1] * a[0] / u]]) : [[o[0], 0], [o[1], 0], [o[2], 0]]) : [[0, (a = Xn(r, 1 - i))[0] / a[1]], [1 / a[1], 0], [a[2] / a[1], 0]]), h = function(t, n) {
            var e = n[0] * n[0] + n[1] * n[1];
            return [(t[0] * n[0] + t[1] * n[1]) / e, (t[1] * n[0] - t[0] * n[1]) / e]
        }(f[0], f[1]);
        return [Ft(h[1], h[0]) / -1, 2 * It(Bt(-.5 * Xt(c * h[0] * h[0] + c * h[1] * h[1]))) - nn]
    }
    ;
    function Wn(t, n) {
        return [t * Yt(n) / Yt(n /= 2), 2 * Zt(n)]
    }
    Wn.invert = function(t, n) {
        var e = 2 * ln(n / 2);
        return [t * Yt(e / 2) / Yt(e), e]
    }
    ;
    Cn(0);
    var $n = .7109889596207567
      , Zn = .0528035274542;
    function Jn(t, n) {
        return n > -$n ? ((t = wn(t, n))[1] += Zn,
        t) : Sn(t, n)
    }
    Jn.invert = function(t, n) {
        return n > -$n ? wn.invert(t, n - Zn) : Sn.invert(t, n)
    }
    ;
    function Qn(t, n) {
        return jt(n) > $n ? ((t = wn(t, n))[1] -= n > 0 ? Zn : -Zn,
        t) : Sn(t, n)
    }
    Qn.invert = function(t, n) {
        return jt(n) > $n ? wn.invert(t, n + (n > 0 ? Zn : -Zn)) : Sn.invert(t, n)
    }
    ;
    function Kn(t, n) {
        return [3 / un * t * hn(tn * tn / 3 - n * n), n]
    }
    Kn.invert = function(t, n) {
        return [un / 3 * t / hn(tn * tn / 3 - n * n), n]
    }
    ;
    var te = tn / on;
    function ne(t, n) {
        return [t * (1 + hn(Yt(n))) / 2, n / (Yt(n / 2) * Yt(t / 6))]
    }
    ne.invert = function(t, n) {
        var e = jt(t)
          , r = jt(n)
          , i = Qt
          , o = nn;
        r < te ? o *= r / te : i += 6 * fn(te / r);
        for (var a = 0; a < 25; a++) {
            var u = Zt(o)
              , c = hn(Yt(o))
              , s = Zt(o / 2)
              , l = Yt(o / 2)
              , f = Zt(i / 6)
              , h = Yt(i / 6)
              , p = .5 * i * (1 + c) - e
              , d = o / (l * h) - r
              , v = c ? -.25 * i * u / c : 0
              , g = .5 * (1 + c)
              , y = (1 + .5 * o * s / l) / (l * h)
              , _ = o / l * (f / 6) / (h * h)
              , m = v * _ - y * g
              , x = (p * _ - d * g) / m
              , b = (d * v - p * y) / m;
            if (o -= x,
            i -= b,
            jt(x) < Qt && jt(b) < Qt)
                break
        }
        return [t < 0 ? -i : i, n < 0 ? -o : o]
    }
    ;
    function ee(t, n) {
        var e = t * t
          , r = n * n;
        return [t * (.975534 + r * (-.0143059 * e - .119161 + -.0547009 * r)), n * (1.00384 + e * (.0802894 + -.02855 * r + 199025e-9 * e) + r * (.0998909 + -.0491032 * r))]
    }
    ee.invert = function(t, n) {
        var e = $t(t) * tn
          , r = n / 2
          , i = 50;
        do {
            var o = e * e
              , a = r * r
              , u = e * r
              , c = e * (.975534 + a * (-.0143059 * o - .119161 + -.0547009 * a)) - t
              , s = r * (1.00384 + o * (.0802894 + -.02855 * a + 199025e-9 * o) + a * (.0998909 + -.0491032 * a)) - n
              , l = .975534 - a * (.119161 + 3 * o * .0143059 + .0547009 * a)
              , f = -u * (.238322 + .2188036 * a + .0286118 * o)
              , h = u * (.1605788 + 7961e-7 * o + -.0571 * a)
              , p = 1.00384 + o * (.0802894 + 199025e-9 * o) + a * (3 * (.0998909 - .02855 * o) - .245516 * a)
              , d = f * h - p * l
              , v = (s * f - c * p) / d
              , g = (c * h - s * l) / d;
            e -= v,
            r -= g
        } while ((jt(v) > Qt || jt(g) > Qt) && --i > 0);
        return i && [e, r]
    }
    ;
    function re(t, n) {
        return [Zt(t) / Yt(n), Jt(n) * Yt(t)]
    }
    re.invert = function(t, n) {
        var e = t * t
          , r = n * n
          , i = r + 1
          , o = t ? rn * hn((i - hn(e * e + 2 * e * (r - 1) + i * i)) / e + 1) : 1 / hn(i);
        return [ln(t * o), $t(n) * fn(o)]
    }
    ;
    function ie(t, n) {
        return [t, 1.25 * Xt(Jt(en + .4 * n))]
    }
    ie.invert = function(t, n) {
        return [t, 2.5 * It(Bt(.8 * n)) - .625 * tn]
    }
    ;
    var oe = hn(6)
      , ae = hn(7);
    function ue(t, n) {
        var e = ln(7 * Zt(n) / (3 * oe));
        return [oe * t * (2 * Yt(2 * e / 3) - 1) / ae, 9 * Zt(e / 3) / ae]
    }
    ue.invert = function(t, n) {
        var e = 3 * ln(n * ae / 9);
        return [t * ae / (oe * (2 * Yt(2 * e / 3) - 1)), ln(3 * Zt(e) * oe / 7)]
    }
    ;
    function ce(t, n) {
        for (var e, r = (1 + rn) * Zt(n), i = n, o = 0; o < 25 && (i -= e = (Zt(i / 2) + Zt(i) - r) / (.5 * Yt(i / 2) + Yt(i)),
        !(jt(e) < Qt)); o++)
            ;
        return [t * (1 + 2 * Yt(i) / Yt(i / 2)) / (3 * on), 2 * hn(3) * Zt(i / 2) / hn(2 + on)]
    }
    ce.invert = function(t, n) {
        var e = n * hn(2 + on) / (2 * hn(3))
          , r = 2 * ln(e);
        return [3 * on * t / (1 + 2 * Yt(r) / Yt(r / 2)), ln((e + Zt(r)) / (1 + rn))]
    }
    ;
    function se(t, n) {
        for (var e, r = hn(6 / (4 + tn)), i = (1 + tn / 4) * Zt(n), o = n / 2, a = 0; a < 25 && (o -= e = (o / 2 + Zt(o) - i) / (.5 + Yt(o)),
        !(jt(e) < Qt)); a++)
            ;
        return [r * (.5 + Yt(o)) * t / 1.5, r * o]
    }
    se.invert = function(t, n) {
        var e = hn(6 / (4 + tn))
          , r = n / e;
        return jt(jt(r) - nn) < Qt && (r = r < 0 ? -nn : nn),
        [1.5 * t / (e * (.5 + Yt(r))), ln((r / 2 + Zt(r)) / (1 + tn / 4))]
    }
    ;
    function le(t, n) {
        var e = n * n
          , r = e * e;
        return [t * (.8707 - .131979 * e + r * (r * (.003971 * e - .001529 * r) - .013791)), n * (1.007226 + e * (.015085 + r * (.028874 * e - .044475 - .005916 * r)))]
    }
    le.invert = function(t, n) {
        var e, r = n, i = 25;
        do {
            var o = r * r
              , a = o * o;
            r -= e = (r * (1.007226 + o * (.015085 + a * (.028874 * o - .044475 - .005916 * a))) - n) / (1.007226 + o * (.045255 + a * (.259866 * o - .311325 - .005916 * 11 * a)))
        } while (jt(e) > Qt && --i > 0);
        return [t / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 * o) - .013791) - .131979)), r]
    }
    ;
    function fe(t, n) {
        return [t * (1 + Yt(n)) / 2, 2 * (n - Jt(n / 2))]
    }
    fe.invert = function(t, n) {
        for (var e = n / 2, r = 0, i = 1 / 0; r < 10 && jt(i) > Qt; ++r) {
            var o = Yt(n / 2);
            n -= i = (n - Jt(n / 2) - e) / (1 - .5 / (o * o))
        }
        return [2 * t / (1 + Yt(n)), n]
    }
    ;
    var he = 1.0148
      , pe = .23185
      , de = -.14499
      , ve = .02406
      , ge = 1.790857183;
    function ye(t, n) {
        var e = n * n;
        return [t, n * (he + e * e * (pe + e * (de + ve * e)))]
    }
    ye.invert = function(t, n) {
        n > ge ? n = ge : n < -1.790857183 && (n = -1.790857183);
        var e, r = n;
        do {
            var i = r * r;
            r -= e = (r * (he + i * i * (pe + i * (de + ve * i))) - n) / (1.0148 + i * i * (1.1592500000000001 + i * (.21654 * i - 1.01493)))
        } while (jt(e) > Qt);
        return [t, r]
    }
    ;
    function _e(t, n) {
        if (jt(n) < Qt)
            return [t, 0];
        var e = Jt(n)
          , r = t * Zt(n);
        return [Zt(r) / e, n + (1 - Yt(r)) / e]
    }
    _e.invert = function(t, n) {
        if (jt(n) < Qt)
            return [t, 0];
        var e, r = t * t + n * n, i = .5 * n, o = 10;
        do {
            var a = Jt(i)
              , u = 1 / Yt(i)
              , c = r - 2 * n * i + i * i;
            i -= e = (a * c + 2 * (i - n)) / (2 + c * u * u + 2 * (i - n) * a)
        } while (jt(e) > Qt && --o > 0);
        return a = Jt(i),
        [(jt(n) < jt(i + 1 / a) ? ln(t * a) : $t(t) * (fn(jt(t * a)) + nn)) / Zt(i), i]
    }
    ;
    var me = [[.9986, -.062], [1, 0], [.9986, .062], [.9954, .124], [.99, .186], [.9822, .248], [.973, .31], [.96, .372], [.9427, .434], [.9216, .4958], [.8962, .5571], [.8679, .6176], [.835, .6769], [.7986, .7346], [.7597, .7903], [.7186, .8435], [.6732, .8936], [.6213, .9394], [.5722, .9761], [.5322, 1]];
    function xe(t, n) {
        var e, r = Vt(18, 36 * jt(n) / tn), i = Ht(r), o = r - i, a = (e = me[i])[0], u = e[1], c = (e = me[++i])[0], s = e[1], l = (e = me[Vt(19, ++i)])[0], f = e[1];
        return [t * (c + o * (l - a) / 2 + o * o * (l - 2 * c + a) / 2), (n > 0 ? nn : -nn) * (s + o * (f - u) / 2 + o * o * (f - 2 * s + u) / 2)]
    }
    me.forEach((function(t) {
        t[1] *= 1.0144
    }
    )),
    xe.invert = function(t, n) {
        var e = n / nn
          , r = 90 * e
          , i = Vt(18, jt(r / 5))
          , o = Gt(0, Ht(i));
        do {
            var a = me[o][1]
              , u = me[o + 1][1]
              , c = me[Vt(19, o + 2)][1]
              , s = c - a
              , l = c - 2 * u + a
              , f = 2 * (jt(e) - u) / s
              , h = l / s
              , p = f * (1 - h * f * (1 - 2 * h * f));
            if (p >= 0 || 1 === o) {
                r = (n >= 0 ? 5 : -5) * (p + i);
                var d, v = 50;
                do {
                    p = (i = Vt(18, jt(r) / 5)) - (o = Ht(i)),
                    a = me[o][1],
                    u = me[o + 1][1],
                    c = me[Vt(19, o + 2)][1],
                    r -= (d = (n >= 0 ? nn : -nn) * (u + p * (c - a) / 2 + p * p * (c - 2 * u + a) / 2) - n) * cn
                } while (jt(d) > Kt && --v > 0);
                break
            }
        } while (--o >= 0);
        var g = me[o][0]
          , y = me[o + 1][0]
          , _ = me[Vt(19, o + 2)][0];
        return [t / (y + p * (_ - g) / 2 + p * p * (_ - 2 * y + g) / 2), r * sn]
    }
    ;
    function be(t, n) {
        var e = Jt(n / 2)
          , r = Zt(en * e);
        return [t * (.74482 - .34588 * r * r), 1.70711 * e]
    }
    be.invert = function(t, n) {
        var e = n / 1.70711
          , r = Zt(en * e);
        return [t / (.74482 - .34588 * r * r), 2 * It(e)]
    }
    ;
    function we(t, n) {
        if (jt(n) < Qt)
            return [t, 0];
        var e = jt(n / nn)
          , r = ln(e);
        if (jt(t) < Qt || jt(jt(n) - nn) < Qt)
            return [0, $t(n) * tn * Jt(r / 2)];
        var i = Yt(r)
          , o = jt(tn / t - t / tn) / 2
          , a = o * o
          , u = i / (e + i - 1)
          , c = u * (2 / e - 1)
          , s = c * c
          , l = s + a
          , f = u - s
          , h = a + u;
        return [$t(t) * tn * (o * f + hn(a * f * f - l * (u * u - s))) / l, $t(n) * tn * (c * h - o * hn((a + 1) * l - h * h)) / l]
    }
    we.invert = function(t, n) {
        if (jt(n) < Qt)
            return [t, 0];
        if (jt(t) < Qt)
            return [0, nn * Zt(2 * It(n / tn))];
        var e = (t /= tn) * t
          , r = (n /= tn) * n
          , i = e + r
          , o = i * i
          , a = -jt(n) * (1 + i)
          , u = a - 2 * r + e
          , c = -2 * a + 1 + 2 * r + o
          , s = r / c + (2 * u * u * u / (c * c * c) - 9 * a * u / (c * c)) / 27
          , l = (a - u * u / (3 * c)) / c
          , f = 2 * hn(-l / 3)
          , h = fn(3 * s / (l * f)) / 3;
        return [tn * (i - 1 + hn(1 + 2 * (e - r) + o)) / (2 * t), $t(n) * tn * (-f * Yt(h + tn / 3) - u / (3 * c))]
    }
    ;
    function Me(t, n) {
        if (jt(n) < Qt)
            return [t, 0];
        var e = jt(n / nn)
          , r = ln(e);
        if (jt(t) < Qt || jt(jt(n) - nn) < Qt)
            return [0, $t(n) * tn * Jt(r / 2)];
        var i = Yt(r)
          , o = jt(tn / t - t / tn) / 2
          , a = o * o
          , u = i * (hn(1 + a) - o * i) / (1 + a * e * e);
        return [$t(t) * tn * u, $t(n) * tn * hn(1 - u * (2 * o + u))]
    }
    Me.invert = function(t, n) {
        if (!t)
            return [0, nn * Zt(2 * It(n / tn))];
        var e = jt(t / tn)
          , r = (1 - e * e - (n /= tn) * n) / (2 * e)
          , i = hn(r * r + 1);
        return [$t(t) * tn * (i - r), $t(n) * nn * Zt(2 * Ft(hn((1 - 2 * r * e) * (r + i) - e), hn(i + r + e)))]
    }
    ;
    function ke(t, n) {
        if (jt(n) < Qt)
            return [t, 0];
        var e = n / nn
          , r = ln(e);
        if (jt(t) < Qt || jt(jt(n) - nn) < Qt)
            return [0, tn * Jt(r / 2)];
        var i = (tn / t - t / tn) / 2
          , o = e / (1 + Yt(r));
        return [tn * ($t(t) * hn(i * i + 1 - o * o) - i), tn * o]
    }
    ke.invert = function(t, n) {
        if (!n)
            return [t, 0];
        var e = n / tn
          , r = (tn * tn * (1 - e * e) - t * t) / (2 * tn * t);
        return [t ? tn * ($t(t) * hn(r * r + 1) - r) : 0, nn * Zt(2 * It(e))]
    }
    ;
    function Ee(t, n) {
        if (!n)
            return [t, 0];
        var e = jt(n);
        if (!t || e === nn)
            return [0, n];
        var r = e / nn
          , i = r * r
          , o = (8 * r - i * (i + 2) - 5) / (2 * i * (r - 1))
          , a = o * o
          , u = r * o
          , c = i + a + 2 * u
          , s = r + 3 * o
          , l = t / nn
          , f = l + 1 / l
          , h = $t(jt(t) - nn) * hn(f * f - 4)
          , p = h * h
          , d = (h * (c + a - 1) + 2 * hn(c * (i + a * p - 1) + (1 - i) * (i * (s * s + 4 * a) + 12 * u * a + 4 * a * a))) / (4 * c + p);
        return [$t(t) * nn * d, $t(n) * nn * hn(1 + h * jt(d) - d * d)]
    }
    Ee.invert = function(t, n) {
        var e;
        if (!t || !n)
            return [t, n];
        n /= tn;
        var r = $t(t) * t / nn
          , i = (r * r - 1 + 4 * n * n) / jt(r)
          , o = i * i
          , a = 2 * n
          , u = 50;
        do {
            var c = a * a
              , s = (8 * a - c * (c + 2) - 5) / (2 * c * (a - 1))
              , l = (3 * a - c * a - 10) / (2 * c * a)
              , f = s * s
              , h = a * s
              , p = a + s
              , d = p * p
              , v = a + 3 * s
              , g = -2 * p * (4 * h * f + (1 - 4 * c + 3 * c * c) * (1 + l) + f * (14 * c - 6 - o + (8 * c - 8 - 2 * o) * l) + h * (12 * c - 8 + (10 * c - 10 - o) * l))
              , y = hn(d * (c + f * o - 1) + (1 - c) * (c * (v * v + 4 * f) + f * (12 * h + 4 * f)));
            a -= e = (i * (d + f - 1) + 2 * y - r * (4 * d + o)) / (i * (2 * s * l + 2 * p * (1 + l)) + g / y - 8 * p * (i * (-1 + f + d) + 2 * y) * (1 + l) / (o + 4 * d))
        } while (e > Qt && --u > 0);
        return [$t(t) * (hn(i * i + 4) + i) * tn / 4, nn * a]
    }
    ;
    var Se = 4 * tn + 3 * hn(3)
      , Ae = 2 * hn(2 * tn * hn(3) / Se);
    bn(Ae * hn(3) / tn, Ae, Se / 6);
    function Ne(t, n) {
        return [t * hn(1 - 3 * n * n / (tn * tn)), n]
    }
    Ne.invert = function(t, n) {
        return [t / hn(1 - 3 * n * n / (tn * tn)), n]
    }
    ;
    function Te(t, n) {
        var e = .90631 * Zt(n)
          , r = hn(1 - e * e)
          , i = hn(2 / (1 + r * Yt(t /= 3)));
        return [2.66723 * r * i * Zt(t), 1.24104 * e * i]
    }
    Te.invert = function(t, n) {
        var e = t / 2.66723
          , r = n / 1.24104
          , i = hn(e * e + r * r)
          , o = 2 * ln(i / 2);
        return [3 * Ft(t * Jt(o), 2.66723 * i), i && ln(n * Zt(o) / (1.24104 * .90631 * i))]
    }
    ;
    function Ce(t, n) {
        var e = Yt(n)
          , r = Yt(t) * e
          , i = 1 - r
          , o = Yt(t = Ft(Zt(t) * e, -Zt(n)))
          , a = Zt(t);
        return [a * (e = hn(1 - r * r)) - o * i, -o * e - a * i]
    }
    Ce.invert = function(t, n) {
        var e = (t * t + n * n) / -2
          , r = hn(-e * (2 + e))
          , i = n * e + t * r
          , o = t * e - n * r
          , a = hn(o * o + i * i);
        return [Ft(r * i, a * (1 + e)), a ? -ln(r * o / a) : 0]
    }
    ;
    function Pe(t, n) {
        var e = vn(t, n);
        return [(e[0] + t / nn) / 2, (e[1] + n) / 2]
    }
    Pe.invert = function(t, n) {
        var e = t
          , r = n
          , i = 25;
        do {
            var o, a = Yt(r), u = Zt(r), c = Zt(2 * r), s = u * u, l = a * a, f = Zt(e), h = Yt(e / 2), p = Zt(e / 2), d = p * p, v = 1 - l * h * h, g = v ? fn(a * h) * hn(o = 1 / v) : o = 0, y = .5 * (2 * g * a * p + e / nn) - t, _ = .5 * (g * u + r) - n, m = .5 * o * (l * d + g * a * h * s) + .5 / nn, x = o * (f * c / 4 - g * u * p), b = .125 * o * (c * p - g * u * l * f), w = .5 * o * (s * h + g * d * a) + .5, M = x * b - w * m, k = (_ * x - y * w) / M, E = (y * b - _ * m) / M;
            e -= k,
            r -= E
        } while ((jt(k) > Qt || jt(E) > Qt) && --i > 0);
        return [e, r]
    }
    ;
    function ze() {
        var t, n, e, o, a, u, c, s, l, f, h, p, d, v = !0, g = [-2, -1.5, 0, 1.5, 2], y = ["stap1", "stap2", "stap3", "stap4"], _ = "onder", m = (r.select(window),
        function(t) {
            return t = (t = (t = t.replace(/ /g, "")).replace(/\//g, "")).toLowerCase()
        }
        );
        function x(o) {
            o.each((function(o, b) {
                var w = At(xe).scale(152.63).scale(90).translate([350, 150])
                  , M = r.geoPath().projection(w)
                  , k = r.geoGraticule()
                  , E = r.scaleThreshold().domain(g).range(y);
                if (e = r.select(this).classed("af-wereldkaart", !0),
                !f && n) {
                    for (var S in (f = e.append("svg").attr("width", "100%").attr("height", 300).attr("viewBox", "120 5 460 280")).attr("aria-labelledby", "title"),
                    f.attr("aria-describedby", "desc"),
                    f.append("title").text("World map"),
                    f.append("desc").text("Dynamic world map showing the changes in world trade by region for the selected variable."),
                    f.append("g").attr("class", "outline").append("path").datum(k.outline).attr("class", "graticule outline").attr("d", M),
                    n.objects)
                        f.append("g").datum(i.feature(n, n.objects[S])).datum((function(t) {
                            return t.id = S,
                            t
                        }
                        )).attr("id", m(S)).attr("class", "regio").on("mouseover", (function(t) {}
                        ));
                    f.selectAll(".regio").selectAll("path").data((function(t) {
                        return t.features
                    }
                    )).enter().append("path").attr("id", (function(t) {
                        return t.id
                    }
                    )).attr("class", (function(t) {
                        if (t.properties.soort)
                            return t.properties.soort;
                        var n = "land " + t.id;
                        return null !== t.properties.regio && (n += " " + m(t.properties.regio)),
                        n
                    }
                    )).attr("d", M)
                }
                if (f) {
                    if (f.attr("width", "100%").attr("height", 300).selectAll("path").attr("d", M),
                    o && o.length > 0 && f.selectAll(".regio").data(o, (function(t) {
                        return t.id
                    }
                    )).each((function(t) {
                        var n = E(t[h][p][d]);
                        r.select(this).selectAll(".land").attr("class", "land " + n)
                    }
                    )),
                    t && t.remove(),
                    "geen" !== _) {
                        t = f.append("g").attr("class", "af-kaart-legenda");
                        var A = 10
                          , N = 30;
                        "onder" == _ && (t.attr("transform", "translate(300,240)"),
                        t.append("rect").attr("class", "achtergrond").attr("width", (y.length + 1) * N).attr("height", 60),
                        t.selectAll(".af-stap").data(y).enter().append("rect").attr("class", (function(t, n) {
                            return "af-stap " + t
                        }
                        )).attr("width", N).attr("height", A).attr("x", (function(t, n) {
                            return n * N
                        }
                        )),
                        t.selectAll(".af-stap-tekst").data(g).enter().append("text").attr("class", (function(t) {
                            return "af-stap-tekst " + t
                        }
                        )).attr("y", -8).attr("x", (function(t, n) {
                            return N + n * N
                        }
                        )).style("text-anchor", "middle").text((function(t) {
                            var n, e;
                            return n = "since 2010" === d || "year on year" === d ? r.precisionFixed(1) : r.precisionFixed(.5),
                            e = r.format("+." + n + "f"),
                            0 == t ? t + "" : e(t) + ""
                        }
                        ))),
                        "links" == _ && (t.attr("transform", "translate(135,160)"),
                        t.append("rect").attr("class", "achtergrond").attr("width", 20).attr("height", (y.length + 1) * A),
                        t.selectAll(".af-stap").data(y).enter().append("rect").attr("class", (function(t) {
                            return "af-stap " + t
                        }
                        )).attr("width", N).attr("height", A).attr("y", (function(t, n) {
                            return n * A
                        }
                        )),
                        t.selectAll(".af-stap-tekst").data(g).enter().append("text").attr("class", (function(t) {
                            return "af-stap-tekst " + t
                        }
                        )).attr("x", -8).attr("y", (function(t, n) {
                            return A + n * A
                        }
                        )).attr("dy", 3).text((function(t) {
                            return t > 0 ? "+" + t : t + ""
                        }
                        )))
                    }
                    !0 === v && void 0 === a && (a = e.append("div").attr("class", "af-tooltip"),
                    u = a.append("h5"),
                    c = a.append("table").append("tr").attr("class", "tt-body"),
                    s = c.append("td").attr("class", "tt-tekst"),
                    l = c.append("td").attr("class", "tt-waarde"),
                    f.selectAll(".land").on("mousemove", (function(t) {
                        var n = r.select(this.parentNode).datum();
                        x.toonOverlay(t, n)
                    }
                    )).on("mouseout", (function() {
                        x.verbergOverlay()
                    }
                    )),
                    f.on("mouseleave", (function(t) {
                        x.verbergOverlay()
                    }
                    )))
                }
                x.toonOverlay = function(t, n) {
                    if ("overig" != n.id) {
                        var i = n[h][p][d]
                          , o = E(i);
                        "since 2005" == d && (i = Math.round(i)),
                        i = r.format("+")(i) + "%",
                        a.style("display", "block"),
                        u.html(n.id),
                        s.text("Change in " + h + " " + p + " " + d + "."),
                        l.text(i).attr("class", "tt-waarde " + o);
                        var c, f, v = r.mouse(e.node()), g = a.node().clientWidth, y = a.node().clientHeight;
                        c = v[0] - g / 2 + "px",
                        f = v[1] - y - 10 + "px",
                        a.style("left", c).style("top", f)
                    }
                }
                ,
                x.verbergOverlay = function() {
                    a.style("display", "none")
                }
            }
            ))
        }
        return r.selection.prototype.moveToFront = function() {
            return this.each((function() {
                this.parentNode.appendChild(this)
            }
            ))
        }
        ,
        x.tooltip = function(t) {
            return arguments.length ? (v = t,
            x) : v
        }
        ,
        x.drempels = function(t) {
            return arguments.length ? (g = t,
            x) : g
        }
        ,
        x.stappen = function(t) {
            return arguments.length ? (y = t,
            x) : y
        }
        ,
        x.toonlegenda = function(t) {
            return arguments.length ? (_ = t,
            x) : _
        }
        ,
        x.regio = function(t) {
            return arguments.length ? (o = t,
            x) : o
        }
        ,
        x.geodata = function(t) {
            return arguments.length ? (n = t,
            x) : n
        }
        ,
        x.huidigeIndex = function(t) {
            return arguments.length ? (h = t,
            x) : h
        }
        ,
        x.huidigeGrootheid = function(t) {
            return arguments.length ? (p = t,
            x) : p
        }
        ,
        x.huidigeEenheid = function(t) {
            return arguments.length ? (d = t,
            x) : d
        }
        ,
        x
    }
    const Le = "test"
      , Re = "development";
    function qe(t) {
        return Math.round(10 * t) / 10
    }
    const Oe = function(t) {
        return t.location.href.includes("localhost") ? Re : t.location.href.includes("dev") ? Le : "production"
    }(window);
    var De = window.location.href + '/cpb-data-wtm.csv';
    De = `${De}?_=${(new Date).getTime()}`;
    let Ue = "https://www.cpb.nl/sites/all/modules/custom/wtmonitor/argumentenfabriek/wereldkaart.json";
    Ue = `${Ue}?_=${(new Date).getTime()}`,
    document.addEventListener("DOMContentLoaded", (function(t) {
        var n = {}
          , e = ze()
          , i = function() {
            var t, n, e, i, o, a, u, c, s, l, f, h, p, d, v, g, y, _, m, x, b, w, M, k, E, S, A, N, T, C, P, z, L = {
                top: 10,
                right: 10,
                bottom: 30,
                left: 30
            }, R = r.select(window), q = 0, O = r.curveLinear, D = "onder", U = 100, j = [], I = [], F = .2, Y = [-2, -1.5, 0, 1.5, 2], B = ["stap1", "stap2", "stap3", "stap4"], H = function(t) {
                return t + "%"
            }, X = function(t) {
                return (t = t.replace(/ /g, "")).replace(/\//g, "")
            };
            function G(q) {
                q.each((function(q) {
                    var V = r.nest().key((function(t) {
                        return t.month
                    }
                    )).map(q)
                      , W = r.scaleThreshold().domain(Y).range(B)
                      , $ = []
                      , Z = r.keys(q[0]);
                    j = [];
                    for (var J = 1; J < Z.length; J++) {
                        var Q = {
                            reeks: Z[J],
                            reeksnummer: J,
                            xwaarden: [],
                            ywaarden: [],
                            xywaarden: []
                        };
                        q.forEach((function(t) {
                            1 == J && j.push(t[Z[0]]),
                            0 !== t[Z[J]] && -0 !== t[Z[J]] || (t[Z[J]] = 0),
                            "number" == typeof t[Z[J]] && (Q.xwaarden.push(t[Z[0]]),
                            Q.ywaarden.push(+t[Z[J]]),
                            Q.xywaarden.push({
                                x: t[Z[0]],
                                y: +t[Z[J]]
                            }))
                        }
                        )),
                        $.push(Q)
                    }
                    if (q = $,
                    m = r.select(this).classed("af-lijngrafiek", !0),
                    void 0 === t) {
                        (t = r.select(this).append("svg")).attr("aria-labelledby", "title"),
                        t.attr("aria-describedby", "desc"),
                        t.append("title").text("Line chart"),
                        t.append("desc").text("Dynamic line graph showing the changes in world trade for the selected region.");
                        var K = t.append("g").attr("transform", "translate(" + L.right + "," + L.top + ")");
                        K.append("g").attr("class", "grid").append("line").attr("class", "gridlijn"),
                        K.append("g").attr("class", "x axis"),
                        K.append("g").attr("class", "y axis"),
                        K.append("g").attr("class", "lijnen"),
                        K.append("g").attr("class", "muisvangers"),
                        _ = t.select(".gridlijn")
                    }
                    void 0 === x && (x = m.append("div").attr("class", "af-tooltip"),
                    b = x.append("h5"),
                    w = x.append("table").append("tr").attr("class", "tt-body"),
                    M = w.append("td").attr("class", "tt-tekst"),
                    k = w.append("td").attr("class", "tt-waarde")),
                    void 0 === g && m.append("ul").classed("af-legenda", !0),
                    G.reeksAan = function(n) {
                        t.select(".lijnen").selectAll(".lijn").style("opacity", .2),
                        t.select(".lijnen").select("." + X(n)).style("opacity", 1).moveToFront()
                    }
                    ,
                    G.reeksUit = function(n) {
                        t.select(".lijnen").selectAll(".lijn").style("opacity", "initial"),
                        t.select(".lijnen").selectAll(".active").moveToFront()
                    }
                    ,
                    G.toggleReeks = function(n) {
                        var e = I.indexOf(n);
                        e > -1 ? (I.splice(e, 1),
                        G.update()) : (I.push(n),
                        t.select(".lijn." + X(n)).style("display", "none"),
                        G.update())
                    }
                    ,
                    G.update = function() {
                        var x = []
                          , b = q.filter((function(t) {
                            if (I.indexOf(t.reeks) < 0)
                                return !0
                        }
                        ));
                        if (0 !== b.length) {
                            b.forEach((function(t) {
                                x = x.concat(t.ywaarden)
                            }
                            ));
                            var w = 0;
                            m.select(".af-legenda").selectAll("li").remove(),
                            m.select(".af-legenda").attr("class", "af-legenda " + D);
                            var M = (g = m.select(".af-legenda").selectAll("li").data(q)).enter().append("li").style("cursor", "pointer").classed("verberg", (function(t) {
                                if (I.indexOf(t.reeks) > -1)
                                    return !0
                            }
                            )).on("mouseover", (function(t) {
                                r.select(this).classed("verberg") || (M.style("opacity", .2),
                                r.select(this).style("opacity", 1),
                                G.reeksAan(t.reeks))
                            }
                            )).on("mouseout", (function() {
                                M.style("opacity", null),
                                G.reeksUit()
                            }
                            )).on("click", (function(t) {
                                r.select(this).style("opacity", null),
                                !0 === r.select(this).classed("verberg") ? r.select(this).classed("verberg", !1) : r.select(this).classed("verberg", !0),
                                G.toggleReeks(t.reeks)
                            }
                            ))
                              , k = M.append("svg").attr("width", 12).attr("height", 12);
                            k.append("circle").attr("cx", 6).attr("cy", 6).attr("r", "4").attr("class", (function(t) {
                                return "reeks" + t.reeksnummer + " " + X(t.reeks)
                            }
                            )),
                            k.append("line").attr("x1", 0).attr("y1", 6).attr("x2", 10).attr("y2", 6).attr("class", (function(t) {
                                return "reeks" + t.reeksnummer + " " + X(t.reeks)
                            }
                            )),
                            M.append("span").html((function(t) {
                                return t.reeks
                            }
                            )),
                            "geen" == D && m.select(".af-legenda").style("display", "none"),
                            "rechts" == D && (L.left,
                            m.select(".af-legenda").style("display", "block").style("float", "right").style("width", U + "px")),
                            "onder" == D && (m.select(".af-legenda").style("display", "block").style("float", "none").style("width", "auto").style("margin-left", L.left + "px"),
                            w = m.select(".af-legenda").node().clientHeight),
                            "onder" == D && w > 32 && (m.select(".af-legenda").classed("af-rolmenu", !0),
                            w = 32),
                            m.selectAll(".af-geenheid").remove();
                            var T = m.select(".x.axis").append("g").attr("class", "af-geenheid")
                              , C = m.select(".y.axis").append("g").attr("class", "af-geenheid");
                            E && T.append("text").attr("class", "af-eenheid").attr("x", 15).attr("y", 22).text(E).each((function() {
                                Math.ceil(this.getBBox().width)
                            }
                            )).moveToFront(),
                            S && C.append("text").attr("class", "af-eenheid").attr("dy", 4).text(S).each((function() {
                                var t = Math.ceil(this.getBBox().width)
                                  , n = this.getBBox().height
                                  , e = this.getBBox().y;
                                C.append("rect").attr("width", t).attr("height", n).attr("y", e)
                            }
                            )).moveToFront(),
                            m.selectAll(".af-grootheid").remove();
                            var P = m.select(".x.axis").append("g").attr("class", "af-grootheid")
                              , z = m.select("svg").append("g").attr("class", "af-grootheid");
                            A && P.append("text").attr("class", "af-grootheid").attr("text-anchor", "middle").text(A),
                            N && z.append("text").attr("class", "af-grootheid").text(N),
                            n = m.node().clientWidth,
                            e = m.node().clientHeight,
                            c = n - L.left - L.right,
                            s = e - L.bottom - L.top,
                            l = Math.floor(r.min(x)),
                            f = Math.ceil(r.max(x)),
                            void 0 !== h && (l = h),
                            void 0 !== p && (f = p),
                            void 0 !== v && void 0 === h && (l = r.min(v)),
                            void 0 !== v && void 0 === p && (f = r.max(v)),
                            i = r.scalePoint().domain(j).range([0, c], F),
                            o = r.scaleLinear().rangeRound([s, 0]).domain([l, f]).nice(),
                            a = r.axisBottom(i).tickValues(j).tickSize(0).tickPadding(12),
                            u = r.axisLeft(o).ticks(5).tickSize(-c).tickFormat(H),
                            void 0 !== d && a.tickValues(d),
                            void 0 !== v && u.tickValues(v),
                            y = i(q[0].xwaarden[1]) - i(q[0].xwaarden[0]),
                            t.attr("width", c).attr("height", s),
                            t.select(".x.axis").attr("transform", "translate(0," + s + ")").call(a),
                            t.select(".y.axis").transition().call(u),
                            _.attr("y2", s),
                            r.selectAll("g.tick").filter((function(t) {
                                return 0 == t
                            }
                            )).select("line").attr("class", "af-nullijn"),
                            t.select(".x.axis").selectAll("text").style("text-anchor", "end"),
                            t.select(".x.axis").select("text").style("text-anchor", "start"),
                            T.attr("transform", "translate(" + c + ",0)"),
                            C.transition().attr("transform", "translate(0," + o(f) + ")"),
                            C.moveToFront(),
                            P.attr("transform", "translate(" + .5 * c + ",45)"),
                            z.transition().attr("transform", "translate(0,-10)");
                            var R = r.line().x((function(t) {
                                return i(t.x)
                            }
                            )).y((function(t) {
                                return o(t.y)
                            }
                            )).curve(O)
                              , Y = t.select(".lijnen").selectAll("g").data(q, (function(t) {
                                return t.reeks
                            }
                            ));
                            Y.exit().remove(),
                            Y.enter().append("g").merge(Y).attr("class", (function(t) {
                                var n = X(t.reeks);
                                return I.indexOf(t.reeks) > -1 ? "verborgen lijn reeks" + t.reeksnummer + " " + n : "lijn reeks" + t.reeksnummer + " " + n
                            }
                            ));
                            var B = t.selectAll(".lijn").selectAll("path").data((function(t) {
                                return [t]
                            }
                            ));
                            B.enter().append("path").merge(B).transition().attr("d", (function(t) {
                                return R(t.xywaarden)
                            }
                            ));
                            var V = t.selectAll(".lijn").selectAll(".cirkel").data((function(t) {
                                return t.xywaarden
                            }
                            ));
                            V.exit().remove(),
                            V.enter().append("circle").attr("r", 0).attr("class", (function(t) {
                                return "cirkel"
                            }
                            )).merge(V).transition().attr("cx", (function(t) {
                                return i(t.x)
                            }
                            )).attr("cy", (function(t) {
                                return o(t.y)
                            }
                            ));
                            var W = t.select(".muisvangers").selectAll(".muisvanger").data(j);
                            W.enter().append("rect").merge(W).attr("id", (function(t) {
                                return "muisvanger " + t
                            }
                            )).attr("class", "muisvanger").attr("width", y).attr("height", s).attr("x", (function(t, n) {
                                return i(t) - .5 * y
                            }
                            )).attr("y", 0),
                            t.select(".muisvangers").selectAll(".muisvanger").on("touchstart", (function(t) {
                                r.event.preventDefault(),
                                r.event.stopPropagation(),
                                G.toonOverlay(t, 10)
                            }
                            )).on("touchend", (function(t) {
                                r.event.preventDefault(),
                                r.event.stopPropagation(),
                                G.verbergOverlay()
                            }
                            )).on("mousemove", (function(t) {
                                G.toonOverlay(t, 10)
                            }
                            )),
                            t.select(".muisvangers").on("mouseleave", (function() {
                                G.verbergOverlay()
                            }
                            ))
                        }
                    }
                    ,
                    G.update(),
                    G.toonOverlay = function(n, e) {
                        var o, a;
                        if ("last three months" !== P || "January 2010" !== n && "February 2010" !== n && "March 2010" !== n && "April 2010" !== n && "May 2010" !== n) {
                            _.style("display", "block").attr("x1", i(n)).attr("x2", i(n)),
                            o = t.selectAll(".cirkel"),
                            a = +o.style("stroke-width").slice(0, -2),
                            o.attr("r", (function(t) {
                                return i(t.x) == i(n) ? 1.5 * a : 0
                            }
                            )),
                            x.style("display", "block");
                            var u = V.get(n)[0].value
                              , c = W(u);
                            "since 2005" == P && (u = Math.round(u)),
                            u = r.format("+")(u) + "%",
                            "world" != z && "United States" != z && "Euro area" != z || (z = "the " + z),
                            "last month" == P && (P = "since previous month"),
                            "last three months" == P && (P = "since previous three months");
                            var s = "Change in " + T + " " + C + " " + P + " in " + z;
                            b.html(n),
                            M.text(s),
                            k.text(u).attr("class", "tt-waarde " + c);
                            var l, f, h = r.mouse(m.node()), p = x.node().clientWidth, d = x.node().clientHeight;
                            l = h[0] - p / 2 + "px",
                            f = h[1] - d - 10 + "px",
                            x.style("left", l).style("top", f)
                        }
                    }
                    ,
                    G.verbergOverlay = function() {
                        x.style("display", "none"),
                        _.style("display", "none"),
                        t.selectAll(".cirkel").attr("r", 0)
                    }
                    ,
                    G.tekenLijn = function(n, e) {
                        n = X(n);
                        var r = t.select(".lijn." + n + " path")
                          , i = r.node().getTotalLength();
                        r.attr("stroke-dasharray", i + " " + i).attr("stroke-dashoffset", i).transition().delay(500).duration(e).ease("linear").attr("stroke-dashoffset", 0)
                    }
                    ;
                    var tt = Math.floor(100 * Math.random());
                    R.on("resize.lijngrafiek" + tt, (function() {
                        G.update()
                    }
                    ))
                }
                ))
            }
            return r.selection.prototype.moveToFront = function() {
                return this.each((function() {
                    this.parentNode.appendChild(this)
                }
                ))
            }
            ,
            G.lijnType = function(t) {
                return arguments.length ? (O = t,
                this) : O
            }
            ,
            G.margin = function(t) {
                return arguments.length ? (L = t,
                this) : L
            }
            ,
            G.animatieDuur = function(t) {
                return arguments.length ? (q = t,
                this) : q
            }
            ,
            G.toonlegenda = function(t) {
                return arguments.length ? (D = t,
                this) : D
            }
            ,
            G.breedteLegenda = function(t) {
                return arguments.length ? (U = t,
                this) : U
            }
            ,
            G.eenheidX = function(t) {
                return arguments.length ? (E = t,
                this) : E
            }
            ,
            G.eenheidY = function(t) {
                return arguments.length ? (S = t,
                this) : S
            }
            ,
            G.grootheidX = function(t) {
                return arguments.length ? (A = t,
                this) : A
            }
            ,
            G.grootheidY = function(t) {
                return arguments.length ? (N = t,
                this) : N
            }
            ,
            G.minimumY = function(t) {
                return arguments.length ? (h = t,
                this) : h
            }
            ,
            G.maximumY = function(t) {
                return arguments.length ? (p = t,
                this) : p
            }
            ,
            G.waardenYas = function(t) {
                return arguments.length ? (v = t,
                this) : v
            }
            ,
            G.waardenXas = function(t) {
                return arguments.length ? (d = t,
                this) : d
            }
            ,
            G.verborgenReeksen = function(t) {
                return arguments.length ? (I = t,
                this) : I
            }
            ,
            G.xPadding = function(t) {
                return arguments.length ? (F = t,
                this) : F
            }
            ,
            G.formateerY = function(t) {
                return arguments.length ? (H = t,
                this) : H
            }
            ,
            G.huidigeIndex = function(t) {
                return arguments.length ? (T = t,
                G) : T
            }
            ,
            G.huidigeGrootheid = function(t) {
                return arguments.length ? (C = t,
                G) : C
            }
            ,
            G.huidigeEenheid = function(t) {
                return arguments.length ? (P = t,
                G) : P
            }
            ,
            G.huidigeRegio = function(t) {
                return arguments.length ? (z = t,
                G) : z
            }
            ,
            G.drempels = function(t) {
                return arguments.length ? (Y = t,
                G) : Y
            }
            ,
            G.stappen = function(t) {
                return arguments.length ? (B = t,
                G) : B
            }
            ,
            G
        }().toonlegenda("geen").margin({
            top: 30,
            right: 40,
            bottom: 30,
            left: 20
        });
        r.select("#environment-message").text("Dit datapaneel is gevuld met data voor de " + Oe + " omgeving."),
        n.variabelen = ["index", "quantity", "unit"],
        n.indexen = ["trade", "import", "export", "production"],
        n.grootheden = ["volume", "price"],
        n.eenheden = ["since 2010", "last month", "last three months", "year on year"],
        n.regios = ["world", "Euro area", "United States", "United Kingdom", "Japan", "Advanced Asia excl Japan", "other advanced economies", "China", "emerging Asia excl China", "Eastern Europe / CIS", "Latin America", "Africa and Middle East"],
        n.huidigeIndex = "trade",
        n.huidigeGrootheid = "volume",
        n.huidigeEenheid = "last month",
        n.huidigeRegio = "world",
        n.aantalmaanden = 0;
        var o = r.select("#af-container")
          , a = o.append("div").attr("class", "af-rij af-rij-1")
          , u = o.append("div").attr("class", "af-rij af-rij-2")
          , c = o.append("div").attr("class", "af-rij af-rij-3")
          , s = o.append("div").attr("class", "af-rij af-rij-4")
          , l = a.append("div").attr("id", "box-kop").attr("class", "af-kolom breedte9 af-box")
          , f = a.append("div").attr("id", "box-trend").attr("class", "af-kolom breedte3 af-box")
          , h = f.append("h4").attr("class", "af-trend")
          , p = u.append("div").attr("id", "box-kaart").attr("class", "af-kolom breedte12 af-box").append("div")
          , d = c.append("div").attr("id", "box-grafiek").attr("class", "af-box")
          , v = d.append("div").attr("id", "af-grafiek-titel")
          , g = d.append("div").attr("id", "af-grafiek")
          , y = s.append("div").attr("id", "box-uitleg")
          , _ = s.append("ul").attr("id", "box-knoppen")
          , m = _.append("li").append("a").attr("href", "#").attr("class", "af-knop").text("show explanation")
          , x = _.append("li").append("a").attr("href", "#").attr("class", "af-knop").text("print page");
        _.append("li").append("a").attr("href", window.location.href + '/cpb-data-wtm.xlsx').attr("class", "af-knop").text("download data");
        function b(t) {
            var n = y.classed("open")
              , e = r.select(t);
            y.classed("open", !n),
            n ? e.text("show explanation") : e.text("hide explanation")
        }
        y.append("p").text("The CPB World Trade Monitor (WTM) is an instrument for bringing together, aggregating, and summarizing worldwide monthly data on international trade and industrial production."),
        y.append("p").text("In the WTM, ‘trade’ is trade in goods (also referred to as ‘merchandise trade’). ‘Production’ is industrial production, that is: value added in mining, manufacturing, and utilities (also referred to as ‘industry excluding construction’)."),
        y.append("p").text("The production monitor covers 85 countries worldwide. These countries account for about 97% of global industrial production. The trade monitor covers 81 countries. Coverage of world trade is almost 99%."),
        m.on("touchend", (function() {
            b(this),
            r.event.preventDefault(),
            r.event.stopPropagation()
        }
        )).on("click", (function() {
            b(this),
            r.event.preventDefault(),
            r.event.stopPropagation()
        }
        )),
        x.on("touchend", (function() {
            window.print(),
            r.event.preventDefault(),
            r.event.stopPropagation()
        }
        )).on("click", (function() {
            window.print(),
            r.event.preventDefault(),
            r.event.stopPropagation()
        }
        )),
        l.append("h3").text("How has the ");
        var w = l.append("div").attr("class", "af-menu-select")
          , M = w.append("h3").append("a").attr("href", "#").attr("id", "af-menu-huidige-index");
        w.append("ul").selectAll("li").data(n.indexen).enter().append("li").on("touchend", (function(t) {
            r.event.preventDefault(),
            r.select(this.parentNode).classed("open", !1),
            n.huidigeIndex = t,
            C()
        }
        )).on("click", (function(t) {
            n.huidigeIndex = t,
            C()
        }
        )).append("a").attr("href", "#").text((function(t) {
            return t
        }
        ));
        var k = l.append("div").attr("class", "af-menu-select")
          , E = k.append("h3").append("a").attr("href", "#").attr("id", "af-menu-huidige-grootheid");
        k.append("ul").selectAll("li").data(n.grootheden).enter().append("li").attr("id", (function(t) {
            return "af-menu-keuze-" + t
        }
        )).on("touchend", (function(t) {
            r.event.preventDefault(),
            r.select(this.parentNode).classed("open", !1),
            n.huidigeGrootheid = t,
            C()
        }
        )).on("click", (function(t) {
            n.huidigeGrootheid = t,
            C()
        }
        )).append("a").attr("href", "#").text((function(t) {
            return t
        }
        )),
        l.append("h3").text(" changed ");
        var S = l.append("div").attr("class", "af-menu-select")
          , A = S.append("h3").append("a").attr("href", "#").attr("id", "af-menu-huidige-regio");
        S.append("ul").selectAll("li").data(n.eenheden).enter().append("li").on("touchend", (function(t) {
            r.event.preventDefault(),
            r.select(this.parentNode).classed("open", !1),
            n.huidigeEenheid = t,
            C()
        }
        )).on("click", (function(t) {
            n.huidigeEenheid = t,
            C()
        }
        )).append("a").attr("href", "#").text((function(t) {
            return t
        }
        )),
        l.append("h3").text(" in ");
        var N = l.append("div").attr("class", "af-menu-select")
          , T = N.append("h3").append("a").attr("href", "#").attr("id", "af-menu-huidige-regio");
        function C() {
            var t, o = [-2, -1.5, 0, 1.5, 2], a = ["stap1", "stap2", "stap3", "stap4", "stap5", "stap6"];
            "since 2010" == [n.huidigeEenheid] && (o = [-50, -20, 0, 20, 50]),
            "year on year" == [n.huidigeEenheid] && (o = [-5, -2, 0, 2, 5]),
            t = r.scaleThreshold().domain(o).range(a),
            "production" == n.huidigeIndex ? (n.huidigeGrootheid = "volume",
            l.select("#af-menu-keuze-price").style("display", "none")) : l.select("#af-menu-keuze-price").style("display", "block"),
            M.text(n.huidigeIndex),
            E.text(n.huidigeGrootheid),
            A.text(n.huidigeEenheid),
            "world" == n.huidigeRegio || "United States" == n.huidigeRegio || "Euro area" == n.huidigeRegio ? T.text("the " + n.huidigeRegio + "?") : T.text(n.huidigeRegio + "?"),
            l.selectAll(".af-menu-select ul").classed("open", !1);
            var u, c = n.monitor.get(n.huidigeIndex).get(n.huidigeGrootheid).get(n.huidigeRegio)[n.huidigeEenheid], s = c.length - 1, d = c[0].month, y = c[s].month, _ = c[s].value, m = t(_);
            "since 2010" == n.huidigeEenheid && (_ = Math.round(_)),
            _ = r.format("+")(_) + "%",
            h.text(_).attr("class", "af-trend " + m),
            f.attr("class", "af-box af-kolom breedte3 " + m),
            e.drempels(o).stappen(a).huidigeIndex(n.huidigeIndex).huidigeGrootheid(n.huidigeGrootheid).huidigeEenheid(n.huidigeEenheid),
            p.datum(n.kaart).call(e),
            "world" == n.huidigeRegio ? p.selectAll(".regio").classed("niet-geselecteerd", !1).classed("geselecteerd", !1) : (p.selectAll(".regio").classed("niet-geselecteerd", !0),
            p.selectAll("#" + (u = n.huidigeRegio,
            (u = (u = u.replace(/ /g, "")).replace(/\//g, "")).toLowerCase())).classed("niet-geselecteerd", !1).classed("geselecteerd", !0)),
            "since 2010" == n.huidigeEenheid && v.text("Overall change in " + n.huidigeIndex + " " + n.huidigeGrootheid + " since 2010"),
            "last month" == n.huidigeEenheid && v.text("Monthly change in " + n.huidigeIndex + " " + n.huidigeGrootheid + " since 2010"),
            "last three months" == n.huidigeEenheid && v.text("Three monthly change in " + n.huidigeIndex + " " + n.huidigeGrootheid + " since 2010"),
            "year on year" == n.huidigeEenheid && v.text("Change in " + n.huidigeIndex + " " + n.huidigeGrootheid + " vs same month last year, since 2011"),
            i.drempels(o).stappen(a).waardenXas([d, y]).huidigeIndex(n.huidigeIndex).huidigeGrootheid(n.huidigeGrootheid).huidigeEenheid(n.huidigeEenheid).huidigeRegio(n.huidigeRegio),
            "since 2010" === n.huidigeEenheid ? "production" === n.huidigeIndex ? i.waardenYas([-30, -20, -10, 0, 10, 20, 30, 40, 50]) : i.waardenYas([-30, -20, -10, 0, 10, 20, 30]) : i.waardenYas(void 0),
            g.datum(n.monitor.get(n.huidigeIndex).get(n.huidigeGrootheid).get(n.huidigeRegio)[n.huidigeEenheid]).call(i)
        }
        N.append("ul").selectAll("li").data(n.regios).enter().append("li").on("touchend", (function(t) {
            r.event.preventDefault(),
            r.select(this.parentNode).classed("open", !1),
            n.huidigeRegio = t,
            C()
        }
        )).on("click", (function(t) {
            n.huidigeRegio = t,
            C()
        }
        )).append("a").attr("href", "#").text((function(t) {
            return "world" == t || "United States" == t || "United Kingdom" == t || "Euro area" == t ? "the " + t : t
        }
        )),
        l.selectAll(".af-menu-select h3").on("mouseenter", (function() {
            r.select(this.parentNode).select("ul").classed("open", !0)
        }
        )).on("click", (function(t) {
            l.selectAll("ul").classed("open", !1),
            r.select(this.parentNode).select("ul").classed("open", !0)
        }
        )).on("focusin", (function(t) {
            l.selectAll("ul").classed("open", !1),
            r.select(this.parentNode).select("ul").classed("open", !0)
        }
        )),
        l.selectAll(".af-menu-select").on("mouseleave", (function() {
            l.selectAll("ul").classed("open", !1)
        }
        )),
        l.selectAll("a").on("click", (function() {
            this.blur(),
            r.event.preventDefault()
        }
        )),
        o.selectAll(".af-knop").on("focusin", (function() {
            l.selectAll("ul").classed("open", !1)
        }
        )),
        r.json(Ue, (function(t, r) {
            if (t)
                return console.warn(t);
            e.geodata(r).regio("land"),
            p.call(e),
            p.selectAll(".land").on("touchend.controller", (function(t) {
                null == t.properties.regio ? n.huidigeRegio = "world" : n.huidigeRegio = t.properties.regio,
                C()
            }
            )).on("click.controller", (function(t) {
                null == t.properties.regio ? n.huidigeRegio = "world" : n.huidigeRegio = t.properties.regio,
                C()
            }
            )),
            p.selectAll(".graticule").on("touchend.controller", (function(t) {
                n.huidigeRegio = "world",
                C()
            }
            )).on("click.controller", (function(t) {
                n.huidigeRegio = "world",
                C()
            }
            ))
        }
        )),
        r.csv(De, (function(t, e) {
            if (t)
                return console.warn(t);
            n.monitor = r.nest().key((function(t) {
                return t.index
            }
            )).key((function(t) {
                return "price" == t.grootheid || "value" == t.grootheid ? "price" : t.grootheid
            }
            )).key((function(t) {
                return "Central and Eastern Europe" === t.regio ? "Eastern Europe / CIS" : n.regios.filter((function(n) {
                    return n.toLowerCase() == t.regio.toLowerCase()
                }
                ))
            }
            )).rollup((function(t) {
                var n = t[0];
                t["since 2010"] = [],
                t["last month"] = [],
                t["last three months"] = [],
                t["year on year"] = [];
                var e = 0
                  , r = [];
                for (var i in n)
                    if ("index" !== i && "grootheid" !== i && "regio" !== i) {
                        var o, a, u, c, s = +n[i];
                        if (r.unshift(s),
                        o = 0 == e ? void 0 : qe((s - e) / e * 100),
                        a = r.length < 6 ? void 0 : qe(((r[0] + r[1] + r[2]) / 3 - (c = (r[3] + r[4] + r[5]) / 3)) / c * 100),
                        r.length < 13)
                            u = void 0;
                        else {
                            var l = r[12];
                            u = qe((s - l) / l * 100)
                        }
                        t["since 2010"].push({
                            month: i,
                            value: qe(s - 100)
                        }),
                        t["last month"].push({
                            month: i,
                            value: o
                        }),
                        a && t["last three months"].push({
                            month: i,
                            value: a
                        }),
                        u && t["year on year"].push({
                            month: i,
                            value: u
                        }),
                        e = +n[i]
                    }
                return delete t[0],
                t
            }
            )).map(e),
            n.aantalmaanden = n.monitor.get(n.huidigeIndex).get(n.huidigeGrootheid).get(n.huidigeRegio)[n.huidigeEenheid].length - 1,
            n.kaart = [],
            n.regios.forEach((function(t) {
                var e = {};
                e.id = t;
                for (var r = n.indexen.length - 1; r >= 0; r--) {
                    var i = n.indexen[r];
                    e[i] = {};
                    for (var o = n.grootheden.length - 1; o >= 0; o--) {
                        var a = n.grootheden[o];
                        e[i][a] = {};
                        for (var u = n.eenheden.length - 1; u >= 0; u--) {
                            var c = n.eenheden[u];
                            if (n.monitor.get(i).get(a)) {
                                var s = n.monitor.get(i).get(a).get(t)[c].length;
                                e[i][a][c] = n.monitor.get(i).get(a).get(t)[c][s - 1].value
                            }
                        }
                    }
                }
                "world" !== t && "advanced" !== t && "emerging" !== t && n.kaart.push(e)
            }
            )),
            C()
        }
        ))
    }
    ))
}
]);
