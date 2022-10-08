var process = process || {env: {NODE_ENV: "development"}};
//these vars are initialized in the verzekeraar.gsp
var nederlandseVerzekering
var autocompleteSourceZorgverzekeraar

$(function () {
    nederlandseVerzekering =  $('#nederlandseVerzekering').val();
    autocompleteSourceZorgverzekeraar =  $('#autocompleteSourceZorgverzekeraar').val();
    initVerzekeraarPage();
});

function initVerzekeraarPage() {
    $("#verzekeraar").on("click", "a.remove", function (e) {
        e.preventDefault();
        $(this).parents(".autocomplete").find("input").val("");
        $("#zorgverzekeraar_ac").focus();
        $(this).parents(".selected_item").hide();
    });

    $('div[id="zoekVerzekeraar"]').hide();
    var verzekering = $("input[name = 'verzekeraarCommand.verzekering']:checked").val();
    if (verzekering === undefined || verzekering === null || verzekering === nederlandseVerzekering) {
        $('div[id="clientVerzekering_waarschuwing"]').hide();
        if (verzekering === nederlandseVerzekering) {
            $('div[id="zoekVerzekeraar"]').show();
        }
    }
    $("input[name='verzekeraarCommand.verzekering']").buttonset();
    setupOnClick();
    var zorgverzekeraar_ac = $('input#zorgverzekeraar_ac');
    if (zorgverzekeraar_ac.val() !== undefined) {
        setupAutocomplete();
    }
}

function setupOnClick() {
    $("input[name='verzekeraarCommand.verzekering']").on("click", function () {
        var $verzekering = $("span[id^='verzekering']");
        $verzekering.removeClass('errorBorder');
        errorBox($verzekering, false);
        if (this.value === nederlandseVerzekering) {
            $('div[id="zoekVerzekeraar"]').show()
        } else {
            $('div[id="zoekVerzekeraar"]').hide();
            //clear zorgVerzekeraar fields
            $("input[id='zorgverzekeraar_ac']").parents(".autocomplete").find("input").val("");
            $('#zoekVerzekeraar .selected_item').hide();
        }
    });
}

function setupAutocomplete() {
    $("input[id='zorgverzekeraar_ac']").autocomplete({
        source: autocompleteSourceZorgverzekeraar,
        minLength: 2,
        select: function (event, ui) {
            var $zorgverzekeraar = $("input[id='zorgverzekeraar_ac']");
            $zorgverzekeraar.removeClass('errorBorder');
            errorBox($zorgverzekeraar, false);
            $(this).val(ui.item.beperkteNaam);
            fillAutocompleteResultWithSelectedItem($(this), ui.item);
            $("#zoekVerzekeraar ul.error-messages-list .warning ").hide();
            return false;
        }
    }).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>").append("<a>" + item.beperkteNaam + "</a>").appendTo(ul);
    };
}







