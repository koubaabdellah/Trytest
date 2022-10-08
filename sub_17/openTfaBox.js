$(document).ready(function () {    
    $("#tfa-information").click(function (e) { e.preventDefault(); OpenTfaBox("#formOpenTfaPopUp"); });  
});

function OpenTfaBox(target) {
    var elementTarget = $(target);
    var dialogCancelOverlay = $('#formCancelOverlay, .close-TFAbox, .cancel-TFAbox').hide();

    var closeOverlay = function () {
        elementTarget.hide();
        dialogCancelOverlay.hide();
        $('body').removeAttr('style')
    }
    var showOverlay = function () {
        $('body').css({
            'overflow-y': 'hidden'
        })
        elementTarget.show();
        dialogCancelOverlay.show();
        $('#openTFABox > .close-TFAbox').focus();

        var firstTab = lastTab = $('.close-TFAbox');

        // redirect last tab to first input
        lastTab.on("keydown", function (e) {
            if (e.which === 9 && !e.shiftKey) {
                e.preventDefault();
                firstTab.focus();
            }
        });

        // redirect first tab to first input
        firstTab.on('keydown', function (e) {
            if ((e.which === 9 && e.shiftKey)) {
                e.preventDefault();
                lastTab.focus();
            }
        });

        // close TFAbox with esc key 
        $('body').on("keyup", function (e) {
            if (e.which === 27) {
                $('.tf-dialog-box, #formOpenTfaPopUp').hide();
            }
        });

    }
    dialogCancelOverlay.click(closeOverlay);
    showOverlay();
}