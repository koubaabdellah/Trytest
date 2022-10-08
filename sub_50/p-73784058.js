/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.82
 */
import{a as n,i as e,b as r}from"./p-fe972352.js";const t=["ar","bg","bs","ca","cs","da","de","de-CH","el","en","en-AU","en-CA","en-GB","es","es-MX","et","fi","fr","fr-CH","he","hi","hr","hu","id","it","it-CH","ja","ko","lt","lv","mk","nb","nl","pl","pt","pt-PT","ro","ru","sk","sl","sr","sv","th","tr","uk","vi","zh-CN","zh-HK","zh-TW"],i=new RegExp("[.](?=.*[.])","g"),u=new RegExp("[^0-9-.]","g"),s=new RegExp(",","g");function a(n){return new Intl.NumberFormat(n,{minimumFractionDigits:0,maximumFractionDigits:20})}function c(r,t){return n(r,(n=>{const r=n.replace(g(t),"-").replace(o(t),"").replace(f(t),".").replace(i,"").replace(u,"");return e(r)?r:n}))}function o(n){const e=a(n).formatToParts(1234567).find((n=>"group"===n.type)).value;return 0===e.trim().length?" ":e}function f(n){return a(n).formatToParts(1.1).find((n=>"decimal"===n.type)).value}function g(n){return a(n).formatToParts(-9).find((n=>"minusSign"===n.type)).value}function m(e,t,i=!1){return n(e,(n=>{if(n){const e=Number(r(n.replace(s,"")));if(!isNaN(e))return a(t).formatToParts(e).map((({type:n,value:e})=>{switch(n){case"group":return i?o(t):"";case"decimal":return f(t);case"minusSign":return g(t);default:return e}})).reduce(((n,e)=>n+e))}return n}))}export{t as a,c as d,f as g,m as l}