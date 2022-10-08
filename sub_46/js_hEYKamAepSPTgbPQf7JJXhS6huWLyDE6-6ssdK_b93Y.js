
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
