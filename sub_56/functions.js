// Add splice functionality to String.
String.prototype.splice = function(idx, rem, s) {
	return this.slice(0, idx) + s + this.slice(idx + Math.abs(rem));
};

// Get querystring value.
$.fn.getQueryString = function(value) {
	return decodeURI(
		window.location.search.replace(
			new RegExp(
				"^(?:.*[&\\?]" +
					encodeURI(value).replace(/[\.\+\*]/g, "\\$&") +
					"(?:\\=([^&]*))?)?.*$",
				"i"
			),
			"$1"
		)
	);
};

// Get anchor value.
$.fn.getAnchor = function(value) {
	return decodeURI(
		window.location.href.replace(
			new RegExp(
				"^(?:.*[&#]" +
					encodeURI(value).replace(/[\.\+\*]/g, "\\$&") +
					"(?:\\=([^&]*))?)?.*$",
				"i"
			),
			"$1"
		)
	);
};

// Get generated unique ID.
$.fn.getUniqueID = function() {
	var date = new Date();
	var uniqueID =
		date.getFullYear() + date.getMonth() + date.getDate() + date.getTime();

	// Return unique ID.
	return uniqueID.toString();
};

// Get file types.
$.fn.getFileType = function(value) {
	value = value.replace(".", "");
	var fileType = "";

	// Check extension.
	switch (value) {
		case "pdf":
			fileType = "pdf";
			break;

		case "doc":
		case "docx":
			fileType = "word";
			break;

		case "xls":
		case "xlsx":
			fileType = "excel";
			break;

		case "ppt":
		case "pptx":
			fileType = "powerpoint";
			break;

		case "jpg":
		case "jpeg":
		case "png":
		case "gif":
		case "bmp":
			fileType = "image";
			break;

		case "zip":
		case "rar":
			fileType = "archive";
			break;

		case "mp3":
		case "wav":
		case "flac":
		case "ogg":
			fileType = "audio";
			break;

		case "avi":
		case "mkv":
		case "mov":
		case "mpeg":
		case "mp4":
			fileType = "video";
			break;
	}

	return fileType;
};

// Remove HTML.
$.fn.removeHTML = function(value) {
	if (typeof value != "undefined" && value != null && value != "") {
		return value.replace(/<(?:.|\n)*?>/gm, "");
	}
};

// Remove special characters.
$.fn.removeSpecialCharacters = function(value, type) {
	if (value != "") {
		if (type == "email") {
			return value.replace(/[^a-zA-Z0-9-_@.&+]/g, "");
		} else {
			return value.replace(/[^a-zA-Z0-9-_ ]/g, "");
		}
	}
};

// Actions before saving.
$.fn.save = function(options) {
	var defaults = {
		loader: true,
		afterHandler: false,
		afterUpload: false,
		pluploadRequired: false,
		handler: "",
		validationGroup: ""
	};

	var options = $.extend(defaults, options);

	var button = $(this);
	var container = $(this).parent();
	var toolbar = container.parents(".toolbar");
	var valid = true;

	if (!options.afterHandler && !options.afterUpload) {
		// Validate page.
		if (
			typeof Page_ClientValidate == "function" &&
			!Page_ClientValidate(options.validationGroup)
		) {
			valid = false;
		}
	}

	if (valid) {
		// Remove save warning.
		window.onbeforeunload = null;
		$(window).data("beforeunload", window.onbeforeunload);

		// 1. Prepare for save, use handler if needed.
		if (!options.afterHandler && !options.afterUpload) {
			// Set data from multi selects.
			$.fn.setMultiSelectsData();

			// Show loader.
			if (options.loader && toolbar.find(".loader").length > 0) {
				toolbar.find(".button").hide();
				toolbar.find(".loader").show();
			}

			// Errors.
			$.fn.initializeErrors();

			// Check if the use of a handler is needed.
			if (options.handler.length > 0) {
				// Use handler and come back to this function when done.
				container
					.find(".submitButton")
					.saveWithHandler({ handler: options.handler });

				return;
			}
		}

		// 2. Upload files.
		if (
			$(".uploader").length > 0 &&
			!options.afterUpload &&
			button.parent(".button").data("save-plupload-submit")
		) {
			var upload = false;

			// Show warning when user tries to close or refresh the window.
			window.onbeforeunload = function() {
				return settings.warnings.cancelUploadText;
			};

			$(window).data("beforeunload", window.onbeforeunload);

			// Uploaders.
			$(".uploader").each(function() {
				var uploader = $(this).pluploadQueue();

				if (uploader.total.uploaded == 0 && uploader.files.length > 0) {
					// Upload files.
					uploader.start();
					upload = true;
				} else {
					// Nothing to upload.
					$(this).addClass("done");
				}
			});

			if (upload) {
				// Upload in progress, come back to this function when done.
				return;
			} else {
				// No files to upload.
				if (options.pluploadRequired) {
					// Show error.
					$.fn.showError(
						settings.errors.noFileErrorText + " (500.40)"
					);

					toolbar.find(".loader").hide();
					toolbar.find(".button").show();

					return false;
				} else {
					// Continue saving.
					button = toolbar.find(".submitButton");
					options.afterUpload = true;
				}
			}
		}

		// 3. Default save after handler or upload.
		if (options.afterHandler || options.afterUpload) {
			// Remove upload warning.
			window.onbeforeunload = null;
			$(window).data("beforeunload", window.onbeforeunload);

			// Upload status.
			$(".uploadStatus").val(200);

			// Click default save button.
			button[0].click();
		}
	} else {
		// Show errors.
		$(".error").initializeErrors();
	}
};

