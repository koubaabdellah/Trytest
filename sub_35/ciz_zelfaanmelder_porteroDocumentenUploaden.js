var process = process || {env: {NODE_ENV: "development"}};
$(function () {
    setUpMenuLinks();
});

function setUpMenuLinks() {
    $('#next.navigationbutton').hide();
    $('#downloadporterodocumenten').click(function (e) {
        e.preventDefault();
        setTabpaneActive('#'+$(this).attr('id')+'_content',true)
    });

    $('#uploadporterodocumenten').click(function (e) {
        e.preventDefault();
        setTabpaneActive('#'+$(this).attr('id')+'_content',false)
    });

    $('#next.navigationbutton').click(function (e) {
        e.preventDefault();
        setTabpaneActive('#uploadporterodocumenten_content',false)
    });

    $('#previous.navigationbutton').click(function (e) {
        e.preventDefault();
        setTabpaneActive('#downloadporterodocumenten_content',true)
    });
}

function setTabpaneActive(tabpane,nextvisible) {
    $('.tab-pane').removeClass('active');
    $(tabpane).addClass('active');
    logPiwikAnalyticsData(tabpane);
    if(nextvisible) {
        $('#previous.navigationbutton').hide();
        $('#next.navigationbutton').show()
    } else {
        $('#previous.navigationbutton').show();
        $('#next.navigationbutton').hide()
    }
}
