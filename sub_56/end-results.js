var Toeslagen = Toeslagen || {};
/**
 * get end result divs that have to be shown given a case
 *
 * @param theCase case
 *
 * @return array of divs id that have to be shown
 *
 * @note as a side effect, calculation results are added as case attributes
 */
Toeslagen.getEndResults = function (theCase) {
  var endResults = [];

  if (theCase.eindconclusie) {
    var toeslagenSelected = [];
    var toeslagenWelToeslag = [];

    var jaar = parseInt(theCase.formValues['jaar']);

    if (theCase['v_ht_boven64'] === "ja") {
      $(".visible-for-vt-ht-boven64").show();
    } else {
      $(".visible-for-vt-ht-boven64").hide();
    }
    if (theCase['v_ztkgb_boven64'] === "ja") {
      $(".visible-for-vt-ztkgb-boven64").show();
    } else {
      $(".visible-for-vt-ztkgb-boven64").hide();
    }

    if (theCase['aanvrager-aow'] === "ja" || theCase['aanvrager-aow-start-dit-jaar'] === "ja") {
      $(".vermogen-en-aow-dit-jaar").text("u");
      $(".vermogen-en-aow-dit-jaar-heeft").text("hebt");
    } else if (theCase['toeslagpartner-aow'] === "ja" || theCase['toeslagpartner-aow-start-dit-jaar'] === "ja") {
      $(".vermogen-en-aow-dit-jaar").text("uw toeslagpartner");
      $(".vermogen-en-aow-dit-jaar-heeft").text("heeft");
    } else if (theCase['medebewoner-aow'] === "ja" || theCase['medebewoner-aow-start-dit-jaar'] === "ja") {
      $(".vermogen-en-aow-dit-jaar").text("uw medebewoner");
      $(".vermogen-en-aow-dit-jaar-heeft").text("heeft");
    }

     // blok introductie, toon alleen 1-1 
     if (theCase.showConclusie1_1 === true){
       endResults.push("eindresultaat-zorgtoeslag-1-1");
       endResults.push("eindresultaat-wijzigen-button-2");
       return endResults; 
     }

    // HT
    if (theCase.formValues['huurtoeslag'] == 'ja') {
      if (theCase['v_HT_boven64'] === "ja") {
        $(".visible-for-ht-boven64").show();
      } else {
        $(".visible-for-v_HT_boven64").hide();
      }

      if (theCase['aanvrager-aow-start-dit-jaar'] === "ja") {
        $(".aow-starter-dit-jaar").text("U");
        $(".aow-start-dit-jaar").show();
      } else if (theCase['toeslagpartner-aow-start-dit-jaar'] === "ja") {
        $(".aow-starter-dit-jaar").text("Uw toeslagpartner");
        $(".aow-start-dit-jaar").show();
      } else if (theCase['medebewoner-aow-start-dit-jaar'] === "ja") {
        $(".aow-starter-dit-jaar").text("Uw medebewoner");
        $(".aow-start-dit-jaar").show();
      } else {
        $(".aow-start-dit-jaar").hide();
      }

      toeslagenSelected.push('huurtoeslag');

      if (theCase.formValues['aanvrager-achtien-plus'] == 'nee'
              && (parseInt(theCase.formValues['jaar']) >= 2016 || theCase.formValues['aanvrager-getrouwd'] == 'nee')
              && theCase.formValues['aanvrager-kind'] == 'nee'
              && theCase.formValues['aanvrager-wees'] == 'nee') {
        endResults.push("eindresultaat-huurtoeslag-geselecteerd-geen-huurtoeslag-onder-18");
      } else if (theCase.formValues['aanvrager-woonland'] != undefined && theCase.formValues['aanvrager-woonland'] != 'Nederland') {
        endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-wonen-in-buitenland");
      } else if (theCase.formValues['woning-op-kamers'] == 'ja' && theCase.formValues['woning-aangewezen'] == 'nee') {
        endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-op-kamers");
      } else {
        var jaarTableAccess = new Jaar(theCase.formValues['jaar']);
        var htjaarTableAccess = new HTjaar(theCase.formValues['woning-htjaar']);
        var htBerekening = new HtBerekening(htjaarTableAccess, new CaseInput(theCase));
        var rekenhuur = htBerekening.rekenhuur();
        var huurgrens = theCase['huurgrens'];
        var hhInkomen = htBerekening.hhInkomen();
        var doelgroepgrens = htBerekening.doelgroepgrens();
        var basishuur = htBerekening.basishuur();
        var huurtoeslag = htBerekening.huurtoeslag();
        var uitbetalingsgrens = jaarTableAccess.uitBetGrns();
        var huishouden = htBerekening.huishouden();

        theCase.doelgroepgrens = doelgroepgrens;
        theCase.rekenhuur = rekenhuur;
        theCase.huurtoeslag = huurtoeslag;
        theCase.huishouden = huishouden;

        if (theCase.formValues['woning-aangepast'] == 'nee' && (theCase['huur-na-garage'] > huurgrens || theCase['huur-voor-oh'] > huurgrens || rekenhuur > huurgrens)) {
          endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-boven-huurgrens");
        } else if (hhInkomen > doelgroepgrens && jaar <= 2019) { //zie 8.2.2.5
          endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-boven-doelgroepgrens");
        } else if (rekenhuur < basishuur && huurtoeslag !== 0) {
          endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-te-lage-huur");
        } else if (theCase.formValues['vt-gezamenlijk-vermogen-ht'] == 'ja' || theCase.formValues['vt-enkel-vermogen-ht'] == 'ja') {
          endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-te-veel-vermogen");
        } else if (theCase.formValues['vt-enkel-vermogen-ht-medebewoner'] == 'ja') {
          endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-te-veel-vermogen_medebewoner");
        } else if (jaar >= 2020 && huurtoeslag == 0) {
          endResults.push("eindresultaat-huurtoeslag-bedrag-berekende-huurtoeslag-is-nul");
        } else if (huurtoeslag < (uitbetalingsgrens / 12)) {
          endResults.push("eindresultaat-huurtoeslag-geen-huurtoeslag-onder-uitbetalingsgrens");
          toeslagenWelToeslag.push('huurtoeslag');
          theCase.huurtoeslag = 0;	// totaal op 0 euro zetten
        } else {
          endResults.push("eindresultaat-huurtoeslag-overige-gevallen");
          toeslagenWelToeslag.push('huurtoeslag');
        }
      }
    }

    // KGB
    if (theCase.formValues['kindgebonden-budget'] == 'ja') {
      toeslagenSelected.push('kindgebonden-budget');

      var jaarTableAccess = new Jaar(theCase.formValues['jaar']);
      var algemeenBerekening = new AlgemeenBerekening(jaarTableAccess, new CaseInput(theCase));
      var kindBerekeningKtKgb = new KindBerekeningKtKgb(new CaseInput(theCase));
      var kgbBerekening = new KgbBerekening(algemeenBerekening, kindBerekeningKtKgb, jaarTableAccess, new CaseInput(theCase));
      var jaarUitbetGrns = jaarTableAccess.uitBetGrns();

      var kinderenKgb = kgbBerekening.kinderenKgb();
      var kindgebondenBudget = kgbBerekening.kindgebondenBudget();

      theCase.kinderenKgb = kinderenKgb;
      theCase.uitBetGrns = jaarUitbetGrns;
      theCase["kindgebonden-budget"] = kindgebondenBudget;

      if (theCase.formValues['aanvrager-kinderen'] == 0) {
        endResults.push("eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-zonder-kinderen-onder-18");
      } else if (kinderenKgb == 0) {
        endResults.push("eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-zonder-kinderen-die-aan-voorwaarden-voldoen");
      } else {
        var kgbNaVermindering = kgbBerekening.kgbNaVermindering();
        if (kgbNaVermindering === 0) {
          endResults.push("eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-bij-te-hoog-inkomen");
        } else if (theCase.formValues['vt-gezamenlijk-vermogen-zt-kgb'] == 'ja' || theCase.formValues['vt-enkel-vermogen-zt-kgb'] == 'ja') {
          endResults.push("eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-te-veel-vermogen");
        } else if (kindgebondenBudget < (jaarUitbetGrns / 12)) {
          endResults.push("eindresultaat-kindgebonden-budget-geen-kindgebonden-budget-onder-uitbetalingsgrens");
          toeslagenWelToeslag.push('kindgebonden-budget');
          theCase['kindgebonden-budget'] = 0; // totaal op 0 euro zetten
        } else {
          endResults.push("eindresultaat-kindgebonden-budget-alle-overige-gevallen");
          toeslagenWelToeslag.push('kindgebonden-budget');
        }
      }

      if (theCase['v_ztkgb_boven64'] === "ja") {
        $(".visible-for-vt-ztkgb-boven64").show();
      } else {
        $(".visible-for-vt-ztkgb-boven64").hide();
      }

    }

    // KOT
    if (theCase.formValues.kinderopvangtoeslag == 'ja') {
      toeslagenSelected.push('kinderopvangtoeslag');
      var jaarTableAccess = new Jaar(theCase.formValues['jaar']);
      var algemeenBerekening = new AlgemeenBerekening(jaarTableAccess, new CaseInput(theCase));
      var kottTableAccess = new Kott(theCase.formValues['jaar']);
      var kindBerekening = new KindBerekening(algemeenBerekening, jaarTableAccess, kottTableAccess, new CaseInput(theCase));
      var kotBerekening = kindBerekening.kotBerekening;

      var aanvragerWerk = theCase.formValues['aanvrager-werk'];
      var aanvragerBijdrage = theCase.formValues['aanvrager-bijdrage'];
      var aanvragerDoelgroeper = theCase.formValues['aanvrager-doelgroeper'];
      var toeslagpartner = theCase.formValues['aanvrager-toeslagpartner'];
      var toeslagpartnerWerk = theCase.formValues['toeslagpartner-werk'];
      var toeslagpartnerBijdrage = theCase.formValues['toeslagpartner-bijdrage'];
      var toeslagpartnerDoelgroeper = theCase.formValues['toeslagpartner-doelgroeper'];
      var kinderopvangtoeslag = kotBerekening.kotTotaal(theCase.formValues['jaar']);
      var kinderopvangtoeslagNietAfgerond = kotBerekening.kotTotaalNietAfgerond(theCase.formValues['jaar']);
      var jaarUitbetGrns = jaarTableAccess.uitBetGrns();

      theCase.uitBetGrns = jaarUitbetGrns;
      theCase.kinderopvangtoeslag = kinderopvangtoeslag;
      theCase.kinderopvangtoeslagNietAfgerond = kinderopvangtoeslagNietAfgerond;
      var geenGebruik = 'ja';
      for (var i = 0; i < theCase.formValues['aanvrager-kinderen']; ++i) {
        var kindNr = i + 1;
        theCase['kinderopvangtoeslag-' + kindNr] = Math.round(kotBerekening.kot(kindNr, theCase.formValues['jaar']) * 100) / 100; //afronden op 2 decimalen
        if (theCase.formValues['kind-opvang-' + kindNr] != "geen") {
          geenGebruik = 'nee'
        }
      }

      if (theCase.formValues['aanvrager-kinderen'] == 0) {
        endResults.push("eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag-zonder-kinderen-onder-achtien");
      }
      else if (geenGebruik === 'ja') {
        endResults.push("eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag-geen-gebruikmaking");
      }
      else if ((aanvragerWerk == 'nee' && aanvragerDoelgroeper == "nee") ||
              (toeslagpartner == 'ja' && toeslagpartnerWerk == 'nee' && toeslagpartnerDoelgroeper == 'nee')) {
        endResults.push("eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag");
      } else if (kinderopvangtoeslag < (jaarUitbetGrns / 12)) {
        endResults.push("eindresultaat-kinderopvangtoeslag-geen-kinderopvangtoeslag-onder-uitbetalingsgrens");
        toeslagenWelToeslag.push('kinderopvangtoeslag');
        theCase.kinderopvangtoeslag = 0; // resultaat op 0 euro zetten
      } else {
        endResults.push("eindresultaat-kinderopvangtoeslag-alle-overige-gevallen");
        toeslagenWelToeslag.push('kinderopvangtoeslag');
      }
    }

    // ZT  - staat er een vink bij zorgtoeslag en zijn de zorgtoeslagnormen voor dat jaar al beschikbaar
    if (theCase.formValues['zorgtoeslag'] == 'ja' && Tabellen.Jaar[jaar].ZT_norm_geldig === 'Ja') {     
      toeslagenSelected.push('zorgtoeslag');

      if (theCase.formValues['aanvrager-achtien-plus'] == 'nee') {
        endResults.push("eindresultaat-zorgtoeslag-geen-zorgtoeslag-aanvrager-jonger-dan-18");
      } else if (theCase.formValues['aanvrager-woonland'] == '- Ander land -') {
        endResults.push("eindresultaat-zorgtoeslag-geen-zorgtoeslag-aanvrager-in-ander-land");
      } else if (theCase.formValues['aanvrager-inkomen-nl'] == 'Nee') {
        endResults.push("eindresultaat-zorgtoeslag-geen-zorgtoeslag-aanvrager-geen-inkomen-nederland");
      } else {
        var jaarTableAccess = new Jaar(theCase.formValues['jaar']);
        var algemeenBerekening = new AlgemeenBerekening(jaarTableAccess, new CaseInput(theCase));

        var inkomen = algemeenBerekening.inkomen();

        if (theCase.formValues['aanvrager-toeslagpartner'] == 'nee' && inkomen > jaarTableAccess.mxInk1()) {
          endResults.push("eindresultaat-zorgtoeslag-geen-zorgtoeslag-inkomen-te-hoog");
        } else if (theCase.formValues['aanvrager-toeslagpartner'] == 'ja' && inkomen > jaarTableAccess.mxInk2()) {
          endResults.push("eindresultaat-zorgtoeslag-geen-zorgtoeslag-gezamenlijk-inkomen-te-hoog");
        } else if (theCase.formValues['vt-gezamenlijk-vermogen-zt-kgb'] == 'ja' || theCase.formValues['vt-enkel-vermogen-zt-kgb'] == 'ja') {
          endResults.push("eindresultaat-zorgtoeslag-geen-zorgtoeslag-te-veel-vermogen");
        } else {
          var wlfTableAccess = new Wlf(theCase.formValues['jaar']);
          var aanvragerInkomenNlTableAccess = new AanvragerInkomenNl(theCase.formValues['aanvrager-inkomen-nl']);
          var toeslagpartnerInkomenNlTableAccess = new ToeslagpartnerInkomenNl(theCase.formValues['toeslagpartner-inkomen-nl']);
          var ztBerekening = new ZtBerekening(
                  algemeenBerekening,
                  jaarTableAccess,
                  wlfTableAccess,
                  aanvragerInkomenNlTableAccess,
                  toeslagpartnerInkomenNlTableAccess,
                  new CaseInput(theCase));

          var zorgtoeslag = ztBerekening.zorgtoeslag();
          var uitbetalingsgrens = jaarTableAccess.uitBetGrns();

          theCase.uitBetGrns = uitbetalingsgrens;
          theCase.zorgtoeslag = zorgtoeslag;

          if (zorgtoeslag < (uitbetalingsgrens / 12)) {
            endResults.push("eindresultaat-zorgtoeslag-geen-zorgtoeslag-onder-uitbetalingsgrens");
            toeslagenWelToeslag.push('zorgtoeslag');
            console.log('fout x geen zorgtoeslag div');
            theCase.zorgtoeslag = 0; // resultaat op 0 euro zetten
          } else {          
            endResults.push("eindresultaat-zorgtoeslag-alle-overige-gevallen");
            toeslagenWelToeslag.push('zorgtoeslag');
          }
        }
      }
    }

    // Samenvatting & Wijzig Button
    if (toeslagenSelected.length == 0) {
      endResults.push("eindresultaat-wijzigen-button-2");
      endResults.push("eindresultaat-samenvatting-geen-toeslagen");
    } else if (toeslagenSelected.length > 1) {
      if (toeslagenWelToeslag.length == 0) {
        endResults.push("eindresultaat-samenvatting-geen-toeslagen");
      } else {
        endResults.push("eindresultaat-samenvatting-toeslagen");
      }
      endResults.push("eindresultaat-wijzigen-button-1");
    } else {
      endResults.push("eindresultaat-wijzigen-button-2");
    }


    // store toeslagen that are shown in the totals
    var toegekend = "";
    for (var i = 0; i < toeslagenWelToeslag.length; ++i)
      toegekend += (toegekend == "" ? "" : " ") + toeslagenWelToeslag[i];
    theCase['toeslag-toegekend'] = toegekend;

    var gekozentoeslagen = "";
    for (var i = 0; i < toeslagenSelected.length; ++i)
      gekozentoeslagen += (gekozentoeslagen == "" ? "" : " ") + toeslagenSelected[i];
    theCase['toeslag-gekozen'] = gekozentoeslagen;

    // store total of toeslagen

    var total = 0;
    for (var i = 0; i < toeslagenWelToeslag.length; ++i)
      total += parseFloat(theCase[ toeslagenWelToeslag[i] ]);
    theCase['toeslag-totaal'] = total;

    // Disclaimer
    if (toeslagenWelToeslag.length > 0 && theCase['toeslag-totaal'] > 0) {
      endResults.push("eindresultaat-disclaimer-1");
      endResults.push("eindresultaat-disclaimer-2");
    }

  }

  return endResults;
}
