$(document).ready(function()
{
	// Initialize.
	$.fn.initializeOnce();

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		// Initialize before AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(function(sender, arguments)
		{
			$.fn.initializeBeforeAJAX(arguments);
		});

		// Initialize after AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, arguments)
		{
			$.fn.initializeOnceAndAfterAJAX(arguments);

			// Error handling for barracuda policy restrictions
			if (sender._postBackSettings && sender._postBackSettings.panelsToUpdate != null)
			{
				if (arguments.get_error() != null)
				{
					for (var i = 0; i < sender._postBackSettings.panelsToUpdate.length; i++)
					{
						var updatePanel = $("#" + sender._postBackSettings.panelsToUpdate[i].split("$").join("_"));

						updatePanel.find(".loader.update").remove();
					}

					$.fn.alert(settings.errors.updatePanelErrorText);
					arguments.set_errorHandled(true);
				}
			}

			// hCaptcha.
			if ($("#h-captcha").length > 0)
			{
				hCaptcha.render("h-captcha",
				{
					sitekey: "4dd31292-4a91-4442-8c76-4544d33192ec"
				});
			}

			if (document.scrollToAfterAjax)
			{
				var scrollTarget = 0;

				if (typeof document.scrollToAfterAjax == 'string')
				{
					var targetScrollObject = $('#' + document.scrollToAfterAjax);

					if (targetScrollObject.length > 0)
						scrollTarget = targetScrollObject.offset().top - $('#top').outerHeight();
				}

				$("html, body").animate({ scrollTop: scrollTarget });
				document.scrollToTopAfterAjax = false;
			}
		});
	}
});

$(window).load(function()
{
	// Mett logo.
	$(".mett").setColor({ color: settings.colors.mettLogo });

	// RoyalSlider.
	$(".royalSlider").css("height", "auto");

	$.fn.initializeMaintenance();

	$.fn.initializeHelpdeskWidget();
});

$(window).resize(function() {
	// Spacers.
	$.fn.initializeSpacers({ resize: true });

	// Main menu.
	$("#mainMenu").initializeMainMenu();

	// Fixed path.
	$.fn.fixedPath();

	// Videos.
	$(
		"iframe[src*='youtube.com'], iframe[src*='youtube-nocookie.com'], iframe[src*='vimeo.com'], iframe[src*='bluebillywig.com'], iframe[src*='pano.autodesk.com']"
	).setVideoFrameSize();

	// Image Maps
	$("img[usemap]").initializeImageMaps();
});

// Initialize.
$.fn.initializeOnce = function()
{
	// Scroll actions.
	$(window).scroll($.fn.initializeScrolling);

	$("body").keydown(function (e) {
		// Close shortcut menus on esc press
		if (e.keyCode == 27) {
			$("#shortcuts > li > a").removeClass("active");
			$("#shortcuts > li > .dropDown.show").removeClass("show").find("a, button").last().focus();
		}

		// When pressed space (32) or enter (13)
		if (e.keyCode == 32 || e.keyCode == 13) {
			var targetObject = $("[role=button]:focus");

			if (targetObject.length > 0 && (e.keyCode != 13 || targetObject.is("div"))) {
				targetObject[0].click();

				e.preventDefault();
			}
		}

		// Tab
		if (e.keyCode == 9) {
			$("body").addClass("keyboard-user");
		}
	});

	$("body").click(function (e) {
		// Determine if it's a mouse click
		if (e.detail > 0)
			$("body").removeClass("keyboard-user");
	});

	// Browser.
	if (typeof bowser !== "undefined" && bowser != null)
	{
		if (bowser.name != null) $("html").addClass(bowser.name.toLowerCase().replace(" ", ""));

		if (bowser.version != null)
			$("html").addClass(bowser.name.toLowerCase().replace(" ", "") + bowser.version.replace(".", ""));
	}

	// Home.
	if (settings.section.parentID == -1)
		$("html").addClass("home");

	// Main menu.
	$("#mainMenu").initializeMainMenu();

	// Mobile menu.
	$("#mobileSlideOut").initializeMobileMenu();

	// Anchor menu.
	$("#anchorMenu").initializeAnchorMenu();

	// SubMenu which only shows active menu item
	$("#subMenu").initializeActiveItemOnlySubMenu();

	// Horizontal menu
	$("#subMenu.horizontal").initializeHorizontalSubMenu();

	// Anchor links.
	$(".editorContent a[href^='#']:not([href='#'])").initializeAnchorLinks();

	// Internal page anchors.
	$(".editorContent a.anchor-link").initializeInternalPageAnchors();

	// Shortcuts.
	$("#shortcuts, #mobileShortcuts, #footer").initializeShortcuts();

	// Search.
	$("#top .search").initializeSearch();

	// Login.
	$("#login").initializeLogin();

	// RoyalSlider.
	$(".royalSlider").initializeRoyalSlider();

	// Path.
	$("#path").initializePath();

	// Cookie settings overlay
	$("#cookieSettingsOverlay").initializeCookieSettingsOverlay();

	// Main menu scrollable row
	$("#mainMenu > .row").calculateMainMenuDropdownPosition();

	if (settings.section.ID > 0 &&
		settings.section.itemID > 0)
		$('#relatedContent').initializeRelatedContent();

	if ($('#events, #groups, #forms, #newsletters, #registrations, #users, #cms, #roles').length === 0 &&
		settings.section.ID > 0 &&
		settings.section.itemID > 0 &&
		$('.item.add.edit, .item.delete').length === 0 &&
		settings.section.enablePageNav)
		$('.item').initializePageNavigation();

	if ($('#registrations.item').length > 0)
		$('.item').initializeRegistrationCheckboxCheck();

	$('.userConditions .field input[type="checkbox"], .privacyStatement .field input[type="checkbox"]').on('change', function()
	{
		$('.item').initializeRegistrationCheckboxCheck();
	});

	if ($('html.pageType90').length > 0 && !settings.section.isAdd && !settings.section.isEdit)
		$.fn.injectMettAccessibilityParagraph();

	$("#top .logo").on('transitionend webkitTransitionEnd oTransitionEnd', function () {
		$.fn.initializeSpacers();
	});

	$(".dropDown .pageType36").initializeManualRedirect();

	// Keep session alive for 24 hours.
	$.startKeepAlive(86400000);

	$.fn.initializeOnceAndAfterAJAX();
};

// Initialize after AJAX call.
$.fn.initializeOnceAndAfterAJAX = function(arguments) {
	// Spacers.
	$.fn.initializeSpacers();

	// Focus out of screen fix.
	$("a, button, input, [tabindex]").initializeFocus();

	// Restore focus for keyboard users.
	$.fn.restoreFocus();

	// Apply cookie settings to content.
	setTimeout(function()
	{
		$("body").applyCookieSettings();
	}, 200);

	// Toolbars.
	$("body").initializeToolbars();

	// Tags.
	$(".tagsInput").initializeTags();

	// Tabs.
	$(".tabs .tab:not(.hide)").initializeTabs();

	// Save.
	$(".save").initializeSave();

	// Errors.
	$(".error").initializeErrors();

	// Comments.
	$("#addComment").initializeComments();

	// Create clickable links in comments.
	$(".commentText").createClickableLinks();

	// Password checks.
	$(".passwordCheck").initializePasswordCheck();

	// Custom containers.
	$(".containerToggle").initializeCustomContainers();

	// Color pickers.
	$(".colorPicker").initializeColorPickers();

	// Switchery toggles.
	$(".field").not(".noSwitchery").find("input[type=checkbox]").initializeSwitchery();

	// Powerange sliders.
	$(".field.powerange").initializePowerange();

	// Range sliders.
	$(".field .range-slider").initializeRangeSlider();

	// Portal selector.
	$(".portalSelector").initializePortalSelector();

	// Plupload.
	$(".uploader").initializePlupload();

	// Overlays.
	$(".overlay").initializeOverlays();

	// Drop down menus.
	$(".dropDownMenu").initializeDropDownMenus();

	// Tags in sections
	$(".tags[data-item-id]").initializeTagsDisplay();

	// Inline likes.
	$(".like.inline").initializeInlineLikes();

	$('#forum.section .listAlternative').initializeForumStickies();

	// User tagging.
	if (($('#groups').length > 0 || $('#documents-v3').length > 0) && $(".tagUsers").length > 0)
		$(".tagUsers").mentionTextArea();

	// Statistics.
	if ($(".statistics").length > 0) $(".statistics").initializeStatistics();

	// WCAG requirement.
	$(".button a").attr("role", "button");

	// Videos.
	setTimeout(function() {
		$(
			"iframe[src*='youtube.com'], iframe[src*='youtube-nocookie.com'], iframe[src*='vimeo.com'], iframe[src*='bluebillywig.com'], iframe[src*='pano.autodesk.com']"
		).initializeVideoFrames();
	}, 50);

	// Image Maps
	$("img[usemap]").initializeImageMaps();

	// Keyboard Accessibility for drop downs
	$("html:not(.mobile) .dropDown").enableKeyboardAccessibility();

	// Add aria-labels to uppercase elements
	$("input [type='submit'], input [type='button'], button, .button a").addAriaLabels();

	$(".password input:password").initializePasswordVisibilityToggle();

	$.fn.initializeAccessibleHCaptcha();

	$(".pageNumber a").initializePageNumbers();

	$(".conditionsLink").parent().find("label").append("&nbsp;").append($(".conditionsLink"));
	$(".privacyLink").parent().find("label").append("&nbsp;").append($(".privacyLink"));

	$('[data-total-records]').initializeTotalRecords();
};

// Initialize before AJAX call.
$.fn.initializeBeforeAJAX = function(arguments) {
	// Loader.
	$.fn.showLoader(arguments);

	// Remember focus for keyboard users
	$.fn.rememberFocus();
};

// Initialize spacers.
$.fn.initializeSpacers = function(options) {
	var defaults = {
		resize: false,
		initTopSpacer: true,
		initBottomSpacer: true
	};

	var options = $.extend(defaults, options),
		spacers = $(this),
		cookieSettingsHeight = $('#cookieSettingsOverlayToggle:not(.hide)').outerHeight() || 0,
		cookieSpacer = $('#cookieSpacer');

	// Reset.
	if (options.initTopSpacer)
		$("#top").removeAttr("style");

	if (options.initBottomSpacer)
		$("#bottom").removeAttr("style");

	if (!options.resize) {
		// Initialize after images are loaded.
		if ($("#top .logo").length > 0 && $("#top .logo").attr("src").indexOf("?") == -1) {
			// Anti caching.
			$("#top .logo")
				.attr("src", $("#top .logo").attr("src") + "?" + new Date().getTime())
				.load(function() {
					$("#spacerTop").height($("#top").height() - 1);
				});
		}

		$("#bottom .editorContent img").load(function() {
			$("#spacerBottom").height($("#bottom").outerHeight());
		});
	}

	if (options.initBottomSpacer && cookieSpacer.length == 0) {
		cookieSpacer = $('<div>');
		cookieSpacer.attr('id', 'cookieSpacer');
		$('#bottom').append(cookieSpacer);
	}

	cookieSpacer.height(cookieSettingsHeight);

	if (options.initTopSpacer)
		$("#spacerTop").stop().animate({ height: $("#top").height() - 1 }, 200);

	if (options.initBottomSpacer)
		$("#spacerBottom").height($("#bottom").outerHeight());
};

// Delayed drop down menu.
$.fn.initializeDropDownMenus = function() {
	$(this).each(function() {
		var currentObject = $(this),
			timeout = 0;

		currentObject
			.unbind("hover")
			.hover(function() {
				if (currentObject.hasClass("delayed")) {
					clearTimeout(timeout);

					timeout = setTimeout(function() {
						currentObject.addClass("expanded");
					}, 400);
				}
			})
			.mouseleave(function() {
				if (currentObject.hasClass("delayed")) {
					clearTimeout(timeout);

					currentObject.removeClass("expanded");
				}
			});
	});
};

// Initialize toolbars & buttons.
$.fn.initializeToolbars = function() {
	var container = $(this);

	if (container.find(".toolbar").length > 0) {
		// Toolbars.
		container.find(".toolbar").each(function() {
			var toolbar = $(this),
				showToolbar = false;

			// Buttons.
			toolbar.initializeToolbarButtons();

			if (toolbar.find("a, input:button:not(.hide), input:submit:not(.hide), input:radio:not(.hide), input:image:not(.hide)").length > 0) {
				showToolbar = true;

				// Top toolbar.
				if (toolbar.attr("id") == "toolbarTop") {
					// Hide top toolbar on shortcuts.
					if (settings.section.isShortcut) showToolbar = false;
					else {
						var dropDownMenu = toolbar.find(".dropDown"),
							bottomToolbarSelector = "#toolbarBottom";

						if ($("#roles.item").length > 0) {
							// Role toolbar.
							bottomToolbarSelector = "#toolbarBottomRoles";
						}

						$(bottomToolbarSelector + " .button").not(".button.save").each(function (i) {
							var button = $(this);

							if (i == 0) {
								// Remove previously copied links.
								dropDownMenu.find(".dropDownLink").remove();
							}

							if (button.find("a, input").length > 0) {
								// Copy bottom toolbar content to top toolbar drop down.
								var dropDownLink = $("<a />")
									.attr("href", "/")
									.addClass(button.attr("class").replace("button", "dropDownLink"));

								if (button.find("a").length > 0) {
									// Link.
									dropDownLink.html(button.find("a").html());

									dropDownLink.unbind("click").click(function () {
										button.find("a")[0].click();

										return false;
									});
								} else {
									// Input button.
									dropDownLink.html(button.find("input").val());

									dropDownLink.unbind("click").click(function () {
										button.find("input").click();
									});
								}

								// Append link to drop down menu.
								dropDownMenu.append(dropDownLink);

								$("html:not(.mobile) .dropDown").enableKeyboardAccessibility();

								// Add button.
								if (dropDownMenu.find(".dropDownLink.add").length > 0)
									dropDownMenu.find(".dropDownLink.add").html(settings.buttons.addText);
							} else {
								// Hide button.
								button.addClass("hide");
							}
						});

						if (dropDownMenu.find("a").length > 0)
							dropDownMenu.parents(".dropDownMenu").removeClass("hide");

						toolbar.find('.toolbarWrapper').each(function () {
							if ($(this).find('> .button:not(.hide)').length > 0)
								$(this).removeClass('hide');
						});

						if (toolbar.find('.toolbarWrapper:not(.hide)').length == 0)
							toolbar.addClass('hide');
						else
							toolbar.removeClass('hide');

						// Move toolbar.
						$("#options").append(toolbar);
					}
				}

				// Sharing toolbar.
				if (toolbar.attr("id") == "toolbarShare" || toolbar.hasClass("share")) {
					if (settings.section.isShortcut || $(".item.add").length > 0 || $(".item.edit").length > 0)
						showToolbar = false;
					else {
						// Move sharing toolbar on mobiles & tablets.
						if ($(".touch").length > 0 && $("#right").length > 0 && $.fn.viewport().width <= 768)
							$("#right").append(toolbar);
					}


					// Generate mailto link when not logged in or logged in.
					toolbar.find(".button.mail a").prop("href", "mailto:?subject=" + settings.various.shareMailText + "&body=" + globals.url);

				}

				// Show toolbar.
				if (showToolbar) toolbar.show();
			}
		});

		$("a, button, input, [tabindex]").initializeFocus();
	}

	// Keyboard Accessibility for drop downs
	$("html:not(.mobile) .dropDown").enableKeyboardAccessibility();
};

