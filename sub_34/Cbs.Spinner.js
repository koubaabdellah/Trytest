// CBS Spinner 
var Spinner = window.Spinner = (function () {
    var _showSpinner = function () {
        $("div.spinner-container").show();
    };

    var _hideSpinner = function () {
        $("div.spinner-container").hide();
    };

    return {
        showSpinner: _showSpinner,
        hideSpinner: _hideSpinner
    };
})();