var process = process || {env: {NODE_ENV: "development"}};

var toegangscodeActiverenButton;
var toegangscodeActiverenLink;
var activatedDialogTitle;

$(function () {
    $('#toegangscode\\.error').hide();
    toegangscodeActiverenButton = $("#toegangscode_activate");

    toegangscodeActiverenButton.click(function (e) {
        e.preventDefault();
        if (!validateToegangscodeFields()) {
            e.stopPropagation();
        } else {
            $.ajax({
                url: toegangscodeActiverenLink,
                type: 'POST',
                dataType: 'json',
                data: $("form#toegangscodeActiverenForm").serialize(),
                success: function (dataJson) {
                    $('#toegangscode\\.error').hide();
                    openActivatedPopup();
                },
                error: function (dataJson) {
                    $('#toegangscode\\.error').html('- ' + dataJson.responseText);
                    $('#toegangscode\\.error').show()
                }
            })
        }
    });

    $('#email').bind('copy paste', function (e) {
        e.preventDefault();
    });

    $('#emailConfirmation').bind('copy paste', function (e) {
        e.preventDefault();
    });
});

function validateToegangscodeFields() {
    var isToegangscodeValid = true;
    var areEmailsValid = true;
    if(!$("#toegangscode").val()) {
        $("#toegangscode").addClass('errorBorder');
        $("div[id='toegangscode.error.notvalid']").hide();
        $("div[id='toegangscode.error']").hide();
        $("div[id='toegangscode.nullable']").show();
        isToegangscodeValid = false;
    } else {
        $("#toegangscode").removeClass('errorBorder');
        $("div[id='toegangscode.error.notvalid']").hide();
        $("div[id='toegangscode.error']").hide();
        $("div[id='toegangscode.nullable']").hide();
    }
    if(!$("#email").val()) {
        areEmailsValid = false;
        $("#email").addClass('errorBorder');
        $("div[id='email_required']").show();
    } else {
        $("#email").removeClass('errorBorder');
        $("div[id='email_required']").hide();
    }
    if(!$("#emailConfirmation").val()) {
        areEmailsValid = false;
        $("#emailConfirmation").addClass('errorBorder');
        $("div[id='emailConfirmation_required']").show();
    } else {
        $("#emailConfirmation").removeClass('errorBorder');
        $("div[id='emailConfirmation_required']").hide();
    }
    areEmailsValid = areEmailsValid && validateEmailFields($("#email"), $("#emailConfirmation"));
    return areEmailsValid && isToegangscodeValid;
}

function openActivatedPopup() {
    $("#activated_dialog").dialog({
        title: activatedDialogTitle,
        width: 500,
        height: 300,
        modal: true,
        buttons: [{
            type: 'submit',
            text: 'Sluiten',
            click: function () {
                $(this).dialog("close");
                window.location.href = $("#cizURL").val();
            }
        }]
    });
}

