var FinanKosten;
var eventOrder = new Array();
var canContinue = true; //true or false if it can continue with the berekening or wait for additional vragen
var additionaleVragen = new Array(); //contains answers to additional questions
additionaleVragen["finankosten"] = new Array();
additionaleVragen["6maandenhoofdverblijf"] = new Array();
additionaleVragen["aankoopverplichting"] = new Array();

/**
 * 	
 * Creates Persoon object
 * Makes the timeline of events
 * Calculates
 * 
 */
function Bereken() {
	initInitiatie();
	var data = makeTimeLine();

	showObjects();

	return data;


}
/**
 * 
 * Creates Object Finankosten
 * 
 */
function createObjectFinanKosten() {
	var aflossing_finankosten = "";
	var lening_te_verrekenen = "";

	if (parseInt(Interface.variable["aangiftejaar"]) >= 2010) {

		for (var i in WoningEigenaar) {

			if (WoningEigenaar[i].verkoopdatum == "") {

				if (WoningEigenaar[i].aankoopdatum.getTime() < Interface.variable["jan12010"].getTime()) {
					if (WoningEigenaar[i].bezit_1jan2004 == "nee") {
						if (WoningEigenaar[i].eerstewoning == "nee") {
							if (WoningEigenaar[i].lening_financiering > 0) {
								aflossing_finankosten = proc_uitvraag("finankosten", WoningEigenaar[i].woningidMachine);

								if ((aflossing_finankosten + "") == "") {
									canContinue = false;
									return;
								}

								var EWS_toename = WoningEigenaar[i].lening_financiering - aflossing_finankosten;
								var bedrag1 = WoningEigenaar[i].EWS + EWS_toename;

								if (EWS_toename > 0) {
									WoningEigenaar[i].EWS = Math.min(bedrag1, WoningEigenaar[i].lening);
									trackInfo += "<b>Finankosten</b>: EWS Woning " + i + "=" + WoningEigenaar[i].EWS + "<br><br>";

								}
							}
						}

					}
				}
			}
		}
		return;

	}

	FinanKosten = {};
	FinanKosten.eventdatum = Interface.variable["jan12010"];

}

/**
 * 
 * Adds the question of an additional question into additionaleVragen array
 * @param name = element of the array (finankosten, 6maandenhoofdverblijf, aankooopverplichting
 * @param woningidMachine = woning id
 * @param value = answer of the user to that question
 * 
 */
function addAdditionalVariable(name, woningidMachine, value) {

	additionaleVragen[name][woningidMachine] = value;
	Bereken();
}

/**
 * 
 * asks an additional question
 * @param vraag = id of the question
 * @param woningidMachine = woning id
 * 
 */
function proc_uitvraag(vraag, woningidMachine) {
	$("#divV6Save").addClass("hidden");


	switch (vraag) {
		case "finankosten":

			if (additionaleVragen["finankosten"][woningidMachine] == undefined) {
				unblockDiv("#divV6");
				$("#div4checkeindcontrole-Woning").removeClass("titleWonRight");
				$("#div4checkeindcontrole-Woning").addClass("titleWonBottom");
				$("#diveindcontroleContainer").removeClass("hidden");

				var html = "<ol id=\"olV7-3" + woningidMachine + "\"><li class=\"input blockInner\">" + Interface.html["divV7-3"] + "</li></ol>";
				html = html.replace(/-Woning/g, "-Woning" + woningidMachine);

				$(html).appendTo("#addVraagContainer");

				$("#spanV7-3-Woning" + woningidMachine).html(Bijleendata.Woningen[woningidMachine].woningid);


				$("#txtV7-3-Woning" + woningidMachine).keyup(function () {
					var good = validateBedrag("#txtV7-3-Woning" + woningidMachine);
					var valu = currencyToNumber($("#txtV7-3-Woning" + woningidMachine).val());
					if (good) {

						canContinue = true;
						addAdditionalVariable("finankosten", woningidMachine, valu);

					} else {
						canContinue = false;
						$("#divV6Save").addClass("hidden");

					}
					show_hide_error(good, "#divV7-3-error-1-Woning" + woningidMachine);

				});
				$("#txtV7-3-Woning" + woningidMachine).blur(function () {
					var good = validateBedrag("#txtV7-3-Woning" + woningidMachine);
					var valu = currencyToNumber($("#txtV7-3-Woning" + woningidMachine).val());
					if (good) {

						canContinue = true;
						addAdditionalVariable("finankosten", woningidMachine, valu);
						rewriteBedrag("#txtV7-3-Woning" + woningidMachine);

					} else {
						canContinue = false;
						$("#divV6Save").addClass("hidden");

					}
					show_hide_error(good, "#divV7-3-error-1-Woning" + woningidMachine);

				});

				return "";
			} else {

				return additionaleVragen["finankosten"][woningidMachine];
			}

			break;

		case "6maandenhoofdverblijf":

			if (additionaleVragen["6maandenhoofdverblijf"][woningidMachine] == undefined) {
				unblockDiv("#divV6");
				$("#div4checkeindcontrole-Woning").removeClass("titleWonRight");
				$("#div4checkeindcontrole-Woning").addClass("titleWonBottom");
				$("#diveindcontroleContainer").removeClass("hidden");

				var html = "<ol id='olV7-1" + woningidMachine + "'><li class=\"input blockInner\">" + Interface.html["divV7-1"] + "</li></ol>";
				html = html.replace(/-Woning/g, "-Woning" + woningidMachine);
				$(html).appendTo("#addVraagContainer");
				$("#spanV7-1-Woning" + woningidMachine).html(Bijleendata.Woningen[woningidMachine].woningid);
				$("input[name=selV7-1-Woning" + woningidMachine + "]").click(function () {
					canContinue = true;
					var valu = $("input[name=selV7-1-Woning" + woningidMachine + "]:checked").val();
					addAdditionalVariable("6maandenhoofdverblijf", woningidMachine, valu);

				});


				return "";
			} else {

				return additionaleVragen["6maandenhoofdverblijf"][woningidMachine];
			}



			break;
		case "aankoopverplichting":

			if (additionaleVragen["aankoopverplichting"][woningidMachine] == undefined) {
				unblockDiv("#divV6");
				$("#div4checkeindcontrole-Woning").removeClass("titleWonRight");
				$("#div4checkeindcontrole-Woning").addClass("titleWonBottom");
				$("#diveindcontroleContainer").removeClass("hidden");

				var html = "<ol id='olV7-2" + woningidMachine + "'><li class=\"input blockInner\">" + Interface.html["divV7-2"] + "</li></ol>";
				html = html.replace(/-Woning/g, "-Woning" + woningidMachine);
				$(html).appendTo("#addVraagContainer");
				$("#spanV7-2-Woning" + woningidMachine).html(Bijleendata.Woningen[woningidMachine].woningid);

				$("input[name=selV7-2-Woning" + woningidMachine + "]").click(function () {

					canContinue = true;
					var valu = $("input[name=selV7-2-Woning" + woningidMachine + "]:checked").val();

					addAdditionalVariable("aankoopverplichting", woningidMachine, valu);


				});


				return "";
			} else {

				return additionaleVragen["aankoopverplichting"][woningidMachine];
			}

			break;
	}

}

