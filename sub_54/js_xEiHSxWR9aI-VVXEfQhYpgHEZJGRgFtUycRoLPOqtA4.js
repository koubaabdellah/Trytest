(function (Drupal) {
  var wait = 500;

  function setMailplusEmailFieldPlaceholderAndType(context) {
    var input = context.querySelector(
      '.mailplus-form-container form input#field1521'
    );

    if (!input) {
      // Wait for MailPlus is being loaded.
      setTimeout(setMailplusEmailFieldPlaceholderAndType, wait, context);
      wait *= 2;
      return;
    }

    input.setAttribute('type', 'email');
    input.setAttribute('placeholder', 'E-mailadres');

    var all_inputs = context.querySelectorAll(
        '.mailplus-form-container form input'
      ),
      i = all_inputs.length;

    while (i--) {
      all_inputs[i].style.borderRadius = '0px';
    }
  }

  Drupal.behaviors.newsletter_block_mailplus = {
    attach: function (context) {
      setMailplusEmailFieldPlaceholderAndType(context);
    }
  };
})(Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout;
  var result;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;

    var later = function later() {
      timeout = null;

      if (!immediate) {
        result = func.apply(context, args);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(context, args);
    }

    return result;
  };
};;
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
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  $.fn.drupalGetSummary = function () {
    var callback = this.data('summaryCallback');
    return this[0] && callback ? callback(this[0]).trim() : '';
  };

  $.fn.drupalSetSummary = function (callback) {
    var self = this;

    if (typeof callback !== 'function') {
      var val = callback;

      callback = function callback() {
        return val;
      };
    }

    return this.data('summaryCallback', callback).off('formUpdated.summary').on('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    }).trigger('summaryUpdated');
  };

  Drupal.behaviors.formSingleSubmit = {
    attach: function attach() {
      function onFormSubmit(e) {
        var $form = $(e.currentTarget);
        var formValues = $form.serialize();
        var previousValues = $form.attr('data-drupal-form-submit-last');

        if (previousValues === formValues) {
          e.preventDefault();
        } else {
          $form.attr('data-drupal-form-submit-last', formValues);
        }
      }

      $(once('form-single-submit', 'body')).on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
    }
  };

  function triggerFormUpdated(element) {
    $(element).trigger('formUpdated');
  }

  function fieldsList(form) {
    var $fieldList = $(form).find('[name]').map(function (index, element) {
      return element.getAttribute('id');
    });
    return $.makeArray($fieldList);
  }

  Drupal.behaviors.formUpdated = {
    attach: function attach(context) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      var $forms = $(once('form-updated', contextIsForm ? $context : $context.find('form')));
      var formFields;

      if ($forms.length) {
        $.makeArray($forms).forEach(function (form) {
          var events = 'change.formUpdated input.formUpdated ';
          var eventHandler = debounce(function (event) {
            triggerFormUpdated(event.target);
          }, 300);
          formFields = fieldsList(form).join(',');
          form.setAttribute('data-drupal-form-fields', formFields);
          $(form).on(events, eventHandler);
        });
      }

      if (contextIsForm) {
        formFields = fieldsList(context).join(',');
        var currentFields = $(context).attr('data-drupal-form-fields');

        if (formFields !== currentFields) {
          triggerFormUpdated(context);
        }
      }
    },
    detach: function detach(context, settings, trigger) {
      var $context = $(context);
      var contextIsForm = $context.is('form');

      if (trigger === 'unload') {
        once.remove('form-updated', contextIsForm ? $context : $context.find('form')).forEach(function (form) {
          form.removeAttribute('data-drupal-form-fields');
          $(form).off('.formUpdated');
        });
      }
    }
  };
  Drupal.behaviors.fillUserInfoFromBrowser = {
    attach: function attach(context, settings) {
      var userInfo = ['name', 'mail', 'homepage'];
      var $forms = $(once('user-info-from-browser', '[data-user-info-from-browser]'));

      if ($forms.length) {
        userInfo.forEach(function (info) {
          var $element = $forms.find("[name=".concat(info, "]"));
          var browserData = localStorage.getItem("Drupal.visitor.".concat(info));
          var emptyOrDefault = $element.val() === '' || $element.attr('data-drupal-default-value') === $element.val();

          if ($element.length && emptyOrDefault && browserData) {
            $element.val(browserData);
          }
        });
      }

      $forms.on('submit', function () {
        userInfo.forEach(function (info) {
          var $element = $forms.find("[name=".concat(info, "]"));

          if ($element.length) {
            localStorage.setItem("Drupal.visitor.".concat(info), $element.val());
          }
        });
      });
    }
  };

  var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e) {
    var url;

    if (e.type === 'click') {
      url = e.currentTarget.location ? e.currentTarget.location : e.currentTarget;
    } else {
      url = window.location;
    }

    var hash = url.hash.substr(1);

    if (hash) {
      var $target = $("#".concat(hash));
      $('body').trigger('formFragmentLinkClickOrHashChange', [$target]);
      setTimeout(function () {
        return $target.trigger('focus');
      }, 300);
    }
  };

  var debouncedHandleFragmentLinkClickOrHashChange = debounce(handleFragmentLinkClickOrHashChange, 300, true);
  $(window).on('hashchange.form-fragment', debouncedHandleFragmentLinkClickOrHashChange);
  $(document).on('click.form-fragment', 'a[href*="#"]', debouncedHandleFragmentLinkClickOrHashChange);
})(jQuery, Drupal, Drupal.debounce);;
/**
 * @file
 * Unlock protected forms.
 *
 * This works by resetting the form action to the path that It should be as well
 * as injecting the secret form key, only if the current user is verified to be
 * human which is done by waiting for a mousemove, swipe, or tab/enter key to be
 * pressed.
 */

