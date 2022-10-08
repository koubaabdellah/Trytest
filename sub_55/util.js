/**
 * 
 * called from the onload method of the body
 * loads the aangiftejaar select and add basic handlers to the objects
 * 
 */
function initializeInterface() {

  Interface.initVersion();

  $("#btnVerder1").removeAttr("disabled");
  $("#btnVerder1").removeClass("buttonDisabled");

  $("#btnAddWoning").removeAttr("disabled");
  $("#btnAddWoning").removeClass("buttonDisabled");

  $("#btnVerder2-Woning").removeAttr("disabled");
  $("#btnVerder2-Woning").removeClass("buttonDisabled");

  $("#btnGebeurtenis-Woning").removeAttr("disabled");
  $("#btnGebeurtenis-Woning").removeClass("buttonDisabled");
  $(".hasDatepicker").datepicker('enable');

  $("#fsGeschiktheid").removeClass('hidden');

  Interface.clear("#frmBerekening");
  var todaysYear = new Date().getFullYear();
  var yearFrom = "2004";
  globalYearRange = yearFrom + ":" + todaysYear;


  Interface.buildYear();
  Interface.addBasicHandlers();

  Interface.appendOntbonden(); //Add the first ontbonden koop to the DIV Ontbonden in Eindcontrole


}
/*also called from the onload of the page*/
function initializeObjects() {

  Interface.loadHtml();

  Bijleen.initEindControle();
}
/**
 * 
 * adds a datepicker to an input
 * 
 */
function addDatepicker(obj, year) {
  if (year == undefined)
    year = globalYearRange;
  $(obj).datepicker({
    yearRange: year,
    changeMonth: true,
    changeYear: true,
    showOn: 'button',
    buttonImage: 'images/calendar.gif',
    buttonImageOnly: true,
    dateFormat: 'dd-mm-yy'});
}

function stringToDate(string) {
  //receives a String and returns a Date or "Invalid Date" Invalid Year or empty

  var newdate = "";
  if (string != "") {
    if ((string.indexOf("/") == -1) && (string.indexOf("-") == -1)) {
      if (string.length == 8) {
        var idxj = string.length - 4;
        var idxm = idxj - 2;
        var y = string.substr(idxj);
        var m = string.substring(idxm, idxj);
        var d = string.substring(0, idxm);
        string = d + "-" + m + "-" + y;
      } else {
        string = "Invalid Date";
      }
    }

    if ((string != "dd-mm-jjjj") && (string != "Invalid Date") && (string != "dd/mm/jjjj")) {

      var delimiter = "-";
      if (string.indexOf("/") != -1)
        delimiter = "/";
      var year = string.substr(string.lastIndexOf(delimiter) + 1);
      var month = string.substring(string.indexOf(delimiter) + 1, string.lastIndexOf(delimiter));
      var day = string.substring(0, string.indexOf(delimiter));
      month = (month * 1) - 1;
      if (year.length <= 2) {
        newdate = "Invalid Year";
      } else {
        if (year < 1000) {
          newdate = "Invalid Date";
        } else {
          if (year > 3000) {
            newdate = "Invalid Date";
          } else {
            newdate = new Date(year, month, day);
            if ((newdate.getDate() != day) || (newdate.getMonth() != month) || (newdate.getFullYear() != year)) {

              newdate = "Invalid Date";
            }

          }
        }
      }

    } else {
      newdate = "";
    }

  }

  return newdate;

}
function dateToString(datum) {

  var result = "";
  if (datum != "") {

    var delimiter = "-";
    try {
      result = datum.getDate() + delimiter + (datum.getMonth() + 1) + delimiter + datum.getFullYear();

    } catch (err) {
    }
  }
  return result;

}
function dateToStringAstext(datum) {
  var maanden = new Array("januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december");
  var result = "";
  if (datum != "") {

    //var delimiter="-";
    try {
      result = datum.getDate() + " " + maanden[datum.getMonth()] + " " + datum.getFullYear();

    } catch (err) {
    }
  }
  return result;

}

