window.fd_progresses = [];
var tmrProgressMove = 0;
function fd_progresses_move() {
	if (tmrProgressMove > 0) window.clearTimeout(tmrProgressMove);
	tmrProgressMove = window.setTimeout('fd_progresses_doMove()', 100);
}
function fd_progresses_doMove() {
	if (tmrProgressMove > 0) {
		window.clearTimeout(tmrProgressMove);
	}
	for (var i = 0; i < fd_progresses.length; i++) {
		if (typeof fd_progresses[i] == 'object' && fd_progresses[i].initialized) {
			fd_progresses[i].move();
		}
	}
}

var FDProgress = new Class({

	Extends: FDBaseFeature,
	_class: 'FDProgress',

	_trace: true,

	plural: 'progress', // don't use the real plural
	singular: 'progress',

	initialized: false,
	mode: 0, // 0=initialisation, 1=overlay
	loaded: false,

	width: 0,
	total: 0,

	_div: null,
	_title: null,
	_bar: null,
	_blind: null,
	_describedby: null,

	showing: false,
	visible: false,
	progress: 0,
	dir: 0,
	count: 0,

	funcInit: null,
	funcFinish: null,

	title: '',
	subtitle: '',
	subtitled: false,

	_tmrLoop: 0,
	_tmrWait: 0,

	initialize: function (title) {

		this.parent();
		this.title = title || '';

		index = fd_progresses.length;
		fd_progresses.push(this);

	},

	createProxies: function (proxies) {
		this.parent({
			position: this.position.bind(this)
		});
	},

	init: function (total, funcInit, funcFinish, title, subtitle, setMode, progress) {

		this.log('.init');

		this.DT = new Date();

		this.count++;
		if (this.initialized) return;

		this.initialized = true; this.progress = progress || 0;
		this._getRefs();

		if (arguments.length > 0) {
			this.total = total;
			this.funcInit = funcInit;
			this.funcFinish = funcFinish;
			if (typeof title == 'string') this.title = title;
			this.subtitle = '';
			this.footer = '';

			if (this.title == '') this.title = FD.Texts.get('Progress.TITLE_INIT_FORM');
			if (setMode || typeof WYSIWYG != 'undefined') this.setMode();
		}

		if (this.width == 0) this.width = Number.float(document.getElementById('tblProgress').width);
		this.visible = false;
		this.dir = 0;
		this._bar.width('1%');

		this.writeTitle(subtitle, true);
		$('.progress-window-wait').html(FD.Texts.Progress.get('WAIT'));

		this.show();

		if (this.funcInit) window.setTimeout(this.funcInit, 100);
	},

	_getRefs: function () {
		this._div = $('.progress-window');
		//this.log('._getRefs, div=' + this._div + ', length=' + this._div.length);
		this._bar = $('.progress-window-bar-inner');
		this._title = $('.progress-window-title');
		this._blind = $('.progress-blind');
		if (this._blind.length == 0) this._blind = null;
		
		if (this._describedby == null) {
			this._describedby = $('<div id="' + this._guid + '-describedby" style="display:none"></div>').appendTo($('body'));
		}
	},

	show: function () {

		this.log('.show');
		
		// tblProgressPos is the table which positions the progress window in the center (only needed when in initialisation mode)
		$('.progress-position').toggle(this.mode == 0);
		if (this.mode > 0) {
			$('.progress-position').height(0).width(0);
		}

		this.showing = true;
		
		$('body').attr('aria-busy', true).attr('aria-describedby', this._guid + '-describedby');

		this._bar.setVisible(false);
		this._div
			.stop()
			.show()
			.attr('aria-valuemin', 0)
			.attr('aria-valuemax', 100)
			.attr('aria-valuenow', 0);
		
		if (this._blind) this._blind.stop().show();
		this.position();
		
		if (this.mode == 0 && FD.Browser.mobile) {
			// when in initialisation mode and it's a mobile device then set the viewport
			FD.ViewPort.Set();
		}

		$(window).on('scroll.progress resize.progress', this._proxy.position);
		$('#form').on('scroll.progress', this._proxy.position);
	},

	hide: function () {
		
		$(window).off('.progress');
		$('#form').off('.progress');

		if (this.mode == 0) $('.progress-position').hide();

		showControl(this._div[0]);
		if (this.mode == 0) {
			this._div.hide();
			this.showing = false;
		} else {
			this._div.fadeOut(100, (function () { this.showing = false; }).bind(this));
			if (this._blind) this._blind.fadeOut(100);
		}
		
		$('body')
			.attr('aria-busy', false)
			.attr('aria-describedby', null);
		
	},

	wait: function (title, fn) {
		window.clearTimeout(this._tmrWait);
		this._tmrWait =
			(function () {
				this.init(50, '', '', title);
				if (this.count <= 1) {
					this.setMode();
					this.loop(10);
				}
				if (fn) fn.delay(0);
			}).delay(this, 600);
	},

	set: function (subtitle, set, abs) {
		
		if (!this.initialized) return;

		if (!this.showing) this.show();

		if (abs && Number.is(set)) this.progress = set;
		else this.progress += (Number.is(set) ? set : 1);
		var perc = Math.max(Math.round((this.progress / this.total) * 100), 1);

		this.log('.set, total=' + this.total + ', progress=' + this.progress + ', perc=' + perc);

		if (isNaN(perc) || !isFinite(perc)) perc = 1;
		this._bar.width(perc + '%');
		this.writeTitle(subtitle);
		
		//this.move();
		if (perc >= 1 && !this.visible) {
			this._bar.setVisible(true);
			this.visible = true;
			FD.Events.fireEvent('AfterProgressVisible');
		}
		
		this._div.attr('aria-valuenow', perc);
		
	},

	loop: function (timeout) {
		
		if (!this.initialized) return;
		window.clearTimeout(this._tmrLoop);
		
		timeout = timeout || 10;
		if (this.dir == 0) this.progress++;
		else this.progress--;
		
		var perc = Math.max(Math.round((this.progress / this.total) * 100), 1), left;
		if (this.dir == 0) this._bar.width(perc + '%');
		if (this.dir == 1) {
			left = Math.floor(this._bar.parent().width() * ((100 - perc) / 100));
			this._bar.css('left', left + 'px');
			this._bar.width(Math.max(this._bar.parent().width() - left - 2, 1));
		}
		if (perc >= 1 && !this.visible) {
			this._bar.show();
			this.visible = true;
		}
		if (this.dir == 0 && perc >= 100) this.dir = 1;
		if (this.dir == 1 && perc <= 1) { this.dir = 0; this._bar.css('left', '0px'); }
		
		this._tmrLoop = this.loop.delay(this, timeout);
		
	},

	finish: function () {

		this.count--;
		if (this.count > 0) {
			this.log('.finish, count=' + this.count + ', return');
			return;
		}

		this.log('.finish, mode=' + this.mode);

		window.clearTimeout(this._tmrWait);
		this._tmrWait = 0
		if (this.initialized) {
			window.clearTimeout(this._tmrLoop);
			this._tmrLoop = 0;
			if (tmrProgressMove > 0) window.clearTimeout(tmrProgressMove);

			this.hide();

			if ((arguments.length > 1 && arguments[1]) || arguments[0]) {
				FD.Form.show();
				this.setMode();
			}
		}
		this.loaded = true;

		if (this.initialized && this.funcFinish) window.setTimeout(this.funcFinish, 0);
		
		this.initialized = false;
		this.dir = 0;
		if (this._bar) this._bar.css('left', '0px');
	},

	position: function () {
		if (this.mode == 0) return; // initialisation mode

		var jq = typeof jQuery != 'undefined';
		if (jq) {
			var $window = $(window), $doc = $(document), $body = $('body'), scrollV = (document.body.scrollHeight > document.body.offsetHeight + 2);
			var dim = FD.ViewPort.getWindowDimensions(window), scrolling = window.scrollHeight > $window.height();

			if (this._blind) {
				//alert($('body').innerWidth() + ', ' + $('body').getWidth());
				this._blind
					.height(dim.height /*$body.innerHeight()*/ + (FD.Browser.greater('ie', 6, false, true) ? $window.scrollTop() : 0))
					.width(dim.width /*$body.innerWidth()*/ + (FD.Browser.greater('ie', 6, false, true) ? $window.scrollLeft() : 0));
			}
			var pos = {
				top: (dim.centerY - (FD.Browser.mobile ? 0 : (this._div.getHeight() / 2))),
				left: (dim.centerX - (this._div.getWidth() / 2) - (scrolling ? (FD.Browser.safari ? 8 : 10) : (FD.Browser.safari ? 4 : 2)))
			}
			//this.log('.position,  pos=' + Object.inspect(pos));
			this._div.offset(pos);
		} else {
			var oDim = getWindowDim(window), form = FD.get('form'), top, left;
			if (this._blind) {
				this._blind.style.height = (Browser.ie ? oDim.clientHeight : document.body.scrollHeight) + 'px';
				this._blind.style.width = (Browser.ie ? oDim.clientWidth : document.body.scrollWidth) + 'px';
				if (FD.Browser.ie) {
					this._blind.style.top = oDim.scrollTop + 'px';
					this._blind.style.left = oDim.scrollLeft + 'px';
				}
			}
			top = ((oDim.clientHeight / 2) - (this._div.offsetHeight / 2)) + oDim.scrollTop;
			left = ((oDim.clientWidth / 2) - (this._div.offsetWidth / 2)) + oDim.scrollLeft;
			layerMove(null, this._div, left, top);
		}

		showControl(this._div[0]);
		hideControl('SELECT', this._div[0]);

		if (typeof WYSIWYG != 'undefined') { window.top.FD.Window.hideLoader(); }
	},

	setMode: function () {

		this.log('.setMode, mode=' + this.mode);

		if (this.mode > 0) return;
		if (!this._div) this._getRefs();

		if (this._div) {

			// create a blinding overlay
			var blind = this._blind = document.createElement('DIV');
			blind.className = 'progress-theme-form progress-blind';
			blind.style.display = 'none';
			blind.style.left = blind.style.top = '0px';
			blind.innerHTML = '&nbsp;';
			document.body.appendChild(blind);

			// detach the current progress window from it's current position and append it to the body
			this._div.detach().appendTo('body').css('position', 'absolute').removeClass('progress-integrated').addClass('progress-overlay progress-window-shadow');
			if (FD.Browser.less('ie', 6, true)) this._div.width(320);

			//document.body.appendChild(clone); // append the cloned progress window to the body
			this._getRefs(); // reset the dom references

		}
		if (this.mode == 0) $('.progress-position').hide(); // don't need the positioning table anymore

		this.mode = 1; // switch to overlay mode

	},

	writeTitle: function (subtitle, init) {
		if (/* false no subtitles this moment && */subtitle) {
			if (subtitle == this.subtitle) return;
			this.subtitle = subtitle;
			if (!this.subtitled) this.setSubTitle(true);
			this._title.html(unescape(this.title + '%3Cbr%3E%3Cspan style="font-size:8pt; font-weight: normal"%3E- ' + subtitle + ' -%3C/span%3E'));
		} else if (this.subtitled) {
			this.setSubTitle(false);
			this._title.html(this.title);
		} else if (init) this._title.html(this.title);
		
		this._describedby.html(this.title + (this.subtitled ? ' - ' + this.subtitle : ''));
		
	},

	setSubTitle: function (set) {
		this.subtitled = set;
		//if( this._div.style ) this._div.style.height = ( parseFloat( this._div.style.height ) + ( lpSet ? 60 : -10 ) ) + 'px';
	}

});

var __FD_PROGRESS = true;