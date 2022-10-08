/**
 * @file
 * JavaScript behaviors for element help text (tooltip).
 */

(function ($, Drupal) {

  'use strict';

  // @see https://atomiks.github.io/tippyjs/v5/all-props/
  // @see https://atomiks.github.io/tippyjs/v6/all-props/
  Drupal.webform = Drupal.webform || {};
  Drupal.webform.elementHelpIcon = Drupal.webform.elementHelpIcon || {};
  Drupal.webform.elementHelpIcon.options = Drupal.webform.elementHelpIcon.options || {};

  /**
   * Element help icon.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.webformElementHelpIcon = {
    attach: function (context) {
      if (!window.tippy) {
        return;
      }

      // Hide on escape.
      // @see https://atomiks.github.io/tippyjs/v6/plugins/#hideonesc
      var hideOnEsc = {
        name: 'hideOnEsc',
        defaultValue: true,
        fn({hide}) {
          function onKeyDown(event) {
            if (event.keyCode === 27) {
              hide();
            }
          }

          return {
            onShow() {
              document.addEventListener('keydown', onKeyDown);
            },
            onHide() {
              document.removeEventListener('keydown', onKeyDown);
            },
          };
        },
      };

      $(context).find('.js-webform-element-help').once('webform-element-help').each(function () {
        var $link = $(this);

        $link.on('click', function (event) {
          // Prevent click from toggling <label>s wrapped around help.
          event.preventDefault();
        });

        var options = $.extend({
          content: $link.attr('data-webform-help'),
          delay: 100,
          allowHTML: true,
          interactive: true,
          plugins: [hideOnEsc]
        }, Drupal.webform.elementHelpIcon.options);

        tippy(this, options);
      });
    }
  };

})(jQuery, Drupal);
;
/**
 * Swiper 4.5.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 13, 2019
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Swiper = factory());
}(this, function () { 'use strict';

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = (typeof document === 'undefined') ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  } : document; // eslint-disable-line

  var win = (typeof window === 'undefined') ? {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  } : window; // eslint-disable-line

  /**
   * Dom7 2.1.3
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2019, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: February 11, 2019
   */

  var Dom7 = function Dom7(arr) {
    var self = this;
    // Create array-like object
    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    // Return collection with methods
    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;
    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }
    if (selector) {
        // String
      if (typeof selector === 'string') {
        var els;
        var tempParent;
        var html = selector.trim();
        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';
          if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
          if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
          if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
          if (html.indexOf('<option') === 0) { toCreate = 'select'; }
          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;
          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }
          for (i = 0; i < els.length; i += 1) {
            if (els[i]) { arr.push(els[i]); }
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }
    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  }

  // Classes and attributes
  function addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.add(classes[i]); }
      }
    }
    return this;
  }
  function removeClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.remove(classes[i]); }
      }
    }
    return this;
  }
  function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  }
  function toggleClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  }
  function attr(attrs, value) {
    var arguments$1 = arguments;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  // eslint-disable-next-line
  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  }
  function data(key, value) {
    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  // Transforms
  // eslint-disable-next-line
  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }
    return this;
  }
  function transition(duration) {
    if (typeof duration !== 'string') {
      duration = duration + "ms"; // eslint-disable-line
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  }
  // Events
  function on() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents(); // eslint-disable-line
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) { el.dom7Listeners = {}; }
          if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
          if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = (void 0);
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  function trigger() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var evt = (void 0);
        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  }
  function styles() {
    if (this[0]) { return win.getComputedStyle(this[0], null); }
    return {};
  }
  function css(props, value) {
    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  }
  // Iterate over the collection passing elements to `callback`
  function each(callback) {
    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  // eslint-disable-next-line
  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  }
  // eslint-disable-next-line
  function text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  }
  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === doc) { return el === doc; }
    else if (selector === win) { return el === win; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  }
  function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
    return undefined;
  }
  // eslint-disable-next-line
  function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  }
  function append() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  function prepend(newChild) {
    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this;
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  }
  function parent(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) { parents.push(this[i].parentNode); }
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  }
  function parents(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var parent = this[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents));
  }
  function closest(selector) {
    var closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  function find(selector) {
    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  }
  function children(selector) {
    var children = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Dom7(unique(children));
  }
  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) { this[i].parentNode.removeChild(this[i]); }
    }
    return this;
  }
  function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    data: data,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    remove: remove,
    add: add,
    styles: styles,
  };

  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = $.fn[methodName] || Methods[methodName];
  });

  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {
          // no getter for object
        }
        try {
          delete object[key];
        } catch (e) {
          // something got wrong
        }
      });
    },
    nextTick: function nextTick(callback, delay) {
      if ( delay === void 0 ) delay = 0;

      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el, axis) {
      if ( axis === void 0 ) axis = 'x';

      var matrix;
      var curTransform;
      var transformMatrix;

      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[4]); }
      }
      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[5]); }
      }
      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i;
      var params;
      var param;
      var length;
      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }
      return query;
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

      var to = Object(args[0]);
      for (var i = 1; i < args.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
  };

  var Support = (function Support() {
    var testDiv = doc.createElement('div');
    return {
      touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
        return !!((win.navigator.maxTouchPoints > 0) || ('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
      }()),

      pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent || ('maxTouchPoints' in win.navigator && win.navigator.maxTouchPoints > 0)),
      prefixedPointerEvents: !!win.navigator.msPointerEnabled,

      transition: (function checkTransition() {
        var style = testDiv.style;
        return ('transition' in style || 'webkitTransition' in style || 'MozTransition' in style);
      }()),
      transforms3d: (win.Modernizr && win.Modernizr.csstransforms3d === true) || (function checkTransforms3d() {
        var style = testDiv.style;
        return ('webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style);
      }()),

      flexbox: (function checkFlexbox() {
        var style = testDiv.style;
        var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
        for (var i = 0; i < styles.length; i += 1) {
          if (styles[i] in style) { return true; }
        }
        return false;
      }()),

      observer: (function checkObserver() {
        return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
      }()),

      passiveListener: (function checkPassiveListener() {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            },
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {
          // No support
        }
        return supportsPassive;
      }()),

      gestures: (function checkGestures() {
        return 'ongesturestart' in win;
      }()),
    };
  }());

  var Browser = (function Browser() {
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
    }
    return {
      isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
      isEdge: !!win.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
    };
  }());

  var SwiperClass = function SwiperClass(params) {
    if ( params === void 0 ) params = {};

    var self = this;
    self.params = params;

    // Events
    self.eventsListeners = {};

    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach(function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  };

  var staticAccessors = { components: { configurable: true } };

  SwiperClass.prototype.on = function on (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
      self.eventsListeners[event][method](handler);
    });
    return self;
  };

  SwiperClass.prototype.once = function once (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    function onceHandler() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      handler.apply(self, args);
      self.off(events, onceHandler);
      if (onceHandler.f7proxy) {
        delete onceHandler.f7proxy;
      }
    }
    onceHandler.f7proxy = handler;
    return self.on(events, onceHandler, priority);
  };

  SwiperClass.prototype.off = function off (events, handler) {
    var self = this;
    if (!self.eventsListeners) { return self; }
    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || (eventHandler.f7proxy && eventHandler.f7proxy === handler)) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.emit = function emit () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    var self = this;
    if (!self.eventsListeners) { return self; }
    var events;
    var data;
    var context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsListeners && self.eventsListeners[event]) {
        var handlers = [];
        self.eventsListeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      // Extend params
      if (module.params) {
        Utils.extend(instanceParams, module.params);
      }
    });
  };

  SwiperClass.prototype.useModules = function useModules (modulesParams) {
      if ( modulesParams === void 0 ) modulesParams = {};

    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      var moduleParams = modulesParams[moduleName] || {};
      // Extend instance methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach(function (modulePropName) {
          var moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on && instance.on) {
        Object.keys(module.on).forEach(function (moduleEventName) {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      }

      // Module create callback
      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  staticAccessors.components.set = function (components) {
    var Class = this;
    if (!Class.use) { return; }
    Class.use(components);
  };

  SwiperClass.installModule = function installModule (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (!Class.prototype.modules) { Class.prototype.modules = {}; }
    var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
    Class.prototype.modules[name] = module;
    // Prototype
    if (module.proto) {
      Object.keys(module.proto).forEach(function (key) {
        Class.prototype[key] = module.proto[key];
      });
    }
    // Class
    if (module.static) {
      Object.keys(module.static).forEach(function (key) {
        Class[key] = module.static[key];
      });
    }
    // Callback
    if (module.install) {
      module.install.apply(Class, params);
    }
    return Class;
  };

  SwiperClass.use = function use (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (Array.isArray(module)) {
      module.forEach(function (m) { return Class.installModule(m); });
      return Class;
    }
    return Class.installModule.apply(Class, [ module ].concat( params ));
  };

  Object.defineProperties( SwiperClass, staticAccessors );

  function updateSize () {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;
    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }
    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }
    if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
      return;
    }

    // Subtract paddings
    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height,
    });
  }

  function updateSlides () {
    var swiper = this;
    var params = swiper.params;

    var $wrapperEl = swiper.$wrapperEl;
    var swiperSize = swiper.size;
    var rtl = swiper.rtlTranslate;
    var wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    var offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;

    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;
    if (typeof swiperSize === 'undefined') {
      return;
    }
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
    }

    swiper.virtualSize = -spaceBetween;

    // reset margins
    if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
    else { slides.css({ marginRight: '', marginBottom: '' }); }

    var slidesNumberEvenToRows;
    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }
      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    }

    // Calc slides
    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);
    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);
      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = (void 0);
        var column = (void 0);
        var row = (void 0);
        if (
          (params.slidesPerColumnFill === 'column')
          || (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1)
        ) {
          if (params.slidesPerColumnFill === 'column') {
            column = Math.floor(i / slidesPerColumn);
            row = i - (column * slidesPerColumn);
            if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
              row += 1;
              if (row >= slidesPerColumn) {
                row = 0;
                column += 1;
              }
            }
          } else {
            var groupIndex = Math.floor(i / params.slidesPerGroup);
            row = Math.floor(i / params.slidesPerView) - groupIndex * params.slidesPerColumn;
            column = i - row * params.slidesPerView - groupIndex * params.slidesPerView;
          }
          newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
          slide
            .css({
              '-webkit-box-ordinal-group': newSlideOrderIndex,
              '-moz-box-ordinal-group': newSlideOrderIndex,
              '-ms-flex-order': newSlideOrderIndex,
              '-webkit-order': newSlideOrderIndex,
              order: newSlideOrderIndex,
            });
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - (row * slidesPerRow);
        }
        slide
          .css(
            ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
            (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
          )
          .attr('data-swiper-column', column)
          .attr('data-swiper-row', row);
      }
      if (slide.css('display') === 'none') { continue; } // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        var slideStyles = win.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;
        if (currentTransform) {
          slide[0].style.transform = 'none';
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal()
            ? slide.outerWidth(true)
            : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            var width = parseFloat(slideStyles.getPropertyValue('width'));
            var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
            var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
            var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
            var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
            var boxSizing = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing && boxSizing === 'border-box' && !Browser.isIE) {
              slideSize = width + marginLeft + marginRight;
            } else {
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
            }
          } else {
            var height = parseFloat(slideStyles.getPropertyValue('height'));
            var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
            var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
            var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
            var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
            var boxSizing$1 = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing$1 && boxSizing$1 === 'border-box' && !Browser.isIE) {
              slideSize = height + marginTop + marginBottom;
            } else {
              slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
            }
          }
        }
        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }
      } else {
        slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);


      if (params.centeredSlides) {
        slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;

      prevSlideSize = slideSize;

      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (
      rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
    }
    if (!Support.flexbox || params.setWrapperSize) {
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      if (params.centeredSlides) {
        newSlidesGrid = [];
        for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
          var slidesGridItem = snapGrid[i$1];
          if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
          if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
        }
        snapGrid = newSlidesGrid;
      }
    }

    // Remove last grid elements depending on width
    if (!params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
        var slidesGridItem$1 = snapGrid[i$2];
        if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
        if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem$1);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (snapGrid.length === 0) { snapGrid = [0]; }

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
        else { slides.css({ marginRight: (spaceBetween + "px") }); }
      } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
    }

    if (params.centerInsufficientSlides) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      if (allSlidesSize < swiperSize) {
        var allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid,
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
      swiper.emit('snapGridLengthChange');
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight (speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;
    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    // Find slides currently in view
    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index = swiper.activeIndex + i;
        if (index > swiper.slides.length) { break; }
        activeSlides.push(swiper.slides.eq(index)[0]);
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    }

    // Find new height from highest slide in view
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }

    // Update Height
    if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
  }

  function updateSlidesOffset () {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;

    if (slides.length === 0) { return; }
    if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

    var offsetCenter = -translate;
    if (rtl) { offsetCenter = translate; }

    // Visible Slides
    slides.removeClass(params.slideVisibleClass);

    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
      if (params.watchSlidesVisibility) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = (slideBefore >= 0 && slideBefore < swiper.size - 1)
                  || (slideAfter > 1 && slideAfter <= swiper.size)
                  || (slideBefore <= 0 && slideAfter >= swiper.size);
        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }
      slide.progress = rtl ? -slideProgress : slideProgress;
    }
    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress;
    var isBeginning = swiper.isBeginning;
    var isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / (translatesDiff);
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }
    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd,
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }
    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }
    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses () {
    var swiper = this;

    var slides = swiper.slides;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

    var activeSlide;
    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
    } else {
      activeSlide = slides.eq(activeIndex);
    }

    // Active classes
    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      }
    }
    // Next Slide
    var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }
    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      }
      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      }
    }
  }

  function updateActiveIndex (newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    var previousIndex = swiper.activeIndex;
    var previousRealIndex = swiper.realIndex;
    var previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;
    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      }
      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
      }
    }
    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }
      return;
    }

    // Get real index
    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex,
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    if (swiper.initialized || swiper.runCallbacksOnInit) {
      swiper.emit('slideChange');
    }
  }

  function updateClickedSlide (e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest(("." + (params.slideClass)))[0];
    var slideFound = false;
    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) { slideFound = true; }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
  };

  function getTranslate (axis) {
    if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

    var swiper = this;

    var params = swiper.params;
    var rtl = swiper.rtlTranslate;
    var translate = swiper.translate;
    var $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
    if (rtl) { currentTranslate = -currentTranslate; }

    return currentTranslate || 0;
  }

  function setTranslate (translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (!params.virtualTranslate) {
      if (Support.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
      else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;

    // Check if we need to update progress
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate () {
    return (-this.snapGrid[0]);
  }

  function maxTranslate () {
    return (-this.snapGrid[this.snapGrid.length - 1]);
  }

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
  };

  function setTransition (duration, byController) {
    var swiper = this;

    swiper.$wrapperEl.transition(duration);

    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var params = swiper.params;
    var previousIndex = swiper.previousIndex;
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }
      swiper.emit('slideChangeTransitionStart');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1 (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;
    swiper.animating = false;
    swiper.setTransition(0);

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }
      swiper.emit('slideChangeTransitionEnd');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1,
  };

  function slideTo (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) { slideIndex = 0; }

    var params = swiper.params;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var previousIndex = swiper.previousIndex;
    var activeIndex = swiper.activeIndex;
    var rtl = swiper.rtlTranslate;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex];

    // Update progress
    swiper.updateProgress(translate);

    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    }
    // Directions locks
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) { return false; }
      }
    }

    var direction;
    if (slideIndex > activeIndex) { direction = 'next'; }
    else if (slideIndex < activeIndex) { direction = 'prev'; }
    else { direction = 'reset'; }


    // Update Index
    if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      // Update Height
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }
      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }

    if (speed === 0 || !Support.transition) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var newIndex = index;
    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideNext (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slidePrev (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    var translate = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0) { return -Math.floor(Math.abs(val)); }
      return Math.floor(val);
    }
    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
    var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    var prevIndex;
    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideReset (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideToClosest (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var index = swiper.activeIndex;
    var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

    if (snapIndex < swiper.snapGrid.length - 1) {
      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if ((translate - currentSnap) > (nextSnap - currentSnap) / 2) {
        index = swiper.params.slidesPerGroup;
      }
    }

    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;

    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;
    if (params.loop) {
      if (swiper.animating) { return; }
      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      if (params.centeredSlides) {
        if (
          (slideToIndex < swiper.loopedSlides - (slidesPerView / 2))
          || (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
        ) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
            .eq(0)
            .index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
  };

  function loopCreate () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    // Remove duplicated slides
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

    var slides = $wrapperEl.children(("." + (params.slideClass)));

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
          $wrapperEl.append(blankNode);
        }
        slides = $wrapperEl.children(("." + (params.slideClass)));
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

    swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
    swiper.loopedSlides += params.loopAdditionalSlides;
    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index, el) {
      var slide = $(el);
      if (index < swiper.loopedSlides) { appendSlides.push(el); }
      if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
      slide.attr('data-swiper-slide-index', index);
    });
    for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
      $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
      $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix () {
    var swiper = this;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var slides = swiper.slides;
    var loopedSlides = swiper.loopedSlides;
    var allowSlidePrev = swiper.allowSlidePrev;
    var allowSlideNext = swiper.allowSlideNext;
    var snapGrid = swiper.snapGrid;
    var rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;

    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate();


    // Fix For Negative Oversliding
    if (activeIndex < loopedSlides) {
      newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex >= slides.length - loopedSlides)) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged$1 && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  }

  function loopDestroy () {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var slides = swiper.slides;
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + ",." + (params.slideClass) + "." + (params.slideBlankClass))).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy,
  };

  function setGrabCursor (moving) {
    var swiper = this;
    if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor () {
    var swiper = this;
    if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked)) { return; }
    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor,
  };

  function appendSlide (slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.append(slides[i]); }
      }
    } else {
      $wrapperEl.append(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide (slides) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }
    var newActiveIndex = activeIndex + 1;
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.prepend(slides[i]); }
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide (index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

    var slidesBuffer = [];
    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
      $wrapperEl.append(slidesBuffer[i$2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide (slidesIndexes) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
        if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides () {
    var swiper = this;

    var slidesIndexes = [];
    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
  };

  var Device = (function Device() {
    var ua = win.navigator.userAgent;

    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      windows: false,
      iphone: false,
      ipod: false,
      ipad: false,
      cordova: win.cordova || win.phonegap,
      phonegap: win.cordova || win.phonegap,
    };

    var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


    // Windows
    if (windows) {
      device.os = 'windows';
      device.osVersion = windows[2];
      device.windows = true;
    }
    // Android
    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }
    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }
    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }

    // Desktop
    device.desktop = !(device.os || device.android || device.webView);

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === 'ios') {
      var osVersionArr = device.osVersion.split('.');
      var metaViewport = doc.querySelector('meta[name="viewport"]');
      device.minimalUi = !device.webView
        && (ipod || iphone)
        && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7)
        && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    }

    // Pixel Ratio
    device.pixelRatio = win.devicePixelRatio || 1;

    // Export object
    return device;
  }());

  function onTouchStart (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    data.isTouchEvent = e.type === 'touchstart';
    if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
    if (!data.isTouchEvent && 'button' in e && e.button > 0) { return; }
    if (data.isTouched && data.isMoved) { return; }
    if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!$(e).closest(params.swipeHandler)[0]) { return; }
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY;

    // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (
      edgeSwipeDetection
      && ((startX <= edgeSwipeThreshold)
      || (startX >= win.screen.width - edgeSwipeThreshold))
    ) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined,
    });

    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) { data.allowThresholdMove = false; }
    if (e.type !== 'touchstart') {
      var preventDefault = true;
      if ($(e.target).is(data.formElements)) { preventDefault = false; }
      if (
        doc.activeElement
        && $(doc.activeElement).is(data.formElements)
        && doc.activeElement !== e.target
      ) {
        doc.activeElement.blur();
      }

      var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
      if (params.touchStartForcePreventDefault || shouldPreventDefault) {
        e.preventDefault();
      }
    }
    swiper.emit('touchStart', e);
  }

  function onTouchMove (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }
      return;
    }
    if (data.isTouchEvent && e.type === 'mousemove') { return; }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;
      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = Utils.now();
      }
      return;
    }
    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (
          (pageY < touches.startY && swiper.translate <= swiper.maxTranslate())
          || (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate())
        || (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    }
    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }
    if (e.targetTouches && e.targetTouches.length > 1) { return; }

    touches.currentX = pageX;
    touches.currentY = pageY;

    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt((Math.pow( diffX, 2 )) + (Math.pow( diffY, 2 ))) < swiper.params.threshold) { return; }

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;
      if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if ((diffX * diffX) + (diffY * diffY) >= 25) {
          touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    e.preventDefault();
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }
      data.allowMomentumBounce = false;
      // Grab Cursor
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit('sliderFirstMove', e);
    }
    swiper.emit('sliderMove', e);
    data.isMoved = true;

    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;

    diff *= params.touchRatio;
    if (rtl) { diff = -diff; }

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;

    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }

    // Directions locks
    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }


    // Threshold
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger) { return; }

    // Update active index in free mode
    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime,
        });
      }
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now(),
      });
    }
    // Update progress
    swiper.updateProgress(data.currentTranslate);
    // Update translate
    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd (event) {
    var swiper = this;
    var data = swiper.touchEventsData;

    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    // Return Grab Cursor
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }

    // Time diff
    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data.touchStartTime;

    // Tap, doubleTap, Click
    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap', e);
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
        if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
        data.clickTimeout = Utils.nextTick(function () {
          if (!swiper || swiper.destroyed) { return; }
          swiper.emit('click', e);
        }, 300);
      }
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
        if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
        swiper.emit('doubleTap', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) { swiper.allowClick = true; }
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;

    var currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();

          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          }
          // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.
          if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeModeMomentumVelocityRatio;

        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;

        var newPosition = swiper.translate + momentumDistance;
        if (rtl) { newPosition = -newPosition; }

        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (params.freeModeSticky) {
          var nextSlide;
          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        }
        // Fix duration
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
            swiper.emit('momentumBounce');

            swiper.setTransition(params.speed);
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      return;
    }

    // Find current slide
    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];
    for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
      if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
          stopIndex = i;
          groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    // Find current slide size
    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
      if (swiper.swipeDirection === 'prev') {
        if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + params.slidesPerGroup);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize () {
    var swiper = this;

    var params = swiper.params;
    var el = swiper.el;

    if (el && el.offsetWidth === 0) { return; }

    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Save locks
    var allowSlideNext = swiper.allowSlideNext;
    var allowSlidePrev = swiper.allowSlidePrev;
    var snapGrid = swiper.snapGrid;

    // Disable locks on resize
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;

    swiper.updateSize();
    swiper.updateSlides();

    if (params.freeMode) {
      var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      swiper.updateSlidesClasses();
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    }
    // Return locks after resize
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick (e) {
    var swiper = this;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) { e.preventDefault(); }
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function attachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    {
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);

    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
          target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.addEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
  }

  function detachEvents() {
    var swiper = this;

    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested;

    // Touch Events
    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
          target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }
        if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
          target.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      }
      // Prevent Links Clicks
      if (params.preventClicks || params.preventClicksPropagation) {
        target.removeEventListener('click', swiper.onClick, true);
      }
    }

    // Resize handler
    swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents,
  };

  function setBreakpoint () {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var initialized = swiper.initialized;
    var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
    var params = swiper.params;
    var breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }

    // Set breakpoint for window width and update parameters
    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
      if (breakpointOnlyParams) {
        ['slidesPerView', 'spaceBetween', 'slidesPerGroup'].forEach(function (param) {
          var paramValue = breakpointOnlyParams[param];
          if (typeof paramValue === 'undefined') { return; }
          if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
            breakpointOnlyParams[param] = 'auto';
          } else if (param === 'slidesPerView') {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      var breakpointParams = breakpointOnlyParams || swiper.originalParams;
      var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      Utils.extend(swiper.params, breakpointParams);

      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
      });

      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }
  }

  function getBreakpoint (breakpoints) {
    var swiper = this;
    // Get breakpoint for window width
    if (!breakpoints) { return undefined; }
    var breakpoint = false;
    var points = [];
    Object.keys(breakpoints).forEach(function (point) {
      points.push(point);
    });
    points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
    for (var i = 0; i < points.length; i += 1) {
      var point = points[i];
      if (swiper.params.breakpointsInverse) {
        if (point <= win.innerWidth) {
          breakpoint = point;
        }
      } else if (point >= win.innerWidth && !breakpoint) {
        breakpoint = point;
      }
    }
    return breakpoint || 'max';
  }

  var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

  function addClasses () {
    var swiper = this;
    var classNames = swiper.classNames;
    var params = swiper.params;
    var rtl = swiper.rtl;
    var $el = swiper.$el;
    var suffixes = [];

    suffixes.push('initialized');
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }
    if (!Support.flexbox) {
      suffixes.push('no-flexbox');
    }
    if (params.autoHeight) {
      suffixes.push('autoheight');
    }
    if (rtl) {
      suffixes.push('rtl');
    }
    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
    }
    if (Device.android) {
      suffixes.push('android');
    }
    if (Device.ios) {
      suffixes.push('ios');
    }
    // WP8 Touch Events Fix
    if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      suffixes.push(("wp8-" + (params.direction)));
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });

    $el.addClass(classNames.join(' '));
  }

  function removeClasses () {
    var swiper = this;
    var $el = swiper.$el;
    var classNames = swiper.classNames;

    $el.removeClass(classNames.join(' '));
  }

  var classes = { addClasses: addClasses, removeClasses: removeClasses };

  function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image;
    function onReady() {
      if (callback) { callback(); }
    }
    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;
        if (sizes) {
          image.sizes = sizes;
        }
        if (srcset) {
          image.srcset = srcset;
        }
        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages () {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');
    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
      if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) { swiper.update(); }
        swiper.emit('imagesReady');
      }
    }
    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(
        imageEl,
        imageEl.currentSrc || imageEl.getAttribute('src'),
        imageEl.srcset || imageEl.getAttribute('srcset'),
        imageEl.sizes || imageEl.getAttribute('sizes'),
        true,
        onReady
      );
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages,
  };

  function checkOverflow() {
    var swiper = this;
    var wasLocked = swiper.isLocked;

    swiper.isLocked = swiper.snapGrid.length === 1;
    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked;

    // events
    if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = { checkOverflow: checkOverflow };

  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    //
    preventInteractionOnTransition: false,

    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,

    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,

    // Autoheight
    autoHeight: false,

    // Set wrapper width
    setWrapperSize: false,

    // Virtual Translate
    virtualTranslate: false,

    // Effects
    effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

    // Breakpoints
    breakpoints: undefined,
    breakpointsInverse: false,

    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0, // in px
    slidesOffsetAfter: 0, // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,

    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,

    // Round length
    roundLengths: false,

    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,

    // Unique Navigation Elements
    uniqueNavElements: true,

    // Resistance
    resistance: true,
    resistanceRatio: 0.85,

    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,

    // Cursor
    grabCursor: false,

    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,

    // Images
    preloadImages: true,
    updateOnImagesReady: true,

    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,

    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,

    // Passive Listeners
    passiveListeners: true,

    // NS
    containerModifierClass: 'swiper-container-', // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',

    // Callbacks
    runCallbacksOnInit: true,
  };

  /* eslint no-param-reassign: "off" */

  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images,
  };

  var extendedDefaults = {};

  var Swiper = /*@__PURE__*/(function (SwiperClass) {
    function Swiper() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var el;
      var params;
      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        (assign = args, el = assign[0], params = assign[1]);
      }
      if (!params) { params = {}; }

      params = Utils.extend({}, params);
      if (el && !params.el) { params.el = el; }

      SwiperClass.call(this, params);

      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      });

      // Swiper Instance
      var swiper = this;
      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }
      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];
        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== 'object' || moduleParams === null) { return; }
          if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
          if (params[moduleParamName] === true) {
            params[moduleParamName] = { enabled: true };
          }
          if (
            typeof params[moduleParamName] === 'object'
            && !('enabled' in params[moduleParamName])
          ) {
            params[moduleParamName].enabled = true;
          }
          if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
        }
      });

      // Extend defaults with modules params
      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams);

      // Extend defaults with passed params
      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params);

      // Save Dom lib
      swiper.$ = $;

      // Find el
      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (index, containerEl) {
          var newParams = Utils.extend({}, params, { el: containerEl });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper);

      // Find Wrapper
      var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

      // Extend Swiper
      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],

        // Classes
        classNames: [],

        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',

        // Indexes
        activeIndex: 0,
        realIndex: 0,

        //
        isBeginning: true,
        isEnd: false,

        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,

        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,

        // Touch Events
        touchEvents: (function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];
          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          } else if (Support.prefixedPointerEvents) {
            desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
          }
          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2],
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }()),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined,
        },

        // Clicks
        allowClick: true,

        // Touches
        allowTouchMove: swiper.params.allowTouchMove,

        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },

        // Images
        imagesToLoad: [],
        imagesLoaded: 0,

      });

      // Install Modules
      swiper.useModules();

      // Init
      if (swiper.params.init) {
        swiper.init();
      }

      // Return app instance
      return swiper;
    }

    if ( SwiperClass ) Swiper.__proto__ = SwiperClass;
    Swiper.prototype = Object.create( SwiperClass && SwiperClass.prototype );
    Swiper.prototype.constructor = Swiper;

    var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };

    Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
      var swiper = this;
      var params = swiper.params;
      var slides = swiper.slides;
      var slidesGrid = swiper.slidesGrid;
      var swiperSize = swiper.size;
      var activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
        for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
          if (slides[i$1] && !breakLoop) {
            slideSize += slides[i$1].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
      } else {
        for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
          if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }
      return spv;
    };

    Swiper.prototype.update = function update () {
      var swiper = this;
      if (!swiper || swiper.destroyed) { return; }
      var snapGrid = swiper.snapGrid;
      var params = swiper.params;
      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated;
      if (swiper.params.freeMode) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    };

    Swiper.prototype.changeDirection = function changeDirection (newDirection, needUpdate) {
      if ( needUpdate === void 0 ) needUpdate = true;

      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if ((newDirection === currentDirection) || (newDirection !== 'horizontal' && newDirection !== 'vertical')) {
        return swiper;
      }

      swiper.$el
        .removeClass(("" + (swiper.params.containerModifierClass) + currentDirection + " wp8-" + currentDirection))
        .addClass(("" + (swiper.params.containerModifierClass) + newDirection));

      if ((Browser.isIE || Browser.isEdge) && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        swiper.$el.addClass(((swiper.params.containerModifierClass) + "wp8-" + newDirection));
      }

      swiper.params.direction = newDirection;

      swiper.slides.each(function (slideIndex, slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });

      swiper.emit('changeDirection');
      if (needUpdate) { swiper.update(); }

      return swiper;
    };

    Swiper.prototype.init = function init () {
      var swiper = this;
      if (swiper.initialized) { return; }

      swiper.emit('beforeInit');

      // Set breakpoint
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Add Classes
      swiper.addClasses();

      // Create loop
      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      // Update size
      swiper.updateSize();

      // Update slides
      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      // Set Grab Cursor
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      }

      // Slide To Initial Slide
      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      }

      // Attach events
      swiper.attachEvents();

      // Init Flag
      swiper.initialized = true;

      // Emit
      swiper.emit('init');
    };

    Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
      if ( deleteInstance === void 0 ) deleteInstance = true;
      if ( cleanStyles === void 0 ) cleanStyles = true;

      var swiper = this;
      var params = swiper.params;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy');

      // Init Flag
      swiper.initialized = false;

      // Detach events
      swiper.detachEvents();

      // Destroy loop
      if (params.loop) {
        swiper.loopDestroy();
      }

      // Cleanup styles
      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');
        if (slides && slides.length) {
          slides
            .removeClass([
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass ].join(' '))
            .removeAttr('style')
            .removeAttr('data-swiper-slide-index')
            .removeAttr('data-swiper-column')
            .removeAttr('data-swiper-row');
        }
      }

      swiper.emit('destroy');

      // Detach emitter events
      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }
      swiper.destroyed = true;

      return null;
    };

    Swiper.extendDefaults = function extendDefaults (newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    };

    staticAccessors.extendedDefaults.get = function () {
      return extendedDefaults;
    };

    staticAccessors.defaults.get = function () {
      return defaults;
    };

    staticAccessors.Class.get = function () {
      return SwiperClass;
    };

    staticAccessors.$.get = function () {
      return $;
    };

    Object.defineProperties( Swiper, staticAccessors );

    return Swiper;
  }(SwiperClass));

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device,
    },
    static: {
      device: Device,
    },
  };

  var Support$1 = {
    name: 'support',
    proto: {
      support: Support,
    },
    static: {
      support: Support,
    },
  };

  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser,
    },
    static: {
      browser: Browser,
    },
  };

  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('orientationchange');
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        // Emit resize
        win.addEventListener('resize', swiper.resize.resizeHandler);

        // Emit orientationchange
        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
    },
  };

  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target, options) {
      if ( options === void 0 ) options = {};

      var swiper = this;

      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }
        var observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (win.requestAnimationFrame) {
          win.requestAnimationFrame(observerUpdate);
        } else {
          win.setTimeout(observerUpdate, 0);
        }
      });

      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
      });

      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!Support.observer || !swiper.params.observer) { return; }
      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();
        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      }
      // Observe container
      swiper.observer.attach(swiper.$el[0], { childList: swiper.params.observeSlideChildren });

      // Observe wrapper
      swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    },
  };

  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false,
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: [],
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      },
    },
  };

  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var ref = swiper.params;
      var slidesPerView = ref.slidesPerView;
      var slidesPerGroup = ref.slidesPerGroup;
      var centeredSlides = ref.centeredSlides;
      var ref$1 = swiper.params.virtual;
      var addSlidesBefore = ref$1.addSlidesBefore;
      var addSlidesAfter = ref$1.addSlidesAfter;
      var ref$2 = swiper.virtual;
      var previousFrom = ref$2.from;
      var previousTo = ref$2.to;
      var slides = ref$2.slides;
      var previousSlidesGrid = ref$2.slidesGrid;
      var renderSlide = ref$2.renderSlide;
      var previousOffset = ref$2.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;

      var offsetProp;
      if (swiper.rtlTranslate) { offsetProp = 'right'; }
      else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

      var slidesAfter;
      var slidesBefore;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
        slidesBefore = slidesPerGroup + addSlidesAfter;
      }
      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid,
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, (offset + "px"));
        }
        swiper.updateProgress();
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: (function getSlides() {
            var slidesToRender = [];
            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }
            return slidesToRender;
          }()),
        });
        onRendered();
        return;
      }
      var prependIndexes = [];
      var appendIndexes = [];
      if (force) {
        swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
          }
        }
      }
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (i$1 >= from && i$1 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i$1);
          } else {
            if (i$1 > previousTo) { appendIndexes.push(i$1); }
            if (i$1 < previousFrom) { prependIndexes.push(i$1); }
          }
        }
      }
      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) { return b - a; }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }
      var $slideEl = params.renderSlide
        ? $(params.renderSlide.call(swiper, slide, index))
        : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
      if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
      if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
      return $slideEl;
    },
    appendSlide: function appendSlide(slides) {
      var swiper = this;
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.push(slides[i]); }
        }
      } else {
        swiper.virtual.slides.push(slides);
      }
      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slides) {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var newActiveIndex = activeIndex + 1;
      var numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.unshift(slides[i]); }
        }
        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }
      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cache[cachedIndex];
        });
        swiper.virtual.cache = newCache;
      }
      swiper.virtual.update(true);
      swiper.slideTo(newActiveIndex, 0);
    },
    removeSlide: function removeSlide(slidesIndexes) {
      var swiper = this;
      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) { return; }
      var activeIndex = swiper.activeIndex;
      if (Array.isArray(slidesIndexes)) {
        for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }
          if (slidesIndexes[i] < activeIndex) { activeIndex -= 1; }
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }
        if (slidesIndexes < activeIndex) { activeIndex -= 1; }
        activeIndex = Math.max(activeIndex, 0);
      }
      swiper.virtual.update(true);
      swiper.slideTo(activeIndex, 0);
    },
    removeAllSlides: function removeAllSlides() {
      var swiper = this;
      swiper.virtual.slides = [];
      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }
      swiper.virtual.update(true);
      swiper.slideTo(0, 0);
    },
  };

  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          removeSlide: Virtual.removeSlide.bind(swiper),
          removeAllSlides: Virtual.removeAllSlides.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {},
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
        var overwriteParams = {
          watchSlidesProgress: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        if (!swiper.params.initialSlide) {
          swiper.virtual.update();
        }
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.virtual.update();
      },
    },
  };

  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var kc = e.keyCode || e.charCode;
      // Directions locks
      if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40) || kc === 34)) {
        return false;
      }
      if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38) || kc === 33)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }
      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }
      if (swiper.params.keyboard.onlyInViewport && (kc === 33 || kc === 34 || kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
        var inView = false;
        // Check that swiper should be inside of visible area of window
        if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
          return undefined;
        }
        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();
        if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
        var swiperCoord = [
          [swiperOffset.left, swiperOffset.top],
          [swiperOffset.left + swiper.width, swiperOffset.top],
          [swiperOffset.left, swiperOffset.top + swiper.height],
          [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];
          if (
            point[0] >= 0 && point[0] <= windowWidth
            && point[1] >= 0 && point[1] <= windowHeight
          ) {
            inView = true;
          }
        }
        if (!inView) { return undefined; }
      }
      if (swiper.isHorizontal()) {
        if (kc === 33 || kc === 34 || kc === 37 || kc === 39) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (((kc === 34 || kc === 39) && !rtl) || ((kc === 33 || kc === 37) && rtl)) { swiper.slideNext(); }
        if (((kc === 33 || kc === 37) && !rtl) || ((kc === 34 || kc === 39) && rtl)) { swiper.slidePrev(); }
      } else {
        if (kc === 33 || kc === 34 || kc === 38 || kc === 40) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (kc === 34 || kc === 40) { swiper.slideNext(); }
        if (kc === 33 || kc === 38) { swiper.slidePrev(); }
      }
      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;
      if (swiper.keyboard.enabled) { return; }
      $(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;
      if (!swiper.keyboard.enabled) { return; }
      $(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    },
  };

  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      },
    },
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = eventName in doc;

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported
      && doc.implementation
      && doc.implementation.hasFeature
      // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      && doc.implementation.hasFeature('', '') !== true
    ) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }
  var Mousewheel = {
    lastScrollTime: Utils.now(),
    event: (function getEvent() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
      return isEventSupported() ? 'wheel' : 'mousewheel';
    }()),
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;

      var sX = 0;
      var sY = 0; // spinX, spinY
      var pX = 0;
      var pY = 0; // pixelX, pixelY

      // Legacy
      if ('detail' in e) {
        sY = e.detail;
      }
      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }
      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }
      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) { // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else { // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = (pX < 1) ? -1 : 1;
      }
      if (pY && !sY) {
        sY = (pY < 1) ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY,
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (!swiper.mouseEntered && !params.releaseOnEdges) { return true; }

      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;

      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
          else { return true; }
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
        else { return true; }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) { return true; }

      if (params.invert) { delta = -delta; }

      if (!swiper.params.freeMode) {
        if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              swiper.emit('scroll', e);
            } else if (params.releaseOnEdges) { return true; }
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) { return true; }
        }
        swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
      } else {
        // Freemode or scrollContainer:
        if (swiper.params.loop) {
          swiper.loopFix();
        }
        var position = swiper.getTranslate() + (delta * params.sensitivity);
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;

        if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
        if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeModeSticky) {
          clearTimeout(swiper.mousewheel.timeout);
          swiper.mousewheel.timeout = Utils.nextTick(function () {
            swiper.slideToClosest();
          }, 300);
        }
        // Emit event
        swiper.emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
        // Return page scroll on edge positions
        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
      }

      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      return false;
    },
    enable: function enable() {
      var swiper = this;
      if (!Mousewheel.event) { return false; }
      if (swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      if (!Mousewheel.event) { return false; }
      if (!swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.off(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    },
  };

  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          lastScrollTime: Utils.now(),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
      },
    },
  };

  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }
        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }
        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    onPrevClick: function onPrevClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop) { return; }
      swiper.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop) { return; }
      swiper.slideNext();
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) { return; }

      var $nextEl;
      var $prevEl;
      if (params.nextEl) {
        $nextEl = $(params.nextEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.nextEl === 'string'
          && $nextEl.length > 1
          && swiper.$el.find(params.nextEl).length === 1
        ) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }
      if (params.prevEl) {
        $prevEl = $(params.prevEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.prevEl === 'string'
          && $prevEl.length > 1
          && swiper.$el.find(params.prevEl).length === 1
        ) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', swiper.navigation.onNextClick);
      }
      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', swiper.navigation.onPrevClick);
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if ($nextEl && $nextEl.length) {
        $nextEl.off('click', swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }
      if ($prevEl && $prevEl.length) {
        $prevEl.off('click', swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    },
  };

  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,

        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper),
          onNextClick: Navigation.onNextClick.bind(swiper),
          onPrevClick: Navigation.onPrevClick.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;
        if (
          swiper.params.navigation.hideOnClick
          && !$(e.target).is($prevEl)
          && !$(e.target).is($nextEl)
        ) {
          var isHidden;
          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }
          if (isHidden === true) {
            swiper.emit('navigationShow', swiper);
          } else {
            swiper.emit('navigationHide', swiper);
          }
          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      },
    },
  };

  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      // Current/Total
      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
        if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
          current -= (slidesLength - (swiper.loopedSlides * 2));
        }
        if (current > total - 1) { current -= total; }
        if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      }
      // Types
      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;
        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
            if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }
          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
        if ($el.length > 1) {
          bullets.each(function (index, bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();
            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(((params.bulletActiveClass) + "-main"));
              }
              if (bulletIndex === firstIndex) {
                $bullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
              }
              if (bulletIndex === lastIndex) {
                $bullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          $bullet.addClass(params.bulletActiveClass);
          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);
            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
            }
            $firstDisplayedBullet
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev"))
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev-prev"));
            $lastDisplayedBullet
              .next()
              .addClass(((params.bulletActiveClass) + "-next"))
              .next()
              .addClass(((params.bulletActiveClass) + "-next-next"));
          }
        }
        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
        }
      }
      if (params.type === 'fraction') {
        $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
        $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
      }
      if (params.type === 'progressbar') {
        var progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
      }
      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }
      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

      var $el = swiper.pagination.$el;
      var paginationHTML = '';
      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
          }
        }
        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
      }
      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + (params.currentClass) + "\"></span>"
          + ' / '
          + "<span class=\"" + (params.totalClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el) { return; }

      var $el = $(params.el);
      if ($el.length === 0) { return; }

      if (
        swiper.params.uniqueNavElements
        && typeof params.el === 'string'
        && $el.length > 1
        && swiper.$el.find(params.el).length === 1
      ) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
        swiper.pagination.dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) { index += swiper.loopedSlides; }
          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var $el = swiper.pagination.$el;

      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
      if (params.clickable) {
        $el.off('click', ("." + (params.bulletClass)));
      }
    },
  };

  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function (number) { return number; },
        formatFractionTotal: function (number) { return number; },
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-', // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable', // NEW
        lockClass: 'swiper-pagination-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;
        if (
          swiper.params.pagination.el
          && swiper.params.pagination.hideOnClick
          && swiper.pagination.$el.length > 0
          && !$(e.target).hasClass(swiper.params.pagination.bulletClass)
        ) {
          var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);
          if (isHidden === true) {
            swiper.emit('paginationShow', swiper);
          } else {
            swiper.emit('paginationHide', swiper);
          }
          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      },
    },
  };

  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var progress = swiper.progress;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      var params = swiper.params.scrollbar;

      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        if (Support.transforms3d) {
          $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
        } else {
          $dragEl.transform(("translateX(" + newPos + "px)"));
        }
        $dragEl[0].style.width = newSize + "px";
      } else {
        if (Support.transforms3d) {
          $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
        } else {
          $dragEl.transform(("translateY(" + newPos + "px)"));
        }
        $dragEl[0].style.height = newSize + "px";
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;

      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;
      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }
      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }
      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize,
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    getPointerPosition: function getPointerPosition(e) {
      var swiper = this;
      if (swiper.isHorizontal()) {
        return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
      }
      return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var dragStartPos = scrollbar.dragStartPos;

      var positionRatio;
      positionRatio = ((scrollbar.getPointerPosition(e)) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top']
        - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      swiper.scrollbar.dragStartPos = (e.target === $dragEl[0] || e.target === $dragEl)
        ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
      e.preventDefault();
      e.stopPropagation();

      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);

      clearTimeout(swiper.scrollbar.dragTimeout);

      $el.transition(0);
      if (params.hide) {
        $el.css('opacity', 1);
      }
      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;

      if (!swiper.scrollbar.isTouched) { return; }
      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;

      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $el = scrollbar.$el;

      if (!swiper.scrollbar.isTouched) { return; }
      swiper.scrollbar.isTouched = false;
      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }
      swiper.emit('scrollbarDragEnd', e);
      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;

      var $el = $(params.el);
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
      if ($dragEl.length === 0) {
        $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0],
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    },
  };

  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          getPointerPosition: Scrollbar.getPointerPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      },
    },
  };

  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;

      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;

      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if ((x).indexOf('%') >= 0) {
        x = (parseInt(x, 10) * progress * rtlFactor) + "%";
      } else {
        x = (x * progress * rtlFactor) + "px";
      }
      if ((y).indexOf('%') >= 0) {
        y = (parseInt(y, 10) * progress) + "%";
      } else {
        y = (y * progress) + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
        $el[0].style.opacity = currentOpacity;
      }
      if (typeof scale === 'undefined' || scale === null) {
        $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
      } else {
        var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
        $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      var progress = swiper.progress;
      var snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, progress);
        });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
          .each(function (index, el) {
            swiper.parallax.setTransform(el, slideProgress);
          });
      });
    },
    setTransition: function setTransition(duration) {
      if ( duration === void 0 ) duration = this.params.speed;

      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
        .each(function (index, parallaxEl) {
          var $parallaxEl = $(parallaxEl);
          var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) { parallaxDuration = 0; }
          $parallaxEl.transition(parallaxDuration);
        });
    },
  };

  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTransition(duration);
      },
    },
  };

  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) { return 1; }
      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
      if (!Support.gestures) {
        if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest('.swiper-slide');
        if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }
      gesture.$imageEl.transition(0);
      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (Support.gestures) {
        zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
      }
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
      }
      gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }
        if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
          return;
        }
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;
      if (zoom.scale === 1) { gesture.$slideEl = undefined; }
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (image.isTouched) { return; }
      if (Device.android) { e.preventDefault(); }
      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) { return; }

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);
        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      }
      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;

      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (
          swiper.isHorizontal()
          && (
            (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x)
            || (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
          )
        ) {
          image.isTouched = false;
          return;
        } if (
          !swiper.isHorizontal()
          && (
            (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y)
            || (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
          )
        ) {
          image.isTouched = false;
          return;
        }
      }
      e.preventDefault();
      e.stopPropagation();

      image.isMoved = true;
      image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
      image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
      }
      if (image.currentX > image.maxX) {
        image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
      }

      if (image.currentY < image.minY) {
        image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
      }
      if (image.currentY > image.maxY) {
        image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
      }

      // Velocity
      if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
      if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
      if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();

      gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY;

      // Fix duration
      if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
      if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

      image.currentX = newPositionX;
      image.currentY = newPositionY;

      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

      gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');

        zoom.scale = 1;
        zoom.currentScale = 1;

        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function in$1(e) {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = (offsetX + (slideWidth / 2)) - touchX;
        diffY = (offsetY + (slideHeight / 2)) - touchY;

        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;

        translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
        translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;

        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
      gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    out: function out() {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
      gesture.$slideEl = undefined;
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (zoom.enabled) { return; }
      zoom.enabled = true;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (!zoom.enabled) { return; }

      swiper.zoom.enabled = false;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      }

      // Move image
      swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove);
    },
  };

  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed',
      },
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3,
        },
        image: {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {},
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined,
        },
      };

      ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom,
      });

      var scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get: function get() {
          return scale;
        },
        set: function set(value) {
          if (scale !== value) {
            var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
            var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
            swiper.emit('zoomChange', value, imageEl, slideEl);
          }
          scale = value;
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;
        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      },
    },
  };

  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

      var swiper = this;
      var params = swiper.params.lazy;
      if (typeof index === 'undefined') { return; }
      if (swiper.slides.length === 0) { return; }
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

      var $slideEl = isVirtual
        ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
        : swiper.slides.eq(index);

      var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }
      if ($images.length === 0) { return; }

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);

        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');

        swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
          if (background) {
            $imageEl.css('background-image', ("url(\"" + background + "\")"));
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }
            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }
            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find(("." + (params.preloaderClass))).remove();
          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }
          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        });

        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var swiperParams = swiper.params;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;

      var slidesPerView = swiperParams.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
            return true;
          }
        } else if (slides[index]) { return true; }
        return false;
      }
      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }
        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }
      if (params.loadPrevNext) {
        if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
          // Next Slides
          for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
            if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
          }
          // Prev Slides
          for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
            if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
          }
        } else {
          var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
          if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

          var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
          if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
        }
      }
    },
  };

  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,

        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;
        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      },
    },
  };

  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = (function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }());
      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1;
      // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.
      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) { return 0; }

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
      };
      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;
      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop
          ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid)
          : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(setTranslate$1, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;
      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c);
          // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out
          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }
        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i;
      function setControlledTransition(c) {
        c.setTransition(duration, swiper);
        if (duration !== 0) {
          c.transitionStart();
          if (c.params.autoHeight) {
            Utils.nextTick(function () {
              c.updateAutoHeight();
            });
          }
          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) { return; }
            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }
            c.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    },
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide', // or 'container'
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper),
        },
      });
    },
    on: {
      update: function update() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTransition(duration, byController);
      },
    },
  };

  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;
      if (e.keyCode !== 13) { return; }
      var $targetEl = $(e.target);
      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;
      if (notification.length === 0) { return; }
      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
        }
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;

      swiper.$el.append(swiper.a11y.liveRegion);

      // Navigation
      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
        },
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.destroy();
      },
    },
  };

  var History = {
    init: function init() {
      var swiper = this;
      if (!swiper.params.history) { return; }
      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();
      if (!history.paths.key && !history.paths.value) { return; }
      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return { key: key, value: value };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;
      if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));
      if (!win.location.pathname.includes(key)) {
        value = key + "/" + value;
      }
      var currentState = win.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        win.history.replaceState({ value: value }, null, value);
      } else {
        win.history.pushState({ value: value }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;
      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));
          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    },
  };

  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
    },
  };

  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
      if (newHash !== activeSlideHash) {
        var newIndex = swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index();
        if (typeof newIndex === 'undefined') { return; }
        swiper.slideTo(newIndex);
      }
    },
    setHash: function setHash() {
      var swiper = this;
      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        doc.location.hash = hash || '';
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');
      if (hash) {
        var speed = 0;
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');
          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }
      if (swiper.params.hashNavigation.watchState) {
        $(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.watchState) {
        $(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      },
    },
  };

  /* eslint no-underscore-dangle: "off" */

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;
      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }
      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      }, delay);
    },
    start: function start() {
      var swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
      if (swiper.autoplay.running) { return false; }
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;
      if (!swiper.autoplay.running) { return false; }
      if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }
      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;
      if (!swiper.autoplay.running) { return; }
      if (swiper.autoplay.paused) { return; }
      if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
      swiper.autoplay.paused = true;
      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    },
  };

  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),
          onTransitionEnd: function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;
            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
      },
    },
  };

  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;
        if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        var slideOpacity = swiper.params.fadeEffect.crossFade
          ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
          : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl
          .css({
            opacity: slideOpacity,
          })
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTransition(duration);
      },
    },
  };

  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var rtl = swiper.rtlTranslate;
      var swiperSize = swiper.size;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: (swiperWidth + "px") });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }
        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + (round * 4 * swiperSize);
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = (3 * swiperSize) + (swiperSize * 4 * round);
        }
        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
        if (progress <= 1 && progress > -1) {
          wrapperRotate = (slideIndex * 90) + (progress * 90);
          if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
        }
        $slideEl.transform(transform);
        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
      }
      $wrapperEl.css({
        '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
          var multiplier = 1.5 - (
            (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
            + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
          );
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
        }
      }
      var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
      $wrapperEl
        .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    },
  };

  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTransition(duration);
      },
    },
  };

  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
        $slideEl
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var $wrapperEl = swiper.$wrapperEl;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTransition(duration);
      },
    },
  };

  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth;
      // Each slide offset from center
      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        var translateZ = -translate * Math.abs(offsetMultiplier);

        var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) { translateX = 0; }
        if (Math.abs(translateY) < 0.001) { translateY = 0; }
        if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
        if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
        if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
          if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
        }
      }

      // Set correct perspective for IE10
      if (Support.pointerEvents || Support.prefixedPointerEvents) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + "px 50%";
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    },
  };

  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }

        swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTransition(duration);
      },
    },
  };

  var Thumbs = {
    init: function init() {
      var swiper = this;
      var ref = swiper.params;
      var thumbsParams = ref.thumbs;
      var SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Utils.extend(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        Utils.extend(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
      } else if (Utils.isObject(thumbsParams.swiper)) {
        swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        }));
        swiper.thumbs.swiperCreated = true;
      }
      swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }
      var clickedIndex = thumbsSwiper.clickedIndex;
      var clickedSlide = thumbsSwiper.clickedSlide;
      if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) { return; }
      if (typeof clickedIndex === 'undefined' || clickedIndex === null) { return; }
      var slideToIndex;
      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }
      if (swiper.params.loop) {
        var currentIndex = swiper.activeIndex;
        if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
          swiper.loopFix();
          // eslint-disable-next-line
          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }
        var prevIndex = swiper.slides.eq(currentIndex).prevAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        var nextIndex = swiper.slides.eq(currentIndex).nextAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        if (typeof prevIndex === 'undefined') { slideToIndex = nextIndex; }
        else if (typeof nextIndex === 'undefined') { slideToIndex = prevIndex; }
        else if (nextIndex - currentIndex < currentIndex - prevIndex) { slideToIndex = nextIndex; }
        else { slideToIndex = prevIndex; }
      }
      swiper.slideTo(slideToIndex);
    },
    update: function update(initial) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }

      var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto'
        ? thumbsSwiper.slidesPerViewDynamic()
        : thumbsSwiper.params.slidesPerView;

      if (swiper.realIndex !== thumbsSwiper.realIndex) {
        var currentThumbsIndex = thumbsSwiper.activeIndex;
        var newThumbsIndex;
        if (thumbsSwiper.params.loop) {
          if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
            thumbsSwiper.loopFix();
            // eslint-disable-next-line
            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          }
          // Find actual thumbs index to slide to
          var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          if (typeof prevThumbsIndex === 'undefined') { newThumbsIndex = nextThumbsIndex; }
          else if (typeof nextThumbsIndex === 'undefined') { newThumbsIndex = prevThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = currentThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = nextThumbsIndex; }
          else { newThumbsIndex = prevThumbsIndex; }
        } else {
          newThumbsIndex = swiper.realIndex;
        }
        if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      }

      // Activate thumbs
      var thumbsToActivate = 1;
      var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      thumbsSwiper.slides.removeClass(thumbActiveClass);
      if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual) {
        for (var i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]")).addClass(thumbActiveClass);
        }
      } else {
        for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
          thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
        }
      }
    },
  };
  var Thumbs$1 = {
    name: 'thumbs',
    params: {
      thumbs: {
        swiper: null,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-container-thumbs',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        thumbs: {
          swiper: null,
          init: Thumbs.init.bind(swiper),
          update: Thumbs.update.bind(swiper),
          onThumbClick: Thumbs.onThumbClick.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        var ref = swiper.params;
        var thumbs = ref.thumbs;
        if (!thumbs || !thumbs.swiper) { return; }
        swiper.thumbs.init();
        swiper.thumbs.update(true);
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      update: function update() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        thumbsSwiper.setTransition(duration);
      },
      beforeDestroy: function beforeDestroy() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        if (swiper.thumbs.swiperCreated && thumbsSwiper) {
          thumbsSwiper.destroy();
        }
      },
    },
  };

  // Swiper Class

  var components = [
    Device$1,
    Support$1,
    Browser$1,
    Resize,
    Observer$1,
    Virtual$1,
    Keyboard$1,
    Mousewheel$1,
    Navigation$1,
    Pagination$1,
    Scrollbar$1,
    Parallax$1,
    Zoom$1,
    Lazy$1,
    Controller$1,
    A11y,
    History$1,
    HashNavigation$1,
    Autoplay$1,
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    Thumbs$1
  ];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);

  return Swiper;

}));;
(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.gravotech_paragraph_component_contents_slider = {
    attach: function (context, settings) {
      $(".swiper-contents-slider", context).each(function(index) {
        var $this = $(this);
        $this.addClass("swiper-contents-slider-" + index);
        $this.find(".swiper-pagination").addClass("swiper-contents-slider-pagination-" + index);
        $this.find(".swiper-button-next").addClass("swiper-contents-slider-button-next-" + index);
        $this.find(".swiper-button-prev").addClass("swiper-contents-slider-button-prev-" + index);
        var swiper = new Swiper(".swiper-contents-slider-" + index, {
          effect: 'slide',
          direction: 'horizontal',
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20,
          watchOverflow: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,

          pagination: {
            el: '.swiper-contents-slider-pagination-'+ index,
            clickable: true
          },
          paginationType: "bullets",

          navigation: {
            nextEl: '.swiper-contents-slider-button-next-'+ index,
            prevEl: '.swiper-contents-slider-button-prev-'+ index,
          },

          breakpoints: {
            0: {
              slidesPerGroup: 1,
              slidesPerView: 1
            },
            768: {
              slidesPerGroup: 1,
              slidesPerView: 1
            },
            1010: {
              slidesPerGroup: 2,
              slidesPerView: 2
            }
          }
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.gravotech_node_product_teaser = {
    attach: function (context, settings) {
      // if product teaser images surpass a width of 400 make it fit the container
      let images = $('.card-img img', context);
      if (images.length > 1) {
        images.each(function (index) {
          if (images[index].naturalWidth >= 400) {
            $(this).css('object-fit', 'cover');
          }
        });
      } else if (images.length === 1 && images[0].naturalWidth >= 400) {
        images.css('object-fit', 'cover');
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
;
/*!
  * Bootstrap tab.js v4.6.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tab = factory(global.jQuery, global.Util));
})(this, (function ($, Util) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  var Util__default = /*#__PURE__*/_interopDefaultLegacy(Util);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Constants
   */

  var NAME = 'tab';
  var VERSION = '4.6.1';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_DISABLED = 'disabled';
  var CLASS_NAME_FADE = 'fade';
  var CLASS_NAME_SHOW = 'show';
  var EVENT_HIDE = "hide" + EVENT_KEY;
  var EVENT_HIDDEN = "hidden" + EVENT_KEY;
  var EVENT_SHOW = "show" + EVENT_KEY;
  var EVENT_SHOWN = "shown" + EVENT_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_UL = '> li > .active';
  var SELECTOR_DATA_TOGGLE = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
  /**
   * Class definition
   */

  var Tab = /*#__PURE__*/function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $__default["default"](this._element).hasClass(CLASS_NAME_ACTIVE) || $__default["default"](this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $__default["default"](this._element).closest(SELECTOR_NAV_LIST_GROUP)[0];
      var selector = Util__default["default"].getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = $__default["default"].makeArray($__default["default"](listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $__default["default"].Event(EVENT_HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $__default["default"].Event(EVENT_SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $__default["default"](previous).trigger(hideEvent);
      }

      $__default["default"](this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $__default["default"].Event(EVENT_HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $__default["default"].Event(EVENT_SHOWN, {
          relatedTarget: previous
        });
        $__default["default"](previous).trigger(hiddenEvent);
        $__default["default"](_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $__default["default"](container).find(SELECTOR_ACTIVE_UL) : $__default["default"](container).children(SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $__default["default"](active).hasClass(CLASS_NAME_FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util__default["default"].getTransitionDurationFromElement(active);
        $__default["default"](active).removeClass(CLASS_NAME_SHOW).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $__default["default"](active).removeClass(CLASS_NAME_ACTIVE);
        var dropdownChild = $__default["default"](active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $__default["default"](dropdownChild).removeClass(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $__default["default"](element).addClass(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util__default["default"].reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE)) {
        element.classList.add(CLASS_NAME_SHOW);
      }

      var parent = element.parentNode;

      if (parent && parent.nodeName === 'LI') {
        parent = parent.parentNode;
      }

      if (parent && $__default["default"](parent).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = $__default["default"](element).closest(SELECTOR_DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE));
          $__default["default"](dropdownToggleList).addClass(CLASS_NAME_ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $__default["default"](this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($__default["default"](this), 'show');
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Tab._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Tab;

  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;

}));

;
(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.gravotech_paragraph_component_associated_products = {
    attach: function (context, settings) {
      $(".swiper-associated-products", context).each(function(index) {
        var $this = $(this);
        $this.addClass("swiper-associated-products-" + index);
        $this.find(".swiper-pagination").addClass("swiper-pagination-" + index);
        $this.find(".swiper-button-next").addClass("swiper-button-next-" + index);
        $this.find(".swiper-button-prev").addClass("swiper-button-prev-" + index);
        var swiper = new Swiper(".swiper-associated-products-" + index, {
          effect: 'slide',
          direction: 'horizontal',
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          observer: true,
          observeParents: true,
          watchOverflow: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,

          pagination: {
            el: '.swiper-pagination-'+ index,
            clickable: true
          },
          paginationType: "bullets",

          navigation: {
            nextEl: '.swiper-button-next-'+ index,
            prevEl: '.swiper-button-prev-'+ index,
          },

          breakpoints: {
            1010: {
              slidesPerGroup: 1,
              slidesPerView: 1,
              spaceBetween: 20
            },
            1290: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 25
            }
          }
        });
      });
    }
  };
})(jQuery, Drupal, drupalSettings);

;

(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.gravotech_paragraph_component_push_content_tabs = {
    attach: function (context, settings) {
      $('.with-subtabs').each(function() {
        if ($(this).find('.nav-subtabs .nav-item').length > 6) {
          $(this).find('.subtabs-wrapper').addClass('with-slider');

          $('.subtabs-control.next', context).click(function(e) {
            e.preventDefault();
            $(this).parent().find('.nav-subtabs').animate({
              scrollLeft: "+=" + 300 + "px"
            }, "fast");
          });

          $('.subtabs-control.previous', context).click(function(e) {
            e.preventDefault();
            $(this).parent().find('.nav-subtabs').animate({
              scrollLeft: "-=" + 300 + "px"
            }, "fast");
          });
        }
      });

      $('.select-collapse').each(function() {
        $(this).parents('.select').find('.selectpicker').html(''+$(this).find('.select-collapse-option.active').text());
      });
      
      $('.select-collapse-option').click(function(e) {
        e.preventDefault();
        $(this).parents('.select').find('.selectpicker').html(''+$(this).text());
        $(this).parents('.select-collapse').collapse('hide');
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
/*jslint browser: true, evil: true */

var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    tarteaucitronForceCDN = (tarteaucitronForceCDN === undefined) ? '' : tarteaucitronForceCDN,
    cdn = (tarteaucitronForceCDN === '') ? path.split('/').slice(0, -1).join('/') + '/' : tarteaucitronForceCDN,
    alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
    tarteaucitronForceLanguage = (tarteaucitronForceLanguage === undefined) ? '' : tarteaucitronForceLanguage,
    tarteaucitronForceExpire = (tarteaucitronForceExpire === undefined) ? '' : tarteaucitronForceExpire,
    tarteaucitronCustomText = (tarteaucitronCustomText === undefined) ? '' : tarteaucitronCustomText,
    // tarteaucitronExpireInDay: true for day(s) value - false for hour(s) value
    tarteaucitronExpireInDay = (tarteaucitronExpireInDay === undefined || typeof tarteaucitronExpireInDay !== "boolean") ? true : tarteaucitronExpireInDay,
    timeExpire = 31536000000,
    tarteaucitronProLoadServices,
    tarteaucitronNoAdBlocker = false;



var tarteaucitron = {
    "version": 20210509,
    "cdn": cdn,
    "user": {},
    "lang": {},
    "services": {},
    "added": [],
    "idprocessed": [],
    "state": [],
    "launch": [],
    "parameters": {},
    "isAjax": false,
    "reloadThePage": false,
    "events": {
        "init": function () {},
        "load": function () {},
    },
    "init": function (params) {
        "use strict";
        var origOpen;

        tarteaucitron.parameters = params;
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener("load", function () {
                    tarteaucitron.initEvents.loadEvent(false);
                }, false);
                window.addEventListener("scroll", function () {
                    tarteaucitron.initEvents.scrollEvent();
                }, false);

                window.addEventListener("keydown", function (evt) {
                    tarteaucitron.initEvents.keydownEvent(false, evt);
                }, false);
                window.addEventListener("hashchange", function () {
                    tarteaucitron.initEvents.hashchangeEvent();
                }, false);
                window.addEventListener("resize", function () {
                    tarteaucitron.initEvents.resizeEvent();
                }, false);
            } else {
                window.attachEvent("onload", function () {
                    tarteaucitron.initEvents.loadEvent(true);
                });
                window.attachEvent("onscroll", function () {
                    tarteaucitron.initEvents.scrollEvent();
                });
                window.attachEvent("onkeydown", function (evt) {
                    tarteaucitron.initEvents.keydownEvent(true, evt);

                });
                window.attachEvent("onhashchange", function () {
                    tarteaucitron.initEvents.hashchangeEvent();
                });
                window.attachEvent("onresize", function () {
                    tarteaucitron.initEvents.resizeEvent();
                });
            }

            if (typeof XMLHttpRequest !== 'undefined') {
                origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {

                    if (window.addEventListener) {
                        this.addEventListener("load", function () {
                            if (typeof tarteaucitronProLoadServices === 'function') {
                                tarteaucitronProLoadServices();
                            }
                        }, false);
                    } else if (typeof this.attachEvent !== 'undefined') {
                        this.attachEvent("onload", function () {
                            if (typeof tarteaucitronProLoadServices === 'function') {
                                tarteaucitronProLoadServices();
                            }
                        });
                    } else {
                        if (typeof tarteaucitronProLoadServices === 'function') {
                            setTimeout(tarteaucitronProLoadServices, 1000);
                        }
                    }

                    try {
                        origOpen.apply(this, arguments);
                    } catch (err) {}
                };
            }
        }

        if(tarteaucitron.events.init) {
            tarteaucitron.events.init();
        }
    },
    "initEvents": {
        "loadEvent": function (isOldBrowser) {
            tarteaucitron.load();
            tarteaucitron.fallback(['tarteaucitronOpenPanel'], function (elem) {
                if (isOldBrowser) {
                    elem.attachEvent("onclick", function (event) {
                        tarteaucitron.userInterface.openPanel();
                        event.preventDefault();
                    });
                } else {
                    elem.addEventListener("click", function (event) {
                        tarteaucitron.userInterface.openPanel();
                        event.preventDefault();
                    }, false);
                }
            }, true);
        },
        "keydownEvent": function (isOldBrowser, evt) {
            if (evt.keyCode === 27) {
                tarteaucitron.userInterface.closePanel();
            }

            if (isOldBrowser) {
                if ( evt.keyCode === 9 && focusableEls.indexOf(evt.target) >= 0) {
                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            }
        },
        "hashchangeEvent": function () {
            if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
                tarteaucitron.userInterface.openPanel();
            }
        },
        "resizeEvent": function () {
            var tacElem = document.getElementById('tarteaucitron');
            var tacCookieContainer = document.getElementById('tarteaucitronCookiesListContainer');

            if (tacElem && tacElem.style.display === 'block') {
                tarteaucitron.userInterface.jsSizing('main');
            }

            if (tacCookieContainer && tacCookieContainer.style.display === 'block') {
                tarteaucitron.userInterface.jsSizing('cookie');
            }
        },
        "scrollEvent": function () {
            var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            var heightPosition;
            var tacPercentage = document.getElementById('tarteaucitronPercentage');
            var tacAlertBig = document.getElementById('tarteaucitronAlertBig');

            if (tacAlertBig && !tarteaucitron.highPrivacy) {
                if (tacAlertBig.style.display === 'block') {
                    heightPosition = tacAlertBig.offsetHeight + 'px';

                    if (scrollPos > (screen.height * 2)) {
                        tarteaucitron.userInterface.respondAll(true);
                    } else if (scrollPos > (screen.height / 2)) {
                        document.getElementById('tarteaucitronDisclaimerAlert').innerHTML = '<strong>' + tarteaucitron.lang.alertBigScroll + '</strong> ' + tarteaucitron.lang.alertBig;
                    }

                    if (tacPercentage) {
                        if (tarteaucitron.orientation === 'top') {
                            tacPercentage.style.top = heightPosition;
                        } else {
                            tacPercentage.style.bottom = heightPosition;
                        }
                        tacPercentage.style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                    }
                }
            }
        },
    },
    "load": function () {
        "use strict";
        var cdn = tarteaucitron.cdn,
            language = tarteaucitron.getLanguage(),
            useJSDelivrMinifiedJS = (cdn.indexOf('cdn.jsdelivr.net') >= 0),
            pathToLang = cdn + 'lang/tarteaucitron.' + language + (useJSDelivrMinifiedJS ? '.min' : '') + '.js?v=' + tarteaucitron.version,
            pathToServices = cdn + 'tarteaucitron.services' + (useJSDelivrMinifiedJS ? '.min' : '') + '.js?v=' + tarteaucitron.version,
            linkElement = document.createElement('link'),
            defaults = {
                "adblocker": false,
                "hashtag": '#tarteaucitron',
                "cookieName": 'tarteaucitron',
                "highPrivacy": true,
                "orientation": "middle",
                "bodyPosition": "bottom",
                "removeCredit": false,
                "showAlertSmall": false,
                "showIcon": true,
                "iconPosition": "BottomRight",
                "cookieslist": false,
                "handleBrowserDNTRequest": false,
                "DenyAllCta": true,
                "AcceptAllCta" : true,
                "moreInfoLink": true,
                "privacyUrl": "",
                "useExternalCss": false,
                "useExternalJs": false,
                "mandatory": true,
                "closePopup": false,
                "groupServices": false
            },
            params = tarteaucitron.parameters;

        // Don't show the middle bar if we are on the privacy policy or more page
        if (((tarteaucitron.parameters.readmoreLink !== undefined && window.location.href == tarteaucitron.parameters.readmoreLink) || window.location.href == tarteaucitron.parameters.privacyUrl) && tarteaucitron.parameters.orientation == "middle") {
            tarteaucitron.parameters.orientation = "bottom";
        }

        // Step -1
        if (typeof tarteaucitronCustomPremium !== 'undefined') {
            tarteaucitronCustomPremium();
        }

        // Step 0: get params
        if (params !== undefined) {

            for (var k in defaults) {
                if(!tarteaucitron.parameters.hasOwnProperty(k)) {
                    tarteaucitron.parameters[k] = defaults[k];
                }
            }
        }

        // global
        tarteaucitron.orientation = tarteaucitron.parameters.orientation;
        tarteaucitron.hashtag = tarteaucitron.parameters.hashtag;
        tarteaucitron.highPrivacy = tarteaucitron.parameters.highPrivacy;
        tarteaucitron.handleBrowserDNTRequest = tarteaucitron.parameters.handleBrowserDNTRequest;
        tarteaucitron.customCloserId = tarteaucitron.parameters.customCloserId;

        // Step 1: load css
        if ( !tarteaucitron.parameters.useExternalCss ) {
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href = cdn + 'css/tarteaucitron' + (useJSDelivrMinifiedJS ? '.min' : '') + '.css?v=' + tarteaucitron.version;
            document.getElementsByTagName('head')[0].appendChild(linkElement);
        }
        // Step 2: load language and services
        tarteaucitron.addInternalScript(pathToLang, '', function () {

          if(tarteaucitronCustomText !== ''){
            tarteaucitron.lang = tarteaucitron.AddOrUpdate(tarteaucitron.lang, tarteaucitronCustomText);
          }
            tarteaucitron.addInternalScript(pathToServices, '', function () {

                // css for the middle bar TODO: add it on the css file
                if (tarteaucitron.orientation === 'middle') {
                    var customThemeMiddle = document.createElement('style'),
                        cssRuleMiddle = 'div#tarteaucitronRoot.tarteaucitronBeforeVisible:before {content: \'\';position: fixed;width: 100%;height: 100%;background: white;top: 0;left: 0;z-index: 999;opacity: 0.5;}div#tarteaucitronAlertBig:before {content: \'' + tarteaucitron.lang.middleBarHead + '\';font-size: 35px;}body #tarteaucitronRoot div#tarteaucitronAlertBig {width: 60%;min-width: 285px;height: auto;margin: auto;left: 50%;top: 50%;transform: translate(-50%, -50%);box-shadow: 0 0 9000px #000;border-radius: 20px;padding: 35px 25px;}span#tarteaucitronDisclaimerAlert {padding: 0 30px;}#tarteaucitronRoot span#tarteaucitronDisclaimerAlert {margin: 10px 0 30px;display: block;text-align: center;font-size: 21px;}@media screen and (max-width: 900px) {div#tarteaucitronAlertBig button {margin: 0 auto 10px!important;display: block!important;}}';

                    customThemeMiddle.type = 'text/css';
                    if (customThemeMiddle.styleSheet) {
                        customThemeMiddle.styleSheet.cssText = cssRuleMiddle;
                    } else {
                        customThemeMiddle.appendChild(document.createTextNode(cssRuleMiddle));
                    }
                    document.getElementsByTagName('head')[0].appendChild(customThemeMiddle);
                }

                // css for the popup bar TODO: add it on the css file
                if (tarteaucitron.orientation === 'popup') {
                    var customThemePopup = document.createElement('style'),
                        cssRulePopup = 'div#tarteaucitronAlertBig:before {content: \'' + tarteaucitron.lang.middleBarHead + '\';font-size: 22px;}body #tarteaucitronRoot div#tarteaucitronAlertBig {bottom: 0;top: auto!important;left: 8px!important;right: auto!important;transform: initial!important;border-radius: 5px 5px 0 0!important;max-width: 250px!important;width: Calc(100% - 16px)!important;min-width: 0!important;padding: 25px 0;}span#tarteaucitronDisclaimerAlert {padding: 0 30px;font-size: 15px!important;}#tarteaucitronRoot span#tarteaucitronDisclaimerAlert {margin: 10px 0 30px;display: block;text-align: center;font-size: 21px;}div#tarteaucitronAlertBig button {margin: 0 auto 10px!important;display: block!important;width: Calc(100% - 60px);box-sizing: border-box;}';

                    customThemePopup.type = 'text/css';
                    if (customThemePopup.styleSheet) {
                        customThemePopup.styleSheet.cssText = cssRulePopup;
                    } else {
                        customThemePopup.appendChild(document.createTextNode(cssRulePopup));
                    }
                    document.getElementsByTagName('head')[0].appendChild(customThemePopup);
                }

                var body = document.body,
                    div = document.createElement('div'),
                    html = '',
                    index,
                    orientation = 'Top',
                    cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video', 'other'],
                    i;

                cat = cat.sort(function (a, b) {
                    if (tarteaucitron.lang[a].title > tarteaucitron.lang[b].title) { return 1; }
                    if (tarteaucitron.lang[a].title < tarteaucitron.lang[b].title) { return -1; }
                    return 0;
                });

                // Step 3: prepare the html
                html += '<div id="tarteaucitronPremium"></div>';
                if (tarteaucitron.reloadThePage) {
                    html += '<button type="button" id="tarteaucitronBack" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')"></button>';
                } else {
                    html += '<button type="button" id="tarteaucitronBack" aria-label="' + tarteaucitron.lang.close + '"></button>';
                }
                html += '<div id="tarteaucitron" role="dialog" aria-modal="true" aria-describedby="tarteaucitronInfo" aria-labelledby="dialogTitle" tabindex="-1">';
                if (tarteaucitron.reloadThePage) {
                    html += '   <button type="button" id="tarteaucitronClosePanel" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')">';
                } else {
                    html += '   <button type="button" id="tarteaucitronClosePanel">';
                }
                html += '       ' + tarteaucitron.lang.close;
                html += '   </button>';
                html += '   <div id="tarteaucitronServices">';
                html += '      <div class="tarteaucitronLine tarteaucitronMainLine" id="tarteaucitronMainLineOffset">';
                html += '         <span class="tarteaucitronH1" role="heading" aria-level="1" id="dialogTitle">'+ tarteaucitron.lang.title + '</span>';
                html += '         <div id="tarteaucitronInfo">';
                html += '         ' + tarteaucitron.lang.disclaimer;
                if (tarteaucitron.parameters.privacyUrl !== "") {
                    html += '   <br/><br/>';
                    html += '   <button type="button" id="tarteaucitronPrivacyUrlDialog" role="link">';
                    html += '       ' + tarteaucitron.lang.privacyUrl;
                    html += '   </button>';
                }
                html += '         </div>';
                html += '         <div class="tarteaucitronName">';
                html += '            <span class="tarteaucitronH2" role="heading" aria-level="2">' + tarteaucitron.lang.all + '</span>';
                html += '         </div>';
                html += '         <div class="tarteaucitronAsk" id="tarteaucitronScrollbarAdjust">';
                html += '            <button type="button" id="tarteaucitronAllAllowed" class="tarteaucitronAllow">';
                html += '               <span class="tarteaucitronCheck"></span> ' + tarteaucitron.lang.allowAll;
                html += '            </button> ';
                html += '            <button type="button" id="tarteaucitronAllDenied" class="tarteaucitronDeny">';
                html += '               <span class="tarteaucitronCross"></span> ' + tarteaucitron.lang.denyAll;
                html += '            </button>';
                html += '         </div>';
                html += '      </div>';
                html += '      <div class="tarteaucitronBorder">';
                html += '         <div class="clear"></div><ul>';


                if (tarteaucitron.parameters.mandatory == true) {
                   html += '<li id="tarteaucitronServicesTitle_mandatory">';
                   html += '<div class="tarteaucitronTitle">';
                   html += '   <button type="button" tabindex="-1"><span class="tarteaucitronPlus"></span> ' + tarteaucitron.lang.mandatoryTitle + '</button>';
                   html += '</div>';
                   html += '<ul id="tarteaucitronServices_mandatory">';
                   html += '<li class="tarteaucitronLine">';
                   html += '   <div class="tarteaucitronName">';
                   html += '       <span class="tarteaucitronH3" role="heading" aria-level="3">' + tarteaucitron.lang.mandatoryText + '</span>';
                   html += '       <span class="tarteaucitronListCookies"></span><br/>';
                   html += '   </div>';
                   html += '   <div class="tarteaucitronAsk">';
                   html += '       <button type="button" class="tarteaucitronAllow" tabindex="-1" disabled>';
                   html += '           <span class="tarteaucitronCheck"></span> ' + tarteaucitron.lang.allow;
                   html += '       </button> ';
                   html += '       <button type="button" class="tarteaucitronDeny" style="visibility:hidden" tabindex="-1">';
                   html += '           <span class="tarteaucitronCross"></span> ' + tarteaucitron.lang.deny;
                   html += '       </button> ';
                   html += '   </div>';
                   html += '</li>';
                   html += '</ul></li>';
                }

                for (i = 0; i < cat.length; i += 1) {
                    html += '         <li id="tarteaucitronServicesTitle_' + cat[i] + '" class="tarteaucitronHidden">';
                    html += '            <div class="tarteaucitronTitle">';
                    html += '               <button type="button" class="catToggleBtn" data-cat="tarteaucitronDetails' + cat[i] + '"><span class="tarteaucitronPlus"></span> ' + tarteaucitron.lang[cat[i]].title + '</button>';
                    html += '            </div>';
                    html += '            <div id="tarteaucitronDetails' + cat[i] + '" class="tarteaucitronDetails tarteaucitronInfoBox">';
                    html += '               ' + tarteaucitron.lang[cat[i]].details;
                    html += '            </div>';
                    html += '         <ul id="tarteaucitronServices_' + cat[i] + '"></ul></li>';
                }
                html += '             <li id="tarteaucitronNoServicesTitle" class="tarteaucitronLine">' + tarteaucitron.lang.noServices + '</li>';
                html += '         </ul>';
                html += '         <div class="tarteaucitronHidden tarteaucitron-spacer-20" id="tarteaucitronScrollbarChild"></div>';
                if (tarteaucitron.parameters.removeCredit === false) {
                    html += '     <a class="tarteaucitronSelfLink" href="https://tarteaucitron.io/" rel="nofollow noreferrer noopener" target="_blank" title="tarteaucitron ' + tarteaucitron.lang.newWindow + '"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAeCAYAAAAWwoEYAAADl0lEQVRoge1Y0W3bQAx9CjKARlC+9GVUmqDJBHEmiDyB6wkcTxBngtgTxJ0gzgQW4C/9aYOmE6g4lTQo+k6y3Rb94QOERNQd+cjj8XiGwWAwGAwGg8FgMBgMBoPB8F8RNRXe+whEKe7c36ZCAeCRxC9Rig2PUd8kPgAsoxSfQ3YAzAA8D/HwYYCb05kBKKO0teFkmbC1jlKsAnq/Abjn+QBqAIsoRS30ttwG/HNz1wH/XIxWTicLdvtW7xTAGEAMtP685CNsBTe2d/BLydfXAG57SEnMAST0zgYZSUCPk02bCvkJduIzuJzDLfPolbY+tLKmar+/8+IRePy4qdpE03qHuH8fipFb4N2+XdA3AJ/0vaQxt7s9FvkIS2XvtqnwM0rxpOQfbnE5G2LhTCmUO2fHIngOmcv+KG3HafDchB6ntwjYqenR2PqC7sOZ3E7FXHB0vqxoFyUyLh7OEH7LOGouvhhN3eIBeKXv0n5MsufdHqXcwYR5U2EbpV35lSspVPJmQj4TcgRK7jTg5IzmPUhhwM5a2WHUFCx+NgiDucmgh7idikLovHFlL0pxQ9xzX+IIP9Y6FrJsqhjlQpZRAkFVDCjZfcCHt6bqJDmuh5ylCWx0RVnk3oumaknqTH5sqrY0fBWyULaHUIgAgxb46MxV3DbieAhxOxUxjSuljig9lMQ/Bcfoi9BTEv9aLORSndVxYOH525sUDC6u2gWxcNzBNRxPanyh3ktKinOgy3WoxPbtUM0t6RkbQnzBnFPgi9GCOEubY9UffIryz9iKRe8s/FUfEWosJJGxagp85bpUO3VywQ46lOtAWfNxKwa4JXQ+628+bpxYGXXMzp5rXH401VEyXwIdowXFaKWSMFHvMTVmGnc+P3oXV2QOiBCfgex8QtcQCbcQE/H+eoHzrkFo1KM7zVO4jVVj5s6lRiWF7zyXyfRMc97J3tzj87mYqZ7E2YjzUct9GUi4tjHLR8dVkBLjQcuHFleWvQfRNEhFR7uX7pkctOwvZXsft7sAtyldEUIN2UTeLxnEfxKYswzdi88BdbZ8hifUoSMftQvP+muRwN6+Q3DeqqRExP9QmTtcheiHh0Ot1x2i2km1bP9pbufw5zZdyWsOrh7vQae5OZWbsMv30pi7cd/CKj3coPEVaCP4Zhx4eQWhOZ1Y9MTXGyP8/iGjEyfa1T4fO/4Lea9vBoPBYDAYDAaDwWAwGAwGwz8GgF8siXCCbrSRhgAAAABJRU5ErkJggg==" alt="tarteaucitron.io" /></a>';
                }
                html += '       </div>';
                html += '   </div>';
                html += '</div>';

                if (tarteaucitron.parameters.orientation === 'bottom') {
                    orientation = 'Bottom';
                }

                if (tarteaucitron.parameters.highPrivacy && !tarteaucitron.parameters.AcceptAllCta) {
                    html += '<div tabindex="-1" id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    //html += '<div class="tarteaucitronAlertBigWrapper">';
                    html += '   <span id="tarteaucitronDisclaimerAlert">';
                    html += '       ' + tarteaucitron.lang.alertBigPrivacy;
                    html += '   </span>';
                    //html += '   <span class="tarteaucitronAlertBigBtnWrapper">';
                    html += '   <button type="button" id="tarteaucitronPersonalize" aria-label="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </button>';

                    if (tarteaucitron.parameters.privacyUrl !== "") {
                        html += '   <button role="link" type="button" id="tarteaucitronPrivacyUrl">';
                        html += '       ' + tarteaucitron.lang.privacyUrl;
                        html += '   </button>';
                    }

                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                } else {
                    html += '<div tabindex="-1" id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + '">';
                    //html += '<div class="tarteaucitronAlertBigWrapper">';

                    if (tarteaucitron.parameters.DenyAllCta) {
                      html += '<div class="cancelTCw">';
                      if (tarteaucitron.reloadThePage) {
                        html += '   <button type="button" class="cancelTC tarteaucitronCTAButton tarteaucitronDeny" id="tarteaucitronAllDenied2" aria-label="' + tarteaucitron.lang.denyAll + ' (' + tarteaucitron.lang.reload + ')">';
                      } else {
                        html += '   <button type="button" class="cancelTC tarteaucitronCTAButton tarteaucitronDeny" id="tarteaucitronAllDenied2">';
                      }
                      html += '       <span class="tarteaucitronCross"></span> ' + tarteaucitron.lang.denyAll;
                      html += '   </button></div';
                      //html += '   <br/><br/>';
                    }

                    html += '   <span id="tarteaucitronDisclaimerAlert">';

                    if (tarteaucitron.parameters.highPrivacy) {
                        html += '<div class="TCPrivacy">' + tarteaucitron.lang.alertBigPrivacy + '</div>';
                    } else {
                        html += '       ' + tarteaucitron.lang.alertBigClick + ' ' + tarteaucitron.lang.alertBig;
                    }

                    html += '   </span><br><br><br>';

                    html += '   <button type="button" id="tarteaucitronCloseAlert" aria-label="' + tarteaucitron.lang.personalize + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.personalize;
                    html += '   </button>';

                    //html += '   <span class="tarteaucitronAlertBigBtnWrapper">';
                    html += '   <button type="button" class="tarteaucitronCTAButton tarteaucitronAllow" id="tarteaucitronPersonalize2">';
                    html += '       <span class="tarteaucitronCheck"></span> ' + tarteaucitron.lang.acceptAll;
                    html += '   </button>';

                    if (tarteaucitron.parameters.privacyUrl !== "") {
                        html += '   <button type="button" id="tarteaucitronPrivacyUrl" role="link">';
                        html += '       ' + tarteaucitron.lang.privacyUrl;
                        html += '   </button>';
                    }

                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                    html += '<div id="tarteaucitronPercentage"></div>';
                }

                if (tarteaucitron.parameters.showIcon === true) {
                    html += '<div id="tarteaucitronIcon" class="tarteaucitronIcon' + tarteaucitron.parameters.iconPosition + '">';
                    html += '   <button type="button" id="tarteaucitronManager">';
                    html += '       <img src="' + (tarteaucitron.parameters.iconSrc ? tarteaucitron.parameters.iconSrc : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAGA0lEQVRoge1a207bWBRdBtJwLYZhKDMVmlSK1LxNkPo+ZH6g8B6p5AuALwC+APoFoVLeoT8whPeRSt+CZKmZVu3AiIsRlEtCktGyjy8xzuXYhvahS0JJHJ/4rLP3XnuffcAPfGdQ7mM6jRLSAF4BxqsbewB2lRS2o35mpEQaJcwCyANIdLi1DGBNSWEzqmdHRqRRwjqAJclhtExOSUEP+/xIiDRKhhUWfL7ShTtBuJnqcw+/z4Ql0xNmMEwSSz4kuNIzSgpjSsqYJP/GeE185wYJroedRyiLNEpGLLzzrHSuk+83SgbxvOcyyRaDziWsRVZkSRDinpzPbwVGWIucuohsKynMS47fAQyls/BMSRmKJo3AFhG5wm2N1wF+Zs3zebbFfR0RxrXcJHQlgH+LMW616pR/WiIMEXfW3mtzXyeEGWsjKot8c4TOI98L+iKaR5PS6IUk88RLAO9F8UjrbYoYMOosNavpfmODIiwRXRR/G3ohaWVo1RU/c30jV8ab2mV8qVGzHWBOLyTLZiWs5Rolg/C3ySOi0tXP/k4aEwOwSBKPJs7Rp16ABJTe+p1xVX0It/owqqdDEMRoqd3RFxqDPh20Ig6VEPVC0i5RSCD+6wl6HlW7GksSlUMV11/GrUs5NasFLusDE9ELSVphXemtJwaT/8JyIRvxNNCfBmIiNdR04LII3DSrbe0yjqvyJF/ppptqVlt+MCLCEh/oOkPPP6N38Mb5cnQBGFsEqmXg5j3QMwoMzwGnr4HYbybBq13gZAOom/FO63zdf2qQArCsZrUN2TlJy69eSDKYV+6Q4MpP75ivHzPA53ngaBW4eGuSOt0A/lsGPmXMz0+3TFJcTfFbPfFbfnwlhON+iQhlWmA82CQ4ocQ7c6KcfL3DHuls0yT6Sx4YnLXJDCQOIRRv5yGIJBgP8Sdisj2qubpc5UGJmo+W49ifVmzL8HcpGhQPvZCUKiCliIhEN0tr2OCqHuSA8gwQ/92MkU7gxEmeVqGrTTgpxPXbUrtGWYus0I9thRIraagRQUIDf7Qn4yZhKRiFQIyhfMfUr3yblokVWSJ6k8xSnc7eNN/RjowfCYiFoDUFer1S3gW6JiJ8Nt30EMbEhU+vzSIztuRYjRLsR8IHLjlf7HZ+MrWWEXxNmbvapt4jGSqZRYSkGUetSNTPzHsui5YMQ2ajJUNks6mw4wT54Ok2ShnzzIPCUGshzawCRKy5FqvrTZe0RWzQGvw79m67XZjKmxJrLsICjtZa55gxXy+6F4sYsEtxTqhXdRTLC8ulSDaWoCLsolfN+8YUhOsJV709H7Cudr0LlVEtzqBcN+shEyThdR941OnAbF8pirKJqXyupTRTtQSReiVmXW1j7oBErB0d9xM2WEd5J9ZKYtuR4WKwwBSoORbpGrJ5ZI9lt71irJmGX1px0JYE26uNErawr2zfIcP4OHEKXm66PA3wjpCNEfpJunI4muifPjKvsFCkGjExTq63yxMJsZNMYF/J4HmDC5A3Yq36jy0ClePHVhwuu/b1HSFlEfHD5ZtD1bEK44Qu1mWys6tbWmZyPWckzlPTGiRw/XHCuk+q4Rek+mVrVL/UppwrdDEGNV2kpyuhccgc5Oxm9vWnn+19vJrVpLor0kTUrGacMplb1CfOFyTD4o9uNrHqr2Z+ZMSp1c2XcVSORnh9Q81q3k599ETgkNnjg0nGzi10K7rX+bZpHbrblPcY5A4Zxk2xcjzCvTpd9027Aa0QtouyyrKFRR6D/04DwkFGvHPXM3Qda/Jb4nPgI7hQLVM1q5HIBt2MzQNa57Z1DiiLAGa5Mi+O4Sz3Mpp6laPHO6InII3ITnX1QtI+EOX+m9ZxleOZ/j9PiuKoLi3aqXPuEoSye/Vhkm+LalbLtHhMS0R6zu7aZ3vP2jOjL7QVv4McxhcDnZIelAQibGIbULOapf3PuE1Vs9qeaOTdkVKr00gCQiw4NlBzDvf1Lxx+uP5r3Dgv5KQZRzWn+GRwz8jmDS8itUg7iB6vLuJCF5Uty4A9mVKkFR6MiJDachST/oHvHgD+B4SoUIitpF05AAAAAElFTkSuQmCC') + '" alt="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '" title="' + tarteaucitron.lang.icon + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '   </button>';
                    html += '</div>';
                }

                if (tarteaucitron.parameters.showAlertSmall === true) {
                    html += '<div id="tarteaucitronAlertSmall" class="tarteaucitronAlertSmall' + orientation + '">';
                    html += '   <button type="button" id="tarteaucitronManager" aria-label="' + tarteaucitron.lang.alertSmall + ' ' + tarteaucitron.lang.modalWindow + '">';
                    html += '       ' + tarteaucitron.lang.alertSmall;
                    html += '       <span id="tarteaucitronDot">';
                    html += '           <span id="tarteaucitronDotGreen"></span>';
                    html += '           <span id="tarteaucitronDotYellow"></span>';
                    html += '           <span id="tarteaucitronDotRed"></span>';
                    html += '       </span>';
                    if (tarteaucitron.parameters.cookieslist === true) {
                        html += '   </button><!-- @whitespace';
                        html += '   --><button type="button" id="tarteaucitronCookiesNumber">0</button>';
                        html += '   <div id="tarteaucitronCookiesListContainer">';
                        if (tarteaucitron.reloadThePage) {
                            html += '       <button type="button" id="tarteaucitronClosePanelCookie" aria-label="' + tarteaucitron.lang.close + ' (' + tarteaucitron.lang.reload + ')">';
                        } else {
                            html += '       <button type="button" id="tarteaucitronClosePanelCookie">';
                        }
                        html += '           ' + tarteaucitron.lang.close;
                        html += '       </button>';
                        html += '       <div class="tarteaucitronCookiesListMain" id="tarteaucitronCookiesTitle">';
                        html += '            <span class="tarteaucitronH2" role="heading" aria-level="2" id="tarteaucitronCookiesNumberBis">0 cookie</span>';
                        html += '       </div>';
                        html += '       <div id="tarteaucitronCookiesList"></div>';
                        html += '    </div>';
                    } else {
                        html += '   </div>';
                    }
                    html += '</div>';
                }

                tarteaucitron.addInternalScript(tarteaucitron.cdn + 'advertising' + (useJSDelivrMinifiedJS ? '.min' : '') + '.js?v=' + tarteaucitron.version, '', function () {
                    if (tarteaucitronNoAdBlocker === true || tarteaucitron.parameters.adblocker === false) {

                        // create a wrapper container at the same level than tarteaucitron so we can add an aria-hidden when tarteaucitron is opened
                        /*var wrapper = document.createElement('div');
                        wrapper.id = "tarteaucitronContentWrapper";

                        while (document.body.firstChild)
                        {
                            wrapper.appendChild(document.body.firstChild);
                        }

                        // Append the wrapper to the body
                        document.body.appendChild(wrapper);*/

                        div.id = 'tarteaucitronRoot';
                        if (tarteaucitron.parameters.bodyPosition === 'top') {
                            // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                            var bodyFirstChild = body.firstChild;
                            body.insertBefore(div, bodyFirstChild);
                        }
                        else {
                            // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                            body.appendChild(div, body);
                        }
                        div.innerHTML = html;

                        //ie compatibility
                        var tacRootAvailableEvent;
                        if(typeof(Event) === 'function') {
                            tacRootAvailableEvent = new Event("tac.root_available");
                        }else if (typeof(document.createEvent) === 'function'){
                            tacRootAvailableEvent = document.createEvent('Event');
                            tacRootAvailableEvent.initEvent("tac.root_available", true, true);
                        }
                        //end ie compatibility

                        if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacRootAvailableEvent);}

                        if (tarteaucitron.job !== undefined) {
                            tarteaucitron.job = tarteaucitron.cleanArray(tarteaucitron.job);
                            for (index = 0; index < tarteaucitron.job.length; index += 1) {
                                tarteaucitron.addService(tarteaucitron.job[index]);
                            }
                        } else {
                            tarteaucitron.job = [];
                        }

                        if (tarteaucitron.job.length === 0) {
                            tarteaucitron.userInterface.closeAlert();
                        }

                        tarteaucitron.isAjax = true;

                        tarteaucitron.job.push = function (id) {

                            // ie <9 hack
                            if (typeof tarteaucitron.job.indexOf === 'undefined') {
                                tarteaucitron.job.indexOf = function (obj, start) {
                                    var i,
                                        j = this.length;
                                    for (i = (start || 0); i < j; i += 1) {
                                        if (this[i] === obj) { return i; }
                                    }
                                    return -1;
                                };
                            }

                            if (tarteaucitron.job.indexOf(id) === -1) {
                                Array.prototype.push.call(this, id);
                            }
                            tarteaucitron.launch[id] = false;
                            tarteaucitron.addService(id);
                        };

                        if (document.location.hash === tarteaucitron.hashtag && tarteaucitron.hashtag !== '') {
                            tarteaucitron.userInterface.openPanel();
                        }

                        tarteaucitron.cookie.number();
                        setInterval(tarteaucitron.cookie.number, 60000);
                    }
                }, tarteaucitron.parameters.adblocker);

                if (tarteaucitron.parameters.adblocker === true) {
                    setTimeout(function () {
                        if (tarteaucitronNoAdBlocker === false) {
                            html = '<div id="tarteaucitronAlertBig" class="tarteaucitronAlertBig' + orientation + ' tarteaucitron-display-block" role="alert" aria-live="polite">';
                            html += '   <p id="tarteaucitronDisclaimerAlert">';
                            html += '       ' + tarteaucitron.lang.adblock + '<br/>';
                            html += '       <strong>' + tarteaucitron.lang.adblock_call + '</strong>';
                            html += '   </p>';
                            html += '   <button type="button" class="tarteaucitronCTAButton" id="tarteaucitronCTAButton">';
                            html += '       ' + tarteaucitron.lang.reload;
                            html += '   </button>';
                            html += '</div>';
                            html += '<div id="tarteaucitronPremium"></div>';

                            div.id = 'tarteaucitronRoot';
                            if (tarteaucitron.parameters.bodyPosition === 'top') {
                                // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                                var bodyFirstChild = body.firstChild;
                                body.insertBefore(div, bodyFirstChild);
                            }
                            else {
                                // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                                body.appendChild(div, body);
                            }
                            div.innerHTML = html;
                        }
                    }, 1500);
                }
                if(tarteaucitron.parameters.closePopup === true){
                    setTimeout(function() {
                        var closeElement = document.getElementById('tarteaucitronAlertBig'),
                            closeSpan = document.createElement('span');
                        if (closeElement) {
                            closeSpan.textContent = 'X';
                            closeSpan.setAttribute('id', "tarteaucitronCloseCross");
                            closeElement.insertBefore(closeSpan, closeElement.firstElementChild);
                        }
                    }, 100);
                }


                if(tarteaucitron.parameters.groupServices === true) {
                    var tac_group_style = document.createElement('style');
                    tac_group_style.innerHTML = '.tarteaucitronTitle{display:none}';
                    document.head.appendChild(tac_group_style);
                    var cats = document.querySelectorAll('[id^="tarteaucitronServicesTitle_"]')
                    Array.prototype.forEach.call(cats, function(item) {
                        var cat = item.getAttribute('id').replace(/^(tarteaucitronServicesTitle_)/, "");
                        if (cat !== "mandatory") {
                            var html = '';
                            html += '<li  class="tarteaucitronLine">';
                            html += '   <div class="tarteaucitronName">';
                            html += '       <span class="tarteaucitronH3" role="heading" aria-level="2">'+tarteaucitron.lang[cat].title+'</span>';
                            html += '       <span>'+tarteaucitron.lang[cat].details+'</span>';
                            html += '   <button type="button" aria-expanded="false" class="tarteaucitron-toggle-group" id="tarteaucitron-toggle-group-'+cat+'">'+tarteaucitron.lang.alertSmall+' ('+document.getElementById("tarteaucitronServices_"+cat).childElementCount+')</button>';
                            html += '   </div>';
                            html += '   <div class="tarteaucitronAsk" id="tarteaucitron-group-'+cat+'">';
                            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + tarteaucitron.lang[cat].title + '" class="tarteaucitronAllow" id="tarteaucitron-accept-group-'+cat+'">';
                            html += '           <span class="tarteaucitronCheck"></span> ' + tarteaucitron.lang.allow;
                            html += '       </button> ';
                            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + tarteaucitron.lang[cat].title + '" class="tarteaucitronDeny" id="tarteaucitron-reject-group-'+cat+'">';
                            html += '           <span class="tarteaucitronCross"></span> ' + tarteaucitron.lang.deny;
                            html += '       </button>';
                            html += '   </div>';
                            html += '</li>';
                            var ul = document.createElement('ul');
                            ul.innerHTML = html;
                            item.insertBefore(ul, item.querySelector('#tarteaucitronServices_'+cat+''));
                            document.querySelector('#tarteaucitronServices_' + cat).style.display = 'none';
                            tarteaucitron.addClickEventToId("tarteaucitron-toggle-group-" + cat, function () {
                                tarteaucitron.userInterface.toggle('tarteaucitronServices_' + cat);
                               if (document.getElementById('tarteaucitronServices_' + cat).style.display == 'block') {
                                    tarteaucitron.userInterface.addClass('tarteaucitronServicesTitle_' + cat, 'tarteaucitronIsExpanded');
                                    document.getElementById('tarteaucitron-toggle-group-'+cat).setAttribute('aria-expanded', 'true');
                                } else {
                                    tarteaucitron.userInterface.removeClass('tarteaucitronServicesTitle_' + cat, 'tarteaucitronIsExpanded');
                                    document.getElementById('tarteaucitron-toggle-group-'+cat).setAttribute('aria-expanded', 'false');
                                }
                            });
                            tarteaucitron.addClickEventToId("tarteaucitron-accept-group-" + cat, function () {
                                tarteaucitron.userInterface.respondAll(true, cat);
                            });
                            tarteaucitron.addClickEventToId("tarteaucitron-reject-group-" + cat, function () {
                                tarteaucitron.userInterface.respondAll(false, cat);
                            });
                        }
                    });
                }
                tarteaucitron.userInterface.color("", true);

                // add a little timeout to be sure everything is accessible
                setTimeout(function () {

                    // Setup events
                    tarteaucitron.addClickEventToId("tarteaucitronCloseCross", function () {
                        tarteaucitron.userInterface.closeAlert();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPersonalize", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPersonalize2", function () {
                        tarteaucitron.userInterface.respondAll(true);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronManager", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronBack", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronClosePanel", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronClosePanelCookie", function () {
                        tarteaucitron.userInterface.closePanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPrivacyUrl", function () {
                        document.location = tarteaucitron.parameters.privacyUrl;
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronPrivacyUrlDialog", function () {
                        document.location = tarteaucitron.parameters.privacyUrl;
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCookiesNumber", function () {
                        tarteaucitron.userInterface.toggleCookiesList();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllAllowed", function () {
                        tarteaucitron.userInterface.respondAll(true);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllDenied", function () {
                        tarteaucitron.userInterface.respondAll(false);
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronAllDenied2", function () {
                        tarteaucitron.userInterface.respondAll(false, '', true);
                        if (tarteaucitron.reloadThePage === true) {
                            window.location.reload();
                        }
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCloseAlert", function () {
                        tarteaucitron.userInterface.openPanel();
                    });
                    tarteaucitron.addClickEventToId("tarteaucitronCTAButton", function () {
                        location.reload();
                    });
                    var toggleBtns = document.getElementsByClassName("catToggleBtn"), i;
                    for (i = 0; i < toggleBtns.length; i++) {
                        toggleBtns[i].dataset.index = i;
                        tarteaucitron.addClickEventToElement(toggleBtns[i], function () {
                            tarteaucitron.userInterface.toggle('tarteaucitronDetails' + cat[this.dataset.index], 'tarteaucitronInfoBox');
                            return false;
                        });
                    }

                    var allowBtns = document.getElementsByClassName("tarteaucitronAllow");
                    for (i = 0; i < allowBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(allowBtns[i], function () {
                            tarteaucitron.userInterface.respond(this, true);
                        });
                    }
                    var denyBtns = document.getElementsByClassName("tarteaucitronDeny");
                    for (i = 0; i < denyBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(denyBtns[i], function () {
                            tarteaucitron.userInterface.respond(this, false);
                        });
                    }
                    if(tarteaucitron.events.load) {
                        tarteaucitron.events.load();
                    }
                }, 500);

            });
        });
    },
    "addService": function (serviceId) {
        "use strict";
        var html = '',
            s = tarteaucitron.services,
            service = s[serviceId],
            cookie = tarteaucitron.cookie.read(),
            hostname = document.location.hostname,
            hostRef = document.referrer.split('/')[2],
            isNavigating = (hostRef === hostname && window.location.href !== tarteaucitron.parameters.privacyUrl),
            isAutostart = (!service.needConsent),
            isWaiting = (cookie.indexOf(service.key + '=wait') >= 0),
            isDenied = (cookie.indexOf(service.key + '=false') >= 0),
            isAllowed = ((cookie.indexOf(service.key + '=true') >= 0) || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)),
            isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0),
            isDNTRequested = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1"),
            currentStatus = (isAllowed) ? tarteaucitron.lang.allowed : tarteaucitron.lang.disallowed;

        if (tarteaucitron.added[service.key] !== true) {
            tarteaucitron.added[service.key] = true;

            html += '<li id="' + service.key + 'Line" class="tarteaucitronLine">';
            html += '   <div class="tarteaucitronName">';
            html += '       <span class="tarteaucitronH3" role="heading" aria-level="3">' + service.name + '</span>';
            html += '       <span class="tacCurrentStatus" id="tacCurrentStatus' + service.key + '">'+currentStatus+'</span>';
            html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
            html += '       <span id="tacCL' + service.key + '" class="tarteaucitronListCookies"></span><br/>';
            if (tarteaucitron.parameters.moreInfoLink == true) {

                var link = 'https://tarteaucitron.io/service/' + service.key + '/';
                if (service.readmoreLink !== undefined && service.readmoreLink !== '') {
                    link = service.readmoreLink;
                }
                if (tarteaucitron.parameters.readmoreLink !== undefined && tarteaucitron.parameters.readmoreLink !== '') {
                    link = tarteaucitron.parameters.readmoreLink;
                }
                html += '       <a href="' + link + '" target="_blank" rel="noreferrer noopener nofollow" title="'+ tarteaucitron.lang.cookieDetail + ' ' + service.name + ' ' + tarteaucitron.lang.ourSite + ' ' + tarteaucitron.lang.newWindow +'" class="tarteaucitronReadmoreInfo">';
                html += '           ' + tarteaucitron.lang.more;
                html += '       </a>';
                html += '       <span class="tarteaucitronReadmoreSeparator"> - </span>';
                html += '       <a href="' + service.uri + '" target="_blank" rel="noreferrer noopener" title="' + tarteaucitron.lang.source + ' ' + service.name + ' ' + tarteaucitron.lang.newWindow + '" class="tarteaucitronReadmoreOfficial">';
                html += '           ' + tarteaucitron.lang.source;
                html += '       </a>';
            }

            html += '   </div>';
            html += '   <div class="tarteaucitronAsk">';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.allow + ' ' + service.name + '" id="' + service.key + 'Allowed" class="tarteaucitronAllow">';
            html += '           <span class="tarteaucitronCheck"></span> ' + tarteaucitron.lang.allow;
            html += '       </button> ';
            html += '       <button type="button" aria-label="' + tarteaucitron.lang.deny + ' ' + service.name + '" id="' + service.key + 'Denied" class="tarteaucitronDeny">';
            html += '           <span class="tarteaucitronCross"></span> ' + tarteaucitron.lang.deny;
            html += '       </button>';
            html += '   </div>';
            html += '</li>';

            tarteaucitron.userInterface.css('tarteaucitronServicesTitle_' + service.type, 'display', 'block');

            if (document.getElementById('tarteaucitronServices_' + service.type) !== null) {
                document.getElementById('tarteaucitronServices_' + service.type).innerHTML += html;
            }

            tarteaucitron.userInterface.css('tarteaucitronNoServicesTitle', 'display', 'none');

            tarteaucitron.userInterface.order(service.type);

            tarteaucitron.addClickEventToId(service.key + 'Allowed', function () {
                tarteaucitron.userInterface.respond(this, true);
            });

            tarteaucitron.addClickEventToId(service.key + 'Denied', function () {
                tarteaucitron.userInterface.respond(this, false);
            });
        }

        tarteaucitron.pro('!' + service.key + '=' + isAllowed);

        // allow by default for non EU
        if (isResponded === false && tarteaucitron.user.bypass === true) {
            isAllowed = true;
            tarteaucitron.cookie.create(service.key, true);
        }

        if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !tarteaucitron.highPrivacy) || isAllowed) {
            if (!isAllowed || (!service.needConsent && cookie.indexOf(service.key + '=false') < 0)) {
                tarteaucitron.cookie.create(service.key, true);
            }
            if (tarteaucitron.launch[service.key] !== true) {
                tarteaucitron.launch[service.key] = true;
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.js(); }
                tarteaucitron.sendEvent(service.key + '_loaded');
            }
            tarteaucitron.state[service.key] = true;
            tarteaucitron.userInterface.color(service.key, true);
        } else if (isDenied) {
            if (typeof service.fallback === 'function') {
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded && isDNTRequested && tarteaucitron.handleBrowserDNTRequest) {
            tarteaucitron.cookie.create(service.key, 'false');
            if (typeof service.fallback === 'function') {
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded) {
            tarteaucitron.cookie.create(service.key, 'wait');
            if (typeof service.fallback === 'function') {
                if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + service.key + "_") < 0) { service.fallback(); }
            }
            tarteaucitron.userInterface.color(service.key, 'wait');
            tarteaucitron.userInterface.openAlert();
        }

        tarteaucitron.cookie.checkCount(service.key);
        tarteaucitron.sendEvent(service.key + '_added')
    },
    "sendEvent" : function(event_key) {
        if(event_key !== undefined) {
            //ie compatibility
            var send_event_item;
            if(typeof(Event) === 'function') {
                send_event_item = new Event(event_key);
            }else if (typeof(document.createEvent) === 'function'){
                send_event_item = document.createEvent('Event');
                send_event_item.initEvent(event_key, true, true);
            }
            //end ie compatibility

            document.dispatchEvent(send_event_item);
        }
    },
    "cleanArray": function cleanArray(arr) {
        "use strict";
        var i,
            len = arr.length,
            out = [],
            obj = {},
            s = tarteaucitron.services;

        for (i = 0; i < len; i += 1) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = {};
                if (tarteaucitron.services[arr[i]] !== undefined) {
                    out.push(arr[i]);
                }
            }
        }

        out = out.sort(function (a, b) {
            if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
            if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
            return 0;
        });

        return out;
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            if (document.getElementById(id) !== null) {

                if (property == "display" && value == "none" && (id == "tarteaucitron" || id == "tarteaucitronBack" || id == "tarteaucitronAlertBig")) {
                    document.getElementById(id).style["opacity"] = "0";

                    setTimeout(function() {document.getElementById(id).style[property] = value;}, 200);
                } else {

                    document.getElementById(id).style[property] = value;

                    if (property == "display" && value == "block" && (id == "tarteaucitron" || id == "tarteaucitronAlertBig")) {
                        document.getElementById(id).style["opacity"] = "0";
                        setTimeout(function() {document.getElementById(id).style["opacity"] = "1";}, 1);
                    }

                    if (property == "display" && value == "block" && id == "tarteaucitronBack") {
                        document.getElementById(id).style["opacity"] = "0";
                        setTimeout(function() {document.getElementById(id).style["opacity"] = "0.7";}, 1);
                    }
                }
            }
        },
        "addClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null && document.getElementById(id).classList !== undefined) {
                document.getElementById(id).classList.add(className);
            }
        },
        "removeClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null && document.getElementById(id).classList !== undefined) {
                document.getElementById(id).classList.remove(className);
            }
        },
        "respondAll": function (status, type, allowSafeAnalytics) {
            "use strict";
            var s = tarteaucitron.services,
                service,
                key,
                index = 0;

            for (index = 0; index < tarteaucitron.job.length; index += 1) {

                if (typeof type !== 'undefined' && type !== '' && s[tarteaucitron.job[index]].type !== type) {
                    continue;
                }

                if (allowSafeAnalytics && typeof s[tarteaucitron.job[index]].safeanalytic !== "undefined" && s[tarteaucitron.job[index]].safeanalytic === true) {
                    continue;
                }

                service = s[tarteaucitron.job[index]];
                key = service.key;
                if (tarteaucitron.state[key] !== status) {
                    if (status === false && tarteaucitron.launch[key] === true) {
                        tarteaucitron.reloadThePage = true;
                        if (tarteaucitron.checkIfExist('tarteaucitronClosePanel')) {
                            var ariaCloseValue = document.getElementById('tarteaucitronClosePanel').textContent.trim() + ' (' + tarteaucitron.lang.reload + ')';
                            document.getElementById('tarteaucitronClosePanel').setAttribute("aria-label", ariaCloseValue);
                        }
                    }
                    if (tarteaucitron.launch[key] !== true && status === true) {

                        tarteaucitron.pro('!' + key + '=engage');

                        tarteaucitron.launch[key] = true;
                        if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + key + "_") < 0) { tarteaucitron.services[key].js(); }
                        tarteaucitron.sendEvent(key + '_loaded');
                    }
                    var itemStatusElem = document.getElementById('tacCurrentStatus'+key);
                    if(status == true){
                        itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
                    }else{
                        itemStatusElem.innerHTML = tarteaucitron.lang.disallowed;
                    }
                    tarteaucitron.state[key] = status;
                    tarteaucitron.cookie.create(key, status);
                    tarteaucitron.userInterface.color(key, status);
                }
            }
        },
        "respond": function (el, status) {
            "use strict";
            if (el.id === '') {
                return;
            }
            var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');

            if (key.substring(0, 13) === 'tarteaucitron' || key === '') {return;}

            // return if same state
            if (tarteaucitron.state[key] === status) {
                return;
            }

            if (status === false && tarteaucitron.launch[key] === true) {
                tarteaucitron.reloadThePage = true;
                if (tarteaucitron.checkIfExist('tarteaucitronClosePanel')) {
                    var ariaCloseValue = document.getElementById('tarteaucitronClosePanel').textContent.trim() + ' (' + tarteaucitron.lang.reload + ')';
                    document.getElementById('tarteaucitronClosePanel').setAttribute("aria-label", ariaCloseValue);
                }
            }

            // if not already launched... launch the service
            if (status === true) {
                if (tarteaucitron.launch[key] !== true) {

                    tarteaucitron.pro('!' + key + '=engage');

                    tarteaucitron.launch[key] = true;
                    if (typeof tarteaucitronMagic === 'undefined' || tarteaucitronMagic.indexOf("_" + key + "_") < 0) { tarteaucitron.services[key].js(); }
                    tarteaucitron.sendEvent(key + '_loaded');
                }
            }
            var itemStatusElem = document.getElementById('tacCurrentStatus'+key);
            if(status == true){
                itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
            }else{
                itemStatusElem.innerHTML = tarteaucitron.lang.disallowed;
            }
            tarteaucitron.state[key] = status;
            tarteaucitron.cookie.create(key, status);
            tarteaucitron.userInterface.color(key, status);
        },
        "color": function (key, status) {
            "use strict";
            var c = 'tarteaucitron',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = tarteaucitron.job.length,
                index,
                s = tarteaucitron.services;

            if (key !== "") {

            if (status === true) {
                tarteaucitron.userInterface.addClass(key + 'Line', 'tarteaucitronIsAllowed');
                tarteaucitron.userInterface.removeClass(key + 'Line', 'tarteaucitronIsDenied');
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'true');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'false');
            } else if (status === false) {
                tarteaucitron.userInterface.removeClass(key + 'Line', 'tarteaucitronIsAllowed');
                tarteaucitron.userInterface.addClass(key + 'Line', 'tarteaucitronIsDenied');
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'false');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'true');
            } else {
                document.getElementById(key + 'Allowed').setAttribute('aria-pressed', 'false');
                document.getElementById(key + 'Denied').setAttribute('aria-pressed', 'false');
            }

            // check if all services are allowed
            var sumToRemove = 0;
            for (index = 0; index < sum; index += 1) {

                if (typeof s[tarteaucitron.job[index]].safeanalytic !== "undefined" && s[tarteaucitron.job[index]].safeanalytic === true) {
                    sumToRemove += 1;
                    continue;
                }

                if (tarteaucitron.state[tarteaucitron.job[index]] === false) {
                    nbDenied += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === undefined) {
                    nbPending += 1;
                } else if (tarteaucitron.state[tarteaucitron.job[index]] === true) {
                    nbAllowed += 1;
                }
            }
            sum -= sumToRemove;

            tarteaucitron.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
            tarteaucitron.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
            tarteaucitron.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');

            if (nbDenied === 0 && nbPending === 0) {
                tarteaucitron.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');
                tarteaucitron.userInterface.addClass(c + 'AllAllowed', c + 'IsSelected');

                tarteaucitron.userInterface.addClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'false');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'true');

            } else if (nbAllowed === 0 && nbPending === 0) {
                tarteaucitron.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                tarteaucitron.userInterface.addClass(c + 'AllDenied', c + 'IsSelected');

                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.addClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'true');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'false');

            } else {
                tarteaucitron.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                tarteaucitron.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');

                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                tarteaucitron.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');

                document.getElementById(c + 'AllDenied').setAttribute('aria-pressed', 'false');
                document.getElementById(c + 'AllAllowed').setAttribute('aria-pressed', 'false');
            }

            // close the alert if all service have been reviewed
            if (nbPending === 0) {
                tarteaucitron.userInterface.closeAlert();
            }

            if (tarteaucitron.services[key].cookies.length > 0 && status === false) {
                tarteaucitron.cookie.purge(tarteaucitron.services[key].cookies);
            }

            if (status === true) {
                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = '...';
                }
                setTimeout(function () {
                    tarteaucitron.cookie.checkCount(key);
                }, 2500);
            } else {
                tarteaucitron.cookie.checkCount(key);
            }

            }

	    // groups
            var cats = document.querySelectorAll('[id^="tarteaucitronServicesTitle_"]')
            Array.prototype.forEach.call(cats, function(item) {
                var cat = item.getAttribute('id').replace(/^(tarteaucitronServicesTitle_)/, ""),
                    total = document.getElementById("tarteaucitronServices_"+cat).childElementCount;
                var doc = document.getElementById("tarteaucitronServices_"+cat),
                    groupdenied = 0,
                    groupallowed = 0;
                for (var ii = 0; ii < doc.children.length; ii++) {
                    if (doc.children[ii].className == "tarteaucitronLine tarteaucitronIsDenied") {
                        groupdenied++;
                    }
                    if (doc.children[ii].className == "tarteaucitronLine tarteaucitronIsAllowed") {
                        groupallowed++;
                    }
                }
                if (total === groupallowed) {
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.addClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'false');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'true');
                    }
                }
                if (total === groupdenied) {
                    tarteaucitron.userInterface.addClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'true');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'false');
                    }
                }
                if (total !== groupdenied && total !== groupallowed) {
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsDenied');
                    tarteaucitron.userInterface.removeClass('tarteaucitron-group-'+cat, 'tarteaucitronIsAllowed');

                    if (document.getElementById('tarteaucitron-reject-group-'+cat)) {
                        document.getElementById('tarteaucitron-reject-group-'+cat).setAttribute('aria-pressed', 'false');
                        document.getElementById('tarteaucitron-accept-group-'+cat).setAttribute('aria-pressed', 'false');
                    }
                }
                groupdenied = 0;
                groupallowed = 0;
            });

        },
        "openPanel": function () {
            "use strict";

            tarteaucitron.userInterface.css('tarteaucitron', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
            tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');

            document.getElementById('tarteaucitronClosePanel').focus();
            if (document.getElementsByTagName('body')[0].classList !== undefined) {
                document.getElementsByTagName('body')[0].classList.add('tarteaucitron-modal-open');
            }
            tarteaucitron.userInterface.focusTrap();
            tarteaucitron.userInterface.jsSizing('main');

            //ie compatibility
            var tacOpenPanelEvent;
            if(typeof(Event) === 'function') {
                tacOpenPanelEvent = new Event("tac.open_panel");
            }else if (typeof(document.createEvent) === 'function'){
                tacOpenPanelEvent = document.createEvent('Event');
                tacOpenPanelEvent.initEvent("tac.open_panel", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacOpenPanelEvent);}
        },
        "closePanel": function () {
            "use strict";

            if (document.location.hash === tarteaucitron.hashtag) {
                if (window.history) {
                    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
                } else {
                    document.location.hash = '';
                }
            }
            tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
            tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'display', 'none');

            tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
                elem.style.display = 'none';
            }, true);

            if (tarteaucitron.reloadThePage === true) {
                window.location.reload();
            } else {
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
            }
            if (tarteaucitron.checkIfExist('tarteaucitronCloseAlert')) {
                document.getElementById('tarteaucitronCloseAlert').focus();
            } else if (tarteaucitron.checkIfExist('tarteaucitronManager')) {
                document.getElementById('tarteaucitronManager').focus();
            } else if (tarteaucitron.customCloserId && tarteaucitron.checkIfExist(tarteaucitron.customCloserId)) {
                document.getElementById(tarteaucitron.customCloserId).focus();
            }
            if (document.getElementsByTagName('body')[0].classList !== undefined) {
                document.getElementsByTagName('body')[0].classList.remove('tarteaucitron-modal-open');
            }

            //ie compatibility
            var tacClosePanelEvent;
            if(typeof(Event) === 'function') {
                tacClosePanelEvent = new Event("tac.close_panel");
            }else if (typeof(document.createEvent) === 'function'){
                tacClosePanelEvent = document.createEvent('Event');
                tacClosePanelEvent.initEvent("tac.close_panel", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacClosePanelEvent);}
        },
        "focusTrap": function() {
            "use strict";

            var focusableEls,
                firstFocusableEl,
                lastFocusableEl,
                filtered;

            focusableEls = document.getElementById('tarteaucitron').querySelectorAll('a[href], button');
            filtered = [];

            // get only visible items
            for (var i = 0, max = focusableEls.length; i < max; i++) {
                if (focusableEls[i].offsetHeight > 0) {
                   filtered.push(focusableEls[i]);
                }
            }

            firstFocusableEl = filtered[0];
            lastFocusableEl = filtered[filtered.length - 1];

            //loop focus inside tarteaucitron
            document.getElementById('tarteaucitron').addEventListener("keydown", function (evt) {

                if ( evt.key === 'Tab' || evt.keyCode === 9 ) {

                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            })
        },
        "openAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'block');
            tarteaucitron.userInterface.addClass(c + 'Root',   'tarteaucitronBeforeVisible');

            //ie compatibility
            var tacOpenAlertEvent;
            if(typeof(Event) === 'function') {
                tacOpenAlertEvent = new Event("tac.open_alert");
            }else if (typeof(document.createEvent) === 'function'){
                tacOpenAlertEvent = document.createEvent('Event');
                tacOpenAlertEvent.initEvent("tac.open_alert", true, true);
            }
            //end ie compatibility

            if (document.getElementById('tarteaucitronAlertBig') !== null) {
                document.getElementById('tarteaucitronAlertBig').focus();
            }

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacOpenAlertEvent);}
        },
        "closeAlert": function () {
            "use strict";
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(c + 'Percentage', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertSmall', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertBig',   'display', 'none');
            tarteaucitron.userInterface.removeClass(c + 'Root',   'tarteaucitronBeforeVisible');
            tarteaucitron.userInterface.jsSizing('box');

            //ie compatibility
            var tacCloseAlertEvent;
            if(typeof(Event) === 'function') {
                tacCloseAlertEvent = new Event("tac.close_alert");
            }else if (typeof(document.createEvent) === 'function'){
                tacCloseAlertEvent = document.createEvent('Event');
                tacCloseAlertEvent.initEvent("tac.close_alert", true, true);
            }
            //end ie compatibility

            if (typeof(window.dispatchEvent) === 'function') {window.dispatchEvent(tacCloseAlertEvent);}
        },
        "toggleCookiesList": function () {
            "use strict";
            var div = document.getElementById('tarteaucitronCookiesListContainer');

            if (div === null) {
                return;
            }

            if (div.style.display !== 'block') {
                tarteaucitron.cookie.number();
                div.style.display = 'block';
                tarteaucitron.userInterface.jsSizing('cookie');
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'block');
                tarteaucitron.fallback(['tarteaucitronInfoBox'], function (elem) {
                    elem.style.display = 'none';
                }, true);
            } else {
                div.style.display = 'none';
                tarteaucitron.userInterface.css('tarteaucitron', 'display', 'none');
                tarteaucitron.userInterface.css('tarteaucitronBack', 'display', 'none');
            }
        },
        "toggle": function (id, closeClass) {
            "use strict";
            var div = document.getElementById(id);

            if (div === null) {
                return;
            }

            if (closeClass !== undefined) {
                tarteaucitron.fallback([closeClass], function (elem) {
                    if (elem.id !== id) {
                        elem.style.display = 'none';
                    }
                }, true);
            }

            if (div.style.display !== 'block') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        "order": function (id) {
            "use strict";
            var main = document.getElementById('tarteaucitronServices_' + id),
                allDivs,
                store = [],
                i;

            if (main === null) {
                return;
            }

            allDivs = main.childNodes;

            if (typeof Array.prototype.map === 'function' && typeof Enumerable === 'undefined') {
                Array.prototype.map.call(main.children, Object).sort(function (a, b) {
                //var mainChildren = Array.from(main.children);
                //mainChildren.sort(function (a, b) {
                    if (tarteaucitron.services[a.id.replace(/Line/g, '')].name > tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return 1; }
                    if (tarteaucitron.services[a.id.replace(/Line/g, '')].name < tarteaucitron.services[b.id.replace(/Line/g, '')].name) { return -1; }
                    return 0;
                }).forEach(function (element) {
                    main.appendChild(element);
                });
            }
        },
        "jsSizing": function (type) {
            "use strict";
            var scrollbarMarginRight = 10,
                scrollbarWidthParent,
                scrollbarWidthChild,
                servicesHeight,
                e = window,
                a = 'inner',
                windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                mainTop,
                mainHeight,
                closeButtonHeight,
                headerHeight,
                cookiesListHeight,
                cookiesCloseHeight,
                cookiesTitleHeight,
                paddingBox,
                alertSmallHeight,
                cookiesNumberHeight;

            if (type === 'box') {
                if (document.getElementById('tarteaucitronAlertSmall') !== null && document.getElementById('tarteaucitronCookiesNumber') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', '0px 10px');

                    // calculate
                    alertSmallHeight = document.getElementById('tarteaucitronAlertSmall').offsetHeight;
                    cookiesNumberHeight = document.getElementById('tarteaucitronCookiesNumber').offsetHeight;
                    paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitronCookiesNumber', 'padding', paddingBox + 'px 10px');
                }
            } else if (type === 'main') {

                // get the real window width for media query
                if (window.innerWidth === undefined) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                // height of the services list container
                if (document.getElementById('tarteaucitron') !== null && document.getElementById('tarteaucitronClosePanel') !== null && document.getElementById('tarteaucitronMainLineOffset') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'height', 'auto');

                    // calculate
                    mainHeight = document.getElementById('tarteaucitron').offsetHeight;
                    closeButtonHeight = document.getElementById('tarteaucitronClosePanel').offsetHeight;

                    // apply
                    servicesHeight = (mainHeight - closeButtonHeight + 2);
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'height', servicesHeight + 'px');
                    tarteaucitron.userInterface.css('tarteaucitronServices', 'overflow-x', 'auto');
                }

                // align the main allow/deny button depending on scrollbar width
                if (document.getElementById('tarteaucitronServices') !== null && document.getElementById('tarteaucitronScrollbarChild') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 479) {
                        //tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginLeft', '11px');
                    } else if (e[a + 'Width'] <= 767) {
                        scrollbarMarginRight = 12;
                    }

                    scrollbarWidthParent = document.getElementById('tarteaucitronServices').offsetWidth;
                    scrollbarWidthChild = document.getElementById('tarteaucitronScrollbarChild').offsetWidth;
                    //tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
                }

                // center the main panel
                if (document.getElementById('tarteaucitron') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 767) {
                        mainTop = 0;
                    } else {
                        mainTop = ((windowInnerHeight - document.getElementById('tarteaucitron').offsetHeight) / 2) - 21;
                    }

                    if (document.getElementById('tarteaucitronMainLineOffset') !== null) {
                        if (document.getElementById('tarteaucitron').offsetHeight < (windowInnerHeight / 2)) {
                            mainTop -= document.getElementById('tarteaucitronMainLineOffset').offsetHeight;
                        }
                    }

                    // correct
                    if (mainTop < 0) {
                        mainTop = 0;
                    }

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitron', 'top', mainTop + 'px');
                }


            } else if (type === 'cookie') {

                // put cookies list at bottom
                if (document.getElementById('tarteaucitronAlertSmall') !== null) {
                    tarteaucitron.userInterface.css('tarteaucitronCookiesListContainer', 'bottom', (document.getElementById('tarteaucitronAlertSmall').offsetHeight) + 'px');
                }

                // height of cookies list
                if (document.getElementById('tarteaucitronCookiesListContainer') !== null) {

                    // reset
                    tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', 'auto');

                    // calculate
                    cookiesListHeight = document.getElementById('tarteaucitronCookiesListContainer').offsetHeight;
                    cookiesCloseHeight = document.getElementById('tarteaucitronClosePanelCookie').offsetHeight;
                    cookiesTitleHeight = document.getElementById('tarteaucitronCookiesTitle').offsetHeight;

                    // apply
                    tarteaucitron.userInterface.css('tarteaucitronCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px');
                }
            }
        }
    },
    "cookie": {
        "owner": {},
        "create": function (key, status) {
            "use strict";

            if (tarteaucitronForceExpire !== '') {
                // The number of day(s)/hour(s) can't be higher than 1 year
                if ((tarteaucitronExpireInDay && tarteaucitronForceExpire < 365) || (!tarteaucitronExpireInDay && tarteaucitronForceExpire < 8760)) {
                    if (tarteaucitronExpireInDay) {
                        // Multiplication to tranform the number of days to milliseconds
                        timeExpire = tarteaucitronForceExpire * 86400000;
                    } else {
                        // Multiplication to tranform the number of hours to milliseconds
                        timeExpire = tarteaucitronForceExpire * 3600000;
                    }
                }
            }

            var d = new Date(),
                time = d.getTime(),
                expireTime = time + timeExpire, // 365 days
                regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                cookie = tarteaucitron.cookie.read().replace(regex, ""),
                value = tarteaucitron.parameters.cookieName + '=' + cookie + '!' + key + '=' + status,
                domain = (tarteaucitron.parameters.cookieDomain !== undefined && tarteaucitron.parameters.cookieDomain !== '') ? '; domain=' + tarteaucitron.parameters.cookieDomain : '',
                secure = location.protocol === 'https:' ? '; Secure' : '';

            d.setTime(expireTime);
            document.cookie = value + '; expires=' + d.toGMTString() + '; path=/' + domain + secure + '; samesite=lax';
        },
        "read": function () {
            "use strict";
            var nameEQ = tarteaucitron.parameters.cookieName + "=",
                ca = document.cookie.split(';'),
                i,
                c;

            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return '';
        },
        "purge": function (arr) {
            "use strict";
            var i;

            for (i = 0; i < arr.length; i += 1) {

                var rgxpCookie = new RegExp("^(.*;)?\\s*" + arr[i] + "\\s*=\\s*[^;]+(.*)?$");
                if (document.cookie.match(rgxpCookie)) {
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                    document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
                }
            }
        },
        "checkCount": function (key) {
            "use strict";
            var arr = tarteaucitron.services[key].cookies,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');

            if (status >= 0 && nb === 0) {
                html += tarteaucitron.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                        if (tarteaucitron.cookie.owner[arr[i]] === undefined) {
                            tarteaucitron.cookie.owner[arr[i]] = [];
                        }
                        if (tarteaucitron.cookie.crossIndexOf(tarteaucitron.cookie.owner[arr[i]], tarteaucitron.services[key].name) === false) {
                            tarteaucitron.cookie.owner[arr[i]].push(tarteaucitron.services[key].name);
                        }
                    }
                }

                if (nbCurrent > 0) {
                    html += tarteaucitron.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += tarteaucitron.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = tarteaucitron.lang.noCookie;
            } else {
                html += tarteaucitron.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }

            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        },
        "crossIndexOf": function (arr, match) {
            "use strict";
            var i;
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] === match) {
                    return true;
                }
            }
            return false;
        },
        "number": function () {
            "use strict";
            var cookies = document.cookie.split(';'),
                nb = (document.cookie !== '') ? cookies.length : 0,
                html = '',
                i,
                name,
                namea,
                nameb,
                c,
                d,
                s = (nb > 1) ? 's' : '',
                savedname,
                regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                regexedDomain = (tarteaucitron.cdn.match(regex) !== null) ? tarteaucitron.cdn.match(regex)[1] : tarteaucitron.cdn,
                host = (tarteaucitron.domain !== undefined) ? tarteaucitron.domain : regexedDomain;

            cookies = cookies.sort(function (a, b) {
                namea = a.split('=', 1).toString().replace(/ /g, '');
                nameb = b.split('=', 1).toString().replace(/ /g, '');
                c = (tarteaucitron.cookie.owner[namea] !== undefined) ? tarteaucitron.cookie.owner[namea] : '0';
                d = (tarteaucitron.cookie.owner[nameb] !== undefined) ? tarteaucitron.cookie.owner[nameb] : '0';
                if (c + a > d + b) { return 1; }
                if (c + a < d + b) { return -1; }
                return 0;
            });

            if (document.cookie !== '') {
                for (i = 0; i < nb; i += 1) {
                    name = cookies[i].split('=', 1).toString().replace(/ /g, '');
                    if (tarteaucitron.cookie.owner[name] !== undefined && tarteaucitron.cookie.owner[name].join(' // ') !== savedname) {
                        savedname = tarteaucitron.cookie.owner[name].join(' // ');
                        html += '<div class="tarteaucitronHidden">';
                        html += '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html += '        ' + tarteaucitron.cookie.owner[name].join(' // ');
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    } else if (tarteaucitron.cookie.owner[name] === undefined && host !== savedname) {
                        savedname = host;
                        html += '<div class="tarteaucitronHidden">';
                        html += '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html += '        ' + host;
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    }
                    html += '<li class="tarteaucitronCookiesListMain">';
                    html += '    <div class="tarteaucitronCookiesListLeft"><button type="button" class="purgeBtn" data-cookie="' + tarteaucitron.fixSelfXSS(cookies[i].split('=', 1)) + '"><strong>&times;</strong></button> <strong>' + tarteaucitron.fixSelfXSS(name) + '</strong>';
                    html += '    </div>';
                    html += '    <div class="tarteaucitronCookiesListRight">' + tarteaucitron.fixSelfXSS(cookies[i].split('=').slice(1).join('=')) + '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                html += '<div class="tarteaucitronCookiesListMain">';
                html += '    <div class="tarteaucitronCookiesListLeft"><strong>-</strong></div>';
                html += '    <div class="tarteaucitronCookiesListRight"></div>';
                html += '</div>';
            }

            html += '<div class="tarteaucitronHidden tarteaucitron-spacer-20"></div>';

            if (document.getElementById('tarteaucitronCookiesList') !== null) {
                document.getElementById('tarteaucitronCookiesList').innerHTML = html;
            }

            if (document.getElementById('tarteaucitronCookiesNumber') !== null) {
                document.getElementById('tarteaucitronCookiesNumber').innerHTML = nb;
            }

            if (document.getElementById('tarteaucitronCookiesNumberBis') !== null) {
                document.getElementById('tarteaucitronCookiesNumberBis').innerHTML = nb + ' cookie' + s;
            }

            var purgeBtns = document.getElementsByClassName("purgeBtn");
            for (i = 0; i < purgeBtns.length; i++) {
                tarteaucitron.addClickEventToElement(purgeBtns[i], function () {
                    tarteaucitron.cookie.purge([this.dataset.cookie]);
                    tarteaucitron.cookie.number();
                    tarteaucitron.userInterface.jsSizing('cookie');
                    return false;
                });
            }

            for (i = 0; i < tarteaucitron.job.length; i += 1) {
                tarteaucitron.cookie.checkCount(tarteaucitron.job[i]);
            }
        }
    },
    "fixSelfXSS": function(html) {
        return html.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    },
    "getLanguage": function () {
        "use strict";

        var availableLanguages = 'bg,ca,cn,cs,da,de,el,en,es,fi,fr,hu,it,ja,lt,lv,nl,no,oc,pl,pt,ro,ru,se,sk,sv,tr,vi,zh',
            defaultLanguage = 'en';

        if (tarteaucitronForceLanguage !== '') {
            if (availableLanguages.indexOf(tarteaucitronForceLanguage) !== -1) {
                return tarteaucitronForceLanguage;
            }
        }

        if (!navigator) { return 'en'; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (availableLanguages.indexOf(userLanguage) === -1) {
            return defaultLanguage;
        }
        return userLanguage;
    },
    "getLocale": function () {
        "use strict";
        if (!navigator) { return 'en_US'; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (userLanguage === 'fr') {
            return 'fr_FR';
        } else if (userLanguage === 'en') {
            return 'en_US';
        } else if (userLanguage === 'de') {
            return 'de_DE';
        } else if (userLanguage === 'es') {
            return 'es_ES';
        } else if (userLanguage === 'it') {
            return 'it_IT';
        } else if (userLanguage === 'pt') {
            return 'pt_PT';
        } else if (userLanguage === 'nl') {
            return 'nl_NL';
        } else if (userLanguage === 'el') {
            return 'el_EL';
        } else {
            return 'en_US';
        }
    },
    "addScript": function (url, id, callback, execute, attrName, attrVal, internal) {
        "use strict";
        var script,
            done = false;

        if (execute === false) {
            if (typeof callback === 'function') {
                callback();
            }
        } else {
            script = document.createElement('script');
            script.id = (id !== undefined) ? id : '';
            script.async = true;
            script.src = url;

            if (attrName !== undefined && attrVal !== undefined) {
                script.setAttribute(attrName, attrVal);
            }

            if (typeof callback === 'function') {
                if ( !tarteaucitron.parameters.useExternalJs || !internal ) {
                    script.onreadystatechange = script.onload = function () {
                        var state = script.readyState;
                        if (!done && (!state || /loaded|complete/.test(state))) {
                            done = true;
                            callback();
                        }
                    };
                } else {
                    callback();
                }
            }

            if ( !tarteaucitron.parameters.useExternalJs || !internal ) {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    "addInternalScript": function (url, id, callback, execute, attrName, attrVal) {
        tarteaucitron.addScript(url, id, callback, execute, attrName, attrVal, true);
    },
    "checkIfExist": function (elemId) {
        "use strict";
        return document.getElementById(elemId) !== null && document.getElementById(elemId).offsetWidth !== 0 && document.getElementById(elemId).offsetHeight !== 0;
    },
    "makeAsync": {
        "antiGhost": 0,
        "buffer": '',
        "init": function (url, id) {
            "use strict";
            var savedWrite = document.write,
                savedWriteln = document.writeln;

            document.write = function (content) {
                tarteaucitron.makeAsync.buffer += content;
            };
            document.writeln = function (content) {
                tarteaucitron.makeAsync.buffer += content.concat("\n");
            };

            setTimeout(function () {
                document.write = savedWrite;
                document.writeln = savedWriteln;
            }, 20000);

            tarteaucitron.makeAsync.getAndParse(url, id);
        },
        "getAndParse": function (url, id) {
            "use strict";
            if (tarteaucitron.makeAsync.antiGhost > 9) {
                tarteaucitron.makeAsync.antiGhost = 0;
                return;
            }
            tarteaucitron.makeAsync.antiGhost += 1;
            tarteaucitron.addInternalScript(url, '', function () {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).innerHTML += "<span class='tarteaucitron-display-none'>&nbsp;</span>" + tarteaucitron.makeAsync.buffer;
                    tarteaucitron.makeAsync.buffer = '';
                    tarteaucitron.makeAsync.execJS(id);
                }
            });
        },
        "execJS": function (id) {
            /* not strict because third party scripts may have errors */
            var i,
                scripts,
                childId,
                type;

            if (document.getElementById(id) === null) {
                return;
            }

            scripts = document.getElementById(id).getElementsByTagName('script');
            for (i = 0; i < scripts.length; i += 1) {
                type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
                if (type === '') {
                    type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
                }
                if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
                    childId = id + Math.floor(Math.random() * 99999999999);
                    document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
                    tarteaucitron.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
                } else if (type.indexOf('javascript') !== -1 || type === '') {
                    eval(scripts[i].innerHTML);
                }
            }
        }
    },
    "fallback": function (matchClass, content, noInner) {
        "use strict";
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if ((' ' + elems[i].className + ' ')
                            .indexOf(' ' + matchClass[index] + ' ') > -1) {
                        if (typeof content === 'function') {
                            if (noInner === true) {
                                content(elems[i]);
                            } else {
                                elems[i].innerHTML = content(elems[i]);
                            }
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    "engage": function (id) {
        "use strict";
        var html = '',
            r = Math.floor(Math.random() * 100000),
            engage = tarteaucitron.services[id].name + ' ' + tarteaucitron.lang.fallback;

        if (tarteaucitron.lang['engage-' + id] !== undefined) {
            engage = tarteaucitron.lang['engage-' + id];
        }

        html += '<div class="tac_activate tac_activate_' + id + '">';
        html += '   <div class="tac_float">';
        html += '      ' + engage;
        html += '      <button type="button" class="tarteaucitronAllow" id="Eng' + r + 'ed' + id + '">';
        html += '          <span class="tarteaucitronCheck"></span> ' + tarteaucitron.lang.allow;
        html += '       </button>';
        html += '   </div>';
        html += '</div>';

        return html;
    },
    "extend": function (a, b) {
        "use strict";
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    "proTemp": '',
    "proTimer": function () {
        "use strict";
        setTimeout(tarteaucitron.proPing, 500);
    },
    "pro": function (list) {
        "use strict";
        tarteaucitron.proTemp += list;
        clearTimeout(tarteaucitron.proTimer);
        tarteaucitron.proTimer = setTimeout(tarteaucitron.proPing, 500);
    },
    "proPing": function () {
        "use strict";
        if (tarteaucitron.uuid !== '' && tarteaucitron.uuid !== undefined && tarteaucitron.proTemp !== '' && tarteaucitronStatsEnabled) {
            var div = document.getElementById('tarteaucitronPremium'),
                timestamp = new Date().getTime(),
                url = 'https://tarteaucitron.io/log/?';

            if (div === null) {
                return;
            }

            url += 'account=' + tarteaucitron.uuid + '&';
            url += 'domain=' + tarteaucitron.domain + '&';
            url += 'status=' + encodeURIComponent(tarteaucitron.proTemp) + '&';
            url += '_time=' + timestamp;

            div.innerHTML = '<img src="' + url + '" class="tarteaucitron-display-none" alt="" />';

            tarteaucitron.proTemp = '';
        }

        tarteaucitron.cookie.number();
    },
    "AddOrUpdate" : function(source, custom){
        /**
         Utility function to Add or update the fields of obj1 with the ones in obj2
         */
        for(var key in custom){
            if(custom[key] instanceof Object){
                source[key] = tarteaucitron.AddOrUpdate(source[key], custom[key]);
            }else{
                source[key] = custom[key];
            }
        }
        return source;
    },
    "getElemWidth": function(elem) {
        return elem.getAttribute('width') || elem.clientWidth;
    },
    "getElemHeight": function(elem) {
        return elem.getAttribute('height') || elem.clientHeight;
    },
    "getElemAttr": function (elem, attr) {
        return elem.getAttribute('data-' + attr) || elem.getAttribute(attr);
    },
    "addClickEventToId": function (elemId, func) {
        tarteaucitron.addClickEventToElement(document.getElementById(elemId), func);
    },
    "addClickEventToElement": function (e, func) {
        if (e) {
            if (e.addEventListener) {
                e.addEventListener("click", func);
            } else {
                e.attachEvent("onclick", func);
            }
        }
    },
    "triggerJobsAfterAjaxCall": function() {
        tarteaucitron.job.forEach(function(e) { tarteaucitron.job.push(e) });
        var i;
        var allowBtns = document.getElementsByClassName("tarteaucitronAllow");
        for (i = 0; i < allowBtns.length; i++) {
            tarteaucitron.addClickEventToElement(allowBtns[i], function () {
                tarteaucitron.userInterface.respond(this, true);
            });
        }
        var denyBtns = document.getElementsByClassName("tarteaucitronDeny");
        for (i = 0; i < denyBtns.length; i++) {
            tarteaucitron.addClickEventToElement(denyBtns[i], function () {
                tarteaucitron.userInterface.respond(this, false);
            });
        }
    }
};
;
/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// generic iframe
tarteaucitron.services.iframe = {
    "key": "iframe",
    "type": "other",
    "name": "Web content",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_iframe'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title")),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                allowfullscreen = x.getAttribute("allowfullscreen"),
                url = x.getAttribute("data-url");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'iframe';
        tarteaucitron.fallback(['tac_iframe'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// pinterestpixel
tarteaucitron.services.pinterestpixel = {
    "key": "pinterestpixel",
    "type": "ads",
    "name": "Pinterest Pixel",
    "uri": "https://help.pinterest.com/fr/business/article/track-conversions-with-pinterest-tag",
    "needConsent": true,
    "cookies": ['_pinterest_sess', '_pinterest_ct', '_pinterest_ct_mw', '_pinterest_ct_rt', '_epik', '_derived_epik', '_pin_unauth', '_pinterest_ct_ua'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pinterestpixelId === undefined) {
            return;
        }

        if (!window.pintrk) {
            window.pintrk = function () {
                window.pintrk.queue.push(Array.prototype.slice.call(arguments));
            };

            var n = window.pintrk;
            n.queue = [];
            n.version = "3.0";

            tarteaucitron.addScript('https://s.pinimg.com/ct/core.js', '', function () {
                window.pintrk('load', tarteaucitron.user.pinterestpixelId);
                window.pintrk('page');
            });
        }
    }
};

// elfsight
tarteaucitron.services.elfsight = {
    "key": "elfsight",
    "type": "support",
    "name": "Elfsight",
    "uri": "https://elfsight.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', '_p_hfp_client_id', 'session_id'],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://apps.elfsight.com/p/platform.js');
    }
};

// plezi
tarteaucitron.services.plezi = {
    "key": "plezi",
    "type": "analytic",
    "name": "Plezi",
    "uri": "https://www.plezi.co/fr/mentions-legales/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pleziTenant === undefined || tarteaucitron.user.pleziTw === undefined) {
            return;
        }

        tarteaucitron.addScript('https://app.plezi.co/scripts/ossleads_analytics.js?tenant=' + tarteaucitron.user.pleziTenant + '&tw=' + tarteaucitron.user.pleziTw);
    }
};


// smartsupp
tarteaucitron.services.smartsupp = {
    "key": "smartsupp",
    "type": "support",
    "name": "Smartsupp",
    "uri": "https://www.smartsupp.com/help/privacy/",
    "needConsent": true,
    "cookies": ['ssupp.vid', 'ssupp.visits', 'AWSALB', 'AWSALBCORS'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.smartsuppKey === undefined) {
            return;
        }

        window._smartsupp = window._smartsupp || {};
        window._smartsupp.key = tarteaucitron.user.smartsuppKey;
        window.smartsupp = function () {
            window.smartsupp._.push(arguments)
        };
        window.smartsupp._ = [];

        tarteaucitron.addScript('https://www.smartsuppchat.com/loader.js');
    }
};



// sharpspring
tarteaucitron.services.sharpspring = {
    "key": "sharpspring",
    "type": "analytic",
    "name": "SharpSpring",
    "uri": "https://sharpspring.com/legal/sharpspring-cookie-policy/",
    "needConsent": true,
    "cookies": ['koitk', '__ss', '__ss_tk', '__ss_referrer'],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.ssId === undefined || tarteaucitron.user.ssAccount === undefined) {
            return;
        }

        window._ss = window._ss || [];
        window._ss.push(['_setDomain', 'https://' + tarteaucitron.user.ssId + '.marketingautomation.services/net']);
        window._ss.push(['_setAccount', tarteaucitron.user.ssAccount]);
        window._ss.push(['_trackPageView']);

        window._pa = window._pa || {};

        tarteaucitron.addScript('https://' + tarteaucitron.user.ssId + '.marketingautomation.services/client/ss.js');
    }
};

// pardot
tarteaucitron.services.pardot = {
    "key": "pardot",
    "type": "analytic",
    "name": "Pardot",
    "uri": "https://www.salesforce.com/company/privacy/full_privacy/",
    "needConsent": true,
    "cookies": ['visitor_id'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.piAId === undefined || tarteaucitron.user.piCId === undefined) {
            return;
        }

        window.piAId = tarteaucitron.user.piAId;
        window.piCId = tarteaucitron.user.piCId;
        window.piHostname = 'pi.pardot.com';

        tarteaucitron.addScript('https://pi.pardot.com/pd.js');
    }
};

