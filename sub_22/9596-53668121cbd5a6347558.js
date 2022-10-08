/*! For license information please see 9596-53668121cbd5a6347558.js.LICENSE.txt */
"use strict";(self.webpackChunkafd_site=self.webpackChunkafd_site||[]).push([[9596,2838,1543,6468,1660,8209],{89596:function(t,n,e){e.r(n),e.d(n,{calcite_action:function(){return g}});var i=e(76685),o=e(1660),r=e(26468),a=e(72838),c=function(t,n,e,i){function o(t){return t instanceof e?t:new e((function(n){n(t)}))}return new(e||(e=Promise))((function(e,r){function a(t){try{l(i.next(t))}catch(t){r(t)}}function c(t){try{l(i.throw(t))}catch(t){r(t)}}function l(t){t.done?e(t.value):o(t.value).then(a,c)}l((i=i.apply(t,n||[])).next())}))},l=function(t,n){var e,i,o,r,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function c(t){return function(n){return l([t,n])}}function l(r){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,i=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==r[0]&&2!==r[0])){a=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){a.label=r[1];break}if(6===r[0]&&a.label<o[1]){a.label=o[1],o=r;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(r);break}o[2]&&a.ops.pop(),a.trys.pop();continue}r=n.call(t,a)}catch(t){r=[6,t],i=0}finally{e=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},u="button",s="button--text-visible",d="button--compact",f="icon-container",b="slot-container",m="slot-container--hidden",h="text-container",p="text-container--visible",v="Loading",g=function(){function t(t){var n=this;(0,i.r)(this,t),this.calciteActionClick=(0,i.c)(this,"calciteActionClick",7),this.active=!1,this.appearance="solid",this.compact=!1,this.disabled=!1,this.indicator=!1,this.intlLoading=v,this.loading=!1,this.scale="m",this.textEnabled=!1,this.mutationObserver=(0,o.c)("mutation",(function(){return(0,i.f)(n)})),this.calciteActionClickHandler=function(){n.disabled||n.calciteActionClick.emit()}}return t.prototype.connectedCallback=function(){var t;null===(t=this.mutationObserver)||void 0===t||t.observe(this.el,{childList:!0,subtree:!0})},t.prototype.disconnectedCallback=function(){var t;null===(t=this.mutationObserver)||void 0===t||t.disconnect()},t.prototype.componentDidRender=function(){(0,r.u)(this)},t.prototype.setFocus=function(){return c(this,void 0,void 0,(function(){return l(this,(function(t){return this.buttonEl.focus(),[2]}))}))},t.prototype.renderTextContainer=function(){var t,n=this.text,e=this.textEnabled,o=((t={})[h]=!0,t[p]=e,t);return n?(0,i.h)("div",{class:o,key:"text-container"},n):null},t.prototype.renderIconContainer=function(){var t,n,e=this,o=e.loading,r=e.icon,a=e.scale,c=e.el,l=e.intlLoading,u="l"===a?"m":"s",s="l"===a?"l":"m",d=o?(0,i.h)("calcite-loader",{active:!0,inline:!0,label:l,scale:s}):null,h=r?(0,i.h)("calcite-icon",{icon:r,scale:u}):null,p=d||h,v=p||(null===(n=c.children)||void 0===n?void 0:n.length),g=(0,i.h)("div",{class:(t={},t[b]=!0,t[m]=o,t)},(0,i.h)("slot",null));return v?(0,i.h)("div",{"aria-hidden":"true",class:f,key:"icon-container"},p,g):null},t.prototype.render=function(){var t,n=this,e=this,o=e.compact,r=e.disabled,c=e.loading,l=e.textEnabled,f=e.label,b=e.text,m=f||b,h=((t={})[u]=!0,t[s]=l,t[d]=o,t);return(0,i.h)(i.H,{onClick:this.calciteActionClickHandler},(0,i.h)("button",{"aria-busy":(0,a.t)(c),"aria-disabled":(0,a.t)(r),"aria-label":m,class:h,disabled:r,ref:function(t){return n.buttonEl=t}},this.renderIconContainer(),this.renderTextContainer()))},Object.defineProperty(t.prototype,"el",{get:function(){return(0,i.g)(this)},enumerable:!1,configurable:!0}),t}();g.style='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:host{-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{-webkit-box-sizing:border-box;box-sizing:border-box}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:-ms-flexbox;display:flex;background-color:transparent}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.button{position:relative;margin:0px;display:-ms-flexbox;display:flex;width:auto;cursor:pointer;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;border-style:none;background-color:var(--calcite-ui-foreground-1);fill:var(--calcite-ui-text-3);font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-3);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;text-align:unset;-ms-flex:1 0 auto;flex:1 0 auto}.button:hover{background-color:var(--calcite-ui-foreground-2);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1)}.button:focus{background-color:var(--calcite-ui-foreground-2);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1);outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.button:active{background-color:var(--calcite-ui-foreground-3)}.button .icon-container{pointer-events:none;margin:0px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;min-width:1rem;min-height:1rem}.button .text-container{margin:0px;width:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1rem;opacity:0;-webkit-transition-property:opacity;transition-property:opacity;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transition-property:margin;transition-property:margin;-webkit-transition-property:width;transition-property:width}.button .text-container--visible{width:auto;-ms-flex:1 1 auto;flex:1 1 auto;opacity:1}:host([scale=s]) .button{padding:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=s]) .button--text-visible .icon-container{-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([scale=m]) .button{padding:1rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=m]) .button--text-visible .icon-container{-webkit-margin-end:0.75rem;margin-inline-end:0.75rem}:host([scale=l]) .button{padding:1.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=l]) .button--text-visible .icon-container{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([alignment=center]) .button{-ms-flex-pack:center;justify-content:center}:host([alignment=end]) .button{-ms-flex-pack:end;justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{-ms-flex:0 1 auto;flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-left:0px;padding-right:0px}.slot-container{display:-ms-flexbox;display:flex}.slot-container--hidden{display:none}.button--text-visible{width:100%}:host([active]) .button,:host([active]) .button:hover,:host([active]) .button:focus,:host([active][loading]) .button{background-color:var(--calcite-ui-foreground-3);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1)}:host([active]) .button:active{background-color:var(--calcite-ui-foreground-1)}:host([appearance=clear]) .button{background-color:transparent;-webkit-transition-property:-webkit-box-shadow;transition-property:-webkit-box-shadow;transition-property:box-shadow;transition-property:box-shadow, -webkit-box-shadow;-webkit-transition-duration:150ms;transition-duration:150ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host([appearance=clear]) .button:hover,:host([appearance=clear]) .button:focus{background-color:transparent;-webkit-box-shadow:0 0 0 2px var(--calcite-ui-border-1) inset;box-shadow:0 0 0 2px var(--calcite-ui-border-1) inset}:host([active][appearance=clear]) .button,:host([active][appearance=clear]) .button:hover,:host([active][appearance=clear]) .button:focus{background-color:var(--calcite-ui-foreground-3);fill:var(--calcite-ui-text-1);color:var(--calcite-ui-text-1)}:host([appearance=clear][loading]) .button,:host([appearance=clear][disabled]) .button{background-color:transparent}:host([loading]) .button,:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-ui-foreground-1)}:host([loading]) .button .text-container,:host([loading]) .button:hover .text-container,:host([loading]) .button:focus .text-container{opacity:var(--calcite-ui-opacity-disabled)}:host([loading]) calcite-loader[inline]{margin-right:0px;color:var(--calcite-ui-text-3)}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;background-color:var(--calcite-ui-foreground-1);opacity:var(--calcite-ui-opacity-disabled)}:host([disabled][active]) .button,:host([disabled][active]) .button:hover,:host([disabled][active]) .button:focus{background-color:var(--calcite-ui-foreground-3);opacity:var(--calcite-ui-opacity-disabled)}:host([indicator]) .button::after{content:"";position:absolute;z-index:10;height:0.5rem;width:0.5rem;border-radius:9999px;border-width:2px;background-color:var(--calcite-ui-brand);border-color:var(--calcite-ui-foreground-1);inset-block-end:0.75rem;inset-inline-end:0.75rem}:host([indicator]) .button--text-visible::after{inset-block-end:auto}:host([indicator]) .button--text-visible .text-container--visible{-webkit-margin-end:1rem;margin-inline-end:1rem}:host([indicator]) .button:hover::after,:host([indicator]) .button:focus::after{border-color:var(--calcite-ui-foreground-1)}:host([indicator][scale=s]) .button::after{inset-block-end:0.25rem;inset-inline-end:0.25rem}:host([indicator][scale=s]) .button--text-visible::after{inset-block-end:auto;inset-inline-end:0.5rem}:host([indicator][active]) .button::after{border-color:var(--calcite-ui-foreground-3)}'},72838:function(t,n,e){e.r(n),e.d(n,{C:function(){return c},T:function(){return l},a:function(){return f},b:function(){return d},c:function(){return g},d:function(){return b},e:function(){return u},f:function(){return x},g:function(){return k},h:function(){return p},i:function(){return y},j:function(){return C},k:function(){return D},n:function(){return s},q:function(){return v},s:function(){return z},t:function(){return S}});var i=e(1543),o=function(t,n,e,i){function o(t){return t instanceof e?t:new e((function(n){n(t)}))}return new(e||(e=Promise))((function(e,r){function a(t){try{l(i.next(t))}catch(t){r(t)}}function c(t){try{l(i.throw(t))}catch(t){r(t)}}function l(t){t.done?e(t.value):o(t.value).then(a,c)}l((i=i.apply(t,n||[])).next())}))},r=function(t,n){var e,i,o,r,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function c(t){return function(n){return l([t,n])}}function l(r){if(e)throw new TypeError("Generator is already executing.");for(;a;)try{if(e=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return a.label++,{value:r[1],done:!1};case 5:a.label++,i=r[1],r=[0];continue;case 7:r=a.ops.pop(),a.trys.pop();continue;default:if(!(o=a.trys,(o=o.length>0&&o[o.length-1])||6!==r[0]&&2!==r[0])){a=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){a.label=r[1];break}if(6===r[0]&&a.label<o[1]){a.label=o[1],o=r;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(r);break}o[2]&&a.ops.pop(),a.trys.pop();continue}r=n.call(t,a)}catch(t){r=[6,t],i=0}finally{e=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},a=function(t,n,e){if(e||2===arguments.length)for(var i,o=0,r=n.length;o<r;o++)!i&&o in n||(i||(i=Array.prototype.slice.call(n,0,o)),i[o]=n[o]);return t.concat(i||Array.prototype.slice.call(n))},c={autoTheme:"calcite-theme-auto",darkTheme:"calcite-theme-dark",lightTheme:"calcite-theme-light",rtl:"calcite--rtl"},l={loading:"Loading"};function u(t){return t?t.id=t.id||"".concat(t.tagName.toLowerCase(),"-").concat((0,i.g)()):""}function s(t){return Array.isArray(t)?t:Array.from(t)}function d(t){var n=g(t,".".concat(c.darkTheme,", .").concat(c.lightTheme));return(null==n?void 0:n.classList.contains("calcite-theme-dark"))?"dark":"light"}function f(t){var n=g(t,"[".concat("dir","]"));return n?n.getAttribute("dir"):"ltr"}function b(t,n,e){var i="[".concat(n,"]"),o=t.closest(i);return o?o.getAttribute(n):e}function m(t){return t.getRootNode()}function h(t){return t.host||null}function p(t,n){return function t(e,i){if(!e)return i;e.assignedSlot&&(e=e.assignedSlot);var o=m(e),r=Array.from(o.querySelectorAll(n)).filter((function(t){return!i.includes(t)}));i=a(a([],i,!0),r,!0);var c=h(o);return c?t(c,i):i}(t,[])}function v(t,n){var e=n.selector,i=n.id;return function t(n){if(!n)return null;n.assignedSlot&&(n=n.assignedSlot);var o=m(n),r=i?"getElementById"in o?o.getElementById(i):null:e?o.querySelector(e):null,a=h(o);return r||(a?t(a):null)}(t)}function g(t,n){return function t(e){return e?e.closest(n)||t(h(m(e))):null}(t)}function y(t){return"function"==typeof(null==t?void 0:t.setFocus)}function x(t){return o(this,void 0,void 0,(function(){return r(this,(function(n){return t?[2,y(t)?t.setFocus():t.focus()]:[2]}))}))}var w=":not([slot])";function k(t,n,e){n&&!Array.isArray(n)&&"string"!=typeof n&&(e=n,n=null);var i=n?Array.isArray(n)?n.map((function(t){return'[slot="'.concat(t,'"]')})).join(","):'[slot="'.concat(n,'"]'):w;return(null==e?void 0:e.all)?function(t,n,e){var i=n===w?A(t,w):Array.from(t.querySelectorAll(n));i=e&&!1===e.direct?i:i.filter((function(n){return n.parentElement===t})),i=(null==e?void 0:e.matches)?i.filter((function(t){return null==t?void 0:t.matches(e.matches)})):i;var o=null==e?void 0:e.selector;return o?i.map((function(t){return Array.from(t.querySelectorAll(o))})).reduce((function(t,n){return a(a([],t,!0),n,!0)}),[]).filter((function(t){return!!t})):i}(t,i,e):function(t,n,e){var i=n===w?A(t,w)[0]||null:t.querySelector(n);i=e&&!1===e.direct||(null==i?void 0:i.parentElement)===t?i:null,i=(null==e?void 0:e.matches)?(null==i?void 0:i.matches(e.matches))?i:null:i;var o=null==e?void 0:e.selector;return o?null==i?void 0:i.querySelector(o):i}(t,i,e)}function A(t,n){return t?Array.from(t.children||[]).filter((function(t){return null==t?void 0:t.matches(n)})):[]}function D(t,n){return Array.from(t.children).filter((function(t){return t.matches(n)}))}function z(t,n,e){return"string"==typeof n&&""!==n?n:""===n?t[e]:void 0}function C(t,n){return!(n.left>t.right||n.right<t.left||n.top>t.bottom||n.bottom<t.top)}function S(t){return(!!t).toString()}},1543:function(t,n,e){e.r(n),e.d(n,{g:function(){return i}});var i=function(){return[2,1,1,1,3].map((function(t){for(var n="",e=0;e<t;e++)n+=(65536*(1+Math.random())|0).toString(16).substring(1);return n})).join("-")}},26468:function(t,n,e){function i(){}function o(t,n){if(void 0===n&&(n=!1),t.disabled)return t.el.setAttribute("tabindex","-1"),t.el.setAttribute("aria-disabled","true"),t.el.contains(document.activeElement)&&document.activeElement.blur(),void(t.el.click=i);t.el.click=HTMLElement.prototype.click,"function"==typeof n?t.el.setAttribute("tabindex",n.call(t)?"0":"-1"):!0===n?t.el.setAttribute("tabindex","0"):!1===n&&t.el.removeAttribute("tabindex"),t.el.removeAttribute("aria-disabled")}e.r(n),e.d(n,{u:function(){return o}})},1660:function(t,n,e){function i(t,n,e){var i=function(t){return"intersection"===t?window.IntersectionObserver:"mutation"===t?window.MutationObserver:window.ResizeObserver}(t);return new i(n,e)}e.r(n),e.d(n,{c:function(){return i}})}}]);