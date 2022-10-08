var Workflow = Workflow || {};
var Bijleen = Bijleen || {};
var Bijleendata = Bijleendata || {};
var mainWorkflow = new Array();
/**
 * creates a new workflow
 * 
 * @param woningIdMachine = name of the woning with spaces replaced by _
 */
Workflow.newWorkflowEvent = function(woningidMachine){
		
	//check if this house is already in the workflow
	var exists=0;
	for(i=0; i<mainWorkflow.length; i++){
		if(mainWorkflow[i].woningidMachine == woningidMachine){
			exists=1;
		}
		
	}
	if(exists==0){
		var idx = mainWorkflow.length;	
		mainWorkflow[idx]={};
		mainWorkflow[idx].woningidMachine=woningidMachine;
		mainWorkflow[idx].active=0;
		mainWorkflow[idx].objId="#divHouseContainer-Woning"+woningidMachine;
		mainWorkflow[idx].innerObjId="#divAccordion-Woning"+woningidMachine;
		mainWorkflow[idx].aankoop = new Array();
		mainWorkflow[idx].aflossing=new Array();
		mainWorkflow[idx].ontbonden=new Array();
		mainWorkflow[idx].verbouwing= new Array();
		mainWorkflow[idx].verkoop =new Array();		
	}
	showObjects();
};

/**
 * inserts a new event inside the workflow
 * 
 * @param woningidMachine = name of the woning with spaces replaced by _
 * @param eventt = name of the event to be inserted (aankoop, verkoop, aflossing, verbouwing)
 */
Workflow.pushEvent = function(woningidMachine, eventt){

	var index=undefined;
	for(var i=0; i<mainWorkflow.length; i++){
		if(mainWorkflow[i].woningidMachine==woningidMachine){
			index=i;
			break;
		}
	}

	if(index!=undefined){
			var len;
			if((eventt=="aankoop")||(eventt=="verkoop")){
				len=0;
			} else {
				eval("len=mainWorkflow["+index+"]."+eventt+".length");
								
			}
			eval("mainWorkflow["+index+"]."+eventt+"["+len+"]=1");
	}
	showObjects();
	
};



Workflow.endOfAction = function(eventt, idWoning, idxEvent){
	
	
	for(i=0; i<mainWorkflow.length; i++){
		if(mainWorkflow[i].woningidMachine==idWoning){
			
				for(var j=0; j<mainWorkflow[i][eventt].length; j++){
				
				
						if(mainWorkflow[i][eventt][j]==1){
							
							mainWorkflow[i][eventt][j]=2;
							break;
						}
					
				}
			}
			
			
			
	}
	Workflow.searchNextWorkflow();
	showObjects();
};

/**
 * assigns 1 to the next active house in the mainWorkflow array
 * @param idWoningMachine
 */
Workflow.setNextWorkflow = function(idWoningMachine){
	
	for(i=0; i<mainWorkflow.length; i++){
		if(mainWorkflow[i].active==1) mainWorkflow[i].active=0;
		if(mainWorkflow[i].woningidMachine==idWoningMachine) mainWorkflow[i].active=1;
	};
};
/**
 * hides and disables all the houses (when the user clicks on a wijzig invoer button)
 */
Workflow.disableAllHouses = function(){
	for(var i=0; i<mainWorkflow.length; i++){
		if(mainWorkflow[i].active==0){
			//showHideWoning(mainWorkflow[i].woningidMachine, "hide");
		}
		
			//$("#divAccordion-Woning"+mainWorkflow[i].woningidMachine).hide();
			blockDiv(mainWorkflow[i].innerObjId);
	}
};
/**
 * hides and disables all events (when the user clicks on a wijzig invoer button)
 */
