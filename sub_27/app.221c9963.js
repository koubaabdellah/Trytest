(function(t){function e(e){for(var a,c,i=e[0],l=e[1],s=e[2],d=0,u=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&u.push(n[c][0]),n[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);m&&m(e);while(u.length)u.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],a=!0,c=1;c<r.length;c++){var l=r[c];0!==n[l]&&(a=!1)}a&&(o.splice(e--,1),t=i(i.s=r[0]))}return t}var a={},n={app:0},o=[];function c(t){return i.p+"js/"+({about:"about",projects:"projects"}[t]||t)+"."+{about:"0bbe7490",projects:"680099d6"}[t]+".js"}function i(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.e=function(t){var e=[],r=n[t];if(0!==r)if(r)e.push(r[2]);else{var a=new Promise((function(e,a){r=n[t]=[e,a]}));e.push(r[2]=a);var o,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=c(t);var s=new Error;o=function(e){l.onerror=l.onload=null,clearTimeout(d);var r=n[t];if(0!==r){if(r){var a=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",s.name="ChunkLoadError",s.type=a,s.request=o,r[1](s)}n[t]=void 0}};var d=setTimeout((function(){o({type:"timeout",target:l})}),12e4);l.onerror=l.onload=o,document.head.appendChild(l)}return Promise.all(e)},i.m=t,i.c=a,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(r,a,function(e){return t[e]}.bind(null,a));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/",i.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var m=s;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"0292":function(t,e,r){t.exports=r.p+"img/flekt.131e5e83.png"},"0ea0":function(t,e,r){t.exports=r.p+"img/developer.ed02891e.svg"},1945:function(t,e,r){"use strict";r("cf25")},"2cbf":function(t,e,r){t.exports=r.p+"img/jokasport.48733c5f.png"},"2d66":function(t,e,r){t.exports=r.p+"img/logo-dark.4c556d30.svg"},"2fc4":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdAAAABsCAMAAADt/BOIAAAAh1BMVEX///8AAAD8/Pz4+PgEBAQICAj29vaHh4cwMDDw8PB0dHTGxsbe3t4iIiLz8/NwcHAWFhZjY2Pn5+cnJyfQ0NCRkZHX19fm5uZpaWm4uLgUFBQqKiqlpaVfX1+urq6CgoI9PT01NTVRUVGcnJxERETKysocHBywsLCUlJR7e3s6OjpWVlZCQkKyvgFLAAAEKklEQVR4nO3bbW+qTBAG4NlZQJFXQVFRa32p1dr///uemV2KnqQnec4nMbmvtgIrbUjuDOyuWyIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAB3zfkV1mv/UtesTd1vqNO4O7M/kvfxOehzvWvfqcJDtr9Zsj+WLO9V2K5J1cT4ysNORMFoEOEPcF6VJzmUpw1rVazZa6kpRXG7kTc233vwuDMzFlGATB+zWxmuXcnI1JaFG2oaljztdta/akzaFJmG5hqW/bpZ7WINABmpgfh1RKbqR7iSYoNmQlN7Mm39zQzJ0nlbvVnfTZ1w6/kEDD0EiNhiZLI0ku0EC5kjbzFXEmwY27fGd0NaF7l6YuUFToAGmgkqEJ5HVp+0B1JzQr+iNQl/JY+7sIdLDcLXe0+dLNueI+0EYDvf1Roc1Rs3/T7jACHSwJNJBKTPXGK0/FLlDp8Ra6l461JjVQOZh9y2voOrcIdLBcoG8c68ZU/S3XagcoMMVDoKH0hELpKCkEOli+QvlTKzSLfwLVMpzqrnaWfKBB4H5y91sIdLC0U2RO7/J0DM2S+goVH9pVugcqicv+3M9DuLAR6BBphWolSoG2Dd8DjbhxeQbBT6co1PM2bva36xQ9+9rhFxqojkakj9uNVn5uuYVP+ucZ6u+/oZvBRaDD5Z6h7qfR+fe+QqXfKxmuz32nKAhrnVZ4Q4UOm3uGvhv/BH2oUF+gm/U9UDNv5aB08/QIdLDcxMJGozIf/FChqd6Hz4vWTyz4Kd6lxvqmg9Stn9uF4fHDlp1GtaSHQEfasovvgcpZH+6JahHokLlAN26iz8zut9zKPVZni/Ax0PhdG1dkCYEOlg803mqHZ9qPQ2mn07bLuGpNP2wxn7zREj31c7nPvnb4hXuGrmxj/Aeh3eehaeA+XmHbPkzOJ8x7dzbj89DhmoRZbWZE17LOyiXN2zqTQOdhlpUFczzOzueTFG6bnUu5I2+kPTxYnpZZdkagA8RxHOcx28jKThXbXA/lIHcby7qJZKPvWLacL/I8ns30tBxrigZJV4FFugJM+jrWLxnjflGnZhYlutQv8SsDSWLk0Zz6pWPwcpJaopvtbb/aky4XXRDIfu0fvJpPHc4s25h4sSCO7CKfH4niiFCgr+n6vaT0sGyqMmu/qspkxlzTsTEX3HJfkIQ2bmp7SUar64RoWpxGZCdFcUuTcYxAXw5LT8nQcXezx+l+JcOWU51IzU4PWT3+jqNnXx78M+a0pMhcaLWdb+P4e7Qt0qa+7rZNc8PK+dejK1GmZI8pNVO+1nWRLg7r8f5oi/X6EuXPvjz4d+z+AU1HokxVpQnr9APToiIMW14Ud/995g8e259zPQDwF6hJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/5T8ufy0ry63D9QAAAABJRU5ErkJggg=="},3808:function(t,e,r){"use strict";var a=r("7a23"),n={class:"pt-20 sm:pt-28",ref:"projecten"},o={class:"text-center"},c={class:"text-2xl sm:text-5xl font-semibold mb-3 text-ternary-dark dark:text-ternary-light"},i={class:"text-md sm:text-xl text-gray-500 dark:text-ternary-light"},l={class:"mt-10 sm:mt-16"},s={class:"grid grid-cols-1 sm:grid-cols-3 mt-6 sm:gap-10"};function d(t,e,r,d,m,u){var b=Object(a["z"])("ProjectsFilter"),p=Object(a["z"])("ProjectSingle");return Object(a["r"])(),Object(a["e"])("section",n,[Object(a["i"])("div",o,[Object(a["i"])("p",c,Object(a["B"])(t.projectsHeading),1),Object(a["i"])("p",i,Object(a["B"])(t.projectsDescription),1)]),Object(a["i"])("div",l,[Object(a["i"])(b)]),Object(a["i"])("div",s,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(u.filteredProjects,(function(t){return Object(a["r"])(),Object(a["e"])(p,{key:t.id,project:t},null,8,["project"])})),128))])],512)}r("4de4"),r("fb6a"),r("caad"),r("2532"),r("4d63"),r("ac1f"),r("25f0"),r("466d"),r("5319");var m=r("77c6"),u=r.n(m);function b(t,e,r,n,o,c){return Object(a["r"])(),Object(a["e"])("div")}var p={props:{select:{type:String,default:""},selectOptions:{type:Array,default:function(){return["Website","Webshop","Wordpress","PHP"]}}}},f=r("6b0d"),h=r.n(f);const g=h()(p,[["render",b]]);var j=g,v={class:"text-center px-4 py-6"},x={class:"text-2xl text-ternary-dark dark:text-ternary-light font-semibold mb-2"},y={class:"text-lg text-ternary-dark dark:text-ternary-light"};function O(t,e,r,n,o,c){var i=Object(a["z"])("router-link");return Object(a["r"])(),Object(a["e"])(i,{to:"/projects/single-project",class:"rounded-3xl shadow-lg hover:shadow-xl cursor-pointer mb-10 sm:mb-0 bg-secondary-light dark:bg-ternary-dark","aria-label":"Single Project"},{default:Object(a["F"])((function(){return[Object(a["i"])("div",null,[Object(a["i"])("img",{src:r.project.img,alt:r.project.title,class:"rounded-t-3xl border-none"},null,8,["src","alt"])]),Object(a["i"])("div",v,[Object(a["i"])("p",x,Object(a["B"])(r.project.title),1),Object(a["i"])("span",y,Object(a["B"])(r.project.category),1)])]})),_:1})}var k={props:["project"]};const A=h()(k,[["render",O]]);var w=A,P={components:{ProjectSingle:w,ProjectsFilter:j},data:function(){return{projectsHeading:"Mijn Projecten",projectsDescription:"Enkele van de projecten waaraan ik heb gewerkt of die ik met succes heb afgerond.",selectedProject:"",searchProject:"",projects:[{id:1,title:"Flekto.nl",category:"Website",img:r("0292")},{id:2,title:"Jokasport.nl",category:"Website",img:r("2cbf")},{id:3,title:"Meprint.nl",category:"Webshop",img:r("e368")},{id:4,title:"Rikkimode.nl",category:"Webshop",img:r("2fc4")},{id:5,title:"Sports-supplier.nl",category:"Webshop",img:r("6076")},{id:6,title:"Felixflos.nl",category:"Webshop",img:r("3f8f")}]}},computed:{filteredProjects:function(){return this.selectedProject?this.filterProjectsByCategory():this.searchProject?this.filterProjectsBySearch():this.projects}},methods:{filterProjectsByCategory:function(){var t=this;return this.projects.filter((function(e){var r=e.category.charAt(0).toUpperCase()+e.category.slice(1);return r.includes(t.selectedProject)}))},filterProjectsBySearch:function(){var t=new RegExp(this.searchProject,"i");return this.projects.filter((function(e){return e.title.match(t)}))}},mounted:function(){u.a.replace()}};const z=h()(P,[["render",d]]);e["a"]=z},"3f8f":function(t,e,r){t.exports=r.p+"img/felixflos.c9369ded.png"},"4b62":function(t,e,r){},"557b":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d"),r("ac1f"),r("5319");var a=r("7a23"),n=Object(a["i"])("i",{"data-feather":"arrow-up"},null,-1);function o(t,e,r,o,c,i){var l=Object(a["z"])("AppHeader"),s=Object(a["z"])("router-view"),d=Object(a["z"])("back-to-top"),m=Object(a["z"])("AppFooter");return Object(a["r"])(),Object(a["e"])("div",{class:[t.appTheme,"pt-0.5"]},[Object(a["i"])(l),Object(a["i"])(a["b"],{name:"fade",mode:"out-in"},{default:Object(a["F"])((function(){return[Object(a["i"])(s,{theme:t.appTheme},null,8,["theme"])]})),_:1}),Object(a["i"])(d,{visibleoffset:"500",right:"40px",bottom:"40px",class:"shadow-lg"},{default:Object(a["F"])((function(){return[n]})),_:1}),Object(a["i"])(m)],2)}var c=r("77c6"),i=r.n(c),l=r("2d66"),s=r.n(l),d=r("e91d"),m=r.n(d),u=Object(a["H"])("data-v-3e29d39c");Object(a["u"])("data-v-3e29d39c");var b={id:"nav",class:"sm:container sm:mx-auto"},p={class:"z-10 max-w-screen-lg xl:max-w-screen-xl block sm:flex sm:justify-between sm:items-center my-6"},f={class:"flex justify-between items-center px-4 sm:px-0"},h={key:0,src:s.a,class:"w-36",alt:"Dark Logo"},g={key:1,src:m.a,class:"w-36",alt:"Light Logo"},j={class:"sm:hidden"},v={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",class:"h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"},x={key:0,"fill-rule":"evenodd",d:"M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z","clip-rule":"evenodd"},y={key:1,"fill-rule":"evenodd",d:"M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"},O=Object(a["h"])("Projecten"),k=Object(a["h"])("Over mij"),A=Object(a["h"])("Contact"),w={class:"border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark"},P={class:"hidden sm:flex justify-between items-center flex-col md:flex-row"};Object(a["s"])();var z=u((function(t,e,r,n,o,c){var i=Object(a["z"])("router-link"),l=Object(a["z"])("theme-switcher"),s=Object(a["z"])("HireMeModal");return Object(a["r"])(),Object(a["e"])("nav",b,[Object(a["i"])("div",p,[Object(a["i"])("div",f,[Object(a["i"])("div",null,[Object(a["i"])(i,{to:"/"},{default:u((function(){return["light"===o.theme?(Object(a["r"])(),Object(a["e"])("img",h)):(Object(a["r"])(),Object(a["e"])("img",g))]})),_:1})]),Object(a["i"])(l,{theme:o.theme,onThemeChanged:c.updateTheme,class:"block sm:hidden bg-ternary-light dark:bg-ternary-dark hover:bg-hover-light dark:hover:bg-hover-dark hover:shadow-sm px-2.5 py-2 rounded-lg ml-10"},null,8,["theme","onThemeChanged"]),Object(a["i"])("div",j,[Object(a["i"])("button",{onClick:e[1]||(e[1]=function(t){return o.isOpen=!o.isOpen}),type:"buttom",class:"focus:outline-none","aria-label":"Humberger Menu"},[(Object(a["r"])(),Object(a["e"])("svg",v,[o.isOpen?(Object(a["r"])(),Object(a["e"])("path",x)):Object(a["f"])("",!0),o.isOpen?Object(a["f"])("",!0):(Object(a["r"])(),Object(a["e"])("path",y))]))])])]),Object(a["i"])("div",{class:[o.isOpen?"block":"hidden","m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none"]},[Object(a["i"])(i,{to:"/projecten",class:"block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2","aria-label":"Projects"},{default:u((function(){return[O]})),_:1}),Object(a["i"])(i,{to:"/over",class:"block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark","aria-label":"About Me"},{default:u((function(){return[k]})),_:1}),Object(a["i"])(i,{to:"/contact",class:"block text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark","aria-label":"Contact"},{default:u((function(){return[A]})),_:1}),Object(a["i"])("div",w,[Object(a["i"])("button",{class:"sm:hidden block text-left text-md font-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-4 py-2 mt-2",onClick:e[2]||(e[2]=function(t){return c.showModal()}),"aria-label":"Hire Me Button"}," Contact ")])],2),Object(a["i"])("div",P,[Object(a["i"])("div",null,[Object(a["i"])("button",{class:"text-md font-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-lg px-5 py-2.5",onClick:e[3]||(e[3]=function(t){return c.showModal()}),"aria-label":"Hire Me Button"}," Meer vragen? ")]),Object(a["i"])(l,{theme:o.theme,onThemeChanged:c.updateTheme,class:"ml-8 bg-primary-light dark:bg-ternary-dark px-3 py-2 shadow-sm rounded-xl cursor-pointer"},null,8,["theme","onThemeChanged"])])]),Object(a["i"])(s,{showModal:c.showModal,modal:o.modal,categories:o.categories,"aria-modal":"Hire Me Modal"},null,8,["showModal","modal","categories"])])})),T={key:0,"data-feather":"moon",class:"text-liText-ternary-dark hover:text-gray-400 dark:text-liText-ternary-light dark:hover:text-liBorder-primary-light w-5"},M={key:1,"data-feather":"sun",class:"text-gray-200 hover:text-gray-50 w-5"};function N(t,e,r,n,o,c){return Object(a["r"])(),Object(a["e"])("a",{href:"#",onClick:e[1]||(e[1]=function(){return c.toggleTheme&&c.toggleTheme.apply(c,arguments)}),"aria-label":"Theme Switcher"},["light"===r.theme?(Object(a["r"])(),Object(a["e"])("i",T)):(Object(a["r"])(),Object(a["e"])("i",M))])}var H={props:{theme:{type:String,required:!0}},methods:{toggleTheme:function(){var t="light"===this.theme?"dark":"light";localStorage.setItem("theme",t),this.$emit("themeChanged",t),this.$router.go()}}},B=r("6b0d"),C=r.n(B);const S=C()(H,[["render",N]]);var E=S,D=(r("b0c0"),Object(a["H"])("data-v-46c86644"));Object(a["u"])("data-v-46c86644");var L={class:"fixed inset-0 z-30"},F={class:"flex flex-col items-center justify-center h-full w-full"},I={class:"modal-wrapper flex items-center z-30"},q={class:"modal max-w-md mx-5 xl:max-w-xl lg:max-w-xl md:max-w-xl bg-secondary-light dark:bg-primary-dark max-h-screen shadow-lg flex-row rounded-xl relative"},J={class:"modal-header flex justify-between gap-10 p-5 border-b border-ternary-light dark:border-ternary-dark"},W=Object(a["i"])("h5",{class:" text-primary-dark dark:text-primary-light text-2xl"}," Wat voor project of vraag heb je aan mij? ",-1),G={class:"modal-body p-5 w-full h-full"},V={class:"max-w-xl m-4 text-left"},Z=Object(a["i"])("div",{class:""},[Object(a["i"])("input",{class:"w-full px-5 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-lg text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light",id:"name",name:"name",type:"text",required:"",placeholder:"Naam","aria-label":"Name"})],-1),Q=Object(a["i"])("div",{class:"mt-6"},[Object(a["i"])("input",{class:"w-full px-5 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-lg text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light",id:"email",name:"email",type:"text",required:"",placeholder:"Email","aria-label":"Email"})],-1),R={class:"mt-6"},_={class:"w-full px-5 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-lg text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light",id:"subject",name:"subject",type:"text",required:"","aria-label":"Project Category"},U=Object(a["i"])("div",{class:"mt-6"},[Object(a["i"])("textarea",{class:"w-full px-5 py-2 border-1 border-gray-200 dark:border-secondary-dark rounded-lg text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light",id:"message",name:"message",cols:"14",rows:"6","aria-label":"Details",placeholder:"Je vraag, opdracht of beschrijving van je project"})],-1),X=Object(a["i"])("div",{class:"mt-6 pb-4 sm:pb-1"},[Object(a["i"])("button",{class:"px-4\n\t\t\t\t\t\t\t\t\t\t\tsm:px-6\n\t\t\t\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\t\t\t\tsm:py-2.5\n\t\t\t\t\t\t\t\t\t\t\ttext-white\n\t\t\t\t\t\t\t\t\t\t\tfont-normal\n\t\t\t\t\t\t\t\t\t\t\tsm:font-medium\n\t\t\t\t\t\t\t\t\t\t\tbg-indigo-500\n\t\t\t\t\t\t\t\t\t\t\thover:bg-indigo-600\n\t\t\t\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\t\t\t\tsm:rounded-lg\n\t\t\t\t\t\t\t\t\t\t\tfocus:ring-1 focus:ring-indigo-900",type:"submit","aria-label":"Submit Request"}," Verzenden ")],-1),K={class:"modal-footer mt-2 sm:mt-0 py-5 px-8 border0-t text-right"};Object(a["s"])();var Y=D((function(t,e,r,n,o,c){return Object(a["r"])(),Object(a["e"])(a["b"],{name:"fade"},{default:D((function(){return[Object(a["G"])(Object(a["i"])("div",L,[Object(a["G"])(Object(a["i"])("div",{onClick:e[1]||(e[1]=function(t){return r.showModal()}),class:"bg-filter bg-black bg-opacity-50 fixed inset-0 w-full h-full z-20"},null,512),[[a["D"],r.modal]]),Object(a["i"])("main",F,[Object(a["i"])(a["b"],{name:"fade-up-down"},{default:D((function(){return[Object(a["G"])(Object(a["i"])("div",I,[Object(a["i"])("div",q,[Object(a["i"])("div",J,[W,Object(a["i"])("button",{class:"px-4 font-bold text-primary-dark dark:text-primary-light",onClick:e[2]||(e[2]=function(t){return r.showModal()})}," X ")]),Object(a["i"])("div",G,[Object(a["i"])("form",V,[Z,Q,Object(a["i"])("div",R,[Object(a["i"])("select",_,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(r.categories,(function(t){return Object(a["r"])(),Object(a["e"])("option",{key:t.id,value:t.value},Object(a["B"])(t.name),9,["value"])})),128))])]),U,X])]),Object(a["i"])("div",K,[Object(a["i"])("button",{class:" px-4\n\t\t\t\t\t\t\t\t\tsm:px-6\n\t\t\t\t\t\t\t\t\tpy-2\n\t\t\t\t\t\t\t\t\tbg-indigo-400\n\t\t\t\t\t\t\t\t\thover:bg-indigo-500\n\t\t\t\t\t\t\t\t\trounded-md\n\t\t\t\t\t\t\t\t\tsm:rounded-lg\n\t\t\t\t\t\t\t\t\tfont-normal\n\t\t\t\t\t\t\t\t\tsm:font-bold\n\t\t\t\t\t\t\t\t\ttext-primary-light\n\t\t\t\t\t\t\t\t\tfocus:ring-1 focus:ring-indigo-900",onClick:e[3]||(e[3]=function(t){return r.showModal()}),"aria-label":"Sluit venster"}," Sluiten ")])])],512),[[a["D"],r.modal]])]})),_:1})])],512),[[a["D"],r.modal]])]})),_:1})})),$={props:["showModal","modal","categories"],data:function(){return{}},methods:{}};r("1945");const tt=C()($,[["render",Y],["__scopeId","data-v-46c86644"]]);var et=tt,rt={components:{ThemeSwitcher:E,HireMeModal:et},data:function(){return{isOpen:!1,theme:"",modal:!1,categories:[{id:1,value:"algemene-vraag",name:"Een algemene vraag "},{id:2,value:"vragen",name:"Een offerte of kostenplaatje voor mijn project of opdracht"}]}},created:function(){this.theme=localStorage.getItem("theme")||"light"},mounted:function(){i.a.replace(),this.theme=localStorage.getItem("theme")||"light"},methods:{updateTheme:function(t){this.theme=t},showModal:function(){this.modal?(document.getElementsByTagName("html")[0].classList.remove("overflow-y-hidden"),this.modal=!1):(document.getElementsByTagName("html")[0].classList.add("overflow-y-hidden"),this.modal=!0)}},updated:function(){i.a.replace()}};r("7731");const at=C()(rt,[["render",z],["__scopeId","data-v-3e29d39c"]]);var nt=at,ot={class:"container mx-auto "},ct={class:"innercontent pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark"},it={class:"flex flex-col justify-center items-center mb-12 sm:mb-28"},lt=Object(a["i"])("p",{class:"text-3xl sm:text-4xl font-semibold text-primary-dark dark:text-primary-light mb-5"}," Volg Nav ",-1),st={class:"flex gap-4 sm:gap-8"},dt={class:"flex justify-center items-center text-center"},mt={class:"text-lg text-ternary-dark dark:text-ternary-light"},ut=Object(a["i"])("br",null,null,-1),bt=Object(a["h"])(" Gemaakt door Nav met Vue.js en TailwindCSS."),pt=Object(a["i"])("br",null,null,-1),ft=Object(a["i"])("a",{href:"https://nav.co.nl",target:"__blank",class:"text-secondary-dark dark:text-secondary-light font-medium  hover:underline"},"Nav.co.nl",-1);function ht(t,e,r,n,o,c){return Object(a["r"])(),Object(a["e"])("div",ot,[Object(a["i"])("div",ct,[Object(a["i"])("div",it,[lt,Object(a["i"])("ul",st,[(Object(a["r"])(!0),Object(a["e"])(a["a"],null,Object(a["x"])(o.socials,(function(t){return Object(a["r"])(),Object(a["e"])("a",{key:t.id,href:t.url,target:"__blank",class:"text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm∫ p-4"},[Object(a["i"])("i",{"data-feather":t.icon,class:"w-6 sm:w-8 h-6 sm:h-8"},null,8,["data-feather"])],8,["href"])})),128))])]),Object(a["i"])("div",dt,[Object(a["i"])("div",mt,[Object(a["h"])(" © Copyright "+Object(a["B"])(o.copyrightDate)+". ",1),ut,bt,pt,ft])])])])}var gt={data:function(){return{copyrightDate:(new Date).getFullYear(),socials:[{id:1,name:"GitHub",icon:"github",url:"https://github.com/nav-appaiya"},{id:2,name:"Twitter",icon:"twitter",url:"https://twitter.com/navvvv"},{id:3,name:"Instagram",icon:"instagram",url:"https://www.instagram.com/nav_appaiya/"}]}},mounted:function(){i.a.replace()},updated:function(){i.a.replace()}};const jt=C()(gt,[["render",ht]]);var vt=jt,xt={components:{AppHeader:nt,AppFooter:vt},data:function(){return{appTheme:localStorage.getItem("theme")}},mounted:function(){i.a.replace()},updated:function(){i.a.replace()}};r("5d9f");const yt=C()(xt,[["render",o]]);var Ot=yt,kt=(r("d3b7"),r("3ca3"),r("ddb0"),r("7db0"),r("fb6a"),r("d81d"),r("a630"),r("159b"),r("b64b"),r("6c02")),At={class:"container mx-auto"},wt={class:"mt-10 sm:mt-20 flex justify-center"},Pt=Object(a["h"])("Meer projecten");function zt(t,e,r,n,o,c){var i=Object(a["z"])("AppBanner"),l=Object(a["z"])("ProjectsGrid"),s=Object(a["z"])("router-link");return Object(a["r"])(),Object(a["e"])("div",At,[Object(a["i"])(i),Object(a["i"])(l),Object(a["i"])("div",wt,[Object(a["i"])(s,{to:"/projecten",class:"flex items-center px-6 py-3 rounded-xl shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl font-medium","aria-label":"Meer projecten"},{default:Object(a["F"])((function(){return[Pt]})),_:1})])])}var Tt=r("0ea0"),Mt=r.n(Tt),Nt=r("71d7"),Ht=r.n(Nt),Bt={class:"flex flex-col sm:justify-between items-center sm:flex-row mt-12 sm:mt-2"},Ct=Object(a["g"])('<div class="w-full sm:w-1/3 text-left"><h1 class="text-3xl sm:text-5xl text-center sm:text-left font-semibold text-ternary-dark dark:text-primary-light camelcase"> Hey, ik ben Nav. </h1><p class="mt-4 text-2xml sm:text-4xl text-center sm:text-left font-semibold leading-none text-gray-400"> En ik ben een PHP ontwikkelaar </p><div class="flex justify-center sm:block"><a href="#projects" class="flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-xl bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white" aria-label="Discover more"><i data-feather="arrow-down-circle" class="ml-0 sm:ml-1 mr-0 sm:mr-3 w-5 sm:w-6"></i><span class="text-sm sm:text-lg">Meer Nav</span></a></div></div>',1),St={class:"w-full sm:w-2/3 text-right float-right mt-8 sm:mt-0"},Et={key:0,src:Mt.a,alt:"Developer"},Dt={key:1,src:Ht.a,alt:"Developer"};function Lt(t,e,r,n,o,c){return Object(a["r"])(),Object(a["e"])("section",Bt,[Ct,Object(a["i"])("div",St,["light"===t.theme?(Object(a["r"])(),Object(a["e"])("img",Et)):(Object(a["r"])(),Object(a["e"])("img",Dt))])])}var Ft={name:"Home",data:function(){return{theme:""}},created:function(){this.theme=localStorage.getItem("theme")||"light"},mounted:function(){i.a.replace(),this.theme=localStorage.getItem("theme")||"light"},updated:function(){i.a.replace()},methods:{}};const It=C()(Ft,[["render",Lt]]);var qt=It,Jt=r("3808"),Wt={name:"Home",components:{AppBanner:qt,ProjectsGrid:Jt["a"]}};const Gt=C()(Wt,[["render",zt]]);var Vt=Gt,Zt=[{path:"/",name:"Home",component:Vt,meta:{title:"Nav.co.nl - Nav Appaiya"}},{path:"/over",name:"Over",component:function(){return r.e("about").then(r.bind(null,"f820"))},meta:{title:"Nav.co.nl - Over Nav"}},{path:"/projecten",name:"Projecten",component:function(){return r.e("projects").then(r.bind(null,"acca"))},meta:{title:"Nav.co.nl - Projecten van Nav"}},{path:"/test",name:"test",component:function(){return r.e("projects").then(r.bind(null,"78c1"))},meta:{title:"Nav.co.nl - test van Nav"}},{path:"/projects/:id",name:"Een project",component:function(){return r.e("projects").then(r.bind(null,"76fc"))},meta:{title:"Nav.co.nl - Een Project van Nav"}},{path:"/contact",name:"Contact",component:function(){return r.e("projects").then(r.bind(null,"b8fa"))},meta:{title:"Nav.co.nl - Contact met Nav"}},{path:"/projecten/:id",name:"Project",component:function(){return r.e("projects").then(r.bind(null,"76fc"))},meta:{title:"Nav.co.nl - Contact met Nav"}}],Qt=Object(kt["a"])({history:Object(kt["b"])("/"),routes:Zt,scrollBehavior:function(){document.getElementById("app").scrollIntoView()}}),Rt=Qt;Qt.beforeEach((function(t,e,r){var a=t.matched.slice().reverse().find((function(t){return t.meta&&t.meta.title})),n=t.matched.slice().reverse().find((function(t){return t.meta&&t.meta.metaTags})),o=e.matched.slice().reverse().find((function(t){return t.meta&&t.meta.metaTags}));if(a?document.title=a.meta.title:o&&(document.title=o.meta.title),Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map((function(t){return t.parentNode.removeChild(t)})),!n)return r();n.meta.metaTags.map((function(t){var e=document.createElement("meta");return Object.keys(t).forEach((function(r){e.setAttribute(r,t[r])})),e.setAttribute("data-vue-router-controlled",""),e})).forEach((function(t){return document.head.appendChild(t)})),r()}));r("def6"),r("557b");var _t=r("6afc"),Ut=r("77c6");Ut.replace(),Object(a["d"])(Ot).use(Rt).use(_t["a"]).mount("#app");var Xt=localStorage.getItem("theme");"dark"===Xt&&document.querySelector("body").classList.contains("app-theme")?document.querySelector("body").classList.add("bg-primary-dark"):document.querySelector("body").classList.add("bg-secondary-light")},"5d9f":function(t,e,r){"use strict";r("f643")},6076:function(t,e,r){t.exports=r.p+"img/sports_supplier.df463079.svg"},"71d7":function(t,e,r){t.exports=r.p+"img/developer-dark.9c0b14fd.svg"},7731:function(t,e,r){"use strict";r("4b62")},cf25:function(t,e,r){},def6:function(t,e,r){},e368:function(t,e,r){t.exports=r.p+"img/meprint.276c563d.png"},e91d:function(t,e,r){t.exports=r.p+"img/logo-light.4c556d30.svg"},f643:function(t,e,r){}});
//# sourceMappingURL=app.221c9963.js.map