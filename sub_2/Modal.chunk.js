webpackJsonp([4],{573:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(588);t.default=a.a},588:function(e,t,o){"use strict";var a=o(16),n=o(285),r=function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}();function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}var l=document.documentElement,i="[js-hook-modal]",d=function(){function Modal(){var e=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Modal),this.registeredModals={},[].concat(_toConsumableArray(document.querySelectorAll(i))).forEach(function(t){return e.setupModalRegistry(t)}),this.bindEvents()}return r(Modal,[{key:"customBind",value:function customBind(e){var t=this;[].concat(_toConsumableArray(document.querySelectorAll(e.hook))).forEach(function(e){return t.setupModalRegistry(e)})}},{key:"setupModalRegistry",value:function setupModalRegistry(e){var t=e.getAttribute("id"),o={el:e,id:t,triggerBtn:[].concat(_toConsumableArray(document.querySelectorAll("[aria-controls="+t+"]"))),closeBtn:[].concat(_toConsumableArray(e.querySelectorAll("[js-hook-button-modal-close]")))};"true"===e.dataset.modalMobileOnly&&n.a.isTabletLandscapeAndBigger||(setTabIndex(o.el,-1),this.registeredModals["modal-"+t]=o),this.bindModalEvents(o)}},{key:"bindEvents",value:function bindEvents(){var e=this;a.a.$on("modal::close",function(t){return e.closeModal(t)}),a.a.$on("modal::open",function(t,o){return e.openModal(t,o)}),a.a.$on("modal::bind",function(t){return e.customBind(t)})}},{key:"bindModalEvents",value:function bindModalEvents(e){var t=this,o=e.el,n=e.id,r=e.triggerBtn,l=e.closeBtn;r.forEach(function(e){return e.addEventListener("click",function(){o.modalIsOpen?a.a.$trigger("modal["+n+"]::close",{data:{id:n}}):a.a.$trigger("modal["+n+"]::open",{data:{id:n,button:e}})})}),a.a.$on("modal["+n+"]::close",function(){return t.closeModal({id:n})}),a.a.$on("modal["+n+"]::open",function(){return t.openModal({id:n})}),l.forEach(function(e){return e.addEventListener("click",function(){a.a.$trigger("modal["+n+"]::close",{data:{id:n}})})}),document.addEventListener("keyup",function(e){27===e.keyCode&&a.a.$trigger("modal["+n+"]::close",{data:{id:n}})})}},{key:"openModal",value:function openModal(e){var t=this,o=this.registeredModals["modal-"+e.id];if(o){var n="true"===o.el.dataset.modalAutoFocus,r="true"===o.el.dataset.modalNoBodyClass;"true"===o.el.dataset.modalCloseAllOthers&&Object.keys(this.registeredModals).filter(function(o){return t.registeredModals[o].id!==e.id}).forEach(function(e){var o=t.registeredModals[e];o.el.modalIsOpen&&a.a.$trigger("modal["+o.id+"]::close",{data:{id:o.id}})}),r||(l.classList.add("modal-"+e.id+"--is-open"),l.classList.add("is--modal-open")),o.el.tabIndex=1,setTabIndex(o.el,1),o.el.classList.add("modal--is-showing"),o.el.modalIsOpen=!0,a.a.$trigger("focustrap::activate",{data:{element:o.el,autoFocus:n}})}}},{key:"closeModal",value:function closeModal(e){if(e&&e.id){var t=this.registeredModals["modal-"+e.id];if(t)"true"===t.el.dataset.modalNoBodyClass||(l.classList.remove("modal-"+e.id+"--is-open"),l.classList.remove("is--modal-open")),t.el.tabIndex=-1,setTabIndex(t.el,-1),t.el.classList.remove("modal--is-showing"),t.el.modalIsOpen=!1,a.a.$trigger("focustrap::deactivate"),this.clearCurrentFocus()}else{var o=!0,n=!1,r=void 0;try{for(var i,d=Object.keys(this.registeredModals)[Symbol.iterator]();!(o=(i=d.next()).done);o=!0){var s=i.value;this.closeModal({id:this.registeredModals[s].id}),a.a.$trigger("focustrap::deactivate")}}catch(e){n=!0,r=e}finally{try{!o&&d.return&&d.return()}finally{if(n)throw r}}}}},{key:"clearCurrentFocus",value:function clearCurrentFocus(){document.activeElement!=document.body&&document.activeElement.blur()}}]),Modal}();function setTabIndex(e,t){[].concat(_toConsumableArray(e.querySelectorAll('a, area, input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, video'))).forEach(function(e){return e.tabIndex=t})}t.a=new d}});