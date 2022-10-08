var process = process || {env: {NODE_ENV: "development"}};
$(function () {
    var  postAdresVanElm =  $('#postAdresVan')
    postAdresVanElm.find('option').each(function(){
        wrapAndHideOpotion($(this));
    });

    var $elem =  postAdresVanElm.find('option[value="05"]');
    unwrapAndShowSelectOption($elem);

    var $elem1 =  postAdresVanElm.find('option[value=""]');
    unwrapAndShowSelectOption($elem1);

    $("[id$='huisnummer']").focusout(function(){
        var huisnummerFilled = $(this).val().length > 0;
        var prefix = this.getAttribute('prefix');
        var huisnummertoevoeging = $("[id$='" + prefix + "_huisnummertoevoeging']");
        huisnummertoevoeging.prop("readonly", huisnummerFilled?"":"readonly").val(huisnummerFilled?huisnummertoevoeging.val():"");

        var huisletter = $("[id$='" + prefix + "_huisletter']");
        huisletter.prop("readonly", huisnummerFilled?"":"readonly").val(huisnummerFilled?huisletter.val():"");
    });
    $("[id$='_postcode']").focusout(function() {
        $(this).val($(this).val().toUpperCase());
    });

    $("input[id$='_postcode'],input[id$='_huisnummer']").change(function(){
        var prefix = this.getAttribute('prefix');
        $("#" + prefix + "_norecordsfound").hide();
        $("#" + prefix + "_straatnaam").val('');
        $("#" + prefix + "_woonplaatsnaam").val('');
    });

    initializeSearchAddress();
    initPeriodeVerblijf();
    setWijktPostAdresAf();
});

function initializeSearchAddress() {
    $(".searchAddress").on("click",function(event){
        var $parentDiv = $(this).closest('.adres_zoek_component');
        var prefix = this.value;
        var postcode = $("#"+prefix+"_postcode").val();
        var huisnummer = $("#"+prefix+"_huisnummer").val();
        if (postcode.length > 0 && huisnummer.length > 0) {
            var $loadingIcon = $parentDiv.find("#loading_pagepart");
            $loadingIcon.show();
            $.get(
                $(".searchAddress").attr("data-url"),
                {
                    postcode: postcode,
                    huisnummer: huisnummer
                }
            )
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $loadingIcon.hide();
                })
                .done(function (data, textStatus, jqXHR) {
                    var foundAddress = !(data.straat == null || data.plaats == null);
                    if (foundAddress) {
                        var $straatnaam = $("#" + prefix + "_straatnaam");
                        var $woonplaats = $("#" + prefix + "_woonplaatsnaam");
                        $straatnaam.val(data.straat).removeClass("errorBorder");
                        $woonplaats.val(data.plaats).removeClass("errorBorder");
                        errorBox($straatnaam, false);
                        errorBox($woonplaats, false);
                        $("#" + prefix + "_norecordsfound").hide();
                    } else {
                        showAdresErrorMessage(prefix)
                    }
                    $loadingIcon.hide();
                });
        } else {
            showAdresErrorMessage(prefix)
        }
        return false;
    });
}

function initPeriodeVerblijf() {
    if($('#verblijftTijdelijkErgensAnders').length) {
        store.state.showAndDisable('false', 'tijdelijkVerblijfAdres');
    }

    $( "span[data-nameoffields^='adresCommand.tijdelijkVerblijfAdres_']").change(function() {
        var valid = validateVerblijfEinddatum();
        if (valid) {
            hideErrorMessage( $("select[name^='adresCommand.tijdelijkVerblijfAdres_einddatum']"));
        } else {
            showErrorMessage( $("select[name^='adresCommand.tijdelijkVerblijfAdres_einddatum']"));
        }
    });
}

function validateVerblijfEinddatum() {
    var begindatum = makeDate($("select[name='adresCommand.tijdelijkVerblijfAdres_begindatum_day']"),
        $("select[name='adresCommand.tijdelijkVerblijfAdres_begindatum_month']"),
        $("select[name='adresCommand.tijdelijkVerblijfAdres_begindatum_year']"));
    var einddatum = makeDate($("select[name='adresCommand.tijdelijkVerblijfAdres_einddatum_day']"),
        $("select[name='adresCommand.tijdelijkVerblijfAdres_einddatum_month']"),
        $("select[name='adresCommand.tijdelijkVerblijfAdres_einddatum_year']"));
    if (begindatum === undefined && einddatum !== undefined) {
        return false;
    }
    var now = new Date();
    var isValid = true;
    if(einddatum !== undefined){
        isValid = (einddatum >= begindatum && einddatum >= now)
    }
    return isValid
}

function showAdresErrorMessage(prefix){
    $("#" + prefix + "_straatnaam").val(null);
    $("#" + prefix + "_woonplaatsnaam").val(null);
    $("#" + prefix + "_norecordsfound").show();
}

function setWijktPostAdresAf() {
    var wijktPostAdresAf = $("input[fieldName='wijktPostAdresAf']")

    wijktPostAdresAf.change(function(){
        var radioValue = $("input[fieldName='wijktPostAdresAf']:checked").val();
        if(radioValue === "true"){
            store.state.showAndDisable('true', 'postAdres');
        } else {
            store.state.showAndDisable('false', 'postAdres');
        }
    });
}
