//Bron: http://www.blastam.com/blog/index.php/2011/04/how-to-track-downloads-in-google-analytics/

var $ = jQuery.noConflict();

$(document).ready(function ($)
{
	var filetypes = /\.(ashx|zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
	var baseHref = '';

	if ($('base').attr('href') != undefined)
		baseHref = $('base').attr('href');

	//Lightbox elementen moeten worden uitgesloten, omdat de Google analytics code de lightbox functionaliteit om zeep helpt.
	//Daarnaast hoeven de lightbox elementen toch nooit te worden vastgelgd als download, omdat het in die gevallen gaat om 
	//het weergeven van plaatjes en niet om het downloaden van documenten met de hierboven aangegeven extensie.
	$('a:not([rel^=lightbox])').on('click', function (event)
	{
		var el = $(this);
		var track = true;
		var href = (typeof (el.attr('href')) != 'undefined') ? el.attr('href') : "";
		var hrefext = href;

		if (hrefext.indexOf('?') != -1)
		{
			hrefext = hrefext.replace(hrefext.substring(hrefext.indexOf('?')), '');
		}

		var isThisDomain = hrefext.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);

		if (!hrefext.match(/^javascript:/i))
		{
			var elEv = []; elEv.value = 0, elEv.non_i = false;
			if (href.match(/^mailto\:/i))
			{
				elEv.category = "email";
				elEv.action = "click";
				elEv.label = href.replace(/^mailto\:/i, '');
				elEv.loc = href;
			}
			else if (hrefext.match(filetypes))
			{
				var extension = (/[.]/.exec(hrefext)) ? /[^.]+$/.exec(hrefext) : undefined;
				elEv.category = "download";
				elEv.action = "click-" + extension[0];
				elEv.label = href.replace(/ /g, "-");
				elEv.loc = baseHref + href;
			}
			else if (hrefext.match(/^https?\:/i) && !isThisDomain)
			{
				elEv.category = "external";
				elEv.action = "click";
				elEv.label = href.replace(/^https?\:\/\//i, '');
				elEv.non_i = true;
				elEv.loc = href;
			}
			else if (href.match(/^tel\:/i))
			{
				elEv.category = "telephone";
				elEv.action = "click";
				elEv.label = href.replace(/^tel\:/i, '');
				elEv.loc = href;
			}
			else
				track = false;

			if (track)
			{
				_gaq.push(['_trackEvent', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i]);
				if (el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank')
				{
					setTimeout(function () { location.href = elEv.loc; }, 200);
					return false;
				}
			}
		}
	});
});
