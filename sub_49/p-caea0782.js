/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.83
 */
const e="calcite";let t,n,l=!1,s=!1;const o="undefined"!=typeof window?window:{},i=o.document||{head:{}},c={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},r=e=>Promise.resolve(e),a=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),u=(e,t,n)=>{n&&n.map((([n,l,s])=>{const o=$(e,n),i=f(t,s),r=d(n);c.ael(o,l,i,r),(t.o=t.o||[]).push((()=>c.rel(o,l,i,r)))}))},f=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){fe(e)}},$=(e,t)=>4&t?i:8&t?o:16&t?i.body:e,d=e=>0!=(2&e),h="http://www.w3.org/1999/xlink",y=new WeakMap,m=(e,t,n)=>{let l=he.get(e);a&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,he.set(e,l)},p=(e,t)=>{let n=w(t);const l=he.get(n);if(e=11===e.nodeType?e:i,l)if("string"==typeof l){let t,s=y.get(e=e.head||e);s||y.set(e,s=new Set),s.has(n)||(e.host&&(t=e.querySelector(`[sty-id="${n}"]`))?t.innerHTML=l:(t=i.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link"))),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n},w=e=>"sc-"+e.$,b=e=>e.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g,"$1{"),g={},v=e=>"object"==(e=typeof e)||"function"===e,k=(e,t,...n)=>{let l=null,s=null,o=!1,i=!1;const c=[],r=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?r(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!v(l))&&(l+=""),o&&i?c[c.length-1].h+=l:c.push(o?j(null,l):l),i=o)};if(r(n),t){t.key&&(s=t.key);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,c,x);const a=j(e,null);return a.m=t,c.length>0&&(a.p=c),a.g=s,a},j=(e,t)=>({t:0,v:e,h:t,k:null,p:null,m:null,g:null}),S={},x={forEach:(e,t)=>e.map(O).forEach(t),map:(e,t)=>e.map(O).map(t).map(M)},O=e=>({vattrs:e.m,vchildren:e.p,vkey:e.g,vname:e.j,vtag:e.v,vtext:e.h}),M=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),k(e.vtag,t,...e.vchildren||[])}const t=j(e.vtag,e.vtext);return t.m=e.vattrs,t.p=e.vchildren,t.g=e.vkey,t.j=e.vname,t},C=(e,t,n,l,s,i)=>{if(n!==l){let r=ue(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,s=P(n),o=P(l);t.remove(...s.filter((e=>e&&!o.includes(e)))),t.add(...o.filter((e=>e&&!s.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(r||"o"!==t[0]||"n"!==t[1]){const o=v(l);if((r||o&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[t]=l;else{const s=null==l?"":l;"list"===t?r=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(e){}let c=!1;a!==(a=a.replace(/^xlink\:?/,""))&&(t=a,c=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(t)||(c?e.removeAttributeNS(h,t):e.removeAttribute(t)):(!r||4&i||s)&&!o&&(l=!0===l?"":l,c?e.setAttributeNS(h,t,l):e.setAttribute(t,l))}else t="-"===t[2]?t.slice(3):ue(o,a)?a.slice(2):a[2]+t.slice(3),n&&c.rel(e,t,n,!1),l&&c.ael(e,t,l,!1)}},L=/\s/,P=e=>e?e.split(L):[],R=(e,t,n,l)=>{const s=11===t.k.nodeType&&t.k.host?t.k.host:t.k,o=e&&e.m||g,i=t.m||g;for(l in o)l in i||C(s,l,o[l],void 0,n,t.t);for(l in i)C(s,l,o[l],i[l],n,t.t)},E=(e,n,s)=>{const o=n.p[s];let c,r,a=0;if(null!==o.h)c=o.k=i.createTextNode(o.h);else{if(l||(l="svg"===o.v),c=o.k=i.createElementNS(l?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",o.v),l&&"foreignObject"===o.v&&(l=!1),R(null,o,l),null!=t&&c["s-si"]!==t&&c.classList.add(c["s-si"]=t),o.p)for(a=0;a<o.p.length;++a)r=E(e,o,a),r&&c.appendChild(r);"svg"===o.v?l=!1:"foreignObject"===c.tagName&&(l=!0)}return c},I=(e,t,l,s,o,i)=>{let c,r=e;for(r.shadowRoot&&r.tagName===n&&(r=r.shadowRoot);o<=i;++o)s[o]&&(c=E(null,l,o),c&&(s[o].k=c,r.insertBefore(c,t)))},N=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.k,T(l),s.remove())},W=(e,t)=>e.v===t.v&&e.g===t.g,F=(e,t)=>{const n=t.k=e.k,s=e.p,o=t.p,i=t.v,c=t.h;null===c?(l="svg"===i||"foreignObject"!==i&&l,"slot"===i||R(e,t,l),null!==s&&null!==o?((e,t,n,l)=>{let s,o,i=0,c=0,r=0,a=0,u=t.length-1,f=t[0],$=t[u],d=l.length-1,h=l[0],y=l[d];for(;i<=u&&c<=d;)if(null==f)f=t[++i];else if(null==$)$=t[--u];else if(null==h)h=l[++c];else if(null==y)y=l[--d];else if(W(f,h))F(f,h),f=t[++i],h=l[++c];else if(W($,y))F($,y),$=t[--u],y=l[--d];else if(W(f,y))F(f,y),e.insertBefore(f.k,$.k.nextSibling),f=t[++i],y=l[--d];else if(W($,h))F($,h),e.insertBefore($.k,f.k),$=t[--u],h=l[++c];else{for(r=-1,a=i;a<=u;++a)if(t[a]&&null!==t[a].g&&t[a].g===h.g){r=a;break}r>=0?(o=t[r],o.v!==h.v?s=E(t&&t[c],n,r):(F(o,h),t[r]=void 0,s=o.k),h=l[++c]):(s=E(t&&t[c],n,c),h=l[++c]),s&&f.k.parentNode.insertBefore(s,f.k)}i>u?I(e,null==l[d+1]?null:l[d+1].k,n,l,c,d):c>d&&N(t,i,u)})(n,s,t,o):null!==o?(null!==e.h&&(n.textContent=""),I(n,null,t,o,0,o.length-1)):null!==s&&N(s,0,s.length-1),l&&"svg"===i&&(l=!1)):e.h!==c&&(n.data=c)},T=e=>{e.m&&e.m.ref&&e.m.ref(null),e.p&&e.p.map(T)},U=e=>ce(e).S,A=(e,t,n)=>{const l=U(e);return{emit:e=>D(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},D=(e,t,n)=>{const l=c.ce(t,n);return e.dispatchEvent(l),l},H=(e,t)=>{t&&!e.O&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.O=t)))},q=(e,t)=>{if(e.t|=16,!(4&e.t))return H(e,e.M),ve((()=>V(e,t)));e.t|=512},V=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>K(n,e,t))),e.u=null),l=K(n,"componentWillLoad")),l=Q(l,(()=>K(n,"componentWillRender"))),Q(l,(()=>_(e,n,t)))},_=async(e,t,n)=>{const l=e.S,s=l["s-rc"];n&&(e=>{const t=e.C,n=e.S,l=t.t,s=p(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=s,n.classList.add(s+"-h"))})(e);z(e,t),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>B(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},z=(e,l)=>{try{l=l.render(),e.t&=-17,e.t|=2,((e,l)=>{const s=e.S,o=e.C,i=e.L||j(null,null),c=(e=>e&&e.v===S)(l)?l:k(null,null,l);n=s.tagName,o.P&&(c.m=c.m||{},o.P.map((([e,t])=>c.m[t]=s[e]))),c.v=null,c.t|=4,e.L=c,c.k=i.k=s.shadowRoot||s,t=s["s-sc"],F(i,c)})(e,l)}catch(t){fe(t,e.S)}return null},B=e=>{const t=e.S,n=e.i,l=e.M;K(n,"componentDidRender"),64&e.t||(e.t|=64,X(t),K(n,"componentDidLoad"),e.R(t),l||J()),e.I(t),e.O&&(e.O(),e.O=void 0),512&e.t&&ge((()=>q(e,!1))),e.t&=-517},G=e=>{{const t=ce(e),n=t.S.isConnected;return n&&2==(18&t.t)&&q(t,!1),n}},J=()=>{X(i.documentElement),ge((()=>D(o,"appload",{detail:{namespace:"calcite"}})))},K=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){fe(e)}},Q=(e,t)=>e&&e.then?e.then(t):t(),X=e=>e.setAttribute("calcite-hydrated",""),Y=(e,t,n,l,s,o,c)=>{let r,a,u,f;if(1===o.nodeType){for(r=o.getAttribute("c-id"),r&&(a=r.split("."),a[0]!==c&&"0"!==a[0]||(u={t:0,N:a[0],W:a[1],F:a[2],T:a[3],v:o.tagName.toLowerCase(),k:o,m:null,p:null,g:null,j:null,h:null},t.push(u),o.removeAttribute("c-id"),e.p||(e.p=[]),e.p[u.T]=u,e=u,l&&"0"===u.F&&(l[u.T]=u.k))),f=o.childNodes.length-1;f>=0;f--)Y(e,t,n,l,s,o.childNodes[f],c);if(o.shadowRoot)for(f=o.shadowRoot.childNodes.length-1;f>=0;f--)Y(e,t,n,l,s,o.shadowRoot.childNodes[f],c)}else if(8===o.nodeType)a=o.nodeValue.split("."),a[1]!==c&&"0"!==a[1]||(r=a[0],u={t:0,N:a[1],W:a[2],F:a[3],T:a[4],k:o,m:null,p:null,g:null,j:null,v:null,h:null},"t"===r?(u.k=o.nextSibling,u.k&&3===u.k.nodeType&&(u.h=u.k.textContent,t.push(u),o.remove(),e.p||(e.p=[]),e.p[u.T]=u,l&&"0"===u.F&&(l[u.T]=u.k))):u.N===c&&("s"===r?(u.v="slot",o["s-sn"]=a[5]?u.j=a[5]:"",o["s-sr"]=!0,l&&(u.k=i.createElement(u.v),u.j&&u.k.setAttribute("name",u.j),o.parentNode.insertBefore(u.k,o),o.remove(),"0"===u.F&&(l[u.T]=u.k)),n.push(u),e.p||(e.p=[]),e.p[u.T]=u):"r"===r&&l&&o.remove()));else if(e&&"style"===e.v){const t=j(null,o.textContent);t.k=o,t.T="0",e.p=[t]}},Z=(e,t)=>{if(1===e.nodeType){let n=0;for(;n<e.childNodes.length;n++)Z(e.childNodes[n],t);if(e.shadowRoot)for(n=0;n<e.shadowRoot.childNodes.length;n++)Z(e.shadowRoot.childNodes[n],t)}else if(8===e.nodeType){const n=e.nodeValue.split(".");"o"===n[0]&&(t.set(n[1]+"."+n[2],e),e.nodeValue="",e["s-en"]=n[3])}},ee=(e,t,n)=>{if(t.U){e.watchers&&(t.A=e.watchers);const l=Object.entries(t.U),s=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(s,e,{get(){return((e,t)=>ce(this).D.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=ce(e),o=s.S,i=s.D.get(t),c=s.t,r=s.i;if(n=((e,t)=>null==e||v(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.U[t][0]),(!(8&c)||void 0===i)&&n!==i&&(!Number.isNaN(i)||!Number.isNaN(n))&&(s.D.set(t,n),r)){if(l.A&&128&c){const e=l.A[t];e&&e.map((e=>{try{r[e](n,i,t)}catch(e){fe(e,o)}}))}if(2==(18&c)){if(r.componentShouldUpdate&&!1===r.componentShouldUpdate(n,i,t))return;q(s,!1)}}})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(s,e,{value(...t){const n=ce(this);return n.H.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;s.attributeChangedCallback=function(e,t,l){c.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(s.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.P.push([e,s]),s}))}}return e},te=e=>{K(e,"connectedCallback")},ne=e=>{if(0==(1&c.t)){const t=ce(e),n=t.C,l=()=>{};if(1&t.t)u(e,t,n.q),te(t.i);else{let l;if(t.t|=1,l=e.getAttribute("s-id"),l){if(1&n.t){const t=p(e.shadowRoot,n);e.classList.remove(t+"-h",t+"-s")}((e,t,n,l)=>{const s=e.shadowRoot,o=[],r=s?[]:null,a=l.L=j(t,null);c.V||Z(i.body,c.V=new Map),e["s-id"]=n,e.removeAttribute("s-id"),Y(a,o,[],r,e,e,n),o.map((e=>{const n=e.N+"."+e.W,l=c.V.get(n),o=e.k;l&&""===l["s-en"]&&l.parentNode.insertBefore(o,l.nextSibling),s||(o["s-hn"]=t,l&&(o["s-ol"]=l,o["s-ol"]["s-nr"]=o)),c.V.delete(n)})),s&&r.map((e=>{e&&s.appendChild(e)}))})(e,n.$,l,t)}{let n=e;for(;n=n.parentNode||n.host;)if(1===n.nodeType&&n.hasAttribute("s-id")&&n["s-p"]||n["s-p"]){H(t,t.M=n);break}}n.U&&Object.entries(n.U).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=de(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(n.A=s.watchers,ee(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){fe(e)}t.t&=-9,t.t|=128,e(),te(t.i)}if(s.style){let e=s.style;const t=w(n);if(!he.has(t)){const l=()=>{};m(t,e,!!(1&n.t)),l()}}}const o=t.M,i=()=>q(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}},le=(e,t={})=>{const n=[],l=t.exclude||[],s=o.customElements,r=i.head,a=r.querySelector("meta[charset]"),u=i.createElement("style"),f=[],$=i.querySelectorAll("[sty-id]");let d,h=!0,y=0;for(Object.assign(c,t),c.l=new URL(t.resourcesUrl||"./",i.baseURI).href,c.t|=2;y<$.length;y++)m($[y].getAttribute("sty-id"),b($[y].innerHTML),!0);e.map((e=>{e[1].map((t=>{const o={t:t[0],$:t[1],U:t[2],q:t[3]};o.U=t[2],o.q=t[3],o.P=[],o.A={};const i=o.$,r=class extends HTMLElement{constructor(e){super(e),ae(e=this,o),1&o.t&&e.attachShadow({mode:"open"})}connectedCallback(){d&&(clearTimeout(d),d=null),h?f.push(this):c.jmp((()=>ne(this)))}disconnectedCallback(){c.jmp((()=>(()=>{if(0==(1&c.t)){const e=ce(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),K(t,"disconnectedCallback")}})()))}componentOnReady(){return ce(this)._}};o.B=e[0],l.includes(i)||s.get(i)||(n.push(i),s.define(i,ee(r,o,1)))}))})),u.innerHTML=n+"{visibility:hidden}[calcite-hydrated]{visibility:inherit}",u.setAttribute("data-styles",""),r.insertBefore(u,a?a.nextSibling:r.firstChild),h=!1,f.length?f.map((e=>e.connectedCallback())):c.jmp((()=>d=setTimeout(J,30)))},se=e=>{const t=new URL(e,c.l);return t.origin!==o.location.origin?t.href:t.pathname},oe=(e,t)=>t,ie=new WeakMap,ce=e=>ie.get(e),re=(e,t)=>ie.set(t.i=e,t),ae=(e,t)=>{const n={t:0,S:e,C:t,D:new Map};return n.H=new Promise((e=>n.I=e)),n._=new Promise((e=>n.R=e)),e["s-p"]=[],e["s-rc"]=[],u(e,n,t.q),ie.set(e,n)},ue=(e,t)=>t in e,fe=(e,t)=>(0,console.error)(e,t),$e=new Map,de=e=>{const t=e.$.replace(/-/g,"_"),n=e.B,l=$e.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>($e.set(n,e),e[t])),fe)
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/},he=new Map,ye=[],me=[],pe=(e,t)=>n=>{e.push(n),s||(s=!0,t&&4&c.t?ge(be):c.raf(be))},we=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){fe(e)}e.length=0},be=()=>{we(ye),we(me),(s=ye.length>0)&&c.raf(be)},ge=e=>r().then(e),ve=pe(me,!0);export{oe as F,S as H,e as N,se as a,le as b,A as c,i as d,G as f,U as g,k as h,r as p,re as r}