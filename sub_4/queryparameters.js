/*
| ----------------------------------------------------
| Query parameters helper functions
| ----------------------------------------------------
*/
var urlQueryParameters = {
    getSingle : function (key) {
        var regex   = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);

        key         = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    getAll: function () {
        var urlParams;
        var match;
        var urlParams = {};
        var pl = /\+/g;
        var search = /([^&=]+)=?([^&]*)/g;
        var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        var query = window.location.search.substring(1);

        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }

        return urlParams;
    },
    getFromString: function (val) {
        val = $.trim(val);
        var urlParams;
        var match;
        var urlParams = {};
        var pl = /\+/g;
        var search = /([^&=]+)=?([^&]*)/g;
        var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        if (val.length > 0 && val.substring(0, 1) == '?') {
            val = val.substring(1);
        }
        while (match = search.exec(val)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }

        return urlParams;
    },
    set : function (key, value) {
        location.href = urlQueryParameters.update(key, value, location.href)
    },
    update : function (key, value, uri) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";

        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    } 
}