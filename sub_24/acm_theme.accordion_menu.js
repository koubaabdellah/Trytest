(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.accordionMenu = {
    attach: function (context, settings) {
      $('.accordion-menu-button').once().click(function (e) {
        const accordionMenu = $(this).next('ul.accordion-menu');

        accordionMenu
          .slideToggle()
          .toggleClass('state-expanded')
          .toggleClass('state-collapsed')
          .attr('aria-expanded', accordionMenu.hasClass('state-expanded'));
      })
    }
  };

}(jQuery, Drupal));
