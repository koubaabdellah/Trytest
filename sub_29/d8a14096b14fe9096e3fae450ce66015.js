/* start of /views/aanpakringzuid/js/default.js (as is) */
"use strict";jQuery,window.ProcessPageOptions={external:"a.externLink, .social-buttons a"},window.linkblockSelector=window.linkblockSelector.filter((function(e){return".grid-blok.type-entry"!==e})),window.linkblockSelector.push(".grid-blok.type-entry:not(.reactie-entry, .ipx-pt-fotoalbum, .ipx-pt-media)"),window.responsiveConfig.imageSelector=".grid-blok[data-layout] img:not(.imagemapplaceholder *)[data-sources], .canvas-zone-img img";
/* end of /views/aanpakringzuid/js/default.js */
/* start of /views/baseline/js/fixedheights.js (as is) */
(function(){var e;e=jQuery,window.responsiveBehaviours=window.responsiveBehaviours||[],e.fn.resetFixedHeights=function(){return e(this).find(".resized").each((function(){return e(this).removeClass("resized").height("auto")}))},e.fn.fixHeights=function(i,s,r,t){return null==s&&(s=".has-border, .has-bgcolor"),null==r&&(r=""),e(this).each((function(){var d,h,g;d=e(this),h=0,"grid-row"===i?(t&&e(t.selector,d).find(".grid-nesting").fixHeights(t.scopeClass,t.include,t.exclude),g=d.hasClass("grid-zone")||d.hasClass("grid-nesting")?"> .row-clear, > .grid-row, > .grid-blok":".grid-zone > .row-clear, .grid-zone > .grid-row, .grid-zone > .grid-blok",e(g,d).each((function(){e(this).hasClass("grid-blok")?""!==s&&!e(this).is(s)||""!==r&&e(this).is(r)||(e("> .grid-element > .grid-edge",e(this)).css({height:"auto"}).removeClass("resized"),e("> .grid-element > .grid-edge",e(this)).height()>h&&(h=e("> .grid-element > .grid-edge",e(this)).height())):(e(this).data("rowmax",h),h=0)})),e(g,d).reverse().each((function(){e(this).hasClass("grid-blok")?!(h>0)||""!==s&&!e(this).is(s)||""!==r&&e(this).is(r)||e("> .grid-element > .grid-edge",e(this)).height(h).addClass("resized"):h=e(this).data("rowmax")}))):(d.hasClass(i)||(d=d.parents("."+i).first()),t&&e(t.selector,d).find(".grid-nesting").fixHeights(t.scopeClass,t.include,t.exclude),e(".grid-blok",d).each((function(){""!==s&&!e(this).is(s)||""!==r&&e(this).is(r)||(e("> .grid-element > .grid-edge",e(this)).css({height:"auto"}).removeClass("resized"),e("> .grid-element > .grid-edge",e(this)).height()>h&&(h=e("> .grid-element > .grid-edge",e(this)).height()))})),h>0&&e(".grid-blok",d).each((function(){""!==s&&!e(this).is(s)||""!==r&&e(this).is(r)||e("> .grid-element > .grid-edge",e(this)).height(h).addClass("resized")})))})),e(this)}}).call(this);
/* end of /views/baseline/js/fixedheights.js */
/* start of /views/aanpakringzuid/js/libs/modaal/modaal.min.js (as is) */
/*!
	Modaal - accessible modals - v0.4.4
	by Humaan, for all humans.
	http://humaan.com
 */
