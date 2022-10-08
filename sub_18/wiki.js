function URI(uri) {
    this.uri = uri;
}

URI.prototype.toString = function() {
    return JSON.stringify({uri: this.uri});
};

function Literal(label, language) {
    this.label = label;
    this.language = language;
}

Literal.prototype.toString = function() {
    return JSON.stringify({
        label: this.label,
        language: this.language
    });
};

//Recreation of minimal PoolPartyValidator ._.
//hardcoded to validate rdfliteral
function PoolPartyValidator() {

}
PoolPartyValidator.prototype.autowireElements = function(elements) {
    elements.forEach(function(element) {
        var required = element.dataset.required == "true" ? true : false;
        var requiredMessage = element.dataset.requiredMessage;
        var validator = element.dataset.validator;
        var message = element.dataset.message;
        var rdfLiteral = /^[^\n\t\r<>\\"]*$/;

        var errorMessageDivId = element.id + "_message"
        var errorMessageDiv = document.getElementById(errorMessageDivId);

        if(errorMessageDiv == null) {
            var div = document.createElement("div");

            div.id = errorMessageDivId;
            element.parentNode.appendChild(div);

            errorMessageDiv = div;
        }

        element.addEventListener("keyup", function(e) {
            var value = this.value;
            var valid = true;
            var errorMessage = "";

            if(value.trim() == "" && required) {
                valid = false;
                errorMessage = requiredMessage;
            }

            if(!rdfLiteral.test(value)) {
                valid = false;
                errorMessage = message;
            }

            if(valid) {
                this.className = "pp-validation-valid";
                errorMessageDiv.innerHTML = "";
            }
            else {
                this.className = "pp-validation-invalid";
                errorMessageDiv.innerHTML = errorMessage;
            }
        });

    });
}

PoolPartyValidator.prototype.validateForm = function(form) {
    var formElements = form.elements;
    var valElements = [];
    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].getAttribute("data-validator") != null
            || formElements[i].getAttribute("data-required") != null) {
            valElements.push(formElements[i]);
        }
    }
    if (valElements.length > 0){
        return this.validateElements(valElements);
    } else {
        return true;
    }
}

