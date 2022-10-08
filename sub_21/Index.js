
if (typeof (AIS) !== "object") { var AIS = new Object(); }
if (typeof (AIS.Views) !== "object") { AIS.Views = new Object(); }
if (typeof (AIS.Views.Index) !== "object") { AIS.Views.Index = new Object(); }

AIS.Views.Index = function () {

  return {
    Init: function () {
      $(document).ready(function () {

        //handlers

      });
    }
  }
}();

AIS.Views.Index.Init();