// Open Web Analytics
tarteaucitron.services.openwebanalytics = {
    "key": "openwebanalytics",
    "type": "analytic",
    "name": "Open Web Analytics",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.openwebanalyticsId === undefined || tarteaucitron.user.openwebanalyticsHost === undefined) {
            return;
        }

        window.owa_baseUrl = tarteaucitron.user.openwebanalyticsHost;
        window.owa_cmds = window.owa_cmds || [];
        window.owa_cmds.push(['setSiteId', tarteaucitron.user.openwebanalyticsId]);
        window.owa_cmds.push(['trackPageView']);
        window.owa_cmds.push(['trackClicks']);

        tarteaucitron.addScript(window.owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js');
    }
};

// xandr universal pixel
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/universal-pixel-overview.html
tarteaucitron.services.xandr = {
    "key": "xandr",
    "type": "ads",
    "name": "Xandr (Universal)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xandrId === undefined) {
            return;
        }

        if (!window.pixie) {
            var n = window.pixie = function (e, i, a) {
                n.actionQueue.push({
                    action: e,
                    actionValue: i,
                    params: a
                })
            };
            n.actionQueue = [];
        }

        tarteaucitron.addScript('https://acdn.adnxs.com/dmp/up/pixie.js', '', function () {
            window.pixie('init', tarteaucitron.user.xandrId);
            window.pixie('event', 'PageView');
        });
    }
};

