define(["../Component"],(function(t){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=837)}({0:function(t,e,n){"use strict";n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return i})),n.d(e,"f",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return a})),n.d(e,"e",(function(){return s})),n.d(e,"g",(function(){return u}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var i=function(){return(i=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};function c(t,e){var n={};for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.indexOf(o)<0&&(n[o]=t[o]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(t);r<o.length;r++)e.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(t,o[r])&&(n[o[r]]=t[o[r]])}return n}function l(t,e,n,o){var r,i=arguments.length,c=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,o);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(c=(i<3?r(c):i>3?r(e,n,c):r(e,n))||c);return i>3&&c&&Object.defineProperty(e,n,c),c}function a(t,e,n,o){return new(n||(n=Promise))((function(r,i){function c(t){try{a(o.next(t))}catch(t){i(t)}}function l(t){try{a(o.throw(t))}catch(t){i(t)}}function a(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(c,l)}a((o=o.apply(t,e||[])).next())}))}function s(t,e){var n,o,r,i,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,o=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(r=c.trys,(r=r.length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(t){i=[6,t],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}Object.create;function u(t,e){for(var n=0,o=e.length,r=t.length;n<o;n++,r++)t[r]=e[n];return t}Object.create},16:function(e,n){e.exports=t},837:function(t,e,n){"use strict";n.r(e);var o=n(0),r=n(16),i=function(t){function e(e){var n=t.call(this,e)||this;return n.state={active:!1},n.handleBtnClick=n.handleBtnClick.bind(n),n.handleDropdownClick=n.handleDropdownClick.bind(n),n.handleButtonKeyDown=n.handleButtonKeyDown.bind(n),n.registerCloseHandler=n.registerCloseHandler.bind(n),n.close=n.close.bind(n),n}return Object(o.d)(e,t),e.prototype.render=function(t){var e=void 0===this.props.active?this.state.active:this.props.active;if(this.props.children&&this.props.children[0]&&this.props.children[1]){var n=this.props.children[0],o=e?this.props.children[1]:null,r=e?t("div",{key:"open-dropdown-hook",id:this.props.key+"-hook",afterCreate:this.registerCloseHandler,style:"display: none;"}):null;return t("div",{class:"drp-basic__container",onclick:this.handleDropdownClick},r,t("span",{id:this.props.key,class:"drp-basic__button",onclick:this.handleBtnClick,onkeydown:this.handleButtonKeyDown,role:"button",tabindex:this.props.tabindex?this.props.tabindex:"0"},n),o)}console.error("The BasicDropdown component requires 2 children")},e.prototype.componentWillReceiveProps=function(t){!0===this.props.active&&!1===t.active&&document.body.removeEventListener("click",this.close)},e.prototype.close=function(){void 0===this.props.active?this.setState({active:!1}):this.props.onToggle&&this.props.onToggle(),document.body.removeEventListener("click",this.close)},e.prototype.handleBtnClick=function(t){t.stopPropagation(),void 0===this.props.active?this.setState({active:!this.state.active}):this.props.onToggle?this.props.onToggle():this.setState({active:!this.state.active})},e.prototype.handleDropdownClick=function(t){t.stopPropagation(),this.setState({active:!this.state.active})},e.prototype.handleButtonKeyDown=function(t){13===t.keyCode||32===t.keyCode?(t.preventDefault(),this.handleBtnClick(t)):this.props.handleButtonKeyDown&&this.props.handleButtonKeyDown(t)},e.prototype.registerCloseHandler=function(){document.body.addEventListener("click",this.close)},e}(r.Component);e.default=i}})}));
//# sourceMappingURL=BasicDropdown.js.map