Workflow.disableAllEvents = function(){
	
	for(var i=0; i<mainWorkflow.length; i++){
			blockDiv("#divBijleenContainer-Woning"+mainWorkflow[i].woningidMachine);
			for(var j in mainWorkflow[i]){
				
				if((j=="aankoop")||(j=="verkoop")||(j=="aflossing")||(j=="verbouwing")){
					for(var k=0; k<mainWorkflow[i][j].length; k++){
						$("#div"+j+"Container-Woning"+mainWorkflow[i].woningidMachine+"-workflow-"+i+"-event-"+k).addClass("hidden");
						$("#div4check"+j+"-Woning"+mainWorkflow[i].woningidMachine+"-workflow-"+i+"-event-"+k).removeClass("titleWonBottom");
						$("#div4check"+j+"-Woning"+mainWorkflow[i].woningidMachine+"-workflow-"+i+"-event-"+k).addClass("titleWonRight");
					}
				}
			}
	}
};
/**
 * searches for the next event in the active house
 * @param idxActive
 * @returns {Array}
 */
Workflow.searchForNextEvent = function(idxActive){
	var results = new Array();
	results["gevonden"]=0;
	for(var i in mainWorkflow[idxActive]){
		if(results["gevonden"]==0){
			if((i=="aankoop")||(i=="verkoop")||(i=="aflossing")||(i=="verbouwing")){
				for(var j=0; j<mainWorkflow[idxActive][i].length; j++){
						if(mainWorkflow[idxActive][i][j]==1){
							results["nextEvent"] = i;
							results["gevonden"]=1;
							results["idxNextEvent"]=j;
							break;
						}
				}
			
			}

		}
	}
	return results;

};
Workflow.searchForNextHouse = function(){
	var match=0;
	var idxActive = "";
	for(i=0; i<mainWorkflow.length; i++){
		if(match==0){
			for( var j in mainWorkflow[i]){
				if((j=="aankoop")||(j=="verkoop")||(j=="aflossing")||(j=="verbouwing")){
					for(k=0; k<mainWorkflow[i][j].length; k++){
						if(mainWorkflow[i][j][k]==1){
							idxActive=i;
							match=1;
							break;
						}
					}
				}
			}
		}
	}
	return idxActive;
};
Workflow.showNextActiveBlock = function(){
	SluitHelp();

	$(".wijzig").removeClass("hidden");

	var idxActive="";
	var nextEvent= new Array();
	var currentEvent = new Array();
	Workflow.disableAllHouses();
	Workflow.disableAllEvents();
	$("#divV6").addClass("hidden");
	
	for(i=0; i<mainWorkflow.length; i++){
		if(mainWorkflow[i].active==1){
			idxActive=i;
			break;
		} 
	}
	try{
		$("#fsGebeurtenis-Woning"+mainWorkflow[idxActive].woningidMachine).removeClass("checkBackground");
	} catch(err){};
		//search for next event in this same house
	nextEvent = Workflow.searchForNextEvent(idxActive);
	
	
	if(nextEvent["gevonden"] == 0){
		//there are no more events in this house
	
		try{
			mainWorkflow[idxActive].active=2;
			$("#title-Woning"+mainWorkflow[idxActive].woningidMachine + " a").removeClass("greyLink");
			$("#fsGebeurtenis-Woning"+mainWorkflow[idxActive].woningidMachine).addClass("checkBackground");
		
			
		} catch(err){}
		idxActive = Workflow.searchForNextHouse();
		
		if((idxActive+"")!=""){
			mainWorkflow[idxActive].active=1;
	
			Workflow.showNextActiveBlock();
			return;
		}
	} else {
		showHideWoning(mainWorkflow[idxActive].woningidMachine, "show");
		
		Workflow.showNextQuestion("#divVPanelInit", Workflow.panelWoning, mainWorkflow[idxActive].woningidMachine, "");
		$("#title-Woning"+mainWorkflow[idxActive].woningidMachine+" a").removeClass("greyLink");
		
		$("#btnVerder2-Woning"+mainWorkflow[idxActive].woningidMachine).addClass("hidden");
		var nextDiv = "#div"+nextEvent["nextEvent"] + "Container-Woning" + mainWorkflow[idxActive].woningidMachine+"-workflow-"+idxActive+"-event-"+nextEvent["idxNextEvent"];
		if($(nextDiv).length==0){
			unblockDiv(mainWorkflow[idxActive].innerObjId);
		} else {
			blockDiv(mainWorkflow[idxActive].innerObjId);
			unblockDiv(nextDiv);
			$(nextDiv).removeClass("hidden");
			var divTitle="#div4check"+nextEvent["nextEvent"]+"-Woning"+mainWorkflow[idxActive].woningidMachine+"-workflow-"+idxActive+"-event-"+nextEvent["idxNextEvent"];
		
			try{
				$(divTitle).removeClass("titleWonRight");
				$(divTitle).addClass("titleWonBottom");
				$(divTitle + " a").removeClass("greyLink");
				
				$.scrollTo(divTitle + " a",0, {axis:'y'});
			} catch(err){
				
			}
		}
		
	}
	if((idxActive+"")==""){
		//there are no more houses. 
		$("#btnBereken").removeClass("buttonDisabled");
		$("#btnBereken").removeAttr("disabled");
		$("#divVBereken").removeClass("hidden");
		
		$.scrollTo("#divVBereken",0, {axis:'y'});
	} 
	

	showObjects();
	
	
//}
};

