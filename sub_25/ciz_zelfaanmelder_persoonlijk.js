var process = process || {env: {NODE_ENV: "development"}};
LEEFSITUATIE_HEEFT_EEN_ZELFSTANDIG_HUISHOUDEN_MET_UITSLUITEND_PARTNER = '3';
LEEFSITUATIE_HEEFT_EEN_HUISHOUDEN_MET_PARTNER_EN_THUISWONENDE_KINDEREN = '4';
BURGERLIJK_STAAT_GEHUWD = '2';
BURGERLIJK_STAAT_GEREGISTREERD_PARTNER = '5';

$(function () {
    initBSN();
    initVoorletters();
    initGeboortedatum();
    initTelefoonnummer();
});

function initBSN() {
    $("#bsn").focusout(function (e) {
        e.cancelBubble = true;
        var bsn = $(this).val();
        if (bsn.length > 0) {
            $(this).val($.stringPadLeft(bsn, 9));
        }
    });
}

function initVoorletters() {
    $("[name*='voorletters']").change(function(){
        var thisValue=$(this).val();
        thisValue = thisValue.replace(/[^A-Za-z]/g, "");
        thisValue = thisValue.toUpperCase();
        $(this).val(thisValue);
    });
}

function initGeboortedatum() {
    $( "span[data-nameoffields='persoonlijkCommand.geboortedatum']").change(function(){
        var birthDate = makeDate($("select[name='persoonlijkCommand.geboortedatum_day']"),
            $("select[name='persoonlijkCommand.geboortedatum_month']"),
            $("select[name='persoonlijkCommand.geboortedatum_year']"));
        // and add 18 years to it

        if(birthDate !== undefined && birthDate.toString() !== "Invalid Date"){
            errorBox($(this), false);
            var toDay = new Date();
            var minus120Years = new Date().setFullYear(toDay.getFullYear() - 120);

            if((birthDate > toDay || birthDate < minus120Years)){
                showErrorMessage($("select[name^='persoonlijkCommand.geboortedatum']"));
            }else{
                hideErrorMessage($("select[name^='persoonlijkCommand.geboortedatum']"));
            }

            var eighteenthBirthday = new Date(birthDate.getTime());
            eighteenthBirthday.setFullYear(eighteenthBirthday.getFullYear() + 18);
            if (toDay < eighteenthBirthday){
                $("#roepnaam").prop("disabled", false);
                $("#roepnaamDiv").show();
              } else {
                $("#roepnaam").prop("disabled", true);
                $("#roepnaamDiv").hide();
            }
        }
    }).change();
}

function initTelefoonnummer() {
    $("#telefoonnummer").bind("keyup focusout change", function (){
        var telefoonnummer = $(this).val();
        if(telefoonnummer !== undefined && telefoonnummer.length > 0) {
            $("#isTelefoonnummerGeheim").prop("disabled", false);
        }else {
            $("#isTelefoonnummerGeheim").prop("checked", false);
            $("#isTelefoonnummerGeheim").prop("disabled", true);
        }
    });
}

function togglePartner(){
    var burgerlijkeStaatCode = $("#burgerlijkeStaatCode :selected").val();
    var leefsituatieCode = $("#leefsituatieCode :selected").val();
    if (burgerlijkeStaatCode === BURGERLIJK_STAAT_GEHUWD
        || burgerlijkeStaatCode === BURGERLIJK_STAAT_GEREGISTREERD_PARTNER
        || leefsituatieCode === LEEFSITUATIE_HEEFT_EEN_ZELFSTANDIG_HUISHOUDEN_MET_UITSLUITEND_PARTNER
        || leefsituatieCode === LEEFSITUATIE_HEEFT_EEN_HUISHOUDEN_MET_PARTNER_EN_THUISWONENDE_KINDEREN) {
        enableDisableRelatie(true, 'heeftPartner', '01');
    } else {
        enableDisableRelatie(false, 'heeftPartner', '01');
    }
}

function enableDisableRelatie(enable, relatieType, relatieDetailsDiv) {
    if (enable) {
        $(":radio[id='"+relatieType+"'][value='true']").prop({checked: true});
        $(":radio[id='"+relatieType+"'][value='false']").prop({checked: false, disabled: true});
        //since the change of data is triggered through jquery we need below lines to tell angular about the same
        //going forward we can implement angular way of handling data change events using $watch/$digest/$apply
        $(":radio[id='"+relatieType+"'][value='true']").click();
        $(":radio[id='"+relatieType+"'][value='false']").click();
        store.state.showAndDisable('true', relatieDetailsDiv);
    } else {
        $(":radio[id='"+relatieType+"']:checked").click();
        $(":radio[id='"+relatieType+"'][value='true']").prop({disabled: false});
        $(":radio[id='"+relatieType+"'][value='false']").prop({disabled: false});
    }
}

function toggleContactPersoon(){
    var value = $("input:radio[name='persoonlijkCommand.isInStaatTotTelefonischeCommunicatie']:checked").val();
    var telefoonnummer = $("#telefoonnummer").val();
    if (value !== undefined) {
        var enableRelatie = (value === 'false' || telefoonnummer === '' );
        enableDisableRelatie(enableRelatie, 'heeft1eContactpersoon', '03');
    }
}
