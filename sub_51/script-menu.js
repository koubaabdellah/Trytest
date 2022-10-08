jQuery(document).ready(function () {
    if (window.innerWidth > 1070) {
        jQuery('.ws-inline > li')['on']('mouseenter', function () {
            jQuery(this)['addClass']('ws-child-active')['siblings'](this)['removeClass']('ws-child-active');
            return false;
        });
        jQuery('.ws-inline > li')['on']('mouseenter', function () {
            jQuery(this)['addClass']('ws-child-active')['siblings'](this)['removeClass']('ws-child-active');
            return false;
        });
    }
});


jQuery(function () {
    'use strict';
    document['addEventListener']('touchstart', function () {}, false);
    jQuery(function () {
        jQuery('body header')['wrapInner']('<div class="wsmenucontainer" />');
        jQuery('<div class="overlapblackbg"></div>')['prependTo']('.wsmenu');
        jQuery('#wsnavtoggle')['click'](function () {
            jQuery('body')['toggleClass']('wsactive');
            jQuery(".wsmenu-list").trigger('click');
            if (!jQuery(".wsmenu-click").hasClass('ws-activearrow')) {
                jQuery(".wsmenu-click").trigger('click');
            }
        });
        jQuery('.overlapblackbg')['click'](function () {
            jQuery('body')['removeClass']('wsactive');
        });
        jQuery('.wsmenu-list> li')['has']('.sub-menu')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
        jQuery('.wsmenu-list > li')['has']('.wsshoptabing')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
        jQuery('.wsmenu-list > li')['has']('.wsmegamenu')['prepend']('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
        jQuery('.wsmenu-click')['on']('click', function () {
            jQuery(this)['toggleClass']('ws-activearrow')['parent']()['siblings']()['children']()['removeClass']('ws-activearrow');
            jQuery('.sub-menu, .wsshoptabing, .wsmegamenu')['not'](jQuery(this)['siblings']('.sub-menu, .wsshoptabing, .wsmegamenu'))['slideUp']('slow');
            jQuery(this)['siblings']('.sub-menu')['slideToggle']('slow');
            jQuery(this)['siblings']('.wsshoptabing')['slideToggle']('slow');
            jQuery(this)['siblings']('.wsmegamenu')['slideToggle']('slow');
            return false;
        });
        jQuery('.wstabitem > li')['has']('.wstitemright')['prepend']('<span class="wsmenu-click02"><i class="wsmenu-arrow"></i></span>');
        jQuery('.wsmenu-click02')['on']('click', function () {
            jQuery(this)['siblings']('.wstitemright')['slideToggle']('slow');
            jQuery(this)['toggleClass']('ws-activearrow02')['parent']()['siblings']()['children']()['removeClass']('ws-activearrow02');
            jQuery('.wstitemright')['not'](jQuery(this)['siblings']('.wstitemright'))['slideUp']('slow');
            return false;
        });
        jQuery('.wstabitem02 > li')['has']('.wstbrandbottom')['prepend']('<span class="wsmenu-click03"><i class="wsmenu-arrow"></i></span>');
        jQuery('.wsmenu-click03')['on']('click', function () {
            jQuery(this)['siblings']('.wstbrandbottom')['slideToggle']('slow');
            jQuery(this)['toggleClass']('ws-activearrow03')['parent']()['siblings']()['children']()['removeClass']('ws-activearrow03');
            jQuery('.wstbrandbottom')['not'](jQuery(this)['siblings']('.wstbrandbottom'))['slideUp']('slow');
            return false;
        });
        jQuery(window)['ready'](function () {
            jQuery('.wsshoptabing.wtsdepartmentmenu > .wsshopwp > .wstabitem > li')['on']('mouseenter', function () {
                jQuery(this)['addClass']('wsshoplink-active')['siblings'](this)['removeClass']('wsshoplink-active');
                return false;
            });
            jQuery('.wsshoptabing.wtsbrandmenu > .wsshoptabingwp > .wstabitem02 > li')['on']('mouseenter', function () {
                jQuery(this)['addClass']('wsshoplink-active')['siblings'](this)['removeClass']('wsshoplink-active');
                return false;
            });
        });
        _0x291ax2();
        jQuery(window)['on']('load resize', function () {
            var _0x291ax1 = jQuery(window)['outerWidth']();
            if (_0x291ax1 <= 1070) {
                jQuery('.wsshopwp')['css']('height', '100%');
                jQuery('.wstitemright')['css']('height', '100%');
            } else {
                _0x291ax2();
            }
        });

        function _0x291ax2() {
            var _0x291ax3 = 1;
            jQuery('.wstabitem > li')['each'](function () {
                var _0x291ax4 = jQuery(this)['find']('.wstitemright')['innerHeight']();
                _0x291ax3 = _0x291ax4 > _0x291ax3 ? _0x291ax4 : _0x291ax3;
                jQuery(this)['find']('.wstitemright')['css']('height', 'auto');
            });
            jQuery('.wsshopwp')['css']('height', _0x291ax3 + 0);
        }
        jQuery(document)['ready'](function (_0x291ax5) {
            function _0x291ax6() {
                if (_0x291ax5(window)['outerWidth']() >= 1070) {
                    _0x291ax5('.wsshoptabing, .wstitemright, .wstbrandbottom, .wsmegamenu, ul.sub-menu')['css']({
                        "\x64\x69\x73\x70\x6C\x61\x79": ''
                    });
                }
            }
            _0x291ax6();
            _0x291ax5(window)['resize'](_0x291ax6)
        });
        jQuery(window)['on']('resize', function () {
            if (jQuery(window)['outerWidth']() <= 1070) {
                jQuery('.wsmenu')['css']('height', jQuery(this)['height']() + 'px');
                jQuery('.wsmenucontainer')['css']('min-width', jQuery(this)['width']() + 'px');
            } else {
                jQuery('.wsmenu')['removeAttr']('style');
                jQuery('.wsmenucontainer')['removeAttr']('style');
                jQuery('body')['removeClass']('wsactive');
                jQuery('.wsmenu-click')['removeClass']('ws-activearrow');
                jQuery('.wsmenu-click02')['removeClass']('ws-activearrow02');
                jQuery('.wsmenu-click03')['removeClass']('ws-activearrow03')
            }
        });
        jQuery(window)['trigger']('resize');
    });
    jQuery(window)['on']('load', function () {
        jQuery('.wsmobileheader .wssearch')['on']('click', function () {
            jQuery(this)['toggleClass']('wsopensearch');
        });
        jQuery('body, .wsopensearch .wsclosesearch')['on']('click', function () {
            jQuery('.wssearch')['removeClass']('wsopensearch');
        });
        jQuery('.wssearch, .wssearchform form')['on']('click', function (_0x291ax7) {
            _0x291ax7['stopPropagation']();
        });
    });
}());




