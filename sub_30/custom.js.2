$(document).ready(function()
{
	// Only for portal settings.
	if($(".pageType36").length > 0)
	{
		// Change label text.
		$("label[for$='_txtMettLogoColor']").html("Steunkleur");

		$.fn.initializeColorSchemes();
		$('<div class="clear"><a href="/communities/common/themes/rijksoverheid%20responsive/images/icons/RO_favicos.zip">Download standaard RO favicons</a></div>').insertAfter($("input[id$='_txtFavicon']"));
	}

	$.fn.checkInputFields();

	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		// Initialize after AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, arguments)
		{
			$.fn.checkInputFields();
		});
	}
});

$(window).resize(function()
{
	if ($("#searchContainer").length > 0)
	{
		var mainMenu = $("#mainMenu"),
			i = 0;

		// Reset.
		mainMenu.find(".firstRow").append(mainMenu.find(".secondRow > li"));
		mainMenu.removeClass("doubleHeight");

		// Move last items to second row if it overlaps the searchfield.
		if (typeof(mainMenu.find(".firstRow").offset()) == undefined)
			return;

		if (typeof(mainMenu.find(".firstRow").offset().left) == undefined)
			return;

		while (mainMenu.find(".firstRow").offset().left + mainMenu.find(".firstRow").width() > $("#searchContainer").offset().left && i < 10)
		{
			mainMenu.find(".secondRow").prepend(mainMenu.find(".firstRow > li:last"));

			i++;
		}

		if (i > 0)
			mainMenu.addClass('doubleHeight');
	}

	if ($(window).width < 769)
		$(".logo").removeAttr("style");

	if (settings.communityID !== 2443)
		$('#mainMenu').initRWSMainMenu();
});

$.fn.initRWSMainMenu = function()
{
	var mainMenu = $(this);

	if (mainMenu.find('.firstRow').width() > (mainMenu.find('.row:first').width() - $('#searchContainer').width()) && $(window).width() < 1000)
		mainMenu.find('.firstRow').css('margin-top', '46px');
	else
		mainMenu.find('.firstRow').css('margin-top', '16px');
};

// Extend initialize login.
$.fn.initializeLogin = (function(baseFunction)
{
	function extension()
	{
		baseFunction.call(this);

		var container = $(this);

		if (container.length > 0)
		{
			// Hide stuff.
			$("#footer, .loginLogo").addClass("hide");

			// Not hide stuff.
			$("#bottom, #spacerBottom").removeClass("hide");
		}
	}

	return extension;
})($.fn.initializeLogin);

