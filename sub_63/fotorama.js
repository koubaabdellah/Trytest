fotoramaVersion="4.6.3",function(i,be,xe,_e,u){"use strict";var Ce="fotorama",Te="fullscreen",ke=Ce+"__wrap",Me=ke+"--video",Se=ke+"--no-controls",Fe=ke+"--only-active",Ee=Ce+"__stage",Pe=Ee+"__frame",je=Ce+"__grab",Ne=Ce+"__arr",$e=Ne+"--disabled",qe=Ce+"__nav",Ae=qe+"--dots",Oe=qe+"--thumbs",ze=qe+"__frame",t=Ce+"__fade",d=t+"-front",h=t+"-rear",Le="fotorama__shadows",Ie=Ce+"__active",De=Ce+"__select",Re=Ce+"--fullscreen",We=Ce+"__error",He=Ce+"__loading",Ke=Ce+"__loaded",A=Ce+"__grabbing",Ve=Ce+"__img",Be=Ce+"__thumb",e=Ce+"__video",Xe=e+"-play",Qe='" tabindex="0" role="button',n=_e&&_e.fn.jquery.split(".");if(!n||n[0]<1||1==n[0]&&n[1]<8)throw"Fotorama requires jQuery 1.8 or later and will not run without it.";var l=function(f,i){var t,o,a={},d=f.documentElement,h="modernizr",r=f.createElement(h).style,e=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",s=n.split(" "),u=n.toLowerCase().split(" "),l={},c=[],m=c.slice,p={}.hasOwnProperty;function v(t){r.cssText=t}function w(t,e){return typeof t===e}function g(t,e){for(var n in t){var o=t[n];if(!~(""+o).indexOf("-")&&r[o]!==i)return"pfx"!=e||o}return!1}function y(t,e,n){var o=t.charAt(0).toUpperCase()+t.slice(1),a=(t+" "+s.join(o+" ")+o).split(" ");return w(e,"string")||void 0===e?g(a,e):function(t,e,n){for(var o in t){var a=e[t[o]];if(a!==i)return!1===n?t[o]:w(a,"function")?a.bind(n||e):a}return!1}(a=(t+" "+u.join(o+" ")+o).split(" "),e,n)}for(var b in o=void 0!==p&&void 0!==p.call?function(t,e){return p.call(t,e)}:function(t,e){return e in t&&void 0===t.constructor.prototype[e]},Function.prototype.bind||(Function.prototype.bind=function(o){var a=this;if("function"!=typeof a)throw new TypeError;var i=m.call(arguments,1),r=function(){if(this instanceof r){var t=function(){};t.prototype=a.prototype;var e=new t,n=a.apply(e,i.concat(m.call(arguments)));return Object(n)===n?n:e}return a.apply(o,i.concat(m.call(arguments)))};return r}),l.csstransforms3d=function(){return!!y("perspective")},l)o(l,b)&&(t=b.toLowerCase(),a[t]=l[b](),c.push((a[t]?"":"no-")+t));return a.addTest=function(t,e){if("object"==typeof t)for(var n in t)o(t,n)&&a.addTest(n,t[n]);else{if(t=t.toLowerCase(),a[t]!==i)return a;e="function"==typeof e?e():e,"undefined"!=typeof enableClasses&&enableClasses&&(d.className+=" "+(e?"":"no-")+t),a[t]=e}return a},v(""),0,a._version="2.6.2",a._prefixes=e,a._domPrefixes=u,a._cssomPrefixes=s,a.testProp=function(t){return g([t])},a.testAllProps=y,a.testStyles=function(t,e,n,o){var a,i,r,s,u=f.createElement("div"),l=f.body,c=l||f.createElement("body");if(parseInt(n,10))for(;n--;)(r=f.createElement("div")).id=o?o[n]:h+(n+1),u.appendChild(r);return a=["&#173;",'<style id="s',h,'">',t,"</style>"].join(""),u.id=h,(l?u:c).innerHTML+=a,c.appendChild(u),l||(c.style.background="",c.style.overflow="hidden",s=d.style.overflow,d.style.overflow="hidden",d.appendChild(c)),i=e(u,t),l?u.parentNode.removeChild(u):(c.parentNode.removeChild(c),d.style.overflow=s),!!i},a.prefixed=function(t,e,n){return e?y(t,e,n):y(t,"pfx")},a}(be),Ue={ok:!1,is:function(){return!1},request:function(){},cancel:function(){},event:"",prefix:""},o="webkit moz o ms khtml".split(" ");if(void 0!==be.cancelFullScreen)Ue.ok=!0;else for(var a=0,r=o.length;a<r;a++)if(Ue.prefix=o[a],void 0!==be[Ue.prefix+"CancelFullScreen"]){Ue.ok=!0;break}Ue.ok&&(Ue.event=Ue.prefix+"fullscreenchange",Ue.is=function(){switch(this.prefix){case"":return be.fullScreen;case"webkit":return be.webkitIsFullScreen;default:return be[this.prefix+"FullScreen"]}},Ue.request=function(t){return""===this.prefix?t.requestFullScreen():t[this.prefix+"RequestFullScreen"]()},Ue.cancel=function(t){return""===this.prefix?be.cancelFullScreen():be[this.prefix+"CancelFullScreen"]()});var Ye,Ge={lines:12,length:5,width:2,radius:7,corners:1,rotate:15,color:"rgba(128, 128, 128, .75)",hwaccel:!0},Je={top:"auto",left:"auto",className:""};Ye=function(){"use strict";var i=["webkit","Moz","ms","O"],l={},m;function p(t,e){var n=be.createElement(t||"div"),o;for(o in e)n[o]=e[o];return n}function c(t){for(var e=1,n=arguments.length;e<n;e++)t.appendChild(arguments[e]);return t}var f=function(){var t=p("style",{type:"text/css"});c(be.getElementsByTagName("head")[0],t);return t.sheet||t.styleSheet}();function r(t,e,n,o){var a=["opacity",e,~~(t*100),n,o].join("-"),i=.01+n/o*100,r=Math.max(1-(1-t)/e*(100-i),t),s=m.substring(0,m.indexOf("Animation")).toLowerCase(),u=s&&"-"+s+"-"||"";if(!l[a]){f.insertRule("@"+u+"keyframes "+a+"{"+"0%{opacity:"+r+"}"+i+"%{opacity:"+t+"}"+(i+.01)+"%{opacity:1}"+(i+e)%100+"%{opacity:"+t+"}"+"100%{opacity:"+r+"}"+"}",f.cssRules.length);l[a]=1}return a}function o(t,e){var n=t.style,o,a;e=e.charAt(0).toUpperCase()+e.slice(1);for(a=0;a<i.length;a++){o=i[a]+e;if(n[o]!==u)return o}if(n[e]!==u)return e}function v(t,e){for(var n in e)t.style[o(t,n)||n]=e[n];return t}function e(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)if(t[o]===u)t[o]=n[o]}return t}function w(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}function d(t,e){return typeof t=="string"?t:t[e%t.length]}var n={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function a(t){if(typeof this=="undefined")return new a(t);this.opts=e(t||{},a.defaults,n)}function t(){function l(t,e){return p("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}f.addRule(".spin-vml","behavior:url(#default#VML)");a.prototype.lines=function(t,o){var a=o.length+o.width,e=2*a;function i(){return v(l("group",{coordsize:e+" "+e,coordorigin:-a+" "+-a}),{width:e,height:e})}var n=-(o.width+o.length)*2+"px",r=v(i(),{position:"absolute",top:n,left:n}),s;function u(t,e,n){c(r,c(v(i(),{rotation:360/o.lines*t+"deg",left:~~e}),c(v(l("roundrect",{arcsize:o.corners}),{width:a,height:o.width,left:o.radius,top:-o.width>>1,filter:n}),l("fill",{color:d(o.color,t),opacity:o.opacity}),l("stroke",{opacity:0}))))}if(o.shadow)for(s=1;s<=o.lines;s++)u(s,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(s=1;s<=o.lines;s++)u(s);return c(t,r)};a.prototype.opacity=function(t,e,n,o){var a=t.firstChild;o=o.shadow&&o.lines||0;if(a&&e+o<a.childNodes.length){a=a.childNodes[e+o];a=a&&a.firstChild;a=a&&a.firstChild;if(a)a.opacity=n}}}a.defaults={},e(a.prototype,{spin:function(t){this.stop();var n=this,o=n.opts,a=n.el=v(p(0,{className:o.className}),{position:o.position,width:0,zIndex:o.zIndex}),e=o.radius+o.length+o.width,i,r;if(t){t.insertBefore(a,t.firstChild||null);r=w(t);i=w(a);v(a,{left:(o.left=="auto"?r.x-i.x+(t.offsetWidth>>1):parseInt(o.left,10)+e)+"px",top:(o.top=="auto"?r.y-i.y+(t.offsetHeight>>1):parseInt(o.top,10)+e)+"px"})}a.setAttribute("role","progressbar");n.lines(a,n.opts);if(!m){var s=0,u=(o.lines-1)*(1-o.direction)/2,l,c=o.fps,f=c/o.speed,d=(1-o.opacity)/(f*o.trail/100),h=f/o.lines;(function t(){s++;for(var e=0;e<o.lines;e++){l=Math.max(1-(s+(o.lines-e)*h)%f*d,o.opacity);n.opacity(a,e*o.direction+u,l,o)}n.timeout=n.el&&setTimeout(t,~~(1e3/c))})()}return n},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=u}return this},lines:function(t,n){var o=0,e=(n.lines-1)*(1-n.direction)/2,a;function i(t,e){return v(p(),{position:"absolute",width:n.length+n.width+"px",height:n.width+"px",background:t,boxShadow:e,transformOrigin:"left",transform:"rotate("+~~(360/n.lines*o+n.rotate)+"deg) translate("+n.radius+"px"+",0)",borderRadius:(n.corners*n.width>>1)+"px"})}for(;o<n.lines;o++){a=v(p(),{position:"absolute",top:1+~(n.width/2)+"px",transform:n.hwaccel?"translate3d(0,0,0)":"",opacity:n.opacity,animation:m&&r(n.opacity,n.trail,e+o*n.direction,n.lines)+" "+1/n.speed+"s linear infinite"});if(n.shadow)c(a,v(i("#000","0 0 4px "+"#000"),{top:2+"px"}));c(t,c(a,i(d(n.color,o),"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,n){if(e<t.childNodes.length)t.childNodes[e].style.opacity=n}});var s=v(p("group"),{behavior:"url(#default#VML)"});if(!o(s,"transform")&&s.adj)t();else m=o(s,"animation");return a}();var Ze,tn,w,g,y,b,en=_e(i),nn=_e(be),s="quirks"===xe.hash.replace("#",""),c=l.csstransforms3d,on=c&&!s,an=c||"CSS1Compat"===be.compatMode,rn=Ue.ok,f=navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),sn=!on||f,un=navigator.msPointerEnabled,m="onwheel"in be.createElement("div")?"wheel":be.onmousewheel!==u?"mousewheel":"DOMMouseScroll",ln=250,cn=300,p=1400,fn="$stageFrame",dn="$navDotFrame",hn="$navThumbFrame",v=function(i){var r,t="bez_"+_e.makeArray(arguments).join("_").replace(".","p");return"function"!=typeof _e.easing[t]&&(r=function(n,o){function i(t,e){return u[e]=3*n[e],s[e]=3*(o[e]-n[e])-u[e],r[e]=1-u[e]-s[e],t*(u[e]+t*(s[e]+t*r[e]))}function e(t){for(var e,n,o=t,a=0;++a<14&&(e=i(o,0)-t,!(Math.abs(e)<.001));)o-=e/(n=o,u[0]+n*(2*s[0]+3*r[0]*n));return o}var r=[null,null],s=[null,null],u=[null,null];return function(t){return i(e(t),1)}},_e.easing[t]=function(t,e,n,o,a){return o*r([i[0],i[1]],[i[2],i[3]])(e/a)+n}),t}([.1,0,.25,1]),x="50%",_={width:null,minwidth:null,maxwidth:"100%",height:null,minheight:null,maxheight:null,ratio:null,margin:2,glimpse:0,fit:"contain",position:x,thumbposition:x,nav:"dots",navposition:"bottom",navwidth:null,thumbwidth:64,thumbheight:64,thumbmargin:2,thumbborderwidth:2,thumbfit:"cover",allowfullscreen:!1,transition:"slide",clicktransition:null,transitionduration:cn,captions:!0,hash:!1,startindex:0,loop:!1,autoplay:!1,stopautoplayontouch:!0,keyboard:!1,arrows:!0,click:!0,swipe:!0,trackpad:!1,enableifsingleframe:!1,controlsonstart:!0,shuffle:!1,direction:"ltr",shadows:!0,spinner:null},mn={left:!0,right:!0,down:!1,up:!1,space:!1,home:!1,end:!1};function pn(){}function vn(t,e,n){return Math.max(isNaN(e)?-1/0:e,Math.min(isNaN(n)?1/0:n,t))}function wn(t){var e={};return on?e.transform="translate3d("+t+"px,0,0)":e.left=t,e}function gn(t){return{"transition-duration":t+"ms"}}function C(t,e){return isNaN(t)?e:t}function yn(t,e){return C(+String(t).replace(e||"px",""))}function bn(t,e){return C((/%$/.test(n=t)?yn(n,"%"):u)/100*e,yn(t));var n}function xn(t){return(!isNaN(yn(t))||!isNaN(yn(t,"%")))&&t}function _n(t,e,n,o){return(t-(o||0))*(e+(n||0))}function T(t,e,n,o){var a,i,r,s=t.data();s&&(s.onEndFn=function(){a||(a=!0,clearTimeout(s.tT),n())},s.tProp=e,clearTimeout(s.tT),s.tT=setTimeout(function(){s.onEndFn()},1.5*o),(r=(i=t).data()).tEnd||(In(i[0],{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"}[l.prefixed("transition")],function(t){r.tProp&&t.propertyName.match(r.tProp)&&r.onEndFn()}),r.tEnd=!0))}function Cn(n,t){if(n.length){var e=n.data();on?(n.css(gn(0)),e.onEndFn=pn,clearTimeout(e.tT)):n.stop();var o=Tn(t,function(){return t=n,on?+((e=t.css("transform")).match(/ma/)&&e.match(/-?\d+(?!d)/g)[e.match(/3d/)?12:4]):+t.css("left").replace("px","");var t,e});return n.css(wn(o)),o}}function Tn(){for(var t,e=0,n=arguments.length;e<n&&"number"!=typeof(t=e?arguments[e]():arguments[e]);e++);return t}function O(t,e){return Math.round(t+(e-t)/1.5)}function kn(){return kn.p=kn.p||("https:"===xe.protocol?"https://":"http://"),kn.p}function Mn(t,e){return"string"!=typeof t?t:(n=t,(o=be.createElement("a")).href=n,(t=o).host.match(/youtube\.com/)&&t.search?(r=t.search.split("v=")[1])&&(-1!==(i=r.indexOf("&"))&&(r=r.substring(0,i)),a="youtube"):t.host.match(/youtube\.com|youtu\.be/)?(r=t.pathname.replace(/^\/(embed\/|v\/)?/,"").replace(/\/.*/,""),a="youtube"):t.host.match(/vimeo\.com/)&&(a="vimeo",r=t.pathname.replace(/^\/(video\/)?/,"").replace(/\/.*/,"")),r&&a||!e||(r=t.href,a="custom"),!!r&&{id:r,type:a,s:t.search.replace(/^\?/,""),p:kn()});var n,o,a,i,r}function Sn(t,e,n,o){for(var a=0,i=t.length;a<i;a++){var r=t[a];if(r.i===n&&r.thumbsReady){var s={videoReady:!0};s[fn]=s[hn]=s[dn]=!1,o.splice(a,1,_e.extend({},r,s,e));break}}}function Fn(t){var f=[];function d(t,e,n){var o=n.thumb&&n.img!==n.thumb,a=yn(n.width||t.attr("width")),i=yn(n.height||t.attr("height")),r=e.attr("alt"),s=e.attr("alt");r&&_e.extend(n,{alt:r}),s&&_e.extend(n,{title:s}),_e.extend(n,{width:a,height:i,thumbratio:Ln(n.thumbratio||yn(n.thumbwidth||e&&e.attr("width")||o||a)/yn(n.thumbheight||e&&e.attr("height")||o||i))})}return t.children().each(function(){var t,e,n,o,a,i,r,s,u,l=_e(this),c=zn(_e.extend(l.data(),{id:l.attr("id")}));if(l.is("a, img"))e=c,n=!0,o=(t=l).children("img").eq(0),a=t.attr("href"),i=t.attr("src"),r=o.attr("src"),s=e.video,(u=!!n&&Mn(a,!0===s))?a=!1:u=s,d(t,o,_e.extend(e,{video:u,img:e.img||a||i||r,thumb:e.thumb||r||i||a}));else{if(l.is(":empty"))return;d(l,null,_e.extend(c,{html:this,_html:l.html()}))}f.push(c)}),f}function En(t,e,n,o){return En.i||(En.i=1,En.ii=[!0]),o=o||En.i,void 0===En.ii[o]&&(En.ii[o]=!0),t()?e():En.ii[o]&&setTimeout(function(){En.ii[o]&&En(t,e,n,o)},n||100),En.i++}function Pn(t,e,n,o){var a,i,r,s,u,l,c,f,d,h=t.data(),m=h.measures;return!m||h.l&&h.l.W===m.width&&h.l.H===m.height&&h.l.r===m.ratio&&h.l.w===e.w&&h.l.h===e.h&&h.l.m===n&&h.l.p===o||(console.log("fit"),a=m.width,i=m.height,r=e.w/e.h,s=m.ratio>=r,u="scaledown"===n,l="contain"===n,c="cover"===n,f={x:xn((d=((d=o)+"").split(/\s+/))[0])||x,y:xn(d[1])||x},s&&(u||l)||!s&&c?i=(a=vn(e.w,0,u?a:1/0))/m.ratio:(s&&c||!s&&(u||l))&&(a=(i=vn(e.h,0,u?i:1/0))*m.ratio),t.css({width:a,height:i,left:bn(f.x,e.w-a),top:bn(f.y,e.h-i)}),h.l={W:m.width,H:m.height,r:m.ratio,w:e.w,h:e.h,m:n,p:o}),!0}function jn(t,e,n){return e!==n&&(t<=e?"left":n<=t?"right":"left right")}function Nn(t,e,n,o){if(!n)return!1;if(!isNaN(t))return t-(o?0:1);for(var a,i=0,r=e.length;i<r;i++){if(e[i].id===t){a=i;break}}return a}function $n(t,e){return'<div class="'+t+'">'+(e||"")+"</div>"}function qn(t){for(var e=t.length;e;){var n=Math.floor(Math.random()*e--),o=t[e];t[e]=t[n],t[n]=o}return t}function An(t){return"[object Array]"==Object.prototype.toString.call(t)&&_e.map(t,function(t){return _e.extend({},t)})}function On(t,e,n){t.scrollLeft(e||0).scrollTop(n||0)}function zn(t){if(t){var n={};return _e.each(t,function(t,e){n[t.toLowerCase()]=e}),n}}function Ln(t){if(t){var e=+t;return isNaN(e)?(e=t.split("/"))[0]/e[1]||u:e}}function In(t,e,n,o){e&&(t.addEventListener?t.addEventListener(e,n,!!o):t.attachEvent("on"+e,n))}function Dn(t){return{tabindex:-1*t+"",disabled:t}}function Rn(e,n){In(e,"keyup",function(t){e.getAttribute("disabled")||13==t.keyCode&&n.call(e,t)})}function Wn(e,n){In(e,"focus",e.onfocusin=function(t){n.call(e,t)},!0)}function Hn(t,e){t.preventDefault?t.preventDefault():t.returnValue=!1,e&&t.stopPropagation&&t.stopPropagation()}function Kn(t){return t?">":"<"}function Vn(t,e){var n=t.data(),o=Math.round(e.pos),a=function(){n.sliding=!1,(e.onEnd||pn)()};void 0!==e.overPos&&e.overPos!==e.pos&&(o=e.overPos,a=function(){Vn(t,_e.extend({},e,{overPos:e.pos,time:Math.max(cn,e.time/2)}))});var i=_e.extend(wn(o),e.width&&{width:e.width});n.sliding=!0,on?(t.css(_e.extend(gn(e.time),i)),10<e.time?T(t,"transform",a,e.time):a()):t.stop().animate(i,e.time,v,a)}function Bn(t,e,n,o,a,i){var r,s,u,l,c,f=void 0!==i;!f&&(a.push(arguments),Array.prototype.push.call(arguments,a.length),1<a.length)||(t=t||_e(t),e=e||_e(e),r=t[0],s=e[0],u="crossfade"===o.method,l=function(){var t;l.done||(l.done=!0,(t=(f||a.shift())&&a.shift())&&Bn.apply(this,t),(o.onEnd||pn)(!!t))},c=o.time/(i||1),n.removeClass(h+" "+d),t.stop().addClass(h),e.stop().addClass(d),u&&s&&t.fadeTo(0,0),t.fadeTo(u?c:0,1,u&&l),e.fadeTo(c,0,l),r&&u||s||l())}function k(t){var e=(t.touches||[])[0]||t;t._x=e.pageX,t._y=e.clientY,t._now=_e.now()}function Xn(t,r){var s,u,n,o,l,e,a,c,f,d=t[0],h={};function i(t){if(n=_e(t.target),h.checked=e=a=f=!1,s||h.flow||t.touches&&1<t.touches.length||1<t.which||w&&w.type!==t.type&&y||(e=r.select&&n.is(r.select,d)))return e;l="touchstart"===t.type,a=n.is("a, a *",d),o=h.control,c=h.noMove||h.noSwipe||o?16:h.snap?0:4,k(t),u=w=t,g=t.type.replace(/down|start/,"move").replace(/Down/,"Move"),(r.onStart||pn).call(d,t,{control:o,$target:n}),s=h.flow=!0,l&&!h.go||Hn(t)}function m(t){if(t.touches&&1<t.touches.length||un&&!t.isPrimary||g!==t.type||!s)return s&&p(),void(r.onTouchEnd||pn)();k(t);var e=Math.abs(t._x-u._x),n=Math.abs(t._y-u._y),o=e-n,a=(h.go||h.x||0<=o)&&!h.noSwipe,i=o<0;l&&!h.checked?(s=a)&&Hn(t):(Hn(t),(r.onMove||pn).call(d,t,{touch:l})),!f&&Math.sqrt(Math.pow(e,2)+Math.pow(n,2))>c&&(f=!0),h.checked=h.checked||a||i}function p(t){(r.onTouchEnd||pn)();var e=s;h.control=s=!1,e&&(h.flow=!1),!e||a&&!h.checked||(t&&Hn(t),y=!0,clearTimeout(b),b=setTimeout(function(){y=!1},1e3),(r.onEnd||pn).call(d,{moved:f,$target:n,control:o,touch:l,startEvent:u,aborted:!t||"MSPointerCancel"===t.type}))}function v(){h.flow&&setTimeout(function(){h.flow=!1},ln)}return un?(In(d,"MSPointerDown",i),In(be,"MSPointerMove",m),In(be,"MSPointerCancel",p),In(be,"MSPointerUp",p)):(In(d,"touchstart",i),In(d,"touchmove",m),In(d,"touchend",p),In(be,"touchstart",function(){h.flow||setTimeout(function(){h.flow=!0},10)}),In(be,"touchend",v),In(be,"touchcancel",v),en.on("scroll",v),t.on("mousedown",i),nn.on("mousemove",m).on("mouseup",p)),t.on("click","a",function(t){h.checked&&Hn(t)}),h}function Qn(b,x){var n,_,C,T,o,k,a,M,S,F,E,P,i,j,N=b[0],r=b.data(),$={};function q(t,e){j=!0,n=_=t._x,a=t._now,k=[[a,n]],C=T=$.noMove||e?0:Cn(b,(x.getPos||pn)()),(x.onStart||pn).call(N,t)}return $=_e.extend(Xn(x.$wrap,_e.extend({},x,{onStart:function(t,e){S=$.min,F=$.max,E=$.snap,P=t.altKey,j=i=!1,e.control||r.sliding||q(t)},onMove:function(t,e){$.noSwipe||(j||q(t),_=t._x,k.push([t._now,_]),o=jn(T=C-(n-_),S,F),T<=S?T=O(T,S):F<=T&&(T=O(T,F)),$.noMove||(b.css(wn(T)),i||(i=!0,e.touch||un||b.addClass(A)),(x.onMove||pn).call(N,t,{pos:T,edge:o})))},onEnd:function(t){if(!$.noSwipe||!t.moved){j||q(t.startEvent,!0),t.touch||un||b.removeClass(A);for(var e,n,o,a,i,r,s,u,l,c=(M=_e.now())-ln,f=null,d=cn,h=x.friction,m=k.length-1;0<=m;m--){if(e=k[m][0],n=Math.abs(e-c),null===f||n<o)f=e,a=k[m][1];else if(f===c||o<n)break;o=n}s=vn(T,S,F);var p=a-_,v=0<=p,w=M-f,g=ln<w,y=!g&&T!==C&&s===T;E&&(s=vn(Math[y?v?"floor":"ceil":"round"](T/E)*E,S,F),S=F=s),y&&(E||s===T)&&(l=-p/w,d*=vn(Math.abs(l),x.timeLow,x.timeHigh),i=Math.round(T+l*d/h),E||(s=i),(!v&&F<i||v&&i<S)&&(r=v?S:F,E||(s=r),u=vn(s+.03*(u=i-r),r-50,r+50),d=Math.abs((T-u)/(l/h)))),d*=P?10:1,(x.onEnd||pn).call(N,_e.extend(t,{moved:t.moved||g&&E,pos:T,newPos:s,overPos:u,time:d}))}}})),$)}function Un(t,u){var l,c,f,e=t[0],d={prevent:{}};return In(e,m,function(t){var e=t.wheelDeltaY||-1*t.deltaY||0,n=t.wheelDeltaX||-1*t.deltaX||0,o=Math.abs(n)&&!Math.abs(e),a=Kn(n<0),i=c===a,r=_e.now(),s=r-f<ln;c=a,f=r,o&&d.ok&&(!d.prevent[a]||l)&&(Hn(t,!0),l&&i&&s||(u.shift&&(l=!0,clearTimeout(d.t),d.t=setTimeout(function(){l=!1},p)),(u.onEnd||pn)(t,u.shift?a:n)))}),d}function Yn(){_e.each(_e.Fotorama.instances,function(t,e){e.index=t})}En.stop=function(t){En.ii[t]=!1},jQuery.Fotorama=function(s,x){Ze=_e("html"),tn=_e("body");var _,C,i,r,c,f,d,h,m,p,v,w,g,a,y,b,T,u,l,k,M,S,F,E,P,j,N,$,q,t,e,A,O,n,o,z,L,I,D,R,W=this,H=_e.now(),K=Ce+H,V=s[0],B=1,X=s.data(),Q=_e("<style></style>"),U=_e($n("fotorama--hidden")),Y=_e($n(ke)),G=_e($n(Ee)).appendTo(Y),J=(G[0],_e($n("fotorama__stage__shaft")).appendTo(G)),Z=_e(),tt=_e($n(Ne+" fotorama__arr--prev"+Qe)),et=_e($n(Ne+" fotorama__arr--next"+Qe)),nt=tt.add(et).appendTo(G),ot=_e($n("fotorama__nav-wrap")),at=_e($n(qe)).appendTo(ot),it=_e($n("fotorama__nav__shaft")).appendTo(at),rt=_e(),st=_e(),ut=(J.data(),it.data(),_e($n("fotorama__thumb-border")).appendTo(it)),lt=_e($n("fotorama__fullscreen-icon"+Qe)),ct=lt[0],ft=_e($n(Xe)),dt=_e($n("fotorama__video-close")).appendTo(G)[0],ht=_e($n("fotorama__spinner")),mt=!1,pt={},vt={},wt={},gt={},yt={},bt={},xt={},_t=0,Ct=[];function Tt(){_e.each(_,function(t,e){var n,o,a,i,r,s,u,l;e.i||(e.i=B++,(n=Mn(e.video,!0))&&(o={},e.video=n,e.img||e.thumb?e.thumbsReady=!0:(i=_,r=W,"youtube"===(l=(a=e).video).type?(s=(u=kn()+"img.youtube.com/vi/"+l.id+"/default.jpg").replace(/\/default.jpg$/,"/hqdefault.jpg"),a.thumbsReady=!0):"vimeo"===l.type?_e.ajax({url:kn()+"vimeo.com/api/v2/video/"+l.id+".json",dataType:"jsonp",success:function(t){a.thumbsReady=!0,Sn(i,{img:t[0].thumbnail_large,thumb:t[0].thumbnail_small},a.i,r)}}):a.thumbsReady=!0,o={img:s,thumb:u}),Sn(_,{img:o.img,thumb:o.thumb},e.i,W)))})}function kt(t){return $[t]||W.fullScreen}function Mt(t){var e,n,o,a,i,r;t!==Mt.f&&(t?(s.html("").addClass(Ce+" "+K).append(Y).before(Q).before(U),n=W,_e.Fotorama.instances.push(n)):(Y.detach(),Q.detach(),U.detach(),s.html(X.urtext).removeClass(K),e=W,_e.Fotorama.instances.splice(e.index,1)),Yn(),o="keydown."+Ce,i="keydown."+(a=Ce+H),r="resize."+a+" orientationchange."+a,t?(nn.on(i,function(t){var e,n;c&&27===t.keyCode?le(c,e=!0,!0):(W.fullScreen||x.keyboard&&!W.index)&&(27===t.keyCode?(e=!0,W.cancelFullScreen()):t.shiftKey&&32===t.keyCode&&kt("space")||37===t.keyCode&&kt("left")||38===t.keyCode&&kt("up")?n="<":32===t.keyCode&&kt("space")||39===t.keyCode&&kt("right")||40===t.keyCode&&kt("down")?n=">":36===t.keyCode&&kt("home")?n="<<":35===t.keyCode&&kt("end")&&(n=">>")),(e||n)&&Hn(t),n&&W.show({index:n,slow:t.altKey,user:!0})}),W.index||nn.off(o).on(o,"textarea, input, select",function(t){tn.hasClass(Te)||t.stopPropagation()}),en.on(r,W.resize)):(nn.off(i),en.off(r)),Mt.f=t)}function St(){var t=C<2&&!x.enableifsingleframe||c;vt.noMove=t||M,vt.noSwipe=t||!x.swipe,P||J.toggleClass(je,!x.click&&!vt.noMove&&!vt.noSwipe),un&&Y.toggleClass("fotorama__wrap--pan-y",!vt.noSwipe)}function Ft(t){!0===t&&(t=""),x.autoplay=Math.max(+t||5e3,1.5*E)}function Et(t){return t<0?(C+t%C)%C:C<=t?t%C:t}function Pt(t){return vn(t,0,C-1)}function jt(t){return(y?Et:Pt)(t)}function Nt(t){return!!(0<t||y)&&t-1}function $t(t){return!!(t<C-1||y)&&t+1}function qt(t,i,r){var s;return"number"==typeof t&&(t=new Array(t),s=!0),_e.each(t,function(t,e){var n,o,a;s&&(e=t),"number"!=typeof e||(n=_[Et(e)])&&(a=n[o="$"+i+"Frame"],r.call(this,t,e,n,a,o,a&&a.data()))})}function At(t,e,n,o){q&&("*"!==q||o!==a)||(t=xn(x.width)||xn(t)||500,e=xn(x.height)||xn(e)||333,W.resize({width:t,ratio:x.ratio||n||t/e},0,o!==a&&"*"))}function Ot(t,v,w,g,y,b){qt(t,v,function(t,n,e,o,a,i){var r,s,u,l,c,f,d;function h(t){var e=Et(n);ne(t,{index:e,src:f,frame:_[e]})}function m(){u.remove(),_e.Fotorama.cache[f]="error",e.html&&"stage"===v||!d||d===f?(!f||e.html||r?"stage"===v&&(o.trigger("f:load").removeClass(He+" "+We).addClass(Ke),h("load"),At()):(o.trigger("f:error").removeClass(He).addClass(We),h("error")),i.state="error",!(1<C&&_[n]===e)||e.html||e.deleted||e.video||r||(e.deleted=!0,W.splice(n,1))):(e[c]=f=d,Ot([n],v,w,g,y,!0))}function p(){var t=10;En(function(){return!z||!t--&&!sn},function(){_e.Fotorama.measures[f]=l.measures=_e.Fotorama.measures[f]||{width:s.width,height:s.height,ratio:s.width/s.height},At(l.measures.width,l.measures.height,l.measures.ratio,n),u.off("load error").addClass(Ve+(r?" fotorama__img--full":"")).prependTo(o),Pn(u,(_e.isFunction(w)?w():w)||pt,g||e.fit||x.fit,y||e.position||x.position),_e.Fotorama.cache[f]=i.state="loaded",setTimeout(function(){o.trigger("f:load").removeClass(He+" "+We).addClass(Ke+" "+(r?"fotorama__loaded--full":"fotorama__loaded--img")),"stage"===v?h("load"):"auto"!==e.thumbratio&&(e.thumbratio||"auto"!==x.thumbratio)||(e.thumbratio=l.measures.ratio,we())},0)})}o&&(r=W.fullScreen&&e.full&&e.full!==e.img&&!i.$full&&"stage"===v,i.$img&&!b&&!r||(s=new Image,u=_e(s),l=u.data(),i[r?"$full":"$img"]=u,f=e[c="stage"===v?r?"full":"img":"thumb"],d=r?null:e["stage"===v?"thumb":"img"],"navThumb"===v&&(o=i.$wrap),f?(_e.Fotorama.cache[f]?function t(){"error"===_e.Fotorama.cache[f]?m():"loaded"===_e.Fotorama.cache[f]?setTimeout(p,0):setTimeout(t,100)}():(_e.Fotorama.cache[f]="*",u.on("load",p).on("error",m)),i.state="",i.data.hasOwnProperty("alt")&&(s.alt=i.data.alt),i.data.hasOwnProperty("title")&&(s.title=i.data.title),s.src=f):m()))})}function zt(){ht.detach(),r&&r.stop()}function Lt(){var t,e=f[fn];e&&!e.data().state&&(t=e,ht.append(r.spin().el).appendTo(t),e.on("f:load f:error",function(){e.off("f:load f:error"),zt()}))}function It(t){Rn(t,me),Wn(t,function(){setTimeout(function(){On(at)},0),Gt({time:E,guessIndex:_e(this).data().eq,minMax:gt})})}function Dt(t,s){qt(t,s,function(t,e,n,o,a,i){var r;o||(o=n[a]=Y[a].clone(),(i=o.data()).data=n,r=o[0],"stage"===s?(n.html&&_e('<div class="fotorama__html"></div>').append(n._html?_e(n.html).removeAttr("id").html(n._html):n.html).appendTo(o),n.caption&&_e($n("fotorama__caption",$n("fotorama__caption__wrap",n.caption))).appendTo(o),n.video&&o.addClass("fotorama__stage__frame--video").append(ft.clone()),Wn(r,function(){setTimeout(function(){On(G)},0),de({index:i.eq,user:!0})}),Z=Z.add(o)):"navDot"===s?(It(r),rt=rt.add(o)):"navThumb"===s&&(It(r),i.$wrap=o.children(":first"),st=st.add(o),n.video&&i.$wrap.append(ft.clone())))})}function Rt(t,e,n,o){return t&&t.length&&Pn(t,e,n,o)}function Wt(t){qt(t,"stage",function(t,e,n,o,a,i){var r,s,u,l;o&&(r=Et(e),s=n.fit||x.fit,u=n.position||x.position,i.eq=r,xt[fn][r]=o.css(_e.extend({left:M?0:_n(e,pt.w,x.margin,h)},M&&gn(0))),l=o[0],_e.contains(be.documentElement,l)||(o.appendTo(J),le(n.$video)),Rt(i.$img,pt,s,u),Rt(i.$full,pt,s,u))})}function Ht(t,s){var u,l;"thumbs"!==b||isNaN(t)||(l=(u=-t)+pt.nw,st.each(function(){function t(){return{h:F,w:e.w}}var e=_e(this).data(),n=e.eq,o=t(),a=_[n]||{},i=a.thumbfit||x.thumbfit,r=a.thumbposition||x.thumbposition;o.w=e.w,e.l+e.w<u||e.l>l||Rt(e.$img,o,i,r)||s&&Ot([n],"navThumb",t,i,r)}))}function Kt(t,e,n){var o,a;Kt[n]||(o="nav"===n&&T,a=0,e.append(t.filter(function(){for(var t,e=_e(this),n=e.data(),o=0,a=_.length;o<a;o++)if(n.data===_[o]){t=!0,n.eq=o;break}return t||e.remove()&&!1}).sort(function(t,e){return _e(t).data().eq-_e(e).data().eq}).each(function(){var t,e,n;o&&(e=(t=_e(this)).data(),n=Math.round(F*e.data.thumbratio)||S,e.l=a,e.w=n,t.css({width:n}),a+=n+x.thumbmargin)})),Kt[n]=!0)}function Vt(t){return t-_t>pt.w/3}function Bt(t){return!(y||mt+t&&mt-C+t||c)}function Xt(){var t=Bt(0),e=Bt(1);tt.toggleClass($e,t).attr(Dn(t)),et.toggleClass($e,e).attr(Dn(e))}function Qt(){wt.ok&&(wt.prevent={"<":Bt(0),">":Bt(1)})}function Ut(t){var e,n=t.data(),o=T?(e=n.l,n.w):(e=t.position().left,t.width());return{c:e+o/2,min:-e+10*x.thumbmargin,max:-e+pt.w-o-10*x.thumbmargin}}function Yt(t){var e=f[I].data();Vn(ut,{time:1.2*t,pos:e.l,width:e.w-2*x.thumbborderwidth})}function Gt(t){var e,n,o,a,i,r=_[t.guessIndex][I];r&&(e=gt.min!==gt.max,n=t.minMax||e&&Ut(f[I]),o=e&&(t.keep&&Gt.l?Gt.l:vn((t.coo||pt.nw/2)-Ut(r).c,n.min,n.max)),a=e&&vn(o,gt.min,gt.max),i=1.1*t.time,Vn(it,{time:i,pos:a||0,onEnd:function(){Ht(a,!0)}}),ue(at,jn(a,gt.min,gt.max)),Gt.l=o)}function Jt(t){for(var e=bt[t];e.length;)e.shift().removeClass(Ie)}function Zt(t){var n=xt[t];_e.each(d,function(t,e){delete n[Et(e)]}),_e.each(n,function(t,e){delete n[t],e.detach()})}function te(t){h=m=mt;var e=f[fn];e&&(Jt(fn),bt[fn].push(e.addClass(Ie)),t||W.show.onEnd(!0),Cn(J,0),Zt(fn),Wt(d),vt.min=y?-1/0:-_n(C-1,pt.w,x.margin,h),vt.max=y?1/0:-_n(0,pt.w,x.margin,h),vt.snap=pt.w+x.margin,gt.min=Math.min(0,pt.nw-it.width()),gt.max=0,it.toggleClass(je,!(gt.noMove=gt.min===gt.max)))}function ee(n,t){n&&_e.each(t,function(t,e){e&&_e.extend(e,{width:n.width||e.width,height:n.height,minwidth:n.minwidth,maxwidth:n.maxwidth,minheight:n.minheight,maxheight:n.maxheight,ratio:Ln(n.ratio)})})}function ne(t,e){s.trigger(Ce+":"+t,[W,e])}function oe(){clearTimeout(ae.t),z=1,x.stopautoplayontouch?W.stopAutoplay():O=!0}function ae(){z&&(x.stopautoplayontouch||(ie(),re()),ae.t=setTimeout(function(){z=0},cn+ln))}function ie(){O=!(!c&&!n)}function re(){var n,t;clearTimeout(re.t),En.stop(re.w),x.autoplay&&!O?(W.autoplay||(W.autoplay=!0,ne("startautoplay")),n=mt,t=f[fn].data(),re.w=En(function(){return t.state||n!==mt},function(){re.t=setTimeout(function(){var t,e;O||n!==mt||(e=_[t=g][fn].data(),re.w=En(function(){return e.state||t!==g},function(){O||t!==g||W.show(y?Kn(!N):g)}))},x.autoplay)})):W.autoplay&&(W.autoplay=!1,ne("stopautoplay"))}function se(){W.fullScreen&&(W.fullScreen=!1,rn&&Ue.cancel(V),tn.removeClass(Te),Ze.removeClass(Te),s.removeClass(Re).insertAfter(U),pt=_e.extend({},o),le(c,!0,!0),he("x",!1),W.resize(),Ot(d,"stage"),On(en,e,t),ne("fullscreenexit"))}function ue(t,e){j&&(t.removeClass("fotorama__shadows--left fotorama__shadows--right"),e&&!c&&t.addClass(e.replace(/^|\s/g," "+Le+"--")))}function le(t,e,n){e&&(Y.removeClass(Me),c=!1,St()),t&&t!==c&&(t.remove(),ne("unloadvideo")),n&&(ie(),re())}function ce(t){Y.toggleClass(Se,t)}function fe(t){var e,n;vt.flow||(n=(e=t?t.pageX:fe.x)&&!Bt(Vt(e))&&x.click,fe.p!==n&&G.toggleClass("fotorama__pointer",n)&&(fe.p=n,fe.x=e))}function de(e){clearTimeout(de.t),x.clicktransition&&x.clicktransition!==x.transition?setTimeout(function(){var t=x.transition;W.setOptions({transition:x.clicktransition}),P=t,de.t=setTimeout(function(){W.show(e)},10)},0):W.show(e)}function he(t,e){vt[t]=gt[t]=e}function me(t){de({index:_e(this).data().eq,slow:t.altKey,user:!0,coo:t._x-at.offset().left})}function pe(t){de({index:nt.index(this)?">":"<",slow:t.altKey,user:!0})}function ve(t){Wn(t,function(){setTimeout(function(){On(G)},0),ce(!1)})}function we(){var t;if(_=W.data=_||An(x.data)||Fn(s),C=W.size=_.length,!ye.ok&&x.shuffle&&qn(_),Tt(),mt=Pt(mt),C&&Mt(!0),function(){W.options=x=zn(x),M="crossfade"===x.transition||"dissolve"===x.transition,y=x.loop&&(2<C||M&&(!P||"slide"!==P)),E=+x.transitionduration||cn,N="rtl"===x.direction,$=_e.extend({},x.keyboard&&mn,x.keyboard);var t,e,n,o={add:[],remove:[]};function a(t,e){o[t?"add":"remove"].push(e)}1<C||x.enableifsingleframe?(b=x.nav,u="top"===x.navposition,o.remove.push(De),nt.toggle(!!x.arrows)):(b=!1,nt.hide()),zt(),r=new Ye(_e.extend(Ge,x.spinner,Je,{direction:N?-1:1})),Xt(),Qt(),x.autoplay&&Ft(x.autoplay),S=yn(x.thumbwidth)||64,F=yn(x.thumbheight)||64,wt.ok=yt.ok=x.trackpad&&!sn,St(),ee(x,[pt]),(T="thumbs"===b)?(Dt(C,"navThumb"),i=st,I=hn,t=Q,e=_e.Fotorama.jst.style({w:S,h:F,b:x.thumbborderwidth,m:x.thumbmargin,s:H,q:!an}),(n=t[0]).styleSheet?n.styleSheet.cssText=e:t.html(e),at.addClass(Oe).removeClass(Ae)):"dots"===b?(Dt(C,"navDot"),i=rt,I=dn,at.addClass(Ae).removeClass(Oe)):(b=!1,at.removeClass(Oe+" "+Ae)),b&&(u?ot.insertBefore(G):ot.insertAfter(G),Kt.nav=!1,Kt(i,it,"nav")),l=x.allowfullscreen,k=l?(lt.prependTo(G),rn&&"native"===l):(lt.detach(),!1),a(M,"fotorama__wrap--fade"),a(!M,"fotorama__wrap--slide"),a(!x.captions,"fotorama__wrap--no-captions"),a(N,"fotorama__wrap--rtl"),a("always"!==x.arrows,"fotorama__wrap--toggle-arrows"),a(!(j=x.shadows&&!sn),"fotorama__wrap--no-shadows"),Y.addClass(o.add.join(" ")).removeClass(o.remove.join(" ")),_e.extend({},x)}(),we.i||(we.i=!0,((t=x.startindex)||x.hash&&xe.hash)&&(a=Nn(t||xe.hash.replace(/^#/,""),_,0===W.index||t,t)),mt=h=m=p=a=jt(a)||0),C){if(ge())return;c&&le(c,!0),d=[],Zt(fn),we.ok=!0,W.show({index:mt,time:0}),W.resize()}else W.destroy()}function ge(){if(!ge.f===N)return ge.f=N,mt=C-1-mt,W.reverse(),!0}function ye(){ye.ok||(ye.ok=!0,ne("ready"))}Y[fn]=_e($n(Pe)),Y[hn]=_e($n(ze+" fotorama__nav__frame--thumb"+Qe,$n(Be))),Y[dn]=_e($n(ze+" fotorama__nav__frame--dot"+Qe,$n("fotorama__dot"))),bt[fn]=[],bt[hn]=[],bt[dn]=[],xt[fn]={},Y.addClass(on?"fotorama__wrap--css3":"fotorama__wrap--css2").toggleClass(Se,!x.controlsonstart),X.fotorama=this,W.startAutoplay=function(t){return W.autoplay||(O=n=!1,Ft(t||x.autoplay),re()),this},W.stopAutoplay=function(){return W.autoplay&&(O=n=!0,re()),this},W.show=function(e){var t;"object"!=typeof e?(t=e,e={}):t=e.index,t=">"===t?m+1:"<"===t?m-1:"<<"===t?0:">>"===t?C-1:t,t=void 0===(t=isNaN(t)?Nn(t,_,!0):t)?mt||0:t,W.activeIndex=mt=jt(t),v=Nt(mt),w=$t(mt),g=Et(mt+(N?-1:1)),d=[mt,v,w],m=y?t:mt;var n=Math.abs(p-m),o=Tn(e.time,function(){return Math.min(E*(1+(n-1)/12),2*E)}),a=e.overPos;e.slow&&(o*=10);var i=f;W.activeFrame=f=_[mt];var r=i===f&&!e.user;le(c,f.i!==_[Et(h)].i),Dt(d,"stage"),Wt(sn?[m]:[m,Nt(m),$t(m)]),he("go",!0),r||ne("show",{user:e.user,time:o}),O=!0;var s,u,l=W.show.onEnd=function(t){if(!l.ok){if(l.ok=!0,t||te(!0),r||ne("showend",{user:e.user}),!t&&P&&P!==x.transition)return W.setOptions({transition:P}),void(P=!1);Lt(),Ot(d,"stage"),he("go",!1),Qt(),fe(),ie(),re()}};return M?Bn(f[fn],mt!==p?_[p][fn]:null,Z,{time:o,method:x.transition,onEnd:l},Ct):Vn(J,{pos:-_n(m,pt.w,x.margin,h),overPos:a,time:o,onEnd:l}),Xt(),b&&(Jt(I),bt[I].push(f[I].addClass(Ie)),Gt({time:o,coo:(s=Pt(mt+vn(m-p,-1,1)))!==mt&&e.coo,guessIndex:void 0!==e.coo?s:mt,keep:r}),T&&Yt(o)),A=void 0!==p&&p!==mt,p=mt,x.hash&&A&&!W.eq&&(u=f.id||mt+1,xe.replace(xe.protocol+"//"+xe.host+xe.pathname.replace(/^\/?/,"/")+xe.search+"#"+u)),this},W.requestFullScreen=function(){return l&&!W.fullScreen&&(t=en.scrollTop(),e=en.scrollLeft(),On(en),he("x",!0),o=_e.extend({},pt),s.addClass(Re).appendTo(tn.addClass(Te)),Ze.addClass(Te),le(c,!0,!0),W.fullScreen=!0,k&&Ue.request(V),W.resize(),Ot(d,"stage"),Lt(),ne("fullscreenenter")),this},W.cancelFullScreen=function(){return k&&Ue.is()?Ue.cancel(be):se(),this},W.toggleFullScreen=function(){return W[(W.fullScreen?"cancel":"request")+"FullScreen"]()},In(be,Ue.event,function(){!_||Ue.is()||c||se()}),W.resize=function(t){if(!_)return this;var e=arguments[1]||0,n=arguments[2];ee(W.fullScreen?{width:"100%",maxwidth:null,minwidth:null,height:"100%",maxheight:null,minheight:null}:zn(t),[pt,n||W.fullScreen||x]);var o=pt.width,a=pt.height,i=pt.ratio,r=en.height()-(b?at.height():0);return xn(o)&&(Y.addClass(Fe).css({width:o,minWidth:pt.minwidth||0,maxWidth:pt.maxwidth||99999}),o=pt.W=pt.w=Y.width(),pt.nw=b&&bn(x.navwidth,o)||o,x.glimpse&&(pt.w-=Math.round(2*(bn(x.glimpse,o)||0))),J.css({width:pt.w,marginLeft:(pt.W-pt.w)/2}),(a=(a=bn(a,r))||i&&o/i)&&(o=Math.round(o),a=pt.h=Math.round(vn(a,bn(pt.minheight,r),bn(pt.maxheight,r))),G.stop().animate({width:o,height:a},e,function(){Y.removeClass(Fe)}),te(),b&&(at.stop().animate({width:pt.nw},e),Gt({guessIndex:mt,time:e,keep:!0}),T&&Kt.nav&&Yt(e)),q=n||!0,ye())),_t=G.offset().left,this},W.setOptions=function(t){return _e.extend(x,t),we(),this},W.shuffle=function(){return _&&qn(_)&&we(),this},W.destroy=function(){return W.cancelFullScreen(),W.stopAutoplay(),_=W.data=null,Mt(),d=[],Zt(fn),we.ok=!1,this},W.playVideo=function(){var t=f,e=t.video,n=mt;return"object"==typeof e&&t.videoReady&&(k&&W.fullScreen&&W.cancelFullScreen(),En(function(){return!Ue.is()||n!==mt},function(){n===mt&&(t.$video=t.$video||_e(_e.Fotorama.jst.video(e)),t.$video.appendTo(t[fn]),Y.addClass(Me),c=t.$video,St(),nt.blur(),lt.blur(),ne("loadvideo"))})),this},W.stopVideo=function(){return le(c,!0,!0),this},G.on("mousemove",fe),vt=Qn(J,{onStart:oe,onMove:function(t,e){ue(G,e.edge)},onTouchEnd:ae,onEnd:function(t){ue(G);var e,n,o,a,i,r,s,u,l=(un&&!L||t.touch)&&x.arrows&&"always"!==x.arrows;t.moved||l&&t.pos!==t.newPos&&!t.control?(i=t.newPos,r=pt.w,s=x.margin,u=h,e=-Math.round(i/(r+(s||0))-(u||0)),W.show({index:e,time:M?E:t.time,overPos:t.overPos,user:!0})):t.aborted||t.control||(n=t.startEvent,o=l,a=n.target,_e(a).hasClass(Xe)?W.playVideo():a===ct?W.toggleFullScreen():c?a===dt&&le(c,!0,!0):o?ce():x.click&&de({index:n.shiftKey||Kn(Vt(n._x)),slow:n.altKey,user:!0}))},timeLow:1,timeHigh:1,friction:2,select:"."+De+", ."+De+" *",$wrap:G}),gt=Qn(it,{onStart:oe,onMove:function(t,e){ue(at,e.edge)},onTouchEnd:ae,onEnd:function(t){function e(){Gt.l=t.newPos,ie(),re(),Ht(t.newPos,!0)}var n;t.moved?t.pos!==t.newPos?(O=!0,Vn(it,{time:t.time,pos:t.newPos,overPos:t.overPos,onEnd:e}),Ht(t.newPos),j&&ue(at,jn(t.newPos,gt.min,gt.max))):e():(n=t.$target.closest("."+ze,it)[0])&&me.call(n,t.startEvent)},timeLow:.5,timeHigh:2,friction:5,$wrap:at}),wt=Un(G,{shift:!0,onEnd:function(t,e){oe(),ae(),W.show({index:e,slow:t.altKey})}}),yt=Un(at,{onEnd:function(t,e){oe(),ae();var n=Cn(it)+.25*e;it.css(wn(vn(n,gt.min,gt.max))),j&&ue(at,jn(n,gt.min,gt.max)),yt.prevent={"<":n>=gt.max,">":n<=gt.min},clearTimeout(yt.t),yt.t=setTimeout(function(){Ht(Gt.l=n,!0)},ln),Ht(n)}}),Y.hover(function(){setTimeout(function(){z||ce(!(L=!0))},0)},function(){L&&ce(!(L=!1))}),D=function(t){Hn(t),pe.call(this,t)},R=(R={onStart:function(){oe(),vt.control=!0},onTouchEnd:ae})||{},nt.each(function(){var e,t=_e(this),n=t.data();n.clickOn||(n.clickOn=!0,_e.extend(Xn(t,{onStart:function(t){e=t,(R.onStart||pn).call(this,t)},onMove:R.onMove||pn,onTouchEnd:R.onTouchEnd||pn,onEnd:function(t){t.moved||D.call(this,e)}}),{noMove:!0}))}),nt.each(function(){Rn(this,function(t){pe.call(this,t)}),ve(this)}),Rn(ct,W.toggleFullScreen),ve(ct),_e.each("load push pop shift unshift reverse sort splice".split(" "),function(t,e){W[e]=function(){return _=_||[],"load"!==e?Array.prototype[e].apply(_,arguments):arguments[0]&&"object"==typeof arguments[0]&&arguments[0].length&&(_=An(arguments[0])),we(),W}}),we()},_e.fn.fotorama=function(a){return this.each(function(){var e=this,t=_e(this),n=t.data(),o=n.fotorama;o?o.setOptions(a,!0):En(function(){return!(0===(t=e).offsetWidth&&0===t.offsetHeight);var t},function(){n.urtext=t.html(),new _e.Fotorama(t,_e.extend({},_,i.fotoramaDefaults,a,n))})})},_e.Fotorama.instances=[],_e.Fotorama.cache={},_e.Fotorama.measures={},(_e=_e||{}).Fotorama=_e.Fotorama||{},_e.Fotorama.jst=_e.Fotorama.jst||{},_e.Fotorama.jst.style=function(t){var e,n="";return n+=".fotorama"+(null==(e=t.s)?"":e)+" .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:"+(null==(e=t.m)?"":e)+"px;\nheight:"+(null==(e=t.h)?"":e)+"px}\n.fotorama"+(null==(e=t.s)?"":e)+" .fotorama__thumb-border{\nheight:"+(null==(e=t.h-t.b*(t.q?0:2))?"":e)+"px;\nborder-width:"+(null==(e=t.b)?"":e)+"px;\nmargin-top:"+(null==(e=t.m)?"":e)+"px}"},_e.Fotorama.jst.video=function(t){var e="",n=Array.prototype.join;return e+='<div class="fotorama__video"><iframe src="',function(){e+=n.call(arguments,"")}(("youtube"==t.type?t.p+"youtube.com/embed/"+t.id+"?autoplay=1":"vimeo"==t.type?t.p+"player.vimeo.com/video/"+t.id+"?autoplay=1&badge=0":t.id)+(t.s&&"custom"!=t.type?"&"+t.s:"")),e+='" frameborder="0" allowfullscreen></iframe></div>\n'},_e(function(){_e("."+Ce+':not([data-auto="false"])').fotorama()})}(window,document,location,"undefined"!=typeof jQuery&&jQuery);

$(window).load(function()
{
	// Use window.load to prevent preloading issues.
	if ($(".fotorama").length > 0)
	{
		$.fn.showFotorama();
	}
});

$(document).ready(function()
{
	// Initialize.
	$.fn.initializeFotorama();

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		// After AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, e)
		{
			$.fn.initializeFotorama();

			if ($(".fotorama").length > 0)
			{
				$.fn.showFotorama();
			}
		});
	}
});

