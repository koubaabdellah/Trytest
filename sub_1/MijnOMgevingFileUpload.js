function initMijnOmgevingFileUpload(options) {
    var fuInput = $(options.fileInputId);
    var fuDropzone = fuInput.siblings(".fileupload-dropzone");
    var lblMessage = fuInput.parent().find(">span");

    var checkFileSize = function(file) {
        if (file.size > options.maxFileSize) {
            alert(options.fileTooLarge);
            return false;
        }
        return true;
    }

    var showFile = function(hasFile, filename) {
        fuDropzone.toggleClass("fileupload-dropzone-file-selected", hasFile);

        fuDropzone.find(".fileupload-dropzone-no-file").toggle(!hasFile);
        fuDropzone.find(".fileupload-dropzone-file").toggle(hasFile).find(".filename").text(filename);
    }

    fuInput.change(function() {
        if (lblMessage) {
            lblMessage.hide();
        }

        var hasFile = fuInput[0].files.length > 0;

        if (hasFile & !checkFileSize(fuInput[0].files[0])) {
            hasFile = false;
        }

        if (!hasFile) {
            fuInput[0].value = null;
        }

        showFile(hasFile, hasFile ? fuInput[0].files[0].name : "");
    });

    fuDropzone
        .click(function() {
            fuInput.trigger("click");

            fuDropzone.toggleClass("fileupload-dropzone-file-selected", false);

            fuDropzone.find(".fileupload-dropzone-no-file").toggle(true);
            fuDropzone.find(".fileupload-dropzone-file").toggle(false).find(".filename").text("");
        })
        .on("dragenter",
            function(e) {
                e.preventDefault();
                e.stopPropagation();
                fuDropzone.toggleClass("fileupload-dropzone-dragover", true);
            })
        .on("dragover",
            function(e) {
                e.preventDefault();
                e.stopPropagation();
            })
        .on("dragleave",
            function(e) {
                e.preventDefault();
                e.stopPropagation();
                fuDropzone.toggleClass("fileupload-dropzone-dragover", false);
            })
        .on("drop",
            function(e) {
                e.preventDefault();
                e.stopPropagation();

                if (lblMessage) {
                    lblMessage.hide();
                }

                fuDropzone.toggleClass("fileupload-dropzone-dragover", false);

                var dt = e.originalEvent.dataTransfer;
                var files = dt.files;

                if (files.length === 0) {
                    alert(options.noFile);
                    return;
                }
                if (files.length > 1) {
                    alert(options.TooManyFiles);
                    return;
                }

                var file = files[0];

                var hasFile = true;
                if (!checkFileSize(file)) {
                    hasFile = false;
                }

                if (hasFile) {
                    fuInput[0].files = files;
                } else {
                    fuInput[0].value = null;
                }

                showFile(hasFile, hasFile ? file.name : "");
            });
}