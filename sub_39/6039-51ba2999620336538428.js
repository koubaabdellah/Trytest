/*! For license information please see 6039-51ba2999620336538428.js.LICENSE.txt */
"use strict";(self.webpackChunkarcgis_js_sdk_4=self.webpackChunkarcgis_js_sdk_4||[]).push([[6039],{96039:function(t,i,e){e.r(i),e.d(i,{calcite_modal:function(){return L}});var a=e(46900),n=e(60166),o=e(86677),r=e(56496),l=function(t,i,e,a){function n(t){return t instanceof e?t:new e((function(i){i(t)}))}return new(e||(e=Promise))((function(e,o){function r(t){try{s(a.next(t))}catch(t){o(t)}}function l(t){try{s(a.throw(t))}catch(t){o(t)}}function s(t){t.done?e(t.value):n(t.value).then(r,l)}s((a=a.apply(t,i||[])).next())}))},s=function(t,i){var e,a,n,o,r={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return o={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function l(t){return function(i){return s([t,i])}}function s(o){if(e)throw new TypeError("Generator is already executing.");for(;r;)try{if(e=1,a&&(n=2&o[0]?a.return:o[0]?a.throw||((n=a.return)&&n.call(a),0):a.next)&&!(n=n.call(a,o[1])).done)return n;switch(a=0,n&&(o=[2&o[0],n.value]),o[0]){case 0:case 1:n=o;break;case 4:return r.label++,{value:o[1],done:!1};case 5:r.label++,a=o[1],o=[0];continue;case 7:o=r.ops.pop(),r.trys.pop();continue;default:if(!(n=r.trys,(n=n.length>0&&n[n.length-1])||6!==o[0]&&2!==o[0])){r=0;continue}if(3===o[0]&&(!n||o[1]>n[0]&&o[1]<n[3])){r.label=o[1];break}if(6===o[0]&&r.label<n[1]){r.label=n[1],n=o;break}if(n&&r.label<n[2]){r.label=n[2],r.ops.push(o);break}n[2]&&r.ops.pop(),r.trys.pop();continue}o=i.call(t,r)}catch(t){o=[6,t],a=0}finally{e=n=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}};function c(t,i,e,a,n){void 0===a&&(a=20),void 0===n&&(n=0);var o=[];if(n>=a)return o;for(var r=function(t){var o=t.assignedNodes().filter((function(t){return 1===t.nodeType}));return o.length>0?c(o[0].parentElement,i,e,a,n+1):[]},l=0,s=Array.from(t.children||[]);l<s.length;l++){var d=s[l];i(d)||(e(d)&&o.push(d),null!=d.shadowRoot?o.push.apply(o,c(d.shadowRoot,i,e,a,n+1)):"SLOT"===d.tagName?o.push.apply(o,r(d)):o.push.apply(o,c(d,i,e,a,n+1)))}return o}function d(t){return t.hasAttribute("hidden")||t.hasAttribute("aria-hidden")&&"false"!==t.getAttribute("aria-hidden")||"none"===t.style.display||"0"===t.style.opacity||"hidden"===t.style.visibility||"collapse"===t.style.visibility}var m="title",u="header",h="footer",b="scrim",f="back",p="close",x="secondary",v="primary",w="overflow-hidden",g="x",y="content",k="header",z="back",C="secondary",E="primary",D="Close",O=function(t){return(0,n.i)(t)||function(t){return"-1"!==t.getAttribute("tabindex")&&!d(t)&&!function(t){return t.hasAttribute("disabled")||t.hasAttribute("aria-disabled")&&"false"!==t.getAttribute("aria-disabled")}(t)&&(t.hasAttribute("tabindex")||(t instanceof HTMLAnchorElement||t instanceof HTMLAreaElement)&&t.hasAttribute("href")||t instanceof HTMLButtonElement||t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement||t instanceof HTMLIFrameElement)}(t)},F=function(t){return c(t,d,O)},L=function(){function t(t){var i=this;(0,a.r)(this,t),this.calciteModalOpen=(0,a.c)(this,"calciteModalOpen",7),this.calciteModalClose=(0,a.c)(this,"calciteModalClose",7),this.active=!1,this.beforeClose=function(){return Promise.resolve()},this.disableCloseButton=!1,this.disableOutsideClose=!1,this.intlClose=D,this.disableEscape=!1,this.scale="m",this.width="m",this.backgroundColor="white",this.noPadding=!1,this.hasFooter=!0,this.mutationObserver=(0,o.c)("mutation",(function(){return i.updateFooterVisibility()})),this.activeTransitionProp="opacity",this.transitionEnd=function(t){t.propertyName===i.activeTransitionProp&&(i.active?i.calciteModalOpen.emit():i.calciteModalClose.emit())},this.openEnd=function(){i.setFocus(),i.el.removeEventListener("calciteModalOpen",i.openEnd)},this.handleOutsideClose=function(){i.disableOutsideClose||i.close()},this.close=function(){return i.beforeClose(i.el).then((function(){i.active=!1,(0,n.f)(i.previousActiveElement),i.removeOverflowHiddenClass()}))},this.focusFirstElement=function(){(0,n.f)(i.disableCloseButton?F(i.el)[0]:i.closeButtonEl)},this.focusLastElement=function(){var t=F(i.el).filter((function(t){return!t.getAttribute("data-focus-fence")}));t.length>0?(0,n.f)(t[t.length-1]):(0,n.f)(i.closeButtonEl)},this.updateFooterVisibility=function(){i.hasFooter=!!(0,n.g)(i.el,[z,E,C])}}return t.prototype.componentWillLoad=function(){this.active&&this.open()},t.prototype.connectedCallback=function(){var t;null===(t=this.mutationObserver)||void 0===t||t.observe(this.el,{childList:!0,subtree:!0}),this.updateFooterVisibility(),(0,r.c)(this)},t.prototype.disconnectedCallback=function(){var t;this.removeOverflowHiddenClass(),null===(t=this.mutationObserver)||void 0===t||t.disconnect(),(0,r.d)(this)},t.prototype.render=function(){var t=this;return(0,a.h)(a.H,{"aria-describedby":this.contentId,"aria-labelledby":this.titleId,"aria-modal":"true",role:"dialog"},(0,a.h)("calcite-scrim",{class:b,onClick:this.handleOutsideClose}),this.renderStyle(),(0,a.h)("div",{class:"modal",onTransitionEnd:this.transitionEnd},(0,a.h)("div",{"data-focus-fence":!0,onFocus:this.focusLastElement,tabindex:"0"}),(0,a.h)("div",{class:u},this.renderCloseButton(),(0,a.h)("header",{class:m},(0,a.h)("slot",{name:u}))),(0,a.h)("div",{class:{content:!0,"content--spaced":!this.noPadding,"content--no-footer":!this.hasFooter},ref:function(i){return t.modalContent=i}},(0,a.h)("slot",{name:y})),this.renderFooter(),(0,a.h)("div",{"data-focus-fence":!0,onFocus:this.focusFirstElement,tabindex:"0"})))},t.prototype.renderFooter=function(){return this.hasFooter?(0,a.h)("div",{class:h,key:"footer"},(0,a.h)("span",{class:f},(0,a.h)("slot",{name:z})),(0,a.h)("span",{class:x},(0,a.h)("slot",{name:C})),(0,a.h)("span",{class:v},(0,a.h)("slot",{name:E}))):null},t.prototype.renderCloseButton=function(){var t=this;return this.disableCloseButton?null:(0,a.h)("button",{"aria-label":this.intlClose,class:p,key:"button",onClick:this.close,ref:function(i){return t.closeButtonEl=i},title:this.intlClose},(0,a.h)("calcite-icon",{icon:g,scale:"s"===this.scale?"s":"m"===this.scale?"m":"l"===this.scale?"l":null}))},t.prototype.renderStyle=function(){return!isNaN(parseInt("".concat(this.width)))?(0,a.h)("style",null,"\n        .modal {\n          max-width: ".concat(this.width,"px !important;\n        }\n        @media screen and (max-width: ").concat(this.width,"px) {\n          .modal {\n            height: 100% !important;\n            max-height: 100% !important;\n            width: 100% !important;\n            max-width: 100% !important;\n            margin: 0 !important;\n            border-radius: 0 !important;\n          }\n          .content {\n            flex: 1 1 auto !important;\n            max-height: unset !important;\n          }\n        }\n      ")):null},t.prototype.handleEscape=function(t){this.active&&!this.disableEscape&&"Escape"===t.key&&this.close()},t.prototype.focusElement=function(t){return l(this,void 0,void 0,(function(){return s(this,(function(i){return t&&t.focus(),[2,this.setFocus()]}))}))},t.prototype.setFocus=function(t){return l(this,void 0,void 0,(function(){var i;return s(this,(function(e){return i=this.closeButtonEl,[2,(0,n.f)("close-button"===t?i:F(this.el)[0]||i)]}))}))},t.prototype.scrollContent=function(t,i){return void 0===t&&(t=0),void 0===i&&(i=0),l(this,void 0,void 0,(function(){return s(this,(function(e){return this.modalContent&&(this.modalContent.scrollTo?this.modalContent.scrollTo({top:t,left:i,behavior:"smooth"}):(this.modalContent.scrollTop=t,this.modalContent.scrollLeft=i)),[2]}))}))},t.prototype.toggleModal=function(t,i){return l(this,void 0,void 0,(function(){return s(this,(function(e){return t!==i&&(t?this.open():t||this.close()),[2]}))}))},t.prototype.open=function(){this.previousActiveElement=document.activeElement,this.el.addEventListener("calciteModalOpen",this.openEnd),this.active=!0;var t=(0,n.g)(this.el,k),i=(0,n.g)(this.el,y);this.titleId=(0,n.e)(t),this.contentId=(0,n.e)(i),document.documentElement.classList.add(w)},t.prototype.removeOverflowHiddenClass=function(){document.documentElement.classList.remove(w)},Object.defineProperty(t.prototype,"el",{get:function(){return(0,a.g)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{active:["toggleModal"]}},enumerable:!1,configurable:!0}),t}();L.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:fixed;top:0px;right:0px;bottom:0px;left:0px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;overflow-y:hidden;color:var(--calcite-ui-text-2);opacity:0;visibility:hidden !important;-webkit-transition:visibility 0ms linear 300ms, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:visibility 0ms linear 300ms, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);z-index:101}:host([scale=s]){--calcite-modal-padding:0.75rem;--calcite-modal-padding-large:1rem;--calcite-modal-title-text:var(--calcite-font-size-1);--calcite-modal-content-text:var(--calcite-font-size--1)}:host([scale=m]){--calcite-modal-padding:1rem;--calcite-modal-padding-large:1.25rem;--calcite-modal-title-text:var(--calcite-font-size-2);--calcite-modal-content-text:var(--calcite-font-size-0)}:host([scale=l]){--calcite-modal-padding:1.25rem;--calcite-modal-padding-large:1.5rem;--calcite-modal-title-text:var(--calcite-font-size-3);--calcite-modal-content-text:var(--calcite-font-size-1)}.scrim{--calcite-scrim-background:rgba(0, 0, 0, 0.75);position:fixed;top:0px;right:0px;bottom:0px;left:0px;display:-ms-flexbox;display:flex;overflow-y:hidden}.modal{pointer-events:none;float:none;margin:1.5rem;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;width:100%;-ms-flex-direction:column;flex-direction:column;overflow:hidden;border-radius:0.25rem;background-color:var(--calcite-ui-foreground-1);opacity:0;--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);z-index:102;-webkit-overflow-scrolling:touch;visibility:hidden;-webkit-transition:visibility 0ms linear 300ms, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:visibility 0ms linear 300ms, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear 300ms, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear 300ms, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);-webkit-transform:translate3d(0, 20px, 0);transform:translate3d(0, 20px, 0)}:host([active]){opacity:1;visibility:visible !important;-webkit-transition-delay:0ms;transition-delay:0ms}:host([active]) .modal{pointer-events:auto;visibility:visible;opacity:1;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-webkit-transition:visibility 0ms linear, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:visibility 0ms linear, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-width var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-height var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), -webkit-transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);-webkit-transition-delay:0ms;transition-delay:0ms}.header{display:-ms-flexbox;display:flex;min-width:0px;max-width:100%;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem;border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);background-color:var(--calcite-ui-foreground-1);-ms-flex:0 0 auto;flex:0 0 auto;z-index:2}.close{-ms-flex-order:2;order:2;margin:0px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-style:none;background-color:transparent;color:var(--calcite-ui-text-3);outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:var(--calcite-animation-timing);transition-duration:var(--calcite-animation-timing);-webkit-transition-timing-function:ease-in-out;transition-timing-function:ease-in-out;-webkit-transition-delay:0s;transition-delay:0s;border-start-end-radius:0.25rem;padding:var(--calcite-modal-padding);-ms-flex:0 0 auto;flex:0 0 auto}.close calcite-icon{pointer-events:none;vertical-align:-2px}.close:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.close:hover,.close:focus,.close:active{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.title{-ms-flex-order:1;order:1;display:-ms-flexbox;display:flex;min-width:0px;-ms-flex-align:center;align-items:center;-ms-flex:1 1 auto;flex:1 1 auto;padding:var(--calcite-modal-padding) var(--calcite-modal-padding-large)}slot[name=header]::slotted(*),*::slotted([slot=header]){margin:0px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-1);font-size:var(--calcite-modal-title-text)}.content{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:100%;overflow:auto;background-color:var(--calcite-ui-foreground-1);padding:0px;max-height:calc(100vh - 12rem);z-index:1}.content--spaced{padding:var(--calcite-modal-padding) var(--calcite-modal-padding-large)}.content--no-footer{border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem}slot[name=content]::slotted(*),*::slotted([slot=content]){font-size:var(--calcite-modal-content-text)}:host([background-color=grey]) .content{background-color:var(--calcite-ui-background)}.footer{margin-top:auto;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;width:100%;-ms-flex-pack:justify;justify-content:space-between;border-bottom-right-radius:0.25rem;border-bottom-left-radius:0.25rem;border-width:0px;border-top-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);background-color:var(--calcite-ui-foreground-1);-ms-flex:0 0 auto;flex:0 0 auto;padding:var(--calcite-modal-padding) var(--calcite-modal-padding-large);z-index:2}.footer--hide-back .back,.footer--hide-secondary .secondary{display:none}.back{display:block;-webkit-margin-end:auto;margin-inline-end:auto}.secondary{margin-left:0.25rem;margin-right:0.25rem;display:block}slot[name=primary]{display:block}:host([width=small]) .modal{width:auto}:host([width=s]) .modal{max-width:32rem}@media screen and (max-width: 35rem){:host([width=s]) .modal{margin:0px;height:100%;max-height:100%;width:100%;max-width:100%;border-radius:0px}:host([width=s]) .content{-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}:host([width=s][docked]){-ms-flex-align:end;align-items:flex-end}}:host([width=m]) .modal{max-width:48rem}@media screen and (max-width: 51rem){:host([width=m]) .modal{margin:0px;height:100%;max-height:100%;width:100%;max-width:100%;border-radius:0px}:host([width=m]) .content{-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}:host([width=m][docked]){-ms-flex-align:end;align-items:flex-end}}:host([width=l]) .modal{max-width:94rem}@media screen and (max-width: 97rem){:host([width=l]) .modal{margin:0px;height:100%;max-height:100%;width:100%;max-width:100%;border-radius:0px}:host([width=l]) .content{-ms-flex:1 1 auto;flex:1 1 auto;max-height:unset}:host([width=l][docked]){-ms-flex-align:end;align-items:flex-end}}:host([fullscreen]){background-color:transparent}:host([fullscreen]) .modal{margin:0px;height:100%;max-height:100%;width:100%;max-width:100%;-webkit-transform:translate3D(0, 20px, 0) scale(0.95);transform:translate3D(0, 20px, 0) scale(0.95)}:host([fullscreen]) .content{max-height:100%;-ms-flex:1 1 auto;flex:1 1 auto}:host([active][fullscreen]) .modal{-webkit-transform:translate3D(0, 0, 0) scale(1);transform:translate3D(0, 0, 0) scale(1)}:host([active][fullscreen]) .header{border-radius:0}:host([active][fullscreen]) .footer{border-radius:0}:host([docked]) .modal{height:auto}:host([docked]) .content{height:auto;-ms-flex:1 1 auto;flex:1 1 auto}@media screen and (max-width: 860px){:host([docked]) .modal{border-radius:var(--calcite-border-radius) var(--calcite-border-radius) 0 0}:host([docked]) .close{border-start-end-radius:var(--calcite-border-radius)}}:host([color=red]) .modal{border-color:var(--calcite-ui-danger)}:host([color=blue]) .modal{border-color:var(--calcite-ui-info)}:host([color=red]) .modal,:host([color=blue]) .modal{border-width:0px;border-top-width:4px;border-style:solid}:host([color=red]) .header,:host([color=blue]) .header{border-radius:0.25rem;border-bottom-right-radius:0px;border-bottom-left-radius:0px}@media screen and (max-width: 860px){slot[name=header]::slotted(*),*::slotted([slot=header]){font-size:var(--calcite-font-size-1)}.footer{position:-webkit-sticky;position:sticky;bottom:0px}}@media screen and (max-width: 480px){.footer{-ms-flex-direction:column;flex-direction:column}.back,.secondary{margin:0px;margin-bottom:0.25rem}}"}}]);