PoolPartyValidator.prototype.validateElements = function(elements) {
    var valid = true;
    for(var i=0; i<elements.length; i++) {
        var element = elements[i];
        var value = element.value;
        var required = element.dataset.required == "true" ? true : false;
        var requiredMessage = element.dataset.requiredMessage;
        var validator = element.dataset.validator;
        var message = element.dataset.message;
        var rdfLiteral = /^[^\n\t\r<>\\"]*$/;


        if(value.trim() == "" && required) {
            valid = false;
            alert(requiredMessage);
        }

        if(!rdfLiteral.test(value)) {
            alert(message)
            valid = false;
        }
    }

    return valid;
}

    Wiki = function(contextPath, submitButtonLabel, cancelButtonLabel) {

    var ajaxPath = contextPath+"!/wiki";
    var GlobalLabelID;
    var GlobalPropertyID;
    var notesDialog, freeConceptsDialog;
    var oValidator = new PoolPartyValidator({});
    
    var dom = YAHOO.util.Dom;
    var yuievent = YAHOO.util.Event;

    function postJson(sUrl, oRequest, successCallback, failureCallback) {
        if (!failureCallback) {
            failureCallback = function (oResponse) {
                if (!handleMessageResponse(oResponse)) {
                    alert("Internal Error");
                }
            };
        }
        var callback = {
            failure: function(oResponse) {
                failureCallback(oResponse);
            },
            success: function(oResponse) {
                if (successCallback && typeof successCallback === "function") {
                    successCallback(oResponse);
                } else if (!handleMessageResponse(oResponse)) {
                    window.location.reload();
                }
            }
        };
        YAHOO.util.Connect.setDefaultPostHeader(false);
        YAHOO.util.Connect.initHeader("X-CSRF-TOKEN", document.getElementById("_csrf").content, true);
        YAHOO.util.Connect.initHeader("Content-Type", "application/json; charset=UTF-8");
        YAHOO.util.Connect.asyncRequest("POST", sUrl, callback, YAHOO.lang.JSON.stringify(oRequest));
        YAHOO.util.Connect.setDefaultPostHeader(true);
    }

    function handleMessageResponse(oResponse) {
        try {
            var resp = JSON.parse(oResponse.responseText);
            if (typeof resp.success !== "undefined") {
                if (resp.success === false) alert(resp.plainMessage);
                return true;
            }
        } catch (e) {
            console.log(e);
        }
        return false;
    }

    function showEditLabelForm(LabelID) {
        try {
            hideEditLabelForm(GlobalLabelID);
        } catch (e) {
        }
        GlobalLabelID = LabelID;
        dom.get(LabelID + "_display").style.display = "none";
        dom.get(LabelID + "_controls").style.display = "none";
        dom.get(LabelID + "_edit").style.display = "block";
        dom.get(LabelID + "_newValue").style.display = "block";
    }
    function hideEditLabelForm(LabelID) {
        dom.get(LabelID + "_display").removeAttribute("style");
        dom.get(LabelID + "_controls").removeAttribute("style");
        dom.get(LabelID + "_edit").style.display = "none";
    }
    function showAddLabelForm(PropertyID) {
        try {
            hideAddLabelForm(GlobalPropertyID);
        } catch (e) {
        }
        GlobalPropertyID = PropertyID;
        dom.get(PropertyID + "_controls").style.display = "none";
        dom.get(PropertyID + "_new").style.display = "block";
    }
    function hideAddLabelForm(PropertyID) {
        dom.get(PropertyID + "_controls").removeAttribute("style");
        dom.get(PropertyID + "_new").style.display = "none";
    }
    function submitEditLabelForm(LabelID) {

        var subject = dom.get(LabelID + "_subject").value;
        var predicate = dom.get(LabelID + "_predicate").value;
        var valueLanguage = dom.get(LabelID + "_valueLanguage").value;
        var oldValue = dom.get(LabelID + "_oldValue").value;
        var newValue = dom.get(LabelID + "_newValue").value;
        if (oldValue === newValue) {
            hideEditLabelForm(LabelID);
            return;
        }
        if (!newValue) {
            hideEditLabelForm(LabelID);
            return;
        }
        var requestBody = {
            resource: new URI(subject),
            property: new URI(predicate),
            value: new Literal(newValue, valueLanguage),
            oldValue: new Literal(oldValue, valueLanguage)
        };
        postJson(ajaxPath + "/updateLiteral", requestBody);
        return false;
    }
    function submitAddLabelForm(PropertyID) {
        if (dom.get(PropertyID + "_newValue").value === "") {
            hideAddLabelForm(PropertyID);
            return;
        }
        var subject = dom.get(PropertyID + "_subject").value;
        var predicate = dom.get(PropertyID + "_predicate").value;
        var valueLanguage = dom.get(PropertyID + "_valueLanguage").value;
        var newValue = dom.get(PropertyID + "_newValue").value;

        var requestBody = {
            resource: new URI(subject),
            property: new URI(predicate),
            value: new Literal(newValue, valueLanguage)
        };
        postJson(ajaxPath + "/addLiteral", requestBody);
        return false;
    }
    function removeLabel(LabelID) {
        dom.get(LabelID + "_command").value = "remove";

        var subject = dom.get(LabelID + "_subject").value;
        var predicate = dom.get(LabelID + "_predicate").value;
        var valueLanguage = dom.get(LabelID + "_valueLanguage").value;
        var newValue = dom.get(LabelID + "_newValue").value;

        var requestBody = {
            resource: new URI(subject),
            property: new URI(predicate),
            value: new Literal(newValue, valueLanguage)
        };
        postJson(ajaxPath + "/deleteLiteral", requestBody);
    }
    

    function showNotesDialog() {
        notesDialog.show();
        return false;
    }

    function showFreeConceptsDialog() {
        freeConceptsDialog.show();
        if (dom.get("prefLabelDefaultLang")) dom.get("prefLabelDefaultLang").focus();
    }

    yuievent.onDOMReady(function() {
        oValidator.autowireElements([dom.get("createNoteTitle"), dom.get("createNoteComment")]);

        setupEventListeners();

        try {
            new YAHOO.widget.TabView("conceptTabs");
        } catch (e) {
            console.error(e);
        }

        notesDialog = new YAHOO.widget.Dialog("dialogdiv", {
            width: "650px",
            visible: false,
            constraintoviewport: true,
            draggable: true,
            modal: true,
            fixedcenter: true,
            buttons: [
                {text: "Create Note", handler: function() {
                        if (oValidator.validateForm(document.getElementById("createNoteForm"))) {
                            var formData = this.getData();
                            var request = {
                                conceptUri: new URI(formData.createNoteConceptURI),
                                notePredicate: new URI(formData.createNotePredicate[0]),
                                noteTitle: formData.createNoteTitle,
                                noteComment: formData.createNoteComment
                            };
                            postJson(ajaxPath + "/addNote", request);
                        }
                    }, isDefault: true},
                {text: "Cancel", handler: function(){this.cancel();}}
            ]});
        notesDialog.render();

        freeConceptsDialog = new YAHOO.widget.Dialog("freeconceptsdialog", {
            width: "450px",
            visible: false,
            constraintoviewport: true,
            draggable: true,
            modal: true,
            fixedcenter: true,
            buttons: [
                {
                    text: submitButtonLabel,
                    handler: function() {
                        if (oValidator.validateForm(dom.get("suggestFreeConceptForm"))) {
                            var request = {
                                prefLabels: [],
                                checkForDuplicates: true
                            };
                            var prefLabels = document.getElementsByName("prefLabelLang");
                            dom.batch(prefLabels, function(el) {
                                if (el.value.trim() !== "") {
                                    request.prefLabels.push(new Literal(el.value, el.getAttribute("data-language")));
                                }
                            });
                            var dialog = this;
                            postJson(ajaxPath + "/suggestConcept", request, function(response){
                                dialog.hide();
                                var respObj = JSON.parse(response.responseText);
                                if (confirm(respObj.message)) {
                                    window.location.reload();
                                }
                            });
                        }
                    },
                    isDefault: true},
                {
                    text: cancelButtonLabel,
                    handler: function(){this.cancel();}
                }
            ]});
        freeConceptsDialog.render();
    });

    function disableButton(el) {
        el.style.display = "none";
    }
    
    function enableLanguage(lang, el) {
        dom.get("prefLabelForm_"+lang).style.display = "table-row";
        disableButton(el);
    }

    function setupEventListeners() {
        yuievent.addListener("createNoteForm", "submit", function(evt) {
            evt.stopImmediatePropagation();
            return false;
        });
        document.getElementById("suggestConcept")?.addEventListener("click", showFreeConceptsDialog);
        document.getElementById("showNotesDialog")?.addEventListener("click", showNotesDialog);

        [...document.getElementsByClassName("buttonSubmitEditLabelForm")].forEach((el) => {
            el.addEventListener("click", function() {
                submitEditLabelForm(this.dataset.labelid);
            });
        });

        [...document.getElementsByClassName("formSubmitEditLabelForm")].forEach((el) => {
            el.addEventListener("submit", function(evt) {
                evt.preventDefault();
                submitEditLabelForm(this.dataset.labelid);
            });
        });

        [...document.getElementsByClassName("buttonHideEditLabelForm")].forEach((el) => {
            el.addEventListener("click", function() {
                hideEditLabelForm(this.dataset.labelid);
            });
        });

        [...document.getElementsByClassName("buttonShowEditLabelForm")].forEach((el) => {
            el.addEventListener("click", function() {
                showEditLabelForm(this.dataset.labelid);
            });
        });

        [...document.getElementsByClassName("buttonRemoveLabel")].forEach((el) => {
            el.addEventListener("click", function() {
                removeLabel(this.dataset.labelid);
            });
        });

        [...document.getElementsByClassName("buttonSubmitAddLabelForm")].forEach((el) => {
            el.addEventListener("click", function() {
                submitAddLabelForm(this.dataset.propertyid);
            });
        });

        [...document.getElementsByClassName("formSubmitAddLabelForm")].forEach((el) => {
            el.addEventListener("submit", function(evt) {
                evt.preventDefault();
                submitAddLabelForm(this.dataset.propertyid);
            });
        });

        [...document.getElementsByClassName("buttonCancelSubmitAddLabelForm")].forEach((el) => {
            el.addEventListener("click", function() {
                hideAddLabelForm(this.dataset.propertyid);
            });
        });

        [...document.getElementsByClassName("buttonShowAddLabelForm")].forEach((el) => {
            el.addEventListener("click", function() {
                showAddLabelForm(this.dataset.propertyid);
            });
        });

        [...document.getElementsByClassName("enableLanguage")].forEach((langButton) => {
            langButton.addEventListener("click", function() {
                enableLanguage(this.dataset.language, this);
            });
        });
    }
    
    return {
        showNotesDialog : showNotesDialog,
        showFreeConceptsDialog : showFreeConceptsDialog,
        showEditLabelForm : showEditLabelForm,
        showAddLabelForm : showAddLabelForm,
        hideAddLabelForm: hideAddLabelForm,
        hideEditLabelForm : hideEditLabelForm,
        removeLabel : removeLabel,
        submitAddLabelForm : submitAddLabelForm,
        submitEditLabelForm : submitEditLabelForm,
        enableLanguage : enableLanguage
    };
    
};
