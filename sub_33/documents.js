$(document).ready(function()
{
	// Initialize.
	$.fn.initializeDocuments();
	
	if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined")
	{
		// After AJAX call.
		Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function(sender, e)
		{
			$.fn.initializeDocuments();
		});
	}
});

// Initialize documents.
$.fn.initializeDocuments = function()
{
	// Folder view.
	$("#documents .sectionContent .item .button.showMore").each(function()
	{
		if ($(this).parents(".item").find(".file").length > 0)
		{
			$(this).removeClass("hide").parent().show();
		}
	});
	
	// Toggle all files.
	$(".toggleAllFiles").unbind("click").click(function()
	{
		if ($(this).is(":checked"))
		{
			// Select & show all files.
			$(".list .row .file input[type=checkbox]").prop("checked", true).change();
			$(".list .row .toggleFiles").removeClass("icon-plus-squared").addClass("icon-minus-squared");
			$(".list .row .itemTitle").css("font-weight", "600");
			$(".list .row .files").removeClass("hide");
		}
		else
		{
			// Unselect & hide all files.			
			$(".list .row .file input[type=checkbox]").prop("checked", false).change();
			$(".list .row .toggleFiles").removeClass("icon-minus-squared").addClass("icon-plus-squared");
			$(".list .row .itemTitle").css("font-weight", "normal");
			$(".list .row .files").addClass("hide");
		}
	});
	
	if (!settings.section.isAdd && !settings.section.isEdit)
	{
		$(".toggleAllFiles").removeClass("hide");
	}
	
	// Toggle files in single folder.
	$(".toggleFiles").unbind("click").click(function()
	{
		var filesToggle = $(this);
		
		if (filesToggle.hasClass("icon-plus-squared"))
		{
			// Show files.
			filesToggle.removeClass("icon-plus-squared").addClass("icon-minus-squared");
			filesToggle.next(".itemTitle").css("font-weight", "600");
			filesToggle.parents(".row:first").find(".files").removeClass("hide");				
		}
		else
		{
			// Hide files.
			filesToggle.removeClass("icon-minus-squared").addClass("icon-plus-squared");
			filesToggle.next(".itemTitle").css("font-weight", "normal");
			filesToggle.parents(".row:first").find(".files").addClass("hide");
		}
	});
		
	// Download button.
	$(".file input[type=checkbox]").change(function()
	{		
		if ($(".file input[type=checkbox]:checked").length > 0)
		{
			$(".download").removeClass("hide");
			$("#toolbarBottom").show();			
		}
		else
		{
			$(".download").addClass("hide");
			
			if ($("#toolbarBottom .button").length == 1)
			{
				$("#toolbarBottom").hide();
			}
		}
	});
	
	// Download files.
	$("#toolbarBottom .download a").click(function()
	{
		var fileIDs = $(".fileIDs");
		fileIDs.val("");
		
		$(".file input[type=checkbox]:checked").each(function()
		{
			if ($(".file input[type=checkbox]:checked").length > 0 && fileIDs.val().length > 0)
			{
				fileIDs.val(fileIDs.val() + ";" + $(this).val());
			}
			else
			{
				fileIDs.val($(this).val());
			}
		});
	}).placeLastHandlerFirst();
	
	$("#toolbarTop .download").click(function()
	{
		$("#toolbarBottom .download a")[0].click();
		
		return false;
	});
};