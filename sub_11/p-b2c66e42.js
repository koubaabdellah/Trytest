const e=(e,t)=>{let n;return(...r)=>new Promise((o=>{n&&clearTimeout(n),n=setTimeout((()=>o(e(...r))),t)}))},t=(e,t)=>{let n;return(...r)=>new Promise((o=>{n||(n=setTimeout((()=>{clearTimeout(n),n=void 0,o(e(...r))}),t))}))};function n(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function r(e){return null!=e}function o(e){return new Promise((t=>setTimeout(t,e)))}export{t as a,e as d,n as e,r as i,o as t}