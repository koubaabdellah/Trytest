/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// document.ready
jQuery(document).ready(function($){
  //
  // Functie die ervoor zorgt dat een ankerplaats zichtbaar wordt
  // gemaakt (niet langer ingeklapt) en er vervolgens 'rustig' naar
  // toe scrollt.
  //

  function aanleggenpublicationintro(anker) {
    if (anker && (!($(anker).hasClass('publication-intro')))) {
      $(anker).find('.read-more').hide();
      $(anker).find('.line.more').hide();
      $(anker).find('.line.less').show();
      $(anker).find('.read-more-content').show();
      $(anker).find('.read-less').show();
    }  
  }
		
  //        
  // De eerste aanleg als er via de url een ankerplaats
  // wordt doorgegeven.
  // 
  aanleggenpublicationintro(location.hash);
});;

// document.ready
jQuery(document).ready(function($){
  //
  // Functie die ervoor zorgt dat een ankerplaats zichtbaar wordt
  // gemaakt (niet langer ingeklapt) en er vervolgens 'rustig' naar
  // toe scrollt.
  //

  function aanleggen(anker) {
    if (anker && (!($(anker).parents('.card').hasClass('active')))) {
      $(anker).parents('.card').addClass('active');
      $(anker).parents('.card').find('.arrow').removeClass('down');
      $(anker).parents('.card').find('.arrow').addClass('up');
      $(anker).parents('.card').find('.collapse').slideDown();
    }  
    if (anker && $(anker).hasClass('active')) {
      $('html,body').animate({"scrollTop": $(anker).offset().top},'slow');
    }
  }  
		
  //
  // click-handler verbinden aan <a>-tags die gebruikt worden om 
  // naar een ankerplaats te gaan.
  //
  $('.accordion-anchor').click(function(){
    aanleggen(this.hash);
  });
		
  //        
  // De eerste aanleg als er via de url een ankerplaats
  // wordt doorgegeven.
  // 
  aanleggen(location.hash);
});

;
