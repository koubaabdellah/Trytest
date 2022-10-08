/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/themes/cjib/dist/js/modernizr.js. */
!function(e,s,f,c){var l=[],t={_version:"3.11.7",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){l.push({name:e,fn:t,options:n})},addAsyncTest:function(e){l.push({name:null,fn:e})}};(a=function(){}).prototype=t;var a=new a,u=[];function p(e,t){return typeof e===t}var d,n,h=t._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];t._prefixes=h,d=void 0!==(n={}.hasOwnProperty)&&void 0!==n.call?function(e,t){return n.call(e,t)}:function(e,t){return t in e&&void 0===e.constructor.prototype[t]};var m=f.documentElement,y="svg"===m.nodeName.toLowerCase();function v(e,t){if("object"==typeof e)for(var n in e)d(e,n)&&v(n,e[n]);else{var r=(e=e.toLowerCase()).split("."),o=a[r[0]];if(void 0!==(o=2===r.length?o[r[1]]:o))return a;t="function"==typeof t?t():t,1===r.length?a[r[0]]=t:(!a[r[0]]||a[r[0]]instanceof Boolean||(a[r[0]]=new Boolean(a[r[0]])),a[r[0]][r[1]]=t),i=[(t&&!1!==t?"":"no-")+r.join("-")],s=m.className,o=a._config.classPrefix||"",y&&(s=s.baseVal),a._config.enableJSClass&&(r=new RegExp("(^|\\s)"+o+"no-js(\\s|$)"),s=s.replace(r,"$1"+o+"js$2")),a._config.enableClasses&&(0<i.length&&(s+=" "+o+i.join(" "+o)),y?m.className.baseVal=s:m.className=s),a._trigger(e,t)}var i,s;return a}function g(e){return"function"!=typeof f.createElement?f.createElement(e):y?f.createElementNS.call(f,"http://www.w3.org/2000/svg",e):f.createElement.apply(f,arguments)}function o(e,t,n,r){var o,i,s,l="modernizr",a=g("div"),u=((s=f.body)||((s=g(y?"svg":"body")).fake=!0),s);if(parseInt(n,10))for(;n--;)(o=g("div")).id=r?r[n]:l+(n+1),a.appendChild(o);return(s=g("style")).type="text/css",s.id="s"+l,(u.fake?u:a).appendChild(s),u.appendChild(a),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(f.createTextNode(e)),a.id=l,u.fake&&(u.style.background="",u.style.overflow="hidden",i=m.style.overflow,m.style.overflow="hidden",m.appendChild(u)),e=t(a,e),u.fake&&u.parentNode?(u.parentNode.removeChild(u),m.style.overflow=i,m.offsetHeight):a.parentNode.removeChild(a),!!e}t._l={},t.on=function(e,t){this._l[e]||(this._l[e]=[]),this._l[e].push(t),a.hasOwnProperty(e)&&setTimeout(function(){a._trigger(e,a[e])},0)},t._trigger=function(e,t){var n;this._l[e]&&(n=this._l[e],setTimeout(function(){for(var e=0;e<n.length;e++)(0,n[e])(t)},0),delete this._l[e])},a._q.push(function(){t.addTest=v});var r=t.testStyles=o,i="Moz O ms Webkit",C=t._config.usePrefixes?i.split(" "):[];t._cssomPrefixes=C;var _={elem:g("modernizr")};a._q.push(function(){delete _.elem});var w={style:_.elem.style};function b(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function S(e,t){var n=e.length;if("CSS"in s&&"supports"in s.CSS){for(;n--;)if(s.CSS.supports(b(e[n]),t))return!0;return!1}if("CSSSupportsRule"in s){for(var r=[];n--;)r.push("("+b(e[n])+":"+t+")");return o("@supports ("+(r=r.join(" or "))+") { #modernizr { position: absolute; } }",function(e){return"absolute"===(t=e,n=null,r="position","getComputedStyle"in s?(o=getComputedStyle.call(s,t,n),e=s.console,null!==o?r&&(o=o.getPropertyValue(r)):e&&e[e.error?"error":"log"].call(e,"getComputedStyle returning null, its possible modernizr test results are inaccurate")):o=!n&&t.currentStyle&&t.currentStyle[r],o);var t,n,r,o})}return c}function x(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}a._q.unshift(function(){delete w.style});var T=t._config.usePrefixes?i.toLowerCase().split(" "):[];function k(e,t,n){var r,o;for(o in e)if(e[o]in t)return!1===n?e[o]:p(r=t[e[o]],"function")?function(e,t){return function(){return e.apply(t,arguments)}}(r,n||t):r;return!1}function P(e,t,n,r,o){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+C.join(i+" ")+i).split(" ");return p(t,"string")||void 0===t?function(e,t,n,r){if(r=void 0!==r&&r,void 0!==n){var o=S(e,n);if(void 0!==o)return o}for(var i,s,l,a,u,f=["modernizr","tspan","samp"];!w.style&&f.length;)i=!0,w.modElem=g(f.shift()),w.style=w.modElem.style;function p(){i&&(delete w.style,delete w.modElem)}for(l=e.length,s=0;s<l;s++)if(a=e[s],u=w.style[a],~(""+a).indexOf("-")&&(a=x(a)),w.style[a]!==c){if(r||void 0===n)return p(),"pfx"!==t||a;try{w.style[a]=n}catch(e){}if(w.style[a]!==u)return p(),"pfx"!==t||a}return p(),!1}(s,t,r,o):k(s=(e+" "+T.join(i+" ")+i).split(" "),t,n)}t._domPrefixes=T,t.testAllProps=P;function j(e){var t,n=h.length,r=s.CSSRule;if(void 0===r)return c;if(!e)return!1;if((t=(e=e.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in r)return"@"+e;for(var o=0;o<n;o++){var i=h[o];if(i.toUpperCase()+"_"+t in r)return"@-"+i.toLowerCase()+"-"+e}return!1}t.atRule=j;i=t.prefixed=function(e,t,n){return 0===e.indexOf("@")?j(e):(-1!==e.indexOf("-")&&(e=x(e)),t?P(e,t,n):P(e,"pfx"))};a.addTest("objectfit",!!i("objectFit"),{aliases:["object-fit"]});var z=g("input");!function(){for(var e,t,n,r=["search","tel","url","email","datetime","date","month","week","time","datetime-local","number","range","color"],o=0;o<r.length;o++)z.setAttribute("type",e=r[o]),(n="text"!==z.type&&"style"in z)&&(z.value="1)",z.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(e)&&z.style.WebkitAppearance!==c?(m.appendChild(z),n=(t=f.defaultView).getComputedStyle&&"textfield"!==t.getComputedStyle(z,null).WebkitAppearance&&0!==z.offsetHeight,m.removeChild(z)):/^(search|tel)$/.test(e)||(n=/^(url|email)$/.test(e)?z.checkValidity&&!1===z.checkValidity():"1)"!==z.value)),a.addTest("inputtypes."+e,!!n)}(),a.addTest("details",function(){var t,n=g("details");return"open"in n&&(r("#modernizr details{display:block}",function(e){e.appendChild(n),n.innerHTML="<summary>a</summary>b",t=n.offsetHeight,n.open=!0,t=t!==n.offsetHeight}),t)}),function(){var e,t,n,r,o,i,s;for(s in l)if(l.hasOwnProperty(s)){if(e=[],(t=l[s]).name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(r=p(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)1===(i=e[o].split(".")).length?a[i[0]]=r:(a[i[0]]&&(!a[i[0]]||a[i[0]]instanceof Boolean)||(a[i[0]]=new Boolean(a[i[0]])),a[i[0]][i[1]]=r),u.push((r?"":"no-")+i.join("-"))}}(),delete t.addTest,delete t.addAsyncTest;for(var E=0;E<a._q.length;E++)a._q[E]();e.Modernizr=a}(window,window,document);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/themes/cjib/dist/js/modernizr.js. */