$('.rsSlideTitle').append('<span class="screenReaderContent">BB &gt; Rijkswaterstaat en BAAK maken de Blankenburgverbinding</span>');

$(document).ready(function()
{
	Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, arguments)
	{
		moveSectionOptions();
	});

	$('#top .logo').attr('alt', 'Logo Rijkswaterstaat - Ministerie van Infrastructuur en Waterstaat - Home')

	addActivitiesButtons();
	addSocialsBar();
	moveSectionOptions();

	setTimeout(function()
	{
		$(window).resize();
		$.fn.initializeSpacers();
	}, 150);
});

function addActivitiesButtons()
{
	var topLink = $('<li id="activitiesButton"><span class="button linkBtn"><a href="/werkzaamheden/default.aspx" class="linkBtn"><img src="/communities/common/images/blankenburgverbinding/template/pion.svg" alt="" />Werkzaamheden</a></span></li>');
	$('#searchContainer').append(topLink);

	var mobileTopLink = $('<span id="mobileActivitiesButton"><span class="button linkBtn"><a href="/werkzaamheden/default.aspx" class="linkBtn"><img src="/communities/common/images/blankenburgverbinding/template/pion-black.svg" alt="" />Werkzaamheden</a></span></span>');
	mobileTopLink.insertBefore($('#top .hamburger'));
}

function addSocialsBar()
{
	var bar = $('<div>');
	bar.attr('id', 'socialsBar');
	bar.addClass('row');

	var socials = $('<ul>');
	socials.addClass('socialsContainer');

	var facebookBtn = $('<li>'),
		facebookLink = $('<a>');
	facebookBtn.addClass('facebook');
	facebookLink.attr('aria-label', 'Bekijk onze Facebook pagina');
	facebookLink.attr('href', 'https://www.facebook.com/BlankenburgverbindingRWS');
	facebookLink.attr('target', '_blank');
	facebookBtn.append(facebookLink);

	var linkedInBtn = $('<li>'),
		linkedInLink = $('<a>');
	linkedInBtn.addClass('linkedIn');
	linkedInLink.attr('aria-label', 'Bekijk onze LinkedIn pagina');
	linkedInLink.attr('href', 'https://www.linkedin.com/company/blankenburgverbinding/');
	linkedInLink.attr('target', '_blank');
	linkedInBtn.append(linkedInLink);

	var instagramBtn = $('<li>'),
		instagramLink = $('<a>');
	instagramBtn.addClass('insta');
	instagramLink.attr('aria-label', 'Bekijk onze Instagram pagina');
	instagramLink.attr('href', 'https://www.instagram.com/rws_bbv/');
	instagramLink.attr('target', '_blank');
	instagramBtn.append(instagramLink);

	var twitterBtn = $('<li>'),
		twitterLink = $('<a>');
	twitterBtn.addClass('twitter');
	twitterLink.attr('aria-label', 'Bekijk onze Twitter pagina');
	twitterLink.attr('href', 'https://twitter.com/RWS_BBV');
	twitterLink.attr('target', '_blank');
	twitterBtn.append(twitterLink);

	var videoBtn = $('<li>'),
		videoLink = $('<a>');
	videoBtn.addClass('video');
	videoLink.attr('aria-label', 'Bekijk onze video pagina');
	videoLink.attr('href', 'https://www.youtube.com/channel/UCzTO9Auxf9hMvF9ZVj0esMA/featured');
	videoLink.attr('target', '_blank');
	videoBtn.append(videoLink);

	var bouwAppBtn = $('<li>'),
		bouwAppLink = $('<a>');
	bouwAppBtn.addClass('bouwApp');
	bouwAppLink.attr('aria-label', 'Bekijk onze bouw app pagina');
	bouwAppLink.attr('href', 'https://www.blankenburgverbinding.nl/bouwapp/default.aspx');
	bouwAppLink.attr('target', '_blank');
	bouwAppBtn.append(bouwAppLink);

	var newsletterBtn = $('<li>'),
		newsletterLink = $('<a>');
	newsletterBtn.addClass('newsletter');
	newsletterLink.attr('aria-label', 'Bekijk onze nieuwsbrieven');
	newsletterLink.attr('href', 'https://nieuwsbrieven.rijkswaterstaat.nl/actueel/nieuwsbrieven/nieuwsbrief-rijkswaterstaat-blankenburgverbinding');
	newsletterLink.attr('target', '_blank');
	newsletterBtn.append(newsletterLink);

	socials.append([facebookBtn, instagramBtn, twitterBtn, linkedInBtn, videoBtn, bouwAppBtn, newsletterBtn]);
	bar.append(socials);

	$('#top').append(bar);
}

function moveSectionOptions()
{
	if ($('.section').length == 0 || $('.sectionOptions:not(.hide)').length == 0 || $('.sectionHeader').length == 0 || $('.sectionOptions .field input').length == 0)
		return;

	$('.sectionHeader ~ .sectionOptions').remove();

	$('.sectionOptions').insertAfter('.sectionHeader');
	$('.sectionOptions .twentyFive').removeClass('twentyFive');
	$('.sectionOptions').prepend($('.sectionOptions .toolbar'));
	$('.section').addClass('smallHeader');

	$('.sectionHeader').prepend($('h1.sectionTitle'));
}

// Additional CKEditor styles.
function loadAdditionalStyles()
{
	defaultStyles.push(
		{
			name: "Box blauw",
			element: "div",
			attributes:
			{
				"class": "box blue",
				"style": "background: #E4F4FC;"
			}
		},
		{
			name: "Box geel",
			element: "div",
			attributes:
			{
				"class": "box yellow",
				"style": "background: #FAF6C0;"
			}
		});
}
