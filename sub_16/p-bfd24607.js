/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-next.468
 */
import{q as e,c as n}from"./p-102b243d.js";const t="calciteInternalLabelConnected",c="calciteInternaLabelDisconnected",a=new WeakMap,l=new WeakMap,o=new WeakMap,i=new Set;function s(t){const c=(t=>{const{id:c}=t,a=c&&e(t,{selector:`calcite-label[for="${c}"]`});if(a)return a;const l=n(t,"calcite-label");return!l||function(e,n){let t;const c="custom-element-ancestor-check",a=c=>{c.stopImmediatePropagation();const a=c.composedPath();t=a.slice(a.indexOf(n),a.indexOf(e))};return e.addEventListener(c,a,{once:!0}),n.dispatchEvent(new CustomEvent(c,{composed:!0,bubbles:!0})),e.removeEventListener(c,a),t.filter((t=>t!==n&&t!==e)).filter((e=>{var n;return null===(n=e.tagName)||void 0===n?void 0:n.includes("-")})).length>0}(l,t)?null:l})(t.el);if(a.has(c)||!c&&i.has(t))return;const s=f.bind(t);if(c){t.labelEl=c;const e=d.bind(t);a.set(t.labelEl,e),t.labelEl.addEventListener("calciteInternalLabelClick",e),i.delete(t),document.removeEventListener("calciteInternalLabelConnected",l.get(t)),o.set(t,s),document.addEventListener("calciteInternaLabelDisconnected",s)}else i.has(t)||(s(),document.removeEventListener("calciteInternaLabelDisconnected",o.get(t)))}function r(e){if(i.delete(e),document.removeEventListener("calciteInternalLabelConnected",l.get(e)),document.removeEventListener("calciteInternaLabelDisconnected",o.get(e)),l.delete(e),o.delete(e),!e.labelEl)return;const n=a.get(e.labelEl);e.labelEl.removeEventListener("calciteInternalLabelClick",n),a.delete(e.labelEl)}function u(e){var n,t;return e.label||(null===(t=null===(n=e.labelEl)||void 0===n?void 0:n.textContent)||void 0===t?void 0:t.trim())||""}function d(e){this.disabled||this.el.contains(e.detail.sourceEvent.target)||this.onLabelClick(e)}function b(){i.has(this)&&s(this)}function f(){i.add(this);const e=l.get(this)||b.bind(this);l.set(this,e),document.addEventListener("calciteInternalLabelConnected",e)}export{c as a,s as c,r as d,u as g,t as l}