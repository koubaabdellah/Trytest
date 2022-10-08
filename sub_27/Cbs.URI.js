// het Uri object wordt gebruikt voor het afhandelen van de data in de address bar. 
var Uri = window.Uri = {
    // hier staan alle data die meegegeven is in de url. 
    historyPrefix: '?',
    replaceState: function(url){
        var title = OData.Table ? OData.Table.Title : document.title;
        history.replaceState({ url: url, title: title }, title, url);
    },
    pushState: function(url, title){
        var title = title;
        if (typeof title === "undefined") { 
            title = OData.Table ? OData.Table.Title : document.title;
        };
        history.pushState({ url: url, title: title }, title, url);
    },
    object: {},
    // Na processen van de url worden al de waardes in het object geplaatst als properties.
    processURI: function () {
        this.clearURI();
        uri = $(location).attr('search').toString().substring(1);
        var uriSplitted = uri.split('&');
        for (var pli in uriSplitted) {
            var p = uriSplitted[pli].split('=');
            if (p.length == 2) {
                this.setProperty(p[0], decodeURIComponent(p[1]));
            }
        }
    },
    // set Uri wordt gebruikt om de url aan te passen na dat de push heeft plaats gevonden.
    setURI: function () {
        var loc = Uri.historyPrefix;
        $.each(this.object, function (i, t) {
            loc += (loc == Uri.historyPrefix) ? i + '=' + encodeURIComponent(t) : '&' + i + '=' + encodeURIComponent(t);
        });

        var TableId = '';
        var uriSplitted = loc.toString().substring(1).split('&');
        for (var pli in uriSplitted) {
            var p = uriSplitted[pli].split('=');
            if (p.length == 2) {
                if (p[0] == 'tableId') {
                    TableId = decodeURIComponent(p[1]);
                }
            }
        }

        var alreadyPushed = $(location).get(0).href.indexOf(TableId) > -1;
        if (alreadyPushed) {
            Uri.replaceState(loc);
        }
        else {
            Uri.pushState(loc);
        }
    },
    // setLanguageChangedState wordt gebruikt om de language state te pushen in de history en url.
    setLanguageChangedState: function () {
        var loc = Uri.historyPrefix;
        var language = encodeURIComponent('_la') + '=' + encodeURIComponent(Uri.object['_la']);

        loc += language;
        $.each(this.object, function (i, t) {
            if (i != '_la') {
                loc += '&' + i + '=' + encodeURIComponent(t);
            }
        });
        Uri.replaceState(loc);
    },
    setProperty: function (property, value) {
        this.object[property] = value;
    },
    getProperty: function (property) {
        return this.object[property];
    },
    clearURI: function () {
        this.object = {};
    },
    isDeeplink: function () {
        return (typeof this.object.tableId != 'undefined');
    }
}