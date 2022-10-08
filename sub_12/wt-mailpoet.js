jQuery(document).ready(function($){

	//STATUS VERWIJDEREN!!

   $(".mailpoet_paragraph select.mailpoet_select").not('.mailpoet_date_month').remove();
	$(".mailpoet_paragraph label.mailpoet_select_label").remove();

    /* De tekst "Moet je je e-mailadres wijzigen? Schijf je hier uit, 
    meld je daarna eenvoudig opnieuw aan" verwijderen op de pagina
    E-mailberichten beheren*/
    
    $('.mailpoet_paragraph span').not('.mailpoet_error_segments').hide();

	//CSS hack om tekst van radiobutton opties anders op te maken dan het label
	$('label:has(input.mailpoet_radio)').addClass('mailpoet_radio_label_radiobuttonlabel');
	
	$('label:has(input.mailpoet_checkbox)').addClass('mailpoet_checkbox_label_checkboxlabel');

    /* Add attribute role */
    $(".mailpoet_paragraph").on('DOMNodeInserted', function(e) {
        $("ul.parsley-errors-list.filled li").attr("role", "alert");
    });
    
    /* Is dit een mailpoet submit scherm? */
    var submitButton = $('input[type=submit].mailpoet_submit');
    if(submitButton.val() == 'Opslaan') {
        $(submitButton).on('click',function(){
            localStorage.setItem('mailpoet_submitted', '1'); 
        });
        var hasSubmitted = localStorage.getItem('mailpoet_submitted');
        if(hasSubmitted){
            $('form p.mailpoet_paragraph').first().prepend('<p class="wt-mailpoet-message wt-mailpoet-blink">Uw wijzigingen zijn opgeslagen.</p>');
            localStorage.removeItem('mailpoet_submitted');             
        }
    }
});


