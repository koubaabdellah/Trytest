/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/polyfills/element.matches.js. */
if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;}
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/polyfills/element.matches.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/misc/polyfills/object.assign.js. */
if(typeof Object.assign!=='function'){Object.defineProperty(Object,'assign',{value:function assign(target,varArgs){'use strict';if(target===null||target===undefined){throw new TypeError('Cannot convert undefined or null to object');}
var to=Object(target);for(var index=1;index<arguments.length;index++){var nextSource=arguments[index];if(nextSource!==null&&nextSource!==undefined){for(var nextKey in nextSource){if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)){to[nextKey]=nextSource[nextKey];}}}}
return to;},writable:true,configurable:true});}
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/misc/polyfills/object.assign.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/assets/vendor/once/once.min.js. */
/*! @drupal/once - v1.0.1 - 2021-06-12 */
var once=function(){"use strict";var n=/[\11\12\14\15\40]+/,e="data-once",t=document;function r(n,t,r){return n[t+"Attribute"](e,r)}function o(e){if("string"!=typeof e)throw new TypeError("once ID must be a string");if(""===e||n.test(e))throw new RangeError("once ID must not be empty or contain spaces");return'[data-once~="'+e+'"]'}function u(n){if(!(n instanceof Element))throw new TypeError("The element must be an instance of Element");return!0}function i(n,e){void 0===e&&(e=t);var r=n;if(null===n)r=[];else{if(!n)throw new TypeError("Selector must not be empty");"string"!=typeof n||e!==t&&!u(e)?n instanceof Element&&(r=[n]):r=e.querySelectorAll(n)}return Array.prototype.slice.call(r)}function c(n,e,t){return e.filter((function(e){var r=u(e)&&e.matches(n);return r&&t&&t(e),r}))}function f(e,t){var o=t.add,u=t.remove,i=[];r(e,"has")&&r(e,"get").trim().split(n).forEach((function(n){i.indexOf(n)<0&&n!==u&&i.push(n)})),o&&i.push(o);var c=i.join(" ");r(e,""===c?"remove":"set",c)}function a(n,e,t){return c(":not("+o(n)+")",i(e,t),(function(e){return f(e,{add:n})}))}return a.remove=function(n,e,t){return c(o(n),i(e,t),(function(e){return f(e,{remove:n})}))},a.filter=function(n,e,t){return c(o(n),i(e,t))},a.find=function(n,e){return i(n?o(n):"[data-once]",e)},a}();

/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/assets/vendor/once/once.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/core/assets/vendor/jquery-once/jquery.once.min.js. */
(function(e){"use strict";if(typeof exports==="object"&&typeof exports.nodeName!=="string"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(t){"use strict";var r=function(e){e=e||"once";if(typeof e!=="string"){throw new TypeError("The jQuery Once id parameter must be a string")}return e};t.fn.once=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)!==true}).data(n,true)};t.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+r(e))};t.fn.findOnce=function(e){var n="jquery-once-"+r(e);return this.filter(function(){return t(this).data(n)===true})}});
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/core/assets/vendor/jquery-once/jquery.once.min.js. */;