// xandr segment
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/segment-pixels-advanced.html
tarteaucitron.services.xandrsegment = {
    "key": "xandrsegment",
    "type": "ads",
    "name": "Xandr (Segment)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrsegment-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrsegmentAdd="' + x.getAttribute('xandrsegmentAdd') + '" xandrsegmentAddCode="' + x.getAttribute('xandrsegmentAddCode') + '" xandrsegmentRemove="' + x.getAttribute('xandrsegmentRemove') + '" xandrsegmentRemoveCode="' + x.getAttribute('xandrsegmentRemoveCode') + '" xandrsegmentMember="' + x.getAttribute('xandrsegmentMember') + '" xandrsegmentRedir="' + x.getAttribute('xandrsegmentRedir') + '" xandrsegmentValue="' + x.getAttribute('xandrsegmentValue') + '" xandrsegmentOther="' + x.getAttribute('xandrsegmentOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/seg?t=2&';
            uri += 'add=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAdd') + '&';
            uri += 'add_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentAddCode') + '&';
            uri += 'remove=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemove') + '&';
            uri += 'remove_code=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRemoveCode') + '&';
            uri += 'member=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentMember') + '&';
            uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentRedir') + '&';
            uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentValue') + '&';
            uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrsegmentOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrsegment';
        tarteaucitron.fallback(['xandrsegment-canvas'], tarteaucitron.engage(id));
    }
};

