if (settings.images) {
	settings.images.logoScroll = false;
}

$(document).ready(function()
{
	var organisationShortcut = $('<li />'),
		organisationLink = $('<a />');

	organisationLink.addClass('shortcut organisation').attr('href', '/organisatie/default.aspx').text('Organisatie');
	organisationShortcut.append(organisationLink);

	$(organisationShortcut).insertBefore($('#shortcuts .field.search'));

	if ($('#eParticipation.item').length > 0 && $('.itemContentRight .register.block').length > 0)
		$('.itemContentRight .register.block').remove();
});