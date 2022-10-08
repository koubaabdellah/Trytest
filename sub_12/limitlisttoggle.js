(function($) {
    $(document).ready(function(){

        $("ul.limitlist").each(function() {
            var treshold = ($(this).attr('data-limit')) ? ($(this).attr('data-limit')) : 10;
            var teller = 1;
            $(this).find('li.limitlist-item').each(function( ) {
                if (teller>treshold) {
                    $(this).addClass('limitlist-over limitlist-hide');
                }
                teller++;
            })
        })

        $(".limitlist-toggle").click(function(){
            if ($(this).html() == Drupal.t('Show all')) {
                $(this).html(Drupal.t('Show less'));
            } else {
                $(this).html(Drupal.t('Show all'));
            }
            $(this).parent().parent().find('li.limitlist-over').toggleClass('limitlist-hide');
            $(this).parent().find('span').toggleClass('down up');
            return false;
        });

    });
})(jQuery);

