/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/modules/custom/cjib_feedback/js/positive-feedback-handler.js. */
;(function(Drupal){'use strict';Drupal.behaviors.cjib_feedback_positive_feedback_handler={attach:(context,settings)=>{const handler=context.querySelector('#'+settings.cjib_feedback.positiveFeedbackElement)
if(handler){handler.addEventListener('click',function(){this.checked=true
this.form.submit()},true)}}}})(Drupal)
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/modules/custom/cjib_feedback/js/positive-feedback-handler.js. */