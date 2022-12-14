!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r(e.esriLoader=e.esriLoader||{})}(this,(function(e){"use strict"
var r={Promise:"undefined"!=typeof window?window.Promise:void 0},t="4.22",n="next"
function o(e){if(e.toLowerCase()===n)return n
var r=e&&e.match(/^(\d)\.(\d+)/)
return r&&{major:parseInt(r[1],10),minor:parseInt(r[2],10)}}function i(e){return void 0===e&&(e=t),"https://js.arcgis.com/"+e+"/"}function a(e){return!e||o(e)?function(e){void 0===e&&(e=t)
var r=i(e),a=o(e)
return a!==n&&3===a.major?r+(a.minor<=10?"js/":"")+"esri/css/esri.css":r+"esri/themes/light/main.css"}(e):e}function s(e,r){var t,n,o,i=a(e),s=(t=i,document.querySelector('link[href*="'+t+'"]'))
return s||(n=i,(o=document.createElement("link")).rel="stylesheet",o.href=n,function(e,r){if(r){var t=document.querySelector(r)
t.parentNode.insertBefore(e,t)}else document.head.appendChild(e)}(s=o,r)),s}var d={}
function u(e,r,t){var n,o,i,a
t&&(i=t,a=function(e){i(e.error||new Error("There was an error attempting to load "+o.src)),o.removeEventListener("error",a,!1)},(o=e).addEventListener("error",a,!1),n=a)
var s=function(){r(e),e.removeEventListener("load",s,!1),n&&e.removeEventListener("error",n,!1)}
e.addEventListener("load",s,!1)}function c(){return document.querySelector("script[data-esri-loader]")}function f(){var e=window.require
return e&&e.on}function l(e){void 0===e&&(e={})
var t={};[d,e].forEach((function(e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}))
var n=t.version,o=t.url||i(n)
return new r.Promise((function(e,r){var i,a,d=c()
if(d){var l=d.getAttribute("src")
l!==o?r(new Error("The ArcGIS API for JavaScript is already loaded ("+l+").")):f()?e(d):u(d,e,r)}else if(f())r(new Error("The ArcGIS API for JavaScript is already loaded."))
else{var v=t.css
v&&s(!0===v?n:v,t.insertCssBefore),i=o,(a=document.createElement("script")).type="text/javascript",a.src=i,a.setAttribute("data-esri-loader","loading"),u(d=a,(function(){d.setAttribute("data-esri-loader","loaded"),e(d)}),r),document.body.appendChild(d)}}))}function v(e){return new r.Promise((function(r,t){var n=window.require.on("error",t)
window.require(e,(function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
n.remove(),r(e)}))}))}e.utils=r,e.loadModules=function(e,r){if(void 0===r&&(r={}),f())return v(e)
var t=c(),n=t&&t.getAttribute("src")
return!r.url&&n&&(r.url=n),l(r).then((function(){return v(e)}))},e.getScript=c,e.isLoaded=f,e.loadScript=l,e.setDefaultOptions=function(e){void 0===e&&(e={}),d=e},e.loadCss=s,Object.defineProperty(e,"__esModule",{value:!0})}))
