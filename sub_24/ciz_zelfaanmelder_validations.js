var process = process || {env: {NODE_ENV: "development"}};
function validateControl(element) {
    var valid = true;
    var value = element.val();
    var isRequired = element.hasClass("required");
    var isConditionalRequired =  element.hasClass("conditionalRequired");

    if (value === "" && isRequired ) {
            valid = false;
    }

    if(value !== "" || isConditionalRequired) {
         var methodName = element.attr('data-validation');
          if (methodName) {
            valid = executeValidationMethod(methodName, value, element);
        }
    }

    if (valid) {
        hideErrorMessage(element);
    } else {
        showErrorMessage(element);
    }
    return valid;
}

function executeValidationMethod(methodName, value, element) {
    var fn = window[methodName];
    var valid = fn(value, element);
    return valid;
}

function validateTab(tab) {
    var dataValidationElements = $("[name='tab-"+ tab + "'] [data-validation]");
    var allValid = true;
    dataValidationElements.each(function() {
        var valid = validateControl($(this));
        if (!valid) {
            allValid = false;
        }
    });
    return allValid;
}

function showErrorMessage(control) {
    var $parentDiv = control.closest("div");
    control.addClass('errorBorder');
    $parentDiv.find("div.error-message").toggle(true);
}

function hideErrorMessage(control) {
    var $parentDiv = control.closest("div");
    control.removeClass('errorBorder');
    $parentDiv.find("div.error-message").toggle(false);
}

/*
    Dynamically called field validation methods
    ===========================================
    Method is executed when a html control has attribute 'data-validation' and
    the attribute value is the method to be called.

    e.g. <input data-validation='validateBsn' />
 */

function validateBsn(bsn, element) {
    var bsnValid = false;
    if (_validate_bsn_isNumberValid(bsn)) {
        var checksum = 0;
        for (var i = 0; i < 8; i++) {
            checksum += (parseInt(bsn[i]) * (9 - i));
        }
        checksum -= (parseInt(bsn[8]));
        bsnValid = (checksum % 11) === 0;
    }
    return bsnValid;
}

function _validate_bsn_isNumberValid(value) {
    var isCorrectDigits = /^[0-9]{8,9}$/.test(value);
    if (!isCorrectDigits) {
        return false;
    }
    var startsWithZeros = (value.substring(0,3) === "000");
    return !startsWithZeros;
}

function validateTelefoonnummer(value) {
    var valid = /^[0-9]+$/.test(value);
    if (valid) {
        var len = value.length;
        var prefix = value.substring(0,4);
        if (prefix === "0800" || prefix === "0900") {
            valid = (len === 8 || len === 11);
        } else {
            valid = (len === 10);
        }
    }
    return valid;
}

function validatePostAdresVan(value) {
    if ($("#wijktPostAdresAf:checked").val() === "true") {
        var $postAdresVan = $("#postAdresVan :selected");
        return jQuery.inArray($postAdresVan.val(), ["01", "02", "03", "04", "05"]) > -1
    } else {
        return true;
    }
}

function validateTelefoonnummerRelaities(value, element){
    var isValid = true;
    var elementId = element.attr('id');
    if(elementId === 'partner_telefoonnummer' && $("#heeftPartner:checked").val() === "true"){
        isValid =  validateTelefoonnummer(value);
    }else if(elementId === 'contactpersoon1_telefoonnummer' && $("#heeft1eContactpersoon:checked").val() === "true") {
        isValid = validateTelefoonnummer(value);
    }else if(elementId === 'contactpersoon2_telefoonnummer' && $("#heeft2eContactpersoon:checked").val() === "true") {
        isValid = validateTelefoonnummer(value);
    }else if(elementId === 'wettelijkeVertegenwoordiger_telefoonnummer' && $("#heeftWettelijkeVertegenwoordiger:checked").val() === "true") {
        isValid = validateTelefoonnummer(value);
    }
  return isValid;
}

function validateTelefoonnummerBehandelaar(value){
    var isValid = true;
    if ($("input[fieldName='behandelaarToestemmingsvraag']:checked").val() === "true") {
        isValid = validateTelefoonnummer(value);
    }
    return isValid;
}

function validateAge(value) {
    var now = new Date();
    var nowMinus120Years = new Date().setFullYear(now.getFullYear() - 120);
    return value < now && value > nowMinus120Years;
}

