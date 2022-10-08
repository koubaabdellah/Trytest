//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.moment=b()}(this,function(){"use strict";function a(){return fd.apply(null,arguments)}function b(a){fd=a}function c(a){return a instanceof Array||"[object Array]"===Object.prototype.toString.call(a)}function d(a){return a instanceof Date||"[object Date]"===Object.prototype.toString.call(a)}function e(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function f(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function g(a,b){for(var c in b)f(b,c)&&(a[c]=b[c]);return f(b,"toString")&&(a.toString=b.toString),f(b,"valueOf")&&(a.valueOf=b.valueOf),a}function h(a,b,c,d){return Ja(a,b,c,d,!0).utc()}function i(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1,parsedDateParts:[],meridiem:null}}function j(a){return null==a._pf&&(a._pf=i()),a._pf}function k(a){if(null==a._isValid){var b=j(a),c=gd.call(b.parsedDateParts,function(a){return null!=a});a._isValid=!isNaN(a._d.getTime())&&b.overflow<0&&!b.empty&&!b.invalidMonth&&!b.invalidWeekday&&!b.nullInput&&!b.invalidFormat&&!b.userInvalidated&&(!b.meridiem||b.meridiem&&c),a._strict&&(a._isValid=a._isValid&&0===b.charsLeftOver&&0===b.unusedTokens.length&&void 0===b.bigHour)}return a._isValid}function l(a){var b=h(NaN);return null!=a?g(j(b),a):j(b).userInvalidated=!0,b}function m(a){return void 0===a}function n(a,b){var c,d,e;if(m(b._isAMomentObject)||(a._isAMomentObject=b._isAMomentObject),m(b._i)||(a._i=b._i),m(b._f)||(a._f=b._f),m(b._l)||(a._l=b._l),m(b._strict)||(a._strict=b._strict),m(b._tzm)||(a._tzm=b._tzm),m(b._isUTC)||(a._isUTC=b._isUTC),m(b._offset)||(a._offset=b._offset),m(b._pf)||(a._pf=j(b)),m(b._locale)||(a._locale=b._locale),hd.length>0)for(c in hd)d=hd[c],e=b[d],m(e)||(a[d]=e);return a}function o(b){n(this,b),this._d=new Date(null!=b._d?b._d.getTime():NaN),id===!1&&(id=!0,a.updateOffset(this),id=!1)}function p(a){return a instanceof o||null!=a&&null!=a._isAMomentObject}function q(a){return 0>a?Math.ceil(a):Math.floor(a)}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=q(b)),c}function s(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function t(b){a.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+b)}function u(b,c){var d=!0;return g(function(){return null!=a.deprecationHandler&&a.deprecationHandler(null,b),d&&(t(b+"\nArguments: "+Array.prototype.slice.call(arguments).join(", ")+"\n"+(new Error).stack),d=!1),c.apply(this,arguments)},c)}function v(b,c){null!=a.deprecationHandler&&a.deprecationHandler(b,c),jd[b]||(t(c),jd[b]=!0)}function w(a){return a instanceof Function||"[object Function]"===Object.prototype.toString.call(a)}function x(a){return"[object Object]"===Object.prototype.toString.call(a)}function y(a){var b,c;for(c in a)b=a[c],w(b)?this[c]=b:this["_"+c]=b;this._config=a,this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)}function z(a,b){var c,d=g({},a);for(c in b)f(b,c)&&(x(a[c])&&x(b[c])?(d[c]={},g(d[c],a[c]),g(d[c],b[c])):null!=b[c]?d[c]=b[c]:delete d[c]);return d}function A(a){null!=a&&this.set(a)}function B(a){return a?a.toLowerCase().replace("_","-"):a}function C(a){for(var b,c,d,e,f=0;f<a.length;){for(e=B(a[f]).split("-"),b=e.length,c=B(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=D(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&s(e,c,!0)>=b-1)break;b--}f++}return null}function D(a){var b=null;if(!nd[a]&&"undefined"!=typeof module&&module&&module.exports)try{b=ld._abbr,require("./locale/"+a),E(b)}catch(c){}return nd[a]}function E(a,b){var c;return a&&(c=m(b)?H(a):F(a,b),c&&(ld=c)),ld._abbr}function F(a,b){return null!==b?(b.abbr=a,null!=nd[a]?(v("defineLocaleOverride","use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale"),b=z(nd[a]._config,b)):null!=b.parentLocale&&(null!=nd[b.parentLocale]?b=z(nd[b.parentLocale]._config,b):v("parentLocaleUndefined","specified parentLocale is not defined yet")),nd[a]=new A(b),E(a),nd[a]):(delete nd[a],null)}function G(a,b){if(null!=b){var c;null!=nd[a]&&(b=z(nd[a]._config,b)),c=new A(b),c.parentLocale=nd[a],nd[a]=c,E(a)}else null!=nd[a]&&(null!=nd[a].parentLocale?nd[a]=nd[a].parentLocale:null!=nd[a]&&delete nd[a]);return nd[a]}function H(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return ld;if(!c(a)){if(b=D(a))return b;a=[a]}return C(a)}function I(){return kd(nd)}function J(a,b){var c=a.toLowerCase();od[c]=od[c+"s"]=od[b]=a}function K(a){return"string"==typeof a?od[a]||od[a.toLowerCase()]:void 0}function L(a){var b,c,d={};for(c in a)f(a,c)&&(b=K(c),b&&(d[b]=a[c]));return d}function M(b,c){return function(d){return null!=d?(O(this,b,d),a.updateOffset(this,c),this):N(this,b)}}function N(a,b){return a.isValid()?a._d["get"+(a._isUTC?"UTC":"")+b]():NaN}function O(a,b,c){a.isValid()&&a._d["set"+(a._isUTC?"UTC":"")+b](c)}function P(a,b){var c;if("object"==typeof a)for(c in a)this.set(c,a[c]);else if(a=K(a),w(this[a]))return this[a](b);return this}function Q(a,b,c){var d=""+Math.abs(a),e=b-d.length,f=a>=0;return(f?c?"+":"":"-")+Math.pow(10,Math.max(0,e)).toString().substr(1)+d}function R(a,b,c,d){var e=d;"string"==typeof d&&(e=function(){return this[d]()}),a&&(sd[a]=e),b&&(sd[b[0]]=function(){return Q(e.apply(this,arguments),b[1],b[2])}),c&&(sd[c]=function(){return this.localeData().ordinal(e.apply(this,arguments),a)})}function S(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function T(a){var b,c,d=a.match(pd);for(b=0,c=d.length;c>b;b++)sd[d[b]]?d[b]=sd[d[b]]:d[b]=S(d[b]);return function(b){var e,f="";for(e=0;c>e;e++)f+=d[e]instanceof Function?d[e].call(b,a):d[e];return f}}function U(a,b){return a.isValid()?(b=V(b,a.localeData()),rd[b]=rd[b]||T(b),rd[b](a)):a.localeData().invalidDate()}function V(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(qd.lastIndex=0;d>=0&&qd.test(a);)a=a.replace(qd,c),qd.lastIndex=0,d-=1;return a}function W(a,b,c){Kd[a]=w(b)?b:function(a,d){return a&&c?c:b}}function X(a,b){return f(Kd,a)?Kd[a](b._strict,b._locale):new RegExp(Y(a))}function Y(a){return Z(a.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e}))}function Z(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function $(a,b){var c,d=b;for("string"==typeof a&&(a=[a]),"number"==typeof b&&(d=function(a,c){c[b]=r(a)}),c=0;c<a.length;c++)Ld[a[c]]=d}function _(a,b){$(a,function(a,c,d,e){d._w=d._w||{},b(a,d._w,d,e)})}function aa(a,b,c){null!=b&&f(Ld,a)&&Ld[a](b,c._a,c,a)}function ba(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function ca(a,b){return c(this._months)?this._months[a.month()]:this._months[Vd.test(b)?"format":"standalone"][a.month()]}function da(a,b){return c(this._monthsShort)?this._monthsShort[a.month()]:this._monthsShort[Vd.test(b)?"format":"standalone"][a.month()]}function ea(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._monthsParse)for(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[],d=0;12>d;++d)f=h([2e3,d]),this._shortMonthsParse[d]=this.monthsShort(f,"").toLocaleLowerCase(),this._longMonthsParse[d]=this.months(f,"").toLocaleLowerCase();return c?"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:null):(e=md.call(this._longMonthsParse,g),-1!==e?e:null):"MMM"===b?(e=md.call(this._shortMonthsParse,g),-1!==e?e:(e=md.call(this._longMonthsParse,g),-1!==e?e:null)):(e=md.call(this._longMonthsParse,g),-1!==e?e:(e=md.call(this._shortMonthsParse,g),-1!==e?e:null))}function fa(a,b,c){var d,e,f;if(this._monthsParseExact)return ea.call(this,a,b,c);for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),d=0;12>d;d++){if(e=h([2e3,d]),c&&!this._longMonthsParse[d]&&(this._longMonthsParse[d]=new RegExp("^"+this.months(e,"").replace(".","")+"$","i"),this._shortMonthsParse[d]=new RegExp("^"+this.monthsShort(e,"").replace(".","")+"$","i")),c||this._monthsParse[d]||(f="^"+this.months(e,"")+"|^"+this.monthsShort(e,""),this._monthsParse[d]=new RegExp(f.replace(".",""),"i")),c&&"MMMM"===b&&this._longMonthsParse[d].test(a))return d;if(c&&"MMM"===b&&this._shortMonthsParse[d].test(a))return d;if(!c&&this._monthsParse[d].test(a))return d}}function ga(a,b){var c;if(!a.isValid())return a;if("string"==typeof b)if(/^\d+$/.test(b))b=r(b);else if(b=a.localeData().monthsParse(b),"number"!=typeof b)return a;return c=Math.min(a.date(),ba(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a}function ha(b){return null!=b?(ga(this,b),a.updateOffset(this,!0),this):N(this,"Month")}function ia(){return ba(this.year(),this.month())}function ja(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsShortStrictRegex:this._monthsShortRegex):this._monthsShortStrictRegex&&a?this._monthsShortStrictRegex:this._monthsShortRegex}function ka(a){return this._monthsParseExact?(f(this,"_monthsRegex")||la.call(this),a?this._monthsStrictRegex:this._monthsRegex):this._monthsStrictRegex&&a?this._monthsStrictRegex:this._monthsRegex}function la(){function a(a,b){return b.length-a.length}var b,c,d=[],e=[],f=[];for(b=0;12>b;b++)c=h([2e3,b]),d.push(this.monthsShort(c,"")),e.push(this.months(c,"")),f.push(this.months(c,"")),f.push(this.monthsShort(c,""));for(d.sort(a),e.sort(a),f.sort(a),b=0;12>b;b++)d[b]=Z(d[b]),e[b]=Z(e[b]),f[b]=Z(f[b]);this._monthsRegex=new RegExp("^("+f.join("|")+")","i"),this._monthsShortRegex=this._monthsRegex,this._monthsStrictRegex=new RegExp("^("+e.join("|")+")","i"),this._monthsShortStrictRegex=new RegExp("^("+d.join("|")+")","i")}function ma(a){var b,c=a._a;return c&&-2===j(a).overflow&&(b=c[Nd]<0||c[Nd]>11?Nd:c[Od]<1||c[Od]>ba(c[Md],c[Nd])?Od:c[Pd]<0||c[Pd]>24||24===c[Pd]&&(0!==c[Qd]||0!==c[Rd]||0!==c[Sd])?Pd:c[Qd]<0||c[Qd]>59?Qd:c[Rd]<0||c[Rd]>59?Rd:c[Sd]<0||c[Sd]>999?Sd:-1,j(a)._overflowDayOfYear&&(Md>b||b>Od)&&(b=Od),j(a)._overflowWeeks&&-1===b&&(b=Td),j(a)._overflowWeekday&&-1===b&&(b=Ud),j(a).overflow=b),a}function na(a){var b,c,d,e,f,g,h=a._i,i=$d.exec(h)||_d.exec(h);if(i){for(j(a).iso=!0,b=0,c=be.length;c>b;b++)if(be[b][1].exec(i[1])){e=be[b][0],d=be[b][2]!==!1;break}if(null==e)return void(a._isValid=!1);if(i[3]){for(b=0,c=ce.length;c>b;b++)if(ce[b][1].exec(i[3])){f=(i[2]||" ")+ce[b][0];break}if(null==f)return void(a._isValid=!1)}if(!d&&null!=f)return void(a._isValid=!1);if(i[4]){if(!ae.exec(i[4]))return void(a._isValid=!1);g="Z"}a._f=e+(f||"")+(g||""),Ca(a)}else a._isValid=!1}function oa(b){var c=de.exec(b._i);return null!==c?void(b._d=new Date(+c[1])):(na(b),void(b._isValid===!1&&(delete b._isValid,a.createFromInputFallback(b))))}function pa(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 100>a&&a>=0&&isFinite(h.getFullYear())&&h.setFullYear(a),h}function qa(a){var b=new Date(Date.UTC.apply(null,arguments));return 100>a&&a>=0&&isFinite(b.getUTCFullYear())&&b.setUTCFullYear(a),b}function ra(a){return sa(a)?366:365}function sa(a){return a%4===0&&a%100!==0||a%400===0}function ta(){return sa(this.year())}function ua(a,b,c){var d=7+b-c,e=(7+qa(a,0,d).getUTCDay()-b)%7;return-e+d-1}function va(a,b,c,d,e){var f,g,h=(7+c-d)%7,i=ua(a,d,e),j=1+7*(b-1)+h+i;return 0>=j?(f=a-1,g=ra(f)+j):j>ra(a)?(f=a+1,g=j-ra(a)):(f=a,g=j),{year:f,dayOfYear:g}}function wa(a,b,c){var d,e,f=ua(a.year(),b,c),g=Math.floor((a.dayOfYear()-f-1)/7)+1;return 1>g?(e=a.year()-1,d=g+xa(e,b,c)):g>xa(a.year(),b,c)?(d=g-xa(a.year(),b,c),e=a.year()+1):(e=a.year(),d=g),{week:d,year:e}}function xa(a,b,c){var d=ua(a,b,c),e=ua(a+1,b,c);return(ra(a)-d+e)/7}function ya(a,b,c){return null!=a?a:null!=b?b:c}function za(b){var c=new Date(a.now());return b._useUTC?[c.getUTCFullYear(),c.getUTCMonth(),c.getUTCDate()]:[c.getFullYear(),c.getMonth(),c.getDate()]}function Aa(a){var b,c,d,e,f=[];if(!a._d){for(d=za(a),a._w&&null==a._a[Od]&&null==a._a[Nd]&&Ba(a),a._dayOfYear&&(e=ya(a._a[Md],d[Md]),a._dayOfYear>ra(e)&&(j(a)._overflowDayOfYear=!0),c=qa(e,0,a._dayOfYear),a._a[Nd]=c.getUTCMonth(),a._a[Od]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=f[b]=d[b];for(;7>b;b++)a._a[b]=f[b]=null==a._a[b]?2===b?1:0:a._a[b];24===a._a[Pd]&&0===a._a[Qd]&&0===a._a[Rd]&&0===a._a[Sd]&&(a._nextDay=!0,a._a[Pd]=0),a._d=(a._useUTC?qa:pa).apply(null,f),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()-a._tzm),a._nextDay&&(a._a[Pd]=24)}}function Ba(a){var b,c,d,e,f,g,h,i;b=a._w,null!=b.GG||null!=b.W||null!=b.E?(f=1,g=4,c=ya(b.GG,a._a[Md],wa(Ka(),1,4).year),d=ya(b.W,1),e=ya(b.E,1),(1>e||e>7)&&(i=!0)):(f=a._locale._week.dow,g=a._locale._week.doy,c=ya(b.gg,a._a[Md],wa(Ka(),f,g).year),d=ya(b.w,1),null!=b.d?(e=b.d,(0>e||e>6)&&(i=!0)):null!=b.e?(e=b.e+f,(b.e<0||b.e>6)&&(i=!0)):e=f),1>d||d>xa(c,f,g)?j(a)._overflowWeeks=!0:null!=i?j(a)._overflowWeekday=!0:(h=va(c,d,e,f,g),a._a[Md]=h.year,a._dayOfYear=h.dayOfYear)}function Ca(b){if(b._f===a.ISO_8601)return void na(b);b._a=[],j(b).empty=!0;var c,d,e,f,g,h=""+b._i,i=h.length,k=0;for(e=V(b._f,b._locale).match(pd)||[],c=0;c<e.length;c++)f=e[c],d=(h.match(X(f,b))||[])[0],d&&(g=h.substr(0,h.indexOf(d)),g.length>0&&j(b).unusedInput.push(g),h=h.slice(h.indexOf(d)+d.length),k+=d.length),sd[f]?(d?j(b).empty=!1:j(b).unusedTokens.push(f),aa(f,d,b)):b._strict&&!d&&j(b).unusedTokens.push(f);j(b).charsLeftOver=i-k,h.length>0&&j(b).unusedInput.push(h),j(b).bigHour===!0&&b._a[Pd]<=12&&b._a[Pd]>0&&(j(b).bigHour=void 0),j(b).parsedDateParts=b._a.slice(0),j(b).meridiem=b._meridiem,b._a[Pd]=Da(b._locale,b._a[Pd],b._meridiem),Aa(b),ma(b)}function Da(a,b,c){var d;return null==c?b:null!=a.meridiemHour?a.meridiemHour(b,c):null!=a.isPM?(d=a.isPM(c),d&&12>b&&(b+=12),d||12!==b||(b=0),b):b}function Ea(a){var b,c,d,e,f;if(0===a._f.length)return j(a).invalidFormat=!0,void(a._d=new Date(NaN));for(e=0;e<a._f.length;e++)f=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._f=a._f[e],Ca(b),k(b)&&(f+=j(b).charsLeftOver,f+=10*j(b).unusedTokens.length,j(b).score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Fa(a){if(!a._d){var b=L(a._i);a._a=e([b.year,b.month,b.day||b.date,b.hour,b.minute,b.second,b.millisecond],function(a){return a&&parseInt(a,10)}),Aa(a)}}function Ga(a){var b=new o(ma(Ha(a)));return b._nextDay&&(b.add(1,"d"),b._nextDay=void 0),b}function Ha(a){var b=a._i,e=a._f;return a._locale=a._locale||H(a._l),null===b||void 0===e&&""===b?l({nullInput:!0}):("string"==typeof b&&(a._i=b=a._locale.preparse(b)),p(b)?new o(ma(b)):(c(e)?Ea(a):e?Ca(a):d(b)?a._d=b:Ia(a),k(a)||(a._d=null),a))}function Ia(b){var f=b._i;void 0===f?b._d=new Date(a.now()):d(f)?b._d=new Date(f.valueOf()):"string"==typeof f?oa(b):c(f)?(b._a=e(f.slice(0),function(a){return parseInt(a,10)}),Aa(b)):"object"==typeof f?Fa(b):"number"==typeof f?b._d=new Date(f):a.createFromInputFallback(b)}function Ja(a,b,c,d,e){var f={};return"boolean"==typeof c&&(d=c,c=void 0),f._isAMomentObject=!0,f._useUTC=f._isUTC=e,f._l=c,f._i=a,f._f=b,f._strict=d,Ga(f)}function Ka(a,b,c,d){return Ja(a,b,c,d,!1)}function La(a,b){var d,e;if(1===b.length&&c(b[0])&&(b=b[0]),!b.length)return Ka();for(d=b[0],e=1;e<b.length;++e)(!b[e].isValid()||b[e][a](d))&&(d=b[e]);return d}function Ma(){var a=[].slice.call(arguments,0);return La("isBefore",a)}function Na(){var a=[].slice.call(arguments,0);return La("isAfter",a)}function Oa(a){var b=L(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+1e3*h*60*60,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=H(),this._bubble()}function Pa(a){return a instanceof Oa}function Qa(a,b){R(a,0,0,function(){var a=this.utcOffset(),c="+";return 0>a&&(a=-a,c="-"),c+Q(~~(a/60),2)+b+Q(~~a%60,2)})}function Ra(a,b){var c=(b||"").match(a)||[],d=c[c.length-1]||[],e=(d+"").match(ie)||["-",0,0],f=+(60*e[1])+r(e[2]);return"+"===e[0]?f:-f}function Sa(b,c){var e,f;return c._isUTC?(e=c.clone(),f=(p(b)||d(b)?b.valueOf():Ka(b).valueOf())-e.valueOf(),e._d.setTime(e._d.valueOf()+f),a.updateOffset(e,!1),e):Ka(b).local()}function Ta(a){return 15*-Math.round(a._d.getTimezoneOffset()/15)}function Ua(b,c){var d,e=this._offset||0;return this.isValid()?null!=b?("string"==typeof b?b=Ra(Hd,b):Math.abs(b)<16&&(b=60*b),!this._isUTC&&c&&(d=Ta(this)),this._offset=b,this._isUTC=!0,null!=d&&this.add(d,"m"),e!==b&&(!c||this._changeInProgress?jb(this,db(b-e,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,a.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?e:Ta(this):null!=b?this:NaN}function Va(a,b){return null!=a?("string"!=typeof a&&(a=-a),this.utcOffset(a,b),this):-this.utcOffset()}function Wa(a){return this.utcOffset(0,a)}function Xa(a){return this._isUTC&&(this.utcOffset(0,a),this._isUTC=!1,a&&this.subtract(Ta(this),"m")),this}function Ya(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Ra(Gd,this._i)),this}function Za(a){return this.isValid()?(a=a?Ka(a).utcOffset():0,(this.utcOffset()-a)%60===0):!1}function $a(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()}function _a(){if(!m(this._isDSTShifted))return this._isDSTShifted;var a={};if(n(a,this),a=Ha(a),a._a){var b=a._isUTC?h(a._a):Ka(a._a);this._isDSTShifted=this.isValid()&&s(a._a,b.toArray())>0}else this._isDSTShifted=!1;return this._isDSTShifted}function ab(){return this.isValid()?!this._isUTC:!1}function bb(){return this.isValid()?this._isUTC:!1}function cb(){return this.isValid()?this._isUTC&&0===this._offset:!1}function db(a,b){var c,d,e,g=a,h=null;return Pa(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=je.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[Od])*c,h:r(h[Pd])*c,m:r(h[Qd])*c,s:r(h[Rd])*c,ms:r(h[Sd])*c}):(h=ke.exec(a))?(c="-"===h[1]?-1:1,g={y:eb(h[2],c),M:eb(h[3],c),w:eb(h[4],c),d:eb(h[5],c),h:eb(h[6],c),m:eb(h[7],c),s:eb(h[8],c)}):null==g?g={}:"object"==typeof g&&("from"in g||"to"in g)&&(e=gb(Ka(g.from),Ka(g.to)),g={},g.ms=e.milliseconds,g.M=e.months),d=new Oa(g),Pa(a)&&f(a,"_locale")&&(d._locale=a._locale),d}function eb(a,b){var c=a&&parseFloat(a.replace(",","."));return(isNaN(c)?0:c)*b}function fb(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function gb(a,b){var c;return a.isValid()&&b.isValid()?(b=Sa(b,a),a.isBefore(b)?c=fb(a,b):(c=fb(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c):{milliseconds:0,months:0}}function hb(a){return 0>a?-1*Math.round(-1*a):Math.round(a)}function ib(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(v(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=db(c,d),jb(this,e,a),this}}function jb(b,c,d,e){var f=c._milliseconds,g=hb(c._days),h=hb(c._months);b.isValid()&&(e=null==e?!0:e,f&&b._d.setTime(b._d.valueOf()+f*d),g&&O(b,"Date",N(b,"Date")+g*d),h&&ga(b,N(b,"Month")+h*d),e&&a.updateOffset(b,g||h))}function kb(a,b){var c=a||Ka(),d=Sa(c,this).startOf("day"),e=this.diff(d,"days",!0),f=-6>e?"sameElse":-1>e?"lastWeek":0>e?"lastDay":1>e?"sameDay":2>e?"nextDay":7>e?"nextWeek":"sameElse",g=b&&(w(b[f])?b[f]():b[f]);return this.format(g||this.localeData().calendar(f,this,Ka(c)))}function lb(){return new o(this)}function mb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()>c.valueOf():c.valueOf()<this.clone().startOf(b).valueOf()):!1}function nb(a,b){var c=p(a)?a:Ka(a);return this.isValid()&&c.isValid()?(b=K(m(b)?"millisecond":b),"millisecond"===b?this.valueOf()<c.valueOf():this.clone().endOf(b).valueOf()<c.valueOf()):!1}function ob(a,b,c,d){return d=d||"()",("("===d[0]?this.isAfter(a,c):!this.isBefore(a,c))&&(")"===d[1]?this.isBefore(b,c):!this.isAfter(b,c))}function pb(a,b){var c,d=p(a)?a:Ka(a);return this.isValid()&&d.isValid()?(b=K(b||"millisecond"),"millisecond"===b?this.valueOf()===d.valueOf():(c=d.valueOf(),this.clone().startOf(b).valueOf()<=c&&c<=this.clone().endOf(b).valueOf())):!1}function qb(a,b){return this.isSame(a,b)||this.isAfter(a,b)}function rb(a,b){return this.isSame(a,b)||this.isBefore(a,b)}function sb(a,b,c){var d,e,f,g;return this.isValid()?(d=Sa(a,this),d.isValid()?(e=6e4*(d.utcOffset()-this.utcOffset()),b=K(b),"year"===b||"month"===b||"quarter"===b?(g=tb(this,d),"quarter"===b?g/=3:"year"===b&&(g/=12)):(f=this-d,g="second"===b?f/1e3:"minute"===b?f/6e4:"hour"===b?f/36e5:"day"===b?(f-e)/864e5:"week"===b?(f-e)/6048e5:f),c?g:q(g)):NaN):NaN}function tb(a,b){var c,d,e=12*(b.year()-a.year())+(b.month()-a.month()),f=a.clone().add(e,"months");return 0>b-f?(c=a.clone().add(e-1,"months"),d=(b-f)/(f-c)):(c=a.clone().add(e+1,"months"),d=(b-f)/(c-f)),-(e+d)||0}function ub(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")}function vb(){var a=this.clone().utc();return 0<a.year()&&a.year()<=9999?w(Date.prototype.toISOString)?this.toDate().toISOString():U(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):U(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function wb(b){b||(b=this.isUtc()?a.defaultFormatUtc:a.defaultFormat);var c=U(this,b);return this.localeData().postformat(c)}function xb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({to:this,from:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function yb(a){return this.from(Ka(),a)}function zb(a,b){return this.isValid()&&(p(a)&&a.isValid()||Ka(a).isValid())?db({from:this,to:a}).locale(this.locale()).humanize(!b):this.localeData().invalidDate()}function Ab(a){return this.to(Ka(),a)}function Bb(a){var b;return void 0===a?this._locale._abbr:(b=H(a),null!=b&&(this._locale=b),this)}function Cb(){return this._locale}function Db(a){switch(a=K(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":case"date":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a&&this.weekday(0),"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this}function Eb(a){return a=K(a),void 0===a||"millisecond"===a?this:("date"===a&&(a="day"),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms"))}function Fb(){return this._d.valueOf()-6e4*(this._offset||0)}function Gb(){return Math.floor(this.valueOf()/1e3)}function Hb(){return this._offset?new Date(this.valueOf()):this._d}function Ib(){var a=this;return[a.year(),a.month(),a.date(),a.hour(),a.minute(),a.second(),a.millisecond()]}function Jb(){var a=this;return{years:a.year(),months:a.month(),date:a.date(),hours:a.hours(),minutes:a.minutes(),seconds:a.seconds(),milliseconds:a.milliseconds()}}function Kb(){return this.isValid()?this.toISOString():null}function Lb(){return k(this)}function Mb(){return g({},j(this))}function Nb(){return j(this).overflow}function Ob(){return{input:this._i,format:this._f,locale:this._locale,isUTC:this._isUTC,strict:this._strict}}function Pb(a,b){R(0,[a,a.length],0,b)}function Qb(a){return Ub.call(this,a,this.week(),this.weekday(),this.localeData()._week.dow,this.localeData()._week.doy)}function Rb(a){return Ub.call(this,a,this.isoWeek(),this.isoWeekday(),1,4)}function Sb(){return xa(this.year(),1,4)}function Tb(){var a=this.localeData()._week;return xa(this.year(),a.dow,a.doy)}function Ub(a,b,c,d,e){var f;return null==a?wa(this,d,e).year:(f=xa(a,d,e),b>f&&(b=f),Vb.call(this,a,b,c,d,e))}function Vb(a,b,c,d,e){var f=va(a,b,c,d,e),g=qa(f.year,0,f.dayOfYear);return this.year(g.getUTCFullYear()),this.month(g.getUTCMonth()),this.date(g.getUTCDate()),this}function Wb(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)}function Xb(a){return wa(a,this._week.dow,this._week.doy).week}function Yb(){return this._week.dow}function Zb(){return this._week.doy}function $b(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")}function _b(a){var b=wa(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")}function ac(a,b){return"string"!=typeof a?a:isNaN(a)?(a=b.weekdaysParse(a),"number"==typeof a?a:null):parseInt(a,10)}function bc(a,b){return c(this._weekdays)?this._weekdays[a.day()]:this._weekdays[this._weekdays.isFormat.test(b)?"format":"standalone"][a.day()]}function cc(a){return this._weekdaysShort[a.day()]}function dc(a){return this._weekdaysMin[a.day()]}function ec(a,b,c){var d,e,f,g=a.toLocaleLowerCase();if(!this._weekdaysParse)for(this._weekdaysParse=[],this._shortWeekdaysParse=[],this._minWeekdaysParse=[],d=0;7>d;++d)f=h([2e3,1]).day(d),this._minWeekdaysParse[d]=this.weekdaysMin(f,"").toLocaleLowerCase(),this._shortWeekdaysParse[d]=this.weekdaysShort(f,"").toLocaleLowerCase(),this._weekdaysParse[d]=this.weekdays(f,"").toLocaleLowerCase();return c?"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:null):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null):"dddd"===b?(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):"ddd"===b?(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._minWeekdaysParse,g),-1!==e?e:null))):(e=md.call(this._minWeekdaysParse,g),-1!==e?e:(e=md.call(this._weekdaysParse,g),-1!==e?e:(e=md.call(this._shortWeekdaysParse,g),-1!==e?e:null)))}function fc(a,b,c){var d,e,f;if(this._weekdaysParseExact)return ec.call(this,a,b,c);for(this._weekdaysParse||(this._weekdaysParse=[],this._minWeekdaysParse=[],this._shortWeekdaysParse=[],this._fullWeekdaysParse=[]),d=0;7>d;d++){if(e=h([2e3,1]).day(d),c&&!this._fullWeekdaysParse[d]&&(this._fullWeekdaysParse[d]=new RegExp("^"+this.weekdays(e,"").replace(".",".?")+"$","i"),this._shortWeekdaysParse[d]=new RegExp("^"+this.weekdaysShort(e,"").replace(".",".?")+"$","i"),this._minWeekdaysParse[d]=new RegExp("^"+this.weekdaysMin(e,"").replace(".",".?")+"$","i")),this._weekdaysParse[d]||(f="^"+this.weekdays(e,"")+"|^"+this.weekdaysShort(e,"")+"|^"+this.weekdaysMin(e,""),this._weekdaysParse[d]=new RegExp(f.replace(".",""),"i")),c&&"dddd"===b&&this._fullWeekdaysParse[d].test(a))return d;if(c&&"ddd"===b&&this._shortWeekdaysParse[d].test(a))return d;if(c&&"dd"===b&&this._minWeekdaysParse[d].test(a))return d;if(!c&&this._weekdaysParse[d].test(a))return d}}function gc(a){if(!this.isValid())return null!=a?this:NaN;var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=ac(a,this.localeData()),this.add(a-b,"d")):b}function hc(a){if(!this.isValid())return null!=a?this:NaN;var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")}function ic(a){return this.isValid()?null==a?this.day()||7:this.day(this.day()%7?a:a-7):null!=a?this:NaN}function jc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysStrictRegex:this._weekdaysRegex):this._weekdaysStrictRegex&&a?this._weekdaysStrictRegex:this._weekdaysRegex}function kc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex):this._weekdaysShortStrictRegex&&a?this._weekdaysShortStrictRegex:this._weekdaysShortRegex}function lc(a){return this._weekdaysParseExact?(f(this,"_weekdaysRegex")||mc.call(this),a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex):this._weekdaysMinStrictRegex&&a?this._weekdaysMinStrictRegex:this._weekdaysMinRegex}function mc(){function a(a,b){return b.length-a.length}var b,c,d,e,f,g=[],i=[],j=[],k=[];for(b=0;7>b;b++)c=h([2e3,1]).day(b),d=this.weekdaysMin(c,""),e=this.weekdaysShort(c,""),f=this.weekdays(c,""),g.push(d),i.push(e),j.push(f),k.push(d),k.push(e),k.push(f);for(g.sort(a),i.sort(a),j.sort(a),k.sort(a),b=0;7>b;b++)i[b]=Z(i[b]),j[b]=Z(j[b]),k[b]=Z(k[b]);this._weekdaysRegex=new RegExp("^("+k.join("|")+")","i"),this._weekdaysShortRegex=this._weekdaysRegex,this._weekdaysMinRegex=this._weekdaysRegex,this._weekdaysStrictRegex=new RegExp("^("+j.join("|")+")","i"),this._weekdaysShortStrictRegex=new RegExp("^("+i.join("|")+")","i"),this._weekdaysMinStrictRegex=new RegExp("^("+g.join("|")+")","i")}function nc(a){var b=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")}function oc(){return this.hours()%12||12}function pc(){return this.hours()||24}function qc(a,b){R(a,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),b)})}function rc(a,b){return b._meridiemParse}function sc(a){return"p"===(a+"").toLowerCase().charAt(0)}function tc(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"}function uc(a,b){b[Sd]=r(1e3*("0."+a))}function vc(){return this._isUTC?"UTC":""}function wc(){return this._isUTC?"Coordinated Universal Time":""}function xc(a){return Ka(1e3*a)}function yc(){return Ka.apply(null,arguments).parseZone()}function zc(a,b,c){var d=this._calendar[a];return w(d)?d.call(b,c):d}function Ac(a){var b=this._longDateFormat[a],c=this._longDateFormat[a.toUpperCase()];return b||!c?b:(this._longDateFormat[a]=c.replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a])}function Bc(){return this._invalidDate}function Cc(a){return this._ordinal.replace("%d",a)}function Dc(a){return a}function Ec(a,b,c,d){var e=this._relativeTime[c];return w(e)?e(a,b,c,d):e.replace(/%d/i,a)}function Fc(a,b){var c=this._relativeTime[a>0?"future":"past"];return w(c)?c(b):c.replace(/%s/i,b)}function Gc(a,b,c,d){var e=H(),f=h().set(d,b);return e[c](f,a)}function Hc(a,b,c){if("number"==typeof a&&(b=a,a=void 0),a=a||"",null!=b)return Gc(a,b,c,"month");var d,e=[];for(d=0;12>d;d++)e[d]=Gc(a,d,c,"month");return e}function Ic(a,b,c,d){"boolean"==typeof a?("number"==typeof b&&(c=b,b=void 0),b=b||""):(b=a,c=b,a=!1,"number"==typeof b&&(c=b,b=void 0),b=b||"");var e=H(),f=a?e._week.dow:0;if(null!=c)return Gc(b,(c+f)%7,d,"day");var g,h=[];for(g=0;7>g;g++)h[g]=Gc(b,(g+f)%7,d,"day");return h}function Jc(a,b){return Hc(a,b,"months")}function Kc(a,b){return Hc(a,b,"monthsShort")}function Lc(a,b,c){return Ic(a,b,c,"weekdays")}function Mc(a,b,c){return Ic(a,b,c,"weekdaysShort")}function Nc(a,b,c){return Ic(a,b,c,"weekdaysMin")}function Oc(){var a=this._data;return this._milliseconds=Le(this._milliseconds),this._days=Le(this._days),this._months=Le(this._months),a.milliseconds=Le(a.milliseconds),a.seconds=Le(a.seconds),a.minutes=Le(a.minutes),a.hours=Le(a.hours),a.months=Le(a.months),a.years=Le(a.years),this}function Pc(a,b,c,d){var e=db(b,c);return a._milliseconds+=d*e._milliseconds,a._days+=d*e._days,a._months+=d*e._months,a._bubble()}function Qc(a,b){return Pc(this,a,b,1)}function Rc(a,b){return Pc(this,a,b,-1)}function Sc(a){return 0>a?Math.floor(a):Math.ceil(a)}function Tc(){var a,b,c,d,e,f=this._milliseconds,g=this._days,h=this._months,i=this._data;return f>=0&&g>=0&&h>=0||0>=f&&0>=g&&0>=h||(f+=864e5*Sc(Vc(h)+g),g=0,h=0),i.milliseconds=f%1e3,a=q(f/1e3),i.seconds=a%60,b=q(a/60),i.minutes=b%60,c=q(b/60),i.hours=c%24,g+=q(c/24),e=q(Uc(g)),h+=e,g-=Sc(Vc(e)),d=q(h/12),h%=12,i.days=g,i.months=h,i.years=d,this}function Uc(a){return 4800*a/146097}function Vc(a){return 146097*a/4800}function Wc(a){var b,c,d=this._milliseconds;if(a=K(a),"month"===a||"year"===a)return b=this._days+d/864e5,c=this._months+Uc(b),"month"===a?c:c/12;switch(b=this._days+Math.round(Vc(this._months)),a){case"week":return b/7+d/6048e5;case"day":return b+d/864e5;case"hour":return 24*b+d/36e5;case"minute":return 1440*b+d/6e4;case"second":return 86400*b+d/1e3;case"millisecond":return Math.floor(864e5*b)+d;default:throw new Error("Unknown unit "+a)}}function Xc(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)}function Yc(a){return function(){return this.as(a)}}function Zc(a){
return a=K(a),this[a+"s"]()}function $c(a){return function(){return this._data[a]}}function _c(){return q(this.days()/7)}function ad(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function bd(a,b,c){var d=db(a).abs(),e=_e(d.as("s")),f=_e(d.as("m")),g=_e(d.as("h")),h=_e(d.as("d")),i=_e(d.as("M")),j=_e(d.as("y")),k=e<af.s&&["s",e]||1>=f&&["m"]||f<af.m&&["mm",f]||1>=g&&["h"]||g<af.h&&["hh",g]||1>=h&&["d"]||h<af.d&&["dd",h]||1>=i&&["M"]||i<af.M&&["MM",i]||1>=j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,ad.apply(null,k)}function cd(a,b){return void 0===af[a]?!1:void 0===b?af[a]:(af[a]=b,!0)}function dd(a){var b=this.localeData(),c=bd(this,!a,b);return a&&(c=b.pastFuture(+this,c)),b.postformat(c)}function ed(){var a,b,c,d=bf(this._milliseconds)/1e3,e=bf(this._days),f=bf(this._months);a=q(d/60),b=q(a/60),d%=60,a%=60,c=q(f/12),f%=12;var g=c,h=f,i=e,j=b,k=a,l=d,m=this.asSeconds();return m?(0>m?"-":"")+"P"+(g?g+"Y":"")+(h?h+"M":"")+(i?i+"D":"")+(j||k||l?"T":"")+(j?j+"H":"")+(k?k+"M":"")+(l?l+"S":""):"P0D"}var fd,gd;gd=Array.prototype.some?Array.prototype.some:function(a){for(var b=Object(this),c=b.length>>>0,d=0;c>d;d++)if(d in b&&a.call(this,b[d],d,b))return!0;return!1};var hd=a.momentProperties=[],id=!1,jd={};a.suppressDeprecationWarnings=!1,a.deprecationHandler=null;var kd;kd=Object.keys?Object.keys:function(a){var b,c=[];for(b in a)f(a,b)&&c.push(b);return c};var ld,md,nd={},od={},pd=/(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,qd=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,rd={},sd={},td=/\d/,ud=/\d\d/,vd=/\d{3}/,wd=/\d{4}/,xd=/[+-]?\d{6}/,yd=/\d\d?/,zd=/\d\d\d\d?/,Ad=/\d\d\d\d\d\d?/,Bd=/\d{1,3}/,Cd=/\d{1,4}/,Dd=/[+-]?\d{1,6}/,Ed=/\d+/,Fd=/[+-]?\d+/,Gd=/Z|[+-]\d\d:?\d\d/gi,Hd=/Z|[+-]\d\d(?::?\d\d)?/gi,Id=/[+-]?\d+(\.\d{1,3})?/,Jd=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Kd={},Ld={},Md=0,Nd=1,Od=2,Pd=3,Qd=4,Rd=5,Sd=6,Td=7,Ud=8;md=Array.prototype.indexOf?Array.prototype.indexOf:function(a){var b;for(b=0;b<this.length;++b)if(this[b]===a)return b;return-1},R("M",["MM",2],"Mo",function(){return this.month()+1}),R("MMM",0,0,function(a){return this.localeData().monthsShort(this,a)}),R("MMMM",0,0,function(a){return this.localeData().months(this,a)}),J("month","M"),W("M",yd),W("MM",yd,ud),W("MMM",function(a,b){return b.monthsShortRegex(a)}),W("MMMM",function(a,b){return b.monthsRegex(a)}),$(["M","MM"],function(a,b){b[Nd]=r(a)-1}),$(["MMM","MMMM"],function(a,b,c,d){var e=c._locale.monthsParse(a,d,c._strict);null!=e?b[Nd]=e:j(c).invalidMonth=a});var Vd=/D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/,Wd="January_February_March_April_May_June_July_August_September_October_November_December".split("_"),Xd="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),Yd=Jd,Zd=Jd,$d=/^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,_d=/^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/,ae=/Z|[+-]\d\d(?::?\d\d)?/,be=[["YYYYYY-MM-DD",/[+-]\d{6}-\d\d-\d\d/],["YYYY-MM-DD",/\d{4}-\d\d-\d\d/],["GGGG-[W]WW-E",/\d{4}-W\d\d-\d/],["GGGG-[W]WW",/\d{4}-W\d\d/,!1],["YYYY-DDD",/\d{4}-\d{3}/],["YYYY-MM",/\d{4}-\d\d/,!1],["YYYYYYMMDD",/[+-]\d{10}/],["YYYYMMDD",/\d{8}/],["GGGG[W]WWE",/\d{4}W\d{3}/],["GGGG[W]WW",/\d{4}W\d{2}/,!1],["YYYYDDD",/\d{7}/]],ce=[["HH:mm:ss.SSSS",/\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss,SSSS",/\d\d:\d\d:\d\d,\d+/],["HH:mm:ss",/\d\d:\d\d:\d\d/],["HH:mm",/\d\d:\d\d/],["HHmmss.SSSS",/\d\d\d\d\d\d\.\d+/],["HHmmss,SSSS",/\d\d\d\d\d\d,\d+/],["HHmmss",/\d\d\d\d\d\d/],["HHmm",/\d\d\d\d/],["HH",/\d\d/]],de=/^\/?Date\((\-?\d+)/i;a.createFromInputFallback=u("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i+(a._useUTC?" UTC":""))}),R("Y",0,0,function(){var a=this.year();return 9999>=a?""+a:"+"+a}),R(0,["YY",2],0,function(){return this.year()%100}),R(0,["YYYY",4],0,"year"),R(0,["YYYYY",5],0,"year"),R(0,["YYYYYY",6,!0],0,"year"),J("year","y"),W("Y",Fd),W("YY",yd,ud),W("YYYY",Cd,wd),W("YYYYY",Dd,xd),W("YYYYYY",Dd,xd),$(["YYYYY","YYYYYY"],Md),$("YYYY",function(b,c){c[Md]=2===b.length?a.parseTwoDigitYear(b):r(b)}),$("YY",function(b,c){c[Md]=a.parseTwoDigitYear(b)}),$("Y",function(a,b){b[Md]=parseInt(a,10)}),a.parseTwoDigitYear=function(a){return r(a)+(r(a)>68?1900:2e3)};var ee=M("FullYear",!0);a.ISO_8601=function(){};var fe=u("moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?this>a?this:a:l()}),ge=u("moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var a=Ka.apply(null,arguments);return this.isValid()&&a.isValid()?a>this?this:a:l()}),he=function(){return Date.now?Date.now():+new Date};Qa("Z",":"),Qa("ZZ",""),W("Z",Hd),W("ZZ",Hd),$(["Z","ZZ"],function(a,b,c){c._useUTC=!0,c._tzm=Ra(Hd,a)});var ie=/([\+\-]|\d\d)/gi;a.updateOffset=function(){};var je=/^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/,ke=/^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;db.fn=Oa.prototype;var le=ib(1,"add"),me=ib(-1,"subtract");a.defaultFormat="YYYY-MM-DDTHH:mm:ssZ",a.defaultFormatUtc="YYYY-MM-DDTHH:mm:ss[Z]";var ne=u("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(a){return void 0===a?this.localeData():this.locale(a)});R(0,["gg",2],0,function(){return this.weekYear()%100}),R(0,["GG",2],0,function(){return this.isoWeekYear()%100}),Pb("gggg","weekYear"),Pb("ggggg","weekYear"),Pb("GGGG","isoWeekYear"),Pb("GGGGG","isoWeekYear"),J("weekYear","gg"),J("isoWeekYear","GG"),W("G",Fd),W("g",Fd),W("GG",yd,ud),W("gg",yd,ud),W("GGGG",Cd,wd),W("gggg",Cd,wd),W("GGGGG",Dd,xd),W("ggggg",Dd,xd),_(["gggg","ggggg","GGGG","GGGGG"],function(a,b,c,d){b[d.substr(0,2)]=r(a)}),_(["gg","GG"],function(b,c,d,e){c[e]=a.parseTwoDigitYear(b)}),R("Q",0,"Qo","quarter"),J("quarter","Q"),W("Q",td),$("Q",function(a,b){b[Nd]=3*(r(a)-1)}),R("w",["ww",2],"wo","week"),R("W",["WW",2],"Wo","isoWeek"),J("week","w"),J("isoWeek","W"),W("w",yd),W("ww",yd,ud),W("W",yd),W("WW",yd,ud),_(["w","ww","W","WW"],function(a,b,c,d){b[d.substr(0,1)]=r(a)});var oe={dow:0,doy:6};R("D",["DD",2],"Do","date"),J("date","D"),W("D",yd),W("DD",yd,ud),W("Do",function(a,b){return a?b._ordinalParse:b._ordinalParseLenient}),$(["D","DD"],Od),$("Do",function(a,b){b[Od]=r(a.match(yd)[0],10)});var pe=M("Date",!0);R("d",0,"do","day"),R("dd",0,0,function(a){return this.localeData().weekdaysMin(this,a)}),R("ddd",0,0,function(a){return this.localeData().weekdaysShort(this,a)}),R("dddd",0,0,function(a){return this.localeData().weekdays(this,a)}),R("e",0,0,"weekday"),R("E",0,0,"isoWeekday"),J("day","d"),J("weekday","e"),J("isoWeekday","E"),W("d",yd),W("e",yd),W("E",yd),W("dd",function(a,b){return b.weekdaysMinRegex(a)}),W("ddd",function(a,b){return b.weekdaysShortRegex(a)}),W("dddd",function(a,b){return b.weekdaysRegex(a)}),_(["dd","ddd","dddd"],function(a,b,c,d){var e=c._locale.weekdaysParse(a,d,c._strict);null!=e?b.d=e:j(c).invalidWeekday=a}),_(["d","e","E"],function(a,b,c,d){b[d]=r(a)});var qe="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),re="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),se="Su_Mo_Tu_We_Th_Fr_Sa".split("_"),te=Jd,ue=Jd,ve=Jd;R("DDD",["DDDD",3],"DDDo","dayOfYear"),J("dayOfYear","DDD"),W("DDD",Bd),W("DDDD",vd),$(["DDD","DDDD"],function(a,b,c){c._dayOfYear=r(a)}),R("H",["HH",2],0,"hour"),R("h",["hh",2],0,oc),R("k",["kk",2],0,pc),R("hmm",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)}),R("hmmss",0,0,function(){return""+oc.apply(this)+Q(this.minutes(),2)+Q(this.seconds(),2)}),R("Hmm",0,0,function(){return""+this.hours()+Q(this.minutes(),2)}),R("Hmmss",0,0,function(){return""+this.hours()+Q(this.minutes(),2)+Q(this.seconds(),2)}),qc("a",!0),qc("A",!1),J("hour","h"),W("a",rc),W("A",rc),W("H",yd),W("h",yd),W("HH",yd,ud),W("hh",yd,ud),W("hmm",zd),W("hmmss",Ad),W("Hmm",zd),W("Hmmss",Ad),$(["H","HH"],Pd),$(["a","A"],function(a,b,c){c._isPm=c._locale.isPM(a),c._meridiem=a}),$(["h","hh"],function(a,b,c){b[Pd]=r(a),j(c).bigHour=!0}),$("hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d)),j(c).bigHour=!0}),$("hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e)),j(c).bigHour=!0}),$("Hmm",function(a,b,c){var d=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d))}),$("Hmmss",function(a,b,c){var d=a.length-4,e=a.length-2;b[Pd]=r(a.substr(0,d)),b[Qd]=r(a.substr(d,2)),b[Rd]=r(a.substr(e))});var we=/[ap]\.?m?\.?/i,xe=M("Hours",!0);R("m",["mm",2],0,"minute"),J("minute","m"),W("m",yd),W("mm",yd,ud),$(["m","mm"],Qd);var ye=M("Minutes",!1);R("s",["ss",2],0,"second"),J("second","s"),W("s",yd),W("ss",yd,ud),$(["s","ss"],Rd);var ze=M("Seconds",!1);R("S",0,0,function(){return~~(this.millisecond()/100)}),R(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),R(0,["SSS",3],0,"millisecond"),R(0,["SSSS",4],0,function(){return 10*this.millisecond()}),R(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),R(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),R(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),R(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),R(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),J("millisecond","ms"),W("S",Bd,td),W("SS",Bd,ud),W("SSS",Bd,vd);var Ae;for(Ae="SSSS";Ae.length<=9;Ae+="S")W(Ae,Ed);for(Ae="S";Ae.length<=9;Ae+="S")$(Ae,uc);var Be=M("Milliseconds",!1);R("z",0,0,"zoneAbbr"),R("zz",0,0,"zoneName");var Ce=o.prototype;Ce.add=le,Ce.calendar=kb,Ce.clone=lb,Ce.diff=sb,Ce.endOf=Eb,Ce.format=wb,Ce.from=xb,Ce.fromNow=yb,Ce.to=zb,Ce.toNow=Ab,Ce.get=P,Ce.invalidAt=Nb,Ce.isAfter=mb,Ce.isBefore=nb,Ce.isBetween=ob,Ce.isSame=pb,Ce.isSameOrAfter=qb,Ce.isSameOrBefore=rb,Ce.isValid=Lb,Ce.lang=ne,Ce.locale=Bb,Ce.localeData=Cb,Ce.max=ge,Ce.min=fe,Ce.parsingFlags=Mb,Ce.set=P,Ce.startOf=Db,Ce.subtract=me,Ce.toArray=Ib,Ce.toObject=Jb,Ce.toDate=Hb,Ce.toISOString=vb,Ce.toJSON=Kb,Ce.toString=ub,Ce.unix=Gb,Ce.valueOf=Fb,Ce.creationData=Ob,Ce.year=ee,Ce.isLeapYear=ta,Ce.weekYear=Qb,Ce.isoWeekYear=Rb,Ce.quarter=Ce.quarters=Wb,Ce.month=ha,Ce.daysInMonth=ia,Ce.week=Ce.weeks=$b,Ce.isoWeek=Ce.isoWeeks=_b,Ce.weeksInYear=Tb,Ce.isoWeeksInYear=Sb,Ce.date=pe,Ce.day=Ce.days=gc,Ce.weekday=hc,Ce.isoWeekday=ic,Ce.dayOfYear=nc,Ce.hour=Ce.hours=xe,Ce.minute=Ce.minutes=ye,Ce.second=Ce.seconds=ze,Ce.millisecond=Ce.milliseconds=Be,Ce.utcOffset=Ua,Ce.utc=Wa,Ce.local=Xa,Ce.parseZone=Ya,Ce.hasAlignedHourOffset=Za,Ce.isDST=$a,Ce.isDSTShifted=_a,Ce.isLocal=ab,Ce.isUtcOffset=bb,Ce.isUtc=cb,Ce.isUTC=cb,Ce.zoneAbbr=vc,Ce.zoneName=wc,Ce.dates=u("dates accessor is deprecated. Use date instead.",pe),Ce.months=u("months accessor is deprecated. Use month instead",ha),Ce.years=u("years accessor is deprecated. Use year instead",ee),Ce.zone=u("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",Va);var De=Ce,Ee={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Fe={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ge="Invalid date",He="%d",Ie=/\d{1,2}/,Je={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ke=A.prototype;Ke._calendar=Ee,Ke.calendar=zc,Ke._longDateFormat=Fe,Ke.longDateFormat=Ac,Ke._invalidDate=Ge,Ke.invalidDate=Bc,Ke._ordinal=He,Ke.ordinal=Cc,Ke._ordinalParse=Ie,Ke.preparse=Dc,Ke.postformat=Dc,Ke._relativeTime=Je,Ke.relativeTime=Ec,Ke.pastFuture=Fc,Ke.set=y,Ke.months=ca,Ke._months=Wd,Ke.monthsShort=da,Ke._monthsShort=Xd,Ke.monthsParse=fa,Ke._monthsRegex=Zd,Ke.monthsRegex=ka,Ke._monthsShortRegex=Yd,Ke.monthsShortRegex=ja,Ke.week=Xb,Ke._week=oe,Ke.firstDayOfYear=Zb,Ke.firstDayOfWeek=Yb,Ke.weekdays=bc,Ke._weekdays=qe,Ke.weekdaysMin=dc,Ke._weekdaysMin=se,Ke.weekdaysShort=cc,Ke._weekdaysShort=re,Ke.weekdaysParse=fc,Ke._weekdaysRegex=te,Ke.weekdaysRegex=jc,Ke._weekdaysShortRegex=ue,Ke.weekdaysShortRegex=kc,Ke._weekdaysMinRegex=ve,Ke.weekdaysMinRegex=lc,Ke.isPM=sc,Ke._meridiemParse=we,Ke.meridiem=tc,E("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(a){var b=a%10,c=1===r(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),a.lang=u("moment.lang is deprecated. Use moment.locale instead.",E),a.langData=u("moment.langData is deprecated. Use moment.localeData instead.",H);var Le=Math.abs,Me=Yc("ms"),Ne=Yc("s"),Oe=Yc("m"),Pe=Yc("h"),Qe=Yc("d"),Re=Yc("w"),Se=Yc("M"),Te=Yc("y"),Ue=$c("milliseconds"),Ve=$c("seconds"),We=$c("minutes"),Xe=$c("hours"),Ye=$c("days"),Ze=$c("months"),$e=$c("years"),_e=Math.round,af={s:45,m:45,h:22,d:26,M:11},bf=Math.abs,cf=Oa.prototype;cf.abs=Oc,cf.add=Qc,cf.subtract=Rc,cf.as=Wc,cf.asMilliseconds=Me,cf.asSeconds=Ne,cf.asMinutes=Oe,cf.asHours=Pe,cf.asDays=Qe,cf.asWeeks=Re,cf.asMonths=Se,cf.asYears=Te,cf.valueOf=Xc,cf._bubble=Tc,cf.get=Zc,cf.milliseconds=Ue,cf.seconds=Ve,cf.minutes=We,cf.hours=Xe,cf.days=Ye,cf.weeks=_c,cf.months=Ze,cf.years=$e,cf.humanize=dd,cf.toISOString=ed,cf.toString=ed,cf.toJSON=ed,cf.locale=Bb,cf.localeData=Cb,cf.toIsoString=u("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",ed),cf.lang=ne,R("X",0,0,"unix"),R("x",0,0,"valueOf"),W("x",Fd),W("X",Id),$("X",function(a,b,c){c._d=new Date(1e3*parseFloat(a,10))}),$("x",function(a,b,c){c._d=new Date(r(a))}),a.version="2.13.0",b(Ka),a.fn=De,a.min=Ma,a.max=Na,a.now=he,a.utc=h,a.unix=xc,a.months=Jc,a.isDate=d,a.locale=E,a.invalid=l,a.duration=db,a.isMoment=p,a.weekdays=Lc,a.parseZone=yc,a.localeData=H,a.isDuration=Pa,a.monthsShort=Kc,a.weekdaysMin=Nc,a.defineLocale=F,a.updateLocale=G,a.locales=I,a.weekdaysShort=Mc,a.normalizeUnits=K,a.relativeTimeThreshold=cd,a.prototype=De;var df=a;return df});
/**
 * @version: 3.0.3
 * @author: Dan Grossman http://www.dangrossman.info/
 * @copyright: Copyright (c) 2012-2018 Dan Grossman. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: http://www.daterangepicker.com/
 */

if ($("#bld-iah-uw_persoonlijke_situatie_en_inkomstenbelasting").length) {
// Following the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Make globaly available as well
            define(['moment', 'jquery'], function (moment, jquery) {
                if (!jquery.fn) jquery.fn = {}; // webpack server rendering
                if (typeof moment !== 'function' && moment.default) moment = moment.default
                return factory(moment, jquery);
            });
        } else if (typeof module === 'object' && module.exports) {
            // Node / Browserify
            //isomorphic issue
            var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
            if (!jQuery) {
                jQuery = require('jquery');
                if (!jQuery.fn) jQuery.fn = {};
            }
            var moment = (typeof window != 'undefined' && typeof window.moment != 'undefined') ? window.moment : require('moment');
            module.exports = factory(moment, jQuery);
        } else {
            // Browser globals
            root.daterangepicker = factory(root.moment, root.jQuery);
        }
    }(this, function (moment, $) {
        var DateRangePicker = function (element, options, cb) {

            //default settings for options
            this.parentEl = 'body';
            this.element = $(element);
            this.startDate = moment().startOf('day');
            this.endDate = moment().endOf('day');
            this.minDate = false;
            this.maxDate = false;
            this.maxSpan = false;
            this.autoApply = false;
            this.singleDatePicker = false;
            this.showDropdowns = false;
            this.minYear = moment().subtract(100, 'year').format('YYYY');
            this.maxYear = moment().add(100, 'year').format('YYYY');
            this.showWeekNumbers = false;
            this.showISOWeekNumbers = false;
            this.showCustomRangeLabel = true;
            this.timePicker = false;
            this.timePicker24Hour = false;
            this.timePickerIncrement = 1;
            this.timePickerSeconds = false;
            this.linkedCalendars = true;
            this.autoUpdateInput = true;
            this.alwaysShowCalendars = false;
            this.ranges = {};

            this.opens = 'right';
            if (this.element.hasClass('pull-right'))
                this.opens = 'left';

            this.drops = 'down';
            if (this.element.hasClass('dropup'))
                this.drops = 'up';

            this.buttonClasses = 'btn btn-sm';
            this.applyButtonClasses = 'btn-primary';
            this.cancelButtonClasses = 'btn-default';

            this.locale = {
                direction: 'ltr',
                format: moment.localeData().longDateFormat('L'),
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(),
                monthNames: moment.monthsShort(),
                firstDay: moment.localeData().firstDayOfWeek()
            };

            this.callback = function () {
            };

            //some state information
            this.isShowing = false;
            this.leftCalendar = {};
            this.rightCalendar = {};

            //custom options from user
            if (typeof options !== 'object' || options === null)
                options = {};

            //allow setting options with data attributes
            //data-api options will be overwritten with custom javascript options
            options = $.extend(this.element.data(), options);

            //html template for the picker UI
            if (typeof options.template !== 'string' && !(options.template instanceof $))
                options.template =
                    '<div class="daterangepicker dropdown-menu ltr single opensright show-calendar">' +
                    '<div class="ranges"></div>' +
                    '<div class="calendar left">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="calendar-time"></div>' +
                    '</div>' +
                    '<div class="calendar right">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="calendar-time"></div>' +
                    '</div>' +
                    '</div>';
            this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
            this.container = $(options.template).appendTo(this.parentEl);

            //
            // handle all the possible options overriding defaults
            //

            if (typeof options.locale === 'object') {

                if (typeof options.locale.direction === 'string')
                    this.locale.direction = options.locale.direction;

                if (typeof options.locale.format === 'string')
                    this.locale.format = options.locale.format;

                if (typeof options.locale.separator === 'string')
                    this.locale.separator = options.locale.separator;

                if (typeof options.locale.daysOfWeek === 'object')
                    this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

                if (typeof options.locale.monthNames === 'object')
                    this.locale.monthNames = options.locale.monthNames.slice();

                if (typeof options.locale.firstDay === 'number')
                    this.locale.firstDay = options.locale.firstDay;

                if (typeof options.locale.applyLabel === 'string')
                    this.locale.applyLabel = options.locale.applyLabel;

                if (typeof options.locale.cancelLabel === 'string')
                    this.locale.cancelLabel = options.locale.cancelLabel;

                if (typeof options.locale.weekLabel === 'string')
                    this.locale.weekLabel = options.locale.weekLabel;

                if (typeof options.locale.customRangeLabel === 'string') {
                    //Support unicode chars in the custom range name.
                    var elem = document.createElement('textarea');
                    elem.innerHTML = options.locale.customRangeLabel;
                    var rangeHtml = elem.value;
                    this.locale.customRangeLabel = rangeHtml;
                }
            }
            this.container.addClass(this.locale.direction);

            if (typeof options.startDate === 'string')
                this.startDate = moment(options.startDate, this.locale.format);

            if (typeof options.endDate === 'string')
                this.endDate = moment(options.endDate, this.locale.format);

            if (typeof options.minDate === 'string')
                this.minDate = moment(options.minDate, this.locale.format);

            if (typeof options.maxDate === 'string')
                this.maxDate = moment(options.maxDate, this.locale.format);

            if (typeof options.startDate === 'object')
                this.startDate = moment(options.startDate);

            if (typeof options.endDate === 'object')
                this.endDate = moment(options.endDate);

            if (typeof options.minDate === 'object')
                this.minDate = moment(options.minDate);

            if (typeof options.maxDate === 'object')
                this.maxDate = moment(options.maxDate);

            // sanity check for bad options
            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate.clone();

            // sanity check for bad options
            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate.clone();

            if (typeof options.applyButtonClasses === 'string')
                this.applyButtonClasses = options.applyButtonClasses;

            if (typeof options.applyClass === 'string') //backwards compat
                this.applyButtonClasses = options.applyClass;

            if (typeof options.cancelButtonClasses === 'string')
                this.cancelButtonClasses = options.cancelButtonClasses;

            if (typeof options.cancelClass === 'string') //backwards compat
                this.cancelButtonClasses = options.cancelClass;

            if (typeof options.maxSpan === 'object')
                this.maxSpan = options.maxSpan;

            if (typeof options.dateLimit === 'object') //backwards compat
                this.maxSpan = options.dateLimit;

            if (typeof options.opens === 'string')
                this.opens = options.opens;

            if (typeof options.drops === 'string')
                this.drops = options.drops;

            if (typeof options.showWeekNumbers === 'boolean')
                this.showWeekNumbers = options.showWeekNumbers;

            if (typeof options.showISOWeekNumbers === 'boolean')
                this.showISOWeekNumbers = options.showISOWeekNumbers;

            if (typeof options.buttonClasses === 'string')
                this.buttonClasses = options.buttonClasses;

            if (typeof options.buttonClasses === 'object')
                this.buttonClasses = options.buttonClasses.join(' ');

            if (typeof options.showDropdowns === 'boolean')
                this.showDropdowns = options.showDropdowns;

            if (typeof options.minYear === 'number')
                this.minYear = options.minYear;

            if (typeof options.maxYear === 'number')
                this.maxYear = options.maxYear;

            if (typeof options.showCustomRangeLabel === 'boolean')
                this.showCustomRangeLabel = options.showCustomRangeLabel;

            if (typeof options.singleDatePicker === 'boolean') {
                this.singleDatePicker = options.singleDatePicker;
                if (this.singleDatePicker)
                    this.endDate = this.startDate.clone();
            }

            if (typeof options.timePicker === 'boolean')
                this.timePicker = options.timePicker;

            if (typeof options.timePickerSeconds === 'boolean')
                this.timePickerSeconds = options.timePickerSeconds;

            if (typeof options.timePickerIncrement === 'number')
                this.timePickerIncrement = options.timePickerIncrement;

            if (typeof options.timePicker24Hour === 'boolean')
                this.timePicker24Hour = options.timePicker24Hour;

            if (typeof options.autoApply === 'boolean')
                this.autoApply = options.autoApply;

            if (typeof options.autoUpdateInput === 'boolean')
                this.autoUpdateInput = options.autoUpdateInput;

            if (typeof options.linkedCalendars === 'boolean')
                this.linkedCalendars = options.linkedCalendars;

            if (typeof options.isInvalidDate === 'function')
                this.isInvalidDate = options.isInvalidDate;

            if (typeof options.isCustomDate === 'function')
                this.isCustomDate = options.isCustomDate;

            if (typeof options.alwaysShowCalendars === 'boolean')
                this.alwaysShowCalendars = options.alwaysShowCalendars;

            // update day names order to firstDay
            if (this.locale.firstDay != 0) {
                var iterator = this.locale.firstDay;
                while (iterator > 0) {
                    this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                    iterator--;
                }
            }

            var start, end, range;

            //if no start/end dates set, check if an input element contains initial values
            if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
                if ($(this.element).is(':text')) {
                    var val = $(this.element).val(),
                        split = val.split(this.locale.separator);

                    start = end = null;

                    if (split.length == 2) {
                        start = moment(split[0], this.locale.format);
                        end = moment(split[1], this.locale.format);
                    } else if (this.singleDatePicker && val !== "") {
                        start = moment(val, this.locale.format);
                        end = moment(val, this.locale.format);
                    }
                    if (start !== null && end !== null) {
                        this.setStartDate(start);
                        this.setEndDate(end);
                    }
                }
            }

            if (typeof options.ranges === 'object') {
                for (range in options.ranges) {

                    if (typeof options.ranges[range][0] === 'string')
                        start = moment(options.ranges[range][0], this.locale.format);
                    else
                        start = moment(options.ranges[range][0]);

                    if (typeof options.ranges[range][1] === 'string')
                        end = moment(options.ranges[range][1], this.locale.format);
                    else
                        end = moment(options.ranges[range][1]);

                    // If the start or end date exceed those allowed by the minDate or maxSpan
                    // options, shorten the range to the allowable period.
                    if (this.minDate && start.isBefore(this.minDate))
                        start = this.minDate.clone();

                    var maxDate = this.maxDate;
                    if (this.maxSpan && maxDate && start.clone().add(this.maxSpan).isAfter(maxDate))
                        maxDate = start.clone().add(this.maxSpan);
                    if (maxDate && end.isAfter(maxDate))
                        end = maxDate.clone();

                    // If the end of the range is before the minimum or the start of the range is
                    // after the maximum, don't display this range option at all.
                    if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day'))
                        || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                        continue;

                    //Support unicode chars in the range names.
                    var elem = document.createElement('textarea');
                    elem.innerHTML = range;
                    var rangeHtml = elem.value;

                    this.ranges[rangeHtml] = [start, end];
                }

                var list = '<ul>';
                for (range in this.ranges) {
                    list += '<li data-range-key="' + range + '">' + range + '</li>';
                }
                if (this.showCustomRangeLabel) {
                    list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
                }
                list += '</ul>';
                this.container.find('.ranges').prepend(list);
            }

            if (typeof cb === 'function') {
                this.callback = cb;
            }

            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
                this.container.find('.calendar-time').hide();
            }

            //can't be used together for now
            if (this.timePicker && this.autoApply)
                this.autoApply = false;

            // if (this.autoApply) {
            //     this.container.addClass('auto-apply');
            // }

            if (typeof options.ranges === 'object')
                this.container.addClass('show-ranges');

            if (this.singleDatePicker) {
                this.container.addClass('single');
                this.container.find('.calendar.left').addClass('single');
                this.container.find('.calendar.left').show();
                this.container.find('.calendar.right').hide();
                this.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();
                if (this.timePicker) {
                    this.container.find('.ranges ul').hide();
                } else {
                    // this.container.addClass('auto-apply');
                    this.container.find('.ranges').hide();
                }
            }

            if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
                this.container.addClass('show-calendar');
            }

            this.container.addClass('opens' + this.opens);

            //apply CSS classes and labels to buttons
            this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
            if (this.applyButtonClasses.length)
                this.container.find('.applyBtn').addClass(this.applyButtonClasses);
            if (this.cancelButtonClasses.length)
                this.container.find('.cancelBtn').addClass(this.cancelButtonClasses);
            this.container.find('.applyBtn').html(this.locale.applyLabel);
            this.container.find('.cancelBtn').html(this.locale.cancelLabel);

            //
            // event listeners
            //

            this.container.find('.calendar')
                .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
                .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
                .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
                .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
                .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
                .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
                .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))

            this.container.find('.ranges')
                .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))

            this.container.find('.buttons')
                .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
                .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))

            if (this.element.is('input') || this.element.is('button')) {
                this.element.on({
                    'click.daterangepicker': $.proxy(this.show, this),
                    'focus.daterangepicker': $.proxy(this.show, this),
                    'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                    'keydown.daterangepicker': $.proxy(this.keydown, this) //IE 11 compatibility
                });
            } else {
                this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
                this.element.on('keydown.daterangepicker', $.proxy(this.toggle, this));
            }

            //
            // if attached to a text input, set the initial value
            //

            this.updateElement();

        };

        DateRangePicker.prototype = {

            constructor: DateRangePicker,

            setStartDate: function (startDate) {
                if (typeof startDate === 'string')
                    this.startDate = moment(startDate, this.locale.format);

                if (typeof startDate === 'object')
                    this.startDate = moment(startDate);

                if (!this.timePicker)
                    this.startDate = this.startDate.startOf('day');

                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

                if (this.minDate && this.startDate.isBefore(this.minDate)) {
                    this.startDate = this.minDate.clone();
                    if (this.timePicker && this.timePickerIncrement)
                        this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }

                if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                    this.startDate = this.maxDate.clone();
                    if (this.timePicker && this.timePickerIncrement)
                        this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }

                if (!this.isShowing)
                    this.updateElement();

                this.updateMonthsInView();
            },

            setEndDate: function (endDate) {
                if (typeof endDate === 'string')
                    this.endDate = moment(endDate, this.locale.format);

                if (typeof endDate === 'object')
                    this.endDate = moment(endDate);

                if (!this.timePicker)
                    this.endDate = this.endDate.add(1, 'd').startOf('day').subtract(1, 'second');

                if (this.timePicker && this.timePickerIncrement)
                    this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

                if (this.endDate.isBefore(this.startDate))
                    this.endDate = this.startDate.clone();

                if (this.maxDate && this.endDate.isAfter(this.maxDate))
                    this.endDate = this.maxDate.clone();

                if (this.maxSpan && this.startDate.clone().add(this.maxSpan).isBefore(this.endDate))
                    this.endDate = this.startDate.clone().add(this.maxSpan);

                this.previousRightTime = this.endDate.clone();

                this.container.find('.selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));

                if (!this.isShowing)
                    this.updateElement();

                this.updateMonthsInView();
            },

            isInvalidDate: function () {
                return false;
            },

            isCustomDate: function () {
                return false;
            },

            updateView: function () {
                if (this.timePicker) {
                    this.renderTimePicker('left');
                    this.renderTimePicker('right');
                    if (!this.endDate) {
                        this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                    } else {
                        this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                    }
                }
                if (this.endDate)
                    this.container.find('.selected').html(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.updateMonthsInView();
                this.updateCalendars();
                this.updateFormInputs();
            },

            updateMonthsInView: function () {
                if (this.endDate) {

                    //if both dates are visible already, do nothing
                    if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                        (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                        &&
                        (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                        return;
                    }

                    this.leftCalendar.month = this.startDate.clone().date(2);
                    if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                        this.rightCalendar.month = this.endDate.clone().date(2);
                    } else {
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                    }

                } else {
                    if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                        this.leftCalendar.month = this.startDate.clone().date(2);
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                    }
                }
                if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
                    this.rightCalendar.month = this.maxDate.clone().date(2);
                    this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
                }
            },

            updateCalendars: function () {

                if (this.timePicker) {
                    var hour, minute, second;
                    if (this.endDate) {
                        hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                        minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                        second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.left .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                    } else {
                        hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                        minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                        second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.right .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                    }
                    this.leftCalendar.month.hour(hour).minute(minute).second(second);
                    this.rightCalendar.month.hour(hour).minute(minute).second(second);
                }

                this.renderCalendar('left');
                this.renderCalendar('right');

                //highlight any predefined range matching the current start and end dates
                this.container.find('.ranges li').removeClass('active');
                if (this.endDate == null) return;

                this.calculateChosenLabel();
            },

            renderCalendar: function (side) {

                //
                // Build the matrix of dates that will populate the calendar
                //

                var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
                var month = calendar.month.month();
                var year = calendar.month.year();
                var hour = calendar.month.hour();
                var minute = calendar.month.minute();
                var second = calendar.month.second();
                var daysInMonth = moment([year, month]).daysInMonth();
                var firstDay = moment([year, month, 1]);
                var lastDay = moment([year, month, daysInMonth]);
                var lastMonth = moment(firstDay).subtract(1, 'month').month();
                var lastYear = moment(firstDay).subtract(1, 'month').year();
                var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
                var dayOfWeek = firstDay.day();

                //initialize a 6 rows x 7 columns array for the calendar
                var calendar = [];
                calendar.firstDay = firstDay;
                calendar.lastDay = lastDay;

                for (var i = 0; i < 6; i++) {
                    calendar[i] = [];
                }

                //populate the calendar with date objects
                var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
                if (startDay > daysInLastMonth)
                    startDay -= 7;

                if (dayOfWeek == this.locale.firstDay)
                    startDay = daysInLastMonth - 6;

                var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

                var col, row;
                for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                    if (i > 0 && col % 7 === 0) {
                        col = 0;
                        row++;
                    }
                    calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                    curDate.hour(12);

                    if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                        calendar[row][col] = this.minDate.clone();
                    }

                    if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                        calendar[row][col] = this.maxDate.clone();
                    }

                }

                //make the calendar object available to hoverDate/clickDate
                if (side == 'left') {
                    this.leftCalendar.calendar = calendar;
                } else {
                    this.rightCalendar.calendar = calendar;
                }

                //
                // Display the calendar
                //

                var minDate = side == 'left' ? this.minDate : this.startDate;
                var maxDate = this.maxDate;
                var selected = side == 'left' ? this.startDate : this.endDate;
                var arrow = this.locale.direction == 'ltr' ? {
                    left: 'chevron-left',
                    right: 'chevron-right'
                } : {left: 'chevron-right', right: 'chevron-left'};

                var html = '<table class="table-condensed">';
                html += '<thead>';
                html += '<tr>';

                // add empty cell for week number
                if (this.showWeekNumbers || this.showISOWeekNumbers)
                    html += '<th></th>';

                if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                    html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
                } else {
                    html += '<th></th>';
                }

                var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

                if (this.showDropdowns) {
                    var currentMonth = calendar[1][1].month();
                    var currentYear = calendar[1][1].year();
                    var maxYear = (maxDate && maxDate.year()) || (this.maxYear);
                    var minYear = (minDate && minDate.year()) || (this.minYear);
                    var inMinYear = currentYear == minYear;
                    var inMaxYear = currentYear == maxYear;

                    var monthHtml = '<select class="monthselect">';
                    for (var m = 0; m < 12; m++) {
                        if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                            monthHtml += "<option value='" + m + "'" +
                                (m === currentMonth ? " selected='selected'" : "") +
                                ">" + this.locale.monthNames[m] + "</option>";
                        } else {
                            monthHtml += "<option value='" + m + "'" +
                                (m === currentMonth ? " selected='selected'" : "") +
                                " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                        }
                    }
                    monthHtml += "</select>";

                    var yearHtml = '<select class="yearselect">';
                    for (var y = minYear; y <= maxYear; y++) {
                        yearHtml += '<option value="' + y + '"' +
                            (y === currentYear ? ' selected="selected"' : '') +
                            '>' + y + '</option>';
                    }
                    yearHtml += '</select>';

                    dateHtml = monthHtml + yearHtml;
                }

                html += '<th colspan="5" class="month">' + dateHtml + '</th>';
                if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                    html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
                } else {
                    html += '<th></th>';
                }

                html += '</tr>';
                html += '<tr>';

                // add week number label
                if (this.showWeekNumbers || this.showISOWeekNumbers)
                    html += '<th class="week">' + this.locale.weekLabel + '</th>';

                $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
                    html += '<th>' + dayOfWeek + '</th>';
                });

                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                //adjust maxDate to reflect the maxSpan setting in order to
                //grey out end dates beyond the maxSpan
                if (this.endDate == null && this.maxSpan) {
                    var maxLimit = this.startDate.clone().add(this.maxSpan).endOf('day');
                    if (!maxDate || maxLimit.isBefore(maxDate)) {
                        maxDate = maxLimit;
                    }
                }

                for (var row = 0; row < 6; row++) {
                    html += '<tr>';

                    // add week number
                    if (this.showWeekNumbers)
                        html += '<td class="week">' + calendar[row][0].week() + '</td>';
                    else if (this.showISOWeekNumbers)
                        html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

                    for (var col = 0; col < 7; col++) {

                        var classes = [];

                        //highlight today's date
                        if (calendar[row][col].isSame(new Date(), "day"))
                            classes.push('today');

                        //highlight weekends
                        if (calendar[row][col].isoWeekday() > 5)
                            classes.push('weekend');

                        //grey out the dates in other months displayed at beginning and end of this calendar
                        if (calendar[row][col].month() != calendar[1][1].month())
                            classes.push('off');

                        //don't allow selection of dates before the minimum date
                        if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                            classes.push('off', 'disabled');

                        //don't allow selection of dates after the maximum date
                        if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                            classes.push('off', 'disabled');

                        //don't allow selection of date if a custom function decides it's invalid
                        if (this.isInvalidDate(calendar[row][col]))
                            classes.push('off', 'disabled');

                        //highlight the currently selected start date
                        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                            classes.push('active', 'start-date');

                        //highlight the currently selected end date
                        if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                            classes.push('active', 'end-date');

                        //highlight dates in-between the selected dates
                        if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                            classes.push('in-range');

                        //apply custom classes for this date
                        var isCustom = this.isCustomDate(calendar[row][col]);
                        if (isCustom !== false) {
                            if (typeof isCustom === 'string')
                                classes.push(isCustom);
                            else
                                Array.prototype.push.apply(classes, isCustom);
                        }

                        var cname = '', disabled = false;
                        for (var i = 0; i < classes.length; i++) {
                            cname += classes[i] + ' ';
                            if (classes[i] == 'disabled')
                                disabled = true;
                        }
                        if (!disabled)
                            cname += 'available';

                        html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                    }
                    html += '</tr>';
                }

                html += '</tbody>';
                html += '</table>';

                this.container.find('.calendar.' + side + ' .calendar-table').html(html);

            },

            renderTimePicker: function (side) {

                // Don't bother updating the time picker if it's currently disabled
                // because an end date hasn't been clicked yet
                if (side == 'right' && !this.endDate) return;

                var html, selected, minDate, maxDate = this.maxDate;

                if (this.maxSpan && (!this.maxDate || this.startDate.clone().add(this.maxSpan).isAfter(this.maxDate)))
                    maxDate = this.startDate.clone().add(this.maxSpan);

                if (side == 'left') {
                    selected = this.startDate.clone();
                    minDate = this.minDate;
                } else if (side == 'right') {
                    selected = this.endDate.clone();
                    minDate = this.startDate;

                    //Preserve the time already selected
                    var timeSelector = this.container.find('.calendar.right .calendar-time');
                    if (timeSelector.html() != '') {

                        selected.hour(selected.hour() || timeSelector.find('.hourselect option:selected').val());
                        selected.minute(selected.minute() || timeSelector.find('.minuteselect option:selected').val());
                        selected.second(selected.second() || timeSelector.find('.secondselect option:selected').val());

                        if (!this.timePicker24Hour) {
                            var ampm = timeSelector.find('.ampmselect option:selected').val();
                            if (ampm === 'PM' && selected.hour() < 12)
                                selected.hour(selected.hour() + 12);
                            if (ampm === 'AM' && selected.hour() === 12)
                                selected.hour(0);
                        }

                    }

                    if (selected.isBefore(this.startDate))
                        selected = this.startDate.clone();

                    if (maxDate && selected.isAfter(maxDate))
                        selected = maxDate.clone();

                }

                //
                // hours
                //

                html = '<select class="hourselect">';

                var start = this.timePicker24Hour ? 0 : 1;
                var end = this.timePicker24Hour ? 23 : 12;

                for (var i = start; i <= end; i++) {
                    var i_in_24 = i;
                    if (!this.timePicker24Hour)
                        i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                    var time = selected.clone().hour(i_in_24);
                    var disabled = false;
                    if (minDate && time.minute(59).isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.minute(0).isAfter(maxDate))
                        disabled = true;

                    if (i_in_24 == selected.hour() && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + i + '</option>';
                    }
                }

                html += '</select> ';

                //
                // minutes
                //

                html += ': <select class="minuteselect">';

                for (var i = 0; i < 60; i += this.timePickerIncrement) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().minute(i);

                    var disabled = false;
                    if (minDate && time.second(59).isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.second(0).isAfter(maxDate))
                        disabled = true;

                    if (selected.minute() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';

                //
                // seconds
                //

                if (this.timePickerSeconds) {
                    html += ': <select class="secondselect">';

                    for (var i = 0; i < 60; i++) {
                        var padded = i < 10 ? '0' + i : i;
                        var time = selected.clone().second(i);

                        var disabled = false;
                        if (minDate && time.isBefore(minDate))
                            disabled = true;
                        if (maxDate && time.isAfter(maxDate))
                            disabled = true;

                        if (selected.second() == i && !disabled) {
                            html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                        } else if (disabled) {
                            html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                        } else {
                            html += '<option value="' + i + '">' + padded + '</option>';
                        }
                    }

                    html += '</select> ';
                }

                //
                // AM/PM
                //

                if (!this.timePicker24Hour) {
                    html += '<select class="ampmselect">';

                    var am_html = '';
                    var pm_html = '';

                    if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                        am_html = ' disabled="disabled" class="disabled"';

                    if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                        pm_html = ' disabled="disabled" class="disabled"';

                    if (selected.hour() >= 12) {
                        html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                    } else {
                        html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                    }

                    html += '</select>';
                }

                this.container.find('.calendar.' + side + ' .calendar-time').html(html);

            },

            updateFormInputs: function () {

                if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                    this.container.find('button.applyBtn').removeAttr('disabled');
                } else {
                    this.container.find('button.applyBtn').attr('disabled', 'disabled');
                }

            },

            move: function () {
                var parentOffset = {top: 0, left: 0},
                    containerTop;
                var parentRightEdge = $(window).width();
                if (!this.parentEl.is('body')) {
                    parentOffset = {
                        top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                        left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                    };
                    parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
                }

                if (this.drops == 'up')
                    containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
                else
                    containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
                this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('drop-up');

                if (this.opens == 'left') {
                    this.container.css({
                        top: containerTop,
                        right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                        left: 'auto'
                    });
                    if (this.container.offset().left < 0) {
                        this.container.css({
                            right: 'auto',
                            left: 9
                        });
                    }
                } else if (this.opens == 'center') {
                    this.container.css({
                        top: containerTop,
                        left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                        right: 'auto'
                    });
                    if (this.container.offset().left < 0) {
                        this.container.css({
                            right: 'auto',
                            left: 9
                        });
                    }
                } else {
                    this.container.css({
                        top: containerTop,
                        left: this.element.offset().left - parentOffset.left,
                        right: 'auto'
                    });
                    if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                        this.container.css({
                            left: 'auto',
                            right: 0
                        });
                    }
                }
            },

            show: function (e) {
                if (this.isShowing) return;

                // Create a click proxy that is private to this instance of datepicker, for unbinding
                this._outsideClickProxy = $.proxy(function (e) {
                    this.outsideClick(e);
                }, this);

                // Bind global datepicker mousedown for hiding and
                $(document)
                    .on('mousedown.daterangepicker', this._outsideClickProxy)
                    // also support mobile devices
                    .on('touchend.daterangepicker', this._outsideClickProxy)
                    // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
                    .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
                    // and also close when focus changes to outside the picker (eg. tabbing between controls)
                    .on('focusin.daterangepicker', this._outsideClickProxy);

                // Reposition the picker if the window is resized while it's open
                $(window).on('resize.daterangepicker', $.proxy(function (e) {
                    this.move(e);
                }, this));

                this.oldStartDate = this.startDate.clone();
                this.oldEndDate = this.endDate.clone();
                this.previousRightTime = this.endDate.clone();

                this.updateView();
                this.container.show();
                this.move();
                this.element.trigger('show.daterangepicker', this);
                this.isShowing = true;
            },

            hide: function (e) {
                if (!this.isShowing) return;

                //incomplete date selection, revert to last values
                if (!this.endDate) {
                    this.startDate = this.oldStartDate.clone();
                    this.endDate = this.oldEndDate.clone();
                }

                //if a new date range was selected, invoke the user callback function
                if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                    this.callback(this.startDate.clone(), this.endDate.clone(), this.chosenLabel);

                //if picker is attached to a text input, update it
                this.updateElement();

                $(document).off('.daterangepicker');
                $(window).off('.daterangepicker');
                this.container.hide();
                this.element.trigger('hide.daterangepicker', this);
                this.isShowing = false;
            },

            toggle: function (e) {
                if (this.isShowing) {
                    this.hide();
                } else {
                    this.show();
                }
            },

            outsideClick: function (e) {
                var target = $(e.target);
                // if the page is clicked anywhere except within the daterangerpicker/button
                // itself then call this.hide()
                if (
                    // ie modal dialog fix
                    e.type == "focusin" ||
                    target.closest(this.element).length ||
                    target.closest(this.container).length ||
                    target.closest('.calendar-table').length
                ) return;
                this.hide();
                this.element.trigger('outsideClick.daterangepicker', this);
            },

            showCalendars: function () {
                this.container.addClass('show-calendar');
                this.move();
                this.element.trigger('showCalendar.daterangepicker', this);
            },

            hideCalendars: function () {
                this.container.removeClass('show-calendar');
                this.element.trigger('hideCalendar.daterangepicker', this);
            },

            clickRange: function (e) {
                var label = e.target.getAttribute('data-range-key');
                this.chosenLabel = label;
                if (label == this.locale.customRangeLabel) {
                    this.showCalendars();
                } else {
                    var dates = this.ranges[label];
                    this.startDate = dates[0];
                    this.endDate = dates[1];

                    if (!this.timePicker) {
                        this.startDate.startOf('day');
                        this.endDate.endOf('day');
                    }

                    if (!this.alwaysShowCalendars)
                        this.hideCalendars();
                    this.clickApply();
                }
            },

            clickPrev: function (e) {
                var cal = $(e.target).parents('.calendar');
                if (cal.hasClass('left')) {
                    this.leftCalendar.month.subtract(1, 'month');
                    if (this.linkedCalendars)
                        this.rightCalendar.month.subtract(1, 'month');
                } else {
                    this.rightCalendar.month.subtract(1, 'month');
                }
                this.updateCalendars();
            },

            clickNext: function (e) {
                var cal = $(e.target).parents('.calendar');
                if (cal.hasClass('left')) {
                    this.leftCalendar.month.add(1, 'month');
                } else {
                    this.rightCalendar.month.add(1, 'month');
                    if (this.linkedCalendars)
                        this.leftCalendar.month.add(1, 'month');
                }
                this.updateCalendars();
            },

            hoverDate: function (e) {

                //ignore dates that can't be selected
                if (!$(e.target).hasClass('available')) return;

                var title = $(e.target).attr('data-title');
                var row = title.substr(1, 1);
                var col = title.substr(3, 1);
                var cal = $(e.target).parents('.calendar');
                var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

                //highlight the dates between the start date and the date being hovered as a potential end date
                var leftCalendar = this.leftCalendar;
                var rightCalendar = this.rightCalendar;
                var startDate = this.startDate;
                if (!this.endDate) {
                    this.container.find('.calendar tbody td').each(function (index, el) {

                        //skip week numbers, only look at dates
                        if ($(el).hasClass('week')) return;

                        var title = $(el).attr('data-title');
                        var row = title.substr(1, 1);
                        var col = title.substr(3, 1);
                        var cal = $(el).parents('.calendar');
                        var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                        if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                            $(el).addClass('in-range');
                        } else {
                            $(el).removeClass('in-range');
                        }

                    });
                }

            },

            clickDate: function (e) {

                if (!$(e.target).hasClass('available')) return;

                var title = $(e.target).attr('data-title');
                var row = title.substr(1, 1);
                var col = title.substr(3, 1);
                var cal = $(e.target).parents('.calendar');
                var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

                //
                // this function needs to do a few things:
                // * alternate between selecting a start and end date for the range,
                // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
                // * if autoapply is enabled, and an end date was chosen, apply the selection
                // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
                // * if one of the inputs above the calendars was focused, cancel that manual input
                //

                if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
                    if (this.timePicker) {
                        var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.left .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                        var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                        var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                        date = date.clone().hour(hour).minute(minute).second(second);
                    }
                    this.endDate = null;
                    this.setStartDate(date.clone());
                } else if (!this.endDate && date.isBefore(this.startDate)) {
                    //special case: clicking the same date for start/end,
                    //but the time of the end date is before the start date
                    this.setEndDate(this.startDate.clone());
                } else { // picking end
                    if (this.timePicker) {
                        var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.right .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                        var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                        var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                        date = date.clone().hour(hour).minute(minute).second(second);
                    }
                    this.setEndDate(date.clone());
                    if (this.autoApply) {
                        this.calculateChosenLabel();
                        this.clickApply();
                    }
                }

                if (this.singleDatePicker) {
                    this.setEndDate(this.startDate);
                    if (!this.timePicker)
                        this.clickApply();
                }

                this.updateView();

                //This is to cancel the blur event handler if the mouse was in one of the inputs
                e.stopPropagation();

            },

            calculateChosenLabel: function () {
                var customRange = true;
                var i = 0;
                for (var range in this.ranges) {
                    if (this.timePicker) {
                        var format = this.timePickerSeconds ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD HH:mm";
                        //ignore times when comparing dates if time picker seconds is not enabled
                        if (this.startDate.format(format) == this.ranges[range][0].format(format) && this.endDate.format(format) == this.ranges[range][1].format(format)) {
                            customRange = false;
                            this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                            break;
                        }
                    } else {
                        //ignore times when comparing dates if time picker is not enabled
                        if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                            customRange = false;
                            this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').attr('data-range-key');
                            break;
                        }
                    }
                    i++;
                }
                if (customRange) {
                    if (this.showCustomRangeLabel) {
                        this.chosenLabel = this.container.find('.ranges li:last').addClass('active').attr('data-range-key');
                    } else {
                        this.chosenLabel = null;
                    }
                    this.showCalendars();
                }
            },

            clickApply: function (e) {

                if (vraagID === 'V1-8') {
                    this.hide();
                    this.element.trigger('apply.daterangepicker', this);
                } else {
                    this.hide();
                    this.element.trigger('apply.daterangepicker', this);
                    this.element.trigger('focus.daterangepicker', this);
                    this.hide();
                }
            },

            clickCancel: function (e) {
                this.startDate = this.oldStartDate;
                this.endDate = this.oldEndDate;
                this.hide();
                this.element.trigger('cancel.daterangepicker', this);
            },

            monthOrYearChanged: function (e) {
                var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                    leftOrRight = isLeft ? 'left' : 'right',
                    cal = this.container.find('.calendar.' + leftOrRight);

                // Month must be Number for new moment versions
                var month = parseInt(cal.find('.monthselect').val(), 10);
                var year = cal.find('.yearselect').val();

                if (!isLeft) {
                    if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                        month = this.startDate.month();
                        year = this.startDate.year();
                    }
                }

                if (this.minDate) {
                    if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                        month = this.minDate.month();
                        year = this.minDate.year();
                    }
                }

                if (this.maxDate) {
                    if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                        month = this.maxDate.month();
                        year = this.maxDate.year();
                    }
                }

                if (isLeft) {
                    this.leftCalendar.month.month(month).year(year);
                    if (this.linkedCalendars)
                        this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
                } else {
                    this.rightCalendar.month.month(month).year(year);
                    if (this.linkedCalendars)
                        this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
                }
                this.updateCalendars();
            },

            timeChanged: function (e) {

                var cal = $(e.target).closest('.calendar'),
                    isLeft = cal.hasClass('left');

                var hour = parseInt(cal.find('.hourselect').val(), 10);
                var minute = parseInt(cal.find('.minuteselect').val(), 10);
                var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

                if (!this.timePicker24Hour) {
                    var ampm = cal.find('.ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }

                if (isLeft) {
                    var start = this.startDate.clone();
                    start.hour(hour);
                    start.minute(minute);
                    start.second(second);
                    this.setStartDate(start);
                    if (this.singleDatePicker) {
                        this.endDate = this.startDate.clone();
                    } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                        this.setEndDate(start.clone());
                    }
                } else if (this.endDate) {
                    var end = this.endDate.clone();
                    end.hour(hour);
                    end.minute(minute);
                    end.second(second);
                    this.setEndDate(end);
                }

                //update the calendars so all clickable dates reflect the new time component
                this.updateCalendars();

                //update the form inputs above the calendars with the new time
                this.updateFormInputs();

                //re-render the time pickers because changing one selection can affect what's enabled in another
                this.renderTimePicker('left');
                this.renderTimePicker('right');

            },

            elementChanged: function () {
                if (!this.element.is('input')) return;
                if (!this.element.val().length) return;

                var dateString = this.element.val().split(this.locale.separator),
                    start = null,
                    end = null;

                if (dateString.length === 2) {
                    start = moment(dateString[0], this.locale.format);
                    end = moment(dateString[1], this.locale.format);
                }

                if (this.singleDatePicker || start === null || end === null) {
                    start = moment(this.element.val(), this.locale.format);
                    end = start;
                }

                if (!start.isValid() || !end.isValid()) return;

                this.setStartDate(start);
                this.setEndDate(end);
                this.updateView();
            },

            keydown: function (e) {
                //hide on tab or enter
                if ((e.keyCode === 9) || (e.keyCode === 13)) {
                    this.hide();
                }

                //hide on esc and prevent propagation
                if (e.keyCode === 27) {
                    e.preventDefault();
                    e.stopPropagation();

                    this.hide();
                }
            },

            updateElement: function () {
                if (this.element.is('input') && this.autoUpdateInput) {
                    var newValue = this.startDate.format(this.locale.format);
                    if (!this.singleDatePicker) {
                        newValue += this.locale.separator + this.endDate.format(this.locale.format);
                    }
                    if (newValue !== this.element.val()) {
                        this.element.val(newValue).trigger('change');
                    }
                }
            },

            remove: function () {
                this.container.remove();
                this.element.off('.daterangepicker');
                this.element.removeData();
            }

        };

        $.fn.daterangepicker = function (options, callback) {
            var implementOptions = $.extend(true, {}, $.fn.daterangepicker.defaultOptions, options);
            this.each(function () {
                var el = $(this);
                if (el.data('daterangepicker'))
                    el.data('daterangepicker').remove();
                el.data('daterangepicker', new DateRangePicker(el, implementOptions, callback));
            });
            return this;
        };

        return DateRangePicker;

    }));
} else {
    /**
     * @version: 2.1.25
     * @author: Dan Grossman http://www.dangrossman.info/
     * @copyright: Copyright (c) 2012-2017 Dan Grossman. All rights reserved.
     * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
     * @website: http://www.daterangepicker.com/
     */
// Follow the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Make globaly available as well
            define(['moment', 'jquery'], function (moment, jquery) {
                if (!jquery.fn) jquery.fn = {}; // webpack server rendering
                return (root.daterangepicker = factory(moment, jquery));
            });
        } else if (typeof module === 'object' && module.exports) {
            // Node / Browserify
            //isomorphic issue
            var jQuery = (typeof window != 'undefined') ? window.jQuery : undefined;
            if (!jQuery) {
                jQuery = require('jquery');
                if (!jQuery.fn) jQuery.fn = {};
            }
            var moment = (typeof window != 'undefined' && typeof window.moment != 'undefined') ? window.moment : require('moment');
            module.exports = factory(moment, jQuery);
        } else {
            // Browser globals
            root.daterangepicker = factory(root.moment, root.jQuery);
        }
    }(this, function(moment, $) {
        var DateRangePicker = function(element, options, cb) {

            //default settings for options
            this.parentEl = 'body';
            this.element = $(element);
            this.startDate = moment().startOf('day');
            this.endDate = moment().endOf('day');
            this.minDate = false;
            this.maxDate = false;
            this.dateLimit = false;
            this.autoApply = false;
            this.singleDatePicker = false;
            this.showDropdowns = false;
            this.showWeekNumbers = false;
            this.showISOWeekNumbers = false;
            this.showCustomRangeLabel = true;
            this.timePicker = false;
            this.timePicker24Hour = false;
            this.timePickerIncrement = 1;
            this.timePickerSeconds = false;
            this.linkedCalendars = true;
            this.autoUpdateInput = true;
            this.alwaysShowCalendars = false;
            this.ranges = {};

            this.opens = 'right';
            if (this.element.hasClass('pull-right'))
                this.opens = 'left';

            this.drops = 'down';
            if (this.element.hasClass('dropup'))
                this.drops = 'up';

            this.buttonClasses = 'btn btn-sm';
            this.applyClass = 'btn-success';
            this.cancelClass = 'btn-default';

            this.locale = {
                direction: 'ltr',
                format: moment.localeData().longDateFormat('L'),
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                weekLabel: 'W',
                customRangeLabel: 'Custom Range',
                daysOfWeek: moment.weekdaysMin(),
                monthNames: moment.monthsShort(),
                firstDay: moment.localeData().firstDayOfWeek()
            };

            this.callback = function() { };

            //some state information
            this.isShowing = false;
            this.leftCalendar = {};
            this.rightCalendar = {};

            //custom options from user
            if (typeof options !== 'object' || options === null)
                options = {};

            //allow setting options with data attributes
            //data-api options will be overwritten with custom javascript options
            options = $.extend(this.element.data(), options);

            //html template for the picker UI
            if (typeof options.template !== 'string' && !(options.template instanceof $))
                options.template = '<div class="daterangepicker dropdown-menu">' +
                    '<div class="calendar left">' +
                    '<div class="daterangepicker_input">' +
                    '<input class="input-mini form-control" type="text" name="daterangepicker_start" value="" />' +
                    '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                    '<div class="calendar-time">' +
                    '<div></div>' +
                    '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                    '</div>' +
                    '<div class="calendar right">' +
                    '<div class="daterangepicker_input">' +
                    '<input class="input-mini form-control" type="text" name="daterangepicker_end" value="" />' +
                    '<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
                    '<div class="calendar-time">' +
                    '<div></div>' +
                    '<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
                    '</div>' +
                    '</div>' +
                    '<div class="calendar-table"></div>' +
                    '</div>' +
                    '<div class="ranges">' +
                    '<div class="range_inputs">' +
                    '<button class="applyBtn" disabled="disabled" type="button"></button> ' +
                    '<button class="cancelBtn" type="button"></button>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

            this.parentEl = (options.parentEl && $(options.parentEl).length) ? $(options.parentEl) : $(this.parentEl);
            this.container = $(options.template).appendTo(this.parentEl);

            //
            // handle all the possible options overriding defaults
            //

            if (typeof options.locale === 'object') {

                if (typeof options.locale.direction === 'string')
                    this.locale.direction = options.locale.direction;

                if (typeof options.locale.format === 'string')
                    this.locale.format = options.locale.format;

                if (typeof options.locale.separator === 'string')
                    this.locale.separator = options.locale.separator;

                if (typeof options.locale.daysOfWeek === 'object')
                    this.locale.daysOfWeek = options.locale.daysOfWeek.slice();

                if (typeof options.locale.monthNames === 'object')
                    this.locale.monthNames = options.locale.monthNames.slice();

                if (typeof options.locale.firstDay === 'number')
                    this.locale.firstDay = options.locale.firstDay;

                if (typeof options.locale.applyLabel === 'string')
                    this.locale.applyLabel = options.locale.applyLabel;

                if (typeof options.locale.cancelLabel === 'string')
                    this.locale.cancelLabel = options.locale.cancelLabel;

                if (typeof options.locale.weekLabel === 'string')
                    this.locale.weekLabel = options.locale.weekLabel;

                if (typeof options.locale.customRangeLabel === 'string'){
                    //Support unicode chars in the custom range name.
                    var elem = document.createElement('textarea');
                    elem.innerHTML = options.locale.customRangeLabel;
                    var rangeHtml = elem.value;
                    this.locale.customRangeLabel = rangeHtml;
                }
            }
            this.container.addClass(this.locale.direction);

            if (typeof options.startDate === 'string')
                this.startDate = moment(options.startDate, this.locale.format);

            if (typeof options.endDate === 'string')
                this.endDate = moment(options.endDate, this.locale.format);

            if (typeof options.minDate === 'string')
                this.minDate = moment(options.minDate, this.locale.format);

            if (typeof options.maxDate === 'string')
                this.maxDate = moment(options.maxDate, this.locale.format);

            if (typeof options.startDate === 'object')
                this.startDate = moment(options.startDate);

            if (typeof options.endDate === 'object')
                this.endDate = moment(options.endDate);

            if (typeof options.minDate === 'object')
                this.minDate = moment(options.minDate);

            if (typeof options.maxDate === 'object')
                this.maxDate = moment(options.maxDate);

            // sanity check for bad options
            if (this.minDate && this.startDate.isBefore(this.minDate))
                this.startDate = this.minDate.clone();

            // sanity check for bad options
            if (this.maxDate && this.endDate.isAfter(this.maxDate))
                this.endDate = this.maxDate.clone();

            if (typeof options.applyClass === 'string')
                this.applyClass = options.applyClass;

            if (typeof options.cancelClass === 'string')
                this.cancelClass = options.cancelClass;

            if (typeof options.dateLimit === 'object')
                this.dateLimit = options.dateLimit;

            if (typeof options.opens === 'string')
                this.opens = options.opens;

            if (typeof options.drops === 'string')
                this.drops = options.drops;

            if (typeof options.showWeekNumbers === 'boolean')
                this.showWeekNumbers = options.showWeekNumbers;

            if (typeof options.showISOWeekNumbers === 'boolean')
                this.showISOWeekNumbers = options.showISOWeekNumbers;

            if (typeof options.buttonClasses === 'string')
                this.buttonClasses = options.buttonClasses;

            if (typeof options.buttonClasses === 'object')
                this.buttonClasses = options.buttonClasses.join(' ');

            if (typeof options.showDropdowns === 'boolean')
                this.showDropdowns = options.showDropdowns;

            if (typeof options.showCustomRangeLabel === 'boolean')
                this.showCustomRangeLabel = options.showCustomRangeLabel;

            if (typeof options.singleDatePicker === 'boolean') {
                this.singleDatePicker = options.singleDatePicker;
                if (this.singleDatePicker)
                    this.endDate = this.startDate.clone();
            }

            if (typeof options.timePicker === 'boolean')
                this.timePicker = options.timePicker;

            if (typeof options.timePickerSeconds === 'boolean')
                this.timePickerSeconds = options.timePickerSeconds;

            if (typeof options.timePickerIncrement === 'number')
                this.timePickerIncrement = options.timePickerIncrement;

            if (typeof options.timePicker24Hour === 'boolean')
                this.timePicker24Hour = options.timePicker24Hour;

            if (typeof options.autoApply === 'boolean')
                this.autoApply = options.autoApply;

            if (typeof options.autoUpdateInput === 'boolean')
                this.autoUpdateInput = options.autoUpdateInput;

            if (typeof options.linkedCalendars === 'boolean')
                this.linkedCalendars = options.linkedCalendars;

            if (typeof options.isInvalidDate === 'function')
                this.isInvalidDate = options.isInvalidDate;

            if (typeof options.isCustomDate === 'function')
                this.isCustomDate = options.isCustomDate;

            if (typeof options.alwaysShowCalendars === 'boolean')
                this.alwaysShowCalendars = options.alwaysShowCalendars;

            // update day names order to firstDay
            if (this.locale.firstDay != 0) {
                var iterator = this.locale.firstDay;
                while (iterator > 0) {
                    this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                    iterator--;
                }
            }

            var start, end, range;

            //if no start/end dates set, check if an input element contains initial values
            if (typeof options.startDate === 'undefined' && typeof options.endDate === 'undefined') {
                if ($(this.element).is('input[type=text]')) {
                    var val = $(this.element).val(),
                        split = val.split(this.locale.separator);

                    start = end = null;

                    if (split.length == 2) {
                        start = moment(split[0], this.locale.format);
                        end = moment(split[1], this.locale.format);
                    } else if (this.singleDatePicker && val !== "") {
                        start = moment(val, this.locale.format);
                        end = moment(val, this.locale.format);
                    }
                    if (start !== null && end !== null) {
                        this.setStartDate(start);
                        this.setEndDate(end);
                    }
                }
            }

            if (typeof options.ranges === 'object') {
                for (range in options.ranges) {

                    if (typeof options.ranges[range][0] === 'string')
                        start = moment(options.ranges[range][0], this.locale.format);
                    else
                        start = moment(options.ranges[range][0]);

                    if (typeof options.ranges[range][1] === 'string')
                        end = moment(options.ranges[range][1], this.locale.format);
                    else
                        end = moment(options.ranges[range][1]);

                    // If the start or end date exceed those allowed by the minDate or dateLimit
                    // options, shorten the range to the allowable period.
                    if (this.minDate && start.isBefore(this.minDate))
                        start = this.minDate.clone();

                    var maxDate = this.maxDate;
                    if (this.dateLimit && maxDate && start.clone().add(this.dateLimit).isAfter(maxDate))
                        maxDate = start.clone().add(this.dateLimit);
                    if (maxDate && end.isAfter(maxDate))
                        end = maxDate.clone();

                    // If the end of the range is before the minimum or the start of the range is
                    // after the maximum, don't display this range option at all.
                    if ((this.minDate && end.isBefore(this.minDate, this.timepicker ? 'minute' : 'day'))
                        || (maxDate && start.isAfter(maxDate, this.timepicker ? 'minute' : 'day')))
                        continue;

                    //Support unicode chars in the range names.
                    var elem = document.createElement('textarea');
                    elem.innerHTML = range;
                    var rangeHtml = elem.value;

                    this.ranges[rangeHtml] = [start, end];
                }

                var list = '<ul>';
                for (range in this.ranges) {
                    list += '<li data-range-key="' + range + '">' + range + '</li>';
                }
                if (this.showCustomRangeLabel) {
                    list += '<li data-range-key="' + this.locale.customRangeLabel + '">' + this.locale.customRangeLabel + '</li>';
                }
                list += '</ul>';
                this.container.find('.ranges').prepend(list);
            }

            if (typeof cb === 'function') {
                this.callback = cb;
            }

            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.endOf('day');
                this.container.find('.calendar-time').hide();
            }

            //can't be used together for now
            if (this.timePicker && this.autoApply)
                this.autoApply = false;

            if (this.autoApply && typeof options.ranges !== 'object') {
                this.container.find('.ranges').hide();
            } else if (this.autoApply) {
                this.container.find('.applyBtn, .cancelBtn').addClass('hide');
            }

            if (this.singleDatePicker) {
                this.container.addClass('single');
                this.container.find('.calendar.left').addClass('single');
                this.container.find('.calendar.left').show();
                this.container.find('.calendar.right').hide();
                this.container.find('.daterangepicker_input input, .daterangepicker_input > i').hide();
                if (this.timePicker) {
                    this.container.find('.ranges ul').hide();
                } else {
                    this.container.find('.ranges').hide();
                }
            }

            if ((typeof options.ranges === 'undefined' && !this.singleDatePicker) || this.alwaysShowCalendars) {
                this.container.addClass('show-calendar');
            }

            this.container.addClass('opens' + this.opens);

            //swap the position of the predefined ranges if opens right
            if (typeof options.ranges !== 'undefined' && this.opens == 'right') {
                this.container.find('.ranges').prependTo( this.container.find('.calendar.left').parent() );
            }

            //apply CSS classes and labels to buttons
            this.container.find('.applyBtn, .cancelBtn').addClass(this.buttonClasses);
            if (this.applyClass.length)
                this.container.find('.applyBtn').addClass(this.applyClass);
            if (this.cancelClass.length)
                this.container.find('.cancelBtn').addClass(this.cancelClass);
            this.container.find('.applyBtn').html(this.locale.applyLabel);
            this.container.find('.cancelBtn').html(this.locale.cancelLabel);

            //
            // event listeners
            //

            this.container.find('.calendar')
                .on('click.daterangepicker', '.prev', $.proxy(this.clickPrev, this))
                .on('click.daterangepicker', '.next', $.proxy(this.clickNext, this))
                .on('mousedown.daterangepicker', 'td.available', $.proxy(this.clickDate, this))
                .on('mouseenter.daterangepicker', 'td.available', $.proxy(this.hoverDate, this))
                .on('mouseleave.daterangepicker', 'td.available', $.proxy(this.updateFormInputs, this))
                .on('change.daterangepicker', 'select.yearselect', $.proxy(this.monthOrYearChanged, this))
                .on('change.daterangepicker', 'select.monthselect', $.proxy(this.monthOrYearChanged, this))
                .on('change.daterangepicker', 'select.hourselect,select.minuteselect,select.secondselect,select.ampmselect', $.proxy(this.timeChanged, this))
                .on('click.daterangepicker', '.daterangepicker_input input', $.proxy(this.showCalendars, this))
                .on('focus.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsFocused, this))
                .on('blur.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsBlurred, this))
                .on('change.daterangepicker', '.daterangepicker_input input', $.proxy(this.formInputsChanged, this));

            this.container.find('.ranges')
                .on('click.daterangepicker', 'button.applyBtn', $.proxy(this.clickApply, this))
                .on('click.daterangepicker', 'button.cancelBtn', $.proxy(this.clickCancel, this))
                .on('click.daterangepicker', 'li', $.proxy(this.clickRange, this))
                .on('mouseenter.daterangepicker', 'li', $.proxy(this.hoverRange, this))
                .on('mouseleave.daterangepicker', 'li', $.proxy(this.updateFormInputs, this));

            if (this.element.is('input') || this.element.is('button')) {
                this.element.on({
                    'click.daterangepicker': $.proxy(this.show, this),
                    'focus.daterangepicker': $.proxy(this.show, this),
                    'keyup.daterangepicker': $.proxy(this.elementChanged, this),
                    'keydown.daterangepicker': $.proxy(this.keydown, this)
                });
            } else {
                this.element.on('click.daterangepicker', $.proxy(this.toggle, this));
            }

            //
            // if attached to a text input, set the initial value
            //

            if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                this.element.trigger('change');
            } else if (this.element.is('input') && this.autoUpdateInput) {
                this.element.val(this.startDate.format(this.locale.format));
                this.element.trigger('change');
            }

        };

        DateRangePicker.prototype = {

            constructor: DateRangePicker,

            setStartDate: function(startDate) {
                if (typeof startDate === 'string')
                    this.startDate = moment(startDate, this.locale.format);

                if (typeof startDate === 'object')
                    this.startDate = moment(startDate);

                if (!this.timePicker)
                    this.startDate = this.startDate.startOf('day');

                if (this.timePicker && this.timePickerIncrement)
                    this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

                if (this.minDate && this.startDate.isBefore(this.minDate)) {
                    this.startDate = this.minDate.clone();
                    if (this.timePicker && this.timePickerIncrement)
                        this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }

                if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
                    this.startDate = this.maxDate.clone();
                    if (this.timePicker && this.timePickerIncrement)
                        this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
                }

                if (!this.isShowing)
                    this.updateElement();

                this.updateMonthsInView();
            },

            setEndDate: function(endDate) {
                if (typeof endDate === 'string')
                    this.endDate = moment(endDate, this.locale.format);

                if (typeof endDate === 'object')
                    this.endDate = moment(endDate);

                if (!this.timePicker)
                    this.endDate = this.endDate.endOf('day');

                if (this.timePicker && this.timePickerIncrement)
                    this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

                if (this.endDate.isBefore(this.startDate))
                    this.endDate = this.startDate.clone();

                if (this.maxDate && this.endDate.isAfter(this.maxDate))
                    this.endDate = this.maxDate.clone();

                if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
                    this.endDate = this.startDate.clone().add(this.dateLimit);

                this.previousRightTime = this.endDate.clone();

                if (!this.isShowing)
                    this.updateElement();

                this.updateMonthsInView();
            },

            isInvalidDate: function() {
                return false;
            },

            isCustomDate: function() {
                return false;
            },

            updateView: function() {
                if (this.timePicker) {
                    this.renderTimePicker('left');
                    this.renderTimePicker('right');
                    if (!this.endDate) {
                        this.container.find('.right .calendar-time select').attr('disabled', 'disabled').addClass('disabled');
                    } else {
                        this.container.find('.right .calendar-time select').removeAttr('disabled').removeClass('disabled');
                    }
                }
                if (this.endDate) {
                    this.container.find('input[name="daterangepicker_end"]').removeClass('active');
                    this.container.find('input[name="daterangepicker_start"]').addClass('active');
                } else {
                    this.container.find('input[name="daterangepicker_end"]').addClass('active');
                    this.container.find('input[name="daterangepicker_start"]').removeClass('active');
                }
                this.updateMonthsInView();
                this.updateCalendars();
                this.updateFormInputs();
            },

            updateMonthsInView: function() {
                if (this.endDate) {

                    //if both dates are visible already, do nothing
                    if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
                        (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                        &&
                        (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
                    ) {
                        return;
                    }

                    this.leftCalendar.month = this.startDate.clone().date(2);
                    if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
                        this.rightCalendar.month = this.endDate.clone().date(2);
                    } else {
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                    }

                } else {
                    if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
                        this.leftCalendar.month = this.startDate.clone().date(2);
                        this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
                    }
                }
                if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
                    this.rightCalendar.month = this.maxDate.clone().date(2);
                    this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
                }
            },

            updateCalendars: function() {

                if (this.timePicker) {
                    var hour, minute, second;
                    if (this.endDate) {
                        hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                        minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                        second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.left .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                    } else {
                        hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                        minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                        second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.right .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                    }
                    this.leftCalendar.month.hour(hour).minute(minute).second(second);
                    this.rightCalendar.month.hour(hour).minute(minute).second(second);
                }

                this.renderCalendar('left');
                this.renderCalendar('right');

                //highlight any predefined range matching the current start and end dates
                this.container.find('.ranges li').removeClass('active');
                if (this.endDate == null) return;

                this.calculateChosenLabel();
            },

            renderCalendar: function(side) {

                //
                // Build the matrix of dates that will populate the calendar
                //

                var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
                var month = calendar.month.month();
                var year = calendar.month.year();
                var hour = calendar.month.hour();
                var minute = calendar.month.minute();
                var second = calendar.month.second();
                var daysInMonth = moment([year, month]).daysInMonth();
                var firstDay = moment([year, month, 1]);
                var lastDay = moment([year, month, daysInMonth]);
                var lastMonth = moment(firstDay).subtract(1, 'month').month();
                var lastYear = moment(firstDay).subtract(1, 'month').year();
                var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
                var dayOfWeek = firstDay.day();

                //initialize a 6 rows x 7 columns array for the calendar
                var calendar = [];
                calendar.firstDay = firstDay;
                calendar.lastDay = lastDay;

                for (var i = 0; i < 6; i++) {
                    calendar[i] = [];
                }

                //populate the calendar with date objects
                var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
                if (startDay > daysInLastMonth)
                    startDay -= 7;

                if (dayOfWeek == this.locale.firstDay)
                    startDay = daysInLastMonth - 6;

                var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

                var col, row;
                for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add(24, 'hour')) {
                    if (i > 0 && col % 7 === 0) {
                        col = 0;
                        row++;
                    }
                    calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
                    curDate.hour(12);

                    if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                        calendar[row][col] = this.minDate.clone();
                    }

                    if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                        calendar[row][col] = this.maxDate.clone();
                    }

                }

                //make the calendar object available to hoverDate/clickDate
                if (side == 'left') {
                    this.leftCalendar.calendar = calendar;
                } else {
                    this.rightCalendar.calendar = calendar;
                }

                //
                // Display the calendar
                //

                var minDate = side == 'left' ? this.minDate : this.startDate;
                var maxDate = this.maxDate;
                var selected = side == 'left' ? this.startDate : this.endDate;
                var arrow = this.locale.direction == 'ltr' ? {left: 'chevron-left', right: 'chevron-right'} : {left: 'chevron-right', right: 'chevron-left'};

                var html = '<table class="table-condensed">';
                html += '<thead>';
                html += '<tr>';

                // add empty cell for week number
                if (this.showWeekNumbers || this.showISOWeekNumbers)
                    html += '<th></th>';

                if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
                    html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
                } else {
                    html += '<th></th>';
                }

                var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

                if (this.showDropdowns) {
                    var currentMonth = calendar[1][1].month();
                    var currentYear = calendar[1][1].year();
                    var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
                    var minYear = (minDate && minDate.year()) || (currentYear - 50);
                    var inMinYear = currentYear == minYear;
                    var inMaxYear = currentYear == maxYear;

                    var monthHtml = '<select class="monthselect">';
                    for (var m = 0; m < 12; m++) {
                        if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                            monthHtml += "<option value='" + m + "'" +
                                (m === currentMonth ? " selected='selected'" : "") +
                                ">" + this.locale.monthNames[m] + "</option>";
                        } else {
                            monthHtml += "<option value='" + m + "'" +
                                (m === currentMonth ? " selected='selected'" : "") +
                                " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                        }
                    }
                    monthHtml += "</select>";

                    var yearHtml = '<select class="yearselect">';
                    for (var y = minYear; y <= maxYear; y++) {
                        yearHtml += '<option value="' + y + '"' +
                            (y === currentYear ? ' selected="selected"' : '') +
                            '>' + y + '</option>';
                    }
                    yearHtml += '</select>';

                    dateHtml = monthHtml + yearHtml;
                }

                html += '<th colspan="5" class="month">' + dateHtml + '</th>';
                if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
                    html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
                } else {
                    html += '<th></th>';
                }

                html += '</tr>';
                html += '<tr>';

                // add week number label
                if (this.showWeekNumbers || this.showISOWeekNumbers)
                    html += '<th class="week">' + this.locale.weekLabel + '</th>';

                $.each(this.locale.daysOfWeek, function(index, dayOfWeek) {
                    html += '<th>' + dayOfWeek + '</th>';
                });

                html += '</tr>';
                html += '</thead>';
                html += '<tbody>';

                //adjust maxDate to reflect the dateLimit setting in order to
                //grey out end dates beyond the dateLimit
                if (this.endDate == null && this.dateLimit) {
                    var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
                    if (!maxDate || maxLimit.isBefore(maxDate)) {
                        maxDate = maxLimit;
                    }
                }

                for (var row = 0; row < 6; row++) {
                    html += '<tr>';

                    // add week number
                    if (this.showWeekNumbers)
                        html += '<td class="week">' + calendar[row][0].week() + '</td>';
                    else if (this.showISOWeekNumbers)
                        html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

                    for (var col = 0; col < 7; col++) {

                        var classes = [];

                        //highlight today's date
                        if (calendar[row][col].isSame(new Date(), "day"))
                            classes.push('today');

                        //highlight weekends
                        if (calendar[row][col].isoWeekday() > 5)
                            classes.push('weekend');

                        //grey out the dates in other months displayed at beginning and end of this calendar
                        if (calendar[row][col].month() != calendar[1][1].month())
                            classes.push('off');

                        //don't allow selection of dates before the minimum date
                        if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                            classes.push('off', 'disabled');

                        //don't allow selection of dates after the maximum date
                        if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                            classes.push('off', 'disabled');

                        //don't allow selection of date if a custom function decides it's invalid
                        if (this.isInvalidDate(calendar[row][col]))
                            classes.push('off', 'disabled');

                        //highlight the currently selected start date
                        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                            classes.push('active', 'start-date');

                        //highlight the currently selected end date
                        if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                            classes.push('active', 'end-date');

                        //highlight dates in-between the selected dates
                        if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                            classes.push('in-range');

                        //apply custom classes for this date
                        var isCustom = this.isCustomDate(calendar[row][col]);
                        if (isCustom !== false) {
                            if (typeof isCustom === 'string')
                                classes.push(isCustom);
                            else
                                Array.prototype.push.apply(classes, isCustom);
                        }

                        var cname = '', disabled = false;
                        for (var i = 0; i < classes.length; i++) {
                            cname += classes[i] + ' ';
                            if (classes[i] == 'disabled')
                                disabled = true;
                        }
                        if (!disabled)
                            cname += 'available';

                        html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

                    }
                    html += '</tr>';
                }

                html += '</tbody>';
                html += '</table>';

                this.container.find('.calendar.' + side + ' .calendar-table').html(html);

            },

            renderTimePicker: function(side) {

                // Don't bother updating the time picker if it's currently disabled
                // because an end date hasn't been clicked yet
                if (side == 'right' && !this.endDate) return;

                var html, selected, minDate, maxDate = this.maxDate;

                if (this.dateLimit && (!this.maxDate || this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)))
                    maxDate = this.startDate.clone().add(this.dateLimit);

                if (side == 'left') {
                    selected = this.startDate.clone();
                    minDate = this.minDate;
                } else if (side == 'right') {
                    selected = this.endDate.clone();
                    minDate = this.startDate;

                    //Preserve the time already selected
                    var timeSelector = this.container.find('.calendar.right .calendar-time div');
                    if (timeSelector.html() != '') {

                        selected.hour(timeSelector.find('.hourselect option:selected').val() || selected.hour());
                        selected.minute(timeSelector.find('.minuteselect option:selected').val() || selected.minute());
                        selected.second(timeSelector.find('.secondselect option:selected').val() || selected.second());

                        if (!this.timePicker24Hour) {
                            var ampm = timeSelector.find('.ampmselect option:selected').val();
                            if (ampm === 'PM' && selected.hour() < 12)
                                selected.hour(selected.hour() + 12);
                            if (ampm === 'AM' && selected.hour() === 12)
                                selected.hour(0);
                        }

                    }

                    if (selected.isBefore(this.startDate))
                        selected = this.startDate.clone();

                    if (maxDate && selected.isAfter(maxDate))
                        selected = maxDate.clone();

                }

                //
                // hours
                //

                html = '<select class="hourselect">';

                var start = this.timePicker24Hour ? 0 : 1;
                var end = this.timePicker24Hour ? 23 : 12;

                for (var i = start; i <= end; i++) {
                    var i_in_24 = i;
                    if (!this.timePicker24Hour)
                        i_in_24 = selected.hour() >= 12 ? (i == 12 ? 12 : i + 12) : (i == 12 ? 0 : i);

                    var time = selected.clone().hour(i_in_24);
                    var disabled = false;
                    if (minDate && time.minute(59).isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.minute(0).isAfter(maxDate))
                        disabled = true;

                    if (i_in_24 == selected.hour() && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + i + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + i + '</option>';
                    }
                }

                html += '</select> ';

                //
                // minutes
                //

                html += ': <select class="minuteselect">';

                for (var i = 0; i < 60; i += this.timePickerIncrement) {
                    var padded = i < 10 ? '0' + i : i;
                    var time = selected.clone().minute(i);

                    var disabled = false;
                    if (minDate && time.second(59).isBefore(minDate))
                        disabled = true;
                    if (maxDate && time.second(0).isAfter(maxDate))
                        disabled = true;

                    if (selected.minute() == i && !disabled) {
                        html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                    } else if (disabled) {
                        html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + padded + '</option>';
                    }
                }

                html += '</select> ';

                //
                // seconds
                //

                if (this.timePickerSeconds) {
                    html += ': <select class="secondselect">';

                    for (var i = 0; i < 60; i++) {
                        var padded = i < 10 ? '0' + i : i;
                        var time = selected.clone().second(i);

                        var disabled = false;
                        if (minDate && time.isBefore(minDate))
                            disabled = true;
                        if (maxDate && time.isAfter(maxDate))
                            disabled = true;

                        if (selected.second() == i && !disabled) {
                            html += '<option value="' + i + '" selected="selected">' + padded + '</option>';
                        } else if (disabled) {
                            html += '<option value="' + i + '" disabled="disabled" class="disabled">' + padded + '</option>';
                        } else {
                            html += '<option value="' + i + '">' + padded + '</option>';
                        }
                    }

                    html += '</select> ';
                }

                //
                // AM/PM
                //

                if (!this.timePicker24Hour) {
                    html += '<select class="ampmselect">';

                    var am_html = '';
                    var pm_html = '';

                    if (minDate && selected.clone().hour(12).minute(0).second(0).isBefore(minDate))
                        am_html = ' disabled="disabled" class="disabled"';

                    if (maxDate && selected.clone().hour(0).minute(0).second(0).isAfter(maxDate))
                        pm_html = ' disabled="disabled" class="disabled"';

                    if (selected.hour() >= 12) {
                        html += '<option value="AM"' + am_html + '>AM</option><option value="PM" selected="selected"' + pm_html + '>PM</option>';
                    } else {
                        html += '<option value="AM" selected="selected"' + am_html + '>AM</option><option value="PM"' + pm_html + '>PM</option>';
                    }

                    html += '</select>';
                }

                this.container.find('.calendar.' + side + ' .calendar-time div').html(html);

            },

            updateFormInputs: function() {

                //ignore mouse movements while an above-calendar text input has focus
                if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                    return;

                this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format));
                if (this.endDate)
                    this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format));

                if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
                    this.container.find('button.applyBtn').removeAttr('disabled');
                } else {
                    this.container.find('button.applyBtn').attr('disabled', 'disabled');
                }

            },

            move: function() {
                var parentOffset = { top: 0, left: 0 },
                    containerTop;
                var parentRightEdge = $(window).width();
                if (!this.parentEl.is('body')) {
                    parentOffset = {
                        top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                        left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                    };
                    parentRightEdge = this.parentEl[0].clientWidth + this.parentEl.offset().left;
                }

                if (this.drops == 'up')
                    containerTop = this.element.offset().top - this.container.outerHeight() - parentOffset.top;
                else
                    containerTop = this.element.offset().top + this.element.outerHeight() - parentOffset.top;
                this.container[this.drops == 'up' ? 'addClass' : 'removeClass']('dropup');

                if (this.opens == 'left') {
                    this.container.css({
                        top: containerTop,
                        right: parentRightEdge - this.element.offset().left - this.element.outerWidth(),
                        left: 'auto'
                    });
                    if (this.container.offset().left < 0) {
                        this.container.css({
                            right: 'auto',
                            left: 9
                        });
                    }
                } else if (this.opens == 'center') {
                    this.container.css({
                        top: containerTop,
                        left: this.element.offset().left - parentOffset.left + this.element.outerWidth() / 2
                            - this.container.outerWidth() / 2,
                        right: 'auto'
                    });
                    if (this.container.offset().left < 0) {
                        this.container.css({
                            right: 'auto',
                            left: 9
                        });
                    }
                } else {
                    this.container.css({
                        top: containerTop,
                        left: this.element.offset().left - parentOffset.left,
                        right: 'auto'
                    });
                    if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                        this.container.css({
                            left: 'auto',
                            right: 0
                        });
                    }
                }
            },

            show: function(e) {
                if (this.isShowing) return;

                // Create a click proxy that is private to this instance of datepicker, for unbinding
                this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

                // Bind global datepicker mousedown for hiding and
                $(document)
                    .on('mousedown.daterangepicker', this._outsideClickProxy)
                    // also support mobile devices
                    .on('touchend.daterangepicker', this._outsideClickProxy)
                    // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
                    .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
                    // and also close when focus changes to outside the picker (eg. tabbing between controls)
                    .on('focusin.daterangepicker', this._outsideClickProxy);

                // Reposition the picker if the window is resized while it's open
                $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

                this.oldStartDate = this.startDate.clone();
                this.oldEndDate = this.endDate.clone();
                this.previousRightTime = this.endDate.clone();

                this.updateView();
                this.container.show();
                this.move();
                this.element.trigger('show.daterangepicker', this);
                this.isShowing = true;
            },

            hide: function(e) {
                if (!this.isShowing) return;

                //incomplete date selection, revert to last values
                if (!this.endDate) {
                    this.startDate = this.oldStartDate.clone();
                    this.endDate = this.oldEndDate.clone();
                }

                //if a new date range was selected, invoke the user callback function
                if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                    this.callback(this.startDate, this.endDate, this.chosenLabel);

                //if picker is attached to a text input, update it
                this.updateElement();

                $(document).off('.daterangepicker');
                $(window).off('.daterangepicker');
                this.container.hide();
                this.element.trigger('hide.daterangepicker', this);
                this.isShowing = false;
            },

            toggle: function(e) {
                if (this.isShowing) {
                    this.hide();
                } else {
                    this.show();
                }
            },

            outsideClick: function(e) {
                var target = $(e.target);
                // if the page is clicked anywhere except within the daterangerpicker/button
                // itself then call this.hide()
                if (
                    // ie modal dialog fix
                    e.type == "focusin" ||
                    target.closest(this.element).length ||
                    target.closest(this.container).length ||
                    target.closest('.calendar-table').length
                ) return;
                this.hide();
                this.element.trigger('outsideClick.daterangepicker', this);
            },

            showCalendars: function() {
                this.container.addClass('show-calendar');
                this.move();
                this.element.trigger('showCalendar.daterangepicker', this);
            },

            hideCalendars: function() {
                this.container.removeClass('show-calendar');
                this.element.trigger('hideCalendar.daterangepicker', this);
            },

            hoverRange: function(e) {

                //ignore mouse movements while an above-calendar text input has focus
                if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                    return;

                var label = e.target.getAttribute('data-range-key');

                if (label == this.locale.customRangeLabel) {
                    this.updateView();
                } else {
                    var dates = this.ranges[label];
                    this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.locale.format));
                    this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.locale.format));
                }

            },

            clickRange: function(e) {
                var label = e.target.getAttribute('data-range-key');
                this.chosenLabel = label;
                if (label == this.locale.customRangeLabel) {
                    this.showCalendars();
                } else {
                    var dates = this.ranges[label];
                    this.startDate = dates[0];
                    this.endDate = dates[1];

                    if (!this.timePicker) {
                        this.startDate.startOf('day');
                        this.endDate.endOf('day');
                    }

                    if (!this.alwaysShowCalendars)
                        this.hideCalendars();
                    this.clickApply();
                }
            },

            clickPrev: function(e) {
                var cal = $(e.target).parents('.calendar');
                if (cal.hasClass('left')) {
                    this.leftCalendar.month.subtract(1, 'month');
                    if (this.linkedCalendars)
                        this.rightCalendar.month.subtract(1, 'month');
                } else {
                    this.rightCalendar.month.subtract(1, 'month');
                }
                this.updateCalendars();
            },

            clickNext: function(e) {
                var cal = $(e.target).parents('.calendar');
                if (cal.hasClass('left')) {
                    this.leftCalendar.month.add(1, 'month');
                } else {
                    this.rightCalendar.month.add(1, 'month');
                    if (this.linkedCalendars)
                        this.leftCalendar.month.add(1, 'month');
                }
                this.updateCalendars();
            },

            hoverDate: function(e) {

                //ignore mouse movements while an above-calendar text input has focus
                //if (this.container.find('input[name=daterangepicker_start]').is(":focus") || this.container.find('input[name=daterangepicker_end]').is(":focus"))
                //    return;

                //ignore dates that can't be selected
                if (!$(e.target).hasClass('available')) return;

                //have the text inputs above calendars reflect the date being hovered over
                var title = $(e.target).attr('data-title');
                var row = title.substr(1, 1);
                var col = title.substr(3, 1);
                var cal = $(e.target).parents('.calendar');
                var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

                if (this.endDate && !this.container.find('input[name=daterangepicker_start]').is(":focus")) {
                    this.container.find('input[name=daterangepicker_start]').val(date.format(this.locale.format));
                } else if (!this.endDate && !this.container.find('input[name=daterangepicker_end]').is(":focus")) {
                    this.container.find('input[name=daterangepicker_end]').val(date.format(this.locale.format));
                }

                //highlight the dates between the start date and the date being hovered as a potential end date
                var leftCalendar = this.leftCalendar;
                var rightCalendar = this.rightCalendar;
                var startDate = this.startDate;
                if (!this.endDate) {
                    this.container.find('.calendar tbody td').each(function(index, el) {

                        //skip week numbers, only look at dates
                        if ($(el).hasClass('week')) return;

                        var title = $(el).attr('data-title');
                        var row = title.substr(1, 1);
                        var col = title.substr(3, 1);
                        var cal = $(el).parents('.calendar');
                        var dt = cal.hasClass('left') ? leftCalendar.calendar[row][col] : rightCalendar.calendar[row][col];

                        if ((dt.isAfter(startDate) && dt.isBefore(date)) || dt.isSame(date, 'day')) {
                            $(el).addClass('in-range');
                        } else {
                            $(el).removeClass('in-range');
                        }

                    });
                }

            },

            clickDate: function(e) {

                if (!$(e.target).hasClass('available')) return;

                var title = $(e.target).attr('data-title');
                var row = title.substr(1, 1);
                var col = title.substr(3, 1);
                var cal = $(e.target).parents('.calendar');
                var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];

                //
                // this function needs to do a few things:
                // * alternate between selecting a start and end date for the range,
                // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
                // * if autoapply is enabled, and an end date was chosen, apply the selection
                // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
                // * if one of the inputs above the calendars was focused, cancel that manual input
                //

                if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
                    if (this.timePicker) {
                        var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.left .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                        var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
                        var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
                        date = date.clone().hour(hour).minute(minute).second(second);
                    }
                    this.endDate = null;
                    this.setStartDate(date.clone());
                } else if (!this.endDate && date.isBefore(this.startDate)) {
                    //special case: clicking the same date for start/end,
                    //but the time of the end date is before the start date
                    this.setEndDate(this.startDate.clone());
                } else { // picking end
                    if (this.timePicker) {
                        var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
                        if (!this.timePicker24Hour) {
                            var ampm = this.container.find('.right .ampmselect').val();
                            if (ampm === 'PM' && hour < 12)
                                hour += 12;
                            if (ampm === 'AM' && hour === 12)
                                hour = 0;
                        }
                        var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
                        var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
                        date = date.clone().hour(hour).minute(minute).second(second);
                    }
                    this.setEndDate(date.clone());
                    if (this.autoApply) {
                        this.calculateChosenLabel();
                        this.clickApply();
                    }
                }

                if (this.singleDatePicker) {
                    this.setEndDate(this.startDate);
                    if (!this.timePicker)
                        this.clickApply();
                }

                this.updateView();

                //This is to cancel the blur event handler if the mouse was in one of the inputs
                e.stopPropagation();

            },

            calculateChosenLabel: function () {
                var customRange = true;
                var i = 0;
                for (var range in this.ranges) {
                    if (this.timePicker) {
                        if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                            customRange = false;
                            this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                            break;
                        }
                    } else {
                        //ignore times when comparing dates if time picker is not enabled
                        if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                            customRange = false;
                            this.chosenLabel = this.container.find('.ranges li:eq(' + i + ')').addClass('active').html();
                            break;
                        }
                    }
                    i++;
                }
                if (customRange) {
                    if (this.showCustomRangeLabel) {
                        this.chosenLabel = this.container.find('.ranges li:last').addClass('active').html();
                    } else {
                        this.chosenLabel = null;
                    }
                    this.showCalendars();
                }
            },

            clickApply: function(e) {
                this.hide();
                if ($("#bld-iah-toetsingsinkomen").length) {
                    $('input',$(this.element).prev("div.date")).trigger('apply.daterangepicker', this);
                } else {
                    this.element.trigger('apply.daterangepicker', this);
                }
            },

            clickCancel: function(e) {
                this.startDate = this.oldStartDate;
                this.endDate = this.oldEndDate;
                this.hide();
                this.element.trigger('cancel.daterangepicker', this);
            },

            monthOrYearChanged: function(e) {
                var isLeft = $(e.target).closest('.calendar').hasClass('left'),
                    leftOrRight = isLeft ? 'left' : 'right',
                    cal = this.container.find('.calendar.'+leftOrRight);

                // Month must be Number for new moment versions
                var month = parseInt(cal.find('.monthselect').val(), 10);
                var year = cal.find('.yearselect').val();

                if (!isLeft) {
                    if (year < this.startDate.year() || (year == this.startDate.year() && month < this.startDate.month())) {
                        month = this.startDate.month();
                        year = this.startDate.year();
                    }
                }

                if (this.minDate) {
                    if (year < this.minDate.year() || (year == this.minDate.year() && month < this.minDate.month())) {
                        month = this.minDate.month();
                        year = this.minDate.year();
                    }
                }

                if (this.maxDate) {
                    if (year > this.maxDate.year() || (year == this.maxDate.year() && month > this.maxDate.month())) {
                        month = this.maxDate.month();
                        year = this.maxDate.year();
                    }
                }

                if (isLeft) {
                    this.leftCalendar.month.month(month).year(year);
                    if (this.linkedCalendars)
                        this.rightCalendar.month = this.leftCalendar.month.clone().add(1, 'month');
                } else {
                    this.rightCalendar.month.month(month).year(year);
                    if (this.linkedCalendars)
                        this.leftCalendar.month = this.rightCalendar.month.clone().subtract(1, 'month');
                }
                this.updateCalendars();
            },

            timeChanged: function(e) {

                var cal = $(e.target).closest('.calendar'),
                    isLeft = cal.hasClass('left');

                var hour = parseInt(cal.find('.hourselect').val(), 10);
                var minute = parseInt(cal.find('.minuteselect').val(), 10);
                var second = this.timePickerSeconds ? parseInt(cal.find('.secondselect').val(), 10) : 0;

                if (!this.timePicker24Hour) {
                    var ampm = cal.find('.ampmselect').val();
                    if (ampm === 'PM' && hour < 12)
                        hour += 12;
                    if (ampm === 'AM' && hour === 12)
                        hour = 0;
                }

                if (isLeft) {
                    var start = this.startDate.clone();
                    start.hour(hour);
                    start.minute(minute);
                    start.second(second);
                    this.setStartDate(start);
                    if (this.singleDatePicker) {
                        this.endDate = this.startDate.clone();
                    } else if (this.endDate && this.endDate.format('YYYY-MM-DD') == start.format('YYYY-MM-DD') && this.endDate.isBefore(start)) {
                        this.setEndDate(start.clone());
                    }
                } else if (this.endDate) {
                    var end = this.endDate.clone();
                    end.hour(hour);
                    end.minute(minute);
                    end.second(second);
                    this.setEndDate(end);
                }

                //update the calendars so all clickable dates reflect the new time component
                this.updateCalendars();

                //update the form inputs above the calendars with the new time
                this.updateFormInputs();

                //re-render the time pickers because changing one selection can affect what's enabled in another
                this.renderTimePicker('left');
                this.renderTimePicker('right');

            },

            formInputsChanged: function(e) {
                var isRight = $(e.target).closest('.calendar').hasClass('right');
                var start = moment(this.container.find('input[name="daterangepicker_start"]').val(), this.locale.format);
                var end = moment(this.container.find('input[name="daterangepicker_end"]').val(), this.locale.format);

                if (start.isValid() && end.isValid()) {

                    if (isRight && end.isBefore(start))
                        start = end.clone();

                    this.setStartDate(start);
                    this.setEndDate(end);

                    if (isRight) {
                        this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format));
                    } else {
                        this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format));
                    }

                }

                this.updateView();
            },

            formInputsFocused: function(e) {

                // Highlight the focused input
                this.container.find('input[name="daterangepicker_start"], input[name="daterangepicker_end"]').removeClass('active');
                $(e.target).addClass('active');

                // Set the state such that if the user goes back to using a mouse,
                // the calendars are aware we're selecting the end of the range, not
                // the start. This allows someone to edit the end of a date range without
                // re-selecting the beginning, by clicking on the end date input then
                // using the calendar.
                var isRight = $(e.target).closest('.calendar').hasClass('right');
                if (isRight) {
                    this.endDate = null;
                    this.setStartDate(this.startDate.clone());
                    this.updateView();
                }

            },

            formInputsBlurred: function(e) {

                // this function has one purpose right now: if you tab from the first
                // text input to the second in the UI, the endDate is nulled so that
                // you can click another, but if you tab out without clicking anything
                // or changing the input value, the old endDate should be retained

                if (!this.endDate) {
                    var val = this.container.find('input[name="daterangepicker_end"]').val();
                    var end = moment(val, this.locale.format);
                    if (end.isValid()) {
                        this.setEndDate(end);
                        this.updateView();
                    }
                }

            },

            elementChanged: function() {
                if (!this.element.is('input')) return;
                if (!this.element.val().length) return;
                if (this.element.val().length < this.locale.format.length) return;

                var dateString = this.element.val().split(this.locale.separator),
                    start = null,
                    end = null;

                if (dateString.length === 2) {
                    start = moment(dateString[0], this.locale.format);
                    end = moment(dateString[1], this.locale.format);
                }

                if (this.singleDatePicker || start === null || end === null) {
                    start = moment(this.element.val(), this.locale.format);
                    end = start;
                }

                if (!start.isValid() || !end.isValid()) return;

                this.setStartDate(start);
                this.setEndDate(end);
                this.updateView();
            },

            keydown: function(e) {
                //hide on tab or enter
                if ((e.keyCode === 9) || (e.keyCode === 13)) {
                    this.hide();
                }
            },

            updateElement: function() {
                if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
                    this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
                    this.element.trigger('change');
                } else if (this.element.is('input') && this.autoUpdateInput) {
                    this.element.val(this.startDate.format(this.locale.format));
                    this.element.trigger('change');
                }
            },

            remove: function() {
                this.container.remove();
                this.element.off('.daterangepicker');
                this.element.removeData();
            }

        };

        $.fn.daterangepicker = function(options, callback) {
            this.each(function() {
                var el = $(this);
                if (el.data('daterangepicker'))
                    el.data('daterangepicker').remove();
                el.data('daterangepicker', new DateRangePicker(el, options, callback));
            });
            return this;
        };

        return DateRangePicker;

    }));
}
// jQuery Mask Plugin v1.14.11
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp={scope:{},findInternal:function(a,l,d){a instanceof String&&(a=String(a));for(var p=a.length,h=0;h<p;h++){var b=a[h];if(l.call(d,b,h,a))return{i:h,v:b}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,l,d){if(d.get||d.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[l]=d.value)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,l,d,p){if(l){d=$jscomp.global;a=a.split(".");for(p=0;p<a.length-1;p++){var h=a[p];h in d||(d[h]={});d=d[h]}a=a[a.length-1];p=d[a];l=l(p);l!=p&&null!=l&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:l})}};
$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,d){return $jscomp.findInternal(this,a,d).v}},"es6-impl","es3");
(function(a,l,d){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?module.exports=a(require("jquery")):a(l||d)})(function(a){var l=function(b,e,f){var c={invalid:[],getCaret:function(){try{var a,r=0,g=b.get(0),e=document.selection,f=g.selectionStart;if(e&&-1===navigator.appVersion.indexOf("MSIE 10"))a=e.createRange(),a.moveStart("character",-c.val().length),r=a.text.length;else if(f||"0"===f)r=f;return r}catch(C){}},setCaret:function(a){try{if(b.is(":focus")){var c,
g=b.get(0);g.setSelectionRange?g.setSelectionRange(a,a):(c=g.createTextRange(),c.collapse(!0),c.moveEnd("character",a),c.moveStart("character",a),c.select())}}catch(B){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val());b.data("mask-previus-caret-pos",c.getCaret());c.maskDigitPosMapOld=c.maskDigitPosMap}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},
100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){d===c.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){d=c.val()}).on("focus.mask",function(b){!0===f.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){f.clearIfNotMatch&&!h.test(c.val())&&c.val("")})},getRegexMask:function(){for(var a=[],b,c,f,n,d=0;d<e.length;d++)(b=m.translation[e.charAt(d)])?(c=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=b.optional,
(b=b.recursive)?(a.push(e.charAt(d)),n={digit:e.charAt(d),pattern:c}):a.push(f||b?c+"?":c)):a.push(e.charAt(d).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");n&&(a=a.replace(new RegExp("("+n.digit+"(.*"+n.digit+")?)"),"($1)?").replace(new RegExp(n.digit,"g"),n.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var c=b.is("input")?"val":"text";if(0<arguments.length){if(b[c]()!==a)b[c](a);
c=b}else c=b[c]();return c},calculateCaretPosition:function(){var a=b.data("mask-previus-value")||"",e=c.getMasked(),g=c.getCaret();if(a!==e){var f=b.data("mask-previus-caret-pos")||0,e=e.length,d=a.length,m=a=0,h=0,l=0,k;for(k=g;k<e&&c.maskDigitPosMap[k];k++)m++;for(k=g-1;0<=k&&c.maskDigitPosMap[k];k--)a++;for(k=g-1;0<=k;k--)c.maskDigitPosMap[k]&&h++;for(k=f-1;0<=k;k--)c.maskDigitPosMapOld[k]&&l++;g>d?g=e:f>=g&&f!==d?c.maskDigitPosMapOld[g]||(f=g,g=g-(l-h)-a,c.maskDigitPosMap[g]&&(g=f)):g>f&&(g=
g+(h-l)+m)}return g},behaviour:function(f){f=f||window.event;c.invalid=[];var e=b.data("mask-keycode");if(-1===a.inArray(e,m.byPassKeys)){var e=c.getMasked(),g=c.getCaret();setTimeout(function(){c.setCaret(c.calculateCaretPosition())},10);c.val(e);c.setCaret(g);return c.callbacks(f)}},getMasked:function(a,b){var g=[],d=void 0===b?c.val():b+"",n=0,h=e.length,q=0,l=d.length,k=1,r="push",p=-1,t=0,y=[],v,z;f.reverse?(r="unshift",k=-1,v=0,n=h-1,q=l-1,z=function(){return-1<n&&-1<q}):(v=h-1,z=function(){return n<
h&&q<l});for(var A;z();){var x=e.charAt(n),w=d.charAt(q),u=m.translation[x];if(u)w.match(u.pattern)?(g[r](w),u.recursive&&(-1===p?p=n:n===v&&(n=p-k),v===p&&(n-=k)),n+=k):w===A?(t--,A=void 0):u.optional?(n+=k,q-=k):u.fallback?(g[r](u.fallback),n+=k,q-=k):c.invalid.push({p:q,v:w,e:u.pattern}),q+=k;else{if(!a)g[r](x);w===x?(y.push(q),q+=k):(A=x,y.push(q+t),t++);n+=k}}d=e.charAt(v);h!==l+1||m.translation[d]||g.push(d);g=g.join("");c.mapMaskdigitPositions(g,y,l);return g},mapMaskdigitPositions:function(a,
b,e){a=f.reverse?a.length-e:0;c.maskDigitPosMap={};for(e=0;e<b.length;e++)c.maskDigitPosMap[b[e]+a]=1},callbacks:function(a){var h=c.val(),g=h!==d,m=[h,a,b,f],q=function(a,b,c){"function"===typeof f[a]&&b&&f[a].apply(this,c)};q("onChange",!0===g,m);q("onKeyPress",!0===g,m);q("onComplete",h.length===e.length,m);q("onInvalid",0<c.invalid.length,[h,a,b,c.invalid,f])}};b=a(b);var m=this,d=c.val(),h;e="function"===typeof e?e(c.val(),void 0,b,f):e;m.mask=e;m.options=f;m.remove=function(){var a=c.getCaret();
c.destroyEvents();c.val(m.getCleanVal());c.setCaret(a);return b};m.getCleanVal=function(){return c.getMasked(!0)};m.getMaskedVal=function(a){return c.getMasked(!1,a)};m.init=function(d){d=d||!1;f=f||{};m.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;m.byPassKeys=a.jMaskGlobals.byPassKeys;m.translation=a.extend({},a.jMaskGlobals.translation,f.translation);m=a.extend(!0,{},m,f);h=c.getRegexMask();if(d)c.events(),c.val(c.getMasked());else{f.placeholder&&b.attr("placeholder",f.placeholder);b.data("mask")&&
b.attr("autocomplete","off");d=0;for(var l=!0;d<e.length;d++){var g=m.translation[e.charAt(d)];if(g&&g.recursive){l=!1;break}}l&&b.attr("maxlength",e.length);c.destroyEvents();c.events();d=c.getCaret();c.val(c.getMasked());c.setCaret(d)}};m.init(!b.is("input"))};a.maskWatchers={};var d=function(){var b=a(this),e={},f=b.attr("data-mask");b.attr("data-mask-reverse")&&(e.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(e.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(e.selectOnFocus=
!0);if(p(b,f,e))return b.data("mask",new l(this,f,e))},p=function(b,e,f){f=f||{};var c=a(b).data("mask"),d=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof e&&(e=e(b)),"object"!==typeof c||d(c.options)!==d(f)||c.mask!==e}catch(t){}},h=function(a){var b=document.createElement("div"),d;a="on"+a;d=a in b;d||(b.setAttribute(a,"return;"),d="function"===typeof b[a]);return d};a.fn.mask=function(b,d){d=d||{};var e=this.selector,c=a.jMaskGlobals,h=c.watchInterval,c=d.watchInputs||c.watchInputs,
t=function(){if(p(this,b,d))return a(this).data("mask",new l(this,b,d))};a(this).each(t);e&&""!==e&&c&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(t)},h));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};
a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(d)};h={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:!/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent)&&h("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},
S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};h=a.jMaskGlobals=a.extend(!0,{},h,a.jMaskGlobals);h.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},h.watchInterval)},window.jQuery,window.Zepto);

