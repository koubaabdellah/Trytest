/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/modules/custom/cjib_webform/js/cjib_webform.cjib_initials.js. */
(function($,Drupal,drupalSettins){"use strict";Drupal.behaviors.cjibInitialsTransform={attach:function(context,settings){if(typeof drupalSettings.cjib_initials!=='undefined'){$.each(drupalSettings.cjib_initials,function(){$('input[name="'+this+'"]',context,settings).once("addCjibInitialsTransform"+this).each(function(){new FieldKit.TextField(this,new FieldKit.InitialsFormatter());});});}}};})(jQuery,Drupal,drupalSettings);
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/modules/custom/cjib_webform/js/cjib_webform.cjib_initials.js. */;