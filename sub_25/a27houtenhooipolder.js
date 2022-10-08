$(document).ready(function()
{
	// Fullscreen TIK app iFrame.
	if (settings.section.ID == 182172)
	{
		var tikUrl = "https://rijkswaterstaat.projectatlas.app/a27-houten-hooipolder/";

		$(".shortcutsContainer, .logoContainer, #pathOptions, #bottom, #spacerBottom").addClass("hide");
		$(".no-touch body").css("overflow", "hidden");
		$("#content").css("padding", 0);
		$("#content").html('<iframe id="tikFrame" src="' + tikUrl + '" scrolling="no" style="width:100%;" />');

		$(window).resize();
	}
});

$(window).resize(function()
{
	// Resize TIK app iFrame.
	if (settings.section.ID == 182172)
	{
		var frameMargin = 60;

		if ($("#mainMenu .secondRow li").length > 0)
			frameMargin += 50;

		$("#tikFrame").height($("body").height() - frameMargin);
	}
});
