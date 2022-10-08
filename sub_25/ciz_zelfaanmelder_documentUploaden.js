var process = process || {env: {NODE_ENV: "development"}};
var documentColumnName;
var soortDocumentColumnName;
var grootte;
var bestandsNaam;
var cizMaxFileSize;
var verplichtMessage;
var uploadDocumentlink;
var listDocumentsLink;
var gridDocumentverwijderen;
var gridDocumentWijzigen;
var dialogTitleDocumentWijzigen;
var dialogTitleError;
var dialogTitleDeleteDocument;
var documentAnnuleren;
var buttonYesLabel;
var buttonNoLabel;
var gridElement;
var toevoegenButtonElement;
var annulerenButtonElement;
var soortDocumentElement;
var fileInputElement;
var documentnaamElement;
var maximumNumberOfFileCount;
var maximumNumberOfFileCountMessage;
var maximumFileSizeMessage;
var errorMessageUploadDoc;
var afrondenLink;
var afrondenFlag;
var afrondenButtonElement;
var minimumNumberOfFileCount;
var status;
var toegangscodePage;
var conceptDocsList = [];

$(function () {
    $("#main").addClass("upload");
    gridElement = $("#documenten-upload-resultaat");
    toevoegenButtonElement = $("#upload_request");
    annulerenButtonElement = $('#resetFile');
    soortDocumentElement = $("select[id='soortDocument']");
    fileInputElement = $("input[type='file']");
    documentnaamElement = $("#documentNaam");
    afrondenButtonElement = $('#upload');
    afrondenFlag = true;

    maximumNumberOfFileCountMessage = $("div[id='functionele_melding.002060']");
    maximumFileSizeMessage = $("div[id='functionele_melding.002061']");
    validNaamMessage = $("div[id='functionele_melding.2070']");

    documentColumnName = $('#documentColumnName').val();
    errorMessageUploadDoc = $('#errorMessageUploadDoc').val();
    soortDocumentColumnName = $('#soortDocumentColumnName').val();
    grootte = $('#grootte').val();
    bestandsNaam = $('#bestandsNaam').val();
    verplichtMessage = $('#verplichtMessage').val();
    gridDocumentverwijderen = $('#gridDocumentverwijderen').val();
    gridDocumentWijzigen = $('#gridDocumentWijzigen').val();
    documentAnnuleren = $('#documentAnnuleren').val();
    buttonYesLabel = $('#buttonYesLabel').val();
    buttonNoLabel= $('#buttonNoLabel').val();
    dialogTitleDocumentWijzigen= $('#dialogTitleDocumentWijzigen').val();
    dialogTitleError= $('#dialogTitleError').val();
    dialogTitleDeleteDocument= $('#dialogTitleDeleteDocument').val();
    status= $('#status').val();

    uploadDocumentlink= $('#uploadDocumentlink').val();
    listDocumentsLink= $('#listDocumentsLink').val();
    afrondenLink= $('#afrondenLink').val();

    cizMaxFileSize= $('#cizMaxFileSize').val();
    maximumNumberOfFileCount= $('#maximumNumberOfFileCount').val();
    minimumNumberOfFileCount= $('#minimumNumberOfFileCount').val();
    toegangscodePage= ($('#toegangscodePage').val() === "true");

    $('#spinner').hide();
    $('#spinnerMessage').hide();

    jQuery.ajaxSetup({
        beforeSend: function () {
            $('#spinner').show();
            $('#spinnerMessage').show();
        },
        complete: function () {
            $('#spinner').hide();
            $('#spinnerMessage').hide();
        }
    });

    setUpGrid();

    clearFields();
    disableFieldsExceptFileInput(true);

    gridElement.trigger("reloadGrid", [{page: 1}]);

    annulerenButtonElement.click(function (e) {
        e.preventDefault();
        clearFields();
        disableFieldsExceptFileInput(false);
    });

    soortDocumentElement.change(function () {
        if ($(this).find("option:selected").val() !== '' && $(this).find("option:selected").val() !== undefined) {
            documentnaamElement.val($(this).find("option:selected").text() + '-' + formatDateToString(new Date()));
            toevoegenButtonElement.prop('disabled', false);
            annulerenButtonElement.prop('disabled', false);
            checkFortMaxUploadedDocuments();
        } else {
            disableButtons(false);
            documentnaamElement.val($(this).find("option:selected").text());
        }
    });

    toevoegenButtonElement.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        checkDocumentUploadCall();
    });
});