// Save with handler.
$.fn.saveWithHandler = function(options)
{
	var button = $(this);

	if ($(".itemID").length > 0 && $(".itemID:last").val().length == 0)
	{
		switch (options.handler)
		{
			// Comment.
			case "commentWithFile":
				if ($('#addComment .commentFieldEditor .editor iframe').contents().find('body').text() != "" && $.fn.mettHCaptchaIsValid())
				{
					$.ajax({
						type: "POST",
						url: "/HandlerCommentsAddItem.ashx?",
						data:
						{
							pid: $("#addComment .currentItemID").val(),
							nameUser: $("#addComment .commentAuthor input:text").val(),
							namePage: $('#addComment .commentFieldEditor .editor iframe').contents().find('body').html(),
							token: $("input[name='__RequestVerificationToken']").val()
						}
					}).done(function(data)
					{
						if (typeof data.contentPageID !== "undefined" && data.contentPageID != null && data.contentPageID !== "" && data.contentPageID != "error")
						{
							// Set values.
							$("#addComment .upload .itemID").val(data.contentPageID);
							$("#addComment .itemAdded input:checkbox").prop("checked", true);

							// Continue with default save action.
							button.save({ afterHandler: true });
						}
						else
						{
							// Error.
							$.fn.showError(settings.errors.generalErrorText + " (500.3)");
						}
					}).fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.4)" );
					});
				}
				else
				{
					var errors = [];

					if ($('#addComment .commentFieldEditor .editor iframe').contents().find('body').text() == "")
						errors.push(settings.errors.noCommentText + " (500.24)");

					if (!$.fn.mettHCaptchaIsValid())
						errors.push(settings.errors.invalidHCaptchaText + " (500.106)");

					$.fn.showError(errors.join("<br />"));

					// Hide loader & show buttons.
					button.parents(".toolbar").find(".loader").hide();
					button.parents(".toolbar").find(".button").show();
				}

				break;

			// Forum topic.
			case "forum":
				if ($("#forum .field.topic input:text").val().length > 0)
				{
					$.ajax({
						type: "GET",
						url: "/HandlerDiscussionAddItem.ashx?",
						data:
						{
							namePage: $("#forum .field.topic input:text").val(),
							token: $("input[name='__RequestVerificationToken']").val()
						}
					}).done(function(data)
					{
						if (typeof data.contentPageID !== "undefined" &&
							data.contentPageID != null &&
							data.contentPageID !== "" &&
							data.contentPageID != "error")
						{
							// Set values.
							$("#forum .itemID").val(data.contentPageID);
							$("#forum .itemAdded input:checkbox").prop("checked", true);

							// Continue with default save action.
							button.save({ afterHandler: true });
						}
						else
						{
							// Error.
							$.fn.showError(settings.errors.generalErrorText + " (500.1)");
						}
					})
					.fail(function()
					{
						$.fn.showError(settings.errors.generalErrorText + " (500.2)" );
					});
				}

				break;

			// Map marker.
			case "marker":
				if (
					$("#marker .field.markerTitle input:text").val().length > 0
				) {
					$.ajax({
						type: "POST",
						url: "/api/ContentPages",
						data: {
							action: "add",
							pageType: "mapMarker",
							sectionID: $("#marker .sectionIDs").val(),
							titleText: $(
								"#marker .field.markerTitle input:text"
							).val(),
							token: $(
								"input[name='__RequestVerificationToken']"
							).val()
						}
					})
						.done(function(data) {
							data = JSON.parse(data);

							if (
								typeof data.contentPageID !== "undefined" &&
								data.contentPageID != null &&
								data.contentPageID !== "" &&
								data.contentPageID != "error"
							) {
								// Set values.
								$("#marker .itemID").val(data.contentPageID);

								// Continue with default save action.
								button.save({ afterHandler: true });
							} else {
								// Error.
								$.fn.showError(
									settings.errors.generalErrorText +
										" (500.5)"
								);
							}
						})
						.fail(function() {
							$.fn.showError(
								settings.errors.generalErrorText + " (500.6)"
							);
						});
				}

				break;

			// Notifications.
			case "notifications":
				if (typeof changedNotifications != "undefined") {
					// Save changed notifications in hidden field.
					$(".changedCheckboxes").val(
						JSON.stringify(changedNotifications)
					);

					// Continue with default save action.
					button.save({ afterHandler: true });
				} else {
					// Error.
					$.fn.showError(
						settings.errors.generalErrorText + " (500.28)"
					);
				}

				break;

			// eParticipation item.
			case "eParticipation":
				if (
					$("#eParticipation .field.projectTitle input:text").val()
						.length > 0 &&
					$(
						"#eParticipation .field.projectDescription textarea"
					).val().length > 0
				) {
					$.ajax({
						type: "POST",
						url: "/api/ContentPages",
						data: {
							action: "add",
							pageType: "eParticipatie",
							sectionID: settings.section.ID,
							titleText: $(
								"#eParticipation .field.projectTitle input:text"
							).val(),
							briefDescription: $(
								"#eParticipation .field.projectDescription textarea"
							).val(),
							token: $(
								"input[name='__RequestVerificationToken']"
							).val()
						}
					})
						.done(function(data) {
							data = JSON.parse(data);

							if (
								typeof data.contentPageID !== "undefined" &&
								data.contentPageID != null &&
								data.contentPageID !== "" &&
								data.contentPageID != "error"
							) {
								// Set values.
								$("#eParticipation .itemID").val(
									data.contentPageID
								);

								// Continue with default save action.
								button.save({ afterHandler: true });
							} else {
								// Error.
								$.fn.showError(
									settings.errors.generalErrorText +
										" (500.32)"
								);
							}
						})
						.fail(function() {
							$.fn.showError(
								settings.errors.generalErrorText + " (500.33)"
							);
						});
				}

				break;

			// Documents.
			case "documents":
				if (
					$("#documents .field.folderName input:text").val().length >
					0
				) {
					$.ajax({
						type: "GET",
						url: "/handlerdownloadadditem.ashx?",
						data: {
							pid: $(
								"#documents .multiSelectDestinationIDs"
							).val(),
							name: $(
								"#documents .field.folderName input:text"
							).val(),
							token: $(
								"input[name='__RequestVerificationToken']"
							).val()
						}
					})
						.done(function(data) {
							if (
								typeof data.contentPageID !== "undefined" &&
								data.contentPageID != null &&
								data.contentPageID !== "" &&
								data.contentPageID != "error"
							) {
								// Set values.
								$("#documents .itemID").val(data.contentPageID);
								$("#documents .itemAdded input:checkbox").prop(
									"checked",
									true
								);

								// Continue with default save action.
								button.save({ afterHandler: true });
							} else {
								// Error.
								$.fn.showError(
									settings.errors.generalErrorText +
										" (500.36)"
								);
							}
						})
						.fail(function() {
							$.fn.showError(
								settings.errors.generalErrorText + " (500.37)"
							);
						});
				}

				break;
		}
	} else {
		// Continue with default save action.
		button.save({ afterHandler: true });
	}
};

