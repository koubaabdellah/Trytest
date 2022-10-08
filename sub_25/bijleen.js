var Bijleen = Bijleen || {};
Bijleen.Woningen = new Array(); //array that contains all the objects woning
/**
 * 
 * Creates the object Bijleen for an specific woning id
 * Initialize de aankoop, verkoop, aflossing and ontbonden events of the Woning
 * 
 */
Bijleen.init = function(woningidMachine){

	//var woningidMachine = woningidHuman.replace(/ /g,"_"); //replace spaces with _
	Bijleen.Woningen[woningidMachine] = {};
	Bijleen.Woningen[woningidMachine].woningidMachine = woningidMachine;
	Bijleen.initAankoop(woningidMachine);
	Bijleen.initVerkoop(woningidMachine);
	Bijleen.initAflossing(woningidMachine);
	Bijleen.initVerbouwing(woningidMachine);
	

};
/**
 * 
 * Initialize the aankoop object of a specific woning id
 * 
 */
Bijleen.initAankoop = function(woningidMachine){	
	Bijleen.Woningen[woningidMachine].Aankoop = new Array();
	var obj={};
	obj.woningid = "";
	obj.woningidMachine = "";
	obj.eventFunction = "eventAankoopWoning('"+woningidMachine + "')";
	obj.eventdatum = "";
	obj.verplicht_1jan2004 = "";
	obj.aankoopprijs = "";
	obj.eerstewoning = "";
	obj.overdrachtsbelasting = "";
	obj.makelaarskosten = "";
	obj.notariskosten = "";
	obj.huis_verbouwd = "";
	obj.verbouwingkosten = "";
	obj.lening = "";
	obj.finan_kosten_geleend = "";
	obj.lening_financiering="";
	obj.schenking_gekregen = "";
	obj.schenking="";
	Bijleen.Woningen[woningidMachine].Aankoop[0] = obj;
};
/**
 * 
 * Initialize the verkoop object of a specific woning id
 * 
 */
Bijleen.initVerkoop = function(woningidMachine){
	Bijleen.Woningen[woningidMachine].Verkoop = new Array();
};
/**
 * 
 * Initialize the aflossing object of a specific woning id
 * 
 */
Bijleen.initAflossing = function(woningidMachine){
	Bijleen.Woningen[woningidMachine].Aflossing = new Array();
};
/**
 * 
 * Initialize the verbouwing object of a specific woning id
 * 
 */
Bijleen.initVerbouwing = function(woningidMachine){
	Bijleen.Woningen[woningidMachine].Verbouwing = new Array();	

};
/**
 * 
 * Adds an aankoop event to a woning
 * @param woningidHuman = woning id
 * @param extraId = extra id of the fields (workflow id + event id)
 * @param idx = idx of the event (for aankoop and verkoop is always 0)
 * 
 */
Bijleen.addAankoop = function(woningidMachine, woningidHuman, extraId, idx){
	//var woningidMachine = woningidHuman.replace(/ /g,"_"); //replace spaces with _
	var obj;

	var eventdatum = stringToDate(getInfoAankoop("eventdatum", woningidMachine, extraId));
	var jan12004 = Interface.variable["jan12004"];
	Bijleendata.Woningen[woningidMachine].woning_aankoopdatum = eventdatum;
	$("#date-Woning"+Bijleendata.Woningen[woningidMachine].idEvent).val(dateToString(eventdatum));
	if(eventdatum.getTime()>=jan12004.getTime()){
		obj ={};
		obj.woningid = woningidHuman;
		obj.woningidMachine = woningidMachine;
		obj.eventdatum = eventdatum;
		obj.eventFunction = "eventAankoopWoning('"+woningidMachine + "')";
		obj.verplicht_1jan2004 = getInfoAankoop("verplicht_1jan2004", woningidMachine, extraId, idx);
		obj.aankoopprijs = currencyToNumber(getInfoAankoop("aankoopprijs", woningidMachine, extraId, idx));
		obj.eerstewoning = getInfoAankoop("eerstewoning", woningidMachine, extraId, idx);
		obj.overdrachtsbelasting = currencyToNumber(getInfoAankoop("overdrachtsbelasting", woningidMachine, extraId, idx));
		obj.makelaarskosten = currencyToNumber(getInfoAankoop("makelaarskosten", woningidMachine, extraId, idx));
		obj.notariskosten = currencyToNumber(getInfoAankoop("notariskosten", woningidMachine, extraId, idx));
		obj.huis_verbouwd = getInfoAankoop("huis_verbouwd", woningidMachine, extraId, idx);
		obj.verbouwingkosten = currencyToNumber(getInfoAankoop("verbouwingkosten", woningidMachine, extraId, idx));
		obj.lening = currencyToNumber(getInfoAankoop("lening", woningidMachine, extraId, idx));
		obj.finan_kosten_geleend = getInfoAankoop("finan_kosten_geleend", woningidMachine, extraId, idx);
		obj.lening_financiering = currencyToNumber(getInfoAankoop("lening_financiering", woningidMachine, extraId, idx));
		obj.schenking_gekregen = getInfoAankoop("schenking_gekregen", woningidMachine, extraId, idx);
		obj.schenking = currencyToNumber(getInfoAankoop("schenking", woningidMachine, extraId, idx));
		obj.weight = 40;
		Bijleen.Woningen[woningidMachine].Aankoop[idx]=obj;
	
	} else {
		addInitiatie(woningidMachine, woningidHuman, extraId);
		
	}

	
	showObjects();
	
	return woningidMachine;

};
/**
 * 
 * Handles eindcontrole events / create objects if necessary
 * 
 */
