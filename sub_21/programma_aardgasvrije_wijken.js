$(document).ready(function()
{
	if ($('.shortcut.contact').length > 0)
		$('.shortcut.contact').text('Helpdesk').attr('href', 'https://www.aardgasvrijewijken.nl/Beheer/Formulierenmodule/1406557.aspx?t=Contactformulier');

	var registratie_link = 'https://www.aardgasvrijewijken.nl/Beheer/Registraties/1412022.aspx?t=Doe+mee+en+maak+een+account+aan';

	if (settings.user.ID === -1)
		$('.shortcut.contact').parent().before('<li><a class="shortcut register" href="' + registratie_link + '">Registreren</a></li>');

	$('.shortcut.contact').parent().before('<li><a class="shortcut about" href="https://www.aardgasvrijewijken.nl/overpaw/default.aspx">Over PAW</a></li>');

	var menuItems = $('#mainMenu ul.firstRow > li');
	$.each(menuItems, function(i)
	{
		if ($.trim($(this).find('a').text()) == 'Over PAW')
			$(this).remove();
	});

	var communityGuidelinesLink = $('<li><div class="shortcut communityguidelines"><a href="https://www.aardgasvrijewijken.nl/communityrichtlijnen/default.aspx">Communityrichtlijnen</a></div></li>');
	communityGuidelinesLink.insertAfter($('#footer .shortcut.userterms').parent());

	if ($('.three #left').length > 0 &&
		((window.location.href.indexOf('/stappenplan/') > 0) ||
		(window.location.href.indexOf('/stappenplan+tvw/') > 0) ||
		(window.location.href.indexOf('/tweede+uitvraag+proeftuinen/') > 0) ||
		(window.location.href.indexOf('/stappenplan+transitievisie+warmte/') > 0) ||
		(window.location.href.indexOf('/handreikingparticipatie/') > 0) ||
		(window.location.href.indexOf('/themas/regieenorganisatie/') > 0)))
		$('.three #left').data('initial-offset', $('#top').height() + $('#pathOptions').height());

	if ($('#links.section').length > 0)
	{
		setTimeout(function()
		{
			$.each($('#links.section .item .readMore a'), function()
			{
				$(this).html('Lees meer &gt;');
			});
		}, 150);
	}

	if (settings.section.typeID == 28)
		$('#searchCriteriaDropdown').find('input:checkbox').not(':checked').click();

	if ($('#users.item.edit').length > 0)
	{
		$('.field.phone2').remove();
		$('.field.personalTitle').remove();
		$('.field.dateSelect.birthDate').remove();
		$('.field.gender').remove();
		$('.field.workdays').remove();
		$('.field.employeeNumber').remove();

		$.each($('legend'), function()
		{
			if ($.trim($(this).text()) == 'Postadres')
				$(this).parent().remove();
		});
	}

	if (settings.section.ID === 192616)
		$('html').addClass('open-comments');

	if (settings.section.itemID === 1385659)
		$('.allowNewsletters input:first').prop('checked', false );

	if (settings.section.ID === 186505 && settings.user.ID == -1)
		$('#defaultSubMenu').hide();

	if(settings.section.ID == 186509)
		$('div.publicEmail, div.publicPhone, div.publicAvatar, div.publicOther').addClass('hide');

	if ($('#toolbarShare').length > 0 && $('#toolbarShare .button.mail').length > 0)
	{
		var shareLink = $('#toolbarShare .button.mail a').attr('href'),
			newShareLink = 'mailto:?body=Een%20interessante%20pagina%20voor%20je%3A%20https%3A%2F%2Fwww.aardgasvrijewijken.nl%2F' + shareLink + '&subject=Een%20interessante%20pagina%20voor%20je…';

		$('#toolbarShare .button.mail a').attr('href', newShareLink);
	}

	$('img[usemap]').rwdImageMaps();

	if (settings.section.ID === 237913)
		$('html').addClass('fsFrame');
});

$(window).scroll(function()
{
	if (window.location.href.indexOf('/stappenplan/') > 0 ||
		window.location.href.indexOf('/stappenplan+tvw/') > 0 ||
		window.location.href.indexOf('/tweede+uitvraag+proeftuinen/') > 0 ||
		window.location.href.indexOf('/stappenplan+transitievisie+warmte/') > 0 ||
		window.location.href.indexOf('/handreikingparticipatie/') > 0 ||
		window.location.href.indexOf('/themas/regieenorganisatie/') > 0)
	{
		if ($('.three #left').length > 0 && $(window).width() > 768)
		{
			var $sidebar_box = $('.three #left'),
				scrollOffset = $(window).scrollTop() + $('#top').outerHeight(),
				initialOffset = $sidebar_box.data('initial-offset');

			if ($('#pathOptions').length > 0)
				scrollOffset += $('#pathOptions').outerHeight();

			$('.three #left li').css('max-width', '220px');
			$('.three #left div.editorContent').css('max-width', '260px');

			if (initialOffset < scrollOffset)
				$sidebar_box.css({'position': 'fixed', 'top': $('#top').outerHeight() + 15});
			else
				$sidebar_box.css({'position': '', 'top': ''});

			if ($sidebar_box.offset().top + $sidebar_box.height() > $('#bottom').offset().top)
				$sidebar_box.css('top', -($sidebar_box.offset().top + $sidebar_box.height() - $('#bottom').offset().top));
		}
	}
});
