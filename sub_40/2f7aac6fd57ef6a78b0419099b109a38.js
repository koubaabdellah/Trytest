/* start of /views/aanpakringzuid/js/reacties-enhanced.js (as is) */
"use strict";!function(e){var i=!1,t=!1;if(window.MutationObserver){var a=function(a){if("0"!=c.count&&(e(a).find("h3").unlessProcessed("reactionheader-enhanced").append(" (".concat(c.count,")")),e(a).find(".reactie-verborgen-door-moderator:not(:has('.reactie-toon-reacties'))").hide()),null!==window.location&&null!==window.location.hash&&""!==window.location.hash&&window.location.hash.indexOf("reactie-")>=0){var n=e(window.location.hash);e(a).has(".reactie").each((function(){window.setTimeout((function(){!function(t){var a=e(t);a.length&&0==i&&(i=!0,window.SmoothAnchorsConfig.topOffset=e(".header").height(),window.SmoothAnchorsConfig.animationTime=500,window.setTimeout((function(){a.scrollTo()}),500))}(n)}),0)}))}e(a).filter("input[type = 'email'][value]").unlessProcessed("email-enhanced").each((function(){var i=e(this),a=i.val();e.ajax({url:"/?AppIdt=email-has-profile&email=".concat(a),dataType:"JSON",success:function(e){if(e.emailhasprofile){i.addClass("disabled").attr("disabled","disabled"),i.closest("fieldset").find(".rij.text:has(label:contains('Naam')) input").attr("disabled","disabled");var a=i.closest("fieldset").find(".rij.checkbox label");a.length&&(a.click(),0==t&&(t=!0,window.scrollTo(0,0))),i.closest("fieldset").find("input[type = 'checkbox'][value]").attr("disabled","disabled")}}})})),e(a).find(".reactie").unlessProcessed("reaction-enhanced").each((function(){var i=e(this);if(i[0].hasAttribute("id")){var t=i.attr("id").substr(8,10),a=c.Reactie.filter((function(e){return e.Id===t}))[0];if(a&&a.profile){if(i.addClass("has-profile"),a.profile.Image){var n=a.profile.item.Lbl?a.profile.item.Lbl:"";i.find(".reactie-meta").first().prepend('<div class="reactie-meta-img"><img src="'.concat(a.profile.Image,'" alt="').concat(n,'" /></div>'))}a.profile.item.Url&&i.find(".reactie-meta-name").first().html('<a href="'.concat(a.profile.item.Url,'">').concat(a.profile.item.Lbl,"</a>")),a.profile.Function&&i.find(".reactie-meta-name").first().after('<span class="reactie-meta-functie">'.concat(a.profile.Function,"</span>"))}}})),e(".reacties-more-inner a, .reactie-toon-reacties").unlessProcessed("showmore").each((function(){this.click()}))},n=new MutationObserver((function(e){e.forEach((function(e){a(e.target)}))})),o={subtree:!0,childList:!0,attributes:!0},c={};e(".type-reacties .reacties").each((function(){var i=this;e.ajax({url:"/?AppIdt=reactie-info&reactieItmIdt=".concat(itmIdt),dataType:"JSON",success:function(e){c=e.reacties,n.observe(i,o)}})}))}}(jQuery);
/* end of /views/aanpakringzuid/js/reacties-enhanced.js */
/* start of /js/lightbox.js (as is) */
(function(){"use strict";var e,t,n,s,o,i,a,r,l=[].slice;e=function(e){return null!=e&&/^(.*?:(\/+[^\/]+)?)/.test(e.toString())?RegExp.$1:e},n=function(){var e,t,n,s,o;for(n=0,s=(t=1<=arguments.length?l.call(arguments,0):[]).length;n<s;n++)((e=t[n])<o||null==o)&&(o=e);return o},t=function(e,t){var n;return null==e&&(e=""),null==t&&(t="undefined"!=typeof self&&null!==self&&null!=(n=self.location)?n.toString():void 0),""+new Uri(t).applyUrl(e)},s=jQuery,window.setTopLocation=function(t,n,o){var i,a,r,l,d;null==o&&(o=!1),d=(a=self!==top)&&!!function(){try{return null!=top.location.href}catch(e){}}(),l=(r=[e(self.location.href),e(n)])[0],i=r[1],d&&top.$("[wastabbable = 'true']").restoreTabIndexes(),d||t?(t?top.location=t:o&&top.location.reload(!0),d&&"undefined"!=typeof top&&null!==top&&(s("#Ipx_0 a",top.document).attr("tabIndex","0").focus(),s("#embedded_cms_dimscreen",top.document).remove(),s("#embedded_cms",top.document).remove())):i!==l?self.location=self.location.toString().replace(l,i):a?top.location.reload():top.location=n},i=function(e){var t,o,i,a,r;return r=s(window).width()-100,t=s(window).height()-88,i=n(r,1024),o=n(t,600),a="auto","Small"===e?(i=r=n(i,440),o=t=n(o,360),a="no"):"Medium"===e?(i=r=n(i,s(window).width()/2),o=t=n(o,s(window).height()/2)):"None"===e&&(i=r=0,o=t=0),{w:r,h:t,minW:i,minH:o,scrolling:a,blank:"Window"===e}},a={},window.IproxLightbox=function(){var e,t;e=[];try{return t={useDefaultEditConsoleFeatures:!0,addEditConsoleFeaturesGenerator:function(t){return e.push(t)},addJsMethod:function(e,t){if("string"==typeof e&&"function"==typeof t)return a[e]=t},generateDefaultEditConsoleFeatures:function(){return["Ipx_0","Var_"+varIdt,"Itm_"+itmIdt]},generateEditConsoleFeatures:function(n){var s,o,i,a;for(null==n&&(n=t.useDefaultEditConsoleFeatures),s=n?t.generateDefaultEditConsoleFeatures():[],i=0,a=e.length;i<a;i++)o=e[i],s=s.concat(o());return s},uiClasses:{},addIcon:function(e,n){return t.uiClasses[e]="ui-icon ui-icon-"+n},useIcon:function(e,n){return t.uiClasses[e]=t.uiClasses[n]}}}finally{t.addIcon("variant","gear"),t.addIcon("item","star"),t.addIcon("add","plus"),t.addIcon("cms","document"),t.addIcon("edit","pencil"),t.addIcon("field","pencil"),t.addIcon("cluster","pencil"),t.addIcon("iproxset","triangle-1-s"),t.addIcon("login","locked"),t.addIcon("logout","unlocked")}}(),o=function(){var e,t,n,o,i;for(e=[{}],t=0,n=(i=1<=arguments.length?l.call(arguments,0):[]).length;t<n;t++)(o=i[t])&&e.push(o);return s.extend.apply(e[0],e)},r=function(e){var t,n;return null==e&&(e={}),function(){var s;for(t in s=[],e)null!=(n=e[t])&&s.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return s}().join("&")},s.fn.disableTabIndexes=function(){return this.each((function(){var e;return(e=s(this)).attr("wastabbable","true").attr("prevTabIndex",e.attr("tabIndex")).attr("tabIndex","-1")})),this},s.fn.restoreTabIndexes=function(){return this.each((function(){var e;return(e=s(this)).removeAttr("wastabbable"),e.attr("prevTabIndex")?e.attr("tabIndex",e.attr("prevTabIndex")):e.removeAttr("tabIndex"),e.removeAttr("prevTabIndex")})),this},s.fn.editActions=function(n){var d,c,u,p,h,f,g,m,x;if(null==n&&(n={}),p={},c=function(e){return p[e]||e},window.lightboxDefaults={editConsoleFeaturesGenerator:window.IproxLightbox.generateEditConsoleFeatures,editConsoleLogo:"/images/icons/ip.svg",className:"hasEditAction",idFormat:/^(([A-Z][a-z]{2})+)_(\d+)/,method:"prepend",retrieveSelector:"> span.iproxfee",uiClasses:window.IproxLightbox.uiClasses,cssStylesheets:["/css/iprox_lightbox.css"],create:function(e,t,o,i,a,l){return null==t&&(t="Large"),null==o&&(o=""),null==i&&(i={}),null==a&&(a="iprox"),null==l&&(l=function(){}),s('<a data-ipx-lightbox-size="'+t+'" class="iprox iprox_'+e+'" href="'+o+"?exitItmIdt="+itmIdt+"&amp;"+r(i)+'"></a>').bind("click",(function(){return!1!==l.apply(this,arguments)&&n.open.apply(this,arguments)})).attr("title",a).data("args",i).append('<span class="'+(n.uiClasses[e]||"ui-icon ui-icon-"+e)+'"></span>').append(s('<span class="iprox_label"></span>').text(a))},filter:function(){var e,t,o,i,a,r,l;for(e=0,i=(l=[this.id,s(this).data("id")]).length;e<i;e++)if((r=l[e])&&"number"!=typeof r)for(s.isArray(r)||(r=r.split(" ")),o=0,a=r.length;o<a;o++)if(t=r[o],n.idFormat.test(t))return!0;return!1},insert:function(){var e;return e=1<=arguments.length?l.call(arguments,0):[],s.fn[n.method].apply(this,e)},retrieve:function(e){return e.find(n.retrieveSelector)},buildConsole:function(){var e,t,o,i,a;for(0===s("#cms_console").length&&s("<div id=cms_console></div>").css({backgroundImage:"url("+n.editConsoleLogo+")",backgroundRepeat:"no-repeat"}).appendTo("body").append(s("<span class=console_label>...</span>")),a=[],t=0,o=(i=n.editConsoleFeatures).length;t<o;t++)e=i[t],0===s("#"+e).length?a.push(s("<div class=cms_action id="+e+"></div>").appendTo("#cms_console")):a.push(void 0);return a},showConsole:function(){var e;if(s("#cms_console").addClass("console-ready").length&&s(window).width()>400)try{return s("<style></style>").attr("type","text/css").text("@-ms-viewport { width: auto !important; }").appendTo("head")}catch(t){return e=t,"undefined"!=typeof console&&null!==console&&"function"==typeof console.error?console.error(e):void 0}},lightbox:function(e,t){var n,o,a,r,l,d,c;return null==t&&(t="Large"),c=(l=i(t)).w,n=l.h,r=l.minW,a=l.minH,d=l.scrolling,l.blank?window.open(e):((c>0||n>0)&&(s("#embedded_cms_dimscreen").remove(),s("<div id=embedded_cms_dimscreen></div>").css({opacity:"0",position:"fixed",top:"0",left:"0",width:"100%",height:"100%",background:"#000"}).appendTo("body").animate({opacity:"0.4"})),o=s('<div id=embedded_cms><iframe id=cms_frame title="IPROX CMS" scrolling="'+d+'" frameborder=0 src="'+e+'"></div>').appendTo("body"),c>0||n>0?(o.css({top:s(document).scrollTop()+50+"px",left:s(document).scrollLeft()+(s(window).width()-c)/2+"px",width:c+"px",height:n+"px"}).draggable({cursor:"move",start:function(){return s("#embedded_cms iframe").hide()},stop:function(){return s("#embedded_cms").css({position:"fixed"}).find("iframe").show()}}).resizable({minWidth:r,maxWidth:s(window).width()-100+"px",minHeight:a,maxHeight:s(window).height()-88+"px",alsoResize:"#embedded_cms iframe",start:function(){return s("#embedded_cms iframe").hide()},stop:function(){return s("#embedded_cms").css({position:"fixed"}).find("iframe").show()}}).css({position:"fixed",top:"50px",left:(s(window).width()-c)/2+"px"}).fadeIn(1e3),s("#embedded_cms iframe").css({width:c+"px",height:n+"px"})):void 0)},open:function(e){return s(":tabbable").disableTabIndexes(),n.lightbox(s(e.target).closest("a").attr("href"),s(e.target).closest("a").data("ipx-lightbox-size")),!1},toggleSticky:function(e){var t;return s("body").toggleClass("iprox-sticky"),t=s("#cms_console").find(".ui-icon-pin-w, .ui-icon-pin-s").toggleClass("ui-icon-pin-w").toggleClass("ui-icon-pin-s"),"undefined"!=typeof sessionStorage&&null!==sessionStorage&&(s("body").hasClass("iprox-sticky")?(sessionStorage.iproxSticky="true",t.next(".iprox_label").text(c("unstick"))):(delete sessionStorage.iproxSticky,t.next(".iprox_label").text(c("stick")))),!1}},null==(n=s.extend({},window.lightboxDefaults,n)).editConsoleFeatures&&(n.editConsoleFeatures=n.editConsoleFeaturesGenerator()),d={AppIdt:10000009,lang:s(this).closest("[lang]").attr("lang")},!s("body").hasClass("has-iprox-lightbox-stylesheets")){for(u=0,h=(f=n.cssStylesheets).length;u<h;u++)g=f[u],s("head").append('<link rel="stylesheet" href="'+t(g)+'" type="text/css" />');s("body").addClass("has-iprox-lightbox-stylesheets")}if(n.editConsoleFeatures.length>0&&n.buildConsole(),m=!1,s("[id], [data-id]",this).filter(n.filter).each((function(){var e,t,o,i,a,r,l,c,u;for(t=0,a=(c=[this.id,s(this).data("id")]).length;t<a;t++)if((l=c[t])&&"number"!=typeof l)for(s.isArray(l)||(l=l.split(" ")),o=0,r=l.length;o<r;o++)e=l[o],n.idFormat.test(e)&&(e=(u=[RegExp.$1+"Idt",RegExp.$3])[1],d[i=u[0]]=i in d?d[i]+","+e:e,m=!0)})),m)return s.ajax({data:d,dataType:"json",type:"POST",url:"/aspx/read.aspx"}).done((x=this,function(t){var i,r,l,d,u,h,f;for(t.session_csrf_id&&(window.session_csrf_id=t.session_csrf_id),p=t.labels||p,("undefined"!=typeof sessionStorage&&null!==sessionStorage?sessionStorage.iproxSticky:void 0)&&s("body").addClass("iprox-sticky"),s("#cms_console .console_label").text(c("console")),d=0,u=(h=t.elements).length;d<u;d++)r=h[d],(f=s("[id="+r.id+"], [data-id~="+r.id+"]",x)).each((function(){var i,l,d,u,p,h,g,m;for(f=s(this),null!=n.className&&0===f.parent("#cms_console").length&&f.addClass(n.className),l=n.retrieve(f),u=r.screens.length&&l.length||r.screens.length>1&&0===f.parent("#cms_console").length,l.length||(l=s("<span></span>").addClass("iproxfee"),n.insert.call(f,l)),u&&l.addClass("iproxset").addClass(n.uiClasses.iproxset),d={authenticate_token:t.token,exitUrl:e(self.location.toString())},t.startEnvIdt&&(d.startEnvIdt=t.startEnvIdt),p=0,h=(g=r.screens).length;p<h;p++)m=g[p],i=n.create(m.alias,m.size,t.root,o(m.args,d,f.data("args-"+m.alias)),c(m.alias).replace("#",m.name||"#"),m.jsmethod?a[m.jsmethod]:void 0),0===f.find('a[href="'+i.attr("href")+'"]').length&&l.append(i);if(!l.children().length)return l.remove()}));s("a.iprox").not("#cms_console a").length&&(l="undefined"!=typeof sessionStorage&&null!==sessionStorage?sessionStorage.iproxSticky:void 0,s("#cms_console").find(".iprox_pin-w, .iprox_pin-s").remove(),i=n.create(l?"pin-s":"pin-w","None",t.root,null,c(l?"unstick":"stick"),n.toggleSticky),s("#cms_console .cms_action > span:first").prepend(i)),s("#cms_console .cms_action, .hasEditAction").each((function(){var e,o,i,a,l,d,u;for(e=s(this).attr("id"),l=[],o=0,i=(a=t.elements).length;o<i;o++)(r=a[o]).id===e&&null!=(d=null!=r?r.Sts:void 0)?(u=c("Sts_"+d),s(this).parent("#cms_console").hasClass("has_status")||s(this).parent("#cms_console").addClass("has_status Sts_"+d).append("<span class=page_status>"+u+"</span>"),s(this).hasClass("hasEditAction")&&!s(this).hasClass("has_status")?l.push(s(this).filter(":has("+n.retrieveSelector+" > .iprox_item)").addClass("has_status Sts_"+d).find(n.retrieveSelector+":has(> .iprox_item)").filter(".iproxset:not(> span.page_status)").append("<span class=page_status>"+u+"</span>")):l.push(void 0)):l.push(void 0);return l})),s("#cms_console:not(:has(div a))").remove(),n.showConsole()}))}}).call(this);
/* end of /js/lightbox.js */
/* start of /views/baseline/js/iconmanager.js (as is) */
(function(){"use strict";var n,t;"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),n=jQuery,window.pageLoadFunctions=window.pageLoadFunctions||[],window.IconManager=t={append:function(n,t){return n.append(t)},prepend:function(n,t){return n.prepend(t)},inheritClass:function(n){return n.attr("class")},parentClass:function(n){return n.parent().attr("class")},linkClass:function(n){return n.find("a").attr("class")},listSchemeClass:function(n){return t.schemeClass(n.find("a"))},schemeClass:function(n){var t,e;if(0<(t=(""+(e=n.attr("href"))).indexOf(":")))return e.substring(0,t)},selectAll:function(t,e){return null==e&&(e=n(this)),!0},hasLinkOnly:function(t,e){var i;return null==e&&(e=n(this)),1===e.children(".li-content").length&&(e=e.children(".li-content")),!(1!==(i=e.children().not("ul, span.iprox-time, span.iprox-date")).length||!i.is("a"))&&((e=e.clone()).children("ul, span.iprox-time, span.iprox-date").remove(),(e.text().trim()||"exclude-empty")===i.text().trim())},filterLink:function(e,i){return null==i&&(i=n(this)),!(i.is("a")&&!i.text())&&(!i.is("ul a")||i.parents("ul:first").children("li").not((function(){return t.hasLinkOnly(e,n(this))})).length)},filterList:function(e,i){return null==i&&(i=n(this)),!i.is("ul > li")||!i.parent().children("li").not((function(){return t.hasLinkOnly(e,n(this))})).length},nothingSelector:'#a[id="b"]',appendSelector:function(n,e){return n&&e?n+", "+e:n||e||t.nothingSelector},noTarget:function(){return n()},parentUl:function(){return n(this).parent("ul")},iconTag:'<i class="ico" aria-hidden="true"></i>',loadIcons:function(n){var e,i,a,o;for(i in o=[],a=t.config)(e=a[i])&&o.push(t.insertIcons(e,n));return o},insertIcons:function(e,i){return null==i&&(i=n()),e=n.extend({},t.defaultIconDef,e),i.find(""+e.include).not(t.appendSelector(e.exclude,".has-ico, .has-ico *, .no-icons *")).filter((function(){return e.filter.call(this,e)})).filter((function(){return n(this).closest(t.appendSelector(e.activator,e.deactivator)).is(e.activator)})).each((function(){var i,a,o,r,s,c,l;return a=n(this),r=[].concat(function(){var n,t,i,r;for(r=[],n=0,t=(i=e.classes).length;n<t;n++)s=i[n],(o=s(a))&&r.push(o);return r}(),function(){var n;for(c in n=[],t)l=t[c],e.insert===l&&n.push(c);return n}()),i=n(t.iconTag).addClass(r.join(" ")),e.insert(a,i),i.is("a i")||i.on("click",(function(){var n;if((n=a.find("a:not(.iprox):first")).length)return"function"==typeof n.get(0).click?n.get(0).click():document.location=n.attr("href")})),a.add(e.icoTarget.call(a)).addClass("has-ico")}))}},t.defaultIconDef={activator:t.nothingSelector,deactivator:t.nothingSelector,include:t.nothingSelector,exclude:t.nothingSelector,filter:t.selectAll,classes:[t.inheritClass],insert:t.append,icoTarget:t.noTarget},t.config={appendLinkIcons:{activator:".has-link-icons",deactivator:".has-no-link-icons",include:".iprox-rich-content a, .formulier span.verplicht",exclude:".bladWijzer, .siteLink, .internLink, .imagemap_icoon",filter:t.filterLink,classes:[t.inheritClass,t.schemeClass]},prependListIcons:{activator:".has-list-icons",deactivator:".has-no-list-icons",include:"ul > li:has(a), .entry .title a, .type-entry .grid-title a, form ul.downloadlist > li:has(a) label",exclude:"form ul.downloadlist > li:has(a), ul.formulier_incorrect_summary > li",insert:t.prepend,icoTarget:t.parentUl,filter:t.filterList,classes:[t.inheritClass,t.linkClass,t.listSchemeClass]},prependMoreIcons:{activator:".has-list-icons",deactivator:".has-no-list-icons",include:".more a",insert:t.prepend,classes:[t.inheritClass,t.linkClass]},appendButtonIcons:{activator:".has-button-icons",deactivator:".has-no-button-icons",include:"button, a.button",exclude:".jwplayer button, .media-content button, .type-twitter-slider button"},prependButtonIcons:{activator:".has-button-icons",deactivator:".has-no-button-icons",include:"span.magnifierLink, a.calendar",insert:t.prepend},appendLinkButtonIcons:{activator:".has-button-icons",deactivator:".has-no-button-icons",include:".pager a.volgende, .navigatie a.volgende"},prependLinkButtonIcons:{activator:".has-button-icons",deactivator:".has-no-button-icons",include:".pager a.vorige, .navigatie a.vorige",insert:t.prepend},appendCalendarButtonIcons:{activator:".has-button-icons",deactivator:".has-no-button-icons",include:".navigatie .volgende a",classes:[t.parentClass]},prependCalendarButtonIcons:{activator:".has-button-icons",deactivator:".has-no-button-icons",include:".navigatie .vorige a",classes:[t.parentClass],insert:t.prepend}},window.pageLoadFunctions.push(t.loadIcons)}).call(this);
/* end of /views/baseline/js/iconmanager.js */
/* start of /views/baseline/js/default.js (as is) */
"use strict";window.responsiveBehaviours=window.responsiveBehaviours||[],window.pageLoadFunctions=window.pageLoadFunctions||[],window.linkblockSelector=window.linkblockSelector||[],window.feedbackConfig={respond:{target:".type-feedback"},responses:{target:".type-feedback"},form:{target:".type-formulier"},paging:{target:".grid-row.rol-rij-feedback"}},window.eventsConfig={calendar:{target:".type-kalender"}},function(e){var n={primairyNav:{setNavBehaviour:function(n){e(".type-primaire-navigatie",n).setNavBehaviour()},resetNavBehaviour:function(n){e(".type-primaire-navigatie",n).resetNavBehaviour()}},secundairyNav:{setNavBehaviour:function(n){e(".type-secundaire-navigatie",n).setNavBehaviour()},resetNavBehaviour:function(n){e(".type-secundaire-navigatie",n).resetNavBehaviour()}}},i=e.extend(!0,{},n,window.baselineMenuConfig||{});function t(n){e("body").addClass(window.innerWidth>document.documentElement.clientWidth?"":"has-autohiding-scrollbar"),i&&(i.primairyNav&&"function"==typeof i.primairyNav.setNavBehaviour&&i.primairyNav.setNavBehaviour(n),i.secundairyNav&&"function"==typeof i.secundairyNav.setNavBehaviour&&i.secundairyNav.setNavBehaviour(n)),e(n).linkBlocks(),e(n).setSkipLinkFocus(),e(n).fixMediaWidgetsBlocks(),e(n).fixExpandRows(),e(n).setDownloadlistIcoClass()}function o(n){i&&(i.primairyNav&&"function"==typeof i.primairyNav.resetNavBehaviour&&i.primairyNav.resetNavBehaviour(n),i.secundairyNav&&"function"==typeof i.secundairyNav.resetNavBehaviour&&i.secundairyNav.resetNavBehaviour(n)),e(window).unlessProcessed("ip-default-smartresize").smartresize((function(){e(window).fixExpandRows(),e(window).setTableScroll()})),e(n).setTableScroll()}function s(n){27===n.keyCode&&e(".drpdwn-mnu").hide()}function a(n){27===n.keyCode&&e("nav").removeClass("nav-open").find(".menu-container").hide()}e.fn.fixExpandRows=function(){return e(".grid-row.expand-to-zone",this).each((function(){var n=(e(this).closest(".grid-wrapper").width()-e(this).closest(".grid-zone").width())/2;return e(this).css({"margin-left":-1*n+"px","margin-right":-1*n+"px","padding-left":n+"px","padding-right":n+"px",width:e(this).closest(".grid-zone").width()})}))},e.fn.linkBlocks=function(){return this.find(window.linkblockSelector.join(", ")).unlessProcessed("linkBlocks").not(":has(form, .grid-nesting)").has(".grid-title a:visible, .grid-inside a:visible").filter((function(){return 0===e(this).parents(".grid-nesting.collapsable").length})).each((function(){var n=e(this);for(var i=[{container:".grid-title, .grid-inside"},{container:".grid-title",linker:"img"},{container:".grid-inside .entry",linker:"img, .grid-title"}],t=function(t){var o=i[t],s=o.container,a=o.linker,r=function(i){var t=n.find(i).find("a:visible");if(1===(t=t.filter((function(){return 0===e(this).closest(".visuallyhidden").length&&0===e(this).closest(".tekstbrowser").length}))).length&&!t.is("[href^='mailto:']")&&!t.hasClass("calendar"))return t}(s);return r?((a?n.find(a).first():n).addClass("linking").on("click",(function(e){r.relayClickEvent(e)})),"break"):"continue"},o=0;o<i.length;o++){var s=t(o);if("continue"!==s&&"break"===s)break}return[]})),this},e.fn.fixMediaWidgetsBlocks=function(){return e("body.ie8 .mediawidget:not(.processed)",this).addClass("processed").closest(".grid-edge").css({clear:"both",width:"100%",float:"left"}),this},e.fn.setSkipLinkFocus=function(){return e("#skip-links a",this).on("focusin",(function(){e("#site-title").removeClass("visuallyhidden")})),e("#skip-links a",this).on("focusout",(function(){e("#site-title").addClass("visuallyhidden")})),this},e.fn.setNavBehaviour=function(){return e("nav",this).unlessProcessed("menu-collapse").each((function(){var n=e(this).data("nav-expanding");n&&e("li .menu-text a[data-nosmoothanchor], li.is-menu .menu-text .drpdwn-tggl",this).on("click",(function(){e("body").hasAnyOfClasses(n.split(" "))&&(e(this).closest("ul").find("li.has-open-dropdown").get(0)!==e(this).closest("li").get(0)&&e(this).closest("ul").find("li.has-open-dropdown").removeClass("has-open-dropdown").find(".drpdwn-mnu.dropdown-open").stop().removeClass("dropdown-open").slideUp(),e(this).closest("li").find(".drpdwn-mnu").stop().each((function(){e(this).hasClass("dropdown-open")?e(this).removeClass("dropdown-open").slideUp().closest("li").removeClass("has-open-dropdown"):e(this).addClass("dropdown-open").slideDown().closest("li").addClass("has-open-dropdown")})))}))})),this},e.fn.resetNavBehaviour=function(){return e("nav",this).each((function(){var n=e(this),i=n.data("nav-expanding");if(i)if(e("body").hasAnyOfClasses(i.split(" "))?n.find("li.drpdwn a[aria-expanded]").click((function(e){return e.preventDefault()})):n.find("li.drpdwn a[aria-expanded]").click((function(n){var i=e(this),t=e(""+i.attr("href"));return"false"===i.attr("aria-expanded")?(e(document).on("keydown",s),t.show()):(e(document).off("keydown",s),t.hide()),n.preventDefault(),n.stopPropagation(),!1})),n.find(".drpdwn-mnu").hide(),e("body").hasAnyOfClasses(i.split(" ")))n.on("focusin mouseenter",(function(){return e(document).on("keydown",a)})).on("focusout mouseleave",(function(){return e(document).off("keydown",a)})),n.find(".menu-container").hide(),n.find("li.drpdwn").off("focusout").off("mouseenter").off("mouseleave"),e(".grid-title .heading-elt-nav:not(.click-menu)",this).prepend("<span class='caret'></span>"),e(".grid-title .heading-elt-nav",this).addClass("click-menu"),e(".grid-title",this).off("click").on("click",(function(n){return n.preventDefault(),e(this).closest(".grid-edge").find("nav").toggleClass("nav-open").find(".menu-container").stop().slideToggle()}));else{n.find(".menu-container").show();var t=e("#openprimnav",this),o=n.data("hovertimeout"),r=n.data("hoverouttimeout");t.on("mouseenter",(function(){return n.data("menu-enter",!0)})),t.on("mouseleave",(function(){if(null!=r&&0!==r)return n.data("menu-enter",!1),setTimeout((i=this,function(){return e(".drpdwn-mnu",i).fadeOut()}),r);var i})),n.find("li.drpdwn").on("focusout",(function(i){if(e(i.relatedTarget).hasClass("drpdwn-tggl"))return n.data("open-dropdown-menu","none"),e(document).off("keydown",s),n.find(".drpdwn-mnu").hide()})).on("mouseenter",(function(){return e(document).on("keydown",s),n.data("hovertimeout")?n.data("wasfaded")?e(".drpdwn-mnu",this).show():window.enterAct=setTimeout((i=this,function(){return n.data("wasfaded",!0),e(i).find(":hover").length>0?e(".drpdwn-mnu",i).fadeIn():e(".drpdwn-mnu",i).hide()}),o):(e(this).addClass("csshover"),e(".drpdwn-mnu",this).show());var i})).on("mouseleave",(function(){return e(document).off("keydown",s),setTimeout((i=this,function(){if(!0===n.data("menu-enter"))return e(".drpdwn-mnu",i).hide(),clearTimeout(window.enterAct)}),0);var i})),n.on("mouseleave",(function(){return n.data("wasfaded",!1)})),e(".grid-title .heading-elt-nav.click-menu span.caret",this).remove(),e(".grid-title .heading-elt-nav",this).removeClass("click-menu"),e(".grid-title",this).off("click")}return this}))},e.fn.hasAnyOfClasses=function(n){for(var i=e(this),t=0;t<n.length;t++){var o=n[t];if(i.hasClass(o))return!0}return!1},e.fn.setTableScroll=function(){return e(".tableholder",this).each((function(){e(this).find("table").width()>e(this).width()&&!e(this).hasClass("outofbounds")?(e(this).addClass("outofbounds"),e(this).not(":has(div.scrolltekst)").prepend('<div class="scrolltekst">'+window.iprox.referenceLists.getText("Deze tabel scrollt horizontaal")+"</div>")):e(this).find("table").width()<=e(this).width()&&e(this).hasClass("outofbounds")&&(e(this).removeClass("outofbounds"),e(this).children("div.scrolltekst").remove())})),this},e.fn.setDownloadlistIcoClass=function(){return e("ul.downloadlist:has(label.has-ico)").addClass("has-ico")},window.pageLoadFunctions.push(t),window.responsiveBehaviours.push(o),window.linkblockSelector=window.linkblockSelector.concat([".grid-blok.type-entry",".grid-blok.type-uitgelicht"]),window.smoothAnchorExcludes.push('a[data-nosmoothanchor = "true"]'),e(document).ready((function(){"function"!=typeof e(document).editActions||e(document).editActions()}))}(jQuery);
/* end of /views/baseline/js/default.js */
/* start of /views/baseline/js/set-menu-aria-hidden.js (as is) */
(function(){"use strict";var n,a,e,t;n=jQuery,window.MutationObserver&&(t=function(a){var e,t,r;r="none"!==(e=n(a)).css("display"),t=e.attr("id"),e.hasClass("menu-container")?n("a[href='#openprimnav']").handleCollapseAria(r,e):void 0===t||""===t||-1===t.indexOf("navmenu")?n(a).attr("aria-hidden",!r):n("a[href='#"+t+"']").handleCollapseAria(r,e)},e=new MutationObserver((function(n){var a,e,r;for(a=0,e=n.length;a<e;a++)r=n[a],t(r.target)})),a={attributes:!0,attributeFilter:["style","class"]},n("nav .drpdwn-mnu, nav .menu-container").each((function(){e.observe(this,a),t(this)})))}).call(this);
/* end of /views/baseline/js/set-menu-aria-hidden.js */