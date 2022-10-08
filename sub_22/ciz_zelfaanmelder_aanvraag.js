var process = process || {env: {NODE_ENV: "development"}};
//DEBUG=true
var inDialog=true;
var conceptDocs=false;
var afmeldenClicked=false;
var aanvraagNogNietBevestigdMessage;
var activeTab;

const store = new Vuex.Store({
    state: {
        tabClasses: ["","","","","","","","","",""],
        previousTab: undefined,
        showAndDisable: function (value, element, valueToShow) {
            var divFields = $("#" + element + "").find('select, input, textarea');
            var div = $("#" + element + "");
            if (typeof valueToShow === 'undefined') {
                valueToShow = 'true';
            }
            var $elem;
            if (value.toString() === valueToShow) {
                showAndEnableElement(div);
                divFields.prop('disabled', false);
                $elem =  $('#postAdresVan').find('option[value="' + div.attr("id") + '"]');
                unwrapAndShowSelectOption($elem);
            } else {
                hideAndDisableElement(div);
                divFields.prop('disabled', true);
                $elem = $('#postAdresVan').find('option[value="' + div.attr("id") + '"]');
                wrapAndHideOpotion($elem);
            }
        },
        setActiveTab: function (tabNum) {
            this.tabClasses = ["","","","","","","","","",""];
            Vue.set(this.tabClasses, tabNum, "active")
            validatePreviousTab(this.previousTab);
            this.previousTab = tabNum;
            logPiwikAnalyticsData(tabNum);
            if(tabNum === 8){
                validateAllTabs();
                validateForIndienenPage();
                setFocusField()
            }
            activeTab = tabNum;
        },
        getTabPaneClass: function (tabNum) {
            return this.tabClasses[tabNum];
        }
    },
    mutations: {
        showAndDisable: (state, payload) => state.showAndDisable(payload.value, payload.element, payload.valueToShow)
    }
});

$(function () {
    document.createElement("footer");
    document.createElement("header")
    document.createElement("nav");
    aanvraagNogNietBevestigdMessage = $('#aanvraagNogNietBevestigdMessage1').val() + $('#aanvraagNogNietBevestigdMessage2').val() + "\n\n" + $('#aanvraagNogNietBevestigdMessage3').val() + "\n\n" + $('#aanvraagNogNietBevestigdMessage4').val()
    setEventForPiwikOptInOut();
    initializeValidation();
    initializeHelpTexts();
    showValidZorgvraag();
    addLeavePageHandler(false);
    initializeClickEvents();
});

function setEventForPiwikOptInOut() {
    if ($("#piwikTrackingEnabled").val() === '' || $("#piwikTrackingEnabled").val() === undefined ) {
        $('#overlay').fadeIn(800);
        if(showCookieMelding === 'true'){
            $('html').css('margin-top','85px');
        }
        sendOptInorOptOut('doTrack');
        delete_cookie('piwik_ignore');
    }

    $('#piwikOptClose').click(function () {
        PiwikOptInAction();
    });
    $('#piwikOptIn').click(function () {
        PiwikOptInAction();
    });
    $('#piwikoptout').click(function (e) {
        e.preventDefault();
        sendOptInorOptOut('doIgnore');
        logPiwikAnalyticsData('#optout');
        $("#piwikTrackingEnabled").val(false);
        return false;
    });
}

function sendOptInorOptOut(opt) {
    $.ajax({
        url: $('#piwikURL').val() + 'index.php?module=API&method=AjaxOptOut.'+opt,
        dataType: 'jsonp',
        data: {format: 'json'},
        success: function (data) {
            if(opt !== 'doTrack') {
                $('#overlay').fadeOut(300);
                $('html').css('margin-top','0px');
            }
        },
        error: function (jqXHR, text, errorThrown) {
            console.log(jqXHR + " " + text + " " + errorThrown);
        }
    });
}
var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function hideAndDisableElement(element) {
    element.hide();
    element.prop('disabled', true);
}

function showAndEnableElement(element) {
    element.show();
    element.prop('disabled', false);
}

function PiwikOptInAction() {
    $('#overlay').fadeOut(300);
    $('html').css('margin-top','0px');
    $("#piwikTrackingEnabled").val(true);
}


