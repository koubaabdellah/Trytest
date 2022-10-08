/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{n as o}from"./p-9510b839.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const t="CALCITE-COMBOBOX-ITEM",n="CALCITE-COMBOBOX-ITEM-GROUP",a="CALCITE-COMBOBOX-ITEM, CALCITE-COMBOBOX-ITEM-GROUP",e="bottom-leading",c={removeTag:"Remove tag"};
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */
function i(o){var t,n;const e=null===(t=o.parentElement)||void 0===t?void 0:t.closest(a);return[e,null===(n=null==e?void 0:e.parentElement)||void 0===n?void 0:n.closest(a)].filter((o=>o))}function r(o){var t;return(null===(t=o.ancestors)||void 0===t?void 0:t.filter((o=>"CALCITE-COMBOBOX-ITEM"===o.nodeName)))||[]}function u(t){return o(t.querySelectorAll("calcite-combobox-item"))}function l(t){return o(t.querySelectorAll("calcite-combobox-item")).filter((o=>o.selected)).length>0}function s(o){return document.evaluate("ancestor::calcite-combobox-item | ancestor::calcite-combobox-item-group",o,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotLength}export{a as C,c as T,u as a,t as b,n as c,e as d,i as e,s as f,r as g,l as h}