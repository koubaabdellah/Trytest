/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

  Drupal.Views = {};

  /**
   * JQuery UI tabs, Views integration component.
   */
  Drupal.behaviors.viewsTabs = {
    attach: function (context) {
      if ($.viewsUi && $.viewsUi.tabs) {
        $('#views-tabset').once('views-processed').viewsTabs({
          selectedClass: 'active'
        });
      }

      $('a.views-remove-link').once('views-processed').click(function(event) {
        var id = $(this).attr('id').replace('views-remove-link-', '');
        $('#views-row-' + id).hide();
        $('#views-removed-' + id).attr('checked', true);
        event.preventDefault();
      });
      /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row).
    */
      $('a.display-remove-link')
        .addClass('display-processed')
        .click(function() {
          var id = $(this).attr('id').replace('display-remove-link-', '');
          $('#display-row-' + id).hide();
          $('#display-removed-' + id).attr('checked', true);
          return false;
        });
    }
  };

  /**
 * Helper function to parse a querystring.
 */
  Drupal.Views.parseQueryString = function (query) {
    var args = {};
    var pos = query.indexOf('?');
    if (pos != -1) {
      query = query.substring(pos + 1);
    }
    var pairs = query.split('&');
    for (var i in pairs) {
      if (typeof(pairs[i]) == 'string') {
        var pair = pairs[i].split('=');
        // Ignore the 'q' path argument, if present.
        if (pair[0] != 'q' && pair[1]) {
          args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
      }
    }
    return args;
  };

  /**
 * Helper function to return a view's arguments based on a path.
 */
  Drupal.Views.parseViewArgs = function (href, viewPath) {

    // Provide language prefix.
    if (Drupal.settings.pathPrefix) {
      var viewPath = Drupal.settings.pathPrefix + viewPath;
    }
    var returnObj = {};
    var path = Drupal.Views.getPath(href);
    // Ensure we have a correct path.
    if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
      var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
      returnObj.view_args = args;
      returnObj.view_path = path;
    }
    return returnObj;
  };

  /**
 * Strip off the protocol plus domain from an href.
 */
  Drupal.Views.pathPortion = function (href) {
    // Remove e.g. http://example.com if present.
    var protocol = window.location.protocol;
    if (href.substring(0, protocol.length) == protocol) {
      // 2 is the length of the '//' that normally follows the protocol.
      href = href.substring(href.indexOf('/', protocol.length + 2));
    }
    return href;
  };

  /**
 * Return the Drupal path portion of an href.
 */
  Drupal.Views.getPath = function (href) {
    href = Drupal.Views.pathPortion(href);
    href = href.substring(Drupal.settings.basePath.length, href.length);
    // 3 is the length of the '?q=' added to the url without clean urls.
    if (href.substring(0, 3) == '?q=') {
      href = href.substring(3, href.length);
    }
    var chars = ['#', '?', '&'];
    for (var i in chars) {
      if (href.indexOf(chars[i]) > -1) {
        href = href.substr(0, href.indexOf(chars[i]));
      }
    }
    return href;
  };

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

  /**
   * Attaches the AJAX behavior to exposed filter forms and key views links.
   */
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function() {
    if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
      $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
      });
    }
  };

  Drupal.views = {};
  Drupal.views.instances = {};

  /**
   * JavaScript object for a certain view.
   */
  Drupal.views.ajaxView = function(settings) {
    var selector = '.view-dom-id-' + settings.view_dom_id;
    this.$view = $(selector);

    // If view is not present return to prevent errors.
    if (!this.$view.length) {
      return;
    }

    // Retrieve the path to use for views' ajax.
    var ajax_path = Drupal.settings.views.ajax_path;

    // If there are multiple views this might've ended up showing up multiple
    // times.
    if (ajax_path.constructor.toString().indexOf("Array") != -1) {
      ajax_path = ajax_path[0];
    }

    // Check if there are any GET parameters to send to views.
    var queryString = window.location.search || '';
    if (queryString !== '') {
      // Remove the question mark and Drupal path component if any.
      var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
      if (queryString !== '') {
        // If there is a '?' in ajax_path, clean url are on and & should be
        // used to add parameters.
        queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
      }
    }

    this.element_settings = {
      url: ajax_path + queryString,
      submit: settings,
      setClick: true,
      event: 'click',
      selector: selector,
      progress: {
        type: 'throbber'
      }
    };

    this.settings = settings;

    // Add the ajax to exposed forms.
    this.$exposed_form = $('#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
    this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

    // Store Drupal.ajax objects here for all pager links.
    this.links = [];

    // Add the ajax to pagers.
    this.$view
      .once(jQuery.proxy(this.attachPagerAjax, this));

    // Add a trigger to update this view specifically. In order to trigger a
    // refresh use the following code.
    //
    // @code
    // jQuery('.view-name').trigger('RefreshView');
    // @endcode
    // Add a trigger to update this view specifically.
    var self_settings = this.element_settings;
    self_settings.event = 'RefreshView';
    var self = this;
    this.$view.once('refresh', function () {
      self.refreshViewAjax = new Drupal.ajax(self.selector, self.$view, self_settings);
    });
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
    var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
    button = button[0];

    // Call the autocomplete submit before doing AJAX.
    $(button).click(function () {
      if (Drupal.autocompleteSubmit) {
        Drupal.autocompleteSubmit();
      }
    });

    this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
  };

  /**
   * Attach the ajax behavior to each link.
   */
  Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
    this.$view.find('ul.pager > li > a, ol.pager > li > a, th.views-field a, .attachment .views-summary a')
      .each(jQuery.proxy(this.attachPagerLinkAjax, this));
  };

  /**
   * Attach the ajax behavior to a single link.
   */
  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr('href');
    // Don't attach to pagers inside nested views.
    if ($link.closest('.view')[0] !== this.$view[0] &&
      $link.closest('.view').parent().hasClass('attachment') === false) {
      return;
    }

    // Provide a default page if none has been set. This must be done
    // prior to merging with settings to avoid accidentally using the
    // page landed on instead of page 1.
    if (typeof(viewData.page) === 'undefined') {
      viewData.page = 0;
    }

    // Construct an object using the settings defaults and then overriding
    // with data specific to the link.
    $.extend(
      viewData,
      this.settings,
      Drupal.Views.parseQueryString(href),
      // Extract argument data from the URL.
      Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
    );

    // For anchor tags, these will go to the target of the anchor rather
    // than the usual location.
    $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

    // Construct an object using the element settings defaults,
    // then overriding submit with viewData.
    var pager_settings = $.extend({}, this.element_settings);
    pager_settings.submit = viewData;
    this.pagerAjax = new Drupal.ajax(false, $link, pager_settings);
    this.links.push(this.pagerAjax);
  };

  Drupal.ajax.prototype.commands.viewsScrollTop = function (ajax, response, status) {
    // Scroll to the top of the view. This will allow users
    // to browse newly loaded content after e.g. clicking a pager
    // link.
    var offset = $(response.selector).offset();
    // We can't guarantee that the scrollable object should be
    // the body, as the view could be embedded in something
    // more complex such as a modal popup. Recurse up the DOM
    // and scroll the first element that has a non-zero top.
    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }
    // Only scroll upward.
    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({scrollTop: (offset.top - 10)}, 500);
    }
  };

})(jQuery);
;

