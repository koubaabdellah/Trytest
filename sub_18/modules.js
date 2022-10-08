$(window).load(function()
{
	// Create thumbnails (window.load prevents preloading issues).
	setTimeout(function()
	{
		$(".section .itemImage").not(".updateImage").createModuleThumbnails();
	}, 1000);
});

$(document).ready(function()
{
	// Initialize.
	$.fn.initializeModules();

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		// After AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, e)
		{
			$.fn.initializeModules();

			// Create thumbnails.
			setTimeout(function()
			{
				$(".section .itemImage").not(".updateImage").createModuleThumbnails();
			}, 1000);
		});
	}
});

// Initialize modules.
$.fn.initializeModules = function()
{
	// Section options.
	if (($(".sectionOptions").find("a, input").length > 0 && $(".sectionOptions").find(".button a, .button input").length > $(".sectionOptions").find(".button.hide a, .button.hide input").length) || $(".sectionOptions").find("select").length > 0)
	{
		$(".sectionTitle").removeClass("moreMargin");

		// Search.
		if ($(".sectionOptions .search").length > 0)
		{
			$(".sectionOptions .search").initializeSearch();

			$(".sectionOptions .tagSearchLink").unbind("click").click(function()
			{
				$(this).attr("href", "/shortcuts/search_search.aspx?tag=" + $(".sectionOptions .search input:text").val());
			});

			// No results.
			if ($('.sectionContent .item:not(.noSearchResults)').length == 0 && $('.sectionContent .item.noSearchResults').length > 0 && $('.sectionOptions .search input:text').val() != '' && $('.sectionOptions .search input:text').val() != settings.fields.searchFieldText)
			{
				var searchInput = $('.sectionOptions .search input:text');

				$('.noSearchResults').html($('.noSearchResults').html().replace('{0}', searchInput.val()));
				$('.noSearchResults').removeClass('hide');
				$('.sectionContent .paging').addClass('hide');
			}
		}

		// Sorter.
		if ($('.sectionOptions .sorter').length > 0)
		{
			var sorter = $('.sectionOptions .sorter');
			var sorterName = $(this).prop('name');

			if (settings.webGuidelines)
			{
				if ($('.sectionOptions .button.applySorting').length == 0)
				{
					var sortButton = $('<div />').addClass('button applySorting icon-awesome-sort before float left');
					var sortButtonInput = $('<input />').prop('type', 'button').val(settings.buttons.sortByText);

					sortButtonInput.unbind('click').click(function()
					{
						__doPostBack(sorterName, '');
					});

					sortButton.append(sortButtonInput);
					sortButton.insertAfter(sorter);
				}
			}
			else
			{
				sorter.unbind('change').change(function()
				{
					setTimeout(function()
					{
						__doPostBack(sorterName, '');
					}, 0);
				});
			}
		}

		// Tag filter.
		if ($('.sectionOptions .tagFilter').length > 0)
		{
			var tagFilter = $('.sectionOptions .tagFilter');
			var tagFilterName = $(this).prop('name');

			if (settings.webGuidelines)
			{
				if ($('.sectionOptions .button.applyTagFilter').length == 0)
				{
					var tagFilterButton = $('<div />').addClass('button applyTagFilter icon-awesome-filter before float left');
					var tagFilterButtonInput = $('<input />').prop('type', 'button').prop('aria-label', settings.buttons.filterByTagText).val(settings.buttons.filterByText);

					tagFilterButtonInput.unbind('click').click(function()
					{
						if ($.isNumeric(tagFilter.val()))
							__doPostBack(tagFilterName, '');
						else
							document.location.href = "?filter=" + encodeURIComponent(tagFilter.val());
					});

					tagFilterButton.append(tagFilterButtonInput);
					tagFilterButton.insertAfter(tagFilter);
				}
			}
			else
			{
				tagFilter.unbind('change').change(function()
				{
					if ($.isNumeric(tagFilter.val()))
					{
						setTimeout(function()
						{
							__doPostBack(tagFilterName, '');
						}, 0);
					}
					else
						document.location.href = "?filter=" + encodeURIComponent(tagFilter.val());
				});
			}

			// Select tag filter by querystring.
			if ($('.section').data('tag-filter-initialized') == undefined && $.fn.getQueryString('filter') != '' && tagFilter.find('option:selected').val() == -1)
			{
				var selectedTag = $.fn.getQueryString('filter').toLowerCase();
				var selectedTagValue = -1;

				tagFilter.find('option').each(function()
				{
					if ($(this).text().toLowerCase() == selectedTag)
						selectedTagValue = $(this).val();
				});

				if (selectedTagValue > -1 && $(this).find('option:selected') != selectedTagValue)
				{
					$('.section').data('tag-filter-initialized', true);
					tagFilter.val(selectedTagValue);
					tagFilter.change();
				}
			}
		}

		// Category filter.
		if ($('.sectionOptions .categoryFilter').length > 0)
		{
			var categoryFilter = $('.sectionOptions .categoryFilter');

			if (settings.webGuidelines)
			{
				if ($('.sectionOptions .button.applyCategoryFilter').length == 0)
				{
					var categoryFilterButton = $('<div />').addClass('button applyCategoryFilter icon-awesome-filter before float left');
					var categoryFilterButtonInput = $('<input />').prop('type', 'button').prop('aria-label', settings.buttons.filterByCategoryText).val(settings.buttons.filterByText);

					categoryFilterButtonInput.unbind('click').click(function()
					{
						document.location.href = "?category=" + encodeURIComponent(categoryFilter.val());
					});

					categoryFilterButton.append(categoryFilterButtonInput);
					categoryFilterButton.insertAfter(categoryFilter);
				}
			}
			else
			{
				categoryFilter.unbind('change').change(function()
				{
					document.location.href = "?category=" + encodeURIComponent(categoryFilter.val());
				});
			}
		}

		if ($(".sectionOptions").find("select, input:text").length == 0)
		{
			// Less margin.
			$(".sectionOptions").addClass("lessMargin");
		}

		$(".sectionOptions").removeClass("hide");
	}

	// View options.
	if ($(".section").length > 0)
	{
		$(".viewOptions .button").each(function()
		{
			var button = $(this),
				buttonLink = button.find("a"),
				buttonViewType = button.data("view-type"),
				buttonThumbnailSize = button.data("view-thumbnail-size"),
				viewTypeLabel = '';

			if ($('#users.section').length > 0)
			{
				if (buttonViewType == 'list-view')
					viewTypeLabel = settings.various.listViewText;
				else if (buttonViewType == 'grid-view')
					viewTypeLabel = settings.various.gridViewText;
			}
			else if ($('#documents-v3.section').length > 0)
			{
				if (buttonViewType == 'list-view')
					viewTypeLabel = settings.various.compactListViewText;
				else if (buttonViewType == 'grid-view')
					viewTypeLabel = settings.various.completeListViewText;
			}

			// Initialize.
			if ($(".section").hasClass(buttonViewType))
			{
				// Select current view.
				button.addClass("selected");

				if ($('.chosenViewLabel.screenReaderContent').length > 0)
					$('.chosenViewLabel.screenReaderContent').text(settings.events.chosenViewText + ' ' + viewTypeLabel);
				else
					$('.sectionOptions .viewOptions').prepend('<span class="chosenViewLabel screenReaderContent">' + settings.events.chosenViewText + ' ' + viewTypeLabel + '</span>');

				if (buttonThumbnailSize != undefined)
				{
					// Set thumbnail size (thumbnail generation is done in the window.load()).
					$(".itemImage").removeClass("micro mini small medium large").addClass(buttonThumbnailSize);
				}
			}

			buttonLink.unbind("click").click(function()
			{
				// Reset.
				$(".section").removeClass("grid-view list-view");
				$(".viewOptions .button").removeClass("selected");

				// Set view type.
				$(".section").addClass(buttonViewType);

				$('.chosenViewLabel.screenReaderContent').text(settings.events.chosenViewText + ' ' + viewTypeLabel);

				if (buttonThumbnailSize != undefined)
				{
					// Set thumbnail size & re-create thumbnails.
					$(".itemImage").removeClass("micro mini small medium large").addClass(buttonThumbnailSize).createModuleThumbnails();
				}

				button.addClass("selected");

				return false;
			});
		});
	}

	// List items.
	$(".section .item, .section .list .row, .section .listAlternative .row").each(function()
	{
		var item = $(this);
		var itemLink = item.find(".itemTitle a, a.itemTitle, a.itemTitleLink");
		var itemImage = item.find(".itemImage");
		var deleteButton = item.find(".toolbar").find(".button.delete a, .button.delete input, .dropDown a.delete");

		// Search.
		if ($("#search").length > 0)
		{
			if (item.find(".itemTitleLink").length > 0)
			{
				// Hide section title.
				itemLink.eq(0).addClass("hide");

				// Show path.
				item.find(".itemPath").removeClass("hide");

				// Set item link.
				itemLink = itemLink.eq(1);

				// Check description length.
				if (item.find(".itemDescription span:first").html().length > 0)
					item.find(".itemDescription").removeClass("hide");

				// Icon.
				var itemIcon = "icon-layout";

				if (itemLink.html().indexOf(".") > -1)
				{
					// File icon.
					itemIcon = "icon-awesome-file-" + $.fn.getFileType(itemLink.html().split(".").pop());
				}

				// Change icon.
				item.find(".itemImage .noImage").removeClass("icon-doc-text").addClass(itemIcon);
			}

			var searchTitle = item.find(".itemTitle a").not(".hide").html();
			var itemImage = item.find(".itemImage");
			//var searchTerm = getUrlParameter('search');

			item.find(".searchTitle").html(searchTitle);
			itemImage.removeAttr('title').css('cursor', 'default');

			item.find('.itemDescription').html(item.find('.itemDescription').html().replace(/<\/?([b-z]+)[^>]*>/gi, function(match, tag)
			{
				return (tag === 'a') ? match : '';
			}));
		}

		// Change image sizes, depending on chosen layout.
		if ($(".six.columns .section, .nine.columns .section, .ten.columns .section, .eleven.columns .section, .twelve.columns .section").length == 0 && itemImage.hasClass("medium"))
		{
			// Replace medium images for small images.
			itemImage.removeClass("medium").addClass("small");
		}

		// Read more (avatar).
		if (item.find(".itemInformation .author").is("a"))
		{
			item.find(".itemInformation .avatar").unbind("click").click(function()
			{
				document.location.href = item.find(".itemInformation .author").attr("href");

				return false
			}).addClass("pointer");
		}

		// Read more (description).
		if (itemLink.attr("href") != undefined)
		{
			var elementToClick = item.find(".itemDescription");

			if ($("#users.section").length > 0)
			{
				elementToClick = item;
			}

			elementToClick.unbind("click").click(function(event)
			{
				// Keep other links in container clickable.
				if (event.target.nodeName != "A" && event.target.nodeName != "INPUT")
				{
					document.location.href = itemLink.attr("href");

					return false;
				}
			}).addClass("pointer");
		}

		// Item image.
		if (itemImage.find(".toolbar .button a, .toolbar .button input").length > 0)
		{
			// Sign up, voting, etc.
			itemImage.removeAttr("title");
			itemImage.find(".itemImageLink").removeAttr("href").css("cursor", "default");
			itemImage.find(".noImage").addClass("hide");
			itemImage.find(".toolbar").removeClass("hide").show();
		}
		else
		{
			// Read more (image).
			if (itemLink.attr("href") != undefined)
			{
				itemImage.unbind("click").click(function()
				{
					document.location.href = itemLink.attr("href");

					return false;
				}).addClass("pointer");
			}
		}

		// Delete buttons (with or without Webguidelines enabled).
		if (deleteButton.length > 0)
		{
			if (typeof $._data(deleteButton[0], "events") != "undefined" && $.isArray($._data(deleteButton[0], "events").click))
			{
				// Delete warning.
				$._data(deleteButton[0], "events").click[0].handler = function()
				{
					var recurID = $(this).parent().data('recurrence-id');

					if ($('.sectionContent .list').length > 0)
						var itemTitle = $.trim($(this).closest('.row').find('.itemTitleLink').text());
					else
						var itemTitle = $.trim($(this).closest('.item').find('.itemTitle').text());

					if (recurID != undefined && recurID > 0)
						return $(this).confirm(settings.warnings.deleteRecurringItemText);
					else
						return $(this).confirm(settings.warnings.deleteItemText.replace("{0}", "\"<span class=\"strong\">" + itemTitle + "</span>\"").replace("{1}", settings.cms.daysInTrash));
				};
			}
			else
			{
				// Delete warning.
				deleteButton.click(function()
				{
					var recurID = $(this).parent().data('recurrence-id');

					if ($('.sectionContent .list').length > 0)
						var itemTitle = $.trim($(this).closest('.row').find('.itemTitleLink').text());
					else
						var itemTitle = $.trim($(this).closest('.item').find('.itemTitle').text());

					if (recurID != undefined && recurID > 0)
						return $(this).confirm(settings.warnings.deleteRecurringItemText);
					else
						return $(this).confirm(settings.warnings.deleteItemText.replace("{0}", "\"<span class=\"strong\">" + itemTitle + "</span>\"").replace("{1}", settings.cms.daysInTrash));
				});
			}
		}

		// Item comment fields.
		item.find(".addItemComment").initializeItemCommentFields();

		// Comment count.
		if (itemLink.attr("href") != undefined)
		{
			item.find(".commentCount, .addComment, .itemCommentCount").unbind("click").click(function()
			{
				document.location.href = itemLink.attr("href") + "#comments";

				return false;
			});
		}

		// Sticky.
		if (item.find(".sticky").length > 0 && item.find(".sticky").html() != "")
		{
			item.find(".icon").removeClass().addClass("icon icon-awesome-pin before");
		}
	});

	// Comment count (item).
	if ($(".currentCommentCount input").length > 0)
	{
		var currentCommentCount = $(".currentCommentCount input").val();
		var totalCommentCount = $(".addCommentCount").data("total-comment-count") || $(".addCommentCount").html();
		var commentsText = settings.various.commentsText.toLowerCase();

		if (currentCommentCount == 1)
		{
			commentsText = settings.various.commentText.toLowerCase();
		}

		if (totalCommentCount > currentCommentCount)
		{
			currentCommentCount = currentCommentCount + " " + settings.various.offText + " " + totalCommentCount;
		}

		$(".addCommentCount").html(currentCommentCount).data("total-comment-count", totalCommentCount);
		$(".addCommentCountText").html(commentsText);
	}

	// Updates.
	$(".widget-updates").find(".update").each(function()
	{
		$(this).createClickableLinks();
	});

	// Message.
	if ($(".showMessage").length > 0)
	{
		var showMessage = $(".showMessage");

		if (showMessage.find("input:checkbox").is(":checked") && showMessage.data("message") != undefined)
		{
			$("body").showMessage({ content: showMessage.data("message") });
		}
	}

	// Polls.
	$(".question[data-poll-id]").each(function()
	{
		var currentPoll = $(this);

		currentPoll.find("input[type='submit']").click(function()
		{
			$.fn.setPollVote(currentPoll, currentPoll.attr("data-poll-id"));
		});
	});

	// Publish date.
	if ($('#documents-v3').length === 0)
		$(".item, .gridItem, .timelineItem").initializeScheduledPublishDate();

	if ($('#forms.section').length > 0)
		$('.list .row:not(.header)').initializeScheduledPublishDate();

	// Init section filters
	if ($('.sectionFilters').length > 0)
		$.fn.initializeSectionFilters();
};

