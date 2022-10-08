
var FDHelpItem = new Class({

	Extends: FDBaseClass,
	_class: 'FDHelpITem',

	id: 0,
	name: '',
	filled: false,
	title: '',
	text: '',

	initialize: function (id, title, text) {
		this.parent();
		if (arguments.length > 0) {
			this.id = id;
			this.name = String.create(id);
			if (arguments.length > 1) {
				this.set(title, text);
			}
		}
	},
	set: function () {
		if (Object.is(arguments[0])) {
			$.extend(this, arguments[0]);
		} else {
			this.title = arguments[0] || '';
			this.text = arguments[1] || '';
		}
		this.filled = true;
	}
});

var FDHelpHandler = new Class({

	Extends: FDObjects,
	Implements: FDBaseClass,
	_class: 'FDHelpHandler',

	_trace: false,

	_itemClass: FDHelpItem,

	Tooltip: null,

	_window: null,
	_domain: '',
	_js: false,
	_ajax: false,

	_type: 0, // 0=lightbox, 1=window

	initialize: function () {
		this.parent();
		this.namespace = this._guid;
		this.createProxies();

		this.Tooltip = new FDTooltip({ name: 'form', dirX: FDTooltip.LEFT, namespace: this.namespace, noTitle: true, sticky: true });
		$(document).ready(this.init.bind(this));
	},

	createProxies: function () {
		this.parent({
			hideTooltip: $.proxy(function (e) { this.log('.hide'); this.Tooltip.hide(e); }, this)
		});
	},

	init: function () {

		var infos = $('.has-info');
		if (infos.length > 0 && !infos[0].onmouseup) {
			this.setEvents();
		}

		this._type = FD.Form.Info.help || 0;

		this.log('.init, ajax=' + this._ajax + ', js=' + this._js + ', type=' + this._type + ', domain=' + this._domain);

	},

	setEvents: function (tooltip) {

		var info = (Number.is(tooltip) ? $('#help' + tooltip).parent() : (tooltip instanceof jQuery ? tooltip : $('.has-info'))).off('.' + this.namespace);
		if ((typeof FD.Form.Info.help == 'undefined' && typeof __ASC__ != 'undefined') || FD.Form.Info.help == 0 /* tooltip */) {
			this.Tooltip.setEvents(info, { sticky: true, offsetY: 0, hideWhenMoving: false });
		} else {
			info.attr('title', this.getText('CLICK_HERE', 'Help'));
		}
		info
		/*.attr('aria-label', this.getText('CLICK_HERE', 'Help'))*/
			.on('mousedown.' + this.namespace, function (e) { String.log(['mousedown', e]); e.stopPropagation(); e.preventDefault(); })
			.on('mouseup.' + this.namespace, function (e) {
				String.log(['mouseup', e]);
				var id = parseInt(/(\d+)/.exec($(this).find('img,svg')[0].id)[1]);
				FD.Help.show($(this));
			})
			.on('keyup.' + this.namespace, function (e) {
				String.log(['keyup targets', e]);
				if (e.keyCode.list(13, 32)) {
					var id = parseInt(/(\d+)/.exec($(this).find('img,svg')[0].id)[1]);
					FD.Help.show($(this));
				}
			});
		
		var parent = info.parent();
		if (parent && parent.prop('tagName').toUpperCase() == 'LABEL') {
			parent.on('click.' + this.namespace, function (e) {
				String.log([this.tagName + '.click', e]);
				if (e.target && $(e.target).hasClass('info-link')) e.preventDefault();
			});
		}
	},

	get: function (id) {
		var item = this.parent(id);

		if (!item) {
			item = new FDHelpItem(id);
			this.push(item);
		}
		if (!item.filled && !this._js && this._ajax) {
			if (typeof id == 'string') { // formdesk backoffice
				var data = new FDAjaxData({
					url: '/' + this._domain + 'help/xml/3/' + escape(item.id) + '/' + FD.getInfo().lang + '?r=' + escape(FD.Utils.Random()),
					async: false,
					verb: 'GET'
				});
				var req = FD.Ajax.sendRequest(data);
				if (req.status == 200) {
					try {
						var oData = req.responseXML, node = oData.selectNodes('//result').item(0);
					} catch (e) { return true; }
					try {
						if (node && Number.int(FD.Ajax.getNodeValue(node, 'code', '')) == 0) {
							node = node.selectSingleNode('value/helper/help');
							item.set('', FD.Ajax.getNodeValue(node, 'text'));
						}
					} catch (e) {
						FD.Error.Send(e);
					}
				}
			} else { // form
				this.log('.get, id=' + item.id);
				$.ajax({
					dataType: 'json',
					url: '/' + this._domain + 'help/json/1/' + FD.Form.Info.id + '/' + item.id + '?r=' + escape((typeof __GenID__ != 'undefined' ? __GenID__ : FD.Utils.Random())) + (FD.Form.Info.id_pl ? '&id_pl=' + FD.Form.Info.id_pl : ''),
					async: false,
					success: function (data) { item.set(data); }
				});
			}
		}
		return item;
	},

	remove: function (id) {
		var item = this.search.apply(this, arguments);
		if (item) this.parent(item.index);
		return this;
	},

	show: function (info) {
		
		var self = this;

		this.Tooltip.hide(true);
		var tooltip = info.find("div[role='tooltip']");
		if (tooltip.length == 0) tooltip = $('#' + info.prop('id') + '-tooltip');

		this.log(['.show', info, tooltip]);

		var title = '', content = tooltip.html();
		if (tooltip.attr('aria-labelledby')) {
			tooltip.attr('aria-labelledby').split(' ').forEach(function (el) {
				el = $('#' + el);
				if (el.find('label').length > 0) el = el.find('label').first();
				title = title.append(el.contents().filter(function (index, el) { return !$(el).hasClass('has-info'); }).text(), ' | ');
			});
		} else if (tooltip.attr('aria-label')) {
			title = tooltip.attr('aria-label');
		}
		title = title.truncate(50);

		if (typeof FD.Parser != 'undefined') content = FD.Parser["mergecode"].Parse(content);

		this.log('.show, title=' + title + ', content=' + content);

		FD.Window.info({ title: title, content: content, closable: false });
	},

	set: function (item, text) {

		var newTooltip = $(text), id = newTooltip.attr("id");
		var tooltip = $('#' + id);
		
		if (tooltip.length > 0)
			tooltip.replaceWith(newTooltip);
		else
			$('body').append(newTooltip);
    },

	/*
	show: function (id) {
	var item = this.get(id);
	if (!item) return;
	var text = item.text;
	if (typeof FD.Parser != 'undefined') text = FD.Parser["mergecode"].Parse(text);
	FD.Window.info({ title: item.title, content: text });
	},*/

	mouseOver: function (id, e) {
		
		this.log('.mouseOver');

		var item = this.get(id);
		if (!item) return true;
		var text = item.text;
		if (typeof FD.Parser != 'undefined') text = FD.Parser["mergecode"].Parse(text);
		this.Tooltip.show({ content: text }, e);
		//		window.df(window, 'help' + item.id, text/*, obj.title*/);
		return true;
	}

});

FD.Help = new FDHelpHandler();

var __FD_HELP = true;