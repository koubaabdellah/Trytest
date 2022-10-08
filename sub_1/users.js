$(window).load(function()
{
	// Create profile image thumbnails (window.load prevents preloading issues).
	setTimeout(function()
	{
		$("#users.item .itemImage").createProfileThumbnails();

		var itemImage = $('#users.item .itemImage'),
			img = itemImage.find('img');

		if (img.length > 0)
		{
			if (img.width() > img.height())
				itemImage.addClass('landscape');
			else if (img.width() < img.height())
				itemImage.addClass('portrait');
		}
	}, 500);
});

$(document).ready(function()
{
	// Initialize.
	$.fn.initializeUsers();

	// Add & edit user.
	$("#users.item.add, #users.item.edit, #registrations.item").initializeAddEditUser();

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		// After AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, e)
		{
			$.fn.initializeUserSearchFilters();
			$.fn.initializePagingButtons();

			// Create profile image thumbnails
			setTimeout(function()
			{
				$("#users.item .itemImage").createProfileThumbnails();
			}, 500);
		});
	}
});

// Initialize users.
$.fn.initializeUsers = function()
{
	// Inactive users.
	$('#users .item.inactive, #users.item.inactive').each(function()
	{
		var inactiveUser = $(this);
		var inactiveUserProfileLink = 'users_adduser.aspx?userkey=' + inactiveUser.data('userid') + '#tab=settingsTab';
		var inactiveUserLabel = $('<div />').addClass('inactiveUserLabel').html(settings.user.inactiveText + ' ');
		var inactiveUserLabelLink = $('<a />').prop('href', inactiveUserProfileLink).html('(' + settings.buttons.editText.toLowerCase() + ')');

		inactiveUserLabel.append(inactiveUserLabelLink);
		inactiveUser.append(inactiveUserLabel);
	})

	// Section buttons.
	if (settings.section.isCMSChild)
	{
		// Import button.
		$('#users.section #toolbarBottom .button.import').removeClass('hide');
	}
	else
	{
		// View button.
		$('#users.section #toolbarBottom .button.edit').removeClass('hide');
	}

	// Re-initialize toolbars.
	$("body").initializeToolbars();

	// Profile edit button.
	if ($("#users.item.profile .toolbar .button.edit a").length > 0)
	{
		$("#users.item.profile .toolbar .button.edit, #users.item.profile .toolbar .button.privacy-levels").removeClass("hide");
		$("#users.item.profile .toolbar").show();

		// Add top buttons
		var customToolbarTop = $('<div />'),
			customToolbarWrapper = $('<div />'),
			userSettingsButton = $('<div />'),
			userSettingsButtonLink = $('<a />'),
			privacyLevelsButton = $('<div />'),
			privacyLevelsButtonLink = $('<a />');

		userSettingsButton.addClass('button edit transparent edit-privacy-settings visible wrapper-first-child icon-pencil iconOnly before');

		userSettingsButtonLink.attr({
			'role': 'button',
			'href': '#'
		});
		userSettingsButtonLink.text(settings.various.editPrivacySettingsText).attr('aria-label', settings.various.editPrivacySettingsText);

		userSettingsButton.append(userSettingsButtonLink);

		privacyLevelsButton.addClass('button security transparent show-privacy-levels iconOnly before float right icon-lock visible');

		privacyLevelsButtonLink.attr({
			'role': 'button',
			'href': '#'
		});
		privacyLevelsButtonLink.text(settings.various.showPrivacyLevelsText).attr('aria-label', settings.various.showPrivacyLevelsText);

		privacyLevelsButton.append(privacyLevelsButtonLink);

		customToolbarTop.attr('id', 'toolbarTop');
		customToolbarTop.addClass('toolbar right');
		customToolbarTop.attr('style', 'display: block');

		customToolbarWrapper.addClass('toolbarWrapper');

		customToolbarWrapper.append(userSettingsButton, privacyLevelsButton);
		customToolbarTop.append(customToolbarWrapper);

		$('#pathOptions #options').append(customToolbarTop);

		$('#users.item.profile .toolbar .button.privacy-levels').unbind('click').click(function()
		{
			$('.exposureLevel.hide').removeClass('hide');

			$('html, body').animate({ scrollTop: 0 }, 'slow');

			$('.button.privacy-levels').addClass('privacy-settings').removeClass('privacy-levels');
			$('.button.privacy-settings a').text(settings.various.editPrivacySettingsText).attr('aria-label', settings.various.editPrivacySettingsText);

			$('#users.item.profile .toolbar .button.privacy-settings').unbind('click').on('click', function()
			{
				var profileEditLink = $('a[id*="_lnkEditProfile"]').attr('href');

				window.location = profileEditLink + '#tab=settingsTab';
			});

			return false;
		});

		$('#toolbarTop .button.edit-privacy-settings').unbind('click').click(function()
		{
			var profileEditLink = $('a[id*="_lnkEditProfile"]').attr('href');

			window.location = profileEditLink + '#tab=settingsTab';

			return false;
		});

		$('#toolbarTop .button.show-privacy-levels').unbind('click').click(function()
		{
			$('#users.item.profile .toolbar .button.privacy-levels').click();

			return false;
		});


	}

	// Profile items.
	$("#users.item .profileItem").each(function()
	{
		var profileItem = $(this);

		profileItem.find(".profileItemContent span").each(function()
		{
			if ($(this).html().length > 0)
			{
				// Show profile item and read more button.
				$("#users.item .button.showMore").removeClass("hide");
				profileItem.removeClass("hide");

				return false;
			}
		});
	});

	// Login as user button.
	if ($("#users.item #toolbarBottom .button.login input").length > 0)
	{
		$("#users.item #toolbarBottom .button.login a, #toolbarTop a.login").unbind("click").click(function()
		{
			$("#toolbarBottom .button.login input").click();

			return false;
		}).removeClass("hide").parent().removeClass("hide");
	}

	// Edit user.
	if ($("#users.item.edit").length > 0)
	{
		// Move fields.
		$("#profileExtraInformation").append($(".field.phone, .field.phone2, .field.mobile, .field.fax")).append($(".field.personalTitle")).append($(".field.birthDate, .field.gender")).append($(".field.memo"));
		$("#settingsTabContent").append($("#profileFiles"));
		//Move personal links
		var personalLinks = $("#profileFiles, #profileLinks");
		personalLinks.insertAfter($("#accountTabContent").find($(".field.memo")));
		$("#imageTabContent").append($("#profilePhoto"));

		// Profile files.
		if ($("#extraTabContent .upload").length > 0)
		{
			// Move upload field.
			$("#settingsTabContent #profileFiles").prepend($("#extraTabContent .upload").parent());

			if ($("#extraTabContent input, #extraTabContent select, #extraTabContent textarea").length == 0)
			{
				// Hide "extra" tab if there are no more custom fields.
				$("#extraTab").addClass("hide");
			}
		}

		if ($('[id$=_pnlOverlayAccountInfo]').length > 0 && $('[id$=_pnlInputValidator]').length > 0) {
			$('.overlayItemContent').append($("[id$=_pnlInputValidator]"));
		}
	}

	// Clickable phone number on Android devices.
	if (typeof bowser !== "undefined" && bowser != null && bowser.android)
	{
		$("#users .phone").not(".field.phone").each(function()
		{
			var phoneNumber = $(this).html();

			$(this).html("<a href=\"tel:" + phoneNumber + "\">" + phoneNumber + "</a>");
		});
	}

	$.fn.initializePagingButtons();
	$.fn.initializeUserSearchFilters();
};