var debugJS = false;
var debugSAV = false;
var debugFlow = new Array();
var debugTestWaardes;
var aSTT = [];
var sysdateMod;

var loadDebug = function (oThis) {

  if (bDebugIah === true) {
    initDebugPanel(oThis);
  }

  function initDebugPanel(oThis) {
    var iahDebugId = "bld-iahDebug-" + $(oThis).data("id");
    $(oThis).prepend('<div id = "' + iahDebugId + '" class="panel panel-info panel-debug draggable panel-debug-left">\n\
      <div id="' + iahDebugId + '-heading" class="panel-heading">Debugpanel</div>\n\
      <div id="' + iahDebugId + '-body" class="panel-body"><p id="divVersie">Versie: ' + sVersie + '</p></div>\n\
    </div>');
    $("#" + iahDebugId).draggable();
    if (bDebugIah === true) {
      initDebug(iahDebugId);
      $('#SID_True').click();
    }
  };
};

/* 
Start the debugger obj
*/
var initDebug = function (iahDebugId) {
  var self = this;

  //  SFQ - Show First Question
  //  SAQ - Show All Questions
  //  SAR - Show All Results
  $('#' + iahDebugId + '-body').append('<div class="form-group" id="SAQ">\n\
    <label for="inputDebugSAQ" class="control-label">Tonen...</label>\n\
    <div class="input-group">\n\
      <div class="radio">\n\
        <label id="lblSFQ" for="SFQ_True"><input type="radio" name="inputDebugSAQ" id="SFQ_True" value="ja" checked>1e vraag</label>\n\
      </div>\n\
      <div class="radio">\n\
        <label id="lblSAQ" for="SAQ_True"><input type="radio" name="inputDebugSAQ" id="SAQ_True" value="ja">alle vragen</label>\n\
      </div>\n\
      <div class="radio">\n\
        <label id="lblSAR" for="SAR_True"><input type="radio" name="inputDebugSAQ" id="SAR_True" value="ja">alle resultaten</label>\n\
      </div>\n\
    </div></div>');

  $('#SFQ_True').click(function () {
    doDebugSFQ(true);
  });
  $('#SAQ_True').click(function () {
    doDebugSAQ(true);
  });
  $('#SAR_True').click(function () {
    doDebugSAR(true);
  });

  //STC  - Show Testcases
  if (typeof doDebugTest == 'function' && typeof selectSTC_Options == 'function') {
    $('#' + iahDebugId + '-body').append('<div class="form-group" id="STC">\n\
    <label for="selectSTC">Testcases</label><br />\n\
    <select id="selectSTC" name="selectSTC" class="form-control"></select></div>');
    selectSTC_Options();
    $('#selectSTC').change(function () {
      if (!slideMode) {
        $('#formIAH').empty();
      }
      $('#SID_True').prop("checked", true);
      doDebugSID($('#SID_True'));
      if (typeof vraagIDfirst !== 'undefined') {
        doVraag(vraagIDfirst);
      } else if (typeof procesIDfirst !== 'undefined') {
        doProces(procesIDfirst);
      } else {
        console.log('Cannot start no IDfirst found');
        return;
      }
      doDebugTest(this.value);
    });
  }

  //SID  - Show Id's
  $('#' + iahDebugId + '-body').append('<div class="form-group" id="SID">\
    <label for="inputDebugSID" class="control-label">Toon ID\'s</label>\n\
    <div class="input-group">\n\
      <label class="radio-inline" id="lblSIDTrue" for="SID_True"><input type="radio" name="inputDebugSID" id="SID_True" value=true />ja</label>\n\
      <label class="radio-inline" id="lblSIDFalse" for="SID_False"><input type="radio" name="inputDebugSID" id="SID_False" value=false checked/>nee</label>\n\
    </div></div>');

  $('#SID input').click(function () {
    doDebugSID($('#SID_True'));
  });

  //JS  - Show js-calls
  $('#' + iahDebugId + '-body').append('<div class="form-group" id="JS">\
    <label for="inputDebugJS" class="control-label">Toon js-calls</label>\n\
    <div class="input-group">\n\
      <label class="radio-inline" id="lblJSTrue" for="JS_True"><input type="radio" name="inputDebugJS" id="JS_True" value=true />ja</label>\n\
      <label class="radio-inline" id="lblJSFalse" for="JS_False"><input type="radio" name="inputDebugJS" id="JS_False" value=false checked/>nee</label>\n\
    </div></div>');

  $('#JS input').click(function () {
    doDebugJSInit(this);
  });

  //SAV  - Show All Variables
  $('#' + iahDebugId + '-body').append('<div class="form-group" id="SAV">\
    <label for="inputDebugSAV" class="control-label">Toon variabelen</label>\n\
    <div class="input-group">\n\
      <label class="radio-inline" id="lblSAVTrue" for="SAV_True"><input type="radio" name="inputDebugSAV" id="SAV_True" value=true />ja</label>\n\
      <label class="radio-inline" id="lblSAVFalse" for="SAV_False"><input type="radio" name="inputDebugSAV" id="SAV_False" value=false checked/>nee</label>\n\
    </div></div>');

  $('#SAV input').click(function () {
    doDebugSAV($(this));
  });

  // Total test
  if (aSTT.length > 0) {
    $('#' + iahDebugId + '-body').append('<div class="form-group" id="STT">\
    <label for="inputDebugSTT" class="control-label">Geautomatiseerd testen</label>\n\
    <div class="input-group">\n\
      <label class="radio-inline" id="lblSTTTrue" for="STT_True"><input type="radio" name="inputDebugSTT" id="STT_True" value=true />ja</label>\n\
      <label class="radio-inline" id="lblSTTFalse" for="STT_False"><input type="radio" name="inputDebugSTT" id="STT_False" value=false checked/>nee</label>\n\
    </div></div>');

    $('#STT input').click(function () {
      doDebugSTT($(this));
    });

  }

  //Systemdate
  if (aVar["sysDatum"]) {
    $('#' + iahDebugId + '-body').append('<div class="form-group" id="SYSDAT">\
    <label for="inputDebugSysdat" class="control-label">Systeemdatum aanpassen [dd-mm-jjjj]</label>\n\
    <div class="date"><input type="text" name="inputDebugSysdat" id="inputDebugSysdat" class="form-control"/><p>Syteemdatum is ingesteld op: <span id="actDebugSysDat">' + dateToStr(aVar["sysDatum"]) + '</p><span></p></div>\n\
    </div>');

    $('#inputDebugSysdat').change(function () {
      var aTmp = document.getElementById('inputDebugSysdat').value.split('-');
      if (aTmp.length === 3) {
        //if (isValidDate(aTmp[0], parseInt(aTmp[1])-1 , aTmp[2])) {
          sysdateMod = new Date(aTmp[2], parseInt(aTmp[1]) - 1, aTmp[0]);
        //}
        document.getElementById('actDebugSysDat').innerHTML = dateToStr(sysdateMod);
      }
    });
  }
  
  function doDebugSFQ(bSFQ) {
    $('#formIAH .clBlok').remove();
    $('#divResultaat').remove();
    $('#divButtonsResultIAH').remove();
    if (typeof vraagIDfirst !== 'undefined') {
      doVraag(vraagIDfirst);
    } else if (typeof procesIDfirst !== 'undefined') {
      doProces(procesIDfirst);
    } else {
      console.log('Cannot start no IDfirst found');
      return;
    }
    doRebuildVars();
  }

  function doDebugSAQ(bSAQ) {
    debugSQF = false;
    debugSAQ = true;
    debugSAR = false;
    $('#formIAH .clBlok').remove();
    $('#divResultaat').remove();
    $('#divButtonsResultIAH').remove();
    for (var i in aVraag) {
      doVraag(i);
      if (i === 'V1A-1') {
        $('#V1A-1').prop('selectedIndex', 1);
        doSaveVar('V1A-1');
      }
    }
    doRebuildVars();
    $('.clUserInput').prop('disabled', true);
    $('.clUserInput').css('opacity', '0.5');
  }

  function doDebugSAR(bSAR) {
    debugSQF = false;
    debugSAQ = false;
    debugSAR = true;
    $('#formIAH .clBlok').remove();
    $('#fsButtons').remove();
    $('#fsUitvoer').remove();
    $('#fsButtonsWijzig').remove();
    for (i in aResult) {
      doResult(i);
    }
    doRebuildVars();
  }

  function doDebugSAV(oThis) {
    bSAV = (oThis.val() === 'true') ? true : false;
    var iahDebugId = "bld-iahDebugVar-" + $(oThis).closest('section').data("id");
    $('#' + iahDebugId).remove().slideUp();
    debugSav = false;
    if (bSAV === true) {
      debugSAV = true;
      $(oThis).closest('section.bld-iah>div.panel-debug').after('<div id = "' + iahDebugId + '" class="panel panel-info panel-debug panel-debug-var draggable panel-debug-right">\n\
      <div id="iahDebugVarHeading" class="panel-heading">Variabelen<span class="pull-right clickable" data-effect="slideUp"><i class="fa fa-times"></i></span></div>\n\
      <div id="iahDebugVarBody" class="panel-body"></div>\n\
      </div>');
      $('#iahDebugVarBody').append('<h2>Variabelen</h2>');
      $('#iahDebugVarBody').append('<ul id="userVars" />');
      debugGetVars();
      $("#" + iahDebugId).draggable();
      $("#" + iahDebugId).addClass("alignLinks"); // zorgt ervoor dat de variabele debug niet meer over het scherm wordt geplaatst
      $("#" + iahDebugId + ' .panel-heading .clickable').on('click', function () {
        $('#SAV_False').click();
      });
    }
  }

  function doDebugJSInit(oThis) {
    bJS = ($(oThis).val() === 'true') ? true : false;
    var iahDebugId = "bld-iahDebugJS-" + $(oThis).closest('section').data("id");
    debugJS = false;
    $('#' + iahDebugId).remove().slideUp();
    if ($('#' + iahDebugId).is('#' + iahDebugId) === false) {
      if (bJS === true) {
        debugJS = true;
        $(oThis).closest('section.bld-iah>div.panel-debug').after('<div id = "' + iahDebugId + '" class="panel panel-info panel-debug panel-debug-js draggable panel-debug-right">\n\
      <div id="iahDebugJSHeading" class="panel-heading">Javascript calls<span class="pull-right clickable closeJS" data-effect="slideUp"><i class="fa fa-times"></i></span><span class="pull-right clickable clearJS" ><i class="fa fa-eraser"></i></span></div>\n\
      <div id="iahDebugJSBody" class="panel-body"></div>\n\
      </div>');
        $('#iahDebugJSBody').append('<ul id="jscalls" />');
        $("#" + iahDebugId).draggable();
        $("#" + iahDebugId + ' .panel-heading .closeJS').on('click', function () {
          $('#JS_False').click();
        });
        $("#" + iahDebugId + ' .panel-heading .clearJS').on('click', function () {
          $('#jscalls').empty();
        });
      }
    }
  }

  function doDebugSID(oThis) {
    bSID = oThis.prop('checked');
    debugSID = false;
    $('.clDebugSID').remove();
    if (bSID) {
      debugSID = true;
      $("#formIAH .form-group, #divResultaat .divResult").each(function (i, el) {
        $(this).prepend(' <div class="col-xs-12 bg-warning clDebugSID">' + el.id + '</div>');
      });
      $(".list_result").each(function () {
        $(this).prepend('<span class="bg-warning clDebugSID">' + $(this).closest('.divResult').attr('id') + '</span>');
      });
      $(".kliklijst_result").each(function () {
        $('a', this).before('<span class="bg-warning clDebugSID">' + $(this).attr('id') + '</span>');
      });
    }
  }

  function doDebugSTT(oThis) {
    bSTT = (oThis.val() === 'true') ? true : false;
    var iahDebugId = "bld-iahDebugSTT-" + $(oThis).closest('section').data("id");
    $('#' + iahDebugId).remove().slideUp();
    if (bSTT === true) {
      $(oThis).closest('section.bld-iah>div.panel-debug').after('<div id = "' + iahDebugId + '" class="panel panel-info panel-debug panel-debug-var draggable panel-debug-right panel-debugSTT">\n\
      <div id="' + iahDebugId + 'heading" class="panel-heading">Geautomatiseerd testen<span class="pull-right clickable" data-effect="slideUp"><i class="fa fa-times"></i></span></div>\n\
      <div id="' + iahDebugId + 'body" class="panel-body"></div>\n\
      </div>');
      $('#' + iahDebugId + 'body').append('<div class="form-group" id="STT">\
        <label for="selectSTC" class="control-label">Volledige test</label>\n\
        <select name="selectSTT_Toon" id="selectSTT_Toon" class="form-control">\n\
            <option value="alles"  selected="selected">goed én fout tonen</option>\n\
                <option value="fout">alleen fout tonen</option>\n\
                <option value="goed">alleen goed tonen</option>\n\
            </select>\n\
        <button type="button" class="btn pull-right" id="STT-Start">Start</button>\n\
      </div>\n\
      <div id="automatic_debug_results" /> \n\
      <ul id="STT_ul" />'); //deprecated, remove if all the (deprecated) code concerning the automatic testing script is cleaned
      $("#" + iahDebugId).draggable();
      $("#" + iahDebugId + ' .panel-heading .clickable').on('click', function () {
        $('#STT_False').click();
      });
    }

    // start automated debug scene's 
    $('#STT-Start').click(function () {
      debugStartTest();
    });

    /**
     * Action: Start testing all test scenario's. It compares multiple values within a predefined testscenario.
     * It requires a predefined object 'aSTT' which is made in debug.js in the iah. It also requires doDebugTest() with the same scene names.
     * See Toetsingsinkomen for reference. 
     * @output testResults{} with the testresults and if a test has passed. it also fires displayTestResults(testResults). 
     * It also supports the old aSTT format, but its deprecated, use the new format instead. 
     */
    function debugStartTest() {
      if (typeof aSTT[0].scene === 'string') {
        testResults = aSTT;
        for (var i = 0; testResults.length > i; i++) {
          doDebugTest(testResults[i].scene);
          for (j = 0; testResults[i].varsToTest.length > j; j++) {
            currentValue = eval(testResults[i].varsToTest[j].varToTest);
            testResults[i].varsToTest[j].currentValue = currentValue;
            if (currentValue === testResults[i].varsToTest[j].expectedValue) {
              testResults[i].varsToTest[j].varPassed = true
            } else {
              testResults[i].varsToTest[j].varPassed = false
            }
          }
        }
        displayTestResults(testResults);
        return;
      } else { //deprecated 
        for (var i = 0; i < aSTT.length; i++) {
          var temp = aSTT[i][0];
          var aTemp = aSTT[i][1];
          $("#STT_ul").append("<li class='debugGroup'>" + temp + "<ul id='STT_ul_" + i + "'></ul></li>");
          for (var ii = 0; ii < aTemp.length; ii++) {
            debugFlow = [];
            debugTestWaardes = aTemp[ii][0];
            doDebugTest(temp);
            if (parseInt(aVar['debug_result']) !== aTemp[ii][1]) {
              $('#STT_ul_' + i).append("<li class='fout'><span class='debug_fout debug_flow'>&#10007</span> " + debugFlow + "<br />verwacht: " + aTemp[ii][1] + ", uitkomst = " + aVar['debug_result'] + "</li>");
            } else {
              $('#STT_ul_' + i).append("<li class='goed'><span class='debug_goed debug_flow'>&#10004</span> " + debugFlow + "<br />verwacht: " + aTemp[ii][1] + ", uitkomst = " + aVar['debug_result'] + "</li>");
            }
          }
          doToonDebugSTTResult($('#selectSTT_Toon').value);
        }
      }
    }

    $('#selectSTT_Toon').change(function () {
      doToonDebugSTTResult(this.value);
    });
  }
};

