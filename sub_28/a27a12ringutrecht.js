$(document).ready(function()
{
	$.fn.a11yToolbar({contrast: false});

	// Fullscreen TIK app iFrame.
	if (settings.section.ID == 173456 ||
		settings.section.ID == 181051 ||
		settings.section.ID == 181169 ||
		settings.section.ID == 181170)
	{
		var tikUrl = "";
		var baseUrl = "//rijkswaterstaat.projectatlas.app/ringutrecht";

		if ($.fn.getQueryString("tikUrl") != "")
		{
			// Get url with all params.
			tikUrl = globals.url.substring(globals.url.indexOf("tikUrl") + 7, globals.url.length);

			if (!$.fn.validUrl(tikUrl) || tikUrl.indexOf(baseUrl) == -1) {
				// Default url.
				tikUrl = baseUrl + '/trace/straks?map=52.081750,5.140795,11.26,0,0';
			}
		}
		else
		{
			switch (settings.section.ID)
			{
				case 181169:
					// Ontwerp.
					tikUrl = baseUrl + "/ontwerp";
					break;
				case 181170:
					// Geluid.
					tikUrl = baseUrl + "/geluideffecten";
					break;
				default:
					// Trace.
					tikUrl = baseUrl + "/trace/straks?map=52.081750,5.140795,11.26,0,0";
			}
		}

		//$(".shortcutsContainer, .logoContainer, #pathOptions, #bottom, #spacerBottom").addClass("hide");
		$(".shortcutsContainer, .logoContainer .twelve.columns a:not(.hamburger), #pathOptions, #bottom, #spacerBottom").addClass("hide");
		$('.logoContainer .twelve.columns a.hamburger').css('right', '0');
		$(".no-touch body").css("overflow", "hidden");
		$("#content").css("padding", 0);
		$("#content").html('<iframe id="tikFrame" src="' + tikUrl + '" scrolling="no" style="width:100%;" title="Digitale projectkaart Ring Utrecht 2020" />');

		$(window).resize();
	}

	if (settings.section.itemID == 1572910 ||
		settings.section.itemID == 1572883 ||
		settings.section.itemID == 1572870)
		$('.itemContentRight .toolbar.share').addClass('hide');

	if (settings.section.ID === 200010)
	{
		var openQuestions = $.fn.getAnchor('question');

		if (openQuestions == '')
			$('.row.theme .toggleSections').click();
	}
});

$(window).resize(function()
{
	// Resize TIK app iFrame.
	if (settings.section.ID == 173456 ||
		settings.section.ID == 181051 ||
		settings.section.ID == 181169 ||
		settings.section.ID == 181170)
	{
		var frameMargin = 60;

		if ($("#mainMenu .secondRow li").length > 0)
			frameMargin += 50;

		$("#tikFrame").height($("body").height() - frameMargin);
	}
});
