$(document).ready(function () {

    var HF = document.getElementById("HFChart");
    if (HF == null) return;
    if (HF.value == -1) { return }
    var HFLocale = document.getElementById("HFLocale");
    var preview = document.getElementById("HFPreview");
    var res = HF.value.split(";");
    var mbid;
    for (var i = 0, length = res.length; i < length; i++) {
        mbid = res[i].substring(0, res[i].indexOf("_"));
        if (HFLocale.value == "nl") {
            var factory = new HighChartFactory(mbid, 'plot_' + res[i], null, true, 0);
        }
        else {
            var factory = new HighChartFactory(mbid, 'plot_' + res[i], null, true, 1);
        }

        if (preview.value == "1") {
            factory.initializeNoCache(drawChart);
        }
        else {
            factory.initialize(drawChart);
        }
    }
});

function drawChart(factory) {
    setTimeout(factory[factory.getFunc()].bind(factory), 0);
    $(window).resize();
}

function drawChartLarge(factory) {
    setTimeout(factory[factory.getFunc()].bind(factory), 0);
    $(window).resize();
}

$(document).ready(function () {
    var HF = document.getElementById("HFChartDashboard");
    if (HF == null) return;
    if (HF.value == -1) { return }
    if (HF.value == "") { return }
    var HFLocale = document.getElementById("HFLocale");
    var preview = document.getElementById("HFPreview");
    var res = HF.value.split(";");
    var mbid;

    for (var i = 0, length = res.length; i < length; i++) {
        mbid = res[i].substring(0, res[i].indexOf("_"));
        buildChart(mbid, 'plot_' + res[i], true, drawChart, HFLocale.value, preview.value)
    }
});

$(document).ready(function () {
    var HF = document.getElementById("HFContainer");
    if (HF == null) return;
    if (HF.value == "-1") { return }
    if (HF.value == "") { return }
    var HFLocale = document.getElementById("HFLocale");
    var lang;
    if (HFLocale.value == "nl") {
        lang = 0;
    }
    else {
        lang = 1;
    }
    var preview = document.getElementById("HFPreview");
    var opts = HF.value.split("#");

    for (var i = 0; i < opts.length; i += 2) {
        prepareDashboard(opts[i], opts[i + 1], i, lang);
    }
});

function prepareDashboard(contID, cssclass, counter, lang) {
    var dataType = 'jsonp';
    var protocol = 'https://';
    var application = '/MetaBaseOpenServices/RestServices.svc';
    var urlPattern = "/data/container/json/";
    var self = this;
    var urlParameters = "?id=" + contID + "&lang=" + lang + "&lazy=0";
    var url = 'dataservice.wecr.wur.nl';
    var containerurl = protocol + url + application + urlPattern + urlParameters;
    var divid = counter / 2;
    $.ajax({
        url: containerurl,
        cache: false,
        dataType: dataType,
        xhrFields: {
            withCredentials: false
        },
        error: function (jqXHR, textStatus, exception) {
            self.errorCode = jqXHR.status;
            self.error = exception;
        },
        success: function (data) {
            DrawDashBoard(data, contID, lang, cssclass, divid);
        }
    });
}

function DrawDashBoard(data, contID, lang, cssclass, counter) {
    //dashboardpagina, kan weg?
    if (document.getElementById('ContentPlaceHolder1_divThumbNails') != null) {
        drawDashboardChart(data, contID, lang, cssclass, null)
    }
    //inline dashboard
    if (document.getElementById('ContentPlaceHolder1_divThumbNail' + counter) == null) {
        return;
    }
    drawDashboardChart(data, contID, lang, cssclass, counter);
}

