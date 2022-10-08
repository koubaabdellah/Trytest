function CaseInput(theCase){
	this.theCase = theCase;
}

CaseInput.prototype.getJaar = function() { return this.theCase.formValues['jaar']; }

CaseInput.prototype.getHtMin = function() { return this.theCase.htMin; }
CaseInput.prototype.getKtMin = function() { return this.theCase.ktMin; }
CaseInput.prototype.getKgbMin = function() { return this.theCase.kgbMin; }
CaseInput.prototype.getKotMin = function() { return this.theCase.kotMin; }
CaseInput.prototype.getZtMin = function() { return this.theCase.ztMin; }

CaseInput.prototype.getHuurToeslag = function() { return this.getHtMin() ? 'nee' : this.theCase.formValues['huurtoeslag']; }
CaseInput.prototype.getKindgebondenBudget = function() { return this.getKgbMin() ? 'nee' : this.theCase.formValues['kindgebondenbudget']; }
CaseInput.prototype.getKinderopvangtoeslag = function() { return this.getKotMin() ? 'nee' : this.theCase.formValues['kinderopvangtoeslag']; }
CaseInput.prototype.getZorgtoeslag = function() { return this.getZtMin() ? 'nee' : this.theCase.formValues['zorgtoeslag']; }

CaseInput.prototype.getAanvragerGeboortejaar = function() { return this.theCase.formValues['aanvrager-geboortejaar']; }
CaseInput.prototype.getAanvragerAchtienPlus = function() { return this.theCase.formValues['aanvrager-achtien-plus']; }
CaseInput.prototype.getAanvragerGetrouwd = function() { return this.theCase.formValues['aanvrager-getrouwd']; }
CaseInput.prototype.getAanvragerWees = function() { return this.theCase.formValues['aanvrager-wees']; }
CaseInput.prototype.getAanvragerKind = function() { return this.theCase.formValues['aanvrager-kind']; }
CaseInput.prototype.getAanvragerWoonland= function() { return this.theCase.formValues['aanvrager-woonland']; }
CaseInput.prototype.getAanvragerInkomenNl= function() { return this.theCase.formValues['aanvrager-inkomen-nl']; }
CaseInput.prototype.getAanvragerKinderen = function() { return this.theCase.formValues['aanvrager-kinderen']; }
CaseInput.prototype.getAanvragerWerk = function() { return this.theCase.formValues['aanvrager-werk']; }
CaseInput.prototype.getAanvragerBijdrage = function() { return this.theCase.formValues['aanvrager-bijdrage']; }
CaseInput.prototype.getAanvragerToetsingsinkomen = function() { return this.theCase.formValues['aanvrager-toetsingsinkomen']; }
CaseInput.prototype.getAanvragerToeslagpartner = function() { return this.theCase.formValues['aanvrager-toeslagpartner']; }

CaseInput.prototype.getToeslagpartnerZelfdeAdres = function() { return this.theCase.formValues['toeslagpartner-zelfde-adres']; }
CaseInput.prototype.getToeslagpartnerGeboortejaar = function() { return this.theCase.formValues['toeslagpartner-geboortejaar']; }
CaseInput.prototype.getToeslagpartnerAchtienPlus = function() { return this.theCase.formValues['toeslagpartner-achtien-plus']; }
CaseInput.prototype.getToeslagpartnerWoonland = function() { return this.theCase.formValues['toeslagpartner-woonland']; }
CaseInput.prototype.getToeslagpartnerInkomenNl= function() { return this.theCase.formValues['toeslagpartner-inkomen-nl']; }
CaseInput.prototype.getToeslagpartnerCvz = function() { return this.theCase.formValues['toeslagpartner-cvz']; }
CaseInput.prototype.getToeslagpartnerWerk = function() { return this.theCase.formValues['toeslagpartner-werk']; }
CaseInput.prototype.getToeslagpartnerBijdrage = function() { return this.theCase.formValues['toeslagpartner-bijdrage']; }
CaseInput.prototype.getToeslagpartnerToetsingsinkomen = function() { return this.theCase.formValues['toeslagpartner-toetsingsinkomen']; }

CaseInput.prototype.getGezamenlijkWerkurenAanvrager = function() { return this.theCase.formValues['gezamenlijk-werkuren-aanvrager']; }
CaseInput.prototype.getGezamenlijkMinstWerkende = function() { return this.theCase.formValues['gezamenlijk-minst-werkende']; }
CaseInput.prototype.getGezamenlijkWerkurenToeslagpartner = function() { return this.theCase.formValues['gezamenlijk-werkuren-toeslagpartner']; }