function addLeavePageHandler(setInFormOrLink){
    //when user clicks away from the page then show a message to user
    //that the Aanvraag is still not 'Bevestigd'
    //don't do this when user is inDialog because that triggers also a page reload
    inDialog = true;
    if ((window.location.href.indexOf("bevestigen") !== -1)) {
        leavePageHandlerBevestigenWindow(setInFormOrLink);
    }
    if ((window.location.href.indexOf("uploadPorteroDocumenten") !== -1) && conceptDocs === true) {
        leavePageHandlerUploadPorteroDocumentWindow(setInFormOrLink);
    }
}

function leavePageHandlerBevestigenWindow(setInFormOrLink){
    var inFormOrLink = false;
    $('a[href]:not([target]), a[href][target=_self]').on('click', function () {
        inFormOrLink = setInFormOrLink;
    });
    $('form').bind('submit', function () {
        inFormOrLink = true;
    });
    $(window).bind('beforeunload', function (eventObject) {
        if (inDialog && !inFormOrLink) {
            eventObject.preventDefault();
            var returnValue = messageCloseWindow + '\n\n' + secondmessage + '\n';
            eventObject.returnValue = returnValue;
            return returnValue;
        }
    });
}
function leavePageHandlerUploadPorteroDocumentWindow(setInFormOrLink){
    var inFormOrLink = false;
    $('a[href]:not([target]), a[href][target=_self]').on('click', function () {
        inFormOrLink = setInFormOrLink;
    });
    $('form').bind('submit', function () {
        inFormOrLink = true;
    });
    $(window).bind('beforeunload', function (eventObject) {
        if (!afmeldenClicked && !inFormOrLink) {
            return '' + aanvraagNogNietBevestigdMessage;
        }
    });
}

function showValidZorgvraag(){
    $("#zorgvraagCommand\\.zorgbehoefteIsVerminderd").change(function() {
        var divVerblijfInInstelling;
        if (this.checked) {
            divVerblijfInInstelling = $("#showVerblijfInInstelling").find('select, input, textarea');
            divVerblijfInInstelling.prop('disabled', true);
            divVerblijfInInstelling.prop('checked', false);
            $("#showVerblijfInInstelling").hide();
        }
        else {
            divVerblijfInInstelling = $("#showVerblijfInInstelling").find('select, input, textarea');
            divVerblijfInInstelling.prop('disabled', false);
            divVerblijfInInstelling.prop('checked', false);
            $("#showVerblijfInInstelling").show();
        }
    });
}

function initializeValidation() {
    console.log("initializeValidation");
    $(":input").on("change",function(event) {
        validateControl($(this));
    });
}

function initializeHelpTexts() {
    $(".helpIcon").on("click",function(e) {
        e.preventDefault();
        var $currentHelpText = $(this).parent().find('div.helpText');
        $(".helpText:visible").not($currentHelpText).toggle();
        $currentHelpText.toggle();
    });
}

