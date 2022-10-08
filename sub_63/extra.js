jQuery(document).ready(function(){
    // Fix voor scrollen naar error
    var navhei = jQuery('.mk-header-holder').height();
    var navheix = navhei + 30;
    document.addEventListener('invalid', function(e){
        jQuery(e.target).addClass("invalid");
        jQuery('html, body').animate({scrollTop: jQuery(jQuery(".invalid")[0]).offset().top - navheix }, 0);
        setTimeout(function(){
            jQuery('.invalid').removeClass('invalid');
        },0300);
    }, true);

    // Verberg fieldset postadres
    jQuery('.bkd-form-part-bezoekadres .radio-list input').change(function() {
        if (jQuery(this).val() == 'true') {
            jQuery('.bkd-form-part-postadres').addClass('bkd-show');
        } else {
            jQuery('.bkd-form-part-postadres').removeClass('bkd-show');
        }
    });

    // Verberg fieldset Spoelbewijzen & Ketenregister
    jQuery('.bkd-form-part-activiteiten .listbox input').change(function() {
        switch(jQuery(this)[0].name){
            case 'Handelaar-binnen-EU':
                if(jQuery(this)[0].checked) {
                    jQuery('.bkd-form-part-spoelbewijzen').addClass('bkd-show');
                    
                    // Voeg change-listener pas toe wanneer de velden beschikbaar zijn
                    jQuery('.bkd-form-part-spoelbewijzen .radio-list input').change(function() {
                        if (jQuery(this).val() == 'true') {
                            jQuery('.bkd-form-part-ketenregister').addClass('bkd-show');
                        } else {
                            if(jQuery('.bkd-form-part-ketenregister').children().length < 9){
                                jQuery('.bkd-form-part-ketenregister').removeClass('bkd-show');
                            }
                        }
                    });
                } else {
                    jQuery('.bkd-form-part-spoelbewijzen').removeClass('bkd-show');
                }
            break;

            case 'Handelaar-buiten-EU':
                if(jQuery(this)[0].checked) {
                    jQuery('.bkd-form-part-ketenregister').addClass('bkd-show');
                } else {
                    if(jQuery('.bkd-form-part-ketenregister').children().length < 9){
                        jQuery('.bkd-form-part-ketenregister').removeClass('bkd-show');
                    }
                }
            break;

            case 'Broeier':
            case 'Teler':
            case 'Veredelaar':
                if(jQuery(this)[0].checked) {
                    jQuery('.bkd-form-part-loginmijnbkd').addClass('bkd-show');
                } else {
                    if(jQuery('.bkd-form-part-loginmijnbkd').children().length < 6){
                        jQuery('.bkd-form-part-loginmijnbkd').removeClass('bkd-show');
                    }
                }
            break;
        }
    });
});

// Verberg fieldset Loginmijnbkd