// Auto resizing Fotorama.
$.fn.autoResizingFotorama = function(fotoramaData)
{
	return $(".fotorama").fotorama({data: fotoramaData}).on("fotorama:show", function(event, fotorama)
	{
		var frame = fotorama.activeFrame.$stageFrame;
		var img = frame.find(".fotorama__img");

		// Set image to max size within frame and reposition.
		img.css({width: frame.width(), height: "auto", left: 0, top: 0});
	}).on("fotorama:showend fotorama:fullscreenexit", function(event, fotorama)
	{
		var frame = fotorama.activeFrame.$stageFrame;

		// Check if frame is already loaded.
		if (!frame.data("state"))
		{
			// Wait until frame is loaded.
			frame.on("f:load", function()
			{
				$.fn.resizeFotoramaImages(fotorama);
			});
		}
		else
		{
			$.fn.resizeFotoramaImages(fotorama);
		}
	}).on("fotorama:show fotorama:fullscreenenter", function (event, fotorama)
	{
		if(fotorama.fullScreen)
		{
			$.fn.resizeFotoramaImages(fotorama);
		}
	}).on("fotorama:ready", function (event, fotorama)
	{
		$(".fotorama__arr--prev").html('<span class="screenReaderContent">' + settings.various.previousText + '</span>');
		$(".fotorama__arr--next").html('<span class="screenReaderContent">' + settings.various.nextText + '</span>');
	});
};