// Initialize toolbar buttons.
$.fn.initializeToolbarButtons = function() {
	var container = $(this);

	if (settings.section.isAdd || settings.section.isEdit) {
		// Back.
		container.find(".backToParent a").each(function() {
			var backButton = $(this);

			backButton.unbind("click").click(function () {
				var targetUrl = settings.section.parentUrl;
				var referrerField = $("[id$='_hfReferrer']");

				if (referrerField.length > 0 && $.trim(referrerField.val()) != "")
					targetUrl = $.trim(referrerField.val());

				document.location.href = targetUrl;

				return false;
			});

			backButton.parent().removeClass("hide").addClass("visible");
		});
	} else {
		// Don't show on default and role pages.
		if (
			settings.section.typeID != 14 &&
			settings.section.typeID != 29 &&
			settings.section.typeID != 39 &&
            settings.section.typeID != 44 &&
            settings.section.typeID != 83 &&
            !settings.section.isUser
		) {
			// Don't show on sections.
			if (settings.section.itemID > 0) {
				// Like view only
				container.find(".likeview input:button").each(function () {
                    var likeButton = $(this),
                        likeCheckbox = likeButton.parent().find("input:checkbox");

                    if (likeCheckbox.length > 0) {
                        // Likes count.
                        likeButton.val(
                            likeButton
                            .parent()
                            .find("label")
                            .html()
						);

						if (settings.user.ID == -1) {
							likeButton.parent().addClass('noHover');
							likeButton.parent().removeClass("hide").addClass("visible");
						}
						else
							likeButton.parent().removeClass("visible").addClass("hide");
					}
                });
				// Like.
				container.find(".like input:button, .liked input:button").each(function() {
					var likeButton = $(this),
						likeCheckbox = likeButton.parent().find("input:checkbox");

					if (likeCheckbox.length > 0) {
						// Likes count.
						likeButton.val(
							likeButton
								.parent()
								.find("label")
								.html()
						);

						// Initial state.
						if (likeCheckbox.is(":checked")) {
							// Liked.
							likeButton
								.parent()
								.removeClass("like icon-heart-empty")
								.addClass("liked icon-heart");
							likeButton.attr("title", settings.buttons.unLikeText);
						}

						likeCheckbox.unbind("click").click(function() {
							var itemID = settings.section.itemID;

							if (likeCheckbox.is(".comment input:checkbox")) {
								var commentID = likeCheckbox.parents(".comment:first").attr("id");

								if (typeof commentID != "undefined" && commentID != null && commentID.indexOf("_") > -1)
									itemID = commentID.split("_")[1];
							}

							$.ajax({
								url: "/api/notification/SetLike",
								data: {
									sectionID: settings.section.ID,
									contentPageID: itemID,
									status: likeCheckbox.is(":checked"),
									token: $("input[name='__RequestVerificationToken']").val()
								}
							})
								.done(function(aData) {
									if (typeof aData == "object" && aData.length > 0) {
										if (typeof aData[0].likeCount != "undefined" && aData[0].likeCount != null) {
											likeButton
												.parent()
												.find("label")
												.html(aData[0].likeCount);
											likeButton.val(aData[0].likeCount);

											// Inline likes.
											if (aData[0].contentPageID === settings.section.itemID)
											$(".like.inline")
												.find(".number")
												.html(aData[0].likeCount);
										}
									}
								})
								.fail(function() {
									$.fn.showError(arguments + ". (500.51)", "console");
								});
						});

						likeButton.unbind("click").click(function() {
							var inlineLikeButton = $(".like.inline"),
								isComment = false;

							if (likeButton.parents(".comment").length > 0) isComment = true;

							// Re-initialize checkbox after update.
							likeCheckbox = likeButton.parent().find("input:checkbox");
							likeCheckbox.click();

							if (likeCheckbox.is(":checked")) {
								// Liked.
								likeButton
									.parent()
									.removeClass("like icon-heart-empty")
									.addClass("liked icon-heart");
								likeButton.attr("title", settings.buttons.unLikeText);

								if (isComment == false && inlineLikeButton.length > 0) {
									// Inline likes.
									inlineLikeButton.addClass("liked");
									inlineLikeButton.removeClass("icon-heart-empty").addClass("icon-heart");
									inlineLikeButton.attr("title", settings.buttons.unLikeText);
									inlineLikeButton.data("checked", true);
									inlineLikeButton
										.find(".screenReaderContent")
										.html(settings.buttons.inlineUnLikeText);
								}
							} else {
								// Like.
								likeButton
									.parent()
									.removeClass("liked icon-heart")
									.addClass("like icon-heart-empty");
								likeButton.attr("title", settings.buttons.likeText);

								if (isComment == false && inlineLikeButton.length > 0) {
									// Inline likes.
									inlineLikeButton.removeClass("liked icon-heart").addClass("icon-heart-empty");
									inlineLikeButton.attr("title", settings.buttons.likeText);
									inlineLikeButton.data("checked", false);
									inlineLikeButton.find(".screenReaderContent").html(settings.buttons.inlineLikeText);
								}
							}

							// Update likes count.
							likeButton.val(
								likeButton
									.parent()
									.find("label")
									.html()
							);

							return false;
						});

						likeButton.parent().removeClass("hide").addClass("visible");
					}
				});
			}

			// Follow & unfollow sections / items
			/*container.find(".follow input:button, .following input:button").each(function() {
				// First load.
				var followButton = $(this),
					followCheckbox = followButton.parent().find("input:checkbox");

				if (followCheckbox.length > 0) {
					// Follow.
					var follow = function() {
						followButton
							.parent()
							.removeClass("following icon-check")
							.addClass("follow icon-bell");
						followButton.val(settings.buttons.followText).attr("title", settings.buttons.followText);

						$(followButton).hover(
							function() {
								followButton
									.val(settings.buttons.followText)
									.attr("title", settings.buttons.followText);
								followButton
									.parent()
									.removeClass("icon-cancel")
									.addClass("icon-check");
							},
							function() {
								followButton
									.val(settings.buttons.followText)
									.attr("title", settings.buttons.followText);
								followButton
									.parent()
									.removeClass("icon-cancel")
									.addClass("icon-check");
							}
						);
					};

					// Following.
					var following = function() {
						followButton
							.parent()
							.removeClass("follow icon-bell")
							.addClass("following icon-check");
						followButton.val(settings.buttons.followingText).attr("title", settings.buttons.followingText);

						$(followButton).hover(
							function() {
								followButton
									.val(settings.buttons.unFollowText)
									.attr("title", settings.buttons.unFollowText);
								followButton
									.parent()
									.removeClass("icon-check")
									.addClass("icon-cancel");
							},
							function() {
								followButton
									.val(settings.buttons.followingText)
									.attr("title", settings.buttons.followingText);
								followButton
									.parent()
									.removeClass("icon-cancel")
									.addClass("icon-check");
							}
						);
					};

					// Initial state.
					if (followCheckbox.is(":checked")) following();

					followCheckbox.unbind("click").click(function() {
						$.ajax({
							url: "/api/notification/SetNotification",
							data: {
								sectionID: settings.section.ID,
								contentPageID: settings.section.itemID,
								status: followCheckbox.is(":checked"),
								token: $("input[name='__RequestVerificationToken']").val()
							}
						}).fail(function() {
							$.fn.showError(arguments + ". (500.52)", "console");
						});
					});

					followButton.unbind("click").click(function() {
						// Re-initialize checkbox after update.
						followCheckbox = followButton.parent().find("input:checkbox");
						followCheckbox.click();

						if (followCheckbox.is(":checked")) following();
						else follow();
					});

					followButton.parent().removeClass("hide").addClass("visible");
				}
			});*/

			container.find('.follow, .following').each(function()
			{
				// First load.
				var followButton = $(this),
					followButtonInput = followButton.find('input:button'),
					followCheckbox = followButton.find('input:checkbox');

				if (followCheckbox.length > 0)
				{
					// Follow.
					var follow = function()
					{
						followButton.removeClass("following icon-check").addClass("follow icon-bell");
						followButtonInput.val(settings.buttons.followText).attr('title', settings.buttons.followText);

						$(followButton).hover(
							function()
							{
								followButtonInput.val(settings.buttons.followText).attr("title", settings.buttons.followText);
								followButton.removeClass("icon-cancel").addClass("icon-check");
							},
							function()
							{
								followButtonInput.val(settings.buttons.followText).attr("title", settings.buttons.followText);
								followButton.removeClass("icon-cancel").addClass("icon-check");
							}
						);
					};

					// Following.
					var following = function()
					{
						followButton.removeClass("follow icon-bell").addClass("following icon-check");
						followButtonInput.val(settings.buttons.followingText).attr("title", settings.buttons.followingText);

						$(followButton).hover(
							function()
							{
								followButtonInput.val(settings.buttons.unFollowText).attr("title", settings.buttons.unFollowText);
								followButton.removeClass("icon-check").addClass("icon-cancel");
							},
							function()
							{
								followButtonInput.val(settings.buttons.followingText).attr("title", settings.buttons.followingText);
								followButton.removeClass("icon-cancel").addClass("icon-check");
							}
						);
					};

					// Initial state.
					if (followCheckbox.is(":checked")) following();

					followCheckbox.unbind("click").click(function()
					{
						$.ajax(
						{
							url: "/api/notification/SetNotification",
							data: {
								sectionID: settings.section.ID,
								contentPageID: settings.section.itemID,
								status: followCheckbox.is(":checked"),
								token: $("input[name='__RequestVerificationToken']").val()
							}
						}).done(function(data)
						{
							fetchFollowersData();
						}).fail(function()
						{
							$.fn.showError(arguments + ". (500.52)", "console");
						});
					});

					followButton.unbind("click").click(function() {
						// Re-initialize checkbox after update.
						followCheckbox = followButton.parent().find("input:checkbox");
						followCheckbox.click();

						if (followCheckbox.is(":checked")) following();
						else follow();
					});

					followButton.removeClass("hide").addClass("visible");
				}
			});

			/* Number of followers button */
			if (container.find('.followers').length > 0)
				fetchFollowersData();

			// Vote & unvote.
			container.find(".vote input:button, .voted input:button").each(function() {
				var voteButton = $(this),
					voteSubmitButton = voteButton.parents(".voting").find(".voteSubmit input");

				if (voteSubmitButton.length > 0) {
					// Vote.
					var vote = function() {
						voteButton
							.parent()
							.removeClass("voted")
							.addClass("vote");
						voteButton.val(settings.buttons.voteText).attr("title", settings.buttons.voteText);

						$(voteButton).hover(
							function() {
								voteButton.val(settings.buttons.voteText).attr("title", settings.buttons.voteText);
								voteButton
									.parent()
									.removeClass("icon-cancel")
									.addClass("icon-thumbs-up");
							},
							function() {
								voteButton.val(settings.buttons.voteText).attr("title", settings.buttons.voteText);
								voteButton
									.parent()
									.removeClass("icon-cancel")
									.addClass("icon-thumbs-up");
							}
						);
					};

					// Voted.
					var voted = function() {
						voteButton
							.parent()
							.removeClass("vote icon-thumbs-up")
							.addClass("voted icon-check");
						voteButton.val(settings.buttons.votedText).attr("title", settings.buttons.votedText);

						$(voteButton).hover(
							function() {
								voteButton.val(settings.buttons.unVoteText).attr("title", settings.buttons.unVoteText);
								voteButton
									.parent()
									.removeClass("icon-check")
									.addClass("icon-cancel");
							},
							function() {
								voteButton.val(settings.buttons.votedText).attr("title", settings.buttons.votedText);
								voteButton
									.parent()
									.removeClass("icon-cancel")
									.addClass("icon-check");
							}
						);
					};

					// Initial state.
					if (voteSubmitButton.hasClass("deleteVote")) voted();

					voteButton.unbind("click").click(function() {
						if (voteSubmitButton.hasClass("deleteVote")) voted();
						else vote();

						voteSubmitButton.click();
					});

					voteButton.parent().removeClass("hide").addClass("visible");
				}
			});

			// Register.
			container.find(".register input:button").each(function() {
				var registerButton = $(this);

				registerButton.parent(".button").removeClass("hide").addClass("visible");
			});

			// Sign up & sign off.
			container.find(".signUp input:submit, .signedUp input:submit").each(function() {
				var signUpButton = $(this);

				// Sign up.
				var signUp = function() {
					signUpButton
						.parent()
						.removeClass("signedUp")
						.addClass("signUp");
					signUpButton.val(settings.buttons.signUpText).attr("title", settings.buttons.signUpText);

					$(signUpButton).hover(
						function() {
							signUpButton.val(settings.buttons.signUpText).attr("title", settings.buttons.signUpText);
							signUpButton
								.parent()
								.removeClass("icon-cancel")
								.addClass("icon-user-add");
						},
						function() {
							signUpButton.val(settings.buttons.signUpText).attr("title", settings.buttons.signUpText);
							signUpButton
								.parent()
								.removeClass("icon-cancel")
								.addClass("icon-user-add");
						}
					);
				};

				// Signed up.
				var signedUp = function() {
					signUpButton
						.parent()
						.removeClass("signUp icon-user-add")
						.addClass("signedUp icon-check");
					signUpButton.val(settings.buttons.signedUpText).attr("title", settings.buttons.signedUpText);

					$(signUpButton).hover(
						function() {
							signUpButton.val(settings.buttons.signOffText).attr("title", settings.buttons.signOffText);
							signUpButton
								.parent()
								.removeClass("icon-check")
								.addClass("icon-cancel");
						},
						function() {
							signUpButton
								.val(settings.buttons.signedUpText)
								.attr("title", settings.buttons.signedUpText);
							signUpButton
								.parent()
								.removeClass("icon-cancel")
								.addClass("icon-check");
						}
					);
				};

				// Initial state.
				if (signUpButton.hasClass("groupUnRegister") && !signUpButton.hasClass("groupFull")) signedUp();
				else if (signUpButton.hasClass("groupFull"))
					signUpButton
						.parent()
						.removeClass("signUp icon-user-add")
						.addClass("signedUp icon-cancel");

				signUpButton.unbind("click").click(function() {
					if (!signUpButton.hasClass("groupFull")) {
						if (signUpButton.hasClass("groupUnRegister")) {
							if (signUpButton.confirm(settings.warnings.unRegisterGroupText)) signedUp();
							else return false;
						} else signUp();
					}
				});
			});
		}

		// Don't show on user and role pages.
		if (
			settings.user != undefined &&
			settings.user.ID != -1 &&
			!settings.section.isUser &&
			settings.section.itemID != 46
		) {
			// Favorite button.
			container.find(".favorite input:button, .favorited input:button, .favorite button, .favorited button").each(function() {
				var favoriteButton = $(this),
					favoriteCheckbox = favoriteButton.parent().find("input:checkbox");

				if (favoriteCheckbox.length > 0) {
					// Initial state.
					if (favoriteCheckbox.is(":checked")) {
						// Favorited.
						favoriteButton
							.parent()
							.removeClass("favorite icon-awesome-star-empty")
							.addClass("favorited icon-awesome-star");
						favoriteButton.attr("title", settings.buttons.unfavoriteText);
						favoriteButton.attr("aria-label", settings.buttons.unfavoriteText);
						favoriteButton.find(".screenReaderContent").text(settings.buttons.unfavoriteText);
					}

					favoriteCheckbox.unbind("click").click(function() {
						$.ajax({
							url: "/api/notification/SetFavorite",
							data: {
								sectionID: settings.section.ID,
								contentPageID: settings.section.itemID,
								status: favoriteCheckbox.is(":checked"),
								token: $("input[name='__RequestVerificationToken']").val()
							}
						})
							.done(function() {
								if (favoriteCheckbox.is(":checked")) {
									// Show favorites in shortcuts.
									$("#shortcuts .favorites")
										.parent()
										.removeClass("hide").addClass("visible");
								} else {
									// Check of there are more favorites.
									$.ajax({
										url: "/api/notification/HasFavorites",
										data: {
											userID: settings.user.ID,
											token: $("input[name='__RequestVerificationToken']").val()
										}
									}).done(function(data) {
										if (!data) {
											// Hide favorites in shortcuts.
											$("#shortcuts .favorites")
												.parent()
												.addClass("hide");
										}
									});
								}
							})
							.fail(function() {
								$.fn.showError(arguments + ". (500.65)", "console");
							});
					});

					favoriteButton.unbind("click").click(function() {
						// Re-initialize checkbox after update.
						favoriteCheckbox = favoriteButton.parent().find("input:checkbox");
						favoriteCheckbox.click();

						if (favoriteCheckbox.is(":checked")) {
							// Favorited.
							favoriteButton
								.parent()
								.removeClass("favorite icon-awesome-star-empty")
								.addClass("favorited icon-awesome-star");
							favoriteButton.attr("title", settings.buttons.unfavoriteText);
							favoriteButton.attr("aria-label", settings.buttons.unfavoriteText);
							favoriteButton.find(".screenReaderContent").text(settings.buttons.unfavoriteText);
						} else {
							// Favorite.
							favoriteButton
								.parent()
								.removeClass("favorited icon-awesome-star")
								.addClass("favorite icon-awesome-star-empty");
							favoriteButton.attr("title", settings.buttons.favoriteText);
							favoriteButton.attr("aria-label", settings.buttons.favoriteText);
							favoriteButton.find(".screenReaderContent").text(settings.buttons.favoriteText);
						}

						return false;
					});

					favoriteButton.parent().removeClass("hide").addClass("visible");
				}
			});
		}

		// Security button.
		if (container.find(".security").length > 0) {
			var securityButton = container.find(".security"),
				securityLink = securityButton.find("a");

			if (!settings.section.isPrivate) {
				// Public page.
				securityButton.removeClass("icon-lock").addClass("icon-lock-open");
				securityLink
					.prop("title", settings.buttons.publicPageText)
					.html("<span>" + settings.buttons.publicPageText + "</span>");
			}

			securityLink.unbind("click").click(function() {
				document.location.href = settings.section.cmsEditUrl + "#tab=securityTab";

				return false;
			});

			securityButton.removeClass("hide").addClass("visible");
		}

		// Follow / unfollow users
		container.find(".followUser, .followingUser").each(function()
		{
			var userId = $(this).closest(".item").data("userid"),
				userFirstName = $(this).closest(".item").find(".firstname").text();

			$(this).initializeUserFollowButtons(userId, userFirstName);
		});

		// Event buttons (yes, no, maybe, I don't know...).
		container.find(".attend input:button").each(function() {
			var eventButton = $(this).parent(),
				eventSectionID = settings.section.ID,
				eventID = -1,
				eventAttending = -1,
				eventAttendees = -1,
				eventRecurrenceID = 0; // 0 means no recurrence item e.g. the original event

			if (eventButton.data("event-section-id") != undefined)
				eventSectionID = eventButton.data("event-section-id");

			if (eventButton.data("event-id") != undefined) eventID = eventButton.data("event-id");

			if (eventButton.data("event-attend") != undefined) eventAttending = eventButton.data("event-attend");

			if (eventButton.data("event-attendees") != undefined) eventAttendees = eventButton.data("event-attendees");

			if (eventButton.data("event-recurrence-id") != undefined)
				eventRecurrenceID = eventButton.data("event-recurrence-id");
			else eventRecurrenceID = getUrlParameter("recurrenceID");

			if (eventID > 0 && settings.user.ID > 0 && eventAttending > -1) {
				// Reset.
				var attendingButtonsContainer = container.parents(".attendingButtonsContainer");
				attendingButtonsContainer.find(".eventButtons").addClass("hide");
				attendingButtonsContainer.find(".maxAttendingReached").addClass("hide");

				container
					.find(".accepted")
					.removeClass("accepted")
					.addClass("accept");
				container
					.find(".maybied")
					.removeClass("maybied")
					.addClass("maybe");
				container
					.find(".denied")
					.removeClass("denied")
					.addClass("deny");

				// Check if user is invited.
				$.ajax({
					type: "GET",
					url:
						"/api/events/iseventinvitee?sectionID=" +
						settings.section.ID +
						"&eventID=" +
						eventID +
						"&userID=" +
						settings.user.ID +
						(eventRecurrenceID != undefined ? "&recurrenceID=" + eventRecurrenceID : "") +
						"&token=" +
						$("input[name='__RequestVerificationToken']").val()
				}).done(function(data) {
					if (data) {
						// Initial state.
						$.ajax({
							type: "GET",
							url:
								"/api/events/getattendingstatus?eventID=" +
								eventID +
								"&userID=" +
								settings.user.ID +
								"&recurrenceID=" +
								(eventRecurrenceID != undefined ? eventRecurrenceID : "0") +
								"&token=" +
								$("input[name='__RequestVerificationToken']").val()
						})
							.done(function(data) {
								switch (data) {
									// Denied.
									case 0:
										container
											.find(".deny")
											.removeClass("deny")
											.addClass("denied");
										container
											.parent()
											.find(".screenReaderContent")
											.text(settings.events.screenReaderDenied);
										break;

									// Accepted.
									case 1:
										container
											.find(".accept")
											.removeClass("accept")
											.addClass("accepted");
										container
											.parent()
											.find(".screenReaderContent")
											.text(settings.events.screenReaderAccepted);
										break;

									// Maybied.
									case 2:
										container
											.find(".maybe")
											.removeClass("maybe")
											.addClass("maybied");
										container
											.parent()
											.find(".screenReaderContent")
											.text(settings.events.screenReaderMaybied);
										break;
								}

								// Show buttons.
								attendingButtonsContainer.find(".eventButtons").removeClass("hide").addClass("visible");
								attendingButtonsContainer.find(".maxAttendingReached").addClass("hide").removeClass("visible");
							})
							.fail(function() {
								$.fn.showError(settings.errors.generalErrorText + " (500.58)", "console");
							});
					} else {
						$.ajax({
							type: "GET",
							url:
								"/api/events/geteventattendingcount?eventId=" +
								eventID +
								"&recurrenceID=" +
								eventRecurrenceID +
								"&token=" +
								$("input[name='__RequestVerificationToken']").val()
						})
							.done(function(data) {
								if (data > -1 && eventAttendees > -1 && !(data < eventAttendees)) {
									attendingButtonsContainer.find(".eventButtons").addClass("hide").removeClass("visible");
									attendingButtonsContainer.find(".maxAttendingReached").removeClass("hide").addClass("visible");
								}
							})
							.fail(function() {
								$.fn.showError(settings.errors.generalErrorText + " (500.xx)", "console");
							});
					}
				});

				$(this)
					.unbind("click")
					.click(function() {
						var eventAttendAll = false;

						var sendAttendStatus = function() {
							$.ajax({
								url: "/api/events/attendevent",
								data: {
									sectionID: eventSectionID,
									eventId: eventID,
									eventAttending: eventAttending,
									eventRecurrenceID: eventRecurrenceID,
									all: eventAttendAll,
									token: $("input[name='__RequestVerificationToken']").val()
								}
							})
								.done(function(data) {
									data = JSON.parse(data);

									var result = JSON.parse(data[0]["Item2"]);

									// Reset.
									container
										.find(".accepted")
										.removeClass("accepted")
										.addClass("accept");
									container
										.find(".maybied")
										.removeClass("maybied")
										.addClass("maybe");
									container
										.find(".denied")
										.removeClass("denied")
										.addClass("deny");

									if (!result.maxAttendeesReached) {
										switch (result.attendingStatus) {
											case "No":
												// Deny.
												eventButton
													.parent()
													.find(".attend.deny")
													.removeClass("deny")
													.addClass("denied");
												container
													.parent()
													.find(".screenReaderContent")
													.text(settings.events.screenReaderDenied);
												break;

											case "Yes":
												// Accept.
												eventButton
													.parent()
													.find(".attend.accept")
													.removeClass("accept")
													.addClass("accepted");
												container
													.parent()
													.find(".screenReaderContent")
													.text(settings.events.screenReaderAccepted);
												break;

											case "Maybe":
												// Maybe.
												eventButton
													.parent()
													.find(".attend.maybe")
													.removeClass("maybe")
													.addClass("maybied");
												container
													.parent()
													.find(".screenReaderContent")
													.text(settings.events.screenReaderMaybied);
												break;
										}
									} else {
										var attendingButtonsContainer = container.parents(".attendingButtonsContainer");
										attendingButtonsContainer.find(".showEventAttendingButtons").addClass("hide").removeClass("visible");
										attendingButtonsContainer.find(".maxAttendingReached").removeClass("hide").addClass("visible");
									}

									// Update attendees count.
									if (!$(".overlayEvent .eventCounts").hasClass("alwaysHide"))
										$(".overlayEvent, #events.item").getEventAttendees({
											eventID: eventID,
											recurrenceID: eventRecurrenceID
										});
								})
								.fail(function() {
									$.fn.showError(settings.errors.generalErrorText + " (500.59)", "console");
								});
						};

						if ($(this).closest(".eventInformation.eventButtons").hasClass("has-recurrence"))
						{
							$(".overlayAttendAllOrSingle").removeClass("hide");
							$('.overlayAttendAllOrSingle .overlayItemTitle').focus();
						}
						else
							sendAttendStatus();

						$("#btnAttendAllRecurringEvents")
							.unbind("click")
							.on("click", function() {
								eventAttendAll = true;

								$(".overlayAttendAllOrSingle").addClass("hide");
								sendAttendStatus();
							});

						$("#btnAttendOnlyThisEvent")
							.unbind("click")
							.on("click", function() {
								$(".overlayAttendAllOrSingle").addClass("hide");
								sendAttendStatus();
							});

						return false;
					});
			}
		});

		// Sharing buttons.
		if (container.hasClass("share")) {
			container.find(".facebook a").attr("href", settings.section.facebookShareUrl);
			container.find(".linkedIn a").attr("href", settings.section.linkedInShareUrl);
			container.find(".twitter a").attr("href", settings.section.twitterShareUrl);
			container.find(".mail a").attr("href", settings.section.mailToFriendUrl);
			container.find(".rss a").attr("href", settings.section.rssFeedUrl);

			// AddThis button.
			container
				.find(".addThis a")
				.unbind("click")
				.click(function() {
					addthis_sendto("more");

					return false;
				});
		}
	}

	// Empty trash button.
	container.find(".emptyTrash input, .emptyTrash a").each(function() {
		var emptyTrashButton = $(this);

		emptyTrashButton.unbind("click").click(function() {
			// SectionID.
			var sectionID = settings.section.ID;

			if ($.fn.getQueryString("id") != "") sectionID = $.fn.getQueryString("id");

			if (emptyTrashButton.confirm(settings.warnings.emptyTrashText)) {
				// Loader.
				$(".trashWidget").html('<div class="loader show"></div>');

				$.ajax({
					url: "/api/contentpages/emptyTrashcan",
					data: {
						sectionID: sectionID,
						token: $("input[name='__RequestVerificationToken']").val()
					}
				})
					.done(function(data) {
						location.reload();
					})
					.fail(function() {
						$.fn.showError(settings.errors.emptyTrashErrorText + " (500.64)", "console");
					});

				return false;
			}
		});

		var trashWidget = new Widget($("#trashTabContent .mettWidget"));

		trashWidget.complete(function() {
			if ($(".noIndent").length == 0) {
				// Show button.
				emptyTrashButton.parent().removeClass("hide").addClass("visible");
				container.show();
			}
		});
	});

	// Load more items.
	container.find(".loadMore input, .loadMore a").each(function() {
		$(this)
			.parent(".button")
			.removeClass("hide");
	});

	container.find(".readMore").each(function() {
		if ($(this).find("input").length == 0 && $(this).find("a").length == 0)
			$(this).addClass("hide").removeClass("visible");
	});

	// Show more content button.
	container.find(".showMore a, .showMore input, a.showMore").each(function() {
		var button = $(this),
			buttonText = button.html(),
			buttonParent = button.parent(),
			moreContent = container.next(".more"),
			scrollToTop = false,
			hideButton = false;

		// Failover 1.
		if (moreContent.length == 0) moreContent = container.prev(".more");

		// Failover 2.
		if (moreContent.length == 0) moreContent = container.parent().find(".more");

		// Options.
		if (buttonParent.data("scroll-to-top") != undefined) scrollToTop = buttonParent.data("scroll-to-top");

		if (buttonParent.data("hide-after-toggle") != undefined) hideButton = buttonParent.data("hide-after-toggle");

		button.unbind("click").click(function() {
			if (moreContent.height() == 0) {
				// Show content.
				moreContent.stop(true).animate({ height: moreContent.find(".moreContent").height() }, 300);

				if (!hideButton) {
					if (button.hasClass("icon-down-open-big"))
						button.removeClass("icon-down-open-big").addClass("icon-up-open-big");

					if (button.parent().hasClass("icon-down-open-big"))
						button
							.parent()
							.removeClass("icon-down-open-big")
							.addClass("icon-up-open-big");

					button.html(
						buttonText.replace(
							settings.buttons.showText.toLowerCase(),
							settings.buttons.hideText.toLowerCase()
						)
					);
				} else buttonParent.addClass("hide").removeClass("visible");
			} else {
				// Hide content.
				moreContent.stop(true).animate({ height: 0, margin: 0 }, 150);

				if (button.hasClass("icon-up-open-big"))
					button.removeClass("icon-up-open-big").addClass("icon-down-open-big");

				if (button.parent().hasClass("icon-up-open-big"))
					button
						.parent()
						.removeClass("icon-up-open-big")
						.addClass("icon-down-open-big");

				button.html(
					buttonText.replace(settings.buttons.hideText.toLowerCase(), settings.buttons.showText.toLowerCase())
				);

				if (scrollToTop) {
					// Scroll to top.
					$("html, body")
						.stop(true)
						.animate({ scrollTop: $("#scrollTop").offset().top }, 150);
				}
			}

			return false;
		});
	});

	// Show overlay button.
	container.find(".showOverlay a, .showOverlay input").each(function() {
		var button = $(this);

		button.unbind("click").click(function() {
			$(".overlay").removeClass("hide");

			return false;
		});
	});

	// Drop down toggle button.
	container.find(".button.toggleDropDown").each(function() {
		var dropDownButton = $(this),
			dropDownMenu = dropDownButton.parent().find(".dropDown"),
			showDropDownMenu = true;

		// Replace ugly image buttons with links.
		dropDownMenu.find("input:image").each(function(i) {
			if (i == 0) {
				// Remove previously created links.
				dropDownMenu.find(".dropDownLink").remove();
			}

			var button = $(this),
				link = $("<a/>");

			link.prop("href", "/")
				.addClass("dropDownLink " + $(button).prop("class"))
				.html($(button).prop("title"))
				.unbind("click")
				.click(function() {
					button.click();

					return false;
				});

			// Add link to drop down.
			button.parent().append(link.removeClass("hide"));
		});

		// Settings link in drop down menu.
		dropDownMenu
			.find(".settings")
			.unbind("click")
			.click(function() {
				document.location.href = settings.section.cmsEditUrl + "#tab=optionsTab";

				return false;
			});

		// Don't show settings drop down in add/edit pages & CMS.
		if ((settings.section.isAdd || settings.section.isEdit) && dropDownMenu.find(".settings").length > 0)
			showDropDownMenu = false;

		// Click event for mobiles and tablets.
		if ($("html").hasClass("touch")) {
			dropDownButton.unbind("click").click(function () {
				var showDropDown = true;

				// Check if drop down is already visible.
				if (dropDownMenu.hasClass("show")) showDropDown = false;

				// Hide all drop downs.
				$(".dropDown").removeClass("show");

				if (showDropDown) {
					// Show this drop down.
					dropDownMenu.toggleClass("show");
				}

				return false;
			});
		}

		if (showDropDownMenu) dropDownButton.removeClass("hide").parent().parent().addClass("visible");
	});

	// Back to previous page.
	container.find(".backToPrevious a").each(function() {
		var backButton = $(this);

		backButton.unbind("click").click(function() {
			history.back();

			return false;
		});
	});

	if ($('html').hasClass('threedotfive'))
		updateToolbarWrappers();
};