// Create module image thumbnails.
$.fn.createModuleThumbnails = function()
{
	$(this).each(function()
	{
		var itemImage = $(this);

		// Medium or small images.
		if (itemImage.find("img").length > 0 && (itemImage.hasClass("medium") || itemImage.hasClass("small") || itemImage.hasClass("mini") || itemImage.hasClass("micro")))
		{
			var img = itemImage.find('img');

			function imgLoaded()
			{
				if (img[0].complete)
					imgComplete()
				else
					img.on('load', imgLoaded);
			}

			function imgComplete()
			{
				var thumbnailWidth = 0,
					thumbnailHeight = 0;

				itemImage.addClass("hasImage").removeClass("hide");
				itemImage.find(".noImage").addClass("hide");

				if (itemImage.data("thumbnail-width") != undefined)
					thumbnailWidth = itemImage.data("thumbnail-width");

				if (itemImage.data("thumbnail-height") != undefined)
					thumbnailHeight = itemImage.data("thumbnail-height");

				// Medium.
				if (itemImage.hasClass("medium"))
				{
					if (thumbnailHeight == 0)
						thumbnailHeight = settings.images.mediumThumbnailHeight;

					// Create medium thumbnail.
					itemImage.find("img").nailthumb(
					{
						preload: false,
						nostyle: true,
						height: thumbnailHeight,
						fitDirection: "center center",
						maxEnlargement: 1
					});
				}

				// Small.
				if (itemImage.hasClass("small"))
				{
					if (thumbnailWidth == 0)
						thumbnailWidth = settings.images.smallThumbnailWidth;

					if (thumbnailHeight == 0)
						thumbnailHeight = settings.images.smallThumbnailHeight;

					// Create small thumbnail.
					itemImage.find("img").nailthumb(
					{
						preload: false,
						nostyle: true,
						width: thumbnailWidth,
						height: thumbnailHeight,
						fitDirection: "center center",
						maxEnlargement:	1
					});
				}

				// Mini.
				if (itemImage.hasClass("mini"))
				{
					if (thumbnailWidth == 0)
						thumbnailWidth = settings.images.miniThumbnailWidth;

					if (thumbnailHeight == 0)
						thumbnailHeight = settings.images.miniThumbnailHeight;

					// Create mini thumbnail.
					itemImage.find("img").nailthumb(
					{
						preload: false,
						nostyle: true,
						width: thumbnailWidth,
						height: thumbnailHeight,
						fitDirection: "center center",
						maxEnlargement: 1
					});
				}

				// Micro
				if (itemImage.hasClass("micro"))
				{
					if (thumbnailWidth == 0)
						thumbnailWidth = settings.images.microThumbnailWidth;

					if (thumbnailHeight == 0)
						thumbnailHeight = settings.images.microThumbnailHeight;

					// Create micro thumbnail.
					itemImage.find("img").nailthumb(
					{
						preload: false,
						nostyle: true,
						width: thumbnailWidth,
						height: thumbnailHeight,
						fitDirection: "center center",
						maxEnlargement: 1
					});
				}

				if (img.width() > img.height())
					itemImage.addClass('landscape');
				else if (img.width() < img.height())
					itemImage.addClass('portrait');
			}

			imgLoaded();
		}
	});
};

