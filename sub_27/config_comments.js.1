/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

if (!CKEDITOR.env.iOS)
	CKEDITOR.env.mobile = false;

// Initialize.
$(document).ready(function()
{
	extendLanguages();

	if (typeof Sys != "undefined" && Sys != null)
	{
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, e)
		{
			extendLanguages();
		});
	}
});

// Check if all editors are initialized properly.
CKEDITOR.on("instanceReady", function(event)
{
	if (event.editor.container.$.id != undefined)
	{
		$("#" + event.editor.container.$.id).parent().addClass("ready");

		// Custom buttons.
		setCustomButtons(event.editor);
	}

	var iFrame = $(event.editor.container.$).find('.cke_wysiwyg_frame');

	if (iFrame && settings)
	{
		if ($('.commentFieldEditor').length > 0)
		{
			iFrame.attr('title', settings.ckeditor.commentEditorTitle);
			iFrame.parents('.cke.cke_reset').find('.cke_voice_label:eq(0)').text(settings.ckeditor.commentEditorTitle);
		}
	}
});

var mention_users = [];

$.ajax(
{
	url: "/api/user/GetCommentersByPermissionsJson",
	data:
	{
		sectionID: settings.section.ID,
		contentPageID: settings.section.itemID,
		token: $("input[name='__RequestVerificationToken']").val()
	}
})
.done(function(data)
{
	var users = JSON.parse(data);

	if (users.length > 0)
	{
		$.each(users, function(i)
		{
			var avatar = users[i].Avatar;

			if (avatar == '')
				avatar = '/communities/common/themes/mett%20responsive/images/various/user-circle.png';

			var user = {
				id: users[i].UserId,
				avatar: avatar,
				fullname: HTMLDecode(users[i].FullName),
				useremail: users[i].UserEmail
			};

			mention_users.push(user);
		});
	}
});

function HTMLDecode(item)
{
	return $('<div></div>').html(item).text();
}