function fetchFollowersData()
{
	var apiUrl = '',
		apiData = {};

	if (settings.section.itemID > 0)
	{
		apiUrl = '/api/notification/getcontentpagefollowerscount';
		apiData =
		{
			sectionID: settings.section.ID,
			contentPageID: settings.section.itemID,
			token: $("input[name='__RequestVerificationToken']").val()
		}
	}
	else
	{
		apiUrl = '/api/notification/getsectionfollowerscount';
		apiData =
		{
			sectionID: settings.section.ID,
			token: $("input[name='__RequestVerificationToken']").val()
		}
	}

	$.ajax(
	{
		url: apiUrl,
		data: apiData
	})
	.done(function(data)
	{
		updateFollowersInfo(data);
	});
}

function updateFollowersInfo(data)
{
	var followersButton = $('.button.followers');

	if (!data || $.trim(data) == '') return;

	data = JSON.parse(data);

	if (typeof data != 'object') return;

	// check if user is administrator or moderator
	if (settings.widgets.allowed)
	{
		if (followersButton.find('input').length == 0)
			followersButton.append('<input type="button" />');

		var followersButtonInput = followersButton.find('input'),
			followersCount = parseInt(data.followersCount);

		if (followersCount == 1)
			followersButtonInput.val('1 ' + settings.buttons.followerText).attr('title', '1 ' + settings.buttons.followerText);
		else if (followersCount == 0 || followersCount > 1)
			followersButtonInput.val(followersCount + ' ' + settings.buttons.followersText).attr('title', followersCount + ' ' + settings.buttons.followersText);

		followersButtonInput.unbind('click').click(function()
		{
			var apiUrl = '',
				apiData = {};

			if (settings.section.itemID > 0)
			{
				apiUrl = '/api/notification/getcontentpagefollowers';
				apiData =
				{
					sectionID: settings.section.ID,
					contentPageID: settings.section.itemID,
					token: $("input[name='__RequestVerificationToken']").val()
				}
			}
			else
			{
				apiUrl = '/api/notification/getsectionfollowers';
				apiData =
				{
					sectionID: settings.section.ID,
					token: $("input[name='__RequestVerificationToken']").val()
				}
			}

			$.ajax(
			{
				url: apiUrl,
				data: apiData
			})
			.done(function(data)
			{
				$('#followersOverlay .overlayItemContent .usersList').empty();

				data = JSON.parse(data);

				$.each(data, function(i)
				{
					var output = $('<div class="field lessMargin" />'),
						userLink = $('<a href="/shortcuts/users_showprofile.aspx?userkey=' + this.userId + '">' + this.userFullName + '</a>'),
						userCheckbox = $('<input type="checkbox" id="userCheckbox_' + this.userId + '" class="userCheckbox" data-id="' + this.userId + '" checked="checked" />'),
						userLabel = $('<label for="userCheckbox_' + this.userId + '">' + this.userFullName + '</label>'),
						userAvatar = $('<div class="noAvatar circle icon-user before" />');

					if (this.userImage != '')
						userAvatar = $('<img src="' + this.userImage + '?width=30&amp;height=30" class="avatar" />');

					userLink = userLink.attr('data-user-id', this.userId);
					userLabel = userLabel.attr('data-user-id', this.userId);

					output.append(userCheckbox).append(userLabel.prepend(userAvatar));

					output.append("<div class=\"clear\" />");

					$('#followersOverlay .overlayItemContent .usersList').append(output);
				});

				// User checkboxes.
				$('.userCheckbox').change(function()
				{
					var cb = $(this),
						cbStatus = $(this)[0].checked;

					$.ajax(
					{
						url: '/api/notification/SetNotification',
						data:
						{
							sectionID: settings.section.ID,
							contentPageID: settings.section.itemID,
							userKey: $(this).data('id'),
							status: cbStatus,
							token: $("input[name='__RequestVerificationToken']").val()
						}
					})
					.done(function(data)
					{
						if (cbStatus == false)
							cb.parent().find('label').addClass('disabledUser');
						else
							cb.parent().find('label').removeClass('disabledUser');
					});
				}).initializeSwitchery();

				$('#followersOverlay').showFollowersOverlay({ showOverlay: true });
				$('#followersOverlay').initializeFollowersOverlay();
			});
		});
	}
	else
	{
		var followersButtonLabel = $('<p />');

		if (data.followersCount == 1)
			followersButtonLabel.text('1 ' + settings.buttons.followerText);
		else if (data.followersCount == 0 || data.followersCount > 1)
			followersButtonLabel.text(data.followersCount + ' ' + settings.buttons.followersText);

		followersButton.empty();
		followersButton.append(followersButtonLabel);
	}

	followersButton.addClass('visible').removeClass('hide');

	if ($('html').hasClass('threedotfive'))
		updateToolbarWrappers();
}

function updateToolbarWrappers()
{
	$.each($('#toolbarTop .toolbarWrapper'), function()
	{
		var tWrapper = $(this);

		tWrapper.find('> *').removeClass('wrapper-first-child').removeClass('wrapper-last-child');

		tWrapper.find('> *.visible:first').addClass('wrapper-first-child');
		tWrapper.find('> *.visible:last').addClass('wrapper-last-child');
	});
}

$.fn.initializeUserFollowButtons = function(userId, userFirstName)
{
	// First load.
	var followButton = $(this),
		followButtonInput = $(this).find('input:button'),
		followCheckbox = followButton.parent().find("input:checkbox"),
		apiUrl = "",
		action = "";

	if (userId === settings.user.ID)
		$(followButton).remove();

	if (followCheckbox.length > 0)
	{
		// Follow.
		var follow = function()
		{
			followButton.removeClass("followingUser icon-check").addClass("followUser icon-bell");
			followButtonInput.val(settings.buttons.followText).attr("title", settings.buttons.followText);

			$(followButton).hover(
				function()
				{
					followButtonInput.val(settings.buttons.followText).attr("title", settings.buttons.followText);
					followButton.removeClass("icon-cancel").addClass("icon-check");
				},
				function()
				{
					followButtonInput.val(settings.buttons.followText).attr("title", settings.buttons.followText);
					followButton.removeClass("icon-cancel").addClass("icon-check");
				}
			);
		};

		// Following.
		var following = function()
		{
			followButton.removeClass("followUser icon-bell").addClass("followingUser icon-check");
			followButtonInput.val(settings.buttons.followingText).attr("title", settings.buttons.followingText);

			$(followButton).hover(
				function()
				{
					followButtonInput.val(settings.buttons.unFollowText).attr("title", settings.buttons.unFollowText);
					followButton.removeClass("icon-check").addClass("icon-cancel");
				},
				function()
				{
					followButtonInput.val(settings.buttons.followingText).attr("title", settings.buttons.followingText);
					followButton.removeClass("icon-cancel").addClass("icon-check");
				}
			);
		};

		// Check whether the user is followed...
		$.ajax({
			url: "/api/followers/isuserfollow",
			data: {
				userID: settings.user.ID,
				followedUserID: userId,
				token: $("input[name='__RequestVerificationToken']").val()
			}
		}).done(function(uData) {
			if (uData == true) {
				followCheckbox.attr("checked", "checked");

				following();
			}
		});

		followCheckbox.unbind("click").click(function() {
			if (followCheckbox.is(":checked")) {
				apiUrl = "/api/followers/setuserfollow";
				action = "follow";
			} else {
				apiUrl = "/api/followers/removeuserfollow";
				action = "unfollow";
			}

			$.ajax({
				url: apiUrl,
				data: {
					followedUserID: userId,
					token: $("input[name='__RequestVerificationToken']").val()
				}
			})
				.success(function() {
					if (action == "follow") {
						if (userFirstName !== "") {
							var message =
								"<h2>Je volgt vanaf nu " +
								userFirstName +
								"</h2><span>" +
								userFirstName +
								" krijgt hier een melding van en jij ontvangt notificaties van zijn/haar activiteiten.</span>";
						} else {
							var message =
								"<h2>Je volgt vanaf nu deze persoon.</h2><span>Hij/zij krijgt hier een melding van en jij ontvangt notificaties van zijn/haar activiteiten.</span>";
						}

						$("body").showMessage({ content: message, autoHideAfter: 6000 });
					}
				})
				.fail(function(jqXHR, textStatus, error) {
					$.fn.showError(arguments + ". (500.52)", "console");
				});
		});

		followButtonInput.unbind("click").click(function() {
			// Re-initialize checkbox after update.
			followCheckbox = followButton.find("input:checkbox");
			followCheckbox.click();

			if (followCheckbox.is(":checked")) following();
			else follow();
		});

		followButton.removeClass("hide");
	}
};

