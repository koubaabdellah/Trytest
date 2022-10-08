(function($)
{
	var MentionTextArea = function(aObject, aOptions)
	{
		var mThis = this,
			mObject = $(aObject),
			mMentionLocations = new Array(),
			mUsers = {},
			mMentionActive = false,
			keyNames = {backspace: 8, del: 46, enter: 13, escape: 27, left: 37, up: 38, right: 39, down: 40},
			mStartPosition = 0,
			mSearchString = "";

		var mSettings = $.extend({
			maxResults: 15
		}, aOptions || {});

		var mMirrorStyles = [
			// Box Styles.
			'box-sizing', 'height', 'width', 'padding-bottom',
			'padding-left', 'padding-right', 'padding-top',
			// Font stuff.
			'font-family', 'font-size', 'font-style',
			'font-variant', 'font-weight',
			// Spacing etc.
			'word-spacing', 'letter-spacing', 'line-height',
			'text-decoration', 'text-indent', 'text-transform',
			// The direction.
			'direction'
		];

		var mContainer = $('<div class="mtaContainer"/>').css({position: 'relative', marginBottom: "-7px"}).insertAfter(mObject).append(mObject);

		var mMirror = $('<div/>').css({
			'left': -9999,
			'overflow': 'auto',
			'position': 'absolute',
			'top': 0,
			'white-space': 'pre-wrap',
			'word-wrap': 'break-word'
		}).insertAfter(mObject);

		var mMentionNameDummy = $('<div class="mtaMentionName"/>').css({
			position: "absolute",
			zIndex: 100
		});

		var mMentionList = $('<div class="mtaMentionList"/>').css({
			display: "none",
			position: "absolute",
			zIndex: 101
		}).appendTo(mContainer);

		// Public method - can be called from client code
		this.publicMethod = function()
		{
			$.fn.showError(settings.errors.publicMethodText + " (500.42)", "console");
		};

		var init = function ()
		{
			mObject.css({overflow: "hidden"});

			mObject.keydown(function (aEvent)
			{
				switch(aEvent.keyCode)
				{
					case keyNames.backspace:
					case keyNames.ctrlKey && keyNames.backspace:
						for (var i = 0; i < mMentionLocations.length; i++)
						{
							var theValue = mObject.val();

							if (/\s$/.test(theValue))
							{
								// string contains space at last
								newValue = theValue.substr(0, theValue.length - 1);

								mObject.val(newValue);

								moveCaretTo(theValue.length - 1);

								aEvent.preventDefault();

								break;
							}

							if (getOriginalCaretPos() == (mMentionLocations[i].end))
							{
								theValue = theValue.slice(0, mMentionLocations[i].start) + theValue.slice(mMentionLocations[i].end);
								mObject.val(theValue);

								moveCaretTo(mMentionLocations[i].start);

								aEvent.preventDefault();
							}
						}

						break;
					case keyNames.del:
						for (var i = 0; i < mMentionLocations.length; i++)
						{
							if (getOriginalCaretPos() == (mMentionLocations[i].start))
							{
								var theValue = mObject.val();
								theValue = theValue.slice(0, mMentionLocations[i].start) + theValue.slice(mMentionLocations[i].end);
								mObject.val(theValue);

								moveCaretTo(mMentionLocations[i].start);

								aEvent.preventDefault();
							}
						}

						break;
					case keyNames.left:
						for (var i = 0; i < mMentionLocations.length; i++)
						{
							if (getOriginalCaretPos() == (mMentionLocations[i].end))
							{
								moveCaretTo(mMentionLocations[i].start);

								aEvent.preventDefault();
							}
						}
						break;
					case keyNames.right:
						for (var i = 0; i < mMentionLocations.length; i++)
						{
							if (getOriginalCaretPos() == (mMentionLocations[i].start))
							{
								moveCaretTo(mMentionLocations[i].end);

								aEvent.preventDefault();
							}
						}
						break;
					case keyNames.up:
						if (mMentionActive)
						{
							var theSelectedItem = mContainer.find(".mtaUserList li.selected");
							var thePrevItem = theSelectedItem.prev();

							if (thePrevItem.length > 0)
							{
								theSelectedItem.removeClass("selected");
								thePrevItem.addClass("selected");
							}

							aEvent.preventDefault();
						}

						break;
					case keyNames.down:
						if (mMentionActive)
						{
							var theSelectedItem = mContainer.find(".mtaUserList li.selected");
							var theNextItem = theSelectedItem.next();

							if (theNextItem.length > 0)
							{
								theSelectedItem.removeClass("selected");
								theNextItem.addClass("selected");
							}

							aEvent.preventDefault();
						}

						break;
					case keyNames.enter:
						if (mMentionActive)
						{
							var theSelectedItem = mContainer.find(".mtaUserList li.selected");

							if (theSelectedItem.length > 0)
							{
								addMentionText(theSelectedItem.data("userInfo"));
							}

							aEvent.preventDefault();
						}
						break;
					case keyNames.escape:
						if (mMentionActive)
						{
							stopMention();

							aEvent.preventDefault();
						}

						break;
				}

				update();
			});

			mObject.on('keyup paste cut mouseup', function (aEvent)
			{
				update();

				for (var i = 0; i < mMentionLocations.length; i++)
				{
					if (getOriginalCaretPos() > mMentionLocations[i].start && getOriginalCaretPos() < mMentionLocations[i].end)
						moveCaretTo(mMentionLocations[i].end);
				}

				var thePosition;

				if (!mMentionActive && aEvent.keyCode != keyNames.escape && (thePosition = checkMonkeyTail()) !== false)
					startMention(thePosition);

				if (mMentionActive)
				{
					if (updateSearchString())
						fillMentionList();
				}
			});

			mObject.on('keyup', function (aEvent)
			{
				recalculateHeight();
			});

			mObject.blur(function ()
			{
				setTimeout(function () { stopMention() }, 200);
			});

			mObject.scroll(function ()
			{
				update();
			});

			// Do update() twice, to prevent sizing issues on edit
			update();
			update();
		};

		var addMentionText = function (aUserInfo)
		{
			if (typeof aUserInfo != "undefined" && aUserInfo == null)
				return;

			var theText = mObject.val();
			var theMentionString = "@[" + aUserInfo.UserID + ":" + aUserInfo.FirstName + "+" + aUserInfo.MiddleName + "+" + aUserInfo.LastName + "]";
			theMentionString = theMentionString.split(" ").join("+");
			theMentionString += ' ';

			theText = theText.splice(mStartPosition, getOriginalCaretPos() - mStartPosition, theMentionString);

			mObject.val(theText);

			stopMention();
			update();

			mObject.focus();
			moveCaretTo(mStartPosition + theMentionString.length);
		};

		var moveCaretTo = function (aPosition)
		{
			var theElement = mObject[0];

			if (theElement.setSelectionRange)
				theElement.setSelectionRange(aPosition, aPosition);
			else
			{
				var range = theElement.createTextRange();
				range.collapse(true);
				range.moveEnd('character', aPosition);
				range.moveStart('character', aPosition);
				range.select();
			}
		};

		var startMention = function (aPosition)
		{
			mMentionActive = true;
			mSearchString = "";

			mStartPosition = aPosition;

			getUsers();

			mMentionList.show();
			positionMentionList();
		};

		var positionMentionList = function ()
		{
			var theCoordinates = getCoordinates(mStartPosition);

			mMentionList.css({left: theCoordinates.left, top: theCoordinates.top + theCoordinates.height});
		};

		var stopMention = function ()
		{
			mMentionActive = false;

			mMentionList.hide();

			mSearchString = "";
		};

		var updateSearchString = function ()
		{
			if (mMentionActive)
			{
				var theText = mObject.val();

				if(theText.substr(mStartPosition, 1) != "@")
				{
					stopMention();

					return;
				}

				var theNewSearchString = theText.substr(mStartPosition + 1, getOriginalCaretPos() - (mStartPosition + 1));

				if(theNewSearchString != mSearchString)
				{
					mSearchString = theNewSearchString;

					return true;
				}
			}

			return false;
		};

		var getCoordinates = function (aPosition)
		{
			var theMirrorHtml = mMirror.html();
			theMirrorHtml = theMirrorHtml.splice(aPosition, 0, '<span id="mtaPositionTarget" style="position: absolute;">&nbsp;</span>');

			mMirror.html(theMirrorHtml);

			var thePositionTarget = mMirror.find("#mtaPositionTarget");
			var thePosition = thePositionTarget.position();
			thePosition.height = thePositionTarget.height();

			thePositionTarget.remove();

			return thePosition;
		};

		// Private method - can only be called from within this object
		var getOriginalCaretPos = function ()
		{
			var theElement = mObject[0];

			if (theElement.selectionStart)
				return theElement.selectionStart;
			else if (document.selection)
			{
				theElement.focus();

				var theRange = document.selection.createRange();

				if (theRange == null)
					return 0;

				var theTextRange = theElement.createTextRange(),
					theTextRangeCopy = theTextRange.duplicate();

				theTextRange.moveToBookmark(theTextRange.getBookmark());
				theTextRangeCopy.setEndPoint('EndToStart', theTextRange);

				return theTextRangeCopy.text.length;
			}
			return 0;
		};

		var checkMonkeyTail = function ()
		{
			update();

			var theText = mObject.val(),
				theCaretPos = getOriginalCaretPos(),
				thePrePos = theCaretPos - 1;

			if (thePrePos < 0)
				thePrePos = 0;

			if(theText.substr(thePrePos, 1) == "@" && (thePrePos == 0 || theText.substr(thePrePos - 1, 1).match(/(\s|\r|\n)/) != null))
				return thePrePos;

			return false;
		};

		var setMentions = function ()
		{
			var theText = mObject.val(),
				theRegEx = new RegExp("\\@\\[([0-9]+?):(.+?)\\]", "gim");

			mContainer.find(".mtaMentionName").remove();

			mMentionLocations = new Array();

			while((theMatch = theRegEx.exec(theText)) != null)
			{
				var theIndexStart = theText.indexOf(theMatch[0]),
					theIndexEnd = theIndexStart + theMatch[0].length,
					theTopLeft = getCoordinates(theIndexStart),
					theBottomRight = getCoordinates(theIndexEnd);

				addMentionName(theMatch[2], theTopLeft, theBottomRight);

				mMentionLocations.push({start: theIndexStart, end: theIndexEnd});
			}
		};

		var addMentionName = function (aUserName, aCoordinatesTopLeft, aCoordinatesBottomRight)
		{
			if (aCoordinatesTopLeft.top < aCoordinatesBottomRight.top)
				aCoordinatesTopLeft.left = getCoordinates(0).left;

			var theWidth = aCoordinatesBottomRight.left - aCoordinatesTopLeft.left;

			var theMentionName = mMentionNameDummy.clone().css({left: aCoordinatesTopLeft.left, top: aCoordinatesBottomRight.top + 2, width: theWidth + 2, height: aCoordinatesBottomRight.height});
			theMentionName.html(aUserName.split("+").join(" "));
			theMentionName.appendTo(mContainer);

			if (aCoordinatesBottomRight.top > mObject.height() || aCoordinatesBottomRight.top + theMentionName.height() < 0)
				theMentionName.hide()
			else
				theMentionName.show();
		};

		var update = function ()
		{
			// Replace < and > with V to prevent HTML errors. We use V because it has the same character width.
			mMirror.html(mObject.val().split("<").join("V").split(">").join("V"));
			mMirror.scrollTop(mObject.scrollTop());

			setMentions();
			positionMentionList();
		};

		var recalculateHeight = function ()
		{
			mMirror.css({height: "auto", minHeight: 0});

			if (mObject.is("textarea") && mObject.parents(".addItemComment").length == 0)
				mObject.css({height: mMirror.height() + 30});
			else
			{
				tArea = document.getElementById(mObject[0].id);

				var mHeight = mObject.height();

				if (mHeight !== tArea.scrollHeight + 36)
				{
					mObject.css("height", "auto");
					mObject.css("height", (36 + tArea.scrollHeight) + "px");
				}
			}

			// Copy styles.
			var theStyles = {};
			for (var i = 0, theStyle; theStyle = mMirrorStyles[i]; i++)
			{
				theStyles[theStyle] = mObject.css(theStyle);
			}

			mMirror.css(theStyles);
		}

		var getUsers = function ()
		{
			mMentionList.html('<div class="loader" role="status"/>');

			$.ajax(
			{
				url: "/api/user/GetCommentersByPermissions?sectionID=" + settings.section.ID + "&contentPageID=" + settings.section.itemID + "&token=" + $("input[name='__RequestVerificationToken']").val(),
				dataType: "json"
			})
			.done(function (aData)
			{
				mUsers = aData;

				if (typeof mUsers.length == "undefined" || mUsers.length < 1)
				{
					stopMention();

					return;
				}

				fillMentionList();
			})
			.error(function ()
			{

			});
		};

		var fillMentionList = function ()
		{
			var theList = $('<ul class="mtaUserList"/>'),
				theSelectedSet = false,
				theNumberOfUsers = 0;

			if (typeof mUsers.length == "undefined" || mUsers.length < 1)
				return;

			for (var index in mUsers)
			{
				if (theNumberOfUsers >= mSettings.maxResults || mObject.val().indexOf("@[" + mUsers[index].UserID + ":") > -1)
					continue;

				if (mSearchString != "" &&
					mUsers[index].FirstName.toLowerCase().indexOf(mSearchString.toLowerCase()) < 0 &&
					mUsers[index].MiddleName.toLowerCase().indexOf(mSearchString.toLowerCase()) < 0 &&
					mUsers[index].LastName.toLowerCase().indexOf(mSearchString.toLowerCase()) < 0)
					continue;

				var theListItem = $('<li/>');

				if (!theSelectedSet)
				{
					theListItem.addClass("selected");

					theSelectedSet = true;
				}

				var theListItemImageContainer = $('<div class="mtaImageContainer"/>');

				if (mUsers[index].ProfileImage && mUsers[index].ProfileImage != "")
					theListItemImageContainer.append('<img src="' + mUsers[index].ProfileImage + '?Width=30&amp;Height=30" alt="' + mUsers[index].FirstName + ' ' + mUsers[index].MiddleName + ' ' + mUsers[index].LastName + '" />');
				else
					theListItemImageContainer.append('<div class="noAvatar icon-user before" />');

				theListItem.append(theListItemImageContainer);

				theListItem.append('<div class="mtaUser">' + mUsers[index].FirstName + ' ' + mUsers[index].MiddleName + ' ' + mUsers[index].LastName + '</div>');
				theListItem.append('<div class="clearBoth"/>');
				theListItem.click(function ()
				{
					addMentionText($(this).data("userInfo"));
				});

				theListItem.data("userInfo", mUsers[index]);

				theList.append(theListItem);

				theNumberOfUsers++;
			}

			if (theNumberOfUsers == 0)
				stopMention();

			if (mMentionList.find("ul").length > 0)
			{
				if (mMentionList.find("ul").html() == theList.html())
					return;
			}

			mMentionList.html(theList);
		};

		init();
	};

	$.fn.mentionTextArea = function(aOptions)
	{
		return this.each(function()
		{
			var theObject = $(this);

			// Return early if this element already has a plugin instance
			if (theObject.data('mentionTextArea')) return;

			// pass options to plugin constructor
			var thePlugin = new MentionTextArea(this, aOptions);

			// Store plugin object in this element's data
			theObject.data('mentionTextArea', thePlugin);
		});
	};
})(jQuery);
