define(['js2/Observable', 'js2/env'], function(Observable, env){
	const Suggest = function (node, params = {}) {
		this.node = node;
		this.params = params;

		this.initObservable();
		this.init();
		this.initBalloon();
		this.initAnalytics();
	};

	Object.assign(Suggest.prototype, {
		init: function () {
			this.input = this.node.querySelector('.js-suggest2__input');
			this.header = document.getElementById('header');
			this.form = this.input.closest('form');
			this.closeBtn = this.node.querySelector('.js-search-close');
		},

		initAnalytics: function () {

			this.input.addEventListener('focus', () => {
				window.za({
					ev_category: 'search',
					ev_action: 'click',
					ev_label: 'input',
				});
			});

			this.form.addEventListener('submit', () => {
				window.za({
					ev_category: 'search',
					ev_action: 'no_click',
					ev_label: this.input.value,
				});
			});
		},

		initBalloon: function () {
			this.balloon = document.querySelector('.js-suggest2__items');
			if (!this.balloon) return;

			this.categories = this.balloon.querySelector('.js-suggest2__categories');
			this.categoriesTitle = this.balloon.querySelector('.js-suggest2__categories-title');
			this.overlay = this.header.querySelector('.js-suggest2__overlay');

			this.input.addEventListener('focus', () => {
				this.showBalloon();
			});

			if (env.is_phone) {
				document.body.appendChild(this.balloon);
			}

			this.overlay && this.overlay.addEventListener('click', () => this.hideBalloon());
			this.closeBtn && this.closeBtn.addEventListener('click', () => this.hideBalloon());
		},

		showBalloon: function () {
			this.loadCategories();

			this.balloon.classList.remove('hidden');
			this.form.classList.add('focus');
			this.toggleOverlay(true);
			this.trigger('balloon', true);
		},

		hideBalloon: function () {
			this.balloon.classList.add('hidden');
			this.form.classList.remove('focus');
			this.toggleOverlay(false);
			this.trigger('balloon', false);
		},

		toggleOverlay: function (visible) {
			if (!this.overlay) return;

			this.overlay.classList.toggle('hide', !visible);
		},

		loadCategories: function() {
			const self = this;
			if (self.categoriesLoaded) return;

			const requestData = { area: 'header', action: 'headerSearchCategories' };
			zrequest.get('/js.php', requestData, { format: 'html' }).then(function (response) {
				if(!response) return;

				self.categoriesLoaded = true;
				self.categories.innerHTML = response;
				if (self.categoriesTitle) self.categoriesTitle.classList.remove('hidden');
			});
		},

		updateBalloonPosition: function () {},

	}, Observable.prototype);

	return Suggest;
});
