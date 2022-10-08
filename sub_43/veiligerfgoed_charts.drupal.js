(function($) {
  Drupal.behaviors.veiligerfgoed_charts = {
    attach: function(context, settings) {
      $('.veiligerfgoed-chart.google-chart', context).each(function() {
        $(this).veiligErfgoedDrawChart();
      });

      /**
       * Trigger the SVG Download.
       *
       * We stunn the default behavior which would redirect to '/dashboard'.
       */
      $('.dashboard-download-link a.download-chart.dashboard').click(function(e) {
        e.preventDefault();
        $('.veiligerfgoed-chart.google-chart').eq(0).veiligErfgoedDownloadChart();
      });
    }
  }
})(jQuery);