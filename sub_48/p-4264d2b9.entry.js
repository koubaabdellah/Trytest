/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-next.468
 */
import{r as t,h as a,H as e,g as i}from"./p-0c89f05f.js";import{g as n}from"./p-f1e06d56.js";import{a as o,u as r,c as s,C as c}from"./p-980fa1a3.js";import{q as l,t as m}from"./p-102b243d.js";const p=new class{constructor(){this.registeredElements=new WeakMap,this.hoverTimeouts=new WeakMap,this.registeredElementCount=0,this.queryTooltip=t=>{const{registeredElements:a}=this,e=t.find((t=>a.has(t)));return a.get(e)},this.keyDownHandler=t=>{if("Escape"===t.key){const{activeTooltipEl:t}=this;t&&(this.clearHoverTimeout(t),this.toggleTooltip(t,!1))}},this.mouseEnterShow=t=>{this.hoverEvent(t,!0)},this.mouseLeaveHide=t=>{this.hoverEvent(t,!1)},this.clickHandler=t=>{this.clickedTooltip=this.queryTooltip(t.composedPath())},this.focusShow=t=>{this.focusEvent(t,!0)},this.blurHide=t=>{this.focusEvent(t,!1)},this.hoverToggle=(t,a)=>{const{hoverTimeouts:e}=this;e.delete(t),a&&this.closeExistingTooltip(),this.toggleTooltip(t,a)}}registerElement(t,a){this.registeredElementCount++,this.registeredElements.set(t,a),1===this.registeredElementCount&&this.addListeners()}unregisterElement(t){this.registeredElements.delete(t)&&this.registeredElementCount--,0===this.registeredElementCount&&this.removeListeners()}addListeners(){document.addEventListener("keydown",this.keyDownHandler),document.addEventListener("mouseover",this.mouseEnterShow,{capture:!0}),document.addEventListener("mouseout",this.mouseLeaveHide,{capture:!0}),document.addEventListener("pointerdown",this.clickHandler,{capture:!0}),document.addEventListener("focusin",this.focusShow),document.addEventListener("focusout",this.blurHide,{capture:!0})}removeListeners(){document.removeEventListener("keydown",this.keyDownHandler),document.removeEventListener("mouseover",this.mouseEnterShow,{capture:!0}),document.removeEventListener("mouseout",this.mouseLeaveHide,{capture:!0}),document.removeEventListener("pointerdown",this.clickHandler,{capture:!0}),document.removeEventListener("focusin",this.focusShow,{capture:!0}),document.removeEventListener("focusout",this.blurHide,{capture:!0})}clearHoverTimeout(t){const{hoverTimeouts:a}=this;a.has(t)&&(window.clearTimeout(a.get(t)),a.delete(t))}closeExistingTooltip(){const{activeTooltipEl:t}=this;t&&this.toggleTooltip(t,!1)}focusTooltip(t,a){this.closeExistingTooltip(),a&&this.clearHoverTimeout(t),this.toggleTooltip(t,a)}toggleTooltip(t,a){t.open=a,a&&(this.activeTooltipEl=t)}hoverTooltip(t,a){this.clearHoverTimeout(t);const{hoverTimeouts:e}=this,i=window.setTimeout((()=>this.hoverToggle(t,a)),500);e.set(t,i)}activeTooltipHover(t){const{activeTooltipEl:a,hoverTimeouts:e}=this,{type:i}=t;a&&("mouseover"===i&&t.composedPath().includes(a)?this.clearHoverTimeout(a):"mouseout"!==i||e.has(a)||this.hoverTooltip(a,!1))}hoverEvent(t,a){const e=this.queryTooltip(t.composedPath());this.activeTooltipHover(t),e&&this.hoverTooltip(e,a)}focusEvent(t,a){const e=this.queryTooltip(t.composedPath());e&&e!==this.clickedTooltip?this.focusTooltip(e,a):this.clickedTooltip=null}},f=class{constructor(a){t(this,a),this.offsetDistance=o,this.offsetSkidding=0,this.open=!1,this.overlayPositioning="absolute",this.placement="auto",this.guid=`calcite-tooltip-${n()}`,this.setUpReferenceElement=()=>{this.removeReferences(),this.effectiveReferenceElement=this.getReferenceElement();const{el:t,referenceElement:a,effectiveReferenceElement:e}=this;a&&!e&&console.warn(`${t.tagName}: reference-element id "${a}" was not found.`,{el:t}),this.addReferences(),this.createPopper()},this.getId=()=>this.el.id||this.guid,this.addReferences=()=>{const{effectiveReferenceElement:t}=this;if(!t)return;const a=this.getId();t.setAttribute("aria-describedby",a),p.registerElement(t,this.el)},this.removeReferences=()=>{const{effectiveReferenceElement:t}=this;t&&(t.removeAttribute("aria-describedby"),p.unregisterElement(t))}}offsetDistanceOffsetHandler(){this.reposition()}offsetSkiddingHandler(){this.reposition()}openHandler(){this.reposition()}placementHandler(){this.reposition()}referenceElementHandler(){this.setUpReferenceElement()}componentWillLoad(){this.setUpReferenceElement()}componentDidLoad(){this.reposition()}disconnectedCallback(){this.removeReferences(),this.destroyPopper()}async reposition(){const{popper:t,el:a,placement:e}=this,i=this.getModifiers();t?await r({el:a,modifiers:i,placement:e,popper:t}):this.createPopper()}getReferenceElement(){const{referenceElement:t,el:a}=this;return("string"==typeof t?l(a,{id:t}):t)||null}getModifiers(){const{arrowEl:t,offsetDistance:a,offsetSkidding:e}=this;return[{name:"arrow",enabled:!0,options:{element:t}},{name:"offset",enabled:!0,options:{offset:[e,a]}},{name:"eventListeners",enabled:this.open}]}createPopper(){this.destroyPopper();const{el:t,placement:a,effectiveReferenceElement:e,overlayPositioning:i}=this,n=this.getModifiers();this.popper=s({el:t,modifiers:n,placement:a,overlayPositioning:i,referenceEl:e})}destroyPopper(){const{popper:t}=this;t&&t.destroy(),this.popper=null}render(){const{effectiveReferenceElement:t,label:i,open:n}=this,o=t&&n,r=!o;return a(e,{"aria-hidden":m(r),"aria-label":i,"calcite-hydrated-hidden":r,id:this.getId(),role:"tooltip"},a("div",{class:{[c.animation]:!0,[c.animationActive]:o}},a("div",{class:"arrow",ref:t=>this.arrowEl=t}),a("div",{class:"container"},a("slot",null))))}get el(){return i(this)}static get watchers(){return{offsetDistance:["offsetDistanceOffsetHandler"],offsetSkidding:["offsetSkiddingHandler"],open:["openHandler"],placement:["placementHandler"],referenceElement:["referenceElementHandler"]}}};f.style='@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block;position:absolute;z-index:999;-webkit-transform:scale(0);transform:scale(0)}.calcite-popper-anim{position:relative;z-index:1;-webkit-transition:var(--calcite-popper-transition);transition:var(--calcite-popper-transition);visibility:hidden;-webkit-transition-property:visibility, opacity, -webkit-transform;transition-property:visibility, opacity, -webkit-transform;transition-property:transform, visibility, opacity;transition-property:transform, visibility, opacity, -webkit-transform;opacity:0;-webkit-box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);border-radius:0.25rem}:host([data-popper-placement^=bottom]) .calcite-popper-anim{-webkit-transform:translateY(-5px);transform:translateY(-5px)}:host([data-popper-placement^=top]) .calcite-popper-anim{-webkit-transform:translateY(5px);transform:translateY(5px)}:host([data-popper-placement^=left]) .calcite-popper-anim{-webkit-transform:translateX(5px);transform:translateX(5px)}:host([data-popper-placement^=right]) .calcite-popper-anim{-webkit-transform:translateX(-5px);transform:translateX(-5px)}:host([data-popper-placement]) .calcite-popper-anim--active{opacity:1;visibility:visible;-webkit-transform:translate(0);transform:translate(0)}:host([data-popper-placement][data-popper-reference-hidden]){pointer-events:none;opacity:0}.arrow,.arrow::before{position:absolute;width:8px;height:8px;z-index:-1}.arrow::before{content:"";--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--calcite-ui-foreground-1)}:host([data-popper-placement^=top]) .arrow{bottom:-4px}:host([data-popper-placement^=bottom]) .arrow{top:-4px}:host([data-popper-placement^=left]) .arrow{right:-4px}:host([data-popper-placement^=right]) .arrow{left:-4px}.container{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:start;justify-content:flex-start;overflow:hidden;border-radius:0.25rem;background-color:var(--calcite-ui-foreground-1);padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);max-width:20rem;max-height:20rem}.calcite-popper-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);background-color:var(--calcite-ui-foreground-1)}.arrow::before{outline:1px solid var(--calcite-ui-border-3)}';const d=class{constructor(a){t(this,a),this.selector="[data-calcite-tooltip-reference]"}render(){return a("slot",null)}};d.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:block}";export{f as calcite_tooltip,d as calcite_tooltip_manager}