/**
 * Action: Display test results on screen 
 * @interface
 * @param testResults = array obj, with testvariabels and results
 */
function displayTestResults(testResults) {
  selector = $("#automatic_debug_results"); 
  selector.empty();
  testResults.forEach(function (testResultObj) {
    selector.append("<h4 class='debugGroup'>" + testResultObj.scene + "</h4>");
    testResultObj.varsToTest.forEach(function (varToTest) {
      goedFout = varToTest.varPassed ? 'goed ' : 'fout ';
      vinkKruis = varToTest.varPassed ? '&#10004' : '&#10007';
      selector.append("<li class='" + goedFout + "'><span class='debug_" + goedFout + " debug_flow'>" + vinkKruis + "</span> variabele naam: " + varToTest.varToTest +  " verwacht: " + varToTest.expectedValue + "<br /> uitkomst: " + varToTest.currentValue);
      //selector.append(`<li class='${goedFout}'><span class='debug_${goedFout} debug_flow'>${vinkKruis}</span> using backticks 
      //variabele naam: ${varToTest.varToTest} verwacht: ${varToTest.expectedValue}<br /> uitkomst: ${varToTest.currentValue}`);
    })
  })
}

function debugVulIn(id, waarde) {
  if ($(debugTestWaardes).length > 0 && debugTestWaardes[id]) {
    waarde = debugTestWaardes[id];
  }
  if (aVraag[id].type === 'JaNee') {
    if (waarde === true) {
      $('#' + id + '_True').click();
    } else if (waarde === false) {
      $('#' + id + '_False').click();
    }
  } else {

    if (aVraag[id].type === 'RadioGroep') {
      id = id + '_' + waarde.toString()
      $('#' + id).click();
    } 
    
    else if (aVraag[id].type === 'dropdown') {
      if (typeof waarde === "object" && waarde.length === 2 && waarde[0] === "val") {
        $('#' + id).val(waarde[1]);
      } else {
        $('#' + id).prop('selectedIndex', waarde);
      }
      waarde = $('#' + id + " :selected").text();
    } 
    
    else if (aVraag[id].type === 'text' || aVraag[id].type === 'date') {
      $('#' + id).prop('value', waarde);
    } 
    
    else if (aVraag[id].type === 'geboorteDatum') {
      $('#' + id + "-1").prop('value', waarde.split('-')[0]);
      $('#' + id + "-2").prop('value', waarde.split('-')[1]);
      $('#' + id + "-3").prop('value', waarde.split('-')[2]);
      $('#' + id).prop('value', waarde);
    } 
    
    else if (aVraag[id].type === 'datePeriod') {
      $('#' + id + '_Begin').prop('value', waarde[0]);
      $('#' + id + '_Eind').prop('value', waarde[1]);
      id = id + '_Eind';
    } 
    
    else if (aVraag[id].type === 'dateYearMonth') {
      $('#' + id + '_maand').prop('value', waarde.split('-')[0]);
      $('#' + id + '_jaar').prop('value', waarde.split('-')[1]);
      id = id + '_jaar';
    }
    checkVraag(document.getElementById(id));
  }
  debugFlow[debugFlow.length] = [id, waarde];
}

