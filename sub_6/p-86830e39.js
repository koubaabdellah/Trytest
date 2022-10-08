/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{f as t}from"./p-07000a47.js";import{c as o}from"./p-8c3b967b.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const n=new Set;let c;const s={childList:!0};function f(t){c||(c=o("mutation",a)),c.observe(t.el,s)}function i(t){n.delete(t.el),a(c.takeRecords()),c.disconnect();for(const[t]of n.entries())c.observe(t,s)}function a(o){o.forEach((({target:o})=>{t(o)}))}export{f as c,i as d}