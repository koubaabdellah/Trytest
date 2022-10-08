/*!
  * Bootstrap v4.5.0 (https://getbootstrap.com/)
  * Copyright 2011-2020 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery")):"function"==typeof define&&define.amd?define(["exports","jquery"],e):e((t=t||self).bootstrap={},t.jQuery)}(this,(function(t,e){"use strict";function n(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e;function a(t){var n=this,i=!1;return e(this).one(l.TRANSITION_END,(function(){i=!0})),setTimeout((function(){i||l.triggerTransitionEnd(n)}),t),this}var l={TRANSITION_END:"bsTransitionEnd",getUID:function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");if(!e||"#"===e){var n=t.getAttribute("href");e=n&&"#"!==n?n.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var n=e(t).css("transition-duration"),i=e(t).css("transition-delay"),o=parseFloat(n),r=parseFloat(i);return o||r?(n=n.split(",")[0],i=i.split(",")[0],1e3*(parseFloat(n)+parseFloat(i))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){e(t).trigger("transitionend")},supportsTransitionEnd:function(){return Boolean("transitionend")},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,n){for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){var o=n[i],r=e[i],s=r&&l.isElement(r)?"element":null===(a=r)||"undefined"==typeof a?""+a:{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase();if(!new RegExp(o).test(s))throw new Error(t.toUpperCase()+': Option "'+i+'" provided type "'+s+'" but expected type "'+o+'".')}var a},findShadowRoot:function(t){if(!document.documentElement.attachShadow)return null;if("function"==typeof t.getRootNode){var e=t.getRootNode();return e instanceof ShadowRoot?e:null}return t instanceof ShadowRoot?t:t.parentNode?l.findShadowRoot(t.parentNode):null},jQueryDetection:function(){if("undefined"==typeof e)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=e.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||t[0]>=4)throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};l.jQueryDetection(),e.fn.emulateTransitionEnd=a,e.event.special[l.TRANSITION_END]={bindType:"transitionend",delegateType:"transitionend",handle:function(t){if(e(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}};var c="alert",u=e.fn[c],h=function(){function t(t){this._element=t}var n=t.prototype;return n.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},n.dispose=function(){e.removeData(this._element,"bs.alert"),this._element=null},n._getRootElement=function(t){var n=l.getSelectorFromElement(t),i=!1;return n&&(i=document.querySelector(n)),i||(i=e(t).closest(".alert")[0]),i},n._triggerCloseEvent=function(t){var n=e.Event("close.bs.alert");return e(t).trigger(n),n},n._removeElement=function(t){var n=this;if(e(t).removeClass("show"),e(t).hasClass("fade")){var i=l.getTransitionDurationFromElement(t);e(t).one(l.TRANSITION_END,(function(e){return n._destroyElement(t,e)})).emulateTransitionEnd(i)}else this._destroyElement(t)},n._destroyElement=function(t){e(t).detach().trigger("closed.bs.alert").remove()},t._jQueryInterface=function(n){return this.each((function(){var i=e(this),o=i.data("bs.alert");o||(o=new t(this),i.data("bs.alert",o)),"close"===n&&o[n](this)}))},t._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}}]),t}();e(document).on("click.bs.alert.data-api",'[data-dismiss="alert"]',h._handleDismiss(new h)),e.fn[c]=h._jQueryInterface,e.fn[c].Constructor=h,e.fn[c].noConflict=function(){return e.fn[c]=u,h._jQueryInterface};var f=e.fn.button,d=function(){function t(t){this._element=t}var n=t.prototype;return n.toggle=function(){var t=!0,n=!0,i=e(this._element).closest('[data-toggle="buttons"]')[0];if(i){var o=this._element.querySelector('input:not([type="hidden"])');if(o){if("radio"===o.type)if(o.checked&&this._element.classList.contains("active"))t=!1;else{var r=i.querySelector(".active");r&&e(r).removeClass("active")}t&&("checkbox"!==o.type&&"radio"!==o.type||(o.checked=!this._element.classList.contains("active")),e(o).trigger("change")),o.focus(),n=!1}}this._element.hasAttribute("disabled")||this._element.classList.contains("disabled")||(n&&this._element.setAttribute("aria-pressed",!this._element.classList.contains("active")),t&&e(this._element).toggleClass("active"))},n.dispose=function(){e.removeData(this._element,"bs.button"),this._element=null},t._jQueryInterface=function(n){return this.each((function(){var i=e(this).data("bs.button");i||(i=new t(this),e(this).data("bs.button",i)),"toggle"===n&&i[n]()}))},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}}]),t}();e(document).on("click.bs.button.data-api",'[data-toggle^="button"]',(function(t){var n=t.target,i=n;if(e(n).hasClass("btn")||(n=e(n).closest(".btn")[0]),!n||n.hasAttribute("disabled")||n.classList.contains("disabled"))t.preventDefault();else{var o=n.querySelector('input:not([type="hidden"])');if(o&&(o.hasAttribute("disabled")||o.classList.contains("disabled")))return void t.preventDefault();"LABEL"===i.tagName&&o&&"checkbox"===o.type&&t.preventDefault(),d._jQueryInterface.call(e(n),"toggle")}})).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',(function(t){var n=e(t.target).closest(".btn")[0];e(n).toggleClass("focus",/^focus(in)?$/.test(t.type))})),e(window).on("load.bs.button.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')),e=0,n=t.length;e<n;e++){var i=t[e],o=i.querySelector('input:not([type="hidden"])');o.checked||o.hasAttribute("checked")?i.classList.add("active"):i.classList.remove("active")}for(var r=0,s=(t=[].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length;r<s;r++){var a=t[r];"true"===a.getAttribute("aria-pressed")?a.classList.add("active"):a.classList.remove("active")}})),e.fn.button=d._jQueryInterface,e.fn.button.Constructor=d,e.fn.button.noConflict=function(){return e.fn.button=f,d._jQueryInterface};var p="carousel",m=".bs.carousel",g=e.fn[p],v={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},_={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},b={TOUCH:"touch",PEN:"pen"},y=function(){function t(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(".carousel-indicators"),this._touchSupported="ontouchstart"in document.documentElement||navigator.maxTouchPoints>0,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var n=t.prototype;return n.next=function(){this._isSliding||this._slide("next")},n.nextWhenVisible=function(){!document.hidden&&e(this._element).is(":visible")&&"hidden"!==e(this._element).css("visibility")&&this.next()},n.prev=function(){this._isSliding||this._slide("prev")},n.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(".carousel-item-next, .carousel-item-prev")&&(l.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},n.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},n.to=function(t){var n=this;this._activeElement=this._element.querySelector(".active.carousel-item");var i=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)e(this._element).one("slid.bs.carousel",(function(){return n.to(t)}));else{if(i===t)return this.pause(),void this.cycle();var o=t>i?"next":"prev";this._slide(o,this._items[t])}},n.dispose=function(){e(this._element).off(m),e.removeData(this._element,"bs.carousel"),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},n._getConfig=function(t){return t=s(s({},v),t),l.typeCheckConfig(p,t,_),t},n._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;this.touchDeltaX=0,e>0&&this.prev(),e<0&&this.next()}},n._addEventListeners=function(){var t=this;this._config.keyboard&&e(this._element).on("keydown.bs.carousel",(function(e){return t._keydown(e)})),"hover"===this._config.pause&&e(this._element).on("mouseenter.bs.carousel",(function(e){return t.pause(e)})).on("mouseleave.bs.carousel",(function(e){return t.cycle(e)})),this._config.touch&&this._addTouchEventListeners()},n._addTouchEventListeners=function(){var t=this;if(this._touchSupported){var n=function(e){t._pointerEvent&&b[e.originalEvent.pointerType.toUpperCase()]?t.touchStartX=e.originalEvent.clientX:t._pointerEvent||(t.touchStartX=e.originalEvent.touches[0].clientX)},i=function(e){t._pointerEvent&&b[e.originalEvent.pointerType.toUpperCase()]&&(t.touchDeltaX=e.originalEvent.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout((function(e){return t.cycle(e)}),500+t._config.interval))};e(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel",(function(t){return t.preventDefault()})),this._pointerEvent?(e(this._element).on("pointerdown.bs.carousel",(function(t){return n(t)})),e(this._element).on("pointerup.bs.carousel",(function(t){return i(t)})),this._element.classList.add("pointer-event")):(e(this._element).on("touchstart.bs.carousel",(function(t){return n(t)})),e(this._element).on("touchmove.bs.carousel",(function(e){return function(e){e.originalEvent.touches&&e.originalEvent.touches.length>1?t.touchDeltaX=0:t.touchDeltaX=e.originalEvent.touches[0].clientX-t.touchStartX}(e)})),e(this._element).on("touchend.bs.carousel",(function(t){return i(t)})))}},n._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},n._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(".carousel-item")):[],this._items.indexOf(t)},n._getItemByDirection=function(t,e){var n="next"===t,i="prev"===t,o=this._getItemIndex(e),r=this._items.length-1;if((i&&0===o||n&&o===r)&&!this._config.wrap)return e;var s=(o+("prev"===t?-1:1))%this._items.length;return-1===s?this._items[this._items.length-1]:this._items[s]},n._triggerSlideEvent=function(t,n){var i=this._getItemIndex(t),o=this._getItemIndex(this._element.querySelector(".active.carousel-item")),r=e.Event("slide.bs.carousel",{relatedTarget:t,direction:n,from:o,to:i});return e(this._element).trigger(r),r},n._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var n=[].slice.call(this._indicatorsElement.querySelectorAll(".active"));e(n).removeClass("active");var i=this._indicatorsElement.children[this._getItemIndex(t)];i&&e(i).addClass("active")}},n._slide=function(t,n){var i,o,r,s=this,a=this._element.querySelector(".active.carousel-item"),c=this._getItemIndex(a),u=n||a&&this._getItemByDirection(t,a),h=this._getItemIndex(u),f=Boolean(this._interval);if("next"===t?(i="carousel-item-left",o="carousel-item-next",r="left"):(i="carousel-item-right",o="carousel-item-prev",r="right"),u&&e(u).hasClass("active"))this._isSliding=!1;else if(!this._triggerSlideEvent(u,r).isDefaultPrevented()&&a&&u){this._isSliding=!0,f&&this.pause(),this._setActiveIndicatorElement(u);var d=e.Event("slid.bs.carousel",{relatedTarget:u,direction:r,from:c,to:h});if(e(this._element).hasClass("slide")){e(u).addClass(o),l.reflow(u),e(a).addClass(i),e(u).addClass(i);var p=parseInt(u.getAttribute("data-interval"),10);p?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=p):this._config.interval=this._config.defaultInterval||this._config.interval;var m=l.getTransitionDurationFromElement(a);e(a).one(l.TRANSITION_END,(function(){e(u).removeClass(i+" "+o).addClass("active"),e(a).removeClass("active "+o+" "+i),s._isSliding=!1,setTimeout((function(){return e(s._element).trigger(d)}),0)})).emulateTransitionEnd(m)}else e(a).removeClass("active"),e(u).addClass("active"),this._isSliding=!1,e(this._element).trigger(d);f&&this.cycle()}},t._jQueryInterface=function(n){return this.each((function(){var i=e(this).data("bs.carousel"),o=s(s({},v),e(this).data());"object"==typeof n&&(o=s(s({},o),n));var r="string"==typeof n?n:o.slide;if(i||(i=new t(this,o),e(this).data("bs.carousel",i)),"number"==typeof n)i.to(n);else if("string"==typeof r){if("undefined"==typeof i[r])throw new TypeError('No method named "'+r+'"');i[r]()}else o.interval&&o.ride&&(i.pause(),i.cycle())}))},t._dataApiClickHandler=function(n){var i=l.getSelectorFromElement(this);if(i){var o=e(i)[0];if(o&&e(o).hasClass("carousel")){var r=s(s({},e(o).data()),e(this).data()),a=this.getAttribute("data-slide-to");a&&(r.interval=!1),t._jQueryInterface.call(e(o),r),a&&e(o).data("bs.carousel").to(a),n.preventDefault()}}},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"Default",get:function(){return v}}]),t}();e(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",y._dataApiClickHandler),e(window).on("load.bs.carousel.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-ride="carousel"]')),n=0,i=t.length;n<i;n++){var o=e(t[n]);y._jQueryInterface.call(o,o.data())}})),e.fn[p]=y._jQueryInterface,e.fn[p].Constructor=y,e.fn[p].noConflict=function(){return e.fn[p]=g,y._jQueryInterface};var w="collapse",E=e.fn[w],T={toggle:!0,parent:""},C={toggle:"boolean",parent:"(string|element)"},S=function(){function t(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var n=[].slice.call(document.querySelectorAll('[data-toggle="collapse"]')),i=0,o=n.length;i<o;i++){var r=n[i],s=l.getSelectorFromElement(r),a=[].slice.call(document.querySelectorAll(s)).filter((function(e){return e===t}));null!==s&&a.length>0&&(this._selector=s,this._triggerArray.push(r))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var n=t.prototype;return n.toggle=function(){e(this._element).hasClass("show")?this.hide():this.show()},n.show=function(){var n,i,o=this;if(!this._isTransitioning&&!e(this._element).hasClass("show")&&(this._parent&&0===(n=[].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((function(t){return"string"==typeof o._config.parent?t.getAttribute("data-parent")===o._config.parent:t.classList.contains("collapse")}))).length&&(n=null),!(n&&(i=e(n).not(this._selector).data("bs.collapse"))&&i._isTransitioning))){var r=e.Event("show.bs.collapse");if(e(this._element).trigger(r),!r.isDefaultPrevented()){n&&(t._jQueryInterface.call(e(n).not(this._selector),"hide"),i||e(n).data("bs.collapse",null));var s=this._getDimension();e(this._element).removeClass("collapse").addClass("collapsing"),this._element.style[s]=0,this._triggerArray.length&&e(this._triggerArray).removeClass("collapsed").attr("aria-expanded",!0),this.setTransitioning(!0);var a="scroll"+(s[0].toUpperCase()+s.slice(1)),c=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,(function(){e(o._element).removeClass("collapsing").addClass("collapse show"),o._element.style[s]="",o.setTransitioning(!1),e(o._element).trigger("shown.bs.collapse")})).emulateTransitionEnd(c),this._element.style[s]=this._element[a]+"px"}}},n.hide=function(){var t=this;if(!this._isTransitioning&&e(this._element).hasClass("show")){var n=e.Event("hide.bs.collapse");if(e(this._element).trigger(n),!n.isDefaultPrevented()){var i=this._getDimension();this._element.style[i]=this._element.getBoundingClientRect()[i]+"px",l.reflow(this._element),e(this._element).addClass("collapsing").removeClass("collapse show");var o=this._triggerArray.length;if(o>0)for(var r=0;r<o;r++){var s=this._triggerArray[r],a=l.getSelectorFromElement(s);if(null!==a)e([].slice.call(document.querySelectorAll(a))).hasClass("show")||e(s).addClass("collapsed").attr("aria-expanded",!1)}this.setTransitioning(!0);this._element.style[i]="";var c=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,(function(){t.setTransitioning(!1),e(t._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")})).emulateTransitionEnd(c)}}},n.setTransitioning=function(t){this._isTransitioning=t},n.dispose=function(){e.removeData(this._element,"bs.collapse"),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},n._getConfig=function(t){return(t=s(s({},T),t)).toggle=Boolean(t.toggle),l.typeCheckConfig(w,t,C),t},n._getDimension=function(){return e(this._element).hasClass("width")?"width":"height"},n._getParent=function(){var n,i=this;l.isElement(this._config.parent)?(n=this._config.parent,"undefined"!=typeof this._config.parent.jquery&&(n=this._config.parent[0])):n=document.querySelector(this._config.parent);var o='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',r=[].slice.call(n.querySelectorAll(o));return e(r).each((function(e,n){i._addAriaAndCollapsedClass(t._getTargetFromElement(n),[n])})),n},n._addAriaAndCollapsedClass=function(t,n){var i=e(t).hasClass("show");n.length&&e(n).toggleClass("collapsed",!i).attr("aria-expanded",i)},t._getTargetFromElement=function(t){var e=l.getSelectorFromElement(t);return e?document.querySelector(e):null},t._jQueryInterface=function(n){return this.each((function(){var i=e(this),o=i.data("bs.collapse"),r=s(s(s({},T),i.data()),"object"==typeof n&&n?n:{});if(!o&&r.toggle&&"string"==typeof n&&/show|hide/.test(n)&&(r.toggle=!1),o||(o=new t(this,r),i.data("bs.collapse",o)),"string"==typeof n){if("undefined"==typeof o[n])throw new TypeError('No method named "'+n+'"');o[n]()}}))},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"Default",get:function(){return T}}]),t}();e(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',(function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var n=e(this),i=l.getSelectorFromElement(this),o=[].slice.call(document.querySelectorAll(i));e(o).each((function(){var t=e(this),i=t.data("bs.collapse")?"toggle":n.data();S._jQueryInterface.call(t,i)}))})),e.fn[w]=S._jQueryInterface,e.fn[w].Constructor=S,e.fn[w].noConflict=function(){return e.fn[w]=E,S._jQueryInterface};var D="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,k=function(){for(var t=["Edge","Trident","Firefox"],e=0;e<t.length;e+=1)if(D&&navigator.userAgent.indexOf(t[e])>=0)return 1;return 0}();var N=D&&window.Promise?function(t){var e=!1;return function(){e||(e=!0,window.Promise.resolve().then((function(){e=!1,t()})))}}:function(t){var e=!1;return function(){e||(e=!0,setTimeout((function(){e=!1,t()}),k))}};function O(t){return t&&"[object Function]"==={}.toString.call(t)}function A(t,e){if(1!==t.nodeType)return[];var n=t.ownerDocument.defaultView.getComputedStyle(t,null);return e?n[e]:n}function I(t){return"HTML"===t.nodeName?t:t.parentNode||t.host}function x(t){if(!t)return document.body;switch(t.nodeName){case"HTML":case"BODY":return t.ownerDocument.body;case"#document":return t.body}var e=A(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/(auto|scroll|overlay)/.test(n+o+i)?t:x(I(t))}function j(t){return t&&t.referenceNode?t.referenceNode:t}var L=D&&!(!window.MSInputMethodContext||!document.documentMode),P=D&&/MSIE 10/.test(navigator.userAgent);function F(t){return 11===t?L:10===t?P:L||P}function R(t){if(!t)return document.documentElement;for(var e=F(10)?document.body:null,n=t.offsetParent||null;n===e&&t.nextElementSibling;)n=(t=t.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&"BODY"!==i&&"HTML"!==i?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===A(n,"position")?R(n):n:t?t.ownerDocument.documentElement:document.documentElement}function M(t){return null!==t.parentNode?M(t.parentNode):t}function B(t,e){if(!(t&&t.nodeType&&e&&e.nodeType))return document.documentElement;var n=t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING,i=n?t:e,o=n?e:t,r=document.createRange();r.setStart(i,0),r.setEnd(o,0);var s,a,l=r.commonAncestorContainer;if(t!==l&&e!==l||i.contains(o))return"BODY"===(a=(s=l).nodeName)||"HTML"!==a&&R(s.firstElementChild)!==s?R(l):l;var c=M(t);return c.host?B(c.host,e):B(t,M(e).host)}function q(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n="top"===e?"scrollTop":"scrollLeft",i=t.nodeName;if("BODY"===i||"HTML"===i){var o=t.ownerDocument.documentElement,r=t.ownerDocument.scrollingElement||o;return r[n]}return t[n]}function H(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=q(e,"top"),o=q(e,"left"),r=n?-1:1;return t.top+=i*r,t.bottom+=i*r,t.left+=o*r,t.right+=o*r,t}function Q(t,e){var n="x"===e?"Left":"Top",i="Left"===n?"Right":"Bottom";return parseFloat(t["border"+n+"Width"],10)+parseFloat(t["border"+i+"Width"],10)}function W(t,e,n,i){return Math.max(e["offset"+t],e["scroll"+t],n["client"+t],n["offset"+t],n["scroll"+t],F(10)?parseInt(n["offset"+t])+parseInt(i["margin"+("Height"===t?"Top":"Left")])+parseInt(i["margin"+("Height"===t?"Bottom":"Right")]):0)}function U(t){var e=t.body,n=t.documentElement,i=F(10)&&getComputedStyle(n);return{height:W("Height",e,n,i),width:W("Width",e,n,i)}}var V=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Y=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),z=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t},X=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t};function K(t){return X({},t,{right:t.left+t.width,bottom:t.top+t.height})}function G(t){var e={};try{if(F(10)){e=t.getBoundingClientRect();var n=q(t,"top"),i=q(t,"left");e.top+=n,e.left+=i,e.bottom+=n,e.right+=i}else e=t.getBoundingClientRect()}catch(t){}var o={left:e.left,top:e.top,width:e.right-e.left,height:e.bottom-e.top},r="HTML"===t.nodeName?U(t.ownerDocument):{},s=r.width||t.clientWidth||o.width,a=r.height||t.clientHeight||o.height,l=t.offsetWidth-s,c=t.offsetHeight-a;if(l||c){var u=A(t);l-=Q(u,"x"),c-=Q(u,"y"),o.width-=l,o.height-=c}return K(o)}function $(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=F(10),o="HTML"===e.nodeName,r=G(t),s=G(e),a=x(t),l=A(e),c=parseFloat(l.borderTopWidth,10),u=parseFloat(l.borderLeftWidth,10);n&&o&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));var h=K({top:r.top-s.top-c,left:r.left-s.left-u,width:r.width,height:r.height});if(h.marginTop=0,h.marginLeft=0,!i&&o){var f=parseFloat(l.marginTop,10),d=parseFloat(l.marginLeft,10);h.top-=c-f,h.bottom-=c-f,h.left-=u-d,h.right-=u-d,h.marginTop=f,h.marginLeft=d}return(i&&!n?e.contains(a):e===a&&"BODY"!==a.nodeName)&&(h=H(h,e)),h}function J(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t.ownerDocument.documentElement,i=$(t,n),o=Math.max(n.clientWidth,window.innerWidth||0),r=Math.max(n.clientHeight,window.innerHeight||0),s=e?0:q(n),a=e?0:q(n,"left"),l={top:s-i.top+i.marginTop,left:a-i.left+i.marginLeft,width:o,height:r};return K(l)}function Z(t){var e=t.nodeName;if("BODY"===e||"HTML"===e)return!1;if("fixed"===A(t,"position"))return!0;var n=I(t);return!!n&&Z(n)}function tt(t){if(!t||!t.parentElement||F())return document.documentElement;for(var e=t.parentElement;e&&"none"===A(e,"transform");)e=e.parentElement;return e||document.documentElement}function et(t,e,n,i){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r={top:0,left:0},s=o?tt(t):B(t,j(e));if("viewport"===i)r=J(s,o);else{var a=void 0;"scrollParent"===i?"BODY"===(a=x(I(e))).nodeName&&(a=t.ownerDocument.documentElement):a="window"===i?t.ownerDocument.documentElement:i;var l=$(a,s,o);if("HTML"!==a.nodeName||Z(s))r=l;else{var c=U(t.ownerDocument),u=c.height,h=c.width;r.top+=l.top-l.marginTop,r.bottom=u+l.top,r.left+=l.left-l.marginLeft,r.right=h+l.left}}var f="number"==typeof(n=n||0);return r.left+=f?n:n.left||0,r.top+=f?n:n.top||0,r.right-=f?n:n.right||0,r.bottom-=f?n:n.bottom||0,r}function nt(t){return t.width*t.height}function it(t,e,n,i,o){var r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===t.indexOf("auto"))return t;var s=et(n,i,r,o),a={top:{width:s.width,height:e.top-s.top},right:{width:s.right-e.right,height:s.height},bottom:{width:s.width,height:s.bottom-e.bottom},left:{width:e.left-s.left,height:s.height}},l=Object.keys(a).map((function(t){return X({key:t},a[t],{area:nt(a[t])})})).sort((function(t,e){return e.area-t.area})),c=l.filter((function(t){var e=t.width,i=t.height;return e>=n.clientWidth&&i>=n.clientHeight})),u=c.length>0?c[0].key:l[0].key,h=t.split("-")[1];return u+(h?"-"+h:"")}function ot(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=i?tt(e):B(e,j(n));return $(n,o,i)}function rt(t){var e=t.ownerDocument.defaultView.getComputedStyle(t),n=parseFloat(e.marginTop||0)+parseFloat(e.marginBottom||0),i=parseFloat(e.marginLeft||0)+parseFloat(e.marginRight||0);return{width:t.offsetWidth+i,height:t.offsetHeight+n}}function st(t){var e={left:"right",right:"left",bottom:"top",top:"bottom"};return t.replace(/left|right|bottom|top/g,(function(t){return e[t]}))}function at(t,e,n){n=n.split("-")[0];var i=rt(t),o={width:i.width,height:i.height},r=-1!==["right","left"].indexOf(n),s=r?"top":"left",a=r?"left":"top",l=r?"height":"width",c=r?"width":"height";return o[s]=e[s]+e[l]/2-i[l]/2,o[a]=n===a?e[a]-i[c]:e[st(a)],o}function lt(t,e){return Array.prototype.find?t.find(e):t.filter(e)[0]}function ct(t,e,n){return(void 0===n?t:t.slice(0,function(t,e,n){if(Array.prototype.findIndex)return t.findIndex((function(t){return t[e]===n}));var i=lt(t,(function(t){return t[e]===n}));return t.indexOf(i)}(t,"name",n))).forEach((function(t){t.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=t.function||t.fn;t.enabled&&O(n)&&(e.offsets.popper=K(e.offsets.popper),e.offsets.reference=K(e.offsets.reference),e=n(e,t))})),e}function ut(){if(!this.state.isDestroyed){var t={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};t.offsets.reference=ot(this.state,this.popper,this.reference,this.options.positionFixed),t.placement=it(this.options.placement,t.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),t.originalPlacement=t.placement,t.positionFixed=this.options.positionFixed,t.offsets.popper=at(this.popper,t.offsets.reference,t.placement),t.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",t=ct(this.modifiers,t),this.state.isCreated?this.options.onUpdate(t):(this.state.isCreated=!0,this.options.onCreate(t))}}function ht(t,e){return t.some((function(t){var n=t.name;return t.enabled&&n===e}))}function ft(t){for(var e=[!1,"ms","Webkit","Moz","O"],n=t.charAt(0).toUpperCase()+t.slice(1),i=0;i<e.length;i++){var o=e[i],r=o?""+o+n:t;if("undefined"!=typeof document.body.style[r])return r}return null}function dt(){return this.state.isDestroyed=!0,ht(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[ft("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function pt(t){var e=t.ownerDocument;return e?e.defaultView:window}function mt(t,e,n,i){n.updateBound=i,pt(t).addEventListener("resize",n.updateBound,{passive:!0});var o=x(t);return function t(e,n,i,o){var r="BODY"===e.nodeName,s=r?e.ownerDocument.defaultView:e;s.addEventListener(n,i,{passive:!0}),r||t(x(s.parentNode),n,i,o),o.push(s)}(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function gt(){this.state.eventsEnabled||(this.state=mt(this.reference,this.options,this.state,this.scheduleUpdate))}function vt(){var t,e;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(t=this.reference,e=this.state,pt(t).removeEventListener("resize",e.updateBound),e.scrollParents.forEach((function(t){t.removeEventListener("scroll",e.updateBound)})),e.updateBound=null,e.scrollParents=[],e.scrollElement=null,e.eventsEnabled=!1,e))}function _t(t){return""!==t&&!isNaN(parseFloat(t))&&isFinite(t)}function bt(t,e){Object.keys(e).forEach((function(n){var i="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&_t(e[n])&&(i="px"),t.style[n]=e[n]+i}))}var yt=D&&/Firefox/i.test(navigator.userAgent);function wt(t,e,n){var i=lt(t,(function(t){return t.name===e})),o=!!i&&t.some((function(t){return t.name===n&&t.enabled&&t.order<i.order}));if(!o){var r="`"+e+"`",s="`"+n+"`";console.warn(s+" modifier is required by "+r+" modifier in order to work, be sure to include it before "+r+"!")}return o}var Et=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],Tt=Et.slice(3);function Ct(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Tt.indexOf(t),i=Tt.slice(n+1).concat(Tt.slice(0,n));return e?i.reverse():i}var St="flip",Dt="clockwise",kt="counterclockwise";function Nt(t,e,n,i){var o=[0,0],r=-1!==["right","left"].indexOf(i),s=t.split(/(\+|\-)/).map((function(t){return t.trim()})),a=s.indexOf(lt(s,(function(t){return-1!==t.search(/,|\s/)})));s[a]&&-1===s[a].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var l=/\s*,\s*|\s+/,c=-1!==a?[s.slice(0,a).concat([s[a].split(l)[0]]),[s[a].split(l)[1]].concat(s.slice(a+1))]:[s];return(c=c.map((function(t,i){var o=(1===i?!r:r)?"height":"width",s=!1;return t.reduce((function(t,e){return""===t[t.length-1]&&-1!==["+","-"].indexOf(e)?(t[t.length-1]=e,s=!0,t):s?(t[t.length-1]+=e,s=!1,t):t.concat(e)}),[]).map((function(t){return function(t,e,n,i){var o=t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+o[1],s=o[2];if(!r)return t;if(0===s.indexOf("%")){var a=void 0;switch(s){case"%p":a=n;break;case"%":case"%r":default:a=i}return K(a)[e]/100*r}if("vh"===s||"vw"===s){return("vh"===s?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*r}return r}(t,o,e,n)}))}))).forEach((function(t,e){t.forEach((function(n,i){_t(n)&&(o[e]+=n*("-"===t[i-1]?-1:1))}))})),o}var Ot={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(t){var e=t.placement,n=e.split("-")[0],i=e.split("-")[1];if(i){var o=t.offsets,r=o.reference,s=o.popper,a=-1!==["bottom","top"].indexOf(n),l=a?"left":"top",c=a?"width":"height",u={start:z({},l,r[l]),end:z({},l,r[l]+r[c]-s[c])};t.offsets.popper=X({},s,u[i])}return t}},offset:{order:200,enabled:!0,fn:function(t,e){var n=e.offset,i=t.placement,o=t.offsets,r=o.popper,s=o.reference,a=i.split("-")[0],l=void 0;return l=_t(+n)?[+n,0]:Nt(n,r,s,a),"left"===a?(r.top+=l[0],r.left-=l[1]):"right"===a?(r.top+=l[0],r.left+=l[1]):"top"===a?(r.left+=l[0],r.top-=l[1]):"bottom"===a&&(r.left+=l[0],r.top+=l[1]),t.popper=r,t},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(t,e){var n=e.boundariesElement||R(t.instance.popper);t.instance.reference===n&&(n=R(n));var i=ft("transform"),o=t.instance.popper.style,r=o.top,s=o.left,a=o[i];o.top="",o.left="",o[i]="";var l=et(t.instance.popper,t.instance.reference,e.padding,n,t.positionFixed);o.top=r,o.left=s,o[i]=a,e.boundaries=l;var c=e.priority,u=t.offsets.popper,h={primary:function(t){var n=u[t];return u[t]<l[t]&&!e.escapeWithReference&&(n=Math.max(u[t],l[t])),z({},t,n)},secondary:function(t){var n="right"===t?"left":"top",i=u[n];return u[t]>l[t]&&!e.escapeWithReference&&(i=Math.min(u[n],l[t]-("right"===t?u.width:u.height))),z({},n,i)}};return c.forEach((function(t){var e=-1!==["left","top"].indexOf(t)?"primary":"secondary";u=X({},u,h[e](t))})),t.offsets.popper=u,t},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(t){var e=t.offsets,n=e.popper,i=e.reference,o=t.placement.split("-")[0],r=Math.floor,s=-1!==["top","bottom"].indexOf(o),a=s?"right":"bottom",l=s?"left":"top",c=s?"width":"height";return n[a]<r(i[l])&&(t.offsets.popper[l]=r(i[l])-n[c]),n[l]>r(i[a])&&(t.offsets.popper[l]=r(i[a])),t}},arrow:{order:500,enabled:!0,fn:function(t,e){var n;if(!wt(t.instance.modifiers,"arrow","keepTogether"))return t;var i=e.element;if("string"==typeof i){if(!(i=t.instance.popper.querySelector(i)))return t}else if(!t.instance.popper.contains(i))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),t;var o=t.placement.split("-")[0],r=t.offsets,s=r.popper,a=r.reference,l=-1!==["left","right"].indexOf(o),c=l?"height":"width",u=l?"Top":"Left",h=u.toLowerCase(),f=l?"left":"top",d=l?"bottom":"right",p=rt(i)[c];a[d]-p<s[h]&&(t.offsets.popper[h]-=s[h]-(a[d]-p)),a[h]+p>s[d]&&(t.offsets.popper[h]+=a[h]+p-s[d]),t.offsets.popper=K(t.offsets.popper);var m=a[h]+a[c]/2-p/2,g=A(t.instance.popper),v=parseFloat(g["margin"+u],10),_=parseFloat(g["border"+u+"Width"],10),b=m-t.offsets.popper[h]-v-_;return b=Math.max(Math.min(s[c]-p,b),0),t.arrowElement=i,t.offsets.arrow=(z(n={},h,Math.round(b)),z(n,f,""),n),t},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(t,e){if(ht(t.instance.modifiers,"inner"))return t;if(t.flipped&&t.placement===t.originalPlacement)return t;var n=et(t.instance.popper,t.instance.reference,e.padding,e.boundariesElement,t.positionFixed),i=t.placement.split("-")[0],o=st(i),r=t.placement.split("-")[1]||"",s=[];switch(e.behavior){case St:s=[i,o];break;case Dt:s=Ct(i);break;case kt:s=Ct(i,!0);break;default:s=e.behavior}return s.forEach((function(a,l){if(i!==a||s.length===l+1)return t;i=t.placement.split("-")[0],o=st(i);var c=t.offsets.popper,u=t.offsets.reference,h=Math.floor,f="left"===i&&h(c.right)>h(u.left)||"right"===i&&h(c.left)<h(u.right)||"top"===i&&h(c.bottom)>h(u.top)||"bottom"===i&&h(c.top)<h(u.bottom),d=h(c.left)<h(n.left),p=h(c.right)>h(n.right),m=h(c.top)<h(n.top),g=h(c.bottom)>h(n.bottom),v="left"===i&&d||"right"===i&&p||"top"===i&&m||"bottom"===i&&g,_=-1!==["top","bottom"].indexOf(i),b=!!e.flipVariations&&(_&&"start"===r&&d||_&&"end"===r&&p||!_&&"start"===r&&m||!_&&"end"===r&&g),y=!!e.flipVariationsByContent&&(_&&"start"===r&&p||_&&"end"===r&&d||!_&&"start"===r&&g||!_&&"end"===r&&m),w=b||y;(f||v||w)&&(t.flipped=!0,(f||v)&&(i=s[l+1]),w&&(r=function(t){return"end"===t?"start":"start"===t?"end":t}(r)),t.placement=i+(r?"-"+r:""),t.offsets.popper=X({},t.offsets.popper,at(t.instance.popper,t.offsets.reference,t.placement)),t=ct(t.instance.modifiers,t,"flip"))})),t},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(t){var e=t.placement,n=e.split("-")[0],i=t.offsets,o=i.popper,r=i.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return o[s?"left":"top"]=r[n]-(a?o[s?"width":"height"]:0),t.placement=st(e),t.offsets.popper=K(o),t}},hide:{order:800,enabled:!0,fn:function(t){if(!wt(t.instance.modifiers,"hide","preventOverflow"))return t;var e=t.offsets.reference,n=lt(t.instance.modifiers,(function(t){return"preventOverflow"===t.name})).boundaries;if(e.bottom<n.top||e.left>n.right||e.top>n.bottom||e.right<n.left){if(!0===t.hide)return t;t.hide=!0,t.attributes["x-out-of-boundaries"]=""}else{if(!1===t.hide)return t;t.hide=!1,t.attributes["x-out-of-boundaries"]=!1}return t}},computeStyle:{order:850,enabled:!0,fn:function(t,e){var n=e.x,i=e.y,o=t.offsets.popper,r=lt(t.instance.modifiers,(function(t){return"applyStyle"===t.name})).gpuAcceleration;void 0!==r&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s=void 0!==r?r:e.gpuAcceleration,a=R(t.instance.popper),l=G(a),c={position:o.position},u=function(t,e){var n=t.offsets,i=n.popper,o=n.reference,r=Math.round,s=Math.floor,a=function(t){return t},l=r(o.width),c=r(i.width),u=-1!==["left","right"].indexOf(t.placement),h=-1!==t.placement.indexOf("-"),f=e?u||h||l%2==c%2?r:s:a,d=e?r:a;return{left:f(l%2==1&&c%2==1&&!h&&e?i.left-1:i.left),top:d(i.top),bottom:d(i.bottom),right:f(i.right)}}(t,window.devicePixelRatio<2||!yt),h="bottom"===n?"top":"bottom",f="right"===i?"left":"right",d=ft("transform"),p=void 0,m=void 0;if(m="bottom"===h?"HTML"===a.nodeName?-a.clientHeight+u.bottom:-l.height+u.bottom:u.top,p="right"===f?"HTML"===a.nodeName?-a.clientWidth+u.right:-l.width+u.right:u.left,s&&d)c[d]="translate3d("+p+"px, "+m+"px, 0)",c[h]=0,c[f]=0,c.willChange="transform";else{var g="bottom"===h?-1:1,v="right"===f?-1:1;c[h]=m*g,c[f]=p*v,c.willChange=h+", "+f}var _={"x-placement":t.placement};return t.attributes=X({},_,t.attributes),t.styles=X({},c,t.styles),t.arrowStyles=X({},t.offsets.arrow,t.arrowStyles),t},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(t){var e,n;return bt(t.instance.popper,t.styles),e=t.instance.popper,n=t.attributes,Object.keys(n).forEach((function(t){!1!==n[t]?e.setAttribute(t,n[t]):e.removeAttribute(t)})),t.arrowElement&&Object.keys(t.arrowStyles).length&&bt(t.arrowElement,t.arrowStyles),t},onLoad:function(t,e,n,i,o){var r=ot(o,e,t,n.positionFixed),s=it(n.placement,r,e,t,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return e.setAttribute("x-placement",s),bt(e,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},At=function(){function t(e,n){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};V(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=N(this.update.bind(this)),this.options=X({},t.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(X({},t.Defaults.modifiers,o.modifiers)).forEach((function(e){i.options.modifiers[e]=X({},t.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(t){return X({name:t},i.options.modifiers[t])})).sort((function(t,e){return t.order-e.order})),this.modifiers.forEach((function(t){t.enabled&&O(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)})),this.update();var r=this.options.eventsEnabled;r&&this.enableEventListeners(),this.state.eventsEnabled=r}return Y(t,[{key:"update",value:function(){return ut.call(this)}},{key:"destroy",value:function(){return dt.call(this)}},{key:"enableEventListeners",value:function(){return gt.call(this)}},{key:"disableEventListeners",value:function(){return vt.call(this)}}]),t}();At.Utils=("undefined"!=typeof window?window:global).PopperUtils,At.placements=Et,At.Defaults=Ot;var It="dropdown",xt=e.fn[It],jt=new RegExp("38|40|27"),Lt={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic",popperConfig:null},Pt={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},Ft=function(){function t(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var n=t.prototype;return n.toggle=function(){if(!this._element.disabled&&!e(this._element).hasClass("disabled")){var n=e(this._menu).hasClass("show");t._clearMenus(),n||this.show(!0)}},n.show=function(n){if(void 0===n&&(n=!1),!(this._element.disabled||e(this._element).hasClass("disabled")||e(this._menu).hasClass("show"))){var i={relatedTarget:this._element},o=e.Event("show.bs.dropdown",i),r=t._getParentFromElement(this._element);if(e(r).trigger(o),!o.isDefaultPrevented()){if(!this._inNavbar&&n){if("undefined"==typeof At)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var s=this._element;"parent"===this._config.reference?s=r:l.isElement(this._config.reference)&&(s=this._config.reference,"undefined"!=typeof this._config.reference.jquery&&(s=this._config.reference[0])),"scrollParent"!==this._config.boundary&&e(r).addClass("position-static"),this._popper=new At(s,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===e(r).closest(".navbar-nav").length&&e(document.body).children().on("mouseover",null,e.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),e(this._menu).toggleClass("show"),e(r).toggleClass("show").trigger(e.Event("shown.bs.dropdown",i))}}},n.hide=function(){if(!this._element.disabled&&!e(this._element).hasClass("disabled")&&e(this._menu).hasClass("show")){var n={relatedTarget:this._element},i=e.Event("hide.bs.dropdown",n),o=t._getParentFromElement(this._element);e(o).trigger(i),i.isDefaultPrevented()||(this._popper&&this._popper.destroy(),e(this._menu).toggleClass("show"),e(o).toggleClass("show").trigger(e.Event("hidden.bs.dropdown",n)))}},n.dispose=function(){e.removeData(this._element,"bs.dropdown"),e(this._element).off(".bs.dropdown"),this._element=null,this._menu=null,null!==this._popper&&(this._popper.destroy(),this._popper=null)},n.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},n._addEventListeners=function(){var t=this;e(this._element).on("click.bs.dropdown",(function(e){e.preventDefault(),e.stopPropagation(),t.toggle()}))},n._getConfig=function(t){return t=s(s(s({},this.constructor.Default),e(this._element).data()),t),l.typeCheckConfig(It,t,this.constructor.DefaultType),t},n._getMenuElement=function(){if(!this._menu){var e=t._getParentFromElement(this._element);e&&(this._menu=e.querySelector(".dropdown-menu"))}return this._menu},n._getPlacement=function(){var t=e(this._element.parentNode),n="bottom-start";return t.hasClass("dropup")?n=e(this._menu).hasClass("dropdown-menu-right")?"top-end":"top-start":t.hasClass("dropright")?n="right-start":t.hasClass("dropleft")?n="left-start":e(this._menu).hasClass("dropdown-menu-right")&&(n="bottom-end"),n},n._detectNavbar=function(){return e(this._element).closest(".navbar").length>0},n._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=s(s({},e.offsets),t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},n._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(t.modifiers.applyStyle={enabled:!1}),s(s({},t),this._config.popperConfig)},t._jQueryInterface=function(n){return this.each((function(){var i=e(this).data("bs.dropdown");if(i||(i=new t(this,"object"==typeof n?n:null),e(this).data("bs.dropdown",i)),"string"==typeof n){if("undefined"==typeof i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},t._clearMenus=function(n){if(!n||3!==n.which&&("keyup"!==n.type||9===n.which))for(var i=[].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')),o=0,r=i.length;o<r;o++){var s=t._getParentFromElement(i[o]),a=e(i[o]).data("bs.dropdown"),l={relatedTarget:i[o]};if(n&&"click"===n.type&&(l.clickEvent=n),a){var c=a._menu;if(e(s).hasClass("show")&&!(n&&("click"===n.type&&/input|textarea/i.test(n.target.tagName)||"keyup"===n.type&&9===n.which)&&e.contains(s,n.target))){var u=e.Event("hide.bs.dropdown",l);e(s).trigger(u),u.isDefaultPrevented()||("ontouchstart"in document.documentElement&&e(document.body).children().off("mouseover",null,e.noop),i[o].setAttribute("aria-expanded","false"),a._popper&&a._popper.destroy(),e(c).removeClass("show"),e(s).removeClass("show").trigger(e.Event("hidden.bs.dropdown",l)))}}}},t._getParentFromElement=function(t){var e,n=l.getSelectorFromElement(t);return n&&(e=document.querySelector(n)),e||t.parentNode},t._dataApiKeydownHandler=function(n){if(!(/input|textarea/i.test(n.target.tagName)?32===n.which||27!==n.which&&(40!==n.which&&38!==n.which||e(n.target).closest(".dropdown-menu").length):!jt.test(n.which))&&!this.disabled&&!e(this).hasClass("disabled")){var i=t._getParentFromElement(this),o=e(i).hasClass("show");if(o||27!==n.which){if(n.preventDefault(),n.stopPropagation(),!o||o&&(27===n.which||32===n.which))return 27===n.which&&e(i.querySelector('[data-toggle="dropdown"]')).trigger("focus"),void e(this).trigger("click");var r=[].slice.call(i.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter((function(t){return e(t).is(":visible")}));if(0!==r.length){var s=r.indexOf(n.target);38===n.which&&s>0&&s--,40===n.which&&s<r.length-1&&s++,s<0&&(s=0),r[s].focus()}}}},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"Default",get:function(){return Lt}},{key:"DefaultType",get:function(){return Pt}}]),t}();e(document).on("keydown.bs.dropdown.data-api",'[data-toggle="dropdown"]',Ft._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api",".dropdown-menu",Ft._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api",Ft._clearMenus).on("click.bs.dropdown.data-api",'[data-toggle="dropdown"]',(function(t){t.preventDefault(),t.stopPropagation(),Ft._jQueryInterface.call(e(this),"toggle")})).on("click.bs.dropdown.data-api",".dropdown form",(function(t){t.stopPropagation()})),e.fn[It]=Ft._jQueryInterface,e.fn[It].Constructor=Ft,e.fn[It].noConflict=function(){return e.fn[It]=xt,Ft._jQueryInterface};var Rt=e.fn.modal,Mt={backdrop:!0,keyboard:!0,focus:!0,show:!0},Bt={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},qt=function(){function t(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(".modal-dialog"),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var n=t.prototype;return n.toggle=function(t){return this._isShown?this.hide():this.show(t)},n.show=function(t){var n=this;if(!this._isShown&&!this._isTransitioning){e(this._element).hasClass("fade")&&(this._isTransitioning=!0);var i=e.Event("show.bs.modal",{relatedTarget:t});e(this._element).trigger(i),this._isShown||i.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),e(this._element).on("click.dismiss.bs.modal",'[data-dismiss="modal"]',(function(t){return n.hide(t)})),e(this._dialog).on("mousedown.dismiss.bs.modal",(function(){e(n._element).one("mouseup.dismiss.bs.modal",(function(t){e(t.target).is(n._element)&&(n._ignoreBackdropClick=!0)}))})),this._showBackdrop((function(){return n._showElement(t)})))}},n.hide=function(t){var n=this;if(t&&t.preventDefault(),this._isShown&&!this._isTransitioning){var i=e.Event("hide.bs.modal");if(e(this._element).trigger(i),this._isShown&&!i.isDefaultPrevented()){this._isShown=!1;var o=e(this._element).hasClass("fade");if(o&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),e(document).off("focusin.bs.modal"),e(this._element).removeClass("show"),e(this._element).off("click.dismiss.bs.modal"),e(this._dialog).off("mousedown.dismiss.bs.modal"),o){var r=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,(function(t){return n._hideModal(t)})).emulateTransitionEnd(r)}else this._hideModal()}}},n.dispose=function(){[window,this._element,this._dialog].forEach((function(t){return e(t).off(".bs.modal")})),e(document).off("focusin.bs.modal"),e.removeData(this._element,"bs.modal"),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},n.handleUpdate=function(){this._adjustDialog()},n._getConfig=function(t){return t=s(s({},Mt),t),l.typeCheckConfig("modal",t,Bt),t},n._triggerBackdropTransition=function(){var t=this;if("static"===this._config.backdrop){var n=e.Event("hidePrevented.bs.modal");if(e(this._element).trigger(n),n.defaultPrevented)return;this._element.classList.add("modal-static");var i=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,(function(){t._element.classList.remove("modal-static")})).emulateTransitionEnd(i),this._element.focus()}else this.hide()},n._showElement=function(t){var n=this,i=e(this._element).hasClass("fade"),o=this._dialog?this._dialog.querySelector(".modal-body"):null;this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),e(this._dialog).hasClass("modal-dialog-scrollable")&&o?o.scrollTop=0:this._element.scrollTop=0,i&&l.reflow(this._element),e(this._element).addClass("show"),this._config.focus&&this._enforceFocus();var r=e.Event("shown.bs.modal",{relatedTarget:t}),s=function(){n._config.focus&&n._element.focus(),n._isTransitioning=!1,e(n._element).trigger(r)};if(i){var a=l.getTransitionDurationFromElement(this._dialog);e(this._dialog).one(l.TRANSITION_END,s).emulateTransitionEnd(a)}else s()},n._enforceFocus=function(){var t=this;e(document).off("focusin.bs.modal").on("focusin.bs.modal",(function(n){document!==n.target&&t._element!==n.target&&0===e(t._element).has(n.target).length&&t._element.focus()}))},n._setEscapeEvent=function(){var t=this;this._isShown?e(this._element).on("keydown.dismiss.bs.modal",(function(e){t._config.keyboard&&27===e.which?(e.preventDefault(),t.hide()):t._config.keyboard||27!==e.which||t._triggerBackdropTransition()})):this._isShown||e(this._element).off("keydown.dismiss.bs.modal")},n._setResizeEvent=function(){var t=this;this._isShown?e(window).on("resize.bs.modal",(function(e){return t.handleUpdate(e)})):e(window).off("resize.bs.modal")},n._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop((function(){e(document.body).removeClass("modal-open"),t._resetAdjustments(),t._resetScrollbar(),e(t._element).trigger("hidden.bs.modal")}))},n._removeBackdrop=function(){this._backdrop&&(e(this._backdrop).remove(),this._backdrop=null)},n._showBackdrop=function(t){var n=this,i=e(this._element).hasClass("fade")?"fade":"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className="modal-backdrop",i&&this._backdrop.classList.add(i),e(this._backdrop).appendTo(document.body),e(this._element).on("click.dismiss.bs.modal",(function(t){n._ignoreBackdropClick?n._ignoreBackdropClick=!1:t.target===t.currentTarget&&n._triggerBackdropTransition()})),i&&l.reflow(this._backdrop),e(this._backdrop).addClass("show"),!t)return;if(!i)return void t();var o=l.getTransitionDurationFromElement(this._backdrop);e(this._backdrop).one(l.TRANSITION_END,t).emulateTransitionEnd(o)}else if(!this._isShown&&this._backdrop){e(this._backdrop).removeClass("show");var r=function(){n._removeBackdrop(),t&&t()};if(e(this._element).hasClass("fade")){var s=l.getTransitionDurationFromElement(this._backdrop);e(this._backdrop).one(l.TRANSITION_END,r).emulateTransitionEnd(s)}else r()}else t&&t()},n._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},n._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},n._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=Math.round(t.left+t.right)<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},n._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){var n=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")),i=[].slice.call(document.querySelectorAll(".sticky-top"));e(n).each((function(n,i){var o=i.style.paddingRight,r=e(i).css("padding-right");e(i).data("padding-right",o).css("padding-right",parseFloat(r)+t._scrollbarWidth+"px")})),e(i).each((function(n,i){var o=i.style.marginRight,r=e(i).css("margin-right");e(i).data("margin-right",o).css("margin-right",parseFloat(r)-t._scrollbarWidth+"px")}));var o=document.body.style.paddingRight,r=e(document.body).css("padding-right");e(document.body).data("padding-right",o).css("padding-right",parseFloat(r)+this._scrollbarWidth+"px")}e(document.body).addClass("modal-open")},n._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));e(t).each((function(t,n){var i=e(n).data("padding-right");e(n).removeData("padding-right"),n.style.paddingRight=i||""}));var n=[].slice.call(document.querySelectorAll(".sticky-top"));e(n).each((function(t,n){var i=e(n).data("margin-right");"undefined"!=typeof i&&e(n).css("margin-right",i).removeData("margin-right")}));var i=e(document.body).data("padding-right");e(document.body).removeData("padding-right"),document.body.style.paddingRight=i||""},n._getScrollbarWidth=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},t._jQueryInterface=function(n,i){return this.each((function(){var o=e(this).data("bs.modal"),r=s(s(s({},Mt),e(this).data()),"object"==typeof n&&n?n:{});if(o||(o=new t(this,r),e(this).data("bs.modal",o)),"string"==typeof n){if("undefined"==typeof o[n])throw new TypeError('No method named "'+n+'"');o[n](i)}else r.show&&o.show(i)}))},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"Default",get:function(){return Mt}}]),t}();e(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',(function(t){var n,i=this,o=l.getSelectorFromElement(this);o&&(n=document.querySelector(o));var r=e(n).data("bs.modal")?"toggle":s(s({},e(n).data()),e(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var a=e(n).one("show.bs.modal",(function(t){t.isDefaultPrevented()||a.one("hidden.bs.modal",(function(){e(i).is(":visible")&&i.focus()}))}));qt._jQueryInterface.call(e(n),r,this)})),e.fn.modal=qt._jQueryInterface,e.fn.modal.Constructor=qt,e.fn.modal.noConflict=function(){return e.fn.modal=Rt,qt._jQueryInterface};var Ht=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],Qt={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},Wt=/^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,Ut=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;function Vt(t,e,n){if(0===t.length)return t;if(n&&"function"==typeof n)return n(t);for(var i=(new window.DOMParser).parseFromString(t,"text/html"),o=Object.keys(e),r=[].slice.call(i.body.querySelectorAll("*")),s=function(t,n){var i=r[t],s=i.nodeName.toLowerCase();if(-1===o.indexOf(i.nodeName.toLowerCase()))return i.parentNode.removeChild(i),"continue";var a=[].slice.call(i.attributes),l=[].concat(e["*"]||[],e[s]||[]);a.forEach((function(t){(function(t,e){var n=t.nodeName.toLowerCase();if(-1!==e.indexOf(n))return-1===Ht.indexOf(n)||Boolean(t.nodeValue.match(Wt)||t.nodeValue.match(Ut));for(var i=e.filter((function(t){return t instanceof RegExp})),o=0,r=i.length;o<r;o++)if(n.match(i[o]))return!0;return!1})(t,l)||i.removeAttribute(t.nodeName)}))},a=0,l=r.length;a<l;a++)s(a);return i.body.innerHTML}var Yt="tooltip",zt=e.fn[Yt],Xt=new RegExp("(^|\\s)bs-tooltip\\S+","g"),Kt=["sanitize","whiteList","sanitizeFn"],Gt={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object",popperConfig:"(null|object)"},$t={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},Jt={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:Qt,popperConfig:null},Zt={HIDE:"hide.bs.tooltip",HIDDEN:"hidden.bs.tooltip",SHOW:"show.bs.tooltip",SHOWN:"shown.bs.tooltip",INSERTED:"inserted.bs.tooltip",CLICK:"click.bs.tooltip",FOCUSIN:"focusin.bs.tooltip",FOCUSOUT:"focusout.bs.tooltip",MOUSEENTER:"mouseenter.bs.tooltip",MOUSELEAVE:"mouseleave.bs.tooltip"},te=function(){function t(t,e){if("undefined"==typeof At)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var n=t.prototype;return n.enable=function(){this._isEnabled=!0},n.disable=function(){this._isEnabled=!1},n.toggleEnabled=function(){this._isEnabled=!this._isEnabled},n.toggle=function(t){if(this._isEnabled)if(t){var n=this.constructor.DATA_KEY,i=e(t.currentTarget).data(n);i||(i=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(n,i)),i._activeTrigger.click=!i._activeTrigger.click,i._isWithActiveTrigger()?i._enter(null,i):i._leave(null,i)}else{if(e(this.getTipElement()).hasClass("show"))return void this._leave(null,this);this._enter(null,this)}},n.dispose=function(){clearTimeout(this._timeout),e.removeData(this.element,this.constructor.DATA_KEY),e(this.element).off(this.constructor.EVENT_KEY),e(this.element).closest(".modal").off("hide.bs.modal",this._hideModalHandler),this.tip&&e(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},n.show=function(){var t=this;if("none"===e(this.element).css("display"))throw new Error("Please use show on visible elements");var n=e.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){e(this.element).trigger(n);var i=l.findShadowRoot(this.element),o=e.contains(null!==i?i:this.element.ownerDocument.documentElement,this.element);if(n.isDefaultPrevented()||!o)return;var r=this.getTipElement(),s=l.getUID(this.constructor.NAME);r.setAttribute("id",s),this.element.setAttribute("aria-describedby",s),this.setContent(),this.config.animation&&e(r).addClass("fade");var a="function"==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,c=this._getAttachment(a);this.addAttachmentClass(c);var u=this._getContainer();e(r).data(this.constructor.DATA_KEY,this),e.contains(this.element.ownerDocument.documentElement,this.tip)||e(r).appendTo(u),e(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new At(this.element,r,this._getPopperConfig(c)),e(r).addClass("show"),"ontouchstart"in document.documentElement&&e(document.body).children().on("mouseover",null,e.noop);var h=function(){t.config.animation&&t._fixTransition();var n=t._hoverState;t._hoverState=null,e(t.element).trigger(t.constructor.Event.SHOWN),"out"===n&&t._leave(null,t)};if(e(this.tip).hasClass("fade")){var f=l.getTransitionDurationFromElement(this.tip);e(this.tip).one(l.TRANSITION_END,h).emulateTransitionEnd(f)}else h()}},n.hide=function(t){var n=this,i=this.getTipElement(),o=e.Event(this.constructor.Event.HIDE),r=function(){"show"!==n._hoverState&&i.parentNode&&i.parentNode.removeChild(i),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),e(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),t&&t()};if(e(this.element).trigger(o),!o.isDefaultPrevented()){if(e(i).removeClass("show"),"ontouchstart"in document.documentElement&&e(document.body).children().off("mouseover",null,e.noop),this._activeTrigger.click=!1,this._activeTrigger.focus=!1,this._activeTrigger.hover=!1,e(this.tip).hasClass("fade")){var s=l.getTransitionDurationFromElement(i);e(i).one(l.TRANSITION_END,r).emulateTransitionEnd(s)}else r();this._hoverState=""}},n.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},n.isWithContent=function(){return Boolean(this.getTitle())},n.addAttachmentClass=function(t){e(this.getTipElement()).addClass("bs-tooltip-"+t)},n.getTipElement=function(){return this.tip=this.tip||e(this.config.template)[0],this.tip},n.setContent=function(){var t=this.getTipElement();this.setElementContent(e(t.querySelectorAll(".tooltip-inner")),this.getTitle()),e(t).removeClass("fade show")},n.setElementContent=function(t,n){"object"!=typeof n||!n.nodeType&&!n.jquery?this.config.html?(this.config.sanitize&&(n=Vt(n,this.config.whiteList,this.config.sanitizeFn)),t.html(n)):t.text(n):this.config.html?e(n).parent().is(t)||t.empty().append(n):t.text(e(n).text())},n.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||(t="function"==typeof this.config.title?this.config.title.call(this.element):this.config.title),t},n._getPopperConfig=function(t){var e=this;return s(s({},{placement:t,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:".arrow"},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}}),this.config.popperConfig)},n._getOffset=function(){var t=this,e={};return"function"==typeof this.config.offset?e.fn=function(e){return e.offsets=s(s({},e.offsets),t.config.offset(e.offsets,t.element)||{}),e}:e.offset=this.config.offset,e},n._getContainer=function(){return!1===this.config.container?document.body:l.isElement(this.config.container)?e(this.config.container):e(document).find(this.config.container)},n._getAttachment=function(t){return $t[t.toUpperCase()]},n._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach((function(n){if("click"===n)e(t.element).on(t.constructor.Event.CLICK,t.config.selector,(function(e){return t.toggle(e)}));else if("manual"!==n){var i="hover"===n?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,o="hover"===n?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;e(t.element).on(i,t.config.selector,(function(e){return t._enter(e)})).on(o,t.config.selector,(function(e){return t._leave(e)}))}})),this._hideModalHandler=function(){t.element&&t.hide()},e(this.element).closest(".modal").on("hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=s(s({},this.config),{},{trigger:"manual",selector:""}):this._fixTitle()},n._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");(this.element.getAttribute("title")||"string"!==t)&&(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},n._enter=function(t,n){var i=this.constructor.DATA_KEY;(n=n||e(t.currentTarget).data(i))||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(i,n)),t&&(n._activeTrigger["focusin"===t.type?"focus":"hover"]=!0),e(n.getTipElement()).hasClass("show")||"show"===n._hoverState?n._hoverState="show":(clearTimeout(n._timeout),n._hoverState="show",n.config.delay&&n.config.delay.show?n._timeout=setTimeout((function(){"show"===n._hoverState&&n.show()}),n.config.delay.show):n.show())},n._leave=function(t,n){var i=this.constructor.DATA_KEY;(n=n||e(t.currentTarget).data(i))||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(i,n)),t&&(n._activeTrigger["focusout"===t.type?"focus":"hover"]=!1),n._isWithActiveTrigger()||(clearTimeout(n._timeout),n._hoverState="out",n.config.delay&&n.config.delay.hide?n._timeout=setTimeout((function(){"out"===n._hoverState&&n.hide()}),n.config.delay.hide):n.hide())},n._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},n._getConfig=function(t){var n=e(this.element).data();return Object.keys(n).forEach((function(t){-1!==Kt.indexOf(t)&&delete n[t]})),"number"==typeof(t=s(s(s({},this.constructor.Default),n),"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),l.typeCheckConfig(Yt,t,this.constructor.DefaultType),t.sanitize&&(t.template=Vt(t.template,t.whiteList,t.sanitizeFn)),t},n._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},n._cleanTipClass=function(){var t=e(this.getTipElement()),n=t.attr("class").match(Xt);null!==n&&n.length&&t.removeClass(n.join(""))},n._handlePopperPlacementChange=function(t){this.tip=t.instance.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},n._fixTransition=function(){var t=this.getTipElement(),n=this.config.animation;null===t.getAttribute("x-placement")&&(e(t).removeClass("fade"),this.config.animation=!1,this.hide(),this.show(),this.config.animation=n)},t._jQueryInterface=function(n){return this.each((function(){var i=e(this).data("bs.tooltip"),o="object"==typeof n&&n;if((i||!/dispose|hide/.test(n))&&(i||(i=new t(this,o),e(this).data("bs.tooltip",i)),"string"==typeof n)){if("undefined"==typeof i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"Default",get:function(){return Jt}},{key:"NAME",get:function(){return Yt}},{key:"DATA_KEY",get:function(){return"bs.tooltip"}},{key:"Event",get:function(){return Zt}},{key:"EVENT_KEY",get:function(){return".bs.tooltip"}},{key:"DefaultType",get:function(){return Gt}}]),t}();e.fn[Yt]=te._jQueryInterface,e.fn[Yt].Constructor=te,e.fn[Yt].noConflict=function(){return e.fn[Yt]=zt,te._jQueryInterface};var ee="popover",ne=e.fn[ee],ie=new RegExp("(^|\\s)bs-popover\\S+","g"),oe=s(s({},te.Default),{},{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),re=s(s({},te.DefaultType),{},{content:"(string|element|function)"}),se={HIDE:"hide.bs.popover",HIDDEN:"hidden.bs.popover",SHOW:"show.bs.popover",SHOWN:"shown.bs.popover",INSERTED:"inserted.bs.popover",CLICK:"click.bs.popover",FOCUSIN:"focusin.bs.popover",FOCUSOUT:"focusout.bs.popover",MOUSEENTER:"mouseenter.bs.popover",MOUSELEAVE:"mouseleave.bs.popover"},ae=function(t){var n,o;function r(){return t.apply(this,arguments)||this}o=t,(n=r).prototype=Object.create(o.prototype),n.prototype.constructor=n,n.__proto__=o;var s=r.prototype;return s.isWithContent=function(){return this.getTitle()||this._getContent()},s.addAttachmentClass=function(t){e(this.getTipElement()).addClass("bs-popover-"+t)},s.getTipElement=function(){return this.tip=this.tip||e(this.config.template)[0],this.tip},s.setContent=function(){var t=e(this.getTipElement());this.setElementContent(t.find(".popover-header"),this.getTitle());var n=this._getContent();"function"==typeof n&&(n=n.call(this.element)),this.setElementContent(t.find(".popover-body"),n),t.removeClass("fade show")},s._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},s._cleanTipClass=function(){var t=e(this.getTipElement()),n=t.attr("class").match(ie);null!==n&&n.length>0&&t.removeClass(n.join(""))},r._jQueryInterface=function(t){return this.each((function(){var n=e(this).data("bs.popover"),i="object"==typeof t?t:null;if((n||!/dispose|hide/.test(t))&&(n||(n=new r(this,i),e(this).data("bs.popover",n)),"string"==typeof t)){if("undefined"==typeof n[t])throw new TypeError('No method named "'+t+'"');n[t]()}}))},i(r,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"Default",get:function(){return oe}},{key:"NAME",get:function(){return ee}},{key:"DATA_KEY",get:function(){return"bs.popover"}},{key:"Event",get:function(){return se}},{key:"EVENT_KEY",get:function(){return".bs.popover"}},{key:"DefaultType",get:function(){return re}}]),r}(te);e.fn[ee]=ae._jQueryInterface,e.fn[ee].Constructor=ae,e.fn[ee].noConflict=function(){return e.fn[ee]=ne,ae._jQueryInterface};var le="scrollspy",ce=e.fn[le],ue={offset:10,method:"auto",target:""},he={offset:"number",method:"string",target:"(string|element)"},fe=function(){function t(t,n){var i=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(n),this._selector=this._config.target+" .nav-link,"+this._config.target+" .list-group-item,"+this._config.target+" .dropdown-item",this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,e(this._scrollElement).on("scroll.bs.scrollspy",(function(t){return i._process(t)})),this.refresh(),this._process()}var n=t.prototype;return n.refresh=function(){var t=this,n=this._scrollElement===this._scrollElement.window?"offset":"position",i="auto"===this._config.method?n:this._config.method,o="position"===i?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map((function(t){var n,r=l.getSelectorFromElement(t);if(r&&(n=document.querySelector(r)),n){var s=n.getBoundingClientRect();if(s.width||s.height)return[e(n)[i]().top+o,r]}return null})).filter((function(t){return t})).sort((function(t,e){return t[0]-e[0]})).forEach((function(e){t._offsets.push(e[0]),t._targets.push(e[1])}))},n.dispose=function(){e.removeData(this._element,"bs.scrollspy"),e(this._scrollElement).off(".bs.scrollspy"),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},n._getConfig=function(t){if("string"!=typeof(t=s(s({},ue),"object"==typeof t&&t?t:{})).target&&l.isElement(t.target)){var n=e(t.target).attr("id");n||(n=l.getUID(le),e(t.target).attr("id",n)),t.target="#"+n}return l.typeCheckConfig(le,t,he),t},n._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},n._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},n._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},n._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),n=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),t>=n){var i=this._targets[this._targets.length-1];this._activeTarget!==i&&this._activate(i)}else{if(this._activeTarget&&t<this._offsets[0]&&this._offsets[0]>0)return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;){this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&("undefined"==typeof this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}}},n._activate=function(t){this._activeTarget=t,this._clear();var n=this._selector.split(",").map((function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'})),i=e([].slice.call(document.querySelectorAll(n.join(","))));i.hasClass("dropdown-item")?(i.closest(".dropdown").find(".dropdown-toggle").addClass("active"),i.addClass("active")):(i.addClass("active"),i.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"),i.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")),e(this._scrollElement).trigger("activate.bs.scrollspy",{relatedTarget:t})},n._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter((function(t){return t.classList.contains("active")})).forEach((function(t){return t.classList.remove("active")}))},t._jQueryInterface=function(n){return this.each((function(){var i=e(this).data("bs.scrollspy");if(i||(i=new t(this,"object"==typeof n&&n),e(this).data("bs.scrollspy",i)),"string"==typeof n){if("undefined"==typeof i[n])throw new TypeError('No method named "'+n+'"');i[n]()}}))},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"Default",get:function(){return ue}}]),t}();e(window).on("load.bs.scrollspy.data-api",(function(){for(var t=[].slice.call(document.querySelectorAll('[data-spy="scroll"]')),n=t.length;n--;){var i=e(t[n]);fe._jQueryInterface.call(i,i.data())}})),e.fn[le]=fe._jQueryInterface,e.fn[le].Constructor=fe,e.fn[le].noConflict=function(){return e.fn[le]=ce,fe._jQueryInterface};var de=e.fn.tab,pe=function(){function t(t){this._element=t}var n=t.prototype;return n.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&e(this._element).hasClass("active")||e(this._element).hasClass("disabled"))){var n,i,o=e(this._element).closest(".nav, .list-group")[0],r=l.getSelectorFromElement(this._element);if(o){var s="UL"===o.nodeName||"OL"===o.nodeName?"> li > .active":".active";i=(i=e.makeArray(e(o).find(s)))[i.length-1]}var a=e.Event("hide.bs.tab",{relatedTarget:this._element}),c=e.Event("show.bs.tab",{relatedTarget:i});if(i&&e(i).trigger(a),e(this._element).trigger(c),!c.isDefaultPrevented()&&!a.isDefaultPrevented()){r&&(n=document.querySelector(r)),this._activate(this._element,o);var u=function(){var n=e.Event("hidden.bs.tab",{relatedTarget:t._element}),o=e.Event("shown.bs.tab",{relatedTarget:i});e(i).trigger(n),e(t._element).trigger(o)};n?this._activate(n,n.parentNode,u):u()}}},n.dispose=function(){e.removeData(this._element,"bs.tab"),this._element=null},n._activate=function(t,n,i){var o=this,r=(!n||"UL"!==n.nodeName&&"OL"!==n.nodeName?e(n).children(".active"):e(n).find("> li > .active"))[0],s=i&&r&&e(r).hasClass("fade"),a=function(){return o._transitionComplete(t,r,i)};if(r&&s){var c=l.getTransitionDurationFromElement(r);e(r).removeClass("show").one(l.TRANSITION_END,a).emulateTransitionEnd(c)}else a()},n._transitionComplete=function(t,n,i){if(n){e(n).removeClass("active");var o=e(n.parentNode).find("> .dropdown-menu .active")[0];o&&e(o).removeClass("active"),"tab"===n.getAttribute("role")&&n.setAttribute("aria-selected",!1)}if(e(t).addClass("active"),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),l.reflow(t),t.classList.contains("fade")&&t.classList.add("show"),t.parentNode&&e(t.parentNode).hasClass("dropdown-menu")){var r=e(t).closest(".dropdown")[0];if(r){var s=[].slice.call(r.querySelectorAll(".dropdown-toggle"));e(s).addClass("active")}t.setAttribute("aria-expanded",!0)}i&&i()},t._jQueryInterface=function(n){return this.each((function(){var i=e(this),o=i.data("bs.tab");if(o||(o=new t(this),i.data("bs.tab",o)),"string"==typeof n){if("undefined"==typeof o[n])throw new TypeError('No method named "'+n+'"');o[n]()}}))},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}}]),t}();e(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',(function(t){t.preventDefault(),pe._jQueryInterface.call(e(this),"show")})),e.fn.tab=pe._jQueryInterface,e.fn.tab.Constructor=pe,e.fn.tab.noConflict=function(){return e.fn.tab=de,pe._jQueryInterface};var me=e.fn.toast,ge={animation:"boolean",autohide:"boolean",delay:"number"},ve={animation:!0,autohide:!0,delay:500},_e=function(){function t(t,e){this._element=t,this._config=this._getConfig(e),this._timeout=null,this._setListeners()}var n=t.prototype;return n.show=function(){var t=this,n=e.Event("show.bs.toast");if(e(this._element).trigger(n),!n.isDefaultPrevented()){this._config.animation&&this._element.classList.add("fade");var i=function(){t._element.classList.remove("showing"),t._element.classList.add("show"),e(t._element).trigger("shown.bs.toast"),t._config.autohide&&(t._timeout=setTimeout((function(){t.hide()}),t._config.delay))};if(this._element.classList.remove("hide"),l.reflow(this._element),this._element.classList.add("showing"),this._config.animation){var o=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,i).emulateTransitionEnd(o)}else i()}},n.hide=function(){if(this._element.classList.contains("show")){var t=e.Event("hide.bs.toast");e(this._element).trigger(t),t.isDefaultPrevented()||this._close()}},n.dispose=function(){clearTimeout(this._timeout),this._timeout=null,this._element.classList.contains("show")&&this._element.classList.remove("show"),e(this._element).off("click.dismiss.bs.toast"),e.removeData(this._element,"bs.toast"),this._element=null,this._config=null},n._getConfig=function(t){return t=s(s(s({},ve),e(this._element).data()),"object"==typeof t&&t?t:{}),l.typeCheckConfig("toast",t,this.constructor.DefaultType),t},n._setListeners=function(){var t=this;e(this._element).on("click.dismiss.bs.toast",'[data-dismiss="toast"]',(function(){return t.hide()}))},n._close=function(){var t=this,n=function(){t._element.classList.add("hide"),e(t._element).trigger("hidden.bs.toast")};if(this._element.classList.remove("show"),this._config.animation){var i=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,n).emulateTransitionEnd(i)}else n()},t._jQueryInterface=function(n){return this.each((function(){var i=e(this),o=i.data("bs.toast");if(o||(o=new t(this,"object"==typeof n&&n),i.data("bs.toast",o)),"string"==typeof n){if("undefined"==typeof o[n])throw new TypeError('No method named "'+n+'"');o[n](this)}}))},i(t,null,[{key:"VERSION",get:function(){return"4.5.0"}},{key:"DefaultType",get:function(){return ge}},{key:"Default",get:function(){return ve}}]),t}();e.fn.toast=_e._jQueryInterface,e.fn.toast.Constructor=_e,e.fn.toast.noConflict=function(){return e.fn.toast=me,_e._jQueryInterface},t.Alert=h,t.Button=d,t.Carousel=y,t.Collapse=S,t.Dropdown=Ft,t.Modal=qt,t.Popover=ae,t.Scrollspy=fe,t.Tab=pe,t.Toast=_e,t.Tooltip=te,t.Util=l,Object.defineProperty(t,"__esModule",{value:!0})}));

jQuery(document).ready(function(e){e("[data-toggle='tooltip']").tooltip({}),e.isFunction(e.fn.focusPoint)&&e(".load-focuspoint .focuspoint").focusPoint(),e.isFunction(e.fn.slick)&&e(".carousel").slick({dots:!0,autoplay:!0,useAutoplayToggleButton:!1,fade:!0,infinite:!0,slidesToShow:1,slidesToScroll:1,speed:400,zIndex:4,arrows:!1,cssEase:"linear",waitForAnimate:!1,pauseOnDotsHover:!0,customPaging:function(s,t){return e(".carousel-slide:nth-child("+(t+1)+") .slide-nav-link")}}),e(".carousel .slick-active .slide-content").show(),e(".carousel .focuspoint").each(function(){var s=e(this).find("img").attr("height");e(this).height(s)}),e(".carousel.slick-dotted").prepend("<button class='carouselControl' type='button'>"+Drupal.t("Pause")+"</button>"),e(".carousel .carouselControl").on("click",function(){var s=e(this);s.hasClass("paused")?(e(".carousel").slick("slickPlay"),s.removeClass("paused"),s.text(Drupal.t("Pause"))):(e(".carousel").slick("slickPause"),s.addClass("paused"),s.text(Drupal.t("Play")))}),e("#navbarResponsive").on("hidden.bs.collapse",function(){e(this).closest(".navbar-branded").find(".navbar-toggler.icon-menu .sr-only").text(Drupal.t("Collapsed")),e(this).closest(".navbar-branded").find(".navbar-toggler.icon-zoek .sr-only").text(Drupal.t("Search & menu collapsed"))}),e("#navbarResponsive").on("shown.bs.collapse",function(){e(this).closest(".navbar-branded").find(".navbar-toggler.icon-menu .sr-only").text(Drupal.t("Expanded")),e(this).closest(".navbar-branded").find(".navbar-toggler.icon-zoek .sr-only").text(Drupal.t("Close search & menu"))}),e(".header-media img").each(function(){var s=e(this).parent(),t=s.width()/s.height(),a=this.width/this.height>t?"wide":"tall";e(this).addClass(a)}),e("input[type='checkbox'].error").each(function(){e(this).removeClass("error").parent("label").addClass("error")})});;
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(d){"use strict";var s,l=window.Slick||{};s=0,(l=function(i,e){var t,o=this;o.defaults={adaptiveHeight:!1,appendArrows:d(i),appendDots:d(i),arrows:!0,arrowsPlacement:null,asNavFor:null,prevArrow:'<button class="slick-prev" type="button"><span class="slick-prev-icon" aria-hidden="true"></span><span class="slick-sr-only">Previous</span></button>',nextArrow:'<button class="slick-next" type="button"><span class="slick-next-icon" aria-hidden="true"></span><span class="slick-sr-only">Next</span></button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(i,e){return d('<button type="button"><span class="slick-dot-icon" aria-hidden="true"></span><span class="slick-sr-only">Go to slide '+(e+1)+"</span></button>")},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,infinite:!0,initialSlide:0,instructionsText:null,lazyLoad:"ondemand",mobileFirst:!1,playIcon:'<span class="slick-play-icon" aria-hidden="true"></span>',pauseIcon:'<span class="slick-pause-icon" aria-hidden="true"></span>',pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,regionLabel:"carousel",respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useAutoplayToggleButton:!0,useCSS:!0,useGroupRole:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},o.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,$instructionsText:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$pauseButton:null,$pauseIcon:null,$playIcon:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},d.extend(o,o.initials),o.activeBreakpoint=null,o.animType=null,o.animProp=null,o.breakpoints=[],o.breakpointSettings=[],o.cssTransitions=!1,o.focussed=!1,o.interrupted=!1,o.hidden="hidden",o.paused=!0,o.positionProp=null,o.respondTo=null,o.rowCount=1,o.shouldClick=!0,o.$slider=d(i),o.$slidesCache=null,o.transformType=null,o.transitionType=null,o.visibilityChange="visibilitychange",o.windowWidth=0,o.windowTimer=null,t=d(i).data("slick")||{},o.options=d.extend({},o.defaults,e,t),o.currentSlide=o.options.initialSlide,o.originalSettings=o.options,void 0!==document.mozHidden?(o.hidden="mozHidden",o.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(o.hidden="webkitHidden",o.visibilityChange="webkitvisibilitychange"),o.autoPlay=d.proxy(o.autoPlay,o),o.autoPlayClear=d.proxy(o.autoPlayClear,o),o.autoPlayIterator=d.proxy(o.autoPlayIterator,o),o.autoPlayToggleHandler=d.proxy(o.autoPlayToggleHandler,o),o.changeSlide=d.proxy(o.changeSlide,o),o.clickHandler=d.proxy(o.clickHandler,o),o.selectHandler=d.proxy(o.selectHandler,o),o.setPosition=d.proxy(o.setPosition,o),o.swipeHandler=d.proxy(o.swipeHandler,o),o.dragHandler=d.proxy(o.dragHandler,o),o.instanceUid=s++,o.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,o.registerBreakpoints(),o.init(!0)}).prototype.addSlide=l.prototype.slickAdd=function(i,e,t){var o=this;if("boolean"==typeof e)t=e,e=null;else if(e<0||e>=o.slideCount)return!1;o.unload(),"number"==typeof e?0===e&&0===o.$slides.length?d(i).appendTo(o.$slideTrack):t?d(i).insertBefore(o.$slides.eq(e)):d(i).insertAfter(o.$slides.eq(e)):!0===t?d(i).prependTo(o.$slideTrack):d(i).appendTo(o.$slideTrack),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slides.each(function(i,e){d(e).attr("data-slick-index",i),d(e).attr("role","group"),d(e).attr("aria-label","slide "+i)}),o.$slidesCache=o.$slides,o.reinit()},l.prototype.animateHeight=function(){var i,e=this;1===e.options.slidesToShow&&!0===e.options.adaptiveHeight&&!1===e.options.vertical&&(i=e.$slides.eq(e.currentSlide).outerHeight(!0),e.$list.animate({height:i},e.options.speed))},l.prototype.animateSlide=function(i,e){var t={},o=this;o.animateHeight(),!0===o.options.rtl&&!1===o.options.vertical&&(i=-i),!1===o.transformsEnabled?!1===o.options.vertical?o.$slideTrack.animate({left:i},o.options.speed,o.options.easing,e):o.$slideTrack.animate({top:i},o.options.speed,o.options.easing,e):!1===o.cssTransitions?(!0===o.options.rtl&&(o.currentLeft=-o.currentLeft),d({animStart:o.currentLeft}).animate({animStart:i},{duration:o.options.speed,easing:o.options.easing,step:function(i){i=Math.ceil(i),!1===o.options.vertical?t[o.animType]="translate("+i+"px, 0px)":t[o.animType]="translate(0px,"+i+"px)",o.$slideTrack.css(t)},complete:function(){e&&e.call()}})):(o.applyTransition(),i=Math.ceil(i),!1===o.options.vertical?t[o.animType]="translate3d("+i+"px, 0px, 0px)":t[o.animType]="translate3d(0px,"+i+"px, 0px)",o.$slideTrack.css(t),e&&setTimeout(function(){o.disableTransition(),e.call()},o.options.speed))},l.prototype.getNavTarget=function(){var i=this.options.asNavFor;return i&&null!==i&&(i=d(i).not(this.$slider)),i},l.prototype.asNavFor=function(e){var i=this.getNavTarget();null!==i&&"object"==typeof i&&i.each(function(){var i=d(this).slick("getSlick");i.unslicked||i.slideHandler(e,!0)})},l.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},l.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},l.prototype.autoPlayClear=function(){this.autoPlayTimer&&clearInterval(this.autoPlayTimer)},l.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},l.prototype.autoPlayToggleHandler=function(){var i=this;i.paused?(i.$playIcon.css("display","none"),i.$pauseIcon.css("display","inline"),i.$pauseButton.find(".slick-play-text").attr("style","display: none"),i.$pauseButton.find(".slick-pause-text").removeAttr("style"),i.slickPlay()):(i.$playIcon.css("display","inline"),i.$pauseIcon.css("display","none"),i.$pauseButton.find(".slick-play-text").removeAttr("style"),i.$pauseButton.find(".slick-pause-text").attr("style","display: none"),i.slickPause())},l.prototype.buildArrows=function(){var i=this;if(!0===i.options.arrows)if(i.$prevArrow=d(i.options.prevArrow).addClass("slick-arrow"),i.$nextArrow=d(i.options.nextArrow).addClass("slick-arrow"),i.slideCount>i.options.slidesToShow){if(i.htmlExpr.test(i.options.prevArrow))if(null!=i.options.arrowsPlacement)switch(i.options.arrowsPlacement){case"beforeSlides":case"split":console.log("test"),i.$prevArrow.prependTo(i.options.appendArrows);break;case"afterSlides":i.$prevArrow.appendTo(i.options.appendArrows)}else i.$prevArrow.prependTo(i.options.appendArrows);if(i.htmlExpr.test(i.options.nextArrow))if(null!=i.options.arrowsPlacement)switch(i.options.arrowsPlacement){case"beforeSlides":console.log("test2"),i.$prevArrow.after(i.$nextArrow);break;case"afterSlides":case"split":i.$nextArrow.appendTo(i.options.appendArrows)}else i.$nextArrow.appendTo(i.options.appendArrows);!0!==i.options.infinite&&i.$prevArrow.addClass("slick-disabled").prop("disabled",!0)}else i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").prop("disabled",!0)},l.prototype.buildDots=function(){var i,e,t=this;if(!0===t.options.dots&&t.slideCount>t.options.slidesToShow){for(t.$slider.addClass("slick-dotted"),e=d("<ul />").addClass(t.options.dotsClass),i=0;i<=t.getDotCount();i+=1)e.append(d("<li />").append(t.options.customPaging.call(this,t,i)));t.$dots=e.appendTo(t.options.appendDots),t.$dots.find("li").first().addClass("slick-active")}},l.prototype.buildOut=function(){var t=this;t.$slides=t.$slider.children(t.options.slide+":not(.slick-cloned)").addClass("slick-slide"),t.slideCount=t.$slides.length,t.$slides.each(function(i,e){d(e).attr("data-slick-index",i).data("originalStyling",d(e).attr("style")||""),t.options.useGroupRole&&d(e).attr("role","group").attr("aria-label","slide "+(i+1))}),t.$slider.addClass("slick-slider"),t.$slider.attr("role","region"),t.$slider.attr("aria-label",t.options.regionLabel),t.$slideTrack=0===t.slideCount?d('<div class="slick-track"/>').appendTo(t.$slider):t.$slides.wrapAll('<div class="slick-track"/>').parent(),t.$list=t.$slideTrack.wrap('<div class="slick-list"/>').parent(),t.$slideTrack.css("opacity",0),!0!==t.options.centerMode&&!0!==t.options.swipeToSlide||(t.options.slidesToScroll=1),d("img[data-lazy]",t.$slider).not("[src]").addClass("slick-loading"),t.setupInfinite(),t.buildArrows(),t.buildDots(),t.updateDots(),t.setSlideClasses("number"==typeof t.currentSlide?t.currentSlide:0),!0===t.options.draggable&&t.$list.addClass("draggable"),t.options.autoplay&&t.options.useAutoplayToggleButton&&(t.$pauseIcon=d(t.options.pauseIcon).attr("aria-hidden",!0),t.$playIcon=d(t.options.playIcon).attr("aria-hidden",!0),t.$pauseButton=d('<button type="button" class="slick-autoplay-toggle-button">'),t.$pauseButton.append(t.$pauseIcon),t.$pauseButton.append(t.$playIcon.css("display","none")),t.$pauseButton.append(d('<span class="slick-pause-text slick-sr-only">Pause</span>')),t.$pauseButton.append(d('<span class="slick-play-text slick-sr-only" style="display: none">Play</span>')),t.$pauseButton.prependTo(t.$slider)),null!=t.options.instructionsText&&""!=t.options.instructionsText&&(t.$instructionsText=d('<p class="slick-instructions slick-sr-only">'+t.options.instructionsText+"</p>"),t.$instructionsText.prependTo(t.$slider))},l.prototype.buildRows=function(){var i,e,t,o=this,s=document.createDocumentFragment(),n=o.$slider.children();if(0<o.options.rows){for(t=o.options.slidesPerRow*o.options.rows,e=Math.ceil(n.length/t),i=0;i<e;i++){for(var l=document.createElement("div"),r=0;r<o.options.rows;r++){for(var a=document.createElement("div"),d=0;d<o.options.slidesPerRow;d++){var p=i*t+(r*o.options.slidesPerRow+d);n.get(p)&&a.appendChild(n.get(p))}l.appendChild(a)}s.appendChild(l)}o.$slider.empty().append(s),o.$slider.children().children().children().css({width:100/o.options.slidesPerRow+"%",display:"inline-block"})}},l.prototype.checkResponsive=function(i,e){var t,o,s,n=this,l=!1,r=n.$slider.width(),a=window.innerWidth||d(window).width();if("window"===n.respondTo?s=a:"slider"===n.respondTo?s=r:"min"===n.respondTo&&(s=Math.min(a,r)),n.options.responsive&&n.options.responsive.length&&null!==n.options.responsive){for(t in o=null,n.breakpoints)n.breakpoints.hasOwnProperty(t)&&(!1===n.originalSettings.mobileFirst?s<n.breakpoints[t]&&(o=n.breakpoints[t]):s>n.breakpoints[t]&&(o=n.breakpoints[t]));null!==o?null!==n.activeBreakpoint&&o===n.activeBreakpoint&&!e||(n.activeBreakpoint=o,"unslick"===n.breakpointSettings[o]?n.unslick(o):(n.options=d.extend({},n.originalSettings,n.breakpointSettings[o]),!0===i&&(n.currentSlide=n.options.initialSlide),n.refresh(i)),l=o):null!==n.activeBreakpoint&&(n.activeBreakpoint=null,n.options=n.originalSettings,!0===i&&(n.currentSlide=n.options.initialSlide),n.refresh(i),l=o),i||!1===l||n.$slider.trigger("breakpoint",[n,l])}},l.prototype.changeSlide=function(i,e){var t,o,s=this,n=d(i.currentTarget);switch(n.is("a")&&i.preventDefault(),n.is("li")||(n=n.closest("li")),t=s.slideCount%s.options.slidesToScroll!=0?0:(s.slideCount-s.currentSlide)%s.options.slidesToScroll,i.data.message){case"previous":o=0==t?s.options.slidesToScroll:s.options.slidesToShow-t,s.slideCount>s.options.slidesToShow&&s.slideHandler(s.currentSlide-o,!1,e);break;case"next":o=0==t?s.options.slidesToScroll:t,s.slideCount>s.options.slidesToShow&&s.slideHandler(s.currentSlide+o,!1,e);break;case"index":var l=0===i.data.index?0:i.data.index||n.index()*s.options.slidesToScroll;s.slideHandler(s.checkNavigable(l),!1,e),n.children().trigger("focus");break;default:return}},l.prototype.checkNavigable=function(i){var e=this.getNavigableIndexes(),t=0;if(i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},l.prototype.cleanUpEvents=function(){var i=this;i.options.autoplay&&i.options.useAutoplayToggleButton&&i.$pauseButton.off("click.slick",i.autoPlayToggleHandler),i.options.dots&&null!==i.$dots&&d("li",i.$dots).off("click.slick",i.changeSlide).off("mouseenter.slick",d.proxy(i.interrupt,i,!0)).off("mouseleave.slick",d.proxy(i.interrupt,i,!1)),i.$slider.off("focus.slick blur.slick"),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow&&i.$prevArrow.off("click.slick",i.changeSlide),i.$nextArrow&&i.$nextArrow.off("click.slick",i.changeSlide)),i.$list.off("touchstart.slick mousedown.slick",i.swipeHandler),i.$list.off("touchmove.slick mousemove.slick",i.swipeHandler),i.$list.off("touchend.slick mouseup.slick",i.swipeHandler),i.$list.off("touchcancel.slick mouseleave.slick",i.swipeHandler),i.$list.off("click.slick",i.clickHandler),d(document).off(i.visibilityChange,i.visibility),i.cleanUpSlideEvents(),d(window).off("orientationchange.slick.slick-"+i.instanceUid,i.orientationChange),d(window).off("resize.slick.slick-"+i.instanceUid,i.resize),d("[draggable!=true]",i.$slideTrack).off("dragstart",i.preventDefault),d(window).off("load.slick.slick-"+i.instanceUid,i.setPosition)},l.prototype.cleanUpSlideEvents=function(){var i=this;i.$list.off("mouseenter.slick",d.proxy(i.interrupt,i,!0)),i.$list.off("mouseleave.slick",d.proxy(i.interrupt,i,!1))},l.prototype.cleanUpRows=function(){var i;0<this.options.rows&&((i=this.$slides.children().children()).removeAttr("style"),this.$slider.empty().append(i))},l.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},l.prototype.destroy=function(i){var e=this;e.autoPlayClear(),e.touchObject={},e.cleanUpEvents(),d(".slick-cloned",e.$slider).detach(),e.options.autoplay&&e.options.useAutoplayToggleButton&&e.$pauseButton.remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.$prevArrow.length&&(e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").prop("disabled",!1).css("display",""),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove()),e.$nextArrow&&e.$nextArrow.length&&(e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").prop("disabled",!1).css("display",""),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove()),e.$slides&&(e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){d(this).attr("style",d(this).data("originalStyling"))}),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.detach(),e.$list.detach(),e.$slider.append(e.$slides)),e.cleanUpRows(),e.$slider.removeClass("slick-slider"),e.$slider.removeClass("slick-initialized"),e.$slider.removeClass("slick-dotted"),e.unslicked=!0,i||e.$slider.trigger("destroy",[e])},l.prototype.disableTransition=function(i){var e={};e[this.transitionType]="",!1===this.options.fade?this.$slideTrack.css(e):this.$slides.eq(i).css(e)},l.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},l.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},l.prototype.filterSlides=l.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},l.prototype.focusHandler=function(){var t=this;t.$slider.off("focus.slick blur.slick").on("focus.slick","*",function(i){var e=d(this);setTimeout(function(){t.options.pauseOnFocus&&e.is(":focus")&&(t.focussed=!0,t.autoPlay())},0)}).on("blur.slick","*",function(i){d(this);t.options.pauseOnFocus&&(t.focussed=!1,t.autoPlay())})},l.prototype.getCurrent=l.prototype.slickCurrentSlide=function(){return this.currentSlide},l.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},l.prototype.getLeft=function(i){var e,t,o,s,n=this,l=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),l=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(l=i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,l=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(l=n.slideOffset=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+l,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},l.prototype.getOption=l.prototype.slickGetOption=function(i){return this.options[i]},l.prototype.getNavigableIndexes=function(){for(var i=this,e=0,t=0,o=[],s=!1===i.options.infinite?i.slideCount:(e=-1*i.options.slidesToScroll,t=-1*i.options.slidesToScroll,2*i.slideCount);e<s;)o.push(e),e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;return o},l.prototype.getSlick=function(){return this},l.prototype.getSlideCount=function(){var s,n=this,i=!0===n.options.centerMode?Math.floor(n.$list.width()/2):0,l=-1*n.swipeLeft+i;return!0===n.options.swipeToSlide?(n.$slideTrack.find(".slick-slide").each(function(i,e){var t=d(e).outerWidth(),o=e.offsetLeft;if(!0!==n.options.centerMode&&(o+=t/2),l<o+t)return s=e,!1}),Math.abs(d(s).attr("data-slick-index")-n.currentSlide)||1):n.options.slidesToScroll},l.prototype.goTo=l.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},l.prototype.init=function(i){var e=this;d(e.$slider).hasClass("slick-initialized")||(d(e.$slider).addClass("slick-initialized"),e.buildRows(),e.buildOut(),e.setProps(),e.startLoad(),e.loadSlider(),e.initializeEvents(),e.updateArrows(),e.updateDots(),e.checkResponsive(!0),e.focusHandler()),i&&e.$slider.trigger("init",[e]),e.options.autoplay&&(e.paused=!1,e.autoPlay()),e.updateSlideVisibility(),null!=e.options.accessibility&&console.warn("accessibility setting is no longer supported."),null!=e.options.focusOnChange&&console.warn("focusOnChange is no longer supported."),null!=e.options.focusOnSelect&&console.warn("focusOnSelect is no longer supported.")},l.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide))},l.prototype.initDotEvents=function(){var i=this;!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&d("li",i.$dots).on("click.slick",{message:"index"},i.changeSlide),!0===i.options.dots&&!0===i.options.pauseOnDotsHover&&i.slideCount>i.options.slidesToShow&&d("li",i.$dots).on("mouseenter.slick",d.proxy(i.interrupt,i,!0)).on("mouseleave.slick",d.proxy(i.interrupt,i,!1))},l.prototype.initSlideEvents=function(){var i=this;i.options.pauseOnHover&&(i.$list.on("mouseenter.slick",d.proxy(i.interrupt,i,!0)),i.$list.on("mouseleave.slick",d.proxy(i.interrupt,i,!1)))},l.prototype.initializeEvents=function(){var i=this;i.initArrowEvents(),i.initDotEvents(),i.initSlideEvents(),i.options.autoplay&&i.options.useAutoplayToggleButton&&i.$pauseButton.on("click.slick",i.autoPlayToggleHandler),i.$list.on("touchstart.slick mousedown.slick",{action:"start"},i.swipeHandler),i.$list.on("touchmove.slick mousemove.slick",{action:"move"},i.swipeHandler),i.$list.on("touchend.slick mouseup.slick",{action:"end"},i.swipeHandler),i.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},i.swipeHandler),i.$list.on("click.slick",i.clickHandler),d(document).on(i.visibilityChange,d.proxy(i.visibility,i)),d(window).on("orientationchange.slick.slick-"+i.instanceUid,d.proxy(i.orientationChange,i)),d(window).on("resize.slick.slick-"+i.instanceUid,d.proxy(i.resize,i)),d("[draggable!=true]",i.$slideTrack).on("dragstart",i.preventDefault),d(window).on("load.slick.slick-"+i.instanceUid,i.setPosition),d(i.setPosition)},l.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},l.prototype.lazyLoad=function(){var i,e,t,n=this;function o(i){d("img[data-lazy]",i).each(function(){var i=d(this),e=d(this).attr("data-lazy"),t=d(this).attr("data-srcset"),o=d(this).attr("data-sizes")||n.$slider.attr("data-sizes"),s=document.createElement("img");s.onload=function(){i.animate({opacity:0},100,function(){t&&(i.attr("srcset",t),o&&i.attr("sizes",o)),i.attr("src",e).animate({opacity:1},200,function(){i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,i,e])})},s.onerror=function(){i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,i,e])},s.src=e})}if(!0===n.options.centerMode?t=!0===n.options.infinite?(e=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(e=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),n.options.slidesToShow/2+1+2+n.currentSlide):(e=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,t=Math.ceil(e+n.options.slidesToShow),!0===n.options.fade&&(0<e&&e--,t<=n.slideCount&&t++)),i=n.$slider.find(".slick-slide").slice(e,t),"anticipated"===n.options.lazyLoad)for(var s=e-1,l=t,r=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)s<0&&(s=n.slideCount-1),i=(i=i.add(r.eq(s))).add(r.eq(l)),s--,l++;o(i),n.slideCount<=n.options.slidesToShow?o(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?o(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&o(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},l.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},l.prototype.next=l.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},l.prototype.orientationChange=function(){this.checkResponsive(),this.setPosition()},l.prototype.pause=l.prototype.slickPause=function(){this.autoPlayClear(),this.paused=!0},l.prototype.play=l.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},l.prototype.postSlide=function(i){var e=this;e.unslicked||(e.$slider.trigger("afterChange",[e,i]),e.animating=!1,e.slideCount>e.options.slidesToShow&&e.setPosition(),e.swipeLeft=null,e.options.autoplay&&e.autoPlay(),e.updateSlideVisibility())},l.prototype.prev=l.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},l.prototype.preventDefault=function(i){i.preventDefault()},l.prototype.progressiveLazyLoad=function(i){i=i||1;var e,t,o,s,n,l=this,r=d("img[data-lazy]",l.$slider);r.length?(e=r.first(),t=e.attr("data-lazy"),o=e.attr("data-srcset"),s=e.attr("data-sizes")||l.$slider.attr("data-sizes"),(n=document.createElement("img")).onload=function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,e,t]),l.progressiveLazyLoad()},n.onerror=function(){i<3?setTimeout(function(){l.progressiveLazyLoad(i+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,e,t]),l.progressiveLazyLoad())},n.src=t):l.$slider.trigger("allImagesLoaded",[l])},l.prototype.refresh=function(i){var e,t=this,o=t.slideCount-t.options.slidesToShow;!t.options.infinite&&t.currentSlide>o&&(t.currentSlide=o),t.slideCount<=t.options.slidesToShow&&(t.currentSlide=0),e=t.currentSlide,t.destroy(!0),d.extend(t,t.initials,{currentSlide:e}),t.init(),i||t.changeSlide({data:{message:"index",index:e}},!1)},l.prototype.registerBreakpoints=function(){var i,e,t,o=this,s=o.options.responsive||null;if("array"===d.type(s)&&s.length){for(i in o.respondTo=o.options.respondTo||"window",s)if(t=o.breakpoints.length-1,s.hasOwnProperty(i)){for(e=s[i].breakpoint;0<=t;)o.breakpoints[t]&&o.breakpoints[t]===e&&o.breakpoints.splice(t,1),t--;o.breakpoints.push(e),o.breakpointSettings[e]=s[i].settings}o.breakpoints.sort(function(i,e){return o.options.mobileFirst?i-e:e-i})}},l.prototype.reinit=function(){var i=this;i.$slides=i.$slideTrack.children(i.options.slide).addClass("slick-slide"),i.slideCount=i.$slides.length,i.currentSlide>=i.slideCount&&0!==i.currentSlide&&(i.currentSlide=i.currentSlide-i.options.slidesToScroll),i.slideCount<=i.options.slidesToShow&&(i.currentSlide=0),i.registerBreakpoints(),i.setProps(),i.setupInfinite(),i.buildArrows(),i.updateArrows(),i.initArrowEvents(),i.buildDots(),i.updateDots(),i.initDotEvents(),i.cleanUpSlideEvents(),i.initSlideEvents(),i.checkResponsive(!1,!0),i.setSlideClasses("number"==typeof i.currentSlide?i.currentSlide:0),i.setPosition(),i.focusHandler(),i.paused=!i.options.autoplay,i.autoPlay(),i.$slider.trigger("reInit",[i])},l.prototype.resize=function(){var i=this;d(window).width()!==i.windowWidth&&(clearTimeout(i.windowDelay),i.windowDelay=window.setTimeout(function(){i.windowWidth=d(window).width(),i.checkResponsive(),i.unslicked||i.setPosition()},50))},l.prototype.removeSlide=l.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},l.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled||(!(s={})===o.cssTransitions?s[o.animType]="translate("+e+", "+t+")":s[o.animType]="translate3d("+e+", "+t+", 0px)"),o.$slideTrack.css(s)},l.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},l.prototype.setFade=function(){var t,o=this;o.$slides.each(function(i,e){t=o.slideWidth*i*-1,!0===o.options.rtl?d(e).css({position:"relative",right:t,top:0,zIndex:o.options.zIndex-2,opacity:0}):d(e).css({position:"relative",left:t,top:0,zIndex:o.options.zIndex-2,opacity:0})}),o.$slides.eq(o.currentSlide).css({zIndex:o.options.zIndex-1,opacity:1})},l.prototype.setHeight=function(){var i,e=this;1===e.options.slidesToShow&&!0===e.options.adaptiveHeight&&!1===e.options.vertical&&(i=e.$slides.eq(e.currentSlide).outerHeight(!0),e.$list.css("height",i))},l.prototype.setOption=l.prototype.slickSetOption=function(){var i,e,t,o,s,n=this,l=!1;if("object"===d.type(arguments[0])?(t=arguments[0],l=arguments[1],s="multiple"):"string"===d.type(arguments[0])&&(o=arguments[1],l=arguments[2],"responsive"===(t=arguments[0])&&"array"===d.type(arguments[1])?s="responsive":void 0!==arguments[1]&&(s="single")),"single"===s)n.options[t]=o;else if("multiple"===s)d.each(t,function(i,e){n.options[i]=e});else if("responsive"===s)for(e in o)if("array"!==d.type(n.options.responsive))n.options.responsive=[o[e]];else{for(i=n.options.responsive.length-1;0<=i;)n.options.responsive[i].breakpoint===o[e].breakpoint&&n.options.responsive.splice(i,1),i--;n.options.responsive.push(o[e])}l&&(n.unload(),n.reinit())},l.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},l.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},l.prototype.setSlideClasses=function(i){var e,t,o,s,n=this,l=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true").attr("aria-label",function(){return d(this).attr("aria-label").replace(" (centered)","")});n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode?(o=n.options.slidesToShow%2==0?1:0,s=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(s<=i&&i<=n.slideCount-1-s?n.$slides.slice(i-s+o,i+s+1).addClass("slick-active").removeAttr("aria-hidden"):(e=n.options.slidesToShow+i,l.slice(e-s+1+o,e+s+2).addClass("slick-active").removeAttr("aria-hidden")),0===i?l.eq(n.options.slidesToShow+n.slideCount+1).addClass("slick-center").attr("aria-label",function(){return d(this).attr("aria-label")+" (centered)"}):i===n.slideCount-1&&l.eq(n.options.slidesToShow).addClass("slick-center").attr("aria-label",function(){return d(this).attr("aria-label")+" (centered)"})),n.$slides.eq(i).addClass("slick-center").attr("aria-label",function(){return d(this).attr("aria-label")+" (centered)"})):0<=i&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").removeAttr("aria-hidden"):l.length<=n.options.slidesToShow?l.addClass("slick-active").removeAttr("aria-hidden"):(t=n.slideCount%n.options.slidesToShow,e=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?l.slice(e-(n.options.slidesToShow-t),e+t).addClass("slick-active").removeAttr("aria-hidden"):l.slice(e,e+n.options.slidesToShow).addClass("slick-active").removeAttr("aria-hidden")),"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},l.prototype.setupInfinite=function(){var i,e,t,o=this;if(!0===o.options.fade&&(o.options.centerMode=!1),!0===o.options.infinite&&!1===o.options.fade&&(e=null,o.slideCount>o.options.slidesToShow)){for(t=!0===o.options.centerMode?o.options.slidesToShow+1:o.options.slidesToShow,i=o.slideCount;i>o.slideCount-t;--i)e=i-1,d(o.$slides[e]).clone(!0).attr("id","").attr("data-slick-index",e-o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");for(i=0;i<t+o.slideCount;i+=1)e=i,d(o.$slides[e]).clone(!0).attr("id","").attr("data-slick-index",e+o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");o.$slideTrack.find(".slick-cloned").find("[id]").each(function(){d(this).attr("id","")})}},l.prototype.interrupt=function(i){i||this.autoPlay(),this.interrupted=i},l.prototype.selectHandler=function(i){var e=d(i.target).is(".slick-slide")?d(i.target):d(i.target).parents(".slick-slide"),t=(t=parseInt(e.attr("data-slick-index")))||0;this.slideCount<=this.options.slidesToShow?this.slideHandler(t,!1,!0):this.slideHandler(t)},l.prototype.slideHandler=function(i,e,t){var o,s,n,l,r,a,d=this;if(e=e||!1,!(!0===d.animating&&!0===d.options.waitForAnimate||!0===d.options.fade&&d.currentSlide===i))if(!1===e&&d.asNavFor(i),o=i,r=d.getLeft(o),l=d.getLeft(d.currentSlide),d.currentLeft=null===d.swipeLeft?l:d.swipeLeft,!1===d.options.infinite&&!1===d.options.centerMode&&(i<0||i>d.getDotCount()*d.options.slidesToScroll))!1===d.options.fade&&(o=d.currentSlide,!0!==t&&d.slideCount>d.options.slidesToShow?d.animateSlide(l,function(){d.postSlide(o)}):d.postSlide(o));else if(!1===d.options.infinite&&!0===d.options.centerMode&&(i<0||i>d.slideCount-d.options.slidesToScroll))!1===d.options.fade&&(o=d.currentSlide,!0!==t&&d.slideCount>d.options.slidesToShow?d.animateSlide(l,function(){d.postSlide(o)}):d.postSlide(o));else{if(d.options.autoplay&&clearInterval(d.autoPlayTimer),s=o<0?d.slideCount%d.options.slidesToScroll!=0?d.slideCount-d.slideCount%d.options.slidesToScroll:d.slideCount+o:o>=d.slideCount?d.slideCount%d.options.slidesToScroll!=0?0:o-d.slideCount:o,d.animating=!0,d.$slider.trigger("beforeChange",[d,d.currentSlide,s]),n=d.currentSlide,d.currentSlide=s,d.setSlideClasses(d.currentSlide),d.options.asNavFor&&(a=(a=d.getNavTarget()).slick("getSlick")).slideCount<=a.options.slidesToShow&&a.setSlideClasses(d.currentSlide),d.updateDots(),d.updateArrows(),!0===d.options.fade)return!0!==t?(d.fadeSlideOut(n),d.fadeSlide(s,function(){d.postSlide(s)})):d.postSlide(s),void d.animateHeight();!0!==t&&d.slideCount>d.options.slidesToShow?d.animateSlide(r,function(){d.postSlide(s)}):d.postSlide(s)}},l.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},l.prototype.swipeDirection=function(){var i=this,e=i.touchObject.startX-i.touchObject.curX,t=i.touchObject.startY-i.touchObject.curY,o=Math.atan2(t,e),s=Math.round(180*o/Math.PI);return s<0&&(s=360-Math.abs(s)),s<=45&&0<=s||s<=360&&315<=s?!1===i.options.rtl?"left":"right":135<=s&&s<=225?!1===i.options.rtl?"right":"left":!0===i.options.verticalSwiping?35<=s&&s<=135?"down":"up":"vertical"},l.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1;if(o.interrupted=!1,o.shouldClick=!(10<o.touchObject.swipeLength),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},l.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},l.prototype.swipeMove=function(i){var e,t,o,s,n,l=this,r=void 0!==i.originalEvent?i.originalEvent.touches:null;return!(!l.dragging||l.scrolling||r&&1!==r.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==r?r[0].pageX:i.clientX,l.touchObject.curY=void 0!==r?r[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),n=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&4<n?!(l.scrolling=!0):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=n),t=l.swipeDirection(),void 0!==i.originalEvent&&4<l.touchObject.swipeLength&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,(l.touchObject.edgeHit=!1)===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},l.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return!(t.touchObject={});void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},l.prototype.unfilterSlides=l.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},l.prototype.unload=function(){var i=this;d(".slick-cloned",i.$slider).remove(),i.$dots&&i.$dots.remove(),i.$prevArrow&&i.htmlExpr.test(i.options.prevArrow)&&i.$prevArrow.remove(),i.$nextArrow&&i.htmlExpr.test(i.options.nextArrow)&&i.$nextArrow.remove(),i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},l.prototype.unslick=function(i){this.$slider.trigger("unslick",[this,i]),this.destroy()},l.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2);!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").prop("disabled",!1),i.$nextArrow.removeClass("slick-disabled").prop("disabled",!1),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").prop("disabled",!0),i.$nextArrow.removeClass("slick-disabled").prop("disabled",!1)):(i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode||i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode)&&(i.$nextArrow.addClass("slick-disabled").prop("disabled",!0),i.$prevArrow.removeClass("slick-disabled").prop("disabled",!1)))},l.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").find("button").removeAttr("aria-current").end().end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active").find("button").attr("aria-current",!0).end().end())},l.prototype.updateSlideVisibility=function(){this.$slideTrack.find(".slick-slide").attr("aria-hidden","true").find("a, input, button, select").attr("tabindex","-1"),this.$slideTrack.find(".slick-active").removeAttr("aria-hidden").find("a, input, button, select").removeAttr("tabindex")},l.prototype.visibility=function(){this.options.autoplay&&(document[this.hidden]?this.interrupted=!0:this.interrupted=!1)},d.fn.slick=function(){for(var i,e=this,t=arguments[0],o=Array.prototype.slice.call(arguments,1),s=e.length,n=0;n<s;n++)if("object"==typeof t||void 0===t?e[n].slick=new l(e[n],t):i=e[n].slick[t].apply(e[n].slick,o),void 0!==i)return i;return e}});;
jQuery(document).ready(function(t){function e(){t(".carousel-sdv").slick({dots:!0,autoplay:!0,useAutoplayToggleButton:!1,fade:!0,infinite:!0,slidesToShow:1,slidesToScroll:1,speed:400,zIndex:4,arrows:!1,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,adaptiveHeight:!1,customPaging:function(e,a){return"<button type='button'><span class='slick-dot-icon' aria-hidden='true'></span><span class='slick-sr-only sr-only'>"+(a+1)+": </span> <span class='slideTitle'>"+t(e.$slides[a]).find(".slide-title").text()+"</span></button>"},responsive:[{breakpoint:767,settings:{adaptiveHeight:!0}}]})}function a(){t(".carousel-sdv.slick-dotted").prepend("<button class='carouselControl' type='button' aria-label='"+Drupal.t("Pause")+"'>"+Drupal.t("Pause")+"</button>"),t(".carousel-sdv .carouselControl").on("click",function(){var e=t(this);e.hasClass("paused")?(t(".carousel-sdv").slick("slickPlay"),e.removeClass("paused"),e.text(Drupal.t("Pause")),e.attr("aria-label",Drupal.t("Pause"))):(t(".carousel-sdv").slick("slickPause"),e.addClass("paused"),e.text(Drupal.t("Play")),e.attr("aria-label",Drupal.t("Play")))})}t(".carousel-sdv").on("init",function(e){setTimeout(function(){t(".slick-slide").each(function(){t(this).attr("tabindex","-1"),t(this).attr("role","group")}),t(".slick-slide.slick-active").each(function(){t(this).removeAttr("tabindex")})},750)}),t.isFunction(t.fn.slick)&&e(),t(window).on("orientationchange",function(){t(".carousel-sdv").slick("unslick"),t(".carouselControl").remove(),t.isFunction(t.fn.slick)&&e(),setTimeout(function(){a(),t(".slick-prev").addClass("btn icon-angle-left"),t(".slick-next").addClass("btn icon-angle-right")},750)}),t(".carousel-sdv .slick-active .slide-content").show(),t(".slick-dots li").each(function(){t(this).find(".slick-sr-only").prepend("<span></span>"),t(this).find(".slick-sr-only span").text(Drupal.t("Go to slide "))}),t(".carousel-sdv .focuspoint").each(function(){var e=t(this).find("img").attr("height");t(this).height(e)}),a(),1==t(".slick-dots > li").length&&(t(".slick-dots").hide(),t(".carouselControl").hide()),t(".carousel-sdv").on("init reInit afterChange",function(e,a,i){t(".slick-slide").each(function(){t(this).attr("tabindex","-1"),t(this).attr("role","group")}),t(".slick-slide.slick-active").each(function(){t(this).removeAttr("tabindex"),t(this).find("a.anchor-link").attr("tabindex","-1")})}),t(".slick-dots button").on("click",function(){t(".carousel-sdv").on("afterChange",function(e,a,i){t(".slick-active a.anchor-link").focus()})});var i=t(".col-lg-12 > .row > .col-lg-8").find(".carousel-slider"),s=t(".col-lg-12 > .row > .col-lg-12").find(".carousel-slider"),n=t(".sdv-onepager .col-md-8").find(".carousel-slider"),o=t(".sdv-onepager .container.full_width").find(".carousel-slider"),r=t(".afterburner").find(".carousel-slider"),l=t(".slideshow-wrapper .photogallery-slideshow"),c=t(".modal-body > .thumbnail-slideshow"),d=t(".modal-body > .photogallery-slideshow"),p=t(".photogallery-overview"),h=t(".overview-wrapper > .photogallery-overview img"),u=t(".paging-info");l.on("init reInit afterChange",function(e,a,i){var s=(i||0)+1;t(this).closest(".slideshow-wrapper").find(u).text("Afbeelding "+s+" van  "+a.slideCount),t(this).find(".slick-slide:not(.slick-active)").attr("tabindex","-1")}),d.on("init reInit afterChange",function(e,a,i){var s=(i||0)+1;t(this).closest(".overview-wrapper").find(u).text("Afbeelding "+s+" van  "+a.slideCount)}),t.isFunction(t.fn.slick)&&(i.slick({dots:!1,autoplay:!1,fade:!1,infinite:!0,slidesToShow:2,slidesToScroll:1,speed:400,zIndex:4,arrows:!0,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,pauseOnFocus:!1,pauseOnHover:!1,centerMode:!1,responsive:[{breakpoint:576,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}}]}),s.slick({dots:!1,autoplay:!1,fade:!1,infinite:!0,slidesToShow:3,slidesToScroll:1,speed:400,zIndex:4,arrows:!0,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,pauseOnFocus:!1,pauseOnHover:!1,centerMode:!1,responsive:[{breakpoint:576,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}}]}),n.slick({dots:!1,autoplay:!1,fade:!1,infinite:!0,slidesToShow:2,slidesToScroll:1,speed:400,zIndex:4,arrows:!0,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,pauseOnFocus:!1,pauseOnHover:!1,centerMode:!1,responsive:[{breakpoint:576,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}}]}),o.slick({dots:!1,autoplay:!1,fade:!1,infinite:!0,slidesToShow:3,slidesToScroll:1,speed:400,zIndex:4,arrows:!0,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,pauseOnFocus:!1,pauseOnHover:!1,centerMode:!1,responsive:[{breakpoint:576,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0,infinite:!0}}]}),r.slick({dots:!1,autoplay:!1,fade:!1,infinite:!0,slidesToShow:3,slidesToScroll:1,speed:400,zIndex:4,arrows:!0,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,pauseOnFocus:!1,pauseOnHover:!1,centerMode:!1,responsive:[{breakpoint:576,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0}}]})),t.isFunction(t.fn.slick)&&(l.slick({dots:!1,autoplay:!0,useAutoplayToggleButton:!1,fade:!0,infinite:!0,slidesToShow:1,slidesToScroll:1,speed:400,zIndex:4,arrows:!0,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,pauseOnFocus:!1,pauseOnHover:!1}),d.slick({dots:!1,fade:!0,infinite:!0,slidesToShow:1,slidesToScroll:1,speed:400,zIndex:4,asNavFor:c,arrows:!0,cssEase:"linear",waitForAnimate:!0,pauseOnDotsHover:!0,pauseOnFocus:!1,pauseOnHover:!1}),c.slick({fade:!1,slidesToShow:3,slidesToScroll:1,infinite:!0,speed:400,zIndex:4,asNavFor:d,centerMode:!1,arrows:!0,focusOnSelect:!0,swipeToSlide:!0}),p.slick({slidesToShow:100,asNavFor:".modal-body > .thumbnail-slideshow, .modal-body > .photogallery-slideshow",focusOnSelect:!0,speed:1})),t(".photogallery-slideshow").prepend('<button class="btn pauseBtn" type="button">'+Drupal.t("Pause")+"</button>"),t(".pauseBtn").on("click",function(e){e.preventDefault();var a=t(this);a.hasClass("paused")?(t(this).closest(".container").find(".photogallery-slideshow").slick("slickPlay"),a.removeClass("paused"),a.text(Drupal.t("Pause"))):(t(this).closest(".container").find(".photogallery-slideshow").slick("slickPause"),a.addClass("paused"),a.text(Drupal.t("Play")))}),t(".carousel-slider").on("beforeChange",function(e,a,i,s){t(".slick-slide:not(.slick-active)").each(function(){t(this).find("a.collapse-toggler[aria-expanded='true']").click()})}),t(".carousel-slider").on("afterChange",function(e,a,i,s){t(".slick-slide:not(.slick-active)").each(function(){t(this).find(".mejs__controls .mejs__pause button").click()})}),t(".video-wrapper.slick-cloned .block-audio-video").on("click",function(){var e=t(this).closest(".slick-track").children(".slick-slide:not(.slick-cloned)").length,a=t(this).closest("[data-slick-index]").attr("data-slick-index");a>e&&(a=e-Math.abs(a)),t(".carousel-slider").slick("slickGoTo",a)}),t(".photogallery-slideshow > .slick-prev").addClass("btn icon-angle-left"),t(".slick-prev").text(Drupal.t("Previous slide")),t(".slick-prev").attr("aria-label",Drupal.t("Previous slide")),t(".photogallery-slideshow > .slick-next").addClass("btn icon-angle-right"),t(".slick-next").text(Drupal.t("Next slide")),t(".slick-next").attr("aria-label",Drupal.t("Next slide")),t(".thumbnail-slideshow > .slick-prev").addClass("btn icon-angle-left"),t(".thumbnail-slideshow > .slick-next").addClass("btn icon-angle-right"),t(".carousel-slider > .slick-prev").addClass("btn icon-angle-left"),t(".carousel-slider > .slick-next").addClass("btn icon-angle-right"),h.click(function(e){e.preventDefault,t(this).closest(".container").find("#overviewModal").modal("show"),d.slick("setPosition"),c.slick("setPosition"),t(this).closest(".overview-wrapper").find(".modal-body > .photogallery-slideshow").slick("slickPause"),t(this).closest(".overview-wrapper").find(".modal-body > .thumbnail-slideshow").slick("slickPause"),t(this).closest(".overview-wrapper").find(".modal-body > .photogallery-slideshow .pauseBtn").addClass("paused")}),t(".slick-track .slick-slide").each(function(){t(this).attr("tabindex",0).attr("role","button").removeAttr("aria-describedby"),t(this).keypress(function(e){e.preventDefault,13===e.which&&(t(this).click(),t(this).closest(".container").find("#overviewModal").modal("show"),d.slick("setPosition"),c.slick("setPosition"))})}),t(window).width()>575&&(t("article.carousel-new ul.slick-dots").wrap("<div class='navigationNew'></div>"),t(".navigationNew").wrap("<div class='newnavwrapper'></div>"),t(".newnavwrapper").append("<div class='bgfill'>&nbsp;</div>"),t(".newnavwrapper").prepend("<div class='bgfill'>&nbsp;</div>"))}),jQuery(document).ready(function(t){t(".field--name-field-copyright").each(function(){t(this).parent().addClass("copyrightwrapper")}),t(".copyrightwrapper").each(function(){var e=t(this).attr("role");if(t(this).parents(".megamenu-wrapper").length)(a=t.trim(t(this).find(".field--name-field-copyright").text().length))>=18&&t(this).find(".field--name-field-copyright").addClass("cropped").html("");else if(t(this).parents(".modal-body").length){(a=t.trim(t(this).find(".field--name-field-copyright").text().length))>=37&&t(this).find(".field--name-field-copyright").addClass("cropped").html("")}else if(t(this).parents().hasClass("overlay-content")){(s=t(window).width())>800&&(s=800);var a=t(this).find(".field--name-field-copyright").text().length;s<767?a>51&&t(this).find(".field--name-field-copyright").addClass("cropped").html(""):a>105&&t(this).find(".field--name-field-copyright").addClass("cropped").html("")}else if("complementary"==e||t(this).hasClass("layout-content")){var i=t(this).find("img").parent();t(this).find(".field--name-field-copyright").detach().appendTo(i),i.addClass("copyrightwrapper");var s=i.width();a=i.find(".field--name-field-copyright").width();(a+=16)>=s&&i.find(".field--name-field-copyright").addClass("cropped").html("")}else if(t(this).hasClass("image-bg-wrapper")){s=t(this).width(),a=t(this).find(".field--name-field-copyright").width();(a+=16)>=s&&t(this).find(".field--name-field-copyright").addClass("cropped").html("")}else if(t(this).hasClass("bibcite-image")||t(this).hasClass("image-activity")){s=t(this).find("img").width(),a=t(this).find(".field--name-field-copyright").width();(a+=16)>=s&&t(this).find(".field--name-field-copyright").addClass("cropped").html("")}else if(t(this).hasClass("slide-img-link")){t(this).find(".field--name-field-copyright").addClass("cropped").html("");var n=t(this).closest("article");n.hasClass("carousel-new")&&(n.hasClass("bullet-nav")||n.find(".field--name-field-copyright").addClass("repositionNavBar"))}else if(t(this).closest("article").hasClass("overlay-default")){s=t(this).width(),a=t(this).find(".field--name-field-copyright").width();(a+=16)>=s&&t(this).find(".field--name-field-copyright").addClass("cropped").html("")}else if(t(this).hasClass("slick-slide")){if(t(this).parent().parent().parent().hasClass("photogallery-slideshow")){s=t(this).find("img").width(),a=t(this).find(".field--name-field-copyright").width();(a+=16)>=s&&t(this).find(".field--name-field-copyright").addClass("cropped").html("")}}else{var s=t(this).find("img").width(),a=t(this).find(".field--name-field-copyright").width();(a+=16)>=s&&t(this).find(".field--name-field-copyright").addClass("cropped").html("")}if(t(this).parent().parent().parent().hasClass("photogallery-overview")){s=t(this).find("img").width(),a=t(this).find(".field--name-field-copyright").width();(a+=16)>=s&&t(this).find(".field--name-field-copyright").addClass("cropped").html(""),t(this).find(".field--name-field-copyright").on("click",function(){t(this).parent().find("img").click()})}if(t(this).parents().hasClass("modal-body")&&t(this).parents().hasClass("thumbnail-slideshow")&&t(this).find(".field--name-field-copyright").addClass("cropped").html(""),t(this).hasClass("card-media")){var o=t(this).find(".icons-txt");(o.is("[class^='icon-']")||o.is("[class*=' icon-']"))&&t(this).addClass("iconShown")}}),t(window).resize(function(){var e=t(window).width();if(e<768){if(e<414)var a=32;else a=.25*e;var i="calc(";i+=a,i+="px - 2em)",t(".carousel-sdv").find(".field--name-field-copyright").each(function(){t(this).css("margin-top",i)})}}).resize()}),jQuery(document).ready(function(t){var e=t(".datatables");if(0!==e.length){var a={language:{url:"/modules/custom/sdv_datatables/js/"+t("html").attr("lang")+".lang"},mark:!0,responsive:!0,initComplete:function(e,a){t("table.datatables th").wrapInner("<button></button>"),t("table.datatables th button").each(function(){var e=t(this).closest("th"),a=e.attr("aria-controls"),i=e.attr("aria-label"),s=e.attr("aria-sort");t(this).attr("aria-controls",a).attr("aria-label",i).attr("aria-sort",s).attr("tabindex",0),e.hasClass("sorting")?t(this).removeAttr("aria-sort"):e.hasClass("sorting_asc")?t(this).attr("aria-sort",Drupal.t("ascending")):e.hasClass("sorting_desc")&&(t(this).attr("aria-sort"),Drupal.t("descending"))})},fnDrawCallback:function(e){t("table.dataTable th button").each(function(){var e=t(this).closest("th"),a=e.attr("aria-controls"),i=e.attr("aria-label"),s=e.attr("aria-sort");t(this).attr("aria-controls",a).attr("aria-label",i).attr("aria-sort",s).attr("tabindex",0),e.hasClass("sorting")?t(this).removeAttr("aria-sort"):e.hasClass("sorting_asc")?t(this).attr("aria-sort",Drupal.t("ascending")):e.hasClass("sorting_desc")&&(t(this).attr("aria-sort"),Drupal.t("descending")),e.removeAttr("tabindex aria-controls aria-label aria-sort")})}};e.DataTable(a)}t("table.dataTable th").wrapInner("<button></button>"),t(document).ajaxComplete(function(){t("table.dataTable th button").each(function(){var e=t(this).closest("th"),a=e.attr("aria-controls"),i=e.attr("aria-label"),s=e.attr("aria-sort");t(this).attr("aria-controls",a).attr("aria-label",i).attr("aria-sort",s).attr("tabindex",0),e.hasClass("sorting")?t(this).removeAttr("aria-sort"):e.hasClass("sorting_asc")?t(this).attr("aria-sort",Drupal.t("ascending")):e.hasClass("sorting_desc")&&(t(this).attr("aria-sort"),Drupal.t("descending")),e.removeAttr("tabindex aria-controls aria-label aria-sort")}),t("table.dataTable tr button").each(function(){t(this).removeAttr("tabindex")})})}),jQuery(document).ready(function(t){t("a[data-extlink]").each(function(){t(this).find(".extlink").removeAttr("aria-label").find(".ext").attr("aria-label",Drupal.t(" (link is external)"))}),t(".double-linkblock .linkblock a[data-extlink]").each(function(){t(this).closest(".card").find(".card-title").append('<span class="ext"></span>'),t(this).closest(".card").find(".card-title .ext").attr("aria-label",Drupal.t(" (link is external)"))}),t('a.ext, a[target="_blank"]').each(function(){0==t(this).find(".element-invisible").length&&t(this).append("<span class='element-invisible sr-only'></span>"),t(this).find(".element-invisible").addClass("sr-only")}),t('a[target="_blank"]').each(function(){t(this).hasClass("ext")?(t(this).find(".sr-only").addClass("newwindow"),t(this).find(".newwindow:last-child").append(Drupal.t(" (opens in a new window)"))):(t(this).closest("div").find("span.0").append('<span class="sr-only newwindow"></span>'),t(this).closest("div").find(".sr-only.newwindow").append(Drupal.t(" (opens in a new window)")))}),t("a.new-card-link[data-extlink]").each(function(){t(this).find("span.extlink").remove(),t(this).find("p:last-of-type").append('<span class="ext"></span>'),t(this).find(".ext").attr("aria-label",Drupal.t(" (link is external)"))}),t("a.card-link[data-extlink]").each(function(){t(this).find("span.extlink").remove(),t(this).closest(".card").find("span.ext").remove(),0!==t(this).closest(".card").find(".readmore").length?(t(this).closest(".card").find(".readmore").append('<span class="ext"></span>'),t(this).closest(".card").find(".ext").attr("aria-label",Drupal.t(" (link is external)"))):(t(this).closest(".card").find(".card-body p:last-child").append('<span class="ext"></span>'),t(this).closest(".card").find(".ext").attr("aria-label",Drupal.t(" (link is external)")))}),t(".linkblock a").each(function(){t(this).find(".ext").remove()}),t('a[href^="mailto:"]').each(function(){t(this).find(".element-invisible").addClass("sr-only").text(Drupal.t("Mailto link"))})}),jQuery(document).ready(function(t){navigator.userAgent.indexOf("Edge")>=0&&t(".dropdown-menu li").each(function(){t(this).css("list-style-type","none")});var e=t("title").text().split(" | "),a=t(".logo img").attr("alt");a+=" ",a+=e[1],t(".logo a img").attr("alt",a),t.fn.animateAuto=function(e,a,i){var s,n;return this.each(function(o,r){r=t(r),s=r.clone().css({height:"100%"}).appendTo("body"),n=s.css("height"),s.remove(),"height"===e&&r.animate({height:n},a,i)})},t.fn.animateCollapse=function(e,a,i){var s,n;return this.each(function(o,r){r=t(r),s=r.clone().css({height:"12em"}).appendTo("body"),n=s.css("height"),s.remove(),"height"===e&&r.animate({height:n},a,i)})},t("body").scrollspy({target:"#anchor-menu",offset:46});var i=t(".search-form input[data-drupal-selector='edit-search']"),s=t(".search-form input[data-drupal-selector='edit-onderwerp']");i.each(function(){var e=t(this).next(".clear-form");e.on("click",function(){i.val(""),t(this).removeClass("active")}),""!==i.val()?e.addClass("active"):e.removeClass("active"),i.keyup(function(){""!==t(this).val()?e.addClass("active"):e.removeClass("active")}),e.keypress(function(t){13==t.which&&e.click()})}),s.each(function(){var e=t(this).next(".clear-form");e.on("click",function(){s.val(""),t(this).removeClass("active")}),""!==s.val()?e.addClass("active"):e.removeClass("active"),s.keyup(function(){""!==t(this).val()?e.addClass("active"):e.removeClass("active")}),e.keypress(function(t){13==t.which&&e.click()})}),t("#edit-search").removeAttr("aria-describedby"),t("#edit-sdv-type").removeAttr("aria-describedby"),t("#edit-created-max").removeAttr("aria-describedby"),t(".form-type-webform-email-confirm").closest("fieldset.form-item").find("legend").addClass("sr-only").find("span").addClass("sr-only"),t(".form-type-webform-email-confirm > label").addClass("sr-only"),t(".anchor-list")[0]&&t(".back-to-top.manual").remove(),t(window).scroll(function(){if(t(".anchor-list")[0]){var e=t(".anchor-list").offset().top,a=t(".anchor-list").outerHeight();t(window).scrollTop()>e+a?t(".back-to-top").removeClass("invisible"):t(".back-to-top").addClass("invisible")}if(t(".btt-active")[0]){var i=t("article.full").offset().top;t(window).scrollTop()>i?t(".back-to-top").removeClass("invisible"):t(".back-to-top").addClass("invisible")}}),t(".back-to-top").click(function(){return t("body, html").animate({scrollTop:0},500),t("a#back-to-top-focus").focus(),!1}),t(".back-to-top").length>1&&t(".view-back-to-top .back-to-top").remove(),t(".anchor-list")[0]||t(".view-back-to-top").parent().remove(),t(".nav-anchor-list a[href*=\\#].list-group-item").click(function(e){e.preventDefault(),t("body, html").animate({scrollTop:t(this.hash).offset().top},500)}),t(".nav-vertical a[href*=\\#].nav-link").click(function(e){e.preventDefault(),t("body, html").animate({scrollTop:t(this.hash).offset().top},500)}),t(".bibcite-reference a[href*=\\#].btn").click(function(e){e.preventDefault(),t("body, html").animate({scrollTop:t(this.hash).offset().top},500)}),t(".collapse").on("hidden.bs.collapse",function(){var e=t(this).attr("id");t("[aria-controls="+e+"]").find(".infotext-aria").text(Drupal.t(" Collapsed"))}),t(".collapse").on("shown.bs.collapse",function(){var e=t(this).attr("id");t("[aria-controls="+e+"]").find(".infotext-aria").text(Drupal.t(" Unfolded")),t(this).find("ol").css("padding-left","0")}),t(".image-style-background").attr("alt",""),t("figure.carousel-slide > a > div > img").attr("alt",""),t("#navbarResponsive").on("show.bs.collapse",function(){if(t("#anchor-menu").hide(),t(".navbar-nav").hasClass("affix-top")){var e=t(document).scrollTop();t("button.navbar-toggler").attr("data-scrolltop",e),t("body").addClass("sticky-menu-opened")}}),t("#navbarResponsive").on("hide.bs.collapse",function(){t("#anchor-menu").show();var e=t("button.navbar-toggler").attr("data-scrolltop");e=parseInt(e)+315,t(".navbar-nav").hasClass("affix-top")&&(t("body").removeClass("sticky-menu-opened"),t("html, body").animate({scrollTop:e},50),t("button.navbar-toggler").removeAttr("data-scrollTop"))});var n,o,r=t(window).height(),l=t(document).height(),c=t("progress");t("#navbar-main").hasClass("affix-top")&&t("progress").addClass("contrast"),n=l-r,c.attr("max",n),t(document).on("scroll",function(){o=t(window).scrollTop(),c.attr("value",o)}),t(".card-button, .card-list.linkblock").children("a[target='_blank']").length>0?t(".card-button, .card-list.linkblock").click(function(){return window.open(t(this).find("a").attr("href")),!1}):t(".card-button, .card-list.linkblock").click(function(){return window.location=t(this).find("a").attr("href"),!1}),t(".card.newsitem, .card.singlecard.news, .card-list.news").find("a").length>0&&t(".card.newsitem, .card.singlecard.news, .card-list.news").click(function(){return window.location=t(this).find("a").attr("href"),!1});var d=Drupal.t("Show filters"),p=Drupal.t("Hide filters");t("#collapse-search").on("show.bs.collapse",function(e){t(this).is(e.target)&&t(".collapse-link").text(p)}),t("#collapse-search").on("hide.bs.collapse",function(e){t(this).is(e.target)&&t(".collapse-link").text(d)}),t(".min > .btn-kalender").click(function(e){e.preventDefault(),t("#edit-created-min").focus()}),t(".max > .btn-kalender").click(function(e){e.preventDefault(),t("#edit-created-max").focus()}),t("#edit-field-weblogtype-target-id > div > a").addClass("icon-pijl-rechts"),t(".read-more-wrapper").find("button.collapse-toggler").each(function(){var e=t(this).find("span.description"),a=e.html();t(this).on("click",function(){t(this).hasClass("collapsed")?e.text(Drupal.t("Hide")):e.text(a)})}),t(".collapse-toggler").on("click",function(){var e=t(this).attr("href");t(e).find(".mejs__pause button").click()}),t(".read-more-par-container.show-intro").find("button").each(function(){t(this).attr("tabindex","-1")}),t("button.collapse-toggler.show-intro").on("click",function(e){e.preventDefault(),t(this).toggleClass("collapsed"),t(this).attr("aria-expanded",function(t,e){return"true"==e?"false":"true"});var a=t(this).closest(".read-more-wrapper").find(".read-more-par-container");a.attr("aria-hidden",function(t,e){return"true"==e?"false":"true"}),a.find("a").each(function(){t(this).attr("tabindex",function(t,e){return"-1"==e?"0":"-1"})}),a.find("ol").css("padding-left","0"),t(this).hasClass("collapsed")?(t(this).find(".infotext-aria").text(Drupal.t(" Collapsed")),a.animateCollapse("height",500).toggleClass("folded")):(t(this).find(".infotext-aria").text(Drupal.t(" Unfolded")),a.animateAuto("height",500).toggleClass("folded"),setTimeout(function(){a.css("height","auto")},600))}),t(".show-intro a.collapse-toggler").on("click",function(e){e.preventDefault(),t(this).closest(".read-more-par-container.show-intro").css("height","auto")}),t(window).scroll(function(){var e=1+1e-4*t(window).scrollTop();t(".big-image > div > img").css({"-webkit-transform":"scale("+e+")","-moz-transform":"scale("+e+")","-ms-transform":"scale("+e+")","-o-transform":"scale("+e+")",transform:"scale("+e+")"})}),t('[data-toggle="offcanvas"]').click(function(){t(".row-offcanvas").toggleClass("active")}),t(".paragraph--type--par-related-content").find("li.nav-item.active a").addClass("active").parent().removeClass("active"),t(".paragraph--type--par-related-content .nav-tabs a").each(function(){t(this).append('<span class="sr-only"></span>')}),t(".paragraph--type--par-related-content a.active .sr-only").text(Drupal.t(" (Active tab)")),t(".onderwerpen .facet-item a").each(function(){t(this).append('<span class="sr-only"></span>')}),t(".onderwerpen .facet-item a.is-active .sr-only").text(Drupal.t(" (Active link)")),t(".onderwerpen .facet-item.no-results").each(function(){t(this).append('<span class="sr-only"></span>').find(".sr-only").text(Drupal.t("No results found."))}),t('.paragraph--type--par-related-content a[data-toggle="tab"]').on("shown.bs.tab",function(e){e.target,e.relatedTarget;var a=e.target,i=e.relatedTarget,s=e.target.attributes.href.value;t(i).find(".sr-only").text(""),t(a).find(".sr-only").text(Drupal.t(" (Active tab)")),t(i).blur(),t(s+" a").first().focus()});var h=t(".paragraph--type--par-related-content a.pager");t(h).on("click",function(){t(this).closest("ul").attr("tabindex",0)}),t("span.language-link.active-language").removeAttr("hreflang");var u=t(".dropbutton-wrapper");t(u).find(".dropbutton-arrow").append('<span class="sr-only"></span>').find(".sr-only").text(Drupal.t(" Collapsed")),t(u).find("li a").on("click",function(){t(u).hasClass("open")?t(u).find(".dropbutton-arrow .sr-only").text(Drupal.t(" Unfolded")):t(u).find(".readmore-intro").text(Drupal.t(" Collapsed"))}),t(u).find("li button").on("click",function(){t(u).hasClass("open")?t(u).find(".dropbutton-arrow .sr-only").text(Drupal.t(" Collapsed")):t(u).find(".sr-only").text(Drupal.t(" Unfolded"))}),t(u).mouseout(function(){t(this).find(".sr-only").text(Drupal.t(" Collapsed"))}),t("a.language-link").each(function(){"nl"==t(this).attr("hreflang")?t(this).attr("aria-label",Drupal.t("Dutch")):"en"==t(this).attr("hreflang")?t(this).attr("aria-label",Drupal.t("English")):"de"==t(this).attr("hreflang")?t(this).attr("aria-label",Drupal.t("German")):"fr"==t(this).attr("hreflang")&&t(this).attr("aria-label",Drupal.t("French"))});var f=t(".card-deck.rivm-style .news-title");f.is("h2")?f.parent().find(".news-title + .col-sm-4 + .col-sm-4").prepend('<h3 class="sr-only morenews"></h3>'):f.is("h3")?f.parent().find(".news-title + .col-sm-4 + .col-sm-4").prepend('<h4 class="sr-only morenews"></h4>'):f.is("h4")?f.parent().find(".news-title + .col-sm-4 + .col-sm-4").prepend('<h5 class="sr-only morenews"></h5>'):f.is("h5")&&f.parent().find(".news-title + .col-sm-4 + .col-sm-4").prepend('<h6 class="sr-only morenews"></h6>'),t(".rivm-style .sr-only.morenews").text(Drupal.t("More news")),t(".rivm-style img").attr("alt",""),t(".paragraph--type--par-related-content article.vm-onderwerp").on("click",function(){return window.location=t(this).find("a").attr("href"),!1}),t(".paragraph--type--par-related-content article.vm-onderwerp .document > a").wrap("<h3>"),t(window).resize(function(){t(window).width()>992&&t("ul.navbar-nav li.dropdown").hover(function(){t(this).find(".dropdown-menu").stop(!0,!0).delay(0).addClass("show"),t(this).find(".dropdown-toggle").attr("aria-expanded","true")},function(){t(this).find(".dropdown-menu").stop(!0,!0).delay(200).removeClass("show"),t(this).find(".dropdown-toggle").attr("aria-expanded","false")})}),t(window).resize(function(){t(window).width()<992?(t(".complementary-data-block a.data-toggler").addClass("click"),t(".complementary-data-block a.data-toggler").find(".sr-only").text(Drupal.t(" Collapsed")),t(".complementary-data-block a.data-toggler.active").find(".sr-only").text(Drupal.t(" Unfolded"))):(t(".complementary-data-block a.data-toggler").removeClass("click").removeClass("active"),t(".complementary-data-block a.data-toggler span.sr-only").text(""),t(".complementary-data-block .tablewrapper").css("display",""))}).resize(),t(".complementary-data-block a.data-toggler").on("click",function(e){e.preventDefault(),t(this).hasClass("click")&&(t(this).toggleClass("active"),t(this).closest("aside").find(".tablewrapper").slideToggle().find("ol").css("padding-right","0")),t(this).hasClass("active")?t(this).find(".sr-only").text(Drupal.t(" Unfolded")):t(this).find(".sr-only").text(Drupal.t(" Collapsed"))});var g=window.location.pathname,m=new RegExp(g.replace(/\/$/,"")+"$");t("#par-button-menu li a").each(function(){m.test(this.href.replace(/\/$/,""))&&t(this).addClass("active")}),t(".big-header-image").closest("main").find("#anchor-menu").css("margin-top","0"),t("#block-tabblock .item-list a.active").append('<span class="sr-only"></span>'),t("#block-tabblock a.active span.sr-only").text(Drupal.t(" (Active tab)")),t("#par-button-menu a.active").append('<span class="sr-only"></span>'),t("#par-button-menu a.active span.sr-only").text(Drupal.t(" (Active button)")),t("#collapse-search input").hasClass("error")&&t("#collapse-search").collapse("show"),t("#collapse-search").on("shown.bs.collapse",function(){t(".collapse-link").attr("aria-label",Drupal.t("Hide filters"))}),t("#collapse-search").on("hidden.bs.collapse",function(){t(".collapse-link").attr("aria-label",Drupal.t("Show filters"))});var v=t(".links-wrapper ul.list-group");t(v).find("a[href*='.txt']").append("<span class='icon-txt file-type-icon-file-text-o'></span>"),t(v).find("a[href*='.rtf']").append("<span class='icon-txt file-type-icon-file-text-o'></span>"),t(v).find("a[href*='.pdf']").append("<span class='icon-txt file-type-icon-file-pdf-o'></span>"),t(v).find("a[href*='.doc']").append("<span class='icon-txt file-type-icon-file-word-o'></span>"),t(v).find("a[href*='.xls']").append("<span class='icon-txt file-type-icon-file-excel-o'></span>"),t(v).find("a[href*='.csv']").append("<span class='icon-txt icon-download-CSV-bestand'></span>"),t(v).find("a[href*='.ppt']").append("<span class='icon-txt file-type-icon-file-powerpoint-o'></span>"),t(v).find("a[href*='.zip']").append("<span class='icon-txt file-type-icon-file-zip-o'></span>");var b=t(".icon-txt");function w(t){9===t.keyCode&&(document.body.classList.remove("using-mouse"),window.removeEventListener("keydown",w),window.addEventListener("mousedown",y))}function y(){document.body.classList.add("using-mouse"),window.removeEventListener("mousedown",y),window.addEventListener("keydown",w)}t(b).prepend('<span class="sr-only"></span>'),t(".icon-txt.icon-groep-mensen-torso").find(".sr-only").text(Drupal.t("Group of people")),t(".icon-txt.icon-kaart").find(".sr-only").text(Drupal.t("Map")),t(".icon-txt.icon-facts-and-figures").find(".sr-only").text(Drupal.t("Facts and figures")),t(".icon-txt.icon-planning").find(".sr-only").text(Drupal.t("Schedule")),t(".icon-txt.icon-actueel").find(".sr-only").text(Drupal.t("Current")),t(".icon-txt.icon-kalender").find(".sr-only").text(Drupal.t("Calendar")),t(".icon-txt.icon-media").find(".sr-only").text(Drupal.t("Media")),t(".icon-txt.icon-gallery").find(".sr-only").text(Drupal.t("Gallery")),t(".icon-txt.icon-communicatie").find(".sr-only").text(Drupal.t("Communication")),t(".icon-txt.icon-ondernemingen").find(".sr-only").text(Drupal.t("Companies")),t(".icon-txt.icon-vraag-en-antwoord").find(".sr-only").text(Drupal.t("Questions and answers")),t(".icon-txt.icon-hulp").find(".sr-only").text(Drupal.t("Help")),t(".icon-txt.icon-adresboek").find(".sr-only").text(Drupal.t("Address book")),t(".icon-txt.icon-weblogbericht").find(".sr-only").text(Drupal.t("Weblog")),t(".icon-txt.icon-video-camera").find(".sr-only").text(Drupal.t("Video")),t(".icon-txt.icon-formulier").find(".sr-only").text(Drupal.t("Document")),t(".icon-txt.file-type-icon-file-o").find(".sr-only").text(Drupal.t(" Document")),t(".icon-txt.file-type-icon-file-text-o").find(".sr-only").text(Drupal.t(" Text document")),t(".icon-txt.file-type-icon-file-excel-o").find(".sr-only").text(Drupal.t(" Excel document")),t(".icon-txt.icon-download-CSV-bestand").find(".sr-only").text(Drupal.t(" CSV document")),t(".icon-txt.file-type-icon-file-powerpoint-o").find(".sr-only").text(Drupal.t(" Powerpoint document")),t(".icon-txt.file-type-icon-file-word-o").find(".sr-only").text(Drupal.t(" Word document")),t(".icon-txt.file-type-icon-file-zip-o").find(".sr-only").text(Drupal.t(" Zip document")),t(".icon-txt.file-type-icon-file-pdf-o").find(".sr-only").text(Drupal.t(" PDF document")),t("li.glossaryaz a").prepend('<span class="sr-only desc"></span>'),t("li.glossaryaz:first-child a .sr-only.desc").remove(),t("li.glossaryaz a .sr-only.desc").text(Drupal.t("All topics starting with ")),t(".form-required").append('<span class="sr-only"></span>'),t(".form-required .sr-only").text(Drupal.t("This field is required")),t("label.measuremail").prepend('<span class="sr-only"></span>'),t("label.measuremail .sr-only").text(Drupal.t("This field is required")),t("ol").css("padding-right","0"),t("div[data-ec-key]").filter(function(){return 0==t(this).closest(".tab-pane").length}).each(function(e,a){void 0==(a=t(a)).highcharts()&&renderEasyChart(a)}),t(".ec-data-link").on("click",function(t){return showDataTable(this),!1}),t(".cta-button").find("a").addClass("btn btn-primary arrow"),t("a#collapse_search").attr("aria-controls","collapse-search"),t("aside #edit-search").keyup(function(){13==event.keyCode&&t(this).closest("form").find('button[type="submit"]').click()}),t(".view-publicaties").prepend('<div class="wrapper borders"><div class="borderItem"><div class="borderTop"></div></div><div class="borderItem"><div class="borderTop"></div></div><div class="borderItem last"><div class="borderTop"></div></div></div>'),t(".view-publicaties .view-content .views-row").matchHeight({byRow:!1,property:"height"}),t("#navbar-main").hasClass("affix-top")&&(t(".navspan").stickybits(),t("body").addClass("navbar-stick"),setTimeout(function(){t("aside").find(".sticky-sidebar").css("top","80px")},250),t(".sticky-sidebar").addClass("stickynav"),t(".anchor-column-tab").addClass("sticky"),t(".navbar-branded-light.affix-top nav.navbar-nav").length&&t(".anchor-column-tab").addClass("sticky-sub")),t(".paragraph--type--newsletter-archive a.read-more").attr("aria-expanded",Drupal.t("false")),t(".paragraph--type--newsletter-archive a.read-more").on("click",function(e){e.preventDefault(),t(this).toggleClass("active").parent().find(".results-to-hide").slideToggle(),t(this).hasClass("active")?(t(this).text(Drupal.t("Show me less newsletters")),t(this).attr("aria-expanded",Drupal.t("true")),t(".results-to-hide").find("li:first-child a.list-group-item").focus()):(t(this).text(Drupal.t("Show me more newsletters")),t(this).attr("aria-expanded",Drupal.t("false")))}),t("a.webform-element-help").each(function(){var e=t(this).attr("title"),a=t(this).closest("fieldset"),i=t(this).closest("div.form-type-webform-terms-of-service"),s=t(this).closest("div.js-form-type-checkbox"),n=t(this).closest("fieldset.webform-type-checkboxes"),o=t(this).closest("div.webform-checkboxes-other"),r=t(this).closest("fieldset.js-webform-type-radios"),l=t(this).closest("fieldset.webform-checkboxes-other");if(t(this).removeAttr("title").attr("aria-expanded",Drupal.t("false")).attr("aria-label","Helptekst weergeven/verbergen").attr("aria-controls"),i.length)i.append('<div class="explanation collapse"></div>');else if(s.length)s.append('<div class="explanation collapse"></div>');else if(o.length)o.append('<div class="explanation collapse"></div>');else if(l.length)l.append('<div class="explanation collapse"></div>');else if(r.length)r.append('<div class="explanation collapse"></div>');else if(n.length)n.append('<div class="explanation collapse"></div>');else if(a.hasClass("webform-type-radios"))t('<div class="explanation collapse"></div>').insertAfter(a.find(".rateit"));else if(a.hasClass("form-type-webform-email-confirm")){var c=a.find("fieldset.form-item-e-mail-confirm-mail-1 > label");t(this).detach().appendTo(c),a.find("fieldset.form-item-e-mail-confirm-mail-1 input").css("width","calc(100% - 34px)"),t('<div class="explanation collapse"></div>').insertAfter(a.find("fieldset.form-item-e-mail-confirm-mail-1 input"))}else a.hasClass("form-type-webform-rating")?(a.find("div.rateit").css("width","calc(100% - 45px)"),a.append('<div class="explanation collapse"></div>')):a.hasClass("form-type-webform-mapping")?(a.find("table.webform-mapping-table").css("width","calc(100% - 45px)"),t('<div class="explanation collapse"></div>').insertAfter(a.find("table.webform-mapping-table"))):(a.find("input, textarea").css("width","calc(100% - 45px)"),t('<div class="explanation collapse"></div>').insertAfter(a.find("textarea")),t('<div class="explanation collapse"></div>').insertAfter(a.find("input")));a.find(".explanation").uniqueId().html(e),i.find(".explanation").uniqueId().html(e),s.find(".explanation").uniqueId().html(e),n.find(".explanation").uniqueId().html(e),o.find(".explanation").uniqueId().html(e),r.find(".explanation").uniqueId().html(e),l.find(".explanation").uniqueId().html(e);var d=a.find(".explanation").attr("id");t(this).attr("aria-controls",d)}),t("a.webform-element-help").on("click",function(e){if(1==t(this).parents("div.form-type-webform-terms-of-service").length){e.preventDefault();var a=t(this).closest("div.form-type-webform-terms-of-service").find(".explanation");t(this).toggleClass("active"),a.slideToggle(),t(this).hasClass("active")?t(this).attr("aria-expanded",Drupal.t("true")):t(this).attr("aria-expanded",Drupal.t("false"))}else if(1==t(this).parents("div.js-form-type-checkbox").length){e.preventDefault();a=t(this).closest("div.js-form-type-checkbox").find(".explanation");t(this).toggleClass("active"),a.slideToggle(),t(this).hasClass("active")?t(this).attr("aria-expanded",Drupal.t("true")):t(this).attr("aria-expanded",Drupal.t("false"))}else if(1==t(this).parents("fieldset.webform-type-checkboxes").length){e.preventDefault();a=t(this).closest("fieldset.webform-type-checkboxes").find(".explanation");t(this).toggleClass("active"),a.slideToggle(),t(this).hasClass("active")?t(this).attr("aria-expanded",Drupal.t("true")):t(this).attr("aria-expanded",Drupal.t("false"))}else if(1==t(this).parents("fieldset.webform-checkboxes-other").length){e.preventDefault();a=t(this).closest("fieldset.webform-checkboxes-other").find(".explanation");t(this).toggleClass("active"),a.slideToggle(),t(this).hasClass("active")?t(this).attr("aria-expanded",Drupal.t("true")):t(this).attr("aria-expanded",Drupal.t("false"))}else if(1==t(this).parents("fieldset.js-webform-type-radios").length){e.preventDefault();a=t(this).closest("fieldset.js-webform-type-radios").find(".explanation");t(this).toggleClass("active"),a.slideToggle(),t(this).hasClass("active")?t(this).attr("aria-expanded",Drupal.t("true")):t(this).attr("aria-expanded",Drupal.t("false"))}else if(1==t(this).parents("div.webform-checkboxes-other").length){e.preventDefault();a=t(this).closest("div.webform-checkboxes-other").find(".explanation");t(this).toggleClass("active"),a.slideToggle(),t(this).hasClass("active")?t(this).attr("aria-expanded",Drupal.t("true")):t(this).attr("aria-expanded",Drupal.t("false"))}else{e.preventDefault();a=t(this).closest("fieldset").find(".explanation");t(this).toggleClass("active"),a.slideToggle(),t(this).hasClass("active")?t(this).attr("aria-expanded",Drupal.t("true")):t(this).attr("aria-expanded",Drupal.t("false"))}}),t("#navbar-main #searchButton").focusout(function(){t("#navbarResponsive").collapse("hide")}),t(".linkblock .card a").each(function(){t(this).focusin(function(){t(this).closest(".card").attr("tabindex",-1).addClass("focus")}),t(this).focusout(function(){t(this).closest(".card").removeClass("focus")})}),t("body").addClass("using-mouse"),window.addEventListener("keydown",w);var k=t(".afterburner").css("color"),x=t(".afterburner").css("background-color");t(".afterburner").next("#block-deeldezepagina").css("background-color",x),t(".afterburner").next("#block-deeldezepagina").find("h2, a").css("color",k),t(".afterburner").next("#block-deeldezepagina").find("hr").css("border-top-color",k),t("blockquote").each(function(){var e=t(this).text();if(e.match('^"')||e.match("^“")||e.match("^'")||e.match("^‘")){var a=e.substr(1);t(this).html(a)}var i=t(this).text();if(i.match('"$')||i.match("”$")||i.match("^'")||i.match("^’")){var s=i.substr(0,i.length-1);t(this).html(s)}}),t(".print-only").each(function(){var e="( ";e+=t(this).closest(".card").find("a").attr("href"),e+=" )",t(this).html(e)}),t(".mejs__playpause-button button").on("click",function(){t(this).closest(".mejs__container").find(".mejs__overlay-play").css("display","")}),t(".mejs__playpause-button button").keyup(function(e){var a=t(this);32==e.keyCode&&setTimeout(function(){a.closest(".mejs__container").addClass("showFocus")},500)}),t(".mejs__container").keydown(function(e){32==e.keyCode&&(e.preventDefault(),t(this).find(".mejs__playpause-button button").click())}),t(".mejs__container [role='slider'], .mejs__controls button").keydown(function(e){32==e.keyCode&&(e.stopPropagation(),e.preventDefault(),t(this).closest(".mejs__container").find(".mejs__playpause-button button").click())}),t("html[lang='nl']").length&&t(".mejs__horizontal-volume-slider .mejs__offscreen").html("Gebruik de pijltjes toetsen omhoog en omlaag om het volume harder of zachter te zetten."),t(".mejs__container").each(function(){var e=t(this).find("video"),a=e.width(),i=e.height();t(this).css("width",a),t(this).css("height",i)}),t(".mapwrapper").removeAttr("tabindex").find("img.leaflet-marker-icon").removeAttr("tabindex"),t(".locatie button.collapse-toggler").on("click",function(){t(this).toggleClass("collapsed"),t(this).attr("aria-expanded",function(t,e){return"true"==e?"false":"true"});var e="#";e+=t(this).attr("aria-controls"),t(e).slideToggle()}),t(".anchor-list a").on("click",function(){var e=t(this).attr("href");t(e).attr("tabindex","0").focus()}),t(".anchor-column-tab").focusout(function(){t(this).removeAttr("tabindex")}),t("a").filter('[role="button"]').on("keydown",function(t){32===t.which&&t.preventDefault()}),t("a").filter('[role="button"]').on("keyup",function(e){32===e.which&&t(this).click()}),t(".read-more-wrapper:not(.show-intro) button.collapse-toggler").on("click",function(){var e=t(this).closest(".read-more-wrapper").find(".mejs__container");if(0!==e.length){e.css("width","100%"),setTimeout(function(){var t=e.find("video").height();e.css("height",t)},300)}}),t(".highcharts-legend label").on("click",function(t){t.preventDefault()}),t("ul.navbar-nav ul.dropdown-menu").each(function(){t(this).removeAttr("style")}),t("ul.navbar-nav li.nav-item.dropdown").on("mouseenter",function(){t(this).siblings().find(".dropdown-menu").removeClass("show")}),t(document).on("keyup",function(e){27===e.keyCode&&(t("button.dropdown-toggle.showsubnav-button").attr("aria-expanded","false"),t("ul.navbar-nav .dropdown-menu").removeClass("show"))})}),jQuery(document).ready(function(t){var e=t("#desktop-submenu");function a(){t("#mobile-sidebar").find("button, a").each(function(){t(this).attr("tabindex","-1")})}t(window).resize(function(){this.resizeTO&&clearTimeout(this.resizeTO),this.resizeTO=setTimeout(function(){t(this).trigger("resizeEnd")},200)}),t(window).bind("resizeEnd",function(){t(window).width()<992?(e.addClass("hide"),t("#desktop-sidebar").find("a").attr("tabindex","-1"),a()):(e.removeClass("hide"),t("#desktop-sidebar").find("a").attr("tabindex","0"),a(),t("#close-mobile-submenu").click())}),t(window).width()<992?(e.addClass("hide"),t("#desktop-sidebar").find("a").attr("tabindex","-1"),a()):(e.removeClass("hide"),t("#desktop-sidebar").find("a").attr("tabindex","0"),a());var i=Drupal.t("In this topic");if(void 0!=drupalSettings.navbar&&(i=drupalSettings.navbar.title),t(".onderwerpmenu-titlebox__title").text(i),void 0!==drupalSettings.navbar&&null!==drupalSettings.navbar.link){var s=drupalSettings.navbar.link;t(".onderwerpmenu-titlebox__title").wrap("<a class='menuTitleLink'></a>"),t("a.menuTitleLink").attr("href",s)}t(".onderwerpmenu li ul.simple.menu").each(function(){t(this).closest("li").addClass("has-submenu")}),t(".onderwerpmenu li.has-submenu").find("> a.navigation-link").after("<button class='toggleSubMenu' aria-expanded='false'><span class='arrow'><div class='sr-only'></div></span></button>"),t(".onderwerpmenu li.has-submenu").each(function(){var e=Drupal.t("Open submenu");t(this).find("> button.toggleSubMenu span .sr-only").text(e)}),t(".onderwerpmenu button.toggleSubMenu").on("click",function(e){e.preventDefault();var a=Drupal.t("Open submenu"),i=Drupal.t("Close submenu");t(this).attr("aria-expanded",(t,e)=>"true"==e?"false":"true"),t(this).closest("li").toggleClass("open"),t(this).find("span .sr-only").text(function(t,e){return e===a?i:a})});var n,o,r,l=window.location.pathname,c=window.location.href;function d(t){return t.find("button, a").filter(":visible")}t(".onderwerpmenu .list-group a").each(function(){var e=t(this).attr("href");e!=l&&e!=c||(t(this).addClass("active"),t(this).append("<span class='sr-only'> ("+Drupal.t("Active page")+")</span>"))}),t(".onderwerpmenu ul ul a.active").each(function(){t(this).parents("ul.list-group").addClass("has-active-menuitem").parent().addClass("open")}),t(".onderwerpmenu li.has-submenu > a.active").each(function(){t(this).parent().addClass("open").parents("ul.list-group").addClass("has-active-menuitem")}),t("li.has-submenu.open").each(function(){var e=Drupal.t("Close submenu");t(this).find("> button.toggleSubMenu span .sr-only").text(e)}),t("li.has-submenu.open").each(function(){t(this).find("> button.toggleSubMenu").attr("aria-expanded","true")}),t("#my-button").on("click",function(e){e.preventDefault();var a=t("aside#mobile-sidebar");a.toggleClass("opened"),a.find("button, a").each(function(){t(this).removeAttr("tabindex")}),a.find(".focus").focus(),n=d(a),o=n.first(),r=n.last(),t(".toggleSubMenu").on("click",function(){r.off("keydown"),n=d(a),o=n.first(),(r=n.last()).on("keydown",function(t){9!==t.which||t.shiftKey||(t.preventDefault(),o.focus())})}),r.on("keydown",function(t){9!==t.which||t.shiftKey||(t.preventDefault(),o.focus())}),o.on("keydown",function(t){9===t.which&&t.shiftKey&&(t.preventDefault(),r.focus())}),t("html, body").animate({scrollTop:0})}),t(".mobile-sidebar button.closeBtn").on("click",function(e){e.preventDefault(),t("aside#mobile-sidebar").toggleClass("opened"),t("#my-button").focus()})}),jQuery(document).ready(function(t){t('[data-toggle="popover"]').popover(),t(".hover-popover").each(function(){var e,a,i=t(this),s=i.find(".datetime").html(),n=i.find(".endtime"),o=i.find(".image");a=o.length?o.html():"",e=n.length?n.html():"",i.popover({container:"body",trigger:"hover",placement:"top",html:!0,offset:"0",animation:!0,content:"<span class='icon-klok bg-brand time'>"+s+e+"</span><div class='hover-title'>"+i.find("a").html()+"</div>"+a})})}),jQuery(document).ready(function(t){t("a.see-reference").each(function(){t(this).attr("href","#")}),t("a.see-reference").click(function(e){e.preventDefault(),t(this).parent().toggleClass("active")}),t(".reference-wrapper").find("a.see-reference, span.reference-tooltip").mouseenter(function(){var e=(new Date).getTime();t(this).parent().show().data("showing-time",e)}).mouseleave(function(){var e=(new Date).getTime(),a=t(this);window.setTimeout(function(){var t=a.parent().data("showing-time")||0;e>t&&(a.parent().data("showing-time",0),a.parent().removeClass("active"))},800)})}),jQuery(document).ready(function(t){t(".facebook").click(function(e){return e.preventDefault(),window.open(t(this).attr("href"),"facebook","height=450, width=550, top="+(t(window).height()/2-275)+", left="+(t(window).width()/2-225)),!1}),t(".twitter").click(function(e){return e.preventDefault(),window.open(t(this).attr("href"),"twitter","height=450, width=550, top="+(t(window).height()/2-275)+", left="+(t(window).width()/2-225)),!1}),t(".linkedin").click(function(e){return e.preventDefault(),window.open(t(this).attr("href"),"linkedin","height=450, width=550, top="+(t(window).height()/2-275)+", left="+(t(window).width()/2-225)),!1}),t('.footer a[href*="twitter.com"]').addClass("icon-twitter"),t('.footer a[href*="facebook.com"]').addClass("icon-facebook"),t('.footer a[href*="linkedin.com"]').addClass("icon-linked-in"),t('.footer a[href*="youtu.be"]').addClass("icon-youtube"),t('.footer a[href*="youtube.com"]').addClass("icon-youtube"),t('.footer a[href*="instagram.com"]').addClass("icon-instagram"),t('.footer a[href*="instagr.am"]').addClass("icon-instagram")}),function(){var t,e,a=document.querySelectorAll('[role="tablist"]')[0];function i(){t=document.querySelectorAll('[role="tab"]'),e=document.querySelectorAll('[role="tabpanel"]')}i();var s={end:35,home:36,left:37,up:38,right:39,down:40,delete:46},n={37:-1,38:-1,39:1,40:1};for(let e=0;e<t.length;++e)o(e);function o(e){t[e].addEventListener("click",r),t[e].addEventListener("keydown",l),t[e].addEventListener("keyup",c),t[e].index=e}function r(t){p(t.target,!1)}function l(e){switch(e.keyCode){case s.end:e.preventDefault(),p(t[t.length-1]);break;case s.home:e.preventDefault(),p(t[0]);break;case s.up:case s.down:d(e)}}function c(e){switch(e.keyCode){case s.left:case s.right:d(e);break;case s.delete:!function(e){const a=e.target;null!==a.getAttribute("data-deletable")&&(!function(t){var e=t.target,a=document.getElementById(e.getAttribute("aria-controls"));e.parentElement.removeChild(e),a.parentElement.removeChild(a)}(e),i(),a.index-1<0?p(t[0]):p(t[a.index-1]))}(e)}}function d(e){var i=e.keyCode,o=!1;"vertical"==a.getAttribute("aria-orientation")?i!==s.up&&i!==s.down||(e.preventDefault(),o=!0):i!==s.left&&i!==s.right||(o=!0),o&&function(e){var a=e.keyCode;for(let e=0;e<t.length;e++)t[e].addEventListener("focus",h);if(n[a]){var i=e.target;void 0!==i.index&&(t[i.index+n[a]]?t[i.index+n[a]].focus():a===s.left||a===s.up?t[t.length-1].focus():a!==s.right&&a!=s.down||t[0].focus())}}(e)}function p(a,i){i=i||!0,function(){for(let e=0;e<t.length;e++)t[e].setAttribute("tabindex","-1"),t[e].removeEventListener("focus",h);for(let t=0;t<e.length;t++)e[t].setAttribute("hidden","hidden")}(),a.removeAttribute("tabindex");var s=a.getAttribute("aria-controls");document.getElementById(s).removeAttribute("hidden"),i&&a.focus()}function h(t){var e=t.target;setTimeout(u,300,e)}function u(t){t===document.activeElement&&p(t,!1)}}(),jQuery(document).ready(function(t){t(".paragraph--type--par-related-content div[role='tabpanel']").each(function(){t(this).find(".view-content").attr("role","list")})}),function(t){"use strict";var e=function(e,a){this.options=a,this.$tabs=t(e),this._accordionVisible=!1,this._initAccordion(),this._checkStateOnResize();var i=this;setTimeout(function(){i.checkState()},0)};e.DEFAULTS={accordionClass:"d-block d-sm-none",tabsClass:"d-none d-sm-flex",accordionTemplate:function(t,e,a,i){return'<div class="card tab">  <div class="card-header">    <span class="panel-title">    </span>  </div>  <div id="'+e+'" class="collapse '+(i?"in":"")+'">    <div class="card-body js-tabcollapse-panel-body">    </div>  </div></div>'}},e.prototype.checkState=function(){this.$tabs.is(":visible")&&this._accordionVisible?(this.showTabs(),this._accordionVisible=!1):this.$accordion.is(":visible")&&!this._accordionVisible&&(this.showAccordion(),this._accordionVisible=!0)},e.prototype.showTabs=function(){var e=this;(this.$tabs.trigger(t.Event("show-tabs.bs.tabcollapse")),this.$accordion.find(".js-tabcollapse-panel-heading").detach().each(function(){var a=t(this),i=a.data("bs.tabcollapse.parentLi"),s=e._panelHeadingToTabHeading(a);i.removeClass("active"),i.parent().hasClass("dropdown-menu")&&!i.siblings("li").hasClass("active")&&i.parent().parent().removeClass("active"),s.hasClass("collapsed")?s.removeClass("collapsed"):(i.addClass("active"),i.parent().hasClass("dropdown-menu")&&i.parent().parent().addClass("active")),i.append(a)}),t("li").hasClass("active")||t("li").first().addClass("active"),this.$accordion.find(".js-tabcollapse-panel-body").each(function(){var e=t(this);e.data("bs.tabcollapse.tabpane").append(e.contents().detach())}),this.$accordion.html(""),this.options.updateLinks)&&this.getTabContentElement().find('[data-toggle-was="tab"], [data-toggle-was="pill"]').each(function(){var e=t(this),a=e.attr("data-target").replace(/-collapse$/g,"");e.attr({"data-toggle":e.attr("data-toggle-was"),"data-toggle-was":"","data-parent":"","data-target":a})});this.$tabs.trigger(t.Event("shown-tabs.bs.tabcollapse"))},e.prototype.getTabContentElement=function(){var e=t(this.options.tabContentSelector);return 0===e.length&&(e=this.$tabs.siblings(".tab-content")),e},e.prototype.showAccordion=function(){this.$tabs.trigger(t.Event("show-accordion.bs.tabcollapse"));var e=this;if(this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]').each(function(){var a=t(this),i=a.parent();a.data("bs.tabcollapse.parentLi",i),e.$accordion.append(e._createAccordionGroup(e.$accordion.attr("id"),a.detach()))}),this.options.updateLinks){var a=this.$accordion.attr("id");this.$accordion.find(".js-tabcollapse-panel-body").find('[data-toggle="tab"], [data-toggle="pill"]').each(function(){var e=t(this),i=e.attr("data-target")+"-collapse";e.attr({"data-toggle-was":e.attr("data-toggle"),"data-toggle":"collapse","data-parent":"#"+a,"data-target":i})})}this.$tabs.trigger(t.Event("shown-accordion.bs.tabcollapse"))},e.prototype._panelHeadingToTabHeading=function(t){var e=t.attr("data-target").replace(/-collapse$/g,"");return t.attr({"data-toggle":"tab","data-target":e,"data-parent":""}),t},e.prototype._tabHeadingToPanelHeading=function(t,e,a,i){return t.addClass("js-tabcollapse-panel-heading "+(i?"":"collapsed")),t.attr({"data-toggle":"collapse","data-parent":"#"+a,"data-target":"#"+e}),t},e.prototype._checkStateOnResize=function(){var e=this;t(window).resize(function(){clearTimeout(e._resizeTimeout),e._resizeTimeout=setTimeout(function(){e.checkState()},100)})},e.prototype._initAccordion=function(){var e=this.$tabs.attr("id"),a=(e||function(){for(var t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=0;a<5;a++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}())+"-accordion";this.$accordion=t('<div class="panel-group '+this.options.accordionClass+'" id="'+a+'"></div>'),this.$tabs.after(this.$accordion),this.$tabs.addClass(this.options.tabsClass),this.getTabContentElement().addClass(this.options.tabsClass)},e.prototype._createAccordionGroup=function(e,a){var i=a.attr("data-target"),s=a.data("bs.tabcollapse.parentLi").is(".active");i||(i=(i=a.attr("data-target"))&&i.replace(/.*(?=#[^\s]*$)/,""));var n=t(i),o=n.attr("id")+"-collapse",r=t(this.options.accordionTemplate(a,o,e,s));return r.find(".card-header > .panel-title").append(this._tabHeadingToPanelHeading(a,o,e,s)),r.find(".card-body").append(n.contents().detach()).data("bs.tabcollapse.tabpane",n),r},t.fn.tabCollapse=function(a){return this.each(function(){var i=t(this),s=i.data("bs.tabcollapse"),n=t.extend({},e.DEFAULTS,i.data(),"object"==typeof a&&a);s||i.data("bs.tabcollapse",new e(this,n))})},t.fn.tabCollapse.Constructor=e}(window.jQuery),jQuery(document).ready(function(t){t(".tab-pane").each(function(){""==t(this).attr("data-color")&&t(this).attr("data-color","bg-white"),t(this).prepend('<div class="focus" tabindex="-1"></div>')}),t(".nav-tabs .nav-item button").each(function(){t(this).attr("aria-selected","false")}),t('button[data-toggle="tab"]').on("shown.bs.tab",function(e){var a=t(e.relatedTarget),i=t(e.target),s=i.attr("data-target"),n=a.attr("data-target"),o=t(n).attr("data-color"),r=t(this).parent().attr("data-bgaccordion"),l=t(s).attr("data-color");a.removeClass(o).addClass(r).find(".sr-only").empty(),i.removeClass(r).addClass(l).find(".sr-only").text(Drupal.t(" (Active tab)"));var c=t(this).attr("data-target"),d=t(s).find("div[data-ec-key]");if(0!==d.length){var p=d.highcharts();void 0!=p?setTimeout(function(){p.reflow(),t(".highcharts-legend label").on("click",function(t){t.preventDefault()})},100):setTimeout(function(){renderEasyChart(d),t(".highcharts-legend label").on("click",function(t){t.preventDefault()})},100)}var h=t(s).find(".mejs__container");if(0!==h.length){var u=h.find("video");h.css("width","100%");var f=u.height();h.css("height",f)}t(c).find("ol").css("padding-left","1px"),t(c).find("ol").css("padding-right","1px")}),t('button[data-toggle="tab"]').on("click",function(){var e=t(this).attr("data-target");setTimeout(function(){t(e).find(".focus").focus()},250)}),t(".tab-wrapper .nav-tabs li:first-child button").tab("show").removeAttr("tabindex").attr("aria-selected","true"),t(".tab-wrapper ul.nav-tabs").tabCollapse();t(".tab-wrapper ul.nav-tabs li").attr("data-bgaccordion");t(".tab-wrapper ul.nav-tabs").on("show-accordion.bs.tabcollapse",function(){t(".nav-tabs .nav-item button").each(function(){t(this).attr("aria-expanded","false"),t(this).removeAttr("aria-selected"),t(this).find("span.sr-only").remove()}),t(".tab-wrapper").each(function(){$tabColor=t(this).attr("data-bgaccordion"),t(this).find(".card.tab").attr("data-tabcolor",$tabColor).addClass($tabColor)})}),t(".tab-wrapper ul.nav-tabs").on("shown-accordion.bs.tabcollapse",function(){t(".tab-wrapper .card.tab .card-header a.nav-link").attr("class","nav-link js-tabcollapse-panel-heading collapsed"),t(".tab-wrapper").each(function(){$tabColor=t(this).attr("data-bgaccordion"),t(this).find(".card.tab").addClass($tabColor)}),t(".panel-group .card-body").each(function(){var e=t(this).find(".container").attr("data-color");""==e&&(e="bg-white"),t(this).addClass(e)}),t(".panel-group .card-header").on("click",function(){if(t(this).parent().find(".mejs__pause button").click(),t(this).hasClass("active"))t(this).attr("class","card-header"),t(this).find("a").attr("class","nav-link js-tabcollapse-panel-heading");else{t(".panel-group .card-header").each(function(){t(this).attr("class","card-header"),t(this).find(".sr-only").text("")});var e=t(this).parent().find(".container").attr("data-color");""==e&&(e="bg-white"),t(this).addClass("active"),t(this).find(".sr-only").text(Drupal.t(" Active"));var a=t(this).parent().find(".mejs__container");if(0!==a.length){a.css("width","100%"),setTimeout(function(){a.find("mediaelementwrapper").css("display","block");var t=a.find("video").height();a.css("height",t)},300)}}var i=t(this).parent().find("div[data-ec-key]");if(0!==i.length){var s=i.highcharts();void 0!=s?setTimeout(function(){s.reflow()},100):renderEasyChart(i)}})}),t("button[data-toggle='tab']").on("shown.bs.tab",function(e){var a=t(e.target).attr("data-target");t(a).find(".mejs__pause button").click();var i=t(".tab-pane .mejs__container");0!==i.length&&i.each(function(){i.css("width","100%"),setTimeout(function(){i.find("mediaelementwrapper").css("display","block");var t=i.find("video").height();i.css("height",t)},300)})}),t("button[data-toggle='tab']").on("hide.bs.tab",function(e){var a=t(e.target).attr("data-target");t(a).find(".mejs__pause button").click();var i=t(".tab-pane .mejs__container");0!==i.length&&i.each(function(){i.css("width","100%"),setTimeout(function(){i.find("mediaelementwrapper").css("display","block");var t=i.find("video").height();i.css("height",t)},300)})});var e=location.hash;if(!e.startsWith("#/"))if(t(e).hasClass("read-more-par-container")){var a='a.collapse-toggler[href="';a+=e;var i=t(a+='"]'),s=t(e);t(e).closest(".read-more-wrapper").hasClass("show-intro")?setTimeout(function(){t("html, body").animate({scrollTop:s.offset().top},100),i.trigger("click")},300):(i.trigger("click"),setTimeout(function(){t("html, body").animate({scrollTop:s.offset().top},100)},300))}else{if(t(window).width()<576){a='a[href="';a+=e,a+='-collapse"]'}else{a='a[href="';a+=e,a+='"]'}if(e){i=t(a),s=t(e);t(window).width()<576?setTimeout(function(){t("html, body").animate({scrollTop:s.offset().top},100),t(a).trigger("click")},300):(i.tab("show"),i.on("shown.bs.tab",function(){t("html, body").animate({scrollTop:s.offset().top},100)}))}}}),function(){var t,e,a=document.querySelectorAll('[role="tablist"]')[0];function i(){t=document.querySelectorAll("button[id^=par-tab]"),e=document.querySelectorAll('[role="tabpanel"]')}i();for(var s={end:35,home:36,left:37,up:38,right:39,down:40,delete:46,enter:13,space:32},n={37:-1,38:-1,39:1,40:1},o=0;o<t.length;++o)r(o);function r(e){t[e].addEventListener("click",l),t[e].addEventListener("keydown",c),t[e].addEventListener("keyup",d),t[e].index=e}function l(t){h(t.target,!1)}function c(t){switch(t.keyCode){case s.end:t.preventDefault(),f();break;case s.home:t.preventDefault(),u();break;case s.up:case s.down:p(t)}}function d(e){switch(e.keyCode){case s.left:case s.right:p(e);break;case s.delete:!function(e){var a=e.target;null!==a.getAttribute("data-deletable")&&(!function(t){var e=t.target,a=document.getElementById(e.getAttribute("aria-controls"));e.parentElement.removeChild(e),a.parentElement.removeChild(a)}(e),i(),a.index-1<0?h(t[0]):h(t[a.index-1]))}(e);break;case s.enter:case s.space:h(e.target)}}function p(e){var i=e.keyCode,o=!1;"vertical"==a.getAttribute("aria-orientation")?i!==s.up&&i!==s.down||(e.preventDefault(),o=!0):i!==s.left&&i!==s.right||(o=!0),o&&function(e){var a=e.keyCode;if(n[a]){var i=e.target;if(void 0!==i.index)if(t[i.index+n[a]]){t[i.index+n[a]].focus();var o=jQuery(".tab-pane.show").attr("id");jQuery("button[data-toggle='tab']").attr("aria-selected","false"),jQuery("button[aria-controls='"+o+"']").attr("aria-selected","true")}else a===s.left||a===s.up?f():a!==s.right&&a!=s.down||u()}}(e)}function h(a,i){i=i||!0,function(){for(var a=0;a<t.length;a++)t[a].setAttribute("tabindex","-1"),t[a].setAttribute("aria-selected","false");for(var i=0;i<e.length;i++)e[i].classList.add("is-hidden")}(),a.removeAttribute("tabindex"),a.setAttribute("aria-selected","true");var s=a.getAttribute("aria-controls");document.getElementById(s).classList.remove("is-hidden"),i&&a.focus()}function u(){t[0].focus()}function f(){t[t.length-1].focus()}}(),jQuery(document).ready(function(t){t(".overlayAnchor").on("click",function(e){e.preventDefault(),t("body").addClass("showOverlay"),t("body, html").animate({scrollTop:0},200);var a=t(this).attr("href");t(a).addClass("show"),t(a).find(".focus").focus();var i=t(a).find(".mejs__container");if(0!==i.length){i.css("width","100%"),setTimeout(function(){var t=i.find("video").height();i.css("height",t)},10)}var s=t(a).find("select, input, textarea, button, a").filter(":visible"),n=s.first(),o=s.last();o.on("keydown",function(t){9!==t.which||t.shiftKey||(t.preventDefault(),n.focus())}),n.on("keydown",function(t){9===t.which&&t.shiftKey&&(t.preventDefault(),o.focus())});t(a).on("keydown",function(e){("Esc"===e.key||27===e.keyCode)&&t(a).find(".overlayclose").click()})}),t(".overlaybackdrop, .overlayclose").on("click",function(){var e=t(".paragraph--type--full--par-overlay-item.show").attr("data-back");t("body").removeClass("showOverlay"),t(".paragraph--type--full--par-overlay-item.show .video-wrapper").length&&t(".paragraph--type--full--par-overlay-item.show .mejs__button.mejs__pause button").click(),t(".paragraph--type--full--par-overlay-item.full.show").removeClass("show"),t(e).find("a.overlayAnchor").focus(),t("body, html").animate({scrollTop:t(e).offset().top},200)}),t(".subject-page .col-lg-8 div:not(.subject-page-toggler) .themepage-title").prepend("<span class='sr-only'></span>"),t(window).resize(function(){t(window).width()<992?(t(".subject-page .col-lg-8 div:not(.subject-page-toggler) .themepage-title").addClass("click").attr("tabindex","0").removeAttr("aria-expanded").attr("aria-expanded","false").attr("data-toggle","collapse").find(".sr-only").text(Drupal.t("Show ")),t(".subject-page .col-lg-8 div:not(.subject-page-toggler) .themepage-title.active").removeAttr("aria-expanded").attr("aria-expanded","true").attr("data-toggle","collapse").find(".sr-only").text(Drupal.t("Hide ")),t(".subject-page .col-lg-8 div:not(.subject-page-toggler) .themepage-title").each(function(){var e=t(this).siblings(".subject-page-toggler").attr("id");t(this).attr("aria-controls",e)})):(t(".subject-page .col-lg-8 div:not(.subject-page-toggler) .themepage-title").removeClass("click").removeClass("active").removeAttr("tabindex").removeAttr("aria-expanded").removeAttr("aria-controls").removeAttr("data-toggle").find(".sr-only").text(""),t(".subject-page-toggler").removeAttr("style"))}).resize(),t(".themepage-title").on("keyup",function(e){13===e.keyCode&&t(this).click()}),t(".themepage-title").on("click",function(){t(this).parents(".carousel-slider").length||t(window).width()<992&&(t(this).toggleClass("active").siblings(".subject-page-toggler").slideToggle(),t(this).attr("aria-expanded",function(t,e){return"true"==e?"false":"true"}),t(this).hasClass("active")?(t(this).find(".sr-only").text(Drupal.t("Hide ")),t(this).siblings(".subject-page-toggler").find(".carousel-slider").slick("unslick").slick("reinit"),t(this).siblings(".subject-page-toggler").find(".photogallery-slideshow").slick("reinit"),t(this).siblings(".subject-page-toggler").find(".slick-prev").addClass("btn icon-angle-left").parent().find(".slick-next").addClass("btn icon-angle-right")):(t(this).find(".sr-only").text(Drupal.t("Show ")),t(this).hasClass("video-block-title")&&t(this).siblings(".subject-page-toggler").find(".mejs__button.mejs__pause button").click()))})}),function(t){var e=function(a,i){this.$element=t(a),this.options=t.extend({},e.DEFAULT_OPTIONS,i),this.headings=[],this.$element.addClass(this.options.elementClass);var s=this;t(this.options.selector).each(function(e,a){t(a).data("tagNumber",parseInt(a.tagName.substring(1))).data("index",1).data("numbering","1"),s.headings.push(a)}),this.headings.length>0&&this.render()};e.DEFAULT_OPTIONS={selector:"h1, h2, h3, h4, h5, h6",elementClass:"toc",rootUlClass:"toc-ul-root",ulClass:"toc-ul",prefixLinkClass:"toc-link-",heading:null,indexingFormats:{}},e.prototype={constructor:e,render:function(){for(var e={},a=this.headings,i=this.headings.length,s=0;s<i;s++){var n=t(a[s]).data("tagNumber");if(0==s)e[a[0].tagName]=t(a[0]);else{var o=t(a[s-1]).data("tagNumber"),r=String(t(a[s-1]).data("numbering")).split(".");switch(!0){case n==o:var l=t(a[s-1]).data("index")+1;t(a[s]).data("index",l),1==r.length?t(a[s]).data("numbering",parseInt(r[0])+1):(r.pop(),r.push(l),t(a[s]).data("numbering",r.join("."))),e[a[s].tagName]=t(a[s]);break;case n>o:r.push("1"),t(a[s]).data("index",1).data("numbering",r.join(".")),e[a[s].tagName]=t(a[s]);break;case n<o:var c=e[a[s].tagName],d=String(t(c).data("numbering")).split(".");l=t(c).data("index")+1;t(a[s]).data("index",l),1==d.length?t(a[s]).data("numbering",parseInt(d[0])+1):(d.pop(),d.push(l),t(a[s]).data("numbering",d.join("."))),e[a[s].tagName]=t(a[s])}}}var p={},h=t("<ul/>").addClass(this.options.rootUlClass).addClass(this.options.ulClass).appendTo(this.$element);this.options.heading&&t("<li/>").addClass("toc-heading").wrapInner(t("<a/>").attr("href","#").html(this.options.heading)).appendTo(h);for(s=0;s<i;s++){var u=this.generateHeadingId(a[s]),f=String(t(a[s]).data("numbering")).split("."),g=t("<a/>").html(t(a[s]).text()).addClass(this.options.prefixLinkClass+f.length).attr("href","#"+u);if(t("<a/>").addClass("toc-anchor").attr("tabindex",-1).appendTo(a[s]),1==f.length)var m=t("<li/>").wrapInner(g).appendTo(h);else{var v=f.pop(),b=f.join("."),w=p[b].find("ul"),y=w.length>0?w.get(0):t("<ul/>").addClass(this.options.ulClass).appendTo(p[b]);m=t("<li/>").wrapInner(g).appendTo(y);f.push(v)}p[f.join(".")]=m,this.prependIndexing(s,g)}},generateHeadingId:function(e){if(!t(e).attr("id")){for(var a=t(e).text().toLowerCase().replace(/\s+|\/|\\/g,"-").replace(/á|à|ạ|ả|ã|ă|ắ|ằ|ặ|ẳ|ẵ|â|ấ|ầ|ậ|ẩ|ẫ|ä/g,"a").replace(/đ/g,"d").replace(/é|è|ẹ|ẻ|ẽ|ê|ế|ề|ệ|ể|ễ/g,"e").replace(/í|ì|ị|ỉ|ĩ/g,"i").replace(/ó|ò|ọ|ỏ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/g,"o").replace(/ú|ù|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/g,"u").replace(/ý|ỳ|ỵ|ỷ|ỹ/g,"y").replace(/[^a-z0-9-]/g,""),i=!0,s=0;i;)(i=t("#"+a+(0==s?"":"-"+s)).length>0)?s++:a+=0==s?"":"-"+s;return t(e).attr("id",a),t(e).addClass("anchorHeading"),a}return t(e).attr("id")},prependIndexing:function(e,a){var i=this.headings[e],s=parseInt(t(i).data("tagNumber")),n=this.getIndexingFormat(s);if(null!=n){for(var o=String(t(i).data("numbering")).split("."),r=o.length,l=[],c=0,d=0;d<r;d++)c=d+(s-r)+1,(n=this.getIndexingFormat(c))&&l.push(this.convertIndexing(o[d],n));if(l.length>0){var p=l.join(". ")+". ";t(a).prepend(p),t(i).prepend(p)}}},getIndexingFormat:function(t){if("object"==typeof this.options.indexingFormats)return this.options.indexingFormats["h"+t]?this.options.indexingFormats["h"+t]:null;if("string"==typeof this.options.indexingFormats){if(-1!=["upperAlphabet","lowerAlphabet","number","upperRoman","lowerRoman"].indexOf(this.options.indexingFormats))return this.options.indexingFormats;if(this.options.indexingFormats.length<t)return null;switch(this.options.indexingFormats[t-1]){case"1":case 1:return"number";case"A":return"upperAlphabet";case"a":return"lowerAlphabet";case"I":return"upperRoman";case"i":return"lowerRoman";default:return null}}return null},convertIndexing:function(t,e){var a="abcdefghijklmnopqrstuvwxyz",i=a.length;switch(e){case"upperAlphabet":case"A":return t>i?"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[t%i-1]:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[t-1];case"lowerAlphabet":case"a":return t>i?a[t%i-1]:a[t-1];case"number":case"1":case 1:return t;case"upperRoman":case"I":return this.convertToRomanNumeral(t);case"lowerRoman":case"i":return this.convertToRomanNumeral(t).toLowerCase();default:return"_"}},convertToRomanNumeral:function(t){if(!+t)return"";for(var e=String(+t).split(""),a=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"],i="",s=3;s--;)i=(a[+e.pop()+10*s]||"")+i;return Array(+e.join("")+1).join("M")+i}},t.fn.toc=function(a){return this.each(function(){var i=t(this),s=i.data("toc");s||i.data("toc",s=new e(this,a))})},t.fn.toc.Constructor=e}(window.jQuery),jQuery(document).ready(function(t){t("#toc").toc({selector:".with-sticky > .content-block-wrapper > .container > .content-block-title, .with-sticky > .content-block-wrapper > .container > .bgwrapper > .content-block-title, .with-sticky > .contentblock > .card .card-header, .with-sticky .wrap-title, .with-sticky > .links-wrapper .links-title, .with-sticky > .linkblock a.card-link h2, .with-sticky > .linkblock a.card-link h3, .with-sticky > .linkblock a.card-link h4, .with-sticky > .linkblock a.card-link h5, .with-sticky > .linkblock a.card-link h6, .with-sticky > .double-linkblock article.card a h2, .with-sticky > .double-linkblock article.card a h3, .with-sticky > .double-linkblock article.card a h4, .with-sticky > .double-linkblock article.card a h5, .with-sticky > .double-linkblock article.card a h6, .with-sticky > .video-wrapper .video-block-title, .with-sticky > .downloads-wrapper .downloads-title, .with-sticky > .sharing-wrapper .sharing-title, .with-sticky > .slideshow-wrapper .slideshow-title, .with-sticky > .overview-wrapper .overview-title, .with-sticky > .chart-wrapper .chart-title, .with-sticky > .location-map-advanced .location-map-title, .with-sticky > .container > .news-wrapper .news-title, .with-sticky > .newsletter .newsletter-title, .with-sticky > .iframe-wrapper .iframe-title, .with-sticky > .code-wrapper .code-title, .with-sticky > .paragraph--type--par-publications h2, .with-sticky > .paragraph--type--par-publications h3, .with-sticky > .paragraph--type--par-publications h4, .with-sticky > .paragraph--type--par-publications h5, .with-sticky > .paragraph--type--newsletter-archive h2, .with-sticky > .paragraph--type--newsletter-archive h3, .with-sticky > .paragraph--type--newsletter-archive h4, .with-sticky > .paragraph--type--newsletter-archive h5, .with-sticky > .read-more-wrapper .read-more-icon-wrapper h2, .with-sticky > .read-more-wrapper .read-more-icon-wrapper h3, .with-sticky > .read-more-wrapper .read-more-icon-wrapper h4, .with-sticky > .read-more-wrapper .read-more-icon-wrapper h5, .with-sticky > .publications-wrapper h2, .with-sticky > .publications-wrapper h3, .with-sticky > .publications-wrapper h4, .with-sticky > .publications-wrapper h5, .with-sticky > .datatable-wrapper .datatable-title, .with-sticky > .paragraph--type--rss-feed .content-block-title, .with-sticky > .overlay-wrapper .paragraph--type--par-overlay-item.default .title, .with-sticky > .two-column-wrapper h2.two-column-par-title, .with-sticky > .two-column-wrapper h3.two-column-par-title, .with-sticky > .two-column-wrapper h4.two-column-par-title, .with-sticky > .two-column-wrapper h5.two-column-par-title, .with-sticky > .two-column-wrapper h2.par-title, .with-sticky > .two-column-wrapper h3.par-title, .with-sticky > .two-column-wrapper h4.par-title, .with-sticky > .two-column-wrapper h5.par-title, .with-sticky > .two-column-wrapper h6.par-title, .with-sticky > .two-column-wrapper h2.chart-title, .with-sticky > .two-column-wrapper h3.chart-title, .with-sticky > .two-column-wrapper h4.chart-title, .with-sticky > .two-column-wrapper h5.chart-title, .with-sticky > .two-column-wrapper h6.chart-title",ulClass:"nav"}),t(".with-sticky .dataTables_wrapper").length||t(".with-sticky .datatable-wrapper").length?t(document).ajaxComplete(function(){t(".sticky-sidebar").stickybits()}):t(".sticky-sidebar").stickybits(),(/Edge/.test(navigator.userAgent)||/Firefox/.test(navigator.userAgent))&&t(function(){if(t(".sticky-sidebar").length){var e=t(".sticky-sidebar").offset().top;t(window).width();t(window).scroll(function(){var a=t(window).scrollTop();e<a?t(".sticky-sidebar").addClass("sticky"):t(".sticky-sidebar").removeClass("sticky")})}});var e=!1;t(window).scroll(function(){var a;e||(e=!0,a=t(window).scrollTop(),t('a[class*="toc-link"]').each(function(){var e=t(this).attr("href");t(this).toggleClass("active",a>=t(e).offset().top),t(this).hasClass("active")?t(this).attr("aria-current","true"):t(this).removeAttr("aria-current"),t(this).hasClass("toc-link-2")&&t(this).hasClass("active")&&t(this).closest("ul").parent().find("a.toc-link-1").removeAttr("aria-current"),t(this).hasClass("toc-link-3")&&t(this).hasClass("active")&&(t(this).closest("ul").parent().find("a.toc-link-2").removeAttr("aria-current"),t(this).closest("ul").closest("ul").parent().find("a.toc-link-1").removeAttr("aria-current")),t(this).hasClass("toc-link-4")&&t(this).hasClass("active")&&(t(this).closest("ul").parent().find("a.toc-link-3").removeAttr("aria-current"),t(this).closest("ul").closest("ul").parent().find("a.toc-link-2").removeAttr("aria-current"),t(this).closest("ul").closest("ul").closest("ul").parent().find("a.toc-link-1").removeAttr("aria-current")),a>=t(e).offset().top&&t(this).parent("li").prev().find("a.active").removeClass("active").removeAttr("aria-current")}),setTimeout(function(){e=!1},100))}),t(".themepage-toc a[class^='toc-link']").each(function(){var e=t(this).text();e=(e=e.replace(Drupal.t(" Collapsed"),"")).trim(),t(this).text(e)}),t(".toc > ul > li a").click(function(e){var a=t(this),i=t(this.hash).offset().top;t("body").hasClass("navbar-stick")&&(i-=80),e.preventDefault(),t("body, html").animate({scrollTop:i},500,function(){a.parent("li").prev().find("a.active").removeClass("active").removeAttr("aria-current"),a.addClass("active").attr("aria-current","true")}),t(this.hash).find("a.toc-anchor").parents(".overlay-default").length?t(this.hash).find("a.toc-anchor").closest("a.overlayAnchor").focus():t(this.hash).find("a.toc-anchor").parent().focus()}),t(".themepage-toc a[class^='toc-link']").each(function(){var e=t(this).attr("href");if(t(e).hasClass("icons-txt")){var a=t(e).attr("class");t(this).addClass(a)}})}),jQuery(document).ready(function(t){if(t("a.toc-anchor").parent().attr("tabindex","-1").addClass("nofocusindicator"),window.location.hash){var e=window.location.hash.substring(1);if(!e.startsWith("/")){var a=t("#"+e).offset().top;t("body, html").animate({scrollTop:a},500),t("#"+e).find("a.toc-anchor").focus()}}}),jQuery(document).ready(function(t){jQuery.fn.extend({hideTooltip:function(){return this.each(function(){t(this).find(".tooltip-container").addClass("hide-tooltip"),t(this).find(".tooltip-arrow").addClass("hide-tooltip"),t(this).find(".invisible-tooltip-container").addClass("hide-tooltip"),t(this).removeClass("tooltipVisible")})},showTooltip:function(){return this.each(function(){t(this).find(".tooltip-container").removeClass("hide-tooltip"),t(this).find(".tooltip-arrow").removeClass("hide-tooltip"),t(this).find(".invisible-tooltip-container").removeClass("hide-tooltip"),t(this).addClass("tooltipVisible");var e=t(".custom-tooltip.tooltipVisible .tooltip-container").offset();e.left<5&&t(".custom-tooltip.tooltipVisible .tooltip-container").addClass("pushLeft");var a=t(window).width();a-=220,console.log(a),console.log(e),e.left>a&&t(".custom-tooltip.tooltipVisible .tooltip-container").addClass("pushRight")})},focusinTooltip:function(){return this.each(function(){t(this).find(".tooltip-container").removeClass("hide-tooltip"),t(this).find(".tooltip-arrow").removeClass("hide-tooltip"),t(this).find(".invisible-tooltip-container").removeClass("hide-tooltip"),t(this).addClass("tooltipVisible")})},focusoutTooltip:function(){return this.each(function(){t(this).find(".tooltip-container").addClass("hide-tooltip"),t(this).find(".tooltip-arrow").addClass("hide-tooltip"),t(this).find(".invisible-tooltip-container").addClass("hide-tooltip"),t(this).removeClass("tooltipVisible")})}}),t(".custom-tooltip").on("click",function(){t(this).focus(),t(this).removeClass("mousein")}),t(".custom-tooltip").focusin(function(){t(this).showTooltip()}),t(".custom-tooltip").focusout(function(){t(this).hideTooltip()}),t(".custom-tooltip").mouseover(function(){t(this).showTooltip(),t(this).addClass("mousein")}),t(".custom-tooltip").mouseout(function(){t(this).is(":focus")?t(this).showTooltip():(t(this).hideTooltip(),t(this).removeClass("mousein"))}),t(document).on("keyup",function(e){27===e.keyCode&&t(".custom-tooltip.tooltipVisible").hideTooltip()})});;
/**
  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
  @version v3.7.9
  @link https://github.com/yowainwright/stickybits#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
  @license MIT
**/
!function(t){"function"==typeof define&&define.amd?define(t):t()}(function(){"use strict";function x(){return(x=Object.assign||function(t){for(var s=1;s<arguments.length;s++){var e=arguments[s];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}).apply(this,arguments)}var s=function(){function t(t,s){var e=this,i=void 0!==s?s:{};this.version="3.7.9",this.userAgent=window.navigator.userAgent||"no `userAgent` provided by the browser",this.props={customStickyChangeNumber:i.customStickyChangeNumber||null,noStyles:i.noStyles||!1,stickyBitStickyOffset:i.stickyBitStickyOffset||0,parentClass:i.parentClass||"js-stickybit-parent",scrollEl:"string"==typeof i.scrollEl?document.querySelector(i.scrollEl):i.scrollEl||window,stickyClass:i.stickyClass||"js-is-sticky",stuckClass:i.stuckClass||"js-is-stuck",stickyChangeClass:i.stickyChangeClass||"js-is-sticky--change",useStickyClasses:i.useStickyClasses||!1,useFixed:i.useFixed||!1,useGetBoundingClientRect:i.useGetBoundingClientRect||!1,verticalPosition:i.verticalPosition||"top",applyStyle:i.applyStyle||function(t,s){return e.applyStyle(t,s)}},this.props.positionVal=this.definePosition()||"fixed",this.instances=[];var n=this.props,o=n.positionVal,a=n.verticalPosition,l=n.noStyles,r=n.stickyBitStickyOffset,c="top"!==a||l?"":r+"px",p="fixed"!==o?o:"";this.els="string"==typeof t?document.querySelectorAll(t):t,"length"in this.els||(this.els=[this.els]);for(var f=0;f<this.els.length;f++){var u,y=this.els[f],h=this.addInstance(y,this.props);this.props.applyStyle({styles:((u={})[a]=c,u.position=p,u),classes:{}},h),this.manageState(h),this.instances.push(h)}}var s=t.prototype;return s.definePosition=function(){var t;if(this.props.useFixed)t="fixed";else{for(var s=["","-o-","-webkit-","-moz-","-ms-"],e=document.head.style,i=0;i<s.length;i+=1)e.position=s[i]+"sticky";t=e.position?e.position:"fixed",e.position=""}return t},s.addInstance=function(t,s){var e=this,i={el:t,parent:t.parentNode,props:s};if("fixed"===s.positionVal||s.useStickyClasses){this.isWin=this.props.scrollEl===window;var n=this.isWin?window:this.getClosestParent(i.el,i.props.scrollEl);this.computeScrollOffsets(i),this.toggleClasses(i.parent,"",s.parentClass),i.state="default",i.stateChange="default",i.stateContainer=function(){return e.manageState(i)},n.addEventListener("scroll",i.stateContainer)}return i},s.getClosestParent=function(t,s){var e=s,i=t;if(i.parentElement===e)return e;for(;i.parentElement!==e;)i=i.parentElement;return e},s.getTopPosition=function(t){if(this.props.useGetBoundingClientRect)return t.getBoundingClientRect().top+(this.props.scrollEl.pageYOffset||document.documentElement.scrollTop);for(var s=0;s=t.offsetTop+s,t=t.offsetParent;);return s},s.computeScrollOffsets=function(t){var s=t,e=s.props,i=s.el,n=s.parent,o=!this.isWin&&"fixed"===e.positionVal,a="bottom"!==e.verticalPosition,l=o?this.getTopPosition(e.scrollEl):0,r=o?this.getTopPosition(n)-l:this.getTopPosition(n),c=null!==e.customStickyChangeNumber?e.customStickyChangeNumber:i.offsetHeight,p=r+n.offsetHeight;s.offset=o?0:l+e.stickyBitStickyOffset,s.stickyStart=a?r-s.offset:0,s.stickyChange=s.stickyStart+c,s.stickyStop=a?p-(i.offsetHeight+s.offset):p-window.innerHeight},s.toggleClasses=function(t,s,e){var i=t,n=i.className.split(" ");e&&-1===n.indexOf(e)&&n.push(e);var o=n.indexOf(s);-1!==o&&n.splice(o,1),i.className=n.join(" ")},s.manageState=function(r){function t(t){t()}var c=this,p=r,f=p.props,s=p.state,e=p.stateChange,i=p.stickyStart,n=p.stickyChange,o=p.stickyStop,u=f.positionVal,a=f.scrollEl,y=f.stickyClass,h=f.stickyChangeClass,d=f.stuckClass,g=f.verticalPosition,l="bottom"!==g,k=f.applyStyle,m=f.noStyles,v=this.isWin&&(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame)||t,C=this.isWin?window.scrollY||window.pageYOffset:a.scrollTop,S=l&&C<=i&&("sticky"===s||"stuck"===s),w=o<=C&&"sticky"===s;i<C&&C<o&&("default"===s||"stuck"===s)?p.state="sticky":S?p.state="default":w&&(p.state="stuck");var b=n<=C&&C<=o;C<n/2||o<C?p.stateChange="default":b&&(p.stateChange="sticky"),s===p.state&&e===p.stateChange||v(function(){var t,s,e,i,n,o,a={sticky:{styles:((t={position:u,top:"",bottom:""})[g]=f.stickyBitStickyOffset+"px",t),classes:((s={})[y]=!0,s)},default:{styles:((e={})[g]="",e),classes:{}},stuck:{styles:x(((i={})[g]="",i),"fixed"===u&&!m||!c.isWin?{position:"absolute",top:"",bottom:"0"}:{}),classes:((n={})[d]=!0,n)}};"fixed"===u&&(a.default.styles.position="");var l=a[p.state];l.classes=((o={})[d]=!!l.classes[d],o[y]=!!l.classes[y],o[h]=b,o),k(l,r)})},s.applyStyle=function(t,s){var e=t.styles,i=t.classes,n=s.el,o=s.props,a=n.style,l=o.noStyles,r=n.className.split(" ");for(var c in i){if(i[c])-1===r.indexOf(c)&&r.push(c);else{var p=r.indexOf(c);-1!==p&&r.splice(p,1)}}if(n.className=r.join(" "),e.position&&(a.position=e.position),!l)for(var f in e)a[f]=e[f]},s.update=function(e){var i=this;return void 0===e&&(e=null),this.instances.forEach(function(t){if(i.computeScrollOffsets(t),e)for(var s in e)t.props[s]=e[s]}),this},s.removeInstance=function(t){var s,e,i=t.el,n=t.props;this.applyStyle({styles:((s={position:""})[n.verticalPosition]="",s),classes:((e={})[n.stickyClass]="",e[n.stuckClass]="",e)},t),this.toggleClasses(i.parentNode,n.parentClass)},s.cleanup=function(){for(var t=0;t<this.instances.length;t+=1){var s=this.instances[t];s.stateContainer&&s.props.scrollEl.removeEventListener("scroll",s.stateContainer),this.removeInstance(s)}this.manageState=!1,this.instances=[]},t}();if("undefined"!=typeof window){var t=window.$||window.jQuery||window.Zepto;t&&(t.fn.stickybits=function(t){return new s(this,t)})}});
;
/*
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,n=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),i=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-n(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(i-a))<=o?r[r.length-1]=s.add(e):r.push(e),i=a}),r},i=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=i(e);if(o.remove){var n=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.2",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=n,r._parseOptions=i,r._apply=function(e,o){var s=i(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),i=0;if(s.target)i=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),n=e.css("display");"inline-block"!==n&&"flex"!==n&&"inline-flex"!==n&&(n="block");var a={
display:n};a[s.property]="",e.css(a),e.outerHeight(!1)>i&&(i=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),o+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,i-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),n=o.attr("data-mh")||o.attr("data-match-height");n in e?e[n]=e[n].add(o):e[n]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(n,a){if(a&&"resize"===a.type){var i=t(window).width();if(i===e)return;e=i;
}n?o===-1&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi);var h=t.fn.on?"on":"bind";t(window)[h]("load",function(t){r._update(!1,t)}),t(window)[h]("resize orientationchange",function(t){r._update(!0,t)})});;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, once) {
  var deprecatedMessageSuffix = "is deprecated in Drupal 9.3.0 and will be removed in Drupal 10.0.0. Use the core/once library instead. See https://www.drupal.org/node/3158256";
  var originalJQOnce = $.fn.once;
  var originalJQRemoveOnce = $.fn.removeOnce;

  $.fn.once = function jQueryOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.once() ".concat(deprecatedMessageSuffix)
    });
    return originalJQOnce.apply(this, [id]);
  };

  $.fn.removeOnce = function jQueryRemoveOnce(id) {
    Drupal.deprecationError({
      message: "jQuery.removeOnce() ".concat(deprecatedMessageSuffix)
    });
    return originalJQRemoveOnce.apply(this, [id]);
  };

  var drupalOnce = once;

  function augmentedOnce(id, selector, context) {
    originalJQOnce.apply($(selector, context), [id]);
    return drupalOnce(id, selector, context);
  }

  function remove(id, selector, context) {
    originalJQRemoveOnce.apply($(selector, context), [id]);
    return drupalOnce.remove(id, selector, context);
  }

  window.once = Object.assign(augmentedOnce, drupalOnce, {
    remove: remove
  });
})(jQuery, once);;
/**
 * @file
 * External links js file.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.extlink = Drupal.extlink || {};

  Drupal.extlink.attach = function (context, drupalSettings) {
    if (typeof drupalSettings.data === 'undefined' || !drupalSettings.data.hasOwnProperty('extlink')) {
      return;
    }

    // Define the jQuery method (either 'append' or 'prepend') of placing the
    // icon, defaults to 'append'.
    var extIconPlacement = 'append';
    if (drupalSettings.data.extlink.extIconPlacement && drupalSettings.data.extlink.extIconPlacement != '0') {
          extIconPlacement = drupalSettings.data.extlink.extIconPlacement;
        }

    // Strip the host name down, removing ports, subdomains, or www.
    var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$2$3$6');
    var subdomain = window.location.host.replace(host, '');

    // Determine what subdomains are considered internal.
    var subdomains;
    if (drupalSettings.data.extlink.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    }
    else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    }
    else {
      subdomains = subdomain.replace('.', '\\.');
    }

    // Whitelisted domains.
    var whitelistedDomains = false;
    if (drupalSettings.data.extlink.whitelistedDomains) {
      whitelistedDomains = [];
      for (var i = 0; i < drupalSettings.data.extlink.whitelistedDomains.length; i++) {
        whitelistedDomains.push(new RegExp('^https?:\\/\\/' + drupalSettings.data.extlink.whitelistedDomains[i].replace(/(\r\n|\n|\r)/gm,'') + '.*$', 'i'));
      }
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp('^https?://([^@]*@)?' + subdomains + host, 'i');

    // Extra internal link matching.
    var extInclude = false;
    if (drupalSettings.data.extlink.extInclude) {
      extInclude = new RegExp(drupalSettings.data.extlink.extInclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link matching.
    var extExclude = false;
    if (drupalSettings.data.extlink.extExclude) {
      extExclude = new RegExp(drupalSettings.data.extlink.extExclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link CSS selector exclusion.
    var extCssExclude = false;
    if (drupalSettings.data.extlink.extCssExclude) {
      extCssExclude = drupalSettings.data.extlink.extCssExclude;
    }

    // Extra external link CSS selector explicit.
    var extCssExplicit = false;
    if (drupalSettings.data.extlink.extCssExplicit) {
      extCssExplicit = drupalSettings.data.extlink.extCssExplicit;
    }

    // Find all links which are NOT internal and begin with http as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = [];
    var mailto_links = [];
    $('a:not([data-extlink]), area:not([data-extlink])', context).each(function (el) {
      try {
        var url = '';
        if (typeof this.href == 'string') {
          url = this.href.toLowerCase();
        }
        // Handle SVG links (xlink:href).
        else if (typeof this.href == 'object') {
          url = this.href.baseVal;
        }
        if (url.indexOf('http') === 0
          && ((!internal_link.test(url) && !(extExclude && extExclude.test(url))) || (extInclude && extInclude.test(url)))
          && !(extCssExclude && $(this).is(extCssExclude))
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          var match = false;
          if (whitelistedDomains) {
            for (var i = 0; i < whitelistedDomains.length; i++) {
              if (whitelistedDomains[i].test(url)) {
                match = true;
                break;
              }
            }
          }
          if (!match) {
            external_links.push(this);
          }
        }
        // Do not include area tags with begin with mailto: (this prohibits
        // icons from being added to image-maps).
        else if (this.tagName !== 'AREA'
          && url.indexOf('mailto:') === 0
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          mailto_links.push(this);
        }
      }
      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch (error) {
        return false;
      }
    });

    if (drupalSettings.data.extlink.extClass !== '0' && drupalSettings.data.extlink.extClass !== '') {
      Drupal.extlink.applyClassAndSpan(external_links, drupalSettings.data.extlink.extClass, extIconPlacement);
    }

    if (drupalSettings.data.extlink.mailtoClass !== '0' && drupalSettings.data.extlink.mailtoClass !== '') {
      Drupal.extlink.applyClassAndSpan(mailto_links, drupalSettings.data.extlink.mailtoClass, extIconPlacement);
    }

    if (drupalSettings.data.extlink.extTarget) {
      // Apply the target attribute to all links.
      $(external_links).filter(function () {
        // Filter out links with target set if option specified.
        return !(drupalSettings.data.extlink.extTargetNoOverride && $(this).is('a[target]'));
      }).attr({target: '_blank'});

      // Add noopener rel attribute to combat phishing.
      $(external_links).attr('rel', function (i, val) {
        // If no rel attribute is present, create one with the value noopener.
        if (val === null || typeof val === 'undefined') {
          return 'noopener';
        }
        // Check to see if rel contains noopener. Add what doesn't exist.
        if (val.indexOf('noopener') > -1) {
          if (val.indexOf('noopener') === -1) {
            return val + ' noopener';
          }
          // Noopener exists. Nothing needs to be added.
          else {
            return val;
          }
        }
        // Else, append noopener to val.
        else {
          return val + ' noopener';
        }
      });
    }

    if (drupalSettings.data.extlink.extNofollow) {
      $(external_links).attr('rel', function (i, val) {
        // When the link does not have a rel attribute set it to 'nofollow'.
        if (val === null || typeof val === 'undefined') {
          return 'nofollow';
        }
        var target = 'nofollow';
        // Change the target, if not overriding follow.
        if (drupalSettings.data.extlink.extFollowNoOverride) {
          target = 'follow';
        }
        if (val.indexOf(target) === -1) {
          return val + ' nofollow';
        }
        return val;
      });
    }

    if (drupalSettings.data.extlink.extNoreferrer) {
      $(external_links).attr('rel', function (i, val) {
        // When the link does not have a rel attribute set it to 'noreferrer'.
        if (val === null || typeof val === 'undefined') {
          return 'noreferrer';
        }
        if (val.indexOf('noreferrer') === -1) {
          return val + ' noreferrer';
        }
        return val;
      });
    }

    Drupal.extlink = Drupal.extlink || {};

    // Set up default click function for the external links popup. This should be
    // overridden by modules wanting to alter the popup.
    Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function () {
      if (drupalSettings.data.extlink.extAlert) {
        return confirm(drupalSettings.data.extlink.extAlertText);
      }
    };

    $(external_links).off("click.extlink");
    $(external_links).on("click.extlink", function (e) {
      return Drupal.extlink.popupClickHandler(e, this);
    });
  };

  /**
   * Apply a class and a trailing <span> to all links not containing images.
   *
   * @param {object[]} links
   *   An array of DOM elements representing the links.
   * @param {string} class_name
   *   The class to apply to the links.
   * @param {string} icon_placement
   *   'append' or 'prepend' the icon to the link.
   */
  Drupal.extlink.applyClassAndSpan = function (links, class_name, icon_placement) {
    var $links_to_process;
    if (drupalSettings.data.extlink.extImgClass) {
      $links_to_process = $(links);
    }
    else {
      var links_with_images = $(links).find('img, svg').parents('a');
      $links_to_process = $(links).not(links_with_images);
    }

    if (class_name !== '0') {
      $links_to_process.addClass(class_name);
    }

    // Add data-extlink attribute.
    $links_to_process.attr('data-extlink', '');

    var i;
    var length = $links_to_process.length;
    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);
      if (drupalSettings.data.extlink.extUseFontAwesome) {
        if (class_name === drupalSettings.data.extlink.mailtoClass) {
          $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="' + drupalSettings.data.extlink.extFaMailtoClasses + '" aria-label="' + drupalSettings.data.extlink.mailtoLabel + '"></span></span>');
        }
        else {
          $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="' + drupalSettings.data.extlink.extFaLinkClasses + '" aria-label="' + drupalSettings.data.extlink.extLabel + '"></span></span>');
        }
      }
      else {
        if (class_name === drupalSettings.data.extlink.mailtoClass) {
          $link[icon_placement]('<svg focusable="false" class="' + class_name + '" role="img" aria-label="' + drupalSettings.data.extlink.mailtoLabel + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 10 70 20"><metadata><sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/"><sliceSourceBounds y="-8160" x="-8165" width="16389" height="16384" bottomLeftOrigin="true"/><optimizationSettings><targetSettings targetSettingsID="0" fileFormat="PNG24Format"><PNG24Format transparency="true" filtered="false" interlaced="false" noMatteColor="false" matteColor="#FFFFFF"/></targetSettings></optimizationSettings></sfw></metadata><title>' + drupalSettings.data.extlink.mailtoLabel + '</title><path d="M56 14H8c-1.1 0-2 0.9-2 2v32c0 1.1 0.9 2 2 2h48c1.1 0 2-0.9 2-2V16C58 14.9 57.1 14 56 14zM50.5 18L32 33.4 13.5 18H50.5zM10 46V20.3l20.7 17.3C31.1 37.8 31.5 38 32 38s0.9-0.2 1.3-0.5L54 20.3V46H10z"/></svg>');
        }
        else {
          $link[icon_placement]('<svg focusable="false" class="' + class_name + '" role="img" aria-label="' + drupalSettings.data.extlink.extLabel + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40"><metadata><sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/"><sliceSourceBounds y="-8160" x="-8165" width="16389" height="16384" bottomLeftOrigin="true"/><optimizationSettings><targetSettings targetSettingsID="0" fileFormat="PNG24Format"><PNG24Format transparency="true" filtered="false" interlaced="false" noMatteColor="false" matteColor="#FFFFFF"/></targetSettings></optimizationSettings></sfw></metadata><title>' + drupalSettings.data.extlink.extLabel + '</title><path d="M48 26c-1.1 0-2 0.9-2 2v26H10V18h26c1.1 0 2-0.9 2-2s-0.9-2-2-2H8c-1.1 0-2 0.9-2 2v40c0 1.1 0.9 2 2 2h40c1.1 0 2-0.9 2-2V28C50 26.9 49.1 26 48 26z"/><path d="M56 6H44c-1.1 0-2 0.9-2 2s0.9 2 2 2h7.2L30.6 30.6c-0.8 0.8-0.8 2 0 2.8C31 33.8 31.5 34 32 34s1-0.2 1.4-0.6L54 12.8V20c0 1.1 0.9 2 2 2s2-0.9 2-2V8C58 6.9 57.1 6 56 6z"/></svg>');
        }
      }
    }
  };

  Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
  Drupal.behaviors.extlink.attach = function (context, drupalSettings) {
    // Backwards compatibility, for the benefit of modules overriding extlink
    // functionality by defining an "extlinkAttach" global function.
    if (typeof extlinkAttach === 'function') {
      extlinkAttach(context);
    }
    else {
      Drupal.extlink.attach(context, drupalSettings);
    }
  };

})(jQuery, Drupal, drupalSettings);
;
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
jQuery.easing["jswing"] = jQuery.easing["swing"];

jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    );
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    );
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    if (t < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      );
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
      c +
      b
    );
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1)
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d / 2)
      return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
    return (
      jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    );
  },
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
 */
;
/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
	(function (global){
	var topLevel = typeof global !== 'undefined' ? global :
		typeof window !== 'undefined' ? window : {}
	var minDoc = _dereq_(1);
	
	var doccy;
	
	if (typeof document !== 'undefined') {
		doccy = document;
	} else {
		doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
	
		if (!doccy) {
			doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
		}
	}
	
	module.exports = doccy;
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{"1":1}],3:[function(_dereq_,module,exports){
	(function (global){
	var win;
	
	if (typeof window !== "undefined") {
		win = window;
	} else if (typeof global !== "undefined") {
		win = global;
	} else if (typeof self !== "undefined"){
		win = self;
	} else {
		win = {};
	}
	
	module.exports = win;
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],4:[function(_dereq_,module,exports){
	(function (root) {
	
	  // Store setTimeout reference so promise-polyfill will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var setTimeoutFunc = setTimeout;
	
	  function noop() {}
	  
	  // Polyfill for Function.prototype.bind
	  function bind(fn, thisArg) {
		return function () {
		  fn.apply(thisArg, arguments);
		};
	  }
	
	  function Promise(fn) {
		if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
		if (typeof fn !== 'function') throw new TypeError('not a function');
		this._state = 0;
		this._handled = false;
		this._value = undefined;
		this._deferreds = [];
	
		doResolve(fn, this);
	  }
	
	  function handle(self, deferred) {
		while (self._state === 3) {
		  self = self._value;
		}
		if (self._state === 0) {
		  self._deferreds.push(deferred);
		  return;
		}
		self._handled = true;
		Promise._immediateFn(function () {
		  var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
		  if (cb === null) {
			(self._state === 1 ? resolve : reject)(deferred.promise, self._value);
			return;
		  }
		  var ret;
		  try {
			ret = cb(self._value);
		  } catch (e) {
			reject(deferred.promise, e);
			return;
		  }
		  resolve(deferred.promise, ret);
		});
	  }
	
	  function resolve(self, newValue) {
		try {
		  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
		  if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
		  if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
			var then = newValue.then;
			if (newValue instanceof Promise) {
			  self._state = 3;
			  self._value = newValue;
			  finale(self);
			  return;
			} else if (typeof then === 'function') {
			  doResolve(bind(then, newValue), self);
			  return;
			}
		  }
		  self._state = 1;
		  self._value = newValue;
		  finale(self);
		} catch (e) {
		  reject(self, e);
		}
	  }
	
	  function reject(self, newValue) {
		self._state = 2;
		self._value = newValue;
		finale(self);
	  }
	
	  function finale(self) {
		if (self._state === 2 && self._deferreds.length === 0) {
		  Promise._immediateFn(function() {
			if (!self._handled) {
			  Promise._unhandledRejectionFn(self._value);
			}
		  });
		}
	
		for (var i = 0, len = self._deferreds.length; i < len; i++) {
		  handle(self, self._deferreds[i]);
		}
		self._deferreds = null;
	  }
	
	  function Handler(onFulfilled, onRejected, promise) {
		this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
		this.onRejected = typeof onRejected === 'function' ? onRejected : null;
		this.promise = promise;
	  }
	
	  /**
	   * Take a potentially misbehaving resolver function and make sure
	   * onFulfilled and onRejected are only called once.
	   *
	   * Makes no guarantees about asynchrony.
	   */
	  function doResolve(fn, self) {
		var done = false;
		try {
		  fn(function (value) {
			if (done) return;
			done = true;
			resolve(self, value);
		  }, function (reason) {
			if (done) return;
			done = true;
			reject(self, reason);
		  });
		} catch (ex) {
		  if (done) return;
		  done = true;
		  reject(self, ex);
		}
	  }
	
	  Promise.prototype['catch'] = function (onRejected) {
		return this.then(null, onRejected);
	  };
	
	  Promise.prototype.then = function (onFulfilled, onRejected) {
		var prom = new (this.constructor)(noop);
	
		handle(this, new Handler(onFulfilled, onRejected, prom));
		return prom;
	  };
	
	  Promise.all = function (arr) {
		var args = Array.prototype.slice.call(arr);
	
		return new Promise(function (resolve, reject) {
		  if (args.length === 0) return resolve([]);
		  var remaining = args.length;
	
		  function res(i, val) {
			try {
			  if (val && (typeof val === 'object' || typeof val === 'function')) {
				var then = val.then;
				if (typeof then === 'function') {
				  then.call(val, function (val) {
					res(i, val);
				  }, reject);
				  return;
				}
			  }
			  args[i] = val;
			  if (--remaining === 0) {
				resolve(args);
			  }
			} catch (ex) {
			  reject(ex);
			}
		  }
	
		  for (var i = 0; i < args.length; i++) {
			res(i, args[i]);
		  }
		});
	  };
	
	  Promise.resolve = function (value) {
		if (value && typeof value === 'object' && value.constructor === Promise) {
		  return value;
		}
	
		return new Promise(function (resolve) {
		  resolve(value);
		});
	  };
	
	  Promise.reject = function (value) {
		return new Promise(function (resolve, reject) {
		  reject(value);
		});
	  };
	
	  Promise.race = function (values) {
		return new Promise(function (resolve, reject) {
		  for (var i = 0, len = values.length; i < len; i++) {
			values[i].then(resolve, reject);
		  }
		});
	  };
	
	  // Use polyfill for setImmediate for performance gains
	  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
		function (fn) {
		  setTimeoutFunc(fn, 0);
		};
	
	  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
		if (typeof console !== 'undefined' && console) {
		  console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
		}
	  };
	
	  /**
	   * Set the immediate function to execute callbacks
	   * @param fn {function} Function to execute
	   * @deprecated
	   */
	  Promise._setImmediateFn = function _setImmediateFn(fn) {
		Promise._immediateFn = fn;
	  };
	
	  /**
	   * Change the function to execute on unhandled rejection
	   * @param {function} fn Function to execute on unhandled rejection
	   * @deprecated
	   */
	  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
		Promise._unhandledRejectionFn = fn;
	  };
	  
	  if (typeof module !== 'undefined' && module.exports) {
		module.exports = Promise;
	  } else if (!root.Promise) {
		root.Promise = Promise;
	  }
	
	})(this);
	
	},{}],5:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _en = _dereq_(15);
	
	var _general = _dereq_(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var i18n = { lang: 'en', en: _en.EN };
	
	i18n.language = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}
	
		if (args !== null && args !== undefined && args.length) {
	
			if (typeof args[0] !== 'string') {
				throw new TypeError('Language code must be a string value');
			}
	
			if (!/^[a-z]{2,3}((\-|_)[a-z]{2})?$/i.test(args[0])) {
				throw new TypeError('Language code must have format 2-3 letters and. optionally, hyphen, underscore followed by 2 more letters');
			}
	
			i18n.lang = args[0];
	
			if (i18n[args[0]] === undefined) {
				args[1] = args[1] !== null && args[1] !== undefined && _typeof(args[1]) === 'object' ? args[1] : {};
				i18n[args[0]] = !(0, _general.isObjectEmpty)(args[1]) ? args[1] : _en.EN;
			} else if (args[1] !== null && args[1] !== undefined && _typeof(args[1]) === 'object') {
				i18n[args[0]] = args[1];
			}
		}
	
		return i18n.lang;
	};
	
	i18n.t = function (message) {
		var pluralParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	
		if (typeof message === 'string' && message.length) {
	
			var str = void 0,
				pluralForm = void 0;
	
			var language = i18n.language();
	
			var _plural = function _plural(input, number, form) {
	
				if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object' || typeof number !== 'number' || typeof form !== 'number') {
					return input;
				}
	
				var _pluralForms = function () {
					return [function () {
						return arguments.length <= 1 ? undefined : arguments[1];
					}, function () {
						return (arguments.length <= 0 ? undefined : arguments[0]) === 1 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
					}, function () {
						return (arguments.length <= 0 ? undefined : arguments[0]) === 0 || (arguments.length <= 0 ? undefined : arguments[0]) === 1 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 !== 11) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) !== 0) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1 || (arguments.length <= 0 ? undefined : arguments[0]) === 11) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2 || (arguments.length <= 0 ? undefined : arguments[0]) === 12) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) > 2 && (arguments.length <= 0 ? undefined : arguments[0]) < 20) {
							return arguments.length <= 3 ? undefined : arguments[3];
						} else {
							return arguments.length <= 4 ? undefined : arguments[4];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 0 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 > 0 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 < 20) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 !== 11) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return [3];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 !== 11) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) <= 4) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 === 1) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 === 2) {
							return arguments.length <= 3 ? undefined : arguments[3];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 === 3 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 === 4) {
							return arguments.length <= 4 ? undefined : arguments[4];
						} else {
							return arguments.length <= 1 ? undefined : arguments[1];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) > 2 && (arguments.length <= 0 ? undefined : arguments[0]) < 7) {
							return arguments.length <= 3 ? undefined : arguments[3];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) > 6 && (arguments.length <= 0 ? undefined : arguments[0]) < 11) {
							return arguments.length <= 4 ? undefined : arguments[4];
						} else {
							return arguments.length <= 5 ? undefined : arguments[5];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 0) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
							return arguments.length <= 3 ? undefined : arguments[3];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 3 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 <= 10) {
							return arguments.length <= 4 ? undefined : arguments[4];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 11) {
							return arguments.length <= 5 ? undefined : arguments[5];
						} else {
							return arguments.length <= 6 ? undefined : arguments[6];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 0 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 > 1 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 < 11) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 100 > 10 && (arguments.length <= 0 ? undefined : arguments[0]) % 100 < 20) {
							return arguments.length <= 3 ? undefined : arguments[3];
						} else {
							return arguments.length <= 4 ? undefined : arguments[4];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 === 2) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}, function () {
						return (arguments.length <= 0 ? undefined : arguments[0]) !== 11 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 === 1 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) % 10 >= 2 && (arguments.length <= 0 ? undefined : arguments[0]) % 10 <= 4 && ((arguments.length <= 0 ? undefined : arguments[0]) % 100 < 10 || (arguments.length <= 0 ? undefined : arguments[0]) % 100 >= 20)) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) !== 8 && (arguments.length <= 0 ? undefined : arguments[0]) !== 11) {
							return arguments.length <= 3 ? undefined : arguments[3];
						} else {
							return arguments.length <= 4 ? undefined : arguments[4];
						}
					}, function () {
						return (arguments.length <= 0 ? undefined : arguments[0]) === 0 ? arguments.length <= 1 ? undefined : arguments[1] : arguments.length <= 2 ? undefined : arguments[2];
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 2) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 3) {
							return arguments.length <= 3 ? undefined : arguments[3];
						} else {
							return arguments.length <= 4 ? undefined : arguments[4];
						}
					}, function () {
						if ((arguments.length <= 0 ? undefined : arguments[0]) === 0) {
							return arguments.length <= 1 ? undefined : arguments[1];
						} else if ((arguments.length <= 0 ? undefined : arguments[0]) === 1) {
							return arguments.length <= 2 ? undefined : arguments[2];
						} else {
							return arguments.length <= 3 ? undefined : arguments[3];
						}
					}];
				}();
	
				return _pluralForms[form].apply(null, [number].concat(input));
			};
	
			if (i18n[language] !== undefined) {
				str = i18n[language][message];
				if (pluralParam !== null && typeof pluralParam === 'number') {
					pluralForm = i18n[language]['mejs.plural-form'];
					str = _plural.apply(null, [str, pluralParam, pluralForm]);
				}
			}
	
			if (!str && i18n.en) {
				str = i18n.en[message];
				if (pluralParam !== null && typeof pluralParam === 'number') {
					pluralForm = i18n.en['mejs.plural-form'];
					str = _plural.apply(null, [str, pluralParam, pluralForm]);
				}
			}
	
			str = str || message;
	
			if (pluralParam !== null && typeof pluralParam === 'number') {
				str = str.replace('%1', pluralParam);
			}
	
			return (0, _general.escapeHTML)(str);
		}
	
		return message;
	};
	
	_mejs2.default.i18n = i18n;
	
	if (typeof mejsL10n !== 'undefined') {
		_mejs2.default.i18n.language(mejsL10n.language, mejsL10n.strings);
	}
	
	exports.default = i18n;
	
	},{"15":15,"27":27,"7":7}],6:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _general = _dereq_(27);
	
	var _media2 = _dereq_(28);
	
	var _renderer = _dereq_(8);
	
	var _constants = _dereq_(25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MediaElement = function MediaElement(idOrNode, options, sources) {
		var _this = this;
	
		_classCallCheck(this, MediaElement);
	
		var t = this;
	
		sources = Array.isArray(sources) ? sources : null;
	
		t.defaults = {
			renderers: [],
	
			fakeNodeName: 'mediaelementwrapper',
	
			pluginPath: 'build/',
	
			shimScriptAccess: 'sameDomain'
		};
	
		options = Object.assign(t.defaults, options);
	
		t.mediaElement = _document2.default.createElement(options.fakeNodeName);
	
		var id = idOrNode,
			error = false;
	
		if (typeof idOrNode === 'string') {
			t.mediaElement.originalNode = _document2.default.getElementById(idOrNode);
		} else {
			t.mediaElement.originalNode = idOrNode;
			id = idOrNode.id;
		}
	
		if (t.mediaElement.originalNode === undefined || t.mediaElement.originalNode === null) {
			return null;
		}
	
		t.mediaElement.options = options;
		id = id || 'mejs_' + Math.random().toString().slice(2);
	
		t.mediaElement.originalNode.setAttribute('id', id + '_from_mejs');
	
		var tagName = t.mediaElement.originalNode.tagName.toLowerCase();
		if (['video', 'audio'].indexOf(tagName) > -1 && !t.mediaElement.originalNode.getAttribute('preload')) {
			t.mediaElement.originalNode.setAttribute('preload', 'none');
		}
	
		t.mediaElement.originalNode.parentNode.insertBefore(t.mediaElement, t.mediaElement.originalNode);
	
		t.mediaElement.appendChild(t.mediaElement.originalNode);
	
		var processURL = function processURL(url, type) {
			if (_window2.default.location.protocol === 'https:' && url.indexOf('http:') === 0 && _constants.IS_IOS && _mejs2.default.html5media.mediaTypes.indexOf(type) > -1) {
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (this.readyState === 4 && this.status === 200) {
						var _url = _window2.default.URL || _window2.default.webkitURL,
							blobUrl = _url.createObjectURL(this.response);
						t.mediaElement.originalNode.setAttribute('src', blobUrl);
						return blobUrl;
					}
					return url;
				};
				xhr.open('GET', url);
				xhr.responseType = 'blob';
				xhr.send();
			}
	
			return url;
		};
	
		var mediaFiles = void 0;
	
		if (sources !== null) {
			mediaFiles = sources;
		} else if (t.mediaElement.originalNode !== null) {
	
			mediaFiles = [];
	
			switch (t.mediaElement.originalNode.nodeName.toLowerCase()) {
				case 'iframe':
					mediaFiles.push({
						type: '',
						src: t.mediaElement.originalNode.getAttribute('src')
					});
					break;
				case 'audio':
				case 'video':
					var _sources = t.mediaElement.originalNode.children.length,
						nodeSource = t.mediaElement.originalNode.getAttribute('src');
	
					if (nodeSource) {
						var node = t.mediaElement.originalNode,
							type = (0, _media2.formatType)(nodeSource, node.getAttribute('type'));
						mediaFiles.push({
							type: type,
							src: processURL(nodeSource, type)
						});
					}
	
					for (var i = 0; i < _sources; i++) {
						var n = t.mediaElement.originalNode.children[i];
						if (n.tagName.toLowerCase() === 'source') {
							var src = n.getAttribute('src'),
								_type = (0, _media2.formatType)(src, n.getAttribute('type'));
							mediaFiles.push({ type: _type, src: processURL(src, _type) });
						}
					}
					break;
			}
		}
	
		t.mediaElement.id = id;
		t.mediaElement.renderers = {};
		t.mediaElement.events = {};
		t.mediaElement.promises = [];
		t.mediaElement.renderer = null;
		t.mediaElement.rendererName = null;
	
		t.mediaElement.changeRenderer = function (rendererName, mediaFiles) {
	
			var t = _this,
				media = Object.keys(mediaFiles[0]).length > 2 ? mediaFiles[0] : mediaFiles[0].src;
	
			if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null && t.mediaElement.renderer.name === rendererName) {
				t.mediaElement.renderer.pause();
				if (t.mediaElement.renderer.stop) {
					t.mediaElement.renderer.stop();
				}
				t.mediaElement.renderer.show();
				t.mediaElement.renderer.setSrc(media);
				return true;
			}
	
			if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null) {
				t.mediaElement.renderer.pause();
				if (t.mediaElement.renderer.stop) {
					t.mediaElement.renderer.stop();
				}
				t.mediaElement.renderer.hide();
			}
	
			var newRenderer = t.mediaElement.renderers[rendererName],
				newRendererType = null;
	
			if (newRenderer !== undefined && newRenderer !== null) {
				newRenderer.show();
				newRenderer.setSrc(media);
				t.mediaElement.renderer = newRenderer;
				t.mediaElement.rendererName = rendererName;
				return true;
			}
	
			var rendererArray = t.mediaElement.options.renderers.length ? t.mediaElement.options.renderers : _renderer.renderer.order;
	
			for (var _i = 0, total = rendererArray.length; _i < total; _i++) {
				var index = rendererArray[_i];
	
				if (index === rendererName) {
					var rendererList = _renderer.renderer.renderers;
					newRendererType = rendererList[index];
	
					var renderOptions = Object.assign(newRendererType.options, t.mediaElement.options);
					newRenderer = newRendererType.create(t.mediaElement, renderOptions, mediaFiles);
					newRenderer.name = rendererName;
	
					t.mediaElement.renderers[newRendererType.name] = newRenderer;
					t.mediaElement.renderer = newRenderer;
					t.mediaElement.rendererName = rendererName;
					newRenderer.show();
					return true;
				}
			}
	
			return false;
		};
	
		t.mediaElement.setSize = function (width, height) {
			if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null) {
				t.mediaElement.renderer.setSize(width, height);
			}
		};
	
		t.mediaElement.generateError = function (message, urlList) {
			message = message || '';
			urlList = Array.isArray(urlList) ? urlList : [];
			var event = (0, _general.createEvent)('error', t.mediaElement);
			event.message = message;
			event.urls = urlList;
			t.mediaElement.dispatchEvent(event);
			error = true;
		};
	
		var props = _mejs2.default.html5media.properties,
			methods = _mejs2.default.html5media.methods,
			addProperty = function addProperty(obj, name, onGet, onSet) {
			var oldValue = obj[name];
			var getFn = function getFn() {
				return onGet.apply(obj, [oldValue]);
			},
				setFn = function setFn(newValue) {
				oldValue = onSet.apply(obj, [newValue]);
				return oldValue;
			};
	
			Object.defineProperty(obj, name, {
				get: getFn,
				set: setFn
			});
		},
			assignGettersSetters = function assignGettersSetters(propName) {
			if (propName !== 'src') {
	
				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1),
					getFn = function getFn() {
					return t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer['get' + capName] === 'function' ? t.mediaElement.renderer['get' + capName]() : null;
				},
					setFn = function setFn(value) {
					if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer['set' + capName] === 'function') {
						t.mediaElement.renderer['set' + capName](value);
					}
				};
	
				addProperty(t.mediaElement, propName, getFn, setFn);
				t.mediaElement['get' + capName] = getFn;
				t.mediaElement['set' + capName] = setFn;
			}
		},
			getSrc = function getSrc() {
			return t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null ? t.mediaElement.renderer.getSrc() : null;
		},
			setSrc = function setSrc(value) {
			var mediaFiles = [];
	
			if (typeof value === 'string') {
				mediaFiles.push({
					src: value,
					type: value ? (0, _media2.getTypeFromFile)(value) : ''
				});
			} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.src !== undefined) {
				var _src = (0, _media2.absolutizeUrl)(value.src),
					_type2 = value.type,
					media = Object.assign(value, {
					src: _src,
					type: (_type2 === '' || _type2 === null || _type2 === undefined) && _src ? (0, _media2.getTypeFromFile)(_src) : _type2
				});
				mediaFiles.push(media);
			} else if (Array.isArray(value)) {
				for (var _i2 = 0, total = value.length; _i2 < total; _i2++) {
	
					var _src2 = (0, _media2.absolutizeUrl)(value[_i2].src),
						_type3 = value[_i2].type,
						_media = Object.assign(value[_i2], {
						src: _src2,
						type: (_type3 === '' || _type3 === null || _type3 === undefined) && _src2 ? (0, _media2.getTypeFromFile)(_src2) : _type3
					});
	
					mediaFiles.push(_media);
				}
			}
	
			var renderInfo = _renderer.renderer.select(mediaFiles, t.mediaElement.options.renderers.length ? t.mediaElement.options.renderers : []),
				event = void 0;
	
			if (!t.mediaElement.paused && !(t.mediaElement.src == null || t.mediaElement.src === '')) {
				t.mediaElement.pause();
				event = (0, _general.createEvent)('pause', t.mediaElement);
				t.mediaElement.dispatchEvent(event);
			}
			t.mediaElement.originalNode.src = mediaFiles[0].src || '';
	
			if (renderInfo === null && mediaFiles[0].src) {
				t.mediaElement.generateError('No renderer found', mediaFiles);
				return;
			}
	
			var shouldChangeRenderer = !(mediaFiles[0].src == null || mediaFiles[0].src === '');
			return shouldChangeRenderer ? t.mediaElement.changeRenderer(renderInfo.rendererName, mediaFiles) : null;
		},
			triggerAction = function triggerAction(methodName, args) {
			try {
				if (methodName === 'play' && (t.mediaElement.rendererName === 'native_dash' || t.mediaElement.rendererName === 'native_hls' || t.mediaElement.rendererName === 'vimeo_iframe')) {
					var response = t.mediaElement.renderer[methodName](args);
					if (response && typeof response.then === 'function') {
						response.catch(function () {
							if (t.mediaElement.paused) {
								setTimeout(function () {
									var tmpResponse = t.mediaElement.renderer.play();
									if (tmpResponse !== undefined) {
										tmpResponse.catch(function () {
											if (!t.mediaElement.renderer.paused) {
												t.mediaElement.renderer.pause();
											}
										});
									}
								}, 150);
							}
						});
					}
				} else {
					t.mediaElement.renderer[methodName](args);
				}
			} catch (e) {
				t.mediaElement.generateError(e, mediaFiles);
			}
		},
			assignMethods = function assignMethods(methodName) {
			t.mediaElement[methodName] = function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				if (t.mediaElement.renderer !== undefined && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer[methodName] === 'function') {
					if (t.mediaElement.promises.length) {
						Promise.all(t.mediaElement.promises).then(function () {
							triggerAction(methodName, args);
						}).catch(function (e) {
							t.mediaElement.generateError(e, mediaFiles);
						});
					} else {
						triggerAction(methodName, args);
					}
				}
				return null;
			};
		};
	
		addProperty(t.mediaElement, 'src', getSrc, setSrc);
		t.mediaElement.getSrc = getSrc;
		t.mediaElement.setSrc = setSrc;
	
		for (var _i3 = 0, total = props.length; _i3 < total; _i3++) {
			assignGettersSetters(props[_i3]);
		}
	
		for (var _i4 = 0, _total = methods.length; _i4 < _total; _i4++) {
			assignMethods(methods[_i4]);
		}
	
		t.mediaElement.addEventListener = function (eventName, callback) {
			t.mediaElement.events[eventName] = t.mediaElement.events[eventName] || [];
	
			t.mediaElement.events[eventName].push(callback);
		};
		t.mediaElement.removeEventListener = function (eventName, callback) {
			if (!eventName) {
				t.mediaElement.events = {};
				return true;
			}
	
			var callbacks = t.mediaElement.events[eventName];
	
			if (!callbacks) {
				return true;
			}
	
			if (!callback) {
				t.mediaElement.events[eventName] = [];
				return true;
			}
	
			for (var _i5 = 0; _i5 < callbacks.length; _i5++) {
				if (callbacks[_i5] === callback) {
					t.mediaElement.events[eventName].splice(_i5, 1);
					return true;
				}
			}
			return false;
		};
	
		t.mediaElement.dispatchEvent = function (event) {
			var callbacks = t.mediaElement.events[event.type];
			if (callbacks) {
				for (var _i6 = 0; _i6 < callbacks.length; _i6++) {
					callbacks[_i6].apply(null, [event]);
				}
			}
		};
	
		t.mediaElement.destroy = function () {
			var mediaElement = t.mediaElement.originalNode.cloneNode(true);
			var wrapper = t.mediaElement.parentElement;
			mediaElement.removeAttribute('id');
			mediaElement.remove();
			t.mediaElement.remove();
			wrapper.appendChild(mediaElement);
		};
	
		if (mediaFiles.length) {
			t.mediaElement.src = mediaFiles;
		}
	
		if (t.mediaElement.promises.length) {
			Promise.all(t.mediaElement.promises).then(function () {
				if (t.mediaElement.options.success) {
					t.mediaElement.options.success(t.mediaElement, t.mediaElement.originalNode);
				}
			}).catch(function () {
				if (error && t.mediaElement.options.error) {
					t.mediaElement.options.error(t.mediaElement, t.mediaElement.originalNode);
				}
			});
		} else {
			if (t.mediaElement.options.success) {
				t.mediaElement.options.success(t.mediaElement, t.mediaElement.originalNode);
			}
	
			if (error && t.mediaElement.options.error) {
				t.mediaElement.options.error(t.mediaElement, t.mediaElement.originalNode);
			}
		}
	
		return t.mediaElement;
	};
	
	_window2.default.MediaElement = MediaElement;
	_mejs2.default.MediaElement = MediaElement;
	
	exports.default = MediaElement;
	
	},{"2":2,"25":25,"27":27,"28":28,"3":3,"7":7,"8":8}],7:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mejs = {};
	
	mejs.version = '4.2.16';
	
	mejs.html5media = {
		properties: ['volume', 'src', 'currentTime', 'muted', 'duration', 'paused', 'ended', 'buffered', 'error', 'networkState', 'readyState', 'seeking', 'seekable', 'currentSrc', 'preload', 'bufferedBytes', 'bufferedTime', 'initialTime', 'startOffsetTime', 'defaultPlaybackRate', 'playbackRate', 'played', 'autoplay', 'loop', 'controls'],
		readOnlyProperties: ['duration', 'paused', 'ended', 'buffered', 'error', 'networkState', 'readyState', 'seeking', 'seekable'],
	
		methods: ['load', 'play', 'pause', 'canPlayType'],
	
		events: ['loadstart', 'durationchange', 'loadedmetadata', 'loadeddata', 'progress', 'canplay', 'canplaythrough', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'play', 'playing', 'pause', 'waiting', 'seeking', 'seeked', 'timeupdate', 'ended', 'ratechange', 'volumechange'],
	
		mediaTypes: ['audio/mp3', 'audio/ogg', 'audio/oga', 'audio/wav', 'audio/x-wav', 'audio/wave', 'audio/x-pn-wav', 'audio/mpeg', 'audio/mp4', 'video/mp4', 'video/webm', 'video/ogg', 'video/ogv']
	};
	
	_window2.default.mejs = mejs;
	
	exports.default = mejs;
	
	},{"3":3}],8:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.renderer = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Renderer = function () {
		function Renderer() {
			_classCallCheck(this, Renderer);
	
			this.renderers = {};
			this.order = [];
		}
	
		_createClass(Renderer, [{
			key: 'add',
			value: function add(renderer) {
				if (renderer.name === undefined) {
					throw new TypeError('renderer must contain at least `name` property');
				}
	
				this.renderers[renderer.name] = renderer;
				this.order.push(renderer.name);
			}
		}, {
			key: 'select',
			value: function select(mediaFiles) {
				var renderers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
				var renderersLength = renderers.length;
	
				renderers = renderers.length ? renderers : this.order;
	
				if (!renderersLength) {
					var rendererIndicator = [/^(html5|native)/i, /^flash/i, /iframe$/i],
						rendererRanking = function rendererRanking(renderer) {
						for (var i = 0, total = rendererIndicator.length; i < total; i++) {
							if (rendererIndicator[i].test(renderer)) {
								return i;
							}
						}
						return rendererIndicator.length;
					};
	
					renderers.sort(function (a, b) {
						return rendererRanking(a) - rendererRanking(b);
					});
				}
	
				for (var i = 0, total = renderers.length; i < total; i++) {
					var key = renderers[i],
						_renderer = this.renderers[key];
	
					if (_renderer !== null && _renderer !== undefined) {
						for (var j = 0, jl = mediaFiles.length; j < jl; j++) {
							if (typeof _renderer.canPlayType === 'function' && typeof mediaFiles[j].type === 'string' && _renderer.canPlayType(mediaFiles[j].type)) {
								return {
									rendererName: _renderer.name,
									src: mediaFiles[j].src
								};
							}
						}
					}
				}
	
				return null;
			}
		}, {
			key: 'order',
			set: function set(order) {
				if (!Array.isArray(order)) {
					throw new TypeError('order must be an array of strings.');
				}
	
				this._order = order;
			},
			get: function get() {
				return this._order;
			}
		}, {
			key: 'renderers',
			set: function set(renderers) {
				if (renderers !== null && (typeof renderers === 'undefined' ? 'undefined' : _typeof(renderers)) !== 'object') {
					throw new TypeError('renderers must be an array of objects.');
				}
	
				this._renderers = renderers;
			},
			get: function get() {
				return this._renderers;
			}
		}]);
	
		return Renderer;
	}();
	
	var renderer = exports.renderer = new Renderer();
	
	_mejs2.default.Renderers = renderer;
	
	},{"7":7}],9:[function(_dereq_,module,exports){
	'use strict';
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _i18n = _dereq_(5);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _player = _dereq_(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _constants = _dereq_(25);
	
	var Features = _interopRequireWildcard(_constants);
	
	var _general = _dereq_(27);
	
	var _dom = _dereq_(26);
	
	var _media = _dereq_(28);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.assign(_player.config, {
		usePluginFullScreen: true,
	
		fullscreenText: null,
	
		useFakeFullscreen: false
	});
	
	Object.assign(_player2.default.prototype, {
		isFullScreen: false,
	
		isNativeFullScreen: false,
	
		isInIframe: false,
	
		isPluginClickThroughCreated: false,
	
		fullscreenMode: '',
	
		containerSizeTimeout: null,
	
		buildfullscreen: function buildfullscreen(player) {
			if (!player.isVideo) {
				return;
			}
	
			player.isInIframe = _window2.default.location !== _window2.default.parent.location;
	
			player.detectFullscreenMode();
	
			var t = this,
				fullscreenTitle = (0, _general.isString)(t.options.fullscreenText) ? t.options.fullscreenText : _i18n2.default.t('mejs.fullscreen'),
				fullscreenBtn = _document2.default.createElement('div');
	
			fullscreenBtn.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'fullscreen-button';
			fullscreenBtn.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + fullscreenTitle + '" aria-label="' + fullscreenTitle + '" tabindex="0"></button>';
			t.addControlElement(fullscreenBtn, 'fullscreen');
	
			fullscreenBtn.addEventListener('click', function () {
				var isFullScreen = Features.HAS_TRUE_NATIVE_FULLSCREEN && Features.IS_FULLSCREEN || player.isFullScreen;
	
				if (isFullScreen) {
					player.exitFullScreen();
				} else {
					player.enterFullScreen();
				}
			});
	
			player.fullscreenBtn = fullscreenBtn;
	
			t.options.keyActions.push({
				keys: [70],
				action: function action(player, media, key, event) {
					if (!event.ctrlKey) {
						if (typeof player.enterFullScreen !== 'undefined') {
							if (player.isFullScreen) {
								player.exitFullScreen();
							} else {
								player.enterFullScreen();
							}
						}
					}
				}
			});
	
			t.exitFullscreenCallback = function (e) {
				var key = e.which || e.keyCode || 0;
				if (t.options.enableKeyboard && key === 27 && (Features.HAS_TRUE_NATIVE_FULLSCREEN && Features.IS_FULLSCREEN || t.isFullScreen)) {
					player.exitFullScreen();
				}
			};
	
			t.globalBind('keydown', t.exitFullscreenCallback);
	
			t.normalHeight = 0;
			t.normalWidth = 0;
	
			if (Features.HAS_TRUE_NATIVE_FULLSCREEN) {
				var fullscreenChanged = function fullscreenChanged() {
					if (player.isFullScreen) {
						if (Features.isFullScreen()) {
							player.isNativeFullScreen = true;
	
							player.setControlsSize();
						} else {
							player.isNativeFullScreen = false;
	
							player.exitFullScreen();
						}
					}
				};
	
				player.globalBind(Features.FULLSCREEN_EVENT_NAME, fullscreenChanged);
			}
		},
		cleanfullscreen: function cleanfullscreen(player) {
			player.exitFullScreen();
			player.globalUnbind('keydown', player.exitFullscreenCallback);
		},
		detectFullscreenMode: function detectFullscreenMode() {
			var t = this,
				isNative = t.media.rendererName !== null && /(native|html5)/i.test(t.media.rendererName);
	
			var mode = '';
	
			if (Features.HAS_TRUE_NATIVE_FULLSCREEN && isNative) {
				mode = 'native-native';
			} else if (Features.HAS_TRUE_NATIVE_FULLSCREEN && !isNative) {
				mode = 'plugin-native';
			} else if (t.usePluginFullScreen && Features.SUPPORT_POINTER_EVENTS) {
				mode = 'plugin-click';
			}
	
			t.fullscreenMode = mode;
			return mode;
		},
		enterFullScreen: function enterFullScreen() {
			var t = this,
				isNative = t.media.rendererName !== null && /(html5|native)/i.test(t.media.rendererName),
				containerStyles = getComputedStyle(t.getElement(t.container));
	
			if (!t.isVideo) {
				return;
			}
	
			if (t.options.useFakeFullscreen === false && Features.IS_IOS && Features.HAS_IOS_FULLSCREEN && typeof t.media.originalNode.webkitEnterFullscreen === 'function' && t.media.originalNode.canPlayType((0, _media.getTypeFromFile)(t.media.getSrc()))) {
				t.media.originalNode.webkitEnterFullscreen();
				return;
			}
	
			(0, _dom.addClass)(_document2.default.documentElement, t.options.classPrefix + 'fullscreen');
			(0, _dom.addClass)(t.getElement(t.container), t.options.classPrefix + 'container-fullscreen');
	
			t.normalHeight = parseFloat(containerStyles.height);
			t.normalWidth = parseFloat(containerStyles.width);
	
			if (t.fullscreenMode === 'native-native' || t.fullscreenMode === 'plugin-native') {
				Features.requestFullScreen(t.getElement(t.container));
	
				if (t.isInIframe) {
					setTimeout(function checkFullscreen() {
	
						if (t.isNativeFullScreen) {
							var percentErrorMargin = 0.002,
								windowWidth = _window2.default.innerWidth || _document2.default.documentElement.clientWidth || _document2.default.body.clientWidth,
								screenWidth = screen.width,
								absDiff = Math.abs(screenWidth - windowWidth),
								marginError = screenWidth * percentErrorMargin;
	
							if (absDiff > marginError) {
								t.exitFullScreen();
							} else {
								setTimeout(checkFullscreen, 500);
							}
						}
					}, 1000);
				}
			}
	
			t.getElement(t.container).style.width = '100%';
			t.getElement(t.container).style.height = '100%';
	
			t.containerSizeTimeout = setTimeout(function () {
				t.getElement(t.container).style.width = '100%';
				t.getElement(t.container).style.height = '100%';
				t.setControlsSize();
			}, 500);
	
			if (isNative) {
				t.node.style.width = '100%';
				t.node.style.height = '100%';
			} else {
				var elements = t.getElement(t.container).querySelectorAll('embed, object, video'),
					_total = elements.length;
				for (var i = 0; i < _total; i++) {
					elements[i].style.width = '100%';
					elements[i].style.height = '100%';
				}
			}
	
			if (t.options.setDimensions && typeof t.media.setSize === 'function') {
				t.media.setSize(screen.width, screen.height);
			}
	
			var layers = t.getElement(t.layers).children,
				total = layers.length;
			for (var _i = 0; _i < total; _i++) {
				layers[_i].style.width = '100%';
				layers[_i].style.height = '100%';
			}
	
			if (t.fullscreenBtn) {
				(0, _dom.removeClass)(t.fullscreenBtn, t.options.classPrefix + 'fullscreen');
				(0, _dom.addClass)(t.fullscreenBtn, t.options.classPrefix + 'unfullscreen');
			}
	
			t.setControlsSize();
			t.isFullScreen = true;
	
			var zoomFactor = Math.min(screen.width / t.width, screen.height / t.height),
				captionText = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'captions-text');
			if (captionText) {
				captionText.style.fontSize = zoomFactor * 100 + '%';
				captionText.style.lineHeight = 'normal';
				t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'captions-position').style.bottom = (screen.height - t.normalHeight) / 2 - t.getElement(t.controls).offsetHeight / 2 + zoomFactor + 15 + 'px';
			}
			var event = (0, _general.createEvent)('enteredfullscreen', t.getElement(t.container));
			t.getElement(t.container).dispatchEvent(event);
		},
		exitFullScreen: function exitFullScreen() {
			var t = this,
				isNative = t.media.rendererName !== null && /(native|html5)/i.test(t.media.rendererName);
	
			if (!t.isVideo) {
				return;
			}
	
			clearTimeout(t.containerSizeTimeout);
	
			if (Features.HAS_TRUE_NATIVE_FULLSCREEN && (Features.IS_FULLSCREEN || t.isFullScreen)) {
				Features.cancelFullScreen();
			}
	
			(0, _dom.removeClass)(_document2.default.documentElement, t.options.classPrefix + 'fullscreen');
			(0, _dom.removeClass)(t.getElement(t.container), t.options.classPrefix + 'container-fullscreen');
	
			if (t.options.setDimensions) {
				t.getElement(t.container).style.width = t.normalWidth + 'px';
				t.getElement(t.container).style.height = t.normalHeight + 'px';
	
				if (isNative) {
					t.node.style.width = t.normalWidth + 'px';
					t.node.style.height = t.normalHeight + 'px';
				} else {
					var elements = t.getElement(t.container).querySelectorAll('embed, object, video'),
						_total2 = elements.length;
					for (var i = 0; i < _total2; i++) {
						elements[i].style.width = t.normalWidth + 'px';
						elements[i].style.height = t.normalHeight + 'px';
					}
				}
	
				if (typeof t.media.setSize === 'function') {
					t.media.setSize(t.normalWidth, t.normalHeight);
				}
	
				var layers = t.getElement(t.layers).children,
					total = layers.length;
				for (var _i2 = 0; _i2 < total; _i2++) {
					layers[_i2].style.width = t.normalWidth + 'px';
					layers[_i2].style.height = t.normalHeight + 'px';
				}
			}
	
			if (t.fullscreenBtn) {
				(0, _dom.removeClass)(t.fullscreenBtn, t.options.classPrefix + 'unfullscreen');
				(0, _dom.addClass)(t.fullscreenBtn, t.options.classPrefix + 'fullscreen');
			}
	
			t.setControlsSize();
			t.isFullScreen = false;
	
			var captionText = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'captions-text');
			if (captionText) {
				captionText.style.fontSize = '';
				captionText.style.lineHeight = '';
				t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'captions-position').style.bottom = '';
			}
			var event = (0, _general.createEvent)('exitedfullscreen', t.getElement(t.container));
			t.getElement(t.container).dispatchEvent(event);
		}
	});
	
	},{"16":16,"2":2,"25":25,"26":26,"27":27,"28":28,"3":3,"5":5}],10:[function(_dereq_,module,exports){
	'use strict';
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _player = _dereq_(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _i18n = _dereq_(5);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _general = _dereq_(27);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.assign(_player.config, {
		playText: null,
	
		pauseText: null
	});
	
	Object.assign(_player2.default.prototype, {
		buildplaypause: function buildplaypause(player, controls, layers, media) {
			var t = this,
				op = t.options,
				playTitle = (0, _general.isString)(op.playText) ? op.playText : _i18n2.default.t('mejs.play'),
				pauseTitle = (0, _general.isString)(op.pauseText) ? op.pauseText : _i18n2.default.t('mejs.pause'),
				play = _document2.default.createElement('div');
	
			play.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'playpause-button ' + t.options.classPrefix + 'play';
			play.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + playTitle + '" aria-label="' + pauseTitle + '" tabindex="0"></button>';
			play.addEventListener('click', function () {
				if (t.paused) {
					t.play();
				} else {
					t.pause();
				}
			});
	
			var playBtn = play.querySelector('button');
			t.addControlElement(play, 'playpause');
	
			function togglePlayPause(which) {
				if ('play' === which) {
					(0, _dom.removeClass)(play, t.options.classPrefix + 'play');
					(0, _dom.removeClass)(play, t.options.classPrefix + 'replay');
					(0, _dom.addClass)(play, t.options.classPrefix + 'pause');
					playBtn.setAttribute('title', pauseTitle);
					playBtn.setAttribute('aria-label', pauseTitle);
				} else {
	
					(0, _dom.removeClass)(play, t.options.classPrefix + 'pause');
					(0, _dom.removeClass)(play, t.options.classPrefix + 'replay');
					(0, _dom.addClass)(play, t.options.classPrefix + 'play');
					playBtn.setAttribute('title', playTitle);
					playBtn.setAttribute('aria-label', playTitle);
				}
			}
	
			togglePlayPause('pse');
	
			media.addEventListener('loadedmetadata', function () {
				if (media.rendererName.indexOf('flash') === -1) {
					togglePlayPause('pse');
				}
			});
			media.addEventListener('play', function () {
				togglePlayPause('play');
			});
			media.addEventListener('playing', function () {
				togglePlayPause('play');
			});
			media.addEventListener('pause', function () {
				togglePlayPause('pse');
			});
			media.addEventListener('ended', function () {
				if (!player.options.loop) {
					(0, _dom.removeClass)(play, t.options.classPrefix + 'pause');
					(0, _dom.removeClass)(play, t.options.classPrefix + 'play');
					(0, _dom.addClass)(play, t.options.classPrefix + 'replay');
					playBtn.setAttribute('title', playTitle);
					playBtn.setAttribute('aria-label', playTitle);
				}
			});
		}
	});
	
	},{"16":16,"2":2,"26":26,"27":27,"5":5}],11:[function(_dereq_,module,exports){
	'use strict';
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _player = _dereq_(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _i18n = _dereq_(5);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _constants = _dereq_(25);
	
	var _time = _dereq_(30);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.assign(_player.config, {
		enableProgressTooltip: true,
	
		useSmoothHover: true,
	
		forceLive: false
	});
	
	Object.assign(_player2.default.prototype, {
		buildprogress: function buildprogress(player, controls, layers, media) {
	
			var lastKeyPressTime = 0,
				mouseIsDown = false,
				startedPaused = false;
	
			var t = this,
				autoRewindInitial = player.options.autoRewind,
				tooltip = player.options.enableProgressTooltip ? '<span class="' + t.options.classPrefix + 'time-float">' + ('<span class="' + t.options.classPrefix + 'time-float-current">00:00</span>') + ('<span class="' + t.options.classPrefix + 'time-float-corner"></span>') + '</span>' : '',
				rail = _document2.default.createElement('div');
	
			rail.className = t.options.classPrefix + 'time-rail';
			rail.innerHTML = '<span class="' + t.options.classPrefix + 'time-total ' + t.options.classPrefix + 'time-slider">' + ('<span class="' + t.options.classPrefix + 'time-buffering"></span>') + ('<span class="' + t.options.classPrefix + 'time-loaded"></span>') + ('<span class="' + t.options.classPrefix + 'time-current"></span>') + ('<span class="' + t.options.classPrefix + 'time-hovered no-hover"></span>') + ('<span class="' + t.options.classPrefix + 'time-handle"><span class="' + t.options.classPrefix + 'time-handle-content"></span></span>') + ('' + tooltip) + '</span>';
	
			t.addControlElement(rail, 'progress');
	
			t.options.keyActions.push({
				keys: [37, 227],
				action: function action(player) {
					if (!isNaN(player.duration) && player.duration > 0) {
						if (player.isVideo) {
							player.showControls();
							player.startControlsTimer();
						}
	
						var timeSlider = player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'time-total');
						if (timeSlider) {
							timeSlider.focus();
						}
	
						var newTime = Math.max(player.currentTime - player.options.defaultSeekBackwardInterval(player), 0);
	
						if (!player.paused) {
							player.pause();
						}
	
						setTimeout(function () {
							player.setCurrentTime(newTime);
						}, 0);
	
						setTimeout(function () {
							player.play();
						}, 0);
					}
				}
			}, {
				keys: [39, 228],
				action: function action(player) {
	
					if (!isNaN(player.duration) && player.duration > 0) {
						if (player.isVideo) {
							player.showControls();
							player.startControlsTimer();
						}
	
						var timeSlider = player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'time-total');
						if (timeSlider) {
							timeSlider.focus();
						}
	
						var newTime = Math.min(player.currentTime + player.options.defaultSeekForwardInterval(player), player.duration);
	
						if (!player.paused) {
							player.pause();
						}
	
						setTimeout(function () {
							player.setCurrentTime(newTime);
						}, 0);
	
						setTimeout(function () {
							player.play();
						}, 0);
					}
				}
			});
	
			t.rail = controls.querySelector('.' + t.options.classPrefix + 'time-rail');
			t.total = controls.querySelector('.' + t.options.classPrefix + 'time-total');
			t.loaded = controls.querySelector('.' + t.options.classPrefix + 'time-loaded');
			t.current = controls.querySelector('.' + t.options.classPrefix + 'time-current');
			t.handle = controls.querySelector('.' + t.options.classPrefix + 'time-handle');
			t.timefloat = controls.querySelector('.' + t.options.classPrefix + 'time-float');
			t.timefloatcurrent = controls.querySelector('.' + t.options.classPrefix + 'time-float-current');
			t.slider = controls.querySelector('.' + t.options.classPrefix + 'time-slider');
			t.hovered = controls.querySelector('.' + t.options.classPrefix + 'time-hovered');
			t.buffer = controls.querySelector('.' + t.options.classPrefix + 'time-buffering');
			t.newTime = 0;
			t.forcedHandlePause = false;
			t.setTransformStyle = function (element, value) {
				element.style.transform = value;
				element.style.webkitTransform = value;
				element.style.MozTransform = value;
				element.style.msTransform = value;
				element.style.OTransform = value;
			};
	
			t.buffer.style.display = 'none';
	
			var handleMouseMove = function handleMouseMove(e) {
				var totalStyles = getComputedStyle(t.total),
					offsetStyles = (0, _dom.offset)(t.total),
					width = t.total.offsetWidth,
					transform = function () {
					if (totalStyles.webkitTransform !== undefined) {
						return 'webkitTransform';
					} else if (totalStyles.mozTransform !== undefined) {
						return 'mozTransform ';
					} else if (totalStyles.oTransform !== undefined) {
						return 'oTransform';
					} else if (totalStyles.msTransform !== undefined) {
						return 'msTransform';
					} else {
						return 'transform';
					}
				}(),
					cssMatrix = function () {
					if ('WebKitCSSMatrix' in window) {
						return 'WebKitCSSMatrix';
					} else if ('MSCSSMatrix' in window) {
						return 'MSCSSMatrix';
					} else if ('CSSMatrix' in window) {
						return 'CSSMatrix';
					}
				}();
	
				var percentage = 0,
					leftPos = 0,
					pos = 0,
					x = void 0;
	
				if (e.originalEvent && e.originalEvent.changedTouches) {
					x = e.originalEvent.changedTouches[0].pageX;
				} else if (e.changedTouches) {
					x = e.changedTouches[0].pageX;
				} else {
					x = e.pageX;
				}
	
				if (t.getDuration()) {
					if (x < offsetStyles.left) {
						x = offsetStyles.left;
					} else if (x > width + offsetStyles.left) {
						x = width + offsetStyles.left;
					}
	
					pos = x - offsetStyles.left;
					percentage = pos / width;
					t.newTime = percentage * t.getDuration();
	
					if (mouseIsDown && t.getCurrentTime() !== null && t.newTime.toFixed(4) !== t.getCurrentTime().toFixed(4)) {
						t.setCurrentRailHandle(t.newTime);
						t.updateCurrent(t.newTime);
					}
	
					if (!_constants.IS_IOS && !_constants.IS_ANDROID) {
						if (pos < 0) {
							pos = 0;
						}
						if (t.options.useSmoothHover && cssMatrix !== null && typeof window[cssMatrix] !== 'undefined') {
							var matrix = new window[cssMatrix](getComputedStyle(t.handle)[transform]),
								handleLocation = matrix.m41,
								hoverScaleX = pos / parseFloat(getComputedStyle(t.total).width) - handleLocation / parseFloat(getComputedStyle(t.total).width);
	
							t.hovered.style.left = handleLocation + 'px';
							t.setTransformStyle(t.hovered, 'scaleX(' + hoverScaleX + ')');
							t.hovered.setAttribute('pos', pos);
	
							if (hoverScaleX >= 0) {
								(0, _dom.removeClass)(t.hovered, 'negative');
							} else {
								(0, _dom.addClass)(t.hovered, 'negative');
							}
						}
	
						if (t.timefloat) {
							var half = t.timefloat.offsetWidth / 2,
								offsetContainer = mejs.Utils.offset(t.getElement(t.container)),
								tooltipStyles = getComputedStyle(t.timefloat);
	
							if (x - offsetContainer.left < t.timefloat.offsetWidth) {
								leftPos = half;
							} else if (x - offsetContainer.left >= t.getElement(t.container).offsetWidth - half) {
								leftPos = t.total.offsetWidth - half;
							} else {
								leftPos = pos;
							}
	
							if ((0, _dom.hasClass)(t.getElement(t.container), t.options.classPrefix + 'long-video')) {
								leftPos += parseFloat(tooltipStyles.marginLeft) / 2 + t.timefloat.offsetWidth / 2;
							}
	
							t.timefloat.style.left = leftPos + 'px';
							t.timefloatcurrent.innerHTML = (0, _time.secondsToTimeCode)(t.newTime, player.options.alwaysShowHours, player.options.showTimecodeFrameCount, player.options.framesPerSecond, player.options.secondsDecimalLength, player.options.timeFormat);
							t.timefloat.style.display = 'block';
						}
					}
				} else if (!_constants.IS_IOS && !_constants.IS_ANDROID && t.timefloat) {
					leftPos = t.timefloat.offsetWidth + width >= t.getElement(t.container).offsetWidth ? t.timefloat.offsetWidth / 2 : 0;
					t.timefloat.style.left = leftPos + 'px';
					t.timefloat.style.left = leftPos + 'px';
					t.timefloat.style.display = 'block';
				}
			},
				updateSlider = function updateSlider() {
				var seconds = t.getCurrentTime(),
					timeSliderText = _i18n2.default.t('mejs.time-slider'),
					time = (0, _time.secondsToTimeCode)(seconds, player.options.alwaysShowHours, player.options.showTimecodeFrameCount, player.options.framesPerSecond, player.options.secondsDecimalLength, player.options.timeFormat),
					duration = t.getDuration();
	
				t.slider.setAttribute('role', 'slider');
				t.slider.tabIndex = 0;
	
				if (media.paused) {
					t.slider.setAttribute('aria-label', timeSliderText);
					t.slider.setAttribute('aria-valuemin', 0);
					t.slider.setAttribute('aria-valuemax', isNaN(duration) ? 0 : duration);
					t.slider.setAttribute('aria-valuenow', seconds);
					t.slider.setAttribute('aria-valuetext', time);
				} else {
					t.slider.removeAttribute('aria-label');
					t.slider.removeAttribute('aria-valuemin');
					t.slider.removeAttribute('aria-valuemax');
					t.slider.removeAttribute('aria-valuenow');
					t.slider.removeAttribute('aria-valuetext');
				}
			},
				restartPlayer = function restartPlayer() {
				if (new Date() - lastKeyPressTime >= 1000) {
					t.play();
				}
			},
				handleMouseup = function handleMouseup() {
				if (mouseIsDown && t.getCurrentTime() !== null && t.newTime.toFixed(4) !== t.getCurrentTime().toFixed(4)) {
					t.setCurrentTime(t.newTime);
					t.setCurrentRailHandle(t.newTime);
					t.updateCurrent(t.newTime);
				}
				if (t.forcedHandlePause) {
					t.slider.focus();
					t.play();
				}
				t.forcedHandlePause = false;
			};
	
			t.slider.addEventListener('focus', function () {
				player.options.autoRewind = false;
			});
			t.slider.addEventListener('blur', function () {
				player.options.autoRewind = autoRewindInitial;
			});
			t.slider.addEventListener('keydown', function (e) {
				if (new Date() - lastKeyPressTime >= 1000) {
					startedPaused = t.paused;
				}
	
				if (t.options.enableKeyboard && t.options.keyActions.length) {
	
					var keyCode = e.which || e.keyCode || 0,
						duration = t.getDuration(),
						seekForward = player.options.defaultSeekForwardInterval(media),
						seekBackward = player.options.defaultSeekBackwardInterval(media);
	
					var seekTime = t.getCurrentTime();
					var volume = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'volume-slider');
	
					if (keyCode === 38 || keyCode === 40) {
						if (volume) {
							volume.style.display = 'block';
						}
						if (t.isVideo) {
							t.showControls();
							t.startControlsTimer();
						}
	
						var newVolume = keyCode === 38 ? Math.min(t.volume + 0.1, 1) : Math.max(t.volume - 0.1, 0),
							mutePlayer = newVolume <= 0;
						t.setVolume(newVolume);
						t.setMuted(mutePlayer);
						return;
					} else {
						if (volume) {
							volume.style.display = 'none';
						}
					}
	
					switch (keyCode) {
						case 37:
							if (t.getDuration() !== Infinity) {
								seekTime -= seekBackward;
							}
							break;
						case 39:
							if (t.getDuration() !== Infinity) {
								seekTime += seekForward;
							}
							break;
						case 36:
							seekTime = 0;
							break;
						case 35:
							seekTime = duration;
							break;
						case 13:
						case 32:
							if (_constants.IS_FIREFOX) {
								if (t.paused) {
									t.play();
								} else {
									t.pause();
								}
							}
							return;
						default:
							return;
					}
	
					seekTime = seekTime < 0 || isNaN(seekTime) ? 0 : seekTime >= duration ? duration : Math.floor(seekTime);
					lastKeyPressTime = new Date();
					if (!startedPaused) {
						player.pause();
					}
	
					setTimeout(function () {
						t.setCurrentTime(seekTime);
					}, 0);
	
					if (seekTime < t.getDuration() && !startedPaused) {
						setTimeout(restartPlayer, 1100);
					}
	
					player.showControls();
	
					e.preventDefault();
					e.stopPropagation();
				}
			});
	
			var events = ['mousedown', 'touchstart'];
	
			t.slider.addEventListener('dragstart', function () {
				return false;
			});
	
			for (var i = 0, total = events.length; i < total; i++) {
				t.slider.addEventListener(events[i], function (e) {
					t.forcedHandlePause = false;
					if (t.getDuration() !== Infinity) {
						if (e.which === 1 || e.which === 0) {
							if (!t.paused) {
								t.pause();
								t.forcedHandlePause = true;
							}
	
							mouseIsDown = true;
							handleMouseMove(e);
							var endEvents = ['mouseup', 'touchend'];
	
							for (var j = 0, totalEvents = endEvents.length; j < totalEvents; j++) {
								t.getElement(t.container).addEventListener(endEvents[j], function (event) {
									var target = event.target;
									if (target === t.slider || target.closest('.' + t.options.classPrefix + 'time-slider')) {
										handleMouseMove(event);
									}
								});
							}
							t.globalBind('mouseup.dur touchend.dur', function () {
								handleMouseup();
								mouseIsDown = false;
								if (t.timefloat) {
									t.timefloat.style.display = 'none';
								}
							});
						}
					}
				}, _constants.SUPPORT_PASSIVE_EVENT && events[i] === 'touchstart' ? { passive: true } : false);
			}
			t.slider.addEventListener('mouseenter', function (e) {
				if (e.target === t.slider && t.getDuration() !== Infinity) {
					t.getElement(t.container).addEventListener('mousemove', function (event) {
						var target = event.target;
						if (target === t.slider || target.closest('.' + t.options.classPrefix + 'time-slider')) {
							handleMouseMove(event);
						}
					});
					if (t.timefloat && !_constants.IS_IOS && !_constants.IS_ANDROID) {
						t.timefloat.style.display = 'block';
					}
					if (t.hovered && !_constants.IS_IOS && !_constants.IS_ANDROID && t.options.useSmoothHover) {
						(0, _dom.removeClass)(t.hovered, 'no-hover');
					}
				}
			});
			t.slider.addEventListener('mouseleave', function () {
				if (t.getDuration() !== Infinity) {
					if (!mouseIsDown) {
						if (t.timefloat) {
							t.timefloat.style.display = 'none';
						}
						if (t.hovered && t.options.useSmoothHover) {
							(0, _dom.addClass)(t.hovered, 'no-hover');
						}
					}
				}
			});
	
			t.broadcastCallback = function (e) {
				var broadcast = controls.querySelector('.' + t.options.classPrefix + 'broadcast');
				if (!t.options.forceLive && t.getDuration() !== Infinity) {
					if (broadcast) {
						t.slider.style.display = '';
						broadcast.remove();
					}
	
					player.setProgressRail(e);
					if (!t.forcedHandlePause) {
						player.setCurrentRail(e);
					}
					updateSlider();
				} else if (!broadcast && t.options.forceLive) {
					var label = _document2.default.createElement('span');
					label.className = t.options.classPrefix + 'broadcast';
					label.innerText = _i18n2.default.t('mejs.live-broadcast');
					t.slider.style.display = 'none';
					t.rail.appendChild(label);
				}
			};
	
			media.addEventListener('progress', t.broadcastCallback);
			media.addEventListener('timeupdate', t.broadcastCallback);
			media.addEventListener('play', function () {
				t.buffer.style.display = 'none';
			});
			media.addEventListener('playing', function () {
				t.buffer.style.display = 'none';
			});
			media.addEventListener('seeking', function () {
				t.buffer.style.display = '';
			});
			media.addEventListener('seeked', function () {
				t.buffer.style.display = 'none';
			});
			media.addEventListener('pause', function () {
				t.buffer.style.display = 'none';
			});
			media.addEventListener('waiting', function () {
				t.buffer.style.display = '';
			});
			media.addEventListener('loadeddata', function () {
				t.buffer.style.display = '';
			});
			media.addEventListener('canplay', function () {
				t.buffer.style.display = 'none';
			});
			media.addEventListener('error', function () {
				t.buffer.style.display = 'none';
			});
	
			t.getElement(t.container).addEventListener('controlsresize', function (e) {
				if (t.getDuration() !== Infinity) {
					player.setProgressRail(e);
					if (!t.forcedHandlePause) {
						player.setCurrentRail(e);
					}
				}
			});
		},
		cleanprogress: function cleanprogress(player, controls, layers, media) {
			media.removeEventListener('progress', player.broadcastCallback);
			media.removeEventListener('timeupdate', player.broadcastCallback);
			if (player.rail) {
				player.rail.remove();
			}
		},
		setProgressRail: function setProgressRail(e) {
			var t = this,
				target = e !== undefined ? e.detail.target || e.target : t.media;
	
			var percent = null;
	
			if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && t.getDuration()) {
				percent = target.buffered.end(target.buffered.length - 1) / t.getDuration();
			} else if (target && target.bytesTotal !== undefined && target.bytesTotal > 0 && target.bufferedBytes !== undefined) {
					percent = target.bufferedBytes / target.bytesTotal;
				} else if (e && e.lengthComputable && e.total !== 0) {
						percent = e.loaded / e.total;
					}
	
			if (percent !== null) {
				percent = Math.min(1, Math.max(0, percent));
	
				if (t.loaded) {
					t.setTransformStyle(t.loaded, 'scaleX(' + percent + ')');
				}
			}
		},
		setCurrentRailHandle: function setCurrentRailHandle(fakeTime) {
			var t = this;
			t.setCurrentRailMain(t, fakeTime);
		},
		setCurrentRail: function setCurrentRail() {
			var t = this;
			t.setCurrentRailMain(t);
		},
		setCurrentRailMain: function setCurrentRailMain(t, fakeTime) {
			if (t.getCurrentTime() !== undefined && t.getDuration()) {
				var nTime = typeof fakeTime === 'undefined' ? t.getCurrentTime() : fakeTime;
	
				if (t.total && t.handle) {
					var tW = parseFloat(getComputedStyle(t.total).width);
	
					var newWidth = Math.round(tW * nTime / t.getDuration()),
						handlePos = newWidth - Math.round(t.handle.offsetWidth / 2);
	
					handlePos = handlePos < 0 ? 0 : handlePos;
					t.setTransformStyle(t.current, 'scaleX(' + newWidth / tW + ')');
					t.setTransformStyle(t.handle, 'translateX(' + handlePos + 'px)');
	
					if (t.options.useSmoothHover && !(0, _dom.hasClass)(t.hovered, 'no-hover')) {
						var pos = parseInt(t.hovered.getAttribute('pos'), 10);
						pos = isNaN(pos) ? 0 : pos;
	
						var hoverScaleX = pos / tW - handlePos / tW;
	
						t.hovered.style.left = handlePos + 'px';
						t.setTransformStyle(t.hovered, 'scaleX(' + hoverScaleX + ')');
	
						if (hoverScaleX >= 0) {
							(0, _dom.removeClass)(t.hovered, 'negative');
						} else {
							(0, _dom.addClass)(t.hovered, 'negative');
						}
					}
				}
			}
		}
	});
	
	},{"16":16,"2":2,"25":25,"26":26,"30":30,"5":5}],12:[function(_dereq_,module,exports){
	'use strict';
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _player = _dereq_(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _time = _dereq_(30);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.assign(_player.config, {
		duration: 0,
	
		timeAndDurationSeparator: '<span> | </span>'
	});
	
	Object.assign(_player2.default.prototype, {
		buildcurrent: function buildcurrent(player, controls, layers, media) {
			var t = this,
				time = _document2.default.createElement('div');
	
			time.className = t.options.classPrefix + 'time';
			time.setAttribute('role', 'timer');
			time.setAttribute('aria-live', 'off');
			time.innerHTML = '<span class="' + t.options.classPrefix + 'currenttime">' + (0, _time.secondsToTimeCode)(0, player.options.alwaysShowHours, player.options.showTimecodeFrameCount, player.options.framesPerSecond, player.options.secondsDecimalLength, player.options.timeFormat) + '</span>';
	
			t.addControlElement(time, 'current');
			player.updateCurrent();
			t.updateTimeCallback = function () {
				if (t.controlsAreVisible) {
					player.updateCurrent();
				}
			};
			media.addEventListener('timeupdate', t.updateTimeCallback);
		},
		cleancurrent: function cleancurrent(player, controls, layers, media) {
			media.removeEventListener('timeupdate', player.updateTimeCallback);
		},
		buildduration: function buildduration(player, controls, layers, media) {
			var t = this,
				currTime = controls.lastChild.querySelector('.' + t.options.classPrefix + 'currenttime');
	
			if (currTime) {
				controls.querySelector('.' + t.options.classPrefix + 'time').innerHTML += t.options.timeAndDurationSeparator + '<span class="' + t.options.classPrefix + 'duration">' + ((0, _time.secondsToTimeCode)(t.options.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength, t.options.timeFormat) + '</span>');
			} else {
				if (controls.querySelector('.' + t.options.classPrefix + 'currenttime')) {
					(0, _dom.addClass)(controls.querySelector('.' + t.options.classPrefix + 'currenttime').parentNode, t.options.classPrefix + 'currenttime-container');
				}
	
				var duration = _document2.default.createElement('div');
				duration.className = t.options.classPrefix + 'time ' + t.options.classPrefix + 'duration-container';
				duration.innerHTML = '<span class="' + t.options.classPrefix + 'duration">' + ((0, _time.secondsToTimeCode)(t.options.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength, t.options.timeFormat) + '</span>');
	
				t.addControlElement(duration, 'duration');
			}
	
			t.updateDurationCallback = function () {
				if (t.controlsAreVisible) {
					player.updateDuration();
				}
			};
	
			media.addEventListener('timeupdate', t.updateDurationCallback);
		},
		cleanduration: function cleanduration(player, controls, layers, media) {
			media.removeEventListener('timeupdate', player.updateDurationCallback);
		},
		updateCurrent: function updateCurrent() {
			var t = this;
	
			var currentTime = t.getCurrentTime();
	
			if (isNaN(currentTime)) {
				currentTime = 0;
			}
	
			var timecode = (0, _time.secondsToTimeCode)(currentTime, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength, t.options.timeFormat);
	
			if (timecode.length > 5) {
				(0, _dom.addClass)(t.getElement(t.container), t.options.classPrefix + 'long-video');
			} else {
				(0, _dom.removeClass)(t.getElement(t.container), t.options.classPrefix + 'long-video');
			}
	
			if (t.getElement(t.controls).querySelector('.' + t.options.classPrefix + 'currenttime')) {
				t.getElement(t.controls).querySelector('.' + t.options.classPrefix + 'currenttime').innerText = timecode;
			}
		},
		updateDuration: function updateDuration() {
			var t = this;
	
			var duration = t.getDuration();
	
			if (t.media !== undefined && (isNaN(duration) || duration === Infinity || duration < 0)) {
				t.media.duration = t.options.duration = duration = 0;
			}
	
			if (t.options.duration > 0) {
				duration = t.options.duration;
			}
	
			var timecode = (0, _time.secondsToTimeCode)(duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength, t.options.timeFormat);
	
			if (timecode.length > 5) {
				(0, _dom.addClass)(t.getElement(t.container), t.options.classPrefix + 'long-video');
			} else {
				(0, _dom.removeClass)(t.getElement(t.container), t.options.classPrefix + 'long-video');
			}
	
			if (t.getElement(t.controls).querySelector('.' + t.options.classPrefix + 'duration') && duration > 0) {
				t.getElement(t.controls).querySelector('.' + t.options.classPrefix + 'duration').innerHTML = timecode;
			}
		}
	});
	
	},{"16":16,"2":2,"26":26,"30":30}],13:[function(_dereq_,module,exports){
	'use strict';
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _i18n = _dereq_(5);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _player = _dereq_(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _time = _dereq_(30);
	
	var _general = _dereq_(27);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.assign(_player.config, {
		startLanguage: '',
	
		tracksText: null,
	
		chaptersText: null,
	
		tracksAriaLive: false,
	
		hideCaptionsButtonWhenEmpty: true,
	
		toggleCaptionsButtonWhenOnlyOne: false,
	
		slidesSelector: ''
	});
	
	Object.assign(_player2.default.prototype, {
		hasChapters: false,
	
		buildtracks: function buildtracks(player, controls, layers, media) {
	
			this.findTracks();
	
			if (!player.tracks.length && (!player.trackFiles || !player.trackFiles.length === 0)) {
				return;
			}
	
			var t = this,
				attr = t.options.tracksAriaLive ? ' role="log" aria-live="assertive" aria-atomic="false"' : '',
				tracksTitle = (0, _general.isString)(t.options.tracksText) ? t.options.tracksText : _i18n2.default.t('mejs.captions-subtitles'),
				chaptersTitle = (0, _general.isString)(t.options.chaptersText) ? t.options.chaptersText : _i18n2.default.t('mejs.captions-chapters'),
				total = player.trackFiles === null ? player.tracks.length : player.trackFiles.length;
	
			if (t.domNode.textTracks) {
				for (var i = t.domNode.textTracks.length - 1; i >= 0; i--) {
					t.domNode.textTracks[i].mode = 'hidden';
				}
			}
	
			t.cleartracks(player);
	
			player.captions = _document2.default.createElement('div');
			player.captions.className = t.options.classPrefix + 'captions-layer ' + t.options.classPrefix + 'layer';
			player.captions.innerHTML = '<div class="' + t.options.classPrefix + 'captions-position ' + t.options.classPrefix + 'captions-position-hover"' + attr + '>' + ('<span class="' + t.options.classPrefix + 'captions-text"></span>') + '</div>';
			player.captions.style.display = 'none';
			layers.insertBefore(player.captions, layers.firstChild);
	
			player.captionsText = player.captions.querySelector('.' + t.options.classPrefix + 'captions-text');
	
			player.captionsButton = _document2.default.createElement('div');
			player.captionsButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'captions-button';
			player.captionsButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + tracksTitle + '" aria-label="' + tracksTitle + '" tabindex="0"></button>' + ('<div class="' + t.options.classPrefix + 'captions-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'captions-selector-list">') + ('<li class="' + t.options.classPrefix + 'captions-selector-list-item">') + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + player.id + '_captions" id="' + player.id + '_captions_none" ') + 'value="none" checked disabled>' + ('<label class="' + t.options.classPrefix + 'captions-selector-label ') + (t.options.classPrefix + 'captions-selected" ') + ('for="' + player.id + '_captions_none">' + _i18n2.default.t('mejs.none') + '</label>') + '</li>' + '</ul>' + '</div>';
	
			t.addControlElement(player.captionsButton, 'tracks');
	
			player.captionsButton.querySelector('.' + t.options.classPrefix + 'captions-selector-input').disabled = false;
	
			player.chaptersButton = _document2.default.createElement('div');
			player.chaptersButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'chapters-button';
			player.chaptersButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + chaptersTitle + '" aria-label="' + chaptersTitle + '" tabindex="0"></button>' + ('<div class="' + t.options.classPrefix + 'chapters-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'chapters-selector-list"></ul>') + '</div>';
	
			var subtitleCount = 0;
	
			for (var _i = 0; _i < total; _i++) {
				var kind = player.tracks[_i].kind,
					src = player.tracks[_i].src;
				if (src.trim()) {
					if (kind === 'subtitles' || kind === 'captions') {
						subtitleCount++;
					} else if (kind === 'chapters' && !controls.querySelector('.' + t.options.classPrefix + 'chapter-selector')) {
						player.captionsButton.parentNode.insertBefore(player.chaptersButton, player.captionsButton);
					}
				}
			}
	
			player.trackToLoad = -1;
			player.selectedTrack = null;
			player.isLoadingTrack = false;
	
			for (var _i2 = 0; _i2 < total; _i2++) {
				var _kind = player.tracks[_i2].kind;
				if (player.tracks[_i2].src.trim() && (_kind === 'subtitles' || _kind === 'captions')) {
					player.addTrackButton(player.tracks[_i2].trackId, player.tracks[_i2].srclang, player.tracks[_i2].label);
				}
			}
	
			player.loadNextTrack();
	
			var inEvents = ['mouseenter', 'focusin'],
				outEvents = ['mouseleave', 'focusout'];
	
			if (t.options.toggleCaptionsButtonWhenOnlyOne && subtitleCount === 1) {
				player.captionsButton.addEventListener('click', function (e) {
					var trackId = 'none';
					if (player.selectedTrack === null) {
						trackId = player.tracks[0].trackId;
					}
					var keyboard = e.keyCode || e.which;
					player.setTrack(trackId, typeof keyboard !== 'undefined');
				});
			} else {
				var labels = player.captionsButton.querySelectorAll('.' + t.options.classPrefix + 'captions-selector-label'),
					captions = player.captionsButton.querySelectorAll('input[type=radio]');
	
				for (var _i3 = 0, _total = inEvents.length; _i3 < _total; _i3++) {
					player.captionsButton.addEventListener(inEvents[_i3], function () {
						(0, _dom.removeClass)(this.querySelector('.' + t.options.classPrefix + 'captions-selector'), t.options.classPrefix + 'offscreen');
					});
				}
	
				for (var _i4 = 0, _total2 = outEvents.length; _i4 < _total2; _i4++) {
					player.captionsButton.addEventListener(outEvents[_i4], function () {
						(0, _dom.addClass)(this.querySelector('.' + t.options.classPrefix + 'captions-selector'), t.options.classPrefix + 'offscreen');
					});
				}
	
				for (var _i5 = 0, _total3 = captions.length; _i5 < _total3; _i5++) {
					captions[_i5].addEventListener('click', function (e) {
						var keyboard = e.keyCode || e.which;
						player.setTrack(this.value, typeof keyboard !== 'undefined');
					});
				}
	
				for (var _i6 = 0, _total4 = labels.length; _i6 < _total4; _i6++) {
					labels[_i6].addEventListener('click', function (e) {
						var radio = (0, _dom.siblings)(this, function (el) {
							return el.tagName === 'INPUT';
						})[0],
							event = (0, _general.createEvent)('click', radio);
						radio.dispatchEvent(event);
						e.preventDefault();
					});
				}
	
				player.captionsButton.addEventListener('keydown', function (e) {
					e.stopPropagation();
				});
			}
	
			for (var _i7 = 0, _total5 = inEvents.length; _i7 < _total5; _i7++) {
				player.chaptersButton.addEventListener(inEvents[_i7], function () {
					if (this.querySelector('.' + t.options.classPrefix + 'chapters-selector-list').children.length) {
						(0, _dom.removeClass)(this.querySelector('.' + t.options.classPrefix + 'chapters-selector'), t.options.classPrefix + 'offscreen');
					}
				});
			}
	
			for (var _i8 = 0, _total6 = outEvents.length; _i8 < _total6; _i8++) {
				player.chaptersButton.addEventListener(outEvents[_i8], function () {
					(0, _dom.addClass)(this.querySelector('.' + t.options.classPrefix + 'chapters-selector'), t.options.classPrefix + 'offscreen');
				});
			}
	
			player.chaptersButton.addEventListener('keydown', function (e) {
				e.stopPropagation();
			});
	
			if (!player.options.alwaysShowControls) {
				player.getElement(player.container).addEventListener('controlsshown', function () {
					(0, _dom.addClass)(player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'captions-position'), t.options.classPrefix + 'captions-position-hover');
				});
	
				player.getElement(player.container).addEventListener('controlshidden', function () {
					if (!media.paused) {
						(0, _dom.removeClass)(player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'captions-position'), t.options.classPrefix + 'captions-position-hover');
					}
				});
			} else {
				(0, _dom.addClass)(player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'captions-position'), t.options.classPrefix + 'captions-position-hover');
			}
	
			media.addEventListener('timeupdate', function () {
				player.displayCaptions();
			});
	
			if (player.options.slidesSelector !== '') {
				player.slidesContainer = _document2.default.querySelectorAll(player.options.slidesSelector);
	
				media.addEventListener('timeupdate', function () {
					player.displaySlides();
				});
			}
		},
		cleartracks: function cleartracks(player) {
			if (player) {
				if (player.captions) {
					player.captions.remove();
				}
				if (player.chapters) {
					player.chapters.remove();
				}
				if (player.captionsText) {
					player.captionsText.remove();
				}
				if (player.captionsButton) {
					player.captionsButton.remove();
				}
				if (player.chaptersButton) {
					player.chaptersButton.remove();
				}
			}
		},
		rebuildtracks: function rebuildtracks() {
			var t = this;
			t.findTracks();
			t.buildtracks(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
		},
		findTracks: function findTracks() {
			var t = this,
				tracktags = t.trackFiles === null ? t.node.querySelectorAll('track') : t.trackFiles,
				total = tracktags.length;
	
			t.tracks = [];
			for (var i = 0; i < total; i++) {
				var track = tracktags[i],
					srclang = track.getAttribute('srclang').toLowerCase() || '',
					trackId = t.id + '_track_' + i + '_' + track.getAttribute('kind') + '_' + srclang;
				t.tracks.push({
					trackId: trackId,
					srclang: srclang,
					src: track.getAttribute('src'),
					kind: track.getAttribute('kind'),
					label: track.getAttribute('label') || '',
					entries: [],
					isLoaded: false
				});
			}
		},
		setTrack: function setTrack(trackId, setByKeyboard) {
	
			var t = this,
				radios = t.captionsButton.querySelectorAll('input[type="radio"]'),
				captions = t.captionsButton.querySelectorAll('.' + t.options.classPrefix + 'captions-selected'),
				track = t.captionsButton.querySelector('input[value="' + trackId + '"]');
	
			for (var i = 0, total = radios.length; i < total; i++) {
				radios[i].checked = false;
			}
	
			for (var _i9 = 0, _total7 = captions.length; _i9 < _total7; _i9++) {
				(0, _dom.removeClass)(captions[_i9], t.options.classPrefix + 'captions-selected');
			}
	
			track.checked = true;
			var labels = (0, _dom.siblings)(track, function (el) {
				return (0, _dom.hasClass)(el, t.options.classPrefix + 'captions-selector-label');
			});
			for (var _i10 = 0, _total8 = labels.length; _i10 < _total8; _i10++) {
				(0, _dom.addClass)(labels[_i10], t.options.classPrefix + 'captions-selected');
			}
	
			if (trackId === 'none') {
				t.selectedTrack = null;
				(0, _dom.removeClass)(t.captionsButton, t.options.classPrefix + 'captions-enabled');
			} else {
				for (var _i11 = 0, _total9 = t.tracks.length; _i11 < _total9; _i11++) {
					var _track = t.tracks[_i11];
					if (_track.trackId === trackId) {
						if (t.selectedTrack === null) {
							(0, _dom.addClass)(t.captionsButton, t.options.classPrefix + 'captions-enabled');
						}
						t.selectedTrack = _track;
						t.captions.setAttribute('lang', t.selectedTrack.srclang);
						t.displayCaptions();
						break;
					}
				}
			}
	
			var event = (0, _general.createEvent)('captionschange', t.media);
			event.detail.caption = t.selectedTrack;
			t.media.dispatchEvent(event);
	
			if (!setByKeyboard) {
				setTimeout(function () {
					t.getElement(t.container).focus();
				}, 500);
			}
		},
		loadNextTrack: function loadNextTrack() {
			var t = this;
	
			t.trackToLoad++;
			if (t.trackToLoad < t.tracks.length) {
				t.isLoadingTrack = true;
				t.loadTrack(t.trackToLoad);
			} else {
				t.isLoadingTrack = false;
				t.checkForTracks();
			}
		},
		loadTrack: function loadTrack(index) {
			var t = this,
				track = t.tracks[index];
	
			if (track !== undefined && (track.src !== undefined || track.src !== "")) {
				(0, _dom.ajax)(track.src, 'text', function (d) {
					track.entries = typeof d === 'string' && /<tt\s+xml/ig.exec(d) ? _mejs2.default.TrackFormatParser.dfxp.parse(d) : _mejs2.default.TrackFormatParser.webvtt.parse(d);
	
					track.isLoaded = true;
					t.enableTrackButton(track);
					t.loadNextTrack();
	
					if (track.kind === 'slides') {
						t.setupSlides(track);
					} else if (track.kind === 'chapters' && !t.hasChapters) {
							t.drawChapters(track);
							t.hasChapters = true;
						}
				}, function () {
					t.removeTrackButton(track.trackId);
					t.loadNextTrack();
				});
			}
		},
		enableTrackButton: function enableTrackButton(track) {
			var t = this,
				lang = track.srclang,
				target = _document2.default.getElementById('' + track.trackId);
	
			if (!target) {
				return;
			}
	
			var label = track.label;
	
			if (label === '') {
				label = _i18n2.default.t(_mejs2.default.language.codes[lang]) || lang;
			}
			target.disabled = false;
			var targetSiblings = (0, _dom.siblings)(target, function (el) {
				return (0, _dom.hasClass)(el, t.options.classPrefix + 'captions-selector-label');
			});
			for (var i = 0, total = targetSiblings.length; i < total; i++) {
				targetSiblings[i].innerHTML = label;
			}
	
			if (t.options.startLanguage === lang) {
				target.checked = true;
				var event = (0, _general.createEvent)('click', target);
				target.dispatchEvent(event);
			}
		},
		removeTrackButton: function removeTrackButton(trackId) {
			var element = _document2.default.getElementById('' + trackId);
			if (element) {
				var button = element.closest('li');
				if (button) {
					button.remove();
				}
			}
		},
		addTrackButton: function addTrackButton(trackId, lang, label) {
			var t = this;
			if (label === '') {
				label = _i18n2.default.t(_mejs2.default.language.codes[lang]) || lang;
			}
	
			t.captionsButton.querySelector('ul').innerHTML += '<li class="' + t.options.classPrefix + 'captions-selector-list-item">' + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + t.id + '_captions" id="' + trackId + '" value="' + trackId + '" disabled>') + ('<label class="' + t.options.classPrefix + 'captions-selector-label"') + ('for="' + trackId + '">' + label + ' (loading)</label>') + '</li>';
		},
		checkForTracks: function checkForTracks() {
			var t = this;
	
			var hasSubtitles = false;
	
			if (t.options.hideCaptionsButtonWhenEmpty) {
				for (var i = 0, total = t.tracks.length; i < total; i++) {
					var kind = t.tracks[i].kind;
					if ((kind === 'subtitles' || kind === 'captions') && t.tracks[i].isLoaded) {
						hasSubtitles = true;
						break;
					}
				}
	
				t.captionsButton.style.display = hasSubtitles ? '' : 'none';
				t.setControlsSize();
			}
		},
		displayCaptions: function displayCaptions() {
			if (this.tracks === undefined) {
				return;
			}
	
			var t = this,
				track = t.selectedTrack,
				sanitize = function sanitize(html) {
				var div = _document2.default.createElement('div');
				div.innerHTML = html;
	
				var scripts = div.getElementsByTagName('script');
				var i = scripts.length;
				while (i--) {
					scripts[i].remove();
				}
	
				var allElements = div.getElementsByTagName('*');
				for (var _i12 = 0, n = allElements.length; _i12 < n; _i12++) {
					var attributesObj = allElements[_i12].attributes,
						attributes = Array.prototype.slice.call(attributesObj);
	
					for (var j = 0, total = attributes.length; j < total; j++) {
						if (attributes[j].name.startsWith('on') || attributes[j].value.startsWith('javascript')) {
							allElements[_i12].remove();
						} else if (attributes[j].name === 'style') {
							allElements[_i12].removeAttribute(attributes[j].name);
						}
					}
				}
				return div.innerHTML;
			};
	
			if (track !== null && track.isLoaded) {
				var i = t.searchTrackPosition(track.entries, t.media.currentTime);
				if (i > -1) {
					var text = track.entries[i].text;
					if (typeof t.options.captionTextPreprocessor === 'function') text = t.options.captionTextPreprocessor(text);
					t.captionsText.innerHTML = sanitize(text);
					t.captionsText.className = t.options.classPrefix + 'captions-text ' + (track.entries[i].identifier || '');
					t.captions.style.display = '';
					t.captions.style.height = '0px';
					return;
				}
				t.captions.style.display = 'none';
			} else {
				t.captions.style.display = 'none';
			}
		},
		setupSlides: function setupSlides(track) {
			var t = this;
			t.slides = track;
			t.slides.entries.imgs = [t.slides.entries.length];
			t.showSlide(0);
		},
		showSlide: function showSlide(index) {
			var _this = this;
	
			var t = this;
	
			if (t.tracks === undefined || t.slidesContainer === undefined) {
				return;
			}
	
			var url = t.slides.entries[index].text;
	
			var img = t.slides.entries[index].imgs;
	
			if (img === undefined || img.fadeIn === undefined) {
				var image = _document2.default.createElement('img');
				image.src = url;
				image.addEventListener('load', function () {
					var self = _this,
						visible = (0, _dom.siblings)(self, function (el) {
						return visible(el);
					});
					self.style.display = 'none';
					t.slidesContainer.innerHTML += self.innerHTML;
					(0, _dom.fadeIn)(t.slidesContainer.querySelector(image));
					for (var i = 0, total = visible.length; i < total; i++) {
						(0, _dom.fadeOut)(visible[i], 400);
					}
				});
				t.slides.entries[index].imgs = img = image;
			} else if (!(0, _dom.visible)(img)) {
				var _visible = (0, _dom.siblings)(self, function (el) {
					return _visible(el);
				});
				(0, _dom.fadeIn)(t.slidesContainer.querySelector(img));
				for (var i = 0, total = _visible.length; i < total; i++) {
					(0, _dom.fadeOut)(_visible[i]);
				}
			}
		},
		displaySlides: function displaySlides() {
			var t = this;
	
			if (this.slides === undefined) {
				return;
			}
	
			var slides = t.slides,
				i = t.searchTrackPosition(slides.entries, t.media.currentTime);
	
			if (i > -1) {
				t.showSlide(i);
			}
		},
		drawChapters: function drawChapters(chapters) {
			var t = this,
				total = chapters.entries.length;
	
			if (!total) {
				return;
			}
	
			t.chaptersButton.querySelector('ul').innerHTML = '';
	
			for (var i = 0; i < total; i++) {
				t.chaptersButton.querySelector('ul').innerHTML += '<li class="' + t.options.classPrefix + 'chapters-selector-list-item" ' + 'role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false">' + ('<input type="radio" class="' + t.options.classPrefix + 'captions-selector-input" ') + ('name="' + t.id + '_chapters" id="' + t.id + '_chapters_' + i + '" value="' + chapters.entries[i].start + '" disabled>') + ('<label class="' + t.options.classPrefix + 'chapters-selector-label"') + ('for="' + t.id + '_chapters_' + i + '">' + chapters.entries[i].text + '</label>') + '</li>';
			}
	
			var radios = t.chaptersButton.querySelectorAll('input[type="radio"]'),
				labels = t.chaptersButton.querySelectorAll('.' + t.options.classPrefix + 'chapters-selector-label');
	
			for (var _i13 = 0, _total10 = radios.length; _i13 < _total10; _i13++) {
				radios[_i13].disabled = false;
				radios[_i13].checked = false;
				radios[_i13].addEventListener('click', function (e) {
					var self = this,
						listItems = t.chaptersButton.querySelectorAll('li'),
						label = (0, _dom.siblings)(self, function (el) {
						return (0, _dom.hasClass)(el, t.options.classPrefix + 'chapters-selector-label');
					})[0];
	
					self.checked = true;
					self.parentNode.setAttribute('aria-checked', true);
					(0, _dom.addClass)(label, t.options.classPrefix + 'chapters-selected');
					(0, _dom.removeClass)(t.chaptersButton.querySelector('.' + t.options.classPrefix + 'chapters-selected'), t.options.classPrefix + 'chapters-selected');
	
					for (var _i14 = 0, _total11 = listItems.length; _i14 < _total11; _i14++) {
						listItems[_i14].setAttribute('aria-checked', false);
					}
	
					var keyboard = e.keyCode || e.which;
					if (typeof keyboard === 'undefined') {
						setTimeout(function () {
							t.getElement(t.container).focus();
						}, 500);
					}
	
					t.media.setCurrentTime(parseFloat(self.value));
					if (t.media.paused) {
						t.media.play();
					}
				});
			}
	
			for (var _i15 = 0, _total12 = labels.length; _i15 < _total12; _i15++) {
				labels[_i15].addEventListener('click', function (e) {
					var radio = (0, _dom.siblings)(this, function (el) {
						return el.tagName === 'INPUT';
					})[0],
						event = (0, _general.createEvent)('click', radio);
					radio.dispatchEvent(event);
					e.preventDefault();
				});
			}
		},
		searchTrackPosition: function searchTrackPosition(tracks, currentTime) {
			var lo = 0,
				hi = tracks.length - 1,
				mid = void 0,
				start = void 0,
				stop = void 0;
	
			while (lo <= hi) {
				mid = lo + hi >> 1;
				start = tracks[mid].start;
				stop = tracks[mid].stop;
	
				if (currentTime >= start && currentTime < stop) {
					return mid;
				} else if (start < currentTime) {
					lo = mid + 1;
				} else if (start > currentTime) {
					hi = mid - 1;
				}
			}
	
			return -1;
		}
	});
	
	_mejs2.default.language = {
		codes: {
			af: 'mejs.afrikaans',
			sq: 'mejs.albanian',
			ar: 'mejs.arabic',
			be: 'mejs.belarusian',
			bg: 'mejs.bulgarian',
			ca: 'mejs.catalan',
			zh: 'mejs.chinese',
			'zh-cn': 'mejs.chinese-simplified',
			'zh-tw': 'mejs.chines-traditional',
			hr: 'mejs.croatian',
			cs: 'mejs.czech',
			da: 'mejs.danish',
			nl: 'mejs.dutch',
			en: 'mejs.english',
			et: 'mejs.estonian',
			fl: 'mejs.filipino',
			fi: 'mejs.finnish',
			fr: 'mejs.french',
			gl: 'mejs.galician',
			de: 'mejs.german',
			el: 'mejs.greek',
			ht: 'mejs.haitian-creole',
			iw: 'mejs.hebrew',
			hi: 'mejs.hindi',
			hu: 'mejs.hungarian',
			is: 'mejs.icelandic',
			id: 'mejs.indonesian',
			ga: 'mejs.irish',
			it: 'mejs.italian',
			ja: 'mejs.japanese',
			ko: 'mejs.korean',
			lv: 'mejs.latvian',
			lt: 'mejs.lithuanian',
			mk: 'mejs.macedonian',
			ms: 'mejs.malay',
			mt: 'mejs.maltese',
			no: 'mejs.norwegian',
			fa: 'mejs.persian',
			pl: 'mejs.polish',
			pt: 'mejs.portuguese',
			ro: 'mejs.romanian',
			ru: 'mejs.russian',
			sr: 'mejs.serbian',
			sk: 'mejs.slovak',
			sl: 'mejs.slovenian',
			es: 'mejs.spanish',
			sw: 'mejs.swahili',
			sv: 'mejs.swedish',
			tl: 'mejs.tagalog',
			th: 'mejs.thai',
			tr: 'mejs.turkish',
			uk: 'mejs.ukrainian',
			vi: 'mejs.vietnamese',
			cy: 'mejs.welsh',
			yi: 'mejs.yiddish'
		}
	};
	
	_mejs2.default.TrackFormatParser = {
		webvtt: {
			pattern: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
	
			parse: function parse(trackText) {
				var lines = trackText.split(/\r?\n/),
					entries = [];
	
				var timecode = void 0,
					text = void 0,
					identifier = void 0;
	
				for (var i = 0, total = lines.length; i < total; i++) {
					timecode = this.pattern.exec(lines[i]);
	
					if (timecode && i < lines.length) {
						if (i - 1 >= 0 && lines[i - 1] !== '') {
							identifier = lines[i - 1];
						}
						i++;
	
						text = lines[i];
						i++;
						while (lines[i] !== '' && i < lines.length) {
							text = text + '\n' + lines[i];
							i++;
						}
						text = text === null ? '' : text.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
						entries.push({
							identifier: identifier,
							start: (0, _time.convertSMPTEtoSeconds)(timecode[1]) === 0 ? 0.200 : (0, _time.convertSMPTEtoSeconds)(timecode[1]),
							stop: (0, _time.convertSMPTEtoSeconds)(timecode[3]),
							text: text,
							settings: timecode[5]
						});
					}
					identifier = '';
				}
				return entries;
			}
		},
	
		dfxp: {
			parse: function parse(trackText) {
				trackText = $(trackText).filter('tt');
				var container = trackText.firstChild,
					lines = container.querySelectorAll('p'),
					styleNode = trackText.getElementById('' + container.attr('style')),
					entries = [];
	
				var styles = void 0;
	
				if (styleNode.length) {
					styleNode.removeAttribute('id');
					var attributes = styleNode.attributes;
					if (attributes.length) {
						styles = {};
						for (var i = 0, total = attributes.length; i < total; i++) {
							styles[attributes[i].name.split(":")[1]] = attributes[i].value;
						}
					}
				}
	
				for (var _i16 = 0, _total13 = lines.length; _i16 < _total13; _i16++) {
					var style = void 0,
						_temp = {
						start: null,
						stop: null,
						style: null,
						text: null
					};
	
					if (lines.eq(_i16).attr('begin')) {
						_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16).attr('begin'));
					}
					if (!_temp.start && lines.eq(_i16 - 1).attr('end')) {
						_temp.start = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16 - 1).attr('end'));
					}
					if (lines.eq(_i16).attr('end')) {
						_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16).attr('end'));
					}
					if (!_temp.stop && lines.eq(_i16 + 1).attr('begin')) {
						_temp.stop = (0, _time.convertSMPTEtoSeconds)(lines.eq(_i16 + 1).attr('begin'));
					}
	
					if (styles) {
						style = '';
						for (var _style in styles) {
							style += _style + ':' + styles[_style] + ';';
						}
					}
					if (style) {
						_temp.style = style;
					}
					if (_temp.start === 0) {
						_temp.start = 0.200;
					}
					_temp.text = lines.eq(_i16).innerHTML.trim().replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
					entries.push(_temp);
				}
				return entries;
			}
		}
	};
	
	},{"16":16,"2":2,"26":26,"27":27,"30":30,"5":5,"7":7}],14:[function(_dereq_,module,exports){
	'use strict';
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _player = _dereq_(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _i18n = _dereq_(5);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _constants = _dereq_(25);
	
	var _general = _dereq_(27);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Object.assign(_player.config, {
		muteText: null,
	
		unmuteText: null,
	
		allyVolumeControlText: null,
	
		hideVolumeOnTouchDevices: true,
	
		audioVolume: 'horizontal',
	
		videoVolume: 'vertical',
	
		startVolume: 0.8
	});
	
	Object.assign(_player2.default.prototype, {
		buildvolume: function buildvolume(player, controls, layers, media) {
			if ((_constants.IS_ANDROID || _constants.IS_IOS) && this.options.hideVolumeOnTouchDevices) {
				return;
			}
	
			var t = this,
				mode = t.isVideo ? t.options.videoVolume : t.options.audioVolume,
				muteText = (0, _general.isString)(t.options.muteText) ? t.options.muteText : _i18n2.default.t('mejs.mute'),
				unmuteText = (0, _general.isString)(t.options.unmuteText) ? t.options.unmuteText : _i18n2.default.t('mejs.unmute'),
				volumeControlText = (0, _general.isString)(t.options.allyVolumeControlText) ? t.options.allyVolumeControlText : _i18n2.default.t('mejs.volume-help-text'),
				mute = _document2.default.createElement('div');
	
			mute.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'volume-button ' + t.options.classPrefix + 'mute';
			mute.innerHTML = mode === 'horizontal' ? '<button type="button" aria-controls="' + t.id + '" title="' + muteText + '" aria-label="' + muteText + '" tabindex="0"></button>' : '<button type="button" aria-controls="' + t.id + '" title="' + muteText + '" aria-label="' + muteText + '" tabindex="0"></button>' + ('<a href="javascript:void(0);" class="' + t.options.classPrefix + 'volume-slider" ') + ('aria-label="' + _i18n2.default.t('mejs.volume-slider') + '" aria-valuemin="0" aria-valuemax="100" role="slider" ') + 'aria-orientation="vertical">' + ('<span class="' + t.options.classPrefix + 'offscreen">' + volumeControlText + '</span>') + ('<div class="' + t.options.classPrefix + 'volume-total">') + ('<div class="' + t.options.classPrefix + 'volume-current"></div>') + ('<div class="' + t.options.classPrefix + 'volume-handle"></div>') + '</div>' + '</a>';
	
			t.addControlElement(mute, 'volume');
	
			t.options.keyActions.push({
				keys: [38],
				action: function action(player) {
					var volumeSlider = player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'volume-slider');
					if (volumeSlider && volumeSlider.matches(':focus')) {
						volumeSlider.style.display = 'block';
					}
					if (player.isVideo) {
						player.showControls();
						player.startControlsTimer();
					}
	
					var newVolume = Math.min(player.volume + 0.1, 1);
					player.setVolume(newVolume);
					if (newVolume > 0) {
						player.setMuted(false);
					}
				}
			}, {
				keys: [40],
				action: function action(player) {
					var volumeSlider = player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'volume-slider');
					if (volumeSlider) {
						volumeSlider.style.display = 'block';
					}
	
					if (player.isVideo) {
						player.showControls();
						player.startControlsTimer();
					}
	
					var newVolume = Math.max(player.volume - 0.1, 0);
					player.setVolume(newVolume);
	
					if (newVolume <= 0.1) {
						player.setMuted(true);
					}
				}
			}, {
				keys: [77],
				action: function action(player) {
					var volumeSlider = player.getElement(player.container).querySelector('.' + t.options.classPrefix + 'volume-slider');
					if (volumeSlider) {
						volumeSlider.style.display = 'block';
					}
	
					if (player.isVideo) {
						player.showControls();
						player.startControlsTimer();
					}
					if (player.media.muted) {
						player.setMuted(false);
					} else {
						player.setMuted(true);
					}
				}
			});
	
			if (mode === 'horizontal') {
				var anchor = _document2.default.createElement('a');
				anchor.className = t.options.classPrefix + 'horizontal-volume-slider';
				anchor.href = 'javascript:void(0);';
				anchor.setAttribute('aria-label', _i18n2.default.t('mejs.volume-slider'));
				anchor.setAttribute('aria-valuemin', 0);
				anchor.setAttribute('aria-valuemax', 100);
				anchor.setAttribute('aria-valuenow', 100);
				anchor.setAttribute('role', 'slider');
				anchor.innerHTML += '<span class="' + t.options.classPrefix + 'offscreen">' + volumeControlText + '</span>' + ('<div class="' + t.options.classPrefix + 'horizontal-volume-total">') + ('<div class="' + t.options.classPrefix + 'horizontal-volume-current"></div>') + ('<div class="' + t.options.classPrefix + 'horizontal-volume-handle"></div>') + '</div>';
				mute.parentNode.insertBefore(anchor, mute.nextSibling);
			}
	
			var mouseIsDown = false,
				mouseIsOver = false,
				modified = false,
				updateVolumeSlider = function updateVolumeSlider() {
				var volume = Math.floor(media.volume * 100);
				volumeSlider.setAttribute('aria-valuenow', volume);
				volumeSlider.setAttribute('aria-valuetext', volume + '%');
			};
	
			var volumeSlider = mode === 'vertical' ? t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'volume-slider') : t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'horizontal-volume-slider'),
				volumeTotal = mode === 'vertical' ? t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'volume-total') : t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'horizontal-volume-total'),
				volumeCurrent = mode === 'vertical' ? t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'volume-current') : t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'horizontal-volume-current'),
				volumeHandle = mode === 'vertical' ? t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'volume-handle') : t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'horizontal-volume-handle'),
				positionVolumeHandle = function positionVolumeHandle(volume) {
	
				if (volume === null || isNaN(volume) || volume === undefined) {
					return;
				}
	
				volume = Math.max(0, volume);
				volume = Math.min(volume, 1);
	
				if (volume === 0) {
					(0, _dom.removeClass)(mute, t.options.classPrefix + 'mute');
					(0, _dom.addClass)(mute, t.options.classPrefix + 'unmute');
					var button = mute.firstElementChild;
					button.setAttribute('title', unmuteText);
					button.setAttribute('aria-label', unmuteText);
				} else {
					(0, _dom.removeClass)(mute, t.options.classPrefix + 'unmute');
					(0, _dom.addClass)(mute, t.options.classPrefix + 'mute');
					var _button = mute.firstElementChild;
					_button.setAttribute('title', muteText);
					_button.setAttribute('aria-label', muteText);
				}
	
				var volumePercentage = volume * 100 + '%',
					volumeStyles = getComputedStyle(volumeHandle);
	
				if (mode === 'vertical') {
					volumeCurrent.style.bottom = 0;
					volumeCurrent.style.height = volumePercentage;
					volumeHandle.style.bottom = volumePercentage;
					volumeHandle.style.marginBottom = -parseFloat(volumeStyles.height) / 2 + 'px';
				} else {
					volumeCurrent.style.left = 0;
					volumeCurrent.style.width = volumePercentage;
					volumeHandle.style.left = volumePercentage;
					volumeHandle.style.marginLeft = -parseFloat(volumeStyles.width) / 2 + 'px';
				}
			},
				handleVolumeMove = function handleVolumeMove(e) {
				var totalOffset = (0, _dom.offset)(volumeTotal),
					volumeStyles = getComputedStyle(volumeTotal);
	
				modified = true;
	
				var volume = null;
	
				if (mode === 'vertical') {
					var railHeight = parseFloat(volumeStyles.height),
						newY = e.pageY - totalOffset.top;
	
					volume = (railHeight - newY) / railHeight;
	
					if (totalOffset.top === 0 || totalOffset.left === 0) {
						return;
					}
				} else {
					var railWidth = parseFloat(volumeStyles.width),
						newX = e.pageX - totalOffset.left;
	
					volume = newX / railWidth;
				}
	
				volume = Math.max(0, volume);
				volume = Math.min(volume, 1);
	
				positionVolumeHandle(volume);
	
				t.setMuted(volume === 0);
				t.setVolume(volume);
	
				e.preventDefault();
				e.stopPropagation();
			},
				toggleMute = function toggleMute() {
				if (t.muted) {
					positionVolumeHandle(0);
					(0, _dom.removeClass)(mute, t.options.classPrefix + 'mute');
					(0, _dom.addClass)(mute, t.options.classPrefix + 'unmute');
				} else {
					positionVolumeHandle(media.volume);
					(0, _dom.removeClass)(mute, t.options.classPrefix + 'unmute');
					(0, _dom.addClass)(mute, t.options.classPrefix + 'mute');
				}
			};
	
			player.getElement(player.container).addEventListener('keydown', function (e) {
				var hasFocus = !!e.target.closest('.' + t.options.classPrefix + 'container');
				if (!hasFocus && mode === 'vertical') {
					volumeSlider.style.display = 'none';
				}
			});
	
			mute.addEventListener('mouseenter', function (e) {
				if (e.target === mute) {
					volumeSlider.style.display = 'block';
					mouseIsOver = true;
					e.preventDefault();
					e.stopPropagation();
				}
			});
			mute.addEventListener('focusin', function () {
				volumeSlider.style.display = 'block';
				mouseIsOver = true;
			});
	
			mute.addEventListener('focusout', function (e) {
				if ((!e.relatedTarget || e.relatedTarget && !e.relatedTarget.matches('.' + t.options.classPrefix + 'volume-slider')) && mode === 'vertical') {
					volumeSlider.style.display = 'none';
				}
			});
			mute.addEventListener('mouseleave', function () {
				mouseIsOver = false;
				if (!mouseIsDown && mode === 'vertical') {
					volumeSlider.style.display = 'none';
				}
			});
			mute.addEventListener('focusout', function () {
				mouseIsOver = false;
			});
			mute.addEventListener('keydown', function (e) {
				if (t.options.enableKeyboard && t.options.keyActions.length) {
					var keyCode = e.which || e.keyCode || 0,
						volume = media.volume;
	
					switch (keyCode) {
						case 38:
							volume = Math.min(volume + 0.1, 1);
							break;
						case 40:
							volume = Math.max(0, volume - 0.1);
							break;
						default:
							return true;
					}
	
					mouseIsDown = false;
					positionVolumeHandle(volume);
					media.setVolume(volume);
	
					e.preventDefault();
					e.stopPropagation();
				}
			});
			mute.querySelector('button').addEventListener('click', function () {
				media.setMuted(!media.muted);
				var event = (0, _general.createEvent)('volumechange', media);
				media.dispatchEvent(event);
			});
	
			volumeSlider.addEventListener('dragstart', function () {
				return false;
			});
	
			volumeSlider.addEventListener('mouseover', function () {
				mouseIsOver = true;
			});
			volumeSlider.addEventListener('focusin', function () {
				volumeSlider.style.display = 'block';
				mouseIsOver = true;
			});
			volumeSlider.addEventListener('focusout', function () {
				mouseIsOver = false;
				if (!mouseIsDown && mode === 'vertical') {
					volumeSlider.style.display = 'none';
				}
			});
			volumeSlider.addEventListener('mousedown', function (e) {
				handleVolumeMove(e);
				t.globalBind('mousemove.vol', function (event) {
					var target = event.target;
					if (mouseIsDown && (target === volumeSlider || target.closest(mode === 'vertical' ? '.' + t.options.classPrefix + 'volume-slider' : '.' + t.options.classPrefix + 'horizontal-volume-slider'))) {
						handleVolumeMove(event);
					}
				});
				t.globalBind('mouseup.vol', function () {
					mouseIsDown = false;
					if (!mouseIsOver && mode === 'vertical') {
						volumeSlider.style.display = 'none';
					}
				});
				mouseIsDown = true;
				e.preventDefault();
				e.stopPropagation();
			});
	
			media.addEventListener('volumechange', function (e) {
				if (!mouseIsDown) {
					toggleMute();
				}
				updateVolumeSlider(e);
			});
	
			var rendered = false;
			media.addEventListener('rendererready', function () {
				if (!modified) {
					setTimeout(function () {
						rendered = true;
						if (player.options.startVolume === 0 || media.originalNode.muted) {
							media.setMuted(true);
							player.options.startVolume = 0;
						}
						media.setVolume(player.options.startVolume);
						t.setControlsSize();
					}, 250);
				}
			});
	
			media.addEventListener('loadedmetadata', function () {
				setTimeout(function () {
					if (!modified && !rendered) {
						if (player.options.startVolume === 0 || media.originalNode.muted) {
							media.setMuted(true);
						}
						media.setVolume(player.options.startVolume);
						t.setControlsSize();
					}
					rendered = false;
				}, 250);
			});
	
			if (player.options.startVolume === 0 || media.originalNode.muted) {
				media.setMuted(true);
				player.options.startVolume = 0;
				toggleMute();
			}
	
			t.getElement(t.container).addEventListener('controlsresize', function () {
				toggleMute();
			});
		}
	});
	
	},{"16":16,"2":2,"25":25,"26":26,"27":27,"5":5}],15:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var EN = exports.EN = {
		'mejs.plural-form': 1,
	
		'mejs.download-file': 'Download File',
	
		'mejs.install-flash': 'You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https://get.adobe.com/flashplayer/',
	
		'mejs.fullscreen': 'Fullscreen',
	
		'mejs.play': 'Play',
		'mejs.pause': 'Pause',
	
		'mejs.time-slider': 'Time Slider',
		'mejs.time-help-text': 'Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.',
		'mejs.live-broadcast': 'Live Broadcast',
	
		'mejs.volume-help-text': 'Use Up/Down Arrow keys to increase or decrease volume.',
		'mejs.unmute': 'Unmute',
		'mejs.mute': 'Mute',
		'mejs.volume-slider': 'Volume Slider',
	
		'mejs.video-player': 'Video Player',
		'mejs.audio-player': 'Audio Player',
	
		'mejs.captions-subtitles': 'Captions/Subtitles',
		'mejs.captions-chapters': 'Chapters',
		'mejs.none': 'None',
		'mejs.afrikaans': 'Afrikaans',
		'mejs.albanian': 'Albanian',
		'mejs.arabic': 'Arabic',
		'mejs.belarusian': 'Belarusian',
		'mejs.bulgarian': 'Bulgarian',
		'mejs.catalan': 'Catalan',
		'mejs.chinese': 'Chinese',
		'mejs.chinese-simplified': 'Chinese (Simplified)',
		'mejs.chinese-traditional': 'Chinese (Traditional)',
		'mejs.croatian': 'Croatian',
		'mejs.czech': 'Czech',
		'mejs.danish': 'Danish',
		'mejs.dutch': 'Dutch',
		'mejs.english': 'English',
		'mejs.estonian': 'Estonian',
		'mejs.filipino': 'Filipino',
		'mejs.finnish': 'Finnish',
		'mejs.french': 'French',
		'mejs.galician': 'Galician',
		'mejs.german': 'German',
		'mejs.greek': 'Greek',
		'mejs.haitian-creole': 'Haitian Creole',
		'mejs.hebrew': 'Hebrew',
		'mejs.hindi': 'Hindi',
		'mejs.hungarian': 'Hungarian',
		'mejs.icelandic': 'Icelandic',
		'mejs.indonesian': 'Indonesian',
		'mejs.irish': 'Irish',
		'mejs.italian': 'Italian',
		'mejs.japanese': 'Japanese',
		'mejs.korean': 'Korean',
		'mejs.latvian': 'Latvian',
		'mejs.lithuanian': 'Lithuanian',
		'mejs.macedonian': 'Macedonian',
		'mejs.malay': 'Malay',
		'mejs.maltese': 'Maltese',
		'mejs.norwegian': 'Norwegian',
		'mejs.persian': 'Persian',
		'mejs.polish': 'Polish',
		'mejs.portuguese': 'Portuguese',
		'mejs.romanian': 'Romanian',
		'mejs.russian': 'Russian',
		'mejs.serbian': 'Serbian',
		'mejs.slovak': 'Slovak',
		'mejs.slovenian': 'Slovenian',
		'mejs.spanish': 'Spanish',
		'mejs.swahili': 'Swahili',
		'mejs.swedish': 'Swedish',
		'mejs.tagalog': 'Tagalog',
		'mejs.thai': 'Thai',
		'mejs.turkish': 'Turkish',
		'mejs.ukrainian': 'Ukrainian',
		'mejs.vietnamese': 'Vietnamese',
		'mejs.welsh': 'Welsh',
		'mejs.yiddish': 'Yiddish'
	};
	
	},{}],16:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.config = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _mediaelement = _dereq_(6);
	
	var _mediaelement2 = _interopRequireDefault(_mediaelement);
	
	var _default = _dereq_(17);
	
	var _default2 = _interopRequireDefault(_default);
	
	var _i18n = _dereq_(5);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _constants = _dereq_(25);
	
	var _general = _dereq_(27);
	
	var _time = _dereq_(30);
	
	var _media = _dereq_(28);
	
	var _dom = _dereq_(26);
	
	var dom = _interopRequireWildcard(_dom);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	_mejs2.default.mepIndex = 0;
	
	_mejs2.default.players = {};
	
	var config = exports.config = {
		poster: '',
	
		showPosterWhenEnded: false,
	
		showPosterWhenPaused: false,
	
		defaultVideoWidth: 480,
	
		defaultVideoHeight: 270,
	
		videoWidth: -1,
	
		videoHeight: -1,
	
		defaultAudioWidth: 400,
	
		defaultAudioHeight: 40,
	
		defaultSeekBackwardInterval: function defaultSeekBackwardInterval(media) {
			return media.getDuration() * 0.05;
		},
	
		defaultSeekForwardInterval: function defaultSeekForwardInterval(media) {
			return media.getDuration() * 0.05;
		},
	
		setDimensions: true,
	
		audioWidth: -1,
	
		audioHeight: -1,
	
		loop: false,
	
		autoRewind: true,
	
		enableAutosize: true,
	
		timeFormat: '',
	
		alwaysShowHours: false,
	
		showTimecodeFrameCount: false,
	
		framesPerSecond: 25,
	
		alwaysShowControls: false,
	
		hideVideoControlsOnLoad: false,
	
		hideVideoControlsOnPause: false,
	
		clickToPlayPause: true,
	
		controlsTimeoutDefault: 1500,
	
		controlsTimeoutMouseEnter: 2500,
	
		controlsTimeoutMouseLeave: 1000,
	
		iPadUseNativeControls: false,
	
		iPhoneUseNativeControls: false,
	
		AndroidUseNativeControls: false,
	
		features: ['playpause', 'current', 'progress', 'duration', 'tracks', 'volume', 'fullscreen'],
	
		useDefaultControls: false,
	
		isVideo: true,
	
		stretching: 'auto',
	
		classPrefix: 'mejs__',
	
		enableKeyboard: true,
	
		pauseOtherPlayers: true,
	
		secondsDecimalLength: 0,
	
		customError: null,
	
		keyActions: [{
			keys: [32, 179],
			action: function action(player) {
	
				if (!_constants.IS_FIREFOX) {
					if (player.paused || player.ended) {
						player.play();
					} else {
						player.pause();
					}
				}
			}
		}]
	};
	
	_mejs2.default.MepDefaults = config;
	
	var MediaElementPlayer = function () {
		function MediaElementPlayer(node, o) {
			_classCallCheck(this, MediaElementPlayer);
	
			var t = this,
				element = typeof node === 'string' ? _document2.default.getElementById(node) : node;
	
			if (!(t instanceof MediaElementPlayer)) {
				return new MediaElementPlayer(element, o);
			}
	
			t.node = t.media = element;
	
			if (!t.node) {
				return;
			}
	
			if (t.media.player) {
				return t.media.player;
			}
	
			t.hasFocus = false;
	
			t.controlsAreVisible = true;
	
			t.controlsEnabled = true;
	
			t.controlsTimer = null;
	
			t.currentMediaTime = 0;
	
			t.proxy = null;
	
			if (o === undefined) {
				var options = t.node.getAttribute('data-mejsoptions');
				o = options ? JSON.parse(options) : {};
			}
	
			t.options = Object.assign({}, config, o);
	
			if (t.options.loop && !t.media.getAttribute('loop')) {
				t.media.loop = true;
				t.node.loop = true;
			} else if (t.media.loop) {
				t.options.loop = true;
			}
	
			if (!t.options.timeFormat) {
				t.options.timeFormat = 'mm:ss';
				if (t.options.alwaysShowHours) {
					t.options.timeFormat = 'hh:mm:ss';
				}
				if (t.options.showTimecodeFrameCount) {
					t.options.timeFormat += ':ff';
				}
			}
	
			(0, _time.calculateTimeFormat)(0, t.options, t.options.framesPerSecond || 25);
	
			t.id = 'mep_' + _mejs2.default.mepIndex++;
	
			_mejs2.default.players[t.id] = t;
	
			t.init();
	
			return t;
		}
	
		_createClass(MediaElementPlayer, [{
			key: 'getElement',
			value: function getElement(element) {
				return element;
			}
		}, {
			key: 'init',
			value: function init() {
				var t = this,
					playerOptions = Object.assign({}, t.options, {
					success: function success(media, domNode) {
						t._meReady(media, domNode);
					},
					error: function error(e) {
						t._handleError(e);
					}
				}),
					tagName = t.node.tagName.toLowerCase();
	
				t.isDynamic = tagName !== 'audio' && tagName !== 'video' && tagName !== 'iframe';
				t.isVideo = t.isDynamic ? t.options.isVideo : tagName !== 'audio' && t.options.isVideo;
				t.mediaFiles = null;
				t.trackFiles = null;
	
				if (_constants.IS_IPAD && t.options.iPadUseNativeControls || _constants.IS_IPHONE && t.options.iPhoneUseNativeControls) {
					t.node.setAttribute('controls', true);
	
					if (_constants.IS_IPAD && t.node.getAttribute('autoplay')) {
						t.play();
					}
				} else if ((t.isVideo || !t.isVideo && (t.options.features.length || t.options.useDefaultControls)) && !(_constants.IS_ANDROID && t.options.AndroidUseNativeControls)) {
					t.node.removeAttribute('controls');
					var videoPlayerTitle = t.isVideo ? _i18n2.default.t('mejs.video-player') : _i18n2.default.t('mejs.audio-player');
	
					var offscreen = _document2.default.createElement('span');
					offscreen.className = t.options.classPrefix + 'offscreen';
					offscreen.innerText = videoPlayerTitle;
					t.media.parentNode.insertBefore(offscreen, t.media);
	
					t.container = _document2.default.createElement('div');
					t.getElement(t.container).id = t.id;
					t.getElement(t.container).className = t.options.classPrefix + 'container ' + t.options.classPrefix + 'container-keyboard-inactive ' + t.media.className;
					t.getElement(t.container).tabIndex = 0;
					t.getElement(t.container).setAttribute('role', 'application');
					t.getElement(t.container).setAttribute('aria-label', videoPlayerTitle);
					t.getElement(t.container).innerHTML = '<div class="' + t.options.classPrefix + 'inner">' + ('<div class="' + t.options.classPrefix + 'mediaelement"></div>') + ('<div class="' + t.options.classPrefix + 'layers"></div>') + ('<div class="' + t.options.classPrefix + 'controls"></div>') + '</div>';
					t.getElement(t.container).addEventListener('focus', function (e) {
						if (!t.controlsAreVisible && !t.hasFocus && t.controlsEnabled) {
							t.showControls(true);
	
							var btnSelector = (0, _general.isNodeAfter)(e.relatedTarget, t.getElement(t.container)) ? '.' + t.options.classPrefix + 'controls .' + t.options.classPrefix + 'button:last-child > button' : '.' + t.options.classPrefix + 'playpause-button > button',
								button = t.getElement(t.container).querySelector(btnSelector);
	
							button.focus();
						}
					});
					t.node.parentNode.insertBefore(t.getElement(t.container), t.node);
	
					if (!t.options.features.length && !t.options.useDefaultControls) {
						t.getElement(t.container).style.background = 'transparent';
						t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'controls').style.display = 'none';
					}
	
					if (t.isVideo && t.options.stretching === 'fill' && !dom.hasClass(t.getElement(t.container).parentNode, t.options.classPrefix + 'fill-container')) {
						t.outerContainer = t.media.parentNode;
	
						var wrapper = _document2.default.createElement('div');
						wrapper.className = t.options.classPrefix + 'fill-container';
						t.getElement(t.container).parentNode.insertBefore(wrapper, t.getElement(t.container));
						wrapper.appendChild(t.getElement(t.container));
					}
	
					if (_constants.IS_ANDROID) {
						dom.addClass(t.getElement(t.container), t.options.classPrefix + 'android');
					}
					if (_constants.IS_IOS) {
						dom.addClass(t.getElement(t.container), t.options.classPrefix + 'ios');
					}
					if (_constants.IS_IPAD) {
						dom.addClass(t.getElement(t.container), t.options.classPrefix + 'ipad');
					}
					if (_constants.IS_IPHONE) {
						dom.addClass(t.getElement(t.container), t.options.classPrefix + 'iphone');
					}
					dom.addClass(t.getElement(t.container), t.isVideo ? t.options.classPrefix + 'video' : t.options.classPrefix + 'audio');
	
					t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'mediaelement').appendChild(t.node);
	
					t.media.player = t;
	
					t.controls = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'controls');
					t.layers = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'layers');
	
					var tagType = t.isVideo ? 'video' : 'audio',
						capsTagName = tagType.substring(0, 1).toUpperCase() + tagType.substring(1);
	
					if (t.options[tagType + 'Width'] > 0 || t.options[tagType + 'Width'].toString().indexOf('%') > -1) {
						t.width = t.options[tagType + 'Width'];
					} else if (t.node.style.width !== '' && t.node.style.width !== null) {
						t.width = t.node.style.width;
					} else if (t.node.getAttribute('width')) {
						t.width = t.node.getAttribute('width');
					} else {
						t.width = t.options['default' + capsTagName + 'Width'];
					}
	
					if (t.options[tagType + 'Height'] > 0 || t.options[tagType + 'Height'].toString().indexOf('%') > -1) {
						t.height = t.options[tagType + 'Height'];
					} else if (t.node.style.height !== '' && t.node.style.height !== null) {
						t.height = t.node.style.height;
					} else if (t.node.getAttribute('height')) {
						t.height = t.node.getAttribute('height');
					} else {
						t.height = t.options['default' + capsTagName + 'Height'];
					}
	
					t.initialAspectRatio = t.height >= t.width ? t.width / t.height : t.height / t.width;
	
					t.setPlayerSize(t.width, t.height);
	
					playerOptions.pluginWidth = t.width;
					playerOptions.pluginHeight = t.height;
				} else if (!t.isVideo && !t.options.features.length && !t.options.useDefaultControls) {
						t.node.style.display = 'none';
					}
	
				_mejs2.default.MepDefaults = playerOptions;
	
				new _mediaelement2.default(t.media, playerOptions, t.mediaFiles);
	
				if (t.getElement(t.container) !== undefined && t.options.features.length && t.controlsAreVisible && !t.options.hideVideoControlsOnLoad) {
					var event = (0, _general.createEvent)('controlsshown', t.getElement(t.container));
					t.getElement(t.container).dispatchEvent(event);
				}
			}
		}, {
			key: 'showControls',
			value: function showControls(doAnimation) {
				var t = this;
	
				doAnimation = doAnimation === undefined || doAnimation;
	
				if (t.controlsAreVisible || !t.isVideo) {
					return;
				}
	
				if (doAnimation) {
					(function () {
						dom.fadeIn(t.getElement(t.controls), 200, function () {
							dom.removeClass(t.getElement(t.controls), t.options.classPrefix + 'offscreen');
							var event = (0, _general.createEvent)('controlsshown', t.getElement(t.container));
							t.getElement(t.container).dispatchEvent(event);
						});
	
						var controls = t.getElement(t.container).querySelectorAll('.' + t.options.classPrefix + 'control');
	
						var _loop = function _loop(i, total) {
							dom.fadeIn(controls[i], 200, function () {
								dom.removeClass(controls[i], t.options.classPrefix + 'offscreen');
							});
						};
	
						for (var i = 0, total = controls.length; i < total; i++) {
							_loop(i, total);
						}
					})();
				} else {
					dom.removeClass(t.getElement(t.controls), t.options.classPrefix + 'offscreen');
					t.getElement(t.controls).style.display = '';
					t.getElement(t.controls).style.opacity = 1;
	
					var controls = t.getElement(t.container).querySelectorAll('.' + t.options.classPrefix + 'control');
					for (var i = 0, total = controls.length; i < total; i++) {
						dom.removeClass(controls[i], t.options.classPrefix + 'offscreen');
						controls[i].style.display = '';
					}
	
					var event = (0, _general.createEvent)('controlsshown', t.getElement(t.container));
					t.getElement(t.container).dispatchEvent(event);
				}
	
				t.controlsAreVisible = true;
				t.setControlsSize();
			}
		}, {
			key: 'hideControls',
			value: function hideControls(doAnimation, forceHide) {
				var t = this;
	
				doAnimation = doAnimation === undefined || doAnimation;
	
				if (forceHide !== true && (!t.controlsAreVisible || t.options.alwaysShowControls || t.paused && t.readyState === 4 && (!t.options.hideVideoControlsOnLoad && t.currentTime <= 0 || !t.options.hideVideoControlsOnPause && t.currentTime > 0) || t.isVideo && !t.options.hideVideoControlsOnLoad && !t.readyState || t.ended)) {
					return;
				}
	
				if (doAnimation) {
					(function () {
						dom.fadeOut(t.getElement(t.controls), 200, function () {
							dom.addClass(t.getElement(t.controls), t.options.classPrefix + 'offscreen');
							t.getElement(t.controls).style.display = '';
							var event = (0, _general.createEvent)('controlshidden', t.getElement(t.container));
							t.getElement(t.container).dispatchEvent(event);
						});
	
						var controls = t.getElement(t.container).querySelectorAll('.' + t.options.classPrefix + 'control');
	
						var _loop2 = function _loop2(i, total) {
							dom.fadeOut(controls[i], 200, function () {
								dom.addClass(controls[i], t.options.classPrefix + 'offscreen');
								controls[i].style.display = '';
							});
						};
	
						for (var i = 0, total = controls.length; i < total; i++) {
							_loop2(i, total);
						}
					})();
				} else {
					dom.addClass(t.getElement(t.controls), t.options.classPrefix + 'offscreen');
					t.getElement(t.controls).style.display = '';
					t.getElement(t.controls).style.opacity = 0;
	
					var controls = t.getElement(t.container).querySelectorAll('.' + t.options.classPrefix + 'control');
					for (var i = 0, total = controls.length; i < total; i++) {
						dom.addClass(controls[i], t.options.classPrefix + 'offscreen');
						controls[i].style.display = '';
					}
	
					var event = (0, _general.createEvent)('controlshidden', t.getElement(t.container));
					t.getElement(t.container).dispatchEvent(event);
				}
	
				t.controlsAreVisible = false;
			}
		}, {
			key: 'startControlsTimer',
			value: function startControlsTimer(timeout) {
				var t = this;
	
				timeout = typeof timeout !== 'undefined' ? timeout : t.options.controlsTimeoutDefault;
	
				t.killControlsTimer('start');
	
				t.controlsTimer = setTimeout(function () {
					t.hideControls();
					t.killControlsTimer('hide');
				}, timeout);
			}
		}, {
			key: 'killControlsTimer',
			value: function killControlsTimer() {
				var t = this;
	
				if (t.controlsTimer !== null) {
					clearTimeout(t.controlsTimer);
					delete t.controlsTimer;
					t.controlsTimer = null;
				}
			}
		}, {
			key: 'disableControls',
			value: function disableControls() {
				var t = this;
	
				t.killControlsTimer();
				t.controlsEnabled = false;
				t.hideControls(false, true);
			}
		}, {
			key: 'enableControls',
			value: function enableControls() {
				var t = this;
	
				t.controlsEnabled = true;
				t.showControls(false);
			}
		}, {
			key: '_setDefaultPlayer',
			value: function _setDefaultPlayer() {
				var t = this;
				if (t.proxy) {
					t.proxy.pause();
				}
				t.proxy = new _default2.default(t);
				t.media.addEventListener('loadedmetadata', function () {
					if (t.getCurrentTime() > 0 && t.currentMediaTime > 0) {
						t.setCurrentTime(t.currentMediaTime);
						if (!_constants.IS_IOS && !_constants.IS_ANDROID) {
							t.play();
						}
					}
				});
			}
		}, {
			key: '_meReady',
			value: function _meReady(media, domNode) {
				var t = this,
					autoplayAttr = domNode.getAttribute('autoplay'),
					autoplay = !(autoplayAttr === undefined || autoplayAttr === null || autoplayAttr === 'false'),
					isNative = media.rendererName !== null && /(native|html5)/i.test(t.media.rendererName);
	
				if (t.getElement(t.controls)) {
					t.enableControls();
				}
	
				if (t.getElement(t.container) && t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'overlay-play')) {
					t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'overlay-play').style.display = '';
				}
	
				if (t.created) {
					return;
				}
	
				t.created = true;
				t.media = media;
				t.domNode = domNode;
	
				if (!(_constants.IS_ANDROID && t.options.AndroidUseNativeControls) && !(_constants.IS_IPAD && t.options.iPadUseNativeControls) && !(_constants.IS_IPHONE && t.options.iPhoneUseNativeControls)) {
					if (!t.isVideo && !t.options.features.length && !t.options.useDefaultControls) {
						if (autoplay && isNative) {
							t.play();
						}
	
						if (t.options.success) {
	
							if (typeof t.options.success === 'string') {
								_window2.default[t.options.success](t.media, t.domNode, t);
							} else {
								t.options.success(t.media, t.domNode, t);
							}
						}
	
						return;
					}
	
					t.featurePosition = {};
	
					t._setDefaultPlayer();
	
					t.buildposter(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
					t.buildkeyboard(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
					t.buildoverlays(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
	
					if (t.options.useDefaultControls) {
						var defaultControls = ['playpause', 'current', 'progress', 'duration', 'tracks', 'volume', 'fullscreen'];
						t.options.features = defaultControls.concat(t.options.features.filter(function (item) {
							return defaultControls.indexOf(item) === -1;
						}));
					}
	
					t.buildfeatures(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
	
					var event = (0, _general.createEvent)('controlsready', t.getElement(t.container));
					t.getElement(t.container).dispatchEvent(event);
	
					t.setPlayerSize(t.width, t.height);
					t.setControlsSize();
	
					if (t.isVideo) {
						t.clickToPlayPauseCallback = function () {
	
							if (t.options.clickToPlayPause) {
								var button = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'overlay-button'),
									pressed = button.getAttribute('aria-pressed');
	
								if (t.paused && pressed) {
									t.pause();
								} else if (t.paused) {
									t.play();
								} else {
									t.pause();
								}
	
								button.setAttribute('aria-pressed', !pressed);
								t.getElement(t.container).focus();
							}
						};
	
						t.createIframeLayer();
	
						t.media.addEventListener('click', t.clickToPlayPauseCallback);
	
						if ((_constants.IS_ANDROID || _constants.IS_IOS) && !t.options.alwaysShowControls) {
							t.node.addEventListener('touchstart', function () {
								if (t.controlsAreVisible) {
									t.hideControls(false);
								} else {
									if (t.controlsEnabled) {
										t.showControls(false);
									}
								}
							}, _constants.SUPPORT_PASSIVE_EVENT ? { passive: true } : false);
						} else {
							t.getElement(t.container).addEventListener('mouseenter', function () {
								if (t.controlsEnabled) {
									if (!t.options.alwaysShowControls) {
										t.killControlsTimer('enter');
										t.showControls();
										t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
									}
								}
							});
							t.getElement(t.container).addEventListener('mousemove', function () {
								if (t.controlsEnabled) {
									if (!t.controlsAreVisible) {
										t.showControls();
									}
									if (!t.options.alwaysShowControls) {
										t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
									}
								}
							});
							t.getElement(t.container).addEventListener('mouseleave', function () {
								if (t.controlsEnabled) {
									if (!t.paused && !t.options.alwaysShowControls) {
										t.startControlsTimer(t.options.controlsTimeoutMouseLeave);
									}
								}
							});
						}
	
						if (t.options.hideVideoControlsOnLoad) {
							t.hideControls(false);
						}
	
						if (t.options.enableAutosize) {
							t.media.addEventListener('loadedmetadata', function (e) {
								var target = e !== undefined ? e.detail.target || e.target : t.media;
								if (t.options.videoHeight <= 0 && !t.domNode.getAttribute('height') && !t.domNode.style.height && target !== null && !isNaN(target.videoHeight)) {
									t.setPlayerSize(target.videoWidth, target.videoHeight);
									t.setControlsSize();
									t.media.setSize(target.videoWidth, target.videoHeight);
								}
							});
						}
					}
	
					t.media.addEventListener('play', function () {
						t.hasFocus = true;
	
						for (var playerIndex in _mejs2.default.players) {
							if (_mejs2.default.players.hasOwnProperty(playerIndex)) {
								var p = _mejs2.default.players[playerIndex];
	
								if (p.id !== t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended && p.options.ignorePauseOtherPlayersOption !== true) {
									p.pause();
									p.hasFocus = false;
								}
							}
						}
	
						if (!(_constants.IS_ANDROID || _constants.IS_IOS) && !t.options.alwaysShowControls && t.isVideo) {
							t.hideControls();
						}
					});
	
					t.media.addEventListener('ended', function () {
						if (t.options.autoRewind) {
							try {
								t.setCurrentTime(0);
	
								setTimeout(function () {
									var loadingElement = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'overlay-loading');
									if (loadingElement && loadingElement.parentNode) {
										loadingElement.parentNode.style.display = 'none';
									}
								}, 20);
							} catch (exp) {
								
							}
						}
	
						if (typeof t.media.renderer.stop === 'function') {
							t.media.renderer.stop();
						} else {
							t.pause();
						}
	
						if (t.setProgressRail) {
							t.setProgressRail();
						}
						if (t.setCurrentRail) {
							t.setCurrentRail();
						}
	
						if (t.options.loop) {
							t.play();
						} else if (!t.options.alwaysShowControls && t.controlsEnabled) {
							t.showControls();
						}
					});
	
					t.media.addEventListener('loadedmetadata', function () {
	
						(0, _time.calculateTimeFormat)(t.getDuration(), t.options, t.options.framesPerSecond || 25);
	
						if (t.updateDuration) {
							t.updateDuration();
						}
						if (t.updateCurrent) {
							t.updateCurrent();
						}
	
						if (!t.isFullScreen) {
							t.setPlayerSize(t.width, t.height);
							t.setControlsSize();
						}
					});
	
					var duration = null;
					t.media.addEventListener('timeupdate', function () {
						if (!isNaN(t.getDuration()) && duration !== t.getDuration()) {
							duration = t.getDuration();
							(0, _time.calculateTimeFormat)(duration, t.options, t.options.framesPerSecond || 25);
	
							if (t.updateDuration) {
								t.updateDuration();
							}
							if (t.updateCurrent) {
								t.updateCurrent();
							}
	
							t.setControlsSize();
						}
					});
	
					t.getElement(t.container).addEventListener('click', function (e) {
						dom.addClass(e.currentTarget, t.options.classPrefix + 'container-keyboard-inactive');
					});
	
					t.getElement(t.container).addEventListener('focusin', function (e) {
						dom.removeClass(e.currentTarget, t.options.classPrefix + 'container-keyboard-inactive');
						if (t.isVideo && !_constants.IS_ANDROID && !_constants.IS_IOS && t.controlsEnabled && !t.options.alwaysShowControls) {
							t.killControlsTimer('enter');
							t.showControls();
							t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
						}
					});
	
					t.getElement(t.container).addEventListener('focusout', function (e) {
						setTimeout(function () {
							if (e.relatedTarget) {
								if (t.keyboardAction && !e.relatedTarget.closest('.' + t.options.classPrefix + 'container')) {
									t.keyboardAction = false;
									if (t.isVideo && !t.options.alwaysShowControls && !t.paused) {
										t.startControlsTimer(t.options.controlsTimeoutMouseLeave);
									}
								}
							}
						}, 0);
					});
	
					setTimeout(function () {
						t.setPlayerSize(t.width, t.height);
						t.setControlsSize();
					}, 0);
	
					t.globalResizeCallback = function () {
						if (!(t.isFullScreen || _constants.HAS_TRUE_NATIVE_FULLSCREEN && _document2.default.webkitIsFullScreen)) {
							t.setPlayerSize(t.width, t.height);
						}
	
						t.setControlsSize();
					};
	
					t.globalBind('resize', t.globalResizeCallback);
				}
	
				if (autoplay && isNative) {
					t.play();
				}
	
				if (t.options.success) {
					if (typeof t.options.success === 'string') {
						_window2.default[t.options.success](t.media, t.domNode, t);
					} else {
						t.options.success(t.media, t.domNode, t);
					}
				}
			}
		}, {
			key: '_handleError',
			value: function _handleError(e, media, node) {
				var t = this,
					play = t.getElement(t.layers).querySelector('.' + t.options.classPrefix + 'overlay-play');
	
				if (play) {
					play.style.display = 'none';
				}
	
				if (t.options.error) {
					t.options.error(e, media, node);
				}
	
				if (t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'cannotplay')) {
					t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'cannotplay').remove();
				}
	
				var errorContainer = _document2.default.createElement('div');
				errorContainer.className = t.options.classPrefix + 'cannotplay';
				errorContainer.style.width = '100%';
				errorContainer.style.height = '100%';
	
				var errorContent = typeof t.options.customError === 'function' ? t.options.customError(t.media, t.media.originalNode) : t.options.customError,
					imgError = '';
	
				if (!errorContent) {
					var poster = t.media.originalNode.getAttribute('poster');
					if (poster) {
						imgError = '<img src="' + poster + '" alt="' + _mejs2.default.i18n.t('mejs.download-file') + '">';
					}
	
					if (e.message) {
						errorContent = '<p>' + e.message + '</p>';
					}
	
					if (e.urls) {
						for (var i = 0, total = e.urls.length; i < total; i++) {
							var url = e.urls[i];
							errorContent += '<a href="' + url.src + '" data-type="' + url.type + '"><span>' + _mejs2.default.i18n.t('mejs.download-file') + ': ' + url.src + '</span></a>';
						}
					}
				}
	
				if (errorContent && t.getElement(t.layers).querySelector('.' + t.options.classPrefix + 'overlay-error')) {
					errorContainer.innerHTML = errorContent;
					t.getElement(t.layers).querySelector('.' + t.options.classPrefix + 'overlay-error').innerHTML = '' + imgError + errorContainer.outerHTML;
					t.getElement(t.layers).querySelector('.' + t.options.classPrefix + 'overlay-error').parentNode.style.display = 'block';
				}
	
				if (t.controlsEnabled) {
					t.disableControls();
				}
			}
		}, {
			key: 'setPlayerSize',
			value: function setPlayerSize(width, height) {
				var t = this;
	
				if (!t.options.setDimensions) {
					return false;
				}
	
				if (typeof width !== 'undefined') {
					t.width = width;
				}
	
				if (typeof height !== 'undefined') {
					t.height = height;
				}
	
				switch (t.options.stretching) {
					case 'fill':
						if (t.isVideo) {
							t.setFillMode();
						} else {
							t.setDimensions(t.width, t.height);
						}
						break;
					case 'responsive':
						t.setResponsiveMode();
						break;
					case 'none':
						t.setDimensions(t.width, t.height);
						break;
	
					default:
						if (t.hasFluidMode() === true) {
							t.setResponsiveMode();
						} else {
							t.setDimensions(t.width, t.height);
						}
						break;
				}
			}
		}, {
			key: 'hasFluidMode',
			value: function hasFluidMode() {
				var t = this;
	
				return t.height.toString().indexOf('%') !== -1 || t.node && t.node.style.maxWidth && t.node.style.maxWidth !== 'none' && t.node.style.maxWidth !== t.width || t.node && t.node.currentStyle && t.node.currentStyle.maxWidth === '100%';
			}
		}, {
			key: 'setResponsiveMode',
			value: function setResponsiveMode() {
				var t = this,
					parent = function () {
	
					var parentEl = void 0,
						el = t.getElement(t.container);
	
					while (el) {
						try {
							if (_constants.IS_FIREFOX && el.tagName.toLowerCase() === 'html' && _window2.default.self !== _window2.default.top && _window2.default.frameElement !== null) {
								return _window2.default.frameElement;
							} else {
								parentEl = el.parentElement;
							}
						} catch (e) {
							parentEl = el.parentElement;
						}
	
						if (parentEl && dom.visible(parentEl)) {
							return parentEl;
						}
						el = parentEl;
					}
	
					return null;
				}(),
					parentStyles = parent ? getComputedStyle(parent, null) : getComputedStyle(_document2.default.body, null),
					nativeWidth = function () {
					if (t.isVideo) {
						if (t.node.videoWidth && t.node.videoWidth > 0) {
							return t.node.videoWidth;
						} else if (t.node.getAttribute('width')) {
							return t.node.getAttribute('width');
						} else {
							return t.options.defaultVideoWidth;
						}
					} else {
						return t.options.defaultAudioWidth;
					}
				}(),
					nativeHeight = function () {
					if (t.isVideo) {
						if (t.node.videoHeight && t.node.videoHeight > 0) {
							return t.node.videoHeight;
						} else if (t.node.getAttribute('height')) {
							return t.node.getAttribute('height');
						} else {
							return t.options.defaultVideoHeight;
						}
					} else {
						return t.options.defaultAudioHeight;
					}
				}(),
					aspectRatio = function () {
					var ratio = 1;
					if (!t.isVideo) {
						return ratio;
					}
	
					if (t.node.videoWidth && t.node.videoWidth > 0 && t.node.videoHeight && t.node.videoHeight > 0) {
						ratio = t.height >= t.width ? t.node.videoWidth / t.node.videoHeight : t.node.videoHeight / t.node.videoWidth;
					} else {
						ratio = t.initialAspectRatio;
					}
	
					if (isNaN(ratio) || ratio < 0.01 || ratio > 100) {
						ratio = 1;
					}
	
					return ratio;
				}(),
					parentHeight = parseFloat(parentStyles.height);
	
				var newHeight = void 0,
					parentWidth = parseFloat(parentStyles.width);
	
				if (t.isVideo) {
					if (t.height === '100%') {
						newHeight = parseFloat(parentWidth * nativeHeight / nativeWidth, 10);
					} else {
						newHeight = t.height >= t.width ? parseFloat(parentWidth / aspectRatio, 10) : parseFloat(parentWidth * aspectRatio, 10);
					}
				} else {
					newHeight = nativeHeight;
				}
	
				if (isNaN(newHeight)) {
					newHeight = parentHeight;
				}
	
				if (t.getElement(t.container).parentNode.length > 0 && t.getElement(t.container).parentNode.tagName.toLowerCase() === 'body') {
					parentWidth = _window2.default.innerWidth || _document2.default.documentElement.clientWidth || _document2.default.body.clientWidth;
					newHeight = _window2.default.innerHeight || _document2.default.documentElement.clientHeight || _document2.default.body.clientHeight;
				}
	
				if (newHeight && parentWidth) {
					t.getElement(t.container).style.width = parentWidth + 'px';
					t.getElement(t.container).style.height = newHeight + 'px';
	
					t.node.style.width = '100%';
					t.node.style.height = '100%';
	
					if (t.isVideo && t.media.setSize) {
						t.media.setSize(parentWidth, newHeight);
					}
	
					var layerChildren = t.getElement(t.layers).children;
					for (var i = 0, total = layerChildren.length; i < total; i++) {
						layerChildren[i].style.width = '100%';
						layerChildren[i].style.height = '100%';
					}
				}
			}
		}, {
			key: 'setFillMode',
			value: function setFillMode() {
				var t = this;
				var isIframe = _window2.default.self !== _window2.default.top && _window2.default.frameElement !== null;
				var parent = function () {
					var parentEl = void 0,
						el = t.getElement(t.container);
	
					while (el) {
						try {
							if (_constants.IS_FIREFOX && el.tagName.toLowerCase() === 'html' && _window2.default.self !== _window2.default.top && _window2.default.frameElement !== null) {
								return _window2.default.frameElement;
							} else {
								parentEl = el.parentElement;
							}
						} catch (e) {
							parentEl = el.parentElement;
						}
	
						if (parentEl && dom.visible(parentEl)) {
							return parentEl;
						}
						el = parentEl;
					}
	
					return null;
				}();
				var parentStyles = parent ? getComputedStyle(parent, null) : getComputedStyle(_document2.default.body, null);
	
				if (t.node.style.height !== 'none' && t.node.style.height !== t.height) {
					t.node.style.height = 'auto';
				}
				if (t.node.style.maxWidth !== 'none' && t.node.style.maxWidth !== t.width) {
					t.node.style.maxWidth = 'none';
				}
	
				if (t.node.style.maxHeight !== 'none' && t.node.style.maxHeight !== t.height) {
					t.node.style.maxHeight = 'none';
				}
	
				if (t.node.currentStyle) {
					if (t.node.currentStyle.height === '100%') {
						t.node.currentStyle.height = 'auto';
					}
					if (t.node.currentStyle.maxWidth === '100%') {
						t.node.currentStyle.maxWidth = 'none';
					}
					if (t.node.currentStyle.maxHeight === '100%') {
						t.node.currentStyle.maxHeight = 'none';
					}
				}
	
				if (!isIframe && !parseFloat(parentStyles.width)) {
					parent.style.width = t.media.offsetWidth + 'px';
				}
	
				if (!isIframe && !parseFloat(parentStyles.height)) {
					parent.style.height = t.media.offsetHeight + 'px';
				}
	
				parentStyles = getComputedStyle(parent);
	
				var parentWidth = parseFloat(parentStyles.width),
					parentHeight = parseFloat(parentStyles.height);
	
				t.setDimensions('100%', '100%');
	
				var poster = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'poster>img');
				if (poster) {
					poster.style.display = '';
				}
	
				var targetElement = t.getElement(t.container).querySelectorAll('object, embed, iframe, video'),
					initHeight = t.height,
					initWidth = t.width,
					scaleX1 = parentWidth,
					scaleY1 = initHeight * parentWidth / initWidth,
					scaleX2 = initWidth * parentHeight / initHeight,
					scaleY2 = parentHeight,
					bScaleOnWidth = scaleX2 > parentWidth === false,
					finalWidth = bScaleOnWidth ? Math.floor(scaleX1) : Math.floor(scaleX2),
					finalHeight = bScaleOnWidth ? Math.floor(scaleY1) : Math.floor(scaleY2),
					width = bScaleOnWidth ? parentWidth + 'px' : finalWidth + 'px',
					height = bScaleOnWidth ? finalHeight + 'px' : parentHeight + 'px';
	
				for (var i = 0, total = targetElement.length; i < total; i++) {
					targetElement[i].style.height = height;
					targetElement[i].style.width = width;
					if (t.media.setSize) {
						t.media.setSize(width, height);
					}
	
					targetElement[i].style.marginLeft = Math.floor((parentWidth - finalWidth) / 2) + 'px';
					targetElement[i].style.marginTop = 0;
				}
			}
		}, {
			key: 'setDimensions',
			value: function setDimensions(width, height) {
				var t = this;
	
				width = (0, _general.isString)(width) && width.indexOf('%') > -1 ? width : parseFloat(width) + 'px';
				height = (0, _general.isString)(height) && height.indexOf('%') > -1 ? height : parseFloat(height) + 'px';
	
				t.getElement(t.container).style.width = width;
				t.getElement(t.container).style.height = height;
	
				var layers = t.getElement(t.layers).children;
				for (var i = 0, total = layers.length; i < total; i++) {
					layers[i].style.width = width;
					layers[i].style.height = height;
				}
			}
		}, {
			key: 'setControlsSize',
			value: function setControlsSize() {
				var t = this;
	
				if (!dom.visible(t.getElement(t.container))) {
					return;
				}
	
				if (t.rail && dom.visible(t.rail)) {
					var totalStyles = t.total ? getComputedStyle(t.total, null) : null,
						totalMargin = totalStyles ? parseFloat(totalStyles.marginLeft) + parseFloat(totalStyles.marginRight) : 0,
						railStyles = getComputedStyle(t.rail),
						railMargin = parseFloat(railStyles.marginLeft) + parseFloat(railStyles.marginRight);
	
					var siblingsWidth = 0;
	
					var siblings = dom.siblings(t.rail, function (el) {
						return el !== t.rail;
					}),
						total = siblings.length;
					for (var i = 0; i < total; i++) {
						siblingsWidth += siblings[i].offsetWidth;
					}
	
					siblingsWidth += totalMargin + (totalMargin === 0 ? railMargin * 2 : railMargin) + 1;
	
					t.getElement(t.container).style.minWidth = siblingsWidth + 'px';
	
					var event = (0, _general.createEvent)('controlsresize', t.getElement(t.container));
					t.getElement(t.container).dispatchEvent(event);
				} else {
					var children = t.getElement(t.controls).children;
					var minWidth = 0;
	
					for (var _i = 0, _total = children.length; _i < _total; _i++) {
						minWidth += children[_i].offsetWidth;
					}
	
					t.getElement(t.container).style.minWidth = minWidth + 'px';
				}
			}
		}, {
			key: 'addControlElement',
			value: function addControlElement(element, key) {
	
				var t = this;
	
				if (t.featurePosition[key] !== undefined) {
					var child = t.getElement(t.controls).children[t.featurePosition[key] - 1];
					child.parentNode.insertBefore(element, child.nextSibling);
				} else {
					t.getElement(t.controls).appendChild(element);
					var children = t.getElement(t.controls).children;
					for (var i = 0, total = children.length; i < total; i++) {
						if (element === children[i]) {
							t.featurePosition[key] = i;
							break;
						}
					}
				}
			}
		}, {
			key: 'createIframeLayer',
			value: function createIframeLayer() {
				var t = this;
	
				if (t.isVideo && t.media.rendererName !== null && t.media.rendererName.indexOf('iframe') > -1 && !_document2.default.getElementById(t.media.id + '-iframe-overlay')) {
	
					var layer = _document2.default.createElement('div'),
						target = _document2.default.getElementById(t.media.id + '_' + t.media.rendererName);
	
					layer.id = t.media.id + '-iframe-overlay';
					layer.className = t.options.classPrefix + 'iframe-overlay';
					layer.addEventListener('click', function (e) {
						if (t.options.clickToPlayPause) {
							if (t.paused) {
								t.play();
							} else {
								t.pause();
							}
	
							e.preventDefault();
							e.stopPropagation();
						}
					});
	
					target.parentNode.insertBefore(layer, target);
				}
			}
		}, {
			key: 'resetSize',
			value: function resetSize() {
				var t = this;
	
				setTimeout(function () {
					t.setPlayerSize(t.width, t.height);
					t.setControlsSize();
				}, 50);
			}
		}, {
			key: 'setPoster',
			value: function setPoster(url) {
				var t = this;
	
				if (t.getElement(t.container)) {
					var posterDiv = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'poster');
	
					if (!posterDiv) {
						posterDiv = _document2.default.createElement('div');
						posterDiv.className = t.options.classPrefix + 'poster ' + t.options.classPrefix + 'layer';
						t.getElement(t.layers).appendChild(posterDiv);
					}
	
					var posterImg = posterDiv.querySelector('img');
	
					if (!posterImg && url) {
						posterImg = _document2.default.createElement('img');
						posterImg.className = t.options.classPrefix + 'poster-img';
						posterImg.width = '100%';
						posterImg.height = '100%';
						posterDiv.style.display = '';
						posterDiv.appendChild(posterImg);
					}
	
					if (url) {
						posterImg.setAttribute('src', url);
						posterDiv.style.backgroundImage = 'url("' + url + '")';
						posterDiv.style.display = '';
					} else if (posterImg) {
						posterDiv.style.backgroundImage = 'none';
						posterDiv.style.display = 'none';
						posterImg.remove();
					} else {
						posterDiv.style.display = 'none';
					}
				} else if (_constants.IS_IPAD && t.options.iPadUseNativeControls || _constants.IS_IPHONE && t.options.iPhoneUseNativeControls || _constants.IS_ANDROID && t.options.AndroidUseNativeControls) {
					t.media.originalNode.poster = url;
				}
			}
		}, {
			key: 'changeSkin',
			value: function changeSkin(className) {
				var t = this;
	
				t.getElement(t.container).className = t.options.classPrefix + 'container ' + className;
				t.setPlayerSize(t.width, t.height);
				t.setControlsSize();
			}
		}, {
			key: 'globalBind',
			value: function globalBind(events, callback) {
				var t = this,
					doc = t.node ? t.node.ownerDocument : _document2.default;
	
				events = (0, _general.splitEvents)(events, t.id);
				if (events.d) {
					var eventList = events.d.split(' ');
					for (var i = 0, total = eventList.length; i < total; i++) {
						eventList[i].split('.').reduce(function (part, e) {
							doc.addEventListener(e, callback, false);
							return e;
						}, '');
					}
				}
				if (events.w) {
					var _eventList = events.w.split(' ');
					for (var _i2 = 0, _total2 = _eventList.length; _i2 < _total2; _i2++) {
						_eventList[_i2].split('.').reduce(function (part, e) {
							_window2.default.addEventListener(e, callback, false);
							return e;
						}, '');
					}
				}
			}
		}, {
			key: 'globalUnbind',
			value: function globalUnbind(events, callback) {
				var t = this,
					doc = t.node ? t.node.ownerDocument : _document2.default;
	
				events = (0, _general.splitEvents)(events, t.id);
				if (events.d) {
					var eventList = events.d.split(' ');
					for (var i = 0, total = eventList.length; i < total; i++) {
						eventList[i].split('.').reduce(function (part, e) {
							doc.removeEventListener(e, callback, false);
							return e;
						}, '');
					}
				}
				if (events.w) {
					var _eventList2 = events.w.split(' ');
					for (var _i3 = 0, _total3 = _eventList2.length; _i3 < _total3; _i3++) {
						_eventList2[_i3].split('.').reduce(function (part, e) {
							_window2.default.removeEventListener(e, callback, false);
							return e;
						}, '');
					}
				}
			}
		}, {
			key: 'buildfeatures',
			value: function buildfeatures(player, controls, layers, media) {
				var t = this;
	
				for (var i = 0, total = t.options.features.length; i < total; i++) {
					var feature = t.options.features[i];
					if (t['build' + feature]) {
						try {
							t['build' + feature](player, controls, layers, media);
						} catch (e) {
							console.error('error building ' + feature, e);
						}
					}
				}
			}
		}, {
			key: 'buildposter',
			value: function buildposter(player, controls, layers, media) {
				var t = this,
					poster = _document2.default.createElement('div');
	
				poster.className = t.options.classPrefix + 'poster ' + t.options.classPrefix + 'layer';
				layers.appendChild(poster);
	
				var posterUrl = media.originalNode.getAttribute('poster');
	
				if (player.options.poster !== '') {
					if (posterUrl && _constants.IS_IOS) {
						media.originalNode.removeAttribute('poster');
					}
					posterUrl = player.options.poster;
				}
	
				if (posterUrl) {
					t.setPoster(posterUrl);
				} else if (t.media.renderer !== null && typeof t.media.renderer.getPosterUrl === 'function') {
					t.setPoster(t.media.renderer.getPosterUrl());
				} else {
					poster.style.display = 'none';
				}
	
				media.addEventListener('play', function () {
					poster.style.display = 'none';
				});
	
				media.addEventListener('playing', function () {
					poster.style.display = 'none';
				});
	
				if (player.options.showPosterWhenEnded && player.options.autoRewind) {
					media.addEventListener('ended', function () {
						poster.style.display = '';
					});
				}
	
				media.addEventListener('error', function () {
					poster.style.display = 'none';
				});
	
				if (player.options.showPosterWhenPaused) {
					media.addEventListener('pause', function () {
						if (!player.ended) {
							poster.style.display = '';
						}
					});
				}
			}
		}, {
			key: 'buildoverlays',
			value: function buildoverlays(player, controls, layers, media) {
	
				if (!player.isVideo) {
					return;
				}
	
				var t = this,
					loading = _document2.default.createElement('div'),
					error = _document2.default.createElement('div'),
					bigPlay = _document2.default.createElement('div');
	
				loading.style.display = 'none';
				loading.className = t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer';
				loading.innerHTML = '<div class="' + t.options.classPrefix + 'overlay-loading">' + ('<span class="' + t.options.classPrefix + 'overlay-loading-bg-img"></span>') + '</div>';
				layers.appendChild(loading);
	
				error.style.display = 'none';
				error.className = t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer';
				error.innerHTML = '<div class="' + t.options.classPrefix + 'overlay-error"></div>';
				layers.appendChild(error);
	
				bigPlay.className = t.options.classPrefix + 'overlay ' + t.options.classPrefix + 'layer ' + t.options.classPrefix + 'overlay-play';
				bigPlay.innerHTML = '<div class="' + t.options.classPrefix + 'overlay-button" role="button" tabindex="0" ' + ('aria-label="' + _i18n2.default.t('mejs.play') + '" aria-pressed="false"></div>');
				bigPlay.addEventListener('click', function () {
					if (t.options.clickToPlayPause) {
	
						var button = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'overlay-button'),
							pressed = button.getAttribute('aria-pressed');
	
						if (t.paused) {
							t.play();
						} else {
							t.pause();
						}
	
						button.setAttribute('aria-pressed', !!pressed);
						t.getElement(t.container).focus();
					}
				});
	
				bigPlay.addEventListener('keydown', function (e) {
					var keyPressed = e.keyCode || e.which || 0;
	
					if (keyPressed === 13 || _constants.IS_FIREFOX && keyPressed === 32) {
						var event = (0, _general.createEvent)('click', bigPlay);
						bigPlay.dispatchEvent(event);
						return false;
					}
				});
	
				layers.appendChild(bigPlay);
	
				if (t.media.rendererName !== null && (/(youtube|facebook)/i.test(t.media.rendererName) && !(t.media.originalNode.getAttribute('poster') || player.options.poster || typeof t.media.renderer.getPosterUrl === 'function' && t.media.renderer.getPosterUrl()) || _constants.IS_STOCK_ANDROID || t.media.originalNode.getAttribute('autoplay'))) {
					bigPlay.style.display = 'none';
				}
	
				var hasError = false;
	
				media.addEventListener('play', function () {
					bigPlay.style.display = 'none';
					loading.style.display = 'none';
					error.style.display = 'none';
					hasError = false;
				});
				media.addEventListener('playing', function () {
					bigPlay.style.display = 'none';
					loading.style.display = 'none';
					error.style.display = 'none';
					hasError = false;
				});
				media.addEventListener('seeking', function () {
					bigPlay.style.display = 'none';
					loading.style.display = '';
					hasError = false;
				});
				media.addEventListener('seeked', function () {
					bigPlay.style.display = t.paused && !_constants.IS_STOCK_ANDROID ? '' : 'none';
					loading.style.display = 'none';
					hasError = false;
				});
				media.addEventListener('pause', function () {
					loading.style.display = 'none';
					if (!_constants.IS_STOCK_ANDROID && !hasError) {
						bigPlay.style.display = '';
					}
					hasError = false;
				});
				media.addEventListener('waiting', function () {
					loading.style.display = '';
					hasError = false;
				});
	
				media.addEventListener('loadeddata', function () {
					loading.style.display = '';
	
					if (_constants.IS_ANDROID) {
						media.canplayTimeout = setTimeout(function () {
							if (_document2.default.createEvent) {
								var evt = _document2.default.createEvent('HTMLEvents');
								evt.initEvent('canplay', true, true);
								return media.dispatchEvent(evt);
							}
						}, 300);
					}
					hasError = false;
				});
				media.addEventListener('canplay', function () {
					loading.style.display = 'none';
	
					clearTimeout(media.canplayTimeout);
					hasError = false;
				});
	
				media.addEventListener('error', function (e) {
					t._handleError(e, t.media, t.node);
					loading.style.display = 'none';
					bigPlay.style.display = 'none';
					hasError = true;
				});
	
				media.addEventListener('loadedmetadata', function () {
					if (!t.controlsEnabled) {
						t.enableControls();
					}
				});
	
				media.addEventListener('keydown', function (e) {
					t.onkeydown(player, media, e);
					hasError = false;
				});
			}
		}, {
			key: 'buildkeyboard',
			value: function buildkeyboard(player, controls, layers, media) {
	
				var t = this;
	
				t.getElement(t.container).addEventListener('keydown', function () {
					t.keyboardAction = true;
				});
	
				t.globalKeydownCallback = function (event) {
					var container = _document2.default.activeElement.closest('.' + t.options.classPrefix + 'container'),
						target = t.media.closest('.' + t.options.classPrefix + 'container');
					t.hasFocus = !!(container && target && container.id === target.id);
					return t.onkeydown(player, media, event);
				};
	
				t.globalClickCallback = function (event) {
					t.hasFocus = !!event.target.closest('.' + t.options.classPrefix + 'container');
				};
	
				t.globalBind('keydown', t.globalKeydownCallback);
	
				t.globalBind('click', t.globalClickCallback);
			}
		}, {
			key: 'onkeydown',
			value: function onkeydown(player, media, e) {
	
				if (player.hasFocus && player.options.enableKeyboard) {
					for (var i = 0, total = player.options.keyActions.length; i < total; i++) {
						var keyAction = player.options.keyActions[i];
	
						for (var j = 0, jl = keyAction.keys.length; j < jl; j++) {
							if (e.keyCode === keyAction.keys[j]) {
								keyAction.action(player, media, e.keyCode, e);
								e.preventDefault();
								e.stopPropagation();
								return;
							}
						}
					}
				}
	
				return true;
			}
		}, {
			key: 'play',
			value: function play() {
				this.proxy.play();
			}
		}, {
			key: 'pause',
			value: function pause() {
				this.proxy.pause();
			}
		}, {
			key: 'load',
			value: function load() {
				this.proxy.load();
			}
		}, {
			key: 'setCurrentTime',
			value: function setCurrentTime(time) {
				this.proxy.setCurrentTime(time);
			}
		}, {
			key: 'getCurrentTime',
			value: function getCurrentTime() {
				return this.proxy.currentTime;
			}
		}, {
			key: 'getDuration',
			value: function getDuration() {
				return this.proxy.duration;
			}
		}, {
			key: 'setVolume',
			value: function setVolume(volume) {
				this.proxy.volume = volume;
			}
		}, {
			key: 'getVolume',
			value: function getVolume() {
				return this.proxy.getVolume();
			}
		}, {
			key: 'setMuted',
			value: function setMuted(value) {
				this.proxy.setMuted(value);
			}
		}, {
			key: 'setSrc',
			value: function setSrc(src) {
				if (!this.controlsEnabled) {
					this.enableControls();
				}
				this.proxy.setSrc(src);
			}
		}, {
			key: 'getSrc',
			value: function getSrc() {
				return this.proxy.getSrc();
			}
		}, {
			key: 'canPlayType',
			value: function canPlayType(type) {
				return this.proxy.canPlayType(type);
			}
		}, {
			key: 'remove',
			value: function remove() {
				var t = this,
					rendererName = t.media.rendererName,
					src = t.media.originalNode.src;
	
				for (var featureIndex in t.options.features) {
					var feature = t.options.features[featureIndex];
					if (t['clean' + feature]) {
						try {
							t['clean' + feature](t, t.getElement(t.layers), t.getElement(t.controls), t.media);
						} catch (e) {
							console.error('error cleaning ' + feature, e);
						}
					}
				}
	
				var nativeWidth = t.node.getAttribute('width'),
					nativeHeight = t.node.getAttribute('height');
	
				if (nativeWidth) {
					if (nativeWidth.indexOf('%') === -1) {
						nativeWidth = nativeWidth + 'px';
					}
				} else {
					nativeWidth = 'auto';
				}
	
				if (nativeHeight) {
					if (nativeHeight.indexOf('%') === -1) {
						nativeHeight = nativeHeight + 'px';
					}
				} else {
					nativeHeight = 'auto';
				}
	
				t.node.style.width = nativeWidth;
				t.node.style.height = nativeHeight;
	
				t.setPlayerSize(0, 0);
	
				if (!t.isDynamic) {
					(function () {
						t.node.setAttribute('controls', true);
						t.node.setAttribute('id', t.node.getAttribute('id').replace('_' + rendererName, '').replace('_from_mejs', ''));
						var poster = t.getElement(t.container).querySelector('.' + t.options.classPrefix + 'poster>img');
						if (poster) {
							t.node.setAttribute('poster', poster.src);
						}
	
						delete t.node.autoplay;
	
						t.node.setAttribute('src', '');
						if (t.media.canPlayType((0, _media.getTypeFromFile)(src)) !== '') {
							t.node.setAttribute('src', src);
						}
	
						if (rendererName && rendererName.indexOf('iframe') > -1) {
							var layer = _document2.default.getElementById(t.media.id + '-iframe-overlay');
							layer.remove();
						}
	
						var node = t.node.cloneNode();
						node.style.display = '';
						t.getElement(t.container).parentNode.insertBefore(node, t.getElement(t.container));
						t.node.remove();
	
						if (t.mediaFiles) {
							for (var i = 0, total = t.mediaFiles.length; i < total; i++) {
								var source = _document2.default.createElement('source');
								source.setAttribute('src', t.mediaFiles[i].src);
								source.setAttribute('type', t.mediaFiles[i].type);
								node.appendChild(source);
							}
						}
						if (t.trackFiles) {
							var _loop3 = function _loop3(_i4, _total4) {
								var track = t.trackFiles[_i4];
								var newTrack = _document2.default.createElement('track');
								newTrack.kind = track.kind;
								newTrack.label = track.label;
								newTrack.srclang = track.srclang;
								newTrack.src = track.src;
	
								node.appendChild(newTrack);
								newTrack.addEventListener('load', function () {
									this.mode = 'showing';
									node.textTracks[_i4].mode = 'showing';
								});
							};
	
							for (var _i4 = 0, _total4 = t.trackFiles.length; _i4 < _total4; _i4++) {
								_loop3(_i4, _total4);
							}
						}
	
						delete t.node;
						delete t.mediaFiles;
						delete t.trackFiles;
					})();
				} else {
					t.getElement(t.container).parentNode.insertBefore(t.node, t.getElement(t.container));
				}
	
				if (t.media.renderer && typeof t.media.renderer.destroy === 'function') {
					t.media.renderer.destroy();
				}
	
				delete _mejs2.default.players[t.id];
	
				if (_typeof(t.getElement(t.container)) === 'object') {
					var offscreen = t.getElement(t.container).parentNode.querySelector('.' + t.options.classPrefix + 'offscreen');
					offscreen.remove();
					t.getElement(t.container).remove();
				}
				t.globalUnbind('resize', t.globalResizeCallback);
				t.globalUnbind('keydown', t.globalKeydownCallback);
				t.globalUnbind('click', t.globalClickCallback);
	
				delete t.media.player;
			}
		}, {
			key: 'paused',
			get: function get() {
				return this.proxy.paused;
			}
		}, {
			key: 'muted',
			get: function get() {
				return this.proxy.muted;
			},
			set: function set(muted) {
				this.setMuted(muted);
			}
		}, {
			key: 'ended',
			get: function get() {
				return this.proxy.ended;
			}
		}, {
			key: 'readyState',
			get: function get() {
				return this.proxy.readyState;
			}
		}, {
			key: 'currentTime',
			set: function set(time) {
				this.setCurrentTime(time);
			},
			get: function get() {
				return this.getCurrentTime();
			}
		}, {
			key: 'duration',
			get: function get() {
				return this.getDuration();
			}
		}, {
			key: 'volume',
			set: function set(volume) {
				this.setVolume(volume);
			},
			get: function get() {
				return this.getVolume();
			}
		}, {
			key: 'src',
			set: function set(src) {
				this.setSrc(src);
			},
			get: function get() {
				return this.getSrc();
			}
		}]);
	
		return MediaElementPlayer;
	}();
	
	_window2.default.MediaElementPlayer = MediaElementPlayer;
	_mejs2.default.MediaElementPlayer = MediaElementPlayer;
	
	exports.default = MediaElementPlayer;
	
	},{"17":17,"2":2,"25":25,"26":26,"27":27,"28":28,"3":3,"30":30,"5":5,"6":6,"7":7}],17:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DefaultPlayer = function () {
		function DefaultPlayer(player) {
			_classCallCheck(this, DefaultPlayer);
	
			this.media = player.media;
			this.isVideo = player.isVideo;
			this.classPrefix = player.options.classPrefix;
			this.createIframeLayer = function () {
				return player.createIframeLayer();
			};
			this.setPoster = function (url) {
				return player.setPoster(url);
			};
			return this;
		}
	
		_createClass(DefaultPlayer, [{
			key: 'play',
			value: function play() {
				this.media.play();
			}
		}, {
			key: 'pause',
			value: function pause() {
				this.media.pause();
			}
		}, {
			key: 'load',
			value: function load() {
				var t = this;
	
				if (!t.isLoaded) {
					t.media.load();
				}
	
				t.isLoaded = true;
			}
		}, {
			key: 'setCurrentTime',
			value: function setCurrentTime(time) {
				this.media.setCurrentTime(time);
			}
		}, {
			key: 'getCurrentTime',
			value: function getCurrentTime() {
				return this.media.currentTime;
			}
		}, {
			key: 'getDuration',
			value: function getDuration() {
				var duration = this.media.getDuration();
				if (duration === Infinity && this.media.seekable && this.media.seekable.length) {
					duration = this.media.seekable.end(0);
				}
				return duration;
			}
		}, {
			key: 'setVolume',
			value: function setVolume(volume) {
				this.media.setVolume(volume);
			}
		}, {
			key: 'getVolume',
			value: function getVolume() {
				return this.media.getVolume();
			}
		}, {
			key: 'setMuted',
			value: function setMuted(value) {
				this.media.setMuted(value);
			}
		}, {
			key: 'setSrc',
			value: function setSrc(src) {
				var t = this,
					layer = document.getElementById(t.media.id + '-iframe-overlay');
	
				if (layer) {
					layer.remove();
				}
	
				t.media.setSrc(src);
				t.createIframeLayer();
				if (t.media.renderer !== null && typeof t.media.renderer.getPosterUrl === 'function') {
					t.setPoster(t.media.renderer.getPosterUrl());
				}
			}
		}, {
			key: 'getSrc',
			value: function getSrc() {
				return this.media.getSrc();
			}
		}, {
			key: 'canPlayType',
			value: function canPlayType(type) {
				return this.media.canPlayType(type);
			}
		}, {
			key: 'paused',
			get: function get() {
				return this.media.paused;
			}
		}, {
			key: 'muted',
			set: function set(muted) {
				this.setMuted(muted);
			},
			get: function get() {
				return this.media.muted;
			}
		}, {
			key: 'ended',
			get: function get() {
				return this.media.ended;
			}
		}, {
			key: 'readyState',
			get: function get() {
				return this.media.readyState;
			}
		}, {
			key: 'currentTime',
			set: function set(time) {
				this.setCurrentTime(time);
			},
			get: function get() {
				return this.getCurrentTime();
			}
		}, {
			key: 'duration',
			get: function get() {
				return this.getDuration();
			}
		}, {
			key: 'remainingTime',
			get: function get() {
				return this.getDuration() - this.currentTime();
			}
		}, {
			key: 'volume',
			set: function set(volume) {
				this.setVolume(volume);
			},
			get: function get() {
				return this.getVolume();
			}
		}, {
			key: 'src',
			set: function set(src) {
				this.setSrc(src);
			},
			get: function get() {
				return this.getSrc();
			}
		}]);
	
		return DefaultPlayer;
	}();
	
	exports.default = DefaultPlayer;
	
	
	_window2.default.DefaultPlayer = DefaultPlayer;
	
	},{"3":3}],18:[function(_dereq_,module,exports){
	'use strict';
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _player = _dereq_(16);
	
	var _player2 = _interopRequireDefault(_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (typeof jQuery !== 'undefined') {
		_mejs2.default.$ = jQuery;
	} else if (typeof Zepto !== 'undefined') {
		_mejs2.default.$ = Zepto;
	} else if (typeof ender !== 'undefined') {
		_mejs2.default.$ = ender;
	}
	
	(function ($) {
		if (typeof $ !== 'undefined') {
			$.fn.mediaelementplayer = function (options) {
				if (options === false) {
					this.each(function () {
						var player = $(this).data('mediaelementplayer');
						if (player) {
							player.remove();
						}
						$(this).removeData('mediaelementplayer');
					});
				} else {
					this.each(function () {
						$(this).data('mediaelementplayer', new _player2.default(this, options));
					});
				}
				return this;
			};
	
			$(document).ready(function () {
				$('.' + _mejs2.default.MepDefaults.classPrefix + 'player').mediaelementplayer();
			});
		}
	})(_mejs2.default.$);
	
	},{"16":16,"3":3,"7":7}],19:[function(_dereq_,module,exports){
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _renderer = _dereq_(8);
	
	var _general = _dereq_(27);
	
	var _media = _dereq_(28);
	
	var _constants = _dereq_(25);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NativeDash = {
	
		promise: null,
	
		load: function load(settings) {
			if (typeof dashjs !== 'undefined') {
				NativeDash.promise = new Promise(function (resolve) {
					resolve();
				}).then(function () {
					NativeDash._createPlayer(settings);
				});
			} else {
				settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : 'https://cdn.dashjs.org/latest/dash.all.min.js';
	
				NativeDash.promise = NativeDash.promise || (0, _dom.loadScript)(settings.options.path);
				NativeDash.promise.then(function () {
					NativeDash._createPlayer(settings);
				});
			}
	
			return NativeDash.promise;
		},
	
		_createPlayer: function _createPlayer(settings) {
			var player = dashjs.MediaPlayer().create();
			_window2.default['__ready__' + settings.id](player);
			return player;
		}
	};
	
	var DashNativeRenderer = {
		name: 'native_dash',
		options: {
			prefix: 'native_dash',
			dash: {
				path: 'https://cdn.dashjs.org/latest/dash.all.min.js',
				debug: false,
				drm: {},
	
				robustnessLevel: ''
			}
		},
	
		canPlayType: function canPlayType(type) {
			return _constants.HAS_MSE && ['application/dash+xml'].indexOf(type.toLowerCase()) > -1;
		},
	
		create: function create(mediaElement, options, mediaFiles) {
	
			var originalNode = mediaElement.originalNode,
				id = mediaElement.id + '_' + options.prefix,
				autoplay = originalNode.autoplay,
				children = originalNode.children;
	
			var node = null,
				dashPlayer = null;
	
			originalNode.removeAttribute('type');
			for (var i = 0, total = children.length; i < total; i++) {
				children[i].removeAttribute('type');
			}
	
			node = originalNode.cloneNode(true);
			options = Object.assign(options, mediaElement.options);
	
			var props = _mejs2.default.html5media.properties,
				events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']).filter(function (e) {
				return e !== 'error';
			}),
				attachNativeEvents = function attachNativeEvents(e) {
				var event = (0, _general.createEvent)(e.type, mediaElement);
				mediaElement.dispatchEvent(event);
			},
				assignGettersSetters = function assignGettersSetters(propName) {
				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
				node['get' + capName] = function () {
					return dashPlayer !== null ? node[propName] : null;
				};
	
				node['set' + capName] = function (value) {
					if (_mejs2.default.html5media.readOnlyProperties.indexOf(propName) === -1) {
						if (propName === 'src') {
							var source = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.src ? value.src : value;
							node[propName] = source;
							if (dashPlayer !== null) {
								dashPlayer.reset();
								for (var _i = 0, _total = events.length; _i < _total; _i++) {
									node.removeEventListener(events[_i], attachNativeEvents);
								}
								dashPlayer = NativeDash._createPlayer({
									options: options.dash,
									id: id
								});
	
								if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && _typeof(value.drm) === 'object') {
									dashPlayer.setProtectionData(value.drm);
									if ((0, _general.isString)(options.dash.robustnessLevel) && options.dash.robustnessLevel) {
										dashPlayer.getProtectionController().setRobustnessLevel(options.dash.robustnessLevel);
									}
								}
								dashPlayer.attachSource(source);
								if (autoplay) {
									dashPlayer.play();
								}
							}
						} else {
							node[propName] = value;
						}
					}
				};
			};
	
			for (var _i2 = 0, _total2 = props.length; _i2 < _total2; _i2++) {
				assignGettersSetters(props[_i2]);
			}
	
			_window2.default['__ready__' + id] = function (_dashPlayer) {
				mediaElement.dashPlayer = dashPlayer = _dashPlayer;
	
				var dashEvents = dashjs.MediaPlayer.events,
					assignEvents = function assignEvents(eventName) {
					if (eventName === 'loadedmetadata') {
						dashPlayer.initialize();
						dashPlayer.attachView(node);
						dashPlayer.setAutoPlay(false);
	
						if (_typeof(options.dash.drm) === 'object' && !_mejs2.default.Utils.isObjectEmpty(options.dash.drm)) {
							dashPlayer.setProtectionData(options.dash.drm);
							if ((0, _general.isString)(options.dash.robustnessLevel) && options.dash.robustnessLevel) {
								dashPlayer.getProtectionController().setRobustnessLevel(options.dash.robustnessLevel);
							}
						}
						dashPlayer.attachSource(node.getSrc());
					}
	
					node.addEventListener(eventName, attachNativeEvents);
				};
	
				for (var _i3 = 0, _total3 = events.length; _i3 < _total3; _i3++) {
					assignEvents(events[_i3]);
				}
	
				var assignMdashEvents = function assignMdashEvents(e) {
					if (e.type.toLowerCase() === 'error') {
						mediaElement.generateError(e.message, node.src);
						console.error(e);
					} else {
						var _event = (0, _general.createEvent)(e.type, mediaElement);
						_event.data = e;
						mediaElement.dispatchEvent(_event);
					}
				};
	
				for (var eventType in dashEvents) {
					if (dashEvents.hasOwnProperty(eventType)) {
						dashPlayer.on(dashEvents[eventType], function (e) {
							return assignMdashEvents(e);
						});
					}
				}
			};
	
			if (mediaFiles && mediaFiles.length > 0) {
				for (var _i4 = 0, _total4 = mediaFiles.length; _i4 < _total4; _i4++) {
					if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i4].type)) {
						node.setAttribute('src', mediaFiles[_i4].src);
						if (typeof mediaFiles[_i4].drm !== 'undefined') {
							options.dash.drm = mediaFiles[_i4].drm;
						}
						break;
					}
				}
			}
	
			node.setAttribute('id', id);
	
			originalNode.parentNode.insertBefore(node, originalNode);
			originalNode.autoplay = false;
			originalNode.style.display = 'none';
	
			node.setSize = function (width, height) {
				node.style.width = width + 'px';
				node.style.height = height + 'px';
				return node;
			};
	
			node.hide = function () {
				node.pause();
				node.style.display = 'none';
				return node;
			};
	
			node.show = function () {
				node.style.display = '';
				return node;
			};
	
			node.destroy = function () {
				if (dashPlayer !== null) {
					dashPlayer.reset();
				}
			};
	
			var event = (0, _general.createEvent)('rendererready', node);
			mediaElement.dispatchEvent(event);
	
			mediaElement.promises.push(NativeDash.load({
				options: options.dash,
				id: id
			}));
	
			return node;
		}
	};
	
	_media.typeChecks.push(function (url) {
		return ~url.toLowerCase().indexOf('.mpd') ? 'application/dash+xml' : null;
	});
	
	_renderer.renderer.add(DashNativeRenderer);
	
	},{"25":25,"26":26,"27":27,"28":28,"3":3,"7":7,"8":8}],20:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.PluginDetector = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _i18n = _dereq_(5);
	
	var _i18n2 = _interopRequireDefault(_i18n);
	
	var _renderer = _dereq_(8);
	
	var _general = _dereq_(27);
	
	var _constants = _dereq_(25);
	
	var _media = _dereq_(28);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PluginDetector = exports.PluginDetector = {
		plugins: [],
	
		hasPluginVersion: function hasPluginVersion(plugin, v) {
			var pv = PluginDetector.plugins[plugin];
			v[1] = v[1] || 0;
			v[2] = v[2] || 0;
			return pv[0] > v[0] || pv[0] === v[0] && pv[1] > v[1] || pv[0] === v[0] && pv[1] === v[1] && pv[2] >= v[2];
		},
	
		addPlugin: function addPlugin(p, pluginName, mimeType, activeX, axDetect) {
			PluginDetector.plugins[p] = PluginDetector.detectPlugin(pluginName, mimeType, activeX, axDetect);
		},
	
		detectPlugin: function detectPlugin(pluginName, mimeType, activeX, axDetect) {
	
			var version = [0, 0, 0],
				description = void 0,
				ax = void 0;
	
			if (_constants.NAV.plugins !== null && _constants.NAV.plugins !== undefined && _typeof(_constants.NAV.plugins[pluginName]) === 'object') {
				description = _constants.NAV.plugins[pluginName].description;
				if (description && !(typeof _constants.NAV.mimeTypes !== 'undefined' && _constants.NAV.mimeTypes[mimeType] && !_constants.NAV.mimeTypes[mimeType].enabledPlugin)) {
					version = description.replace(pluginName, '').replace(/^\s+/, '').replace(/\sr/gi, '.').split('.');
					for (var i = 0, total = version.length; i < total; i++) {
						version[i] = parseInt(version[i].match(/\d+/), 10);
					}
				}
			} else if (_window2.default.ActiveXObject !== undefined) {
				try {
					ax = new ActiveXObject(activeX);
					if (ax) {
						version = axDetect(ax);
					}
				} catch (e) {
					
				}
			}
			return version;
		}
	};
	
	PluginDetector.addPlugin('flash', 'Shockwave Flash', 'application/x-shockwave-flash', 'ShockwaveFlash.ShockwaveFlash', function (ax) {
		var version = [],
			d = ax.GetVariable("$version");
	
		if (d) {
			d = d.split(" ")[1].split(",");
			version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
		}
		return version;
	});
	
	var FlashMediaElementRenderer = {
		create: function create(mediaElement, options, mediaFiles) {
	
			var flash = {};
			var isActive = false;
	
			flash.options = options;
			flash.id = mediaElement.id + '_' + flash.options.prefix;
			flash.mediaElement = mediaElement;
			flash.flashState = {};
			flash.flashApi = null;
			flash.flashApiStack = [];
	
			var props = _mejs2.default.html5media.properties,
				assignGettersSetters = function assignGettersSetters(propName) {
				flash.flashState[propName] = null;
	
				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
				flash['get' + capName] = function () {
					if (flash.flashApi !== null) {
						if (typeof flash.flashApi['get_' + propName] === 'function') {
							var value = flash.flashApi['get_' + propName]();
	
							if (propName === 'buffered') {
								return {
									start: function start() {
										return 0;
									},
									end: function end() {
										return value;
									},
									length: 1
								};
							}
							return value;
						} else {
							return null;
						}
					} else {
						return null;
					}
				};
	
				flash['set' + capName] = function (value) {
					if (propName === 'src') {
						value = (0, _media.absolutizeUrl)(value);
					}
	
					if (flash.flashApi !== null && flash.flashApi['set_' + propName] !== undefined) {
						try {
							flash.flashApi['set_' + propName](value);
						} catch (e) {
							
						}
					} else {
						flash.flashApiStack.push({
							type: 'set',
							propName: propName,
							value: value
						});
					}
				};
			};
	
			for (var i = 0, total = props.length; i < total; i++) {
				assignGettersSetters(props[i]);
			}
	
			var methods = _mejs2.default.html5media.methods,
				assignMethods = function assignMethods(methodName) {
				flash[methodName] = function () {
					if (isActive) {
						if (flash.flashApi !== null) {
							if (flash.flashApi['fire_' + methodName]) {
								try {
									flash.flashApi['fire_' + methodName]();
								} catch (e) {
									
								}
							} else {
								
							}
						} else {
							flash.flashApiStack.push({
								type: 'call',
								methodName: methodName
							});
						}
					}
				};
			};
			methods.push('stop');
			for (var _i = 0, _total = methods.length; _i < _total; _i++) {
				assignMethods(methods[_i]);
			}
	
			var initEvents = ['rendererready'];
	
			for (var _i2 = 0, _total2 = initEvents.length; _i2 < _total2; _i2++) {
				var event = (0, _general.createEvent)(initEvents[_i2], flash);
				mediaElement.dispatchEvent(event);
			}
	
			_window2.default['__ready__' + flash.id] = function () {
	
				flash.flashReady = true;
				flash.flashApi = _document2.default.getElementById('__' + flash.id);
	
				if (flash.flashApiStack.length) {
					for (var _i3 = 0, _total3 = flash.flashApiStack.length; _i3 < _total3; _i3++) {
						var stackItem = flash.flashApiStack[_i3];
	
						if (stackItem.type === 'set') {
							var propName = stackItem.propName,
								capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
							flash['set' + capName](stackItem.value);
						} else if (stackItem.type === 'call') {
							flash[stackItem.methodName]();
						}
					}
				}
			};
	
			_window2.default['__event__' + flash.id] = function (eventName, message) {
				var event = (0, _general.createEvent)(eventName, flash);
				if (message) {
					try {
						event.data = JSON.parse(message);
						event.details.data = JSON.parse(message);
					} catch (e) {
						event.message = message;
					}
				}
	
				flash.mediaElement.dispatchEvent(event);
			};
	
			flash.flashWrapper = _document2.default.createElement('div');
	
			if (['always', 'sameDomain'].indexOf(flash.options.shimScriptAccess) === -1) {
				flash.options.shimScriptAccess = 'sameDomain';
			}
	
			var autoplay = mediaElement.originalNode.autoplay,
				flashVars = ['uid=' + flash.id, 'autoplay=' + autoplay, 'allowScriptAccess=' + flash.options.shimScriptAccess, 'preload=' + (mediaElement.originalNode.getAttribute('preload') || '')],
				isVideo = mediaElement.originalNode !== null && mediaElement.originalNode.tagName.toLowerCase() === 'video',
				flashHeight = isVideo ? mediaElement.originalNode.height : 1,
				flashWidth = isVideo ? mediaElement.originalNode.width : 1;
	
			if (mediaElement.originalNode.getAttribute('src')) {
				flashVars.push('src=' + mediaElement.originalNode.getAttribute('src'));
			}
	
			if (flash.options.enablePseudoStreaming === true) {
				flashVars.push('pseudostreamstart=' + flash.options.pseudoStreamingStartQueryParam);
				flashVars.push('pseudostreamtype=' + flash.options.pseudoStreamingType);
			}
	
			if (flash.options.streamDelimiter) {
				flashVars.push('streamdelimiter=' + encodeURIComponent(flash.options.streamDelimiter));
			}
	
			if (flash.options.proxyType) {
				flashVars.push('proxytype=' + flash.options.proxyType);
			}
	
			mediaElement.appendChild(flash.flashWrapper);
			mediaElement.originalNode.style.display = 'none';
	
			var settings = [];
	
			if (_constants.IS_IE || _constants.IS_EDGE) {
				var specialIEContainer = _document2.default.createElement('div');
				flash.flashWrapper.appendChild(specialIEContainer);
	
				if (_constants.IS_EDGE) {
					settings = ['type="application/x-shockwave-flash"', 'data="' + flash.options.pluginPath + flash.options.filename + '"', 'id="__' + flash.id + '"', 'width="' + flashWidth + '"', 'height="' + flashHeight + '\'"'];
				} else {
					settings = ['classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"', 'codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"', 'id="__' + flash.id + '"', 'width="' + flashWidth + '"', 'height="' + flashHeight + '"'];
				}
	
				if (!isVideo) {
					settings.push('style="clip: rect(0 0 0 0); position: absolute;"');
				}
	
				specialIEContainer.outerHTML = '<object ' + settings.join(' ') + '>' + ('<param name="movie" value="' + flash.options.pluginPath + flash.options.filename + '?x=' + new Date() + '" />') + ('<param name="flashvars" value="' + flashVars.join('&amp;') + '" />') + '<param name="quality" value="high" />' + '<param name="bgcolor" value="#000000" />' + '<param name="wmode" value="transparent" />' + ('<param name="allowScriptAccess" value="' + flash.options.shimScriptAccess + '" />') + '<param name="allowFullScreen" value="true" />' + ('<div>' + _i18n2.default.t('mejs.install-flash') + '</div>') + '</object>';
			} else {
	
				settings = ['id="__' + flash.id + '"', 'name="__' + flash.id + '"', 'play="true"', 'loop="false"', 'quality="high"', 'bgcolor="#000000"', 'wmode="transparent"', 'allowScriptAccess="' + flash.options.shimScriptAccess + '"', 'allowFullScreen="true"', 'type="application/x-shockwave-flash"', 'pluginspage="//www.macromedia.com/go/getflashplayer"', 'src="' + flash.options.pluginPath + flash.options.filename + '"', 'flashvars="' + flashVars.join('&') + '"'];
	
				if (isVideo) {
					settings.push('width="' + flashWidth + '"');
					settings.push('height="' + flashHeight + '"');
				} else {
					settings.push('style="position: fixed; left: -9999em; top: -9999em;"');
				}
	
				flash.flashWrapper.innerHTML = '<embed ' + settings.join(' ') + '>';
			}
	
			flash.flashNode = flash.flashWrapper.lastChild;
	
			flash.hide = function () {
				isActive = false;
				if (isVideo) {
					flash.flashNode.style.display = 'none';
				}
			};
			flash.show = function () {
				isActive = true;
				if (isVideo) {
					flash.flashNode.style.display = '';
				}
			};
			flash.setSize = function (width, height) {
				flash.flashNode.style.width = width + 'px';
				flash.flashNode.style.height = height + 'px';
	
				if (flash.flashApi !== null && typeof flash.flashApi.fire_setSize === 'function') {
					flash.flashApi.fire_setSize(width, height);
				}
			};
	
			flash.destroy = function () {
				flash.flashNode.remove();
			};
	
			if (mediaFiles && mediaFiles.length > 0) {
				for (var _i4 = 0, _total4 = mediaFiles.length; _i4 < _total4; _i4++) {
					if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i4].type)) {
						flash.setSrc(mediaFiles[_i4].src);
						break;
					}
				}
			}
	
			return flash;
		}
	};
	
	var hasFlash = PluginDetector.hasPluginVersion('flash', [10, 0, 0]);
	
	if (hasFlash) {
		_media.typeChecks.push(function (url) {
			url = url.toLowerCase();
	
			if (url.startsWith('rtmp')) {
				if (~url.indexOf('.mp3')) {
					return 'audio/rtmp';
				} else {
					return 'video/rtmp';
				}
			} else if (/\.og(a|g)/i.test(url)) {
				return 'audio/ogg';
			} else if (~url.indexOf('.m3u8')) {
				return 'application/x-mpegURL';
			} else if (~url.indexOf('.mpd')) {
				return 'application/dash+xml';
			} else if (~url.indexOf('.flv')) {
				return 'video/flv';
			} else {
				return null;
			}
		});
	
		var FlashMediaElementVideoRenderer = {
			name: 'flash_video',
			options: {
				prefix: 'flash_video',
				filename: 'mediaelement-flash-video.swf',
				enablePseudoStreaming: false,
	
				pseudoStreamingStartQueryParam: 'start',
	
				pseudoStreamingType: 'byte',
	
				proxyType: '',
	
				streamDelimiter: ''
			},
	
			canPlayType: function canPlayType(type) {
				return ~['video/mp4', 'video/rtmp', 'audio/rtmp', 'rtmp/mp4', 'audio/mp4', 'video/flv', 'video/x-flv'].indexOf(type.toLowerCase());
			},
	
			create: FlashMediaElementRenderer.create
	
		};
		_renderer.renderer.add(FlashMediaElementVideoRenderer);
	
		var FlashMediaElementHlsVideoRenderer = {
			name: 'flash_hls',
			options: {
				prefix: 'flash_hls',
				filename: 'mediaelement-flash-video-hls.swf'
			},
	
			canPlayType: function canPlayType(type) {
				return ~['application/x-mpegurl', 'application/vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].indexOf(type.toLowerCase());
			},
	
			create: FlashMediaElementRenderer.create
		};
		_renderer.renderer.add(FlashMediaElementHlsVideoRenderer);
	
		var FlashMediaElementMdashVideoRenderer = {
			name: 'flash_dash',
			options: {
				prefix: 'flash_dash',
				filename: 'mediaelement-flash-video-mdash.swf'
			},
	
			canPlayType: function canPlayType(type) {
				return ~['application/dash+xml'].indexOf(type.toLowerCase());
			},
	
			create: FlashMediaElementRenderer.create
		};
		_renderer.renderer.add(FlashMediaElementMdashVideoRenderer);
	
		var FlashMediaElementAudioRenderer = {
			name: 'flash_audio',
			options: {
				prefix: 'flash_audio',
				filename: 'mediaelement-flash-audio.swf'
			},
	
			canPlayType: function canPlayType(type) {
				return ~['audio/mp3'].indexOf(type.toLowerCase());
			},
	
			create: FlashMediaElementRenderer.create
		};
		_renderer.renderer.add(FlashMediaElementAudioRenderer);
	
		var FlashMediaElementAudioOggRenderer = {
			name: 'flash_audio_ogg',
			options: {
				prefix: 'flash_audio_ogg',
				filename: 'mediaelement-flash-audio-ogg.swf'
			},
	
			canPlayType: function canPlayType(type) {
				return ~['audio/ogg', 'audio/oga', 'audio/ogv'].indexOf(type.toLowerCase());
			},
	
			create: FlashMediaElementRenderer.create
		};
		_renderer.renderer.add(FlashMediaElementAudioOggRenderer);
	}
	
	},{"2":2,"25":25,"27":27,"28":28,"3":3,"5":5,"7":7,"8":8}],21:[function(_dereq_,module,exports){
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _renderer = _dereq_(8);
	
	var _general = _dereq_(27);
	
	var _constants = _dereq_(25);
	
	var _media = _dereq_(28);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NativeFlv = {
	
		promise: null,
	
		load: function load(settings) {
			if (typeof flvjs !== 'undefined') {
				NativeFlv.promise = new Promise(function (resolve) {
					resolve();
				}).then(function () {
					NativeFlv._createPlayer(settings);
				});
			} else {
				settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : 'https://cdn.jsdelivr.net/npm/flv.js@latest';
	
				NativeFlv.promise = NativeFlv.promise || (0, _dom.loadScript)(settings.options.path);
				NativeFlv.promise.then(function () {
					NativeFlv._createPlayer(settings);
				});
			}
	
			return NativeFlv.promise;
		},
	
		_createPlayer: function _createPlayer(settings) {
			flvjs.LoggingControl.enableDebug = settings.options.debug;
			flvjs.LoggingControl.enableVerbose = settings.options.debug;
			var player = flvjs.createPlayer(settings.options, settings.configs);
			_window2.default['__ready__' + settings.id](player);
			return player;
		}
	};
	
	var FlvNativeRenderer = {
		name: 'native_flv',
		options: {
			prefix: 'native_flv',
			flv: {
				path: 'https://cdn.jsdelivr.net/npm/flv.js@latest',
	
				cors: true,
				debug: false
			}
		},
	
		canPlayType: function canPlayType(type) {
			return _constants.HAS_MSE && ['video/x-flv', 'video/flv'].indexOf(type.toLowerCase()) > -1;
		},
	
		create: function create(mediaElement, options, mediaFiles) {
	
			var originalNode = mediaElement.originalNode,
				id = mediaElement.id + '_' + options.prefix;
	
			var node = null,
				flvPlayer = null;
	
			node = originalNode.cloneNode(true);
			options = Object.assign(options, mediaElement.options);
	
			var props = _mejs2.default.html5media.properties,
				events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']).filter(function (e) {
				return e !== 'error';
			}),
				attachNativeEvents = function attachNativeEvents(e) {
				var event = (0, _general.createEvent)(e.type, mediaElement);
				mediaElement.dispatchEvent(event);
			},
				assignGettersSetters = function assignGettersSetters(propName) {
				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
				node['get' + capName] = function () {
					return flvPlayer !== null ? node[propName] : null;
				};
	
				node['set' + capName] = function (value) {
					if (_mejs2.default.html5media.readOnlyProperties.indexOf(propName) === -1) {
						if (propName === 'src') {
							node[propName] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.src ? value.src : value;
							if (flvPlayer !== null) {
								var _flvOptions = {};
								_flvOptions.type = 'flv';
								_flvOptions.url = value;
								_flvOptions.cors = options.flv.cors;
								_flvOptions.debug = options.flv.debug;
								_flvOptions.path = options.flv.path;
								var _flvConfigs = options.flv.configs;
	
								flvPlayer.destroy();
								for (var i = 0, total = events.length; i < total; i++) {
									node.removeEventListener(events[i], attachNativeEvents);
								}
								flvPlayer = NativeFlv._createPlayer({
									options: _flvOptions,
									configs: _flvConfigs,
									id: id
								});
								flvPlayer.attachMediaElement(node);
								flvPlayer.load();
							}
						} else {
							node[propName] = value;
						}
					}
				};
			};
	
			for (var i = 0, total = props.length; i < total; i++) {
				assignGettersSetters(props[i]);
			}
	
			_window2.default['__ready__' + id] = function (_flvPlayer) {
				mediaElement.flvPlayer = flvPlayer = _flvPlayer;
	
				var flvEvents = flvjs.Events,
					assignEvents = function assignEvents(eventName) {
					if (eventName === 'loadedmetadata') {
						flvPlayer.unload();
						flvPlayer.detachMediaElement();
						flvPlayer.attachMediaElement(node);
						flvPlayer.load();
					}
	
					node.addEventListener(eventName, attachNativeEvents);
				};
	
				for (var _i = 0, _total = events.length; _i < _total; _i++) {
					assignEvents(events[_i]);
				}
	
				var assignFlvEvents = function assignFlvEvents(name, data) {
					if (name === 'error') {
						var message = data[0] + ': ' + data[1] + ' ' + data[2].msg;
						mediaElement.generateError(message, node.src);
					} else {
						var _event = (0, _general.createEvent)(name, mediaElement);
						_event.data = data;
						mediaElement.dispatchEvent(_event);
					}
				};
	
				var _loop = function _loop(eventType) {
					if (flvEvents.hasOwnProperty(eventType)) {
						flvPlayer.on(flvEvents[eventType], function () {
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
							}
	
							return assignFlvEvents(flvEvents[eventType], args);
						});
					}
				};
	
				for (var eventType in flvEvents) {
					_loop(eventType);
				}
			};
	
			if (mediaFiles && mediaFiles.length > 0) {
				for (var _i2 = 0, _total2 = mediaFiles.length; _i2 < _total2; _i2++) {
					if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[_i2].type)) {
						node.setAttribute('src', mediaFiles[_i2].src);
						break;
					}
				}
			}
	
			node.setAttribute('id', id);
	
			originalNode.parentNode.insertBefore(node, originalNode);
			originalNode.autoplay = false;
			originalNode.style.display = 'none';
	
			var flvOptions = {};
			flvOptions.type = 'flv';
			flvOptions.url = node.src;
			flvOptions.cors = options.flv.cors;
			flvOptions.debug = options.flv.debug;
			flvOptions.path = options.flv.path;
			var flvConfigs = options.flv.configs;
	
			node.setSize = function (width, height) {
				node.style.width = width + 'px';
				node.style.height = height + 'px';
				return node;
			};
	
			node.hide = function () {
				if (flvPlayer !== null) {
					flvPlayer.pause();
				}
				node.style.display = 'none';
				return node;
			};
	
			node.show = function () {
				node.style.display = '';
				return node;
			};
	
			node.destroy = function () {
				if (flvPlayer !== null) {
					flvPlayer.destroy();
				}
			};
	
			var event = (0, _general.createEvent)('rendererready', node);
			mediaElement.dispatchEvent(event);
	
			mediaElement.promises.push(NativeFlv.load({
				options: flvOptions,
				configs: flvConfigs,
				id: id
			}));
	
			return node;
		}
	};
	
	_media.typeChecks.push(function (url) {
		return ~url.toLowerCase().indexOf('.flv') ? 'video/flv' : null;
	});
	
	_renderer.renderer.add(FlvNativeRenderer);
	
	},{"25":25,"26":26,"27":27,"28":28,"3":3,"7":7,"8":8}],22:[function(_dereq_,module,exports){
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _renderer = _dereq_(8);
	
	var _general = _dereq_(27);
	
	var _constants = _dereq_(25);
	
	var _media = _dereq_(28);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NativeHls = {
	
		promise: null,
	
		load: function load(settings) {
			if (typeof Hls !== 'undefined') {
				NativeHls.promise = new Promise(function (resolve) {
					resolve();
				}).then(function () {
					NativeHls._createPlayer(settings);
				});
			} else {
				settings.options.path = typeof settings.options.path === 'string' ? settings.options.path : 'https://cdn.jsdelivr.net/npm/hls.js@latest';
	
				NativeHls.promise = NativeHls.promise || (0, _dom.loadScript)(settings.options.path);
				NativeHls.promise.then(function () {
					NativeHls._createPlayer(settings);
				});
			}
	
			return NativeHls.promise;
		},
	
		_createPlayer: function _createPlayer(settings) {
			var player = new Hls(settings.options);
			_window2.default['__ready__' + settings.id](player);
			return player;
		}
	};
	
	var HlsNativeRenderer = {
		name: 'native_hls',
		options: {
			prefix: 'native_hls',
			hls: {
				path: 'https://cdn.jsdelivr.net/npm/hls.js@latest',
	
				autoStartLoad: false,
				debug: false
			}
		},
	
		canPlayType: function canPlayType(type) {
			return _constants.HAS_MSE && ['application/x-mpegurl', 'application/vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].indexOf(type.toLowerCase()) > -1;
		},
	
		create: function create(mediaElement, options, mediaFiles) {
	
			var originalNode = mediaElement.originalNode,
				id = mediaElement.id + '_' + options.prefix,
				preload = originalNode.getAttribute('preload'),
				autoplay = originalNode.autoplay;
	
			var hlsPlayer = null,
				node = null,
				index = 0,
				total = mediaFiles.length;
	
			node = originalNode.cloneNode(true);
			options = Object.assign(options, mediaElement.options);
			options.hls.autoStartLoad = preload && preload !== 'none' || autoplay;
	
			var props = _mejs2.default.html5media.properties,
				events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']).filter(function (e) {
				return e !== 'error';
			}),
				attachNativeEvents = function attachNativeEvents(e) {
				var event = (0, _general.createEvent)(e.type, mediaElement);
				mediaElement.dispatchEvent(event);
			},
				assignGettersSetters = function assignGettersSetters(propName) {
				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
				node['get' + capName] = function () {
					return hlsPlayer !== null ? node[propName] : null;
				};
	
				node['set' + capName] = function (value) {
					if (_mejs2.default.html5media.readOnlyProperties.indexOf(propName) === -1) {
						if (propName === 'src') {
							node[propName] = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.src ? value.src : value;
							if (hlsPlayer !== null) {
								hlsPlayer.destroy();
								for (var i = 0, _total = events.length; i < _total; i++) {
									node.removeEventListener(events[i], attachNativeEvents);
								}
								hlsPlayer = NativeHls._createPlayer({
									options: options.hls,
									id: id
								});
								hlsPlayer.loadSource(value);
								hlsPlayer.attachMedia(node);
							}
						} else {
							node[propName] = value;
						}
					}
				};
			};
	
			for (var i = 0, _total2 = props.length; i < _total2; i++) {
				assignGettersSetters(props[i]);
			}
	
			_window2.default['__ready__' + id] = function (_hlsPlayer) {
				mediaElement.hlsPlayer = hlsPlayer = _hlsPlayer;
				var hlsEvents = Hls.Events,
					assignEvents = function assignEvents(eventName) {
					if (eventName === 'loadedmetadata') {
						var url = mediaElement.originalNode.src;
						hlsPlayer.detachMedia();
						hlsPlayer.loadSource(url);
						hlsPlayer.attachMedia(node);
					}
	
					node.addEventListener(eventName, attachNativeEvents);
				};
	
				for (var _i = 0, _total3 = events.length; _i < _total3; _i++) {
					assignEvents(events[_i]);
				}
	
				var recoverDecodingErrorDate = void 0,
					recoverSwapAudioCodecDate = void 0;
				var assignHlsEvents = function assignHlsEvents(name, data) {
					if (name === 'hlsError') {
						console.warn(data);
						data = data[1];
	
						if (data.fatal) {
							switch (data.type) {
								case 'mediaError':
									var now = new Date().getTime();
									if (!recoverDecodingErrorDate || now - recoverDecodingErrorDate > 3000) {
										recoverDecodingErrorDate = new Date().getTime();
										hlsPlayer.recoverMediaError();
									} else if (!recoverSwapAudioCodecDate || now - recoverSwapAudioCodecDate > 3000) {
										recoverSwapAudioCodecDate = new Date().getTime();
										console.warn('Attempting to swap Audio Codec and recover from media error');
										hlsPlayer.swapAudioCodec();
										hlsPlayer.recoverMediaError();
									} else {
										var message = 'Cannot recover, last media error recovery failed';
										mediaElement.generateError(message, node.src);
										console.error(message);
									}
									break;
								case 'networkError':
									if (data.details === 'manifestLoadError') {
										if (index < total && mediaFiles[index + 1] !== undefined) {
											node.setSrc(mediaFiles[index++].src);
											node.load();
											node.play();
										} else {
											var _message = 'Network error';
											mediaElement.generateError(_message, mediaFiles);
											console.error(_message);
										}
									} else {
										var _message2 = 'Network error';
										mediaElement.generateError(_message2, mediaFiles);
										console.error(_message2);
									}
									break;
								default:
									hlsPlayer.destroy();
									break;
							}
							return;
						}
					}
					var event = (0, _general.createEvent)(name, mediaElement);
					event.data = data;
					mediaElement.dispatchEvent(event);
				};
	
				var _loop = function _loop(eventType) {
					if (hlsEvents.hasOwnProperty(eventType)) {
						hlsPlayer.on(hlsEvents[eventType], function () {
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
							}
	
							return assignHlsEvents(hlsEvents[eventType], args);
						});
					}
				};
	
				for (var eventType in hlsEvents) {
					_loop(eventType);
				}
			};
	
			if (total > 0) {
				for (; index < total; index++) {
					if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[index].type)) {
						node.setAttribute('src', mediaFiles[index].src);
						break;
					}
				}
			}
	
			if (preload !== 'auto' && !autoplay) {
				node.addEventListener('play', function () {
					if (hlsPlayer !== null) {
						hlsPlayer.startLoad();
					}
				});
	
				node.addEventListener('pause', function () {
					if (hlsPlayer !== null) {
						hlsPlayer.stopLoad();
					}
				});
			}
	
			node.setAttribute('id', id);
	
			originalNode.parentNode.insertBefore(node, originalNode);
			originalNode.autoplay = false;
			originalNode.style.display = 'none';
	
			node.setSize = function (width, height) {
				node.style.width = width + 'px';
				node.style.height = height + 'px';
				return node;
			};
	
			node.hide = function () {
				node.pause();
				node.style.display = 'none';
				return node;
			};
	
			node.show = function () {
				node.style.display = '';
				return node;
			};
	
			node.destroy = function () {
				if (hlsPlayer !== null) {
					hlsPlayer.stopLoad();
					hlsPlayer.destroy();
				}
			};
	
			var event = (0, _general.createEvent)('rendererready', node);
			mediaElement.dispatchEvent(event);
	
			mediaElement.promises.push(NativeHls.load({
				options: options.hls,
				id: id
			}));
	
			return node;
		}
	};
	
	_media.typeChecks.push(function (url) {
		return ~url.toLowerCase().indexOf('.m3u8') ? 'application/x-mpegURL' : null;
	});
	
	_renderer.renderer.add(HlsNativeRenderer);
	
	},{"25":25,"26":26,"27":27,"28":28,"3":3,"7":7,"8":8}],23:[function(_dereq_,module,exports){
	'use strict';
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _renderer = _dereq_(8);
	
	var _general = _dereq_(27);
	
	var _constants = _dereq_(25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HtmlMediaElement = {
		name: 'html5',
		options: {
			prefix: 'html5'
		},
	
		canPlayType: function canPlayType(type) {
	
			var mediaElement = _document2.default.createElement('video');
	
			if (_constants.IS_ANDROID && /\/mp(3|4)$/i.test(type) || ~['application/x-mpegurl', 'vnd.apple.mpegurl', 'audio/mpegurl', 'audio/hls', 'video/hls'].indexOf(type.toLowerCase()) && _constants.SUPPORTS_NATIVE_HLS) {
				return 'yes';
			} else if (mediaElement.canPlayType) {
				return mediaElement.canPlayType(type.toLowerCase()).replace(/no/, '');
			} else {
				return '';
			}
		},
	
		create: function create(mediaElement, options, mediaFiles) {
	
			var id = mediaElement.id + '_' + options.prefix;
			var isActive = false;
	
			var node = null;
	
			if (mediaElement.originalNode === undefined || mediaElement.originalNode === null) {
				node = _document2.default.createElement('audio');
				mediaElement.appendChild(node);
			} else {
				node = mediaElement.originalNode;
			}
	
			node.setAttribute('id', id);
	
			var props = _mejs2.default.html5media.properties,
				assignGettersSetters = function assignGettersSetters(propName) {
				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
				node['get' + capName] = function () {
					return node[propName];
				};
	
				node['set' + capName] = function (value) {
					if (_mejs2.default.html5media.readOnlyProperties.indexOf(propName) === -1) {
						node[propName] = value;
					}
				};
			};
	
			for (var i = 0, _total = props.length; i < _total; i++) {
				assignGettersSetters(props[i]);
			}
	
			var events = _mejs2.default.html5media.events.concat(['click', 'mouseover', 'mouseout']).filter(function (e) {
				return e !== 'error';
			}),
				assignEvents = function assignEvents(eventName) {
				node.addEventListener(eventName, function (e) {
					if (isActive) {
						var _event = (0, _general.createEvent)(e.type, e.target);
						mediaElement.dispatchEvent(_event);
					}
				});
			};
	
			for (var _i = 0, _total2 = events.length; _i < _total2; _i++) {
				assignEvents(events[_i]);
			}
	
			node.setSize = function (width, height) {
				node.style.width = width + 'px';
				node.style.height = height + 'px';
				return node;
			};
	
			node.hide = function () {
				isActive = false;
				node.style.display = 'none';
	
				return node;
			};
	
			node.show = function () {
				isActive = true;
				node.style.display = '';
	
				return node;
			};
	
			var index = 0,
				total = mediaFiles.length;
			if (total > 0) {
				for (; index < total; index++) {
					if (_renderer.renderer.renderers[options.prefix].canPlayType(mediaFiles[index].type)) {
						node.setAttribute('src', mediaFiles[index].src);
						break;
					}
				}
			}
	
			node.addEventListener('error', function (e) {
				if (e && e.target && e.target.error && e.target.error.code === 4 && isActive) {
					if (index < total && mediaFiles[index + 1] !== undefined) {
						node.src = mediaFiles[index++].src;
						node.load();
						node.play();
					} else {
						mediaElement.generateError('Media error: Format(s) not supported or source(s) not found', mediaFiles);
					}
				}
			});
	
			var event = (0, _general.createEvent)('rendererready', node);
			mediaElement.dispatchEvent(event);
	
			return node;
		}
	};
	
	_window2.default.HtmlMediaElement = _mejs2.default.HtmlMediaElement = HtmlMediaElement;
	
	_renderer.renderer.add(HtmlMediaElement);
	
	},{"2":2,"25":25,"27":27,"3":3,"7":7,"8":8}],24:[function(_dereq_,module,exports){
	'use strict';
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _renderer = _dereq_(8);
	
	var _general = _dereq_(27);
	
	var _media = _dereq_(28);
	
	var _dom = _dereq_(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var YouTubeApi = {
		isIframeStarted: false,
	
		isIframeLoaded: false,
	
		iframeQueue: [],
	
		enqueueIframe: function enqueueIframe(settings) {
			YouTubeApi.isLoaded = typeof YT !== 'undefined' && YT.loaded;
	
			if (YouTubeApi.isLoaded) {
				YouTubeApi.createIframe(settings);
			} else {
				YouTubeApi.loadIframeApi();
				YouTubeApi.iframeQueue.push(settings);
			}
		},
	
		loadIframeApi: function loadIframeApi() {
			if (!YouTubeApi.isIframeStarted) {
				(0, _dom.loadScript)('https://www.youtube.com/player_api');
				YouTubeApi.isIframeStarted = true;
			}
		},
	
		iFrameReady: function iFrameReady() {
	
			YouTubeApi.isLoaded = true;
			YouTubeApi.isIframeLoaded = true;
	
			while (YouTubeApi.iframeQueue.length > 0) {
				var settings = YouTubeApi.iframeQueue.pop();
				YouTubeApi.createIframe(settings);
			}
		},
	
		createIframe: function createIframe(settings) {
			return new YT.Player(settings.containerId, settings);
		},
	
		getYouTubeId: function getYouTubeId(url) {
	
			var youTubeId = '';
	
			if (url.indexOf('?') > 0) {
				youTubeId = YouTubeApi.getYouTubeIdFromParam(url);
	
				if (youTubeId === '') {
					youTubeId = YouTubeApi.getYouTubeIdFromUrl(url);
				}
			} else {
				youTubeId = YouTubeApi.getYouTubeIdFromUrl(url);
			}
	
			var id = youTubeId.substring(youTubeId.lastIndexOf('/') + 1);
			youTubeId = id.split('?');
			return youTubeId[0];
		},
	
		getYouTubeIdFromParam: function getYouTubeIdFromParam(url) {
	
			if (url === undefined || url === null || !url.trim().length) {
				return null;
			}
	
			var parts = url.split('?'),
				parameters = parts[1].split('&');
	
			var youTubeId = '';
	
			for (var i = 0, total = parameters.length; i < total; i++) {
				var paramParts = parameters[i].split('=');
				if (paramParts[0] === 'v') {
					youTubeId = paramParts[1];
					break;
				}
			}
	
			return youTubeId;
		},
	
		getYouTubeIdFromUrl: function getYouTubeIdFromUrl(url) {
	
			if (url === undefined || url === null || !url.trim().length) {
				return null;
			}
	
			var parts = url.split('?');
			url = parts[0];
			return url.substring(url.lastIndexOf('/') + 1);
		},
	
		getYouTubeNoCookieUrl: function getYouTubeNoCookieUrl(url) {
			if (url === undefined || url === null || !url.trim().length || url.indexOf('//www.youtube') === -1) {
				return url;
			}
	
			var parts = url.split('/');
			parts[2] = parts[2].replace('.com', '-nocookie.com');
			return parts.join('/');
		}
	};
	
	var YouTubeIframeRenderer = {
		name: 'youtube_iframe',
	
		options: {
			prefix: 'youtube_iframe',
	
			youtube: {
				autoplay: 0,
				controls: 0,
				disablekb: 1,
				end: 0,
				loop: 0,
				modestbranding: 0,
				playsinline: 0,
				rel: 0,
				showinfo: 0,
				start: 0,
				iv_load_policy: 3,
	
				nocookie: false,
	
				imageQuality: null
			}
		},
	
		canPlayType: function canPlayType(type) {
			return ~['video/youtube', 'video/x-youtube'].indexOf(type.toLowerCase());
		},
	
		create: function create(mediaElement, options, mediaFiles) {
	
			var youtube = {},
				apiStack = [],
				readyState = 4;
	
			var youTubeApi = null,
				paused = true,
				ended = false,
				youTubeIframe = null,
				volume = 1;
	
			youtube.options = options;
			youtube.id = mediaElement.id + '_' + options.prefix;
			youtube.mediaElement = mediaElement;
	
			var props = _mejs2.default.html5media.properties,
				assignGettersSetters = function assignGettersSetters(propName) {
	
				var capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
				youtube['get' + capName] = function () {
					if (youTubeApi !== null) {
						var value = null;
	
						switch (propName) {
							case 'currentTime':
								return youTubeApi.getCurrentTime();
							case 'duration':
								return youTubeApi.getDuration();
							case 'volume':
								volume = youTubeApi.getVolume() / 100;
								return volume;
							case 'playbackRate':
								return youTubeApi.getPlaybackRate();
							case 'paused':
								return paused;
							case 'ended':
								return ended;
							case 'muted':
								return youTubeApi.isMuted();
							case 'buffered':
								var percentLoaded = youTubeApi.getVideoLoadedFraction(),
									duration = youTubeApi.getDuration();
								return {
									start: function start() {
										return 0;
									},
									end: function end() {
										return percentLoaded * duration;
									},
									length: 1
								};
							case 'src':
								return youTubeApi.getVideoUrl();
							case 'readyState':
								return readyState;
						}
	
						return value;
					} else {
						return null;
					}
				};
	
				youtube['set' + capName] = function (value) {
					if (youTubeApi !== null) {
						switch (propName) {
							case 'src':
								var url = typeof value === 'string' ? value : value[0].src,
									_videoId = YouTubeApi.getYouTubeId(url);
	
								if (mediaElement.originalNode.autoplay) {
									youTubeApi.loadVideoById(_videoId);
								} else {
									youTubeApi.cueVideoById(_videoId);
								}
								break;
							case 'currentTime':
								youTubeApi.seekTo(value);
								break;
							case 'muted':
								if (value) {
									youTubeApi.mute();
								} else {
									youTubeApi.unMute();
								}
								setTimeout(function () {
									var event = (0, _general.createEvent)('volumechange', youtube);
									mediaElement.dispatchEvent(event);
								}, 50);
								break;
							case 'volume':
								volume = value;
								youTubeApi.setVolume(value * 100);
								setTimeout(function () {
									var event = (0, _general.createEvent)('volumechange', youtube);
									mediaElement.dispatchEvent(event);
								}, 50);
								break;
							case 'playbackRate':
								youTubeApi.setPlaybackRate(value);
								setTimeout(function () {
									var event = (0, _general.createEvent)('ratechange', youtube);
									mediaElement.dispatchEvent(event);
								}, 50);
								break;
							case 'readyState':
								var event = (0, _general.createEvent)('canplay', youtube);
								mediaElement.dispatchEvent(event);
								break;
							default:
								
								break;
						}
					} else {
						apiStack.push({ type: 'set', propName: propName, value: value });
					}
				};
			};
	
			for (var i = 0, total = props.length; i < total; i++) {
				assignGettersSetters(props[i]);
			}
	
			var methods = _mejs2.default.html5media.methods,
				assignMethods = function assignMethods(methodName) {
				youtube[methodName] = function () {
					if (youTubeApi !== null) {
						switch (methodName) {
							case 'play':
								paused = false;
								return youTubeApi.playVideo();
							case 'pause':
								paused = true;
								return youTubeApi.pauseVideo();
							case 'load':
								return null;
						}
					} else {
						apiStack.push({ type: 'call', methodName: methodName });
					}
				};
			};
	
			for (var _i = 0, _total = methods.length; _i < _total; _i++) {
				assignMethods(methods[_i]);
			}
	
			var errorHandler = function errorHandler(error) {
				var message = '';
				switch (error.data) {
					case 2:
						message = 'The request contains an invalid parameter value. Verify that video ID has 11 characters and that contains no invalid characters, such as exclamation points or asterisks.';
						break;
					case 5:
						message = 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.';
						break;
					case 100:
						message = 'The video requested was not found. Either video has been removed or has been marked as private.';
						break;
					case 101:
					case 105:
						message = 'The owner of the requested video does not allow it to be played in embedded players.';
						break;
					default:
						message = 'Unknown error.';
						break;
				}
				mediaElement.generateError('Code ' + error.data + ': ' + message, mediaFiles);
			};
	
			var youtubeContainer = _document2.default.createElement('div');
			youtubeContainer.id = youtube.id;
	
			if (youtube.options.youtube.nocookie) {
				mediaElement.originalNode.src = YouTubeApi.getYouTubeNoCookieUrl(mediaFiles[0].src);
			}
	
			mediaElement.originalNode.parentNode.insertBefore(youtubeContainer, mediaElement.originalNode);
			mediaElement.originalNode.style.display = 'none';
	
			var isAudio = mediaElement.originalNode.tagName.toLowerCase() === 'audio',
				height = isAudio ? '1' : mediaElement.originalNode.height,
				width = isAudio ? '1' : mediaElement.originalNode.width,
				videoId = YouTubeApi.getYouTubeId(mediaFiles[0].src),
				youtubeSettings = {
				id: youtube.id,
				containerId: youtubeContainer.id,
				videoId: videoId,
				height: height,
				width: width,
				playerVars: Object.assign({
					controls: 0,
					rel: 0,
					disablekb: 1,
					showinfo: 0,
					modestbranding: 0,
					html5: 1,
					iv_load_policy: 3
				}, youtube.options.youtube),
				origin: _window2.default.location.host,
				events: {
					onReady: function onReady(e) {
						mediaElement.youTubeApi = youTubeApi = e.target;
						mediaElement.youTubeState = {
							paused: true,
							ended: false
						};
	
						if (apiStack.length) {
							for (var _i2 = 0, _total2 = apiStack.length; _i2 < _total2; _i2++) {
	
								var stackItem = apiStack[_i2];
	
								if (stackItem.type === 'set') {
									var propName = stackItem.propName,
										capName = '' + propName.substring(0, 1).toUpperCase() + propName.substring(1);
	
									youtube['set' + capName](stackItem.value);
								} else if (stackItem.type === 'call') {
									youtube[stackItem.methodName]();
								}
							}
						}
	
						youTubeIframe = youTubeApi.getIframe();
	
						if (mediaElement.originalNode.muted) {
							youTubeApi.mute();
						}
	
						var events = ['mouseover', 'mouseout'],
							assignEvents = function assignEvents(e) {
							var newEvent = (0, _general.createEvent)(e.type, youtube);
							mediaElement.dispatchEvent(newEvent);
						};
	
						for (var _i3 = 0, _total3 = events.length; _i3 < _total3; _i3++) {
							youTubeIframe.addEventListener(events[_i3], assignEvents, false);
						}
	
						var initEvents = ['rendererready', 'loadedmetadata', 'loadeddata', 'canplay'];
	
						for (var _i4 = 0, _total4 = initEvents.length; _i4 < _total4; _i4++) {
							var event = (0, _general.createEvent)(initEvents[_i4], youtube);
							mediaElement.dispatchEvent(event);
						}
					},
					onStateChange: function onStateChange(e) {
						var events = [];
	
						switch (e.data) {
							case -1:
								events = ['loadedmetadata'];
								paused = true;
								ended = false;
								break;
							case 0:
								events = ['ended'];
								paused = false;
								ended = !youtube.options.youtube.loop;
								if (!youtube.options.youtube.loop) {
									youtube.stopInterval();
								}
								break;
							case 1:
								events = ['play', 'playing'];
								paused = false;
								ended = false;
								youtube.startInterval();
								break;
							case 2:
								events = ['pause'];
								paused = true;
								ended = false;
								youtube.stopInterval();
								break;
							case 3:
								events = ['progress'];
								ended = false;
								break;
							case 5:
								events = ['loadeddata', 'loadedmetadata', 'canplay'];
								paused = true;
								ended = false;
								break;
						}
	
						for (var _i5 = 0, _total5 = events.length; _i5 < _total5; _i5++) {
							var event = (0, _general.createEvent)(events[_i5], youtube);
							mediaElement.dispatchEvent(event);
						}
					},
					onError: function onError(e) {
						return errorHandler(e);
					}
				}
			};
	
			if (isAudio || mediaElement.originalNode.hasAttribute('playsinline')) {
				youtubeSettings.playerVars.playsinline = 1;
			}
	
			if (mediaElement.originalNode.controls) {
				youtubeSettings.playerVars.controls = 1;
			}
			if (mediaElement.originalNode.autoplay) {
				youtubeSettings.playerVars.autoplay = 1;
			}
			if (mediaElement.originalNode.loop) {
				youtubeSettings.playerVars.loop = 1;
			}
	
			if ((youtubeSettings.playerVars.loop && parseInt(youtubeSettings.playerVars.loop, 10) === 1 || mediaElement.originalNode.src.indexOf('loop=') > -1) && !youtubeSettings.playerVars.playlist && mediaElement.originalNode.src.indexOf('playlist=') === -1) {
				youtubeSettings.playerVars.playlist = YouTubeApi.getYouTubeId(mediaElement.originalNode.src);
			}
	
			YouTubeApi.enqueueIframe(youtubeSettings);
	
			youtube.onEvent = function (eventName, player, _youTubeState) {
				if (_youTubeState !== null && _youTubeState !== undefined) {
					mediaElement.youTubeState = _youTubeState;
				}
			};
	
			youtube.setSize = function (width, height) {
				if (youTubeApi !== null) {
					youTubeApi.setSize(width, height);
				}
			};
			youtube.hide = function () {
				youtube.stopInterval();
				youtube.pause();
				if (youTubeIframe) {
					youTubeIframe.style.display = 'none';
				}
			};
			youtube.show = function () {
				if (youTubeIframe) {
					youTubeIframe.style.display = '';
				}
			};
			youtube.destroy = function () {
				youTubeApi.destroy();
			};
			youtube.interval = null;
	
			youtube.startInterval = function () {
				youtube.interval = setInterval(function () {
					var event = (0, _general.createEvent)('timeupdate', youtube);
					mediaElement.dispatchEvent(event);
				}, 250);
			};
			youtube.stopInterval = function () {
				if (youtube.interval) {
					clearInterval(youtube.interval);
				}
			};
			youtube.getPosterUrl = function () {
				var quality = options.youtube.imageQuality,
					resolutions = ['default', 'hqdefault', 'mqdefault', 'sddefault', 'maxresdefault'],
					id = YouTubeApi.getYouTubeId(mediaElement.originalNode.src);
				return quality && resolutions.indexOf(quality) > -1 && id ? 'https://img.youtube.com/vi/' + id + '/' + quality + '.jpg' : '';
			};
	
			return youtube;
		}
	};
	
	_window2.default.onYouTubePlayerAPIReady = function () {
		YouTubeApi.iFrameReady();
	};
	
	_media.typeChecks.push(function (url) {
		return (/\/\/(www\.youtube|youtu\.?be)/i.test(url) ? 'video/x-youtube' : null
		);
	});
	
	_renderer.renderer.add(YouTubeIframeRenderer);
	
	},{"2":2,"26":26,"27":27,"28":28,"3":3,"7":7,"8":8}],25:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.cancelFullScreen = exports.requestFullScreen = exports.isFullScreen = exports.FULLSCREEN_EVENT_NAME = exports.HAS_NATIVE_FULLSCREEN_ENABLED = exports.HAS_TRUE_NATIVE_FULLSCREEN = exports.HAS_IOS_FULLSCREEN = exports.HAS_MS_NATIVE_FULLSCREEN = exports.HAS_MOZ_NATIVE_FULLSCREEN = exports.HAS_WEBKIT_NATIVE_FULLSCREEN = exports.HAS_NATIVE_FULLSCREEN = exports.SUPPORTS_NATIVE_HLS = exports.SUPPORT_PASSIVE_EVENT = exports.SUPPORT_POINTER_EVENTS = exports.HAS_MSE = exports.IS_STOCK_ANDROID = exports.IS_SAFARI = exports.IS_FIREFOX = exports.IS_CHROME = exports.IS_EDGE = exports.IS_IE = exports.IS_ANDROID = exports.IS_IOS = exports.IS_IPOD = exports.IS_IPHONE = exports.IS_IPAD = exports.UA = exports.NAV = undefined;
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NAV = exports.NAV = _window2.default.navigator;
	var UA = exports.UA = NAV.userAgent.toLowerCase();
	var IS_IPAD = exports.IS_IPAD = /ipad/i.test(UA) && !_window2.default.MSStream;
	var IS_IPHONE = exports.IS_IPHONE = /iphone/i.test(UA) && !_window2.default.MSStream;
	var IS_IPOD = exports.IS_IPOD = /ipod/i.test(UA) && !_window2.default.MSStream;
	var IS_IOS = exports.IS_IOS = /ipad|iphone|ipod/i.test(UA) && !_window2.default.MSStream;
	var IS_ANDROID = exports.IS_ANDROID = /android/i.test(UA);
	var IS_IE = exports.IS_IE = /(trident|microsoft)/i.test(NAV.appName);
	var IS_EDGE = exports.IS_EDGE = 'msLaunchUri' in NAV && !('documentMode' in _document2.default);
	var IS_CHROME = exports.IS_CHROME = /chrome/i.test(UA);
	var IS_FIREFOX = exports.IS_FIREFOX = /firefox/i.test(UA);
	var IS_SAFARI = exports.IS_SAFARI = /safari/i.test(UA) && !IS_CHROME;
	var IS_STOCK_ANDROID = exports.IS_STOCK_ANDROID = /^mozilla\/\d+\.\d+\s\(linux;\su;/i.test(UA);
	var HAS_MSE = exports.HAS_MSE = 'MediaSource' in _window2.default;
	var SUPPORT_POINTER_EVENTS = exports.SUPPORT_POINTER_EVENTS = function () {
		var element = _document2.default.createElement('x'),
			documentElement = _document2.default.documentElement,
			getComputedStyle = _window2.default.getComputedStyle;
	
		if (!('pointerEvents' in element.style)) {
			return false;
		}
	
		element.style.pointerEvents = 'auto';
		element.style.pointerEvents = 'x';
		documentElement.appendChild(element);
		var supports = getComputedStyle && (getComputedStyle(element, '') || {}).pointerEvents === 'auto';
		element.remove();
		return !!supports;
	}();
	
	var SUPPORT_PASSIVE_EVENT = exports.SUPPORT_PASSIVE_EVENT = function () {
		var supportsPassive = false;
		try {
			var opts = Object.defineProperty({}, 'passive', {
				get: function get() {
					supportsPassive = true;
				}
			});
			_window2.default.addEventListener('test', null, opts);
		} catch (e) {}
	
		return supportsPassive;
	}();
	
	var html5Elements = ['source', 'track', 'audio', 'video'];
	var video = void 0;
	
	for (var i = 0, total = html5Elements.length; i < total; i++) {
		video = _document2.default.createElement(html5Elements[i]);
	}
	
	var SUPPORTS_NATIVE_HLS = exports.SUPPORTS_NATIVE_HLS = IS_SAFARI || IS_IE && /edge/i.test(UA);
	
	var hasiOSFullScreen = video.webkitEnterFullscreen !== undefined;
	
	var hasNativeFullscreen = video.requestFullscreen !== undefined;
	
	if (hasiOSFullScreen && /mac os x 10_5/i.test(UA)) {
		hasNativeFullscreen = false;
		hasiOSFullScreen = false;
	}
	
	var hasWebkitNativeFullScreen = video.webkitRequestFullScreen !== undefined;
	var hasMozNativeFullScreen = video.mozRequestFullScreen !== undefined;
	var hasMsNativeFullScreen = video.msRequestFullscreen !== undefined;
	var hasTrueNativeFullScreen = hasWebkitNativeFullScreen || hasMozNativeFullScreen || hasMsNativeFullScreen;
	var nativeFullScreenEnabled = hasTrueNativeFullScreen;
	var fullScreenEventName = '';
	var isFullScreen = void 0,
		requestFullScreen = void 0,
		cancelFullScreen = void 0;
	
	if (hasMozNativeFullScreen) {
		nativeFullScreenEnabled = _document2.default.mozFullScreenEnabled;
	} else if (hasMsNativeFullScreen) {
		nativeFullScreenEnabled = _document2.default.msFullscreenEnabled;
	}
	
	if (IS_CHROME) {
		hasiOSFullScreen = false;
	}
	
	if (hasTrueNativeFullScreen) {
		if (hasWebkitNativeFullScreen) {
			fullScreenEventName = 'webkitfullscreenchange';
		} else if (hasMozNativeFullScreen) {
			fullScreenEventName = 'fullscreenchange';
		} else if (hasMsNativeFullScreen) {
			fullScreenEventName = 'MSFullscreenChange';
		}
	
		exports.isFullScreen = isFullScreen = function isFullScreen() {
			if (hasMozNativeFullScreen) {
				return _document2.default.mozFullScreen;
			} else if (hasWebkitNativeFullScreen) {
				return _document2.default.webkitIsFullScreen;
			} else if (hasMsNativeFullScreen) {
				return _document2.default.msFullscreenElement !== null;
			}
		};
	
		exports.requestFullScreen = requestFullScreen = function requestFullScreen(el) {
			if (hasWebkitNativeFullScreen) {
				el.webkitRequestFullScreen();
			} else if (hasMozNativeFullScreen) {
				el.mozRequestFullScreen();
			} else if (hasMsNativeFullScreen) {
				el.msRequestFullscreen();
			}
		};
	
		exports.cancelFullScreen = cancelFullScreen = function cancelFullScreen() {
			if (hasWebkitNativeFullScreen) {
				_document2.default.webkitCancelFullScreen();
			} else if (hasMozNativeFullScreen) {
				_document2.default.mozCancelFullScreen();
			} else if (hasMsNativeFullScreen) {
				_document2.default.msExitFullscreen();
			}
		};
	}
	
	var HAS_NATIVE_FULLSCREEN = exports.HAS_NATIVE_FULLSCREEN = hasNativeFullscreen;
	var HAS_WEBKIT_NATIVE_FULLSCREEN = exports.HAS_WEBKIT_NATIVE_FULLSCREEN = hasWebkitNativeFullScreen;
	var HAS_MOZ_NATIVE_FULLSCREEN = exports.HAS_MOZ_NATIVE_FULLSCREEN = hasMozNativeFullScreen;
	var HAS_MS_NATIVE_FULLSCREEN = exports.HAS_MS_NATIVE_FULLSCREEN = hasMsNativeFullScreen;
	var HAS_IOS_FULLSCREEN = exports.HAS_IOS_FULLSCREEN = hasiOSFullScreen;
	var HAS_TRUE_NATIVE_FULLSCREEN = exports.HAS_TRUE_NATIVE_FULLSCREEN = hasTrueNativeFullScreen;
	var HAS_NATIVE_FULLSCREEN_ENABLED = exports.HAS_NATIVE_FULLSCREEN_ENABLED = nativeFullScreenEnabled;
	var FULLSCREEN_EVENT_NAME = exports.FULLSCREEN_EVENT_NAME = fullScreenEventName;
	exports.isFullScreen = isFullScreen;
	exports.requestFullScreen = requestFullScreen;
	exports.cancelFullScreen = cancelFullScreen;
	
	
	_mejs2.default.Features = _mejs2.default.Features || {};
	_mejs2.default.Features.isiPad = IS_IPAD;
	_mejs2.default.Features.isiPod = IS_IPOD;
	_mejs2.default.Features.isiPhone = IS_IPHONE;
	_mejs2.default.Features.isiOS = _mejs2.default.Features.isiPhone || _mejs2.default.Features.isiPad;
	_mejs2.default.Features.isAndroid = IS_ANDROID;
	_mejs2.default.Features.isIE = IS_IE;
	_mejs2.default.Features.isEdge = IS_EDGE;
	_mejs2.default.Features.isChrome = IS_CHROME;
	_mejs2.default.Features.isFirefox = IS_FIREFOX;
	_mejs2.default.Features.isSafari = IS_SAFARI;
	_mejs2.default.Features.isStockAndroid = IS_STOCK_ANDROID;
	_mejs2.default.Features.hasMSE = HAS_MSE;
	_mejs2.default.Features.supportsNativeHLS = SUPPORTS_NATIVE_HLS;
	_mejs2.default.Features.supportsPointerEvents = SUPPORT_POINTER_EVENTS;
	_mejs2.default.Features.supportsPassiveEvent = SUPPORT_PASSIVE_EVENT;
	_mejs2.default.Features.hasiOSFullScreen = HAS_IOS_FULLSCREEN;
	_mejs2.default.Features.hasNativeFullscreen = HAS_NATIVE_FULLSCREEN;
	_mejs2.default.Features.hasWebkitNativeFullScreen = HAS_WEBKIT_NATIVE_FULLSCREEN;
	_mejs2.default.Features.hasMozNativeFullScreen = HAS_MOZ_NATIVE_FULLSCREEN;
	_mejs2.default.Features.hasMsNativeFullScreen = HAS_MS_NATIVE_FULLSCREEN;
	_mejs2.default.Features.hasTrueNativeFullScreen = HAS_TRUE_NATIVE_FULLSCREEN;
	_mejs2.default.Features.nativeFullScreenEnabled = HAS_NATIVE_FULLSCREEN_ENABLED;
	_mejs2.default.Features.fullScreenEventName = FULLSCREEN_EVENT_NAME;
	_mejs2.default.Features.isFullScreen = isFullScreen;
	_mejs2.default.Features.requestFullScreen = requestFullScreen;
	_mejs2.default.Features.cancelFullScreen = cancelFullScreen;
	
	},{"2":2,"3":3,"7":7}],26:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.removeClass = exports.addClass = exports.hasClass = undefined;
	exports.loadScript = loadScript;
	exports.offset = offset;
	exports.toggleClass = toggleClass;
	exports.fadeOut = fadeOut;
	exports.fadeIn = fadeIn;
	exports.siblings = siblings;
	exports.visible = visible;
	exports.ajax = ajax;
	
	var _window = _dereq_(3);
	
	var _window2 = _interopRequireDefault(_window);
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function loadScript(url) {
		return new Promise(function (resolve, reject) {
			var script = _document2.default.createElement('script');
			script.src = url;
			script.async = true;
			script.onload = function () {
				script.remove();
				resolve();
			};
			script.onerror = function () {
				script.remove();
				reject();
			};
			_document2.default.head.appendChild(script);
		});
	}
	
	function offset(el) {
		var rect = el.getBoundingClientRect(),
			scrollLeft = _window2.default.pageXOffset || _document2.default.documentElement.scrollLeft,
			scrollTop = _window2.default.pageYOffset || _document2.default.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
	
	var hasClassMethod = void 0,
		addClassMethod = void 0,
		removeClassMethod = void 0;
	
	if ('classList' in _document2.default.documentElement) {
		hasClassMethod = function hasClassMethod(el, className) {
			return el.classList !== undefined && el.classList.contains(className);
		};
		addClassMethod = function addClassMethod(el, className) {
			return el.classList.add(className);
		};
		removeClassMethod = function removeClassMethod(el, className) {
			return el.classList.remove(className);
		};
	} else {
		hasClassMethod = function hasClassMethod(el, className) {
			return new RegExp('\\b' + className + '\\b').test(el.className);
		};
		addClassMethod = function addClassMethod(el, className) {
			if (!hasClass(el, className)) {
				el.className += ' ' + className;
			}
		};
		removeClassMethod = function removeClassMethod(el, className) {
			el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
		};
	}
	
	var hasClass = exports.hasClass = hasClassMethod;
	var addClass = exports.addClass = addClassMethod;
	var removeClass = exports.removeClass = removeClassMethod;
	
	function toggleClass(el, className) {
		hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
	}
	
	function fadeOut(el) {
		var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
		var callback = arguments[2];
	
		if (!el.style.opacity) {
			el.style.opacity = 1;
		}
	
		var start = null;
		_window2.default.requestAnimationFrame(function animate(timestamp) {
			start = start || timestamp;
			var progress = timestamp - start;
			var opacity = parseFloat(1 - progress / duration, 2);
			el.style.opacity = opacity < 0 ? 0 : opacity;
			if (progress > duration) {
				if (callback && typeof callback === 'function') {
					callback();
				}
			} else {
				_window2.default.requestAnimationFrame(animate);
			}
		});
	}
	
	function fadeIn(el) {
		var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 400;
		var callback = arguments[2];
	
		if (!el.style.opacity) {
			el.style.opacity = 0;
		}
	
		var start = null;
		_window2.default.requestAnimationFrame(function animate(timestamp) {
			start = start || timestamp;
			var progress = timestamp - start;
			var opacity = parseFloat(progress / duration, 2);
			el.style.opacity = opacity > 1 ? 1 : opacity;
			if (progress > duration) {
				if (callback && typeof callback === 'function') {
					callback();
				}
			} else {
				_window2.default.requestAnimationFrame(animate);
			}
		});
	}
	
	function siblings(el, filter) {
		var siblings = [];
		el = el.parentNode.firstChild;
		do {
			if (!filter || filter(el)) {
				siblings.push(el);
			}
		} while (el = el.nextSibling);
		return siblings;
	}
	
	function visible(elem) {
		if (elem.getClientRects !== undefined && elem.getClientRects === 'function') {
			return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
		}
		return !!(elem.offsetWidth || elem.offsetHeight);
	}
	
	function ajax(url, dataType, success, error) {
		var xhr = _window2.default.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	
		var type = 'application/x-www-form-urlencoded; charset=UTF-8',
			completed = false,
			accept = '*/'.concat('*');
	
		switch (dataType) {
			case 'text':
				type = 'text/plain';
				break;
			case 'json':
				type = 'application/json, text/javascript';
				break;
			case 'html':
				type = 'text/html';
				break;
			case 'xml':
				type = 'application/xml, text/xml';
				break;
		}
	
		if (type !== 'application/x-www-form-urlencoded') {
			accept = type + ', */*; q=0.01';
		}
	
		if (xhr) {
			xhr.open('GET', url, true);
			xhr.setRequestHeader('Accept', accept);
			xhr.onreadystatechange = function () {
				if (completed) {
					return;
				}
	
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						completed = true;
						var data = void 0;
						switch (dataType) {
							case 'json':
								data = JSON.parse(xhr.responseText);
								break;
							case 'xml':
								data = xhr.responseXML;
								break;
							default:
								data = xhr.responseText;
								break;
						}
						success(data);
					} else if (typeof error === 'function') {
						error(xhr.status);
					}
				}
			};
	
			xhr.send();
		}
	}
	
	_mejs2.default.Utils = _mejs2.default.Utils || {};
	_mejs2.default.Utils.offset = offset;
	_mejs2.default.Utils.hasClass = hasClass;
	_mejs2.default.Utils.addClass = addClass;
	_mejs2.default.Utils.removeClass = removeClass;
	_mejs2.default.Utils.toggleClass = toggleClass;
	_mejs2.default.Utils.fadeIn = fadeIn;
	_mejs2.default.Utils.fadeOut = fadeOut;
	_mejs2.default.Utils.siblings = siblings;
	_mejs2.default.Utils.visible = visible;
	_mejs2.default.Utils.ajax = ajax;
	_mejs2.default.Utils.loadScript = loadScript;
	
	},{"2":2,"3":3,"7":7}],27:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.escapeHTML = escapeHTML;
	exports.debounce = debounce;
	exports.isObjectEmpty = isObjectEmpty;
	exports.splitEvents = splitEvents;
	exports.createEvent = createEvent;
	exports.isNodeAfter = isNodeAfter;
	exports.isString = isString;
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function escapeHTML(input) {
	
		if (typeof input !== 'string') {
			throw new Error('Argument passed must be a string');
		}
	
		var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;'
		};
	
		return input.replace(/[&<>"]/g, function (c) {
			return map[c];
		});
	}
	
	function debounce(func, wait) {
		var _this = this,
			_arguments = arguments;
	
		var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	
		if (typeof func !== 'function') {
			throw new Error('First argument must be a function');
		}
	
		if (typeof wait !== 'number') {
			throw new Error('Second argument must be a numeric value');
		}
	
		var timeout = void 0;
		return function () {
			var context = _this,
				args = _arguments;
			var later = function later() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
	
			if (callNow) {
				func.apply(context, args);
			}
		};
	}
	
	function isObjectEmpty(instance) {
		return Object.getOwnPropertyNames(instance).length <= 0;
	}
	
	function splitEvents(events, id) {
		var rwindow = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
	
		var ret = { d: [], w: [] };
		(events || '').split(' ').forEach(function (v) {
			var eventName = '' + v + (id ? '.' + id : '');
	
			if (eventName.startsWith('.')) {
				ret.d.push(eventName);
				ret.w.push(eventName);
			} else {
				ret[rwindow.test(v) ? 'w' : 'd'].push(eventName);
			}
		});
	
		ret.d = ret.d.join(' ');
		ret.w = ret.w.join(' ');
		return ret;
	}
	
	function createEvent(eventName, target) {
	
		if (typeof eventName !== 'string') {
			throw new Error('Event name must be a string');
		}
	
		var eventFrags = eventName.match(/([a-z]+\.([a-z]+))/i),
			detail = {
			target: target
		};
	
		if (eventFrags !== null) {
			eventName = eventFrags[1];
			detail.namespace = eventFrags[2];
		}
	
		return new window.CustomEvent(eventName, {
			detail: detail
		});
	}
	
	function isNodeAfter(sourceNode, targetNode) {
	
		return !!(sourceNode && targetNode && sourceNode.compareDocumentPosition(targetNode) & 2);
	}
	
	function isString(value) {
		return typeof value === 'string';
	}
	
	_mejs2.default.Utils = _mejs2.default.Utils || {};
	_mejs2.default.Utils.escapeHTML = escapeHTML;
	_mejs2.default.Utils.debounce = debounce;
	_mejs2.default.Utils.isObjectEmpty = isObjectEmpty;
	_mejs2.default.Utils.splitEvents = splitEvents;
	_mejs2.default.Utils.createEvent = createEvent;
	_mejs2.default.Utils.isNodeAfter = isNodeAfter;
	_mejs2.default.Utils.isString = isString;
	
	},{"7":7}],28:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.typeChecks = undefined;
	exports.absolutizeUrl = absolutizeUrl;
	exports.formatType = formatType;
	exports.getMimeFromType = getMimeFromType;
	exports.getTypeFromFile = getTypeFromFile;
	exports.getExtension = getExtension;
	exports.normalizeExtension = normalizeExtension;
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	var _general = _dereq_(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var typeChecks = exports.typeChecks = [];
	
	function absolutizeUrl(url) {
	
		if (typeof url !== 'string') {
			throw new Error('`url` argument must be a string');
		}
	
		var el = document.createElement('div');
		el.innerHTML = '<a href="' + (0, _general.escapeHTML)(url) + '">x</a>';
		return el.firstChild.href;
	}
	
	function formatType(url) {
		var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
		return url && !type ? getTypeFromFile(url) : type;
	}
	
	function getMimeFromType(type) {
	
		if (typeof type !== 'string') {
			throw new Error('`type` argument must be a string');
		}
	
		return type && type.indexOf(';') > -1 ? type.substr(0, type.indexOf(';')) : type;
	}
	
	function getTypeFromFile(url) {
	
		if (typeof url !== 'string') {
			throw new Error('`url` argument must be a string');
		}
	
		for (var i = 0, total = typeChecks.length; i < total; i++) {
			var type = typeChecks[i](url);
	
			if (type) {
				return type;
			}
		}
	
		var ext = getExtension(url),
			normalizedExt = normalizeExtension(ext);
	
		var mime = 'video/mp4';
	
		if (normalizedExt) {
			if (~['mp4', 'm4v', 'ogg', 'ogv', 'webm', 'flv', 'mpeg', 'mov'].indexOf(normalizedExt)) {
				mime = 'video/' + normalizedExt;
			} else if (~['mp3', 'oga', 'wav', 'mid', 'midi'].indexOf(normalizedExt)) {
				mime = 'audio/' + normalizedExt;
			}
		}
	
		return mime;
	}
	
	function getExtension(url) {
	
		if (typeof url !== 'string') {
			throw new Error('`url` argument must be a string');
		}
	
		var baseUrl = url.split('?')[0],
			baseName = baseUrl.split('\\').pop().split('/').pop();
		return ~baseName.indexOf('.') ? baseName.substring(baseName.lastIndexOf('.') + 1) : '';
	}
	
	function normalizeExtension(extension) {
	
		if (typeof extension !== 'string') {
			throw new Error('`extension` argument must be a string');
		}
	
		switch (extension) {
			case 'mp4':
			case 'm4v':
				return 'mp4';
			case 'webm':
			case 'webma':
			case 'webmv':
				return 'webm';
			case 'ogg':
			case 'oga':
			case 'ogv':
				return 'ogg';
			default:
				return extension;
		}
	}
	
	_mejs2.default.Utils = _mejs2.default.Utils || {};
	_mejs2.default.Utils.typeChecks = typeChecks;
	_mejs2.default.Utils.absolutizeUrl = absolutizeUrl;
	_mejs2.default.Utils.formatType = formatType;
	_mejs2.default.Utils.getMimeFromType = getMimeFromType;
	_mejs2.default.Utils.getTypeFromFile = getTypeFromFile;
	_mejs2.default.Utils.getExtension = getExtension;
	_mejs2.default.Utils.normalizeExtension = normalizeExtension;
	
	},{"27":27,"7":7}],29:[function(_dereq_,module,exports){
	'use strict';
	
	var _document = _dereq_(2);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _promisePolyfill = _dereq_(4);
	
	var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function (arr) {
		arr.forEach(function (item) {
			if (item.hasOwnProperty('remove')) {
				return;
			}
			Object.defineProperty(item, 'remove', {
				configurable: true,
				enumerable: true,
				writable: true,
				value: function remove() {
					this.parentNode.removeChild(this);
				}
			});
		});
	})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
	
	(function () {
	
		if (typeof window.CustomEvent === 'function') {
			return false;
		}
	
		function CustomEvent(event, params) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = _document2.default.createEvent('CustomEvent');
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		}
	
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	})();
	
	if (typeof Object.assign !== 'function') {
		Object.assign = function (target) {
	
			if (target === null || target === undefined) {
				throw new TypeError('Cannot convert undefined or null to object');
			}
	
			var to = Object(target);
	
			for (var index = 1, total = arguments.length; index < total; index++) {
				var nextSource = arguments[index];
	
				if (nextSource !== null) {
					for (var nextKey in nextSource) {
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		};
	}
	
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function (searchString, position) {
			position = position || 0;
			return this.substr(position, searchString.length) === searchString;
		};
	}
	
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i = matches.length - 1;
			while (--i >= 0 && matches.item(i) !== this) {}
			return i > -1;
		};
	}
	
	if (window.Element && !Element.prototype.closest) {
		Element.prototype.closest = function (s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i = void 0,
				el = this;
			do {
				i = matches.length;
				while (--i >= 0 && matches.item(i) !== el) {}
			} while (i < 0 && (el = el.parentElement));
			return el;
		};
	}
	
	(function () {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}
	
		if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	
		if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
	})();
	
	if (/firefox/i.test(navigator.userAgent)) {
		var getComputedStyle = window.getComputedStyle;
		window.getComputedStyle = function (el, pseudoEl) {
			var t = getComputedStyle(el, pseudoEl);
			return t === null ? { getPropertyValue: function getPropertyValue() {} } : t;
		};
	}
	
	if (!window.Promise) {
		window.Promise = _promisePolyfill2.default;
	}
	
	(function (constructor) {
		if (constructor && constructor.prototype && constructor.prototype.children === null) {
			Object.defineProperty(constructor.prototype, 'children', {
				get: function get() {
					var i = 0,
						node = void 0,
						nodes = this.childNodes,
						children = [];
					while (node = nodes[i++]) {
						if (node.nodeType === 1) {
							children.push(node);
						}
					}
					return children;
				}
			});
		}
	})(window.Node || window.Element);
	
	},{"2":2,"4":4}],30:[function(_dereq_,module,exports){
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.isDropFrame = isDropFrame;
	exports.secondsToTimeCode = secondsToTimeCode;
	exports.timeCodeToSeconds = timeCodeToSeconds;
	exports.calculateTimeFormat = calculateTimeFormat;
	exports.convertSMPTEtoSeconds = convertSMPTEtoSeconds;
	
	var _mejs = _dereq_(7);
	
	var _mejs2 = _interopRequireDefault(_mejs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isDropFrame() {
		var fps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 25;
	
		return !(fps % 1 === 0);
	}
	function secondsToTimeCode(time) {
		var forceHours = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var showFrameCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		var fps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 25;
		var secondsDecimalLength = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
		var timeFormat = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'hh:mm:ss';
	
	
		time = !time || typeof time !== 'number' || time < 0 ? 0 : time;
	
		var dropFrames = Math.round(fps * 0.066666),
			timeBase = Math.round(fps),
			framesPer24Hours = Math.round(fps * 3600) * 24,
			framesPer10Minutes = Math.round(fps * 600),
			frameSep = isDropFrame(fps) ? ';' : ':',
			hours = void 0,
			minutes = void 0,
			seconds = void 0,
			frames = void 0,
			f = Math.round(time * fps);
	
		if (isDropFrame(fps)) {
	
			if (f < 0) {
				f = framesPer24Hours + f;
			}
	
			f = f % framesPer24Hours;
	
			var d = Math.floor(f / framesPer10Minutes);
			var m = f % framesPer10Minutes;
			f = f + dropFrames * 9 * d;
			if (m > dropFrames) {
				f = f + dropFrames * Math.floor((m - dropFrames) / Math.round(timeBase * 60 - dropFrames));
			}
	
			var timeBaseDivision = Math.floor(f / timeBase);
	
			hours = Math.floor(Math.floor(timeBaseDivision / 60) / 60);
			minutes = Math.floor(timeBaseDivision / 60) % 60;
	
			if (showFrameCount) {
				seconds = timeBaseDivision % 60;
			} else {
				seconds = Math.floor(f / timeBase % 60).toFixed(secondsDecimalLength);
			}
		} else {
			hours = Math.floor(time / 3600) % 24;
			minutes = Math.floor(time / 60) % 60;
			if (showFrameCount) {
				seconds = Math.floor(time % 60);
			} else {
				seconds = Math.floor(time % 60).toFixed(secondsDecimalLength);
			}
		}
		hours = hours <= 0 ? 0 : hours;
		minutes = minutes <= 0 ? 0 : minutes;
		seconds = seconds <= 0 ? 0 : seconds;
	
		seconds = seconds === 60 ? 0 : seconds;
		minutes = minutes === 60 ? 0 : minutes;
	
		var timeFormatFrags = timeFormat.split(':');
		var timeFormatSettings = {};
		for (var i = 0, total = timeFormatFrags.length; i < total; ++i) {
			var unique = '';
			for (var j = 0, t = timeFormatFrags[i].length; j < t; j++) {
				if (unique.indexOf(timeFormatFrags[i][j]) < 0) {
					unique += timeFormatFrags[i][j];
				}
			}
			if (~['f', 's', 'm', 'h'].indexOf(unique)) {
				timeFormatSettings[unique] = timeFormatFrags[i].length;
			}
		}
	
		var result = forceHours || hours > 0 ? (hours < 10 && timeFormatSettings.h > 1 ? '0' + hours : hours) + ':' : '';
		result += (minutes < 10 && timeFormatSettings.m > 1 ? '0' + minutes : minutes) + ':';
		result += '' + (seconds < 10 && timeFormatSettings.s > 1 ? '0' + seconds : seconds);
	
		if (showFrameCount) {
			frames = (f % timeBase).toFixed(0);
			frames = frames <= 0 ? 0 : frames;
			result += frames < 10 && timeFormatSettings.f ? frameSep + '0' + frames : '' + frameSep + frames;
		}
	
		return result;
	}
	
	function timeCodeToSeconds(time) {
		var fps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25;
	
	
		if (typeof time !== 'string') {
			throw new TypeError('Time must be a string');
		}
	
		if (time.indexOf(';') > 0) {
			time = time.replace(';', ':');
		}
	
		if (!/\d{2}(\:\d{2}){0,3}/i.test(time)) {
			throw new TypeError('Time code must have the format `00:00:00`');
		}
	
		var parts = time.split(':');
	
		var output = void 0,
			hours = 0,
			minutes = 0,
			seconds = 0,
			frames = 0,
			totalMinutes = 0,
			dropFrames = Math.round(fps * 0.066666),
			timeBase = Math.round(fps),
			hFrames = timeBase * 3600,
			mFrames = timeBase * 60;
	
		switch (parts.length) {
			default:
			case 1:
				seconds = parseInt(parts[0], 10);
				break;
			case 2:
				minutes = parseInt(parts[0], 10);
				seconds = parseInt(parts[1], 10);
				break;
			case 3:
				hours = parseInt(parts[0], 10);
				minutes = parseInt(parts[1], 10);
				seconds = parseInt(parts[2], 10);
				break;
			case 4:
				hours = parseInt(parts[0], 10);
				minutes = parseInt(parts[1], 10);
				seconds = parseInt(parts[2], 10);
				frames = parseInt(parts[3], 10);
				break;
		}
	
		if (isDropFrame(fps)) {
			totalMinutes = 60 * hours + minutes;
			output = hFrames * hours + mFrames * minutes + timeBase * seconds + frames - dropFrames * (totalMinutes - Math.floor(totalMinutes / 10));
		} else {
			output = (hFrames * hours + mFrames * minutes + fps * seconds + frames) / fps;
		}
	
		return parseFloat(output.toFixed(3));
	}
	
	function calculateTimeFormat(time, options) {
		var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 25;
	
	
		time = !time || typeof time !== 'number' || time < 0 ? 0 : time;
	
		var hours = Math.floor(time / 3600) % 24,
			minutes = Math.floor(time / 60) % 60,
			seconds = Math.floor(time % 60),
			frames = Math.floor((time % 1 * fps).toFixed(3)),
			lis = [[frames, 'f'], [seconds, 's'], [minutes, 'm'], [hours, 'h']];
	
		var format = options.timeFormat,
			firstTwoPlaces = format[1] === format[0],
			separatorIndex = firstTwoPlaces ? 2 : 1,
			separator = format.length < separatorIndex ? format[separatorIndex] : ':',
			firstChar = format[0],
			required = false;
	
		for (var i = 0, len = lis.length; i < len; i++) {
			if (~format.indexOf(lis[i][1])) {
				required = true;
			} else if (required) {
				var hasNextValue = false;
				for (var j = i; j < len; j++) {
					if (lis[j][0] > 0) {
						hasNextValue = true;
						break;
					}
				}
	
				if (!hasNextValue) {
					break;
				}
	
				if (!firstTwoPlaces) {
					format = firstChar + format;
				}
				format = lis[i][1] + separator + format;
				if (firstTwoPlaces) {
					format = lis[i][1] + format;
				}
				firstChar = lis[i][1];
			}
		}
	
		options.timeFormat = format;
	}
	
	function convertSMPTEtoSeconds(SMPTE) {
	
		if (typeof SMPTE !== 'string') {
			throw new TypeError('Argument must be a string value');
		}
	
		SMPTE = SMPTE.replace(',', '.');
	
		var decimalLen = ~SMPTE.indexOf('.') ? SMPTE.split('.')[1].length : 0;
	
		var secs = 0,
			multiplier = 1;
	
		SMPTE = SMPTE.split(':').reverse();
	
		for (var i = 0, total = SMPTE.length; i < total; i++) {
			multiplier = 1;
			if (i > 0) {
				multiplier = Math.pow(60, i);
			}
			secs += Number(SMPTE[i]) * multiplier;
		}
		return Number(secs.toFixed(decimalLen));
	}
	
	_mejs2.default.Utils = _mejs2.default.Utils || {};
	_mejs2.default.Utils.secondsToTimeCode = secondsToTimeCode;
	_mejs2.default.Utils.timeCodeToSeconds = timeCodeToSeconds;
	_mejs2.default.Utils.calculateTimeFormat = calculateTimeFormat;
	_mejs2.default.Utils.convertSMPTEtoSeconds = convertSMPTEtoSeconds;
	
	},{"7":7}]},{},[29,6,5,15,23,20,19,21,22,24,16,18,17,9,10,11,12,13,14]);
	;
// Source Chooser Plugin
(function($) {

	$.extend(mejs.MepDefaults, {
		sourcechooserText: 'Source Chooser'
	});

	$.extend(MediaElementPlayer.prototype, {
		buildsourcechooser: function(player, controls, layers, media) {

			var t = this;

			player.sourcechooserButton =
				$('<div class="mejs-button mejs-sourcechooser-button">'+
					'<button type="button" aria-controls="' + t.id + '" title="' + t.options.sourcechooserText + '" aria-label="' + t.options.sourcechooserText + '"></button>'+
					'<div class="mejs-sourcechooser-selector mejs-offscreen">'+
						'<ul>'+
						'</ul>'+
					'</div>'+
				'</div>')
					.appendTo(controls)

					// hover
					.hover(function() {
						$(this).find('.mejs-sourcechooser-selector').removeClass('mejs-offscreen').css("visibility", "visible");
					}, function() {
						$(this).find('.mejs-sourcechooser-selector').addClass('mejs-offscreen').css("visibility", "hidden");
					})

					// handle clicks to the language radio buttons
					.delegate('input[type=radio]', 'click', function() {
						var src = this.value;

						if (media.currentSrc != src) {
							var currentTime = media.currentTime;
							var paused = media.paused;
							media.pause();
							media.setSrc(src);

							media.addEventListener('loadedmetadata', function(e) {
								media.currentTime = currentTime;
							}, true);

							var canPlayAfterSourceSwitchHandler = function(e) {
								if (!paused) {
									media.play();
								}
								media.removeEventListener("canplay", canPlayAfterSourceSwitchHandler, true);
							};
							media.addEventListener('canplay', canPlayAfterSourceSwitchHandler, true);
							media.load();
						}
				});

			// add to list
			for (var i in this.node.children) {
				var src = this.node.children[i];

				if (src.nodeName === 'SOURCE' && (media.canPlayType(src.type) == 'probably' || media.canPlayType(src.type) == 'maybe')) {
					player.addSourceButton(src.src, src.title, src.type, media.src == src.src);
				}
			}

		},

		addSourceButton: function(src, label, type, isCurrent) {
			var t = this;
			if (label === '' || label == undefined) {
				label = src;
			}
			type = type.split('/')[1];

			t.sourcechooserButton.find('ul').append(
				$('<li>'+
					'<input type="radio" name="' + t.id + '_sourcechooser" id="' + t.id + '_sourcechooser_' + label + type + '" value="' + src + '" ' + (isCurrent ? 'checked="checked"' : '') + ' />'+
					'<label for="' + t.id + '_sourcechooser_' + label + type + '">' + label + ' (' + type + ')</label>'+
				'</li>')
			);

			t.adjustSourcechooserBox();

		},

		adjustSourcechooserBox: function() {
			var t = this;
			// adjust the size of the outer box
			t.sourcechooserButton.find('.mejs-sourcechooser-selector').height(
				t.sourcechooserButton.find('.mejs-sourcechooser-selector ul').outerHeight(true)
			);
		}
	});

})(mejs.$);
;
(function ($) {
  $.extend(mejs.MepDefaults, {
    adFile: null,
    adSyncTolerance: 0.5,
    videoVolume: "horizontal",
    keyActions: [{ keys: [70], action: function (player, media) {} }],
  });

  MediaElementPlayer.prototype.buildaudiodescription = function (
    player,
    controls,
    layers,
    media
  ) {
    if (!player.isVideo || !player.options.adFile) {
      return;
    }

    var adPlayer = null;
    var isActive = false;
    var $adBtn = $(
      '<div class="mejs__button mejs__audiodescription-button mejs__audiodescription-inactive"><button></button></div>'
    );
    $adBtn.appendTo(controls);
    $adBtn.on("click", function (e) {
      e.preventDefault();
      if (adPlayer === null) {
        loadAudio();
      } else {
        toggleState();
      }
    });

    function loadAudio() {
      $(
        '<audio preload="auto" height="0" id="' +
          player.id +
          '-ad" width="0">' +
          ' <source src="' +
          player.options.adFile +
          '" type="audio/mp3" />' +
          "</audio>"
      ).appendTo(player.container);
      adPlayer = new MediaElement(player.id + "-ad", {
        pluginWidth: 0,
        pluginHeight: 0,
        success: function (element) {
          element.addEventListener(
            "loadeddata",
            function () {
              syncWithVideo();
              toggleState();
            },
            false
          );
        },
      });
    }

    function toggleState() {
      if ($adBtn.hasClass("mejs__audiodescription-inactive")) {
        $adBtn.addClass("mejs__audiodescription-active");
        $adBtn.removeClass("mejs__audiodescription-inactive");
        isActive = true;
      } else {
        $adBtn.addClass("mejs__audiodescription-inactive");
        $adBtn.removeClass("mejs__audiodescription-active");
        isActive = false;
        adPlayer.pause();
      }
    }

    function syncWithVideo() {
      media.addEventListener(
        "play",
        function () {
          if (isActive) {
            adPlayer.play();
          }
        },
        false
      );
      media.addEventListener(
        "pause",
        function () {
          if (isActive) {
            adPlayer.pause();
          }
        },
        false
      );
      media.addEventListener(
        "timeupdate",
        function () {
          var diff = 0;
          if (adPlayer !== null) {
            diff = Math.abs(media.currentTime - adPlayer.currentTime);
            if (diff > player.options.adSyncTolerance) {
              if (isActive) {
                if (!media.paused) {
                  adPlayer.play();
                }
                adPlayer.setCurrentTime(media.currentTime);
              } else {
                adPlayer.pause();
              }
            }
          }
        },
        false
      );
    }
  };
})(jQuery);
;
(function ($, Drupal) {
  'use strict';
  $.fn.createCollapsePanel = function (options) {
    return this.each(function () {
      var panel = $(this);
      var button = panel.find("button");
      var content = panel.find(".panelContent");
      var defaults = {
          open: false,
          speed: 400,
          easing: "easeOutExpo",
        },
        settings = $.extend({}, defaults, options);

      function _init() {
        if (settings.open || panel.hasClass("open")) {
          expand(panel, button, content);
        } else {
          collapse(panel, button, content);
        }

        _toggle(panel, button, content);
      }

      function expand(panel, button, content) {
        button.attr("aria-expanded", "true");
        content.attr("aria-hidden", "false");
        content.slideDown(settings.speed, settings.easing, function () {
          panel.addClass("open");
        });
      }

      function collapse(panel, button, content) {
        button.attr("aria-expanded", "false");
        content.attr("aria-hidden", "true");
        content.slideUp(settings.speed, settings.easing, function () {
          panel.removeClass("open");
        });
      }

      function _toggle(panel, button, content) {
        button.on("click", function () {
          if (panel.hasClass("open")) {
            collapse(panel, button, content);
            return;
          }
          expand(panel, button, content);
          content.trigger("focus");
        });
      }

      _init();
    });
  };
}) (jQuery, Drupal);
;
(function ($, Drupal) {
  'use strict';
  $.fn.createPlayer = function (options) {
    var defaults = {
      txt: [],
      onready: function (element) {},
    };

    var settings = $.extend({}, defaults, options);

    return this.each(function () {
      var $player = $(this);
      var $video = $player.find("video");
      var $audio = $player.find("audio");

      function getTextLabels() {
        $player.settings.txt.play = $video.attr("data-playtxt") || "Afspelen";
        $player.settings.txt.pauze = $video.attr("data-pauzetxt") || "Pauzeer";
        $player.settings.txt.enableAd =
          $video.attr("data-enablead") || "Audio descriptie afspelen";
        $player.settings.txt.disableAd =
          $video.attr("data-disablead") || "Audio descriptie stoppen";
        $player.settings.txt.enableCc =
          $video.attr("data-enablecc") || "Ondertiteling aan";
        $player.settings.txt.disableCc =
          $video.attr("data-disablecc") || "Ondertiteling uit";
        $player.settings.txt.volumeOn =
          $video.attr("data-enablevolume") || "Geluid aan";
        $player.settings.txt.volumeOff =
          $video.attr("data-disablevolume") || "Geluid uit";
        $player.settings.txt.enableFullscreen =
          $video.attr("data-enablefullscreen") ||
          "Schermvullende weergave openen";
        $player.settings.txt.disableFullscreen =
          $video.attr("data-disablefullscreen") ||
          "Schermvullende weergave sluiten";
      }

      function initControlLabels(MediaElement) {
        $player.settings.playButton = $player.find(
          ".mejs__playpause-button button"
        );
        $player.settings.adButton = $player.find(
          ".mejs__audiodescription-button button"
        );
        $player.settings.subButton = $player.find(
          ".mejs__captions-button button"
        );
        $player.settings.volButton = $player.find(".mejs__volume-button button");
        $player.settings.fullscreenButton = $player.find(
          ".mejs__fullscreen-button button"
        );

        togglePlayBtnTxt();
        toggleAdBtnTxt();
        toggleCcBtnTxt();
        toggleVolBtnTxt();
        toggleFullscreenBtnTxt();

        MediaElement.addEventListener(
          "play",
          function () {
            togglePlayBtnTxt();
          },
          false
        );
        MediaElement.addEventListener(
          "playing",
          function () {
            togglePlayBtnTxt();
          },
          false
        );
        MediaElement.addEventListener(
          "pause",
          function () {
            togglePlayBtnTxt();
          },
          false
        );

        $player.settings.adButton.on("click", function () {
          toggleAdBtnTxt();
        });

        $player.settings.subButton.on("click", function () {
          toggleCcBtnTxt();
        });

        $player.settings.volButton.on("click", function () {
          toggleVolBtnTxt();
        });

        $player.settings.fullscreenButton.on("click", function () {
          toggleFullscreenBtnTxt();
        });
      }

      function togglePlayBtnTxt() {
        if ($player.settings.playButton.parent().hasClass("mejs__play")) {
          $player.settings.playButton.attr({
            title: $player.settings.txt.play,
            "aria-label": $player.settings.txt.play,
          });
          $player.settings.playButton.html($player.settings.txt.play);
        } else {
          $player.settings.playButton.attr({
            title: $player.settings.txt.pauze,
            "aria-label": $player.settings.txt.pauze,
          });
          $player.settings.playButton.html($player.settings.txt.pauze);
        }
      }

      function toggleAdBtnTxt() {
        if ($player.settings.adButton.hasClass("inactive")) {
          $player.settings.adButton.removeClass("inactive");
          $player.settings.adButton.attr({
            title: $player.settings.txt.disableAd,
            "aria-label": $player.settings.txt.disableAd,
          });
          $player.settings.adButton.html($player.settings.txt.disableAd);
        } else {
          $player.settings.adButton.addClass("inactive");
          $player.settings.adButton.attr({
            title: $player.settings.txt.enableAd,
            "aria-label": $player.settings.txt.enableAd,
          });
          $player.settings.adButton.html($player.settings.txt.enableAd);
        }
      }

      function toggleCcBtnTxt() {
        if ($player.settings.subButton.hasClass("inactive")) {
          $player.settings.subButton.removeClass("inactive");
          $player.settings.subButton.attr({
            title: $player.settings.txt.disableCc,
            "aria-label": $player.settings.txt.disableCc,
          });
          $player.settings.subButton.html($player.settings.txt.disableCc);
        } else {
          $player.settings.subButton.addClass("inactive");
          $player.settings.subButton.attr({
            title: $player.settings.txt.enableCc,
            "aria-label": $player.settings.txt.enableCc,
          });
          $player.settings.subButton.html($player.settings.txt.enableCc);
        }
      }

      function toggleVolBtnTxt() {
        if ($player.settings.volButton.hasClass("inactive")) {
          $player.settings.volButton.removeClass("inactive");
          $player.settings.volButton.attr({
            title: $player.settings.txt.volumeOn,
            "aria-label": $player.settings.txt.volumeOn,
          });
          $player.settings.volButton.html($player.settings.txt.volumeOn);
        } else {
          $player.settings.volButton.addClass("inactive");
          $player.settings.volButton.attr({
            title: $player.settings.txt.volumeOff,
            "aria-label": $player.settings.txt.volumeOff,
          });
          $player.settings.volButton.html($player.settings.txt.volumeOff);
        }
      }

      function toggleFullscreenBtnTxt() {
        if ($player.settings.fullscreenButton.hasClass("fullscreen")) {
          $player.settings.fullscreenButton.attr({
            title: $player.settings.txt.disableFullscreen,
            "aria-label": $player.settings.txt.disableFullscreen,
          });
          $player.settings.fullscreenButton.html(
            $player.settings.txt.disableFullscreen
          );
          $player.settings.fullscreenButton.removeClass("fullscreen");
        } else {
          $player.settings.fullscreenButton.attr({
            title: $player.settings.txt.enableFullscreen,
            "aria-label": $player.settings.txt.enableFullscreen,
          });
          $player.settings.fullscreenButton.html(
            $player.settings.txt.enableFullscreen
          );
          $player.settings.fullscreenButton.addClass("fullscreen");
        }
      }

      function setPlayerType() {
        if ($player.find("embed").length > 0) {
          $player.addClass("flash");
        }
      }

      function createVideoPlayer() {
        var playerWidth = -1;
        var playerHeight = -1;

        $video.mediaelementplayer({
          enableAutosize: true,
          videoWidth: playerWidth,
          videoHeight: playerHeight,
          mode: "auto",
          poster: $video.attr("data-poster"),
          features: [
            "playpause",
            "current",
            "progress",
            "duration",
            "volume",
            "tracks",
            "audiodescription",
            "fullscreen",
          ],
          adFile: $video.data("ad"),
          alwaysShowControls: true,
          toggleCaptionsButtonWhenOnlyOne: true,
          success: function (MediaElement) {
            initControlLabels(MediaElement);
            setPlayerType();
            $player.settings.onready.call(this, MediaElement);
          },
        });
      }

      function createStreamingVideoPlayer() {
        var playerWidth = -1;
        var playerHeight = -1;

        $video.mediaelementplayer({
          enableAutosize: true,
          videoWidth: playerWidth,
          videoHeight: playerHeight,
          mode: "auto",
          features: ["playpause", "volume", "fullscreen"],
          type: "application/x-mpegURL",
          alwaysShowControls: true,
          success: function (MediaElement) {
            initControlLabels(MediaElement);
            setPlayerType();
          },
          error: function () {
            $player.html($video.attr("data-noplugintxt"));
          },
        });
      }

      function createAudioPlayer() {
        var playerWidth = -1;
        var playerHeight = -1;

        $audio.mediaelementplayer({
          enableAutosize: true,
          videoWidth: playerWidth,
          videoHeight: playerHeight,
          mode: "auto",
          features: ["playpause", "current", "progress", "duration", "volume"],
          alwaysShowControls: true,
          success: function (MediaElement) {
            initControlLabels(MediaElement);
          },
        });
      }

      function init() {
        $player.settings = settings;

        // Get language of webpage
        const language = document
          .getElementsByTagName("html")[0]
          .getAttribute("lang");
          // .split("-")[0];
        // Set language of mediaplayer
        mejs.i18n.language(language);

        getTextLabels();
        if ($video.length > 0) {
          if ($player.hasClass("streaming")) {
            createStreamingVideoPlayer();
          } else {
            createVideoPlayer();
            $player
              .find(".collapsiblePanels")
              .find(".panel")
              .createCollapsePanel();
          }
        } else if ($audio.length > 0) {
          createAudioPlayer();
          $player.find(".collapsiblePanels").find(".panel").createCollapsePanel();
        }
      }

      init();
    });
  };

  // Wrap createPlayer in each(function() {}) so all textchanges on all buttons will work at every video.
  $(".block-audio-video").each(function() {
    $(this).createPlayer();
  });
}) (jQuery, Drupal);
;
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(r){"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),r(t),t}:r(jQuery)}(function(q){"use strict";var m=/\r?\n/g,S={};S.fileapi=void 0!==q('<input type="file">').get(0).files,S.formdata=void 0!==window.FormData;var _=!!q.fn.prop;function o(e){var t=e.data;e.isDefaultPrevented()||(e.preventDefault(),q(e.target).closest("form").ajaxSubmit(t))}function i(e){var t=e.target,r=q(t);if(!r.is("[type=submit],[type=image]")){var a=r.closest("[type=submit]");if(0===a.length)return;t=a[0]}var n,o=t.form;"image"===(o.clk=t).type&&(void 0!==e.offsetX?(o.clk_x=e.offsetX,o.clk_y=e.offsetY):"function"==typeof q.fn.offset?(n=r.offset(),o.clk_x=e.pageX-n.left,o.clk_y=e.pageY-n.top):(o.clk_x=e.pageX-t.offsetLeft,o.clk_y=e.pageY-t.offsetTop)),setTimeout(function(){o.clk=o.clk_x=o.clk_y=null},100)}function N(){var e;q.fn.ajaxSubmit.debug&&(e="[jquery.form] "+Array.prototype.join.call(arguments,""),window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e))}q.fn.attr2=function(){if(!_)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},q.fn.ajaxSubmit=function(M,e,t,r){if(!this.length)return N("ajaxSubmit: skipping submit process - no element selected"),this;var O,a,n,o,X=this;"function"==typeof M?M={success:M}:"string"==typeof M||!1===M&&0<arguments.length?(M={url:M,data:e,dataType:t},"function"==typeof r&&(M.success=r)):void 0===M&&(M={}),O=M.method||M.type||this.attr2("method"),n=(n=(n="string"==typeof(a=M.url||this.attr2("action"))?q.trim(a):"")||window.location.href||"")&&(n.match(/^([^#]+)/)||[])[1],o=/(MSIE|Trident)/.test(navigator.userAgent||"")&&/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",M=q.extend(!0,{url:n,success:q.ajaxSettings.success,type:O||q.ajaxSettings.type,iframeSrc:o},M);var i={};if(this.trigger("form-pre-serialize",[this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(M.beforeSerialize&&!1===M.beforeSerialize(this,M))return N("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var s=M.traditional;void 0===s&&(s=q.ajaxSettings.traditional);var u,c,C=[],l=this.formToArray(M.semantic,C,M.filtering);if(M.data&&(c=q.isFunction(M.data)?M.data(l):M.data,M.extraData=c,u=q.param(c,s)),M.beforeSubmit&&!1===M.beforeSubmit(l,this,M))return N("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[l,this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var f=q.param(l,s);u&&(f=f?f+"&"+u:u),"GET"===M.type.toUpperCase()?(M.url+=(0<=M.url.indexOf("?")?"&":"?")+f,M.data=null):M.data=f;var d,m,p,h=[];M.resetForm&&h.push(function(){X.resetForm()}),M.clearForm&&h.push(function(){X.clearForm(M.includeHidden)}),!M.dataType&&M.target?(d=M.success||function(){},h.push(function(e,t,r){var a=arguments,n=M.replaceTarget?"replaceWith":"html";q(M.target)[n](e).each(function(){d.apply(this,a)})})):M.success&&(q.isArray(M.success)?q.merge(h,M.success):h.push(M.success)),M.success=function(e,t,r){for(var a=M.context||this,n=0,o=h.length;n<o;n++)h[n].apply(a,[e,t,r||X,X])},M.error&&(m=M.error,M.error=function(e,t,r){var a=M.context||this;m.apply(a,[e,t,r,X])}),M.complete&&(p=M.complete,M.complete=function(e,t){var r=M.context||this;p.apply(r,[e,t,X])});var v=0<q("input[type=file]:enabled",this).filter(function(){return""!==q(this).val()}).length,g="multipart/form-data",x=X.attr("enctype")===g||X.attr("encoding")===g,y=S.fileapi&&S.formdata;N("fileAPI :"+y);var b,T=(v||x)&&!y;!1!==M.iframe&&(M.iframe||T)?M.closeKeepAlive?q.get(M.closeKeepAlive,function(){b=w(l)}):b=w(l):b=(v||x)&&y?function(e){for(var r=new FormData,t=0;t<e.length;t++)r.append(e[t].name,e[t].value);if(M.extraData){var a=function(e){var t,r,a=q.param(e,M.traditional).split("&"),n=a.length,o=[];for(t=0;t<n;t++)a[t]=a[t].replace(/\+/g," "),r=a[t].split("="),o.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);return o}(M.extraData);for(t=0;t<a.length;t++)a[t]&&r.append(a[t][0],a[t][1])}M.data=null;var n=q.extend(!0,{},q.ajaxSettings,M,{contentType:!1,processData:!1,cache:!1,type:O||"POST"});M.uploadProgress&&(n.xhr=function(){var e=q.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var t=0,r=e.loaded||e.position,a=e.total;e.lengthComputable&&(t=Math.ceil(r/a*100)),M.uploadProgress(e,r,a,t)},!1),e});n.data=null;var o=n.beforeSend;return n.beforeSend=function(e,t){M.formData?t.data=M.formData:t.data=r,o&&o.call(this,e,t)},q.ajax(n)}(l):q.ajax(M),X.removeData("jqxhr").data("jqxhr",b);for(var j=0;j<C.length;j++)C[j]=null;return this.trigger("form-submit-notify",[this,M]),this;function w(e){var t,r,l,f,o,d,m,p,a,n,h,v,i=X[0],g=q.Deferred();if(g.abort=function(e){p.abort(e)},e)for(r=0;r<C.length;r++)t=q(C[r]),_?t.prop("disabled",!1):t.removeAttr("disabled");(l=q.extend(!0,{},q.ajaxSettings,M)).context=l.context||l,o="jqFormIO"+(new Date).getTime();var s=i.ownerDocument,u=X.closest("body");if(l.iframeTarget?(n=(d=q(l.iframeTarget,s)).attr2("name"))?o=n:d.attr2("name",o):(d=q('<iframe name="'+o+'" src="'+l.iframeSrc+'" />',s)).css({position:"absolute",top:"-1000px",left:"-1000px"}),m=d[0],p={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var t="timeout"===e?"timeout":"aborted";N("aborting upload... "+t),this.aborted=1;try{m.contentWindow.document.execCommand&&m.contentWindow.document.execCommand("Stop")}catch(e){}d.attr("src",l.iframeSrc),p.error=t,l.error&&l.error.call(l.context,p,t,e),f&&q.event.trigger("ajaxError",[p,l,t]),l.complete&&l.complete.call(l.context,p,t)}},(f=l.global)&&0==q.active++&&q.event.trigger("ajaxStart"),f&&q.event.trigger("ajaxSend",[p,l]),l.beforeSend&&!1===l.beforeSend.call(l.context,p,l))return l.global&&q.active--,g.reject(),g;if(p.aborted)return g.reject(),g;(a=i.clk)&&(n=a.name)&&!a.disabled&&(l.extraData=l.extraData||{},l.extraData[n]=a.value,"image"===a.type&&(l.extraData[n+".x"]=i.clk_x,l.extraData[n+".y"]=i.clk_y));var x=1,y=2;function b(t){var r=null;try{t.contentWindow&&(r=t.contentWindow.document)}catch(e){N("cannot get iframe.contentWindow document: "+e)}if(r)return r;try{r=t.contentDocument?t.contentDocument:t.document}catch(e){N("cannot get iframe.contentDocument: "+e),r=t.document}return r}var c=q("meta[name=csrf-token]").attr("content"),T=q("meta[name=csrf-param]").attr("content");function j(){var e=X.attr2("target"),t=X.attr2("action"),r=X.attr("enctype")||X.attr("encoding")||"multipart/form-data";i.setAttribute("target",o),O&&!/post/i.test(O)||i.setAttribute("method","POST"),t!==l.url&&i.setAttribute("action",l.url),l.skipEncodingOverride||O&&!/post/i.test(O)||X.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),l.timeout&&(v=setTimeout(function(){h=!0,A(x)},l.timeout));var a=[];try{if(l.extraData)for(var n in l.extraData)l.extraData.hasOwnProperty(n)&&(q.isPlainObject(l.extraData[n])&&l.extraData[n].hasOwnProperty("name")&&l.extraData[n].hasOwnProperty("value")?a.push(q('<input type="hidden" name="'+l.extraData[n].name+'">',s).val(l.extraData[n].value).appendTo(i)[0]):a.push(q('<input type="hidden" name="'+n+'">',s).val(l.extraData[n]).appendTo(i)[0]));l.iframeTarget||d.appendTo(u),m.attachEvent?m.attachEvent("onload",A):m.addEventListener("load",A,!1),setTimeout(function e(){try{var t=b(m).readyState;N("state = "+t),t&&"uninitialized"===t.toLowerCase()&&setTimeout(e,50)}catch(e){N("Server abort: ",e," (",e.name,")"),A(y),v&&clearTimeout(v),v=void 0}},15);try{i.submit()}catch(e){document.createElement("form").submit.apply(i)}}finally{i.setAttribute("action",t),i.setAttribute("enctype",r),e?i.setAttribute("target",e):X.removeAttr("target"),q(a).remove()}}T&&c&&(l.extraData=l.extraData||{},l.extraData[T]=c),l.forceSync?j():setTimeout(j,10);var w,S,k,D=50;function A(e){if(!p.aborted&&!k){if((S=b(m))||(N("cannot access response document"),e=y),e===x&&p)return p.abort("timeout"),void g.reject(p,"timeout");if(e===y&&p)return p.abort("server abort"),void g.reject(p,"error","server abort");if(S&&S.location.href!==l.iframeSrc||h){m.detachEvent?m.detachEvent("onload",A):m.removeEventListener("load",A,!1);var t,r="success";try{if(h)throw"timeout";var a="xml"===l.dataType||S.XMLDocument||q.isXMLDoc(S);if(N("isXml="+a),!a&&window.opera&&(null===S.body||!S.body.innerHTML)&&--D)return N("requeing onLoad callback, DOM not available"),void setTimeout(A,250);var n=S.body?S.body:S.documentElement;p.responseText=n?n.innerHTML:null,p.responseXML=S.XMLDocument?S.XMLDocument:S,a&&(l.dataType="xml"),p.getResponseHeader=function(e){return{"content-type":l.dataType}[e.toLowerCase()]},n&&(p.status=Number(n.getAttribute("status"))||p.status,p.statusText=n.getAttribute("statusText")||p.statusText);var o,i,s,u=(l.dataType||"").toLowerCase(),c=/(json|script|text)/.test(u);c||l.textarea?(o=S.getElementsByTagName("textarea")[0])?(p.responseText=o.value,p.status=Number(o.getAttribute("status"))||p.status,p.statusText=o.getAttribute("statusText")||p.statusText):c&&(i=S.getElementsByTagName("pre")[0],s=S.getElementsByTagName("body")[0],i?p.responseText=i.textContent?i.textContent:i.innerText:s&&(p.responseText=s.textContent?s.textContent:s.innerText)):"xml"===u&&!p.responseXML&&p.responseText&&(p.responseXML=F(p.responseText));try{w=E(p,u,l)}catch(e){r="parsererror",p.error=t=e||r}}catch(e){N("error caught: ",e),r="error",p.error=t=e||r}p.aborted&&(N("upload aborted"),r=null),p.status&&(r=200<=p.status&&p.status<300||304===p.status?"success":"error"),"success"===r?(l.success&&l.success.call(l.context,w,"success",p),g.resolve(p.responseText,"success",p),f&&q.event.trigger("ajaxSuccess",[p,l])):r&&(void 0===t&&(t=p.statusText),l.error&&l.error.call(l.context,p,r,t),g.reject(p,"error",t),f&&q.event.trigger("ajaxError",[p,l,t])),f&&q.event.trigger("ajaxComplete",[p,l]),f&&!--q.active&&q.event.trigger("ajaxStop"),l.complete&&l.complete.call(l.context,p,r),k=!0,l.timeout&&clearTimeout(v),setTimeout(function(){l.iframeTarget?d.attr("src",l.iframeSrc):d.remove(),p.responseXML=null},100)}}}var F=q.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},L=q.parseJSON||function(e){return window.eval("("+e+")")},E=function(e,t,r){var a=e.getResponseHeader("content-type")||"",n=("xml"===t||!t)&&0<=a.indexOf("xml"),o=n?e.responseXML:e.responseText;return n&&"parsererror"===o.documentElement.nodeName&&q.error&&q.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,t)),"string"==typeof o&&(("json"===t||!t)&&0<=a.indexOf("json")?o=L(o):("script"===t||!t)&&0<=a.indexOf("javascript")&&q.globalEval(o)),o};return g}},q.fn.ajaxForm=function(e,t,r,a){if(("string"==typeof e||!1===e&&0<arguments.length)&&(e={url:e,data:t,dataType:r},"function"==typeof a&&(e.success=a)),(e=e||{}).delegation=e.delegation&&q.isFunction(q.fn.on),e.delegation||0!==this.length)return e.delegation?(q(document).off("submit.form-plugin",this.selector,o).off("click.form-plugin",this.selector,i).on("submit.form-plugin",this.selector,e,o).on("click.form-plugin",this.selector,e,i),this):(e.beforeFormUnbind&&e.beforeFormUnbind(this,e),this.ajaxFormUnbind().on("submit.form-plugin",e,o).on("click.form-plugin",e,i));var n={s:this.selector,c:this.context};return!q.isReady&&n.s?(N("DOM not ready, queuing ajaxForm"),q(function(){q(n.s,n.c).ajaxForm(e)})):N("terminating; zero elements found by selector"+(q.isReady?"":" (DOM not ready)")),this},q.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},q.fn.formToArray=function(e,t,r){var a=[];if(0===this.length)return a;var n,o,i,s,u,c,l,f,d,m,p=this[0],h=this.attr("id"),v=(v=e||void 0===p.elements?p.getElementsByTagName("*"):p.elements)&&q.makeArray(v);if(h&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(n=q(':input[form="'+h+'"]').get()).length&&(v=(v||[]).concat(n)),!v||!v.length)return a;for(q.isFunction(r)&&(v=q.map(v,r)),o=0,c=v.length;o<c;o++)if((m=(u=v[o]).name)&&!u.disabled)if(e&&p.clk&&"image"===u.type)p.clk===u&&(a.push({name:m,value:q(u).val(),type:u.type}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y}));else if((s=q.fieldValue(u,!0))&&s.constructor===Array)for(t&&t.push(u),i=0,l=s.length;i<l;i++)a.push({name:m,value:s[i]});else if(S.fileapi&&"file"===u.type){t&&t.push(u);var g=u.files;if(g.length)for(i=0;i<g.length;i++)a.push({name:m,value:g[i],type:u.type});else a.push({name:m,value:"",type:u.type})}else null!=s&&(t&&t.push(u),a.push({name:m,value:s,type:u.type,required:u.required}));return e||!p.clk||(m=(d=(f=q(p.clk))[0]).name)&&!d.disabled&&"image"===d.type&&(a.push({name:m,value:f.val()}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y})),a},q.fn.formSerialize=function(e){return q.param(this.formToArray(e))},q.fn.fieldSerialize=function(n){var o=[];return this.each(function(){var e=this.name;if(e){var t=q.fieldValue(this,n);if(t&&t.constructor===Array)for(var r=0,a=t.length;r<a;r++)o.push({name:e,value:t[r]});else null!=t&&o.push({name:this.name,value:t})}}),q.param(o)},q.fn.fieldValue=function(e){for(var t=[],r=0,a=this.length;r<a;r++){var n=this[r],o=q.fieldValue(n,e);null==o||o.constructor===Array&&!o.length||(o.constructor===Array?q.merge(t,o):t.push(o))}return t},q.fieldValue=function(e,t){var r=e.name,a=e.type,n=e.tagName.toLowerCase();if(void 0===t&&(t=!0),t&&(!r||e.disabled||"reset"===a||"button"===a||("checkbox"===a||"radio"===a)&&!e.checked||("submit"===a||"image"===a)&&e.form&&e.form.clk!==e||"select"===n&&-1===e.selectedIndex))return null;if("select"!==n)return q(e).val().replace(m,"\r\n");var o=e.selectedIndex;if(o<0)return null;for(var i=[],s=e.options,u="select-one"===a,c=u?o+1:s.length,l=u?o:0;l<c;l++){var f=s[l];if(f.selected&&!f.disabled){var d=(d=f.value)||(f.attributes&&f.attributes.value&&!f.attributes.value.specified?f.text:f.value);if(u)return d;i.push(d)}}return i},q.fn.clearForm=function(e){return this.each(function(){q("input,select,textarea",this).clearFields(e)})},q.fn.clearFields=q.fn.clearInputs=function(r){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var e=this.type,t=this.tagName.toLowerCase();a.test(e)||"textarea"===t?this.value="":"checkbox"===e||"radio"===e?this.checked=!1:"select"===t?this.selectedIndex=-1:"file"===e?/MSIE/.test(navigator.userAgent)?q(this).replaceWith(q(this).clone(!0)):q(this).val(""):r&&(!0===r&&/hidden/.test(e)||"string"==typeof r&&q(this).is(r))&&(this.value="")})},q.fn.resetForm=function(){return this.each(function(){var t=q(this),e=this.tagName.toLowerCase();switch(e){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=t.parents("select");return r.length&&r[0].multiple?"option"===e?this.selected=this.defaultSelected:t.find("option").resetForm():r.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var a=q(t.attr("for")),n=t.find("input,select,textarea");return a[0]&&n.unshift(a[0]),n.resetForm(),!0;case"form":return"function"!=typeof this.reset&&("object"!=typeof this.reset||this.reset.nodeType)||this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},q.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},q.fn.selected=function(r){return void 0===r&&(r=!0),this.each(function(){var e,t=this.type;"checkbox"===t||"radio"===t?this.checked=r:"option"===this.tagName.toLowerCase()&&(e=q(this).parent("select"),r&&e[0]&&"select-one"===e[0].type&&e.find("option").selected(!1),this.selected=r)})},q.fn.ajaxSubmit.debug=!1});

;
