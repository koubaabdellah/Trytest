//
// Implemented interaction:
//  (1) onchange: the fragment is validated clientside
//  (2) onchange of a radio, checkbox or selectbox, the preconditions are verified to determine if part of the form has to be shown or not
//  (3) onsubmit: all fields, which are not validated yet are validated. When there are errors the form is not posted
//  (4) onsubmit: when the form is posted: fields which are not visible are cleared
//  (5) onload: the value and the visibility from the html inputs is transferred to the client side framework. This is needed when Firefox
//              prefills fields and when a value contains a personalisation expression
//

var SUBMIT_TIMEOUT = 1000 * 60; // 60 seconds

$(document).ready(function(event) {
	// implemented a optimization for the clientside framework:
	//  - load the formState object aynsychronous
	//  - cache the formState serverside
	//  - add an extra call for the filled in values
	//  - init the bindings
	$('.wmpform').each(function() {
		initCSFW($(this));
	});

	$(document).on('IAF_FormLoaded', '.wmpform', function(e) {
		initCSFW($(this));
	});

	function initCSFW(formObj) {
		var formId = formObj.attr("id");
		var url = formObj.find('.csfw').val();

		if (typeof url !== 'undefined') {
			loadScript("csfw_" + formId, url, function() {
				// we don't get the form values from the user when we don't have a wmstepid in the form
				var stepId = formObj.find('.csfw_stepId').val();
				if (stepId !== '') {
					// we don't get the form values from the user when we don't have a wmstepid in the form
					var versionId = formObj.find('.csfw_versionId').val();
					var valuesUrl = contextPath + '/wcbservlet/nl.gx.forms.wmpformelement.servlet?formVersionId=' + versionId;

					$.ajax({
						url: valuesUrl,
						async: true,
						success: function(data) {
							initSteps(formId, data);
							init(formObj);
						},
						error: function(xhr) {
							var response = null;
							try {
								response = xhr.responseText;
							} catch (e) { }

							if (response !== null && response !== '') {
								response = response.replace(/\\([^"])/g, "$1");
								response = response.replace(/,\s*}/g, "}");
								response = response.replace(/,\s*\n*\s*]/g, "]");

								try {
									var jsonResponse = jQuery.parseJSON(response);
									initSteps(formId, jsonResponse);
									init(formObj);
								} catch (e) {
									// Empty
								}
							}
						}
					});
				} else {
					init(formObj);
				}
			});
		} else {
			// do the old behavior
			init(formObj);
		}
	}

	// Adds or updates a script tag to load the clientside framework
	// Note that jQuery getScript requires unsafe-inline CSP rule and is therefore not usable
	// See https://github.com/jquery/jquery/issues/3969 for more information.
	function loadScript(id, url, callback) {
		var script = document.getElementById(id);
		if (script) {
			// Remove an old version of the script which can be present when using ajax to submit form steps
			script.parentNode.removeChild(script);
		}

		script = document.createElement("script");
		script.id = id;
		script.type = "text/javascript";
		script.onload = function() {
			callback();
		};
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}

	// Initialize the value and visibility of the fragments in the clientside framework
	function initSteps(formId, data) {
		var formState = WebmanagerFormStateRegistry[formId];

		$.each(data.steps, function(j, step) {
			var stepId = step.identifier;
			var stepObj = initStep(formState, stepId);
			$.each(step.fragments, function(i, item) {
				if (typeof item.name !== 'undefined') {
					initFragment(stepObj, item);
				}
			});
		});
	}

	// Returns the step from the formState object or initialize the step in the formState object
	function initStep(formState, stepId) {
		var step = formState[stepId];
		if (step === null || typeof step === 'undefined') {
			step = { checkConditions: null, visible: true, validate: null };
			formState[stepId] = step;
		}
		return step;
	}

	// Initializes the fragment object
	function initFragment(step, item) {
		var fragmentObj = getOrInitializeFragmentObject(step, item.name);
		if (fragmentObj !== null && typeof fragmentObj !== 'undefined') {
			fragmentObj.value = item.value;
			fragmentObj.visible = item.visible;
		}
	}

	//
	// function to get or create an object / attribute based on the attributes of the given object and a dot expression.
	// returns the object / attribute
	//
	function getOrInitializeFragmentObject(obj, expression) {
		if ((typeof obj != 'undefined' && obj != null) && (typeof expression != 'undefined' && expression != null)) {
			var index = expression.indexOf('.');
			if (index === -1) {
				var fragmentObj = obj[expression];
				if (fragmentObj === null || typeof fragmentObj === 'undefined') {
					// fragment not available, so initialize it
					fragmentObj = { value: null, validate: null, errors: {}, visible: true, checkConditions: null, validated: false, condition: true };
					obj[expression] = fragmentObj;
				}
				return fragmentObj;
			} else {
				var containName = expression.substring(0, index);
				var containerObj = obj[containName];
				if (containerObj === null || typeof containerObj === 'undefined') {
					// container not available, so initialize it
					containerObj = { value: null, validate: null, errors: {}, visible: true, checkConditions: null, validated: false, condition: true };
					obj[containName] = containerObj;
				}
				return getOrInitializeFragmentObject(containerObj, expression.substring(index + 1, expression.length));
			}
		} else {
			return null;
		}
	}

	// Capture the high level events
	var doc = $(document);
	doc.on('IAF_ShowFormFragment', '.wmpform div', function(event) {
		event.stopPropagation();
		if ($(event.target)[0] === $(this)[0]) {
			$(this).removeClass('displayNone').show();
		}
		return false;
	});

	doc.on('IAF_HideFormFragment', '.wmpform div', function(event) {
		event.stopPropagation();
		if ($(event.target)[0] === $(this)[0]) {
			$(this).hide();
		}
		return false;
	});

	doc.on('IAF_ShowError', '.wmpform div', function(e, errorDivId, errors) {
		$('#' + errorDivId).html('<ul><li>' + FormsUtil.join(errors, '</li><li>') + '</li></ul>').removeClass('displayNone').show();
	});

	doc.on('IAF_HideError', '.wmpform div', function(e, errorDivId) {
		$('#' + errorDivId).empty().hide();
	});

	doc.on('IAF_SubmitForm', '.wmpform', function(event) {
		var useAjax = $("input[name='clientsideRouting']", this).val();
		var iaForm = $(this);
		if (useAjax === 'true') {
			// Scroll to the top of the form so that the user can start entering values on the next step when it has been loaded
			$('html, body').animate({ scrollTop: $(this).offset().top - 10 }, 1000);

			// Add the X-CSRF-Token header when the form has no csrftoken input
			var headers = {};
			if ($("input[name='csrftoken']", iaForm).length === 0) {
				headers = {'X-CSRF-Token': csrfProtection.getCsrfToken()};
			}

			$(this).ajaxSubmit({
				dataType: 'json',
				timeout: SUBMIT_TIMEOUT,
				headers: headers,
				xhrFields: {
					withCredentials: true
				},
				error: function(xhr) {
					var response = null;
					try {
						response = xhr.responseText;
					} catch (e) { }

					if (response !== null && response.toLowerCase().indexOf("<pre>") === 0) {
						// When the form contains an upload, the json response is wrapped in (firefox) or
						// prefixed by (IE 8)a <pre> tag. As a result the default conversion to json fails
						var data = response.substring(5, response.lastIndexOf("}") + 1);
						iaForm.trigger("IAF_AfterSubmit", $.parseJSON(data));
					} else {
						iaForm.trigger("IAF_AfterSubmit");
					}
				},
				success: function(data) {
					iaForm.trigger("IAF_AfterSubmit", data);
				},
				semantic: false
			});
		} else {
			HTMLFormElement.prototype.submit.call($(this)[0]); // This works when there is a field with name 'submit', while "$(this).submit()" does not
		}
		return false;
	});

	doc.on('IAF_AfterSubmit', '.wmpform', function(event, data) {
		if (typeof data === "undefined" || (typeof data.routingResult !== "undefined" &&
			typeof data.routingResult.httpError !== "undefined")) {
			// There was no response or the response is a routing result with http error
			showGeneralErrorMessage($(this));
		} else if (typeof data.routingResult !== "undefined") {
			if (data.routingResult.type === '0') {
				document.location.href = data.routingResult.url;
			} else {
				$(this).trigger("IAF_AjaxShowFormStep", data.routingResult.step);
			}
		} else if (typeof data.result !== "undefined") {
			var formStep = $(":input[name='wmstepid']:first", $(this)).val();
			$(this).trigger("IAF_AjaxShowFormStep", formStep);
		} else {
			showGeneralErrorMessage($(this));
		}
	});

	doc.on('IAF_AjaxShowFormStep', '.wmpform', function(event, formStep) {
		var baseUrl = $("input[name='ajaxUrl']", this).val();
		var nextUrl = baseUrl;
		if (typeof formStep !== 'undefined' && formStep !== '') {
			if (nextUrl.indexOf('?') !== -1) {
				nextUrl = nextUrl + '&wmstepid=' + formStep;
			} else {
				nextUrl = nextUrl + '/wmstepid=' + formStep;
			}
		}

		//Explicitly specify 'withcredentials' in case of a cross-domain (cors) request
		$.ajax({
			url: nextUrl,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			success: function(data, textStatus, request) {
				$(".wmpform").parent("div").html(data).promise().done(function() {
					var form = $(this).find(".wmpform");
					const csrfHeader = request.getResponseHeader("X-CSRF-Token");
					if (csrfHeader) {
						csrfProtection.addCsrfToken(form[0], csrfHeader);
					}
					$(form).trigger("IAF_FormLoaded");
				});
			},
			error: function(xhr) {
				if (window.console && window.console.log) {
					console.log(xhr.responseText);
				}
			}
		});
	});

	// The init is called after the form values from the use are set in the client side framework:
	// Now we can add the events.
	function init(formObj) {
		// (1) Set a change event on all inputs: we can determine clientside if other fields needs to be shown
		// This is not done by looping over the inputs, because this doesn't work for repeats
		formObj.find(':input').change(function() {
			FormValidation.changeFragment($(this), true);
		});

		// (3) validate all inputs when the form is submitted
		formObj.submit(function(event) {
			var formId = $(this).attr("id");
			var step = WebmanagerFormStateRegistry[formId].currentStep();

			var useAjax = $("input[name='clientsideRouting']", this).val();
			if (useAjax === 'true') {
				event.preventDefault();
			} else {
				// Add the csrftoken field if it does not yet exist
				csrfProtection.addCsrfTokenInputs($(this));
			}

			if (!$(this).hasClass("IAF_backpressed")) {
				event.preventDefault();
				var hasErrors = FormValidation.validateForm($(this), step);
				if (!hasErrors) {
					var actionButton = $(this).data("actionButton");
					if (actionButton !== undefined && actionButton !== '') {
						var action = actionButton.closest(".wm-field").attr("id");
						if (action !== undefined && action !== '') {
							var actionField = actionButton.attr("data-iaf_action");
							if (actionField !== undefined && actionField !== '') {
								$(formObj).find(actionField).val(action);
							}
						}
						$(formObj).removeData("actionButton");
					}
					// Submit the form
					disableButtons(formObj);
					FormValidation.submitForm($(this), step);
				}
			} else if (useAjax === 'true') {
				// jQuery's serialize() is does NOT encode buttons or submit inputs, because they aren't considered to be "successful controls".
				// However XC expect the buttons, for example to determine if the back button has been clicked.
				var $button = formObj.find('.wm_input_back_button');
				var $input = $('<input>', {
					type: 'hidden',
					name: $button.attr('name')
				});
				$input.insertAfter($button);
				$input.val($button.val());

				// No need to check for errors if going back to previous step.
				disableButtons(formObj);
				FormValidation.submitForm($(this), step);
			}
		});


		formObj.find('.wm_input_back_button').click(function() {
			formObj.addClass("IAF_backpressed");
		});

		$(':input:submit[data-iaf_action],:input:button[data-iaf_action]', formObj).bind("click", function(event) {
			event.preventDefault();
			$(formObj).data("actionButton", $(this));
			$(formObj).trigger("submit");
		});


		//
		// Set a click event on all radio inputs and pipe it to the onChange
		// this to avoid problems in IE6/IE7/IE8 that have a different event model
		//
		formObj.find(':input:radio').click(function() {
			if (FormsUtil.isIE) {
				$(this).change();
			}
		});

		//
		// (5) Set the initial value and visibility
		//
		var inputsWithValue = new Array();
		// This is for the radio and checkboxes: we only need to set them once
		var done = new Array();

		formObj.find(':input').each(function() {
			var formId = formObj.attr("id");
			var step = WebmanagerFormStateRegistry[formId].currentStep();

			var inputName = $(this).attr("name");
			var inputType = $(this).attr("type");
			if (inputName !== '' && !FormsUtil.contains(done, inputName)) {
				if (inputType !== 'hidden') {
					done.push(inputName);
				}

				var fragmentObj = FormsUtil.getObject(step, $(this).attr("name"));

				if (fragmentObj !== null) {
					var value = FormValidation.getFragmentValue($(this));
					if (value !== '') {
						inputsWithValue.push($(this));
					}
				}
			}
		});

		// trigger the change event after the value and visibility is set
		for (var i = 0; i < inputsWithValue.length; i++) {
			FormValidation.changeFragment(inputsWithValue[i], false);
		}
		formObj.trigger('IAF_ClientsideFrameworkLoaded');

	}

	//Disable all buttons in a form
	function disableButtons(formObj) {
		formObj.find(':input:submit').each(function() {
			$(this).attr('disabled', true);
		});
	}

	function showGeneralErrorMessage(formObj) {
		$('.generalerrormessage', formObj).show();
	}
});