function debugGetVars() {
  $('#userVars').empty();
  for (i in aVar) {
    sVar = aVar[i];
    $('#userVars').append('<li>' + i + ': <span>' + aVar[i] + '</span></li>');
  }
}

var doDebugJS = function (tekst) {
  $('#jscalls').append('<li>' + tekst + '</li>');
};

//this function should be cleaned after the deprecated automatic testing code is cleaned. 
function doToonDebugSTTResult(toon) {
  $("#STT_ul li").show(); //deprecated 
  $("#automatic_debug_results li").show();
  if (toon === "goed") {
    $("#STT_ul li.fout").hide(); //deprecated
    $("#automatic_debug_results li.fout").hide(); 

  } else if (toon === "fout") { 
    $("#STT_ul li.goed").hide(); //deprecated
    $("#automatic_debug_results li.goed").hide();
  }
}



var versie_gen_iah = "1.1.0"; //based on gen_reken 1.4.6 en util 1.2
var slideMode = slideMode || false;
/**
 * fieldsetMode
 * @type {boolean}
 * false: group of questions will be added to a div-block, instead of a fieldset (to prevent nesting with other fieldsets)
 */
var fieldsetMode = fieldsetMode || true;

function initreken(id) {
  initInterface($("#bld-iah-" + id));
}

