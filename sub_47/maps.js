(function ($, Drupal, drupalSettings) {
  const mapTypes = [
    'maps',
    'maps_europe',
    'maps_africa',
    'maps_asia'
  ];

  function isMap(type) {
    return mapTypes.indexOf(type) >= 0;
  }

  $("div[id^='hc_container_']").each(function () {
    var id = $(this).attr('id');
    var chart_id = id.replace('_alinea', '').substr(13).toString();
    var chart = drupalSettings.cbi_charts.highcharts['hc-chart-' + chart_id];

    // Override or set some additional chart options.
    if (isMap(chart.type)) {
      let map;
      switch (chart.type) {
        case 'maps_europe':
          map = 'custom/europe';
          break;
        case 'maps_africa':
          map = 'custom/africa';
          break;
        case 'maps_asia':
          map = 'custom/asia';
          break;
        default:
          map = 'custom/world';
      }

      // Prepare data
      var data = [];
      var series = eval(chart.series);
      series.forEach(function (entry) {
        if (!(!entry[0] || entry[0].trim().length === 0)) {
          data.push(
            {
              'value': entry[1],
              'hc-key': entry[0].toLowerCase(),
            }
          );
        }
      });

      // Initiate the chart
      $("#" + id).highcharts('Map', {
        title: {
          text: (chart.title && chart.title.length) ? chart.title.toString() : ''
        },

        subtitle: {
          text: (chart.subtitle && chart.subtitle.length) ? chart.subtitle.toString() : ''
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },

        colorAxis: {
          min: 0
        },

        series: [{
          data: data,
          mapData: Highcharts.maps[map],
          joinBy: 'hc-key',
          // allAreas: false,
          name: '',
          states: {
            hover: {
              color: '#a4edba'
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }]
      });
    }

  });
})(jQuery, Drupal, drupalSettings);
