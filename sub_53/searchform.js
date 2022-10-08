$(document).ready (function (){


  $("#helpSearchForm, #helpSearchFormTop").submit(function() {
	var searchForm = ".site-search #helpSearchForm";
	  if($(".drawer").is(':visible')){
		searchForm = ".drawer #helpSearchForm";
	  }
    var term = $(searchForm + " > input[name='q']").val() || "",
    	col = $(searchForm + " > input[name='collection']").val() || "",
    	prod = $(searchForm + " > input[name='product']").val() || "any",
        lang = $(searchForm + " > input[name='language']").val() || "en",
        plat = $(searchForm + " > input[name='platform']").val() || "",
        soln = $(searchForm + " > input[name='solution']").val() || "",
        version = $(searchForm + " > input[name='version']").val() || "10.8",
    	query = "/search/?";

    if (plat === "detect") {
        var agent = navigator.userAgent,
            iosFlg = agent.match(/(iPhone|iPod|iPad)/gi),
            androidFlg = agent.match(/(Android)/gi),
            winFlg = agent.match(/(Windows Phone)/gi);

        if (prod === "collector-android") {
            if (iosFlg) {
                prod = "collector-ios";
            }
        } else if (prod === "android-app") {
            if (iosFlg) {
                prod = "ios-app";
            } else if (winFlg) {
                prod = "win-phone-app";
            }
        }
    }

    query = query + "q=" + encodeURIComponent(term);
    query = query + "&collection=" + encodeURIComponent(col);

    if (prod) {
        query = query + "&product=" + encodeURIComponent(prod);
    }

    if (soln) {
        query = query + "&solution=" + encodeURIComponent(soln);
    }

    if (version) {
        query = query + "&version=" + encodeURIComponent(version);
    }

    query = query + "&language=" + encodeURIComponent(lang);

    window.location.href = query;

    return false;
  });

});
