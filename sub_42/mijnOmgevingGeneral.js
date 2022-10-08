$(document).ready(function () {
    //Error message link 
    if ($(".password-requirements-error-message").children().length === 1) {
        $(".error-bypass").css({ "display": "none" });
    }
    //End

    var OMTitleContainer = $('.title-tripleforms'); 
    var OMTitle = $('.head-tf-title'); 
    var OMSubTitle = $('.head-tf-subtitle');

    function contentTextCheck(element) {
        return element.text().trim().length === 0;
    }
    //hide container of title when there's no title
    if (contentTextCheck(OMTitle)) {
        OMTitle.remove();
    }
    if (contentTextCheck(OMSubTitle)) {
        OMSubTitle.remove();
    }
    if (contentTextCheck(OMSubTitle) && contentTextCheck(OMTitle)) {
        OMTitleContainer.remove();
    }

    var logOutClassName = '.logout-button',
        mobileLogOutContainerClassName = '.sign-out-mobile-container',
        logOutElement = $(logOutClassName),
        logButtonid = logOutElement.attr('id') + 'v2';

    logOutElement.clone().appendTo(mobileLogOutContainerClassName);
    $(mobileLogOutContainerClassName + ' ' + logOutClassName).attr('id', logButtonid);
    $('#' + logButtonid).addClass('btn btn-default');

    //End

    //focus within languagepicker
    var languagePickerClass = '.languagepicker',
        languagePickerSelectElement = $(languagePickerClass + ' > select'),
        languageFocusClassName = 'language-pickerfocus';

    languagePickerSelectElement.focus(function () {
        $(this).parent().addClass(languageFocusClassName);
    });
    languagePickerSelectElement.focusout(function () {
        $(this).parent().removeClass(languageFocusClassName);
    });

    var mobileMenuContainer = $('#mlmenu');

    function mobileLanguagePicker() {
        $(languagePickerClass).clone().appendTo(mobileMenuContainer);

        var mobileLanguagePickerSelectElement = mobileMenuContainer.children(languagePickerClass),
            idSelect = mobileLanguagePickerSelectElement.find('select').attr('id') + '';

        mobileLanguagePickerSelectElement.addClass('mobile-languagepicker');
        mobileLanguagePickerSelectElement.find('select').attr('id', idSelect);
        mobileLanguagePickerSelectElement.find('select').removeAttr('onchange');
        mobileLanguagePickerSelectElement.find('#language-picker-description').remove();

        $('.mobile-languagepicker select').on('change', function () {
            var chosenValue = $(this).val();

            $(this).children().each(function () {
                if (chosenValue == $(this).val()) {
                    $('.mo-toolbar-container '+ languagePickerClass + ' select').prop('selectedIndex', $(this).index()).change();
                }
             });
        });
    }

    // Hamburger menu
    var mainMenu = $('.main-navigation');
    var submenuLevel = 1;
    var submenuAria = mobileMenuContainer.data('submenu');
    var openAria = mobileMenuContainer.data('open');
    var MainMenuAria = mobileMenuContainer.data('menu');

    function checkSubmenu(ulMenu) {

        var menuType = submenuLevel === 1 ? 'mobile-main-menu' : 'submenu';
        var idMenuItem = menuType + "-" + submenuLevel;

        mobileMenuContainer.append('<ul id=' + idMenuItem + ' data-menu=' + idMenuItem + ' class="menu__level" tabindex="-1" role="menu"></ul>');
        
        var newUl = $("#" + idMenuItem);

        for (var c = 0; c < ulMenu.children().length; c++) {
            var child = ulMenu.children().eq(c);
            var grandChild = child.children().eq(0);
            var menuLinkClassName = child.children().length == 3 ? 'sub__menu' : 'menu__link';
            var aHref = child.children().eq(0).attr('href');
            var aAriaLabel = child.children().eq(0).attr('aria-label');
            var menuLinkElement = '<a class="' +
                menuLinkClassName +
                '" href="' +
                aHref +
                '" aria-label="' +
                aAriaLabel +
                '" >' +
                grandChild.text() +
                '</a>';

            submenuLevel++;
            menuType = submenuLevel === 1 ? 'mobile-main-menu' : 'submenu';
            idMenuItem = menuType + "-" + submenuLevel;

            if (child.children().length == 3) {
                newUl.append('<li class="menu__item" role="menuitem">' +
                    menuLinkElement +
                    '<a class="menu__link open-submenu" data-submenu="' +
                    idMenuItem +
                    '" href="#" aria-label="' +
                    openAria +
                    " " +
                    grandChild.text() +
                    submenuAria +
                    '" >' +
                    grandChild.text() +
                    '</a></li>');
                checkSubmenu(child.find('>' + 'ul'));
            } else {
                newUl.append('<li class="menu__item" role="menuitem">' + menuLinkElement + '</li>');

            }
        }
    }
    checkSubmenu(mainMenu);
    mobileLanguagePicker();


    var goBackButton = $('#mlmenu > button.menu__back');
    var closeMobileMenuButton = $('.close-mobile-menu');
    var mobileMenuItemSelector = '#mlmenu > ul.menu__level--current a';
    var backButtonAriaPreValue = goBackButton.attr('aria-label');
    var breadCrumbArray = [];

    function mobileMenuControls(currentMenuId) {
        // redirect last tab to first input
        
        var checkPresentOfLanguagepicker = $(currentMenuId).closest('nav').children('.mobile-languagepicker');

        $(currentMenuId).last().on("keydown",
            function(e) {
                if (e.which === 9 && !e.shiftKey) {
                    e.preventDefault();
                    if (!checkPresentOfLanguagepicker.length > 0 && goBackButton.hasClass('menu__back--hidden')) {
                        closeMobileMenuButton.focus();
                    } else if (checkPresentOfLanguagepicker.length > 0 &&
                        checkPresentOfLanguagepicker.children().length > 0) {
                        $(".mobile-languagepicker select").focus();
                    } else {
                        goBackButton.focus();
                    }
                }
            });
            

        //redirect first tab to first input
        $(currentMenuId).first().on('keydown',
            function(e) {
                if ((e.which === 9 && e.shiftKey)) {
                    e.preventDefault();
                    closeMobileMenuButton.focus();
                }
            });
    };

    function setMenuEvents() {
        // Set events on first and last a in each of the menu ul's
        $(".menu__level").each(function () {
            mobileMenuControls($(this).find("a"));
        });

        // Go back button
        goBackButton.on('click', function () {
            breadCrumbArray.pop();
            //goBackButton.attr('aria-label', backButtonAriaPreValue + ' ' + breadCrumbArray[breadCrumbArray.length - 1]);
        });

        goBackButton.on('keydown', function (e) {
            if ((e.which === 9 && e.shiftKey)) {
                e.preventDefault();
                $(".menu__level--current a").last().focus();
                //$(currentMenuId).last().focus();
            }
            else if ((e.which === 9 && !e.shiftKey)) {
                e.preventDefault();
                closeMobileMenuButton.focus();
            }
        });

        $(".mobile-languagepicker select").on('keydown',
            function (e) {
                if ((e.which === 9 && e.shiftKey)) {
                    e.preventDefault();
                    //$(currentMenuId).last().focus();
                    $(".menu__level--current a").last().focus();
                }
                else if ((e.which === 9 && !e.shiftKey)) {
                    e.preventDefault();
                    goBackButton.hasClass("menu__back--hidden")
                        ? closeMobileMenuButton.focus()
                        : goBackButton.focus();
                }
            });

        // open and close menu button
        closeMobileMenuButton.on('keydown',
            function (e) {
                //tab
                if (e.which === 9 && !e.shiftKey) {
                    e.preventDefault();
                    //$(currentMenuId).first().focus();
                    $(".menu__level--current a").first().focus();
                } else if (e.which === 9 && e.shiftKey) {
                    e.preventDefault();
                    goBackButton.hasClass('menu__back--hidden')
                    //? $(currentMenuId).last().focus()
                        ? $(".menu__level--current a").last().focus()
                        : goBackButton.focus();
                }
            });
        //close mobile menu with esc
        mobileMenuContainer.on('keydown',
            function (e) {
                if (e.which === 27 && mobileMenuContainer.hasClass('visible-mobile-menu-container')) {
                    mobileMenuContainer.toggleClass('hidden-mobile-menu-container visible-mobile-menu-container');
                    $('body').toggleClass('body-overflow-unlocked body-overflow-locked');
                }
            });
        $('.menu__link').on('keydown',
            function (e) {
                if (e.which === 32) {
                    // jQuery only triggers events that are set by the jQuery on-method, but NOT the
                    // events that were added by addEventListener directly.
                    //$(this).trigger('click');
                    triggerEx(this, "click");
                }
            });
    }

    function triggerEx(element, eventName) {
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent(eventName, true, true);
        $(element)[0].dispatchEvent(ev);
    }

    $('.open-submenu').on('click',
        function(e) {
            e.preventDefault();
            // var submenuAttr = $(this).attr('data-submenu');
            var menuItemElement = $(this).parent();
            var menuItemText = menuItemElement.children().first().text();
            breadCrumbArray.length === 0 ? breadCrumbArray.push(MainMenuAria) : breadCrumbArray.push(menuItemText);
            goBackButton.attr('aria-label',
                backButtonAriaPreValue + ' ' + breadCrumbArray[breadCrumbArray.length - 1]);
        });

    $('.mobile-menu').on('click', function () {
        mobileMenuContainer.toggleClass('hidden-mobile-menu-container visible-mobile-menu-container');
        $('body').toggleClass('body-overflow-unlocked body-overflow-locked')
        //mobileMenuControls(mobileMenuItemSelector);
        $(mobileMenuItemSelector).first().focus();
    });

    var menuEl = document.getElementById('mlmenu'),
        mlmenu = new MLMenu(menuEl,
            {
                breadcrumbsCtrl: false, // show breadcrumbs
                initialBreadcrumb: 'all', // initial breadcrumb text
                backCtrl: true, // show back button
                itemsDelayInterval: 0, // delay between each menu item sliding animation
                //onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
                onSubmenuOpened: function (menuElement) {
                    var submenuSelector = $('#' + menuElement.id + ' a');
                    //mobileMenuControls(submenuSelector);
                    setTimeout(function() {
                            submenuSelector.first().focus();
                        },
                        0.01);
                    }
            });

    // Set events on first a, last a, 
    setMenuEvents();

    //Closes mobile menu when main menu is visible
    $(window).resize(function () {
        var viewPortWidth = $(window).outerWidth();
        var viewPortSizeMid = 768;

        if (viewPortWidth >= viewPortSizeMid && $(".mainmenu .navbar").css("display") == "block") {
            if (mobileMenuContainer.hasClass('visible-mobile-menu-container')) {
                mobileMenuContainer.toggleClass('hidden-mobile-menu-container visible-mobile-menu-container');
            }
        }

    });
})