$.fn.initializeColorSchemes = function()
{
	var theColorSchemes = [
							// Values explanation: ["Primary", "Secondary", "Tertairy (currently not used)", "Text color on primary colored background"]
							{name: "Geel (standaard)",	colors: {primary: "#F9DF1E", secondary: "#FDF6BB", tertairy: "#FEFBDD", text: "#000000"}},
							{name: "Donker geel",		colors: {primary: "#FFB612", secondary: "#FFE9B7", tertairy: "#FFF4DC", text: "#000000"}},
							{name: "Oranje",			colors: {primary: "#E17000", secondary: "#F6D4B2", tertairy: "#FBEAD9", text: "#000000"}},
							{name: "Roze",				colors: {primary: "#F092CD", secondary: "#FADEF0", tertairy: "#FDEFF8", text: "#000000"}},
							{name: "Violet",			colors: {primary: "#A90061", secondary: "#E5B2CF", tertairy: "#F2D9E7", text: "#FFFFFF"}},
							{name: "Robijn rood",		colors: {primary: "#CA005D", secondary: "#EFB2CE", tertairy: "#F7D9E7", text: "#FFFFFF"}},
							{name: "Rood",				colors: {primary: "#D52B1E", secondary: "#F2BFBB", tertairy: "#F9DFDD", text: "#FFFFFF"}},
							{name: "Paars",				colors: {primary: "#42145F", secondary: "#C6B8CF", tertairy: "#E3DCE7", text: "#FFFFFF"}},
							{name: "Donker blauw",		colors: {primary: "#01689B", secondary: "#CCE0F1", tertairy: "#E5F0F9", text: "#FFFFFF"}},
							{name: "Hemel blauw",		colors: {primary: "#007BC7", secondary: "#B2D7EE", tertairy: "#D9EBF7", text: "#FFFFFF"}},
							{name: "Licht blauw",		colors: {primary: "#8FCAE7", secondary: "#DDEFF8", tertairy: "#EEF7FB", text: "#000000"}},
							{name: "Mint groen",		colors: {primary: "#76D2B6", secondary: "#D6F1E9", tertairy: "#EBF8F4", text: "#000000"}},
							{name: "Donker groen",		colors: {primary: "#275937", secondary: "#BECDC3", tertairy: "#DFE6E1", text: "#FFFFFF"}},
							{name: "Groen",				colors: {primary: "#39870C", secondary: "#C3DBB6", tertairy: "#E1EDDB", text: "#FFFFFF"}},
							{name: "Mos groen",			colors: {primary: "#777C00", secondary: "#D6D7B2", tertairy: "#EBEBD9", text: "#FFFFFF"}},
							{name: "Donker bruin",		colors: {primary: "#673327", secondary: "#D1C1BE", tertairy: "#E8E1DF", text: "#FFFFFF"}},
							{name: "Bruin",				colors: {primary: "#94710A", secondary: "#DFD4B5", tertairy: "#EFEADA", text: "#FFFFFF"}}
						];

	var theColorSchemesContainer = $('<div id="colorSchemes" class="field">');
	var theCurrentColorSchemeRow;

	theColorSchemesContainer.append('<label>Kies een standaard thema</label><div class="clear"></div>');

	for (theCurrentIndex in theColorSchemes)
	{
		if(parseInt(theCurrentIndex) % 6 === 0)
		{
			theCurrentColorSchemeRow = $('<div class="row">');
			theColorSchemesContainer.append(theCurrentColorSchemeRow);
		}

		var theCurrentColorScheme = theColorSchemes[theCurrentIndex];

		var theCurrentColorButton = $('<div class="colorSchemeButton two columns">');
		theCurrentColorButton.css({backgroundColor: theCurrentColorScheme.colors.primary, borderColor: theCurrentColorScheme.colors.secondary, color: theCurrentColorScheme.colors.text});
		theCurrentColorButton.text(theCurrentColorScheme.name);
		theCurrentColorButton.data("colors", theCurrentColorScheme.colors);

		theCurrentColorButton.click(function ()
		{
			var theButton = $(this);
			var theColors = theButton.data("colors");

			$("input[id$=_txtBackgroundColor]").val("#FFFFFF").keyup();
			$("input[id$=_txtTopBackgroundColor]").val("#FFFFFF").keyup();
			$("input[id$=_txtTopTextColor]").val("#000000").keyup();
			$("input[id$=_txtMenubarColor]").val(theColors.primary).keyup();
			$("input[id$=_txtMenubarTextColor]").val(theColors.text).keyup();
			$("input[id$=_txtBottomBackgroundColor]").val("#E6E6E6").keyup();
            $("input[id$=_txtBottomTextColor]").val("#000000").keyup();
			$("input[id$=_txtMenubarHoverColor]").val("#000000").keyup();
			$("input[id$=_txtLinksColor]").val("#154373").keyup();
			$("input[id$=_txtLinksHoverColor]").val("#2C5F96").keyup();
			$("input[id$=_txtMettLogoColor]").val(theColors.secondary).keyup();

			// Buttons
			$("input[id$=_txtInfoButtonColor]").val("#DEEBE3").keyup();
			$("input[id$=_txtInfoButtonHoverColor]").val("#767676").keyup();
			$("input[id$=_txtConfirmButtonColor]").val("#0E8A2D").keyup();
			$("input[id$=_txtConfirmButtonHoverColor]").val("#5BBD73").keyup();
			$("input[id$=_txtDeleteButtonColor]").val("#CA3838").keyup();
			$("input[id$=_txtDeleteButtonHoverColor]").val("#D56060").keyup();
			$("input[id$=_txtGeneralButtonColor]").val("#154373").keyup();
			$("input[id$=_txtGeneralButtonHoverColor]").val("#2C5F96").keyup();
		});

		theCurrentColorSchemeRow.append(theCurrentColorButton);
	}

	$("#colorSettings").prepend(theColorSchemesContainer);
}

$.fn.checkInputFields = function()
{
	$.each($('.field'), function()
	{
		if ($(this).find('.charactersLeft').length > 0)
			$(this).addClass('withCount');

		if ($(this).hasClass('dateTimePicker icon-calendar'))
			$(this).find('input.dateTimeOutput').wrap('<div class="dateTimeOutputWrapper" />');
	});
};