function drawDashboardChart(data, contID, lang, cssclass, counter) {
    var factory;
    var contdiv;
    var contdivContent, largedivContent;
    var largediv;
    if (counter == null) {
        contdiv = document.getElementById('ContentPlaceHolder1_divThumbNails');
        largediv = document.getElementById('ContentPlaceHolder1_divLargeGroup');
    }
    else {
        contdiv = document.getElementById('ContentPlaceHolder1_divThumbNail' + counter);
        largediv = document.getElementById('ContentPlaceHolder1_divLargeGroup' + counter);
    }

    var enlargestring;
    switch (lang) {
        case 0:
            enlargestring = "Klik om de grafiek te vergroten";
            break;
        default:
            enlargestring = "Click to enlarge the chart";
            break;
    }

    var ids = "";
    var urls = "";
    for (var pr = 0; pr < data.getContainerJSONResult.Presentations.length; pr++) {
        var len = data.getContainerJSONResult.Presentations[pr].MetaBaseResponses.length;
        for (var p = 0; p < len; p++) {
            var id = data.getContainerJSONResult.Presentations[pr].MetaBaseResponses[p].Id;
            if (ids == "") {
                ids = id;
            }
            else {
                ids = ids + "#" + id;
            }
        }
    }
    urls = getArticleURLs(ids);

    var idarray = ids.split("#");
    var urlarray = urls.split("#");

    for (var pr = 0; pr < data.getContainerJSONResult.Presentations.length; pr++) {

        contdivContent = "";
        contdivContent = contdivContent + "<div class='sub_title_green'>" + data.getContainerJSONResult.Presentations[pr].Name + "</div>";

        var id = data.getContainerJSONResult.Presentations[pr].ID;
        var len = data.getContainerJSONResult.Presentations[pr].MetaBaseResponses.length;

        var index;
        for (var p = 0; p < len; p++) {
            var random = Math.floor((Math.random() * 100000) + 1);
            var rid = id + "_" + random;
            var d = data.getContainerJSONResult.Presentations[pr].MetaBaseResponses[p];
            contdivContent = contdivContent + "<div class='" + cssclass + "'>";
            contdivContent = contdivContent + "<div class='divTitle'></div>";
            contdivContent = contdivContent + "<div id='plot_" + rid + "' class=divChart></div>";
            contdivContent = contdivContent + "<div class='divChartFooter'>";
            contdivContent = contdivContent + "<div class='divImg'><img src='Images/expand.png' title='" + enlargestring + "' onclick=enlarge('" + d.Id + "_large') /></div>";
            contdivContent = contdivContent + "<div id='divInfo'><span class='mlb'>";
            index = idarray.indexOf(d.Id.toString())
            if (urlarray[index] != "-1") {
                contdivContent = contdivContent + urlarray[index];
            }
            contdivContent = contdivContent + "</span></div>";
            contdivContent = contdivContent + "</div></div>";
            contdiv.innerHTML = contdiv.innerHTML + contdivContent;
            contdivContent = "";
            largedivContent = "";

            largedivContent = "<div id='plot_" + d.Id + "_large' class='divChartLarge' title='Grafiek'></div>";
            largediv.innerHTML = largediv.innerHTML + largedivContent;

            factory = new HighChartFactory(id, 'plot_' + rid, null, true, lang);
            factory.setDefaultPaletteString(null);
            factory.minimized = true;

            factory.initializeWithData(drawChart, d)
            $("#" + factory.target).height(225);
            $("#" + factory.target).width(369);
            $("#" + factory.targetPrefix).height(225);
            $("#" + factory.targetPrefix).width(369);
            //todo preview
        }
    }
}

function getArticleURLs(ids) {
    var url = "";
    var currentpage = window.location.href.toString();

    $.ajax({
        type: "POST",
        url: "SectorResultaat.aspx/getArticleURLs",
        data: '{ids: ' + JSON.stringify(ids) + ', currentpage: ' + JSON.stringify(currentpage) + '}',
        contentType: "Application/json; charset=utf-8",
        dataType: "json",
        async: false,
        failure: function (response) {
            alert(response.d)
        },
        success: function (data) {
            url = data.d;
        }
    })
    return url;
}


function buildChart(mbid, divid, isMinimized, functionName, lang, preview) {
    var factory;
    if (lang == "nl") {
        factory = new HighChartFactory(mbid, divid, null, true, 0);
    }
    else {
        factory = new HighChartFactory(mbid, divid, null, true, 1);
    }
    factory.setDefaultPaletteString(null);
    factory.minimized = isMinimized;
    if (preview == "1") {
        factory.initializeNoCache(functionName);
    }
    else {
        factory.initialize(functionName);
    }
    if (isMinimized) {
        $("#" + factory.target).height(225);
        $("#" + factory.target).width(369);
        $("#" + factory.targetPrefix).height(225);
        $("#" + factory.targetPrefix).width(369);
    }
    return factory;
}

