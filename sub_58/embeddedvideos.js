/*
| ----------------------------------------------------
| Embedded video helpers
| ----------------------------------------------------
*/
var embeddedVideos = {
    makeResponsive : function () {
        $('iframe').each(function () {
            var url = $(this).attr('src');
            var pattYT = /https:\/\/www.youtube.com/g;
            var pattVM = /https:\/\/player.vimeo.com/g;
            var height = $(this).attr('height');
            var width = $(this).attr('width');
            var ratio = height / width;
            var paddingTop = (ratio * 100).toFixed(2) + '%';

            if (pattYT.test(url) || pattVM.test(url)) {
                $(this).wrap("<div class='IframeWrapper' style='padding-top:" + paddingTop + "' ></div>")
                    .css('width', '100%').css('height', '100%');
            }
        });
    }
}
