/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
var t="object"==typeof global&&global&&global.Object===Object&&global,e="object"==typeof self&&self&&self.Object===Object&&self,n=t||e||Function("return this")(),o=n.Symbol,l=Object.prototype,c=l.hasOwnProperty,r=l.toString,a=o?o.toStringTag:void 0,u=Object.prototype.toString,b=o?o.toStringTag:void 0;function f(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":b&&b in Object(t)?function(t){var e=c.call(t,a),n=t[a];try{t[a]=void 0;var o=!0}catch(t){}var l=r.call(t);return o&&(e?t[a]=n:delete t[a]),l}(t):function(t){return u.call(t)}(t)}function i(t){return null!=t&&"object"==typeof t}function j(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}export{o as S,i as a,f as b,t as f,j as i,n as r}