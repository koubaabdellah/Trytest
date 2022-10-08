$(function() {
  $('body').find('script').remove().end().wrapInner('<div class="siteWrapper"></div>');
  $('.custom-menu-primary .hs-menu-wrapper > ul > li > a').each( function() {
    var MenuText = $(this).text();
    $(this).parent('li').addClass(MenuText);
  });
  $('.custom-logo img').clone().appendTo('.custom-menu-primary.desktop .hs-menu-wrapper > ul > li.Home > a')
  $('.custom-menu-primary.desktop .hs-menu-wrapper > ul > li:last-Child > a').append('<i class="icon-search menu-nav__list-item--search-icon"></i>');
  $('.custom-menu-primary.desktop .hs-menu-wrapper > ul > li:nth-child(1), .custom-menu-primary.desktop .hs-menu-wrapper > ul > li:nth-child(2), .custom-menu-primary.desktop .hs-menu-wrapper > ul > li:nth-child(3)').wrapAll('<div class="h-col col-left"></div>');
  $('.custom-menu-primary.desktop .hs-menu-wrapper>ul>li:nth-last-child(1), .custom-menu-primary.desktop .hs-menu-wrapper>ul>li:nth-last-child(2), .custom-menu-primary.desktop .hs-menu-wrapper>ul>li:nth-last-child(3), .custom-menu-primary.desktop .hs-menu-wrapper>ul>li:nth-last-child(4)').wrapAll('<div class="h-col col-right"></div>');
  $('.custom-menu-primary.desktop .hs-menu-wrapper>ul>.h-col>li.Wat.we.doen > ul').wrapInner('<div class="page-center"><div class="h_row"><div class="menu-main__wrapper"></div></div></div>');
  $('.custom-menu-primary.desktop .hs-menu-wrapper>ul>.h-col>li.Wat.we.doen>ul .menu-main__wrapper>li:first-child').append('<a href="https://www.caop.nl/leerstoelen/" class="menu-main__button">Leerstoelen</a>');
  
  $('.custom-menu-primary').addClass('js-enabled');
  $('.custom-logo.wp').before('<div class="mobile-trigger"><svg width="34px" height="22px" viewBox="0 0 34 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch --><title>Group</title><desc>Created with Sketch.</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="menu/close/768" transform="translate(-25.000000, -28.000000)" fill-rule="nonzero" stroke="#F0402E" stroke-width="3"><g id="Group" transform="translate(25.000000, 30.000000)"><path d="M7.10542736e-15,0.409090909 L34,0.409090909" id="Path-9"></path><path d="M7.10542736e-15,8.59090909 L34,8.59090909" id="Path-9-Copy"></path><path d="M7.10542736e-15,17.5909091 L34,17.5909091" id="Path-9-Copy-2"></path></g></g></g></svg></div>');

  $('.mobile-trigger').click(function() {
    $('body').toggleClass('mobile-open');
    $('.child-trigger').removeClass('child-open');
  });

  
  $('.custom-menu-primary.desktop .hs-menu-wrapper > ul > .h-col > li').click(function(e) {
    e.stopPropagation();
    $(this).toggleClass('menu-open');
    $(this).siblings().removeClass('menu-open');
  });

  // Remove mobile open on body click but not on menu
  $('body').click(function() {
    $('.custom-menu-primary.desktop .hs-menu-wrapper > ul > .h-col > li').removeClass('menu-open');
  });

  $('.custom-menu-primary.desktop .hs-menu-wrapper > ul ul').click(function(e) {
    e.stopPropagation();
  });
  
  $('.custom-menu-primary .hs-menu-wrapper>ul>.h-col.col-right>li:last-child a').click( function() {
    $('body').toggleClass('search-open');
  });
  
  $('.post-filters.mobile h3').click( function() {
    $('.post-filters.mobile .widget-module').slideToggle(250);
    $('.post-filters.mobile').toggleClass('filter-open');
  });

  $('.menu-mobile').append('<div class="menu-mobile__header-close"><i class="icon-menu-close menu-mobile__header-close-icon"></i></div>');
  $('.menu-mobile__header-close').click( function() {
    $('body').removeClass('mobile-open');
  });

  $("document").ready(function($){
    $('.post-filters ul li a').each(function (index) {
      if (this.href.trim() == window.location) {
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
      }
    });

  });

});


