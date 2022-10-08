var mettWidgets;

String.prototype.replaceVar = function (aKey, aValue)
{
	// Replace template script tags to prevent XSS
	var theValue = aValue.toString().split("[%#").join("[ %#").split("%]").join("% ]");

	var escape = function (input) {
		var output = input;

		output = output.split("'").join("\\'").split("&#39").join("\\&#39").replace(/(\r\n|\n|\r)/gm, " ");

		return output;
	}

	var theString = this.split("[*escape:" + aKey + "*]").join(escape(theValue));
	theString = theString.split("[*encode:" + aKey + "*]").join(htmlEncode(theValue));
	theString = theString.split("[*escape-encode:" + aKey + "*]").join(htmlEncode(escape(theValue)));
	theString = theString.split("[*nl2br:" + aKey + "*]").join(theValue.replace(/(\r\n|\n|\r)/gm, "<br />"));
	theString = theString.split("[*closeTags:" + aKey + "*]").join(closeTags(theValue));

	return theString.split("[*" + aKey + "*]").join(theValue);
};

String.prototype.clearVars = function ()
{
	var theRegEx = new RegExp("\\[\\*(escape\:){0,1}(nl2br\:){0,1}(encode\:){0,1}(escape-encode\:){0,1}(closeTags\:){0,1}(?:[\.a-z0-9_-]|\\[|\\])*\\*\\]", "gi");

	return this.replace(theRegEx, "");
};

String.prototype.replaceEach = function (aKey, aValue)
{
	var theRegEx = new RegExp("\\[\\%Each(?:\\s*)\\[\\*" + aKey + "\\*](?:\\s*)\\%\\]([\\w\\W\\s\\S]*?)\\[\\%EndEach\\%\\]", "gi");

	var theResult = this;
	var replacement = "";

	while ((theMatch = theRegEx.exec(this)) != null)
	{
		for (var i = 0; i < aValue.length; i++)
		{
			replacement += theMatch[1].split("[*this.").join("[*" + aKey + "[" + i.toString() + "].").split("[*this*]").join("[*" + aKey + "[" + i.toString() + "]*]");
		}

		theResult = theResult.replace(theMatch[0], replacement);
	}

	return theResult;
}

String.prototype.clearEaches = function ()
{
	var returnString = this;
	var theStartRegEx = new RegExp("\\[\\%Each(?:\\s*)\\[\\*([^\\*]*)\\*](?:\\s*)\\%\\]([\\w\\W\\s\\S]*?)\\[\\%EndEach\\%\\]", "gi");

	returnString = returnString.replace(theStartRegEx, "");

	return returnString;
}

String.prototype.replaceScripts = function ()
{
	var theRegEx = new RegExp("\\[\\%\\#(.*?)\\%\\]", "gi");

	var theResult = this;

	while((theMatch = theRegEx.exec(this)) != null)
	{
		theResult = theResult.replace(theMatch[0], eval(htmlDecode(theMatch[1])));
	}

	return theResult;
};

Date.prototype.getWeek = function(){
	var d = new Date(+this);
	d.setHours(0,0,0,0);
	d.setDate(d.getDate()+4-(d.getDay()||7));
	return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

$(document).ready(function ()
{
	mettWidgets = $(".mettWidget").not(".wait");

	if (!$("body").hasClass("overlayOpen"))
	{
		mettWidgets.each(function()
		{
			// Now you can always get the class by doing $("#myWidget").data("class");
			$($(this).data("class", new Widget($(this))));
		});
	}

	// Initialize after AJAX call.
	Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, arguments)
	{
		if (!$("body").hasClass("overlayOpen"))
		{
			mettWidgets = $(".mettWidget").not(".wait");

			mettWidgets.each(function()
			{
				if(typeof $(this).data("class") == "undefined" || $(this).data("class") == null)
					$($(this).data("class", new Widget($(this))));
			});
		}
	});
});