Workflow.searchNextWorkflow=function(){

	var idx="";
	var lastCompleteHuis="";
	var incompleteHuis=0;
	var huisisActive=0;
		for(i=0; i<mainWorkflow.length; i++){
			if(mainWorkflow[i].active==2){
				//this house is over
				lastCompleteHuis=i;
			}
			if(mainWorkflow[i].active==0){
				incompleteHuis++;
			}
			if(mainWorkflow[i].active==1){
				huisisActive++;
			}
		
		}
		if(incompleteHuis==mainWorkflow.length){
			try{
				mainWorkflow[0].active=1;
			} catch(exp){};
		} else{
		
			if(huisisActive==0){
			
				if(!isNaN(parseInt(lastCompleteHuis))){
				
				
					idx=lastCompleteHuis;
					idx++;
					if(idx<mainWorkflow.length){
			
						mainWorkflow[idx].active=1;
					}
				}
			}		
		}

		
		showObjects();
		
	};

/* -- assigns 0 to an event that was deleted by the user*/
Workflow.removeAction = function(idWoning, eventt, idEvent){
	eventt = eventt.toLowerCase();
		if(eventt!="0"){
			for(i=0; i<mainWorkflow.length; i++){
				if(mainWorkflow[i].woningidMachine==idWoning){
					eval("mainWorkflow["+i+"]."+eventt+"=deleteIndexFromArray(mainWorkflow["+i+"]."+eventt+", (mainWorkflow["+i+"]."+eventt+".length-1))");

					if(eventt=="verkoop") var div2remove = "#divV2-Woning"+idWoning+"-workflow-"+i+"-event-0";
					
					if(eventt=="aflossing") var div2remove = "#divV3-Woning"+idWoning+"-workflow-"+i+"-event-"+idEvent;
					if(eventt=="verbouwing") var div2remove = "#divV5-Woning"+idWoning+"-workflow-"+i+"-event-"+idEvent;
					try{
						$(div2remove).remove();
					} catch(err){}
					break;
				}
			}
		}
	showObjects();
};
Workflow.showNextQuestion = function(val, arr, idWoning, extraId){
	
	var idx;
	
	for(i=0; i<arr.length; i++){
		
		if(arr[i].current==val){
			idx=i;
			break;
		}
	}
	
	for(i=0; i<arr[idx].visible.length; i++){
		
		var obj = arr[idx].visible[i];
		
		if((obj!="")&&(idWoning!=0)){
			obj=obj + "-Woning" + idWoning+extraId;
		}
		
		if(obj!=""){
			if($(obj).length>0){
				var clas = $(obj).attr("class");
				flags[obj]=0;
				if(clas.indexOf("hidden")>-1){
					$(obj).removeClass("hidden");
				}
			}
		}
		
	}
	for(i=0; i<arr[idx].hidden.length; i++){
		
		var obj = arr[idx].hidden[i];
		
		if((obj!="")&&(idWoning!=0)){
			obj=obj + "-Woning" + idWoning+extraId;
		}
		
		if(obj!=""){
			if($(obj).length>0){
				var clas = $(obj).attr("class");
				flags[obj]=0;
				if(clas.indexOf("hidden")==-1){
					$(obj).addClass("hidden");
					Interface.clear(obj);
				}
			}				
		}
		
	}
	Interface.hideAllErrors(val, idWoning, extraId);
	if(arr[idx].condition!=""){
		
		Workflow.Conditions(arr[idx].condition, idWoning, extraId);
		return;
	}

};
Workflow.validateAllOntbonden = function(){
	var br=0;
	for(var j=0; j<idsOntbonden.length; j++){
		var val1 = $("#txtV4-1-Ontbonden"+idsOntbonden[j]).val();

		var goodval1=validateBedrag("#txtV4-1-Ontbonden"+idsOntbonden[j]);
		if(goodval1==false) br++;
		
		show_hide_error(goodval1, "#divV4-1-error-Ontbonden"+idsOntbonden[j]);
		
		var val2 = $("#txtV4-2-Ontbonden"+idsOntbonden[j]).val();
		val2 = stringToDate(val2);
		var goodval2=true;
		if((val2=="")||(val2=="Invalid Date")){
			goodval2=false;
		}
		
		show_hide_error(goodval2, "#divV4-2-error-1-Ontbonden"+idsOntbonden[j]);
		if(goodval2==false) br++;
		
		if(goodval2){
			var aangifteJaar = Interface.variable["dec31aangifte"];
			var jan1 = Interface.variable["jan12004"];
			var good=true;
			if((val2>aangifteJaar)||(val2<jan1)) good=false;
			
			show_hide_error(good, "#divV4-2-error-Ontbonden"+idsOntbonden[j]);
			if(good==false) br++;
		}		
		
	}
	if(br==0){
		return true;
	} else {
		return false;
	}
};
Workflow.validateAllFields = function(arr, idWoning, extraId){
	var good=true;
	var br=0;
	
	for(var i=0; i<arr.length; i++){
		if(arr[i].validation.length>0){
			
			var obj =arr[i].current;
			var condition = false;
			
			if(i==0) {
				condition=true;//always validate the first item of the array
			} else {
				if((idWoning+"")!="") { obj+="-Woning"+idWoning+extraId; }
				if($(obj).attr("class").indexOf("hidden")==-1){
					condition=true;
				} else {
					condition=false;
				}
			}
			
			
			if(condition){
				try{
					good=Workflow.Validations(arr[i].validation, idWoning, extraId); 
					
					if(good==false){br++;}
				} catch(err){}
			} 
		}
		
	}
	
	
	if(br==0){
		return true;
	} else {
		return false;
	}
};