function initInterface(oThis) {
  var savH1 = $('h1'.oThis);
  $('div.bld-iah-main', oThis)
    .empty()
    .append('<div class="col-xs-12 no-gutter">');
  $('div.bld-iah-main>div', oThis)
    .append(savH1)
    .append('<form id="formIAH" class="form-horizontal" action="#" method="post" onsubmit="return false"></form>')

  if (slideMode === true) {
    loadProgressbar();
  }
  //var datepicker = $.fn.datepicker.noConflict();
  // $.fn.bootstrapDP = datepicker;
  //$.fn.bootstrapDP.defaults.format = "mm/dd/yyyy";
  loadDebug(oThis);

}

// 
/**
 * doTussenkop
 * Append a subhead to the form
 * @param {*} header (string: headertext)
 * @param {*} headerID (string: headerID)
 * @param {*} blokNR (optional, string: in case of blokMode)
 */
function doTussenkop(header, headerID, blokNR = '') {
  // return if header already exists
  if (document.getElementById(headerID)) return;

  let blockID = 'fsInvoer' + blokNR;
  let oBlock = document.getElementById(blockID);
  if (typeof header !== 'undefined' && header !== '') {
    let elBlockTitle = document.createElement('h3');
    elBlockTitle.className = 'bloktitel';
    elBlockTitle.id = headerID;
    elBlockTitle.insertAdjacentText('beforeend', header);
    oBlock.appendChild(elBlockTitle);
  }
}

