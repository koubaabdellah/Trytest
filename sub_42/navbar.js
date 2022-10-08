var navbar = (function() {

    'use strict';

    var ga_title = "header";

    var $appListLink = $('#nav-app-list'),
        $userOperations = $('#nav-user-operations'),
        $firstname = $('#nav-firstname'),
        $userImage = $('#nav-user-image'),
        $profile = $('#nav-profile'),
        $profileUsername = $('#profile-username'),
        $signout = $('#nav-sign-out-link'),
        $signin = $('#nav-sign-in');

    var $navHelpLink = $('#nav-app-help');

    var signInListener,
        signOutListener,
        isLoggedin = false;

    function signin(callback) {
        isLoggedin = true;
        doNLS();
        $appListLink.show();
        // $appListLink.click(function() {
        //     window.location = 'apps.html';
        // });

        $('#nav-app-list a').attr('href', 'apps.html');
        // $('#nav-app-list a').attr('target', '_blank');

        $userOperations.show();
        $userOperations.siblings().hide();
        $firstname.text(user.getFirstname());
        $userImage.attr('src', user.getThumbnail());
        // $profile.click(function() {
        //     // window.location = user.getOrgUrl() + '/home/user.html';
        //     window.open(user.getOrgUrl() + '/home/user.html', '_blank');
        // });

        $('#nav-profile a').attr('href', user.getOrgUrl() + '/home/user.html');
        $('#nav-profile a').attr('target', '_blank');

        $('#nav-profile').click(function() {
            ////sendEvent(ga_title, "user profile");
        });

        $profileUsername.text(user.getUsername());
        $signout.click(function() {
            var base = user.getCustomBaseUrl();
            var key = user.getUrlKey();
            ////sendEvent(ga_title, "sign out");
            signout();
            user.logout();
            auth.signout(key, base);
            //window.location = 'index.html';
        });
        $signin.removeAttr("onclick");
        //refreshCookie();

        if (signInListener) {
            signInListener();
        }
        if (callback) {
            callback();
        }

        // $navHelpLink.hide();
    }

    function signout(callback) {
        isLoggedin = false;
        doNLS();
        $appListLink.hide();
        // $appListLink.removeAttr("onclick");
        $userOperations.hide();
        $userOperations.siblings().show();
        $firstname.text('');
        $userImage.attr('src', './images/no-user-thumb.jpg');
        // $profile.removeAttr("onclick");
        $signout.removeAttr("onclick");
        $('#nav-sign-in a').text(jQuery.i18n.prop('common.signin.signIn'));

        $signin.click(function() {
            auth.signin(function() {
                signin();
            });
        });

        if (signOutListener) {
            signOutListener();
        }
        if (callback) {
            callback();
        }

        // $navHelpLink.show();
    }

    function refreshCookie() {
        var json = null;
        var client_config = Cookies.get('client_config');
        var esri_auth = Cookies.get('esri_auth');
        if (client_config) {
            json = JSON.parse(client_config);
        }
        if (esri_auth && json && json.mainDomain) {
            Cookies.set("esri_auth", esri_auth, {
                domain: json.mainDomain,
                path: '/',
                secure: (window.location.protocol.indexOf("https") === 0) ? true : false
            });
        }
    }

    function doNLS() {
        nls.load(function() {
            var productDescNodes = $('nav .dropdown-menu.links li span');
            var productDescNodeLinks = $('nav .dropdown-menu.links li a');
            productDescNodes[0].innerText = jQuery.i18n.prop('common.header.agolDesc');
            productDescNodeLinks[0].href = 'http://www.arcgis.com/';
            productDescNodes[1].innerText = jQuery.i18n.prop('common.header.desktopDesc');
            productDescNodeLinks[1].href = 'http://desktop.arcgis.com/';
            productDescNodes[2].innerText = jQuery.i18n.prop('common.header.serverDesc');
            productDescNodeLinks[2].href = 'http://server.arcgis.com/';
            productDescNodes[3].innerText = jQuery.i18n.prop('common.header.devDesc');
            productDescNodeLinks[3].href = 'http://developers.arcgis.com/';
            productDescNodes[4].innerText = jQuery.i18n.prop('common.header.solutionDesc');
            productDescNodeLinks[4].href = 'http://solutions.arcgis.com/';
            productDescNodes[5].innerText = jQuery.i18n.prop('common.header.marketDesc');
            productDescNodeLinks[5].href = 'http://marketplace.arcgis.com/';
            $('#nav-gallery-link a').text(jQuery.i18n.prop('common.header.galleryStr'));
            $('#nav-app-list a').text(jQuery.i18n.prop('common.header.myappsStr'));
            $('#nav-app-community a').text(jQuery.i18n.prop('common.menu.overview'));
            //$('#nav-app-blog a').text(jQuery.i18n.prop('common.header.blog'));
            //$('#nav-app-samples a').text(jQuery.i18n.prop('common.header.samples'));
            $('#nav-app-download a').text(jQuery.i18n.prop('common.header.download'));
            $('#nav-app-help a').text(jQuery.i18n.prop('common.header.support'));
            $('#nav-app-showcase a').text(jQuery.i18n.prop('common.header.showcase'));

            $('#nav-my-profile').text(jQuery.i18n.prop('common.signin.myprofileStr'));
            $('#nav-help-link a').text(jQuery.i18n.prop('common.header.helpStr'));
            $('#nav-sign-out-link a').text(jQuery.i18n.prop('common.signin.signOut'));
            // $('#nav-sign-in a').text(jQuery.i18n.prop('common.signin.signIn'));
            $('#nav-help-link2 a').text(jQuery.i18n.prop('common.header.helpStr'));
            // $('#nav-app-community a').text(jQuery.i18n.prop('common.header.support'));


        });
    }

    function init(signinListener, signoutListener) {

        function getClientConfig(callback) {
            $.get('/appstudio/rest/serverrest/getConfig' + '?' + $.param({
                username: user.getUsername(),
                token: user.getToken()
            })).done(function(data) {
                if (data.portalUrl.lastIndexOf("/") === (data.portalUrl.length - 1)) {
                    data.portalUrl = data.portalUrl.substring(0, data.portalUrl.length - 1);
                }
                if (data.buildServiceUrl.lastIndexOf("/") === (data.buildServiceUrl.length - 1)) {
                    data.buildServiceUrl = data.portalUrl.substring(0, data.buildServiceUrl.length - 1);
                }
                if (data.analyticsUrl.lastIndexOf("/") === (data.analyticsUrl.length - 1)) {
                    data.analyticsUrl = data.portalUrl.substring(0, data.analyticsUrl.length - 1);
                }
                if (data.analytics) {
                    var s = document.createElement("script");
                    s.src = data.analytics;
                    $("head").append(s);
                }
                Cookies.set('client_config', JSON.stringify(data));
                if (agolRestHelper) {
                    agolRestHelper.setServerUrl(data.portalUrl);
                }
                if (callback) {
                    callback(data);
                }
            });
        }

        function doInit() {
            if (signinListener) {
                signInListener = signinListener;
            }
            if (signoutListener) {
                signOutListener = signoutListener;
            }
            var clientConfig = Cookies.get('client_config');
            try {
                clientConfig = JSON.parse(clientConfig);
            } catch (e) {

            }
            if (clientConfig && clientConfig.analytics) {
                var s = document.createElement("script");
                s.src = clientConfig.analytics;
                $("head").append(s);
            }
            if (user.isLoggedin()) {
                if (user.getOrgId()) {
                    user.login(user.getToken(), user.getUsername(), function() {
                        signin();
                    });
                } else {
                    auth.noOrgAccount();
                }
            } else {
                signout();
            }

            // $('#nav-help-link a').attr('href', 'http://doc.arcgis.com/en/appstudio/');
            // $('#nav-help-link a').attr('target', '_blank');
            // $('#nav-help-link2 a').attr('href', 'http://doc.arcgis.com/en/appstudio/');
            // $('#nav-help-link2 a').attr('target', '_blank');

            // $('#nav-app-help').remove();
            $('#nav-help-link').remove();
            $('#nav-help-link2').remove();

            $('#nav-app-community a').attr('href', 'https://www.esri.com/en-us/arcgis/products/appstudio-for-arcgis/overview');
            $('#nav-app-community a').attr('target', '_blank');

            $('#nav-app-blog a').attr('href', 'https://geonet.esri.com/groups/appstudio/blog');
            $('#nav-app-blog a').attr('target', '_blank');

            $('#nav-app-samples a').attr('href', 'https://github.com/Esri/arcgis-appstudio-samples');
            $('#nav-app-samples a').attr('target', '_blank');

            $('#nav-app-download a').attr('href', 'https://www.esri.com/en-us/arcgis/products/appstudio-for-arcgis/resources#settingup');
            $('#nav-app-download a').attr('target', '_blank');

            $('#nav-app-help a').attr('href', 'https://www.esri.com/en-us/arcgis/products/appstudio-for-arcgis/resources');
            $('#nav-app-help a').attr('target', '_blank');

            $('#nav-app-showcase a').attr('href', 'https://doc.arcgis.com/en/appstudio/gallery/');
            $('#nav-app-showcase a').attr('target', '_blank');

        }
        if (Cookies.get('client_config') && user.isLoggedin()) {
            doInit();
        } else {
            getClientConfig(doInit);
        }
    }

    function setupNavMenu(appName, appId) {
        var firstLinkTitle,
            firstLinkHref,
            secondLinkTitle,
            secondLinkHtml = '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">',
            path = window.location.pathname,
            links = $('.section-banner .breadcrumb li'),
            checkLandingPage = true,
            $firstLink = $('.section-banner .breadcrumb>li:nth-child(1)>a'),
            $secondLink = $('.section-banner .breadcrumb>li:nth-child(2)');

        firstLinkTitle = jQuery.i18n.prop('appConsole.title', appName);
        firstLinkHref = '/appconsole.html?itemId=' + appId;

        if (path === '/buildapp.html') {
            secondLinkHtml += jQuery.i18n.prop('appConsole.buildApp') + ' <span class="caret"></span></a>';
            secondLinkHtml += '<ul class="dropdown-menu">';
            secondLinkHtml += '<li><a href="/editapp.html?itemId=' + appId + '">' + jQuery.i18n.prop('appConsole.editApp') + '</a></li>';
        } else if (path == '/editapp.html') {
            if (appId === 'tmp') {
                firstLinkTitle = jQuery.i18n.prop('createNewApp.title');
                firstLinkHref = '/create.html';
                secondLinkHtml = null;
                $secondLink.text(jQuery.i18n.prop('appConsole.editApp'));
            } else {
                secondLinkHtml += jQuery.i18n.prop('appConsole.editApp') + ' <span class="caret"></span></a>';
                secondLinkHtml += '<ul class="dropdown-menu">';
                secondLinkHtml += '<li><a href="/buildapp.html?itemId=' + appId + '">' + jQuery.i18n.prop('appConsole.buildApp') + '</a></li>';
            }
        } else if (path === '/landingpage.html') {
            checkLandingPage = false;
            secondLinkHtml += jQuery.i18n.prop('appConsole.landingPage') + ' <span class="caret"></span></a>';
            secondLinkHtml += '<ul class="dropdown-menu">';
            secondLinkHtml += '<li><a href="/editapp.html?itemId=' + appId + '">' + jQuery.i18n.prop('appConsole.editApp') + '</a></li>';
            secondLinkHtml += '<li><a href="/buildapp.html?itemId=' + appId + '">' + jQuery.i18n.prop('appConsole.buildApp') + '</a></li>';
        }
        $firstLink.text(firstLinkTitle);
        $firstLink.prop('href', firstLinkHref);
        if (secondLinkHtml) {
            secondLinkHtml += '<li role="separator" class="divider"></li>';
            secondLinkHtml += '<li><a href="/create.html">' + jQuery.i18n.prop('createNewApp.title') + '</a></li>';
            secondLinkHtml += '<ul>';
            $secondLink.html(secondLinkHtml);
            $secondLink.addClass('dropdown');
            $secondLink.addClass('active');
            $secondLink.css('overflow', 'initial');
        }

        if (checkLandingPage) {
            nodeServerHelper.hasLandingPage(appId, function(hasLandingPage) {
                if (hasLandingPage) {
                    $('<li><a href="/landingpage.html?itemId=' + appId + '">' + jQuery.i18n.prop('appConsole.landingPage') + '</a></li>').insertBefore('.section-banner .breadcrumb>li:nth-child(2)>ul>li.divider');
                }
            });
        }

    }

    $('#navbar-title').html('ArcGIS AppStudio <span style="font-size: 14px; color: #999;"></span>');
        

    $navHelpLink.attr('href', '#');
    $navHelpLink.attr('target', '_blank');

    doNLS();

    var navbar = {};

    navbar.init = function(signinListener, signoutListener) {
        init(signinListener, signoutListener);
    };

    navbar.signin = function(callback) {
        signin(callback);
    };

    navbar.signout = function(callback) {
        signout(callback);
    };

    navbar.isLoggedin = function() {
        return isLoggedin;
    };

    navbar.setupNavMenu = function(appName, appId) {
        setupNavMenu(appName, appId);
    };

    return navbar;
}());
