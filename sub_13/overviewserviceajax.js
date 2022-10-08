/*
| ----------------------------------------------------
| Overview Service Ajax
| ----------------------------------------------------
*/
$(document).ready(function () {
    if ($(".js-items__container").length > 0) {
        /*
        | --------------------------------------------------
        | Helper variables
        | --------------------------------------------------
        */
        var lastestRequestTimestamp;
        var itemsContent                = $(".js-items__container");
        var itemsLoadMore               = $(".js-items__loadmore");
        var itemsCounter                = $(".js-items__itemscount");
        var itemsPaging                 = $(".js-items__paging");
        var searchMessage               = $(".js-items__searchmessage");
        var itemsCountLabelMultiple     = $(".js-items__countlabel__multiple");
        var itemsCountLabelSingular     = $(".js-items__countlabel__singular");

        /*
        | --------------------------------------------------
        | Localized variables
        | --------------------------------------------------
        */
        var loadMoreText = $(itemsLoadMore).text();

        /*
        | --------------------------------------------------
        | Search & Filter variables
        | --------------------------------------------------
        |
        | Explanation of terms:
        | Page              >
        | SearchQuery       >
        */
        var currentpage = Math.abs(urlQueryParameters.getSingle('page'));
        var searchFilters = {
            page: currentpage < 1 ? 1 : currentpage
        };


        /*
        | ----------------------------------------------------
        | Event listeners
        | ----------------------------------------------------
        */
        $(itemsLoadMore).on("click",
            function (e) {
                e.preventDefault();
                searchFilters = urlQueryParameters.getAll();
                if (!searchFilters.page) {
                    searchFilters.page = 1;
                }
                searchFilters.page++;
                $(this).text('Laden...');

                getItems(
                    //success
                    function () {
                        $(itemsLoadMore).html(loadMoreText);
                    },
                    //fail
                    function () {
                        $(itemsLoadMore).hide();
                    }
                );
            }
        );
        itemsContent.on('click', '.js-items__paging',
            function (e) {
                e.preventDefault();
                clearItemsPage();
                searchFilters = urlQueryParameters.getFromString($(this).attr('href'));
                ScrollTo('.js-items__container')
                getItems(
                    //success
                    function () {
                        $(itemsLoadMore).html(loadMoreText);
                    },
                    //fail
                    function () {
                        $(itemsLoadMore).hide();
                    }
                );
            }
        );
        $("input.js-searchinput").on("keypress",
            function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    clearItemsPage();

                    searchFilters = urlQueryParameters.getFromString($(this).closest('form').serialize().replace(/[^&]+=\.?(?:&|$)/g, ''))
                    searchFilters.page = 1;

                    getItems(
                        //success
                        function () {
                        },
                        //fail
                        function () {
                        }
                    );
                }
            }
        );
        $('input.js-searchinput[type="radio"]').on("change",
            function (e) {
                e.preventDefault();
                clearItemsPage();

                searchFilters = urlQueryParameters.getFromString($(this).closest('form').serialize().replace(/[^&]+=\.?(?:&|$)/g, ''))
                searchFilters.page = 1;

                var labelText = $(this).next('label').text();
                console.log(labelText);
                console.log($('.block-search__subtext').text());
                $('.block-search__subtext').text("(zoek op " + labelText.toLowerCase() + ")");

                getItems(
                    //success
                    function () {
                    },
                    //fail
                    function () {
                    }
                );
            }
        );
        $("select.js-searchinput").on("change",
            function (e) {
               e.preventDefault();
                clearItemsPage();

                searchFilters = urlQueryParameters.getFromString($(this).closest('form').serialize().replace(/[^&]+=\.?(?:&|$)/g, ''))
                searchFilters.page = 1;

                getItems(
                    //success
                    function () {
                    },
                    //fail
                    function () {
                    }
                );
            }
        );
        $('.js-search-form-reset').on("click",
            function (e) {
                e.preventDefault();
                clearItemsPage();
                $('form .js-searchinput').prop('checked', false);
                $('form .js-searchinput[type="text"]').val("");
                searchFilters = urlQueryParameters.getFromString($(this).closest('form').serialize().replace(/[^&]+=\.?(?:&|$)/g, ''));
                searchFilters.page = 0;

                getItems(
                    //success
                    function () {
                    },
                    //fail
                    function () {
                    }
                );
            }
        );

        /*
        | ----------------------------------------------------
        | Helper functions
        | ----------------------------------------------------
        */
        function buildUrl() {
            var url = location.origin + location.pathname;
            var parametersCount = 0;

            for (var key in searchFilters) {
                if (searchFilters.hasOwnProperty(key)) {
                    var value = searchFilters[key];
                    if (value != undefined && value !== "" && value.length > 0) {
                        url = urlQueryParameters.update(key, value, url);
                        parametersCount++;
                    } else if (value === 0 || value > 0) {
                        url = urlQueryParameters.update(key, value, url);
                    } else {
                        url = urlQueryParameters.update(key, "", url);
                    }
                }
            }

            return url;
        }

        function getItems(callbackSuccess, callbackFailed) {
            var url = buildUrl();

            history.replaceState(null, "SBA_" + location.pathname + "f_url", url);
            sessionStorage.setItem("SBA_" + location.pathname + "f_url", url);
            $(itemsLoadMore).show();

            lastestRequestTimestamp = Date.now();

            getAjaxData(
                url,
                { timeStamp: lastestRequestTimestamp },
                function (data) {
                    var currentRequestTimestamp = parseInt(data.TimeStamp, "10");

                    if (lastestRequestTimestamp !== currentRequestTimestamp)
                    {
                        return false;
                    }

                    if (data.Status !== 200)
                    {
                        callbackFailed();

                        return false;
                    }
                    else
                    {
                        callbackSuccess();
                    }

                    $(searchMessage).html("");

                    $(data.RenderedResult).appendTo(itemsContent).addClass("faded--out animated fadeIn");
                                
                    $(itemsCounter).html(data.ItemsCount);                    
                    if (data.Paging && data.Paging.TotalPages <= data.Paging.OriginalPage)
                    {
                        $(itemsLoadMore).hide();
                    }

                    if (data.Paging && data.Paging.ItemsCount === 1)
                    {
                        $(itemsCountLabelMultiple).hide();
                        $(itemsCountLabelSingular).show();
                    }
                    else
                    {
                        $(itemsCountLabelMultiple).show();
                        $(itemsCountLabelSingular).hide();
                    }

                    return true;
                }
            );
        }

        function clearItemsPage() {
            $(itemsContent).html("");
        }

        function getAjaxData(url, data, callback) {
            $.ajax({
                method: "POST",
                url: url.replace(/ /g, "+"),
                dataType: "json",
                data: data
            })
            .done(function (data) {
                callback(data);
            })
            .fail(function (data) {
                callback(data);
            });
        }

        /*
        | --------------------------------------------------
        | Initialize first page
        | --------------------------------------------------
        */
        //getItems(
        //    //success
        //    function () {

        //    },
        //    //fail
        //    function () {

        //    }
        //);
    }
});