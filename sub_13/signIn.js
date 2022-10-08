$(document).ready(function() {

 function removeLocalStorageSigninKeys(){
	if (localStorage.getItem('agol_token')){
		localStorage.removeItem('agol_token');
	}								
  }

  function getUserDisplayName(user) {
      var fullName = user && user.fullName || "",
  	      firstName = fullName;

      // Format the name that shows in user profile dropdown
      // If '_', assume the name is before the '_',
      // If ',', assume the name is after the first ','
      // else use the name before the first space
      // issue: https://devtopia.esri.com/WebGIS/arcgis-portal-app/issues/705

      if (fullName.indexOf("_") > -1) {
        firstName = fullName.split("_")[0];
      } else if (fullName.indexOf(",") > -1) {
        firstName = fullName.split(",").slice(1).join(" ");
      } else if (fullName.indexOf(" ") > -1) {
        //firstName = fullName.split(" ").slice(0, -1).join(" ");
        firstName = fullName.split(" ")[0];
      }
      return firstName.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ");
    };


  function  getOrgHostname (data) {
    if (data) {
      return data.urlKey ? data.urlKey + "." + data.customBaseUrl : data.portalHostname;
    } else {
      return "www.arcgis.com";
    }
  }
  
  function showSignInLink (){
	  
  	$("#logged-in-navigation").addClass ("hide");	
	$("#logged-out-navigation").removeClass("hide");											  
    $("#logged-out-navigation a").attr ("href", sitecfg["agolSignin"]+"?returnUrl="+encodeURIComponent(window.location.href));
	removeLocalStorageSigninKeys();
	
  }
  function showUserInfo (params) {
  	$("#logged-out-navigation").addClass ("hide");
  	$("#logged-in-navigation").removeClass ("hide");
        
	var firstName,
	  		text; 	

	$.getJSON(portalHostname + "/sharing/rest/portals/self", params, function (data) {
		if(data.error){
					showSignInLink();
					return;
		}		 
		var firstName = getUserDisplayName(data && data.user),        
		  orgHostname = getOrgHostname (data),   
			text = firstName || "SIGN IN";

		//$(".result").html(text);
		$("#logged-in-navigation #user-dropdown > a").html (avatar+"<span>"+ text +"</span>");
		$(".mobile-user-dropdown > img").attr ("src",avatarurl + "&s=34");
		$(".data-username").text(text);
		

	  $(".agolProfile a").attr ("href", "//" + orgHostname + sitecfg["agolProfile"]);
	  $(".agolHelp").attr ("href", "//" + orgHostname + sitecfg["agolHelp"]);
		$(".agolLogout a").attr ("href", "https://" + orgHostname + sitecfg["agolSignout"]+"?redirect_uri=https:"+sitecfg["portalHostname"] + sitecfg["agolSignout"]+"?redirect_uri="+encodeURIComponent(window.location.href));

	  $(".myconsole").css ("display", "block");
		 
		 if(data.subscriptionInfo && (data.subscriptionInfo.type.toLowerCase() === "trial" && data.subscriptionInfo.state.toLowerCase() === "active")){
			var trialDownloadString = (window.localeJsonObj['docConfig'] && window.localeJsonObj[docConfig['locale']]['trial-downloads'])?window.localeJsonObj[docConfig['locale']]['trial-downloads'] : "Trial Downloads";
			$(".myconsole li:last").before('<li><a href="' + sitecfg["trialDownloadUrl"] + '">' + trialDownloadString +'</a></li>');
		}
	}).fail(function() {
		console.log("showing signin link as /portal/self failed");
		showSignInLink();
	}); 
  }

  
  $(".agolLogout").on("click", function(){  
	  removeLocalStorageSigninKeys();
  });

  /* login */
  var proxyURL = (navigator.userAgent.match(/msie/i)) ? "/apps/proxy/proxy.php?" : "",
	  params = {f:"json"},
	  portalHostname = sitecfg["portalHostname"],
	  tokenVal = localStorage.getItem("agol_token");
	  
  var avatarurl = "//www.gravatar.com/avatar/d1d2c2e15928068c29c38206811ee2c6.jpg?d=mm",
      avatar = "<img width='18px' height='18px' class='profile-image' data-user-avatar='18' alt='' src='" + avatarurl +"&s=18' />";

  $.ajaxSetup({async:false});
  if (!tokenVal || JSON.parse(tokenVal).expires_in <= 0) {
	  $.ajax({
							   url: proxyURL + "https:"+portalHostname + "/sharing/rest/oauth2/platformSelf",
							   type: 'POST',
							   dataType: 'JSON',
							   cache: false,
							   data: params,
							   xhrFields: {
								   withCredentials: true
							   },
							   beforeSend: function(request) {
									request.setRequestHeader("Referer", window.location.hostname);
									request.setRequestHeader("X-Esri-Auth-Client-Id", "esriapps");
									request.setRequestHeader("X-Esri-Auth-Redirect-Uri",window.location.href);
									//console.log("request: ",request);
							   },
							   success: function (response) { 							
									//console.log("from platformself "+JSON.stringify(response));
									if(response.token)	{								
										localStorage.setItem('agol_token',JSON.stringify({'token':response.token, 'expires_in':response.expires_in}));
										params.token = response.token;
										showUserInfo (params);
									} else {
										showSignInLink();
									}
							   },
							   error: function (data) {
								   console.log(data);
								   showSignInLink();
							   }
		});
  }  else {
	params.token = JSON.parse(tokenVal).token;
	showUserInfo(params);
  }
	$.ajaxSetup({async:true});

});