// Initialize tabs.
$.fn.initializeTabs = function() {
	var tabs = $(this),
		container = tabs.parents(".tabs");

	// Map tab.
	if ($(".map").length > 0 && $("#mapTab").hasClass("hide")) {
		$("#mapTab").removeClass("hide");
		tabs = $(".tabs .tab:not(.hide)");
	}

	if (tabs.length > 0) {
		// Default values.
		var selectedTab = $.fn.getAnchor("tab"),
			hideEmptyTabs = true,
			isMobile = $(".touch").length > 0,
			activeTabText = $("<span >");

		activeTabText.addClass("activeTabText");

		if (container.data("tabs-hide-empty") != undefined) hideEmptyTabs = container.data("tabs-hide-empty");

		if (container.hasClass("vertical")) activeTabText.html("<br />(" + settings.various.activeTabText + ")");
		else activeTabText.html(" (" + settings.various.activeTabText + ")");

		if (settings.showAddEditTabs || settings.section.isCMSAdd || settings.section.isCMSEdit) {
			var tabsContent = $(".tabContent"),
				previousTabButton = $(".button.previousTab"),
				nextTabButton = $(".button.nextTab");

			// Fix for back button in browser.
			var tabsInterval = setInterval(function() {
				if ($(".tabs").length > 0) {
					// Firefox fix. Sometimes this code overrides a real mouse click. Build in a skip once after click, so it works better.
					if (globals.justClicked) {
						globals.justClicked = false;

						return;
					}

					var currentAnchor = $.fn.getAnchor("tab");

					if (currentAnchor.length > 0) {
						// Ugly but effective to kill a Firefox bug. When using an if statement, FF will always execute the if AND else at this point... WEIRD!
						switch (currentAnchor) {
							case globals.currentTabID:
								break;

							default:
								$("#" + currentAnchor)
									.find("a")[0]
									.click();
								globals.currentTabID = currentAnchor;

								break;
						}
					}
				} else clearInterval(tabsInterval);
			}, 400);

			tabs.each(function(i) {
				var tab = $(this),
					tabContent = $("#" + tab.attr("id") + "Content"),
					harmonicaTabs = false;

				if (isMobile && tab.find(".tabContent").length == 0 && $.fn.viewport().width < 481) {
					// Make harmonica tabs.
					tab.append(tabContent);
					harmonicaTabs = true;

					$("#toolbarBottom").css("margin-top", "40px");
				}

				if (hideEmptyTabs && $.trim(tabContent.html()).length == 0) {
					// Hide empty tabs (optional).
					tab.addClass("hide");
				}

				tab.find("a")
					.unbind("click")
					.click(function() {
						var tabIsActive = false;
						globals.justClicked = true;
						globals.currentTabID = tab.prop("id");

						if (tab.hasClass("active")) tabIsActive = true;

						// Hide all tabs.
						tabs.removeClass("active");
						tabsContent.removeClass("active");

						if (settings.webGuidelines) tabs.find(".activeTabText").remove();

						if (harmonicaTabs) {
							if (!tabIsActive) {
								// Show clicked tab.
								tab.addClass("active");
								tabContent.addClass("active");

								// Scroll to tabs.
								$("html, body")
									.stop(true)
									.animate({ scrollTop: $(".tabs").offset().top - 200 }, 150);
							}
						} else {
							// Show clicked tab.
							tab.addClass("active");
							tabContent.addClass("active");

							if (settings.webGuidelines) tab.find("a").append(activeTabText);
						}

						// Map.
						if (tab.prop("id") == "mapTab" && selectedTab != "mapTab") {
							// Re-initialize maps (solves hidden container problems).
							if (typeof initializeGoogleMaps == "function") initializeGoogleMaps();

							if (typeof initializeAtriumMaps == "function") {
								setTimeout(function() {
									initializeAtriumMaps();
								}, 1000);
							}
						}

						// Re-initialize Plupload (solves hidden container problems on mobile devices).
						if (
							isMobile &&
							$(".uploader").length > 0 &&
							(tab.prop("id") == "imageTab" ||
								tab.prop("id") == "imagesTab" ||
								tab.prop("id") == "filesTab" ||
								tab.prop("id") == "mediaTab")
						)
							$(".uploader").initializePlupload();

						if (!isMobile) {
							// Show or hide previous tab button.
							if (previousTabButton != undefined) {
								if (i > 0) {
									previousTabButton.find("input:button").val(
										$.trim(
											tabs
												.eq(i - 1)
												.find("a")
												.html()
												.replace("&amp;", "&")
										)
									);
									previousTabButton.removeClass("hide");
									previousTabButton.parents(".toolbar.paging").show();
								} else previousTabButton.addClass("hide");
							}

							// Show or hide next tab button.
							if (nextTabButton != undefined) {
								if (i < tabs.length - 1) {
									if (!tabs.eq(i + 1).hasClass("hide")) {
										nextTabButton.find("input:button").val(
											$.trim(
												tabs
													.eq(i + 1)
													.find("a")
													.html()
													.replace("&amp;", "&")
											)
										);
										nextTabButton.removeClass("hide");
										nextTabButton.parents(".toolbar.paging").show();
									} else nextTabButton.addClass("hide");
								} else nextTabButton.addClass("hide");
							}
						}

						selectedTabID = i;

						// Put selected tabID in hidden field if available (edit section).
						$("#tabID").val(
							$(".tab")
								.eq(selectedTabID)
								.prop("id")
						);

						// Set focus to current tabContent, first focusable item.
						tabContent.find(':focusable').eq(0).focus();
					});

				// Badge count.
				if (tab.find(".badge").length > 0) {
					if (tabContent.find(".badgeCount").length > 0)
						tab.find(".badge")
							.html(tabContent.find(".badgeCount").length)
							.removeClass("hide");
				}
			});

			// Previous tab button.
			if (previousTabButton != undefined) {
				previousTabButton
					.find("input:button")
					.unbind("click")
					.click(function() {
						if (selectedTabID > 0) {
							// Go to previous tab.
							tabs.eq(selectedTabID - 1)
								.find("a")[0]
								.click();

							// Scroll back.
							$("html, body")
								.stop(true)
								.animate(
									{ scrollTop: $("#" + tabs.eq(selectedTabID).attr("id")).offset().top - 200 },
									150
								);
						}
					});
			}

			// Next tab button.
			if (nextTabButton != undefined) {
				nextTabButton
					.find("input:button")
					.unbind("click")
					.click(function(i) {
						if (selectedTabID < tabs.length - 1) {
							// Go to next tab.
							tabs.eq(selectedTabID + 1)
								.find("a")[0]
								.click();

							// Scroll back.
							$("html, body")
								.stop(true)
								.animate(
									{ scrollTop: $("#" + tabs.eq(selectedTabID).attr("id")).offset().top - 200 },
									150
								);
						}
					});
			}

			// Only show tabs if there are tabs to show.
			if ($(".tab").not(".hide").length > 0) {
				$(".tabsTitle").removeClass("hide");

				if ($.fn.viewport().width > 480) {
					// Select tab by anchor.
					if (selectedTab.length > 0 && $("#" + selectedTab).length > 0) {
						// Click selected tab.
						$("#" + selectedTab)
							.not(".hide")
							.find("a")[0]
							.click();
					} else {
						// Click first tab.
						$(".tab:not(.hide)")
							.find("a")
							.each(function(i) {
								if (i == 0) $(this)[0].click();
								else return false;
							});
					}
				}
			} else container.addClass("hide");
		} else {
			// Hide tabs and show all content.
			$(".tab, .toolbar.paging").addClass("hide");
			$(".tabs")
				.find(".tabContent")
				.prop("class", "");
		}
	}

	// Tab count.
	if (settings.webGuidelines && $(".tabCount").length > 0) {
		var tabCount = $(".tab").not(".hide").length + 1;

		if (tabCount == 1) $(".tabCount").html(tabCount + " " + settings.various.stepText.toLowerCase());
		else $(".tabCount").html(tabCount + " " + settings.various.stepsText.toLowerCase());
	}
};

// Initialize shortcuts.
$.fn.initializeShortcuts = function(options) {
	var defaults = {
		showFlags: false,
		countryCodes: [],
		languageRootPaths: []
	};

	var options = $.extend(defaults, options),
		container = $(this),
		favoritesWidget = null;

	if (container.length > 0) {
		if (settings.user.ID != -1) {
			// Profile & avatar.
			if (container.find("img.avatar").length == 0) {
				// No avatar.
				container.find(".noAvatar").removeClass("hide");
			}

			// Profile.
			$("#shortcuts .avatar, #shortcuts .profile")
				.unbind("click")
				.click(function() {
					var shortcut = $(this),
						dropDownMenu = shortcut.parent().find(".dropDown"),
						allDescenants = shortcut.parent().find("*");

					if (dropDownMenu.hasClass("show")) {
						// Hide.
						shortcut.removeClass("active").attr('aria-expanded', 'false');
						dropDownMenu.removeClass("show");

						allDescenants.unbind("blur");
					} else {
						// Hide all other drop downs.
						$("#mainMenu a.arrow")
							.removeClass("icon-up-open-big")
							.addClass("icon-down-open-big");
						$(".dropDown").removeClass("show");
						$(".shortcut").removeClass("active");

						// Show this drop down.
						shortcut.addClass("active").attr('aria-expanded', 'true');
						dropDownMenu.addClass("show");

						allDescenants.unbind("blur").blur(function () {
							setTimeout(function () {
								if (!$.contains(shortcut.parent()[0], $(":focus")[0]) && dropDownMenu.hasClass("show")) {
									shortcut.click();
								}
							}, 40);
						});
					}

					return false;
				});

			// Favorites.
			if (container.find(".favorites").length > 0) {
				container
					.find(".favorites")
					.unbind("click")
					.click(function() {
						var shortcut = $(this),
							dropDownContent = shortcut.parent().find(".dropDown.favoritesContent"),
							allDescenants = shortcut.parent().find("*");

						if (shortcut.hasClass('active'))
							shortcut.attr('aria-expanded', 'true');

						if (!dropDownContent.hasClass("show")) {
							if (favoritesWidget == null) {
								// Create new favorites widget.
								favoritesWidget = new Widget(dropDownContent.find(".mettWidget").removeClass("wait"));
							} else {
								// Load new favorites.
								favoritesWidget.loadData();
							}

							// Hide all other drop downs.
							$("#mainMenu a.arrow")
								.removeClass("icon-up-open-big")
								.addClass("icon-down-open-big");
							$(".dropDown").removeClass("show");
							$(".shortcut").removeClass("active");

							// Show drop down.
							shortcut.addClass("active").attr('aria-expanded', 'true');
							dropDownContent.addClass("show").removeClass('hide');

							allDescenants.unbind("blur").blur(function () {
								setTimeout(function () {
									if (!$.contains(shortcut.parent()[0], $(":focus")[0])) {
										shortcut.click();
									}
								}, 40);
							});
						} else {
							// Hide.
							shortcut.removeClass("active").attr('aria-expanded', 'false');
							dropDownContent.removeClass("show").addClass('hide');

							// Reset.
							allDescenants.unbind("blur");
						}

						return false;
					});

				$.ajax({
					url: "/api/notification/HasFavorites",
					data:
					{
						userID: settings.user.ID,
						token: $("input[name='__RequestVerificationToken']").val()
					}
				}).done(function(data)
				{
					if (data)
					{
						// Show favorites.
						container.find(".favorites").parent().removeClass("hide");
					}
				});
			}
		}

		// Flags.
		if (options.showFlags && options.countryCodes != undefined)
		{
			var flagsDropdown = null;

			if (options.countryCodes.length > 2)
			{
				flagsDropdownContainer = $('<div />');
				flagsDropdownContainer.addClass('languagePicker dropDownMenu');
				flagsDropdown = $('<ul />');
				flagsDropdown.addClass('dropDown');
			}

			$.each(options.countryCodes, function(i, value)
			{
				var language,
					linkLabel;

				switch (value.toLowerCase())
				{
					case "nl":
						language = "nederlands";
						imgName = 'dutch';
						linkLabel = settings.various.dutchLangSwitchText;
						break;

					case "en":
						language = "english";
						imgName = 'english';
						linkLabel = settings.various.englishLangSwitchText;
						break;

					case "de":
						language = "deutsch";
						imgName = 'german';
						linkLabel = settings.various.germanLangSwitchText;
						break;

					case "ro":
						language = "română";
						imgName = 'romanian';
						linkLabel = settings.various.romanianLangSwitchText;
						break;

					case "pl":
						language = "polski";
						imgName = 'polish';
						linkLabel = settings.various.polishLangSwitchText;
						break;

					case "es":
						language = "español";
						imgName = 'spanish';
						linkLabel = settings.various.spanishLangSwitchText;
						break;

					case "bg":
						language = "български";
						imgName = 'bulgarian';
						linkLabel = settings.various.bulgarianLangSwitchText;
						break;

					case "cn":
						language = "漢語";
						imgName = 'chinese';
						linkLabel = settings.various.chineseLangSwitchText;
						break;

					case "ua":
						language = "Українська";
						imgName = 'ukrainian';
						linkLabel = settings.various.ukrainianLangSwitchText;
						break;

					case "ru":
						language = "Русский";
						imgName = 'russian';
						linkLabel = settings.various.russianLangSwitchText;
						break;
				}

				if (container.find(".shortcut.flag." + language).length == 0)
				{
					// Create flag.
					var flagContainer = $("<li />"),
						flagLink = $("<a />").attr('aria-label', linkLabel).prop("href", "#").addClass("shortcut flag " + language).html('<span>' + language + '</span>'),
						flagImage = $("<img />").attr('alt', linkLabel).prop("src", "/communities/common/themes/mett%20responsive/images/various/flag_" + imgName + ".png"),
						flag = flagLink.prepend(flagImage);

					if (options.languageRootPaths[i] != undefined)
					{
						flagLink.prop("href", options.languageRootPaths[i]);

						var lang = options.languageRootPaths[i].split('/')[1];

						if (globals.url.indexOf('/' + lang + '/') > -1)
							flagContainer.addClass('active');
					}

					if ($('html').hasClass('mobile'))
					{
						if ($('#top .shortcutsContainer').length === 0)
						{
							var shortcutsContainer = $('<div />');
							shortcutsContainer.addClass('shortcutsContainer');

							$('#top').prepend(shortcutsContainer);
						}
					}

					// Append flag.
					if (options.countryCodes.length > 2)
					{
						flagContainer.append(flag);

						if (flagContainer.hasClass('active'))
						{
							flagsDropdownContainer.prepend(flagContainer.clone());
							flagsDropdownContainer.find('> li.active a').prop('href', '#');
						}

						flagsDropdown.append(flagContainer);
					}
					else
					{
						if ($('html').hasClass('mobile'))
						{
							if ($('.shortcutsContainer .flagsWrapper').length === 0)
							{
								var flagsWrapper = $('<div />');
								flagsWrapper.addClass('flagsWrapper');
								$('.shortcutsContainer').append(flagsWrapper);
							}

							$('.flagsWrapper').append(flagContainer.addClass('flag').append(flag));
						}
						else
						{
							if ($('#shortcuts .field.search').length > 0)
								flagContainer.addClass('flag').append(flag).insertBefore($("#shortcuts").find(".field.search"));
							else
								$('#shortcuts').append(flagContainer.addClass('flag').append(flag));
						}
					}

					flagLink.unbind("click").click(function()
					{
						if (settings.user.ID != -1)
						{
							var flagLinkSpan = flagLink.find('span');

							flagLink.addClass('loader');
							flagLinkSpan.text(flagLinkSpan.text() + ' ' + settings.various.loadingText);
							flagLink.blur();

							$.ajax(
							{
								url: "/api/user/SetUserLanguage",
								data:
								{
									countryCode: value,
									token: $("input[name='__RequestVerificationToken']").val()
								}
							}).always(function(data)
							{
								if (options.languageRootPaths[i] == undefined) {
									document.location.reload();
									return;
								}

								document.location.href = options.languageRootPaths[i];
							});

							return false;
						}
					});
				}
			});

			if (options.countryCodes.length > 2)
			{
				if (flagsDropdownContainer.find('> li.active').length === 0)
					flagsDropdownContainer.append(flagsDropdown.find('li:eq(0)').clone().addClass('active'));

				flagsDropdownContainer.find('> li.active').append(flagsDropdown);

				if ($('html').hasClass('mobile'))
					$('#top .shortcutsContainer').append(flagsDropdownContainer);
				else
				{
					if ($('#shortcuts .field.search').length > 0)
						flagsDropdownContainer.insertBefore($("#shortcuts").find(".field.search"));
					else
						$('#shortcuts').append(flagsDropdownContainer);
				}

				flagsDropdownContainer.find('> li.active > a').unbind('click').on('click', function()
				{
					var dropDownMenu = $(this).parent().find('.dropDown');

					if (dropDownMenu.hasClass('show'))
						dropDownMenu.removeClass('show').removeAttr('aria-expanded');
					else
						dropDownMenu.attr('aria-expanded', 'true').addClass('show');

					return false;
				});
			}
		}

		// Cookie settings.
		container.find(".shortcut.cookieSettings").unbind("click").click(function()
		{
			$("#cookieSettingsOverlay").initializeCookieSettingsOverlay({ showOverlay: true });
		});
	}
};

// Initialize search.
$.fn.initializeSearch = function()
{
	var container = $(this);

	if (container.find("input:text").length > 0)
	{
		// Skip link.
		$("#skipLinkSearchField").click(function()
		{
			container.find("input:text:last").focus();

			return false;
		});

		container.find('input:text').blur(function()
		{
			hideSearchInfoContainer();
		});

		container.find('input:text').on('input', function()
		{
			hideSearchInfoContainer();
		});

		container.each(function()
		{
			var searchField = $(this).find("input:text"),
				submitButton = $(this).find("a:first, input:submit, input:button");

			// Default text.
			if (searchField.val() == "")
				searchField.val(settings.fields.searchFieldText);

			// Submit button.
			if (!submitButton.parent().hasClass("button")) {
				submitButton.addClass("icon-search before");
				submitButton.attr("role", "button");
			}

			if (container.selector == "#top .search")
			{
				submitButton.unbind("click").click(function()
				{
					var searchInfoContainer = $('#searchInfoContainer'),
						searchInfoContainerText = '<span class="searchInfoText">' + settings.liveSearch.minimumSearchLengthText.replace('{0}', settings.liveSearch.minimumSearchLength) + '</span>';;

					if ((searchField.val() == settings.fields.searchFieldText || searchField.val().length < 3) && !searchField.is("#users .search input")) {
						searchInfoContainer.parent().css('overflow', 'visible');
						searchInfoContainer.stop().css({ opacity: 1, left: 0 });
						searchInfoContainer.find('.closeButton').attr('tabindex', 0);

						if (searchInfoContainer.find('.searchInfoText').length === 0)
							searchInfoContainer.prepend(searchInfoContainerText);

						return false;
					} else {
						var encodedInput = encodeURIComponent(searchField.val());
						document.location.href = "/shortcuts/search_search.aspx?search=" + encodedInput;

						hideSearchInfoContainer();
					}
				});
			}

			// Enter action.
			searchField.submitOnEnter();
		});
	}
	else
	{
		$("#skipLinkSearchField").remove();
	}
};

function hideSearchInfoContainer() {
	var searchInfoContainer = $('#searchInfoContainer');

	searchInfoContainer.stop().css({ opacity: 0, left: '100vw' });
	searchInfoContainer.find('.closeButton').attr('tabindex', -1);
	searchInfoContainer.find('.searchInfoText').remove();
}

// Initialize login.
$.fn.initializeLogin = function()
{
	var container = $(this);

	if (container.length > 0)
	{
		// Focus on email field or SSO button.
		setTimeout(function()
		{
			if (container.find(".ssologin").length > 0) {
				container.find(".ssologin input:button").focus();
			}
			else {
				container.find(".email input:text").focus();
			}
		}, 500);

		container.find(".email input:text").blur(function()
		{
			if (
				$(this).val().length > 0 &&
				$(this)
					.val()
					.toLowerCase()
					.indexOf("@mett.nl") > -1
			)
				container.find(".staySignedIn").addClass("hide");
			else
				container.find(".staySignedIn").removeClass("hide");
		});

		// Added on submit check because pass management tool will reset the checkboxes sometimes
		container.parents("form").submit(function()
		{
			if (container.find(".email input:text").val().toLowerCase().indexOf("@mett.nl") > -1)
				container.find(".staySignedIn input:checkbox").prop("checked", false).initializeSwitchery();
		});

		container.find(".password input:password").submitOnEnter();
	}
};

// Initialize errors.
$.fn.initializeErrors = function()
{
	var errors = $(this);

	// Prevent flickering empty error message with Web guidelines enabled.
	$(".errorMessage").css("visibility", "visible");

	errors.each(function()
	{
		var error = $(this),
			errorField = error.parents(".field"),
			showError = false,
			describedInputs = errorField.find("[aria-describedby]:not(.described)");

		if (errorField.length > 0)
		{
			describedInputs.each(function () {
				var currentDescribedInput = $(this);
				var targetInput = currentDescribedInput;

				if (currentDescribedInput.is("span"))
					targetInput = currentDescribedInput.find("input:first");

				targetInput.data("describedby", currentDescribedInput.attr("aria-describedby"));
				targetInput.addClass("described");

				currentDescribedInput.removeAttr("aria-describedby");
			});

			// Date/time select & captcha error.
			if (
				!error.hasClass("date") &&
				(errorField.hasClass("dateSelect") ||
					errorField.hasClass("dateTimeSelect"))
			)
				showError = true;

			// Add comment error.
			if (errorField.parent(".commentField").length > 0 && typeof error.attr("style") == "undefined")
				showError = true;

			// Other errors.
			if (
				typeof error.attr("style") != "undefined" &&
				error.attr("style").length > 0 &&
				(error.attr("style").indexOf("visible") > -1 ||
					error.attr("style").indexOf("block") > -1 ||
					error.attr("style").indexOf("inline") > -1)
			)
				showError = true;

			// Show error.
			if (showError)
			{
				var inputsToDescribe = errorField.find(".described");

				errorField.addClass("danger");

				inputsToDescribe.each(function () {
					var currentInputToDescribe = $(this),
						errorLabelIds = currentInputToDescribe.data("describedby").split(" "),
						describedByValue = "";

					for (i = 0; i < errorLabelIds.length; i++)
					{
						if ($("#" + errorLabelIds[i]).css("visibility") == "visible") {
							describedByValue += " " + errorLabelIds[i];
						}
					}

					currentInputToDescribe.attr("aria-describedby", $.trim(describedByValue));
				});

				errorField.find("input:text, input:password, textarea").keydown(function()
				{
					inputsToDescribe.removeAttr("aria-describedby");
					errorField.removeClass("danger");
				});

				errorField.find("select").change(function()
				{
					inputsToDescribe.removeAttr("aria-describedby");
					errorField.removeClass("danger");
				});
			}
		}
	});
};

