(function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define("build/main/js/organization",[],o):"object"==typeof exports?exports["build/main/js/organization"]=o():e["build/main/js/organization"]=o()}(this,function(){
var __EXPORTS__=(()=>{var n=Object.defineProperty;var r=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var a=Object.prototype.hasOwnProperty;var c=(o,t)=>{for(var i in t)n(o,i,{get:t[i],enumerable:!0})},f=(o,t,i,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let e of w(t))!a.call(o,e)&&e!==i&&n(o,e,{get:()=>t[e],enumerable:!(s=r(t,e))||s.enumerable});return o};var g=o=>f(n({},"__esModule",{value:!0}),o);var b={};c(b,{default:()=>H});var h=class{constructor(t){this.node=t,this.block=t.querySelector(".ss-contents"),this.block&&this.init()}init(){this.onResize(),window.scrollY>0&&this.update(),window.addEventListener("scroll",window.rafThrottle(this.update.bind(this)),{passive:!0}),window.addEventListener("height",window.rafThrottle(this.onResize.bind(this)),{passive:!0}),window.addEventListener("resize",window.rafThrottle(()=>{this.onResize(),this.update()}),{passive:!0})}onResize(){let t=this.block.parentNode;this.windowHeight=window.innerHeight,this.nodeHeight=this.node.offsetHeight,this.blockHeight=this.block.offsetHeight,this.offsetLeft=t.getBoundingClientRect().left,this.block.style.width=`${t.offsetWidth}px`,Object.assign(t.style,{height:`${Math.max(this.nodeHeight,this.blockHeight)}px`,overflow:"hidden"})}update(){let t=this.node.getBoundingClientRect().top+window.scrollY,i=window.scrollY-t,s={position:"relative",top:0,left:0,transform:""};if(i+this.windowHeight>=this.nodeHeight)s.top=`${this.nodeHeight-Math.max(this.blockHeight,this.windowHeight)}px`;else if(i>0&&this.nodeHeight>this.windowHeight){let e=(this.windowHeight-Math.max(this.blockHeight,this.windowHeight))/(this.nodeHeight-this.windowHeight);e<1&&(s.position="fixed",s.left=`${this.block.parentNode.getBoundingClientRect().left}px`);let l=Math.round(i*e+(e>=1?i:0));s.transform=`translateY(${l}px)`}Object.assign(this.block.style,s)}},d=h;var H={SpeedyScroll:d};return g(b);})();
return __EXPORTS__ ? __EXPORTS__.default : null;}));