function enlarge(divID) {
    document.getElementById("plot_" + divID).innerHTML = "";
    var HFLocale = document.getElementById("HFLocale");
    var preview = document.getElementById("HFPreview");
    var mbid = divID.substring(0, divID.indexOf("_"));
    buildChart(mbid, 'plot_' + divID, false, drawChartLarge, HFLocale.value, preview.value);

    var closebutton;
    if (HFLocale.value == "nl") {
        closebutton = "Sluiten";
    }
    else {
        closebutton = "Close";
    }

    document.getElementById("plot_" + divID).style.display = 'block';
    $("#plot_" + divID).dialog({
        height: 600,
        width: 800,
        title: "",
        buttons: [
        {
            text: closebutton,
            id: "mybut",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });
    $(".ui-dialog-titlebar").hide();
}

function enlargeHighMap(filename) {
    var HFLocale = document.getElementById("HFLocale");
    var closebutton, htmlstr;
    if (HFLocale.value == "nl") {
        closebutton = "Sluiten";
        htmlstr = "<iframe width='700px' height='800px' src='" + filename + "?lang='nl' style='text-align:center'></iframe>";
    }
    else {
        closebutton = "Close";
        htmlstr = "<iframe width='700px' height='800px' src='" + filename + "?lang='uk' style='text-align:center'></iframe>";
    }
    var $dialog = $('<div style=text-align:center></div>')
               .html(htmlstr)
               .dialog({
                   autoOpen: false,
                   modal: true,
                   height: 900,
                   width: 800,
                   title: "",
                   buttons: [
        {
            text: closebutton,
            id: "mybut",
            click: function () {
                $(this).dialog("close");
            }
        }]
               });
    $dialog.dialog('open');
    $(".ui-dialog-titlebar").hide();
}

function enlargeImage(filename) {
    var HFLocale = document.getElementById("HFLocale");
    var closebutton;
    if (HFLocale.value == "nl") {
        closebutton = "Sluiten";
    }
    else {
        closebutton = "Close";
    }
    var $dialog = $('<div style=text-align:center></div>')
               .html("<img src='" + filename + "' />")
               .dialog({
                   autoOpen: false,
                   modal: true,
                   height: 750,
                   width: 650,
                   title: "",
                   buttons: [
        {
            text: closebutton,
            id: "mybut",
            click: function () {
                $(this).dialog("close");
            }
        }]
               });
    $dialog.dialog('open');
    $(".ui-dialog-titlebar").hide();
}

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

function canShowxLabel(cats) {
    //alleen x-as labels laten zien als:
    //- tekst en minder dan 3
    //- getal en meer dan 8
    var showxlabel = true;
    if (TryParseInt(cats[0], -1) == -1 & cats.length > 3) {
        showxlabel = false;
    }
    if (TryParseInt(cats[0], -1) != -1 & cats.length > 8) {
        showxlabel = false;
    }
    return showxlabel;
}

function getTitle(maintitle, subtitle, dimarray, elID) {
    var title = maintitle;
    var stitle = "";
    if (dimarray != null) {
        for (var i = 0; i < dimarray.length; i++) {
            if (dimarray[i].selections.length > 0) {
                stitle = dimarray[i].namesDictionary[dimarray[i].selections[0]];
                title = title + "<br><p>" + stitle + "</p>";
                break;
            }
        }
    }
    if (stitle == "") {
        if (subtitle != " " & subtitle != null) {
            title = title + "<br><p>" + subtitle + "</p>";
        }
    }
    document.getElementById(elID).parentNode.childNodes[0].innerHTML = title;
}

HighChartFactory.prototype.drawHighChart = function (clickCallback) {
    if (!this.errorCheck()) {
        return;
    }
    var series = (this.dateFormat == undefined) ? this.chartData.series : this.convertCategoryToUTC();
    Highcharts.setOptions(this.getGlobalOpts(true));
    var opts = this.getSharedOpts();

    if (this.minimized) {
        getTitle(opts["title"].text, this.subtitle(), this.reducableDimensions, this.targetPrefix);
    }
    else {
        opts["legend"] = this.chartOptions.legend;
        opts["subtitle"] = {
            text: this.subtitle(),
            style: {
                fontSize: this.theme.subtitleFontSize
            }
        }
    }
    var style = {
        fontSize: this.theme.labelFontSize
    };
    var self = this;

    if (this.minimized) {
        var showxlabel = canShowxLabel(this.chartData.categories);
        if (showxlabel) {
            opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        }
        else {
            opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style, formatter: function () { return ""; } } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        }
        opts["yAxis"] = {
            min: this.getMin(),
            max: this.getMax(),
            labels: { format: this.yLabelFormat(this.chartData, 0), style: style },
            title: null
        };
    }
    else {
        opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        opts["yAxis"] = {
            min: this.getMin(),
            max: this.getMax(),
            labels: { format: this.yLabelFormat(this.chartData, 0), style: style },
            title: {
                text: this.suffix(0),
                rotation: (this.suffix(0).length == 1) ? 0 : 270,
                margin: 20,
                style: {
                    color: '#333',
                    fontWeight: 'bold',
                    fontSize: this.theme.axisFontSize
                }
            }
        };
    }
    opts["series"] = series;
    if (this.minimized) {
        opts["legend"] = { enabled: false };
        opts["credits"] = { enabled: false };
        this.chart = new Highcharts.Chart(opts);
        $('#' + this.target).find('.highcharts-button').remove();
        $('#' + this.targetPrefix).find('.squaredFour').remove();
        $('#' + this.target).find('.highcharts-title').remove();
    }
    else {
        this.addLegendTooltip();
        this.addText();
        this.chart = new Highcharts.Chart(opts);
    }
}

HighChartFactory.prototype.drawHighChart_2axes = function (clickCallback) {
    if (!this.errorCheck()) {
        return;
    }
    var series = (this.dateFormat == undefined) ? this.chartData.series : this.convertCategoryToUTC();
    var globalOpts = Highcharts.setOptions(this.getGlobalOpts(true));
    var opts = this.getSharedOpts();
    if (this.minimized) {
        getTitle(opts["title"].text, this.subtitle(), this.reducableDimensions, this.targetPrefix);
    }
    else {
        opts["legend"] = this.chartOptions.legend;
        opts["subtitle"] = {
            text: this.subtitle(),
            style: {
                fontSize: this.theme.subtitleFontSize
            }
        };
    }
    var style = {
        fontSize: this.theme.labelFontSize
    };
    var self = this;

    if (this.minimized) {
        var showxlabel = canShowxLabel(this.chartData.categories);
        if (showxlabel) {
            opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        }
        else {
            opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style, formatter: function () { return ""; } } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        }
        opts["yAxis"] = [{
            min: this.getMin(),
            max: this.getMax(),
            labels: {
                format: this.yLabelFormat(this.chartData, 0),
                style: {
                    color: globalOpts.colors[0],
                    fontSize: this.theme.labelFontSize
                }
            },
            title: null
        },
        {
            min: this.getMin(),
            max: this.getMax(),
            labels: {
                format: this.yLabelFormat(this.chartData, 1),
                style: {
                    color: globalOpts.colors[1],
                    fontSize: this.theme.labelFontSize
                }
            },
            opposite: true,
            title: null
        }];
    }
    else {
        opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        opts["yAxis"] = [{
            min: this.getMin(),
            title: {
                text: this.yAxisTitle(this.chartData, 0),
                style: {
                    color: globalOpts.colors[0],
                    fontWeight: 'bold',
                    fontSize: this.theme.axisFontSize
                }
            },
            labels: {
                format: this.yLabelFormat(this.chartData, 0),
                style: {
                    color: globalOpts.colors[0],
                    fontSize: this.theme.labelFontSize
                }
            }
        }, {
            min: this.getMin(),
            title: {
                text: this.yAxisTitle(this.chartData, 1),
                style: {
                    color: globalOpts.colors[1],
                    fontWeight: 'bold',
                    fontSize: this.theme.axisFontSize
                }
            },
            labels: {
                format: this.yLabelFormat(this.chartData, 1),
                style: {
                    color: globalOpts.colors[1],
                    fontSize: this.theme.labelFontSize
                }
            },
            opposite: true
        }];
    }

    opts["series"] = series;
    this.chart = new Highcharts.Chart(opts);
    if (this.minimized) {
        opts["legend"] = { enabled: false };
        opts["credits"] = { enabled: false };
        this.chart = new Highcharts.Chart(opts);
        $('#' + this.target).find('.highcharts-button').remove();
        $('#' + this.targetPrefix).find('.squaredFour').remove();
        $('#' + this.target).find('.highcharts-title').remove();
        $('#' + this.target).find('.highcharts-subtitle').remove();
    }
    else {
        this.addLegendTooltip();
        this.addText();
    }
}