// xandr conversion
// https://docs.xandr.com/bundle/invest_invest-standard/page/topics/working-with-conversion-pixels.html
tarteaucitron.services.xandrconversion = {
    "key": "xandrconversion",
    "type": "ads",
    "name": "Xandr (Conversion)",
    "uri": "https://www.xandr.com/privacy/cookie-policy/",
    "needConsent": true,
    "cookies": ['uuid2', 'uids', 'sess', 'icu', 'anj', 'usersync'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['xandrconversion-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" xandrconversionId="' + x.getAttribute('xandrconversionId') + '" xandrconversionSeg="' + x.getAttribute('xandrconversionSeg') + '" xandrconversionOrderId="' + x.getAttribute('xandrconversionOrderId') + '" xandrconversionValue="' + x.getAttribute('xandrconversionValue') + '" xandrconversionRedir="' + x.getAttribute('xandrconversionRedir') + '" xandrconversionOther="' + x.getAttribute('xandrconversionOther') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ib.adnxs.com/px?t=2&';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionId') + '&';
            uri += 'seg=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionSeg') + '&';
            uri += 'order_id=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOrderId') + '&';
            uri += 'value=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionValue') + '&';
            uri += 'redir=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionRedir') + '&';
            uri += 'other=' + document.getElementById(uniqIds[i]).getAttribute('xandrconversionOther');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'xandrconversion';
        tarteaucitron.fallback(['xandrconversion-canvas'], tarteaucitron.engage(id));
    }
};