// Item comment fields.
$.fn.initializeItemCommentFields = function()
{
	$(this).each(function()
	{
		var inputField = $(this).find("textarea");
		var submitButton = $(this).find("input:submit");

		// Reset.
		inputField.val(settings.fields.commentFieldText);

		inputField.focus(function()
		{
			if (inputField.val() == settings.fields.commentFieldText)
			{
				inputField.val("");
			}
		});

		inputField.blur(function()
		{
			if (inputField.val() == "")
			{
				inputField.stop(true);
				inputField.val(settings.fields.commentFieldText);
			}
		});

		submitButton.click(function()
		{
			var errors = [],
				commentFieldText;

			if ($('#documents-v3').length > 0)
			{
				var commentFieldContainer = submitButton.parent().parent().siblings('.mtaContainer');
				commentFieldText = $.trim(commentFieldContainer.find('textarea').val());
			}
			else
				commentFieldText = $.trim($('#addComment .editor iframe').contents().find('body').text());

			if (commentFieldText == "" || commentFieldText == settings.fields.commentFieldText)
				errors.push(settings.errors.noCommentText + " (500.24)");

			if (!$.fn.mettHCaptchaIsValid())
				errors.push(settings.errors.invalidHCaptchaText + " (500.106)");

			if (errors.length > 0)
			{
				$.fn.showError(errors.join("<br />"));

				return false;
			}
		});

		// Initialize user tagging.
		if ($('#groups').length > 0 || $('#documents-v3').length > 0)
			inputField.mentionTextArea();
	});
};

