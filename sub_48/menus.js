// Main menu.
$.fn.initializeMainMenu = function() {
	var mainMenu = $(this);
	var maxHeight = $(window).height() - $("#top").height();
	var shortcuts = $("#shortcuts");

	maxHeight = Math.max(150, maxHeight);

	// Vertical tablet check (overrides CSS in menus.css).
	if ($(".touch").length > 0 && $.fn.viewport().width > 768) {
		mainMenu.show();
		shortcuts.show().removeClass('hide');
	}

	$.fn.initializeSecondRow(mainMenu);

	// Check if scrollbar in drop down is needed.
	mainMenu.find(".dropDown ul").each(function()
	{
		var dropDown = $(this);

		if (dropDown[0].scrollHeight > maxHeight)
			dropDown.parent().css({ "max-height": maxHeight, "overflow-x": "hidden", "overflow-y": "scroll" });
		else
			dropDown.parent().removeAttr("style");
	});

	if (mainMenu.css("display") == "block") {
		// Initialize scrollbar if main menu is visible.
		$("body").removeClass("noScroll");
	}

	if ($('#shortcuts .shortcut.favorites').length > 0)
	{
		var favBtn = $('#shortcuts .shortcut.favorites');

		if (favBtn.hasClass('active'))
			favBtn.attr('aria-expanded', 'true');
		else
			favBtn.attr('aria-expanded', 'false');
	}

	shortcuts.find('.shortcut.profile').attr('aria-expanded', 'false');
};

