/* 
 * ---------------------------------------------------------------------------
 *
 *  site wide JS functions
 *
 */


// THIS IS INTERNAL USERS VIEW - BLANK MASTER INTERNAL
 
jQuery(function () {
  jQuery('[data-toggle="tooltip"]').tooltip();
});

jQuery(function () {
  jQuery('[data-toggle="popover"]').popover();
});


// https://stackoverflow.com/questions/14735274/bootstrap-css-hides-portion-of-container-below-navbar-navbar-fixed-top

var onResize = function() {
  // apply dynamic padding at the top of the body according to the fixed navbar height
  jQuery("body").css("padding-top", jQuery(".navbar-fixed-top").height());
};

// attach the function to the window resize event
jQuery(window).resize(onResize);

// call it also when the page is ready after load or reload
jQuery(document).ready(function(){ 
  onResize();
  jQuery('.selectpicker').selectpicker();
});

jQuery(window).resize(function() {
  if (jQuery(window).width() < 408) {
    jQuery('btn-group').addClass('btn-group-vertical');
    jQuery('.btn-group').removeClass('btn-group');
  } else {
    jQuery('btn-group-vertical').addClass('btn-group');
    jQuery('btn-group-vertical').removeClass('btn-group-vertical');
  }
});

//
// http://www.softec.lu/site/DevelopersCorner/BootstrapPrototypeConflict
// the prototype.js included on this page interferes with bootstrap by various items to not work or disappear.
// this patches the problem
//

if ( typeof Prototype !== "undefined" ) {
	jQuery.noConflict();
	if (Prototype.BrowserFeatures.ElementExtensions) {
			var disablePrototypeJS = function (method, pluginsToDisable) {
							var handler = function (event) {
									event.target[method] = undefined;
									setTimeout(function () {
											delete event.target[method];
									}, 0);
							};
							pluginsToDisable.each(function (plugin) { 
									jQuery(window).on(method + '.bs.' + plugin, handler);
							});
					},
					pluginsToDisable = ['collapse', 'dropdown', 'modal', 'tooltip', 'popover', 'tab'];
			disablePrototypeJS('show', pluginsToDisable);
			disablePrototypeJS('hide', pluginsToDisable);
	}
}

function thumbnailloaded() {
  //change header height to match newly loaded thumbnail
  // apply dynamic padding at the top of the body according to the fixed navbar height
  jQuery("body").css("padding-top", jQuery(".navbar-fixed-top").height());
}

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{		// for IE11 see #69154
			string: navigator.userAgent,
			subString: "Trident",
			identity: "Explorer",
			versionSearch: "rv"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();


//tasks

function confirmpopup(attribute) {

	var action_check = confirm("#acs-workflow.You_have_choosen#" + " " + attribute  + " " + "\n" +"#acs-workflow.Do_you_wish_to_proceed#")

return action_check;
}

function processClick(status_code, opt_id, ret_url, opt_taskid) {
	window.location.href="update_option?status_code="+status_code+"&option_id="+opt_id+"&return_url="+ret_url+"&opt_taskid="+opt_taskid;
}

function processURL(url) {
	window.location.href=url;
}

function updatePanelsDB(which,url,value,returnContainer) {
	/*
		url                url of tcl updater program
		value              new value of record
		returnContainer    div/span in html that ajax will insert results of tcl program into
		alert('url='+url+', value='+value+', returnContainer='+returnContainer);
	*/

	value = escape(value);

	new Ajax.Updater (returnContainer,url,{asynchronous:true,method:'post',parameters:'which='+which+'&value='+value});
}

//file upload widgets
jQuery(function() {

  // We can attach the `fileselect` event to all file inputs on the page
  jQuery(document).on('change', ':file', function() {
    var input = jQuery(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });

  // We can watch for our custom `fileselect` event like this
  jQuery(document).ready( function() {
      jQuery(':file').on('fileselect', function(event, numFiles, label) {

          var input = jQuery(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;

          if( input.length ) {
              input.val(log);
          }

      });
  });
  
});
