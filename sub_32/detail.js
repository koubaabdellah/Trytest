(function ($) {
    $.nav_id = $.root.find('#nav_id');
    var tree;

    $.root.ready(function () {
        $('.ShowHide').click(function () {
            $('.moreinfo').toggle();
            $('.initial').toggle();
            event.preventDefault();
        });

        var $sticky = $('.sticky');
        if ($sticky.length && 'sticky' in $.fn) {
            //atlantisjs.load_js_file_if_not('sticky' in $.fn, '//cdnjs.cloudflare.com/ajax/libs/jquery.sticky/1.0.4/jquery.sticky.min.js').done(function () {
            $sticky.sticky({ topSpacing: 0, zIndex: 1000 });
            //});
        }

        $.root.find('a.detail-info-share-popup').click(function (e) {
            e.preventDefault();

            window.open($(this).attr('href'), 'sharer', 'toolbar=0, status=0, width=900, height=540');
        });

        $.root.on('click', 'a.refresh-cap', function (e) {
            e.preventDefault();

            $.root.find('img.watstaathier').attr('src', atlantisjs.base_url + 'files/watstaathier.php?t=' + new Date().getTime());
        });

        var error_message = $.root.find('div.form-error:first');

        if (error_message.length > 0)
            $('html, body').animate({
                scrollTop: (error_message.offset().top - 14)
            }, 2000);

        var map = $.root.find('#map');
        if (map.length) {
            var markers = $.root.find('input[name=markers]').val();

            if (!globalconfiguration.use_leaflet_map) {
                var googleMapsOptions = { maxZoom: Infinity, default_marker: atlantisjs.base_url + 'files/images/map-pin.png', streetViewControl: true, mapTypeControl: true, infoBox: false };

                var mapOptions;
                var mapOptionsString = $.root.find("input[name=map_options]").val(); // in detail\view.php laden we vanuit de resources de mapOptions in.
                if (mapOptionsString !== undefined && mapOptionsString !== "") {
                    mapOptions = JSON.parse(mapOptionsString);

                    if (mapOptions !== undefined)
                        googleMapsOptions = $.extend({}, googleMapsOptions, mapOptions);
                }

                if (markers != '[]') {
                    googleMapsOptions['markers'] = JSON.parse(markers);
                }

                googleMapsOptions.autoZoom = false;
                googleMapsOptions.zoom = 19;

                var map = new $.GoogleMaps(map, googleMapsOptions);
            } else {
                var leafletOptions = {
                    fullscreen: true,
                };

                var map = new $.LeafletMap(map, leafletOptions);

                if (markers != '[]') {
                    JSON.parse(markers).forEach(function (marker) {
                        map.addMarker(marker);
                    });
                }

                map.setCenter();
            }

      }

      if ($('#annotations-new')) {
        $('#annotations-new').parsley({
          errorsWrapper: '<div class="invalid-message"></div>',
          errorTemplate: '<div class="alert alert-warning" role="alert"></span>',
        });
      }

        $.root.find('.toegangen').each(function (i) {
            let keyToDeleteBeginPart = 'ordeningpage-' + this.getAttribute("archieftoegang");

            for (let i = localStorage.length-1; i >= 0;  --i) {
                let key = localStorage.key(i);

                if (key.startsWith(keyToDeleteBeginPart))
                    localStorage.removeItem(key);
            }

            $.root.off('keypress');
            $.root.on('keypress', 'ul li[data-archieftoegangid]', function (e) {
                var key = e.keyCode ? e.keyCode : e.which;
                if (key === 13) {
                    $(e.currentTarget).find('span.tree-node-icon').click();
                }
                return false;
            });
        });

        $('ul.toegangen').on('click', 'span.tree-node-icon', function (e) {
            // je klikt op het +- icoon en de parent is de li en de parent daarvan is de ul (daarop is het attribuut 'archieftoegang' gedefinieerd)
            var rootarchieftoegang = $(this).parent().parent().attr('archieftoegang');
            var current_item = $(this);
            var current = current_item.closest('li');
            var container = current.find('ul:first');
            var cur_archief_toegang = rootarchieftoegang;

            if (current.attr('data-archieftoegangid') != undefined)
                cur_archief_toegang = current.attr('data-archieftoegangid');

            current_item.find('ul.tree-node-current').removeClass('tree-node-current');

            if (container.html() != '') {
                current_item.find('ul.tree-node-current').removeClass('tree-node-current');

                if (container.is(':visible')) {
                    container.slideToggle();
                    var item_container = current.closest('ul');

                    if (!item_container.hasClass('tree'))
                        item_container.addClass('tree-node-current');
                }
                else
                    container.slideToggle().addClass('tree-node-current');

                current.toggleClass('open');
                // ivm LAG-47
                // current.closest('ul.tree').find('li.open').not(current_item.parents('li.open')).removeClass('open').find('ul:first').hide();
                //atlantisjs.storeLocal('tree-' + cur_archief_toegang + '_' + $('#xmlid').val(), current.closest('ul.tree').html(), 1);
            }
            else {
                container.html('<img src="' + atlantisjs.base_url + 'files/images/loading.gif" alt="Bezig met laden..." class="loading-small" />').show().closest('li').addClass('open');
                $.ajax({
                    url: atlantisjs.base_url + 'detail.php?form-action=get_ordening_schema', type: 'GET', async: true, data: 'nav_id=' + $.nav_id.val() + '&archieftoegang=' + cur_archief_toegang + '&parent_id=' + current.attr('data-containerid') + '&pagina=1&paginazoekvraagnummer=-1', success: function (response) {
                        if (response['records'] == true) {
                            //container.hide().html(response['html']).slideDown();
                            current_item.find('ul.tree-node-current').removeClass('tree-node-current');
                            current.closest('ul.tree').find('li.open').not(current_item.parents('li.open')).removeClass('open').find('ul').hide();
                            container.hide().html(response['html']).show().addClass('tree-node-current');
                            $.root.off('keypress');
                            $.root.on('keypress', 'ul li[data-archieftoegangid]', function (e) {
                              var key = e.keyCode ? e.keyCode : e.which;
                              if (key === 13) {
                                $(e.currentTarget).find('span.tree-node-icon').click();
                              }

                              return false;
                            });
                        }
                        else
                            container.html('<li>Geen elementen gevonden</li>');

                        //atlantisjs.storeLocal('tree-' + cur_archief_toegang + '_' + $('#xmlid').val(), current.closest('ul.tree').html(), 1);
                    }
                });
            }
        });

        var pagingClicked = false;
        $.root.on('keypress', 'a.ordening-paging', function (e) {
          var key = e.keyCode ? e.keyCode : e.which;
          if (key == 13) {
            $(this).click();
          }


          return false;
        })

        $.root.on('click', 'a.ordening-paging', function (e) {
            if (pagingClicked)
                return false;

            pagingClicked = true;

            e.preventDefault();
            e.stopPropagation();

            var item = $(this);
            var page = $(this).attr('data-page');
            var archieftoegang = $(this).closest('li.open').attr('data-archieftoegangid');
            var parent_id = $(this).closest('li').attr('data-containerid');
            var container = $(this).closest('li').find('ul:first');
            var nav_id = $.nav_id.val();
            var paginazoekvraagnummer = container.find('.paginazoekvraagnummer:first').val();

            if (paginazoekvraagnummer === undefined)
                paginazoekvraagnummer = -1;

            // Als data-archieftoegangid undefined is dan zoeken we de archieftoegang bij de archieftoegang. Dit heeft alleen betreking tot de allereerste knoop. 
            if (archieftoegang === undefined)
                archieftoegang = $(this).closest('ul.tree').attr('archieftoegang');

            $(this).closest('div.ordening-paging').after('<br /><img src="' + atlantisjs.base_url + 'files/images/loading.gif" alt="Bezig met laden..." class="loading-small" style="padding-top: 5px;" />');

            var cookie = atlantisjs.getLocalStorage('ordeningpage-' + archieftoegang + '_' + parent_id + '_' + page);
            if (cookie != '') {
                container.html(cookie);
                pagingClicked = false;
            }
            else {
                $.ajax(
                    {
                        url: atlantisjs.base_url + 'detail.php?form-action=get_ordening_schema',
                        type: 'GET',
                        async: true,
                        data: 'nav_id=' + nav_id + '&archieftoegang=' + archieftoegang + '&parent_id=' + parent_id + '&pagina=' + page + '&paginazoekvraagnummer=' + paginazoekvraagnummer,
                        success: function (response) {
                            if (response['records'] == true) {
                                container.html(response['html']);
                                atlantisjs.storeLocal('ordeningpage-' + archieftoegang + '_' + parent_id + '_' + page, container.html(), 1);
                            }
                            else {
                              container.html('<li>Geen elementen gevonden</li>');
                            }
                            pagingClicked = false;
                        }
                    });
            }
        });

        $.root.on('keypress', 'ul li.tree-node', function (e) {
          var key = e.keyCode ? e.keyCode : e.which;
          if (key === 13) {
            $(e.currentTarget).find('span.tree-node-icon').click();
          }

          return false;
        });

        $('ul.inleidingen').on('click', 'span.tree-node-icon', function (e) {
            var current_item = $(this);
            var current = $(this).parent();
            var container = current.find('ul:first');

            current_item.find('ul.tree-node-current').removeClass('tree-node-current');

            if (container.html() != '') {
                current_item.find('ul.tree-node-current').removeClass('tree-node-current');

                if (container.is(':visible')) {
                    container.slideToggle();
                    var item_container = current.closest('ul');

                    if (!item_container.hasClass('tree'))
                        item_container.addClass('tree-node-current');
                }
                else
                    container.slideToggle().addClass('tree-node-current');

                current.toggleClass('open');
                current.closest('ul.tree').find('li.open').not(current_item.parents('li.open')).removeClass('open').find('ul:first').hide();
            }
        });


        var bestanddelen = $.root.find('#bestanddelen');
        bestanddelen.on('click', 'span.tree-node-icon', function (e) {
            var current = $(this).parent();
            var container = current.find('ul:first');

            container.slideToggle();
            current.toggleClass('open');
        });

        $('a.zoekbinnendetail').colorbox();


        $('.zip-download').on('click', function (e) {
            e.preventDefault();

            var fileSize = $(this).attr('data-file-size');
            var target = $(this).attr('data-target');

            if (target !== "#") {
                let message = "onbekende grootte";
                if (parseInt(fileSize) > 0)
                    message = (fileSize / 1000).toFixed(2) + ' Mb';
                if (confirm('U staat op het punt om een bestand van ' + message + ' te downloaden. Wilt u doorgaan?')) {
                    window.open(target, '_blank');
                }
            }
        });

        $('#cm-detail-tabs a').click(function (e) {
            $(this).tab('show')
        })




        $('[data-result-href]').each(function (index, element) {
            var resultRef = $(element).attr('data-result-href');
            if (!resultRef)
                return;

            $.ajax({
                url: atlantisjs.base_url + resultRef + '&ajax=true',
                success: function (response) {
                    if (response.stylesheets) {
                        atlantisjs.load_ajax_css(response.stylesheets);
                    }

                    if (response.html) {
                        $(element).html(response.html);
                    }
                    
                    if (response.javascripts) {
                        atlantisjs.load_ajax_js(response.javascripts);
                    }

                    if (response.body_classes) {
                        response.body_classes.forEach(e => {
                            $('body').addClass(e);
                        });
                    }
                }
            });
        });
    });

    function commit_annotation_callback(response) {
        if (response == 'true')
            location.reload();
        else {
            $.colorbox({ html: response['html'] });

            if (chosen_callback) {
                var current = $.root.find('#cboxLoadedContent');

                current.find('select.custom-select-chosen').chosen({ search_contains: true }).wrap('<div class="chosen-container">');
                $.colorbox.resize();
            }
        }
    }

    function open_fullscreen() {
        var origin = window.location.origin;
        var pathname = window.location.pathname;

        window.location.href = origin + pathname + '?nav_id=' + $.nav_id.val() + '&id=' + $.root.find('#xmlid').val() + '&form-action=view-full';
    }

    window.addEventListener('message', function (event) {
        if (event.data == 'open_fullscreen') {
            open_fullscreen();
            return false;
        }
    });

    $("#resultjump, #paginajump").focus(function () {
        $(this).data("hasfocus", true);
    });

    $("#resultjump, #paginajump").blur(function () {
        $(this).data("hasfocus", false);
    });


    // Dynamisch URI.js ophalen en in de callback alle functies definieren/uitvoeren die hiervan gebruik maken
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/URI.js/1.19.2/URI.min.js', function ()
    //$.getScript('//medialize.github.io/URI.js/src/URI.min.js', function ()
    {
        //Als we binnen komen met id=-1, haal id uit hidden input en verander de url.
        var the_url = URI(window.location.href);
        if (the_url.query(true)['id'] == "-1") {
            the_url.setSearch("id", $("#xmlid").val());
            window.history.replaceState(null, document.title, the_url.toString());
        }

        $(document.body).keyup(function (ev) {
            // 13 is ENTER
            if (ev.which === 13 && $("#resultjump").data("hasfocus")) {
                JumpToResult();
            }
            if (ev.which === 13 && $("#paginajump").data("hasfocus")) {
                JumpToPagina();
            }
        });

        $(document).on('click', '#resultjumpsubmit', function () {
            JumpToResult();
        });

        $(document).on('click', '#paginajumpsubmit', function () {
            JumpToPagina();
        });

        function JumpToResult() {
            var the_url = URI(window.location.href);
            the_url.setSearch("positie", $("#resultjump").val() - 1).setSearch("id", "-1").removeSearch("index").removeSearch("skip_result");
            window.location.href = the_url.toString();
        }

        function JumpToPagina() {
            var paginanummer = $("#paginajump").val();
            if (paginanummer == "")
                return;

            paginanummer = parseInt($.trim(paginanummer)) - 1;
            var paginaXmlids = $('[data-gmpaginas]:empty').data('gmpaginas');

            if (paginanummer < 0)
                return;
            if (paginanummer > paginaXmlids.length)
                return;
            
            var gekozenpaginaXmlid = paginaXmlids[paginanummer];

            var the_url = URI(window.location.href);
            the_url.setSearch("id", gekozenpaginaXmlid).removeSearch("index").removeSearch("skip_result");
            window.location.href = the_url.toString();
        }
    })
        .fail(function (jqxhr, settings, exception) {
            console.error(exception);
        });



    $(document).on('click', '.digitaalbestandjumpbutton', function (e) {
        var element = $('input.digitaalbestandjump')
        HandleDigitaalbestandJump(element);

        e.preventDefault();
        return false;
    });

    $(document).on('keydown', 'input.digitaalbestandjump', function (e) {
        if (e.which === 13) {
            HandleDigitaalbestandJump(this);
            e.preventDefault();
            return false;
        }
    });

    function HandleDigitaalbestandJump(element) {
        var digitaalbestandvolgnummer = $(element).val() - 1;
        if (digitaalbestandvolgnummer < 0)
            digitaalbestandvolgnummer = 0;

        if (digitaalbestandvolgnummer > $(element).attr('max') - 1)
            digitaalbestandvolgnummer = $(element).attr('max') - 1;

        window.location.search = decodeURIComponent($(element).attr('data-digitaalbestandpage')).replace("[digitaalbestandvolgnummer]", digitaalbestandvolgnummer).replace("#", "");
    }


})(jQuery);