'use strict';

var codeVersion = "a3380439eb64bc261cca19dbeaeeab12a4467eca"
var hostname = ""
function getPageLangScriptPath() {
  var pageLang = 'ru';

  try {
    pageLang = document.getElementsByTagName("html")[0].lang || "ru";
  } catch (e) {
    // okay
  }

  return hostname + '/i18n/' + pageLang + '.js' + '?v=' + codeVersion;
}

document.addEventListener('DOMContentLoaded', function () {
  window.documentContentLoaded = true;

  function onError(event) {
    var message = 'The script ' + event.target.src + ' did not load correctly.'
    if (!window.Rollbar) {
      if (!window.rollbarQueue) {
        window.rollbarQueue = []
      }
      window.rollbarQueue.push({ message, payload: event })
    }
    console.error(message)
  }

  function addScript(data) {
    var script = document.createElement('script');
    script.async = false;
    script.src = data.url;
    script.onerror = onError;
    if (data.nomodule) {
      script.setAttribute("nomodule", "");
    }
    document.body.appendChild(script);
  };
  addScript({ url: getPageLangScriptPath() })

  var FILES = [{"url":"https://a.static2.aviasales.com/helios-assets/manifest.1ccfec130bc759fe9bf5.js"},{"url":"https://a.static2.aviasales.com/helios-assets/rollbar_config.e03bbe0ea91173b83f93.js"},{"url":"https://a.static2.aviasales.com/helios-assets/7476.cd8039bf52f8b19bb049.js"},{"url":"https://a.static2.aviasales.com/helios-assets/rollbar_sdk.261b1c0a5804da434c6b.js"},{"url":"https://a.static2.aviasales.com/helios-assets/6253.ddc55e5bc0a1e1e72938.js"},{"url":"https://a.static2.aviasales.com/helios-assets/worker_registrator.331f717a78d7eff51964.js"},{"url":"https://a.static2.aviasales.com/helios-assets/40.72b827961eb0014a5ceb.js"},{"url":"https://a.static2.aviasales.com/helios-assets/7712.5df4b4418dc8168630d0.js"},{"url":"https://a.static2.aviasales.com/helios-assets/1143.c5faea821c33764ff380.js"},{"url":"https://a.static2.aviasales.com/helios-assets/5928.09a4ebdc787fad331b14.js"},{"url":"https://a.static2.aviasales.com/helios-assets/5700.cbd3c2c9bafe422d6380.js"},{"url":"https://a.static2.aviasales.com/helios-assets/wds.c61796db39fb78d94c33.js"},{"url":"https://a.static2.aviasales.com/helios-assets/css_variables.8f4cc9cdce8bf0c05cea.js"},{"url":"https://a.static2.aviasales.com/helios-assets/429.246ba5386c479f986932.js"},{"url":"https://a.static2.aviasales.com/helios-assets/6797.ef7887a471c263ce7a69.js"},{"url":"https://a.static2.aviasales.com/helios-assets/9489.06cd32c8a4b8673cbdac.js"},{"url":"https://a.static2.aviasales.com/helios-assets/298.b427edff5ed37ccb2d9a.js"},{"url":"https://a.static2.aviasales.com/helios-assets/1418.a117f8b5cb8594ae4d77.js"},{"url":"https://a.static2.aviasales.com/helios-assets/697.a8883cd6a92ebc626ff9.js"},{"url":"https://a.static2.aviasales.com/helios-assets/8731.39ed40583cdc42fe7c7a.js"},{"url":"https://a.static2.aviasales.com/helios-assets/7213.c8063585c9542370d96a.js"},{"url":"https://a.static2.aviasales.com/helios-assets/3974.083f49a2cd9aeef0e122.js"},{"url":"https://a.static2.aviasales.com/helios-assets/3532.099a5c30b6976dd2be86.js"},{"url":"https://a.static2.aviasales.com/helios-assets/2959.272521280c65c9cd69c6.js"},{"url":"https://a.static2.aviasales.com/helios-assets/app.c356205dab9038d8499f.js"},{"url":"https://a.static2.aviasales.com/helios-assets/6887.472ef82cf71ed679b56e.js"},{"url":"https://a.static2.aviasales.com/helios-assets/3456.e05dd357c3f298c4a6a3.js"},{"url":"https://a.static2.aviasales.com/helios-assets/5521.fa6c641d0a7fae8ce6ec.js"},{"url":"https://a.static2.aviasales.com/helios-assets/8189.36e1eaaf0b042fe22062.js"},{"url":"https://a.static2.aviasales.com/helios-assets/2207.f8ceb5c5bcd80bdff735.js"},{"url":"https://a.static2.aviasales.com/helios-assets/2949.d503f509364ca4107bc0.js"},{"url":"https://a.static2.aviasales.com/helios-assets/5793.b8eadc1507c46f81465d.js"},{"url":"https://a.static2.aviasales.com/helios-assets/8986.874902b1f21b32cbc632.js"},{"url":"https://a.static2.aviasales.com/helios-assets/2890.35bd746f3af9d50a76ce.js"},{"url":"https://a.static2.aviasales.com/helios-assets/index.ab74282b2a447f88115e.js"},{"url":"https://a.static2.aviasales.com/helios-assets/old-browser-notification.64706829f09b34d3bcee.js"}];
  for (var i = 0; i < FILES.length; i++) {
    addScript(FILES[i]);
  };
});
