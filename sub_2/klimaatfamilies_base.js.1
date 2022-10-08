if (settings.images != undefined)
	settings.images.logoScroll = false;

$(document).ready(function()
{
	var footer_logo = $('<span class="idw-logo"><a href="https://iedereendoetwat.nl/"><img style="max-height: 50px;" src="/communities/common/themes/mett%20responsive/images/custom/np_res/k_en_e_idw_logo.jpg" alt="Iedereen doet wat" /></a></span>');

	// Replace "Link openen" by "Lees meer" on Link pages
	$(".pageType4 .readMore a").text("Lees verder");

	if (settings.communityID === 2471 || /* Netwerk aquathermie */
		settings.communityID === 2486 || /* Expertise Centrum Warmte */
		settings.communityID === 2466 || /* Programma Aardgasvrije Wijken */
		settings.communityID === 2375 || /* Nationaal Programma Regionale Energiestrategie */
		settings.communityID === 2460 || /* Landelijk Communicatie Netwerk Klimaat */
		settings.communityID === 2590 || /* Nationale Agenda Laadinfrastructuur */
		settings.communityID === 2613 || /* Programma Verduurzaming Industrie */
		settings.communityID === 2723) /* Nationaal Waterstof Programma */
	{
		$('#footer .three.columns').prepend(footer_logo);

		var portalSelector = $('ul.portalSelector');
		portalSelector.css('float', 'left');
		portalSelector.find('.button button').css('font-size', '14px');
		portalSelector.find('.button button').text("Meer klimaat");
		portalSelector.find('.icon-chat').removeClass('icon-chat').addClass('icon-down-open');
		portalSelector.find('.addItem').removeClass('icon-down-open');

		portalSelector.find('li:eq(0) .button button').attr('aria-label', 'Meer klimaat');

		// Add modal content to body
		var aboutModal = '<div id="aboutOverlay" class="overlay hide" aria-modal="true"><div class="overlayContent"><a href="#" class="button close info icon-cancel-circled iconOnly before pointer"><span class="screenReaderContent">Overlay sluiten</span></a>' +
			'<h1 class="overlayItemTitle">Over de klimaatprogramma\'s</h1>' +
			'<div class="overlayItemContent">' +
			'<p>Op 28 juni 2019 presenteerde het kabinet het Klimaatakkoord en startte met de uitvoering van de doelen die daarin zijn afgesproken. In het akkoord staan meer dan 600 afspraken om de uitstoot van broeikasgassen tegen te gaan. Voor de uitvoering van een deel van deze afspraken is de Rijksoverheid een aantal klimaatprogramma’s gestart:</p>' +
			'<ul><li>Het Expertise Centrum Warmte (ECW)</li>' +
			'<li>Het Landelijk Communicatie Netwerk Klimaat (LNCK)</li>' +
			'<li>Het Nationaal Programma Regionale Energiestrategie (NP RES)</li>' +
			'<li>Het Netwerk Aquathermie (NAT)</li>' +
			'<li>Het Programma Aardgasvrije Wijken (PAW)</li>' +
			'<li>Nationale Agenda Laadinfrastructuur (NAL)</li>' +
			'<li>Het Programma Verduurzaming Industrie (PVI)</li></ul>' +
			'<h2>Actieve online samenwerking</h2>' +
			'<p>De klimaatprogramma\'s werken in de uitvoering zoveel mogelijk samen en dat zie je terug op de websites. Op elk platform vind je bovenaan een knop met "Klimaatprogramma\'s". Met deze knop schakel je gemakkelijk tussen de verschillende platformen. Heb je toegangsrechten gekregen om in te loggen op één van de platformen? Dan kun je bij alle platformen inloggen met hetzelfde e-mailadres en wachtwoord.</p></div></div></div>';

		$('body').append(aboutModal);

		// Add modal link to PortalSelector
		portalSelector.find('.dropDown').append('<a class="aboutOverlayTrigger" href="#">Over de klimaatprogramma\'s</a>');

		// Add link to /klimaatwijzer/ to portalSelector
		var klimaatwijzerLink = $('<a />');
		klimaatwijzerLink.addClass('klimaatwijzer');
		klimaatwijzerLink.attr('href', '/klimaatwijzer/default.aspx');
		klimaatwijzerLink.text('KlimaatWijzer');

		portalSelector.find('.dropDown').append(klimaatwijzerLink).enableKeyboardAccessibility();

		$('#shortcuts').prepend(portalSelector);
		portalSelector.css('display', 'inline-block');

		if ($(window).width() < 768)
		{
			portalSelector.css('float', 'none');
			$('#mobileShortcuts').append(portalSelector);
		}

		if (globals.url.indexOf('/klimaatwijzer/default.aspx') > -1)
		{
			var climateDiv = $('<div />');
			climateDiv.attr('id', 'climate-indicator');

			$('.sectionContent.editorContent').append(climateDiv);
			$('.sectionTitle').hide();

			$.getScript('https://klimaatwijzer.net/klimaatwijzer.js');
		}
	}

	$('.aboutOverlayTrigger').on('click', function(event)
	{
		event.preventDefault();

		var aboutOverlay = $('#aboutOverlay');

		$('body').addClass('overlayOpen');
		aboutOverlay.removeClass('hide');

		aboutOverlay.tabGuard();

		aboutOverlay.find('[tabindex]:not([tabindex=-1]):visible, button:visible, input:visible, a:visible').first().focus();
	});

	$('#aboutOverlay .button.close').on('click', function(event)
	{
		event.preventDefault();

		$('#aboutOverlay').addClass('hide');

		$('body').removeClass('overlayOpen');

		$('ul.portalSelector').focus();
	});

	// Re-position the register button on eParti items if present
	if ($('#eParticipation.section').length > 0)
	{
		$('.item').each(function()
		{
			if ($(this).find('.button.register').length > 0)
			{
				$(this).find('.toolbar').append('<br>');
				$(this).find('.toolbar').append($(this).find('.button.register'));
			}
		});
	}
});