// Mobile menu.
$.fn.initializeMobileMenu = function () {
	var container = $(this);
	var topHeight;
	var bottomClearance;
	var menuSize;
	var mobileScroll;

	var bodyKeyDown = function (e) {
		// Close hamburger menu on esc press
		if (e.keyCode == 27) {
			$("#top .hamburger").click();
		}
	}

	// Toggle button.
	$("#top .hamburger")
		.unbind("click")
		.click(function () {
			if (!$(this).hasClass("active")) {
				topHeight = $("#top").height() + $(".smartbanner").height();

				if (!$('#cookieSettingsOverlayToggle').hasClass('hide'))
					bottomClearance = topHeight + $('#cookieSettingsOverlayToggle').height() + 25;
				else
					bottomClearance = topHeight;

				menuSize = $(window).outerHeight() - bottomClearance;

				// Disable scrolling.
				$("body").addClass("noScroll");
				$("body").bind("keydown", bodyKeyDown);

				$("#top .columns, #mobileSlideOut").tabGuard();

				setTimeout(function () {
					$("#mobileSlideOut").find("[tabindex]:not([tabindex=-1]):visible, button:visible, input:visible, a:visible").first().focus();
				}, 40);

				// Show menu.
				$("#top")
					.stop(true)
					.animate({ height: "100%" }, 300);
				container
					.css({ top: topHeight, height: menuSize + 'px' })
					.stop(true)
					.fadeIn(600);
				$(this)
					.removeClass("icon-menu")
					.addClass("active icon-cancel");
				$(this)
					.find(".screenReaderContent")
					.html(" " + settings.menu.hamburgerCollapseText);

				// Custom scrollbar.
				mobileScroll = new IScroll("#mobileSlideOut", {
					scrollbars: true,
					click: true,
					mouseWheel: true,
					interactiveScrollbars: true,
					shrinkScrollbars: "scale"
				});
			} else {
				// Hide menu.
				topHeight = 0;

				container.stop(true).fadeOut(200);

				$("#top")
					.stop(true)
					.animate({ height: topHeight }, 300, null, function () { $(window).resize(); });
				$(this)
					.removeClass("active icon-cancel")
					.addClass("icon-menu");
				$(this)
					.find(".screenReaderContent")
					.html(" " + settings.menu.hamburgerExpandText);

				// Enable scrolling.
				$("body").removeClass("noScroll");
				$("body").unbind("keydown", bodyKeyDown);

				// Remove custom scrollbar.
				if (mobileScroll) mobileScroll.destroy();
			}

			return false;
		});

	// Copy sub menu to mobile menu & expandable sub menu when parent item is hidden.
	if (
		$("#defaultSubMenu").length > 0 &&
		$.trim($("#defaultSubMenu").html()) != "" &&
		$("#mobileMenu a[href='" + $("#defaultSubMenu .dropDown:first a:first").attr("href") + "']").length == 0 &&
		$("#expandableSubMenu a[href='" + $("#defaultSubMenu .dropDown:first a:first").attr("href") + "']").length ==
		0 &&
		!settings.section.isShortcut
	) {
		var hiddenMenuItems = $("<li />").addClass("hiddenMenuItems");

		if ($("#path").length > 0 && $("#path a:eq(1)").length > 0)
			hiddenMenuItems.append(
				'<a href="' + $("#path a:eq(1)").attr("href") + '" class="active">' + $("#path a:eq(1)").html() + "</a>"
			);
		else hiddenMenuItems.append('<a class="active">' + settings.menu.hiddenPageText + "</a>");

		hiddenMenuItems.append(
			'<a class="arrow icon-down-open-big before" title="' +
			settings.menu.toggleSubPagesText +
			'">\n<span>' +
			settings.menu.toggleSubPagesText +
			"</span>\n</a>"
		);
		hiddenMenuItems.append($("#defaultSubMenu .dropDown:first").clone());

		// Append to mobile menu.
		$("#mobileMenu .firstRow, #expandableSubMenu .firstRow").append(hiddenMenuItems);
	}

	// Mobile menu & expandable sub menu arrows.
	$("#mobileMenu a.arrow, #expandableSubMenu a.arrow").each(function () {
		var arrow = $(this),
			menuItem = arrow.parent(),
			menuItemLink = menuItem.find("a:first");

		arrow.attr("href", menuItemLink.attr("href"));
		menuItem.addClass('arrowContainer');
		arrow.find("span").text(settings.menu.toggleSubPagesText + ' ' + settings.various.ofText + ' ' + menuItemLink.text());
		menuItemLink.attr('aria-expanded', 'false');

		arrow.unbind("click").click(function () {
			// Toggle icon.
			if (arrow.hasClass("icon-up-open-big")) {
				arrow.removeClass("icon-up-open-big").addClass("icon-down-open-big");
				menuItem.removeClass('open');
				menuItemLink.attr('aria-expanded', 'false');
			} else {
				arrow.removeClass("icon-down-open-big").addClass("icon-up-open-big");
				menuItem.addClass('open');
				menuItemLink.attr('aria-expanded', 'true');
			}

			// Toggle drop down.
			menuItem.find(".dropDown:first").slideToggle(0, function () {
				// Reinitialize custom scrollbar for new height.
				if (mobileScroll) mobileScroll.refresh();
			});

			return false;
		});

		// Open drop downs to show current page.
		if (menuItem.find("a.active").length > 0) {
			if (menuItemLink.hasClass("active"))
				arrow.addClass("active");

			if (arrow.hasClass("icon-down-open-big"))
				arrow.click();
		}
	});

	// Main menu arrows (only show on mobile devices > 768px).
	$('.touch #mainMenu').initializeMainMenuArrow($('.touch #mainMenu'), '40px');
};

$.fn.initializeSecondRow = function (mainMenu) {
	var i = 0;

	if ($('.secondRow').length > 0) {
		// Reset.
		mainMenu.find(".firstRow").append(mainMenu.find(".secondRow > li"));
		mainMenu.removeClass("doubleHeight");
		$('.secondRow').remove();
	}

	// Add search container width to calculation in case of RO template
	var extraOffset = $("#searchContainer").length > 0 ? $("#searchContainer").width() : 0;

	// Move last items to second row.
	while (mainMenu.find(".firstRow").width() + extraOffset > mainMenu.find(".row:first").width() && i < 100) {
		if ($('.secondRow').length == 0)
			$('<ul class="secondRow"></ul>').insertAfter($('.firstRow'));

		mainMenu.find(".secondRow").prepend(mainMenu.find(".firstRow > li:last"));

		i++;
	}

	if (i > 0)
		mainMenu.addClass("doubleHeight");

	// Re-init spacers.
	setTimeout(function () {
		$.fn.initializeSpacers();
	}, 100);
}