function validateBedrag(obj) {
  var num = $(obj).val();
  num = num.replace(/[.]/g, "");
  num = parseInt(num);

  var good = true;
  if (isNaN(num)) {
    num = "";
    good = false;

  }

  if (good) {
    //$(obj).formatCurrency({roundToDecimalPlace:0});
  }

  return good;
}
function rewriteBedrag(obj) {
  var num = $(obj).val();
  num = num.replace(/[.]/g, "");
  num = parseInt(num);

  if (isNaN(num)) {
    num = "";


  } else {
    num = Math.abs(num);
  }
  $(obj).val(num);


  $(obj).formatCurrency({roundToDecimalPlace: 0});



}

function show_hide_error(good, obj) {
  var parent = $(obj).parent("li");
  //var img = $(parent).find(".imgError");
  var input = $(parent).find("input");

  if (!good) {
    $(obj).removeClass("hidden");
    //$(img).removeClass("hidden");
    $(input).addClass("inputError");
  } else
  {
    $(obj).addClass("hidden");
    //$(img).addClass("hidden");
    $(input).removeClass("inputError");
  }

}

function hide_info(obj) {
  var parent = $(obj).parent("div");
  $(parent).addClass("hidden");
}

function currencyToNumber(value) {
  value = value + "";
  value = value.replace(/[.]/g, "");
  value = value * 1;
  return value;
}
function trim(str) {
  while (str.charAt(0) == " ") {
    str = str.substr(1);
  }

  return str;
}

function cleanDateField(obj) {
  if ($(obj).val() == "dd-mm-jjjj") {
    $(obj).val("");

  }
  $(obj).removeClass("grijsText");
}
function alertInvalidDate(datum, divErrInvalidDate, txtDatum) {
  $(divErrInvalidDate).addClass("hidden");


  var good = true;
  if ((datum == "Invalid Date") || (datum == "Invalid Year")) {
    good = false;
    $(divErrInvalidDate).removeClass("hidden");
  } else {
    if (datum != "") {
      $(txtDatum).val(dateToString(datum));
    }
  }



  return good;


}
/*deletes a house. Called from the Verwijder link*/
function deleteWon(idx) {
  Interface.deleteWoning(idx);
}
function addOntbonden() {

  Interface.appendOntbonden();
  if (idsOntbonden.length > 1) {
    $(".verwijderOnt").removeClass("hidden");
  } else {
    $(".verwijderOnt").addClass("hidden");
  }

}
function deleteOntbonden(id) {
  id = id.substr(10);
  Interface.removeOntbonden(id);
}

function deleteIndexFromArray(arr, idx) {
  var arr1 = arr.slice(0, idx);
  var arr2 = arr.slice(idx + 1, arr.length);
  var end = arr1.concat(arr2);
  if (end.length == 0) {
    end = new Array();
  }
  return end;
}
function hideEventSelector(idWoning) {
  var id = idWoning.substr(idWoning.indexOf("Woning") + 6);
  $("#pSelGebeurtenis-Woning" + id).addClass("hidden");

}

