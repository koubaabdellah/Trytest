/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{i as t,b as r,a as n,r as e,f as o}from"./p-9609e6ea.js";var u=Array.isArray;function c(n){if(!t(n))return!1;var e=r(n);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}var f=/^(?:0|[1-9]\d*)$/;function a(t,r){var n=typeof t;return!!(r=null==r?9007199254740991:r)&&("number"==n||"symbol"!=n&&f.test(t))&&t>-1&&t%1==0&&t<r}function i(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}function s(t){return null!=t&&i(t.length)&&!c(t)}var b=Object.prototype;function l(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||b)}function p(t){return n(t)&&"[object Arguments]"==r(t)}var v=Object.prototype,j=v.hasOwnProperty,y=v.propertyIsEnumerable,m=p(function(){return arguments}())?p:function(t){return n(t)&&j.call(t,"callee")&&!y.call(t,"callee")},d="object"==typeof exports&&exports&&!exports.nodeType&&exports,x=d&&"object"==typeof module&&module&&!module.nodeType&&module,O=x&&x.exports===d?e.Buffer:void 0,g=(O?O.isBuffer:void 0)||function(){return!1},A={};function h(t){return function(r){return t(r)}}A["[object Float32Array]"]=A["[object Float64Array]"]=A["[object Int8Array]"]=A["[object Int16Array]"]=A["[object Int32Array]"]=A["[object Uint8Array]"]=A["[object Uint8ClampedArray]"]=A["[object Uint16Array]"]=A["[object Uint32Array]"]=!0,A["[object Arguments]"]=A["[object Array]"]=A["[object ArrayBuffer]"]=A["[object Boolean]"]=A["[object DataView]"]=A["[object Date]"]=A["[object Error]"]=A["[object Function]"]=A["[object Map]"]=A["[object Number]"]=A["[object Object]"]=A["[object RegExp]"]=A["[object Set]"]=A["[object String]"]=A["[object WeakMap]"]=!1;var F="object"==typeof exports&&exports&&!exports.nodeType&&exports,k=F&&"object"==typeof module&&module&&!module.nodeType&&module,G=k&&k.exports===F&&o.process,L=function(){try{return k&&k.require&&k.require("util").types||G&&G.binding&&G.binding("util")}catch(t){}}(),P=L&&L.isTypedArray,S=P?h(P):function(t){return n(t)&&i(t.length)&&!!A[r(t)]},$=Object.prototype.hasOwnProperty;function q(t,r){var n=u(t),e=!n&&m(t),o=!n&&!e&&g(t),c=!n&&!e&&!o&&S(t),f=n||e||o||c,i=f?function(t,r){for(var n=-1,e=Array(t);++n<t;)e[n]=r(n);return e}(t.length,String):[],s=i.length;for(var b in t)!r&&!$.call(t,b)||f&&("length"==b||o&&("offset"==b||"parent"==b)||c&&("buffer"==b||"byteLength"==b||"byteOffset"==b)||a(b,s))||i.push(b);return i}var w=Object.prototype.hasOwnProperty;function z(r){return s(r)?q(r,!0):function(r){if(!t(r))return function(t){var r=[];if(null!=t)for(var n in Object(t))r.push(n);return r}(r);var n=l(r),e=[];for(var o in r)("constructor"!=o||!n&&w.call(r,o))&&e.push(o);return e}(r)}export{l as a,s as b,q as c,u as d,h as e,g as f,S as g,c as i,z as k,L as n}