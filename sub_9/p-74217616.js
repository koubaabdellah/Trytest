import{r as n}from"./p-4a6461bd.js";import{c as o}from"./p-199e5a41.js";function r(n){var r;const{portal:u,config:i}=o;return null!==(r=null==i?void 0:i.restBaseUrl)&&void 0!==r?r:function(n){var o;return null!==(o=n.restUrl)&&void 0!==o?o:n.portalUrl}(n||u)}function u(n){var o;return(null==n?void 0:n.credential)?n.credential.token:(null===(o=null==n?void 0:n.user)||void 0===o?void 0:o.credential)?n.user.credential.token:""}async function i(o={},u){return n(`${r(u)}/community/groups`,o)}export{u as a,r as g,i as q}