/*****************************************/
/** Link AB Tasty to a third party tool **/
/** Custom integration **/
/*****************************************/
(function() {
  if (location.host !== 'www.belastingdienst.nl'){
    return;
  }
  // If browser is IE; return
  // documentMode is an IE specific property
  if (document.documentMode) {
    return;
  }
  const sendMasterOnMP = true; // Send the master ID and the master variation of the multipage campaigns
  const cleverForPerso = true; // Be clever than our tool and send the master ID and master name for the persos(and don 't send the variation)
  const listenLaterCampaigns = true; // Send campaigns which are in AJAX mode or using targeting by events
  const sendBySession = false; // Send the datas of the campaign only one time by user 's session


  // Function to wait the third party tool's function before running the code
  function waitTool() {

    //BLD: wait for Matomo Analytics
    let matomo = typeof window._paq !== "undefined" && typeof _paq.push === "function";
    console.log('ABTasty waitTool() Matomo loaded: ', matomo);
	  return matomo;
  }

  // Function to send the tracking
  // campaignInfos is construct like this : {testID: THE_TEST_ID, testName: THE_TEST_NAME, variationID: THE_VARIATION_ID, variationName: THE_VARIATION_NAME
  function sendEvent(campaignId, campaignInfos, isLastCampaign) {

    //BLD: push campagneInfo to Matomo Analytics
    let ABtestId = campaignInfos.testID,
      ABtestName = campaignInfos.testName,
		  ABvariationId = campaignInfos.variationID;

    let custDimVal = ABtestId + '-' + ABvariationId + '-' + ABtestName;
    console.log("Custom Dimension: A/B variant: ", custDimVal);
    _paq.push(["setCustomDimension", "2", custDimVal]);
  
    return true;
  }


  /*********************************/
  /** Don't change the code below **/
  /*********************************/
  function waitData(condition, callback) {
    condition()
      ? callback()
      : setTimeout(function() {
          waitData(condition, callback);
        }, 500);
  }

  function start() {
    const AB = window.ABTasty;
    const isTagV3 = function() {
      return typeof AB.getAccountSettings === "function";
    };
    const getAccountSettings = isTagV3()
      ? AB.getAccountSettings
      : function() {
          return AB.accountSettings;
        };
    const getParentDatas = function(id) {
      return isTagV3()
        ? AB.accountData.tests[id]
        : AB.tests.filter(function(el) {
            return el.datas.id == id;
          })[0].datas;
    };
    const getParentId = function(campaignDatas) {
      return isTagV3() ? campaignDatas.parentID : campaignDatas.masterTest;
    };

    function getABTastyCookie() {
      const abCookieDatas =
        getAccountSettings().storageMode == "local"
          ? ["ABTasty", localStorage.getItem("ABTasty")]
          : document.cookie.match(/.*ABTasty=([^;]+).*/);

      if (abCookieDatas && abCookieDatas[1]) {
        const abCookie = JSON.parse(
          '{"' +
            decodeURIComponent(abCookieDatas[1])
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        );
        abCookie.th = abCookie.th.split("_").map(function(el) {
          return el.split(".");
        });
        return abCookie;
      }
      return null;
    }

    let isNewSession = false;
    const sessionNumber = getABTastyCookie().ns;
    const navigationDatas = JSON.parse(localStorage.getItem("ABTastyData"));
    isNewSession = navigationDatas["VisitedPages"]
      ? navigationDatas["VisitedPages"].filter(function(el) {
          return el.visite == sessionNumber;
        }).length < 2
      : true;
      
    let alreadyTreat = [];
    const alreadySend =
      !isNewSession && localStorage.getItem("ab_campaignsAlreadySend")
        ? localStorage.getItem("ab_campaignsAlreadySend").split(",")
        : [];
    let currentCampaigns = [];

    function getCampaignDatas(campaignID) {
      const campaignResults = AB.getTestsOnPage()[campaignID];
      const campaignDatas = campaignResults.testDatas;
      const parentDatas =
        getParentId(campaignDatas) !== 0
          ? getParentDatas(getParentId(campaignDatas))
          : null;
      const wantedDatas = {
        testID: Number(campaignID),
        testName: campaignResults.name,
        variationID: Number(campaignResults.variationID),
        variationName: campaignResults.variationName
      };

      if (
        parentDatas !== null &&
        ((sendMasterOnMP && parentDatas.type === "multipage") || // multipage management
          (cleverForPerso && parentDatas.type === "mastersegment")) // personalization management
      ) {
        wantedDatas.testID = Number(parentDatas.id);
        wantedDatas.testName = parentDatas.name;

        if (parentDatas.type === "multipage") {
          const masterVariation = Object.keys(parentDatas.variations).filter(
            function(el) {
              return (
                parentDatas.variations[el].name ===
                campaignResults.variationName
              );
            }
          );
          wantedDatas.variationID =
            masterVariation && masterVariation.length > 0
              ? Number(parentDatas.variations[masterVariation[0]].id)
              : wantedDatas.variationID;
        } else {
          wantedDatas.variationID = Number(campaignID);
          wantedDatas.variationName = campaignResults.name;
        }
      }
      return wantedDatas;
    }

    function sendCurrentCampaigns() {
      currentCampaigns = currentCampaigns.concat(
        Object.keys(AB.getTestsOnPage()).filter(function(el) {
          return currentCampaigns.indexOf(el) < 0;
        })
      );

      currentCampaigns.forEach(function(el, index) {
        if (alreadyTreat.indexOf(String(el)) > -1) return;
        alreadyTreat.push(String(el));

        const datasToSend = getCampaignDatas(el);

        if (isNaN(datasToSend.variationID) || typeof datasToSend.variationName !== 'string') {
          alreadyTreat = alreadyTreat.filter(function (id) { return id !== el });
          return;
        }

        if (alreadySend.indexOf(String(datasToSend.testID)) > -1) return;
        sendEvent(el, datasToSend, index == currentCampaigns.length - 1);

        alreadySend.push(String(datasToSend.testID));
        sendBySession &&
          localStorage.setItem("ab_campaignsAlreadySend", alreadySend);
      });
      return true;
    }

    function hasPendingCampaigns() {
      return (
        Object.keys(AB.results).filter(function(el) {
          return AB.results[el].status === "pending";
        }).length > 0
      );
    }

    function sendNewCampaigns() {
      if (!listenLaterCampaigns) return true;

      if (hasPendingCampaigns()) {
        var waitNewCampaigns = setInterval(function() {
          sendCurrentCampaigns();
          if (!hasPendingCampaigns()) clearInterval(waitNewCampaigns);
        }, 800);
      }

      var oldABTastyStartTest = window.ABTastyStartTest;
      var newABTastyStartTest = function(testID, variationID) {
        oldABTastyStartTest(testID, variationID);
        sendCurrentCampaigns();
      };
      window.ABTastyStartTest = newABTastyStartTest;
      return true;
    }

    sendCurrentCampaigns() && sendNewCampaigns();
    const beforeResend = setInterval(sendCurrentCampaigns, 250);
    setTimeout(function() { clearInterval(beforeResend); }, 1500);
  }

  function waitToStart() {
    return (
      waitTool() &&
      (typeof ABTasty !== "undefined" &&
        typeof ABTasty.results !== "undefined" &&
        (document.cookie.indexOf("ABTasty=") > -1 ||
          localStorage.getItem("ABTasty") != null))
    );
  }
  waitData(waitToStart, start);
})();