var clickFromToggleSectionBtn = false;

$(document).ready(function()
{
	// Initialize.
	if ($('#faq.section').length > 0)
		$.fn.initializeFAQ();

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		// After AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, e)
		{
			if ($('#faq.section').length > 0)
				$.fn.initializeFAQ();
		});
	}
});

$(window).on('hashchange', function(e)
{
	if (!clickFromToggleSectionBtn)
	{
		setTimeout(function()
		{
			$.fn.updateFAQ();
		}, 50);
	}

	clickFromToggleSectionBtn = false;
});

// Initialize FAQ.
$.fn.initializeFAQ = function()
{
	if ($('#faq.section .sectionContent > .list .row.theme').length == 0)
		$('#faq.section .sectionContent > .list').addClass('no-themes');

	$.fn.updateFAQ();

	$('#faq.section .toggleSections').on('click', function(event)
	{
		event.preventDefault();

		var questionId = $(this).closest('.row').data('item-id'),
			questionOpen = $(this).closest('.row').hasClass('open'),
			toggleSections = $(this).closest('.row').find('.toggleSections:eq(0)');

		updateUrlAnchorInfo(questionId, questionOpen);

		toggleSections.find('i').toggleClass('icon-plus icon-minus');
		toggleSections.attr("aria-expanded", (!Boolean.parse(toggleSections.attr("aria-expanded"))).toString());

		$(this).parents('.row').toggleClass('open');

		if ($(this).parents('.row').hasClass('theme'))
		{
			if ($(this).parents('.row.theme').hasClass('open'))
				$(this).parents('.row').nextUntil('.theme').addClass('visible');
			else
			{
				$.each($(this).parents('.row').nextUntil('.theme'), function(i, item)
				{
					$(this).find('i').removeClass('icon-minus').addClass('icon-plus')
					$(this).attr('aria-expanded', 'false');

					updateUrlAnchorInfo($(item).data('item-id'), true);
					$(item).removeClass('visible open');
				});
			}
		}

		if ($('.answer.editorContent iframe').length > 0)
			$(window).resize();
	});

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, arguments)
		{
			// After AJAX call.
			if ($('input[id*="_txtSearch"').val() !== settings.fields.searchFieldText)
			{
				$.each($('.list .row'), function()
				{
					var questionId = $(this).data('item-id'),
						questionOpen = $(this).hasClass('open');

					updateUrlAnchorInfo(questionId, questionOpen);
				});

				if ($('.answer.editorContent iframe').length > 0)
					$(window).resize();
			}
		});
	}

	if ($.fn.getAnchor('question') == "")
		$("#faq.section .tagFilter").applyFaqTagFilter();

	$('#faq.section').find('.deleteFaq').unbind('click').click(function()
	{
		var itemTitle = $.trim($(this).closest('.row').find('h3 .title, h2 .title').text());

		if ($(this).closest('.row').hasClass('theme'))
			return $(this).confirm(settings.warnings.deleteFaqThemeText.replace("{0}", "\"<span class=\"strong\">" + itemTitle + "</span>\"").replace("{1}", settings.cms.daysInTrash));
		else
			return $(this).confirm(settings.warnings.deleteFaqQuestionText.replace("{0}", "\"<span class=\"strong\">" + itemTitle + "</span>\"").replace("{1}", settings.cms.daysInTrash));
	});
};

$.fn.updateFAQ = function()
{
	// Close opened FAQ items, reset
	$('.row[data-item-id]').removeClass('open');
	$('.toggleSections').find('i').removeClass('icon-minus').addClass('icon-plus')
	$('.toggleSections').attr('aria-expanded', 'false');
	$('.row.question').removeClass('visible');

	if ($.fn.getAnchor('question') != '')
	{
		var questionArr = $.fn.getAnchor('question').split(',');

		$.each(questionArr, function(i)
		{
			var selectedQuestion = $('.row[data-item-id="' + questionArr[i] + '"]'),
				elementToClick = selectedQuestion.find('.toggleSections:eq(0)');

			selectedQuestion.addClass('open');
			elementToClick.find('i').addClass('icon-minus').removeClass('icon-plus');
			elementToClick.attr("aria-expanded", "true");

			if (selectedQuestion.hasClass('theme'))
				selectedQuestion.nextUntil('.theme').addClass('visible');
			else
			{
				selectedQuestion.addClass('visible');

				var parentTheme = selectedQuestion.prevAll('.theme:first');

				if (parentTheme.length > 0)
				{
					var parentThemeId = parentTheme.data('item-id');

					if ($.inArray(parentThemeId, questionArr) === -1 && !parentTheme.hasClass('open'))
					{
						parentTheme.addClass('open');
						parentTheme.find('.toggleSections:eq(0) i').addClass('icon-minus').removeClass('icon-plus');
						parentTheme.find('.toggleSections:eq(0)').attr("aria-expanded", "true");
						selectedQuestion.nextUntil('.theme').addClass('visible');
					}
				}
			}
		});
	}
};

$.fn.applyFaqTagFilter = function()
{
	if ($(this).length == 0 || $(".tags").length == 0)
		return;

	var selectedTag = $(this).find("option:selected").text();
	var matchedQuestions = [];

	$(".tags").find(".tag:contains('" + selectedTag + "')").each(function()
	{
		var tag = $(this);

		if (selectedTag.toLowerCase() == tag.text().toLowerCase())
		{
			var question = tag.parents(".question");
			var questionId = question.data("item-id");
			var themeId = question.prevAll(".theme").data("item-id");

			if ($.inArray(questionId, matchedQuestions) == -1)
				matchedQuestions.push(questionId);

			if ($.inArray(themeId, matchedQuestions) == -1)
				matchedQuestions.push(themeId);
		}
	});

	if (matchedQuestions.length > 0)
	{
		// Open questions with selected tag.
		window.location.hash = "#question=" + matchedQuestions.toString();
		$.fn.initializeFAQ();
	}
};

function updateUrlAnchorInfo(questionId, removeId)
{
	var openQuestions = $.fn.getAnchor('question');

	if (openQuestions == '')
		if (!removeId)
			window.location.hash = '#question=' + questionId;
		else
			resetLocationHash();
	else
	{
		var questionArr = openQuestions.split(',');

		if (removeId && $.inArray(questionId, questionArr))
		{
			questionArr = $.grep(questionArr, function(value)
			{
				return value != questionId;
			});
		}
		else
			questionArr.push(questionId);

		if (questionArr.length == 0)
			resetLocationHash();
		else
			window.location.hash = '#question=' + questionArr.toString();
	}

	clickFromToggleSectionBtn = true;
};

function resetLocationHash()
{
	if (window.history)
		window.history.pushState('', document.title, window.location.href.replace(window.location.hash, ''));
	else
		window.location.hash = '';
};