/**
 * 
 * makes the timeline inside the array eventOrder
 * runs the event functions
 * 
 */
function makeTimeLine() {
	for (var i in Bijleen.Woningen) {
		for (var j in Bijleen.Woningen[i]) {
			if ((j == "Aankoop") || (j == "Verkoop") || (j == "Ontbonden") || (j == "Aflossing")) {
				for (var k = 0; k < Bijleen.Woningen[i][j].length; k++) {

					if (Bijleen.Woningen[i][j][k]) {
						if (Bijleen.Woningen[i][j][k].eventdatum != "") {

							if (Bijleen.Woningen[i][j][k].eventdatum != undefined) {

								eventOrder[eventOrder.length] = Bijleen.Woningen[i][j][k];
							}
						}
					}
				}
			} else {
				if (j == "Verbouwing") {
					for (var k = 0; k < Bijleen.Woningen[i][j].length; k++) {
						for (var n = 0; n < Bijleen.Woningen[i][j][k]["verbouwing_EWS"].length; n++) {

							eventOrder[eventOrder.length] = Bijleen.Woningen[i][j][k]["verbouwing_EWS"][n];
						}
						if (Bijleen.Woningen[i][j][k]["verbouwing_EWR"]) {
							eventOrder[eventOrder.length] = Bijleen.Woningen[i][j][k]["verbouwing_EWR"];
						}
					}
				}
			}
		}
	}
	for (var i in Bijleen.EindControle.OntbondenKoop) {
		if (Bijleen.EindControle.OntbondenKoop[i]) {
			if (Bijleen.EindControle.OntbondenKoop[i].boete > 0) {
				eventOrder[eventOrder.length] = Bijleen.EindControle.OntbondenKoop[i];
			}
		}
	}

	eventOrder = eventOrder.sort(func2); //order events per weight (in case 2 events have the same date)
	eventOrder = eventOrder.sort(func); //order the events per eventdatum



	showObjects();

	var data = runEvents();
	return data;
}
/**
 * 
 * executes the event functions according to the timeline
 * Called from makeTimeLine function
 * 
 */
var trackInfo = "";
function runEvents() {

	trackInfo = "";
	for (var h = 0; h < eventOrder.length; h++) {
		if (canContinue == true) {
			eval(eventOrder[h].eventFunction);

		}
	}
	if (canContinue) {
		createObjectFinanKosten();
	}
	var data = "";
	if (canContinue) {
		$("#btnV6Save").removeClass("hidden");
	} else {
		$("#btnV6Save").addClass("hidden");
	}

	if (canContinue) {

		//		$("#divTrackResults").html(trackInfo); //uncomment this to see the tracking records
		$("#divV6Save").removeClass("hidden");
	}

	return data;
}
/**
 * 
 * shows the final EWS and EWR calculated
 * 
 */
function showResults() {

	showObjects();
	$("#divResults").removeClass("hidden");
	$("#opbouwEWR").addClass("hidden");
	$("#innerEWR").empty();

	var ews = 0;
	var ewr = 0;

	var aangiftejaar = Interface.variable["dec31aangifte"];

	for (var i in WoningEigenaar) {

		if ((WoningEigenaar[i].verkoopdatum != "") && (WoningEigenaar[i].verkoopdatum != undefined)) {
			if (WoningEigenaar[i].verkoopdatum.getTime() > aangiftejaar.getTime()) {
				ews += WoningEigenaar[i].EWS;
			}
		} else {
			ews += WoningEigenaar[i].EWS;
		}
	}

	var ewr = 0;
	var inputIds = new Array();
	var htmlewr = "<div><table cellspacing=0 cellpadding='5'><tr><td class='padd'>Eigenwoningreserve</td><td class='padd'>Ontstaan op</td><td class='padd'>Verjaart op</td></tr>";
	var contewr = 0;
	for (var i = 0; i < Persoon[idPersoon].EWR.length; i++) {

		if (dateToString(Persoon[idPersoon].EWR_datum[i]) != "") {

			var vervaltdatum = getVervaltDatum(Persoon[idPersoon].EWR_datum[i]);
			if (vervaltdatum.getTime() > aangiftejaar.getTime()) {
				if (Persoon[idPersoon].EWR[i] != 0) {
					htmlewr += "<tr><td class='padd'>";
					if (Persoon[idPersoon].EWR[i] < 0) {
						htmlewr += "-";
					}
					htmlewr += "<span id='spanBouw" + i + "'>&nbsp;</span><input type='text' readonly='readonly' class='inputResults hidden' value='" + Math.abs(Persoon[idPersoon].EWR[i]) + "' id='input" + i + "'></td><td class='padd'>" + dateToStringAstext(Persoon[idPersoon].EWR_datum[i]) + "</td><td class='padd'>" + dateToStringAstext(getVervaltDatum(Persoon[idPersoon].EWR_datum[i])) + "</td></tr>";
					ewr += Persoon[idPersoon].EWR[i];
					inputIds[inputIds.length] = i;
					contewr++;
				}
			}
		}
	}
	htmlewr += "</table></div>";

	if (ewr < 0) {

		$("#span-EWR").html("-");
	} else {
		$("#span-EWR").html("");
	}
	if (ews < 0) {

		$("#span-EWS").html("-");
	} else {
		$("#span-EWS").html("");
	}
	$("#resultaatEWR").val(Math.abs(ewr));
	$("#resultaatEWR").formatCurrency({ roundToDecimalPlace: 0 });
	var txt1 = $("#span-EWR").html();
	$("#span-EWR").html(txt1 + " &euro; " + $("#resultaatEWR").val());
	$("#resultaatEWS").val(Math.abs(ews));
	$("#resultaatEWS").formatCurrency({ roundToDecimalPlace: 0 });
	var txt2 = $("#span-EWS").html();
	$("#span-EWS").html(txt2 + " &euro; " + $("#resultaatEWS").val());

	if (ewr != 0) {
		if (contewr > 0) {
			$("#opbouwEWR").removeClass("hidden");
			$(htmlewr).appendTo("#innerEWR");
			for (var i = 0; i < inputIds.length; i++) {
				$("#input" + inputIds[i]).formatCurrency({ roundToDecimalPlace: 0 });
				var val = $("#input" + inputIds[i]).val();
				$("#spanBouw" + inputIds[i]).html("&euro; " + val);
			}
		} else {
			$("#opbouwEWR").addClass("hidden");

		}
	}

	var data = new Array();
	data["ews"] = Math.round(ews);
	data["ewr"] = Math.round(ewr);
	return data;

}

