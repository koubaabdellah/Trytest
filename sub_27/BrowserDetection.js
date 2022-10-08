const BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.DetectedBrowser = this.browser;
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        if ((this.browser === 'Explorer' && this.version <= 11) || (!!window.MSInputMethodContext && !!document.documentMode)) {
            var baseURL = document.getElementsByTagName('base')[0].href;
            window.location = baseURL + 'UnsupBrowser.aspx';
        }
    },

    searchString: function (data) {
        var i, dataString;
        for (i = 0; i < data.length; i++) {
            dataString = data[i].string;
            this.versionSearchString = data[i].subString;
            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) { return; }
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },

    DetectedBrowser: "",

    dataBrowser:
        [
            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
            { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
            { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
            { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
        ]

};

window.addEventListener('DOMContentLoaded', function () {
    BrowserDetect.init();
});