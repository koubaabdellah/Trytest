$(document).ready(function () {  
    var HF = document.getElementById("HFMakeMap");
    if (HF.value == 0) { return; }
    $("div#plot").attr("class", "bigChart");
    var HFLocale = document.getElementById("HFLocale");
    if (HFLocale.value == "nl") {
        var factory = new HighChartContainer(2, 'plot', null, true, 0);
    }
    else {
        var factory = new HighChartContainer(2, 'plot', null, true, 0);
    }
    factory.initialize();
});

$(document).ready(function () {
    var HF = document.getElementById("HFMakeMap");
    if (HF.value == 1) { return; }
    var HF = document.getElementById("HFChart");
    if (HF.value == -1) { return }
    var HFLocale = document.getElementById("HFLocale");
    var res = HF.value.split(";");
    var mbid;
    var counter = 0;    
    for (var i = 0, length = res.length; i < length; i++) {
        if (counter > 0) {
            mbid = res[i].substring(0, res[i].indexOf("_"));
            var plotName = "plot_" + res[i];
            $("div#plot_" + res[i - 1]).after("<br/><div id='" + plotName + "' class='mediumChart' style='width:900px;margin:0 auto'></div> ");           
            if (HFLocale.value == "nl") {
                var factory = new HighChartFactory(mbid, plotName, null, true, 0);
            }
            else {
                var factory = new HighChartFactory(mbid, plotName, null, true, 1);
            }
        }
        else {
            mbid = res[0].substring(0, res[0].indexOf("_"));
            $("div#plot").attr("id", "plot_" + res[0]);
            if (HFLocale.value == "nl") {
                var factory = new HighChartFactory(mbid, 'plot_' + res[0], null, true, 0);
            }
            else {
                var factory = new HighChartFactory(mbid, 'plot_' + res[0], null, true, 1);
            }
        }

        factory.initialize(drawChart);
        counter++;
    }
});

function drawChart(factory) {
    setTimeout(factory[factory.getFunc()].bind(factory), 0);
    $(window).resize();
}