/**
 * 
 * orders an event array per eventdatum
 * 
 */
function func(a, b) {
	return a.eventdatum - b.eventdatum;
}
/**
 * 
 * orders an event array per event weight (if two events have the same date)
 * 
 */
function func2(a, b) {
	return a.weight - b.weight;
}
/**
 * 
 * Returns the EWR available (geldig) in a specific date
 * @param idP = idPersoon
 * @param datum = date
 * 
 */
function proc_ewr(idP, datum, consumptie_toekomst) {

	var tempEWR = new Array();
	var tempDate = new Array();
	var vervaltDatum = "";
	var ewrTotal = 0;
	if (Persoon[idP].EWR.length > 0) {

		for (var i = 0; i < Persoon[idP].EWR.length; i++) {

			if (dateToString(Persoon[idP].EWR_datum[i]) != "") {

				var condition;
				if (consumptie_toekomst == "ja") {
					condition = true;
				} else {
					if (Persoon[idP].EWR_datum[i].getTime() <= datum.getTime()) {
						condition = true;
					} else {
						condition = false;
					}
				}
				if (condition) {

					vervaltDatum = getVervaltDatum(Persoon[idP].EWR_datum[i]);

					if (vervaltDatum.getTime() > datum.getTime()) {
						ewrTotal += Persoon[idP].EWR[i];
					}
				}

			}
		}
	}

	trackInfo += "EWR Info after <b>proc_ewr</b>:<br>";
	loadTrackInfoEWR();
	return ewrTotal;
}
/**
 * 
 * Returns the vervaltdatum of a specific date
 * Checks vervaltdatum and Overgangsregeling
 * @param datum = date to be checked
 * 
 */
function getVervaltDatum(datum) {

	var vervaltDatum = checkOvergangsregeling(datum);

	if (vervaltDatum == "") {
		vervaltDatum = checkVervaltDatum(datum);
	}
	return vervaltDatum;


}
/**
 * 
 * Returns the vervaltdatum of a specific date
 * 
 */
function checkVervaltDatum(datum2Valid8) {

	var jan12010 = Interface.variable["jan12010"];
	var dec312009 = Interface.variable["dec312009"];

	var fiveJaar = new Date((datum2Valid8.getFullYear() + 5), datum2Valid8.getMonth(), datum2Valid8.getDate());
	var drieJaar = new Date((datum2Valid8.getFullYear() + 3), datum2Valid8.getMonth(), datum2Valid8.getDate());

	if (datum2Valid8.getTime() < jan12010.getTime()) {
		return fiveJaar;
	} else {
		if (datum2Valid8.getTime() > jan12010.getTime()) {
			return drieJaar;
		}
	}
}
/**
 * 
 * Returns the vervaltdatum of a specific date if it fails into overgangsregeling. If not, returns empty ""
 * 
 */
function checkOvergangsregeling(datum2Valid8) {

	var drieJaar = new Date((datum2Valid8.getFullYear() + 3), datum2Valid8.getMonth(), datum2Valid8.getDate());
	var jan12010 = Interface.variable["jan12010"];
	var fiveJaar = new Date((datum2Valid8.getFullYear() + 5), datum2Valid8.getMonth(), datum2Valid8.getDate());
	var vervaltDatum = "";
	if (fiveJaar > jan12010) {

		if (drieJaar < jan12010) {
			vervaltDatum = jan12010;
		} else {
			vervaltDatum = drieJaar;
		}
	}

	return vervaltDatum;
}
function loadTrackInfoEWR() {

	if (Persoon["eigenaar1"].EWR.length == 0) {
		trackInfo += "Persoon EWR = empty<br>";
	} else {
		for (var i = 0; i < Persoon["eigenaar1"].EWR.length; i++) {
			trackInfo += "EWR[" + i + "]=" + Persoon["eigenaar1"].EWR[i] + "," + Persoon["eigenaar1"].EWR_datum[i] + "<br>";

		}
	}

	for (var j in WoningEigenaar) {
		if (WoningEigenaar[j].copie_EWR.length == 0) {
			trackInfo += "Woningeigenaar[" + j + "] copy EWR = empty<br><br>";
		} else {
			for (var i = 0; i < WoningEigenaar[j].copie_EWR.length; i++) {
				trackInfo += "Woningeigenaar Copy EWR[" + j + "][" + i + "]=" + WoningEigenaar[j].copie_EWR[i] + "," + WoningEigenaar[j].copie_EWR_datum[i] + "<br><br>";

			}
		}
	}

}
/**
 * 
 * Consumes a value from a valid existing EWR
 * @param idP = idPersoon
 * @param bedrag = amount to be consumed
 * @param datum = date
 * @param negatief = true or false
 * 
 */