// Initialize comments.
$.fn.initializeComments = function()
{
	var container = $(this);

	if (container.length > 0)
	{
		if (typeof CKEDITOR !== "undefined")
		{
			CKEDITOR.on("instanceReady", function(evt)
			{
				$("#addComment .editor iframe").contents().find("body").text("");

				$("#addComment .editor label").unbind("click").on("click", function()
				{
					for (instance in CKEDITOR.instances)
					{
						var editor = CKEDITOR.instances[instance];
						if (editor)
							editor.focus();
					}
				});
			});
		}

		if ($(".comment.edit").length > 0)
		{
			// Hide add comment when in comment edit mode.
			$("#addCommentContent").addClass("hide");
			$(".commentsSplitView").removeClass("hide");
			$("#commentsList").css("margin-top", 0);
		}
		else
		{
			// Show add comment after comment edit mode.
			$("#addCommentContent").removeClass("hide");

			var commentAuthorField = container.find(".commentAuthor input");

			// Author.
			if (commentAuthorField.length > 0 && $(".captcha.danger").length == 0)
			{
				commentAuthorField.val("");

				$("#addCommentContent .commentFieldEditor label").removeClass("hide");
			}

			// Split view (yes/no voting comments).
			if ($(".commentsSplitView").length > 0)
			{
				var voteCommentFieldsWrapper = $("<div />").addClass("field splitComments"),
					voteYesCommentField = $('<div />').addClass('voteYesCommentField'),
					voteNoCommentField = $('<div />').addClass('voteNoCommentField'),
					voteCommentTextareaLabel = $('<strong class="voteYesCommentLabel">' + settings.fields.voteYesFieldText + '</strong>'),
					voteCommentTextarea = $("<textarea />").attr('id', 'voteYesComment').addClass("voteYesComment"),
					voteCommentButton = $("<div />").addClass("button voteYesCommentButton info icon-comment before"),
					voteCommentButtonInput = $("<input />").attr("type", "button").val(settings.buttons.addCommentText);

				// Hide default textarea and submit button.
				container.find(".commentFieldEditor .field:not(.splitComments, .captcha), .commentFieldEditor #saveComment").addClass("hide");

				// Append fields.
				voteCommentButton.append(voteCommentButtonInput);
				voteCommentFieldsWrapper.append(voteYesCommentField);
				voteCommentFieldsWrapper.append(voteNoCommentField);
				voteYesCommentField.append(voteCommentTextareaLabel);
				voteYesCommentField.append(voteCommentTextarea);
				voteNoCommentField.append(voteCommentTextareaLabel.clone().removeClass('voteYesCommentLabel').addClass('voteNoCommentLabel').text(settings.fields.voteNoFieldText));
				voteNoCommentField.append(voteCommentTextarea.clone().removeClass("voteYesComment").addClass("voteNoComment").attr('id', 'voteNoComment'));
				container.find(".commentFieldEditor").prepend(voteCommentFieldsWrapper);
				container.find(".commentFieldEditor .toolbar").append(voteCommentButton);
				container.find(".commentFieldEditor .toolbar").append(voteCommentButton.clone().removeClass("voteYesCommentButton").addClass("voteNoCommentButton")
				);

				// Mobile "no-split-view".
				if ($.fn.viewport().width < 480) {
					// Small "hacks" to create acceptable mobile view.
					$(".commentsSplitView").addClass("mobileNoSplitView");

					voteYesCommentField.append($(".voteYesCommentButton").css("margin", "20px 0 40px 0"));
					voteNoCommentField.append($(".voteNoCommentButton").css("margin-top", "20px"));

					var yesVoteCommentsTitle = $("<h2 />");
					var noVoteCommentsTitle = $("<h2 />");

					yesVoteCommentsTitle.html(settings.eparticipation.yesVoteCommentsText);
					noVoteCommentsTitle.html(settings.eparticipation.noVoteCommentsText);

					$(".comment[data-type=VoteYes]:first").prepend(yesVoteCommentsTitle);
					$(".comment[data-type=VoteNo]:first").prepend(noVoteCommentsTitle);
				}

				// Place yes/no vote comment in default comment field.
				container.find(".voteYesCommentButton, .voteNoCommentButton").unbind("click").click(function()
				{
					var voteCommentText = container.find(".voteYesComment").val(),
						voteCommentText = $('#cke_voteYesComment iframe').contents().find('body').html(),
						voteCommentType = 1;

					if ($(this).hasClass("voteNoCommentButton"))
					{
						voteCommentText = $('#cke_voteNoComment iframe').contents().find('body').html();
						voteCommentType = 2;
					}

					var targetEditor = container.find('div[id*="_ckeditor"]');
					if (targetEditor.length > 0 && targetEditor.attr('id')) {
						var editorName = targetEditor.attr('id').replace('cke_', '');

						if (CKEDITOR.instances[editorName])
							CKEDITOR.instances[editorName].setData(voteCommentText);
					}

					container.find(".commentType").val(voteCommentType);
					setTimeout(function () {
						container.find("#saveComment input:submit").click();
					}, 200);
				});

				// Show split fields.
				$(".commentsSplitView").removeClass("hide");
			}

			// Comment field(s).
			container.find(".commentFieldEditor textarea").each(function()
			{
				CKEDITOR.replace($(this).attr('id'),
				{
					customConfig: '/CKEditor/config_comments.js'
				});
			});

			// Save comment (without files).
			container.find(".button.saveWithoutHandler input:submit").unbind("click").on('click', function()
			{
				var authorNameIsValid = true;

				// Check if author name field is present
				if ($(".commentAuthor input").length > 0)
				{
					var authorName = $(".commentAuthor input").val();

					var regEx = /<script[\s\S]*?>[\s\S]*?<\/script>|<\/script>|\/\/--|String.fromCharCode([\s\S]*?)|onload=|onerror=/gi;

					authorNameIsValid = (authorName.match(regEx) == null);
				}

				if (!authorNameIsValid || $.fn.CKEditorContainsXSSVulnerability())
				{
					// Error.
					$.fn.showError(settings.errors.pageSaveErrorText + " (500.7)");

					return false;
				}
				else
				{
					var errors = [];

					if ($('#addComment .editor iframe').contents().find('body').text() == "")
						errors.push(settings.errors.noCommentText + " (500.24)");

					if (!$.fn.mettHCaptchaIsValid())
						errors.push(settings.errors.invalidHCaptchaText + " (500.106)");

					if (errors.length > 0)
					{
						$.fn.showError(errors.join("<br />"));

						return false;
					}
				}
			});

			// Comments.
			$(".comment").each(function()
			{
				var comment = $(this),
					avatar = comment.find(".commentImage");

				// Avatars.
				if (avatar.find("img").length > 0)
				{
					avatar.addClass("hasAvatar");
					avatar.find(".noAvatar").addClass("hide");
				}
			});

			// Anonymous comment toggle.
			container.find(".toggleAnonymousComment input:checkbox").unbind("change").change(function() {
				if (container.find(".button.showMore").length > 0)
				{
					if ($(this).is(":checked")) {
						// Hide file upload (no anonymous upload allowed).
						container.find(".button.showMore, .more").addClass("hide");

						// Skip handler and do old school submit.
						container.find(".button.save input:button").remove();
						container.find(".button.save input:submit").removeClass("hide");
					}
					else {
						// Reset.
						container.find(".button.save input:submit").removeClass("submitButton");
						container.find(".button.showMore, .more").removeClass("hide");

						// Re-init save with handler.
						container.find(".button.save").initializeSave();
					}
				}

				if ($(this).is(":checked"))
					container.find(".commentAuthorCurrent .strong").text(settings.fields.commentNameText);
				else
					container.find(".commentAuthorCurrent .strong").text(settings.user.fullName);

				// Toggle current username, name/email container.
				container.find(".containerToggle input:checkbox").change();
			});

			// Alternative name.
			container.find(".commentAuthor input:text").unbind("blur").blur(function() {
				if ($.trim($(this).val()) != "") {
					container.find(".commentAuthorCurrent .strong").text($.trim($(this).val()));
				} else {
					container.find(".commentAuthorCurrent .strong").text(settings.fields.commentNameText);
				}
			});

			// Init.
			container.find(".toggleAnonymousComment input:checkbox").prop("checked", false);
			container.find(".commentAuthorCurrent .strong").text(settings.user.fullName);
		}
	}
};

// Initialize save.
$.fn.initializeSave = function()
{
	var container = $(this);

	container.each(function()
	{
		var button = $(this),
			validationGroup = "",
			handler = "",
			pluploadSubmit = false,
			pluploadRequired = false;

		// Validation group.
		if (button.data("save-validationgroup") != undefined)
			validationGroup = button.data("save-validationgroup");

		// Handler.
		if (button.data("save-handler") != undefined)
			handler = button.data("save-handler");

		// Plupload.
		if (button.data("save-plupload-submit") != undefined)
			pluploadSubmit = button.data("save-plupload-submit");

		if (button.data("save-plupload-required") != undefined)
			pluploadRequired = button.data("save-plupload-required");

		// Handler or Plupload.
		if (button.find(".submitButton").length == 0)
		{
			if (handler != "" || (pluploadSubmit && $(".uploader").length > 0))
			{
				// Add dummy submit button when using handler or Plupload.
				var submitButton = $('<input type="button" />');

				if (button.find("input").length > 0)
				{
					button.find("input:last").addClass("submitButton hide");
					submitButton.val(button.find("input:last").val());
				}
				else
				{
					button.find("a:last").addClass("submitButton hide");
					submitButton.val(button.find("a:last").html());
				}

				button.prepend(submitButton);
			}
		}

		// Unbind previous clicks (only for buttons generated by initializeSave function).
		if (button.find("input:first, a:first").prop("onclick") == null)
			button.find("input:first, a:first").unbind("click");

		// Save button.
		var saveInput = button.find("input:first, a:first");

		saveInput.click(function()
		{
			if ($.fn.CKEditorContainsXSSVulnerability())
			{
				// Error.
				$.fn.showError(settings.errors.pageSaveErrorText + " (500.7)");

				return false;
			}
			else
			{
				// Save.
				$(this).save({
					validationGroup: validationGroup,
					handler: handler,
					pluploadRequired: pluploadRequired
				});
			}
		});
	});
};

// Initialize password checker.
$.fn.initializePasswordCheck = function()
{
	var minimumLength = 8,
		minimumStrength = 4,
		maximumStrength = 5;

	$(this).each(function()
	{
		var passwordField = $(this),
			passwordInput = passwordField.find("input"),
			passwordToggle = passwordField.find(".passwordToggle");

		if (passwordInput.parent().hasClass("passwordRequirements"))
		{
			var characterCountRequirement = $(".characterRule"),
				capitalCountRequirement = $(".capitalRule"),
				numberCountRequirement = $(".numberRule"),
				specialCharacterRequirement = $(".specialCharacterRule");

			passwordInput.keyup(function(event)
			{
				var password = $(this).val(),
					strength = getPasswordStrength(password, minimumLength),
					charactersLeft = password.length > minimumLength ? 0 : minimumLength - password.length;

				// Reset (unless <tab> is pressed)
				if (event.which != 9)
				{
					characterCountRequirement.removeClass("danger success");
					capitalCountRequirement.removeClass("danger success");
					numberCountRequirement.removeClass("danger success");
					specialCharacterRequirement.removeClass("danger success");
					passwordField.removeClass("danger success");
				}

				// Requirements feedback.
				if (password.length > 0)
				{
					// Minimum length.
					if (strength.hasMinimumLength)
						characterCountRequirement.addClass("success");

					// Contains capital.
					if (strength.hasCapital)
						capitalCountRequirement.addClass("success");

					// Contains number.
					if (strength.hasNumber)
						numberCountRequirement.addClass("success");

					// Contains special caracter.
					if (strength.hasSpecialCharacter)
						specialCharacterRequirement.addClass("success");
				}

				// Length feedback.
				passwordField.find(".passwordCharacters").html(charactersLeft);
				passwordField.find(".charactersLeft").removeClass("hide");
			});

			passwordInput.blur(function()
			{
				var password = $(this).val(),
					strength = getPasswordStrength(password, minimumLength),
					passwordOk = true;

				if (passwordInput.hasClass("cancelBlur"))
				{
					passwordInput.removeClass("cancelBlur");

					return;
				}

				// Requirements feedback.
				if (password.length > 0)
				{
					// Minimum length.
					if (!strength.hasMinimumLength)
					{
						characterCountRequirement.addClass("danger");
						passwordOk = false;
					}

					// Contains capital.
					if (!strength.hasCapital)
					{
						capitalCountRequirement.addClass("danger");
						passwordOk = false;
					}

					// Contains number.
					if (!strength.hasNumber)
					{
						numberCountRequirement.addClass("danger");
						passwordOk = false;
					}

					// Contains special caracter.
					if (!strength.hasSpecialCharacter)
					{
						specialCharacterRequirement.addClass("danger");
						passwordOk = false;
					}
				}

				// Password not strong enough.
				if (!passwordOk)
				{
					// Crappy Firefox needs a timeout...
					setTimeout(function()
					{
						passwordInput.focus();
					}, 0);

					passwordInput.parent().addClass("danger");
				}
			});
		}

		passwordField.initializePasswordVisibilityToggle();
	});

	function getPasswordStrength(password, minimumLength)
	{
		var strength = {};
		strength.score = 0;
		strength.hasMinimumLength = false;
		strength.hasCapital = false;
		strength.hasNumber = false;
		strength.hasSpecialCharacter = false;

		// Password length > minimum length = strength +1.
		if (password.length < minimumLength)
			strength.score += password.length / minimumLength;
		else
		{
			strength.score += 1;
			strength.hasMinimumLength = true;
		}

		// Password contains uppercase character.
		if (password.match(/([A-Z])/))
			strength.hasCapital = true;

		// Password contains uppercase + lowercase characters = strength + 1.
		if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
			strength.score += 1;

		// Password contains number.
		if (password.match(/([0-9])/))
			strength.hasNumber = true;

		// Password contains numbers and characters = strength + 1.
		if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))
			strength.score += 1;

		// Password contains special character (excluding spaces) = strength + 1.
		if (password.match(/[\W_]/))
		{
			strength.score += 1;
			strength.hasSpecialCharacter = true;
		}

		// Password contains 2 special characters (excluding spaces) = strength + 1.
		if (password.match(/[\W_].*[\W_]/))
			strength.score += 1;

		return strength;
	}
};

// Initialize custom containers.
$.fn.initializeCustomContainers = function() {
	var containerToggles = $(this);

	// Container toggler.
	containerToggles.each(function() {
		var toggler = $(this),
			toggleContainerItems = toggler.data("toggle-children");

		if (!toggler.is("input:checkbox")) {
			// Control with span as parent.
			toggler = $(this).find("input:checkbox:first");
			toggleContainerItems = $(this).data("toggle-children");
		}

		var toggleParent = toggler.parents(".field"),
			container = toggleParent.next(".container");

		if (container.length == 0) {
			// Fallback.
			container = toggleParent.parent().next(".container");
		}

		// Initial state.
		if (toggler.is(":checked")) {
			if (container.data("show-when-checked") != undefined && container.data("show-when-checked"))
				container.removeClass("hide");
			else container.addClass("hide");
		}

		// Toggle.
		toggler.change(function() {
			// Toggle children in container (optional).
			if (toggleContainerItems != undefined) {
				var checkboxes = container.find("input:checkbox");
				checkboxes.prop("checked", toggler.is(":checked"));

				// Switchery toggles.
				if (container.find(".switchery").length > 0) {
					// Destroy toggles.
					container.find(".switchery").remove();

					// Re-create toggles.
					checkboxes.initializeSwitchery();
				}
			}

			// Toggle container.
			container.fadeIn().toggleClass("hide");

			if (toggler.parent().hasClass("toggleMap") && toggler.is(":checked")) {
				// Re-initialize maps (solves hidden container problems).
				if (typeof initializeGoogleMaps == "function") initializeGoogleMaps();

				if (typeof initializeAtriumMaps == "function") {
					setTimeout(function() {
						initializeAtriumMaps();
					}, 1000);
				}
			}
		});
	});

	// Check if there are containers to show.
	$(".showIfNotEmpty").each(function() {
		if ($.trim($(this).html()).length > 0) $(this).removeClass("hide");
	});
};

// Initialize RoyalSlider.
$.fn.initializeRoyalSlider = function() {
	var container = $(this),
		viewport = $.fn.viewport();

	if (container.find("img").length > 0) {
		if ($(".touch").length == 0 && container.find(".imageHeight:first").length > 0) {
			var containerHeight = container.find(".imageHeight:first").val(),
				containerWidth = 0,
				aspectRatio = 1;

			if (container.find(".imageWidth:first").length > 0) {
				containerWidth = container.find(".imageWidth:first").val();
				aspectRatio = containerHeight / containerWidth;
			}

			if (container.parent().hasClass("smallSlider")) containerWidth = 1200;

			if (containerWidth > 0 && containerWidth > viewport.width) {
				containerHeight = Math.round(containerHeight / (containerWidth / viewport.width));
			} else containerHeight = Math.round(containerWidth * aspectRatio);

			// Set initial slider height (reset on window.load()).
			container.css("height", containerHeight + "px");
		}

		if (settings.colors.header != "")
		{
			var sliderTextOpacity = 0.7;

			if (settings.webGuidelines)
				sliderTextOpacity = 0.85;

			if ($('html').hasClass('threedotfive')) {
				container.find('.rsSlideContentWrapper').setColor({
					color: settings.colors.header,
					opacity: sliderTextOpacity
				});
			}
			else {
				container.find('.rsSlideTitle, .rsSlideDescription').setColor({
					color: settings.colors.header,
					opacity: sliderTextOpacity
				});
			}
		}

		if (settings.colors.header == "" && settings.webGuidelines) {
			if ($('html').hasClass('threedotfive')) {
				container.find('.rsSlideContentWrapper').setColor({
					color: "#000",
					opacity: 0.65
				});
			}
			else {
				container.find(".rsSlideTitle, .rsSlideDescription").setColor({
					color: "#000",
					opacity: 0.65
				});
			}
		}

		// Delays.
		container.find(".rsSlideTitle").attr("data-delay", settings.slider.titleDelay);
		container.find(".rsSlideDescription").attr("data-delay", settings.slider.descriptionDelay);

		// Initialize slider.
		container
			.royalSlider({
				imageScaleMode: "none",
				autoHeight: true,
				autoScaleSlider: false,
				imageAlignCenter: false,
				keyboardNavEnabled: settings.webGuidelines,
				loop: true,
				loopRewind: false,
				arrowsNav: false,
				imageScalePadding: 0,
				slidesSpacing: 0,
				autoPlay: {
					enabled: !settings.webGuidelines,
					pauseOnHover: true,
					delay: settings.slider.slideDelay
				}
			})
			.show();

		if (container.find(".rsBullet").length > 1 && $(".touch").length == 0)
		{
			container.find(".rsBullets").show();
			container.find('.rsBullets').attr('role', 'tablist');
			container.find('.rsSlide').attr('role', 'tabpanel');

			container.find('.rsSlide').each(function(index) {
				var currentSlide = $(this);
				currentSlide.attr('id', 'slide' + (index + 1));
			});
		}

		container.find(".rsBullet").each(function(index) {
			var currentBullet = $(this);
			var screenReaderContent = $("<div>");
			screenReaderContent.addClass("screenReaderContent");
			screenReaderContent.text(settings.slider.photoText + " " + (index + 1));

			currentBullet.attr("tabindex", 0);
			currentBullet.attr("role", "tab");
			currentBullet.attr('aria-controls', 'slide' + (index + 1))
			currentBullet.attr("aria-selected", currentBullet.hasClass("rsNavSelected").toString());
			currentBullet.children("span").append(screenReaderContent);

			currentBullet.on("keypress", function(e) {
				if (e.keyCode == 13) {
					var slider = $(".royalSlider").data("royalSlider");
					slider.goTo(index);
				}
			});
		});

		container.data("royalSlider").ev.on('rsAfterSlideChange', function (event) {
			container.find(".rsBullet").each(function (index) {
				var currentBullet = $(this);
				currentBullet.attr("aria-selected", currentBullet.hasClass("rsNavSelected").toString());
			});
		});

		$("html").addClass("hasSlider");
	}
};

