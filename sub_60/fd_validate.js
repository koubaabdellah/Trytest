
var FDValidate = new Class({

	Extends: FDBaseClass,
	Implements: [Events, FDDeferred],

	_class: 'FDValidate',

	_trace: true,

	_mode: 0, // 0=return on error (MODE_DEFAULT), 1=save or return on error (MODE_ALLOW_SKIP)
	_skip: false,
	_interactive: false,
	_checkingPage: false,
	_final: true,
	_tmr: 0,
	alerting: false,

	setMode: function (mode) {
		this._mode = mode;
	},
	Init: function (final) {
		try {
			var workflow = FD.Form.Features.get('workflow');
			this._mode = (FD.Form.Info.isAdmin && FDUri.current.queryExists('r') ? FDValidate.MODE_ALLOW_SKIP : FDValidate.MODE_DEFAULT) && (!workflow || workflow.isAdmin);
		} catch (e) { }
		this._final = final;
		this._checkingPage = false;
		this._skip = false;
	},
	setParams: function (check_page, final) {

		if (arguments.length == 1 && Object.is(arguments[0])) {
			var options = arguments[0];
			if (options.reset) {
				this._checkingPage = this._final = false;
			}
			if (options.checkingPage) this._checkingPage = options.checkingPage;
			if (options.final) this._final = options.final;
		} else {
			this._checkingPage = arguments[0];
			if (this._checkingPage) this._final = true;
			if (arguments.length > 1) this._final = arguments[1];
		}
		this._skip = false;

	},
	setInteractive: function (interactive, obj) {
		this._interactive = interactive;
		this.deferred = null; // make sure we don't have a deferred object which can hold attached events
	},

	isAlerting: function () {
		return this.alerting;
	},

	checkValues: function (els) {

		var item, types;
		for (var i = 0, len = els.length; i < len; i++) {

			item = FDOptions.create(els[i]);
			if (String.is(item.types)) {
				types = item.types.split(',');
			} else if (Array.is(item.types)) {
				types = item.types;
			} else {
				types = [item.type];
			}
			for (var j = 0; j < types.length; j++) {

				item.type = types[j];
				if (!this.CheckValue(item.element, item)) {
					return false;
				}

			}

		}

		return true;

	},

	CheckValue: function () { // el, type, range, label, fel, wnd, page, resetvalue

		var el = arguments[0], options, type;
		if (FDOptions.is(arguments[1])) {
			options = arguments[1];
		} else if (FDOptions.is(arguments[2])) {
			options = arguments[2];
			options.type = arguments[1];
		} else if (Object.is(arguments[1])) {
			options = FDOptions.create(arguments[1]);
		} else if (Object.is(arguments[2])) {
			options = FDOptions.create(arguments[2]);
			options.type = arguments[1];
		} else {
			options = new FDOptions();
			var args = $A(arguments);
			args.splice(0, 1);
			if (args.length > 0) options.type = args.shift();
			if (args.length > 0) options.range = args.shift();
			if (args.length > 0) options.label = args.shift();
			if (args.length > 0) options.focusElement = args.shift();
			if (args.length > 0) options.window = args.shift();
			if (args.length > 0) options.page = args.shift();
			if (args.length > 0) options.resetValue = args.shift();
		}
		type = options.type;

		this.log(['.CheckValue, mode=' + this._mode + ', page=' + this._checkingPage + ', skip=' + this._skip + ', interactive=' + this._interactive + ', type=' + type + ', params: ' + $A(arguments).toString(), options], 'group');

		this.makeDeferred();

		if (this._skip || (this._mode == FDValidate.MODE_ALLOW_SKIP && this._checkingPage)) return this._end(true, options);

		var wnd = options.window = (options.window ? options.window : (window.FD ? window : top));
		var els = [], el_focus = { el: null, focus: null };
		var pre_return = false, i = 0, show_alert = false, msg = '';

		if (options.message) msg = options.message;
		else if (Array.is(options.label)) {
			msg = options.label[1]
			options.label = options.label[0];
		}

		if (el instanceof jQuery) {
			els = el.get();
		} else if (Array.is(el)) {
			els = (Array.is(el[0]) || el.length == 1 ? el : [el]);
		} else if (String.is(el)) {
			els = el.split(',');
			for (i = 0; i < els.length; i++)
				els[i] = wnd.FD.get(els[i]);

		} else {
			els.push(el);
		}

		if (Object.is(options.focusElement))
			el_focus.el = el_focus.focus = wnd.FD.get(options.focusElement);
		else
			el_focus.el = el_focus.focus = els[0];

		try {
			// check if it is a checkbox-/optiongroup and if it has an enabled option
			if (typeof el_focus.el.length != 'undefined' && (typeof el_focus.el.tagName == 'undefined' || el_focus.el.tagName != 'SELECT')) {
				pre_return = true;
				for (i = 0; i < el_focus.el.length; i++) {
					pre_return = pre_return && (el_focus.el[i].disabled || el_focus.el[i].readOnly);
					if (!pre_return) { // there is an enabled option
						el_focus.focus = el_focus.el[i];
						break;
					}
				}
			} else {
				pre_return = el_focus.el.disabled || (el_focus.el.readOnly && !el_focus.el.forceValidate && Number.create($(el_focus.el).fd_data('type')) != 17 /* file */) || (typeof el_focus.el.style != 'undefined' && el_focus.el.style.display == 'none'); //&& !FD.Form.Hidden.Check(aFields.get(el_focus.el.name))
			}
		} catch (e) { alert('FDValidate.CheckValue: ' + el + ', ' + els[0] + ', ' + el_focus.el + ', ' + fel + ', ' + e.message); }

		//FD.Debug.trace('checkvalue', 'el=' + el + ', els[0]=' + els[0]);

		if (options.page && options.page > 0) {
			pre_return = pre_return || (typeof FD.Pages != 'undefined' && !FD.Pages.checkDisplay(options.page));
		}

		var item = null;
		if (typeof FD.Form.Items != 'undefined' && FD.Form.Items != null) {
			item = FD.Form.Items.search(el_focus.focus.name);
			pre_return = pre_return || (item && !item.isApplicable() /*FD.Form.Hidden.Check(fld.id)*/);
			if (item) this.log('.CheckValue, isApplicable=' + item.isApplicable());
		}
		/*if (typeof FD.Form.Workflow != 'undefined')
		pre_return = pre_return || (item && FD.Form.Workflow.disallowed(item.id, true));*/

		if (pre_return) {
			this.log('.CheckValue, pr-return');
			return this._end(true, options);
		}

		if (String.is(type)) {
			var parts = type.split('-');
			if (parts.length > 2) {
				options.range = Number.int(parts.pop());
				type = parts.join('-');
			}
		}

		//this.log(['.CheckValue, type=' + type + ', range=' + options.range]);

		switch (type) {
			case 1:
			case 'validate-required':
				{ // required
					if (this._interactive) {
						// no validation
					} else if (els[0].type && els[0].type == 'checkbox') {
						show_alert = !els[0].checked;
					} else if (typeof els[0][0] != 'undefined' && typeof els[0].tagName == 'undefined') { // chg-/cbg-group
						var checked = 0;
						for (i = 0; i < els[0].length; i++) {
							if (els[0][i].checked) checked++;
						}
						show_alert = checked == 0;
					} else if (Number.create($(els[0]).fd_data('type')) == 17 && typeof FDUpload != 'undefined') {
						show_alert = FD.Upload.isStateInput(els[0].id) && FD.Upload.getFilename(els[0].id).empty();
					} else {
						show_alert = els[0].value.empty();
					}
					msg = msg || FD.Texts.get('Validate.REQUIRED');
					break;
				}
			case 2:
			case 'validate-number':
				{ // isnumber
					show_alert = (isNaN(String.format('number', els[0].value, true, false))) ? true : false;
					msg = msg || FD.Texts.get('Validate.NUMERIC');
					break;
				}
			case 3:
			case 'validate-number-min':
				{ // minwaarde
					show_alert = (els[0].value.length > 0 && String.create(els[0].value).float($(els[0]).fd_data('format') != 'number') < Number.float(options.range)) ? true : false;
					msg = (msg || FD.Texts.get('Validate.NUMERIC')).sprintf(options.range);
					break;
				}
			case 4:
			case 'validate-number-max':
				{ // maxwaarde
					show_alert = (els[0].value.length > 0 && String.create(els[0].value).float($(els[0]).fd_data('format') != 'number') > Number.create(options.range)) ? true : false;
					msg = (msg || FD.Texts.get('Validate.NUMERIC')).sprintf(options.range);
					break;
				}
			case 5:
			case 'validate-date':
				{ // geldige datum invoer
					var dates = els[0].value, format = FD.Texts.get('DATE_FORMAT');
					if (els.length > 1) dates = dates + ',' + els[1].value;

					if (String.is(options.range)) options.range = FDDate.mapping.validate[options.range] || 0;
					var retval = FDDate.validate(dates, format, options.range);

					if (!msg) {
						if (retval == FDDate.INVALID /* -1 */) msg = 'DATE_FORMAT';
						else if (retval == FDDate.NOT_PAST /* -4 */) msg = 'DATE_PAST'; //FD.Texts.Validate.get('DATE_PAST');
						else if (retval == FDDate.NOT_FUTURE /* -5 */) msg = 'DATE_FUTURE'; //FD.Texts.Validate.get('DATE_FUTURE');
						else if (retval == FDDate.NOT_PAST_PRESENT /* -2 */) msg = 'DATE_PAST_PRESENT'; //FD.Texts.Validate.get('DATE_PAST_PRESENT');
						else if (retval == FDDate.NOT_FUTURE_PRESENT /* -3 */) msg = 'DATE_FUTURE_PRESENT'; //FD.Texts.Validate.get('DATE_FUTURE_PRESENT');

						msg = this.getText({ text: msg, key: 'Validate' }).sprintf(format);
					}
					show_alert = retval < 0;
					break;
				}
			case 6:
			case 'validate-chars':
				{ // geldige tekens
					var retval = FDChar.validate(els[0].value, FDChar.VALIDATE_FIRSTCHAR_EMPTY + FDChar.VALIDATE_FIRSTCHAR_NAN, options.range); // range kan een eigen array met geldige charcodes zijn
					if (retval != -1) {
						msg = (msg || FD.Texts.get('Validate.CHARACTER')).sprintf(retval + 1);
						show_alert = true;
					} else {
						var value = els[0].value.toLowerCase();
						if (/\.(com|html?)$/.test(value)) {
							msg = msg || FD.Texts.get('Validate.DOT_COM');
							show_alert = true;
						}
					}
					break;
				}
			case 7:
			case 'validate-space':
				{ // eerste positie een spatie
					if (els[0].value.charAt(0) == ' ') {
						msg = (msg || FD.Texts.Validate.get('CHARACTER')).sprintf(1);
						show_alert = true;
					}
					break;
				}
			case 8:
			case 'validate-group-min':
				{ // minwaarde checkboxgroup/optiongroup
					if (!this._interactive) {
						var checked = 0;
						for (i = 0; i < els[0].length; i++) {
							if (els[0][i].checked) checked++;
						}
						String.log([els, options]);
						show_alert = (els[0].length && checked < Number.int(options.range)) || (!els[0].length && typeof els[0].checked != 'undefined' && !els[0].checked && Number.int(options.range) > 0);
						if (els[0].length && els[0][0].type == 'radio')
							msg = (msg || FD.Texts.get('Validate.REQUIRED'));
						else if (els[0].length > 1)
							msg = (msg || FD.Texts.get('Validate.MIN_VALUE')).sprintf(options.range);
						else
							msg = msg || FD.Texts.Validate.get('SINGLE_OPTION');
					}
					break;
				}
			case 9:
			case 'validate-group-max':
				{ // maxwaarde checkboxgroup
					//if (!this._interactive) {
					var checked = 0;
					for (i = 0; i < els[0].length; i++) {
						if (els[0][i].checked) checked++;
					}
					show_alert = checked > Number.create(options.range);
					msg = (msg || FD.Texts.get('Validate.MAX_VALUE')).sprintf(options.range);
					//}
					break;
				}
			case 10:
			case 'validate-lines-min':
				{ // minimaal aantal regels (chg, cbo, opg builder)
					var group = els[0].value.replace(/\r/g, '').split('\n').rtrim(); // escape(els[0].value).split(splitChar(group, true));
					show_alert = (group.length < Number.create(options.range));
					msg = msg || FD.Texts.Validate.get('MIN_OPTIONS');
					break;
				}
			case 11:
			case 'validate-email':
				{ // email-adres
					var opt = {}, retval = els[0].value.empty() || FDEmailAddress.validate(els[0].value, opt); // emailCheck(els[0].value);
					if (!retval) msg = (msg || FD.Texts.get('Validate.EMAIL')).sprintf('<em>' + els[0].value.encodeEntities() + '</em>');
					//else if (retval > 0) msg = (msg || FD.Texts.Validate.get('EMAIL_CHARACTER')).sprintf(retval);
					show_alert = !retval; // retval != 0;
					break;
				}
			case 12:
			case 'validate-list-min':
				{ // minwaarde listbox
					var selected = 0;
					if (els[0].tagName == 'SELECT') {
						for (i = 0; i < els[0].length; i++) {
							if (els[0][i].selected) selected++;
						}
					} else { // moverbox hidden input
						selected = (els[0].value.length > 0 ? els[0].value.split(',').length : 0);
					}
					show_alert = selected < Number.create(options.range);
					msg = (msg || FD.Texts.Validate.get('MIN_VALUE')).sprintf(options.range);
					break;
				}
			case 13:
			case 'validate-alt':
				{ // alternatieve optie
					if (!this._interactive) {
						var single = typeof els[0][0] == 'undefined';
						if (els.length == 1) {
							els[1] = FD.get('alt' + (single ? els[0].name : els[0][0].name));
						}
						if (!single)
							show_alert = (els[0][els[0].length - 1].checked && els[1].value.empty());
						else
							show_alert = (els[0].checked && els[1].value.empty());
						el_focus.focus = els[1];
						msg = msg || FD.Texts.Validate.get('ALTERNATIVE');
					}
					break;
				}
			case 14:
			case 'validate-url':
				{ // volgens url-standaard
					var str = els[0].value;
					if (!str.empty()) {
						var url = FDUri.create(str), strUrl = url.toString();
						show_alert = ((strUrl != str && strUrl.left(strUrl.length - 1) != str) || url.host == '');
						//show_alert = els[0].value != URLEncode(els[0].value);
						msg = msg || FD.Texts.Validate.get('URL');
					}
					break;
				}
			case 15:
			case 'validate-dropdown':
				{ // combo
					if (!this._interactive) {
						var text = (els[0].selectedIndex > -1 ? els[0].options[els[0].selectedIndex].text : '');
						show_alert = (Number.create(options.range) == 0 && els[0].selectedIndex == 0) || (Number.create(options.range) == 1 && els[0].value == '##') || text == '';
						msg = msg || FD.Texts.Validate.get('REQUIRED');
					}
					break;
				}
			case 16:
			case 'validate-file':
				{ // file
					var value = '';
					if (Number.create($(els[0]).fd_data('type')) == 17 && typeof FDUpload != 'undefined') {
						if (FD.Upload.isStateInput(els[0].id)) value = FD.Upload.getFilename(els[0].id);
					} else {
						value = els[0].value;
					}
					var extension = value.match($(els[0]).fd_data('param') || els[0].getAttribute('fdparam') ? /(\..{2,4})(\?.*)?$/ : /(\..{2,4})$/);

					this.log('.CheckValue, filename=' + value + ', extension=' + (extension ? extension[1] : ''));

					var accept = String.create($(els[0]).fd_data('accept') || els[0].getAttribute('fdaccept'));
					//if (accept == null) accept = String.create(els[0].getAttribute('fd:accept'));
					if (accept) accept = accept.toUpperCase();
					if (extension != null) extension[1] = extension[1].toUpperCase();
					//alert(cExt + '; ' + aExt);
					show_alert = value.length > 0 && (extension == null || (!accept.empty() && (',' + accept + ',').match(',' + extension[1] + ',') == null));
					msg = (msg || FD.Texts.Validate.get('FILE_EXTENSION')).sprintf((!accept.empty() ? accept : '.*'));
					break;
				}
			case 17:
			case 'validate-regexp':
				{ // regexp invalid characters (positive test. so, include any character you don't want)
					var reg = new RegExp(options.range, 'gm');
					show_alert = reg.test(els[0].value);
					msg = (msg || FD.Texts.Validate.get('CHARACTER')).sprintf(reg.lastIndex);
					break;
				}

		}

		if (show_alert) {
			
			if (msg.right(1) != '.') msg += '.';
			options.merge({
				message: msg,
				el_focus: el_focus
			});
			if (this._interactive || options.interactive) options.blink = 0;
			if (typeof options.interactive == 'undefined') options.interactive = this._interactive;

			return this._end(this.alert(options), options);

		}

		return this._end(true, options);

	},

	_end: function () { // retval[, options]

		var args = $A(arguments), retval = args.shift();

		this.logEnd(retval);

		if (this.deferred) {
			if (retval) this.deferred.resolve.apply(this, args);
			else this.deferred.reject.apply(this, args);
		}

		return retval;
	},

	_createAlertOptions: function (args) {
		var options = new FDOptions();
		if (Object.is(args[0]) || args[0] == null) options.event = args.shift();
		if (Function.is(args[0]) || args[0] == null) options.final = args.shift();
		$.extend(options, {
			label: (String.is(args[0]) ? args[0] : null),
			message: args[1] || '',
			el_focus: args[2] || null,
			window: args[3] || null,
			page: args[4] || 0,
			resetValue: args[5] || false,
			soft: args[6] || false,
			blink: args[7] || false,
			show_final: args[8] || false
		});
		return options;
	},
	_goPage: function (options) {
		this.log('._goPage, page=' + options.page);
		var wnd = options.window;
		if (typeof wnd.FD.Pages != 'undefined') { this.log('._goPage, FD.Pages'); wnd.FD.Pages.GoTo(options.page, true); }
		else if (typeof wnd.switchPanel != 'undefined') wnd.switchPanel(options.page, true);
		else if (typeof wnd.switchTab != 'undefined') wnd.switchTab(options.page, false, true);
		else if (FD.isBackend() && wnd.$('.content-page').length > 0) { this.log('._goPage, FD.Backend.Pages'); wnd.FD.Backend.Pages.GoTo(options.page, { omitFocus: true }); }
	},

	/* posible parameters as an FDOptions object
	- event: event object [object, optional]
	- final: final function to call after alerting [function, optional]
	- label: label/question text [string, optional]
	- message: message text [string, optional]
	- el_focus: element to give focus or object with el=element from, focus=element to give focus [object, required]
	- window: window object [object, optional, defaults to current window]
	- page: page number [integer, optional, no page switch when not a number]
	- resetvalue: reset value to oldValue when available [boolean, optional]
	- soft: soft alert (accept & correct) [boolean, optional]
	- blink: blink the focus element [number, optional, times to blink, takes the default when not a number]
	- show_final: this is a final alert (only an Ok button) [boolean, optional, also depends on FDValidate._final property]
	*/
	Alert: function () {
		return this.alert.apply(this, arguments);
	},
	alert: function () {
		var args = $A(arguments), options = (FDOptions.is(args[0]) ? args[0] : this._createAlertOptions(args)), retval = false, e = null, final = null;
		if (options.event) options.event = cloneEvent(options.event);

		this.log(['.alert', options]);

		/*if (Object.is(args[0]) || args[0] == null) e = args.shift();
		if (Function.is(args[0]) || args[0] == null) final = args.shift();
		var question = args[0], msg = args[1], el_focus = args[2], wnd = args[3] || null, page = args[4] || 0, resetvalue = args[5] || false, soft = args[6] || false, blink = args[7], show_final = args[8] || false;
		*/

		var el_focus = options.el_focus;
		if (String.is(el_focus)) options.el_focus = el_focus = FD.get(el_focus);
		//if (!el_focus) el_focus = document.activeElement;
		if (el_focus && !el_focus.el) options.el_focus = el_focus = { el: el_focus, focus: el_focus };
		if (options.resetValue && typeof el_focus.el.oldValue != 'undefined') {
			el_focus.el.value = el_focus.el.oldValue;
		}

		if (!options.window) options.window = (window.FD ? window : top);
		var message = '', label = options.label;
		if (label == null && el_focus && el_focus.el) {
			var el = (Array.is(el_focus.el) ? (el_focus.el.length > 0 ? el_focus.el[0] : null) : el_focus.el);
			var lblby = (el ? el.getAttribute('aria-labelledby') : null);
			label = '';
			if (lblby) {
				lblby.split(' ').forEach(function (lbl, i) {
					if (!/label-/.test(lbl))
						label = label.append($('#' + lbl).html().text(), ' - ');
				});
			} else {
				label = $('label[for="' + el.id + '"]').html().text();
			}
			if (label.right(1) == '*') label = label.left(label.length - 1);
		}
		if (String.is(label)) {
			message = FD.Texts.get('Validate.INVALID_INPUT');
			if (!label.empty()) {
				if (label.left(1) == '#' && $(label).length > 0) label = $(label).html();
				options.label = unescape(label).stripHTML();
				message = message.append(FD.Texts.get('Validate.AT_QUESTION') + options.label.truncate(80), '\n');
			}
		}
		if (String.is(options.message) && !options.message.empty()) {
			message = message.append((FD.Parser ? FD.Parser["mergecode"].Parse(options.message) : options.message), '\n');
			if (message.right(2) == '..') { // oeps, a punctuation to much
				// strip off the extra dot
				message = message.left(message.length - 1);
			}
		}

		if (Number.is(options.page) && options.page > 0 && (typeof WYSIWYG == 'undefined' || window.name == 'item-builder')) {
			this._goPage(options);
		}

		FD.Calendar.Close(); // close the calendar if applicable

		message = message.replace(/\r/g, '').replace(/\\r/g, '').replace(/\n/g, '<br>').replace(/\\n/g, '<br>');
		this.alerting = true;

		var opt = { ACCEPT: '', CORRECT: '', notitle: false, content: message, onclick: this.postAlert.bind(this, options) }; // el_focus, wnd, (e ? cloneEvent(e) : null), page, blink, final
		if (options.soft) {
			$.extend(opt, { buttonType: FD.Window.Constants.buttonTypes.ACCEPTCORRECT, ACCEPT: FD.Texts.get('Validate.BUTTON_ACCEPT'), CORRECT: FD.Texts.get('Validate.BUTTON_CORRECT') });
			FD.Window.alert(opt, true);
		} else if ((!this._final && !options.isFinal) || this._interactive) { // immediate validation from user input
			this.log('.alert, interactive=' + this._interactive + ', final=' + this._final);
			$.extend(opt, { buttonType: FD.Window.Constants.buttonTypes.CORRECTCONTINUE, CONTINUE: FD.Texts.get('Validate.BUTTON_CONTINUE'), CORRECT: FD.Texts.get('Validate.BUTTON_CORRECT') });
			FD.Window.stop(opt, true);
		} else if (this._mode == FDValidate.MODE_DEFAULT) {
			FD.Window.stop(opt);
		} else if (this._mode == FDValidate.MODE_ALLOW_SKIP) {
			opt.content += '<br><br>' + FD.Texts.get('Validate.CONTINUE_SAVE');
			FD.Window.confirm(opt);
		}

		return retval;

	},
	postAlert: function (options, rtype, cwindow) { // el_focus, wnd, e, page, blink, final, rtype, cwindow) {
		var retval = false;
		if (Object.is(cwindow)) {
			cwindow._lastFocus = null;
			if (cwindow.options.buttonType == WND.Constants.buttonTypes.YESNO) retval = (rtype == WND.Constants.returnTypes.YES);
			else if (cwindow.options.buttonType == WND.Constants.buttonTypes.OKCANCEL) retval = (rtype == WND.Constants.returnTypes.OK);
			else if (cwindow.options.buttonType == WND.Constants.buttonTypes.ACCEPTCORRECT) retval = (rtype == WND.Constants.returnTypes.ACCEPT);
			else if (cwindow.options.buttonType == WND.Constants.buttonTypes.CORRECTCONTINUE) retval = (rtype == WND.Constants.returnTypes.CONTINUE);
		}

		retval = (retval ? FDValidate.SUCCESS : FDValidate.FAIL);

		this.log(['.postAlert, rtype=' + rtype + ', retval=' + retval, cwindow, options]);

		// is there a validation feature present
		var hv = FD.Form.Features.has('validations'); // hv=hasValidation

		this.alerting = false;

		if (!retval) {

			var el, focus = (options.el_focus ? options.el_focus.focus : null);
			if (focus && typeof focus.length != 'undefined' && (typeof focus.tagName == 'undefined' || focus.tagName.toLowerCase() != 'select')) focus = focus[0]; // multiple choice
			if (focus && options.event && (el = checkEvent(options.event)) && el.name == focus.name && el.type && /checkbox|radio/.test(el.type)) {
				// the validation has been called from an event on the element
				// the element is a multiple choice. so, set it back to it's original value.
				if (el.type == 'checkbox') el.checked = !el.checked;
				else setSelectedOption(null, el.name, (el.value != el.prevValue ? el.prevValue || '' : ''));
				el.prevValue = window.FD.selected(el.name, 'value');

				// if the form has the events feature, then call the event (doesn't matter if it does not exists)
				if (typeof FD.Form.Events != 'undefined') FD.Form.Events.exec(el.name, null, el, 'FDValidate.postAlert', true);
			}

			if (Number.is(options.page) && options.page > 0 && typeof WYSIWYG == 'undefined') {
				this._goPage(options);
			}

			if (focus) {
				try { $(focus).scrollIntoView({ offset: 20, duration: 100 }); /* if (!FD.Utils.isElementInView(focus)) focus.scrollIntoView(); */ } catch (e) { this.log('.postAlert, error=' + (e.message || e), 'error'); };
			}

			if (options.el_focus) {
				if (!Number.is(options.blink) || options.blink > 0) {
					$(options.el_focus.el).blink({ limit: 8, set_focus: true, focus_element: options.el_focus.focus });
				} else {
					// In case of an immediate validation blinking is not used
					if (!options.interactive && !options.event && typeof FD.Form.Events != 'undefined') {
						// When the validation was not triggered from an event then make sure that an onfocus event (which calls the checkFocus method on the FD.Form.Events object) 
						// changes the focus to the element which did not pass the validation.
						FD.Form.Events.setFocus(options.el_focus);
					} else this._tmr = this.Select.delay(this, 200, options.el_focus, options.window);
				}
			}
			if (options.final) options.final(retval); // call the final function on the options object

		} else if (this._final && !options.soft && this._mode == FDValidate.MODE_ALLOW_SKIP) {

			// when the validation is not a soft (acceptable) one and we are allowed to skip further validation then...

			this.log('.postAlert, skipping further validations');

			this._skip = true;
			retval = FDValidate.SKIP;

			FD.Form.Action.Set(['skip', true]);
			if (options.final) options.final(retval); // call the final function on the options object
			//if (hv) FD.Form.Features.get('validations').finish(retval, true); // call the validations global finish function, forcing to finish
			if (FD.Form.Features.has('progress')) FD.Form.Features.get('progress').finish();

		} else {

			if (options.final) options.final(retval); // call the final function on the options object

		}

		this.log(['.postAlert, retval=' + retval + ', rtype=' + rtype, options]);

		if ((!this._final || !retval) && FD.Form.Features.has('progress')) {
			FD.Form.Features.get('progress').finish(0);
		}

		if (retval && !this._final) {
			// Ok, it's valid. It's not a final validation, so set focus to the next/related element
			if (this.focus) {
				this.log(['.postAlert, focus', this.focus]);
				try { this.focus.focus(); } catch (e) { }
				this.focus = null;
			} else if (options.event && (el = checkEvent(options.event)) && el.type && /checkbox|radio/.test(el.type)) {
				this.log(['.postAlert, el', el]);
				try { el.focus(); } catch (e) { }
			} else if (options.event && options.event.relatedTarget) {
				this.log(['.postAlert, relatedTarget', options.event.relatedTarget]);
				setTimeout(
					function () {
						var target = $(options.event.relatedTarget);
						if (target.prop('type') == 'button') target.click();
						else target.focus();
					}, 500);
			}
		}
		// moved to above. this.alerting = false;

		/*
		if (!retval && hv) {
			var validations = FD.Form.Features.get('validations');
			//validations.fireEvent('onFinish', [retval]).clearEvents('onFinish').funcFinish = null;
			validations.finish(retval);
		} else if (retval && hv && !this._final) {
			FD.Form.Features.get('validations').finish(retval); //.fireEvent('onFinish', [retval]);
		}*/

		//if (!this._skip) {
			if(this.final) { this.final(retval); this.final = null; } // old
			this.fireEvent('onFinal', [retval]); // new
		//}

		if (this.deferred) {
			if (retval) {
				this.deferred.resolve(options);
			} else {
				this.deferred.reject(options);
			}
		}

		//return retval;
	},

	Select: function (el_focus, wnd, page) {
		window.clearTimeout(this._tmr);
		wnd = wnd || window;
		if (Number.is(page) && page > 0) {
			if (typeof wnd.FD.Pages != 'undefined') wnd.FD.Pages.GoTo(page, true);
			else if (typeof wnd.switchPanel != 'undefined') wnd.switchPanel(page, true);
			else if (typeof wnd.switchTab != 'undefined') wnd.switchTab(page, false, true);
		}
		if (el_focus) {
			var el = (Object.is(el_focus.focus) ? el_focus.focus : (Object.is(el_focus.el) ? el_focus.el : el_focus));
			if (typeof el.length != 'undefined' && (typeof el.tagName == 'undefined' || el.tagName != 'SELECT')) el = el[0];
			try { wnd.Select('', el, true); } catch (e) { };
			//FDEvents.FireEvent('ValidateAfterSelect');
		}
		return false;
	}
}).extend({
	REQUIRED: 1,
	NUMBER: 2,
	NUMERIC_MIN: 3,
	NUMERIC_MAX: 4,
	DATE: 5,
	CHARS: 6,
	GROUP_MIN: 8,
	GROUP_MAX: 9,
	LINES_MIN: 10,
	EMAIL: 11,
	LIST_MIN: 12,
	ALT: 13,
	URL: 14,
	DROPDOWN: 15,
	FILE: 16,
	REGEXP: 17,

	MODE_DEFAULT: 0,
	MODE_ALLOW_SKIP: 1,

	FAIL: 0,
	SUCCESS: 1,
	SKIP: 2,
	STOP: 2

});

