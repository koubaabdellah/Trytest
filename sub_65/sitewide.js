/*This is a common script for all our sites.
*/








$(document).ready(function () {
	commonJS.injectNavActiveClass();
	//Workaround to hide empty "in this topic" block. 
	$("#main-toc-large ol:empty").parent().hide();
	// hide search icon for Trust
	if (window.location.host.indexOf("trust") > -1) {
		$("div.esri-header-search").css("display", "none");
		 $(document).scroll(function(){
			 if($(window).scrollTop() <=0){ 
				 setTimeout(function(){
					 $(".es-nav").removeAttr("data-fixed");
				  }, 50) 
		     }
		 });

	}
	//inject Manage Cookies link in the footer
	setTimeout(function(){
		if($("#cookie-footer-esri-nav").length <= 0){
			$('<li class="esri-footer-info-item" id="esri-footer-info-link--1"><a class="esri-footer-info-link" id="cookie-footer-esri-nav"><!-- OneTrust Cookies Settings button start --><button id="ot-sdk-btn" class="ot-sdk-show-settings">Manage Cookies</button><!-- OneTrust Cookies Settings button end --> </a></li>').insertBefore('[id="esri-footer-info-link--1"]');
		}
		if($("#cookie-footer").length <= 0){
			$("<a  id='cookie-footer'><!-- OneTrust Cookies Settings button start --><button id='ot-sdk-btn' class='ot-sdk-show-settings'>Manage Cookies</button><!-- OneTrust Cookies Settings button end --> </a><span> | </span>" ).insertBefore('[href*="www.esri.com/legal/software-license"],[data-langlabel="legal"]');
		}
		$("#ot-sdk-btn").text("Manage Cookies");
	}, 500);
});