// helloasso
tarteaucitron.services.helloasso = {
    "key": "helloasso",
    "type": "api",
    "name": "HelloAsso",
    "uri": "https://www.helloasso.com/confidentialite",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_helloasso'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'HelloAsso iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" id="haWidget" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'helloasso';
        tarteaucitron.fallback(['tac_helloasso'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// podcloud
tarteaucitron.services.podcloud = {
    "key": "podcloud",
    "type": "video",
    "name": "podCloud",
    "uri": "https://podcloud.fr/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_podcloud'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'podCloud iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'podcloud';
        tarteaucitron.fallback(['tac_podcloud'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// facebookpost
tarteaucitron.services.facebookpost = {
    "key": "facebookpost",
    "type": "social",
    "name": "Facebook (post)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_facebookpost'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Facebook iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url"),
                appId = x.getAttribute("data-appid"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="https://www.facebook.com/plugins/post.php?href=' + encodeURIComponent(url) + '&amp;width=' + width + '&amp;show_text=false&amp;appId=' + appId + '&amp;height=' + height + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookpost';
        tarteaucitron.fallback(['tac_facebookpost'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// amplitude
tarteaucitron.services.amplitude = {
    "key": "amplitude",
    "type": "analytic",
    "name": "Amplitude",
    "uri": "https://amplitude.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.amplitude === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.amplitude.com/libs/amplitude-5.8.0-min.gz.js', '', function () {

            window.amplitude = {
                _q: [],
                _iq: {}
            };
            function s(e, t) { e.prototype[t] = function () { this._q.push([t].concat(Array.prototype.slice.call(arguments, 0))); return this } }
            var o = function () { this._q = []; return this };
            var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
            for (var u = 0; u < a.length; u++) { s(o, a[u]) }
            amplitude.Identify = o;
            var c = function () { this._q = []; return this };
            var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
            for (var p = 0; p < l.length; p++) { s(c, l[p]) }
            amplitude.Revenue = c;
            var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut", "setVersionName", "setDomain", "setDeviceId", "enableTracking", "setGlobalUserProperties", "identify", "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "groupIdentify", "onInit", "logEventWithTimestamp", "logEventWithGroups", "setSessionId", "resetSessionId"];
            function v(e) { function t(t) { e[t] = function () { e._q.push([t].concat(Array.prototype.slice.call(arguments, 0))) } } for (var n = 0; n < d.length; n++) { t(d[n]) } }
            v(amplitude);
            amplitude.getInstance = function (e) { e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase(); if (!amplitude._iq.hasOwnProperty(e)) { amplitude._iq[e] = { _q: [] }; v(amplitude._iq[e]) } return amplitude._iq[e] };

            amplitude.getInstance().init(tarteaucitron.user.amplitude);
        });
    }
};

// abtasty
tarteaucitron.services.abtasty = {
    "key": "abtasty",
    "type": "api",
    "name": "ABTasty",
    "uri": "https://www.abtasty.com/terms-of-use/",
    "needConsent": true,
    "cookies": ['ABTasty', 'ABTastySession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.abtastyID === undefined) {
            return;
        }
        tarteaucitron.addScript('//try.abtasty.com/' + tarteaucitron.user.abtastyID + '.js');
    }
};


// yandex metrica
tarteaucitron.services.metrica = {
    "key": "metrica",
    "type": "analytic",
    "name": "Yandex Metrica",
    "uri": "https://yandex.com/legal/confidential/",
    "needConsent": true,
    "cookies": ['_ym_metrika_enabled', '_ym_isad', '_ym_uid', '_ym_d', 'yabs-sid', '_ym_debug', '_ym_mp2_substs', '_ym_hostIndex', '_ym_mp2_track', 'yandexuid', 'usst'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.yandexmetrica === undefined) {
            return;
        }
        tarteaucitron.addScript('https://mc.yandex.ru/metrika/tag.js', '', function () {

            (function (m, e, t, r, i, k, a) {
                m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
            })
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(tarteaucitron.user.yandexmetrica, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
                ecommerce: "dataLayer"
            });
        });
    }
};

// addthis
tarteaucitron.services.addthis = {
    "key": "addthis",
    "type": "social",
    "name": "AddThis",
    "uri": "https://www.addthis.com/privacy/privacy-policy#publisher-visitors",
    "needConsent": true,
    "cookies": ['__atuvc', '__atuvs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addthisPubId === undefined) {
            return;
        }
        if (tarteaucitron.isAjax === true) {
            window.addthis = null;
            window._adr = null;
            window._atc = null;
            window._atd = null;
            window._ate = null;
            window._atr = null;
            window._atw = null;
        }
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], '');
        tarteaucitron.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + tarteaucitron.user.addthisPubId);
    },
    "fallback": function () {
        "use strict";
        var id = 'addthis';
        tarteaucitron.fallback(['addthis_inline_share_toolbox'], tarteaucitron.engage(id));
    }
};

// addtoanyfeed
tarteaucitron.services.addtoanyfeed = {
    "key": "addtoanyfeed",
    "type": "social",
    "name": "AddToAny (feed)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.addtoanyfeedUri === undefined) {
            return;
        }
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
        window.a2a_config = window.a2a_config || {};
        window.a2a_config.linkurl = tarteaucitron.user.addtoanyfeedUri;
        tarteaucitron.addScript('//static.addtoany.com/menu/feed.js');
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + tarteaucitron.user.addtoanyfeedUri;
    }
};

// addtoanyshare
tarteaucitron.services.addtoanyshare = {
    "key": "addtoanyshare",
    "type": "social",
    "name": "AddToAny (share)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tac_addtoanyshare'], '');
        tarteaucitron.addScript('//static.addtoany.com/menu/page.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'addtoanyshare';
        tarteaucitron.fallback(['tac_addtoanyshare'], tarteaucitron.engage(id));
    }
};

// aduptech ads
tarteaucitron.services.aduptech_ads = {
    "key": "aduptech_ads",
    "type": "ads",
    "name": "Ad Up Technology (ads)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_ads",
            API_URL = "https://s.d.adup-tech.com/jsapi";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        tarteaucitron.addScript(API_URL, "", function () {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (!element.getAttribute("id")) {
                    element.setAttribute("id", IDENTIFIER + Math.random().toString(36).substr(2, 9));
                }

                window.uAd.embed(element.getAttribute("id"), {
                    placementKey: element.getAttribute("placementKey"),
                    responsive: Boolean(element.getAttribute("responsive")),
                    lazy: Boolean(element.getAttribute("lazy")),
                    adtest: Boolean(element.getAttribute("test")),
                    query: element.getAttribute("query") || "",
                    minCpc: element.getAttribute("minCpc") || "",
                    pageUrl: element.getAttribute("pageUrl") || "",
                    skip: element.getAttribute("skip") || ""
                });
            }
        });

    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(["aduptech_ads"], tarteaucitron.engage("aduptech_ads"));
    }
};

// aduptech conversion
tarteaucitron.services.aduptech_conversion = {
    "key": "aduptech_conversion",
    "type": "ads",
    "name": "Ad Up Technology (conversion)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_conversion",
            CONVERSION_PIXEL_BASE_URL = "https://d.adup-tech.com/campaign/conversion";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (!element.getAttribute("advertiserId") || !element.getAttribute("conversionCode")) {
                continue;
            }

            var url = CONVERSION_PIXEL_BASE_URL +
                "/" + encodeURIComponent(element.getAttribute("advertiserId")) +
                "?t=" + encodeURIComponent(element.getAttribute("conversionCode"));

            if (element.getAttribute("price")) {
                url += "&price=" + encodeURIComponent(element.getAttribute("price"));
            }

            if (element.getAttribute("quantity")) {
                url += "&quantity=" + encodeURIComponent(element.getAttribute("quantity"));
            }

            if (element.getAttribute("total")) {
                url += "&total=" + encodeURIComponent(element.getAttribute("total"));
            }

            if (element.getAttribute("orderId")) {
                url += "&order_id=" + encodeURIComponent(element.getAttribute("orderId"));
            }

            if (element.getAttribute("itemNumber")) {
                url += "&item_number=" + encodeURIComponent(element.getAttribute("itemNumber"));
            }

            if (element.getAttribute("description")) {
                url += "&description=" + encodeURIComponent(element.getAttribute("description"));
            }

            (new Image()).src = url;
        }
    }
};

// aduptech retargeting
tarteaucitron.services.aduptech_retargeting = {
    "key": "aduptech_retargeting",
    "type": "ads",
    "name": "Ad Up Technology (retargeting)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_retargeting",
            API_URL = "https://s.d.adup-tech.com/services/retargeting.js";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        tarteaucitron.fallback([IDENTIFIER], "");

        window.AdUpRetargeting = function (api) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                api.init();

                api.setAccount(element.getAttribute("account"));

                if (element.getAttribute("email")) {
                    api.setEmail(element.getAttribute("email"));
                } else if (element.getAttribute("hashedEmail")) {
                    api.setHashedEmail(element.getAttribute("hashedEmail"));
                }

                if (element.getAttribute("product")) {
                    try {
                        api.setProduct(JSON.parse(element.getAttribute("product")));
                    } catch (e) {
                        api.setProduct(element.getAttribute("product"));
                    }
                }

                if (element.getAttribute("transaction")) {
                    try {
                        api.setTransaction(JSON.parse(element.getAttribute("transaction")));
                    } catch (e) {
                        api.setTransaction(element.getAttribute("transaction"));
                    }
                }

                if (element.getAttribute("demarkUser")) {
                    api.setDemarkUser();
                } else if (element.getAttribute("demarkProducts")) {
                    api.setDemarkProducts();
                }

                if (element.getAttribute("conversionCode")) {
                    api.setConversionCode(element.getAttribute("conversionCode"));
                }

                if (element.getAttribute("device")) {
                    var setter = "set" + element.getAttribute("device").charAt(0).toUpperCase() + element.getAttribute("device").slice(1);
                    if (typeof api[setter] === 'function') {
                        api[setter]();
                    }
                }

                if (element.getAttribute("track")) {
                    var tracker = "track" + element.getAttribute("track").charAt(0).toUpperCase() + element.getAttribute("track").slice(1);
                    if (typeof api[tracker] === "function") {
                        api[tracker]();
                    } else {
                        api.trackHomepage();
                    }
                }
            };
        };

        tarteaucitron.addScript(API_URL);
    }
};

// alexa
tarteaucitron.services.alexa = {
    "key": "alexa",
    "type": "analytic",
    "name": "Alexa",
    "uri": "https://www.alexa.com/help/privacy",
    "needConsent": true,
    "cookies": ['__asc', '__auc'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.alexaAccountID === undefined) {
            return;
        }
        window._atrk_opts = {
            atrk_acct: tarteaucitron.user.alexaAccountID,
            domain: window.location.hostname.match(/[^\.]*\.[^.]*$/)[0],
            dynamic: true
        };
        tarteaucitron.addScript('https://d31qbv1cthcecs.cloudfront.net/atrk.js');
    }
};

// amazon
tarteaucitron.services.amazon = {
    "key": "amazon",
    "type": "ads",
    "name": "Amazon",
    "uri": "https://www.amazon.com/gp/help/customer/display.html/ref=help_search_1-1?ie=UTF8&nodeId=201909010&qid=1544617177&sr=1-1",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['amazon_product'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Amazon iframe'),
                amazonId = x.getAttribute("amazonid"),
                productId = x.getAttribute("productid"),
                url = '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=' + tarteaucitron.getLanguage().toUpperCase() + '&source=ss&ref=ss_til&ad_type=product_link&tracking_id=' + amazonId + '&marketplace=amazon&region=' + tarteaucitron.getLanguage().toUpperCase() + '&placement=' + productId + '&asins=' + productId + '&show_border=true&link_opens_in_new_window=true',
                iframe = '<iframe title="' + frame_title + '" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" src="' + url + '"></iframe>';

            return iframe;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'amazon';
        tarteaucitron.fallback(['amazon_product'], tarteaucitron.engage(id));
    }
};

// calameo
tarteaucitron.services.calameo = {
    "key": "calameo",
    "type": "video",
    "name": "Calameo",
    "uri": "https://fr.calameo.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['calameo-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Calameo iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//v.calameo.com/?bkcode=' + id,
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'calameo';
        tarteaucitron.fallback(['calameo-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// clicky
tarteaucitron.services.clicky = {
    "key": "clicky",
    "type": "analytic",
    "name": "Clicky",
    "uri": "https://clicky.com/terms",
    "needConsent": true,
    "cookies": ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + tarteaucitron.user.clickyId, 'unpoco_' + tarteaucitron.user.clickyId, 'heatmaps_g2g_' + tarteaucitron.user.clickyId],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.clickyId === undefined) {
            return;
        }
        tarteaucitron.addScript('//static.getclicky.com/js', '', function () {
            if (typeof clicky.init === 'function') {
                clicky.init(tarteaucitron.user.clickyId);
            }
            if (typeof tarteaucitron.user.clickyMore === 'function') {
                tarteaucitron.user.clickyMore();
            }
        });
    }
};

// clicmanager
tarteaucitron.services.clicmanager = {
    "key": "clicmanager",
    "type": "ads",
    "name": "Clicmanager",
    "uri": "http://www.clicmanager.fr/infos_legales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['clicmanager-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" c="' + x.getAttribute('c') + '" s="' + x.getAttribute('s') + '" t="' + x.getAttribute('t') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ads.clicmanager.fr/exe.php?';
            uri += 'c=' + document.getElementById(uniqIds[i]).getAttribute('c') + '&';
            uri += 's=' + document.getElementById(uniqIds[i]).getAttribute('s') + '&';
            uri += 't=' + document.getElementById(uniqIds[i]).getAttribute('t');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'clicmanager';
        tarteaucitron.fallback(['clicmanager-canvas'], tarteaucitron.engage(id));
    }
};

// compteur
tarteaucitron.services.compteur = {
    "key": "compteur",
    "type": "analytic",
    "name": "Compteur.fr",
    "uri": "https://www.compteur.fr/help_privacy_policy.htm",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.compteurID === undefined) {
            return;
        }
        tarteaucitron.addScript('https://server2.compteur.fr/log7.js', '', function () { wtslog7(tarteaucitron.user.compteurID, 1); });
    }
};

// contentsquare
tarteaucitron.services.contentsquare = {
    "key": "contentsquare",
    "type": "api",
    "name": "ContentSquare",
    "uri": "https://docs.contentsquare.com/uxa-en/#collected-data",
    "needConsent": true,
    "cookies": ['_cs_id', '_cs_s', '_cs_vars', '_cs_ex', '_cs_c', '_cs_optout'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.contentsquareID === undefined) {
            return;
        }
        tarteaucitron.addScript('//t.contentsquare.net/uxa/' + tarteaucitron.user.contentsquareID + '.js');
    }
};

// crazyegg
tarteaucitron.services.crazyegg = {
    "key": "crazyegg",
    "type": "analytic",
    "name": "Crazy Egg",
    "uri": "https://www.crazyegg.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.crazyeggId === undefined) {
            return;
        }

        tarteaucitron.addScript('//script.crazyegg.com/pages/scripts/' + tarteaucitron.user.crazyeggId.substr(0, 4) + '/' + tarteaucitron.user.crazyeggId.substr(4, 4) + '.js');
    }
};

// clarity
tarteaucitron.services.clarity = {
    "key": "clarity",
    "type": "analytic",
    "name": "Clarity",
    "uri": "https://clarity.microsoft.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window["clarity"] = window["clarity"] || function () { (window["clarity"].q = window["clarity"].q || []).push(arguments) };

        tarteaucitron.addScript('https://www.clarity.ms/tag/' + tarteaucitron.user.clarity);
    }
};

// criteo
tarteaucitron.services.criteo = {
    "key": "criteo",
    "type": "ads",
    "name": "Criteo",
    "uri": "http://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        document.MAX_ct0 = '';
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['criteo-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" zoneid="' + x.getAttribute('zoneid') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//cas.criteo.com/delivery/ajs.php?';
            uri += 'zoneid=' + document.getElementById(uniqIds[i]).getAttribute('zoneid');
            uri += '&nodis=1&cb=' + Math.floor(Math.random() * 99999999999);
            uri += '&loc=' + encodeURI(window.location);
            uri += (document.MAX_used !== ',') ? '&exclude=' + document.MAX_used : '';
            uri += (document.charset !== undefined ? '&charset=' + document.charset : '');
            uri += (document.characterSet !== undefined ? '&charset=' + document.characterSet : '');
            uri += (document.referrer !== undefined) ? '&referer=' + encodeURI(document.referrer) : '';
            uri += (document.context !== undefined) ? '&context=' + encodeURI(document.context) : '';
            uri += ((document.MAX_ct0 !== undefined) && (document.MAX_ct0.substring(0, 4) === 'http')) ? '&ct0=' + encodeURI(document.MAX_ct0) : '';
            uri += (document.mmm_fo !== undefined) ? '&mmm_fo=1' : '';

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'criteo';
        tarteaucitron.fallback(['criteo-canvas'], tarteaucitron.engage(id));
    }
};