function doVraag(vraagID) {

  var sExtraClassDivHelpButton; // ToDo: welk doel/kan dit weg?
  if (bDebugIah != undefined && debugJS)
    doDebugJS("doVraag(" + vraagID + ")");
  // return als vraag reeds getoond
  if ($('#div' + vraagID).is('#div' + vraagID))
    return;
  // return + foutmelding  als de te tonen vraag niet bestaat in vragen.js
  if (aVraag[vraagID] == undefined) {
    alert('fout: de gegevens van de te tonen vraag ' + vraagID + ', niet gevonden in tabel aVraag. \n check flow.js en vragen.js');
    return false;
  }

  if (maakBlok(vraagID) == false)
    return false;

  var vraagOpscherm = replaceVarsInText(aVraag[vraagID].opScherm);

  var inputID = vraagID;
  var aVraagType = aVraag[vraagID].type.split("[");
  if (aVraagType.length == 2) {
    aVraagType[1] = aVraagType[1].replace("]", "")
  }

  switch (aVraagType[0]) {
    case 'dropdown':
      if (aVraagType.length == 2) {
        maakVeldDropdown(parseInt(aVraagType[1]));
      } else {
        maakVeldDropdown(1);
      }
      break;
    case 'text':
      maakVeldText();
      break;
    case 'JaNee':
      maakVeldJaNee();
      break;
    case 'RadioGroep':
      maakVeldRadioGroep();
      break;
    case 'checkbox':
      maakVeldCheckbox();
      break;
    case 'geboorteDatum':
      maakVeldGebDatum();
      break;
    case 'date':
      maakVeldDatum();
      break;
    case 'datePeriod':
      maakVeldDatumPeriode();
      break;
    case 'dateYearMonth':
      maakVeldDatumJaarMaand();
      break;
    case 'custom':
      maakCustomVeld(vraagID, inputID, vraagOpscherm);
      break;


  }
  vraagAanvullen();
  doOpSchermIntro();
  doOpSchermExtra();
  checkHelpButton();
  if (typeof vraagAanvullenModuleSpecifiek == 'function') {
    vraagAanvullenModuleSpecifiek(vraagID);
  }


  $('.form-group').removeClass('lastChild');
  $('#div' + inputID).addClass('lastChild');


  //debug
  if (bDebugIah === true && debugSID === true)
    $('#div' + inputID).prepend(' <div class="col-xs-12 bg-warning clDebugSID">' + vraagID + '</div>');
  return;

  // render field width 100% if there is no help available. Else reserve space for the help icon
  function getXsClass() {
    if (aHelp[vraagID]) {
      return "col-xs-11 col-xs-padding";
    } else {
      return "col-xs-12";
    }
  }

  function getSmClass() {
    if (aHelp[vraagID]) {
      return "col-sm-6";
    } else {
      return "col-sm-7";
    }
  }

  function maakVeldDropdown(iAantal) {
    var formGroup = '<div class="form-group" id="div' + vraagID + '">';
    var horizontal = false;

    if (aVraag[vraagID].horizontal) {
      horizontal = true;
      $('#fsInvoer' + blokNR).append(formGroup);
      $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + inputID + '">' + vraagOpscherm + '</label></div>');
    }

    for (var ii = 1; ii <= iAantal; ii++) {
      if (iAantal > 1) {
        var inputID = vraagID + "_" + ii;
        var options = eval("aVraag[vraagID].dropdownKeuze_" + ii);
      } else {
        inputID = vraagID;
        var options = aVraag[vraagID].dropdownKeuze;
      }

      if (!horizontal) {
        $('#fsInvoer' + blokNR).append(formGroup);
        $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + inputID + '">' + vraagOpscherm + '</label></div>');
        $('#div' + vraagID).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div class="select"><select id="' + inputID + '" name="' + vraagID + '" class="form-control" /></select></div></div>');
      }
      // two selects on a row
      else {
        var mobileCols = "col-xs-6";
        if (ii === iAantal) {
          mobileCols = "col-xs-5";
        }
        $('#div' + vraagID).append('<div class="' + mobileCols + ' col-sm-3"><div class="select"><select id="' + inputID + '" name="' + vraagID + '" class="form-control" /></select></div></div>');
      }

      $('#' + inputID).change(function () {
        checkVraag(this)
      });

      //options[1]: controleer of ":" aanwezig. Betreft nummerieke range. van:tot
      var counter = -1;
      if (Array.isArray(options[0]) == false) {
        if ((options[0]).indexOf(":") > -1) {
          counter = 0;
        }
      }
      if (counter == -1) {
        if ((options).length > 1) {
          if (Array.isArray(options[1]) == false) {
            if ((options[1]).indexOf(":") > -1) {
              counter = 1;
            }
          }
        }
      }
      if (counter > -1) {
        //vervang eerst eventueel aanwezig variabelen.
        var aTemp = options[counter].split(":");
        if (aTemp[0] != "function") {
          aTemp = calcRange((options[counter])).split(":");
          if (aTemp[0] < aTemp[1]) {
            s1 = "i<=aTemp[1]";
            s2 = "i++";
          } else {
            s1 = "i>=aTemp[1]";
            s2 = "i--";
          }
          //var counter = 1;
          for (var i = aTemp[0]; eval(s1); eval(s2)) {
            options[counter] = i.toString();
            counter++;
          }
        } else {
          options = eval(aTemp[1]);
        }
      }

      var defaultKeuze;
      if (aVraag[vraagID].defaultKeuze) {
        eval("defaultKeuze = " + aVraag[vraagID].defaultKeuze);
      }
      for (var i = 0; i < options.length; i++) {
        var txtKeuze = options[i];
        var valKeuze = options[i];
        if (Array.isArray(txtKeuze)) {
          if (txtKeuze.length > 1) {
            var txtKeuze = options[i][0];
            var valKeuze = options[i][1];
          }
        }
        var sSelected = "";
        if (defaultKeuze != undefined) {
          if (valKeuze == defaultKeuze) {
            sSelected = ' selected="selected"';
          }
        }
        $('#' + inputID).append('<option value="' + valKeuze + '"' + sSelected + '>' + replaceVarsInText(txtKeuze.toString()) + '</option>');
      }
    }
    inputID = vraagID;
    return;
  }

  function maakVeldText() {
    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + vraagID + '">' + vraagOpscherm + '</label></div>');
    $('#div' + vraagID).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div class="input"><input type="text" name="' + inputID + '" id="' + vraagID + '" class="form-control" /></div></div>');
    $('#' + vraagID).keyup(function (e) {
      checkVraag(this, e);
    });
    if (aVraag[vraagID].onblur) {
      eval("$('#' + vraagID).blur (function(e){" + aVraag[vraagID].onblur + "});")
    }
  }

  function maakVeldJaNee() {
    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + inputID + '">' + vraagOpscherm + '</label></div>');
    $('#div' + vraagID).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div class="input-group" id="input-group-' + vraagID + '" ></div></div>');
    inputID = vraagID + '_True';
    $('#input-group-' + vraagID).append('<label class="radio-inline" for="' + inputID + '" ><input type="radio" name="' + vraagID + '" id="' + inputID + '" value="ja" ><span>ja</span></label>');
    inputID = vraagID + '_False';
    $('#input-group-' + vraagID).append('<label class="radio-inline" for="' + inputID + '" ><input type="radio" name="' + vraagID + '" id="' + inputID + '" value="nee" ><span>nee</span></label>');
    $('#input-group-' + vraagID + ' input:radio').change(function () {
      checkVraag(this);
    });
    inputID = vraagID;
  }

  function maakVeldRadioGroep() {
    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + inputID + '">' + vraagOpscherm + '</label></div>');
    $('#div' + vraagID).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div class="input-group" id="input-group-' + vraagID + '" ></div></div>');
    for (var i = 0; i < aVraag[vraagID].checkboxKeuze.length; i++) {
      $('#input-group-' + vraagID).append('<div class="radio"><label for="' + vraagID + '_' + i + '" ><input type="radio" name="' + vraagID + '" id="' + vraagID + '_' + i + '" value="' + aVraag[vraagID].checkboxValues[i] + '" ><span>' + aVraag[vraagID].checkboxKeuze[i] + '</span></label></div>');
    }
    $('#input-group-' + vraagID + ' input:radio').change(function () {
      checkVraag(this);
    });
    inputID = vraagID;

  }

  function maakVeldCheckbox() {
    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + inputID + '">' + vraagOpscherm + '</label></div>');
    $('#div' + vraagID).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div class="input-group" id="input-group-' + vraagID + '" ></div></div>');
    for (var i = 0; i < aVraag[vraagID].checkboxKeuze.length; i++) {
      $('#input-group-' + vraagID).append('<div class="checkbox"><label for="' + vraagID + '_' + i + '" ><input type="checkbox" name="' + vraagID + '" id="' + vraagID + '_' + i + '" value="' + aVraag[vraagID].checkboxVars[i] + '" ><span>' + aVraag[vraagID].checkboxKeuze[i] + '</span></label></div>');
    }
    $('#input-group-' + vraagID + ' input:checkbox').change(function () {
      checkVraag(this);
    });
    inputID = vraagID;
  }

  /**
   * Set-up birthdate question and event listener for input fields
   */
  function maakVeldGebDatum() {
    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + vraagID + '">' + vraagOpscherm + '</label></div>');
    $('#div' + vraagID).append('<div class="input-group birthdate" id="input-group-' + vraagID + '" ></div>');
    $('#input-group-' + vraagID).append('<input type="hidden" name="' + inputID + '" id="' + vraagID + '"/>');
    $('#input-group-' + vraagID).append('<div class="col-xs-2 birthdate-day"><label class="control-label" for="' + vraagID + '-1">Dag</label><input inputmode="decimal" type="text" maxlength="2" name="' + inputID + '-1" id="' + vraagID + '-1" class="form-control" placeholder="dd"/></div>');
    $('#input-group-' + vraagID).append('<div class="col-xs-2 birthdate-month"><label class="control-label" for="' + vraagID + '-2">Maand</label><input inputmode="decimal" type="text" maxlength="2" name="' + inputID + '-2" id="' + vraagID + '-2" class="form-control" placeholder="mm"/></div>');
    $('#input-group-' + vraagID).append('<div class="col-xs-2 birthdate-year"><label class="control-label" for="' + vraagID + '-3">Jaar</label><input inputmode="decimal" type="text" maxlength="4" name="' + inputID + '-3" id="' + vraagID + '-3" class="form-control" placeholder="jjjj"/></div>');

    $('#div' + vraagID + ' .birthdate input').on("keydown keyup change", function (e) {
      // shift-key, arrow-key
      if (e.keyCode == 16 || e.keyCode == 37 || e.keyCode == 39) {
        return;
      }
      var oThis = this;
      handleFocusBirthdateField(e, oThis);
      inputComplete();
    });
  }
  /**
   * This function checks if the input fields are complete to validate.
   */
  function inputComplete() {
    // get inputfields of birthdate
    var day = document.getElementById(vraagID + "-1").value;
    var month = document.getElementById(vraagID + "-2").value;
    var year = document.getElementById(vraagID + "-3").value;
    var oInput = document.getElementById(vraagID);
    // check if input is complete
    if (day != "" && month != "" && year != "" && year.length == 4) {
      var fullDate = day + "-" + month + "-" + year;
      $("#" + vraagID).val(fullDate);
    } else {
      $("#" + vraagID).val('');
    }
    checkVraag(oInput);
  }
  /**
  * This function handles the interaction of the input fields of the birthdate.
  * @param e : event on keyup, keydown and change event on all input fields within class birthdate
  * @param oThis : input field with keyup, keydown and change event 
  */
  function handleFocusBirthdateField(e, oThis) {
    var id = e.currentTarget.id.slice(-1);

    //If input fields month or year are empty and the user presses the backspace key, then the previous input field will get the focus
    if (e.type === 'keydown') {
      if (e.keyCode === 8 && id !== '1') {
        if ($(oThis).val().length === 0) {
          $(oThis).closest('div').prev().find('input').focus();
        }
      }
    }

    // If user does press any key, exception for backspace, then there will be checked if input fields for day or month are correctly filled.
    // If so, the focus will be set on the next available input field.
    else if (e.type === 'keyup') {
      var maxLength = $(oThis).attr("maxlength");
      if (e.keyCode !== 8 && e.keyCode !== 9 && id !== '3') {
        if (maxLength == $(oThis).val().length) {
          $(oThis).closest('div').next().find('input').focus();
        }
      }
    }
  }

  function maakVeldDatum() {

    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + vraagID + '">' + vraagOpscherm + '</label></div>');
    if ($("#bld-iah-toetsingsinkomen").length) {
      $('#div' + vraagID).append('<div class="' + getXsClass() + ' col-sm-4 col-md-3"><div id="dpbs-' + vraagID + '" class="date"><input type="' + getInputDateType() + '" name="' + inputID + '" id="' + vraagID + '" class="form-control" placeholder="dd-mm-jjjj" /></div><span id="dpbs-icon-' + inputID + '" class="fa fa-calendar bld-form-icon bld-iah-calendar"></span></div>');
      configDatepicker($('#dpbs-icon-' + inputID), inputID, calcRange(aVraag[vraagID].yearRange));
    } else {
      $('#div' + vraagID).append('<div class="' + getXsClass() + ' col-sm-4 col-md-3"><div id="dpbs-' + vraagID + '" class="date"><input type="' + getInputDateType() + '" name="' + inputID + '" id="' + vraagID + '" class="form-control" placeholder="dd-mm-jjjj" /><span class="fa fa-calendar bld-form-icon"></span></div></div>');
      configDatepicker($('#' + vraagID), inputID, calcRange(aVraag[vraagID].yearRange));
    }
    if (!isNativeDatepicker()) {
      $('#' + vraagID).on('apply.daterangepicker', function (ev, picker) {
        $('#' + vraagID).val(picker.startDate.format('DD-MM-YYYY'));
        checkVraag(this);
      });
    } else {
      $('.bld-form-icon').hide();
      $('div.date .form-control').css("padding-right", 0);
    }

    $('#' + vraagID).change(function () {
      var date = $(this).val();
      $('#' + vraagID).attr('value', date);

      checkVraag(this);
    })
  }

  // addDate(selector, inputID, labelTxt, YearRange); //selector,inputID,labelTxt,YearRange,bLabelTonen
  function addDate(selector, inputID, labelTxt, YearRange, bLabelTonen) {
    var clLabel = '';
    var range = '';
    if (bLabelTonen != undefined && bLabelTonen == false)
      clLabel = 'sr';
    if (YearRange != undefined)
      range = YearRange;
    if (aVar['standAlone'] === 'nee') {
      $(selector).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><label for="' + inputID + '">' + labelTxt + '</label></div>');
      $(selector).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div id="dpbs-' + inputID + '" class="date"></div><span id="dpbs-icon-' + inputID + '" class="dropup fa fa-calendar bld-form-icon bld-iah-calendar"></span></div>');
      $(selector + ' #dpbs-' + inputID).append('<input type="' + getInputDateType() + '" id="' + inputID + '" class="form-control"  maxlength="10"/>');
      configDatepicker($('#dpbs-icon-' + inputID), inputID, range);
    } else if ($("#bld-iah-toetsingsinkomen").length) {
      $(selector).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><label for="' + inputID + '">' + labelTxt + '</label></div>');
      $(selector).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div id="dpbs-' + inputID + '" class="date"></div><span id="dpbs-icon-' + inputID + '" class="fa fa-calendar bld-form-icon bld-iah-calendar"></span></div>');
      $(selector + ' #dpbs-' + inputID).append('<input type="' + getInputDateType() + '" id="' + inputID + '" class="form-control"  maxlength="10"/>');
      configDatepicker($('#dpbs-icon-' + inputID), inputID, range);
    } else {
      $(selector).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><label for="' + inputID + '">' + labelTxt + '</label></div>');
      $(selector).append('<div class="' + getXsClass() + ' ' + getSmClass() + '"><div id="dpbs-' + inputID + '" class="date"></div></div>');
      $(selector + ' #dpbs-' + inputID).append('<input type="' + getInputDateType() + '" id="' + inputID + '" class="form-control"  maxlength="10"/><span class="fa fa-calendar bld-form-icon"></span>');
      configDatepicker($('#' + inputID), inputID, range);
    }

    //$('.ui-datepicker-trigger').attr('title', 'Selecteer een datum');

    if (!isNativeDatepicker()) {
      $('#' + inputID).on('apply.daterangepicker', function (ev, picker) {
        //drops : up"
        $('#' + inputID).val(picker.startDate.format('DD-MM-YYYY'));
        checkVraag(this);
      });
    } else {
      $('.bld-form-icon').hide()
      $('div.date .form-control').css("padding-right", 0);
    }
    $('#' + inputID).change(function () {
      var date = $(this).val();
      $('#' + inputID).attr('value', date);

      checkVraag(this);
    })
  } // end of addDate

  function configDatepicker(obj, inputID, yearRange) {
    var year = '';

    if (aVraag[vraagID] && aVraag[vraagID].yearRange && yearRange === "") {
      year = calcRange(aVraag[vraagID].yearRange);
    } else {
      year = yearRange;
    }

    if (year === undefined || year === '')
      year = (new Date).getFullYear() + ":" + (new Date).getFullYear();
    aYear = year.split(":");
    yearChange = (aYear[0] === aYear[1]) ? false : true;

    var defaultDate = new Date(aYear[1], 0, 1); //{ year: aYear[1], month: 0, day: 1 }
    var minDate = new Date(aYear[0], 0, 1);
    var maxDate = new Date(aYear[1], 11, 31);
    if (aVraag[inputID] != undefined) {
      if (aVraag[inputID].defaultDate != undefined) {
        if (aVraag[inputID].defaultDate) {
          var tmpDate = replaceVarsInText(aVraag[inputID].defaultDate);
          tmpDate = tmpDate.split("-");
          defaultDate = {
            year: parseInt(tmpDate[2]),
            month: parseInt(tmpDate[1]) - 1,
            day: parseInt(tmpDate[0])
          }
          // new Date(parseInt(tmpDate[2]), parseInt(tmpDate[1]) - 1, parseInt(tmpDate[0]));
        }
      }
      if (aVraag[inputID].minDate != undefined) {
        if (aVraag[inputID].minDate) {
          minDate = replaceVarsInText(aVraag[inputID].minDate);
        }
      }
      if (aVraag[inputID].maxDate != undefined && aVraag[inputID].maxDate) {
        maxDate = replaceVarsInText(aVraag[inputID].maxDate);
      }
    }

    if (!isNativeDatepicker()) {

      $(obj).daterangepicker({
        parentEl: ($("#" + inputID, ".modal").length > 0) ? '#bld-modal' : 'body',
        singleDatePicker: true,
        autoUpdateInput: false,
        showDropdowns: true,
        autoApply: true,
        "locale": {
          "format": "DD-MM-YYYY",
          "monthNames": ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
          "firstDay": 1,
          "daysOfWeek": [
            "zo",
            "ma",
            "di",
            "wo",
            "do",
            "vr",
            "za"
          ],
        },
        minDate: minDate,
        maxDate: maxDate,
        startDate: defaultDate
      }
      );

      $(obj).on('apply.daterangepicker', function (ev, picker) {
        $(obj).val(picker.startDate.format('DD-MM-YYYY'));
      });

      $(obj).mask('99-99-9999');
    } else {
      $(obj).attr({
        "min": minDate.yyyymmdd(),
        "max": maxDate.yyyymmdd(),
        "value": "" //defaultDate.yyyymmdd()
      });
    }
  }

  function maakVeldDatumJaarMaand() {
    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + inputID + '">' + vraagOpscherm + '</label></div>');
    $('#div' + vraagID).append('<div class="' + getXsClass() + ' ' + getSmClass() + ' no-gutter">\n\
     <div class="select col-xs-6"><select id="' + vraagID + '_maand" name="' + vraagID + '" class="form-control" /></select></div>\n\
     <div class="select col-xs-6"><select id="' + vraagID + '_jaar" name="' + vraagID + '" class="form-control" /></select></div>\n\
     </div>');
    $('#div' + vraagID + ' select').change(function () {
      checkVraag(this);
    });


    //vullen maandselect
    var defaultMaand;
    if (aVraag[vraagID].defaultMaand) {
      eval("defaultMaand = " + replaceVarsInText(aVraag[vraagID].defaultMaand));
    }
    addMonthsToSelect(vraagID + '_maand', defaultMaand);

    // vullen jaarselect
    inputID = vraagID + "_jaar";
    var defaultJaar;
    if (aVraag[vraagID].defaultJaar) {
      eval("defaultJaar = " + replaceVarsInText(aVraag[vraagID].defaultJaar));
    }
    var aTemp = calcRange((aVraag[vraagID].yearRange)).split(":");
    if (aTemp[0] < aTemp[1]) {
      s1 = "i<=aTemp[1]";
      s2 = "i++";
    } else {
      s1 = "i>=aTemp[1]";
      s2 = "i--";
    }
    if (defaultJaar == undefined) {
      $('#' + inputID).append('<option value="">Jaar</option>');
    }
    for (var i = aTemp[0]; eval(s1); eval(s2)) {
      var sSelected = "";
      if (defaultJaar != undefined) {
        if (i == defaultJaar) {
          sSelected = ' selected="selected"';
        }
      }
      $('#' + inputID).append('<option value="' + i + '"' + sSelected + '>' + i + '</option>');
    }
    sExtraClassDivHelpButton = "helpYearMonth";
    inputID = vraagID;
  }

  function maakVeldDatumPeriode() {
    $('#fsInvoer' + blokNR).append('<div class="form-group" id="div' + vraagID + '">');
    $('#div' + vraagID).append('<div class="col-xs-12 col-sm-5"><label class="control-label" for="' + inputID + '">' + vraagOpscherm + '</label></div>');
    $('#div' + vraagID).append('<div id="dateperiodInput_' + vraagID + '" class="dateperiodInput col-xs-12 ' + getSmClass() + '"></div>');
    // $('#div' + vraagID + ' ol.clDate').append('<li />');
    var YearRange = calcRange(aVraag[vraagID].yearRange);
    // label + input 'Begin'
    var selector = '#dateperiodInput_' + vraagID;
    inputID = vraagID + '_Begin';
    var labelTxt = 'Begindatum';
    addDate(selector, inputID, labelTxt, YearRange); //selector,inputID,labelTxt,YearRange,bLabelTonen
    // label + input 'Eind'
    // var selector = '#div' + vraagID;
    var inputID = vraagID + '_Eind';
    var labelTxt = 'Einddatum';
    addDate(selector, inputID, labelTxt, YearRange); //selector,inputID,labelTxt,YearRange,bLabelTonen
    inputID = vraagID;
    $('.dateperiodInput .col-sm-7').removeClass('col-sm-7').addClass('col-sm-12');
  } // end of maakVeldDatumPeriode

  function vraagAanvullen() {
    if (aVraag[vraagID].maxlength != undefined) {
      if (!isNaN(aVraag[vraagID].maxlength) && $("#" + inputID).is("input")) {
        $("#" + inputID).attr('maxlength', (aVraag[vraagID].maxlength));
      }
    }
    if (aVraag[vraagID].classInput != undefined) {
      $("#" + inputID).addClass(aVraag[vraagID].classInput);
    }
    if (aVraag[vraagID].opSchermAchterInput != undefined) {
      $("#" + inputID).after(aVraag[vraagID].opSchermAchterInput);
    }
  }

  function doOpSchermIntro() {
    if (aVraag[vraagID].opSchermIntro !== undefined) {
      $('#div' + vraagID).prepend('<div class="col-xs-12"><div id="intro' + vraagID + '" class="bld-intro"></div></div>')
      toonHtmlTxt('#intro' + vraagID, replaceVarsInText(aVraag[vraagID].opSchermIntro));
    }
  }

  function doOpSchermExtra(typeVraag) {
    if (aVraag[vraagID].opSchermExtra !== undefined) {
      $('#div' + vraagID + " div>label.control-label").after('<div id="extra' + vraagID + '" class="bld-vraag-na"></div>');
      aVraag[vraagID].opSchermExtraResult = toonHtmlTxt('#extra' + vraagID, replaceVarsInText(aVraag[vraagID].opSchermExtra));
    }
  }

  function checkHelpButton() {
    if (aHelp[vraagID]) {
      $('#div' + vraagID).append('<div class="col-xs-1"><a class="btn btn-info pull-right" aria-label="' + oTekst.toon_toelichting + '" aria-expanded="false" data-toggle="collapse" data-parent="' + vraagID + '" data-target="#collapse' + vraagID + '" href="javascript:void(0)" data-count=".click-open.-.collapse"></a></div>');
      $('#div' + vraagID).append('<div id="collapse' + vraagID + '" class="col-xs-12 help-block bld-info collapse" aria-expanded="true"><div class="col-xs-12 bg-info"></div></div>');
      if ($("#bld-iah-toetsingsinkomen").length) {
        if (document.getElementById('extraV3-13-2') || document.getElementById('extraV3-13-3')) {
          if (document.getElementById('extraV3-13-2').innerHTML.indexOf("Bijvoorbeeld als folder- of krantenbezorger, freelancer of als gastouder.") != -1) {
            var element = document.querySelectorAll("[data-parent='V3-13-2']");
            if (element.length > 0) {
              element[0].parentNode.removeChild(element[0]);
            }
          } else {
            var element = document.querySelectorAll("[data-parent='V3-13-3']");
            if (element.length > 0) {
              element[0].parentNode.removeChild(element[0]);
            }
          }
        }
      }

      var HelpBlockAnchorSelector = $('#collapse' + vraagID).prev().find('a.btn-info');

      $('#collapse' + vraagID).on('hide.bs.collapse', function (e) {
        // Toggle aria label when aria-expanded=true
        $(HelpBlockAnchorSelector).attr('aria-label', oTekst.toon_toelichting);
      })

      $('#collapse' + vraagID).on('show.bs.collapse', function (e) {
        vulHelp('#div' + vraagID + ' a.btn-info');
        // Toggle aria label when aria-expanded=false
        $(HelpBlockAnchorSelector).attr('aria-label', oTekst.verberg_toelichting);
      });
    }
  }

  function addMonthsToSelect(SelectID, defaultSelect) {
    var aMonths = getMaanden();
    if (defaultSelect == undefined) {
      $('#' + SelectID).append('<option value="">Maand</option>');
    }
    for (i = 0; i < 12; i++) {
      var sSelected = "";
      if (defaultSelect != undefined && defaultSelect == aMonths[i][0]) {
        sSelected = ' selected="selected"';
      }
      $('#' + SelectID).append('<option value="' + aMonths[i][0] + '"' + sSelected + '>' + aMonths[i][1] + '</option>');
    }
  }
}