Bijleen.addEindControle = function(){
	var obj = {};
	obj.tekoopenleeg_jn = getInfoEindControle("tekoopenleeg_jn");
	if(obj.tekoopenleeg_jn=="ja"){
		
		obj.woningleegid = getInfoEindControle("woningleegid");
		var woningidMachine = obj.woningleegid;
		obj.woningleegname = Bijleendata.Woningen[woningidMachine].woningid;
		//var woningidMachine = obj.woningleegid.replace(/ /g,"_"); //replace spaces with _
		obj.geenhoofdverblijfdatum = stringToDate(getInfoEindControle("geenhoofdverblijfdatum"));
		var inTwoOrThreeYears = obj.geenhoofdverblijfdatum.getFullYear()+Interface.variable["leegstandtermijn"];
		var vervreemdingsdatum = stringToDate("31/12/"+inTwoOrThreeYears);
		var nextday = vervreemdingsdatum.getDate()+1;
		vervreemdingsdatum.setDate(nextday);
		
		if(vervreemdingsdatum.getTime()<=Interface.variable["dec31aangifte"].getTime()){
		
			obj.vervreemding_jn="ja";
			obj.eventdatum =vervreemdingsdatum;
			obj.vervreemdingsprijs = currencyToNumber(getInfoEindControle("vervreemdingsprijs")); 
			
			var idx=0;
			Bijleen.Woningen[woningidMachine].Verkoop[idx]={};
			Bijleen.Woningen[woningidMachine].Verkoop[idx].vervreemding_jn="ja";
			Bijleen.Woningen[woningidMachine].Verkoop[idx].eventdatum = vervreemdingsdatum;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].woningidMachine=woningidMachine;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].vervreemdingsprijs = obj.vervreemdingsprijs;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].eventFunction = "eventVerkoopWoning('"+woningidMachine + "')";
			Bijleen.Woningen[woningidMachine].Verkoop[idx].woningid=obj.woningleegid;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].verplicht_1jan2004="nee";
			Bijleen.Woningen[woningidMachine].Verkoop[idx].verkoopdatum =vervreemdingsdatum;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].verkoopkosten = 0;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].antispeculatiebeding_jn="nee";
			Bijleen.Woningen[woningidMachine].Verkoop[idx].antispeculatiekosten=0;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].leegstaan_jn="ja";
			Bijleen.Woningen[woningidMachine].Verkoop[idx].weight=10;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].geenhoofdverblijfdatum=obj.geenhoofdverblijfdatum;
			Bijleen.Woningen[woningidMachine].Verkoop[idx].verkoopprijs = obj.vervreemdingsprijs;

			additionaleVragen["6maandenhoofdverblijf"][woningidMachine]="ja";
			additionaleVragen["aankoopverplichting"][woningidMachine]="ja";
			additionaleVragen["finankosten"][woningidMachine]=0;
		} else {
			obj.vervreemding_jn="nee";
		}
	}
	Bijleen.EindControle.data=obj;

	for(var i=0; i<idsOntbonden.length; i++){
		var val1=$("#txtV4-1-Ontbonden"+idsOntbonden[i]).val();
		var val2=$("#txtV4-2-Ontbonden"+idsOntbonden[i]).val();
		
		var goodval1 = validateBedrag("#txtV4-1-Ontbonden"+idsOntbonden[i]);
		if(!goodval1) val1=0;
		var goodval2 = stringToDate(val2);
		if((goodval2=="")||(goodval2=="Invalid Date")){
			val2="";
		}
		
		Bijleen.addOntbondenKoop(idsOntbonden[i], val1, val2); 
	}

	showObjects();
};
/**
 * 
 * Adds an ontbonden koop event
 * @param idx = idx of the ontbonden koop
 * @param bedrag = boete bedrag
 * @param datum = date
 * 
 */
