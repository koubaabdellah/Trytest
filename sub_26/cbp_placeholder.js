/**
 * @file
 */
(function($){
    Drupal.behaviors.cbpPlaceholder = {
        attach: function(context, settings) {

            $('fieldset .field-container [placeholder]').focus(function() {
                var input = $(this);
              if (input.val() == input.attr('placeholder')) {
                  input.val('');
                  input.removeClass('placeholder');
              }
            }).blur(function() {
                var input = $(this);
              if (input.val() == '' || input.val() == input.attr('placeholder')) {
                  input.addClass('placeholder');
                  input.val(input.attr('placeholder'));
              }
            }).blur();

            $('fieldset .field-container [placeholder]').parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                  if (input.val() == input.attr('placeholder')) {
                      input.val('');
                  }
                })
            });
        }
  };
})(jQuery);
