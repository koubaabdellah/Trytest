"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[5861,8787,380],{8787:(e,t,n)=>{n.r(t),n.d(t,{C:()=>i,T:()=>a,a:()=>u,b:()=>f,c:()=>v,d:()=>l,e:()=>c,f:()=>g,g:()=>w,h:()=>h,i:()=>y,j:()=>j,k:()=>O,n:()=>s,q:()=>m,s:()=>A})
var r=n(380),o=function(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o])
return e.concat(r||Array.prototype.slice.call(t))},i={autoTheme:"calcite-theme-auto",darkTheme:"calcite-theme-dark",lightTheme:"calcite-theme-light",rtl:"calcite--rtl"},a={loading:"Loading"}
function c(e){return e?e.id=e.id||"".concat(e.tagName.toLowerCase(),"-").concat((0,r.g)()):""}function s(e){return Array.isArray(e)?e:Array.from(e)}function f(e){var t=v(e,".".concat(i.darkTheme,", .").concat(i.lightTheme))
return(null==t?void 0:t.classList.contains("calcite-theme-dark"))?"dark":"light"}function u(e){var t=v(e,"[".concat("dir","]"))
return t?t.getAttribute("dir"):"ltr"}function l(e,t,n){var r="[".concat(t,"]"),o=e.closest(r)
return o?o.getAttribute(t):n}function p(e){return e.getRootNode()}function d(e){return e.host||null}function h(e,t){return function e(n,r){if(!n)return r
n.assignedSlot&&(n=n.assignedSlot)
var i=p(n),a=Array.from(i.querySelectorAll(t)).filter((function(e){return!r.includes(e)}))
r=o(o([],r,!0),a,!0)
var c=d(i)
return c?e(c,r):r}(e,[])}function m(e,t){var n=t.selector,r=t.id
return function e(t){if(!t)return null
t.assignedSlot&&(t=t.assignedSlot)
var o=p(t),i=r?o.getElementById(r):n?o.querySelector(n):null,a=d(o)
return i||(a?e(a):null)}(e)}function v(e,t){return function e(n){return n?n.closest(t)||e(d(p(n))):null}(e)}function y(e){return"function"==typeof(null==e?void 0:e.setFocus)}function g(e){return function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(t,n){function i(e){try{c(r.next(e))}catch(e){n(e)}}function a(e){try{c(r.throw(e))}catch(e){n(e)}}function c(e){e.done?t(e.value):o(e.value).then(i,a)}c((r=r.apply(e,[])).next())}))}(this,0,void 0,(function(){return function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function c(e){return function(t){return s([e,t])}}function s(i){if(n)throw new TypeError("Generator is already executing.")
for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return a.label++,{value:i[1],done:!1}
case 5:a.label++,r=i[1],i=[0]
continue
case 7:i=a.ops.pop(),a.trys.pop()
continue
default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1]
break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i
break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i)
break}o[2]&&a.ops.pop(),a.trys.pop()
continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}}(this,(function(t){return e?[2,y(e)?e.setFocus():e.focus()]:[2]}))}))}var b=":not([slot])"
function w(e,t,n){t&&!Array.isArray(t)&&"string"!=typeof t&&(n=t,t=null)
var r=t?Array.isArray(t)?t.map((function(e){return'[slot="'.concat(e,'"]')})).join(","):'[slot="'.concat(t,'"]'):b
return(null==n?void 0:n.all)?function(e,t,n){var r=t===b?x(e,b):Array.from(e.querySelectorAll(t))
r=n&&!1===n.direct?r:r.filter((function(t){return t.parentElement===e})),r=(null==n?void 0:n.matches)?r.filter((function(e){return null==e?void 0:e.matches(n.matches)})):r
var i=null==n?void 0:n.selector
return i?r.map((function(e){return Array.from(e.querySelectorAll(i))})).reduce((function(e,t){return o(o([],e,!0),t,!0)}),[]).filter((function(e){return!!e})):r}(e,r,n):function(e,t,n){var r=t===b?x(e,b)[0]||null:e.querySelector(t)
r=n&&!1===n.direct||(null==r?void 0:r.parentElement)===e?r:null,r=(null==n?void 0:n.matches)?(null==r?void 0:r.matches(n.matches))?r:null:r
var o=null==n?void 0:n.selector
return o?null==r?void 0:r.querySelector(o):r}(e,r,n)}function x(e,t){return e?Array.from(e.children||[]).filter((function(e){return null==e?void 0:e.matches(t)})):[]}function O(e,t){return Array.from(e.children).filter((function(e){return e.matches(t)}))}function A(e,t,n){return"string"==typeof t&&""!==t?t:""===t?e[n]:void 0}function j(e,t){return!(t.left>e.right||t.right<e.left||t.top>e.bottom||t.bottom<e.top)}},380:(e,t,n)=>{n.r(t),n.d(t,{g:()=>r})
var r=function(){return[2,1,1,1,3].map((function(e){for(var t="",n=0;n<e;n++)t+=(65536*(1+Math.random())|0).toString(16).substring(1)
return t})).join("-")}},5861:(e,t,n)=>{n.r(t),n.d(t,{C:()=>be,c:()=>xe,d:()=>Ae,u:()=>Oe})
var r=n(8787),o="top",i="bottom",a="right",c="left",s="auto",f=[o,i,a,c],u="start",l="end",p="viewport",d="popper",h=f.reduce((function(e,t){return e.concat([t+"-"+u,t+"-"+l])}),[]),m=[].concat(f,[s]).reduce((function(e,t){return e.concat([t,t+"-"+u,t+"-"+l])}),[]),v=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"]
function y(e){return e?(e.nodeName||"").toLowerCase():null}function g(e){if(null==e)return window
if("[object Window]"!==e.toString()){var t=e.ownerDocument
return t&&t.defaultView||window}return e}function b(e){return e instanceof g(e).Element||e instanceof Element}function w(e){return e instanceof g(e).HTMLElement||e instanceof HTMLElement}function x(e){return"undefined"!=typeof ShadowRoot&&(e instanceof g(e).ShadowRoot||e instanceof ShadowRoot)}var O={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state
Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},o=t.elements[e]
w(o)&&y(o)&&(Object.assign(o.style,n),Object.keys(r).forEach((function(e){var t=r[e]
!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}}
return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],o=t.attributes[e]||{},i=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{})
w(r)&&y(r)&&(Object.assign(r.style,i),Object.keys(o).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]}
function A(e){return e.split("-")[0]}var j=Math.max,k=Math.min,E=Math.round
function D(e,t){void 0===t&&(t=!1)
var n=e.getBoundingClientRect(),r=1,o=1
if(w(e)&&t){var i=e.offsetHeight,a=e.offsetWidth
a>0&&(r=E(n.width)/a||1),i>0&&(o=E(n.height)/i||1)}return{width:n.width/r,height:n.height/o,top:n.top/o,right:n.right/r,bottom:n.bottom/o,left:n.left/r,x:n.left/r,y:n.top/o}}function S(e){var t=D(e),n=e.offsetWidth,r=e.offsetHeight
return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function L(e,t){var n=t.getRootNode&&t.getRootNode()
if(e.contains(t))return!0
if(n&&x(n)){var r=t
do{if(r&&e.isSameNode(r))return!0
r=r.parentNode||r.host}while(r)}return!1}function M(e){return g(e).getComputedStyle(e)}function T(e){return["table","td","th"].indexOf(y(e))>=0}function P(e){return((b(e)?e.ownerDocument:e.document)||window.document).documentElement}function W(e){return"html"===y(e)?e:e.assignedSlot||e.parentNode||(x(e)?e.host:null)||P(e)}function q(e){return w(e)&&"fixed"!==M(e).position?e.offsetParent:null}function B(e){for(var t=g(e),n=q(e);n&&T(n)&&"static"===M(n).position;)n=q(n)
return n&&("html"===y(n)||"body"===y(n)&&"static"===M(n).position)?t:n||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox")
if(-1!==navigator.userAgent.indexOf("Trident")&&w(e)&&"fixed"===M(e).position)return null
for(var n=W(e);w(n)&&["html","body"].indexOf(y(n))<0;){var r=M(n)
if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n
n=n.parentNode}return null}(e)||t}function C(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function H(e,t,n){return j(e,k(t,n))}function R(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function _(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}var V={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,s=e.options,u=n.elements.arrow,l=n.modifiersData.popperOffsets,p=A(n.placement),d=C(p),h=[c,a].indexOf(p)>=0?"height":"width"
if(u&&l){var m=function(e,t){return R("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:_(e,f))}(s.padding,n),v=S(u),y="y"===d?o:c,g="y"===d?i:a,b=n.rects.reference[h]+n.rects.reference[d]-l[d]-n.rects.popper[h],w=l[d]-n.rects.reference[d],x=B(u),O=x?"y"===d?x.clientHeight||0:x.clientWidth||0:0,j=b/2-w/2,k=m[y],E=O-v[h]-m[g],D=O/2-v[h]/2+j,L=H(k,D,E),M=d
n.modifiersData[r]=((t={})[M]=L,t.centerOffset=L-D,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n
null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&L(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]}
function N(e){return e.split("-")[1]}var F={top:"auto",right:"auto",bottom:"auto",left:"auto"}
function I(e){var t,n=e.popper,r=e.popperRect,s=e.placement,f=e.variation,u=e.offsets,p=e.position,d=e.gpuAcceleration,h=e.adaptive,m=e.roundOffsets,v=e.isFixed,y=u.x,b=void 0===y?0:y,w=u.y,x=void 0===w?0:w,O="function"==typeof m?m({x:b,y:x}):{x:b,y:x}
b=O.x,x=O.y
var A=u.hasOwnProperty("x"),j=u.hasOwnProperty("y"),k=c,D=o,S=window
if(h){var L=B(n),T="clientHeight",W="clientWidth"
L===g(n)&&"static"!==M(L=P(n)).position&&"absolute"===p&&(T="scrollHeight",W="scrollWidth"),(s===o||(s===c||s===a)&&f===l)&&(D=i,x-=(v&&S.visualViewport?S.visualViewport.height:L[T])-r.height,x*=d?1:-1),s!==c&&(s!==o&&s!==i||f!==l)||(k=a,b-=(v&&S.visualViewport?S.visualViewport.width:L[W])-r.width,b*=d?1:-1)}var q,C=Object.assign({position:p},h&&F),H=!0===m?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1
return{x:E(t*r)/r||0,y:E(n*r)/r||0}}({x:b,y:x}):{x:b,y:x}
return b=H.x,x=H.y,d?Object.assign({},C,((q={})[D]=j?"0":"",q[k]=A?"0":"",q.transform=(S.devicePixelRatio||1)<=1?"translate("+b+"px, "+x+"px)":"translate3d("+b+"px, "+x+"px, 0)",q)):Object.assign({},C,((t={})[D]=j?x+"px":"",t[k]=A?b+"px":"",t.transform="",t))}var U={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,c=n.roundOffsets,s=void 0===c||c,f={placement:A(t.placement),variation:N(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy}
null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,I(Object.assign({},f,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:s})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,I(Object.assign({},f,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},z={passive:!0},G={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,r=e.options,o=r.scroll,i=void 0===o||o,a=r.resize,c=void 0===a||a,s=g(t.elements.popper),f=[].concat(t.scrollParents.reference,t.scrollParents.popper)
return i&&f.forEach((function(e){e.addEventListener("scroll",n.update,z)})),c&&s.addEventListener("resize",n.update,z),function(){i&&f.forEach((function(e){e.removeEventListener("scroll",n.update,z)})),c&&s.removeEventListener("resize",n.update,z)}},data:{}},X={left:"right",right:"left",bottom:"top",top:"bottom"}
function Y(e){return e.replace(/left|right|bottom|top/g,(function(e){return X[e]}))}var J={start:"end",end:"start"}
function K(e){return e.replace(/start|end/g,(function(e){return J[e]}))}function Q(e){var t=g(e)
return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Z(e){return D(P(e)).left+Q(e).scrollLeft}function $(e){var t=M(e),n=t.overflow,r=t.overflowX,o=t.overflowY
return/auto|scroll|overlay|hidden/.test(n+o+r)}function ee(e){return["html","body","#document"].indexOf(y(e))>=0?e.ownerDocument.body:w(e)&&$(e)?e:ee(W(e))}function te(e,t){var n
void 0===t&&(t=[])
var r=ee(e),o=r===(null==(n=e.ownerDocument)?void 0:n.body),i=g(r),a=o?[i].concat(i.visualViewport||[],$(r)?r:[]):r,c=t.concat(a)
return o?c:c.concat(te(W(a)))}function ne(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function re(e,t){return t===p?ne(function(e){var t=g(e),n=P(e),r=t.visualViewport,o=n.clientWidth,i=n.clientHeight,a=0,c=0
return r&&(o=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(a=r.offsetLeft,c=r.offsetTop)),{width:o,height:i,x:a+Z(e),y:c}}(e)):b(t)?function(e){var t=D(e)
return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):ne(function(e){var t,n=P(e),r=Q(e),o=null==(t=e.ownerDocument)?void 0:t.body,i=j(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),a=j(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),c=-r.scrollLeft+Z(e),s=-r.scrollTop
return"rtl"===M(o||n).direction&&(c+=j(n.clientWidth,o?o.clientWidth:0)-i),{width:i,height:a,x:c,y:s}}(P(e)))}function oe(e){var t,n=e.reference,r=e.element,s=e.placement,f=s?A(s):null,p=s?N(s):null,d=n.x+n.width/2-r.width/2,h=n.y+n.height/2-r.height/2
switch(f){case o:t={x:d,y:n.y-r.height}
break
case i:t={x:d,y:n.y+n.height}
break
case a:t={x:n.x+n.width,y:h}
break
case c:t={x:n.x-r.width,y:h}
break
default:t={x:n.x,y:n.y}}var m=f?C(f):null
if(null!=m){var v="y"===m?"height":"width"
switch(p){case u:t[m]=t[m]-(n[v]/2-r[v]/2)
break
case l:t[m]=t[m]+(n[v]/2-r[v]/2)}}return t}function ie(e,t){void 0===t&&(t={})
var n=t,r=n.placement,c=void 0===r?e.placement:r,s=n.boundary,u=void 0===s?"clippingParents":s,l=n.rootBoundary,h=void 0===l?p:l,m=n.elementContext,v=void 0===m?d:m,g=n.altBoundary,x=void 0!==g&&g,O=n.padding,A=void 0===O?0:O,E=R("number"!=typeof A?A:_(A,f)),S=v===d?"reference":d,T=e.rects.popper,q=e.elements[x?S:v],C=function(e,t,n){var r="clippingParents"===t?function(e){var t=te(W(e)),n=["absolute","fixed"].indexOf(M(e).position)>=0&&w(e)?B(e):e
return b(n)?t.filter((function(e){return b(e)&&L(e,n)&&"body"!==y(e)})):[]}(e):[].concat(t),o=[].concat(r,[n]),i=o[0],a=o.reduce((function(t,n){var r=re(e,n)
return t.top=j(r.top,t.top),t.right=k(r.right,t.right),t.bottom=k(r.bottom,t.bottom),t.left=j(r.left,t.left),t}),re(e,i))
return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}(b(q)?q:q.contextElement||P(e.elements.popper),u,h),H=D(e.elements.reference),V=oe({reference:H,element:T,strategy:"absolute",placement:c}),N=ne(Object.assign({},T,V)),F=v===d?N:H,I={top:C.top-F.top+E.top,bottom:F.bottom-C.bottom+E.bottom,left:C.left-F.left+E.left,right:F.right-C.right+E.right},U=e.modifiersData.offset
if(v===d&&U){var z=U[c]
Object.keys(I).forEach((function(e){var t=[a,i].indexOf(e)>=0?1:-1,n=[o,i].indexOf(e)>=0?"y":"x"
I[e]+=z[n]*t}))}return I}var ae={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name
if(!t.modifiersData[r]._skip){for(var l=n.mainAxis,p=void 0===l||l,d=n.altAxis,v=void 0===d||d,y=n.fallbackPlacements,g=n.padding,b=n.boundary,w=n.rootBoundary,x=n.altBoundary,O=n.flipVariations,j=void 0===O||O,k=n.allowedAutoPlacements,E=t.options.placement,D=A(E),S=y||(D!==E&&j?function(e){if(A(e)===s)return[]
var t=Y(e)
return[K(e),t,K(t)]}(E):[Y(E)]),L=[E].concat(S).reduce((function(e,n){return e.concat(A(n)===s?function(e,t){void 0===t&&(t={})
var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,c=n.flipVariations,s=n.allowedAutoPlacements,u=void 0===s?m:s,l=N(r),p=l?c?h:h.filter((function(e){return N(e)===l})):f,d=p.filter((function(e){return u.indexOf(e)>=0}))
0===d.length&&(d=p)
var v=d.reduce((function(t,n){return t[n]=ie(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[A(n)],t}),{})
return Object.keys(v).sort((function(e,t){return v[e]-v[t]}))}(t,{placement:n,boundary:b,rootBoundary:w,padding:g,flipVariations:j,allowedAutoPlacements:k}):n)}),[]),M=t.rects.reference,T=t.rects.popper,P=new Map,W=!0,q=L[0],B=0;B<L.length;B++){var C=L[B],H=A(C),R=N(C)===u,_=[o,i].indexOf(H)>=0,V=_?"width":"height",F=ie(t,{placement:C,boundary:b,rootBoundary:w,altBoundary:x,padding:g}),I=_?R?a:c:R?i:o
M[V]>T[V]&&(I=Y(I))
var U=Y(I),z=[]
if(p&&z.push(F[H]<=0),v&&z.push(F[I]<=0,F[U]<=0),z.every((function(e){return e}))){q=C,W=!1
break}P.set(C,z)}if(W)for(var G=function(e){var t=L.find((function(t){var n=P.get(t)
if(n)return n.slice(0,e).every((function(e){return e}))}))
if(t)return q=t,"break"},X=j?3:1;X>0&&"break"!==G(X);X--);t.placement!==q&&(t.modifiersData[r]._skip=!0,t.placement=q,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}}
function ce(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function se(e){return[o,a,i,c].some((function(t){return e[t]>=0}))}var fe={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=ie(t,{elementContext:"reference"}),c=ie(t,{altBoundary:!0}),s=ce(a,r),f=ce(c,o,i),u=se(s),l=se(f)
t.modifiersData[n]={referenceClippingOffsets:s,popperEscapeOffsets:f,isReferenceHidden:u,hasPopperEscaped:l},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":l})}},ue={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,i=n.offset,s=void 0===i?[0,0]:i,f=m.reduce((function(e,n){return e[n]=function(e,t,n){var r=A(e),i=[c,o].indexOf(r)>=0?-1:1,s="function"==typeof n?n(Object.assign({},t,{placement:e})):n,f=s[0],u=s[1]
return f=f||0,u=(u||0)*i,[c,a].indexOf(r)>=0?{x:u,y:f}:{x:f,y:u}}(n,t.rects,s),e}),{}),u=f[t.placement],l=u.x,p=u.y
null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=p),t.modifiersData[r]=f}},le={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name
t.modifiersData[n]=oe({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},pe={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,s=n.mainAxis,f=void 0===s||s,l=n.altAxis,p=void 0!==l&&l,d=n.boundary,h=n.rootBoundary,m=n.altBoundary,v=n.padding,y=n.tether,g=void 0===y||y,b=n.tetherOffset,w=void 0===b?0:b,x=ie(t,{boundary:d,rootBoundary:h,padding:v,altBoundary:m}),O=A(t.placement),E=N(t.placement),D=!E,L=C(O),M=function(e){return"x"===e?"y":"x"}(L),T=t.modifiersData.popperOffsets,P=t.rects.reference,W=t.rects.popper,q="function"==typeof w?w(Object.assign({},t.rects,{placement:t.placement})):w,R="number"==typeof q?{mainAxis:q,altAxis:q}:Object.assign({mainAxis:0,altAxis:0},q),_=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0}
if(T){if(f){var F,I="y"===L?o:c,U="y"===L?i:a,z="y"===L?"height":"width",G=T[L],X=G+x[I],Y=G-x[U],J=g?-W[z]/2:0,K=E===u?P[z]:W[z],Q=E===u?-W[z]:-P[z],Z=t.elements.arrow,$=g&&Z?S(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[I],ne=ee[U],re=H(0,P[z],$[z]),oe=D?P[z]/2-J-re-te-R.mainAxis:K-re-te-R.mainAxis,ae=D?-P[z]/2+J+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ce=t.elements.arrow&&B(t.elements.arrow),se=ce?"y"===L?ce.clientTop||0:ce.clientLeft||0:0,fe=null!=(F=null==_?void 0:_[L])?F:0,ue=G+ae-fe,le=H(g?k(X,G+oe-fe-se):X,G,g?j(Y,ue):Y)
T[L]=le,V[L]=le-G}if(p){var pe,de="x"===L?o:c,he="x"===L?i:a,me=T[M],ve="y"===M?"height":"width",ye=me+x[de],ge=me-x[he],be=-1!==[o,c].indexOf(O),we=null!=(pe=null==_?void 0:_[M])?pe:0,xe=be?ye:me-P[ve]-W[ve]-we+R.altAxis,Oe=be?me+P[ve]+W[ve]-we-R.altAxis:ge,Ae=g&&be?function(e,t,n){var r=H(e,t,n)
return r>n?n:r}(xe,me,Oe):H(g?xe:ye,me,g?Oe:ge)
T[M]=Ae,V[M]=Ae-me}t.modifiersData[r]=V}},requiresIfExists:["offset"]}
function de(e,t,n){void 0===n&&(n=!1)
var r=w(t),o=w(t)&&function(e){var t=e.getBoundingClientRect(),n=E(t.width)/e.offsetWidth||1,r=E(t.height)/e.offsetHeight||1
return 1!==n||1!==r}(t),i=P(t),a=D(e,o),c={scrollLeft:0,scrollTop:0},s={x:0,y:0}
return(r||!r&&!n)&&(("body"!==y(t)||$(i))&&(c=function(e){return e!==g(e)&&w(e)?function(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}(e):Q(e)}(t)),w(t)?((s=D(t,!0)).x+=t.clientLeft,s.y+=t.clientTop):i&&(s.x=Z(i))),{x:a.left+c.scrollLeft-s.x,y:a.top+c.scrollTop-s.y,width:a.width,height:a.height}}function he(e){var t=new Map,n=new Set,r=[]
function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e)
r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function me(e){var t
return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var ve={placement:"bottom",modifiers:[],strategy:"absolute"}
function ye(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}var ge=function(e){void 0===e&&(e={})
var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,i=void 0===o?ve:o
return function(e,t,n){void 0===n&&(n=i)
var o={placement:"bottom",orderedModifiers:[],options:Object.assign({},ve,i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},a=[],c=!1,s={state:o,setOptions:function(n){var a="function"==typeof n?n(o.options):n
u(),o.options=Object.assign({},i,o.options,a),o.scrollParents={reference:b(e)?te(e):e.contextElement?te(e.contextElement):[],popper:te(t)}
var c=function(e){var t=he(e)
return v.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name]
return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{})
return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,o.options.modifiers)))
return o.orderedModifiers=c.filter((function(e){return e.enabled})),f(),s.update()},forceUpdate:function(){if(!c){var e=o.elements,t=e.reference,n=e.popper
if(ye(t,n)){o.rects={reference:de(t,B(n),"fixed"===o.options.strategy),popper:S(n)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach((function(e){return o.modifiersData[e.name]=Object.assign({},e.data)}))
for(var r=0;r<o.orderedModifiers.length;r++)if(!0!==o.reset){var i=o.orderedModifiers[r],a=i.fn,f=i.options,u=void 0===f?{}:f,l=i.name
"function"==typeof a&&(o=a({state:o,options:u,name:l,instance:s})||o)}else o.reset=!1,r=-1}}},update:me((function(){return new Promise((function(e){s.forceUpdate(),e(o)}))})),destroy:function(){u(),c=!0}}
if(!ye(e,t))return s
function f(){o.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,i=e.effect
if("function"==typeof i){var c=i({state:o,name:t,instance:s,options:r})
a.push(c||function(){})}}))}function u(){a.forEach((function(e){return e()})),a=[]}return s.setOptions(n).then((function(e){!c&&n.onFirstUpdate&&n.onFirstUpdate(e)})),s}}({defaultModifiers:[G,le,U,O,ue,ae,pe,V,fe]}),be={animation:"calcite-popper-anim",animationActive:"calcite-popper-anim--active"}
function we(e,t){var n=["left","right"],o=["start","end"]
return"rtl"===(0,r.a)(e)&&(n.reverse(),o.reverse()),t.replace(/-leading/gi,"-".concat(o[0])).replace(/-trailing/gi,"-".concat(o[1])).replace(/leading/gi,n[0]).replace(/trailing/gi,n[1])}function xe(e){var t=e.referenceEl,n=e.el,r=e.placement,o=e.overlayPositioning,i=void 0===o?"absolute":o,a=e.modifiers
return t?ge(t,n,{strategy:i,placement:we(n,r),modifiers:a}):null}function Oe(e){var t=e.el,n=e.modifiers,r=e.placement,o=e.popper
return function(e,t,n,r){function o(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(t,n){function i(e){try{c(r.next(e))}catch(e){n(e)}}function a(e){try{c(r.throw(e))}catch(e){n(e)}}function c(e){e.done?t(e.value):o(e.value).then(i,a)}c((r=r.apply(e,[])).next())}))}(this,0,void 0,(function(){var e
return function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1]
return o[1]},trys:[],ops:[]}
return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i
function c(e){return function(t){return s([e,t])}}function s(i){if(n)throw new TypeError("Generator is already executing.")
for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o
switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i
break
case 4:return a.label++,{value:i[1],done:!1}
case 5:a.label++,r=i[1],i=[0]
continue
case 7:i=a.ops.pop(),a.trys.pop()
continue
default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0
continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1]
break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i
break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i)
break}o[2]&&a.ops.pop(),a.trys.pop()
continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1]
return{value:i[0]?i[1]:void 0,done:!0}}}(this,(function(i){switch(i.label){case 0:return e=we(t,r),[4,o.setOptions({modifiers:n,placement:e})]
case 1:return i.sent(),[2]}}))}))}var Ae=Math.ceil(Math.sqrt(Math.pow(4,2)+Math.pow(4,2)))}}])
