var process = process || {env: {NODE_ENV: "development"}};
var validateAppAllowedPerEmail;
var validateIndienenCommand;
var validateInformeerHuisartsToestemmingsvraag;
var dialogTitleLimitReached;
var buttonSluiten;
var buttonJa;
var buttonNee;

$(function () {
    validateAppAllowedPerEmail =  $('#validateAppAllowedPerEmail').val();
    validateIndienenCommand =  $('#validateIndienenCommand').val();
    validateInformeerHuisartsToestemmingsvraag =  $('#validateInformeerHuisartsToestemmingsvraag').val();
    dialogTitleLimitReached = $('#dialogTitleLimitReached').val();
    buttonSluiten = $('#buttonSluiten').val();
    buttonJa = $('#buttonJa').val();
    buttonNee  = $('#buttonNee').val();
    if ($('#emailAdres').val() !== "" || $('#controleEmailAdres').val() !== "") {
        validateEmailFields();
    }

    $(".helpIcon").bind("click", function (e) {
        e.preventDefault();
        initializeHelpTexts();
    });

    $(".helpText").toggle();
    $(".helpText").toggle();

    $('#controleEmailAdres').bind('copy paste', function (e) {
        e.preventDefault();
    });

    $('#create').click(function(e) {
        e.preventDefault();
        if(validateEmailFields()) {
            $.ajax({
                url: validateIndienenCommand,
                type: 'POST',
                dataType: 'json',
                data: $("form#aanvraagForm").serialize()
            }).done(function (responseData) {
                if(responseData)    {
                    informeerHuisartsToestemmingsvraagValidation()
                } else {
                    toggleEmailError(responseData,'001009')
                }
            });
        }
    });

    $('#cizhome').click(function(e) {
        e.preventDefault();
        var redirectURL= $("#indienenURL").val();
        window.location.href = (redirectURL);

    });
});

function informeerHuisartsToestemmingsvraagValidation()   {
    $.ajax({
        url: validateInformeerHuisartsToestemmingsvraag,
        type: 'POST',
        dataType: 'json',
        data: $("form#aanvraagForm").serialize()
    }).done(function (responseData) {
        if (responseData === 0) {
            emailAndIpadressValidation()
        } else {
            showInformeerHuisartsToestemmingsvraagPopup(responseData);
        }
    });
}

function emailAndIpadressValidation()   {
    $.ajax({
        url: validateAppAllowedPerEmail,
        type: 'POST',
        dataType: 'json',
        data: {'email': $('#emailAdres').val()}
    }).done(function (responseData) {
        if (responseData >= 0 && responseData < 5) {
            showLimitReachedPopup(responseData);
        } else if (responseData >= 5 && responseData <8) {
            showLastRequestPopup(responseData);
        } else {
            submitForm();
        }
    });
}


function submitForm(){
    $('#lastRequestCloseButton').prop({disabled: true});
    $("button[id^='create']").prop({disabled: true});
    var form = $('#aanvraagForm');
    form.submit();
    form[0].reset();
}

function showLimitReachedPopup(responseData) {
    if(responseData === 0)  {
        $('#emailLimitReached').css('display','block');
        $('#ipadresLimitReached').css('display','block');
    }else if(responseData === 1) {
        $('#ipadresLimitReached').css('display','block');
        $('#emailLastReqInLimReached').css('display','block');
    }else if(responseData === 2) {
        $('#emailLimitReached').css('display','block');
        $('#ipadresLastReqInLimReached').css('display','block');
    }else if(responseData === 3) {
        $('#emailLimitReached').css('display','block');
    }else if(responseData === 4) {
        $('#ipadresLimitReached').css('display','block');
    }
    $("#limitReached_dialog").dialog({
        autoOpen: false,
        closeOnEscape: false,
        width: 750,
        height: 400,
        modal: true,
        title: dialogTitleLimitReached,
        buttons: [{
            tabindex: 201,
            type:'submit',
            text: buttonSluiten,
            click: function () {
                $(this).dialog("close");
                $('#emailLimitReached').css('display','none');
                $('#ipadresLimitReached').css('display','none');
                $('#emailLastReqInLimReached').css('display','none');
                $('#ipadresLastReqInLimReached').css('display','none');
            }
        }]
    });
    $("#limitReached_dialog").dialog('open');
}