// Initialize color pickers.
$.fn.initializeColorPickers = function() {
	var colorPickers = $(this);

	colorPickers.each(function() {
		var colorPicker = $(this),
			colorInput = $(this).find("input:text"),
			color = $(this).find(".color"),
			previewSelector = colorPicker.data("colorpicker-preview-selector"),
			defaultColor = colorInput.data("colorpicker-default-color");

		if (colorInput.val() != "#FFFFFF") {
			// Set preview color.
			color.css("background", colorInput.val());
		}

		// Restore default color if field is empty.
		colorInput.blur(function() {
			if (($(this).val() == "" || $(this).val() == "Transparent") && defaultColor != undefined) {
				// Set default color.
				colorInput.val(defaultColor);
				color.css("background", defaultColor);

				// Reset live preview.
				if (previewSelector != undefined) {
					// Live preview.
					if (/ a|h1|h2|legend/g.test(previewSelector)) $(previewSelector).css("color", defaultColor);
					else $(previewSelector).css("background", defaultColor);
				}
			}
		});

		// Change color picker value when a valid hex value is typed or pasted.
		colorInput.keyup(function() {
			if ($.fn.isHex(colorInput.val())) colorPicker.colpickSetColor(colorInput.val());
		});

		// Initialize color picker.
		colorPicker.colpick({
			layout: "hex",
			submit: 0,
			color: colorInput.val(),
			onChange: function(hsb, hex, rgb, el) {
				if (previewSelector != undefined) {
					// Live preview.
					if (/ a|h1|h2|legend/g.test(previewSelector)) $(previewSelector).css("color", "#" + hex);
					else $(previewSelector).css("background", "#" + hex);
				}

				// Set color.
				colorInput.val("#" + hex).change();
				color.css("background", "#" + hex);
			}
		});
	});
};

// Initialize portalSelector.
$.fn.initializePortalSelector = function() {
	var portalSelector = $(this);

	portalSelector
		.unbind("change")
		.change(function() {
			var theValue = $.trim(portalSelector.val());

			if (theValue != "")
				document.location.href = "http://" + theValue + "/shortcuts/users_login.aspx?norefferer=true";
		});

	// WCAG.
	portalSelector.find(".toggleDropDown").unbind("mouseover").mouseover(function() {
		portalSelector.attr("aria-expanded", "true");
	});

	portalSelector.unbind("mouseleave").mouseleave(function() {
		portalSelector.attr("aria-expanded", "false");
	});

	portalSelector.attr("aria-expanded", "false");
};

// Initialize path.
$.fn.initializePath = function() {
	var container = $(this);

	// Fixed path.
	$.fn.fixedPath();

	if (container.length > 0 && (settings.section.isShortcut || settings.section.isCMSChild)) {
		// Hide path on shortcut page.
		container.find("span").addClass("hide");
	}
};

// Initialize Switchery toggles.
$.fn.initializeSwitchery = function()
{
	// Don't enable Switchery with Web guidelines enabled.
	if (settings.webGuidelines && !$('html').hasClass('threedotfive'))
		return;

	// Don't enable Switchery in the Threedotfive theme.
	if ($('html').hasClass('threedotfive'))
	{
		$(this).parents('.field').addClass('switch');

		return;
	}

	// Default values.
	var defaults = {
		onColor: "#64bd63",
		offColor: "#dfdfdf",
		togglerColor: "#ffffff",
		size: "default",
		speed: "0.2s",
		className: "switchery",
		disabled: false,
		disabledOpacity: 0.5
	};

	var togglers = $(this);

	togglers.each(function() {
		var toggler = $(this),
			container = $(this).parent(),
			options = $.extend({}, defaults);

		// Destroy previous toggles.
		container.find(".switchery").remove();
		container.find("label").addClass("switcheryLabel");

		if (container.data("switchery-oncolor") != undefined) options.onColor = container.data("switchery-oncolor");

		if (container.data("switchery-offcolor") != undefined) options.offColor = container.data("switchery-offcolor");

		if (container.data("switchery-togglercolor") != undefined)
			options.togglerColor = container.data("switchery-togglercolor");

		if (container.data("switchery-size") != undefined) options.size = container.data("switchery-size");

		if (container.data("switchery-speed") != undefined) options.speed = container.data("switchery-speed");

		if (container.data("switchery-classname") != undefined)
			options.className = container.data("switchery-classname");

		if (container.data("switchery-disabled") != undefined) options.disabled = container.data("switchery-disabled");

		if (container.data("switchery-disabledopacity") != undefined)
			options.disabledOpacity = container.data("switchery-disabledopacity");

		// Create new switchery toggle.
		new Switchery(toggler[0], {
			color: options.onColor,
			secondaryColor: options.offColor,
			jackColor: options.togglerColor,
			size: options.size,
			speed: options.speed,
			className: options.className,
			disabled: options.disabled,
			disabledOpacity: options.disabledOpacity
		});
	});

	// Make switchery keyboard accessible.
	$(".switchery").each(function() {
		var theObject = $(this),
			theLabel = theObject.nextAll("label:first");

		theObject.attr("tabindex", "0");

		// Place the label value as title attribute and content in switchery for screen readers.
		if (theLabel.length > 0 && theObject.find(".screenReaderContent").length == 0)
			theObject.append('<span class="screenReaderContent">' + theLabel.html() + "</span>");

		theObject.keydown(function(aEvent) {
			if (aEvent.keyCode == 13 || aEvent.keyCode == 32) {
				theObject.click();

				aEvent.preventDefault();
			}
		});
	});
};

// Initialize Powerange sliders.
$.fn.initializePowerange = function() {
	if (settings.webGuidelines) {
		// Don't enable Powerange with Web guidelines enabled.
		return;
	}

	// Default values.
	var defaults = {
		start: 0,
		minimum: 0,
		maximum: 100,
		step: null,
		className: "",
		text: "",
		decimals: false,
		hideRange: false,
		vertical: false,
		disabled: false,
		disabledOpacity: 0.5,
		multiplier: 1
	};

	var containers = $(this);

	containers.each(function() {
		var container = $(this);

		// Destroy previous sliders.
		container.find(".range-bar, .range-value").remove();

		// Initialize.
		if (container.find("select").length > 0 && container.find("input").length == 0) {
			// Add select list compatibility to slider.
			var selectList = container.find("select:first");
			container.append('<input type="text" class="hide" />');
		}

		container.append('<span class="range-value"></span>');

		var inputField = container.find("input[type=text]:first"),
			valueField = container.find(".range-value"),
			options = $.extend({}, defaults);

		if (container.data("powerange-minimum") != undefined) options.minimum = container.data("powerange-minimum");

		if (container.data("powerange-maximum") != undefined) options.maximum = container.data("powerange-maximum");

		if (container.data("powerange-step") != undefined) options.step = container.data("powerange-step");

		if (container.data("powerange-classname") != undefined)
			options.className = container.data("powerange-classname");

		if (container.data("powerange-text") != undefined) options.text = container.data("powerange-text");

		if (container.data("powerange-decimals") != undefined) options.decimals = container.data("powerange-decimals");

		if (container.data("powerange-hiderange") != undefined)
			options.hideRange = container.data("powerange-hiderange");

		if (container.data("powerange-vertical") != undefined) options.vertical = container.data("powerange-vertical");

		if (container.data("powerange-disabled") != undefined) options.disabled = container.data("powerange-disabled");

		if (container.data("powerange-disabledopacity") != undefined)
			options.disabledOpacity = container.data("powerange-disabledopacity");

		if (container.data("powerange-multiplier") != undefined)
			options.multiplier = container.data("powerange-multiplier");

		if (selectList != undefined) {
			// Get value from select list.
			inputField.val(selectList.val() / options.multiplier);
		}

		// Set start value.
		options.start = inputField.val();

		// Fix bug in plugin (browser crashes when rendering slider in hidden tab or container).
		if (!inputField.parents(".tabContent").is(":visible")) {
			var hiddenTabContent = inputField.parents(".tabContent");
			hiddenTabContent.addClass("show invisible");
		}

		if (inputField.parents(".hide").length > 0) {
			var hiddenContainer = inputField.parents(".hide");
			hiddenContainer.addClass("invisible").removeClass("hide");
		}

		// Create new Powerange slider.
		var powerange = new Powerange(inputField[0], {
			start: options.start,
			min: options.minimum,
			max: options.maximum,
			step: options.step,
			klass: options.className,
			decimal: options.decimals,
			hideRange: options.hideRange,
			vertical: options.vertical,
			disable: options.disabled,
			disableOpacity: options.disabledOpacity,
			callback: function() {
				if (selectList != undefined) {
					if (inputField.val() == "0") {
						// Set first value in select list (0 or -1).
						selectList.val(selectList.find("option:first").val());
					} else {
						// Set value in select list.
						selectList.val(inputField.val() * options.multiplier);
					}
				}

				// Show value.
				if (inputField.val() == "0") {
					// Off.
					valueField.html("");
					container.find(".range-min").html(settings.various.offText);
				} else valueField.html(inputField.val() + options.text);
			}
		});

		// Store instance in data object.
		container.data("powerange", powerange);

		// Fix bug in plugin (browser crashes when rendering slider in hidden tab or container).
		if (hiddenTabContent != undefined) hiddenTabContent.removeClass("show invisible");

		if (hiddenContainer != undefined) hiddenContainer.addClass("hide").removeClass("invisible");

		// Keyboard handling
		container.find('.range-handle').attr('tabindex', '0').on('keydown', function (e)
		{
			if (e.keyCode == 37 || e.keyCode == 39)
			{
				var currentValue = parseInt(container.find('input[type=text]').val());

				if (e.keyCode == 39)
				{
					var targetValue = currentValue + powerange.options.step;

					if (targetValue <= powerange.options.max)
						powerange.setStart(currentValue + powerange.options.step);
				}
				else if (e.keyCode == 37)
				{
					var targetValue = currentValue - powerange.options.step;

					if (targetValue >= powerange.options.min)
						powerange.setStart(currentValue - powerange.options.step);
				}
			}
		});
	});
};

// Initialize range sliders.
$.fn.initializeRangeSlider = function() {
	$(this).each(function() {
		var slider = $(this).find(".range-slider__range"),
			valueLabel = $(this).find(".range-slider__value");

		slider.on("input change", function() {
			valueLabel.html($(this).val());
		});

		valueLabel.html(slider.val());
	});
};

// Initialize Plupload.
$.fn.initializePlupload = function() {
	var uploaders = $(this);

	if (uploaders.length == 0) {
		return;
	}

	if (typeof globals != "undefined" && (typeof globals.pluploadFileCache == "undefined" || globals.pluploadFileCache == null)) {
		globals.pluploadFileCache = {};
	}

	// Default values.
	var defaults = {
		url: "HandlerDownloadUploadDocument.ashx",
		flashUrl: "/communities/common/themes/mett%20responsive/includes/javascripts/plugins/plupload/moxie.swf",
		silverlightUrl:
			"/communities/common/themes/mett%20responsive/includes/javascripts/plugins/plupload/moxie.xap",
		chunkSize: "1mb",
		maxFileSize: "2000mb",
		rename: false,
		dragDrop: true,
		multiSelect: true,
		imageCrop: false,
		imageWidth: settings.images.maxImageWidth,
		imageHeight: settings.images.maxImageHeight,
		allowedExtensions: ""
	};

	var options = $.extend(defaults, options),
		isMobile = $(".touch").length > 0,
		oldIE = (typeof bowser !== "undefined" && bowser != null && bowser.name == "Internet Explorer" && bowser.version < 10);

	// Get allowed extensions.
	$.ajax({
		url: "/api/Documents/GetAllowedExtensions",
		data:
		{
			token: $("input[name='__RequestVerificationToken']").val()
		}
	})
	.done(function(data) {
		options.allowedExtensions = JSON.parse(data);

		// Continue with init.
		initUploaders();
	})
	.fail(function() {
		$.fn.showError(
			settings.errors.noAllowedFileExtensions + " (500.104)"
		);
	});

	function initUploaders() {
		uploaders.each(function(i) {
			// Instance options.
			var uploader = $(this);
			var uploaderID = null;
			var container = uploader.parents(".upload");
			var tabID = uploader.parents(".tabContent").length > 0 ? uploader.parents(".tabContent").attr("id").replace("Content", "") : "";
			var uploaderFileType = uploader.data("plupload-file-type") != undefined ? uploader.data("plupload-file-type") : "files";
			var uploaderButtonText = uploader.data("plupload-button-text") != undefined ? uploader.data("plupload-button-text") : settings.buttons.addFilesText;
			var uploaderSubmitButton = uploader.data("plupload-submitbutton-id") != undefined ? $("#" + uploader.data("plupload-submitbutton-id") + " .submitButton") : $(".save .submitButton");
			var uploaderPageType = uploader.data("plupload-page-type") != undefined ? uploader.data("plupload-page-type") : 0;
			var uploaderExtensionTypes = uploader.data("plupload-extension-types") != undefined ? uploader.data("plupload-extension-types") : "";

			// Deny all extensions by default.
			var uploaderExtensions = "";

			if (uploaderExtensionTypes != "" && options.allowedExtensions != "") {
				var extensionTypes = uploaderExtensionTypes.split(",");

				for (var j = 0; j < extensionTypes.length; j++) {

					switch ($.trim(extensionTypes[j]).toLowerCase()) {
						case "document":
							uploaderExtensions += "," + options.allowedExtensions.document;
							break;

						case "image":
							uploaderExtensions += "," + options.allowedExtensions.image;
							break;

						case "video":
							uploaderExtensions += "," + options.allowedExtensions.video;
							break;

						case "audio":
							uploaderExtensions += "," + options.allowedExtensions.audio;
							break;

						case "maplayer":
							uploaderExtensions += "," + options.allowedExtensions.maplayer;
							break;

						case "image:png":
							uploaderExtensions += ",png";
							break;
					}
				}
			}

			if (uploader.hasClass("single")) {
				options.multiSelect = false;
			}

			if (uploader.data("plupload-image-crop") != undefined && uploader.data("plupload-image-crop"))
				options.imageCrop = true;

			if (uploader.data("plupload-image-width") != undefined)
				options.imageWidth = uploader.data("plupload-image-width");

			if (uploader.data("plupload-image-height") != undefined)
				options.imageHeight = uploader.data("plupload-image-height");

			if (uploader.data("plupload-image-resize") != undefined && !uploader.data("plupload-image-resize")) {
				options.imageWidth = 6500;
				options.imageHeight = 6500;
			}

			// Mobile.
			if (isMobile) options.dragDrop = false;

			// Create new Plupload component.
			uploader
				.pluploadQueue({
					url: options.url,
					flash_swf_url: options.flashUrl,
					silverlight_xap_url: options.silverlightUrl,
					chunk_size: options.chunkSize,
					rename: options.rename,
					dragdrop: options.dragDrop,
					multi_selection: options.multiSelect,
					filters: {
						max_file_size: options.maxFileSize,
						mime_types: [{ title: "File types", extensions: uploaderExtensions.substring(1) }]
					},
					resize: {
						crop: options.imageCrop,
						width: options.imageWidth,
						height: options.imageHeight,
						quality: 100
					},
					preinit: {
						Init: function(up, info) {
							// Check if user is logged in.
							if (settings.user.userName == "")
								uploader.html(
									'<div class="warningMessage">' + settings.warnings.pluploadNotAllowedText + "</div>"
								);

							uploader.find("input:file").attr("title", settings.buttons.uploadFilesText);
							uploaderID = uploader.attr("id");

							// Add cached files after re-initialize.
							if (typeof uploaderID != "undefined" && uploaderID != null && uploaderID != "") {
								var uploaderFilesCache = globals.pluploadFileCache[uploaderID];

								// Check if uploaderFilesCache exists.
								if (typeof uploaderFilesCache != "undefined" && uploaderFilesCache != null)
									up.addFile(uploaderFilesCache);
							}
						},

						UploadFile: function(up, file) {
							up.settings.multipart_params = {
								idcontentpage:
									container.find(".itemID").length > 0 ? container.find(".itemID").val() : -1,
								selectedsections:
									container.find(".sectionIDs").length > 0
										? container.find(".sectionIDs").val()
										: $(".multiSelectDestinationIDs").val(),
								uniqueBatchID:
									container.find(".batchID").length > 0 ? container.find(".batchID").val() : -1,
								batchUniqueID:
									container.find(".batchID").length > 0 ? container.find(".batchID").val() : -1,
								filetype: uploaderFileType,
								pageType: uploaderPageType,
								uniqueID: $.fn.getUniqueID(),
								token: $("input[name='__RequestVerificationToken']").val()
							};
						}
					},
					init: {
						BeforeUpload: function() {
							// Disable overlay close button while uploading.
							if (uploader.parents(".overlay").length > 0) {
								uploader
									.parents(".overlay")
									.find(".button.close")
									.addClass("hide");
								uploader.parents(".overlay").unbind("click");
							}
						},
						FilesAdded: function(up, files) {
							var filesToRemove = [];

							// Check if filename has unwanted characters or if multiple files are uploaded in single upload or filename > 150 chars.
							for (var i = 0; i < up.files.length; i++) {
								var file = up.files[i];
								var regEx = /<script[\s\S]*?>[\s\S]*?<\/script>|<\/script>|\/\/--|String.fromCharCode([\s\S]*?)|onload=/gi;

								if (
									file.name.match(regEx) != null ||
									file.name.indexOf("<") > -1 ||
									file.name.indexOf(">") > -1 ||
									file.name.length > 150 ||
									(uploader.hasClass("single") && i < files.length - 1)
								) {
									// Add file for removal.
									filesToRemove.push(file);
								}
							}

							for (var i = 0; i < filesToRemove.length; i++) {
								// Remove files.
								up.removeFile(filesToRemove[i]);
							}

							if (up.files.length > 0) {
								// Remove click on drag & drop field.
								uploader
									.find(".plupload_filelist")
									.unbind("click")
									.removeClass("pointer");

								// Show add button.
								if (!uploader.hasClass("single"))
									uploaderButtonText = settings.buttons.addMoreFilesText;

								$(".plupload_buttons a").html(uploaderButtonText);

								// Badge count.
								if (tabID != "" && $("#" + tabID).find(".badge").length > 0)
									$("#" + tabID)
										.find(".badge")
										.html($("#" + tabID + "Content").find(".badgeCount").length + up.files.length)
										.removeClass("hide");
							}

							// Add files to cache to keep files after AJAX (if uploader has an ID).
							if (typeof uploaderID != "undefined" && uploaderID != null && uploaderID != "")
								globals.pluploadFileCache[uploaderID] = up.files;
						},
						FileUploaded: function(up, file, result) {
							var uploadResult = result.response;

							// Check if response is JSON.
							try {
								uploadResult = JSON.parse(result.response);
							} catch(e) {
								$.fn.showError(
									settings.errors.generalErrorText + " (500.105)"
								);

								return;
							}

							// Check if upload status response exists.
							if (uploadResult.status == undefined) {
								$.fn.showError(
									settings.errors.generalErrorText + " (500.106)"
								);

								return;
							}

							// Check if upload is OK.
							if (uploadResult.status.toLowerCase() != "upload ok!") {
								$.fn.showError(
									settings.errors.generalErrorText + " " + result.response + " (500.89)"
								);

								return;
							}

							// ContentPageID.
							if (container.find(".itemID").length > 0 && container.find(".itemID").val() == "" && uploadResult.contentPageID != 0) {
								container.find(".itemID").val(uploadResult.contentPageID);
							}

							// File name.
							if (container.find(".pluploadFileName").length > 0 && uploadResult.fileName != null) {
								container.find(".pluploadFileName").val(uploadResult.fileName);
							}

							// File ID.
							if (container.find(".pluploadFileIDs").length > 0 && uploadResult.fileId != null) {
								if (container.find(".pluploadFileIDs").val() != "" && !uploader.hasClass("single")) {
									container.find(".pluploadFileIDs").val(container.find(".pluploadFileIDs").val() + ";" + uploadResult.fileId);
								}
								else {
									container.find(".pluploadFileIDs").val(uploadResult.fileId);
								}
							}

							if (uploader.pluploadQueue().total.uploaded == uploader.pluploadQueue().files.length) {
								var allDone = true;

								// Add a class when all uploads for an instance are done.
								uploader.addClass("done");

								// Check if all uploaders are done.
								$(".uploader").each(function() {
									if (!$(this).hasClass("done")) {
										allDone = false;

										return false;
									}
								});

								if (allDone) {
									// Return to save() function.
									uploaderSubmitButton.save({ afterUpload: true });
								}
							}
						},
						FilesRemoved: function(up, files) {
							if (up.files.length == 0 && !isMobile && !oldIE) {
								// Re-add click to open file select dialog on drag & drop field.
								uploader
									.find(".plupload_filelist")
									.unbind("click")
									.click(function() {
										uploader.find(".plupload_add")[0].click();
									})
									.addClass("pointer");
							}

							// Add files to cache to keep files after AJAX (if uploader has an ID).
							if (typeof uploaderID != "undefined" && uploaderID != null && uploaderID != "")
								globals.pluploadFileCache[uploaderID] = up.files;

							// Badge count.
							if (tabID != "" && $("#" + tabID).find(".badge").length > 0) {
								$("#" + tabID)
									.find(".badge")
									.html(
										parseInt(
											$("#" + tabID)
												.find(".badge")
												.html()
										) - 1
									)
									.removeClass("hide");

								if (
									parseInt(
										$("#" + tabID)
											.find(".badge")
											.html()
									) == 0
								)
									$("#" + tabID)
										.find(".badge")
										.addClass("hide");
							}
						}
					}
				})
				.find(".plupload_buttons")
				.addClass("button add confirm icon-plus before")
				.find("a")
				.html(uploaderButtonText);

			// Click on drag & drop field to open file select dialog.
			if (!isMobile && !oldIE) {
				uploader
					.find(".plupload_filelist")
					.unbind("click")
					.click(function() {
						uploader.find(".plupload_add")[0].click();
					})
					.addClass("pointer");
			}
		});
	}
};