function vulHelp(oThis) {
  var vraagID = $(oThis).data("parent");
  $('#collapse' + vraagID + ' >div').empty();
  aVar['actVraagID'] = vraagID;
  var aResultTemp = new Array();
  for (var i = 0; i < aHelp[vraagID].length; i++) {
    aResultTemp[i] = replaceVarsInText(aHelp[vraagID][i]);
  }
  toonHtmlTxt('#collapse' + vraagID + ' >div', aResultTemp);
}

// buttons to hide and show the previous or last page.
var slideModeNavigation = {
  'iah_basenav': 1,
};

function iah_NavVolgendePagina() {
  if (slideModeNavigation.iah_basenav > Object.keys(aBlok).length) {
    slideModeNavigation.iah_basenav = 1;

    startModule($("#formIAH").closest('section').data('id'));

  } else {
    slideModeNavigation.iah_basenav += 1;
    $('#fsInvoer' + (slideModeNavigation.iah_basenav - 1)).hide();
    $('#fsInvoer' + slideModeNavigation.iah_basenav).show();
  }
  checkBtnNavVorigePagina();
  checkBtnNavVolgendePagina();
  var step = document.getElementById('bld_ProgressBar-step-' + slideModeNavigation.iah_basenav);
  step.classList.add('active');

  if (aVar['actBlok'] < slideModeNavigation.iah_basenav) {
    $('html, body').animate({ scrollTop: 100 }, 'fast');
  }

  if (slideModeNavigation.iah_basenav === 1) {
    document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav)).classList.remove('active')
    document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav)).classList.add('done');
    document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav)).querySelector(".bld_ProgressBar-stepMarker").innerHTML = '&#10004';
    document.getElementById('bld_ProgressBar-indicator-line-' + (slideModeNavigation.iah_basenav)).classList.add('done');
  } else {
    document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav - 1)).classList.remove('active');
    document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav - 1)).classList.add('done');
    document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav - 1)).querySelector(".bld_ProgressBar-stepMarker").innerHTML = '&#10004';
    document.getElementById('bld_ProgressBar-indicator-line-' + (slideModeNavigation.iah_basenav - 1)).classList.add('done');
  }


  if (slideModeNavigation.iah_basenav > Object.keys(aBlok).length) {
    slideModeNavigation['blok_' + (slideModeNavigation.iah_basenav - 1) + '_valid'] = true;
    $('#divResultaat').show();
    $('#btnNavVorigePagina').show();

  }
  iah_WijzigBtnVolgende();

}

function iah_NavVorigePagina() {
  $('#fsInvoer' + (slideModeNavigation.iah_basenav)).hide();
  $('#fsInvoer' + (slideModeNavigation.iah_basenav - 1)).show();
  document.getElementById('bld_ProgressBar-step-' + slideModeNavigation.iah_basenav).classList.remove('active');
  document.getElementById('bld_ProgressBar-indicator-line-' + (slideModeNavigation.iah_basenav - 1)).classList.remove('done');

  document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav - 1)).classList.remove('done');
  document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav - 1)).classList.add('active');
  document.getElementById('bld_ProgressBar-step-' + (slideModeNavigation.iah_basenav - 1)).querySelector(".bld_ProgressBar-stepMarker").textContent = slideModeNavigation.iah_basenav - 1;
  slideModeNavigation.iah_basenav -= 1;
  checkBtnNavVorigePagina();
  checkBtnNavVolgendePagina();
  if (slideModeNavigation.iah_basenav >= Object.keys(aBlok).length) {
    $('#divResultaat').hide();
    $("#btnNavVolgendePagina").prop('disabled', false);

  }
  iah_WijzigBtnVolgende();
}

function iah_WijzigBtnVolgende() {
  var btn = document.getElementById('btnNavVolgendePagina');
  if (slideModeNavigation.iah_basenav > Object.keys(aBlok).length) {
    btn.textContent = "Opnieuw starten";
  } else if (slideModeNavigation.iah_basenav === Object.keys(aBlok).length) {
    btn.textContent = "Volgende ";
  }

}


function checkBtnNavVorigePagina() {
  if (slideModeNavigation.iah_basenav > 1) {
    $('#btnNavVorigePagina').show();
    //$('#btnNavVolgendePagina').prop('disabled', true);
  } else {
    $('#btnNavVorigePagina').hide();
  }
}

function checkBtnNavVolgendePagina() {
  if (slideModeNavigation.iah_basenav > Object.keys(aBlok).length) {
    $('#btnNavVolgendePagina').prop('disabled', false);

  } else {
    $('#btnNavVolgendePagina').prop('disabled', slideModeNavigation['blok_' + slideModeNavigation.iah_basenav + '_valid'] === true ? false : true);
  }
}

function loadProgressbar() {
  $(document).ready(function () {
    var bldSection = $("#formIAH").closest('section');
    var bldContainer = $('div.container', bldSection);


    $(bldSection).addClass('bld-iah-slidemode');
    if ($('div.bld_progressbarcontainer', bldContainer).length > 0) {
      var node = $(bldContainer)[0].getElementsByClassName('row')[0];
      $(bldContainer)[0].removeChild(node);

    }

    $(bldContainer[0]).prepend('<div class="row">\n' +
      '    <div class="col-sm-2"></div>\n' +
      '    <div class="col-sm-7 col-xs-12">\n' +
      '    <div class="bld_progressbarcontainer"></div></div>' +
      '  <div class="col-sm-m"></div>\n' +
      '    </div>');


    var steps = Object.keys(aBlok).length + 1;
    var progressbarcontainer = document.createElement('div');
    progressbarcontainer.classList.add('bld_progressbarcontainer');

    var progressbar = document.createElement('div');
    progressbar.classList.add('bld_progressbar');

    for (var i = 1; i <= steps; i++) {
      progressbar.appendChild(
        createSteps(i, steps)
      );
      progressbar.appendChild(
        createLine(i, steps)
      );

    }

    $('div.bld_progressbarcontainer', bldContainer)[0].appendChild(progressbar);

    function createSteps(i, steps) {
      var div = document.createElement('div');
      div.setAttribute('id', 'bld_ProgressBar-step-' + i);
      div.classList.add('bld_ProgressBar-step');
      var txtMarker = i;


      if (i < steps) {
        var txtLabel = aBlok['V' + i];
        if (i === 1) {
          div.classList.add('active');
        }
      } else {
        var txtLabel = 'Resultaat';
        txtMarker = String.fromCharCode(10004);
      }
      var span = document.createElement('span');
      span.textContent = txtMarker;
      span.classList.add('bld_ProgressBar-stepMarker');
      div.appendChild(span);
      var span = document.createElement('span');
      span.textContent = txtLabel;
      span.classList.add('bld_ProgressBar-stepLabel');
      div.appendChild(span);

      return div;
    }

    function createLine(i, steps) {
      var line = document.createElement('div');
      line.classList.add('indicator-line');
      line.setAttribute('id', 'bld_ProgressBar-indicator-line-' + i);
      return line;
    }
  });
}

/**
 * function maakBlok()
 * To create a container to append the questions.
 * Default there is one container for all questions (fieldset or div: depending on fieldsetMode switch)
 * Usage: always call this function from doVraag()
 *
 * 'blokMode'
 * ==========
 * If blokMode switch is set to true (in interface.js of IAH)
 * questions are grouped by the first part of the question ID (V[blocknr]-xx), in a container with a head (see aBlok > vragen.js)
 * example: questions with ID V1-1 and V1-2 are placed in its own container with head, and thats is also the case for V2-1 and V2-2
 * -- if fieldsetMode switch is set to true: questions are grouped in fieldsets with legends
 * -- if fieldsetMode switch is set to false: questions are grouped in divs with h3-heads
 *
 */
function maakBlok(vraagID) {
  let elBlock = document.createElement('div');
  let elBlockTitle = document.createElement('h3');
  if (fieldsetMode) {
    elBlock = document.createElement('fieldset');
    elBlockTitle = document.createElement('legend');
  }

  blokNR = '';
  if (blokMode) {
    blokNR = vraagID.substring(1, vraagID.indexOf('-'));
  }

  let blockID = 'fsInvoer' + blokNR;
  elBlock.id = blockID;
  elBlock.className = 'clBlok';

  //als fieldset blok  nog niet wordt getoond
  if (!document.getElementById(blockID)) {
    if (blokMode) {
      if (aBlok['V' + blokNR] === undefined) {
        alert('fout: geen bloktitel gevonden. Huidige vraag' + vraagID + '. \n check tabel aBlok in vragen.js');
        return '';
      }
    }

    // fieldset blok toevoegen: Standaard
    let oForm = document.getElementById('formIAH');
    oForm.insertAdjacentElement('beforeend', elBlock);

    // Bloktitel toevoegen
    let oBlock = document.getElementById(blockID);
    let blockTitle = aBlok['V' + blokNR];
    if (typeof blockTitle !== 'undefined' && blockTitle !== '') {
      elBlockTitle.id = 'divV' + blokNR; // ID t.b.v. plaatsing toelichtingsknop bij bloktitel
      elBlockTitle.className = 'bloktitel';
      elBlockTitle.insertAdjacentText('beforeend', blockTitle);
      oBlock.appendChild(elBlockTitle);
    }

    // Toelichtingsknop toevoegen, indien van toepassing
    checkHelpButtonBlok(blokNR);
  }
  return true;

  // Eind fieldset


  function checkHelpButtonBlok(blokNR) {
    if (aHelp["V" + blokNR]) {
      //helpicoon
      $('#fsInvoer' + blokNR + ' legend.bloktitel').append('<a title="' + oTekst.toon_toelichting + '" class="btn btn-info pull-right" id="btn_infoV' + blokNR + '" /></a>');

      $('#btn_infoV' + blokNR).click(function () {
        toonHelp(this);
      });
    }
  }
}

function getToelichting(id) {
  return aHelp[id];
}

function toonHelp(oThis) {
  var thisID = oThis.id;
  var vraagID = thisID.substr(8);
  if ($("#message_" + vraagID).is("#message_" + vraagID)) { //id getoond == te tonen id, dus verwijderen.
    $(oThis).attr("aria-expanded", false);
    $("#message_" + vraagID).removeClass('collapse in');
    //$('#message_' + vraagID).toggle(function () {
    $('#message_' + vraagID).remove();
    //});
  } else {
    //$('.message_help').remove(); // verwijder alle helpvensters
    // help bij blok of vraag?
    if (vraagID.split('-').length === 1) { // blok
      $('<div id="message_' + vraagID + '" class="help-block bld-info" />').insertAfter('#fsInvoer' + vraagID.substr(1) + " legend.bloktitel");
    } else { // vraag
      $('#div' + vraagID).append('<div id="message_' + vraagID + '" class="help-block bld-info" />');
    }
    $('#message_' + vraagID).hide();
    $('#message_' + vraagID).append('<div id="message_info_' + vraagID + '" class="col-xs-12 bg-info" />');
    $('#btnclose' + vraagID).click(function () {
      toonHelp(this);
    });
    $('#message_info_' + vraagID).append('<div class="clHelpText">');
    $(oThis).attr("aria-expanded", true);
    $("#message_" + vraagID).addClass('collapse in');
    // Vervang eventuele variabele in resultaat teksten (vraag/label)
    var aResultTemp = new Array();
    for (var i = 0; i < aHelp[vraagID].length; i++) {
      aResultTemp[i] = replaceVarsInText(aHelp[vraagID][i]);
    }
    toonHtmlTxt('#message_info_' + vraagID + ' .clHelpText', aResultTemp);
    $('#message_' + vraagID).toggle(true);
  }
}

function toonLetop(vraagID, aLetop) {
  if ($("#letop_" + vraagID).is("#letop_" + vraagID)) { //id getoond == te tonen id, dus verwijderen.
    $('#letop_' + vraagID).remove();
  }
  if (aLetop.length == 0)
    return;
  else {
    $('#div' + vraagID).append('<div class="col-xs-12 help-block bld-info" aria-expanded="true" id="letop_' + vraagID + '"><div class="col-xs-12 bg-info"><div class="media"><div class="media-left"><div class="exclamation"><i class="fa fa-exclamation" aria-hidden="true"></i></div></div><div class="media-body">Let op!</br></div></div></div></div>');

    // Vervang eventuele variabele in resultaat teksten (vraag/label)
    var aResultTemp = new Array();
    for (var i = 0; i < aLetop.length; i++) {
      aResultTemp[i] = replaceVarsInText(aLetop[i]);
    }
    toonHtmlTxt('#letop_' + vraagID + ' .media-body', aResultTemp);
  }
}

function toonFout(inputID, melding, toon) {
  var vraagID = inputID.substring(0, (inputID.indexOf('_') > -1) ? inputID.indexOf('_') : inputID.length);
  if ($("#error_" + vraagID).is("#error_" + vraagID)) {
    $("#error_" + vraagID).remove();
    $('.input_error').removeClass('input_error');
  }
  if (toon == false) {
    return;
  } else {
    $('#div' + vraagID).append('<div id="error_' + vraagID + '" class="message_error help-block col-xs-12" />');
    $('#div' + vraagID + " .message_error").append('<div class="col-xs-12 bg-danger"><div class="media"><div class="media-left"><div class="exclamation"><i class="fa fa-exclamation" aria-hidden="true"></i></div></div><div id="message_error_' + vraagID + '" class="media-body">');

    $('#message_error_' + vraagID).append('<p class="clHelpText">');
    toonHtmlTxt('#message_error_' + vraagID + ' .clHelpText', melding);
    $('#' + inputID).addClass('input_error');
  }
}