// artetv
tarteaucitron.services.artetv = {
    "key": "artetv",
    "type": "video",
    "name": "Arte.tv",
    "uri": "https://www.arte.tv/sites/fr/corporate/donnees-personnelles/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['artetv_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Arte.tv iframe'),
                video_json = x.getAttribute("json"),
                video_width = x.getAttribute("width"),
                video_height = x.getAttribute("height"),
                video_frame,
                video_allowfullscreen = x.getAttribute("allowfullscreen");

            if (video_json === undefined) {
                return "";
            }

            video_frame = '<iframe title="' + frame_title + '" style="transition-duration: 0; transition-property: no; margin: 0 auto; position: relative; display: block; background-color: #000000;" src="https://www.arte.tv/player/v5/index.php?json_url=' + video_json + '" width="' + video_width + '" height="' + video_height + '" scrolling="no" ' + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'artetv';
        tarteaucitron.fallback(['artetv_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dailymotion
tarteaucitron.services.dailymotion = {
    "key": "dailymotion",
    "type": "video",
    "name": "Dailymotion",
    "uri": "https://www.dailymotion.com/legal/privacy",
    "needConsent": true,
    "cookies": ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['dailymotion_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Dailymotion iframe'),
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                embed_type = tarteaucitron.getElemAttr(x, "embedType"),
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                params = 'info=' + tarteaucitron.getElemAttr(x, "showinfo") + '&autoPlay=' + tarteaucitron.getElemAttr(x, "autoplay");

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (embed_type === undefined || !['video', 'playlist'].includes(embed_type)) {
                embed_type = "video";
            }
            video_frame = '<iframe title="' + frame_title + '" src="//www.dailymotion.com/embed/' + embed_type + '/' + video_id + '?' + params + '" ' + frame_width + frame_height + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'dailymotion';
        tarteaucitron.fallback(['dailymotion_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation
tarteaucitron.services.datingaffiliation = {
    "key": "datingaffiliation",
    "type": "ads",
    "name": "Dating Affiliation",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Dating Affiliation iframe'),
                comfrom = x.getAttribute("data-comfrom"),
                r = x.getAttribute("data-r"),
                p = x.getAttribute("data-p"),
                cf0 = x.getAttribute("data-cf0"),
                langue = x.getAttribute("data-langue"),
                forward_affiliate = x.getAttribute("data-forwardAffiliate"),
                cf2 = x.getAttribute("data-cf2"),
                cfsa2 = x.getAttribute("data-cfsa2"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'http://www.tools-affil2.com/rotaban/ban.php?' + comfrom;

            return '<iframe title="' + frame_title + '" src="' + url + '&r=' + r + '&p=' + p + '&cf0=' + cf0 + '&langue=' + langue + '&forward_affiliate=' + forward_affiliate + '&cf2=' + cf2 + '&cfsa2=' + cfsa2 + '" width="' + width + '" height="' + height + '" marginheight="0" marginwidth="0" scrolling="no"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliation';
        tarteaucitron.fallback(['datingaffiliation-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// dating affiliation popup
tarteaucitron.services.datingaffiliationpopup = {
    "key": "datingaffiliationpopup",
    "type": "ads",
    "name": "Dating Affiliation (Pop Up)",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmt_Tools', '__utmv', '__utmz', '_ga', '_gat', '_gat_UA-65072040-17', '__da-pu-xflirt-ID-pc-o169'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" uri="' + x.getAttribute('uri') + '" comfrom="' + x.getAttribute('comfrom') + '" promo="' + x.getAttribute('promo') + '" productid="' + x.getAttribute('productid') + '" submitconfig="' + x.getAttribute('submitconfig') + '" ur="' + x.getAttribute('ur') + '" brand="' + x.getAttribute('brand') + '" lang="' + x.getAttribute('lang') + '" cf0="' + x.getAttribute('cf0') + '" cf2="' + x.getAttribute('cf2') + '" subid1="' + x.getAttribute('subid1') + '" cfsa2="' + x.getAttribute('cfsa2') + '" subid2="' + x.getAttribute('subid2') + '" nicheid="' + x.getAttribute('nicheid') + '" degreid="' + x.getAttribute('degreid') + '" bt="' + x.getAttribute('bt') + '" vis="' + x.getAttribute('vis') + '" hid="' + x.getAttribute('hid') + '" snd="' + x.getAttribute('snd') + '" aabd="' + x.getAttribute('aabd') + '" aabs="' + x.getAttribute('aabs') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://www.promotools.biz/da/popunder/script.php?';
            uri += 'comfrom=' + document.getElementById(uniqIds[i]).getAttribute('comfrom') + '&';
            uri += 'promo=' + document.getElementById(uniqIds[i]).getAttribute('promo') + '&';
            uri += 'product_id=' + document.getElementById(uniqIds[i]).getAttribute('productid') + '&';
            uri += 'submitconfig=' + document.getElementById(uniqIds[i]).getAttribute('submitconfig') + '&';
            uri += 'ur=' + document.getElementById(uniqIds[i]).getAttribute('ur') + '&';
            uri += 'brand=' + document.getElementById(uniqIds[i]).getAttribute('brand') + '&';
            uri += 'lang=' + document.getElementById(uniqIds[i]).getAttribute('lang') + '&';
            uri += 'cf0=' + document.getElementById(uniqIds[i]).getAttribute('cf0') + '&';
            uri += 'cf2=' + document.getElementById(uniqIds[i]).getAttribute('cf2') + '&';
            uri += 'subid1=' + document.getElementById(uniqIds[i]).getAttribute('subid1') + '&';
            uri += 'cfsa2=' + document.getElementById(uniqIds[i]).getAttribute('cfsa2') + '&';
            uri += 'subid2=' + document.getElementById(uniqIds[i]).getAttribute('subid2') + '&';
            uri += 'nicheId=' + document.getElementById(uniqIds[i]).getAttribute('nicheid') + '&';
            uri += 'degreId=' + document.getElementById(uniqIds[i]).getAttribute('degreid') + '&';
            uri += 'bt=' + document.getElementById(uniqIds[i]).getAttribute('bt') + '&';
            uri += 'vis=' + document.getElementById(uniqIds[i]).getAttribute('vis') + '&';
            uri += 'hid=' + document.getElementById(uniqIds[i]).getAttribute('hid') + '&';
            uri += 'snd=' + document.getElementById(uniqIds[i]).getAttribute('snd') + '&';
            uri += 'aabd=' + document.getElementById(uniqIds[i]).getAttribute('aabd') + '&';
            uri += 'aabs=' + document.getElementById(uniqIds[i]).getAttribute('aabs');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliationpopup';
        tarteaucitron.fallback(['datingaffiliationpopup-canvas'], tarteaucitron.engage(id));
    }
};

// deezer
tarteaucitron.services.deezer = {
    "key": "deezer",
    "type": "video",
    "name": "Deezer",
    "uri": "https://www.deezer.com/legal/personal-datas",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['deezer_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Deezer iframe'),
                deezer_id = x.getAttribute("deezerID"),
                deezer_width = x.getAttribute("width"),
                frame_width = 'width=',
                deezer_height = x.getAttribute("height"),
                frame_height = 'height=',
                deezer_frame,
                embed_theme = x.getAttribute("theme"),
                embed_type = x.getAttribute("embedType"),
                radius = x.getAttribute("radius"),
                tracklist = x.getAttribute("tracklist"),
                allowfullscreen = x.getAttribute("allowfullscreen"),
                params;

            if (deezer_id === undefined) {
                return "";
            }
            if (deezer_width !== undefined) {
                frame_width += '"' + deezer_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (deezer_height !== undefined) {
                frame_height += '"' + deezer_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (embed_theme === undefined || !['auto', 'light', 'dark'].includes(embed_theme)) {
                embed_theme = "auto";
            }
            if (embed_type === undefined || !['album', 'track', 'playlist'].includes(embed_type)) {
                embed_type = "album";
            }
            if (radius === undefined || !['true', 'false'].includes(radius)) {
                radius = "true";
            }
            if (tracklist === undefined || !['true', 'false'].includes(tracklist)) {
                tracklist = "true";
            }
            params = 'tracklist=' + tracklist + '&radius=' + radius;
            deezer_frame = '<iframe title="' + frame_title + '" src="//widget.deezer.com/widget/' + embed_theme + '/' + embed_type + '/' + deezer_id + '?' + params + '" ' + frame_width + frame_height + ' ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return deezer_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'deezer';
        tarteaucitron.fallback(['deezer_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// leadforensics
tarteaucitron.services.leadforensics = {
    "key": "leadforensics",
    "type": "analytic",
    "name": "LeadForensics",
    "uri": "https://www.leadforensics.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['trackalyzer'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.leadforensicsSf14gv === undefined ||
            tarteaucitron.user.leadforensicsIidentifier === undefined) {
            return;
        }

        window.sf14gv = tarteaucitron.user.leadforensicsSf14gv;

        (function () {
            var sf14g = document.createElement('script'); sf14g.async = true;
            sf14g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 't.sf14g.com/sf14g.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sf14g, s);
        })();

        tarteaucitron.addScript('//secure.leadforensics.com/js/' + tarteaucitron.user.leadforensicsIidentifier + '.js');
    }
};

// disqus
tarteaucitron.services.disqus = {
    "key": "disqus",
    "type": "comment",
    "name": "Disqus",
    "uri": "https://help.disqus.com/customer/portal/articles/466259-privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.disqusShortname === undefined) {
            return;
        }
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/embed.js');
        tarteaucitron.addScript('//' + tarteaucitron.user.disqusShortname + '.disqus.com/count.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'disqus';

        if (document.getElementById('disqus_thread')) {
            document.getElementById('disqus_thread').innerHTML = tarteaucitron.engage(id);
        }
    }
};

// ekomi
tarteaucitron.services.ekomi = {
    "key": "ekomi",
    "type": "social",
    "name": "eKomi",
    "uri": "http://www.ekomi-us.com/us/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.ekomiCertId === undefined) {
            return;
        }
        window.eKomiIntegrationConfig = [
            { certId: tarteaucitron.user.ekomiCertId }
        ];
        tarteaucitron.addScript('//connect.ekomi.de/integration_1410173009/' + tarteaucitron.user.ekomiCertId + '.js');
    }
};

// etracker
tarteaucitron.services.etracker = {
    "key": "etracker",
    "type": "analytic",
    "name": "eTracker",
    "uri": "https://www.etracker.com/en/data-protection.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.etracker === undefined) {
            return;
        }

        tarteaucitron.addScript('//static.etracker.com/code/e.js', '_etLoader', function () { }, true, "data-secure-code", tarteaucitron.user.etracker);
    }
};

// facebook
tarteaucitron.services.facebook = {
    "key": "facebook",
    "type": "social",
    "name": "Facebook",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['xs', 'sb', 'fr', 'datr', 'dpr', 'c_user'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebook';
        tarteaucitron.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], tarteaucitron.engage(id));
    }
};

// facebooklikebox
tarteaucitron.services.facebooklikebox = {
    "key": "facebooklikebox",
    "type": "social",
    "name": "Facebook (like box)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.3', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebooklikebox';
        tarteaucitron.fallback(['fb-like-box', 'fb-page'], tarteaucitron.engage(id));
    }
};

// facebookcomment
tarteaucitron.services.facebookcomment = {
    "key": "facebookcomment",
    "type": "comment",
    "name": "Facebook (commentaire)",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fb-comments'], '');
        tarteaucitron.addScript('//connect.facebook.net/' + tarteaucitron.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (tarteaucitron.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcomment';
        tarteaucitron.fallback(['fb-comments'], tarteaucitron.engage(id));
    }
};

// ferank
tarteaucitron.services.ferank = {
    "key": "ferank",
    "type": "analytic",
    "name": "FERank",
    "uri": "https://www.ferank.fr/respect-vie-privee/#mesureaudience",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/pixel.js', '', function () {
            if (typeof tarteaucitron.user.ferankMore === 'function') {
                tarteaucitron.user.ferankMore();
            }
        });
    }
};

// pingdom
tarteaucitron.services.pingdom = {
    "key": "pingdom",
    "type": "api",
    "name": "Pingdom",
    "uri": "https://www.solarwinds.com/general-data-protection-regulation-cloud",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.pingdomId === undefined) {
            return;
        }

        window._prum = [['id', tarteaucitron.user.pingdomId], ['mark', 'firstbyte', (new Date()).getTime()]];

        tarteaucitron.addScript('https://rum-static.pingdom.net/prum.min.js');
    }
};


// simpleanalytics
tarteaucitron.services.simpleanalytics = {
    "key": "simpleanalytics",
    "type": "analytic",
    "name": "Simple Analytics",
    "uri": "https://docs.simpleanalytics.com/what-we-collect",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://scripts.simpleanalyticscdn.com/latest.js');
    }
};

// stonly
tarteaucitron.services.stonly = {
    "key": "stonly",
    "type": "api",
    "name": "Stonly",
    "uri": "https://stonly.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.stonlyId === undefined) {
            return;
        }

        window.STONLY_WID = tarteaucitron.user.stonlyId;
        window.StonlyWidget || ((window.w = window.StonlyWidget = function () {
            window.w._api ? window.w._api.apply(window.w, arguments) : window.w.queue.push(arguments)
        }).queue = []);

        tarteaucitron.addScript('https://stonly.com/js/widget/v2/stonly-widget.js?v=' + Date.now());
    }
};

// stripe
/*tarteaucitron.services.stripe = {
    "key": "stripe",
    "type": "api",
    "name": "Stripe",
    "uri": "https://stripe.com/cookies-policy/legal",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://js.stripe.com/v3/');
    }
};*/

// ferank pub
tarteaucitron.services.ferankpub = {
    "key": "ferankpub",
    "type": "ads",
    "name": "FERank (pub)",
    "uri": "https://www.ferank.fr/respect-vie-privee/#regiepublicitaire",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//static.ferank.fr/publicite.async.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof ferankReady === 'function') {
                ferankReady();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'ferankpub';
        tarteaucitron.fallback(['ferank-publicite'], tarteaucitron.engage(id));
    }
};

// get+
tarteaucitron.services.getplus = {
    "key": "getplus",
    "type": "analytic",
    "name": "Get+",
    "uri": "http://www.getplus.fr/Conditions-generales-de-vente_a226.html",
    "needConsent": true,
    "cookies": ['_first_pageview', '_jsuid', 'no_trackyy_' + tarteaucitron.user.getplusId, '_eventqueue'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getplusId === undefined) {
            return;
        }

        window.webleads_site_ids = window.webleads_site_ids || [];
        window.webleads_site_ids.push(tarteaucitron.user.getplusId);
        tarteaucitron.addScript('//stats.webleads-tracker.com/js');
    }
};

// google+
tarteaucitron.services.gplus = {
    "key": "gplus",
    "type": "social",
    "name": "Google+",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplus';
        tarteaucitron.fallback(['g-plus', 'g-plusone'], tarteaucitron.engage(id));
    }
};

// google+ badge
tarteaucitron.services.gplusbadge = {
    "key": "gplusbadge",
    "type": "social",
    "name": "Google+ (badge)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplusbadge';
        tarteaucitron.fallback(['g-page', 'g-person'], tarteaucitron.engage(id));
    }
};

// google adsense
tarteaucitron.services.adsense = {
    "key": "adsense",
    "type": "ads",
    "name": "Google Adsense",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsense';
        tarteaucitron.fallback(['adsbygoogle'], tarteaucitron.engage(id));
    }
};

// google partners badge
tarteaucitron.services.googlepartners = {
    "key": "googlepartners",
    "type": "ads",
    "name": "Google Partners Badge",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'googlepartners';
        tarteaucitron.fallback(['g-partnersbadge'], tarteaucitron.engage(id));
    }
};

// google adsense search (form)
tarteaucitron.services.adsensesearchform = {
    "key": "adsensesearchform",
    "type": "ads",
    "name": "Google Adsense Search (form)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/coop/cse/brand?form=cse-search-box&lang=' + tarteaucitron.getLanguage());
    }
};

// google adsense search (result)
tarteaucitron.services.adsensesearchresult = {
    "key": "adsensesearchresult",
    "type": "ads",
    "name": "Google Adsense Search (result)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adsensesearchresultCx === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.google.com/cse/cse.js?cx=' + tarteaucitron.user.adsensesearchresultCx);
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearchresult';

        if (document.getElementById('gcse_searchresults')) {
            document.getElementById('gcse_searchresults').innerHTML = tarteaucitron.engage(id);
        }
    }
};

// googleadwordsconversion
tarteaucitron.services.googleadwordsconversion = {
    "key": "googleadwordsconversion",
    "type": "ads",
    "name": "Google Adwords (conversion)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsconversionId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsconversionId,
                google_conversion_label: tarteaucitron.user.adwordsconversionLabel,
                google_conversion_language: tarteaucitron.user.adwordsconversionLanguage,
                google_conversion_format: tarteaucitron.user.adwordsconversionFormat,
                google_conversion_color: tarteaucitron.user.adwordsconversionColor,
                google_conversion_value: tarteaucitron.user.adwordsconversionValue,
                google_conversion_currency: tarteaucitron.user.adwordsconversionCurrency,
                google_custom_params: {
                    parameter1: tarteaucitron.user.adwordsconversionCustom1,
                    parameter2: tarteaucitron.user.adwordsconversionCustom2
                }
            });
        });
    }
};

// googleadwordsremarketing
tarteaucitron.services.googleadwordsremarketing = {
    "key": "googleadwordsremarketing",
    "type": "ads",
    "name": "Google Adwords (remarketing)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adwordsremarketingId === undefined) {
            return;
        }

        tarteaucitron.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: tarteaucitron.user.adwordsremarketingId,
                google_remarketing_only: true
            });
        });
    }
};

// google analytics (old)
tarteaucitron.services.gajs = {
    "key": "gajs",
    "type": "analytic",
    "name": "Google Analytics (ga.js)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gajsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie];
    })(),
    "js": function () {
        "use strict";
        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', tarteaucitron.user.gajsUa]);

        if (tarteaucitron.user.gajsAnonymizeIp) {
            window._gaq.push(['_gat._anonymizeIp']);
        }

        if (tarteaucitron.user.gajsPageView) {
            window._gaq.push(['_trackPageview, ' + tarteaucitron.user.gajsPageView]);
        } else {
            window._gaq.push(['_trackPageview']);
        }

        tarteaucitron.addScript('//www.google-analytics.com/ga.js', '', function () {
            if (typeof tarteaucitron.user.gajsMore === 'function') {
                tarteaucitron.user.gajsMore();
            }
        });
    }
};

// google analytics
tarteaucitron.services.analytics = {
    "key": "analytics",
    "type": "analytic",
    "name": "Google Analytics (universal)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.analyticsUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie];
    })(),
    "js": function () {
        "use strict";
        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        tarteaucitron.addScript('https://www.google-analytics.com/analytics.js', '', function () {
            var uaCreate = { 'cookieExpires': 34128000 };
            tarteaucitron.extend(uaCreate, tarteaucitron.user.analyticsUaCreate || {});
            ga('create', tarteaucitron.user.analyticsUa, uaCreate);

            if (tarteaucitron.user.analyticsAnonymizeIp) {
                ga('set', 'anonymizeIp', true);
            }

            if (typeof tarteaucitron.user.analyticsPrepare === 'function') {
                tarteaucitron.user.analyticsPrepare();
            }

            if (tarteaucitron.user.analyticsPageView) {
                ga('send', 'pageview', tarteaucitron.user.analyticsPageView);
            } else {
                ga('send', 'pageview');
            }

            if (typeof tarteaucitron.user.analyticsMore === 'function') {
                tarteaucitron.user.analyticsMore();
            }
        });
    }
};

// google analytics
tarteaucitron.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.gtagUa,
            tagUaCookie = '_gat_gtag_' + googleIdentifier,
            tagGCookie = '_ga_' + googleIdentifier;

        tagUaCookie = tagUaCookie.replace(/-/g, '_');
        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', tagUaCookie, tagGCookie];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + tarteaucitron.user.gtagUa, '', function () {
            window.gtag = function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            if (tarteaucitron.user.gtagCrossdomain) {
                /**
                 * https://support.google.com/analytics/answer/7476333?hl=en
                 * https://developers.google.com/analytics/devguides/collection/gtagjs/cross-domain
                 */
                gtag('config', tarteaucitron.user.gtagUa, { 'anonymize_ip': true }, { linker: { domains: tarteaucitron.user.gtagCrossdomain, } });
            } else {
                gtag('config', tarteaucitron.user.gtagUa, { 'anonymize_ip': true });
            }

            if (typeof tarteaucitron.user.gtagMore === 'function') {
                tarteaucitron.user.gtagMore();
            }
        });
    }
};

tarteaucitron.services.firebase = {
    "key": "firebase",
    "type": "analytic",
    "name": "Firebase",
    "uri": "https://firebase.google.com/support/privacy",
    "needConsent": true,
    "cookies": (function () {
        var googleIdentifier = tarteaucitron.user.firebaseMeasurementId,
            tagGCookie = '_ga_' + googleIdentifier;

        tagGCookie = tagGCookie.replace(/G-/g, '');

        return ['_ga', tagGCookie];
    })(),
    "js": function () {
        "use strict";

        if (tarteaucitron.user.firebaseApiKey === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js', '', function () {
            tarteaucitron.addScript('https://www.gstatic.com/firebasejs/8.6.2/firebase-analytics.js', '', function () {

                var firebaseConfig = {
                    apiKey: tarteaucitron.user.firebaseApiKey,
                    authDomain: tarteaucitron.user.firebaseAuthDomain,
                    databaseURL: tarteaucitron.user.firebaseDatabaseUrl,
                    projectId: tarteaucitron.user.firebaseProjectId,
                    storageBucket: tarteaucitron.user.firebaseStorageBucket,
                    appId: tarteaucitron.user.firebaseAppId,
                    measurementId: tarteaucitron.user.firebaseMeasurementId,
                };
                firebase.initializeApp(firebaseConfig);
                firebase.analytics();
            });
        });
    }
};

// genially
tarteaucitron.services.genially = {
    "key": "genially",
    "type": "api",
    "name": "genially",
    "uri": "https://www.genial.ly/cookies",
    "needConsent": true,
    "cookies": ['_gat', '_ga', '_gid'],
    "js": function () {
        "use strict";

        tarteaucitron.fallback(['tac_genially'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'genially iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                geniallyid = x.getAttribute("geniallyid"),
                allowfullscreen = x.getAttribute("allowfullscreen");

            return '<div style="position: relative; padding-bottom: 109.00%; padding-top: 0; height: 0;"><iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" title="' + frame_title + '" src="https://view.genial.ly/' + geniallyid + '" width="' + width + '" height="' + height + '" scrolling="auto" allowtransparency ' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'genially';
        tarteaucitron.fallback(['tac_genially'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// google maps
tarteaucitron.services.googlemaps = {
    "key": "googlemaps",
    "type": "api",
    "name": "Google Maps",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var mapOptions,
            map,
            uniqIds = [],
            i;

        if (tarteaucitron.user.mapscallback === undefined) {
            tarteaucitron.user.mapscallback = 'tac_googlemaps_callback';
        }

        // Add Google Maps libraries if any (https://developers.google.com/maps/documentation/javascript/libraries)
        var googleMapsLibraries = '';
        if (tarteaucitron.user.googlemapsLibraries) {
            googleMapsLibraries = '&libraries=' + tarteaucitron.user.googlemapsLibraries;
        }

        tarteaucitron.addScript('//maps.googleapis.com/maps/api/js?v=3.exp&key=' + tarteaucitron.user.googlemapsKey + '&callback=' + tarteaucitron.user.mapscallback + googleMapsLibraries);

        window.tac_googlemaps_callback = function () {
            tarteaucitron.fallback(['googlemaps-canvas'], function (x) {
                var uniqId = '_' + Math.random().toString(36).substr(2, 9);
                uniqIds.push(uniqId);
                return '<div id="' + uniqId + '" zoom="' + x.getAttribute('zoom') + '" latitude="' + x.getAttribute('latitude') + '" longitude="' + x.getAttribute('longitude') + '" style="width:' + x.offsetWidth + 'px;height:' + x.offsetHeight + 'px"></div>';
            });

            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                mapOptions = {
                    zoom: parseInt(document.getElementById(uniqIds[i]).getAttribute('zoom'), 10),
                    center: new google.maps.LatLng(parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10))
                };
                map = new google.maps.Map(document.getElementById(uniqIds[i]), mapOptions);
                new google.maps.Marker({ position: { lat: parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), lng: parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10) }, map: map });
            }
        };
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemaps';
        tarteaucitron.fallback(['googlemaps-canvas'], tarteaucitron.engage(id));
    }
};

// googlemaps search
tarteaucitron.services.googlemapssearch = {
    "key": "googlemapssearch",
    "type": "api",
    "name": "Google Maps Search API",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapssearch'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Google search iframe'),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                // url = x.getAttribute("data-url");
                query = escape(x.getAttribute("data-search")),
                key = x.getAttribute("data-api-key");

            return '<iframe title="' + frame_title + '" width="' + width + '" height="' + height + '" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=' + query + '&key=' + key + '" allowfullscreen></iframe> '
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapssearch';
        tarteaucitron.fallback(['googlemapssearch'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// googlemaps embed iframe
tarteaucitron.services.googlemapsembed = {
    "key": "googlemapsembed",
    "type": "api",
    "name": "Google Maps Embed",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemapsembed'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Google maps iframe'),
                width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapsembed';
        tarteaucitron.fallback(['googlemapsembed'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// google tag manager
tarteaucitron.services.googletagmanager = {
    "key": "googletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + tarteaucitron.user.googletagmanagerId);
    }
};

// google tag manager multiple
tarteaucitron.services.multiplegoogletagmanager = {
    "key": "multiplegoogletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.multiplegoogletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });

        tarteaucitron.user.multiplegoogletagmanagerId.forEach(function (id) {
            tarteaucitron.addScript('https://www.googletagmanager.com/gtm.js?id=' + id);
        });

    }
};

// google webfonts
tarteaucitron.services.googlefonts = {
    "key": "googlefonts",
    "type": "api",
    "name": "Google Webfonts",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.googleFonts === undefined) {
            return;
        }
        tarteaucitron.addScript('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', function () {
            WebFont.load({
                google: {
                    families: tarteaucitron.user.googleFonts
                }
            });
        });
    }
};

// hubspot
tarteaucitron.services.hubspot = {
    "key": "hubspot",
    "type": "analytic",
    "name": "Hubspot",
    "uri": "https://legal.hubspot.com/privacy-policy",
    "needConsent": true,
    "cookies": ['hubspotutk', 'fr', '__hstc', '__hssrc', '__hssc', '__cfduid'],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//js.hs-scripts.com/' + tarteaucitron.user.hubspotId + '.js', 'hs-script-loader');
    }
};

// instagram
tarteaucitron.services.instagram = {
    "key": "instagram",
    "type": "social",
    "name": "Instagram",
    "uri": "https://www.instagram.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['shbts', 'sessionid', 'csrftoken', 'rur', 'shbid', 'mid', 'ds_usr_id', 'ig_did', 'ig_cb', 'datr'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['instagram_post'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Instagram iframe'),
                post_id = x.getAttribute('postId'),
                post_permalink = x.getAttribute('data-instgrm-permalink'),
                embed_width = x.getAttribute('width'),
                embed_height = x.getAttribute('height'),
                frame_width,
                frame_height,
                post_frame;

            if (post_permalink != null) {
                tarteaucitron.addScript('//www.instagram.com/embed.js', 'instagram-embed');

                return '';
            }

            if (post_id === undefined) {
                return "";
            }

            if (embed_width !== undefined) {
                frame_width = 'width="' + embed_width + '" ';
            } else {
                frame_width = '"" ';
            }
            if (embed_height !== undefined) {
                frame_height = 'height="' + embed_height + '" ';
            } else {
                frame_height = '"" ';
            }

            post_frame = '<iframe title="' + frame_title + '" src="//www.instagram.com/' + post_id + '/embed" ' + frame_width + frame_height + '></iframe>';

            return post_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'instagram';
        tarteaucitron.fallback(['instagram_post'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// jsapi
tarteaucitron.services.jsapi = {
    "key": "jsapi",
    "type": "api",
    "name": "Google jsapi",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('//www.google.com/jsapi');
    }
};

// twitterwidgetsapi
tarteaucitron.services.twitterwidgetsapi = {
    "key": "twitterwidgetsapi",
    "type": "api",
    "name": "Twitter Widgets API",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterAPI'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterwidgetsapi';
        tarteaucitron.fallback(['tacTwitterAPI'], tarteaucitron.engage(id));
    }
};

// recaptcha
tarteaucitron.services.recaptcha = {
    "key": "recaptcha",
    "type": "api",
    "name": "reCAPTCHA",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        window.tacRecaptchaOnLoad = tarteaucitron.user.recaptchaOnLoad || function () { };
        tarteaucitron.fallback(['g-recaptcha'], '');

        if (tarteaucitron.user.recaptchaapi === undefined) {
            tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad');
        } else {
            tarteaucitron.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad&render=' + tarteaucitron.user.recaptchaapi);
        }

    },
    "fallback": function () {
        "use strict";
        var id = 'recaptcha';
        tarteaucitron.fallback(['g-recaptcha'], tarteaucitron.engage(id));
    }
};

// linkedin
tarteaucitron.services.linkedin = {
    "key": "linkedin",
    "type": "social",
    "name": "Linkedin",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacLinkedin'], '');
        tarteaucitron.addScript('//platform.linkedin.com/in.js');
        if (tarteaucitron.isAjax === true) {
            if (typeof IN !== "undefined") {
                IN.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'linkedin';
        tarteaucitron.fallback(['tacLinkedin'], tarteaucitron.engage(id));
    }
};

// mautic
tarteaucitron.services.mautic = {
    "key": "mautic",
    "type": "analytic",
    "name": "Mautic",
    "uri": "https://www.mautic.org/privacy-policy/",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.mauticurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.mauticurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// microsoftcampaignanalytics
tarteaucitron.services.microsoftcampaignanalytics = {
    "key": "microsoftcampaignanalytics",
    "type": "analytic",
    "name": "Microsoft Campaign Analytics",
    "uri": "https://privacy.microsoft.com/privacystatement/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.microsoftcampaignanalyticsUUID === undefined) {
            return;
        }

        tarteaucitron.addScript('//flex.atdmt.com/mstag/site/' + tarteaucitron.user.microsoftcampaignanalyticsUUID + '/mstag.js', 'mstag_tops', function () {
            window.mstag = { loadTag: function () { }, time: (new Date()).getTime() };
            window.mstag.loadTag("analytics", { dedup: "1", domainId: tarteaucitron.user.microsoftcampaignanalyticsdomainId, type: "1", actionid: tarteaucitron.user.microsoftcampaignanalyticsactionId });
        });
    }
};

// onesignal
tarteaucitron.services.onesignal = {
    "key": "onesignal",
    "type": "api",
    "name": "OneSignal",
    "uri": "https://onesignal.com/privacy_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.onesignalAppId === undefined) {
            return;
        }
        window.OneSignal = window.OneSignal || [];

        window.OneSignal.push(function () {
            window.OneSignal.init({
                appId: tarteaucitron.user.onesignalAppId,
            });
        });

        tarteaucitron.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');
    }
};

// pinterest
tarteaucitron.services.pinterest = {
    "key": "pinterest",
    "type": "social",
    "name": "Pinterest",
    "uri": "https://about.pinterest.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacPinterest'], '');
        tarteaucitron.addScript('//assets.pinterest.com/js/pinit.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'pinterest';
        tarteaucitron.fallback(['tacPinterest'], tarteaucitron.engage(id));
    }
};

// prelinker
tarteaucitron.services.prelinker = {
    "key": "prelinker",
    "type": "ads",
    "name": "Prelinker",
    "uri": "http://www.prelinker.com/index/index/cgu/",
    "needConsent": true,
    "cookies": ['_sp_id.32f5', '_sp_ses.32f5'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['prelinker-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" siteId="' + x.getAttribute('siteId') + '" bannerId="' + x.getAttribute('bannerId') + '" defaultLanguage="' + x.getAttribute('defaultLanguage') + '" tracker="' + x.getAttribute('tracker') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://promo.easy-dating.org/banner/index?';
            uri += 'site_id=' + document.getElementById(uniqIds[i]).getAttribute('siteId') + '&';
            uri += 'banner_id=' + document.getElementById(uniqIds[i]).getAttribute('bannerId') + '&';
            uri += 'default_language=' + document.getElementById(uniqIds[i]).getAttribute('defaultLanguage') + '&';
            uri += 'tr4ck=' + document.getElementById(uniqIds[i]).getAttribute('trackrt');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'prelinker';
        tarteaucitron.fallback(['prelinker-canvas'], tarteaucitron.engage(id));
    }
};

// prezi
tarteaucitron.services.prezi = {
    "key": "prezi",
    "type": "video",
    "name": "Prezi",
    "uri": "https://prezi.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['prezi-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Prezi iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'https://prezi.com/embed/' + id + '/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0';

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'prezi';
        tarteaucitron.fallback(['prezi-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// pubdirecte
tarteaucitron.services.pubdirecte = {
    "key": "pubdirecte",
    "type": "ads",
    "name": "Pubdirecte",
    "uri": "http://pubdirecte.com/contact.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['pubdirecte-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" pid="' + x.getAttribute('pid') + '" ref="' + x.getAttribute('ref') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//www.pubdirecte.com/script/banniere.php?';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('pid') + '&';
            uri += 'ref=' + document.getElementById(uniqIds[i]).getAttribute('ref');

            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'pubdirecte';
        tarteaucitron.fallback(['pubdirecte-canvas'], tarteaucitron.engage(id));
    }
};

// purechat
tarteaucitron.services.purechat = {
    "key": "purechat",
    "type": "support",
    "name": "PureChat",
    "uri": "https://www.purechat.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.purechatId === undefined) {
            return;
        }

        tarteaucitron.addScript('//app.purechat.com/VisitorWidget/WidgetScript', '', function () {
            try {
                window.w = new PCWidget({ c: tarteaucitron.user.purechatId, f: true });
            } catch (e) { }
        });
    }
};

// Intercom
// // SQLI - This not used service code caused issues on IE browser
// tarteaucitron.services.intercomChat = {
//     "key": "intercomChat",
//     "type": "support",
//     "name": "Intercom",
//     "uri": "https://www.intercom.com/",
//     "needConsent": true,
//     "cookies": [
//         "intercom-id-" + tarteaucitron.user.intercomKey,
//         "intercom-session-" + tarteaucitron.user.intercomKey,
//     ],
//     "readmoreLink": "https://www.intercom.com/legal/privacy",
//     "js": function () {
//         window.intercomSettings = {
//             app_id: tarteaucitron.user.intercomKey,
//         };
//
//         var w = window;
//         var ic = w.Intercom;
//         if (typeof ic === "function") {
//             ic("reattach_activator");
//             ic("update", w.intercomSettings);
//         } else {
//             var i = function () {
//                 i.c(arguments);
//             };
//             i.q = [];
//             i.c = function (args) {
//                 i.q.push(args);
//             };
//             w.Intercom = i;
//             tarteaucitron.addScript(
//                 "https://widget.intercom.io/widget/" + tarteaucitron.user.intercomKey,
//                 "",
//                 function () {
//                     // Execute callback if function `intercomChatEnable`
//                     // is defined
//                     if (typeof intercomChatEnable === 'function') {
//                         intercomChatEnable()
//                     }
//                 },
//             );
//         }
//     },
//     "fallback": function () {
//         "use strict";
//         var id = "intercomChat";
//         tarteaucitron.fallback(
//             ["intercom-chat"],
//             function () {
//                 // Execute callback if function `intercomChatDisable`
//                 // is defined
//                 if (typeof intercomChatDisable === 'function') {
//                     intercomChatDisable()
//                 }
//                 return tarteaucitron.engage(id)
//             }
//         );
//     },
// };

// rumbletalk
tarteaucitron.services.rumbletalk = {
    "key": "rumbletalk",
    "type": "social",
    "name": "RumbleTalk",
    "needConsent": true,
    "cookies": ['AWSALB'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.rumbletalkid === undefined) {
            return;
        }

        tarteaucitron.addScript('https://rumbletalk.com/client/?' + tarteaucitron.user.rumbletalkid);

        tarteaucitron.fallback(['rumbletalk'], function (x) {
            var width = tarteaucitron.getElemWidth(x),
                height = tarteaucitron.getElemHeight(x),
                id = x.getAttribute("data-id");

            return '<div style="height: ' + height + 'px; width: ' + width + 'px;"><div id="' + id + '"></div></div>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'rumbletalk';
        tarteaucitron.fallback(['rumbletalk'], function (elem) {
            elem.style.width = tarteaucitron.getElemWidth(elem) + 'px';
            elem.style.height = tarteaucitron.getElemHeight(elem) + 'px';

            return tarteaucitron.engage(id);
        });
    }
};

// shareaholic
tarteaucitron.services.shareaholic = {
    "key": "shareaholic",
    "type": "social",
    "name": "Shareaholic",
    "uri": "https://shareaholic.com/privacy/choices",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.shareaholicSiteId === undefined) {
            return;
        }

        tarteaucitron.fallback(['shareaholic-canvas'], '');
        tarteaucitron.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
            try {
                Shareaholic.init(tarteaucitron.user.shareaholicSiteId);
            } catch (e) { }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'shareaholic';
        tarteaucitron.fallback(['shareaholic-canvas'], tarteaucitron.engage(id));
    }
};

