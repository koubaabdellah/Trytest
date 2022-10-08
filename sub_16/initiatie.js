var Initiatie =Initiatie || {};
var numWoningenVoor2004=1;
var Persoon = new Array();
var idPersoon = "eigenaar1";

var Woning = Woning ||{};
var WoningEigenaar = WoningEigenaar ||{};

function initPersoon(){
	Persoon[idPersoon] = {};
	
	Persoon[idPersoon].ID = idPersoon;
	Persoon[idPersoon].EWR = new Array();
	Persoon[idPersoon].EWR_datum = new Array();
	/*Persoon[idPersoon].copie_EWR = new Array();
	Persoon[idPersoon].copie_EWR_datum = new Array();*/
}
function initInitiatie(){
	initPersoon();
	
	eventOrder=new Array();
	Woning = {};
	WoningEigenaar = {};
	
	if((Initiatie.woningID1!="")&&(Initiatie.woningID1!=undefined)){
		Woning[Initiatie.woningIDMachine1] = {};
		Woning[Initiatie.woningIDMachine1].ID = Initiatie.woningID1;

		WoningEigenaar[Initiatie.woningIDMachine1] = {};
		WoningEigenaar[Initiatie.woningIDMachine1].persoonID     = idPersoon;
		WoningEigenaar[Initiatie.woningIDMachine1].woningID      = Initiatie.woningID1;
		WoningEigenaar[Initiatie.woningIDMachine1].woningidMachine      = Initiatie.woningIDMachine1;
		
		WoningEigenaar[Initiatie.woningIDMachine1].EWS  = Initiatie.lening_woning1;
		WoningEigenaar[Initiatie.woningIDMachine1].lening  = Initiatie.lening_woning1;
		WoningEigenaar[Initiatie.woningIDMachine1].bezit_1jan2004  = "ja";
		WoningEigenaar[Initiatie.woningIDMachine1].lening_financiering="0";
		WoningEigenaar[Initiatie.woningIDMachine1].aankoopdatum  = Initiatie.aankoopdatum1;
		WoningEigenaar[Initiatie.woningIDMachine1].verkoopdatum  = Initiatie.verkoopdatum1;
		WoningEigenaar[Initiatie.woningIDMachine1].schenking     = "0";
		WoningEigenaar[Initiatie.woningIDMachine1].copie_EWR = new Array(); 
		WoningEigenaar[Initiatie.woningIDMachine1].copie_EWR_datum = new Array(); 
		
	}

	if((Initiatie.woningID2!="")&&(Initiatie.woningID2!=undefined)){
		Woning[Initiatie.woningIDMachine2] = {};
		Woning[Initiatie.woningIDMachine2].ID = Initiatie.woningID1;

		WoningEigenaar[Initiatie.woningIDMachine2] = {};
		WoningEigenaar[Initiatie.woningIDMachine2].persoonID     = idPersoon;
		WoningEigenaar[Initiatie.woningIDMachine2].woningID      = Initiatie.woningID2;
		WoningEigenaar[Initiatie.woningIDMachine2].woningidMachine      = Initiatie.woningIDMachine2;
		
		WoningEigenaar[Initiatie.woningIDMachine2].EWS  = Initiatie.lening_woning2;
		WoningEigenaar[Initiatie.woningIDMachine2].lening  = Initiatie.lening_woning2;
		WoningEigenaar[Initiatie.woningIDMachine2].bezit_1jan2004  = "ja";
		WoningEigenaar[Initiatie.woningIDMachine2].lening_financiering="0";
		
		WoningEigenaar[Initiatie.woningIDMachine2].aankoopdatum  = Initiatie.aankoopdatum2;
		WoningEigenaar[Initiatie.woningIDMachine2].verkoopdatum  = Initiatie.verkoopdatum2;
		WoningEigenaar[Initiatie.woningIDMachine2].schenking     = "0";
		WoningEigenaar[Initiatie.woningIDMachine2].copie_EWR = new Array(); 
		WoningEigenaar[Initiatie.woningIDMachine2].copie_EWR_datum = new Array(); 
	}
	
	showObjects();

}

function addInitiatie(woningidMachine, idWoning, extraId){
	
	//var woningidMachine = idWoning.replace(/ /g,"_"); //replace spaces with _

	var idx ="";
	if(Initiatie.woningIDMachine1==woningidMachine){
		idx=1;
	} else {
		if(Initiatie.woningIDMachine2==woningidMachine){
			idx=2;
		}
	}
	
	if(numWoningenVoor2004<3){
		if(idx==""){
			idx=numWoningenVoor2004;
			numWoningenVoor2004++;
		}
		var lening = currencyToNumber(getInfoInitiatie("lening", woningidMachine, extraId));

		var aankoopdatum = Bijleendata.Woningen[woningidMachine].woning_aankoopdatum;
		(aankoopdatum==""?aankoopdatum='':aankoopdatum=aankoopdatum);
		
		var verkoopdatum = Bijleendata.Woningen[woningidMachine].woning_verkoopdatum;
		(verkoopdatum==""?verkoopdatum='':verkoopdatum=verkoopdatum);
		
		eval("Initiatie.woningID"+idx+"='"+idWoning+"'");
		eval("Initiatie.woningIDMachine"+idx+"='"+woningidMachine+"'");
		eval("Initiatie.lening_woning"+idx+"="+lening+"");
		eval("Initiatie.aankoopdatum"+idx+"=aankoopdatum");
		eval("Initiatie.verkoopdatum"+idx+"=verkoopdatum");
		
	} else {
		//if everything goes ok it will never come to this else because the error of more than 3 houses in bezit stops the program
		//alert("More than 2 houses < 1 jan 2004")
		
	}
	showObjects();

	
}