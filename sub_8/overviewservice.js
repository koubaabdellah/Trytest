/*
| ----------------------------------------------------
| Overview Service
| ----------------------------------------------------
*/
$(document).ready(function () {
    /*
    | ----------------------------------------------------
    | Event listeners
    | ----------------------------------------------------
    */
    //$(".js-searchinput").keypress(
    //    function (e) {
    //        if (e.keyCode == 13) {
    //            e.preventDefault();
    //            loadFilteredResults(1, $(this).closest('form'));
    //        }
    //    }
    //);
});

/*
| ----------------------------------------------------
| Helper functions
| ----------------------------------------------------
*/
function loadFilteredResults(page, _this) {
    var baseUrl     = location.origin + location.pathname + location.search;
    var searchQuery = $(_this).serialize().replace(/[^&]+=\.?(?:&|$)/g, '');

    //if (typeof searchQuery !== 'undefined' && searchQuery.length > 0) {
    //    baseUrl = urlQueryParameters.update("searchQuery", searchQuery, baseUrl);
    //}
    //if (typeof page        !== 'undefined' && page >= 1) {
    //    baseUrl = urlQueryParameters.update("page", page, baseUrl)
    //}

    window.location.href = baseUrl;
}