// Resize Fotorama images.
$.fn.resizeFotoramaImages = function(fotorama)
{
	var frame = fotorama.activeFrame.$stageFrame;
	var img = frame.find(".fotorama__img");

	// Set image to max size within frame.
	img.css({ width: frame.width(), height: "auto", marginLeft: 0, top: 0, marginTop: 0 });

	if (fotorama.fullScreen)
	{
		img.css({ top: "50%", marginTop: -(img.height() / 2) });

		if (frame.height() < img.height())
		{
			img.css({ width: "auto", height: frame.height(), top: 0, marginTop: 0 });
			img.css({ left: "50%", marginLeft: -(img.width() / 2) });
		}
	}

	// Resize Fotorama frame.
	fotorama.resize({height: img.height()}, 500);
};

// Initialize Fotorama.
$.fn.initializeFotorama = function()
{
	// Photo slider.
	if ($(".fotorama img").length > 0)
	{
		$(".photos").removeClass("hide");
		$(".photos .loader").show();

		var fotoramaData = [];
		var handlerStorage = {};

		$(".fotorama img").each(function(i)
		{
			if ($(this).parents(".photo").length == 0)
			{
				$(this).wrap("<div class=\"photo\"></div>");
			}

			var photo = $(this).parents(".photo");
			var caption = $("<div class=\"fotoramaCaption hide\" />");
			var captionColor = settings.colors.header;

			if (captionColor == "")
			{
				if ($('html').hasClass('threedotfive'))
					captionColor = '#333f52';
				else
					captionColor = settings.colors.links;
			}

			if (photo.find(".caption").length > 0 || photo.find(".toolbar .button").length > 0)
			{
				var captionTextOpacity = 0.7;

				if (settings.webGuidelines)
					captionTextOpacity = 0.85;

				// Set caption background color.
				caption.setColor(
				{
					color:		captionColor,
					opacity:	captionTextOpacity
				});

				if (photo.find(".caption").length > 0 && photo.find(".caption").html().indexOf("span") == -1)
				{
					caption.append(photo.find(".caption"));
				}

				if (photo.find(".toolbar .button").length > 0)
				{
					// Download button.
					if (photo.find(".button.download a").length > 0) {
						photo.find(".button.download").removeClass("hide");
					}


					// Comment button.
					if (photo.find(".commentCount").length > 0)
					{
						photo.find(".commentCount").attr("href", photo.find(".itemImageLink").attr("href") + "#comments");
					}

					if (photo.find(".itemViews").length > 0)
					{
						photo.find(".itemViews > a").attr('href', photo.find('.itemImageLink').attr('href'));
					}

					caption.append(photo.find(".toolbar").show());
				}

				caption.removeClass("hide");
			}

			// Make buttons in caption work with Webguidelines enabled.
			// First get all items within the current caption that have an ID.
			caption.find("[id]").each(function(j)
			{
				var currentObject = $(this);
				var currentID = currentObject.attr("id");

				// Get all event handlers for this objects from jQuery.
				var eventHandlerObject = $._data(currentObject[0], "events");

				if (typeof eventHandlerObject != "undefined" && eventHandlerObject != null)
				{
					// Add the handlers to a store object.
					handlerStorage[currentID] = eventHandlerObject;
				}
			});

			fotoramaData.push(
			{
				img: 		photo.find("img").attr("src"),
				caption:	caption.get(0).outerHTML,
				alt:		photo.find('img').attr('alt')
			});
		});

		var rebindEventHandlers = function (event, fotorama)
		{
			// Set all handlers to moved objects again to work with Webguidelines.
			$.each(handlerStorage, function(objectID, events)
			{
				$.each(events, function(eventName, handlers)
				{
					$.each(handlers, function()
					{
						$("#" + objectID).unbind(eventName).bind(eventName, this);
					});
				});
			});
		};

		// Initialize Fotorama.
		$(".fotorama").autoResizingFotorama(fotoramaData).on("fotorama:ready", rebindEventHandlers).on("fotorama:showend", rebindEventHandlers);
		$(".fotorama").implementKeyboardFixesFotorama();
		$(".fotorama").initThumbsFotorama();
	}
};

