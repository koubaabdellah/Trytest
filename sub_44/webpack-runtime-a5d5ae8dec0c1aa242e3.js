!function(){"use strict";var e,t,n,r,c,a,f,o={},d={};function i(e){var t=d[e];if(void 0!==t)return t.exports;var n=d[e]={id:e,loaded:!1,exports:{}};return o[e].call(n.exports,n,n.exports,i),n.loaded=!0,n.exports}i.m=o,e=[],i.O=function(t,n,r,c){if(!n){var a=1/0;for(u=0;u<e.length;u++){n=e[u][0],r=e[u][1],c=e[u][2];for(var f=!0,o=0;o<n.length;o++)(!1&c||a>=c)&&Object.keys(i.O).every((function(e){return i.O[e](n[o])}))?n.splice(o--,1):(f=!1,c<a&&(a=c));if(f){e.splice(u--,1);var d=r();void 0!==d&&(t=d)}}return t}c=c||0;for(var u=e.length;u>0&&e[u-1][2]>c;u--)e[u]=e[u-1];e[u]=[n,r,c]},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,{a:t}),t},n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},i.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var c=Object.create(null);i.r(c);var a={};t=t||[null,n({}),n([]),n(n)];for(var f=2&r&&e;"object"==typeof f&&!~t.indexOf(f);f=n(f))Object.getOwnPropertyNames(f).forEach((function(t){a[t]=function(){return e[t]}}));return a.default=function(){return e},i.d(c,a),c},i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=function(e){return Promise.all(Object.keys(i.f).reduce((function(t,n){return i.f[n](e,t),t}),[]))},i.u=function(e){return({2196:"component---src-components-mdx-template-tsx",5524:"component---src-components-sample-code-template-tsx",9218:"component---src-pages-404-tsx",9351:"commons",9774:"framework"}[e]||e)+"-"+{328:"6b46fd3c6b569b421e7b",329:"a3f66cea44b274db5f0e",350:"e6549bc5465fee51ebb7",392:"245260cdf4129d2863ba",505:"21ecc6803dc80d164ad0",827:"69159f8de2c64f799f5c",953:"bacf40f0479260ea2536",990:"cecd67d62a817ee9ca77",1019:"562c4932e13dc9accbb4",1096:"b9bebe1a3dd8e1701b96",1490:"7cb21d65521060c44c41",1494:"c7b5e06f3cfdc107c01a",1545:"7d0cea8858107cdbdee7",1603:"de3bec55a2d4c7182059",1714:"e79ccefb4fe424625c39",2066:"e48e6b39c93f13fc64ac",2172:"1f4675e765b7a7360503",2196:"7f139e1f3570071486ae",2226:"1743bee6a960a62b407f",2607:"8ffc1db5af801f7bc769",2626:"1407d9c72407981443ee",2989:"b23bc53981ab0c5890b5",3025:"383aa6018370f462bff6",3057:"afc04badad63d53c2c87",3074:"f8365c23af978de11a62",4360:"a51bb133a104ea56b45f",4434:"ec968ccf4636edc12da3",4666:"7ac18ef602cab1ef59de",5062:"7661c2a9560af4a46b1a",5218:"4fdda7a25dae2b5ace4c",5293:"d7b8a859ce6f305521d8",5294:"98c47eabd4e51750361c",5354:"11071591e50ce4794666",5499:"58f570edcddf8541837f",5524:"7afb5e5c26d86f0265f5",5553:"2753a6110663aa8b1a63",5741:"af2c4a8ce51fa9cd3798",6039:"d27b271642360d4d0c5d",6450:"d1497f9085d0722da028",6491:"68c75143c4430f47be8d",6619:"2eebba527e700665678b",6632:"908bd8c6d74a3da3542b",7022:"2f2b2aaa2f19f96936e6",7047:"06f340c456dbeae4f1b1",7066:"0f54f1d1ef070890e542",7219:"82e27bbb024a5387c04d",7423:"38502c5591956fa3cf39",7518:"08409b367bb8c2c28030",7524:"02692ef7457cbfac71f8",7664:"fa43cdaab7c4596f1ffb",7686:"6b28549747e3d7ec0052",7766:"c5cf278105449b9e2d29",7932:"201b21423921065b718e",8148:"84a7b7472b323fcbbc1a",8223:"70b6f54ae475af9af05d",8367:"7d13028a4afcb374c805",8378:"5f6df2be911ddcf31e51",8665:"a30f01eeeeafc2aa2973",9056:"329591cf3f2352c12e34",9172:"1aa01a866890218d8431",9218:"d56526090739a4f8fef6",9351:"5fafbbaa1f38035a8cf8",9393:"423d705fb8c389a7cbe2",9547:"94c8ef23f59b75698bae",9774:"c43c370a6f9af6872c51",9802:"da4bfbf0255430a49e1e",9903:"d0e1b5edd749946a3a35"}[e]+".js"},i.miniCssF=function(e){return{2143:"app",9351:"commons"}[e]+"."+{2143:"64f623eec4a3d2765024",9351:"0d865275157a00d66603"}[e]+".css"},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.hmd=function(e){return(e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r={},c="native-apis-doc:",i.l=function(e,t,n,a){if(r[e])r[e].push(t);else{var f,o;if(void 0!==n)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var b=d[u];if(b.getAttribute("src")==e||b.getAttribute("data-webpack")==c+n){f=b;break}}f||(o=!0,(f=document.createElement("script")).charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.setAttribute("data-webpack",c+n),f.src=e),r[e]=[t];var s=function(t,n){f.onerror=f.onload=null,clearTimeout(l);var c=r[e];if(delete r[e],f.parentNode&&f.parentNode.removeChild(f),c&&c.forEach((function(e){return e(n)})),t)return t(n)},l=setTimeout(s.bind(null,void 0,{type:"timeout",target:f}),12e4);f.onerror=s.bind(null,f.onerror),f.onload=s.bind(null,f.onload),o&&document.head.appendChild(f)}},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},i.p="/net/",a=function(e){return new Promise((function(t,n){var r=i.miniCssF(e),c=i.p+r;if(function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var c=(f=n[r]).getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(c===e||c===t))return f}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){var f;if((c=(f=a[r]).getAttribute("data-href"))===e||c===t)return f}}(r,c))return t();!function(e,t,n,r){var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.onerror=c.onload=function(a){if(c.onerror=c.onload=null,"load"===a.type)n();else{var f=a&&("load"===a.type?"missing":a.type),o=a&&a.target&&a.target.href||t,d=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");d.code="CSS_CHUNK_LOAD_FAILED",d.type=f,d.request=o,c.parentNode.removeChild(c),r(d)}},c.href=t,document.head.appendChild(c)}(e,c,t,n)}))},f={6658:0},i.f.miniCss=function(e,t){f[e]?t.push(f[e]):0!==f[e]&&{9351:1}[e]&&t.push(f[e]=a(e).then((function(){f[e]=0}),(function(t){throw delete f[e],t})))},function(){var e={6658:0};i.f.j=function(t,n){var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else if(6658!=t){var c=new Promise((function(n,c){r=e[t]=[n,c]}));n.push(r[2]=c);var a=i.p+i.u(t),f=new Error;i.l(a,(function(n){if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var c=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;f.message="Loading chunk "+t+" failed.\n("+c+": "+a+")",f.name="ChunkLoadError",f.type=c,f.request=a,r[1](f)}}),"chunk-"+t,t)}else e[t]=0},i.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,c,a=n[0],f=n[1],o=n[2],d=0;if(a.some((function(t){return 0!==e[t]}))){for(r in f)i.o(f,r)&&(i.m[r]=f[r]);if(o)var u=o(i)}for(t&&t(n);d<a.length;d++)c=a[d],i.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return i.O(u)},n=self.webpackChunknative_apis_doc=self.webpackChunknative_apis_doc||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}()}();