// Place data from multi selects in hidden fields.
$.fn.setMultiSelectsData = function() {
	$(".multiSelect").each(function(i) {
		var hiddenField = $(
			"#" +
				$(this)
					.find(".destination")
					.attr("id")
					.replace("listPickerDestination", "listPickerSelectedItems")
		).val("");

		// Add selected items to hidden field.
		$(this)
			.find(".combinedSelect option:selected")
			.each(function() {
				hiddenField.val(hiddenField.val() + ";" + $(this).val());
			});

		if ($(this).hasClass("rightsSelect")) {
			var adminRoleID = $(this)
				.find(
					".combinedSelect option:contains('" +
						settings.roles.administrators +
						"')"
				)
				.val();
			var moderatorRoleID = $(this)
				.find(
					".combinedSelect option:contains('" +
						settings.roles.moderators +
						"')"
				)
				.val();

			if (adminRoleID != undefined && moderatorRoleID != undefined) {
				var selectedRoles = hiddenField.val().split(";");
				var adminHasRights = false;
				var moderatorHasRights = false;

				$.each(selectedRoles, function(j) {
					if (selectedRoles[j] == adminRoleID) {
						adminHasRights = true;
					}

					if (selectedRoles[j] == moderatorRoleID) {
						moderatorHasRights = true;
					}
				});

				if (!adminHasRights) {
					// Administrators always have read, add, edit, delete, comment, vote & rate rights.
					hiddenField.val(hiddenField.val() + ";" + adminRoleID);
				}

				if (!moderatorHasRights) {
					// Moderators also always have read, add, edit, delete, comment, vote & rate rights.
					hiddenField.val(hiddenField.val() + ";" + moderatorRoleID);
				}
			}
		}
	});
};

// Update progress bar.
$.fn.updateProgressBar = function(options) {
	// Default values.
	var defaults = {
		progress: 0,
		showPercentage: true
	};

	var options = $.extend(defaults, options);
	var progressContainer = $(this);
	var progressBar = $(this).find(".progressBar");

	// Update progress bar.
	progressBar
		.stop()
		.animate(
			{ left: (options.progress / 100) * progressContainer.width() },
			1000
		);

	if (options.showPercentage) {
		// Show percentage.
		progressBar.html(
			'<span class="progressPercentage">' + options.progress + "%</span>"
		);
	}

	if (options.progress >= 100) {
		// Show ready message.
		$(".allDone").removeClass("hide");
	}
};

