/**
 * @file
 */
(function($){
  Drupal.behaviors.adminPanel = {
    attach: function(context, settings) {
      $('#edit-sidebar', context).tabSlideOut({
        // Class of the element that will become your tab.
        tabHandle: '.handle',
        // Side of screen where tab lives, top, right, bottom, or left.
        tabLocation: 'left',
        // Speed of animation.
        speed: 300,
        // options: 'click' or 'hover', action to trigger animation.
        action: 'click',
        // Position from the top/ use if tabLocation is left or right.
        topPos: '200px',
        // Position from left/ use if tabLocation is bottom or top.
        leftPos: '20px',
        // options: true makes it stick(fixed position) on scroll.
        fixedPosition: false
      });
    }
  };
})(jQuery);
