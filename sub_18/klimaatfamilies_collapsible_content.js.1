$(document).ready(function()
{
	// Initialize after AJAX call.
	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function (sender, arguments)
		{
			if ($('.collapsible-item').length > 0)
				hideCollapsibleContent();
		});
	}

	if ($('.collapsible-item').length > 0)
		hideCollapsibleContent();
});

//Hide content where a hr is inserted and show a read more button.
function hideCollapsibleContent()
{
	$('.collapsible-item').each(function()
	{
		var item = $(this);

		if (item.find('hr').length > 0)
			item.html(item.html().replace(/<hr *\/?>/gi, '<div class="readMoreContent displayNone">') + '</div><a href="/" class="readMore icon-plus before" aria-expanded="false"><span>Lees meer</span></a>');

		item.find('.readMore').click(function()
		{
			item.find('.readMoreContent').slideToggle(300);

			if ($(this).html().indexOf('meer') > -1)
				$(this).html($(this).html().replace('meer', 'minder')).removeClass('icon-plus').addClass('icon-minus').attr('aria-expanded', 'true');
			else
				$(this).html($(this).html().replace('minder', 'meer')).removeClass('icon-minus').addClass('icon-plus').attr('aria-expanded', 'false');

			return false;
		});
	});
}
