$(function() {

    var ga_title = "index";

    function doNLS() {
        nls.load(function() {
            $('#homepage-learnmore-2').text(jQuery.i18n.prop('common.banner.learnMore'));
            $('#homepage-description').text(jQuery.i18n.prop('common.banner.header1'));
            $('#homepage-button').text(jQuery.i18n.prop('common.header.download'));

            $('#intro_view .subtitle').text(jQuery.i18n.prop('home.inBeta'));
            $('#how_it_works .create-new').text(jQuery.i18n.prop('home.createYourApp') + ' →');

            $('#app_features .title').text(jQuery.i18n.prop('home.buildInASnap'));
            $('#app_features .subtitle').html(
                jQuery.i18n.prop('home.buildInASnapDesc1') +
                ' <a href="http://www.arcgis.com/features/" target="_blank">' +
                jQuery.i18n.prop('home.buildInASnapDesc2') +
                '</a> ' +
                jQuery.i18n.prop('home.buildInASnapDesc3')
            );
            $('#app_features .feature1 .topic').text(jQuery.i18n.prop('home.feature1'));
            $('#app_features .feature1 .description').text(jQuery.i18n.prop('home.feature1Desc'));
            $('#app_features .feature2 .topic').text(jQuery.i18n.prop('home.feature4'));
            $('#app_features .feature2 .description').text(jQuery.i18n.prop('home.feature4Desc'));
            $('#app_features .feature3 .topic').text(jQuery.i18n.prop('home.feature2'));
            $('#app_features .feature3 .description').text(jQuery.i18n.prop('home.feature2Desc'));
            $('#app_features .feature4 .topic').text(jQuery.i18n.prop('home.feature5'));
            $('#app_features .feature4 .description').text(jQuery.i18n.prop('home.feature5Desc'));
            $('#app_features .feature5 .topic').text(jQuery.i18n.prop('home.feature3'));
            $('#app_features .feature5 .description').text(jQuery.i18n.prop('home.feature3Desc'));
            $('#app_features .feature6 .topic').text(jQuery.i18n.prop('home.feature6'));
            $('#app_features .feature6 .description').text(jQuery.i18n.prop('home.feature6Desc'));

            $('#how_it_works .title').text(jQuery.i18n.prop('home.howItWorks'));
            $('#how_it_works .step1 .desc').text(jQuery.i18n.prop('home.howItWorksStep1'));
            $('#how_it_works .step2 .desc').text(jQuery.i18n.prop('home.howItWorksStep2'));
            $('#how_it_works .step3 .desc').text(jQuery.i18n.prop('home.howItWorksStep3'));
            $('#how_it_works .step4 .desc').text(jQuery.i18n.prop('home.howItWorksStep4'));
            $('#how_it_works .step5 .desc').text(jQuery.i18n.prop('home.howItWorksStep5'));

            $('#check_out .al36.title').text(jQuery.i18n.prop('home.whosUsingIt'));
            $('#check_out a').each(function(idx, item) {
                $(item).text(jQuery.i18n.prop('home.learnMore'));
            });

            $('#check_out0 .topic').text(jQuery.i18n.prop('home.whosUsingItUser0'));
            $('#check_out0 .desc:first').text(jQuery.i18n.prop('home.whosUsingItUser0Desc'));
            $('#check_out1 .topic').text(jQuery.i18n.prop('home.whosUsingItUser1'));
            $('#check_out1 .desc:first').text(jQuery.i18n.prop('home.whosUsingItUser1Desc'));
            $('#check_out2 .topic').text(jQuery.i18n.prop('home.whosUsingItUser2'));
            $('#check_out2 .desc:first').text(jQuery.i18n.prop('home.whosUsingItUser2Desc'));
            $('#check_out3 .topic').text(jQuery.i18n.prop('home.whosUsingItUser3'));
            $('#check_out3 .desc:first').text(jQuery.i18n.prop('home.whosUsingItUser3Desc'));

            $('#see_others_built .title').text(jQuery.i18n.prop('home.seeOthersBuilt'));
            $('#see_others_built .app .link').each(function(idx, item) {
                $(item).text(jQuery.i18n.prop('home.createAppLikeThis'));
            });
            $('#see_others_built .app1 .topic').text(jQuery.i18n.prop('home.seeOthersBuiltApp1'));
            $('#see_others_built .app1 .desc').text(jQuery.i18n.prop('home.seeOthersBuiltApp1Desc'));
            $('#see_others_built .app2 .topic').text(jQuery.i18n.prop('home.seeOthersBuiltApp2'));
            $('#see_others_built .app2 .desc').text(jQuery.i18n.prop('home.seeOthersBuiltApp2Desc'));
            $('#see_others_built .app3 .topic').text(jQuery.i18n.prop('home.seeOthersBuiltApp3'));
            $('#see_others_built .app3 .desc').text(jQuery.i18n.prop('home.seeOthersBuiltApp3Desc'));
            $('#see_others_built .app4 .topic').text(jQuery.i18n.prop('home.seeOthersBuiltApp4'));
            $('#see_others_built .app4 .desc').html(
                '<strong style="font-style: italic;">' + jQuery.i18n.prop('home.seeOthersBuiltApp4Desc1') + '</strong><br>' +
                jQuery.i18n.prop('home.seeOthersBuiltApp4Desc2')
            );
            $('#see_others_built .app4 .index-create-like-this').text(
                jQuery.i18n.prop('home.learnMore')
            );

            $('#do_more .doMore .title').text(jQuery.i18n.prop('home.doMore'));
            $('#do_more .doMore .subtitle').text(jQuery.i18n.prop('home.doMoreDesc'));
            $('#do_more .doMore td.basic').text(jQuery.i18n.prop('home.doMoreBasic'));
            $('#do_more .doMore td.standard').text(jQuery.i18n.prop('home.doMorestandard'));
            $('#do_more .doMore td.doMoreFeature1').text(jQuery.i18n.prop('home.doMoreFeature1'));
            $('#do_more .doMore td.doMoreFeature2').text(jQuery.i18n.prop('home.doMoreFeature2'));
            $('#do_more .doMore td.doMoreFeature3').text(jQuery.i18n.prop('home.doMoreFeature3'));
            $('#do_more .doMore td.doMoreFeature4').text(jQuery.i18n.prop('home.doMoreFeature4'));
            $('#do_more .doMore td.doMoreFeature5').text(jQuery.i18n.prop('home.doMoreFeature5'));
            $('#do_more .doMore td.doMoreFeature6').text(jQuery.i18n.prop('home.doMoreFeature6'));
            $('#do_more .doMore td.doMoreFeature7').text(jQuery.i18n.prop('home.doMoreFeature7'));
            $('#do_more .customizeEnterpriseApp .title').text(jQuery.i18n.prop('home.customApps'));
            $('#do_more .customizeEnterpriseApp .step1 .desc').text(jQuery.i18n.prop('home.customAppsDesc1'));
            $('#do_more .customizeEnterpriseApp .step2 .desc').text(jQuery.i18n.prop('home.customAppsDesc2'));
            $('#do_more .customizeEnterpriseApp .step3 .desc').text(jQuery.i18n.prop('home.customAppsDesc3'));
            $('#do_more .customizeEnterpriseApp .step4 .desc').text(jQuery.i18n.prop('home.customAppsDesc4'));

            $('#learn_how .learn').html(
                '<a href="http://doc.arcgis.com/en/appstudio/" target="_blank">' +
                jQuery.i18n.prop('home.learn1') +
                '</a> ' +
                jQuery.i18n.prop('home.learn2')
            );

            $('#get_started .getStartedTitle').text(jQuery.i18n.prop('home.getStarted'));
            $('#get_started .getStartedSubtitle').html(
                jQuery.i18n.prop('home.getStartedDesc1') +
                ' <a class="index-try-arcgis-now" href="http://www.arcgis.com/features/free-trial.html?origin=appstudioforarcgis" target="_blank">' +
                jQuery.i18n.prop('home.getStartedDesc2') +
                '</a>'
            );
            $('#get_started .upgradeTitle').text(jQuery.i18n.prop('home.upgradeToStandard'));
            $('#get_started .upgradeSubtitle').html(jQuery.i18n.prop('home.upgradeToStandardDesc1'));

            var price_subtitle = '';
            $.ajax({
                url: '//www.arcgis.com/sharing/rest/portals/self?f=json',
                dataType: 'jsonp',
                cache: false,
                jsonp: 'callback'
            }).done(function(data) {
                if (data.ipCntryCode === 'US') {
                    price_subtitle = jQuery.i18n.prop('home.upgradeToStandardDesc2US') + '<br>' + jQuery.i18n.prop('home.upgradeToStandardDesc3US') +
                        ' <a class="index-try-arcgis-now" href="http://www.esri.com/landing-pages/website-call-request" target="_blank">' +
                        jQuery.i18n.prop('home.upgradeToStandardDesc4US') + '</a>';
                } else {
                    price_subtitle = jQuery.i18n.prop('home.upgradeToStandardDesc2') +
                        ' <a class="index-try-arcgis-now" href="http://www.esri.com/about-esri/offices?utm_source=esri&utm_medium=email&utm_term=117302&utm_content=article&utm_campaign=AppStudio_2015" target="_blank">' +
                        jQuery.i18n.prop('home.upgradeToStandardDesc3') + '</a>';
                }
                $('#get_started .priceSubtitle').html(price_subtitle);
            }).fail(function(err) {
                console.error(err);
            });

            $('#get_started .create-new').text(jQuery.i18n.prop('home.createYourApp') + ' →');

            $('#modalOverlay').click(function() {
                _modal.hideModal();
            })

            $('#create_new_btn').click(function() {
                ////sendEvent(ga_title, "create your app(top)");
            });
            $('#create_app').click(function() {
                ////sendEvent(ga_title, "create your app(down)");
            });
            $('#create_like_this_maptour1').click(function() {
                ////sendEvent(ga_title, "create apps like this(1)");
            });
            $('#create_like_this_maptour2').click(function() {
                ////sendEvent(ga_title, "create apps like this(2)");
            });
            $('#create_like_this_maptour3').click(function() {
                ////sendEvent(ga_title, "create apps like this(3)");
            });
            $('#create_like_this_maptour4').click(function() {
                ////sendEvent(ga_title, "learn more");
            });
            $('#play_video').click(function() {
                ////sendEvent(ga_title, "play video");
            });

            function isFullUrl(url) {
                return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi.test(url)
            }

            var urlParams = util.queryUrlParameters();
            if (urlParams && urlParams.signin && !user.isLoggedin()) {
                var returnUrl = "";
                if (urlParams.returnUrl) {
                    returnUrl = decodeURIComponent(urlParams.returnUrl);
                }
                auth.signin(function() {
                    navbar.signin(function() {
                        if (returnUrl && !isFullUrl(returnUrl)) {
                            window.location = returnUrl;
                        }
                    });
                });
            } else if (urlParams && urlParams.returnUrl) {
                var returnUrl = decodeURIComponent(urlParams.returnUrl);
                if (returnUrl && !isFullUrl(returnUrl)) {
                    window.location = returnUrl;
                }
            } else if (urlParams && urlParams.error) {
                if (urlParams.error === "no_org") {
                    auth.noOrgAccount();
                }
            }
        }, "market");
    }

    $("#play_video").click(function() {
        showModalVideo('//video.esri.com/iframe/4635/1/width/960/00:00:00');
    });
    $("#check_out0 .desc:last").click(function() {
        showModalVideo('//video.esri.com/iframe/5088/000000/width/960/0/00:00:00');
    });
    $("#check_out1 .desc:last").click(function() {
        showModalVideo('//video.esri.com/iframe/4755/000000/width/960/0/00:00:00');
    });
    $("#check_out2 .desc:last").click(function() {
        showModalVideo('//video.esri.com/iframe/4381/000000/width/960/0/00:00:00');
    });
    $("#check_out3 .desc:last").click(function() {
        showModalVideo('//video.esri.com/iframe/4758/000000/width/960/0/00:00:00');
    });

    $('.modal-overlay-close').click(function() {
        $('.modal-video iframe').attr({ src: '' });
        _modal.hideModal();
    });

    function createApp(maptour) {
        if (user.isLoggedin()) {
            app.create(maptour);
        } else {
            auth.signin(function() {
                navbar.signin(function() {
                    app.create(maptour);
                });
            });
        }
    }

    function showModalVideo(url) {
        $('.modal-video iframe').attr({ src: url });
        _modal.showModal('modal_video');
    }

    navbar.init();
    user.checkValidity(true);
    doNLS();

});
