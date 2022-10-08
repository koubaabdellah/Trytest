/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{r as i,c as t,h as a,F as e,a as n}from"./p-07000a47.js";import{H as o}from"./p-d9d9588e.js";import{g as r}from"./p-9510b839.js";import{H as l,c}from"./p-57a6746d.js";import{c as s,d}from"./p-86830e39.js";import"./p-d0ba5b72.js";import"./p-8c3b967b.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const m=o+1;let h=class{constructor(a){i(this,a),this.calciteTipDismiss=t(this,"calciteTipDismiss",7),this.dismissed=!1,this.nonDismissible=!1,this.selected=!1,this.hideTip=()=>{this.dismissed=!0,this.calciteTipDismiss.emit()}}connectedCallback(){s(this)}disconnectedCallback(){d(this)}renderHeader(){var i;const{heading:t,headingLevel:e,el:n}=this,o=null===(i=n.closest("calcite-tip-manager"))||void 0===i?void 0:i.headingLevel,r=o?c(o+1):null;return t?a("header",{class:"header"},a(l,{class:"heading",level:e||r||m},t)):null}renderDismissButton(){const{nonDismissible:i,hideTip:t,intlClose:e}=this;return i?null:a("calcite-action",{class:"close",icon:"x",onClick:t,scale:"l",text:e||"Close"})}renderImageFrame(){const{el:i}=this;return r(i,"thumbnail")?a("div",{class:"image-frame",key:"thumbnail"},a("slot",{name:"thumbnail"})):null}renderInfoNode(){return a("div",{class:"info"},a("slot",null))}renderContent(){return a("div",{class:"content"},this.renderImageFrame(),this.renderInfoNode())}render(){return a(e,null,a("article",{class:"container"},this.renderHeader(),this.renderContent()),this.renderDismissButton())}get el(){return n(this)}};h.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}:root{--calcite-popper-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{position:relative;margin:1rem;box-sizing:border-box;display:flex;flex-direction:row;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-2);background-color:var(--calcite-ui-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-2)}:host *{box-sizing:border-box}.container{width:100%;padding:1rem}:host([dismissed]),:host([dismissed]) .container{display:none}:host([selected]) .container{margin:0px;border-style:none;padding:0px}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-ui-text-2);color:var(--calcite-ui-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}h1.heading{font-size:var(--calcite-font-size-2);line-height:1.5rem}h2.heading{font-size:var(--calcite-font-size-1);line-height:1.5rem}h3.heading{font-size:var(--calcite-font-size-0);line-height:1.25rem}h4.heading,h5.heading{font-size:var(--calcite-font-size--1);line-height:1rem}.header{margin-bottom:0.5rem}.header .heading{padding:0px;color:var(--calcite-ui-text-1)}.container[hidden]{display:none}.content{display:flex}.info{padding-top:0px;padding-bottom:0px;padding-left:1rem;padding-right:1rem;width:70%}.info:only-child{width:100%;padding-left:0px;padding-right:0px}::slotted(p){margin-top:0px}::slotted(a){outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out;color:var(--calcite-ui-brand)}::slotted(a:focus){outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.image-frame{width:25%}.image-frame img{max-width:100%}::slotted(img){max-width:100%}";export{h as calcite_tip}