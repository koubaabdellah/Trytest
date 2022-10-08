/**
 * @file
 */
(function($){
  var internal = false;
  var current_index = false;
  Drupal.behaviors.topicSlider = {
    init: function(slider, context, settings) {
      var currentSlide = $(slider.activeSlide());
      var cur_nid = currentSlide.data('hash');

      Drupal.behaviors.topicSlider.moveSlide(slider, context, settings, false);

      // Unbinding the statechange fixes the weird behaviour in Chrome
      // We use a namespace so that we don't unbind other listeners.
      $(window).unbind('statechange.subject-slider');
      internal = false;
      History.Adapter.bind(window,'statechange.subject-slider',function(){
        var State = History.getState();
        if (!internal) {
          slider.swipeTo(State.data.slide, 200, false);
          setTimeout(function() {
            var currentSlide = $(slider.activeSlide());
            currentSlide.addClass('cbp-start');
            Drupal.behaviors.topicSlider.loadPrevNext(currentSlide, context, settings, slider);
            var cur_nid = currentSlide.data('hash');
            Drupal.behaviors.topicSlider.loadSlide(cur_nid, context, settings, slider);
          }, 200);
        }
        internal = false;
      });
      $('.swiper-slide.subject input').attr('tabindex','-1');
      $('.swiper-slide.subject.active input').removeAttr('tabindex');
    },
    loadPrevNext: function(active, context, settings, slider) {
      var prev = active.prev();
      var next = active.next();
      if (prev) {
        var prev_id = prev.data('hash');
        Drupal.behaviors.topicSlider.loadSlide(prev_id, context, settings, slider);
      }
      if (next) {
        var next_id = next.data('hash');
        Drupal.behaviors.topicSlider.loadSlide(next_id, context, settings, slider);
      }
    },
    moveSlide: function(slider, context, settings, pushState) {
      var currentSlide = $(slider.activeSlide());
      $(slider.slides).not(currentSlide).removeClass('cbp-start');
      currentSlide.addClass('cbp-start');
      Drupal.behaviors.topicSlider.loadPrevNext(currentSlide, context, settings, slider);
      var cur_nid = currentSlide.data('hash');
      Drupal.behaviors.topicSlider.loadSlide(cur_nid, context, settings, slider);
      if (pushState) {
        internal = true;
        if (slider.activeIndex != current_index) {
          current_index = slider.activeIndex;
          History.pushState({_index: History.getCurrentIndex(), slide: slider.activeIndex, nid: cur_nid}, currentSlide.data('title'), currentSlide.data('path'));
          $('#skipLinkMainContent').attr('href','#' + currentSlide.attr('id'));
        }
      }
    },
    loadSlide: function(nid, context, settings, slider) {
      var pane = $('#ajax-pane-' + nid);
      if (pane && !pane.hasClass('loaded') && !pane.hasClass('loading')) {
        var ajax_settings = {};
        ajax_settings.url = settings.basePath + 'cbp/ajax/' + nid;
        ajax_settings.event = 'load';
        ajax_settings.keypress = false;
        ajax_settings.prevent = false;
        ajax_settings.progress = {
          type: 'none',
          element: null
        };

        Drupal.ajax['ajax-pane-' + nid] = new Drupal.ajax('ajax-pane-' + nid, pane, ajax_settings);
        pane.addClass('loading');

        // Make sure ajax equal height is triggered on loaded content.
        pane.ajaxComplete(function(event, xhr, settings) {
            jQuery.CBPEngine.setupEqualheight();
            jQuery.CBPEngine.reinitSwipers();
        });
          pane.trigger('load');

      }
    }
  };
})(jQuery);
