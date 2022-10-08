var process = process || {env: {NODE_ENV: "development"}};
var incorrectBsnErrorMessage;
var genericNullableErrorMessage;
var buttonOk;
var keepTrack;

$(function () {
    incorrectBsnErrorMessage = $('#incorrectBsnErrorMessage').val();
    genericNullableErrorMessage = $('#genericNullableErrorMessage').val();
    buttonOk = $('#buttonOk').val();
    keepTrack = $('#keepTrack').val();

    $('#submit').click(checkBsnAndToegangscode);
    if (keepTrack){
        openUploadDocumentTimeoutDialog();
    }

    $('#j_username').blur(checkBsn);
    $('#j_password').blur(checkToegangscode)
    $('#loginForm').on('keypress', function(event){ if (event.keyCode == 13) $('#submit').click()});
});

function checkBsnAndToegangscode() {
    bsnOK = checkBsn();
    toegangscodeOK = checkToegangscode();
    return bsnOK && toegangscodeOK;
}

function checkBsn() {
    var inputField = $('#j_username');
    $('#nullableBsnError').remove();
    $('#incorrectBsnError').remove();
    inputField.removeClass("errorBorder");
    var bsn = inputField.val();
    if (bsn === '' || bsn === null){
        inputField.after('<div class="error-message" id="nullableBsnError" style="display:block"><span class="error">' + genericNullableErrorMessage + '</span></div>');
        inputField.addClass("errorBorder");
        return false;
    } else {
        return validateFilledBSN(inputField, bsn);
    }
}
function validateFilledBSN(inputField, bsn){
    while (bsn.length >= 7 && bsn.length < 9) {
        bsn = '0' + bsn;
    }
    inputField.val(bsn);
    var valueAsArray = bsn.split('').reverse();
    var checksum = 0;
    var outcome;
    $.each(valueAsArray, function (index, item) {
        if (index === 0) {
            checksum -= item;
        } else {
            checksum += item * (index + 1);
        }
    });
    outcome = (checksum % 11 === 0) && bsn.length === 9;
    if (!outcome) {
        inputField.after('<div class="error-message" id="incorrectBsnError" style="display:block"><span class="error">' + incorrectBsnErrorMessage + '</span></div>');
        inputField.addClass("errorBorder");
    }
    return outcome;
}

function checkToegangscode() {
    var inputField = $('#j_password');
    $('#nullableToeganscodeError').remove();
    inputField.removeClass("errorBorder");
    var Toegangscode = inputField.val();
    if (Toegangscode === null || Toegangscode === ''){
        inputField.after('<div class="error-message" id="nullableToeganscodeError" style="display:block"><span class="error">' + genericNullableErrorMessage + '</span></div>');
        inputField.addClass("errorBorder");
        return false;
    } else {
        return true;
    }
}

function openUploadDocumentTimeoutDialog() {
    $("#uploadDocumentTimeout_dialog").dialog({
        autoOpen: false,
        closeOnEscape: false,
        width: 760,
        height: 400,
        modal: true,
        buttons: [
            {
                type: 'cancel',
                id: 'informeerHuisartsToestemmingsvraagCancelButton',
                text: buttonOk,
                click: function (e) {
                    $(this).dialog("close");
                }

            }]
    });
    $("#uploadDocumentTimeout_dialog").dialog('open');
}