function initializeClickEvents() {
    $('#hoogcontrast').click(function(e) {
        e.preventDefault();
        swapStyleSheet(true,styleSheetHoogContrast);
    });

    $('#laagcontrast').click(function(e) {
        e.preventDefault();
        swapStyleSheet(false,styleSheetHoogContrast);
    });

    $('#bigText').click(function(e) {
        e.preventDefault();
        swapStyleSheet(true,styleSheetBigText);
    });

    $('#mediumText').click(function(e) {
        e.preventDefault();
        swapStyleSheet(true,styleSheetMediumText);
    });

    $('#smallText').click(function(e) {
        e.preventDefault();
        swapStyleSheet(false,styleSheetBigText);
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    store.state.setActiveTab(0);
});

function setFocusField() {
    if($('#emailAdres').length === 1) {
        $('#emailAdres').focus();
    } else {
        $('#scrollable-content').focus();
    }
}

function getActivePage(){
    return parseInt($(".active").find('a').attr('id'));
}

function validatePreviousTab(tab){
    var isValidated = true;

    // all (or most) validation must be added in ciz_zelfaanmelder_validation
    // switch below will be removed in future.
    // if tab number is not present as case no validation needed
    switch(tab){
        case 1:
            isValidated = validatePersoonlijk();
            break;
        case 2:
            isValidated = validateRelaties();
            break;
        case 3:
            isValidated = validateAdres();
            break;
        case 4:
            isValidated = validateHuisarts();
            break;
        case 5:
            isValidated = validateVerzekeraar();
            break;
        case 6:
            isValidated = validateZorgvraag();
            break;
        case 7:
            isValidated = validateToestemming();
            break;
        default:
            break;
    }

    var isValidatedNew = validateTab(tab);
    checkValidation(isValidated,isValidatedNew,tab);
    return (isValidated && isValidatedNew)
}

function checkValidation(isValidated,isValidatedNew,previousTab){
    var validationCheck = isValidated && isValidatedNew;
    if(validationCheck) {
        unflagSection(previousTab);
    } else {
        flagSection(previousTab);
    }
}

function unflagSection(tabNum){
    $("#icon"+tabNum).removeClass("incomplete ion-close-circled").removeClass("needs_attention ion-android-alert").addClass("valid ion-checkmark");
}

function flagSection(tabNum){
    $("#icon"+tabNum).removeClass("needs_attention ion-android-alert").addClass("incomplete ion-close-circled").removeClass("valid ion-checkmark");
}

function validateAllTabs() {
    var isValid ;
    for (var i = 1; i < 8; i++) {
        isValid =  validatePreviousTab(i);
        if(isValid){
            unflagSection(i);
        } else{
            flagSection(i);
        }
    }
}

function validateForIndienenPage(){
    $.ajax({
        type: 'POST',
        url: validateAanvraagURL,
        data: $("form#aanvraagForm").serialize(),
        async: false
    }).done(function (data) {
        $("#indienen").html(data);
    });
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function swapStyleSheet(changeStylesheet,stylesheet) {
    //changeStylesheet will be true if pressed on Hoog Contrast, medium text or big text
    if (changeStylesheet) {
        if(stylesheet === styleSheetHoogContrast) {
            addExtraOptionsDrempelvrijCss(true);
        } else {
            $('#bigtext').remove();
            $('#mediumtext').remove();
            $('div.ui-datepicker').css('font-size','0.9em');
        }
        $('head').append(stylesheet);
    } else {
        if(stylesheet === styleSheetHoogContrast) {
            $('#drempelvrij').remove();
            addExtraOptionsDrempelvrijCss(false);
        } else if(stylesheet === styleSheetBigText) {
            $('#bigtext').remove();
            $('#mediumtext').remove();
        }
    }
}

function addExtraOptionsDrempelvrijCss(changeStylesheet) {
    if(changeStylesheet) {
        $('.helpIcon').children('img').attr('src', '/isa-zelfaanmelder-web/assets/help-icon-highcontrast.png');
        $('#hoogcontrast').css("display", "none");
        $('#laagcontrast').css("display", "block");
    } else {
        $('.helpIcon').children('img').attr('src','/isa-zelfaanmelder-web/assets/help-icon.png');
        $('#hoogcontrast').css("display", "block");
        $('#laagcontrast').css("display", "none");
    }
}

function getActivePageInfo(tabNum) {
    var activePage;
    if (isNaN(tabNum) && tabNum.indexOf("_content") !== -1) {
        activePage = tabNum.substring(0, tabNum.indexOf("_content"))
    }
    else {
        activePage = $('li').find('a#' + tabNum).attr("href");
    }

    if(activePage === undefined){
        activePage = location.href.indexOf('bevestigen') ? 'index#ondertekening': 'index#uploadPorteroDocumenten'
    }
    return activePage;
}

function logPiwikAnalyticsData(tabNum) {
    if (siteId !== undefined && siteId !== "" && $("#piwikTrackingEnabled").val() !== 'false' ) {
        var activePage = tabNum;
        if(tabNum !== '#optout' && tabNum !== '#toegangscodeActiveren') {
            activePage = getActivePageInfo(tabNum);
        }
        var customURL = '/' + activePage;
        _paq.push(['setCustomUrl', customURL]);
        _paq.push(['setDocumentTitle', activePage]);
        _paq.push(['trackPageView']);
        _paq.push(['trackEvent', 'Menu', activePage]);
        _paq.push(['enableHeartBeatTimer']);
        _paq.push(['enableLinkTracking']);
    }
}


