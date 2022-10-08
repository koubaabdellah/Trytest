/**
 * Rijkshuisstijl scripts.
 */

(function ($) {

  Drupal.behaviors.nojs = {
    attach: function(context, settings) {
      $('html',context).removeClass('no-js').addClass('js');
    }
  };

  /**
   * On document load...
   */
  $(function() {

    // Sets a menu button
    $('#main-bar').prepend('<a id="menu-button" name="menu-button">' + Drupal.t('Menu') + '</a>');

    $('#menu-button').click(function() {
      $(this).toggleClass('active');
      $(this).siblings('.nav').slideToggle();
    });
  });
var fb ;
  // Checks if the screen gets resized.
  $(window).bind('load resize', function(){
    if (isDesktop()) {
      $('#main-bar .nav').show();
    };


    if (isMobile()) {

      if ( $( "#mobile-banner" ).length < 1){
        $('#mainbox #header').prepend('<div id="mobile-banner"><img alt="'+Drupal.settings.banner_image.alt+'" title="'+Drupal.settings.banner_image.title+'" width="'+Drupal.settings.banner_image.width+'" height="'+Drupal.settings.banner_image.height+'" src="'+Drupal.settings.banner_image.uri+'" class="header-image" /></div>');
        if(!fb){
          fb = $('#frontpage-banner').detach();
        }else{
        console.log('fb not defined');
        };
      };





    }else{
       $('#mobile-banner').detach();

      if ( $( "#frontpage-banner" ).length < 1)  {//console.log('boo');
        //$('#main').prepend(
          //'<div class="clearfix" id="frontpage-banner"><img alt="'+Drupal.settings.banner_image.alt+'" title="'+Drupal.settings.banner_image.title+'" width="'+Drupal.settings.banner_image.width+'" height="'+Drupal.settings.banner_image.height+'" src="'+Drupal.settings.banner_image.uri+'" class="header-image" />'+
            //'<div class="site-title"><h1>Dienst ICT Uitvoering</h1></div><div class="intro-text"><span class="subtitle">Ministerie van Economische Zaken</span></div></div>')

        if(fb){//console.log('hoo');console.log(fb);
          $('#main').prepend(fb);
          fb = null;
          //fb.appendTo('#main');
        };

        };
    };

  });



$( ".ie8 :last-child" ).addClass("last-child");

var fields = $( ".page-zoeken .file-size");

$( fields ).each(function( index ) {
  
  valueX = parseInt($(this).text());
  var text;
  if (valueX > 1000000){
    text = Math.round((valueX/(1024*1024))*100)/100 + ' MB';
  }else{
    text = Math.round((valueX/(1024))*100)/100 + ' KB';
  }
  $(this).html(text.replace(".",",")) ;
     
});

  /**
   * Checks if the current browser has desktop dimensions or not.
   */
  function isDesktop(){
    // Actual viewport size
    var window_width = $(document).width();
    // breakpoint window / desktop size
    var window_break = 980;

    return (window_width >= window_break);
  };
  function isMobile(){
    // Actual viewport size
    var window_width = $(document).width();
    // breakpoint window / desktop size
    var window_break = 980;

    return (window_width <= window_break);
  };

}(jQuery));
;
