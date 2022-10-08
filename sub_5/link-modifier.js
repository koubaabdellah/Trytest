/*This script update links (only on dev,stg & uat) on click event and make target url tier specific.
More details: https://github.com/ArcGIS/arcgis-doc-website/issues/1749
*/

/*Config section */


var agolHostName = (sitecfg && sitecfg["portalHostname"]) ? sitecfg["portalHostname"].replace("//","").replace("https:","") : "www.arcgis.com";
var availableSites = {
	"dev":{
		"desktop.arcgis.com":"desktopdev.arcgis.com",
		"doc.arcgis.com":"docdev.arcgis.com",
		"resources.arcgis.com":"resourcesdev.arcgis.com",
		"pro.arcgis.com":"prodev.arcgis.com",
		"server.arcgis.com":"serverdev.arcgis.com",
		"learn.arcgis.com":"learndev.arcgis.com",
		"location-analytics.arcgis.com":"location-analyticsdev.arcgis.com"
	},

	"stg":{
		"desktop.arcgis.com":"desktopstg.arcgis.com",
		"doc.arcgis.com":"docstg.arcgis.com",
		"resources.arcgis.com":"resourcesstg.arcgis.com",
		"pro.arcgis.com":"prostg.arcgis.com",
		"server.arcgis.com":"serverstg.arcgis.com",
		"learn.arcgis.com":"learnstg.arcgis.com",
		"location-analytics.arcgis.com":"location-analyticsstg.arcgis.com"
	},

	"uat":{
		"desktop.arcgis.com":"desktopdev.arcgis.com",
		"doc.arcgis.com":"docuat.arcgis.com",
		"resources.arcgis.com":"resourcesuat.arcgis.com",
		"pro.arcgis.com":"prouat.arcgis.com",
		"server.arcgis.com":"serverdev.arcgis.com",
		"learn.arcgis.com":"learnuat.arcgis.com",
		"location-analytics.arcgis.com":"location-analyticsuat.arcgis.com"
	},
	
	"agol":{
		"www.arcgis.com":agolHostName,
		"arcgis.com":agolHostName
	}
}
/*End of Config section */



$(document).ready(function () {
	function updateLinkOnClick () {
		$("a[href]").click (function (i) {
			var $ele = $(this);
			if(availableSites[cdncfg.tier] && $ele[0].hostname in availableSites[cdncfg.tier]){
				$ele[0].hostname = availableSites[cdncfg.tier][$ele[0].hostname];
			}
		})
	}
	
	function  getOrgHostname (defaultHost) {
		 if ($.cookie && $.cookie ('esri_auth')) {
			var ckVal = $.parseJSON($.cookie ('esri_auth'));
			return ckVal.urlKey ? ckVal.urlKey + "." + ckVal.customBaseUrl : defaultHost;
		 } else {
			return defaultHost;
		 }
   }
	
	updateLinkOnClick();
});



(function () {

    window.cdncfg = {
        init: function () {

            winloc = this.getloc()
            this.tier = this.getTier(winloc)

            this.debug = false
        },
        getloc: function () {
            if (!window.location.origin) { // Fix for window.location.origin not working in I.E.
                return window.location.protocol + "//" + window.location.hostname +
                       (window.location.port ? ":" + window.location.port : "");
            }
            return window.location.origin
        },
        getTier: function (url) {
            options = {
                "dev.arcgis.com": "dev",
                "stg.arcgis.com": "stg",
				"uat.arcgis.com": "uat",
                "local": "dev",
                ":4567": "dev"
            }
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    if (url.search(key) > 1) {
                        return options[key]
                    }
                }
            }
            return ""
        },
    }
    window.cdncfg.init()
})()
;
