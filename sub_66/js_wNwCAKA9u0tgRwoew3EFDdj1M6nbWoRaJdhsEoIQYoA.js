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