//To fix a Sonar major
function checkDocumentUploadCall() {
    if (validateFields()) {
        uploadDocumentCall();
    }
}

$(function () {
    $('#file').change(function () {
        $("ul.error-messages-list.left").remove();
        var maxFileSize = parseInt(cizMaxFileSize);
        var fileSizeValidation = false;
        var fileNaamValidation = false;
        var fileValidation = false;
        if (maxFileSize !== -1) {
            fileSizeValidation = validateFileSize(maxFileSize);
            fileNaamValidation = validateFileNaam();
            if (fileSizeValidation && fileNaamValidation){
                fileValidation = true
            }
        }
        if (validateFileSelection() && fileSizeValidation && fileValidation) {
            soortDocumentElement.prop('disabled', false);
            documentnaamElement.prop('disabled', false);
        } else {
            soortDocumentElement.prop('disabled', true);
            documentnaamElement.prop('disabled', true);
            disableButtons(false);
        }
    });
});

function checkForConceptStatus() {
    conceptDocsList = gridElement.getRowData();
    conceptDocs = false;
    for (i=0; i<conceptDocsList.length; i++) {
        if (conceptDocsList[i].status === 'Toegevoegd') {
            conceptDocs = true;
            break;
        }
    }
}

function setUpGrid() {
    gridElement.jqGrid({
        url: listDocumentsLink,
        datatype: 'json',
        mtype: 'POST',

        gridComplete: function () {
            checkForConceptStatus();
            addLeavePageHandler(true);
            checkFortMaxUploadedDocuments();
            checkVersturenButton();
        },
        jsonReader: {
            repeatitems: false
        },
        colNames: [
            documentColumnName,
            soortDocumentColumnName,
            grootte,
            bestandsNaam,
            status,
            '',
            '',
            ''
        ],
        colModel: [
            {name: 'documentNaam', index: 'naam', width: 200, classes: 'firstCol'},
            {name: 'soortDocument', index: 'soort', width: 200},
            {name: 'grootte', index: 'grootte', width: 100},
            {name: 'bestandsNaam', index: 'bestandsnaam', width: 240},
            {name: 'status', index: 'status', width: 100, hidden: !toegangscodePage},
            {
                name: 'viewLink',
                index: 'viewLink',
                sortable: false,
                formatter: openLinkFormatter,
                width: 40,
                title: false
            },
            {
                name: 'openLink',
                index: 'openLink',
                sortable: false,
                formatter: editlinkFormatter,
                width: 40,
                title: false
            },
            {
                name: 'deleteLink',
                index: 'deleteLink',
                sortable: false,
                formatter: deleteLinkFormatter,
                width: 40,
                title: false
            }
        ],
        autowidth: true,
        loadui: "block",
        pager: '#pager-documenten-upload',
        sortorder: 'desc',
        rowNum: 10,
        rowList: [10, 20, 30],
        viewrecords: true,
        gridview: true,
        sortable: true,
        height: 'auto'
    });
}

function checkVersturenButton(){
    if(conceptDocs === true){
        afrondenButtonElement.prop('disabled', false);
    }else{
        afrondenButtonElement.prop('disabled', true);
    }
}
function uploadDocumentCall() {
    var formData = new FormData($("form[id=uploadForm]")[0]);
    clearFields();
    disableAllFields(false);
    $.ajax({
        url: uploadDocumentlink,
        type: 'POST',
        cache: false,
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false,
        success: function (dataJson) {
            gridElement.trigger("reloadGrid", [{page: 1}]);
            disableFieldsExceptFileInput(false);
        },
        error: function (xhr) {
            disableFieldsExceptFileInput(false);
            openErrorPopup(xhr.responseText);
        }
    });
}

function clearFields() {
    soortDocumentElement.val('');
    documentnaamElement.val('');
    fileInputElement.val('');
    disableButtons(false);
}