!function(a){function t(a){var t={},o=!1;a.attr("data-modaal-type")&&(o=!0,t.type=a.attr("data-modaal-type")),a.attr("data-modaal-content-source")&&(o=!0,t.content_source=a.attr("data-modaal-content-source")),a.attr("data-modaal-animation")&&(o=!0,t.animation=a.attr("data-modaal-animation")),a.attr("data-modaal-animation-speed")&&(o=!0,t.animation_speed=a.attr("data-modaal-animation-speed")),a.attr("data-modaal-after-callback-delay")&&(o=!0,t.after_callback_delay=a.attr("data-modaal-after-callback-delay")),a.attr("data-modaal-is-locked")&&(o=!0,t.is_locked="true"===a.attr("data-modaal-is-locked")),a.attr("data-modaal-hide-close")&&(o=!0,t.hide_close="true"===a.attr("data-modaal-hide-close")),a.attr("data-modaal-background")&&(o=!0,t.background=a.attr("data-modaal-background")),a.attr("data-modaal-overlay-opacity")&&(o=!0,t.overlay_opacity=a.attr("data-modaal-overlay-opacity")),a.attr("data-modaal-overlay-close")&&(o=!0,t.overlay_close="false"!==a.attr("data-modaal-overlay-close")),a.attr("data-modaal-accessible-title")&&(o=!0,t.accessible_title=a.attr("data-modaal-accessible-title")),a.attr("data-modaal-start-open")&&(o=!0,t.start_open="true"===a.attr("data-modaal-start-open")),a.attr("data-modaal-fullscreen")&&(o=!0,t.fullscreen="true"===a.attr("data-modaal-fullscreen")),a.attr("data-modaal-custom-class")&&(o=!0,t.custom_class=a.attr("data-modaal-custom-class")),a.attr("data-modaal-close-text")&&(o=!0,t.close_text=a.attr("data-modaal-close-text")),a.attr("data-modaal-close-aria-label")&&(o=!0,t.close_aria_label=a.attr("data-modaal-close-aria-label")),a.attr("data-modaal-background-scroll")&&(o=!0,t.background_scroll="true"===a.attr("data-modaal-background-scroll")),a.attr("data-modaal-width")&&(o=!0,t.width=parseInt(a.attr("data-modaal-width"))),a.attr("data-modaal-height")&&(o=!0,t.height=parseInt(a.attr("data-modaal-height"))),a.attr("data-modaal-confirm-button-text")&&(o=!0,t.confirm_button_text=a.attr("data-modaal-confirm-button-text")),a.attr("data-modaal-confirm-cancel-button-text")&&(o=!0,t.confirm_cancel_button_text=a.attr("data-modaal-confirm-cancel-button-text")),a.attr("data-modaal-confirm-title")&&(o=!0,t.confirm_title=a.attr("data-modaal-confirm-title")),a.attr("data-modaal-confirm-content")&&(o=!0,t.confirm_content=a.attr("data-modaal-confirm-content")),a.attr("data-modaal-gallery-active-class")&&(o=!0,t.gallery_active_class=a.attr("data-modaal-gallery-active-class")),a.attr("data-modaal-loading-content")&&(o=!0,t.loading_content=a.attr("data-modaal-loading-content")),a.attr("data-modaal-loading-class")&&(o=!0,t.loading_class=a.attr("data-modaal-loading-class")),a.attr("data-modaal-ajax-error-class")&&(o=!0,t.ajax_error_class=a.attr("data-modaal-ajax-error-class")),a.attr("data-modaal-instagram-id")&&(o=!0,t.instagram_id=a.attr("data-modaal-instagram-id")),o&&a.modaal(t)}var o={init:function(t,o){var e=this;if(e.dom=a("body"),e.$elem=a(o),e.options=a.extend({},a.fn.modaal.options,e.$elem.data(),t),e.xhr=null,e.scope={is_open:!1,id:"modaal_"+(new Date).getTime()+Math.random().toString(16).substring(2),source:e.options.content_source?e.options.content_source:e.$elem.attr("href")},e.$elem.attr("data-modaal-scope",e.scope.id),e.private_options={active_class:"is_active"},e.lastFocus=null,e.options.is_locked||"confirm"==e.options.type||e.options.hide_close?e.scope.close_btn="":e.scope.close_btn='<button type="button" class="modaal-close" id="modaal-close" aria-label="'+e.options.close_aria_label+'"><span>'+e.options.close_text+"</span></button>","none"===e.options.animation&&(e.options.animation_speed=0,e.options.after_callback_delay=0),a(o).on("click.Modaal",function(a){a.preventDefault(),e.create_modaal(e,a)}),!0===e.options.outer_controls)var i="outer";else var i="inner";e.scope.prev_btn='<button type="button" class="modaal-gallery-control modaal-gallery-prev modaal-gallery-prev-'+i+'" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>',e.scope.next_btn='<button type="button" class="modaal-gallery-control modaal-gallery-next modaal-gallery-next-'+i+'" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>',!0===e.options.start_open&&e.create_modaal(e)},create_modaal:function(a,t){var o,a=this;if(a.lastFocus=a.$elem,!1!==a.options.should_open&&("function"!=typeof a.options.should_open||!1!==a.options.should_open())){switch(a.options.before_open.call(a,t),a.options.type){case"inline":a.create_basic();break;case"ajax":o=a.options.source(a.$elem,a.scope.source),a.fetch_ajax(o);break;case"confirm":a.options.is_locked=!0,a.create_confirm();break;case"image":a.create_image();break;case"iframe":o=a.options.source(a.$elem,a.scope.source),a.create_iframe(o);break;case"video":a.create_video(a.scope.source);break;case"instagram":a.create_instagram()}a.watch_events()}},watch_events:function(){var t=this;t.dom.off("click.Modaal keyup.Modaal keydown.Modaal"),t.dom.on("keydown.Modaal",function(o){var e=o.keyCode,i=o.target;9==e&&t.scope.is_open&&(a.contains(document.getElementById(t.scope.id),i)||a("#"+t.scope.id).find('*[tabindex="0"]').focus())}),t.dom.on("keyup.Modaal",function(o){var e=o.keyCode,i=o.target;return o.shiftKey&&9==o.keyCode&&t.scope.is_open&&(a.contains(document.getElementById(t.scope.id),i)||a("#"+t.scope.id).find(".modaal-close").focus()),!t.options.is_locked&&27==e&&t.scope.is_open?!a(document.activeElement).is("input:not(:checkbox):not(:radio)")&&void t.modaal_close():"image"==t.options.type?(37==e&&t.scope.is_open&&!a("#"+t.scope.id+" .modaal-gallery-prev").hasClass("is_hidden")&&t.gallery_update("prev"),void(39==e&&t.scope.is_open&&!a("#"+t.scope.id+" .modaal-gallery-next").hasClass("is_hidden")&&t.gallery_update("next"))):void 0}),t.dom.on("click.Modaal",function(o){var e=a(o.target);if(!t.options.is_locked&&(t.options.overlay_close&&e.is(".modaal-inner-wrapper")||e.is(".modaal-close")||e.closest(".modaal-close").length))return void t.modaal_close();if(e.is(".modaal-confirm-btn"))return e.is(".modaal-ok")&&t.options.confirm_callback.call(t,t.lastFocus),e.is(".modaal-cancel")&&t.options.confirm_cancel_callback.call(t,t.lastFocus),void t.modaal_close();if(e.is(".modaal-gallery-control")){if(e.hasClass("is_hidden"))return;return e.is(".modaal-gallery-prev")&&t.gallery_update("prev"),void(e.is(".modaal-gallery-next")&&t.gallery_update("next"))}})},build_modal:function(t){var o=this,e="";"instagram"==o.options.type&&(e=" modaal-instagram");var i,l="video"==o.options.type?"modaal-video-wrap":"modaal-content";switch(o.options.animation){case"fade":i=" modaal-start_fade";break;case"slide-down":i=" modaal-start_slidedown";break;default:i=" modaal-start_none"}var n="";o.options.fullscreen&&(n=" modaal-fullscreen"),""===o.options.custom_class&&void 0===o.options.custom_class||(o.options.custom_class=" "+o.options.custom_class);var s="";o.options.width&&o.options.height&&"number"==typeof o.options.width&&"number"==typeof o.options.height?s=' style="max-width:'+o.options.width+"px;height:"+o.options.height+'px;overflow:auto;"':o.options.width&&"number"==typeof o.options.width?s=' style="max-width:'+o.options.width+'px;"':o.options.height&&"number"==typeof o.options.height&&(s=' style="height:'+o.options.height+'px;overflow:auto;"'),("image"==o.options.type||"video"==o.options.type||"instagram"==o.options.type||o.options.fullscreen)&&(s="");var d="";o.is_touch()&&(d=' style="cursor:pointer;"');var r='<div class="modaal-wrapper modaal-'+o.options.type+i+e+n+o.options.custom_class+'" id="'+o.scope.id+'"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper"'+d+">";"video"!=o.options.type&&(r+='<div class="modaal-container"'+s+">"),r+='<div class="'+l+' modaal-focus" aria-hidden="false" aria-label="'+o.options.accessible_title+" - "+o.options.close_aria_label+'" role="dialog">',"inline"==o.options.type?r+='<div class="modaal-content-container" role="document"></div>':r+=t,r+="</div>"+o.scope.close_btn,"video"!=o.options.type&&(r+="</div>"),r+="</div>","image"==o.options.type&&!0===o.options.outer_controls&&(r+=o.scope.prev_btn+o.scope.next_btn),r+="</div></div>",a("#"+o.scope.id+"_overlay").length<1&&o.dom.append(r),"inline"==o.options.type&&t.appendTo("#"+o.scope.id+" .modaal-content-container"),o.modaal_overlay("show")},create_basic:function(){var t=this,o=a(t.scope.source),e="";o.length?(e=o.contents().detach(),o.empty()):e="Content could not be loaded. Please check the source and try again.",t.build_modal(e)},create_instagram:function(){var t=this,o=t.options.instagram_id,e="",i="Instagram photo couldn't be loaded, please check the embed code and try again.";if(t.build_modal('<div class="modaal-content-container'+(""!=t.options.loading_class?" "+t.options.loading_class:"")+'">'+t.options.loading_content+"</div>"),""!=o&&null!==o&&void 0!==o){var l="https://api.instagram.com/oembed?url=http://instagr.am/p/"+o+"/";a.ajax({url:l,dataType:"jsonp",cache:!1,success:function(o){t.dom.append('<div id="temp-ig" style="width:0;height:0;overflow:hidden;">'+o.html+"</div>"),t.dom.attr("data-igloaded")?window.instgrm.Embeds.process():t.dom.attr("data-igloaded","true");var e="#"+t.scope.id+" .modaal-content-container";a(e).length>0&&setTimeout(function(){a("#temp-ig").contents().clone().appendTo(e),a("#temp-ig").remove()},1e3)},error:function(){e=i;var o=a("#"+t.scope.id+" .modaal-content-container");o.length>0&&(o.removeClass(t.options.loading_class).addClass(t.options.ajax_error_class),o.html(e))}})}else e=i;return!1},fetch_ajax:function(t){var o=this;null==o.options.accessible_title&&(o.options.accessible_title="Dialog Window"),null!==o.xhr&&(o.xhr.abort(),o.xhr=null),o.build_modal('<div class="modaal-content-container'+(""!=o.options.loading_class?" "+o.options.loading_class:"")+'">'+o.options.loading_content+"</div>"),o.xhr=a.ajax(t,{success:function(t){var e=a("#"+o.scope.id).find(".modaal-content-container");e.length>0&&(e.removeClass(o.options.loading_class),e.html(t),o.options.ajax_success.call(o,e))},error:function(t){if("abort"!=t.statusText){var e=a("#"+o.scope.id+" .modaal-content-container");e.length>0&&(e.removeClass(o.options.loading_class).addClass(o.options.ajax_error_class),e.html("Content could not be loaded. Please check the source and try again."))}}})},create_confirm:function(){var a,t=this;a='<div class="modaal-content-container"><h1 id="modaal-title">'+t.options.confirm_title+'</h1><div class="modaal-confirm-content">'+t.options.confirm_content+'</div><div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">'+t.options.confirm_button_text+'</button><button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">'+t.options.confirm_cancel_button_text+"</button></div></div></div>",t.build_modal(a)},create_image:function(){var t,o,e=this,i="";if(e.$elem.is("[data-group]")||e.$elem.is("[rel]")){var l=e.$elem.is("[data-group]"),n=l?e.$elem.attr("data-group"):e.$elem.attr("rel"),s=a(l?'[data-group="'+n+'"]':'[rel="'+n+'"]');s.removeAttr("data-gallery-active","is_active"),e.$elem.attr("data-gallery-active","is_active"),o=s.length-1;var d=[];i='<div class="modaal-gallery-item-wrap">',s.each(function(t,o){var e="",i="",l="",n=!1,s=!1,r=o.getAttribute("data-modaal-desc"),c=o.getAttribute("data-gallery-active");a(o).attr("data-modaal-content-source")?e=a(o).attr("data-modaal-content-source"):a(o).attr("href")?e=a(o).attr("href"):a(o).attr("src")?e=a(o).attr("src"):(e="trigger requires href or data-modaal-content-source attribute",s=!0),""!=r&&null!==r&&void 0!==r?(i=r,l='<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image '+(t+1)+" - </span>"+r.replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</div>"):l='<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image '+(t+1)+"</span></div>",c&&(n=!0);var m={url:e,alt:i,rawdesc:r,desc:l,active:n,src_error:s};d.push(m)});for(var r=0;r<d.length;r++){var c="",m=d[r].rawdesc?"Image: "+d[r].rawdesc:"Image "+r+" no description";d[r].active&&(c=" "+e.private_options.active_class);var p=d[r].src_error?d[r].url:'<img src="'+d[r].url+'" alt=" " style="width:100%">';i+='<div class="modaal-gallery-item gallery-item-'+r+c+'" aria-label="'+m+'">'+p+d[r].desc+"</div>"}i+="</div>",1!=e.options.outer_controls&&(i+=e.scope.prev_btn+e.scope.next_btn)}else{var u,_=!1;e.$elem.attr("data-modaal-content-source")?u=e.$elem.attr("data-modaal-content-source"):e.$elem.attr("href")?u=e.$elem.attr("href"):e.$elem.attr("src")?u=e.$elem.attr("src"):(u="trigger requires href or data-modaal-content-source attribute",_=!0);var v="",f="",m="";e.$elem.attr("data-modaal-desc")?(m=e.$elem.attr("data-modaal-desc"),v=e.$elem.attr("data-modaal-desc"),f='<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>'+v.replace(/</g,"&lt;").replace(/>/g,"&gt;")+"</div>"):m="Image with no description";var p=_?u:'<img src="'+u+'" alt=" " style="width:100%">';i='<div class="modaal-gallery-item is_active" aria-label="'+m+'">'+p+f+"</div>"}t=i,e.build_modal(t),a(".modaal-gallery-item.is_active").is(".gallery-item-0")&&a(".modaal-gallery-prev").hide(),a(".modaal-gallery-item.is_active").is(".gallery-item-"+o)&&a(".modaal-gallery-next").hide()},gallery_update:function(t){var o=this,e=a("#"+o.scope.id),i=e.find(".modaal-gallery-item"),l=i.length-1;if(0==l)return!1;var n=e.find(".modaal-gallery-prev"),s=e.find(".modaal-gallery-next"),d=0,r=0,c=e.find(".modaal-gallery-item."+o.private_options.active_class),m="next"==t?c.next(".modaal-gallery-item"):c.prev(".modaal-gallery-item");return o.options.before_image_change.call(o,c,m),("prev"!=t||!e.find(".gallery-item-0").hasClass("is_active"))&&(("next"!=t||!e.find(".gallery-item-"+l).hasClass("is_active"))&&void c.stop().animate({opacity:0},250,function(){m.addClass("is_next").css({position:"absolute",display:"block",opacity:0});var t=a(document).width(),i=t>1140?280:50;d=e.find(".modaal-gallery-item.is_next").width(),r=e.find(".modaal-gallery-item.is_next").height();var p=e.find(".modaal-gallery-item.is_next img").prop("naturalWidth"),u=e.find(".modaal-gallery-item.is_next img").prop("naturalHeight");p>t-i?(d=t-i,e.find(".modaal-gallery-item.is_next").css({width:d}),e.find(".modaal-gallery-item.is_next img").css({width:d}),r=e.find(".modaal-gallery-item.is_next").find("img").height()):(d=p,r=u),e.find(".modaal-gallery-item-wrap").stop().animate({width:d,height:r},250,function(){c.removeClass(o.private_options.active_class+" "+o.options.gallery_active_class).removeAttr("style"),c.find("img").removeAttr("style"),m.addClass(o.private_options.active_class+" "+o.options.gallery_active_class).removeClass("is_next").css("position",""),m.stop().animate({opacity:1},250,function(){a(this).removeAttr("style").css({width:"100%"}),a(this).find("img").css("width","100%"),e.find(".modaal-gallery-item-wrap").removeAttr("style"),o.options.after_image_change.call(o,m)}),e.find(".modaal-gallery-item").removeAttr("tabindex"),e.find(".modaal-gallery-item."+o.private_options.active_class).attr("tabindex","0").focus(),e.find(".modaal-gallery-item."+o.private_options.active_class).is(".gallery-item-0")?n.stop().animate({opacity:0},150,function(){a(this).hide()}):n.stop().css({display:"block",opacity:n.css("opacity")}).animate({opacity:1},150),e.find(".modaal-gallery-item."+o.private_options.active_class).is(".gallery-item-"+l)?s.stop().animate({opacity:0},150,function(){a(this).hide()}):s.stop().css({display:"block",opacity:n.css("opacity")}).animate({opacity:1},150)})}))},create_video:function(a){var t,o=this;t='<iframe src="'+a+'" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>',o.build_modal('<div class="modaal-video-container">'+t+"</div>")},create_iframe:function(a){var t,o=this;t=null!==o.options.width||void 0!==o.options.width||null!==o.options.height||void 0!==o.options.height?'<iframe src="'+a+'" class="modaal-iframe-elem" frameborder="0" allowfullscreen></iframe>':'<div class="modaal-content-container">Please specify a width and height for your iframe</div>',o.build_modal(t)},modaal_open:function(){var t=this,o=a("#"+t.scope.id),e=t.options.animation;"none"===e&&(o.removeClass("modaal-start_none"),t.options.after_open.call(t,o)),"fade"===e&&o.removeClass("modaal-start_fade"),"slide-down"===e&&o.removeClass("modaal-start_slide_down");var i=o;a(".modaal-wrapper *[tabindex=0]").removeAttr("tabindex"),i="image"==t.options.type?a("#"+t.scope.id).find(".modaal-gallery-item."+t.private_options.active_class):o.find(".modaal-iframe-elem").length?o.find(".modaal-iframe-elem"):o.find(".modaal-video-wrap").length?o.find(".modaal-video-wrap"):o.find(".modaal-focus"),i.attr("tabindex","0").focus(),"none"!==e&&setTimeout(function(){t.options.after_open.call(t,o)},t.options.after_callback_delay)},modaal_close:function(){var t=this,o=a("#"+t.scope.id);t.options.before_close.call(t,o),null!==t.xhr&&(t.xhr.abort(),t.xhr=null),"none"===t.options.animation&&o.addClass("modaal-start_none"),"fade"===t.options.animation&&o.addClass("modaal-start_fade"),"slide-down"===t.options.animation&&o.addClass("modaal-start_slide_down"),setTimeout(function(){"inline"==t.options.type&&a("#"+t.scope.id+" .modaal-content-container").contents().detach().appendTo(t.scope.source),o.remove(),t.options.after_close.call(t),t.scope.is_open=!1},t.options.after_callback_delay),t.modaal_overlay("hide"),null!=t.lastFocus&&t.lastFocus.focus()},modaal_overlay:function(t){var o=this;"show"==t?(o.scope.is_open=!0,o.options.background_scroll||o.dom.addClass("modaal-noscroll"),a("#"+o.scope.id+"_overlay").length<1&&o.dom.append('<div class="modaal-overlay" id="'+o.scope.id+'_overlay"></div>'),a("#"+o.scope.id+"_overlay").css("background",o.options.background).stop().animate({opacity:o.options.overlay_opacity},o.options.animation_speed,function(){o.modaal_open()})):"hide"==t&&a("#"+o.scope.id+"_overlay").stop().animate({opacity:0},o.options.animation_speed,function(){a(this).remove(),o.dom.removeClass("modaal-noscroll")})},is_touch:function(){return"ontouchstart"in window||navigator.maxTouchPoints}},e=[];a.fn.modaal=function(t){return this.each(function(i){var l=a(this).data("modaal");if(l){if("string"==typeof t)switch(t){case"open":l.create_modaal(l);break;case"close":l.modaal_close()}}else{var n=Object.create(o);n.init(t,this),a.data(this,"modaal",n),e.push({element:a(this).attr("class"),options:t})}})},a.fn.modaal.options={type:"inline",content_source:null,animation:"fade",animation_speed:300,after_callback_delay:350,is_locked:!1,hide_close:!1,background:"#000",overlay_opacity:"0.8",overlay_close:!0,accessible_title:"Dialog Window",start_open:!1,fullscreen:!1,custom_class:"",background_scroll:!1,should_open:!0,close_text:"Close",close_aria_label:"Close (Press escape to close)",width:null,height:null,before_open:function(){},after_open:function(){},before_close:function(){},after_close:function(){},source:function(a,t){return t},confirm_button_text:"Confirm",confirm_cancel_button_text:"Cancel",confirm_title:"Confirm Title",confirm_content:"<p>This is the default confirm dialog content. Replace me through the options</p>",confirm_callback:function(){},confirm_cancel_callback:function(){},gallery_active_class:"gallery_active_item",outer_controls:!1,before_image_change:function(a,t){},after_image_change:function(a){},loading_content:'<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>',loading_class:"is_loading",ajax_error_class:"modaal-error",ajax_success:function(){},instagram_id:null},a(function(){var o=a(".modaal");o.length&&o.each(function(){t(a(this))});var i=new MutationObserver(function(o){o.forEach(function(o){if(o.addedNodes&&o.addedNodes.length>0){[].some.call(o.addedNodes,function(o){var i=a(o);(i.is("a")||i.is("button"))&&(i.hasClass("modaal")?t(i):e.forEach(function(t){if(t.element==i.attr("class"))return a(i).modaal(t.options),!1}))})}})}),l={subtree:!0,attributes:!0,childList:!0,characterData:!0};setTimeout(function(){i.observe(document.body,l)},500)})}(jQuery,window,document);
/* end of /views/aanpakringzuid/js/libs/modaal/modaal.min.js */
/* start of /views/aanpakringzuid/js/headersticky.js (as is) */
"use strict";!function(o){o((function(){return window.headerHeight=0===o(".header").length?0:o(".header").height(),window.navHeight=0===o(".grid-zone.z-navigatie").length?0:o(".grid-zone.z-navigatie").height(),window.marginTop=parseInt(o("main").css("margin-top"),10)}));var n=function(){(o("body").hasClass("large")||o("body").hasClass("medium"))&&o(document).scrollTop()>=window.headerHeight?(o("body").addClass("scrolled"),o("main").css({"margin-top":window.headerHeight+window.marginTop}),window.SmoothAnchorsConfig.topOffset=window.navHeight):(o("body").removeClass("scrolled"),o("main").css({"margin-top":window.marginTop}),window.SmoothAnchorsConfig.topOffset=0)};o(window).on("scroll load",n),o(window).smartresize(n)}(jQuery);
/* end of /views/aanpakringzuid/js/headersticky.js */
/* start of /views/aanpakringzuid/js/canvasheight.js (as is) */
"use strict";!function(s){window.responsiveBehaviours=window.responsiveBehaviours||[],window.responsiveBehaviours.push((function(i){var o=s("body.small .z-canvas .rol-rij-canvastitel").height();s("body.small .z-canvas").css({height:o+300,"padding-bottom":o})}))}(jQuery);
/* end of /views/aanpakringzuid/js/canvasheight.js */
/* start of /views/aanpakringzuid/js/contrastbutton.js (as is) */
"use strict";!function(t){window.pageLoadFunctions=window.pageLoadFunctions||[],window.responsiveBehaviours=window.responsiveBehaviours||[];var n=function(t,n,e,o){o?t.removeClass(n).addClass(e):t.removeClass(e).addClass(n)},e=function(e,o,a){a||(o="highcontrast-".concat(o)),t(e).each((function(){var e=t(this),s=e.attr("class"),r=new RegExp("(".concat(o,"(-\\w+?)+)\\b")).exec(s);if(r&&r.length>1){var i=r[1];a?n(e,i,"highcontrast-".concat(i),a):n(e,i.substring(13),i,a)}}))};window.responsiveBehaviours.push((function(n){if(1===n.closest("header").length){var e=window.iprox.referenceLists.getText("Contrast"),a="<div class='contrast-buttons'>\n          <button class='contrast-button contrast-button-activate'>\n            <span class='contrast-toggle'>\n              <i class='toggle' aria-hidden='true'></i>\n            </span>\n            <span aria-hidden='true'>".concat(e,"</span>\n          </button>\n         </div>");t(".contrast-buttons").remove(),t(".z-logonav > .type-tekst .grid-inside").prepend(a),t(".contrast-button").unlessProcessed("contrastbutton").click((function(){var n=t(this).hasClass("contrast-button-activate"),e=new Date;e.setDate(e.getDate()+365),setCookie("contrastmode",n,e,"/",document.domain),o(n)}))}})),window.pageLoadFunctions.push((function(t){var n=getCookie("contrastmode");n&&"true"===n?o(!0):n&&"false"===n&&o(!1)}));var o=function(o){var a=t("body"),s=t(".contrast-button");o?(s.attr("title",window.iprox.referenceLists.getText("Deactiveer contrast")),s.removeClass("contrast-button-activate").addClass("contrast-button-deactivate")):(s.attr("title",window.iprox.referenceLists.getText("Activeer contrast")),s.removeClass("contrast-button-deactivate").addClass("contrast-button-activate")),n(a,"rol-body","has-highcontrast",o),e(".grid-wrapper","rol-sectie",o),e(".grid-zone","z-rol",o),e(".grid-row","rol-rij",o),e(".grid-blok","rol",o)}}(jQuery);
/* end of /views/aanpakringzuid/js/contrastbutton.js */
/* start of /views/aanpakringzuid/js/zoekveld.js (as is) */
"use strict";!function(e){e((function(){e("header .type-tekst .grid-inside").append(e("<a class='search-expand' href='#zoekbox' aria-expanded='false'><i class='search-icon' aria-hidden='true'></i><span>".concat(window.iprox.referenceLists.getText("Zoeken"),"</span></a>"))),e("header .z-zoek").find(".zoekveld").attr("id","zoekbox"),e(".search-expand").on("click",(function(a){return e(this).toggleClass("search-expanded"),e(this).hasClass("search-expanded")?(e("body").hasClass("large")||(e(".menu-container").hide(),e("#zoekbox").scrollTo()),e(this).attr("aria-expanded","true"),e("header .z-zoek .type-zoeken").slideDown().find("input").focus()):(e(this).attr("aria-expanded","false"),e("header .z-zoek .type-zoeken").slideUp()),!1})),e(".type-primaire-navigatie .heading-elt-nav").on("click",(function(){e(this).closest(".z-logonav").find(".search-expand").hasClass("search-expanded")&&(e(this).closest(".z-logonav").find(".search-expand").attr("aria-expanded","false").removeClass("search-expanded"),e("header .z-zoek .type-zoeken").slideUp())}))}))}(jQuery);
/* end of /views/aanpakringzuid/js/zoekveld.js */
/* start of /views/aanpakringzuid/js/index-galerij.js (as is) */
(function(){"use strict";var i,e;i=this.jQuery,e=function(e){var t,s;s=[".type-entry"],t=[],i(".type-galerij .grid-nesting",e).fixRowHeightsInNesting(s.toString(),t.toString())},i.fn.fixRowHeightsInNesting=function(e,t){return null==e&&(e=".has-border, .has-bgcolor"),null==t&&(t=""),i(this).each((function(){var s,r,n;s=i(this),r=0,i(n="> .row-clear, > .grid-row, > .grid-blok",s).each((function(){i(this).hasClass("grid-blok")?""!==e&&!i(this).is(e)||""!==t&&i(this).is(t)||(i("> .grid-element > .grid-edge",i(this)).css({height:"auto"}).removeClass("resized"),i("> .grid-element > .grid-edge",i(this)).height()>r&&(r=i("> .grid-element > .grid-edge",i(this)).height())):(i(this).data("rowmax",r),r=0)})),i(n,s).reverse().each((function(){i(this).hasClass("grid-blok")?!(r>0)||""!==e&&!i(this).is(e)||""!==t&&i(this).is(t)||i("> .grid-element > .grid-edge",i(this)).height(r).addClass("resized"):r=i(this).data("rowmax")}))})),i(this)},this.responsiveBehaviours.push(e),i(window).on("load",(function(){e(document)})),i(window).smartresize((function(){e(document)}))}).call(this);
/* end of /views/aanpakringzuid/js/index-galerij.js */
/* start of /views/aanpakringzuid/js/werkzaamheid-lightbox.js (as is) */
"use strict";!function(e){var t=function(t,a){var n=e(a),i=n.attr("href").contains("?")?"&":"?";n.attr("href","".concat(n.attr("href")).concat(i,"content_only=true")).modaal({animation_speed:600,accessible_title:n.text(),close_aria_label:window.iprox.referenceLists.getText("Dialoog sluiten"),type:"ajax"})};window.pageLoadFunctions.push((function(){return e(".type-actuelewerkzaamheden .titel a").unlessProcessed("lightboxLink").each(t)}))}(jQuery);
/* end of /views/aanpakringzuid/js/werkzaamheid-lightbox.js */
/* start of /views/aanpakringzuid/js/reactie-linking.js (as is) */
"use strict";!function(e){var i=function(i,n){var t=e(n),r=t.attr("href"),a=t.closest(".grid-blok");a.addClass("linking").find(".grid-edge").click((function(){location.href=r})),a.find(".summary a").click((function(e){e.stopPropagation()}))};window.pageLoadFunctions.push((function(){return e(".reactie-entry .reactie-link a, .reactie-entry .related-item a").unlessProcessed("reactie-linking").each(i)}))}(jQuery);
/* end of /views/aanpakringzuid/js/reactie-linking.js */
/* start of /views/aanpakringzuid/js/media-lightbox.js (as is) */
"use strict";!function(e){pageLoadFunctions.push((function(){e(".type-galerij .ipx-pt-fotoalbum .images, .type-galerij .ipx-pt-media .images").unlessProcessed("mediaLightboxLink").each((function(){var t=e(this),n=t.closest(".entry").find(".titel a"),i=n.attr("href").contains("?")?"&":"?",o="".concat(n.attr("href")).concat(i,"content_only=true"),a=e("body").hasClass("large")?1e3:e(window).width()-40;t.addClass("linking").modaal({content_source:o,animation_speed:600,width:a,accessible_title:n.text(),close_aria_label:window.iprox.referenceLists.getText("Dialoog sluiten"),type:"ajax"}),t.find("a").click((function(e){e.stopPropagation()}))}))})),pageLoadFunctions.push((function(){e(".modaal-content-container").unlessProcessed("mediaLightboxContent").each((function(){e(this).find(window.responsiveConfig.containerSelector).runResponsiveBehaviour(!0)}))}))}(jQuery);
/* end of /views/aanpakringzuid/js/media-lightbox.js */
/* start of /views/pagetypes/selectie/js/selectie.js (as is) */
(function(){"use strict";var e,n;e=this.jQuery,null!=(n=this.pageLoadFunctions)&&n.push((function(){return e(".zoeken-daterange-monthyear .zoeken-daterange-year select").unlessProcessed("zoeken_daterange_year_change").on("change",(function(){var n,a;return n=(a=e(this)).closest(".zoeken-daterange-monthyear").find(".zoeken-daterange-month select"),a.val()?n.removeAttr("disabled"):n.val("").attr("disabled","disabled")}))}))}).call(this);
/* end of /views/pagetypes/selectie/js/selectie.js */
/* start of /views/pagetypes/googleanalytics/js/gua.js (as is) */
window.gaAvailable=window.gaAvailable||!1,runOnLoad((function(e){$("a.externLink, a.importLink",e).unlessProcessed("gua-event-action").on("click",(function(e){var n=$(this);if(!window.gaAvailable||n.hasClass("guaPrevent"))return n.removeClass("guaPrevent"),!0;var a=n.attr("href");if(n.hasClass("importLink")){var t=n.attr("class").replace("importLink ","").toUpperCase();return ga("send","event",{eventCategory:"Download",eventAction:t,eventLabel:a}),!0}return n.hasClass("openinnewwindow")||e.ctrlKey?(ga("send","event",{eventCategory:"Externe link",eventAction:a}),!0):(e.stopImmediatePropagation(),n.addClass("guaPrevent"),ga("send","event",{eventCategory:"Externe link",eventAction:a,hitCallback:function(){n[0].click()},hitCallbackFail:function(){n[0].click()}}),!1)}))}),{prepend:!0});
/* end of /views/pagetypes/googleanalytics/js/gua.js */