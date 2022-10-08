(function ($) {
    $(function(){

        // EMAIL REGEX TEST ==========================================================
        emailPatt = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$');

        // ERROR MESSAGES ON FORMS ==========================================
        $('.webform-client-form').on('submit', function(e){
            // set error to false
            error = false;
            $('.error-msg').remove();
            $('.form-item.error').removeClass('error');
            // iterate through all :visible .form-item(s) - (bc hidden conditional items should be ignored)
            $.each( $('.form-item .required:visible'), function(){
                $this = $(this);
                // get label value, assign it to a variable
                if ( $this.hasClass('form-textarea') ) {
                    var fldName = $this.closest('.form-textarea-wrapper').prev('label').html();
                } else {
                    var fldName = $this.prev('label').html();
                }
                // check for email field
                if ( $this.hasClass('email') ) {
                    var emailAddr = $this.val();
                    var errMsg = $('<div class="error-msg">Please enter a vaild email address.</div>');
                    // run email regex test
                    res = emailPatt.test(emailAddr);
                    // if email regex test fails
                    if ( !res ) { error = true; }
                } else {
                    var errMsg = $('<div class="error-msg">' + fldName + ' is a required field.</div>');
                }
                // if any of the fields are empty - set 'error' to true
                if ( $this.val() === '' ) {
                    error = true;
                    $this.addClass('error')
                         .before(errMsg);
                }
            });//each
            // prevent form submission if error(s) exist
            if ( error ) {
                e.preventDefault();
            }
        });// submit

        // REMOVE ERROR MESSAGES ON KEYPRESS ===============================
        // TEXT/TEXTAREA INPUT KEYPRESS ==========================
        $('.form-item .required').on('keypress',function(){
            $(this).removeClass('error').prev('.error-msg').remove();
        });
        // SELECT OPTION CHANGE =========================
        $('.form-select.required').on('change',function(){
            $(this).removeClass('error').prev('.error-msg').remove();
        });

    });// end document ready function
}(jQuery));

