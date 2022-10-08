(function ($)
{
    var nav_id		= $.root.find('[name="nav_id"]').val();
    var view		= $.root.find('[name="type_view"]').val();
    var page_nr		= 1;
    var result_url  = './resultaten.php';
    var scrollposition    =  $(window).scrollTop();
    var loadedPages = [];
    var loading_more_results = false;

    $.root.ready(function () {
        var $result_form = $('#testform');
        if ($result_form.length) {
            result_url = $result_form.attr('data-resultaatpagina');
        }

        $.root.on('click', 'body', function (e) {
            if ($(e.target).attr('name') != 'result_limit' && $(e.target).attr('id') != 'unlimited-results-checkbox' && $(e.target).attr('id') != 'unlimited-results-label')
                $.root.find('#unlimited-results-div').hide();
        });

        $.root.find('.custom-textfield-resultamount').on('click', function () {
            $.root.find('#unlimited-results-div').show();
        });

        var timeout = null;
        $.root.find('.custom-textfield-resultamount').on('change', function () {
            if (globalconfiguration.wcag)
                return false;

            clearTimeout(timeout);

            var form = $(this).closest('form');

            timeout = setTimeout(function () {
                form.submit();
            }, 750);
        });

        if ($.root.find('#unlimited-results-checkbox').prop('checked')) {
            $(window).scroll(function () {
                if (checkVisible($('.custom-table-row:last, .gallery-table-td:last, #brugge-resultaten article:last'), 'visible')) {
                    var scroll = $(window).scrollTop();
                    //alleen bij scroll down
                    if (scroll > scrollposition) {
                        more_results(loadedPages);
                    }

                    scrollposition = scroll;
                }
            });
        }

        if ($.root.find('.infinite-button').hasClass('active')) {
            $("input[name='result_limit']").prop("disabled", true);

            $(window).scroll(function () {
                if (checkVisible($('.custom-table-row:last, .gallery-table-td:last, #brugge-resultaten article:last'), 'visible')) {
                    var scroll = $(window).scrollTop();
                    //alleen bij scroll down
                    if (scroll > scrollposition) {
                        more_results(loadedPages);
                    }

                    scrollposition = scroll;
                }
            });
        }

        $.root.on('keypress', 'a.more-filters:not([aria-controls])', function (e) {
            e.preventDefault(); 

            var key = e.which;
            if (key == 13) {
              $('a.more-filters:not([aria-controls])').click();
              return false;
            }
        });

        $.root.on('click', 'a.more-filters:not([aria-controls])', function () {
            var current_id = $(this).attr('data-id');

            if (!$(this).hasClass('open')) {
                $(this).addClass('open').text('Minder filters');

                $.root.find('#hidden_filter-' + current_id).removeClass('element-hidden');

                $.root.find('#hidden_filter-' + current_id + ' input.custom-checkbox').customInput();
            }
            else {
                $(this).removeClass('open').text('Meer filters');

                $.root.find('#hidden_filter-' + current_id).addClass('element-hidden');
            }
        });

        // sync filter checkboxes.
        var filter_checkbox_selector = '[type=checkbox][name^="filters["][value]';
        $.root.on('change', filter_checkbox_selector, function (e) {
            $(filter_checkbox_selector).filter(function () {
                return this !== e.target
                    && this.name === e.target.name
                    && this.value === e.target.value;
            })
                .prop('checked', e.target.checked)
                // @see customInput.jquery.js
                .trigger('updateState');
        });

        $.root.on('click', '.infinite-button', function () {
            $('#unlimited-results-checkbox').click();
        });

        $(".top-slider-div").width($(".custom-table-div table").width());
        $(".custom-table-div").scroll(function () {
            $(".custom-table-div-top-slider").scrollLeft($(".custom-table-div").scrollLeft());
        });

        $(".custom-table-div-top-slider").scroll(function () {
            $(".custom-table-div").scrollLeft($(".custom-table-div-top-slider").scrollLeft());
        });

        $(window).on('resize', function () {
            if ($(".custom-table-div-top-slider").css("display") != "none") {
                $(".top-slider-div").width($(".custom-table-div table").width());
            }
        });


        if (typeof $clamp !== 'undefined') {
            document.querySelectorAll('.results-card__list').forEach(function (element) {
                $clamp(element, { clamp: 4 })
            });

            if (!Object.entries) {
                Object.entries = function (obj) {
                    var ownProps = Object.keys(obj),
                        i = ownProps.length,
                        resArray = new Array(i); // preallocate the Array
                    while (i--)
                        resArray[i] = [ownProps[i], obj[ownProps[i]]];

                    return resArray;
                };
            }

            for (const [key, value] of Object.entries(globalconfiguration.line_clamp_config)) {
                if (document.querySelectorAll(key).length > 0) {
                    document.querySelectorAll(key).forEach(function (element) {

                        $clamp(element, { clamp: value });
                    });
                }
            }
        }

        check_federatedsearch();

        $.root.find('#result_sortfield').on('change', function (e) {
            if (!globalconfiguration.submit_on_change) {
                return false;
            }

            let $selectedSortFieldOption = $(e.target.options[e.target.selectedIndex]);
            let defaultSortType = $selectedSortFieldOption.attr('data-default-sorttype');
            let $selectedSortType = $(e.target.form).find('#result_sorttype')

            $selectedSortType.val(defaultSortType);
            e.target.form.submit();
        });

        const toggleButton = "div.header-search-form-toggle-button";
        $.root.find(toggleButton).on('click', function () {
            const searchForm = $.root.find('div.header-search-form');
            const toggleText = $(`${toggleButton} span`);
            const toggleIcon = $(`${toggleButton} i.fa`);

            if (searchForm.hasClass('open')) {
                toggleText.text("Open zoekscherm");

                toggleIcon.removeClass('fa-minus');
                toggleIcon.addClass('fa-plus');

                searchForm.removeClass('open');
                searchForm.hide(500);
            }
            else {
                toggleText.text("Verberg zoekscherm");

                toggleIcon.removeClass('fa-plus');
                toggleIcon.addClass('fa-minus');

                searchForm.addClass('open');
                searchForm.show(500);
            }
        });
    });

    window.addEventListener('message', function (e) {
        if(e.data === 'more_results' && !loading_more_results)
        {
            more_results(loadedPages);
        }
    });

    function more_results(loadedPages)
    {
        if(typeof view === 'undefined' || view === 'map')
        {
            return;
        }
        var endlessScrollEnabled = $.root.find('#disableEndlessScroll').length == 0;

        if (endlessScrollEnabled) {
            if (jQuery.inArray(page_nr, loadedPages) == -1) {
                $.root.find('.modal').show();
                loading_more_results = true;

                loadedPages.push(page_nr);
                $.ajax({
                    // url: '/resultaten.php',
                    url: result_url,
                    type: 'GET',
                    data: {
                        'form-action': 'endless_' + view,
                        'nav_id': nav_id,
                        'page': page_nr,
                        'endless_scroll' : 'on' 
                    },
                    success: function (response) {
                        var html = response['html'];
                        
                        var disableInput = '';

                        //Bij bijv. de gallery view wordt er direct gestart met de tabel en niet met een parent div zoals de loist view. 
                        //De jquery find() functionaliteit gaat zoeken binnen de parent en negeert de parent zelf. Daarom eerst wrappen.
                        $wrapped = $('<div>' + html + '</div>');
                        if ($wrapped.find('.disableEndlessScroll').length > 0)
                            disableInput = '<input type="hidden" id="disableEndlessScroll" name="disableEndlessScroll" value="true" />';

                        if (view.toLowerCase() == 'gallery')
                        {
                            if ($wrapped.find('article').length > 0)
                            {
                                $.root.find('#brugge-resultaten').append(disableInput);
                                $.root.find('#brugge-resultaten').append($(html).html());
                            }
                            else
                            {
                                var $gallery_table = $.root.find('.gallery-table');
                                $gallery_table.append(disableInput);
                                if ($gallery_table.is('table'))
                                {
                                    $gallery_table.append($wrapped.find('tr.is_endless_scroll'));
                                }
                                else
                                {
                                    $gallery_table.append($wrapped.find('div.gallery-table-td'));
                                }
                            }
                        }
                        else
                        {
                            if ($wrapped.find('article').length > 0)
                            {
                                $.root.find('#brugge-resultaten').append(disableInput);
                                $.root.find('#brugge-resultaten').append($(html).html());
                            }
                            else
                            {
                                $.root.find('.custom-table').append(disableInput);
                                $.root.find('.custom-table').append($(html).find('.custom-table.is_endless_scroll > tbody'));
                            }
                        }
                        page_nr++;

                        $.root.find('.modal').hide();
                        loading_more_results = false;
                    },
                    error: function (response) {
                        $.root.find('.modal').hide();
                        loading_more_results = false;
                    }
                });
            }
        }
    }

        function check_federatedsearch()
        {
        $("div[data-zoekvraag]").each(function ()
        {
            var dropdownlist = $(this);
            var zoekvraag = $(this).attr('data-zoekvraag');
            var nav_id = $(this).attr('data-nav');
            var resultaat_url = $(this).attr('data-resultaatpagina');

            var dropdown_menu = $(this).children('ul.dropdown-menu');
            var ExternResultTotal = $('.ExternResultTotal');
            var TotalLoader = $(this).find('button > .fa-spinner');
            var singleResultHref = $('a#singleExternalResult');
            var caret = $(this).find('span.caret');
            let beschrijvingssoortids = $(this).attr('data-beschrijvingssoortids').split(',');

            $.ajax({
                 //url: './resultaten.php?form-action=federatedsearch_status&zoekvraag=' + zoekvraag,
                url: resultaat_url,
                    data: {
                        'form-action': 'federatedsearch_status',
                        'zoekvraag': zoekvraag
                    },
                    type: 'GET',
                    success: function (response)
                    {
                        var check_again = false;
                        var total = 0;

                        if (beschrijvingssoortids[0] != "")
                        {
                            response = response.filter(function (item)
                            {
                                return beschrijvingssoortids.indexOf(item.BESCHRIJVINGSSOORTID) != -1;
                            });
                        }


                        if (!$('div.ExternalResults').is(":visible"))
                        {
                            if (response.length == 1)
                            {
                                $('span.total', singleResultHref).before(response[0].BESCHRIJVINGSSOORT + ': ');
                                $(singleResultHref).show();
                                $(dropdownlist).hide();
                            }
                            else
                            {
                                $(dropdownlist).show();
                                $(caret).show();
                                $(singleResultHref).hide();
                            }
                        }

                        if (!$(dropdown_menu).html().trim().length)
                        {
                            for (var i = 0; i < response.length; i++)
                                $(dropdown_menu).append('<li data-beschrijvingssoortid="' + response[i].BESCHRIJVINGSSOORTID + '"><a href="#" target="_blank" rel="noopener">' + response[i].BESCHRIJVINGSSOORT + ' (<span class="total"><i class="fa fa-spinner fa-spin fa-1x fa-fw"></i></span>)</a></li>');
                            setTimeout(check_federatedsearch, 10);
                        }
                        else
                        {
                            for (var i = 0; i < response.length; i++)
                            {
                                if (response[i].EXTERNRESULTAATREADY == "true" && response[i].EXTERNRESULTAATURL)
                                {
                                    var current_element = $(dropdown_menu).find('li[data-beschrijvingssoortid="' + response[i].BESCHRIJVINGSSOORTID + '"]');
                                    var url = "";

                                    var comp = new RegExp(location.host);
                                    if (comp.test(response[i].EXTERNRESULTAATURL_IN_EIGEN_VIEW))
                                    {
                                        url = response[i].EXTERNRESULTAATURL_IN_EIGEN_VIEW;
                                        url += 'resultaten.php?nav_id=' +nav_id;
                                        url += '&zoekvraag=' +zoekvraag;
                                        url += '&form-action=federated';
                                        url += '&beschrijvingssoort=' + response[i].BESCHRIJVINGSSOORTID;
                                        url += '&result-action=federated';
                                        url += '&sortfield=';
                                        url += '&total=' + response[i].TOTAAL;
                                        url += '&name=' + response[i].BESCHRIJVINGSSOORT;
                                    }
                                    else
                                       url = response[i].EXTERNRESULTAATURL;

                                    if (response.length == 1)
                                    {
                                        $('span.total', singleResultHref).html(response[i].TOTAAL)
                                        $(singleResultHref).attr('href', url);
                                        $(singleResultHref).show();
                                        $(dropdownlist).hide();
                                    }
                                    else
                                    {
                                        $(current_element).find('a').attr('href', url);
                                        $(dropdownlist).show();
                                        $(caret).show();
                                        $(singleResultHref).hide();
                                }

                                    $(current_element).find('span.total').empty().html(response[i].TOTAAL);

                                    total += parseInt(response[i].TOTAAL);
                                    $(ExternResultTotal).html(total);
                                }
                                else
                                    check_again = true;
                        }

                        if (check_again)
                            setTimeout(check_federatedsearch, 2500);
                        else
                            $(TotalLoader).remove();
                    }
            }
            });

        });
    }

    $(document).on('keydown', 'input.resultpagejump', function (ev)
    {
        if (ev.which === 13)
        {
            var page = $(this).val() -1;
            if (page < 0)
                page = 0;

            if (page > $(this).attr('max') -1)
                page = $(this).attr('max') -1;

            window.location.search = decodeURIComponent($(this).attr('data-resultpage')).replace("[page]", page);
            return false;
    }
    });

    function checkVisible(elm, evalType)
    {
        evalType = evalType || "visible";

        var vpH = $(window).height(), // Viewport Height
            st = $(window).scrollTop(), // Scroll Top
            y = $(elm).offset().top,
            elementHeight = $(elm).height();

        if (evalType === "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
        if (evalType === "above") return ((y < (vpH + st)));
    }

    $('.collapsible-filters').on('click', function () {
        if ($(this).hasClass('collapsible-filters--active')) {
            $(this).removeClass('collapsible-filters--active');
            $(this).attr('aria-expanded', 'false');
            $(this).find(">:first-child").removeClass('fa-chevron-up');
            $(this).find(">:first-child").addClass('fa-chevron-down');
            $(this).next().css('max-height', '0');
        } else {
            $(this).addClass('collapsible-filters--active');
            $(this).attr('aria-expanded', 'true');
            $(this).find(">:first-child").addClass('fa-chevron-up');
            $(this).find(">:first-child").removeClass('fa-chevron-down');
            $(this).next().css('max-height', $(this).next()[0].scrollHeight + parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom')) + 'px');
        }
    })


})(jQuery);