// Submit form when <enter> is pressed.
$.fn.submitOnEnter = function(options) {
	var input = $(this);
	var inputValue = input.val();
	var container = input.parent();

	// If it's a mention textarea, use parent as container.
	if (container.is(".mtaContainer")) {
		container = container.parent();
	}

	input.focus(function() {
		// Clear input value if the value is default.
		if (
			input.parents(".search").length > 0 &&
			(input.val() == settings.fields.searchFieldText ||
				input.val() == input.attr("data-search-default"))
		) {
			input.val("");
		}
	});

	input.blur(function() {
		if (input.val() == "" && input.parents(".search").length > 0) {
			// Restore original input value.
			if (input.attr("data-search-default") != undefined) {
				input.val(input.attr("data-search-default"));
			} else {
				input.val(settings.fields.searchFieldText);
			}
		}
	});

	input.keypress(function(e) {
		var keyCode;

		if (window.event) {
			keyCode = window.event.keyCode;
		} else if (e) {
			keyCode = e.which;
		}

		// Enter.
		if (keyCode == 13) {
			var searchInfoContainer = $('#searchInfoContainer'),
				searchInfoContainerText = '<span class="searchInfoText">' + settings.liveSearch.minimumSearchLengthText.replace('{0}', settings.liveSearch.minimumSearchLength) + '</span>';

			if (input.val() != "" && input.val().length > 2) {
				var submitButton;

				searchInfoContainer.stop().css({ opacity: 0, left: '100vw' });
				searchInfoContainer.find('.closeButton').attr('tabindex', -1);
				searchInfoContainer.find('.searchInfoText').remove();

				// Search.
				if (input.parents("#shortcuts, #searchContainer").length > 0) {
					submitButton = container.find("input:button");

					submitButton.unbind("click").click(function() {
						document.location.href =
						"/shortcuts/search_search.aspx?search=" +
							encodeURIComponent(input.val());
					});
				} else {
					if (container.find("a").length > 0) {
						submitButton = container.find("a:first");
					} else if (container.find("input:submit").length > 0) {
						submitButton = container.find("input:submit:first");
					} else {
						// Failover.
						submitButton = $(
							".button.save:last a, .button.save:last input:submit, .button.login:last input:submit"
						);
					}
				}

				// Submit.
				e.preventDefault();
				submitButton[0].click();
			}
			else
			{
				searchInfoContainer.parent().css('overflow', 'visible');
				searchInfoContainer.stop().css({ opacity: 1, left: 0 });
				searchInfoContainer.find('.closeButton').attr('tabindex', 0);

				if (searchInfoContainer.find('.searchInfoText').length === 0)
					searchInfoContainer.prepend(searchInfoContainerText);
			}

			return false;
		}
	});
};

// Set the color of an image or other element.
$.fn.setColor = function(options) {
	// Default values.
	var defaults = {
		color: "#ffffff",
		opacity: 1
	};

	var options = $.extend(defaults, options);

	if ($(this).length > 0) {
		if ($(this).is("img")) {
			var image = $(this);

			// Draw canvas.
			var canvas = document.createElement("canvas");
			canvas.width = image.width();
			canvas.height = image.height();

			// Draw new image.
			if (
				canvas.getContext &&
				image.width() != 0 &&
				image.height() != 0
			) {
				var canvasContext = canvas.getContext("2d");
				canvasContext.drawImage(
					image[0],
					0,
					0,
					image.width(),
					image.height()
				);

				var currentImage = canvasContext.getImageData(
					0,
					0,
					image.width(),
					image.height()
				);
				var newImage = canvasContext.getImageData(
					0,
					0,
					image.width(),
					image.height()
				);
				var newColor = $.fn.hexToRGB(options.color);

				// Replace current color with new color.
				for (var i = 0, j = newImage.data.length; i < j; i += 4) {
					if (newImage.data[i + 3] > 0) {
						newImage.data[i] =
							(currentImage.data[i] / 255) * newColor.R;
						newImage.data[i + 1] =
							(currentImage.data[i + 1] / 255) * newColor.G;
						newImage.data[i + 2] =
							(currentImage.data[i + 2] / 255) * newColor.B;
					}
				}

				// Save new image.
				canvasContext.putImageData(newImage, 0, 0);
				image.attr("src", canvas.toDataURL("image/png"));

				// Show image.
				image.show();
			}
		} else {
			var newColor = $.fn.hexToRGB(options.color);

			// Set element background.
			$(this).css(
				"background",
				"rgba(" +
					newColor.R +
					", " +
					newColor.G +
					", " +
					newColor.B +
					", " +
					options.opacity +
					")"
			);
		}
	}
};

