$(document).ready(function ()
{
	settings.liveSearch.instance = new LiveSearch($("#shortcuts .search input:text, #searchContainer .search input:text"), settings.liveSearch);
});

var LiveSearch = function(aObject, aSettings)
{
	var theReturnObject =
	{
		mSettings:
		{
			maxResults: 5,
			minimumSearchLength: 3 // Minimum number of characters to search for
		},

		mObject: null,
		mSearchTimeout: 0,
		mInfoContainer: null,
		mResultsContainer: null,
		mSearchCache: [],
		mLastSearchQuery: "",
		mKeyNames: {backspace: 8, del: 46, enter: 13, escape: 27, left: 37, up: 38, right: 39, down: 40},

		init: function (aObject, aSettings)
		{
			this.mObject = aObject;

			if(this.mObject.length == 0)
				return;

			if(typeof aSettings != "undefined" && aSettings != null)
				$.extend(this.mSettings, aSettings);

			this.mObject.attr("autocomplete", "off");

			this.createInfoContainer();
			this.createResultsContainer();
			this.initHandlers();
		},

		createInfoContainer: function ()
		{
			var theThis = this,
				closeButton = $('<span>');

			this.mInfoContainer = $('<div>');
			this.mInfoContainer.attr('id', 'searchInfoContainer');
			this.mInfoContainer.attr('role', 'alert');

			closeButton.addClass('icon-cancel before closeButton');
			closeButton.attr({
				'role': 'button',
				'aria-label': settings.liveSearch.hideMessage,
				'tabindex': -1
			});

			closeButton.click(function () {
				theThis.mInfoContainer.animate({ opacity: 0 }, 200, function () {
					theThis.mInfoContainer.css({ left: '100vw' });
					closeButton.attr('tabindex', '-1');
					theThis.mInfoContainer.find('.searchInfoText').remove();
				});
				return false;
			});

			this.mInfoContainer.append(closeButton);

			this.mObject.attr('aria-describedby', 'searchInfoContainer');

			this.mInfoContainer.insertAfter(this.mObject);
		},

		createResultsContainer: function ()
		{
			var theThis = this;

			this.mWrapperElement = $('<div class="lsResultsContainer dropDownMenu" aria-live="polite"></div>');
			this.mResultsContainer = $('<ul class="dropDown"></ul>');
			this.mWrapperElement.html(this.mResultsContainer);

			$(window).resize(function ()
			{
				theThis.positionWrapper();
			});

			$("body").append(this.mWrapperElement);
		},

		positionWrapper: function ()
		{
			var thePosition = this.mObject.offset();

			this.mWrapperElement.css(
			{
				top: thePosition.top + this.mObject.outerHeight() - 3 - $(document).scrollTop(),
				left: thePosition.left + 1
			});
		},

		initHandlers: function ()
		{
			var theThis = this;

			this.mObject.keyup(function (aEvent)
			{
				theThis.onKeyUp(aEvent);
			});

			this.mObject.keydown(function (aEvent)
			{
				theThis.onKeyDown(aEvent);
			});

			this.mObject.blur(function (aEvent)
			{
				theThis.onBlur(aEvent);
			});
		},

		onKeyDown: function (aEvent)
		{
			clearTimeout(this.mSearchTimeout);

			var theActiveResult = this.mResultsContainer.find("a.active");
			var theTargetResult;

			switch (aEvent.keyCode)
			{
				case this.mKeyNames.up:
					if(theActiveResult.length > 0)
					{
						theActiveResult.removeClass("active");
						theTargetResult = theActiveResult.parents("li:first").prev().find("a");
					}
					else
						this.mResultsContainer.find("a:last").last().addClass("active");

					aEvent.preventDefault();
					break;

				case this.mKeyNames.down:
					if(theActiveResult.length > 0)
					{
						theActiveResult.removeClass("active");

						theTargetResult = theActiveResult.parents("li:first").next().find("a");
					}
					else
						this.mResultsContainer.find("a:first").first().addClass("active");

					aEvent.preventDefault();
					break;

				case this.mKeyNames.enter:
					if(theActiveResult.length > 0)
					{
						theActiveResult[0].click();

						aEvent.preventDefault();
					}

					break;
			}

			if (theTargetResult && theTargetResult.length > 0) {
				var resultsContainer = theTargetResult.parents('.lsResultsContainer');

				theTargetResult.addClass("active");

				if (theTargetResult.offset().top + theTargetResult.outerHeight() > $(window).height()) {
					var targetScrollTop = theTargetResult.position().top + theTargetResult.outerHeight() - resultsContainer.height();

					resultsContainer.scrollTop(targetScrollTop);
				} else if (theTargetResult.offset().top < resultsContainer.offset().top) {
					var targetScrollTop = theTargetResult.position().top;

					resultsContainer.scrollTop(targetScrollTop);
				}
			}
		},

		onKeyUp: function (aEvent)
		{
			var theThis = this;
			var theSearchQuery = this.mObject.val();

			if($.trim(theSearchQuery).length >= this.mSettings.minimumSearchLength)
			{
				if(this.mLastSearchQuery != theSearchQuery)
				{
					clearTimeout(this.mSearchTimeout);

					this.mSearchTimeout = setTimeout(function () { theThis.search() }, 200);
					this.mLastSearchQuery = theSearchQuery;
				}
			}
			else
			{
				clearTimeout(this.mSearchTimeout);

				this.mLastSearchQuery = "";

				this.hide();
			}
		},

		search: function ()
		{
			var theThis = this;
			var theSearchQuery = theThis.mObject.val();

			var theCacheResult = this.mSearchCache.filter(function (aObject) { return aObject.query == theSearchQuery });

			if(theCacheResult.length > 0)
			{
				this.onDone(theCacheResult[0].data);

				return;
			}

			$.ajax({
				url: "/api/search/",
				cache: false,
				data:
				{
					query: 	theSearchQuery,
					token: 	$("input[name='__RequestVerificationToken']").val()
				}
			})
			.done(function (aData)
			{
				theThis.mSearchCache.push({query: theSearchQuery, data: aData});

				theThis.onDone(aData);
			})
			.fail(function (aData)
			{
				theThis.onFail(aData)
			});
		},

		show: function ()
		{
			this.mWrapperElement.show();
		},

		hide: function ()
		{
			this.mWrapperElement.hide();
		},

		onDone: function (aData)
		{
			this.mResultsContainer.empty();

			for(var i = 0; i < aData.length && i < this.mSettings.maxResults; i++)
			{
				var theContents = '<span class="title">' + aData[i].sectionTitle + '</span>';

				if($.trim(aData[i].contentPageTitle) != "")
					theContents += '<span class="subTitle">' + aData[i].contentPageTitle + '</span>';

				if (aData[i].contentPageType == '88') {
					if (aData[i].contentPageTheme > -1)
						this.mResultsContainer.append('<li><a href="/' + aData[i].sectionPath + '/default.aspx#question=' + aData[i].contentPageTheme + ',' + aData[i].contentPageID + '">' + theContents + '</a></li>');
					else
						this.mResultsContainer.append('<li><a href="/' + aData[i].sectionPath + '/default.aspx#question=' + aData[i].contentPageID + '">' + theContents + '</a></li>');
				}
				else
					this.mResultsContainer.append('<li><a href="/PageByID.aspx?sectionID=' + aData[i].sectionID + '&contentPageID=' + (aData[i].contentPageID == -1 ? '' : aData[i].contentPageID) + '">' + theContents + '</a></li>');
			}

			if(aData.length > 0)
				this.mResultsContainer.append('<li><a class="title icon-search before" href="/shortcuts/search_search.aspx?search=' + encodeURIComponent(this.mObject.val()) + '"> ' + settings.liveSearch.showAllResultsText + '</a></li>');
			else
				this.mResultsContainer.append('<li><a>' + settings.liveSearch.noResultsText + '</a></li>');

			this.mResultsContainer.css({width: this.mObject.outerWidth() - 2});
			this.positionWrapper();
			this.show();
		},

		onFail: function (aData)
		{
			$.fn.showError(settings.errors.generalErrorText + " ('" + aData + "') (500.44)", "console");
		},

		onBlur: function (aEvent)
		{
			theThis = this;

			setTimeout(function () { theThis.hide(); }, 200);
		}
	};

	theReturnObject.init(aObject, aSettings);
	return theReturnObject;
};
