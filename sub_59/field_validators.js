var Workflow = Workflow || {};
var Bijleen = Bijleen || {};
var Bijleendata = Bijleendata || {};

/**
 * Validates the corresponding objects (input)
 *
 * @param op = validation id ei: valV1-1a
 * @param idWoning = id of the current woning
 * @param idxEvent = id of the current event in the mainWorkflow
 * 
 * @return true or false 
 * 
 *
 */
Workflow.Validations = function(op, idWoning, extraId){

	var good=true;
		
	switch(op){
	case "valVPanel3":
		var id="#txtVPanel3-Woning"+idWoning+extraId;
		good=validateBedrag(id);
		
		break;
	case "valV0-5":
		//Bedrag geleend
		good=validateBedrag("#txtV0-5-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV0-5-error-Woning"+idWoning+extraId);
		break;
		
	case "valV1-1a":
		/*var text = $("#txtV1-1a").val();
		text = trim(text);

		if(text=="") good=false;
		
		if(good){
			good= Bijleen.Woningen[text] ? false : true; //if the woning already exists
			show_hide_error(good, "#divV1-1a-error-Woning"+idWoning);
				
		}
		
		break;*/
	
	case "valV1-1b":
		//check 1: aankoopdate can't be > 31 dec aangifteyear and can't be < 1 jan 2004
		
		var date = stringToDate($("#txtV1-1b-Woning"+idWoning+extraId).val());
		if((date=="")||(date=="Invalid Date")) good=false;
		
		var aangifteJaar = Interface.variable["dec31aangifte"];
		var jan1 = Interface.variable["jan12004"];
		if(good){
			if(date.getTime()>aangifteJaar.getTime()) good=false;
			show_hide_error(good, "#divV1-1b2-error-1-Woning"+idWoning+extraId);
		}		
		if(good){
			//check verkoopdatum
			var verkoopdatum = Bijleendata.Woningen[idWoning].woning_verkoopdatum;
			if(verkoopdatum!=""){
				if(date.getTime()>verkoopdatum.getTime()){
					good=false;
				}
			}
			show_hide_error(good, "#divV1-1b2-error-2-Woning"+idWoning+extraId);
			
		}
		
		if(good){
			//check 2: only 2 woningen at the same time
			good=Interface.check3HousesAtTheSameTime();
			show_hide_error(good, "#divV1-1b2-error-3-Woning"+idWoning+extraId);
		}

		break;
	case "valV1-1d":
		//Aankoopprijs Bedrag, geen decimalen
		good=validateBedrag("#txtV1-1d-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-1d-error-1-Woning"+idWoning+extraId);
		break;
	
	case "valV1-2":
		//Overdrachtsbelasting Bedrag, geen decimalen
		good=validateBedrag("#txtV1-2-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-2-error-2-Woning"+idWoning+extraId);
		//Kan niet hoger zijn dat 6% of 2% van het aankoopbedrag
		if(good){
		
			var aankoopprijs=$("#txtV1-1d-Woning"+idWoning+extraId).val();
			aankoopprijs=aankoopprijs.replace(/[.]/g,"");
			var aankoopdatum = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			
			if(aankoopdatum.getTime()<=Interface.variable["dec312011"].getTime()){
				aankooppercent = aankoopprijs*0.06;
			}
			else if(aankoopdatum.getTime()>Interface.variable["dec312011"].getTime()){
				aankooppercent = aankoopprijs*0.02;
			}
			
			var overdracht = $("#txtV1-2-Woning"+idWoning+extraId).val();
			overdracht = (overdracht.replace(/[.]/g,""))*1;
			if(overdracht>aankooppercent) {
				good=false;
			} else {
				good=true;
			}
			show_hide_error(good, "#divV1-2-error-Woning"+idWoning+extraId);
			good=true;
		}
		break;

	case "valV1-3":
		//Makelaarskosten Bedrag, geen decimalen
		good=validateBedrag("#txtV1-3-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-3-error-2-Woning"+idWoning+extraId);
		if(good){
			var aankoop=$("#txtV1-1d-Woning"+idWoning+extraId).val();
			aankoop=aankoop.replace(/[.]/g,"");
			aankoop2percent = aankoop*0.02;
			
			var makelaar = $("#txtV1-3-Woning"+idWoning+extraId).val();
			makelaar = (makelaar.replace(/[.]/g,""))*1;
			
			if(makelaar>aankoop2percent) {
				good=false;
			} else {
				good=true;
			}
			show_hide_error(good, "#divV1-3-error-Woning"+idWoning+extraId);
			good=true;
		}
		break;
		
	case "valV1-4":
		//Notaris Bedrag, geen decimalen
		
		good=validateBedrag("#txtV1-4-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-4-error-2-Woning"+idWoning+extraId);
		if(good){
			var aankoop=$("#txtV1-1d-Woning"+idWoning+extraId).val();
			aankoop=aankoop.replace(/[.]/g,"");
			aankoop1percent = aankoop*0.01;
			
			var notaris = $("#txtV1-4-Woning"+idWoning+extraId).val();
			notaris = (notaris.replace(/[.]/g,""))*1;
			
			if(notaris>aankoop1percent) {
				good=false;
			} else {
				good=true;
			}
			show_hide_error(good, "#divV1-4-error-Woning"+idWoning+extraId);
			good=true;
		}
		break;
		
	case "valV1-6":
		//Verbouwing Bedrag, geen decimalen
		good=validateBedrag("#txtV1-6-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-6-error-Woning"+idWoning+extraId);
		break;
	
	case "valV1-7":
		//Geleend Bedrag, geen decimalen
		good=validateBedrag("#txtV1-7-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-7-error-Woning"+idWoning+extraId);
		
		if (good) {
			var aankoopprijs = $("#txtV1-1d-Woning"+idWoning+extraId).val();
			aankoopprijs = aankoopprijs.replace(/[.]/g,"");
			aankoopprijs = aankoopprijs*1;
			
			var makelaar = $("#txtV1-3-Woning"+idWoning+extraId).val();
			makelaar = makelaar.replace(/[.]/g,"");
			makelaar = makelaar*1;

			var notaris = $("#txtV1-4-Woning"+idWoning+extraId).val();
			notaris = notaris.replace(/[.]/g,"");
			notaris = notaris*1;

			var overdracht = $("#txtV1-2-Woning"+idWoning+extraId).val();
			overdracht = overdracht.replace(/[.]/g,"");
			overdracht = overdracht*1;
			
			var verbouwing = $("#txtV1-6-Woning"+idWoning+extraId).val();
			verbouwing = verbouwing.replace(/[.]/g,"");
			verbouwing = verbouwing*1;

			var lening_financiering = $("#txtV1-9-Woning"+idWoning+extraId).val();
			lening_financiering = lening_financiering.replace(/[.]/g,"");
			lening_financiering = lening_financiering*1;

			var aankooplening = $("#txtV1-7-Woning"+idWoning+extraId).val();
			aankooplening = aankooplening.replace(/[.]/g,"");
			aankooplening = aankooplening*1;
			
			var v_max_aankoop_lening = aankoopprijs + makelaar + notaris + overdracht + verbouwing + lening_financiering;

			if ( aankooplening > v_max_aankoop_lening ) {
				good=false;
			} else {
				good=true;
			}
			show_hide_error(good, "#divV1-7-error-2-Woning"+idWoning+extraId);
			good=true;
		}
		
		break;
		
	case "valV1-9":
		//Financieringskosten geleende, geen decimalen
		good=validateBedrag("#txtV1-9-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-9-error-Woning"+idWoning+extraId);
		
		break;
	
	case "valV1-12":
		//Schenking bedrag, geen decimalen
		good=validateBedrag("#txtV1-12-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV1-12-error-2-Woning"+idWoning+extraId);
		if(good){
			var val = $("#txtV1-12-Woning"+idWoning+extraId).val();
			val = currencyToNumber(val);
			
			var aankoop = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			
			if((aankoop.getTime()>Interface.variable["dec312009"].getTime())&&(aankoop.getTime()<Interface.variable["jan12011"].getTime())){
				if(val>50000){
					good=false;
				} else {
					good=true;
				}
				show_hide_error(good, "#divV1-12-error-Woning"+idWoning+extraId);
			} 
			else if((aankoop.getTime()>Interface.variable["dec312010"].getTime())&&(aankoop.getTime()<Interface.variable["jan12013"].getTime())){
				if(val>50300){
					good=false;
				} else {
					good=true;
				}
				show_hide_error(good, "#divV1-12-error-3-Woning"+idWoning+extraId);
			}
			else if((aankoop.getTime()>Interface.variable["dec312012"].getTime())&&(aankoop.getTime()<Interface.variable["okt12013"].getTime())){
				if(val>51407){
					good=false;
				} else {
					good=true;
				}
				show_hide_error(good, "#divV1-12-error-4-Woning"+idWoning+extraId);
			}
			else if((aankoop.getTime()>=Interface.variable["jan012015"].getTime())&&(aankoop.getTime()<=Interface.variable["dec312015"].getTime())){
				if(val>51407){
					good=false;
				} else {
					good=true;
				}
				show_hide_error(good, "#divV1-12-error-5-Woning"+idWoning+extraId);
			}
			else if((aankoop.getTime()>=Interface.variable["jan012016"].getTime())&&(aankoop.getTime()<=Interface.variable["dec312016"].getTime())){
				if(val>51407){
					good=false;
				} else {
					good=true;
				}
				show_hide_error(good, "#divV1-12-error-6-Woning"+idWoning+extraId);
			}      
		}
		
		
		break;
	
	case "valV2-1a":
			
			//check 1: date can't be > 31 dec aangiftejaar or < 1 jan 2004
			var date = stringToDate($("#txtV2-1a-Woning"+idWoning+extraId).val());
			var aangifteJaar = Interface.variable["dec31aangifte"];
			var jan1 = Interface.variable["jan12004"];
			
			if((date.getTime()>aangifteJaar.getTime())||(date.getTime()<jan1.getTime())) good=false;
			
			show_hide_error(good, "#divV2-1a-error-1-Woning"+idWoning+extraId);
			
			if(good){
				//Check 2: date can't be < aankoopdate
				var aankoopdatum=Bijleendata.Woningen[idWoning].woning_aankoopdatum;
				if(date.getTime()<aankoopdatum.getTime()) good=false;
				
				show_hide_error(good, "#divV2-1a-error-2-Woning"+idWoning+extraId);
				
				
			}
		
			break;
	case "valV2-2":
		//verkoopbedrag, geen decimalen
		good=validateBedrag("#txtV2-2-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV2-2-error-Woning"+idWoning+extraId);
		break;
	
	case "valV2-3a":
		//verkoopbedrag, geen decimalen
		
		
		good=validateBedrag("#txtV2-3a-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV2-3a-error-2-Woning"+idWoning+extraId);
		if(good){
			var verkoop = $("#txtV2-2-Woning"+idWoning+extraId).val();
			verkoop = (verkoop.replace(/[.]/g, ""))*1;
			
			var kosten = $("#txtV2-3a-Woning"+idWoning+extraId).val();
			kosten = (kosten.replace(/[.]/g, ""))*1;
			
			if(kosten>verkoop) good=false;
			
			show_hide_error(good, "#divV2-3a-error-Woning"+idWoning+extraId);
			
		}
		break;
	case "valV2-3c":
		//antispeculatie bedrag, geen decimalen
		good=validateBedrag("#txtV2-3c-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV2-3c-error-Woning"+idWoning+extraId);
		break;
	
	case "valV2-5":
		//Check 1 : date not > 31 dec aangiftejaar en not < 1 jan 2004
		
		
		var date = stringToDate($("#txtV2-5-Woning"+idWoning+extraId).val());
		if((date=="")||(date=="Invalid Year")||(date=="Invalid Date")){
			good=false;
		}
		show_hide_error(good, "#divV2-5-error-4-Woning"+idWoning+extraId);
		
		if(good){
			var aangifteJaar = Interface.variable["dec31aangifte"];
			var jan1 = Interface.variable["jan12004"];
			
			if((date.getTime()>aangifteJaar.getTime())||(date.getTime()<jan1.getTime())) good=false;
			
			show_hide_error(good, "#divV2-5-error-1-Woning"+idWoning+extraId);
		}		
		if(good){
			var aankoop=Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			if(date.getTime()<aankoop.getTime()) good=false;
			show_hide_error(good, "#divV2-5-error-2-Woning"+idWoning+extraId);
		}
		if(good){
			var verkoop=Bijleendata.Woningen[idWoning].woning_verkoopdatum;
			if(verkoop==""){
				
			} else {
				if(date.getTime()>verkoop.getTime()) good=false;
				show_hide_error(good, "#divV2-5-error-3-Woning"+idWoning+extraId);
				
			}
		}
		break;
	case "valV2-7":
		//marktwaarde bedrag, geen decimalen
		good=validateBedrag("#txtV2-7-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV2-7-error-Woning"+idWoning+extraId);
		break;
	case "valV3-1b":
		//aflossing bedrag, geen decimalen
		
		good=validateBedrag("#txtV3-1b-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV3-1b-error-Woning"+idWoning+extraId);
		break;
	case "valV3-2":
		//check 1: datum not > aangiftejaar and not < 1 jan 2004
		
		var date = stringToDate($("#txtV3-2-Woning"+idWoning+extraId).val());
		if((date=="")||(date=="Invalid Date")||(date=="Invalid Year")){
			good=false;
			
		}
		show_hide_error(good, "#divV3-2-error-4-Woning"+idWoning+extraId);
		
		if(good){
			var aangifteJaar = Interface.variable["dec31aangifte"];
			var jan1 = Interface.variable["jan12004"];
		
			if((date.getTime()>aangifteJaar.getTime())||(date.getTime()<jan1.getTime())) good=false;
			
			show_hide_error(good, "#divV3-2-error-1-Woning"+idWoning+extraId);
		}	
		if(good){
			//check 2: datum not < aankoopdatum
			
			var aankoop = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			
			if(date.getTime()<aankoop.getTime()) good=false;
		
			show_hide_error(good, "#divV3-2-error-2-Woning"+idWoning+extraId);
		}
		if(good){
			//check 3: datum not > verkoop
			var verkoop = Bijleendata.Woningen[idWoning].woning_verkoopdatum;
			if(verkoop!=""){
				if(date.getTime()>verkoop.getTime()) good=false;
				show_hide_error(good, "#divV3-2-error-3-Woning"+idWoning+extraId);
			}
		}
		break;
		
	case "valV4-1":
		break;
	case "valV4-2":
		
		break;
		
	case "valV5-2":
		//datum can't be > aangifte jaaren < 1jan 2004
		
		var date = stringToDate($("#txtV5-2-Woning"+idWoning+extraId).val());
		if((date=="")||(date=="Invalid Year")||(date=="Invalid Date")){
			good=false;
		}
		show_hide_error(good, "#divV5-2-error-4-Woning"+idWoning+extraId);
		
		if(good){
			var aangifteJaar = Interface.variable["dec31aangifte"];
			var jan1 = Interface.variable["jan12004"];
			
			if((date.getTime()>aangifteJaar.getTime())||(date.getTime()<jan1.getTime())) good=false;
			
			show_hide_error(good, "#divV5-2-error-1-Woning"+idWoning+extraId);
		}		
		if(good){
			//check 2: datum can't be < aankoopdatum
			var aankoop = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			if(date.getTime()<aankoop.getTime()) good=false;
			
			show_hide_error(good, "#divV5-2-error-2-Woning"+idWoning+extraId);
		}
		if(good){
			var verkoop = Bijleendata.Woningen[idWoning].woning_verkoopdatum;
			if(verkoop!=""){
				if(date.getTime()>verkoop.getTime()) good=false;
				show_hide_error(good, "#divV5-2-error-3-Woning"+idWoning+extraId);
			}
		}
		break;
		
	case "valV5-3":
		//kosten verbouwing, geen decimalen
		good=validateBedrag("#txtV5-3-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV5-3-error-Woning"+idWoning+extraId);
		break;
			
	case "valV5-5":
		//datum can't be > aangifte jaaren < 1jan 2004
		
		
		var date = stringToDate($("#txtV5-5-Woning"+idWoning+extraId).val());
		if((date=="")||(date=="Invalid Year")||(date=="Invalid Date")){
			good=false;
		}
		show_hide_error(good, "#divV5-5-error-4-Woning"+idWoning+extraId);
		if(good){
			var aangifteJaar = Interface.variable["dec31aangifte"];
			var jan1 = Interface.variable["jan12004"];
			
			if((date.getTime()>aangifteJaar.getTime())||(date.getTime()<jan1.getTime())) good=false;
			
			show_hide_error(good, "#divV5-5-error-1-Woning"+idWoning+extraId);
		}		
		if(good){
			//check 2: datum can't be < aankoopdatum
			var aankoop = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			if(date.getTime()<aankoop.getTime()) good=false;
			
			show_hide_error(good, "#divV5-5-error-2-Woning"+idWoning+extraId);
		}
		if(good){
			var verkoop = Bijleendata.Woningen[idWoning].woning_verkoopdatum;
			if(verkoop!=""){
				if(date.getTime()>verkoop.getTime()) good=false;
				show_hide_error(good, "#divV5-5-error-3-Woning"+idWoning+extraId);
			}
		}
		break;
		
	case "valV5-6":
		//bedrag geleend, geen decimalen
		
		
		good=validateBedrag("#txtV5-6-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV5-6-error-2-Woning"+idWoning+extraId);
		if(good){
			var kosten = $("#txtV5-3-Woning"+idWoning+extraId).val();
			kosten = (kosten.replace(/[.]/g,""))*1;
			
			var bedrag = $("#txtV5-6-Woning"+idWoning+extraId).val();
			bedrag = (bedrag.replace(/[.]/g,""))*1;
			
			/*if(bedrag>kosten) good=false;
			show_hide_error(good, "#divV5-6-error-Woning"+idWoning+extraId);
			*/
		}
		break;
		
	case "valV5-9":

		//betaalde bedrag, geen decimalen
		good=validateBedrag("#txtV5-9-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV5-9-error-2-Woning"+idWoning+extraId);
		if(good){
			var lening = $("#txtV5-6-Woning"+idWoning+extraId).val();
			lening = (lening.replace(/[.]/g,""))*1;

			var verbouwing = $("#txtV5-3-Woning"+idWoning+extraId).val();
			verbouwing = (verbouwing.replace(/[.]/g,""))*1;

			var betaalde =$("#txtV5-9-Woning"+idWoning+extraId).val();
			betaalde = (betaalde.replace(/[.]/g,""))*1;
			
			if(betaalde>verbouwing) good=false;
			show_hide_error(good, "#divV5-9-error-3-Woning"+idWoning+extraId);
			good=true;

			if(betaalde>lening) good=false;
			show_hide_error(good, "#divV5-9-error-Woning"+idWoning+extraId);
		}
		break;
		
	case "valV5-10":
		//datum can't be > aangifte jaar en < 1jan 2004
		
		var date = stringToDate($("#txtV5-10-Woning"+idWoning+extraId).val());
		if((date=="")||(date=="Invalid Year")||(date=="Invalid Date")){
			good=false;
		}
		show_hide_error(good, "#divV5-10-error-3-Woning"+idWoning+extraId);
		
		if(good){
			var aangifteJaar = Interface.variable["dec31aangifte"];
			var jan1 = Interface.variable["jan12004"];
	
			if((date.getTime()>aangifteJaar.getTime())||(date.getTime()<jan1.getTime())) good=false;
			
			show_hide_error(good, "#divV5-10-error-1-Woning"+idWoning+extraId);
		}
		if(good){

			var aankoop = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			
			if(date.getTime()<aankoop.getTime()) good=false;
			show_hide_error(good, "#divV5-10-error-2-Woning"+idWoning+extraId);
		}
		break;
	case "valV5-12":
		good=validateBedrag("#txtV5-12-Woning"+idWoning+extraId);
		show_hide_error(good, "#divV5-12-error-1-Woning"+idWoning+extraId);
		break;
	case "valInitEindControle":
		var val1 = $("input[name=radV6-0]:checked").val();
		if(val1==undefined){
			good=false;
		}
		show_hide_error(good, "#divV6-0-error-1");
		
		if($("#divV6-1").attr("class").indexOf("hidden")==-1){
			var val2 = $("input[name=radV6-1]:checked").val();
			if(val2==undefined){
				good=false;
			}
			show_hide_error(good, "#divV6-1-error-1");
		}		
		if($("#divV6-2").attr("class").indexOf("hidden")==-1){
			var val3=$("#selV6-2").val();
			if(val3==0){
				good=false;
			}
			show_hide_error(good, "#divV6-2-error-2");
		}
		break;
	case "valV6-2":
		var woningId=$("#selV6-2").val();
		if(woningId=="0") {
			good=false;
			
		}
		show_hide_error(good, "#divV6-2-error-2");
		if(good){
			var subs = Interface.variable["dec31aangifte"] - Bijleendata.Woningen[woningId].woning_aankoopdatum;
			subs = subs / (1000 * 60 * 60 * 24 * 365);
			
			if(subs>=(Interface.variable["leegstandtermijn"]+1)){
				good=true;
			} else {
				good=false;
			}
			show_hide_error(good, "#divV6-2-error");
		}
		
		break;
	case "valV6-3":
		var geenHoofdVerblijfDate = stringToDate($("#txtV6-3").val());
		var woningId = $("#selV6-2").val();
		var good=true;
		
		if((geenHoofdVerblijfDate=="")||(geenHoofdVerblijfDate=="Invalid Date")||(geenHoofdVerblijfDate=="Invalid Year")){
			good=false;
		}
		
		show_hide_error(good, "#divV6-3-error-3");
		if(good){
			if(geenHoofdVerblijfDate.getTime()<Bijleendata.Woningen[woningId].woning_aankoopdatum.getTime()){
				good=false;
				
			}
			show_hide_error(good, "#divV6-3-error-2");
		}
		if(good){
			if((geenHoofdVerblijfDate.getTime()<Interface.variable["jan12004"].getTime())||(geenHoofdVerblijfDate.getTime()>Interface.variable["dec31aangifte"].getTime())){
				good=false;
				
			}
			show_hide_error(good, "#divV6-3-error-1");
		
		}
		break;
	case "valV6-5":
			
			good=validateBedrag("#txtV6-5");
			show_hide_error(good, "#divV6-5-error-Woning"+idWoning+extraId);
	}
	
	
	
	return good;
};
function validateFinankosten(idWoning, extraOption){
	var finankosten = $("input[name=radV1-8-Woning"+idWoning+extraOption+"]:checked").val();
	if(finankosten=="ja"){
		var leningFinan = currencyToNumber($("#txtV1-9-Woning"+idWoning+extraOption).val());
		var lening = currencyToNumber($("#txtV1-7-Woning"+idWoning+extraOption).val());
		
		if(lening>0){
			var lening2 = lening * 0.02;
			
			if(leningFinan>lening2){
				show_hide_error(false, "#divV1-9-error-1-Woning"+idWoning+extraOption);
			} else {
				show_hide_error(true, "#divV1-9-error-1-Woning"+idWoning+extraOption);
			}
		}
	}
}
function validateFinankostenVerbouwing(idWoning, extraOption){
	var finankosten = $("input[name=radV5-11-Woning"+idWoning+extraOption+"]:checked").val();
	if(finankosten=="ja"){
		var leningFinan = currencyToNumber($("#txtV5-12-Woning"+idWoning+extraOption).val());
		var lening = currencyToNumber($("#txtV5-6-Woning"+idWoning+extraOption).val());
		
		if(lening>0){
			var lening2 = lening * 0.02;
			
			if(leningFinan>lening2){
				show_hide_error(false, "#divV5-12-error-2-Woning"+idWoning+extraOption);
			} else {
				show_hide_error(true, "#divV5-12-error-2-Woning"+idWoning+extraOption);
			}
		}
	}
}