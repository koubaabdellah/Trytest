
(function ($, Drupal, drupalSettings) {
    const mapTypes = [
      'maps',
      'maps_europe',
      'maps_africa',
      'maps_asia'
    ];

    function createChartObject(chart) {
      // If type is donut, set type to pie because in Highcharts donut chart is a pie with a hole in it.
      const type = (chart.type === 'donut') ? 'pie' : chart.type;

      const hc_chart = new Object();
      hc_chart.chart = { type: type };
      hc_chart.credits = (chart.source && chart.source.length) ? chart.credits = true : chart.credits = false;
      hc_chart.exporting = true;
      hc_chart.plotOptions = { bar: { dataLabels: { enabled: true } } };
      hc_chart.title = (chart.title && chart.title.length) ? chart.title.toString() : '';
      hc_chart.subtitle = (chart.subtitle && chart.subtitle.length) ? chart.subtitle.toString() : '';
      hc_chart.source = (chart.source && chart.source.length) ? chart.source.toString() : '';
      hc_chart.categories = eval(chart['categories']);
      hc_chart.xAxis = (chart['x-axis'] && chart['x-axis'].length) ? chart['x-axis'].toString() : '';
      hc_chart.yAxis = (chart['y-axis'] && chart['y-axis'].length) ? chart['y-axis'].toString() : '';
      hc_chart.tooltip = { enabled: true };
      hc_chart.series = eval(chart.series);
      hc_chart.series['type'] = type;
      hc_chart.chart['options3d'] = {
        enabled: chart['3d'],
        alpha: 45,
        beta: 0
      };

      return hc_chart
    }

    function isMap(type) {
      return mapTypes.indexOf(type) >= 0;
    }

    $("div[id^='hc_container_']").each(function () {
      var id = $(this).attr('id');
      var chart_id = id.replace('_alinea', '').substr(13).toString();
      var chart = drupalSettings.cbi_charts.highcharts['hc-chart-' + chart_id];

      // Override or set some additional chart options.
      if (!isMap(chart.type)) {
        const hc_chart = createChartObject(chart);
        // Override or set some additional chart options.
        switch (chart.type) {
          case 'bar':
          case 'column':
          case 'line':
            // Config for 3D columns.
            if (chart['3d']) {
              hc_chart.chart.options3d['alpha'] = 15;
              hc_chart.chart.options3d['beta'] = 15;
              hc_chart.chart.options3d['depth'] = 50;
              hc_chart.chart.options3d['viewDistance'] = 25;
              hc_chart.plotOptions = {
                columns: { depth: 25 },
              };
            };
            break;
          case 'stacked_bar':
            hc_chart.chart['type'] = 'bar';
            hc_chart.plotOptions = {
              bar: { dataLabels: { enabled: false } },
              series: { stacking: 'normal' }
            };
            hc_chart.tooltip['valueSuffix'] = (chart.tooltip_suffix && chart.tooltip_suffix.length) ? ' ' + chart.tooltip_suffix.toString() : '';
            hc_chart.series['type'] = 'bar';
            break;
          case 'stacked_column':
          case 'stacked_column_percent':
            hc_chart.chart['type'] = 'column';
            
            if (chart.type === 'stacked_column_percent') {
              hc_chart.plotOptions = {
                bar: { dataLabels: { enabled: false } },
                column: { stacking: 'percent' }
              };
            } else {
              hc_chart.plotOptions = {
                bar: { dataLabels: { enabled: false } },
                column: { stacking: 'normal' }
              };
            }

            hc_chart.tooltip['valueSuffix'] = (chart.tooltip_suffix && chart.tooltip_suffix.length) ? ' ' + chart.tooltip_suffix.toString() : '';
            hc_chart.series['type'] = 'column';
            break;
          case 'pyramid':
            hc_chart.chart['type'] = 'pyramid';
            hc_chart.tooltip['pointFormat'] = '<b>{point.y:,.0f}</b>';
            hc_chart.series = [{
              type: chart.type,
              data: eval(chart.series)
            }];

            hc_chart.plotOptions = {
              pyramid: {
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b> ({point.y:,.0f})'
                },
                showInLegend: true,
                width: '40%'
              }
            };
            
            break;
          case 'pie':
          case 'donut':
            // General chart pie options.
            hc_chart.chart['plotBackgroundColor'] = null;
            hc_chart.chart['plotBorderWidth'] = null;
            hc_chart.chart['plotShadow'] = false;
            hc_chart.chart['type'] = 'pie';

            // Config for pie chart type.
            hc_chart.plotOptions = {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  formatter: function () {
                    return this.percentage.toFixed(0) + '%';
                  },
                },
                showInLegend: true
              }
            };

            // Config for 3D pie chart.
            if (chart['3d']) {
              hc_chart.plotOptions.pie.depth = 35;
            };

            if (chart.type === 'donut') {
              hc_chart.plotOptions.pie.innerSize = '40%'
            }

            // Tooltip percentage.
            hc_chart.tooltip['pointFormat'] = '<b>{point.percentage:.1f}%</b>';

            hc_chart.series = [{
              type: (chart.type === 'donut') ? 'pie' : chart.type,
              data: eval(chart.series)
            }];
            break;
          default:
            hc_chart.tooltip['valueSuffix'] = (chart.tooltip_suffix && chart.tooltip_suffix.length) ? ' ' + chart.tooltip_suffix.toString() : '';
        }

        // Set default options.
        Highcharts.setOptions({
          lang: {
            decimalPoint: ',',
            thousandsSep: '.'
          }
        });

        $("#" + id).highcharts({
          // Options regarding the chart area and plot area as well as general chart options.
          chart: hc_chart.chart,
          colors: ['#007bc7', '#ffb612', '#39b70c', '#59b1df', '#ca005d', '#ee720d', '#5ed1b5', '#ff1200'],
          credits: {
            enabled: hc_chart.credits,
            href: "#",
            text: hc_chart.source
          },
          exporting: { enabled: hc_chart.exporting },
          title: {
            text: hc_chart.title,
            margin: 50
          },
          subtitle: {
            text: hc_chart.subtitle
          },
          xAxis: {
            categories: hc_chart.categories,
            title: { text: hc_chart.xAxis },
          },
          yAxis: {
            title: { text: hc_chart.yAxis },
          },
          tooltip: hc_chart.tooltip,
          plotOptions: hc_chart.plotOptions,
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          },
          series: hc_chart.series
        });
      }

    });
}) (jQuery, Drupal, drupalSettings);