var FDBlink = new Class({

	Extends: FDBaseClass,
	_class: 'FDBlink',

	active: true,
	wnd: null,
	focus: null,
	lmt: 0,
	_el: null,
	_cnt: 0,
	_tmr: 0,

	exec: function () {
		window.clearTimeout(this._tmr);
		this._tmr = 0;
		var hide = this._el[0].style.visibility != 'hidden';

		//this.log('.check, lmt=' + this.lmt);
		if (this.lmt == 0 || this._cnt < this.lmt) {
			this._tmr = this.exec.delay(this, 350); // window.setTimeout('FDBlink.exec();', 350);
			try { this.show(!hide); } catch (e) { }
		} else {
			this.stop();
		}
		if (this.lmt >= 0 && hide) this._cnt++;
	},
	show: function (show) {
		if (!this._el) return;
		if (show) {
			for (var i = 0; i < this._el.length; i++) this._el[i].style.visibility = '';
			//if (this.el[0].focus) this.el[0].focus();
		} else {
			for (var i = this._el.length - 1; i >= 0; i--) this._el[i].style.visibility = 'hidden';
		}
	},
	stop: function () {
		if (this._tmr) window.clearTimeout(this._tmr);
		this._tmr = 0;
		this.show(true);
		//if (FD.Browser.ie || FD.Browser.camino) 
		FD.Validate.Select(this.focus, this.wnd);
		this.wnd = null; this.focus = null; this._el = null;
	},
	check: function (wnd, obj, blink) {
		if (this._el) this.stop();
		if (!this.active) return;
		this.wnd = wnd || window; this.focus = obj;
		if (typeof obj.el.length != 'undefined' && (typeof obj.el.tagName == 'undefined' || obj.el.tagName != 'SELECT')) {
			this._el = obj.el;
		} else this._el = new Array(obj.el);
		this._cnt = this.lmt = 0;
		if (arguments.length >= 3) this.lmt = blink;
		//	this.onblur = 
		this.exec.delay(this, 100);
	}
});

