
var FDUpload = new Class({

	Extends: FDBaseClass,
	Implements: [Events, FDButtonBase],
	_class: 'FDUpload',

	//_trace: false,

	name: '',

	_container: null,
	_selection: null,
	_readonly: null,
	_element: null,
	_elementReadonly: null,
	_button: null,
	_buttonRemove: null,
	_name: null,
	_plupload: null,

	_enabled: true,
	_locked: false,
	_empty: true,
	_filename: '',
	_filesize: 0,
	_uploaded: false,
	_startOptions: null,

	_errorCount: 0,
	_debugHasProgress: false,
	_debugTimerStart: 0,
	_debugTimerUploaded: 0,
	_debugTimerCount: 0,

	_log: null,

	initialize: function (options, upl_options) {
		this.parent.apply(this, arguments);

		this.name = this.options.name;

		this._log = new FDLog({ sep: '\n' });

		this._container = $('#upl_' + this.name + '_container').attr('role', 'group');
		this._selection = this._container.find('.upload-selection');
		this._readonly = this._container.find('.upload-readonly').hide();

		this._element = $('#' + this.name);
		this._elementReadonly = $('<input type="hidden" name="' + this.name + '_readonly" id="' + this.name + '_readonly">').insertAfter(this._element);
		
		var css = {
			paddingTop: this._element.css('paddingTop')/* + (Number.create(this._element.css('border-width')) * 2)*/,
			paddingBottom: this._element.css('paddingBottom'),
			fontFamily: this._element.css('font-family'),
			fontSize: this._element.css('font-size')
		};
		if (Number.create(this._element.css('height')) > 0) {
			css['height'] = this._element.css('height');
		}

		this._name = $('<input type="hidden" name="upl_' + this.name + '_name">');

		this._button = this.createButton(
			{
				suffix: 'fa',
				className: 'paperclip',
				buttonClassName: 'upload-button upload-button-add',
				title: this.getText('FILE_BUTTON')
			})
			.on('keyup', function (e) {
				if (e.keyCode == 32) $(this).click();
			});
		this._buttonRemove = this.createButton(
			{
				suffix: 'fa',
				className: 'times',
				buttonClassName: 'upload-button upload-button-remove',
				onclick: this.remove.bind(this),
				title: this.getText('FILE_BUTTON_REMOVE')
			})
			.setVisible(false)
			.on('keyup', function (e) {
				if (e.keyCode == 32) $(this).click();
			});

		this._buttonRemoveReadonly = this.createButton(
			{
				suffix: 'fa',
				className: 'times',
				buttonClassName: 'upload-button upload-button-remove',
				onclick: this.set.bind(this, FDUpload.SET_INPUT, { removeReadonly: true }),
				title: this.getText('FILE_BUTTON_REMOVE')
			})
			.on('keyup', function (e) {
				if (e.keyCode == 32) $(this).click();
			});

		this._element.after(this._button).after(this._name).setReadonly(true, { force: true }).attr('tabIndex', -1);
		this._button.after(this._buttonRemove);

		this._readonly.append(this._buttonRemoveReadonly);

		if (FD.Browser.less('firefox', 6)) {
			var rt = FDUpload.upl_options.runtimes.split(',');
			if (rt[0] == 'html5') {
				rt.shift();
				FDUpload.upl_options.runtimes = rt.join(',');
			}
		}

		var opt = $.extend({
			browse_button: this._button.get(0),
			multipart_params: {
				guid: FD.Upload.options.guid,
				prefix: this._guid
			}
		}, FDUpload.upl_options);

		/* no client side resizing anymore, server side does a better job.
		var rw = this._element.attr('fd:resizewidth'), rh = this._element.attr('fd:resizeheight');
		if (rw || rh) {
		opt.resize = {};
		if (rw) opt.resize.width = Number.int(rw);
		if (rh) opt.resize.height = Number.int(rh);
		}*/

		var url = FDUri.create(opt.url).set({ protocol: FDUri.current.protocol, host: FDUri.current.host });

		this.log(['.initialize, url=' + url.toString(), url]);
		this._log.add('initialize', 'initializing...');

		opt.url = url.toString();

		if (this._element.fd_data('accept')) {
			Object.extend(opt, { filters: { mime_types: [{ title: this.getText('ACCEPT_TITLE'), extensions: this._element.fd_data('accept').replace(/\./g, '')}]} });
		}
		if (this._element.fd_data('max')) {
			Object.extend(opt, { filters: { max_file_size: this._element.fd_data('max')} });
		}

		this.log(['.initialize', opt]);

		this._plupload = new plupload.Uploader(opt);

		this._plupload.bind('FilesAdded', this.added.bind(this));
		this._plupload.bind('FilesRemoved', this.removed.bind(this));

		this._plupload.bind('UploadProgress', this.progress.bind(this));
		this._plupload.bind('ChunkUploaded', this.chunkUploaded.bind(this));
		this._plupload.bind('FileUploaded', this.uploaded.bind(this));
		this._plupload.bind('Error', this.error.bind(this));
		this._plupload.bind('Init', (function (args) {
			if (!FD.Browser.ie || args.runtime != 'html4') {
				this._element.on('click', (function () {
					var browse = this._container.find('input[type="file"]');
					if (!browse.prop('disabled')) browse.click();
				}).bind(this));
			}
			this._container.find('input[type="file"]').attr('tabindex', -1);
		}).bind(this));

		this._plupload.init();


		FD.Form.addEvent('onFinalSubmitForm', (function () {
			this._container.find('form').remove();
		}).bind(this));

		this._log.add('initialize', 'initialized');
	},

	element: function () {
		return this.$().get(0);
	},
	$: function () {
		if (this.isStateInput()) {
			return this._element;
		} else {
			return this._elementReadonly;
		}
	},

	getUniqueID: function () {
		return this.parent().left(6); // shorten the _guid to 6 characters
	},

	setValue: function (val) {
		var content = this._container.find('.upload-readonly-content').html(val),
			container = content.children(':first');


		if (container.data("filename")) {
			this._elementReadonly.val(container.data("filename"));
			this._filesize = Number.create(container.data('filesize'));
		} else {
			var href = container.find("a").prop("href"),
				url = FDUri.create(href);

			this._elementReadonly.val(url.file || '');
			this._filesize = Number.create(container.fd_data('filesize'));
		}

		this.log('.setValue, filesize=' + this._filesize);
		this.set((val.empty() ? FDUpload.SET_NONE : FDUpload.SET_READONLY));
	},

	refresh: function () {
		this._plupload.refresh();
	},

	added: function (up, files) {

		this.log(['.added', files, this._plupload.files]);

		if (this._plupload.files.length > 1) {
			// each time the browse button is used to select a file, the file is added to the queue and doesn't replace any other file
			// so, make sure there is only one file in the queues
			for (var i = this._plupload.files.length - 2; i >= 0; i--) {
				this._plupload.removeFile(this._plupload.files[i]);
			}
		}

		if (files[0].name.length > 200) {

			this._log.add('added', 'filename ' + files[0].name + ' is too long');
			this._plupload.removeFile(files[0]);
			FD.Window.alert({ content: this.getText('ERROR_FILENAME_MAXLENGTH'), onclick: (function () { FD.Form.Items.blink(this.name); }).bind(this) });

			return;
		}

		this._element.val(files[0].name + ' (' + String.format('number', plupload.formatSize(files[0].size)) + ')');
		this._log.add('added', 'filename=' + this._element.val());
		this.log('.added, filename=' + files[0].name);

		this._filename = files[0].name;
		this._plupload.settings.multipart_params.filesize = this._filesize = files[0].size;
		this._empty = false;

		this.toggleButtons(false);
//		this._button.hide();
//		this._buttonRemove.show();

		this._plupload.refresh();

		aEvents.exec(this.name);
		this.fireEvent('onAdded', [files]);
	},

	removed: function (up, files) {
		this.log(['.removed', files]);
		this._element.val('');
		this._empty = true;
		this._filename = '';
		this._filesize = 0;

		this.toggleButtons(true);
//		this._buttonRemove.hide();
//		this._button.show();

		this.fireEvent('onRemoved', [files]);
	},

	toggleButtons: function (toggle) {
		if (toggle) {
			//this._button.show().attr('tabindex', 0);
			this._buttonRemove.setVisible(false).attr('tabindex', -1);
		} else {
			this._buttonRemove.setVisible(true).attr('tabindex', 0);
			//this._button.hide().attr('tabindex', -1);
		}
	},

	count: function () {
		return (this._uploaded ? 0 : this._plupload.files.length);
	},

	remove: function () {

		this.log(['.remove', this._plupload.files]);
		this._log.add('remove', 'remove file');

		if (this._plupload.files.length > 0) {
			for (var i = this._plupload.files.length - 1; i >= 0; i--) {
				this._plupload.removeFile(this._plupload.files[i]);
			}
		}
		this._uploaded = false;
		this._name.val('');

		this._buttonRemove.setVisible(false);
		this._button.show().focus();

		aEvents.exec(this.name);
		this._plupload.refresh();
	},

	start: function (options) {

		this._startOptions = options;
		if (options) this.addEventsFromOptions(options);

		//alert(this._plupload.runtime);
		if (!this._element.fd_data('max')) {
			this._plupload.settings.filters.max_file_size = FD.Upload.options.max_total_size;
		}

		this._plupload.settings.multipart_params.runtime = this._plupload.runtime;

		this.log('.start, file=' + this._element.val() + ', runtime=' + this._plupload.runtime);
		this._log.add('start', 'file=' + this._element.val() + ', runtime=' + this._plupload.runtime);

		//this._errorCount = 0;

		if (!this._debugTimerStart) {
			this._debugTimerCount = 0;
			this._debugTimerStart = this._debugTrackStart.delay(this, 10 * 1000 /*10 sec*/);
		}

		try {
			this._plupload.start();
		} catch (e) {
			FD.Error.Send(
				(e.message || e),
				'fd_upload.js', 209, 'FDUpload.start', 'name=' + this.name + ', log=' + this._log.toString()
			);
		}
	},

	_debugTrackStart: function () {
		this._debugTimerCount++;
		if (this._debugTimerCount >= 2) {
			clearTimeout(this._debugTimerStart);
		}
		FD.Error.Send(
			'Upload seems not to be started, count=' + this._debugTimerCount,
			'fd_upload.js', 221, 'FDUpload.debugTrackStart', 'name=' + this.name + ', log=' + this._log.toString()
		);
	},
	_debugTrackUploaded: function () {
		this._debugTimerCount++;
		if (this._debugTimerCount >= 2) {
			clearTimeout(this._debugTimerUploaded);
		}
		FD.Error.Send(
			'Upload seems not to be ended, count=' + this._debugTimerCount + ', uploaded=' + this._uploaded,
			'fd_upload.js', 221, 'FDUpload.debugTrackUploaded', 'name=' + this.name + ', log=' + this._log.toString()
		);
	},
	_debugClearTimers: function (type) {
		if ((!type || type == 'start') && this._debugTimerStart) {
			clearTimeout(this._debugTimerStart);
			this._debugTimerStart = this._debugTimerCount = 0;
		}
		if ((!type || type == 'uploaded') && this._debugTimerUploaded) {
			clearTimeout(this._debugTimerUploaded);
			this._debugTimerUploaded = this._debugTimerCount = 0;
		}
	},

	stop: function () {
			
		this._debugClearTimers();

		this.log('.stop');
		this._log.add('stop', 'stopping upload')
		this._plupload.stop();
	},

	progress: function (up, file) {

		this._debugClearTimers('start');

		this.log('.progress, file=' + file.name + ', ' + file.percent + '%, size=' + file.size + ', loaded=' + file.loaded);
		if (file.percent <= 20 || file.percent >= 80) {
			this._log.add('progress', 'file=' + file.name + ', ' + file.percent + '%, size=' + file.size + ', loaded=' + file.loaded + ', status=' + file.status);
		}


		if (file.percent == 100 && file.size - file.loaded < 500 && !this._debugTimerUploaded) {
			this._debugTimerUploaded = this._debugTrackUploaded.delay(this, 6 * 1000 /*6 sec*/);
		}

		this.fireEvent('onProgress', [this, file]);
		// file.name, file.percent + '%'
	},

	chunkUploaded: function (up, file, info) {
		//this.log(['.chunkUploaded', info]);
		/*var result = $.parseJSON(info.response);
		if (!result.OK) {
		*/

		if (file && typeof file.percent != 'undefined' && (file.percent <= 20 || file.percent >= 80)) {
			this._log.add('chunkUploaded', 'file=' + file.name + ', ' + Object.inspect(info));
		}
	},

	uploaded: function (up, file, response) {
		//return;
		try {

			this._log.add('uploaded', 'response=' + (response ? Object.inspect(response) : '<none>'));
			
			var rs = this.parseJSON(response.response);
			this._name.val(rs.info);
			this._uploaded = true;

			this._debugClearTimers();

			this.log(['.uploaded, file=' + this._name.val(), file, response]);
			this._log.add('uploaded', 'file=' + this._name.val());

			if (this._errorCount > 0) {
				try {
					FD.Form.AppendElement('input[type="hidden"]', '_fd_upl_' + this.name + '_log', this._log.toString(), false);
				} catch (e) { }
			}

			this.fireEvent('onUploaded', [file, response]);
		} catch (e) {
			try {
				FD.Error.Send(
					(e.message || e) + ', runtime=' + this._plupload.runtime + ', response(type)=' + typeof response + ', response=' + (response ? Object.inspect(response) : '<none>'),
					'fd_upload.js', 260, 'FDUpload.uploaded', 'name=' + this.name + ', log=' + this._log.toString()
				);
			} catch (e) {
				try {
					FD.Error.Send(
						(e.message || e) + ', runtime=' + this._plupload.runtime + ', response(type)=' + typeof response + ', no access to property response',
						'fd_upload.js', 266, 'FDUpload.uploaded', 'name=' + this.name + ', log=' + this._log.toString()
					);
				} catch (e) {
					FD.Error.Send(
						(e.message || e) + ', runtime=' + this._plupload.runtime + ', no access to variable response',
						'fd_upload.js', 271, 'FDUpload.uploaded', 'name=' + this.name + ', log=' + (this._log ? this._log.toString() : '<no log>')
					);
				}
			}
			throw e;
		}

	},
	parseJSON: function (data) {
		// Attempt to parse using the native JSON parser first

		try {
			if (window.JSON && window.JSON.parse) {
				return window.JSON.parse(data);
			}
		} catch (e) {
			FD.Error.Send(
				(e.message || e) + ', runtime=' + this._plupload.runtime + ', data=' + data,
				'fd_upload.js', 289, 'FDUpload.parseJSON', 'name=' + this.name + ', log=' + this._log.toString()
			);
		}

		if (data === null) {
			return data;
		}

		if (typeof data === "string") {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim(data);

			if (data) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				var rvalidchars = /^[\],:{}\s]*$/,
					rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
					rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
					rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;

				if (rvalidchars.test(data.replace(rvalidescape, "@")
				.replace(rvalidtokens, "]")
				.replace(rvalidbraces, ""))) {

					try {
						return (new Function("return " + data))();
					} catch (e) {
						FD.Error.Send(
							(e.message || e),
							'fd_upload.js', 319, 'FDUpload.parseJSON', 'name=' + this.name + ', log=' + this._log.toString()
						);
					}
				}
			}
		}

		throw "Invalid JSON: " + data;
	},

	_getErrorKey: function (code) {
		for (var prop in plupload) {
			if (typeof plupload[prop] == 'number' && plupload[prop] == code) return prop;
		}
		return '<unknown>';
	},
	error: function (up, error) {

		this._errorCount++;
		this._debugClearTimers();

		this.log(['.error', error]);
		this._log.add('error', 'registering error (code=' + error.code + ', ' + this._getErrorKey(error.code) + ', count=' + this._errorCount + ')...');

		var text;
		if (error.code == plupload.FILE_SIZE_ERROR) {
			text = this.getText('ERROR_FILESIZE').sprintf(error.file.name, plupload.formatSize(error.file.size), plupload.formatSize(Number.int(this._element.fd_data('max')) * 1024));
		} else if (error.code == plupload.FILE_EXTENSION_ERROR) {
			text = FD.Texts.Validate.get('FILE_EXTENSION').sprintf(this._element.fd_data('accept') || '');
		} else /*if (error.code == plupload.HTTP_ERROR)*/ {
			if (error.response) {
				try {
					this.log('.error, response=' + error.response);
					this._log.add('error', 'response=' + error.response);

					var rs = $.parseJSON(error.response)
					if (rs && rs.info) {
						text = String.sprintf(rs.info, plupload.formatSize(FD.Upload.options.max_total_size));

						this.log([rs, text]);
					}
				} catch (e) { this.log('.error, error=' + (e.message || e), 'error'); }
			}
			if (!text) {
				if (error.status) {
					text = FD.Texts.get('Status.MESSAGE_' + error.status);
				}
				if (!text) {
					text = this.getText('ERROR_GENERAL').sprintf((error.file ? error.file.name : '<filename not available>'), (error.status ? error.status : error.code));
				}
			}

			this._log.add('error', 'resetting plupload');
			// reset the plupload and file status to enable resuming the upload
			this._plupload.status = plupload.STOPPED;
			error.file.status = plupload.QUEUED;
			this._plupload.stop(); // stop the plupload

			//if (!error.status || !error.status.list(FDUpload.HTTP_STATUS_UNAVAILABLE, FDUpload.HTTP_STATUS_UPDATING)) {
				// remove the file when it's an unknown error to ensure a stable upload of the file
				this._plupload.removeFile(error.file);
			//}
		}

		if (text) {
			this._log.add('error', text);
			if (false && FD.Form.Features.has('Validations')) {
				FD.Form.Validations.alert(this.name, text);
			} else {
				FD.Window.alert({ content: text, onclick: (function () { FD.Form.Items.blink(this.name); }).bind(this) });
			}
		}

		/*try {
			FD.Error.Send(
				'Upload error, uploaded=' + this._uploaded,
				'fd_upload.js', 221, 'FDUpload.error', 'name=' + this.name + ', log=' + this._log.toString()
			);
		} catch (e) { }*/

		this.fireEvent('onError', [error]);
	},

	set: function (action, options) {
		var el = this._container.find('.upload-state'), file, container = this._element.parent();
		if (el.length == 0) return;
		if (action == FDUpload.SET_DETERMINE) { // el.data('prevValue') && el.data('prevValue') == '0') {
			action = (this._readonly.find('.upload-readonly-content').children().length == 0 ? FDUpload.SET_INPUT : FDUpload.SET_READONLY);
		} else {
			el.data('prevValue', el.val());
		}
		if (action > 0) el.val((action == FDUpload.SET_INPUT ? FDUpload.STATE_INPUT : FDUpload.STATE_READONLY));
		if (action == FDUpload.SET_INPUT && options && options.removeReadonly) this._readonly.find('.upload-readonly-content').empty();

		var readonly = parseInt(el.val()) == FDUpload.STATE_READONLY;
		if (!this._locked && action == FDUpload.SET_NONE && FD.Browser.ios && FD.Browser.safari && FD.Browser.ios_version <= 5) {
			this._selection.after($('<span>' + FD.Texts.get('FILE_IOS_SAFARI') + '</span>')).css('visibility', 'hidden');
		}
		this._readonly.toggle(readonly); /* set the display of the readonly part */
		if (!(FD.Browser.ios && FD.Browser.safari && FD.Browser.ios_version <= 5)) {
			this._selection.toggle(!readonly); /* set the display of the file input */
		}
		this._plupload.disableBrowse(!this._enabled || readonly || this._element.prop('disabled'));
		this._button.setDisabled(!this._enabled || readonly || this._element.prop('disabled'));
		this._buttonRemove.setDisabled(!this._enabled || readonly || this._element.prop('disabled'));
		this._buttonRemoveReadonly.setDisabled(!this._enabled);

		this.refresh();
		if (typeof aEvents != 'undefined' && (!options || (Object.is(options) && !options.no_events)) /*25-04-2012 && FD.Form.isLoading */) aEvents.exec(this.name, null, this, this.name + '.upload.set', false, true, (options && options.thread ? options.thread : ''));
	},

	enable: function (options) {
		this._enabled = true;
		this.set(FDUpload.SET_DETERMINE, options);
	},
	disable: function (options) {
		this._enabled = false;
		this.set(FDUpload.SET_DETERMINE, options);
	},
	setEnabled: function (value, options) {
		if (value) this.enable(options);
		else this.disable(options);
	},
	getState: function () {
		return Number.create(this._container.find('.upload-state').val());
	},
	isStateInput: function () {
		return this.getState() == FDUpload.STATE_INPUT;
	},
	getValue: function () {
		var val = '';
		if (this.isStateInput()) {
			val = this._element.val();
		} else {
			val = this._elementReadonly.val();
		}
		return val;
	}

}).extend({
	defaults: {
		textKey: 'Uploader'
	},
	upl_options: {
		url: '/upload.asp',
		runtimes: 'html5,flash,html4', //
		chunk_size: '500kb', //'1mb',
		max_retries: 3,
		multi_selection: false,
		flash_swf_url: '/scripts/plupload/Moxie.swf',
		silverlight_xap_url: '/scripts/plupload/Moxie.xap'
	},
	STATE_INPUT: 0,
	STATE_READONLY: 1,
	SET_NONE: 0,
	SET_READONLY: 2,
	SET_INPUT: 1,
	SET_DETERMINE: 3, // determine to show input or to show readonly. when there is readonly content, the readonly is displayed

	HTTP_STATUS_UNAVAILABLE: 503,
	HTTP_STATUS_UPDATING: 506
});

