webpackJsonp([6],{587:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(596);t.default=i.a},596:function(e,t,n){"use strict";var i=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}();var r=function(){function AccessibilityLinks(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AccessibilityLinks),this.element=e,this.links=this.element.querySelectorAll("a"),this.bindEvents()}return i(AccessibilityLinks,[{key:"bindEvents",value:function bindEvents(){var e=this;[].concat(function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(this.links)).forEach(function(t){t.addEventListener("focus",function(){e.element.classList.remove("u-sr-only")}),t.addEventListener("blur",function(){e.element.classList.add("u-sr-only")}),t.addEventListener("click",function(){document.querySelector(t.getAttribute("href")).querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')[0].focus()})})}}]),AccessibilityLinks}();t.a=r}});