(function () {

	window.commonJS = {
		
		// Inject active class to to nav link on the basis of site and path
		injectNavActiveClass: function (){
			var winloc = window.location
			// Doc site.
			if(winloc.host.indexOf("doc") >= 0){
				$(".block.card").addClass("trailer-1");
				if(winloc.pathname.match( /(\/arcgis-online\/)/)){
					$("#nav-help").addClass("active");
				}
				//For Living Atlas docs only.
				if(winloc.pathname.match( /(\/living-atlas\/)/)){
					$(".navigation-bar .container h1 > a").attr("href", $(".navigation-bar .container h1 > a").attr("href") + "/about")
				}
				if(winloc.pathname.match(/(\/web-appbuilder\/)/)){
					var version = window.location.pathname.split("/")[3];
					$(".sub-nav-link").each(function(){$(this).attr("href", $(this).attr("href").replace("/latest/","/"+version+"/"))});
					$(".js-select-nav option").each(function(){$(this).attr("value", $(this).attr("value").replace("/latest/","/"+version+"/"))});
				}
				if(winloc.pathname.match(/(\/dashboards\/10\.7\/)/)){
					setTimeout(function(){
						$(".ternav-menu-item")[2].hidden=true;
					}, 500);
				}
			}
			
			// Learn site.
			if(winloc.host.indexOf("learn") >= 0){
				if(winloc.pathname.match(/(\/related-concepts\/)/)){
					$(".sdk-home-banner-content .breadcrumbs").hide();
					$("#main-toc-large").hide();
				}				
				if(winloc.pathname.match( /(\/lessons\/)/)){			
				  $(window).resize(function(){
					if(window.doctoc["innerBreadcrumb"] !== undefined){
						if ($("#main-toc-large p img").offset() !== undefined && $("#main-toc-large p img").offset().top + $("#main-toc-large p img").height() + 30 > $("#navigators.js-sticky").offset().top){
								$("#navigators.js-sticky").offset({"top":$("#main-toc-large p img").offset().top + $("#main-toc-large p img").height()+30});
						}
						if ($(window).scrollTop() + 100 > $("main hr").offset().top -$("#navigators").height()){
								$("#navigators.js-sticky").css("position","absolute");
								$("#navigators.js-sticky").offset({"top":$("main hr").offset().top - $("#navigators").height()})
						}
					}
				 });
				$(document).scroll(function(){
					if(window.doctoc["innerBreadcrumb"] !== undefined){
						if($("#bigmac").offset().top > $("#bigmac").attr("data-offset-top"))
							$("#bigmac").show();
						else
							$("#bigmac").hide();
						if ($(window).scrollTop() + 100 > $("main hr").offset().top -$("#navigators").height()){
								$("#navigators.js-sticky").css("position","absolute");
								$("#navigators.js-sticky").offset({"top":$("main hr").offset().top - $("#navigators").height()})
						}
						else {
							if ($("#main-toc-large p img").offset() !== undefined && $("#main-toc-large p img").offset().top + $("#main-toc-large p img").height() + 30 > $("#navigators.js-sticky").offset().top){
								$("#navigators.js-sticky").css("position","absolute");
								$("#navigators.js-sticky").offset({"top":$("#main-toc-large p img").offset().top + $("#main-toc-large p img").height()+30});
								return;
							}
							if ($(window).scrollTop() > $("#main-toc-large").offset().top + 150){
								$("#navigators.js-sticky").css("position","fixed");
								$("#navigators.js-sticky").css("top","230px");							
							}
						}		
					}
				});
				}
				if(winloc.pathname.match( /(\/support\/)/)){
					$("#nav-support").closest("li").addClass("is-active")
				}else if(winloc.pathname.match( /(\/gallery\/)/)){
					$("#nav-gallery").closest("li").addClass("is-active")
				}
			}
			
			//pro site. temporary fix to the issue caused by padded-anchor class in gptool summary page
			if(winloc.host.indexOf("pro") >= 0){
				$("div.section1.summary").removeClass("padded-anchor");
				if($("div[purpose='gplicense']") !== undefined){
					$("div[purpose='gplicense'] ul li").each(function() {
						$(this).html($(this).html().replace('ArcGIS Desktop', ''));
					});
				}
				
				/* workaround for the prefixurl */
				if(window.doctoc && window.doctoc.prefixUrl){
					if(window.location.pathname.match( /(\/2.7\/)/)){ 
						var explodedPath = window.location.pathname.split("/");
						var versionSegment = "/{0}/".format(explodedPath[3]);
						if(window.doctoc.prefixUrl.indexOf(versionSegment) < 0){
							window.doctoc.prefixUrl = window.doctoc.prefixUrl.replace("/pro-app/", "/pro-app"+versionSegment)
						}
					}
				}
				/* End of workaround for the prefixurl */
				window.addEventListener('load', function() {
					if(window.location.pathname.match( /(\/2.6\/)/)){ 
					  var currentVersion = "/2.6/"//window.location.pathname.match( /(\/2.6\/)/)[0];
					  setTimeout(function(){
					  $(".ternav-menu-item a,.esri-secondary--menu-item a").each(function (){
						  $(this)[0].href = $(this)[0].href.replace("/latest/",currentVersion)
					  });
					  }, 100);
					}
				});

				if (localStorage.getItem ("gptab")) {
				  setTimeout(function(){
				  $(".gptab[val="+localStorage.getItem ("gptab")+"]")[0].click()
				  },500);
				}
				$(".gptab").click(function(){
				  var clickedVal = $(this).attr("val")
				  localStorage.setItem("gptab",clickedVal)
				});
			}
			
			//desktop site . This condition is specific to 10.3 content.
			if(winloc.host.indexOf("desktop") >= 0){
				if(winloc.pathname.match( /(\/10.3\/)/)){
					var bluBarTitle = (window.docConfig && window.localeJsonObj[docConfig['locale'].toLowerCase()]['arcgis-desktop'])?window.localeJsonObj[docConfig['locale'].toLowerCase()]['arcgis-desktop'] : "ArcMap";
					var helpStr = (window.docConfig && window.localeJsonObj[docConfig['locale'].toLowerCase()]['help'])?window.localeJsonObj[docConfig['locale'].toLowerCase()]['help'] : "help";

					if($(".navigation-bar .container h1 > a").text() === helpStr || $(".navigation-bar .container h1 > a").text() === "Help") {
						$(".navigation-bar .container h1 > a").text(bluBarTitle);
					}
				}
				
				if(winloc.pathname.match( /(\/latest\/)/)){
					if($(".site-search-form .site-search-input").length > 0){
						var searchPlaceholderStr = $(".site-search-form .site-search-input").attr("placeholder").replace("10.6", "10.8");
						$(".site-search-form .site-search-input").attr("placeholder", searchPlaceholderStr)
					}
					if ($(".site-search-form input[name=version]").length > 0){
						$(".site-search-form input[name=version]").val($(".site-search-form input[name=version]").val().replace("10.6", "10.8"));
					}
				}
				
				if($("#footer nav li a[data-langlabel=insiders-blog]").attr("href") && $("#footer nav li a[data-langlabel=insiders-blog]").attr("href").indexOf("esri-insider") >= 0){
					$("#footer nav li a[data-langlabel=insiders-blog]").attr("href", "https://www.esri.com/about/newsroom/blog/")
				}
			}
			
			if(winloc.host.indexOf("enterprise") >= 0 && winloc.host.indexOf("k8s") < 0){
				if(winloc.pathname.match( /(\/en\/)/) && winloc.pathname.match( /(\/latest\/)/)){
					$(".search-content input[name=version]").val($(".search-content input[name=version]").val().replace("10.6", "10.7"))
				}
				if($(".top-nav-list .dropdown-sublist-featured").length <= 0 ){
						$("<div class='dropdown js-dropdown '>").load("/server-dropdown-template.html").insertAfter($(".top-nav-list #nav-portal"));
						$(".top-nav-list #nav-server").remove();
				}
			}
			
			//workaround for footer links change
			if($(".footer nav li a[data-langlabel=arcgis-for-developers]").text().indexOf("Developers") >= 0){
				$(".footer nav li a[data-langlabel=arcgis-for-developers]").text("ArcGIS Developer");
			}
			//Mostly for Calcite specific pages
			if($(".footer h6[data-langlabel*=platform]").text().length > 6){
				$(".footer h6[data-langlabel*=platform]").text("ArcGIS");
			}
			//inject arcgis platform link
			if($(".footer nav li a[data-langlabel=nav_arcgis-platform]").length <= 0){
				$(".footer nav li a[data-langlabel=arcgis-for-server]").parent().after('<li><a data-langlabel="nav_arcgis-platform" href="//www.esri.com/en-us/arcgis/products/arcgis-platform/overview">ArcGIS Platform</a></li>')
			}
			
		}
	}
 
})()
;