HighChartFactory.prototype.drawHighChart_3axes = function (clickCallback) {
    if (!this.errorCheck()) {
        return;
    }
    var series = (this.dateFormat == undefined) ? this.chartData.series : this.convertCategoryToUTC();
    var globalOpts = this.getGlobalOpts(true);
    Highcharts.setOptions(globalOpts);
    var opts = this.getSharedOpts();
    if (this.minimized) {
        getTitle(opts["title"].text, this.subtitle(), this.reducableDimensions, this.targetPrefix);
    }
    else {
        opts["legend"] = this.chartOptions.legend;
        opts["subtitle"] = {
            text: this.subtitle(),
            style: {
                fontSize: this.theme.subtitleFontSize
            }
        };
    }
    var style = {
        fontSize: this.theme.labelFontSize
    };
    var self = this;

    if (this.minimized) {
        var showxlabel = canShowxLabel(this.chartData.categories);
        if (showxlabel) {
            opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        }
        else {
            opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style, formatter: function () { return ""; } } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        }

        opts["yAxis"] = [{
            min: this.getMin(),
            labels: {
                format: this.yLabelFormat(this.chartData, 0),
                style: {
                    color: '#666',
                    fontSize: this.theme.labelFontSize
                }
            },
            title: null
        }, {
            min: this.getMin(),
            labels: {
                format: this.yLabelFormat(this.chartData, 1),
                style: {
                    color: globalOpts.colors[1],
                    fontSize: this.theme.labelFontSize
                }
            },
            title: null,
            opposite: true

        }, {
            min: this.getMin(),
            labels: {
                format: this.yLabelFormat(this.chartData, 2),
                style: {
                    color: globalOpts.colors[2],
                    fontSize: this.theme.labelFontSize
                }
            },
            title: null,
            opposite: true
        }];
    }
    else {
        opts["xAxis"] = (this.dateFormat == undefined) ? { categories: this.chartData.categories, labels: { style: style } } : { type: 'datetime', labels: { style: style, formatter: function () { return Highcharts.dateFormat(self.dateFormat.displayFormat, this.value); } } };
        opts["yAxis"] = [{
            min: this.getMin(),
            labels: {
                format: this.yLabelFormat(this.chartData, 0),
                style: {
                    color: '#666',
                    fontSize: this.theme.labelFontSize
                }
            },
            title: {
                text: this.yAxisTitle(this.chartData, 0),
                style: {
                    color: globalOpts.colors[0],
                    fontWeight: 'bold',
                    fontSize: this.theme.axisFontSize
                }
            }
        }, {
            min: this.getMin(),
            labels: {
                format: this.yLabelFormat(this.chartData, 1),
                style: {
                    color: globalOpts.colors[1],
                    fontSize: this.theme.labelFontSize
                }
            },
            title: {
                text: this.yAxisTitle(this.chartData, 1),
                style: {
                    color: globalOpts.colors[1],
                    fontWeight: 'bold',
                    fontSize: this.theme.axisFontSize
                }
            },
            opposite: true

        }, {
            min: this.getMin(),
            labels: {
                format: this.yLabelFormat(this.chartData, 2),
                style: {
                    color: globalOpts.colors[2],
                    fontSize: this.theme.labelFontSize
                }
            },
            title: {
                text: this.yAxisTitle(this.chartData, 2),
                style: {
                    color: globalOpts.colors[2],
                    fontWeight: 'bold',
                    fontSize: this.theme.axisFontSize
                }
            },
            opposite: true
        }];

    }
    opts["series"] = series;
    this.chart = new Highcharts.Chart(opts);

    if (this.minimized) {
        opts["legend"] = { enabled: false };
        opts["credits"] = { enabled: false };
        this.chart = new Highcharts.Chart(opts);
        $('#' + this.target).find('.highcharts-button').remove();
        $('#' + this.targetPrefix).find('.squaredFour').remove();
        $('#' + this.target).find('.highcharts-title').remove();
        $('#' + this.target).find('.highcharts-subtitle').remove();
    }
    else {
        this.addLegendTooltip();
        this.addText();
    }

}

