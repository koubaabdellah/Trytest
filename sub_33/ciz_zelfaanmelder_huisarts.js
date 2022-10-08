var process = process || {env: {NODE_ENV: "development"}};
//this var is initialized in the gsp
var autocompleteSource = '';

$(function () {
    autocompleteSource =  $('#autocompleteSource').val();
    initHuisartsPage();
    handleUIBehaviour();
});

function initHuisartsPage() {
    $("#huisarts").on("click", "a.remove", function (e) {
        e.preventDefault();
        $(this).parents(".autocomplete").find("input").val("");
        $(this).parents(".autocomplete").find("input").focus();
        $(this).parents(".selected_item").hide();
        $('input#huisartsid').val('').change();
    });
    var huisarts_ac = $('input#huisarts_ac');
    if (huisarts_ac.val() !== undefined) {
        huisarts_ac.autocomplete({
            source: autocompleteSource,
            minLength: 2,
            select: function (event, ui) {
                $(this).val(ui.item.naam);
                $('input#huisartsid').val(ui.item.huisartsId).change();
                porteroAutocomplete.stopAsyncRendering();
                fillAutocompleteResultWithSelectedItem($(this), ui.item);
                return false;
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li class='ui-menu-item'>").append("<a>" + item.huisartsNaam + " (" + item.praktijkNaam + ", " + item.plaatsnaam + ", " + item.straat + ")" + "</a>").appendTo(ul);
        };
        huisarts_ac.data("ui-autocomplete")._renderMenu = porteroAutocomplete.asyncRenderMenu;
        huisarts_ac.on("autocompletesearch", porteroAutocomplete.stopAsyncRendering);
    }
}

function handleUIBehaviour() {
    var divHandmatigeHuisarts = $('div.handmatigeHuisarts');
    var huisarts_ac = $('input#huisarts_ac');
    var huisartsid = $('input#huisartsid');
    var checkboxHandmatigeHuisarts = $('input#huisartsCommand_handmatig');

    divHandmatigeHuisarts.hide();

    huisarts_ac.change(checkMutabilityOfCheckbox);
    huisartsid.change(checkMutabilityOfCheckbox);

    checkboxHandmatigeHuisarts.change(function () {
        if (checkboxHandmatigeHuisarts[0].checked) {
            divHandmatigeHuisarts.show();
            huisarts_ac.prop("readonly", true);
        } else {
            divHandmatigeHuisarts.hide();
            huisarts_ac.prop("readonly", false);
        }
    });

    function checkMutabilityOfCheckbox() {
        if (huisarts_ac.val().length > 0 || huisartsid.val().length > 0) {
            checkboxHandmatigeHuisarts.prop("disabled", true);
        } else {
            checkboxHandmatigeHuisarts.prop("disabled", false);
        }
    };
}

/* 'Undressed' copy from Portero...  */
var porteroAutocomplete = {
    /* Normally, the jQuery Autocomplete widget renders all received items, before the list is displayed on screen.
     * In case there are several thousands of items, this freezes the screen for several seconds and can even cause
     * the item list to not appearing at all (in IE it breaks downs). With asyncRenderMenu the itemlist is rendered
     * asynchronously, improving user experience and preventing the widget to break down. */
    asyncRenderMenu: function(ul, data) {
        var batchSize = 20;
        var autoc = this;   //refers to the autocomplete widget!

        function renderNextBatch(){
            $(ul).find('li.autocomplete-spinner').remove();
            var j = 0;
            while (j < batchSize && data.length > 0) {
                autoc._renderItemData(ul, data.shift());
                j++;
            }
            if (data.length > 0) {
                $(ul).append('<li class="ui-menu-item autocomplete-spinner"><a>Laden...</a></li>');
                porteroAutocomplete._asyncRenderingTimeoutId = setTimeout(renderNextBatch, 1);
            }
        }
        renderNextBatch();

    },
    _asyncRenderingTimeoutId: null,
    stopAsyncRendering: function() {
        if (porteroAutocomplete._asyncRenderingTimeoutId) {
            clearTimeout(porteroAutocomplete._asyncRenderingTimeoutId);
            porteroAutocomplete._asyncRenderingTimeoutId = null;
        }
    }
};



