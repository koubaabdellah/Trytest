// <copyright file="dropdownNavigation.js" company="Kodision BV">
// Copyright (c) Kodision BV. All rights reserved.
// </copyright>

$(document).ready(function() {
    if ($(".main-navigation").length === 0) {
        return; // No menu navigation control on the page, so none of the functionality below is needed.
    }

    var options = {
        useAriaSettings:
            false // for now, the ARIA settings have been disabled, since they do not work correctly and mess up keyboard support.
    };

    var keys = {
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }

    function initAriaSettings() {
        if (!options.useAriaSettings) {
            return;
        }

        var menus = $(".main-navigation a").closest("ul");
        var menuItemLinksWithSubMenu = menus.prev();

        // Create an id for all menus (ul).
        var menuItemLinkWithSubMenuIndex = 0;
        menus.attr("id", function() { return "main-navigation_" + menuItemLinkWithSubMenuIndex++; });

        // Set aria attributes on the menu links
        menuItemLinksWithSubMenu
            .attr("aria-haspopup", "true")
            //.attr("aria-expanded", "false") // Initially false, is updated by the updateMenuItems method
            .attr("aria-controls",
                function() {
                    return $(this).next()[0].id;
                }); // link the menu link to the corresponding submenu (ul) (if present)
    };

    function keyboardEscape(selectedItem) {
        if (selectedItem.closest("ul").hasClass("main-navigation")) {
            // close the entire menu
            hideAllMenus();
        } else {
            // move to the parent menu item (since we never close sub menus on their own)
            selectedItem.closest("ul").prev().focus();
        }
    }

    function isLastMenuLiRecursive(selectedItem, isFirst) {
        var li = selectedItem.closest("li");

        // If we have an open submenu, we never need to close the menu ourselves: return false
        if (isFirst && li.hasClass("dropdown")) {
            var button = li.children("button");
            if (button.attr("aria-expanded") == "true" || selectedItem.is("a")) {
                return false;
            }
        }

        // If the li is not the last child, we don't need to close the menu ourselves: return false;
        if (!li.is(":last-child")) {
            return false;
        }

        // When we get it, we are the last li in the ul, without an open submenu.
        // Recursively repeat the process for its parent A (if it has that).
        var parentA = li.closest("ul").closest("li").children("a");
        var result = (parentA.length === 0) || isLastMenuLiRecursive(parentA, false);
        return result;
    }


    function lastVisibleMenuItem() {
        var visibleLastMenuItems = $(".main-navigation > li:last-child .dropdown-menu").filter(function () {
            return !($(this).css('visibility') == 'hidden' || $(this).css('display') == 'none');
        });
        return visibleLastMenuItems;
    }


    function keyboardTab(shiftKey, selectedItem) {
        if (!shiftKey && isLastMenuLiRecursive(selectedItem, true)) {
            hideAllMenus();
        }
    }

    function hideAllMenus() {
        // Hides all visible (sub)menus, hides classes on the items, and blurs all a items.
        updateMenuItems(null);
    }

    function updateMenuItems(focusedItem) {

        var hasItem = focusedItem && focusedItem.length > 0;

        // Update hidden/visible submenus
        var focusedMenus = hasItem
            ? focusedItem.parents('.dropdown-menu')
            : $(false);

        var otherMenus = $(".main-navigation .dropdown-menu").not(focusedMenus);

        focusedMenus.css("visibility", "visible");
        otherMenus.css("visibility", "hidden");

        $(".main-navigation *").is(":focus")
            ? focusedMenus.css("visibility", "visible")
            : otherMenus.css("visibility", "hidden");

         //Update the aria-expanded on the menu links
        focusedMenus.prev("button").attr("aria-expanded", "true");
        otherMenus.prev("button").attr("aria-expanded", "false");
        

        // Update focused-menu class on focused item and its parent items.
        var focusedDropdownItems = hasItem
            ? focusedItem.parents('.dropdown')
            : $(false);

        if (hasItem) {
            focusedDropdownItems = focusedDropdownItems.add(focusedItem.closest("li"));
            if (focusedItem.hasClass("dropdown")) {
                focusedDropdownItems = focusedDropdownItems.add(focusedItem.addClass("focused-menu"));
            }
        }

        focusedDropdownItems.addClass("focused-menu");
        $(".main-navigation li").not(focusedDropdownItems).not(focusedItem).removeClass("focused-menu");


        // No focuseditem? Then remove focus from all links in the menu
        if (!hasItem) {
            $(".main-navigation a").blur();
        }
    }

    //------------------------------------------------------------------------------------
    $(".main-navigation button").next("ul").css("visibility", "hidden");

    function visibility(element) {
        var submenu = element.next("ul");

        if (submenu.attr("style") == "visibility: hidden;") {
            submenu.css("visibility", "visible");
            element.attr("aria-expanded", "true");
        }
        else if (submenu.attr("style") == "visibility: visible;") {
            submenu.css("visibility", "hidden");
            element.attr("aria-expanded", "false");
        }
    }

    $(".main-navigation button")
        .keydown(function(e) {
            var pressedKey = e.which;

            switch (pressedKey) {
            case keys.enter:
                // close and open submenu
                visibility($(this));
                e.preventDefault();
                break;

            case keys.space:
                // close and open submenu
                visibility($(this));
                e.preventDefault();
                break;

            case keys.esc:
                // Handle escape key by closing the (sub)menu we are currently in.
                keyboardEscape($(this));
                e.preventDefault();
                break;
            case keys.tab:
                // Handle tab and shift-tab to ensure the entire menu is working as a single control.
                keyboardTab(e.shiftKey, $(this));
                break;
            }
        })
        .focus(function () {
            // When a menu item link gets focus, show/hide the correct submenus, and set/remove focused-item on the correct items.
            updateMenuItems($(this));
        });


    $(".main-navigation a")
        .keydown(function (e) {
            var direction = e.which;
            switch (direction) {
                
                case keys.esc:
                    // Handle escape key by closing the (sub)menu we are currently in.
                    keyboardEscape($(this));
                    e.preventDefault();
                    break;

                case keys.tab:
                    // Handle tab and shift-tab to ensure the entire menu is working as a single control.
                    keyboardTab(e.shiftKey, $(this));
                    break;
            }
        })
        .focus(function () {
            // When a menu item link gets focus, show/hide the correct submenus, and set/remove focused-item on the correct items.
            updateMenuItems($(this));
        });


    $(".main-navigation li")
        .mouseenter(function() {
            $(this).children('ul.dropdown-menu').css('visibility', 'visible');
            $(this).find("button").attr("aria-expanded", true);
            $(this).toggleClass("focused-menu", true);
        })
        .mouseleave(function () {
            $(this).children('ul.dropdown-menu').css('visibility', 'hidden');
            $(this).find("button").attr("aria-expanded", false);
            $(this).toggleClass("focused-menu", false);
        });

    $(document).click(function() {
        // Ensure that the menu is made invisible when the user clicks anywhere on the page.
        hideAllMenus();
    });

    initAriaSettings();
});