function disableFieldsExceptFileInput(afrondenDisabled) {
    disableButtons(afrondenDisabled);
    soortDocumentElement.prop('disabled', true);
    documentnaamElement.prop('disabled', true);
    fileInputElement.prop('disabled', false);
}

function disableAllFields(afrondenDisabled) {
    disableFieldsExceptFileInput(afrondenDisabled);
    fileInputElement.prop('disabled', true);
}

function openLinkFormatter(cellvalue, options, rowObject) {
    if(rowObject.status === 'Verstuurd' && toegangscodePage){
        return ''
    }else{
        return linkFormatter(cellvalue, 'ion-document', 'Bekijken',31, '_blank')
    }
}

function disableButtons(afrondenDisabled) {
    toevoegenButtonElement.prop('disabled', true);
    annulerenButtonElement.prop('disabled', true);
    if(afrondenDisabled) {
        afrondenButtonElement.prop('disabled', true);
    }
}

function checkFortMaxUploadedDocuments() {
    var rowCount = gridElement.getRowData().length;
    if (rowCount >= minimumNumberOfFileCount) {
        afrondenButtonElement.prop('disabled', false);
    } else {
        afrondenButtonElement.prop('disabled', true);
    }
    if (rowCount >= maximumNumberOfFileCount) {
        disableAllFields(false);
        maximumNumberOfFileCountMessage.show();
        return true;
    } else {
        fileInputElement.prop('disabled', false);
        maximumNumberOfFileCountMessage.hide();
        return false;
    }
}

function validateFileSelection() {
    if (fileInputElement.val() !== "") {
        return true;
    }
    else {
        $('<ul class="error-messages-list left"><li class="warning left">- ' + verplichtMessage + '</li></ul>').insertAfter(fileInputElement);
        fileInputElement.addClass("errorBorder");
        return false;
    }
}

function validateFileSize() {
    var validated = validateAsPerBrowser();
    if (validated !== true) {
        maximumFileSizeMessage.show();
        fileInputElement.addClass("errorBorder");
    } else {
        maximumFileSizeMessage.hide();
    }
    return validated;
}

function validateAsPerBrowser() {
    return (fileInputElement[0].files === undefined || fileInputElement[0].files[0].size < parseInt(cizMaxFileSize));
}

function validateFileNaam() {
    regex = /^[a-zA-Z0-9-_\,\.\(\)\[\]\s]*$/;
    var Naam = fileInputElement[0].files[0].name;
    Naam = Naam.substr(0, (Naam).lastIndexOf('.'))

    if (Naam !== '' && regex.test(Naam)){
        validNaamMessage.hide();
        return true
    } else {
        validNaamMessage.show();
        fileInputElement.addClass("errorBorder");
        return false
    }
}

$(document).on('click', 'a.ionicon.ion-close', function (event) {
    event.preventDefault();
    openDeleteConfirmation(this);
});

function openDeleteConfirmation(link) {
    $("#deleteconfirmation_dialog").dialog({
        title: dialogTitleDeleteDocument,
        width: 600,
        modal: true,
        buttons: [{
            type: 'submit',
            text: buttonNoLabel,
            'class': 'secondary',
            click: function () {
                $(this).dialog("close");
            }
        },
            {
                type: 'submit',
                text: buttonYesLabel,
                click: function () {
                    $('#spinnerMessage').text('Deleting...');
                    inDialog = false;
                    $.ajax({
                        url: link,
                        type: 'POST',
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (dataJson) {
                            $('#spinnerMessage').text('Uploading...');
                            gridElement.trigger("reloadGrid", [{page: 1}]);
                        },
                        error: function (xhr) {
                            openErrorPopup(xhr.responseText);
                        }
                    });
                    $(this).dialog("close");
                }
            }]
    });
}

function openErrorPopup(errorMessage) {
    if (errorMessage.indexOf("<html>") !== -1) {
        errorMessage = errorMessageUploadDoc;
    }

    $('#errorMessage').text(errorMessage);
    $("#error_dialog").dialog({
        title: dialogTitleError,
        modal: true,
        buttons: [{
            type: 'submit',
            text: 'Sluiten',
            click: function () {
                $(this).dialog("close");
            }
        }]
    });
}