(function ($) {

	Drupal.behaviors.esker_international = {
	  attach: function (context, settings) {
	  var site_language = settings.esker_international.site_language;
	  
	  var trads = {
	 
	 "en":
	   { 
		 "rc_allcustomers" : "All Customers",
	     "rc_alldocs" : "All Document Types",
		 "rc_allsols" : "All Solutions",
		 "rc_allindus": "All Industries",
		 "rc_allerp"  : "All ERP",
		 "rc_filter"  : "Filter Results",
		 "cm_search"  : "Search",
		 "of_all"     : "All offices",
		 "pr_pdf"     : "Read PDF press release here.",
		 "cs_viewall"     : "View All",
		 "cs_viewallind"     : "All industries",
		 "cs_viewallsol"     : "All Solutions"
		 },
	"en-gb":
	   { 
	     "rc_allcustomers" : "All customers",
		 "rc_alldocs" : "All Document Types",
		 "rc_allsols" : "All Solutions",
		 "rc_allindus": "All Industries",
		 "rc_allerp"  : "All ERP",
		 "rc_filter"  : "Filter Results",
		 "cm_search"  : "Search",
		 "of_all"     : "All offices",
		 "pr_pdf"     : "Read PDF press release here.",
		 "cs_viewall"     : "View All",
		 "cs_viewallind"     : "All industries",
		 "cs_viewallsol"     : "All Solutions"
		 },
	"en-au":
	   { 
	     "rc_allcustomers" : "All customers",
	     "rc_alldocs" : "All Document Types",
		 "rc_allsols" : "All Solutions",
		 "rc_allindus": "All Industries",
		 "rc_allerp"  : "All ERP",
		 "rc_filter"  : "Filter Results",
		 "cm_search"  : "Search",
		 "of_all"     : "All offices",
		 "pr_pdf"     : "Read PDF press release here.",
		 "cs_viewall"     : "View All",
		 "cs_viewallind"     : "All industries",
		 "cs_viewallsol"     : "All Solutions"
		 },	 
	"en-sg":
	   { 
	     "rc_allcustomers" : "All customers",
	     "rc_alldocs" : "All Document Types",
		 "rc_allsols" : "All Solutions",
		 "rc_allindus": "All Industries",
		 "rc_allerp"  : "All ERP",
		 "rc_filter"  : "Filter Results",
		 "cm_search"  : "Search",
		 "of_all"     : "All offices",
		 "pr_pdf"     : "Read PDF press release here.",
		 "cs_viewall"     : "View All",
		 "cs_viewallind"     : "All industries",
		 "cs_viewallsol"     : "All Solutions"
		 },	 	 
	 "fr": 
	   { 
	     "rc_allcustomers" : "Tous nos clients",
	     "rc_alldocs" : "Tous les documents",
		 "rc_allsols" : "Toutes les solutions",
		 "rc_allindus": "Toutes les industries",
		 "rc_allerp"  : "Tous les ERP",
		 "rc_search"  : "Rechercher",
		 "rc_reset"  : "Annuler",
		 "rc_filter"  : "Filtrer",
		 "cm_search"  : "Rechercher",
		 "of_all"     : "Tous nos bureaux",
		 "pr_pdf"     : "Voir la version PDF",
		 "pr_allcat"     : "Toutes catégories",
		 "cs_viewall"     : "Voir tous",
		 "cs_viewallind"     : "Toutes industries",
		 "cs_viewallsol"     : "Toutes solutions"
		 },
	 "es": 
	   { 
	     "rc_allcustomers" : "Todos clientes",
	     "rc_alldocs" : "Todos los documentos",
		 "rc_allsols" : "Todas las soluciones",
		 "rc_allindus": "Todas las industrias",
		 "rc_allerp"  : "Todos los ERP",
		 "rc_search"  : "Buscar",
		 "rc_reset"  : "Borrar filtros",
		 "rc_filter"  : "Filtros",
		 "cm_search"  : "Buscar",
		 "of_all"     : "Todas nuestras oficinas",
		 "pr_pdf"     : "Ver en PDF",
		 "pr_allcat"     : "Todas las categorias",
		 "cs_viewall"     : "Ver todo",
		 "cs_viewallind"     : "Todas las industrias",
		 "cs_viewallsol"     : "Todas soluciones"
		 },
	 "nl": 
	   {
		 "rc_allcustomers" : "Alle",
  	     "rc_alldocs" : "Alle document types",
		 "rc_allsols" : "Alle oplossingen",
		 "rc_allindus": "Alle industrieën",
		 "rc_allerp"  : "Alle ERP's",
		 "rc_search"  : "Zoeken",
		 "rc_reset"  : "Reset",
		 "rc_filter"  : "Filters",
		 "cm_search"  : "Zoeken",
		 "of_all"     : "Alle kantoren",
		 "pr_pdf"     : "Lees hier het PDF persbericht",
		 "pr_allcat"     : "Alle categorieën",
		 "cs_viewall"     : "Bekijk alles",
		 "cs_viewallind"     : "Alle industrieën",
		 "cs_viewallsol"     : "Alle oplossingen"
		 },
	"it": 
	   { 
	     "rc_allcustomers" : "Tutti",
		 "rc_alldocs" : "Tutti i documenti",
		 "rc_allsols" : "Tutte le soluzioni",
		 "rc_allindus": "Tutti i settori",
		 "rc_allerp"  : "Tutti ERP",
		 "rc_search"  : "Cercare",
		 "rc_reset"  : "Reset filter",
		 "rc_filter"  : "Filter Results",
		 "cm_search"  : "Cercare",
		 "of_all"     : "Tutti nostri uffici",
		 "pr_pdf"     : "Vedi in PDF",
		 "pr_allcat"     : "Tutte le categorie",
		 "cs_viewall"     : "Vedere tutti",
		 "cs_viewallind"     : "Tutti i settori",
		 "cs_viewallsol"     : "Tutte le soluzioni"
		 },
	"de": 
	   { 
	     "rc_allcustomers" : "Alle",
	     "rc_alldocs" : "Alle Unterlagen",
		 "rc_allsols" : "Alle Lösungen",
		 "rc_allindus": "Alle Industrien",
		 "rc_allerp"  : "Alle ERP",
		 "rc_search"  : "Suchen",
		  "rc_reset"  : "Reset",
		 "rc_filter"  : "Filter Ergebnisse",
		 "cm_search"  : "Suchen",
		 "of_all"     : "Alle Büros",
		 "pr_pdf"     : "Als PDF ansehen",
		 "pr_allcat"     : "Alle Kategorien",
		 "cs_viewall"     : "Alles anzeigen",
		 "cs_viewallind"     : "Alle Industrien",
		 "cs_viewallsol"     : "Alle Lösungen"
		 }
	
	
	
		 
	};
	  
	  
	  
	  function removesubsols(lg)
	  {
		 // return true;
		  //SMS SERVICES
		$("#edit-field-business-need-tid option[value='1291']").remove();			
		$(".form-item-field-business-need-tid .options li[data-raw-value=1291]").remove();	
					
		//PAYMENT
		$("#edit-field-business-need-tid option[value='1316']").remove();			
		$(".form-item-field-business-need-tid .options li[data-raw-value=1316]").remove();	
					
		if(lg!="es"){
			//invoice del
			$("#edit-field-business-need-tid option[value='1301']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1301]").remove();	
		}
					
		//expense mgmt
		$("#edit-field-business-need-tid option[value='1286']").remove();			
		$(".form-item-field-business-need-tid .options li[data-raw-value=1286]").remove();	
		
					
		
		
		if(lg!="fr")
		{
			// claims & deds
			$("#edit-field-business-need-tid option[value='1311']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1311]").remove();				
						
			// credit mgmt
			$("#edit-field-business-need-tid option[value='1296']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1296]").remove();	
		
			//cash app
			$("#edit-field-business-need-tid option[value='1306']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1306]").remove();	
			
			//document delivery
			$("#edit-field-business-need-tid option[value='1331']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1331]").remove();				
		}
		
		if(lg=="fr")
		{
			
			//EDI			
			$("#edit-field-business-need-tid option[value='1246']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1246]").remove();	
		
		
			//FLYDOC
			$("#edit-field-business-need-tid option[value='1226']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1226]").remove();	
		
		
			//FAX SERVER
			$("#edit-field-business-need-tid option[value='191']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=191]").remove();	
			
			//FAX SERVICES
			$("#edit-field-business-need-tid option[value='26']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=26]").remove();	
			
			
			//MAIL SERVICES
			$("#edit-field-business-need-tid option[value='25']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=25]").remove();	
		
		}
		
	  }
	  
	  
	  $(document).ready(function(){
		   
		   
		//Map fancyselect change with dom select change   
		if($(".form-select").length)
		{			    
		   var mySelect =  $('.form-select');
			mySelect.fancySelect().on('change.fs', function() 
			{
				$(this).trigger('change.$');
			});			
		}
		
		//Custom fixed entry for customer stories
		$("#custories").text('Customer Success Stories');
		
		
		//--------------------------RESOURCES CENTER
		
		function ProcessField(fid,tradid)
		{
		
			//TRIGGER			
			if($(fid+" .trigger").text().indexOf(trads["en"][tradid])!=-1)
			{
				$(fid+" .trigger").text(trads[site_language][tradid]);
			}
			
			//UL
			$(fid+" .options li[data-raw-value=All]").text(trads[site_language][tradid]);								
			
			//SELECT 
			$(fid+' select option[value="All"]').text(trads[site_language][tradid])
			
			//REORDER UL				 				
			var $list = $(fid +" .options");				 				
			$list.children().sort(function(a, b) 
			{
				if($(a).text()!=trads[site_language][tradid])//Pour ne pas inclure "All x"
				{
				return $(a).text().localeCompare($(b).text());					
				}
			}).appendTo($list);	
				
			$list.each(function() {
				var seen = {};
				$(this).children('li').each(function() {
					var txt = $(this).text();					
					if(txt==trads[site_language][tradid])
					{						
						$(this).parent().prepend($(this));					
					}						
					if (seen[txt])
						$(this).remove();
					else
						seen[txt] = true;
				});
			  });			
		}			
		
		
		//REMOVE HREF FOR TABBED CONTENT DC SEO	 
		
		
		
		if($(".view-tabbed-content").length||$(".view-office-locations-list").length||$(".view-press-release").length){		
			$(".form-type-bef-link a").removeAttr("href").css("cursor","pointer");			
			
		}	
		
		
		
		//-----CUSTOMER PAGES
		//US
		
		if($(".view-id-resources_landing_page").length&&$(".view-display-id-panel_pane_5").length)
		{								
			
			
			//CUSTOM REMOVAL REQUESTS
			
			//INDUSTRIES
			

		
			//Banking/Insurance
			$("#edit-field-industry-tid option[value='56']").remove();			
			$(".form-item-field-industry-tid .options li[data-raw-value=56]").remove();
			
			//Consumer Goods
			$("#edit-field-industry-tid option[value='66']").remove();			
			$(".form-item-field-industry-tid .options li[data-raw-value=66]").remove();
			
			//Industrial services
			$("#edit-field-industry-tid option[value='1281']").remove();			
			$(".form-item-field-industry-tid .options li[data-raw-value=1281]").remove();
			
			//SOLUTIONS
			//CASH APP
			$("#edit-field-business-need-tid option[value='1306']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1306]").remove();
				
			//CLAIMS
			$("#edit-field-business-need-tid option[value='1311']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1311]").remove();
			
			//CREDIT
			$("#edit-field-business-need-tid option[value='1296']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1296]").remove();
			
			//DOCDEL
			$("#edit-field-business-need-tid option[value='1331']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1331]").remove();
			
			//EXP
			$("#edit-field-business-need-tid option[value='1286']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1286]").remove();
			
			//HA
			$("#edit-field-business-need-tid option[value='101']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=101]").remove();
			
			//ID
			$("#edit-field-business-need-tid option[value='1301']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1301]").remove();
			
			//PAYMENT
			$("#edit-field-business-need-tid option[value='1316']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1316]").remove();
			
			//SMS
			$("#edit-field-business-need-tid option[value='1291']").remove();			
			$(".form-item-field-business-need-tid .options li[data-raw-value=1291]").remove();
			
			
			
	
		}
		
		//CUSTOMER V2
			
		if(($(".view-id-resources_landing_page").length&&$(".view-display-id-panel_pane_9").length)||($(".view-id-resources_landing_page").length&&$(".view-display-id-panel_pane_11").length))
		{											
	
			if(site_language=="fr"||site_language=="es"||site_language=="de"||site_language=="it"||site_language=="nl")
			{
				//SEARCH
				$('.views-submit-button input').val(trads[site_language]["rc_search"]);
				
				//Filter on mobile
				$("#filter-trigger").text(trads[site_language]["rc_filter"]);			
							
				//Reset
				$(".reset").text(trads[site_language]["rc_reset"]);			
														
				//LETTERS			
				ProcessField(".form-item-title", "rc_allcustomers" );				
				//SOLUTIONS
				ProcessField(".form-item-field-business-need-tid", "rc_allsols" );					
				//INDUSTRIES
				ProcessField(".form-item-field-industry-tid", "rc_allindus" );					
				//ERP
				ProcessField(".form-item-field-erp-tid", "rc_allerp" );		
				
			}
		}
		 
		
		
		//CUSTOMER V2 
		if($(".view-id-resources_landing_page").length&&$(".view-display-id-panel_pane_9").length)
		{	
			if(site_language!="en")
			{
				//REMOVE ADDITIONAL SOLUTIONS	
				removesubsols(site_language);
				
			}
		}
		
		
		if($(".view-id-resources_landing_page").length&&$(".view-display-id-panel_pane_11").length)
		{	
			if(site_language=="fr")
			{
				//REMOVE ADDITIONAL SOLUTIONS	
				removesubsols(site_language);
				
			}
		}
		
		
		//RC	
		if($(".form-item-resource-type").length)
		{								
			
			if(site_language=="fr"||site_language=="es"||site_language=="de"||site_language=="it"||site_language=="nl")
			{				
				//SEARCH BUTTON
				//$('#edit-submit-resources-landing-page').val(trads[site_language]["rc_search"]);
				$('.views-submit-button input').val(trads[site_language]["rc_search"]);
				
				//Filter on mobile
				$("#filter-trigger").text(trads[site_language]["rc_filter"]);			
							
				//Reset
				$(".reset").text(trads[site_language]["rc_reset"]);			
							
				//DOCUMENT TYPES
				ProcessField(".form-item-resource-type", "rc_alldocs" );
				//SOLUTIONS
				ProcessField(".form-item-field-business-need-tid", "rc_allsols" );					
				//INDUSTRIES
				ProcessField(".form-item-field-industry-tid", "rc_allindus" );					
				//ERP
				ProcessField(".form-item-field-erp-tid", "rc_allerp" );		
			}	
			
			
			if(site_language!="en"&&site_language!="fr"&&site_language!="nl"&&site_language!="en-au")
			{
				//Removing CM pour les filiales non US/FR			
				$("#edit-field-business-need-tid option[value='181']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=181]").remove();
				
			}
			
			
			
			//REMOVE ADDITIONAL SOLUTIONS FROM THE RESOURCES CENTER		
			removesubsols(site_language);
				      
				
				
			
			
			if(site_language=="en")
			{			
				
				//Remove collections management, mail services, purchasing, fax server, ha
	
	
				$("#edit-field-business-need-tid option[value='101']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=101]").remove();
				
				$("#edit-field-business-need-tid option[value='181']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=181]").remove();															
				
				$("#edit-field-business-need-tid option[value='25']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=25]").remove();															
				
				$("#edit-field-business-need-tid option[value='24']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=24]").remove();															
				
				$("#edit-field-business-need-tid option[value='191']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=191]").remove();															
				
				
				//HIDE INDUSTRY, RESIZE FILTERS (In css)
				
				$(".views-widget-filter-field_industry_tid").hide();				
			}
			
			if(site_language=="en-gb")
			{	
				
				$("#edit-resource-type option[value='2']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=2]").remove();																					
				
				$("#edit-resource-type option[value='20']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=20]").remove();																					
				
				$(".text:contains('Read Tech Brief')").text("Read Business Brief");			
				//HIDE INDUSTRY, RESIZE FILTERS (In css)
				$(".views-widget-filter-field_industry_tid").hide();		
				
			}
			
			
			if(site_language=="en-sg")
			{	
				
				$("#edit-resource-type option[value='15']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=15]").remove();																					
				
				$("#edit-resource-type option[value='16']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=16]").remove();																					
				
				$("#edit-resource-type option[value='17']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=17]").remove();																					
				
				$("#edit-resource-type option[value='20']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=20]").remove();																									
				
				
			}
			
			
			
			
			if(site_language!="de")
			{	
				//Removing EDI for all but DE
				$("#edit-field-business-need-tid option[value='1246']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=1246]").remove();		
		
			}
			
			if(site_language!="fr")
			{
				//Removing FLYDOC for all but FR
				$("#edit-field-business-need-tid option[value='1226']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=1226]").remove();		
			}
			
			if(site_language=="fr")
			{
				
				
				$(".esk_res_title:contains('Évaluez votre processus')").parent().parent().parent().parent().find(".esk_res_bot .text").text("Faire le test");
				
				//FICHE PRODUITS
				$("#edit-resource-type option[value='17']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=17]").remove();	
				
				//GUIDES
				$("#edit-resource-type option[value='2']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=2]").remove();	
				
				//GUIDES
				$("#edit-resource-type option[value='16']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=16]").remove();	
				
				
				//TEMOIGNAGES
				$("#edit-resource-type option[value='15']").remove();			
				$(".form-item-resource-type .options li[data-raw-value=15]").remove();	
				
				
			}
	
			if(site_language!="es")
			{
				//Removing SEARCHBAR for all but ES
				$(".views-widget-filter-title").hide();		
				
			}
	
			if(site_language=="es")
			{
				//Removing SEARCHBAR for all but ES
				$(".form-item-title").attr("placeholder", "Escribe aquí ...");							
				$(".views-widget-filter-field_erp_tid").hide();		
			}
			
		}	
		
		//--------------------------SEARCH	
		if(site_language=="fr"||site_language=="es"||site_language=="de"||site_language=="it"||site_language=="nl")
		{		
			
			$(".header .pane-search-form .form-text").attr("placeholder", trads[site_language]["cm_search"]);        
			$(".mobile-header .pane-search-form .form-text").attr("placeholder", trads[site_language]["cm_search"]);  
			$(".header-search .pane-search-form .form-text").attr("placeholder", trads[site_language]["cm_search"]);    
			$(".search-layout .onecol-layout .pane-search-form .form-text").attr("placeholder", trads[site_language]["cm_search"]);
		}	
		
		
		//--------------------------OFFICES		
		if(site_language=="fr"||site_language=="es"||site_language=="de"||site_language=="it"||site_language=="nl")
		{	
			if($("#views-exposed-form-office-locations-list-panel-pane-1").length){
	
				$("#edit-nid-entityreference-filter-all	A").text(trads[site_language]["of_all"]);
		
			}
		}
		
			//--------------------------CUSTOMERS
		
		if($(".view-customers-list").length){
			
			
			if(site_language!="en"&&site_language!="fr"&&site_language!="en-au")
			{				
				//Removing CM pour les filiales non US/FR			
				$("#edit-field-business-need-tid option[value='181']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=181]").remove();																
				
			}
			
			if(site_language!="fr")
			{						
				//Removing FLYDOC for all but FR
				$("#edit-field-business-need-tid option[value='1226']").remove();			
				$(".form-item-field-business-need-tid .options li[data-raw-value=1226]").remove();															
			}
			
			if(site_language=="fr"||site_language=="es"||site_language=="de"||site_language=="it"||site_language=="nl")
			{				
				//CS NAME			
				ProcessField(".form-item-title", "cs_viewall" );			
				
				//CS IND
				ProcessField(".form-item-field-industry-tid", "cs_viewallind" );			
				
				//CS SOL
				ProcessField(".form-item-field-business-need-tid", "cs_viewallsol" );			
				
				//Search
				$("#edit-submit-customers-list").val("Ok");
				
				//Reset
				$("#edit-reset").val(trads[site_language]["rc_reset"]);		
				
			
			}	
	
		}	
		
		
		
		//--------------------------PR
		if(site_language=="fr"||site_language=="es"||site_language=="de"||site_language=="it"||site_language=="nl")
		{	
					
			if($(".form-item-edit-field-pr-category-tid-all").length)
			{
				$('#edit-field-pr-category-tid option[value="All"]').text(trads[site_language]["pr_allcat"]);
				$(".form-item-edit-field-pr-category-tid-all A").text(trads[site_language]["pr_allcat"]);				
			}
		}
		
		
		//---------------------------PDF PR	
		if($(".pane-node-field-pdf-version").length)
		{	
			var pdfurl=$(".field-name-field-pdf-version").text();
			$(".field-name-field-pdf-version").html('<div align="center"><a href="'+pdfurl+'" class="button" target="_blank">'+trads[site_language]["pr_pdf"]+'</a></div><p>&nbsp;</p>');		
		}
		
		
		});
		
	  }
	}
	
	
	
	
	
	})(jQuery);;