function Widget (aObject)
{
	var theReturnObject =
	{
		//mBaseUrl: "/api/widget/GetWidgetByCategoryID",
		mBaseUrl: "/api/widget/",
		mObject: null,
		mUrl: null,
		mTemplate: null,
		mItemTemplate: null,
		mNoItemTemplate: null,
		mTemplateVariables: {},
		mApiVariables: {},
		mAutoRefresh: false,
		mRefreshTimeout: null,
		mTemplateCache: {},
		mInitialTopN: 0,
		mLastData: null,
		mCompleteHandlers: [],
		mIsCompleted: false,

		init: function(aObject)
		{
			this.mObject = aObject;

			if(this.prepareTemplate() == false)
				return;

			var uniqueID = guid();
			this.apiVar("uniqueID", uniqueID);

			this.mObject.attr("data-uniqueID", uniqueID);

			if(this.mInitialTopN == 0 && typeof this.apiVar("topn") != "undefined")
				this.mInitialTopN = parseInt(this.apiVar("topn"));

			if(this.apiVar("autoHide") == true)
				this.mObject.hide();

			//if(this.apiVar("autoRefresh") == true)
			//	this.mAutoRefresh = true;

			if(typeof this.apiVar("week") == "undefined" || this.apiVar("week") == null)
				this.apiVar("week", new Date().getWeek());

			if(typeof this.apiVar("month") == "undefined" || this.apiVar("month") == null)
				this.apiVar("month", new Date().getMonth() + 1);

			if(typeof this.apiVar("year") == "undefined" || this.apiVar("year") == null)
				this.apiVar("year", new Date().getFullYear());

			this.loadTemplate();
		},

		//	Getter/setter for a Template var based on key
		templateVar: function (aKey, aValue)
		{
			if(aValue == null)
				return this.mTemplateVariables[aKey];

			this.mTemplateVariables[aKey] = aValue;

			return this;
		},

		//	Getter/setter for a API var based on key
		apiVar: function (aKey, aValue)
		{
			if(aValue == null)
				return this.mApiVariables[aKey];

			this.mApiVariables[aKey] = aValue;

			return this;
		},

		loadData: function (aHideLoader, aCallback, aForceTemplateReload)
		{
			var theThis = this;
			clearTimeout(this.mRefreshTimeout);

			if(aHideLoader != true)
			{
				var theWidgetObject = this.mTemplate.clone();

				theWidgetObject.find(".itemTemplate, .noItemTemplate").remove();

				this.mObject.html(theWidgetObject);
				this.replaceVars();
			}

			if(this.apiVar("type") == "twitter")
			{
				// can only be called before Twitter is done :'(
				if(typeof aCallback == "function")
					aCallback(theTwitterObject);

				theThis.onLoad(null, aHideLoader, aForceTemplateReload);
			}
			else
			{
				var theUrl = this.buildUrl();
				var dataType = "json";

				if(theUrl == "")
					return;

				if(this.apiVar("type") == "rss")
					var dataType = "xml";

				$.ajax({url: theUrl, dataType: "json"})
				.done(function (data)
				{
					theThis.onLoad(data, aHideLoader, aForceTemplateReload);

					if(typeof aCallback == "function")
						aCallback(data);
				});
			}
		},

		buildUrl: function ()
		{
			var theUrl = this.mBaseUrl;

			// URL exceptions
			switch(this.apiVar("type"))
			{
				case "updates":
				case "notifications":
					theUrl += "GetWidgetUpdates";
					break;
				case "profilenotifications":
					theUrl += "GetProfileNotificationsWidget";
					break;
				case "profilefavorites":
				case "favorites":
					theUrl += "GetProfileFavoritesWidget";
                    break;
                case "webservice":
                    theUrl += "GetWebserviceApps";
                    break;
				case "birthdays":
					theUrl += "GetBirthDayWidget";
					break;
				case "groups":
					theUrl += "GetWidgetGroups";
					break;
				case "users":
					theUrl += "GetWidgetUsers";
					break;
				case "rss":
					if(typeof this.apiVar("url") != "undefined" && this.apiVar("url") != null && $.trim(this.apiVar("url")) != "")
						theUrl = "/api/proxy?url=" + encodeURIComponent(this.apiVar("urlProtocol") + this.apiVar("url")) + "&proxyToken=" + this.getUniqueToken() + "&callType=" + this.apiVar("type");
					else
						return "";
					break;
				case "roles":
					theUrl += "GetWidgetRoles";
                    break;
                case "statistics":
                    theUrl += "GetWidgetStatistics";
					break;
				case "faq":
					theUrl += "GetWidgetFAQ";
					break;
				default:
					theUrl += "GetWidgetByCategoryID";
					break;
			}

			// API variable exeptions
			switch(this.apiVar("type"))
			{
				case "comments":
					this.apiVar("itemType", 1);
					break;
				case "events":
					this.apiVar("itemType", 13);
					break;
			}

			if (this.apiVar("type") != "rss")
			{
				theUrl += (theUrl.indexOf("?") == -1) ? "?" : "";
				theUrl += this.objectToQueryString(this.mApiVariables).toString();
			}

			theUrl += (theUrl.indexOf("?") > -1) ? "&" : "?";
			theUrl += "preventCache=" + new Date().getTime().toString();

			if (theUrl.indexOf("&token") == -1)
			{
				theUrl += "&token=" + $("input[name='__RequestVerificationToken']").val();
			}

			return theUrl;
		},

		onLoad: function(aResult, aHideLoader, aForceTemplateReload)
		{
			var theThis = this;
			var theObject = aResult;
			var theWidgetObject = this.mTemplate.clone();
			var theItemsString = "";
			var theNoItemsString = "";
			var theItemIndex = 0;

			if (this.apiVar("type") == "rss")
			{
				if(typeof theObject == "undefined" || theObject == null)
					return;

				var theRSSObject = [];
				var theTopN = 5;

				if(typeof theThis.apiVar("topn") != "undefined" && theThis.apiVar("topn") != null)
					theTopN = parseInt(theThis.apiVar("topn"));

				$($.parseXML(theObject)).find("item").each(function ()
				{
					var theCurrentItem = {};

					$(this).children().each(function ()
					{

						if (this.nodeName != 'pubDate')
							theCurrentItem[this.nodeName] = $(this).text();
						else
							theCurrentItem[this.nodeName] = $(this).text().replace(/-/g, '/');
					});

					theRSSObject.push(theCurrentItem);
				});

				theRSSObject.sort(function(item1, item2)
				{
					var d1 = new Date(item1.pubDate)
					var d2 = new Date(item2.pubDate)

					if (theThis.apiVar('orderBy') === 'contentPage_dateVisible DESC' || theThis.apiVar('orderBy') === '')
					{
						if (d2.getTime() > d1.getTime())
							return 1;
						if (d2.getTime() < d1.getTime())
							return -1;
					}
					else if (theThis.apiVar('orderBy') === 'contentPage_dateVisible ASC')
					{
						if (d2.getTime() < d1.getTime())
							return 1;
						if (d2.getTime() > d1.getTime())
							return -1;
					}
				});

				theObject = theRSSObject.slice(0, theTopN);
			}

			if(this.apiVar("type") == "twitter")
			{
				var theTwitterObject = {};

				theTwitterObject[this.apiVar("twitterType")] = this.apiVar("twitterQuery");
				theTwitterObject.count = parseInt(this.apiVar("topn"));
				theTwitterObject.template = this.mItemTemplate;

				if(this.apiVar("filterRetweets") == true)
				{
					if(this.apiVar("twitterType") == "query")
						theTwitterObject[this.apiVar("twitterType")] = theTwitterObject[this.apiVar("twitterType")] + " -filter:retweets";
					else
						theTwitterObject.retweets = 0;
				}

				if(this.apiVar("showAvatar") === true)
					theTwitterObject.avatar_size = settings.widgets.avatarSize;

				if(this.apiVar("twitterType") == "query" && typeof this.apiVar("twitterLanguage") != null && this.apiVar("twitterLanguage") != null && this.apiVar("twitterLanguage") != "")
					theTwitterObject.lang = this.apiVar("twitterLanguage");

				theWidgetObject.find(".itemTemplate, .noItemTemplate").remove();

				if(!aHideLoader)
				{
					this.mObject.html(theWidgetObject);
					this.replaceVars();
				}

				this.mObject.find(".twitterContent").tweet(theTwitterObject).bind("loaded", function (aEvent)
				{
					if($(aEvent.target).find("li").length == 0)
					{
						$(aEvent.target).find("ul.tweet_list:first").append(theThis.mNoItemTemplate);

						if(theThis.apiVar("autoHide") == true)
							theThis.mObject.hide();
					}
					else if(theThis.apiVar("autoHide") == true)
					{
						theThis.mObject.show();
					}

					theThis.replaceVars();

					$(window).resize();
				});
			}
			else
			{
				if(typeof theObject == "undefined" || theObject == null)
					return;

				if(aHideLoader && !aForceTemplateReload && JSON.stringify(this.mLastData) === JSON.stringify(theObject))
				{
					if(this.mAutoRefresh)
					{
						clearTimeout(this.mRefreshTimeout);
						this.mRefreshTimeout = setTimeout(function ()
						{
							theThis.loadData(true);
						}, settings.widgets.autoRefreshInterval);
					}

					return;
				}

				if(theObject.length > 0)
				{
					for(var theCurrentItemKey in theObject)
					{
						var theCurrentItemTemplate = this.mItemTemplate;
						theCurrentItemTemplate = this.replaceArrayVarsRecursive(theCurrentItemTemplate, theObject[theCurrentItemKey], "");
						theCurrentItemTemplate = this.replaceItemVarsRecursive(theCurrentItemTemplate, theObject[theCurrentItemKey], "");
						theCurrentItemTemplate = theCurrentItemTemplate.replaceVar("itemIndex", theItemIndex);
						theCurrentItemTemplate = theCurrentItemTemplate.clearEaches();
						theCurrentItemTemplate = theCurrentItemTemplate.clearVars();
						theCurrentItemTemplate = theCurrentItemTemplate.replaceScripts();

						theItemsString += theCurrentItemTemplate;

						theItemIndex++;
					}

					if(this.apiVar("autoHide") == true)
						this.mObject.show();
				}
				else
				{
					if(this.mNoItemTemplate != null)
						theNoItemsString = this.mNoItemTemplate;

					if(this.apiVar("autoHide") == true)
						this.mObject.hide();
				}

				if(theItemsString != "")
					$(theItemsString).insertAfter(theWidgetObject.find(".itemTemplate"));

				if(theNoItemsString != "")
					$(theNoItemsString).insertAfter(theWidgetObject.find(".noItemTemplate"));

				theWidgetObject.find(".itemTemplate, .noItemTemplate, .loadingTemplate").remove();

				this.mObject.html(theWidgetObject);
				this.apiVar('count', theObject.length);
				this.replaceVars();

				if (this.apiVar("type") == "birthdays")
				{
					this.setWeekButtons();
					this.setMonthButtons();
					this.setYearButtons();
				}

				this.mLastData = theObject;
			}

			if(this.mAutoRefresh)
			{
				clearTimeout(this.mRefreshTimeout);
				this.mRefreshTimeout = setTimeout(function ()
				{
					theThis.loadData(true);
				}, settings.widgets.autoRefreshInterval);
			}

			if (typeof theThis.apiVar("topn") != "undefined" && theObject != null && theObject.length >= parseInt(theThis.apiVar("topn")))
			{
				// Show more button.
				this.mObject.find(".button.showMoreItems input, .button.showMoreItems a").unbind("click").click(function()
				{
					theThis.apiVar("topn", parseInt(theThis.apiVar("topn")) + theThis.mInitialTopN);
					theThis.loadData(true, null, true);

					$('<div class="loader show" role="status"><span class="screenReaderContent">' + settings.buttons.savingText + '</span></div>').insertAfter($(this).parents(".button").first().hide());

					return false;
				});

				if (this.mObject.find(".button.restore").length > 0 && $('#updatesTabContent.tabContent.active').length === 0)
				{
					if (this.mObject.find(".button.showMoreItems input").length > 0)
					{
						this.mObject.find(".button.showMoreItems input").val(settings.buttons.showMoreTrashItemsText);
					}
					else
					{
						this.mObject.find(".button.showMoreItems a").html(settings.buttons.showMoreTrashItemsText);
					}
				}

				this.mObject.find(".button.showMoreItems").parents(".toolbar").removeClass("hide");
			}
			else
				this.mObject.find('ul').addClass('toolbarHidden');

			this.mObject.find("input[type=checkbox][data-widget-setting]").each(function()
			{
				var theObject = $(this);

				if($.trim(theObject.attr("data-widget-setting")) == "")
					return;

				theObject.prop("checked", theThis.apiVar(theObject.attr("data-widget-setting")) == true)

				theObject.change(function ()
				{
					theThis.apiVar(theObject.attr("data-widget-setting"), theObject.is(":checked"));
					theObject.parent().html('<div class="loader show" role="status"><span class="screenReaderContent">' + settings.buttons.savingText + '</span></div>');
					theThis.loadData(true, null, true);
				});

				theObject.parent().removeClass("hide");
			});

			// Internet Explorer meuk (fixes nasty checked="checked" bug).
			if ($(".internetexplorer").length > 0)
			{
				this.mObject.find("input[type=checkbox]").each(function()
				{
					if ($(this).data("checked") != undefined)
					{
						// Re-initialize checkbox after clone action in processTemplate function.
						$(this).prop("checked", true);
					}
				});
			}

			// Switchery.
			this.mObject.find(".field").not(".noSwitchery").find("input[type=checkbox]").initializeSwitchery();

			if(settings.userDialog.instance != null)
				settings.userDialog.instance.init();

			if(this.mObject.find(".mettCarousel").length > 0)
				this.mObject.find(".mettCarousel").carousel().data("carousel").fitSliderHeight();

			$("a, button, input, [tabindex]").initializeFocus();

			// Create clickable links in updates.
			theThis.mObject.find(".updateDescription").not(".updateType-1").each(function()
			{
				$(this).createClickableLinks();
			});

			// Restore page button.
			theThis.mObject.find(".button.restorePage input").unbind("click").click(function()
			{
				if ($(this).confirm(settings.warnings.restorePageTrashText) && $(this).data("restore-id") != undefined)
				{
					$.ajax(
					{
						url: "/api/Sections/restoreSection",
						data:
						{
							restoreID: 	$(this).data("restore-id"),
							token:   	$("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function()
					{
						theThis.loadData();
					})
					.fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.66)", "console");
					});
				}
			});

			// Restore item button.
			theThis.mObject.find(".button.restoreItem input").unbind("click").click(function()
			{
				if ($(this).confirm(settings.warnings.restoreItemTrashText) && $(this).data("restore-id") != undefined && $(this).data("item-type") != undefined)
				{
					$.ajax(
					{
						url: "/api/ContentPages/restoreItem",
						data:
						{
							restoreID: 	$(this).data("restore-id"),
							itemType: 	$(this).data("item-type"),
							token:   	$("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function()
					{
						theThis.loadData();
					})
					.fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.67)", "console");
					});
				}
			});


			// Delete page button.
			theThis.mObject.find(".button.deletePage input").unbind("click").click(function()
			{
				if ($(this).confirm(settings.warnings.deletePageTrashText) && $(this).data("delete-id") != undefined)
				{
					$.ajax(
					{
						url: "/api/Sections/deleteSection",
						data:
						{
							deleteID: 	$(this).data("delete-id"),
							token:   	$("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function()
					{
						theThis.loadData();
					})
					.fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.68)", "console");
					});
				}
			});

			// Delete item button.
			theThis.mObject.find(".button.deleteItem input").unbind("click").click(function()
			{
				if ($(this).confirm(settings.warnings.deleteItemTrashText) && $(this).data("delete-id") != undefined && $(this).data("item-type") != undefined)
				{
					$.ajax(
					{
						url: "/api/ContentPages/deleteItem",
						data:
						{
							deleteID: 	$(this).data("delete-id"),
							itemType: 	$(this).data("item-type"),
							token:   	$("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function()
					{
						theThis.loadData();
					})
					.fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.69)", "console");
					});
				}
			});

			// Sort favorite up or down.
			theThis.mObject.find(".button.favoriteUp input, .button.favoriteDown input").each(function(i)
			{
				var button = $(this);

				button.unbind("click").click(function()
				{
					if ((button.data("section-id") != undefined || button.data("item-id") != undefined) && button.data("sort-id") != undefined && button.data("sort-up") != undefined)
					{
						$.ajax(
						{
							url: "/api/Notification/SortFavorite",
							data:
							{
								sectionID: 		button.data("section-id"),
								contentPageID: 	button.data("item-id"),
								sortID:			button.data("sort-id"),
								up:				button.data("sort-up"),
								token:   		$("input[name='__RequestVerificationToken']").val()
							}
						})
						.done(function()
						{
							theThis.loadData();
						})
						.fail(function()
						{
							$.fn.showError(settings.errors.generalErrorText + " (500.70)", "console");
						});
					}
				});

				// Don't show first up button.
				if (i != 0 && button.parent().hasClass("favoriteUp"))
				{
					button.parent().removeClass("hide");
				}

				// Don't show last down button.
				if (i != (theThis.mObject.find(".button.favoriteUp input, .button.favoriteDown input").length - 1) && button.parent().hasClass("favoriteDown"))
				{
					button.parent().removeClass("hide");
				}
			});

			// Toggle notifications (in profile).
			theThis.mObject.find(".toggleNotifications").change(function()
			{
				var checkbox = $(this);

				if (checkbox.data("section-id") != undefined || checkbox.data("item-id") != undefined)
				{
					$.ajax(
					{
						url: "/api/Notification/SetNotification",
						data:
						{
							sectionID: 		checkbox.data("section-id"),
							contentPageID: 	checkbox.data("item-id"),
							status:			checkbox.is(":checked"),
							token:   		$("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function()
					{
						checkbox.parent().toggleClass("deleted");
					})
					.fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.71)", "console");
					});
				}
			});

			// Toggle favorite (in profile).
			theThis.mObject.find(".toggleFavorite").change(function()
			{
				var checkbox = $(this);

				if (checkbox.data("section-id") != undefined || checkbox.data("item-id") != undefined)
				{
					$.ajax(
					{
						url: "/api/Notification/SetFavorite",
						data:
						{
							sectionID: 		checkbox.data("section-id"),
							contentPageID: 	checkbox.data("item-id"),
							status:			checkbox.is(":checked"),
							token:   		$("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function()
					{
						checkbox.parent().toggleClass("deleted");

						if (checkbox.parents(".widget").find(".field").not(".deleted").length == 0)
						{
							// Hide favorites in shortcuts.
							$("#shortcuts .favorites").parent().addClass("hide");
						}
						else
						{
							// Show favorites in shortcuts.
							$("#shortcuts .favorites").parent().removeClass("hide");
						}
					})
					.fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.72)", "console");
					});
				}
			});

			// Re-initialize toolbars.
			theThis.mObject.initializeToolbars();

			// Apply cookie settings.
			$("body").applyCookieSettings();

			setWidgetImages(theThis.mObject);

			$.fn.initializeSpacers({ initTopSpacer: false });

			this.complete();
		},

		prepareTemplate: function()
		{
			var theTempVars;

			if(this.mObject.find(".settings").length > 0)
			{
				theTempVars = this.mObject.find(".settings").text();

				this.mApiVariables = this.settingsToObject(theTempVars);

				// Template and Api Variables are now initially the same
				this.mTemplateVariables = this.mApiVariables;
			}

			return true;
		},

		loadTemplate: function ()
		{
			var theThis = this;

			if(typeof this.apiVar("skin") != "undefined" && $.trim(this.apiVar("skin")) != "")
				var theTemplateType = $.trim(this.apiVar("skin"));
			else
				var theTemplateType = $.trim(this.apiVar("type"));

			if(typeof theTemplateType == "undefined" || theTemplateType == null || theTemplateType == "")
				theTemplateType = "items";

			if(typeof this.apiVar("template") != "undefined" && $.trim(this.apiVar("template")) != "")
				theTemplateType += "_" + $.trim(this.apiVar("template"));

			if (settings.user.follow && settings.user.ID != -1 && this.apiVar("type") == "users" && (this.apiVar("showOnlyFollowedUsers") == "1" || this.apiVar("showOnlyFollowingUsers") == "1"))
				theTemplateType = 'users_follow_list';

			if(typeof settings.widgets.templateCache[theTemplateType]  != "undefined" && settings.widgets.templateCache[theTemplateType] != null)
			{
				this.mTemplate = settings.widgets.templateCache[theTemplateType];
				this.processTemplate();
			}
			else if(typeof settings.widgets.loadingTemplates[theTemplateType]  != "undefined" && settings.widgets.loadingTemplates[theTemplateType] != null)
			{
				settings.widgets.loadingTemplates[theTemplateType].onload(function ()
				{
					theThis.mTemplate = settings.widgets.templateCache[theTemplateType];
					theThis.processTemplate();
				});
			}
			else
			{
				settings.widgets.loadingTemplates[theTemplateType] =
				{
					mAllCallbacks: [],
					onload: function (aCallback)
					{
						if(typeof aCallback == "function")
							this.mAllCallbacks.push(aCallback);
						else
						{
							for(var i = 0; i < this.mAllCallbacks.length; i++)
							{
								this.mAllCallbacks[i]();
							}
						}
					}
				}

				$.ajax({
					url: "/HandlerWidgetTemplate.ashx?type=" + theTemplateType
				})
				.done(function (aData)
				{
					theThis.mTemplate = $(aData);

					settings.widgets.templateCache[theTemplateType] = theThis.mTemplate;
					settings.widgets.loadingTemplates[theTemplateType].onload();

					theThis.processTemplate();
				})
				.fail(function (aData)
				{
					$.fn.showError(settings.errors.widgetErrorText + " ('" + aData + "') (500.43)", "console");
				});
			}
		},

		processTemplate: function ()
		{
			if(this.apiVar("type") == "twitter" && this.mTemplate.find(".twitterContent").length == 0)
				return;

			if(this.mTemplate.find(".itemTemplate").length == 0)
				return;

			// Internet Explorer meuk (fixes nasty checked="checked" bug).
			if ($(".internetexplorer").length > 0)
			{
				this.mTemplate.find(".itemTemplate input[type=checkbox]").each(function()
				{
					if ($(this).is(":checked"))
					{
						$(this).attr("data-checked", true);
					}
				});
			}

			this.mItemTemplate = $("<div />").append(this.mTemplate.find(".itemTemplate").clone().removeClass("itemTemplate")).html();

			if(this.mTemplate.find(".noItemTemplate").length > 0)
				this.mNoItemTemplate = $("<div />").append(this.mTemplate.find(".noItemTemplate").clone().removeClass("noItemTemplate")).html();

			this.loadData();
		},

		settingsToObject: function (aSettingsString)
		{
			var theSettingsObject = JSON.parse(aSettingsString);
			var theReturnObject = {};

			for(var theSettingsTab in theSettingsObject)
			{
				$.extend(theReturnObject, theSettingsObject[theSettingsTab]);
			}

			return theReturnObject;
		},

		queryStringToObject: function (aQueryString)
		{
			var theReturnObject = {};

			theQueryString = aQueryString;
			theQueryString = theQueryString.split("&amp;");

			var theCurrentVar;

			for (i = 0; i < theQueryString.length; i++)
			{
				theCurrentVar = theQueryString[i].split("=");

				theReturnObject[theCurrentVar[0]] = decodeURIComponent(theCurrentVar[1]);
			}

			return theReturnObject;
		},

		objectToQueryString: function (aObject)
		{
			if(aObject == null)
				return "";

			var theReturnString = "";

			for(var theCurrentKey in aObject)
			{
				if(theReturnString != "")
					theReturnString += "&";

				theReturnString += theCurrentKey + "=" + encodeURIComponent(aObject[theCurrentKey]);
			}

			return theReturnString;
		},

		replaceArrayVarsRecursive: function (aCurrentItemTemplate, aObject, aVarPrefix) {
			var theCurrentItemTemplate = aCurrentItemTemplate;

			for (var theCurrentVar in aObject)
			{
				if (Array.isArray(aObject[theCurrentVar]))
				{
					theCurrentItemTemplate = theCurrentItemTemplate.replaceEach(aVarPrefix + theCurrentVar, aObject[theCurrentVar]);
				}
				else if (typeof aObject[theCurrentVar] == "object")
					theCurrentItemTemplate = this.replaceArrayVarsRecursive(theCurrentItemTemplate, aObject[theCurrentVar], aVarPrefix + theCurrentVar + ".");
			}

			return theCurrentItemTemplate;
		},

		replaceItemVarsRecursive: function (aCurrentItemTemplate, aObject, aVarPrefix)
		{
			var theCurrentItemTemplate = aCurrentItemTemplate;

			for(var theCurrentVar in aObject)
			{
				if (Array.isArray(aObject[theCurrentVar])) {
					theCurrentItemTemplate = theCurrentItemTemplate.replaceVar(aVarPrefix + theCurrentVar + '.length', aObject[theCurrentVar].length.toString());

					for (var i = 0; i < aObject[theCurrentVar].length; i++)
					{
						theCurrentItemTemplate = this.replaceItemVarsRecursive(theCurrentItemTemplate, aObject[theCurrentVar][i], aVarPrefix + theCurrentVar + "[" + i.toString() + "].");
					}
				}
				else if (typeof aObject[theCurrentVar] == "object")
					theCurrentItemTemplate = this.replaceItemVarsRecursive(theCurrentItemTemplate, aObject[theCurrentVar], aVarPrefix + theCurrentVar + ".");
				else
					theCurrentItemTemplate = theCurrentItemTemplate.replaceVar(aVarPrefix + theCurrentVar, aObject[theCurrentVar].toString());
			}

			for (var theVarKey in this.mTemplateVariables)
			{
				theCurrentItemTemplate = theCurrentItemTemplate.replaceVar(theVarKey, this.mTemplateVariables[theVarKey]);
			}

			return theCurrentItemTemplate;
		},

		replaceVars: function ()
		{
			if(this.mTemplateVariables == null)
				return;

			this.mObject.find(".widgetRemove").remove();

			if (this.mObject.html() != undefined)
			{
				var theHtml = this.mObject.html();

				for (var theVarKey in this.mTemplateVariables)
				{
					theHtml = theHtml.replaceVar(theVarKey, this.mTemplateVariables[theVarKey]);
				}

				theHtml = theHtml.clearVars();
				theHtml = theHtml.replaceScripts();

				this.mObject.html(theHtml);
				this.mObject.find(".widgetRemove").remove();
			}
		},

		setMonthButtons: function ()
		{
			var theThis = this;
			var theNextMonth = this.getMonth("next");
			var thePreviousMonth = this.getMonth("previous");

			this.mObject.find(".nextMonth").html(getMonthName(theNextMonth)).click(function()
			{
				theThis.apiVar('month', theNextMonth);
				theThis.templateVar('month', theNextMonth);
				theThis.loadData();

				if (theNextMonth == 1)
					theThis.apiVar('year', parseInt(theThis.apiVar('year')) + 1);

				theNextMonth = theThis.getMonth("next");
				thePreviousMonth = theThis.getMonth("previous");

				$(this).html(getMonthName(theNextMonth));
				theThis.mObject.find('.previousMonth').html(getMonthName(thePreviousMonth));

				return false;
			});

			this.mObject.find(".previousMonth").html(getMonthName(thePreviousMonth)).click(function()
			{
				theThis.apiVar('month', thePreviousMonth);
				theThis.templateVar('month', thePreviousMonth);
				theThis.loadData();

				if (thePreviousMonth == 12)
					theThis.apiVar('year', parseInt(theThis.apiVar('year')) - 1);

				theNextMonth = theThis.getMonth("next");
				thePreviousMonth = theThis.getMonth("previous");

				$(this).html(getMonthName(thePreviousMonth));
				theThis.mObject.find('.nextMonth').html(getMonthName(theNextMonth));

				return false;
			});
		},

		setWeekButtons: function ()
		{
			var theThis = this;
			var theNextWeek = this.getWeek("next");
			var thePreviousWeek = this.getWeek("previous");

			this.mObject.find(".nextWeek").html("Week " + theNextWeek).click(function ()
			{
				theThis.apiVar('week', theNextWeek);
				theThis.templateVar('week', theNextWeek);
				theThis.loadData();

				if (theNextWeek == 1)
					theThis.apiVar('year', parseInt(theThis.apiVar('year')) + 1);

				theNextWeek = theThis.getWeek("next");
				thePreviousWeek = theThis.getWeek("previous");

				$(this).html("Week " + theNextWeek);
				theThis.mObject.find('.previousWeek').html("Week " + thePreviousWeek);

				return false;
			});

			this.mObject.find(".previousWeek").html("Week " + thePreviousWeek).click(function ()
			{
				theThis.apiVar('week', theNextWeek);
				theThis.templateVar('week', thePreviousWeek);
				theThis.loadData();

				if (thePreviousWeek == 53)
					theThis.apiVar('year', parseInt(theThis.apiVar('year')) - 1);

				theNextWeek = theThis.getWeek("next");
				thePreviousWeek = theThis.getWeek("previous");

				$(this).html("Week " + thePreviousWeek);
				theThis.mObject.find('.nextWeek').html("Week " + theNextWeek);

				return false;
			});
		},

		setYearButtons: function ()
		{
			var theThis = this;
			var theNextYear = this.apiVar("year") + 1;
			var thePreviousYear = this.apiVar("year") - 1;

			this.mObject.find(".nextYear").click(function ()
			{
				theThis.apiVar('year', theNextYear);
				theThis.templateVar('year', theNextYear);
				theThis.loadData();

				theNextYear = theThis.apiVar('year') + 1;
				thePreviousYear = theThis.apiVar('year') - 1;

				return false;
			});

			this.mObject.find(".previousYear").click(function ()
			{
				theThis.apiVar('year', thePreviousYear);
				theThis.templateVar('year', thePreviousYear);
				theThis.loadData();

				theNextYear = theThis.apiVar('year') + 1;
				thePreviousYear = theThis.apiVar('year') - 1;

				return false;
			});
		},

		getWeek: function(aDirection)
		{
			var theCurrentWeek = this.apiVar('week');

			if(aDirection == "previous")
			{
				if(theCurrentWeek == 1)
					return 53;
				else
					return theCurrentWeek - 1;
			}
			else
			{
				if(theCurrentWeek == 53)
					return 1;
				else
					return theCurrentWeek + 1;
			}
		},

		getMonth: function(aDirection)
		{
			var theCurrentMonth = this.apiVar('month');

			if(aDirection == "previous")
			{
				if(theCurrentMonth == 1)
					return 12;
				else
					return theCurrentMonth - 1;
			}
			else
			{
				if(theCurrentMonth == 12)
					return 1;
				else
					return theCurrentMonth + 1;
			}
		},

		getUniqueToken: function ()
		{
			var n="",D=new Date(),S="000"+D.getMilliseconds();S=S.substr(S.length-3);var n=S+D.getTime().toString();n=n.substr(0,parseInt(S.charAt(2))+3)+S+n.substr(parseInt(S.charAt(2))+3);return n;
		},

		unbind: function (aEventName)
		{
			if(typeof aEventName == "string" && $.trim(aEventName) != "")
			{
				switch(aEventName)
				{
					case "complete":
						this.mCompleteHandlers = [];
						break;
				}
			}

			return this;
		},

		// Handlers
		complete: function (aHandler)
		{
			if(typeof aHandler == "undefined")
			{
				this.mIsCompleted = true;

				for(var theIndex in this.mCompleteHandlers)
				{
					this.mCompleteHandlers[theIndex](this, "complete");
				}
			}
			else if (typeof aHandler == "function")
			{
				this.mCompleteHandlers.push(aHandler);

				if (this.mIsCompleted)
					aHandler(this, "complete");
			}

			return this;
		}
	}

	theReturnObject.init(aObject);
	return theReturnObject;
}