HighChartFactory.prototype.drawHighChart_AreaRange = function (clickCallback) {
    if (!this.errorCheck()) {
        return;
    }
    Highcharts.setOptions(this.getGlobalOpts(false));
    var opts = this.getSharedOpts();
    if (this.minimized) {
        getTitle(opts["title"].text, this.subtitle(), this.reducableDimensions, this.targetPrefix);
    }

    opts["subtitle"] = {
        text: this.subtitle(),
        style: {
            fontSize: this.theme.subtitleFontSize
        }
    };
    opts["legend"] = this.chartOptions.legend;
    var style = {
        fontSize: this.theme.labelFontSize
    };
    opts["xAxis"] = {
        type: 'datetime',
        labels: { style: style }
    };
    opts["yAxis"] = {
        title: {
            text: this.suffix(0),
            style: {
                fontSize: this.theme.axisFontSize
            }
        },
        labels: { style: style }
    };
    opts["series"] = [{
        name: this.chartData.avgName,
        data: this.chartData.avg,
        type: 'line',
        zIndex: 1,
        color: '#35992A',
        marker: {
            fillColor: 'white',
            lineWidth: 2,
            lineColor: '#35992A'
        }
    }, {
        name: this.chartData.rangeName,
        data: this.chartData.range,
        type: 'arearange',
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#35992A',
        fillOpacity: 0.3,
        zIndex: 0
    }];

    this.chart = new Highcharts.Chart(opts, function () {
        this.series[0].showDataLabels = true;
    });
    if (this.minimized) {
        opts["credits"] = { enabled: false };
        this.chart = new Highcharts.Chart(opts);
        $('#' + this.target).find('.highcharts-button').remove();
        $('#' + this.targetPrefix).find('.squaredFour').remove();
        $('#' + this.target).find('.highcharts-title').remove();
        $('#' + this.target).find('.highcharts-subtitle').remove();
    }
    else {
        this.addText();
    }
}

