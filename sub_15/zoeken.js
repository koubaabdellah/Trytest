let ShowHideTweedeZoek; // Definiëer hem zodat de pagina hem kan vinden

(function ($)
{
    var form = $.root.find('#searchform');
    var map;
    $.search_form_fields = $.root.find('#search-form-fields');
    $.keuzelijst_zoeken = $.root.find('#keuzelijst-zoeken');

    $.root.ready(function () {
        if (globalconfiguration.__HIDE_SUBBESCHRIJVINGSGROEPEN__) {
            $.root.on('click', 'div.search-selection-i-root > div.custom-checkbox > div.custom-checkbox > label', function () {
                var current = $(this);
                var current_sublist = current.closest('div.search-selection-i-root').find('div.search-selection-i-sublist');

                if (current.hasClass('checked'))
                    current_sublist.addClass('element-hidden');
                else
                    current_sublist.removeClass('element-hidden');
            });
        }

        $.root.delegate('.formfields-info', 'mouseover', function ()
        {
            $(this).next().show().css({ top: ($(this).position().top - 3), left: ($(this).position().left + 30) });
        }).delegate('.formfields-info', 'mouseout', function ()
        {
            $(this).next().hide();
        });

        $.root.delegate('input.beschrijvingsgroep', 'click', function () {
            update_beschrijvingssoorten($(this));
        });

        var checkedGroep = $.root.find('input.beschrijvingsgroep:checked').last();
        if (checkedGroep.length > 0) {
            update_beschrijvingssoorten(checkedGroep);
        }

        var groups = $.root.find('input.selectall');

        if (groups.filter(':checked').length != groups.length) {
          $('.status').text('Alles is geselecteerd.');
        } else {
          $('.status').text('Alles is gedeselecteerd.')
        }

        $.root.on('click', 'a.toggle-all', function (e)
        {
            var groups = $.root.find('input.selectall');

            if (groups.filter(':checked').length != groups.length) {
              groups.prop('checked', true).attr('checked', 'checked');
              $('.status').text('Alles is geselecteerd.');
            } else {
              groups.prop('checked', false).removeAttr('checked');
              $('.status').text('Alles is gedeselecteerd.')
            }

            groups.trigger('updateState');
            update_search_fields();

            return false;
        });

        if (globalconfiguration.__ZOEKEN_IN_BUTTON__) {
            $('.zoeken_in_button').on('click', () => {
                $('#search-selection').addClass('active');
                $(body).append('<div class="modal-backdrop fade in"></div>')
            });

            $('#search-selection .fa').on('click', () => {
                $('#search-selection').removeClass('active');
                $('.modal-backdrop').remove();
            })
        }

        if ($.root.find('.selecter-div').is(':visible'))
        {
            setInterval(function ()
            {
                var niksIsAlles = $.root.find('#groepen-niks-is-alles');

                if (niksIsAlles.length == 0 || niksIsAlles.val() == '0')
                {
                    if ($.root.find('.selectall:checked').length == 0)
                        $.root.find('#search-form-fields').html('Geen zoekvelden gevonden!');
                }
            }, 5);
        }

        //// IE7 & IE8 bugfix
        //if (!$.support.leadingWhitespace)
        //{
        //    $.root.on('keypress', '#search-form-fields input[type=text]', function (e)
        //    {
        //        if (e.keyCode == 13)
        //        {
        //            //atlantisjs.start_loading();
        //            $(this).closest('form').append('<input type="hidden" name="btn-submit" value="Zoeken" />').submit();
        //        }
        //    });
        //}

        $.root.on('click', 'button.btn-empty', function (e) {
          var currentUrl = window.location.href;
          var results = new RegExp('[\?&]nav_id=([^&#]*)').exec(window.location.href);
          var nav_id = results ? results[1] : '';

          e.preventDefault();
          e.stopPropagation();

          window.location.href = currentUrl.split('?')[0] + '?cleanform=true' + (nav_id ? '&nav_id=' + nav_id : '');
          return false;
        });

        $.root.on('change', 'select.custom-select-soort', set_toegang_options);

        $.root.on('click', 'a.select-all', function (e)
        {
            e.preventDefault();

            var current = $(this).parent().find('select');

            if (current.val() == '' || current.val() == null || current.val() == 'null')
                current.find('option').attr('selected', 'selected').prop('selected', true);
            else
                current.find('option').prop('selected', false);

            current.change().trigger('liszt:updated');

            if (current.val() == null)
            {
                $('html, body').animate({
                    scrollTop: (current.parent().offset().top - 7)
                }, 10);
            }
        });

        $.root.on('click', 'ul.token-input-list', function (e)
        {
            var input = $(this).find('input:first');

            if (!input.is(':focus'))
                input.focus();
        });

        $.root.on('click', 'a.btn-submit-maps-location', function (e)
        {
            e.preventDefault();

            if (!globalconfiguration.use_leaflet_map) {
                map.search({ address: $.root.find('#googlemap_address').val() });
            } else {
                map.setCenter();
            }
        });

        $.root.on('keypress', '#googlemap_address', function (e)
        {
            if (e.which == 13)
            {
                map.search({ address: $(this).val() });
                e.preventDefault();
                return false;
            }
        });

        $.root.on('click', 'body', function (e)
        {
            $.root.find('div.token-input-dropdown').hide();
        });

        if (!(globalconfiguration.web_root === location.pathname || /\/zoeken\.php/.test(location.pathname) || $('input[name="zoeken[beschrijvingsgroepen][]"]:visible').length) && document.getElementById('search-form-fields')) {
            // op andere pagina's gewoon de formulier velden initialiseren zonder velden te posten.
            init_form_fields();
        }

        $.root.on('focusout', 'input.IsRange_van', function (e)
        {
            var IsRange_van = $(this);
            var zoekveldnaamVan = IsRange_van.attr('data-zoekveldnaam');

            $(".IsRange_tot").each(function ()
            {
                var IsRange_tot = $(this);
                var zoekveldnaamTot = IsRange_tot.attr('data-zoekveldnaam');
                if (zoekveldnaamTot === zoekveldnaamVan && (IsRange_tot.val() === '' || IsRange_tot.val() == null))
                {
                    IsRange_tot.val(IsRange_van.val());
                }
            });
        });

        var showTweedeZoek = false;
        $("input[name*='waarde']").each(function ()
        {
            if ($(this).val())
                showTweedeZoek = true;
        });

        if (showTweedeZoek)
            ShowHideTweedeZoek();

        $.root.on('click', 'a.switch_eenvoudig_uitgebreid', function (event) {
            event.preventDefault();

            if ($(this).html() == $(this).attr("data-uitgebreidzoeken"))
            {
                $(this).html($(this).attr("data-eenvoudigzoeken"));
                $(".uitgebreid").removeClass("element-hidden");
                init_map(1);
            }
            else
            {
                $(this).html($(this).attr("data-uitgebreidzoeken"));
                $(".uitgebreid").addClass("element-hidden");
            }
        });
    });

    function update_beschrijvingssoorten(current)
    {
        var ChildrenSelected = false;

        if ((current.hasClass('root') && globalconfiguration.__DONT_CHECK_SUBBESCHRIJVINGSGROEPEN__) || !globalconfiguration.__DONT_CHECK_SUBBESCHRIJVINGSGROEPEN__) {
            var selection = current.closest('div.search-selection-i');
            selection.find('div.search-selection-i-sublist input.beschrijvingsgroep')
                .attr('checked', (current.is(':checked') ? 'checked' : ''))
                .prop('checked', (current.is(':checked') ? !globalconfiguration.__DONT_CHECK_SUBBESCHRIJVINGSGROEPEN__ : false))
                .trigger('updateState');

            selection.find('input.beschrijvingssoort')
                .attr('checked', (current.is(':checked') ? 'checked' : ''))
                .prop('checked', (current.is(':checked') ? true : false));
        }

        // Maatwerk specifiek voor Ede configurabel met de key: __DONT_CHECK_SUBBESCHRIJVINGSGROEPEN__
        if (globalconfiguration.__DONT_CHECK_SUBBESCHRIJVINGSGROEPEN__) {
            if (current.hasClass('search-selection-i-child')) {
                var subselection = current.closest('div.search-selection-i-sublist');

                subselection.find('input.beschrijvingssoort').each(function () {
                    var beschrijvingssoort = $(this);
                    var beschrijvingsgroep = beschrijvingssoort.closest('div.search-selection-i').find('input.beschrijvingsgroep');

                    if (beschrijvingsgroep.is(':checked'))
                        ChildrenSelected = true;

                    beschrijvingssoort.attr('checked', (beschrijvingsgroep.is(':checked') ? 'checked' : ''))
                        .prop('checked', (beschrijvingsgroep.is(':checked') ? true : false));

                });
            }

            if (!ChildrenSelected && current.hasClass('search-selection-i-child')) {
                var root = current.closest('div.search-selection-i-root');
                root.find('input.beschrijvingssoort')
                    .attr('checked', ($('input.root', root).is(':checked') ? 'checked' : ''))
                    .prop('checked', ($('input.root', root).is(':checked') ? true : false));
            }
        }

        update_search_fields();
    }

    function update_search_fields()
    {
        // preserve formdata before clearing search_form_fields with a loader.
        var formdata = form.serialize();

        $.search_form_fields.html(atlantisjs.loading_img_html);
        $.keuzelijst_zoeken.html(atlantisjs.loading_img_html);

        var url = form.attr('action');

        if (url.indexOf('?') > -1) {
            url = url + '&';
        } else {
            url = url + '?';
        }
        url = url + 'form-action=formfields';

        var params = new URLSearchParams(window.location.search);
        if (params.has('type_zoeken')) {
            url += '&type_zoeken=' + params.get('type_zoeken');
        }

        $.ajax({
            method: 'POST',
            async: true,
            url: url,
            data: formdata
        })
            .then(function (response) {
                if (response['status'] == true) {
                    atlantisjs.load_ajax_js(response['javascripts']);
                    atlantisjs.load_ajax_css(response['stylesheets']);
                }

                $.search_form_fields.html(response['html']);
                $.search_form_fields.find('select.custom-select-chosen').chosen({ search_contains: false });
                init_form_fields();
            }
            );

        if ($.keuzelijst_zoeken.length)
        {
            form.ajaxSubmit({
                url: form.attr('action') + '?form-action=keuzelijst_zoeken',
                type: 'post',
                async: true,
                success: function (response)
                {
                    if (response['status'] == true)
                        atlantisjs.load_ajax_js(response['javascripts']);

                    $.keuzelijst_zoeken.html(response['html']);
                }
            });
        }
    }

    function init_form_fields()
    {
        init_map(1);

        $.root.find('input.custom-select-multiple').each(function ()
        {
            var current = $(this);
            var fields = [];

            if (current.attr('value') != '')
            {
                var items = current.attr('value').split('&&');

                for (i = 0; i < items.length; i++)
                    fields.push({ id: items[i], name: items[i] });
            }

            var parent = current.parent(".custom-form-field-input");

            var formaction = globalconfiguration.web_root + 'zoeken.php';

            var beschrijvingssoorten = $.find('input.beschrijvingssoort:checked');
            var bs_ids = '';
            $(beschrijvingssoorten).each(function ()
            {
                var current_bs = $(this).val();
                if (bs_ids != '')
                    bs_ids += ',';
                bs_ids += current_bs;
            });

            current.tokenInput(formaction + '?form-action=suggestions&fieldname=' + $(this).attr('data-field-name') + '&beschrijvingssoorten=' + bs_ids, {
                searchDelay: 400,
                minChars: 0,
                animateDropdown: false,
                prePopulate: fields,
                appendTo: parent[0],
                tokenLimit: $(this).attr('data-keuzelimit'),
                parentfield: $(this).attr('data-parent-field'),
                preventDuplicates: true
            });
        });


        $.root.find('select.wcag-keuzelijst:not(.initialized)').each(function () {
            var $select = $(this),
                $form = $select.closest('form'),
                value = ($select.data('value').length === 0
                    ? []
                    : $select.data('value').toString().split('&&')
                    /*.map(function (value) {
                        return {
                            id: value,
                            value: value
                        };
                    })*/
                ),

                value_set = false;

            var dataSourceSettings = {
                serverFiltering: true,
                transport: {
                    read: {
                        url: globalconfiguration.web_root + 'zoeken.php'
                    },
                    parameterMap: function (data, type) {
                        if (type === "read") {
                            var newdata = {
                                'form-action': 'suggestions',
                                fieldname: $select.data('fieldName'),
                                beschrijvingssoorten: $form
                                    .find('input.beschrijvingssoort:checked')
                                    .map(function () { return this.value; })
                                    .get()
                                    .join(',')
                            };

                            if (data.hasOwnProperty('filter')
                                && Array.isArray(data.filter.filters)
                                && data.filter.filters.length
                            ) {
                                newdata.q = data.filter.filters[0].value;
                            }

                            if (globalconfiguration.keuzelijst_infinite_scroll) {
                                newdata.skip = data.skip;
                                newdata.top = data.pageSize;
                                newdata.page = data.page;
                            }

                            return newdata;
                        }
                        return data;
                    }
                }
            }

            if (globalconfiguration.keuzelijst_infinite_scroll) {
                dataSourceSettings['serverPaging'] = true;
                dataSourceSettings['pageSize'] = 80;
                dataSourceSettings['schema'] = {
                    data: 'data',
                    total: 'total'
                }
            }

            var datasource = new kendo.data.DataSource(dataSourceSettings);

            $select.addClass('initialized');

            const placeholder = $(this).attr('data-placeholder');

            // prevent duplicate ids
            $('#'+this.id+'-list').remove();


            var kendoSettings = {
                autoBind: false,
                delay: 400,
                minLength: 1,
                dataTextField: "name",
                dataValueField: "id",
                // https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/filter
                placeholder: placeholder || 'Selecteer...',
                messages: {
                    clear: 'leegmaken',
                    deleteTag: 'verwijder',
                    nodata: 'Niets gevonden.',
                    singleTag: 'keuze(s) geselecteerd'
                },
                dataSource: datasource,
                value: value,
            }

            if (globalconfiguration.keuzelijst_infinite_scroll) {
                kendoSettings['virtual'] = {
                    itemHeight: 28,
                    placeholderTemplate: 'Laden...',
                    valueMapper: function (options) {
                        $.ajax({
                            url: globalconfiguration.web_root + 'zoeken.php',
                            type: 'GET',
                            data: {
                                value: options.value,
                                valueMapper: true,
                                'form-action': 'suggestions',
                                fieldname: $select.data('fieldName'),
                                beschrijvingssoorten: $form
                                    .find('input.beschrijvingssoort:checked')
                                    .map(function () { return this.value; })
                                    .get()
                                    .join(',')
                            },
                            success: function (dataItems) {
                                options.success(dataItems);
                            }
                        });
                    }
                };
            }

            $select.kendoMultiSelect(kendoSettings);

            if (globalconfiguration.wcag) {
                var input = $select.parent().find('input[role="listbox"]');
                var label = $select.parents('.custom-form-field').find('label.custom-form-field-label--text');
                var forLabel = label.attr('for');
                input.attr('id', forLabel + '-listbox');
                label.attr('for', forLabel + '-listbox');
            }

            if (value.length) {
                datasource.filter({});
                datasource.one('change', function () {
                    // console.log('initial load, set value');
                    $select.data('kendoMultiSelect').value(value);
                });
            }

            // verander listbox naar combobox:
            // combobox: A composite widget containing a single-line textbox and another element such as listbox or grid,
            // that can dynamically pop up to help the user set the value of the textbox.
            // https://www.digitala11y.com/combobox-role/
            // requires aria-controls and aria-expanded
            var select_id = $select.attr('id'),
                $input = $('input[aria-describedby="' + select_id +'_taglist"]');

            $input.attr({
                role: 'combobox',
                'aria-controls': select_id + '_listbox'
            });
        });

        set_toegang_options();


        if ($(".activeer_uitgebreid_zoeken").length > 0)
            $(".switch_eenvoudig_uitgebreid").click();

        if ($(".activeer_tweede_zoeken").length > 0)
            ShowHideTweedeZoek();
    }

    function set_toegang_options()
    {
        var soort = $.root.find('select.custom-select-soort');
        var toegang = $.root.find('select.custom-select-toegang');

        toegang.find('option').attr('disabled', 'disabled');

        soort.find('option:selected').each(function ()
        {
            toegang.find('option[data-parent-value=' + $(this).val().replace(" ", "\\\ ") + ']').attr('disabled', false);
        });

        toegang.find('option:selected:disabled').attr('selected', false).change();

        toegang.trigger('liszt:updated');
    }

    function init_map(tries)
    {
        if (!$.root.find('#map-canvas').length)
            return;

        if (!globalconfiguration.use_leaflet_map)
        {
            if ($.GoogleMaps == undefined)
            {
                if (tries < 20)
                    setTimeout(function () { init_map(tries + 1) }, 100);
            }
            else
            {
                var googleMapsOptions =
                {
                    drawControl:
                    {
                        polygon: true,
                        circle: true,
                        config:
                        {
                            fillColor: '#49bc1c',
                            fillOpacity: 0.15,
                            strokeColor: '#49bc1c',
                            draggable: true,
                            editable: true,
                            polygoncomplete: polygon_callback,
                            circlecomplete: circle_callback,
                            clearcoords: clearcoords_callback
                        }
                    },
                    streetViewControl: true,
                    overviewMapControl: true,
                    mapTypeControl: true
                };

                $.gmap_coords = $.root.find('input.gmaps-coords');
                $.gmap_zoom = $.root.find('input.gmaps-zoom');
                map = new $.GoogleMaps($.root.find('#map-canvas'), googleMapsOptions);
                $.location_type = $.root.find('input.location-type');
                $.location_value = $.root.find('input.location-value');
            }
        }

        else {
            if ($.LeafletMap == undefined) {
                if (tries < 20)
                    setTimeout(function () { init_map(tries + 1) }, 100);
            }
            else {

                var leafletOptions = {
                    fullscreen: true,
                    drawControl: {
                        position: 'topright',
                        draw: {
                            polygon: {
                                showArea: true,
                                allowIntersection: false,
                                shapeOptions: {
                                    color: "rgb(51, 136, 255)",
                                },
                            },

                            // disable toolbar item by setting it to false
                            circle: {
                                shapeOptions: {
                                    color: "rgb(51, 136, 255)",
                                },
                            },
                            rectangle: false,
                            polyline: false,
                            marker: false,
                            circlemarker: false
                        },
                    },
                    search: true,
                };

                map = new $.LeafletMap($.root.find('#map-canvas'), leafletOptions);
                $.location_type = $.root.find('input.location-type');
                $.location_value = $.root.find('input.location-value');
            }
        }
    }

    function polygon_callback(polygon)
    {
        $.location_type.val('polygon');

        var coordinates = (polygon.getPath().getArray());

        $.location_value.val(coordinates.toString());
    }

    function circle_callback(circle)
    {
        $.location_type.val('radius');

        var center = circle.getCenter().toString();
        var latlong = center.substring(1, (center.length - 1)).split(',');

        $.location_value.val('{\'center\': \'' + latlong[0].trim() + ',' + latlong[1].trim() + '\', \'radius\': \'' + circle.getRadius() + '\'}');
    }

    function rectangle_callback(rectangle)
    {
        /*$.location_type.val('coords');

        var coordinates = (rectangle.getPath().getArray());

        $.location_value.val(coordinates.toString());*/
    }

    function clearcoords_callback()
    {
        $.location_type.val('');
        $.location_value.val('');
    }

    ShowHideTweedeZoek = function()
    {
        if ($('#tweedezoek').is(":visible"))
        {
            $('#tweedezoeklink span').removeClass('icon-minus').addClass('icon-plus');
            $("#tweedezoek").hide("blind", null, 500);
        }
        else
        {
            $('#tweedezoeklink span').removeClass('icon-plus').addClass('icon-minus');
            $("#tweedezoek").show("blind", null, 500);
        }
  }

    $('#searchform').submit(function () {

        FillHiddenGlobalFields();

        let elem = $('a.switch_eenvoudig_uitgebreid');

        if (elem != undefined && $(elem).length > 0) {
            if ($(elem).html() != $(elem).attr("data-eenvoudigzoeken")) {
                $('div.custom-form-field.uitgebreid').find('input.custom-textfield').val("");
                $('div.custom-form-field.uitgebreid').find('select').val("");
            }
        }

        if ($('#groepen-niks-is-alles').length > 0)
        {
            var alleGroepenStaanUitgevinkt = true;
            $('input.beschrijvingsgroep').each(function () {
                if ($(this).is(':checked'))
                    alleGroepenStaanUitgevinkt = false;
            });

            if (alleGroepenStaanUitgevinkt)
            {
                $('input.beschrijvingsgroep').each(function () {
                    var current = $(this);
                    var selection = current.closest('div.search-selection-i');

                    current.attr('checked', 'checked')
                        .prop('checked', true);

                    selection.find('div.search-selection-i-sublist input.beschrijvingsgroep')
                        .attr('checked', 'checked')
                        .prop('checked', true)
                        .trigger('updateState');

                    selection.find('input.beschrijvingssoort')
                        .attr('checked', 'checked')
                        .prop('checked', true);

                });
            }
        }

        return true;
    });

    FillHiddenGlobalFields = function ()
    {
        var globalValue = $('div.visibleGlobalField').find(':text').val();

        $('div.hiddenGlobalField').each(function () {
            $(this).find(':text').val(globalValue);
        });
    }


})(jQuery);
