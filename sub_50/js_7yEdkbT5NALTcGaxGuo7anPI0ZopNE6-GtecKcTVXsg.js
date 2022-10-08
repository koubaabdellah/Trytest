/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);;
/**
 * @file
 * Rijkshuisstijl scripts.
 */

(function ($) {

  Drupal.behaviors.nojs = {
    attach: function(context, settings) {
      $('html',context).removeClass('no-js').addClass('js');
    }
  };

  /**
   * Adds description button to form items.
   */
  Drupal.behaviors.formDescription = {
    attach: function (context) {
      $('form', context).once('description').each(function() {
        var $form = $(this);

        $form.find('.description').each(function() {
          var $description = $(this);
          var $wrapper;
          // Check if description is a child of a form-item, else find a sibling form-item.
          if ($description.parent().hasClass('form-item')) {
            $wrapper = $description.parent('.form-item');
          }
          else {
            $wrapper = $description.siblings('.form-item');
            // Move the description directly under the textarea.
            $wrapper.append($description);
          }
          $wrapper.css({'position':'relative'}).closest('form').addClass('has-description-toggle');

          var $close = $('<a>')
            .attr('href', '#')
            .attr('title', Drupal.t('Close description'))
            .text('x')
            .addClass('description-close')
            .hide()
            .appendTo($wrapper);
          var $open = $('<a>')
            .attr('href', '#')
            .attr('title', Drupal.t('Open description'))
            .text('?')
            .addClass('description-open')
            .appendTo($wrapper);

          $description.slideUp(0).css({
            position: 'relative',
            top: 'auto'
          });

          $open.click(function(e) {
            e.preventDefault();

            $description.slideDown(400, function() {
              $open.hide();
              $close.show().focus();
            });
          });

          $close.click(function(e) {
            e.preventDefault();

            $description.slideUp(400, function() {
              $close.hide();
              $open.show().focus();
            });
          });
        });
      });
    }
  };

  // On document load...
  $(function() {

    // Sets main menu button, hide for now, visibility is done on window load and resize.
    $('#main-menu').once('mm').before('<a id="menu-button" class="menu-button" name="menu-button">' + Drupal.t('Menu') + '</a>');
    $('#menu-button').hide();
    $('#menu-button').click(function() {
      $(this).toggleClass('active');
      $(this).siblings('#main-menu').toggle();
    });
  });

  getAdminBarHeight();

  // Checks if the screen gets resized.
  $(window).bind('load resize', function(){
    if (isMobile()) {
      $('#sub-menu').find('li:not(.active-trail)').hide();
      $('#sub-menu').find('li.active-trail').bind('click', function(e) {
        $(this).siblings('li').toggle();
        $(this).toggleClass('open');
        e.preventDefault();
      });
    }
    else {
      $('#sub-menu').find('li:not(.active-trail)').show();
      $('#sub-menu').find('li.active-trail').removeClass('open').unbind('click');
    }
    if (isDesktop()) {
      $('#menu-button').hide();
      $('#main-menu').show();
    }
    else {
      $('#menu-button').show();
      $('#main-menu').hide();
    }
    getAdminBarHeight();
  });

  /**
   * Checks if the current browser has tablet dimensions or not.
   */
  function isMobile(){
    // Actual viewport size.
    var window_width = $(window).width();
    // Breakpoint window / desktop size.
    var window_break = 740;

    return (window_width < window_break);
  }

  /**
   * Checks if the current browser has desktop dimensions or not.
   */
  function isDesktop(){
    // Actual viewport size.
    var window_width = $(window).width();
    // Breakpoint window / desktop size.
    var window_break = 980;

    return (window_width >= window_break);
  }

  /**
   * Checks if the admin menu is present and adjest the body top margin to the height of the admin menu bar.
   */
  function getAdminBarHeight(){
    var adminMenuHeight = $('#admin-menu').innerHeight() + 'px';
    var styleAdminMenuHeight = 'margin-top: ' + adminMenuHeight + ' !important';
    var styleNavigationHeight = 'margin-top: ' + adminMenuHeight + ' !important';
    $('html body.admin-menu').attr('style', styleAdminMenuHeight);
    $('body.admin-menu #navigation').attr('style', styleNavigationHeight);
  }

}(jQuery));
;
