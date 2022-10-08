(function($) {
  $(document).ready(function(){

  $('select.cpbchartspulldown').bind('change', function() {
    var reeks =  $(this).val();
    var cpbdata = Drupal.settings.cpbcharts;
    var yas = Drupal.settings.cpbchartsyas;
    var chart = $('#highchartscontainer').highcharts();
    
    chart.zoomOut();
    chart.xAxis[0].setCategories(cpbdata[reeks]['jaar']);
    chart.yAxis[0].update({min: cpbdata[reeks]['minyas']});
    chart.yAxis[0].update({title: {text: yas[reeks] } });
    chart.series[0].update({ data: cpbdata[reeks]['cbscijfers'] });
    chart.series[1].update({ data: cpbdata[reeks]['raming'] });
    $('#highchartscontainer').css('background-image', 'url('+Drupal.settings.cpbchartspad+'/img/'+reeks+'.png)');
  });

  });
})(jQuery);


;
(function ($) {

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      if (Drupal.settings.matomo.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
        // Mailto link clicked.
        _paq.push(["trackEvent", "Mails", "Click", this.href.substring(7)]);
      }

    });
  });

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.matomo.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        _paq.push(["setCustomUrl", href]);
        _paq.push(["trackPageView"]);
      }
    });
  }

});

})(jQuery);
;
