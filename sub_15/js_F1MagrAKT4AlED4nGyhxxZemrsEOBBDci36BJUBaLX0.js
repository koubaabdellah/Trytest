(function ($) {

  Drupal.behaviors.captcha = {
    attach: function (context) {

      // Turn off autocompletion for the CAPTCHA response field.
      // We do it here with JavaScript (instead of directly in the markup)
      // because this autocomplete attribute is not standard and
      // it would break (X)HTML compliance.
      $("#edit-captcha-response").attr("autocomplete", "off");

    }
  };

  Drupal.behaviors.captchaAdmin = {
    attach: function (context) {
      // Add onclick handler to checkbox for adding a CAPTCHA description
      // so that the textfields for the CAPTCHA description are hidden
      // when no description should be added.
      // @todo: div.form-item-captcha-description depends on theming, maybe
      // it's better to add our own wrapper with id (instead of a class).
      $("#edit-captcha-add-captcha-description").click(function() {
        if ($("#edit-captcha-add-captcha-description").is(":checked")) {
          // Show the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").show('slow');
        }
        else {
          // Hide the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").hide('slow');
        }
      });
      // Hide the CAPTCHA description textfields if option is disabled on page load.
      if (!$("#edit-captcha-add-captcha-description").is(":checked")) {
        $("div.form-item-captcha-description").hide();
      }
    }

  };

})(jQuery);
;
/**
 * JavaScript functions for front-end display of webform conditional components
 */
