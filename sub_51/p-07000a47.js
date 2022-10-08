/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
const e="arcgis-charts-app";let t,n,l=!1,s=!1;const o="undefined"!=typeof window?window:{},i=o.document||{head:{}},r={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},c=e=>Promise.resolve(e),a=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),u=(e,t,n)=>{n&&n.map((([n,l,s])=>{const o=p(e,n),i=f(t,s),c=d(n);r.ael(o,l,i,c),(t.o=t.o||[]).push((()=>r.rel(o,l,i,c)))}))},f=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){oe(e)}},p=(e,t)=>4&t?i:8&t?o:16&t?i.body:e,d=e=>0!=(2&e),h="http://www.w3.org/1999/xlink",y=new WeakMap,m=e=>"sc-"+e.p,$={},w=e=>"object"==(e=typeof e)||"function"===e,b=(e,t,...n)=>{let l=null,s=null,o=!1,i=!1,r=[];const c=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?c(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!w(l))&&(l+=""),o&&i?r[r.length-1].h+=l:r.push(o?g(null,l):l),i=o)};if(c(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,r,j);const a=g(e,null);return a.m=t,r.length>0&&(a.$=r),a.g=s,a},g=(e,t)=>({t:0,v:e,h:t,j:null,$:null,m:null,g:null}),v={},j={forEach:(e,t)=>e.map(k).forEach(t),map:(e,t)=>e.map(k).map(t).map(S)},k=e=>({vattrs:e.m,vchildren:e.$,vkey:e.g,vname:e.k,vtag:e.v,vtext:e.h}),S=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),b(e.vtag,t,...e.vchildren||[])}const t=g(e.vtag,e.vtext);return t.m=e.vattrs,t.$=e.vchildren,t.g=e.vkey,t.k=e.vname,t},O=(e,t,n,l,s,i)=>{if(n!==l){let c=se(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,s=M(n),o=M(l);t.remove(...s.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!s.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(c||"o"!==t[0]||"n"!==t[1]){const o=w(l);if((c||o&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[t]=l;else{let s=null==l?"":l;"list"===t?c=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(e){}let r=!1;a!==(a=a.replace(/^xlink\:?/,""))&&(t=a,r=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(t)||(r?e.removeAttributeNS(h,t):e.removeAttribute(t)):(!c||4&i||s)&&!o&&(l=!0===l?"":l,r?e.setAttributeNS(h,t,l):e.setAttribute(t,l))}else t="-"===t[2]?t.slice(3):se(o,a)?a.slice(2):a[2]+t.slice(3),n&&r.rel(e,t,n,!1),l&&r.ael(e,t,l,!1)}},C=/\s/,M=e=>e?e.split(C):[],x=(e,t,n,l)=>{const s=11===t.j.nodeType&&t.j.host?t.j.host:t.j,o=e&&e.m||$,i=t.m||$;for(l in o)l in i||O(s,l,o[l],void 0,n,t.t);for(l in i)O(s,l,o[l],i[l],n,t.t)},L=(e,n,s)=>{let o,r,c=n.$[s],a=0;if(null!==c.h)o=c.j=i.createTextNode(c.h);else{if(l||(l="svg"===c.v),o=c.j=i.createElementNS(l?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",c.v),l&&"foreignObject"===c.v&&(l=!1),x(null,c,l),null!=t&&o["s-si"]!==t&&o.classList.add(o["s-si"]=t),c.$)for(a=0;a<c.$.length;++a)r=L(e,c,a),r&&o.appendChild(r);"svg"===c.v?l=!1:"foreignObject"===o.tagName&&(l=!0)}return o},P=(e,t,l,s,o,i)=>{let r,c=e;for(c.shadowRoot&&c.tagName===n&&(c=c.shadowRoot);o<=i;++o)s[o]&&(r=L(null,l,o),r&&(s[o].j=r,c.insertBefore(r,t)))},R=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.j,W(l),s.remove())},E=(e,t)=>e.v===t.v&&e.g===t.g,U=(e,t)=>{const n=t.j=e.j,s=e.$,o=t.$,i=t.v,r=t.h;null===r?(l="svg"===i||"foreignObject"!==i&&l,"slot"===i||x(e,t,l),null!==s&&null!==o?((e,t,n,l)=>{let s,o,i=0,r=0,c=0,a=0,u=t.length-1,f=t[0],p=t[u],d=l.length-1,h=l[0],y=l[d];for(;i<=u&&r<=d;)if(null==f)f=t[++i];else if(null==p)p=t[--u];else if(null==h)h=l[++r];else if(null==y)y=l[--d];else if(E(f,h))U(f,h),f=t[++i],h=l[++r];else if(E(p,y))U(p,y),p=t[--u],y=l[--d];else if(E(f,y))U(f,y),e.insertBefore(f.j,p.j.nextSibling),f=t[++i],y=l[--d];else if(E(p,h))U(p,h),e.insertBefore(p.j,f.j),p=t[--u],h=l[++r];else{for(c=-1,a=i;a<=u;++a)if(t[a]&&null!==t[a].g&&t[a].g===h.g){c=a;break}c>=0?(o=t[c],o.v!==h.v?s=L(t&&t[r],n,c):(U(o,h),t[c]=void 0,s=o.j),h=l[++r]):(s=L(t&&t[r],n,r),h=l[++r]),s&&f.j.parentNode.insertBefore(s,f.j)}i>u?P(e,null==l[d+1]?null:l[d+1].j,n,l,r,d):r>d&&R(t,i,u)})(n,s,t,o):null!==o?(null!==e.h&&(n.textContent=""),P(n,null,t,o,0,o.length-1)):null!==s&&R(s,0,s.length-1),l&&"svg"===i&&(l=!1)):e.h!==r&&(n.data=r)},W=e=>{e.m&&e.m.ref&&e.m.ref(null),e.$&&e.$.map(W)},D=e=>te(e).S,F=(e,t,n)=>{const l=D(e);return{emit:e=>T(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},T=(e,t,n)=>{const l=r.ce(t,n);return e.dispatchEvent(l),l},A=(e,t)=>{t&&!e.O&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.O=t)))},H=(e,t)=>{if(e.t|=16,!(4&e.t))return A(e,e.C),ye((()=>N(e,t)));e.t|=512},N=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>G(n,e,t))),e.u=null),l=G(n,"componentWillLoad")),l=I(l,(()=>G(n,"componentWillRender"))),I(l,(()=>q(e,n,t)))},q=async(e,t,n)=>{const l=e.S,s=l["s-rc"];n&&(e=>{const t=e.M,n=e.S,l=t.t,s=((e,t)=>{let n=m(t),l=ce.get(n);if(e=11===e.nodeType?e:i,l)if("string"==typeof l){let t,s=y.get(e=e.head||e);s||y.set(e,s=new Set),s.has(n)||(t=i.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=s,n.classList.add(s+"-h"))})(e);V(e,t),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>_(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},V=(e,l)=>{try{l=l.render&&l.render(),e.t&=-17,e.t|=2,((e,l)=>{const s=e.S,o=e.M,i=e.L||g(null,null),r=(e=>e&&e.v===v)(l)?l:b(null,null,l);n=s.tagName,o.P&&(r.m=r.m||{},o.P.map((([e,t])=>r.m[t]=s[e]))),r.v=null,r.t|=4,e.L=r,r.j=i.j=s.shadowRoot||s,t=s["s-sc"],U(i,r)})(e,l)}catch(t){oe(t,e.S)}return null},_=e=>{const t=e.S,n=e.i,l=e.C;G(n,"componentDidRender"),64&e.t?G(n,"componentDidUpdate"):(e.t|=64,J(t),G(n,"componentDidLoad"),e.R(t),l||B()),e.U(t),e.O&&(e.O(),e.O=void 0),512&e.t&&he((()=>H(e,!1))),e.t&=-517},z=e=>{{const t=te(e),n=t.S.isConnected;return n&&2==(18&t.t)&&H(t,!1),n}},B=()=>{J(i.documentElement),he((()=>T(o,"appload",{detail:{namespace:"arcgis-charts-app"}})))},G=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){oe(e)}},I=(e,t)=>e&&e.then?e.then(t):t(),J=e=>e.classList.add("hydrated"),K=(e,t,n)=>{if(t.W){e.watchers&&(t.D=e.watchers);const l=Object.entries(t.W),s=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(s,e,{get(){return((e,t)=>te(this).F.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=te(e),o=s.S,i=s.F.get(t),r=s.t,c=s.i;if(n=((e,t)=>null==e||w(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.W[t][0]),!(8&r&&void 0!==i||n===i)&&(s.F.set(t,n),c)){if(l.D&&128&r){const e=l.D[t];e&&e.map((e=>{try{c[e](n,i,t)}catch(e){oe(e,o)}}))}if(2==(18&r)){if(c.componentShouldUpdate&&!1===c.componentShouldUpdate(n,i,t))return;H(s,!1)}}})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(s,e,{value(...t){const n=te(this);return n.T.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){r.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(s.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.P.push([e,s]),s}))}}return e},Q=e=>{G(e,"connectedCallback")},X=(e,t={})=>{const n=[],l=t.exclude||[],s=o.customElements,c=i.head,f=c.querySelector("meta[charset]"),p=i.createElement("style"),d=[];let h,y=!0;Object.assign(r,t),r.l=new URL(t.resourcesUrl||"./",i.baseURI).href,e.map((e=>{e[1].map((t=>{const o={t:t[0],p:t[1],W:t[2],A:t[3]};o.W=t[2],o.A=t[3],o.P=[],o.D={};const i=o.p,c=class extends HTMLElement{constructor(e){super(e),le(e=this,o),1&o.t&&e.attachShadow({mode:"open"})}connectedCallback(){h&&(clearTimeout(h),h=null),y?d.push(this):r.jmp((()=>(e=>{if(0==(1&r.t)){const t=te(e),n=t.M,l=()=>{};if(1&t.t)u(e,t,n.A),Q(t.i);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){A(t,t.C=n);break}}n.W&&Object.entries(n.W).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=re(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(n.D=s.watchers,K(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){oe(e)}t.t&=-9,t.t|=128,e(),Q(t.i)}if(s.style){let e=s.style;const t=m(n);if(!ce.has(t)){const l=()=>{};((e,t,n)=>{let l=ce.get(e);a&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,ce.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.C,i=()=>H(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){r.jmp((()=>(()=>{if(0==(1&r.t)){const e=te(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),G(t,"disconnectedCallback")}})()))}componentOnReady(){return te(this).H}};o.N=e[0],l.includes(i)||s.get(i)||(n.push(i),s.define(i,K(c,o,1)))}))})),p.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",p.setAttribute("data-styles",""),c.insertBefore(p,f?f.nextSibling:c.firstChild),y=!1,d.length?d.map((e=>e.connectedCallback())):r.jmp((()=>h=setTimeout(B,30)))},Y=e=>{const t=new URL(e,r.l);return t.origin!==o.location.origin?t.href:t.pathname},Z=(e,t)=>t,ee=new WeakMap,te=e=>ee.get(e),ne=(e,t)=>ee.set(t.i=e,t),le=(e,t)=>{const n={t:0,S:e,M:t,F:new Map};return n.T=new Promise((e=>n.U=e)),n.H=new Promise((e=>n.R=e)),e["s-p"]=[],e["s-rc"]=[],u(e,n,t.A),ee.set(e,n)},se=(e,t)=>t in e,oe=(e,t)=>(0,console.error)(e,t),ie=new Map,re=e=>{const t=e.p.replace(/-/g,"_"),n=e.N,l=ie.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(ie.set(n,e),e[t])),oe)},ce=new Map,ae=[],ue=[],fe=(e,t)=>n=>{e.push(n),s||(s=!0,t&&4&r.t?he(de):r.raf(de))},pe=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){oe(e)}e.length=0},de=()=>{pe(ae),pe(ue),(s=ae.length>0)&&r.raf(de)},he=e=>c().then(e),ye=fe(ue,!0);export{Z as F,v as H,e as N,D as a,X as b,F as c,z as f,Y as g,b as h,c as p,ne as r}