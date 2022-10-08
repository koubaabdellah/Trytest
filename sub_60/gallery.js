$(document).ready(function()
{
	// Initialize.
	$("#gallery.section").initializeGallery();


    if (typeof Sys != "undefined" && typeof Sys.WebForms != "undefined") {
        // After AJAX call.
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function (sender, e) {
            $("#gallery.section").initializeGallery();
        });
    }
});

// Initialize photo gallery.
$.fn.initializeGallery = function()
{
    // Download all photos.
	$("#toolbarBottom .button.download a").unbind("click").click(function() {
		$.fn.alert(settings.documents.downloadText + "</p><h2>" + settings.warnings.warningText + ":</h2><p>" + settings.documents.downloadWarningText + "<br /><br />", settings.buttons.savingText);
	});
};