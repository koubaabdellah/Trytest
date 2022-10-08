(function ($) {
    var sorting, filters, search, $filterForm, $filterResultText, $filterTotal, params,
        $latitude, $longitude, $cityZip, $keyword, $keywordMobile, $distance, $distanceInput,
        $pagination, $postWrapper, $archiveWrapper, $allFilterElements, $resetFiltering,
        $geo, distance, $sorting, $distanceSelect, $loadmore, _counterCache;

    filters = {};

    distance = 10;

    search = {
        'query': '',
        'location': '',
        'lat': '',
        'lng': '',
        'distance': distance
    };

    // used for the non-sense frontend logic from #16465
    _counterCache = '';

    function get_params() {
        var $lat, $lng, filter;
        var params = parse_query_string(window.location.search.substr(1));

        $lat = $('#filter_lat');
        $lng = $('#filter_lng');
        if ($cityZip.length > 0 && typeof $cityZip.attr('readonly') === "undefined") {
            search.location = $cityZip.val();
        }

        if ($keyword.length > 0) {
            search.query = $keyword.val();
        }
        if ($keywordMobile.length > 0 && $keywordMobile.is(":visible")){
            search.query = $keywordMobile.val();
        }
        if ($distanceSelect.length > 0 && $lat.length > 0 && $lng.length > 0) {
            search.distance = $distance.slider('value');
            if($distanceSelect.is(":visible")) { // mobile
                search.distance = $distanceSelect.val();
            }

            if($lat.length > 0 && $lat.val() !== "" && $lng.length > 0 && $lng.val() !== "") {
                search.location = "";
            }else {
                search.lat = '';
                search.lng = '';
            }
            if($lat.length > 0 && $lat.val() !== "") {
                search.lat = $lat.val();
            }
            if($lng.length > 0 && $lng.val() !== "") {
                search.lng = $lng.val();
            }
        }

        $allFilterElements.each(function(i,f){
            filter = $(f).data('filter');
            filters[filter] = [];

            $(f).find('input.form-check-input:checked').each(function(k,v){
                filters[filter].push($(v).data('code'));
            });
        });
        if (!params.hasOwnProperty('sorting')) {
            params.sorting = 'date';
        }

        if(search.query.length === 0 && params['search[query]'] !== undefined) {
            search.query = params['search[query]'];
        }

        return {
            filter: filters,
            search: search,
            sorting: $sorting.val(),
            meta_types: params.hasOwnProperty('meta_types') ? params.meta_types : [],
            page_size: params.hasOwnProperty('page_size') ? params.page_size : 6,
            _page: params.hasOwnProperty('_page') ? params['_page'] : 1,
        };
    }

    function get_params_no_page() {
        var params = get_params();
        params._page = 1;
        return params
    }

    function pushHistory(params) {
        params['_page'] = params['_page'] || 1;
        var url, queryObj, queryString;
        url = window.location.pathname;
        queryObj = {
            filters: filters,
            sorting: params.sorting,
            page_size: params.page_size,
            post_type: params.post_type,
            meta_types: params.meta_types,
            '_page': params['_page']
        };
        if (search.query === undefined || search.query.length > 0) { // only search
            queryObj.search = { query: search.query };
        }
        if (search.location.length > 0 || (!!search.lat && !!search.lng)) { // search by distance
            if (!queryObj.hasOwnProperty('search'))
                queryObj.search = {};
            queryObj.search = search;
        }
        queryString = $.param(queryObj);
        if (queryString.length > 0)
            url += '?' + queryString;
        history.pushState(queryObj, document.title, url);
    }

    function getPosts(params, append, callback) {
        callback = callback || function (x) {};
        pushHistory(params);
        $.ajax({
            type: "GET",
            dataType: "json",
            url: ajaxurl,
            data: $.extend({}, params || get_params(), {
                action: 'posts_ajax',
                search: search,
                filters: filters,
                orderby: 'meta_value_num',
            }),
            success: function (data) {

                var html = "", resultString = "";
                $pagination.html(data.paginate);

                resultString = (data.totals === 0 || data.totals > 1) ? $filterResultText.data('multipleresults') : $filterResultText.data('singleresult');
                $filterResultText.html(resultString);
                $filterResultText.find('[data-text]').text(data.totals);
                $filterTotal.html(data.totals);

                // update the counters
                for (var type in data.counters) {
                    if (data.counters.hasOwnProperty(type) && type !== _counterCache) {
                        var vals = data.counters[type];
                        $('.counter-' + type).each(function () {
                            var $elem = $(this),
                                id = $elem.data('id');
                            $elem.text(vals.hasOwnProperty(id) ? vals[id] : 0);
                        })
                    }
                }

                if (hasNextPage()){
                    $loadmore.removeAttr('style');
                } else {
                    $loadmore.attr('style', 'display: none !important');
                }

                if (data.hasOwnProperty('noresult')){
                    $postWrapper.html(data.noresult);
                } else {
                    if (append){
                        html +=  $postWrapper.html();
                    }
                    $.each(data.items, function(i, item){
                        html += item.html;
                    });

                    $postWrapper.html(html);
                }

                handleSortingOptions();
                callback();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    function clearFilters() {
        $allFilterElements.find('input.form-check-input:checked').prop('checked', false);
        filters = {};
        $keyword.val("");
        $keywordMobile.val("");
        $cityZip.val("");
        clearDistance();
        clearGeo();
    }

    function clearDistance() {
        $distance.slider('value', distance);
        $distanceInput .text(distance + ' km');
        $distanceSelect.data('selectBoxSelectBoxIt').selectOption(0);
    }

    function clearGeo() {
        var $formGroup = $geo.closest('.form-group');
        var $input = $formGroup.find('.form-control');
        $formGroup.removeClass('current-location-active');
        $input.val('').removeAttr('readonly').focus();
        $('#filter_lat').remove();
        $('#filter_lng').remove();
    }

    function updatePosts(params) {
        getPosts($.extend({}, params || get_params(), window.articleFilterPresets || {}));
    }

    function updatePage(e, noScroll){
        e.preventDefault();
        var params = $.extend({}, parse_query_string($(this).attr('href').substr(1)));
        search.query = params['search[query]'];
        // Don't scroll when clicking "show more" on mobile.
        // See https://dpi.plan.io/issues/16254.
        if(noScroll !== true) {
            // Scroll to top of page.
            // See https://dpi.plan.io/issues/15548
            $('html, body').animate({ scrollTop: 0 }, 'fast', function () {});
        }
        var append = $('#load-more').is(':visible');
        getPosts(params, append);
    }

    function handleSortingOptions() {
        var params = parse_query_string(window.location.search.substr(1));
        $sorting.each(function(k,v){
            var $sortingSelectBox = $(v).selectBoxIt().data('selectBox-selectBoxIt'),
                $distanceOption = $(v).find("option[value='distance']"),
                distanceOptionIndex = $distanceOption.index();
            if (params['search[distance]'] !== "" && params['search[location]'] !== "") {
                $sortingSelectBox.enableOption(distanceOptionIndex);
            } else {
                if ($(v).find("option:selected").index() > 0){
                    $sortingSelectBox.selectOption(0);
                    $sortingSelectBox.disableOption(distanceOptionIndex);
                }
            }
        });
    }

    function changeSort(){
        // var params = parse_query_string(window.location.search.substr(1));
        // params.sorting = $(this).val();
        updatePosts();
    }

    function changeDistance(){
        if ($cityZip.val() !== "" && $('#filter_lat').val() !== "" && $('#filter_lng') !== ""){
            $resetFiltering.addClass('filter-active');
            updatePosts(get_params_no_page());
        }
    }

    function hasNextPage() {
        var currentPageNumber = $('.page-numbers.current');

        return currentPageNumber.next().length > 0;
    }

    $(function(){
        $filterForm = $('.filter-form');
        $filterResultText = $('[data-text="filter-result-text"]');
        $cityZip = $('#search_city_zip');
        $keyword = $('#search_keyword');
        $keywordMobile = $('#search_keyword-mobile');
        $distance = $('#distance');
        $distanceInput = $('#distance-input');
        $pagination = $('#pagination');
        $archiveWrapper = $('#archive-wrapper');
        $postWrapper = $('#post-wrapper');
        $allFilterElements = $('[data-filter]');
        $resetFiltering = $('[data-action="reset-filters"]');
        $geo = $('[data-action="get-location"]');
        $sorting = $('select[name="sorting"]');
        $distanceSelect = $('#distance-select');
        $loadmore = $('#load-more');
        $filterTotal = $('#filter-total');

        $sorting.on("change", changeSort);
        $distanceSelect.on("change", changeDistance);

        $filterForm.on('submit', function(e) {
            e.preventDefault();
            updatePosts();
        });
        $('#submit-search').on('click', updatePosts);

        // ajax paginating
        $pagination.on('click', '.page-numbers', updatePage);

        if ($distance.length > 0) {
            var distanceVal = ($distance.data('value') !== "") ? $distance.data('value') : distance;
            $distance.slider({
                range: "min",
                value: distanceVal,
                min: distance,
                max: 50,
                step: distance,
                slide: function(event, ui){
                    $distanceInput.text(ui.value + ' km');
                },
                stop: function(event, ui){
                    if($cityZip.val() !== "" && $('#filter_lat').val() !== "" && $('#filter_lng') !== "") {
                        $resetFiltering.addClass('filter-active');
                        updatePosts();
                    }
                }
            });
        }

        $filterForm.on('change', '.form-input-filter:not(.no-filtering)', function() {
            if ($(this).parent().parent().find('input:checked').length > 0) {
                _counterCache = $(this).data('group');
            } else {
                _counterCache = '';
            }
            $resetFiltering.addClass('filter-active');
            updatePosts(get_params_no_page());
        });

        // on key-up searching
        $keyword.on('keyup', function () {
            $resetFiltering.addClass('filter-active');
            updatePosts();
        });

        $('[data-action="toggle-filter"]').on('click', function(){
            $(this).closest('.filter-block').toggleClass('filter-closed');
        });

        /*
         * Trigger geo-location.
         * */
        if ($geo.length > 0) {
            $geo.on('click', function(){
                var $this = $(this),
                    $formGroup = $this.closest('.form-group'),
                    $input = $formGroup.find('.form-control');

                if($formGroup.hasClass('current-location-active')) {
                    clearGeo();
                    return;
                }

                var options = {
                    timeout: 5000,
                    maximumAge: 0
                };
                navigator.geolocation.getCurrentPosition(function(position){
                    $latitude = '<input class="geo" id="filter_lat" name="search[lat]" type="hidden" value="' + position.coords.latitude + '">';
                    $longitude = '<input class="geo" id="filter_lng" name="search[lng]" type="hidden" value="' + position.coords.longitude + '">';
                    $filterForm.append($latitude);
                    $filterForm.append($longitude);
                    $input.val($input.data('geoactive')).attr('readonly', 'readonly').focus();
                    $formGroup.addClass('current-location-active');

                }, function(error){
                    console.log(error);
                }, options);
            });
        }

        /*
         * Clear filters
         * */
        $resetFiltering.on('click', function(){
            if(!$(this).hasClass('filter-active')) return;
            $(this).removeClass('filter-active');
            clearFilters();
            updatePosts(get_params_no_page());
        });

        $loadmore.on('click', function(e){
            e.preventDefault();
            var currentPageNumber = $('.page-numbers.current');
            if (hasNextPage()){
                currentPageNumber.next().trigger('click', [true]);
            }
        });

        /**
         * select subcategories
         */
        $('.filter-category').on('change', function() {
            if ($(this).is(":checked")) {
                $(this).parent().find('.filter-subcategory').prop('checked', true);
            }
        });
    });

    $('#archive-theme-wrapper .theme-nav').on('click', 'a', function(e){
       // e.preventDefault();
       // var target = $(this).attr('href');
       // var targetPosition = $(target).offset().top - $('#header').height();

       // $('html, body').animate({ scrollTop: targetPosition }, 'fast', function () {});
    });

}($ || jQuery));
// Document vars
var $html = $('html'),
    $body = $('body'),
    $select = $('select:not(.gfield_select)'),
    $subMenuWrapper = $('.sub-menu-wrapper'),
    $subMenu = $('.block-sub-menu'),
    $domain = $('html').data('domain'),
    firstScriptTag = document.getElementsByTagName('script')[0];

$select.selectBoxIt({
    autoWidth: false,
    showEffect: "show",
    showEffectSpeed: 250,
    hideEffect: "hide",
    hideEffectSpeed: 250
});

$select.bind({
    // Binds to the 'open' event on the original select box
    "open": function () {
        // Adds the Twitter Bootstrap 'dropup' class to the drop down
        $(this).data("selectBox-selectBoxIt").dropdown.addClass("dropup");
    },
    // Binds to the 'close' event on the original select box
    "close": function () {
        // Removes the Twitter Bootstrap 'dropup' class from the drop down
        $(this).data("selectBox-selectBoxIt").dropdown.removeClass("dropup");
    }
});

if (typeof $.fn.slick === 'undefined') {
    var tag1 = document.createElement('script');
    tag1.src = $domain + "/wp-content/themes/actie-leer-netwerk/assets/js/slick.min.js";
    firstScriptTag.parentNode.insertBefore(tag1, document.getElementsByTagName('script')[0]);
}

function parse_query_string(query) {
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;  // Regex for replacing addition symbol with a space
    var decode = function (str) {return decodeURIComponent( str.replace(decodeRE, " ") );};
    var params = {}, e;
    while ( e = re.exec(query) ) {
        var k = decode( e[1] ), v = decode( e[2] );
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        }
        else params[k] = v;
    }
    return params;
}


function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function initPostSlider() {
    $('.post-slider').slick({
        mobileFirst: true,
        slidesToShow: 1,
        infinite: false,
        centerMode: false,
        dots: true,
        arrows: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 992,
                settings: "unslick"
            }
        ]
    });
}

var checkSlick = setInterval(function () {
    if (typeof $.fn.slick !== 'undefined') {
        clearInterval(checkSlick);

        /*
         * Init post slider
         *
         */
        initPostSlider();

    }
}, 10);

$body.on('click', '[data-action]', function (e) {
    var $this = $(this), action = $(this).data('action');

    switch (action){
        case 'previous-url' :
            e.preventDefault();
            previousUrl();
            break;
        case 'toggle-search':
            toggleSearch();
            break;
        case 'toggle-menu':
            toggleMenu();
            break;
        case 'toggle-filters':
        case 'result-mobile':
            toggleFilters();
            break;
        case 'toggle-submenu':
            toggleSubmenu.call(this);
            break;
        default:
            return true;
    }
});

function previousUrl() {
    var fallbackURL = '/';

    if (window.location.href.indexOf('/artikel/koploper/') > 0) {
        fallbackURL = '/koplopernetwerk/koploperoverzicht/'
    }
    if (window.location.href.indexOf('/koplopernetwerk/koploperoverzicht/') > 0) {
        fallbackURL = '/koplopernetwerk/'
    }

    if (window.location.href.indexOf('/artikel/ruimte-in-de-regels/') > 0) {
        fallbackURL = '/ruimte-in-de-regels/weggenomen-belemmeringen/'
    }
    if (window.location.href.indexOf('/ruimte-in-de-regels/weggenomen-belemmeringen/') > 0) {
        fallbackURL = '/ruimte-in-de-regels/'
    }

    if (window.location.href.indexOf('/artikel/actieleren/') > 0) {

        fallbackURL = '/actieleren/aan-de-slag/'
    }
    if (window.location.href.indexOf('/actieleren/aan-de-slag/') > 0) {
        fallbackURL = '/actieleren/'
    }

    if (window.location.href.indexOf('/artikel/nieuws/') > 0) {
        fallbackURL = '/artikelen/nieuws/'
    }
    if (window.location.href.indexOf('/artikel/agenda/') > 0) {
        fallbackURL = '/artikelen/agenda/'
    }
    if (window.location.href.indexOf('/artikelen/agenda/') > 0 || window.location.href.indexOf('/artikelen/nieuws/') > 0) {
        fallbackURL = '/artikelen/'
    }

    if (window.location.href.indexOf('/arbeidsinnovatie/ambassadeur') > 0) {
        fallbackURL = '/over-actie-leer-netwerk/themas/arbeidsinnovatie'
    }
    if (window.location.href.indexOf('/beperken-uitstroom/ambassadeur') > 0) {
        fallbackURL = '/over-actie-leer-netwerk/themas/beperken-uitstroom'
    }
    if (window.location.href.indexOf('/gezond-werken/ambassadeur') > 0) {
        fallbackURL = '/over-actie-leer-netwerk/themas/gezond-werken'
    }
    if (window.location.href.indexOf('/leven-lang-ontwikkelen/ambassadeur') > 0) {
        fallbackURL = '/over-actie-leer-netwerk/themas/leven-lang-ontwikkelen'
    }
    if (window.location.href.indexOf('/meer-uren-werken/ambassadeur') > 0) {
        fallbackURL = '/over-actie-leer-netwerk/themas/meer-uren-werken'
    }
    if (window.location.href.indexOf('/werken-naar-talent/ambassadeur') > 0) {
        fallbackURL = '/over-actie-leer-netwerk/themas/werken-naar-talent'
    }

    if (document.referrer == "") {
        window.location.href = fallbackURL;
    } else {
        window.history.back();
    }
}

function toggleSearch() {
    $html.toggleClass('search-open');
}
function toggleMenu() {
    $html.toggleClass('menu-open');
}

function toggleFilters(){
    if ($html.hasClass('filters-open')) {
        $html.addClass('filters-open-animate');
        $html.removeClass('filters-open');
        $html.removeClass('filters-open-animate');
    } else {
        $html.addClass('filters-open');
    }
}

function toggleSubmenu(){
    if ($subMenuWrapper.hasClass('menu-open')) {
        $subMenuWrapper.removeClass('menu-open');
    } else {
        $subMenuWrapper.addClass('menu-open');
    }
}

window.addEventListener("load", function(){
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#ffffff",
                "text": "#42145f"
            },
            "button": {
                "background": "#ca1d60",
                "text": "#deedf7"
            }
        },
        content: {
            header: 'Cookies worden op deze site gebruikt!',
            message: 'Wij gebruiken cookies om je gebruikerservaring te verbeteren.',
            dismiss: 'Begrepen!',
            allow: 'Sta cookies toe',
            deny: 'Afwijzen',
            link: 'Lees verder',
            href: 'http://cookiesandyou.com',
            close: '&#x274c;',
            policy: 'Cookie Policy',
            target: '_blank'
        },
        "position": "bottom-right"
    })});


(function ($) {

    $(document).ready(function () {
        $('[data-toggle-custom="dropdown"]').on('click', function(e){
            e.preventDefault();
            $(this).parent().toggleClass('show');
            $(this).next().toggleClass('show');
        });
    });

})(jQuery);