// Create profile image thumbnails.
$.fn.createProfileThumbnails = function()
{
	$(this).each(function()
	{
		var itemImage = $(this);
		var editLink = $("#users.item .toolbar .button.edit a").attr("href");

		if (itemImage.find("img").length > 0)
		{
			itemImage.addClass("hasImage");
			itemImage.find(".noImage:first").addClass("hide");

			// Create thumbnail.
			itemImage.find("img").nailthumb(
			{
				preload:		false,
				width: 			settings.images.largeAvatarWidth,
				height: 		settings.images.largeAvatarHeight,
				fitDirection: 	"center center",
				maxEnlargement:	1
			});
		}
		else
		{
			// No image.
			if (editLink != undefined && itemImage.find(".uploadImage").length > 0)
			{
				itemImage.find(".noImage:first").addClass("hide");
				itemImage.find(".noImage:last").removeClass("hide");
			}
		}

		if (editLink != undefined)
		{
			// Link to image tab.
			itemImage.unbind("click").click(function()
			{
				if (editLink.indexOf("imageTab") == -1)
				{
					editLink += "#tab=imageTab";
				}

				document.location.href = editLink;

				return false;
			}).addClass("pointer");

			itemImage.attr({ role: 'button', tabindex: 0 });
		}
	});
};