$.fn.initializeMainMenuArrow = function (elem, distance)
{
	elem.find('a.arrow').each(function ()
	{
		var arrow = $(this),
			menuItem = arrow.parent(),
			menuItemLink = menuItem.find("a:first");

		menuItemLink.css("padding-right", distance);

		if (menuItemLink.hasClass("active"))
			arrow.addClass("active");

		arrow.attr("href", menuItemLink.attr("href"));

		if ($('html').hasClass('touch'))
		{
			arrow.unbind("click").click(function()
			{
				var showDropDown = true;

				// Check if drop down is already visible.
				if (menuItem.find(".dropDown:first").hasClass("show"))
				{
					arrow.removeClass("icon-up-open-big").addClass("icon-down-open-big");
					showDropDown = false;
				}

				// Hide all drop downs.
				$(".touch:not(.desktop) #mainMenu a.arrow, .touch:not(.desktop) #shortcuts .profile").removeClass("icon-up-open-big").addClass("icon-down-open-big");
				$(".dropDown").removeClass("show");

				if (showDropDown)
				{
					// Show this drop down.
					arrow.removeClass("icon-down-open-big").addClass("icon-up-open-big");
					menuItem.find(".dropDown:first").toggleClass("show");
				}

				return false;
			}).show();
		}
	});
};

// Anchor menu.
$.fn.initializeAnchorMenu = function() {
	var anchorMenu = $(this);

	if (settings.section.enableAnchorMenu) {
		if (anchorMenu.length > 0) {
			var anchors = $(".content a[name]")
				.not(".pageNumber a[name]")
				.not("a.foot-note");
			var lastSubMenuItem = $("#subMenu li:last");

			if (anchors.length > 0) {
				anchors.each(function() {
					var anchor = $(this);
					var anchorID = anchor.attr("id");
					var anchorName = anchor.attr("name");

					if (anchorID == undefined && anchorName != undefined) {
						anchorID = anchorName;
					}

					if (anchorName == undefined && anchorID != undefined) {
						anchorName = anchorID;
					}

					if (anchorName != undefined && anchorID != undefined) {
						var menuItem =
							'<li><a class="icon-forward before" href="#' + anchorID + '">' + anchorName + "</a></li>";

						// Appand anchor menu item.
						anchorMenu.append(menuItem);
					}
				});
			}
		}

		if (settings.section.parentID == -1) {
			// Main menu.
			$(
				"#mainMenu ul.firstRow > li > a, #mainMenu ul.secondRow > li > a, #mobileMenu ul.firstRow > li > a, #mobileMenu ul.secondRow > li > a"
			)
				.not(".arrow")
				.each(function(i) {
					var mainMenuItem = $(this);
					var mainMenuItemID = mainMenuItem
						.html()
						.replace(/[^\w-_]/gi, "")
						.toLowerCase();

					// Replace with anchors.
					if (mainMenuItemID != "home") {
						mainMenuItem.attr("href", "#" + mainMenuItemID);
					}

					if ($("#" + mainMenuItemID).length > 0) {
						mainMenuItem.unbind("click").click(function() {
							if (mainMenuItem.parents("#mobileMenu").length > 0) {
								// Close mobile menu.
								$("#top .hamburger").click();
							}

							// Scroll to anchor.
							$("html, body")
								.stop(true)
								.animate({ scrollTop: $($(this).attr("href")).offset().top - 200 }, 500);

							return false;
						});
					}
				});
		}

		//  Manual scroll links.
		$(".scrollLink").each(function() {
			$(this)
				.unbind("click")
				.click(function() {
					// Scroll to anchor.
					$("html, body")
						.stop(true)
						.animate({ scrollTop: $($(this).attr("href")).offset().top - 200 }, 500);

					return false;
				});
		});
	}
};

