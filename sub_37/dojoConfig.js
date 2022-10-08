var _pn = location.pathname.replace(/\/[^/]*$/, "");
_pn.lastIndexOf("/") == _pn.indexOf("/")  || (_pn = _pn.substring(0,_pn.lastIndexOf("/")));
// window.isDebug = true; // for testing on local development machine
var base = (window.isDebug ? _pn : "");
window.dojoConfig = {
  parseOnLoad: true,
  locale: location.search.match(/locale=([\w\-]+)/) ? RegExp.$1 : null,
  packages:[
    {
      name: "app", 
      location: base + "/js/app"
    },
    {
      name: "arcgis-about",
      location: _pn + "/js"
    },
    {
      name: "telemetry",
      location: base + "/js/arcgis-telemetry.js/dist"
    }
  ]
};