// *** CUSTOM VALIDATIONS; See methods above for new way of validating controls
function validatePersoonlijk() {
    var isValid = true;
    var birthDate = makeDate($("select[name='persoonlijkCommand.geboortedatum_day']"),
        $("select[name='persoonlijkCommand.geboortedatum_month']"),
        $("select[name='persoonlijkCommand.geboortedatum_year']"));

    var $geboorteDatum = $("select[id*='persoonlijkCommand.geboortedatum']");
    if (birthDate === undefined || birthDate.toString() === "Invalid Date") {
        $geboorteDatum.addClass('errorBorder');
        errorBox($geboorteDatum, true);
        isValid = false;
    } else {
        $geboorteDatum.removeClass('errorBorder');
        errorBox($geboorteDatum, false);
        $("select[id*='roepnaam']").removeClass('errorBorder');

        var today = new Date();
        var eighteenthBirthday = new Date(birthDate.getTime());
        eighteenthBirthday.setFullYear(eighteenthBirthday.getFullYear() + 18);
        if (today < eighteenthBirthday) {
            isValid = validTextfield("#roepnaam") && isValid;
            enableDisableRelatie(true, 'heeftWettelijkeVertegenwoordiger', '02');
            setWettelijkeVertegenwoordigerTrue();
        }else{
            $(":radio[id='heeftWettelijkeVertegenwoordiger']:checked").click();
            enableDisableRelatie(false, 'heeftWettelijkeVertegenwoordiger', '02');
        }
    }

    var otherFieldsValid = validPersoonlijkFields();
    togglePartner();
    toggleContactPersoon();
    return isValid && otherFieldsValid;
}

function validPersoonlijkFields() {
    var geboortenaamValid = validTextfield("#geboortenaam");
    var geslachtValid = validSelect("#geslachtCode");
    var burgelijkeStaatValid = validSelect("#burgerlijkeStaatCode");
    var leefsituatieValid = validSelect("#leefsituatieCode");
    var taalCodeValid = validSelect("#taalCode");
    return geboortenaamValid && geslachtValid && burgelijkeStaatValid && leefsituatieValid && taalCodeValid
}

function validateRelaties() {
    var isValid = true;

    if ($("#heeftPartner:checked").val() === "true") {
        isValid = validPartner();
    }

    if ($("input[name='relatiesCommand.heeft1eContactpersoon']:checked").val() === "true") {
        var validContactpersoon1 = validContactpersoon("contactpersoon1");
        isValid = isValid && validContactpersoon1;
    }

    if ($("input[name='relatiesCommand.heeft2eContactpersoon']:checked").val() === "true") {
        var validContactpersoon2 = validContactpersoon("contactpersoon2");
        isValid = isValid && validContactpersoon2;
    }

    if ($("input[name='relatiesCommand.heeftWettelijkeVertegenwoordiger']:checked").val() === "true") {
        var validVertegenwoordiger = validContactpersoon("wettelijkeVertegenwoordiger");
        var validWettelijkeRelatie = validSelect("select[id='wettelijkeVertegenwoordiger_wettelijkeRelatie']");
        isValid = isValid && validVertegenwoordiger && validWettelijkeRelatie;
    }

    return isValid;
}

function validPartner() {
    var validAdres = true;
    
    if ($("#woontPartnerOpZelfdeAdres:checked").val() === "false") {
        validAdres = validAdresComponent("#partner");
    }

    var validNaam = validTextfield("input[name='relatiesCommand.partner_geboortenaam']");
    var $telefoonnummerField = $("input[id='partner_telefoonnummer']");
    var validTelefoon = true;

    if ($telefoonnummerField.val() !== "") {
        if (validateTelefoonnummer($telefoonnummerField.val())) {
            hideErrorMessage($telefoonnummerField);
        } else {
            validTelefoon = false;
            showErrorMessage($telefoonnummerField);
        }
    }
    return validAdres && validNaam && validTelefoon;
}

function validContactpersoon(prefix) {
    var validGeboortenaam = validTextfield("input[name='relatiesCommand." + prefix + "_geboortenaam']");
    var telefoonnummerField = "input[name='relatiesCommand." + prefix + "_telefoonnummer']";
    var validTelefoon = validTextfield(telefoonnummerField);

    if ($(telefoonnummerField).val() !== "") {
        if (validateTelefoonnummer($(telefoonnummerField).val())) {
            validTelefoon = true;
             hideErrorMessage($(telefoonnummerField));
        } else {
            validTelefoon = false;
            showErrorMessage($(telefoonnummerField));
        }
    }
    return validGeboortenaam && validTelefoon;
}