function blockDiv(div) {



  $(div + " input").attr("disabled", "disabled");
  $(div + " input").addClass("buttonDisabled");
  $(div + " select").attr("disabled", "disabled");
  $(div + " select").addClass("buttonDisabled");
  $(div + " label").addClass("greyLink");
  $(div + " .hasDatepicker").datepicker('disable');
  $(div + " .wijzig").removeAttr("disabled");
  $(div + " .wijzig").removeClass("buttonDisabled");
  $(div + " .buttonToDelete").addClass("hidden");

}
function unblockDiv(div) {

  $(div + " input").removeAttr("disabled");
  $(div + " input").removeClass("buttonDisabled");
  $(div + " select").removeAttr("disabled", "disabled");
  $(div + " select").removeClass("buttonDisabled");
  $(div + " label").removeClass("greyLink");
  $(div + " .hasDatepicker").datepicker('enable');
  $(div + " .buttonToDelete").removeClass("hidden");
  $(div + " .alwaysDisabled").attr("disabled", "disabled");
  $(div + " .alwaysDisabled").addClass("buttonDisabled");


}
function showHideWoning(id, op) {

  switch (op) {
    case "show":
      $("#divAccordion-Woning" + id).removeClass("hidden");
      $("#title-Woning" + id).removeClass("titleWonRight");
      $("#title-Woning" + id).addClass("titleWonBottom");


      break;
    case "hide":

      $("#divAccordion-Woning" + id).addClass("hidden");
      $("#title-Woning" + id).removeClass("titleWonBottom");
      $("#title-Woning" + id).addClass("titleWonRight");

      break;
    case "toggle":
      toggleObj("#divAccordion-Woning" + id);

      var css = $("#title-Woning" + id).attr("class");
      if (css == "titleWonRight") {
        $("#title-Woning" + id).removeClass("titleWonRight");
        $("#title-Woning" + id).addClass("titleWonBottom");


      } else {
        $("#title-Woning" + id).removeClass("titleWonBottom");
        $("#title-Woning" + id).addClass("titleWonRight");

      }
  }

}
function toggleClass(obj) {

  var css = $(obj).attr("class");

  try {
    if (css.indexOf("titleWonBottom") != -1) {
      $(obj).removeClass("titleWonBottom");
      $(obj).addClass("titleWonRight");
    } else {
      $(obj).addClass("titleWonBottom");
      $(obj).removeClass("titleWonRight");
    }
  } catch (err) {
  }
}
function toggleObj(obj) {
  SluitHelp();

  var css = $(obj).attr("class");

  if (css == undefined || css.indexOf("hidden") == -1) {
    $(obj).addClass("hidden");
  } else {
    $(obj).removeClass("hidden");
  }
}

/**
 * centers a window
 * 
 */
function center(ven, w, h) {
  var x = screen.width;
  var y = screen.height;

  ven.moveTo((x / 2) - (w / 2), (y / 2) - (h / 2));
  ven.focus();
}
function checkSchenkingHelp(idWoning, obj) {
  idWoning = idWoning.substring(7, idWoning.indexOf("-workflow"));
  if (Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() < Interface.variable["jan12011"].getTime()) {
    doHelp('divHelpSchenkingOuders2010', obj);
  } else if ((Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() > Interface.variable["jan12011"].getTime()) && (Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() < Interface.variable["jan12013"].getTime())) {
    doHelp('divHelpSchenkingOuders2011', obj);
  } else if ((Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() > Interface.variable["dec312012"].getTime()) && (Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() <= Interface.variable["dec312013"].getTime())) {
    doHelp('divHelpSchenkingOudersVan01012013Tot31122013', obj);
  } else if ((Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() > Interface.variable["dec312013"].getTime()) && (Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() <= Interface.variable["dec312014"].getTime())) {
    doHelp('divHelpSchenkingOudersVan01012014tm31122014', obj);
  } else if ((Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() > Interface.variable["dec312014"].getTime()) && (Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() <= Interface.variable["dec312015"].getTime())) {
    doHelp('divHelpSchenkingOudersVan01012015tm31122015', obj);
  } else if ((Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() > Interface.variable["dec312015"].getTime()) && (Bijleendata.Woningen[idWoning].woning_aankoopdatum.getTime() <= Interface.variable["dec312016"].getTime())) {
    doHelp('divHelpSchenkingOudersVan01012016tm31122016', obj);
  } else {
    doHelp('divHelpSchenkingOudersVan01012017tm31122017', obj);
  }
}
function preventFromChangeAankoop(idWoning) {
  show_hide_error(false, "#divV1-1b-error-4-Woning" + idWoning);
  $("#date-Woning" + idWoning).datepicker("disable");
  $("#date-Woning" + idWoning).addClass("buttonDisabled");
  var style = $("#ui-datepicker-div").attr("style");
  style = style.toLowerCase();
  style = style.replace(/display: block/g, "display: none");
  $("#ui-datepicker-div").attr("style", style);

  //$("#date-Woning"+idWoning).datepicker("hide");


}