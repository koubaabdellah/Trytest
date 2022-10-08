var Toeslagen = Toeslagen || {};
Toeslagen.getElementsByClassName = function() {

	var elementsByClassName = {
		"input": ["jaar", "keuze-toeslagen", "huurtoeslag", "kindgebonden-budget", "kinderopvangtoeslag", "zorgtoeslag", "aanvrager-geboortedatum", "aanvrager-getrouwd", "aanvrager-kind", "aanvrager-wees", "aanvrager-woonland", "aanvrager-inkomen-nl", "aanvrager-toeslagpartner", "aanvrager-kinderen", "aanvrager-werk", "aanvrager-doelgroeper", "aanvrager-toetsingsinkomen", "toeslagpartner-zelfde-adres", "toeslagpartner-geboortedatum", "toeslagpartner-woonland", "toeslagpartner-inkomen-nl", "toeslagpartner-cvz", "toeslagpartner-werk", "toeslagpartner-doelgroeper", "toeslagpartner-toetsingsinkomen", "gezamenlijk-minst-werkende", "gezamenlijk-werkuren-aanvrager", "gezamenlijk-werkuren-toeslagpartner", "tussenresultaat-k-1", "tussenresultaat-k-1-doelgroeper", "tussenresultaat-k-2", "kind-geboortejaar-1", "kind-kb-aanvr-1", "kind-kb-kind-1", "kind-onderhoud-1", "kind-studiefinanciering-1", "kind-inkomensgrens-1", "kind-opvang-1", "kind-kinderopvang-1", "kind-geboortejaar-2", "kind-kb-aanvr-2", "kind-kb-kind-2", "kind-onderhoud-2", "kind-studiefinanciering-2", "kind-inkomensgrens-2", "kind-opvang-2", "kind-kinderopvang-2", "kind-geboortejaar-3", "kind-kb-aanvr-3", "kind-kb-kind-3", "kind-onderhoud-3", "kind-studiefinanciering-3", "kind-inkomensgrens-3", "kind-opvang-3", "kind-kinderopvang-3", "kind-geboortejaar-4", "kind-kb-aanvr-4", "kind-kb-kind-4", "kind-onderhoud-4", "kind-studiefinanciering-4", "kind-inkomensgrens-4", "kind-opvang-4", "kind-kinderopvang-4", "kind-geboortejaar-5", "kind-kb-aanvr-5", "kind-kb-kind-5", "kind-onderhoud-5", "kind-studiefinanciering-5", "kind-inkomensgrens-5", "kind-opvang-5", "kind-kinderopvang-5", "kind-geboortejaar-6", "kind-kb-aanvr-6", "kind-kb-kind-6", "kind-onderhoud-6", "kind-studiefinanciering-6", "kind-inkomensgrens-6", "kind-opvang-6", "kind-kinderopvang-6", "kind-geboortejaar-7", "kind-kb-aanvr-7", "kind-kb-kind-7", "kind-onderhoud-7", "kind-studiefinanciering-7", "kind-inkomensgrens-7", "kind-opvang-7", "kind-kinderopvang-7", "kind-geboortejaar-8", "kind-kb-aanvr-8", "kind-kb-kind-8", "kind-onderhoud-8", "kind-studiefinanciering-8", "kind-inkomensgrens-8", "kind-opvang-8", "kind-kinderopvang-8", "woning-op-kamers", "woning-aangewezen", "woning-aangepast", "woning-medebewoners", "woning-23-min", "woning-kind", "woning-handicap", "woning-garage", "woning-huur", "woning-servicekosten", "woning-onderhuur", "medebewoner-geboortedatum-1", "medebewoner-kind-1", "medebewoner-toetsingsinkomen-1", "medebewoner-geboortedatum-2", "medebewoner-kind-2", "medebewoner-toetsingsinkomen-2", "medebewoner-geboortedatum-3", "medebewoner-kind-3", "medebewoner-toetsingsinkomen-3", "medebewoner-geboortedatum-4", "medebewoner-kind-4", "medebewoner-toetsingsinkomen-4", "medebewoner-geboortedatum-5", "medebewoner-kind-5", "medebewoner-toetsingsinkomen-5", "vt-gezamenlijk-vermogen-ht", "vt-enkel-vermogen-ht", "vt-enkel-vermogen-ht-medebewoner", "vt-gezamenlijk-vermogen-zt-kgb", "vt-enkel-vermogen-zt-kgb"], 
		"block": ["fsIntroductie", "fsAanvrager", "fsToeslagpartner", "fsGezamenlijk", "fsKinderen", "fsKind-1", "fsKind-2", "fsKind-3", "fsKind-4", "fsKind-5", "fsKind-6", "fsKind-7", "fsKind-8", "fsWoning", "fsMedebewoner", "fsMedebewoner-1", "fsMedebewoner-2", "fsMedebewoner-3", "fsMedebewoner-4", "fsMedebewoner-5", "fsVermogenstoets"], 
		"end-result": ["eindresultaat-samenvatting-geen-toeslagen", "eindresultaat-samenvatting-toeslagen", "eindresultaat-wijzigen-button-1", "eindresultaat-disclaimer-1", "eindresultaat-huurtoeslag-geselecteerd-geen-huurtoeslag-onder-18", "eindresultaat-huurtoeslag-geen-huurtoeslag-wonen-in-buitenland", "eindresultaat-huurtoeslag-geen-huurtoeslag-op-kamers", "eindresultaat-huurtoeslag-geen-huurtoeslag-boven-huurgrens", "eindresultaat-huurtoeslag-geen-huurtoeslag-boven-doelgroepgrens", "eindresultaat-huurtoeslag-geen-huurtoeslag-te-lage-huur", "eindresultaat-huurtoeslag-geen-huurtoeslag-te-veel-vermogen", "eindresultaat-huurtoeslag-geen-huurtoeslag-te-veel-vermogen_medebewoner", "eindresultaat-huurtoeslag-bedrag-berekende-huurtoeslag-is-nul", "eindresultaat-huurtoeslag-geen-huurtoeslag-onder-uitbetalingsgrens", "eindresultaat-huurtoeslag-overige-gevallen", "eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-zonder-kinderen-onder-18", "eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-zonder-kinderen-die-aan-voorwaarden-voldoen", "eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-bij-te-hoog-inkomen", "eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-te-veel-vermogen", "eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-onder-uitbetalingsgrens", "eindresultaat-kindgebonden-budget-alle-overige-gevallen", "eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag-zonder-kinderen-onder-achtien", "eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag-geen-gebruikmaking", "eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag", "eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag-onder-uitbetalingsgrens", "eindresultaat-kinderopvangtoeslag-alle-overige-gevallen", "eindresultaat-zorgtoeslag-1-1", "eindresultaat-zorgtoeslag-geen-zorgtoeslag-aanvrager-jonger-dan-18", "eindresultaat-zorgtoeslag-geen-zorgtoeslag-aanvrager-in-ander-land", "eindresultaat-zorgtoeslag-geen-zorgtoeslag-aanvrager-geen-inkomen-nederland", "eindresultaat-zorgtoeslag-geen-zorgtoeslag-inkomen-te-hoog", "eindresultaat-zorgtoeslag-geen-zorgtoeslag-gezamenlijk-inkomen-te-hoog", "eindresultaat-zorgtoeslag-geen-zorgtoeslag-te-veel-vermogen", "eindresultaat-zorgtoeslag-geen-zorgtoeslag-onder-uitbetalingsgrens", "eindresultaat-zorgtoeslag-alle-overige-gevallen", "eindresultaat-wijzigen-button-2", "eindresultaat-disclaimer-2"], 
		"input-woonland": ["select-aanvrager-woonland", "select-toeslagpartner-woonland"], 
		"input-aanvrager-inkomen-nl": ["select-aanvrager-inkomen-nl"], 
		"input-toeslagpartner-inkomen-nl": ["select-toeslagpartner-inkomen-nl"], 
		"input-geboortedatum": ["input-aanvrager-geboortedatum", "input-toeslagpartner-geboortedatum", "input-medebewoner-geboortedatum-1", "input-medebewoner-geboortedatum-2", "input-medebewoner-geboortedatum-3", "input-medebewoner-geboortedatum-4", "input-medebewoner-geboortedatum-5"], 
		"input-geboortejaar": [], 
		"input-woning-geboortejaar": [], 
		"input-kind-geboortejaar": ["select-kind-geboortejaar-1", "select-kind-geboortejaar-2", "select-kind-geboortejaar-3", "select-kind-geboortejaar-4", "select-kind-geboortejaar-5", "select-kind-geboortejaar-6", "select-kind-geboortejaar-7", "select-kind-geboortejaar-8"], 
		"woning-htjaar": [], 
		"dit-jaar": ["id222038", "id222404", "id233897", "id233985", "id234159", "id234263", "id234429", "id234449", "id234539", "id234564", "id233586", "id235021", "id235134", "id235190", "id235188", "id235283", "id235308", "id235314", "id235397", "id235390", "id235417", "id235484", "id235501", "id235493", "id235543", "id235580", "id235573", "id235612", "id235646", "id235709", "id235702", "id235735", "id235764", "id235825", "id235819", "id235867", "id235895", "id235897", "id235939", "id235949", "id235996", "id236005", "id236058", "id236076", "id236108", "id236102", "id236162", "id236188", "id236219", "id236237", "id236902", "id236890", "id236891", "id236958", "id236998", "id236987", "id238438", "id238447", "id238480", "id238524", "id238609", "id238795", "id238805", "id238822", "id239057", "id239106", "id239313", "id239328", "id239334", "id239502", "id239533", "id239874", "id240192", "id242162", "id242161", "id242527"], 
		"vorig-jaar": ["id232574"], 
		"jaar-plus-1": ["id235164"], 
		"jaar-uit-bet-grns": ["id236848", "id236851", "id236886", "id234986", "id238439", "id238441", "id238797", "id238812", "id238794", "id239303", "id239287", "id239346"], 
		"jaar-bovengrens": [], 
		"jaar-ohga": [], 
		"jaar-ohgb": [], 
		"jaar-igta": [], 
		"jaar-igua": ["id223440", "id224899", "id225836", "id226900", "id228095", "id227672", "id229927", "id231946"], 
		"jaar-igtb": [], 
		"jaar-igub": [], 
		"jaar-vsvb": ["id240436"], 
		"jaar-mx-ink-1": ["id239229"], 
		"jaar-mx-ink-2": ["id239214"], 
		"toeslagpartner-leeftijd-plus-1": ["id235313"], 
		"toeslagpartner-geboortejaar-min-1": ["id235343"], 
		"kind-soortopvanginstelling-maxuren": [], 
		"aanvrager-geboortejaar-min-1": ["id235235", "id235234", "id235256"], 
		"aanvrager-leeftijd-plus-1": ["id235187"], 
		"aanvrager-leeftijd-plus-1": ["id235187"], 
		"htjaar-mx-sk": ["id242402"], 
		"htjaar-mx-rubr": ["id242408"], 
		"doelgroepgrens": ["id236657"], 
		"huurtoeslag": ["id236368", "id236914"], 
		"basishuur": ["id236737"], 
		"huurgrens": ["id236603"], 
		"kindertoeslag": [], 
		"kindgebonden-budget": ["id236405", "id238494"], 
		"kinderopvangtoeslag": ["id236387", "id238855"], 
		"kinderopvangtoeslag-1": ["id238889"], 
		"kinderopvangtoeslag-2": ["id238901"], 
		"kinderopvangtoeslag-3": ["id238930"], 
		"kinderopvangtoeslag-4": ["id238965"], 
		"kinderopvangtoeslag-5": ["id238987"], 
		"kinderopvangtoeslag-6": ["id238993"], 
		"kinderopvangtoeslag-7": ["id239016"], 
		"kinderopvangtoeslag-8": ["id239019"], 
		"zorgtoeslag": ["id236435", "id239387"], 
		"totaal-toeslag": ["id236411"], 
		"medebewoner-leeftijd-1-plus-1": [], 
		"medebewoner-leeftijd-2-plus-1": [], 
		"medebewoner-leeftijd-3-plus-1": [], 
		"medebewoner-leeftijd-4-plus-1": [], 
		"medebewoner-leeftijd-5-plus-1": [], 
		"medebewoner-geboortejaar-1-min-1": [], 
		"medebewoner-geboortejaar-2-min-1": [], 
		"medebewoner-geboortejaar-3-min-1": [], 
		"medebewoner-geboortejaar-4-min-1": [], 
		"medebewoner-geboortejaar-5-min-1": [], 
		"kind-geboortejaar-1-min-1": ["id235822", "id236047"], 
		"kind-geboortejaar-2-min-1": ["id235848", "id236081"], 
		"kind-geboortejaar-3-min-1": ["id235906", "id236136"], 
		"kind-geboortejaar-4-min-1": ["id235922", "id236158"], 
		"kind-geboortejaar-5-min-1": ["id235942", "id236143"], 
		"kind-geboortejaar-6-min-1": ["id235966", "id236191"], 
		"kind-geboortejaar-7-min-1": ["id235990", "id236221"], 
		"kind-geboortejaar-8-min-1": ["id236032", "id236290"], 
		"kind-leeftijd-1-plus-1": ["id235382"], 
		"kind-leeftijd-2-plus-1": ["id235380"], 
		"kind-leeftijd-3-plus-1": ["id235428"], 
		"kind-leeftijd-4-plus-1": ["id235462"], 
		"kind-leeftijd-5-plus-1": ["id235453"], 
		"kind-leeftijd-6-plus-1": ["id235496"], 
		"kind-leeftijd-7-plus-1": ["id235559"], 
		"kind-leeftijd-8-plus-1": ["id235597"], 
		"kind-leeftijd-1-plus-1b": ["id235566"], 
		"kind-leeftijd-2-plus-1b": ["id235634"], 
		"kind-leeftijd-3-plus-1b": ["id235668"], 
		"kind-leeftijd-4-plus-1b": ["id235706"], 
		"kind-leeftijd-5-plus-1b": ["id235691"], 
		"kind-leeftijd-6-plus-1b": ["id235746"], 
		"kind-leeftijd-7-plus-1b": ["id235763"], 
		"kind-leeftijd-8-plus-1b": ["id235786"], 
		"jaar-vrij-ht-65-enkel": ["id234527", "id234599"], 
		"jaar-vrij-ht-65-gez": ["id234442"], 
		"jaar-vrij-zt-kgb-65-enkel": ["id235003"], 
		"jaar-vrij-zt-kgb-65-gez": ["id233580"], 
		"vh-kgb-geen-tp": ["id238567"], 
		"visible-for-ht": ["id235180"], 
		"visible-for-zt": ["id235231", "id235262", "id235303", "id235361"], 
		"visible-for-not-zt": ["id236578", "id236632", "id236708", "id236903"], 
		"visible-for-kgb": ["id240397"], 
		"visible-for-kot": [], 
		"visible-for-2014": [], 
		"visible-for-2015": [], 
		"visible-from-2014": [], 
		"visible-from-2015": [], 
		"visible-for-kind": ["id223094"], 
		"visible-for-kinderen": ["id223082"], 
		"visible-for-medebewoner": ["id233748"], 
		"visible-for-medebewoners": ["id233774"], 
		"visible-for-toeslagpartner": ["id221850", "id222019", "id234930", "id238690", "id239364", "id239435"], 
		"visible-for-not-toeslagpartner": ["id221826", "id238672", "id239385", "id239398"], 
		"visible-for-woning-aangepast": ["id236924"], 
		"visible-for-toeslagpartner-not-18-plus": ["id239369"], 
		"visible-for-result-huurtoeslag": ["id236336"], 
		"visible-for-result-kindertoeslag": [], 
		"visible-for-result-kindgebonden-budget": ["id236362"], 
		"visible-for-result-kgb-alleenstaande-ouder": ["id238558"], 
		"visible-for-result-kinderopvangtoeslag": ["id236383"], 
		"visible-for-result-zorgtoeslag": ["id236392"], 
		"visible-for-huishouden-mph-or-mph-65-plus": ["id236651", "id236804"], 
		"visible-for-aanvrager-jonger-23-met-tp-of-medebewoner": ["id236604"], 
		"visible-for-kind-inkomensgrens-vanaf-2015-1": [], 
		"visible-for-kind-inkomensgrens-vanaf-2015-2": [], 
		"visible-for-kind-inkomensgrens-vanaf-2015-3": [], 
		"visible-for-kind-inkomensgrens-vanaf-2015-4": [], 
		"visible-for-kind-inkomensgrens-vanaf-2015-5": [], 
		"visible-for-kind-inkomensgrens-vanaf-2015-6": [], 
		"visible-for-kind-inkomensgrens-vanaf-2015-7": [], 
		"visible-for-kind-inkomensgrens-vanaf-2015-8": [], 
		"visible-geen-KOT-1": ["id238738"], 
		"visible-geen-KOT-2": ["id238728"], 
		"visible-geen-KOT-3": ["id238740"], 
		"visible-geen-KOT-4": ["id238776"], 
		"visible-for-kindopvang-2-plus": ["id238861", "id239033"], 
		"visible-for-kindopvang-1": ["id238875"], 
		"visible-for-kindopvang-2": ["id238899"], 
		"visible-for-kindopvang-3": ["id238906"], 
		"visible-for-kindopvang-4": ["id238971"], 
		"visible-for-kindopvang-5": ["id238966"], 
		"visible-for-kindopvang-6": ["id239007"], 
		"visible-for-kindopvang-7": ["id239002"], 
		"visible-for-kindopvang-8": ["id239038"], 
		"visible-for-aanvrager-17": ["id235228", "id235248"], 
		"visible-for-toeslagpartner-17": ["id235349"], 
		"visible-for-aanvrager-64": [], 
		"visible-for-toeslagpartner-64": [], 
		"visible-for-medebewoner-64-1": [], 
		"visible-for-medebewoner-64-2": [], 
		"visible-for-medebewoner-64-3": [], 
		"visible-for-medebewoner-64-4": [], 
		"visible-for-medebewoner-64-5": [], 
		"kinderopvangtoeslag-niet-afgerond": ["id239053"], 
		"link-toetsingsinkomen": ["id239931", "id240219", "id242557"], 
		"expandable-input-set": ["kind-kinderopvang-aantal-1", "kind-kinderopvang-aantal-2", "kind-kinderopvang-aantal-3", "kind-kinderopvang-aantal-4", "kind-kinderopvang-aantal-5", "kind-kinderopvang-aantal-6", "kind-kinderopvang-aantal-7", "kind-kinderopvang-aantal-8"], 
		"input-set-amount": ["kind-kinderopvang-aantal-1-amount", "kind-kinderopvang-aantal-2-amount", "kind-kinderopvang-aantal-3-amount", "kind-kinderopvang-aantal-4-amount", "kind-kinderopvang-aantal-5-amount", "kind-kinderopvang-aantal-6-amount", "kind-kinderopvang-aantal-7-amount", "kind-kinderopvang-aantal-8-amount"]
	};

	return function( className ) {
		if( elementsByClassName[className] != undefined ) {
			var results = [];
			for( var i = 0; i < elementsByClassName[className].length; ++i ) {
				results.push( document.getElementById( elementsByClassName[className][i] ) );
			}
			return results;
		} else {
			console.log( "did not find class " + className );
			return [];
		}
	}
}();
