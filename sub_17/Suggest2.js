define(['jquery', 'js2/Observable', 'js2/Progressbar', 'js2/env'],function($, Observable, Progressbar, env) {
	var Suggest = function(node, params) {
		this.node = node;
		this.params = params || {};

		this.initObservable();
		this.init();
	};

	Object.assign(Suggest.prototype, {
		init: function() {
			var self = this;

			var cache = {};
			var cacheSize = 0;
			var cacheMax = 100;

			var dfd;

			self.$balloon = $('.js-suggest2__items');
			if (self.$balloon.length === 0) return;

			self.category = self.params.category;
			self.currentData = {};
			self.balloonVisible = false;
			self.categoriesLoaded = false;
			self.keyUpDelay = self.params.keyUpDelay || 150;

			self.$node = $(self.node);
			self.$input = self.$node.find('.js-suggest2__input');
			self.input = self.$input[0];
			self.$form = self.$input.closest('form');
			self.$controls = self.$form.find('.controls');
			self.$overlay = $('.js-suggest2__overlay');
			self.$cagegory = $('.js-suggest2__category');
			self.$categories = $('.js-suggest2__categories');
			self.$progressbar = $('.js-suggest2__progressbar');
			self.header = document.querySelector('#header');
			self.$searchClose = self.$node.find('.js-search-close');
			self.searchValue = null;

			if (self.params.type) self.$balloon.addClass('suggest-search-' + self.params.type);

			self.state = {
				index: -1,
				text: self.input.value,
				items: []
			};

			$(document).off('.suggest');
			self.$form.off('.suggest');
			self.$balloon.off('.suggest');
			self.$controls.off('.suggest');
			self.progressbar = new Progressbar(self.$progressbar);

			self._search = function (value) {
				if (value.length <= 2) {
					self.update();
					return;
				}

				self.progressbar.loadStart();

				var dataToSend = self.getQuery(value);
				var dataToSendS = JSON.stringify(dataToSend);

				if(cache.hasOwnProperty(dataToSendS)) {
					self.update(cache[dataToSendS]);
					return;
				}

				if (dfd) {
					dfd.reject();
				}

				dfd = $.Deferred();
				dfd.done(function(data){
					self.update(data);
				});
				dfd.fail(function(){
					dfd.xhr.abort();
				});

				dfd.xhr = $.ajax({
					url: self.$form.attr('action'),
					type: 'post',
					data: dataToSend,
					dataType: 'json',
					success: function(data){
						if(!data || !data.success) return;
						if(cacheSize > cacheMax) {
							cache = {};
							cacheSize = 0;
						}
						cacheSize++;
						// категории, для которых есть иконки
						var categoryIcons = {
							fitness: 'fitness',
							yoga: 'fitness',
							holiday_house: 'turism',
							hotels: 'turism',
							restaurants: 'restaurants',
							autoservice: 'repair',
							utility_service: 'repair',
							repair: 'repair',
							entertainment: 'entertainment',
							quest: 'entertainment',
							cinema: 'entertainment',
							night_clubs: 'entertainment',
							sauna: 'entertainment',
							cultural_places: 'entertainment',
							optics: 'optics',
							trainings: 'trainings',
							education: 'trainings',
							kindergarten: 'trainings',
							kids: 'trainings',
							realty: 'realty',
							shops: 'shops',
							stores: 'shops',
							mall: 'shops',
							beauty: 'beauty',
							internet: 'internet',
							medical: 'medical',
							vet: 'vet',
							drugstore: 'drugstore',
						};

						function buildSearchItem (data) {
							return '' +
							'<li class="suggest-item js-suggest2__item" data-index="' + data.index + '" data-uitest="suggest-item">' +
								'<a class="link" href="' + esc(data.url) + '">' +
									'<span class="suggest-item-icon">' +
										'<svg><use xlink:href="/build/main/suggests.svg#' + data.icon + '"></use></svg>' +
									'</span>' +
									'<div class="suggest-item-text">' +
										'<span class="suggest-item-title">' + data.title + '</span>' +
										'<span class="suggest-item-subtitle z-text--13 z-text--gray">' + data.subtitle + '</span>' +
									'</div>' +
								'</a>' +
							'</li>'
						}

						function buildEmptySearch (text) {
							return '' +
							'<li class="suggest-item suggest-item-no_results z-text--20 z-text--gray">' +
								'<span class="suggest-item-title">' + esc(text) + '</span>' +
							'</li>'
						}

						var cacheData = { items: [] };
						var tpl = '';
						var html = $('<ul class="list-reset"/>');
						if (data.result.length) {
							$(data.result).each(function(index, item) {
								var escapedValue = esc(value).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
								var regexpValue = escapedValue.split('').map(function(_, i) {
									return escapedValue.slice(0, i ? i * -1 : undefined);
								}).filter(Boolean).join('|');
								var reQuery = new RegExp('^(' + regexpValue  + ')', 'gi');

								var icon = 'search';
								if (item.type === 'category') {
									icon = 'other';
									if (categoryIcons[item.seo_target.category]) {
										icon = categoryIcons[item.seo_target.category];
									}
								} else if (item.type === 'geo') {
									icon = 'points';
								}

								tpl += buildSearchItem({
									index: cacheData.items.length,
									url: item.url,
									icon: icon,
									subtitle: item.subtitle || '',
									title: esc(item.title).replace(reQuery, '<b>$&</b>')});
								cacheData.items.push(item);
							});
						} else {
							tpl += buildEmptySearch(i18n.t('suggest.no_results'));
						}
						html.append(tpl);

						cacheData.html = html;
						cacheData.itemTexts = $('<div />').html(html).find('.suggest-item-title').map(function(){
							return $(this).text();
						});

						cache[dataToSendS] = cacheData;

						self.searchValue = value;
						dfd.resolve(cache[dataToSendS]);
					},
					error: function() {
						//self.hideBalloon();
					}
				});
			};

			self.$form.on('submit.suggest', function(e){
				e.preventDefault();
			});

			self.$input.on('keydown.suggest', function(e){
				var key = parseInt(e.keyCode || e.which, 10);
				if (key != 13) {
					return;
				}
				e.preventDefault();

				if (self.$input[0].value !== self.searchValue) {
					self.$form[0].submit();
					return;
				}

				var currentIndex = Array.prototype.slice.call(self.state.items).indexOf(self.$input[0].value);
				if (currentIndex === -1) currentIndex = 0;
				self.itemSelect(currentIndex);
			});

			self.$input.on('blur.suggest keyup.suggest', function(e){
				if(!this.value.length) {
					self.$form.removeClass('active');
				} else {
					self.$form.addClass('active');
				}
			});

			self.$input.on('keyup.suggest', debounce(function(e){
				var key = parseInt(e.keyCode || e.which, 10);
				var value = this.value;

				if(key == 38 || key == 40 || key == 13) {
					return;
				}

				self._search(value);
			}, self.keyUpDelay));

			self.$input.on('keydown.suggest', function(e){
				var key = parseInt(e.keyCode || e.which, 10);

				if(key == 13) { // enter
					if(self.state.index < 0) {
						var item = self.getItem(0);
						if (item) {
							var re = new RegExp('(query\\[\\]\=)(.*?)(\&)');
							item.url = item.url.replace(re, "$1" + this.value + "$3");
							self.currentData.items[0] = item;
							self.itemSelect(0);
						}
					}
				} else if(key == 38) { //up
					e.preventDefault();
					self.selectItem(self.state.index-1, true);
				} else if(key == 40) { //down
					e.preventDefault();
					self.selectItem(self.state.index+1, true);
				}
			});

			self.$overlay.on('click', function(e){
				self.hideBalloon();
			});

			self.$cagegory.on('click', '.close', function(e) {
				e.preventDefault();
				self.setCategory(null);
				self.$input.focus().trigger('keyup');
			});

			self.$categories.on('click', '.button[data-category]', function(e) {
				var category = $(this).data('category');

				// Раскрыть все категории
				if(!category.length) {
					self.$categories.find('li').removeClass('hide');
					$(this).closest('li').addClass('hide');
					return;
				}

				// Если категория не поменялась, то и редиректить нет смысла
				if(category && self.params.category === category) e.preventDefault();

				// @TODO ajax change category
				self.setCategory(category, $(this).text());
			});

			self.$input.on('focus.suggest', function(e) {
				self.trigger('change.focus', true);
				self.$form.addClass('focus');
				self.$form.closest('.js-header-wrapper').addClass('focus');

				var dataToSend = self.getQuery(this.value);
				var dataToSendS = JSON.stringify(dataToSend);

				if(cache.hasOwnProperty(dataToSendS)) {
					self.update(cache[dataToSendS]);
				} else {
					self.update();
				}
			});

			self.$input.on('blur.suggest', function(e){
				self.trigger('change.focus', false);
			});

			self.$balloon.on('click.suggest', '.js-suggest2__item', function(e){
				var index = $('.js-suggest2__item', self.$balloon).index(this);
				self.selectItem(index, true);
				self.itemSelect(index);
			});

			self.$controls.on('click.suggest', '[type=reset]', function(e){
				e.preventDefault();
				self.$form.removeClass('active');
				self.$input.val('').focus();
				self.update();
				self.trigger('reset');
			});

			$(window).on('resize.suggest', self.updateBalloonPosition.bind(self));
			self.updateBalloonPosition();

			$('body').append(self.$balloon);
			if (window.location.hash) {
				var hash = window.location.hash.substring(1).split('&').reduce(function(params, param){
					var paramSplit = param.split('=').map(function(value){
						return decodeURIComponent(value.replace(/\+/g, ' '));
					});
					params[paramSplit[0]] = paramSplit[1];
					return params;
				}, {});
				if (hash.tail) {
					self.$input.val(hash.tail).trigger('keyup.suggest');
					self.$input.focus();
				}
			}

			self.$balloon[0].addEventListener('mouseenter', function (e) {
				if (!e.target.classList.contains('js-suggest2__item')) return;

				var index = parseInt(e.target.dataset.index);
				self.selectItem(index, false);
			}, true);

			self.$balloon[0].addEventListener('mouseleave', function () {
				var items = self.$balloon[0].querySelectorAll('.js-suggest2__item');
				items.forEach(function (item) {
					item.classList.remove('hover');
				})
			});

			self.$searchClose.on('click', function () {
				self.hideBalloon();
			});

			this.initAnalytics();
		},
		initAnalytics: function () {
			var self = this;

			// клик по поиску
			self.$input.on('click', function () {
				window.za({
					ev_category: 'search',
					ev_action: 'click',
					ev_label: 'input'
				})
			});

			// клик по категории
			self.$categories.on('click', 'a', function () {
				window.za({
					ev_category: 'search',
					ev_action: 'click',
					ev_label: 'category',
					ev_extra: { cat_name: $(this).data('category') }
				})
			})

			// клик по позиции в саджесте
			self.$balloon.on('click', '.js-suggest2__item', function () {
				window.za({
					ev_category: 'search',
					ev_action: 'click',
					ev_label: self.input.value,
					ev_extra: { pos: $(this).data('index') + 1 }
				})
			})
		},
		analyticsOnClose: function () {
			// аналитика на закрытие саджестов
			// если пользователь ничего не ввел в поиск и закрыл саджесты - игнорируем
			if (!this.input.value) return;

			window.za({
				ev_category: 'search',
				ev_action: 'no_click',
				ev_label: this.input.value
			})
		},
		loadCategories: function() {
			var self = this;

			if(self.categoriesLoaded) return;
			$.get('/js.php', {area: 'header', action: 'headerSearchCategories'}, function(response){
				if(!response) return;
				self.categoriesLoaded = true;
				self.$categories.html(response);
			});
		},
		updateBalloonPosition: function() {
			var self = this;

			// при исходном состоянии положением управляет css-класс, поэтому сбрасываем стайлы до дефолтных
			if (!env.is_phone && !$('body').hasClass('body_rollup_header') && self.params.type !== 'support') {
				var top = self.header ? self.header.offsetTop + self.header.clientHeight : '';
				self.$balloon.css({ top: top, left: '', width: '' });
				self.$balloon.addClass('suggest-search-fluid');
				return;
			}

			self.$balloon.removeClass('suggest-search-fluid');
			var offset = self.$form.offset();

			var css = {
				width: self.$form[0].getBoundingClientRect().width, // т.к. ширина может быть не целым числом
				left: offset.left
			};

			if(env.is_phone) {
				css.position = 'absolute';
				css.top = offset.top + self.$form.outerHeight();
			} else {
				css.position = 'fixed';
				css.top = offset.top - $(window).scrollTop() + self.$input.outerHeight(true);
			}

			self.$balloon.css(css);
		},
		setCategory: function(category, title) {
			var self = this;
			var active = !!category;

			self.$cagegory.toggleClass('hide', !active);
			self.$categories.toggleClass('hide', active);

			if(category && title) {
				self.$cagegory.find('.title').text(title ? title : category);
			}

			self.category = category;
		},
		getQuery: function(value) {
			var dataToSend = Object.assign({
				action: 'suggestionsService'
			});
			dataToSend['query[]'] = value;
			dataToSend.category = dataToSend.category || this.category;

			return dataToSend;
		},
		getIndex: function(_index){
			var self = this;
			if (_index === undefined) return self.state.index;
			// при переходе на index за пределы длины выдачи, переводим на нулевой элемент
			return (_index + $('.suggest-item', self.$balloon).length) % ($('.suggest-item', self.$balloon).length);
		},
		selectItem: function(_index, updateInput) {
			var self = this;

			self.state.index = self.getIndex(_index);
			$('.suggest-item', self.$balloon).removeClass('hover').eq(self.state.index).addClass('hover');

			if (!updateInput) return;

			if(self.state.index == self.state.items.length) {
				self.$input.val(self.state.text);
			} else {
				self.$input.val(self.state.items[self.state.index]);
			}
		},
		showBalloon: function() {
			var self = this;
			var empty = !self.state.items.length;

			if(!env.is_phone) self.loadCategories();
			self.$balloon.find('.suggest-search-empty').toggleClass('hide', !empty);
			self.$balloon.find('.suggest-search-results').toggleClass('hide', empty);
			self.$balloon.removeClass('hide');
			self.$overlay.removeClass('hide');
			self.updateBalloonPosition();

			$(document).off('click.suggestBalloon').on('click.suggestBalloon', function(e){
				var $target = $(e.target);

				if($target.closest(self.$form).length || $target.closest(self.$balloon).length || $target.closest('.js-suggest2__exclude').length) {
					return;
				}

				self.hideBalloon();
			});

			self.balloonVisible = true;
			self.trigger('balloon', self.balloonVisible);
			$(window).trigger('overlap');
		},
		hideBalloon: function(){
			var self = this;
			self.$overlay.addClass('hide');
			self.$balloon.addClass('hide');
			self.$form.removeClass('focus');
			self.$form.closest('.js-header-wrapper').removeClass('focus');

			if(self.params.category && !self.category) {
				self.setCategory(self.params.category);
			}

			$(document).off('click.suggestBalloon');

			self.balloonVisible = false;
			self.trigger('balloon', self.balloonVisible);
			$(window).trigger('overlap');

			self.analyticsOnClose();
		},
		update: function(data) {
			var self = this;
			var value = self.input.value;

			self.currentData = data || {};

			self.state = {
				text: value,
				index: -1,
				items: self.currentData.itemTexts || []
			};

			self.$controls.find('[type=reset]').toggleClass('hide', !value.length);

			self.$balloon.find('.suggest-search-results').empty().append(self.currentData.html || '');
			self.showBalloon();
			if (self.progressbar.isLoading()) self.progressbar.loadFinish();

			self.selectItem(0, false);
			self.trigger('update', self.currentData.items);
		},
		itemSelect: function(_index) {
			var self = this;
			var item = self.getItem(_index);
			if (!item) return;

			window.location.href = item.url;
			self.trigger('select', item);
		},
		getItem: function(_index) {
			var self = this;
			if (!self.currentData.items) {
				return;
			}
			var index = self.getIndex(_index);
			return self.currentData.items[index];
		}
	}, Observable.prototype);

	return Suggest;
});