Bijleen.addOntbondenKoop = function(idx, bedrag, datum){
	idx="num"+idx;
	Bijleen.EindControle.OntbondenKoop[idx] = {};
	
	Bijleen.EindControle.OntbondenKoop[idx].boete = currencyToNumber(bedrag);
	Bijleen.EindControle.OntbondenKoop[idx].eventdatum = stringToDate(datum);
	Bijleen.EindControle.OntbondenKoop[idx].eventFunction = "eventOntbondenKoop('"+idx+"')";
	Bijleen.EindControle.OntbondenKoop[idx].weight = 20;
	Bijleen.EindControle.OntbondenKoop[idx].woningidMachine="";
};
/**
 * 
 * Initialize the eindcontrole object
 * 
 */

Bijleen.initEindControle = function(){
	Bijleen.EindControle={};
	Bijleen.EindControle.OntbondenKoop = new Array();
	Bijleen.EindControle.data = {};
};
/**
 * 
 * Adds verkoop event
 * 
 */

Bijleen.addVerkoop = function(woningidMachine, woningidHuman, extraId, idx){
	//var woningidMachine = woningidHuman.replace(/ /g,"_"); //replace spaces with _
	var obj ={};
	obj.woningid=woningidHuman;
	obj.woningidMachine = woningidMachine;
	obj.eventFunction = "eventVerkoopWoning('"+woningidMachine + "')";
	obj.verkoopdatum = stringToDate(getInfoVerkoop("verkoopdatum", woningidMachine, extraId, idx));
	obj.verplicht_1jan2004 = getInfoVerkoop("verplicht_1jan2004", woningidMachine, extraId, idx);
	obj.verkoopprijs = currencyToNumber(getInfoVerkoop("verkoopprijs", woningidMachine, extraId, idx));
	obj.verkoopkosten = currencyToNumber(getInfoVerkoop("verkoopkosten", woningidMachine, extraId, idx));
	obj.antispeculatiebeding_jn = getInfoVerkoop("antispeculatiebeding_jn", woningidMachine, extraId, idx);
	obj.antispeculatiekosten = currencyToNumber(getInfoVerkoop("antispeculatiekosten", woningidMachine, extraId, idx));
	obj.leegstaan_jn = getInfoVerkoop("leegstaan_jn", woningidMachine, extraId, idx);
	obj.geenhoofdverblijfdatum = stringToDate(getInfoVerkoop("geenhoofdverblijfdatum", woningidMachine, extraId, idx));

	obj.vervreemding_jn="nee";
	obj.eventdatum =obj.verkoopdatum;
	
	var verkoopDateString = getInfoVerkoop("verkoopdatum", woningidMachine, extraId, idx);
	
	if(obj.leegstaan_jn=="ja"){
		var inTwoOrThreeYears = obj.geenhoofdverblijfdatum.getFullYear()+ Interface.leegstandtermijnVerkoop(verkoopDateString) ;
		var vervreemdingsdatum = stringToDate("31/12/"+inTwoOrThreeYears);
		var nextday = vervreemdingsdatum.getDate()+1;
		vervreemdingsdatum.setDate(nextday);
		
		if(vervreemdingsdatum.getTime()<=obj.verkoopdatum.getTime()){
			obj.vervreemding_jn="ja";
			obj.verplicht_1jan2004="nee";
			obj.eventdatum =vervreemdingsdatum;
			obj.verkoopdatum =vervreemdingsdatum;
			obj.verkoopkosten = 0;
			obj.antispeculatiebeding_jn="nee";
			obj.antispeculatiekosten=0;
			
		}
		
	}
	obj.vervreemdingsprijs = currencyToNumber(getInfoVerkoop("vervreemdingsprijs", woningidMachine, extraId, idx));
	obj.weight = 10;
	Bijleen.Woningen[woningidMachine].Verkoop[idx]=obj;

};

/**
 * 
 * Adds aflossing event
 * 
 */
