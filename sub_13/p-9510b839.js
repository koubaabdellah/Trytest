/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{g as n}from"./p-d0ba5b72.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const t={autoTheme:"calcite-theme-auto",darkTheme:"calcite-theme-dark",lightTheme:"calcite-theme-light",rtl:"calcite--rtl"},r={loading:"Loading"};
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */
function u(t){return t?t.id=t.id||`${t.tagName.toLowerCase()}-${n()}`:""}function o(n){return Array.isArray(n)?n:Array.from(n)}function l(n){const r=d(n,`.${t.darkTheme}, .${t.lightTheme}`);return(null==r?void 0:r.classList.contains("calcite-theme-dark"))?"dark":"light"}function i(n){const t=d(n,"[dir]");return t?t.getAttribute("dir"):"ltr"}function e(n,t,r){const u=n.closest(`[${t}]`);return u?u.getAttribute(t):r}function c(n){return n.getRootNode()}function a(n){return n.host||null}function s(n,t){return function n(r,u){if(!r)return u;r.assignedSlot&&(r=r.assignedSlot);const o=c(r),l=Array.from(o.querySelectorAll(t)).filter((n=>!u.includes(n)));u=[...u,...l];const i=a(o);return i?n(i,u):u}(n,[])}function f(n,{selector:t,id:r}){return function n(u){if(!u)return null;u.assignedSlot&&(u=u.assignedSlot);const o=c(u),l=r?o.getElementById(r):t?o.querySelector(t):null,i=a(o);return l||(i?n(i):null)}(n)}function d(n,t){return function n(r){return r?r.closest(t)||n(a(c(r))):null}(n)}function v(n){return"function"==typeof(null==n?void 0:n.setFocus)}async function y(n){if(n)return v(n)?n.setFocus():n.focus()}function h(n,t,r){t&&!Array.isArray(t)&&"string"!=typeof t&&(r=t,t=null);const u=t?Array.isArray(t)?t.map((n=>`[slot="${n}"]`)).join(","):`[slot="${t}"]`:":not([slot])";return(null==r?void 0:r.all)?function(n,t,r){let u=":not([slot])"===t?g(n,":not([slot])"):Array.from(n.querySelectorAll(t));u=r&&!1===r.direct?u:u.filter((t=>t.parentElement===n)),u=(null==r?void 0:r.matches)?u.filter((n=>null==n?void 0:n.matches(r.matches))):u;const o=null==r?void 0:r.selector;return o?u.map((n=>Array.from(n.querySelectorAll(o)))).reduce(((n,t)=>[...n,...t]),[]).filter((n=>!!n)):u}(n,u,r):function(n,t,r){let u=":not([slot])"===t?g(n,":not([slot])")[0]||null:n.querySelector(t);u=r&&!1===r.direct||(null==u?void 0:u.parentElement)===n?u:null,u=(null==r?void 0:r.matches)?(null==u?void 0:u.matches(r.matches))?u:null:u;const o=null==r?void 0:r.selector;return o?null==u?void 0:u.querySelector(o):u}(n,u,r)}function g(n,t){return n?Array.from(n.children||[]).filter((n=>null==n?void 0:n.matches(t))):[]}function m(n,t){return Array.from(n.children).filter((n=>n.matches(t)))}function A(n,t,r){return"string"==typeof t&&""!==t?t:""===t?n[r]:void 0}function $(n,t){return!(t.left>n.right||t.right<n.left||t.top>n.bottom||t.bottom<n.top)}export{t as C,r as T,e as a,i as b,d as c,s as d,m as e,y as f,h as g,l as h,u as i,v as j,$ as k,o as n,f as q,A as s}