function deleteLinkFormatter(cellvalue, options, rowObject) {
    if(rowObject.status === 'Verstuurd' && toegangscodePage){
        return ''
    }else{
        return linkFormatter(cellvalue, 'ion-close', 'Verwijderen','33')
    }
}

function editlinkFormatter(cellvalue,options, rowObject) {
    if(rowObject.status === 'Verstuurd' && toegangscodePage){
        return ''
    }else{
        return linkFormatter(cellvalue, 'ion-edit', 'Wijzigen','32');
    }
}

function linkFormatter(link, icon, title, tabindex, target) {
    var result = '';
    if (link) {
        if (target) {
            result = "<a class='ionicon " + icon + "' title='" + title + "' href='" + link + "' target='" + target + "' tabindex='"+tabindex+"'/>";
        } else {
            result = "<a class='ionicon " + icon + "' title='" + title + "' href='" + link + "' tabindex='"+tabindex+"'/>";
        }
    }
    return result;
}

function validateFields() {
    return (soortDocumentElement.val() !== '' && documentnaamElement.val() !== '');

}
function validateDialog(postfix) {
    if (postfix === 'Dialog') {
        return ($("select[id*='soortDocument" + postfix + "']").val() !== '' && $("input[id*='documentNaam" + postfix + "']").val() !== '');
    } else {
        return ($("select[id*='documentSoort" + postfix + "']").val() !== '' && $("input[id*='documentNaam" + postfix + "']").val() !== '');
    }
}

$(document).on('click', 'a.ionicon.ion-edit', function (event) {
    event.preventDefault();
    openEditDialog(this);

});

function openEditDialog(link) {
    var documentId = link.toString().split('?').pop();
    setDialogValues(documentId);
    $(".documentenUploadParams").show();

    $("#edit_dialog").dialog({
        title: dialogTitleDocumentWijzigen,
        width: 700,
        modal: true,
        buttons: [{
            type: 'submit',
            text: documentAnnuleren,
            'class': 'secundary',
            click: function () {
                $("select[id*='soortDocumentDialog']").val("");
                $("span.bestandsNaam").text("");
                $("span.status").text("");
                $("input[id*='documentNaamDialog']").val("");
                $("ul.error-messages-list.clientside").remove();
                $("input[id='documentNaam']").removeClass("errorBorder");
                $("select[id='soortDocument']").removeClass("errorBorder");
                $(this).dialog("close");

            }
        }, {
            type: 'submit',
            text: gridDocumentWijzigen,
            click: function (e) {
                e.preventDefault();
                var documentNaam = $("#documentNaamDialog").val();
                var documentSoort = $("select[id*='soortDocumentDialog']").val();
                if (validateDialog("Dialog")) {
                    $("ul.error-messages-list.clientside").remove();
                    $(this).dialog("close");
                    inDialog = false;
                    callEditDocument(link + '&documentNaam=' + documentNaam + '&documentSoort=' + documentSoort);
                }
            }
        }]
    });
}

function callEditDocument(link) {
    $.ajax({
        url: link,
        type: 'GET',
        success: function () {
            gridElement.trigger("reloadGrid", [{page: 1}]);
        },
        error: function (xhr) {
            openErrorPopup(xhr.responseText);
        }
    });
}

function setDialogValues(documentId) {
    var $this = $('a[href$="' + documentId + '"]');
    var documentSoortOld = $this.closest("tr").find("td[aria-describedby='documenten-upload-resultaat_soortDocument']").text();
    var documentNaamOld = $this.closest("tr").find("td[aria-describedby='documenten-upload-resultaat_documentNaam']").text();
    var bestandsNaamOld = $this.closest("tr").find("td[aria-describedby='documenten-upload-resultaat_bestandsNaam']").text();
    $("#documentNaamDialog").val(documentNaamOld);
    $("#bestandsNaamDialog").text(bestandsNaamOld);
    $("#soortDocumentDialog option").filter(function () {
        return $(this).text() === documentSoortOld;
    }).prop('selected', true);
}
