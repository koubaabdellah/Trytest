jQuery(function ($) {
    //console.log(document);
    $(document).on('change', 'input.resultaat-selectie', function (e) {
        var $check = $(this),
            $result_selection = $('.result-selection'),
            request = {
                id: this.value,
                index: $check.data('index'),
                checked: this.checked * 1,
                'form-action': 'toggle_selection',
                ajax: 1
            }
            ;

        $check.attr('disabled', true);
        $result_selection.addClass('loading');

        $.ajax({
            url: window.location,
            data: request,
            timeout: 3000
        })
            .then(function (response)
            {
            	if (response.maxAanvraagbaarBereikt)
            	{
            		$check.removeAttr('checked');
            		$result_selection.removeClass('loading');
            		alert('Het maximaal aantal aanvragen is bereikt.');
            	}
            	else
            		$result_selection.replaceWith(response.html);
            })
            .fail(function () {
                $result_selection.removeClass('loading');
            })
            .always(function () {
                $check.attr('disabled', false);
            });
    });
});