function proc_ewr_consumptie(idP, bedrag, datum, negatief, consumptie_toekomst) {



	var tempEWR = new Array();
	var tempDate = new Array();

	for (i = 0; i < Persoon[idP].EWR.length; i++) {
		tempEWR[tempEWR.length] = Persoon[idP].EWR[i];
		tempDate[tempDate.length] = Persoon[idP].EWR_datum[i];
	}

	var vervaltDatum = "";
	var ewrTotal = 0;
	bedrag = parseInt(bedrag);

	if (tempEWR.length > 0) {
		var finished = false;
		for (var i = 0; i <= tempEWR.length; i++) {

			if (i == tempEWR.length) {
				if (negatief) {

					tempEWR[tempEWR.length - 1] = 0 - bedrag;


				} else {
					break;
				}
			} else {

				if (dateToString(tempDate[i]) != "") {

					vervaltDatum = getVervaltDatum(tempDate[i]);

					if (vervaltDatum.getTime() >= datum.getTime()) {
						var condition;
						if (consumptie_toekomst == "nee") {
							if (tempDate[i].getTime() <= datum.getTime()) {
								condition = true;

							} else {
								condition = false;
							}

						} else {
							condition = true;
						}


						if (condition) {

							var val = parseInt(tempEWR[i]);

							var subs = val - bedrag;

							if (val > 0) {
								if (subs >= 0) {


									tempEWR[i] = subs;


									bedrag -= subs;
									break;
								} else {
									tempEWR[i] = 0;

									bedrag = Math.abs(subs);
								}

							}
						}
					}
				}
			}

		}


	} else {

		if (negatief) {
			tempEWR[0] = 0 - bedrag;
			tempDate[0] = datum;

		}
	}

	Persoon[idP].EWR = tempEWR;
	Persoon[idP].EWR_datum = tempDate;
	trackInfo += "EWR Info after <b>proc_ewr_consumptie</b>:<br>";

	loadTrackInfoEWR();
	showObjects();
}
/**
 * 
 * Creates an EWR if it doesn't exists, or replaces it with a new value in the EWR and EWR_datum objects
 * @param idP=idPersoon
 * @param ewr = amount to be created
 * @param datum = date
 * 
 */
function proc_ewr_toename(idP, ewr, datum) {

	var gevonden = 0;
	for (var i = 0; i < Persoon[idP].EWR.length; i++) {
		if (Persoon[idP].EWR_datum[i].getTime() == datum.getTime()) {
			Persoon[idP].EWR[i] = ewr;
			gevonden = 1;

		}

	}
	if (gevonden == 0) {
		var idx = Persoon[idP].EWR.length;

		Persoon[idP].EWR[idx] = ewr;
		Persoon[idP].EWR_datum[idx] = datum;


	}
	trackInfo += "EWR Info after <b>proc_ewr_toename</b>:<br>";

	loadTrackInfoEWR();
}
/**
 * 
 * Creates an EWR if it doesn't exists, or replaces it with a new value in de copie_EWR and copie_EWR_datum objects
 * @param idP=idPersoon
 * @param ewr = amount to be created
 * @param datum = date of the EWR
 * 
 */
function proc_ewr_toename_copy(idP, ewr, datum, woningIdMachine) {


	var gevonden = 0;
	for (var i = 0; i < WoningEigenaar[woningIdMachine].copie_EWR.length; i++) {
		if (WoningEigenaar[woningIdMachine].copie_EWR_datum[i].getTime() == datum.getTime()) {
			WoningEigenaar[woningIdMachine].copie_EWR[i] = ewr;
			gevonden = 1;

		}

	}
	if (gevonden == 0) {
		var idx = WoningEigenaar[woningIdMachine].copie_EWR.length;

		WoningEigenaar[woningIdMachine].copie_EWR[idx] = ewr;
		WoningEigenaar[woningIdMachine].copie_EWR_datum[idx] = datum;

	}

	trackInfo += "EWR Info after <b>proc_ewr_toename_copy</b>:<br>";
	loadTrackInfoEWR();

}

/**
 * 
 * Aankoop event function
 * 
 */
