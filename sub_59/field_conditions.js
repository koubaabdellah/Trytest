/**
 * Conditions to show the next question
 * @param op = active question
 * @param idWoning 
 * @param extraId = possible extra id of the woning
 * 
 */
Workflow.Conditions = function(op, idWoning, extraId){


	switch(op){
		case "conVPanelInit":
			
			var showQuestion=true;
			
			var aankoop6 = new Date(Bijleendata.Woningen[idWoning].woning_aankoopdatum.getFullYear(), Bijleendata.Woningen[idWoning].woning_aankoopdatum.getMonth()+6, Bijleendata.Woningen[idWoning].woning_aankoopdatum.getDate());

			if(Bijleendata.Woningen[idWoning].woning_verkoopdatum!=""){
				if(Bijleendata.Woningen[idWoning].woning_verkoopdatum.getTime()>aankoop6.getTime()){
					showQuestion=true;
				} else {
					showQuestion=false;
				}
			} 
			 if(showQuestion){
			
				if(Interface.variable["dec31aangifte"].getTime()>aankoop6.getTime()){
					showQuestion=true;
				} else {
					showQuestion=false;
				}
			 }			
			
			if(showQuestion){
				
				$("#divVPanel1-Woning"+idWoning+extraId).removeClass("hidden");
			} else {
				$("#divVPanel1-Woning"+idWoning+extraId).addClass("hidden");
				$("#radVPanel1nee-Woning"+idWoning+extraId).attr("checked","checked");
				$("#divVPanel2-Woning"+idWoning+extraId).addClass("hidden");
				
				$("#divVPanel3-Woning"+idWoning+extraId).addClass("hidden");
				
				$("#divVPanel4-Woning"+idWoning+extraId).removeClass("hidden");
			}
			break;
		case "conVPanel1":
			
				
				
				if($("input[name=radVPanel1-Woning"+idWoning+extraId+"]:checked").val()=="ja"){
					
					$("#divVPanel2-Woning"+idWoning+extraId).removeClass("hidden");
				} else {
					$("#divVPanel4-Woning"+idWoning+extraId).removeClass("hidden");
					Interface.disappearAndClear("#divVPanel2-Woning"+idWoning+extraId);
					
					Interface.disappearAndClear("#divVPanel3-Woning"+idWoning+extraId);
				}
			
			break;
			
		case "conVPanel2":
			if($("input[name=radVPanel2-Woning"+idWoning+extraId+"]:checked").val()=="ja"){
				$("#divVPanel3-Woning"+idWoning+extraId).removeClass("hidden");
			} else {
				$("#divVPanel4-Woning"+idWoning+extraId).removeClass("hidden");
				Interface.disappearAndClear("#divVPanel3-Woning"+idWoning+extraId);
			}
			break;
		case "conVPanel3":
			if($("input[name=radVPanel4-Woning"+idWoning+extraId+"]:checked").val()==undefined){
				$("#divVPanel4-Woning"+idWoning+extraId).removeClass("hidden");
			} 
			break;
		case "conVPanel4":
			
			if($("input[name=radVPanel4-Woning"+idWoning+extraId+"]:checked").val()=="ja"){
				$("#divVPanel5-Woning"+idWoning+extraId).removeClass("hidden");
			} else {
				$("#divVPanelButton-Woning"+idWoning+extraId).removeClass("hidden");
				Interface.disappearAndClear("#divVPanel5-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divVPanel6-Woning"+idWoning+extraId);
			}
			break;
		case "conVPanel5":
			
			if($("input[name=radVPanel5-Woning"+idWoning+extraId+"]:checked").val()=="ja"){
				$("#divVPanel6-Woning"+idWoning+extraId).removeClass("hidden");
			} else {
				$("#divVPanelButton-Woning"+idWoning+extraId).removeClass("hidden");
				Interface.disappearAndClear("#divVPanel6-Woning"+idWoning+extraId);
			}
			break;
/*		case "conVPanel6":
			var val = $("#txtVPanel6-Woning"+idWoning+extraId).val();
			val 
			break;*/
		case "conInit":
		
		
			var aankoopdatum = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			var jan12004 = Interface.variable["jan12004"];
			
			
			if(aankoopdatum.getTime()<jan12004.getTime()){
				
				
				flags["divV0-5-Woning"+idWoning+extraId]=0;
				Workflow.showNextQuestion("#divV0-4", Workflow.aankoopWorkflow, idWoning, extraId);
				
				Interface.disappearAndClear("#divV1-1c-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-1d-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-1f-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-2-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-3-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-4-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-5-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-6-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-7-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-8-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-9-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-11-Woning"+idWoning+extraId);
				Interface.disappearAndClear("#divV1-12-Woning"+idWoning+extraId);
			} else {
				Interface.disappearAndClear("#divV0-5-Woning"+idWoning+extraId);
				flags["divV0-5-Woning"+idWoning+extraId]=0; //to enable the keyup again
				//Interface.disappearAndClear("#divV1-7-Woning"+idWoning+extraId);
				flags["divV1-7-Woning"+idWoning+extraId]=0;
				//Interface.disappearAndClear("#divV1-11-Woning"+idWoning+extraId);
				//Interface.disappearAndClear("#divV1-12-Woning"+idWoning+extraId);
				flags["divV1-12-Woning"+idWoning+extraId]=0;
				Workflow.showNextQuestion("#divV1-1b", Workflow.aankoopWorkflow, idWoning, extraId);
			}
		
		break;
		//conV1 = Aankoop
		case "conV1-1e":
			//Is dit de eerste woning?
			var aantalWoningen=0;
			var anotherJa=0;
			var dateIsLess=1;
			var thisaankoopdatum = stringToDate($("#txtV1-1b-Woning"+idWoning+extraId).val());
			
			var otheraankoopdatum=new Array();
			
			for(var i in Bijleen.Woningen){
				for(j=0; j<Bijleen.Woningen[i].Aankoop.length; j++){
				
					
						if(Bijleen.Woningen[i].Aankoop[j].eerstewoning=="ja"){
							anotherJa=1;
						} 
					
				}
			}
			if(anotherJa==0){
				for(var i in Bijleendata.Woningen){
					if(i!=idWoning){
						if(Bijleendata.Woningen[i].woning_aankoopdatum.getTime()<thisaankoopdatum.getTime()){
							anotherJa=1;
							break;
						}
								
					}
				}
			}
			
			
			if(anotherJa==1){
				aantalWoningen=1;
			}
					
			(aantalWoningen>0) ? Workflow.showNextQuestion("#divV1-1enee", Workflow.aankoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV1-1eja", Workflow.aankoopWorkflow, idWoning, extraId);
			
			
			
			break;
		case "conV1-1f":
			
				var aankoopdatum = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
				 $("#txtV1-1b-Woning"+idWoning+extraId).val(dateToString(aankoopdatum));
			
				
				var jan2006=Interface.variable["jan12006"];
			
				if(aankoopdatum.getTime()>jan2006.getTime()){
					Workflow.showNextQuestion("#divV1-1bja", Workflow.aankoopWorkflow, idWoning, extraId);
				} else {
					Workflow.showNextQuestion("#divV1-1bnee", Workflow.aankoopWorkflow, idWoning, extraId);
				}
			break;
	
			
		case "conV1-2":
			//Overdrachtsbelasting Bedrag, geen decimalen
			good = true;
			
			show_hide_error(good, "#divV1-2-error-2-Woning"+idWoning+extraId);
			good=validateBedrag("#txtV1-2-Woning"+idWoning+extraId);

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
		case "conV1-3":
			//Makelaarskosten Bedrag, geen decimalen
			good=true;
			show_hide_error(good, "#divV1-3-error-2-Woning"+idWoning+extraId);
			
			good=validateBedrag("#txtV1-3-Woning"+idWoning+extraId);
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
			
		case "conV1-4":
			//Notaris Bedrag, geen decimalen
			good=true;
			show_hide_error(good, "#divV1-4-error-2-Woning"+idWoning+extraId);
			
			good=validateBedrag("#txtV1-4-Woning"+idWoning+extraId);
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
		
		case "conV1-5":			
			//Hebt u binnen 6 maanden na aankoop het huis verbouwd of verbeterd?
			
			$("input[name=radV1-5-Woning"+idWoning+extraId+"]:checked").val()=="ja" ? Workflow.showNextQuestion("#divV1-5ja", Workflow.aankoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV1-5nee", Workflow.aankoopWorkflow, idWoning, extraId);
			
			
			break;
		case "conV1-7":
			//Geleend Bedrag, geen decimalen
			good=true;
			show_hide_error(good, "#divV1-7-error-Woning"+idWoning+extraId);
			
			good=validateBedrag("#txtV1-7-Woning"+idWoning+extraId);
			
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

			//Aankoop datum > 31 dec 2009
			var aankoopDateString=$("#txtV1-1b-Woning"+idWoning+extraId).val();
			
			var delimiter = "-";
			var year = aankoopDateString.substr(aankoopDateString.lastIndexOf(delimiter)+1);
			
			year>2009 ? Workflow.showNextQuestion("#divV1-7+", Workflow.aankoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV1-7-", Workflow.aankoopWorkflow, idWoning, extraId);
			
			break;
		case "conV1-8":
			//Hebt u de kosten van de financiering (deels) geleend?
			$("input[name=radV1-8-Woning"+idWoning+extraId+"]:checked").val()=="ja" ? Workflow.showNextQuestion("#divV1-8ja", Workflow.aankoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV1-8nee", Workflow.aankoopWorkflow, idWoning, extraId);	
			
			break;
		
		
		case "conV1-11":
			//Hebt u voor de aankoop van dit huis een schenking van uw ouders gekregen die onder de eenmalige verhoogde vrijstelling valt?
			
			$("input[name=radV1-11-Woning"+idWoning+extraId+"]:checked").val()=="ja" ? Workflow.showNextQuestion("#divV1-11ja", Workflow.aankoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV1-11nee", Workflow.aankoopWorkflow, idWoning, extraId);	
			
			break;

		case "conV1-12":
			//Schenking bedrag, geen decimalen
			good=true;
			show_hide_error(good, "#divV1-12-error-2-Woning"+idWoning+extraId);
			
			good=validateBedrag("#txtV1-12-Woning"+idWoning+extraId);
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
			}
			break;
			
		//conV2 = Verkoop
		case "conV2-1a":			
			//Verkoopdatum na 1jan 2006?
			
			var verkoopDateString=$("#txtV2-1a-Woning"+idWoning+extraId).val();
			
			var delimiter = "-";
			var year = verkoopDateString.substr(verkoopDateString.lastIndexOf(delimiter)+1);
			
			year>=2006? Workflow.showNextQuestion("#divV2-1a+", Workflow.verkoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV2-1a-", Workflow.verkoopWorkflow, idWoning, extraId);
	
			break;
		
		case "conV2-3b":	
			//Is er sprake van een antispeculatiebeding?
			$('input[name=radV2-3b-Woning'+idWoning+extraId+']:checked').val()=="ja" ? Workflow.showNextQuestion("#divV2-3bja", Workflow.verkoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV2-3bnee", Workflow.verkoopWorkflow, idWoning, extraId);	
			break;
		case "conV2-3c":	
			var aank = Bijleendata.Woningen[idWoning].woning_aankoopdatum;
			var verk = Bijleendata.Woningen[idWoning].woning_verkoopdatum;
			var dateToCompare = verk;
			if(dateToCompare==""){
				dateToCompare = Interface.variable["dec31aangifte"];
			}
			var aankoop24 = new Date(aank.getFullYear(), aank.getMonth()+24, aank.getDate());
			
			if(dateToCompare.getTime()>=aankoop24.getTime()){
				Workflow.showNextQuestion("#divV2-3cja", Workflow.verkoopWorkflow, idWoning, extraId);
			} else {
				Workflow.showNextQuestion("#divV2-3cnee", Workflow.verkoopWorkflow, idWoning, extraId);
			}

			
			break;
		
		case "conV2-4":	
			//Laag leeggestaan?
			$('input[name=radV2-4-Woning'+idWoning+extraId+']:checked').val()=="ja" ? Workflow.showNextQuestion("#divV2-4ja", Workflow.verkoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV2-4nee", Workflow.verkoopWorkflow, idWoning, extraId);	
			break;
		
		case "conV2-5":	
			//Vervreemding
			//	show_hide_error(true, "#divV2-5-error-4-Woning"+idWoning+extraId);
			var geenHoofdVerblijfDateString=$("#txtV2-5-Woning"+idWoning+extraId).val();
			var geenHoofdVerblijfDate = stringToDate($("#txtV2-5-Woning"+idWoning+extraId).val());
			
			if((geenHoofdVerblijfDate!="")&&(geenHoofdVerblijfDate!="Invalid Date")&&(geenHoofdVerblijfDate!="Invalid Year")){
				var year=geenHoofdVerblijfDate.getFullYear();
	
				var verkoopDateString=$("#txtV2-1a-Woning"+idWoning+extraId).val();
				var verkoopDate=stringToDate(verkoopDateString);
				var newYear=parseInt(year)+Interface.leegstandtermijnVerkoop(verkoopDateString);
				var vervreemdingsdatum = stringToDate("31/12/"+newYear);
			
				$("#datumV2-7-Woning"+idWoning+extraId).html("31 december "+newYear);
				(vervreemdingsdatum.getTime()<=verkoopDate.getTime() ? Workflow.showNextQuestion("#divV2-5-", Workflow.verkoopWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV2-5+", Workflow.verkoopWorkflow, idWoning, extraId));
				
			} else {
				Workflow.showNextQuestion("#divV2-5+", Workflow.verkoopWorkflow, idWoning, extraId);
			}			
			break;
		case "conV5-4":	
			//Geld geleend?
		
			$('input[name=radV5-4-Woning'+idWoning+extraId+']:checked').val()=="ja" ? Workflow.showNextQuestion("#divV5-4ja", Workflow.verbouwingWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV5-4nee", Workflow.verbouwingWorkflow, idWoning, extraId);	
			break;
		case "conV5-8":	
			
			$('input[name=radV5-8-Woning'+idWoning+extraId+']:checked').val()=="ja" ? Workflow.showNextQuestion("#divV5-8ja", Workflow.verbouwingWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV5-8nee", Workflow.verbouwingWorkflow, idWoning, extraId);	
			break;
			
		case "conV5-9":
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
			
			
		case "conV5-11":	
			
			$('input[name=radV5-11-Woning'+idWoning+extraId+']:checked').val()=="ja" ? Workflow.showNextQuestion("#divV5-11ja", Workflow.verbouwingWorkflow, idWoning, extraId) : Workflow.showNextQuestion("#divV5-11nee", Workflow.verbouwingWorkflow, idWoning, extraId);	
			break;
		case "conV6-0":	
			//Ontbonden koop?
			
			if($('input[name=radV6-0]:checked').val()=="ja"){
				show_hide_error(true, "#divV4-1-error-Ontbonden0");
				show_hide_error(true, "#divV4-2-error-1-Ontbonden0");
				Workflow.showNextQuestion("#divV6-0ja", Workflow.eindcontroleWorkflow, 0);
			} else {
				for(var i=1; i<idsOntbonden.length; i++){
					
					Interface.removeOntbonden(idsOntbonden[i]);
				}
				try{
					Bijleen.EindControle.OntbondenKoop["num"+idsOntbonden[0]].boete = 0;
					Bijleen.EindControle.OntbondenKoop["num"+idsOntbonden[0]].eventdatum ="";
					Interface.clear("#ontbonden"+idsOntbonden[0]);
				} catch(err){}
				Workflow.showNextQuestion("#divV6-0nee", Workflow.eindcontroleWorkflow, 0);	
				
			}  
			
			var possibleHouses=0;
			for(var i in Bijleendata.Woningen){
				if(Bijleendata.Woningen[i].woning_verkoopdatum==""){
					var aankoopdatum = Bijleendata.Woningen[i].woning_aankoopdatum;
				
					var twoYearsLess = Interface.variable["dec31aangifte"].getFullYear()-2;
					var twoYearsLessDatum = new Date(twoYearsLess,11,31);
					
					
					if(aankoopdatum<=twoYearsLessDatum){
						possibleHouses++;
					}
				}
			}
			
			if(possibleHouses==0){
				
				Workflow.showNextQuestion("#divV6-0na", Workflow.eindcontroleWorkflow, 0);
			} else {
				
				Workflow.showNextQuestion("#divV6-0sa", Workflow.eindcontroleWorkflow, 0);	
			}
			Interface.checkForToonResultaten();
			break;
		case "conV6-0sa":	
			if($("input[name=radV6-1]:checked").val()!=undefined){
				
				Workflow.showNextQuestion("#divV6-0na", Workflow.eindcontroleWorkflow, 0);
			}

			
			break;
		case "conV6-1":	
			//Huis te koop?
			
			$('input[name=radV6-1]:checked').val()=="ja" ? Workflow.showNextQuestion("#divV6-1ja", Workflow.eindcontroleWorkflow, 0) : Workflow.showNextQuestion("#divV6-1nee", Workflow.eindcontroleWorkflow, 0);	
			Interface.checkForToonResultaten();
			break;
		case "conV6-2":	
			//Over welke woning?
			
			$('#selV6-2').val()=="0" ? Workflow.showNextQuestion("#divV6-2nee", Workflow.eindcontroleWorkflow, 0) : Workflow.showNextQuestion("#divV6-2ja", Workflow.eindcontroleWorkflow, 0);	
			Interface.checkForToonResultaten();
			break;
		case "conV6-3":	
			//Check vervreemding
			
			
			var geenHoofdVerblijfDate = stringToDate($("#txtV6-3").val());
			if((geenHoofdVerblijfDate!="")&&(geenHoofdVerblijfDate!="Invalid Date")&&(geenHoofdVerblijfDate!="Invalid Year")){
			
				var woningId = $("#selV6-2").val();
		
				var year=geenHoofdVerblijfDate.getFullYear();
			
				var newYear=parseInt(year)+Interface.variable["leegstandtermijn"];
				
				var vervreemdingsdatum = stringToDate("31/12/"+newYear);
				
				var aangifteYear = Interface.variable["dec31aangifte"];
				$("#datumV6-5").html("31 december "+newYear);
				(vervreemdingsdatum.getTime()<=aangifteYear.getTime()) ? Workflow.showNextQuestion("#divV6-3-", Workflow.eindcontroleWorkflow, 0) : Workflow.showNextQuestion("#divV6-3+", Workflow.eindcontroleWorkflow, 0);
				Interface.checkForToonResultaten();
			}
			break;
		case "conV8-2":
			//eigen woning?
			$('input[name=radV8-2]:checked').val()=="ja" ? Workflow.showNextQuestion("#divV8-2ja", Workflow.geschiktheid, 0) : Workflow.showNextQuestion("#divV8-2nee", Workflow.geschiktheid, 0);	
			
			break;
			
		case "conV8-3":
			//einige eigenaar?
			$('input[name=radV8-3]:checked').val()=="ja" ? Workflow.showNextQuestion("#divV8-3ja", Workflow.geschiktheid, 0) : Workflow.showNextQuestion("#divV8-3nee", Workflow.geschiktheid, 0);	
			
			break;
		case "conV8-4":
			//zelfde partner?
			$('input[name=radV8-4]:checked').val()=="ja" ? Workflow.showNextQuestion("#divV8-4ja", Workflow.geschiktheid, 0) : Workflow.showNextQuestion("#divV8-4nee", Workflow.geschiktheid, 0);	
			
			break;
		case "conV8-5":
			//zelfde eigendomsverhouding?
			$('input[name=radV8-5]:checked').val()=="ja" ? Workflow.showNextQuestion("#divV8-5ja", Workflow.geschiktheid, 0) : Workflow.showNextQuestion("#divV8-5nee", Workflow.geschiktheid, 0);	
			
			break;
			
		case "conV8-6":
			//gebeurtenis in uw leven?
			$('input[name=radV8-6]:checked').val()=="ja" ? Workflow.showNextQuestion("#divV8-6ja", Workflow.geschiktheid, 0) : Workflow.showNextQuestion("#divV8-6nee", Workflow.geschiktheid, 0);	
			
			break;
		case "conVAdditionaleVragen":
			Bereken();
			Interface.checkForToonResultaten();
			break;
		case "conInitEindControle":
			
			if($("input[name=radV6-0]:checked").val()==undefined){

				$("#divV6-0").removeClass("hidden");
			} else {
				Workflow.showNextQuestion("#divV6-0", Workflow.eindcontroleWorkflow, 0);
				
			}
			Interface.checkForToonResultaten();
			break;
		case "conAangifte":
			
			var year = $("#selAangifteJaar").val();
			
			if(year=="0"){
				Workflow.showNextQuestion("#divAangiftejaarnee", Workflow.geschiktheid, 0);
			} else {
				Workflow.showNextQuestion("#divAangiftejaarja", Workflow.geschiktheid, 0);
			}
			break;
		
	}
};
