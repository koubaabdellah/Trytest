// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  REGEX CHECKS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var regexForCheckGivenBid = new RegExp('^([1-9][0-9]*)$');
var regexForCheckPhoneNumber = new RegExp('^[1-9][0-9]{8}$');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  FUNCTIONS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Function to check the given bid value and show error if needed. If the given bid is valid
// then let the user be able to proceed to the next step.
var bidChangedEvent = function (elem) {
  var bidValue = parseInt($(elem).val());
  var minimumBidAmount = parseInt($(elem).data('minimum-bid-amount'));
  var previousBidExist = $(elem).parents('.digital-bidding').find('span[data-bid-value]').data('bid-value') > 0;
  var previousBid = $(elem).parents('.digital-bidding').find('span[data-bid-value]').data('bid-value');
  
  if (previousBidExist) {
    if (bidValue < minimumBidAmount || !regexForCheckGivenBid.test($(elem).val()) || bidValue <= previousBid) {
      $('#bid-error-message').hide();
      $('#next-bid-error-message').show();
      $('#placebid-btn').addClass('disabled');
      $('#placebid-btn').data('disabled', true);
    } else {
      $('#bid-error-message').hide();
      $('#next-bid-error-message').hide();
      $('#placebid-btn').data('modalid', "placebid-modal");
      $('#placebid-btn').removeClass('disabled');
      $('#placebid-btn').data('disabled', false);
    }
  }
  else {
    if (bidValue < minimumBidAmount || !regexForCheckGivenBid.test($(elem).val())) {
      $('#bid-error-message').show();
      $('#placebid-btn').addClass('disabled');
      $('#placebid-btn').data('disabled', true);
    }
    else {
      $('#bid-error-message').hide();
      $('#next-bid-error-message').hide();
      $('#placebid-btn').data('modalid', "placebid-modal");
      $('#placebid-btn').removeClass('disabled');
      $('#placebid-btn').data('disabled', false);
    }
  }
};

var requiredFieldChangedEvent = function (elem) {
  var value = $(elem).val();
  if (value === "" || value === "0") {
    $(elem).next().show();
  }
  else {
    $(elem).next().hide();
  }
};

var processSkipNextStep = function (elem) {
  $(elem).closest('section').hide();

  var nextElem = $($(elem).data('next-step-id')).find('[data-next-step-id]');
  $($(nextElem).data('next-step-id')).show();
  $($(nextElem).data('next-step-id')).find('.placebid-btn-previous').data('previous-step-id', '#' + $(elem).closest('section').attr('id'));

  return $($(nextElem).data('next-step-id')).find('[data-next-step-id]');
};

var processNextStep = function (elem) {
  $(elem).closest('section').hide();
  $($(elem).data('next-step-id')).show();
  $($(elem).data('next-step-id')).find('.placebid-btn-previous').data('previous-step-id', '#'+ $(elem).closest('section').attr('id'));
  return $($(elem).data('next-step-id')).find('[data-next-step-id]');
};

var processPreviousStep = function(elem) {
  $(elem).closest('section').hide();
  $($(elem).data('previous-step-id')).show();
  return $($(elem).data('previous-step-id')).find('[data-next-step-id]');
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  BIDDING BLOCK ON \BIDBOOK\VIEW PAGE
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// When the user clickes on the button called 'Next step'.

var placeBidHandler = function () {
  var previousBidExist = $(this).parent().find('span[data-bid-value]').data('bid-value') > 0;
  var bidGivenByUser = parseInt($('input[name="bid"]').val());
  $('#placebid-modal input[name="bidvalue"]').val($('input[name="bid"]').val());
  $('#placebid-modal #enteredBidValue').html($('#placebid-modal input[name="bidvalue"]').val());

  if (bidGivenByUser === 0) {
    if (previousBidExist) {
      $('#next-bid-error-message').show();
    } else {
      $('#bid-error-message').show();
    }
  }
};

$('a#placebid-btn').on('click', placeBidHandler).on('keypress', function(e) {
  if (e.which === 13) {
    $(this).trigger('click');
  }
});

// We perform a check with every character that the user enters.
// This check the input field when its the first bid ever given.
$('input[name="bid"]').on('input', function () {
  bidChangedEvent(this);
}).trigger('input');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  STEP - ACCEPTING THE TERMS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-modal #acceptTerms').on('click', function () {
  var isChecked = $('input[name="conditionsAgreed"]:checked').length > 0;
  if (isChecked) {
    $('#placebid-modal #acceptTermsErrorMsg').hide();
    $('input[name="termsAccepted"]').val(true);
    processNextStep(this);
  } else {
    $('#placebid-modal #acceptTermsErrorMsg').show();
  }
});

