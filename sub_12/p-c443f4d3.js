import{d as e,f as t}from"./p-737d2cb2.js";const s=e=>!("isConnected"in e)||e.isConnected,n=(()=>{let e;return(...t)=>{e&&clearTimeout(e),e=setTimeout((()=>{e=0,(e=>{for(let t of e.keys())e.set(t,e.get(t).filter(s))})(...t)}),2e3)}})(),o=(s,o)=>{const r=((e,t=((e,t)=>e!==t))=>{let s=new Map(Object.entries(null!=e?e:{}));const n={dispose:[],get:[],set:[],reset:[]},o=()=>{s=new Map(Object.entries(null!=e?e:{})),n.reset.forEach((e=>e()))},r=e=>(n.get.forEach((t=>t(e))),s.get(e)),c=(e,o)=>{const r=s.get(e);t(o,r,e)&&(s.set(e,o),n.set.forEach((t=>t(e,o,r))))},u="undefined"==typeof Proxy?{}:new Proxy(e,{get:(e,t)=>r(t),ownKeys:()=>Array.from(s.keys()),getOwnPropertyDescriptor:()=>({enumerable:!0,configurable:!0}),has:(e,t)=>s.has(t),set:(e,t,s)=>(c(t,s),!0)}),p=(e,t)=>(n[e].push(t),()=>{((e,t)=>{const s=e.indexOf(t);s>=0&&(e[s]=e[e.length-1],e.length--)})(n[e],t)});return{state:u,get:r,set:c,on:p,onChange:(t,s)=>{const n=p("set",((e,n)=>{e===t&&s(n)})),o=p("reset",(()=>s(e[t])));return()=>{n(),o()}},use:(...e)=>{const t=e.reduce(((e,t)=>(t.set&&e.push(p("set",t.set)),t.get&&e.push(p("get",t.get)),t.reset&&e.push(p("reset",t.reset)),t.dispose&&e.push(p("dispose",t.dispose)),e)),[]);return()=>t.forEach((e=>e()))},dispose:()=>{n.dispose.forEach((e=>e())),o()},reset:o,forceUpdate:e=>{const t=s.get(e);n.set.forEach((s=>s(e,t,t)))}}})(s,o);return r.use((()=>{if("function"!=typeof e)return{};const s=new Map;return{dispose:()=>s.clear(),get:t=>{const n=e();n&&((e,t,s)=>{const n=e.get(t);n?n.includes(s)||n.push(s):e.set(t,[s])})(s,t,n)},set:e=>{const o=s.get(e);o&&s.set(e,o.filter(t)),n(s)},reset:()=>{s.forEach((e=>e.forEach(t))),n(s)}}})()),r};export{o as c}