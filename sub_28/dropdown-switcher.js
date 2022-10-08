if (!docConfig) {
  var docConfig = {};
}
var currentURL = document.location.href;
var customVersionLabel = null;
if(typeof msConfig !== 'undefined'){
	customVersionLabel = msConfig.switchercfg.customVersionLabel;
	docConfig.switcher = msConfig.switchercfg;
	docConfig.switcher.switcherdisplay=true
	if (currentURL.match(/(\/mission\/)/) && !currentURL.match(/(\/server\/)/)) {
		  docConfig.switcher.switchercases = {
			"11.0": "11.0",	  
			"10.9.1": "10.9.1",
			"10.9": "10.9",
			"10.8": "10.8"
		  };
	}
}
else {
	if (!docConfig.switcher) {
		/* Insights switcher config*/
	  docConfig.switcher = {
		"basepaths": {
		  "2022.1": "insights/latest/",
		  "2021.3": "insights/2021.3/",
		  "2021.2": "insights/2021.2/",
		  "2021.1": "insights/2021.1/",
		  "2020.3": "insights/2020.3/"
		},

		"switchercases": {
		  "2022.1": "2022.1",
		  "2021.3": "2021.3",
		  "2021.2": "2021.2",
		  "2021.1": "2021.1",
		  "2020.3": "2020.3"
		},

		"caseTbl": {
		  "__order": {
			"2022.1": 1,
			"2021.3": 2,
			"2021.2": 3,
			"2021.1": 4,
			"2020.3": 5
		  },

		},

		"switcherdisplay": true,
	  };

	}
	
		/* Business Analyst switcher config*/
if (currentURL.match(/(\/business-analyst\/)/)) {
    customVersionLabel = "Enterprise";
  
   docConfig.switcher.basepaths= {
      "linux": "linux",
      "windows": "windows",
	  "10.9" : "enterprise/latest/",
	  "10.8": "enterprise/10.8/",
	  "10.7": "enterprise/10.7/",
      "10.6": "enterprise/10.6/"
    },

    docConfig.switcher.switchercases={
	  "10.9~": "10.9",
      "10.9~linux": "Linux",
      "10.9~windows": "Windows",
	  "10.8~": "10.8",
      "10.8~linux": "Linux",
      "10.8~windows": "Windows",
	  "10.7~": "10.7",
      "10.7~linux": "Linux",
      "10.7~windows": "Windows",
      "10.6~": "10.6",
      "10.6~linux": "Linux",
      "10.6~windows": "Windows"
    },

    docConfig.switcher.caseTbl={
      "__order": {
		"10.9~linux": 1,
        "10.9~windows": 2,
		"10.8~linux": 3,
        "10.8~windows": 4,
		"10.7~linux": 5,
        "10.7~windows": 6,
        "10.6~linux": 7,
        "10.6~windows": 8
      },
      // Get started
    "business-analyst-enterprise-overview": ['-', '-', '-','-','-', '-', 'business-analyst-server-overview','business-analyst-server-overview'],
	 "business-analyst-server-overview": ['business-analyst-enterprise-overview', 'business-analyst-enterprise-overview','business-analyst-enterprise-overview', 'business-analyst-enterprise-overview','business-analyst-enterprise-overview','business-analyst-enterprise-overview', '-', '-'],
    "whats-new-in-enterprise": ['-','-','-', '-','-','-', 'x','x'],
	 "migration-scenarios": ['-','-','-', '-', '-', '-', 'x', 'x'],
	 "international-data": ['-','-','-', '-', '-', '-', 'x', 'x'],
	 "configuring-business-analyst-licenses": ['-','-','-', '-','-', '-', 'x', 'x'],
	 "verifying-apps-and-services": ['-','-','-', '-', '-', '-', 'x','x'],
	 "upgrading-geoenrichment-server": ['-','-','-','-', '-', '-','x', 'x'],
	 "uninstalling-business-analyst-enterprise": ['-','-','-','-', '-','-', 'uninstalling-business-analyst-server', 'uninstalling-business-analyst-server'],
	 "uninstalling-business-analyst-server": ['uninstalling-business-analyst-enterprise','uninstalling-business-analyst-enterprise','uninstalling-business-analyst-enterprise', 'uninstalling-business-analyst-enterprise','uninstalling-business-analyst-enterprise', 'uninstalling-business-analyst-enterprise', '-', '-'], 
	 "installation": ['x','x','x', 'x','x', 'x', '-', '-'],
	 "faqs": ['x','x','x', 'x', 'x', 'x', '-','-'],
	 "configuring-business-analyst-server": ['x','x','x', 'x', 'x', 'x', '-', '-'],
	 "deploying-demographic-map-services": ['x', 'x', 'x', 'x', 'x', 'x', '-', '-'],
	 "updating-data": ['-', '-', '-','-','x', 'x', 'x','x']
    },
    docConfig.switcher.switcherdisplay=true
    
}
/* End of business analyst switcher config*/

}
$.whenAll = function(firstParam) {
  var args = arguments,
    sliceDeferred = [].slice,
    i = 0,
    length = args.length,
    count = length,
    rejected,
    deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise) ?
    firstParam :
    jQuery.Deferred();

  function resolveFunc(i, reject) {
    return function(value) {
      rejected |= reject;
      args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
      if (!(--count)) {
        // Strange bug in FF4:
        // Values changed onto the arguments object sometimes end up as undefined values
        // outside the $.when method. Cloning the object into a fresh array solves the issue
        var fn = rejected ? deferred.rejectWith : deferred.resolveWith;
        fn.call(deferred, deferred, sliceDeferred.call(args, 0));
      }
    };
  }

  if (length > 1) {
    for (; i < length; i++) {
      if (args[i] && jQuery.isFunction(args[i].promise)) {
        args[i].promise().then(resolveFunc(i), resolveFunc(i, true));
      } else {
        --count;
      }
    }
    if (!count) {
      deferred.resolveWith(deferred, args);
    }
  } else if (deferred !== firstParam) {
    deferred.resolveWith(deferred, length ? [firstParam] : []);
  }
  return deferred.promise();
};