Bijleen.addAflossing = function(woningidMachine, woningidHuman, extraId, idx){
	//var woningidMachine = woningidHuman.replace(/ /g,"_"); //replace spaces with _
	var obj={};
	obj.woningid=woningidHuman;
	obj.woningidMachine = woningidMachine;
	obj.bedrag=currencyToNumber(getInfoAflossing("bedrag", woningidMachine, extraId, idx));
	obj.eventdatum = stringToDate(getInfoAflossing("eventdatum", woningidMachine, extraId, idx));
	obj.eventFunction = "eventAflossingWoning('"+woningidMachine + "',"+idx+")";
	obj.weight = 50;
	Bijleen.Woningen[woningidMachine].Aflossing[idx] = obj;
	
};

/**
 * 
 * Adds a verbouwing event
 * 
 */

Bijleen.addVerbouwing = function(woningidMachine, woningidHuman, extraId, idx){

	//var woningidMachine = woningidHuman.replace(/ /g,"_"); //replace spaces with _

	var obj = {};
	obj.woningid=woningidHuman;
	obj.woningidMachine = woningidMachine;
	obj.startdatum = stringToDate(getInfoVerbouwing("startdatum", woningidMachine,  extraId, idx));
	obj.eventdatum = obj.startdatum;
	obj.bedrag = currencyToNumber(getInfoVerbouwing("bedrag", woningidMachine, extraId, idx));
	obj.geldgeleend_jn=getInfoVerbouwing("geldgeleend_jn", woningidMachine,  extraId, idx);
	obj.leningdatum = stringToDate(getInfoVerbouwing("leningdatum", woningidMachine,  extraId, idx));
	obj.leningbedrag = currencyToNumber(getInfoVerbouwing("leningbedrag", woningidMachine,  extraId, idx));
	obj.bouwdepot_jn = getInfoVerbouwing("bouwdepot_jn", woningidMachine,  extraId, idx);
	obj.betaald_jn = getInfoVerbouwing("betaald_jn", woningidMachine,  extraId, idx);
	obj.verbouwing_betaalde_bedrag = currencyToNumber(getInfoVerbouwing("verbouwing_betaalde_bedrag", woningidMachine,  extraId, idx));
	obj.verbouwing_betaaldatum = stringToDate(getInfoVerbouwing("verbouwing_betaaldatum", woningidMachine,  extraId, idx));
	obj.verbouwing_finan_kosten_geleend = getInfoVerbouwing("verbouwing_finan_kosten_geleend", woningidMachine, extraId, idx);
	
	obj.verbouwing_lening_financiering = currencyToNumber(getInfoVerbouwing("verbouwing_lening_financiering", woningidMachine, extraId, idx));
	
	obj.verbouwing_EWR = {};
	obj.verbouwing_EWR.eventdatum=obj.startdatum;
	obj.verbouwing_EWR.woningid=obj.woningid;
	obj.verbouwing_EWR.box1_bedrag=obj.bedrag;
	obj.verbouwing_EWR.eventFunction = "eventVerbouwingEWRWoning('"+woningidMachine + "',"+idx+")";
	obj.verbouwing_EWR.weight = 30;
	obj.verbouwing_EWS = new Array();
	
	if(obj.geldgeleend_jn=="ja"){
		var periode, binnen_6_24_jn;
		if(obj.bouwdepot_jn=="ja"){
			periode = 24;
		}
		else
		{
			periode = 6;
		}
		var aangifteJaar = Interface.variable["dec31aangifte"];
		
		
		var subs = aangifteJaar.getTime() - obj.leningdatum.getTime();
		
		
		subs = subs / (1000 * 60 * 60 * 24 * 30);  //convert from miliseconds to months
		subs = Math.floor(subs);
		
		binnen_6_24_jn = subs<=periode ? "ja" : "nee";
		
		var verbouwing_lening_zonder_finan = obj.leningbedrag - obj.verbouwing_lening_financiering;
		var verbouwing_aftrekbaar_bedrag = Math.min(verbouwing_lening_zonder_finan, obj.bedrag);
		var betaling_restant, financiering_restant;
		
		
		if((obj.geldgeleend_jn=="ja")&&(obj.betaald_jn=="ja")){
			var idx1 = obj.verbouwing_EWS.length;
			obj.verbouwing_EWS[idx1] = {};
			obj.verbouwing_EWS[idx1].eventdatum = obj.verbouwing_betaaldatum;
			obj.verbouwing_EWS[idx1].woningid = obj.woningid;
			obj.verbouwing_EWS[idx1].box1_bedrag = obj.verbouwing_betaalde_bedrag;
			obj.verbouwing_EWS[idx1].eventFunction = "eventVerbouwingEWSWoning('"+woningidMachine + "',"+idx+","+idx1+")";
			obj.verbouwing_EWS[idx1].weight = 30;
			obj.verbouwing_EWS[idx1].lening_financiering = (obj.verbouwing_betaalde_bedrag/verbouwing_lening_zonder_finan)*obj.verbouwing_lening_financiering;
			betaling_restant = verbouwing_aftrekbaar_bedrag - obj.verbouwing_betaalde_bedrag;
			financiering_restant = (betaling_restant / verbouwing_lening_zonder_finan)*obj.verbouwing_lening_financiering;
	
			
			if((obj.verbouwing_betaalde_bedrag<verbouwing_aftrekbaar_bedrag)&&(binnen_6_24_jn=="ja")){
				obj.verbouwing_EWS[idx1].leningbedrag = 0;
				if(obj.verbouwing_betaaldatum!=""){
					if(obj.verbouwing_betaaldatum.getTime()<=obj.leningdatum.getTime()){
						obj.verbouwing_EWS[idx1].leningbedrag = obj.leningbedrag;
					} 
				}
			
			} else {
				obj.verbouwing_EWS[idx1].leningbedrag=obj.leningbedrag;
			}
			
			
			if((obj.verbouwing_betaalde_bedrag<verbouwing_aftrekbaar_bedrag)&&(binnen_6_24_jn=="ja")){
				var idx2 = obj.verbouwing_EWS.length;
				obj.verbouwing_EWS[idx2] = {};
				obj.verbouwing_EWS[idx2].eventdatum = obj.leningdatum;
				obj.verbouwing_EWS[idx2].woningid = obj.woningid;
				var box1 =betaling_restant;
				obj.verbouwing_EWS[idx2].box1_bedrag = box1;
				obj.verbouwing_EWS[idx2].lening_financiering = financiering_restant;
				obj.verbouwing_EWS[idx2].eventFunction = "eventVerbouwingEWSWoning('"+woningidMachine + "',"+idx+","+idx2+")";
				obj.verbouwing_EWS[idx2].weight = 30;
				obj.verbouwing_EWS[idx2].leningbedrag=0;
				
				if(obj.verbouwing_betaaldatum!=""){
					if(obj.verbouwing_betaaldatum.getTime()>obj.leningdatum.getTime()){
						obj.verbouwing_EWS[idx2].leningbedrag=obj.leningbedrag;
					} 
				}
			}
		}
		else
		{
			if((obj.geldgeleend_jn=="ja")&&(binnen_6_24_jn=="ja")){
				var idx1 = obj.verbouwing_EWS.length;
				obj.verbouwing_EWS[idx1] = {};
				obj.verbouwing_EWS[idx1].eventdatum = obj.leningdatum;
				obj.verbouwing_EWS[idx1].woningid = obj.woningid;
				obj.verbouwing_EWS[idx1].box1_bedrag = verbouwing_aftrekbaar_bedrag;
				obj.verbouwing_EWS[idx1].leningbedrag = obj.leningbedrag;
				obj.verbouwing_EWS[idx1].lening_financiering = (obj.verbouwing_EWS[idx1].box1_bedrag/verbouwing_lening_zonder_finan)*obj.verbouwing_lening_financiering;
				obj.verbouwing_EWS[idx1].eventFunction = "eventVerbouwingEWSWoning('"+woningidMachine + "',"+idx+","+idx1+")";
				obj.verbouwing_EWS[idx1].weight = 30;
				
				
			}
		}
	}	
	Bijleen.Woningen[woningidMachine].Verbouwing[idx] = obj;

};
/**
 * 
 * Removes a woning from the Bijleen object
 * 
 */

Bijleen.removeData = function(woningidMachine){
	var temp = new Array();
	for(var i in Bijleen.Woningen){
		if(Bijleen.Woningen[i].woningidMachine!=woningidMachine){
			temp[Bijleen.Woningen[i].woningidMachine]= Bijleen.Woningen[i];
		}
	}
	Bijleen.Woningen = temp;

};
/**
 * 
 * Removes an event from a woning in the Bijleen object
 * 
 */

Bijleen.removeEvent = function(idWoning, eventt, idxEvent){
	var obj = eval("Bijleen.Woningen['"+idWoning+"']."+eventt+"["+idxEvent+"]");
	try{
		eval("Bijleen.Woningen['"+idWoning+"']."+eventt+"=deleteIndexFromArray(Bijleen.Woningen['"+idWoning+"']."+eventt+","+idxEvent+")");
	} catch(err){
	}
	showObjects();
};