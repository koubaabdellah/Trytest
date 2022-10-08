var intervalCounter;

$(document).ready(function()
{
	// Add custom link in the top.
	var topLink = $('<div class="button linkBtn"><a href="/projectkaart/werkzaamheden/default.aspx" class="linkBtn"><img src="/communities/common/images/a16 rotterdam/template/pion.svg" />Werkzaamheden</a></div>');
	$('#top').append(topLink);

	intervalCounter = setInterval(function()
	{
		updateSliderTitles();
	}, 200);

	if ($('#news.section').length > 0)
	{
		$('#news .sectionTitle, #news.section .itemTitle').addClass('hide');

		$('#news.section .item').each(function()
		{
			updateNewsTitles($(this), 'section');
		});
	}

	if ($('#news.item:not(.edit)').length > 0)
		truncateNewsItemTitle();

	Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, arguments)
	{
		if ($('#news.section').length > 0)
		{
			$('#news .sectionTitle, #news.section .itemTitle').addClass('hide');

			$('#news.section .item').each(function()
			{
				updateNewsTitles($(this), 'section');
			});
		}
	});

	if (typeof mettWidgets !== 'undefined')
	{
		mettWidgets.each(function()
		{
			var currentWidget = $(this);

			currentWidget.data('class').complete(function(widgetObject)
			{
				if (widgetObject.mTemplateVariables.type == 'items' && widgetObject.mTemplateVariables.itemType == '3')
				{
					$.each(currentWidget.find('.carouselSlide'), function(i, val)
					{
						updateNewsTitles($(val), 'widget');
					});
				}
			});
		});
	}

	function updateNewsTitles(item, container)
	{
		var itemTitle = '';

		if (container === 'section')
			itemTitle = item.find('.itemTitleLink');
		else if (container === 'widget')
			itemTitle = item.find('.itemTitle');

		// Convert category in title to block.
		if (itemTitle !== '' && itemTitle.html().indexOf('[') > -1 && itemTitle.html().indexOf(']') > -1)
		{
			var category = $('<div class="news-category"></div>');
			var categoryContent = itemTitle.html().substring(itemTitle.html().indexOf('[') + 1, itemTitle.html().indexOf(']')).toLowerCase();

			// Remove date from title and show title.
			itemTitle.html($.trim(itemTitle.html().replace('[' + categoryContent + ']', ''))).parent().removeClass('hide');

			category.append($('<span class="cat-label">' + categoryContent + '</span>'));

			var imageDir = '/communities/common/images/a16 rotterdam/template/',
				imageUrl = '',
				imageAlt = '';

			// Add category image.
			switch (categoryContent)
			{
				case 'goeie vraag':
					imageUrl = 'goeie_vraag.png';
					imageAlt = 'Categorie Goeie Vraag';
					break;
				case 'vlog':
					imageUrl = 'vlog.svg';
					imageAlt = 'Categorie vlogs';
					break;
				case 'interview':
					imageUrl = 'interview.svg';
					imageAlt = 'Categorie interviews';
					break;
				case 'nieuws':
					imageUrl = 'nieuws.svg';
					imageAlt = 'Categorie nieuws';
					break;
				case 'artikel':
					imageUrl = 'artikel.svg';
					imageAlt = 'Categorie artikelen';
					break;
				case 'beeld':
					imageUrl = 'beeld.svg';
					imageAlt = 'Categorie afbeeldingen';
					break;
				case 'video':
					imageUrl = 'video.svg';
					imageAlt = 'Categorie video&#39;s';
					break;
			}

			// Append image if imageUrl is not empty.
			if (imageUrl != '')
				category.append($('<span class="cat-icon"><img src="' + imageDir + imageUrl + '" alt="' + imageAlt + '" /></span>'));

			// Append category.
			if (container === 'section')
				item.find('.itemContentLeft').append(category);
			else if (container === 'widget')
				item.find('.contentBlock .itemContentLeft > .row:eq(0)').append(category);
		}
		else
			itemTitle.parent().removeClass('hide');
	}

	function truncateNewsItemTitle()
	{
		if ($('#news.item h1 span').length > 0 && $('#news.item h1 span').html().indexOf("[") > -1 && $('#news.item h1 span').html().indexOf("]") > -1)
		{
			var title = $('#news.item h1 span').html();
			var dateContent = title.substring(title.indexOf("[") + 1, title.indexOf("]"));

			$('#news.item h1 span').html($.trim(title.replace("[" + dateContent + "]", "")));
		}
	}

	// Fullscreen iFrame.
	if (settings.section.ID === 153547 || settings.section.ID === 225226)
	{
		$('.shortcutsContainer, .logoContainer, #pathOptions, #bottom, #spacerBottom').addClass('hide');
		$('.no-touch body').css('overflow', 'hidden');
		$('#content').css('padding', 0);

		if (settings.section.ID === 153547)
			$('#content').html('<iframe id="tikFrame" src="//rijkswaterstaat.projectatlas.app/a16-rotterdam/tracekaart/" scrolling="no" style="width:100%;" />');

		if (settings.section.ID === 225226)
			$('#content').html('<iframe id="tikFrame" src="//rijkswaterstaat.projectatlas.app/a16-rotterdam/werkzaamheden/" scrolling="no" style="width:100%;" />');

		$(window).resize();
	}

	updateMobileChanges();
});

function updateSliderTitles()
{
	if ($('#royalSlider').length > 0)
	{
		var sliderInstance = $('.slider .royalSlider').data('royalSlider');
		var wrapIt = function()
		{
			$('#royalSlider .rsABlock.rsContent').each(function()
			{
				var currentBlock = $(this);

				if (currentBlock.find('.slideContent').length == 0)
				{
					currentBlock.find('.rsABlock').wrapAll('<div class="slideContent" />');

					if (currentBlock.find('.rsSlideDescription').length > 0)
						currentBlock.find('.slideContent').addClass('hasDescription');
				}
			});
		};

		if (sliderInstance != undefined)
		{
			sliderInstance.ev.on('rsAfterContentSet', function()
			{
				wrapIt();
			});

			wrapIt();

			$(window).resize();

			clearInterval(intervalCounter);
		}
	}
}

function updateMobileChanges()
{
	$('#top .row.logoContainer .twelve.columns a[title="Home"] *').remove();

	$('#top .row.logoContainer .twelve.columns a[title="Home"]').append('<h1>A16 Rotterdam</h1>');
	$('#top .row.logoContainer .twelve.columns a[title="Home"]').append('<span>Rotterdam en Lansingerland beter bereikbaar en leefbaar</span>');

	var linkBtn = $(".button.linkBtn");

	if ($('html.mobile').length > 0 && $(window).width() <= 768)
	{
		linkBtn.parent().prepend(linkBtn);
	}
	else
	{
		linkBtn.parent().append(linkBtn);
	}

	$.fn.initializeSpacers();
}

$(window).resize(function()
{
	// Resize iFrame.
	if (settings.section.ID == 153547 || settings.section.ID === 225226)
		$('#tikFrame').height($('body').height() - 60);

	// Update position of yellow header button
	if ($(window).width() <= 1440)
		$('#top .row.logoContainer .twelve.columns').append($('#top > .button.linkBtn'));
	else
		$('#top').append($('#top .row.logoContainer .twelve.columns .button.linkBtn'));

	updateMobileChanges();
});