// shareasale
tarteaucitron.services.shareasale = {
    "key": "shareasale",
    "type": "ads",
    "name": "ShareASale",
    "uri": "https://www.shareasale.com/PrivacyPolicy.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        tarteaucitron.fallback(['shareasale-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" amount="' + x.getAttribute('amount') + '" tracking="' + x.getAttribute('tracking') + '" transtype="' + x.getAttribute('transtype') + '" persale="' + x.getAttribute('persale') + '" perlead="' + x.getAttribute('perlead') + '" perhit="' + x.getAttribute('perhit') + '" merchantID="' + x.getAttribute('merchantID') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://shareasale.com/sale.cfm?';
            uri += 'amount=' + document.getElementById(uniqIds[i]).getAttribute('amount') + '&';
            uri += 'tracking=' + document.getElementById(uniqIds[i]).getAttribute('tracking') + '&';
            uri += 'transtype=' + document.getElementById(uniqIds[i]).getAttribute('transtype') + '&';
            uri += 'persale=' + document.getElementById(uniqIds[i]).getAttribute('persale') + '&';
            uri += 'perlead=' + document.getElementById(uniqIds[i]).getAttribute('perlead') + '&';
            uri += 'perhit=' + document.getElementById(uniqIds[i]).getAttribute('perhit') + '&';
            uri += 'merchantID=' + document.getElementById(uniqIds[i]).getAttribute('merchantID');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'shareasale';
        tarteaucitron.fallback(['shareasale-canvas'], tarteaucitron.engage(id));
    }
};

// sharethis
tarteaucitron.services.sharethis = {
    "key": "sharethis",
    "type": "social",
    "name": "ShareThis",
    "uri": "http://www.sharethis.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['__unam'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.sharethisPublisher === undefined) {
            return;
        }
        var switchTo5x = true,
            uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';

        tarteaucitron.fallback(['tacSharethis'], '');
        tarteaucitron.addScript(uri, '', function () {
            stLight.options({ publisher: tarteaucitron.user.sharethisPublisher, doNotHash: false, doNotCopy: false, hashAddressBar: false });
        });

        if (tarteaucitron.isAjax === true) {
            if (typeof stButtons !== "undefined") {
                stButtons.locateElements();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'sharethis';
        tarteaucitron.fallback(['tacSharethis'], tarteaucitron.engage(id));
    }
};

// slideshare
tarteaucitron.services.slideshare = {
    "key": "slideshare",
    "type": "video",
    "name": "SlideShare",
    "uri": "https://www.linkedin.com/legal/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['slideshare-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Slideshare iframe'),
                id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//www.slideshare.net/slideshow/embed_code/' + id;

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'slideshare';
        tarteaucitron.fallback(['slideshare-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// soundcloud
tarteaucitron.services.soundcloud = {
    key: 'soundcloud',
    type: 'video',
    name: 'SoundCloud',
    needConsent: true,
    cookies: ['sc_anonymous_id', 'sclocale'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Soundcloud iframe'),
                player_height = x.getAttribute('data-height'),
                frame_height = 'height="' + player_height + '" ',
                playable_id = x.getAttribute('data-playable-id'),
                playable_type = x.getAttribute('data-playable-type'),
                playable_url = x.getAttribute('data-playable-url'),
                color = x.getAttribute('data-color'),
                autoplay = x.getAttribute('data-auto-play'),
                hideRelated = x.getAttribute('data-hide-related'),
                showComments = x.getAttribute('data-show-comments'),
                showUser = x.getAttribute('data-show-user'),
                showReposts = x.getAttribute('data-show-reposts'),
                showTeaser = x.getAttribute('data-show-teaser'),
                visual = x.getAttribute('data-visual'),
                artwork = x.getAttribute('data-artwork');

            var allowAutoplay = autoplay === 'true' ? 'allow="autoplay"' : '';

            if (playable_id === undefined && playable_url === undefined) {
                return "";
            }

            // Allow to embed from API results (playable_type + playable_id)
            var qs = '?url=https%3A//api.soundcloud.com/' + playable_type + '/' + playable_id;
            // Or from raw URL from Soundcloud website
            if (playable_url && playable_url.length > 0) qs = '?url=' + escape(playable_url);

            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (color && color.length > 0) qs += '&color=' + color.replace('#', '%23');
            if (autoplay && autoplay.length > 0) qs += '&auto_play=' + autoplay;
            if (showComments && showComments.length > 0) qs += '&show_comments=' + showComments;
            if (hideRelated && hideRelated.length > 0) qs += '&hide_related=' + hideRelated;
            if (showUser && showUser.length > 0) qs += '&show_user=' + showUser;
            if (showReposts && showReposts.length > 0) qs += '&show_reposts=' + showReposts;
            if (showTeaser && showTeaser.length > 0) qs += '&show_teaser=' + showTeaser;
            if (visual && visual.length > 0) qs += '&visual=' + visual;
            if (artwork && artwork.length > 0) qs += '&show_artwork=' + artwork;

            return '<iframe title="' + frame_title + '" width="100%" ' + frame_height + ' scrolling="no" ' + allowAutoplay + ' src="https://w.soundcloud.com/player/' + qs + '"></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['soundcloud_player'], function (elem) {
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage('soundcloud');
        });
    }
};

// spotify
tarteaucitron.services.spotify = {
    "key": "spotify",
    "type": "video",
    "name": "Spotify",
    "uri": "https://www.spotify.com/us/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['sp_landing', '_ga', 'sp_ab', 'sp_landingref', 'sp_t', 'sp_usid', 'OptanonConsent', 'sp_m', 'spot'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['spotify_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Spotify iframe'),
                spotify_id = x.getAttribute("spotifyID"),
                spotify_width = x.getAttribute("width"),
                frame_width = 'width=',
                spotify_height = x.getAttribute("height"),
                frame_height = 'height=',
                spotify_frame;

            if (spotify_id === undefined) {
                return "";
            }
            if (spotify_width !== undefined) {
                frame_width += '"' + spotify_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (spotify_height !== undefined) {
                frame_height += '"' + spotify_height + '" ';
            } else {
                frame_height += '"" ';
            }
            spotify_frame = '<iframe title="' + frame_title + '" src="//open.spotify.com/embed/' + spotify_id + '" ' + frame_width + frame_height + ' allowfullscreen></iframe>';
            return spotify_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'spotify';
        tarteaucitron.fallback(['spotify_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// statcounter
tarteaucitron.services.statcounter = {
    "key": "statcounter",
    "type": "analytic",
    "name": "StatCounter",
    "uri": "https://fr.statcounter.com/about/legal/#privacy",
    "needConsent": true,
    "cookies": ['sc_is_visitor_unique'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri = '//statcounter.com/counter/counter.js';

        tarteaucitron.fallback(['statcounter-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            tarteaucitron.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'statcounter';
        tarteaucitron.fallback(['statcounter-canvas'], tarteaucitron.engage(id));
    }
};

// timelinejs
tarteaucitron.services.timelinejs = {
    "key": "timelinejs",
    "type": "api",
    "name": "Timeline JS",
    "uri": "http://timeline.knightlab.com/#help",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['timelinejs-canvas'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Twitter iframe'),
                spreadsheet_id = x.getAttribute("spreadsheet_id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                lang = x.getAttribute("lang_2_letter"),
                font = x.getAttribute("font"),
                map = x.getAttribute("map"),
                start_at_end = x.getAttribute("start_at_end"),
                hash_bookmark = x.getAttribute("hash_bookmark"),
                start_at_slide = x.getAttribute("start_at_slide"),
                start_zoom = x.getAttribute("start_zoom"),
                url = '//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=' + spreadsheet_id + '&font=' + font + '&maptype=' + map + '&lang=' + lang + '&start_at_end=' + start_at_end + '&hash_bookmark=' + hash_bookmark + '&start_at_slide=' + start_at_slide + '&start_zoom_adjust=' + start_zoom + '&height=' + height;

            return '<iframe title="' + frame_title + '" src="' + url + '" width="' + width + '" height="' + height + '" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'timelinejs';
        tarteaucitron.fallback(['timelinejs-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// tagcommander
tarteaucitron.services.tagcommander = {
    "key": "tagcommander",
    "type": "api",
    "name": "TagCommander",
    "uri": "https://www.commandersact.com/en/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tagcommanderid === undefined) {
            return;
        }
        tarteaucitron.addScript('https://cdn.tagcommander.com/' + tarteaucitron.user.tagcommanderid + '.js');
    }
};

// typekit
tarteaucitron.services.typekit = {
    "key": "typekit",
    "type": "api",
    "name": "Typekit (adobe)",
    "uri": "https://www.adobe.com/privacy.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.typekitId === undefined) {
            return;
        }
        tarteaucitron.addScript('//use.typekit.net/' + tarteaucitron.user.typekitId + '.js', '', function () {
            try {
                Typekit.load();
            } catch (e) { }
        });
    }
};

// twenga
tarteaucitron.services.twenga = {
    "key": "twenga",
    "type": "ads",
    "name": "Twenga",
    "uri": "http://www.twenga.com/privacy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.twengaId === undefined || tarteaucitron.user.twengaLocale === undefined) {
            return;
        }

        tarteaucitron.addScript('//tracker.twenga.' + tarteaucitron.user.twengaLocale + '/st/tracker_' + tarteaucitron.user.twengaId + '.js');
    }
};

// twitter
tarteaucitron.services.twitter = {
    "key": "twitter",
    "type": "social",
    "name": "Twitter",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitter'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitter';
        tarteaucitron.fallback(['tacTwitter'], tarteaucitron.engage(id));
    }
};

// twitter embed
tarteaucitron.services.twitterembed = {
    "key": "twitterembed",
    "type": "social",
    "name": "Twitter (cards)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            e,
            html;

        tarteaucitron.fallback(['twitterembed-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            html = '<div id="' + uniqId + '" ';
            html += 'tweetid="' + x.getAttribute('tweetid') + '" ';
            html += 'theme="' + x.getAttribute('theme') + '" ';
            html += 'cards="' + x.getAttribute('cards') + '" ';
            html += 'conversation="' + x.getAttribute('conversation') + '" ';
            html += 'data-width="' + x.getAttribute('data-width') + '" ';
            html += 'data-align="' + x.getAttribute('data-align') + '" ';
            html += '></div>';
            return html;
        });

        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs', function () {
            var i;
            for (i = 0; i < uniqIds.length; i += 1) {
                e = document.getElementById(uniqIds[i]);
                twttr.widgets.createTweet(
                    e.getAttribute('tweetid'),
                    e,
                    {
                        theme: e.getAttribute('theme'),
                        cards: e.getAttribute('cards'),
                        conversation: e.getAttribute('conversation'),
                        lang: tarteaucitron.getLanguage(),
                        dnt: true,
                        width: e.getAttribute('data-width'),
                        align: e.getAttribute('data-align')
                    }
                );
            }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterembed';
        tarteaucitron.fallback(['twitterembed-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('data-width') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// twitter timeline
tarteaucitron.services.twittertimeline = {
    "key": "twittertimeline",
    "type": "social",
    "name": "Twitter (timelines)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['tacTwitterTimelines'], '');
        tarteaucitron.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twittertimeline';
        tarteaucitron.fallback(['tacTwitterTimelines'], tarteaucitron.engage(id));
    }
};

// twitter universal website tag
tarteaucitron.services.twitteruwt = {
    "key": "twitteruwt",
    "type": "analytic",
    "name": "Twitter Universal Website Tag",
    "uri": "https://business.twitter.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window.twq = function () {
            window.twq.exe ? window.twq.exe.apply(window.twq, arguments) : window.twq.queue.push(arguments);
        }
        window.twq.version = '1.1';
        window.twq.queue = [];

        tarteaucitron.addScript('https://static.ads-twitter.com/uwt.js', '', function () {
            window.twq('init', tarteaucitron.user.twitteruwtId);
            window.twq('track', 'PageView');
        });
    }
};

// user voice
tarteaucitron.services.uservoice = {
    "key": "uservoice",
    "type": "support",
    "name": "UserVoice",
    "uri": "https://www.uservoice.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userVoiceApi === undefined) {
            return;
        }
        tarteaucitron.addScript('//widget.uservoice.com/' + tarteaucitron.user.userVoiceApi + '.js');
    }
};

// vimeo
tarteaucitron.services.vimeo = {
    "key": "vimeo",
    "type": "video",
    "name": "Vimeo",
    "uri": "https://vimeo.com/privacy",
    "needConsent": true,
    "cookies": ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vimeo_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "data-title") || tarteaucitron.getElemAttr(x, "title") || 'Vimeo iframe'),
                video_width = tarteaucitron.getElemAttr(x, "data-width") || tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "data-height") || tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',

                video_id = tarteaucitron.getElemAttr(x, "data-videoID") || tarteaucitron.getElemAttr(x, "videoID"),
                video_allowfullscreen = tarteaucitron.getElemAttr(x, "data-allowfullscreen"),
                video_autopause = tarteaucitron.getElemAttr(x, "data-autopause") || '',
                video_autoplay = tarteaucitron.getElemAttr(x, "data-autoplay") || tarteaucitron.getElemAttr(x, "autoplay") || '',
                video_background = tarteaucitron.getElemAttr(x, "data-background") || '',
                video_byline = tarteaucitron.getElemAttr(x, "data-byline") || tarteaucitron.getElemAttr(x, "byline") || '',
                video_color = tarteaucitron.getElemAttr(x, "data-color") || '',
                video_controls = tarteaucitron.getElemAttr(x, "data-controls") || '',
                video_loop = tarteaucitron.getElemAttr(x, "data-loop") || tarteaucitron.getElemAttr(x, "loop") || '',
                video_maxheight = tarteaucitron.getElemAttr(x, "data-maxheight") || '',
                video_maxwidth = tarteaucitron.getElemAttr(x, "data-maxwidth") || '',
                video_muted = tarteaucitron.getElemAttr(x, "data-muted") || '',
                video_playsinline = tarteaucitron.getElemAttr(x, "data-playsinline") || '',
                video_portrait = tarteaucitron.getElemAttr(x, "data-portrait") || tarteaucitron.getElemAttr(x, "portrait") || '',
                video_speed = tarteaucitron.getElemAttr(x, "data-speed") || '',
                video_title = tarteaucitron.getElemAttr(x, "data-title") || tarteaucitron.getElemAttr(x, "title") || '',
                video_transparent = tarteaucitron.getElemAttr(x, "data-transparent") || '',

                video_frame;


            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }

            var video_qs = "?";

            if (video_title.length > 0) {
                video_qs += "title=" + video_title;
            }

            if (video_byline.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "byline=" + video_byline;
            }

            if (video_portrait.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "portrait=" + video_portrait;
            }

            if (video_loop.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "loop=" + video_loop;
            }

            if (video_autoplay.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "autoplay=" + video_autoplay;
            }

            if (video_autopause.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "autopause=" + video_autopause;
            }

            if (video_background.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "background=" + video_background;
            }

            if (video_color.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "color=" + video_color;
            }

            if (video_controls.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "controls=" + video_controls;
            }

            if (video_maxheight.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "maxheight=" + video_maxheight;
            }

            if (video_maxwidth.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "maxwidth=" + video_maxwidth;
            }

            if (video_muted.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "muted=" + video_muted;
            }

            if (video_playsinline.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "playsinline=" + video_playsinline;
            }

            if (video_speed.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "speed=" + video_speed;
            }

            if (video_transparent.length > 0) {
                if (video_qs.length > 0) {
                    video_qs += "&";
                }
                video_qs += "transparent=" + video_transparent;
            }

            if (video_qs === "?") {
                video_qs = "";
            }

            video_frame = '<iframe title="' + frame_title + '" src="//player.vimeo.com/video/' + video_id + video_qs + '" ' + frame_width + frame_height + (video_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';

            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'vimeo';
        tarteaucitron.fallback(['vimeo_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// visualrevenue
tarteaucitron.services.visualrevenue = {
    "key": "visualrevenue",
    "type": "analytic",
    "name": "VisualRevenue",
    "uri": "http://www.outbrain.com/legal/privacy-713/",
    "needConsent": true,
    "cookies": ['__vrf', '__vrm', '__vrl', '__vry', '__vru', '__vrid', '__vrz'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.visualrevenueId === undefined) {
            return;
        }
        window._vrq = window._vrq || [];
        window._vrq.push(['id', tarteaucitron.user.visualrevenueId]);
        window._vrq.push(['automate', true]);
        window._vrq.push(['track', function () { }]);
        tarteaucitron.addScript('http://a.visualrevenue.com/vrs.js');
    }
};

// verizon dot tag
tarteaucitron.services.verizondottag = {
    "key": "verizondottag",
    "type": "analytic",
    "name": "Verizon Dot Tag",
    "uri": "https://developer.verizonmedia.com/native/guide/audience-management/dottags/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        window.dotq = window.dotq || [];
        window.dotq.push({
            'projectId': tarteaucitron.user.verizondottagProjectId,
            'properties': { 'pixelId': tarteaucitron.user.verizondottagPixelId }
        });

        tarteaucitron.addScript('https://s.yimg.com/wi/ytc.js', '', function () {
            //const items = window.dotq;
            window.dotq = [];
            window.dotq.push = function (item) {
                YAHOO.ywa.I13N.fireBeacon([item])
            };
            YAHOO.ywa.I13N.fireBeacon(items)
        });
    }
};

// vshop
tarteaucitron.services.vshop = {
    "key": "vshop",
    "type": "ads",
    "name": "vShop",
    "uri": "http://vshop.fr/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['vcashW'], '');
        tarteaucitron.addScript('//vshop.fr/js/w.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'vshop';
        tarteaucitron.fallback(['vcashW'], tarteaucitron.engage(id));
    }
};

// wysistat
tarteaucitron.services.wysistat = {
    "key": "wysistat",
    "type": "analytic",
    "name": "Wysistat",
    "uri": "http://wysistat.net/contact/",
    "needConsent": true,
    "cookies": ['Wysistat'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.wysistat === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.wysistat.com/statistique.js', '', function () {
            window.stat(tarteaucitron.user.wysistat.cli, tarteaucitron.user.wysistat.frm, tarteaucitron.user.wysistat.prm, tarteaucitron.user.wysistat.ce, tarteaucitron.user.wysistat.page, tarteaucitron.user.wysistat.roi, tarteaucitron.user.wysistat.prof, tarteaucitron.user.wysistat.cpt);
        });
    }
};

// xiti
tarteaucitron.services.xiti = {
    "key": "xiti",
    "type": "analytic",
    "name": "Xiti",
    "uri": "https://helpcentre.atinternet-solutions.com/hc/fr/categories/360002439300-Privacy-Centre",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xitiId === undefined) {
            return;
        }
        var Xt_param = 's=' + tarteaucitron.user.xitiId + '&p=',
            Xt_r,
            Xt_h,
            Xt_i,
            Xt_s,
            div = document.createElement('div');
        try {
            Xt_r = top.document.referrer;
        } catch (e) {
            Xt_r = document.referrer;
        }
        Xt_h = new Date();
        Xt_i = '<img style="display:none" border="0" alt="" ';
        Xt_i += 'src="http://logv3.xiti.com/hit.xiti?' + Xt_param;
        Xt_i += '&hl=' + Xt_h.getHours() + 'x' + Xt_h.getMinutes() + 'x' + Xt_h.getSeconds();
        if (parseFloat(navigator.appVersion) >= 4) {
            Xt_s = screen;
            Xt_i += '&r=' + Xt_s.width + 'x' + Xt_s.height + 'x' + Xt_s.pixelDepth + 'x' + Xt_s.colorDepth;
        }

        div.innerHTML = Xt_i + '&ref=' + Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$') + '" title="Internet Audience">';
        document.getElementsByTagName('body')[0].appendChild(div.firstChild);

        if (typeof tarteaucitron.user.xitiMore === 'function') {
            tarteaucitron.user.xitiMore();
        }
    }
};

// AT Internet
tarteaucitron.services.atinternet = {
    "key": "atinternet",
    "type": "analytic",
    "name": "AT Internet (privacy by design)",
    "uri": "https://helpcentre.atinternet-solutions.com/hc/fr/categories/360002439300-Privacy-Centre",
    "needConsent": true,
    "safeanalytic": false,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        if (tarteaucitron.user.atinternetAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (typeof window.tag.privacy !== 'undefined') {
                window.tag.privacy.setVisitorOptin();
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        tarteaucitron.user.atinternetAlreadyLoaded = true;

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            window.tag = new ATInternet.Tracker.Tag();

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }

            if (typeof window.tag.privacy !== 'undefined') {

                var visitorMode = window.tag.privacy.getVisitorMode();
                if (visitorMode !== null && visitorMode.name !== undefined && visitorMode.name == "optout") {
                    window.tag.privacy.setVisitorOptout();
                } else {
                    window.tag.privacy.setVisitorMode('cnil', 'exempt');
                }
            }

            if (tarteaucitron.user.atinternetSendData !== false) {
                window.tag.page.send();
            }
        });
    }
};

// AT Internet
tarteaucitron.services.atinternethightrack = {
    "key": "atinternethightrack",
    "type": "analytic",
    "name": "AT Internet",
    "uri": "https://helpcentre.atinternet-solutions.com/hc/fr/categories/360002439300-Privacy-Centre",
    "needConsent": true,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.atLibUrl === undefined) {
            return;
        }

        tarteaucitron.addScript(tarteaucitron.user.atLibUrl, '', function () {

            var tag = new ATInternet.Tracker.Tag();

            if (typeof tarteaucitron.user.atMore === 'function') {
                tarteaucitron.user.atMore();
            }
        })
    }
};

// youtube
tarteaucitron.services.youtube = {
    "key": "youtube",
    "type": "video",
    "name": "YouTube",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe'),
                video_id = tarteaucitron.getElemAttr(x, "videoID"),
                srcdoc = tarteaucitron.getElemAttr(x, "srcdoc"),
                loading = tarteaucitron.getElemAttr(x, "loading"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                attrs = ["theme", "rel", "controls", "showinfo", "autoplay", "mute", "start", "loop"],
                params = attrs.filter(function (a) {

                  return tarteaucitron.getElemAttr(x, a) !== null;
                }).map(function (a) {
                  return a + "=" + tarteaucitron.getElemAttr(x, a);
               }).join("&");


            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }

            if (srcdoc !== undefined && srcdoc !== null && srcdoc !== "") {
                srcdoc = 'srcdoc="' + srcdoc + '" ';
            } else {
                srcdoc = '';
            }

            if (loading !== undefined && loading !== null && loading !== "") {
                loading = 'loading ';
            } else {
                loading = '';
            }

            video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + ' ' + srcdoc + ' ' + loading + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtube';
        tarteaucitron.fallback(['youtube_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// youtube playlist
tarteaucitron.services.youtubeplaylist = {
    "key": "youtubeplaylist",
    "type": "video",
    "name": "YouTube (playlist)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['youtube_playlist_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(tarteaucitron.getElemAttr(x, "title") || 'Youtube iframe'),
                playlist_id = tarteaucitron.getElemAttr(x, "playlistID"),
                video_width = tarteaucitron.getElemAttr(x, "width"),
                frame_width = 'width=',
                video_height = tarteaucitron.getElemAttr(x, "height"),
                frame_height = 'height=',
                video_frame,
                allowfullscreen = tarteaucitron.getElemAttr(x, "allowfullscreen"),
                params = 'theme=' + tarteaucitron.getElemAttr(x, "theme") + '&rel=' + tarteaucitron.getElemAttr(x, "rel") + '&controls=' + tarteaucitron.getElemAttr(x, "controls") + '&showinfo=' + tarteaucitron.getElemAttr(x, "showinfo") + '&autoplay=' + tarteaucitron.getElemAttr(x, "autoplay") + '&mute=' + tarteaucitron.getElemAttr(x, "mute");

            if (playlist_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/videoseries?list=' + playlist_id + '&' + params + '"' + (allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtubeplaylist';
        tarteaucitron.fallback(['youtube_playlist_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// zopim
tarteaucitron.services.zopim = {
    "key": "zopim",
    "type": "support",
    "name": "Zopim",
    "uri": "https://www.zopim.com/privacy",
    "needConsent": true,
    "cookies": ['__zlcid', '__zprivacy'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.zopimID === undefined) {
            return;
        }
        tarteaucitron.addScript('//v2.zopim.com/?' + tarteaucitron.user.zopimID);
    }
};

// kameleoon
tarteaucitron.services.kameleoon = {
    "key": "kameleoon",
    "type": "analytic",
    "name": "Kameleoon",
    "uri": "https://www.kameleoon.com/fr/compliance/rgpd",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kameleoon !== undefined) {
            tarteaucitron.addScript("https://" + tarteaucitron.user.kameleoon + ".kameleoon.eu/kameleoon.js");
        }
    }
};

// linkedin insight
tarteaucitron.services.linkedininsighttag = {
    "key": "linkedininsighttag",
    "type": "ads",
    "name": "Linkedin Insight",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.linkedininsighttag !== undefined) {
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(tarteaucitron.user.linkedininsighttag);
        }

        tarteaucitron.addScript('https://snap.licdn.com/li.lms-analytics/insight.min.js');
    }
};

// xiti smartTag
tarteaucitron.services.xiti_smarttag = {
    "key": "xiti_smarttag",
    "type": "analytic",
    "name": "Xiti (SmartTag)",
    "uri": "https://helpcentre.atinternet-solutions.com/hc/fr/categories/360002439300-Privacy-Centre",
    "needConsent": true,
    "cookies": ["atidvisitor", "atreman", "atredir", "atsession", "attvtreman", "attvtsession"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.xiti_smarttagLocalPath !== undefined) {
            tarteaucitron.addScript(tarteaucitron.user.xiti_smarttagLocalPath, 'smarttag', null, null, "onload", "addTracker();");
        } else {
            var xitiSmarttagId = tarteaucitron.user.xiti_smarttagSiteId;
            if (xitiSmarttagId === undefined) {
                return;
            }

            tarteaucitron.addScript('//tag.aticdn.net/' + xitiSmarttagId + '/smarttag.js', 'smarttag', null, null, "onload", "addTracker();");
        }
    }
};

// facebook pixel
tarteaucitron.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://www.facebook.com/policy.php",
    "needConsent": true,
    "cookies": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src'],
    "js": function () {
        "use strict";
        var n;
        if (window.fbq) return;
        n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        tarteaucitron.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', tarteaucitron.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof tarteaucitron.user.facebookpixelMore === 'function') {
            tarteaucitron.user.facebookpixelMore();
        }
    }
};

//Issuu
tarteaucitron.services.issuu = {
    "key": "issuu",
    "type": "other",
    "name": "Issuu",
    "uri": "https://issuu.com/legal/privacy",
    "needConsent": true,
    "cookies": ['__qca', 'iutk', 'mc'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['issuu_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Issuu iframe'),
                issuu_id = x.getAttribute("issuuID"),
                issuu_width = x.getAttribute("width"),
                frame_width = 'width=',
                issuu_height = x.getAttribute("height"),
                frame_height = 'height=',
                issuu_frame,
                issuu_embed;

            if (issuu_id === undefined) {
                return "";
            }
            if (issuu_width !== undefined) {
                frame_width += '"' + issuu_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (issuu_height !== undefined) {
                frame_height += '"' + issuu_height + '" ';
            } else {
                frame_height += '"" ';
            }


            if (issuu_id.match(/\d+\/\d+/)) { issuu_embed = '#' + issuu_id; } else if (issuu_id.match(/d=(.*)&u=(.*)/)) { issuu_embed = '?' + issuu_id; }


            issuu_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="//e.issuu.com/embed.html' + issuu_embed + '"></iframe>';

            return issuu_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'issuu';
        tarteaucitron.fallback(['issuu_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// webmecanik
tarteaucitron.services.webmecanik = {
    "key": "webmecanik",
    "type": "analytic",
    "name": "Webmecanik",
    "uri": "https://webmecanik.com/tos",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.webmecanikurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        tarteaucitron.addScript(tarteaucitron.user.webmecanikurl, '', function () {
            mt('send', 'pageview');
        });
    }
};

// google analytics multiple
tarteaucitron.services.multiplegtag = {
    "key": "multiplegtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": (function () {

        var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                cookies.push('_gat_gtag_' + ua.replace(/-/g, '_'));
                cookies.push('_ga_' + ua.replace(/G-/g, ''));
            });
        }

        return cookies;
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];

        if (tarteaucitron.user.multiplegtagUa !== undefined) {
            tarteaucitron.user.multiplegtagUa.forEach(function (ua) {
                tarteaucitron.addScript('https://www.googletagmanager.com/gtag/js?id=' + ua, '', function () {
                    window.gtag = function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    gtag('config', ua, { 'anonymize_ip': true });
                });
            });
        }
    }
};

// Koban
tarteaucitron.services.koban = {
    "key": "koban",
    "type": "analytic",
    "name": "Koban",
    "uri": "https://koban.cloud/tos",
    "needConsent": true,
    "cookies": ['kbntrk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.kobanurl === undefined) {
            return;
        }
        if (tarteaucitron.user.kobanapi === undefined) {
            return;
        }
        window.KobanObject = 'kb';
        window.kb = window.kb || function () {
            window.kb.q = window.kb.q || [];
            window.kb.q.push(arguments);
        };
        window.kb.l = new Date();
        kb('reg', tarteaucitron.user.kobanapi);
        tarteaucitron.addScript(tarteaucitron.user.kobanurl, '', function () {
        });
    }
};

// matomo

/*
    1. Set the following variable before the initialization :

    tarteaucitron.user.matomoId = YOUR_SITE_ID_FROM_MATOMO;
    tarteaucitron.user.matomoHost = "YOUR_MATOMO_URL"; //eg: https://stat.mydomain.com/

    2. Push the service :

    (tarteaucitron.job = tarteaucitron.job || []).push('matomo');

    3. HTML
    You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.matomo = {
    "key": "matomo",
    "type": "analytic",
    "name": "Matomo (privacy by design)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["setDoNotTrack", 1]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
            function getOriginalVisitorCookieTimeout() {
                var now = new Date(),
                    nowTs = Math.round(now.getTime() / 1000),
                    visitorInfo = self.getVisitorInfo();
                var createTs = parseInt(visitorInfo[2]);
                var cookieTimeout = 33696000; // 13 mois en secondes
                var originalTimeout = createTs + cookieTimeout - nowTs;
                return originalTimeout;
            }
            this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)

            // make piwik/matomo cookie accessible by getting tracker
            Piwik.getTracker();

            // looping throught cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a piwik one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};


tarteaucitron.services.matomohightrack = {
    "key": "matomohightrack",
    "type": "analytic",
    "name": "Matomo",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", tarteaucitron.user.matomoId]);
        window._paq.push(["setTrackerUrl", tarteaucitron.user.matomoHost + "piwik.php"]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function () {
            var self = this;
        }]);

        tarteaucitron.addScript(tarteaucitron.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function () {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)
            Piwik.getTracker();

            var theCookies = document.cookie.split(';');
            for (var i = 1; i <= theCookies.length; i++) {
                var cookie = theCookies[i - 1].split('=');
                var cookieName = cookie[0].trim();

                if (cookieName.indexOf('_pk_') === 0) {
                    tarteaucitron.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};

// Hotjar
/*
   1. Set the following variable before the initialization :
    tarteaucitron.user.hotjarId = YOUR_WEBSITE_ID;
   tarteaucitron.user.HotjarSv = XXXX; // Can be found in your website tracking code as "hjvs=XXXX"
    2. Push the service :
    (tarteaucitron.job = tarteaucitron.job || []).push('hotjar');
    3. HTML
   You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
 */