(function (Drupal, drupalSettings) {
  "use strict";

  Drupal.antibot = {};

  Drupal.behaviors.antibot = {
    attach: function (context) {
      // Assume the user is not human, despite JS being enabled.
      drupalSettings.antibot.human = false;

      // Wait for a mouse to move, indicating they are human.
      document.body.addEventListener('mousemove', function () {
        // Unlock the forms.
        Drupal.antibot.unlockForms();
      });

      // Wait for a touch move event, indicating that they are human.
      document.body.addEventListener('touchmove', function () {
        // Unlock the forms.
        Drupal.antibot.unlockForms();
      });

      // A tab or enter key pressed can also indicate they are human.
      document.body.addEventListener('keydown', function (e) {
        if ((e.code == 'Tab') || (e.code == 'Enter')) {
          // Unlock the forms.
          Drupal.antibot.unlockForms();
        }
      });
    }
  };

  /**
   * Unlock all locked forms.
   */
  Drupal.antibot.unlockForms = function () {
    // Act only if we haven't yet verified this user as being human.
    if (!drupalSettings.antibot.human) {
      // Check if there are forms to unlock.
      if (drupalSettings.antibot.forms != undefined) {
        // Iterate all antibot forms that we need to unlock.
        Object.values(drupalSettings.antibot.forms).forEach(function (config) {
          // Switch the action.
          const form = document.getElementById(config.id);
          if (form) {
            form.setAttribute('action', form.getAttribute('data-action'));

            // Set the key.
            const input = form.querySelector('input[name="antibot_key"]');
            if (input) {
              input.value = config.key;
            }
          }
        });
      }
      // Mark this user as being human.
      drupalSettings.antibot.human = true;
    }
  };
})(Drupal, drupalSettings);
;
(function (Drupal) {
  var once = false,
    opened_popup,
    popup_backdrop;

  function openPopup(paragraph) {
    var popup = paragraph.querySelector('.paragraph--type--content-img-popup');

    if (!popup) {
      return;
    }

    closePopup();
    opened_popup = popup.cloneNode(true);

    document.body.appendChild(opened_popup);
    opened_popup.style.display = 'block';

    var close_buttons = opened_popup.querySelectorAll('.popup-close-button'),
      i = close_buttons.length;
    while (i--) {
      close_buttons[i].addEventListener('click', closePopup);
    }

    popup_backdrop.style.display = 'block';

    windowOnResize();
  }

  function closePopup() {
    if (opened_popup) {
      opened_popup.parentNode.removeChild(opened_popup);
      opened_popup = null;
      popup_backdrop.style.display = 'none';
    }
  }

  function windowOnResize() {
    if (!opened_popup) {
      return;
    }

    opened_popup.style.top = '';
    if (
      opened_popup.offsetHeight > window.innerHeight ||
      opened_popup.classList.contains('fixed-content-larger-than-viewport')
    ) {
      opened_popup.classList.add('content-larger-than-viewport');
      opened_popup.style.top = window.scrollY + 'px';
    } else {
      opened_popup.classList.remove('content-larger-than-viewport');
      opened_popup.style.top =
        (window.innerHeight - opened_popup.offsetHeight) / 2 + 'px';
    }
  }

  Drupal.behaviors.paragraph_content_img = {
    attach: function (context, settings) {
      if (
        !document.body.querySelector(
          '.paragraph--type--content-img-popup-backdrop'
        )
      ) {
        popup_backdrop = document.createElement('div');
        popup_backdrop.classList.add(
          'paragraph--type--content-img-popup-backdrop'
        );
        document.body.appendChild(popup_backdrop);
        popup_backdrop.addEventListener('click', closePopup);
      }

      var paragraphs = context.querySelectorAll(
          '.paragraph--type--content-img'
        ),
        i = paragraphs.length,
        button,
        popup;

      while (i--) {
        button = paragraphs[i].querySelector('.media-col button');
        if (!button) {
          continue;
        }
        button.paragraph = paragraphs[i];
        button.addEventListener('click', function (e) {
          e.preventDefault();
          openPopup(this.paragraph);
        });
      }

      // popup_backdrop = document.createElement('div');
      // popup_backdrop.classList.add('beeldbank-popup-backdrop');
      // document.body.appendChild(popup_backdrop);
      // popup_backdrop.addEventListener('click', closePopup);
      //
      // while (i--) {
      //   checkboxes[i]
      //     .querySelector('.click-for-info')
      //     .addEventListener('click', openPopup);
      //   checkboxes[i].nextItem = checkboxes[i + 1];
      //   checkboxes[i].prevItem = checkboxes[i - 1];
      //
      //   var checkbox = checkboxes[i].querySelector('input[type="checkbox"]');
      //   checkbox.formItemContainer = checkboxes[i];
      //   checkbox.addEventListener('change', function (e) {
      //     if (this.checked) {
      //       this.formItemContainer.classList.add('checked');
      //     } else {
      //       this.formItemContainer.classList.remove('checked');
      //     }
      //   });
      // }
      //
      // if (once) {
      //   return;
      // }
      // once = true;
      // document.addEventListener('click', function handleClick(event) {
      //   if (
      //     event.target.classList.contains(
      //       'js-form-type-beeldbank-image-checkbox'
      //     ) === true
      //   ) {
      //     openPopup();
      //   }
      //
      //   if (event.target.classList.contains('checkbox-wrapper') === true) {
      //     var label = event.target.children[0],
      //       checkbox = label.children[0].children[1];
      //
      //     if (!label.children[0].children[1].checked) {
      //       checkbox.checked = true;
      //     } else {
      //       checkbox.checked = false;
      //     }
      //     checkbox.dispatchEvent(new Event('change'));
      //   }
      // });
    }
  };

  window.addEventListener('resize', windowOnResize);
})(Drupal);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  function DropButton(dropbutton, settings) {
    var options = $.extend({
      title: Drupal.t('List additional actions')
    }, settings);
    var $dropbutton = $(dropbutton);
    this.$dropbutton = $dropbutton;
    this.$list = $dropbutton.find('.dropbutton');
    this.$actions = this.$list.find('li').addClass('dropbutton-action');

    if (this.$actions.length > 1) {
      var $primary = this.$actions.slice(0, 1);
      var $secondary = this.$actions.slice(1);
      $secondary.addClass('secondary-action');
      $primary.after(Drupal.theme('dropbuttonToggle', options));
      this.$dropbutton.addClass('dropbutton-multiple').on({
        'mouseleave.dropbutton': $.proxy(this.hoverOut, this),
        'mouseenter.dropbutton': $.proxy(this.hoverIn, this),
        'focusout.dropbutton': $.proxy(this.focusOut, this),
        'focusin.dropbutton': $.proxy(this.focusIn, this)
      });
    } else {
      this.$dropbutton.addClass('dropbutton-single');
    }
  }

  function dropbuttonClickHandler(e) {
    e.preventDefault();
    $(e.target).closest('.dropbutton-wrapper').toggleClass('open');
  }

  Drupal.behaviors.dropButton = {
    attach: function attach(context, settings) {
      var dropbuttons = once('dropbutton', '.dropbutton-wrapper', context);

      if (dropbuttons.length) {
        var body = once('dropbutton-click', 'body');

        if (body.length) {
          $(body).on('click', '.dropbutton-toggle', dropbuttonClickHandler);
        }

        dropbuttons.forEach(function (dropbutton) {
          DropButton.dropbuttons.push(new DropButton(dropbutton, settings.dropbutton));
        });
      }
    }
  };
  $.extend(DropButton, {
    dropbuttons: []
  });
  $.extend(DropButton.prototype, {
    toggle: function toggle(show) {
      var isBool = typeof show === 'boolean';
      show = isBool ? show : !this.$dropbutton.hasClass('open');
      this.$dropbutton.toggleClass('open', show);
    },
    hoverIn: function hoverIn() {
      if (this.timerID) {
        window.clearTimeout(this.timerID);
      }
    },
    hoverOut: function hoverOut() {
      this.timerID = window.setTimeout($.proxy(this, 'close'), 500);
    },
    open: function open() {
      this.toggle(true);
    },
    close: function close() {
      this.toggle(false);
    },
    focusOut: function focusOut(e) {
      this.hoverOut.call(this, e);
    },
    focusIn: function focusIn(e) {
      this.hoverIn.call(this, e);
    }
  });
  $.extend(Drupal.theme, {
    dropbuttonToggle: function dropbuttonToggle(options) {
      return "<li class=\"dropbutton-toggle\"><button type=\"button\"><span class=\"dropbutton-arrow\"><span class=\"visually-hidden\">".concat(options.title, "</span></span></button></li>");
    }
  });
  Drupal.DropButton = DropButton;
})(jQuery, Drupal);;