(function ( $ ) {
 
    $.fn.animateMenu = function( options ) {
       
        
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            titleVal: "Back",
            triggerval: "+",
            counter:true,
            title:false,
            mobileTriggr:true,
            mobileTriggrVal:"Menu",
            mobileTriggrClass:"mobile-trigger",
            menuArea:"767"
          
          
          
			
        }, options );
    
      
       //add class to Clone Menu  
       $(this).clone().addClass('mega-menu').appendTo($(this).parent());
     
        //Add Class to menu
        $(this).addClass('animate-primary-menu');
      
      this.each(function(){
       var loop = 1; 
       var el = $('.mega-menu');
        
        
		el.wrapAll("<div class='animate-menu'></div>");
    if(settings.mobileTriggr===true){
      $('.animate-menu').before('<div class="'+settings.mobileTriggrClass+'">'+settings.mobileTriggrVal+'</div>');
    }
        el.addClass('active-panel');
        el.attr("data-id","anime-menu-0")
         //adding level classes to menu
        jQuery(".animate-menu ul").attr("data-level",function() {
		var depth = jQuery(this).parents("ul").length;
			return  (depth + 1);
		});
        
        //Create  relation between ul li
        var allli = el.find('li');
        $(allli).each(function(){
         
          if ( $(this).find('ul').length > 0) {
          var countchild = $(this).children('ul').children('li').length;
          $(this).attr('data-id','anime-menu-'+loop);
          $(this).children('ul').attr('data-id','anime-menu-'+loop);
		       
           if(settings.counter===true){
              $(this).children('a').after('<div class="counter">'+countchild+'</div>');  
           }
		  
          $(this).children('a').after('<div class="child-trigger">'+settings.triggerval+'</div>');  
            
          loop++;
          }
         });
       
        
        //extract all ul out from menu
        
        var allul = el.find('ul');
        allul.prepend('<li class="dl-back"><a href="javascript:;">'+settings.titleVal+'</a></li>');
        if(settings.title===true){
          $('.dl-back').each(function(){
            var labelval = $(this).parent().parent().children('a').text();
            $(this).children('a').html('<div class="menu-mobile__header-back"><i class="icon-caret-left menu-mobile__header-back-icon"></i></div>')
            $(this).after('<span class="cm-label">'+labelval+'</span>');



          })

		 }	
     $(allul).each(function(){
         
          $(this).clone().appendTo(el.parent());
          $(this).remove();
        });
        //remove duplicte ul from menu
        $('.animate-menu ul ul').remove();
         var maxHeight = 0,
             panelul = $('.animate-menu > ul');

        panelul.each( function() {
            var height = $(this).innerHeight();

            if ( height > maxHeight ) { maxHeight = height; }
        });
        //setting max-height for menu 
        //$('.animate-menu').css({"max-height":maxHeight+"px"});     
      });
       var MenuHeight = $('.active-panel').innerHeight(); 
        $('.animate-menu').css({"height":MenuHeight+"px"});
      
      // If Mobile Triiger True
      if(settings.mobileTriggr===true){
        $('.animate-menu').hide();
        $('.'+settings.mobileTriggrClass).click(function(){
          $('.animate-menu').slideToggle();
        });  
      }
      
      
      //Open Submenu
      
      
      $(document).on('click','.child-trigger',function(){
        var getDataId = $(this).closest('li').attr('data-id'),
		getDatalevel = $(this).closest('li').attr('data-level');
		
		$('.animate-menu ul').not('ul[data-id="'+getDataId+'"]').removeClass('active-panel ');
		
        $('ul[data-id="'+getDataId+'"]').addClass('active-panel ');
        $(this).closest('ul').addClass('submenu-open');
        
        
        MenuHeight = $('.active-panel').innerHeight(); 
        $('.animate-menu').css({"height":MenuHeight+"px"});

        
       
      });
      $(document).on('click','.dl-back',function(){
        
         var getDataId = $(this).closest('ul').attr('data-id');
                $('.animate-menu ul').not( $('li[data-id="'+getDataId+'"]').closest('ul')).removeClass('active-panel ');

        $('li[data-id="'+getDataId+'"]').closest('ul').addClass('active-panel ');
        $('li[data-id="'+getDataId+'"]').closest('ul').removeClass('submenu-open');
         //$('li[data-id="'+getDataId+'"]').closest('ul').closest('ul').addClass('submenu-open');
        MenuHeight = $('.active-panel').innerHeight(); 
        $('.animate-menu').css({"height":MenuHeight+"px"});

      });

      //Show and Hide menu according to screen size
    function checkResponsive(){
        $('.animate-menu').show();
        MenuHeight = $('.active-panel').innerHeight(); 
        $('.animate-menu').css({"height":MenuHeight+"px"});
        $('.animate-menu').hide();
        if(window.matchMedia("(max-width:"+ settings.menuArea+"px)").matches){
             $('.animate-menu').show();
          $('.animate-primary-menu').hide();  
            $('.'+settings.mobileTriggrClass).show();
         
        }
        else{
          
          $('.animate-primary-menu').show();  
          
          $('.animate-menu').hide();
          $('.'+settings.mobileTriggrClass).hide();
       
          
         
        }
        if(settings.mobileTriggr===true){
              
              
              $('.animate-menu').hide();
        }
        
      };     
      $(document).ready(function(){
       checkResponsive();
       }); 
    
       $( window ).resize(function() {
            checkResponsive(); 
         
         
       }); 

      
    };
  
    
    
  
  
  
 
}( jQuery ));

$( ".custom-menu-primary.mobile .hs-menu-wrapper > ul" ).animateMenu({
  counter:false ,// Show Counter 
  title:true ,//Show parent li name to ul if true
  //titleVal:"<i><<<i>", //Change Title Default Value
  mobileTriggr:false, //remove Mobile Trigger
  menuArea:"991", //Default Menu area is 767
  triggerval:'<i class="icon-menu-caret-right menu-list__icon"></i>'

  //mobileTriggrVal:"Menu", overide the value of mobile trigger
});

$('.animate-menu .mega-menu .child-trigger').click( function() {
  $('body').addClass('dl-back-open');
});

$('.animate-menu .mega-menu + ul  li.dl-back').click( function() {
  $('body').removeClass('dl-back-open');
});

$('.menu-mobile__header-close').click( function() {
  $('body').removeClass('dl-back-open');
});


