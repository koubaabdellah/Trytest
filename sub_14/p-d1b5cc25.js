/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
import{a as r,b as t}from"./p-d15ef94c.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */const n=["ar","bg","bs","ca","cs","da","de","de-CH","el","en","en-AU","en-CA","en-GB","es","es-MX","et","fi","fr","fr-CH","he","hi","hr","hu","id","it","it-CH","ja","ko","lt","lv","mk","nb","nl","pl","pt","pt-PT","ro","ru","sk","sl","sr","sv","th","tr","uk","vi","zh-CN","zh-HK","zh-TW"];function e(r){return new Intl.NumberFormat(r,{minimumFractionDigits:0,maximumFractionDigits:20})}function i(t,n){return r(t,(r=>{if(r){const t=s(n),e=u(n),i=r.split(""),a=i.lastIndexOf(e),c=i.map(((r,n)=>r===t||r===e&&n!==a?"":r)).reduce(((r,t)=>r+t)).replace(e,".");return isNaN(Number(c))?r:c}return r}))}function s(r){const t=e(r).formatToParts(1234567.8).find((r=>"group"===r.type)).value;return 0===t.trim().length?" ":t}function u(r){const t=e(r).formatToParts(1234567.8).find((r=>"decimal"===r.type)).value;return 0===t.trim().length?" ":t}function a(n,i,a=!1){return r(n,(r=>{if(r){const n=Number(t(r));return isNaN(n)?r:e(i).formatToParts(n).map((({type:r,value:t})=>{switch(r){case"group":return a?s(i):"";case"decimal":return u(i);default:return t}})).reduce(((r,t)=>r+t))}}))}export{n as a,i as d,u as g,a as l}