HighChartFactory.prototype.drawHighChart_MasterDetail = function (clickCallback) {
    if (!this.errorCheck()) {
        return;
    }
    var series = (this.dateFormat == undefined) ? this.chartData.series : this.convertCategoryToUTC();
    Highcharts.setOptions(this.getGlobalOpts(true));
    var opts = {};
    opts["chart"] = {
        renderTo: this.target,
        marginLeft: 20,
        marginRight: 20,
    };
    var earliest = this.dateToUTC(Date.parseString(this.chartData.categories[0], this.dateFormat.sourceFormat));
    var latest = this.dateToUTC(Date.parseString(this.chartData.categories[this.chartData.categories.length - 1], this.dateFormat.sourceFormat));
    var style = {
        fontSize: this.theme.labelFontSize
    };
    opts["xAxis"] = { range: (latest - earliest) / 2, labels: { style: style } };
    opts["yAxis"] = { labels: { x: -20, style: style } };
    opts["tooltip"] = this.getToolTip();
    opts["series"] = series;
    if (this.minimized) {
        getTitle(this.title(), this.subtitle(), null, this.targetPrefix);
        opts["exporting"] = {
            enabled: false
        }
        opts["title"] = {
            enabled: false
        }
        opts["subtitle"] = {
            enabled: false
        }
        opts["credits"] = { enabled: false };
        opts["legend"] = { enabled: false };
    }
    else {
        opts["legend"] = { enabled: true, itemStyle: { fontSize: this.theme.legendFontSize } };
        opts["credits"] = {
            text: (this.languageID ? 'Source: ' : 'Bron: ') + this.meta.DataSupplier.Name,
            href: this.meta.DataSupplier.Url,
            style: {
                fontSize: this.theme.creditsFontSize
            }
        }
        opts["title"] = {
            text: this.title(),
            style: {
                fontSize: this.theme.titleFontSize,
                fontWeight: this.theme.titleFontWeight
            }
        };
        opts["subtitle"] = {
            text: this.subtitle(),
            style: {
                fontSize: this.theme.subtitleFontSize
            }
        };
    };

    opts["exporting"] = {
        enabled: true,
        buttons: {
            contextButton: {
                text: this.languageID ? 'Save' : 'Opslaan',
                theme: {
                    style: {
                        color: '#909090',
                        fontSize: this.theme.exportFontSize
                    }
                },
                symbolX: 15,
                symbolY: 12,
                menuItems: this.menuItems()
            }
        }
    };

    opts["colors"] = !_.isUndefined(this.chartOptions.colorPalette) ? this.LEIcolors(this.chartOptions.colorPalette, this.chartData.series.length, false) : this.LEIcolors('sectcijf', this.chartData.series.length, false);
    opts["plotOptions"] = {
        series: {
            connectNulls: true
        }
    };
    // this.chart = new Highcharts.StockChart(opts);

    if (this.minimized) {
        this.chart = new Highcharts.StockChart(opts);
        $('#' + this.target).find('.highcharts-button').remove();
        $('#' + this.targetPrefix).find('.squaredFour').remove();
        $('#' + this.target).find('.highcharts-title').remove();
        $('#' + this.target).find('.highcharts-subtitle').remove();
        $('#' + this.target).find('.highcharts-range-selector-buttons').remove();
        $('#' + this.target).find('.highcharts-navigator').remove();
        $('#' + this.target).find('.highcharts-navigator-handle-left').remove();
        $('#' + this.target).find('.highcharts-navigator-handle-right').remove();
        //document.getElementById(this.targetPrefix).parentNode.childNodes[0].innerHTML = this.title();
    }
    else {
        this.chart = new Highcharts.StockChart(opts);
        this.addLegendTooltip();
        this.addText();
    }
}

