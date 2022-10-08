/**********

Menuet Javascript 
Versie 1.2.
Laatste wijzigdatum: 16-12-2012

*/

$(document).ready(function () {
    $("#LoaderTemplate").addClass("display_none");
});

var hasChanged;

function Comment(knowledge, session, frame, target, height, bevestig) {

    if (target === undefined) 
	{ target="default"
	}
    target = target || "default";

    if (height === undefined)
	{height=320}
    height = height || 320

    if (bevestig === undefined)
	{bevestig = 0}
    bevestig = bevestig || 0
		
    url = "http://admin.impactive.nl/comments/{T}.aspx?K={K}&S={S}&F={F}&B={B}";
    url = url.replace("{K}", knowledge);
    url = url.replace("{S}", session);
    url = url.replace("{F}", frame);
    url = url.replace("{T}", target);
    url = url.replace("{B}", bevestig);
    stats = "status=no,resizable=yes,toolbar=no,location=no,directories=no,menubar=no"+
            "scrollbars=yes,left=600,top=60,width=380,height="+height;
    wo = window.open(url, "comment", stats);
    wo.focus();
    return false;
}


$(function () {


    $('#hfJavaScriptCheck').val('1');

    var jAnswerlistLinks = $('#menuet_answerlist').find('a');

    jAnswerlistLinks.click(function () {
        if (hasChanged) alert("Druk op 'Volgende' om uw wijzigingen op te slaan.");

        return !hasChanged;
    });

    hasChanged = false;

    var jInputs = $('input:text, input:checkbox, input:radio, input:file, select');
    jInputs.change(function () { hasChanged = true; });


    //scriptstab: alleen voor Kcc-scripts. 
    if ($('#menu').length>0) {
        $("#menu").menu().addClass("ui-tabs-vertical ui-helper-clearfix");
        $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" ); 	
    }

    //hoogte invoervak
    if (window.innerHeight > 768) {

        var factor = window.innerHeight / 768
        var heightcontainer = $("#menuet_container").height() * factor
        var heightanswerlistcontainer = $("#menuet_container_answerlist").height() * factor
        var heightanswerlist = $("#menuet_answerlist").height() * factor
        var heightquestion = $("#menuet_questionblock").height() * factor
        var heightmap = $("#mapCanvas").height() * factor
        //$("#menuet_container").height(heightcontainer);
        $("#menuet_container_answerlist").height(heightanswerlistcontainer);
        $("#menuet_answerlist").height(heightanswerlist);
        $("#menuet_questionblock").height(heightquestion);
        $("#mapCanvas").height(heightmap);
    }
    
    //Hulptekst aan/uit zetten
    $(".menuet_help_input").each(function () {
        $('#' + this.id).bind('click', function (event) {
            event.preventDefault();
            var id = this.id.replace("menuet_help_button_", "");
            $("#menuet_help_text_" + id).toggle();
        })
    });
    //Infoteksten aan/uit zetten
    $(".menuet_info_input").each(function () {
        $('#' + this.id).bind('click', function (event) {
            event.preventDefault();
            var id = this.id.replace("menuet_info_button_", "");
            $("#menuet_info_text_" + id).toggle();
        })
    });
    //Errorteksten aan/uit zetten
    $(".menuet_error_input").each(function () {
        $('#' + this.id).bind('click', function (event) {
            event.preventDefault();
            var id = this.id.replace("menuet_error_button_", "");
            $("#menuet_error_text_" + id).toggle();
        })
    });
    //External links in nieuw venster (alleen online)
    if ($("base").length == 0) {
        var hostregex = location.protocol + "//" + location.host + "(?!/broker|//broker|/downloads)";
        var regex = $("input[name='regexInternalLinks']").attr("value");
        if (regex != null)
        {
            if (regex.length > 0) {
                regex += "|" + hostregex;
            }
            else {
                regex = hostregex;
            }
            $("a[href ^= 'http']").each(function ()
            {
                var rx = new RegExp(regex);
                if (!this.href.match(rx) && this.className != "keeponpage") {
                    this.target = "_blank";
                }
            })
        }
    }
    //van dropdownbox een selectbox extra breed: van dropdown naar listbox
    if ($('.lijstboxbreed select option').length > 0) {
        var aantal = $('.lijstboxbreed select option').length;
        var aantalselect = $('.lijstboxbreed select').length;
        aantal = aantal / aantalselect;
        if (aantal <= 20) {
            $('.lijstboxbreed select').attr("size", aantal + 1);
        } else {
            $('.lijstboxbreed select').attr("size", 20);
        }
    }

    //DATEPICKER
    $.datepicker.setDefaults($.datepicker.regional["nl"]);
    $('.menuet_inputdate').datepicker(
        { minDate: $('.menuet_inputdate').attr('start'),
            maxDate: $('.menuet_inputdate').attr('end'),
            dateFormat: "dd-mm-yy",
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            showOn: "both",
            buttonImage: "images/calendar.svg",
            buttonImageOnly: true            
        });
    $('.ui-datepicker-trigger').attr('alt', 'Datum invoeren');
    $('.ui-datepicker-trigger').attr('title', 'Datum kiezer');
    $('.ui-datepicker-trigger').css('margin-top', '0px');
    $(".ui-datepicker-trigger").parent().css("flex-direction", "row");
    $(".manualdatepicker").parent().css("flex-direction", "row");
    
    //DEFINITION
    $('.menuet_definition').bind('click', function (event) { event.preventDefault() });

    $(".menuet_definition").each(function () {
        $(this).qtip({
            content: {
                title: $(this).text(),
                attr: 'tooltip-content'
            },
            show: {
                solo: true,
                event: 'mouseover' 
            },
            hide: { delay: 500,
                event: 'click mouseleave',
                distance: 15
            },
            style: {
                // TODO: Styling is pending
                classes: 'qtip-Menuet',
                //width: { min: 200, max: 500 },
                //border: { width: 3, radius: 6 },
                //title: { 'overflow': 'hidden' },
                tip: { corner: 'topLeft' }
            },
            position: {
                at:  'right bottom'
            }
        });
    });
    
    //bewaarpagina bookmark optie
    if ($('#menuetmakebookmark').length > 0)
    {
        $('#menuetmakebookmark').bind('click', function (e) {
            e.preventDefault(); // this will prevent the anchor tag from going the user off to the link
            var bookmarkUrl = $('#menuetmakebookmark').attr('data');
            var bookmarkTitle = this.title;
            if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                alert('Uw browser staat het maken van een automatisch bladwijzer niet toe.');
                return false;
            }
            if (window.sidebar) { // For Mozilla Firefox Bookmark
                window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, "");
            } else if (window.external || document.all) { // For IE Favorite
                window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
            } else if (window.opera) { // For Opera Browsers
                $("#menuetmakebookmark").attr("href", bookmarkUrl);
                $("#menuetmakebookmark").attr("title", bookmarkTitle);
                $("#menuetmakebookmark").attr("rel", "sidebar");
            } else { // for other browsers which does not support
                alert('Uw browser staat het maken van een automatisch bladwijzer niet toe.');
                return false;
            }
        });
    }
    
    //multiselect
    if ($('.men__multichoicelist').length > 0) {
        $('.men__multichoicelist .menuet_option .menuet_input_check').bind('click', function (e) {$(this).parent().parent().find(".menuet_option_non_of_the_above .menuet_input_check").prop("checked",false)});
        $('.men__multichoicelist .menuet_option_non_of_the_above .menuet_input_check').bind('click', function (e) {
            $(this).parent().parent().find(".menuet_option .menuet_input_check").map(function() { $(this).prop("checked", false) })
        });
    }

    //answerslist subsitem
    
    $(".menuet_sub_answers").hide();
    
    $('.menuet_answerlistitems li.menuet_multichoice_parameter').on('mouseover', function (e) {
        $(this).find(".menuet_sub_answers").show("slow").delay(800);
    })
    $('#menuet_answerlist').on('mouseleave', function (e) {
        $(this).find(".menuet_sub_answers").hide("fast");
    })


    //tooltip bij tabelkolommen
    $(".MenuetTableColumnHeader[title]").each(function () {
        var t = $(this).attr("title");
        if (t.length>0 ) {
            $(this).addClass("textDecoration_underline");
        }
    })
    $(".MenuetTableColumnHeader[title]").qtip(
                {
                    content: false,
                    show: 'mouseover',
                    hide: 'mouseout',
                    position: { at: 'left bottom' },
                    style: {
                        name: 'dark',
                        border: { width: 3, radius: 8, color: '#505050' }

                    }

                });

    //invoerhulpen tabellen
    $(".MT_Type_Integer").mask("9?9999999999999999999999999999");
    $(".MT_Type_Datetime").mask("99-99-9999 99:99");
    $(".MT_Type_Time").mask("99:99");
    $(".MT_Type_Date").mask("99-99-9999");
    $(".MT_Type_Decimal2").autoNumeric("init", { aSep: '.', aDec: ',' });
    $(".MT_Type_Decimal4").autoNumeric("init", { aSep: '.', aDec: ',' });
    $(".MT_Type_Postcode").mask("9999 aa")
    $(".MT_Type_BSN").mask("99999999?9")

    //invoerhulp bedragen
    $(".menuet_inputcurrency").autoNumeric("init", { aSep: '.', aDec: ','});
    $(".menuet_inputfloat").autoNumeric("init", { aSep: '.', aDec: ',' });
    
    $("#menuet_command_next").on("click", function(e) 
    {
        $("*").css("cursor", "progress");
        if ($(".WaitLoader").length > 0) {
            $("#LoaderTemplate").removeClass("display_none");
            $("#LoaderTemplate").show();
        }

        //kaartingevuld?
        if ($("#EAGISModule").length > 0)
        {
            if (EAGIS.checkKaart()) {
                EAGIS.saveKaart();
            }
            else {
                e.preventDefault();
                $("#EAGISModule").after('<div id="EAGISModule_Error" class="display_none;"><p>Teken eerst op de kaart de evenementlocatie(s) of route.</p><p>Geef ook elke locatie een naam door erop te dubbelklikken.</p></div>');
                $("#EAGISModule_Error").dialog({ dialogClass: "no-close", modal: true, title: "Invoer niet compleet!", buttons: [{ text: "Ok", click: function () { $(this).dialog("close"); } }] });
            }
        }
    });

    if ($(".MenuetTableInputContainer").length > 0) 
    {
        $("#SaveImage").hide()
        $("#menuet_command_next").on("click", function (e) {
            e.preventDefault()
            $("#SaveImage").click();
        });
    }
    if ($(".MenuetTableShowContainer").length > 0 && $('#EditImage').length>0) {
        $(".MenuetTableShowContainer").append('<p class="menuethint">Controleer uw invoer en bevestig deze door nogmaals op Volgende te klikken</p>')
    }
   
    $(".menuet_inputtext").first().focus();

    $("#men_p_1__WW_Starttijd").focusout(function (e) {
        $("#men_p_1__WW_Eindtijd").val($("#men_p_1__WW_Starttijd").val());
    });

    if ($("#MenuetTimedSubmit").length > 0)
    {
        setInterval(function () {
            $('#menuet_command_next').click();
        }, 10000);
    }

    if ($("#MenuetDownloads").length > 0) {

        $("#MenuetDownloads").on("click", function (e) {
            e.preventDefault()
            var url = $("#MenuetDownloads").attr("href");
            window.open(url, "downloads", "location=0,menubar=0,toolbar=0,resizable=1,status=0,left=100,top=100,width=700,height=400", true);
        });
       
    }

    if ($(".MenuetDownloads").length > 0) {

        $(".MenuetDownloads").on("click", function (e) {
            e.preventDefault()
            var url = $(".MenuetDownloads").attr("href");
            window.open(url, "downloads", "location=0,menubar=0,toolbar=0,resizable=1,status=0,left=100,top=100,width=700,height=400", true);
        });

    }


    if ($("#MenuetSubKennis").length > 0) {

        $("#MenuetSubKennis").on("click", function (e) {
            e.preventDefault()
            var url = $("#MenuetSubKennis").attr("href");
            window.open(url, "MenuetSubKennis", "location=0,menubar=0,toolbar=0,resizable=1,status=0,left=100,top=100,width=1000,height=700", true);
        });

    }

    if ($(".menuet_db_multichoice_input").length > 0) 
    {
        $("#menuet_db_multichoice_commandblock").html('<input class="menuet_command" id="menuet_command_selectall" type="button" value="Selecteer alles" />');
        $("#menuet_command_selectall").on("click", function (e) {
            if ($("#menuet_command_selectall").val() == "Selecteer alles")
            {
                $(".menuet_db_multichoice_input input[type='checkbox']").map(function () { $(this).prop("checked", true) })
                $("#menuet_command_selectall").val("Selecteer niets");
            }
            else
            {  
                $(".menuet_db_multichoice_input input[type='checkbox']").map(function () { $(this).prop("checked", false) });
                $("#menuet_command_selectall").val("Selecteer alles");
            }
        })
    }

    if ($(".MenuetNoNavigate").length > 0)
    {
        $("#menuet_command_save").hide();

        $("#menuet_command_restart").hide();
    }

    if ($("#form1").attr("action").indexOf("vestigingssleutel") > 0)  //bij AIM-OD koppeling geen "later verder"
    {
        $("#menuet_command_save").hide()
    }
    
    $("input:not(:checkbox,:button,:radio,:image):visible:first").not(".hasDatepicker").focus();

    var progress = $("#menuet_progress_bar_text").text().trim();
    $("#menuet_progress_bar_progress").css("width", progress.substring(0, progress.length - 1).concat("%"));   
});

