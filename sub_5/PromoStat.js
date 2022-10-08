define('js2/PromoStat', function () {
	function PromoStat (node, params) {

		node.addEventListener('click', function () {
			window.za({
				ev_category: 'ads_premium_placement',
				ev_label: params.label,
				ev_action: 'click'
			});
		});

		new IntersectionObserver(function (entries, observer) {
			if (entries[0].isIntersecting) {
				window.za({
					ev_category: 'ads_premium_placement',
					ev_label: params.label,
					ev_action: 'display'
				});
				observer.unobserve(entries[0].target);
			}
		}).observe(node);
	}

	return PromoStat;
});
