// global variables 
var errorClass = "valError";

// bind validations on page load
$(function() {

  $('[required]').blur(function(event) {
    if (isEmpty(this.value)) {
      showErrorField(this, "required field");
      event.stopImmediatePropagation();
    } else {
      hideErrorField(this);
    }
  });

  $('input.number_field').blur(function(event) {
    if (!isEmpty(this.value) && isNaN(this.value)) {
      showErrorField(this, "not a numeric value");
      event.stopImmediatePropagation();
    } else {
      hideErrorField(this);
    }
  });

  $('input.valPositiveInteger').blur(function(event) {
    if (!isEmpty(this.value) && !isPositiveInteger(this.value)) {
      showErrorField(this, "not a positive integer value");
      event.stopImmediatePropagation();
    } else {
      hideErrorField(this);
    }
  });

    $('#P1_AS_APPDATS').blur(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige startdatum in.",1);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,1);	  
    }
  });
  
   $('#P1_AS_APPDATE').blur(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige einddatum in.",2);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,2);	  
    }
  });

    $('#P1_AS_APPDATS').change(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige startdatum in.",1);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,1);	  
    }
  });
  
   $('#P1_AS_APPDATE').change(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige einddatum in.",2);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,2);	  
    }
  });
  
// P4 date fields

    $('#P4_AS_APPDATS').blur(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige startdatum in.",1);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,1);	  
    }
  });
  
   $('#P4_AS_APPDATE').blur(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige einddatum in.",2);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,2);	  
    }
  });

    $('#P4_AS_APPDATS').change(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige startdatum in.",1);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,1);	  
    }
  });
  
   $('#P4_AS_APPDATE').change(function(event) {
    if (!isEmpty(this.value) && !isValidDate(this.value)) {
      showErrorField(this, "Voer een geldige einddatum in.",2);
      event.stopImmediatePropagation();
    } else {
	  hideErrorField(this,2);	  
    }
  }); 
  
});

// error message manipulation
function showErrorField(pInputElement, pMessage, pErrorId) {
  var inputElement = $(pInputElement);

  if (!inputElement.hasClass(errorClass)) {
    inputElement.addClass(errorClass);
	inputElement.attr("aria-invalid","true");
  //  inputElement.before("<span class=\"" + errorClass + "\">" + pMessage + "</span>");
  $('#DATE_ERROR_MESSAGE'+pErrorId).text(pMessage);		   
   $('#DATE_ERROR_MESSAGE'+pErrorId).addClass('displayerror');
   $('#DATE_ERROR_MESSAGE'+pErrorId).focus();
	inputElement.focus();
  } else {
   // inputElement.prev().text(pMessage);
   $('#DATE_ERROR_MESSAGE'+pErrorId).text(pMessage);		   
   $('#DATE_ERROR_MESSAGE'+pErrorId).addClass('displayerror');
   $('#DATE_ERROR_MESSAGE'+pErrorId).focus();
  }
}

function hideErrorField(pInputElement,pErrorId) {
  var inputElement = $(pInputElement);		  
  if (inputElement.hasClass(errorClass)) {
    inputElement.removeClass(errorClass);
	inputElement.removeAttr("aria-invalid");
  //  inputElement.prev().remove();
  $('#DATE_ERROR_MESSAGE'+pErrorId).text("");		   
   $('#DATE_ERROR_MESSAGE'+pErrorId).removeClass('displayerror');
  }
}

// before form submit
// check if there are valerror class items AND only if simple search is empty (so advanced search is used)
function formHasErrors(pForm) {
  var errorsExist = false;
  var formElement = $(pForm);
  var simplesearch = $('#P1_QS').val();
  
  formElement.find('input, textarea, select').trigger('blur');

  if (formElement.find('.' + errorClass).length > 0 && simplesearch == '') {
    errorsExist = true;
  }

  return errorsExist;
}

function validateFormBeforeSubmit(pForm, pFiringElement) {
  var firingElement = $(pFiringElement);
  var originalOnclickEvent = firingElement.attr('onclick');
  var errormessage = "Voer een geldige datum in!";
  firingElement.data('origOnclickEvent', originalOnclickEvent);
  firingElement.removeAttr('onclick');

  firingElement.on('click', function() {
    if (!formHasErrors(pForm)) {
      eval(firingElement.data('origOnclickEvent'));
    } else {
		   apex.debug.info(errormessage);
    }
  });
}

function p4FormHasErrors(pForm) {
  var errorsExist = false;
  var formElement = $(pForm);
  
  formElement.find('input, textarea, select').trigger('blur');

  if (formElement.find('.' + errorClass).length > 0) {
    errorsExist = true;
  }

  return errorsExist;
}

function p4ValidateFormBeforeSubmit(pForm, pFiringElement) {
  var firingElement = $(pFiringElement);
  var originalOnclickEvent = firingElement.attr('onclick');
  var errormessage = "Voer een geldige datum in!";
  firingElement.data('origOnclickEvent', originalOnclickEvent);
  firingElement.removeAttr('onclick');

  firingElement.on('click', function() {
    if (!p4FormHasErrors(pForm)) {
      eval(firingElement.data('origOnclickEvent'));
    } else {
		   apex.debug.info(errormessage);
    }
  });
}

// single value validations
function isEmpty(pValue) {
  var isEmpty = false;

  if ($.trim(pValue) === "") {
    isEmpty = true;
  }

  return isEmpty;
}

function isPositiveInteger(pValue) {
  // an integer is a number that can be written without a fractional or decimal component
  var isPositiveInteger = false;
  var positiveIntegerRegex = /^\d+$/;

  if (pValue.match(positiveIntegerRegex)) {
    isPositiveInteger = true;
  }

  return isPositiveInteger;
}

function isValidDate(pValue) {
  var isValidDate = false;
  // date format is DD-MM-YYYY
  var dateFormatRegex = new RegExp("^(3[01]|[12][0-9]|0?[1-9])-(1[0-2]|0?[1-9])-(?:[0-9]{2})?[0-9]{2}$");

  if (pValue.match(dateFormatRegex)) {
    // seems that the date format is correct, but can we parse the date to a date object?
    var dateArray = pValue.split("-");
    var year = parseInt(dateArray[2]);
    var month = parseInt(dateArray[1], 10);
    var day = parseInt(dateArray[0], 10);
    var date = new Date(year, month - 1, day);

    if (((date.getMonth() + 1) === month) && (date.getDate() === day) && (date.getFullYear() === year)) {
      isValidDate = true;
    }
  }

  return isValidDate;
}

function isValidEmailAddress(pValue) {
  // source : http://stackoverflow.com/questions/7786058/find-the-regex-used-by-html5-forms-for-validation
  var isValidEmailAddress = false;
  var emailAddressRegex = /^[A-Za-z0-9!#$%&'*+-/=?^_`{|}~]+@[A-Za-z0-9-]+(.[A-Za-z0-9-]+)*$/;

  if (pValue.match(emailAddressRegex)) {
    isValidEmailAddress = true;
  }

  return isValidEmailAddress;
}

function containsWhitespace(pValue) {
  var trimmedLength = pValue.replace(/ /g, '').length;
  var containsWhitespace = false;

  if (pValue.length !== trimmedLength) {
    containsWhitespace = true;
  }

  return containsWhitespace;
}

function containsWhitespaceInString(pValue) {
  var originalLength = pValue.trim().length;
  var trimmedLength = pValue.replace(/ /g, '').length;
  var containsWhitespace = false;

  if (originalLength !== trimmedLength) {
    containsWhitespace = true;
  }

  return containsWhitespace;
}