// Initialize overlays.
$.fn.initializeOverlays = function() {
	// Reset.
	$("body").removeClass("overlayOpen");

	$(this).each(function() {
		var overlay = $(this),
			closeButton;

		if (!overlay.hasClass("hide") && !overlay.is(":hidden")) {
			$.fn.saveLastFocus();

			// Disable scrolling.
			$("html, body").scrollTop(0);
			$("body").addClass("overlayOpen");

			// Keep tabs in overlay.
			overlay.tabGuard();

			// Focus on overlay.
			setTimeout(function() {
				if (overlay.find("input:text").length > 0) {
					overlay.find("input:text:first").focus().select();
				} else {
					overlay.find('.overlayItemTitle').attr('tabindex', '-1').focus();
				}
			}, 200);
		}

		// Close button.
		overlay.find(".button.close").unbind("click").click(function()
		{
			// Re-enable scrolling.
			$("body").removeClass("overlayOpen");

			// Hide overlay.
			overlay.addClass("hide");

			$.fn.restoreLastFocus();

			if (overlay.find(".button.close").is("A")) {
				return false;
			}
		});

		overlay.find('.overlayItemContent').scroll(function()
		{
			if ($('.overlayItemContent').scrollTop() > 0)
				overlay.find('h1, .toolbarBottom').addClass('scrollable');
			else
				overlay.find('h1, .toolbarBottom').removeClass('scrollable');
		});

		// Close overlay.
		overlay.unbind("click").click(function(event) {
			if ($(event.target).is($(this))) {
				var closeOverlay = true;

				if (overlay.data("close-on-click") != undefined && !overlay.data("close-on-click")) {
					closeOverlay = false;
				}

				if (closeOverlay) {
					overlay.find(".button.close").click();
				}
			}
		});
	});
};

// Initialize responsive videos.
$.fn.initializeVideoFrames = function()
{
	$(this).each(function()
	{
		var videoFrame = $(this),
			titleAttr = videoFrame.attr("title"),
			videoSrc = videoFrame.attr('src');

		if (typeof videoFrame.data("aspectRatio") == "undefined" || videoFrame.data("aspectRatio") == null)
		{
			var videoFrameWidth = videoFrame.attr("width") | videoFrame.width(),
				videoFrameHeight = videoFrame.attr("height") | videoFrame.height();

			videoFrame.data("aspectRatio", parseFloat(videoFrameWidth) / parseFloat(videoFrameHeight));

			// Set title attribute (Web guidelines).
			if (typeof titleAttr == undefined || titleAttr == null || $.trim(titleAttr) == "")
				videoFrame.attr("title", "Video");
		}

		if (!videoFrame.parent().hasClass('youtube-wrapper'))
			videoFrame.css({ width: "100%" });

		if (settings.webGuidelines && videoSrc.indexOf('youtu') > -1)
		{
			if (videoSrc.indexOf('?') > -1)
			{
				if (videoSrc.indexOf('disablekb=0') > -1)
					videoSrc.replace('disablekb=0', 'disablekb=1');
				else if(videoSrc.indexOf('disablekb=1') == -1)
					videoSrc += '&disablekb=1';
			}
			else
				videoSrc += '?disablekb=1';

			videoFrame.attr('src', videoSrc);
		}
	});

	$(this).setVideoFrameSize();
};

// Initialize Image Maps
$.fn.initializeImageMaps = function() {
	$(this).each(function() {
		var image = $(this),
			imageMap = $("map[name='" + image.attr("usemap").replace("#", "") + "']");

		if (imageMap.length == 0 || typeof image.attr("width") == "undefined" || $.trim(image.attr("width")) == "")
			return;

		var ratio = image.width() / image.attr("width");

		imageMap.find("area[coords]").each(function() {
			var currentArea = $(this),
				currentCoords = "";

			if (typeof currentArea.data("originalCoords") == "undefined")
				currentArea.data("originalCoords", currentArea.attr("coords"));

			currentCoords = currentArea.data("originalCoords").split(",");

			for (var i = 0; i < currentCoords.length; i++) {
				currentCoords[i] = Math.round(currentCoords[i] * ratio);
			}

			currentArea.attr("coords", currentCoords.join(","));
		});
	});
};

// Initialize element focus (Web guidelines).
$.fn.initializeFocus = function() {
	$(this).each(function() {
		var currentObject = $(this),
			headerObject = $("#top");

		// Add tabindex for anchors.
		if (
			currentObject.is("a") &&
			(typeof currentObject.attr("href") == "undefined" ||
				currentObject.attr("href") == null ||
				$.trim(currentObject.attr("href")) == "")
		)
			currentObject.attr("tabindex", "-1");

		if (currentObject.data("focusInitialized") != true && headerObject.length > 0) {
			currentObject.focus(function (e) {
				// Prevent tabbing in background of overlay.
				if ($("body").hasClass("overlayOpen") && currentObject.parents(".overlay").length == 0) {
					var targetOverlay = $(".overlay:not(.hide), .overlay.show");

					if (targetOverlay.length > 0) {
						targetOverlay.find("a, button, input, [tabindex]").first().focus();

						return;
					}
				}

				// Added timeout because of offset calculations
				setTimeout(function ()
				{
					if (
						headerObject.css("position") == "fixed" &&
						headerObject.find(currentObject).length == 0 &&
						$(window).scrollTop() > 0 &&
						currentObject.offset().top < headerObject.offset().top + headerObject.height()
					) {
						var difference = currentObject.offset().top - (headerObject.offset().top + headerObject.height());

						$("html, body").scrollTop($(window).scrollTop() + difference);
					}
					else if (currentObject.offset().top + currentObject.outerHeight() > $(window).scrollTop() + $(window).height()) {
						var targetScrollTop = currentObject.offset().top + currentObject.outerHeight() - $(window).height();

						$("html, body").scrollTop(targetScrollTop);
					}
				}, 40);
			});

			currentObject.data("focusInitialized", true);
		}
	});
};

// Initialize anchor links.
$.fn.initializeAnchorLinks = function()
{
	// Add focus to target anchor after click. Some browsers (mobile and FF) don't automatically do that.
	$(this).unbind("click").click(function()
	{
		var targetHref = $(this).attr("href"),
			targetScrollTop = $(targetHref).offset().top,
			extraOffsetTop = $('#top').outerHeight();

		if (settings.images.logoScroll) extraOffsetTop -= 60;

		if ($('html').hasClass('threedotfive')) extraOffsetTop += 70;

		if ($(targetHref).length > 0)
			$("html, body").stop(true).animate({ scrollTop: targetScrollTop - extraOffsetTop }, 150);

		document.location.href = document.location.href.split("#")[0] + targetHref;

		return false;
	});
};

$.fn.initializeInternalPageAnchors = function()
{
	$('.section').addClass('anchor-links');
	$('.anchor-link').parent().css({'position': 'relative', 'z-index': '0'});
};

// Initialize scrolling actions.
$.fn.initializeScrolling = function() {
	var topLogo = $("#top .logo");

	// Fixed path.
	$.fn.fixedPath();

	// Logo size.
	if (topLogo.length > 0 && !topLogo.hasClass("noResize") && settings.images.logoScroll) {
		if ($(document).scrollTop() > $("#shortcuts").height()) {
			topLogo.addClass("small");
			$("#top").addClass("small");
		} else {
			topLogo.removeClass("small");
			$("#top").removeClass("small");

			if ($(document).scrollTop() == 0) {
				// Re-initialize spacers.
				setTimeout(function() {
					$.fn.initializeSpacers();
				}, 200);
			}
		}
	}
};

