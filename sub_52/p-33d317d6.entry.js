/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.82
 */
import{r as t,c as i,h as a,F as n,g as e}from"./p-f74193a3.js";import{g as s}from"./p-dc14a2a0.js";import{c as r,d as o}from"./p-a1f93b32.js";import{c,d as l,H as m}from"./p-da7761d3.js";import{u as d}from"./p-ee9b4197.js";import"./p-f383e414.js";const p=class{constructor(a){t(this,a),this.calciteRatingChange=i(this,"calciteRatingChange",7),this.scale="m",this.value=0,this.readOnly=!1,this.disabled=!1,this.showChip=!1,this.intlRating="Rating",this.intlStars="Stars: ${num}",this.required=!1,this.guid=`calcite-ratings-${s()}`}connectedCallback(){r(this),c(this)}disconnectedCallback(){o(this),l(this)}componentDidRender(){d(this)}blurHandler(){this.hasFocus=!1}renderStars(){return[1,2,3,4,5].map((t=>{const i=this.value>=t,n=this.average&&!this.value&&t<=this.average,e=t<=this.hoverValue,s=this.average&&this.average+1-t,r=!this.value&&!e&&s>0&&s<1;return a("span",{class:{wrapper:!0}},a("label",{class:{star:!0,focused:this.hasFocus&&this.focusValue===t,selected:i,average:n,hovered:e,partial:r},htmlFor:`${this.guid}-${t}`,onMouseOver:()=>{this.hoverValue=t}},a("calcite-icon",{"aria-hidden":"true",class:"icon",icon:i||n||this.readOnly?"star-f":"star",scale:this.scale}),r&&a("div",{class:"fraction",style:{width:100*s+"%"}},a("calcite-icon",{icon:"star-f",scale:this.scale})),a("span",{class:"visually-hidden"},this.intlStars.replace("${num}",`${t}`))),a("input",{checked:t===this.value,class:"visually-hidden",disabled:this.disabled||this.readOnly,id:`${this.guid}-${t}`,name:this.guid,onChange:()=>this.updateValue(t),onClick:t=>t.stopPropagation(),onFocus:()=>{this.hasFocus=!0,this.focusValue=t},ref:i=>(1===t||t===this.value)&&(this.inputFocusRef=i),type:"radio",value:t}))}))}render(){const{disabled:t,intlRating:i,showChip:e,scale:s,count:r,average:o}=this;return a(n,null,a("fieldset",{class:"fieldset",disabled:t,onBlur:()=>this.hoverValue=null,onMouseLeave:()=>this.hoverValue=null,onTouchEnd:()=>this.hoverValue=null},a("legend",{class:"visually-hidden"},i),this.renderStars()),(r||o)&&e?a("calcite-chip",{scale:s,value:null==r?void 0:r.toString()},!!o&&a("span",{class:"number--average"},o.toString()),!!r&&a("span",{class:"number--count"},"(",null==r?void 0:r.toString(),")")):null,a(m,{component:this}))}onLabelClick(){this.setFocus()}updateValue(t){this.value=t,this.calciteRatingChange.emit({value:t})}async setFocus(){this.inputFocusRef.focus()}get el(){return e(this)}};p.style="@-webkit-keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-down{0%{opacity:0;-webkit-transform:translate3D(0, -5px, 0);transform:translate3D(0, -5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;-webkit-transform:translate3D(0, 5px, 0);transform:translate3D(0, 5px, 0)}100%{opacity:1;-webkit-transform:translate3D(0, 0, 0);transform:translate3D(0, 0, 0)}}@-webkit-keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}@keyframes in-scale{0%{opacity:0;-webkit-transform:scale3D(0.95, 0.95, 1);transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-duration:var(--calcite-animation-timing);animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{-webkit-animation-name:in;animation-name:in}.calcite-animate__in-down{-webkit-animation-name:in-down;animation-name:in-down}.calcite-animate__in-up{-webkit-animation-name:in-up;animation-name:in-up}.calcite-animate__in-scale{-webkit-animation-name:in-scale;animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){height:1.5rem;--calcite-rating-spacing-unit:0.25rem}:host([scale=m]){height:2rem;--calcite-rating-spacing-unit:0.5rem}:host([scale=l]){height:2.75rem;--calcite-rating-spacing-unit:0.75rem}:host([read-only]){pointer-events:none}.fieldset{margin:0px;display:-ms-flexbox;display:flex;border-width:0px;padding:0px}.wrapper{display:inline-block;-webkit-margin-end:var(--calcite-rating-spacing-unit);margin-inline-end:var(--calcite-rating-spacing-unit)}.star{position:relative;display:-ms-flexbox;display:flex;cursor:pointer;outline-offset:0;outline-color:transparent;-webkit-transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;color:var(--calcite-ui-border-input);-webkit-transition:var(--calcite-animation-timing);transition:var(--calcite-animation-timing);-webkit-transform:scale(1);transform:scale(1)}.star:active{-webkit-transform:scale(1.1);transform:scale(1.1)}.focused{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.average,.fraction{color:var(--calcite-ui-warning)}.hovered,.selected,:host([read-only]) .average,:host([read-only]) .fraction{color:var(--calcite-ui-brand)}.hovered:not(.selected){-webkit-transform:scale(0.9);transform:scale(0.9)}:host .fraction{pointer-events:none;position:absolute;top:0px;overflow:hidden;-webkit-transition:var(--calcite-animation-timing);transition:var(--calcite-animation-timing);inset-inline-start:0}calcite-chip{pointer-events:none;cursor:default}.number--average{font-weight:var(--calcite-font-weight-bold)}.number--count{color:var(--calcite-ui-text-2);font-style:italic}.number--count:not(:first-child){-webkit-margin-start:var(--calcite-rating-spacing-unit);margin-inline-start:var(--calcite-rating-spacing-unit)}.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}::slotted(input[slot=hidden-form-input]){bottom:0 !important;left:0 !important;margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;right:0 !important;top:0 !important;-webkit-transform:none !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";export{p as calcite_rating}