// Scheduled publish date.
$.fn.initializeScheduledPublishDate = function()
{
	var items = $(this);

	if (items === undefined || settings.section.isAdd || settings.section.isEdit)
		return;

	items.each(function()
	{
		var item = $(this),
			publishDate = item.data('date-visible'),
			publishDateFormat = "YYYY-MM-DD H:mm",
			publishDateTextFormat = (settings.language === "en" ? "MMMM DD, YYYY [" : "DD-MM-YYYY [") + settings.various.timeText + "] H:mm";

		if (!publishDate || publishDate === "")
			return;

		publishDate = $.trim(publishDate);

		var publishDateText = moment(publishDate, publishDateFormat).format(publishDateTextFormat)

		var itemScheduled = $("<span />");
		itemScheduled.addClass("itemScheduled");
		itemScheduled.prop("title", settings.various.scheduledItemText + " " + publishDateText);

		if (!item.hasClass('row'))
			itemScheduled.text(publishDateText);

		var itemImage = item.find(".itemImage");
		var itemTitle = item.find(".itemTitle");

		if (moment(publishDate, publishDateFormat) > moment())
		{
			if (item.hasClass('row'))
				item.find('.two.columns:eq(0)').prepend(itemScheduled);
			else
			{
				if (itemImage.find(".image").length > 0 || itemImage.find(".noImage").length > 0)
				{
					if (itemImage.hasClass("small") || itemImage.hasClass("mini") || itemImage.hasClass("micro"))
						itemTitle.prepend(itemScheduled);
					else
						itemImage.prepend(itemScheduled);
				}
				else
					itemTitle.prepend(itemScheduled);
			}
		}
	});
};