FD.Validate = new FDValidate();
FD.Blink = new FDBlink();

if (typeof jQuery != 'undefined') {

	$.fn.validate = function (options) {

		var valid = true, els = {};
		this.each(function () {

			if (this.type && /checkbox|radio/.test(this.type)) {
				if (!els[this.name]) els[this.name] = [];
				els[this.name].push(this);
			} else {
				els[this.name] = this;
			}

		});

		//String.log(["validate", els]);

		for (var key in els) {

			var item = els[key];
			var classes = (Array.is(item) ? item[0].className : item.className || '').split(' '), len = classes.length, count = 0;

			String.log([key, item, classes]);

			for (var i = 0; i < len; i++) {

				if (/validate\-/.test(classes[i])) {
					count++;
					if (!FD.Validate.CheckValue(item, classes[i], options)) return (valid = false);
				}

			}
			if (count == 0 && options && options.type && !FD.Validate.CheckValue(this, options)) return (valid = false);

		}

		return valid;

	}

	$.fn.alert = function (options) {

		this.each(function () {

			if (String.is(options)) {
				options = { message: options };
			}

			// create a copy into a FDOptions object
			var opt = FDOptions.create(options);
			if (!opt.el_focus) {
				opt.el_focus = this;
			}
			if (typeof opt.label == 'undefined') {
				opt.label = null;
			}
			FD.Validate.alert(opt);

		});

		return false;
	}
}

function CheckValue(el, type, range, question, fel, wnd, page, resetvalue) {
	return FD.Validate.CheckValue.apply(FD.Validate, arguments); // (el, type, range, question, fel, wnd, page, resetvalue);
}
function CheckAlert(question, msg, el_focus, wnd, page, resetvalue) {
	return FD.Validate.alert.apply(FD.Validate, arguments); // (question, msg, el_focus, wnd, page, resetvalue);
}
function CheckSelect(el_focus, wnd, page) {
	return FD.Validate.Select.apply(FD.Validate, arguments); // (el_focus, wnd, page);
}
function CheckBlink(wnd, opEl) {
	FD.Blink.check(wnd, opEl);
}

var __FD_VALIDATE = true;