HighChartFactory.prototype.drawHighMapDrillDown = function () {
    Highcharts.setOptions({
        lang: {
            drillUpText: '<< Terug'
        }
    });
    var mapData = Highcharts.geojson(JSON.parse(this.meta.Map));
    this.presentGeoLocations = [];
    var mapDataDict = {};
    var self = this;
    $.each(mapData, function () {
        this.properties.mbCode = this.properties['hc-key'].replace(/-/g, ".").toUpperCase();
        self.presentGeoLocations.push(this.properties.mbCode);
        this.drilldown = this.properties.mbCode;
        mapDataDict[this.properties.mbCode] = this;
        this.value = 0;
    });
    var data = this.getMapData()[0];
    $.each(data, function () {
        mapDataDict[this.code].value = this.value;
        mapDataDict[this.code].min = this.min;
        mapDataDict[this.code].max = this.max;
    });
    if (this.minimized) {
        $('#' + this.target).highcharts('Map', {
            chart: {
                events: {
                    click: function (e) {
                    },
                    drilldown: function (e) {
                        if (!e.seriesOptions) {
                            self.drilldown(this, e.point);
                        }
                        this.setTitle(null, { text: e.point.name });
                    },
                    drillup: function (e) {
                        this.setTitle(null, { text: "" });
                    }
                }
            },
            credits: { enabled: false },
            colorAxis: {
                min: 0,
                minColor: '#E6E7E8',
                maxColor: '#34b233'
            },

            series: [{
                animation: true,
                data: mapData,
                //mapData: mapData,
                //joinBy: ['mbCode', 'code'],
                name: this.title(),
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                }
                ,
                dataLabels: {
                    enabled: false
                }
            }],
            tooltip: this.getMapToolTip()
        });
        $('#' + this.target).find('.highcharts-button').remove();
        $('#' + this.targetPrefix).find('.squaredFour').remove();
        $('#' + this.target).find('.highcharts-title').remove();
        var title;
        title = this.chartOptions.title;
        if (this.subtitle() != null) {
            title = title + "<br><p>" + this.subtitle() + "</p>";
        }
        document.getElementById(this.targetPrefix).parentNode.childNodes[0].innerHTML = title;
    }
    else {

        $('#' + this.target).highcharts('Map', {
            chart: {
                events: {
                    click: function (e) {
                    },
                    drilldown: function (e) {
                        if (!e.seriesOptions) {
                            self.drilldown(this, e.point);
                        }
                        this.setTitle(null, { text: e.point.name });
                    },
                    drillup: function (e) {
                        this.setTitle(null, { text: "" });
                    }
                }
            },

            title: {
                text: this.title()
            },

            credits: {
                text: (this.languageID ? 'Source: ' : 'Bron: ') + this.meta.DataSupplier.Name,
                href: this.meta.DataSupplier.Url,
                style: {
                    fontSize: this.theme.creditsFontSize
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                min: 0,
                minColor: '#E6E7E8',
                maxColor: '#34b233'
            },

            series: [{
                animation: true,
                data: mapData,
                //mapData: mapData,
                //joinBy: ['mbCode', 'code'],
                name: this.title(),
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                }
                ,
                dataLabels: {
                    enabled: true,
                    format: '{point.properties.name}'
                }
            }],
            tooltip: this.getMapToolTip(),
            drilldown: {
                //series: drilldownSeries,
                activeDataLabelStyle: {
                    color: 'white',
                    textDecoration: 'none'
                },
                drillUpButton: {
                    relativeTo: 'plotBox',
                    position: {
                        x: 0,
                        y: 60
                    }
                }

            }
        });
    }
}

