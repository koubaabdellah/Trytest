var AuthScriptsAuth = (function () {
	var self = {};

	$.cookie.json = true;

	self.clientId = 'R0MHvN8EYG0vNuGW';

	//*******************************************
	//  Open up the Oauth Window
	//*******************************************
	self.showOAuthLogin = function () {
		var currentUrl = window.location.href,
			splitAt = currentUrl.lastIndexOf('/') + 1,
			responseUrl = currentUrl.substring(0, splitAt) + 'AGOLResponse.html';

		var oAuthUrl = 'https://www.arcgis.com/sharing/oauth2/authorize?client_id=' +
			 self.clientId +
			'&response_type=token&expiration=20160&redirect_uri=' +
			window.encodeURIComponent(responseUrl);

		window.open(oAuthUrl,
			'oauth-window',
			'height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes');

	};

	self.authInfo = '';
	self.userLoggedIn = false;

	//*******************************************
	//  Global function called by OAuth Redirect Page
	//*******************************************
	self.SignedIn = window.SignedIn = function (authInfo) {
		self.authInfo = authInfo;
		self.userLoggedIn = true;

		$.cookie('authInfo', authInfo, {
      expires: 1,
      secure: true
    });

		$('.hide-if-logged-in').hide().css({ visibility: 'hidden' });
		$('.show-if-logged-in').show().css({ visibility: 'visible' });
		$('.current-username').html(authInfo.username);
	}

	//*******************************************
	//  Logout
	//*******************************************
	self.logOut = function () {
		$.removeCookie('authInfo');
		self.authInfo = null;
		self.userLoggedIn = false;

		$('.show-if-logged-in').hide().css({ visibility: 'hidden' });
		$('.hide-if-logged-in').show().css({ visibility: 'visible' });
		$('.current-username').html('');
	};

	//*******************************************
	//  Read Cookie
	//*******************************************
	self.getAuthInfoFromCookie = function () {
		var authInfo = $.cookie('authInfo');
		if (authInfo) {
			self.authInfo = authInfo;
			self.userLoggedIn = true;
			self.SignedIn(authInfo);
			return authInfo;
		} else {
			self.logOut();
			return false;
		}
	};
	self.getAuthInfoFromCookie();

	return self;
})();