/**
 * @file views_load_more.js
 *
 * Handles the AJAX pager for the view_load_more plugin.
 */
(function ($) {

  /**
   * Provide a series of commands that the server can request the client perform.
   */
  Drupal.ajax.prototype.commands.viewsLoadMoreAppend = function (ajax, response, status) {
    // Get information from the response. If it is not there, default to
    // our presets.
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var targetList = response.targetList || '';
    var effect = ajax.getEffect(response);
    var pager_selector = response.options.pager_selector ? response.options.pager_selector : '.pager-load-more';

    // We don't know what response.data contains: it might be a string of text
    // without HTML, so don't rely on jQuery correctly iterpreting
    // $(response.data) as new HTML rather than a CSS selector. Also, if
    // response.data contains top-level text nodes, they get lost with either
    // $(response.data) or $('<div></div>').replaceWith(response.data).
    var new_content_wrapped = $('<div></div>').html(response.data);
    var new_content = new_content_wrapped.contents();

    // For legacy reasons, the effects processing code assumes that new_content
    // consists of a single top-level element. Also, it has not been
    // sufficiently tested whether attachBehaviors() can be successfully called
    // with a context object that includes top-level text nodes. However, to
    // give developers full control of the HTML appearing in the page, and to
    // enable Ajax content to be inserted in places where DIV elements are not
    // allowed (e.g., within TABLE, TR, and SPAN parents), we check if the new
    // content satisfies the requirement of a single top-level element, and
    // only use the container DIV created above when it doesn't. For more
    // information, please see http://drupal.org/node/736066.
    if (new_content.length != 1 || new_content.get(0).nodeType != 1) {
      new_content = new_content_wrapped;
    }
    // If removing content from the wrapper, detach behaviors first.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.detachBehaviors(wrapper, settings);
    if ($.waypoints != undefined) {
      $.waypoints('refresh');
    }

    // Set up our default query options. This is for advance users that might
    // change there views layout classes. This allows them to write there own
    // jquery selector to replace the content with.
    // Provide sensible defaults for unordered list, ordered list and table
    // view styles.
    var content_query = targetList && !response.options.content ? '> .view-content ' + targetList : response.options.content || '> .view-content';

    // If we're using any effects. Hide the new content before adding it to the DOM.
    if (effect.showEffect != 'show') {
      new_content.find(content_query).children().hide();
    }

    // Update the pager
    // Find both for the wrapper as the newly loaded content the direct child
    // .item-list in case of nested pagers
    wrapper.find(pager_selector).replaceWith(new_content.find(pager_selector));

    // Add the new content to the page.
    wrapper.find(content_query)[method](new_content.find(content_query).children());

    // Re-class the loaded content.
    // @todo this is faulty in many ways.  first of which is that user may have configured view to not have these classes at all.
    wrapper.find(content_query).children()
      .removeClass('views-row-first views-row-last views-row-odd views-row-even')
      .filter(':first')
        .addClass('views-row-first')
        .end()
      .filter(':last')
        .addClass('views-row-last')
        .end()
      .filter(':even')
        .addClass('views-row-odd')
        .end()
      .filter(':odd')
        .addClass('views-row-even')
        .end();

    if (effect.showEffect != 'show') {
      wrapper.find(content_query).children(':not(:visible)')[effect.showEffect](effect.showSpeed);
    }

    // Additional processing over new content
    wrapper.trigger('views_load_more.new_content', new_content.clone());

    // Attach all JavaScript behaviors to the new content
    // Remove the Jquery once Class, TODO: There needs to be a better
    // way of doing this, look at .removeOnce() :-/
    var classes = wrapper.attr('class');
    var onceClass = classes.match(/jquery-once-[0-9]*-[a-z]*/);
    wrapper.removeClass(onceClass[0]);
    settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.attachBehaviors(wrapper, settings);
  };

  /**
   * Attaches the AJAX behavior to Views Load More waypoint support.
   */
  Drupal.behaviors.ViewsLoadMore = {
    attach: function (context, settings) {
      var default_opts = {
          offset: '100%'
        };

      if (settings && settings.viewsLoadMore && settings.views && settings.views.ajaxViews) {
        $.each(settings.viewsLoadMore, function(i, setting) {
          var view = '.view-id-' + setting.view_name + '.view-display-id-' + setting.view_display_id + ' .pager-next a',
            opts = {};

          $.extend(opts, default_opts, settings.viewsLoadMore[i].opts);

          $(view).waypoint('destroy');
          $(view).waypoint(function(event, direction) {
            $(view).click();
          }, opts);
        });
      }
    },
    detach: function (context, settings, trigger) {
      if (settings && settings.viewsLoadMore && settings.views && settings.views.ajaxViews) {
        $.each(settings.viewsLoadMore, function(i, setting) {
          var view = '.view-id-' + setting.view_name + '.view-display-id-' + setting.view_display_id;
          if ($(context).is(view)) {
            $('.pager-next a', view).waypoint('destroy');
          }
          else {
            $(view, context).waypoint('destroy');
          }
        });
      }
    }
  };
})(jQuery);
;
