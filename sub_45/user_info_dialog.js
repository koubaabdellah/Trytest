$(document).ready(function ()
{
	if ($(".no-touch").length > 0 || $(".touch.desktop").length > 0)
	{
		settings.userDialog.instance = new UserInfoDialog();

		if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
		{
			Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function()
			{
				settings.userDialog.instance.init();
			});
		}
	}
});

var UserInfoDialog = function ()
{
	var theReturnObject =
	{
		mInfoDialog: null,
		mHideTimeOut: 0,
		mDialogVisible: false,
		mDataCache: {},
		mShowDelay: 300,
		mShowDelayTimeout: 0,

		init: function ()
		{
			if(this.mInfoDialog == null)
				this.createInfoDialog();

			this.setHandlers();
		},

		setHandlers: function ()
		{
			var theThis = this;

			$("*[data-user-id]").each(function ()
			{
				var theObject = $(this);

				if (theObject.parents('.widget-followed-users').length == 0)
				{
					// If already initialized return
					if(theObject.data("userDialogInitialized") == true)
						return;

					if ($(".webGuidelines").length > 0)
					{
						theObject.click(function ()
						{
							var focusTimeout;

							if (!theThis.mDialogVisible)
							{
								theThis.showDialog(theObject);

								theThis.mInfoDialog.off("focusout").focusout(function ()
								{
									clearTimeout(focusTimeout);

									focusTimeout = setTimeout(function ()
									{
										if ($(":focus").parents("#userInfoDialog").length == 0 || $(":focus")[0] == $("#userInfoDialog .tabCloser")[0])
										{
											theThis.hideInfoDialog();
											theObject.focus();
										}
									}, 40);
								});

								setTimeout(function ()
								{
									$("#userInfoDialog .userName a").focus();
								}, 500);
							}
							else
								theThis.hideInfoDialog();

							return false;
						});
					}
					else
					{
						theObject.hover(function ()
						{
							theThis.showDialog(theObject);
						},
						function ()
						{
							theThis.mDialogVisible = false;

							clearTimeout(theThis.mShowDelayTimeout);
							clearTimeout(theThis.mHideTimeOut);
							theThis.mHideTimeOut = setTimeout(function () { theThis.hideInfoDialog(); }, 100);
						});
					}

					theObject.data("userDialogInitialized", true);
				}
			});
		},

		showDialog: function (aObject)
		{
			var theThis = this;
			var theObject = aObject;

			theThis.mDialogVisible = true;

			clearTimeout(theThis.mHideTimeOut);

			if (parseInt(theObject.attr("data-user-id")) > 0)
			{
				// First try to get data from cache
				if (typeof theThis.mDataCache[theObject.attr("data-user-id")] != "undefined" && theThis.mDataCache[theObject.attr("data-user-id")] != null)
				{
					theThis.fillInfoDialog(theThis.mDataCache[theObject.attr("data-user-id")])
					theThis.showInfoDialog(theObject);
				}
				else
				{
					$.ajax(
					{
						url: "/api/user",
						data:
						{
							userID: theObject.attr("data-user-id"),
							token: $("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function (aData)
					{
						if (aData != null) {

							theThis.mDataCache[theObject.attr("data-user-id")] = aData;

							if (!theThis.mDialogVisible)
								return;

							theThis.fillInfoDialog(aData);
							theThis.showInfoDialog(theObject);
						}
					})
					.error(function ()
					{
						$.fn.showError(settings.errors.generalErrorText + " ('" + theObject.attr("data-user-id") + "') (500.41)", "console");
					});
				}
			}
		},

		createInfoDialog: function ()
		{
			this.mInfoDialog = $('<div>');
			this.mInfoDialog.attr("id", "userInfoDialog");
			this.mInfoDialog.attr("role", "dialog");
			this.mInfoDialog.addClass("infoDialog");

			this.mInfoDialog.css({position: "absolute", zIndex: 1100, display: "none"});

			$("body").append(this.mInfoDialog);
		},

		fillInfoDialog: function (aData)
		{
			var theThis = this;
			var theInfoContainer = $('<div class="infoContainer"></div>');
			var theUserInfo = $('<ul class="userInfo"></ul>')
			var theUserLinks = $('<div class="userLinks"></div>');

			this.mInfoDialog.empty();

			this.mInfoDialog.attr("aria-label", "Profiel popup voor "+ aData.FirstName + " " + aData.LastName);

			if(aData.ProfileImage != "")
				this.mInfoDialog.append('<div class="userPhoto"><a href="' + aData.UserUrl + '"><img src="' + aData.ProfileImage + '?width=80&amp;height=80" alt="Bekijk profiel van ' + aData.FirstName + ' ' + aData.LastName + '" /></a></div>');

			theInfoContainer.append('<h2 class="userName"><a href="' + aData.UserUrl + '">' + aData.FirstName + ' ' + aData.MiddleName + ' ' + aData.LastName + ' ' + '</a></h2>');

			if(aData.Occupation != "" || aData.Location != "")
			{
				var theOccupationString = aData.Occupation;

				if(aData.Occupation != "" && aData.Location != "")
					theOccupationString += " " + settings.various.atText + " ";

				theOccupationString += aData.Location;

				theUserInfo.append('<li class="itemInformation">' +  theOccupationString + '</li>');
			}

			if(aData.Phone1 != "")
				theUserInfo.append('<li class="profileIcon phone icon-phone before">' +  aData.Phone1 + '</li>');
			if(aData.Phone2 != "")
				theUserInfo.append('<li class="profileIcon phone icon-phone before">' +  aData.Phone2 + '</li>');
			if(aData.Mobile != "")
				theUserInfo.append('<li class="profileIcon phone icon-mobile before">' +  aData.Mobile + '</li>');

			theInfoContainer.append(theUserInfo);
			this.mInfoDialog.append(theInfoContainer);
			this.mInfoDialog.append('<div class="clearBoth"></div>');

			if(settings.user.follow && settings.user.ID > 0)
				theUserLinks.append('<div class="followUserToolbar toolbar"><div class="button followuser transparent icon-bell before"><input type="button" value="' + settings.buttons.followText + '" title="' + settings.buttons.followText + '" /><input type="checkbox" class="hide" /></div></div>');

			if(aData.UserEmail != "")
				theUserLinks.append('<div class="button transparent icon-mail before"><a href="mailto:' + aData.UserEmail + '">E-mail<span class="screenReaderContent"> ' + aData.UserEmail + '</span></a></div>');

			if(aData.UserUrl != "" && aData.UserUrl.indexOf("mailto:") == -1)
				theUserLinks.append('<div class="button transparent icon-user before"><a href="' + aData.UserUrl + '">' + settings.buttons.profileText + '</a></div>');

			this.mInfoDialog.append(theUserLinks);

			$('.userLinks .followUserToolbar .button.followuser').initializeUserFollowButtons(aData.UserID, aData.FirstName);

			this.mInfoDialog.append('<div class="tabCloser" tabindex="0"></div>');

			this.mInfoDialog.mouseleave(function ()
			{
				clearTimeout(theThis.mShowDelayTimeout);
				clearTimeout(theThis.mHideTimeOut);
				theThis.mHideTimeOut = setTimeout(function () { theThis.hideInfoDialog(); }, 100);
			});
		},

		showInfoDialog: function (aObject, aSkipDelay)
		{
			var theThis = this;

			clearTimeout(this.mShowDelayTimeout);

			if(aSkipDelay != true)
			{
				this.mInfoDialog.css({display: "none"});
				this.mShowDelayTimeout = setTimeout(function () { theThis.showInfoDialog(aObject, true); }, this.mShowDelay);
				return;
			}

			var thePosition = aObject.offset();
			var theTargetTop = (thePosition.top + parseInt(aObject.css("paddingTop")) - this.mInfoDialog.outerHeight() - 8);
			var theArrowClass = "bottom";

			clearTimeout(this.mHideTimeOut);

			if(theTargetTop - $(window).scrollTop() < 0)
			{
				theTargetTop = (thePosition.top + aObject.outerHeight() - parseInt(aObject.css("paddingBottom")) + 8);
				theArrowClass = "top";
			}

			this.mInfoDialog.append('<div class="dialogArrow ' + theArrowClass + '"></div>');

			this.mInfoDialog.css({left: thePosition.left + parseInt(aObject.css("paddingLeft")), top: theTargetTop, display: "block"});
		},

		hideInfoDialog: function ()
		{
			if(!this.mInfoDialog.is(":hover"))
			{
				clearTimeout(this.mShowDelayTimeout);

				this.mDialogVisible = false;
				this.mInfoDialog.hide();
				this.mInfoDialog.empty();
			}
		}
	};

	theReturnObject.init();

	return theReturnObject;
}