//HighChartFactory.prototype.drawHighMapDrillDown = function () {
//    Highcharts.setOptions({
//        lang: {
//            drillUpText: '<< Terug'
//        }
//    });
//    var mapData = Highcharts.geojson(JSON.parse(this.meta.Map));
//    this.presentGeoLocations = [];
//    var mapDataDict = {};
//    var self = this;
//    $.each(mapData, function () {
//        this.properties.mbCode = this.properties['hc-key'].replace(/-/g, ".").toUpperCase();
//        self.presentGeoLocations.push(this.properties.mbCode);
//        this.drilldown = this.properties.mbCode;
//        mapDataDict[this.properties.mbCode] = this;
//        this.value = 0;
//    });
//    var data = this.getMapData()[0];
//    $.each(data, function () {
//        mapDataDict[this.code].value = this.value;
//        mapDataDict[this.code].min = this.min;
//        mapDataDict[this.code].max = this.max;
//    });
//    if (this.minimized) {
//        $('#' + this.target).highcharts('Map', {
//            chart: {
//                events: {
//                    click: function (e) {
//                    },
//                    drilldown: function (e) {
//                        if (!e.seriesOptions) {
//                            self.drilldown(this, e.point);
//                        }
//                        this.setTitle(null, { text: e.point.name });
//                    },
//                    drillup: function (e) {
//                        this.setTitle(null, { text: "" });
//                    }
//                }
//            },
//            credits: { enabled: false },
//            colorAxis: {
//                min: 0,
//                minColor: '#E6E7E8',
//                maxColor: '#34b233'
//            },

//            series: [{
//                animation: true,
//                data: mapData,
//                //mapData: mapData,
//                //joinBy: ['mbCode', 'code'],
//                name: this.title(),
//                states: {
//                    hover: {
//                        color: '#BADA55'
//                    }
//                }
//                ,
//                dataLabels: {
//                    enabled: false
//                }
//            }],
//            tooltip: this.getMapToolTip()
//        });
//        $('#' + this.target).find('.highcharts-button').remove();
//        $('#' + this.targetPrefix).find('.squaredFour').remove();
//        $('#' + this.target).find('.highcharts-title').remove();
//        var title;
//        title = this.chartOptions.title;
//        if (this.subtitle() != null) {
//            title = title + "<br><p>" + this.subtitle() + "</p>";
//        }
//        document.getElementById(this.targetPrefix).parentNode.childNodes[0].innerHTML = title;
//    }
//    else {
//        $('#' + this.target).highcharts('Map', {


//            chart: {
//                events: {
//                    click: function (e) {
//                    },
//                    drilldown: function (e) {
//                        if (!e.seriesOptions) {
//                            self.drilldown(this, e.point);
//                        }
//                        this.setTitle(null, { text: e.point.name });
//                    },
//                    drillup: function (e) {
//                        this.setTitle(null, { text: "" });
//                    }
//                }
//            },

//            title: {
//                text: this.title()
//            },

//            credits: {
//                text: (this.languageID ? 'Source: ' : 'Bron: ') + this.meta.DataSupplier.Name,
//                href: this.meta.DataSupplier.Url,
//                style: {
//                    fontSize: this.theme.creditsFontSize
//                }
//            },
//            legend: {
//                layout: 'vertical',
//                align: 'right',
//                verticalAlign: 'middle'
//            },

//            mapNavigation: {
//                enabled: true,
//                buttonOptions: {
//                    verticalAlign: 'bottom'
//                }
//            },

//            colorAxis: {
//                min: 0,
//                minColor: '#E6E7E8',
//                maxColor: '#34b233'
//            },

//            series: [{
//                animation: true,
//                data: mapData,
//                //mapData: mapData,
//                //joinBy: ['mbCode', 'code'],
//                name: this.title(),
//                states: {
//                    hover: {
//                        color: '#BADA55'
//                    }
//                }
//                ,
//                dataLabels: {
//                    enabled: true,
//                    format: '{point.properties.name}'
//                }
//            }],
//            tooltip: this.getMapToolTip(),
//            drilldown: {
//                //series: drilldownSeries,
//                activeDataLabelStyle: {
//                    color: 'white',
//                    textDecoration: 'none'
//                },
//                drillUpButton: {
//                    relativeTo: 'plotBox',
//                    position: {
//                        x: 0,
//                        y: 60
//                    }
//                }
//            }
//        });
//    }
//}

