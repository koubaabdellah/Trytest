var verd = {};

jQuery(document).ready(function() {
	verd.initTooltip();
	verd.initSortSwitch();
});

verd.initTooltip = function() {
	jQuery("div.verd div.verd-ball").mouseover(function() {
		var position = jQuery(this).position();
		var id = jQuery(this).parents().eq(3).attr("id");
		var item = jQuery(this).data("item");
		var indicator = jQuery(this).data("indicator");
		var color = jQuery(this).data("color");
		if ( color !== "transparent" ) {
			verd.showTooltip(id, position, item, indicator, color);
		}
	});
	jQuery("div.verd div.verd-ball").mouseout(function() {
		verd.hideTooltip();
	});
}

verd.showTooltip = function(id, ballpos, item, indicator, color) {
	// console.log(id, ballpos, item, indicator, color);
	var tooltipText = "<span class='verd-tooltip-header'>" + item + "</span><br/><span class='verd-tooltip-icon verd-" + color + "'>\u25CF</span> " + indicator;
	var tooltipId = id + "-tooltip";
	var ballWidth = jQuery("div.verd div.verd-ball").width();
	var containerWidth = jQuery("div.verd div.verd-balls").width();
	jQuery("div.verd div.verd-tooltip#" + tooltipId).html(tooltipText);
	jQuery("div.verd div.verd-tooltip#" + tooltipId).show();
	var tooltipWidth = jQuery("div.verd div.verd-tooltip#" + tooltipId).width();
	var tooltipLeft = ( ballpos.left + ballWidth / 2 > containerWidth / 2 ) ? ballpos.left - tooltipWidth + ballWidth / 2 : ballpos.left;
	jQuery("div.verd div.verd-tooltip#" + tooltipId).css({left: tooltipLeft});
};

verd.hideTooltip = function() {
	jQuery("div.verd div.verd-tooltip").hide();
}

verd.initSortSwitch = function() {
	jQuery("div.verd div.verd-sort div").on("keypress click", function() {
		// sort the balls
		var sortby = jQuery(this).data("sortby");
		var parentid = jQuery(this).data("parentid");
		jQuery("div#" + parentid + " div.verd-balls > div").each(function(){
			var tooltip = jQuery(this).children("div.verd-tooltip")[0];
			var balls = jQuery(this).children("div.verd-ball");
			balls.sort(function(a, b) {
				return jQuery(a).data(sortby + "-sort") - jQuery(b).data(sortby + "-sort");
			});
			jQuery(this).html(tooltip).append(balls);
		});

		// re-initialize the tooltip
		verd.initTooltip();

		// change the switch appearance and metadata
		switch ( sortby ) {
			case "color":
				jQuery("div#" + parentid + " div.verd-sort-label-color").addClass("verd-sort-label-active");
				jQuery("div#" + parentid + " div.verd-sort-label-indicator").removeClass("verd-sort-label-active");
				jQuery("div#" + parentid + " div.verd-sort-switch").data("sortby", "indicator").attr("aria-label", "Sorteer op indicator");
				jQuery("div#" + parentid + " div.verd-sort-switch > svg").css("transform", "scaleY(1)");
				break;
			case "indicator":
				jQuery("div#" + parentid + " div.verd-sort-label-color").removeClass("verd-sort-label-active");
				jQuery("div#" + parentid + " div.verd-sort-label-indicator").addClass("verd-sort-label-active");
				jQuery("div#" + parentid + " div.verd-sort-switch").data("sortby", "color").attr("aria-label", "Sorteer op kleur");
				jQuery("div#" + parentid + " div.verd-sort-switch > svg").css("transform", "scaleY(-1)");
				break;
		}
	});
}