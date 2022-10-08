var process = process || {env: {NODE_ENV: "development"}};
/**
 * Created by A704118 on 1-5-2019.
 */

var afmeldenLink;
var forcerenAfmeldenLink;
var afmeldenLinkNaarCIZ;
var buttonJa
var buttonNee

$(function () {
    forcerenAfmeldenLink = $('#forcerenAfmeldenLink').val();
    afmeldenLink = $('#afmeldenLink').val();
    afmeldenLinkNaarCIZ = $('#afmeldenLinkNaarCIZ').val();
    buttonJa = $('#buttonJa').val();
    buttonNee = $('#buttonNee').val();
    $('.logout').click(checkForConceptDocsBeforeLeavingPage);
    $('#upload').click(diasableLeavePageHandlerForVersturen);
});

function diasableLeavePageHandlerForVersturen(){
    afmeldenClicked = true;
}

function forceUserLogout() {
    $.ajax({
        url: forcerenAfmeldenLink,
        cache: false,
        dataType: 'json',
        success: function(resp) {
        }
    });
}

function checkForConceptDocsBeforeLeavingPage() {
    afmeldenClicked = true;
    var idOfButton = this.id;
    if (conceptDocs) {
        openInformeerNietVerstuurdeDocumentenAanwezigDialog(idOfButton);
    } else {
        if(idOfButton === 'terugNaarCIZ'){
            forceUserLogout();
            window.location = afmeldenLinkNaarCIZ;
        }else{
            window.location = afmeldenLink;
        }
    }
}

function openInformeerNietVerstuurdeDocumentenAanwezigDialog(idOfButton) {
    $("#informeerNietVerstuurdeDocumentenAanwezig_dialog").dialog({
        autoOpen: false,
        closeOnEscape: false,
        width: 760,
        height: 400,
        modal: true,
        buttons: [{
            type: 'cancel',
            id: 'informeerNietVerstuurdeDocumentenAanwezigCancelButton',
            text: buttonNee,
            click: function (e) {
                $(this).dialog("close");
            }},
            {
            type: 'submit',
            id: 'informeerNietVerstuurdeDocumentenAanwezigSubmitButton',
            text: buttonJa,
            click: function () {
                if(idOfButton === 'terugNaarCIZ'){
                    forceUserLogout();
                    window.location = afmeldenLinkNaarCIZ;

                }else{
                    window.location = afmeldenLink;
                }
                $(this).dialog("close");
            }
            }]
    });
    $("#informeerNietVerstuurdeDocumentenAanwezig_dialog").dialog('open');
    return false;
}

function afmeldenCallInBackend() {
    $.ajax({
        type: 'POST',
        url: afmeldenLink
    }).done(function (data, textStatus, jqXHR) {
        // Leaving page so do nothing here.
    });
}
