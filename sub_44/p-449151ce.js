/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See LICENSE.md for details.
 * v1.0.0-beta.304
 */
let e,t,n=null,l=!1;const s="undefined"!=typeof window?window:{},o=s.document||{head:{}},i={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},c=e=>Promise.resolve(e),r=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),a="http://www.w3.org/1999/xlink",u=new WeakMap,f=e=>"sc-"+e.o,d={},p=e=>"object"==(e=typeof e)||"function"===e,h=(e,t,...n)=>{let l=null,s=null,o=!1,i=!1,c=[];const r=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?r(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!p(l))&&(l+=""),o&&i?c[c.length-1].i+=l:c.push(o?y(null,l):l),i=o)};if(r(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,c,$);const a=y(e,null);return a.u=t,c.length>0&&(a.p=c),a.h=s,a},y=(e,t)=>({t:0,m:e,i:t,$:null,p:null,u:null,h:null}),m={},$={forEach:(e,t)=>e.map(b).forEach(t),map:(e,t)=>e.map(b).map(t).map(w)},b=e=>({vattrs:e.u,vchildren:e.p,vkey:e.h,vname:e.g,vtag:e.m,vtext:e.i}),w=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),h(e.vtag,t,...e.vchildren||[])}const t=y(e.vtag,e.vtext);return t.u=e.vattrs,t.p=e.vchildren,t.h=e.vkey,t.g=e.vname,t},g=(e,t,n,l,o,c)=>{if(n!==l){let r=Z(e,t),u=t.toLowerCase();if("class"===t){const t=e.classList,s=v(n),o=v(l);t.remove(...s.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!s.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(r||"o"!==t[0]||"n"!==t[1]){const s=p(l);if((r||s&&null!==l)&&!o)try{if(e.tagName.includes("-"))e[t]=l;else{let s=null==l?"":l;"list"===t?r=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(e){}let i=!1;u!==(u=u.replace(/^xlink\:?/,""))&&(t=u,i=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(t)||(i?e.removeAttributeNS(a,t):e.removeAttribute(t)):(!r||4&c||o)&&!s&&(l=!0===l?"":l,i?e.setAttributeNS(a,t,l):e.setAttribute(t,l))}else t="-"===t[2]?t.slice(3):Z(s,u)?u.slice(2):u[2]+t.slice(3),n&&i.rel(e,t,n,!1),l&&i.ael(e,t,l,!1)}},k=/\s/,v=e=>e?e.split(k):[],S=(e,t,n,l)=>{const s=11===t.$.nodeType&&t.$.host?t.$.host:t.$,o=e&&e.u||d,i=t.u||d;for(l in o)l in i||g(s,l,o[l],void 0,n,t.t);for(l in i)g(s,l,o[l],i[l],n,t.t)},j=(t,n,l)=>{let s,i,c=n.p[l],r=0;if(null!==c.i)s=c.$=o.createTextNode(c.i);else if(s=c.$=o.createElement(c.m),S(null,c,!1),null!=e&&s["s-si"]!==e&&s.classList.add(s["s-si"]=e),c.p)for(r=0;r<c.p.length;++r)i=j(t,c,r),i&&s.appendChild(i);return s},C=(e,n,l,s,o,i)=>{let c,r=e;for(r.shadowRoot&&r.tagName===t&&(r=r.shadowRoot);o<=i;++o)s[o]&&(c=j(null,l,o),c&&(s[o].$=c,r.insertBefore(c,n)))},M=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.$,L(l),s.remove())},O=(e,t)=>e.m===t.m&&e.h===t.h,x=(e,t)=>{const n=t.$=e.$,l=e.p,s=t.p,o=t.i;null===o?(S(e,t,!1),null!==l&&null!==s?((e,t,n,l)=>{let s,o,i=0,c=0,r=0,a=0,u=t.length-1,f=t[0],d=t[u],p=l.length-1,h=l[0],y=l[p];for(;i<=u&&c<=p;)if(null==f)f=t[++i];else if(null==d)d=t[--u];else if(null==h)h=l[++c];else if(null==y)y=l[--p];else if(O(f,h))x(f,h),f=t[++i],h=l[++c];else if(O(d,y))x(d,y),d=t[--u],y=l[--p];else if(O(f,y))x(f,y),e.insertBefore(f.$,d.$.nextSibling),f=t[++i],y=l[--p];else if(O(d,h))x(d,h),e.insertBefore(d.$,f.$),d=t[--u],h=l[++c];else{for(r=-1,a=i;a<=u;++a)if(t[a]&&null!==t[a].h&&t[a].h===h.h){r=a;break}r>=0?(o=t[r],o.m!==h.m?s=j(t&&t[c],n,r):(x(o,h),t[r]=void 0,s=o.$),h=l[++c]):(s=j(t&&t[c],n,c),h=l[++c]),s&&f.$.parentNode.insertBefore(s,f.$)}i>u?C(e,null==l[p+1]?null:l[p+1].$,n,l,c,p):c>p&&M(t,i,u)})(n,l,t,s):null!==s?(null!==e.i&&(n.textContent=""),C(n,null,t,s,0,s.length-1)):null!==l&&M(l,0,l.length-1)):e.i!==o&&(n.data=o)},L=e=>{e.u&&e.u.ref&&e.u.ref(null),e.p&&e.p.map(L)},R=e=>Q(e).k,E=(e,t,n)=>{const l=R(e);return{emit:e=>P(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},P=(e,t,n)=>{const l=i.ce(t,n);return e.dispatchEvent(l),l},U=(e,t)=>{t&&!e.v&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.v=t)))},W=(e,t)=>{if(e.t|=16,!(4&e.t))return U(e,e.S),ue((()=>D(e,t)));e.t|=512},D=(e,t)=>{const n=e.j;let l;return t&&(l=V(n,"componentWillLoad")),l=_(l,(()=>V(n,"componentWillRender"))),_(l,(()=>T(e,n,t)))},T=async(e,t,n)=>{const l=e.k,s=l["s-rc"];n&&(e=>{const t=e.C,n=e.k,l=t.t,s=((e,t)=>{let n=f(t),l=le.get(n);if(e=11===e.nodeType?e:o,l)if("string"==typeof l){let t,s=u.get(e=e.head||e);s||u.set(e,s=new Set),s.has(n)||(t=o.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=s,n.classList.add(s+"-h"))})(e);A(e,t),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>H(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},A=(l,s)=>{try{n=s,s=s.render(),l.t&=-17,l.t|=2,((n,l)=>{const s=n.k,o=n.C,i=n.M||y(null,null),c=(e=>e&&e.m===m)(l)?l:h(null,null,l);t=s.tagName,o.O&&(c.u=c.u||{},o.O.map((([e,t])=>c.u[t]=s[e]))),c.m=null,c.t|=4,n.M=c,c.$=i.$=s.shadowRoot||s,e=s["s-sc"],x(i,c)})(l,s)}catch(e){ee(e,l.k)}return n=null,null},F=()=>n,H=e=>{const t=e.k,n=e.j,l=e.S;V(n,"componentDidRender"),64&e.t?V(n,"componentDidUpdate"):(e.t|=64,z(t),V(n,"componentDidLoad"),e.L(t),l||N()),e.v&&(e.v(),e.v=void 0),512&e.t&&ae((()=>W(e,!1))),e.t&=-517},q=e=>{{const t=Q(e),n=t.k.isConnected;return n&&2==(18&t.t)&&W(t,!1),n}},N=()=>{z(o.documentElement),ae((()=>P(s,"appload",{detail:{namespace:"arcgis-charts-config-components"}})))},V=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){ee(e)}},_=(e,t)=>e&&e.then?e.then(t):t(),z=e=>e.classList.add("hydrated"),B=(e,t,n)=>{if(t.R){e.watchers&&(t.P=e.watchers);const l=Object.entries(t.R),s=e.prototype;if(l.map((([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(s,e,{get(){return((e,t)=>Q(this).U.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=Q(e),o=s.k,i=s.U.get(t),c=s.t,r=s.j;if(n=((e,t)=>null==e||p(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.R[t][0]),!(8&c&&void 0!==i||n===i)&&(s.U.set(t,n),r)){if(l.P&&128&c){const e=l.P[t];e&&e.map((e=>{try{r[e](n,i,t)}catch(e){ee(e,o)}}))}2==(18&c)&&W(s,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){i.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(s.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.O.push([e,s]),s}))}}return e},G=e=>{V(e,"connectedCallback")},I=(e,t={})=>{const n=[],l=t.exclude||[],c=s.customElements,a=o.head,u=a.querySelector("meta[charset]"),d=o.createElement("style"),p=[];let h,y=!0;Object.assign(i,t),i.l=new URL(t.resourcesUrl||"./",o.baseURI).href,e.map((e=>{e[1].map((t=>{const s={t:t[0],o:t[1],R:t[2],W:t[3]};s.R=t[2],s.O=[],s.P={};const o=s.o,a=class extends HTMLElement{constructor(e){super(e),Y(e=this,s),1&s.t&&e.attachShadow({mode:"open"})}connectedCallback(){h&&(clearTimeout(h),h=null),y?p.push(this):i.jmp((()=>(e=>{if(0==(1&i.t)){const t=Q(e),n=t.C,l=()=>{};if(1&t.t)G(t.j);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){U(t,t.S=n);break}}n.R&&Object.entries(n.R).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=ne(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(n.P=s.watchers,B(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){ee(e)}t.t&=-9,t.t|=128,e(),G(t.j)}if(s.style){let e=s.style;const t=f(n);if(!le.has(t)){const l=()=>{};((e,t,n)=>{let l=le.get(e);r&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,le.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.S,i=()=>W(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){i.jmp((()=>(()=>{0==(1&i.t)&&V(Q(this).j,"disconnectedCallback")})()))}componentOnReady(){return Q(this).D}};s.T=e[0],l.includes(o)||c.get(o)||(n.push(o),c.define(o,B(a,s,1)))}))})),d.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",d.setAttribute("data-styles",""),a.insertBefore(d,u?u.nextSibling:a.firstChild),y=!1,p.length?p.map((e=>e.connectedCallback())):i.jmp((()=>h=setTimeout(N,30)))},J=e=>{const t=new URL(e,i.l);return t.origin!==s.location.origin?t.href:t.pathname},K=new WeakMap,Q=e=>K.get(e),X=(e,t)=>K.set(t.j=e,t),Y=(e,t)=>{const n={t:0,k:e,C:t,U:new Map};return n.D=new Promise((e=>n.L=e)),e["s-p"]=[],e["s-rc"]=[],K.set(e,n)},Z=(e,t)=>t in e,ee=(e,t)=>(0,console.error)(e,t),te=new Map,ne=e=>{const t=e.o.replace(/-/g,"_"),n=e.T,l=te.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(te.set(n,e),e[t])),ee)},le=new Map,se=[],oe=[],ie=(e,t)=>n=>{e.push(n),l||(l=!0,t&&4&i.t?ae(re):i.raf(re))},ce=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){ee(e)}e.length=0},re=()=>{ce(se),ce(oe),(l=se.length>0)&&i.raf(re)},ae=e=>c().then(e),ue=ie(oe,!0);export{m as H,R as a,I as b,E as c,F as d,q as f,J as g,h,c as p,X as r}