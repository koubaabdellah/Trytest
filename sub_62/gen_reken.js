var versie_gen_reken = "1.4.8";

/* 1.4.7 16-3-2017 (CG): vErsteVraag aangepast naar vEersteVraag. maxLength toegevoegd bij maakTextVeld().  
 * addPiwikCountResultBttn aangepast. 
 * 1.4.8 (CG) Piwik tellers aangepast. 
 * 1.4.9 (CG) Piwik tellers kleine aanpassing 
 * */ 

function initreken() {
  initInterface();
	initMatomo();
}

// script Matomo beta en productie
function initMatomo() {
	let domain = (location.host === undefined) ? ['beta'] : location.host.split('.', 1);
	if (domain[0] === 'beta' || domain[0] === 'beta-t' || domain[0] === 'beta-m' || domain[0] === 'beta-o'){
		var _mtm = _mtm || [];
		_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
		var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://pwa001.belastingdienst.nl/js/container_V5pHHGy2.js'; s.parentNode.insertBefore(g,s); }
	else {
		var _mtm = _mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://pwa001.belastingdienst.nl/js/container_RSpCJUas.js'; s.parentNode.insertBefore(g,s); }
}

function initInterface() {
  var savH1 = $('#hoofd_content h1');
  $('#hoofd_content')
          .empty()
          .append(savH1)
          .append('<form  id="divVragen" class="form_ll " action="#" method="post" onsubmit="return false"></form>')
          .append('<form  id="divButtons" class="form_ll " action="#" method="post" onsubmit="return false"></form>')
          .append('<form  id="divResultaat" class="form_ll " action="#" method="post" onsubmit="return false"></form>')
          .append('<form  id="divButtonsWijzig" class="form_ll " action="#" method="post" onsubmit="return false"></form>');

  if (uri.dir.toLowerCase().indexOf('\/rekenhulpen\/') != -1) {
    // Voorkom cache-probleem bij pagina-refresh
    for (i = 0; i < document.forms.length; i++) {
      document.forms[i].reset();
    }
    var bDebug = false;
    for (var i = 0; i < uri.args.length && bDebug === false; i++) {
      if (uri.args[i] === "debug") {
        var bDebug = true;
      }
    }
    var arrAllDIVs = document.getElementsByTagName("div");
    //Het versienummer en de debug-velden tonen in ontwikkel-omgeving
    if (bDebug === true || uri.dom == 'file:' || (uri.dom == 'https:' && uri.path.substr(0, 7) == "/www-o." ) || uri.dom.substr(0, 9) == "localhost" || uri.dom.substr(0, 14) == "www-o-local.nl" || uri.dom.split(".")[uri.dom.split(".").length - 1] === "local") {
      try {
        document.getElementById("divVersie").style.display = 'block';
      } catch (e) {
      }
      try {
        initVersie();
      } catch (e) {
      }
      for (i = 0; i <= arrAllDIVs.length - 1; i++) {
        if (arrAllDIVs[i].className == "clDebugHidden") {
          try {
            arrAllDIVs[i].className = "clDebug";
          } catch (e) {
          }
        }
      }
    } else {
      $('#content_add')
              .empty()
              .append('<div id="divVersie">');
      $('#divVersie').append('<p>Versie: ' + sVersie + '</p>');
      try {
        document.getElementById("divVersie").style.display = 'none';
      } catch (e) {
      }
      for (i = 0; i <= arrAllDIVs.length - 1; i++) {
        if (arrAllDIVs[i].className == "clDebug") {
          try {
            arrAllDIVs[i].className = "clDebugHidden";
          } catch (e) {
          }
        }
      }
    }
    toonVersie();
  }
}

function doVraag(vraagID) {   
  var sExtraClassDivHelpButton;  
  if (debug != undefined && debugJS)
    doDebugJS("doVraag(" + vraagID + ")");
  // return als vraag reeds getoond  
  if ($('#div' + vraagID).is('#div' + vraagID))
    return;
  // return + foutmelding  als de te tonen vraag niet bestaat in vragen.js
 
  if (aVraag[vraagID] == undefined) {
    alert('fout: de gegevens van de te tonen vraag ' + vraagID + ', niet gevonden in tabel aVraag. \n check flow.js en vragen.js');
    return false;
  }
  if (maakBlok(vraagID) == false)
    return false;  
    
    var vraagOpscherm = replaceVarsInText(aVraag[vraagID].opScherm);

  $('#fsInvoer' + blokNR + ' ol#V' + blokNR).append('<li id="div' + vraagID + '" class="divVraag" />');
  $('#fsInvoer' + blokNR + ' ol#V' + blokNR + ' li#div' + vraagID).append('<div class="list_vraag" />');

  var inputID = vraagID;
  var aVraagType = aVraag[vraagID].type.split("[");
  if (aVraagType.length == 2) {
    aVraagType[1] = aVraagType[1].replace("]", "")
  }

  switch (aVraagType[0]) {
    case 'dropdown':
      if (aVraagType.length == 2) {
        maakVeldDropdown(parseInt(aVraagType[1]));
      } else {
        maakVeldDropdown(1);
      }
      break;
    case 'text':
      maakVeldText();
      break;
    case 'JaNee':
      maakVeldJaNee();
      break;
    case 'RadioGroep':
      maakVeldRadioGroep();
      break;
    case 'checkbox':
      maakVeldCheckbox();
      break;
    case 'date':
      maakVeldDatum();
      break;
    case 'datePeriod':
      maakVeldDatumPeriode();
      break;
    case 'dateYearMonth':
      maakVeldDatumJaarMaand();
      break;
    case 'custom':
      maakCustomVeld(vraagID, inputID, vraagOpscherm);
      break;
  }
  vraagAanvullen();
  checkHelpButton();
  if (typeof vraagAanvullenModuleSpecifiek == 'function') {
    vraagAanvullenModuleSpecifiek(vraagID);
  }

  $('.list_vraag').removeClass('lastChild');
  $('#div' + inputID + ' div.list_vraag').addClass('lastChild');
  //debug
  if (debug != undefined && debugSID)
    $('#div' + inputID + ' div.list_vraag').prepend('<p class="clDebug clDebugSID">' + vraagID + '</p>');
  return;

  function maakVeldText() {
    $('#div' + vraagID + ' div.list_vraag').append('<div class="left" id="div' + vraagID + '_vraag_blok">');
    doOpSchermIntro();
    $('#div' + vraagID + '_vraag_blok').append('<label for="' + vraagID + '">' + vraagOpscherm + '</label>');
    doOpSchermExtra();
    $('#div' + vraagID + '_vraag_blok').append('<input type="text" name="' + inputID + '" id="' + vraagID + '" class="txt clUserInput" />');
    $('#' + vraagID).keyup(function (e) {
      checkVraag(this, e);
    });
    if (aVraag[vraagID].onblur) {
      eval("$('#' + vraagID).blur (function(e){" + aVraag[vraagID].onblur + "});"
              )
    }
  }

  function maakVeldJaNee() {
    $('#div' + vraagID + ' div.list_vraag').append('<fieldset />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').addClass("fsVraag");
    //legend
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').append('<div class="left" id="div' + vraagID + '_vraag_blok">');
    doOpSchermIntro();
    $('#div' + vraagID + '_vraag_blok').append('<label />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset label').append(vraagOpscherm);
    doOpSchermExtra();
    //input ja
    inputID = vraagID + '_True';
    $('#div' + vraagID + '_vraag_blok').append('<span id="input' + vraagID + '" class="clVraagInput" />');
    $('#input' + vraagID).append('<label id="lbl' + vraagID + '_True" for="' + vraagID + '_True" />');
    $('#lbl' + vraagID + '_True').text(oTekst.ja);
    $('#lbl' + vraagID + '_True').prepend('<input type="radio" name="' + vraagID + '" id="' + inputID + '" value="ja" class="clUserInput" />');
    $('#' + vraagID + '_True').change(function () {
      checkVraag(this);
    });
    //input nee
    $('#input' + vraagID).append('<label id="lbl' + vraagID + '_False" for="' + vraagID + '_False" />');
    $('#lbl' + vraagID + '_False').text(oTekst.nee);
    $('#lbl' + vraagID + '_False').prepend('<input type="radio" name="' + vraagID + '" id="' + vraagID + '_False" value="nee" class="clUserInput" />');
    $('#' + vraagID + '_False').change(function () {
      checkVraag(this);
    });
    inputID = vraagID;
  }

  function maakVeldRadioGroep() {
    $('#div' + vraagID + ' div.list_vraag').append('<fieldset />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').append('<label class="clVraagLabel"  />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset label').text(vraagOpscherm);
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').append('<span id="input' + vraagID + '" class="clVraagInput" />');
    doOpSchermExtra('RadioGroep');
    inputID = vraagID + '_0';
    for (var i = 0; i < aVraag[vraagID].checkboxKeuze.length; i++) {
      $('#div' + vraagID + ' div.list_vraag' + ' fieldset span#input' + vraagID).append('<label id="lbl' + vraagID + '_' + i + '" for="' + vraagID + '_' + i + '" class="clCheckbox" />');
      $('#lbl' + vraagID + '_' + i).text(aVraag[vraagID].checkboxKeuze[i]);
      $('#lbl' + vraagID + '_' + i).prepend('<input type="radio" name="' + vraagID + '" id="' + vraagID + '_' + i + '" value="' + aVraag[vraagID].checkboxValues[i] + '" class="clUserInput" />');

      $('#' + vraagID + '_' + i).change(function () {
        checkVraag(this);
      });
    }
    inputID = vraagID;
  }

  function maakVeldCheckbox() {
    $('#div' + vraagID + ' div.list_vraag').append('<fieldset />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').append('<label class="clVraagLabel"  />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset label').text(vraagOpscherm);
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').append('<span id="input' + vraagID + '" class="clVraagInput" />');
    inputID = vraagID + '_0';
    for (var i = 0; i < aVraag[vraagID].checkboxKeuze.length; i++) {
      $('#div' + vraagID + ' div.list_vraag' + ' fieldset span#input' + vraagID).append('<label id="lbl' + vraagID + '_' + i + '" for="' + vraagID + '_' + i + '" class="clCheckbox" />');
      $('#lbl' + vraagID + '_' + i).text(aVraag[vraagID].checkboxKeuze[i]);
      $('#lbl' + vraagID + '_' + i).prepend('<input type="checkbox" name="' + vraagID + '" id="' + vraagID + '_' + i + '" value="' + aVraag[vraagID].checkboxVars[i] + '" class="clUserInput" />');
      $('#' + vraagID + '_' + i).change(function () {
        checkVraag(this);
      });
    }
    inputID = vraagID;
  }

  function maakVeldDatum() {
    var selector = '#div' + vraagID + ' div.list_vraag';
    inputID = vraagID;
    var labelTxt = vraagOpscherm;
    var YearRange = calcRange(aVraag[vraagID].yearRange);
    addDate(selector, inputID, labelTxt, YearRange);  //selector,inputID,labelTxt,YearRange,bLabelTonen
    $('#' + inputID).change(function () {
      checkVraag(this);
    })
  }

  function maakVeldDatumPeriode() {
    $('#div' + vraagID + ' div.list_vraag').append('<fieldset class="clPeriode" />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').append('<p class="clVraag">' + vraagOpscherm + '</p>');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset').append('<ol class="clDate" />');
    $('#div' + vraagID + ' div.list_vraag' + ' fieldset ol.clDate').append('<li />');
    var YearRange = calcRange(aVraag[vraagID].yearRange);
    // label + input 'Begin'
    var selector = '#div' + vraagID + ' div.list_vraag' + ' fieldset ol li';
    inputID = vraagID + '_Begin';
    var labelTxt = 'Begindatum';
    addDate(selector, inputID, labelTxt, YearRange);  //selector,inputID,labelTxt,YearRange,bLabelTonen
    // label + input 'Eind'
    var selector = '#div' + vraagID + ' div.list_vraag' + ' fieldset ol li';
    var inputID = vraagID + '_Eind';
    var labelTxt = 'Einddatum';
    addDate(selector, inputID, labelTxt, YearRange);  //selector,inputID,labelTxt,YearRange,bLabelTonen
    inputID = vraagID;
  }

  function maakVeldDatumJaarMaand() {
    inputID = vraagID + "_maand";
    $('#div' + vraagID + ' div.list_vraag').append('<label for="' + inputID + '">' + vraagOpscherm + '</label>');
    $('#div' + vraagID + ' div.list_vraag').append('<div class="selectYearMonth">');
    $('#div' + vraagID + ' div.list_vraag div').append('<select id="' + inputID + '" name="' + inputID + '" class="clUserInput selMaand" />');
    $('#' + inputID).change(function () {
      checkVraag(this)
    });

    //vullen maandselect
    var defaultMaand;
    if (aVraag[vraagID].defaultMaand) {
      eval("defaultMaand = " + replaceVarsInText(aVraag[vraagID].defaultMaand));
    }
    addMonthsToSelect(inputID, defaultMaand);

    // vullen jaarselect
    inputID = vraagID + "_jaar";
    $('#div' + vraagID + ' div.list_vraag div').append('<select id="' + inputID + '" name="' + inputID + '" class="clUserInput selJaar" />');
    $('#' + inputID).change(function () {
      checkVraag(this)
    });
    var defaultJaar;
    if (aVraag[vraagID].defaultJaar) {
      eval("defaultJaar = " + replaceVarsInText(aVraag[vraagID].defaultJaar));
    }
    var aTemp = calcRange((aVraag[vraagID].yearRange)).split(":");
    if (aTemp[0] < aTemp[1]) {
      s1 = "i<=aTemp[1]";
      s2 = "i++";
    } else {
      s1 = "i>=aTemp[1]";
      s2 = "i--";
    }
    if (defaultJaar == undefined) {
      $('#' + inputID).append('<option value="">Jaar</option>');
    }
    for (var i = aTemp[0]; eval(s1); eval(s2)) {
      var sSelected = "";
      if (defaultJaar != undefined) {
        if (i == defaultJaar) {
          sSelected = ' selected="selected"';
        }
      }
      $('#' + inputID).append('<option value="' + i + '"' + sSelected + '>' + i + '</option>');
    }
    sExtraClassDivHelpButton = "helpYearMonth";
    inputID = vraagID;
  }

  function maakVeldDropdown(iAantal) {
    $('#div' + vraagID + ' div.list_vraag').append('<div class="left" id="div' + vraagID + '_vraag_blok">');
    doOpSchermIntro();
    $('#div' + vraagID + '_vraag_blok').append('<div class="left" id="div' + vraagID + '_vraag_blok_links"><label for="' + vraagID + '">' + vraagOpscherm + '</label>');
    doOpSchermExtra();
    for (var ii = 1; ii <= iAantal; ii++) {
      if (iAantal > 1) {
        var inputID = vraagID + "_" + ii;
        var options = eval("aVraag[vraagID].dropdownKeuze_" + ii);
      } else {
        inputID = vraagID;
        var options = aVraag[vraagID].dropdownKeuze;
      }

      $('#div' + vraagID + '_vraag_blok').append('<select id="' + inputID + '" name="' + vraagID + '" class="clUserInput" />');
      $('#' + inputID).change(function () {
        checkVraag(this)
      });
      //options[1]:  controleer of ":" aanwezig. Betreft nummerieke range. van:tot
      var counter = -1;
      if ($.isArray(options[0]) == false) {
        if ((options[0]).indexOf(":") > -1) {
          counter = 0;
        }
      }
      if (counter == -1) {
        if ((options).length > 1) {
          if ($.isArray(options[1]) == false) {
            if ((options[1]).indexOf(":") > -1) {
              counter = 1;
            }
          }
        }
      }
      if (counter > -1) {
        //vervang eerst eventueel aanwezig variabelen.
        var aTemp = options[counter].split(":");
        if (aTemp[0] != "function") {
          aTemp = calcRange((options[counter])).split(":");
          if (aTemp[0] < aTemp[1]) {
            s1 = "i<=aTemp[1]";
            s2 = "i++";
          } else {
            s1 = "i>=aTemp[1]";
            s2 = "i--";
          }
          //var counter = 1;
          for (var i = aTemp[0]; eval(s1); eval(s2)) {
            options[counter] = i.toString();
            counter++;
          }
        } else {
          options = eval(aTemp[1]);
        }
      }

      var defaultKeuze;
      if (aVraag[vraagID].defaultKeuze) {
        eval("defaultKeuze = " + aVraag[vraagID].defaultKeuze);
      }
      for (var i = 0; i < options.length; i++) {
        var txtKeuze = options[i];
        var valKeuze = options[i];
        if ($.isArray(txtKeuze)) {
          if (txtKeuze.length > 1) {
            var txtKeuze = options[i][0];
            var valKeuze = options[i][1];
          }
        }
        var sSelected = "";
        if (defaultKeuze != undefined) {
          if (valKeuze == defaultKeuze) {
            sSelected = ' selected="selected"';
          }
        }
        $('#' + inputID).append('<option value="' + valKeuze + '"' + sSelected + '>' + txtKeuze + '</option>');
      }
    }
    inputID = vraagID;
  }

  function vraagAanvullen() {
    if (aVraag[vraagID].maxlength != undefined) {
      if (!isNaN(aVraag[vraagID].maxlength) && $("#" + inputID).is("input")) {
        $("#" + inputID).attr('maxlength', (aVraag[vraagID].maxlength));
      }
    }
    if (aVraag[vraagID].classInput != undefined) {
      $("#" + inputID).addClass(aVraag[vraagID].classInput);
    }
    if (aVraag[vraagID].opSchermAchterInput != undefined) {
      $("#" + inputID).after(aVraag[vraagID].opSchermAchterInput);
    }
  }

  function doOpSchermIntro() {
    if (aVraag[vraagID].opSchermIntro !== undefined) {
      $('#div' + vraagID + '_vraag_blok').before('<div id="intro' + vraagID + '" class="clVraagExtra" />');
      toonHtmlTxt('#intro' + vraagID, replaceVarsInText(aVraag[vraagID].opSchermIntro));
    }
  }

  function doOpSchermExtra(typeVraag) {
    if (aVraag[vraagID].opSchermExtra !== undefined) {
      if (typeVraag === 'RadioGroep') {
        $('#div' + vraagID + ' fieldset').append('<div id="extra' + vraagID + '" class="clVraagExtra" />');
      } else {
        $('#div' + vraagID + '_vraag_blok').append('<div id="extra' + vraagID + '" class="clVraagExtra" />');
      }
      toonHtmlTxt('#extra' + vraagID, replaceVarsInText(aVraag[vraagID].opSchermExtra));
    }
  }

  function checkHelpButton() {
    if (aHelp[vraagID]) {
      //helpicoon
      $('#div' + inputID + ' div.list_vraag').append('<div id="divHelpButton' + inputID + '"><a title="' + oTekst.toon_toelichting + '" href="javascript:void(0)" class="btn_info open" id="btn_info' + inputID + '" /></div>');
      if (sExtraClassDivHelpButton != undefined) {
        $("#divHelpButton" + inputID).addClass(sExtraClassDivHelpButton);
      }
      $('#btn_info' + inputID).text('?');
      $('#btn_info' + inputID).click(function () {
        toonHelp(this);
        $('#btnclose' + vraagID).focus();
      });
    }
  }

  function addMonthsToSelect(SelectID, defaultSelect) {
    var aMonths = getMaanden();
    if (defaultSelect == undefined) {
      $('#' + SelectID).append('<option value="">Maand</option>');
    }
    for (i = 0; i < 12; i++) {
      var sSelected = "";
      if (defaultSelect != undefined && defaultSelect == aMonths[i][0]) {
        sSelected = ' selected="selected"';
      }
      $('#' + SelectID).append('<option value="' + aMonths[i][0] + '"' + sSelected + '>' + aMonths[i][1] + '</option>');
    }
  }
}

function addDate(selector, inputID, labelTxt, YearRange, bLabelTonen) {
  var clLabel = '';
  var range = '';
  if (bLabelTonen != undefined && bLabelTonen == false)
    clLabel = 'sr';
  if (YearRange != undefined)
    range = YearRange;
  $(selector).append('<span id="span' + inputID + '" class="clDate" />');
  $(selector + ' #span' + inputID).append('<label class="' + clLabel + '" for="' + inputID + '">' + labelTxt + '</label>');
  $(selector + ' #span' + inputID).append('<input type="text" id="' + inputID + '" class="txt datepicker clUserInput clDate" />');
  addDatepicker($('.datepicker'), inputID, range);
  $('.ui-datepicker-trigger').attr('title', 'Selecteer een datum');
  $('#' + inputID).change(function () {
    checkVraag(this);
  });
}

function addDatepicker(obj, inputID, year) {
  if (year === undefined || year === '')
    year = (new Date).getFullYear() + ":" + (new Date).getFullYear();
  aYear = year.split(":");
  yearChange = (aYear[0] === aYear[1]) ? false : true;
  var defaultDate = '01-01-' + aYear[1];
  var minDate = '01-01-' + aYear[0];
  var maxDate = '31-12-' + aYear[1];
  if (aVraag[inputID] != undefined) {
    if (aVraag[inputID].defaultDate != undefined) {
      if (aVraag[inputID].defaultDate) {
        defaultDate = replaceVarsInText(aVraag[inputID].defaultDate);
      }
    }
    if (aVraag[inputID].minDate != undefined) {
      if (aVraag[inputID].minDate) {
        minDate = replaceVarsInText(aVraag[inputID].minDate);
      }
    }
    if (aVraag[inputID].maxDate != undefined && aVraag[inputID].maxDate) {
      maxDate = replaceVarsInText(aVraag[inputID].maxDate);
    }
  }

  $(obj).datepicker({
    yearRange: year,
    changeMonth: true,
    constrainInput: true,
    changeYear: yearChange,
    showOn: 'button',
    buttonImage: '../js/ui/calendar.gif',
    buttonText: 'kalender tonen of verbergen',
    buttonImageOnly: true,
    dateFormat: 'dd-mm-yy',
    defaultDate: defaultDate,
    minDate: minDate,
    maxDate: maxDate
  });
}

function maakBlok(vraagID) {
  // Begin fieldset(blok) en invoer //
  //bepaal tot welk blok de vraag behoort. 
  if (blokMode)
    blokNR = vraagID.substring(1, vraagID.indexOf('-'));
  else
    blokNR = '';
  //als fieldset (blok) niet wordt getoond: voeg fieldset(blok) toe
  if ($('#fsInvoer' + blokNR).is('#fsInvoer' + blokNR) == false) {
    if (blokMode) {
      if (aBlok["V" + blokNR] === undefined) {
        alert('fout: geen bloktitel gevonden. Huidige vraag' + vraagID + '. \n check tabel aBlok in vragen.js');
        return false;
      }
    }
    $('#divVragen').append('<fieldset id="fsInvoer' + blokNR + '" class="clBlok" />');
    $('#fsInvoer' + blokNR).append('<legend class="bloktitel"><span class=left">' + aBlok["V" + blokNR] + '</span></legend>');
    checkHelpButtonBlok(blokNR);
    $('#fsInvoer' + blokNR).append('<ol id="V' + blokNR + '" />');
  }
  //als fieldset(blok) wel wordt getoond, maar niet het laatst getoonde blok is: prog.foutmelding
  else if ($('#fsInvoer' + blokNR).is(":last-child") === false) {
    alert('fout: de te tonen vraag ' + vraagID + ' behoort niet bij het laatst getoonde blok.');
    return false;
  }
  return true;
  // Eind fieldset 

  function checkHelpButtonBlok(blokNR) {
    if (aHelp["V" + blokNR]) {
      //helpicoon
      $('#fsInvoer' + blokNR + ' legend.bloktitel').append('<div id="divHelpButtonV' + blokNR + '" class="right">\n\
      <a title="' + oTekst.toon_toelichting + '" class="btn_info open" id="btn_infoV' + blokNR + '" /></div>');
      if (typeof sExtraClassDivHelpButton !== "undefined") {
        $("#divHelpButtonV" + blokNR).addClass(sExtraClassDivHelpButton);
      }
      $('#btn_infoV' + blokNR).text('?');
      $('#btn_infoV' + blokNR).click(function () {
        toonHelp(this);
      });
    }
  }
}

function getToelichting(id) {
  return aHelp[id];
}

function toonHelp(oThis) {
  var thisID = oThis.id;
  var vraagID = thisID.substr(8);
  if ($("#message_" + vraagID).is("#message_" + vraagID)) { //id getoond == te tonen id, dus verwijderen.
    $('#message_' + vraagID).toggle('slow', function () {
      $('#message_' + vraagID).remove();
    });
    $('#btn_info'+ vraagID).focus();
  } else {
    //$('.message_help').remove(); // verwijder alle helpvensters
    // help bij blok of vraag?
    if (vraagID.split('-').length === 1) { // blok
      $('<div id="message_' + vraagID + '" class="message_help" />').insertAfter('#fsInvoer' + vraagID.substr(1) + " legend.bloktitel");
    } else { // vraag
      $('#div' + vraagID).append('<div id="message_' + vraagID + '" class="message_help" />');
    }
    $('#message_' + vraagID).hide();
    $('#message_' + vraagID).append('<div class="help_arrow" />');
    $('#message_' + vraagID).append('<div id="message_info_' + vraagID + '" class="message_info" />');
    $('#message_info_' + vraagID).append('<a id="btnclose' + vraagID + '" href="javascript:void(0)" title="' + oTekst.verberg_toelichting + '" class="btn_info close">x</a>');
    $('#btnclose' + vraagID).click(function () {
      toonHelp(this);
    });
    $('#message_info_' + vraagID).append('<div class="clHelpText">');
    // Vervang eventuele variabele in resultaat teksten (vraag/label)
    var aResultTemp = new Array();
    for (var i = 0; i < aHelp[vraagID].length; i++) {
      aResultTemp[i] = replaceVarsInText(aHelp[vraagID][i]);
    }
    toonHtmlTxt('#message_info_' + vraagID + ' .clHelpText', aResultTemp);
    $('#message_' + vraagID).toggle('slow');
  }
}

function toonLetop(vraagID, aLetop) {
  if ($("#letop_" + vraagID).is("#letop_" + vraagID)) { //id getoond == te tonen id, dus verwijderen.
    $('#letop_' + vraagID).remove();
  }
  if (aLetop.length == 0)
    return;
  else {
    $('#div' + vraagID + ' div.list_vraag').append('<div id="letop_' + vraagID + '" class="mod message_letop" />');

    $('#letop_' + vraagID).append('<p class="bd-letopkop">Let op!</p>');
    // Vervang eventuele variabele in resultaat teksten (vraag/label)
    var aResultTemp = new Array();
    for (var i = 0; i < aLetop.length; i++) {
      aResultTemp[i] = replaceVarsInText(aLetop[i]);
    }
    toonHtmlTxt('#letop_' + vraagID, aResultTemp);
  }
}

function toonFout(inputID, melding, toon) {
  var vraagID = inputID.substring(0, (inputID.indexOf('_') > -1) ? inputID.indexOf('_') : inputID.length);
  if ($("#error_" + vraagID).is("#error_" + vraagID)) {
    $("#error_" + vraagID).remove();
    $('.input_error').removeClass('input_error');
  }
  if (toon == false)
    return;
  else {
    $('#div' + vraagID).append('<div id="error_' + vraagID + '" class="message_error" />');
    $('#div' + vraagID + " .message_error").append('<div class="error_arrow" />');
    $('#div' + vraagID + " .message_error").append('<div id="message_error_' + vraagID + '" class="message_err" />');
    $('#message_error_' + vraagID).append('<div class="clHelpText">');
    toonHtmlTxt('#message_error_' + vraagID + ' .clHelpText', melding);
    $('#' + inputID).addClass('input_error');
    //document.getElementById(inputID).focus();
    document.getElementById($(document.activeElement).attr("id")).focus();
  }
}

function toonHtmlTxt(selector, tabel) {
  var ulList = false;
  var olList = false;
  var subList = false;
  var listId = '';
  var subListId = '';
  var iList = 0;
  if (!$.isArray(tabel)) {
    tabel = [].concat(tabel);
  }
  for (var i = 0; i < tabel.length; i++) {
    if (!$.isArray(tabel[i])) {
      aOpSchermTxt = [].concat(tabel[i]);
    } else {
      aOpSchermTxt = tabel[i];
    }
    for (var j = 0; j < aOpSchermTxt.length; j++) {
      var opSchermTxt = aOpSchermTxt[j];
      //ul
      if (opSchermTxt !== undefined && opSchermTxt.indexOf('<ul') > -1) {
        if (subList === false) {
          iList++;
          listId = 'ul_' + iList;
          $(selector).append('<ul id="' + listId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ul') + 3));
          ulList = true;
        } else {
          subListId = 'ul_' + iList + '_sub';
          $(selector + " li").last().append('<ul id="' + subListId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ul') + 3));
        }
      } else if (opSchermTxt !== undefined && opSchermTxt.indexOf('</ul>') > -1) {
        if (subList === false) {
          ulList = false;
        } else if (subList === true) {
          subList = false;
        }
      } else if (ulList && opSchermTxt !== undefined && opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') > -1 && subList === false) {
        $(selector + ' #' + listId).append(opSchermTxt);

        //ol
      } else if (opSchermTxt !== undefined && opSchermTxt.indexOf('<ol') > -1) {
        if (subList === false) {
          iList++;
          listId = 'ol_' + iList;
          $(selector).append('<ol id="' + listId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ol') + 3));
          olList = true;
        } else {
          subListId = 'ol_' + iList + '_sub';
          $(selector + " li").last().append('<ol id="' + subListId + '"' + opSchermTxt.substring(opSchermTxt.indexOf('<ol') + 3));
        }
      } else if (opSchermTxt !== undefined && opSchermTxt.indexOf('</ol>') > -1) {
        if (subList === false) {
          olList = false;
        } else if (subList === true) {
          subList = false;
        }
      } else if (olList && opSchermTxt !== undefined && opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') > -1 && subList === false) {
        $(selector + ' #' + listId).append(opSchermTxt);

        // geneste opsomming	
      } else if (opSchermTxt !== undefined && opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') === -1 && subList === false) {
        $(selector + ' #' + listId).append(opSchermTxt + '</li'); //li schrijven
        subList = true;
      } else if (opSchermTxt !== undefined && opSchermTxt.indexOf('<li') > -1 && opSchermTxt.indexOf('</li>') > -1 && subList === true) {
        $("#" + subListId).append(opSchermTxt);

      } else {
        $(selector).append(opSchermTxt);
      }
    }
  }
}

function checkVraag(oInput, e) {
  if (debug != undefined && debugJS)
    doDebugJS("checkVraag(object met id:" + oInput.id + ")");
    
  bld_piwik.eersteVraag(); 
  //bepaal vraagID - verwijder eventuele toevoegingen zoals false en true;  V1-2_true  : blok-vraag-toevoeging
  var inputID = oInput.id;
  var vraagID = inputID.substring(0, (inputID.indexOf('_') > -1) ? inputID.indexOf('_') : inputID.length);
  // corrigeer datumvelden
  if ($(oInput).hasClass('clDate')) {
    oInput.value = reformatDate(oInput.value);
  }
  // Evt. aanroep van module specifieke acties //
  if (typeof checkVraagModuleSpecifiek == 'function') {
    checkVraagModuleSpecifiek(oInput, vraagID, e);
  }
  var removed = false;
  aVar['actBlok'] = vraagID.substring(1, vraagID.indexOf('-'));
  if (blokMode) {
    //Controleer of het blok van de actieve vraag, de laatst getoonde is. Zoniet, verwijder dan alle resterende getoonde blokkken.
    //bepaal tot welk blok de huidige vraag behoort.
    if ($('fieldset#fsInvoer' + aVar['actBlok']).is(":last-child") == false) {
      $('#fsInvoer' + aVar['actBlok'] + ' ~ .clBlok').remove();
      removed = true;
    }
  }
  //Contoleer of de actieve vraag de laatst getoonde is. Zoniet, verwijder alle vragen getoond na deze vraag.
  if ($('li#div' + vraagID).is(":last-child") == false) {
    if (bBeslis == true) {
      $('#div' + vraagID + " ~ " + ".divVraag").remove();
    }
    removed = true;
  }
  if ($('#fsUitvoer').is('#fsUitvoer'))
    $('#fsUitvoer').remove(); // verwijder resultaten, indien getoond.
  if ($('#fsButtons').is('#fsButtons'))
    $('#fsButtons').hide(); // verwijder result buttons, indien getoond.
  // EIND: Scherm bijwerken
  if (removed) { // valideren, alle variabelen opnieuw instellen en uitvoer flow
    doRebuildVars(vraagID); // alle variabelen ingesteld na actieve vraag zijn niet meer relevant. Alles wissen en opnieuw instellen
  }
  //alert("algvalidatie");
  // valideer invoer
  if (!validInput(vraagID, oInput, e)) {
    //aVraag[vraagID].valid = false;
    return
  }
  //sla invoer van gebruiker op in variabele (indien gedefinieerd in vragen.js)
  doSaveVar(vraagID);
  //ga naar flow
  var uitkomst = '';
  if (aVraag[vraagID].type == 'JaNee')
    uitkomst = document.getElementById(inputID).value;
  doFlow(vraagID, uitkomst);
}

function validInput(vraagID, oInput, e) {
  var aLetop = [];
  if (debug != undefined && debugJS)
    doDebugJS("validInput(" + vraagID + "):[Start] ");
  //checkInput (validatie)
  var inputValid = true;
  //Datumvelden algemeen
  if ($(oInput).hasClass('clDate') && aVraag[vraagID].type != 'custom') {
    inputValid = (oInput.value) == "" ? false : inputValid;
    if (inputValid) {
      range = aVraag[vraagID].yearRange;
      aResultaat = validDate(oInput.value, vraagID, range);
      inputValid = aResultaat[0];
      errorTxt = aResultaat[1];
      dateString = aResultaat[2];
      if (inputValid) {
        oInput.value = dateString;
        toonFout(oInput.id, errorTxt, false);
      } else {
        toonFout(oInput.id, errorTxt, true);
      }
    }
  }
  // Per vraag type
  var aVraagType = aVraag[vraagID].type.split("[");
  if (aVraagType.length == 2) {
    aVraagType[1] = aVraagType[1].replace("]", "")
  }
  if (aVraagType[0] == 'dropdown') {
    if (aVraagType[1] == undefined) {
      inputValid = (document.getElementById(vraagID).value) == "" ? false : inputValid;
    } else {
      for (var i = 1; i <= parseInt(aVraagType[1]) && inputValid == true; i++) {
        inputValid = (document.getElementById(vraagID + "_" + i).value) == "" ? false : inputValid;
      }
    }
  } else if (aVraagType[0] == 'text') {
    inputValid = (document.getElementById(vraagID).value) == "" ? false : inputValid;
    if (inputValid) {
      if (aVraag[vraagID].validatie) {
        var aVal = aVraag[vraagID].validatie.split(",");
        $.each(aVal, function (i) {
          if (aVal[i] == "numeriek") {
            var valNumeriek = checkNumeriek(oInput, aVraag[vraagID]);
            inputValid = valNumeriek[0];
            errorTxt = valNumeriek[1];
          }
        });
        toonFout(vraagID, errorTxt, inputValid ? false : errorTxt === "NOerror" ? false : true);
        //toonFout(vraagID, errorTxt, inputValid ? false : true);
      }
    }
  } else if (aVraagType[0] == 'datePeriod') {
    begindat = document.getElementById(vraagID + '_Begin');
    einddat = document.getElementById(vraagID + '_Eind');
    inputValid = (begindat.value == '' || einddat.value == '') ? false : inputValid;
    // controleer periode
    if (inputValid) {
      aResultaat = validDatePeriod(begindat.value, einddat.value);
      inputValid = aResultaat[0];
      errorTxt = aResultaat[1];
      if (!inputValid)
        toonFout(begindat.id, errorTxt, true);
      else
        toonFout(begindat.id, errorTxt, false);
    }
  } else if (aVraagType[0] == 'dateYearMonth') {
    inputValid = (document.getElementById(vraagID + '_maand').value == '' || document.getElementById(vraagID + '_jaar').value == '') ? false : inputValid;
  } else if (aVraagType[0] == 'checkbox' || aVraagType[0] == 'RadioGroep') {
    // minimaal 1 geselecteerd
    var inputValid = false;
    for (var i = 0; i < aVraag[vraagID].checkboxKeuze.length; i++) {
      inputValid = document.getElementById(vraagID + '_' + i).checked ? true : inputValid;
    }
  } else if (aVraagType[0] == 'JaNee') {
    // minimaal 1 geselecteerd
    var inputValid = false;
    inputValid = document.getElementById(vraagID + '_True').checked || document.getElementById(vraagID + '_False').checked ? true : inputValid;
  }

  // Begin specifiek //
  //if (inputValid) { // fix voor waarde going concern optionele velden
    if (typeof valideerModuleSpecifiek == 'function') {

      var result = valideerModuleSpecifiek(vraagID, inputValid, aLetop, e)
      inputValid = result[0];
      aLetop = result[1];
    }
  //}
  // Einde specifiek //
  toonLetop(vraagID, aLetop);
  aVraag[vraagID].valid = inputValid;
  if (debug != undefined && debugJS)
    doDebugJS("validInput(" + vraagID + "):[Result]:" + inputValid);
  return inputValid;
}

function algValidatie(resultID) {
  var bValid = true;
  $.each(aVraag, function (i) {
    if (aVraag[i].valid == false) {
      bValid = false;
      return false;
    }
  });
  if (bValid === true) {
    doEindResultaat(resultID);
  }
}

function initaVar() {
  var aTemp = [];
  $.each(aVraag, function (i) {
    if (aVraag[i].variabele) {
      aTemp[aVraag[i].variabele] = null;
    }
  });
  return aTemp;
}

var aVar = aVar || [];
function doRebuildVars(vraagID) {
  if (debug != undefined && debugJS)
    doDebugJS("doRebuildVars()");
  // tabel van variabelen opnieuw instellen.
  if (bBeslis == true) {
    aVar = initaVar();
    if (typeof initVarsModuleSpecifiek == 'function') {
      initVarsModuleSpecifiek();
    }
  } else {
    if (assArrLength(aVar) == 0) {
      aVar = initaVar();
      if (typeof initVarsModuleSpecifiek == 'function') {
        initVarsModuleSpecifiek();
      }
    }
  }

  $(".divVraag:not('.Result')").each(
          function () {
            var objID = this.id;
            var vrgID = objID.substring(3, objID.length);  // divVxx-xx  minus div
            aVar['actBlok'] = vrgID.substring(1, vrgID.indexOf('-'));
            if (bBeslis == true) {
              if (vraagID != undefined) {
                if (vraagID == vrgID)
                  return false;
              }
            }
            var oInput = document.getElementById(vrgID);
            //valideer invoer
            if (!validInput(vrgID, oInput))
              return false;
            //sla invoer van gebruiker op in variabele (indien gedefinieerd in vragen.js)
            var uitkomst = doSaveVar(vrgID);
            // voor alle getoonde vragen, voer de flow uit voor het opnieuw instellen van eventuele proces variabelen
            doFlow(vrgID, uitkomst);
          }
  );
}

function doSaveVar(vraagID) {
  // invoer van vraag opslaan, indien variabele gedefinieerd voor vraag (zie vragen.js)
  var bVar;
  if ((aVraag[vraagID] != undefined)) {
    var sVarName = aVraag[vraagID].variabele;
    if (sVarName != '')
      bVar = true;
    else
      bVar = false;
  }
  var uitkomst = '';
  var aVraagType = aVraag[vraagID].type.split("[");
  if (aVraagType.length == 2) {
    aVraagType[1] = aVraagType[1].replace("]", "")
  }

  if (aVraagType[0] == 'date') {
    uitkomst = strToDate(document.getElementById(vraagID).value);
    if (bVar)
      aVar[sVarName] = uitkomst;
  } else if (aVraagType[0] == 'datePeriod') {
    if (bVar)
      aVar['begin_' + sVarName] = strToDate(document.getElementById(vraagID + '_Begin').value);
    if (bVar)
      aVar['eind_' + sVarName] = strToDate(document.getElementById(vraagID + '_Eind').value);
  } else if (aVraagType[0] == 'dateYearMonth') {
    if (bVar)
      aVar['maand_' + sVarName] = parseInt(document.getElementById(vraagID + '_maand').value);
    if (bVar)
      aVar['jaar_' + sVarName] = parseInt(document.getElementById(vraagID + '_jaar').value);
  } else if (aVraagType[0] == 'JaNee') {
    if (document.getElementById(vraagID + '_True').checked) {
      uitkomst = document.getElementById(vraagID + '_True').value;
      if (bVar)
        aVar[sVarName] = uitkomst;
    }
    if (document.getElementById(vraagID + '_False').checked) {
      uitkomst = document.getElementById(vraagID + '_False').value;
      if (bVar)
        aVar[sVarName] = uitkomst;
    }
  } else if (aVraagType[0] == 'RadioGroep') {
    for (var i = 0; i < aVraag[vraagID].checkboxValues.length; i++) {
      vraagIDinput = vraagID + "_" + i;
      if (document.getElementById(vraagIDinput).checked) {
        uitkomst = aVraag[vraagID].checkboxValues[i]
        aVar[sVarName] = uitkomst;
        break;
      }
    }
  } else if (aVraagType[0] == 'dropdown') {
    if (aVraagType[1] == undefined) {
      uitkomst = document.getElementById(vraagID).value
      if (bVar)
        aVar[sVarName] = uitkomst;
    } else {
      for (var i = 1; i <= parseInt(aVraagType[1]); i++) {
        uitkomst = document.getElementById(vraagID + "_" + i).value;
        sVarName = eval('aVraag[vraagID].variabele_' + i);
        if (bVar)
          aVar[sVarName] = uitkomst;
      }
    }
  } else if (aVraagType[0] == 'checkbox') {
    for (i in aVraag[vraagID].checkboxVars) {
      sVarName = aVraag[vraagID].checkboxVars[i];
      vraagIDinput = vraagID + "_" + i;
      if (document.getElementById(vraagIDinput).checked)
        aVar[sVarName] = true;
      else
        aVar[sVarName] = false;
    }
  } else if (aVraagType[0] == 'text') {
    uitkomst = (document.getElementById(vraagID).value);
    if (bVar)
      aVar[sVarName] = uitkomst;
  }

  if (bVar && aVraag[vraagID].validatie) {
    var aVal = aVraag[vraagID].validatie.split(",");
    $.each(aVal, function (i) {
      if (aVal[i] == "numeriek" && aVar[sVarName] !== null) {
        aVar[sVarName] = aVar[sVarName].replace(/[.]/g, "");
        if (aVraag[vraagID].decimalen) {
          uitkomst = parseFloat(aVar[sVarName].replace(",", "."));
        } else {
          uitkomst = parseInt(aVar[sVarName]);
        }
      }

    });
    aVar[sVarName] = uitkomst;
  }

  if (bVar && aVraag[vraagID].classInput) {
    var aVal = aVraag[vraagID].classInput.split(",");
    $.each(aVal, function (i) {
      if (aVal[i] == "percentage") {
        uitkomst = parseFloat(aVar[sVarName]) / 100;
      }
    });
    aVar[sVarName] = uitkomst;
  }
  // Begin specifiek //
  if (typeof saveVarModuleSpecifiek == 'function') {
    saveVarModuleSpecifiek(vraagID, sVarName)
  }
  // Einde specifiek //

  //debug: toon alle variabelen op scherm
  if (debug != undefined && debugSAV)
    doDebugSAV(true);
  if (debug != undefined && debugJS)
    doDebugJS("doSaveVar(" + vraagID + "): " + uitkomst);
  return uitkomst;
}

function getResultaat(id) {
  return aResult[id];
}

function doTussenResult(vraagID) {
  if (debug != undefined && debugJS)
    doDebugJS("doTussenResult(" + vraagID + ")");

  if ($('#div' + vraagID).is('#div' + vraagID))
    return;

  if (maakBlok(vraagID) === false)
    return false;

  if (blokMode)
    var blokNR = vraagID.substr(1, 1);
  else
    var blokNR = '';

  // Vervang eventuele variabele in resultaat teksten (vraag/label)
  var aResultTemp = new Array();
  for (var i = 0; i < aResult[vraagID].length; i++) {
    aResultTemp[i] = replaceVarsInText(aResult[vraagID][i]);
  }

  //Div
  $('#fsInvoer' + blokNR + ' ol#V' + blokNR).append('<li id="div' + vraagID + '" class="divVraag Result" />');
  $('#fsInvoer' + blokNR + ' ol#V' + blokNR + ' li#div' + vraagID).append('<div class="list_vraag Result" />');
  //ResultTxt	
  toonHtmlTxt('#div' + vraagID + ' div.list_vraag', aResultTemp);

  //debug
  if (debug != undefined && debugSID)
    $('#div' + vraagID + ' div.list_vraag').prepend('<p class="clDebug clDebugSID">' + vraagID + '</p>');
}

// wordt aangeroepen vanuit flow
function doEindResultaat(ResultID) {
  if (typeof bToonResultButton !== "undefined") {
    if (bToonResultButton === false) {
      doEindResultaatDirect(ResultID);
      bld_piwik.addTeller('Afgerond');
      return;
    }   
  }
  doEindResultaatButton(ResultID);   
  bld_piwik.countBttn();
  return;
}

// Voeg Piwik tellers toe. 
var bld_piwik = new Object();
bld_piwik.bEersteVraag = true;
bld_piwik.rondEersteKeerAf = true;

bld_piwik.countBttn = function(){ 
  $('#butResults').click(function(){
    // waarom werkt this hier niet? Omdat hij misschien in jquery of een functie zit?
    if (bld_piwik.rondEersteKeerAf === true){
      bld_piwik.addTeller('Afgerond');
      bld_piwik.rondEersteKeerAf = false;
    }
    else {
      bld_piwik.addTeller('Afgerond na wijziging');      
    }       
  });
  $('#butWijzig').click(function(){
    //bld_piwik.addTeller('Wijzig invoer'); Dit werkt niet bij goed bij annuiteiten en schenkbelasting 
  });          
};

bld_piwik.eersteVraag = function(){
  if (this.bEersteVraag === true){
    this.addTeller('Start');
    this.bEersteVraag = false; 
  };  
};
  // in interface.js wordt bld_bld_piwik.naamRekenhulp = "Lijfrentepremie"; gebruikt om een naam (hoofdletters en spaties zijn toegestaan) voor de teller in te vullen
bld_piwik.addTeller = function(actie){       
  var tellerNaamRekenhulp;            
  if (this.naamRekenhulp !== undefined){
    tellerNaamRekenhulp = this.naamRekenhulp;
  }
  else {
    tellerNaamRekenhulp = document.title;
  }     
  try {
    // trackEvent, categorie, actie, naam (rekenhulp, actie, naam_rekenhulp)
    _paq.push(['trackEvent', 'Rekenhulp', actie, tellerNaamRekenhulp]);
  } catch (e) {
    //console.log('error: ' + e );
  }
}    

function doEindResultaatButton(ResultID) {
  //toon Resultaten knop
  doButtonResults(true);
  $('#butResults').unbind("click");
  $('#butResults').click(function () {
    //verberg Resultaten knop
    doButtonResults(false);
    // Disable invoer 
    $('#hoofd_content .clUserInput').prop('disabled', true);
    $("img.ui-datepicker-trigger").hide();
    // $(".hasDatepicker").datepicker('disable');
    //toon Eindresultaat
    if (typeof doBereken == 'function') {
      doBereken(ResultID);
    }
        //Toon Wijzig Knop
    doWijzigInvoer(ResultID);
    doResult(ResultID);

  });
}

function doEindResultaatDirect(ResultID) {
  $("img.ui-datepicker-trigger").hide();
  //toon Eindresultaat
  if (typeof doBereken === 'function') {
    doBereken(ResultID);
  }
  doResult(ResultID);
}

function doResult(resultID, bVoegToe) {
  if (bVoegToe == undefined)
    bVoegToe = true;  //Indien false, wordt de resultaat  tekst toegevoegd binnen aan het <li>-element van het laatst getoonde resultaat.
  if (debug != undefined && debugJS)
    doDebugJS("doResult(" + resultID + ")");
  // Als resultid afhankelijk is van de berekening kan deze nog gewijzigd worden
  if (typeof resultIDNaBerekeningModuleSpecifiek == 'function') {
    resultID = resultIDNaBerekeningModuleSpecifiek(resultID);
  }
  if ($('#div' + resultID).is('#div' + resultID))
    return;
  //als fieldset uitvoer niet wordt getoond: voeg blok toe
  if ($('#fsUitvoer').is('#fsUitvoer') == false)
  {
    $('#divResultaat').append('<fieldset id="fsUitvoer" />');
    $('#fsUitvoer').append('<legend>' + oTekst.resultaat + '</legend>');
    $('#fsUitvoer').append('<ol />');
  }
  // Vervang eventuele variabele in resultaat teksten (vraag/label)
  var aResultTemp = new Array();
  if (aResult[resultID] !== undefined) {
    for (var i = 0; i < aResult[resultID].length; i++) {
      aResultTemp[i] = replaceVarsInText(aResult[resultID][i]);
    }
  }
  //Div
  if (bVoegToe) {
    $('#fsUitvoer ol').append('<li id="div' + resultID + '" class="divResult Result" />');
    $('#fsUitvoer ol li#div' + resultID).append('<div class="list_result Result" />');
  }
  //ResultTxt	
  if (bVoegToe == false) {
    tmpResultID = $('').attr('id');
    selector = '#fsUitvoer ol li:last-child div.list_result';
  } else {
    selector = '#div' + resultID + ' div.list_result';
  }
  toonHtmlTxt(selector, aResultTemp);
  if (typeof vulaanResultaatModuleSpecifiek == 'function') {
    vulaanResultaatModuleSpecifiek(resultID)
  }
  //debug
  if (debug != undefined && debugSID)
    $('#div' + resultID + ' div.list_result').prepend('<p class="clDebug clDebugSID">' + resultID + '</p>');
}

function doWijzigInvoer(ResultID) {
  //toon Wijzig knop
  doButtonWijzig(true);
  bld_piwik.countBttn();
  $('#butWijzig').click(function () {
    //verberg Wijzig knop
    doButtonWijzig(false);
    // Enable invoer 
    $('#hoofd_content .clUserInput').prop('disabled', false);
    $("img.ui-datepicker-trigger").show();
    //verberg Eindresultaat
    $('#fsUitvoer').remove(); // verwijder resultaten
    //Toon Resultaten Knop
    doEindResultaat(ResultID);
  });
}
function doButtonResults(bToon) {
  if (!bToon) {
    if ($('#fsButtons').is('#fsButtons')) {
      $('#fsButtons').hide();
    }
  } else {
    if ($('#fsButtons').is('#fsButtons')) {
      $('#fsButtons').show();
    } else {
      $('#divButtons').append('<fieldset id="fsButtons" />');
      $('#fsButtons').append('<ol />');
      //Div
      $('#fsButtons ol').append('<li id="liButtons" class="divButtons" />');
      $('#fsButtons ol li#liButtons').append('<div class="list_vraag" />');
      $('#fsButtons ol li#liButtons div.list_vraag').append('<input id="butResults" class="submit" type="button" value="' + oTekst.toon_resultaten + '" />');
    }
  }
}
function doButtonWijzig(bToon) {
  if (!bToon) {
    if ($('#fsButtonsWijzig').is('#fsButtonsWijzig')) {
      $('#fsButtonsWijzig').hide();
    }
  } else {
    if ($('#fsButtonsWijzig').is('#fsButtonsWijzig')) {
      $('#fsButtonsWijzig').show();
    } else {
      $('#divButtonsWijzig').append('<fieldset id="fsButtonsWijzig" />');
      $('#fsButtonsWijzig').append('<ol />');
      //Div
      $('#fsButtonsWijzig ol').append('<li id="liButtonsWijzig" class="divButtons" />');
      $('#fsButtonsWijzig ol li#liButtonsWijzig').append('<div class="list_vraag" />');
      $('#fsButtonsWijzig ol li#liButtonsWijzig div.list_vraag').append('<input id="butWijzig" class="submit" type="button" value="' + oTekst.wijzig_invoer + '" />');
    }
  }
}

// taalafhankelijke teksten instellen
var oTekst = new Object();
var sTaal = $("meta[name=language]").attr("content");
if (sTaal == undefined || sTaal.trim() == "") {
  sTaal = "nl";
}
if (sTaal === "nl") {
  oTekst = {
    ja: 'ja',
    nee: 'nee',
    toon_toelichting: 'Toon toelichting',
    verberg_toelichting: 'Verberg deze toelichting',
    toon_resultaten: 'Toon resultaten',
    wijzig_invoer: 'Wijzig invoer',
    resultaat: 'Resultaat'
  }
} else if (sTaal === "en") {
  oTekst = {
    ja: 'yes',
    nee: 'no',
    toon_toelichting: 'Show explanation',
    verberg_toelichting: 'Hide this explanation',
    toon_resultaten: 'Show results',
    wijzig_invoer: 'Change input',
    resultaat: 'Result'
  }
} else if (sTaal === "de") {
  oTekst = {
    ja: 'ja',
    nee: 'nein',
    toon_toelichting: 'Erläuterung anzeigen',
    verberg_toelichting: 'Diese Erläuterung ausblenden',
    toon_resultaten: 'Ergebnisse anzeigen',
    wijzig_invoer: 'Eingabe ändern',
    resultaat: 'Ergebnisse'
  }
}

function addBerekening(resultID, tb) {
//klikbare regel
  var cTable = 'table1_' + resultID;
  $('#div' + resultID + ' .list_result').prepend('<div id="sub-panel_' + resultID + '" class="sub-panel calculation-panel"><div class="sub-panel-header"><table id="table1_' + resultID + '" class="data-table" summary="samenvatting van tabulaire data">');
  addScopeRow(cTable);
  addRow(cTable, tb.header, 1, 1);

  // uitgewerkte berekening
  $('#sub-panel_' + resultID).append('<div class="sub-panel-content">');
  var cPanel = $('#sub-panel_' + resultID + ' .sub-panel-content');

  $.each(tb.content, function (i, v) {
    if (!v.conditie || (v.conditie && v.conditie())) {
      addTable(v, cPanel, resultID, i);
    }

  });
  addActions();
  return;

  function addTable(oThis, cPanel, resultID, i) {
    var iTable = i + 2;
    var cTable = 'table' + iTable + '_' + resultID;
    if (oThis.titel) {
      $(cPanel).append('<p class="sub-title">' + oThis.titel + '</p>');
    }
    $(cPanel).append('<table id="' + cTable + '" class="data-table" summary="samenvatting van tabulaire data">');
    addScopeRow(cTable, iTable);
    $.each(oThis.row, function (ii, vv) {
      if (!vv.conditie || (vv.conditie && vv.conditie())) {
        addRow(cTable, vv, iTable, ii);
      }
    });
  }

  function addRow(cTable, data, iTable, iRow) {
    var col1, col2, col3, col4;
    col1 = col2 = col3 = ["<span class='text-only'>-</span>", ""];
    col4 = ["<span class='text-only'>Geen help</span>", ""];
    if (typeof data.col1 !== "undefined") {
      col1 = getData(data.col1);
      if (iTable === 1) {
        col1[0] = '<span class="sub-header">' + getData(data.col1)[0] + '</span>';
      }
    }
    if (typeof data.col2 !== "undefined") {
      col2 = getData(data.col2);
    }
    if (typeof data.col3 !== "undefined") {
      col3 = getData(data.col3);
    }
    if (typeof data.help !== "undefined") {
      col4[0] = '<div><a title="Toon toelichting" class="btn_info">?</a></div>';
      col4[1] = ' class="help" ';
    }

    $("#" + cTable).append('<tr>\n\
	<td headers="' + cTable + 'Header1"' + col1[1] + ' id="' + cTable + 'SubHeader' + iRow + '" scope="row">' + col1[0] + '</td>\n\
  <td headers="' + cTable + 'Header2 ' + cTable + 'SubHeader' + iRow + '"' + col2[1] + '>' + col2[0] + '</td>\n\
	<td headers="' + cTable + 'Header3 ' + cTable + 'SubHeader' + iRow + '"' + col3[1] + '>' + col3[0] + '</td>\n\
  <td headers="' + cTable + 'Header4 ' + cTable + 'SubHeader' + iRow + '"' + col4[1] + '>' + col4[0] + '</td>\n\
</tr>');
    if (typeof data.help !== "undefined") {
      $("#" + cTable).append('<tr class="tr-help">\n\
     <th scope="row" headers="' + cTable + 'Header4" id="' + cTable + 'HelpHeader' + iRow + '" class="hlp"><strong class="hcTablee">Help</strong></th>\n\
<td headers="' + cTable + 'HelpHeader' + iRow + ' ' + cTable + 'SubHeader' + iRow + '" colspan="4" class="message-holder">\n\
    <div class="message_help"><div class="help_arrow"></div>\n\
      <div class="message_info"><a title="Verberg deze toelichting" class="btn_info close">x</a>\n\
<div class="clHelpText">' + data.help +
              '</div></div></div></td></tr>');
    }
  }
  function addScopeRow(cTable) {
    $("#" + cTable).append('<tr class="text-only">\n\
    <th scope="col" id="' + cTable + 'Header1"><strong>Omschrijving</strong></th>\n\
    <th scope="col" id="' + cTable + 'Header2"><strong>Bedrag 1</strong></th>\n\
    <th scope="col" id="' + cTable + 'Header3"><strong>Bedrag 2</strong></th>\n\
    <th scope="col" id="' + cTable + 'Header4"><strong>Help</strong></th>\n\
  	</tr>');
  }

  function getData(txt) {
    data = [replaceVarsInText(txt), ""];
    if (data[0].substr(0, 5) === "EURO:") {
      data[0] = '<span class="cell"><span class="valuta">€</span><span class="bedrag">' + naarbedrag(data[0].substr(data[0].indexOf(":") + 1)) + '</span></span>';
    }
    if (data[0].substr(0, 5) === "SIGN:") {
      data[1] = ' class="' + data[0].substr(5) + '" ';
      data[0] = '<span class="text-only">samen:</span>';
    }
    return data;
    function naarbedrag(getal) {
//  tbv tonen alle resultaten undefined ondervangen
      if (getal !== undefined) {
        getal = getalNaarBedrag(getal, true);
      }
      return getal;
    }
  }

  function addActions() {
    $(".sub-panel-header span.sub-header").click(function () {
      return togglePanel($(this));
    });
    $(".sub-panel-header span.sub-header").attr("tabindex", "0").keypress(function (e) {
      if (e.which != '0') {
        e.preventDefault();
      }
      if (e.which == '13') {
        return togglePanel(this);
      }
    });
    var togglePanel = function (el) {
      var detailPanel = $(el).closest('.sub-panel-header');
      var detailPanelContent = $(detailPanel).next('.sub-panel-content')
      if ($(detailPanelContent).css("display") == "none") {
        detailPanelContent.slideDown(500, function () {
          detailPanel.addClass("open-sub-panel");
          detailPanelContent.find("a.help-link").fadeIn();
        });
      } else {
        detailPanelContent.find("a.help-link").hide();
        detailPanelContent.slideUp(500, function () {
          detailPanel.removeClass("open-sub-panel");
        });
      }
      return false;
    };
    $('div.calculation-panel tr.tr-help').hide();
    $('div.calculation-panel td.help a.btn_info').click(function () {
      $(this).closest("tr").next("tr.tr-help").toggle('slow');
    });
    $('div.calculation-panel tr.tr-help a.btn_info').click(function () {
      $(this).closest("tr").toggle('slow');
    });
  }
}

function toonVersie() {
  var bToonteller = false;
  for (var i = 0; i < uri.args.length && bToonteller == false; i++) {
    if (uri.args[i] == "versie") {
      bToonteller = true;
      if (typeof sVersie !== "undefined") {
        alert("Versie: " + sVersie);
      } else if (typeof sTiVersie !== "undefined") {
        alert("Versie: " + sTiVersie);
      }
    }
  }
}
