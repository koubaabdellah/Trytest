let e,t,n=!1,l=!1;const s="undefined"!=typeof window?window:{},o=s.document||{head:{}},r={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,s)=>e.addEventListener(t,n,s),rel:(e,t,n,s)=>e.removeEventListener(t,n,s),ce:(e,t)=>new CustomEvent(e,t)},i=e=>Promise.resolve(e),c=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),a=new WeakMap,u=e=>"sc-"+e.o,f={},h=e=>"object"==(e=typeof e)||"function"===e,p=(e,t,...n)=>{let s=null,l=!1,r=!1,o=[];const i=t=>{for(let n=0;n<t.length;n++)s=t[n],Array.isArray(s)?i(s):null!=s&&"boolean"!=typeof s&&((l="function"!=typeof e&&!h(s))&&(s+=""),l&&r?o[o.length-1].i+=s:o.push(l?$(null,s):s),r=l)};if(i(n),t){const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}const a=$(e,null);return a.u=t,o.length>0&&(a.h=o),a},$=(e,t)=>({t:0,p:e,i:t,$:null,h:null,u:null}),d={},y=(e,t,n,l,o,i)=>{if(n!==l){let a=z(e,t),c=t.toLowerCase();if("class"===t){const t=e.classList,s=m(n),r=m(l);t.remove(...s.filter((e=>e&&!r.includes(e)))),t.add(...r.filter((e=>e&&!s.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("ref"===t)l&&l(e);else if(a||"o"!==t[0]||"n"!==t[1]){const s=h(l);if((a||s&&null!==l)&&!o)try{if(e.tagName.includes("-"))e[t]=l;else{let s=null==l?"":l;"list"===t?a=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(e){}null==l||!1===l?!1===l&&""!==e.getAttribute(t)||e.removeAttribute(t):(!a||4&i||o)&&!s&&e.setAttribute(t,l=!0===l?"":l)}else t="-"===t[2]?t.slice(3):z(s,c)?c.slice(2):c[2]+t.slice(3),n&&r.rel(e,t,n,!1),l&&r.ael(e,t,l,!1)}},w=/\s/,m=e=>e?e.split(w):[],b=(e,t,n,s)=>{const l=11===t.$.nodeType&&t.$.host?t.$.host:t.$,r=e&&e.u||f,o=t.u||f;for(s in r)s in o||y(l,s,r[s],void 0,n,t.t);for(s in o)y(l,s,r[s],o[s],n,t.t)},g=(t,s,l)=>{let r,i,a=s.h[l],c=0;if(null!==a.i)r=a.$=o.createTextNode(a.i);else{if(n||(n="svg"===a.p),r=a.$=o.createElementNS(n?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",a.p),n&&"foreignObject"===a.p&&(n=!1),b(null,a,n),null!=e&&r["s-si"]!==e&&r.classList.add(r["s-si"]=e),a.h)for(c=0;c<a.h.length;++c)i=g(t,a,c),i&&r.appendChild(i);"svg"===a.p?n=!1:"foreignObject"===r.tagName&&(n=!0)}return r},v=(e,n,s,l,r,o)=>{let i,a=e;for(a.shadowRoot&&a.tagName===t&&(a=a.shadowRoot);r<=o;++r)l[r]&&(i=g(null,s,r),i&&(l[r].$=i,a.insertBefore(i,n)))},S=(e,t,n,s,l)=>{for(;t<=n;++t)(s=e[t])&&(l=s.$,M(s),l.remove())},j=(e,t)=>e.p===t.p,O=(e,t)=>{const s=t.$=e.$,l=e.h,r=t.h,o=t.p,i=t.i;null===i?(n="svg"===o||"foreignObject"!==o&&n,"slot"===o||b(e,t,n),null!==l&&null!==r?((e,t,n,s)=>{let l,r=0,o=0,i=t.length-1,a=t[0],c=t[i],u=s.length-1,h=s[0],p=s[u];for(;r<=i&&o<=u;)null==a?a=t[++r]:null==c?c=t[--i]:null==h?h=s[++o]:null==p?p=s[--u]:j(a,h)?(O(a,h),a=t[++r],h=s[++o]):j(c,p)?(O(c,p),c=t[--i],p=s[--u]):j(a,p)?(O(a,p),e.insertBefore(a.$,c.$.nextSibling),a=t[++r],p=s[--u]):j(c,h)?(O(c,h),e.insertBefore(c.$,a.$),c=t[--i],h=s[++o]):(l=g(t&&t[o],n,o),h=s[++o],l&&a.$.parentNode.insertBefore(l,a.$));r>i?v(e,null==s[u+1]?null:s[u+1].$,n,s,o,u):o>u&&S(t,r,i)})(s,l,t,r):null!==r?(null!==e.i&&(s.textContent=""),v(s,null,t,r,0,r.length-1)):null!==l&&S(l,0,l.length-1),n&&"svg"===o&&(n=!1)):e.i!==i&&(s.data=i)},M=e=>{e.u&&e.u.ref&&e.u.ref(null),e.h&&e.h.map(M)},k=e=>N(e).m,C=(e,t)=>{t&&!e.g&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.g=t)))},x=(e,t)=>{if(e.t|=16,!(4&e.t))return C(e,e.v),te((()=>L(e,t)));e.t|=512},L=(e,t)=>{const n=e.S;return A(void 0,(()=>P(e,n,t)))},P=async(e,t,n)=>{const s=e.m,l=s["s-rc"];n&&(e=>{const t=e.j,n=e.m,s=t.t,l=((e,t)=>{let n=u(t),s=J.get(n);if(e=11===e.nodeType?e:o,s)if("string"==typeof s){let t,l=a.get(e=e.head||e);l||a.set(e,l=new Set),l.has(n)||(t=o.createElement("style"),t.innerHTML=s,e.insertBefore(t,e.querySelector("link")),l&&l.add(n))}else e.adoptedStyleSheets.includes(s)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,s]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&s&&(n["s-sc"]=l,n.classList.add(l+"-h"))})(e),E(e,t),l&&(l.map((e=>e())),s["s-rc"]=void 0);{const t=s["s-p"],n=()=>R(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},E=(n,s)=>{try{s=s.render(),n.t&=-17,n.t|=2,((n,s)=>{const l=n.m,r=n.j,o=n.O||$(null,null),i=(e=>e&&e.p===d)(s)?s:p(null,null,s);t=l.tagName,r.M&&(i.u=i.u||{},r.M.map((([e,t])=>i.u[t]=l[e]))),i.p=null,i.t|=4,n.O=i,i.$=o.$=l.shadowRoot||l,e=l["s-sc"],O(o,i)})(n,s)}catch(e){B(e,n.m)}return null},R=e=>{const t=e.m,n=e.S,s=e.v;64&e.t||(e.t|=64,H(t),U(n,"componentDidLoad"),e.k(t),s||T()),e.g&&(e.g(),e.g=void 0),512&e.t&&ee((()=>x(e,!1))),e.t&=-517},T=()=>{H(o.documentElement),ee((()=>(e=>{const t=r.ce("appload",{detail:{namespace:"instant-apps-components"}});return e.dispatchEvent(t),t})(s)))},U=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){B(e)}},A=(e,t)=>e&&e.then?e.then(t):t(),H=e=>e.classList.add("hydrated"),W=(e,t,n)=>{if(t.C){const s=Object.entries(t.C),l=e.prototype;if(s.map((([e,[s]])=>{(31&s||2&n&&32&s)&&Object.defineProperty(l,e,{get(){return((e,t)=>N(this).L.get(t))(0,e)},set(n){((e,t,n,s)=>{const l=N(this),r=l.L.get(t),o=l.t,i=l.S;n=((e,t)=>null==e||h(e)?e:4&t?"false"!==e&&(""===e||!!e):1&t?e+"":e)(n,s.C[t][0]),8&o&&void 0!==r||n===r||(l.L.set(t,n),i&&2==(18&o)&&x(l,!1))})(0,e,n,t)},configurable:!0,enumerable:!0})})),1&n){const n=new Map;l.attributeChangedCallback=function(e,t,s){r.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))s=this[t],delete this[t];else if(l.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==s)return;this[t]=(null!==s||"boolean"!=typeof this[t])&&s}))},e.observedAttributes=s.filter((([e,t])=>15&t[0])).map((([e,s])=>{const l=s[1]||e;return n.set(l,e),512&s[0]&&t.M.push([e,l]),l}))}}return e},q=(e,t={})=>{const n=[],l=t.exclude||[],i=s.customElements,a=o.head,h=a.querySelector("meta[charset]"),p=o.createElement("style"),d=[];let f,m=!0;Object.assign(r,t),r.l=new URL(t.resourcesUrl||"./",o.baseURI).href,e.map((e=>{e[1].map((t=>{const s={t:t[0],o:t[1],C:t[2],P:t[3]};s.C=t[2],s.M=[];const o=s.o,a=class extends HTMLElement{constructor(e){super(e),_(e=this,s),1&s.t&&e.attachShadow({mode:"open"})}connectedCallback(){f&&(clearTimeout(f),f=null),m?d.push(this):r.jmp((()=>(e=>{if(0==(1&r.t)){const t=N(e),n=t.j,s=()=>{};if(!(1&t.t)){t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){C(t,t.v=n);break}}n.C&&Object.entries(n.C).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,s,l)=>{if(0==(32&t.t)){{if(t.t|=32,(l=I(n)).then){const e=()=>{};l=await l,e()}l.isProxied||(W(l,n,2),l.isProxied=!0);const s=()=>{};t.t|=8;try{new l(t)}catch(e){B(e)}t.t&=-9,s()}if(l.style){let e=l.style;const t=u(n);if(!J.has(t)){const s=()=>{};((e,t,n)=>{let s=J.get(e);c&&n?(s=s||new CSSStyleSheet,s.replace(t)):s=t,J.set(e,s)})(t,e,!!(1&n.t)),s()}}}const r=t.v,o=()=>x(t,!0);r&&r["s-rc"]?r["s-rc"].push(o):o()})(0,t,n)}s()}})(this)))}disconnectedCallback(){r.jmp((()=>(()=>{0==(1&r.t)&&U(N(this).S,"disconnectedCallback")})()))}componentOnReady(){return N(this).R}};s.T=e[0],l.includes(o)||i.get(o)||(n.push(o),i.define(o,W(a,s,1)))}))})),p.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",p.setAttribute("data-styles",""),a.insertBefore(p,h?h.nextSibling:a.firstChild),m=!1,d.length?d.map((e=>e.connectedCallback())):r.jmp((()=>f=setTimeout(T,30)))},D=e=>{const t=new URL(e,r.l);return t.origin!==s.location.origin?t.href:t.pathname},F=new WeakMap,N=e=>F.get(e),V=(e,t)=>F.set(t.S=e,t),_=(e,t)=>{const n={t:0,m:e,j:t,L:new Map};return n.R=new Promise((e=>n.k=e)),e["s-p"]=[],e["s-rc"]=[],F.set(e,n)},z=(e,t)=>t in e,B=(e,t)=>(0,console.error)(e,t),G=new Map,I=e=>{const t=e.o.replace(/-/g,"_"),n=e.T,s=G.get(n);return s?s[t]:import(`./${n}.entry.js`).then((e=>(G.set(n,e),e[t])),B)},J=new Map,K=[],Q=[],X=(e,t)=>n=>{e.push(n),l||(l=!0,t&&4&r.t?ee(Z):r.raf(Z))},Y=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){B(e)}e.length=0},Z=()=>{Y(K),Y(Q),(l=K.length>0)&&r.raf(Z)},ee=e=>i().then(e),te=X(Q,!0);export{d as H,k as a,q as b,D as g,p as h,i as p,V as r};