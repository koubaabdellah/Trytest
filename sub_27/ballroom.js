$(document).ready(function () {
    $("#ctl00_QsPH_contactForm_txt_mail, #ctl00_QsPH_contactForm_txt_opmerkingen").focusout(function (field) {
        checkFields(field);
    });
});

function checkFields(field) {
    let selector = $(field.target),
        filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        mytype = $(selector).attr("id");

    if (mytype == "ctl00_QsPH_contactForm_txt_mail" || mytype == "ctl00_QsPH_contactForm_txt_opmerkingen") {
        if ($(selector).val() == ("") && mytype == "ctl00_QsPH_contactForm_txt_mail") {
            $(selector).siblings(".error").html("Een e-mailadres is verplicht").attr("role", "alert");
            $(selector).css("border-color", "#B30000");
            return;
        }
        else if ($(selector).val() == ("") && mytype == "ctl00_QsPH_contactForm_txt_opmerkingen") {
            $(selector).siblings(".error").html("Een opmerking is verplicht").attr("role", "alert");
            $(selector).css("border-color", "#B30000");
            return;
        }
        else if (mytype == "ctl00_QsPH_contactForm_txt_mail" && (!filter.test($(selector).val()))) {
            $(selector).siblings(".error").html("Geen geldig e-mailadres").attr("role", "alert");
            $(selector).css("border-color", "#B30000");
            return;
        }
        else {
            $(selector).siblings(".error").html("").attr("role", "");
            $(selector).css("border-color", "");
        }
    }
}