// Return RGB color from HEX input.
$.fn.hexToRGB = function(hex) {
	var rgb = parseInt(hex.replace(/^#/, ""), 16);

	return {
		R: (rgb >>> 16) & 0xff,
		G: (rgb >>> 8) & 0xff,
		B: rgb & 0xff
	};
};

// Check if value is a HEX color.
$.fn.isHex = function(value) {
	var isHex = /^#[0-9A-F]{6}$/i.test(value);

	return isHex;
};

// Fixed path when scrolling.
$.fn.fixedPath = function()
{
	if ($('html').hasClass('desktop') && $('html').hasClass('threedotfive'))
	{
		var spacerHeight = $("#spacerTop").height(),
			topHeight = $("#top").height(),
			pathHeight = $("#pathOptions").height();

		if ($(document).scrollTop() > $("#royalSlider").height())
		{
			// Change top spacer height and make path fixed.
			if (spacerHeight != topHeight + pathHeight && $(window).width() > 1000)
			{
				$("#spacerTop").height(topHeight + pathHeight);
				$("#pathOptions").css({
					position: "fixed",
					top: topHeight,
					background: "#ffffff",
					"box-shadow": "0 2px 5px 2px rgba(85, 85, 85, .1)"
				});
			}
		}
		else
		{
			if (spacerHeight != topHeight)
			{
				// Default.
				$("#spacerTop").height(topHeight);
				$("#pathOptions").css({
					position: "relative",
					top: "0",
					background: "none",
					"box-shadow": "none"
				});
			}
		}
	}
};

// Remember focussed ID, so we can set the focus after an AJAX postback (Web guidelines).
$.fn.rememberFocus = function() {
	if (
		typeof document.activeElement != null &&
		document.activeElement != null &&
		document.activeElement.id != "" &&
		typeof document.activeElement.attributes["data-ignore-ajax-focus"] == "undefined"
	) {
		settings.focussedObjectID = document.activeElement.id;
	} else {
		settings.focussedObjectID = null;
	}
};

// Restore focus on element after AJAX postback (Web guidelines).
$.fn.restoreFocus = function() {
	if (
		typeof settings.focussedObjectID != "undefined" &&
		settings.focussedObjectID != null &&
		$.trim(settings.focussedObjectID) != "" &&
		settings.focussedObjectID.indexOf("$") == -1
	) {
		setTimeout(function() {
			$("#" + settings.focussedObjectID).focus();
		}, 200);
	}
};

// Create and show loader.
$.fn.showLoader = function(arguments) {
	if (
		typeof arguments._updatePanelsToUpdate != "undefined" &&
		arguments._updatePanelsToUpdate != null
	) {
		var updatePanel = $(
			"#" + arguments._updatePanelsToUpdate[0].split("$").join("_")
		);

		if (updatePanel.hasClass("updatePanel")) {
			if (updatePanel.css("position") == "static") {
				updatePanel.css({ position: "relative" });
			}

			// Create loader.
			var loader = $("<div />");
			loader.addClass("loader update");
			loader.attr("role", "status");

			var screenReaderContent = $('<span>');
			screenReaderContent.addClass('screenReaderContent');
			screenReaderContent.text(settings.buttons.savingText);

			loader.append(screenReaderContent);

			// Create scroll.
			var loaderScroll = function() {
				var offsetTop =
					$(document).scrollTop() +
					$(window).height() / 2 -
					loader.offset().top;

				// Always keep default margin of 20 pixels.
				if (offsetTop > loader.height() - 30) {
					offsetTop = loader.height() - 30;
				}

				if (offsetTop < 20) {
					offsetTop = 20;
				}

				loader.css({
					backgroundPosition: "center " + offsetTop + "px"
				});
			};

			// Show loader.
			updatePanel.append(loader.show());

			// Append scroll function.
			$(document).scroll(loaderScroll);
			loaderScroll();
		}
	}
};

// Create & show message.
$.fn.showMessage = function(options) {
	// Default values.
	var defaults = {
		content: "",
		className: "alert warning",
		showCloseButton: false,
		showHideButton: false,
		showActionButton: false,
		hideButtonText: settings.buttons.hideMessageText,
		actionButtonText: settings.buttons.actionButtonText,
		actionButtonLink: "",
		autoHideAfter: 5000,
		cookieID: -1
	};

	var options = $.extend(defaults, options);
	var container = $(this);
	var message = $(
		'<div class="message ' +
			options.className +
			'"><div class="messageContent">' +
			options.content +
			'</div><div class="messageButtons"></div></div>'
	);

	if ($.cookie("mettSystemMessage") == options.cookieID) {
		// Don't show if there's a cookie for this specific message.
		return;
	}

	// Close button.
	if (options.showCloseButton) {
		var closeButton = $("<div />");
		var closeButtonInput = $("<input />");

		closeButton.attr(
			"class",
			"button cancel ghost icon-cancel-circled before"
		);
		closeButtonInput.attr("type", "button");
		closeButtonInput.val(settings.buttons.closeMessageText);

		closeButtonInput.unbind("click").click(function() {
			$(".message").remove();
		});

		message
			.find(".messageButtons")
			.append(closeButton.append(closeButtonInput));
	}

	// Hide button.
	if (options.showHideButton) {
		var hideButton = $("<div />");
		var hideButtonInput = $("<input />");
		var hideButtonText = options.hideButtonText;

		hideButton.attr(
			"class",
			"button hideButton ghost icon-cancel-circled before"
		);
		hideButtonInput.attr("type", "button");
		hideButtonInput.val(hideButtonText);

		hideButtonInput.unbind("click").click(function() {
			if (options.cookieID != -1) {
				$.cookie("mettSystemMessage", options.cookieID);
			}

			$(".message").remove();
		});

		message
			.find(".messageButtons")
			.append(hideButton.append(hideButtonInput));
	}

	// Action button.
	if (options.showActionButton) {
		var actionButton = $("<div />");
		var actionButtonInput = $("<input />");
		var actionButtonText = options.actionButtonText;

		actionButton.attr(
			"class",
			"button actionButton general icon-forward before"
		);
		actionButtonInput.attr("type", "button");
		actionButtonInput.val(actionButtonText);

		if (options.actionButtonLink != "") {
			actionButtonInput.unbind("click").click(function() {
				window.open(options.actionButtonLink);
			});
		}

		message
			.find(".messageButtons")
			.append(actionButton.append(actionButtonInput));
	}

	setTimeout(function() {
		message.css({ display: "block", top: -(message.outerHeight() + 5) });
		message.stop(true).animate({ top: 0 }, 500);
	}, 50);

	// Remove previous messages.
	$(".message").remove();

	// Show message.
	container.append(message);

	if (options.autoHideAfter > 0) {
		// Auto hide.
		setTimeout(function() {
			message
				.stop(true)
				.animate({ top: -(message.outerHeight() + 5) }, 1000);
		}, options.autoHideAfter);
	}
};

// Show error.
$.fn.showError = function(error, type) {
	if (type == "console") {
		console.log(error);
	} else {
		$.fn.alert(error);
	}
};

// Set system role names.
$.fn.setSystemRoleNames = function() {
	var roleNames = $(this);

	roleNames.each(function() {
		var roleName = $(this);

		// Check for required fields.
		if (
			roleName.data("required") != undefined &&
			roleName.data("required")
		) {
			roleName.addClass("disabled");
		}

		// Change role name if needed.
		switch (roleName.text().toLowerCase()) {
			case "community-administrators":
				roleName.text(settings.roles.administrators);
				break;

			case "community-moderators":
				roleName.text(settings.roles.moderators);
				break;

			case "community-authenticated":
				roleName.text(settings.roles.authenticated);
				break;

			case "community-everyone":
				roleName.text(settings.roles.everyone);
				break;

			case "community-roleless":
				roleName.text(settings.roles.roleless);
				break;

			case "community-senders":
				roleName.text(settings.roles.senders);
				break;
		}
	});
};

// Set responsive video frame size.
$.fn.setVideoFrameSize = function() {
	$(this).each(function() {
		var videoFrame = $(this);

		if (
			typeof videoFrame.data("aspectRatio") == "undefined" ||
			videoFrame.data("aspectRatio") == null
		) {
			return;
		}

		videoFrame.css({
			height: videoFrame.width() / videoFrame.data("aspectRatio")
		});
	});
};

// Place last handler as first.
$.fn.placeLastHandlerFirst = function(handlerType) {
	if (
		typeof handlerType == "undefined" ||
		handlerType == null ||
		$.trim(handlerType) == ""
	) {
		handlerType = "click";
	}

	$(this).each(function() {
		var targetObject = $(this);
		var objectEvents = $._data(targetObject[0], "events");

		if (typeof objectEvents != "undefined" && targetObject != null) {
			var eventsArray = objectEvents[handlerType];

			if (
				typeof eventsArray != "undefined" &&
				eventsArray != null &&
				eventsArray.length > 1
			) {
				eventsArray.unshift(eventsArray.pop());
			}
		}
	});
};

// Add vote to poll question.
$.fn.setPollVote = function(aObject, pollID) {
	var theObject = $(aObject);
	var value = theObject.find("input:checked").val();

	if (value == null || value == "" || value == undefined) {
		return;
	}

	theObject
		.find("input[type='submit']")
		.parent()
		.replaceWith('<div class="loader show"></div>');

	// Talk to handler.
	$.getJSON(
		"/HandlerGlobal.ashx?",
		{
			action: "pollVote",
			value: value,
			pollID: pollID,
			preventCache: new Date().getTime(),
			token: $("input[name='__RequestVerificationToken']").val()
		},
		function(data) {
			document.location.reload();
		}
	);
};

// Change element type.
$.fn.changeElementType = function(newType) {
	$(this).each(function() {
		var attrs = {};
		var events = {};

		$.each(this.attributes, function(idx, attr) {
			attrs[attr.nodeName] = attr.nodeValue;
		});

		events = $._data(this, "events");

		$(this).replaceWith(function() {
			return $("<" + newType + "/>", attrs).append($(this).contents());
		});

		for (eventType in events) {
			for (var i = 0; i < events[eventType].length; i++) {
				$(this)[eventType](events[eventType][i].handler);
			}
		}
	});
};

// Get real width and height of browser.
$.fn.viewport = function() {
	var element = window,
		attribute = "inner";

	if (!("innerWidth" in window)) {
		attribute = "client";
		element = document.documentElement || document.body;
	}

	return {
		width: element[attribute + "Width"],
		height: element[attribute + "Height"]
	};
};

// Custom alert function.
$.fn.alert = function(message, title) {
	var alertMessage = message;
	var alertTitle = settings.various.alertOverlayTitle;

	if (title != undefined) {
		alertTitle = title;
	}

	// Remove previous alert messages.
	$(".alertOverlay").remove();

	// Create new alert message.
	var alertOverlay = $(
		'<div class="overlay alertOverlay" aria-modal="true"><div class="overlayContent" /></div>'
	);
	var closeButton = $(
		'<a href="#" class="button close info icon-cancel-circled iconOnly before pointer"><span class="screenReaderContent">' +
			settings.buttons.closeText +
			"</span></a>"
	);
	var continueButton = $(
		'<div class="button continue general before"><input type="button" value="' +
			settings.buttons.closeText +
			'" ></div>'
	);

	continueButton
		.find("input:button")
		.unbind("click")
		.click(function() {
			closeButton.click();
		});

	alertOverlay
		.find(".overlayContent")
		.append(closeButton)
		.append('<h1 class="overlayItemTitle">' + alertTitle + "</h1>");
	alertOverlay
		.find(".overlayContent")
		.append(
			"<p>" + alertMessage + '</p><div class="toolbar toolbarBottom" >'
		);
	alertOverlay
		.find(".toolbarBottom")
		.append(continueButton)
		.show();

	// Show message.
	$("body").append(alertOverlay);
	$(".alertOverlay").initializeOverlays();
};

// Custom confirm function.
$.fn.confirm = function(message, forceClose) {
	var trigger = $(this);

	// Remove previous confirm messages.
	$(".confirmOverlay").remove();

	if (trigger.data("confirmed") != undefined) {
		// Reset.
		trigger.removeData("confirmed");

		// Continue.
		return true;
	} else {
		// Create new confirm message.
		var continueText = settings.buttons.continueText;
		var continueClass = "general icon-forward";

		if (trigger.data("continue-text") != undefined) {
			continueText = trigger.data("continue-text");
		}

		if (trigger.data("continue-class") != undefined) {
			continueClass = trigger.data("continue-class");
		}

		var confirmOverlay = $(
			'<div class="overlay confirmOverlay" aria-modal="true"><div class="overlayContent" /></div>'
		);
		var closeButton = $(
			'<a href="#" class="button close info icon-cancel-circled iconOnly before pointer"><span class="screenReaderContent">' +
				settings.buttons.closeText +
				"</span></a>"
		);
		var cancelButton = $(
			'<div class="button cancel info icon-cancel-circled before"><input type="button" value="' +
				settings.buttons.cancelText +
				'" ></div>'
		);
		var continueButton = $(
			'<div class="button continue ' +
				continueClass +
				' before"><input type="button" value="' +
				continueText +
				'" ></div>'
		);

		cancelButton
			.find("input:button")
			.unbind("click")
			.click(function() {
				$(".confirmOverlay").click();
			});

		continueButton
			.find("input:button")
			.unbind("click")
			.click(function() {
				trigger.data("confirmed", "true");

				// Re-enable scrolling.
				$("body").removeClass("overlayOpen");

				if (forceClose != null && forceClose) {
					closeButton.click();
				} else {
					if (trigger.is("a")) {
						trigger[0].click();
					} else {
						trigger.click();
					}
				}

				$.fn.restoreLastFocus();
			});

		confirmOverlay
			.find(".overlayContent")
			.append(closeButton)
			.append(
				'<h1 class="overlayItemTitle">' +
					settings.various.warningOverlayTitle +
					"</h1><p>" +
					message +
					'</p><div class="toolbar toolbarBottom" >'
			);
		confirmOverlay
			.find(".toolbarBottom")
			.append(cancelButton)
			.append(continueButton)
			.show();

		// Show message.
		$("body").append(confirmOverlay);
		$(".confirmOverlay").initializeOverlays();

		// Wait for confirmation.
		return false;
	}
};

// Create clickable links.
$.fn.createClickableLinks = function(options) {
	// Default values.
	var defaults = {
		target: "_blank"
	};

	var options = $.extend(defaults, options);
	var regEx1, regEx2, regEx3;
	var replacedItemCount = 0;

	// URLs starting with http://, https://, or ftp://.
	regEx1 = /(^|[^\"])(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

	// URLs starting with www. (without //).
	regEx2 = /(^|[^\/])(www\.[-A-Z0-9+&@#\/%?=~_|!:,.;]+(\b|$))/gim;

	// Mailto links.
	regEx3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;

	$(this).each(function()
	{
		var content = $(this);
		var newContent = content.html();

		if (content.length > 0 &&
			content.html().length > 0 &&
			(regEx1.test(newContent) ||
				regEx2.test(newContent) ||
				regEx3.test(newContent)))
		{
			newContent = newContent.replace(
				regEx1,
				'$1<a href="$2" target="' + options.target + '">$2</a>'
			);
			newContent = newContent.replace(
				regEx2,
				'$1<a href="http://$2" target="' + options.target + '">$2</a>'
			);
			//newContent = newContent.replace(regEx3, "<a href=\"mailto:$1\">$1</a>");
			replacedItemCount += 1;

			// Replace.
			content.html(newContent);

			if ($('#groups').length > 0 || $('#documents-v3').length > 0)
				content.find(".tagUsers").mentionTextArea();
		}
	});

	if (
		replacedItemCount > 0 &&
		($(".no-touch").length > 0 || $(".touch.desktop").length > 0) &&
		$("*[data-user-id]").length > 0
	) {
		// Re-initialize tagged users from cache.
		if (settings.userDialog.instance != null) {
			settings.userDialog.instance.init();
		}
	}

	// Return.
	return $(this);
};

// Set alternating rows in a list/table.
$.fn.setAlternatingRows = function(options) {
	$(this).each(function(i) {
		var row = $(this);

		row.removeClass("alternate");

		if (i % 2) {
			row.addClass("alternate");
		}
	});
};

// Create a custom drop down.
$.fn.createDropDown = function(aOptions, aDefaultValue, aRequired) {
	// <options> expects an array: [ [text1, value1], [text2, value2], [text3, value3] ].
	if ($.isArray(aOptions)) {
		$(this).each(function() {
			var theTargetElement = $(this);
			var theID = theTargetElement.attr("id") + "_dropDown";

			// If it has been initialized before, remove old dropDown.
			$("#" + theID).remove();

			var theDropDown = $(
				'<select id="' + theID + '" class="dynamicDropdown">'
			);
			theDropDown.change(function() {
				theTargetElement.val($(this).val());
			});

			for (var theIndex in aOptions) {
				var theSelected = "";
				if (aOptions[theIndex][1] == aDefaultValue)
					theSelected = "selected";

				theDropDown.append(
					$(
						'<option value="' +
							aOptions[theIndex][1] +
							'" ' +
							theSelected +
							">" +
							aOptions[theIndex][0] +
							"</option>"
					)
				);
			}

			theDropDown.insertAfter(theTargetElement);
			theTargetElement.hide();

			if ($.trim(theTargetElement.val()) != "") {
				theDropDown.val(theTargetElement.val());

				if (theDropDown.val() == null) {
					if (
						typeof aDefaultValue != "undefined" &&
						aDefaultValue != null
					)
						theDropDown.val(aDefaultValue);
					else theDropDown.val(aOptions[0][1]);

					theDropDown.change();
				}
			}

			if (
				aRequired &&
				theTargetElement.data("requiredInitialized") !== true
			) {
				$(
					"[id$='_btnEdit'], [id$='_btnAdd'], [id$='_btnEditSection'], [id$='_btnAddSection']"
				).click(function() {
					if ($.trim(theTargetElement.val()) == "") {
						if ($(".errorMessage ul").length == 0)
							$(".errorMessage").html(
								"<h2>Let op:</h2><div><p>Het formulier kon niet verzonden worden. Los de volgende punten op en verstuur het formulier opnieuw.</p></div><ul></ul>"
							);

						$(
							".errorMessage li." +
								theTargetElement.attr("id") +
								"_warning"
						).remove();
						$(".errorMessage ul").append(
							'<li class="' +
								theTargetElement.attr("id") +
								'_warning">' +
								$.trim(
									$(
										"label[for='" +
											theTargetElement.attr("id") +
											"'"
									).html()
								) +
								" " +
								settings.errors.isRequiredText +
								"</li>"
						);

						theTargetElement
							.parents(".field:first")
							.addClass("danger");

						$(".errorMessage").css({
							visibility: "visible",
							display: "block"
						});

						$(this)
							.parent()
							.show();
						$(".loader").hide();

						setTimeout(function() {
							$("html, body").scrollTop(0);
						}, 40);

						return false;
					}
				});

				theTargetElement.data("requiredInitialized", true);
			}
		});
	}

	return $(this);
};

// File size formatting.
$.fn.convertFileSize = function(options) {
	var defaults = {
		fileSize: 0,
		numberOfDecimals: 2
	};

	var options = $.extend(defaults, options);
	var formattedFileSize = 0;

	if (options.fileSize > 0 && options.fileSize != null) {
		var i = Math.floor(Math.log(options.fileSize) / Math.log(1024));

		if (i > 2) {
			// GB or TB.
			options.numberOfDecimals = 2;
		}

		formattedFileSize =
			(options.fileSize / Math.pow(1024, i)).toFixed(
				options.numberOfDecimals
			) *
				1 +
			" " +
			["B", "kB", "MB", "GB", "TB"][i];
	}

	return formattedFileSize.toString().replace(".", settings.decimalSeparator);
};

// Change font size.
$.fn.changeFontSize = function(value)
{
	if ($.isNumeric(value))
	{
		$(this).each(function()
		{
			var element = $(this);
			var fontSize = parseInt(element.css("font-size"));

			if (value > 0) // Increment font size.
				element.css({ "font-size": fontSize + value, height: "auto" });
			else // Decrement font size.
				element.css({ "font-size": fontSize - Math.abs(value), height: "auto" });
		});

		// Re-initialize spacers.
		$.fn.initializeSpacers({ resize: true });
	}
};

// Validate various form field types.
$.fn.fieldValidator = function(type, value) {
	var regEx = "";
	var returnValue = false;

	switch (type) {
		case "email":
			regEx = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			break;

		case "tel":
			regEx = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/;
			break;

		case "url":
			regEx = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
			break;
	}

	if (regEx != "") {
		returnValue = regEx.test(value);
	}

	return returnValue;
};

// Mobile check.
$.fn.mobileCheck = function() {
	var check = false;

	(function(a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);

	return check;
};

// Create custom tooltips.
$.fn.createTooltip = function() {
	var elements = $(this);

	elements.each(function() {
		var element = $(this);
		var content = element.attr("title");

		if (content == undefined) {
			content = element.attr("alt");
		}

		if (content != undefined && content != "") {
			element
				.hover(
					function() {
						// Hover.
						element.data("tipText", content);
						$('<span class="tooltip"></span>')
							.text(content)
							.appendTo("body")
							.fadeIn("slow");
					},
					function() {
						// Hover out.
						$(".tooltip").remove();
					}
				)
				.mousemove(function(e) {
					var mouseX = e.pageX + 20;
					var mouseY = e.pageY + 10;

					$(".tooltip").css({
						top: mouseY,
						left: mouseX
					});
				});
		}
	});
};

function getUrlParameter(param) {
	var pageUrl = window.location.search.substring(1),
		urlVariables = pageUrl.split("&"),
		parameterName,
		i;

	for (i = 0; i < urlVariables.length; i++) {
		parameterName = urlVariables[i].split("=");

		if (parameterName[0] === param) {
			return parameterName[1] === undefined
				? true
				: decodeURIComponent(parameterName[1]);
		}
	}
}

function onImageError(elem) {
	$(elem).prop(
		"src",
		"/communities/common/themes/mett%20responsive/images/various/transparent.png"
	);

	return true;
}

$.fn.saveLastFocus = function() {
	var currentFocus = $(":focus");

	if (currentFocus.length > 0)
		$(document).data("lastFocusElement", currentFocus[0]);
	else
		$(document).data("lastFocusElement", undefined);
}

$.fn.restoreLastFocus = function () {
	var lastFocus = $(document).data("lastFocusElement");

	if (lastFocus)
	{
		lastFocus.focus();
	}
}

$.fn.validUrl = function(value) {
	var pattern = new RegExp('^(?:(?:https?|ftp|file)?:?\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])', 'i');

	return !!pattern.test(value);
}
