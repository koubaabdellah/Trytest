define((function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=790)}({0:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"a",(function(){return i})),n.d(t,"f",(function(){return c})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return a})),n.d(t,"e",(function(){return f})),n.d(t,"g",(function(){return p}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)};function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function c(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}function u(e,t,n,r){var o,i=arguments.length,c=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var u=e.length-1;u>=0;u--)(o=e[u])&&(c=(i<3?o(c):i>3?o(t,n,c):o(t,n))||c);return i>3&&c&&Object.defineProperty(t,n,c),c}function a(e,t,n,r){return new(n||(n=Promise))((function(o,i){function c(e){try{a(r.next(e))}catch(e){i(e)}}function u(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,u)}a((r=r.apply(e,t||[])).next())}))}function f(e,t){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=c.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}Object.create;function p(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e}Object.create},16:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(0);function o(e){return function t(){for(var n=this,o=[],i=0;i<arguments.length;i++)o[i]=arguments[i];return o.length>=e.length?e.call.apply(e,Object(r.g)([this],o)):function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return t.call.apply(t,Object(r.g)(Object(r.g)([n],o),e))}}}},429:function(e,t,n){!function(e){"use strict";var t,n="http://www.w3.org/2000/svg",r=[],o=function(e,t){var n={};return Object.keys(e).forEach((function(t){n[t]=e[t]})),t&&Object.keys(t).forEach((function(e){n[e]=t[e]})),n},i=function(e,t){return e.vnodeSelector===t.vnodeSelector&&(e.properties&&t.properties?e.properties.key===t.properties.key&&e.properties.bind===t.properties.bind:!e.properties&&!t.properties)},c=function(e){if("string"!=typeof e)throw new Error("Style values must be strings")},u=function(e,t,n){if(""!==t.vnodeSelector)for(var r=n;r<e.length;r++)if(i(e[r],t))return r;return-1},a=function(e,t,n,r){var o=e[t];if(""!==o.vnodeSelector){var c=o.properties;if(!(c?void 0===c.key?c.bind:c.key:void 0))for(var u=0;u<e.length;u++)if(u!==t){var a=e[u];if(i(a,o))throw new Error(n.vnodeSelector+" had a "+o.vnodeSelector+" child "+("added"===r?r:"removed")+", but there is now more than one. You must add unique key properties to make them distinguishable.")}}},f=function(e){if(e.properties){var t=e.properties.enterAnimation;t&&t(e.domNode,e.properties)}},p=[],s=!1,d=function(e){(e.children||[]).forEach(d),e.properties&&e.properties.afterRemoved&&e.properties.afterRemoved.apply(e.properties.bind||e.properties,[e.domNode])},l=function(){s=!1,p.forEach(d),p.length=0},v=function(e){p.push(e),s||(s=!0,"undefined"!=typeof window&&"requestIdleCallback"in window?window.requestIdleCallback(l,{timeout:16}):setTimeout(l,16))},h=function(e){var t=e.domNode;if(e.properties){var n=e.properties.exitAnimation;if(n)return t.style.pointerEvents="none",void n(t,(function(){t.parentNode&&(t.parentNode.removeChild(t),v(e))}),e.properties)}t.parentNode&&(t.parentNode.removeChild(t),v(e))},y=function(e,t,r){!function(e,t,n){if(t)for(var r=0,o=t;r<o.length;r++){var i=o[r];b(i,e,void 0,n)}}(e,t.children,r),t.text&&(e.textContent=t.text),function(e,t,r){if(t)for(var o=r.eventHandlerInterceptor,i=Object.keys(t),u=i.length,a=function(u){var a,f=i[u],p=t[f];if("className"===f)throw new Error('Property "className" is not supported, use "class".');if("class"===f)m(e,p,!0);else if("classes"===f)for(var s=Object.keys(p),d=s.length,l=0;l<d;l++){var v=s[l];p[v]&&e.classList.add(v)}else if("styles"===f){var h=Object.keys(p),y=h.length;for(l=0;l<y;l++){var b=h[l],g=p[b];g&&(c(g),r.styleApplyer(e,b,g))}}else if("key"!==f&&null!=p){var O=typeof p;"function"===O?(0===f.lastIndexOf("on",0)&&(o&&(p=o(f,p,e,t)),"oninput"===f&&(a=p,p=function(e){a.apply(this,[e]),e.target["oninput-value"]=e.target.value})),e[f]=p):r.namespace===n?"href"===f?e.setAttributeNS("http://www.w3.org/1999/xlink",f,p):e.setAttribute(f,p):"string"===O&&"value"!==f&&"innerHTML"!==f?e.setAttribute(f,p):e[f]=p}},f=0;f<u;f++)a(f)}(e,t.properties,r),t.properties&&t.properties.afterCreate&&t.properties.afterCreate.apply(t.properties.bind||t.properties,[e,r,t.vnodeSelector,t.properties,t.children])},b=function(e,t,r,i){var c,u=0,a=e.vnodeSelector,f=t.ownerDocument;if(""===a)c=e.domNode=f.createTextNode(e.text),void 0!==r?t.insertBefore(c,r):t.appendChild(c);else{for(var p=0;p<=a.length;++p){var s=a.charAt(p);if(p===a.length||"."===s||"#"===s){var d=a.charAt(u-1),l=a.slice(u,p);"."===d?c.classList.add(l):"#"===d?c.id=l:("svg"===l&&(i=o(i,{namespace:n})),void 0!==i.namespace?c=e.domNode=f.createElementNS(i.namespace,l):(c=e.domNode=e.domNode||f.createElement(l),"input"===l&&e.properties&&void 0!==e.properties.type&&c.setAttribute("type",e.properties.type)),void 0!==r?t.insertBefore(c,r):c.parentNode!==t&&t.appendChild(c)),u=p+1}}y(c,e,i)}},m=function(e,t,n){t&&t.split(" ").forEach((function(t){t&&e.classList.toggle(t,n)}))};t=function(e,p,s){var d=e.domNode,l=!1;if(e===p)return!1;var v=!1;if(""===p.vnodeSelector){if(p.text!==e.text){var y=d.ownerDocument.createTextNode(p.text);return d.parentNode.replaceChild(y,d),p.domNode=y,l=!0}p.domNode=d}else 0===p.vnodeSelector.lastIndexOf("svg",0)&&(s=o(s,{namespace:n})),e.text!==p.text&&(v=!0,void 0===p.text?d.removeChild(d.firstChild):d.textContent=p.text),p.domNode=d,v=function(e,n,o,c,p){if(o===c)return!1;c=c||r;for(var s,d=(o=o||r).length,l=c.length,v=0,y=0,m=!1;y<l;){var g=v<d?o[v]:void 0,O=c[y];if(void 0!==g&&i(g,O))m=t(g,O,p)||m,v++;else{var j=u(o,O,v+1);if(j>=0){for(s=v;s<j;s++)h(o[s]),a(o,s,e,"removed");m=t(o[j],O,p)||m,v=j+1}else b(O,n,v<d?o[v].domNode:void 0,p),f(O),a(c,y,e,"added")}y++}if(d>v)for(s=v;s<d;s++)h(o[s]),a(o,s,e,"removed");return m}(p,d,e.children,p.children,s)||v,v=function(e,t,r,o){if(r){for(var i=!1,u=Object.keys(r),a=u.length,f=0;f<a;f++){var p=u[f],s=r[p],d=t[p];if("class"===p)d!==s&&(m(e,d,!1),m(e,s,!0));else if("classes"===p)for(var l=e.classList,v=Object.keys(s),h=v.length,y=0;y<h;y++){var b=v[y],g=!!s[b];g!==!!d[b]&&(i=!0,g?l.add(b):l.remove(b))}else if("styles"===p){var O=Object.keys(s),j=O.length;for(y=0;y<j;y++){var w=O[y],S=s[w];S!==d[w]&&(i=!0,S?(c(S),o.styleApplyer(e,w,S)):o.styleApplyer(e,w,""))}}else if(s||"string"!=typeof d||(s=""),"value"===p){var x=e[p];x!==s&&(e["oninput-value"]?x===e["oninput-value"]:s!==d)&&(e[p]=s,e["oninput-value"]=void 0),s!==d&&(i=!0)}else if(s!==d){var N=typeof s;"function"===N&&o.eventHandlerInterceptor||(o.namespace===n?"href"===p?e.setAttributeNS("http://www.w3.org/1999/xlink",p,s):e.setAttribute(p,s):"string"===N&&"innerHTML"!==p?"role"===p&&""===s?e.removeAttribute(p):e.setAttribute(p,s):e[p]!==s&&(e[p]=s),i=!0)}}return i}}(d,e.properties,p.properties,s)||v,p.properties&&p.properties.afterUpdate&&p.properties.afterUpdate.apply(p.properties.bind||p.properties,[d,s,p.vnodeSelector,p.properties,p.children]);return v&&p.properties&&p.properties.updateAnimation&&p.properties.updateAnimation(d,p.properties,e.properties),l};var g,O=function(e,n){return{getLastRender:function(){return e},update:function(r){if(e.vnodeSelector!==r.vnodeSelector)throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");var o=e;e=r,t(o,r,n)},domNode:e.domNode}},j={namespace:void 0,performanceLogger:function(){},eventHandlerInterceptor:void 0,styleApplyer:function(e,t,n){"-"===t.charAt(0)?e.style.setProperty(t,n):e.style[t]=n}},w=function(e){return o(j,e)},S={create:function(e,t){return t=w(t),b(e,document.createElement("div"),void 0,t),O(e,t)},append:function(e,t,n){return n=w(n),b(t,e,void 0,n),O(t,n)},insertBefore:function(e,t,n){return n=w(n),b(t,e.parentNode,e,n),O(t,n)},merge:function(e,t,n){return n=w(n),t.domNode=e,y(e,t,n),O(t,n)},replace:function(e,t,n){return n=w(n),b(t,e.parentNode,e,n),e.parentNode.removeChild(e),O(t,n)}},x=function(e,t,n){for(var r=0,o=t.length;r<o;r++){var i=t[r];Array.isArray(i)?x(e,i,n):null!=i&&!1!==i&&("string"==typeof i&&(i={vnodeSelector:"",properties:void 0,children:void 0,text:i.toString(),domNode:null}),n.push(i))}},N=function(e,t){for(var n=[];e&&e!==t;)n.push(e),e=e.parentNode;return n};g=Array.prototype.find?function(e,t){return e.find(t)}:function(e,t){return e.filter(t)[0]};var k=function(e,t){var n=e;return t.forEach((function(e){n=n&&n.children?g(n.children,(function(t){return t.domNode===e})):void 0})),n};e.createCache=function(){var e,t;return{invalidate:function(){t=void 0,e=void 0},result:function(n,r){if(e)for(var o=0;o<n.length;o++)e[o]!==n[o]&&(t=void 0);return t||(t=r(),e=n),t}}},e.createMapping=function(e,t,n){var r=[],o=[];return{results:o,map:function(i){for(var c=i.map(e),u=o.slice(),a=0,f=0;f<i.length;f++){var p=i[f],s=c[f];if(s===r[a])o[f]=u[a],n(p,u[a],f),a++;else{for(var d=!1,l=1;l<r.length+1;l++){var v=(a+l)%r.length;if(r[v]===s){o[f]=u[v],n(i[f],u[v],f),a=v+1,d=!0;break}}d||(o[f]=t(p,f))}}o.length=i.length,r=c}}},e.createProjector=function(e){var t,n,r=w(e),o=r.performanceLogger,i=!0,c=!1,u=[],a=[],f=function(e,n,i){var c;r.eventHandlerInterceptor=function(e,t,n){return function(e,t,n,o){return r};function r(r){n("domEvent",r);var o=t(),i=N(r.currentTarget,o.domNode);i.reverse();var c,u=k(o.getLastRender(),i);return e.scheduleRender(),u&&(c=u.properties["on"+r.type].apply(u.properties.bind||this,arguments)),n("domEventProcessed",r),c}}(t,(function(){return c}),o),c=e(n,i(),r),u.push(c),a.push(i)},p=function(){if(n=void 0,i){i=!1,o("renderStart",void 0);for(var e=0;e<u.length;e++){var t=a[e]();o("rendered",void 0),u[e].update(t),o("patched",void 0)}o("renderDone",void 0),i=!0}};return t={renderNow:p,scheduleRender:function(){n||c||(n=requestAnimationFrame(p))},stop:function(){n&&(cancelAnimationFrame(n),n=void 0),c=!0},resume:function(){c=!1,i=!0,t.scheduleRender()},append:function(e,t){f(S.append,e,t)},insertBefore:function(e,t){f(S.insertBefore,e,t)},merge:function(e,t){f(S.merge,e,t)},replace:function(e,t){f(S.replace,e,t)},detach:function(e){for(var t=0;t<a.length;t++)if(a[t]===e)return a.splice(t,1),u.splice(t,1)[0];throw new Error("renderFunction was not found")}}},e.dom=S,e.h=function(e,t,n){if(Array.isArray(t))n=t,t=void 0;else if(t&&("string"==typeof t||t.vnodeSelector)||n&&("string"==typeof n||n.vnodeSelector))throw new Error("h called with invalid arguments");var r,o;return n&&1===n.length&&"string"==typeof n[0]?r=n[0]:n&&(x(e,n,o=[]),0===o.length&&(o=void 0)),{vnodeSelector:e,properties:t,children:o,text:""===r?void 0:r,domNode:null}},Object.defineProperty(e,"__esModule",{value:!0})}(t)},59:function(e,t,n){"use strict";function r(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return e.reduceRight((function(e,t){return t(e)}),t)}}n.d(t,"a",(function(){return r}))},6:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return c})),n.d(t,"e",(function(){return u})),n.d(t,"c",(function(){return a})),n.d(t,"d",(function(){return p}));var r=n(0),o=n(16);function i(e){return 0===Object.keys(e).length&&e.constructor===Object}function c(e){return null!=e}var u=Object(o.a)((function(e,t){var n=Object(r.a)({},t);return delete n[e],n}));function a(e,t){return f.apply(null,arguments)}var f=Object(o.a)((function(e,t){return Object.keys(t).reduce((function(n,r){return n[r]=e(t[r],r,t),n}),{})}));function p(e,t){return s.apply(null,arguments)}var s=Object(o.a)((function(e,t){return Object.keys(t).reduce((function(n,r){return e(t[r],r,t)&&(n[r]=t[r]),n}),{})}))},790:function(e,t,n){"use strict";n.r(t),n.d(t,"createProjector",(function(){return u})),n.d(t,"Component",(function(){return a})),n.d(t,"RootComponent",(function(){return f})),n.d(t,"connect",(function(){return p})),n.d(t,"applyMiddleware",(function(){return d})),n.d(t,"shunt",(function(){return l})),n.d(t,"thunk",(function(){return v})),n.d(t,"addListener",(function(){return h})),n.d(t,"combineReducers",(function(){return y})),n.d(t,"createStore",(function(){return b}));var r=n(0),o=n(429),i=n(59),c=n(6);function u(e,t,n,i){var c=new f({key:"root"},t);e&&(c.store=e);var u=Object(o.createProjector)(i),a=Object(r.a)(Object(r.a)({},u),{append:function(e){return u.append(e,(function(){return c.render.bind(c)(c.tsx.bind(c))}))}});return a.append(n),e&&e.subscribe((function(){return u.scheduleRender()})),a}var a=function(){function e(e){this.childComponents={},this.state={},this.props=e}return e.prototype.componentDidConnect=function(){},e.prototype.componentWillReceiveProps=function(e){},e.prototype.setState=function(e){this.state=Object(r.a)(Object(r.a)({},this.state),e),this.store?this.store.dispatch({type:this.props.key+"_COMPONENT_STATE_UPDATE"}):console.warn("\n                A component's 'setState' method was called from its constructor function.\n                Set component state directly in the constructor function, and use 'setState' in callbacks etc.\n            ")},e.prototype.tsx=function(e,t,n){var i,c=Array.prototype.slice.call(arguments).slice(2);if("string"==typeof e)i=o.h.apply(this,[e,t,c]);else if(s(e)){f=e;var u=Object(r.a)(Object(r.a)({},t),{children:c}),a=this.childComponents[u.key];a?(a.componentWillReceiveProps(u),a.props=u,i=a.render(a.tsx.bind(a))):((a=this.childComponents[u.key]=new f(u)).store=this.store,a.componentDidConnect(),i=a.render(a.tsx.bind(a)))}else{var f;i=(f=e)(Object(r.a)(Object(r.a)({},t),{children:c}),this.tsx.bind(this))}return"function"==typeof i?i(this.store.dispatch,this.store.getState):i},e}(),f=function(e){function t(t,n){var r=e.call(this,t)||this;return r.renderRoot=n,r}return Object(r.d)(t,e),t.prototype.render=function(e){var t=this;return e((function(e,n){return t.renderRoot(n)}))},t}(a);function p(e,t){return function(n){return function(o,i){return function(c,u){return i(n,Object(r.a)(Object(r.a)(Object(r.a)({},o),e(u(),o)),t(c,o)))}}}}function s(e){return!(!e.prototype||!e.prototype.constructor.name)}function d(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(t){return function(n,o){var c=t(n,o),u=i.a,a=c.dispatch,f=e.map((function(e){return e({dispatch:function(e){return a(e)},getState:c.getState})}));return a=u.apply(void 0,f)(c.dispatch),Object(r.a)(Object(r.a)({},c),{dispatch:a})}}}function l(e){return function(t){return function(n,r){return t((function(t,r){if("@@shunt/SETSTATE"===r.type)return r.payload;var o=n(t,r);return-1===r.type.indexOf("@@component/INIT")&&e(r,o),o}),r)}}}void 0===Function.prototype.name&&void 0!==Object.defineProperty&&Object.defineProperty(Function.prototype,"name",{get:function(){var e=/function\s([^(]{1,})\(/.exec(this.toString());return e&&e.length>1?e[1].trim():""},set:function(e){}});var v=function(e){var t=e.dispatch,n=e.getState;return function(e){return function(r){return"function"==typeof r?r(t,n):e(r)}}};function h(e){return function(t){t.dispatch;var n=t.getState;return function(t){return function(r){var o=t(r);return e(r,n()),o}}}}function y(e){var t=Object(c.d)((function(e){return"function"==typeof e}),e);return function(e,n){return void 0===e&&(e={}),Object(c.c)((function(t,r){return t(e[r],n)}),t)}}function b(e,t){var n=t,r=e,o=[],i={dispatch:function(e){return n=r(n,e),o.forEach((function(e){return e()})),e},subscribe:function(e){return o.push(e),function(){o.splice(o.indexOf(e),1)}},getState:function(){return n}};return i.dispatch({type:"@@component/INIT"+Math.random().toString(36).substring(7)}),i}}})}));
//# sourceMappingURL=Component.js.map