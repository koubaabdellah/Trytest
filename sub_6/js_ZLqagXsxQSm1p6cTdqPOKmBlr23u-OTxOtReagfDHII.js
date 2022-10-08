(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.gravotech_media_remote_video = {
    attach: function (context, settings) {
      $('.video-preview a', context).on('click', function(e){
        var _context = $(this).parents('.video-wrapper');
        var openedIframe = $(_context.find('iframe')[0]).contents().find('iframe');
        if (typeof openedIframe.data('src') !== undefined) {
          openedIframe.attr('src', openedIframe.data('src'))
        }

        var tencentIframe = $(_context.find('.video-embed-field-provider-tencent')).find('iframe');
        if (typeof tencentIframe.data('src') !== undefined) {
          tencentIframe.attr('src', tencentIframe.data('src'))
        }
        $(this).parents('.paragraph').css('z-index', '1000');
        e.preventDefault();
        setTimeout(function(){
          _context.toggleClass('video-frame');
        }, 400);
        $(this).parents('.swiper-container').find('.swiper-wrapper').addClass( "transform-none");
      });
      $('.video-wrapper .close', context).on('click', function(e){
        var _context = $(this).parents('.video-wrapper');
        e.preventDefault();
        _context.toggleClass('video-frame');
        $(this).parents('.paragraph').css('z-index', '');

        if (_context.children('video').length) {
          _context.children('video').get(0).pause();
        }
        $(this).parents('.swiper-container').find('.swiper-wrapper').removeClass( "transform-none");
      });
      $('.video-wrapper .close', context).on('click', function (e) {
        var _context = $(this).parents('.video-wrapper');

        var openedIframe = $(_context.find('iframe')[0]).contents().find('iframe');
        openedIframe.data('src',openedIframe.attr('src'));
        openedIframe.attr('src','')

        var tencentIframe = $(_context.find('.video-embed-field-provider-tencent')).find('iframe');
        tencentIframe.data('src',tencentIframe.attr('src'));
        tencentIframe.attr('src','')
      });
    }
  };
})(jQuery, Drupal, drupalSettings);