Workflow.geschiktheid = new Array(new Interface.block("#divAangiftejaar", "#divV8-2", "", "conAangifte", ""),
		new Interface.block("#divAangiftejaarja", "#divV8-2", "", "", ""),
		new Interface.block("#divAangiftejaarnee", "", "#divV8-2,#divV8-3,#divV8-4,#divV8-5,#divV8-6,#divtussenresultaten", "", ""),
		new Interface.block("#divV8-2", "", "#divtussenresultaten,#divE8-1,#divE8-2,#divE8-3", "conV8-2", ""),
		new Interface.block("#divV8-2ja", "#divV8-3", "#divV8-4,#divV8-5,#divV8-6", "", ""),
		new Interface.block("#divV8-2nee", "#divE8-3,#divtussenresultaten", "#divV8-3,#divV8-4,#divV8-5,#divV8-6", "", ""),
		new Interface.block("#divV8-3", "", "#divtussenresultaten,#divE8-1,#divE8-2,#divE8-3", "conV8-3", ""),
		new Interface.block("#divV8-3ja", "#divV8-6", "#divV8-4,#divV8-5", "", ""),
		new Interface.block("#divV8-3nee", "#divV8-4", "#divV8-5,#divV8-6", "", ""),
		new Interface.block("#divV8-4", "", "#divtussenresultaten,#divE8-1,#divE8-2,#divE8-3", "conV8-4", ""),
		new Interface.block("#divV8-4ja", "#divV8-5", "#divV8-6", "", ""),
		new Interface.block("#divV8-4nee", "#divE8-2,#divtussenresultaten", "#divV8-5,#divV8-6", "", ""),
		new Interface.block("#divV8-5", "", "#divtussenresultaten,#divE8-1,#divE8-2,#divE8-3", "conV8-5", ""),
		new Interface.block("#divV8-5ja", "#divV8-6", "", "", ""),
		new Interface.block("#divV8-5nee", "#divE8-2,#divtussenresultaten", "#divV8-6", "", ""),
		new Interface.block("#divV8-6", "", "#divtussenresultaten,#divE8-1,#divE8-2,#divE8-3", "conV8-6", ""),
		new Interface.block("#divV8-6ja", "#divE8-2,#divtussenresultaten", "", "", ""),
		new Interface.block("#divV8-6nee", "#divE8-1,#divtussenresultaten", "", "", ""),
		new Interface.block("#divtussenresultaten", "", "", "", ""),
		new Interface.block("#divEbutton", "#woningContainer,#divButtons,#divVBereken,#mainTitle,#fsWoninginitiatie", "#divV8,#divtussenresultaten", "", "")

);

