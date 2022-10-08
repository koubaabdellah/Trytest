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
