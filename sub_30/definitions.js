(function ($) {

  /**
   * Behavior which is responsable for qTip tooltips on definitions.
   */
  Drupal.behaviors.qTipDefinitions = {
    attach: function (context) {
      $('dfn.definition-item', context).once('qtip-definitions', function () {

        var config = Drupal.settings.qtip;
        var switch_position, tip_position;
  
        if (config.show_speech_bubble_tip) {
          if (config.show_speech_bubble_tip_side) {
            switch_position = config.tooltip_position.split('_');
            tip_position = (switch_position[1] == 'center' ? config.tooltip_position : switch_position[1] + ' ' + switch_position[0]);
          }
          else {
            tip_position = config.tooltip_position;
          }
        }
        else {
          tip_position = false;
        }
  
        $(this).qtip({
          position: {
            my: config.tooltip_position, // my = speech bubble position on tooltip
            at: config.target_position, // at = where on link text tooltip will appear
            adjust: {
              screen: true // Keeps tooltip within visible window
            }
          },
          style: {
            classes: config.show_shadow ? 'ui-tooltip-shadow ' + config.color : config.color,
            tip: {
              corner: tip_position,
              border: config.show_speech_bubble_tip_solid ? false : 5,
              width: parseInt(config.speech_bubble_size),
              height: parseInt(config.speech_bubble_size)
            }
          },
          show: {
            event: config.show_event_type,
            solo: true,
            delay: config.show_event_type == 'click' ?  1 : 140
          },
          hide: {
            event: config.hide_event_type,
            fixed: true //When set to true, the tooltip will not hide if moused over, allowing the contents to be clicked and interacted with.
          }
        });

      });
    }
  };

})(jQuery);
