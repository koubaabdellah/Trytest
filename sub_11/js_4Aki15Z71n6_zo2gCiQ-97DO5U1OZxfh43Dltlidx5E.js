/* Source and licensing information for the line(s) below can be found at https://www.cjib.nl/modules/custom/cjib_az/scripts/cjib-az.js. */
(function($,Drupal){Drupal.behaviors.cjib_az={attach:function(context,settings){$('.m-az-nav__list li a',context).once().click(function(){if(location.pathname.replace(/^\//,'')===this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);if(target.length){$('html,body').animate({scrollTop:target.offset().top-75},1000);$(target).focus();return false;}}});}};}
(jQuery,Drupal));
/* Source and licensing information for the above line(s) can be found at https://www.cjib.nl/modules/custom/cjib_az/scripts/cjib-az.js. */;