function validateAdres() {
    var isValid = true;

    isValid = isValid && validateWijktPostAdres();

    if ($("#verblijftTijdelijkErgensAnders:checked").val() === "true") {
        var validVerblijfadres = validAdresComponent("#tijdelijkVerblijfAdres");
        isValid = isValid && validVerblijfadres && validateVerblijfEinddatum();
    }

    isValid = isValid && validateHuisLetter("#postAdres") && validateHuisLetter("#tijdelijkVerblijfAdres");

    var validWoonadres = validAdresComponent("#woonAdres");
    return isValid && validWoonadres;
}

function validateWijktPostAdres() {
    var isValid = true;
    if ($("#wijktPostAdresAf:checked").val() === "true") {
        var $postAdresVan = $("#postAdresVan :selected");

        if ($postAdresVan.val() === "05") {
            var validToelichting = validTextfield("textarea[id='adresCommand.postAdres_toelichting']");
            isValid = isValid && validToelichting;
        } else {
            $("textarea[id='adresCommand.postAdres_toelichting']").removeClass('errorBorder');
        }

        var validPostadres = validAdresComponent("#postAdres");
        isValid = isValid && validPostadres;
    }
    return isValid;
}

function validateHuisLetter(prefix) {
    var isValid = true;
    if($(prefix+"_huisletter").val() && !$(prefix+"_huisletter").val().match(/[a-z]/i)) {
        $(prefix+"_huisletter").addClass('errorBorder');
        errorBox($(prefix+"_huisletter"), true);
        isValid = false;
    }
    return isValid;
}

function validAdresComponent(prefix) {
    var validPostcode = validTextfield(prefix + "_postcode");
    var validHuisnummer = validTextfield(prefix + "_huisnummer");
    var validHuisletter = validateHuisLetter(prefix);
    var validStraatnaam = validTextfield(prefix + "_straatnaam");
    var validWoonplaatsnaam = validTextfield(prefix + "_woonplaatsnaam");
    return validPostcode && validHuisnummer && validStraatnaam && validWoonplaatsnaam && validHuisletter;
}

function validateHuisarts() {
    var validTelefoon = true;

    if($('#huisartsCommand_handmatig')[0].checked) {
        var $telefoonnummerField = $("input[id='huisartsCommand.handmatigeHuisarts.telefoonnummer']");
        
        if ($telefoonnummerField.val() !== "") {
            if (validateTelefoonnummer($telefoonnummerField.val())) {
                hideErrorMessage($telefoonnummerField);
            } else {
                validTelefoon = false;
                showErrorMessage($telefoonnummerField);
            }
        }
    }

    return validTelefoon;
}

function validateVerzekeraar() {
    var isValidated = true;
    var verzekering = $("input[name*='verzekeraarCommand.verzekering']:checked").val();
    var $zorgverzekeraar = $("input[id='zorgverzekeraar_ac']");

    var $verz = $("input[id='verzekeraarCommand.verzekering']");
    if ($("input[id='verzekeraarCommand.verzekering']:checked").val() === undefined || verzekering === null) {
        $verz.closest("div").addClass('errorBorder');
        errorBox($verz.closest("div").parent(), true);
        isValidated = false;
    } else {
        $verz.closest("div").removeClass('errorBorder');
        errorBox($verz.closest("div").parent(), false);
    }

    if ((verzekering === nederlandseVerzekering) && $zorgverzekeraar.val() === "") {
        $zorgverzekeraar.addClass('errorBorder');
        errorBox($zorgverzekeraar, true);
        isValidated = false;
    } else {
        $zorgverzekeraar.removeClass('errorBorder');
        errorBox($zorgverzekeraar, false);
    }

    var $polisnummer = $("#polisnummer");
    if (verzekering === nederlandseVerzekering && $zorgverzekeraar.val() !== "" &&
        ($polisnummer.val() === undefined || $polisnummer.val() === "")) {
        $polisnummer.addClass('errorBorder');
        errorBox($polisnummer, true);
        isValidated = false;
    } else {
        $polisnummer.removeClass('errorBorder');
        errorBox($polisnummer, false);
    }
    return isValidated;
}