// App style sub menu.
$.fn.initializeAppStyleSubMenu = function() {
	var container = $(this);
	var currentMenuItem = container.find("a:not(.arrow).active:last").addClass("extraActive");
	var currentMenuItemParent = container.find(".extraActive").parent("li");
	var menuItemBack = $("<li />").addClass("hide");
	var menuItemBackLink = $("<a />")
		.attr("href", "/")
		.addClass("back icon-left-open-big before")
		.html("Terug");

	// Hide all items.
	container
		.find("a")
		.removeClass("active")
		.addClass("hide");
	container
		.find(".dropDown")
		.show()
		.find("a")
		.css("padding-left", "15px");

	// Show all items on current level.
	currentMenuItemParent.find("a:first, a.arrow:first").addClass("active");
	currentMenuItemParent
		.siblings()
		.find("a:first, a.arrow:first")
		.removeClass("hide");

	// Arrow level navigation.
	container.find("a.arrow").each(function() {
		var arrow = $(this);
		arrow.removeClass("icon-down-open-big icon-up-open-big").addClass("icon-right-open-big");

		arrow.unbind("click").click(function() {
			var currentDropDown = arrow.parent("li").find(".dropDown:first");

			// Hide all items.
			container
				.find("a:not(.back)")
				.removeClass("active")
				.addClass("hide");

			// Only show all items on current level.
			currentDropDown.find("> ul > li > a").removeClass("hide");

			// Show back link.
			menuItemBack.removeClass("hide");

			return false;
		});
	});

	// Back link.
	menuItemBackLink.unbind("click").click(function() {
		// Get items from 1 level up.
		var parentDropDown = container.find("a:not(.hide, .back):first").parents(".dropDown:first");

		// Hide all items on this level.
		parentDropDown
			.find("a")
			.removeClass("active")
			.addClass("hide");

		// Show all items 1 level up.
		parentDropDown
			.parents("ul:first")
			.find("> li > a")
			.removeClass("hide");

		if (!container.find("a:not(.back):first").hasClass("hide")) {
			// Hide back link.
			menuItemBack.addClass("hide");
		}

		return false;
	});

	container.find("ul.firstRow").prepend(menuItemBack.append(menuItemBackLink));

	if (settings.section.parentID != -1) {
		// Show back link.
		menuItemBack.removeClass("hide");
	}

	// All done!
	container.show();
};

// Admin submenu.
$.fn.initializeAdminSubMenu = function() {
	var menu = $(this);

	if (menu.length == 0) {
		// Create menu.
		var newMenu = $("<div />")
			.prop("id", "subMenu")
			.append($("<ul />"));
		$(".layout25-50-25 #left, .layout25-75 #left, .layout33-33-33 #left, .layout75-25 #right").append(newMenu);

		menu = $("#subMenu ul");
	}

	// Custom menu items.
	var cmsLink = $("<a />")
		.prop("href", settings.section.cmsUrl)
		.addClass("icon-flow-tree before")
		.html(settings.admin.cmsText);
	var usersLink = $("<a />")
		.prop("href", "/beheer/gebruikers/default.aspx")
		.addClass("icon-users before")
		.html(settings.admin.usersText);
	var rolesLink = $("<a />")
		.prop("href", "/beheer/rollen/default.aspx")
		.addClass("icon-awesome-users before")
		.html(settings.admin.rolesText);
	var settingsLink = $("<a />")
		.prop("href", "/beheer/instellingen/default.aspx")
		.addClass("icon-tools before")
		.html(settings.admin.settingsText);
	var statsLink = $("<a />")
		.prop("href", "/beheer/statistics/default.aspx")
		.addClass("icon-chart-bar before")
		.html(settings.admin.statisticsText);
	var mailingsLink = $("<a />")
		.prop("href", "/beheer/mailings/default.aspx")
		.addClass("icon-mail before")
		.html(settings.admin.mailingsText);
	var notificationsLink = $("<a />")
		.prop("href", "/beheer/notificaties/default.aspx")
		.addClass("icon-bell before")
		.html(settings.admin.notificationsText);
	var registrationsLink = $("<a />")
		.prop("href", "/beheer/registraties/default.aspx")
		.addClass("icon-user-add before")
		.html(settings.admin.registrationsText);
	var redirectsLink = $("<a />")
		.prop("href", "/beheer/redirects/default.aspx")
		.addClass("icon-forward before")
		.html(settings.admin.redirectsText);
	var pollsLink = $("<a />")
		.prop("href", "/beheer/polls/default.aspx")
		.addClass("icon-chart-pie before")
		.html(settings.admin.pollsText);
	var formsLink = $("<a />")
		.prop("href", "/beheer/formulieren/default.aspx")
		.addClass("icon-awesome-edit before")
		.html(settings.admin.formsText);
	var moderatorFormLink = $("<a />")
		.prop("href", "/shortcuts/formulier+beheerder/default.aspx")
		.addClass("icon-graduation-cap before")
		.html(settings.admin.moderatorFormText);
	var sslFormLink = $("<a />")
		.prop("href", "/shortcuts/formulier+ssl/default.aspx")
		.addClass("icon-lock before")
		.html(settings.admin.sslFormText);

	switch (settings.section.typeID) {
		case 28:
			usersLink.addClass("active");
			break;

		case 29:
			rolesLink.addClass("active");
			break;

		case 36:
			settingsLink.addClass("active");
			break;

		case 37:
			cmsLink.addClass("active");
			break;

		case 38:
			pollsLink.addClass("active");
			break;

		case 43:
			registrationsLink.addClass("active");
			break;

		case 45:
			mailingsLink.addClass("active");
			break;

		case 56:
			moderatorFormLink.addClass("active");
			break;

		case 61:
			sslFormLink.addClass("active");
			break;

		case 69:
			redirectsLink.addClass("active");
			break;

		case 77:
			notificationsLink.addClass("active");
			break;

		case 81:
			formsLink.addClass("active");
			break;

		case 84:
			statsLink.addClass("active");
			break;
	}

	menu.append($("<li />").append(cmsLink));
	menu.append($("<li />").append(usersLink));
	menu.append($("<li />").append(rolesLink));
	menu.append($("<li />").append(settingsLink));
	menu.append($("<li />").append(statsLink));
	menu.append($("<li />").append(mailingsLink));
	menu.append($("<li />").append(notificationsLink));
	menu.append($("<li />").append(registrationsLink));
	menu.append($("<li />").append(redirectsLink));
	menu.append($("<li />").append(pollsLink));
	menu.append($("<li />").append(formsLink));
	menu.append($("<li />").append(moderatorFormLink));
	menu.append($("<li />").append(sslFormLink));
};