function eventAankoopWoning(woningIdMachine) {
	trackInfo += "starts <b>AANKOOP woning " + woningIdMachine + "</b><br><br>";
	var goedkoper_woning_regeling = "nee";
	var gevonden = "nee";
	var EWR_afname, tot_aankoop_bedrag, aankoopkosten, EWR_bedrag, EWS_oude_woning, EWS_nieuwe_woning;
	var lening_finankosten_nieuwe_woning;
	var huisverkoop_toekomst_gevonden = "nee";
	var huisverkoop_verleden_gevonden = "nee";
	var Consumpie_toekomst = "nee";

	var obj = Bijleen.Woningen[woningIdMachine];
	var woningExists = Woning[woningIdMachine];

	if (!woningExists) {
		Woning[woningIdMachine] = {};
		Woning[woningIdMachine].ID = obj.Aankoop[0].woningid;

		WoningEigenaar[woningIdMachine] = {};
		WoningEigenaar[woningIdMachine].persoonID = idPersoon;
		WoningEigenaar[woningIdMachine].woningID = obj.Aankoop[0].woningid;
		WoningEigenaar[woningIdMachine].woningidMachine = obj.Aankoop[0].woningidMachine;
		WoningEigenaar[woningIdMachine].aankoopdatum = obj.Aankoop[0].eventdatum;
		WoningEigenaar[woningIdMachine].EWS = Math.min(obj.Aankoop[0].lening, obj.Aankoop[0].aankoopprijs);
		WoningEigenaar[woningIdMachine].verkoopdatum = "";
		WoningEigenaar[woningIdMachine].lening = obj.Aankoop[0].lening;
		WoningEigenaar[woningIdMachine].schenking = obj.Aankoop[0].schenking;
		//WoningEigenaar[woningIdMachine].lening_financiering     = obj.Aankoop[0].lening_financiering;
		var bezit_2004 = "nee";
		if ((obj.Aankoop[0].eventdatum.getTime() < Interface.variable["jan12004"].getTime())) {
			if (obj.Verkoop) {
				if (obj.Verkoop[0].eventdatum.getTime() >= Interface.variable["jan12004"].getTime()) {
					bezit_2004 = "ja";
				}
			} else {
				bezit_2004 = "ja";
			}
		}
		WoningEigenaar[woningIdMachine].bezit_1jan2004 = bezit_2004;

		WoningEigenaar[woningIdMachine].copie_EWR = Persoon[idPersoon].EWR;
		WoningEigenaar[woningIdMachine].copie_EWR_datum = Persoon[idPersoon].EWR_datum;



	} else {


		Persoon[idPersoon].EWR = WoningEigenaar[woningIdMachine].copie_EWR;
		Persoon[idPersoon].EWR_datum = WoningEigenaar[woningIdMachine].copie_EWR_datum;


		Consumpie_toekomst = "ja";

	}

	var overdrachtbelasting = obj.Aankoop[0].overdrachtsbelasting;
	var makelaarkosten = obj.Aankoop[0].makelaarskosten;
	var notariskosten = obj.Aankoop[0].notariskosten;
	var verbouwingkosten = obj.Aankoop[0].verbouwingkosten;

	aankoopkosten = overdrachtbelasting + makelaarkosten + notariskosten + verbouwingkosten;

	var aankoopdatum = WoningEigenaar[woningIdMachine].aankoopdatum;

	WoningEigenaar[woningIdMachine].eerstewoning = obj.Aankoop[0].eerstewoning;
	var tot_aankoop_bedrag = obj.Aankoop[0].aankoopprijs + aankoopkosten;

	EWR_bedrag = proc_ewr(WoningEigenaar[woningIdMachine].persoonID, WoningEigenaar[woningIdMachine].aankoopdatum, Consumpie_toekomst); ///param ID persoon and aankoopdatum
	var EWS_zonder_finankosten = tot_aankoop_bedrag - EWR_bedrag;
	lening_finankosten_nieuwe_woning = 0;

	var lening_finankosten_aftrekbaar = 0;

	lening_finankosten_aftrekbaar = (obj.Aankoop[0].lening_financiering / (obj.Aankoop[0].lening - obj.Aankoop[0].lening_financiering)) * EWS_zonder_finankosten;
	lening_finankosten_aftrekbaar = isNaN(lening_finankosten_aftrekbaar) ? 0 : lening_finankosten_aftrekbaar;
	lening_finankosten_aftrekbaar = Math.min(lening_finankosten_aftrekbaar, obj.Aankoop[0].lening_financiering);

	var jan12010 = Interface.variable["jan12010"];

	if (WoningEigenaar[woningIdMachine].aankoopdatum.getTime() >= jan12010.getTime()) {
		//lening_finankosten_nieuwe_woning = (obj.Aankoop[0].lening_financiering/(obj.Aankoop[0].lening-obj.Aankoop[0].lening_financiering))*EWS_zonder_finankosten; 
		//lening_finankosten_nieuwe_woning = Math.min(lening_finankosten_nieuwe_woning, obj.Aankoop[0].lening_financiering);
		lening_finankosten_nieuwe_woning = lening_finankosten_aftrekbaar;
	} else {
		if (WoningEigenaar[woningIdMachine].eerstewoning == "ja") {
			//lening_finankosten_nieuwe_woning = (obj.Aankoop[0].lening_financiering/(obj.Aankoop[0].lening-obj.Aankoop[0].lening_financiering))*EWS_zonder_finankosten;
			//lening_finankosten_nieuwe_woning = Math.min(lening_finankosten_nieuwe_woning, obj.Aankoop[0].lening_financiering);
			lening_finankosten_nieuwe_woning = lening_finankosten_aftrekbaar;
		}
	}
	WoningEigenaar[woningIdMachine].lening_financiering = lening_finankosten_aftrekbaar;

	WoningEigenaar[woningIdMachine].aankoopprijs = tot_aankoop_bedrag;

	WoningEigenaar[woningIdMachine].goedkoper_wonen_regeling = "nee";


	var aankoopdatum_nieuwe_huis = WoningEigenaar[woningIdMachine].aankoopdatum;
	var EWR_afname = "";

	var koppeling_woningid = "";
	var arrPossibleKoppelingIds = new Array();
	for (var i in Bijleen.Woningen) {
		if (i != woningIdMachine) {
			if (Bijleen.Woningen[i].Verkoop.length > 0) {

				if ((Bijleen.Woningen[i].Verkoop[0].verkoopdatum.getTime() > WoningEigenaar[woningIdMachine].aankoopdatum.getTime()) && (Bijleendata.Woningen[i].woning_aankoopdatum.getTime() < WoningEigenaar[woningIdMachine].aankoopdatum.getTime())) {
					arrPossibleKoppelingIds[arrPossibleKoppelingIds.length] = new Array(i, Bijleen.Woningen[i].Verkoop[0].eventdatum);

					//koppeling_woningid=i;
				}
			}
		}


	}
	if (arrPossibleKoppelingIds.length > 0) {

		var dat = arrPossibleKoppelingIds[0];
		for (var t = 0; t < arrPossibleKoppelingIds.length; t++) {
			if (arrPossibleKoppelingIds[t][1].getTime() < dat[1].getTime()) {
				dat = arrPossibleKoppelingIds[t];
			}
		}

		koppeling_woningid = dat[0];

	}

	if (koppeling_woningid != "") {
		huisverkoop_toekomst_gevonden = "ja";


	} else {
		var arrPossibleKoppelingIds = new Array();
		for (var i in Bijleen.Woningen) {

			if (i != woningIdMachine) {
				if (Bijleen.Woningen[i].Verkoop.length > 0) {
					if (Bijleen.Woningen[i].Verkoop[0].eventdatum != "") {
						if (Bijleen.Woningen[i].Verkoop[0].eventdatum.getTime() < Bijleen.Woningen[woningIdMachine].Aankoop[0].eventdatum.getTime()) {
							arrPossibleKoppelingIds[arrPossibleKoppelingIds.length] = new Array(i, Bijleen.Woningen[i].Verkoop[0].eventdatum);

						}

					}
				}
			}

		}
		if (arrPossibleKoppelingIds.length > 0) {
			huisverkoop_verleden_gevonden = "ja";
			var dat = arrPossibleKoppelingIds[0];
			for (var t = 0; t < arrPossibleKoppelingIds.length; t++) {
				if (arrPossibleKoppelingIds[t][1].getTime() >= dat[1].getTime()) {
					dat = arrPossibleKoppelingIds[t];
				}
			}

			koppeling_woningid = dat[0];

		}

	}

	if (koppeling_woningid == "") {
		EWS_oude_woning = 0;
	} else {

		EWS_oude_woning = WoningEigenaar[koppeling_woningid].EWS;
	}

	EWS_nieuwe_woning = tot_aankoop_bedrag + lening_finankosten_nieuwe_woning - EWR_bedrag;

	var SMaandenHoofdVerblijf = "";
	var goedkoper_wonen_regeling = "nee";
	var aankoop_verplichting = "";

	if ((EWS_nieuwe_woning < EWS_oude_woning) && (huisverkoop_verleden_gevonden == "ja")) {

		if (aankoopdatum_nieuwe_huis.getTime() < jan12010.getTime()) {

			if (WoningEigenaar[koppeling_woningid].verkoopdatum != "") {

				var aankoop36 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 36, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());
				var aankoop6 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 6, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());


				if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop36) {

					SMaandenHoofdVerblijf = "ja";
				} else {

					if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop6) {
						SMaandenHoofdVerblijf = proc_uitvraag("6maandenhoofdverblijf", koppeling_woningid);

						if (SMaandenHoofdVerblijf == "") {
							canContinue = false;
							return false;
						}
					} else {
						SMaandenHoofdVerblijf = "nee";
					}
				}

				if (SMaandenHoofdVerblijf == "ja") {
					goedkoper_wonen_regeling = "ja";
				} else {
					goedkoper_wonen_regeling = "nee";
				}
			}

		} else {
			var wonGevonden = 0;
			if (WoningEigenaar[koppeling_woningid].verkoopdatum != "") {
				if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() < Interface.variable["jan12010"].getTime()) {
					for (var l in WoningEigenaar) {
						if (l != woningIdMachine) {
							if (WoningEigenaar[koppeling_woningid].aankoopdatum.getTime() <= aankoopdatum_nieuwe_huis.getTime()) {
								if (WoningEigenaar[koppeling_woningid].verkoopdatum == "") {
									wonGevonden = 1;
								} else {
									if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoopdatum_nieuwe_huis.getTime()) {
										wonGevonden = 1;
									}
								}
							}
						}
					}

					if (wonGevonden == 0) {

						aankoop_verplichting = proc_uitvraag("aankoopverplichting", woningIdMachine);

						if (aankoop_verplichting == "") {
							canContinue = false;
							return false;
						}
						if (aankoop_verplichting == "ja") {
							goedkoper_wonen_regeling = "ja";
						} else {
							goedkoper_wonen_regeling = "nee";
						}
					}
				}
			}
		}
	} else {

		if ((huisverkoop_toekomst_gevonden == "ja") && (EWS_nieuwe_woning < EWS_oude_woning) && (aankoopdatum_nieuwe_huis.getTime() < jan12010.getTime())) {
			if (WoningEigenaar[koppeling_woningid].verkoopdatum != "") {
				if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() < jan12010.getTime()) {
					//if(WoningEigenaar[koppeling_woningid].verkoopdatum!=""){
					var aankoop36 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 36, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());
					var aankoop6 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 6, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());


					if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop36) {

						SMaandenHoofdVerblijf = "ja";
					} else {

						if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop6) {

							SMaandenHoofdVerblijf = proc_uitvraag("6maandenhoofdverblijf", koppeling_woningid);

							if (SMaandenHoofdVerblijf == "") {
								canContinue = false;
								return false;
							}
						} else {
							SMaandenHoofdVerblijf = "nee";
						}
					}

					if (SMaandenHoofdVerblijf == "ja") {
						goedkoper_wonen_regeling = "ja";
					} else {
						goedkoper_wonen_regeling = "nee";
					}
					//}
				} else {
					var oct12009 = Interface.variable["oct12009"];
					if (aankoopdatum_nieuwe_huis.getTime() < oct12009.getTime()) {
						//if(WoningEigenaar[koppeling_woningid].verkoopdatum!=""){
						var aankoop36 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 36, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());
						var aankoop6 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 6, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());


						if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop36) {

							SMaandenHoofdVerblijf = "ja";
						} else {

							if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop6) {

								SMaandenHoofdVerblijf = proc_uitvraag("6maandenhoofdverblijf", koppeling_woningid);

								if (SMaandenHoofdVerblijf == "") {
									canContinue = false;
									return false;
								}
							} else {
								SMaandenHoofdVerblijf = "nee";
							}
						}
						if (SMaandenHoofdVerblijf == "ja") {
							goedkoper_wonen_regeling = "ja";
						} else {
							goedkoper_wonen_regeling = "nee";
						}
						//}
					} else {

						aankoop_verplichting = proc_uitvraag("aankoopverplichting", woningIdMachine);

						if (aankoop_verplichting == "") {
							canContinue = false;
							return false;
						}
						if (aankoop_verplichting == "ja") {
							//if(WoningEigenaar[koppeling_woningid].verkoopdatum!=""){
							var aankoop36 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 36, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());
							var aankoop6 = new Date(WoningEigenaar[koppeling_woningid].aankoopdatum.getFullYear(), WoningEigenaar[koppeling_woningid].aankoopdatum.getMonth() + 6, WoningEigenaar[koppeling_woningid].aankoopdatum.getDate());


							if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop36) {

								SMaandenHoofdVerblijf = "ja";
							} else {

								if (WoningEigenaar[koppeling_woningid].verkoopdatum.getTime() >= aankoop6) {

									SMaandenHoofdVerblijf = proc_uitvraag("6maandenhoofdverblijf", koppeling_woningid);

									if (SMaandenHoofdVerblijf == "") {
										canContinue = false;
										return false;
									}
								} else {
									SMaandenHoofdVerblijf = "nee";
								}
							}


							if (SMaandenHoofdVerblijf == "ja") {
								goedkoper_wonen_regeling = "ja";
							} else {
								goedkoper_wonen_regeling = "nee";
							}
							//}
						}
					}
				}
			}
		}
	}

	if (canContinue) {
		if (goedkoper_wonen_regeling == "nee") {

			var sum1 = WoningEigenaar[woningIdMachine].aankoopprijs - EWR_bedrag + lening_finankosten_nieuwe_woning - Bijleen.Woningen[woningIdMachine].Aankoop[0].schenking;
			var lening1 = Bijleen.Woningen[woningIdMachine].Aankoop[0].lening;
			WoningEigenaar[woningIdMachine].EWS = Math.min(lening1, sum1);
			if (WoningEigenaar[woningIdMachine].EWS < 0) {
				WoningEigenaar[woningIdMachine].EWS = 0;
			}
			trackInfo += "EWS Woning " + woningIdMachine + " after aankoop NOT goedkoper = " + WoningEigenaar[woningIdMachine].EWS + "<br><br>";
		} else {

			var sum1 = WoningEigenaar[woningIdMachine].aankoopprijs + lening_finankosten_nieuwe_woning;
			var val = Math.min(sum1, EWS_oude_woning, WoningEigenaar[woningIdMachine].lening);

			WoningEigenaar[woningIdMachine].EWS = val;
			if (WoningEigenaar[woningIdMachine].EWS < 0) {
				WoningEigenaar[woningIdMachine].EWS = 0;
			}
			trackInfo += "EWS Woning " + woningIdMachine + " after aankoop GOEDKOPER= " + WoningEigenaar[woningIdMachine].EWS + "<br><br>";
		}

		EWR_afname = WoningEigenaar[woningIdMachine].aankoopprijs + lening_finankosten_nieuwe_woning - WoningEigenaar[woningIdMachine].EWS;

		proc_ewr_consumptie(WoningEigenaar[woningIdMachine].persoonID, EWR_afname, WoningEigenaar[woningIdMachine].aankoopdatum, false, Consumpie_toekomst);

	}
	trackInfo += "ends AANKOOP woning " + woningIdMachine + "<br><br>";
	showObjects();

}

