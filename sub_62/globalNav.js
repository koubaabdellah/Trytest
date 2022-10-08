define([
	"dojo/date/locale",
	"dojo/cookie",
	"dojo/topic",
	"dojo/i18n!app/nls/arcgismicrosite",
  "dojo/domReady!"
], function (locale, dojoCookie, topic, i18n) {
	return {

    initialize: function () {
      esriGlobalNav.createHeader({
        targetElm: ".esri-header-barrier",
        menuData: this.defaultNavStructure
      });
      // force use of %20 instead of + to encode spaces (#558)
      var form = document.querySelector(".esri-header-search-dialog-form");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = document.getElementById("esri-header-search-dialog-control");
        var value = encodeURIComponent(input.value);
        window.location.href = "./home/search.html?q=" + value;
      });
    },

    substituteL: function (i18n, key, substitution){
      i18n[key] = dojo.string.substitute(i18n[key], substitution);
    },

    defaultNavStructure: {
      header: {
        theme: "web",
        // brand: {
        //   label: "ArcGIS Online",
        //   href: "../features/features.html",
        //   brandText: i18n["site-title"]
        // },
        menus: [[
          { label: i18n["arcgis-online-nav-link-overview"], href: "../features/features.html", data: {"telem-click": "features index"}},
          { label: i18n["arcgis-online-nav-link-pricing"], href: "../features/plans/pricing.html", data: {"telem-click": "pricing"}},
          { label: i18n["main-nav-link-map"] , href: "/apps/mapviewer/index.html", data: {"telem-click": "map viewer"}},
          { label: i18n["main-nav-link-scene"], href: "/home/webscene/viewer.html", data: {"telem-click": "scene viewer"}},
          { label: i18n["main-nav-link-help"], href: "http://doc.arcgis.com/en/arcgis-online/", data: {"telem-click": "help"}}
        ]],
        search: {
          label: i18n["mobile-query_placeholder"],
          hide: false,
          inline: false,
          dialog: {
            prefix: "esri-header-search-dialog",
            action: "home/search.html",
            label: "ArcGIS Online",
            "submitLabel": i18n["main-query_placeholder"],
            "cancelLabel": i18n["aCancel"],
            "queryLabel": i18n["main-query_placeholder"]
          }
        },
        account: {
          label: "Your Profile",
          controls: {
            signin: i18n["main-signin-link"]
          }
        }
      }
    }
	}
});
