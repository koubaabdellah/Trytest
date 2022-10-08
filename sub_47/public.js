;(function($, window, undefined) {

  'use strict';

  var WeblatorChart = function(id, random) {

    var defaults = {
      id:id,
      randomID:random,
      chart:null,
      chartShown:0,
      chartType:null,
      chartData:null,
      chartOptions:null,
      optionCount:null,
      drawLegend:null,
      chartWidth:null,
      maxWidth:null,
      usePercentage:0,
    };

    var $container = $('[data-random-id="' + defaults.randomID + '"]');
    var $canvas = $('[data-random-id="' + defaults.randomID + '"] canvas');

    function init() {
      getChartData(id);
    }

    function getChartData() {

      $container.attr('data-chart-loaded', 1);
      $.post(ajaxurl, { action:'chart_data_chart', id:defaults.id }, function(data) {

        var json = jQuery.parseJSON(data);
        var totalVotes = 0;

        defaults.chartType = json.chartType;
        defaults.optionCount = json.totals.length;

        for (var i = 0; i < json.totals.length; i++)
          json.totals[i] = parseFloat(json.totals[i]);

        if (defaults.chartType == 1 || defaults.chartType == 4 || defaults.chartType == 5) {

          var datasets = [];

          for (var i = 0; i < json.datasets.length; i++) {

            var dTotals = [];
            for (var x = 0; x < json.datasets[i].data.length; x++) {
              dTotals.push(json.datasets[i].data[x].optionValue);
            }

            if (i == 0) {

              datasets.push({
                fillColor:json.styles[0].fillColor,
                strokeColor:json.styles[0].strokeColor,
                pointColor:json.styles[0].pointColor,
                pointStrokeColor:json.styles[0].pointStrokeColor,
                title:json.mainDataSetTitle,
                data:dTotals,
              });

            } else {

              datasets.push({
                fillColor:json.datasets[i].style[0].fillColor,
                strokeColor:json.datasets[i].style[0].strokeColor,
                pointColor:json.datasets[i].style[0].pointColor,
                pointStrokeColor:json.datasets[i].style[0].pointStrokeColor,
                title:json.datasets[i].style[0].title,
                data:dTotals,
              });
            }
          }

          var data = {

            labels:json.dataLabels,
            datasets:datasets,

          };

          for (var i = 0; i < data.datasets[0].data.length; i++)
              totalVotes += data.datasets[0].data[i];

        } else {

          var data = [];

          for (var i = 0; i < json.totals.length; i++) {

            totalVotes += parseFloat(json.totals[i]);

            data.push({
              value:parseFloat(json.totals[i]),
              color:json.optionColors[i],
              label:json.labels[i],
            });
          }

        }

        json.options = jQuery.extend({}, {responsive:true}, json.options);
        defaults.chartData = data;
        defaults.chartOptions = json.options;
        defaults.drawLegend = json.showLegend;
        defaults.maxWidth = json.maxWidth;
        defaults.percentage = json.percentage;

        if (isIE()) {

          var options = {
            scaleLabel: json.scale_label_prepend + "<%=value%>" + json.scale_label_append,
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%>" + json.scale_label_prepend + "<%= value %>" + json.scale_label_append,
            multiTooltipTemplate: (json.scale_label_prepend != null ? json.scale_label_prepend : "" ) + "<%= value %>" + (json.scale_label_append != null ? json.scale_label_append : "" ),
            responsive:true,
            animation:false,
          };

        } else {

          var options = {
            scaleLabel: (json.scale_label_prepend != null ? json.scale_label_prepend : "" ) + "<%=value%>" + (json.scale_label_append != null ? json.scale_label_append : "" ),
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%>" + (json.scale_label_prepend != null ? json.scale_label_prepend : "" ) + "<%= value %>" + (json.scale_label_append != null ? json.scale_label_append : "" ),
            multiTooltipTemplate: (json.scale_label_prepend != null ? json.scale_label_prepend : "" ) + "<%= value %>" + (json.scale_label_append != null ? json.scale_label_append : "" ),
            responsive:true,
            animation:true,
          };

        }

        defaults.chartOptions = jQuery.extend(options, defaults.chartOptions);

        if (parseInt(json.maxWidth) == 0) {

          defaults.chartWidth = $container.width();
          $canvas.attr({width: defaults.chartWidth});
          $canvas.attr({height: parseInt(defaults.chartWidth) / 2});

        }

        if (isChartVisible()) {

              defaults.chartShown = 1;
              drawChart();

        }else {

          $container.mutate('show', function(el, info) {

            if (!defaults.chartShown) {
                drawChart();
                defaults.chartShown = 1;
            }

          });
        }

      });

    }

    function drawChart() {

      var ctx = $canvas.get(0).getContext('2d');

      $container.css({
        height:"auto"
      });

      $canvas.slideDown(function() {

        switch (parseInt(defaults.chartType)) {

          case 1:
            defaults.chart = new Chart(ctx).Bar(defaults.chartData, defaults.chartOptions);
            if (1)
              dataSetLegend(defaults.chartData, defaults.id, defaults.chartWidth, 1);
            break;
          case 2:
            defaults.chart = new Chart(ctx).Pie(defaults.chartData, defaults.chartOptions);
            if (parseInt(defaults.drawLegend))
              legend(document.getElementById('legend-' + defaults.id), defaults.chartData);
            break;
          case 3:
            defaults.chart = new Chart(ctx).Doughnut(defaults.chartData, defaults.chartOptions);
            if (parseInt(defaults.drawLegend))
              legend(document.getElementById('legend-' + defaults.id), defaults.chartData);
            break;
          case 4:
            defaults.chart = new Chart(ctx).Line(defaults.chartData, defaults.chartOptions);
            dataSetLegend(defaults.chartData, defaults.id, defaults.chartWidth, 4);
            break;
          case 5:
            defaults.chart = new Chart(ctx).Radar(defaults.chartData, defaults.chartOptions);
            if (1)
              dataSetLegend(defaults.chartData, defaults.id, defaults.chartWidth, 5);
            break;
          case 6:
            defaults.chart = new Chart(ctx).PolarArea(defaults.chartData, defaults.chartOptions);
            if (parseInt(defaults.drawLegend))
              legend(document.getElementById('legend-' + defaults.id), defaults.chartData);
            break;
          case 7:
            drawBootstrapChart(defaults.chartData, defaults.chartOptions);
            break;
        }

      });

    }

    function drawBootstrapChart(data, options) {

      $canvas.remove();

      var total = 0;
      for (var i = 0; i < data.length; i++)
          total = total + parseInt(data[i].value);

      var bsChartContainer = $('<div/>')
          .attr('class', 'bs-chart-container')
          .css('display', 'none');

      for (var i = 0; i < data.length; i++) {

        var label = $('<strong/>').html(data[i].label);

        var progressContainer = $('<div/>').attr('class', 'weblator-chart-progress');

        if (!parseInt(defaults.percentage))
            var p = (data[i].value / total) * 100;
        else
            var p = data[i].value;

        var progressBar = jQuery('<div/>')
            .attr('class', 'weblator-chart-progress-bar')
            .attr('role', 'progressbar')
            .attr('aria-valuenow', p)
            .attr('aria-valuemin', 0)
            .attr('data-length', data[i].value.toString().length)
            .css({
              backgroundColor:data[i].color,
              fontFamily:options.bsLabelFontFamily,
              fontSize:options.bsLabelFontSize,
              fontStyle:options.bsLabelFontStyle,
              color:options.bsLabelFontColor,
            });
        if (options.bsBarStriped)
          progressContainer.addClass('weblator-chart-progress-striped');

        var span = jQuery('<span/>')
          .attr('class', '')
          //.html((parseInt(defaults.percentage) ? Math.round((data[i].value / total) * 100) : data[i].value));
          .html(data[i].value);
        if (parseInt(defaults.percentage))
          span.append('%');

        if (p > 0)
          progressBar.append(span);

        progressContainer.append(progressBar);
        bsChartContainer.append(label);
        bsChartContainer.append(progressContainer);

      }

      $container.append(bsChartContainer);

      bsChartContainer.slideDown();

      $container.find('.weblator-chart-progress-bar').each(function() {

        var value = jQuery(this).attr('aria-valuenow');
        var len = jQuery(this).attr('data-length');

        jQuery(this).animate({
          width:value + '%',
          display: "block",
          minWidth:len * 12.5
        }, 1000);

      });
    }

    function isChartVisible() {

      return $container.is(':visible');

    }

    function isIE(version, comparison) {
      var cc      = 'IE';
      var b       = document.createElement('B');
      var docElem = document.documentElement;
      var isIE;

      if (version) {
        cc += ' ' + version;
        if (comparison) { cc = comparison + ' ' + cc; }
      }

      b.innerHTML = '<!--[if ' + cc + ']><b id="iecctest"></b><![endif]-->';
      docElem.appendChild(b);
      isIE = !!document.getElementById('iecctest');
      docElem.removeChild(b);
      return isIE;
    }

    init();

  };

  $(document).ready(function() {
    $('.weblator-chart-container[data-chart-id]').each(function() {
      var id = $(this).data('chart-id');
      var random = $(this).attr("data-random-id");
      WeblatorChart(id, random);
    });

    $( document ).ajaxComplete(function( event, xhr, settings ) {
        $('.weblator-chart-container[data-chart-id]').each(function() {
          if($(this).attr('data-chart-loaded') == '0')
          {
            var id = $(this).data('chart-id');
            var random = $(this).attr("data-random-id");
            WeblatorChart(id, random);
          }
        });
    });
  });

})(jQuery, window);
