require(['jquery', 'qti-data'], function($, qtiData) {

    var timesPlayed = 0, maxPlays, xmlNode, mediaInteraction;

    $(document).on('qti.render', function() {
        xmlNode = $.parseXML(qtiData.xml);
        mediaInteraction = $(xmlNode).find('mediaInteraction')[0];
        maxPlays =  mediaInteraction === undefined ? null : mediaInteraction.getAttribute('maxPlays');
        if (maxPlays != null && maxPlays > 0) {
            $('audio').on('ended', function () {
                timesPlayed++;
                if (timesPlayed >= maxPlays) {
                    $('.plyr__control').addClass('disabled');
                }
            })
        }
    })
});