Workflow.panelWoning = new Array(new Interface.block("#divVPanelInit", "", "", "conVPanelInit", ""),
		new Interface.block("#divVPanel11", "", "", "conVPanel1", ""),
		new Interface.block("#divVPanel22", "", "", "conVPanel2", ""),
		new Interface.block("#divVPanel33", "", "", "conVPanel3", ""),
		new Interface.block("#divVPanel44", "", "", "conVPanel4", ""),
		new Interface.block("#divVPanel55", "", "", "conVPanel5", ""),
		new Interface.block("#divVPanel66", "#divVPanelButton", "", "conVPanel6", "")

);
Workflow.aankoopWorkflow = new Array(new Interface.block("#initAankoop","", "#divV1Save", "conInit", ""), 
									new Interface.block("#divV1-1b", "", "", "conV1-1e", "valV1-1b"),	
									new Interface.block("#divV1-1eja", "#divV1-1f", "", "", ""),
									new Interface.block("#divV1-1enee", "", "", "conV1-1f", ""),
									new Interface.block("#divV0-4", "#divV0-5", "", "", ""),
									new Interface.block("#divV0-5", "#divV1Save", "", "", "valV0-5"),
									new Interface.block("#divV1-1f", "", "", "conV1-1f", ""),
									
									new Interface.block("#divV1-1bja", "#divV1-1d", "", "", ""),
									new Interface.block("#divV1-1bnee", "#divV1-1c", "", "", ""),
									new Interface.block("#divV1-1c", "#divV1-1d", "", "", ""),
									new Interface.block("#divV1-1d", "#divV1-2", "", "", "valV1-1d"),
									
									
									new Interface.block("#divV1-2", "#divV1-3", "", "conV1-2", "valV1-2"),
									new Interface.block("#divV1-3", "#divV1-4","", "conV1-3", "valV1-3"),
									new Interface.block("#divV1-4","#divV1-5","", "conV1-4", "valV1-4"),
									new Interface.block("#divV1-5","","", "conV1-5", ""),
									new Interface.block("#divV1-5ja","#divV1-6","", "", ""),
									new Interface.block("#divV1-5nee","#divV1-8","#divV1-6", "", ""),
									new Interface.block("#divV1-6","#divV1-8","", "", "valV1-6"),
									
									new Interface.block("#divV1-8","","", "conV1-8", ""),
									new Interface.block("#divV1-8ja","#divV1-9","", "", ""),
									new Interface.block("#divV1-8nee","#divV1-7","#divV1-9", "", ""),
									new Interface.block("#divV1-9","#divV1-7","", "", "valV1-9"),
									
									new Interface.block("#divV1-7","","", "conV1-7", "valV1-7"),
									new Interface.block("#divV1-7+","#divV1-11","", "", ""),
									new Interface.block("#divV1-7-","#divV1Save","", "", ""),
									
									new Interface.block("#divV1-11","","", "conV1-11", ""),
									new Interface.block("#divV1-11ja","#divV1-12","", "", ""),
									new Interface.block("#divV1-11nee","#divV1Save","#divV1-12", "", ""),
									new Interface.block("#divV1-12","#divV1Save","", "conV1-12", "valV1-12")

);

