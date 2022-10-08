define(["../Component","../Navigation/TabNav","dojo/i18n!../JsonViewers/nls/resources","../JsonViewers/index","../Modals/Dialog"],(function(e,t,n,r,o){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=867)}({0:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return a})),n.d(t,"f",(function(){return c})),n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return l})),n.d(t,"e",(function(){return u})),n.d(t,"g",(function(){return s}));
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
var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var a=function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function c(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}function i(e,t,n,r){var o,a=arguments.length,c=a<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(c=(a<3?o(c):a>3?o(t,n,c):o(t,n))||c);return a>3&&c&&Object.defineProperty(t,n,c),c}function l(e,t,n,r){return new(n||(n=Promise))((function(o,a){function c(e){try{l(r.next(e))}catch(e){a(e)}}function i(e){try{l(r.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,i)}l((r=r.apply(e,t||[])).next())}))}function u(e,t){var n,r,o,a,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++,r=a[1],a=[0];continue;case 7:a=c.ops.pop(),c.trys.pop();continue;default:if(!(o=c.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){c=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){c.label=a[1];break}if(6===a[0]&&c.label<o[1]){c.label=o[1],o=a;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(a);break}o[2]&&c.ops.pop(),c.trys.pop();continue}a=t.call(e,c)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}}Object.create;function s(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e}Object.create},16:function(t,n){t.exports=e},333:function(e,n){e.exports=t},429:function(e,t){e.exports=n},620:function(e,t){e.exports=r},621:function(e,t){e.exports=o},622:function(e,t,n){"use strict";var r=n(0),o=n(16),a=function(e){function t(t){return e.call(this,t)||this}return Object(r.d)(t,e),t.prototype.render=function(e){return e("div",null,e("div",{innerHTML:this.props.htmlString}))},t}(o.Component);t.a=a},867:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n(429),a=n(620),c=n.n(a),i=n(16),l=n(621),u=n.n(l),s=n(333),p=n.n(s),f=n(622),d=function(e){function t(t){var n,r=e.call(this,t)||this;return r.onTabSelect=r.onTabSelect.bind(r),r.props.availableTabs&&(n=r.props.availableTabs[0].value),r.state.selectedTab=r.props.selectedTab||n||"",r}return Object(r.d)(t,e),t.prototype.render=function(e){var t=this,n=this.props.availableTabs||[],r=(this.props.baseTabs||[]).map((function(n){return"ProcessInfo"===n?{value:"ProcessInfo",text:o.processInfo,content:e(f.a,{key:"html",htmlString:t.props.processInfoHtml})}:{value:"Json",text:o.jsonResult,content:e(c.a,{key:"json-viewer",containerClass:"json-viewer__modal__view",data:t.props.data,name:t.props.name,expanded:t.props.expanded,expandedAll:t.props.expandedAll,nameFormatter:t.props.nameFormatter,valueFormatter:t.props.valueFormatter,objectValueFormatter:t.props.objectValueFormatter,arrayValueFormatter:t.props.arrayValueFormatter,separatorFormatter:t.props.separatorFormatter})}})).concat(n),a=r.filter((function(e){return e.value==t.state.selectedTab}))[0];return e("div",{class:"json-viewer__modal"},e(u.a,{key:"Modal-dialog-json-view",scrollable:!1,modal:!0},r.length>1?e(p.a,{selectedOptionValue:this.state.selectedTab,key:"json-view-tab",options:r,onSelect:this.onTabSelect}):void 0,e("div",{class:"json-viewer__modal__view-content"},a.content),e("div",{class:"json-viewer__modal__footer"},e("button",{class:"jsonviewer__cancel-button",onclick:this.props.handleCancel},o.cancel))))},t.prototype.onTabSelect=function(e){this.setState({selectedTab:e})},t}(i.Component);t.default=d}})}));
//# sourceMappingURL=JsonViewerModal.js.map