$.fn.initializeHorizontalSubMenu = function ()
{
	var subMenu = $(this);
	var staticSubMenuContainer = $("<div>").addClass("staticSubMenuContainer");
	var horizontalContainer = subMenu.find("#defaultSubMenu");
	var total = $("#total");
	var targetColumn = null;

	if (total.hasClass("layout25-50-25") || total.hasClass("layout33-33-33") || total.hasClass("layout100"))
		targetColumn = $("#center");
	else if (total.hasClass("layout25-75"))
		targetColumn = $("#right");
	else if (total.hasClass("layout75-25") || total.hasClass("layout50-50"))
		targetColumn = $("#left");

	if (targetColumn == null || targetColumn.length == 0 || subMenu.length == 0)
		return;

	staticSubMenuContainer.append(subMenu);
	targetColumn.prepend(staticSubMenuContainer);

	if (subMenu.find('a.active').length > 0)
	{
		var activeMenuItem = subMenu.find('a.active'),
			activeMenuUl = activeMenuItem.closest('ul');

		subMenu.find('#defaultSubMenu > .dropDown > ul').remove();
		subMenu.find('#defaultSubMenu > .dropDown').append(activeMenuUl);
	}

	subMenu.find('li .dropDown').remove();
	subMenu.find("ul").css({ display: "flex" });

	var updatePosition = function ()
	{
		if ($(window).scrollTop() > 0)
		{
			if (staticSubMenuContainer.offset().top < $(window).scrollTop() + $("#top").height())
			{
				if (!horizontalContainer.hasClass("row"))
				{
					staticSubMenuContainer.height(staticSubMenuContainer.outerHeight());
					horizontalContainer.addClass("row");
					subMenu.appendTo($("#top"));
					horizontalContainer.stop().css({ opacity: 0 }).animate({ opacity: 1 }, 200);
				}
			}
			else if (horizontalContainer.hasClass("row"))
			{
				staticSubMenuContainer.height("auto");
				horizontalContainer.removeClass("row");
				subMenu.appendTo(staticSubMenuContainer);
				horizontalContainer.stop().css({ opacity: 0 }).animate({ opacity: 1 }, 200);
			}
		}
	};

	$(window).resize(updatePosition);
	$(window).scroll(updatePosition);
}