tarteaucitron.services.hotjar = {
    "key": "hotjar",
    "type": "analytic",
    "name": "Hotjar",
    "uri": "https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar",
    "needConsent": true,
    "cookies": ["hjClosedSurveyInvites", "_hjDonePolls", "_hjMinimizedPolls", "_hjDoneTestersWidgets", "_hjMinimizedTestersWidgets", "_hjDoneSurveys", "_hjIncludedInSample", "_hjShownFeedbackMessage", "_hjAbsoluteSessionInProgress", "_hjIncludeInPageviewSample", "_hjid"],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.hotjarId === undefined || tarteaucitron.user.HotjarSv === undefined) {
            return;
        }
        window.hj = window.hj || function () {
            (window.hj.q = window.hj.q || []).push(arguments)
        };
        window._hjSettings = {
            hjid: tarteaucitron.user.hotjarId,
            hjsv: tarteaucitron.user.HotjarSv
        };
        var uri = 'https://static.hotjar.com/c/hotjar-';
        var extension = '.js?sv=';
        tarteaucitron.addScript(uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv);
    }
};

// bing ads universal event tracking
tarteaucitron.services.bingads = {
    'key': 'bingads',
    'type': 'ads',
    'name': 'Bing Ads Universal Event Tracking',
    'uri': 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
    'needConsent': true,
    'cookies': ['_uetmsclkid', '_uetvid', '_uetsid'],
    'js': function () {
        'use strict';
        //var u = tarteaucitron.user.bingadsTag || 'uetq';
        window.uetq = window.uetq || [];

        tarteaucitron.addScript('https://bat.bing.com/bat.js', '', function () {
            var bingadsCreate = { ti: tarteaucitron.user.bingadsID };

            if ('bingadsStoreCookies' in tarteaucitron.user) {
                bingadsCreate['storeConvTrackCookies'] = tarteaucitron.user.bingadsStoreCookies;
            }

            bingadsCreate.q = window.uetq;
            window.uetq = new UET(bingadsCreate);
            window.uetq.push('pageLoad');

            if (typeof tarteaucitron.user.bingadsMore === 'function') {
                tarteaucitron.user.bingadsMore();
            }
        });
    }
};

//Matterport
tarteaucitron.services.matterport = {
    "key": "matterport",
    "type": "other",
    "name": "Matterport",
    "uri": "https://matterport.com/es/legal/privacy-policy/",
    "needConsent": true,
    "cookies": ['__cfduid', 'ajs_anonymous_id', 'ajs_group_id', 'ajs_user_id'],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['matterport'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Matterport iframe'),
                matterport_id = x.getAttribute("matterportID"),
                matterport_width = x.getAttribute("width"),
                frame_width = 'width=',
                matterport_height = x.getAttribute("height"),
                frame_height = 'height=',
                matterport_parameters = x.getAttribute("parameters"),
                matterport_allowfullscreen = x.getAttribute('allowfullscreen'),
                matterport_frame;

            if (matterport_id === undefined) {
                return "";
            }
            if (matterport_width !== undefined) {
                frame_width += '"' + matterport_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (matterport_height !== undefined) {
                frame_height += '"' + matterport_height + '" ';
            } else {
                frame_height += '"" ';
            }
            if (matterport_parameters === undefined) {
                return "";
            }

            matterport_frame = '<iframe title="' + frame_title + '" type="text/html" ' + frame_width + frame_height + ' src="https://my.matterport.com/show/?m=' + matterport_id + '&utm_source=hit-content' + matterport_parameters + '"' + (matterport_allowfullscreen == '0' ? '' : ' webkitallowfullscreen mozallowfullscreen allowfullscreen') + '></iframe>';
            return matterport_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'matterport';
        tarteaucitron.fallback(['matterport'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Adform
tarteaucitron.services.adform = {
    "key": "adform",
    "type": "ads",
    "name": "Adform",
    "uri": "https://site.adform.com/privacy-center/overview/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.adformpm === undefined || tarteaucitron.user.adformpagename === undefined) {
            return;
        }

        window._adftrack = {
            pm: tarteaucitron.user.adformpm,
            divider: encodeURIComponent('|'),
            pagename: encodeURIComponent(tarteaucitron.user.adformpagename)
        };

        tarteaucitron.addScript("https://track.adform.net/serving/scripts/trackpoint/async/");
    }
};

// Active Campaign
tarteaucitron.services.activecampaign = {
    "key": "activecampaign",
    "type": "ads",
    "name": "Active Campaign",
    "uri": "https://www.activecampaign.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.actid === undefined) {
            return;
        }

        window.trackcmp_email = '';

        tarteaucitron.addScript('https://trackcmp.net/visit?actid=' + tarteaucitron.user.actid + '&e=' + encodeURIComponent(trackcmp_email) + '&r=' + encodeURIComponent(document.referrer) + '&u=' + encodeURIComponent(window.location.href));
    }
};

// tawk.to
tarteaucitron.services.tawkto = {
    "key": "tawkto",
    "type": "support",
    "name": "Tawk.to chat",
    "uri": "https://www.tawk.to/data-protection/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.tawktoId === undefined) {
            return;
        }

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        tarteaucitron.addScript('https://embed.tawk.to/' + tarteaucitron.user.tawktoId + '/default');
    }

};

// getquanty
tarteaucitron.services.getquanty = {
    "key": "getquanty",
    "type": "analytic",
    "name": "GetQuanty",
    "uri": "https://www.getquanty.com/mentions-legales/",
    "needConsent": true,
    "cookies": ['_first_pageview', 'eqy_sessionid', 'eqy_siteid', 'cluid', 'eqy_company', 'cluid', 'gq_utm', '_jsuid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        if (tarteaucitron.user.getquantyAlreadyLoaded !== undefined) {
            return;
        }

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&consent=1');
    },
    "fallback": function () {
        "use strict";
        if (tarteaucitron.user.getguanty === undefined) {
            return;
        }

        tarteaucitron.user.getquantyAlreadyLoaded = true;

        tarteaucitron.addScript('https://get.smart-data-systems.com/gq?site_id=' + tarteaucitron.user.getguanty + '&notrack=1');
    }
};

// emolytics
tarteaucitron.services.emolytics = {
    "key": "emolytics",
    "type": "analytic",
    "name": "Emolytics",
    "uri": "https://www.emolytics.com/main/privacy-policy.php",
    "needConsent": true,
    "cookies": ['__hssc', '__hssrc', '__hstc', '_ga', '_gid', 'hubspotutk', 'lang', 'incap_ses_', 'nlbi_', 'visid_incap_'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.emolyticsID === undefined) {
            return;
        }
        var scriptEmolytics = document.createElement('script');
        scriptEmolytics.text = 'var getsmily_id="' + tarteaucitron.user.emolyticsID + '";';
        document.getElementsByTagName('body')[0].appendChild(scriptEmolytics);
        tarteaucitron.addScript('https://cdn.emolytics.com/script/emolytics-widget.js')
    }
};

// youtubeapi
tarteaucitron.services.youtubeapi = {
    "key": "youtubeapi",
    "type": "video",
    "name": "Youtube (Js API)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.addScript('https://www.youtube.com/player_api');
    }
};

// Facil'ITI
tarteaucitron.services.faciliti = {
    "key": "faciliti",
    "type": "other",
    "name": "Facil'ITI",
    "uri": "https://ws.facil-iti.com/mentions-legales.html",
    "needConsent": true,
    "cookies": ['FACIL_ITI_LS'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.facilitiID === undefined) {
            return;
        }

        (function (w, d, s, f) {
            w[f] = w[f] || { conf: function () { (w[f].data = w[f].data || []).push(arguments); } };
            var l = d.createElement(s), e = d.getElementsByTagName(s)[0];
            l.async = 1; l.src = 'https://ws.facil-iti.com/tag/faciliti-tag.min.js'; e.parentNode.insertBefore(l, e);
        }(window, document, 'script', 'FACIL_ITI'));
        FACIL_ITI.conf('userId', tarteaucitron.user.facilitiID);
    }
};

// userlike
tarteaucitron.services.userlike = {
    "key": "userlike",
    "type": "support",
    "name": "Userlike",
    "uri": "https://www.userlike.com/en/terms#privacy-policy",
    "needConsent": true,
    "cookies": ['uslk_s', 'uslk_e'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.userlikeKey === undefined) {
            return;
        }
        tarteaucitron.addScript('//userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/' + tarteaucitron.user.userlikeKey);
    }
};

// adobeanalytics
tarteaucitron.services.adobeanalytics = {
    "key": "adobeanalytics",
    "type": "analytic",
    "name": "Adobe Analytics",
    "uri": "https://www.adobe.com/privacy/policy.html",
    "needConsent": true,
    "cookies": ['s_ecid', 's_cc', 's_sq', 's_vi', 's_fid'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.adobeanalyticskey === undefined) {
            return;
        }
        tarteaucitron.addScript('//assets.adobedtm.com/launch-' + tarteaucitron.user.adobeanalyticskey + '.min.js');
    }
};

// woopra customer journey analytics
tarteaucitron.services.woopra = {
    'key': 'woopra',
    'type': 'analytic',
    'name': 'Woopra Customer Journey Analytics',
    'uri': 'https://www.woopra.com/privacy',
    'needConsent': true,
    'cookies': ['wooTracker', 'intercom-session-erbfalba', 'intercom-id-erbfalba'],
    'js': function () {
        'use strict';
        //var w = tarteaucitron.user.woopraDomain;
        //window[w] = window[w] || [];

        (function () {
            var t, i, e, n = window, o = document, a = arguments, s = "script", r = ["config", "track", "identify", "visit", "push", "call", "trackForm", "trackClick"], c = function () { var t, i = this; for (i._e = [], t = 0; r.length > t; t++)(function (t) { i[t] = function () { return i._e.push([t].concat(Array.prototype.slice.call(arguments, 0))), i } })(r[t]) }; for (n._w = n._w || {}, t = 0; a.length > t; t++)n._w[a[t]] = n[a[t]] = n[a[t]] || new c; i = o.createElement(s), i.async = 1, i.src = "//static.woopra.com/js/w.js", e = o.getElementsByTagName(s)[0], e.parentNode.insertBefore(i, e)
        })("woopra");

        woopra.config({
            domain: tarteaucitron.user.woopraDomain
        });
        woopra.track();
    }
};

// ausha
tarteaucitron.services.ausha = {
    key: "ausha",
    type: "video",
    name: "Ausha",
    uri: "https://www.ausha.co/protection-personal-data/",
    needConsent: true,
    cookies: [],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (x) {
            var player_height = x.getAttribute('data-height'),
                podcast_id = x.getAttribute('data-podcast-id'),
                player_id = x.getAttribute('data-player-id'),
                playlist = x.getAttribute('data-playlist'),
                color = x.getAttribute('data-color');

            if (podcast_id === undefined) {
                return "";
            }

            var src = 'https://player.ausha.co/index.html?podcastId=' + podcast_id + '&v=3';

            if (playlist && playlist.length > 0) src += '&playlist=' + playlist;
            if (color && color.length > 0) src += '&color=' + color.replace('#', '%23');
            if (player_id && player_id.length > 0) src += '&playerId=' + player_id;

            return '<iframe id="' + player_id + '" loading="lazy" width="100%" height="' + player_height + '" scrolling="no" frameborder="no" src="' + src + '"></iframe>';
        });

        tarteaucitron.addScript('//player.ausha.co/ausha-player.js', 'ausha-player');
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['ausha_player'], function (elem) {
            elem.style.height = elem.getAttribute('data-height') + 'px';
            return tarteaucitron.engage('ausha');
        });
    }
};

// visiblee
tarteaucitron.services.visiblee = {
    key: "visiblee",
    type: "analytic",
    name: "Visiblee",
    uri: "http://confidentiality.visiblee.io/fr/confidentialite",
    needConsent: true,
    cookies: ["visitor_v2", tarteaucitron.user.visibleedomain, "check", "campaign_ref_" + tarteaucitron.user.visibleedomain, "reload_" + tarteaucitron.user.visibleedomain],
    js: function () {
        "use strict";

        if (tarteaucitron.user.visibleeclientid === undefined) {
            return;
        }
        tarteaucitron.addScript('//www.link-page.info/tracking_' + tarteaucitron.user.visibleeclientid + '.js', 'visiblee');
    }
};

// bandcamp
tarteaucitron.services.bandcamp = {
    key: "bandcamp",
    type: "video",
    name: "Bandcamp",
    uri: "https://bandcamp.com",
    readmoreLink: "https://bandcamp.com/privacy",
    needConsent: true,
    cookies: ['client_id', 'BACKENDID', '_comm_playlist'],
    js: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (x) {
            var frame_title = tarteaucitron.fixSelfXSS(x.getAttribute("title") || 'Bandcamp iframe'),
                album_id = x.getAttribute("albumID"),
                bandcamp_width = x.getAttribute("width"),
                frame_width = 'width=',
                bandcamp_height = x.getAttribute("height"),
                frame_height = 'height=',
                attrs = ["size", "bgcol", "linkcol", "artwork", "minimal", "tracklist", "package", "transparent"],
                params = attrs.filter(function (a) {
                    return x.getAttribute(a) !== null;
                }).map(function (a) {
                    if (a && a.length > 0) return a + "=" + x.getAttribute(a);
                }).join("/");

            if (album_id === null) {
                return "";
            }

            if (bandcamp_width !== null || bandcamp_width !== "") {
                frame_width += '"' + bandcamp_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (bandcamp_height !== null || bandcamp_height !== "") {
                frame_height += '"' + bandcamp_height + '" ';
            } else {
                frame_height += '"" ';
            }

            var src = 'https://bandcamp.com/EmbeddedPlayer/album=' + album_id + '/' + params;

            return '<iframe title="' + frame_title + '"' + frame_width + frame_height + 'src="' + src + '" frameborder="0" allowfullscreen seamless></iframe>';
        });
    },
    fallback: function () {
        "use strict";
        tarteaucitron.fallback(['bandcamp_player'], function (elem) {
            elem.style.width = elem.getAttribute('width');
            elem.style.height = elem.getAttribute('height');
            return tarteaucitron.engage('bandcamp');
        });
    }
};

// Discord Widget
tarteaucitron.services.discord = {
    "key": "discord",
    "type": "social",
    "name": "Discord (Server Widget)",
    "needConsent": true,
    "cookies": ["__cfruid", "__dcfduid", "_ga", "_gcl_au", "OptanonConsent", "locale", "_gid"],
    "uri": "https://discord.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['discord_widget'], function (x) {
            var id = x.getAttribute("guildID"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height")
            var widgetURL = "https://discord.com/widget?id=" + id;
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'discord';
        tarteaucitron.fallback(['discord_widget'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// Google Maps
tarteaucitron.services.maps_noapi = {
    "key": "maps_noapi",
    "type": "other",
    "name": "Google Maps",
    "needConsent": true,
    "cookies": ["NID", "OGPC", "1P_JAR", "CONSENT"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['googlemaps_embed'], function (x) {
            var id = x.getAttribute("id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height")
            var widgetURL = "https://google.com/maps/embed?pb=" + id;
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'maps_noapi';
        tarteaucitron.fallback(['googlemaps_embed'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return tarteaucitron.engage(id);
        });
    }
};

// hCaptcha
tarteaucitron.services.hcaptcha = {
    "key": "hcaptcha",
    "type": "other",
    "name": "hCaptcha",
    "needConsent": true,
    "cookies": [],
    "uri": "https://www.hcaptcha.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(["h-captcha"], '');
        tarteaucitron.addScript("https://hcaptcha.com/1/api.js", "hcaptcha")
    },
    "fallback": function () {
        "use strict";
        var id = "hcaptcha";
        tarteaucitron.fallback(["h-captcha"], tarteaucitron.engage(id));
    }
};

// France Culture
tarteaucitron.services.fculture = {
    "key": "fculture",
    "type": "video",
    "name": "France Culture",
    "needConsent": true,
    "cookies": ["_gid", "didomi_token", "outbrain_cid_fetch", "xtvrn", "xtant", "YSC", "ABTasty", "xtan", "ABTastySession", "xtidc", "_ga", "VISITOR_INFO1_LIVE", "euconsent-v2", "v1st", "dmvk", "ts", "VISITOR_INFO1_LIVE", "YSC"],
    "uri": "https://www.radiofrance.com/politique-d-utilisation-des-cookies-sur-les-sites-internet-du-groupe-radio-france",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['fculture_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe src=\"https://www.franceculture.fr/player/export-reecouter?content=" + id + "\" height=\"" + height + "\" width=\"" + width + "\"></iframe>"
        });
    },
    "fallback": function () {
        "use strict";
        var id = "fculture";
        tarteaucitron.fallback(["fculture_embed"], tarteaucitron.engage(id));
    }
};

// Acast
tarteaucitron.services.acast = {
    "key": "acast",
    "type": "video",
    "name": "Acast",
    "needConsent": true,
    "cookies": ["intercom-id-ayi0335i", "intercom-session-ayi0335i"],
    "uri": "https://www.acast.com/en/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['acast_embed'], function (x) {
            var id = x.getAttribute('id1'),
                id2 = x.getAttribute('id2'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                seek = x.getAttribute('seek');
            var widgetURL = "https://embed.acast.com/" + id + "/" + id2 + "?seek=" + seek;
            return "<iframe title=\"Embed Player\" width=\"" + width + "\" height=\"" + height + "\" src=\"" + widgetURL + "\" scrolling=\"no\" frameBorder=\"0\" style=\"border: none; overflow: hidden;\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "acast";
        tarteaucitron.fallback(["acast_embed"], tarteaucitron.engage(id));
    }
};

// Mixcloud
tarteaucitron.services.mixcloud = {
    "key": "mixcloud",
    "type": "video",
    "name": "Mixcloud",
    "needConsent": true,
    "cookies": ["UID", "_gat", "__stripe_mid", "_gid", "_ga", "c", "csrftoken", "__stripe_sid", "mx_t"],
    "uri": "https://www.mixcloud.com/privacy/",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['mixcloud_embed'], function (x) {
            var id = x.getAttribute('id'),
                hidecover = x.getAttribute('hidecover'),
                mini = x.getAttribute('mini'),
                light = x.getAttribute('light'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://www.mixcloud.com/widget/iframe/?hide_cover=" + hidecover + "&mini=" + mini + "&light=" + light + "&feed=" + id + "\" frameborder=\"0\" ></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "mixcloud";
        tarteaucitron.fallback(["mixcloud_embed"], tarteaucitron.engage(id));
    }
};

// Google Agenda
tarteaucitron.services.gagenda = {
    "key": "gagenda",
    "type": "other",
    "name": "Google Agenda",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gagenda_embed'], function (x) {
            var calendar_data = x.getAttribute('data'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe loarding=\"lazy\" width=\"" + width + "\" height=\"" + height + "\" src=\"https://www.google.com/calendar/embed?" + calendar_data + "\" frameborder=\"0\" scrolling=\"no\" style=\"border-width:0\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gagenda";
        tarteaucitron.fallback(["gagenda_embed"], tarteaucitron.engage(id));
    }
};

// Google Docs
tarteaucitron.services.gdocs = {
    "key": "gdocs",
    "type": "other",
    "name": "Google Docs",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gdocs_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/document/d/e/" + id + "/pub?embedded=true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gdocs";
        tarteaucitron.fallback(["gdocs_embed"], tarteaucitron.engage(id));
    }
};

// Google Sheets
tarteaucitron.services.gsheets = {
    "key": "gsheets",
    "type": "other",
    "name": "Google Sheets",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gsheets_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                headers = x.getAttribute('headers');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/spreadsheets/d/e/" + id + "/pubhtml?widget=true&amp;headers=" + headers + "\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gsheets";
        tarteaucitron.fallback(["gsheets_embed"], tarteaucitron.engage(id));
    }
};

// Google Slides
tarteaucitron.services.gslides = {
    "key": "gslides",
    "type": "other",
    "name": "Google Slides",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gslides_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height'),
                autostart = x.getAttribute('autostart'),
                loop = x.getAttribute('loop'),
                delay = x.getAttribute('delay');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/presentation/d/e/" + id + "/embed?start=" + autostart + "&loop=" + loop + "&delayms=" + delay + "\" frameborder=\"0\" allowfullscreen=\"true\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gslides";
        tarteaucitron.fallback(["gslides_embed"], tarteaucitron.engage(id));
    }
};

// Google Forms
tarteaucitron.services.gforms = {
    "key": "gforms",
    "type": "other",
    "name": "Google Forms",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['gforms_embed'], function (x) {
            var id = x.getAttribute('id'),
                width = x.getAttribute('width'),
                height = x.getAttribute('height');
            return "<iframe width=\"" + width + "\" height=\"" + height + "\" src=\"https://docs.google.com/forms/d/e/" + id + "/viewform?embedded=true\" frameborder=\"0\" marginheight=\"0\" marginwidth=\"0\"></iframe>";
        });
    },
    "fallback": function () {
        "use strict";
        var id = "gforms";
        tarteaucitron.fallback(['gforms_embed'], tarteaucitron.engage(id));
    }
};

// Google Optimize
tarteaucitron.services.goptimize = {
    "key": "goptimize",
    "type": "other",
    "name": "Google Optimize",
    "needConsent": true,
    "cookies": ["CONSENT", "NID"],
    "uri": "https://policies.google.com/privacy",
    "js": function () {
        "use strict";

        if (tarteaucitron.user.goptimize === undefined) {
            return;
        }

        tarteaucitron.addScript('https://www.googleoptimize.com/optimize.js?id=' + tarteaucitron.user.goptimize);
    }
};

// Marketo munchkin
tarteaucitron.services.marketomunchkin = {
    "key": "marketomunchkin",
    "type": "api",
    "name": "Marketo munchkin",
    "uri": "https://documents.marketo.com/legal/cookies",
    "needConsent": true,
    "cookies": ['OptAnon', '_mkto_trk'],
    "js": function () {
        "use strict";
        if (tarteaucitron.user.marketomunchkinkey === undefined) {
            return;
        }
        var didInit = false;
        function initMunchkin() {
            if (didInit === false) {
                didInit = true;
                Munchkin.init(tarteaucitron.user.marketomunchkinkey);
            }
        }
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//munchkin.marketo.net/munchkin.js';
        s.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                initMunchkin();
            }
        };
        s.onload = initMunchkin;
        document.getElementsByTagName('head')[0].appendChild(s);
    }
};

// outbrain
tarteaucitron.services.outbrain = {
    "key": "outbrain",
    "type": "ads",
    "name": "Outbrain",
    "uri": "https://www.outbrain.com/fr/advertisers/guidelines/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        tarteaucitron.addScript('https://widgets.outbrain.com/outbrain.js');
    }
};

// affilae
tarteaucitron.services.affilae = {
    "key": "affilae",
    "type": "ads",
    "name": "Affilae",
    "uri": "https://affilae.com/en/privacy-cookie-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (tarteaucitron.user.affilae === undefined) {
           return;
        }

        window._ae = { "pid": tarteaucitron.user.affilae };

        tarteaucitron.addScript('https://static.affilae.com/ae-v3.5.js');
    }
};

tarteaucitron.services.canalu = {
    "key": "canalu",
    "type": "video",
    "name": "Canal-U.tv",
    "uri": "https://www.canal-u.tv/utilisation-des-cookies/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (x) {
            var video_title = tarteaucitron.fixSelfXSS(x.getAttribute("videoTitle")),
                frame_url = 'https://www.canal-u.tv/video/embed_code_plugin.1/' + video_title;

            return '<div style="position:relative;padding-bottom:56.25%;padding-top:10px;height:0;overflow:hidden;">' +
                   '<iframe src="' + frame_url + '?width=100%&amp;height=100%" ' +
                        'style="position:absolute;top:0;left:0;width:100%;height: 100%;" ' +
                        'frameborder="0" ' +
                        'allowfullscreen ' +
                        'scrolling="no">' +
                   '</iframe>' +
                   '</div>';
        });
    },
    "fallback": function () {
        "use strict";
        tarteaucitron.fallback(['canalu_player'], function (elem) {
            return tarteaucitron.engage('canalu');
        });
    }
};
;
(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.tarteaucitronBehaviors = {
    attach: function (context, settings) {
      if (context !== document) {
        return;
      }
      /*global tarteaucitron */
      tarteaucitronCustomText = {
        "middleBarHead" : '',
        "adblock": Drupal.t('Hello! This site is transparent and lets you chose the 3rd party services you want to allow.',{},{'context':'Gravotech GDPR'}),
        "adblock_call": Drupal.t('Please disable your adblocker to start customizing.',{},{'context':'Gravotech GDPR'}),
        "reload": Drupal.t('Refresh the page',{},{'context':'Gravotech GDPR'}),

        "alertBigScroll": Drupal.t('By continuing to scroll,',{},{'context':'Gravotech GDPR'}),
        "alertBigClick": Drupal.t('If you continue to browse this website,',{},{'context':'Gravotech GDPR'}),
        "alertBig": Drupal.t('you are allowing all third-party services',{},{'context':'Gravotech GDPR'}),

        "alertBigPrivacy": settings.gravotech_gdpr.tarteaucitron.disclaimer,
        "alertSmall": Drupal.t('Manage services',{},{'context':'Gravotech GDPR'}),
        "personalize": Drupal.t('Personalize',{},{'context':'Gravotech GDPR'}),
        "acceptAll": Drupal.t('OK, accept all',{},{'context':'Gravotech GDPR'}),
        "close": Drupal.t('Close',{},{'context':'Gravotech GDPR'}),
        "learnMoreCookie": Drupal.t('To learn more about cookies, click here',{},{'context':'Gravotech GDPR'}),

        "privacyUrl": Drupal.t('Privacy policy',{},{'context':'Gravotech GDPR'}),

        "all": Drupal.t('Preference for all services',{},{'context':'Gravotech GDPR'}),

        "info": Drupal.t('Protecting your privacy',{},{'context':'Gravotech GDPR'}),
        "disclaimer": '<p>'+Drupal.t('By allowing these third party services, you accept their cookies and the use of tracking technologies necessary for their proper functioning.',{},{'context':'Gravotech GDPR'})+'</p>',
        "allow": Drupal.t('Allow',{},{'context':'Gravotech GDPR'}),
        "deny": Drupal.t('Deny',{},{'context':'Gravotech GDPR'}),
        "noCookie": Drupal.t('This service does not use cookie.',{},{'context':'Gravotech GDPR'}),
        "useCookie": Drupal.t('This service can install',{},{'context':'Gravotech GDPR'}),
        "useCookieCurrent": Drupal.t('This service has installed',{},{'context':'Gravotech GDPR'}),
        "useNoCookie": Drupal.t('This service has not installed any cookie.',{},{'context':'Gravotech GDPR'}),
        "more": Drupal.t('Read more',{},{'context':'Gravotech GDPR'}),
        "source": Drupal.t('View the official website',{},{'context':'Gravotech GDPR'}),
        "credit": Drupal.t('Cookies manager by tarteaucitron.js',{},{'context':'Gravotech GDPR'}),

        "toggleInfoBox": Drupal.t('Show/hide informations about cookie storage',{},{'context':'Gravotech GDPR'}),
        "title": Drupal.t('Cookies management panel',{},{'context':'Gravotech GDPR'}),
        "cookieDetail": Drupal.t('Cookie detail for',{},{'context':'Gravotech GDPR'}),
        "ourSite": Drupal.t('on our site',{},{'context':'Gravotech GDPR'}),
        "newWindow": Drupal.t('(new window)',{},{'context':'Gravotech GDPR'}),
        "allowAll": Drupal.t('Allow all cookies',{},{'context':'Gravotech GDPR'}),
        "denyAll": Drupal.t('Deny all cookies',{},{'context':'Gravotech GDPR'}),

        "fallback": Drupal.t('is disabled.',{},{'context':'Gravotech GDPR'}),

        "mandatoryTitle": Drupal.t('Mandatory cookies',{},{'context':'Gravotech GDPR'}),
        "mandatoryText": Drupal.t('This site uses cookies necessary for its proper functioning which cannot be deactivated.',{},{'context':'Gravotech GDPR'}),

        "ads": {
          "title": Drupal.t('Advertising network',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('Ad networks can generate revenue by selling advertising space on the site.',{},{'context':'Gravotech GDPR'})
        },
        "analytic": {
          "title": Drupal.t('Audience measurement',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('The audience measurement services used to generate useful statistics attendance to improve the site.',{},{'context':'Gravotech GDPR'})
        },
        "social": {
          "title": Drupal.t('Social networks',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('Social networks can improve the usability of the site and help to promote it via the shares.',{},{'context':'Gravotech GDPR'})
        },
        "video": {
          "title": Drupal.t('Videos',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('Video sharing services help to add rich media on the site and increase its visibility.',{},{'context':'Gravotech GDPR'})
        },
        "comment": {
          "title": Drupal.t('Comments',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('Comments managers facilitate the filing of comments and fight against spam.',{},{'context':'Gravotech GDPR'})
        },
        "support": {
          "title": Drupal.t('Support',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('Support services allow you to get in touch with the site team and help to improve it.',{},{'context':'Gravotech GDPR'})
        },
        "api": {
          "title": Drupal.t('APIs',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('APIs are used to load scripts: geolocation, search engines, translations, ...',{},{'context':'Gravotech GDPR'})
        },
        "other": {
          "title": Drupal.t('Other',{},{'context':'Gravotech GDPR'}),
          "details": Drupal.t('Services to display web content.',{},{'context':'Gravotech GDPR'})
        }
      };

      if (settings.gravotech_gdpr.tarteaucitron.disclaimer) {
        tarteaucitron.lang.alertBigPrivacy = settings.gravotech_gdpr.tarteaucitron.disclaimer;
      }
      var positionCookiesConsent = 'bottom';
      if (settings.gravotech_gdpr.tarteaucitron.positionCookiesConsent == 1) {
        positionCookiesConsent = 'middle'
      }

      tarteaucitron.cdn = settings.gravotech_gdpr.tarteaucitron.path;
      tarteaucitron.init({
        "privacyUrl": settings.gravotech_gdpr.tarteaucitron.privacyUrl, /* Privacy policy url */

        "hashtag": "#tarteaucitron", /* Open the panel with this hashtag */
        "cookieName": "tarteaucitron", /* Cookie name */

        "orientation": positionCookiesConsent, /* Banner position (top - middle - bottom) */
        "showAlertSmall": false, /* Show the small banner on bottom right */
        "cookieslist": true, /* Show the cookie list */

        "showIcon": false, /* Show cookie icon to manage cookies */

        "adblocker": false, /* Show a Warning if an adblocker is detected */
        "AcceptAllCta": true, /* Show the accept all button when highPrivacy on */
        "highPrivacy": true, /* Disable auto consent */
        "handleBrowserDNTRequest": false, /* If Do Not Track == 1, accept all */

        "removeCredit": true, /* Remove credit link */
        "moreInfoLink": true, /* Show more info link */
        "useExternalCss": false,

        "cookiesLink": settings.gravotech_gdpr.tarteaucitron.cookiesLink

        //"cookieDomain": ".my-multisite-domaine.fr" /* Shared cookie for
        // subdomain */
      });

      eval(settings.gravotech_gdpr.tarteaucitron.activateServices);


      $('.show-cookie-management a', context).once('show-cookie-management').on('click', function(e) {
        e.preventDefault();
        tarteaucitron.userInterface.openPanel();
      })
    }
  };

})(jQuery, Drupal, drupalSettings);
;
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($, Drupal, cookies) {
  var deprecatedMessageSuffix = "is deprecated in Drupal 9.0.0 and will be removed in Drupal 10.0.0. Use the core/js-cookie library instead. See https://www.drupal.org/node/3104677";

  var isFunction = function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  var parseCookieValue = function parseCookieValue(value, parseJson) {
    if (value.indexOf('"') === 0) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      value = decodeURIComponent(value.replace(/\+/g, ' '));
      return parseJson ? JSON.parse(value) : value;
    } catch (e) {}
  };

  var reader = function reader(cookieValue, cookieName, converter, readUnsanitized, parseJson) {
    var value = readUnsanitized ? cookieValue : parseCookieValue(cookieValue, parseJson);

    if (converter !== undefined && isFunction(converter)) {
      return converter(value, cookieName);
    }

    return value;
  };

  $.cookie = function (key) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    Drupal.deprecationError({
      message: "jQuery.cookie() ".concat(deprecatedMessageSuffix)
    });

    if (value !== undefined && !isFunction(value)) {
      var attributes = _objectSpread(_objectSpread({}, $.cookie.defaults), options);

      if (typeof attributes.expires === 'string' && attributes.expires !== '') {
        attributes.expires = new Date(attributes.expires);
      }

      var cookieSetter = cookies.withConverter({
        write: function write(cookieValue) {
          return encodeURIComponent(cookieValue);
        }
      });
      value = $.cookie.json && !$.cookie.raw ? JSON.stringify(value) : String(value);
      return cookieSetter.set(key, value, attributes);
    }

    var userProvidedConverter = value;
    var cookiesShim = cookies.withConverter({
      read: function read(cookieValue, cookieName) {
        return reader(cookieValue, cookieName, userProvidedConverter, $.cookie.raw, $.cookie.json);
      }
    });

    if (key !== undefined) {
      return cookiesShim.get(key);
    }

    var results = cookiesShim.get();
    Object.keys(results).forEach(function (resultKey) {
      if (results[resultKey] === undefined) {
        delete results[resultKey];
      }
    });
    return results;
  };

  $.cookie.defaults = _objectSpread({
    path: ''
  }, cookies.defaults);
  $.cookie.json = false;
  $.cookie.raw = false;

  $.removeCookie = function (key, options) {
    Drupal.deprecationError({
      message: "jQuery.removeCookie() ".concat(deprecatedMessageSuffix)
    });
    cookies.remove(key, _objectSpread(_objectSpread({}, $.cookie.defaults), options));
    return !cookies.get(key);
  };
})(jQuery, Drupal, window.Cookies);;
(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.gravotech_welcome_popin = {
    attach: function (context, settings) {
      $('#welcome-popin-block', context).once('welcome-popin').each(function() {
        Drupal.ajax({
          url: '/api/welcome-popin?nodetype='+settings.nodetype,
          type: "POST",
        }).execute();
      });
      $('.welcome-popin').each(function() {
        let display = $(this).data('display');
        let cookieValue = $.cookie('gravotechPopin');
        if (display == 'once' && cookieValue !== undefined) {
          $(this).addClass('is-hidden');
        }
      });
      $( '.welcome-popin-close',context).click(function() {
        $.cookie('gravotechPopin', 'display', {path: '/'});
        $(this).parent().addClass('is-hidden');
      });
    }
  }
})(jQuery, Drupal, drupalSettings);
;
