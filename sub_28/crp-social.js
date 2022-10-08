
function crpOpenTwitterDialog(datasource){
	var url = "https://twitter.com/intent/tweet?url=" + encodeURI(datasource.url) + "&text=" + encodeURI(datasource.caption);
    var w = window.open(url, "ftgw", "location=1,status=1,scrollbars=1,width=600,height=400");
    w.moveTo((screen.width / 2) - (300), (screen.height / 2) - (200));
}

function crpOpenFBDialog(datasource){
	var url = "https://www.facebook.com/dialog/feed?app_id=145634995501895&link=" + encodeURI(datasource.url) + "&caption=" + encodeURI(datasource.caption);

	//Outdated version
    /*
    var url = "http://www.facebook.com/sharer.php?u=" + encodeURI(datasource.url) + "&t=" + encodeURI(datasource.caption);
    if (datasource.image) {
    	url += ("&p[images][0]=" + crpQualifiedURL(datasource.image));
    };
    */

    var w = window.open(url, "ftgw", "location=1,status=1,scrollbars=1,width=600,height=400");
    w.moveTo((screen.width / 2) - (300), (screen.height / 2) - (200));
}

function crpOpenGPlusDialog(datasource){
	var url = "https://plus.google.com/share?url=" + encodeURI(datasource.url);

    var w = window.open(url, "ftgw", "location=1,status=1,scrollbars=1,width=600,height=400");
    w.moveTo((screen.width / 2) - (300), (screen.height / 2) - (200));
}

function crpOpenPinterestDialog(datasource){
    var url = "http://pinterest.com/pin/create/button/?url=" + encodeURI(datasource.url) + "&description=" + encodeURI(datasource.caption);
    if (datasource.image) {
        url += ("&media=" + crpQualifiedURL(datasource.image));
    }

    var w = window.open(url, "ftgw", "location=1,status=1,scrollbars=1,width=600,height=400");
    w.moveTo((screen.width / 2) - (300), (screen.height / 2) - (200));
}

function crpQualifiedURL(url) {
    var img = document.createElement('img');
    img.src = url; // set string url
    url = img.src; // get qualified url
    img.src = null; // no server request
    return url;
}

//Perform some actions when window is ready
jQuery(window).load(function () {
    jQuery( '.ic-share i' ).on( 'click', function( evt ) {
	    evt.preventDefault();

	    var target = jQuery(this).parent();
		var datasource = jQuery(target.attr("data-datasource"));

		var caption =  jQuery.trim(datasource.attr("data-caption") || document.title);
		var message = jQuery.trim(datasource.attr("data-message"));
		var url = jQuery.trim( datasource.attr("data-url") || location.href.split('#')[0]);
		var image = jQuery.trim( datasource.attr("data-image"));

		var datasource = {
			caption: caption,
			message: message,
			url: url,
			image: image,
		};

		if(target.hasClass("ic-twitter")){
			crpOpenTwitterDialog(datasource);
		}else if(target.hasClass("ic-facebook")){
			crpOpenFBDialog(datasource);
		}else if(target.hasClass("ic-plus")){
			crpOpenGPlusDialog(datasource);
		}else if(target.hasClass("ic-pinterest")){
			crpOpenPinterestDialog(datasource);
		}
	});
});