/**
 * 
 * Verkoop event function
 * 
 */
function eventVerkoopWoning(woningIdMachine) {

	trackInfo += "starts <b>VERKOOP woning " + woningIdMachine + "</b><br><br>";
	var EWR_toename;
	var verkoopdatum;
	var bijleen_geldig;
	var EWS_woning;

	if (Bijleen.Woningen[woningIdMachine].Verkoop[0].vervreemding_jn == "ja") {
		Bijleen.Woningen[woningIdMachine].Verkoop[0].verkoopprijs = Bijleen.Woningen[woningIdMachine].Verkoop[0].vervreemdingsprijs;

	}

	WoningEigenaar[woningIdMachine].verkoopdatum = Bijleen.Woningen[woningIdMachine].Verkoop[0].eventdatum;
	WoningEigenaar[woningIdMachine].verkoopprijs = Bijleen.Woningen[woningIdMachine].Verkoop[0].verkoopprijs;
	WoningEigenaar[woningIdMachine].verkoopkosten = Bijleen.Woningen[woningIdMachine].Verkoop[0].verkoopkosten + Bijleen.Woningen[woningIdMachine].Verkoop[0].antispeculatiekosten;
	verkoopdatum = WoningEigenaar[woningIdMachine].verkoopdatum;
	EWS_woning = WoningEigenaar[woningIdMachine].EWS;

	bijleen_geldig = "ja";

	if (WoningEigenaar[woningIdMachine].bezit_1jan2004 == "ja") {
		var gevonden = 0;

		for (var i in WoningEigenaar) {
			if ((i != woningIdMachine)) {
				if (WoningEigenaar[i].verkoopdatum == "") {
					if (WoningEigenaar[i].bezit_1jan2004 == "ja") {
						gevonden = 1;
					}
				}
			}
		}

		if (gevonden == 1) {
			bijleen_geldig = "nee";
		}

	}

	if (bijleen_geldig == "ja") {
		for (var i in Bijleen.Woningen) {
			if (i != woningIdMachine) {
				if (Bijleen.Woningen[i].Aankoop[0].verplicht_1jan2004 == "ja") {
					bijleen_geldig = "nee";
				}

			}
		}
	}


	if (bijleen_geldig == "ja") {
		if (Bijleen.Woningen[woningIdMachine].Verkoop[0].verplicht_1jan2004 == "ja") {
			bijleen_geldig = "nee";
		}

	}
	var koppeling_id = "";

	if (bijleen_geldig == "ja") {
		EWR_toename = Bijleen.Woningen[woningIdMachine].Verkoop[0].verkoopprijs - Bijleen.Woningen[woningIdMachine].Verkoop[0].verkoopkosten - Bijleen.Woningen[woningIdMachine].Verkoop[0].antispeculatiekosten - EWS_woning;

		proc_ewr_toename(WoningEigenaar[woningIdMachine].persoonID, EWR_toename, Bijleen.Woningen[woningIdMachine].Verkoop[0].verkoopdatum);

		var gevonden = 0;
		var arrPossibleKoppelingIds = new Array();
		for (var i in WoningEigenaar) {
			if (i != woningIdMachine) {
				var aankoopTime = -100000000;
				var verkoopTime = -100000000;

				if (WoningEigenaar[i].aankoopdatum != "") aankoopTime = WoningEigenaar[i].aankoopdatum.getTime();
				if (WoningEigenaar[i].verkoopdatum != "") verkoopTime = WoningEigenaar[i].verkoopdatum.getTime();
				if (verkoopdatum != "") {
					if ((aankoopTime < verkoopdatum.getTime()) || (WoningEigenaar[i].aankoopdatum == "")) {
						if ((verkoopTime > verkoopdatum.getTime()) || (WoningEigenaar[i].verkoopdatum == "")) {
							if (aankoopTime >= Interface.variable["jan12004"].getTime()) {
								gevonden = 1;
								arrPossibleKoppelingIds[arrPossibleKoppelingIds.length] = new Array(i, WoningEigenaar[i].aankoopdatum);
								//koppeling_id=i;									
							}
						}
					}
				}
			}
		}
		if (arrPossibleKoppelingIds.length > 0) {

			var dat = arrPossibleKoppelingIds[0];
			for (var t = 0; t < arrPossibleKoppelingIds.length; t++) {
				if (arrPossibleKoppelingIds[t][1].getTime() >= dat[1].getTime()) {
					dat = arrPossibleKoppelingIds[t];
				}
			}

			koppeling_id = dat[0];

		}


		if (gevonden == 1) {

			proc_ewr_toename_copy(WoningEigenaar[woningIdMachine].persoonID, EWR_toename, Bijleen.Woningen[woningIdMachine].Verkoop[0].eventdatum, koppeling_id);
			//alert("WoningEigenaar["+woningIdMachine+"].copie_EWR="+WoningEigenaar[woningIdMachine].copie_EWR)
			var datumAankoop = WoningEigenaar[koppeling_id].aankoopdatum;

			for (var i = 0; i < eventOrder.length; i++) {
				if ((eventOrder[i].woningidMachine == koppeling_id) || (eventOrder[i].woningidMachine == "")) {

					if ((eventOrder[i].eventdatum.getTime() >= datumAankoop.getTime() && eventOrder[i].eventdatum.getTime() < verkoopdatum.getTime()) && (eventOrder[i].eventFunction.substring(0, 12) != "eventVerkoop") && (eventOrder[i].eventFunction.substring(0, 14) != "eventOntbonden")) {

						eval(eventOrder[i].eventFunction);
					}
				}

			}


		}

	}

	trackInfo += "ends VERKOOP woning " + woningIdMachine + "<br><br>";

	showObjects();
}
/**
 * 
 * Aflossing event function
 * 
 */