$.fn.initializeActiveItemOnlySubMenu = function()
{
	var subMenu = $(this);

	if (subMenu.hasClass('onlyActiveItem') && subMenu.find('a.active').length > 0)
	{
		if ($('#subMenu ul li a.active').parent().find('> .dropDown').length > 0)
			$('#subMenu ul li a.active').parent().addClass('active-item');
		else if (subMenu.find('.dropDown').length == 1)
			subMenu.addClass('flatMenu');
		else
			$('#subMenu ul li a.active').closest('.dropDown').parent().addClass('active-item');

		if (subMenu.hasClass('flatMenu'))
			return;
		else if ($('#subMenu #defaultSubMenu > .dropDown > ul').find('> li.active-item').length > 0)
			$('#subMenu #defaultSubMenu > .dropDown > ul > li:not(.active-item)').remove();
		else
		{
			var menuSection = $('#subMenu li.active-item').closest('.dropDown').parent();

			$('#subMenu #defaultSubMenu > .dropDown > ul > li').remove();
			$('#subMenu #defaultSubMenu > .dropDown > ul').append(menuSection[0]);
		}
	}
}

// Drop down menu keyboard accessibility.
$.fn.enableKeyboardAccessibility = function() {
	$(this).each(function() {
		var dropDown = $(this);
		var parent = dropDown.parents("li:first");
		var parentButton = parent.find("> a:first, > button:first, input[type=button]:first");

		if ($("html").hasClass("touch")) {
			parent.find("button, input[type=button]").unbind("click").click(function () {
				parent.toggleClass("focus");
			});
		}

		parentButton.attr("aria-expanded", "false");

		var onKeyUp = function (e) {
			if (e.keyCode == 27) {
				var lastSibling = dropDown.find("a:last");

				// Set focus to last sibling and then blur, so keyboard navigation will work as expected
				lastSibling.focus();
				lastSibling.blur();

				parentButton.attr("aria-expanded", "false");
				dropDown.removeClass("show");
			}
		};

		var onDocumentKeyUp = function (e) {
			if (e.keyCode == 27) {
				parent.addClass('hideDropDown');
			}
		};

		parent.mouseenter(function () {
			parent.removeClass('hideDropDown');

			$(document).unbind("keyup", onDocumentKeyUp).bind("keyup", onDocumentKeyUp);
		});

		parent.mouseleave(function () {
			parent.removeClass('hideDropDown');

			$(document).unbind("keyup", onDocumentKeyUp);
		});

		parent.bind("keyup", onKeyUp);

		parentButton.hover(function () {
			parentButton.attr("aria-expanded", "true");
		});

		parentButton.mouseout(function () {
			parentButton.attr("aria-expanded", "false");
		});

		dropDown.find("a").each(function () {
			var currentLink = $(this);

			if (currentLink.data("handlersInitialized")) {
				return;
			}


			currentLink.hover(function () {
				parentButton.attr("aria-expanded", "true");
				currentLink.bind("keyup", onKeyUp);
			});

			currentLink.mouseout(function () {
				parentButton.attr("aria-expanded", "false");
			});

			currentLink.focus(function () {
				parent.addClass("focus");
				parentButton.attr("aria-expanded", "true");
				currentLink.bind("keyup", onKeyUp);
			});

			currentLink.blur(function () {
				parent.removeClass("focus");
				parentButton.attr("aria-expanded", "false");
				currentLink.unbind("keyup", onKeyUp);
			});

			currentLink.data("handlersInitialized", true);
		});
	});
};

$.fn.calculateMainMenuDropdownPosition = function () {
	$(this).scroll(function () {
		var scrollableRow = $(this);

		scrollableRow.find(".dropDown").css({ marginLeft: -scrollableRow.scrollLeft() });
	});
};

$.fn.initializeManualRedirect = function () {
	if (!settings.cms)
		return;

	var helpdeskLi = $('<li>');
	var helpdeskLink = $('<a>');

	helpdeskLink.text(settings.cms.helpdeskAndManual);
	helpdeskLink.attr({
		'href': 'https://academy.mett.nl/helpdeskpagina/default.aspx',
		'target': '_blank',
		'rel': 'noreferrer'
	});

	helpdeskLi.append(helpdeskLink);
	helpdeskLi.insertAfter($(this).parent());
}