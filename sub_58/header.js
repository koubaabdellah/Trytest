$(document).ready( function(event) {

  $('body').click( function(){
    $(".site-search").removeClass('active');
    $('.site-dropdown').removeClass('visible');
  });

  $('.site-dropdown-toggle').click( function(event) {
    $('.site-dropdown').toggleClass('visible');
    $(".site-search").removeClass('active');
    event.stopPropagation();
  });

  $('.site-search-input').click( function(event) {
    $(".site-search").toggleClass('active');
    $('.site-dropdown').removeClass('visible');
    event.stopPropagation();
  });

  $('.toggle-site-navigation').click( function(event) {
    event.stopPropagation();

    $('.drawer').css("display","block");
    $('body').toggleClass('scroll-lock');


    setTimeout(function() {
      $('.drawer').toggleClass('active-left');
    }, 250)

  });

  $('.drawer').click(function(e) {
    if (e.target == this) {

      $('.drawer').removeClass('active-left');

      $('body').removeClass('scroll-lock');
    }
  });

});