// User search filters.
$.fn.initializeUserSearchFilters = function()
{
	if ($('#users.section .searchUsers input:submit').length > 0 || $('#users.section .search .button.icon-search').length > 0)
	{
		var searchInput = $('.sectionOptions .search input:text');

		// Establishments dropdown.
		if ($('.sectionOptions .establishments').length > 0)
		{
			var establishmentFilter = $('.sectionOptions .establishments');

			if (settings.webGuidelines)
			{
				if ($('.sectionOptions .button.applyEstablishmentsFilter').length == 0)
				{
					var establishmentFilterButton = $('<div />').addClass('button applyEstablishmentFilter icon-awesome-filter before float left'),
						establishmentFilterButtonInput = $('<input />').prop('type', 'button').prop('aria-label', settings.buttons.filterByEstablishmentText).val(settings.buttons.filterByText);

					establishmentFilterButtonInput.unbind('click').click(function()
					{
						$('.sectionOptions .search > input:text').val('');
						$('.sectionOptions .search > .button a')[0].click();
					});

					establishmentFilterButton.append(establishmentFilterButtonInput);
					establishmentFilterButton.insertAfter(establishmentFilter);
				}
			}
			else
			{
				$('.sectionOptions .establishments').change(function()
				{
					$('.sectionOptions .search input:text').val('');
					$('.sectionOptions .search > .button a')[0].click();
				});
			}
		}

		if (!settings.webGuidelines)
		{
			$('.filterUsers').unbind('change').change(function()
			{
				filterUsers();
			});
		}
		else
		{
			// Sort By dropdown.
			if ($('.sectionOptions .sortBy').length > 0)
			{
				var sortByFilter = $('.sectionOptions .sortBy');

				if ($('.sectionOptions .button.applySortByFilter').length == 0)
				{
					var sortByFilterButton = $('<div />').addClass('button applySortByFilter icon-awesome-filter before float left'),
						sortByFilterButtonInput = $('<input />').prop('type', 'button').prop('aria-label', settings.buttons.sortByText).val(settings.buttons.sortByText);

					sortByFilterButtonInput.unbind('click').click(function()
					{
						filterUsers();
					});

					sortByFilterButton.append(sortByFilterButtonInput);
					sortByFilterButton.insertAfter(sortByFilter);
				}
			}

			// Sort Order dropdown.
			if ($('.sectionOptions .sortOrder').length > 0)
			{
				var sortOrderFilter = $('.sectionOptions .sortOrder');

				if ($('.sectionOptions .button.applySortOrderFilter').length == 0)
				{
					var sortOrderFilterButton = $('<div />').addClass('button applySortOrderFilter icon-awesome-filter before float left'),
						sortOrderFilterButtonInput = $('<input />').prop('type', 'button').prop('aria-label', settings.buttons.sortByText).val(settings.buttons.sortByText);

					sortOrderFilterButtonInput.unbind('click').click(function()
					{
						filterUsers();
					});

					sortOrderFilterButton.append(sortOrderFilterButtonInput);
					sortOrderFilterButton.insertAfter(sortOrderFilter);
				}
			}

			// Sort By dropdown.
			if ($('.sectionOptions .filterUserFollowing').length > 0)
			{
				var userFollowingFilter = $('.sectionOptions .filterUserFollowing');

				if ($('.sectionOptions .button.applyUserFollowingFilter').length == 0)
				{
					var userFollowingFilterButton = $('<div />').addClass('button applyUserFollowingFilter icon-awesome-filter before float left'),
						userFollowingFilterButtonInput = $('<input />').prop('type', 'button').prop('aria-label', settings.buttons.filterByText).val(settings.buttons.filterByText);

					userFollowingFilterButtonInput.unbind('click').click(function()
					{
						filterUsers();
					});

					userFollowingFilterButton.append(userFollowingFilterButtonInput);
					userFollowingFilterButton.insertAfter(userFollowingFilter);
				}
			}
		}

		if (!$('.item .sortOptions').hasClass('hide'))
		{
			$.each($('.item'), function()
			{
				$(this).find('.itemContent').css('padding-top', $(this).find('.sortOptions').height() + 10);
			})
		}

		// No results.
		if ($('#users.section .item:not(.noSearchResults)').length == 0 && $('#users.section .item.noSearchResults').length > 0 && searchInput.val() != '' && searchInput.val() != settings.fields.searchFieldText)
		{
			var selectedSearchFields = "";

			$('#searchCriteriaDropdown .selected label').each(function(i)
			{
				if (i > 0)
					selectedSearchFields += ', ';

				selectedSearchFields += $(this).html();
			});

			$('.noSearchResults').html($('.noSearchResults').html().replace('{0}', searchInput.val()).replace('{1}', selectedSearchFields));
		}
	}
};

function filterUsers()
{
	if ($('#users.section .searchUsers input:submit').length > 0)
		$('#users.section .searchUsers input:submit')[0].click();
	else if ($('#users.section .search .button.icon-search').length > 0)
		$('#users.section .search .button.icon-search a')[0].click();
}

// User add & edit
$.fn.initializeAddEditUser = function()
{
	var container = $(this);

	container.find(".username input:text, .email input:text").blur(function()
	{
		// Remove special characters from username.
		$(this).val($.fn.removeSpecialCharacters($(this).val(), "email"));
	});
};

// Display paging buttons when input.
$.fn.initializePagingButtons = function ()
{
	$("#users.section .toolbar.paging .button.readMore").each(function()
	{
		if ($(this).find("input").length > 0)
		{
			$(this).removeClass("hide");
			$(this).parent().show();
		}
	});
}