$('#placebid-modal input[name="conditionsAgreed"]').on('change', function () {
  var isChecked = $('input[name="conditionsAgreed"]:checked').length > 0;
  if (isChecked) {
    $('#placebid-modal #acceptTermsErrorMsg').hide();
  } else {
    $('#placebid-modal #acceptTermsErrorMsg').show();
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  STEP - BUSINESS INFO REQUIRED
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-modal #saveBusinessInfo').on('click', function (e) {
  var success = true;
  $('#businessfields').find('.error-message-new').hide();

  if ($('input[name="chamberOfCommerceFileIds"]').length > 0) {
    if ($('#bi_Organisation').length > 0 && !($('#bi_Organisation').val().trim())) {
      $('#bi_Organisation').next().show();
      success = false;
    }
    if ($('#bi_LegalForm').length > 0 && $('#bi_LegalForm').val() === '0') {
      $('#bi_LegalForm').next().show();
      success = false;
    }
    if ($('#bi_ChamberOfCommerce').length > 0 && !($('#bi_ChamberOfCommerce').val().trim())) {
      $('#bi_ChamberOfCommerce').next().show();
      success = false;
    }
  }

  if (!success) {
    e.stopPropagation();
    return false;
  }

  processNextStep(this);
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  STEP - CHAMBER OF COMMERCE UPLOAD
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-modal #cocUpload').on('click', function () {
  if ($('input[name="chamberOfCommerceFileIds"]').length === 0 && $('#filesUploadedCoc[data-coc-required]').length > 0) {
    $('#placebid-modal #sectionCocUpload li.no-data').hide();
    $('#placebid-modal #sectionCocUpload #filesUploadedCocError').show();
  }
  else {
    $('#placebid-modal #sectionCocUpload #filesUploadedCocError').hide();
    if ($('#filesUploadedCoc[data-coc-required]').length > 0) {
      processNextStep(this);
    } else if ($('input[name="chamberOfCommerceFileIds"]').length > 0) {
      processNextStep(this);
    } else {
      processSkipNextStep(this);
    }
  }
});

$('#placebid-modal').on('click', 'a.remove-file', function (e) {
  e.preventDefault();
  var item = $(e.target).parents('li');

  $.ajax({
    url: "/bidbook/cancelupload",
    method: "POST",
    data: { fileId: item.data('file-id') }
  });

  $('input[name="chamberOfCommerceFileIds"][value=' + item.data('file-id') + '], input[name="declarationFormFileId"][value=' + item.data('file-id') + ']').remove();
  if (item.parents('#sectionDeclarationUpload').length > 0) $('#placebid-modal #sectionDeclarationUpload a.button[data-upload]').removeClass('disabled');
  item.remove();
});

$('#placebid-modal a.button[data-upload]').on('click', function (e) {
  if ($(e.currentTarget).hasClass('disabled')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    return false;
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  STEP - DECLARATION UPLOAD
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-modal #declarationUpload').on('click', function () {
  if ($('input[name="declarationFormFileId"]').val()) {
    $('#placebid-modal #sectionDeclarationUpload #filesUploadedDeclarationError').hide();
    processNextStep(this);
  } else {
    $('#placebid-modal #sectionDeclarationUpload li.no-data').hide();
    $('#placebid-modal #sectionDeclarationUpload #filesUploadedDeclarationError').show();
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  STEP - SMS VERIFICATION PROCESS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-modal').on('input', '#sms_Number', function () {
  var telephoneNumber = $('#placebid-modal #sms_Number');
  if (regexForCheckPhoneNumber.test(telephoneNumber.val())) {
    telephoneNumber.parents('#smsverificationfields').find('#errorSmsNumber').hide();
  } else {
    telephoneNumber.parents('#smsverificationfields').find('#errorSmsNumber').show();
  }
});

$('#placebid-modal #sendSms').on('click', function (e) {
  e.preventDefault();
  var telephoneNumber = $('#placebid-modal #sms_Number');

  if (regexForCheckPhoneNumber.test(telephoneNumber.val())) {
    // laat de tekst zien dat de gebruiker binnen x aantal seconden de sms ontvangt.
    $('#placebid-modal #sms-receives-msg').show();
    var i = 19;
    setInterval(function () {
      $('#placebid-modal #sms-countdown').html(i);
      if (i > 0) i--;
    }, 1000);

    // dan sms versturen
    $.ajax({
      url: "/bidding/GeneratePinForBidAndSendSms",
      method: "POST",
      data: { phoneNumber: "31" + telephoneNumber.val() },
      success: function (response) {
        if (response.Success === true) {
          $('#placebid-modal #smsStepOne').hide();
          $('#placebid-modal #errorSendingSms').hide();
          $('#placebid-modal #smsStepTwo').show();
        } else {
          $('#placebid-modal #sms-receives-msg').hide();
          $('#placebid-modal #smsStepOne').show();
          $('#placebid-modal #errorSendingSms').show();
          $('#placebid-modal #smsStepTwo').hide();
        }
      }
    });
  } else {
    telephoneNumber.parents('#smsverificationfields').find('#errorSmsNumber').show();
  }
});

$('#placebid-modal #checkSmsCode').on('click', function (e) {
  e.preventDefault();
  var code = $('#placebid-modal #sms_Code');

  if (code.val() === "") {
    code.next().show();
  } else {
    $.ajax({
      url: "/bidding/CheckVerificationCodeBid",
      method: "POST",
      data: { codeEnteredByUser: code.val() },
      success: function (response) {
        if (response.Success === true) {
          code.next().hide();
          $('#placebid-modal #sms-verification-complete-msg').show();
          setTimeout(function () {
            processNextStep($('#placebid-modal #checkSmsCode'));
          }, 2000);
        } else {
          code.next().show();
        }
      }
    });
  }
});

$('#placebid-modal #sendSmsAgain').on('click', function (e) {
  e.preventDefault();
  var telephoneNumber = $('#placebid-modal #sms_Number');

  if (regexForCheckPhoneNumber.test(telephoneNumber.val())) {
    $('#placebid-modal #sms-sendagain-msg').show();
    var sendAgainSmsInterval = 19;
    setInterval(function () {
      $('#placebid-modal #sms-sendagain-countdown').html(sendAgainSmsInterval);
      if (sendAgainSmsInterval > 0) {
        sendAgainSmsInterval--;
      }
      else {
        $('#placebid-modal #sms-sendagain-msg').hide();
      }
    }, 1000);

    $.ajax({
      url: "/bidding/GeneratePinForBidAndSendSms",
      method: "POST",
      data: { phoneNumber: "31" + telephoneNumber.val() },
      success: function (response) {
        if (response.Success === true) {
        }
      }
    });
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  STEP - CONFIRM YOUR BID
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var doubleClickDelay = 700;
var doubleClickCounter = 0;
var doubleClickTimer = null;

$('#placebid-modal #confirmBid').on('click', function (e) {
    e.preventDefault();

    // haalt alle tijdelijk aangemaakt forms weg welke ajax upload aanmaakt.
    // indien een upload niet goed gaat of men klikt op annuleren blijft er namelijk een form staan en dat geeft problemen.
    $('form[target^="ajaxupload"]').remove();

    doubleClickCounter++; //count clicks

    if (doubleClickCounter === 1) {
      doubleClickTimer = setTimeout(function () {
        // at this stage the user has performed a single-click action
        doubleClickCounter = 0; //after action performed, reset counter
      }, doubleClickDelay);
    } else {
      clearTimeout(doubleClickTimer); //prevent single-click action
      $('#placebid-modal #savebid-msg').show();
      var i = 19;
      setInterval(function () {
        $('#placebid-modal #savebid-countdown').html(i);
        if (i > 0) i--;
      }, 1000);
      $('#placebid-modal .placebid-form').submit();
      doubleClickCounter = 0; //after action performed, reset counter
    }
  }).on("dblclick", function (e) { e.preventDefault(); }); //cancel system double-click event

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  BID SUCCESSFUL MODAL\POPUP
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-succesbid #closeModal').on('click', function (e) {
  e.preventDefault();
  $('#placebid-succesbid').foundation('reveal', 'close');
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  USER SKIPS PROCESS (BY CLICKING ON THE SKIP BUTTON)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-modal #skipStep').on('click', function () {
  processNextStep(this);
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++  USER CANCELED PROCESS (BY CLICKING ON X OR CANCEL BUTTON)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$('#placebid-modal #placebid-btn-cancel, #placebid-modal #placebid-close-modal').on('click', function (e) {
  e.preventDefault();

  var chamberOfCommerceFileIdFields = $('input[name=chamberOfCommerceFileIds]');
  var chamberOfCommerceFileIds = [];
  chamberOfCommerceFileIdFields.each(function () {
    var element = $(this);
    chamberOfCommerceFileIds.push(element.val());
    element.remove();
  });

  var declarationFormFileId = $('input[name=declarationFormFileId]');

  $.ajax({
    url: "/bidbook/cancelbid",
    method: "POST",
    data: { chamberOfCommerceFileIds: chamberOfCommerceFileIds, declarationFormFileId: declarationFormFileId.val() },
    success: function () {
      declarationFormFileId.attr('value', '');

      // making the buttons visible again, so that the user can upload files and hide the check marks
      $('button[data-upload]').prop('disabled', false);
      $('i.fa-check').hide();
      $('img.coc-file-data').hide();
      $('img.df-file-data').hide();

      $('#placebid-modal').foundation('reveal', 'close');
    }
  });

  location.reload(true);
});

var doubleClickDelay = 700;
var doubleClickCounter = 0;
var doubleClickTimer = null;

$('#placebid-modal button[data-force-doubleclick-for-submit]').on("click", function (e) {
    e.preventDefault();

    // haalt alle tijdelijk aangemaakt forms weg welke ajax upload aanmaakt.
    // indien een upload niet goed gaat of men klikt op annuleren blijft er namelijk een form staan en dat geeft problemen.
    $('form[target^="ajaxupload"]').remove();

    var form = $(this).parents().find('form');

    doubleClickCounter++; //count clicks

    if (doubleClickCounter === 1) {
      doubleClickTimer = setTimeout(function () {
        // at this stage the user has performed a single-click action
        doubleClickCounter = 0; //after action performed, reset counter
      }, doubleClickDelay);
    } else {
      clearTimeout(doubleClickTimer); //prevent single-click action
      form.submit();
      doubleClickCounter = 0; //after action performed, reset counter
    }
  })
  .on("dblclick", function (e) {
    e.preventDefault(); //cancel system double-click event
  });

$('#placebid-modal .placebid-btn-previous').on('click', function () {
  processPreviousStep(this);
});