(function ($) {
	
Drupal.behaviors.webform_conditional = Drupal.behaviors.webform_conditional || {};
Drupal.behaviors.webform_conditional.attach = function() {
	// create quasi static var to save perfomance
	Drupal.webform_conditional.wrappers = new Object();
	Drupal.webform_conditional.components = new Object();
  $.each(Drupal.settings, function(key, info) {
    if(key.substring(0, 20) == 'webform_conditional_') {
      $.each(info.fields, function(triggerField_key, triggerField_info) {
        
        var formItemWrapper = Drupal.webform_conditional.getWrapper(triggerField_info);
        if(formItemWrapper.length > 0){
            // Add onclick handler to Parent field
            Drupal.webform_conditional.addOnChange (triggerField_key, triggerField_info, key);
        }
        });
      // after all added - trigger initial
  
      $.each(info.fields, function(triggerField_key, triggerField_info) {
        var formItemWrapper = Drupal.webform_conditional.getWrapper(triggerField_info);
          if(formItemWrapper.length > 0){
            var field_name = Drupal.webform_conditional.escapeId(triggerField_key);
            var components = Drupal.webform_conditional.getComponentsByName(field_name, key);
            if(components.attr('type')=='radio' || components.attr('type')=='checkbox'){
              $(components[0]).triggerHandler('click');
            }else{
              components.triggerHandler('change');
            }
          }
        });
      }
    });
	return;
};
Drupal.webform_conditional = Drupal.webform_conditional || {};
// create quasi static var to save perfomance
Drupal.webform_conditional.getWrapper = function(fieldInfo){
	if(Drupal.webform_conditional.wrappers[fieldInfo['css_id']]){
		return Drupal.webform_conditional.wrappers[fieldInfo['css_id']];
	}
	return Drupal.webform_conditional.wrappers[fieldInfo['css_id']] = $("#" + fieldInfo['css_id']);
};
Drupal.webform_conditional.addOnChange = function(triggerField_key, triggerField_info, key) {
	var monitor_field_name = Drupal.webform_conditional.escapeId(triggerField_key);
	var changeFunction = function() {
		Drupal.webform_conditional.setVisibility(triggerField_key,triggerField_info,key);
	};
	$.each(triggerField_info['dependent_fields'],function(dependent_field_key,dependent_field_info){
		var formItemWrapper = Drupal.webform_conditional.getWrapper(dependent_field_info);
	    if(formItemWrapper.length > 0){
	            formItemWrapper.css("display", "none");
	    }

	});
	var components = Drupal.webform_conditional.getComponentsByName(monitor_field_name, key);
	if(components.attr('type')=='radio' || components.attr('type')=='checkbox'){
		components.click(changeFunction)
	}else{
		components.change(changeFunction);
	}
	
};
Drupal.webform_conditional.setVisibility = function(triggerField_key,triggerField_info,key,monitorField,monitorInfo){
	var monitor_field_name = Drupal.webform_conditional.escapeId(triggerField_key);
	var currentValues = Drupal.webform_conditional.getFieldValue(monitor_field_name); 
	var monitor_visible = true;
	if(monitorField !== undefined){
		monitor_visible = Drupal.webform_conditional.getWrapper(monitorInfo).data('wfc_visible');
	}
	$.each(triggerField_info['dependent_fields'],function(dependentField,dependentInfo){
		if(((dependentInfo['operator'] == "=" && !Drupal.webform_conditional.Matches(currentValues,dependentInfo['monitor_field_value']))
			|| (dependentInfo['operator'] == "!=" && Drupal.webform_conditional.Matches(currentValues,dependentInfo['monitor_field_value']))) 
			|| !monitor_visible){
				// show the hidden div
				// have to set wfc_visible so that you check the visibility of this
				// immediately
			 Drupal.webform_conditional.getWrapper(dependentInfo).hide().data('wfc_visible',false);
		}else {
				// otherwise, hide it
			Drupal.webform_conditional.getWrapper(dependentInfo).show().data('wfc_visible',true);
				// and clear data (using different selector: want the
				// textarea to be selected, not the parent div)
		}
		Drupal.webform_conditional.TriggerDependents(dependentField,dependentInfo,key);
	});
};
Drupal.webform_conditional.getComponentsByName = function (field_name, key){
	// check to save jquery calls
	if(Drupal.webform_conditional.components[field_name]){
		return Drupal.webform_conditional.components[field_name];
	}
	// don't overwrite original name to store for caching
	var css_field_name = "[" + field_name + "]";
	settings = Drupal.settings[key];
	var nid = settings.nid;
	if(nid instanceof Array){
		nid = settings.nid[0];
	}
	return Drupal.webform_conditional.components[field_name] = $("#webform-client-form-" + nid + " *[name*='"+css_field_name+"']");
};
Drupal.webform_conditional.TriggerDependents = function(monitorField,monitorInfo, key){
  settings = Drupal.settings[key];
	$.each(settings.fields, function(triggerField_key, triggerField_info) {
		if(triggerField_key == monitorField){
			Drupal.webform_conditional.setVisibility(triggerField_key, triggerField_info,key,monitorField,monitorInfo);
		};
	});
};
Drupal.webform_conditional.getFieldValue = function(field_name){
	field_name = "[" + field_name + "]";
	var selected = [];
	var vals = [];
	if($('form input[name*="'+field_name+'"]:checked').length >= 1){
		selected =  $('form input[name*="'+field_name+'"]:checked');
	}else if($('form select[name*="'+field_name+'"] option:selected').length >= 1){
		selected = $('form select[name*="'+field_name+'"] option:selected');
	}
	if(selected.length == 0){
		return vals;
	}
	selected.each(function(i){
	     vals[i] = $(this).val();
	    });
	return vals;
};
Drupal.webform_conditional.Matches = function(currentValues,triggerValues){
	var found = false;
	$.each(triggerValues, function(index, value) { 
		  if(jQuery.inArray(value,currentValues)> -1){
			  found = true;
			  return false;
		  }
		});
	return found;
};
// Drupal.webform_conditional.escapeId
Drupal.webform_conditional.escapeId = function(myid) {
	if (typeof myid == 'undefined') {
		return;
	}
	   return  myid.replace(/(:|\.)/g,'\\$1');
};
})(jQuery);;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox') && (Drupal.settings.googleanalytics.trackColorbox)) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Downloads",
            "eventAction": Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),
            "eventLabel": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", {
            "hitType": "pageview",
            "page": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Mails",
            "eventAction": "Click",
            "eventLabel": this.href.substring(7),
            "transport": "beacon"
          });
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode !== 2 || (Drupal.settings.googleanalytics.trackDomainMode === 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", {
              "hitType": "event",
              "eventCategory": "Outbound links",
              "eventAction": "Click",
              "eventLabel": this.href,
              "transport": "beacon"
            });
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga("send", {
        "hitType": "pageview",
        "page": location.pathname + location.search + location.hash
      });
    };
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.googleanalytics.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        ga("send", {
          "hitType": "pageview",
          "page": Drupal.googleanalytics.getPageUrl(href)
        });
      }
    });
  }

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, https://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - https://mydomain.com/node/1 -> /node/1
 * - https://example.com/foo/bar -> https://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