var FDUploadHandler = new Class({

	Extends: FDBaseClass,
	Implements: Events,
	_class: 'FDUploadHandler',

	_uploads: null,
	_currentIndex: -1,
	_startOptions: null,
	_progress: null,
	_cancelText: '',

	initialize: function () {
		this.parent.apply(this, arguments);
		this._uploads = new FDObjects(FDOptions.create({ itemClass: FDUpload }));

		plupload.addI18n({ kb: 'kB', mb: 'MB', gb: 'GB', tb: 'TB' });

		FD.Events.AttachEvent('AfterPageChange', this.refresh.bind(this));
		FD.Events.AttachEvent('AfterLoad', this.refresh.bind(this));
	},

	count: function () {
		try {
			var count = 0, i, length = this._uploads.length;
			for (i = 0; i < length; i++) {
				count += this._uploads[i].count();
			}
			return count;
		} catch (e) {
			FD.Error.Send(
					(e.message || e),
					'fd_upload.js', 448, 'FDUploadHandler.count'
				);
			return 0;
		}
	},

	get: function (name) {
		return this._uploads.get(name);
	},

	add: function (options, upl_options) {
		this._uploads.push(
			new FDUpload(
				$.extend(options, { onUploaded: this._upload.bind(this), onError: this.error.bind(this), onProgress: this.progress.bind(this) }),
				upl_options
			)
		);
	},

	refresh: function () {
		for (var i = 0, length = this._uploads.length; i < length; i++) {
			this._uploads[i].refresh();
		}
	},

	start: function (options) {

		try {

			this.log('.start', 'group');

			if (options) {
				options.clear = true;
				this.addEventsFromOptions(options);
			}

			var i, length = this._uploads.length, total = 0, info = '', size = 0;
			for (i = 0; i < length; i++) {

				this.log('.start, ' + this._uploads[i].name + ', filename=' + this._uploads[i]._filename + ', filesize=' + this._uploads[i]._filesize);
				if (this._uploads[i]._filename) {
					size = Number.round(this._uploads[i]._filesize / Math.pow(1024, 2), 1);
					info += '<tr><td>- ' + this._uploads[i]._filename + '</td><td style="padding-left:12px;text-align:right">' + (size <= 0 ? '< ' : '') + FDNumber.create(size).toString({ decimals: 1, format: true }) + ' MB</td></tr>';
				}

				total += this._uploads[i]._filesize;
			}
			info += '<tr><td></td><td><hr></td></tr><tr><td></td><td style="text-align:right">' + FDNumber.create(Number.round(total / Math.pow(1024, 2), 1)).toString({ decimals: 1, format: true }) + ' MB</td></tr>';

			this.log('.start, totalsize=' + total + ', maxsize=' + this.options.max_total_size);

			if (this.options.max_total_size && total > this.options.max_total_size) {
				this.log('', 'groupEnd');
				FD.Window.alert(this.getText('ERROR_TOTAL_FILESIZE').sprintf(plupload.formatSize(this.options.max_total_size), '<table cellpadding="0" cellspacing="0">' + info + '</table>'));
				return;
			}

			this._progress = FD.Form.Features.get('progress');
			if (this._progress) this._progress.init(100, '', '', this.getText('UPLOADING'), '', true, -1);
			else {
				FD.Error.Send(
					'No progressbar available',
					'fd_upload.js', 604, 'FDUploadHandler.start'
				);
			}

			this._currentIndex = -1;
			if (!this._cancelText) this._cancelText = '<a href="javascript:void(0)" onclick="FD.Upload.stop()">' + this.getText('CANCEL_TEXT') + '</a>';
			this._upload.delay(this, 0);

			this.log('', 'groupEnd');

		} catch (e) {

			FD.Error.Send(
					(e.message || e),
					'fd_upload.js', 618, 'FDUploadHandler.start'
				);

			alert('An error occured while uploading the files to the server. Pleas try again.');
		}

	},

	_upload: function () {
		var upl, i, length = this._uploads.length;
		for (i = 0; i < length; i++) {
			if (this._uploads[i].count() > 0) {
				upl = this._uploads[i];
				this._currentIndex = i;
				break;
			}
		}

		if (upl) {
			upl.start();
		} else {
			//			this.stop();
			this.ready();
		}
	},

	stop: function () {
		if (this._currentIndex > -1) {
			this._uploads[this._currentIndex].stop();
		}
		this._currentIndex = -1;
		if (this._progress) this._progress.finish();
	},

	ready: function () {
		this.log('.ready');
		if (this._progress) this._progress.finish();
		this.fireEvent('onReady');
	},

	error: function (error) {
		if (this._progress) this._progress.finish();
		this.fireEvent('onError', [error]);
	},

	progress: function (upload, file) {
		if (this._progress) {
			if (!this._progress.initialized) {
				FD.Error.Send(
					'Progressbar not initialized anymore!',
					'fd_upload.js', 668, 'FDUploadHandler.progress'
				);
				this._progress.init(100, '', '', this.getText('UPLOADING'), '', true, -1);
			}
			this._progress.set(file.name + ' (' + plupload.formatSize(file.size) + ', ' + file.percent + '%, ' + this._cancelText + ')', file.percent, true);
		}
		this.fireEvent('onProgress', [file]);
	},

	set: function (name, action, options) {
		var upl = this._uploads.get(name);
		if (upl) upl.set(action, options);
	},

	enable: function (name, options) {
		var upl = this._uploads.get(name);
		if (upl) upl.enable(options);
	},
	disable: function (name, options) {
		var upl = this._uploads.get(name);
		if (upl) upl.disable(options);
	},
	setEnabled: function (name, value, options) {
		var upl = this._uploads.get(name);
		if (upl) upl.setEnabled(value, options);
	},

	setValue: function (name, val) {
		var upl = this._uploads.get(name);
		if (upl) upl.setValue(val);
	},
	getValue: function (name) {
		var upl = this._uploads.get(name);
		if (upl) return upl.getValue();
		return '';
	},
	getFilename: function (name) {
		var upl = this._uploads.get(name);
		return (upl ? upl._filename : '');
	},
	getState: function (name) {
		return this._uploads.get(name).getState();
	},
	isStateInput: function (name) {
		return this._uploads.get(name).isStateInput();
	},

	_predictedRuntime: '',
	predictRuntime: function (config) {
		if (this._predictedRuntime) return this._predictedRuntime;
		this._predictedRuntime = plupload.predictRuntime(config || FDUpload.upl_options);
		return this._predictedRuntime;
	}

}).extend({
	defaults: {
		textKey: 'Uploader'
	}
});

FD.Upload = new FDUploadHandler();

var __FD_UPLOAD = true;