// Page numbers
$.fn.initializePageNumbers = function ()
{
	$(this).each(function ()
	{
		$(this).click(function ()
		{
			var href = $(this).attr('href');
			var targetElementId = '';

			if (href)
			{
				targetElementId = /__doPostBack\(\'([^\']+)\'/.exec(href)[1];

				if (targetElementId && $.trim(targetElementId) != '')
				{
					targetElementId = $.trim(targetElementId).split('$').join('_');
					document.scrollToAfterAjax = targetElementId;

					return;
				}
			}

			document.scrollToAfterAjax = true;
		});
	});
}

// Initialize tags.
$.fn.initializeTags = function() {
	if (!settings.section.showTags) {
		return;
	}

	var container = $(this);

	if (container.length > 0 && !container.data('tags-initialized')) {
		container.tagsInput({
			minChars: 1,
			defaultText: "",
			onAddTag: function() {
				$("#tagsTab .badge")
					.html($("#tagsTabContent .badgeCount").length)
					.removeClass("hide");
			},
			onRemoveTag: function() {
				if ($("#tagsTabContent .badgeCount").length > 0)
					$("#tagsTab .badge").html($("#tagsTabContent .badgeCount").length);
				else $("#tagsTab .badge").addClass("hide");
			}
		});

		$(".addEditTags").removeClass("hide");

		container.data('tags-initialized', true);
	}
};

// Initialize inline likes.
$.fn.initializeInlineLikes = function () {
	if ($(this).length == 0) {
		return;
	}

	var itemIDs = [];

	var updateStatus = function (likeButtonToUpdate, checked) {
		if (settings.section.itemID != -1)
			likeButtonToUpdate = $("#toolbarTop .button.like, #toolbarTop .button.liked, .like.inline");

		if (checked) {
			// Liked.
			likeButtonToUpdate.addClass("liked");
			likeButtonToUpdate.data("checked", true);
			likeButtonToUpdate.removeClass("icon-heart-empty").addClass("icon-heart");
			likeButtonToUpdate.attr("title", settings.buttons.unLikeText);
			likeButtonToUpdate.find("input:button").attr("title", settings.buttons.unLikeText);
			likeButtonToUpdate.find(".screenReaderContent").html(settings.buttons.inlineUnLikeText);
		} else {
			// Like.
			likeButtonToUpdate.addClass("like");
			likeButtonToUpdate.data("checked", false);
			likeButtonToUpdate.removeClass("liked icon-heart").addClass("icon-heart-empty");
			likeButtonToUpdate.attr("title", settings.buttons.likeText);
			likeButtonToUpdate.find("input:button").attr("title", settings.buttons.likeText);
			likeButtonToUpdate.find(".screenReaderContent").html(settings.buttons.inlineLikeText);
		}
	};

	var updatePageLikeButton = function (likeCount, checked) {
		if (settings.section.itemID != -1) {
			// Top like button.
			$("#toolbarTop .button.like input, #toolbarTop .button.liked input").val(likeCount);
			$("#toolbarTop .button.like label, #toolbarTop .button.liked label").text(likeCount);
			$("#toolbarTop .button.like input:checkbox, #toolbarTop .button.liked input:checkbox").prop(
				"checked",
				checked
			);
		}
	}

	$(this).each(function () {
		var likeButton = $(this),
			likeNumber = likeButton.find(".number"),
			itemID = $.isNumeric(likeButton.data("item-id")) ? likeButton.data("item-id") : settings.section.itemID,
			checked = false;

		itemIDs.push(itemID);

		var updateData = function (aData) {
			if (typeof aData == "object" && aData.length > 0) {
				if (typeof aData[0].likeCount != "undefined" && aData[0].likeCount != null) {
					likeNumber.text(aData[0].likeCount);
					checked = aData[0].status;

					updatePageLikeButton(aData[0].likeCount, checked);

					updateStatus(likeButton, checked);
				}

				likeButton.removeClass("hide").addClass("visible");
			} else likeButton.addClass("hide").removeClass("visible");
		};

		if (!$.isNumeric(itemID) || itemID == -1) {
			likeButton.addClass("hide");

			return;
		}

		if (settings.user.ID > 0) {
			likeButton.unbind("click").click(function () {
				checked = likeButton.data("checked") ? false : true;

				updateStatus(likeButton, checked);

				$.ajax({
					url: "/api/notification/SetLike",
					data: {
						sectionID: settings.section.ID,
						contentPageID: itemID,
						status: checked,
						token: $("input[name='__RequestVerificationToken']").val()
					}
				})
					.done(function (aData) {
						updateData(aData);
					})
					.fail(function () {
						likeButton.addClass("hide");
						$.fn.showError(arguments + ". (500.86)", "console");
					});

				return false;
			});
		} else {
			likeButton.css({ pointerEvents: "none", cursor: "default" });
		}
	});

	var updateAllData = function (aData) {
		if (!Array.isArray(aData))
			return;

		for (var itemIndex in aData) {
			var currentItem = aData[itemIndex];
			var currentElement;
			if (typeof currentItem != "object" || typeof currentItem.likeCount != "number")
				continue;

			if (settings.section.itemID && settings.section.itemID > 0)
				currentElement = $(".like.inline");
			else
				currentElement = $(".like.inline[data-item-id=" + currentItem.contentPageID + "]");

			currentElement.find(".number").text(currentItem.likeCount);
			updatePageLikeButton(currentItem.likeCount, currentItem.status);
			updateStatus(currentElement, currentItem.status);

			currentElement.removeClass("hide");
		}
	}

	$.ajax({
		url: "/api/notification/GetLikes",
		data: {
			sectionID: settings.section.ID,
			contentPageIDs: itemIDs.join(","),
			token: $("input[name='__RequestVerificationToken']").val()
		}
	})
	.done(function (aData) {
		updateAllData(aData);
	})
	.fail(function () {
		$.fn.showError(arguments + ". (500.104)", "console");
	});
};

$.fn.initializeForumStickies = function()
{
	$.each($('#forum.section .row'), function()
	{
		var sticky = $(this).find('.itemInformation .sticky');

		if (sticky.text() === 'Sticky')
		{
			sticky.removeClass('hide');
			$(this).addClass('sticky');
		}
	});
};

// Initialize maintenance message.
$.fn.initializeMaintenance = function() {
	if (document.location.href.indexOf("login.mett.nl") > -1) {
		return;
	}

	var now = new Date();

	var apiCall =
	{
		url: "/api/community/getcommunitymessage",
		data:
		{
			communityId: 432,
			token: $("input[name='__RequestVerificationToken']").val()
		}
	};

	$.ajax(apiCall).done(function(maintenance)
	{
		if (!maintenance || !maintenance.EnableMessage || maintenance.Message == "") {
			return;
		}

		if (maintenance.ScheduleMessage && (now < new Date(maintenance.MessageStartDate) || now > new Date(maintenance.MessageEndDate))) {
			return;
		}

		// 0 = Moderators.
		if (maintenance.ShowMessageTo == 0 && settings.section.cmsUrl == "") {
			return;
		}

		// 1 = Authenticated users.
		if (maintenance.ShowMessageTo == 1 && (settings.user == undefined || settings.user.ID == -1)) {
			return;
		}

		// Lockdown (readonly) mode (redirect to homepage with message).
		if (maintenance.LockdownMode) {
			if (
				settings.section.isAdd ||
				settings.section.isEdit ||
				settings.section.isDelete ||
				settings.section.isCMS ||
				settings.section.isCMSAdd ||
				settings.section.isCMSEdit ||
				settings.section.isProfile ||
				(settings.section.cmsUrl != "" && globals.url.indexOf(settings.section.cmsUrl) > -1 && !settings.section.isSettings)
			) {
				document.location.href = "/default.aspx?maintenance=true";
			}

			// Disable add, edit, delete, comment, etc. buttons.
			$(".shortcut.updates, .shortcut.dropDownProfile, .shortcut.cms, .toolbar:not('.portalSelector, .savePortalSettings') a, .toolbar:not('.portalSelector') input, .sectionOptions .button.add a, .commentCount, .like, .starRating a").unbind("click").click(function() {
				showMessage(maintenance);

				return false;
			});

			// Remove comment field.
			$("#addComment").html("<div class='warningMessage'>" + maintenance.Message + "</div>");
		}

		showMessage(maintenance);
	});

	function showMessage(maintenance) {
		$("body").showMessage({
			content: maintenance.Message,
			showHideButton: maintenance.ShowHideMessageButton,
			autoHideAfter: maintenance.HideAfterNSeconds,
			cookieID: "mettMaintenanceCookie_" + new Date(maintenance.MessageStartDate).getTime()
		});
	};
};

// Initialize tags
$.fn.initializeTagsDisplay = function () {
	var tagDisplays = $(this);

	if (tagDisplays.length === 0) {
		return false;
	}

	var ajaxSettings =
	{
		url: "/api/contentPages/getSectionContentPagesTags",
		data:
		{
			sectionID: settings.section.ID,
			token: $("input[name='__RequestVerificationToken']").val()
		}
	};

	if (tagDisplays.length == 1)
	{
		if (typeof tagDisplays.data("item-id") != "undefined" && $.trim(tagDisplays.data("item-id")) != "")
		{
			ajaxSettings.url = "/api/contentPages/getContentPageTags";
			ajaxSettings.data.contentPageId = tagDisplays.data("item-id");
		}
		else
		{
			return;
		}
	}

	$.ajax(ajaxSettings)
	.done(function (data)
	{
		tagDisplays.each(function ()
		{
			var currentTagDisplay = $(this);
			var itemId = currentTagDisplay.data("item-id");

			currentTagDisplay.empty();

			if (itemId > 0 && typeof data[itemId] != "undefined" && data[itemId].length > 0)
			{
				var clearDiv = $("<div>");
				clearDiv.addClass("clear both");

				for (var i = 0; i < data[itemId].length; i++)
				{
					var currentTag = data[itemId][i];
					var searchUrl = "/shortcuts/Search_Search.aspx?tag=" + encodeURIComponent(currentTag.Name);
					var container = $("<span>");
					var link = $("<a>");

					container.addClass("tag icon-tag before");

					link.attr("href", searchUrl);
					link.text(currentTag.Name);

					container.append(link);
					currentTagDisplay.append(container);
				}

				currentTagDisplay.append(clearDiv);
			}
		});
	});
}

$.fn.initializeFollowersOverlay = function ()
{
	var followersOverlay = $(this);

	if (followersOverlay.data('initialized'))
		return;

	followersOverlay.find('.button.close').click(function () {
		fetchFollowersData();
	});

	followersOverlay.data('initialized', true);
}

$.fn.showFollowersOverlay = function(options)
{
	var followersOverlay = $(this);

	if (options.showOverlay)
	{
		$.fn.saveLastFocus();

		$("body").addClass("overlayOpen");
		followersOverlay.removeClass("hide");

		followersOverlay.tabGuard();

		followersOverlay.find("[tabindex]:not([tabindex=-1]):visible, button:visible, input:visible, a:visible").first().focus();
	}
}

// Cookie settings overlay.
$.fn.initializeCookieSettingsOverlay = function(options)
{
	if ($.cookie == undefined)
		return;

	var defaults =
	{
		showOverlayToggle: !$.cookie(settings.cookies.ID),
		showOverlay: $.fn.getAnchor("settings") == "cookies"
	};

	var options = $.extend(defaults, options);

	if (!options.showOverlayToggle && !options.showOverlay)
		return;

	var cookieSettingsOverlay = $(this);
	var cookieSettingsOverlayToggle = $("#cookieSettingsOverlayToggle");

	// Overlay toggle.
	cookieSettingsOverlayToggle.unbind("click").click(function()
	{
		$("#cookieSettingsOverlay").initializeCookieSettingsOverlay({ showOverlay: true });
	});

	if ($('#functionalCookiesToggle').length > 0 && $('#functionalCookiesToggle')[0].disabled === true)
		$('#functionalCookiesToggle').attr('aria-disabled', 'true');

	// Toggle current cookie settings in overlay.
	cookieSettingsOverlay.find("#analyticalCookiesToggle").prop("checked", settings.cookies.allowAnalytical).initializeSwitchery();
	cookieSettingsOverlay.find("#marketingCookiesToggle").prop("checked", settings.cookies.allowMarketing).initializeSwitchery();

	// Policy link in overlay.
	if ($("#footer .cookiePolicy").length > 0)
	{
		cookieSettingsOverlay.find(".cookiePolicy").unbind("click").click(function()
		{
			$("#footer .cookiePolicy a")[0].click();

			return false;
		});
	}

	// Cancel button in overlay.
	cookieSettingsOverlay.find(".toolbarBottom .close input:button").unbind("click").click(function()
	{
		// Re-enable scrolling.
		$("body").removeClass("overlayOpen");

		// Hide overlay.
		cookieSettingsOverlay.addClass("hide");

		$.fn.restoreLastFocus();
	});


	// Save button in overlay.
	cookieSettingsOverlay.find(".toolbarBottom .saveCookieSettings input:button").unbind("click").click(function()
	{
		// Get settings.
		var cookieSettings =
		{
			functional: cookieSettingsOverlay.find("#functionalCookiesToggle").is(":checked"),
			analytical: cookieSettingsOverlay.find("#analyticalCookiesToggle").is(":checked"),
			marketing: cookieSettingsOverlay.find("#marketingCookiesToggle").is(":checked")
		};

		// Expire 1 year from now.
		var expiryDate = new Date();
		expiryDate.setTime(expiryDate.getTime() + 3600 * 1000 * 24 * 365);

		// Store cookie settings in cookie.
		$.cookie.json = true;
		$.cookie(settings.cookies.ID, cookieSettings, { expires: expiryDate, path: "/" });

		// Log choices.
		$.ajax({
			url: "/api/application/logCookieConsent",
			data:
			{
				functional: cookieSettings.functional,
				analytical: cookieSettings.analytical,
				marketing: cookieSettings.marketing,
				token: $("input[name='__RequestVerificationToken']").val()
			}
		})
		.done(function(aData)
		{
			// Refresh page with new settings.
			document.location.href = globals.url.replace("#settings=cookies", "");
		})
		.fail(function()
		{
			$.fn.showError(settings.errors.cookieConsentErrorText + " (500.103)");
		});
	});

	if (options.showOverlayToggle)
		cookieSettingsOverlayToggle.removeClass("hide");

	if (options.showOverlay)
	{
		$.fn.saveLastFocus();

		$("body").addClass("overlayOpen");
		cookieSettingsOverlay.removeClass("hide");

		cookieSettingsOverlay.tabGuard();

		cookieSettingsOverlay.find("[tabindex]:not([tabindex=-1]):visible, button:visible, input:visible, a:visible").first().focus();
	}
};

// Apply cookie settings to content.
$.fn.applyCookieSettings = function()
{
	if (settings.cookies.allowMarketing || settings.section.isAdd || settings.section.isEdit) {
		return;
	}

	// Allowed content: same domain, mett.nl, do not track parameter, etc.
	var whiteList = "iframe[src*=''], iframe[src*='" + globals.domain + "'], iframe[src*='mett.nl'], " +
		"iframe[src*='tik-app.nl'], iframe[src*='formdesk.nl'], iframe[src*='formdesk.com'], iframe[src*='?dnt=true'], iframe[src*='&dnt=true'], " +
		"iframe[src*='maps.arcgis.com'], iframe[src*='hcaptcha.com'], iframe[src*='geocontent.rvo.nl'], iframe[src*='rijkswaterstaat.projectatlas.app'], " +
		"iframe[src*='-infographic.dpi.nl'], iframe[src*='emaddc-monitoring-stack-dev.pub.dev.knmi.cloud'], iframe[src*='emaddc-monitoring-stack.pub.knmi.cloud'], " +
		"iframe[src*='gemeentewoudenberg.ik-doe-mee.nl'], iframe[src*='paw.da05.qabana.nl']";

	// Blacklisted (video) content: all external domains, YouTube, Vimeo, etc.
	var blackList = "iframe[src^='http://'], iframe[src^='https://'], iframe[src^='//'], .fb-page";
	var videoBlackList = "iframe[src*='youtube.com'], iframe[src*='youtube-nocookie.com'], iframe[src*='vimeo.com']";

	// Remove unallowed content.
	$(blackList).not(whiteList).addClass("blockedContent").hide();
	$(videoBlackList).addClass("blockedVideoContent");

	$(".blockedContent").each(function()
	{
		var blockedContent = $(this);
		var warningMessage = $("<div />");
		var warningMessageTitle = $("<h3 />");
		var warningMessageLink = $("<a />");
		var warningMessageContent = settings.cookies.blockedContentWarning;

		warningMessageTitle.html(settings.cookies.blockedContentTitle);
		warningMessageLink.text(settings.cookies.blockedContentLink);

		// Change title and content depending on page layout.
		if (blockedContent.parent().hasClass("small") || blockedContent.parent().hasClass("medium") || blockedContent.parents(".mettCarousel")) {
			warningMessageContent = "";
			warningMessageLink.text(settings.cookies.blockedContentLinkShort);
		}

		warningMessageLink.prop("href", "#settings=cookies").unbind("click").click(function(e)
		{
			$("#cookieSettingsOverlay").initializeCookieSettingsOverlay({ showOverlay: true });
			e.preventDefault();
			e.stopPropagation();
			return false;
		});

		warningMessage.prop("class", "cookieWarningMessage").html(warningMessageContent).prepend(warningMessageTitle).append(warningMessageLink);

		if (blockedContent.parent().prop('tagName').toLowerCase() !== 'body')
			$(warningMessage).insertAfter(blockedContent);

		blockedContent.parent().addClass("hasBlockedContent")
		blockedContent.remove();
	});
};

function htmlDecode(aValue) {
	return $('<div/>').html(aValue).text();
}

$.fn.initializeRelatedContent = function ()
{
	var relatedContent = $(this);
	if (relatedContent.length === 0)
		return;

	$('.itemTags').insertBefore(relatedContent);

	$.ajax(
	{
		url: "/api/contentpages/getrelatedcontent",
		data:
		{
			sectionId: settings.section.ID,
			contentPageId: settings.section.itemID,
			token: $("input[name='__RequestVerificationToken']").val()
		}
	})
	.done(function(aData)
	{
		if (!aData["ContentPages"] || aData["ContentPages"].length == 0) {
			relatedContent.remove();
			return;
		}

		relatedContent.removeClass('hide');

		var relatedContentContainer = $('<ul>');
		relatedContentContainer.addClass('related-content-container');
			
		$.each(aData["ContentPages"], function (aIndex) {
			var listIconValue = "";
			switch (this["contentpage_pagetype"]) {
				case 3:
					listIconValue = "icon-globe";
					break;
				case 5:
					listIconValue = "icon-link";
					break;
				case 13:
					listIconValue = "icon-calendar";
					break;
				case 18:
					listIconValue = "icon-chat";
					break;
				case 34:
					listIconValue = "icon-docs";
					break;
				case 50:
					listIconValue = "icon-location";
					break;
				case 58:
					listIconValue = "icon-pencil";
					break;
				case 65:
					listIconValue = "icon-doc-text";
					break;
				case 74:
					listIconValue = "icon-help";
					break;
				case 88:
					listIconValue = "icon-info-circled";
					break;
				case 76:
					listIconValue = "icon-users";
					break;
				default:
					listIconValue = "icon-doc-text";
					break;
			}
			console.log(this["contentPage_title"]);

			var contentTitleLi = $('<li>');
			var contentTitleLink = $('<a>');
			contentTitleLink.attr('href', '/PageByID.aspx?sectionID=' + this["CPS_SectionID"] + '&contentpageID=' + this["contentPage_id"]);
			contentTitleLink.addClass(listIconValue + ' before auto relatedcontent_' + this["contentPage_id"]);
			contentTitleLink.text(htmlDecode(this["contentPage_title"]));
			contentTitleLi.append(contentTitleLink);
			relatedContentContainer.append(contentTitleLi);
		});

		relatedContent.append(relatedContentContainer);
	})
	.fail(function ()
	{
		$.fn.showError(arguments + ". (500.51)", "console");
		relatedContent.remove();
	});
};

$.fn.initializePageNavigation = function()
{
	$.ajax(
	{
		url: "/api/pagenavigation/GetNavigationOptions",
		data:
		{
			sectionID: settings.section.ID,
			contentPageID: settings.section.itemID,
			token: $("input[name='__RequestVerificationToken']").val()
		}
	})
	.done(function(aData)
	{
		var data = JSON.parse(aData),
			itemNavContainer = $('<div class="item-nav-container"></div>');

		$.each(data, function(i)
		{
			var itemButton;

			if (data[i][4] == 'previous')
				itemButton = $('<a href="' + data[i][3] + '" class="item-nav previous"><span class="nav-label">' + settings.section.previousItem + '</span><br><span class="title">' + data[i][2] + '</span></a>');
			else if (data[i][4] == 'next')
				itemButton = $('<a href="' + data[i][3] + '" class="item-nav next"><span class="nav-label">' + settings.section.nextItem + '</span><br><span class="title">' + data[i][2] + '</span></a>');

			itemNavContainer.append(itemButton);
		});

		itemNavContainer.insertBefore($('.item #toolbarBottom'));
	})
	.fail(function()
	{
		$.fn.showError(arguments + ". (500.51)", "console");
	});
};

$.fn.initializeRegistrationCheckboxCheck = function()
{
	if ($('.userConditions .field input[type="checkbox"]').is(':checked'))
		$('#conditionsState').text(settings.various.conditionsAcceptedText);
	else
		$('#conditionsState').text(settings.various.conditionsNotAcceptedText);

	if ($('.privacyStatement .field input[type="checkbox"]').is(':checked'))
		$('#privacyState').text(settings.various.privacyAcceptedText);
	else
		$('#privacyState').text(settings.various.privacyNotAcceptedText);
};

$.fn.addAriaLabels = function ()
{
	$(this).each(function ()
	{
		var currentObject = $(this);

		if (typeof currentObject.attr("aria-label") == "undefined")
		{
			if (typeof currentObject.attr("value") != "undefined")
				currentObject.attr("aria-label", currentObject.attr("value"));
			else
			{
				if (currentObject.hasClass('shareBtnLink'))
					currentObject.attr("aria-label", currentObject.attr('title'));
				else if (currentObject.data("ignore-aria-label") !== true)
					currentObject.attr("aria-label", currentObject.text());
			}
		}
	});
}

$.fn.initializeTotalRecords = function () {
	if (!settings.section.enableTotalRecords || $(this).length === 0)
		return;

	$('.totalRecords').remove();

	var totalRecorsCount = $(this).data('total-records');
	if (parseInt(totalRecorsCount) === -1)
		return;

	var totalRecords = $('<div>');
	totalRecords.addClass('totalRecords');
	totalRecords.text(totalRecorsCount + ' ' + (totalRecorsCount === 1 ? settings.section.resultText : settings.section.resultsText));

	$('.sectionContent').prepend(totalRecords);
}

$.fn.CKEditorContainsXSSVulnerability = function () {
	// Editors.
	var editors = $(".editor");

	if (editors.length > 0) {

		for (var i = 0; i < editors.length; i++)
		{
			// Check if all editors are initialized properly.
			if (!$(editors[i]).hasClass("ready")) return true;
		}

		if (typeof CKEDITOR != "undefined") {
			for (name in CKEDITOR.instances) {
				var data = CKEDITOR.instances[name].getData();
				var regEx = /<script[\s\S]*?>[\s\S]*?<\/script>|<\/script>|\/\/--|String.fromCharCode([\s\S]*?)|onload=|onerror=/gi;

				// Check for script tag.
				if (typeof data != "undefined" && data != null && $.trim(data) != "" && data.match(regEx) != null)
					return true;
			}
		}
	}

	return false;
}

$.fn.initializeAccessibleHCaptcha = function ()
{
	// hCaptcha.
	if ($("#h-captcha").length > 0 && $("#h-captcha .accessibilityLink").length == 0)
	{
		var accessibilityLink = $("<a>");
		accessibilityLink.attr("href", "https://dashboard.hcaptcha.com/signup?type=accessibility");
		accessibilityLink.attr("target", "_blank");
		accessibilityLink.addClass("accessibilityLink");
		accessibilityLink.text(settings.a11y.accessibleHCaptchaText);

		$("#h-captcha").prepend(accessibilityLink);
	}

}

$.fn.initializeHelpdeskWidget = function ()
{
	if (settings.various.showHelpdeskWidgetToModerators && settings.section.cmsUrl != "") {
		var helpdeskScript = document.createElement("script");
		helpdeskScript.type = "text/javascript";
		helpdeskScript.src = "https://chat.mett.nl/widget.umd.js";
		document.body.appendChild(helpdeskScript);
		helpdeskScript.onload = function() {
			var widget = document.createElement("chat-widget");
			document.body.append(widget);
		};
	}
}


// Makes sure the session won't expire while filling out a form (Web guidelines).
$.startKeepAlive = function(aMaxTime) {
	window.keepAliveInterval = setInterval(function() {
		// Keep alive every 10 minutes.
		if (document.location.href.indexOf("login.mett.nl") > -1)
			$.get(document.location.href + "&preventCache=" + Date.now());
		else $.get("/shortcuts/default.aspx?preventCache=" + Date.now());
	}, 600000);

	if (typeof aMaxTime != "undefined" && aMaxTime != null && aMaxTime > 0) {
		// Stop after aMaxTime minutes.
		setTimeout(function() {
			$.stopKeepAlive();
		}, aMaxTime);
	}
};

// Stops startKeepAlive function.
$.stopKeepAlive = function() {
	if (typeof window.keepAliveInterval != "undefined" && window.keepAliveInterval != null)
		clearInterval(window.keepAliveInterval);
};

$.fn.injectMettAccessibilityParagraph = function()
{
	var accessibilityParagraph = '<h2>Toegankelijkheid Mett</h2>' +
		'<p>Deze website maakt gebruik van het <a href="https://www.mett.nl/">Mett</a> platform. Mett laat haar online software periodiek toetsen op toegankelijkheid door onafhankelijke deskundigen en lost gevonden knelpunten duurzaam op.</p>' +
		'<p>Voor de technisch-functionele toegankelijkheid van deze website verwijzen we daarom naar de <a href="https://www.toegankelijkheidscertificaat.nl/mett/audit/" target="_self" rel="noreferrer noopener">onderzoeksresultaten van ‘Mett Toegankelijk’</a>, een platform op Mett dat daar periodiek op getoetst wordt door een onafhankelijke derde partij.</p>';

	$('.sectionContent').append(accessibilityParagraph);
};

$.fn.initializePasswordVisibilityToggle = function()
{
	var passwordField = $(this),
		passwordInput = passwordField.find('input'),
		passwordToggle = passwordField.find('.passwordToggle');

	passwordToggle.unbind("mousedown").mousedown(function()
	{
		// Cancel blur event.
		passwordInput.addClass("cancelBlur");

		if (passwordToggle.hasClass("icon-awesome-eye"))
		{
			// Show password.
			passwordToggle.removeClass("icon-awesome-eye").addClass("icon-awesome-eye-off");
			passwordInput.attr("type", "text");
		}
		else
		{
			// Hide password.
			passwordToggle.removeClass("icon-awesome-eye-off").addClass("icon-awesome-eye");
			passwordInput.attr("type", "password");
		}

		setTimeout(function()
		{
			passwordInput.focus();
		}, 0);
	});
}

// Google Translate plugin callback.
function initializeGoogleTranslate() {
	if ($("#googleTranslatePlugin").length == 0) {
		// Create plugin container.
		var googleTranslatePlugin = $("<div />");
		googleTranslatePlugin.prop("id", "googleTranslatePlugin");

		$(settings.googleTranslate.pluginLocation).append(googleTranslatePlugin);
	}

	// Initialize plugin.
	new google.translate.TranslateElement({
		pageLanguage: settings.googleTranslate.pageLanguage,
		includedLanguages: settings.googleTranslate.includedLanguages,
		layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
	}, "googleTranslatePlugin");
}
