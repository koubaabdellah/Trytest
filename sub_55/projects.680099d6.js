(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["projects"],{"76fc":function(e,t,r){"use strict";r.r(t);var a=r("7a23"),i={class:"container mx-auto mt-10 sm:mt-20"};function n(e,t,r,n,l,c){var s=Object(a["z"])("ProjectSingleHeader"),o=Object(a["z"])("ProjectSingleGallery"),d=Object(a["z"])("ProjectSingleInfo"),m=Object(a["z"])("ProjectSingleRelatedProjects");return Object(a["r"])(),Object(a["e"])("div",i,[Object(a["i"])(s,{singleProjectHeader:e.singleProjectHeader},null,8,["singleProjectHeader"]),Object(a["i"])(o,{projectImages:e.projectImages},null,8,["projectImages"]),Object(a["i"])(d,{projectInfo:e.projectInfo},null,8,["projectInfo"]),Object(a["i"])(m,{relatedProject:e.relatedProject},null,8,["relatedProject"])])}r("ac1f"),r("5319");var l=r("77c6"),c=r.n(l),s={class:"text-left text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light mt-7 sm:mt-20 mb-7"},o={class:"flex"},d={class:"flex items-center mr-10"},m=Object(a["i"])("i",{"data-feather":"clock",class:"w-4 h-4 text-ternary-dark dark:text-ternary-light"},null,-1),u={class:"ml-2 leading-none text-primary-dark dark:text-primary-light"},p={class:"flex items-center"},b=Object(a["i"])("i",{"data-feather":"tag",class:"w-4 h-4 text-ternary-dark dark:text-ternary-light"},null,-1),j={class:"ml-2 leading-none text-primary-dark dark:text-primary-light"};function g(e,t,r,i,n,l){return Object(a["r"])(),Object(a["e"])("div",null,[Object(a["i"])("p",s,Object(a["B"])(r.singleProjectHeader.singleProjectTitle),1),Object(a["i"])("div",o,[Object(a["i"])("div",d,[m,Object(a["i"])("span",u,Object(a["B"])(r.singleProjectHeader.singleProjectDate),1)]),Object(a["i"])("div",p,[b,Object(a["i"])("span",j,Object(a["B"])(r.singleProjectHeader.singleProjectTag),1)])])])}var f={props:["singleProjectHeader"]},x=r("6b0d"),k=r.n(x);const O=k()(f,[["render",g]]);var h=O,v={class:"grid grid-cols-1 sm:grid-cols-3 sm:gap-10 mt-12"};function y(e,t,r,i,n,l){return Object(a["r"])(),Object(a["e"])("div",v,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(r.projectImages,(function(e){return Object(a["r"])(),Object(a["e"])("div",{class:"mb-10 sm:mb-0",key:e.id},[Object(a["i"])("img",{src:e.img,class:"rounded-2xl cursor-pointer shadow-lg sm:shadow-none",alt:"{{ projectImage.title }}"},null,8,["src"])])})),128))])}var w={props:["projectImages"]};const P=k()(w,[["render",y]]);var I=P,q=(r("a15b"),{class:"block sm:flex gap-0 sm:gap-10 mt-14"}),S={class:"w-full sm:w-1/3 text-left"},H={class:"mb-7"},B={class:"text-2xl font-semibold text-secondary-dark dark:text-secondary-light mb-2"},D={class:"leading-loose"},J={class:"mb-7"},L={class:"text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2"},T={class:"text-primary-dark dark:text-ternary-light"},z={class:"mb-7"},N={class:"text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2"},F={class:"text-primary-dark dark:text-ternary-light"},C={class:"text-2xl font-semibold text-ternary-dark dark:text-ternary-light mb-2"},G={class:"flex items-center gap-3 mt-5"},E={class:"w-full sm:w-2/3 text-left mt-10 sm:mt-0"},W={class:"text-primary-dark dark:text-primary-light text-2xl font-bold mb-7"};function A(e,t,r,i,n,l){return Object(a["r"])(),Object(a["e"])("div",q,[Object(a["i"])("div",S,[Object(a["i"])("div",H,[Object(a["i"])("p",B,Object(a["B"])(r.projectInfo.clientHeading),1),Object(a["i"])("ul",D,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(r.projectInfo.companyInfos,(function(e){return Object(a["r"])(),Object(a["e"])("li",{key:e,class:"text-ternary-dark dark:text-ternary-light"},[Object(a["i"])("span",null,Object(a["B"])(e.title)+": ",1),Object(a["i"])("a",{href:"#",class:"Website"==e.title||"Phone"==e.title?"hover:underline cursor-pointer":"","aria-label":"Project Webiste and Phone"},Object(a["B"])(e.details),3)])})),128))])]),Object(a["i"])("div",J,[Object(a["i"])("p",L,Object(a["B"])(r.projectInfo.objectivesHeading),1),Object(a["i"])("p",T,Object(a["B"])(r.projectInfo.objectivesDetails),1)]),Object(a["i"])("div",z,[Object(a["i"])("p",N,Object(a["B"])(r.projectInfo.technlogies[0].title),1),Object(a["i"])("p",F,Object(a["B"])(r.projectInfo.technlogies[0].techs.join(", ")),1)]),Object(a["i"])("div",null,[Object(a["i"])("p",C,Object(a["B"])(r.projectInfo.socialSharingsHeading),1),Object(a["i"])("div",G,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(r.projectInfo.socialSharings,(function(e){return Object(a["r"])(),Object(a["e"])("a",{key:e.id,href:e.url,target:"__blank","aria-label":"Share Project",class:"bg-ternary-light dark:bg-ternary-dark text-gray-400 hover:text-primary-dark dark:hover:text-primary-light p-2 rounded-lg shadow-sm"},[Object(a["i"])("i",{"data-feather":e.icon,class:"w-5 h-5"},null,8,["data-feather"])],8,["href"])})),128))])])]),Object(a["i"])("div",E,[Object(a["i"])("p",W,Object(a["B"])(r.projectInfo.projectDetailsHeading),1),(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(r.projectInfo.projectDetails,(function(e){return Object(a["r"])(),Object(a["e"])("p",{key:e.id,class:"mb-5 text-lg text-ternary-dark dark:text-ternary-light"},Object(a["B"])(e.details),1)})),128))])])}var M={props:["projectInfo"],mounted:function(){c.a.replace()},updated:function(){c.a.replace()}};const R=k()(M,[["render",A]]);var V=R,_={class:"mt-10 pt-10 sm:pt-14 sm:mt-20 border-t-2 border-primary-light dark:border-secondary-dark"},U={class:"text-primary-dark dark:text-primary-light text-3xl font-bold mb-10 sm:mb-14 text-left"},X={class:"grid grid-cols-1 sm:grid-cols-4 gap-10"};function K(e,t,r,i,n,l){return Object(a["r"])(),Object(a["e"])("div",_,[Object(a["i"])("p",U,Object(a["B"])(r.relatedProject.relatedProjectsHeading),1),Object(a["i"])("div",X,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(r.relatedProject.relatedProjects,(function(e){return Object(a["r"])(),Object(a["e"])("div",{key:e.id},[Object(a["i"])("a",{href:e.url},[Object(a["i"])("img",{src:e.img,class:"rounded-2xl cursor-pointer",alt:e.title},null,8,["src","alt"])],8,["href"])])})),128))])])}var Q={props:["relatedProject"]};const Y=k()(Q,[["render",K]]);var Z=Y,$={name:"Projects",components:{ProjectSingleHeader:h,ProjectSingleGallery:I,ProjectSingleInfo:V,ProjectSingleRelatedProjects:Z},data:function(){return{singleProjectHeader:{singleProjectTitle:"Flekto.nl",singleProjectDate:"Nov, 2021",singleProjectTag:"Website"},projectImages:[{id:1,title:"Flekto.nl",img:r("0292")},{id:2,title:"Jokasport.nl",img:r("96fc")},{id:3,title:"Felixflos.nl",img:r("0292")}],projectInfo:{clientHeading:"Over de klant",companyInfos:[{id:1,title:"Naam",details:"Jokasport.nl"},{id:2,title:"Diensten",details:"Sportartikelen & meerdere verkoopkanalen"},{id:3,title:"Webshop",details:"https://www.jokasport.nl"}],objectivesHeading:"Doel",objectivesDetails:"Jokasport is de oudste winkel voor Sportartikelen in Nederland, en het doel hierbij is natuurlijk online uitblinken in het verkopen van sportartikelen. En dit is dan ook precies waar Flekto.nl heeft kunnen bijstaan, door de webshop van Magento naar Woocommerce te migreren en te optimaal te hosten voor een shop van dit kaliber. Jokasport heeft duizenden producten, en verkoopt via verschillende verkoopkanalen die allemaal zijn verbonden met de webshop. ",technlogies:[{title:"Tools & Technologies",techs:["HTML","CSS","JavaScript","Vue.js","TailwindCSS","AdobeXD"]}],projectDetailsHeading:"Challenge",projectDetails:[{id:1,details:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil vel illum asperiores dignissimos cumque quibusdam et fugiat voluptatem nobis suscipit explicabo, eaque consequatur nesciunt, fugit eligendi corporis laudantium adipisci soluta? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt totam dolorum, ducimus obcaecati, voluptas facilis molestias nobis ut quam natus similique inventore excepturi optio ipsa deleniti fugit illo. Unde, amet! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum illo necessitatibus perspiciatis! Aperiam perferendis labore temporibus, eos culpa corporis recusandae quas, fuga voluptatibus nesciunt odit libero tenetur neque consequatur ea."},{id:2,details:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil vel illum asperiores dignissimos cumque quibusdam et fugiat voluptatem nobis suscipit explicabo, eaque consequatur nesciunt, fugit eligendi corporis laudantium adipisci soluta?"},{id:3,details:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil vel illum asperiores dignissimos cumque quibusdam et fugiat voluptatem nobis suscipit explicabo, eaque consequatur nesciunt, fugit eligendi corporis laudantium adipisci soluta?"},{id:4,details:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil vel illum asperiores dignissimos cumque quibusdam et fugiat voluptatem nobis suscipit explicabo, eaque consequatur nesciunt, fugit eligendi corporis laudantium adipisci soluta? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt totam dolorum, ducimus obcaecati, voluptas facilis molestias nobis ut quam natus similique inventore excepturi optio ipsa deleniti fugit illo. Unde, amet! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum illo necessitatibus perspiciatis! Aperiam perferendis labore temporibus, eos culpa corporis recusandae quas, fuga voluptatibus nesciunt odit libero tenetur neque consequatur ea."}],socialSharingsHeading:"Share This",socialSharings:[{id:1,name:"Twitter",icon:"twitter",url:"https://www.twitter.com/navvvv"},{id:2,name:"Instagram",icon:"instagram",url:"https://www.instagram.com/nav_appaiya"},{id:3,name:"Facebook",icon:"facebook",url:"https://www.facebook.com/nav-appaiya"},{id:4,name:"LinkedIn",icon:"linkedin",url:"https://www.linkedin.com/in/nav-appaiya-6bb7b975/"}]},relatedProject:{relatedProjectsHeading:"Gerelateerde Projects",relatedProjects:[{id:1,title:"Rikkimode",img:r("2fc4"),url:"https://rikkimode.nl"},{id:2,title:"Meprint.nl",img:r("e368"),url:"https://meprint.nl"},{id:3,title:"Sports-supplier.nl",img:r("6076"),url:"https://sports-supplier.nl"},{id:4,title:"Flekto.nl",img:r("0292"),url:"https://flekto.nl"}]}}},mounted:function(){c.a.replace()},updated:function(){c.a.replace()},methods:{}};const ee=k()($,[["render",n]]);t["default"]=ee},"78c1":function(e,t,r){"use strict";r.r(t);var a=r("7a23"),i={class:"container mx-auto"};function n(e,t,r,n,l,c){var s=Object(a["z"])("ProjectsGrid");return Object(a["r"])(),Object(a["e"])("div",i,[Object(a["i"])(s)])}var l=r("3808"),c={name:"Projects",components:{ProjectsGrid:l["a"]}},s=r("6b0d"),o=r.n(s);const d=o()(c,[["render",n]]);t["default"]=d},"96fc":function(e,t,r){e.exports=r.p+"img/download.8ca4ff58.png"},a15b:function(e,t,r){"use strict";var a=r("23e7"),i=r("44ad"),n=r("fc6a"),l=r("a640"),c=[].join,s=i!=Object,o=l("join",",");a({target:"Array",proto:!0,forced:s||!o},{join:function(e){return c.call(n(this),void 0===e?",":e)}})},acca:function(e,t,r){"use strict";r.r(t);var a=r("7a23"),i={class:"container mx-auto"};function n(e,t,r,n,l,c){var s=Object(a["z"])("ProjectsGrid");return Object(a["r"])(),Object(a["e"])("div",i,[Object(a["i"])(s)])}var l=r("3808"),c={name:"Projects",components:{ProjectsGrid:l["a"]}},s=r("6b0d"),o=r.n(s);const d=o()(c,[["render",n]]);t["default"]=d},b8fa:function(e,t,r){"use strict";r.r(t);var a=r("7a23"),i={class:"container mx-auto sm:flex py-5 sm:py-10 mt-10 sm:mt-20"};function n(e,t,r,n,l,c){var s=Object(a["z"])("ContactForm"),o=Object(a["z"])("ContactDetails");return Object(a["r"])(),Object(a["e"])("div",i,[Object(a["i"])(s),Object(a["i"])(o,{contacts:e.contacts},null,8,["contacts"])])}r("ac1f"),r("5319");var l=r("77c6"),c=r.n(l),s={class:"w-full sm:w-1/2"},o=Object(a["g"])('<div class="leading-loose"><form class="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left" id="contactform"><p class="text-primary-dark dark:text-primary-light text-2xl font-semibold mb-8"> Contact met Nav </p><div class=""><label class="block text-lg text-primary-dark dark:text-primary-light mb-2" for="name">Je volledige naam</label><input class="w-full px-5 py-2 border-0 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md dark:font-medium" id="name" name="name" type="text" required="" placeholder="Piet Heyn" aria-label="Name"></div><div class="mt-6"><label class="block text-lg text-primary-dark dark:text-primary-light mb-2" for="email">Je Email</label><input class="w-full px-5 py-2 border-0 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md dark:font-medium" id="email" name="email" type="text" required="" placeholder="Je Email" aria-label="Email"></div><div class="mt-6"><label class="block text-lg text-primary-dark dark:text-primary-light mb-2" for="subject">Onderwerp</label><input class="w-full px-5 py-2 border-0 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md dark:font-medium" id="subject" name="subject" type="text" required="" placeholder="Onderwerp van je bericht" aria-label="Onderwerp"></div><div class="mt-6"><label class="block text-lg text-primary-dark dark:text-primary-light mb-2" for="message">Je bericht</label><textarea class="w-full px-5 py-2 border-0 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md dark:font-medium" id="message" name="message" cols="14" rows="6" aria-label="Message"></textarea></div><div class="mt-6"><button class="px-4 py-2.5 text-white font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg" type="submit" aria-label="Verstuur bericht"> Verstuur bericht </button></div></form></div>',1);function d(e,t,r,i,n,l){return Object(a["r"])(),Object(a["e"])("div",s,[o])}var m=document.getElementById("contactform"),u=m.querySelector("input[name=name]"),p=m.querySelector("input[name=email]");function b(e){e.preventDefault();var t=u.value,r=p.value;console.log({name:t,email:r}),alert("Processing!")}m.addEventListener("submit",b);var j={},g=r("6b0d"),f=r.n(g);const x=f()(j,[["render",d]]);var k=x,O=(r("b0c0"),{class:"w-full sm:w-1/2"}),h={class:"text-left max-w-xl px-6"},v=Object(a["i"])("h2",{class:"text-2xl text-primary-dark dark:text-primary-light font-semibold mt-12 mb-8"}," Flekto.nl ",-1),y={class:""};function w(e,t,r,i,n,l){return Object(a["r"])(),Object(a["e"])("div",O,[Object(a["i"])("div",h,[v,Object(a["i"])("ul",y,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(r.contacts,(function(e){return Object(a["r"])(),Object(a["e"])("li",{class:"flex",key:e.id},[Object(a["i"])("i",{"data-feather":e.icon,class:"w-5 text-gray-500 dark:text-gray-400 mr-4"},null,8,["data-feather"]),Object(a["i"])("a",{href:"#",class:["text-lg mb-4 text-ternary-dark dark:text-ternary-light","mail"===e.icon||"phone"===e.icon?"hover:underline cursor-pointer":""],"aria-label":"Website and Phone"},Object(a["B"])(e.name),3)])})),128))])])])}var P={props:["contacts"]};const I=f()(P,[["render",w]]);var q=I,S={components:{ContactForm:k,ContactDetails:q},data:function(){return{contacts:[{id:1,name:"Snoekenveen 926, Spijkenisse, The Netherlands",icon:"map-pin"},{id:2,name:"navarajh@gmail.com",icon:"mail"}]}},mounted:function(){c.a.replace()},updated:function(){c.a.replace()},methods:{}};const H=f()(S,[["render",n]]);t["default"]=H}}]);
//# sourceMappingURL=projects.680099d6.js.map