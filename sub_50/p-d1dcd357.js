/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-next.468
 */
import{f as t}from"./p-0c89f05f.js";import{c as o}from"./p-5dd4629c.js";const c=new Set;let n;const f={childList:!0};function s(t){n||(n=o("mutation",r)),n.observe(t.el,f)}function i(t){c.delete(t.el),r(n.takeRecords()),n.disconnect();for(const[t]of c.entries())n.observe(t,f)}function r(o){o.forEach((({target:o})=>{t(o)}))}export{s as c,i as d}