function eventAflossingWoning(woningIdMachine, idx) {
	trackInfo += "starts <b>AFLOSSING woning " + woningIdMachine + "</b><br><br>";
	WoningEigenaar[woningIdMachine].EWS = Math.max(0, (WoningEigenaar[woningIdMachine].EWS - Bijleen.Woningen[woningIdMachine].Aflossing[idx].bedrag));
	proc_ewr_consumptie(WoningEigenaar[woningIdMachine].persoonID, Bijleen.Woningen[woningIdMachine].Aflossing[idx].bedrag, Bijleen.Woningen[woningIdMachine].Aflossing[idx].eventdatum, false, "nee");
	trackInfo += "ends AFLOSSING woning " + woningIdMachine + "<br><br>";
	showObjects();
}
/**
 * 
 * Ontbonden event function
 * 
 */
function eventOntbondenKoop(idx) {
	trackInfo += "starts <b>ONTBONDEN KOOP " + idx + "</b><br><br>";
	proc_ewr_consumptie(idPersoon, Bijleen.EindControle.OntbondenKoop[idx].boete, Bijleen.EindControle.OntbondenKoop[idx].eventdatum, true, "nee");
	trackInfo += "ends ONTBONDEN KOOP " + idx + "<br><br>";
	showObjects();
}