// ERROR MESSAGE SASS ===================
// .error-msg {
//     width: 100%;
//     font-size: 0.8em;
//     color: red;
//     span { display: none !important; }
// }//error-msg;
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;
(function($){$(function(){var amountScrolled=300;$(window).scroll(function(){if($(window).scrollTop()>amountScrolled)$("a.back-to-top").fadeIn("slow");else $("a.back-to-top").fadeOut("slow")});$(document).ready(function(){$("#gototop").click(function(event){window.scrollTo(0,0)})});$(window).scroll(function(){if($(window).scrollTop()>400)$(".header").addClass("opaqueheader");else $(".header").removeClass("opaqueheader")});var getResourceCountSrc=$(".front-row-5-list .view-header").clone();$(".front-row-5-list .view-content .views-row").addClass(""+
getResourceCountSrc+"");$(".header .pane-search-form .form-text").attr("placeholder","Search");$(".mobile-header .pane-search-form .form-text").attr("placeholder","Search");$(".header-search .pane-search-form .form-text").attr("placeholder","Search");$(".search-layout .onecol-layout .pane-search-form .form-text").attr("placeholder","Search");$(".blog-post-layout .field-name-field-blog-image").clone().appendTo(".blog-post-layout .pane-node-body p:first-child");$(document).ready(function(){if($(".field-collection-item-field-horizontal-round-block-gro").length)if($(".field-name-field-block-url").length)$(".field-name-field-block-url").each(function(){var roundblockurl=
$(this).children(".field-items").text();var target=$(this).next(".field-name-field-block-url-new-window").children().children().text();$(this).parent().parent().css("cursor","pointer");$(this).parent().parent().click(function(){if(target=="on")window.open(roundblockurl,"_blank");else window.location.href=roundblockurl})});if($(".field-collection-item-field-persona-block-group").length)if($(".field-name-field-persona-block-url").length)$(".field-name-field-persona-block-url").each(function(){var roundblockurl=
$(this).children(".field-items").text();$(this).parent().parent().css("cursor","pointer");$(this).parent().parent().click(function(){window.location.href=roundblockurl})});if($(".persona_impact_award").length){console.log("cc");$(".field-name-field-persona-block-title .field-items p").css({"color":"#394a59","font-weight":"bold"})}if($(".view-id-front_page.front-hero #front-video-banner").length){var homevideo=document.getElementById("front-video-banner");var loopLimit=3;var loopCounter=0;homevideo.addEventListener("ended",
function(){if(loopCounter<loopLimit){this.currentTime=0;this.play();loopCounter++}},false);$(window).focus(function(){homevideo.play()}).blur(function(){homevideo.pause()})}});if($("#no-results-trigger-front-r5").length)$("#mini-panel-front_page_row_5").remove();if($("#no-results-trigger-inpage-resources").length)$("#mini-panel-inpage_resources").remove();if($("#clients-logo-missing-trigger").length)$(".adv-basic-page-layout .view-id-client_logos").remove();if($(".ctile_headline").length){$(".ctile_headline").not(":first").remove();
$(window).resize(function(){if($(window).width()<=800){$(".ctile_headline").prependTo(".view-id-testimonial_tiles .field-content");$(".ctile_headline").not(":first").remove()}})}$(".mobile-header").hide();$("#shadow").hide();$("#shadow-search").hide();$("#close-search, .header #search-trigger,.header #search2019-trigger,.header .search2021, #shadow-search").click(function(){$(".header-search").toggleClass("active");$("#shadow-search").fadeToggle("slow",function(){$("#edit-search-block-form--4").focus()});
$(".header #burger").removeClass("active");$(".mobile-header").hide();$("#shadow").hide();$(".header #burger").animate({borderSpacing:0},{step:function(now,fx){$(this).css("-webkit-transform","rotate("+now+"deg)");$(this).css("-moz-transform","rotate("+now+"deg)");$(this).css("transform","rotate("+now+"deg)")},duration:"fast"},"linear")});$(document).ready(function(){$(document).keydown(function(e){if(e.keyCode==27){$(".header #burger").removeClass("active");$(".mobile-header").slideUp("slow");$("#shadow").fadeOut("slow");
$(".header-search").removeClass("active");$("#shadow-search").fadeOut("slow");$("#menu-company").removeClass("active");$("#menu-techno").removeClass("active");$("#menu-support").removeClass("active");$("#menu-techno").removeClass("active");$("#menu-solutions").removeClass("active");$(".header #burger").animate({borderSpacing:0},{step:function(now,fx){$(this).css("-webkit-transform","rotate("+now+"deg)");$(this).css("-moz-transform","rotate("+now+"deg)");$(this).css("transform","rotate("+now+"deg)")},
duration:"fast"},"linear")}})});$(".header #burger, #shadow").click(function(){$(".header #burger").toggleClass("active");$(".mobile-header").slideToggle("slow");$("#shadow").fadeToggle("slow")});nav_timer=false;$("#menu-solutions").hover(function(){$(this).addClass("active");if(nav_timer)clearTimeout(nav_timer)},function(){var $this=$(this);nav_timer=setTimeout(function(){$this.removeClass("active")},300)});$("#menu-techno").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});
$("#menu-bizneeds").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});$("#menu-customers").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});$("#menu-resources").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});$("#menu-events").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});$("#menu-company").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});
$("#menu-techno").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});$("#menu-careers").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});$("#menu-support").hover(function(){$(this).addClass("active")},function(){$(this).removeClass("active")});$("#ar_menu_hover A").hover(function(){$("#ar_menu_hover > ul ").fadeIn()});$("#ar_menu_hover > ul ").hide();$(document).on("click",".disabled_menu_link",function(e){e.preventDefault()});
if($(".contact_2021_text").length)$(".contact2021").hover(function(){console.log("test hov");$(".contact_2021_text").css("color","#039fb0")},function(){$(".contact_2021_text").css("color","#FFF")});$(document).on("click",".menu_link_newtab",function(e){e.preventDefault();var url=$(this).attr("href");window.open(url,"_blank")});timer_visible=false;var $menu=$("#language-popup-wrap");$("#language-header-trigger").hover(function(){$menu.addClass("lang_select_visible");$menu.removeClass("lang_select_hidden");
if(timer_visible)clearTimeout(timer_visible)},function(){timer_visible=setTimeout(function(){$menu.removeClass("lang_select_visible");$menu.addClass("lang_select_hidden")},300)});$(".front-row-4 .views-field").matchHeight({byRow:true,property:"height",target:null,remove:false});$(".front-row-3 .views-field").matchHeight({byRow:true,property:"min-height",target:null,remove:false});$(".front-row-5-list .views-field-title h3").matchHeight({byRow:true,property:"min-height",target:null,remove:false});
$(".front-row-5-list .views-row").matchHeight({byRow:true,property:"min-height",target:null,remove:false});$("#mini-panel-front_page_row_8 .panel-panel").matchHeight({byRow:true,property:"height",target:null,remove:false});$(".view-advanced-basic-page .view-content .views-row .col").matchHeight({byRow:true,property:"height",target:null,remove:false});$(".view-id-testimonial .item-list ul li .views-field-field-testimonial-quote").matchHeight({byRow:true,property:"height",target:null,remove:false});
$(".views-field-field-hover-block-group .item-list ul li .entity .content").matchHeight({byRow:false,property:"height",target:null,remove:false});$(".category-level1-layout .view-id-category_menu .item-list ul li .inner .inner2").matchHeight({byRow:false,property:"height",target:null,remove:false});$(".category-level2-layout .view-id-category_menu .item-list ul li").matchHeight({byRow:true,property:"height",target:null,remove:false});$(".view-id-resources_landing_page .view-content .item-list ul li div.list-table div.list-cell").matchHeight({byRow:true,
property:"min-height",target:null,remove:false});$(".view-id-customers_list table tr td").matchHeight({byRow:true,property:"height",target:null,remove:false});$(".view-id-team_member_list .item-list ul li").matchHeight({byRow:true,property:"height",target:null,remove:false});$(document).ready(function(){$(".cta-compact").each(function(i,obj){var ctaheight=$(obj).find(".subheadline").height();if(ctaheight>30)$(obj).find(".headline").css("padding-top","40px")})});$(document).ready(function(){if($(".views-field-field-carousel").length){$(".views-field-field-carousel .field-content .item-list ul").addClass("header-carousel");
$(".views-field-field-carousel .field-content .item-list ul li").addClass("header-carousel-cell").css("width",$(window).width());$(window).on("resize",function(){$(".header-carousel-cell").css("width",$(window).width())});if($(".views-field-field-front-page-hero-video-sour video").length&&$(".header-carousel-cell").length>1){$(".views-field-field-front-page-hero").hide();$(".views-field-field-front-page-hero-video-sour").hide();$(".hero-vid-filter").hide();$(".view-id-front_page.front-hero .view-content .views-row").css({"padding":"0",
"margin":"0","max-width":"none"})}if($(".field-name-field-carousel-video video").length&&$(".header-carousel-cell").length>1){$(".views-field-field-front-page-hero").hide();$(".views-field-field-front-page-hero-video-sour").hide();$(".hero-vid-filter").hide();$(".view-id-front_page.front-hero .view-content .views-row").css({"padding":"0","margin":"0","max-width":"none"});var slidervideo=$(".field-name-field-carousel-video video");$(window).focus(function(){slidervideo.get(0).play()}).blur(function(){slidervideo.get(0).pause()})}if($(".header-carousel-cell").length>
1){$(".views-field-field-header-title").hide();$(".views-field-field-header-subheadline").hide();$(".views-field-field-header-background-image").hide();$(".header-carousel").flickity({wrapAround:true,selectedAttraction:.025,friction:.5,imagesLoaded:true})}else $(".views-field-field-carousel").hide();$(".flickity-prev-next-button").click(function(){if($(".field-name-field-carousel-video video").length&&$(".header-carousel-cell").length>1){var currentslide=$("li.header-carousel-cell.is-selected");if(currentslide.find("video").length)currentslide.find("video").get(0).play();
else $("li.header-carousel-cell").find("video").get(0).pause()}});if($(".node-type-front-page.dev2021_v4").length)$(".front-hero .views-field-field-carousel").addClass("home_carousel_enabled")}if($(".carousel").length)$(".carousel").flickity({wrapAround:true,freeScroll:true,initialIndex:1,percentPosition:true,prevNextButtons:true,pageDots:false,imagesLoaded:true})});$(document).ready(function(){$(window).resize(function(){var headerHeight=$(".header").outerHeight();$("#container").css({"paddingTop":""+
headerHeight+"px"})});$(window).resize()});$(document).ready(function(){$(window).resize(function(){var headerHeight=$(".logged-in #toolbar").outerHeight();$(".logged-in .header").css({"marginTop":""+headerHeight+"px"})});$(window).resize()});$(document).ready(function(){$(window).resize(function(){var headerHeight=$(".logged-in #toolbar").outerHeight();$(".logged-in .mobile-header").css({"marginTop":""+headerHeight+"px"})});$(window).resize()});$(document).ready(function(){$(window).resize(function(){var headerHeight=
$(".header").outerHeight();$(".mobile-header").css({"top":""+headerHeight+"px"})});$(window).resize()});$(document).ready(function(){$(window).resize(function(){var headerHeight=$(".logged-in #toolbar").outerHeight();$(".logged-in .header-search").css({"marginTop":""+headerHeight+"px"})});$(window).resize()});$(document).ready(function(){$(window).resize(function(){var headerHeight=$(".header").outerHeight();$(".header-search").css({"min-height":""+headerHeight+"px"})});$(window).resize()});$(document).ready(function(){function ScrollTo(loc){event.preventDefault();
var hash=loc;var hashposition=$(hash).offset().top;var decal=200;var hashfinalcoord=Math.round(hashposition-decal);$("html, body").animate({scrollTop:hashfinalcoord},800,function(){window.location.hash=hash})}$(".eskanchor").click(function(){ScrollTo($(this).attr("href"))});if(location.hash!=="")ScrollTo(location.hash)});$(document).ready(function(){if($(".video_layout_container").length)$(".video_layout_container").parent(".group_body").addClass("video_layout_wrap")});var getFrontHeroImageQuoteV3=
$(".front-row-v3-quote .views-field-field-front-v3-quote-background img").attr("src");$(".front-row-v3-quote").css("background-image","url("+getFrontHeroImageQuoteV3+")");$(".front-row-v3-quote").css("background-attachment","fixed");$(".front-row-v3-quote").css("background-size","cover");var getFrontHeroImageSrc=$(".front-row-4 .views-field-field-front-page-row-4-image-1 img").attr("src");$(".front-row-4 .views-field-field-front-page-row-4-image-1 .field-content").css("background-image","url("+getFrontHeroImageSrc+
")");var getFrontHeroImageSrc1=$(".view-id-page_header .views-field-field-header-background-image img").attr("src");$(".view-id-page_header").css("background-image","url("+getFrontHeroImageSrc1+")");var getFrontHeroImageSrc1tax=$(".view-id-page_header_tax .views-field-field-header-background-image img").attr("src");$(".view-id-page_header_tax").css("background-image","url("+getFrontHeroImageSrc1tax+")");var getFrontHeroImageSrc1why=$(".views-field-field-front-v3-why-esker-image-1 .field-content img").attr("src");
$(".why_global_container").css("background-image","url("+getFrontHeroImageSrc1why+")");$.each($("#mini-panel-front_page_row_6 .view-id-front_page.front-row-6-list .view-content .views-row .wrap"),function(){$this=$(this);var getFrontSlideImageSrc2=$this.find(".image .img-wrap img").attr("src");$this.css("background-image","url("+getFrontSlideImageSrc2+")")});$.each($(".view-advanced-basic-page .view-content .views-row"),function(){$this=$(this);var getFrontSlideImageSrc3=$this.find(".views-field-field-group-background-image img").attr("src");
if(getFrontSlideImageSrc3)$this.css("background-image","url("+getFrontSlideImageSrc3+")")});$.each($(".views-field-field-hover-block-group .item-list ul li"),function(){$this=$(this);var getFrontSlideImageSrc4=$this.find(".field-name-field-hover-block-background img").attr("src");$this.css("background-image","url("+getFrontSlideImageSrc4+")")});$.each($(".views-field-field-hover-block-group .item-list ul li"),function(){$this=$(this);var getFrontSlideImageSrc5=$this.find(".field-name-field-hover-block-icon img").attr("src");
$this.find(".field-name-field-hover-block-text").css("background-image","url("+getFrontSlideImageSrc5+")")});$.each($(".category-level1-layout .view-id-category_menu .item-list ul li"),function(){$this=$(this);var getFrontSlideImageSrc6=$this.find(".field-name-field-menu-background img").attr("src");$this.css("background-image","url("+getFrontSlideImageSrc6+")")});var getFrontHeroImageSrc=$(".page-taxonomy-term.blog-landing-page-layout .view-id-header_image_import .views-field-field-header-background-image img").attr("src");
$(".page-taxonomy-term.blog-landing-page-layout .view-id-page_header_tax").css("background-image","url("+getFrontHeroImageSrc+")");$(".front-row-2 .view-content .item-list ul").flickity({wrapAround:false,contain:true,prevNextButtons:false,pageDots:true});$(".front-row-6-list .view-content").flickity({wrapAround:true,initialIndex:1,percentPosition:true,prevNextButtons:true,pageDots:true});if($(".v3_around_group_image").length||$(".v4_around_group_image_large").length)$(".v3_6i2b").parent().parent().next(".image").addClass("v3agi_image_6i2b");
if($(".v3_small_img").length){console.log("test");$(".v3agi_image_6i2b").children().children().children().addClass("v3_img_small_addmargin")}if($(".fi.panel-heading").length)$(".fi.panel-heading").click(function(){if($(this).hasClass("active")){$(this).removeClass("active");$(this).next(".fi.panel-body").slideUp()}else{$(this).addClass("active");$(this).next(".fi.panel-body").slideDown()}});function resizeModal(){if($(".video_modal").length){var modal_width=$(".video_container iframe").width();var new_height=
modal_width*.56;$(".video_container iframe").height(new_height)}}function getVideoType(videourl){var videotype;if(videourl.includes("wistia"))videotype="wistia";if(videourl.includes("youtube")||videourl.includes("youtu.be"))videotype="youtube";if(videourl.includes("vidyard")||videourl.includes("videos.esker.com"))videotype="vidyard";if(videourl.includes(".mp4"))videotype="rawmp4";return videotype}function RemoveVideoParam(videourl){if(videourl.includes("&"))videourl=videourl.split("&")[0];return videourl}
$(document).on("closemodal",function(e){$(".video_container").fadeOut(400);$(".faded-bg").fadeOut(400);setTimeout(function(){$(".video_modal").remove()},400)});$(document).on("click",".close-modal-button, .faded-bg",function(){$(document).trigger("closemodal")});$(document).keyup(function(e){if(e.keyCode===27&&$(".video_modal").length)$(document).trigger("closemodal")});$(document).on("mouseenter mouseleave",".video_container",function(){$(".close-modal-button").toggleClass("cross-display")});$(document).on("click",
".overlayvideo",function(e){e.preventDefault();var vidlink=$(this).attr("href");var vidtype=getVideoType(vidlink);if($(".video_modal").length){$(".video_container").fadeIn(400);$(".faded-bg").fadeIn(400)}else{switch(vidtype){case "wistia":vidlink=RemoveVideoParam(vidlink);vidlink=vidlink.replace("medias","embed/iframe");$("body").append('<div class="video_modal"><div class="video_container"><div class="close-modal-button"></div><iframe src="'+vidlink+'?videoFoam=true&autoPlay=true" allowtransparency="true" frameborder="0" scrolling="no" allowfullscreen webkitallowfullscreen oallowfullscreen></iframe></div><div class="faded-bg"></div></div>');
break;case "youtube":vidlink=RemoveVideoParam(vidlink);if(vidlink.includes("youtube"))vidlink=vidlink.replace("watch?v=","embed/");if(vidlink.includes("youtu.be"))vidlink=vidlink.replace("youtu.be","www.youtube.com/embed");$("body").append('<div class="video_modal"><div class="video_container"><div class="close-modal-button"></div><iframe src="'+vidlink+'?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen webkitallowfullscreen oallowfullscreen></iframe></div><div class="faded-bg"></div></div>');
break;case "vidyard":vidlink=RemoveVideoParam(vidlink);if(vidlink.includes("videos.esker.com")){vidID=vidlink.substring(vidlink.indexOf("/watch/"));vidID=vidID.replace("/watch/","")}else{vidID=vidlink.substring(vidlink.indexOf("/share/"));vidID=vidID.replace("/share/","")}vidlink="//play.vidyard.com/"+vidID;$("body").append('<div class="video_modal"><div class="video_container"><div class="close-modal-button"></div><iframe src="'+vidlink+'?autoplay=1" frameborder="0" allow="autoplay;" allowfullscreen webkitallowfullscreen oallowfullscreen></iframe></div><div class="faded-bg"></div></div>');
break;case "rawmp4":$("body").append('<div class="video_modal"><div class="video_container"><div class="close-modal-button"></div><video style="width:100%;max-height: 900px;" src="'+vidlink+'" controls autoplay></video></div><div class="faded-bg"></div></div>');break;default:window.open(vidlink)}$(".video_container").fadeIn(400);$(".faded-bg").fadeIn(400);resizeModal()}});$(window).on("resize",function(){resizeModal()});$(".fill-darkgrey1").each(function(i,obj){var hrefurl=$(this).attr("href");var img_contact=
$(this).parents(".field-content").find(".image img");if(img_contact.length){img_contact.addClass("cta_contact_img");img_contact.click(function(){window.open(hrefurl,"_blank")})}});var timer;$.fn.hidePopup=function(){timer=setTimeout(function(){var mouseOnPopup=$("#subs_map_tooltip:hover").length;var mouseOnPin=$(".tooltip_hover:hover").length;if(!mouseOnPopup&&!mouseOnPin)$("#subs_map_tooltip").stop().hide();else $("#subs_map_tooltip").hidePopup()},2E3);return this};$.fn.checkLang=function(){var sitelang=
"en";if($("body").hasClass("i18n-fr"))sitelang="fr";else if($("body").hasClass("i18n-es"))sitelang="es";else if($("body").hasClass("i18n-de"))sitelang="de";else if($("body").hasClass("i18n-nl"))sitelang="nl";else if($("body").hasClass("i18n-it"))sitelang="it";return sitelang};if($(".sub_img_wrap").length){$("body").append("<div style='position:absolute;' id='subs_map_tooltip'></div>");var page_language=$("body").checkLang();var linkLabels={en:"Visit Website",fr:"Site Web",es:"Visitar el sitio",it:"Sito Web",
de:"Webseite",nl:"Visit Website"};var TooltipInfos={us:{url:"<a href='https://www.esker.com/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>U.S Headquarters</b><br>Esker Inc.<br>1850 Deming Way<br>Suite 150<br>Middleton, WI 53562<br><br><b>Denver Office</b><br>Esker Inc<br>Suite 325<br>Building 4<br>Denver West Business Park<br>1526 Cole Boulevard<br>Lakewood, CO 80401"},ca:{url:"<a href='https://www.eskersolution.ca/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Solution Canada Inc.</b><br>630 Ren\u00e9-L\u00e9vesque Blvd West<br>Suite 2800<br>Montr\u00e9al, Qu\u00e9bec Canada<br>H3B 1S6"},
ar:{url:"<a href='https://www.esker.es/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Latin America</b><br>Macha\u00edn 4289 Piso 1<br>Ciudad Aut\u00f3noma de Buenos Aires<br>Argentina<br>C1430DYY"},uk:{url:"<a href='https://www.esker.co.uk/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Ltd.</b><br>Unit 1 Stoney Cross Industrial Estate<br>Station Road<br>Spondon - Derby<br>DE21 7RX<br>United Kingdom"},fr:{url:"<a href='https://www.esker.fr/' target='_blank'>"+
linkLabels[page_language]+"</a>",adress:"<b>Esker SA</b><br>113 Boulevard de la Bataille de Stalingrad<br>69100 Villeurbanne<br>France"},es:{url:"<a href='https://www.esker.es/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Ib\u00e9rica, S.L.</b><br>Calle Chile 8, oficina 206<br>28290 Las Rozas de Madrid<br>Espa\u00f1a"},de:{url:"<a href='https://www.esker.de/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Software GmbH</b><br>Dornacher Str. 3a<br>D-85622 Feldkirchen<br>Deutschland<br><br><b>Esker EDI services</b><br>Calor-Emag-Stra\u00dfe 3<br>40878 Ratingen<br>Deutschland"},
it:{url:"<a href='https://www.esker.it/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Italia Srl</b><br>Via Guido Gozzano, 45<br>21052 Busto Arsizio (VA)<br>Italia"},nl:{url:"<a href='https://www.esker.co.nl/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Netherlands</b>"},be:{url:"<a href='https://www.esker.be/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Belgium</b>"},sg:{url:"<a href='https://www.esker.com.sg/' target='_blank'>"+
linkLabels[page_language]+"</a>",adress:"<b>Esker Document Automation Asia Pte Ltd</b><br>47 Scotts Road<br>#05-04<br>Goldbell Towers<br>Singapore 228233"},au:{url:"<a href='https://www.esker.com.au/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Australia Pty Ltd</b><br>Suite 1502, Level 15<br>227 Elizabeth Street<br>Sydney NSW 2000<br>Australia"},hk:{url:"<a href='https://www.esker.com.sg/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Document Automation (HK) Limited</b><br>Units 24027-7 24th Floor<br>Berkshire House No.25<br>Westland Rd Quarry Bay,<br>Hong Kong"},
my:{url:"<a href='https://www.esker.com.my/' target='_blank'>"+linkLabels[page_language]+"</a>",adress:"<b>Esker Document Automation (M) Sdn. Bhd</b><br>16-12 Q Sentral<br>Jalan Stesen Sentral 2<br>50470 Kuala Lumpur<br>Malaysia"}}}$(".tooltip_hover").mouseover(function(e){clearTimeout(timer);$("#subs_map_tooltip").stop().hide();var subid=$(this).attr("subid");var tooltipAdress=TooltipInfos[subid].adress;var tooltipUrl=TooltipInfos[subid].url;mouseX=e.pageX;mouseY=e.pageY;$("#subs_map_tooltip").css({"left":mouseX,
"top":mouseY});$("#subs_map_tooltip").html("<p>"+tooltipAdress+"</p><p>"+tooltipUrl+"</p>");$("#subs_map_tooltip").fadeIn();$("#subs_map_tooltip").hidePopup()})});$(document).on("closeFormPopup",function(e){$(".form_container").fadeOut(400);$(".faded-bg").fadeOut(400);setTimeout(function(){$(".form_popup").remove()},400)});$(document).on("click",".close_form_popup, .faded-bg, .form_back_button",function(){$(document).trigger("closeFormPopup")});$(document).keyup(function(e){if(e.keyCode===27&&$(".form_popup").length)$(document).trigger("closeFormPopup")});
$(document).on("mouseenter mouseleave",".form_container",function(){$(".close_form_popup").toggleClass("cross-display")});$(document).on("click",".openform",function(e){e.preventDefault();var lang="en";var url=window.location.href;if(url.indexOf(".fr")!==-1)lang="fr";var formlink="https://cloud.esker.fr/penv/investors/newsletter_invest_form.php?lang="+lang;if($(".form_popup").length){$(".form_container").fadeIn(400);$(".faded-bg").fadeIn(400)}else{$("body").append('<div class="form_popup"><div class="form_container"><div class="close_form_popup"></div><iframe src="'+
formlink+'" frameborder="0" scrolling="no"></iframe></div><div class="faded-bg"></div></div>');$(".form_container").fadeIn(400);$(".faded-bg").fadeIn(400)}});$(document).on("click",".openseminar",function(e){e.preventDefault();var lang="en";var url=window.location.href;if(url.indexOf(".fr")!==-1)lang="fr";var formlink="https://cloud.esker.fr/penv/investors/newsletter_invest_form.php?variant=seminar&lang="+lang;if($(".form_popup").length){$(".form_container").fadeIn(400);$(".faded-bg").fadeIn(400)}else{$("body").append('<div class="form_popup"><div class="form_container"><div class="close_form_popup"></div><iframe src="'+
formlink+'" frameborder="0" scrolling="no"></iframe></div><div class="faded-bg"></div></div>');$(".form_container").fadeIn(400);$(".faded-bg").fadeIn(400)}});$(document).ready(function(){var url=window.location.href;if(url.indexOf(".fr")!==-1&&$(".flag_switch_language").length>0)$(".flag_border_fr").css("visibility","visible");if(url.indexOf(".de")!==-1&&$(".flag_switch_language").length>0)$(".flag_border_de").css("visibility","visible");else if(url.indexOf(".com")!==-1&&$(".flag_switch_language").length>
0)$(".flag_border_us").css("visibility","visible");if($("#tv-medium-widget").length>0)if(url.indexOf(".fr")!==-1)new TradingView.MediumWidget({"container_id":"tv-medium-widget","symbols":[["Esker","SWB:EKE|1m"]],"greyText":"Cotations de prix par","gridLineColor":"#a5aeb6","fontColor":"#394a59","underLineColor":"#0098aa","trendLineColor":"#51626f","width":"480px","height":"300px","locale":"fr"});else new TradingView.MediumWidget({"container_id":"tv-medium-widget","symbols":[["Esker","SWB:EKE|1m"]],
"greyText":"Cotations de prix par","gridLineColor":"#a5aeb6","fontColor":"#394a59","underLineColor":"#0098aa","trendLineColor":"#51626f","width":"480px","height":"300px","locale":"en"})});$(window).on("resize",function(e){var winsize=$(window).width();if(winsize<670){var scaleRatio=winsize/670;$(".img_bg_wrap").css("transform","scale("+scaleRatio+")")}});$(document).ready(function(){if($(window).width()<=1E3){if($(".list_wrap").length===0){$(".diagedi_grp1").wrapAll('<div class="list_wrap" />');$(".diagedi_grp2").wrapAll('<div class="list_wrap" />');
$(".diagedi_grp3").wrapAll('<div class="list_wrap" />');$(".diagedi_grp4").wrapAll('<div class="list_wrap" />');$(".diagedi_grp5").wrapAll('<div class="list_wrap" />');$(".diagedi_grp6").wrapAll('<div class="list_wrap" />');$("h3").each(function(){$(this).find("br").replaceWith(" ")})}}else if($(".list_wrap").length)$(".list_wrap").each(function(){$(this).contents().unwrap()})});$(window).resize(function(){if($(window).width()<=1E3){if($(".list_wrap").length===0){$(".diagedi_grp1").wrapAll('<div class="list_wrap" />');
$(".diagedi_grp2").wrapAll('<div class="list_wrap" />');$(".diagedi_grp3").wrapAll('<div class="list_wrap" />');$(".diagedi_grp4").wrapAll('<div class="list_wrap" />');$(".diagedi_grp5").wrapAll('<div class="list_wrap" />');$(".diagedi_grp6").wrapAll('<div class="list_wrap" />')}}else if($(".list_wrap").length)$(".list_wrap").each(function(){$(this).contents().unwrap()})});$(document).ready(function(){if($(".milestones_container").length){var $carou_milestones=$(".milestones_container").flickity({imagesLoaded:true});
var flkty=$carou_milestones.data("flickity");var selectedIndex=flkty.selectedIndex;$(".milestones_container").parents(".views-row").attr("id","view_row_milestones");$carou_milestones.on("change.flickity",function(event,index){var slidecolor=$(".milestones_container .carousel-cell[data-index='"+index+"']").data("color");$("#view_row_milestones").css("background-color","#"+slidecolor);selectedIndex=flkty.selectedIndex})}});$(window).on("load",function(){if($(".milestones_container").length&&$(window).width()>=
850){var milestones=["1985","1991","1997","2001","2003","2007","2011","2013","2015","2017","2017","2018","2019","2020","2021"];$(document).find(".milestones_container .flickity-page-dots .dot").each(function(i){$(this).html(milestones[i])})}});$(document).ready(function(){if($(".industries_container").length){var $carou_indus=$(".industries_container").flickity({wrapAround:true,freeScroll:true,percentPosition:true,prevNextButtons:true,pageDots:false,imagesLoaded:true});var flkty=$carou_indus.data("flickity");
var selectedIndex=flkty.selectedIndex;$(".industries_container").parents(".views-row").attr("id","view_row_industry");$carou_indus.on("change.flickity",function(event,index){var slidebg=$(".industries_container .carousel-cell[data-index='"+index+"']").data("bgimage");$("#view_row_industry").css("background-image","url("+slidebg+")");selectedIndex=flkty.selectedIndex})}});$(window).on("load",function(){var slidebg=$(".industries_container .carousel-cell[data-index='0']").data("bgimage");$("#view_row_industry").css("background-image",
"url("+slidebg+")")});$(document).ready(function(){if($(".customer_spotlight_banner_video").length){$(".customer-testimony-header .view-content .views-field").css("position","relative");$(".customer-testimony-header .view-content .views-field").css("z-index","50");$(".customer-testimony-header").append("<div class='custo_spotlight_video_filter'></div>")}})})(jQuery);
function genFloatingBar(UniqueId,SingleCtaUrl,SingleCtaButtonText,SingleCtaImage,HtmlLevel1,HtmlLevel2){if(HtmlLevel2!="")var SinElmCss="";else var SinElmCss="fullheight";var bar_html='<div id="notification_wrapper">';bar_html+='<div id="notification_div">';if(SingleCtaUrl!="")bar_html+='<div id="notification_click_mask" onclick="location.href=\''+SingleCtaUrl+"'\"  ></div>";bar_html+='<div id="notification_col_container">';bar_html+='<div id="notification_col1">';if(SingleCtaImage!="")bar_html+=
'<img src="/sites/default/files/topbanners/'+SingleCtaImage+'" alt="">';bar_html+="</div>";bar_html+='<div id="notification_col2">';bar_html+='<span id="notification_level1" class="'+SinElmCss+'">'+HtmlLevel1+"</span>";if(HtmlLevel2!="")bar_html+='<span id="notification_level2">'+HtmlLevel2+"</span>";bar_html+="</div>";bar_html+='<div id="notification_col3">';if(SingleCtaUrl!="")bar_html+='<a href="'+SingleCtaUrl+'" target="_blank" class="notification_button">'+SingleCtaButtonText+"</a>";bar_html+=
"</div>";bar_html+="</div>";bar_html+='<span id="close_notification" data-bannerid="'+UniqueId+'"><img src="/sites/default/files/topbanners/close-button.png" alt="Close"></span>';bar_html+="</div>";bar_html+="</div>";if(getCookie(UniqueId+"_closed")!="yes")jQuery(".header").prepend(bar_html);else;}
function genFloatingAD(UniqueId,SingleCtaUrl,SingleCtaButtonText,SingleCtaImage,AdTitle,HtmlLevel1,HtmlLevel2,pop,expiration){expiration=expiration===void 0?"":expiration;var expired=false;var DateregEx=/^\d{4}-\d{2}-\d{2}$/;if(expiration.match(DateregEx))if(new Date>=new Date(expiration))expired=true;if(!expired){var bar_html='<div id="floatingad_wrapper" pop="'+pop+'">';bar_html+='<div id="floatingad_div">';if(SingleCtaUrl!="")bar_html+='<div id="floatingad_click_mask" onclick="location.href=\''+
SingleCtaUrl+"'\"  ></div>";bar_html+='<div id="floatingad_col_container">';bar_html+='<div id="floatingad_col1">';bar_html+='<img src="/sites/default/files/floatingads/'+SingleCtaImage+'" alt="">';bar_html+="</div>";bar_html+='<div id="floatingad_col2">';bar_html+="<h2>"+AdTitle+"</h2>";bar_html+='<p id="floatingad_level1">'+HtmlLevel1+"</p>";if(SingleCtaUrl!="")bar_html+='<a href="'+SingleCtaUrl+'" target="_blank" class="floatingad_button">'+SingleCtaButtonText+"</a>";if(HtmlLevel2!="")bar_html+=
'<p id="floatingad_level2">'+HtmlLevel2+"</p>";bar_html+="</div>";bar_html+="</div>";bar_html+='<span id="close_floatingad" data-bannerid="'+UniqueId+'"></span>';bar_html+="</div>";bar_html+="</div>";if(getCookie(UniqueId+"_closed")!="yes"||UniqueId=="peppol1")jQuery(".header").prepend(bar_html)}}
jQuery(document).ready(function(){if(jQuery("#notification_wrapper").length){jQuery("#notification_div").show();jQuery("#close_notification, #close_link").click(function(){jQuery("#notification_div").hide();setCookie(jQuery(this).attr("data-bannerid")+"_closed","yes",365)})}if(jQuery("#floatingad_wrapper").length){var pop=jQuery("#floatingad_wrapper").attr("pop");if(pop=="scroll")jQuery(window).scroll(function(){jQuery("#floatingad_div").delay(500).slideDown(300)});else jQuery("#floatingad_div").delay(3E3).slideDown(300);
jQuery("#close_floatingad, #close_link").click(function(){jQuery("#floatingad_div").slideUp(300);setCookie(jQuery(this).attr("data-bannerid")+"_closed","yes",365)})}if(jQuery(".great-place-to-work").length)jQuery(window).on("scroll",function(){if(jQuery(document).scrollTop()>0)jQuery(".great-place-to-work").fadeOut();else jQuery(".great-place-to-work").fadeIn()});if(jQuery("#sliding-contact-trigger").length)jQuery("#sliding-contact-trigger").delay(2E3).queue(function(next){jQuery(this).addClass("movedButton");
next()});if(jQuery("#sliding-phone-trigger").length)jQuery("#sliding-phone-trigger").delay(2500).queue(function(next){jQuery(this).addClass("movedButton");next()});jQuery(document).on("click","#views-exposed-form-customers-list-panel-pane-1 .views-exposed-widget, #views-exposed-form-resources-landing-page-panel-pane-1 .views-exposed-widget",function(){var $list=jQuery(this).find("ul");$list.find("li").each(function(){if(jQuery(this).data("raw-value")=="All")jQuery(this).prependTo($list)})})});
function setCookie(cname,cvalue,exdays){var d=new Date;d.setTime(d.getTime()+exdays*24*60*60*1E3);var expires="expires="+d.toUTCString();document.cookie=cname+"="+cvalue+";"+expires+";path=/"}function getCookie(cname){var name=cname+"=";var decodedCookie=decodeURIComponent(document.cookie);var ca=decodedCookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" ")c=c.substring(1);if(c.indexOf(name)==0)return c.substring(name.length,c.length)}return""}
function gencarousel(content){var htmlstr="";var caroucss="";htmlstr+='<div class="carousel" >';var ctaid=0;for(var key in content){ctaid++;if(content[key][4]=="video"){htmlstr+='<div class="carousel-cell" style="background-image: url('+content[key][0]+') !important;">';htmlstr+='<a class="carousel_play_link overlayvideo" href="'+content[key][1]+'" target="_blank">';htmlstr+='<div class="carousel_play_button"></div>';htmlstr+='<div class="csl_title"><span class="csl_name">'+content[key][2]+"</span><br>"+
content[key][3]+"</div>";htmlstr+="</a>";htmlstr+="</div>"}else{htmlstr+='<div class="carousel-cell cta'+ctaid+'"><div class="csl_title">'+content[key][2]+'</div><a class="outline outline-white" href="'+content[key][1]+'" target="_blank">En savoir plus</a></div>';if(content[key][3].indexOf("https")!==-1)caroucss+=".cta"+ctaid+"{background-image:url('"+content[key][3]+"');}";else caroucss+=".cta"+ctaid+"{background-image:url('https://www.esker.com/sites/default/files/carousels/"+content[key][0]+"');}"}}htmlstr+=
"</div>";htmlstr+='<style type="text/css">';htmlstr+=caroucss;htmlstr+="</style>";document.write(htmlstr)};;