CKEDITOR.editorConfig = function(config)
{
	// General.
	config.ImageDlgHideAdvanced = true;
	config.TemplateReplaceCheckbox = false;
	config.resize_enabled = true;

	// IE only.
	config.AutoDetectPasteFromWord = true;
	config.LinkDlgHideTarget = true;

	// Always paste as plain text.
	config.forcePasteAsPlainText = false;
	config.pasteFromWordRemoveFontStyles = true;
	config.pasteFromWordRemowietseveStyles = true;

	// Plugins.
	config.removePlugins = "image";
	config.extraPlugins = "wordcount,image2,youtube,smiley,textmatch,autolink,ajax,xml,textwatcher,autocomplete,mentions,smiley,language,bidi";

	// Youtube plugin.
	config.youtube_responsive = true;
	config.youtube_related = false;

	// Language plugin.
	config.language_list = ['nl:Dutch', 'en:English', 'ar:Arabic:rtl', 'fr:French', 'de:German', 'es:Spanish'];

	// Word count.
	config.wordcount = { showCharCount: true };

	config.mentions = [{
		feed: mentionFeed,
		itemTemplate: '<li class="mention-user" data-id="{id}">' +
			'<img class="mention-avatar" src="{avatar}" /> ' +
			'<strong class="user-fullname">{fullname}</strong></li>',
		outputTemplate: '<a data-user-id={id} href="/shortcuts/Users_ShowProfile.aspx?userkey={id}">{fullname}</a><span>&nbsp;</span>',
		minChars: 0,
		marker: '@'
	}];

	var extraAllowedContent = "*[id,class,style,align,valign,bgcolor,rowspan,colspan,border,usemap,cid,data-*,rel](*){*};map[*](*){*};area[*](*){*};sup[*](*){*};sub[*](*){*};pre[*](*){*};span[*](*){*};div[*](*){*};object[*](*){*};param[*](*){*};img[width,height];iframe[*](*){*};video[*](*){*};source[*](*){*};td[width,height](*){*};label[*](*){*};blockquote[*](*){*}";
	var disallowedContent = "table[border,cellpadding,cellspacing];img[onload,onerror]";

	// CSS.
	if (typeof settings != "undefined") {
		// Responsive template.
		config.contentsCss = "/ckeditor/responsive.css";
	}

	// Allowed & disallowed content.
	config.extraAllowedContent = extraAllowedContent;
	config.disallowedContent = disallowedContent;

	// Toolbar configuration.
	var row1Block1 =
	{
		name: "row1Block1",
		items: [
			"Bold",
			"Italic"
		]
	};
	var row1Block2 =
	{
		name: "row1Block2",
		items: [
			"Copy",
			"Cut",
			"Paste"
		]
	};
	var row1Block3 =
	{
		name: "row1Block3",
		items: [
			"Outdent",
			"Indent",
			"BulletedList",
			"NumberedList"
		]
	};
	var row1Block4 = {
		name: "row3Block5",
		items: [
			"Language",
			"BidiLtr",
			"BidiRtl"
		]
	}
	var row1Block5 =
	{
		name: "row1Block4",
		items: [
			"Link",
			"Unlink",
			"Anchor"
		]
	};

	if (typeof settings != "undefined" && settings.user.ID === -1)
	{
		var row1Block6 =
		{
			name: "row1Block5",
			items: [
				"Youtube",
				"Smiley"
			]
		};
	}
	else {
		var row1Block6 =
		{
			name: "row1Block5",
			items: [
				"Image",
				"Youtube",
				"Smiley"
			]
		};
	}

	var row1Block7 =
	{
		name: "row1Block6",
		items: [
			"Maximize"
		]
	};

	// Toolbar.
	config.toolbar_Mett = [
		row1Block1,
		row1Block2,
		row1Block3,
		row1Block4,
		row1Block5,
		row1Block6,
		row1Block7
	];

	config.toolbar = "Mett";

	// Remove some tabs from the link dialogs.
	config.removeDialogTabs = "link:upload;link:advanced;";

	for (name in CKEDITOR.instances)
	{
		CKEDITOR.instances[name].on("dialogHide", function(aEvent)
		{
			if (typeof aEvent.editor != "undefined" && aEvent.editor != null)
			{
				var theWrappingDiv = $("<div>");
				var theTextArea = $(aEvent.editor.container.$).find("textarea.cke_source");

				if (theTextArea.length > 0)
				{
					theWrappingDiv.append($(theTextArea.val()));
					theWrappingDiv.find("script").remove();

					theTextArea.val(theWrappingDiv.html());
				}

				// Get data from the CKEditor.
				var theData = aEvent.sender.getData();
				var theImagesRegEx = /(\<img\s.*?\ssrc\=\")(.*?)(\".*?\>)/gi;
				var theHrefsRegEx = /(\shref\=\")(\/[^\"]*?)(\")/gi;
				var theLinksRegEx = /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/gi;

				if (
					typeof theData != "undefined" &&
					theData != null &&
					$.trim(theData) != ""
				)
				{
					while ((theMatch = theLinksRegEx.exec(theData)) != null)
					{
						var link = $(theMatch[0]);

						if (link.attr("target") == "_blank")
						{
							// Add rel="noreferrer noopener" to links with target="_blank", to prevent "tab nabbing".
							link.attr("rel", "noreferrer noopener");
						}
						else
						{
							// Remove rel.
							link.removeAttr("rel");
						}

						theData = theData.replace(
							theMatch[0],
							link.get(0).outerHTML
						);
					}

					// Set data in CKEditor.
					aEvent.sender.setData(theData);
					aEvent.editor.focus();
				}

				// Custom buttons.
				setCustomButtons(aEvent.editor);
			}
		});

		CKEDITOR.instances[name].on("contentDom", function(aEvent)
		{
			if (typeof aEvent.editor != "undefined" && aEvent.editor != null)
				setCustomButtons(aEvent.editor); // Custom buttons.
		});

		CKEDITOR.instances[name].on("change", function(aEvent)
		{
			$(aEvent.editor.document.$).find(".bugfixContainer").each(function()
			{
				if ($.trim($(this).text()) != "")
					$(this).removeClass("bugfixContainer").removeClass("hide");
			});

			if (typeof globals != "undefined")
				globals.pageChanged = true;
		});

		CKEDITOR.instances[name].on("pasteFromWord", function(aEvent)
		{
			// Clone the filter, so that it is based on current editor filter settings.
			var filter = aEvent.editor.filter.clone();
			var fragment = CKEDITOR.htmlParser.fragment.fromHtml(
				aEvent.data.dataValue
			);
			var writer = new CKEDITOR.htmlParser.basicWriter();

			// Remove styles.
			filter.disallow("*[style](*){*};");

			// Filter and overwrite.
			filter.applyTo(fragment);
			fragment.writeHtml(writer);
			aEvent.data.dataValue = writer.getHtml();
		});
	}
};

function mentionFeed(opts, callback)
{
	var matchProperty = 'fullname',
		data = mention_users.filter(function(item)
		{
			return item[matchProperty].toLowerCase().indexOf(opts.query.toLowerCase()) == 0;
		});

	data = data.sort(function(a, b)
	{
		return a[matchProperty].localeCompare(b[matchProperty], undefined,
		{
			sensitivity: 'accent'
		});
	});

	callback(data);
}

// Insert custom buttons.
function setCustomButtons(aEditor)
{
	if (aEditor.document == undefined)
		return false;

	if (typeof aEditor.lang.plugins == "undefined")
	{
		if (typeof document.setCustomButtonsAttempts == "undefined")
			document.setCustomButtonsAttempts = 1;
		else
			document.setCustomButtonsAttempts++;

		if (document.setCustomButtonsAttempts < 5)
		{
			setTimeout(function()
			{
				setCustomButtons(aEditor);
			}, 20);
		}

		return;
	}

	var theEditorDocument = aEditor.document;
	var theEditButtons = theEditorDocument.find(".mettWidget .edit").$;
	var theDeleteButtons = theEditorDocument.find(".mettWidget .delete").$;
	var theInsertRowButtons = theEditorDocument.find(".insertRow").$;
	var theInsertSlideButtons = theEditorDocument.find(".insertSlide").$;

	if (
		typeof settings == "undefined" ||
		settings == null ||
		typeof settings.widgets == "undefined" ||
		settings.widgets == null ||
		typeof settings.widgets.allowed == "undefined" ||
		!settings.widgets.allowed
	)
	{
		for (var i = 0; i < theEditButtons.length; i++)
		{
			$(theEditButtons[i]).addClass("editorHide");
		}

		for (var i = 0; i < theDeleteButtons.length; i++)
		{
			$(theDeleteButtons[i]).addClass("editorHide");
		}
	}
	else
	{
		for (var i = 0; i < theEditButtons.length; i++)
		{
			$(theEditButtons[i]).removeClass("editorHide").text(aEditor.lang.plugins.widgets.editButton);
		}

		for (var i = 0; i < theDeleteButtons.length; i++)
		{
			$(theDeleteButtons[i]).removeClass("editorHide").text(aEditor.lang.plugins.widgets.deleteButton);
		}
	}

	$(theEditorDocument.$).find(".mettWidget:first-child").each(function()
	{
		$('<p class="hide bugfixContainer">&nbsp;</p>').insertBefore($(this));
	});

	$(theEditorDocument.$).find(".mettWidget:last-child").each(function () {
		$('<p class="hide bugfixContainer">&nbsp;</p>').insertAfter($(this));
	});

	for (var i = 0; i < theDeleteButtons.length; i++)
	{
		var theCurrentButton = $(theDeleteButtons[i]);

		if (theCurrentButton.data("initialized") != "true")
		{
			theCurrentButton.click(function()
			{
				if ($(this).confirm(aEditor.lang.plugins.widgets.deleteConfirmMessage))
					$(this).parents(".mettWidget").first().remove();
			});

			theCurrentButton.data("initialized", "true");
		}
	}

	for (var i = 0; i < theEditButtons.length; i++)
	{
		var theCurrentButton = $(theEditButtons[i]);

		if (theCurrentButton.data("initialized") != "true")
		{
			theCurrentButton.click(function()
			{
				var theTargetWidget = $(this).parents(".mettWidget:first");
				var theWidgetID = "edit_" + Math.floor(Math.random() * 1000 + 1);

				if (
					typeof theTargetWidget.attr("id") != "undefined" &&
					theTargetWidget.attr("id") != null &&
					$.trim(theTargetWidget.attr("id")) != ""
				)
					theWidgetID = theTargetWidget.attr("id");
				else theTargetWidget.attr("id", theWidgetID);

				var theFirstParentWidget = aEditor.document.getById(
					theWidgetID
				);

				aEditor.getSelection().selectElement(theFirstParentWidget);
				aEditor.execCommand("widgets");
			});

			theCurrentButton.data("initialized", "true");
		}
	}

	for (var i = 0; i < theInsertRowButtons.length; i++)
	{
		var theCurrentButton = $(theInsertRowButtons[i]);

		if (theCurrentButton.data("initialized") != "true")
		{
			theCurrentButton.click(function()
			{
				var theObject = $(this);
				var theNewRow = theObject.parent().clone();

				theNewRow
					.find(".columns")
					.empty()
					.html("<p><br /></p>");
				theNewRow.insertAfter(theObject.parent());

				setCustomButtons(aEditor);
			});

			theCurrentButton.data("initialized", "true");
		}
	}

	for (var i = 0; i < theInsertSlideButtons.length; i++)
	{
		var theCurrentButton = $(theInsertSlideButtons[i]);

		if (theCurrentButton.data("initialized") != "true")
		{
			theCurrentButton.click(function()
			{
				var theObject = $(this);
				var theNewRow = theObject.parent().clone();

				theNewRow.html("<p><br /></p>");
				theNewRow.append(theObject.clone());
				theNewRow.insertAfter(theObject.parent());

				setCustomButtons(aEditor);
			});

			theCurrentButton.data("initialized", "true");
		}
	}
}

function initializeEditorForms(editor)
{
	if (editor.document == undefined)
		return false;

	var editorContent = $(editor.document.$);

	editorContent.unbind("keydown").keydown(function(e)
	{
		// Disable <tab> in editor form.
		if (e.keyCode == 9)
			e.preventDefault();
	});

	// Make form elements clickable.
	editorContent.find("label, input, select, textarea, .question").each(function()
	{
		var element = $(this);
		var field = element.parents(".field");
		var elementType = "";
		var editorElement = null;

		// Disable focus for these elements, so they can't be edited.
		element.unbind("focus").focus(function(e)
		{
			e.preventDefault();
		});

		if (element.prop("id") != null && element.prop("id") != "")
		{
			elementType = element.prop("type");
			editorElement = editor.document.getById(element.prop("id"));
		}
		else if (element.hasClass("question"))
		{
			elementType = field.find(".answer:first input").prop("type");
			editorElement = editor.document.getById(field.find(".answer:first input").prop("id"));
		}

		if (field.length > 0 && field.parent("p").length > 0)
		{
			var parentParagraph = field.parent("p");

			parentParagraph.removeClass("formSpacer").addClass("noMargin");
			parentParagraph.find("br").remove();
		}

		if (elementType != "" && editorElement != null)
		{
			element.unbind("click").click(function()
			{
				// Set selected element.
				editor.getSelection().selectElement(editorElement);

				// Open plugin dialog.
				editor.execCommand(editorElement.data("type"));
			});
		}
	});
}

// Languages.
function extendLanguages()
{
	var customLang = {};

	customLang["en"] = {
		plugins:
		{
			divTable:
			{
				label: "Create layout table",

				title: "Layout table properties",

				tabBasic: "Basic settings",
				tabColor: "Colour settings",
				tabExtra: "Advanced settings",

				errorNumberPercentage: " should be a number or percentage",
				errorInt: " should be a number",
				errorHex: " should be a hexadecimal (e.g.: #00bbc3)",
				errorHexOrEmpty:
					" should be a hexadecimal (e.g.: #00bbc3) or empty",

				width: "Width",
				height: "Height",
				rows: "Number of rows",
				columns: "Number of columns",
				numberOfAddColumns: "Column width",
				addColumn: "Add column",
				forceCellWidth: "All columns same width",
				horizontalAlign: "Horizontal align",
				left: "Left",
				center: "Center",
				right: "Right",
				verticalAlign: "Vertical align",
				top: "Top",
				middle: "Middle",
				bottom: "Bottom",
				borderWidth: "Border width",
				borderSpacing: "Spacing between cells",
				padding: "Padding within cells",

				borderColor: "Border colour",
				backgroundColor: "Background colour of table",
				cellBackgroundColor: "Background colour of cells",

				id: "Id",
				style: "Style",
				styleClass: "Stylesheet classes"
			},

			link:
			{
				linkType: "Internal link",
				internalSection: "Page",
				internalSectionDefaultLabel: "Select an internal page",
				internalContentPage: "Page item (optional)",
				internalContentPageDefaultLabel: "Select an item",
				internalOpenInViewerOrDownload: "Open in viewer or download",
				internalOpenInViewer: "Open in viewer",
				internalDownload: "Download"
			},

			widgets: {
				label: "Create widget",

				title: "Widget properties",

				tabBasic: "Basic settings",
				tabPageFilter: "Page filter",
				tabLayout: "Layout",
				tabOptions: "Options",

				validatorNotSelected: " should be set",
				validatorEmpty: " is required",

				type: {
					label: "Widget type",

					default: "Choose widget type...",
					updates: "Updates",
					events: "Events",
					faq: "FAQ",
					items: "Page items",
					comments: "Comments",
					twitter: "Twitter",
					birthdays: "Birthdays",
					users: "Users",
					rss: "RSS feed",
					roles: "Roles",
					statistics: "Statistics",
					webservice: "Webservice"
				},

				description: {
					roles: "This widget shows the roles of the visiting user."
				},

				title: "Title",

				urlProtocol: "Protocol",
				url: "URL",

				targetBlank: "Open links in new window",

				useUpdatesFilter: "Filter results",
				updatesFilterCheckboxes: {
					description: "Which results would you would like to see?",

					events: "Events",
					gallery: "Image gallery",
					blog: "Blog",
					documents: "Documents",
					eParticipation: "eParticipation",
					questions: "Questions",
					forum: "Forum",
					groups: "Groups",
					map: "Map",
					links: "Links",
					news: "News",
					tasks: "Tasks"
				},

				statisticsType: {
					label: "Statistics type",

					default: "Choose a statistics type...",
					topViewedPages: "Top viewed pages"
				},

				itemType: {
					label: "Page type",

					default: "Choose page type...",
					blog: "Blog",
					documents: "Documents",
					eParticipation: "eParticipation",
					questions: "Questions",
					forum: "Forum",
					groups: "Groups",
					maps: "Map items",
					news: "News",
					links: "Links",
					tasks: "Tasks"
				},

				documentsDisplayType: {
					label: "Display options",

					folders: "Show folders",
					documents: "Show documents"
				},

				twitterType: {
					label: "Show results of a",

					username: "Twitter account",
					query: "Search query"
				},

				twitterQuery: {
					label: {
						username: "Username",
						query: "Search query"
					}
				},

				twitterLanguage: {
					label: "Results language",

					default: "All languages",
					nl: "Dutch",
					en: "English",
					fr: "French",
					de: "German"
				},

				listIcon: "Item icon",

				topn: "Number of results",

				orderBy: {
					label: "Sort results",

					idDesc: "By date descending",
					idAsc: "By date ascending",
					titleAsc: "Alphabetical ascending",
					titleDesc: "Alphabetical descending",
					random: "Random"
				},

				showAvatar: "Show avatars",
				showUserName: "Show usernames",
				filterRetweets: "Filter retweets",
				personaliseItems: "Only show items from visiting user",
				followingOnly: "Only show items you are following",
				autoHide: "Hide when no results are found",
				autoRefresh: ["Refresh content every ", " seconds"],
				showOnlyFollowedUsers: "Show only users you follow",
				showOnlyFollowingUsers: "Show only users who follow you",
				showUserOccupation: "Show occupation",
				showUserExpertise: "Show expertise",
				showUserOrganization: "Show organization",
				showUserMemo: "Show memo",

				usePageFilter: "Use page filter",
				pageList:
					"Not all required settings are done to be able to use a page filter.",

				template: {
					label: "Layout",

					list: "List (default)",
                    carousel: "Carousel",
                    grid: "Grid"
				},

				showDescription: "Show description",
				showEventDescription: "Show summary",
				showEventImage: "Show image",
				showAuthor: "Show author",
				showUpdater: "Show 'Updated by'",
				showDate: "Show date",
				showMore: "Show 'show more'",

				dateType: {
					label: "Date type",

					modern: "Modern (3 minutes ago)",
					classic: "Classic (15 Januari 2015)",
					digits: "Digits (15-1-2015)"
				},

				carouselCount: "Number of items per slide",
				carouselShowImages: "Show images",
				carouselSlideshow: "Show play/pause button",
				carouselAutoPlay: "Enable autoplay animation",
				carouselDelay: "Number of seconds per slide",

				showAge: "Show age",
				showPastItems: "Show past items",
				showItemsPer: {
					label: "Show items per",

					week: "Week",
					month: "Month",
					year: "Year"
				},

				editButton: "Edit",
				deleteButton: "Delete",
				deleteConfirmMessage:
					"Are you sure you want to delete this widget?"
			},
		}
	};

	customLang["nl"] = {
		plugins:
		{
			divTable:
			{
				label: "Opmaaktabel invoegen",

				title: "Opmaaktabel eigenschappen",

				tabBasic: "Basis instellingen",
				tabColor: "Kleur instellingen",
				tabExtra: "Extra instellingen",

				errorNumberPercentage: " moet een getal of percentage zijn",
				errorInt: " moet een getal zijn",
				errorHex: " moet een hexadecimaal zijn (bijvoorbeeld #00bbc3)",
				errorHexOrEmpty:
					" moet een hexadecimaal (bijvoorbeeld #00bbc3) of leeg zijn",

				width: "Breedte",
				height: "Hoogte",
				rows: "Aantal rijen",
				columns: "Aantal kolommen",
				numberOfAddColumns: "Kolom breedte",
				addColumn: "Voeg de kolom toe",
				forceCellWidth: "Kolombreedte verdelen",
				horizontalAlign: "Horizontale uitlijning",
				left: "Links",
				center: "Gecentreerd",
				right: "Rechts",
				verticalAlign: "Verticale uitlijning",
				top: "Boven",
				middle: "Midden",
				bottom: "Onder",
				borderWidth: "Lijndikte",
				borderSpacing: "Ruimte tussen cellen",
				padding: "Ruimte binnen cellen",

				borderColor: "Lijnkleur",
				backgroundColor: "Achtergrondkleur tabel",
				cellBackgroundColor: "Achtergrondkleur cellen",

				id: "Id",
				style: "Stijl",
				styleClass: "Stylesheet-klassen"
			},

			link:
			{
				linkType: "Interne link",
				internalSection: "Pagina",
				internalSectionDefaultLabel: "Kies een interne pagina",
				internalContentPage: "Pagina item (optioneel)",
				internalContentPageDefaultLabel: "Kies een item",
				internalOpenInViewerOrDownload:
					"Openen in viewer of downloaden",
				internalOpenInViewer: "Openen in viewer",
				internalDownload: "Downloaden"
			},

			widgets: {
				label: "Widget invoegen",

				title: "Widget eigenschappen",

				tabBasic: "Basis instellingen",
				tabPageFilter: "Pagina filter",
				tabLayout: "Uiterlijk",
				tabOptions: "Opties",

				validatorNotSelected: " nog niet gekozen",
				validatorEmpty: " mag niet leeg zijn",

				type: {
					label: "Widget type",

					default: "Kies een widget type...",
					updates: "Activiteiten",
					events: "Agenda",
					faq: "FAQ",
					items: "Pagina items (nieuws, blog, etc.)",
					comments: "Reacties",
					twitter: "Twitter",
					birthdays: "Verjaardagen",
					users: "Gebruikers",
					rss: "RSS feed",
					roles: "Rollen",
					statistics: "Statistieken",
					webservice: "Webservice"
				},

				description: {
					roles:
						"Deze widget laat de rollen zien van de ingelogde gebruiker."
				},

				title: "Titel",

				urlProtocol: "Protocol",
				url: "URL",

				targetBlank: "Links in een nieuw venster openen",

				useUpdatesFilter: "Stel een filter in",
				updatesFilterCheckboxes: {
					description:
						"Van welke paginatypes moeten activiteiten getoond worden?",

					events: "Agenda",
					gallery: "Beeldbank",
					blog: "Blog",
					documents: "Documenten",
					eParticipation: "Participatie",
					Questions: "Vragen",
					forum: "Forum",
					groups: "Groepen",
					map: "Kaart",
					links: "Links",
					news: "Nieuws",
					tasks: "Taken"
				},

				statisticsType: {
					label: "Statistiekentype",

					default: "Kies een statistiekentype...",
					topViewedPages: "Top bekeken pagina's"
				},

				itemType: {
					label: "Paginatype",

					default: "Kies een paginatype...",
					blog: "Blog",
					documents: "Documenten",
					eParticipation: "Participatie",
					Questions: "Vragen",
					forum: "Forum",
					groups: "Groepen",
					maps: "Kaartpunten",
					news: "Nieuws",
					links: "Links",
					tasks: "Taken"
				},

				documentsDisplayType: {
					label: "Weergave opties",

					folders: "Mappen tonen",
					documents: "Documenten tonen"
				},

				twitterType: {
					label: "Toon resultaten van",

					username: "Twitter account",
					query: "Zoekopdracht"
				},

				twitterQuery: {
					label: {
						username: "Accountnaam",
						query: "Zoekopdracht"
					}
				},

				twitterLanguage: {
					label: "Taal van resultaten",

					default: "Alle talen",
					nl: "Nederlands",
					en: "Engels",
					fr: "Frans",
					de: "Duits"
				},

				listIcon: "Item icoontje",

				topn: "Aantal items",

				orderBy: {
					label: "Volgorde",

					idDesc: "Laatste eerst",
					idAsc: "Eerste eerst",
					titleAsc: "Alfabetisch oplopend",
					titleDesc: "Alfabetisch aflopend",
					random: "Willekeurig"
				},

				showAvatar: "Toon profielafbeeldingen",
				showUserName: "Toon gebruikersnamen",
				filterRetweets: "Filter retweets",
				personaliseItems:
					"Alleen items van de ingelogde gebruiker tonen",
				followingOnly: "Alleen items tonen die de gebruiker volgt",
				autoHide: "Verbergen bij geen resultaten",
				autoRefresh: [
					"Inhoud automatisch elke ",
					" seconden vernieuwen"
				],
				showOnlyFollowedUsers: "Toon alleen gebruikers die je volgt",
				showOnlyFollowingUsers: "Toon alleen gebruikers die jou volgen",
				showUserOccupation: "Toon functie",
				showUserExpertise: "Toon expertise",
				showShowMore: "Toon meer tonen",
				showUserOrganization: "Toon organisatie",
				showUserMemo: "Toon opmerkingen",

				usePageFilter: "Gebruik een pagina filter",
				pageList:
					"Nog niet alle benodige instellingen zijn gedaan om een<br />pagina filter in te kunnen stellen.",

				template: {
					label: "Weergave",

					list: "Lijst (standaard)",
                    carousel: "Carrousel",
                    grid: "Grid"
				},

				showDescription: "Inhoud/inleiding tonen",
				showEventDescription: "Samenvatting tonen",
				showEventImage: "Afbeelding tonen",
				showAuthor: "Auteur tonen",
				showUpdater: "'Gewijzigd door' tonen",
				showDate: "Datum tonen",
				showMore: "'Toon meer' tonen",

				dateType: {
					label: "Datum weergave",

					modern: "Modern (3 minuten geleden)",
					classic: "Klassiek (15 januari 2015)",
					digits: "Cijfers (15-1-2015)"
				},

				carouselCount: "Aantal items tegelijk zichtbaar",
				carouselShowImages: "Afbeeldingen weergeven",
				carouselSlideshow: "Play/pauze knop tonen",
				carouselAutoPlay: "Automatisch beginnen met afspelen",
				carouselDelay: "Aantal seconden per item",

				showAge: "Leeftijd tonen",
				showPastItems: "Items uit het verleden tonen",
				showItemsPer: {
					label: "Tonen per",

					week: "Week",
					month: "Maand",
					year: "Jaar"
				},

				editButton: "Wijzigen",
				deleteButton: "Verwijderen",
				deleteConfirmMessage:
					"Weet je zeker dat je deze widget wilt verwijderen?"
			},
		}
	};

	// Extend default language file.
	if (typeof CKEDITOR.lang.originalLoad == "undefined" || CKEDITOR.lang.originalLoad == null)
	{
		CKEDITOR.lang.originalLoad = CKEDITOR.lang.load;

		CKEDITOR.lang.load = function(languageCode, defaultLanguage, callback)
		{
			CKEDITOR.lang.originalLoad(languageCode, defaultLanguage, function(attribute1, attribute2)
			{
				callback(attribute1, attribute2);

				if (languageCode == "")
					languageCode = CKEDITOR.config.defaultLanguage;

				$.extend(CKEDITOR.lang[languageCode], customLang[languageCode]);
			});
		};
	}
}
