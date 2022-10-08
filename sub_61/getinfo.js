/**
 * Returns the value of the corresponding form field
 * 
 * @param func = name of the variable (question) that will be returned
 * @param woningId
 * @param extraId
 * @returns the answer of the corresponding question
 */
var getInfoAankoop = function(func, woningId, extraId){

	var eventdatum = function(){ return  $("#txtV1-1b-Woning"+woningId+extraId).val(); };
	var verplicht_1jan2004 = function() { return $("input[name=radV1-1c-Woning"+woningId+extraId+"]:checked").val(); };
	var aankoopprijs = function() { return $("#txtV1-1d-Woning"+woningId+extraId).val(); };
	var eerstewoning = function() { return $("input[name=radV1-1f-Woning"+woningId+extraId+"]:checked").val(); };
	var overdrachtsbelasting = function() { return $("#txtV1-2-Woning"+woningId+extraId).val(); };
	var makelaarskosten = function() { return $("#txtV1-3-Woning"+woningId+extraId).val(); };
	var notariskosten = function() { return $("#txtV1-4-Woning"+woningId+extraId).val(); };
	var huis_verbouwd = function() { return $("input[name=radV1-5-Woning"+woningId+extraId+"]:checked").val(); };
	var verbouwingkosten = function() { return $("#txtV1-6-Woning"+woningId+extraId).val(); };
	var lening = function() { return $("#txtV1-7-Woning"+woningId+extraId).val(); };
	var finan_kosten_geleend = function() {  return $("input[name=radV1-8-Woning"+woningId+extraId+"]:checked").val(); };
	var lening_financiering = function(){ return $("#txtV1-9-Woning"+woningId+extraId).val(); };
	var schenking_gekregen = function(){return $("input[name=radV1-11-Woning"+woningId+extraId+"]:checked").val();};
	var schenking = function() { return $("#txtV1-12-Woning"+woningId+extraId).val(); };
	
	var defaulteventdatum = function(){ return  ""; };
	var defaultverplicht_1jan2004 = function() { return "nee"; };
	var defaultaankoopprijs = function() { return 0; };
	var defaulteerstewoning = function() { return "nee"; };
	var defaultoverdrachtsbelasting = function() { return 0; };
	var defaultmakelaarskosten = function() { return 0; };
	var defaultnotariskosten = function() { return 0; };
	var defaulthuis_verbouwd = function() { return "nee"; };
	var defaultverbouwingkosten = function() { return 0; };
	var defaultlening = function() { return 0; };
	var defaultfinan_kosten_geleend = function() {  return "nee"; };
	var defaultlening_financiering = function(){ return 0; };
	var defaultschenking_gekregen = function(){return "nee";};
	var defaultschenking = function() { return 0; };
	
	eval("var val = "+func+"()");

	if(val==undefined) {
		eval("val = default"+func+"()");
	}
	return val;
	
	
	
};