jQuery(document).ready(function($) {

  //exclude version switcher for following pattern.

  if (!currentURL.match(/(\/insights\/|\/business-analyst\/enterprise\/|\/cityengine\/|\/field-maps\/android\/|\/field-maps\/ios\/|\/arcgis-solutions\/.*\/reference\/|\/geoplanner\/|\/monitor\/|\/instant-apps\/|\/excalibur\/|\/mission\/|\/drone2map\/|\/web-appbuilder\/.*\/create-apps\/|\/web-appbuilder\/.*\/manage-apps\/|\/dashboards\/|\/experience-builder\/|\/data-appliance\/|\/ips\/.*\/mobile|\/geobim\/.*\/get-started\/)/)) {

	  if(currentURL.match(/(\/field-maps\/faq\/)/)){
		  var search_pdt="field-maps-android";
		  if(sessionStorage.getItem('fieldmaps'))
				search_pdt = sessionStorage.getItem('fieldmaps');
		  $('#helpSearchForm input[name=product]').attr("value", "field-maps-" + search_pdt);
	  }		  
    return;
  }
  if (currentURL.match(/(\/cityengine\/latest\/whats-new\/)/))
	  return;

  if (!doc) {
    var doc = {};
  }

  function dbg(o) {
    if (true) console.info(o);
  }

  doc.switcher = (function() {

    var switcherCfg = window.docConfig.switcher,
      pathname = window.location.pathname,
      pathparts = pathname.split("/"),
      fname = pathparts[pathparts.length - 1],
      plat = (pathname.match(/(\/enterprise\/)/)) ? pathparts[pathparts.length - 5] : pathparts[pathparts.length - 3],
	  platform = pathparts[pathparts.length - 2],
      isHome = pathparts.length <= 4, //???
	  url_version = (pathname.match(/(\/enterprise\/)/)) ? window.location.pathname.split("/")[4] : window.location.pathname.split("/")[3];
	  //basic setting for insights. Version variable gets modified according to the app in the code portions below
	  version = (url_version=="latest") ? "2022.2" : url_version;
	  //replace hardcoded "2022.2" on the above line with msConfig var after all apps switch to new switcher implementation
      switcherLinkClass = "is-active";
    return {

      addSwitcherLinks: function(switcherLocation) {

        if (!(isHome) && (switcherCfg.switcherdisplay)) {
          var platK = plat + "~";
          var versionLabel = (customVersionLabel) ? customVersionLabel : version;
          var currentPlatTxt =  'Insights ' + version;
         
		 //links variable set for insights. This will vary for other microsites as seen below in their corresponding code blocks
   
		  var links = '<div class="trailer-1" id="platforms">' + '<span class="product text-light-gray">' + currentPlatTxt + '</span>';
          links += '<span class="divider">&nbsp;&nbsp; | </span><span class="dropdown js-dropdown"><button class="btn btn-transparent dropdown-btn js-dropdown-toggle" href="#" tabindex="0" aria-haspopup="true" aria-expanded="false"> ' + this.t('other-versions') + ' </button>';
		  links += '<span class="divider">&nbsp;&nbsp; | </span><span class="">&nbsp;<a class="" href="/en/insights/latest/get-started/archived-help.htm" tabindex="0" aria-haspopup="true" aria-expanded="false"> ' + this.t('help-archive') + ' </a>';

			 if(currentURL.match(/(\/business-analyst\/|\/cityengine\/|\/field-maps\/|\/arcgis-solutions\/|\/instant-apps\/|\/excalibur\/|\/mission\/|\/drone2map\/|\/ips\/|\/geoplanner\/|\/monitor\/|\/dashboards\/|\/experience-builder\/|\/web-appbuilder\/|\/data-appliance\/|\/geobim\/)/)){		
				    var otherVersions = this.t('other-versions');	
					var platformVal = "";
					var latestVersion="";
					if (typeof msConfig !=='undefined')
						latestVersion = (msConfig.latestVersion!==undefined)? msConfig.latestVersion : msConfig.switchercfg.switchercases["latest"];
					version = (url_version=="latest") ? latestVersion : url_version;
					
					//microsites with platforms(Linux/Windows) in their switcher 
				    if(currentURL.match(/(\/business-analyst\/|\/mission\/|\/monitor\/)/)){	
					
						//temp code: Remove once l10n moves to new switcher implementation
						if(doc.switcher.getCurrentLang()!=="en"){
							if(currentURL.match(/(\/business-analyst\/)/))			  
								version = (url_version=="latest") ? "10.9" : url_version;

						}
						platformVal = (currentURL.match(/(\/linux\/)/)) ? ' (Linux)': currentURL.match(/(\/windows\/)/) ? ' (Windows)': '';
						
					}
					
					//microsites with mobile platforms(Android/iOS) in their switcher
					else if(currentURL.match(/(\/ips\/|\/field-maps\/)/)){
						
							otherVersions = this.t('Other platforms');
							version = switcherCfg.switchercases[plat];
							//field maps has a special setting to remember the chosen platform
							if(currentURL.match(/(\/field-maps\/)/)){
								if(!sessionStorage.getItem('fieldmaps') ||sessionStorage.getItem('fieldmaps') !== plat)
								sessionStorage.setItem('fieldmaps', plat);
							}	
							
					}
					
					//microsites that migrated from the Enterprise site
					else if(currentURL.match(/(\/geoplanner\/|\/dashboards\/|\/experience-builder\/|\/web-appbuilder\/|\/instant-apps\/|\/arcgis-solutions\/|\/geobim\/)/)){
						
									if(url_version=="10.8" || url_version=="10.7")
										url_version = url_version +".x";
									else if(url_version=="previous")
										url_version = "10.5 - 10.8"
									version = (url_version=="latest") ? msConfig.switchercfg.switchercases["latest"] : "ArcGIS Enterprise (" + url_version + ")";
									if(currentURL.match(/(\/geoplanner\/.*?\/get-started\/)/)){
										setTimeout(function(){
											$('a[data-plat="10.8"], a[data-plat="10.7"]').removeClass("available");
											$('a[data-plat="10.8"], a[data-plat="10.7"]').addClass("disabled");
										},500);
									}
									
					}
					
					//This code block handles cityengine version switcher's special case
					else if(currentURL.match(/(\/cityengine\/)/)){
						
						if(pathname.match(/(\/python\/|\/install\/os-x\/)/)){
							setTimeout(function(){
								if(pathname.match(/(\/python\/)/)){
									$('#platforms a.dropdown-link.available[data-plat="2019.1"],#platforms a.dropdown-link.available[data-plat="2019.0"]').removeClass("available");
									$('#platforms a.dropdown-link[data-plat="2019.1"],#platforms a.dropdown-link[data-plat="2019.0"]').addClass("disabled");
								} else {
									$('#platforms a.dropdown-link.available[data-plat!="2020.1"][data-plat!="2020.0"][data-plat!="2019.1"][data-plat!="2019.0"]').removeClass("available");
									$('#platforms a.dropdown-link[data-plat!="2020.1"][data-plat!="2020.0"][data-plat!="2019.1"][data-plat!="2019.0"]').addClass("disabled");
								}
							}, 500);
						}
						
					}
					
					links = '<div class="trailer-1" id="platforms">' + '<span class="product text-light-gray">' + versionLabel + ' ' + version +  ' ' + platformVal +'</span><span class="divider">&nbsp;&nbsp; | </span><span class="dropdown js-dropdown"><button class="btn btn-transparent dropdown-btn js-dropdown-toggle" href="#" tabindex="0" aria-haspopup="true" aria-expanded="false"> ' + this.t('other-versions') + ' </button>';
					
					//add archived help url for certain microsites
			 		if(currentURL.match(/(\/geoplanner\/|\/dashboards\/|\/web-appbuilder\/)/)){
						
						links += '<span class="divider">&nbsp;&nbsp; | </span><span class="">&nbsp;<a class="" href=" https://resources.arcgis.com/en/help/" tabindex="0" aria-haspopup="true" aria-expanded="false"> ' + this.t('help-archive') + ' </a>';
						
					}
			 }
			 

			  linkData = this.generateSwitcherLinks();
			  links += linkData[0];
			  links += '</span></div>';


			  ajaxRequests = [];
			  linksNum = linkData[1].length;
			  for (i = 0; i <= 14; i++) {
				if (i >= linksNum || linkData[1][i][1] == '#') {
				  ajaxRequests.push(null);
				} else {
				  ajaxRequests.push($.ajax(linkData[1][i][1]));
				}
			  }
			  $.whenAll(ajaxRequests[0], ajaxRequests[1], ajaxRequests[2], ajaxRequests[3], ajaxRequests[4], ajaxRequests[5], ajaxRequests[6], ajaxRequests[7], ajaxRequests[8], ajaxRequests[9], ajaxRequests[10], ajaxRequests[11], ajaxRequests[12], ajaxRequests[13], ajaxRequests[14], $(switcherLocation).after(links)).always(function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
				responses = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14];
				for (i = 0; i < linksNum; i++) {
				  if (responses[i] != null) {
					 // console.log("response: ", responses[i]);
					if (responses[i][1] == 'error') {
					  removeClass = 'available';
					  addClass = 'disabled';
					  href = 'javascript:void(0)';

					} else {
					  removeClass = 'disabled';
					  addClass = 'available';
					  href = linkData[1][i][1];
					}
					linkElement = $('#' + linkData[1][i][0]);
					//console.log(linkElement);
					linkElement.attr('href', href);
					if (linkElement.hasClass(removeClass)) {
					  linkElement.removeClass(removeClass);
					}
					linkElement.addClass(addClass);
				  }
				}
				$('#platforms').addClass('processed');
			  });

        } else {
          return true;
        }
      },

        

      generateSwitcherLinks: function() {

        var switcherLinks = "",
          dropDownFlag = false;
        keyL = []

		if(currentURL.match(/(\/data-appliance\/)/)){
			//To preserve order with integer versions
			var arr = Object.entries(msConfig.switchercfg.caseTbl.__order);	
			var versionsL=new Array(arr.length);
			$.each(arr, function(k) {	
				versionsL[arr[k][1]-1]=arr[k][0];
			});
			
			for(var i=0;i<arr.length;i++)
				keyL[i] = versionsL[i];
		} else {

			$.each(switcherCfg.switchercases, function(k, v) {
			  keyL.push(k);
				 
			});
		}

        switcherLinks = '<nav class="dropdown-menu">';
		var versionArray = [];
        $.each(keyL, function(idx, val) {

          var k = val,
            v = switcherCfg.switchercases[k]

            //console.log ("generateSwitcherLinks: " + k + " : " + v)

          var url = doc.switcher.getTargetURL(k),
            kArr = k.split(":"),
            switcherLinkStatus = (kArr.length >= 2) ? kArr[1] : ""



          k = kArr[0]
		            linkId = k.replace(/[^a-z0-9\s]/gi, '');

		  //console.log("url, status ,linkId :", url, switcherLinkStatus, linkId);
          if (k.indexOf("~") >= 0) {

            var keyArr = k.split("~");

            if (!keyArr[1]) {
              // for example key is "desktop."
              switcherLinks += '<span class="dropdown-title">' + v + '</span>';
            } else {
			versionArray.push([linkId, url]);
              switcherLinks += '<a data-plat="' + keyArr[1] + '" id="'+linkId + '" class="dropdown-link ' + switcherLinkClass + '" href="' + url + '">' + v + '</a>';
            }
          } else {
			  versionArray.push([linkId, url]);
            switcherLinks += '<nav><a data-plat="' + k + '" id="' + linkId + '" class="dropdown-link ' + switcherLinkClass + '" href="' + url + '">' + v + '</a>';
          }
        });
        switcherLinks += '</nav>'

       // return switcherLinks;
	   return [switcherLinks, versionArray];
      },

      getTargetURL: function(key) {
        var kArr = key.split("~"),
          newVersion = kArr[0],
          k = (kArr.length > 1) ? kArr[1] : key;

        var versionPath = switcherCfg.basepaths[newVersion];		
        var  prefixBase = (versionPath) ? '/' + doc.switcher.getCurrentLang() + '/'+ plat +'/' + versionPath : "",
          prefixPlat = "/" + switcherCfg.basepaths[k],
          pathpfx = window.location.pathname.split("/").slice(0, -1).join("/"),
          url, fileName;

		if (pathpfx.indexOf(prefixPlat) >= 0 && pathpfx.indexOf(prefixBase) >= 0) {
          switcherLinkClass = "is-active";
          url = pathpfx + "/" + fname;
        } else {
          var fnameVal = this.specialCasesLookup(key, fname);

          //dbg ("getTargetURL.specialCasesLookup: " + k + " => " + fnameVal);

          if (fnameVal == "x") {
            // disable click
            url = "#";
            switcherLinkClass = "is-disabled";


          } else {

            //tmp hack to create relative url
            //works: /en/web-adaptor/beta/install/java-linux/welcome-arcgis-web-adaptor-install-guide.htm
            //NOT: /en/collector/windows/collect-data/collect-tutorial.htm
            //url = "../" + key + "/" + fnameVal;
			
			//console.log("pathpfx is ",pathpfx, version, switcherCfg.basepaths[k], switcherCfg.basepaths[platform], switcherCfg.basepaths[plat]);
			if(switcherCfg.basepaths[plat] !== undefined)
				url = pathpfx.replace(switcherCfg.basepaths[version], switcherCfg.basepaths[newVersion]).replace(switcherCfg.basepaths[plat], switcherCfg.basepaths[k]);	
			else
				url = pathpfx.replace(switcherCfg.basepaths[version], switcherCfg.basepaths[newVersion]).replace(switcherCfg.basepaths[platform], switcherCfg.basepaths[k]);
            url += "/" + fnameVal;
			if(currentURL.match(/(\/business-analyst\/|\/server\/)/)){
				url = url.replace("/" + switcherCfg.basepaths[platform] +"/", "/" + switcherCfg.basepaths[k] + "/")
			}
			if(window.location.pathname == url)
				switcherLinkClass = "is-active";
			else
				switcherLinkClass = "available";
          }
        }
        return url
      },

      //getTargetURL
      specialCasesLookup: function(key, fileName) {
        var keyPosition = (switcherCfg.caseTbl && key in switcherCfg.caseTbl['__order']) ? switcherCfg.caseTbl['__order'][key] - 1 : -1,
          fnameParts = fileName.split("."),
          fnameKey = (fnameParts.length == 2) ? fnameParts[0] : "",
          fnameVal = "x";
        //dbg ("specialCasesLookup: " +keyPosition + " " + fnameKey);


        if (keyPosition >= 0) {
          if (fnameKey in switcherCfg.caseTbl) {
            fnameVal = switcherCfg.caseTbl[fnameKey][keyPosition];
            fnameVal = (fnameVal == "x") ? "x" : ((fnameVal == "-") ? fnameKey + ".htm" : fnameVal + ".htm");
          } else {
            fnameVal = fnameKey + ".htm";
          }
        } else {
          //not a valid platform choice
          //fnameVal = "x";
          fnameVal = fileName;
        }

        return fnameVal;
      },

      getCurrentLang: function() {
        var localedir = "en";
        if (window.docConfig !== undefined) {
          localedir = docConfig['localedir'].toLowerCase();
        }
        return localedir;
      },

      t: function(dataLang) {
        lg = this.getCurrentLang();

        var dict = (window.localeJsonObj || {});
        return dict[lg][dataLang] || dict['en'][dataLang] || dataLang;
      },

      setJsCookie: function(ckName, ckVal) {
        $.cookie(ckName, ckVal, {
          expires: 30,
          path: "/"
        });
      },

      updateTabLinks: function(linkUpdateSection) {

        //$('"'+linkUpdateSection + ' a"').each (function (i) {
        $(linkUpdateSection + ' a').each(function(i) {
          var $ele = $(this),
            href = $ele.attr("href"),
            hrefparts = href.split("/"),
            linkFileName = (hrefparts[hrefparts.length - 1].indexOf(".htm") > 0) ? hrefparts[hrefparts.length - 1] : "",
            linkPlat = hrefparts[hrefparts.length - 2],
            varsionPlatLabel = version + "~" + linkPlat;

          if ((linkPlat != plat) && (linkPlat in switcherCfg.basepaths && varsionPlatLabel in switcherCfg.switchercases)) {

            var newFname = (linkFileName != "") ? doc.switcher.specialCasesLookup(plat, linkFileName) : "x";

            if (newFname != "x") {
              //$ele.attr ("href", hrefpfx + "/" + plat + "/" + newFname);
              var pathpfx = hrefparts.slice(0, -1).join("/"),
                newURL = pathpfx.replace(switcherCfg.basepaths[linkPlat], switcherCfg.basepaths[plat]) + "/" + newFname;
              $ele.attr("href", newURL);
            } else {
              // dbg ("origHref: " + href);
              $ele.attr("href", href.replace(switcherCfg.basepaths[linkPlat], switcherCfg.basepaths[plat]));
            }
          }
        });

        // Update Search form parameter here.
      },



    }; //End of main return

  })();

  //insight specific only
  //window.docConfig.switcher.switchercases["online~latest"] = doc.switcher.t("latest")

  //Starting point
  var switcherLocation = ".column-13 h1, .column-18 h1",
    linkUpateSection = ".sub-nav-list";
  doc.switcher.addSwitcherLinks(switcherLocation);
  //doc.switcher.updateTabLinks(linkUpateSection);


  $('#platforms .dropdown-menu a').on("click", function(evt) {
    window.location.href = $(this).attr("href");
  })

})