function validateZorgvraag() {
    var isValidated = true;
    var zorgvraagCheckboxGroup = $("#zorgvraag\\.checkboxGroup");
    var $verblijfInInstelling = $("#zorgvraagCommand\\.verblijfInInstelling");
    var $zorgbehoefteIsVerminderd = $("#zorgvraagCommand\\.zorgbehoefteIsVerminderd");
    if ($verblijfInInstelling.prop('checked') === false && $zorgbehoefteIsVerminderd.prop('checked') === false) {
        zorgvraagCheckboxGroup.addClass('errorBorder');
        errorBox($verblijfInInstelling, true);
        isValidated = false;
    } else {
        zorgvraagCheckboxGroup.removeClass('errorBorder');
        errorBox($verblijfInInstelling, false);
    }
    return isValidated;
}

function validateToestemming() {
    var validZelfVraag = validRadiobuttons("input[id*=zelfVraag]");
    var validGegevensCorrectVraag = validRadiobuttons("input[id*=gegevensCorrectVraag]");
    var validHuisartsToestemmingsvraag = validRadiobuttons("input[id*=huisartsToestemmingsvraag]");
    var validBehandelaarToestemmingsvraag = validRadiobuttons("input[id*=behandelaarToestemmingsvraag]");
    var validOrganisatiePersoonToestemmingsvraag = validRadiobuttons("input[id*=organisatiePersoonToestemmingsvraag]");
    var validInformeerHuisartsToestemmingsvraag = validRadiobuttons("input[id*=informeerHuisartsToestemmingsvraag]");
    var validBehandelaarAdresComponent = true;
    if($("input[id*=behandelaarToestemmingsvraag]:checked").val() === "true"){
        validBehandelaarAdresComponent = validateHuisLetter("#behandelaarAdres");
    }
    return validZelfVraag && validGegevensCorrectVraag && validHuisartsToestemmingsvraag &&
        validBehandelaarToestemmingsvraag && validOrganisatiePersoonToestemmingsvraag && 
        validBehandelaarAdresComponent && validInformeerHuisartsToestemmingsvraag;
}

function validTextfield(divName) {
    var $div = $(divName);
    return validField($div, $div);
}

function validSelect(divName) {
    var $divSelected = $(divName + ' :selected');
    var $div = $(divName);
    return validField($divSelected, $div);
}

function validRadiobuttons(divName) {
    var $div = $(divName);
    var $divChecked = $(divName + ':checked');
    if (($divChecked.val() === undefined) || (divName === "input[id*=gegevensCorrectVraag]" && $divChecked.val() === "false")) {
        $div.closest("div").addClass('errorBorder');
        errorBox($div, true);
        return false;
    } else {
        $div.closest("div").removeClass('errorBorder');
        errorBox($div, false);
        return true;
    }
}

function validField(div1, div2) {
    if (div1.val() === "") {
        div2.addClass('errorBorder');
        errorBox(div2, true);
        return false;
    } else {
        div2.removeClass('errorBorder');
        errorBox(div2, false);
        return true;
    }
}

function validateEmail(element) {
    var regEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var isValid = regEx.test(element.val());
    if (isValid) {
        $(element).removeClass('errorBorder');
        errorBox($(element), false);
    } else {
        $(element).addClass('errorBorder');
        errorBox($(element), true);
    }
    $("div[id='" + $(element).attr('id') + "_functionele_melding.001009']").toggle(!isValid);
    return isValid
}

function errorBox(div, visible) {
    div.closest('div.fieldcontain').find('div.error-message').toggle(visible);
}

function validateEmailFields(emailAdresElement, controleEmailAdresElement) {
    var email1 = $(emailAdresElement).val();
    var email2 = $(controleEmailAdresElement).val();
    var validateEmail1 = validateEmail($(emailAdresElement));
    var validateEmail2 = validateEmail($(controleEmailAdresElement));

    var isEmailEqual = email1 === email2;
    if (validateEmail1 && validateEmail2) {
        toggleEmailError(isEmailEqual, '017024', emailAdresElement, controleEmailAdresElement);
    }
    return isEmailEqual && validateEmail1 && validateEmail2;
}

function toggleEmailError(flag, errorcode, emailAdresElement, controleEmailAdresElement){
    $("div[id='" + $(controleEmailAdresElement).attr('id') + "_functionele_melding."+ errorcode+"']").toggle(!flag);
    toggleEmailErrorBorder(flag, emailAdresElement, controleEmailAdresElement);
}

function toggleEmailErrorBorder(flag, emailAdresElement, controleEmailAdresElement){
    if(flag){
        $(emailAdresElement).removeClass('errorBorder');
        $(controleEmailAdresElement).removeClass('errorBorder');
    }else{
        $(emailAdresElement).addClass('errorBorder');
        $(controleEmailAdresElement).addClass('errorBorder');
    }
}
