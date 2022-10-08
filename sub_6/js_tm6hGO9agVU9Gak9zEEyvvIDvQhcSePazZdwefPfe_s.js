/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/core/misc/drupal.init.js. */
if(window.jQuery){jQuery.noConflict();}
document.documentElement.className+=' js';(function(Drupal,drupalSettings){var domReady=function domReady(callback){var listener=function listener(){callback();document.removeEventListener('DOMContentLoaded',listener);};if(document.readyState!=='loading'){setTimeout(callback,0);}else{document.addEventListener('DOMContentLoaded',listener);}};domReady(function(){Drupal.attachBehaviors(document,drupalSettings);});})(Drupal,window.drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/core/misc/drupal.init.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.consuwijzer.nl/modules/contrib/webform/js/webform.form.auto_focus.js. */
(function($,Drupal){'use strict';Drupal.behaviors.webformAutofocus={attach:function(context){$(context).find('.js-webform-autofocus :input:visible:enabled:first').trigger('focus');}};})(jQuery,Drupal);
/* Source and licensing information for the above line(s) can be found at https://www.consuwijzer.nl/modules/contrib/webform/js/webform.form.auto_focus.js. */;