Workflow.verkoopWorkflow = new Array(new Interface.block("#btnVerkoop","#divV2-1a", "", "", ""),
									new Interface.block("#divV2-1a","","#divV2-1c","conV2-1a", "valV2-1a"),
									new Interface.block("#divV2-1a+","#divV2-2", "", "", ""),
									new Interface.block("#divV2-1a-","#divV2-1c", "", "", ""),
									new Interface.block("#divV2-1c","#divV2-2", "", "", ""),
									new Interface.block("#divV2-2","#divV2-3a", "", "", "valV2-2"),
									new Interface.block("#divV2-3a","#divV2-3b", "", "", "valV2-3a"),
									new Interface.block("#divV2-3b","", "", "conV2-3b", ""),
									new Interface.block("#divV2-3bja","#divV2-3c", "", "", ""),
									new Interface.block("#divV2-3bnee","", "#divV2-3c", "conV2-3c", ""),
									new Interface.block("#divV2-3c","", "", "conV2-3c", "valV2-3c"),
									new Interface.block("#divV2-3cja","#divV2-4", "", "", ""),
									new Interface.block("#divV2-3cnee","#divV2Save", "#divV2-4", "", ""),
									
									
									new Interface.block("#divV2-4","", "", "conV2-4", ""),
									new Interface.block("#divV2-4ja","#divV2-5", "#divV2Save", "", ""),
									new Interface.block("#divV2-4nee","#divV2Save", "#divV2-5", "", ""),
									new Interface.block("#divV2-5","", "", "conV2-5", "valV2-5"),
									new Interface.block("#divV2-5-","#divV2-7", "", "", ""),
									new Interface.block("#divV2-5+","#divV2Save", "#divV2-7", "", ""),
									new Interface.block("#divV2-7","#divV2Save", "", "", "valV2-7"),
									new Interface.block("#divV2Save","", "", "", "")

);

Workflow.aflossingWorkflow = new Array(new Interface.block("#initAflossing","#divV3-1b", "", "", ""),
									new Interface.block("#divV3-1b","#divV3-2", "", "", "valV3-1b"),
									new Interface.block("#divV3-2","#divV3Save", "", "", "valV3-2"),
									new Interface.block("#divV3Save","", "", "", "")

);

