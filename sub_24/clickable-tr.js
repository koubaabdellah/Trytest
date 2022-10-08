jQuery(function ($) {
    if (window.innerWidth < 768) {
        return;
    }
     var
        // rijcellen zonder link
        selector = '.custom-table-row[data-id][data-expandable] > *:not(.custom-table-row-td-actions), .custom-table-row[data-id][data-expandable] > a.bekijkdetail',
        url_params = atlantisjs.get_url_params(location.search.replace(/\?/, ''));

    $.root.find(selector).css('cursor', 'pointer');

    
    $.root.on('click', selector, function (e) {
        var
            $this = $(this),
            $tr = $this.closest('.custom-table-row[data-id]'),
            $drawer_tr = $tr.next(),
            colspan,
            params,
            $include,
            closed;


        if ($this.is('a[href]') && !$this.is('a.bekijkdetail')) {
            e.stopPropagation();
            return;
        }

        e.preventDefault();

        if (!$drawer_tr.length) {
            $drawer_tr = $('<tr />', {
                class: 'closed drawer'
            }).insertAfter($tr);

            params = {
                id: $tr.data('id'),
                nav_id: url_params.nav_id,
                'form-action': 'drawer',
                index: $tr.data('index')
            };
            if ('groep_id' in url_params) {
                params.groep_id = url_params.groep_id;
            }

            $include = $('<hx:include />');
            $include.attr('src', (atlantisjs.base_url || '/') + 'detail.php?' + $.param(params));
            $include.html('<div class="loader"><i class="fa fa-spin fa-spinner"></i> De informatie wordt ingeladen&hellip;</div>');

            colspan = 0;
            $tr.find('> *').each(function () {
                var $td = $(this);
                colspan += $td.attr('colspan') || 1;
            });

            $drawer_tr.append(
                $('<td />', {
                    class: 'custom-table-row-td',
                    colspan: colspan
                }).append($include)
            );

            if (hinclude) {
                hinclude.run();
            } else {
                $drawer_tr.remove();
                alert('Er is iets fout gegaan.');
            }
        }

        closed = $drawer_tr.is('.closed');

        $drawer_tr.toggleClass('closed', !closed);
        $tr.toggleClass('closed', !closed);
        $tr.addClass('visited');

        // console.log({$tr: $tr[0], $drawer_tr: $drawer_tr[0], e: e});
    });
});
