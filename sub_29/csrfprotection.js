/**
 * Provide CSRF protection support.
 */
 var csrfProtection = csrfProtection || (function () { // Prevents loading this definition more than once
  /**
   * Returns an anti-CSRF token, which is a SHA-256 hash of the value of the X-CSRF-Token cookie and a nonce,
   * postfixed with the used nonce.
   *
   * @return An anti-CSRF token.
   */
  function getCsrfToken() {
    const cookies = document.cookie.match("X-CSRF-Token=([^;]*)");
    var token = (cookies != null ? cookies[1] : '');
    if (token !== '') {
      const nonce = Date.now().toString(36).substring(2) + Math.random().toString(36).substring(2, 12).padEnd(10, '0');
      token = _sha256(token + nonce) + nonce;
    }
    return token;
  }

  /**
   * Fills all 'csrftoken' inputs with the value of the X-CSRF-Token cookie when their value is empty.
   *
   * @param jQuerySelector a custom jQuery selector to select the inputs to fill. It is ignored when
   *        jQuery has not been loaded.
   */
  function setCsrfTokenInputs(jQuerySelector) {
    if (window.jQuery) {
      var selector = (jQuerySelector ? jQuerySelector : "input[name='csrftoken']");
      jQuery(selector).each(function() {
        if (jQuery(this).val() === "") {
          jQuery(this).val(getCsrfToken());
        }
      });
    } else {
      var inputs = document.getElementsByName('csrftoken');
      inputs.forEach((input) => {
        _setCsrfToken(input)
      });
    }
  }

  /**
   * Adds a 'csrftoken' input to forms with a POST action and fills them with the value of the X-CSRF-Token
   * cookie. When a form already has a 'csrftoken' input, no new one is created and it is only filled.
   *
   * When `jQuerySelectorOrForm` is empty, a 'csrftoken' input is added to all forms with a POST action.
   *
   * @param jQuerySelectorOrForm a custom jQuery selector to select the relevant forms when jQuery has been loaded,
   *        or the form to which to add the 'csrftoken' input when jQuery is not present.
   */
  function addCsrfTokenInputs(jQuerySelectorOrForm) {
    if (window.jQuery) {
      var selector = (jQuerySelectorOrForm ? jQuerySelectorOrForm : "form[method='post']");
      jQuery(selector).each(function() {
        var csrfTokenInput = jQuery("input[name='csrftoken']", this);
        if (csrfTokenInput.length === 0) {
          jQuery('<input>', {
            type: 'hidden',
            name: 'csrftoken',
            value: getCsrfToken()
          }).appendTo(this);
        } else {
          _setCsrfToken(csrfTokenInput[0]);
        }
      });
    } else if (jQuerySelectorOrForm) {
      addCsrfToken(jQuerySelectorOrForm); // jQuerySelectorOrForm is a form here
    } else {
      for (var form of document.forms) {
        if (form.method && form.method.toLowerCase() === "post") {
          addCsrfToken(form);
        }
      }
    }
  }

  /**
   * Adds a 'csrftoken' input to a form and fills it with the token argument, or with the value of the
   * X-CSRF-Token cookie when the token argument is absent.
   * When the  form already has a 'csrftoken' input, no new one is created and it is only filled.
   * This method does not use jQuery.
   *
   * @param form The form to which to add the 'csrftoken' input.
   * @param token The token value (optional).
   */
  function addCsrfToken(form, token) {
    var csrfTokenInput = form.csrftoken;
    if (csrfTokenInput) {
      _setCsrfToken(csrfTokenInput, token);
    } else {
      var input = document.createElement("input");
      input.type = 'hidden';
      input.name = 'csrftoken';
      input.value = token ? token : getCsrfToken();
      form.appendChild(input);
    }
  }

  /**
   * Fills an input with the CSRF token when it does not have a value. The CSRF token is taken from
   * the token argument when it is not empty, or otherwise from the X-CSRF-Token cookie.
   * This method does not use jQuery.
   *
   * @param input The input.
   * @param token The token value (optional).
   */
  function _setCsrfToken(input, token) {
    if (input.value === "") {
      input.value = token ? token : getCsrfToken();
    }
  }

  /**
   * Calculates the SHA-256 hash of an ASCII string.
   * This implementation has been provided instead of using the browser native crypto.subtle.digest
   * function, because the latter is only available in secure contexts and its presence can therefore
   * not be guaranteed.
   */
  function _sha256(text) {
    function rightRotate(value, amount) {
      return (value>>>amount) | (value<<(32 - amount));
    }

    var maxWord = Math.pow(2, 32);
    var result = ''
    var words = [];
    var textBitLength = text['length']*8;
    var hash = [];
    var k = [];
    var primeCounter = 0;
    var i, j;

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (Math.pow(candidate, 0.5)*maxWord) | 0;
        k[primeCounter++] = (Math.pow(candidate, 1/3)*maxWord) | 0;
      }
    }

    text += '\x80'
    while (text['length']%64 - 56){
      text += '\x00'
    }

    for (i = 0; i < text['length']; i++) {
      j = text.charCodeAt(i);
      if (j>>8) {
		return; // ASCII check: only accept characters in range 0-255
	  }
      words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words['length']] = ((textBitLength/maxWord)|0);
    words[words['length']] = (textBitLength)

    for (j = 0; j < words['length'];) {
      var w = words.slice(j, j += 16);
      var oldHash = hash;
      hash = hash.slice(0, 8);

      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e&hash[5])^((~e)&hash[6])) // ch
          + k[i]
          + (w[i] = (i < 16) ? w[i] : (
              w[i - 16]
              + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3))
              + w[i - 7]
              + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10))
            ) | 0
          );
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj

        hash = [(temp1 + temp2)|0].concat(hash);
        hash[4] = (hash[4] + temp1)|0;
      }

      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i])|0;
      }
    }

    for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
        var b = (hash[i]>>(j*8))&255;
        result += ((b < 16) ? 0 : '') + b.toString(16);
      }
    }
    return result;
  }

  // If the addOnLoad attribute has been added to the script tag for this file
  // then call the addCsrfTokenInputs function automatically when the page has loaded.
  // This is done either by registering the addCsrfTokenInputs function with the addOnLoadListener
  // function when it is present (it is defined in the global_edit-javascript_util template) and we
  // are not in an iframe, or by registering it with the DOMContentLoaded event handler.
  if (document.currentScript.getAttribute("addonload") === "true") {
    if (typeof addOnLoadListener === "function" && window.location === window.parent.location) {
      addOnLoadListener(addCsrfTokenInputs);
    } else {
      document.addEventListener("DOMContentLoaded", function() {
        addCsrfTokenInputs();
      });
    }
  }

  // Public methods
  return {
    getCsrfToken: getCsrfToken,
    setCsrfTokenInputs: setCsrfTokenInputs,
    addCsrfTokenInputs: addCsrfTokenInputs,
    addCsrfToken: addCsrfToken
  }
})();