var getInfoVerkoop = function(func, woningId, extraId){
	var verkoopdatum = function() { return $("#txtV2-1a-Woning"+woningId+extraId).val();};
	var verplicht_1jan2004 = function() { return $("input[name=radV2-1c-Woning"+woningId+extraId+"]:checked").val();};
	var verkoopprijs = function() { return $("#txtV2-2-Woning"+woningId+extraId).val();};
	var verkoopkosten = function(){ return $("#txtV2-3a-Woning"+woningId+extraId).val();};
	var antispeculatiebeding_jn = function() { return $("input[name=radV2-3b-Woning"+woningId+extraId+"]:checked").val(); };
	var antispeculatiekosten = function() { return $("#txtV2-3c-Woning"+woningId + extraId).val(); };
	var leegstaan_jn = function() { return $("input[name=radV2-4-Woning"+woningId+extraId+"]:checked").val();};
	var geenhoofdverblijfdatum = function() { return $("#txtV2-5-Woning"+woningId+extraId).val();};
	var vervreemdingsprijs = function() { return $("#txtV2-7-Woning"+woningId+extraId).val();};
	
	var defaultverkoopdatum = function() { return "";};
	var defaultverplicht_1jan2004 = function() { return "nee";};
	var defaultverkoopprijs = function() { return 0;};
	var defaultverkoopkosten = function(){ return 0;};
	var defaultantispeculatiebeding_jn = function() { return "nee"; };
	var defaultantispeculatiekosten = function() { return 0; };
	var defaultleegstaan_jn = function() { return "nee";};
	var defaultgeenhoofdverblijfdatum = function() { return "";};
	var defaultvervreemdingsprijs = function() { return 0;};
	
	eval("var val = "+func+"()");

	if(val==undefined) {
		eval("val = default"+func+"()");
	}
	
	return val;
	
	
};
var getInfoAflossing = function(func, woningId, extraId){
	
	var bedrag = function() { return $("#txtV3-1b-Woning"+woningId+extraId).val();};
	var eventdatum = function() { return $("#txtV3-2-Woning"+woningId+extraId).val();};
	
	var defaultbedrag = function() { return 0;};
	var defaulteventdatum = function() { return "";};
	
	eval("var val = "+func+"()");

	if(val==undefined) {
		eval("val = default"+func+"()");
	}
	
	return val;
	
	
};
var getInfoVerbouwing = function(func, woningId, extraId){

	var startdatum = function() { return $("#txtV5-2-Woning"+woningId+extraId).val();};
	var bedrag = function() { return $("#txtV5-3-Woning"+woningId+extraId).val();};
	var geldgeleend_jn = function() { return $("input[name=radV5-4-Woning"+woningId+extraId+"]:checked").val();};
	var leningdatum = function() { return $("#txtV5-5-Woning"+woningId+extraId).val();};
	var leningbedrag = function() { return $("#txtV5-6-Woning"+woningId+extraId).val();};
	var bouwdepot_jn = function() { return $("input[name=radV5-7-Woning"+woningId+extraId+"]:checked").val();};
	var betaald_jn = function() { return $("input[name=radV5-8-Woning"+woningId+extraId+"]:checked").val();};
	var verbouwing_betaalde_bedrag = function() { return $("#txtV5-9-Woning"+woningId+extraId).val();};
	var verbouwing_betaaldatum = function() { return $("#txtV5-10-Woning"+woningId+extraId).val();};
	var verbouwing_finan_kosten_geleend = function() { return $("input[name=radV5-11-Woning"+woningId+extraId+"]:checked").val();};
	var verbouwing_lening_financiering = function() { return $("#txtV5-12-Woning"+woningId+extraId).val();};
	
	
	
	var defaultstartdatum = function() {return "";};
	var defaultbedrag = function() { return 0;};
	var defaultgeldgeleend_jn = function() { return "nee";};
	var defaultleningdatum = function() { return "";};
	var defaultleningbedrag = function() { return 0;};
	var defaultbouwdepot_jn = function() { return "nee";};
	var defaultbetaald_jn = function() { return "nee";};
	var defaultverbouwing_betaalde_bedrag = function() { return 0;};
	var defaultverbouwing_betaaldatum = function() { return "";};
	var defaultverbouwing_finan_kosten_geleend = function() { return "nee"; };
	var defaultverbouwing_lening_financiering = function() {return 0; };
	
	
	eval("var val = "+func+"()");
	if(val==undefined) {
		eval("val = default"+func+"()");
	}

	return val;
	
	
};
var getInfoInitiatie = function(func, woningId, extraId){
	
	var lening = function() {return $("#txtV0-5-Woning"+woningId+extraId).val();};
	var eventdatum = function(){ return  Bijleendata.Woningen[woningId].woning_aankoopdatum; };
	var aankoopprijs = function() { return $("#txtV0-5-Woning"+woningId+extraId).val(); };
	
	var defaulteventdatum = function(){ return  ""; };
	var defaultaankoopprijs = function() { return 0; };
	var defaultlening = function() { return 0; };
	
	eval("var val = "+func+"()");

	if(val==undefined) {
		eval("val = default"+func+"()");
	}
	
	return val;
	
};
var getInfoEindControle = function(func){
	var tekoopenleeg_jn = function() { return $("input[name=radV6-1]:checked").val();};
	var woningleegid = function() { return $("#selV6-2").val(); };
	var geenhoofdverblijfdatum = function() { return $("#txtV6-3").val(); };
	var vervreemdingsprijs = function() { return $("#txtV6-5").val(); };
	
	var defaulttekoopenleeg_jn = function() { return "nee";};
	var defaultwoningleegid = function() { return ""; };
	var defaultgeenhoofdverblijfdatum = function() {return ""; };
	var defaultvervreemdingsprijs = function() { return 0; };
	
	eval("var val = "+func+"()");

	if(val==undefined) {
		eval("val = default"+func+"()");
	}
	return val;
	
};