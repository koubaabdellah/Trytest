var process = process || {env: {NODE_ENV: "development"}};
var tabs = {
    0: "ondertekening",
    1: "bevestigen"
};

var currentTab = 0;
var digitalOndertekening;
var machtigDownloadOpt = ["1", "2"];
var messageCloseWindow
var secondmessage

$(function () {
    messageCloseWindow = $('#messageCloseWindow').val();
    secondmessage = $('#secondmessage').val();
    digitalOndertekening = $('#digitalOndertekening').val();
    setUpBevestigenMenuLinks();
    setUpBevestigenFlowButtons();
    setUpOnChange();
    initSignature();
});

function setUpOnChange() {
    setUpOnOndertekeningChange();
}

function setUpOnOndertekeningChange() {
    $("input[id*=ondertekeningRadio]").change(function(){
        if($("input[id*=ondertekeningRadio]:checked").val() === digitalOndertekening) {
            $("div#digital_div").show();
            $("div#schriftelijke_div").hide();
        } else {
            $("div#digital_div").hide();
            $("div#schriftelijke_div").show();
        }
    });
    $("input[id*=ondertekeningRadio]").change();

    if($("#ondertekenaar_straatnaam").val()) {
        $("#ondertekenaar_huisletter").prop("readOnly", false);
        $("#ondertekenaar_huisnummertoevoeging").prop("readOnly", false);
    }

    $("select[id*=wieOndertekent]").change(function() {
        if (machtigDownloadOpt.indexOf($("select[id*=wieOndertekent] option:selected").val()) > -1) {
            $("div#machtigDownload").show();
        } else {
            $("div#machtigDownload").hide();
        }
    });
}

function checkBevestigenFlowButtons() {
    if(currentTab === 0) {
        $("#previousBevestigen").hide();
    } else if(currentTab > 0) {
        $("#previousBevestigen").show();
    }
    if(currentTab < Object.keys(tabs).length-1) {
        $("#nextBevestigen").show();
    } else if(currentTab === Object.keys(tabs).length-1) {
        $("#nextBevestigen").hide();
    }

}

function setUpBevestigenFlowButtons() {
    $("#previousBevestigen").click(function(e) {
        e.preventDefault();
        if(validateBevestigenTab(currentTab) && saveBevestigenTab(currentTab)) {
            $("#"+tabs[--currentTab]).click();
        }
    });

    $("#nextBevestigen").click(function(e) {
        e.preventDefault();
        if(validateBevestigenTab(currentTab) && saveBevestigenTab(currentTab)) {
            $("#"+tabs[++currentTab]).click();
        }
    });
    checkBevestigenFlowButtons();
}

function resetFrames() {
    for(var i=0; i<Object.keys(tabs).length; i++) {
        $("#"+tabs[i]+"_content").hide();
    }
}

function setTabActive(tabNum) {
    resetFrames();
    $("#"+tabs[tabNum]+"_content").show();
    currentTab = tabNum;
    initializePiwikTrackingforToegangCode();
}

function initializePiwikTrackingforToegangCode(){
    if(location.href.indexOf('toegangscodeActiveren') !== -1){
        logPiwikAnalyticsData('#toegangscodeActiveren');
    }
}

function setUpBevestigenMenuLinks() {
    setTabActive(0);
    for(var i=0; i<Object.keys(tabs).length; i++) {
        setUpMenuItemClicks($('#'+tabs[i]), i);
    }

}

function setUpMenuItemClicks($element, tabIndex) {
    $element.click(function (e) {
        e.preventDefault();
        if(validateBevestigenTab(currentTab) && saveBevestigenTab(currentTab)) {
            setTabActive(tabIndex);
            checkBevestigenFlowButtons();
        }
        logPiwikAnalyticsData(tabs[currentTab])
    });
}

function validateBevestigenTab(tabIndex){
    var isValidated = true;

    if(tabIndex === 0) {
        isValidated = validateOndertekening();
    }

    return isValidated;
}

function validateOndertekening() {
    var isValid = validRadiobuttons("input[id*=ondertekeningRadio]");
    (isValid)? $("#ondertekeningRadio_required").hide(): $("#ondertekeningRadio_required").show();

    if($("input[name='ondertekeningRadio']:checked").val() === digitalOndertekening) {
        isValid = checkIfEmpty("wieOndertekent") && isValid;
        isValid = checkIfEmpty("ondertekenaarNaam") && isValid;
        isValid = validAdresComponent("#ondertekenaar") && isValid;
        isValid = checkSignatureEmpty("handtekeningImage") &&isValid;
    }

    return isValid;
}

function checkIfEmpty(fieldName) {
    var isValid = true;
    if(!$("#"+fieldName).val()) {
        $("#"+fieldName).addClass('errorBorder');
        $("#"+fieldName+"_required").show();
        isValid = false;
    } else {
        $("#"+fieldName).removeClass('errorBorder');
        $("#"+fieldName+"_required").hide();
    }
    return isValid;
}

function checkSignatureEmpty(fieldName){
    var isValid = true;
    if(!$("#"+fieldName).val()) {
        $("#canvasSimpleDiv").addClass('errorBorder');
        $("#"+fieldName+"_required").show();
        isValid = false;
    } else {
        $("#canvasSimpleDiv").removeClass('errorBorder');
        $("#"+fieldName+"_required").hide();
    }
    return isValid;
}

function saveBevestigenTab(tabIndex) {
    var saveSuccessful = true;
    if(tabIndex === 0) {
        saveSuccessful = saveOndertekeningTab();
    }
    return saveSuccessful;
}

function saveOndertekeningTab() {
    var saveSuccessful = true;

    $.ajax({
        type: 'POST',
        url: $('#saveOndertekening').val(),
        dataType: 'json',
        data: $("form[id*=ondertekeningForm]").serialize(),
        async: false,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error thrown with textStatus: "+textStatus+" and message: "+errorThrown);
            saveSuccessful = false;
        }
    });

    return saveSuccessful;
}

