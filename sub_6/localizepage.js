define([
	"dojo/date/locale",
	"dojo/cookie",
	"dojo/topic",
	"dojo/i18n!app/nls/arcgismicrosite"
], function (locale, dojoCookie, topic, i18n) {
	return {
		loadLabels: function () {
			[].forEach.call(document.querySelectorAll("[data-nls]"), function (el) {
					var str = el.getAttribute('data-nls');
					el.innerHTML = i18n[str];
					if (str === "main-signin-link") {
						topic.publish("translation/complete", true); 
					}
			});

			function substitute(i18n, key, substitution){
				i18n[key] = dojo.string.substitute(i18n[key], substitution);
			}
		},

		loadMetaTagContent: function () {
      [].forEach.call(document.querySelectorAll("[data-meta-content-nls]"), function (el) {
				el.setAttribute("content", i18n[el.getAttribute('data-meta-content-nls')]);
			});
		},

		initialize: function () {
			if (typeof $c != 'undefined' && $c.SERVER != "www.arcgis.com" && $c.DEBUG_MODE) {
				return;
			}
			this.loadLabels();
			this.loadMetaTagContent();
			var hooks = document.querySelectorAll('.attrHook');
      
      [].forEach.call(hooks, function(hook, ind) {
				var id = hook.id || hook.getAttribute('data-nls'),
          attr = id.substring(id.lastIndexOf('_') + 1);

        document.getElementById('#' + id.replace("_" + attr, "")).setAttribute(attr, hook.innerHTML);
      });
		}
	}
});
