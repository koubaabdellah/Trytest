/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */
function n(n){return"Enter"===n||" "===n}const r=["0","1","2","3","4","5","6","7","8","9"];
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */function e(n){return!(!n||isNaN(Number(n)))}function t(n){return n&&(t=n,r.some((n=>t.includes(n))))?c(n,(n=>{let t=!1;const u=n.split("").filter(((n,e)=>n.match(/\./g)&&!t?(t=!0,!0):!(!n.match(/\-/g)||0!==e)||r.includes(n))).reduce(((n,r)=>n+r));return e(u)?Number(u).toString():null})):"";var t}function u(n){return n.replace(/(?!^\.)\.$/,"")}function s(n){return c(n,(n=>{const r=u(n.replace(/^([-0])0+(?=\d)/,"$1")).replace(/(?!^-)-/g,"");return e(r)?/^-\b0\b\.?0*$/.test(r)?r:Number(r).toString():n}))}function c(n,r){if(!n)return n;const e=n.toLowerCase().indexOf("e")+1;return n.replace(/[eE]*$/g,"").substring(0,e).concat(n.slice(e).replace(/[eE]/g,"")).split(/[eE]/).map(((n,e)=>r(1===e?n.replace(/\./g,""):n))).join("e").replace(/^e/,"1e")}export{c as a,u as b,n as c,e as i,r as n,t as p,s}