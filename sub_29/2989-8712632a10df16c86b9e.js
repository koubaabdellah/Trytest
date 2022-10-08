"use strict";(self.webpackChunkopen_source_and_third_party_doc=self.webpackChunkopen_source_and_third_party_doc||[]).push([[2989],{2989:function(t,n,i){i.r(n),i.d(n,{calcite_icon:function(){return h}});var e=i(46900),a=i(60166),r=i(86677),o=function(t,n,i,e){function a(t){return t instanceof i?t:new i((function(n){n(t)}))}return new(i||(i=Promise))((function(i,r){function o(t){try{s(e.next(t))}catch(t){r(t)}}function c(t){try{s(e.throw(t))}catch(t){r(t)}}function s(t){t.done?i(t.value):a(t.value).then(o,c)}s((e=e.apply(t,n||[])).next())}))},c=function(t,n){var i,e,a,r,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return r={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function c(t){return function(n){return s([t,n])}}function s(r){if(i)throw new TypeError("Generator is already executing.");for(;o;)try{if(i=1,e&&(a=2&r[0]?e.return:r[0]?e.throw||((a=e.return)&&a.call(e),0):e.next)&&!(a=a.call(e,r[1])).done)return a;switch(e=0,a&&(r=[2&r[0],a.value]),r[0]){case 0:case 1:a=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,e=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!(a=o.trys,(a=a.length>0&&a[a.length-1])||6!==r[0]&&2!==r[0])){o=0;continue}if(3===r[0]&&(!a||r[1]>a[0]&&r[1]<a[3])){o.label=r[1];break}if(6===r[0]&&o.label<a[1]){o.label=a[1],a=r;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(r);break}a[2]&&o.ops.pop(),o.trys.pop();continue}r=n.call(t,o)}catch(t){r=[6,t],e=0}finally{i=a=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},s="flip-rtl",l={},u={},f={s:16,m:24,l:32};function m(t){var n=t.icon,i=t.scale;return o(this,void 0,void 0,(function(){var t,a,r,o,s,m;return c(this,(function(c){switch(c.label){case 0:return t=f[i],a=function(t){var n=!isNaN(Number(t.charAt(0))),i=t.split("-");if(1===i.length)return n?"i".concat(t):t;return i.map((function(t,i){return 0===i?n?"i".concat(t.toUpperCase()):t:t.charAt(0).toUpperCase()+t.slice(1)})).join("")}(n),r="F"===a.charAt(a.length-1),o=r?a.substring(0,a.length-1):a,s="".concat(o).concat(t).concat(r?"F":""),l[s]?[2,l[s]]:(u[s]||(u[s]=fetch((0,e.a)("./assets/icon/".concat(s,".json"))).then((function(t){return t.json()})).catch((function(){return console.error('"'.concat(s,'" is not a valid calcite-ui-icon name')),""}))),[4,u[s]]);case 1:return m=c.sent(),l[s]=m,[2,m]}}))}))}var h=function(){function t(t){(0,e.r)(this,t),this.icon=null,this.flipRtl=!1,this.scale="m",this.visible=!1}return t.prototype.connectedCallback=function(){var t=this;this.waitUntilVisible((function(){t.visible=!0,t.loadIconPathData()}))},t.prototype.disconnectedCallback=function(){var t;null===(t=this.intersectionObserver)||void 0===t||t.disconnect(),this.intersectionObserver=null},t.prototype.componentWillLoad=function(){return o(this,void 0,void 0,(function(){return c(this,(function(t){return this.loadIconPathData(),[2]}))}))},t.prototype.render=function(){var t,n=this,i=n.el,r=n.flipRtl,o=n.pathData,c=n.scale,l=n.textLabel,u=(0,a.a)(i),m=f[c],h=!!l,p=[].concat(o||"");return(0,e.h)(e.H,{"aria-hidden":(0,a.t)(!h),"aria-label":h?l:null,role:h?"img":null},(0,e.h)("svg",{class:(t={},t[s]="rtl"===u&&r,t.svg=!0,t),fill:"currentColor",height:"100%",viewBox:"0 0 ".concat(m," ").concat(m),width:"100%",xmlns:"http://www.w3.org/2000/svg"},p.map((function(t){return"string"==typeof t?(0,e.h)("path",{d:t}):(0,e.h)("path",{d:t.d,opacity:"opacity"in t?t.opacity:1})}))))},t.prototype.loadIconPathData=function(){return o(this,void 0,void 0,(function(){var t,n,i,e,a;return c(this,(function(r){switch(r.label){case 0:return n=(t=this).icon,i=t.scale,e=t.visible,n&&e?(a=this,[4,m({icon:n,scale:i})]):[2];case 1:return a.pathData=r.sent(),[2]}}))}))},t.prototype.waitUntilVisible=function(t){var n=this;this.intersectionObserver=(0,r.c)("intersection",(function(i){i.forEach((function(i){i.isIntersecting&&(n.intersectionObserver.disconnect(),n.intersectionObserver=null,t())}))}),{rootMargin:"50px"}),this.intersectionObserver?this.intersectionObserver.observe(this.el):t()},Object.defineProperty(t,"assetsDirs",{get:function(){return["assets"]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"el",{get:function(){return(0,e.g)(this)},enumerable:!1,configurable:!0}),Object.defineProperty(t,"watchers",{get:function(){return{icon:["loadIconPathData"],scale:["loadIconPathData"]}},enumerable:!1,configurable:!0}),t}();h.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:-ms-inline-flexbox;display:inline-flex;color:var(--calcite-ui-icon-color)}:host([scale=s]){height:1rem;width:1rem;min-width:1rem;min-height:1rem}:host([scale=m]){height:1.5rem;width:1.5rem;min-width:1.5rem;min-height:1.5rem}:host([scale=l]){height:2rem;width:2rem;min-width:2rem;min-height:2rem}.flip-rtl{-webkit-transform:scaleX(-1);transform:scaleX(-1)}.svg{display:block}"}}]);