function toonHtmlTxt(selector, tabel) {
  var ulList = false;
  var olList = false;
  var subList = false;
  var listId = '';
  var subListId = '';
  var iList = 0;
  if (!Array.isArray(tabel)) {
    tabel = [].concat(tabel);
  }
  for (var i = 0; i < tabel.length; i++) {
    if (!Array.isArray(tabel[i])) {
      aOpSchermTxt = [].concat(tabel[i]);
    } else {
      aOpSchermTxt = tabel[i];
    }
    for (var j = 0; j < aOpSchermTxt.length; j++) {
      var opSchermTxt = aOpSchermTxt[j];
      //ul
      if (opSchermTxt.indexOf('<ul') > -1) {
        if (subList === false) {
          iList++;
          listId = 'ul_' + iList;
          $(selector).append('<ul id="' + listId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ul') + 3));
          ulList = true;
        } else {
          subListId = 'ul_' + iList + '_sub';
          $(selector + " li").last().append('<ul id="' + subListId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ul') + 3));
        }
      } else if (opSchermTxt.indexOf('</ul>') > -1) {
        if (subList === false) {
          ulList = false;
        } else if (subList === true) {
          subList = false;
        }
      } else if (ulList && opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') > -1 && subList === false) {
        $(selector + ' #' + listId).append(opSchermTxt);

        //ol
      } else if (opSchermTxt.indexOf('<ol') > -1) {
        if (subList === false) {
          iList++;
          listId = 'ol_' + iList;
          $(selector).append('<ol class="list-unstyled" id="' + listId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ol') + 3));
          olList = true;
        } else {
          subListId = 'ol_' + iList + '_sub';
          $(selector + " li").last().append('<ol class="list-unstyled" id="' + subListId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ol') + 3));
        }
      } else if (opSchermTxt.indexOf('</ol>') > -1) {
        if (subList === false) {
          olList = false;
        } else if (subList === true) {
          subList = false;
        }
      } else if (olList && opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') > -1 && subList === false) {
        $(selector + ' #' + listId).append(opSchermTxt);

        // geneste opsomming
      } else if (opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') === -1 && subList === false) {
        $(selector + ' #' + listId).append(opSchermTxt + '</li'); //li schrijven
        subList = true;
      } else if (opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') > -1 && subList === true) {
        $("#" + subListId).append(opSchermTxt);

      } else {
        $(selector).append(opSchermTxt);
      }
    }
  }
  return opSchermTxt;
}

function checkVraag(oInput, e) {

  if (bDebugIah != undefined && debugJS)
    doDebugJS("checkVraag(object met id:" + oInput.id + ")");

  bld_piwik.eersteVraag();
  //bepaal vraagID - verwijder eventuele toevoegingen zoals false en true;  V1-2_true  : blok-vraag-toevoeging
  var inputID = oInput.id;
  var vraagID = inputID.substring(0, (inputID.indexOf('_') > -1) ? inputID.indexOf('_') : inputID.length);
  // corrigeer datumvelden
  if ($(oInput).hasClass('clDate')) {
    oInput.value = reformatDate(oInput.value);
  }
  // Evt. aanroep van module specifieke acties //
  if (typeof checkVraagModuleSpecifiek == 'function') {
    checkVraagModuleSpecifiek(oInput, vraagID, e);
  }

  var removed = false;
  aVar['actBlok'] = vraagID.substring(1, vraagID.indexOf('-'));
  if (blokMode) {
    //Controleer of het blok van de actieve vraag, de laatst getoonde is. Zoniet, verwijder dan alle resterende getoonde blokkken.
    //bepaal tot welk blok de huidige vraag behoort.
    if ($('fieldset#fsInvoer' + aVar['actBlok']).is(":last-child") == false) {
      $('#fsInvoer' + aVar['actBlok'] + ' ~ .clBlok').remove();
      removed = true;
    }
  }
  //Contoleer of de actieve vraag de laatst getoonde is. Zoniet, verwijder alle vragen getoond na deze vraag.

  if ($('#' + vraagID).closest('div.form-group').is(":last-child") == false) {
    if (bBeslis == true) {
      $('#div' + vraagID).closest('div.form-group').nextAll(["div.form-group", "div.bld-result help-block"]).remove();
      //en verwijder alle getoonde tussenresultaten
    }
    removed = true;
  }
  if ($('#divResultaat').is('#divResultaat'))
    $('#divResultaat').remove();
  if ($('#divButtonsResult').is('#divButtonsResult'))
    $('#divButtonsResult').remove(); // verwijder resultaten, indien getoond.
  // EIND: Scherm bijwerken
  if (removed) { // valideren, alle variabelen opnieuw instellen en uitvoer flow
    doRebuildVars(vraagID); // alle variabelen ingesteld na actieve vraag zijn niet meer relevant. Alles wissen en opnieuw instellen
  }
  // valideer invoer
  if (!validInput(vraagID, oInput, e)) {
    //aVraag[vraagID].valid = false;
    return;
  }
  //sla invoer van gebruiker op in variabele (indien gedefinieerd in vragen.js)
  doSaveVar(vraagID);
  //ga naar flow
  var uitkomst = '';
  if (aVraag[vraagID].type == 'JaNee')
    uitkomst = document.getElementById(inputID).value;
  doFlow(vraagID, uitkomst);
}

function validInput(vraagID, oInput, e) {
  var aLetop = [];
  if (bDebugIah != undefined && debugJS)
    doDebugJS("validInput(" + vraagID + "):[Start] ");
  //checkInput (validatie)
  var inputValid = true;
  //Datumvelden algemeen

  if (($(oInput).parent('div').hasClass('date') || $(oInput).parent('div').hasClass('birthdate')) && aVraag[vraagID].type != 'custom') {
    inputValid = (oInput.value) == "" ? false : inputValid;
    if (inputValid) {
      range = aVraag[vraagID].yearRange;
      aResultaat = validDate(oInput.value, vraagID, range);
      inputValid = aResultaat[0];
      if (aVraag[vraagID].errorTxt) {
        errorTxt = replaceVarsInText(aVraag[vraagID].errorTxt);
      } else {
        errorTxt = aResultaat[1];
      }
      dateString = aResultaat[2];
      if (inputValid) {
        oInput.value = dateString;
        toonFout(oInput.id, errorTxt, false);
      } else {
        toonFout(oInput.id, errorTxt, true);
      }
    }
  }
  // Per vraag type
  var aVraagType = aVraag[vraagID].type.split("[");
  if (aVraagType.length == 2) {
    aVraagType[1] = aVraagType[1].replace("]", "")
  }
  if (aVraagType[0] == 'dropdown') {
    if (aVraagType[1] == undefined) {
      inputValid = (document.getElementById(vraagID).value) == "" ? false : inputValid;
    } else {
      for (var i = 1; i <= parseInt(aVraagType[1]) && inputValid == true; i++) {
        inputValid = (document.getElementById(vraagID + "_" + i).value) == "" ? false : inputValid;
      }
    }
  } else if (aVraagType[0] == 'text') {
    inputValid = (document.getElementById(vraagID).value) == "" ? false : inputValid;
    if (inputValid) {
      if (aVraag[vraagID].validatie) {
        var aVal = aVraag[vraagID].validatie.split(",");
        $.each(aVal, function (i) {
          if (aVal[i] == "numeriek") {
            var valNumeriek = checkNumeriek(oInput, aVraag[vraagID]);
            inputValid = valNumeriek[0];
            errorTxt = valNumeriek[1];
          }

        });
        toonFout(vraagID, errorTxt, inputValid ? false : errorTxt === "NOerror" ? false : true);
        //toonFout(vraagID, errorTxt, inputValid ? false : true);
      }
      else {
        filterHtmlTags(oInput);

      }
    } else if (aVraag[vraagID].optioneel) {
      // when optional, empty is also a correct value.
      inputValid = true;
    }

  } else if (aVraagType[0] == 'datePeriod') {
    begindat = document.getElementById(vraagID + '_Begin');
    einddat = document.getElementById(vraagID + '_Eind');
    range = aVraag[vraagID].yearRange;

    inputValid = (begindat.value == '') ? false : inputValid;
    if (inputValid) {
      aResultaat = validDate(begindat.value, vraagID + '_Begin', range);
      inputValid = aResultaat[0];
      if (!inputValid) {
        errorTxt = aResultaat[1];
        dateString = aResultaat[2];
        //oInput.value = dateString;
        $("#" + vraagID + '_Begin').value = dateString;
        toonFout(vraagID + '_Begin', errorTxt, true);
      } else {
        toonFout(vraagID + '_Begin', errorTxt, false);
      }
    }
    if (inputValid) {
      inputValid = (einddat.value == '') ? false : inputValid;
      if (inputValid) {
        aResultaat = validDate(einddat.value, vraagID + '_Eind', range);
        inputValid = aResultaat[0];
        if (!inputValid) {
          errorTxt = aResultaat[1];
          dateString = aResultaat[2];
          //oInput.value = dateString;
          $("#" + vraagID + '_Eind').value = dateString;
          toonFout(vraagID + '_Eind', errorTxt, true);
        } else {
          toonFout(vraagID + '_Eind', errorTxt, false);
        }
      }
    }

    // controleer periode
    if (inputValid) {
      aResultaat = validDatePeriod(begindat.value, einddat.value);
      inputValid = aResultaat[0];
      errorTxt = aResultaat[1];
      if (!inputValid)
        toonFout(begindat.id, errorTxt, true);
      else
        toonFout(begindat.id, errorTxt, false);
    }
  } else if (aVraagType[0] == 'dateYearMonth') {
    inputValid = (document.getElementById(vraagID + '_maand').value == '' || document.getElementById(vraagID + '_jaar').value == '') ? false : inputValid;
  } else if (aVraagType[0] == 'checkbox' || aVraagType[0] == 'RadioGroep') {
    // minimaal 1 geselecteerd
    var inputValid = false;
    for (var i = 0; i < aVraag[vraagID].checkboxKeuze.length; i++) {
      inputValid = document.getElementById(vraagID + '_' + i).checked ? true : inputValid;
    }
  } else if (aVraagType[0] == 'JaNee') {
    // minimaal 1 geselecteerd
    var inputValid = false;
    inputValid = document.getElementById(vraagID + '_True').checked || document.getElementById(vraagID + '_False').checked ? true : inputValid;
  }

  // Begin specifiek //
  if (inputValid) {
    if (typeof valideerModuleSpecifiek == 'function') {

      var result = valideerModuleSpecifiek(vraagID, inputValid, aLetop, e)
      inputValid = result[0];
      aLetop = result[1];
    }
  }
  // Einde specifiek //
  toonLetop(vraagID, aLetop);
  aVraag[vraagID].valid = inputValid;
  if (bDebugIah != undefined && debugJS)
    doDebugJS("validInput(" + vraagID + "):[Result]:" + inputValid);
  return inputValid;
}

function algValidatie(resultID) {
  var bValid = true;
  $.each(aVraag, function (i) {
    if (aVraag[i].valid == false) {
      bValid = false;
      return false;
    }
  });
  if (bValid === true) {
    doEindResultaat(resultID);
  }
}

function initaVar() {
  var aTemp = [];
  $.each(aVraag, function (i) {
    if (aVraag[i].variabele) {
      aTemp[aVraag[i].variabele] = null;
    }
  });
  return aTemp;
}

var aVar = aVar || [];

function doRebuildVars(vraagID) {
  if (bDebugIah != undefined && debugJS)
    doDebugJS("doRebuildVars()");
  // tabel van variabelen opnieuw instellen.
  if (bBeslis == true) {
    aVar = initaVar();
    if (typeof initVarsModuleSpecifiek == 'function') {
      initVarsModuleSpecifiek();
    }
  } else {
    if (assArrLength(aVar) == 0) {
      aVar = initaVar();
      if (typeof initVarsModuleSpecifiek == 'function') {
        initVarsModuleSpecifiek();
      }
    }
  }

  $("#formIAH .form-group").each(
    function () {
      var objID = this.id;
      var vrgID = objID.substring(3, objID.length); // divVxx-xx  minus div
      aVar['actBlok'] = vrgID.substring(1, vrgID.indexOf('-'));
      if (bBeslis == true) {
        if (vraagID != undefined) {
          if (vraagID.indexOf(vrgID + "-") === 0 || vraagID === vrgID)
            return false;
        }
      }
      var oInput = document.getElementById(vrgID);
      //valideer invoer
      if (!validInput(vrgID, oInput))
        return false;
      //sla invoer van gebruiker op in variabele (indien gedefinieerd in vragen.js)
      var uitkomst = doSaveVar(vrgID);
      // voor alle getoonde vragen, voer de flow uit voor het opnieuw instellen van eventuele proces variabelen
      doFlow(vrgID, uitkomst);
    }
  );
}

function doSaveVar(vraagID) {
  // invoer van vraag opslaan, indien variabele gedefinieerd voor vraag (zie vragen.js)
  var bVar;
  if ((aVraag[vraagID] != undefined)) {
    var sVarName = aVraag[vraagID].variabele;
    if (sVarName != '')
      bVar = true;
    else
      bVar = false;
  }
  var uitkomst = '';
  var aVraagType = aVraag[vraagID].type.split("[");
  if (aVraagType.length == 2) {
    aVraagType[1] = aVraagType[1].replace("]", "")
  }
  if (aVraagType[0] == 'geboorteDatum') {
    uitkomst = strToDate(document.getElementById(vraagID).value);
    if (bVar)
      aVar[sVarName] = uitkomst;
  } else if (aVraagType[0] == 'date') {
    uitkomst = strToDate(document.getElementById(vraagID).value);
    if (bVar)
      aVar[sVarName] = uitkomst;
  } else if (aVraagType[0] == 'datePeriod') {
    if (bVar)
      aVar['begin_' + sVarName] = strToDate(document.getElementById(vraagID + '_Begin').value);
    if (bVar)
      aVar['eind_' + sVarName] = strToDate(document.getElementById(vraagID + '_Eind').value);
  } else if (aVraagType[0] == 'dateYearMonth') {
    if (bVar)
      aVar['maand_' + sVarName] = parseInt(document.getElementById(vraagID + '_maand').value);
    if (bVar)
      aVar['jaar_' + sVarName] = parseInt(document.getElementById(vraagID + '_jaar').value);
  } else if (aVraagType[0] == 'JaNee') {
    if (document.getElementById(vraagID + '_True').checked) {
      uitkomst = document.getElementById(vraagID + '_True').value;
      if (bVar)
        aVar[sVarName] = uitkomst;
    }
    if (document.getElementById(vraagID + '_False').checked) {
      uitkomst = document.getElementById(vraagID + '_False').value;
      if (bVar)
        aVar[sVarName] = uitkomst;
    }
  } else if (aVraagType[0] == 'RadioGroep') {
    for (var i = 0; i < aVraag[vraagID].checkboxValues.length; i++) {
      vraagIDinput = vraagID + "_" + i;
      if (document.getElementById(vraagIDinput).checked) {
        uitkomst = aVraag[vraagID].checkboxValues[i]
        aVar[sVarName] = uitkomst;
        break;
      }
    }
  } else if (aVraagType[0] == 'dropdown') {
    if (aVraagType[1] == undefined) {
      uitkomst = document.getElementById(vraagID).value
      if (bVar)
        aVar[sVarName] = uitkomst;
    } else {
      for (var i = 1; i <= parseInt(aVraagType[1]); i++) {
        uitkomst = document.getElementById(vraagID + "_" + i).value;
        sVarName = eval('aVraag[vraagID].variabele_' + i);
        if (bVar)
          aVar[sVarName] = uitkomst;
      }
    }
  } else if (aVraagType[0] == 'checkbox') {
    for (i in aVraag[vraagID].checkboxVars) {
      sVarName = aVraag[vraagID].checkboxVars[i];
      vraagIDinput = vraagID + "_" + i;
      if (document.getElementById(vraagIDinput) && document.getElementById(vraagIDinput).checked)
        aVar[sVarName] = true;
      else
        aVar[sVarName] = false;
    }
  } else if (aVraagType[0] == 'text') {
    uitkomst = (document.getElementById(vraagID).value);
    if (bVar)
      aVar[sVarName] = uitkomst;
  }

  if (bVar && aVraag[vraagID].validatie) {
    var aVal = aVraag[vraagID].validatie.split(",");
    $.each(aVal, function (i) {
      if (aVal[i] == "numeriek" && aVar[sVarName] !== null) {
        aVar[sVarName] = aVar[sVarName].replace(/[.]/g, "");
        if (aVraag[vraagID].decimalen) {
          uitkomst = parseFloat(aVar[sVarName].replace(",", "."));
        } else {
          uitkomst = parseInt(aVar[sVarName]);
        }
      }

    });
    aVar[sVarName] = uitkomst;
  }

  if (bVar && aVraag[vraagID].classInput) {
    var aVal = aVraag[vraagID].classInput.split(",");
    $.each(aVal, function (i) {
      if (aVal[i] == "percentage") {
        uitkomst = parseFloat(aVar[sVarName]) / 100;
      }
    });
    aVar[sVarName] = uitkomst;
  }
  // Begin specifiek //
  if (typeof saveVarModuleSpecifiek == 'function') {
    saveVarModuleSpecifiek(vraagID, sVarName)
  }
  // Einde specifiek //

  //debug: toon alle variabelen op scherm
  if (bDebugIah != undefined && debugSAV)
    debugGetVars();
  if (bDebugIah != undefined && debugJS)
    doDebugJS("doSaveVar(" + vraagID + "): " + uitkomst);
  return uitkomst;
}

function getResultaat(id) {
  return aResult[id];
}


function doTussenResult(resultID) {
  if (bDebugIah != undefined && debugJS)
    doDebugJS("doTussenResult(" + resultID + ")");

  if ($('#div' + resultID).is('#div' + resultID))
    return;

  if (maakBlok(resultID) === false)
    return false;

  if (blokMode)
    var blokNR = resultID.substr(1, 1);
  else
    var blokNR = '';

  // Vervang eventuele variabele in resultaat teksten (vraag/label)
  var aResultTemp = new Array();
  for (var i = 0; i < aResult[resultID].length; i++) {
    aResultTemp[i] = replaceVarsInText(aResult[resultID][i]);
  }

  //Div
  $('#fsInvoer' + blokNR).append('<div id="div' + resultID + '" class="bld-result help-block"><div class="bg-info" id="' + resultID + '">');
  //ResultTxt
  toonHtmlTxt('#' + resultID, aResultTemp);

  //debug
  if (bDebugIah != undefined && debugSID)
    $('#div' + resultID).prepend('<p class="clDebug clDebugSID">' + resultID + '</p>');
}


// wordt aangeroepen vanuit flow
function doEindResultaat(ResultID) {
  if (typeof bToonResultButton !== "undefined") {
    if (bToonResultButton === false) {
      doEindResultaatDirect(ResultID);
      bld_piwik.addTeller('Afgerond');
      return;
    }
  }
  doEindResultaatButton(ResultID);
  // Begin specifiek //
  if (typeof doEindResultaatModuleSpecifiek == 'function') {
    doEindResultaatModuleSpecifiek(ResultID)
  }
  // Einde specifiek //

  bld_piwik.countBttn();
  return;
}

var bld_piwik = new Object();

bld_piwik.bEersteVraag = true;
bld_piwik.rondEersteKeerAf = true;

bld_piwik.countBttn = function () {
  $('#butResults').click(function () {
    // waarom werkt this hier niet? Omdat hij misschien in jquery of een functie zit?
    if (bld_piwik.rondEersteKeerAf === true) {
      bld_piwik.addTeller('Afgerond');
      bld_piwik.rondEersteKeerAf = false;
    } else {
      bld_piwik.addTeller('Afgerond na wijziging');
    }
  });
};

bld_piwik.eersteVraag = function () {
  if (this.bEersteVraag === true) {
    this.addTeller('Start');
    this.bEersteVraag = false;
  }
  ;
};
// in interface.js wordt bld_piwik.naamRekenhulp = "Lijfrentepremie"; gebruikt om een naam (hoofdletters en spaties zijn toegestaan) voor de teller in te vullen
bld_piwik.addTeller = function (actie) {

  bld_piwik.naamRekenhulp = $('section.bld-iah')[0].id;
  if (bld_piwik.naamRekenhulp === undefined || bld_piwik.naamRekenhulp === '') {
    bld_piwik.naamRekenhulp = document.title;
  }
  try {
    // trackEvent, categorie, actie, naam (rekenhulp, actie, naam_rekenhulp)
    _paq.push(['trackEvent', 'Rekenhulp', actie, bld_piwik.naamRekenhulp]);
  } catch (e) {
  }
}

function doEindResultaatButton(ResultID) {
  //toon Resultaten knop
  doButtonResults(true);
  $('#butResults').off("click");
  $('#butResults').click(function () {
    //verberg Resultaten knop
    doButtonResults(false);
    // Disable invoer
    $('select, input', '#formIAH .clBlok').prop('disabled', true);
    $('#formIAH').addClass('bldInputDisabled');

    // Disable data-toggle question-mark:
    $('.btn.btn-info.pull-right').css('pointer-events', 'none');

    // Disable all links within notification/'read more' elements
    $('div.help-block.bld-info > div > ul > li > a').css('pointer-events', 'none');
    $('div.help-block.bld-info > div > p > a').css('pointer-events', 'none');
    $('div.bg-info > p > a').css('pointer-events', 'none');
    $('div.txtReadMore > p > a').css('pointer-events', 'none');

    //$('#formIAH fieldset input.form-control').prop('disabled', true);
    //toon Eindresultaat
    if (typeof doBereken == 'function') {
      doBereken(ResultID);
    }
    //Toon Wijzig Knop
    doResult(ResultID);
    doWijzigInvoer(ResultID);

  });
}

function doEindResultaatDirect(ResultID) {
  $("img.ui-datepicker-trigger").hide();
  //toon Eindresultaat
  if (!slideMode) {
    if (typeof doBereken === 'function') {
      doBereken(ResultID);
    }
    doResult(ResultID);
  }
  if (slideMode) {
    doResult(ResultID);
    $('#divResultaat').hide();
    $("#btnNavVolgendePagina").prop('disabled', false);
  }
}


function doResult(resultID, bVoegToe) {
  if (bVoegToe == undefined)
    bVoegToe = true; //Indien false, wordt de resultaat  tekst toegevoegd binnen aan het <li>-element van het laatst getoonde resultaat.
  if (bDebugIah != undefined && debugJS)
    doDebugJS("doResult(" + resultID + ")");
  // Als resultid afhankelijk is van de berekening kan deze nog gewijzigd worden
  if (typeof resultIDNaBerekeningModuleSpecifiek == 'function') {
    resultID = resultIDNaBerekeningModuleSpecifiek(resultID);
  }
  if ($('#div' + resultID).is('#div' + resultID))
    return;
  //als blok resultaat niet wordt getoond: voeg blok toe
  let divRes;
  if ($('#divResultaat').length === 0)
    if (fieldsetMode) {
      divRes = '<div class="bld-result help-block col-xs-12 no-gutter collapse in" id="divResultaat"><legend class="bloktitel"><span class="left&quot;">' + oTekst.resultaat + '</span></legend>\n\
      <div class="bg-info" id="divResultTxt"></div></div>';
    } else {
      divRes = '<div class="bld-result help-block col-xs-12 no-gutter collapse in" id="divResultaat"><h2 class="bloktitel"><span class="left&quot;">' + oTekst.resultaat + '</span></h2>\n\
      <div class="bg-info" id="divResultTxt"></div></div>';
    }
  if (slideMode === true) {
    $("#slideNav").before(divRes);
  } else {
    $("#formIAH").append(divRes);
  }
  //   $("#formIAH").append('<div class="bld-result help-block col-xs-12 no-gutter collapse in" id="divResultaat"><legend class="bloktitel"><span class="left&quot;">' + oTekst.resultaat + '</span></legend>\n\
  // <div class="bg-info" id="divResultTxt"></div></div>');

  // Vervang eventuele variabele in resultaat teksten (vraag/label)
  var aResultTemp = new Array();
  if (aResult[resultID] !== undefined) {
    for (var i = 0; i < aResult[resultID].length; i++) {
      aResultTemp[i] = replaceVarsInText(aResult[resultID][i]);
    }
  }
  //Div
  if (bVoegToe) {
    $('#divResultTxt').append('<div class="divResult" id="div' + resultID + '">');
    selector = '#div' + resultID;
  } else {
    selector = '#divResulTxt .divResult:last-child';
  }
  toonHtmlTxt(selector, aResultTemp);
  if (typeof vulaanResultaatModuleSpecifiek == 'function') {
    vulaanResultaatModuleSpecifiek(resultID);
  }

  //debug
  if (bDebugIah != undefined && debugSID)
    $('#div' + resultID).prepend('<p class="clDebug clDebugSID">' + resultID + '</p>');
}

function doWijzigInvoer(ResultID) {
  //toon Wijzig knop
  doButtonWijzig(true, ResultID);
  bld_piwik.countBttn();
  $('#butWijzig').click(function () {
    //verberg Wijzig knop

    // Enable invoer
    $('select, input', '#formIAH .clBlok').prop('disabled', false);
    $('#formIAH').removeClass('bldInputDisabled')

    // Enable question-icon
    $('.btn.btn-info.pull-right').css('pointer-events', 'auto');

    // Enable all links within notification/'read more' elements
    $('div.help-block.bld-info > div > ul > li > a').css('pointer-events', 'auto');
    $('div.help-block.bld-info > div > p > a').css('pointer-events', 'auto');
    $('div.bg-info > p > a').css('pointer-events', 'auto');
    $('div.txtReadMore > p > a').css('pointer-events', 'auto');

    //verberg Eindresultaat

    // probeer dit te fixen...

    $('#divResultaat').remove();
    if ($("#formIAH", '#bld-modal').length > 0) {
      $('#bld-modal').animate({
        scrollTop: 0
      }, "slow");
    } else {
      $('html,body').animate({
        scrollTop: $('header').height() || 0
      }, 'slow');
    }

    //Toon Resultaten Knop
    doEindResultaat(ResultID);
    doButtonWijzig(false, ResultID);
  });
}

function doButtonResults(bToon) {
  if (!bToon) {
    if ($('#divButtonsResult').is('#divButtonsResult')) {
      $('#divButtonsResult').hide();
    }
  } else {
    if ($('#divButtonsResult').is('#divButtonsResult')) {
      $('#divButtonsResult').show();
    } else {
      $('#formIAH').append('<div class="col-xs-12 no-gutter" id="divButtonsResult"><button id="butResults" class="btn btn-primary pull-right" data-count=".click-open.toon-resultaat.collapse">' + oTekst.toon_resultaten + '</button></div>');
    }
  }
}

function doButtonWijzig(bToon, ResultID) {
  if (!bToon) {
    if ($('#divButtonsWijzig').is('#divButtonsWijzig')) {
      $('#divButtonsWijzig').remove();
      $('#divButtonsInfo').remove();
    }
  } else {
    $('#formIAH').append('<div class="col-xs-12 no-gutter" id="divButtonsWijzig"><button id="butWijzig" class="btn btn-primary pull-right" data-count=".bldto.wijzig-invoer.button">' + oTekst.wijzig_invoer + '</button></div>');
    if (typeof vulaanEindTonenResultaat == 'function') {
      vulaanEindTonenResultaat(ResultID)
    }
  }
}

// taalafhankelijke teksten instellen
var oTekst = new Object();
var sTaal = $("meta[name=language]").attr("content");
if (sTaal == undefined || sTaal.trim() == "") {
  sTaal = "nl";
}
if (sTaal === "nl") {
  oTekst = {
    ja: 'ja',
    nee: 'nee',
    toon_toelichting: 'Toon toelichting',
    verberg_toelichting: 'Verberg deze toelichting',
    toon_resultaten: 'Toon resultaten',
    wijzig_invoer: 'Wijzig invoer',
    resultaat: 'Resultaat'
  }
} else if (sTaal === "en") {
  oTekst = {
    ja: 'yes',
    nee: 'no',
    toon_toelichting: 'Show explanation',
    verberg_toelichting: 'Hide this explanation',
    toon_resultaten: 'Show results',
    wijzig_invoer: 'Change input',
    resultaat: 'Result'
  }
} else if (sTaal === "de") {
  oTekst = {
    ja: 'ja',
    nee: 'nein',
    toon_toelichting: 'Erläuterung anzeigen',
    verberg_toelichting: 'Diese Erläuterung ausblenden',
    toon_resultaten: 'Ergebnisse anzeigen',
    wijzig_invoer: 'Eingabe ändern',
    resultaat: 'Ergebnisse'
  }
}

function addBerekening(resultID, tb) {
  // eerst een div aanmaken als placeholder
  if ($("#ovzBerekening").length === 0) {

    $('#div' + resultID).prepend("<div id='ovzBerekening'></div>");

  }
  var subId = resultID + "-" + ($("#ovzBerekening div.sub-panel").length + 1);

  //klikbare regel
  var cTable = 'table1_' + subId;
  $("#ovzBerekening").append('<div id="sub-panel_' + subId + '" class="sub-panel calculation-panel"><div class="sub-panel-header"><table id="table1_' + subId + '" class="data-table" summary="samenvatting van tabulaire data">');
  addScopeRow(cTable);
  addRow(cTable, tb.header, 1, 1);

  // uitgewerkte berekening
  $('#sub-panel_' + subId).append('<div class="sub-panel-content">');
  var cPanel = $('#sub-panel_' + subId + ' .sub-panel-content');

  $.each(tb.content, function (i, v) {
    if (!v.conditie || (v.conditie && v.conditie())) {
      addTable(v, cPanel, subId, i);
    }

  });
  addActions('#sub-panel_' + subId);
  return;

  function addTable(oThis, cPanel, resultID, i) {
    var iTable = i + 2;
    var cTable = 'table' + iTable + '_' + resultID;
    if (oThis.titel) {
      $(cPanel).append('<p class="sub-title">' + oThis.titel + '</p>');
    }
    $(cPanel).append('<table id="' + cTable + '" class="data-table" summary="samenvatting van tabulaire data">');
    addScopeRow(cTable, iTable);
    $.each(oThis.row, function (ii, vv) {
      if (!vv.conditie || (vv.conditie && vv.conditie())) {
        addRow(cTable, vv, iTable, ii);
      }
    });
  }

  function addRow(cTable, data, iTable, iRow) {
    var col1, col2, col3, col4;
    col1 = col2 = col3 = content = ["<span class='text-only'>-</span>", ""];
    col4 = ["<span class='text-only'>Geen help</span>", ""];
    if (typeof data.col1 !== "undefined") {
      col1 = getData(data.col1);
      if (iTable === 1) {
        col1[0] = '<span class="sub-header"><strong>' + getData(data.col1)[0] + '</strong></span>';
      }
    }
    if (typeof data.col2 !== "undefined") {
      col2 = getData(data.col2);
    }
    if (typeof data.col3 !== "undefined") {
      col3 = getData(data.col3);
    }
    if (typeof data.content !== "undefined") {
      content = getData(data.content);
    }
    if (typeof data.help !== "undefined") {
      col4[0] = '<a title="Toon toelichting" class="btn_info btn btn-info" aria-label="' + oTekst.toon_toelichting + '" aria-expanded=false></a>';
      col4[1] = '" ';
    }

    $("#" + cTable).append('<tr>\n\
<td headers="' + cTable + 'Header1"' + col1[1] + ' id="' + cTable + 'SubHeader' + iRow + '" scope="row">' + col1[0] + '</td>\n\
 <td headers="' + cTable + 'Header2 ' + cTable + 'SubHeader' + iRow + '"' + col2[1] + '>' + col2[0] + '</td>\n\
<td headers="' + cTable + 'Header3 ' + cTable + 'SubHeader' + iRow + '"' + col3[1] + '>' + col3[0] + '</td>\n\
 <td headers="' + cTable + 'Header4 ' + cTable + 'SubHeader' + iRow + '"' + col4[1] + '>' + col4[0] + '</td>\n\
</tr>');
    if (typeof data.help !== "undefined") {


      $("#" + cTable).append('<tr class="tr-help hidden">\n\
<td headers="' + cTable + 'HelpHeader' + iRow + ' ' + cTable + 'SubHeader' + iRow + '" colspan="4" class="message-holder">\n\
   <div">\n\
     <div class="col-xs-12 bg-info">' + data.help +
        '</div></div></td></tr>');
    }
    if (typeof data.content !== "undefined") {
      $("#" + cTable).append('<tr><td headers="' + cTable + 'ContentHeader' + iRow + ' ' + cTable + 'SubHeader' + iRow + '" colspan="4" class="message-holder">' + getData(data.content)[0] + '</td></tr>');
    }
  }

  function addScopeRow(cTable) {
    $("#" + cTable).append('<tr class="text-only">\n\
   <th scope="col" id="' + cTable + 'Header1"><strong>Omschrijving</strong></th>\n\
   <th scope="col" id="' + cTable + 'Header2"><strong>Bedrag 1</strong></th>\n\
   <th scope="col" id="' + cTable + 'Header3"><strong>Bedrag 2</strong></th>\n\
   <th scope="col" id="' + cTable + 'Header4"><strong>Help</strong></th>\n\
  </tr>');
  }

  function getData(txt) {
    data = [replaceVarsInText(txt), ""];
    if (data[0].substr(0, 5) === "EURO:") {
      data[0] = '<span class="cell"><span class="valuta"><strong>€</strong></span><span class="bedrag"><strong>' + naarbedrag(data[0].substr(data[0].indexOf(":") + 1)) + '</strong></span></span>';
    }
    if (data[0].substr(0, 5) === "SIGN:") {
      data[1] = ' class="' + data[0].substr(5) + '" ';
      data[0] = '<span class="text-only">samen:</span>';
    }
    return data;

    function naarbedrag(getal) {
      //  tbv tonen alle resultaten undefined ondervangen
      if (getal !== undefined) {
        getal = getalNaarBedrag(getal, true);
      }
      return getal;
    }
  }

  function addActions(selection) {
    $(".sub-panel-header", selection).click(function () {
      $('.sub-header', this).toggleClass('collapse in');
      return togglePanel($(this));
    });
    $(".sub-panel-header", selection).attr("tabindex", "0").keypress(function (e) {
      if (e.which != '0') {
        e.preventDefault();
      }
      if (e.which == '13') {
        return togglePanel(this);
      }
    });
    var togglePanel = function (el) {
      var detailPanel = $(el).closest('.sub-panel-header');
      var detailPanelContent = $(detailPanel).next('.sub-panel-content');
      if ($(detailPanelContent).css("display") == "none") {
        detailPanelContent.slideDown(500, function () {
          detailPanel.addClass("open-sub-panel");
          detailPanelContent.find("a.help-link").fadeIn();
        });
      } else {
        detailPanelContent.find("a.help-link").hide();
        detailPanelContent.slideUp(500, function () {
          detailPanel.removeClass("open-sub-panel");
        });
      }
      $('span.bedrag, span.valuta', el).slideToggle();
      return false;
    };
    //$('div.calculation-panel tr.tr-help').hide();
    $('div.calculation-panel td a.btn_info').click(function () {
      // Code below only for helpblock in result IAH Toetsingsinkomen
      $(this).attr("aria-expanded", $(this).closest("tr").next("tr.tr-help").hasClass('hidden'));
      $(this).attr("aria-label", $(this).closest("tr").next("tr.tr-help").hasClass('hidden') ? oTekst.verberg_toelichting : oTekst.toon_toelichting);
      $(this).closest("tr").next("tr.tr-help").find('.bld-info').toggleClass('collapse in');
      $(this).closest("tr").next("tr.tr-help").toggleClass('hidden');
    });
    $('div.calculation-panel tr.tr-help a.btn_info').click(function () {
      $(this).closest("tr").toggleClass('hidden');
    });
  }
}


function toonVersie() {
  var bToonteller = false;
  for (var i = 0; i < uri.args.length && bToonteller == false; i++) {
    if (uri.args[i] == "versie") {
      bToonteller = true;
      if (typeof sVersie !== "undefined") {
        alert("Versie: " + sVersie);
      } else if (typeof sTiVersie !== "undefined") {
        alert("Versie: " + sTiVersie);
      }
    }
  }
}

var versie_utils = 1.2;

function calcRange(range) {
  if (bDebugIah != undefined && debugJS)
    doDebugJS("calcRange(" + range + ")");
  //vervang eerst eventueel aanwezig variabelen. Bijv. "{aangiftejaar}-10:{aangiftejaar}" door  "2012-10:2012"
  var range = replaceVarsInText(range);
  // Bereken.  Bijvoorbeeld "2012-10:2012" > "2010:2012"
  var aRange = range.split(':');
  var beginJaar = eval(aRange[0]);
  var eindJaar = eval(aRange[1]);
  range = beginJaar + ':' + eindJaar;
  if (bDebugIah != undefined && debugJS)
    doDebugJS("calcRange(): " + range);
  return range;
}

function replaceVarsInText(text) {
  if (bDebugIah != undefined && debugJS)
    doDebugJS("replaceVarsInText(" + text + ")");
  // Vervang in text bijv.  {aangiftejaar} door de value van de variable.  {aangiftejaar} naar aVar['aangiftejaar'] naar bijv. 2012
  // filter de variabelen .. {xxx} ..en sla deze op in array
  var aResult = doFunctionInText(text);
  var aText = aResult[0];
  var bArray = aResult[1];
  var tmpText;

  for (var ii = 0; ii < aText.length; ii++) {
    tmpText = aText[ii];
    // var aVarNames = text.match(/{(.*?)}/g);
    var aVarNames = tmpText.match(/{(.*?)}/g);
    if (aVarNames != undefined) {
      for (var i = 0; i < aVarNames.length; i++) {
        // bewaar de variabele naam zonder {} in sVarname
        var sVarName = aVarNames[i].replace(/[{}]/g, '');
        // vervang de variabele naam incl. {} in tmpText, door de value van de opgeslagen variabele aVar[sVarName];
        var re = new RegExp(aVarNames[i], "g");
        tmpText = tmpText.replace(re, aVar[sVarName]);
      }
    }
    // Vervang in tmpText bijv.  #2012-1# door 2011.
    // bereken resultaten  ... [xxx-xx] ..
    var aTemp = tmpText.match(/#(.*?)#/g);
    if (aTemp != undefined) {
      for (var i = 0; i < aTemp.length; i++) {
        // bewaar inhoud zonder [] in sTemp
        var sTemp = aTemp[i].replace(/[##]/g, '');
        var sBerekend = eval(sTemp);
        var sTemp = "#" + sTemp.replace(/\+/g, '\\+') + "#";
        var re = new RegExp(sTemp, "g");
        tmpText = tmpText.replace(re, sBerekend);
      }
    }
    aText[ii] = tmpText;
  }
  if (bArray === false) {
    return aText[0];
  }
  return aText;

}

function doFunctionInText(text) {
  var bArray = Array.isArray(text);
  if (bArray === false) {
    var aText = [].concat(text);
  } else {
    var aText = text;
  }
  for (var i = 0; i < aText.length; i++) {
    text = aText[i];
    if (text.indexOf('[FUNCTION:') == 0 && text.substr(text.length - 1) == "]") {
      var sFunction = text.split(":")[1].substr(0, text.split(":")[1].length - 1)
      var result = eval(sFunction);
      if (Array.isArray(result)) {
        bArray = true;
        //array uitbreiden
        aTmp = [];
        for (ii = 0; ii < aText.length; ii++) {
          if (ii === i) {
            for (iii = 0; iii < result.length; iii++) {
              aTmp[aTmp.length] = result[iii];
            }
          } else {
            aTmp[aTmp.length] = result[ii];
          }
        }
        aText = aTmp;
      } else {
        aText.splice(i, 1, result);
      }
    }
  }
  return [aText, bArray];
}

function formatDate(string) {
  //string = (string.replace(/[./]/g,'-'));  // vervang eventuele punten en slashes streepjes
  if (string.indexOf('-') == -1 && string.length == 8) {
    //if (!isNativeDatePicker) {
    string = string.substr(0, 2) + '-' + string.substr(2, 2) + '-' + string.substr(4, 4);
    // }
    //else {
    //  string = string.substr(0, 4) + '-' + string.substr(4, 2) + '-' + string.substr(6, 2);
    //}
  }
  return string;
}

// check if input type="date" is supported. If supported show the native type on xs screens
function getInputDateType() {

  // WEBT-2604: Workaround for issue with datefield on mobile (message "date not valid" on valid date)
  // quick solution: always use the jquery datepicker instead of the mobile native datepicker
  return "text";

  var input = document.createElement('input');
  input.setAttribute('type', 'date');

  var notADateValue = 'not-a-date';
  input.setAttribute('value', notADateValue);

  if (input.value !== notADateValue && bldViewport.is('xs')) {
    return "date";
  }
  else {
    return "text";
  }
}

function isNativeDatepicker() {
  return getInputDateType() === "date";
}

function strToDate(stringValue) {
  var temp = stringValue.split('-');
  if (temp.length < 3)
    return '';

  if (temp[2].length == 4) {
    return new Date(parseInt(temp[2], 10), (parseInt(temp[1], 10) - 1), parseInt(temp[0], 10));
  } else {
    // is native Datepicker: value of inputfield (type=date) starts with year.(yyyy-mm-dd)
    return new Date(parseInt(temp[0], 10), (parseInt(temp[1], 10) - 1), parseInt(temp[2], 10));
  }
}

function dateToStr(datum) {
  var dag = datum.getDate();
  var maand = datum.getMonth() + 1
  var jaar = datum.getFullYear();
  var stringDate;

  stringDate = dag + "-" + maand + "-" + jaar;

  return stringDate;
}

function firstDayOfYear(year) {
  return new Date(parseInt(year), 0, 1);
}

function lastDayOfYear(year) {
  return new Date(parseInt(year), 11, 31);
}

function lastdayOfMonth(year, month) {
  var res = new Date(year, month + 1, 0);
  res = res.getDate();
  return res;
}

function sameDate(date1, date2) {
  return (!(date1 < date2 || date1 > date2));
}

function formatDate(vraagValue) {
  // nog uit te werken
  if (vraagValue.indexOf('-') > -1) {
    aDatum = vraagValue.split('-');
  }
}

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1;
  var dd = this.getDate();

  return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('-');
};

// to increase/decrease the given date object with a number of days
Date.prototype.addDay = function (days) {
  this.setTime( this.getTime() + days * 86400000);
  return;
};


function reformatDate(string) {
  //input juist formateren
  string = (string.replace(/[./]/g, '-'));  // vervang eventuele punten en slashes streepjes
  if (string.indexOf('-') == -1 && string.length == 8) {
    //if (!isNativeDatePicker) {
    string = string.substr(0, 2) + '-' + string.substr(2, 2) + '-' + string.substr(4, 4);
    //} else {
    //  string = string.substr(0, 4) + '-' + string.substr(4, 2) + '-' + string.substr(6, 2);
    //}
  }  // indien niet aanwezig, streepjes invoegen.
  return string;
}

function validDate(string, vraagID, range) {
  var errortxt = new Array();
  var bValid = true;
  var aString = string.split('-');

  var inputDay, inputMonth, inputYear;

  /* WEBT-2604: Workaround for issue with datefield on mobile (message "date not valid" on valid date) 
   * quick solution: always use the jquery datepicker instead of the mobile native datepicker
   * see getInputDateType() function
  */

  // if (getInputDateType() !== "date" || $('#'+vraagID).attr('type') !== "date") {
    inputDay = parseInt(aString[0], 10);
    inputMonth = parseInt(aString[1], 10);
    inputYear = parseInt(aString[2], 10);
  // } else {
    // inputDay = parseInt(aString[2], 10);
    // inputMonth = parseInt(aString[1], 10);
    // inputYear = parseInt(aString[0], 10);
  // }

  // valideer geldigheid datuminvoer  ( bijvoorbeeld 30-2-2012 > fout )
  if (isValidDate (inputDay, inputMonth-1, inputYear)) {
 
    // valideer ingevoerd jaar met van jaarbereik  ( bijvoorbeeld: range is '2000:2010' en invoer 2020 > fout )
    if (range) {
      var range = calcRange(range);
      var aRange = range.split(':');

      // Als ingevoerd jaar buiten specifiek jaar ligt 
      if ( parseInt(aRange[0]) === parseInt(aRange[1]) && inputYear !== parseInt(aRange[0]) ) {
        errortxt[0] = "<p>De datum moet in " + aRange[0] + " liggen. Pas de datum aan.</p>";
        bValid = false;
      }

      // Als ingevoerd jaar voor jaarbereik-min ligt 
      else if (inputYear < parseInt(aRange[0])) {
        errortxt[0] = "<p>De datum mag niet voor " + aRange[0] + " liggen. Pas de datum aan.</p>";
        bValid = false;
      }

      // Als ingevoerd jaar na jaarbereik-max ligt 
      else if (inputYear > parseInt(aRange[1])) {
        errortxt[0] = "<p>De datum mag niet na " + aRange[1] + " liggen. Pas de datum aan.</p>";
        bValid = false;
      }
    }
    
  } else {
    errortxt[0] = "<p>De ingevulde datum bestaat niet.</p>";
    bValid = false;
  }
  
  return [bValid, errortxt, string];

  // Validate date
  // params: day-number(integer), month-number(integer, starts with 0), year(integer) 
  function isValidDate(d, m, y) {
    var datum = new Date(y,m,d);
    if (datum.getDate() !== d || datum.getMonth() !== m || datum.getFullYear() !== y) {
      return false;
    }
    return true;
  }
}

function validDatePeriod(begindat, einddat) {  //validDateBeginEind
  var errortxt = new Array();
  var bValid = true;
  // valideer periode begin eind ( bijvoorbeeld begin: 1-12-2012 en eind: 1-1-2012 > fout )
  if (strToDate(einddat) <= strToDate(begindat)) {
    errortxt[0] = "<p>De einddatum moet na de begindatum liggen. Pas 1 van de datums aan.</p>";
    bValid = false;
  }
  return [bValid, errortxt];
}

function daysBetween(firstDate, secondDate) {
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return 1 + Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
}

function maandVerschil(eind, begin) {
  var maandA = begin.getMonth() + 1;
  var dagA = begin.getDate();
  var maandB = eind.getMonth() + 1;
  var dagB = eind.getDate();
  var tmp = (maandB - maandA) + ((dagB - dagA) / 31)  //  1-1 t/m  2-7 > 6 maanden (tmp=7)   :  1-1 t/m 1-7 = 6 maanden   (tmp=6)
  return tmp;
}


function daysInMonth(year, month ) {
  return new Date(year, month+1, 0).getDate();
}

function getalNaarBedrag(getal, bDuizendTallen) {
  // Plaatst de duizendtalpunten. bDuizendTallen = false = geen gebruik van decimalen, bDuizendTallen = true = wel gebruik van decimalen
  if (typeof getal !== "undefined") {

    var negTeken = "";
    if (getal.toString().substr(0, 1) === "-") {
      negTeken = "-";
      getal = getal.toString().substr(1);
    }
    var aGetal = getal.toString().split(".");
    if ((bDuizendTallen == true)) {
      var iLengte = aGetal[0].length;
      if (iLengte > 3) {
        var iAantalSep = parseInt(iLengte / 3.1);
        var j = 3;
        for (var i = 1; i <= iAantalSep; i++) {
          aGetal[0] = aGetal[0].substring(0, iLengte - j) + "." + aGetal[0].substring(iLengte - j);
          j = j + 3;
        }
      }
    }
    if (aGetal.length > 1) {
      getal = aGetal[0] + "," + aGetal[1];
    } else {
      getal = aGetal[0];
    }
    return negTeken + getal;
  } else {
    return getal;
  }
}

function toRekenBedrag(num) {
  num = num.toString().replace(/\$|\./g, '');
  num = num.toString().replace(/\$|\,/g, '.');
  return parseFloat(num);
}

function filterHtmlTags(oInput){
  var text = $(oInput).val();
    var map = {
        ';': '&#059;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

   text = text.replace(/[;<>"']/g, function(m) { return map[m]; });
  $(oInput).val(text);
}



function checkNumeriek(oInput, oVraag) {
  var iDecimaal = oVraag.decimalen;
  var bPunten = oVraag.duizendtalpunten;
  var iNum = $(oInput).val();
  iNum = iNum.replace(/[.]/g, "");
  aNum = iNum.split(",");
  if (iNum === "-" || iNum === "-0" || iNum === "") {
    return [false, "NOerror"];
  }

  if (oVraag.decimalen > 0) {
    if (aNum.length === 2) {
      if (aNum[1].length === 0) {
        bKomma = true; //komma aan het eind van de invoer
      }
      if (aNum[1].length > oVraag.decimalen) {
        return [false, eval('aError["numeriek"].melding.decimalen').replace("[decimalen]", oVraag.decimalen)];
      }
      if (isNaN(aNum[0].replace(".", ",")) || isNaN(aNum[1].replace(".", ","))) {
        return [false, eval('aError["numeriek"].melding.isNaN_decimalen')];
      }
    } else if (isNaN(iNum.replace(".", ","))) {
      return [false, eval('aError["numeriek"].melding.isNaN_decimalen')];
    }
    //Num = aNum[0] + "." + aNum[1];
  } else if (isNaN(iNum.replace(".", ","))) {
    if (oVraag.mingetal === undefined || oVraag.mingetal === -0) {
      return [false, eval('aError["numeriek"].melding.isNaNNeg')];
    } else {
      return [false, eval('aError["numeriek"].melding.isNaN')];
    }
  }

  if (oVraag.maxgetal !== undefined) {
    if (iNum > oVraag.maxgetal) {
      if (oVraag.error_maxgetal) {
        return [false, oVraag.error_maxgetal]
      } else {
        return [false, eval('aError["numeriek"].melding.maxgetal').replace("[maxgetal]", oVraag.maxgetal)]
      }
    }
  }
  if (oVraag.mingetal !== undefined) {
    if (iNum < oVraag.mingetal) {
      if (oVraag.error_mingetal) {
        return [false, oVraag.error_mingetal]
      } else {
        return [false, eval('aError["numeriek"].melding.mingetal').replace("[mingetal]", oVraag.mingetal)]
      }
    }
  }
  if (!(isNaN(aNum[0])) && aNum[0] !== "-0") {
    aNum[0] = parseInt(aNum[0]);
  }
  if (bPunten) {
    aNum[0] = getalNaarBedrag(aNum[0], true);
  }
  if (aNum.length == 2) {
    iNum = aNum[0] + "," + aNum[1]
  } else {
    iNum = aNum[0]
  }
  $(oInput).val(iNum);
  return [true]
}

function NieuwVenster(sURL, sTarget) {
  var objNieuwVenster = window.open(sURL, sTarget);
  objNieuwVenster.focus();
  return objNieuwVenster;
}

function getMaanden() {
  aMonths = new Array();
  aMonths[0] = new Array(1, 'januari');
  aMonths[1] = new Array(2, 'februari');
  aMonths[2] = new Array(3, 'maart');
  aMonths[3] = new Array(4, 'april');
  aMonths[4] = new Array(5, 'mei');
  aMonths[5] = new Array(6, 'juni');
  aMonths[6] = new Array(7, 'juli');
  aMonths[7] = new Array(8, 'augustus');
  aMonths[8] = new Array(9, 'september');
  aMonths[9] = new Array(10, 'oktober');
  aMonths[10] = new Array(11, 'november');
  aMonths[11] = new Array(12, 'december');
  return aMonths;
}

var aError = aError || {};
aError = {
  // Blok 1 Woon-Werk
  "numeriek": {
    "melding": {
      isNaN: "U mag alleen cijfers (0-9) invullen in dit veld",
      isNaNNeg: "U mag alleen cijfers (0-9) en als eerste teken het min-teken (-) invullen in dit veld",
      isNaN_decimalen: "U mag alleen cijfers (0-9) en één komma invullen in dit veld",
      decimalen: "U mag niet meer dan [decimalen] decimalen invullen in dit veld",
      maxgetal: "U mag geen getal groter dan [maxgetal] invullen in dit veld",
      mingetal: "U mag geen getal kleiner dan [mingetal] invullen in dit veld"
    }
  }
};

function assArrLength(assArr) {
  var key, len = 0;
  for (var key = 0; key < assArr.length; key++) {
    len++;
  }
  return len;
}

//# sourceURL=gen_iah.js

