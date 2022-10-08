/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{a as r,b as t,i as n,r as i}from"./p-9609e6ea.js";function o(n){return"symbol"==typeof n||r(n)&&"[object Symbol]"==t(n)}var e=/\s/,u=/^\s+/;var f=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,v=/^0o[0-7]+$/i,c=parseInt;function s(r){if("number"==typeof r)return r;if(o(r))return NaN;if(n(r)){var t="function"==typeof r.valueOf?r.valueOf():r;r=n(t)?t+"":t}if("string"!=typeof r)return 0===r?r:+r;var i;r=(i=r)?i.slice(0,function(r){for(var t=r.length;t--&&e.test(r.charAt(t)););return t}(i)+1).replace(u,""):i;var s=a.test(r);return s||v.test(r)?c(r.slice(2),s?2:8):f.test(r)?NaN:+r}var m=function(){return i.Date.now()},d=Math.max,p=Math.min;function y(r,t,i){var o,e,u,f,a,v,c=0,y=!1,T=!1,b=!0;if("function"!=typeof r)throw new TypeError("Expected a function");function l(t){var n=o,i=e;return o=e=void 0,c=t,f=r.apply(i,n)}function h(r){return c=r,a=setTimeout(N,t),y?l(r):f}function x(r){var n=r-v;return void 0===v||n>=t||n<0||T&&r-c>=u}function N(){var r=m();if(x(r))return $(r);a=setTimeout(N,function(r){var n=t-(r-v);return T?p(n,u-(r-c)):n}(r))}function $(r){return a=void 0,b&&o?l(r):(o=e=void 0,f)}function g(){var r=m(),n=x(r);if(o=arguments,e=this,v=r,n){if(void 0===a)return h(v);if(T)return clearTimeout(a),a=setTimeout(N,t),l(v)}return void 0===a&&(a=setTimeout(N,t)),f}return t=s(t)||0,n(i)&&(y=!!i.leading,u=(T="maxWait"in i)?d(s(i.maxWait)||0,t):u,b="trailing"in i?!!i.trailing:b),g.cancel=function(){void 0!==a&&clearTimeout(a),c=0,o=v=e=a=void 0},g.flush=function(){return void 0===a?f:$(m())},g}export{y as d,o as i}