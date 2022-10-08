var process = process || {env: {NODE_ENV: "development"}};
function createMultiSelectField(element) {
    var multiselectHeightDefault = 200;
    $(element).multiselect({
        header: true,
        open: function () {
            $("html, body").animate({ scrollTop: $(this).position().top + multiselectHeightDefault}, 1000);
        }
    });
    $(element).on("multiselectbeforeclose", function (event, ui) {
        updateText(element);
    });
    updateText(element);
}

function updateText(element) {
    var listElement = $(element).siblings('div[class = "displaySelected"]').children('ul');
    listElement.html("");
    var selectedValues = $(element).multiselect("getChecked");
    if(selectedValues.length > 0) {
        $(element).closest("div").find('button').removeClass('errorBorder');
    }
    $.each(selectedValues, function (index, value) {
        listElement.append('<li>' + value.title + '</li>');
    });
}

$(function() {
    initMultiSelectField();
});

function initMultiSelectField(){
    $('select[multipleField = "true"]').each(function(index, element) {
        createMultiSelectField(element);
    });
}