/**
 * 
 * Verbouwing EWS event function
 * 
 */
function eventVerbouwingEWSWoning(woningIdMachine, idx, idx2) {
	trackInfo += "starts <b>VERBOUWING EWS woning " + woningIdMachine + "</b><br><br>";
	if (WoningEigenaar[woningIdMachine]) {

		var lening_finankosten_verbouwing = 0;
		if (WoningEigenaar[woningIdMachine].aankoopdatum.getTime() >= Interface.variable["jan12010"].getTime()) {
			lening_finankosten_verbouwing = Bijleen.Woningen[woningIdMachine].Verbouwing[idx].verbouwing_EWS[idx2].lening_financiering;
		} else {
			if (WoningEigenaar[woningIdMachine].eerstewoning == "ja") {
				lening_finankosten_verbouwing = Bijleen.Woningen[woningIdMachine].Verbouwing[idx].verbouwing_EWS[idx2].lening_financiering;

			}


		}
		var procEWR = proc_ewr(idPersoon, Bijleen.Woningen[woningIdMachine].Verbouwing[idx].verbouwing_EWS[idx2].eventdatum, "nee");
		var subs = Bijleen.Woningen[woningIdMachine].Verbouwing[idx].verbouwing_EWS[idx2].box1_bedrag - procEWR + lening_finankosten_verbouwing;
		var EWS_toename = Math.max(0, subs);

		WoningEigenaar[woningIdMachine].lening = WoningEigenaar[woningIdMachine].lening + Bijleen.Woningen[woningIdMachine].Verbouwing[idx].verbouwing_EWS[idx2].leningbedrag;
		WoningEigenaar[woningIdMachine].EWS = Math.min((WoningEigenaar[woningIdMachine].EWS + EWS_toename), WoningEigenaar[woningIdMachine].lening);
		WoningEigenaar[woningIdMachine].lening_financiering += Bijleen.Woningen[woningIdMachine].Verbouwing[idx].verbouwing_EWS[idx2].lening_financiering;
		trackInfo += "ends VERBOUWING EWS woning " + woningIdMachine + "<br><br>";
	}
	showObjects();
}
/**
 * 
 * Verbouwing EWR event function
 * 
 */
function eventVerbouwingEWRWoning(woningIdMachine, idx) {
	trackInfo += "starts <b>VERBOUWING EWR woning " + woningIdMachine + "</b><br><br>";
	var EWR_afname = Bijleen.Woningen[woningIdMachine].Verbouwing[idx].verbouwing_EWR.box1_bedrag;
	proc_ewr_consumptie(idPersoon, EWR_afname, Bijleen.Woningen[woningIdMachine].Verbouwing[idx].eventdatum, false, "nee");
	trackInfo += "ends VERBOUWING EWR woning " + woningIdMachine + "<br><br>";
	showObjects();
}