CaseInput.prototype.getKindKbAanvr = function(index) { return this.theCase.formValues['kind-kb-aanvr-' + index]; }
CaseInput.prototype.getKindKbKind = function(index) { return this.theCase.formValues['kind-kb-kind-' + index]; }
CaseInput.prototype.getKindOnderhoud = function(index) { return this.theCase.formValues['kind-onderhoud-' + index]; }
CaseInput.prototype.getKindOnderhoudA = function(index) { return this.theCase.formValues['kind-onderhoud-a-' + index]; }
CaseInput.prototype.getKindOnderhoudB = function(index) { return this.theCase.formValues['kind-onderhoud-b-' + index]; }
CaseInput.prototype.getKindInkomensgrens = function(index) { return this.theCase.formValues['kind-inkomensgrens-' + index]; }
CaseInput.prototype.getKindInkomensgrensA = function(index) { return this.theCase.formValues['kind-inkomensgrens-a-' + index]; }
CaseInput.prototype.getKindInkomensgrensB = function(index) { return this.theCase.formValues['kind-inkomensgrens-b-' + index]; }
CaseInput.prototype.getKindOpvang = function(index) { return this.theCase.formValues['kind-opvang-' + index]; }
CaseInput.prototype.getKindKinderopvangAantal = function(index) { return this.theCase.formValues['kind-kinderopvang-aantal-' + index]; }
CaseInput.prototype.getKindSoortOpvanginstelling = function(kindNr, opvangNr) { return this.theCase.formValues['kind-soortopvanginstelling-' + kindNr + '-' + opvangNr]; }
CaseInput.prototype.getKindUren = function(kindNr, opvangNr ) { return this.theCase.formValues['kind-uren-' + kindNr + "-" + opvangNr]; }
CaseInput.prototype.getKindUurprijs = function(kindNr, opvangNr) { return this.theCase.formValues['kind-uurprijs-' + kindNr + "-" + opvangNr]; }

CaseInput.prototype.getKindWerkgeversbijdrageAanvrager = function(index) { return this.theCase.formValues['kind-werkgeversbijdrage-aanvrager-' + index]; }
CaseInput.prototype.getKindWerkgeversbijdrageAanvragerBedrag = function(index) { return this.theCase.formValues['kind-werkgeversbijdrage-aanvrager-bedrag-' + index]; }
CaseInput.prototype.getKindWerkgeversbijdragePartner = function(index) { return this.theCase.formValues['kind-werkgeversbijdrage-partner-' + index]; }
CaseInput.prototype.getKindWerkgeversbijdragePartnerBedrag = function(index) { return this.theCase.formValues['kind-werkgeversbijdrage-partner-bedrag-' + index]; }
CaseInput.prototype.getKindBijdrageAanvrager = function(index) { return this.theCase.formValues['kind-bijdrage-aanvrager-' + index]; }
CaseInput.prototype.getKindBijdrageAanvragerBedrag = function(index) { return this.theCase.formValues['kind-bijdrage-aanvrager-bedrag-' + index]; }
CaseInput.prototype.getKindBijdragePartner = function(index) { return this.theCase.formValues['kind-bijdrage-partner-' + index]; }
CaseInput.prototype.getKindBijdragePartnerBedrag = function(index) { return this.theCase.formValues['kind-bijdrage-partner-bedrag-' + index]; }

CaseInput.prototype.getWoningOpKamers = function() { return this.theCase.formValues['woning-op-kamers']; }
CaseInput.prototype.getWoningAangewezen = function() { return this.theCase.formValues['woning-aangewezen']; }
CaseInput.prototype.getWoningAangepast = function() { return this.theCase.formValues['woning-aangepast']; }
CaseInput.prototype.getWoning23Min = function() { return this.theCase.formValues['woning-23-min']; }
CaseInput.prototype.getWoningKind = function() { return this.theCase.formValues['woning-kind']; }
CaseInput.prototype.getWoningHandicap = function() { return this.theCase.formValues['woning-handicap']; }
CaseInput.prototype.getWoningGarage = function() { return this.theCase.formValues['woning-garage']; }
CaseInput.prototype.getWoningHTjaar = function() { return this.theCase.formValues['woning-htjaar']; }
CaseInput.prototype.getWoningHuur = function() { return this.theCase.formValues['woning-huur']; }
CaseInput.prototype.getWoningServicekosten = function() { return this.theCase.formValues['woning-servicekosten']; }
CaseInput.prototype.getWoningOnderhuur = function() { return this.theCase.formValues['woning-onderhuur']; }
CaseInput.prototype.getWoningMedebewoners = function() { return this.theCase.formValues['woning-medebewoners']; }

CaseInput.prototype.getMedebewonerGeboortejaar = function(index) { return this.theCase.formValues['medebewoner-geboortejaar-' + index]; }
CaseInput.prototype.getMedebewonerToetsingsinkomen = function(index) { return this.theCase.formValues['medebewoner-toetsingsinkomen-' + index]; }
CaseInput.prototype.getMedebewonerKind = function(index) { return this.theCase.formValues['medebewoner-kind-' + index]; }


// afgeleide waarden
CaseInput.prototype.getAanvragerLeeftijd = function() { return this.theCase['aanvrager-leeftijd']; }
CaseInput.prototype.getToeslagpartnerLeeftijd = function() { return this.theCase['toeslagpartner-leeftijd']; }
CaseInput.prototype.getMedebewonerLeeftijd = function(medebewonerNr) { return this.theCase['medebewoner-leeftijd-' + medebewonerNr]; }
CaseInput.prototype.getKindLeeftijd = function(kindNr) { return this.theCase['kind-leeftijd-' + kindNr]; }