Workflow.verbouwingWorkflow = new Array(new Interface.block("#initVerbouwing","#divV5-2", "", "", ""),
									new Interface.block("#divV5-2","#divV5-3", "", "", "valV5-2"),
									new Interface.block("#divV5-3","#divV5-4", "", "", "valV5-3"),
									new Interface.block("#divV5-4","", "", "conV5-4", ""),
									new Interface.block("#divV5-4ja","#divV5-5", "#divV5Save", "", ""),
									new Interface.block("#divV5-4nee","#divV5Save", "#divV5-5,#divV5-6,#divV5-6,#divV5-7,#divV5-8,#divV5-9,#divV5-10,#divV5-11,#divV5-12", "", ""),
									new Interface.block("#divV5-5","#divV5-6", "", "", "valV5-5"),
									new Interface.block("#divV5-6","#divV5-7", "", "", "valV5-6"),
									//new Interface.block("#divV5-7","#divV5-8", "", "", ""),
									new Interface.block("#divV5-7","#divV5-11", "", "", ""),
									new Interface.block("#divV5-11","", "", "conV5-11", ""),
									new Interface.block("#divV5-11ja","#divV5-12", "", "", ""),
									//new Interface.block("#divV5-11nee","#divV5Save", "#divV5-12", "", ""),
									new Interface.block("#divV5-11nee","#divV5-8", "#divV5-12", "", ""),
									new Interface.block("#divV5-12","#divV5-8", "", "", "valV5-12"),
									
									new Interface.block("#divV5-8","", "", "conV5-8", ""),
									new Interface.block("#divV5-8ja","#divV5-9", "#divV5Save", "", ""),
									new Interface.block("#divV5-8nee","#divV5Save", "#divV5-9,#divV5-10", "", ""),
									new Interface.block("#divV5-9","#divV5-10", "", "conV5-9", "valV5-9"),
									new Interface.block("#divV5-10","#divV5Save", "", "", "valV5-10"),
									
									
									new Interface.block("#divV5Save","", "", "", "")

);

Workflow.eindcontroleWorkflow = new Array(new Interface.block("#initEindcontrole","", "", "conInitEindControle", "valInitEindControle"),
									new Interface.block("#divV6-0","", "", "conV6-0", ""),
									new Interface.block("#divV6-0ja","#divVOntbondenKoop", "", "", ""),
									new Interface.block("#divV6-0nee","", "#divVOntbondenKoop", "", ""),
									new Interface.block("#divV6-0sa","#divV6-1", "", "conV6-0sa", ""),
									
									new Interface.block("#divV6-1","", "", "conV6-1", ""),
									new Interface.block("#divV6-1ja","#divV6-2", "", "", ""),
									new Interface.block("#divV6-1nee","", "#divV6-2,#divV6-3,#divV6-5", "conVAdditionaleVragen", ""),
									new Interface.block("#divV6-2","#divV6-3", "", "conV6-2", "valV6-2"),
									new Interface.block("#divV6-2nee","", "#divV6-3,#divV6-5", "", ""),
									new Interface.block("#divV6-2ja","#divV6-3", "", "", ""),
									new Interface.block("#divV6-3","", "", "conV6-3", "valV6-3"),
									new Interface.block("#divV6-3-","#divV6-5", "", "", ""),
									new Interface.block("#divV6-3+","", "#divV6-5", "conVAdditionaleVragen", ""),
									new Interface.block("#divV6-5","", "", "conVAdditionaleVragen", "valV6-5"),
									new Interface.block("#divV6-0na","", "", "conVAdditionaleVragen", ""),
									new Interface.block("#divV6Save","", "", "", "")
									

);



