/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{q as n,c as t}from"./p-9510b839.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const e=new WeakMap;function c(c){const o=(e=>{const{id:c}=e,o=c&&n(e,{selector:`calcite-label[for="${c}"]`});if(o)return o;const l=t(e,"calcite-label");return!l||function(n,t){let e;const c="custom-element-ancestor-check",o=c=>{c.stopImmediatePropagation();const o=c.composedPath();e=o.slice(o.indexOf(t),o.indexOf(n))};return n.addEventListener(c,o,{once:!0}),t.dispatchEvent(new CustomEvent(c,{composed:!0,bubbles:!0})),n.removeEventListener(c,o),e.filter((e=>e!==t&&e!==n)).filter((n=>{var t;return null===(t=n.tagName)||void 0===t?void 0:t.includes("-")})).length>0}(l,e)?null:l})(c.el);if(!o||e.has(o))return;c.labelEl=o;const l=i.bind(c);e.set(c.labelEl,l),c.labelEl.addEventListener("calciteInternalLabelClick",l)}function o(n){if(!n.labelEl)return;const t=e.get(n.labelEl);n.labelEl.removeEventListener("calciteInternalLabelClick",t),e.delete(n.labelEl)}function l(n){var t,e;return n.label||(null===(e=null===(t=n.labelEl)||void 0===t?void 0:t.textContent)||void 0===e?void 0:e.trim())||""}function i(n){this.disabled||this.el.contains(n.detail.sourceEvent.target)||this.onLabelClick(n)}export{c,o as d,l as g}