function htmlEncode(aValue)
{
	return $('<div/>').text(aValue).html();
}

function htmlDecode(aValue)
{
	return $('<div/>').html(aValue).text();
}

function getMonthName(aMonthNumber, aShort)
{
	var theMonthNames = [
						["", "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
						["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
					];

	var theShortMonthNames = [
						["", "jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
						["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
					];

	var theDesiredLanuage = (settings.language == "en" ? 1 : 0);

	if(aShort)
		return theShortMonthNames[theDesiredLanuage][aMonthNumber];

	return theMonthNames[theDesiredLanuage][aMonthNumber];
}

function setWidgetImages(aObject)
{
	// Carousel image size, depending on layout and item count per slide.
	if (aObject.find(".mettCarousel").length > 0 && aObject.parents(".three.columns").length > 0)
	{
		if (aObject.find(".mettCarousel").data("item-width") != undefined && aObject.find(".mettCarousel").data("item-width") != "100%")
		{
			// Replace small images for mini images.
			aObject.find(".itemImage.small, .updateImage.small").removeClass("small").addClass("mini");
		}
	}

	// Create thumbnail.
	aObject.find(".updateImage img").not(".nailthumb-image").each(function ()
	{
		var theImageObject = $(this);

			setTimeout(function ()
			{
				setCurrentWidgetImage(theImageObject, aObject)
			}, 1000);
	});
}

function setCurrentWidgetImage(aObject, aParentWidget)
{
	if (aObject.height() > 0)
	{
		var thumbnailHeight = settings.images.widgetImageHeight;

		// Thumbnail size.
		if (aObject.parents(".small").length > 0 || aObject.parents(".mini").length > 0)
		{
			thumbnailHeight = settings.images.smallThumbnailHeight;
		}

		var parentObject = aObject.parent();
		var targetObject = aObject;

		if (parentObject.is('a') && parentObject.height() > 0) {
			targetObject = parentObject;
			thumbnailHeight = parentObject.height();
		}

		targetObject.nailthumb(
		{
			preload:			false,
			nostyle: 			true,
			height: 			thumbnailHeight,
			fitDirection: 		"center center",
			maxEnlargement:		1
		});

		if (aParentWidget[0].children[0].classList.contains('widget-items'))
		{
			var parentContainer = aObject.parents('.updateImage');

			if (aObject.width() > aObject.height())
			{
				parentContainer.addClass('landscape');

				if (aObject[0].naturalWidth < parentContainer.width())
					parentContainer.addClass('contained');
			}
			else if (aObject.width() < aObject.height())
			{
				parentContainer.addClass('portrait');

				if (aObject[0].naturelHeight < parentContainer.height())
					parentContainer.addClass('contained');
			}
		}

		if (typeof aParentWidget != "undefined" && aParentWidget != null && aParentWidget.is("#bottom .mettWidget"))
		{
			$(window).resize();
		}

		if (aParentWidget[0].firstChild.className.indexOf('widget-users') > -1)
		{
			$.each(aParentWidget.find('.itemImage'), function()
			{
				var itemImage = $(this),
					img = itemImage.find('img');

				if (img.length > 0)
				{
					if (img.width() > img.height())
						itemImage.addClass('landscape');
					else if (img.width() < img.height())
						itemImage.addClass('portrait');
				}
			});
		}
	}
	else
	{
		setTimeout(function () { setCurrentWidgetImage(aObject, aParentWidget) }, 200);
	}
}

function guid()
{
	var s4 = function ()
	{
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


function closeTags(html)
{
	var excludedTags = ['meta', 'img', 'br', 'hr', 'input'];
	var theOpenRegEx = RegExp("<([a-z]+)(?:\s[^<]*?[^\/]>|>)", 'gi');
	var theCloseRegEx = RegExp('</([a-z]+)\\s*>', 'gi');
	var openedtags = [];
	var closedtags = [];
	var theMatch;

	html = html.replace(/<[^>]*$/, '');

	while ((theMatch = theOpenRegEx.exec(html)) != null) {
		if (excludedTags.indexOf(theMatch[1].toLowerCase()) == -1)
			openedtags.push(theMatch[1]);
	}

	while ((theMatch = theCloseRegEx.exec(html)) != null) {
		closedtags.push(theMatch[1]);
	}

	if (openedtags.length == closedtags.length)
		return html;

	openedtags = openedtags.reverse();

	for (var i = 0; i < openedtags.length; i++) {
		var index = closedtags.indexOf(openedtags[i]);
		if (index == -1) {
			html += '</' + openedtags[i] + '>';
		} else {
			closedtags.splice(index, 1);
		}
	}

	return html;
}