$.fn.initializeSectionFilters = function()
{
	$('.sectionFilters > .button').unbind('click').on('click', function(event)
	{
		event.preventDefault();

		$(this).toggleClass('filtersActive');
		$('#sectionFilterOptions').toggleClass('visible');
	});

	if ($('.sectionOptions .sorter').length === 0)
		$('.sectionFilterOptions .datePickerWrapper').addClass('hide');

	if ($('.sectionOptions .tagFilter').length === 0)
		$('.sectionFilterOptions .tagPickerWrapper').addClass('hide');

	if ($('.sectionOptions .categoryFilter').length === 0)
		$('.sectionFilterOptions .mapCategoryPickerWrapper').addClass('hide');

	if ($('#users.section').length > 0)
	{
		if ($('.sectionOptions input[id$=_txtSearchCriteria]').length === 0)
			$('.sectionFilterOptions .searchCriteriaWrapper').addClass('hide');

		if ($('.sectionOptions .filterUsers.establishments').length === 0)
			$('.sectionFilterOptions .establishmentWrapper').addClass('hide');

		if ($('.sectionOptions .filterUsers.sortBy').length === 0)
			$('.sectionFilterOptions .sortByWrapper').addClass('hide');

		if ($('.sectionOptions .filterUsers.sortOrder').length === 0)
			$('.sectionFilterOptions .sortOrderWrapper').addClass('hide');

		if ($('.sectionOptions .filterUsers.filterUserFollowing').length === 0)
			$('.sectionFilterOptions .filterUserFollowingWrapper').addClass('hide');
	}

	if ($('.sectionFilterOptions').find('> .sectionFilterWrapper:not(.hide)').length === 0)
		$('.sectionFilters').addClass('hide');

	// Add correct 'for' params to labels
	$.each($('.sectionFilterWrapper'), function()
	{
		var fieldId = '';

		if ($(this).find('> select').length > 0)
			fieldId = $(this).find('> select').attr('id');
		else if ($(this).find('> div').length > 0)
			fieldId = $(this).find('> div').attr('id');

		$(this).find('> label').attr('for', fieldId);
	});

	// Check if there are filters active
	var countActiveFilters = 0;
	$.each($('.sectionFilterWrapper select'), function()
	{
		if ($(this)[0].selectedIndex !== 0)
			countActiveFilters++;
	});

	if (countActiveFilters > 0)
	{
		// show number of active filters in button
		$('.sectionFilters > .button a').html('Filter <span class="badge">' + countActiveFilters + '<span class="screenReaderContent">' + settings.various.filtersActiveText + '</span></span>');

		// show reset link above filters
		if ($('#sectionFilterOptions .resetFilters').length === 0)
		{
			var resetFiltersLink = $('<a />');
			resetFiltersLink.addClass('resetFilters');
			resetFiltersLink.prop('href', '#');
			resetFiltersLink.text(settings.buttons.resetFiltersLinkText);

			resetFiltersLink.unbind('click').click(function(event)
			{
				$.each($('.sectionFilterWrapper select'), function()
				{
					// prevent filter select change events
					$(this).off('change');

					// reset filter selects
					$(this)[0].selectedIndex = 0;

					// clear url params and reload window
					var clean_uri = location.protocol + "//" + location.host + location.pathname;
					window.history.replaceState({}, document.title, clean_uri);
					location.reload();
				});

				if ($('.section .searchUsers input:submit').length > 0)
					$('.section .searchUsers input:submit')[0].click();
				else if ($('.section .search .button.icon-search').length > 0)
					$('.section .search .button.icon-search a')[0].click();

				event.preventDefault();
			});

			$('#sectionFilterOptions').prepend(resetFiltersLink);
		}
	}
};
