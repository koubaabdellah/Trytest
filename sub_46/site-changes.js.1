function getUrlLang() {
    var loc = window.location,
        path = loc.pathname,
        lg = path.split ("/")[1].toLowerCase();
    if (lg in GLangLabels) {
        return lg;
    } else {
        return "en";
    }
}

$(document).ready(function() {
  var curLang = getUrlLang()
  var li_links = '<li><a href="//pro.arcgis.com/'+curLang+'/pro-app/">ArcGIS Pro</a></li><li><a href="/'+curLang+'/arcmap/">ArcMap</a></li>';

  $('nav.site-nav ul').html(li_links);
  $('nav.drawer-nav ul').html(li_links);
  $('nav.drawer-nav li a').addClass('drawer-link');
  $('footer nav:first ul li:first').after(li_links);
  
  //workaround for footer links change
  
	if($(".footer nav li a[data-langlabel=arcgis-for-developers]").text().indexOf("Developers") >= 0){
		$(".footer nav li a[data-langlabel=arcgis-for-developers]").text("ArcGIS Developer");
	}
	if($(".footer h4[data-langlabel*=platform]").text().length > 6){
		$(".footer h4[data-langlabel*=platform]").text("ArcGIS");
	}
	if($(".footer nav li a[data-langlabel=nav_arcgis-platform]").length <= 0){
		$(".footer nav li a[data-langlabel=arcgis-for-server]").parent().after('<li><a data-langlabel="nav_arcgis-platform" href="//www.esri.com/en-us/arcgis/products/arcgis-platform/overview">ArcGIS Platform</a></li>')
	}
	
	if($(".site-brand nav h4[data-langlabel=arcgis-for-server]").length >0 && $(".site-brand nav h4[data-langlabel=arcgis-for-server]").closest('a').attr('href').indexOf('server.arcgis.com') >=0 ){
		$(".site-brand nav h4[data-langlabel=arcgis-for-server]").closest('a').attr('href', "//enterprise.arcgis.com")
	}
	if($(".esri-logo-footer").legth >0 && $(".esri-logo-footer").attr('href').indexOf("//esri.com") >=0 ){
		$(".esri-logo-footer").attr('href',"//www.esri.com")
	}

	if($(".icon-github, .icon-social-github").length >0 && $(".icon-github, .icon-social-github").attr('href').indexOf("esri.github.com") >=0){
		$(".icon-github, .icon-social-github").attr('href',"//esri.github.io/")
	}

  setTimeout(function{
		if($("#cookie-footer").length <= 0){
			$("<a  id='cookie-footer'><!-- OneTrust Cookies Settings button start --><button id='ot-sdk-btn' class='ot-sdk-show-settings'>Manage Cookies</button><!-- OneTrust Cookies Settings button end --> </a><span> | </span>" ).insertBefore('[href*="www.esri.com/legal/software-license"]');
		}
		$("#ot-sdk-btn").text("Manage Cookies");
	}, 500);

});