function showInformeerHuisartsToestemmingsvraagPopup(responseData) {
    var situation = responseData;
    if(situation === 1) {
        openInformeerHuisartsHuisartsEmptyDialog();
    } else if(situation === 2) {
        openInformeerHuisartsPraktijkEmptyDialog();
    }
}

function openInformeerHuisartsHuisartsEmptyDialog() {
    $("#informeerHuisartsHuisartsEmpty_dialog").dialog({
        autoOpen: false,
        closeOnEscape: false,
        width: 760,
        height: 400,
        modal: true,
        buttons: [{
            type: 'submit',
            id: 'informeerHuisartsToestemmingsvraagSubmitButton',
            text: buttonJa,
            click: function (e) {
                $(this).dialog("close");
                emailAndIpadressValidation();
            }},
            {
                type: 'cancel',
                id: 'informeerHuisartsToestemmingsvraagCancelButton',
                text: buttonNee,
                click: function (e) {
                    $(this).dialog("close");
                }

            }]
    });
    $("#informeerHuisartsHuisartsEmpty_dialog").dialog('open');
}

function openInformeerHuisartsPraktijkEmptyDialog() {
    $("#informeerHuisartsPraktijkEmpty_dialog").dialog({
        autoOpen: false,
        closeOnEscape: false,
        width: 760,
        height: 400,
        modal: true,
        buttons: [{
            type: 'submit',
            id: 'informeerHuisartsToestemmingsvraagSubmitButton',
            text: buttonJa,
            click: function (e) {
                $(this).dialog("close");
                emailAndIpadressValidation();
            }},
            {
                type: 'cancel',
                id: 'informeerHuisartsToestemmingsvraagCancelButton',
                text: buttonNee,
                click: function (e) {
                    $(this).dialog("close");
                }

            }]
    });
    $("#informeerHuisartsPraktijkEmpty_dialog").dialog('open');
}

function showLastRequestPopup(responseData) {
    if(responseData === 5)  {
        $('#emailLastReq').css('display','block');
        $('#ipadresLastReq').css('display','block');
    }else if(responseData === 6) {
        $('#ipadresLastReq').css('display','block');
    }else if(responseData === 7) {
        $('#emailLastReq').css('display','block');
    }
    $("#lastRequest_dialog").dialog({
        autoOpen: false,
        closeOnEscape: false,
        width: 760,
        height: 400,
        modal: true,
        buttons: [{
            type:'submit',
            id : 'lastRequestCloseButton',
            text: buttonSluiten,
            click: function (e) {
                submitForm();
                $(this).dialog("close");
                $('#emailLastReq').css('display','none');
                $('#ipadresLastReq').css('display','none');
            }
        }]
    });
    $("#lastRequest_dialog").dialog('open');
}

function validateEmailFields() {
    var email1 = $('#emailAdres').val();
    var email2 = $('#controleEmailAdres').val();
    var ondertekening = $('input[id="indienenCommand\\.ondertekening"]:checked').val();
    var isOndertekeningPresent = isRadioTagEmpty(ondertekening);
    toggleOndertekeningError(isOndertekeningPresent);

    var validateEmail1 = validateEmail($('#emailAdres'));
    var validateEmail2 = validateEmail($('#controleEmailAdres'));

    var isEmailEqual = email1 === email2;
    if (validateEmail1 && validateEmail2) {
        toggleEmailError(isEmailEqual,'017024');
    }
    return isEmailEqual && validateEmail1 && validateEmail2 && isOndertekeningPresent;
}

function toggleEmailError(flag,errorcode){
    $("div[id='" + $('#controleEmailAdres').attr('id') + "_functionele_melding."+ errorcode+"']").toggle(!flag);
    toggleEmailErrorBorder(flag);
}

function isRadioTagEmpty(ondertekening) {
    return ondertekening !== null && ondertekening !== '' && ondertekening !== undefined;
}

function toggleEmailErrorBorder(flag){
    if(flag){
        $("input[id*='mailAdres']").removeClass('errorBorder');
    }else{
        $("input[id*='mailAdres']").addClass('errorBorder');
    }
}

function toggleOndertekeningError(flag) {
    $('#indienen\\.ondertekening\\.error').toggle(!flag);
    if(flag) {
        $('input[id*="indienen\\.ondertekening"]').removeClass('errorBorder');
    } else {
        $('input[id*="indienen\\.ondertekening"]').addClass('errorBorder');
    }
}

