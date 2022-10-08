(function ($) {
	$(document).ready(function(){
		var menus = $('.nav .block-menu > .content > ul.menu > li.first.last > .menu > li.expanded > .menu');
		$.each(menus,function(){
			var classes = 'submenu';
			var mychildren = $(this).children('.expanded');
			if(mychildren.length > 0){
				classes += ' main-submenu';
			}
			$(this).addClass(classes).removeClass('menu');
		});

		$('.nav .block-menu > .content > ul.menu > li.first.last > .menu > li.expanded > a').each(function(){
			$(this).attr('href', '#');
		});

		//Hide the kalender item if not mobile!
		$('.nav ul.menu li > a.kalender-link').parent().addClass('kalender-link');

		//Only mobile
		var themenu = $('.mobile .nav .block-menu > .content > ul.menu > li.first.last > a');

		if(themenu.length > 0){
				themenu.toggle(function(){
					themenu.parent().children('.menu').show();
				}, function(){
					themenu.parent().children('.menu').hide();
				});
		}

		// Calendar views: height is not right - solve this!
		var monthview = $('.main-content .view-kalender .month-view');

		if(monthview.length > 0){
			var multiday_divs = monthview.find('td.multi-day .monthview');
			multiday_divs.each(function(){
				$(this).height($(this).children('.contents').height()+10);
			});
		}

		if ( $('.view-diensten-overzicht .views-row').length > 0 ) {
			var diensten_rows = $('.view-diensten-overzicht .views-row');
			var max_height = 0;
			diensten_rows.each(function() {
				var myheight = $(this).outerHeight(true);
				if (max_height < myheight) {
					max_height = myheight;
				}
			});

			console.log(max_height);
			diensten_rows.each(function() {
				if ($(this).outerHeight(true) < max_height) {
					var heightEl = $(this).find('.views-field-description');
					if (heightEl.length < 1) {
						heightEl = $(this).find('.views-field-body');
					}
					heightEl.height(max_height + heightEl.outerHeight(true) - $(this).outerHeight(true));
				}
			});
		}
	});

	$(window).load(function(){
		if($('.banner-wrapper .banner-list').length > 0){
			$('.banner-wrapper .banner-list').carouFredSel({
				responsive: true,
				height: "variable",
				scroll: {
					items: 1,
					duration: 1000,
					fx: "fade",
				},
				auto: {
					// play: false,
					timeoutDuration: 5000
				},
				onCreate: function(data){
					$('.banner-wrapper').css('opacity', '1');
				}
			});
		}
	});
})(jQuery);