$.fn.implementKeyboardFixesFotorama = function () {
	$(this).each(function () {
		var currentFotorama = $(this);

		var hideInactiveFrames = function () {
			currentFotorama.find(".fotorama__stage__frame:not(.fotorama__active)").css("visibility", "hidden");
		};

		var showAllFrames = function () {
			currentFotorama.find(".fotorama__stage__frame").css("visibility", "visible");
		};

		currentFotorama
			.on("fotorama:ready", hideInactiveFrames)
			.on("fotorama:showend", hideInactiveFrames)
			.on("fotorama:show", showAllFrames);
	});

	return $(this);
}

// Show Fotorama.
$.fn.showFotorama = function()
{
	// Hide loader.
	$(".photos .loader").hide();

	// Show Fotorama.
	$(".fotorama").removeClass("invisible");

	$('.fotorama__fullscreen-icon').attr('aria-label', settings.images.openImageFullscreenText);
	$('.fotorama__arr--prev').attr('aria-label', settings.images.goToPreviousImageText);
	$('.fotorama__arr--next').attr('aria-label', settings.images.goToNextImageText);

	$('.ContentItemDelete').unbind('click').click(function(event)
	{
		var itemTitle = $.trim($(this).closest('.fotoramaCaption').find('> a.caption').text());
		return $(this).confirm(settings.warnings.deleteItemText.replace("{0}", "\"<span class=\"strong\">" + itemTitle + "</span>\"").replace("{1}", settings.cms.daysInTrash));
	});
};

$.fn.initThumbsFotorama = function () {
	$(this).each(function () {
		var currentFotorama = $(this);

		var updateThumbs = function () {
			currentFotorama.find(".fotorama__nav__frame--thumb").each(function (index) {
				var currentThumb = $(this);
				currentThumb.attr("aria-label", settings.slider.photoText + " " + (index + 1));
				currentThumb.attr("aria-selected", currentThumb.hasClass("fotorama__active").toString());
			});
		};

		currentFotorama.on("fotorama:showend", updateThumbs);

		updateThumbs();
	});

	return $(this);
}
