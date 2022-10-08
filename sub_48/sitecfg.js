/*
var host = "http://marketplacedevext.arcgis.com",
    searchHost = "http://searchdev.esri.com",
*/
var searchHost = "//esearchapi.esri.com",
	_searchCollection = "arcgis_pro_beta_col|arcgis_desktop_col",
	_searchClient = "resourcesbeta",
	_agolHost = "//devext.arcgis.com",
	trialUrl = "//learndev.arcgis.com",
	tierName = "dev";
if(window.location.hostname.match( /(desktopstg.arcgis.com)/)) {
	searchHost = "//esearchapistg.esri.com";
	_agolHost = "//qaext.arcgis.com";
	trialUrl = "https://learnstg.arcgis.com";
	tierName = "stg";
} else if(window.location.hostname.match( /(desktop.arcgis.com)/)) {
	searchHost = "//esearchapi.esri.com";
	_agolHost = "//www.arcgis.com";
	trialUrl = "https://learn.arcgis.com";
	tierName = "";
}

    //searchHost = "http://search.esri.com",
    sitecfg = {
	  	"debug" : false,

        "portalHostname" : _agolHost,
		"agolSignin" : 	_agolHost + "/home/signin.html",
		"agolProfile" :  "/home/user.html",
		"agolSignout" :  "/sharing/rest/oauth2/signout",
		"trialDownloadUrl": trialUrl + "/en/trial/",

		"searchUrl" : searchHost + "/search",
		"searchCollection" : _searchCollection,
	  	"searchClient" : _searchClient

	};
$.getScript("/assets/js/site-changes.js");
