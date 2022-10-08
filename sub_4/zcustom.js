$(document).ready(function () {
     // Always show menu text
    $('.menu-top-container .content-list-item').show();

    // Help buttons
    $('.helpTekstLang').parent().parent().addClass("hiddenHelp");
    $('.helpTekstKort').parent().parent().addClass("hiddenHelp");

    $("input.help").off("click").click(function (e) {
        e.preventDefault();
        DisplayHelp(this);
    });

    if ($('.hasshook').length) {
        $('.hasshook').each(function (index) {
            var hasshooktarget = $(this).data("get");
            var hasshookiteration = $(this).data("iteration");
            if ($('.' + hasshooktarget).length) {
                $(this).parent().parent().parent().addClass('start' + hasshooktarget);
                $('.' + hasshooktarget).parent().parent().parent().addClass('stop' + hasshooktarget);
                $('.start' + hasshooktarget).nextUntil('.stop' + hasshooktarget, 'div').addBack().wrapAll('<section class="a' + hasshooktarget + ' hassbronaccordion"></section>');
            }
            else {
                $('.hs' + hasshookiteration).hide();
                $('.hbt' + hasshookiteration).hide();
            }
        });
        $('.hassSummary').each(function (index) {
            if ($(this).is(":hidden") || $(this).css('display') == 'none') {
                $(this).parent().parent().parent().next().find('.hassbrontools').hide();
            }
        });
        $('.hassbronaccordion').hide();
        $('.hassSummary').parent().addClass('hassSummaryCorrection');
        $('body').on('click', '.hassbrontools', function (e) {
            e.preventDefault();
            if ($(this).find('.hassbrontool').data("open") == "0") {
                $('.' + $(this).find('.hassbrontool').data("select")).slideDown();
                $(this).find('.hassbrontool').data("open", "1");
                $(this).find(".hbtt").html("Bron inklappen");
                $(this).addClass('hassbrontoolopen');
            }
            else {
                $('.' + $(this).find('.hassbrontool').data("select")).hide();
                $(this).find('.hassbrontool').data("open", "0");
                $(this).find(".hbtt").html("Bron uitklappen");
                $(this).removeClass('hassbrontoolopen');
            }
            $.get('keepalive.aspx');
        });
    }

    //Dit haalt de doelgroepscheiding link weg van de ingelogde knop
    $('.account-button-container a').replaceWith(function () {
        return '<span>' + $(this).html() + '</span>'
    });
});

/*Help buttons */
function DisplayHelp(item) {
    var _this = $(item).attr('id');

    var _thisRow = $('[id="' + _this + '"]').parent().parent();
    var _nextRow = _thisRow.next();

    if (_nextRow.find('.helpTekstKort').length == 1) {
        _nextRow.removeClass("hiddenHelp");
        _nextRow.find('.helpTekstKort').slideToggle();

        AddRemoveHelpButton(_nextRow, '.helpTekstKort');
        $(item).slideToggle();
    }
    else if (_nextRow.find('.helpTekstLang').length == 1) {
        _nextRow.removeClass("hiddenHelp");
        _nextRow.find('.helpTekstLang').slideToggle();
        AddRemoveHelpButton(_nextRow, '.helpTekstLang');

        $(item).slideToggle();
    }
}

function HideHelp(item) {
    var _this = $(item);

    var _thisRow = _this.parent().parent();

    if (_thisRow.find('.helpTekstKort').length == 1) {
        _thisRow.find('.helpTekstKort').hide();
    }
    else if (_thisRow.find('.helpTekstLang').length == 1) {
        _thisRow.find('.helpTekstLang').hide();
    }
    _this.hide();
    _thisRow.prev().find('.help').slideToggle();
    _thisRow.addClass("hiddenHelp");
}

/*Find all helpbuttons which has to be open by default*/
function FindHelpByDefaults() {
    var b = $('.helpOpenedByDefault');
    b.each(function () {
        var _this = this;
        DisplayHelp(_this);
        $(_this).removeClass();
        $(_this).addClass('help');
        $(_this).slideToggle();
    });
}

function AddRemoveHelpButton(row, helpTekst) {
    row.find(helpTekst).parent().next().html('<input type="submit" class="help helpClose" data-active="True" data-isfirstcontrol="False">');

    $("input.helpClose").off("click").click(function (e) {
        e.preventDefault();
        HideHelp(this);
    });

    row.find(helpTekst).parent().next().css('display', 'none');
    row.find(helpTekst).parent().next().slideToggle();
}

function RowAction_ShowCaseCustomDetails(dataTables, table, ref) {
    var row = dataTables.row(ref).data();

    var localizedBaseUrl = table.data('localizedBaseUrl');
    var url = localizedBaseUrl + "CaseCustom.aspx?CaseId=" + row["CaseId"]; // Vanuit de standaard wordt geen andere pagina ondersteunt dan Case.aspx

    // redirect user to Case page.
    window.location.href = url;
}