define(["../Component"],(function(e){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=811)}({0:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return l})),n.d(t,"f",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return c})),n.d(t,"e",(function(){return a})),n.d(t,"g",(function(){return p}));
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
var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var l=function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function i(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}function u(e,t,n,r){var o,l=arguments.length,i=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,n,r);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(i=(l<3?o(i):l>3?o(t,n,i):o(t,n))||i);return l>3&&i&&Object.defineProperty(t,n,i),i}function c(e,t,n,r){return new(n||(n=Promise))((function(o,l){function i(e){try{c(r.next(e))}catch(e){l(e)}}function u(e){try{c(r.throw(e))}catch(e){l(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,u)}c((r=r.apply(e,t||[])).next())}))}function a(e,t){var n,r,o,l,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return l={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function u(l){return function(u){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,l[1])).done)return o;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,r=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==l[0]&&2!==l[0])){i=0;continue}if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){i.label=l[1];break}if(6===l[0]&&i.label<o[1]){i.label=o[1],o=l;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(l);break}o[2]&&i.ops.pop(),i.trys.pop();continue}l=t.call(e,i)}catch(e){l=[6,e],r=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,u])}}}Object.create;function p(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e}Object.create},17:function(t,n){t.exports=e},811:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(17),l=function(e){function t(t){var n=e.call(this,t)||this;return n.handleToggleClick=n.handleToggleClick.bind(n),n}return Object(r.d)(t,e),t.prototype.render=function(e){var t=this.props,n=t.name,r=t.selectedToggle,o=t.childOptions,l=t.prependValue,i=t.infoTooltip,u=l?""+l+this.props.value:this.props.value,c=!!(r===u||o&&this.childSelectedRecursive(o,u)),a={"btn-toggle__item":!0,"btn-toggle__item--active":c,"btn-toggle__item--flex":!!i},p={"btn-toggle__button":!0,"btn-toggle__button--active":c},s=null;return o&&(s=e("ul",{class:"btn-toggle__sub-list",role:"group"},this.mapChildrenToToggles(e))),e("li",{key:u,classes:a,role:"treeitem","aria-selected":c?"true":void 0,"aria-expanded":o?c?"true":"false":void 0},e("button",{key:u,classes:p,value:u,onmousedown:this.preventDefault,onclick:this.handleToggleClick,title:this.props.tooltip,role:"checkbox","aria-checked":c?"true":void 0,"aria-label":n,onblur:this.props.handleBlur,tabindex:"0"},e("span",{class:"btn-toggle__text",key:"text"},n),this.props.count?e("span",{class:"btn-toggle__count",key:"count"}," ","("+this.props.count+")"):null),!!i&&e("calcite-tooltip-manager",{class:"btn-toggle__item-tooltip"},e("calcite-button",{id:"share-org-settings-filter-tooltip",appearance:"transparent",color:"neutral",scale:"s",round:!0},e("calcite-icon",{scale:"s",icon:"information"})),e("calcite-tooltip",{"reference-element":"share-org-settings-filter-tooltip"},i)),c?s:null)},t.prototype.preventDefault=function(e){e.preventDefault()},t.prototype.mapChildrenToToggles=function(e){var n=this,r=this.props,o=r.childOptions,l=r.selectedToggle,i=r.onToggleClick,u=r.useFullPathAsValue,c=r.prependValue,a=c?""+c+this.props.value:this.props.value;return o?o.map((function(r){return e(t,{count:r.count,key:r.value,name:r.displayName,value:u?a+"/"+r.value:r.value,showTooltip:n.props.showTooltip,tooltip:r.tooltip,selectedToggle:l,childOptions:r.children,onToggleClick:i,useFullPathAsValue:u})})):null},t.prototype.childSelectedRecursive=function(e,t){var n=this,r=this.props,o=r.selectedToggle;return r.useFullPathAsValue?e.reduce((function(e,r){return!!(o===t+"/"+r.value||r.children&&n.childSelectedRecursive(r.children,t+"/"+r.value))||e}),!1):e.reduce((function(e,t){return!!(o===t.value||t.children&&n.childSelectedRecursive(t.children,n.props.value))||e}),!1)},t.prototype.handleToggleClick=function(e){e.preventDefault(),this.props.onToggleClick(this.props.prependValue?""+this.props.prependValue+this.props.value:this.props.value,this.props.name)},t}(o.Component);t.default=l}})}));
//# sourceMappingURL=Toggle.js.map