function showObjects(){
	var html = "";
	//show Item Ids
/*
	html+="<br><b>Interface.itemIds</b><br>";
	for(i=0; i<Interface.itemIds.length; i++){
		html+="Interface.itemIds["+i+"]="+Interface.itemIds[i]+"<br>";
	}
	

	html+="<br><b>idsOntbonden</b><br>";
	for(i=0; i<idsOntbonden.length; i++){
		html+="idsOntbonden["+i+"]="+idsOntbonden[i]+"<br>";
	}
	
	
	
	//show mainWorkflow array
	html+="<br><b>mainWorkflow</b><br>--0= event doesn't exists; 1 = event exists; 2= event exists and already happened<br>";
	for(i=0; i<mainWorkflow.length; i++){
		html+="<b>"+mainWorkflow[i].woningidMachine+"</b><br>";
		for(var x in mainWorkflow[i]){
			if((x!="aankoop")&&(x!="verkoop")&&(x!="aflossing")&&(x!="ontbonden")&&(x!="verbouwing")){
				html+="mainWorkflow["+i+"]["+x+"] = " + mainWorkflow[i][x]+"<br>";
			} else {
				for(var s=0; s<mainWorkflow[i][x].length; s++){
					
						html+="mainWorkflow["+i+"]["+x+"]["+s+"] = " + mainWorkflow[i][x][s]+"<br>";
				
				}
			}			
		}
	}
	
	
	//show Bijleendata object
	html+="<br><b>Bijleendata</b><br>";
	for(var y in Bijleendata.Woningen){
		html+="<b>Bijleendata.Woningen["+ y + "]</b><br>";
		for(var x in Bijleendata.Woningen[y]){
			html+=x + " = " + Bijleendata.Woningen[y][x]+"<br>";
		}
	}

	//start Bijleen object
	html +="<br><b>Bijleen</b><br>";
	for(var y in Bijleen.Woningen){
		html+="<b>Bijleen.Woningen["+ y + "]</b><br>";
		for(var x in Bijleen.Woningen[y]){
			if(x!="woningidMachine"){
				html +="<u>[" + x + "]</u><br>";
			
				for(var s=0; s<Bijleen.Woningen[y][x].length; s++){
				
					//html +="["+s+"]<br>";
					for(var r in Bijleen.Woningen[y][x][s]){
						html+="["+x+"]["+s+"][" + r+"]=" + Bijleen.Woningen[y][x][s][r]+'<br>';
					}
				}
			}
		}
	}
	//end Bijleen object
	

	

	
	//end of mainWorkflow array
	//show Initiatie object

	html+="<br><b>Initiatie</b><br>";
	for(var y in Initiatie){
			
		html+="Initiatie["+y+"]" + " = " + Initiatie[y]+"<br>";
			
	}
	
	//show Persoon object

	html+="<br><b>Persoon</b><br>";
	for(var x in Persoon){
		for(var y in Persoon[x]){
			if(y!="ID"){
			
		
				for(var r=0; r<Persoon[x][y].length; r++){
					html+="Persoon["+x+"]["+y+"]["+r+"] = " + Persoon[x][y][r]+"<br>";
				
				}
			} else {
				html+="Persoon["+x+"]["+y+"]" + " = " + Persoon[x][y]+"<br>";
			}
		}	
	}
	//show Woning object

	html+="<br><b>Woning</b><br>";
	for(var y in Woning){
		for(var x in Woning[y]){
			html+="Woning["+y+"]["+x+"]" + " = " + Woning[y][x]+"<br>";
		}
			
	}
	
	//show WoningEigenaar object

	html+="<br><b>WoningEigenaar</b><br>";
	for(var y in WoningEigenaar){
		for(var x in WoningEigenaar[y]){
			html+="WoningEigenaar["+y+"]["+x+"]" + " = " + WoningEigenaar[y][x]+"<br>";
		}
			
	}
	




	//show eindcontrol
	html+="<br><b>Eindcontrol</b><br>";
	
		for(var f in Bijleen.EindControle){
			//alert(f)
			//if(f=="OntbondenKoop"){
				for(var r in Bijleen.EindControle[f]){
					if(f=="OntbondenKoop"){
						for(var t in Bijleen.EindControle[f][r]){
							html+="Bijleen.EindControle["+f+"]["+r+"]["+t+"]" + " = " + Bijleen.EindControle[f][r][t]+"<br>";
						}
					}
					else {
						html+="Bijleen.EindControle["+f+"]["+r+"]" + " = " + Bijleen.EindControle[f][r]+"<br>";
					}
				}
		
			
			
				
		}
			
	
	
	//show event order
	html+="<br><b>Event order</b><br>";
	for(var i=0; i<eventOrder.length; i++){
		for(var f in eventOrder[i]){
			html+="eventOrder["+i+"]["+f+"]" + " = " + eventOrder[i][f]+"<br>";
				
		}
			
	}
	
	
	$("#objectMonitor").html(html);
	*/
	
}