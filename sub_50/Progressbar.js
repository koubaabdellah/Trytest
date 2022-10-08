define(['jquery'], function($) {
	function Loader($element) {
		var self = this;

		self.loader = $($element);

		var animating = false;

		var start = function(){
			if (animating) return;
			animating = true;
			self.loader.removeClass('full-load');
			setTimeout(function(){
				self.loader.addClass('half-load');
			}, 25);
		};

		var finish = function(){
			self.loader.addClass('full-load');
			self.loader.removeClass('half-load');
			hide();
		};

		var hide = function(){
			animating = false;
		};

		self.loadStart = function(){
			if (!self.loader.length) return;
			start();
		};

		self.loadFinish = function(){
			if (!self.loader.length) return;
			finish();
		};

		self.isLoading = function(){
			return animating;
		};
	}

	return Loader;
});
