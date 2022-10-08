var process = process || {env: {NODE_ENV: "development"}};
//Function to pad input with zeros(default), or another character
$.stringPadLeft = function(input, length, character) {
    var output = input.toString();
    if (!character) {
        character = '0';
    }
    while (output.length < length) {
        output = character + output;
    }
    return output;
};

function makeDate(dayField,monthField,yearField){
    //day starts at 1
    var dayValue=$(dayField).val();
    //january is month 0
    //we need parseInt to have an Invalidate Date when monthvalue = '' in case of '---'
    var monthValue=parseInt($(monthField).val())-1;
    var yearValue=$(yearField).val();
    var returnDate;
    if(dayValue.toString().length > 0 && monthValue.toString().length > 0 && yearValue.toString().length > 0 ){
        returnDate=new Date(yearValue,monthValue,dayValue);
    }
    return returnDate;
}

function fillAutocompleteResultWithSelectedItem($target, selectedItem) {
    $target.parent().find("div.selected_item").remove();

    var divName = "#" + $target.attr('id') + "_template";
    var $infoTextDiv = ($target.closest("div").find(".infoText"));
    if($infoTextDiv.length > 0) {
        $(divName).tmpl(selectedItem).insertAfter($infoTextDiv);
    }else{
        $(divName).tmpl(selectedItem).insertAfter($target);
    }
    $("div.selected_item .remove").button({icons: {primary: "ui-icon-closethick"}, text: false});
}


function hideAndDisableElement(element){
    element.hide();
    element.prop('disabled', true);
}

function showAndEnableElement(element){
    element.show();
    element.prop('disabled', false);
}

$(document).on("keypress", ":input:not(textarea):not([type=submit])", function(event) {
    return event.keyCode !== 13;
});

function isIE(){
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    // other browser
    return false;
}

function unwrapAndShowSelectOption($optionElement){
    if(isIE()) {
            var span = $optionElement.parent();
            var $opt = $optionElement;
            if($optionElement.parent().is('span')) {
                $opt.show();
                $(span).replaceWith($opt);
            }
    } else {
        //all other browsers use standard .show()
        $optionElement.show();
    }
}

function wrapAndHideOpotion($optionElement){
    if ($optionElement.is('option') && (!$optionElement.parent().is('span'))) {
        $optionElement.wrap((isIE()) ? '<span>' : null).hide();
    }
}
