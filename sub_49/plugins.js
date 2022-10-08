// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
/*! jRespond.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */
!function(a,b,c){"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=c:(a[b]=c,"function"==typeof define&&define.amd&&define(b,[],function(){return c}))}(this,"jRespond",function(a,b,c){"use strict";return function(a){var b=[],d=[],e=a,f="",g="",i=0,j=100,k=500,l=k,m=function(){var a=0;return a="number"!=typeof window.innerWidth?0!==document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth:window.innerWidth},n=function(a){if(a.length===c)o(a);else for(var b=0;b<a.length;b++)o(a[b])},o=function(a){var e=a.breakpoint,h=a.enter||c;b.push(a),d.push(!1),r(e)&&(h!==c&&h.call(null,{entering:f,exiting:g}),d[b.length-1]=!0)},p=function(){for(var a=[],e=[],h=0;h<b.length;h++){var i=b[h].breakpoint,j=b[h].enter||c,k=b[h].exit||c;"*"===i?(j!==c&&a.push(j),k!==c&&e.push(k)):r(i)?(j===c||d[h]||a.push(j),d[h]=!0):(k!==c&&d[h]&&e.push(k),d[h]=!1)}for(var l={entering:f,exiting:g},m=0;m<e.length;m++)e[m].call(null,l);for(var n=0;n<a.length;n++)a[n].call(null,l)},q=function(a){for(var b=!1,c=0;c<e.length;c++)if(a>=e[c].enter&&a<=e[c].exit){b=!0;break}b&&f!==e[c].label?(g=f,f=e[c].label,p()):b||""===f||(f="",p())},r=function(a){if("object"==typeof a){if(a.join().indexOf(f)>=0)return!0}else{if("*"===a)return!0;if("string"==typeof a&&f===a)return!0}},s=function(){var a=m();a!==i?(l=j,q(a)):l=k,i=a,setTimeout(s,l)};return s(),{addFunc:function(a){n(a)},getBreakpoint:function(){return f}}}}(this,this.document));

/** fix ipad zoom bug when rotating from portrait to landcape */
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
        document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
        }, false);
    }
}


/** Jquery tap plugin */
!function(r,t){"use strict";var d=t.support.touch=!!("ontouchstart"in window||window.DocumentTouch&&r instanceof DocumentTouch),e="._tap",i="tap",f=40,l=400,a="clientX clientY screenX screenY pageX pageY".split(" "),s=function(n,e){var c;return c=Array.prototype.indexOf?n.indexOf(e):t.inArray(e,n)},n={$el:null,x:0,y:0,count:0,cancel:!1,start:0},u=function(o,i){var n=i.originalEvent,c=t.Event(n),r=n.changedTouches?n.changedTouches[0]:n;c.type=o;for(var e=0,u=a.length;u>e;e++)c[a[e]]=r[a[e]];return c},g=function(t){var o=t.originalEvent,e=t.changedTouches?t.changedTouches[0]:o.changedTouches[0],i=Math.abs(e.pageX-n.x),a=Math.abs(e.pageY-n.y),r=Math.max(i,a);return Date.now()-n.start<l&&f>r&&!n.cancel&&1===n.count&&c.isTracking},c={isEnabled:!1,isTracking:!1,enable:function(){return this.isEnabled?this:(this.isEnabled=!0,t(r.body).on("touchstart"+e,this.onTouchStart).on("touchend"+e,this.onTouchEnd).on("touchcancel"+e,this.onTouchCancel),this)},disable:function(){return this.isEnabled?(this.isEnabled=!1,t(r.body).off("touchstart"+e,this.onTouchStart).off("touchend"+e,this.onTouchEnd).off("touchcancel"+e,this.onTouchCancel),this):this},onTouchStart:function(e){var o=e.originalEvent.touches;if(n.count=o.length,!c.isTracking){c.isTracking=!0;var i=o[0];n.cancel=!1,n.start=Date.now(),n.$el=t(e.target),n.x=i.pageX,n.y=i.pageY}},onTouchEnd:function(t){g(t)&&n.$el.trigger(u(i,t)),c.onTouchCancel(t)},onTouchCancel:function(){c.isTracking=!1,n.cancel=!0}};if(t.event.special[i]={setup:function(){c.enable()}},!d){var o=[],h=function(n){var e=n.originalEvent;if(!(n.isTrigger||s(o,e)>=0)){o.length>3&&o.splice(0,o.length-3),o.push(e);var c=u(i,n);t(n.target).trigger(c)}};t.event.special[i]={setup:function(){t(this).on("click"+e,h)},teardown:function(){t(this).off("click"+e,h)}}}}(document,jQuery);
/*
 * Swiper Hash Navigation 1.0
 * Plugin for Swiper 2.3+
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: November 2, 2013
*/
Swiper.prototype.plugins.hashNav = function(swiper, params) {
    var isH = swiper.params.mode == 'horizontal';
    if(!params) return;

    function updateHash(internal){
        var newHash = swiper.activeSlide().getAttribute('data-hash')
        if (!newHash) newHash = '';
        document.location.hash = newHash;
    }
    function swipeToHash(e){
        var hash = document.location.hash;
        if (!hash) return;
        var hash = hash.replace('#','');
        var speed = e ? swiper.params.speed : 0;
        for (var i=0; i<swiper.slides.length; i++) {
            var slide = swiper.slides[i];
            var slideHash = slide.getAttribute('data-hash');
            if (slideHash == hash && slide.getData('looped')!==true) {
                    var index = slide.index()
                    if (swiper.params.loop) index = index - swiper.loopedSlides;
                    swiper.swipeTo(index, speed);
            }
        }
    }

    //Plugin Hooks
    var hooks = {
        onInit: function() {
            swipeToHash()
        },
        onSwiperCreated : function(args){
            swipeToHash()
        },
        onSlideChangeStart: function(){
            updateHash(true)
        },
        onSwipeReset: function(){
            updateHash(true)
        }
    }
    return hooks
}
