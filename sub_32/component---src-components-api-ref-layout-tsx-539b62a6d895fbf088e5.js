"use strict";(self.webpackChunkarcgis_js_sdk_4=self.webpackChunkarcgis_js_sdk_4||[]).push([[1352],{15050:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var s=n(67294),o=n(58363),r=n(10082),a=n(33471);function i(){}function l(e,t){return new RegExp("(\\s|^)"+t+"(\\s|$)").test(e.getAttribute("class"))}function h(e,t){t.split(" ").forEach((function(t){if(!l(e,t)){var n=e.getAttribute("class")||"";e.setAttribute("class",n+" "+t)}}))}function d(e,t){t.split(" ").forEach((function(t){var n=(e.getAttribute("class")||"").replace(new RegExp("(\\s|^)"+t+"(\\s|$)","g"),"$2");l(e,t)&&e.setAttribute("class",n)}))}i.prototype={on:function(e,t,n){var s=this.e||(this.e={});return(s[e]||(s[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var s=this;function o(){s.off(e,o),t.apply(n,arguments)}return o._=t,this.on(e,o,n)},emit:function(e){for(var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),s=0,o=n.length;s<o;s++)n[s].fn.apply(n[s].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),s=n[e],o=[];if(s&&t)for(var r=0,a=s.length;r<a;r++)s[r].fn!==t&&s[r].fn._!==t&&o.push(s[r]);return o.length?n[e]=o:delete n[e],this}};const c={addEvent:function(e,t,n){return e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):void 0},bus:new i,removeEvent:function(e,t,n){return e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on"+t,n):void 0},eventTarget:function(e){return e.target||e.srcElement},findElements:function(e,t){var n,s=(t||document).querySelectorAll(e);return n=s,Array.isArray(n)?n:Array.prototype.slice.call(n)},hasClass:l,addClass:h,removeClass:d,toggleClass:function(e,t){l(e,t)?d(e,t):h(e,t)}};const f=()=>{!function(){const e=["show","hide"].map((e=>["property","method","event"].map((t=>`.js-${e}-inherited-${t}`)))).map((e=>e.join(", "))).join(", "),t=".js-inherited-property",n=".js-inherited-method",s=".js-inherited-event",o="inherited-property-hide",r="inherited-method-hide",a="inherited-event-hide",i=c.findElements(e),l=c.findElements(".js-show-inherited-property, .js-hide-inherited-property"),h=c.findElements(".js-show-inherited-method, .js-hide-inherited-method"),d=c.findElements(".js-show-inherited-event, .js-hide-inherited-event"),f=c.findElements(".js-show-inherited-property")[0],v=c.findElements(".js-hide-inherited-property")[0],m=c.findElements(".js-show-inherited-method")[0],p=c.findElements(".js-hide-inherited-method")[0],u=c.findElements(".js-show-inherited-event")[0],y=c.findElements(".js-hide-inherited-event")[0],E=c.findElements(t),g=c.findElements(n),w=c.findElements(s),C=!!E&&E.length>1,I=!!g&&g.length>1,b=!!w&&w.length>1,S=c.findElements(".table-events thead")[0],j=c.findElements("#event-details")[0];let P={showInheritedProperty:!0,showInheritedMethod:!0,showInheritedEvent:!0};function T(e,o){let r="properties",a=t.replace(".","");"method"===o?(r="methods",a=n.replace(".","")):"event"===o&&(r="events",a=s.replace(".",""));const i=c.findElements(`.table-${r} tr`).filter((t=>{let n=!1;return t.style.cssText="",e?n=!0:e||(n=!c.hasClass(t,a)),n}));if(null!==i){let e=0;for(let t=1;t<i.length;t++){e+=1;const n=e%2==0?"#f8f8f8":"#FFFFFF";i[t].style.cssText=`background-color: ${n}`}}}function A(){localStorage&&!Object.prototype.hasOwnProperty.call(localStorage,"showInheritedProperty")&&(localStorage.showInheritedProperty=!0),localStorage&&!Object.prototype.hasOwnProperty.call(localStorage,"showInheritedMethod")&&(localStorage.showInheritedMethod=!0),localStorage&&!Object.prototype.hasOwnProperty.call(localStorage,"showInheritedEvent")&&(localStorage.showInheritedEvent=!0),localStorage&&(P={showInheritedProperty:JSON.parse(localStorage.showInheritedProperty),showInheritedMethod:JSON.parse(localStorage.showInheritedMethod),showInheritedEvent:JSON.parse(localStorage.showInheritedEvent)})}i&&(c.bus.on("show-hide-inherited-item-change",(function(e){function i(){if(S&&j){const e=c.findElements(".table-events tbody .inherited-event-hide").length,t=c.findElements("div.inherited-event-hide").length;e===t&&e>0?(c.addClass(S,"visually-hidden"),c.addClass(j,"visually-hidden")):c.hasClass(S,"visually-hidden")&&e===t&&0===e&&(c.removeClass(S,"visually-hidden"),c.removeClass(j,"visually-hidden"))}}function l(){const i=e.dataInherited;if("property"!==i||P.showInheritedProperty)if("method"!==i||P.showInheritedMethod){if("event"===i&&!P.showInheritedEvent){c.removeClass(S,"visually-hidden"),c.removeClass(j,"visually-hidden"),c.addClass(u,a),c.removeClass(y,a);const e=c.findElements(s);for(const t of e)c.removeClass(t,a)}}else{c.addClass(m,r),c.removeClass(p,r);const e=c.findElements(n);for(const t of e)c.removeClass(t,r)}else{c.removeClass(v,o),c.addClass(f,o);const e=c.findElements(t);for(const t of e)c.removeClass(t,o)}}"click"===e.eventType?(C&&"property"===e.dataInherited&&E&&(E.forEach((e=>{c.hasClass(e,o)?c.removeClass(e,o):(c.addClass(e,o),e.style.cssText="")})),T(P.showInheritedProperty,"property")),I&&"method"===e.dataInherited&&g&&(g.forEach((e=>{c.hasClass(e,r)?c.removeClass(e,r):(c.addClass(e,r),e.style.cssText="")})),T(P.showInheritedMethod,"method")),b&&"event"===e.dataInherited&&w&&(w.forEach((e=>{c.hasClass(e,a)?c.removeClass(e,a):(c.addClass(e,a),e.style.cssText="")})),i(),T(P.showInheritedEvent,"event"))):"hash"===e.eventType||"search"===e.eventType?l():"initialize"===e.eventType&&(C&&E&&(P.showInheritedProperty?(E.forEach((e=>{c.hasClass(e,o)&&c.removeClass(e,o)})),c.addClass(f,o),c.removeClass(v,o)):(E.forEach((e=>{c.hasClass(e,o)||c.addClass(e,o)})),c.removeClass(f,o),c.addClass(v,o)),T(P.showInheritedProperty,"property")),I&&g&&(P.showInheritedMethod?(g.forEach((e=>{c.hasClass(e,r)&&c.removeClass(e,r)})),c.addClass(m,r),c.removeClass(p,r)):(g.forEach((e=>{c.hasClass(e,r)||c.addClass(e,r)})),c.removeClass(m,r),c.addClass(p,r)),T(P.showInheritedMethod,"method")),b&&w&&(P.showInheritedEvent?(w.forEach((e=>{c.hasClass(e,a)&&c.removeClass(e,a)})),c.addClass(u,a),c.removeClass(y,a)):(w.forEach((e=>{c.hasClass(e,a)||c.addClass(e,a)})),c.removeClass(u,a),c.addClass(y,a)),i(),T(P.showInheritedEvent,"event")))})),A(),i.forEach((e=>{c.addEvent(e,"click",(e=>{const t=c.eventTarget(e),n=t.getAttribute("data-action")?t.getAttribute("data-action").split(":"):["show",""],s=n[0],o=n[1],r="show"===s,a=`inherited-${o}-hide`;"property"===o?(localStorage.showInheritedProperty=r,l.forEach((e=>{c.toggleClass(e,a)}))):"method"===o?(localStorage.showInheritedMethod=r,h.forEach((e=>{c.toggleClass(e,a)}))):"event"===o&&(localStorage.showInheritedEvent=r,d.forEach((e=>{c.toggleClass(e,a)}))),A();const i={data:t,eventType:"click",dataInherited:o,action:s};c.bus.emit("show-hide-inherited-item-change",i)}))}))),c.bus.emit("show-hide-inherited-item-change",{eventType:"initialize",dataInherited:"",action:"show"})}(),function(){const e=document.location.hash,t=!/#(constructors|properties|methods|events|typedefinitions)-summary/.test(e);if(e&&t){const t=/\.?inherited-(property|method|event)-hide/im,n=/(property|method|event)/im,s=e.replace("#",".").replace("event:",""),o=c.findElements(s);if(Array.isArray(o)&&o.length>0)for(const e of o)if(t.test(e.className)){const t=e.className.match(n)[0];c.bus.emit("show-hide-inherited-item-change",{eventType:"hash",dataInherited:t,action:"show"})}}}()};function v(e){let t;for(t=e;t;t=t.parentNode){let e=!1;if(e=/calcite-accordion-item/i.test(t.tagName),1===t.nodeType&&e)break}return t}const m=()=>{!function(e){const t=e.replace(/#/g,"");if(""!==t&&"IntersectionObserver"in window){const e=new IntersectionObserver(((e,n)=>{e.forEach(((s,o)=>{const r=s.target.querySelector(`a[name=${t}]`);r&&(v(r).active=!0,setTimeout((()=>{r.scrollIntoView({behavior:"auto",block:"center",inline:"nearest"}),n.disconnect()}),2e3));const a=s.target.querySelector(`a[id=${t}]`);a&&(v(a).active=!0,setTimeout((()=>{a.scrollIntoView({behavior:"auto",block:"center",inline:"nearest"}),n.disconnect()}),2e3)),e.length-1===o&&n.disconnect()}))}));document.querySelectorAll("calcite-accordion").forEach((t=>{e.observe(t)}))}}(document.location.hash)};var p=n(89866),u=e=>{const{nav:t,search:n}=(0,p.R)(),i=`<div class="afd-flow-content">${e.data.apiRefPage.html}</div>`;return(0,s.useEffect)((()=>{f(),m()}),[]),s.createElement(a.Z,null,s.createElement(r.HJ,{title:e.data.apiRefPage.title,titleSegments:["API Reference"],category:"help-api-ref",contentType:"API Reference"}),s.createElement(o.eK,{toc:e.data.apiRefPage.toc,title:e.data.apiRefPage.title,html:i,navigation:t,search:n,renderCollapsedNavigationItems:!1}))}},89866:function(e,t,n){n.d(t,{R:function(){return o}});var s=n(25444);const o=()=>(0,s.useStaticQuery)("781661003")},33471:function(e,t,n){var s=n(67294),o=n(58363),r=n(10082),a=n(25444);t.Z=e=>{let{children:t}=e;const n=(0,a.useStaticQuery)("3481912554").file.childRawYaml.raw.navigation;return s.createElement(o.Ar,null,s.createElement(r.aJ,n),t)}}}]);