;
/*!
  * Bootstrap carousel.js v4.6.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Carousel = factory(global.jQuery, global.Util));
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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  /**
   * Constants
   */

  var NAME = 'carousel';
  var VERSION = '4.6.1';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var CLASS_NAME_CAROUSEL = 'carousel';
  var CLASS_NAME_ACTIVE = 'active';
  var CLASS_NAME_SLIDE = 'slide';
  var CLASS_NAME_RIGHT = 'carousel-item-right';
  var CLASS_NAME_LEFT = 'carousel-item-left';
  var CLASS_NAME_NEXT = 'carousel-item-next';
  var CLASS_NAME_PREV = 'carousel-item-prev';
  var CLASS_NAME_POINTER_EVENT = 'pointer-event';
  var DIRECTION_NEXT = 'next';
  var DIRECTION_PREV = 'prev';
  var DIRECTION_LEFT = 'left';
  var DIRECTION_RIGHT = 'right';
  var EVENT_SLIDE = "slide" + EVENT_KEY;
  var EVENT_SLID = "slid" + EVENT_KEY;
  var EVENT_KEYDOWN = "keydown" + EVENT_KEY;
  var EVENT_MOUSEENTER = "mouseenter" + EVENT_KEY;
  var EVENT_MOUSELEAVE = "mouseleave" + EVENT_KEY;
  var EVENT_TOUCHSTART = "touchstart" + EVENT_KEY;
  var EVENT_TOUCHMOVE = "touchmove" + EVENT_KEY;
  var EVENT_TOUCHEND = "touchend" + EVENT_KEY;
  var EVENT_POINTERDOWN = "pointerdown" + EVENT_KEY;
  var EVENT_POINTERUP = "pointerup" + EVENT_KEY;
  var EVENT_DRAG_START = "dragstart" + EVENT_KEY;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var EVENT_CLICK_DATA_API = "click" + EVENT_KEY + DATA_API_KEY;
  var SELECTOR_ACTIVE = '.active';
  var SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
  var SELECTOR_ITEM = '.carousel-item';
  var SELECTOR_ITEM_IMG = '.carousel-item img';
  var SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
  var SELECTOR_INDICATORS = '.carousel-indicators';
  var SELECTOR_DATA_SLIDE = '[data-slide], [data-slide-to]';
  var SELECTOR_DATA_RIDE = '[data-ride="carousel"]';
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
  };
  /**
   * Class definition
   */

  var Carousel = /*#__PURE__*/function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(SELECTOR_INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(DIRECTION_NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      var $element = $__default["default"](this._element); // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible

      if (!document.hidden && $element.is(':visible') && $element.css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(DIRECTION_PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(SELECTOR_NEXT_PREV)) {
        Util__default["default"].triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._updateInterval();

        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $__default["default"](this._element).one(EVENT_SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? DIRECTION_NEXT : DIRECTION_PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $__default["default"](this._element).off(EVENT_KEY);
      $__default["default"].removeData(this._element, DATA_KEY);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, config);
      Util__default["default"].typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX;
      this.touchDeltaX = 0; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $__default["default"](this._element).on(EVENT_KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $__default["default"](this._element).on(EVENT_MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(EVENT_MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        _this3.touchDeltaX = event.originalEvent.touches && event.originalEvent.touches.length > 1 ? 0 : event.originalEvent.touches[0].clientX - _this3.touchStartX;
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $__default["default"](this._element.querySelectorAll(SELECTOR_ITEM_IMG)).on(EVENT_DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $__default["default"](this._element).on(EVENT_POINTERDOWN, function (event) {
          return start(event);
        });
        $__default["default"](this._element).on(EVENT_POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        $__default["default"](this._element).on(EVENT_TOUCHSTART, function (event) {
          return start(event);
        });
        $__default["default"](this._element).on(EVENT_TOUCHMOVE, function (event) {
          return move(event);
        });
        $__default["default"](this._element).on(EVENT_TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(SELECTOR_ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === DIRECTION_NEXT;
      var isPrevDirection = direction === DIRECTION_PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === DIRECTION_PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(SELECTOR_ACTIVE_ITEM));

      var slideEvent = $__default["default"].Event(EVENT_SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $__default["default"](this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(SELECTOR_ACTIVE));
        $__default["default"](indicators).removeClass(CLASS_NAME_ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $__default["default"](nextIndicator).addClass(CLASS_NAME_ACTIVE);
        }
      }
    };

    _proto._updateInterval = function _updateInterval() {
      var element = this._activeElement || this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      if (!element) {
        return;
      }

      var elementInterval = parseInt(element.getAttribute('data-interval'), 10);

      if (elementInterval) {
        this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
        this._config.interval = elementInterval;
      } else {
        this._config.interval = this._config.defaultInterval || this._config.interval;
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(SELECTOR_ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === DIRECTION_NEXT) {
        directionalClassName = CLASS_NAME_LEFT;
        orderClassName = CLASS_NAME_NEXT;
        eventDirectionName = DIRECTION_LEFT;
      } else {
        directionalClassName = CLASS_NAME_RIGHT;
        orderClassName = CLASS_NAME_PREV;
        eventDirectionName = DIRECTION_RIGHT;
      }

      if (nextElement && $__default["default"](nextElement).hasClass(CLASS_NAME_ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      this._activeElement = nextElement;
      var slidEvent = $__default["default"].Event(EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($__default["default"](this._element).hasClass(CLASS_NAME_SLIDE)) {
        $__default["default"](nextElement).addClass(orderClassName);
        Util__default["default"].reflow(nextElement);
        $__default["default"](activeElement).addClass(directionalClassName);
        $__default["default"](nextElement).addClass(directionalClassName);
        var transitionDuration = Util__default["default"].getTransitionDurationFromElement(activeElement);
        $__default["default"](activeElement).one(Util__default["default"].TRANSITION_END, function () {
          $__default["default"](nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(CLASS_NAME_ACTIVE);
          $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $__default["default"](_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $__default["default"](activeElement).removeClass(CLASS_NAME_ACTIVE);
        $__default["default"](nextElement).addClass(CLASS_NAME_ACTIVE);
        this._isSliding = false;
        $__default["default"](this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY);

        var _config = _extends({}, Default, $__default["default"](this).data());

        if (typeof config === 'object') {
          _config = _extends({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $__default["default"](this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util__default["default"].getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $__default["default"](selector)[0];

      if (!target || !$__default["default"](target).hasClass(CLASS_NAME_CAROUSEL)) {
        return;
      }

      var config = _extends({}, $__default["default"](target).data(), $__default["default"](this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($__default["default"](target), config);

      if (slideIndex) {
        $__default["default"](target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, Carousel._dataApiClickHandler);
  $__default["default"](window).on(EVENT_LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(SELECTOR_DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $__default["default"](carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = Carousel._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = Carousel;

  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;

}));

;
/*!
  * Bootstrap scrollspy.js v4.6.1 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScrollSpy = factory(global.jQuery, global.Util));
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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  /**
   * Constants
   */

  var NAME = 'scrollspy';
  var VERSION = '4.6.1';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
  var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
  var CLASS_NAME_ACTIVE = 'active';
  var EVENT_ACTIVATE = "activate" + EVENT_KEY;
  var EVENT_SCROLL = "scroll" + EVENT_KEY;
  var EVENT_LOAD_DATA_API = "load" + EVENT_KEY + DATA_API_KEY;
  var METHOD_OFFSET = 'offset';
  var METHOD_POSITION = 'position';
  var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
  var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
  var SELECTOR_NAV_LINKS = '.nav-link';
  var SELECTOR_NAV_ITEMS = '.nav-item';
  var SELECTOR_LIST_ITEMS = '.list-group-item';
  var SELECTOR_DROPDOWN = '.dropdown';
  var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
  var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  /**
   * Class definition
   */

  var ScrollSpy = /*#__PURE__*/function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + SELECTOR_NAV_LINKS + "," + (this._config.target + " " + SELECTOR_LIST_ITEMS + ",") + (this._config.target + " " + SELECTOR_DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $__default["default"](this._scrollElement).on(EVENT_SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util__default["default"].getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$__default["default"](target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $__default["default"].removeData(this._element, DATA_KEY);
      $__default["default"](this._scrollElement).off(EVENT_KEY);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _extends({}, Default, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && Util__default["default"].isElement(config.target)) {
        var id = $__default["default"](config.target).attr('id');

        if (!id) {
          id = Util__default["default"].getUID(NAME);
          $__default["default"](config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util__default["default"].typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $__default["default"]([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE);
        $link.addClass(CLASS_NAME_ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_LINKS + ", " + SELECTOR_LIST_ITEMS).addClass(CLASS_NAME_ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE);
      }

      $__default["default"](this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $__default["default"](this).data(DATA_KEY);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $__default["default"](this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * Data API implementation
   */


  $__default["default"](window).on(EVENT_LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $__default["default"](scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * jQuery
   */

  $__default["default"].fn[NAME] = ScrollSpy._jQueryInterface;
  $__default["default"].fn[NAME].Constructor = ScrollSpy;

  $__default["default"].fn[NAME].noConflict = function () {
    $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;

}));

;
(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.gravotech_anchor_links = {

    attach: function (context, settings) {
      $('.menu-anchors', context).each(function() {
        $('body').attr('data-spy', 'scroll');
        $('body').attr('data-target', '#navbar-anchors');
        $('body').attr('data-offset', '0');

        // Sticky menu anchors
        if($(this).length) {
          let menuAnchors = $('.menu-anchors-wrapper');
          let menuAnchorsTop = menuAnchors.offset().top;
  
          $(window, context).on('scroll', function() {
            if (menuAnchorsTop < window.scrollY ) {
              menuAnchors.find('.menu-anchors').addClass('is-sticky-top');
            } else {
              menuAnchors.find('.menu-anchors').removeClass('is-sticky-top');
            }
          });
        }
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal, drupalSettings) {
  'use strict';
  Drupal.behaviors.gravotech_node_product = {
    attach: function (context, settings) {
      $('.carousel-controls', context).each(function(){
        if ($(this).find('.carousel-thumbnail').length < 6) {
          $('.carousel-control').attr('disabled', 'true');
        }
      });
      
      $('#myCarousel .carousel-thumbnail', context).on('keypress', function(e){
        if (e.keyCode === 13) {
          $(this).click();
        }
      });

      $('.carousel-control-next', context).click(function(e) {
        e.preventDefault();
        $('.carousel-control-prev').removeAttr('disabled');
        $(this).parent().find('.carousel-indicators').animate({
          scrollLeft: "+=" + 107 + "px"
        }, "fast");
      });

      $('.carousel-control-prev', context).click(function(e) {
        e.preventDefault();
        $(this).parent().find('.carousel-indicators').animate({
          scrollLeft: "-=" + 107 + "px"
        }, "fast");
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
